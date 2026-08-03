# Decision Log

## 2026-08-03 — Peer support, not detox treatment
Recovery Together will be positioned as a peer-support community. It will not present itself as a detox facility, treatment provider, medical advisor, or substitute for professional care.

## 2026-08-03 — Pseudonymous by default
Users may use a nickname and generic avatar. Real identity information remains optional and must not be exposed automatically.

## 2026-08-03 — Mobile-first, low-cognitive-load interface
The primary user may have almost no attention or energy. Every launch feature must be understandable rapidly and require minimal typing.

## 2026-08-03 — GitHub is the repository, not the production platform
GitHub stores code, documentation, history, and agent instructions. GitHub Pages is only the current static prototype host. The production application platform remains under review.

## 2026-08-03 — One active task
Agents work only from `CURRENT_TASK.md`. New ideas do not interrupt active implementation.

## Adding decisions
Use this format:

### YYYY-MM-DD — Decision title
Decision, reason, and consequences in no more than one short paragraph.

### 2026-08-03 — Claude is sole technical lead, single-agent workflow
Removed the two-agent (ChatGPT plans / Claude builds) structure. It was producing coordination overhead without speeding up the build. Claude now owns technical planning and implementation end to end; Aaron approves scope/spending/launch and supplies credentials Claude cannot generate. `WORKFLOW.md` and `CLAUDE.md` updated accordingly.

### 2026-08-03 — Platform decision executed
Built the Next.js + Supabase + Vercel MVP recommended in `PLATFORM_DECISION.md`. Local build verified clean. Not yet deployed — pending Supabase/Vercel/Anthropic credentials and a GitHub push token from Aaron.

### 2026-08-03 — Bootstrapped-first / AI-as-enhancement is a permanent requirement
Adopted Aaron's cost-protection principles as equal priority to safety. AI onboarding ships OFF by default (`app_config.ai_onboarding_enabled = false`), with an instant no-redeploy kill switch, a hard env override, per-IP and global daily rate limits, and a free keyword-matching fallback so the product never depends on AI to function. See `COST_AND_AI_POLICY.md`. Model reference in `/api/onboarding` corrected to `claude-sonnet-5` (current model string).

### 2026-08-03 — Security/cost fixes from the parallel review workstreams
Fixed four issues found by the security and cost-optimization research: (1) `ai_rate_limit` table's RLS let any client overwrite its own or others' rate-limit rows, defeating the AI spend cap -- replaced with a SECURITY DEFINER RPC (`check_and_increment_ai_rate_limit`) and removed all client-facing policies on that table; (2) onboarding story text had no length cap, making per-call cost technically unbounded -- added a 1,200-character hard truncation; (3) no rate limiting existed on posts/replies/reports -- added a DB trigger capping inserts per author per time window; (4) `/admin` used a plain `===` key comparison -- replaced with a constant-time hash comparison. All four are logged as resolved in `FOUNDER_ACTION_ITEMS.md`. `supabase/schema.sql` will need to be re-run (or the new statements applied) against any Supabase project created before this date.

### 2026-08-03 — Founder Action Items tracker introduced
Added `FOUNDER_ACTION_ITEMS.md` as the permanent, repo-based record of anything requiring Aaron's decision or action, separate from chat history. Wired into `CLAUDE.md`'s required read order (position 3, right after `CURRENT_TASK.md`). Rationale: the Cowork session this was built in is not guaranteed to persist, and Aaron may continue this project from a different chat later -- the repo, not the conversation, is the durable record. Research from the five parallel workstreams (product landscape, UX/UI directions + mockups, launch strategy, cost review, security review) archived under `research/` for the same reason.
