import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Detoxing at home: what's actually safe, and when it's not",
  description: "Honest, general information about home detox risk factors and when medical supervision matters more -- not a taper plan or step-by-step instructions.",
};

export default function DetoxingAtHomePage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Detoxing at home: what&apos;s actually safe, and when it&apos;s not</h1>
      <EduBadge />
      <p className="lede">
        A lot of people stop 7-OH or kratom at home, and for many people
        that's what actually happens. This page is honest about that —
        but "a lot of people do it" isn't the same as "it's risk-free for
        everyone," and the difference matters.
      </p>

      <div className="disclaimer">
        This is not a taper plan, a schedule, or step-by-step instructions
        — Just Another Friend doesn't provide those, for anyone's specific
        situation, ever. This page is about which general risk factors
        make medical supervision meaningfully safer, so you can make an
        informed call, ideally with a doctor.
      </div>

      <h2>What tends to make home detox riskier</h2>
      <ul>
        <li>A history of seizures, or seizures during a previous attempt to stop.</li>
        <li>Heart conditions, or taking medications that affect heart rhythm.</li>
        <li>Being pregnant.</li>
        <li>Using other substances alongside 7-OH/kratom, especially alcohol, benzodiazepines, or other opioids — combining withdrawal from multiple substances is meaningfully more dangerous than either alone.</li>
        <li>A history of severe dehydration or inability to keep fluids down during withdrawal.</li>
        <li>Living alone with no one checking in, if symptoms could become severe.</li>
      </ul>
      <p>
        If any of those apply to you, that's a real reason to talk to a
        doctor before you stop — not because home detox is impossible, but
        because the risk profile is different enough that it's worth a
        professional's input on your specific situation.
      </p>

      <h2>What actually helps, generally</h2>
      <p>
        Hydration (see{" "}
        <Link href="/resources/hydration-nutrition">Hydration &amp;
        nutrition</Link>), having someone who knows what's happening and
        can check on you, and knowing the warning signs that mean "get help
        now" ahead of time rather than trying to figure it out mid-crisis —
        see <Link href="/safety">Safety page</Link> for that exact list.
        Peer support — knowing what to expect and that it's temporary — is
        also something people consistently describe as genuinely helping;
        that's the actual reason this community exists.
      </p>

      <h2>When medical detox is the safer call</h2>
      <p>
        If several of the risk factors above apply, or if a previous
        attempt to stop went badly, medically supervised detox — where
        vitals are monitored and complications can be treated immediately
        — is a real option worth discussing with a doctor, not a sign that
        home detox "failed" or that you did something wrong. See{" "}
        <Link href="/resources/paying-for-treatment">Paying for
        treatment</Link> for how coverage for that tends to work.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
