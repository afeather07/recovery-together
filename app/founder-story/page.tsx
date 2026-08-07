import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Story",
  description: "Why the founder of Just Another Friend built this.",
};

export default function FounderStoryPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Founder of Just Another Friend</span>
      <h1>Why this exists</h1>

      <p className="lede">
        I&apos;m not sharing my name here — the people this community serves
        get to stay anonymous, and it felt right to keep the focus on that,
        not on me.
      </p>

      <p>
        I became dependent on concentrated 7-OH. I was taking it just to
        function and to keep withdrawal away, spending more on it than I
        meant to, and searching Reddit late at night trying to understand
        what was happening to me. I didn&apos;t tell my family or friends.
        Even though I could see, right there in those late-night threads,
        that plenty of other people were going through the exact same
        thing — I still felt completely alone with it.
      </p>

      <p>
        That&apos;s the specific gap Just Another Friend is trying to close.
        Not a replacement for medical care — a calm, anonymous place where
        someone in that exact moment can find people who actually understand
        it, without it turning into a whole ordeal and without having to
        hand over their real identity just to talk to someone who gets it.
      </p>

      <p>
        If you&apos;re here because some version of that sounds familiar —
        I built this hoping you&apos;d land here and think: I found my
        people. I&apos;m not alone in this. And I know what to do next.
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
        ← About Just Another Friend
      </Link>
    </main>
  );
}
