import { createAdminClient } from "@/lib/supabase/admin";

// Minimal, password-gated moderation view. Not linked from the public site.
// Set ADMIN_KEY in your environment and visit /admin?key=YOUR_KEY
export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const key = searchParams.key;
  const expected = process.env.ADMIN_KEY;

  if (!expected || key !== expected) {
    return (
      <main className="section" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h1>Moderation</h1>
        <form method="GET">
          <label>
            Admin key
            <input type="password" name="key" />
          </label>
          <button className="primary-btn" style={{ marginTop: 12 }}>View reports</button>
        </form>
      </main>
    );
  }

  const admin = createAdminClient();
  const { data: reports } = await admin
    .from("reports")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  const enriched = await Promise.all(
    (reports || []).map(async (r) => {
      const table = r.target_type === "post" ? "posts" : "replies";
      const { data: content } = await admin.from(table).select("body, author_id").eq("id", r.target_id).single();
      return { ...r, content };
    })
  );

  return (
    <main className="section" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1>Open reports ({enriched.length})</h1>
      {enriched.length === 0 && <p>Nothing open. Good.</p>}
      {enriched.map((r) => (
        <div key={r.id} style={{ background: "white", borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            {r.target_type} · reported {new Date(r.created_at).toLocaleString()}
          </p>
          <p><strong>Content:</strong> {r.content?.body || "(not found, may be deleted)"}</p>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>author_id: {r.content?.author_id}</p>
        </div>
      ))}
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        To dismiss or act on a report, use the Supabase table editor for now — this
        view is read-only in the MVP.
      </p>
    </main>
  );
}
