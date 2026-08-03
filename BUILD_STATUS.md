# Build Status

## Project
Recovery Together

## Phase
Foundation and platform selection

## Completed
- GitHub repository created.
- Static mobile-first landing page created.
- Public GitHub Pages deployment working.
- Product mission and MVP boundaries defined.
- Claude operating instructions created.
- Safety boundaries documented.
- Single-task project control established.

## Working today
- Public landing page.
- Responsive page layout.
- Demo onboarding interaction.
- Demo community-room preview.

## Demo or missing
- Onboarding data is not saved.
- No authentication.
- No database.
- No production AI integration.
- No real rooms.
- No posts or replies.
- No moderation dashboard.
- No content reporting workflow.
- No analytics or error monitoring.
- No production privacy implementation.

## Current blocker
Waiting on Aaron for: GitHub push token, Supabase project keys, Anthropic API key. Nothing is deployed yet.

## Current task
See `CURRENT_TASK.md`.

## Update rule
The implementation agent updates this file at the end of every completed work order. Never mark a feature complete unless it works in the deployed environment or the file clearly states that it is local-only.


## 2026-08-03 update
`PLATFORM_DECISION.md` created: recommends Next.js + Supabase + Vercel over Lovable+Supabase and Replit Agent. No code implemented yet, per CURRENT_TASK.md instruction to wait for approval.


## 2026-08-03 update — MVP built, not yet deployed
Built the full Next.js + Supabase MVP locally: landing page, AI onboarding, anonymous profiles with public/private data separation, stage rooms, posts, replies, realtime, reporting, moderation view, static safety page. `npm run build` passes with 0 errors. Blocked on credentials to deploy (see CURRENT_TASK.md). Static prototype preserved at legacy-static-prototype/, not deleted.


## 2026-08-03 update — cost controls added
Implemented bootstrapped-first / AI-as-enhancement policy: AI onboarding defaults OFF (app_config table, instant Supabase-side kill switch), per-IP and global daily rate limits, free keyword-fallback path that always returns a usable result. Full policy in COST_AND_AI_POLICY.md. Build still passes clean.


## 2026-08-03 update — security/cost fixes applied, research archived, action tracker added
Fixed the critical ai_rate_limit RLS bug, added onboarding input length cap, added post/reply/report rate limiting, fixed /admin timing-safe comparison. Archived all 5 research reports + 2 UX mockups under research/. Added FOUNDER_ACTION_ITEMS.md as the persistent cross-session to-do tracker. All changes committed and pushed to GitHub -- nothing significant left sandbox-only. Build verified clean.
