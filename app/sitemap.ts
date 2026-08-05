import type { MetadataRoute } from "next";

const SITE_URL = "https://recovery-together.vercel.app";

const ROUTES = [
  "",
  "/explore",
  "/journey",
  "/resources",
  "/resources/withdrawal-timeline",
  "/resources/sleep",
  "/resources/hydration-nutrition",
  "/resources/mental-health-and-cravings",
  "/resources/glossary",
  "/resources/faq",
  "/safety",
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
