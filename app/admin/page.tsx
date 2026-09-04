import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

// Constant-time comparison via fixed-length hashes -- avoids both a
// straight-length short-circuit and a variable-time character comparison.
// Fixed 2026-08-03 (see PROJECT_LOG.md); was a plain === before.
function safeEqual(a: string, b: string) {
  const ah = crypto.createHash("sha256").update(a).digest();
  const bh = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ah, bh);
}

// Re-verifies the admin key server-side on every moderation action -- the
// page-level gate above only protects the initial render, not a form POST.
function requireAdminKey(key: FormDataEntryValue | null) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || typeof key !== "string" || !safeEqual(key, expected)) {
    throw new Error("unauthorized");
  }
}

async function dismissReport(formData: FormData) {
  "use server";
  const key = formData.get("key");
  requireAdminKey(key);
  const reportId = formData.get("report_id") as string;
  const admin = createAdminClient();
  await admin.from("reports").update({ status: "dismissed" }).eq("id", reportId);
  redirect(`/admin?key=${encodeURIComponent(key as string)}`);
}

async function removeReportedContent(formData: FormData) {
  "use server";
  const key = formData.get("key");
  requireAdminKey(key);
  const reportId = formData.get("report_id") as string;
  const targetType = formData.get("target_type") as string;
  const targetId = formData.get("target_id") as string;
  const admin = createAdminClient();
  const table = targetType === "post" ? "posts" : "replies";
  await admin.from(table).delete().eq("id", targetId);
  await admin.from("reports").update({ status: "reviewed" }).eq("id", reportId);
  redirect(`/admin?key=${encodeURIComponent(key as string)}`);
}

// Minimal, password-gated moderation view. Not linked from the public site.
// Set ADMIN_KEY in your environment and visit /admin?key=YOUR_KEY
export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const key = searchParams.key;
  const expected = process.env.ADMIN_KEY;

  if (!expected || !key || !safeEqual(key, expected)) {
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
          {r.reason && <p><strong>Reporter said:</strong> {r.reason}</p>}
          <p style={{ fontSize: 12, color: "var(--muted)" }}>author_id: {r.content?.author_id}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <form action={dismissReport}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="report_id" value={r.id} />
              <button className="secondary-btn" type="submit">Dismiss (nothing wrong)</button>
            </form>
            <form action={removeReportedContent}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="report_id" value={r.id} />
              <input type="hidden" name="target_type" value={r.target_type} />
              <input type="hidden" name="target_id" value={r.target_id} />
              <button
                type="submit"
                style={{ background: "none", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 600 }}
              >
                Delete content
              </button>
            </form>
          </div>
        </div>
      ))}
    </main>
  );
}
