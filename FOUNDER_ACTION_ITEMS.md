# Founder Action Items

**Read this file first, always.** This is the single place to answer "catch me up" — a current-state snapshot plus everything that needs Aaron's decision, opinion, or action. If it's not in here, treat it as not pending. For deeper history on any of this, see `PROJECT_LOG.md` — but you shouldn't need to most weeks.

---

## ⚠ Two things to read before anything else

1. **Timing:** `research/research-C-launch-strategy.md` (written 2026-08-03) says the DEA's temporary 7-OH scheduling order cannot take effect before **2026-08-05 — today**, and treats the days right around that date as the single highest-leverage, non-repeatable launch moment this product will get. If that's still accurate, Phase A of `research/launch-plan.md` (Reddit/Facebook/TikTok, all requiring Aaron's own identity to post under — Claude can't do this part) is worth acting on now, not after further polish.
2. **Naming collision:** `recoverytogether.com` is already a live, unrelated commercial addiction-treatment lead-generation site — exact same name, "Recovery Together," collecting insurance info to sell treatment referrals. Full detail and a recommended domain in `research/launch-checklist.md`. This is a brand/possibly-trademark question worth Aaron's own read, not something to route around silently.

Both are judgment calls only Aaron can make — not something Claude should decide alone.

## Right now (overwritten each session — this is a snapshot, not a log)

Live at **https://recovery-together.vercel.app**. V1.1 is complete and the product has been through a full launch-readiness pass: a real friction/link audit (all 30 live routes return 200, `/admin` confirmed properly gated, no console errors found), a domain recommendation (`research/launch-checklist.md`, see the naming-collision flag above), the site's public URL is now a single env-var-driven source of truth (`lib/site.ts`) so switching domains later needs zero code changes, a launch checklist, a first-week operating checklist, a concretely sequenced first-100-users plan, real (not fabricated) growth-target research on organizations/researchers/podcasts in this exact space, and one more Recovery Library page (Anxiety & Panic, split out from the combined mental-health page since it's common and high-fear enough to deserve its own focused page). Full detail in `PROJECT_LOG.md`'s 2026-08-05 entries.

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
- [ ] **Read `/founder-story`** — now rewritten with the specific details you shared (dependency on concentrated 7-OH, using to function, overspending, late-night Reddit searching, hiding it from family/friends, feeling alone despite others visibly going through the same thing). Kept humble and non-dramatized as you asked, no identity revealed. It's still your story in your voice — confirm the wording is right, or edit it directly.
- [ ] **`PROJECT_BRIEF.md` now has a "Founder Vision" section** with a paraphrased, more concise version of the same context (this repo is public, so I kept it dignified rather than diary-level detailed — the fuller version lives on the `/founder-story` page you control). Check the wording matches what you're comfortable having in the durable project doc specifically.
- [ ] **Decide on the four growth workstreams** (`research/growth-workstreams.md`) — I built these as playbooks with one real proof-of-concept each, not standing automation (recurring Reddit scanning, auto-generated content, auto-drafted outreach). If you want any of them actually running on a schedule, that's a real cost/brand-risk decision worth a deliberate yes, not a default.
- [ ] **Pick a domain** — read the naming-collision flag at the top of this file and `research/launch-checklist.md`'s domain section in full before buying anything. My recommendation is `recoverytogetherapp.com`, but confirm actual registrar availability/price yourself and consider whether a cheap trademark search is worth doing first.
- [ ] **Review `research/growth-targets.md`** before any Phase C outreach — real organizations/researchers/podcasts found via web search (7-HOPE Alliance, Kratom Sobriety Podcast, Dr. Kirsten Smith at Johns Hopkins, others), none contacted, all flagged as premature until there's a real product with usage data to show them.

## Security note
A GitHub fine-grained PAT was pasted directly in this session's chat to unblock `git push` (this environment had no git credentials at all, unlike whatever set up earlier sessions). It was used only for pushes, kept out of every committed file, and stored locally in `~/.git-credentials` outside the repo. Pasting tokens in plaintext chat isn't great hygiene generally -- worth generating a fresh one and revoking this one once a better credential-passing method is set up, though there's no evidence of misuse.

## Resolved (kept for the record — see `PROJECT_LOG.md` for full detail on any of these)

- [x] Launch-readiness pass (2026-08-05): friction/link audit (30/30 routes return 200, `/admin` gating confirmed), domain research (found the `recoverytogether.com` naming collision, recommended `recoverytogetherapp.com`, refactored the codebase to a single `lib/site.ts` env-var source of truth for the site URL), `research/launch-checklist.md`, `research/first-week-operations.md`, concretely sequenced first-100-users steps added to `research/launch-plan.md`, `research/growth-targets.md` (real researched organizations/researchers/podcasts, none contacted), and a new Anxiety & Panic Recovery Library page. `npm run build` clean, 30 routes.
- [x] Founder Vision incorporated (2026-08-05): Aaron shared the real, specific personal context behind why Recovery Together exists. Rewrote `/founder-story` with it (still no identity revealed, still humble/non-dramatized per his instruction), lightly sharpened `/start-here` and the homepage founder quote toward the three target feelings ("I found my people," "I am not alone," "I know what to do next"), and added a paraphrased "Founder Vision" section to `PROJECT_BRIEF.md` as the durable record, per his explicit instruction not to create a new file for it.
- [x] V1.1 finishing pass shipped and verified live (2026-08-05): two more Recovery Library pages, educational-vs-peer badge, `/start-here`, `/founder-story`, homepage warmth section (no fake activity), reorganized footer, `research/launch-plan.md` (Phase A/B/C, surfaces the Aug 5 DEA timing above), `research/growth-workstreams.md` (four growth playbooks, deliberately not standing automation). `npm run build` clean, 29 routes, spot-checked live.
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
