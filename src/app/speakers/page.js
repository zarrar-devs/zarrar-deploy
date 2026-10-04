import Speakers from "./Speakers";
import { archivo, interTight } from "@/lib/persona-fonts";
import {
  PAGE_DESCRIPTION,
  PAGE_PATH,
  PAGE_TITLE,
  SOCIAL_TITLE,
  SITE,
  buildJsonLd,
} from "./speakers-data";
import { ROBOTS } from "@/lib/site";

/* Metadata must live in a server file, so it sits here and the
   interactive component stays "use client".

   Fonts live in src/lib/persona-fonts.js (shared by every persona page):
   self-hosted through next/font, no render-blocking request to Google. */


export const metadata = {
  metadataBase: new URL(SITE),
  /* absolute: stops a root-layout title template from doubling "| Zarrar" */
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: SOCIAL_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: "Zarrar",
    type: "website",
    locale: "en_US",
    /* image comes from opengraph-image.jsx in this folder */
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: ROBOTS,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2eee3",
};

export default function ForSpeakersPage() {
  /* "<" escaped so the JSON can never close the script tag early */
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <div className={`${archivo.variable} ${interTight.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Speakers />
    </div>
  );
}
