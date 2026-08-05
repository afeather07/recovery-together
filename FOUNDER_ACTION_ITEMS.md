# Founder Action Items

**Read this file first, always.** This is the single place to answer "catch me up" — a current-state snapshot plus everything that needs Aaron's decision, opinion, or action. If it's not in here, treat it as not pending. For deeper history on any of this, see `PROJECT_LOG.md` — but you shouldn't need to most weeks.

---

## Right now (overwritten each session — this is a snapshot, not a log)

Live at **https://recovery-together.vercel.app**. V1.1's honest/navigable/trustworthy core shipped and is live: real site-wide navigation (Home/Explore/My Journey/Resources/Safety, mobile hamburger + desktop), a public Explore room directory, a dedicated My Journey page with an honest empty state, a 6-page resource library (withdrawal timeline, sleep, hydration & nutrition, mental health & cravings, glossary, FAQ), About/Contact, draft Community Guidelines/Privacy Policy/Terms of Use, SEO basics (metadata, OG image, favicon, sitemap, robots.txt), Vercel Analytics, and an accessibility pass (skip link, focus states, nav landmarks). Also patched a critical Next.js vulnerability npm flagged (14.2.5 → 14.2.35, same minor line, no breaking changes). Full detail in `PROJECT_LOG.md`'s 2026-08-05 entries. Deferred deliberately, not forgotten: My Journey personalization beyond what already existed, progressive identity/reputation system, and a Next 16 major upgrade (fixes one remaining high-severity advisory nested in Next's own build tooling, but is a breaking change not worth forcing through mid-launch).

**Definition of launched:** app is live on a real Vercel URL, a stranger can land, onboard, enter a room, post, reply, and report without help, and everything in "Blocking launch" below is checked off.

## Blocking launch

- [ ] **Set an Anthropic monthly Hard Limit + spend alert** at console.anthropic.com → Billing, before ever setting `app_config.ai_onboarding_enabled` to `true`. Not urgent since AI ships off by default, but must happen before flipping that flag, ever.
- [ ] **Create/confirm an Anthropic API key** for the app (only needed if/when AI onboarding is turned on — not needed to launch).
- [ ] **Spend 5–10 minutes personally reading r/quittingkratom and r/OPMS's current rules** before posting anything there. The launch-strategy research (`research/research-C-launch-strategy.md`) couldn't fetch Reddit directly and flagged this as something only Aaron can verify firsthand.
- [ ] **Get a free Resend API key** (resend.com, 100 emails/day free) if/when you want reply-notification emails actually sending -- the whole system is built and wired up but silently no-ops until `RESEND_API_KEY` and `EMAIL_NOTIFICATIONS_ENABLED=true` are set in Vercel's env vars. Not needed to launch; notifications just won't go out until this is set.
- [ ] **Set up a real contact email** and update `app/contact/page.tsx` -- deliberately left unset this session rather than publish a fake address. Also consider generating a fresh GitHub PAT and revoking the one pasted in plaintext chat this session (see security note below).

## Needs your opinion, not your technical work

- [ ] **Pick a visual direction** from `research/research-B-ux-ui-directions.md` — open the two mockups in `research/mockups/` in a browser and say which one (or a blend). No need to read the full report; the mockups are the fast path.
- [ ] **Confirm you're fine launching with AI onboarding off by default.** Both the cost review and the security review independently landed here already — this is a "tell me if you disagree" item, not an open question.
- [ ] **Review the draft legal/trust pages** (`/community-guidelines`, `/privacy`, `/terms`) — live now, written directly against `supabase/schema.sql` rather than generic boilerplate, but not legal-counsel-reviewed. They say "Draft — last reviewed 2026-08-05" in the page itself until you sign off.

## Security note
A GitHub fine-grained PAT was pasted directly in this session's chat to unblock `git push` (this environment had no git credentials at all, unlike whatever set up earlier sessions). It was used only for pushes, kept out of every committed file, and stored locally in `~/.git-credentials` outside the repo. Pasting tokens in plaintext chat isn't great hygiene generally -- worth generating a fresh one and revoking this one once a better credential-passing method is set up, though there's no evidence of misuse.

## Resolved (kept for the record — see `PROJECT_LOG.md` for full detail on any of these)

- [x] V1.1 core shipped and verified live (2026-08-05): navigation shell, Explore, My Journey route, 6-page resource library, About/Contact, draft legal pages, SEO basics, Vercel Analytics, accessibility pass, critical Next.js CVE patched. `npm run build` clean, all 25 routes generated, spot-checked live on mobile viewport (nav, mobile menu, Explore with real DB data, Journey empty state, Privacy Policy all confirmed working).
- [x] Click-tested the full return-visit flow live against production (2026-08-05): onboarded as a new anonymous visitor, posted, closed/reopened the site, landed on "Welcome back" with the correct room and the post intact. No bugs found. Test profile/post/room_visit rows deleted from prod afterward via Supabase SQL so no synthetic data lingers in this brand-new community.
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
- [ ] Next.js major upgrade (14 → 16) to clear the one remaining high-severity `npm audit` advisory (nested in Next's own bundled postcss, build-time only, not attacker-reachable on the live site). Deliberately not forced through same-day as launch since it's a breaking-change surface.
- [ ] Search wasn't built this pass -- judged not yet appropriate given how few rooms/resources exist. Revisit once there's enough content that browsing Explore/Resources stops being sufficient.
- [ ] Progressive identity / reputation / community-leadership ladder (from `PROJECT_BRIEF.md`'s long-term vision) -- not part of V1.1, still a real architectural project when it's time.

## Notes on Supabase security advisor output
Running Supabase's advisor after the schema migration and after enabling anonymous sign-in shows several items that look like warnings but are expected:
- `ai_rate_limit` has RLS enabled with no policies — intentional (default-deny; access only through the `check_and_increment_ai_rate_limit` function).
- `check_and_increment_ai_rate_limit` is callable by `anon`/`authenticated` — intentional, that's exactly how the app enforces the AI rate limit.
- Several tables show "Anonymous Access Policies" warnings — expected, since this app has no separate tier of permanent vs. anonymous accounts; every policy is meant to apply equally to anonymous sessions.
One real gap was found and fixed: `enforce_author_rate_limit` (a trigger-only function) was publicly callable via PostgREST's auto-exposed RPC — revoked from anon/authenticated/public.
