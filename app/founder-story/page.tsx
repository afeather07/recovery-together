import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Story",
  description: "Why the founder of Recovery Together built this.",
};

export default function FounderStoryPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Founder of Recovery Together</span>
      <h1>Why this exists</h1>

      <p className="lede">
        I&apos;m not sharing my name here — the people this community serves
        get to stay anonymous, and it felt right to keep the focus on that,
        not on me.
      </p>

      <p>
        I built Recovery Together because I experienced firsthand how hard
        it is to find calm, trustworthy peer support during withdrawal —
        somewhere to be honest about what was happening without it turning
        into a whole ordeal, without judgment, and without having to hand
        over your real identity just to talk to someone who understood.
      </p>

      <p>
        That gap is what this is trying to close. Not a replacement for
        medical care — a place to not be alone with it, organized simply
        enough that using it doesn&apos;t take more energy than you have.
      </p>

      <p>
        This is still early. It&apos;s a small, independent, bootstrapped
        project, built and maintained by one person. It will stay imperfect
        for a while, and it will keep improving because real people are
        using it and telling us what&apos;s missing.
      </p>

      <div className="callout">
        If something here doesn&apos;t work the way it should, or you have
        an idea for what would&apos;ve helped you more,{" "}
        <Link href="/contact">tell us</Link>. This gets built from what
        actually helps, not guesses.
      </div>

      <Link href="/about" className="back-link">
        ← About Recovery Together
      </Link>
    </main>
  );
}
