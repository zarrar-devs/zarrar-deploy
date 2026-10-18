/* =============================================================
   Zarrar — /services data
   -------------------------------------------------------------
   Plain data file (NO "use client"), imported by both page.jsx
   (server, for JSON-LD) and Services.jsx (client). Keeping it out
   of the client file is what fixes "SERVICES.map is not a function".

   Icons are string keys ("web" | "leads" | "outreach" | "social"),
   mapped to real components in Services.jsx.
   ============================================================= */

import { ROUTES } from "@/lib/site";

export const SERVICES = [
  {
    id: "web-development",
    href: ROUTES.webDevelopment,
    title: "Website Development",
    stage: "The foundation",
    body: "A custom business or portfolio website that explains your offer, builds credibility and gives visitors a clear next step. We handle the design, development, technical SEO and handover.",
    cta: "Build my website",
    icon: "web",
  },
  {
    id: "lead-generation",
    href: ROUTES.leadGeneration,
    title: "Lead Generation",
    stage: "The prospect list",
    body: "We research the people and companies that fit your ideal customer, qualify them against clear criteria and build a focused, segmented prospect list, ready for personalised outreach.",
    cta: "Get me leads",
    icon: "leads",
  },
  {
    id: "cold-email-outreach",
    href: ROUTES.coldEmail,
    title: "Cold Email Outreach",
    stage: "The conversation",
    body: "Personalised cold emails written for each segment of your list, with authenticated sending, follow-ups and reply handling, designed to start relevant sales conversations.",
    cta: "Start my outreach",
    icon: "outreach",
  },
  {
    id: "social-media",
    href: ROUTES.socialMedia,
    title: "Social Media Management",
    stage: "The visibility",
    body: "A consistent social media system built around your expertise and offers: content planning, captions, publishing and routine replies so your profiles stay active, useful and easy to understand.",
    cta: "Manage my social media",
    icon: "social",
  },
];

/* "How it works" — the explanation of lead generation + outreach.
   `mock` picks the little illustration in Services.jsx. */
export const FLOW = [
  {
    id: "define",
    tag: "Define",
    title: "Decide who is worth contacting",
    body: "We turn your offer into clear criteria: role, industry, location, company size and buying signals.",
    mock: "criteria",
  },
  {
    id: "list",
    tag: "Research",
    title: "Build the prospect list",
    body: "We research companies and decision-makers, remove poor fits and check contact details before anything is sent.",
    mock: "list",
  },
  {
    id: "write",
    tag: "Personalise",
    title: "Write to each segment",
    body: "Every group gets its own message, and key prospects get one researched detail that shows why you are writing to them.",
    mock: "email",
  },
  {
    id: "send",
    tag: "Outreach",
    title: "Send, follow up, improve",
    body: "Authenticated sending, follow-ups that add context, and replies that sharpen the next round.",
    mock: "followup",
  },
];

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For getting your website live.",
    body: "You have a real offer but your website does not explain it clearly. We build the online foundation.",
    includes: [
      "Custom website, designed and built from scratch",
      "On-page SEO and technical search setup",
      "Copy written for your offer, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For staying visible.",
    body: "Everything in Launch, plus ongoing social media management and a professional email setup.",
    includes: [
      "Everything in Launch",
      "Social media management, posting and replies",
      "Social profiles set up and optimised on the agreed channels",
      "Custom email domain (you@yourname.com)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    line: "For connecting the system.",
    body: "The complete system: a clear website, social media management, lead generation and cold email outreach working together around one offer and audience.",
    includes: [
      "Everything in Presence",
      "Conversion-focused website and enquiry path",
      "Cold outreach campaigns, written and sent",
      "Lead generation and outreach built around your target audience",
    ],
    featured: true,
  },
];
