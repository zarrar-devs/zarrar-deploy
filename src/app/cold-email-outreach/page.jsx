import { serviceByPath, serviceMetadata } from "@/lib/service-pages";
import ServicePage from "@/app/ServicePage";
import { serviceDisplayFont, serviceBodyFont } from "@/lib/service-fonts";
import {
  ORG_ID,
  SITE_URL,
  TARGET_MARKETS,
  WEBSITE_ID,
  breadcrumbSchema,
  graph,
  organizationSchema,
  safeJsonLd,
  url,
  websiteSchema,
} from "@/lib/site";

const service = serviceByPath("/cold-email-outreach");

export const metadata = serviceMetadata(service);

const jsonLd = graph([
  organizationSchema(),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${SITE_URL}${service.path}#webpage`,
    url: url(service.path),
    name: service.title,
    headline: service.h1,
    description: service.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${SITE_URL}${service.path}#service` },
    mainEntity: { "@id": `${SITE_URL}${service.path}#service` },
    breadcrumb: { "@id": `${SITE_URL}${service.path}#breadcrumb` },
    inLanguage: "en",
  },
  breadcrumbSchema(service.path, service.eyebrow.replace(/-/g, " ")),
  {
    "@type": "Service",
    "@id": `${SITE_URL}${service.path}#service`,
    name: service.serviceType,
    description: service.description,
    url: url(service.path),
    serviceType: service.serviceType,
    areaServed: TARGET_MARKETS,
    audience: { "@type": "Audience", audienceType: service.audience },
    provider: { "@id": ORG_ID },
  },
]);

export default function Page() {
  return (
    <div className={`${serviceDisplayFont.variable} ${serviceBodyFont.variable}`} data-service={service.path}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ServicePage service={service} />
    </div>
  );
}
