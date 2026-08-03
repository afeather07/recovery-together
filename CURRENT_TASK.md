# Current Task

## Objective
Get real credentials wired in, deploy to Vercel, and launch by August 5.

## Current state
Working Next.js app built and verified (`npm run build` succeeds, 0 errors):
- Landing page ported from the static prototype, with a real onboarding dialog.
- `/api/onboarding` calls the Claude API to turn a free-text story into a draft profile (nickname, stage, support need). User confirms before anything saves.
- Anonymous Supabase auth on profile creation. Public profile data and private identity data are in separate tables with separate RLS policies (see `supabase/schema.sql`).
- Six stage-based rooms, posts, replies, live updates via Supabase Realtime.
- Report button on posts/replies, writing to a `reports` table.
- `/admin` — password-gated (via `ADMIN_KEY` env var), read-only moderation view listing open reports with content.
- `/safety` — static crisis/safety resources page (988, Crisis Text Line, SAMHSA, Poison Control), not AI-generated.
- Old static prototype preserved at `legacy-static-prototype/` (not deleted).

Nothing is deployed yet. Nothing has real credentials yet — everything above was verified locally with placeholder env values.

## Blocking on Aaron (3 things, ~15 minutes total)
1. GitHub token so this can be pushed (fine-grained PAT, repo-scoped, Contents read/write).
2. Supabase project (free tier): create it, then send the Project URL, anon public key, and service_role key from Project Settings > API.
3. Anthropic API key from console.anthropic.com for the app's server-side calls.

## Next task once unblocked
1. Push this code to GitHub.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Set env vars in Vercel (see `.env.example`), connect the repo, deploy.
4. Full click-through test on a phone-sized viewport.
5. Launch.

## Definition of done
- App is live on a real Vercel URL.
- A stranger can land, onboard, enter a room, post, reply, and report without help.
- `/safety` and `/admin` both work.
