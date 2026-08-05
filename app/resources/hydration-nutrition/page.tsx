import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Hydration & nutrition",
  description: "Small, doable steps for days when eating and drinking feel impossible.",
};

export default function HydrationNutritionPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Hydration &amp; nutrition</h1>
      <EduBadge />
      <p className="lede">
        Nausea and low appetite are extremely common early on. The goal on
        the hardest days isn&apos;t a full meal — it&apos;s not zero.
      </p>

      <h2>Hydration first</h2>
      <p>
        Dehydration makes almost everything else feel worse, and it&apos;s
        one of the more dangerous things to let slide. Small, frequent sips
        are easier to keep down than large amounts at once. Water,
        electrolyte drinks, or diluted juice all count.
      </p>

      <div className="disclaimer">
        Severe dehydration is a medical emergency — signs include very dark
        urine or none at all, dizziness when standing, confusion, or a
        rapid heartbeat. If you can&apos;t keep any fluids down for an
        extended period, see the <Link href="/safety">Safety page</Link> and
        get help.
      </div>

      <h2>Eating when nothing sounds good</h2>
      <ul>
        <li>Bland, easy foods count — crackers, toast, bananas, rice, broth.</li>
        <li>Small amounts often, rather than trying to force a full plate.</li>
        <li>Cold or room-temperature food is sometimes easier to tolerate than hot food when nauseated.</li>
        <li>If nothing else works, a few bites is still a real, worthwhile win — several people in this community have said exactly that about &quot;half a banana.&quot;</li>
      </ul>

      <h2>As appetite comes back</h2>
      <p>
        Many people notice appetite returning unevenly over the first couple
        of weeks. Protein and steady blood sugar (regular small meals rather
        than long gaps) tend to help with energy and mood as things
        stabilize.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
