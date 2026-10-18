"use client";

/* =============================================================
   Zarrar — /services
   -------------------------------------------------------------
   What changed in this pass
   - Hero load sequence is CSS keyframes now (no flash of visible
     text before JS hides it, works without JS). GSAP only handles
     scroll-driven motion, which happens below the fold.
   - Phones: no Lenis smooth-scroll (native momentum scrolling is
     better on touch), no text-scrub, no scrubbed parallax. Reveals
     are one cheap ScrollTrigger.batch. Desktop keeps the extras.
   - Lenis is now also removed from gsap.ticker on unmount (it used
     to leak) and in-page links go through lenis.scrollTo when it's
     running, so the sticky nav offset is respected.
   - New "How it works" section explaining lead generation +
     personalised outreach, with small illustrations per step. On
     phones the four steps are a swipeable snap row.
   - Service cards: numbered index removed (the services aren't a
     sequence); each card now carries a short "stage" label instead.
     Lead generation gets its own icon (it shared one with cold
     email). Card DOM still has exactly 4 direct children, which is
     what the subgrid rule in Services.css relies on.
   - Contact modal wiring is unchanged: every CTA is a <button>
     calling openContact(); closing section also keeps a mailto.
   - "Home / Services" breadcrumb stays inside .services-page.
   ============================================================= */

import BrandMark from "@/components/BrandMark";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContactModal from "@/components/ContactModal/ContactModal";
import { ROUTES, CONTACT_EMAIL } from "@/lib/site";
import { SERVICES, PLANS, FLOW } from "./services-data";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ---------------- Icons (decorative, hidden from AT) ---------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function WebIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke}>
      <rect className="draw" x="4" y="8" width="40" height="32" rx="3" />
      <line className="draw" x1="4" y1="17" x2="44" y2="17" />
      <path className="draw" d="M19 25l-5 5 5 5" />
      <path className="draw" d="M29 25l5 5-5 5" />
    </svg>
  );
}

function LeadsIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke}>
      <circle className="draw" cx="20" cy="20" r="11" />
      <path className="draw" d="M28 28l13 13" />
      <path className="draw" d="M15 18h10M15 23h6" />
    </svg>
  );
}

function OutreachIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke}>
      <path className="draw" d="M5 24L43 9l-6 30-11-9-8 8v-10z" />
      <path className="draw" d="M18 28L43 9" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 48 48" {...stroke}>
      <circle className="draw" cx="12" cy="15" r="5" />
      <circle className="draw" cx="36" cy="12" r="5" />
      <circle className="draw" cx="24" cy="36" r="5" />
      <path className="draw" d="M17 17l14-4" />
      <path className="draw" d="M14 20l8 12" />
      <path className="draw" d="M34 17l-8 15" />
    </svg>
  );
}

const ICONS = {
  web: <WebIcon />,
  leads: <LeadsIcon />,
  outreach: <OutreachIcon />,
  social: <SocialIcon />,
};

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h9M8 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Tiny illustrations for the "How it works" steps. Decorative: the
   step's heading and sentence already say everything. */
function FlowMock({ type }) {
  if (type === "criteria") {
    return (
      <div className="mock mock-chips">
        <span>Role: Head of Events</span>
        <span>Industry: Conferences</span>
        <span>Region: UK &amp; EU</span>
        <span>Signal: Booking speakers</span>
      </div>
    );
  }

  if (type === "list") {
    return (
      <ul className="mock mock-list">
        <li><i className="ok" />Head of Events<span>Fits</span></li>
        <li><i className="ok" />Founder<span>Fits</span></li>
        <li className="no"><i className="x" />Intern<span>Excluded</span></li>
      </ul>
    );
  }

  if (type === "email") {
    return (
      <div className="mock mock-mail">
        <p className="mock-subject">Idea for your 2027 leadership track</p>
        <p>
          Hi <mark>Maya</mark>, I saw <mark>Northwind Summit</mark> is adding a
          leadership track&hellip;
        </p>
      </div>
    );
  }

  return (
    <ul className="mock mock-seq">
      <li><b style={{ "--w": "100%" }} />First email</li>
      <li><b style={{ "--w": "72%" }} />Follow-up</li>
      <li><b style={{ "--w": "48%" }} />Reply handled</li>
    </ul>
  );
}

/* ---------------- Component ---------------- */

function Services({ faqs = [] }) {
  const root = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState(null);

  // Pass a plan name (e.g. "Growth") from a plan's CTA, or nothing for a
  // generic contact click (nav, hero, service cards, closing).
  const openContact = (plan = null) => {
    setContactPlan(plan);
    setContactOpen(true);
  };

  useIsoLayoutEffect(() => {
    let lenis;
    let lenisTick;
    let cancelled = false;
    const el = root.current;

    /* ---- optional smooth scroll: desktop pointer devices only ---- */
    const startSmooth = async () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (reduce || touch) return;

      try {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;

        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        document.documentElement.classList.add("has-lenis");

        lenis.on("scroll", ScrollTrigger.update);
        lenisTick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(lenisTick);
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* native scroll is fine */
      }
    };

    startSmooth();

    /* in-page links: let Lenis do the scrolling (keeps the sticky-nav
       offset); without Lenis the browser + CSS scroll-margin handle it */
    const onAnchorClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || !lenis) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = el.querySelector(".nav")?.offsetHeight || 80;
      lenis.scrollTo(target, { offset: -navH });
    };
    el.addEventListener("click", onAnchorClick);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 900px)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (mctx) => {
          const { motion, desktop, fine } = mctx.conditions;
          if (!motion) return;

          /* ---- nav scroll progress ---- */
          gsap.to(q(".nav-progress span"), {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          });

          /* ---- everything else: one cheap batched reveal ---- */
          const items = q(".reveal");
          // Prepare the start state before a card enters view; this prevents
          // the visible -> hidden -> visible snap on first scroll entry.
          gsap.set(items, { opacity: 0, y: 28 });

          ScrollTrigger.batch(items, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
                /* hand transform/opacity back to CSS so card hover
                   lift keeps working */
                clearProps: "opacity,transform",
              }),
          });

          /* ---- service icons draw themselves ---- */
          q(".service-card").forEach((card) => {
            const strokes = card.querySelectorAll(".draw");
            strokes.forEach((s) => {
              const len = s.getTotalLength ? s.getTotalLength() : 200;
              gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
            });
            gsap.to(strokes, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.out",
              stagger: 0.06,
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            });
          });

          /* ---- flow: the little bars fill as the step lands ---- */
          q(".mock-seq b").forEach((bar) => {
            gsap.from(bar, {
              scaleX: 0,
              transformOrigin: "0 50%",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: bar, start: "top 90%", once: true },
            });
          });

          if (desktop) {
            /* hero drifts away as you leave it */
            gsap.to(q(".hero-heading"), {
              yPercent: -12,
              opacity: 0.25,
              ease: "none",
              scrollTrigger: {
                trigger: q(".hero")[0],
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });

            /* the statement: words light up as you scroll */
            const stmt = q(".statement p")[0];
            if (stmt) {
              const split = SplitText.create(stmt, {
                type: "words",
                wordsClass: "word",
                aria: "auto",
              });

              gsap.fromTo(
                split.words,
                { opacity: 0.16 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.35,
                  scrollTrigger: {
                    trigger: q(".statement")[0],
                    start: "top 78%",
                    end: "bottom 62%",
                    scrub: 0.4,
                  },
                }
              );
            }
          }

          /* ---- magnetic buttons: mouse only ---- */
          if (fine) {
            const cleanups = [];

            q(".magnetic").forEach((m) => {
              const xTo = gsap.quickTo(m, "x", { duration: 0.5, ease: "power3" });
              const yTo = gsap.quickTo(m, "y", { duration: 0.5, ease: "power3" });

              const move = (e) => {
                const r = m.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
              };
              const leave = () => {
                xTo(0);
                yTo(0);
              };

              m.addEventListener("pointermove", move);
              m.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                m.removeEventListener("pointermove", move);
                m.removeEventListener("pointerleave", leave);
              });
            });

            return () => cleanups.forEach((fn) => fn());
          }
        }
      );
    }, el);

    /* webfonts change metrics: re-measure triggers once they land */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => !cancelled && ScrollTrigger.refresh());
    }

    return () => {
      cancelled = true;
      el.removeEventListener("click", onAnchorClick);
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
      document.documentElement.classList.remove("has-lenis");
      ctx.revert();
    };
  }, []);

  return (
    <div className="services-page" ref={root}>
      <nav className="seo-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Services</span>
      </nav>

      <header className="nav">
        <BrandMark />

        <nav className="nav-links" aria-label="Sections">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#plans">Plans</a>
          <a href="#faq">FAQ</a>
        </nav>

        <button type="button" className="nav-cta magnetic" onClick={() => openContact()}>
          Contact
        </button>

        <div className="nav-progress" aria-hidden="true">
          <span />
        </div>
      </header>

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="hero" id="top">
          <h1 className="hero-heading">
            <span className="hero-l1">Web development, lead generation</span>
            <span className="hero-l2">and personalised outreach.</span>
          </h1>

          <div className="hero-rule" aria-hidden="true" />

          <div className="hero-foot">
            <div className="hero-copy">
              <p className="hero-sub">
                We build your website, research the prospects who should hear from you, and run
                personalised cold email outreach to start sales conversations. Social media
                management keeps your expertise visible in between.
              </p>
              <p className="hero-meta">
                For founders, speakers, coaches, authors and real estate agents. Remote team,
                clients across the US, UK and Europe.
              </p>
            </div>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-solid magnetic"
                onClick={() => openContact()}
              >
                Discuss your project
              </button>
              <a className="btn btn-outline" href="#how">
                See how it works
              </a>
              <a className="btn btn-ghost" href="#plans">
                View plans
              </a>
            </div>
          </div>
        </section>

        <section className="statement" aria-label="What we believe">
          <p>
            Your website explains the offer. Lead generation finds the right prospects.
            Outreach starts the conversation. Social media keeps your expertise visible.
          </p>
        </section>

        {/* ---------------- Services ---------------- */}
        <section className="services" id="services" aria-labelledby="services-title">
          <div className="section-head">
            <h2 id="services-title" className="reveal">What Zarrar does</h2>
            <p className="reveal">
              Website development, lead generation, cold email outreach and social media
              management. Start with the service you need most, or connect them into one system.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s) => (
              <article className="service-card reveal" id={s.id} key={s.id}>
                <div className="service-card-top">
                  <span className="service-icon" aria-hidden="true">
                    {ICONS[s.icon]}
                  </span>
                  <span className="service-stage">{s.stage}</span>
                </div>

                <h3>{s.title}</h3>

                <p>{s.body}</p>

                <div className="service-card-actions">
                  <button
                    type="button"
                    className="btn btn-solid service-cta"
                    onClick={() => openContact()}
                  >
                    {s.cta}
                  </button>

                  <Link href={s.href} className="service-learn-more">
                    Learn more
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- How it works ---------------- */}
        <section className="flow" id="how" aria-labelledby="flow-title">
          <div className="section-head">
            <h2 id="flow-title" className="reveal">
              How lead generation and cold email outreach work together
            </h2>
            <p className="reveal">
              Most cold email fails because of the list, not the email. So we research first, write
              to each segment second, and send carefully third.
            </p>
          </div>

          <ol className="flow-track">
            {FLOW.map((step, i) => (
              <li className="flow-card reveal" key={step.id}>
                <div className="flow-top">
                  <span className="flow-num" aria-hidden="true">{i + 1}</span>
                  <span className="flow-tag">{step.tag}</span>
                </div>
                <div className="flow-mock" aria-hidden="true">
                  <FlowMock type={step.mock} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="flow-swipe" aria-hidden="true">Swipe to see every step</p>

          <div className="flow-links">
            <Link href={ROUTES.leadGeneration} className="service-learn-more">
              More on lead generation
              <ArrowIcon />
            </Link>
            <Link href={ROUTES.coldEmail} className="service-learn-more">
              More on cold email outreach
              <ArrowIcon />
            </Link>
          </div>
        </section>

        {/* ---------------- Plans ---------------- */}
        <section className="plans" id="plans" aria-labelledby="plans-title">
          <div className="section-head">
            <h2 id="plans-title" className="reveal">
              Choose the level of support that fits your business
            </h2>
            <p className="reveal">
              Start with the foundation you need today, then add social media, lead generation or
              outreach when the business is ready for it.
            </p>
          </div>

          <div className="plans-grid">
            {PLANS.map((p) => (
              <article
                className={`plan reveal${p.featured ? " is-featured" : ""}`}
                key={p.id}
              >
                {p.featured && <span className="plan-flag">Most complete</span>}

                <h3 className="plan-name">{p.name}</h3>
                <p className="plan-line">{p.line}</p>
                <p className="plan-body">{p.body}</p>

                <ul className="plan-includes">
                  {p.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${p.featured ? "btn-acid" : "btn-outline"}`}
                  onClick={() => openContact(p.name)}
                >
                  Start with {p.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- FAQ ----------------
            Real questions people ask before hiring. Same array feeds
            the FAQPage schema in page.jsx. Native <details>: no JS,
            keyboard accessible. */}
        {faqs.length > 0 && (
          <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="faq-layout">
              <div className="faq-head">
                <h2 id="faq-title" className="reveal">
                  Questions about web development, lead generation and outreach
                </h2>
                <p className="reveal">
                  Straight answers, including whether cold email is still worth doing. Not sure
                  which service fits? Tell us what you want to achieve and we will point you to the
                  simplest place to start.
                </p>
              </div>

              <div className="faq-list">
                {faqs.map((f) => (
                  <details className="faq-item" key={f.q}>
                    <summary className="faq-q">
                      <h3>{f.q}</h3>
                      <span className="faq-mark" aria-hidden="true" />
                    </summary>
                    <div className="faq-a">
                      <p>{f.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------- Closing ---------------- */}
        <section className="closing" id="contact" aria-labelledby="contact-title">
          <div className="closing-inner">
            <h2 id="contact-title" className="reveal">Tell us what you need help with.</h2>

            <div className="closing-actions reveal">
              <button
                type="button"
                className="btn btn-acid btn-lg magnetic"
                onClick={() => openContact()}
              >
                Start a project
              </button>
              <a className="btn btn-light btn-lg" href={`mailto:${CONTACT_EMAIL}`}>
                Email {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        plan={contactPlan}
      />
    </div>
  );
}

export default Services;
