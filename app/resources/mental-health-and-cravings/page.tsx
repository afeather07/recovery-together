import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Mental health & cravings",
  description: "Mood swings, anxiety, and cravings are common in recovery — what tends to help, and when to get more support.",
};

export default function MentalHealthPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Mental health &amp; cravings</h1>
      <EduBadge />
      <p className="lede">
        Irritability, anxiety, low mood, and cravings are some of the most
        common things people describe here — during withdrawal and for a
        while after. None of that means you&apos;re failing.
      </p>

      <h2>Cravings</h2>
      <p>
        Cravings tend to come in waves rather than staying constant — they
        build, peak, and pass, usually within minutes even when they feel
        endless. Naming what&apos;s happening (&quot;this is a craving, it
        will pass&quot;), changing your environment for a few minutes, or
        posting in your room instead of acting on it are things people here
        say help.
      </p>

      <div className="callout">
        Having a hard moment right now? Posting a check-in — even just
        &quot;craving hit, trying to ride it out&quot; — is exactly what{" "}
        <Link href="/explore">the rooms</Link> are for.
      </div>

      <h2>Mood swings and anxiety</h2>
      <p>
        Feeling flat, irritable, or anxious in the days and weeks after
        stopping is common and usually improves with time. Movement, sleep,
        hydration, and connection with other people all tend to help more
        than willpower alone. If anxiety is tipping into full panic —
        racing heart, tight chest, a wave of dread — see{" "}
        <Link href="/resources/anxiety-and-panic">Anxiety &amp; panic</Link>{" "}
        for grounding techniques and how to tell it apart from an
        emergency.
      </p>

      <h2>Mental health support beyond this site</h2>
      <p>
        Peer support helps, but it isn&apos;t a substitute for professional
        mental health care, especially if low mood, anxiety, or cravings are
        severe or persistent. A doctor or therapist can offer options —
        including medication, if appropriate — that a peer community can&apos;t.
      </p>

      <div className="disclaimer">
        If you are having thoughts of harming yourself, or feel unable to
        keep yourself safe, that is an emergency. Call or text{" "}
        <strong>988</strong> (US) any time, or see the full list on the{" "}
        <Link href="/safety">Safety page</Link>.
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
