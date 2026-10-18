import { Fraunces, Space_Mono, Space_Grotesk } from "next/font/google";

/* The three families the landing page already uses (Hero / WhoAreWe),
   declared once for the new sections. Variable names are new (--lp-*)
   so they can never collide with the ones the Hero and WhoAreWe scope
   to their own roots. next/font dedupes identical font files, so this
   does not download anything twice.
     serif : Fraunces italic    — display
     mono  : Space Mono         — stamped labels
     sans  : Space Grotesk      — body copy                         */
const lpSerif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--lp-serif",
  display: "swap",
});

const lpMono = Space_Mono({
  subsets: ["latin"],
  weight: ["700"], // same single weight the Hero loads, so no extra file
  variable: "--lp-mono",
  display: "swap",
});

const lpSans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--lp-sans",
  display: "swap",
});

export const lpFontVars = `${lpSerif.variable} ${lpMono.variable} ${lpSans.variable}`;
