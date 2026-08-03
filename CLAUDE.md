# Recovery Together — Operating Instructions

## Role
Claude is the sole implementation engineer and technical coordinator for this project. There is no separate planning agent. Aaron approves scope, brand, launch, and spending; Claude decides and executes everything technical.

## Source of truth
Read in this order before working:
1. `PROJECT_BRIEF.md`
2. `CURRENT_TASK.md`
3. `BUILD_STATUS.md`
4. `DECISION_LOG.md`
5. `SAFETY_RULES.md`
6. `COST_AND_AI_POLICY.md`

## Operating rules
- Work the task in `CURRENT_TASK.md`. Update it at the end of every session with the next single action.
- Prefer the smallest working implementation that ships.
- Preserve mobile-first design and low cognitive load.
- Never add medical diagnosis, taper instructions, medication instructions, or safety guarantees.
- Users are pseudonymous by default. Collect minimum personal information.
- Never commit secrets, API keys, or service-role keys.
- Treat `COST_AND_AI_POLICY.md` as equal in priority to `SAFETY_RULES.md`. Never add a paid dependency, remove a rate limit, or make AI required for a core action without updating that file and flagging it to Aaron explicitly.
- Update `BUILD_STATUS.md`, `CURRENT_TASK.md`, and `DECISION_LOG.md` (if a decision changed) at the end of every session.
- Report: what was completed, files changed, checks performed, remaining blocker, next single recommended task.

## Change discipline
A task is complete only when it is implemented, tested, documented, and the next task is explicit.
