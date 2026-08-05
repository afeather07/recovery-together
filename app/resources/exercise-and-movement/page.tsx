import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Exercise & movement",
  description: "Why gentle movement can help during recovery, and how to approach it on days when energy is low.",
};

export default function ExercisePage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Exercise &amp; movement</h1>
      <EduBadge />
      <p className="lede">
        On the hardest days, &quot;exercise&quot; isn&apos;t the goal —
        movement is. A short walk counts. There&apos;s no threshold you need
        to hit.
      </p>

      <h2>Why movement helps</h2>
      <p>
        Light movement can ease restlessness, support sleep, and take the
        edge off anxiety and low mood — not by force of willpower, but
        because it&apos;s one of the more reliable, low-cost tools available
        during recovery. It doesn&apos;t need to be intense to help.
      </p>

      <h2>What this can look like early on</h2>
      <ul>
        <li>A slow walk around the block, or even just outside for a few minutes of fresh air.</li>
        <li>Stretching in bed if standing feels like too much.</li>
        <li>Light housework or tidying — movement doesn&apos;t have to look like &quot;exercise.&quot;</li>
        <li>If you have zero energy today, that&apos;s okay. This isn&apos;t a streak to keep.</li>
      </ul>

      <div className="callout">
        Some days the win is getting out of bed. That still counts —{" "}
        <Link href="/explore">say so in your room</Link> if you want.
      </div>

      <h2>As you have more energy</h2>
      <p>
        Many people find that regular, moderate movement — walking, light
        cardio, stretching — helps mood and sleep stabilize further out in
        recovery. Build up gradually, and listen to your body rather than
        pushing through pain or exhaustion.
      </p>

      <div className="disclaimer">
        If you have a heart condition, chest pain, dizziness, or any
        condition your doctor has told you to be careful with, check with
        them before starting new physical activity.
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
