import App from "../components/App";
import {
  SITE_URL,
  HOME_TITLE,
  HOME_DESCRIPTION,
  ROUTES,
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
    headline: HOME_TITLE,
    description: HOME_DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
    inLanguage: "en",
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
