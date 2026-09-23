import App from "../components/App";
import {
  SITE_URL,
  BRAND,
  ORG_DESCRIPTION,
  ROUTES,
  PERSONAS,
  url,
  organizationSchema,
  websiteSchema,
  graph,
  safeJsonLd,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/site";

export const metadata = {
  title: {
    absolute:
      "Zarrar — Website Development, Lead Generation & Social Media Agency",
  },
  description:
    "Zarrar builds custom websites and portfolios, and runs lead generation, cold email outreach and social media management for speakers, authors, coaches, real estate agents and founders.",
  alternates: { canonical: ROUTES.home },
};

/* One @graph per page instead of several competing <script> tags —
   Google resolves the @id cross-references, so the Organization
   declared here is the same entity every other page points at. */
const jsonLd = graph([
  organizationSchema(),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${BRAND} — Website Development, Lead Generation & Social Media Agency`,
    description: ORG_DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  },
  {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#personas`,
    name: "Who Zarrar builds for",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", url: url(ROUTES.services) },
      ...PERSONAS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: p.label,
        url: url(p.href),
      })),
    ],
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
