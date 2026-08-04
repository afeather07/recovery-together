# Recovery Together — Product Brief

## Mission
Launch a calm, low-friction peer-support web application for adults preparing to stop, currently stopping, or recovering from 7-hydroxymitragynine (`7-OH`) and concentrated kratom products.

Core promise:

**You do not have to go through this alone.**

## User condition
Assume the user may be exhausted, frightened, sweating, restless, unable to sleep, unable to focus, and unwilling to complete long forms. Every interaction must minimize decisions, typing, reading, and navigation.

## Product definition
Recovery Together is:
- peer support,
- connection,
- encouragement,
- recovery-stage community,
- access to clearly labeled professional and emergency resources.

Recovery Together is not:
- a detox provider,
- medical treatment,
- medical advice,
- a tapering service,
- medication guidance,
- a guarantee of safety or recovery.

## Launch target
Release a genuinely usable MVP as quickly as possible. Build the smallest product that lets a real stranger:
1. Understand the value within 10 seconds.
2. Join with minimal effort.
3. Use a pseudonym.
4. Select or describe their current stage.
5. Enter an appropriate peer-support room.
6. Post and reply.
7. Report unsafe content.
8. Find visible safety and professional-support resources.

## MVP scope
Required:
- responsive landing page,
- minimal onboarding,
- anonymous/pseudonymous profile,
- recovery-stage selection,
- community rooms,
- posts and replies,
- reporting,
- basic moderation controls,
- visible safety resources,
- basic analytics and error monitoring.

Not required for launch:
- native mobile apps,
- direct messages,
- nearby meetups,
- exact-location sharing,
- video or voice rooms,
- streaks or gamification,
- treatment advertising,
- payment features,
- complex AI coaching,
- medical symptom interpretation,
- autonomous facility outreach.

## AI onboarding
AI may convert free-form text or speech transcription into a draft profile containing only:
- nickname,
- broad location if voluntarily provided,
- recovery stage,
- support need,
- privacy preference.

The user must confirm before saving. AI must not diagnose, predict withdrawal severity, or recommend medication/taper decisions.

## Privacy model
- Pseudonymous by default.
- Exact location is not required.
- Real identity and photo are optional.
- Never expose private identity information merely because another user revealed theirs.
- Collect the minimum data required to operate the service.

## Design principles
- Mobile first.
- Familiar, modern interaction patterns.
- Large touch targets.
- Short copy.
- Minimal screens.
- Calm visual hierarchy.
- No unnecessary animation, dense dashboards, or complex menus.

## Success criterion
The first milestone is:

**One stranger can discover the site, join, enter the correct room, and receive a useful human response without assistance from the founder.**

---

## Long-term vision: Progressive Identity (post-MVP — nothing above this line changes)

Everything above is still V1 as-is. Nothing in this section is implemented yet, and none of it blocks or slows the current launch. The core idea is Aaron's; the evaluation of specific providers and mechanics below is Claude's, done critically rather than adopted wholesale.

### Philosophy
Anonymous participation stays the default entry point, forever — not a permanent ceiling. Many people arrive scared, ashamed, or just wanting privacy, and that path should always stay effortless. But over time, members who want to should be able to build a persistent identity, a reputation, and eventually a leadership role. The goal is long-term trust, authenticity, and belonging on top of the low-friction crisis support that already exists.

### The identity ladder
- **Level 1 — Anonymous** (the entire MVP today): instant entry, random nickname, generic avatar, lowest friction.
- **Level 2 — Persistent Member**: permanent username, profile, bio, recovery milestones, saved preferences. Needs some durable identity — email is the natural first option (see below).
- **Level 3 — Verified Member (optional, never required)**: confirmed email/phone are cheap and reasonable. Real-name/photo/identity verification is expensive per-check and sits in direct tension with the bootstrapped-cost principle in `PRINCIPLES.md` — recommend deferring real identity verification indefinitely, or building it only much later, only for the small number of people being vetted as moderators, not as a general member feature.
- **Level 4 — Trusted Community Member**: earned through behavior — helpful participation, time in recovery, no moderation issues, peer endorsements — never through a public score or leaderboard. This is a direct response to a real failure mode surfaced in `research/research-A-product-landscape.md`: TalkLife's leaderboard/heart mechanics reportedly turned recovery into competitive suffering for its users. Don't repeat that.
- **Level 5 — Community Leader**: moderators, mentors, group leaders, ambassadors. Human-vetted promotions (Aaron, or a trusted lead he delegates to, manually grants this) — not an automated threshold. Automate only if manual vetting becomes an actual bottleneck.

### Account/provider recommendation (for when Level 2 gets built)
Ranked by value vs. added complexity:
1. **Email (magic link) — build this first.** No password to manage, no third-party dependency. Supabase Auth has a native path for upgrading an anonymous user to a permanent identity that keeps the same account and history (same `auth.users.id`, no migration) — this is the natural, lowest-risk on-ramp from Level 1 to Level 2.
2. **Google** — real value, huge reach, mature Supabase OAuth support, low added maintenance. Reasonable once the email upgrade path exists.
3. **Apple** — lower priority for a web-only product today, but keep on the roadmap: Apple's private-relay email fits this audience's privacy sensitivity well, and it becomes mandatory if a native iOS app is ever built (Apple requires it once other social logins are offered).
4. **Facebook — not recommended.** This is the one place worth pushing back rather than just deferring: this audience is managing a stigmatized health condition and already over-indexes on wanting privacy (confirmed in the product research). Tying identity to a real-name social graph cuts against the entire trust model here, even if Recovery Together itself never posts anything. Recommend dropping this, not just delaying it, unless a concrete member need shows up later.
5. **TikTok / Instagram — agreed with Aaron's instinct, not worth it.** Beyond low value: neither platform offers a mature general-purpose "Sign in with X" identity flow the way Google/Apple do — they're content platforms, not identity providers, so the integration would be unusually fragile for what it delivers.

### Design principle: earn trust, don't gamify it
No point totals, streak counters, or public leaderboards. Recognition looks like: a quiet "member since" marker, a badge for verified moderators, the ability to pin a helpful reply, being asked privately by a human to become a group leader. Nothing competitive, nothing that turns a hard day into a missed streak.

### What this means for the MVP right now: nothing changes
The current schema already supports this without modification. Supabase's anonymous auth is designed so an anonymous user can later link a real email or OAuth identity to the *same* underlying account, with the same posts and history intact. `profiles` already keys off that same id. This vision is something to build as an *addition* later, not a reason to re-architect anything already shipped.

### Roadmap placement
Uses the same phase numbering as the AI roadmap in `PRINCIPLES.md` — the two tracks move independently based on what the community actually needs first.
- **Phase 1 (launch):** Level 1 only. Everything below is deferred.
- **Phase 2:** Level 2 (email-based persistent accounts) — only once there's a real, observed reason members want to keep an identity across visits, not before.
- **Phase 3:** Level 3 (optional verified badges) and early Level 4 (manual trust recognition, no automation).
- **Phase 4:** Level 5 (community leader promotion), automating trust signals only if manual vetting becomes the bottleneck, Google/Apple login if warranted by then.

---

## Recovery journey & continuity model (post-MVP — design approved before build)

Aaron's framing, and it's the right one: this isn't a "rooms and dashboards" problem, it's a "the site should remember someone's recovery, not just their last click" problem. This section is the answer to that, and the design of record for the next build phase. Nothing here changes MVP scope; it's the spec for what comes right after. Two live bugs found during a code review directly motivate this (see `PROJECT_LOG.md`, 2026-08-04 entry): onboarding currently creates a brand-new anonymous identity on every visit instead of reusing an existing session, and there is no notification mechanism of any kind. Both get fixed as part of this, not separately.

### The one architectural decision everything else depends on
There are two different kinds of "remembering," and conflating them is what made this feel harder than it is:
1. **Session continuity — free, automatic, applies to every single visitor, anonymous or not.** Supabase's anonymous auth already persists via a cookie in the same browser. Fixing the reuse bug means anyone who returns on the same device is already recognized, with zero account and zero extra consent needed, because it's the same mechanism "anonymous sign-in" already implies.
2. **Cross-device persistence — requires something durable, i.e. an optional account.** A different phone, a cleared browser, or wanting your history to survive on purpose needs an email tied to the account. This is exactly Level 2 from the identity ladder above, and it should ship now rather than staying theoretical, since it's also the fix for notifications (below).

Aaron asked whether identity should be tracked "through accounts or IP address." Explicitly ruling out IP: it's unreliable for this (shared/mobile/VPN IPs make it useless as an identity signal) and it's a real privacy liability to associate an IP address with someone's recovery status on a stigmatized health topic, for no actual gain over the session/account model above. Not doing this.

### Rooms aren't a single membership, they're a history
Recovery isn't a single room, it's a path through several. The model: a person has exactly one **current room** (matches their actual, self-confirmed stage today) and a growing list of **past rooms** they remain a full member of — they can still read, reply, and be replied to in every room they've ever posted in. Nothing is archived or locked. The home experience always leads with the current room and surfaces past-room activity as a secondary, collapsed list — never a wall of equal-weight options.

### Answering the ten questions directly

**1. First 30 minutes.** Unchanged from today's flow, and it should stay unchanged: anonymous by default, one intake, straight into a matched room. The account offer does *not* belong at the front door — putting a "log in / create account / stay anonymous" choice before someone has told their story reintroduces the exact signup-wall friction the anonymous-first design was built to avoid, at the worst possible moment (scared, exhausted, first 30 seconds). Instead, the optional-account offer appears once, lightly, right after their first post: "Want us to save this and let you know if someone replies? Just needs an email — totally optional." That's the whole ask, and it's the one place in this doc where Aaron's ChatGPT-sourced instinct needed correcting rather than adopting.

**2. Day 2.** They return (ideally prompted by a reply-notification email — see below). Landing on the marketing homepage again would be a regression; anyone with a valid session goes straight to a personalized return screen instead: one primary action ("Continue to Day 2"), plus "2 replies waiting in Day 1" as a secondary line. Their stage is never silently reassigned — see question 6.

**3. Day 5.** Same return screen, now showing a simple journey trail (Day 1 → Day 2–3 → Day 4–7, today) with an unread count per past room, and their current room leading. This is the multi-room membership model made visible.

**4. Disappears for two weeks.** At most one re-engagement email, sent once, with zero guilt framing — "Whenever you're ready, your room is still here" and nothing else. This is a hard constraint, not a style preference: shame is a known relapse trigger, and a drip-campaign re-engagement sequence (the default pattern most growth playbooks reach for) would be actively harmful for this specific audience. On return, ask neutrally which stage they're actually on rather than assuming linear progress — recovery isn't a calendar timer, and treating it like one would be both wrong and alienating.

**5. Anonymous to trusted member over time.** Already specified above in the identity ladder — this section is that ladder's UX, not a new model. Level 1 gets session continuity for free today (once the bug is fixed). Level 2 (optional email) is what's being greenlit here. Levels 3–5 stay exactly as scoped, unlocked by behavior, never by public metrics.

**6. How the system knows the next action without overwhelming.** Hard rule: the return screen has exactly one primary button, always. Everything else — past-room replies, stage confirmation, account prompts — is secondary and collapsed. Stage never auto-changes silently; it's suggested ("It's been 2 days since your last check-in — still Day 1, or has it moved?") and confirmed in one tap, never overwritten without asking.

**7. What the software should remember.** Which rooms someone has posted or replied in, their current self-confirmed stage and when it last changed, unread-reply counts per room they're a member of, nickname and avatar seed, opt-in email if they added one, last-active timestamp. That's the complete list.

**8. What it should never remember.** Real name or identity unless a member deliberately adds it via the optional account upgrade — never inferred or collected passively. No IP-based tracking (see above). No device fingerprinting, no precise location. No read receipts or "seen" indicators on individual messages — that creates the exact social pressure this product is designed to avoid. No engagement-scoring or analytics beyond what the room/notification mechanics themselves need.

**9. Notifications.** Opt-in email only for now — no push (no native app to justify the complexity yet), no SMS (a phone number is identifying information this product has no reason to collect). Batched, not per-message: "You have 2 new replies" as a digest, not one email per reply — instant-per-message notifications would push this toward the social-media dopamine loop the whole product is deliberately built to avoid. Re-engagement email capped at one per absence period per question 4.

**10. Home screen after the first visit.** The public marketing homepage is for new, logged-out visitors only. Anyone with an existing session — anonymous or account — never sees it again; they land directly on the personalized return screen described above.

### What this unlocks, in build order (not started — waiting on approval per Aaron's instruction)
1. Fix the onboarding session-reuse bug (no new anonymous identity on repeat visits).
2. Build the personalized return screen (replaces homepage for anyone with a session) with one primary CTA and the stage-confirmation micro-interaction.
3. Add the optional post-first-post email capture, tied to the existing Level 2 account-linking path Supabase already supports.
4. Add the batched reply-notification email and the single non-judgmental re-engagement email.
5. Replace the landing page's fake "18 people checking in / Live" room preview with honest copy (found during the same review, unrelated to this doc but should ship alongside it — see `FOUNDER_ACTION_ITEMS.md`).

---

## Future integration: Founder OS Dashboard data source (post-MVP — non-blocking)

Recovery Together will not build its own dashboard. Instead, whenever a separate "Founder OS Dashboard" gets built later, Recovery Together should already be positioned to feed it clean, stable, read-only data — project/engineering status, deployment status, and operational/community health — without needing heavy new engineering at that point. Nothing in this section affects the current MVP or launch timeline.

### What's already true today, at zero cost
- **Project/engineering status** (roadmap, action items, decision history) already lives as plain files in this repo (`FOUNDER_ACTION_ITEMS.md`, `PROJECT_LOG.md`, `PROJECT_BRIEF.md`). GitHub's own API already serves file contents over a stable, read-only, authenticated endpoint. A future dashboard reads these directly from GitHub — nothing new to build, ever.
- **Deployment status** (build success/failure, latest deploy, logs) will live on Vercel once deployed there. Vercel has its own stable read-only API for exactly this.
- **AI spend data** lives on Anthropic's side; console.anthropic.com's billing has its own API.
- **Database/operational data** (user counts, posts today, open reports, room activity) already technically has a read-only interface: Supabase auto-generates a REST API (PostgREST) over every table, gated by the same RLS already in place. This already exists — it isn't something to build later.

### The one real gap, and the plan for it (not built yet, deliberately)
The Supabase auto-API exposes raw tables one at a time, which is either too narrow (no aggregation) or would require the service_role key to safely combine data across tables — not what a dashboard asking "how many open reports, how many posts today, how close to the AI rate limit" actually needs. The clean fix, when this becomes relevant: a small number of read-only SQL views (e.g., one `stats_daily_summary` view) that pre-aggregate exactly the counts a dashboard needs, with a scoped read-only role granted access to those views only — never raw user content, never the service_role key itself.

### Why this isn't being built now
It's cheap, but premature — we don't yet know exactly which metrics the eventual Founder OS Dashboard needs, and guessing wrong now means redoing it later for no benefit today. Build this once that dashboard project actually exists and can specify what it wants. The schema is already clean and aggregate-friendly (same "already forward-compatible" pattern as the identity-ladder section above), so none of this blocks or complicates that future work.

### Design discipline going forward
Keep this loosely in mind for future Recovery Together features: prefer schema/data shapes that are easy to aggregate cleanly (counts, statuses, timestamps) over ones that entangle PII with operational metrics. A reminder to stay aware of, not a new rule needing enforcement machinery today.
