import { Archivo, Inter_Tight } from "next/font/google";
import Services from "./Services";
import { SERVICES, PLANS } from "./services-data";
import {
  BRAND,
  LOCALE,
  ROUTES,
  ROBOTS,
  url,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  graph,
  safeJsonLd,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/site";

/* =============================================================
   /services — SERVER component.

   The route already used the right domain (zarrar.co) in its
   metadata, hardcoded three times over — this now comes from
   metadataBase + relative paths in src/lib/site.js instead, so a
   future domain change only happens in one place.

   The og:image previously pointed at "/zarrar.co.jfif" — a .jfif
   file. LinkedIn, X and WhatsApp all refuse to render .jfif, so
   every share of this page rendered as a blank card. Replaced with
   a generated 1200x630 PNG (./opengraph-image.jsx).

   Fonts moved here from Services.jsx, which injected three <link>
   tags for Archivo + Inter Tight while Services.css ALSO @imported
   the same two families — paid for twice, on the critical path.

   SERVICES/PLANS: these used to be imported from "./Services",
   which is a "use client" component. A server component importing
   an export from a "use client" file gets a client-reference
   object back, not the real array — no .map(), hence
   "SERVICES.map is not a function" below when building the
   Service/Offer JSON-LD. They now live in ./services-data.js, a
   plain file with no "use client" directive, same convention as
   RealEstate.jsx/Founders.jsx pulling from realestate-data.js /
   founders-data.js.

   BREADCRUMB: "Home / Services" must NOT be rendered here. It's
   rendered inside Services.jsx, as the first thing inside
   .services-page, so it shares that element's --bone background
   and gutter with the nav right below it. Rendering it here too
   (as a sibling above <Services/>) puts it outside .services-page
   entirely — outside the element that sets `background: var(--bone)`
   — so it paints on the page's plain white background instead and
   shows up as a visible colour seam above the nav, AND (if both
   copies exist at once) the breadcrumb renders twice on the page.
   ============================================================= */

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

/* Title <= 60 and description <= 160 characters, so Google shows them
   whole instead of cutting them off with "…". */
const TITLE = "Website, Lead Generation, Cold Email & Social | Zarrar";
const DESCRIPTION =
  "Website development, lead generation, cold email outreach and social media management for speakers, authors, coaches, real estate agents and founders.";
const SOCIAL_TITLE = "Website, lead generation and outreach services | Zarrar";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.services },
  robots: ROBOTS,
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: ROUTES.services,
    siteName: BRAND,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    /* Generated card from ./opengraph-image.jsx — no more missing
       or unrenderable .jfif. */
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
  themeColor: "#f2eee3",
};

export const FAQS = [
  {
    q: "How much does a custom website cost?",
    a: "It depends on how many pages you need, whether copy and photography are included, and how much of the lead generation and social media work runs alongside it. Tell us what you're trying to achieve and you'll get a fixed quote before anything starts — no hourly billing and no surprises mid-project.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A focused portfolio or service site is usually live within two to three weeks from the point we have your content. Larger builds with more pages, integrations or custom functionality take longer, and you'll get a dated schedule before we begin rather than a vague estimate.",
  },
  {
    q: "Will my website actually rank on Google?",
    a: "Every site we build ships with the technical foundation search engines need: clean semantic HTML, fast load times and good Core Web Vitals, proper page titles and descriptions, a sitemap, and structured data describing your business. That foundation is what makes ranking possible. Where you land also depends on your market's competitiveness and on content and links built over time, which is ongoing work rather than a one-time switch.",
  },
  {
    q: "Is cold email outreach still effective, and is it legal?",
    a: "It works when the list is genuinely targeted, the message is relevant to that specific person, and the sending setup is technically sound. We authenticate your sending domains with SPF, DKIM and DMARC, warm them up properly, keep volumes sensible and include a clear opt-out in every message — which is what compliance regimes like CAN-SPAM and GDPR require. Blasting a generic template at a bought list does not work and we don't do it.",
  },
  {
    q: "What does social media management actually include?",
    a: "Planning the content calendar around your offers, writing and designing the posts, publishing them on schedule, and handling the comments and DMs day to day. You approve the direction; you don't have to be the one posting.",
  },
  {
    q: "Can I start with just a website and add outreach later?",
    a: "Yes. Each plan builds on the one before it, so you can start with the site and move up whenever you're ready. Most clients find the pieces work harder together, because the website gives every cold email and every post somewhere credible to land.",
  },
  {
    q: "Do you work with businesses outside my country?",
    a: "Yes — we work with clients worldwide and everything runs remotely over calls, email and a shared project board. Time zones are handled by agreeing a regular check-in slot that works on both ends.",
  },
];

const jsonLd = graph([
  organizationSchema(),
  websiteSchema(),
  {
    "@type": "WebPage",
    "@id": `${url(ROUTES.services)}#webpage`,
    url: url(ROUTES.services),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${url(ROUTES.services)}#service` },
    breadcrumb: { "@id": `${url(ROUTES.services)}#breadcrumb` },
    inLanguage: "en",
  },
  breadcrumbSchema(ROUTES.services, "Services"),
  {
    "@type": "Service",
    "@id": `${url(ROUTES.services)}#service`,
    name: "Website development, lead generation, cold email outreach and social media management",
    description: DESCRIPTION,
    url: url(ROUTES.services),
    serviceType: ["Website development", "Lead generation", "Cold email outreach", "Social media management"],
    areaServed: "Worldwide",
    provider: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.body,
          serviceType: s.title,
          provider: { "@id": ORG_ID },
        },
      })),
    },
    makesOffer: PLANS.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: `${p.body} Includes: ${p.includes.join("; ")}.`,
    })),
  },
]);

export default function ServicesPage() {
  return (
    <div className={`${archivo.variable} ${interTight.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Services faqs={FAQS} />
    </div>
  );
}