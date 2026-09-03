# Founder Action Items

**Read this file first, always.** This is the single place to answer "catch me up" — a current-state snapshot plus everything that needs Aaron's decision, opinion, or action. If it's not in here, treat it as not pending. For deeper history on any of this, see `PROJECT_LOG.md` — but you shouldn't need to most weeks.

---

## Right now (overwritten each session — this is a snapshot, not a log)

**Is production healthy? Yes, as of just now — but it was DOWN before this session.** The Supabase database had auto-paused from inactivity (the free-tier "idle 7 days" behavior flagged as a risk in `PRINCIPLES.md`'s cost table). That means the live site was fully broken — no login, no posting, no replies, nothing worked — until this session found and fixed it. Restored via the Supabase API this session; confirmed `ACTIVE_HEALTHY`, real data intact (9 profiles, 4 posts, 4 replies survived untouched), RLS policies all correctly in place, security advisors show only the already-reviewed intentional items (see Notes section below) plus one irrelevant leaked-password-protection warning (no passwords exist in this app — anonymous auth only). Local build verified clean, all 33 routes compile with zero errors.

**Root cause of "notifications don't work" (the thing Aaron flagged):** they actually do — the in-app "N replies waiting" flow (`ReturnScreen.tsx` + `room_visits` table) and the email-digest cron (`app/api/cron/daily-digest/route.ts`) are both correctly built and wired. Email sending itself is off by default until a Resend API key is set (already on Aaron's action list below, not a bug) — but the in-app version needs no email at all and works today for anyone with a session, once the database above is actually reachable. The real problem was the paused database making the whole site 100% inaccessible, which looks identical to "nothing works" from the outside regardless of which specific feature you're testing.

**What's blocking real users?** Nothing technical now that the database is restored. The recurrence risk (Supabase free tier auto-pausing again after ~7 idle days) is now closed too — the daily Vercel cron always pings the database first regardless of whether email notifications are on, so as long as that cron keeps firing (it does automatically, independent of any Claude session being open), the project should never sit idle long enough to pause again.

**What does Aaron need to do?** Work through "Blocking launch" below, in order. None of it is code.

**What is Claude doing next?** This session: found and fixed the paused-database outage, verified data integrity, confirmed the build is clean, and audited the reply/notification flow end-to-end (code is correct, not a bug). Continuing to watch for further issues and pick off "Later" backlog items opportunistically. Reminder: none of the scheduled jobs are durable across sessions closing — they only run while a session stays open, and the database pausing again after another idle week is a real risk worth Aaron's attention (see below).

## Blocking launch (all non-technical now)

- [ ] **r/OPMS is banned** (confirmed by Aaron directly — Reddit itself, likely tied to the regulatory crackdown this whole plan was built around). Dropped from the target list. r/kratom is the next Reddit target (modmail drafted, see `research/ready-to-post-kit.md`), r/quittingkratom modmail already sent (2026-08-06), awaiting mod response.
- [ ] **Send the 4 Facebook group admin messages** — drafted and ready in `research/ready-to-post-kit.md`, not yet sent.
- [ ] **Set an Anthropic monthly Hard Limit + spend alert** at console.anthropic.com → Billing, before ever setting `app_config.ai_onboarding_enabled` to `true`. Not urgent since AI ships off by default.
- [ ] **Set up a real `@justanotherfriend.com` (or similar) contact email** and update `app/contact/page.tsx` — deliberately left unset rather than publish a fake address. Nothing code-side blocks this; just needs Aaron to create the address (e.g. via the domain registrar's free email forwarding, already active for this domain at Porkbun, or a real mailbox provider) and tell Claude the address to wire in.
- [ ] **Get a free Resend API key** (resend.com, 100 emails/day free) if/when reply-notification emails should start sending — the system is fully built and wired, silently no-ops until `RESEND_API_KEY` and `EMAIL_NOTIFICATIONS_ENABLED=true` are set in Vercel. Not needed to launch.
- [ ] **Review the draft legal pages** (`/community-guidelines`, `/privacy`, `/terms`) — say "Draft" on-page until Aaron signs off.
- [ ] **Rotate the Porkbun and GitHub credentials** pasted in plaintext chat this session, once convenient — used carefully (stored outside the repo, never committed, never re-printed) but plaintext-in-chat isn't ideal hygiene long-term. The GitHub token specifically appears already invalid as of 2026-08-09 (`git push` gets "Invalid username or token" directly from GitHub) — a fresh one is needed for Claude to push again, not just a rotation nicety.
- [ ] **Set up Google Search Console**: go to search.google.com/search-console → Add property → Domain → `justanotherfriend.com` → it gives you a DNS TXT record → send Claude that value and it'll add it to Porkbun directly (already connected) → once verified, submit `https://justanotherfriend.com/sitemap.xml` under Sitemaps. ~10 minutes total, needs your Google account.

## Needs your opinion, not your technical work

- [ ] **Pick a visual direction** from `research/research-B-ux-ui-directions.md` (mockups in `research/mockups/`) — still open, low urgency.
- [ ] **Confirm AI onboarding off by default is fine** — cost and security review both landed here; flag only if you disagree.
- [ ] **Read `/founder-story`** and `PROJECT_BRIEF.md`'s "Founder Vision" section — both written from what you shared; confirm the wording or edit directly.
- [ ] **Decide on the four growth workstreams** (`research/growth-workstreams.md`) — built as playbooks with one proof-of-concept each, not standing automation. Say the word if you want any actually scheduled.
- [ ] **Review `research/growth-targets.md`** before any deeper outreach (7-HOPE Alliance, Kratom Sobriety Podcast, Dr. Kirsten Smith at Johns Hopkins, others) — none contacted yet.

## Resolved (kept for the record — see `PROJECT_LOG.md` for full detail on any of these)

- [x] **Production outage found and fixed (2026-09-03):** Supabase database had auto-paused from inactivity, taking the entire live site down (no login, no posting, no replies — this is what Aaron was running into). Restored via the Supabase API, data verified intact. Root cause of *why* it went idle also fixed: the daily cron was short-circuiting before ever querying Supabase whenever email notifications are disabled (the current default), so nothing was keeping the project awake. It now always does one trivial query first, so this won't recur as long as the daily cron keeps running. Also confirmed during this pass: the in-app reply-notification flow (unread badges on the return screen) and the email-digest cron are both correctly built — Aaron's "can't tell if anyone replied" concern was really this outage, not a missing feature.
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
