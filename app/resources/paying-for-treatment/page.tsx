import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Paying for treatment: does insurance cover detox or rehab?",
  description: "How insurance coverage for detox and rehab generally works, and free tools to find covered options -- no specific facility recommendations, no referrals.",
};

export default function PayingForTreatmentPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Paying for treatment</h1>
      <EduBadge />
      <p className="lede">
        General, honest information about how coverage tends to work — not
        a recommendation of any specific facility or provider. Just Another
        Friend doesn&apos;t take money from, or get paid to recommend, any
        treatment center, detox facility, or doctor. If that ever changes,
        it&apos;ll be disclosed here, plainly.
      </p>

      <h2>The short version</h2>
      <p>
        In the US, most health insurance plans — including ACA marketplace
        plans, Medicaid, and Medicare — are legally required to cover
        substance use treatment as an essential health benefit, generally
        at parity with medical/surgical care. That doesn&apos;t mean every
        plan covers every provider or every level of care (like a specific
        inpatient facility) — coverage details vary a lot by plan.
      </p>

      <h2>What&apos;s worth checking with your own insurer</h2>
      <ul>
        <li>Whether outpatient counseling, medication-assisted treatment, and inpatient/residential care are each covered, and at what level.</li>
        <li>Whether a specific facility or provider is in-network — out-of-network care can cost dramatically more, or not be covered at all.</li>
        <li>Whether prior authorization is required before starting treatment.</li>
        <li>What your deductible and out-of-pocket max actually mean for the cost in practice.</li>
      </ul>

      <h2>If you don't have insurance, or aren't sure</h2>
      <p>
        Many states have Medicaid programs that cover substance use
        treatment, and eligibility is often broader than people assume —
        it&apos;s worth actually checking rather than assuming you don&apos;t
        qualify. Community health centers and state-funded treatment
        programs also commonly offer sliding-scale fees based on income.
      </p>

      <h2>Free, neutral tools to find options</h2>
      <p>
        SAMHSA&apos;s treatment locator (findtreatment.gov) and helpline
        (1-800-662-4357) are free, government-run, and don&apos;t take
        payment from treatment providers to rank higher — a genuinely
        neutral place to start looking, rather than a search engine result
        that may be a paid ad. See the{" "}
        <Link href="/safety">Safety page</Link> for that number and others.
      </p>

      <div className="callout">
        Figuring out how to pay for something is its own kind of stressful.{" "}
        <Link href="/explore">This room is still here</Link> whether or not
        you&apos;ve sorted that part out yet.
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
