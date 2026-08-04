# Founder Action Items

**Read this file first, always.** This is the single place to answer "catch me up" — a current-state snapshot plus everything that needs Aaron's decision, opinion, or action. If it's not in here, treat it as not pending. For deeper history on any of this, see `PROJECT_LOG.md` — but you shouldn't need to most weeks.

---

## Right now (overwritten each session — this is a snapshot, not a log)

Live at **https://recovery-together.vercel.app**. Aaron approved the recovery-journey design and it's now built and pushed: the fake landing-page preview is honest now, the identity-forking bug is fixed (returning visitors on the same browser are recognized), there's a new personalized "Welcome back" screen with unread-reply counts per past room, an optional post-first-post email capture, and a daily digest/re-engagement email job (currently OFF -- see Blocking launch below). **This has not been click-tested live yet** -- no browser tool was available this session, only a clean `npm run build`. Next: Aaron should click through as a genuinely new anonymous visitor, then close the tab and reopen the site to confirm the "Welcome back" screen actually appears and looks right.

**Definition of launched:** app is live on a real Vercel URL, a stranger can land, onboard, enter a room, post, reply, and report without help, and everything in "Blocking launch" below is checked off.

## Blocking launch

- [ ] **Set an Anthropic monthly Hard Limit + spend alert** at console.anthropic.com → Billing, before ever setting `app_config.ai_onboarding_enabled` to `true`. Not urgent since AI ships off by default, but must happen before flipping that flag, ever.
- [ ] **Create/confirm an Anthropic API key** for the app (only needed if/when AI onboarding is turned on — not needed to launch).
- [ ] **Spend 5–10 minutes personally reading r/quittingkratom and r/OPMS's current rules** before posting anything there. The launch-strategy research (`research/research-C-launch-strategy.md`) couldn't fetch Reddit directly and flagged this as something only Aaron can verify firsthand.
- [ ] **Click-test the new return-visit flow** before recruiting real users: onboard as a new anonymous visitor, post once, close the tab, reopen the site, confirm you land on "Welcome back" (not the marketing homepage) and see the right room + unread count.
- [ ] **Get a free Resend API key** (resend.com, 100 emails/day free) if/when you want reply-notification emails actually sending -- the whole system is built and wired up but silently no-ops until `RESEND_API_KEY` and `EMAIL_NOTIFICATIONS_ENABLED=true` are set in Vercel's env vars. Not needed to launch; notifications just won't go out until this is set.

## Needs your opinion, not your technical work

- [ ] **Pick a visual direction** from `research/research-B-ux-ui-directions.md` — open the two mockups in `research/mockups/` in a browser and say which one (or a blend). No need to read the full report; the mockups are the fast path.
- [ ] **Confirm you're fine launching with AI onboarding off by default.** Both the cost review and the security review independently landed here already — this is a "tell me if you disagree" item, not an open question.

## Resolved (kept for the record — see `PROJECT_LOG.md` for full detail on any of these)

- [x] Recovery journey & continuity model built: fixed identity-forking bug, added personalized return screen, fixed fake landing preview, added optional email capture + daily digest/re-engagement email system (off until Resend key is set) (2026-08-04).

- [x] Fixed "Room not found" bug: restored missing base Postgres GRANTs on all app tables for `anon`/`authenticated`/`service_role` (2026-08-04). Awaiting Aaron's retest to fully close out.
- [x] Deployed to Vercel, git-linked, env vars set, Vercel Authentication (SSO wall) disabled so the public can actually reach the site (2026-08-04).

- [x] Documentation consolidated: 11 process files → 5 (2026-08-03).
- [x] Anonymous sign-in enabled in Supabase; resulting RLS advisor warnings reviewed and confirmed expected/by-design (2026-08-03).
- [x] Supabase project connected via official MCP connector, schema applied, one real gap found and fixed (trigger function was publicly callable) (2026-08-03).
- [x] Critical `ai_rate_limit` RLS bug fixed via SECURITY DEFINER RPC (2026-08-03).
- [x] Onboarding input length cap, post/reply/report rate limiting, timing-safe admin key check added (2026-08-03).
- [x] GitHub repo set up, MVP built, pushed (2026-08-03).

## Later (not launch-blocking)

- [ ] When a Founder OS Dashboard project actually exists, build the `stats_daily_summary`-style read-only views + scoped role described in `PROJECT_BRIEF.md`'s "Future integration" section. Not before -- we don't know its exact needs yet.

- [ ] When ready for persistent accounts (Phase 2 of the identity roadmap), build email-based Level 2 accounts per `PROJECT_BRIEF.md`'s "Long-term vision" section. Supabase already supports this without schema changes.

- [ ] Consider Turnstile/hCaptcha on anonymous sign-up if bot-created accounts become a real problem post-launch (not urgent pre-launch since there's no traffic yet).
- [ ] Add a DELETE policy so users can retract their own posts/replies (harm-reduction nicety, not a security hole).
- [ ] Decide whether to eventually build the in-app moderation dashboard properly, vs. continuing to use the Supabase table editor manually.

## Notes on Supabase security advisor output
Running Supabase's advisor after the schema migration and after enabling anonymous sign-in shows several items that look like warnings but are expected:
- `ai_rate_limit` has RLS enabled with no policies — intentional (default-deny; access only through the `check_and_increment_ai_rate_limit` function).
- `check_and_increment_ai_rate_limit` is callable by `anon`/`authenticated` — intentional, that's exactly how the app enforces the AI rate limit.
- Several tables show "Anonymous Access Policies" warnings — expected, since this app has no separate tier of permanent vs. anonymous accounts; every policy is meant to apply equally to anonymous sessions.
One real gap was found and fixed: `enforce_author_rate_limit` (a trigger-only function) was publicly callable via PostgREST's auto-exposed RPC — revoked from anon/authenticated/public.
