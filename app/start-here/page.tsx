import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here",
  description: "New here and not sure what this is? Start here — a calm walkthrough of what Recovery Together is and how to use it.",
};

const QA = [
  {
    q: "What is Recovery Together?",
    a: "An anonymous peer-support community for people preparing to stop, currently stopping, or recovering from 7-OH and concentrated kratom products. Real people, organized by recovery stage, talking to each other.",
  },
  {
    q: "Who is this for?",
    a: "Anyone dealing with 7-OH or concentrated kratom use — whether you're still using and thinking about stopping, in the middle of it right now, or further into recovery and want to stay connected.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This is peer support and general information, not diagnosis, treatment, or individualized medical advice. See the Safety page for what to do if you need real medical help.",
  },
  {
    q: "Can I stay anonymous?",
    a: "Yes, by default. You pick a nickname — no real name, email, or photo is ever required.",
  },
  {
    q: "Do I need an account?",
    a: "You need a lightweight, anonymous profile to post or reply, but you can browse rooms and the Recovery Library without one.",
  },
  {
    q: "What happens after I join?",
    a: "You tell us roughly where you're at (a sentence or two, or a quick form), pick or confirm your stage, and you're in a room with people at a similar point. You can read first, or post right away.",
  },
  {
    q: "What if I relapse?",
    a: "You're still welcome here. Recovery isn't a straight line, and this isn't a space that keeps score.",
  },
  {
    q: "What should I expect today?",
    a: "No pressure to do anything specific. Read a room, post a check-in if you feel like it, or start with the Recovery Library if reading feels easier than talking right now.",
  },
];

export default function StartHerePage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Start Here</span>
      <h1>You&apos;re in the right place.</h1>
      <p className="lede">
        If you&apos;re scared, exhausted, or don&apos;t know where to begin —
        this page is for you. No forms to fill out yet, just answers.
      </p>

      <div style={{ marginTop: 16 }}>
        {QA.map((item) => (
          <div key={item.q} style={{ marginBottom: 22 }}>
            <h2 style={{ margin: "0 0 6px" }}>{item.q}</h2>
            <p style={{ margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>

      <div className="callout">
        Ready when you are — no rush. <Link href="/#top">Find your group</Link>{" "}
        takes under a minute, and you can stay anonymous the whole time.
      </div>

      <p style={{ marginTop: 24 }}>
        Need something specific right now?{" "}
        <Link href="/safety">Safety &amp; crisis resources</Link> ·{" "}
        <Link href="/resources">Recovery Library</Link> ·{" "}
        <Link href="/resources/faq">More FAQ</Link>
      </p>
    </main>
  );
}
