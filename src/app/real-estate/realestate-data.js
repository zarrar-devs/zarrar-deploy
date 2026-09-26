/* =============================================================
   Zarrar — /real-estate  ·  content + structured data
   -------------------------------------------------------------
   No "use client" here on purpose: page.js (server) builds the
   JSON-LD from this file, and RealEstate.jsx (client) renders it.

   Before going live:
   - SEARCH_TERMS are search patterns, not real places. They are
     written in plain language ("Realtor in your city") so no
     [placeholder] brackets ever show on the live page.
   - FAQ answers describe the service in general terms. Check that
     each one matches how you actually work (especially IDX/MLS
     setup and the outreach-compliance answer).
   - The copy is US/Canada-flavoured (MLS, IDX, zip code, realtor).
   ============================================================= */

import { SITE_URL, CONTACT_EMAIL as SHARED_CONTACT_EMAIL, organizationSchema, websiteSchema, ORG_ID, WEBSITE_ID } from "@/lib/site";

export const SITE = SITE_URL;
export const PAGE_PATH = "/real-estate";
export const PAGE_URL = `${SITE}${PAGE_PATH}`;
export const CONTACT_EMAIL = SHARED_CONTACT_EMAIL;

export const PAGE_TITLE = "Real Estate Website, Local SEO & Leads | Zarrar";
/* keep under ~160 characters so Google doesn't cut it off */
export const PAGE_DESCRIPTION =
  "Website development, local SEO, lead generation, outreach and social media management for real estate agents who want more direct buyer and seller enquiries.";

/* Search patterns buyers and sellers actually type. */
export const SEARCH_TERMS = [
  "real estate agent near me",
  "best real estate agent in my area",
  "homes for sale near me",
  "sell my house with a real estate agent",
  "buyer's agent near me",
];

export const COMPARE = {
  old: {
    tag: "Relying on portals",
    points: [
      "Your profile sits next to ads for other agents on the same listing page.",
      "Enquiries are often shared with whoever else is paying for that zip code.",
      "Your visibility can still depend heavily on the portal while your profile is active.",
    ],
  },
  owned: {
    tag: "Owning your pipeline",
    points: [
      "A website that's only about you, with no one else's ad on the page.",
      "Your website gives prospects a direct way to understand your services and contact you without another agent profile beside it.",
      "Useful local pages can keep attracting relevant searches after an individual listing is gone.",
    ],
  },
};

export const TIMELINE = [
  {
    num: "Weeks 1–2",
    title: "Local foundation",
    body: "The website and enquiry paths go live, local search fundamentals are addressed and the first audience or prospecting segments are mapped.",
  },
  {
    num: "Weeks 3–6",
    title: "Local content and outreach",
    body: "Neighbourhood, buyer and seller content starts publishing while targeted outreach goes to the audiences you actually want to win.",
  },
  {
    num: "Weeks 7–12",
    title: "Refine and compound",
    body: "We use search visibility, enquiries and outreach replies to refine the pages, content and campaigns that are creating the most relevant opportunities.",
  },
];

/* `icon` is a key, not JSX, so this file stays server-safe. */
export const SERVICES = [
  {
    id: "web-development",
    title: "Website development for real estate agents",
    body: "A custom real estate website that showcases your listings, explains your local expertise and makes it easy for buyers and sellers to enquire.",
    cta: "Build my real estate website",
    icon: "web",
  },
  {
    id: "local-seo",
    title: "Local SEO and Google Business Profile",
    body: "We improve your local search foundation, including your Google Business Profile where applicable, and build location-focused pages around the searches buyers and sellers actually make.",
    cta: "Improve my local visibility",
    icon: "pin",
  },
  {
    id: "lead-generation",
    title: "Lead generation and outreach",
    body: "We identify the prospect groups that fit your market and outreach strategy, then build and organise a focused list ready for compliant follow-up.",
    cta: "Build my prospect pipeline",
    icon: "outreach",
  },
  {
    id: "social-media",
    title: "Social media management for real estate",
    body: "Listings, market updates, neighbourhood content and property education planned and published consistently so your profile stays useful between transactions.",
    cta: "Manage my social media",
    icon: "social",
  },
];

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For building your local presence.",
    body: "Your listings deserve a focused website and local search foundation that are built around your market, not only a portal profile.",
    includes: [
      "Custom real estate website with lead capture on every page",
      "Local SEO and Google Business Profile setup",
      "Copy written for your area and offer, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For staying visible locally.",
    body: "Everything in Launch, plus social media management that keeps your listings, market knowledge and local expertise visible.",
    includes: [
      "Everything in Launch",
      "Social media management: listings, neighbourhood content and replies",
      "Social profiles set up and optimised on the agreed channels",
      "Custom email domain (you@yourname.com)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    line: "For building a direct pipeline.",
    body: "The full system: website, local SEO, social media and lead generation working together around your market.",
    includes: [
      "Everything in Presence",
      "Outreach to expired listings, FSBOs and past clients",
      "Instant lead alerts and follow-up sequences",
      "Enquiry alerts and follow-up workflow for buyer and seller leads",
    ],
    featured: true,
  },
];

/* Plan names are read from PLANS so the FAQ can never drift from the cards. */
const planName = (id) => PLANS.find((p) => p.id === id)?.name ?? id;

export const FAQS = [
  {
    q: "I'm already on Zillow and Realtor.com. Do I still need my own website?",
    a: "A portal can be useful, but your own website gives buyers and sellers a place to evaluate your services, market knowledge, listings and contact options without competing profiles on the same page.",
  },
  {
    q: "Can my real estate website show live MLS listings?",
    a: "Where an MLS/IDX feed is available and your brokerage permits it, the site can display live listing data. We confirm the feed, board and brokerage requirements before building it.",
  },
  {
    q: "How quickly can a new buyer or seller reach me?",
    a: "We set up clear enquiry notifications and follow-up workflows so buyer and seller enquiries are easy to see and act on. Response time still depends on your team and market.",
  },
  {
    q: "What does local SEO do for a real estate agent?",
    a: "It helps your business become easier to understand and discover in local search. That can include an accurate Google Business Profile where applicable, useful location-focused website pages, clear business information and content that matches the searches buyers and sellers make in your market."
  },
  {
    q: "Is cold outreach to expired listings and FSBOs allowed?",
    a: "Rules differ by country and state, and email and phone outreach are regulated differently. In the US, for example, email falls under CAN-SPAM and phone calls under Do Not Call rules. We confirm what's allowed in your market before any campaign goes out, and your brokerage's compliance team should have the final say.",
  },
  {
    q: "Which plan is right for me, and is social media included?",
    a: `Start with ${planName("launch")} if you need the website and local-search foundation. ${planName("presence")} adds social media management and a professional email domain. ${planName("growth")} adds lead generation and outreach. The scope can be tailored to your market once we understand your patch, audience and goals.`,
  },
  {
    q: "How long before I see new enquiries?",
    a: "The website and core local-search setup can be prepared in the first few weeks. Outreach responses can begin after a campaign launches, while local search visibility usually takes longer and depends on your market, competition, content and overall authority."
  },
];

/* ---------------- Structured data (built on the server) ---------------- */

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      /* The ONE shared Organization + WebSite entity from src/lib/site.js
         (same @id on every page). This page used to declare its own thin
         "ProfessionalService" with a different @id (#business), so Google
         saw two businesses named Zarrar. */
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${PAGE_URL}#service` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "For real estate agents", item: PAGE_URL },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Real estate website development, local SEO, lead generation, cold outreach and social media management",
        serviceType:
          ["Real estate website development", "Local SEO", "Lead generation for real estate agents", "Cold outreach for real estate agents", "Social media management for real estate agents"],
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        audience: { "@type": "Audience", audienceType: "Real estate agents" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services and plans for real estate agents",
          itemListElement: [
            ...SERVICES.map((s) => ({
              "@type": "Offer",
              url: `${PAGE_URL}#${s.id}`,
              itemOffered: { "@type": "Service", name: s.title, description: s.body },
            })),
            ...PLANS.map((p) => ({
              "@type": "Offer",
              url: `${PAGE_URL}#plans`,
              name: `${p.name} plan`,
              description: `${p.body} Includes: ${p.includes.join("; ")}.`,
            })),
          ],
        },
      },
    ],
  };
}
