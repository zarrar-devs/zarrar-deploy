/* =============================================================
   /entrepreneurs — content, SEO strings and structured data.

   This is a plain module (NO "use client") on purpose: the server
   page (metadata + JSON-LD) and the client component both import
   from it, and Next.js can't hand plain data across a "use client"
   boundary.

   Edit copy here and the page, the metadata and the schema all stay
   in sync.
   ============================================================= */

// Fallback domain fixed (zarrar.co is now official) and the route
// fixed too — it built PAGE_URL as "/entrepreneurs", a route that
// does not exist (the folder is /entrepreneurs), so the canonical
// and every JSON-LD @id on this page pointed at a 404.
import { ORG_ID, ROUTES, SITE_URL, WEBSITE_ID, TARGET_MARKETS, organizationSchema, websiteSchema } from "@/lib/site";
export const SITE = SITE_URL;
export const PAGE_URL = `${SITE}${ROUTES.entrepreneurs}`;
export const BRAND = "Zarrar";
export const AUDIENCE_TYPE = "Founders, entrepreneurs and CEOs";

/* ---------------- SEO strings ---------------- */

export const SEO = {
  /* <= 60 chars so it isn't truncated in results */
  title: "Founder Website Design & Lead Generation | Zarrar",
  /* <= 155 chars */
  description:
    "Founder website design, lead generation and outreach for CEOs and entrepreneurs who want a credible personal presence and a focused business pipeline.",
  ogTitle: "Founder Website Design & Lead Generation | Zarrar",
  h1: "Founder website design that matches the business you're building.",
  /* Update when you materially change the page (used in sitemap.js) */
  lastModified: "2026-09-28",
};

export const HERO = {
  sub: "We build founder websites that explain what you do, targeted lead generation and cold email outreach that put the right prospects in front of you, and social media management that keeps your expertise visible. Zarrar works remotely across the US, UK and Europe.",
};

/* ---------------- Hero demo ----------------
   Illustrative only, so the names are invented. Each row maps to a
   service: website -> web development, LinkedIn -> social,
   newsletter -> email. The demo is aria-hidden and data-nosnippet so
   the made-up names never get indexed as page content. */

export const SERP_QUERY = "Maya Hart CEO Northwind";

export const SERP = [
  {
    key: "site",
    before: {
      url: "northwind-old.com",
      title: "Northwind - Home",
      desc: "Welcome to our website. We are a company. Contact us for more information.",
    },
    after: {
      url: "mayahart.com",
      title: "Maya Hart, Founder & CEO of Northwind",
      desc: "Building the freight platform behind thousands of deliveries. Work, writing and how to get in touch.",
      chips: ["Work", "Writing", "Book a call"],
    },
  },
  {
    key: "social",
    before: {
      url: "linkedin.com/in/maya-hart",
      title: "Maya Hart - CEO - Northwind | LinkedIn",
      desc: "212 followers. Last post two years ago.",
    },
    after: {
      url: "linkedin.com/in/maya-hart",
      title: "Maya Hart on LinkedIn: notes on building in freight tech",
      desc: "Posts every week on hiring, fundraising and what went wrong.",
    },
  },
  {
    key: "email",
    before: {
      url: "maya-hart.wordpress.com",
      title: "My blog",
      desc: "Last updated in 2019. Nothing here yet.",
    },
    after: {
      url: "mayahart.com/dispatch",
      title: "The Northwind Dispatch, a newsletter by Maya Hart",
      desc: "Fortnightly notes for operators. Subscribe free.",
    },
  },
];

/* ---------------- Page content ---------------- */

export const PAIN_POINTS = [
  {
    title: "Your search results do not explain enough",
    line: "A prospect, candidate, partner or journalist can look you up before they ever reply. Your website and public profiles should make the story clear in a few seconds.",
  },
  {
    title: "The website does not carry its share of the sale",
    line: "A company can be doing excellent work and still lose trust when the website is vague, slow or hard to navigate. Your site should make the value obvious.",
  },
  {
    title: "Your expertise disappears between meetings",
    line: "Running a company leaves little time for content. Without a consistent social presence, the market may only hear from you when you need something.",
  },
  {
    title: "Prospecting keeps slipping down the list",
    line: "Partner, customer and business-development outreach is easy to postpone when you are running the company. A repeatable system makes it a process, not a late-night task.",
  },
];

export const AUDIENCES = [
  {
    title: "Startup founders",
    line: "You are raising, hiring or launching, and the people you want to attract are researching you alongside the company. A clear founder presence helps them understand the context quickly.",
  },
  {
    title: "CEOs and executives",
    line: "Your business has matured, but the public-facing profile may still feel like an earlier stage. We bring the website, bio and content system up to date.",
  },
  {
    title: "Solo entrepreneurs",
    line: "When your name is the brand, the website, email and social presence all need to tell the same story while you stay focused on delivery.",
  },
  {
    title: "Founders of B2B and service businesses",
    line: "Your next customer may search your name before they book a meeting. A strong website and targeted outreach give that research somewhere credible to land.",
  },
];

export const TIMELINE = [
  {
    when: "Weeks 1–2",
    title: "Foundation",
    body: "We clarify your positioning, plan the website, prepare the social profile structure and build the first focused prospect list.",
  },
  {
    when: "Weeks 3–6",
    title: "Launch and outreach",
    body: "The website goes live, social content begins publishing and cold outreach starts with a specific audience, offer and follow-up sequence.",
  },
  {
    when: "Weeks 7–12",
    title: "Refine and compound",
    body: "We use search behaviour, engagement and outreach replies to improve the website, content and prospecting angles instead of repeating the same message forever.",
  },
];

export const FAQS = [
  {
    q: "Why should a founder or CEO have a personal website as well as a company site?",
    a: "A company site explains the business. A founder site can explain the person behind it: your track record, point of view, current work, media, speaking, writing and the best way to contact you. It also gives your personal search results a clear destination you control.",
  },
  {
    q: "What should a CEO or founder portfolio website include?",
    a: "A clear line on what you do and for whom, your track record and case studies, press and proof, what you're working on now, and one obvious way to get in touch or book a call. Underneath that: fast load times, a mobile-first layout and proper on-page SEO.",
  },
  {
    q: "Can you help build a stronger Google presence for my name?",
    a: "A proper founder website is a strong starting point: a fast, well-structured site with your name, role and company in the right places, structured data, and social profiles that link back to it. Nobody can guarantee a ranking, because competition varies by name and category, but the site gives search engines and people a clear source of information about you.",
  },
  {
    q: "Is cold email still effective for founders and CEOs?",
    a: "It works when the list is targeted, the message is relevant and the sending setup is technically sound: authenticated domains, sensible volumes and an easy way to opt out. Blasting a generic email to a huge list doesn't. We handle the research, copy, sending and follow-up.",
  },
  {
    q: "What are SPF, DKIM and DMARC, and why do they matter for outreach?",
    a: "They're three DNS records that prove your emails really come from your domain. SPF lists who may send for you, DKIM signs each message, and DMARC tells inboxes what to do with mail that fails the checks. Without them, outreach and newsletters are far more likely to land in spam. We set all three up before anything is sent.",
  },
  {
    q: "Can you manage social media for a busy founder or CEO?",
    a: "Yes. The goal is not to turn you into a full-time creator. We plan the content around your expertise and priorities, write it in your voice, publish it and handle routine replies so the profile stays active while you run the company.",
  },
  {
    q: "Can I start with just a website and add email or social media later?",
    a: "Yes. Each plan builds on the one before it, so you can start with the website and move up whenever you're ready. Most founders find the pieces work harder together, because the site gives every email and post somewhere credible to land.",
  },
  {
    q: "How long before we see results?",
    a: "The website and profiles typically go live in the first few weeks. Outreach replies and conversations tend to follow once campaigns are running. Timing depends on your market and offer, and we'll be upfront about it on a call.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on scope. The three plans above (Launch, Presence and Growth) are starting points, and we'll give you a clear quote after a short call.",
  },
];

/* SERVICES copy is written for founders and CEOs. Keep each service
   distinct so the page clearly explains what Zarrar actually delivers.
   Icons live in the component (this file has no JSX). */

export const SERVICES = [
  {
    id: "web-development",
    tone: "ink",
    serviceType: "Website development for founders and CEOs",
    title: "Website development for founders and CEOs",
    body: "First impressions happen on your website, so we design and build one that looks like the company you actually run: custom, fast, mobile-first, and set up to rank when someone searches your name or your category.",
    points: [
      "Custom design and build, never a template",
      "Portfolio and case-study pages that build credibility",
      "Technical SEO, schema and fast load times built in",
      "Handover training so your team can edit it",
    ],
    cta: "Build my site",
  },
  {
    id: "lead-generation",
    tone: "paper",
    serviceType: "Lead generation",
    title: "Lead generation for founders and CEOs",
    body: "We research buyers, partners and other prospects that fit your target market, qualify the list and organise it into a focused pipeline ready for outreach or sales follow-up.",
    points: [
      "Ideal-customer and prospect research",
      "Qualification and audience segmentation",
      "Focused prospect list built around your offer",
      "Pipeline prepared for outreach or sales follow-up",
    ],
    cta: "Build my lead list",
  },
  {
    id: "cold-email-outreach",
    tone: "paper",
    serviceType: "Cold email outreach",
    title: "Cold email outreach for founders and CEOs",
    body: "We prepare the sending setup, write the campaign and manage follow-up around a specific audience and offer, with SPF, DKIM and DMARC configured before launch.",
    points: [
      "Sending setup and domain authentication",
      "Audience-specific email copy",
      "Follow-up sequences and reply handling",
      "Campaign review and iteration",
    ],
    cta: "Start my outreach",
  },
  {
    id: "social-media",
    tone: "stone",
    serviceType: "Social media management",
    title: "Social media management for founders and CEOs",
    body: "Your LinkedIn, X and Instagram stay consistent: content planned around your positioning, posted on schedule, with routine comments and DMs handled. The goal is a clear, current picture of you and the business when people look you up.",
    points: [
      "Content plan built around your positioning",
      "Posts written in your voice",
      "Posting, replies and DM handling",
      "Profile and bio optimisation",
    ],
    cta: "Run my socials",
  },
];

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For building your founder presence.",
    body: "You have a real business but your personal online presence does not explain it clearly. We build the foundation.",
    includes: [
      "Custom website, designed and built from scratch",
      "On-page SEO and search console setup",
      "Copy written for your offer, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For staying visible.",
    body: "Everything in Launch, plus social media management and a professional email setup that keep your public presence current.",
    includes: [
      "Everything in Launch",
      "Social media management, posting and replies",
      "Social profiles set up and optimised on the agreed channels",
      "Custom email domain (you@yourname.com)",
    ],
  },
  {
    id: "reborn",
    name: "Reborn",
    line: "For building the pipeline.",
    body: "The full system: founder website, social media, lead generation and cold email outreach working together around the business.",
    includes: [
      "Everything in Presence",
      "Lead-generation workflow built around your target market",
      "Cold outreach campaigns, written and managed",
      "Prospect follow-up and enquiry tracking",
    ],
    featured: true,
  },
];

/* Internal links to the sibling persona pages.
   Remove any that aren't live yet: links to 404s hurt. */
export const PERSONAS = [
  { label: "Coaches", href: "/coaches" },
  { label: "Speakers", href: "/speakers" },
  { label: "Authors", href: "/authors" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Others", href: "/services" },
];

/* ---------------- Structured data (JSON-LD) ---------------- */

export function buildJsonLd() {
  const pageId = `${PAGE_URL}#webpage`;
  const crumbId = `${PAGE_URL}#breadcrumb`;
  const serviceId = `${PAGE_URL}#service`;

  const audience = { "@type": "Audience", audienceType: AUDIENCE_TYPE };

  return {
    "@context": "https://schema.org",
    "@graph": [
      /* Use the same full Organization + WebSite definitions as the rest of the site. */
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "WebPage",
        "@id": pageId,
        url: PAGE_URL,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": crumbId },
        about: { "@id": serviceId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": crumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Founders & CEOs", item: PAGE_URL },
        ],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Website, lead generation, outreach and social media management for founders and CEOs",
        serviceType: SERVICES.map((s) => s.serviceType),
        description: SEO.description,
        url: PAGE_URL,
        provider: { "@id": ORG_ID },
        areaServed: TARGET_MARKETS,
        audience,
        hasOfferCatalog: [
          {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: SERVICES.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.title,
                serviceType: s.serviceType,
                description: s.body,
                url: `${PAGE_URL}#${s.id}`,
              },
            })),
          },
          {
            "@type": "OfferCatalog",
            name: "Plans",
            itemListElement: PLANS.map((p) => ({
              "@type": "Offer",
              name: p.name,
              description: `${p.body} Includes: ${p.includes.join("; ")}.`,
            })),
          },
        ],
      },
    ],
  };
}

/* Escape "<" so the JSON can never close the <script> tag early. */
export const safeJson = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");
