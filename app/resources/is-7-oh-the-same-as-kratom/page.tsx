import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Is 7-OH the same as kratom?",
  description: "What 7-hydroxymitragynine (7-OH) actually is, how it's different from kratom leaf, and what the 2026 scheduling news does and doesn't cover.",
};

export default function Is7OHSameAsKratomPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Is 7-OH the same as kratom?</h1>
      <EduBadge />
      <p className="lede">
        Short answer: related, but not the same thing — and that difference is
        exactly what&apos;s causing so much confusion in the 2026 news coverage.
      </p>

      <h2>What kratom is</h2>
      <p>
        Kratom refers to the leaf of the <em>Mitragyna speciosa</em> tree,
        traditionally consumed as tea, chewed, or as a basic leaf powder.
        Raw kratom leaf naturally contains many alkaloids at relatively low
        concentrations, including small amounts of 7-hydroxymitragynine.
      </p>

      <h2>What 7-OH is</h2>
      <p>
        7-hydroxymitragynine (7-OH) is one specific alkaloid found in
        kratom — but the products people are talking about in the news and
        in withdrawal aren&apos;t raw leaf. They&apos;re concentrated or
        chemically enhanced extracts engineered to contain far more 7-OH
        than naturally occurs in the plant. These concentrated products
        interact much more strongly with opioid receptors than traditional
        kratom leaf does, which is why their dependence and withdrawal
        profile looks closer to opioid withdrawal.
      </p>

      <div className="callout">
        If you&apos;re here because you&apos;re stopping a concentrated
        extract product (sometimes sold as shots, tablets, or high-potency
        powders), not plain kratom leaf tea — you&apos;re exactly who this
        community is for. <Link href="/explore">Find your room.</Link>
      </div>

      <h2>What the 2026 scheduling actions actually cover</h2>
      <p>
        Regulatory actions moving through 2026 — including a DEA temporary
        scheduling action and a growing number of state-level bans — have
        generally targeted concentrated 7-OH and related synthesized
        compounds specifically, not raw kratom leaf below certain
        concentration thresholds. In practice this means: coverage varies
        by state, is changing quickly, and the exact legal status of any
        specific product depends on where you live and what&apos;s actually
        in it. This page is not legal advice — if you need to know the
        current legal status where you are, that changes often enough that
        a live local news search will be more current than anything written
        here.
      </p>

      <h2>Why this matters if you're stopping</h2>
      <p>
        Whether what you were taking was raw leaf or a concentrated extract
        can affect what withdrawal looks like — concentrated 7-OH products
        tend to produce a withdrawal experience closer to opioid withdrawal,
        while lighter traditional kratom use often doesn&apos;t. See{" "}
        <Link href="/resources/withdrawal-timeline">What withdrawal can
        look like</Link> for a general picture either way.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
