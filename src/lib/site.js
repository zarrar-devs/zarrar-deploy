/* =============================================================
   Zarrar — single source of truth for everything SEO-related.
   -------------------------------------------------------------
   WHY THIS FILE EXISTS:
   Before this, the real domain was written out by hand in 10+
   files and three of them disagreed with each other
   (old placeholder origins and zarrar.co). Canonical
   tags, sitemap entries and JSON-LD @ids built from inconsistent
   domains create conflicting signals about which version of the site is
   canonical.

   From now on: NOTHING hardcodes the domain, a route path, the
   brand name or the contact email. Everything imports from here.

   If you ever change domain or email, change it ONCE here.
   ============================================================= */

/* The production origin. No trailing slash. */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const PRODUCTION_SITE_URL = "https://www.zarrar.co";
export const SITE_URL =
  configuredSiteUrl?.replace(/^https?:\/\/(?:www\.)?zarrar\.co$/i, PRODUCTION_SITE_URL) ||
  PRODUCTION_SITE_URL;

export const BRAND = "Zarrar";
export const CONTACT_EMAIL = "hello@zarrar.co";
export const LOCALE = "en_US";

/* Routes — these MUST match the actual folder names under src/app.
   Previously the metadata claimed /speakers, /coaches,
   /authors, /entrepreneurs and /real-estate, none of
   which exist as routes: every canonical URL on the site pointed at
   a 404. These are the real ones. */
export const ROUTES = {
  home: "/",
  services: "/services",
  contact: "/contact",
  speakers: "/speakers",
  realEstate: "/real-estate",
  authors: "/authors",
  coaches: "/coaches",
  entrepreneurs: "/entrepreneurs",
  webDevelopment: "/web-development",
  leadGeneration: "/lead-generation",
  coldEmail: "/cold-email-outreach",
  socialMedia: "/social-media-management",
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
    name: "Website Development",
    href: ROUTES.webDevelopment,
    description:
      "Custom-coded websites and portfolio sites — designed, built and technically optimised for search from day one.",
  },
  {
    name: "Lead Generation",
    href: ROUTES.leadGeneration,
    description:
      "Researched, verified prospect lists and a booking pipeline built around the people who actually buy from you.",
  },
  {
    name: "Cold Email Outreach",
    href: ROUTES.coldEmail,
    description:
      "Authenticated sending domains (SPF, DKIM, DMARC), written campaigns and managed follow-up that land in the inbox.",
  },
  {
    name: "Social Media Management",
    href: ROUTES.socialMedia,
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
  { label: "Founders & CEOs", href: ROUTES.entrepreneurs },
];

/* Reused verbatim in Organization schema on every page so the
   entity description Google sees is identical site-wide. */
export const ORG_DESCRIPTION =
  "Zarrar is a remote digital agency providing website development, lead generation, cold email outreach and social media management for founders, speakers, coaches, authors, real estate agents and service businesses.";

export const TARGET_MARKETS = ["United States", "United Kingdom", "Europe"];

/* Homepage title + description — used by layout.jsx, page.jsx, the
   WebPage JSON-LD and the manifest, so they can never drift apart.
   The title leads with the core service intent while still naming the
   audience. The description states who the agency serves and the
   primary markets without stuffing a list of keywords. */
export const HOME_TITLE = "Web Development & Lead Generation Agency | Zarrar";
export const HOME_DESCRIPTION =
  "Custom web development and lead generation for founders, speakers, coaches, authors and real estate professionals across the US, UK and Europe.";

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
    url: SITE_URL,
    description: ORG_DESCRIPTION,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
    },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/zarrar-512.png`,
      width: 512,
      height: 512,
    },
    areaServed: TARGET_MARKETS,
    knowsAbout: [
      "Web development for founders",
      "Speaker website design",
      "Coach website development",
      "Author website design",
      "Real estate website development",
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

/* Shared robots directive for all indexable marketing pages. */
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
