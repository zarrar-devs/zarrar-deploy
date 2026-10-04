import { SITE_URL, ROUTES } from "@/lib/site";

const pages = [
  { path: ROUTES.home, lastModified: "2026-10-04" },
  { path: ROUTES.services, lastModified: "2026-10-04" },
  { path: ROUTES.contact, lastModified: "2026-10-04" },
  { path: ROUTES.about, lastModified: "2026-10-04" },
  { path: ROUTES.webDevelopment, lastModified: "2026-10-04" },
  { path: ROUTES.leadGeneration, lastModified: "2026-10-04" },
  { path: ROUTES.coldEmail, lastModified: "2026-10-04" },
  { path: ROUTES.socialMedia, lastModified: "2026-10-04" },
  { path: ROUTES.speakers, lastModified: "2026-10-04" },
  { path: ROUTES.realEstate, lastModified: "2026-10-04" },
  { path: ROUTES.authors, lastModified: "2026-10-04" },
  { path: ROUTES.coaches, lastModified: "2026-10-04" },
  { path: ROUTES.entrepreneurs, lastModified: "2026-10-04" },
];

export default function sitemap() {
  return pages.map(({ path, lastModified }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));
}
