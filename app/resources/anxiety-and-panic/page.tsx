import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Anxiety & panic",
  description: "What panic can feel like during withdrawal, how to tell it apart from a medical emergency, and grounding techniques that can help.",
};

export default function AnxietyPanicPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Anxiety &amp; panic</h1>
      <EduBadge />
      <p className="lede">
        A racing heart, tight chest, and a feeling that something is
        seriously wrong are common during withdrawal — and genuinely
        frightening, especially with brain fog making it hard to think
        clearly. You&apos;re not overreacting.
      </p>

      <h2>What panic can feel like</h2>
      <p>
        Pounding or racing heart, tight chest, shortness of breath,
        shakiness, sweating, a wave of dread, or a feeling of being outside
        your own body. It usually peaks within about 10 minutes and eases
        from there, even though it can feel endless while it&apos;s
        happening.
      </p>

      <div className="disclaimer">
        <strong>When it&apos;s not just panic</strong> — get emergency help
        (call 911 or go to the nearest ER) for: chest pain that doesn&apos;t
        ease, real trouble breathing (not just fast breathing), fainting,
        one-sided weakness or numbness, or if anything feels different from
        past anxiety you&apos;ve experienced. It&apos;s always okay to get
        checked out if you&apos;re not sure — that&apos;s what emergency
        care is for. Full list on the <Link href="/safety">Safety page</Link>.
      </div>

      <h2>Grounding techniques that can help in the moment</h2>
      <ul>
        <li><strong>Slow the exhale.</strong> Breathe in for 4 counts, out for 6 — a longer exhale than inhale signals your body to calm down.</li>
        <li><strong>5-4-3-2-1.</strong> Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Pulls attention out of the spiral and into the room.</li>
        <li><strong>Cold water on your face or hands.</strong> A genuine physiological reset, not just a distraction.</li>
        <li><strong>Say what&apos;s happening out loud or in a post.</strong> &quot;This is panic, it will pass&quot; — naming it reduces its grip.</li>
      </ul>

      <div className="callout">
        Mid-panic and don&apos;t want to be alone with it? Posting in{" "}
        <Link href="/explore">your room</Link> — even just &quot;panicking
        right now&quot; — is exactly what it&apos;s there for.
      </div>

      <h2>Why this happens during withdrawal</h2>
      <p>
        Your nervous system is recalibrating, and that can show up as
        anxiety or panic even in people with no prior history of it. It
        tends to ease as physical withdrawal eases, though for some people
        anxiety lingers longer than the physical symptoms do — see{" "}
        <Link href="/resources/mental-health-and-cravings">Mental health
        &amp; cravings</Link> for more on that stretch.
      </p>

      <h2>When to involve a professional</h2>
      <p>
        If panic is frequent, severe, or not easing over time, that&apos;s
        worth bringing to a doctor or therapist — see{" "}
        <Link href="/resources/when-to-seek-professional-help">When to
        seek professional help</Link>.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
