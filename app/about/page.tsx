import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why Just Another Friend exists and how it's run.",
};

export default function AboutPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">About</span>
      <h1>Why Just Another Friend exists</h1>
      <p className="lede">
        Just Another Friend started as a response to a specific gap: people
        preparing to stop, currently stopping, or recovering from 7-OH and
        concentrated kratom products often have nowhere calm and anonymous
        to talk to someone who actually understands what that&apos;s like,
        at 3am, without judgment.
      </p>

      <h2>What this is</h2>
      <p>
        A peer-support community, organized by recovery stage, where you can
        stay anonymous, post and reply, and find real (though currently
        general, non-medical) information about what recovery can look like.
      </p>

      <h2>What this isn&apos;t</h2>
      <p>
        Not a detox provider. Not medical treatment. Not individualized
        medical advice. Not a tapering service. Not a guarantee that
        stopping at home is safe for you specifically. See the{" "}
        <Link href="/safety">Safety page</Link> for what to do if you need
        real medical help.
      </p>

      <h2>Who&apos;s behind it</h2>
      <p>
        Just Another Friend is an independent, solo-founder project, currently
        unfunded and run deliberately lean — see the{" "}
        <Link href="/resources/faq">FAQ</Link> for more on how it&apos;s
        built and paid for. It launched because the need seemed real and
        immediate, not because it was easy. Read the{" "}
        <Link href="/founder-story">founder&apos;s story</Link> for why.
      </p>

      <h2>How the community is kept safe</h2>
      <p>
        Every post and reply can be reported. Reports go to a moderator for
        review. See the <Link href="/community-guidelines">Community
        Guidelines</Link> for what&apos;s expected of everyone here.
      </p>

      <Link href="/contact" className="back-link">
        Get in touch →
      </Link>
    </main>
  );
}
