import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "What are MGM-15 and MGM-16?",
  description: "What MGM-15 and MGM-16 are, how they relate to 7-OH and kratom, and why the DEA moved on them alongside 7-OH in 2026.",
};

export default function MgmPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>What are MGM-15 and MGM-16?</h1>
      <EduBadge />
      <p className="lede">
        If you&apos;re here because a product you used turned out to contain
        one of these instead of (or alongside) 7-OH, you&apos;re not behind —
        this is genuinely new territory, and confusion about it is normal.
      </p>

      <h2>What they actually are</h2>
      <p>
        MGM-15 and MGM-16 are lab-modified versions of 7-hydroxymitragynine —
        they don&apos;t occur naturally in the kratom plant the way trace
        amounts of 7-OH itself do. MGM-15 is commonly described as a
        dihydro version of 7-OH; MGM-16 is a further-modified, reportedly
        more potent version. Both are still sold in some markets as
        &quot;kratom extract&quot; products, even though they&apos;re
        semi-synthetic compounds engineered in a lab, not something you&apos;d
        get from the plant itself.
      </p>

      <div className="callout">
        The practical part: if a product doesn&apos;t clearly say what&apos;s
        in it, you may not actually know whether you were using 7-OH, MGM-15,
        MGM-16, or a mix — and that&apos;s not a knowledge gap you created,
        it&apos;s a labeling problem in this market. <Link href="/explore">
        Find your room</Link> regardless of which one it was; withdrawal
        support here isn&apos;t gated on knowing the exact compound.
      </div>

      <h2>Why this matters for withdrawal</h2>
      <p>
        All three act on the same opioid receptors, and the newer, more
        modified compounds are generally reported as more potent, not less —
        so there&apos;s no reason to assume switching to one because it was
        marketed as an &quot;alternative&quot; means an easier stop. See{" "}
        <Link href="/resources/is-7-oh-an-opioid">Is 7-OH an opioid?</Link>{" "}
        for why this whole family tends to produce an opiate-like withdrawal
        pattern.
      </p>

      <h2>The regulatory status, as of this writing</h2>
      <p>
        In 2026 the DEA moved to temporarily schedule dihydro-7-hydroxymitragynine
        (MGM-15) alongside 7-OH, with a related action covering MGM-16 and
        other synthesized derivatives. This is changing quickly and varies
        further by state — see <Link href="/updates">News &amp; legal
        updates</Link> for what&apos;s current, and treat anything written
        here about legal status as likely dated by the time you read it.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
