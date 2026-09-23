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
    title: "Custom-coded",
    line: "Every site is designed and built from scratch, not dropped into a template.",
  },
  {
    title: "Search-ready",
    line: "Clean markup, a sitemap and structured data are in place from launch day.",
  },
  {
    title: "Researched outreach",
    line: "Pitches go to agents, hosts and reviewers who already cover your genre.",
  },
  {
    title: "Handed over properly",
    line: "You get training so you can edit your own site without calling a developer.",
  },
];

/* Add REAL testimonials here, with permission. While this array is
   empty the whole section is skipped. Example shape:
   { quote: "…", name: "Real Name", role: "Author of Title", url: "https://…" } */
export const TESTIMONIALS = [];

/* Example author categories — replace or trim to match the
   real author's actual genre and body of work. */
export const GENRES = [
  { title: "Fiction & novelists", line: "A site that sells the story before the sample chapter does." },
  { title: "Nonfiction & memoir", line: "Credibility and a clear pitch, ready for press and podcasts." },
  { title: "Self-published authors", line: "Everything a publisher would handle, minus the publisher." },
  { title: "Poets & essayists", line: "A home for the work between magazine credits and readings." },
  { title: "Ghostwriters & co-authors", line: "A portfolio that lets the work speak without naming names." },
  { title: "Nonfiction experts", line: "Turn a body of expertise into speaking, media and book deals." },
];

/* Three services only: premium website development, lead
   generation + outreach, and social media management. */
export const CHAPTERS = [
  {
    numeral: "I",
    title: "Premium website development",
    body: "A custom-built author site, not a template — synopsis, reviews, buy links, events and a press kit, designed and coded to sell the book and to rank for your name and your genre.",
    cta: "Build my site",
    icon: <BookIcon />,
  },
  {
    numeral: "II",
    title: "Lead generation & outreach",
    body: "We build the list of literary agents, podcast hosts, bookshops and press already covering your genre, then run the cold outreach and follow-up that turns that list into conversations and bookings.",
    cta: "Get me covered",
    icon: <OutreachIcon />,
  },
  {
    numeral: "III",
    title: "Social media management",
    body: "Content planned and posted from your writing, readings and reviews, plus replies handled day to day — so you stay visible between book launches without doing the posting yourself.",
    cta: "Run my socials",
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
    body: "Replies from outreach start to build up, the site keeps gaining ground in search, and social keeps you visible between releases.",
  },
];

export const FAQS = [
  {
    q: "Do I need an author website if my books are already listed on Amazon?",
    a: "Amazon sells the book you already have. A site sells you — synopsis, reviews, backlist, press kit and the SEO that gets you found — for the agents, press and readers deciding whether to follow your next one.",
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
    q: "Can lead generation and outreach really get me agents, press and podcast bookings?",
    a: "We research and build the list of agents, hosts, bookshops and reviewers already covering your genre, then send the outreach and follow-up. Whether someone says yes depends on your book and timing, so we can't promise placements, but you'll have a real, targeted list in front of the right people instead of hoping to be discovered.",
  },
  {
    q: "Do you actually manage my social media, or just tell me what to post?",
    a: "We handle it day to day — planning the content calendar, writing and posting from your work and reviews, and responding to comments and messages, so it runs without needing your time.",
  },
  {
    q: "How long before I see results?",
    a: "The website is usually ready within the first couple of weeks. Outreach replies and social growth typically build over the following weeks once campaigns are running — timing depends on your genre and release calendar.",
  },
];

/* =====================  SHARED / STRUCTURAL  ===================== */

export const EDITIONS = [
  {
    id: "paperback",
    name: "Paperback",
    line: "For getting found.",
    body: "You've got the book, but no real home for it online. We design and build one, SEO included.",
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
    line: "For staying visible.",
    body: "Everything in Paperback, plus a social media presence that runs without you.",
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
    line: "For selling more books.",
    body: "The full engine. We build the presence, keep it visible, then go after the readers and the press.",
    includes: [
      "Everything in Hardcover",
      "Lead generation: a built list of agents, press and podcasts in your genre",
      "Cold outreach campaigns and follow-up, run on your behalf",
      "Interviews and pitches tracked in one shared calendar",
    ],
    featured: true,
  },
];
