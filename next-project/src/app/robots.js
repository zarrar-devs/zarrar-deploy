import { SITE_URL } from "@/lib/site";

/* Served at /robots.txt — the only one. This project also had
   src/app/coaches/robots.js and src/app/entrepreneurs/robots.js,
   which Next serves at /coaches/robots.txt and
   /entrepreneurs/robots.txt — URLs no crawler ever requests. Deleted;
   this root file is the only rule set that matters. */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/static/chunks/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
