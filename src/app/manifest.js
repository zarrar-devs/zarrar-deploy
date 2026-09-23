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
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo/zarrar-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
