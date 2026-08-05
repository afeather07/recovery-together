# Recovery Together — Launch Plan (Phase A / B / C)

Written 2026-08-05, synthesizing `research-C-launch-strategy.md` (2026-08-03) into the phased structure Aaron asked for. Read `research-C` for full detail, sourcing, and the exact Reddit/Facebook/TikTok tactics — this file is the roadmap; that file is the playbook.

## Time-sensitive context — read this first

`research-C-launch-strategy.md` was built around a specific, dated event: the DEA's temporary scheduling order for 7-OH cannot take effect before **2026-08-05** — today. That research treats the days immediately around this date as the single highest-leverage, non-repeatable moment this launch will get, because search interest, Reddit/TikTok posting volume, and "where do I go now" behavior all spike together when people's usual product becomes federally scheduled. If that order has in fact taken effect around today, Phase A below should start now, not after further polish — the news window decays daily. This is a timing call for Aaron, not something to act on autonomously (see "What only Aaron can do," below).

## Phase A — First 20–50 users: learn, don't grow

**Goal:** learn from real users, not rapid growth. Every channel below is chosen for signal, not volume.

- **Reddit** (r/quittingkratom, r/OPMS, then r/kratom last) — comment/help for several days first, modmail the mods for permission, then a single honest text-post founder story with the link included plainly, not as clickbait. Full posture and per-subreddit notes in `research-C`.
- **Facebook groups** — four named, currently-active kratom-quitting groups identified in `research-C` with links; same pattern (join, read rules, DM admin, ask permission).
- **TikTok / YouTube Shorts / Reddit comments on existing viral content** — react with lived/founder experience to the DEA news, not a product pitch; comment on already-viral withdrawal videos for near-zero-effort reach.
- **Organic Google search** — Search Console + sitemap + GA4 (partially done: `sitemap.xml`/`robots.txt` shipped in V1.1; Vercel Analytics is live but Search Console/GA4 are not yet set up) plus 2-4 timely pages on the ban itself, where competition is lowest.

**What "learning" means concretely:** watch what people actually say when they land — do they find their room, post, come back. `FOUNDER_ACTION_ITEMS.md`'s "Right now" section is the place this gets reported back, session to session.

## Phase B — First 100 users: strengthen what's working

Once people begin returning (visible via Vercel Analytics + Supabase activity, not guesswork):

- Improve onboarding based on real drop-off points, not assumptions.
- Improve My Journey based on what returning users actually do with it.
- Expand the Recovery Library — more topics, informed by what people are actually asking in rooms and on Reddit/Facebook, not a generic content calendar.
- Keep publishing timely educational content tied to real, current search/discussion demand.

## Phase C — First 1,000 users: relationship-based outreach

Research and prepare **personalized, founder-approved** outreach to recovery coaches, therapists, treatment centers, recovery influencers, podcasters, and nonprofits. Explicitly not automated, not spam, nothing sent without Aaron reading and approving it first — see the Outreach Assistant playbook below for how this gets prepared without ever auto-sending anything.

## What only Aaron can do (not delegable to Claude)

- Any actual posting to Reddit, Facebook groups, TikTok, or elsewhere under the founder's identity — `research-C` is explicit that disclosure ("I'm the founder, here's who I am") is core to why this works, and Claude has no identity to disclose. Claude can draft every word; Aaron has to be the one who posts it.
- Reading each subreddit's live rules/wiki immediately before posting — Reddit blocks automated fetching of its rules pages from this environment, and mod rules change, so this must be a firsthand check right before posting, not a cached assumption.
- Deciding whether the Aug 5 window (above) is still live enough to prioritize immediately.
- Approving any Phase C outreach message before it's sent to a real person or organization.
