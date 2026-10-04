import { Archivo, Inter_Tight } from "next/font/google";

/* One font definition shared by /speakers, /real-estate and /coaches.
   Each of those pages used to call Archivo() and Inter_Tight() on its
   own, which emitted three copies of the same @font-face + class CSS.
   Calling them once here (same pattern as brand-font.js) means one
   self-hosted file set, one preload, and a size-matched fallback so
   the large hero heading doesn't jump when the webfont lands (LCP/CLS).
   The CSS variables are picked up by speakers.css, realestate.css and
   coaches.css. */

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"], // variable weight is included; this adds the width axis
  display: "swap",
  variable: "--font-archivo",
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});
