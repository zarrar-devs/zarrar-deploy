import { SITE_URL, ROUTES } from "@/lib/site";

/* Served at /sitemap.xml. Previously listed the homepage only, and
   the nested coaches/entrepreneurs sitemaps pointed at /for-coaches
   and /for-founders — routes that don't exist. Only real routes go
   here now. */
/* A fixed date, not new Date(): "now" on every build tells Google every
   URL changed every time, and it learns to ignore <lastmod> entirely.
   Bump this when page content really changes. */
const lastModified = new Date("2026-09-23");

const pages = [
  { path: ROUTES.home, priority: 1.0, changeFrequency: "weekly" },
  { path: ROUTES.services, priority: 0.9, changeFrequency: "monthly" },
  { path: ROUTES.speakers, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.realEstate, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.authors, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.coaches, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.entrepreneurs, priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap() {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
