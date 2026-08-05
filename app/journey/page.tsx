"use client";
import { useState } from "react";
import Link from "next/link";
import ReturnScreen from "@/components/ReturnScreen";

export default function JourneyPage() {
  const [noSession, setNoSession] = useState(false);

  if (noSession) {
    return (
      <main className="section journey-empty">
        <span className="eyebrow">My Journey</span>
        <h1>You haven&apos;t started a journey yet.</h1>
        <p className="hero-copy">
          Once you join, this page will remember your stage, your room, and
          any replies you&apos;ve gotten — so you never have to hunt for
          where you left off. It takes under a minute and you can stay
          completely anonymous.
        </p>
        <Link href="/#top" className="primary-btn full">
          Find my group
        </Link>
      </main>
    );
  }

  return <ReturnScreen onNoSession={() => setNoSession(true)} />;
}
