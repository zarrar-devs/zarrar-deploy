import Link from "next/link";
import Image from "next/image";
import { Fraunces } from "next/font/google";
import BrandMark from "@/components/BrandMark";
import ContactModalLink from "@/components/ContactModalLink";
import {
  BRAND,
  CONTACT_EMAIL,
  LOCALE,
  ORG_ID,
  PERSONAS,
  ROBOTS,
  ROUTES,
  SERVICES,
  SITE_URL,
  TARGET_MARKETS,
  WEBSITE_ID,
  breadcrumbSchema,
  graph,
  organizationSchema,
  safeJsonLd,
  url,
  websiteSchema,
} from "@/lib/site";
import { FOUNDER } from "./about-data";
import "./about.css";

/* Headline serif — the same family the landing page headline uses for
   its plain words. Body copy comes from the root layout's Inter. */
const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-about-display",
});

const TITLE = "About Zarrar | Founder-Led Web Development & Lead Generation Agency";
const DESCRIPTION =
  "Meet the founder and CEO of Zarrar, a remote agency building websites and running lead generation, cold email outreach and social media for founders, coaches, speakers and authors.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.about },
  robots: ROBOTS,
  openGraph: {
    type: "profile",
    locale: LOCALE,
    url: ROUTES.about,
    siteName: BRAND,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const PAGE_ID = `${SITE_URL}${ROUTES.about}#webpage`;
const PERSON_ID = `${SITE_URL}${ROUTES.about}#founder`;

/* One @graph: the Organization now names its founder, the Person node
   points back at the Organization, and the page is typed AboutPage with
   the founder as its main entity. Same @id scheme as every other page. */
const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: FOUNDER.name,
  jobTitle: FOUNDER.title,
  url: url(ROUTES.about),
  worksFor: { "@id": ORG_ID },
  ...(FOUNDER.photo ? { image: `${SITE_URL}${FOUNDER.photo.src}` } : {}),
  ...(FOUNDER.links.length ? { sameAs: FOUNDER.links } : {}),
};

const jsonLd = graph([
  { ...organizationSchema(), founder: { "@id": PERSON_ID } },
  websiteSchema(),
  {
    "@type": "AboutPage",
    "@id": PAGE_ID,
    url: url(ROUTES.about),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": PERSON_ID },
    breadcrumb: { "@id": `${SITE_URL}${ROUTES.about}#breadcrumb` },
    inLanguage: "en",
  },
  person,
  breadcrumbSchema(ROUTES.about, "About"),
]);

export default function AboutPage() {
  const { name, title, photo, story, principles, links } = FOUNDER;
  const markets = TARGET_MARKETS.join(", ").replace(/, ([^,]*)$/, " and $1");

  return (
    <main className={`about-page ${display.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="about-wrap">
        <header className="about-top">
          <BrandMark />
        </header>

        <nav className="about-crumbs" aria-label="Breadcrumb">
          <Link href={ROUTES.home}>Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>

        <section className="about-hero" aria-labelledby="about-title">
          <h1 id="about-title">
            A founder-led digital agency for websites, outreach and social media.
          </h1>
          <p className="about-lead">
            {BRAND} builds custom websites and runs lead generation, cold email
            outreach and social media management for founders, speakers, coaches,
            authors and real estate professionals. The agency was started by its
            founder and CEO, who leads it today.
          </p>
        </section>

        <section className="about-founder" aria-labelledby="founder-title">
          <div className="about-card">
            {photo ? (
              <Image
                className="about-photo"
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="(max-width: 860px) 70vw, 320px"
                priority
              />
            ) : (
              <Image
                className="about-photo about-photo--mark"
                src="/logo/zarrar-512.png"
                width={512}
                height={512}
                alt={`${BRAND} logo`}
                sizes="(max-width: 860px) 40vw, 200px"
                priority
              />
            )}
            <p className="about-name" id="founder-title">{name}</p>
            <p className="about-role">{title}</p>
          </div>

          <div className="about-copy">
            <h2>The person behind {BRAND}</h2>
            <p>
              {name} is the founder and CEO of {BRAND}. {name} started the agency
              and leads it as CEO, with responsibility for all four services we
              sell: website development, lead generation, cold email outreach and
              social media management.
            </p>
            <p>
              {BRAND} works remotely, with clients in {markets}. Every page, list
              and campaign is built for one outcome: making it easier for the right
              people to find you, understand what you offer and get in touch.
            </p>
            {story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {links.length > 0 && (
              <ul className="about-links" aria-label={`${name} on other sites`}>
                {links.map((href) => (
                  <li key={href}>
                    <a href={href} rel="me noopener" target="_blank">
                      {new URL(href).hostname.replace(/^www\./, "")}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {principles.length > 0 && (
          <section className="about-section" aria-labelledby="principles-title">
            <h2 id="principles-title">How we work with clients</h2>
            <dl className="about-principles">
              {principles.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="about-section" aria-labelledby="services-title">
          <h2 id="services-title">What {BRAND} does</h2>
          <ul className="about-services">
            {SERVICES.map((s) => (
              <li key={s.name}>
                <Link href={s.href}>{s.name}</Link>
                <p>{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-section" aria-labelledby="who-title">
          <h2 id="who-title">Who we work with</h2>
          <p className="about-who-lead">
            Our work is shaped around people who sell their expertise, so each
            audience has its own page.
          </p>
          <ul className="about-who">
            {PERSONAS.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-cta" aria-labelledby="cta-title">
          <h2 id="cta-title">Talk to {name} about your project.</h2>
          <p>
            Tell us what you sell and who you want to reach. You will hear back
            from the team at {BRAND}.
          </p>
          <div className="about-actions">
            <ContactModalLink className="about-btn about-btn--solid" href={ROUTES.contact}>
              Start a project
            </ContactModalLink>
            <a className="about-btn about-btn--line" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
