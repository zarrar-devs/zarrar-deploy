/* =============================================================
   Zarrar — /authors  ·  shared content (NOT a client component)
   -------------------------------------------------------------
   This file intentionally has NO "use client" directive.

   Why this file exists: CHAPTERS / FAQS / EDITIONS used to live
   as named exports inside Authors.jsx, which has "use client" at
   the top. When a Server Component (page.jsx) imports a named
   export from a "use client" module, Next.js turns EVERY export
   of that module into a client reference for the server bundle —
   including plain data arrays, not just components. On the
   server, CHAPTERS was no longer a real array, just a reference
   object, so CHAPTERS.map(...) threw "is not a function".

   Fix: keep all plain data (and the small icon components, which
   don't use any client-only APIs) in this plain file. Both the
   client component (Authors.jsx) and the server page (page.jsx)
   import from here, so on the server these stay real arrays.
   ============================================================= */

/* ---------------- Icons (decorative — hidden from AT) ---------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  focusable: "false",
  "aria-hidden": "true",
};

export function BookIcon() {
  return (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path className="draw" d="M20 10c-3-3-8-4-14-3v22c6-1 11 0 14 3 3-3 8-4 14-3V7c-6-1-11 0-14 3z" />
      <path className="draw" d="M20 10v22" />
    </svg>
  );
}

export function OutreachIcon() {
  return (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path className="draw" d="M5 20L34 8l-5 25-9-8-7 7v-9z" />
      <path className="draw" d="M15 23L34 8" />
    </svg>
  );
}

export function SocialIcon() {
  return (
    <svg viewBox="0 0 40 40" {...stroke}>
      <circle className="draw" cx="10" cy="12" r="4" />
      <circle className="draw" cx="30" cy="10" r="4" />
      <circle className="draw" cx="20" cy="30" r="4" />
      <path className="draw" d="M14 14l10 14" />
      <path className="draw" d="M13 11l13 -1" />
      <path className="draw" d="M27 13l-4 13" />
    </svg>
  );
}

/* =====================  PERSONA-SPECIFIC CONTENT  ===================== */

/* Factual statements about how the work is done — every line below
   is something the packages actually include. Delete any line that
   stops being true. */
export const PROMISES = [
  {
    title: "Custom-built",
    line: "Your author website is designed around your books, audience, writing and next career goal instead of a generic template.",
  },
  {
    title: "Search-ready",
    line: "The site is structured so your name, books, subjects and important pages are easy for people and search engines to understand.",
  },
  {
    title: "Targeted outreach",
    line: "We research relevant agents, hosts, booksellers, reviewers or media contacts instead of sending the same pitch to everyone.",
  },
  {
    title: "Built to hand over",
    line: "You get a maintainable site and a clear handover so you can make routine changes without needing a developer for every edit.",
  },
];

/* Add REAL testimonials here, with permission. While this array is
   empty the whole section is skipped. Example shape:
   { quote: "…", name: "Real Name", role: "Author of Title", url: "https://…" } */
export const TESTIMONIALS = [];

/* Broad author categories used as audience examples; keep only the
   categories that reflect the markets Zarrar genuinely serves. */
export const GENRES = [
  { title: "Fiction authors", line: "A polished home for books, reviews, events, press and the next release." },
  { title: "Nonfiction & memoir", line: "A platform that makes your expertise, story and media angles easy to understand." },
  { title: "Self-published authors", line: "A professional author platform that connects books, readers, reviews, events and outreach." },
  { title: "Poets & essayists", line: "A focused portfolio for your work, publications, readings and future projects." },
  { title: "Ghostwriters & co-authors", line: "A private or public portfolio that communicates the work and the services you want to be known for." },
  { title: "Authors building a wider platform", line: "Use the website, content and outreach system to support speaking, media, partnerships and future books." },
];

/* Four clear services: website development, lead generation, cold email outreach and social media management. */
export const CHAPTERS = [
  {
    numeral: "I",
    title: "Website development for authors",
    body: "A custom author website with book pages, synopsis, reviews, buy links, events, press information and a clear path for readers or media to contact you.",
    cta: "Build my author website",
    icon: <BookIcon />,
  },
  {
    numeral: "II",
    title: "Lead generation for authors",
    body: "We research agents, podcast hosts, booksellers, reviewers and media contacts relevant to your work, then organise a focused prospect list around your goals.",
    cta: "Build my prospect list",
    icon: <OutreachIcon />,
  },
  {
    numeral: "III",
    title: "Cold email outreach for authors",
    body: "We write and manage targeted email outreach to relevant agents, hosts, booksellers, reviewers or media contacts, with follow-up built around the right pitch.",
    cta: "Start my outreach",
    icon: <OutreachIcon />,
  },
  {
    numeral: "IV",
    title: "Social media management for authors",
    body: "We build a practical content system from your writing, readings, reviews, interviews and book news, publish it consistently and handle routine replies.",
    cta: "Manage my social media",
    icon: <SocialIcon />,
  },
];

export const TIMELINE = [
  {
    when: "Weeks 1–2",
    title: "Foundation",
    body: "Author website live with book pages, press kit and on-page SEO in place; an outreach list of agents, bookshops and press built.",
  },
  {
    when: "Weeks 3–6",
    title: "Outreach + content",
    body: "Pitches to podcasts, bookshops and reviewers go out on schedule; social content starts posting from your backlist, readings and reviews.",
  },
  {
    when: "Weeks 7–12",
    title: "Momentum",
    body: "We use outreach replies, search behaviour and social engagement to improve the next campaign and content while the website keeps your work easy to discover between releases.",
  },
];

export const FAQS = [
  {
    q: "Why do I need an author website if my books are already on Amazon?",
    a: "Amazon can sell the book. Your own website gives readers, agents, media and event organisers one place to understand your work, explore your backlist and contact you directly." ,
  },
  {
    q: "What's actually included in a premium author website?",
    a: "A custom design (not a template), book pages with buy links and reviews, a short bio and photo press can use, a press kit, and the on-page SEO — page titles, structured data, fast load times — that lets people searching for a writer in your genre actually land on you.",
  },
  {
    q: "Will my author website actually show up in Google search?",
    a: "Ranking takes ongoing work, not a one-time setup, and nobody can promise a position. What we do guarantee is the technical foundation: clean semantic markup, fast performance, a proper sitemap and structured data for your books and bio. Content and links then build on top of that.",
  },
  {
    q: "Can lead generation and outreach help me find relevant agents, press and podcast opportunities?",
    a: "We research and build the list of agents, hosts, bookshops and reviewers already covering your genre, then send the outreach and follow-up. Whether someone says yes depends on your book and timing, so we can't promise placements, but you'll have a real, targeted list in front of the right people instead of hoping to be discovered.",
  },
  {
    q: "Do you actually manage my social media, or just tell me what to post?",
    a: "We handle it day to day — planning the content calendar, writing and posting from your work and reviews, and responding to comments and messages, so it runs without needing your time.",
  },
  {
    q: "How long does it take to build an author website and start outreach?",
    a: "The website is usually ready within the first couple of weeks. Outreach and social publishing can begin as the core platform is prepared, while responses and visibility build over time depending on your genre, audience and release calendar.",
  },
];

/* =====================  SHARED / STRUCTURAL  ===================== */

export const EDITIONS = [
  {
    id: "paperback",
    name: "Paperback",
    line: "For building the author platform.",
    body: "You have the book, but the online presence is fragmented. We build one focused home for your writing, books, press and contact path.",
    includes: [
      "Premium author website, custom-designed and built from scratch",
      "Book pages with buy links, reviews and press kit",
      "On-page SEO, structured data and Google Search Console setup",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "hardcover",
    name: "Hardcover",
    line: "For staying visible between releases.",
    body: "Everything in Paperback, plus social media management that keeps the work circulating while you write the next book.",
    includes: [
      "Everything in Paperback",
      "Social media management — content, posting and replies",
      "Custom email domain (you@yourname.com)",
      "Quarterly SEO check-in as your backlist grows",
    ],
  },
  {
    id: "reborn",
    name: "Reborn",
    line: "For connecting the platform to new opportunities.",
    body: "The complete system: website, social media, lead generation and cold email outreach built around the readers, media and professional opportunities you want next.",
    includes: [
      "Everything in Hardcover",
      "Lead generation: a built list of agents, press and podcasts in your genre",
      "Cold outreach campaigns and follow-up, run on your behalf",
      "Interviews and pitches tracked in one shared calendar",
    ],
    featured: true,
  },
];
