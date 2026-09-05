"use client";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { STAGE_OPTIONS, STAGE_TO_SLUG } from "@/lib/stages";

export default function OnboardingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [story, setStory] = useState("");
  const [nickname, setNickname] = useState("");
  const [stage, setStage] = useState(STAGE_OPTIONS[0]);
  const [supportNeed, setSupportNeed] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entering, setEntering] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Browser speech-to-text (Chrome, Safari, Edge) -- no server, no cost,
  // nothing sent anywhere until the person chooses to submit. The intake
  // copy already says "speak or type"; this makes that literally true
  // instead of just a textarea with no way to actually speak.
  function toggleListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setStory((prev) => (prev ? prev.trim() + " " : "") + transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  // A suggested nickname so nobody faces a blank field (tap-before-type,
  // research-B rule #1). One tap rerolls; typing over it works too.
  const ADJECTIVES = ["steady", "quiet", "warm", "gentle", "calm", "still", "slow", "soft", "early", "patient"];
  const NOUNS = ["river", "harbor", "willow", "ember", "meadow", "lantern", "dawn", "cedar", "moss", "tide"];
  function suggestNickname() {
    const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${a}${n}`;
  }

  function open() {
    setReady(false);
    setError("");
    if (!nickname.trim()) setNickname(suggestNickname());
    dialogRef.current?.showModal();
  }

  async function buildProfile() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story }),
      });
      const data = await res.json();
      if (nickname.trim()) data.nickname = nickname.trim();
      if (stage) data.stage = stage;
      setStage(data.stage || STAGE_OPTIONS[0]);
      setSupportNeed(data.support_need || "peer support and encouragement");
      if (data.nickname) setNickname(data.nickname);
      setReady(true);
    } catch {
      setError("Something went wrong. You can still pick a stage and continue.");
      setReady(true);
    } finally {
      setLoading(false);
    }
  }

  async function enterRoom() {
    setEntering(true);
    setError("");
    const supabase = createClient();
    try {
      // Reuse an existing session if one already exists instead of always
      // minting a brand-new anonymous identity. Without this, every pass
      // through onboarding forked a returning visitor into a new identity
      // and orphaned their previous posts.
      const { data: existingSession } = await supabase.auth.getSession();
      let userId = existingSession.session?.user?.id ?? null;

      if (!userId) {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInAnonymously();
        if (signInError || !signInData.user) throw signInError;
        userId = signInData.user.id;
      }

      const finalNickname = nickname.trim() || "Anonymous";
      const now = new Date().toISOString();

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        nickname: finalNickname,
        avatar_seed: finalNickname.slice(0, 1).toUpperCase(),
        stage,
        support_need: supportNeed,
        stage_updated_at: now,
        last_active_at: now,
      });
      if (profileError) throw profileError;

      const { error: privateError } = await supabase
        .from("profile_private")
        .upsert({
          id: userId,
          reveal_identity: false,
        });
      if (privateError) throw privateError;

      const slug = STAGE_TO_SLUG[stage] || "preparing";
      window.location.href = `/rooms/${slug}`;
    } catch {
      setError("Could not create your profile. Please try again.");
      setEntering(false);
    }
  }

  return (
    <>
      <button className="primary-btn" onClick={open} id="open-intake">
        Find my group
      </button>

      <dialog ref={dialogRef} id="intake-dialog">
        <form
          method="dialog"
          className="intake"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="modal-dots" aria-hidden="true">
            <span className={!ready ? "active" : ""} />
            <span className={ready ? "active" : ""} />
          </div>
          <div className="dialog-top">
            <div>
              <span className="eyebrow">Find your group</span>
              <h2>What is happening right now?</h2>
            </div>
            <button
              type="button"
              className="close-btn"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>

          <label htmlFor="story">Speak naturally or type a few sentences.</label>
          <textarea
            id="story"
            rows={6}
            placeholder="Example: I am preparing to stop 7-OH tomorrow. I am scared about sleep and I want to talk with people who understand."
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
          {typeof window !== "undefined" &&
            ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) && (
              <button
                type="button"
                onClick={toggleListening}
                className={listening ? "mic-btn listening" : "mic-btn"}
              >
                {listening ? "● Listening… tap to stop" : "🎤 Or tap to speak instead"}
              </button>
            )}

          <div className="field">
            <span className="field-label" id="stage-label">Where are you right now? Tap one.</span>
            <div className="chip-row" role="radiogroup" aria-labelledby="stage-label">
              {STAGE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={stage === s}
                  className={stage === s ? "chip selected" : "chip"}
                  onClick={() => setStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label>
            Nickname — we picked one, change it if you like
            <div className="nickname-row">
              <input
                type="text"
                placeholder="Anonymous is fine"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                type="button"
                className="secondary-btn"
                aria-label="Suggest a different nickname"
                onClick={() => setNickname(suggestNickname())}
              >
                ↻
              </button>
            </div>
          </label>

          {error && <p style={{ color: "var(--danger)", fontSize: 13 }}>{error}</p>}

          {!ready ? (
            <button
              type="button"
              className="primary-btn full"
              onClick={buildProfile}
              disabled={loading || story.trim().length === 0}
            >
              {loading ? "Building..." : "Build my profile"}
            </button>
          ) : (
            <div className="profile-result">
              <span className="eyebrow">Profile ready</span>
              <h3>{nickname || "Anonymous"} · {stage}</h3>
              <p>
                You will be matched with people in the {stage.toLowerCase()} stage
                who are looking for {supportNeed}.
              </p>
              <button
                type="button"
                className="room-btn full"
                onClick={enterRoom}
                disabled={entering}
              >
                {entering ? "Entering..." : "Enter my room"}
              </button>
            </div>
          )}
        </form>
      </dialog>
    </>
  );
}
