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
