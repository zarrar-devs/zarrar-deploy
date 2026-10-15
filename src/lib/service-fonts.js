import { Bricolage_Grotesque, Instrument_Serif, Inter_Tight } from "next/font/google";

/* Fonts for the four service pages (/web-development, /lead-generation,
   /cold-email-outreach, /social-media-management).

   - Bricolage Grotesque: characterful variable grotesk for headings.
     Reads as "designed", not "default", at very large sizes.
   - Instrument Serif (italic): the single editorial accent word in
     each heading — the classic award-site pairing.
   - Inter Tight: dense, clean body text that stays readable on phones.

   Each one self-hosts through next/font (no third-party request) and
   exposes a CSS variable that service-landing.css reads. The variable
   names are service-specific so they can't collide with the persona
   pages' --font-archivo / --font-inter-tight. */

export const serviceDisplayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-svc-display",
});

export const serviceSerifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-svc-serif",
});

export const serviceBodyFont = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-svc-body",
});

/* One string for the wrapper <div> in each page.jsx */
export const serviceFontClasses = [
  serviceDisplayFont.variable,
  serviceSerifFont.variable,
  serviceBodyFont.variable,
].join(" ");
