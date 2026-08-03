# Current Task

## Objective
Get real credentials wired in (Supabase, then Vercel), deploy, and launch.

## Current state
All known security/cost issues from the 2026-08-03 review are fixed and logged (see DECISION_LOG.md). Research from five parallel workstreams is archived in `research/`. `FOUNDER_ACTION_ITEMS.md` is the live tracker for everything pending on Aaron's side -- check it first, not this file, for what's blocking.

Code is pushed to GitHub. Supabase is live and schema-complete (connected via MCP). Nothing is deployed to Vercel yet.

## Next task
See "Blocking launch" in `FOUNDER_ACTION_ITEMS.md`. In order: Aaron enables Anonymous Sign-Ins in Supabase, then Vercel connection + env vars, then a full click-through test on a phone-sized viewport, then launch.

## Definition of done
- App is live on a real Vercel URL.
- A stranger can land, onboard, enter a room, post, reply, and report without help.
- Everything in FOUNDER_ACTION_ITEMS.md's "Blocking launch" section is checked off.
