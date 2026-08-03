# Project Workflow

## Authoritative location
The GitHub repository is the durable project record.

## Required files
- `CLAUDE.md` — operating rules.
- `PROJECT_BRIEF.md` — fixed product mission and MVP scope.
- `CURRENT_TASK.md` — the active work order.
- `BUILD_STATUS.md` — verified state of the product.
- `DECISION_LOG.md` — material decisions.
- `SAFETY_RULES.md` — mandatory product boundaries.
- `PLATFORM_DECISION.md` — approved platform choice.

## At the start of every session
1. Read `CLAUDE.md`, then `CURRENT_TASK.md`.
2. Confirm the task in one sentence.
3. Work only on that task unless Aaron redirects.

## At the end of every session
1. Test the work.
2. Update `BUILD_STATUS.md` and `CURRENT_TASK.md`.
3. Add to `DECISION_LOG.md` only if a material decision changed.
4. Commit with a clear message.
5. Report completed work and blockers.

## Aaron's responsibilities
Approve: platform choice, scope changes, brand direction, public launch, spending, legal/clinical partnerships, high-risk privacy/safety decisions. Provide account credentials (Supabase, Vercel, Anthropic API key, GitHub token) Claude cannot generate on his behalf.

## Claude's responsibilities
Plan, implement, test, deploy, maintain documentation, and tell Aaron the next single required action. No second planning agent is used.
