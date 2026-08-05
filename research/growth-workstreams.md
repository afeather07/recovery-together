# Growth workstreams — playbooks, not standing automation

Aaron asked for four internal growth "agents": Opportunity Scout, Content Studio, Outreach Assistant, Founder Briefing. Written 2026-08-05 as documented playbooks Claude adopts on request or at natural checkpoints, each with one real proof-of-concept below — deliberately **not** stood up as recurring, always-on automation (scheduled Reddit scraping, auto-generated social posts, auto-drafted outreach). Reasoning:

- There's no real traffic yet to scout, brief on, or write outreach about — Phase A (see `launch-plan.md`) is explicitly about learning from the first 20-50 users, not automating growth before there's anything to learn from.
- Recurring automated web-scanning and content generation is an ongoing token cost, which `PRINCIPLES.md`'s cost policy says gets flagged to Aaron, not defaulted into.
- Auto-drafted outreach to real people/organizations (therapists, treatment centers, journalists) is a brand-and-trust surface — worth a human in the loop by design, which a standing pipeline makes easier to erode over time by accident.

If Aaron wants any of these running on an actual schedule later, that's a real go/no-go decision (cost + review process), not a default.

---

## 1. Opportunity Scout

**What it does:** a bounded, one-time research pass to find the highest-value near-term opportunity — regulatory news, search trends, active discussions — rather than a daily standing scan.

**Proof of concept, done this session:** the single highest-value finding right now is already in `research-C-launch-strategy.md` and pulled forward into `launch-plan.md` — the DEA's temporary 7-OH scheduling order cannot take effect before **2026-08-05**, today. That's the launch window this whole plan is sequenced around.

**When to re-invoke:** ask Claude to run an Opportunity Scout pass before a specific push (e.g., before Phase B, or if there's another regulatory/news event) rather than on a calendar.

## 2. Content Studio

**What it does:** takes one real idea and reuses it across formats — article, FAQ entry, social post, short-form script — instead of generating volume for its own sake.

**Proof of concept — three discussion-starter / social drafts, reusing existing Recovery Library content (not posted anywhere; Aaron's to use or discard):**

1. *(Reddit/Facebook text-post style, ties to the sleep resource)* — "If you're on day 2 or 3 and haven't slept more than an hour at a time, that's not a sign you're doing it wrong — it's one of the most common things people describe here. A few small things that actually help: keep the room cool and dark, get up at the same time even after a rough night, and if you're awake at 3am, low light and no screens beats doom-scrolling. Full page: [Sleep — Recovery Together]."
2. *(Short-form video script beat, ties to withdrawal timeline)* — "Day 1: restless, can't sit still. Day 1-3: the hardest stretch, most people say. Day 4-7: physical symptoms start easing, but the mental fog can hang around. Week 2+: still uneven, but the corner's usually turned. If you're in the middle of this right now — you're not doing it wrong, and you don't have to do it without anyone. [link]"
3. *(Discussion-starter for the app's own rooms, not external)* — "Check-in prompt for any room: what's one small thing that helped today — even something as small as eating half a banana or getting outside for five minutes? Say it here. Someone else on day 1 needs to hear it."

**When to re-invoke:** ask for a batch before a specific Reddit/Facebook post (per `launch-plan.md` Phase A) or when the Recovery Library gets a new page worth adapting.

## 3. Outreach Assistant

**What it does:** researches real, named targets and drafts personalized outreach — never sends anything, ever, without Aaron reading and approving it first.

**Target categories for Phase C (1,000 users), not actioned yet:** recovery coaches with an online presence in the kratom/7-OH space specifically (not addiction-recovery generally), therapists who publicly discuss substance use recovery, kratom-focused harm-reduction nonprofits, podcasters who've covered the "gas station heroin"/Feel Free/7-OH news wave, journalists who've already written about the Aug 2026 DEA order (several are cited by name-of-outlet in `research-C`'s sources).

**Why no specific names yet:** fabricating specific "Dr. So-and-so at Such-and-such Clinic" targets would be inventing people, not researching them — real outreach research (verifying an actual person exists, is currently active, and is a genuine fit) is exactly the kind of task worth doing for real, closer to Phase C, not simulated now for a list nobody's going to use for months.

**Template style (generic, to show the tone — not sent to anyone):**
> Subject: A free peer-support resource for people navigating 7-OH withdrawal
>
> Hi [name] — I built Recovery Together, a free, anonymous peer-support community for people preparing to stop, currently stopping, or recovering from 7-OH and concentrated kratom products. I've followed [their specific work] and thought it might be a useful resource to have on hand for people you work with, alongside — not instead of — the professional support you provide. No cost, no catch, happy to answer any questions about how it works. [link]

**When to re-invoke:** once Phase B is genuinely underway and there's real usage data worth pointing to in outreach (an empty, brand-new app is a weak pitch to a therapist or journalist).

## 4. Founder Briefing

**What it does:** a concise daily snapshot — new/returning users, traffic, replies, popular discussions, errors, AI costs, top next action.

**Current state:** this already exists in spirit — `FOUNDER_ACTION_ITEMS.md`'s "Right now" section is exactly this, updated every session per `CLAUDE.md`'s workflow. A fully automated, scheduled version needs real data plumbing (Vercel Analytics traffic isn't queryable via a simple API on the free tier; Anthropic billing API for AI costs; Supabase for user/post counts) — this is the same read-only data-source project already tracked as a "Later" item in `FOUNDER_ACTION_ITEMS.md` under the Founder OS Dashboard.

**Why not built now:** with no real users yet, most of a daily briefing's fields (new users, returning users, popular discussions) would report zero or near-zero — genuinely not useful until there's actual traffic to summarize. Worth building once Phase A produces real numbers.

**When to re-invoke:** once the app has real daily activity, ask Claude to build the automated version against the Founder OS Dashboard data-source plan already in `PROJECT_BRIEF.md`.
