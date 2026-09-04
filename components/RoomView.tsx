"use client";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; nickname: string; avatar_seed: string };
type ReplyRow = { id: string; post_id: string; author_id: string; body: string; created_at: string };
type PostRow = { id: string; room_id: string; author_id: string; body: string; created_at: string };

const EPOCH = "1970-01-01T00:00:00Z";

function ReportForm({
  reason,
  setReason,
  onSubmit,
  onCancel,
}: {
  reason: string;
  setReason: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        placeholder="What's wrong with this? (optional, helps a moderator triage it)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        style={{ flex: 1, minWidth: 200, padding: "6px 10px", borderRadius: 8, border: "1px solid var(--muted)", fontSize: 13 }}
      />
      <button className="secondary-btn" onClick={onSubmit} style={{ padding: "6px 10px" }}>
        Send report
      </button>
      <button className="link-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export default function RoomView({ slug }: { slug: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [room, setRoom] = useState<{ id: string; name: string; stage_label: string } | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [replies, setReplies] = useState<ReplyRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [draft, setDraft] = useState("");
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");
  const [reporting, setReporting] = useState<{ targetType: "post" | "reply"; targetId: string } | null>(null);
  const [reportReason, setReportReason] = useState("");
  // Snapshot of "when I was last actually here," captured before this visit
  // overwrites it below -- lets a crowded room highlight exactly which of my
  // posts got a reply since then, instead of making someone scan everything.
  const [seenBefore, setSeenBefore] = useState<string | null>(null);
  const [jumpIndex, setJumpIndex] = useState(0);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        window.location.href = "/";
        return;
      }
      setUserId(userData.user.id);

      const { data: roomRow } = await supabase
        .from("rooms")
        .select("id, name, stage_label")
        .eq("slug", slug)
        .single();
      if (!roomRow) {
        setLoading(false);
        return;
      }
      setRoom(roomRow);

      const { data: postRows } = await supabase
        .from("posts")
        .select("*")
        .eq("room_id", roomRow.id)
        .order("created_at", { ascending: true });
      setPosts(postRows || []);

      const postIds = (postRows || []).map((p) => p.id);
      const { data: replyRows } = postIds.length
        ? await supabase.from("replies").select("*").in("post_id", postIds).order("created_at", { ascending: true })
        : { data: [] as ReplyRow[] };
      setReplies(replyRows || []);

      const authorIds = Array.from(
        new Set([...(postRows || []).map((p) => p.author_id), ...(replyRows || []).map((r) => r.author_id)])
      );
      if (authorIds.length) {
        const { data: profileRows } = await supabase
          .from("profiles")
          .select("id, nickname, avatar_seed")
          .in("id", authorIds);
        const map: Record<string, Profile> = {};
        (profileRows || []).forEach((p) => (map[p.id] = p));
        setProfiles(map);
      }

      setLoading(false);

      // Read the previous visit before overwriting it -- this is the
      // baseline "New reply" highlighting compares against below.
      const { data: existingVisit } = await supabase
        .from("room_visits")
        .select("last_seen_at")
        .eq("user_id", userData.user.id)
        .eq("room_id", roomRow.id)
        .maybeSingle();
      setSeenBefore(existingVisit?.last_seen_at || EPOCH);

      // Record this visit so a return trip to the home screen can compute
      // "N new replies since you were last here" for this room.
      supabase
        .from("room_visits")
        .upsert({ user_id: userData.user.id, room_id: roomRow.id, last_seen_at: new Date().toISOString() });

      channel = supabase
        .channel(`room-${roomRow.id}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "posts", filter: `room_id=eq.${roomRow.id}` },
          async (payload) => {
            const newPost = payload.new as PostRow;
            setPosts((prev) => (prev.some((p) => p.id === newPost.id) ? prev : [...prev, newPost]));
            await ensureProfile(newPost.author_id);
          }
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "replies" },
          async (payload) => {
            const newReply = payload.new as ReplyRow;
            setReplies((prev) => (prev.some((r) => r.id === newReply.id) ? prev : [...prev, newReply]));
            await ensureProfile(newReply.author_id);
          }
        )
        .subscribe();
    }

    async function ensureProfile(id: string) {
      setProfiles((prev) => {
        if (prev[id]) return prev;
        return prev;
      });
      const { data } = await supabase.from("profiles").select("id, nickname, avatar_seed").eq("id", id).single();
      if (data) setProfiles((prev) => ({ ...prev, [id]: data }));
    }

    load();
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [slug, supabase]);

  async function submitPost() {
    if (!userId || !draft.trim() || !room) return;
    const body = draft.trim();
    setDraft("");

    // Detect a first-ever post (across all rooms) so we can offer the
    // one-time, optional "notify me by email" upgrade right after -- never
    // at first-time entry, only once someone has already gotten value.
    const { count } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("author_id", userId);
    const isFirstPost = (count || 0) === 0;

    await supabase.from("posts").insert({ room_id: room.id, author_id: userId, body });
    if (isFirstPost) setShowEmailPrompt(true);
  }

  async function saveNotifyEmail() {
    if (!userId) return;
    const email = emailDraft.trim();
    setShowEmailPrompt(false);
    if (!email) return;
    await supabase.from("profile_private").update({ notify_email: email }).eq("id", userId);
    setNotice("Saved. We'll email you if someone replies here.");
    setTimeout(() => setNotice(""), 4000);
  }

  async function submitReply(postId: string) {
    if (!userId) return;
    const body = (replyDraft[postId] || "").trim();
    if (!body) return;
    setReplyDraft((prev) => ({ ...prev, [postId]: "" }));
    await supabase.from("replies").insert({ post_id: postId, author_id: userId, body });
  }

  async function submitReport() {
    if (!userId || !reporting) return;
    // Reason is invited, not forced -- someone reporting something urgent
    // shouldn't be blocked behind a required field, but a short "why"
    // lets a moderator triage severity instead of one undifferentiated
    // queue (a specific, named gap in comparable apps' own user reviews).
    await supabase.from("reports").insert({
      reporter_id: userId,
      target_type: reporting.targetType,
      target_id: reporting.targetId,
      reason: reportReason.trim() || null,
    });
    setReporting(null);
    setReportReason("");
    setNotice("Reported. A real person reviews every report — thank you for flagging it.");
    setTimeout(() => setNotice(""), 4000);
  }

  async function deletePost(postId: string) {
    if (!confirm("Delete this check-in? This can't be undone.")) return;
    await supabase.from("posts").delete().eq("id", postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  async function deleteReply(replyId: string) {
    if (!confirm("Delete this reply? This can't be undone.")) return;
    await supabase.from("replies").delete().eq("id", replyId);
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
  }

  // Posts of mine that got a reply since my last visit here -- the thing
  // Aaron flagged: in a crowded room these are otherwise indistinguishable
  // from every other post, so scanning for "did anyone answer me" doesn't
  // scale. Ordered by post position so "jump to next" moves top to bottom.
  const myUnreadPostIds = seenBefore
    ? posts
        .filter(
          (p) =>
            p.author_id === userId &&
            replies.some((r) => r.post_id === p.id && r.author_id !== userId && r.created_at > seenBefore)
        )
        .map((p) => p.id)
    : [];

  function jumpToUnread() {
    if (!myUnreadPostIds.length) return;
    const targetId = myUnreadPostIds[jumpIndex % myUnreadPostIds.length];
    document.getElementById(`post-${targetId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    setJumpIndex((i) => (i + 1) % myUnreadPostIds.length);
  }

  if (loading) return <main className="section">Loading room…</main>;
  if (!room) return <main className="section">Room not found. <a href="/">Go back</a>.</main>;

  return (
    <main className="section" style={{ maxWidth: 640, margin: "0 auto" }}>
      <span className="eyebrow">{room.stage_label}</span>
      <h1>{room.name}</h1>
      {notice && <p style={{ color: "var(--accent)" }}>{notice}</p>}

      {myUnreadPostIds.length > 0 && (
        <button
          onClick={jumpToUnread}
          className="primary-btn full"
          style={{ position: "sticky", top: 8, zIndex: 5, marginTop: 12 }}
        >
          {myUnreadPostIds.length === 1
            ? "Someone replied to you ↓"
            : `${myUnreadPostIds.length} new replies to you ↓ (${(jumpIndex % myUnreadPostIds.length) + 1}/${myUnreadPostIds.length})`}
        </button>
      )}

      <div className="chat-card" style={{ marginTop: 16 }}>
        <div className="messages">
          {posts.length === 0 && <p style={{ color: "var(--muted)" }}>No posts yet. Be the first to check in.</p>}
          {posts.map((post) => (
            <div
              key={post.id}
              id={`post-${post.id}`}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: 12,
                ...(myUnreadPostIds.includes(post.id)
                  ? { background: "var(--accent-soft, #eef6f2)", borderLeft: "3px solid var(--accent)", paddingLeft: 9, marginLeft: -12, paddingTop: 8 }
                  : {}),
              }}
            >
              <div className="message">
                <span className="avatar">{profiles[post.author_id]?.avatar_seed || "?"}</span>
                <div style={{ flex: 1 }}>
                  <strong>{profiles[post.author_id]?.nickname || "Someone"}</strong>
                  <p>{post.body}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {post.author_id === userId ? (
                      <button
                        onClick={() => deletePost(post.id)}
                        style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => { setReporting({ targetType: "post", targetId: post.id }); setReportReason(""); }}
                        style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                      >
                        Report
                      </button>
                    )}
                  </div>
                  {reporting?.targetType === "post" && reporting.targetId === post.id && (
                    <ReportForm reason={reportReason} setReason={setReportReason} onSubmit={submitReport} onCancel={() => setReporting(null)} />
                  )}
                </div>
              </div>

              <div style={{ marginLeft: 38, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                {replies.filter((r) => r.post_id === post.id).map((reply) => (
                  <div className="message" key={reply.id}>
                    <span className="avatar">{profiles[reply.author_id]?.avatar_seed || "?"}</span>
                    <div style={{ flex: 1 }}>
                      <strong>{profiles[reply.author_id]?.nickname || "Someone"}</strong>
                      <p>{reply.body}</p>
                      {reply.author_id === userId ? (
                        <button
                          onClick={() => deleteReply(reply.id)}
                          style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => { setReporting({ targetType: "reply", targetId: reply.id }); setReportReason(""); }}
                          style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                        >
                          Report
                        </button>
                      )}
                      {reporting?.targetType === "reply" && reporting.targetId === reply.id && (
                        <ReportForm reason={reportReason} setReason={setReportReason} onSubmit={submitReport} onCancel={() => setReporting(null)} />
                      )}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    placeholder="Reply..."
                    value={replyDraft[post.id] || ""}
                    onChange={(e) => setReplyDraft((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && submitReply(post.id)}
                  />
                  <button className="secondary-btn" onClick={() => submitReply(post.id)}>Send</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <textarea
          rows={3}
          placeholder="Check in with this room..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="primary-btn" onClick={submitPost}>Post</button>
        <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, textAlign: "center" }}>
          In crisis right now?{" "}
          <a href="/safety" style={{ color: "var(--danger)", fontWeight: 600 }}>
            Call/text 988, or see all safety resources
          </a>
        </p>
      </div>

      {showEmailPrompt && (
        <div className="stage-confirm" style={{ marginTop: 16 }}>
          <p>
            Want us to email you if someone replies? Totally optional -- we'll never
            require this or share it.
          </p>
          <div className="stage-confirm-actions">
            <input
              type="email"
              placeholder="you@example.com"
              value={emailDraft}
              onChange={(e) => setEmailDraft(e.target.value)}
              style={{ flex: 1, minWidth: 180, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--muted)" }}
            />
            <button className="secondary-btn" onClick={saveNotifyEmail}>Save</button>
            <button className="link-btn" onClick={() => setShowEmailPrompt(false)}>No thanks</button>
          </div>
        </div>
      )}
    </main>
  );
}
