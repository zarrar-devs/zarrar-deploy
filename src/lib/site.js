/* =============================================================
   Zarrar — single source of truth for everything SEO-related.
   -------------------------------------------------------------
   WHY THIS FILE EXISTS:
   Before this, the real domain was written out by hand in 10+
   files and three of them disagreed with each other
   ("your-domain.com", "zarrar.com", "zarrar.co"). Canonical
   tags, sitemap entries and JSON-LD @ids built from a wrong or
   inconsistent domain are the single fastest way to lose
   rankings — Google treats them as pointing at a different site.

   From now on: NOTHING hardcodes the domain, a route path, the
   brand name or the contact email. Everything imports from here.

   If you ever change domain or email, change it ONCE here.
   ============================================================= */

/* The production origin. No trailing slash. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://zarrar.co";

export const BRAND = "Zarrar";
export const LEGAL_NAME = "Zarrar";
export const CONTACT_EMAIL = "hello@zarrar.co";
export const LOCALE = "en_US";

/* Routes — these MUST match the actual folder names under src/app.
   Previously the metadata claimed /for-speakers, /for-coaches,
   /for-authors, /for-founders and /for-real-estate-agents, none of
   which exist as routes: every canonical URL on the site pointed at
   a 404. These are the real ones. */
export const ROUTES = {
  home: "/",
  services: "/services",
  speakers: "/speakers",
  realEstate: "/real-estate",
  authors: "/authors",
  coaches: "/coaches",
  entrepreneurs: "/entrepreneurs",
};

export const url = (path = "/") =>
  `${SITE_URL}${path === "/" ? "" : path}`;

/* Real social profiles only. An empty array is correct and safe —
   inventing sameAs URLs that 404 actively damages entity trust.
   Add the real handles here when they exist and Organization
   schema picks them up everywhere automatically. */
export const SAME_AS = [];

/* The four services the agency actually sells. Used for the
   OfferCatalog in Organization/Service schema and for keyword
   consistency across every page. */
export const SERVICES = [
  {
    name: "Website & Portfolio Development",
    description:
      "Custom-coded websites and portfolio sites — designed, built and technically optimised for search from day one.",
  },
  {
    name: "Lead Generation",
    description:
      "Researched, verified prospect lists and a booking pipeline built around the people who actually buy from you.",
  },
  {
    name: "Cold Email Outreach",
    description:
      "Authenticated sending domains (SPF, DKIM, DMARC), written campaigns and managed follow-up that land in the inbox.",
  },
  {
    name: "Social Media Management",
    description:
      "Content planning, posting and community replies handled day to day so you stay visible without doing it yourself.",
  },
];

/* Who the persona pages target — also drives the sitemap and the
   cross-links between persona pages, so a page can never link to a
   route that doesn't exist. */
export const PERSONAS = [
  { label: "Speakers", href: ROUTES.speakers },
  { label: "Real Estate Agents", href: ROUTES.realEstate },
  { label: "Authors & Writers", href: ROUTES.authors },
  { label: "Coaches", href: ROUTES.coaches },
  { label: "Entrepreneurs & CEOs", href: ROUTES.entrepreneurs },
];

/* Reused verbatim in Organization schema on every page so the
   entity description Google sees is identical site-wide. */
export const ORG_DESCRIPTION =
  "Zarrar is a digital agency building custom websites and portfolios, and running lead generation, cold email outreach and social media management for speakers, authors, coaches, real estate agents and founders.";

/* Homepage title + description — used by layout.jsx, page.jsx, the
   WebPage JSON-LD and the manifest, so they can never drift apart.
   Title is under ~60 characters and leads with the keywords people
   actually search ("website development", "lead generation"); the
   brand goes last. The old title was 66 characters and got cut off
   in results. Description is under 160 characters for the same
   reason (the old one was ~185). */
export const HOME_TITLE = "Website Development & Lead Generation Agency | Zarrar";
export const HOME_DESCRIPTION =
  "Custom websites, lead generation, cold email and social media management for speakers, authors, coaches, real estate agents and founders.";

/* The Organization node. Given a stable @id so every page's JSON-LD
   can reference the same entity instead of declaring a duplicate
   organisation on each URL. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  const node = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    description: ORG_DESCRIPTION,
    email: CONTACT_EMAIL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/zarrar-512.png`,
      width: 512,
      height: 512,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Website development",
      "Portfolio website design",
      "Search engine optimization",
      "Lead generation",
      "Cold email outreach",
      "Social media management",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Zarrar services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": ORG_ID },
        },
      })),
    },
  };
  if (SAME_AS.length) node.sameAs = SAME_AS;
  return node;
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND,
    description: ORG_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/* Breadcrumbs: Home > Page. Google uses these for the breadcrumb
   trail shown under the title in results. */
export function breadcrumbSchema(path, label) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url(path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: label, item: url(path) },
    ],
  };
}

export function faqSchema(faqs, path) {
  return {
    "@type": "FAQPage",
    "@id": `${url(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* Wraps nodes into one @graph — one <script> tag per page instead of
   three or four competing ones, which is what Google prefers and
   what keeps the @id cross-references resolvable. */
export function graph(nodes) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

/* Escapes "<" so a stray character in copy can never close the
   script tag early and break the page (or open an injection hole). */
export function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/* Shared robots directive — "max-image-preview: large" is what lets
   Google show a big thumbnail next to your result, which measurably
   lifts click-through. */
export const ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};
