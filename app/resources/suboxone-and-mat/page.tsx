import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";

export const metadata: Metadata = {
  title: "Suboxone and medication-assisted treatment: what to ask your doctor",
  description: "What medication-assisted treatment (like Suboxone) is, in plain terms, and the questions worth bringing to a doctor -- not a recommendation to take anything.",
};

export default function SuboxoneAndMatPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Resources</span>
      <h1>Suboxone and medication-assisted treatment</h1>
      <EduBadge />
      <p className="lede">
        This page explains what MAT is in plain terms and gives you
        questions to bring to a doctor. It does not tell you whether to
        take anything, what dose, or how to taper — that&apos;s exactly
        the kind of decision a doctor needs to be involved in, not a
        website.
      </p>

      <div className="disclaimer">
        Just Another Friend does not prescribe, dose, or provide taper
        instructions for any medication, including Suboxone. If you want
        to explore MAT, the next real step is a conversation with a
        doctor or an addiction medicine provider — not a plan from here.
      </div>

      <h2>What MAT actually is</h2>
      <p>
        Medication-assisted treatment (MAT) uses FDA-approved medication,
        usually alongside counseling, to treat opioid-pattern dependence.
        The most commonly discussed options are buprenorphine (often sold
        as Suboxone, combined with naloxone), methadone, and naltrexone —
        each works differently and has different requirements for who can
        prescribe it and where you get it.
      </p>

      <h2>Why people ask about it for 7-OH/kratom specifically</h2>
      <p>
        Because concentrated 7-OH and related compounds act on the same
        opioid receptors as other opioids (see{" "}
        <Link href="/resources/is-7-oh-an-opioid">Is 7-OH an opioid?</Link>),
        some people find the same medications used for opioid use disorder
        relevant to their situation too. Whether that&apos;s actually a fit
        for you specifically is a real medical question, not something a
        general page can answer.
      </p>

      <h2>Questions worth bringing to a doctor</h2>
      <ul>
        <li>Is MAT something that could help with what I&apos;ve been taking specifically?</li>
        <li>What would starting it actually look like, day to day?</li>
        <li>Are there interactions with anything else I&apos;m taking?</li>
        <li>How long do people typically stay on it, and what does coming off it look like, if that&apos;s ever the goal?</li>
        <li>What does it cost, and is it covered by my insurance — see{" "}
          <Link href="/resources/paying-for-treatment">Paying for treatment</Link>.</li>
      </ul>

      <h2>Finding a prescriber</h2>
      <p>
        Buprenorphine no longer requires the old special federal waiver for
        most prescribers, which has made it more available through regular
        primary care in many areas — worth specifically asking a primary
        care doctor if they prescribe it before assuming you need a
        specialist. SAMHSA&apos;s free treatment locator
        (findtreatment.gov) can help find a nearby provider; that&apos;s a
        neutral government tool, not something Just Another Friend is
        affiliated with.
      </p>

      <div className="callout">
        Whatever you decide about medication, this room is still here
        either way. <Link href="/explore">Find your room.</Link>
      </div>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
