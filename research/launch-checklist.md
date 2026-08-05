# Launch checklist

Written 2026-08-05. Everything Aaron needs to execute quickly is here; nothing below has been actioned without his approval (accounts, purchases, DNS changes) per his explicit instructions.

---

## ⚠ Domain: read this before buying anything

**`recoverytogether.com` is already live and in use by a different company** — an addiction-treatment lead-generation site (collects name/email/phone/insurance provider, connects visitors to paid treatment programs). Same name, same general space, unrelated organization. Checked directly by loading the site: title is literally "Recovery Together," same as this product.

Why this matters more than picking a nice domain:
- **Brand confusion.** Someone who hears about "Recovery Together" and searches for it, or types the .com from memory, can land on a commercial treatment-referral funnel instead — the opposite of what this product is trying to be (peer support, not a sales funnel, explicitly not selling anything).
- **SEO.** That site will likely already outrank a brand-new domain on the exact brand name query, at least initially.
- **Possible trademark exposure.** Claude isn't a lawyer and isn't asserting a conclusion here, but two organizations in adjacent recovery/addiction-support spaces using the identical name is the kind of thing worth a cheap trademark search (USPTO TESS is free) before getting attached to a specific `.com`. This is a legal-adjacent call worth Aaron's own judgment, not something to route around silently.

**Also checked:** `recoverytogether.org` doesn't resolve to an independent site (redirects to a blank "/lander" page — likely parked, possibly for sale, exact status needs a registrar lookup). `quit7oh.com` and `7ohrecovery.com` both resolve but show no real content (also likely parked). None of this is a registrar-confirmed availability check — Claude has no domain-purchase tool in this session; the checks above are DNS/HTTP-based signals only, not authoritative.

**What's very likely available** (no DNS response in this session's check): `recoverytogetherapp.com`, `recoverytogether.app`, `getrecoverytogether.com`.

**Recommendation:** `recoverytogetherapp.com`. Keeps full brand recognition (nothing about the site's copy, legal pages, or footer needs to change), `.com` carries more default trust for search and for someone typing it from memory than `.app` does for a still-skeptical or older audience, and "app" is an honest, low-friction way to sidestep the exact-match collision above rather than pretending it doesn't exist. Confirm actual availability and price at a registrar (Namecheap, Porkbun, Google Domains successor, or directly in Vercel's own domain purchase flow) before treating this as final — that step needs Aaron's payment method regardless.

**Not recommended without more thought:** `recoverytogether.org` — `.org` reads as nonprofit/institutional trust, which could help this specific audience, but Recovery Together isn't a registered nonprofit today, and adopting `.org` branding for an independent, for-profit-structured (even if currently unmonetized) project is worth being deliberate about, not defaulting into just because a domain might be free.

## Domain integration — ready to go once a domain is chosen

Code is now domain-agnostic: `lib/site.ts` is the single source of truth (`NEXT_PUBLIC_SITE_URL`, falls back to the current Vercel URL if unset). Once a domain is purchased:
1. Add the domain in the Vercel project dashboard (Settings → Domains) — Vercel provisions SSL automatically.
2. Point DNS at the registrar per Vercel's on-screen instructions (usually an A record or CNAME to Vercel).
3. Set `NEXT_PUBLIC_SITE_URL` in Vercel's environment variables to the new domain (e.g. `https://recoverytogetherapp.com`) and redeploy — this alone fixes metadata, the sitemap, robots.txt, and notification email links everywhere at once.
4. Decide whether `recovery-together.vercel.app` should redirect to the new domain (Vercel supports this per-domain) — recommended, so any link already shared (Reddit, Facebook, social) keeps working.
5. Re-submit the sitemap in Google Search Console under the new domain once set up (see below) — GSC treats domains as separate properties.

---

## Monitoring & search infrastructure

All free-tier, consistent with `PRINCIPLES.md`'s bootstrapped-first rule. None of these are set up yet; all need Aaron's own account creation (Claude doesn't create accounts).

| Tool | Why | Cost | Setup effort |
|---|---|---|---|
| **Google Search Console** | Tells Google the site exists, surfaces indexing errors, shows what people actually search to find it | Free | ~15 min: verify domain (DNS TXT record or HTML file), submit `/sitemap.xml` |
| **Bing Webmaster Tools** | Same idea for Bing/Yahoo — smaller share of search but zero-effort once GSC is done (Bing can import GSC data directly) | Free | ~5 min once GSC exists |
| **Uptime monitoring** (e.g. UptimeRobot free tier) | Alerts Aaron by email/SMS if the site goes down — right now, nothing tells him that except a user complaining | Free (UptimeRobot: 50 monitors, 5-min checks) | ~10 min: add `https://[domain]` as an HTTP(s) monitor |
| **Vercel Analytics** | Already live (shipped in V1.1) | Free tier already in use | Done |
| **Google Analytics 4** | Deeper funnel/behavior data than Vercel Analytics alone, useful once there's real traffic to analyze | Free | ~20 min: create property, add tracking snippet (or GA4 via Google Tag Manager) |
| **Vercel's own deployment/error monitoring** | Already available in the Vercel dashboard (build failures, function errors) | Free tier already in use | Nothing to set up — just check it periodically (see first-week-operations.md) |

## SEO basics — status

Already shipped: title template, OG/Twitter metadata, dynamic social preview image, SVG favicon, `sitemap.xml`, `robots.txt` (blocks `/admin`). Still open:
- [ ] Submit to Google Search Console + Bing Webmaster Tools (needs a domain decision first, or can be done against the current `.vercel.app` URL now and re-submitted later).
- [ ] One-time PageSpeed Insights pass on the homepage once a stable domain is live — current bundle sizes are already small (first-load JS 87-168kB across routes per the last `npm run build`), so this is a confirmation step, not expected to surface a real problem.
- [ ] Per `research-C-launch-strategy.md`: 2-4 timely pages targeting the Aug 2026 DEA-ban search terms specifically — different from the evergreen Recovery Library content already shipped, and the one SEO bet with a real shot at ranking fast per that research.

## Trust & legal — status

Live: Community Guidelines, Privacy Policy, Terms of Use, Safety page, Report button, admin moderation view (password-gated, confirmed not to leak data pre-auth). Still open, all already tracked in `FOUNDER_ACTION_ITEMS.md`:
- [ ] Aaron's review/sign-off on the legal pages (currently marked "Draft" on-page).
- [ ] Real contact email (Contact page deliberately doesn't list a fake one).
- [ ] Anthropic spend cap + Resend key, both optional-until-you-flip-a-switch, not launch-blocking.

## Technical — status

- [x] `npm run build` clean, 0 errors, all routes.
- [x] Critical Next.js CVE patched (14.2.35).
- [x] All 30 live routes return HTTP 200 (checked directly, 2026-08-05) — no broken links found.
- [x] `/admin` confirmed properly gated server-side (constant-time key comparison, no data rendered without a valid key).
- [ ] One remaining high-severity `npm audit` advisory needs a Next.js major-version upgrade (14 → 16) — deliberately deferred as a breaking-change risk, not launch-blocking (nested in build tooling, not attacker-reachable at runtime).
- [ ] Search Console/Bing/uptime monitoring (above) — the main technical gap: right now nothing alerts Aaron if the site goes down or search indexing breaks.

## Accessibility — status

Shipped: skip-to-content link, visible focus states, nav landmarks, `aria-expanded` on the mobile menu. Not done: a full WCAG audit (e.g. axe DevTools pass, screen-reader walkthrough) — worth doing once there's a stable domain and before a bigger promotional push, not urgent for a soft first-users launch.

## Definition of "ready for first real users"

Everything technical and content-wise above the fold in this checklist is done except the monitoring/search-console setup (needs Aaron's accounts) and the legal-page sign-off (needs Aaron's read-through). Nothing here blocks starting Phase A of `launch-plan.md` today if Aaron judges the Aug 5 window (see `FOUNDER_ACTION_ITEMS.md`) is worth acting on before the monitoring setup is finished — monitoring matters more the longer the site runs, not on day one with near-zero traffic.
