import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description: "What's expected of everyone in Recovery Together's rooms, and what gets reported.",
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Trust &amp; Safety</span>
      <h1>Community Guidelines</h1>
      <p className="updated">Draft — last reviewed 2026-08-05.</p>
      <p className="lede">
        This is a peer-support space for people who are often exhausted,
        frightened, or in physical discomfort. These guidelines exist to
        keep it that way — calm, honest, and safe to be vulnerable in.
      </p>

      <h2>Do</h2>
      <ul>
        <li>Speak from your own experience.</li>
        <li>Assume good faith — people here are often posting on their worst day.</li>
        <li>Use the Report button if something feels wrong, rather than arguing it out publicly.</li>
        <li>Respect that someone using a nickname wants to stay that way.</li>
      </ul>

      <h2>Don&apos;t</h2>
      <ul>
        <li>Buy, sell, trade, or help source controlled or dependence-producing substances.</li>
        <li>Give individualized medication or taper instructions, or instructions for combining substances.</li>
        <li>Impersonate a clinician or claim to provide medical treatment.</li>
        <li>Harass, threaten, exploit, or encourage self-harm.</li>
        <li>Expose another person&apos;s real identity or exact location, even if they revealed it themselves elsewhere.</li>
        <li>Try to arrange private, in-person meetups through the platform.</li>
      </ul>

      <h2>Peer experience vs. professional guidance</h2>
      <p>
        Sharing &quot;here&apos;s what helped me&quot; is welcome. Telling
        someone specifically what medication or dose to take, or exactly how
        to taper, is not — even with good intentions. That distinction is
        for your safety and everyone else&apos;s.
      </p>

      <h2>What happens when something is reported</h2>
      <p>
        Reports go to a moderator for review — they are not visible to other
        members. Content that clearly violates these guidelines can be
        removed. This is currently a manual, human review process, not an
        automated one.
      </p>

      <div className="callout">
        These guidelines are a living document for a brand-new community —
        expect them to be refined as real situations come up. See{" "}
        <Link href="/contact">Contact</Link> if something here doesn&apos;t
        seem to cover a situation you&apos;ve run into.
      </div>

      <Link href="/safety" className="back-link">
        See crisis &amp; safety resources →
      </Link>
    </main>
  );
}
