import Link from "next/link";
import type { Metadata } from "next";
import EduBadge from "@/components/EduBadge";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "7-OH Withdrawal: What It Is and What to Expect",
  description:
    "A plain-language explanation of 7-OH (7-hydroxymitragynine) withdrawal — what it is, commonly reported symptoms, and where to find peer support. Not medical advice.",
  alternates: {
    canonical: `${SITE_URL}/7oh-withdrawal`,
  },
};

export default function SevenOHWithdrawalPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Recovery Library</span>
      <h1>7-OH Withdrawal: What It Is and What to Expect</h1>
      <EduBadge />
      <p className="lede">
        If you&apos;re here because you&apos;re stopping — or thinking about
        stopping — 7-OH, this page is a plain-language starting point. It
        won&apos;t tell you exactly what will happen to you specifically,
        because nobody honestly can. It will tell you what&apos;s commonly
        reported, and where to go from here.
      </p>

      <h2>What is 7-OH?</h2>
      <p>
        7-hydroxymitragynine (7-OH) is an alkaloid found in the kratom
        plant. The products most associated with dependence and withdrawal
        aren&apos;t traditional kratom leaf — they&apos;re concentrated or
        chemically enhanced extracts engineered to contain far more 7-OH
        than occurs naturally. These concentrated products bind strongly to
        opioid receptors, which is why regular use can lead to physical
        dependence, and why stopping can produce withdrawal. See{" "}
        <Link href="/resources/is-7-oh-the-same-as-kratom">Is 7-OH the
        same as kratom?</Link> for more on that distinction.
      </p>

      <h2>Commonly reported withdrawal symptoms</h2>
      <p>
        Reported experiences vary a lot from person to person, and depend
        on how much and how long someone was using. There is no guaranteed
        timeline, and this list isn&apos;t a prediction of what you
        specifically will experience. That said, people commonly describe:
      </p>
      <ul>
        <li>Restlessness, anxiety, and trouble sitting still</li>
        <li>Muscle aches, sweating, and a runny nose</li>
        <li>Nausea, low appetite, and stomach upset</li>
        <li>Disrupted or absent sleep</li>
        <li>Irritability and low mood</li>
        <li>Cravings that come in waves rather than staying constant</li>
      </ul>
      <p>
        Many people describe these as most intense in the first few days,
        easing gradually after that — but "easing gradually" can still mean
        weeks, not days, especially for sleep, mood, and cravings. For a
        more detailed, day-by-day picture of how this commonly unfolds, see{" "}
        <Link href="/resources/withdrawal-timeline">What withdrawal can
        look like</Link>.
      </p>

      <div className="disclaimer">
        <strong>This is not a guaranteed timeline, and this is not medical
        advice.</strong> Severe dehydration, chest pain, trouble breathing,
        confusion, a seizure, or feeling unable to keep yourself safe are
        reasons to get emergency medical help immediately — see the{" "}
        <Link href="/safety">Safety page</Link> for the full list. If you
        have a history of seizures, heart conditions, are pregnant, or use
        other substances alongside 7-OH, talk to a doctor before you stop.
      </div>

      <h2>What actually helps, according to the people going through it</h2>
      <p>
        Hydration, a consistent wake time even after a bad night, small
        amounts of bland food when eating feels impossible, and — reported
        consistently by people in this community — simply not being alone
        with it. Isolation tends to make every part of withdrawal feel
        worse. See <Link href="/resources">the full Recovery Library</Link>{" "}
        for specific guidance on sleep, hydration, anxiety, and more.
      </p>

      <h2>Peer support, not medical treatment</h2>
      <p>
        Just Another Friend is a free, anonymous peer-support community —
        not a detox provider, not medical treatment, not a tapering
        service, and not a guarantee that stopping at home is safe for you
        specifically. What it offers is real people, organized by where
        they actually are in the process, so you don&apos;t have to
        figure this out completely alone.
      </p>

      <div className="callout">
        Wherever you are right now — still using and thinking about
        stopping, in the middle of withdrawal, or further along —{" "}
        <Link href="/explore">there&apos;s a room organized around exactly
        that stage</Link>. It&apos;s free, anonymous, and takes under a
        minute to join.
      </div>

      <p>
        Not ready to join yet? <Link href="/start-here">Start Here</Link>{" "}
        answers the questions most people have before their first visit.
      </p>

      <h2>Sources</h2>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        General symptom patterns referenced above are consistent with
        reporting from clinical and public-health sources covering
        7-hydroxymitragynine, including case reports on 7-OH withdrawal
        management published via the International Society of Substance
        Use Professionals, and public health advisories from state health
        departments (e.g. Texas DSHS) on 7-OH-associated health risks. This
        page summarizes commonly reported patterns in plain language; it
        does not replace reading primary clinical sources or talking to a
        doctor about your own situation.
      </p>

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
