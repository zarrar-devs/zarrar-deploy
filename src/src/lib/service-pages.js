import {
  BRAND,
  ORG_ID,
  PERSONAS,
  ROUTES,
  SITE_URL,
  TARGET_MARKETS,
  WEBSITE_ID,
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  titleCase,
  url,
  websiteSchema,
} from "./site";

/* =============================================================
   Zarrar — the four service pages, content + SEO in one place.
   -------------------------------------------------------------
   Rendered by app/ServicePage.jsx. Metadata and JSON-LD are built
   from this file, so what a visitor reads, what Google reads in the
   title/description and what the structured data says can never
   drift apart.

   Field guide (new fields vs. the old file):
   - h1 / h1Accent   H1 text; the accent phrase is set in the italic
                     serif. The accent MUST be a substring of h1.
   - lead            short hero sub-line (the long copy is `plain`)
   - heroTags        three proof chips under the hero buttons
   - marquee         keyword ticker — mirrors real search phrases
   - plain           "in plain words" explainer, two columns
   - worth           the "is it actually worth it?" section
   - promise         the guarantee / standard block
   - niches          per-audience cards, keyed by persona route
   - keywords        meta keywords + schema `keywords`

   CONTENT TO CONFIRM BEFORE GOING LIVE
   The booking guarantee wording in `promise` (lead generation and
   cold email) and in two FAQ answers is deliberately generic: it
   says terms are agreed in writing before launch and invents no
   numbers or time frames. Replace it with Zarrar's real terms.
   ============================================================= */

export const SERVICE_LAST_MODIFIED = "2026-10-15";

const AUDIENCE_TYPES = [
  "Speakers",
  "Authors",
  "Coaches",
  "Entrepreneurs and CEOs",
  "Real estate agents",
];

export const SERVICE_PAGES = {
  /* ---------------------------------------------------------- */
  webDevelopment: {
    path: ROUTES.webDevelopment,
    title: "Premium Website Development for Speakers & CEOs | Zarrar",
    description:
      "Premium custom websites for speakers, authors, coaches, CEOs and agents: Awwwards-level design, smooth animation, mobile-first and built to rank on Google.",
    socialTitle: "Premium Website Development for Speakers, Authors & CEOs | Zarrar",
    keywords: [
      "website for speakers",
      "speaker website design",
      "website for authors",
      "website for coaches",
      "real estate agent website development",
      "premium website development",
      "custom website design agency",
    ],
    eyebrow: "WEB DEVELOPMENT",
    h1: "Premium websites for speakers, authors and founders that earn trust in seconds.",
    h1Accent: "earn trust in seconds.",
    lead:
      "Custom-coded, animated, mobile-first websites that explain what you do in plain words, load fast and give Google a clear reason to rank you. Designed to the standard of Awwwards-level sites and built remotely for clients across the US, UK and Europe.",
    heroTags: ["Custom-coded, no templates", "Animated & mobile-first", "SEO built in from day one"],
    marquee: [
      "Website for speakers",
      "Website for authors",
      "Website for coaches",
      "Website for CEOs",
      "Website for real estate agents",
      "Premium web design",
    ],
    intro:
      "Zarrar designs and develops custom websites for founders, speakers, coaches, authors and real estate professionals who need more than a template. We shape the message, build pages around real customer questions, make the experience work across devices, and give visitors a clear next step.",
    serviceType: "Website development",
    audience:
      "Founders, speakers, coaches, authors, real estate agents and other service businesses",
    audienceIntro:
      "This is for businesses whose website needs to explain the offer quickly, look credible on mobile, support search visibility and turn attention into enquiries, calls or bookings.",
    plain: {
      kicker: "IN PLAIN WORDS",
      title: "What you actually get when Zarrar builds your website",
      intro:
        "Zarrar designs and develops custom websites for founders, speakers, coaches, authors and real estate professionals who need more than a template. We shape the message, build pages around real customer questions, make the experience work across devices, and give visitors a clear next step.",
      columns: [
        {
          label: "For your visitors",
          body:
            "A site that looks premium, shows what you do in the first few seconds and gives people one obvious next step: a booking, an enquiry or a call. Smooth motion guides the eye instead of distracting from the message, and every page works properly on a phone.",
        },
        {
          label: "For Google",
          body:
            "Clean, fast, server-rendered pages with proper headings, metadata, structured data and internal links, so search engines understand exactly who you help and which searches you should appear for, such as ‘website for speakers’ or ‘website for authors’.",
        },
      ],
    },
    benefits: [
      {
        title: "Positioning and page structure",
        body: "A clear hierarchy of pages and messages so visitors can understand what you do, who you help and what they should do next.",
      },
      {
        title: "Custom design and development",
        body: "A purpose-built site rather than a generic template, with responsive layouts, accessible markup and interactions that support the content instead of hiding it.",
      },
      {
        title: "Premium motion and typography",
        body: "Considered type, generous spacing and purposeful animation, tuned separately for desktop and phone, so the site feels crafted rather than assembled.",
      },
      {
        title: "Technical SEO foundations",
        body: "Crawlable page structure, metadata, canonicals, internal linking, structured data and clean URL architecture prepared as part of the build.",
      },
      {
        title: "Conversion paths",
        body: "Clear calls to action, enquiry routes, forms or booking links placed where a visitor has enough context to take the next step.",
      },
      {
        title: "Launch and handover",
        body: "Responsive QA, production-domain checks and a clean handover so you know what was built and how to maintain it.",
      },
    ],
    outcomesTitle: "What the website should make easier",
    outcomes: [
      "A new visitor can tell what you offer without hunting through the page.",
      "Your core services have clear, indexable pages that can be shared and linked directly.",
      "People on mobile can navigate, read and contact you without fighting the interface.",
      "Your website gives outreach, social content and referrals a credible destination.",
    ],
    process: [
      ["01", "Position", "We clarify the offer, ideal audience, main objections and the action you want qualified visitors to take."],
      ["02", "Structure", "We turn that into page architecture, section order, calls to action and internal links that make sense to users and search engines."],
      ["03", "Build", "We design and code the site, forms and interactions around the agreed content and conversion path."],
      ["04", "Optimise", "We tighten technical SEO, responsive behavior, accessibility, image delivery and performance before launch."],
      ["05", "Launch", "We test the important URLs, forms and navigation, connect the production domain and hand over the finished site."],
    ],
    worth: {
      kicker: "IS IT WORTH IT?",
      title: "Is a premium website actually worth the investment?",
      intro:
        "Honest answer: it depends on what your website has to do. If people check you out before they hire, book or buy, and for speakers, authors, coaches, founders and agents almost everyone does, your site is the first sales conversation you have, and it happens when you aren’t in the room.",
      points: [
        {
          title: "Trust is decided in seconds",
          body: "Visitors judge credibility almost immediately. A dated or confusing site quietly loses enquiries you never find out about.",
        },
        {
          title: "Every other channel lands there",
          body: "Outreach, social posts, referrals and speaking introductions all point to your site. A weak destination wastes the effort that sent people to it.",
        },
        {
          title: "It is the asset you own",
          body: "Search visibility, content and credibility build up on your own domain instead of renting attention on someone else’s platform.",
        },
        {
          title: "When it should wait",
          body: "If you can’t yet explain your offer, fix that first. A beautiful site can’t rescue an offer nobody understands, which is why we start with positioning.",
        },
      ],
      verdict:
        "If your business depends on being chosen, a website that explains and proves your value pays for itself in the enquiries you would otherwise have lost.",
    },
    promise: {
      kicker: "THE ZARRAR STANDARD",
      title: "Built to the standard of Awwwards-level websites.",
      titleAccent: "Awwwards-level websites.",
      body:
        "We design with the craft you see on sites that win design attention: considered typography, deliberate motion, generous spacing and obsessive mobile polish, without giving up speed or search performance.",
      items: [
        "Bespoke typography and layout, never a recycled template",
        "Purposeful animation that respects reduced-motion settings",
        "Phone-first layouts checked at real screen sizes",
        "Fast loading: optimised images and fonts, no bloat",
        "Technical SEO shipped at launch: metadata, schema, sitemap, canonicals",
      ],
      cta: "Start your website",
    },
    nichesTitle: "A website for the way your business actually wins work",
    niches: {
      [ROUTES.speakers]: {
        title: "Website for speakers",
        body: "Let event planners see your topics, proof and booking path in a single scroll, so you get invited, not just admired.",
      },
      [ROUTES.authors]: {
        title: "Website for authors",
        body: "A home for your books, your voice and your mailing list that doesn’t depend on a retail page.",
      },
      [ROUTES.coaches]: {
        title: "Website for coaches",
        body: "Clear programmes, a story people trust and a simple way to book a first conversation.",
      },
      [ROUTES.realEstate]: {
        title: "Website for real estate agents",
        body: "A personal-brand site that shows your market, your results and an obvious way to start a conversation.",
      },
      [ROUTES.entrepreneurs]: {
        title: "Website for entrepreneurs & CEOs",
        body: "An executive presence online that backs up every investor, press and partner introduction.",
      },
    },
    faqs: [
      ["Is a premium custom website worth it compared with a template?", "A template is cheaper and faster up front, but it looks like everyone else’s and is rarely structured around your offer or the searches you want to win. A custom site is worth it when your reputation and enquiries depend on first impressions, which is true for most speakers, authors, coaches, founders and agents."],
      ["How do you help a website rank for searches like ‘website for speakers’?", "Rankings depend on relevance, technical quality and authority. We build the foundations: a clear page for each service and audience, descriptive titles and headings, structured data, fast loading and sensible internal links. Nobody can honestly promise a specific ranking position, but the build gives search engines every reason to understand and surface the right pages."],
      ["Will the animations slow my site down or hurt SEO?", "Not when they are built properly. Motion is layered on top of server-rendered content, so Google reads the full text, animations are lighter on phones, and they switch off for visitors who prefer reduced motion."],
      ["Can you redesign an existing business website?", "Yes. We can keep useful content and rebuild the structure, messaging, design or frontend where the current site is holding the business back."],
      ["Will the website be built for mobile?", "Yes. Responsive behavior is part of the build rather than a separate afterthought, with layouts and interactions tested for smaller screens."],
      ["Does website development include SEO?", "The build includes technical and on-page SEO foundations such as metadata, URL structure, internal links and structured data. Ongoing SEO campaigns are a separate service when needed."],
      ["What do you need from me to start?", "Your offer, who you want to reach, any existing content, proof such as testimonials or past talks, and a few sites you admire. We handle structure, messaging direction, design and build."],
    ],
    related: [ROUTES.leadGeneration, ROUTES.coldEmail, ROUTES.socialMedia],
    relatedAudiences: [ROUTES.speakers, ROUTES.coaches, ROUTES.authors, ROUTES.realEstate, ROUTES.entrepreneurs],
    ctaTitle: "Ready for a website that makes the offer obvious?",
    ctaBody: "Tell us what you sell, who you serve and what your current site is missing.",
  },

  /* ---------------------------------------------------------- */
  leadGeneration: {
    path: ROUTES.leadGeneration,
    title: "Lead Generation for Real Estate Agents & Speakers | Zarrar",
    description:
      "Lead generation for real estate agents, speakers, authors and CEOs: researched, verified prospects and a booking-ready pipeline, backed by a booking guarantee.",
    socialTitle: "Lead Generation for Real Estate Agents, Speakers & CEOs | Zarrar",
    keywords: [
      "lead generation for real estate agents",
      "lead generation for speakers",
      "lead generation for authors",
      "lead generation for CEOs",
      "B2B lead generation agency",
      "prospect research",
      "booked calls",
    ],
    eyebrow: "LEAD GENERATION",
    h1: "Lead generation that puts qualified buyers on your calendar, not names in a spreadsheet.",
    h1Accent: "qualified buyers on your calendar,",
    lead:
      "We research the exact people, companies and event teams who should hear from you, verify the details and hand you a pipeline that is ready for outreach, so your time goes on conversations instead of prospecting.",
    heroTags: ["Researched & verified prospects", "Booking guarantee", "Remote · US, UK & Europe"],
    marquee: [
      "Lead generation for real estate agents",
      "Lead generation for speakers",
      "Lead generation for authors",
      "Lead generation for CEOs",
      "Booked calls",
      "Qualified pipeline",
    ],
    intro:
      "Zarrar builds targeted lead-generation systems for founders, speakers, coaches, authors, real estate professionals and service businesses that know who they want to reach but do not have a reliable prospecting process.",
    serviceType: "Lead generation",
    audience:
      "Founders, speakers, coaches, authors, real estate agents and other service businesses",
    audienceIntro:
      "This service is for businesses that need a focused prospect pipeline rather than a large unqualified list. The criteria can include industry, role, geography, company size, offer fit and other buying signals.",
    plain: {
      kicker: "IN PLAIN WORDS",
      title: "What ‘lead generation’ means here, and what you receive",
      intro:
        "Zarrar builds targeted lead-generation systems for founders, speakers, coaches, authors, real estate professionals and service businesses that know who they want to reach but do not have a reliable prospecting process. We define the ideal customer, research people, companies or event teams that fit, qualify them against clear criteria and organise the data so it is ready for outreach or sales follow-up.",
      columns: [
        {
          label: "In simple terms",
          body:
            "A lead is not just a name in a database. It is a person who fits your offer, sits in a role that can say yes and can be reached with accurate details. We define that profile with you, find the people who match and remove everyone who doesn’t.",
        },
        {
          label: "What you receive",
          body:
            "An organised, segmented pipeline with the fields your sales process needs, ready for cold email, LinkedIn outreach or calls. When it runs together with Zarrar’s outreach, it is backed by our booking guarantee.",
        },
      ],
    },
    benefits: [
      {
        title: "Ideal customer research",
        body: "We translate your offer into practical prospecting criteria so research starts with who is actually worth contacting.",
      },
      {
        title: "Company and contact research",
        body: "We find relevant businesses and decision-makers and organise the information your team needs for the next sales step.",
      },
      {
        title: "Qualification and exclusions",
        body: "We apply agreed rules to remove obvious mismatches and separate strong-fit prospects from edge cases.",
      },
      {
        title: "Segmentation",
        body: "Prospects are grouped by audience, role, market or campaign angle so your outreach can stay relevant instead of sending one message to everyone.",
      },
      {
        title: "Outreach-ready pipeline",
        body: "The final list is organised for cold email, LinkedIn outreach, sales calls or another agreed follow-up workflow.",
      },
      {
        title: "Booking-focused delivery",
        body: "Paired with Zarrar’s outreach, the pipeline is built around one outcome: relevant people booking time with you.",
      },
    ],
    outcomesTitle: "What a usable lead-generation system should give you",
    outcomes: [
      "A clear definition of who belongs in your pipeline and who does not.",
      "Prospects organised around relevance instead of a giant unfiltered database.",
      "Segments that make personalised messaging practical at scale.",
      "A repeatable research process that can be refreshed as your target market changes.",
    ],
    process: [
      ["01", "Define", "We map the offer, ideal customer profile, exclusions, buying signals and the fields that matter for your sales process."],
      ["02", "Research", "We find companies and contacts that fit the criteria and collect the information needed for useful outreach."],
      ["03", "Qualify", "We apply the agreed rules, remove poor fits and segment the remaining prospects into clear groups."],
      ["04", "Activate", "The finished pipeline is prepared for cold email, LinkedIn outreach, sales follow-up or another agreed activation channel."],
    ],
    worth: {
      kicker: "IS IT WORTH IT?",
      title: "Is lead generation worth paying for?",
      intro:
        "It is worth it when your time is more valuable than the hours prospecting takes, and when you know who you sell to. Researching prospects by hand is slow, repetitive work that most experts only get to when the calendar is already empty.",
      points: [
        {
          title: "It replaces the slowest part of selling",
          body: "Finding and checking the right people takes hours every week. Handing that over means your time goes into conversations.",
        },
        {
          title: "Quality beats volume",
          body: "A smaller list of researched, relevant prospects tends to perform better than a giant unfiltered database full of mismatches and stale addresses.",
        },
        {
          title: "You learn who responds",
          body: "Segments show which audiences and angles resonate, so every round of outreach gets sharper.",
        },
        {
          title: "When it is not worth it yet",
          body: "If you can’t describe who you sell to or what you offer them, sharpen that first. We will tell you honestly if that is where you are.",
        },
      ],
      verdict:
        "With a clear offer and a wish for steady, relevant conversations, a researched pipeline is one of the most direct ways to get them.",
    },
    promise: {
      kicker: "THE BOOKING GUARANTEE",
      title: "We back the pipeline with a booking guarantee.",
      titleAccent: "booking guarantee.",
      body:
        "Zarrar doesn’t sell a list and walk away. When lead generation and outreach run together, we guarantee booked conversations, and the exact terms are written down and agreed with you before anything launches.",
      items: [
        "The booking target is agreed in writing before launch",
        "Terms and conditions explained in plain language, with no small-print surprises",
        "Reporting you can actually read: sent, replied, booked",
        "A defined audience, so the guarantee measures real prospects",
      ],
      cta: "Ask about the guarantee",
    },
    nichesTitle: "Lead generation shaped around who you sell to",
    niches: {
      [ROUTES.realEstate]: {
        title: "Lead generation for real estate agents",
        body: "Homeowners, investors and relocating buyers in your market, researched and segmented by area so outreach starts with people who fit.",
      },
      [ROUTES.speakers]: {
        title: "Lead generation for speakers",
        body: "Event organisers, conference teams and associations that book speakers on your topic, with the right contact for each.",
      },
      [ROUTES.authors]: {
        title: "Lead generation for authors",
        body: "Podcast hosts, publications, organisations and communities that match your book’s audience.",
      },
      [ROUTES.coaches]: {
        title: "Lead generation for coaches",
        body: "Founders, executives and teams that match your programme, researched by role, company size and situation.",
      },
      [ROUTES.entrepreneurs]: {
        title: "Lead generation for entrepreneurs & CEOs",
        body: "Partners, buyers and investors in your sector, researched by role and company fit.",
      },
    },
    faqs: [
      ["Is lead generation worth it for a solo expert or small business?", "Often more so than for large companies, because your own time is the bottleneck. Outsourcing research and qualification frees you to spend that time on conversations with people who already fit."],
      ["How does Zarrar guarantee bookings?", "We agree a booking target and its conditions in writing before launch, run the research and outreach to reach it, and report transparently on what was sent, replied and booked. Ask us for the exact terms for your audience and offer; they depend on your market."],
      ["How do you decide who counts as a lead?", "We start from your actual offer and define criteria such as industry, role, location, company type, size and other signals that indicate a useful prospect."],
      ["Are the contacts verified?", "Contact details are checked as part of qualification and obvious mismatches are removed. No dataset is perfect, so bounces and replies in outreach are monitored and fed back into the list."],
      ["Can lead generation be done for a specific niche?", "Yes. Narrower niches are often easier to research well because the inclusion and exclusion rules can be made more specific."],
      ["Do you also do the outreach?", "Yes. Lead generation and cold email outreach work best together, but they are separate services so you can buy only the part of the process you need."],
    ],
    related: [ROUTES.coldEmail, ROUTES.webDevelopment, ROUTES.socialMedia],
    relatedAudiences: [ROUTES.realEstate, ROUTES.speakers, ROUTES.coaches, ROUTES.entrepreneurs, ROUTES.authors],
    ctaTitle: "Want a pipeline of people worth talking to?",
    ctaBody: "Tell us the service you sell and the type of customer you want more of.",
  },

  /* ---------------------------------------------------------- */
  coldEmail: {
    path: ROUTES.coldEmail,
    title: "Cold Email Outreach for Speakers, Authors & CEOs | Zarrar",
    description:
      "Cold email outreach with a booking guarantee: targeted prospects, authenticated sending (SPF, DKIM, DMARC), tailored copy and follow-up for speakers and CEOs.",
    socialTitle: "Cold Email Outreach with a Booking Guarantee | Zarrar",
    keywords: [
      "cold email outreach",
      "cold email outreach for speakers",
      "cold email for real estate agents",
      "email outreach agency",
      "SPF DKIM DMARC setup",
      "booked calls",
    ],
    eyebrow: "COLD EMAIL OUTREACH",
    h1: "Cold email outreach that reaches the inbox and turns replies into booked calls.",
    h1Accent: "turns replies into booked calls.",
    lead:
      "Zarrar researches the right prospects, builds an authenticated sending system, writes the campaign around one clear offer and manages follow-up, then backs it with a booking guarantee.",
    heroTags: ["Authenticated sending", "Booking guarantee", "Remote · US, UK & Europe"],
    marquee: [
      "Cold email outreach",
      "Email outreach for speakers",
      "Email outreach for real estate agents",
      "SPF · DKIM · DMARC",
      "Booked calls",
      "Follow-up that works",
    ],
    intro:
      "Zarrar helps founders, speakers, coaches, authors, real estate professionals and service businesses build cold email campaigns that start with the right prospects and the right offer.",
    serviceType: "Cold email outreach",
    audience:
      "Founders, speakers, coaches, authors, real estate agents and other service businesses",
    audienceIntro:
      "This service is for businesses with a specific offer and a defined audience they can approach directly. We focus on relevance, sending hygiene and useful follow-up rather than high-volume blasting.",
    plain: {
      kicker: "IN PLAIN WORDS",
      title: "How Zarrar does email outreach, step by step",
      intro:
        "Zarrar helps founders, speakers, coaches, authors, real estate professionals and service businesses build cold email campaigns that start with the right prospects and the right offer. We handle prospect selection, sending-domain authentication, campaign messaging, follow-up and iteration so outreach has a defined process instead of relying on one generic template.",
      columns: [
        {
          label: "In simple terms",
          body:
            "Cold email is a relevant first message to someone who doesn’t know you yet, sent because you can genuinely help them. Done well it reads like a short, well-researched introduction, not spam.",
        },
        {
          label: "How Zarrar does it",
          body:
            "We choose who and why, set up the technical side (SPF, DKIM and DMARC) so mail can reach the inbox, write short messages around one problem and one offer, follow up with something useful, and handle replies so interested people end up on your calendar.",
        },
      ],
    },
    benefits: [
      {
        title: "Targeted prospect selection",
        body: "Campaigns start with a clearly defined audience so the message has a reason to reach that person in the first place.",
      },
      {
        title: "Sending setup",
        body: "We prepare the sending domain and mailbox configuration, including SPF, DKIM and DMARC where applicable, before the campaign begins.",
      },
      {
        title: "Campaign copy",
        body: "Emails are written around one audience, one problem and one relevant offer so the value proposition is easy to understand.",
      },
      {
        title: "Follow-up sequence",
        body: "Follow-ups add context or a useful reason to respond rather than simply repeating the same pitch several times.",
      },
      {
        title: "Reply handling and booking",
        body: "Interested replies are moved quickly toward a booked conversation on your calendar, so good leads don’t go cold.",
      },
      {
        title: "Iteration from real replies",
        body: "We track the objections and patterns that appear in replies and use them to improve targeting, copy and the next campaign iteration.",
      },
    ],
    outcomesTitle: "What better outreach should create",
    outcomes: [
      "A campaign where the audience and offer are aligned before messages are sent.",
      "A sending setup that takes authentication and list quality seriously.",
      "Messages that are easier for a prospect to understand and evaluate quickly.",
      "A repeatable process for learning from replies instead of restarting from zero each time.",
    ],
    process: [
      ["01", "Target", "We define the audience, inclusion rules, exclusions and the business problem the campaign is meant to address."],
      ["02", "Prepare", "We set up the sending infrastructure and authentication and check the campaign is ready before messages go live."],
      ["03", "Launch", "We send a controlled campaign with relevant copy, sensible follow-ups and a clear way for recipients to respond or opt out."],
      ["04", "Book", "Interested replies are handled and moved toward a booked conversation on your calendar."],
      ["05", "Improve", "We review replies, objections and campaign data to adjust targeting and messaging for the next iteration."],
    ],
    worth: {
      kicker: "IS IT WORTH IT?",
      title: "Is cold email outreach worth it?",
      intro:
        "Yes, when the offer is clear, the list is relevant and the sending setup is clean. It is one of the few channels where you choose exactly who hears from you, without waiting for an algorithm or paying for every impression.",
      points: [
        {
          title: "You pick the audience",
          body: "Search and social wait for people to find you. Outreach starts the conversation with the exact roles and companies you want to reach.",
        },
        {
          title: "Every step is measurable",
          body: "Sent, delivered, replied, booked: each stage can be tracked and improved, so you are never guessing what is working.",
        },
        {
          title: "It fails when done carelessly",
          body: "Bought lists, one generic template and no authentication get ignored, land in spam and can damage your domain. That is why list quality and sending setup come before copy.",
        },
        {
          title: "It works better alongside the rest",
          body: "Prospects check you out before replying. A strong website and an active profile make every email more credible.",
        },
      ],
      verdict:
        "With a specific offer for a defined audience, cold email is worth it. If you are still unsure who you serve, start with lead generation to sharpen the audience first.",
    },
    promise: {
      kicker: "THE BOOKING GUARANTEE",
      title: "A booking guarantee, in writing.",
      titleAccent: "booking guarantee,",
      body:
        "Plenty of agencies promise activity. Zarrar guarantees booked conversations. The target and conditions are agreed with you before the first email is sent, so you know exactly what you are buying.",
      items: [
        "A booking target agreed in writing before launch",
        "Plain-language conditions: what we deliver and what we need from you",
        "Reporting on sent, replied and booked",
        "Compliant outreach with clear opt-outs, written for each market",
      ],
      cta: "Ask about the guarantee",
    },
    nichesTitle: "Outreach written for the people you want to reach",
    niches: {
      [ROUTES.speakers]: {
        title: "Cold email for speakers",
        body: "Introductions to event organisers, conference producers and associations that book speakers in your field.",
      },
      [ROUTES.realEstate]: {
        title: "Cold email for real estate agents",
        body: "Targeted outreach to property owners, investors and developers in your area.",
      },
      [ROUTES.entrepreneurs]: {
        title: "Cold email for entrepreneurs & CEOs",
        body: "Partner, client and investor introductions written around one clear reason to talk.",
      },
      [ROUTES.coaches]: {
        title: "Cold email for coaches",
        body: "Respectful first messages to the founders and leaders your programme is built for.",
      },
      [ROUTES.authors]: {
        title: "Cold email for authors",
        body: "Outreach to podcast hosts, editors and organisations that can put your book in front of its readers.",
      },
    },
    faqs: [
      ["Is cold email outreach actually worth it?", "Yes, when the offer is specific, the audience is well researched and the sending setup is clean. It lets you start conversations with exactly the people you want, and every step can be measured. It is not worth it as a mass blast with a generic template."],
      ["How does Zarrar do cold email outreach?", "We define the audience and build a researched list, configure the sending domain and authentication (SPF, DKIM, DMARC), write a short campaign around one offer, send in a controlled way with useful follow-ups, handle replies toward a booked call and then use the replies to improve the next round."],
      ["Does Zarrar guarantee bookings?", "Yes. Zarrar backs outreach with a booking guarantee. The booking target and its conditions are agreed in writing before launch. We don’t promise sales or revenue, because closing depends on your offer and your follow-through."],
      ["Will my emails land in spam?", "Nobody can promise inbox placement, but we reduce the risk with authenticated domains, targeted lists, careful sending volumes and plain, relevant messages instead of mass blasts."],
      ["Do you use purchased email lists?", "The process is built around targeted research and agreed qualification criteria rather than treating a large bought list as a strategy. The permitted approach depends on the recipient, market and applicable rules."],
      ["Is cold email legal?", "Rules vary by country and recipient, for example business versus consumer contacts, opt-out requirements and data-protection law in the UK and EU. We build in clear opt-outs and targeted lists, but you should take legal advice for your specific situation."],
      ["Will you set up SPF, DKIM and DMARC?", "Yes, where applicable to the sending setup. We treat authentication and sending configuration as part of campaign preparation."],
    ],
    related: [ROUTES.leadGeneration, ROUTES.webDevelopment, ROUTES.socialMedia],
    relatedAudiences: [ROUTES.speakers, ROUTES.realEstate, ROUTES.entrepreneurs, ROUTES.coaches, ROUTES.authors],
    ctaTitle: "Want outreach that ends in booked calls?",
    ctaBody: "Tell us who you want to reach and what conversation you want to start.",
  },

  /* ---------------------------------------------------------- */
  socialMedia: {
    path: ROUTES.socialMedia,
    title: "Social Media Management for Speakers & CEOs | Zarrar",
    description:
      "Social media management for speakers, CEOs, coaches and authors: content strategy, writing, scheduling, profile optimisation and replies, handled in your voice.",
    socialTitle: "Social Media Management for Speakers, Authors & CEOs | Zarrar",
    keywords: [
      "social media management for speakers",
      "social media management for CEOs",
      "personal brand social media",
      "LinkedIn content management",
      "content strategy for coaches and authors",
    ],
    eyebrow: "SOCIAL MEDIA MANAGEMENT",
    h1: "Social media management that turns your expertise into a consistent business presence.",
    h1Accent: "consistent business presence.",
    lead:
      "We plan, write, schedule and publish content in your voice, keep your profiles sharp and handle routine replies, so you stay visible without turning content into a second job.",
    heroTags: ["Written in your voice", "Approval workflow you control", "Remote · US, UK & Europe"],
    marquee: [
      "Social media management for speakers",
      "Social media management for CEOs",
      "Personal brand content",
      "Content strategy",
      "Profile optimisation",
      "Community replies",
    ],
    intro:
      "Zarrar manages social media for founders, speakers, coaches, authors, personal brands and service businesses that want to stay visible without turning content into another full-time task.",
    serviceType: "Social media management",
    audience:
      "Founders, speakers, coaches, authors, real estate agents and other service businesses",
    audienceIntro:
      "This service is for businesses with useful expertise, stories or offers to share but not enough time to plan, publish and maintain social profiles consistently themselves.",
    plain: {
      kicker: "IN PLAIN WORDS",
      title: "What managed social media looks like with Zarrar",
      intro:
        "Zarrar manages social media for founders, speakers, coaches, authors, personal brands and service businesses that want to stay visible without turning content into another full-time task. We build the content plan around your expertise and offers, write and schedule the posts, keep profiles clear and handle routine replies on the channels you choose.",
      columns: [
        {
          label: "In simple terms",
          body:
            "Instead of posting whenever you remember, you get a plan: what to say, to whom and how often, plus a team that writes and publishes it consistently.",
        },
        {
          label: "What you stay in control of",
          body:
            "Your voice, your offers and your approval workflow. All of it is agreed before anything goes live, so your profile always sounds like you.",
        },
      ],
    },
    benefits: [
      {
        title: "Content strategy",
        body: "We define the themes, audiences and offers that should show up regularly so content supports a business goal instead of becoming random posting.",
      },
      {
        title: "Content planning and writing",
        body: "Posts and captions are planned around your expertise, customer questions, proof, stories and offers in a voice we agree with you.",
      },
      {
        title: "Publishing workflow",
        body: "Content is organised and scheduled on the agreed channels with a consistent cadence that fits the amount of material you can realistically approve.",
      },
      {
        title: "Profile optimisation",
        body: "Your bio, profile details and calls to action are kept clear so a new visitor can understand who you help and where to go next.",
      },
      {
        title: "Routine community replies",
        body: "We handle agreed comments, mentions and routine messages so useful conversations are less likely to sit unanswered.",
      },
      {
        title: "Review and refinement",
        body: "We use engagement and business feedback to improve topics, formats and calls to action over time.",
      },
    ],
    outcomesTitle: "What a managed social presence should make easier",
    outcomes: [
      "A new visitor can understand what you do from your profile and recent content.",
      "Your expertise appears consistently instead of in occasional bursts when you have spare time.",
      "Your content supports the same offers and positioning used across your website and outreach.",
      "Routine publishing and replies no longer depend on remembering to do them yourself.",
    ],
    process: [
      ["01", "Position", "We define the audience, core topics, offers and point of view you want your content to reinforce."],
      ["02", "Plan", "We build a practical content calendar from your expertise, customer questions, stories, proof and offers."],
      ["03", "Publish", "Content is written, scheduled and published across the agreed channels with consistent messaging and calls to action."],
      ["04", "Refine", "We use engagement and business feedback to improve topics, formats and calls to action over time."],
    ],
    worth: {
      kicker: "IS IT WORTH IT?",
      title: "Is social media management worth it?",
      intro:
        "It is worth it when your reputation drives your business and you are too busy to show up consistently. For speakers, authors, coaches and founders, a quiet profile can cost more than it seems.",
      points: [
        {
          title: "People check you out first",
          body: "Prospects, event planners and readers look at your profiles before they reply to an email or book a call. A clear, active presence supports every other channel.",
        },
        {
          title: "Consistency beats bursts",
          body: "Posting heavily for two weeks and then disappearing teaches an audience nothing. A steady cadence is what builds recognition.",
        },
        {
          title: "It builds trust, not overnight sales",
          body: "Social media usually builds familiarity and credibility over time. We don’t promise follower counts or instant revenue.",
        },
        {
          title: "It is stronger alongside the rest",
          body: "Someone who reads your post, then receives your email or lands on your website, is more likely to recognise and trust you.",
        },
      ],
      verdict:
        "If you have expertise worth sharing but no time to share it, a managed presence is worth it. If you can’t commit to reviewing content, results will be limited.",
    },
    promise: {
      kicker: "HOW WE WORK",
      title: "You stay in control of your voice.",
      titleAccent: "your voice.",
      body:
        "Content is planned around your expertise, written in a tone we agree with you and published through an approval workflow set up before anything goes live.",
      items: [
        "A content plan built around your offers and expertise",
        "A voice that is agreed with you so posts sound like you",
        "An approval workflow agreed before publishing starts",
        "Routine replies handled on the channels you choose",
      ],
      cta: "Plan your content",
    },
    nichesTitle: "Content that fits how your audience finds you",
    niches: {
      [ROUTES.speakers]: {
        title: "Social media for speakers",
        body: "Keep your topics, talks and proof in front of event planners and audiences between bookings.",
      },
      [ROUTES.entrepreneurs]: {
        title: "Social media for entrepreneurs & CEOs",
        body: "A consistent executive voice that supports hiring, partnerships and sales conversations.",
      },
      [ROUTES.coaches]: {
        title: "Social media for coaches",
        body: "Show your method, results and personality regularly so people feel they know you before they book.",
      },
      [ROUTES.authors]: {
        title: "Social media for authors",
        body: "Build a readership around your ideas and your books, not just around launch week.",
      },
      [ROUTES.realEstate]: {
        title: "Social media for real estate agents",
        body: "Local expertise, listings and client stories presented consistently so your name stays familiar in your market.",
      },
    },
    faqs: [
      ["Is social media management worth it for a speaker, author or coach?", "It is worth it when people research you before booking, hiring or buying, which is true for most personal brands. A clear, consistent presence supports your website and outreach. It is a trust-building channel, not an instant-sales one."],
      ["Which social platforms do you manage?", "The exact channels are agreed around where your audience already pays attention and where your business can maintain a useful presence."],
      ["Do I have to approve every post?", "That is agreed before publishing starts. Many clients approve a batch of posts at a time so content stays in their voice without becoming a daily task."],
      ["Do you create all the content from scratch?", "We can create the content from your expertise and source material, or work from assets and ideas you provide. The workflow is agreed before publishing starts."],
      ["How often will you post?", "The cadence is agreed around your channels and the amount of material you can realistically review and approve."],
      ["Will social media management guarantee followers or sales?", "No. We focus on a consistent, useful presence and clear business positioning rather than promising a fixed follower count or revenue outcome."],
    ],
    related: [ROUTES.webDevelopment, ROUTES.leadGeneration, ROUTES.coldEmail],
    relatedAudiences: [ROUTES.speakers, ROUTES.entrepreneurs, ROUTES.coaches, ROUTES.authors, ROUTES.realEstate],
    ctaTitle: "Want your expertise visible without the daily effort?",
    ctaBody: "Tell us which channels you use, what you sell and how often you want to publish.",
  },
};

export const SERVICE_PAGE_LIST = Object.values(SERVICE_PAGES);

export function serviceByPath(path) {
  return SERVICE_PAGE_LIST.find((service) => service.path === path);
}

/* Persona routes in the order a given service wants to show them,
   joined with the label/anchor from site.js. */
export function nichesFor(service) {
  return service.relatedAudiences
    .map((href) => {
      const persona = PERSONAS.find((p) => p.href === href);
      const niche = service.niches?.[href];
      if (!persona || !niche) return null;
      return { href, label: persona.label, ...niche };
    })
    .filter(Boolean);
}

/* ---------------------------------------------------------------
   Metadata. Titles use `absolute` so the root layout template
   doesn't append "| Zarrar" a second time.
   --------------------------------------------------------------- */
export function serviceMetadata(service) {
  return {
    title: { absolute: service.title },
    description: service.description,
    keywords: service.keywords,
    authors: [{ name: BRAND, url: SITE_URL }],
    alternates: { canonical: service.path },
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
      locale: "en_US",
      url: service.path,
      siteName: BRAND,
      title: service.socialTitle,
      description: service.description,
      images: [
        {
          url: `${service.path}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.socialTitle} — ${BRAND}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.socialTitle,
      description: service.description,
      images: [`${service.path}/opengraph-image`],
    },
  };
}

/* ---------------------------------------------------------------
   Structured data: one @graph per page — Organization, WebSite,
   WebPage, BreadcrumbList, FAQPage and a Service whose deliverables
   are listed as an OfferCatalog. Built from the same data the page
   renders, so markup and visible text stay identical.
   --------------------------------------------------------------- */
export function serviceJsonLd(service) {
  const pageId = `${SITE_URL}${service.path}#webpage`;
  const serviceId = `${SITE_URL}${service.path}#service`;

  return graph([
    organizationSchema(),
    websiteSchema(),
    {
      "@type": "WebPage",
      "@id": pageId,
      url: url(service.path),
      name: service.title,
      headline: service.h1,
      description: service.description,
      keywords: service.keywords.join(", "),
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": serviceId },
      mainEntity: { "@id": serviceId },
      breadcrumb: { "@id": `${SITE_URL}${service.path}#breadcrumb` },
      dateModified: SERVICE_LAST_MODIFIED,
      inLanguage: "en",
    },
    breadcrumbSchema(service.path, titleCase(service.eyebrow)),
    faqSchema(service.path, service.faqs),
    {
      "@type": "Service",
      "@id": serviceId,
      name: service.serviceType,
      description: service.description,
      url: url(service.path),
      serviceType: service.serviceType,
      areaServed: TARGET_MARKETS,
      audience: AUDIENCE_TYPES.map((audienceType) => ({
        "@type": "Audience",
        audienceType,
      })),
      provider: { "@id": ORG_ID },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.serviceType} — what is included`,
        itemListElement: service.benefits.map((b) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: b.title,
            description: b.body,
          },
        })),
      },
    },
  ]);
}
