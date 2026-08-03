import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import crypto from "node:crypto";
import { createRouteClient } from "@/lib/supabase/route";

const STAGES = [
  "Preparing",
  "Day 1",
  "Day 2–3",
  "Day 4–7",
  "Week 2+",
  "Maintaining recovery",
];

const DAILY_GLOBAL_LIMIT = Number(process.env.AI_DAILY_GLOBAL_LIMIT ?? 200);
const DAILY_PER_IP_LIMIT = Number(process.env.AI_PER_IP_DAILY_LIMIT ?? 5);

function keywordFallback(story: string, nickname: string, stage: string) {
  const supportNeed = /sleep|insomnia|rest/i.test(story)
    ? "sleep and nighttime support"
    : /scared|fear|afraid|panic/i.test(story)
    ? "reassurance and steady check-ins"
    : /alone|lonely|someone|talk/i.test(story)
    ? "connection with people who understand"
    : "peer support and encouragement";

  return {
    nickname: nickname || "Anonymous",
    stage: stage || STAGES[0],
    support_need: supportNeed,
    source: "keyword",
  };
}

// Turns a free-form story into a draft profile. This route only organizes
// what the user already said — it never diagnoses, predicts withdrawal
// severity, or recommends medication/taper decisions (see SAFETY_RULES.md).
//
// Cost policy (see COST_AND_AI_POLICY.md): AI is optional here. This route
// always returns a usable result — via Claude when enabled and under
// budget, via free keyword matching otherwise. It never hard-fails and
// never blocks the product on AI being available.
export async function POST(req: NextRequest) {
  const { story, nickname = "", stage = STAGES[0] } = await req.json();

  if (!story || typeof story !== "string" || story.trim().length === 0) {
    return NextResponse.json({ error: "story is required" }, { status: 400 });
  }

  // Hard override: if this env var is explicitly "false", never call AI,
  // regardless of the database flag. Fail-safe default when unset is to
  // defer to the database flag (which itself defaults to false).
  if (process.env.AI_ONBOARDING_ENABLED === "false") {
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }

  const supabase = createRouteClient();

  const { data: config } = await supabase
    .from("app_config")
    .select("ai_onboarding_enabled")
    .eq("id", 1)
    .single();

  if (!config?.ai_onboarding_enabled) {
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }

  // Rate limiting: per-IP daily cap and a global daily cap, both
  // configurable via env vars. Either one being exceeded falls back to the
  // free path instead of erroring.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
  const today = new Date().toISOString().slice(0, 10);

  const { data: ipRow } = await supabase
    .from("ai_rate_limit")
    .select("count")
    .eq("ip_hash", ipHash)
    .eq("day", today)
    .maybeSingle();

  const { count: globalCount } = await supabase
    .from("ai_rate_limit")
    .select("*", { count: "exact", head: true })
    .eq("day", today);

  if ((ipRow?.count ?? 0) >= DAILY_PER_IP_LIMIT) {
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }
  if ((globalCount ?? 0) >= DAILY_GLOBAL_LIMIT) {
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 300,
      system: `You extract a short peer-support profile draft from what a user wrote about their 7-OH/kratom situation. You do not diagnose, predict withdrawal severity, or suggest medication or taper amounts. Respond with ONLY a JSON object with keys: nickname (string, invent something gentle/anonymous if none given), stage (one of: ${STAGES.join(
        ", "
      )}), support_need (a short phrase, e.g. "sleep and nighttime support" or "connection with people who understand"). No other text.`,
      messages: [{ role: "user", content: story }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const parsed = JSON.parse(
      textBlock && "text" in textBlock ? textBlock.text : "{}"
    );
    if (nickname.trim()) parsed.nickname = nickname.trim();
    if (stage) parsed.stage = stage;
    parsed.source = "ai";

    await supabase
      .from("ai_rate_limit")
      .upsert(
        { ip_hash: ipHash, day: today, count: (ipRow?.count ?? 0) + 1 },
        { onConflict: "ip_hash,day" }
      );

    return NextResponse.json(parsed);
  } catch {
    // Any Anthropic error (including if the account hits its own console
    // spend Hard Limit) degrades to the free path rather than failing.
    return NextResponse.json(keywordFallback(story, nickname, stage));
  }
}
