import type { Metadata } from "next";
import Link from "next/link";
import { createRouteClient } from "@/lib/supabase/route";

export const metadata: Metadata = {
  title: "News & Legal Updates",
  description:
    "Recent news on 7-OH and kratom legality, bans, and scheduling — refreshed automatically every day from public news sources.",
};

// Render per-request rather than at build time -- this reads from Supabase,
// which needs live env vars that aren't available during a static build.
export const dynamic = "force-dynamic";

type NewsItem = { id: string; title: string; url: string; source: string | null; published_at: string | null };

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function UpdatesPage() {
  const supabase = createRouteClient();
  const { data: items } = await supabase
    .from("news_items")
    .select("id, title, url, source, published_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(50);

  const news = (items || []) as NewsItem[];

  return (
    <main className="section content-page">
      <span className="eyebrow">Stay informed</span>
      <h1>News &amp; legal updates</h1>
      <p className="lede">
        7-OH and kratom law is changing fast — state bans, DEA scheduling,
        court challenges. This list pulls real headlines from public news
        sources automatically, once a day. Nobody on this team writes or
        edits these — we don&apos;t vet, endorse, or fact-check any
        individual article, so read with the same judgment you&apos;d use
        anywhere else. For what this actually means for you personally,
        talk to a doctor — see the <Link href="/safety">Safety page</Link>.
      </p>

      {news.length === 0 ? (
        <p className="muted">
          Nothing fetched yet — this list fills in on the next daily refresh.
        </p>
      ) : (
        <div style={{ marginTop: 8 }}>
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              style={{ display: "block", marginBottom: 10 }}
            >
              <h2 style={{ fontSize: 16 }}>{item.title}</h2>
              <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                {[item.source, formatDate(item.published_at)].filter(Boolean).join(" · ") || "External source"}
              </p>
            </a>
          ))}
        </div>
      )}

      <Link href="/resources" className="back-link">
        ← Back to Resources
      </Link>
    </main>
  );
}
