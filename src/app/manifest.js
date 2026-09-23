import { BRAND, ORG_DESCRIPTION } from "@/lib/site";

export default function manifest() {
  return {
    name: `${BRAND} — Web Development, Lead Generation & Social Media`,
    short_name: BRAND,
    description: ORG_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f2",
    theme_color: "#0b0b0c",
    icons: [
      /* Real sizes, real files. The old entries declared icon.png as
         32x32 and zarrar-512.png as 512x512 while both were actually
         1254x1254. "maskable" is the full-bleed version with the Z
         kept inside Android's safe zone so it never gets cropped. */
      { src: "/logo/zarrar-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo/zarrar-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo/zarrar-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
