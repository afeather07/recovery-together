# Recovery Together — UX/UI Design Exploration (Workstream B)

**Scope:** propose visually distinct directions the "Recovery Together" MVP could evolve toward, grounded in real, well-regarded calm/health-adjacent products, and mocked up as static reference HTML. This is exploration only — nothing here touches the production codebase.

**Design constraint driving every decision:** the person opening this site may have slept two hours, be sweating through a withdrawal wave, be too shaky or distracted to type a paragraph, and be deciding in the next 10 seconds whether this feels safe enough to stay on. Every screen has to answer "am I safe here, and do I have to work for this?" before it answers anything else.

---

## 1. What the reference apps actually do (and what to borrow)

| App | What's actually good about it | Source |
|---|---|---|
| **Headspace** | Custom warm palette (hot orange #ff7300, amber #ffa500, gold #ffce00, candy pink #ffa1cc, deep purple #3b197f, teal-navy #27455c) used in flat, non-gradient-heavy blocks; avoids sharp contrast/high saturation on purpose to keep arousal low. Single custom typeface (Headspace Apercu) used for everything — one voice, no mixed signals. | [Figma Blog: Building a Design System That Breathes with Headspace](https://www.figma.com/blog/building-a-design-system-that-breathes-with-headspace/), [oh-my-design.kr Headspace tokens](https://oh-my-design.kr/design-systems/headspace) |
| **Calm** | Soft pastel/lavender palettes, semi-transparent blurred panels for depth without hard edges, "content browsing" cards with zero visual noise, 8px grid discipline so everything feels evenly spaced (nothing crowded = nothing to parse quickly under stress). | [Raw.Studio — The Aesthetics of Calm UX](https://raw.studio/blog/the-aesthetics-of-calm-ux-how-blur-and-muted-themes-are-redefining-digital-design/), [Calm Design System (Figma Community)](https://www.figma.com/community/file/970292434892043790/calm-design-system) |
| **Wysa** | Chat-first UI, not menu-first: the entire app is a conversation, everything else lives in a side drawer. Large, well-spaced bubbles. Free-text is always available but suggested-reply chips are the default path, so a user in a bad state never *has* to compose a sentence. A mascot (penguin) gives warmth without a human photo (avoids "who is this stranger" anxiety). | [ScreensDesign — Wysa showcase](https://screensdesign.com/showcase/wysa-mental-health-ai), [Wysa case studies](https://www.wysa.com/case-studies-and-reports) |
| **Woebot** | Same principle as Wysa — multiple-choice/tap responses are the default, free text is optional, never required. Conversation scripts are literally read aloud in "table reads" before shipping to catch anything that sounds clinical or cold. | [UX Writing Hub — Woebot case study](https://uxwritinghub.com/woebot-case-study-in-conversation-design-for-mental-health-products/), [Design Indaba — Woebot](https://www.designindaba.com/articles/creative-work/woebot-smart-accessible-mental-healthcare-solution) |
| **I Am Sober** | Makes progress *visible and tangible* — a live day/hour/minute counter, money saved, a one-tap daily pledge instead of a journal entry. Gamifies without infantilizing. | [ScreensDesign — I Am Sober UI breakdown](https://screensdesign.com/showcase/i-am-sober), [iamsober.com](https://iamsober.com/) |
| **Loosid** | Proof that a sober-community feed can feel like a normal social app (profiles, posts, chat) rather than a support-group waiting room — reduces the "clinical forum" feeling the current MVP is trying to avoid. | [Loosid app](https://loosidapp.com/) |
| **One Medical** | Rebrand (by Moniker) collapsed a busy palette into one dominant deep green, paired with intimate photography and hand-drawn watercolor illustration for warmth. Proves a single confident accent color + soft illustrative texture reads as "premium and human," not sterile. | [The Brand Identity — One Medical by Moniker](https://the-brandidentity.com/project/one-medical-moniker), [Transform Magazine — One Medical rebrand](https://www.transformmagazine.net/articles/2019/one-medical-rebrands-with-set-of-watercolours-and-photographs/) |
| **Ada Health** | Clean grey/white structured cards, visible progress bar during a multi-step flow so the user always knows how much is left (reduces the "how long is this going to take me" anxiety), clinical rigor communicated through restraint rather than density. | [ScreensDesign — Ada showcase](https://screensdesign.com/showcase/ada-check-your-health) |
| **Crisis Text Line** | Explicit design goal: take the user from "a hot moment to a cool calm." Shows a fully worked example conversation on the marketing site itself so a first-time visitor knows exactly what will happen before they commit — removes the biggest source of hesitation (fear of the unknown). | [Crisis Text Line brand guidelines](https://www.crisistextline.org/brand-guidelines/), [Wide Eye — Crisis Text Line case study](https://www.wideeye.co/case-study/crisis-text-line) |

**Cross-cutting UX research used to shape the interaction rules below:**
- Trauma-informed design principles (safety/predictability, choice and control, no dead ends): [UX Content Collective — trauma-informed content design](https://uxcontent.com/a-guide-to-trauma-informed-content-design/), [Birdcall UX — What is Trauma-Informed Design?](https://www.birdcallux.com/blog/what-is-trauma-informed-design/)
- "When a user reports distress, the interface should simplify automatically — secondary features fade, only grounding tools and essential actions remain" and "always offer a Safe Exit, never trap someone in a flow": [Constructive — Designing for Stress](https://constructive.co/insight/design-resources-high-stress-high-stakes/)
- Google Fonts pairings suited to wellness/legibility-under-stress products: [Matt Medley — Best Google Font Pairings for UI Design in 2025](https://medley.ltd/blog/best-google-font-pairings-for-ui-design-in-2025/), [LandingPageFlow — Google Font Pairings for 2026](https://www.landingpageflow.com/post/google-font-pairings-for-websites)

---

## 2. The three directions

All three keep the current MVP's good bones (card layout, pill buttons, live room preview, safety banner, 3-step "how it works") — they differ in **color, type, and how much the interface asks of the user's fingers and attention**, not in information architecture.

---

### Direction 1 — "Quiet Dawn"
*A warm, human evolution of the current palette. Feels like a hand on your shoulder at sunrise.*

**Emotional tone:** unhurried, human, hopeful — the visual opposite of a hospital waiting room, without losing an ounce of credibility.

**Color palette**
| Role | Hex | Notes |
|---|---|---|
| Background | `#FBF7F2` | warm ivory, softer than the current `#faf9f7` |
| Surface / card | `#FFFFFF` / `#F6F1EA` | pure white for elevated cards, warm sand for recessed panels |
| Text (primary) | `#2B2622` | warm near-black, less severe than pure ink-navy |
| Text (muted) | `#6B6259` | secondary copy, timestamps, hints |
| Primary accent | `#C1694F` | muted terracotta/clay — replaces the forest green as the "human warmth" signal |
| Secondary / highlight bg | `#F1E8DC` (fill) / `#E2D3BE` (border) | soft peach-sand, used for chips, selected states |
| Tertiary accent | `#7C9A82` | a muted moss green kept as a bridge to the current brand, used sparingly (e.g. "safe" indicators) |
| Danger / safety alert | `#B8493A` on `#F7E7E3` | brick red, muted enough not to read as alarming, saturated enough to register as "pay attention" |

**Typography:** **Fraunces** (display/headlines — a warm, slightly quirky serif with optical sizing, feels handwritten-adjacent without sacrificing legibility) + **Karla** (body/UI — rounded humanist grotesque, very legible at small sizes, warm x-height). Both free on Google Fonts. This pairing reads editorial and personal (like a letter from a friend) rather than corporate.

**Components & interaction**
- **Onboarding entry:** the free-text "tell your story" textarea is replaced by a single tap: "How are you doing right now?" with three large emoji-tap tiles (Overwhelmed / Getting by / Hopeful). A microphone button sits below as an equal-weight alternative ("Or just talk — hold to speak instead of typing") for anyone who wants to say more without typing it. Nickname is auto-generated (adjective + noun, e.g. "steadyriver") with a single tap to reroll or edit one word — never a blank field. Stage is picked via large tap chips, not a dropdown (dropdowns require more fine motor precision and a decision-heavy scan of options).
- **Room/post feed:** chat-bubble layout like Wysa, generous padding, no avatars/photos (removes the comparison/self-consciousness trigger), nickname + stage-tag pill only. Reactions (🤍 "with you", ✋ "same") are one-tap and sit next to every post as an alternative to replying — most support can be given without composing anything.
- **Buttons/confirmations:** one primary pill CTA per screen. Destructive actions (leave room, delete post) use a plain-language two-button confirm ("Leave room" / "Stay") — never a modal stacked on a modal. The primary CTA has a subtle breathing pulse animation (mirrors the hero's animated blob) rather than a hard shadow, reinforcing "slow down" rather than "urgent action."

---

### Direction 2 — "Night Anchor"
*Dark-mode-first, built for 3am. Feels like a dim nightlight in the hallway — quiet, private, awake with you.*

**Why this direction exists:** the brief explicitly names an exhausted, sleep-deprived user. A bright off-white screen at 2am is a real, physical problem — glare increases eye strain and can spike alertness/anxiety right when the goal is de-escalation, and a dark screen is also more discreet for someone checking their phone under a blanket next to a sleeping partner.

**Color palette**
| Role | Hex | Notes |
|---|---|---|
| Background | `#10141C` | deep navy-charcoal, not pure black (pure black feels harsher/more "off" than a warm near-black) |
| Surface / card | `#1A212C` / `#212A38` | elevated panels, subtly lighter than bg |
| Text (primary) | `#EDEEF2` | soft off-white, not pure white (reduces glare) |
| Text (muted) | `#9BA3B4` | secondary copy |
| Primary accent | `#7C9CFF` | soft periwinkle-blue, used for the one primary CTA and glow accents |
| Secondary / highlight | `#1D3230` bg / `#5FA8A0` accent | muted teal, used for "live"/"safe" indicators and step numbers |
| Danger / safety alert | `#E8A33D` (amber) for the persistent safety banner; `#E2554A` (true red) reserved *only* for an active emergency/crisis action | Deliberately **not** red-by-default at night — research on crisis UX shows saturated red at low-light/high-anxiety moments reads as alarm-triggering; amber signals "important" without spiking arousal. True red is held in reserve so it still means something when it appears. |

**Typography:** **Sora** (display/headlines — geometric, rounded terminals, contemporary "calm tech" feel, similar spirit to what Headspace/Calm use in their own product type systems) + **Inter** (body/UI — the current standard for legibility at small sizes and low contrast, designed specifically for screens). Both free on Google Fonts.

**Components & interaction**
- **Onboarding entry:** identical tap-first flow to Direction 1 (mood tiles, auto-nickname, tap-chip stage, mic option) but the whole modal sits on a near-black sheet with soft glow accents instead of hard borders — no element should be bright enness enough to make someone squint. Any auto-playing animation (the hero "orb") pulses slowly (5–6s cycle) to nudge breathing rate down, echoing 4-7-8 breathing pacing used in anxiety-focused apps.
- **Room/post feed:** same bubble layout, but bubbles use two tone-on-tone dark surfaces (`--surface` vs `--surface-soft`) instead of color, so contrast stays low and nothing "pops" harshly against the dark background at 3am.
- **Buttons/confirmations:** primary CTA glows softly (a subtle box-shadow bloom in the accent color) rather than using high-contrast fill, so it's discoverable without being a flashbang against a dark screen. The persistent safety banner uses amber, not red, for the default "call/text 988" message; red is reserved for a single explicit "I'm in danger right now" tap-through.

---

### Direction 3 — "Soft Ground"
*Grounded, plainspoken, tap-only. Feels like a steady hand holding yours through a grounding exercise — official-but-kind, not clinical.*

**Why this direction exists:** distinct from the other two by leaning into *grounding technique* interaction patterns (the 5-4-3-2-1 sensory grounding method used in anxiety/panic-disorder care) rather than chat/warmth alone, and by using a more neutral, almost governmental-trustworthy typographic voice (think: a form you'd actually trust from a doctor's office, but not sterile) — closer to Ada Health's structured-card restraint and One Medical's confident single-accent-color simplicity than to Headspace/Calm's illustrative warmth.

**Color palette**
| Role | Hex | Notes |
|---|---|---|
| Background | `#F2F0EC` | warm stone/neutral, less peach than Direction 1, less warm than the current `#faf9f7` |
| Surface / card | `#FFFFFF` | |
| Text (primary) | `#262521` | |
| Text (muted) | `#6E6A62` | |
| Primary accent | `#4F7A63` | deep moss green — richer/more confident than the current muted forest `#3f6b5c`, still clearly "green = grounded/safe" |
| Secondary / highlight | `#EFE6D8` | warm sand fill for chips/cards |
| Danger / safety alert | `#B8564A` | ochre-red, warm rather than clinical-red |

**Typography:** **Lora** (display/headlines — a grounded, book-like serif that reads as considered and trustworthy, like a printed handout you'd keep) + **Public Sans** (body/UI — the typeface built for the U.S. federal government's USWDS design system; plainspoken, neutral, extremely legible, and carries an implicit "this is handled responsibly" signal without corporate coldness). Both free on Google Fonts.

**Components & interaction**
- **Onboarding entry:** the most tap-only of the three. Instead of any text field at all, onboarding opens with a single full-screen breathing animation (expanding/contracting circle, 4-count in/6-count out) the user can tap through immediately or watch for 10 seconds — this doubles as both a grounding tool *and* the "loading/entry" moment, so waiting never feels empty or anxious. Mood, stage, and nickname selection follow as large single-column tap cards, one decision per screen, with a persistent "skip for now, just let me in" link visible on every step (a hard requirement per trauma-informed design: never trap someone in a flow).
- **Room/post feed:** structured cards (closer to Ada Health's grey/white rigor) rather than loose chat bubbles — each post is a clearly bounded card with a visible relative timestamp and a stage-tag, making the room feel organized and predictable rather than a stream to keep up with. This suits users who find an endless chat feed itself overstimulating.
- **Buttons/confirmations:** every irreversible action (leaving, reporting, blocking) uses a plain-language confirmation written at a 6th-grade reading level ("This will remove your post. You can't undo it.") rather than jargon like "Confirm deletion" — directly following the "plain language reduces cognitive load in urgent/emotional decisions" principle from trauma-informed UX research cited above.

---

## 3. Interaction rules shared across all three directions (regardless of which is chosen)

These come directly from the trauma-informed design and crisis-app research above and should hold no matter which palette ships:

1. **Tap before type, always.** Every required decision (mood, stage, nickname) must have a zero-typing path. Free text is always optional, never the only way to proceed — directly mirrors how Wysa and Woebot handle onboarding/check-ins.
2. **One decision per screen.** No compound forms. Progress dots, not percentages (percentages imply a time cost the user will start dreading).
3. **Never a dead end.** Every step has a visible way out or back ("skip," "back," "exit") — the Safe Exit principle. No modal-stacked-on-modal.
4. **The safety banner is always present, never a modal.** It should never require a decision or dismissal that could be perceived as "in the way" of getting support — it's a persistent, low-friction strip, not an interruption.
5. **Progress must be visible in any multi-step flow** (Ada Health's lesson) — a user deciding whether to continue needs to know "how much is left," or they'll bail.
6. **Reduce comparison anxiety** by omitting user photos/avatars in the room feed across all directions — nickname + stage tag only.

---

## 4. Mockups delivered

Two of the three directions were built as self-contained static HTML files (inline CSS, Google Fonts via `<link>`, a few lines of vanilla JS only to toggle the onboarding modal open/closed for demo purposes — no frameworks, no build step). Each mocks the landing-page hero, safety banner, "how it works," live room preview, and the first screen of the onboarding entry point (mood-tap step) using that direction's real palette and type.

- `mockup-direction-1-quiet-dawn.html` — Direction 1, warm/light palette, Fraunces + Karla.
- `mockup-direction-2-night-anchor.html` — Direction 2, dark-mode palette, Sora + Inter.

Direction 3 ("Soft Ground") was left as a written spec only in this pass — the pattern differs enough (breathing-animation-as-entry-point, structured cards instead of chat bubbles) that it would need its own build rather than a reskin of the other two; flag if you want it mocked next.

Open either HTML file directly in a browser to preview (internet connection needed once, to load the Google Fonts — both degrade gracefully to system sans/serif fallbacks if offline).

## 5. Recommendation

If only one direction should move forward first: **Quiet Dawn** is the safest evolution of the existing brand (same green-adjacent DNA, same layout, just warmer and less clinical) and is the lowest-risk pitch to bring back to Aaron. **Night Anchor** is the more differentiated, evidence-backed choice given the explicit "2am, exhausted" user in the brief, and is worth prototyping further even if Quiet Dawn ships first as the default light experience — the two are not mutually exclusive; Night Anchor could ship as a system/user-toggleable dark mode of the same component set.


---

## Addendum (2026-08-04): Discoverability, navigation, and continuity research

Added in response to Aaron's post-launch review asking why the site feels bland/limited, and a request to study Reddit, Discord, Duolingo, Headspace, Calm, TalkLife, PatientsLikeMe, and CaringBridge specifically for navigation/discoverability/return-user psychology. Full synthesis delivered in chat; key new sourced findings below for future reference.

- **Reddit built a whole "Discover" tab specifically because members couldn't find communities worth a "deep connection"** -- Reddit's own Director of Product named this as the exact problem. Directly validates that Recovery Together's current lack of any way to see/browse rooms you're not already in is a real, well-precedented gap, not a nice-to-have. Source: [TechCrunch -- Reddit's Discover tab](https://techcrunch.com/2022/02/24/reddit-revamps-with-a-new-discover-tab-for-finding-communities/amp/)
- **Discord's server cards show name, icon, one-line description, and online/total member counts** as the minimum viable unit for someone to decide whether to step into a space they haven't joined yet. Adaptable to a "browse all rooms" view -- but counts must always be real; never repeat the fake "18 people checking in" mistake. Source: [arXiv -- Discord's "third place" design](https://arxiv.org/html/2501.09951v1)
- **Duolingo's own retention data confirms the risk we already designed around:** streaks work via loss aversion, but Duolingo's own write-ups admit the mechanic risks becoming "a grind" where "people weren't logging in to learn... they were logging in so they didn't lose." This is independent confirmation (not just TalkLife's cautionary tale) that PROJECT_BRIEF.md's no-streaks, no-leaderboard stance is correct, not overly cautious. Source: [Apptitude -- How Duolingo's streak mechanic actually works](https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/)
- **PatientsLikeMe's core mechanic is structured, non-competitive comparison** -- patients see outcomes from others with the same condition, framed as data/context, never as ranking. A useful model for "read other people's experiences regardless of what room they're in" -- browsable by stage/theme, not a leaderboard or a raw firehose. Source: [PatientsLikeMe -- About](https://www.patientslikeme.com/about)
- **CaringBridge's core unit is a persistent personal story page that a support network follows over time** -- the closest existing analog to "someone's journey across Day 1 -> Day 5 should be visible and followable," just currently scoped to one-to-one caregiving rather than peer community. Source: [CaringBridge -- why it's trusted](https://www.caringbridge.org/resources/why-caringbridge-is-the-trusted-platform-for-your-health-journey-journal)

No single existing product matches the full shape Aaron described (stage-based rooms + progressive identity + non-gamified continuity + peer support). The closest composite is Discord's browsable-space structure + CaringBridge's persistent personal story + Headspace/Calm's calm visual language (already detailed above) -- not a product to copy, a combination to adapt.
