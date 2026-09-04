import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
