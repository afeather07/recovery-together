import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Recovery Together collects, why, and how it's protected.",
};

export default function PrivacyPage() {
  return (
    <main className="section content-page">
      <span className="eyebrow">Trust &amp; Safety</span>
      <h1>Privacy Policy</h1>
      <p className="updated">Draft — last reviewed 2026-08-05. Written to accurately describe what this app actually stores, not generic boilerplate.</p>

      <div className="callout">
        The short version: you can use a nickname, real identity is never
        required, and we collect the minimum needed to run the community.
      </div>

      <h2>What we collect</h2>
      <p>When you join, we store:</p>
      <ul>
        <li>A nickname you choose (defaults to &quot;Anonymous&quot;).</li>
        <li>The recovery stage you select.</li>
        <li>What you post and reply, and which room it&apos;s in.</li>
        <li>Which rooms you&apos;ve visited and when, so the site can show you where you left off.</li>
      </ul>
      <p>Optional, and only if you choose to provide it:</p>
      <ul>
        <li>A real name or photo, kept in a separate, private table only you can read — never shown to other members.</li>
        <li>A general location, if you volunteer it.</li>
        <li>An email address, only if you opt in after your first post, used solely to notify you of replies. This is stored separately from your public profile and is never shown to other members.</li>
      </ul>

      <h2>What we don&apos;t collect</h2>
      <p>
        No real name or ID is required to join. No detailed medical history
        is collected. We don&apos;t track you across other websites, and we
        don&apos;t sell or share your data with advertisers.
      </p>

      <h2>Anonymous accounts</h2>
      <p>
        Your account is created through Supabase&apos;s anonymous
        authentication — you get a real account with no email or password
        required. Your posts are linked to that account, not to any
        real-world identity, unless you separately choose to add one.
      </p>

      <h2>AI onboarding (optional feature)</h2>
      <p>
        Onboarding can optionally use Anthropic&apos;s Claude API to turn a
        free-form description into a draft profile. This feature is off by
        default. When it&apos;s on, the text you type is sent to
        Anthropic&apos;s API to generate a draft, which you must confirm
        before anything is saved — nothing is saved automatically. If AI is
        off, or unavailable, a free keyword-matching fallback is used
        instead, and no text leaves our own systems.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-friendly, cookie-free analytics (Vercel Analytics) to
        understand aggregate usage — page visits, not individual tracking
        across other sites.
      </p>

      <h2>Where data lives</h2>
      <p>
        Data is stored in Supabase (a hosted Postgres database) and the app
        runs on Vercel. Row-level security rules restrict what any given
        account can read or write — for example, your real name (if you add
        one) is only ever readable by you, never by other members or by a
        database query that forgot to filter it out.
      </p>

      <h2>Reports</h2>
      <p>
        If you report a post or reply, that report is visible only to
        moderators, never to other members — including the person you
        reported.
      </p>

      <h2>Your choices</h2>
      <p>
        You can stop using the site at any time. Because accounts are
        anonymous by default, there&apos;s no persistent real-world
        identifier tying your activity to you unless you chose to add one.
        If you&apos;d like your data deleted, see <Link href="/contact">Contact</Link>.
      </p>

      <div className="disclaimer">
        This policy is an early, founder-written draft for a newly launched
        product, not final legal counsel-reviewed text. It will be revised
        as the product grows.
      </div>

      <Link href="/terms" className="back-link">
        See Terms of Use →
      </Link>
    </main>
  );
}
