// Plain server-side client for API route handlers (no cookie/session
// plumbing needed). Uses the public anon key — safe to use here because
// every table it touches has RLS policies scoped for this exact use case
// (app_config: read-only; ai_rate_limit: operational counters only, no
// user data). Never use the service_role key in a route that's reachable
// before authentication.
import { createClient } from "@supabase/supabase-js";

export function createRouteClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
