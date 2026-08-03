# Founder Action Items

This is the single running list of everything that needs Aaron's decision, opinion, or action — technical or not. Any Claude session (this one or a fresh chat, if this session is ever lost) should read this file right after `CURRENT_TASK.md` and treat it as current. Updated whenever something is added, resolved, or changes status. Do not rely on chat history to know what's pending — if it's not in here, treat it as not pending.

## Blocking launch

- [ ] **Enable Anonymous Sign-Ins in Supabase.** Dashboard → Authentication → Sign In / Providers → toggle "Allow anonymous sign-ins" on. This is the one Supabase setting Claude cannot flip via the connector -- without it, no one can create a profile or post. Takes 10 seconds.

- [ ] **Set an Anthropic monthly Hard Limit + spend alert** at console.anthropic.com → Billing, before ever setting `app_config.ai_onboarding_enabled` to `true`. Not urgent since AI ships off by default, but must happen before flipping that flag, ever.
- [ ] **Create/confirm an Anthropic API key** for the app (only needed if/when AI onboarding is turned on — not needed to launch).
- [ ] **Connect the repo to Vercel** and set environment variables there directly (see `.env.example`).
- [ ] **Spend 5–10 minutes personally reading r/quittingkratom and r/OPMS's current rules** before posting anything there. The launch-strategy research (`research/research-C-launch-strategy.md`) could not fetch Reddit directly and flagged this as something only Aaron can verify firsthand.

## Needs your opinion, not your technical work

- [ ] **Pick a visual direction** from `research/research-B-ux-ui-directions.md` — open the two mockups in `research/mockups/` in a browser and say which one (or a blend). No need to read the full report first; the mockups are the fast path.
- [ ] **Confirm you're fine launching with AI onboarding off by default.** Both the cost review and the security review independently landed here already — this is a "tell me if you disagree" item, not an open question.

## Resolved (kept for the record)

- [x] 2026-08-03 — Supabase project ("Recovery Together", ca-central-1) connected via the official Supabase MCP connector. Full schema + RLS + rate-limit fixes applied directly as a migration. Verified: 8 tables exist, all RLS-enabled, 6 rooms seeded, security advisors clean except two expected/intentional warnings (see note below) and one informational note (see below).

- [x] 2026-08-03 — Critical: `ai_rate_limit` table let any client reset its own or others' counters, defeating the AI cost limit. Fixed via a SECURITY DEFINER RPC (`check_and_increment_ai_rate_limit`); table now has no client-facing RLS policy at all.
- [x] 2026-08-03 — Onboarding story text had no length cap, making per-request AI cost technically unbounded. Fixed: hard 1,200-character truncation before any prompt is built.
- [x] 2026-08-03 — No rate limiting existed on posts/replies/reports, allowing potential flooding of a room. Fixed: DB-level trigger capping inserts per author (15 posts/10min, 20 replies/10min, 20 reports/hour).
- [x] 2026-08-03 — `/admin` compared the key with plain `===`. Fixed: constant-time hash comparison.

## Later (not launch-blocking)

- [ ] Consider Turnstile/hCaptcha on anonymous sign-up if bot-created accounts become a real problem post-launch (flagged Medium in `research/research-E-security-review.md`, not urgent pre-launch since there's no traffic yet).
- [ ] Add a DELETE policy so users can retract their own posts/replies (flagged in the security review as a harm-reduction gap, not a security hole).
- [ ] Decide whether to eventually build the in-app moderation dashboard properly, vs. continuing to use the Supabase table editor manually.

## Notes on Supabase security advisor output
Running Supabase's own advisor tool after the migration shows three items that look like warnings but are expected:
- `ai_rate_limit` has RLS enabled with no policies — intentional (default-deny; access only through the `check_and_increment_ai_rate_limit` function).
- `check_and_increment_ai_rate_limit` is callable by `anon`/`authenticated` — intentional, this is exactly how the app calls it to enforce the AI rate limit.
A third item (`enforce_author_rate_limit` being publicly callable) was a real gap and has been fixed — that function is now revoked from anon/authenticated/public and only fires as a trigger.
