/* =============================================================
   Zarrar — /speakers  ·  content + structured data
   -------------------------------------------------------------
   No "use client" here on purpose: page.js (server) builds the
   JSON-LD from this file, and Speakers.jsx (client) renders it.
   That keeps the schema code out of the client bundle.

   Before going live:
   - AS_SEEN_AT is empty on purpose. The "As seen at" strip only
     renders when it has entries. Add REAL past engagements only.
   - FAQ answers describe the service in general terms. Check that
     each one matches how you actually work.
   ============================================================= */

import { SITE_URL, CONTACT_EMAIL as SHARED_CONTACT_EMAIL, organizationSchema, websiteSchema, ORG_ID, WEBSITE_ID } from "@/lib/site";

export const SITE = SITE_URL;
export const PAGE_PATH = "/speakers";
export const PAGE_URL = `${SITE}${PAGE_PATH}`;
export const CONTACT_EMAIL = SHARED_CONTACT_EMAIL;

export const PAGE_TITLE = "Speaker Website, Lead Generation & Outreach | Zarrar";
/* keep under ~160 characters so Google doesn't cut it off */
export const PAGE_DESCRIPTION =
  "Website development, lead generation, cold email outreach and social media for keynote speakers who want a stronger online presence and more event opportunities.";

/* Real past engagements only. Leave empty and the strip is hidden. */
export const AS_SEEN_AT = [];

/* What a speaker page includes — real content, not sample talks. */
export const PAGE_PARTS = [
  {
    title: "Talk topics",
    line: "Clear keynote topics organised around the problems, audiences and outcomes an event organiser is trying to deliver.",
  },
  {
    title: "Speaker reel",
    line: "A focused reel and selected clips that help an organiser understand your delivery, subject matter and stage presence quickly.",
  },
  {
    title: "One-sheet and bio",
    line: "A speaker one-sheet, short bio and booking information written so an organiser can forward the details internally.",
  },
  {
    title: "Past engagements",
    line: "Real stages, clients, testimonials and media proof presented clearly instead of buried in a long biography.",
  },
  {
    title: "Booking enquiry form",
    line: "A straightforward enquiry path for availability, event type, date, location and the details you need before a call.",
  },
  {
    title: "Fees and logistics",
    line: "Clear guidance on fees, travel, AV and event requirements so organisers know what working with you involves.",
  },
];

export const TIMELINE = [
  {
    num: "Weeks 1–2",
    title: "Foundation",
    body: "Speaker website live with your topics, reel, proof and booking path in place; the first list of relevant events and organisers is researched.",
  },
  {
    num: "Weeks 3–6",
    title: "Event outreach and content",
    body: "Targeted outreach to relevant organisers begins, while social content turns your talks, clips and ideas into useful proof between speaking dates.",
  },
  {
    num: "Weeks 7–12",
    title: "Refine and repeat",
    body: "Replies, objections and organiser feedback shape the next campaigns, while the website and content continue working between events.",
  },
];

/* `icon` is a key, not JSX, so this file stays server-safe. */
export const SERVICES = [
  {
    id: "web-development",
    title: "Website development for speakers",
    body: "A custom speaker website that makes your topics, proof, reel and booking process easy for organisers to understand and share internally.",
    cta: "Build my speaker website",
    icon: "web",
  },
  {
    id: "lead-generation",
    title: "Lead generation for speakers",
    body: "We research conferences, corporate events, summits and program teams that fit your topics, audience and preferred event type, then organise the prospects for outreach.",
    cta: "Build my event list",
    icon: "outreach",
  },
  {
    id: "cold-email-outreach",
    title: "Cold email outreach to event organisers",
    body: "We write and send targeted email campaigns to relevant organisers and program teams, then manage follow-up so your outreach stays consistent without sounding generic.",
    cta: "Start my event outreach",
    icon: "outreach",
  },
  {
    id: "social-media",
    title: "Social media management for speakers",
    body: "We turn your talks, clips, ideas and event appearances into a consistent social presence that keeps you visible between speaking opportunities.",
    cta: "Manage my social media",
    icon: "social",
  },
];

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For building your speaker presence.",
    body: "You have strong talks but no focused online destination for organisers, bureaus and event teams. We build it.",
    includes: [
      "Custom speaker website with topics, reel and booking form",
      "On-page SEO and search console setup",
      "Bio and copy written for organisers, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For staying visible between events.",
    body: "Everything in Launch, plus consistent social content and the professional profile that keeps your work visible between events.",
    includes: [
      "Everything in Launch",
      "Social media management: posting and replies",
      "Social profiles set up and optimised on the agreed channels",
      "Custom email domain (you@yourname.com)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    line: "For building a repeatable booking pipeline.",
    body: "The full system: speaker website, social content, lead generation and event outreach working together.",
    includes: [
      "Everything in Presence",
      "Outreach to event organisers, written and sent",
      "Follow-ups and reply handling",
      "Enquiry and booking follow-up organised around your speaking calendar",
    ],
    featured: true,
  },
];

/* Plan names are read from PLANS so the FAQ can never drift from the cards. */
const planName = (id) => PLANS.find((p) => p.id === id)?.name ?? id;

export const FAQS = [
  {
    q: "Why should a keynote speaker have a website?",
    a: "A bureau listing or LinkedIn profile can be useful, but a speaker website gives organisers one place to review your topics, reel, past engagements, bio, logistics and booking path before they contact you." ,
  },
  {
    q: "What should a speaker website include?",
    a: "A clear list of talk topics, a short reel or clips from past talks, real past engagements and testimonials, a one-sheet, a way to check availability or request a booking, and enough SEO that people searching for a speaker on your topic can actually find you.",
  },
  {
    q: "Can you help with lead generation and outreach to event organisers?",
    a: "Yes. We research organisers and programs that fit your topics, build the prospect list, write the outreach and manage follow-up. Whether an organiser replies or books a speaker depends on your fit, timing and the event calendar."
  },
  {
    q: "How does cold email outreach to event organisers work?",
    a: "We build a targeted list of conferences, summits and corporate events that fit your topics, write the emails, send them on a schedule and follow up. The aim is to create relevant organiser conversations while you spend your time preparing to speak.",
  },
  {
    q: "Is social media worth it between speaking seasons?",
    a: "It's what keeps you visible between seasons. Clips, takeaways and behind-the-scenes content from past talks give organisers a reason to remember you months after they first saw you, not just during conference season.",
  },
  {
    q: "Which speaker plan is right for me?",
    a: `Start with ${planName("launch")} if you need the speaker website and search foundation. Choose ${planName("presence")} if you also want social media management and a professional email domain. Choose ${planName("growth")} if you want lead generation and event outreach added to the system. You can move up whenever you're ready.`,
  },
  {
    q: "How long does speaker outreach take to produce results?",
    a: "Website work and campaign preparation can start quickly, but event responses depend on your topic, the organisers targeted, the event calendar and the quality of the offer. We focus on building a consistent, relevant outreach process rather than promising a number of bookings."
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
          { "@type": "ListItem", position: 2, name: "For speakers", item: PAGE_URL },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Speaker website development, lead generation, cold email outreach and social media management",
        serviceType: ["Speaker website development", "Lead generation for speakers", "Cold email outreach to event organisers", "Social media management for speakers"],
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        audience: { "@type": "Audience", audienceType: "Keynote speakers" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services and plans for speakers",
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
