/* =============================================================
   Zarrar — /coaches            (app/coaches/page.jsx)
   -------------------------------------------------------------
   This is a SERVER component on purpose (no "use client"):
   - metadata + JSON-LD live in the same file as the content
   - the markup ships as plain HTML, so Googlebot doesn't need JS
     to read a single word
   - only <CoachesMotion /> (GSAP) and <ContactProvider /> (modal
     state) are hydrated on the client

   Files in this folder:
     page.jsx               ← this file (content, SEO, markup)
     CoachesMotion.jsx       ← all GSAP animation (client)
     ContactProvider.jsx     ← modal state + context (client)
     ContactTriggerLink.jsx  ← link that opens the modal (client)
     coaches.css             ← styles, fully scoped under .coaches-page

   CLONING FOR OTHER PERSONAS
   Rewrite everything above the "SHARED" line per persona:
   URL/constants, title, description, H1, sub-copy, pain points,
   FAQs. Google punishes near-duplicate pages, so the persona-
   specific part must be the bulk of each page — different
   title, H1, intro, pain points and FAQ answers every time.

   Keep the service claims below aligned with what Zarrar actually delivers.
   ============================================================= */

import { Fragment } from "react";
import Link from "next/link";
import { Archivo, Inter_Tight } from "next/font/google";
import CoachesMotion from "./CoachesMotion";
import ContactProvider from "./ContactProvider";
import ContactTriggerLink from "./ContactTriggerLink";
import "./coaches.css";

/* Self-hosted fonts (no render-blocking @import from Google).
   If your root layout already loads these, delete this block and
   the two variables on the root <div> below. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

/* =====================  PERSONA-SPECIFIC  ===================== */

import {
  SITE_URL,
  ROUTES,
  CONTACT_EMAIL,
  organizationSchema,
  websiteSchema,
} from "@/lib/site";
// Domain, route and email now come from src/lib/site.js — this used to
// hardcode an old domain and build PAGE_URL as
// `${SITE_URL}/coaches`, a route that does not exist (the folder
// is /coaches). zarrar.co is now the official domain.
const PAGE_URL = `${SITE_URL}${ROUTES.coaches}`;
// Swap for a Calendly / Cal.com link if you have one.
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Website & lead generation for my coaching business"
)}`;

// Title ≈ 60 chars, description ≈ 155 chars: what Google shows before truncating.
// Primary keyword leads the title (front-loading helps both CTR and relevance).
const PAGE_TITLE = "Coach Website Design, Lead Generation & Outreach | Zarrar";
const PAGE_DESC =
  "Website development, lead generation, cold email outreach and social media for coaches seeking a stronger online presence and more qualified enquiries.";
const SOCIAL_TITLE = "Online presence and lead generation for coaches | Zarrar";
// Next.js auto-detects app/coaches/opengraph-image.(jpg|png|gif) and
// twitter-image.(jpg|png|gif) and injects them into the metadata below —
// add those files (1200×630) instead of hardcoding an `images` array here,
// or you'll end up with duplicate/conflicting OG tags.

export const metadata = {
  // If your root layout already sets metadataBase, delete this line —
  // the closest one to the leaf route wins and duplicating it is harmless
  // but pointless.
  metadataBase: new URL(SITE_URL),
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  authors: [{ name: "Zarrar", url: SITE_URL }],
  creator: "Zarrar",
  publisher: "Zarrar",
  category: "Business",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Zarrar",
    title: SOCIAL_TITLE,
    description: PAGE_DESC,
    locale: "en_US",
    // Add app/coaches/opengraph-image.png (1200×630) — Next injects it
    // into `images` automatically, no need to list it here.
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: PAGE_DESC,
    
  },
};

// Split from `metadata` since Next 14+ (themeColor moved out of the
// metadata export into its own `viewport` export).
export const viewport = {
  themeColor: "#f2eee3",
};

const PAIN_POINTS = [
  {
    title: "Your offer is hard to understand quickly",
    line: "A visitor should know who you coach, what problem you solve and what they can do next without hunting through five pages.",
  },
  {
    title: "Your audience sees content, but not a clear next step",
    line: "Posts can build attention, but your profile still needs a path from useful content to your website, enquiry form or discovery call.",
  },
  {
    title: "Your pipeline depends too heavily on referrals",
    line: "Referrals are valuable, but a coaching business is easier to grow when you also have a repeatable way to find and contact people who fit the offer.",
  },
];

const TIMELINE = [
  {
    num: "Weeks 1–2",
    title: "Position and build",
    body: "We clarify the coaching offer, build the core website and booking path, and prepare the first audience and prospecting segments.",
  },
  {
    num: "Weeks 3–6",
    title: "Publish and reach out",
    body: "The website is live, social content starts publishing and targeted outreach begins with one clear audience and one clear offer.",
  },
  {
    num: "Weeks 7–12",
    title: "Learn and improve",
    body: "We use real enquiries, replies and engagement to refine the message, content and outreach rather than guessing what the market wants.",
  },
];

const FAQS = [
  {
    q: "What should a coach's website actually do?",
    a: "It should make your niche and offer obvious, show enough proof to build trust, answer the key questions a prospect has before a call, and give them one clear next step such as booking a discovery call or sending an enquiry.",
  },
  {
    q: "What should a coach's website include?",
    a: "A clear statement of who you help and how, a way to book a call without emailing back and forth, some proof you know what you're doing, and enough on-page SEO that people searching for a coach like you can actually find you.",
  },
  {
    q: "What is included in your coaching marketing service?",
    a: "The work can include website development, on-page SEO, lead generation, cold email outreach and social media management. You can start with one channel or combine them so the website, prospecting and content all support the same offer.",
  },
  {
    q: "Is social media management worth it if I'm not a content creator?",
    a: "It's less about content skill and more about consistency. Most coaches stop posting because it becomes one more job. We handle the planning, posting and replies, so the account keeps showing up even when you're busy with clients.",
  },
  {
    q: "Can you get me coaching leads without me doing outreach myself?",
    a: "Yes. We can handle the prospect research, outreach and follow-up so you do not have to manage the campaign yourself. The goal is to create more relevant conversations, not hand you another spreadsheet to chase."
  },
  {
    q: "How long before I see booked discovery calls?",
    a: "Website launch, outreach and social publishing happen on different schedules. Search visibility and outreach results depend on your niche, offer, audience and campaign quality, so we set expectations around the work rather than promise a fixed result.",
  },
  {
    q: "What's the difference between the Launch, Presence and Growth plans?",
    a: "Each plan adds to the one before it. Launch is the website and search foundation. Presence adds social media management and a professional email domain. Growth connects the website and social presence to lead generation and cold email outreach."
  },
  {
    q: "Who is this service for?",
    a: "We work with independent coaches and coaching businesses across niches, including life, career, business, executive and other specialist coaching offers. The key is having a clear audience, a real coaching offer and a reason for a prospect to start a conversation.",
  },
];

// Flip `live: true` only once that page actually exists (no dead links).
const PERSONAS = [
  // Only routes that actually exist are live. /for-creators and
  // /for-consultants have no page at all, so they were dropped
  // instead of pointed at a 404 — add them back once those routes ship.
  { label: "authors", href: ROUTES.authors, live: true },
  { label: "founders", href: ROUTES.entrepreneurs, live: true },
  { label: "speakers", href: ROUTES.speakers, live: true },
  { label: "real estate agents", href: ROUTES.realEstate, live: true },
];

/* =====================  SHARED ACROSS PERSONAS  ===================== */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function WebIcon() {
  return (
    <svg viewBox="0 0 48 48" focusable="false" {...stroke}>
      <rect className="draw" x="4" y="8" width="40" height="32" rx="3" />
      <line className="draw" x1="4" y1="17" x2="44" y2="17" />
      <path className="draw" d="M19 25l-5 5 5 5" />
      <path className="draw" d="M29 25l5 5-5 5" />
    </svg>
  );
}

function OutreachIcon() {
  return (
    <svg viewBox="0 0 48 48" focusable="false" {...stroke}>
      <path className="draw" d="M5 24L43 9l-6 30-11-9-8 8v-10z" />
      <path className="draw" d="M18 28L43 9" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 48 48" focusable="false" {...stroke}>
      <circle className="draw" cx="12" cy="15" r="5" />
      <circle className="draw" cx="36" cy="12" r="5" />
      <circle className="draw" cx="24" cy="36" r="5" />
      <path className="draw" d="M17 17l14-4" />
      <path className="draw" d="M14 20l8 12" />
      <path className="draw" d="M34 17l-8 15" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

const SERVICES = [
  {
    id: "web-development",
    title: "Website development for coaches",
    body: "A custom coaching website that makes your niche, offer, proof and next step obvious, with technical SEO and a clear enquiry or booking path.",
    cta: "Build my website",
    icon: <WebIcon />,
  },
  {
    id: "lead-generation",
    title: "Lead generation for coaches",
    body: "We research the people and businesses that fit your ideal client profile, qualify the list and organise a focused pipeline ready for targeted outreach or sales follow-up.",
    cta: "Build my lead list",
    icon: <OutreachIcon />,
  },
  {
    id: "cold-email-outreach",
    title: "Cold email outreach for coaches",
    body: "We prepare the sending setup, write a focused campaign and manage follow-up around prospects who fit your coaching audience, so outreach runs consistently without becoming your daily job.",
    cta: "Start my outreach",
    icon: <OutreachIcon />,
  },
  {
    id: "social-media",
    title: "Social media management for coaches",
    body: "We turn your coaching expertise into a consistent content system, publish it for you and handle routine replies so your social presence stays active while you coach.",
    cta: "Manage my social media",
    icon: <SocialIcon />,
  },
];

const PLANS = [
  {
    id: "launch",
    name: "Launch",
    line: "For building your online presence.",
    body: "You have a coaching offer but the website and message are not doing enough of the selling. We build the foundation.",
    includes: [
      "Custom coaching website with a clear enquiry or booking flow connected",
      "On-page SEO and local search setup where relevant",
      "Copy written for your offer, not filler text",
      "Handover and training so you can edit it",
    ],
  },
  {
    id: "presence",
    name: "Presence",
    line: "For staying visible.",
    body: "Everything in Launch, plus social media management that keeps your expertise in front of the people you want to attract.",
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
    line: "For building a repeatable pipeline.",
    body: "The full system: website, social presence, lead generation and cold outreach working together around the same coaching offer.",
    includes: [
      "Everything in Presence",
      "A results and testimonials page that presents your real proof before the first call",
      "Cold outreach campaigns, written and sent",
      "Lead generation and prospect follow-up built around your target audience",
    ],
    featured: true,
  },
];

/* ---------------- Structured data (one @graph) ----------------
   The shared Organization and WebSite entities come from src/lib/site.js
   so every page uses the same business identity and @id values. */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${PAGE_URL}#webpage`;
const CRUMBS_ID = `${PAGE_URL}#breadcrumb`;
const SERVICE_ID = `${PAGE_URL}#service`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    /* Same Organization / WebSite nodes as every other page, from
       src/lib/site.js. This page used to declare its own Organization
       with the same @id but a logo of /logo.png (a file that does not
       exist) — two conflicting definitions of one entity. */
    organizationSchema(),
    websiteSchema(),
    {
      "@type": "WebPage",
      "@id": PAGE_ID,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": SERVICE_ID },
      mainEntity: { "@id": SERVICE_ID },
      breadcrumb: { "@id": CRUMBS_ID },
    },
    {
      "@type": "BreadcrumbList",
      "@id": CRUMBS_ID,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "For coaches", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": SERVICE_ID,
      name: "Website development, lead generation, cold email outreach and social media management for coaches",
      serviceType: ["Website development for coaches", "Lead generation for coaches", "Cold email outreach for coaches", "Social media management for coaches"],
      description: PAGE_DESC,
      url: PAGE_URL,
      provider: { "@id": ORG_ID },
      audience: { "@type": "Audience", audienceType: "Coaches" },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Zarrar for coaches",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: SERVICES.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.body },
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
    },
  ],
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // "<" escaped so nothing inside the data can close the script tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Visible breadcrumb — text matches the BreadcrumbList JSON-LD above so the
// on-page trail and the structured data never drift out of sync.
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        <li aria-current="page">For coaches</li>
      </ol>
    </nav>
  );
}

function OtherPersonas() {
  const live = PERSONAS.filter((p) => p.live);
  if (live.length === 0) {
    return <Link href="/services">See who else we work with</Link>;
  }
  return (
    <>
      We also work with{" "}
      {live.map((p, i) => (
        <Fragment key={p.href}>
          {i > 0 && (i === live.length - 1 ? " and " : ", ")}
          <Link href={p.href}>{p.label}</Link>
        </Fragment>
      ))}
      .
    </>
  );
}

/* ---------------- Page ---------------- */

export default function ForCoachesPage() {
  return (
    <div className={`coaches-page ${archivo.variable} ${interTight.variable}`}>
      <JsonLd data={JSON_LD} />
      <CoachesMotion />

      <ContactProvider>
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="nav">
          <Link className="logo" href="/">Zarrar</Link>
          <nav className="nav-links" aria-label="On this page">
            <a href="#problem">THE PROBLEM</a>
            <a href="#services">SERVICES</a>
            <a href="#plans">PLANS</a>
            <a href="#faq">FAQ</a>
          </nav>
          <ContactTriggerLink className="nav-cta magnetic">Contact</ContactTriggerLink>
          <div className="nav-progress" aria-hidden="true"><span /></div>
        </header>

        <main id="main">
          <Breadcrumb />

          <section className="hero" id="top">
            <h1 className="hero-heading">
              <span className="hero-l1">Coach website design,</span>{" "}
              <span className="hero-l2">lead generation and social media that work together.</span>
            </h1>

            <p className="hero-sub">
              We build coaching websites that explain who you help and what you offer, manage the social media that keeps your expertise visible, and run targeted lead generation and cold email outreach to reach people who fit your coaching offer.
            </p>

            <div className="hero-rule" aria-hidden="true" />

            <div className="hero-actions">
              <a className="btn btn-solid magnetic" href="#plans">See the plans</a>
              <a className="btn btn-ghost" href="#how">How it works</a>
            </div>
          </section>

          <section className="problem" id="problem" aria-labelledby="problem-title">
            <div className="section-head">
              <h2 id="problem-title">Why coaches struggle to get clients online</h2>
              <p>A strong coaching offer still needs a clear website, consistent visibility and a practical way to reach the right prospects.</p>
            </div>

            <ul className="problem-list">
              {PAIN_POINTS.map((p, i) => (
                <li className="problem-item" key={p.title}>
                  <span className="problem-rule" aria-hidden="true" />
                  <div className="problem-head">
                    <span className="problem-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{p.title}</h3>
                  </div>
                  <p>{p.line}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="services" id="services" aria-labelledby="services-title">
            <div className="section-head">
              <h2 id="services-title">Website development, lead generation, cold email outreach and social media for coaches</h2>
              <p>Build the online presence first, then add the prospecting and content systems that help it bring in work.</p>
            </div>

            <div className="services-grid">
              {SERVICES.map((s) => (
                <article className="service-card" id={s.id} key={s.id}>
                  <span className="service-icon" aria-hidden="true">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ContactTriggerLink className="btn btn-outline">
                    {s.cta}
                  </ContactTriggerLink>
                </article>
              ))}
            </div>
          </section>

          <section className="case-study" id="how" aria-labelledby="case-title">
            <div className="section-head">
              <h2 id="case-title">How we build your coaching website and outreach system</h2>
              <p>A practical sequence for getting the website, outreach and social presence working together.</p>
            </div>

            <ol className="case-steps">
              {TIMELINE.map((s) => (
                <li className="case-step" key={s.title}>
                  <span className="case-step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="case-note">
              Illustrative timeline. Exact pace depends on your niche, offer
              price and existing audience.
            </p>
          </section>

          <section className="plans" id="plans" aria-labelledby="plans-title">
            <div className="section-head">
              <h2 id="plans-title">Choose the coaching marketing support you need</h2>
              <p>Start with the part you need now, then add the channels that support your next stage of growth.</p>
            </div>

            <div className="plans-grid">
              {PLANS.map((p) => (
                <article className={`plan${p.featured ? " is-featured" : ""}`} key={p.id}>
                  {p.featured && <span className="plan-flag">Most complete</span>}
                  <h3 className="plan-name">{p.name}</h3>
                  <p className="plan-line">{p.line}</p>
                  <p className="plan-body">{p.body}</p>
                  <ul className="plan-includes">
                    {p.includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <ContactTriggerLink
                    className={`btn ${p.featured ? "btn-acid" : "btn-outline"}`}
                    plan={p.name}
                  >
                    Start with {p.name}
                  </ContactTriggerLink>
                </article>
              ))}
            </div>
          </section>

          <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="section-head">
              <h2 id="faq-title">Questions coaches ask before hiring us</h2>
              <p>If yours isn&apos;t here, ask us directly. We reply fast.</p>
            </div>

            {/* Native <details>: zero JS, keyboard + screen-reader friendly,
                and the answers are real DOM text Google can index. */}
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <details className="faq-item" name="faq" open={i === 0} key={f.q}>
                  <summary className="faq-q">
                    <h3>{f.q}</h3>
                    <span className="faq-icon" aria-hidden="true"><PlusIcon /></span>
                  </summary>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="closing" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">Ready for an online presence that helps your coaching business grow?</h2>
            <p className="closing-sub">
              Tell us about your coaching offer, niche and current pipeline. We&apos;ll show you whether the first step should be your website, lead generation, cold email outreach or social media management.
            </p>
            <a className="btn btn-solid btn-lg magnetic" href={CONTACT_HREF}>
              SAY HELLO
            </a>
            <p className="closing-alt">
              Not a coach? <OtherPersonas />
            </p>
          </section>
        </main>
      </ContactProvider>
    </div>
  );
}