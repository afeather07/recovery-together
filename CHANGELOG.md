# Changelog

All notable changes to Recovery Together are logged here. Updated after every meaningful commit. Newest entries at the top.

## 2026-08-03

### Added
- `COST_AND_AI_POLICY.md` — permanent bootstrapped-first / AI-as-enhancement policy.
- AI onboarding cost controls: `app_config` kill switch (default off), per-IP and global daily rate limits, free keyword-matching fallback that always returns a usable profile.
- Full Next.js MVP: landing page, AI-assisted onboarding with graceful fallback, anonymous Supabase auth, public/private profile split, six stage-based community rooms, posts and replies with Supabase Realtime, report button, password-gated read-only moderation view, static safety/crisis resources page.
- `supabase/schema.sql` — full schema and RLS policies for profiles, profile_private, rooms, posts, replies, reports, app_config, ai_rate_limit.
- `PLATFORM_DECISION.md` — recorded decision: Next.js + Supabase + Vercel over Lovable+Supabase and Replit Agent.
- This `CHANGELOG.md`.

### Changed
- `CLAUDE.md`, `WORKFLOW.md` — rewritten so Claude is sole technical lead; removed the two-agent (ChatGPT plans / Claude builds) structure.
- Static prototype preserved at `legacy-static-prototype/` rather than deleted.

### Status
Local build verified clean (`npm run build`, 0 errors). Nothing deployed yet. Nothing pushed to GitHub yet — pending a repo-scoped access token from Aaron.

---

## Format going forward
Each entry: date, then Added / Changed / Fixed / Removed as applicable, then a one-line Status noting what's deployed vs. still local.

## 2026-08-03 (later same day)

### Added
- `FOUNDER_ACTION_ITEMS.md` — persistent, repo-based tracker for anything needing Aaron's decision or action.
- `research/` — archived all 5 parallel research reports + 2 HTML UX mockups.

### Fixed
- Critical: `ai_rate_limit` RLS let clients defeat their own rate limit. Replaced with a SECURITY DEFINER RPC.
- Onboarding story text had no length cap (unbounded per-call cost). Added 1,200-char truncation.
- No rate limiting on posts/replies/reports. Added DB-level per-author trigger limits.
- `/admin` used plain `===` for key comparison. Replaced with constant-time hash comparison.

### Status
Pushed to GitHub. Nothing deployed yet — next is Supabase project setup (see FOUNDER_ACTION_ITEMS.md).
