"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import MarketingHome from "@/components/MarketingHome";
import ReturnScreen from "@/components/ReturnScreen";

export default function HomeGate() {
  const [checked, setChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session?.user);
      setChecked(true);
    });
  }, []);

  // Deliberately render nothing while we check -- a returning visitor should
  // never see a flash of the "new visitor" marketing homepage first.
  if (!checked) return null;

  if (hasSession) {
    return <ReturnScreen onNoSession={() => setHasSession(false)} />;
  }

  return <MarketingHome />;
}
