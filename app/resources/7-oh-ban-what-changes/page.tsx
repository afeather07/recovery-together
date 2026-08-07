import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "The 7-OH ban: what changes, and what doesn't",
  description: "A plain-language look at the 2026 7-OH scheduling and state bans — what they cover, what they don't, and what actually matters if you're stopping.",
};

export default function BanExplainerPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>The 7-OH ban: what changes, and what doesn&apos;t</h1>
      <EduBadge />
      <p className="lede">
        2026 brought a wave of regulatory action on concentrated 7-OH —
        federal, state, and even county-level. Here&apos;s what that
        actually means if you&apos;re someone using it, not a lawyer or a
        policymaker.
      </p>

      <h2>What's happening, broadly</h2>
      <p>
        A federal scheduling action has moved to temporarily classify
        concentrated 7-hydroxymitragynine and related compounds more
        strictly. Separately, and often faster-moving, a growing number of
        individual states — and in some cases counties — have passed their
        own bans or restrictions on kratom and 7-OH products, sometimes
        covering more than the federal action does. The exact legal status
        depends entirely on where you are, and it is changing quickly
        enough that any specific state-by-state list risks being out of
        date within weeks.
      </p>

      <div className="disclaimer">
        This page is general information, not legal advice, and not
        medical advice. If you need to know the current legal status of
        anything in your specific state, a live search for your state name
        plus "kratom law 2026" will be more current than any static page.
      </div>

      <h2>What doesn't change</h2>
      <ul>
        <li>Your withdrawal experience isn&apos;t determined by the legal status of what you were taking — the physical process is the same whether or not it&apos;s currently legal where you live.</li>
        <li>You don&apos;t need anything to be illegal to have a legitimate reason to stop.</li>
        <li>Peer support, safety information, and a place to not be alone with it — none of that depends on the regulatory situation.</li>
      </ul>

      <h2>Why this might actually be the moment you stop</h2>
      <p>
        Some people are finding their usual product harder to get right now,
        whether from a store closing a category, a state ban taking effect,
        or a vendor discontinuing a product line. If that&apos;s pushing you
        toward stopping sooner than you planned — that&apos;s a real,
        valid reason to stop, even if it wasn&apos;t your first choice of
        timing. The physical and emotional experience is the same either
        way, and so is the support available.
      </p>

      <div className="callout">
        Whatever brought you here — a ban, a decision you made on your own,
        or just being ready — <Link href="/explore">there&apos;s a room
        for where you are right now</Link>.
      </div>

      <h2>If you're confused about what you were actually taking</h2>
      <p>
        See <Link href="/resources/is-7-oh-the-same-as-kratom">Is 7-OH the
        same as kratom?</Link> — a lot of the current news coverage blurs
        this distinction, and it can matter for understanding your own
        withdrawal experience.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
