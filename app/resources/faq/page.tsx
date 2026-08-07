import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "What Just Another Friend is, what it isn't, and how to use it.",
};

const FAQS = [
  {
    q: "Is Just Another Friend medical treatment?",
    a: "No. It's peer support — connection with other people who understand what you're going through. It doesn't diagnose, prescribe, provide taper instructions, or replace professional care. See the Safety page for what to do in an emergency.",
  },
  {
    q: "Do I have to give my real name?",
    a: "No. You choose a nickname, and that's what other people see. Your real identity is never required and never shown unless you choose to reveal it yourself.",
  },
  {
    q: "What information do you collect?",
    a: "As little as possible — a nickname, the recovery stage you select, and whatever you post. See the Privacy Policy for the full, accurate breakdown.",
  },
  {
    q: "Do I need to sign up before I can look around?",
    a: "No. You can browse rooms and resources from the Explore page without completing onboarding. Onboarding is only needed to post or reply.",
  },
  {
    q: "What if I relapse?",
    a: "You're still welcome here. Recovery isn't a straight line, and this community isn't set up to shame anyone for where they actually are.",
  },
  {
    q: "What happens if someone posts something unsafe?",
    a: "Every post and reply has a Report button. Reports go to a moderator for review. See the Community Guidelines for what's not allowed.",
  },
  {
    q: "Does this site use AI?",
    a: "Onboarding can optionally use AI to turn a free-form story into a draft profile, but it's off by default and never required — a simple form works exactly the same without it. AI never generates the safety or crisis information on this site; that content is static and reviewed.",
  },
  {
    q: "Is this only for 7-OH and kratom?",
    a: "That's the community's current focus, but the support here — peer connection, staying anonymous, going at your own pace — applies broadly if that's what you're looking for.",
  },
];

export default function FaqPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Frequently asked questions</h1>
      <p className="lede">Short answers. If something's missing, use the Contact page.</p>

      <div style={{ marginTop: 12 }}>
        {FAQS.map((f) => (
          <details key={f.q} className="faq-item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
