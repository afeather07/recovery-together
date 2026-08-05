import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Sleep during recovery",
  description: "Why sleep gets so hard during early recovery, and gentle things that can help.",
};

export default function SleepPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Sleep</h1>
      <EduBadge />
      <p className="lede">
        Broken or absent sleep is one of the most common things people
        describe in the first days. It is exhausting, and it is not a sign
        you&apos;re doing something wrong.
      </p>

      <h2>Why it happens</h2>
      <p>
        Your body is recalibrating without something it had adjusted to
        having. That recalibration can show up as trouble falling asleep,
        waking frequently, or sleeping much lighter than usual. It tends to
        improve over days to weeks, not hours.
      </p>

      <h2>Things that can help</h2>
      <ul>
        <li>Keep the room cool, dark, and quiet if you can — small comfort adjustments do add up.</li>
        <li>Try to keep a consistent wake time, even if the night was rough — it helps reset your rhythm faster than sleeping in does.</li>
        <li>Limit caffeine, especially in the second half of the day.</li>
        <li>If you can&apos;t sleep, resting quietly still helps more than doom-scrolling — try low light and no screens if you wake up in the middle of the night.</li>
        <li>A short walk or light movement earlier in the day can make falling asleep easier at night.</li>
      </ul>

      <div className="callout">
        Awake at 3am and it feels unbearable? You&apos;re not the only one —{" "}
        <Link href="/explore">check the room for your stage</Link>. Reading
        someone else&apos;s 3am post can help more than you&apos;d expect.
      </div>

      <h2>When to talk to a doctor</h2>
      <p>
        If sleeplessness is severe, prolonged well past the first couple of
        weeks, or paired with symptoms like chest pain, confusion, or a
        seizure, that&apos;s a reason to get medical help — not something to
        push through alone. See the <Link href="/safety">Safety page</Link>.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
