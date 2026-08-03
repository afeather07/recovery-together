# Recovery Together — AI Onboarding Cost Review

Reviewing the single AI call in the product (`POST /api/onboarding`, Claude Sonnet 5, feature-flagged, rate-limited, fallback-safe). Rate limiting and the Hard Limit backstop are already handled — not re-litigated here. Below is a per-question verdict with concrete numbers, then one ranked action list.

---

## 1. Is Sonnet the right tier, or would Haiku do?

**Verdict: switch to Haiku. The task doesn't need Sonnet.**

This call does structured extraction of 3 short fields (nickname, stage, support_need) from a short free-text story, into a fixed JSON schema, with an explicit "no diagnosis" constraint. That's classification/extraction, not multi-step reasoning, not long-context synthesis, not creative writing quality that a user will scrutinize line-by-line. This is squarely in Haiku's competence band — Anthropic positions Haiku specifically for exactly this class of "read text, fill a schema" task.

**Cost math:**
- Sonnet promo pricing: $2 / $10 per M input/output tokens. At ~400 input + up to 300 output tokens, worst case ≈ 400×$2/1e6 + 300×$10/1e6 = $0.0008 + $0.003 = **$0.0038/call** — matches the team's own $0.003–0.004 estimate (which assumes near-max output usage; realistic output for 3 short fields is closer to 60–100 tokens, so realistic Sonnet cost is closer to **$0.0014–0.0018/call**).
- Haiku pricing is roughly 4–5x cheaper on both axes than Sonnet (confirm the exact current number at console.anthropic.com/pricing before switching — it moves). Using an illustrative $1/$5 per M: same math gives worst case ≈ $0.0004 + $0.0015 = **$0.0019/call**, realistic case ≈ **$0.0007–0.0009/call**.
- At the *hard cap* of 200 calls/day × 365 days, that's Sonnet ≈ $277–1,387/yr worst-case band vs Haiku ≈ $139–657/yr. In practice a bootstrapped app's early volume will be nowhere near the 200/day ceiling, so the real-world annual difference is likely single-digit-to-low-double-digit dollars, not hundreds. The value of switching isn't "founder saves real money" — it's that Sonnet is architecturally the wrong tool for a task this small, and Haiku buys roughly 2x more headroom under the same Anthropic console Hard Limit for the same dollar.

**Quality risk:** low. Keep an eye on the "stage" field only if you're relying on subtle nuance to pick between similar-sounding recovery-stage labels — spot check ~20 real outputs after switching before trusting it fully. This is a 10-minute regression check, not a redesign.

---

## 2. Is max_tokens: 300 too generous?

**Verdict: yes, tighten to ~150. But understand what this actually buys you.**

Important nuance: `max_tokens` is a *cap*, not a charge — you're billed for tokens actually generated, not the ceiling. So for the normal-path call (model stops after emitting `{nickname, stage, support_need}`, likely 60–100 tokens), cutting the cap from 300 to 150 changes **nothing** about typical cost.

What it does change: it bounds the *worst case* — a malformed generation, a model that starts rambling before the JSON, or a decoding pathology that doesn't hit a natural stop. Worst-case output cost exposure drops from 300×$10/M = $0.003/call to 150×$10/M = $0.0015/call (Sonnet pricing; halve again if paired with the Haiku switch). 150 tokens is still ~2x the realistic need for 3 short fields, so there's no truncation risk.

Do this as a free, zero-risk change regardless of the model decision above.

---

## 3. Shrinking the system prompt without losing the safety instruction

**Verdict: worth a quick pass, but this is not where the money is — do it opportunistically, not urgently.**

Concrete moves, in priority order:
- If the current system prompt has any few-shot examples embedded, cut to zero or one minimal example — examples are usually the single biggest token line-item in a "short" system prompt, easily 50–150 tokens by themselves.
- Replace descriptive sentences with a compact schema line, e.g. instead of a paragraph explaining the stage field, use an inline enum: `stage: one of "just starting","early recovery","maintaining","supporting others"`.
- Collapse the safety instruction to one clause instead of a paragraph: `Output JSON only: {nickname, stage, support_need}. No diagnosis, no medical/clinical advice, no crisis-intervention language — plain supportive tone only.` That's ~30 tokens and preserves the constraint fully.

**Why this is low priority:** input tokens are priced at 1/5th of output tokens (or better under promo pricing), and the system prompt is already described as short (part of the 200–400 total). Shaving 100 tokens off the system prompt saves roughly 100×$2/1e6 = $0.0002/call on Sonnet — at 200 calls/day that's **$0.04/day, ~$14.60/yr** even at the hard cap. Do it because it's free and easy, not because it moves the needle.

---

## 4. Does prompt caching make sense here?

**Verdict: no. Skip it.**

Prompt caching pays off when (a) a large static prefix is (b) reused frequently within the cache TTL window (default 5 min, extendable to 1 hr), so the discounted cache-read rate is hit often enough to offset the cache-write premium and the implementation/monitoring overhead.

Here: the static prefix (system prompt) is *short* (~100–200 tokens, per the numbers given) and call volume is capped at 200/day globally — even at that ceiling, evenly spread, that's one call roughly every 7 minutes, and real early-stage volume will be far lower and burstier/sparser than that. Two problems compound:
- The absolute token count being cached is small, so even a 90% discount on cache reads saves fractions of a cent per call.
- Low, irregular call volume means many calls will miss the cache window entirely, further eroding the benefit.

Napkin math: even in the unrealistically generous case of 100% cache-hit rate on a 150-token system prompt at 200 calls/day for a year, savings are on the order of **$15–20/yr**, against real implementation cost (cache_control breakpoints, hit-rate monitoring, another thing that can silently break). Not worth it at this shape and volume. Revisit only if call volume grows by 100x+ *and* the system prompt grows substantially (e.g., you start injecting a large static taxonomy or long few-shot block) — neither is true today.

---

## 5. Should V1 skip AI entirely and ship keyword-matching only?

**Verdict: honest answer — yes, ship with the flag OFF at launch. Don't delete the code, just don't turn it on yet.**

Case for turning it on now: it's already built, it's cheap, it's fully bounded by rate limits + Hard Limit, and it produces a nicer `support_need` line than canned keyword phrases.

Case against turning it on now, and this is the one that should win for a solo bootstrapped founder:
- The stated principle is "AI is an enhancement, never a dependency" — and the enhancement here is cosmetic: one microcopy line (`support_need`) is upgraded from a canned keyword-matched phrase to an LLM-drafted phrase. Nickname and stage are already just echoed from user input in both paths — AI adds nothing to those two fields.
- The scarce resource for a solo founder isn't the ~$0.001–0.004/call — it's *time and attention*. The AI path is not just an API call; it's two Postgres counter tables (per-IP, global), a config flag, an env-var override, error-fallback logic, and now an ongoing obligation to watch the Anthropic console dashboard. That's real surface area to maintain and debug (e.g., what happens when Postgres itself is slow and the counter check adds latency to onboarding — a fully synchronous DB round-trip gate in front of every onboarding submission, AI or not).
- You have zero usage data yet on whether the keyword-matching output is actually a problem users notice. Turning on AI pre-emptively means you're spending the (small but nonzero) cost and maintenance budget on a hypothesis, not a validated need.

**Recommendation:** Leave `app_config.ai_onboarding_enabled = false` for the V1 launch. Revisit after you have a real signal — e.g., users editing/rejecting the auto-generated `support_need` line at a high rate, or direct qualitative feedback that onboarding text feels robotic/generic. At that point, turning the flag on is a one-row DB update — the entire value of having built the infra already is that it's a switch-flip decision later, not a rebuild. Building it wasn't wasted work; using it immediately is the part that isn't justified yet.

---

## 6. Other concrete, non-generic recommendations for this exact call

1. **Unbounded input length is the one real cost/abuse gap in this architecture.** The per-IP (5/day) and global (200/day) counters bound *call count*, not *call size*. Nothing described truncates the `story` field before it's dropped into the prompt. A user (or an abuser scripting requests) pasting a 10,000-word story turns the "200–400 input tokens" estimate into potentially 10,000+ tokens on a single call — still gated by the 5/day and 200/day counters, but each of those calls now costs 10–25x the estimate. Fix: hard-truncate `story` to e.g. 800–1,200 characters (~150–250 tokens) server-side before constructing the prompt, independent of and in addition to the existing rate limits. This is a 2-line change and it's the only place in this architecture where a single request's cost isn't actually bounded.
2. **Log actual token usage, not just call counts.** The Anthropic API response includes `usage.input_tokens` / `usage.output_tokens`. Write these into the same Postgres table already tracking daily counters. Right now the founder has an *estimate* ($0.003–0.004/call) and a console-level Hard Limit as the only real feedback loop. Logging real per-call usage costs nothing to add and turns "I think it's cheap" into "here's the actual $/day," catching a runaway story-length or prompt-drift problem days before a monthly bill would.
3. **Add a same-day circuit breaker on API errors**, distinct from the existing per-call fallback. If N consecutive calls error out (e.g., 3 in a row — provider incident, bad key rotation, network issue), flip an in-memory/DB flag to skip the AI attempt entirely for the rest of the day rather than retrying the Anthropic call (and eating the latency of a failing request) on every single onboarding submission. Currently every request pays the cost of attempting and failing before falling back; this avoids that during an outage.
4. **Prefill the assistant turn with `{`** (or use tool-use / structured output if the SDK path supports it) so the model can't preface the JSON with conversational filler ("Here's the extracted profile:"). This shaves a handful of output tokens on every call and removes a class of JSON-parse failures that would otherwise trigger the keyword fallback unnecessarily — small cost win, real reliability win, specific to this exact prompt shape.

---

## Ranked recommendation — what to do in the next hour

1. **Leave the flag off.** Ship V1 on keyword-matching only. Nothing to build, nothing to break, zero AI cost. Revisit once real users show the canned `support_need` phrasing is actually a problem.
2. **Before ever flipping it on, add the input-length truncation** (~800–1,200 chars on `story`). This is the only genuinely unbounded cost path in the current design and it's a 5-minute fix.
3. **When you do enable it: switch model to Haiku and drop max_tokens to ~150** in the same commit. Two-line diff, cuts worst-case per-call cost roughly in half-to-two-thirds combined, no meaningful quality loss for a 3-field extraction task — spot-check ~20 outputs after switching.
4. **Don't implement prompt caching.** Volume and prompt size are both too small for it to matter (~$15–20/yr ceiling benefit against real implementation/monitoring overhead).
5. **Add usage logging** (`response.usage` into the existing Postgres counters table) so the Anthropic console Hard Limit — already planned — is backed by real per-call data instead of estimates, before you rely on it as the "impossible to get a surprise bill" guarantee.
