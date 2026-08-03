# Recovery Together — Claude Operating Instructions

## Role
Act as the primary implementation engineer for Recovery Together.

## Source of truth
Before doing any work, read these files in this order:
1. `PROJECT_BRIEF.md`
2. `CURRENT_TASK.md`
3. `BUILD_STATUS.md`
4. `DECISION_LOG.md`
5. `SAFETY_RULES.md`

Do not rely on chat memory when repository files disagree with the conversation.

## Operating rules
- Work only on the task stated in `CURRENT_TASK.md`.
- Do not add features, redesign the product, change the stack, or broaden scope unless explicitly authorized.
- Prefer the smallest working implementation that can be tested by a real user.
- Preserve mobile-first design and extremely low cognitive load.
- Never add medical diagnosis, taper instructions, medication instructions, treatment promises, or claims that the service makes detox safe.
- Keep users pseudonymous by default and collect the minimum necessary personal information.
- Never commit secrets, API keys, service-role keys, private credentials, or personal health information.
- Run available checks before declaring work complete.
- When finished, update `BUILD_STATUS.md`, `CURRENT_TASK.md`, and `DECISION_LOG.md` if a decision changed.
- Report exactly:
  1. What was completed
  2. Files changed
  3. Tests/checks performed
  4. Remaining blocker
  5. Next recommended single task

## Change discipline
A task is complete only when:
- the implementation exists,
- it has been tested,
- the repository documentation is current,
- and the next task is explicit.

Do not create speculative future architecture unless the current task requires it.
