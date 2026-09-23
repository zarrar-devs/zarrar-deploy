import { Fraunces, Inter } from "next/font/google";
import Authors from "./Authors";
import { CHAPTERS, FAQS, EDITIONS } from "./authors-data";
import {
  BRAND,
  LOCALE,
  ROUTES,
  ROBOTS,
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

const TITLE = "Author Website Design & Book Marketing Services | Zarrar";
const DESCRIPTION =
  "Premium website development, lead generation & outreach, and social media management for authors and writers. We build the site that sells your book and get you in front of agents, press and readers.";
const SOCIAL_TITLE = "You wrote the book. We build its audience. | Zarrar for Authors";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "author website design",
    "author website developer",
    "website for authors",
    "book marketing agency",
    "author branding services",
    "lead generation for authors",
    "author outreach services",
    "literary agent outreach",
    "social media management for authors",
    "writer website design",
    "author SEO services",
    "author platform building",
  ],
  alternates: { canonical: ROUTES.authors },
  robots: ROBOTS,
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: ROUTES.authors,
    siteName: BRAND,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [
      {
        /* The real card someone already designed for this page —
           correct 1200x630-ish aspect, so it's used as-is instead
           of a generated one. */
        url: "/og/authors.png",
        width: 1734,
        height: 907,
        alt: "Zarrar — websites, lead generation and social media for authors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: ["/og/authors.png"],
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
  breadcrumbSchema(ROUTES.authors, "For Authors"),
  {
    "@type": "Service",
    "@id": `${url(ROUTES.authors)}#service`,
    name: "Websites, Lead Generation & Social Media for Authors",
    description:
      "Author website development, lead generation and outreach, and social media management for authors and writers.",
    url: url(ROUTES.authors),
    serviceType: "Author marketing services",
    areaServed: "Worldwide",
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
       Google can't verify against something visible on the page
       gets rich results rejected. */
    makesOffer: EDITIONS.map((e) => ({
      "@type": "Offer",
      name: e.name,
      description: `${e.body} Includes: ${e.includes.join("; ")}.`,
      availability: "https://schema.org/InStock",
    })),
  },
  faqSchema(FAQS, ROUTES.authors),
]);

export default function AuthorsPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Authors />
    </div>
  );
}
