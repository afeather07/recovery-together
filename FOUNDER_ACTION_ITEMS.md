# Founder Action Items

**Read this file first, always.** This is the single place to answer "catch me up" — a current-state snapshot plus everything that needs Aaron's decision, opinion, or action. If it's not in here, treat it as not pending. For deeper history on any of this, see `PROJECT_LOG.md` — but you shouldn't need to most weeks.

---

## Right now (overwritten each session — this is a snapshot, not a log)

**Is production healthy?** Yes. Live at **https://justanotherfriend.com**, SSL verified, DNS confirmed at both Porkbun and Vercel. Full click-through tested on the real production domain: onboarding, anonymous auth, room entry, posting all confirmed working, zero console errors, all 30 routes return 200. The returning-user home screen ("My Journey" / the smart `/` landing for anyone with a session) now surfaces real recent activity in your room, real unanswered posts you could reply to, and a stage-relevant Recovery Library link — no fake data, nothing shown unless real data supports it.

**What's blocking real users?** Nothing technical. The only open item is Aaron personally executing outreach (see Blocking launch below) — the product itself is ready.

**What does Aaron need to do?** Work through "Blocking launch" below, in order. None of it is code.

**What is Claude doing next?** Overnight (2026-08-06→07), while Aaron slept: shipped the post/reply delete feature below, improved the mention-digest cron to produce more actionable findings, added a lightweight site/moderation watchdog (checks every 2 hours, only alerts on a real problem), and finished the full launch asset kit (bios, comment drafts, social posts, video scripts) in `research/ready-to-post-kit.md`. Continuing to watch the digest and pick off "Later" backlog items opportunistically. Reminder: none of the scheduled jobs are durable across sessions closing — they only run while this session stays open.

## Blocking launch (all non-technical now)

- [ ] **r/OPMS is banned** (confirmed by Aaron directly — Reddit itself, likely tied to the regulatory crackdown this whole plan was built around). Dropped from the target list. r/kratom is the next Reddit target (modmail drafted, see `research/ready-to-post-kit.md`), r/quittingkratom modmail already sent (2026-08-06), awaiting mod response.
- [ ] **Send the 4 Facebook group admin messages** — drafted and ready in `research/ready-to-post-kit.md`, not yet sent.
- [ ] **Set an Anthropic monthly Hard Limit + spend alert** at console.anthropic.com → Billing, before ever setting `app_config.ai_onboarding_enabled` to `true`. Not urgent since AI ships off by default.
- [ ] **Set up a real `@justanotherfriend.com` (or similar) contact email** and update `app/contact/page.tsx` — deliberately left unset rather than publish a fake address. Nothing code-side blocks this; just needs Aaron to create the address (e.g. via the domain registrar's free email forwarding, already active for this domain at Porkbun, or a real mailbox provider) and tell Claude the address to wire in.
- [ ] **Get a free Resend API key** (resend.com, 100 emails/day free) if/when reply-notification emails should start sending — the system is fully built and wired, silently no-ops until `RESEND_API_KEY` and `EMAIL_NOTIFICATIONS_ENABLED=true` are set in Vercel. Not needed to launch.
- [ ] **Review the draft legal pages** (`/community-guidelines`, `/privacy`, `/terms`) — say "Draft" on-page until Aaron signs off.
- [ ] **Rotate the Porkbun and GitHub credentials** pasted in plaintext chat this session, once convenient — used carefully (stored outside the repo, never committed, never re-printed) but plaintext-in-chat isn't ideal hygiene long-term.

## Needs your opinion, not your technical work

- [ ] **Pick a visual direction** from `research/research-B-ux-ui-directions.md` (mockups in `research/mockups/`) — still open, low urgency.
- [ ] **Confirm AI onboarding off by default is fine** — cost and security review both landed here; flag only if you disagree.
- [ ] **Read `/founder-story`** and `PROJECT_BRIEF.md`'s "Founder Vision" section — both written from what you shared; confirm the wording or edit directly.
- [ ] **Decide on the four growth workstreams** (`research/growth-workstreams.md`) — built as playbooks with one proof-of-concept each, not standing automation. Say the word if you want any actually scheduled.
- [ ] **Review `research/growth-targets.md`** before any deeper outreach (7-HOPE Alliance, Kratom Sobriety Podcast, Dr. Kirsten Smith at Johns Hopkins, others) — none contacted yet.

## Resolved (kept for the record — see `PROJECT_LOG.md` for full detail on any of these)

- [x] Post/reply delete feature shipped overnight (2026-08-07): owner-only DELETE RLS policies (live migration + `schema.sql` sync), Delete button replaces Report on a user's own content.
- [x] Returning-user "Today" experience strengthened (2026-08-06): real recent-activity recap, real unanswered-post surfacing ("someone could use a reply"), a stage-relevant Recovery Library link, Explore/Resources quick links — all real data, one primary button preserved.
- [x] Rebrand to "Just Another Friend" complete and verified live on the real domain (2026-08-06): domain purchased and DNS-connected via direct Porkbun API, SSL verified in Vercel, full public-facing copy/metadata/brand-mark rebrand, USPTO check came back clean, full click-through QA passed on production, one real test-data mixup (a test post under the founder's real first name) found and fixed.
- [x] Launch-readiness pass (2026-08-05): friction/link audit, `research/launch-checklist.md`, `research/first-week-operations.md`, `research/growth-targets.md`, sequenced first-100-users steps, Anxiety & Panic library page.
- [x] Founder Vision incorporated into founder-story, Start Here, and `PROJECT_BRIEF.md` (2026-08-05).
- [x] V1.1 shipped and verified live (2026-08-05): navigation, Explore, My Journey, resource library, legal pages, SEO, analytics, accessibility, critical Next.js CVE patched.
- [x] Recovery journey & continuity model built, identity-forking bug fixed, "Room not found" bug fixed, deployed to Vercel (2026-08-03–04).
- [x] Documentation consolidated 11 files → 5, Supabase connected and hardened, GitHub repo set up (2026-08-03).

## Later (not launch-blocking)

- [ ] Founder OS Dashboard read-only views, once that project actually exists (`PROJECT_BRIEF.md`'s "Future integration" section).
- [ ] Level 2 (email-based persistent accounts), once members actually want cross-device identity.
- [ ] Turnstile/hCaptcha if bot signups become a real problem (no traffic yet, not urgent).
- [ ] Decide on a proper in-app moderation dashboard vs. the Supabase table editor.
- [ ] Next.js 14 → 16 major upgrade to clear one low-risk lingering `npm audit` advisory (build-tooling only, not attacker-reachable).
- [ ] Search — not yet appropriate given how little content/how few rooms exist.
- [ ] Progressive identity / reputation / community-leadership ladder — long-term vision, not near-term.

## Notes on Supabase security advisor output
`ai_rate_limit`'s RLS-with-no-policies, `check_and_increment_ai_rate_limit`'s anon/authenticated callability, and "Anonymous Access Policies" warnings on several tables are all intentional, reviewed choices, not bugs — see `PROJECT_LOG.md`'s 2026-08-03 entries for the reasoning if this ever needs re-justifying.
