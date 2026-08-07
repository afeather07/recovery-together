import Link from "next/link";
import OnboardingDialog from "@/components/OnboardingDialog";

export default function MarketingHome() {
  return (
    <>
      <main id="top">
        <section className="hero">
          <div className="eyebrow">Peer support for 7-OH recovery</div>
          <h1>You do not have to go through this alone.</h1>
          <p className="hero-tagline">
            Sometimes you don&apos;t need another expert. Sometimes you just
            need someone who&apos;s been there.
          </p>
          <p className="hero-copy">
            Join a calm, anonymous community of people preparing to stop, currently
            stopping, or recovering from 7-OH and concentrated kratom products.
          </p>
          <div className="hero-actions">
            <OnboardingDialog />
            <a className="secondary-btn" href="#how-it-works">How it works</a>
          </div>
          <p className="microcopy">No medical claims. No judgment. Minimum personal information.</p>
          <p className="microcopy">
            First time here? <Link href="/start-here">Start Here</Link> for a
            calmer walkthrough.
          </p>
        </section>

        <section className="trust-strip" aria-label="Platform principles">
          <div><strong>Anonymous</strong><span>Use a nickname</span></div>
          <div><strong>Simple</strong><span>Low cognitive load</span></div>
          <div><strong>Human</strong><span>People who understand</span></div>
        </section>

        <section className="section" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">How it works</span>
            <h2>One small step at a time.</h2>
          </div>
          <div className="steps">
            <article>
              <span className="step-number">1</span>
              <h3>Tell us where you are</h3>
              <p>Speak or type. A simple intake turns your story into a basic anonymous profile.</p>
            </article>
            <article>
              <span className="step-number">2</span>
              <h3>Enter the right room</h3>
              <p>Join people preparing, in the first few days, or further into recovery.</p>
            </article>
            <article>
              <span className="step-number">3</span>
              <h3>Stay connected</h3>
              <p>Check in, reply, encourage someone, or simply read when talking feels hard.</p>
            </article>
          </div>
        </section>

        <section className="section room-preview">
          <div>
            <span className="eyebrow">What a room looks like</span>
            <h2>Day 2–3 support room</h2>
            <p>Quiet, structured peer support without pretending to replace medical care.</p>
          </div>
          <div className="chat-card">
            <div className="chat-header">
              <div>
                <strong>Day 2–3</strong>
                <span> An example conversation</span>
              </div>
              <span className="status-dot example-dot">Example</span>
            </div>
            <div className="messages">
              <div className="message">
                <span className="avatar">J</span>
                <div><strong>Jay</strong><p>Hour 38. I finally ate half a banana.</p></div>
              </div>
              <div className="message">
                <span className="avatar">M</span>
                <div><strong>MaybeTomorrow</strong><p>That counts. I'm going to try soup next.</p></div>
              </div>
              <div className="message">
                <span className="avatar">A</span>
                <div><strong>Anonymous</strong><p>I just needed somewhere to say I'm still here.</p></div>
              </div>
            </div>
            <p className="preview-caption">
              This community is brand new — these are example messages showing how a room
              works, not people currently online. If you post, you may be one of the first
              voices here. That&apos;s a real, welcome thing to be.
            </p>
          </div>
        </section>

        <section className="section welcome-section">
          <div className="section-heading">
            <span className="eyebrow">A quick, honest welcome</span>
            <h2>From the founder, and where things stand.</h2>
          </div>

          <div className="founder-note">
            <p className="founder-quote">
              &quot;I built this because I&apos;ve been there — dependent,
              hiding it from everyone, searching Reddit alone at 2am. I know
              what it&apos;s like to feel alone in a room full of people
              going through the same thing.&quot;
            </p>
            <Link href="/founder-story" className="secondary-btn">
              Read the full story →
            </Link>
          </div>

          <p className="welcome-status">
            This community is brand new — there&apos;s no large crowd here
            yet, and we won&apos;t pretend otherwise. The real goal right now
            is simple: be genuinely useful to the first people who find it,
            one honest conversation at a time.
          </p>

          <div className="featured-resources">
            <span className="eyebrow">Start with something useful</span>
            <div className="resource-grid">
              <Link href="/resources/withdrawal-timeline" className="resource-card">
                <h2>What withdrawal can look like</h2>
                <p>A general, non-clinical picture of the first weeks.</p>
              </Link>
              <Link href="/resources/sleep" className="resource-card">
                <h2>Sleep</h2>
                <p>Why it gets so hard early on, and what can help.</p>
              </Link>
              <Link href="/start-here" className="resource-card">
                <h2>New here?</h2>
                <p>Start Here answers the questions you probably have.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="section safety" id="safety">
          <div className="safety-icon">!</div>
          <div>
            <span className="eyebrow">Important</span>
            <h2>This is peer support, not medical detox.</h2>
            <p>
              Just Another Friend does not diagnose, prescribe, provide taper instructions,
              or replace professional treatment. If you cannot stay safe, are severely
              dehydrated, have chest pain, trouble breathing, confusion, a seizure, or
              another emergency, call emergency services now. <Link href="/safety">See all resources.</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
