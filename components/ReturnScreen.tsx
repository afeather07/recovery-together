"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { STAGE_OPTIONS, STAGE_TO_SLUG } from "@/lib/stages";

type RoomInfo = { id: string; slug: string; name: string; stage_label: string };
type JourneyRoom = RoomInfo & { unread: number; isCurrent: boolean };

const EPOCH = "1970-01-01T00:00:00Z";
const STAGE_RECONFIRM_DAYS = 2;

export default function ReturnScreen({ onNoSession }: { onNoSession: () => void }) {
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const [stage, setStage] = useState("");
  const [showStagePrompt, setShowStagePrompt] = useState(false);
  const [daysSinceCheckIn, setDaysSinceCheckIn] = useState(0);
  const [journeyRooms, setJourneyRooms] = useState<JourneyRoom[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user?.id;
      if (!uid) {
        onNoSession();
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname, stage, stage_updated_at")
        .eq("id", uid)
        .single();

      if (!profile) {
        // Session exists but onboarding was never completed -- treat as new.
        onNoSession();
        return;
      }

      setUserId(uid);
      setNickname(profile.nickname || "Anonymous");
      setStage(profile.stage);

      const days = Math.floor(
        (Date.now() - new Date(profile.stage_updated_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      setDaysSinceCheckIn(days);
      setShowStagePrompt(days >= STAGE_RECONFIRM_DAYS);

      const { data: myPosts } = await supabase
        .from("posts")
        .select("id, room_id")
        .eq("author_id", uid);

      const { data: visits } = await supabase
        .from("room_visits")
        .select("room_id, last_seen_at")
        .eq("user_id", uid);

      const lastSeenByRoom: Record<string, string> = {};
      (visits || []).forEach((v) => (lastSeenByRoom[v.room_id] = v.last_seen_at));

      const myPostIds = (myPosts || []).map((p) => p.id);
      const postIdToRoom: Record<string, string> = {};
      (myPosts || []).forEach((p) => (postIdToRoom[p.id] = p.room_id));

      const { data: repliesToMe } = myPostIds.length
        ? await supabase
            .from("replies")
            .select("post_id, author_id, created_at")
            .in("post_id", myPostIds)
            .neq("author_id", uid)
        : { data: [] as { post_id: string; author_id: string; created_at: string }[] };

      const unreadByRoom: Record<string, number> = {};
      (repliesToMe || []).forEach((r) => {
        const roomId = postIdToRoom[r.post_id];
        if (!roomId) return;
        const lastSeen = lastSeenByRoom[roomId] || EPOCH;
        if (r.created_at > lastSeen) {
          unreadByRoom[roomId] = (unreadByRoom[roomId] || 0) + 1;
        }
      });

      const journeyRoomIds = Array.from(
        new Set([...(myPosts || []).map((p) => p.room_id), ...Object.keys(lastSeenByRoom)])
      );
      const currentSlug = STAGE_TO_SLUG[profile.stage] || "preparing";

      const { data: roomRows } = journeyRoomIds.length
        ? await supabase.from("rooms").select("id, slug, name, stage_label").in("id", journeyRoomIds)
        : { data: [] as RoomInfo[] };

      let rooms: JourneyRoom[] = (roomRows || []).map((r) => ({
        ...r,
        unread: unreadByRoom[r.id] || 0,
        isCurrent: r.slug === currentSlug,
      }));

      // Make sure the current stage's room is always present, even if the
      // person hasn't posted there yet (e.g. right after a stage change).
      if (!rooms.some((r) => r.isCurrent)) {
        const { data: currentRoomRow } = await supabase
          .from("rooms")
          .select("id, slug, name, stage_label")
          .eq("slug", currentSlug)
          .single();
        if (currentRoomRow) {
          rooms = [{ ...currentRoomRow, unread: 0, isCurrent: true }, ...rooms];
        }
      }

      rooms.sort((a, b) => (a.isCurrent === b.isCurrent ? 0 : a.isCurrent ? -1 : 1));
      setJourneyRooms(rooms);
      setLoading(false);

      // Mark this visit -- doesn't touch stage_updated_at, just "we saw them today."
      supabase.from("profiles").update({ last_active_at: new Date().toISOString() }).eq("id", uid);
    }

    load();
  }, [onNoSession]);

  async function confirmStage(newStage: string) {
    if (!userId) return;
    const supabase = createClient();
    const now = new Date().toISOString();
    await supabase
      .from("profiles")
      .update({ stage: newStage, stage_updated_at: now })
      .eq("id", userId);
    setStage(newStage);
    setShowStagePrompt(false);
  }

  async function startFreshAnonymous() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading) {
    return (
      <main className="return-screen return-screen-loading">
        <p>Loading your room...</p>
      </main>
    );
  }

  const currentRoom = journeyRooms.find((r) => r.isCurrent);
  const pastRooms = journeyRooms.filter((r) => !r.isCurrent);

  return (
    <main className="return-screen">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Recovery Together home">
          <span className="brand-mark">RT</span>
          <span>Recovery Together</span>
        </a>
        <button className="header-link link-btn" onClick={startFreshAnonymous}>
          Not you? Start fresh
        </button>
      </header>

      <section className="hero return-hero">
        <div className="eyebrow">Welcome back</div>
        <h1>Good to see you, {nickname}.</h1>

        {showStagePrompt && (
          <div className="stage-confirm">
            <p>
              It&apos;s been {daysSinceCheckIn} day{daysSinceCheckIn === 1 ? "" : "s"} since you told us
              you were on <strong>{stage}</strong>. Still there, or has it moved?
            </p>
            <div className="stage-confirm-actions">
              <button className="secondary-btn" onClick={() => confirmStage(stage)}>
                Still {stage}
              </button>
              <select
                defaultValue=""
                onChange={(e) => e.target.value && confirmStage(e.target.value)}
              >
                <option value="" disabled>
                  I&apos;m further along...
                </option>
                {STAGE_OPTIONS.filter((s) => s !== stage).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentRoom && (
          <a className="primary-btn full" href={`/rooms/${currentRoom.slug}`}>
            Continue to {currentRoom.name}
          </a>
        )}
      </section>

      {pastRooms.length > 0 && (
        <section className="section past-rooms">
          <div className="section-heading">
            <span className="eyebrow">Your journey so far</span>
            <h2>Rooms you&apos;ve been part of</h2>
          </div>
          <div className="past-room-list">
            {pastRooms.map((r) => (
              <a key={r.id} className="past-room-item" href={`/rooms/${r.slug}`}>
                <span>{r.name}</span>
                {r.unread > 0 && (
                  <span className="unread-badge">
                    {r.unread} new repl{r.unread === 1 ? "y" : "ies"}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
