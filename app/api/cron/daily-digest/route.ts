import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";
import { ROUTES, INDEXNOW_KEY } from "@/lib/routes";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_ADDRESS =
  process.env.NOTIFY_FROM_EMAIL || "Just Another Friend <onboarding@resend.dev>";
const REENGAGEMENT_MIN_DAYS = 10;
const EPOCH = "1970-01-01T00:00:00Z";

async function sendEmail(to: string, subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to, subject, text }),
    });
  } catch {
    // Never let an email-provider hiccup break the whole cron run.
  }
}

// Google News' public RSS search -- no API key, no cost, no account. Real
// headlines only: this never generates or paraphrases content, it links out
// to real articles as-is (see /updates' disclaimer). Kept to a manual regex
// parse rather than adding an XML-parsing dependency for a handful of tags.
const NEWS_QUERIES: { tag: string; query: string }[] = [
  { tag: "legal", query: "7-OH OR kratom ban OR kratom legislation OR DEA scheduling" },
  { tag: "general", query: "kratom 7-hydroxymitragynine news" },
];
const NEWS_KEEP_COUNT = 60;

async function fetchNewsQuery(query: string, tag: string) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items: { title: string; url: string; source: string | null; published_at: string | null; query_tag: string }[] = [];
    for (const block of xml.split("<item>").slice(1, 9)) {
      const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      if (!title || !link) continue;
      const parsedDate = pubDate ? new Date(pubDate) : null;
      items.push({
        title,
        url: link,
        source: source || null,
        published_at: parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null,
        query_tag: tag,
      });
    }
    return items;
  } catch {
    // A broken feed or network hiccup shouldn't break the whole cron run --
    // the page just keeps showing whatever it already has.
    return [];
  }
}

async function refreshNews(supabase: ReturnType<typeof createAdminClient>) {
  const allItems = (
    await Promise.all(NEWS_QUERIES.map((q) => fetchNewsQuery(q.query, q.tag)))
  ).flat();
  if (!allItems.length) return 0;

  await supabase.from("news_items").upsert(allItems, { onConflict: "url", ignoreDuplicates: true });

  // Prune to the most recent NEWS_KEEP_COUNT so the page (and the table)
  // stay small -- this is a rolling feed, not an archive.
  const { data: keep } = await supabase
    .from("news_items")
    .select("id")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(NEWS_KEEP_COUNT);
  const keepIds = (keep || []).map((r) => r.id);
  if (keepIds.length) {
    await supabase.from("news_items").delete().not("id", "in", `(${keepIds.join(",")})`);
  }

  return allItems.length;
}

// IndexNow: tells Bing, Yandex, Seznam, Naver (and everything that reads
// Bing's index -- DuckDuckGo, Yahoo, Ecosia, several AI search products)
// about every public URL. Keyless, free, no account. Google doesn't
// participate; that still needs Search Console (Aaron's login). Resubmitting
// the full list daily is harmless -- the endpoint dedupes.
async function submitIndexNow() {
  if (!SITE_URL.startsWith("https://")) return 0;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: ROUTES.map((r) => `${SITE_URL}${r}`),
      }),
    });
    return res.ok ? ROUTES.length : 0;
  } catch {
    return 0;
  }
}

// Daily digest of reply notifications, plus at most one non-judgmental
// re-engagement email per person. Runs once a day (Vercel Hobby cron
// limit), which conveniently matches the design decision to batch
// notifications rather than send one email per reply (see PROJECT_BRIEF.md,
// "Recovery journey & continuity model").
//
// Cost/safety: off by default (EMAIL_NOTIFICATIONS_ENABLED must be "true"
// AND RESEND_API_KEY must be set), same bootstrapped-cost pattern as AI
// onboarding. Never sends message content by email -- only "someone
// replied," never what was said, since an inbox may not be private.
export async function GET(req: NextRequest) {
  // Verify this is actually Vercel's cron invoking us, not a public hit.
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Touch the database on every run, even when email notifications are off
  // below. Supabase's free tier auto-pauses a project after ~7 days with no
  // activity -- before this, an email-notifications-disabled deploy meant
  // this cron short-circuited before ever querying Supabase, so nothing was
  // keeping the project awake and it silently paused (found + fixed
  // 2026-09-03, see PROJECT_LOG.md). This query is free and trivial either
  // way, so it always runs first.
  await supabase.from("app_config").select("id").limit(1);

  // Refresh the legality/news feed every run, independent of the email
  // gate below -- it's free (no API key, no AI call) and is its own
  // feature, not part of the notification system.
  const newsFetched = await refreshNews(supabase);
  const indexNowSubmitted = await submitIndexNow();

  if (
    process.env.EMAIL_NOTIFICATIONS_ENABLED !== "true" ||
    !process.env.RESEND_API_KEY
  ) {
    return NextResponse.json({
      skipped: true,
      reason: "email notifications not enabled",
      newsFetched,
      indexNowSubmitted,
    });
  }

  let digestsSent = 0;
  let reengagementsSent = 0;

  // ---- Reply digests ----
  const { data: optedIn } = await supabase
    .from("profile_private")
    .select("id, notify_email")
    .not("notify_email", "is", null);

  for (const person of optedIn || []) {
    const userId = person.id;

    const { data: myPosts } = await supabase
      .from("posts")
      .select("id, room_id")
      .eq("author_id", userId);
    const myPostIds = (myPosts || []).map((p) => p.id);
    if (!myPostIds.length) continue;

    const { data: visits } = await supabase
      .from("room_visits")
      .select("room_id, last_seen_at")
      .eq("user_id", userId);
    const lastSeenByRoom: Record<string, string> = {};
    (visits || []).forEach((v) => (lastSeenByRoom[v.room_id] = v.last_seen_at));

    const postIdToRoom: Record<string, string> = {};
    (myPosts || []).forEach((p) => (postIdToRoom[p.id] = p.room_id));

    const { data: repliesToMe } = await supabase
      .from("replies")
      .select("post_id, author_id, created_at")
      .in("post_id", myPostIds)
      .neq("author_id", userId);

    let unreadTotal = 0;
    (repliesToMe || []).forEach((r) => {
      const roomId = postIdToRoom[r.post_id];
      const lastSeen = (roomId && lastSeenByRoom[roomId]) || EPOCH;
      if (r.created_at > lastSeen) unreadTotal += 1;
    });

    if (unreadTotal > 0) {
      await sendEmail(
        person.notify_email,
        unreadTotal === 1
          ? "Someone replied to you on Just Another Friend"
          : `${unreadTotal} new replies on Just Another Friend`,
        `You have ${unreadTotal} new repl${unreadTotal === 1 ? "y" : "ies"} waiting on Just Another Friend. Come see: ${SITE_URL}`
      );
      digestsSent += 1;
    }
  }

  // ---- Single non-judgmental re-engagement email ----
  const cutoff = new Date(
    Date.now() - REENGAGEMENT_MIN_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();
  const { data: quiet } = await supabase
    .from("profiles")
    .select("id, last_active_at")
    .lt("last_active_at", cutoff);

  for (const person of quiet || []) {
    const { data: priv } = await supabase
      .from("profile_private")
      .select("notify_email, reengagement_sent_at")
      .eq("id", person.id)
      .single();

    if (!priv?.notify_email || priv.reengagement_sent_at) continue;

    await sendEmail(
      priv.notify_email,
      "Whenever you're ready",
      "Whenever you're ready, your room on Just Another Friend is still here. No pressure, no streaks to keep -- just people who understand, whenever you want them."
    );
    await supabase
      .from("profile_private")
      .update({ reengagement_sent_at: new Date().toISOString() })
      .eq("id", person.id);
    reengagementsSent += 1;
  }

  return NextResponse.json({ digestsSent, reengagementsSent, newsFetched, indexNowSubmitted });
}
