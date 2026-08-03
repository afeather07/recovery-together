# Platform Decision

## Selected stack
Next.js (App Router) + Supabase + Vercel, implemented directly by Claude Code/Cowork.

## Rationale
Weighed against the required priorities (2-4 day MVP, mobile responsiveness, minimal founder configuration, portability, safe auth/DB, realtime, ability for Claude to continue implementation, low dead-end-rebuild risk):

**Lovable + Supabase** - fastest to a visual demo, and its Supabase connector is genuine. But Lovable optimizes for CRUD/dashboard generation, not custom realtime chat with row-level anonymity rules. Generated code quality is inconsistent and harder for a second agent (Claude) to reason about and extend precisely - every future task becomes "fight the scaffold, then fix it," not "add a feature." Moderate-to-high dead-end-rebuild risk once moderation/RLS logic gets custom, which it must.

**Replit Agent** - low founder configuration, single environment, can reach a working app fast. But it is a different agent from Claude Code with its own project conventions; handing continued implementation back to Claude means exporting/re-syncing a codebase built by a different agent's assumptions. Realtime and RLS are possible but not first-class the way Supabase makes them. Weakest fit on "ability for Claude to continue implementation."

**Next.js + Supabase + Vercel** - plain, ordinary code. No proprietary agent format to fight. Supabase gives Postgres + Auth + Realtime + Row-Level Security as core primitives, which directly satisfies "safe auth/DB handling" and "realtime community capability" without assembling them from parts. Any future engineer or agent (Claude or otherwise) can open this repo and work in it immediately. Lowest dead-end-rebuild risk of the three.

**Decision: Next.js + Supabase + Vercel.** The other two trade short-term scaffolding speed for a harder, riskier handoff later. Given this project will be built and extended over multiple sessions by Claude, portability wins.

## Exact MVP components
- Landing page (port existing design/copy from the current static prototype)
- Voice/text onboarding, Claude API extracts nickname, stage, support need, user confirms before saving
- Anonymous auth (Supabase Auth, pseudonymous by default)
- Recovery-stage rooms (Preparing, Day 1, Day 2, Day 3, Day 4-7, Week 2+, Maintaining)
- Posts and replies (Supabase Realtime subscriptions)
- Reporting (flag button to reports table)
- Manual moderation view (a filtered table read, not a built dashboard, for launch)
- Static safety/crisis resources page, always visible
- Row-Level Security: public profile fields vs. private identity fields are separate tables/policies from day one

## Migration of current prototype
The static prototype (index.html, styles.css, app.js) is not thrown away, its layout, copy, and visual hierarchy become the Next.js landing page and onboarding dialog. The app.js keyword-matching logic is replaced by a real Claude API call but the interaction pattern (textarea, confirm, profile card, enter room) stays identical, since it is already tested and on-brief. GitHub Pages prototype stays live as-is until the new app is ready to replace it.

## First implementation task
Scaffold the Next.js repo, create the Supabase project, define the schema (profiles, rooms, posts, replies, reports) with RLS policies, and wire up anonymous auth. No UI polish yet, this is the foundation everything else depends on.

## Estimated launch sequence
Day 1: Supabase schema + RLS + auth + static safety/crisis page (ships first, cheapest, highest-risk-reduction item).
Day 2: Landing page + voice/text onboarding wired to Claude API.
Day 3: Rooms, posts, replies with Realtime; report button wired to reports table.
Day 4: Mobile responsive pass, manual moderation check-in process, deploy to Vercel, launch.

## Tools/accounts Aaron must create
- Supabase account + new project (retrieve project URL, anon key, and service role key, service role key is server-only, never committed or exposed client-side)
- Vercel account, linked to the GitHub repo for auto-deploy
- Anthropic API key for the app backend (separate from any personal Claude usage)
- Domain name, optional at launch; ship on the default Vercel subdomain first, attach a custom domain after real users are on it

## Major security and moderation risks
- **RLS misconfiguration is the single biggest risk.** If public-profile and private-identity data are not cleanly separated at the policy level, a bug can deanonymize someone who explicitly chose to stay anonymous. This is not a "fix later" item.
- **Service role key exposure.** Must live only in server-side environment variables, never in a client bundle or committed file.
- **No moderation loop at launch is not acceptable**, even manual. Aaron must check the reports table daily minimum before/during any public promotion push, per SAFETY_RULES.md's prohibition on solicitation, dosing/taper instructions, and self-harm content.
- **Crisis/safety copy must be static, reviewed text, never AI-generated at request time.** A hallucinated response in a self-harm moment is the one failure mode this product cannot absorb.
- **Spam/solicitation risk** (people trying to buy/sell/source product through the platform) needs basic rate-limiting and keyword flags on post creation, not just after-the-fact reporting.
