import Link from "next/link";
import OnboardingDialog from "@/components/OnboardingDialog";

export default function MarketingHome() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Recovery Together home">
          <span className="brand-mark">RT</span>
          <span>Recovery Together</span>
        </a>
        <Link className="header-link" href="/safety">Safety</Link>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow">Peer support for 7-OH recovery</div>
          <h1>You do not have to go through this alone.</h1>
          <p className="hero-copy">
            Join a calm, anonymous community of people preparing to stop, currently
            stopping, or recovering from 7-OH and concentrated kratom products.
          </p>
          <div className="hero-actions">
            <OnboardingDialog />
            <a className="secondary-btn" href="#how-it-works">How it works</a>
          </div>
          <p className="microcopy">No medical claims. No judgment. Minimum personal information.</p>
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

        <section className="section safety" id="safety">
          <div className="safety-icon">!</div>
          <div>
            <span className="eyebrow">Important</span>
            <h2>This is peer support, not medical detox.</h2>
            <p>
              Recovery Together does not diagnose, prescribe, provide taper instructions,
              or replace professional treatment. If you cannot stay safe, are severely
              dehydrated, have chest pain, trouble breathing, confusion, a seizure, or
              another emergency, call emergency services now. <Link href="/safety">See all resources.</Link>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <span>Recovery Together</span>
        <span>Built for connection, not medical treatment.</span>
      </footer>
    </>
  );
}
