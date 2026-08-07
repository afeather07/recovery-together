import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using Just Another Friend.",
};

export default function TermsPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Trust &amp; Safety</span>
      <h1>Terms of Use</h1>
      <p className="updated">Draft — last reviewed 2026-08-05.</p>

      <h2>What Just Another Friend is</h2>
      <p>
        A peer-support community for people preparing to stop, currently
        stopping, or recovering from 7-OH and concentrated kratom products.
        It provides peer connection, general information, and access to
        professional/emergency resources.
      </p>

      <h2>What it is not</h2>
      <p>
        Not a detox provider, medical treatment, individualized medical
        advice, or a tapering service. It does not guarantee that stopping
        at home is safe for you specifically. See{" "}
        <Link href="/safety">Safety</Link> for what to do in an emergency.
      </p>

      <h2>Eligibility</h2>
      <p>You must be at least 18 years old to use Just Another Friend.</p>

      <h2>Your account</h2>
      <p>
        Accounts are anonymous by default. You&apos;re responsible for what
        you post under your nickname. Don&apos;t impersonate someone else,
        including clinicians or moderators.
      </p>

      <h2>Community content</h2>
      <p>
        Content you post is your own, and you&apos;re responsible for it.
        By posting, you allow other members to view it within the app as
        intended. See the <Link href="/community-guidelines">Community
        Guidelines</Link> for what&apos;s not allowed — violations may be
        removed, and repeated or severe violations may result in losing
        access.
      </p>

      <h2>No warranty</h2>
      <p>
        Just Another Friend is provided &quot;as is,&quot; without guarantees
        about availability, accuracy of user-submitted content, or outcomes.
        Peer support content reflects individual experiences, not
        professional advice.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Just Another Friend and its
        founder aren&apos;t liable for decisions made based on content
        posted by other members, or for outcomes related to substance use
        or withdrawal. This service does not replace professional medical
        judgment.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change as the product grows. Material changes will
        be reflected here with an updated date.
      </p>

      <div className="disclaimer">
        This is an early, founder-written draft for a newly launched
        product, not final legal counsel-reviewed text.
      </div>

      <Link href="/privacy" className="back-link">
        ← See Privacy Policy
      </Link>
    </main>
  );
}
