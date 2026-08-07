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
