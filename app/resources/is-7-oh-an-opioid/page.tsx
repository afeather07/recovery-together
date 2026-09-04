import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Is 7-OH an opioid?",
  description: "Whether concentrated 7-OH counts as an opioid, why its withdrawal can feel like opiate withdrawal, and what that means if you're stopping.",
};

export default function Is7OHAnOpioidPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Is 7-OH an opioid?</h1>
      <EduBadge />
      <p className="lede">
        Short answer: not classified as one legally in the same category as
        drugs like heroin or oxycodone, but concentrated 7-OH acts on the
        same opioid receptors in the brain, strongly enough that withdrawal
        from it commonly feels like opiate withdrawal.
      </p>

      <h2>Why it feels like opiate withdrawal</h2>
      <p>
        7-hydroxymitragynine binds to mu-opioid receptors — the same
        receptor system that drugs like morphine, oxycodone, and heroin act
        on. In concentrated extract form, that binding is reportedly far
        stronger than raw kratom leaf, which is why people describe stopping
        it as feeling like classic opiate withdrawal: body aches,
        restlessness, GI symptoms, and disrupted sleep, rather than the
        milder experience some describe from traditional kratom tea.
      </p>

      <h2>Why the legal answer is more complicated</h2>
      <p>
        Kratom and 7-OH have historically existed in a regulatory gray area
        — not scheduled the way traditional opioids are, which is part of
        why concentrated extract products became so widely available in the
        first place. That's actively changing: 2026 has brought a federal
        scheduling action targeting concentrated 7-OH specifically, plus a
        growing number of state-level bans. See{" "}
        <Link href="/updates">News &amp; legal updates</Link> for what's
        changed most recently — this page won't stay current on legal status
        by itself, since it's changing fast.
      </p>

      <div className="callout">
        Whatever the legal label is, if your body is going through withdrawal
        that feels like opiate withdrawal, that&apos;s real and worth taking
        seriously. <Link href="/explore">Find your room</Link> if you want to
        talk to people going through the same thing.
      </div>

      <h2>What this means if you're stopping</h2>
      <p>
        Opioid-pattern withdrawal can include dehydration risk from GI
        symptoms and significant sleep/mood disruption — see{" "}
        <Link href="/resources/withdrawal-timeline">What withdrawal can
        look like</Link> and <Link href="/resources/hydration-nutrition">
        Hydration &amp; nutrition</Link>. If you have a history of seizures,
        heart conditions, are pregnant, or use other substances alongside
        7-OH, talk to a doctor before you stop — see the{" "}
        <Link href="/safety">Safety page</Link> for what to do if something
        feels like an emergency.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
