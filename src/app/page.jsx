import App from "../components/App";
import { FAQS } from "../components/landing/landing-data";
import {
  BRAND,
  LOCALE,
  SITE_URL,
  HOME_TITLE,
  ROUTES,
  organizationSchema,
  websiteSchema,
  faqSchema,
  graph,
  safeJsonLd,
  url,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/site";

/* Home description, written for the SERP: says what Zarrar does in the
   words people search (websites, prospect lists, cold email outreach)
   and stays under 160 characters. It's set here, with its own
   openGraph/twitter, instead of editing HOME_DESCRIPTION in
   lib/site.js, because the footer blurb also reads that constant.
   Next replaces (not merges) openGraph/twitter objects per page, which
   is why they're repeated in full below. */
const DESCRIPTION =
  "Custom-coded, motion-led websites, prospect lists and personalised cold email outreach for speakers, authors, coaches, CEOs and real estate agents worldwide.";

/* Bump when the page copy changes. */
const LAST_UPDATED = "2026-10-18";

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.home },
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: ROUTES.home,
    siteName: BRAND,
    title: HOME_TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: DESCRIPTION,
  },
};

/* The four services as an ItemList, so the home page's structured data
   points at every service page (same names and URLs as the footer and
   the /services page). */
const SERVICE_LINKS = [
  ["Web development", ROUTES.webDevelopment],
  ["Lead generation", ROUTES.leadGeneration],
  ["Cold email outreach", ROUTES.coldEmail],
  ["Social media management", ROUTES.socialMedia],
];

/* One @graph per page instead of several competing <script> tags —
   Google resolves the @id cross-references, so the Organization
   declared here is the same entity every other page points at. */
const KNOWS_ABOUT = [
  "Custom website development",
  "Lead generation",
  "Cold email outreach",
  "Social media management",
  "Technical SEO",
  "Web design and motion",
];

const jsonLd = graph([
  { ...organizationSchema(), knowsAbout: KNOWS_ABOUT },
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: HOME_TITLE,
    headline: HOME_TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: url("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    dateModified: LAST_UPDATED,
    inLanguage: "en",
    hasPart: [{ "@id": `${SITE_URL}/#services` }, { "@id": `${url(ROUTES.home)}#faq` }],
  },
  /* The same FAQS array the page renders (LandingFinale), so the markup
     can't drift from the visible text. */
  faqSchema(ROUTES.home, FAQS),
  {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "Zarrar services",
    itemListElement: SERVICE_LINKS.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      url: url(path),
    })),
  },
]);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <App />
    </>
  );
}
