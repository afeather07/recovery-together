"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [savedNotifyEmail, setSavedNotifyEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user?.id;
      if (!uid) {
        setLoading(false);
        return;
      }
      setUserId(uid);
      setHasSession(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", uid)
        .single();
      if (profile) {
        setNickname(profile.nickname || "");
        setSavedNickname(profile.nickname || "");
      }

      const { data: priv } = await supabase
        .from("profile_private")
        .select("notify_email")
        .eq("id", uid)
        .single();
      if (priv) {
        setNotifyEmail(priv.notify_email || "");
        setSavedNotifyEmail(priv.notify_email || "");
      }

      setLoading(false);
    }

    load();
  }, []);

  function flash(message: string) {
    setNotice(message);
    setTimeout(() => setNotice(""), 4000);
  }

  async function saveNickname() {
    if (!userId) return;
    const trimmed = nickname.trim() || "Anonymous";
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ nickname: trimmed, avatar_seed: trimmed.slice(0, 1).toUpperCase() })
      .eq("id", userId);
    setSavedNickname(trimmed);
    setNickname(trimmed);
    setSaving(false);
    flash("Nickname updated.");
  }

  async function saveNotifyEmail() {
    if (!userId) return;
    const trimmed = notifyEmail.trim();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profile_private").update({ notify_email: trimmed || null }).eq("id", userId);
    setSavedNotifyEmail(trimmed);
    setSaving(false);
    flash(trimmed ? "We'll email you if someone replies." : "Email notifications turned off.");
  }

  async function signOut() {
    if (!confirm("Sign out and start fresh? This creates a brand-new anonymous identity — your current posts stay under your old one, but you'll lose access to it on this device.")) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="section">
        <p className="muted">Loading your settings…</p>
      </main>
    );
  }

  if (!hasSession) {
    return (
      <main className="section content-page">
        <span className="eyebrow">Profile & Settings</span>
        <h1>You haven&apos;t joined yet.</h1>
        <p className="lede">
          There&apos;s nothing to manage until you have a room. It takes under a
          minute and you can stay completely anonymous.
        </p>
        <Link href="/#top" className="primary-btn full">
          Find my group
        </Link>
      </main>
    );
  }

  return (
    <main className="section content-page" style={{ maxWidth: 560 }}>
      <span className="eyebrow">Profile & Settings</span>
      <h1>Your settings</h1>
      <p className="lede">
        Nobody but you can see this page. Nothing here is required.
      </p>

      {notice && <p style={{ color: "var(--accent)", fontWeight: 600 }}>{notice}</p>}

      <div className="stage-confirm" style={{ marginTop: 8 }}>
        <label htmlFor="nickname-input" style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
          Nickname
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            id="nickname-input"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Anonymous"
            style={{ flex: 1, minWidth: 0, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--muted)" }}
          />
          <button
            className="secondary-btn"
            onClick={saveNickname}
            disabled={saving || nickname.trim() === savedNickname}
          >
            Save
          </button>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "8px 0 0" }}>
          This is what other members see on your posts and replies. Never your real name unless you choose to type it here.
        </p>
      </div>

      <div className="stage-confirm" style={{ marginTop: 16 }}>
        <label htmlFor="email-input" style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
          Reply notifications
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            id="email-input"
            type="email"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ flex: 1, minWidth: 180, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--muted)" }}
          />
          <button
            className="secondary-btn"
            onClick={saveNotifyEmail}
            disabled={saving || notifyEmail.trim() === savedNotifyEmail}
          >
            {notifyEmail.trim() ? "Save" : "Turn off"}
          </button>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "8px 0 0" }}>
          Optional. We&apos;ll only ever email you to say someone replied — never the actual message, and this address is never sold, traded, or shared with anyone for any reason. Clear the field and save to turn this off at any time.
        </p>
      </div>

      <div className="stage-confirm" style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Start fresh</p>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 12px" }}>
          Signs you out of this identity on this device. Your existing posts and replies stay exactly as they are — you just won&apos;t be able to get back into this identity from here afterward.
        </p>
        <button className="link-btn" onClick={signOut}>
          Sign out and start a new identity
        </button>
      </div>
    </main>
  );
}
