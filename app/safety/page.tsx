export default function SafetyPage() {
  return (
    <main className="section" style={{ maxWidth: 640, margin: "0 auto" }}>
      <span className="eyebrow">Safety resources</span>
      <h1>If you need help right now</h1>

      <div className="section safety" style={{ marginLeft: 0, marginTop: 16 }}>
        <div className="safety-icon">!</div>
        <div>
          <h2>Emergency</h2>
          <p>If you have chest pain, trouble breathing, a seizure, confusion, cannot
          keep fluids down, or cannot stay safe: call <strong>911</strong> (US) or your
          local emergency number now.</p>
        </div>
      </div>

      <h2 style={{ marginTop: 28 }}>Crisis and emotional support</h2>
      <p><strong>988 Suicide &amp; Crisis Lifeline</strong> — call or text <strong>988</strong> (US), available 24/7.</p>
      <p><strong>Crisis Text Line</strong> — text <strong>HOME</strong> to <strong>741741</strong> (US).</p>

      <h2 style={{ marginTop: 28 }}>Substance use support</h2>
      <p><strong>SAMHSA National Helpline</strong> — <strong>1-800-662-4357</strong>, free, confidential, 24/7, English and Spanish.</p>
      <p><strong>Poison Control</strong> — <strong>1-800-222-1222</strong>.</p>

      <h2 style={{ marginTop: 28 }}>What Recovery Together is not</h2>
      <p>
        This platform is peer support only. It is not a detox provider, medical
        treatment, individualized medical advice, or a tapering service. It does not
        guarantee that stopping at home is safe for you specifically. If you are
        planning to stop and have a history of seizures, heart conditions, are
        pregnant, or use other substances alongside 7-OH, talk to a doctor before you
        stop.
      </p>
    </main>
  );
}
