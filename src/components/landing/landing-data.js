/* =============================================================
   Zarrar — landing page content for the new sections.
   -------------------------------------------------------------
   Plain data file (NO "use client") so the server component
   src/app/page.jsx can import FAQS for the FAQPage JSON-LD while the
   client components import the very same array to render it: the
   markup Google reads and the text people read can never drift.

   Claims policy: nothing here asserts awards, rankings, client
   counts or guaranteed results. "Premium / different" is shown
   through what is actually built (custom code, motion, performance),
   not through superlatives.
   ============================================================= */

import { ROUTES } from "@/lib/site";

/* ---------------- Ticker band ---------------- */
export const TICKER = [
  { text: "Custom websites", href: ROUTES.webDevelopment },
  { text: "Lead generation", href: ROUTES.leadGeneration },
  { text: "Cold email outreach", href: ROUTES.coldEmail },
  { text: "Social media management", href: ROUTES.socialMedia },
  { text: "Built, never templated" },
];

/* ---------------- "We don't build normal websites" ---------------- */
export const MANIFESTO = {
  title: ["We", "don't", "build", { stamp: "normal" }, "websites."],
  lede: "Most agencies hand you a theme with your logo on it. Zarrar designs and hand-codes custom websites with the care of a design-led studio: considered typography, real motion, fast load times. Then we connect the site to lead generation, cold email outreach and social media, so it is never working alone.",
  normalLabel: "A normal website",
  zarrarLabel: "A Zarrar build",
  rows: [
    ["Starts from a template", "Starts from your offer and your audience"],
    ["Looks like every competitor", "Layout, type and motion designed for your brand"],
    ["A brochure that sits there", "Wired into lead generation and outreach, so it earns enquiries"],
    ["Plugins, page builders and bloat", "Hand-coded, fast and technically clean for search"],
    ["Launched, then left alone", "Handed over properly, with support as you grow"],
  ],
};

/* ---------------- Services showcase ---------------- */
export const SHOWCASE = {
  title: ["Four", "services.", "One", "system."],
  lede: "Start with the piece you need most, or connect all four. The website explains the offer, lead generation finds the right prospects, cold email outreach starts the conversation, and social media keeps your expertise visible in between.",
};

export const PANELS = [
  {
    id: "website-development",
    index: "01",
    name: "Website development",
    kicker: "Custom websites with motion, not templates.",
    body: "Every site is designed and hand-coded around your offer: considered typography, purposeful animation, fast load times and the technical SEO foundation search engines need. It reads clearly, feels premium and gives every visitor an obvious next step.",
    points: [
      "Bespoke design and hand-written code, no themes or page builders",
      "Scroll motion and interaction designed for your brand",
      "Technical SEO, structured data and Core Web Vitals built in",
      "Handover, so you can edit it yourself",
    ],
    href: ROUTES.webDevelopment,
    cta: "Explore website development",
    tone: "blue",
    visual: "web",
  },
  {
    id: "lead-generation",
    index: "02",
    name: "Lead generation",
    kicker: "A researched list of the people worth contacting.",
    body: "We turn your offer into clear criteria, research companies and decision-makers from public sources, remove poor fits and check contact details. You get a focused, segmented prospect list rather than a giant unfiltered database.",
    points: [
      "Ideal-customer criteria agreed with you first",
      "Contact details checked, poor fits removed",
      "Segments ready for personalised messaging",
      "Refreshable as your market changes",
    ],
    href: ROUTES.leadGeneration,
    cta: "Explore lead generation",
    tone: "amber",
    visual: "leads",
  },
  {
    id: "cold-email-outreach",
    index: "03",
    name: "Cold email outreach",
    kicker: "Personalised emails that start real conversations.",
    body: "Each segment of your list gets a message written for its situation, sent from authenticated domains with follow-ups that add context and replies handled. No blasting one template to everyone.",
    points: [
      "A separate message for every segment",
      "SPF, DKIM and DMARC set up before sending",
      "Follow-ups that add something new",
      "Replies handled and fed into the next round",
    ],
    href: ROUTES.coldEmail,
    cta: "Explore cold email outreach",
    tone: "green",
    visual: "email",
  },
  {
    id: "social-media-management",
    index: "04",
    name: "Social media management",
    kicker: "Visibility that matches the quality of your site.",
    body: "Content planned around your offers, captions and posts written and published on schedule, and comments and DMs handled day to day, so your profiles stay active, useful and consistent with the website your prospects land on.",
    points: [
      "A content calendar built around your offers",
      "Posts written, designed and published for you",
      "Comments and messages handled day to day",
      "Profiles that match your website",
    ],
    href: ROUTES.socialMedia,
    cta: "Explore social media management",
    tone: "pink",
    visual: "social",
  },
];

/* ---------------- Finale: audience + founder ---------------- */
export const AUDIENCE = {
  title: ["Built", "for", "people", "who", "sell", "their", "expertise."],
  lede: "Our work is shaped around the way founders, speakers, coaches, authors and real estate agents actually win clients, so every audience has its own page.",
};

export const FOUNDER_BAND = {
  title: ["Founder-led.", "Not", "a", "faceless", "agency."],
};

/* ---------------- FAQ ----------------
   Rendered on the page AND exposed as FAQPage JSON-LD (page.jsx).
   Wording is kept consistent with the /services FAQ. */
export const FAQ_TITLE = "Questions about our websites, lead generation and outreach";

export const FAQS = [
  {
    q: "What does Zarrar do?",
    a: "Zarrar is a remote digital studio that designs and hand-codes custom websites, builds researched prospect lists, runs personalised cold email outreach and manages social media. You can start with one service or connect all four into a single system around your offer.",
  },
  {
    q: "What makes a Zarrar website different from a normal website?",
    a: "A normal website is usually a template with your logo on it. Zarrar designs each site from your offer and audience, writes the code by hand and adds purposeful motion and interaction, so it feels like a premium product rather than a theme. It also ships with fast load times, clean semantic HTML and structured data, so search engines can understand it.",
  },
  {
    q: "Do you build websites from templates?",
    a: "No. Our websites are custom-designed and custom-coded rather than assembled from a theme or page builder. That gives us full control over design, performance and animation, and avoids the plugin bloat that slows many sites down.",
  },
  {
    q: "What is lead generation, and how does Zarrar do it?",
    a: "Lead generation is finding the people most likely to need what you sell. We turn your offer into clear criteria, research companies and decision-makers from public sources, remove poor fits and check contact details, then hand you a focused, segmented prospect list that is ready for personalised outreach.",
  },
  {
    q: "How does cold email outreach work, and is it still worth it?",
    a: "Each segment of your prospect list gets a message written for its situation, sent from authenticated domains with follow-ups that add context. For many service businesses it is still worth it when it is targeted and personalised, because generic blasts perform worse than they used to. It works best with a specific offer and a well-defined audience, and results depend on your market and timing, so we never promise a fixed number of meetings.",
  },
  {
    q: "Who does Zarrar work with?",
    a: "Founders, entrepreneurs and CEOs, speakers, coaches, authors and real estate agents, plus other service businesses that sell expertise. Clients are mainly in the United States, the United Kingdom and Europe, and everything runs remotely.",
  },
  {
    q: "Will a Zarrar website help me rank on Google?",
    a: "Every site ships with the technical foundation search engines need: clean semantic HTML, fast load times and good Core Web Vitals, proper page titles and descriptions, a sitemap and structured data describing your business. That foundation makes ranking possible. Where you land also depends on how competitive your market is and on content and links built over time.",
  },
  {
    q: "How do I get started?",
    a: "Tell us what you sell and who you want to reach. You will get a clear recommendation on where to start, and a fixed quote before any work begins.",
  },
];
