import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What withdrawal can look like",
  description: "A general, non-clinical picture of how 7-OH and kratom withdrawal symptoms tend to change over the first weeks.",
};

export default function WithdrawalTimelinePage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>What withdrawal can look like</h1>
      <p className="lede">
        Every person and every case is different — this is a general pattern
        other people have described, not a prediction of what will happen to
        you.
      </p>

      <div className="disclaimer">
        This is not medical advice and not a timeline you should expect to
        match exactly. If you have a history of seizures, heart conditions,
        are pregnant, or use other substances alongside 7-OH, talk to a
        doctor before you stop, and see the <Link href="/safety">Safety page</Link>{" "}
        for warning signs that need emergency care.
      </div>

      <h2>The first 24 hours</h2>
      <p>
        Many people feel okay at first, then notice restlessness, anxiety, or
        trouble sitting still. Some people also start to feel muscle
        discomfort, a runny nose, or sweating.
      </p>

      <h2>Day 1–3</h2>
      <p>
        This stretch is often described as the hardest — disrupted sleep,
        low appetite, stomach upset, and mood swings are common. Many people
        in our community say this is when peer support matters most, simply
        because time moves slowly and it&apos;s easy to feel like it won&apos;t end.
      </p>

      <h2>Day 4–7</h2>
      <p>
        Physical symptoms often start to ease during this window, though
        energy, sleep, and appetite can still be inconsistent. Some people
        feel a return of mental fog or low motivation even as the physical
        symptoms fade.
      </p>

      <h2>Week 2 and beyond</h2>
      <p>
        Physical symptoms have usually settled substantially by now for most
        people, but mood, sleep quality, and cravings can take longer to
        fully stabilize. This is often when it helps most to have something
        to look forward to, and people to check in with.
      </p>

      <div className="callout">
        Wherever you are on this list, there&apos;s a room for it.{" "}
        <Link href="/explore">Browse rooms by stage.</Link>
      </div>

      <h2>When to get emergency help</h2>
      <p>
        Severe dehydration, chest pain, trouble breathing, confusion, a
        seizure, or feeling unable to keep yourself safe are reasons to get
        help immediately, not to wait it out. See the full list on the{" "}
        <Link href="/safety">Safety page</Link>.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
