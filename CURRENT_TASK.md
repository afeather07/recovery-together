# Current Task

## Objective
Select and initialize the production MVP platform without adding features.

## Current state
- Public static prototype is live through GitHub Pages.
- GitHub repository exists.
- The static site demonstrates the visual direction and onboarding concept.
- The prototype does not have accounts, a database, real rooms, posts, replies, moderation, or AI.
- Claude Cowork has received the product brief.
- Production platform has not been finalized or initialized.

## Current task owner
Aaron + Claude Cowork

## Required action
Claude must review the repository and the available current build options, then produce a short implementation recommendation comparing only:
1. Lovable + Supabase
2. Replit Agent
3. Next.js + Supabase + Vercel using Claude Code/Cowork

The recommendation must prioritize:
- a usable MVP in 2–4 days,
- strong mobile responsiveness,
- minimal founder configuration,
- code portability,
- safe authentication/database handling,
- real-time community capability,
- ability for Claude to continue implementation,
- lowest probability of a dead-end rebuild.

## Required output
Create `PLATFORM_DECISION.md` containing:
- selected stack,
- concise rationale,
- exact MVP components,
- migration/use of the current prototype,
- first implementation task,
- estimated launch sequence,
- explicit tools/accounts Aaron must create,
- major security and moderation risks.

Do not implement a new stack until Aaron approves the recommendation.

## Definition of done
- `PLATFORM_DECISION.md` exists in the repository.
- `BUILD_STATUS.md` is updated.
- The next single founder action is stated.
