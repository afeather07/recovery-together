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
