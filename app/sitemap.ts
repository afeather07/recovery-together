import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "/explore",
  "/journey",
  "/resources",
  "/resources/withdrawal-timeline",
  "/resources/sleep",
  "/resources/hydration-nutrition",
  "/resources/anxiety-and-panic",
  "/resources/mental-health-and-cravings",
  "/resources/exercise-and-movement",
  "/resources/when-to-seek-professional-help",
  "/resources/glossary",
  "/resources/faq",
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
