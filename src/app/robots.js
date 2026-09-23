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
        /* Do NOT disallow /_next/static/ (or its chunks/): those are
           the JavaScript and CSS files Googlebot needs to render this
           animated site. Blocking them made Google see a broken page.
           The old `host:` line is Yandex-only and is gone. */
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
