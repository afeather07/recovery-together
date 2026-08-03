# Recovery Together — Security Review (Current Architecture)

Scope: recommendations only, no code changes made. Reviewed against the architecture as described (Supabase anon auth, RLS policies as listed, Next.js `/admin` route, secrets handling). Findings are ordered by real-world severity for a zero-budget, no-traffic-yet MVP — not by theoretical worst case.

---

## CRITICAL

### 1. `ai_rate_limit` RLS lets any client erase or forge its own rate-limit record
**Policy as described:** `for all using (true) with check (true)` — any anon/authenticated client can `SELECT`, `INSERT`, or `UPDATE` any row.

**Real attack:** The rate limit for the AI onboarding endpoint is enforced by reading/writing this table. Since the anon key can write to it directly (not just through the endpoint's server logic), anyone can simply issue `UPDATE ai_rate_limit SET count = 0 WHERE ip_hash = '<their own hash>'` via the Supabase JS client — no need to even hit the AI endpoint's own throttle logic. This isn't a hypothetical bypass technique, it's a direct SQL write the anon key is explicitly permitted to make. The rate limit provides zero actual protection today.

**Why this matters more than the other findings:** this is the one place where abuse translates directly into the founder's money (LLM API calls). It requires no scale, no bot farm, no timing — one person with the browser dev console can do it in under a minute.

**Severity given MVP stage:** Critical regardless of current traffic level — the cost is proportional to attacker effort, not to how many real users exist. A single bored or malicious visitor can do this today.

**Minimal fix:** Remove client access entirely. This table should have **no RLS policy for `anon`/`authenticated`** (RLS default-denies when no policy matches) — the rate-limit check-and-increment should happen server-side in the API route using the `service_role` key, which the client never touches. This is a one-line policy change (drop the `for all using(true)` policy), not a rebuild.

---

## HIGH

### 2. `/admin` key handling is fine *only* because the service_role key hasn't been set yet — this will become Critical the moment it is
**Current state:** query-string key (`?key=XXXX`), plain `===` comparison, no lockout, no attempt logging, service_role key not yet configured (route is currently inert/non-functional for real bypass).

**Real attack surface, once the service_role key is added:** the actual risk isn't brute force of a sufficiently long random key over HTTP (impractical either way, rate limiting or not) — it's **leakage of the key via the query string**: browser history, server/proxy access logs, `Referer` headers if the admin page ever links out, screenshots, or shoulder-surfing during a support call. Once leaked, there's no lockout and no logging, so there's no way to detect or contain reuse — and no rate limit on failed attempts one way or the other doesn't meaningfully change the odds against a random string, so don't over-invest there.

**Severity today:** effectively zero (service_role key is an unfilled placeholder, so a match still can't bypass RLS). **This must be fixed before the service_role key is filled in** — treat it as a blocking pre-launch item, not an urgent one right now.

**Minimal fix (all one-line-to-small changes):**
- Stop passing the key in the URL query string; read it from a request header or a short-lived cookie set once at login, so it stops being written to every log line that touches the URL.
- Swap `===` for `crypto.timingSafeEqual` (Node built-in) — trivial, no reason not to.
- Add a `console.log`/log-drain line recording timestamp + success/fail on every admin auth attempt, so the founder has *some* visibility. A full lockout system is overkill for one operator; a log line is enough to notice a leak after the fact.
- Note the blast radius once this key works: `service_role` bypasses **all** RLS, not just `reports` — whoever holds `ADMIN_KEY` can read `profile_private` (real names, photos, location) too, even though the current admin route code only queries reports/posts/replies. Worth remembering when deciding how the key is stored/shared later.

### 3. No rate limiting on posts/replies/reports + frictionless anonymous signup = flooding/harassment vector against a vulnerable user base
**Real attack:** signup is instant and free (no CAPTCHA, no email verification, no per-IP throttle mentioned at the app level). Combined with unrestricted `INSERT` on `posts`/`replies`/`reports`, one person can script an anonymous account and flood any room with unlimited posts in a tight loop — spam links, harassment, or deliberately triggering content aimed at people in active withdrawal. The same gap lets someone mass-file bogus `reports` against a specific user to bury real reports in the moderation queue or as a targeted harassment tactic.

**Why High and not Medium despite no current traffic:** likelihood is low today (no attacker has bothered), but impact is severe *for this specific app* — the audience is explicitly people in a fragile state during substance withdrawal, and untargeted moderation-free flooding could cause real harm, not just annoyance. Impact severity, not probability, is what drives this to High.

**Minimal fix:** don't reach for an external service. A simple Postgres trigger is enough:
```sql
-- reject inserts if author has posted more than N times in the last window
create or replace function check_post_rate() returns trigger as $$
begin
  if (select count(*) from posts where author_id = new.author_id and created_at > now() - interval '60 seconds') >= 5 then
    raise exception 'rate limit exceeded';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger posts_rate_limit before insert on posts
  for each row execute function check_post_rate();
```
Same pattern for `replies` and (looser limit) `reports`. This is a handful of lines of SQL, no new infra, and closes the actual gap — a single account flooding in a loop. It does nothing against someone willing to create many anonymous accounts, which is why finding #5 (bot-check on signup) matters as the complementary fix.

### 4. No `UPDATE`/`DELETE` policy on `posts`/`replies` — users cannot retract their own posts
**As described:** only Supabase-dashboard access can edit/delete a post or reply; there is no client-side path for a user to remove their own content.

**Why this belongs in a security/privacy review for this app specifically:** this isn't a generic CRUD nicety — it's a harm-reduction gap. Someone in acute withdrawal or emotional crisis may post something revealing (relapse details, identifying specifics, something they regret) and currently has **no way to take it back** short of emailing the founder and hoping they check the dashboard in time. For an anonymous peer-support app, "I can delete what I said" is close to a baseline trust expectation, and its absence is a real safety gap, not just a missing feature.

**Minimal fix:** add one RLS policy per table:
```sql
create policy "own delete" on posts for delete using (auth.uid() = author_id);
create policy "own delete" on replies for delete using (auth.uid() = author_id);
```
(Update is optional/lower priority — delete is the one users actually need in a crisis moment.) This is minutes of work and meaningfully raises user trust for the exact population this app serves.

---

## MEDIUM

### 5. No bot check anywhere in the signup flow
**Real attack:** `signInAnonymously()` with zero friction (no CAPTCHA, no email, no proof-of-work) means creating 1, 100, or 10,000 identities costs an attacker nothing. This is the root cause that upgrades every per-account mitigation above (rate-limit triggers, report throttling) from "solved" to "solved per account, trivially bypassed by making a new account." It also enables bulk scraping of `profiles` and all `posts`/`replies` at whatever pace an attacker likes, since read access only requires being "authenticated" and that bar is zero-effort.

**Severity given MVP stage:** Medium, not Critical — right now there's no real traffic to make the app an attractive spam/scrape target, and Supabase's own auth backend already applies some default per-project/per-IP rate limits on the signup endpoint (worth confirming in Supabase Dashboard → Authentication → Rate Limits — this is a free existing knob, not something to build). But this is worth closing before any real user growth, because it's the one gap that undermines every other fix.

**Minimal fix:** add Cloudflare Turnstile (free) or hCaptcha (free tier) in front of the sign-in call — Supabase Auth natively supports passing a captcha token on `signInAnonymously()`/`signUp()`. This is a few lines of client code plus a dashboard toggle, not an infrastructure project. Pair with checking/tightening the existing Supabase Auth rate-limit settings — no code required for that part.

### 6. `profiles.support_need`/`stage` readable by literally anyone who signs up, with no user-facing framing of that fact
**As described:** any authenticated (i.e., any) user can read every other user's `stage` and `support_need` — this is clearly intentional (needed for peer matching/room browsing), not an RLS bug. Flagging it here because the two things that make it different from a typical "public profile" tradeoff are: (a) `support_need`/`stage` are health-adjacent, sensitive-by-association fields, and (b) the barrier to becoming one of the "authenticated users" who can read it is zero (see #5). Practically, this means the data is closer to "public on the internet to anyone who spends 5 seconds signing up" than "visible to vetted peers."

**Severity:** Medium — not an RLS defect to fix, but a disclosure/consent issue. Users likely assume "peer support community" implies some barrier to entry that doesn't actually exist.

**Minimal fix:** not a schema change — a UI/copy fix. Say explicitly, at signup or profile-creation time, "anyone who joins can see your stage and support need" so users make an informed choice about what to put in `support_need` (free text, presumably). If `support_need` is free text, also consider a short character cap to discourage users from pasting identifying detail into it.

---

## LOW

### 7. `app_config` publicly readable by unauthenticated clients
Single boolean feature flag (`ai_onboarding_enabled`), no insert/update policy for any client role. No real exposure here — flagging only to confirm it was reviewed. No action needed.

### 8. `ADMIN_KEY` comparison uses `===` instead of a constant-time comparison
Theoretical timing side-channel; at this app's traffic level (one operator, no attacker infrastructure watching response-time jitter over the network) this is not a realistic attack path. Still, `crypto.timingSafeEqual` is a one-line swap — do it opportunistically when touching that route for finding #2, not as a standalone project.

---

## CONFIRMED NON-ISSUES (explicitly checked, worth stating outright)

### 9. `profile_private` cannot leak through `profiles`/`posts`/`replies` — confirmed
Walking the schema: `profile_private` (real_name, real_photo_url, location, reveal_identity) has RLS restricting `SELECT`/`INSERT`/`UPDATE` to `auth.uid() = id` only, with no other policy granting broader access. Nothing in `profiles`, `posts`, or `replies` joins or denormalizes any `profile_private` column, and no policy on those tables references `profile_private`. **There is no path today for another user's client, via the anon/authenticated role, to ever read another user's real name, photo, or location.** This is a genuinely well-designed isolation and should be called out as correct, not just "no finding."

Two forward-looking notes so it stays true:
- The `reveal_identity` flag implies a future "show my real identity to this peer" feature isn't built yet. When it is, resist the temptation to solve it by loosening `profile_private`'s RLS — implement it as a narrow `SECURITY DEFINER` function that checks `reveal_identity = true` and an explicit mutual-consent condition before returning fields, so the base table stays locked down.
- Once the `service_role` key is filled in for the admin route (finding #2), remember it bypasses RLS entirely — it can read `profile_private` too, even though the current `/admin` code doesn't query it. The blast radius of an `ADMIN_KEY` leak is "all data," not just "open reports."

### 10. Secrets management is in good shape as described
All credentials referenced via `process.env.X`, `.gitignore` excludes `.env*` except `.env.example`, nothing committed to git (verified). No action needed today.

One thing to get right *before* the service_role key is actually added (it currently isn't): in Next.js, any env var prefixed `NEXT_PUBLIC_` gets bundled into client-side JS. Make sure the service_role key's env var name has no such prefix and is only ever referenced from server-side code (API routes / server components), never imported into a client component. This is the single most common way a service_role key accidentally ends up in a browser bundle — worth a one-time check when it's wired in, not a process to build.

---

## Priority order if you can only do a few things this week

1. Lock down `ai_rate_limit` RLS (drop the `using(true)` policy) — 5 minutes, closes a live financial-abuse hole.
2. Add a `DELETE` policy for own posts/replies — 5 minutes, real trust/safety win for your users.
3. Fix the `/admin` route (header instead of query string, `timingSafeEqual`, log attempts) — do this *before* you ever fill in `ADMIN_KEY`/service_role key, not after.
4. Add the Postgres rate-limit trigger on `posts`/`replies`/`reports` — 15–20 minutes, closes the flooding/harassment gap.
5. Turnstile/hCaptcha on signup + check Supabase Auth rate-limit dashboard settings — when you have a spare hour, before any real growth.

Everything else (app_config exposure, `===` vs timing-safe compare, `support_need` disclosure copy) is real but low-urgency polish, not a gap that needs to close before you keep building.
