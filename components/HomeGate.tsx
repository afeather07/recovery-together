"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import MarketingHome from "@/components/MarketingHome";
import ReturnScreen from "@/components/ReturnScreen";

export default function HomeGate() {
  // Default to the real, server-rendered marketing content immediately --
  // this is what most visitors (and any crawler) see, and it must never be
  // blank. Only swap to the personalized return screen once we've actually
  // confirmed a session client-side. A brief flash of the marketing page
  // for a returning visitor is a far smaller cost than a blank homepage
  // for every new visitor.
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session?.user);
    });
  }, []);

  if (hasSession) {
    return <ReturnScreen onNoSession={() => setHasSession(false)} />;
  }

  return <MarketingHome />;
}
