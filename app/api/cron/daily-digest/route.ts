import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";

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

  if (
    process.env.EMAIL_NOTIFICATIONS_ENABLED !== "true" ||
    !process.env.RESEND_API_KEY
  ) {
    return NextResponse.json({
      skipped: true,
      reason: "email notifications not enabled",
    });
  }

  const supabase = createAdminClient();
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

  return NextResponse.json({ digestsSent, reengagementsSent });
}
