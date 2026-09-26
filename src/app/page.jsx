import App from "../components/App";
import {
  SITE_URL,
  HOME_TITLE,
  HOME_DESCRIPTION,
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
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
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
    name: HOME_TITLE,
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
      { "@type": "ListItem", position: 2, name: "Web Development", url: url(ROUTES.webDevelopment) },
      { "@type": "ListItem", position: 3, name: "Lead Generation", url: url(ROUTES.leadGeneration) },
      { "@type": "ListItem", position: 4, name: "Cold Email Outreach", url: url(ROUTES.coldEmail) },
      { "@type": "ListItem", position: 5, name: "Social Media Management", url: url(ROUTES.socialMedia) },
      ...PERSONAS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 6,
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
