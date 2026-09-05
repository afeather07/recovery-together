import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ROUTES, LAST_CONTENT_UPDATE } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    // /updates genuinely changes daily (news cron); everything else only
    // when content is edited.
    lastModified: route === "/updates" ? new Date() : LAST_CONTENT_UPDATE,
  }));
}
