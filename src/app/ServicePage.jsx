import Link from "next/link";
import ContactModalLink from "@/components/ContactModalLink";
import BrandMark from "@/components/BrandMark";
import ServiceMotion from "./ServiceMotion";
import { SERVICE_PAGE_LIST, nichesFor } from "@/lib/service-pages";
import { CONTACT_EMAIL, ROUTES, SERVICES } from "@/lib/site";
import "./service-landing.css";

/* =============================================================
   Zarrar — shared layout for the four service pages.
   Server component: ALL copy is rendered into the HTML, so Google
   and AI answer engines read the full page without running any
   JavaScript. ServiceMotion (client) only adds animation on top.
   ============================================================= */

const NAV_ANCHORS = [
  { href: "#overview", label: "Overview" },
  { href: "#included", label: "Included" },
  { href: "#process", label: "Process" },
  { href: "#for", label: "Who it’s for" },
  { href: "#faq", label: "FAQ" },
];

/* Splits the H1 into words, each wrapped for a masked slide-up
   reveal. The accent phrase is set in the italic serif. The words
   stay in normal reading order inside one <h1>, so crawlers and
   screen readers see an ordinary sentence. */
function Headline({ text, accent }) {
  const at = accent ? text.indexOf(accent) : -1;
  const parts =
    at === -1
      ? [{ t: text, em: false }]
      : [
          { t: text.slice(0, at), em: false },
          { t: accent, em: true },
          { t: text.slice(at + accent.length), em: false },
        ];

  const words = [];
  parts.forEach((part, p) =>
    part.t
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word, i) => words.push({ word, em: part.em, key: `${p}-${i}` })),
  );

  return words.map(({ word, em, key }, i) => (
    <span key={key}>
      <span className="svc-w">
        <span className={`svc-wi${em ? " svc-em" : ""}`}>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

function Arrow() {
  return (
    <svg className="svc-arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg className="svc-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHead({ kicker, id, children, lead, light = false }) {
  return (
    <div className={`svc-head${light ? " svc-head--light" : ""}`}>
      <p className="svc-kicker rv">{kicker}</p>
      <h2 id={id} className="svc-h2 rv">{children}</h2>
      {lead ? <p className="svc-sublead rv">{lead}</p> : null}
    </div>
  );
}

/* Wraps the accent phrase of a heading in the serif italic. */
function Accented({ text, accent }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="svc-em">{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}

export default function ServicePage({ service }) {
  const niches = nichesFor(service);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${service.serviceType} enquiry`)}`;
  const crumb = service.eyebrow.replace(/-/g, " ");
  const relatedServices = SERVICE_PAGE_LIST.filter((item) => service.related.includes(item.path));
  const describe = (href) => SERVICES.find((s) => s.href === href)?.description;

  return (
    <ServiceMotion>
      <div className="svc">
        {/* ---------- Top bar ---------- */}
        <header className="svc-nav">
          <div className="svc-nav-inner">
            <BrandMark />
            <nav className="svc-nav-links" aria-label="On this page">
              {NAV_ANCHORS.map((a) => (
                <a key={a.href} href={a.href}>{a.label}</a>
              ))}
            </nav>
            <ContactModalLink className="svc-btn svc-btn--small" href={ROUTES.contact}>
              Book a call
            </ContactModalLink>
          </div>
        </header>

        <main id="top">
          {/* ---------- Hero ---------- */}
          <section className="svc-hero" aria-labelledby="svc-title">
            <div className="svc-glow" aria-hidden="true" />
            <div className="svc-grain" aria-hidden="true" />
            <div className="svc-wrap svc-hero-grid">
              <div className="svc-hero-copy">
                <nav className="svc-crumbs rv-hero" aria-label="Breadcrumb">
                  <Link href={ROUTES.home}>Home</Link>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page">{crumb.toLowerCase()}</span>
                </nav>

                <nav className="svc-switch rv-hero" aria-label="Zarrar services">
                  {SERVICE_PAGE_LIST.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={item.path === service.path ? "page" : undefined}
                    >
                      {item.serviceType}
                    </Link>
                  ))}
                </nav>

                <p className="svc-eyebrow rv-hero"><span className="svc-dot" aria-hidden="true" />{service.eyebrow}</p>
                <h1 id="svc-title" className="svc-h1">
                  <Headline text={service.h1} accent={service.h1Accent} />
                </h1>
                <p className="svc-lead rv-hero">{service.lead}</p>

                <div className="svc-actions rv-hero">
                  <ContactModalLink className="svc-btn svc-btn--primary" href={ROUTES.contact}>
                    Book a call <Arrow />
                  </ContactModalLink>
                  <a className="svc-btn svc-btn--ghost" href={mailto}>Email Zarrar</a>
                </div>

                <ul className="svc-tags rv-hero" aria-label="Highlights">
                  {service.heroTags.map((tag) => (
                    <li key={tag}><Tick />{tag}</li>
                  ))}
                </ul>
              </div>

              <aside className="svc-rail rv-hero" aria-label={`How ${service.serviceType.toLowerCase()} works at a glance`}>
                <p className="svc-rail-title">How it works</p>
                <ol>
                  {service.process.map(([num, title], i) => (
                    <li key={num} className={i === 0 ? "is-on" : undefined}>
                      <span>{num}</span>
                      <strong>{title}</strong>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </section>

          {/* ---------- Keyword ticker (decorative; same phrases are real copy below) ---------- */}
          <div className="svc-marquee" aria-hidden="true">
            <div className="svc-track">
              {[0, 1].map((n) => (
                <ul key={n}>
                  {service.marquee.map((word) => (
                    <li key={`${n}-${word}`}>{word}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* ---------- Plain-words explainer ---------- */}
          <section id="overview" className="svc-section svc-section--bone" aria-labelledby="overview-h">
            <div className="svc-wrap svc-split">
              <div>
                <p className="svc-kicker rv">{service.plain.kicker}</p>
                <h2 id="overview-h" className="svc-h2 rv">{service.plain.title}</h2>
              </div>
              <div>
                <p className="svc-bodylead rv">{service.plain.intro}</p>
                <div className="svc-cols" data-reveal-group>
                  {service.plain.columns.map((col) => (
                    <article key={col.label} className="svc-col rv-item">
                      <h3>{col.label}</h3>
                      <p>{col.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- What's included ---------- */}
          <section id="included" className="svc-section svc-section--paper" aria-labelledby="included-h">
            <div className="svc-wrap">
              <SectionHead kicker="WHAT’S INCLUDED" id="included-h">
                Everything {service.serviceType.toLowerCase()} covers
              </SectionHead>
              <div className="svc-cards" data-reveal-group>
                {service.benefits.map((benefit, index) => (
                  <article className="svc-card rv-item" key={benefit.title}>
                    <span className="svc-card-n">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Process ---------- */}
          <section id="process" className="svc-section svc-section--ink" aria-labelledby="process-h">
            <div className="svc-wrap svc-split svc-split--process">
              <div className="svc-sticky">
                <p className="svc-kicker rv">THE PROCESS</p>
                <h2 id="process-h" className="svc-h2 rv">How {service.serviceType.toLowerCase()} works</h2>
                <p className="svc-sublead rv">
                  {service.process.length} clear steps, from first conversation to a result you can measure.
                </p>
              </div>
              <ol className="svc-steps">
                <li className="svc-steps-line" aria-hidden="true"><span className="svc-steps-fill" /></li>
                {service.process.map(([num, title, body]) => (
                  <li className="svc-step" key={num}>
                    <span className="svc-step-n">{num}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ---------- Is it worth it? ---------- */}
          <section id="worth" className="svc-section svc-section--bone" aria-labelledby="worth-h">
            <div className="svc-wrap">
              <SectionHead kicker={service.worth.kicker} id="worth-h" lead={service.worth.intro}>
                {service.worth.title}
              </SectionHead>
              <div className="svc-worth" data-reveal-group>
                {service.worth.points.map((point) => (
                  <article className="svc-worth-item rv-item" key={point.title}>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </article>
                ))}
              </div>
              <p className="svc-verdict rv">
                <span>The short answer</span>
                {service.worth.verdict}
              </p>
            </div>
          </section>

          {/* ---------- Guarantee / standard ---------- */}
          <section id="promise" className="svc-section svc-section--tight" aria-labelledby="promise-h">
            <div className="svc-wrap">
              <div className="svc-promise rv">
                <div className="svc-promise-glow" aria-hidden="true" />
                <div className="svc-promise-copy">
                  <p className="svc-kicker">{service.promise.kicker}</p>
                  <h2 id="promise-h" className="svc-h2">
                    <Accented text={service.promise.title} accent={service.promise.titleAccent} />
                  </h2>
                  <p className="svc-promise-body">{service.promise.body}</p>
                  <ContactModalLink className="svc-btn svc-btn--light" href={ROUTES.contact}>
                    {service.promise.cta} <Arrow />
                  </ContactModalLink>
                </div>
                <ul className="svc-promise-list">
                  {service.promise.items.map((item) => (
                    <li key={item}><Tick />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---------- Who it's for ---------- */}
          <section id="for" className="svc-section svc-section--paper" aria-labelledby="for-h">
            <div className="svc-wrap">
              <SectionHead
                kicker="WHO IT’S FOR"
                id="for-h"
                lead={`Best fit: ${service.audience.charAt(0).toLowerCase()}${service.audience.slice(1)}. ${service.audienceIntro}`}
              >
                {service.nichesTitle}
              </SectionHead>
              <div className="svc-niches" data-reveal-group>
                {niches.map((niche) => (
                  <Link href={niche.href} className="svc-niche rv-item" key={niche.href}>
                    <span className="svc-niche-label">{niche.label}</span>
                    <h3>{niche.title}</h3>
                    <p>{niche.body}</p>
                    <span className="svc-niche-go">See the page <Arrow /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Outcomes ---------- */}
          <section className="svc-section svc-section--bone" aria-labelledby="outcomes-h">
            <div className="svc-wrap svc-split">
              <div>
                <p className="svc-kicker rv">THE POINT</p>
                <h2 id="outcomes-h" className="svc-h2 rv">{service.outcomesTitle}</h2>
              </div>
              <ul className="svc-outcomes" data-reveal-group>
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="rv-item"><Tick />{outcome}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---------- Related services ---------- */}
          <section className="svc-section svc-section--paper" aria-labelledby="related-h">
            <div className="svc-wrap">
              <SectionHead kicker="PAIRS WELL WITH" id="related-h">Related Zarrar services</SectionHead>
              <div className="svc-related" data-reveal-group>
                {relatedServices.map((item) => (
                  <Link href={item.path} className="svc-rel rv-item" key={item.path}>
                    <h3>{item.serviceType}</h3>
                    <p>{describe(item.path)}</p>
                    <span className="svc-niche-go">Explore <Arrow /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- FAQ ---------- */}
          <section id="faq" className="svc-section svc-section--bone" aria-labelledby="faq-h">
            <div className="svc-wrap svc-split">
              <div className="svc-sticky">
                <p className="svc-kicker rv">QUESTIONS</p>
                <h2 id="faq-h" className="svc-h2 rv">Questions about {service.serviceType.toLowerCase()}</h2>
              </div>
              <div className="svc-faq rv">
                {service.faqs.map(([question, answer], i) => (
                  <details key={question} open={i === 0 ? true : undefined}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Closing CTA ---------- */}
          <section className="svc-cta" aria-labelledby="cta-h">
            <div className="svc-glow svc-glow--cta" aria-hidden="true" />
            <div className="svc-grain" aria-hidden="true" />
            <div className="svc-wrap svc-cta-inner">
              <p className="svc-kicker rv">TALK TO ZARRAR</p>
              <h2 id="cta-h" className="svc-cta-title rv">{service.ctaTitle}</h2>
              <p className="svc-sublead rv">{service.ctaBody}</p>
              <div className="svc-actions rv">
                <ContactModalLink className="svc-btn svc-btn--primary" href={ROUTES.contact}>
                  Start a project <Arrow />
                </ContactModalLink>
                <a className="svc-btn svc-btn--ghost" href={mailto}>Email {CONTACT_EMAIL}</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ServiceMotion>
  );
}
