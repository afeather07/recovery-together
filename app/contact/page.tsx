import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Just Another Friend, and what to do instead in an emergency.",
};

export default function ContactPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Contact</span>
      <h1>Get in touch</h1>
      <p className="lede">
        Just Another Friend is run by a single founder. Response times won&apos;t
        be instant — for anything urgent, use the resources below instead of
        waiting on a reply here.
      </p>

      <div className="disclaimer">
        This is not a crisis line and isn&apos;t monitored in real time. If
        you need help right now, see the <Link href="/safety">Safety
        page</Link> — it lists 988, Crisis Text Line, SAMHSA, and Poison
        Control, all available 24/7.
      </div>

      <div className="contact-card">
        <strong>Report unsafe content</strong>
        <p>
          Use the Report button on any post or reply — that goes directly to
          moderation and is the fastest way to flag something.
        </p>
      </div>

      <div className="contact-card">
        <strong>Everything else</strong>
        <p>
          A direct contact channel for bugs, feedback, or questions not
          covered in the <Link href="/resources/faq">FAQ</Link> is coming
          soon. For now, the Report button is the fastest way to reach a
          moderator about anything on the site.
        </p>
      </div>

      <Link href="/resources/faq" className="back-link">
        ← See the FAQ
      </Link>
    </main>
  );
}
