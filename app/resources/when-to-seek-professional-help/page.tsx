import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "When to seek professional help",
  description: "Clear, non-alarmist guidance on when peer support isn't enough and it's time to involve a doctor or emergency care.",
};

export default function WhenToSeekHelpPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>When to seek professional help</h1>
      <EduBadge />
      <p className="lede">
        Peer support is genuinely valuable, and it has real limits. Knowing
        when to bring in a professional isn&apos;t a failure — it&apos;s the
        same judgment call anyone recovering from anything makes.
      </p>

      <div className="disclaimer">
        <strong>Get emergency help now</strong> — call 911 (US) or go to the
        nearest ER — for: chest pain, trouble breathing, a seizure, severe
        confusion, inability to keep fluids down with signs of severe
        dehydration, or if you can&apos;t keep yourself safe. Full list on
        the <Link href="/safety">Safety page</Link>.
      </div>

      <h2>Talk to a doctor soon (not necessarily an emergency)</h2>
      <ul>
        <li>You have a history of seizures, heart conditions, are pregnant, or use other substances alongside 7-OH.</li>
        <li>Physical symptoms are severe or not easing after the first couple of weeks.</li>
        <li>You&apos;re considering tapering and want a plan that&apos;s actually safe for your situation.</li>
        <li>You have another health condition you&apos;re worried could interact with withdrawal.</li>
      </ul>

      <h2>Consider a therapist or counselor</h2>
      <ul>
        <li>Low mood, anxiety, or cravings are persistent, severe, or getting in the way of daily life.</li>
        <li>You&apos;re noticing patterns (stress, trauma, other mental health conditions) that go deeper than what peer support can address.</li>
        <li>You want structured support for staying stopped, not just getting through withdrawal.</li>
      </ul>

      <h2>SAMHSA National Helpline</h2>
      <p>
        A free, confidential, 24/7 referral service (in English and
        Spanish) for individuals facing mental health or substance use
        challenges: <strong>1-800-662-4357</strong>. They can help you find
        local treatment options — this community can&apos;t make medical
        referrals, but they can.
      </p>

      <div className="callout">
        Bringing in professional help doesn&apos;t mean leaving this
        community — most people here use both. <Link href="/explore">Your
        room</Link> is still here either way.
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
