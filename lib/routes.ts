// Single source of truth for every public URL -- used by the sitemap and by
// the daily IndexNow submission in app/api/cron/daily-digest/route.ts.
export const ROUTES = [
  "",
  "/7oh-withdrawal",
  "/explore",
  "/journey",
  "/resources",
  "/updates",
  "/resources/withdrawal-timeline",
  "/resources/sleep",
  "/resources/hydration-nutrition",
  "/resources/anxiety-and-panic",
  "/resources/mental-health-and-cravings",
  "/resources/exercise-and-movement",
  "/resources/when-to-seek-professional-help",
  "/resources/glossary",
  "/resources/faq",
  "/resources/is-7-oh-the-same-as-kratom",
  "/resources/is-7-oh-an-opioid",
  "/resources/mgm-15-and-mgm-16",
  "/resources/suboxone-and-mat",
  "/resources/paying-for-treatment",
  "/resources/detoxing-at-home",
  "/resources/7-oh-ban-what-changes",
  "/safety",
  "/start-here",
  "/founder-story",
  "/about",
  "/contact",
  "/community-guidelines",
  "/privacy",
  "/terms",
];

// Bump this when page content materially changes. A sitemap whose lastmod
// is always "now" teaches crawlers to ignore the field entirely.
export const LAST_CONTENT_UPDATE = "2026-09-05";

// IndexNow keys are public by design -- the protocol verifies ownership by
// serving the key at /<key>.txt on the same host -- so this is not a secret.
export const INDEXNOW_KEY = "95e48c43d924d6bca7c3550dc44e52ab";
