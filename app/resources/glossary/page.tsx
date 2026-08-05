import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-language definitions for terms used on Recovery Together and in recovery spaces generally.",
};

const TERMS = [
  { term: "7-OH (7-hydroxymitragynine)", def: "A compound found in and derived from kratom, sold in concentrated form in some products. It's the substance this community is centered around recovering from." },
  { term: "Kratom", def: "A plant whose leaves are used to make various products, including concentrated 7-OH extracts." },
  { term: "Withdrawal", def: "The physical and mental symptoms that can happen when a substance your body adjusted to is stopped or reduced." },
  { term: "Taper", def: "Gradually reducing use over time rather than stopping all at once. Recovery Together does not provide taper plans or dosing guidance — talk to a doctor about whether tapering makes sense for you." },
  { term: "Stage room", def: "A chat space grouped by where someone is in their process — Preparing, Day 1, Day 2–3, Day 4–7, Week 2+, or Maintaining recovery." },
  { term: "Peer support", def: "Support from people with lived experience of the same thing, as opposed to clinical or professional treatment." },
  { term: "Anonymous profile", def: "A profile identified only by a nickname you choose — no real name or contact info required." },
  { term: "Check-in", def: "A short post about how you're doing right now. There's no wrong way to check in." },
  { term: "Relapse", def: "Returning to use after a period of stopping. It's common, it doesn't erase progress already made, and this community doesn't shame people for it." },
  { term: "Moderator", def: "Someone who reviews reported content to keep rooms safe. See the Community Guidelines for what gets reported." },
];

export default function GlossaryPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Glossary</h1>
      <p className="lede">Plain-language definitions for terms used around this site.</p>

      {TERMS.map((t) => (
        <div key={t.term} style={{ marginBottom: 18 }}>
          <strong>{t.term}</strong>
          <p style={{ margin: "4px 0 0" }}>{t.def}</p>
        </div>
      ))}

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
