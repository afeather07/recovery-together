// Single source of truth for the site's public URL. Set NEXT_PUBLIC_SITE_URL
// in Vercel to override -- defaults to the production domain now that
// justanotherfriend.com is purchased and DNS-connected (2026-08-06).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://justanotherfriend.com";
