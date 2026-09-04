// A rotating, deterministic (not random) daily check-in prompt -- gives
// people something to respond to instead of a blank textarea. Evidenced by
// research/research-A-product-landscape.md's WEconnect finding: daily
// ritual/structure drives retention more than novelty features. No backend
// needed -- same prompt for everyone on a given day, changes at midnight UTC.
const PROMPTS = [
  "How did you sleep last night?",
  "What's one small thing that helped today, even a little?",
  "What's the hardest part of right now?",
  "Anything you're craving today -- food, rest, company?",
  "What are you looking forward to, even something tiny?",
  "How's your energy today, compared to yesterday?",
  "What would you tell someone who's exactly where you were a few days ago?",
  "What's one thing you're proud of getting through today?",
  "How's your mood today -- no need to explain it, just name it.",
  "What's something that usually helps you get through a hard hour?",
  "Anything you need to say out loud that you haven't told anyone?",
  "What does today actually look like for you, hour to hour?",
  "Is there something you're scared to admit you're feeling?",
  "What's kept you going today?",
];

function dayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  return Math.floor(diff / 86400000);
}

export function todaysPrompt(): string {
  return PROMPTS[dayOfYear(new Date()) % PROMPTS.length];
}
