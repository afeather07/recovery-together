import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery Library",
  description:
    "Plain-language recovery resources: withdrawal timelines, sleep, hydration and nutrition, mental health, exercise, when to seek professional help, a glossary, and FAQ.",
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
    href: "/resources/anxiety-and-panic",
    title: "Anxiety & panic",
    description: "What panic can feel like, how to tell it apart from an emergency, and grounding techniques that help.",
  },
  {
    href: "/resources/mental-health-and-cravings",
    title: "Mental health & cravings",
    description: "Mood swings and cravings are common — what tends to help, and when to get more support.",
  },
  {
    href: "/resources/exercise-and-movement",
    title: "Exercise & movement",
    description: "Why gentle movement helps, and how to approach it on low-energy days.",
  },
  {
    href: "/resources/when-to-seek-professional-help",
    title: "When to seek professional help",
    description: "Clear, non-alarmist guidance on when it's time to involve a doctor.",
  },
  {
    href: "/resources/glossary",
    title: "Glossary",
    description: "Plain-language definitions for terms used around this site and in recovery spaces generally.",
  },
  {
    href: "/resources/faq",
    title: "Frequently asked questions",
    description: "What Just Another Friend is, what it isn't, and how to use it.",
  },
  {
    href: "/resources/is-7-oh-the-same-as-kratom",
    title: "Is 7-OH the same as kratom?",
    description: "What 7-OH actually is, how it differs from kratom leaf, and why that matters.",
  },
  {
    href: "/resources/7-oh-ban-what-changes",
    title: "The 7-OH ban: what changes, and what doesn't",
    description: "A plain-language look at the 2026 scheduling and state bans, and what actually matters if you're stopping.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Recovery Library</span>
      <h1>Information you can use right now.</h1>
      <p className="lede">
        General, non-medical information written to be readable when you&apos;re
        exhausted or can&apos;t focus — the beginning of a knowledge base
        we&apos;ll keep growing. This is educational content, separate from
        peer experience shared in the rooms, and none of it replaces a
        doctor — see the <Link href="/safety">Safety page</Link> if you need
        help immediately.
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
