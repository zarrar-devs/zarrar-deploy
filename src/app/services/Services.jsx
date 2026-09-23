"use client";

/* =============================================================
   Zarrar — /services
   -------------------------------------------------------------
   Contact modal
   - Nav "Contact", each service card's CTA, and each plan's
     "Start with…" used to be <a href="#contact"> anchors that
     jumped to the closing section.
   - They're now plain <button> elements with no href — they open
     the contact modal directly instead of scrolling.
   - The closing section's own "Say hello" button is untouched —
     it's a real mailto: link, not a scroll-to-contact link.

   Data source
   - SERVICES and PLANS used to be defined and exported right
     here. page.jsx (a server component) imported them from this
     file to build the Service/Offer JSON-LD — but this file is
     "use client", and a server component importing an export
     from a "use client" file gets a client-reference object, not
     the real array (no .map()). That's what threw
     "SERVICES.map is not a function".
   - Fix: SERVICES/PLANS now live in ./services-data.js, a plain
     (non "use client") file, same as RealEstate.jsx/Founders.jsx
     pull from realestate-data.js/founders-data.js. Icons are
     stored there as a string key and mapped to the real icon
     component below, in ICONS.
   ============================================================= */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ContactModal from "@/components/ContactModal/ContactModal";
import { SERVICES, PLANS } from "./services-data";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ---------------- Icons (decorative — hidden from AT) ---------------- */

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

/* string key (from services-data.js) -> actual icon element */
const ICONS = {
  web: <WebIcon />,
  outreach: <OutreachIcon />,
  social: <SocialIcon />,
};

/* ---------------- Component ---------------- */

function Services({ faqs = [] }) {
  const root = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState(null);

  // Opens the contact modal. Pass a plan name (e.g. "Growth") when the
  // click came from a specific plan's CTA, or leave it out for a
  // generic contact click (nav, service cards).
  const openContact = (plan = null) => {
    setContactPlan(plan);
    setContactOpen(true);
  };

  useIsoLayoutEffect(() => {
    const splits = [];
    let lenis;

    /* optional smooth scroll — skipped silently if lenis isn't installed */
    const startSmooth = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      try {
        const { default: Lenis } = await import("lenis");

        lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* native scroll is fine */
      }
    };

    startSmooth();

    const ctx = gsap.context((self) => {
      const q = self.selector;

      /* ---- lightweight heading reveal ---- */
      const headingIn = (el, opts = {}) => {
        if (!el) return gsap.timeline();

        return gsap.from(el, {
          yPercent: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: opts.trigger
            ? {
                trigger: opts.trigger,
                start: opts.start || "top 85%",
                once: true,
              }
            : undefined,
        });
      };

      const linesIn = (el, opts = {}) => {
        if (!el) return gsap.timeline();

        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
          aria: "auto",
        });

        splits.push(split);

        return gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: opts.trigger
            ? {
                trigger: opts.trigger,
                start: opts.start || "top 85%",
                once: true,
              }
            : undefined,
        });
      };

      const drawIcon = (svg, trigger) => {
        if (!svg) return;

        const strokes = svg.querySelectorAll(".draw");

        strokes.forEach((s) => {
          const len = s.getTotalLength ? s.getTotalLength() : 200;

          gsap.set(s, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });

        gsap.to(strokes, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger,
            start: "top 80%",
            once: true,
          },
        });
      };

      const mm = gsap.matchMedia();

      /* ================= reduced motion ================= */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".hero-rule"), {
          scaleX: 1,
        });
      });

      /* ================= everything else ================= */

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        (mctx) => {
          const { isDesktop } = mctx.conditions || {};

          /* ---- load sequence ---- */

          gsap
            .timeline({
              defaults: {
                ease: "expo.out",
              },
            })
            .from(q(".logo, .nav-links a, .nav-cta"), {
              yPercent: -160,
              opacity: 0,
              duration: 0.75,
              stagger: 0.05,
            })
            .add(headingIn(q(".hero-l1")[0]), 0.06)
            .add(headingIn(q(".hero-l2")[0]), 0.2)
            .add(linesIn(q(".hero-sub")[0]), 0.42)
            .from(
              q(".hero-actions > *"),
              {
                y: 24,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
              },
              0.55
            )
            .to(
              q(".hero-rule"),
              {
                scaleX: 1,
                duration: 1.1,
                ease: "power3.inOut",
              },
              0.35
            );

          /* ---- scroll progress ---- */

          gsap.to(q(".nav-progress span"), {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          });

          /* ---- hero drifts away as you leave it ---- */

          gsap.to(q(".hero-heading"), {
            yPercent: -14,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: q(".hero")[0],
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          /* ---- section heads ---- */

          q(".section-head").forEach((head) => {
            headingIn(head.querySelector("h2"), {
              trigger: head,
              start: "top 82%",
            });

            linesIn(head.querySelector("p"), {
              trigger: head,
              start: "top 80%",
            });
          });

          /* ---- the statement: words light up on scrub ---- */

          const stmt = q(".statement p")[0];

          if (stmt) {
            const split = SplitText.create(stmt, {
              type: "words",
              wordsClass: "word",
              aria: "auto",
            });

            splits.push(split);

            gsap.fromTo(
              split.words,
              {
                opacity: 0.16,
              },
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

          /* ---- service cards ---- */

          const cards = q(".service-card");

          gsap.from(cards, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: q(".services-grid")[0],
              start: "top 80%",
              once: true,
            },
          });

          cards.forEach((card) => {
            headingIn(card.querySelector("h3"), {
              trigger: card,
              start: "top 82%",
            });

            drawIcon(card.querySelector("svg"), card);
          });

          /* ---- plans land tilted in 3D, then settle ---- */

          gsap.set(q(".plans-grid"), {
            perspective: 1400,
          });

          gsap.from(q(".plan"), {
            y: 88,
            rotateX: -13,
            opacity: 0,
            transformOrigin: "50% 0%",
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: q(".plans-grid")[0],
              start: "top 78%",
              once: true,
            },
          });

          q(".plan").forEach((plan) => {
            gsap.from(plan.querySelectorAll(".plan-includes li"), {
              y: 14,
              opacity: 0,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.05,
              scrollTrigger: {
                trigger: plan,
                start: "top 72%",
                once: true,
              },
            });
          });

          /* desktop-only: the featured plan lifts as it passes */

          if (isDesktop) {
            gsap.to(q(".plan.is-featured"), {
              y: -34,
              ease: "none",
              scrollTrigger: {
                trigger: q(".plans-grid")[0],
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          /* ---- closing ---- */

          const close = q(".closing")[0];

          if (close) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: close,
                  start: "top 82%",
                  once: true,
                },
              })
              .add(headingIn(close.querySelector("h2")))
              .from(
                close.querySelector(".btn"),
                {
                  y: 28,
                  opacity: 0,
                  duration: 0.65,
                  ease: "back.out(1.6)",
                },
                "-=0.45"
              );
          }
        },
        {
          isDesktop: "(min-width: 900px)",
        }
      );

      /* ---- magnetic buttons ---- */

      mm.add("(hover: hover) and (pointer: fine)", () => {
        const cleanups = [];

        q(".magnetic").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", {
            duration: 0.5,
            ease: "power3",
          });

          const yTo = gsap.quickTo(el, "y", {
            duration: 0.5,
            ease: "power3",
          });

          const move = (e) => {
            const r = el.getBoundingClientRect();

            xTo(
              (e.clientX - (r.left + r.width / 2)) * 0.28
            );

            yTo(
              (e.clientY - (r.top + r.height / 2)) * 0.42
            );
          };

          const leave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);

          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    }, root);

    /* webfonts change metrics — re-measure line splits once they land */

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      lenis?.destroy();
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="services-page" ref={root}>

        <header className="nav">
          <a className="logo" href="#top">
            Zarrar
          </a>

          <nav
            className="nav-links"
            aria-label="Sections"
          >
            <a href="#services">SERVICES</a>
            <a href="#plans">PLANS</a>
            <a href="#faq">FAQ</a>
          </nav>

          <button
            type="button"
            className="nav-cta magnetic"
            onClick={() => openContact()}
          >
            Contact
          </button>

          <div
            className="nav-progress"
            aria-hidden="true"
          >
            <span />
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <h1 className="hero-heading">
              <span className="hero-l1">
                Get found.
              </span>

              <span className="hero-l2">
                Get booked.
              </span>
            </h1>

            <div
              className="hero-rule"
              aria-hidden="true"
            />

            <div className="hero-foot">
              <p className="hero-sub">
                Website development, social media management,
                and cold email lead generation — so speakers,
                authors, coaches and founders spend their time
                on the work instead of chasing it.
              </p>

              <div className="hero-actions">
                <a
                  className="btn btn-solid magnetic"
                  href="#plans"
                >
                  See the plans
                </a>

                <a
                  className="btn btn-ghost"
                  href="#services"
                >
                  What we do
                </a>
              </div>
            </div>
          </section>

          <section
            className="statement"
            aria-label="What we believe"
          >
            <p>
              You don&apos;t have a talent problem. You have a
              nobody-can-find-you problem — and that one is fixable.
            </p>
          </section>

          <section
            className="services"
            id="services"
            aria-labelledby="services-title"
          >
            <div className="section-head">
              <h2 id="services-title">
                What we do
              </h2>

              <p>
                Website development, lead generation and
                social media management — pick one, or let
                them work together.
              </p>
            </div>

            <div className="services-grid">
              {SERVICES.map((s) => (
                <article
                  className="service-card"
                  id={s.id}
                  key={s.id}
                >
                  <span
                    className="service-icon"
                    aria-hidden="true"
                  >
                    {ICONS[s.icon]}
                  </span>

                  <h3>{s.title}</h3>

                  <p>{s.body}</p>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => openContact()}
                  >
                    {s.cta}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section
            className="plans"
            id="plans"
            aria-labelledby="plans-title"
          >
            <div className="section-head">
              <h2 id="plans-title">
                Pick a starting point
              </h2>

              <p>
                Each plan builds on the one before it.
                Move up whenever you&apos;re ready.
              </p>
            </div>

            <div className="plans-grid">
              {PLANS.map((p) => (
                <article
                  className={`plan${
                    p.featured
                      ? " is-featured"
                      : ""
                  }`}
                  key={p.id}
                >
                  {p.featured && (
                    <span className="plan-flag">
                      Most complete
                    </span>
                  )}

                  <h3 className="plan-name">
                    {p.name}
                  </h3>

                  <p className="plan-line">
                    {p.line}
                  </p>

                  <p className="plan-body">
                    {p.body}
                  </p>

                  <ul className="plan-includes">
                    {p.includes.map((item) => (
                      <li key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`btn ${
                      p.featured
                        ? "btn-acid"
                        : "btn-outline"
                    }`}
                    onClick={() => openContact(p.name)}
                  >
                    Start with {p.name}
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------
              FAQ — added for SEO. Real questions people type before
              hiring an agency, backing the FAQPage schema in
              page.jsx (legitimate only because these answers are
              visible on the page). Native <details>/<summary>: no
              JS needed, keyboard-accessible for free.
              ------------------------------------------------------ */}
          {faqs.length > 0 && (
            <section className="faq" id="faq" aria-labelledby="faq-title">
              <div className="section-head">
                <h2 id="faq-title">Questions we get asked</h2>
                <p>If yours isn&apos;t here, email us and you&apos;ll get a straight answer.</p>
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
            </section>
          )}

          <section
            className="closing"
            id="contact"
            aria-labelledby="contact-title"
          >
            <h2 id="contact-title">
              Tell us what you&apos;re building.
            </h2>

            <a
              className="btn btn-solid btn-lg magnetic"
              href="mailto:hello@zarrar.co"
            >
              Say hello
            </a>
          </section>
        </main>

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          plan={contactPlan}
        />
      </div>
    </>
  );
}

export default Services;
