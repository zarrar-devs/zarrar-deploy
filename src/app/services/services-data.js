/* =============================================================
   Zarrar — /services data
   -------------------------------------------------------------
   ROOT CAUSE FIX: this data used to live inside Services.jsx,
   which is a "use client" file. page.jsx (a server component)
   imported SERVICES/PLANS from it to build the Service/Offer
   JSON-LD — but importing an export from a "use client" file
   into a server component doesn't give you the real array, it
   gives you an internal client-reference object with no .map(),
   hence "SERVICES.map is not a function".

   RealEstate.jsx / Founders.jsx never hit this because their data
   already lives in a separate plain file (realestate-data.js /
   founders-data.js) that isn't "use client". This file follows
   that same convention.

   Icons are stored as a string key ("web" | "outreach" | "social")
   instead of a JSX element — a plain data file can't export JSX
   with hooks/refs baggage safely for both server and client use,
   and Services.jsx maps the key to the actual icon component.

   Nothing here changes the SEO content itself — same titles,
   same body copy, same plan includes — so the Service/Offer
   schema in page.jsx renders identically once this import works.
   ============================================================= */

import { ROUTES } from "@/lib/site";

export const SERVICES = [
  {
    id: "web-development",
    href: ROUTES.webDevelopment,
    title: "Website Development",
    body: "A custom business or portfolio website that explains your offer, builds credibility and gives visitors a clear next step. We handle the design, development, technical SEO and handover.",
    cta: "Build my website",
    icon: "web",
  },
  {
    id: "lead-generation",
    href: ROUTES.leadGeneration,
    title: "Lead Generation",
    body: "We research the people and companies that fit your ideal customer profile, qualify them against clear criteria and organise a focused prospect list ready for outreach or sales follow-up.",
    cta: "Get me leads",
    icon: "outreach",
  },
  {
    id: "cold-email-outreach",
    href: ROUTES.coldEmail,
    title: "Cold Email Outreach",
    body: "Targeted cold email outreach built around one audience and one clear offer, with sending setup, personalised copy, follow-up and reply handling designed to start relevant sales conversations.",
    cta: "Start my outreach",
    icon: "outreach",
  },
  {
    id: "social-media",
    href: ROUTES.socialMedia,
    title: "Social Media Management",
    body: "A consistent social media system built around your expertise and offers: content planning, captions, publishing and routine replies so your profiles stay active, useful and easy to understand.",
    cta: "Manage my social media",
    icon: "social",
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
