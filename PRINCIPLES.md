# Principles

Two sets of rules that must never be broken, equal in priority to each other. Safety protects users. Cost protects Aaron. Neither yields to the other or to feature pressure.

---

## Part 1 — Safety, Trust, and Moderation

### Product boundary
Just Another Friend provides peer connection only. It does not provide diagnosis, individualized medical advice, medication dosing, taper schedules, withdrawal predictions, instructions for combining substances, or guarantees that home withdrawal is safe.

### Prohibited user content
Buying, selling, trading, or sourcing controlled or dependence-producing substances; instructions for dangerous substance combinations; impersonating clinicians; individualized medication or taper prescriptions; harassment, exploitation, threats, or encouragement of self-harm; exposing another person's identity or exact location; arranging unsafe private encounters through the platform.

### High-risk content handling
The interface must provide clear escalation for: inability to stay safe, suicidal intent or self-harm risk, severe confusion, seizure, chest pain, difficulty breathing, inability to keep fluids down with signs of severe dehydration, or suspected overdose. Emergency language directs users to real emergency services and crisis resources, without implying the platform monitors users continuously.

### Location and meetup safety
Exact address sharing is not part of the MVP. Nearby matching and in-person meetups are deferred until identity, consent, blocking, reporting, age restrictions, and safety controls are designed.

### Privacy
Store the minimum necessary data. Never commit credentials or user data to GitHub. Use row-level access controls in the production database. Separate public profile data from private account data (see `profiles` vs. `profile_private` in `supabase/schema.sql`). Provide blocking and reporting before enabling private communication. Avoid collecting detailed medical histories.

### AI behavior
AI must clearly identify itself, only summarize/organize what the user already said, never diagnose or direct treatment, and refer urgent situations to real emergency/professional help. Never present generated text as a clinician's judgment. Crisis/safety copy on the site is static, reviewed text — never AI-generated at request time.

---

## Part 2 — Cost and AI Policy

Aaron is an unfunded solo founder. The product must be impossible to accidentally bankrupt him.

1. **Bootstrapped first.** Minimize recurring cost in every decision. Prefer free tiers. Delay paid services until traffic or revenue actually requires them.
2. **AI is an enhancement, not the product.** The community — rooms, posts, replies, connection — is the product. AI is used only where it clearly adds value, and never in a way the product depends on.
3. **It must be impossible to receive a surprise AI bill,** via layered defenses:
   - **Provider-level hard cap (the real backstop):** a monthly Hard Limit + spend alert set in console.anthropic.com → Billing.
   - **Instant kill switch:** `app_config.ai_onboarding_enabled` in Supabase, defaults `false`. Flip it in the Supabase Table Editor — no redeploy needed.
   - **Hard env override:** `AI_ONBOARDING_ENABLED=false` in Vercel forces AI off regardless of the database flag.
   - **Rate limits:** per-IP daily cap (`AI_PER_IP_DAILY_LIMIT`, default 5) and a global daily cap (`AI_DAILY_GLOBAL_LIMIT`, default 200).
   - **Graceful fallback, always:** every path in `/api/onboarding` — flag off, no key, rate-limited, or an API error — returns a real profile via free keyword matching. The endpoint never hard-fails.
4. **The community works with AI completely disabled.** Account creation, nickname, manual stage selection, rooms, posting, replying, reporting all function with `ANTHROPIC_API_KEY` unset.
5. **V1 default: AI off.** Aaron turns it on deliberately, after setting the Anthropic Hard Limit.

### Growth phases
Phase 1 (launch): manual onboarding, AI available but off by default. Phase 2: AI onboarding on by default once usage shows the cost is trivial and worth it. Phase 3: AI-assisted moderation (flagging, not deciding). Phase 4: further AI features, funded by whatever revenue exists by then. Each phase pays for the next; none is pulled forward on credit.

### Current stack cost profile (checked live, August 2026)
| Service | Free tier | What triggers cost | Upgrade trigger |
|---|---|---|---|
| Vercel (Hobby) | 100GB transfer/mo, 1M invocations, 4 CPU-hrs — personal/non-commercial use | Hitting a limit **pauses the project, never bills you** | Real sustained traffic, or Pro (~$20/mo) if commercial terms are ever needed |
| Supabase (Free) | 500MB DB, 5GB bandwidth, 50k monthly users, 2 projects | Nothing auto-bills; idle 7 days auto-pauses (reversible) | Approaching those caps — Pro ~$25/mo |
| Anthropic API | No free tier | Only when `ai_onboarding_enabled` is on, ~$0.003–0.004/call at current Sonnet 5 pricing | Capped by rate limits + your console Hard Limit |
| GitHub | Free for this repo | N/A | N/A |

Worst case with AI on and defaults untouched: ~$24/month, and only if deliberately enabled. With it off (launch default): $0 on the AI line.

### Founder action required before enabling AI
Set a monthly Hard Limit and a spend alert in console.anthropic.com → Billing, before ever setting `ai_onboarding_enabled` to `true`.
