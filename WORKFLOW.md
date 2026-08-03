# Project Workflow

## Authoritative location
The GitHub repository is the durable project record.

## Required files
- `CLAUDE.md` — implementation-agent rules.
- `PROJECT_BRIEF.md` — fixed product mission and MVP scope.
- `CURRENT_TASK.md` — the only authorized active work order.
- `BUILD_STATUS.md` — verified state of the product.
- `DECISION_LOG.md` — material decisions.
- `SAFETY_RULES.md` — mandatory product boundaries.
- `PLATFORM_DECISION.md` — created during the current task.

## At the start of every agent session
1. Pull/read the latest repository state.
2. Read `CLAUDE.md`.
3. Read `CURRENT_TASK.md`.
4. Confirm the task in one sentence.
5. Work only on that task.

## At the end of every agent session
1. Test the work.
2. Update `BUILD_STATUS.md`.
3. Update `CURRENT_TASK.md` with the next single action.
4. Add to `DECISION_LOG.md` only when a material decision changed.
5. Commit changes with a clear message.
6. Report completed work and blockers.

## Aaron's responsibilities
Aaron approves:
- platform choice,
- scope changes,
- brand direction,
- public launch,
- spending,
- legal/clinical partnerships,
- high-risk privacy or safety decisions.

Aaron should not manually maintain technical documentation. The implementation agent maintains it.

## ChatGPT responsibilities
ChatGPT:
- defines and reviews work orders,
- controls scope,
- reviews safety, product strategy, UX, and launch readiness,
- gives Aaron one required action at a time.

## Claude responsibilities
Claude:
- implements approved work,
- maintains repository documentation,
- runs tests and checks,
- reports concrete results,
- does not independently expand product scope.

## Drift prevention
When a new idea appears:
- Do not interrupt the current task.
- Record it only if necessary.
- Return immediately to `CURRENT_TASK.md`.
