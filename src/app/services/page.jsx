import Services from "./Services";
import { SERVICES, PLANS } from "./services-data";
import { serviceDisplayFont, serviceBodyFont } from "@/lib/service-fonts";
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
  TARGET_MARKETS,
} from "@/lib/site";

/* =============================================================
   /services — SERVER component.

   - Fonts come from @/lib/service-fonts (Bricolage Grotesque +
     Instrument Sans), the same pair as the four service pages, so
     the whole services area looks like one product. Loaded once via
     next/font, no render-blocking @import.
   - SERVICES / PLANS live in ./services-data.js (not "use client"),
     which is why SERVICES.map works here for the JSON-LD.
   - "Home / Services" breadcrumb is rendered INSIDE Services.jsx,
     not here, so it shares the page's --bone background (rendering
     it here paints a white seam above the nav).
   - FAQS below are rendered on the page AND exposed as FAQPage
     schema from the same array, so markup can't drift from the
     visible text.
   ============================================================= */

/* Title <= 60 and description <= 160 characters so Google shows
   them whole. */
const TITLE = "Web Development, Lead Generation & Outreach | Zarrar";
const DESCRIPTION =
  "Zarrar builds websites, researches prospect lists and runs personalised cold email outreach, plus social media management, for founders, speakers and coaches.";
const SOCIAL_TITLE = "Web Development, Lead Generation & Cold Email Outreach | Zarrar";

/* Bump when the page copy changes. */
const LAST_UPDATED = "2026-10-15";

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
    /* image: ./opengraph-image.jsx */
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
  viewportFit: "cover",
  themeColor: "#f2eee3",
};

export const FAQS = [
  {
    q: "What does Zarrar actually do?",
    a: "Zarrar builds websites, researches prospect lists and runs personalised cold email outreach, and also manages social media. Most clients start with the website or the prospect list and add the other pieces as the business grows. Everything is handled remotely for founders, speakers, coaches, authors and real estate agents.",
  },
  {
    q: "Is cold email outreach still worth it?",
    a: "For many service businesses, yes, when it is targeted and personalised. Generic blasts perform worse than they used to, and inbox providers now expect authenticated sending and easy opt-outs, so list quality and relevance matter more than volume. It works best with a specific offer and a small, well-defined audience, and it is a poor fit if you cannot say who you serve. Results depend on your offer, market and timing, so we never promise a fixed number of meetings.",
  },
  {
    q: "How does lead generation work, and where do the prospect lists come from?",
    a: "We start from your ideal customer: role, industry, location, size and buying signals. Then we research companies and decision-makers from public sources such as company websites, event pages and professional profiles, remove anyone who does not fit, and check contact details before anything is sent. You end up with a focused, segmented list rather than a huge unfiltered database.",
  },
  {
    q: "How is personalised outreach different from a mass email?",
    a: "A mass email sends the same message to everyone. Personalised outreach writes a separate message for each segment of your list, and where it matters adds one researched detail about the person, such as a recent announcement or a role change. That detail comes from the list research, which is why the list and the email are built together.",
  },
  {
    q: "Is cold email legal?",
    a: "Cold email to business contacts is generally allowed in the US when it follows CAN-SPAM basics such as accurate sender details and a working opt-out. The UK and EU have stricter privacy and consent rules, especially for individuals. We authenticate sending domains with SPF, DKIM and DMARC, target business contacts and handle opt-outs clearly. Rules vary by country and situation and this is not legal advice, so check the requirements for your market.",
  },
  {
    q: "How much does a custom website cost?",
    a: "It depends on how many pages you need, whether copy and photography are included, and how much of the lead generation and social media work runs alongside it. Tell us what you're trying to achieve and you'll get a fixed quote before anything starts. No hourly billing and no surprises mid-project.",
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
    q: "What does social media management actually include?",
    a: "Planning the content calendar around your offers, writing and designing the posts, publishing them on schedule, and handling the comments and DMs day to day. You approve the direction; you don't have to be the one posting.",
  },
  {
    q: "Can I start with just a website and add outreach later?",
    a: "Yes. Each plan builds on the one before it, so you can start with the site and move up whenever you're ready. Most clients find the pieces work harder together, because the website gives every cold email and every post somewhere credible to land.",
  },
  {
    q: "Do you work with businesses outside my country?",
    a: "Yes. We work with clients worldwide and everything runs remotely over calls, email and a shared project board. Time zones are handled by agreeing a regular check-in slot that works on both ends.",
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
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: url(`${ROUTES.services}/opengraph-image`),
      width: 1200,
      height: 630,
    },
    dateModified: LAST_UPDATED,
    inLanguage: "en",
  },
  breadcrumbSchema(ROUTES.services, "Services"),
  faqSchema(ROUTES.services, FAQS),
  {
    "@type": "Service",
    "@id": `${url(ROUTES.services)}#service`,
    name: "Website development, lead generation, cold email outreach and social media management",
    description: DESCRIPTION,
    url: url(ROUTES.services),
    serviceType: ["Website development", "Lead generation", "Cold email outreach", "Social media management"],
    areaServed: TARGET_MARKETS,
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
          url: url(s.href),
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
    <div className={`${serviceDisplayFont.variable} ${serviceBodyFont.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Services faqs={FAQS} />
    </div>
  );
}
