# Cost and AI Policy

This is a permanent engineering requirement, equal in priority to `SAFETY_RULES.md`. Aaron is an unfunded solo founder. The product must be impossible to accidentally bankrupt him.

## Principles
1. **Bootstrapped first.** Minimize recurring cost in every decision. Prefer free tiers. Delay paid services until traffic or revenue actually requires them.
2. **AI is an enhancement, not the product.** The community — rooms, posts, replies, connection — is the product. AI is used only where it clearly adds value over plain software, and never in a way the product depends on.
3. **It must be impossible to receive a surprise AI bill.** Layered defenses, not one control:
   - **Provider-level hard cap (the real backstop):** set a monthly Hard Limit and spend alerts in console.anthropic.com → Billing. This is enforced by Anthropic regardless of any bug in our code.
   - **Instant kill switch:** `app_config.ai_onboarding_enabled` in Supabase, defaults to `false`. Flip it in the Supabase Table Editor — no redeploy, no code change, takes effect on the next request.
   - **Hard env override:** `AI_ONBOARDING_ENABLED=false` in Vercel forces AI off even if the database flag is on. Use this if Supabase itself is ever compromised or misbehaving.
   - **Rate limits:** per-IP daily cap (`AI_PER_IP_DAILY_LIMIT`, default 5) and a global daily cap (`AI_DAILY_GLOBAL_LIMIT`, default 200), both configurable without a code change.
   - **Graceful fallback, always:** every path in `/api/onboarding` — flag off, no key, rate-limited, or an actual API error — returns a real, usable profile via free keyword matching. The endpoint never hard-fails.
4. **The community works with AI completely disabled.** Account creation, nickname, manual stage selection, joining rooms, posting, replying, and reporting all function with `ANTHROPIC_API_KEY` unset. Verified in the current build — the onboarding dialog degrades to the keyword path automatically.
5. **V1 default: AI off.** `app_config.ai_onboarding_enabled` ships as `false`. Aaron turns it on deliberately, after setting the Anthropic Hard Limit, when he wants the enhancement live. This matches the phase plan below.

## Growth phases
- **Phase 1 (launch):** manual onboarding, AI available but off by default, enabled deliberately once the Anthropic Hard Limit is set.
- **Phase 2:** AI onboarding on by default once real usage shows the cost is trivial and worth it.
- **Phase 3:** AI-assisted moderation (flagging, not deciding) — only after Phase 1–2 usage data justifies it.
- **Phase 4:** further AI features, funded by whatever revenue or grants exist by then. Each phase pays for the next; none is pulled forward on credit.

## Current stack cost profile (checked live, August 2026)
| Service | Free tier | What triggers cost | Upgrade trigger |
|---|---|---|---|
| Vercel (Hobby) | 100GB transfer/mo, 1M function invocations, 4 CPU-hrs — personal/non-commercial use | Hitting a limit **pauses the project, does not bill you** | Real sustained traffic, or if commercial use requires Pro (~$20/mo) |
| Supabase (Free) | 500MB DB, 5GB bandwidth, 50k monthly active users, 2 projects | Nothing bills automatically; project auto-pauses after 7 days with zero API requests (reversible, no cost) | Approaching 500MB DB or 5GB bandwidth — Pro is ~$25/mo |
| Anthropic API | No free tier — pay per token | Every onboarding call when AI is enabled, ~$0.003–0.004 each at current Sonnet 5 pricing ($2/$10 per million input/output tokens through Aug 31, 2026) | Only relevant once `ai_onboarding_enabled` is turned on; capped by rate limits + your console Hard Limit |
| GitHub | Free for this repo | N/A | N/A |

Worst-case AI exposure with defaults (200 calls/day global cap) is roughly $0.80/day, about $24/month, and only reachable if you've deliberately turned the feature on. With it off (the launch default), the AI line item is $0.

## Founder action required before enabling AI
Set a monthly Hard Limit and a spend alert (e.g., at 50%) in console.anthropic.com → Billing, before flipping `ai_onboarding_enabled` to `true`.
