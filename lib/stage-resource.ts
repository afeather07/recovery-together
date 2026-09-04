// One stage-relevant Recovery Library link for the returning-user screen.
// Deliberately a static map, not a recommendation engine -- real, useful,
// no fake personalization.
export const STAGE_RESOURCE: Record<string, { href: string; label: string }> = {
  "Preparing": { href: "/resources/withdrawal-timeline", label: "What withdrawal can look like" },
  "Day 1": { href: "/resources/sleep", label: "Sleep" },
  "Day 2–3": { href: "/resources/hydration-nutrition", label: "Hydration & nutrition" },
  "Day 4–7": { href: "/resources/exercise-and-movement", label: "Exercise & movement" },
  "Week 2+": { href: "/resources/mental-health-and-cravings", label: "Mental health & cravings" },
  "Maintaining recovery": { href: "/resources/mental-health-and-cravings", label: "Mental health & cravings" },
};

// A short, honest, non-clinical description of what each stage tends to
// involve, shown at the top of that stage's room -- gives a room real
// substance beyond a bare chat log. Written as "what people commonly
// describe," same peer-pattern framing already used on the withdrawal
// timeline and FAQ pages -- never individualized advice, never a
// prediction about any one person (see PRINCIPLES.md).
export const STAGE_CONTEXT: Record<string, string> = {
  "Preparing": "People here often describe equal parts relief and dread — the decision is made, and the waiting is the hard part. Saying out loud that you're planning to stop, even to strangers, tends to help more than people expect.",
  "Day 1": "The first 24 hours are commonly when physical symptoms start ramping up — restlessness, aches, trouble settling. You don't have to get through the whole day, just the next hour.",
  "Day 2–3": "This stretch is frequently described as the hardest one — GI symptoms, low energy, and mood swings tend to peak here. If today feels like the worst day yet, that's a common pattern, not a sign something's gone wrong.",
  "Day 4–7": "Physical symptoms often start easing around now, even while sleep and mood can still be rough. Small routines — a fixed wake time, a short walk — tend to matter more here than anything dramatic.",
  "Week 2+": "The acute physical stretch has usually passed. What people mention most in this room: cravings that come in waves, and mood taking longer to settle than the body did.",
  "Maintaining recovery": "You're past the acute stretch. This room is mostly about staying steady day to day — what's still hard, what's actually working, and just checking in.",
};
