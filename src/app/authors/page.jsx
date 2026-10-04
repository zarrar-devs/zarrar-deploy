import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import Authors from "./Authors";
import { CHAPTERS, EDITIONS, FAQS } from "./authors-data";
import {
  BRAND,
  LOCALE,
  ROUTES,
  ROBOTS,
  TARGET_MARKETS,
  url,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  safeJsonLd,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/site";

/* =============================================================
   /authors — SERVER component.

   The route previously had a fully-written metadata file
   (authors-metadata.js) sitting next to a "use client" page.jsx —
   correct content (zarrar.co, /authors, the real /og/authors.png),
   but nothing ever imported it, because Next can't read metadata
   off a client component regardless. That content is folded in
   here; the standalone file is deleted.

   CHAPTERS / FAQS / EDITIONS now come from ./authors-data.jsx
   (a plain, non-"use client" module) instead of from ./Authors.
   Importing them from Authors.jsx (which has "use client") turned
   every export of that module — including these plain arrays —
   into a client reference on the server, so CHAPTERS.map() here
   threw "CHAPTERS.map is not a function". Pulling the data from a
   directive-free file fixes that.
   ============================================================= */

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-authors-display",
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-authors-body",
});

const TITLE = "Website for Authors & Lead Generation | Zarrar";
const DESCRIPTION =
  "A website for authors and writers, with lead generation and outreach to agents, press and event hosts, plus social media management. Built SEO-ready.";
const SOCIAL_TITLE = "Custom Author Websites, Lead Generation & Outreach | Zarrar";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.authors },
  robots: ROBOTS,
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: ROUTES.authors,
    siteName: BRAND,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    /* Image comes from ./opengraph-image.jsx. It used to point at
       /og/authors.png, but public/og/ is empty — every share of this
       page rendered with a broken image. */
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const jsonLd = graph([
  organizationSchema(),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${url(ROUTES.authors)}#webpage`,
    url: url(ROUTES.authors),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${url(ROUTES.authors)}#service` },
    breadcrumb: { "@id": `${url(ROUTES.authors)}#breadcrumb` },
    inLanguage: "en",
  },
  breadcrumbSchema(ROUTES.authors, "Website for Authors"),
  faqSchema(ROUTES.authors, FAQS),
  {
    "@type": "Service",
    "@id": `${url(ROUTES.authors)}#service`,
    name: "Author website development, lead generation, cold email outreach and social media management",
    description:
      "Author website development, lead generation, cold email outreach and social media management for authors and writers.",
    url: url(ROUTES.authors),
    serviceType: ["Author website development", "Lead generation for authors", "Cold email outreach for authors", "Social media management for authors"],
    areaServed: TARGET_MARKETS,
    audience: { "@type": "Audience", audienceType: "Authors and writers" },
    provider: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "What's included",
      itemListElement: CHAPTERS.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          description: c.body,
          provider: { "@id": ORG_ID },
        },
      })),
    },
    /* No `price` on the offers on purpose — schema with a price
       This avoids adding unverifiable pricing to structured data.
       gets rich results rejected. */
    makesOffer: EDITIONS.map((e) => ({
      "@type": "Offer",
      name: e.name,
      description: `${e.body} Includes: ${e.includes.join("; ")}.`,
    })),
  },
]);

export default function AuthorsPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <nav className="seo-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Website for Authors</span></nav>
      <Authors />
    </div>
  );
}