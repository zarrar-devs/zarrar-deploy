import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import {
  BRAND,
  CONTACT_EMAIL,
  LOCALE,
  ROBOTS,
  ROUTES,
  SITE_URL,
  url,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  graph,
  safeJsonLd,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/site";

const TITLE = "Contact Zarrar | Web Development & Lead Generation";
const DESCRIPTION =
  "Talk to Zarrar about web development, lead generation, cold email outreach or social media management for founders, speakers, coaches, authors and real estate professionals.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.contact },
  robots: ROBOTS,
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: ROUTES.contact,
    siteName: BRAND,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const PAGE_ID = `${SITE_URL}${ROUTES.contact}#webpage`;
const BREADCRUMB_ID = `${SITE_URL}${ROUTES.contact}#breadcrumb`;

const jsonLd = graph([
  organizationSchema(),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": PAGE_ID,
    url: url(ROUTES.contact),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    inLanguage: "en",
  },
  breadcrumbSchema(ROUTES.contact, "Contact"),
]);

const CONTACT_SERVICES = [
  [ROUTES.webDevelopment, "Web development"],
  [ROUTES.leadGeneration, "Lead generation"],
  [ROUTES.coldEmail, "Cold email outreach"],
  [ROUTES.socialMedia, "Social media management"],
];

export default function ContactPage() {
  return (
    <main className="contact-page" style={{ maxWidth: 920, margin: "0 auto", padding: "clamp(48px, 8vw, 110px) 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <header style={{ marginBottom: 32 }}>
        <BrandMark />
      </header>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 48 }}>
        <Link href="/">Home</Link><span aria-hidden="true"> / </span><span>Contact</span>
      </nav>

      <p style={{ textTransform: "uppercase", letterSpacing: ".14em", fontSize: 12 }}>Website, lead generation, outreach & social media</p>
      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.98, margin: "16px 0 24px" }}>
        Tell us what you need to grow your online presence.
      </h1>
      <p style={{ maxWidth: 680, fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: 1.6 }}>
        Tell us what you sell, who you want to reach and what is not working. Zarrar can build the website, research the right prospects, run cold email outreach or manage the social media that keeps your expertise visible.
      </p>

      <div style={{ marginTop: 44 }}>
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Zarrar project enquiry")}`} style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 600 }}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <section aria-labelledby="contact-services" style={{ marginTop: 72 }}>
        <h2 id="contact-services">Which service do you need?</h2>
        <ul style={{ display: "grid", gap: 12, marginTop: 24, padding: 0, listStyle: "none" }}>
          {CONTACT_SERVICES.map(([href, label]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
