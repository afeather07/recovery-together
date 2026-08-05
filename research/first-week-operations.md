# First-week operating checklist

Written 2026-08-05. A daily rhythm for the first week of real users — what to check, what needs a same-day response, and what can wait. Goal: catch problems fast without turning this into a second job.

## Every day (5-10 minutes)

1. **Open `/admin?key=...`** — any open reports? For each one: read it, decide (leave it, or delete the post/reply via the Supabase table editor per the admin page's own note). Reports are invisible to other members either way, so there's no urgency pressure beyond "don't let it sit for days."
2. **Skim Vercel's dashboard** — any failed deployments or function errors since yesterday? (Nothing should be deploying unless Aaron or Claude pushed something, so an unexpected failure is worth investigating.)
3. **Check Vercel Analytics** (and GA4, once set up) — rough visit count, which pages. Not for vanity — for noticing if a channel from `launch-plan.md` is actually working.
4. **Spend 2 minutes reading whatever rooms have new posts.** Not moderating — just knowing what's actually happening. This is the fastest way to learn what `launch-plan.md`'s Phase A says to learn.

## Every few days

- **Check Supabase's advisor** (Database → Advisors in the dashboard) for any new warnings — most will be the already-reviewed, expected ones (see `FOUNDER_ACTION_ITEMS.md`'s notes section), but a new one is worth a second look.
- **Check the Anthropic console** if AI onboarding ever gets turned on — spend against the Hard Limit.
- **Re-read anything posted in Reddit/Facebook threads** from the launch-plan outreach, if that's underway — mod/community feedback there is often the highest-signal input available in week one.

## If something breaks

- **Site is down:** check Vercel's status page first (vercel-status.com) — often not your app. Then check the latest deployment's build log in the Vercel dashboard.
- **A room shows "Room not found":** this exact bug happened once before (missing Postgres GRANTs — see `PROJECT_LOG.md`, 2026-08-04) and was fixed; if it recurs, that's the first thing to check via Supabase's SQL editor (`information_schema.role_table_grants`).
- **Someone reports something urgent/unsafe** (not just a Report-button flag, but something that reads like an actual emergency in a post): this product is explicitly peer support, not a monitored crisis service (see `PRINCIPLES.md` and the Safety page's own language) — there is no obligation or mechanism to intervene in real time, and the site doesn't claim to. If Aaron personally sees something that concerns him while reading a room, that's a human judgment call, not a product feature to build reactively.

## When to bring Claude back in

- Any bug affecting the core flow (onboarding, posting, replying, reporting).
- A moderation situation that seems to need a guideline update, not just a one-off report dismissal.
- Real usage data suggesting a specific piece of `launch-plan.md` Phase B/C is now relevant sooner than expected (e.g. return-visit rate is high enough that My Journey personalization is worth investing in now).
- Anything that feels like it needs a founder-level call per `CLAUDE.md`'s escalation categories (legal, security, business model, trust) — those still route through Aaron either way, but Claude should be looped in on the product-technical side of any of them.

## What NOT to do reflexively in week one

- Don't chase vanity metrics or add analytics dashboards beyond what's already wired — not enough data yet for it to mean anything.
- Don't start Phase C outreach (treatment centers, journalists, influencers) — `launch-plan.md` scopes that to the first 1,000 users, and reaching out cold with a brand-new, empty-feeling product undersells it.
- Don't post the same message across every Reddit/Facebook channel on the same day, even if each one is individually approved — reads as spam even when it technically isn't (see `research-C-launch-strategy.md`'s posting posture).
