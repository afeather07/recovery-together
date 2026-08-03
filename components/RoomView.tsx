"use client";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; nickname: string; avatar_seed: string };
type ReplyRow = { id: string; post_id: string; author_id: string; body: string; created_at: string };
type PostRow = { id: string; room_id: string; author_id: string; body: string; created_at: string };

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
    await supabase.from("posts").insert({ room_id: room.id, author_id: userId, body });
  }

  async function submitReply(postId: string) {
    if (!userId) return;
    const body = (replyDraft[postId] || "").trim();
    if (!body) return;
    setReplyDraft((prev) => ({ ...prev, [postId]: "" }));
    await supabase.from("replies").insert({ post_id: postId, author_id: userId, body });
  }

  async function report(targetType: "post" | "reply", targetId: string) {
    if (!userId) return;
    await supabase.from("reports").insert({ reporter_id: userId, target_type: targetType, target_id: targetId, reason: "user_reported" });
    setNotice("Reported. A moderator will review this.");
    setTimeout(() => setNotice(""), 3000);
  }

  if (loading) return <main className="section">Loading room…</main>;
  if (!room) return <main className="section">Room not found. <a href="/">Go back</a>.</main>;

  return (
    <main className="section" style={{ maxWidth: 640, margin: "0 auto" }}>
      <span className="eyebrow">{room.stage_label}</span>
      <h1>{room.name}</h1>
      {notice && <p style={{ color: "var(--accent)" }}>{notice}</p>}

      <div className="chat-card" style={{ marginTop: 16 }}>
        <div className="messages">
          {posts.length === 0 && <p style={{ color: "var(--muted)" }}>No posts yet. Be the first to check in.</p>}
          {posts.map((post) => (
            <div key={post.id} style={{ borderBottom: "1px solid #eee", paddingBottom: 12 }}>
              <div className="message">
                <span className="avatar">{profiles[post.author_id]?.avatar_seed || "?"}</span>
                <div style={{ flex: 1 }}>
                  <strong>{profiles[post.author_id]?.nickname || "Someone"}</strong>
                  <p>{post.body}</p>
                  <button
                    onClick={() => report("post", post.id)}
                    style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                  >
                    Report
                  </button>
                </div>
              </div>

              <div style={{ marginLeft: 38, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                {replies.filter((r) => r.post_id === post.id).map((reply) => (
                  <div className="message" key={reply.id}>
                    <span className="avatar">{profiles[reply.author_id]?.avatar_seed || "?"}</span>
                    <div style={{ flex: 1 }}>
                      <strong>{profiles[reply.author_id]?.nickname || "Someone"}</strong>
                      <p>{reply.body}</p>
                      <button
                        onClick={() => report("reply", reply.id)}
                        style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: 0 }}
                      >
                        Report
                      </button>
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
      </div>
    </main>
  );
}
