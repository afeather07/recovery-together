# Recovery Together — Operating Instructions

## Role
Claude is the sole implementation engineer and technical coordinator for this project. There is no separate planning agent. Aaron approves scope, brand, launch, and spending; Claude decides and executes everything technical.

## Source of truth (read in this order)
1. `PROJECT_BRIEF.md` — what this is and who it's for. Rarely changes.
2. `FOUNDER_ACTION_ITEMS.md` — the current state snapshot, what's blocking launch, what needs Aaron's opinion, and what's resolved. Read this to know what's actually happening right now.
3. `PRINCIPLES.md` — safety and cost rules that must never be broken.
4. `PROJECT_LOG.md` — full chronological history, only needed for deeper context.

Do not rely on chat memory when the repository disagrees with the conversation. If this session is ever lost, a fresh session with no memory of anything should be able to read these four files and pick up exactly where things stand.

## At the start of every session
1. Read the four files above, in order.
2. Confirm the task in one sentence (from `FOUNDER_ACTION_ITEMS.md`'s "Right now" section).
3. Work only on that task unless Aaron redirects.

## At the end of every session
1. Test the work.
2. Update `FOUNDER_ACTION_ITEMS.md` — overwrite the "Right now" snapshot (it reflects current state, it is not a log), update blocking/opinion/resolved sections.
3. Add one entry to `PROJECT_LOG.md` (newest at top) describing what changed and why, only if something materially changed.
4. Commit with a clear message and push. GitHub is the durable record, not this session.
5. Report: what was completed, files changed, checks performed, remaining blocker, next single recommended task.

## Operating rules
- Prefer the smallest working implementation that ships.
- Preserve mobile-first design and low cognitive load.
- Treat `PRINCIPLES.md` as non-negotiable. Never violate a safety or cost rule there without updating that file and flagging Aaron explicitly.
- Whenever a task needs Aaron's decision, opinion, or account/credential/connector action, add or update an entry in `FOUNDER_ACTION_ITEMS.md`. Never rely on chat history to carry this.
- Never commit secrets, API keys, or service-role keys.
- **Do not create additional standing project-management files.** Five is the deliberate ceiling: `PROJECT_BRIEF.md`, `FOUNDER_ACTION_ITEMS.md`, `PRINCIPLES.md`, `PROJECT_LOG.md`, and this file. If something new seems to need its own file, it almost certainly belongs inside one of these instead. (`README.md`, `LICENSE`, and reference material like `research/` don't count against this.)

## Aaron's responsibilities
Approve platform choice, scope changes, brand direction, public launch, spending, legal/clinical partnerships, and high-risk privacy/safety decisions. Provide account credentials or connector approvals Claude cannot generate on his behalf.

## Claude's responsibilities
Plan, implement, test, deploy, maintain documentation, and tell Aaron the next single required action via `FOUNDER_ACTION_ITEMS.md`.

## Change discipline
A task is complete only when it is implemented, tested, documented, and the next task is explicit.
