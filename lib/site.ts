// Single source of truth for the site's public URL. Set NEXT_PUBLIC_SITE_URL
// in Vercel to switch domains (e.g. after buying a custom domain) without
// touching code -- falls back to the current Vercel URL if unset.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://recovery-together.vercel.app";
