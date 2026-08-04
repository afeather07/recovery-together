# Project Log

One chronological history of what changed and why. Newest at top. Merged from the old `DECISION_LOG.md`, `CHANGELOG.md`, and `PLATFORM_DECISION.md` on 2026-08-03 for founder clarity — full original text of all three still exists in git history if ever needed, nothing was lost, just consolidated.

This file is for depth. For "what's the state right now and what do I need to do," read `FOUNDER_ACTION_ITEMS.md` instead — you shouldn't need this file most weeks.

---

### 2026-08-03 — Founder OS Dashboard data-source requirement documented (not implemented)
Aaron's requirement: Recovery Together should never build its own dashboard, but should be designed so project, engineering, deployment, and operational data can later feed a separate "Founder OS Dashboard" through stable read-only interfaces. Documented in PROJECT_BRIEF.md. Key finding: most of this is already free -- GitHub's API already serves the markdown docs, Vercel's API will already serve deployment status once deployed, Anthropic's billing API already serves spend data, and Supabase already auto-exposes every table as a read-only REST API (PostgREST) gated by existing RLS. The one real gap (a dashboard wanting cross-table aggregate counts like open-report totals without needing the service_role key) has a clear, cheap fix identified -- a small read-only SQL view plus a scoped role -- but deliberately not built yet, since we don't know the target dashboard's exact needs and guessing now risks redoing it later. Zero effect on MVP or launch timeline.

### 2026-08-03 — Long-term vision adopted: Progressive Identity (not implemented)
Aaron's product vision: anonymous should stay the default, not the permanent identity model -- members should be able to build a persistent identity, reputation, and eventually a leadership role over time if they choose. Added a full "Long-term vision" section to PROJECT_BRIEF.md with a 5-level identity ladder (Anonymous -> Persistent Member -> Verified Member -> Trusted Community Member -> Community Leader) and a phased roadmap. Evaluated the account-provider suggestions on their merits rather than adopting the list wholesale: recommend email (magic link) first when Level 2 gets built, Google as a reasonable Phase 2/3 addition, Apple lower-priority but roadmap-worthy; recommend against Facebook (real-name social graph cuts against this audience's need for privacy around a stigmatized condition) and agree TikTok/Instagram aren't worth it (also not mature identity providers, not just low-value). Confirmed the current schema needs zero changes for this -- Supabase's anonymous-to-permanent account linking already preserves the same auth.users.id, posts, and history. Nothing implemented; MVP scope and launch timeline are unaffected.

### 2026-08-04 — Deployed to Vercel; public access unblocked
Project connected via Vercel's dashboard import (git-linked to main, auto-detected Next.js), env vars set (Supabase URL/anon key, AI_ONBOARDING_ENABLED=false). First production deployment succeeded, zero runtime errors in the following 24h. Found one real launch-blocker during verification: Vercel Authentication (SSO protection) was on by default, set to apply to everything except a custom domain -- since there's no custom domain yet, this meant real visitors to recovery-together.vercel.app would hit a login wall instead of the site. Claude's attempt to disable it via the Vercel connector was blocked by a safety guardrail (disabling auth protection is treated as sensitive enough to need a human's hand directly) -- correctly so. Aaron disabled it himself in the dashboard. Verified fixed with a plain unauthenticated fetch (not using Claude's own authenticated connector access) confirming the real page loads for anyone. Production URL: https://recovery-together.vercel.app

### 2026-08-03 — Documentation consolidated (11 files → 5)
Merged `SAFETY_RULES.md` + `COST_AND_AI_POLICY.md` → `PRINCIPLES.md`. Merged `WORKFLOW.md` into `CLAUDE.md`. Merged `DECISION_LOG.md` + `CHANGELOG.md` + `PLATFORM_DECISION.md` → this file. Merged `CURRENT_TASK.md` + `BUILD_STATUS.md` into a "Right now" section at the top of `FOUNDER_ACTION_ITEMS.md`. Reason: too many overlapping process files for a solo non-technical founder to track; the goal is that "catch me up" always means one file (`FOUNDER_ACTION_ITEMS.md`), not a search across several.

### 2026-08-03 — Anonymous sign-in enabled; Supabase RLS review
Aaron enabled Anonymous Sign-Ins in Supabase. This makes Supabase's advisor flag every RLS policy that checks `auth.role() = 'authenticated'`, since anonymous sessions are technically `authenticated` with an `is_anonymous` flag. Reviewed and confirmed this is correct by design — this app has no separate tier of "permanent" accounts to distinguish from anonymous ones, so every policy is meant to apply equally. No RLS changes needed. If a "reveal my real identity" upgrade path is ever built, that's the point where `auth.jwt() ->> 'is_anonymous'` would start to matter for gating certain actions to non-anonymous users only.

### 2026-08-03 — Supabase connected via official MCP connector
Connected the official Supabase MCP (OAuth-based, no API key entered in chat). Used Aaron's already-created "Recovery Together" project (ca-central-1). Applied the full schema as one migration. Verified 8 tables, all RLS-enabled, 6 rooms seeded. Found and fixed one real gap: `enforce_author_rate_limit()`, a trigger-only function, was publicly callable via PostgREST's auto-exposed RPC endpoint — revoked EXECUTE from anon/authenticated/public; trigger firing is unaffected. One step outside connector reach: Aaron had to enable Anonymous Sign-Ins himself (done, see entry above).

### 2026-08-03 — Founder Action Items tracker introduced
Added `FOUNDER_ACTION_ITEMS.md` as the durable, repo-based record of anything needing Aaron's decision or action — not dependent on any chat session's memory. Research from five parallel workstreams (product landscape, UX/UI directions + mockups, launch strategy, cost review, security review) archived under `research/` for the same reason: durability beyond any one Cowork session.

### 2026-08-03 — Security/cost fixes from the parallel review workstreams
Fixed four issues found by the security and cost-optimization research:
- **Critical:** `ai_rate_limit` table's RLS let any client overwrite its own or others' rate-limit rows, defeating the AI spend cap. Replaced direct table access with a SECURITY DEFINER RPC (`check_and_increment_ai_rate_limit`); the table itself now has no client-facing policy at all.
- Onboarding story text had no length cap, making per-call cost technically unbounded. Added a 1,200-character hard truncation.
- No rate limiting existed on posts/replies/reports. Added a DB-level trigger capping inserts per author per time window.
- `/admin` used a plain `===` key comparison. Replaced with a constant-time hash comparison.

### 2026-08-03 — Bootstrapped-first / AI-as-enhancement made permanent
Adopted Aaron's cost-protection principles as equal priority to safety (now `PRINCIPLES.md`, Part 2). AI onboarding ships OFF by default, with an instant no-redeploy kill switch, a hard env override, per-IP and global daily rate limits, and a free keyword-matching fallback so the product never depends on AI to function.

### 2026-08-03 — Platform decision: Next.js + Supabase + Vercel
Compared against the required priorities (2–4 day MVP, mobile responsiveness, minimal founder configuration, portability, safe auth/DB, realtime, ability for Claude to continue implementation across sessions, low dead-end-rebuild risk):
- **Lovable + Supabase** — fastest to a visual demo, but optimizes for CRUD/dashboards, not custom realtime chat with row-level anonymity rules; generated code is harder for a second agent session to extend precisely.
- **Replit Agent** — low founder configuration, but a different agent's project conventions make handing continued implementation back to Claude across sessions harder.
- **Next.js + Supabase + Vercel** — plain, ordinary code, no proprietary format to fight. Supabase gives Postgres + Auth + Realtime + RLS as core primitives. Lowest dead-end-rebuild risk. **Selected.**

Built and verified locally (`npm run build`, 0 errors) before any credentials existed. Static prototype preserved at `legacy-static-prototype/`, not deleted.

### 2026-08-03 — Claude is sole technical lead, single-agent workflow
Removed the two-agent (ChatGPT plans / Claude builds) structure — it produced coordination overhead without speeding up the build. Claude now owns technical planning and implementation end to end; Aaron approves scope, spending, and launch, and supplies credentials/connector approvals Claude cannot generate on his behalf.

### 2026-08-03 — Foundational product decisions
- **Peer support, not detox treatment.** Positioned strictly as peer-support community — not a detox facility, treatment provider, medical advisor, or substitute for professional care.
- **Pseudonymous by default.** Nickname + generic avatar; real identity stays optional and is never exposed automatically.
- **Mobile-first, low-cognitive-load interface.** The primary user may have almost no attention or energy; every feature must be understandable rapidly with minimal typing.
- **GitHub is the repository, not the production platform.** GitHub stores code, docs, and history; GitHub Pages was only ever the static prototype host.
- **One active task at a time.** Work only from the current task in `FOUNDER_ACTION_ITEMS.md`; new ideas don't interrupt active implementation.

---

## Format going forward
`### YYYY-MM-DD — Title`, then what changed and why in one short paragraph (or a few bullets if there were multiple related fixes). Newest entry goes at the top, right after this header block.
