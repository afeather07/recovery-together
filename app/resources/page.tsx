import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-language recovery resources: withdrawal timelines, sleep, hydration and nutrition, mental health, a glossary, and frequently asked questions.",
};

const RESOURCES = [
  {
    href: "/resources/withdrawal-timeline",
    title: "What withdrawal can look like",
    description: "A general, non-clinical picture of how symptoms tend to change over the first weeks.",
  },
  {
    href: "/resources/sleep",
    title: "Sleep",
    description: "Why sleep gets so hard early on, and gentle things that can help.",
  },
  {
    href: "/resources/hydration-nutrition",
    title: "Hydration & nutrition",
    description: "Small, doable steps for days when eating and drinking feel impossible.",
  },
  {
    href: "/resources/mental-health-and-cravings",
    title: "Mental health & cravings",
    description: "Mood swings, anxiety, and cravings are common — what tends to help, and when to get more support.",
  },
  {
    href: "/resources/glossary",
    title: "Glossary",
    description: "Plain-language definitions for terms used around this site and in recovery spaces generally.",
  },
  {
    href: "/resources/faq",
    title: "Frequently asked questions",
    description: "What Recovery Together is, what it isn't, and how to use it.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Information you can use right now.</h1>
      <p className="lede">
        General, non-medical information written to be readable when you&apos;re
        exhausted or can&apos;t focus. None of this replaces a doctor —
        see the <Link href="/safety">Safety page</Link> if you need help
        immediately.
      </p>

      <div className="resource-grid">
        {RESOURCES.map((r) => (
          <Link key={r.href} href={r.href} className="resource-card">
            <h2>{r.title}</h2>
            <p>{r.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
