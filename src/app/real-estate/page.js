import RealEstate from "./RealEstate";
import { archivo, interTight } from "@/lib/persona-fonts";
import { ROBOTS } from "@/lib/site";
import {
  PAGE_DESCRIPTION,
  PAGE_PATH,
  PAGE_TITLE,
  SOCIAL_TITLE,
  SITE,
  buildJsonLd,
} from "./realestate-data";

/* Metadata must live in a server file, so it sits here and the
   interactive component stays "use client". Fonts are shared with the
   other persona pages from src/lib/persona-fonts.js. */

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

export default function ForRealEstateAgentsPage() {
  /* "<" escaped so the JSON can never close the script tag early */
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <div className={`${archivo.variable} ${interTight.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <RealEstate />
    </div>
  );
}
