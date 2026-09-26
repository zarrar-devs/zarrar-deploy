import Link from "next/link";
import { SERVICE_PAGE_LIST } from "@/lib/service-pages";
import { CONTACT_EMAIL, PERSONAS, ROUTES } from "@/lib/site";
import "./service-landing.css";

export default function ServicePage({ service }) {
  return (
    <main className="servicePage">
      <div className="serviceWrap">
        <nav className="serviceBreadcrumbs" aria-label="Breadcrumb">
          <Link href={ROUTES.home}>Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.eyebrow.replace(/-/g, " ")}</span>
        </nav>

        <header className="serviceHero">
          <p className="serviceEyebrow">{service.eyebrow}</p>
          <h1 className="serviceTitle">{service.h1}</h1>
          <p className="serviceIntro">{service.intro}</p>
          <div className="serviceHeroActions" aria-label={`${service.serviceType} actions`}>
            <Link className="servicePrimaryAction" href={ROUTES.contact}>Discuss this service</Link>
            <a className="serviceSecondaryAction" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${service.serviceType} enquiry`)}`}>
              Email Zarrar
            </a>
          </div>
        </header>

        <section className="serviceSection serviceAudience" aria-labelledby="audience-heading">
          <div>
            <p className="serviceKicker">BEST FIT</p>
            <h2 id="audience-heading">Who this service is for</h2>
          </div>
          <div>
            <p className="serviceAudienceLead">{service.audience}.</p>
            <p>{service.audienceIntro}</p>
          </div>
        </section>

        <section className="serviceSection" aria-labelledby="included-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">WHAT WE DO</p>
            <h2 id="included-heading">What&apos;s included</h2>
          </div>
          <div className="serviceGrid">
            {service.benefits.map((benefit, index) => (
              <article className="serviceCard" key={benefit.title}>
                <span className="serviceCardIndex">0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="serviceSection" aria-labelledby="process-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">PROCESS</p>
            <h2 id="process-heading">How this service works</h2>
          </div>
          <div className="process">
            {service.process.map(([num, title, body]) => (
              <article className="step" key={num}>
                <div className="stepNum">{num}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="serviceSection" aria-labelledby="outcomes-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">THE POINT</p>
            <h2 id="outcomes-heading">{service.outcomesTitle}</h2>
          </div>
          <div className="outcomesList">
            {service.outcomes.map((outcome) => (
              <p key={outcome}>{outcome}</p>
            ))}
          </div>
        </section>

        <section className="serviceSection" aria-labelledby="audience-links-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">WHO WE HELP</p>
            <h2 id="audience-links-heading">See how this service fits different businesses</h2>
          </div>
          <nav className="serviceLinks" aria-label="Zarrar audience pages">
            {PERSONAS.filter((persona) => service.relatedAudiences.includes(persona.href)).map((persona) => (
              <Link href={persona.href} key={persona.href}>
                {persona.label}
              </Link>
            ))}
          </nav>
        </section>

        <section className="serviceSection" aria-labelledby="related-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">NEXT STEP</p>
            <h2 id="related-heading">Related services</h2>
          </div>
          <nav className="serviceLinks" aria-label="Related Zarrar services">
            {SERVICE_PAGE_LIST
              .filter((item) => service.related.includes(item.path))
              .map((item) => (
                <Link href={item.path} key={item.path}>
                  {item.eyebrow}
                </Link>
              ))}
          </nav>
        </section>

        <section className="serviceSection serviceFaq" aria-labelledby="faq-heading">
          <div className="serviceSectionHeader">
            <p className="serviceKicker">QUESTIONS</p>
            <h2 id="faq-heading">Questions about {service.eyebrow.toLowerCase()}</h2>
          </div>
          <div className="faqList">
            {service.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="serviceCta" aria-labelledby="cta-heading">
          <div>
            <p className="serviceKicker">TALK TO ZARRAR</p>
            <h2 id="cta-heading">{service.ctaTitle}</h2>
            <p>{service.ctaBody}</p>
          </div>
          <div className="serviceCtaActions">
            <Link href={ROUTES.contact}>Start a project</Link>
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${service.serviceType} enquiry`)}`}>Email {CONTACT_EMAIL}</a>
          </div>
        </section>
      </div>
    </main>
  );
}
