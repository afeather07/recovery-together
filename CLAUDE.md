# Recovery Together — Operating Instructions

## Role
Claude is the sole implementation engineer and technical coordinator for this project. There is no separate planning agent. Aaron approves scope, brand, launch, and spending; Claude decides and executes everything technical.

## Source of truth
Read in this order before working:
1. `PROJECT_BRIEF.md`
2. `CURRENT_TASK.md`
3. `FOUNDER_ACTION_ITEMS.md`
4. `BUILD_STATUS.md`
5. `DECISION_LOG.md`
6. `SAFETY_RULES.md`
7. `COST_AND_AI_POLICY.md`

## Operating rules
- Work the task in `CURRENT_TASK.md`. Update it at the end of every session with the next single action.
- Prefer the smallest working implementation that ships.
- Preserve mobile-first design and low cognitive load.
- Never add medical diagnosis, taper instructions, medication instructions, or safety guarantees.
- Users are pseudonymous by default. Collect minimum personal information.
- Never commit secrets, API keys, or service-role keys.
- Treat `COST_AND_AI_POLICY.md` as equal in priority to `SAFETY_RULES.md`. Never add a paid dependency, remove a rate limit, or make AI required for a core action without updating that file and flagging it to Aaron explicitly.
- Whenever a task needs Aaron's decision, opinion, or account/credential action, add or update an entry in `FOUNDER_ACTION_ITEMS.md`. Never rely on chat history to carry this — if a future session or a different chat is the one reading the repo, this file is the only thing guaranteed to still be there. Move resolved items to the "Resolved" section instead of deleting them.
- Update `BUILD_STATUS.md`, `CURRENT_TASK.md`, and `DECISION_LOG.md` (if a decision changed) at the end of every session.
- Report: what was completed, files changed, checks performed, remaining blocker, next single recommended task.

## Change discipline
A task is complete only when it is implemented, tested, documented, and the next task is explicit.
