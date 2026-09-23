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

export const SERVICES = [
  {
    id: "web-development",
    title: "Website Development & Portfolio Design",
    body: "A fast, custom website that doubles as your portfolio and says what you do in the first five seconds. Designed from scratch, optimized for search engines, and handed over so you can update it yourself.",
    cta: "Build my website",
    icon: "web",
  },
  {
    id: "lead-generation",
    title: "Lead Generation & Cold Email Outreach",
    body: "We find the people who already need what you sell, write cold emails that get replies, and manage the follow-up. You get booked calls, not a spreadsheet of contacts.",
    cta: "Get me leads",
    icon: "outreach",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    body: "Content planned around your offers, shot and edited by us, and posted on schedule. We handle comments and DMs so your social media builds trust instead of just filling a calendar.",
    cta: "Manage my social media",
    icon: "social",
  },
];

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For getting found.",
    body: "You have the work but no proper home online. We build one.",
    includes: [
      "Custom website, designed and built from scratch",
      "On-page SEO and Google Business setup",
      "Copy written for your offer, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For looking established.",
    body: "Everything in Launch, plus the accounts that make you look like a real operation.",
    includes: [
      "Everything in Launch",
      "Social media management, posting and replies",
      "Instagram handle set up and built out",
      "Custom email domain (you@yourname.com)",
    ],
  },
  {
    id: "growth",
    name: "Reborn",
    line: "For bringing in clients.",
    body: "The full engine. We build the presence, then go and get the work.",
    includes: [
      "Everything in Presence",
      "Portfolio site that closes on your behalf",
      "Cold outreach campaigns, written and sent",
      "Lead generation and booked calls in your calendar",
    ],
    featured: true,
  },
];
