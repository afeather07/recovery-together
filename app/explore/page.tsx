"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type RoomRow = { id: string; slug: string; name: string; stage_label: string; sort_order: number };
type RoomStats = RoomRow & { postCount: number };

export default function ExplorePage() {
  const [rooms, setRooms] = useState<RoomStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        // Browsing needs no onboarding -- a lightweight anonymous session
        // is enough to satisfy RLS (which requires "authenticated", a bar
        // anonymous sign-in clears without creating a profile).
        await supabase.auth.signInAnonymously();
      }

      const { data: roomRows } = await supabase
        .from("rooms")
        .select("id, slug, name, stage_label, sort_order")
        .order("sort_order", { ascending: true });

      const { data: postRows } = await supabase.from("posts").select("room_id");

      const counts: Record<string, number> = {};
      (postRows || []).forEach((p) => {
        counts[p.room_id] = (counts[p.room_id] || 0) + 1;
      });

      setRooms((roomRows || []).map((r) => ({ ...r, postCount: counts[r.id] || 0 })));
      setLoading(false);
    }

    load();
  }, []);

  return (
    <main className="section explore">
      <span className="eyebrow">Explore</span>
      <h1>Browse the community</h1>
      <p className="hero-copy" style={{ textAlign: "left", margin: "0 0 24px" }}>
        Look around before you post anything. Rooms are organized by recovery
        stage — read whichever one fits where you are right now, no signup
        required.
      </p>

      {loading ? (
        <p className="muted">Loading rooms…</p>
      ) : (
        <div className="explore-list">
          {rooms.map((r) => (
            <Link key={r.id} href={`/rooms/${r.slug}`} className="explore-card">
              <div>
                <span className="eyebrow">{r.stage_label}</span>
                <h2>{r.name}</h2>
              </div>
              <div className="explore-meta">
                {r.postCount === 0
                  ? "No check-ins yet"
                  : `${r.postCount} check-in${r.postCount === 1 ? "" : "s"}`}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="explore-resources">
        <span className="eyebrow">Also worth a look</span>
        <div className="explore-list">
          <Link href="/resources" className="explore-card">
            <div>
              <h2>Recovery resources</h2>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Withdrawal timelines, sleep, nutrition, and more.
              </p>
            </div>
          </Link>
          <Link href="/resources/faq" className="explore-card">
            <div>
              <h2>Frequently asked questions</h2>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                What Recovery Together is, and isn&apos;t.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
