import { Space_Grotesk } from "next/font/google";

/* The ZARRAR wordmark font. This is the SAME family and weight the
   landing page nav always used (Space Grotesk 700), now loaded once
   in the root layout so every page can render the wordmark with the
   exact same face. Only the 700 weight is requested — one small
   self-hosted file, preloaded, no third-party request. */
export const brandFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-brand",
  display: "swap",
});
