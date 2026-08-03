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

  function open() {
    setReady(false);
    setError("");
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
      const { data: signInData, error: signInError } =
        await supabase.auth.signInAnonymously();
      if (signInError || !signInData.user) throw signInError;

      const userId = signInData.user.id;
      const finalNickname = nickname.trim() || "Anonymous";

      await supabase.from("profiles").upsert({
        id: userId,
        nickname: finalNickname,
        avatar_seed: finalNickname.slice(0, 1).toUpperCase(),
        stage,
        support_need: supportNeed,
      });
      await supabase.from("profile_private").upsert({
        id: userId,
        reveal_identity: false,
      });

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

          <div className="grid-2">
            <label>
              Nickname
              <input
                type="text"
                placeholder="Anonymous is fine"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </label>
            <label>
              Current stage
              <select value={stage} onChange={(e) => setStage(e.target.value)}>
                {STAGE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

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
