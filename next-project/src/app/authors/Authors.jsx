"use client";

/* =============================================================
   Zarrar — /authors  ·  client component
   -------------------------------------------------------------
   Split from the original app/authors/page.jsx, which carried
   "use client" — metadata and viewport CANNOT be exported from a
   client file, and Next does not warn you, so this page shipped
   with no title, no description, no canonical of its own. The
   route's server page.jsx now owns metadata + JSON-LD and renders
   this file for the interactive GSAP work.

   PROMISES / TESTIMONIALS / GENRES / CHAPTERS / TIMELINE / FAQS /
   EDITIONS (and the small icon components) live in ./authors-data.jsx,
   a file with NO "use client" directive — don't move them back here.
   See that file's header comment for why (it fixes a Server Component
   import bug where page.jsx's CHAPTERS.map() would break).

   Black-and-white "editor's desk" theme kept as-is. TESTIMONIALS
   starts empty on purpose — add a real quote from a real person
   with their permission, or leave it empty. Never fill it with
   placeholder praise: fabricated reviews are treated as deceptive
   under Google's spam policies and undermine the credibility this
   page exists to build.

   GENRES is still example content — trim to the real body of work
   before launch.

   Contact CTAs (nav, chapter buttons, edition/plan buttons, and
   the closing "Say hello" button) all open the shared ContactModal
   instead of jumping to a #contact anchor or a mailto: link. The
   edition/plan buttons additionally pass which plan was clicked
   (via `selectedPlan`) into the modal, so that plan name rides
   along with the submission — see openContact() below.
   ============================================================= */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./authors.css";
import ContactModal from "@/components/ContactModal/ContactModal";
import {
  PROMISES,
  TESTIMONIALS,
  GENRES,
  CHAPTERS,
  TIMELINE,
  FAQS,
  EDITIONS,
} from "./authors-data";

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ---------------- Site constants ---------------- */

/* Real domain, route and email now come from src/lib/site.js via the
   server page.jsx. This used to hardcode "https://zarrar.com" (wrong
   TLD) and "/for-authors" (a route that doesn't exist — the folder is
   /authors). */
import { SITE_URL, ROUTES, CONTACT_EMAIL, url as siteUrl } from "@/lib/site";
const PAGE_URL = siteUrl(ROUTES.authors);

/* ---------------- Structured data ---------------- */

/* Escape "<" so content can never close the <script> tag early. */
/* ---------------- Helpers ---------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Component ---------------- */

function Authors() {
  const root = useRef(null);
  const lenisRef = useRef(null);
  const toggleRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  /* Opens the shared ContactModal instead of following a #contact
     anchor or a mailto: link. Stops propagation so the root's
     smooth-scroll anchor handler (handleAnchorClick, below) doesn't
     also fire and scroll the page behind the modal.

     Takes an optional plan name — pass it from an edition/plan
     button (e.g. openContact("Hardcover")) so the modal knows which
     plan the click came from and can send it along with the
     submission. Leave it out (openContact()) for CTAs that aren't
     tied to a specific plan, like the nav "Contact" link. */
  const openContact = (planName = null) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  /* Mobile menu: close on Escape (and return focus to the toggle)
     or outside click, lock background scroll while open. */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (!e.target.closest(".nav")) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenisRef.current?.start();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useIsoLayoutEffect(() => {
    const splits = [];
    const node = root.current;
    let cancelled = false;
    let tickerFn = null;
    let mm = null;

    /* ---- smooth scroll (Lenis), fully cleaned up on unmount ---- */
    const startSmooth = async () => {
      if (prefersReducedMotion()) return;
      try {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        const instance = new Lenis({ duration: 1.1, smoothWheel: true });
        lenisRef.current = instance;
        instance.on("scroll", ScrollTrigger.update);
        tickerFn = (t) => instance.raf(t * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* native scroll is fine */
      }
    };
    startSmooth();

    /* Same-page nav links glide to their target. Goes through Lenis
       when it's running, native smooth scroll otherwise. Moves focus
       to the target so keyboard and screen-reader users land there,
       and closes the mobile menu. */
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      let target = null;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      if (!target) return;

      e.preventDefault();
      const reduce = prefersReducedMotion();
      const lenis = lenisRef.current;

      if (lenis && !reduce) {
        lenis.scrollTo(target, { offset: -80, duration: 1.3 });
      } else {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      window.history.pushState(null, "", hash);
      setMenuOpen(false);
    };
    node?.addEventListener("click", handleAnchorClick);

    const ctx = gsap.context((self) => {
      const q = self.selector;

      /* Ink-fill: lines grow in from the left edge, like a line
         being written. */
      const inkIn = (el, opts = {}) => {
        if (!el) return gsap.timeline();
        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
          aria: "auto",
        });
        splits.push(split);
        gsap.set(split.lines, { transformOrigin: "0% 50%" });
        return gsap.from(split.lines, {
          scaleX: 0,
          duration: 0.95,
          ease: "power4.inOut",
          stagger: 0.12,
          onComplete: () => gsap.set(split.lines, { clearProps: "willChange" }),
          scrollTrigger: opts.trigger
            ? { trigger: opts.trigger, start: opts.start || "top 82%", once: true }
            : undefined,
        });
      };

      /* Soft focus-pull: words rise and sharpen out of a blur,
         used for supporting copy rather than headlines. */
      const wordsUp = (el, opts = {}) => {
        if (!el) return gsap.timeline();
        const split = SplitText.create(el, {
          type: "lines,words",
          linesClass: "line",
          wordsClass: "word",
          mask: "lines",
          aria: "auto",
        });
        splits.push(split);
        return gsap.from(split.words, {
          yPercent: 120,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.015,
          scrollTrigger: opts.trigger
            ? { trigger: opts.trigger, start: opts.start || "top 85%", once: true }
            : undefined,
        });
      };

      /* Page-turn: the recurring physical motif for chapter rows and
         editions — like opening to that page. Perspective is set on
         each element so every card rotates in its own 3D space. */
      const pageTurn = (elements, opts = {}) => {
        if (!elements || elements.length === 0) return gsap.timeline();
        gsap.set(elements, { transformPerspective: 1400 });
        return gsap.from(elements, {
          rotateY: -62,
          opacity: 0,
          transformOrigin: "0% 50%",
          duration: 1,
          ease: "power3.out",
          stagger: opts.stagger ?? 0.09,
          scrollTrigger: {
            trigger: opts.trigger,
            start: opts.start || "top 82%",
            once: true,
          },
        });
      };

      const drawIcon = (svg, trigger) => {
        if (!svg) return;
        const strokes = svg.querySelectorAll(".draw");
        strokes.forEach((s) => {
          const len = s.getTotalLength ? s.getTotalLength() : 160;
          gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(strokes, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: { trigger, start: "top 80%", once: true },
        });
      };

      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".nav-progress span"), { scaleX: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---- one orchestrated load sequence ---- */
        const shelf = q(".spine");
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q(".logo, .nav-links a, .nav-cta, .nav-toggle"), {
            y: -18,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
          })
          .add(inkIn(q(".hero-l1")[0]), 0.1)
          .add(inkIn(q(".hero-l2")[0]), 0.28)
          .add(wordsUp(q(".hero-sub")[0]), 0.55)
          .from(q(".hero-actions > *"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7)
          .from(
            shelf,
            {
              xPercent: 40,
              opacity: 0,
              rotate: -6,
              duration: 1,
              stagger: { each: 0.06, from: "end" },
            },
            0.35
          );

        /* ---- scroll progress, styled as a bookmark ribbon ---- */
        gsap.to(q(".nav-progress span"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });

        /* ---- hero settles back as you leave it ---- */
        gsap.to(q(".hero-copy"), {
          yPercent: -10,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: q(".hero")[0], start: "top top", end: "bottom top", scrub: 0.6 },
        });

        /* ---- how-we-work strip ---- */
        gsap.from(q(".praise-inner > *"), {
          y: 14,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q(".praise")[0], start: "top 88%", once: true },
        });

        /* ---- real testimonials (only present if you add some) ---- */
        const testimonials = q(".testimonial");
        if (testimonials.length) {
          gsap.from(testimonials, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: q(".testimonials")[0], start: "top 82%", once: true },
          });
        }

        /* ---- section heads ---- */
        q(".section-head").forEach((head) => {
          inkIn(head.querySelector("h2"), { trigger: head, start: "top 82%" });
          wordsUp(head.querySelector("p"), { trigger: head, start: "top 80%" });
        });

        /* ---- genres ---- */
        pageTurn(q(".card"), { trigger: q(".genres-grid")[0] });

        /* ---- chapters: page-turn rows + drawn icons ---- */
        pageTurn(q(".chapter"), { trigger: q(".chapters-list")[0], stagger: 0.12 });
        q(".chapter").forEach((row) => drawIcon(row.querySelector("svg"), row));

        /* ---- timeline ---- */
        gsap.from(q(".timeline-step"), {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: q(".timeline-list")[0], start: "top 82%", once: true },
        });

        /* ---- editions: page-turn + includes stagger ---- */
        pageTurn(q(".edition"), { trigger: q(".editions-grid")[0], stagger: 0.1 });
        q(".edition").forEach((ed) => {
          gsap.from(ed.querySelectorAll(".edition-includes li"), {
            y: 12,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ed, start: "top 70%", once: true },
          });
        });

        /* ---- FAQ rows ---- */
        gsap.from(q(".faq-item"), {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: q(".faq-list")[0], start: "top 82%", once: true },
        });

        /* ---- closing ---- */
        const close = q(".closing")[0];
        if (close) {
          gsap
            .timeline({ scrollTrigger: { trigger: close, start: "top 82%", once: true } })
            .add(inkIn(close.querySelector("h2")))
            .from(close.querySelector(".btn"), { y: 24, opacity: 0, duration: 0.6, ease: "back.out(1.6)" }, "-=0.4")
            .from(close.querySelector(".closing-links"), { opacity: 0, duration: 0.5 }, "-=0.2");
        }
      });

      /* ---- magnetic buttons (fine pointers only) ---- */
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups = [];
        q(".magnetic").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          const move = (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.34);
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
    }, root);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      node?.removeEventListener("click", handleAnchorClick);

      mm?.revert();
      ctx.revert();
      splits.forEach((s) => s.revert());

      if (tickerFn) gsap.ticker.remove(tickerFn);
      gsap.ticker.lagSmoothing(500, 33);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="authors-page" ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="nav">
        <a className="logo" href="/">Zarrar</a>
        <nav
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Sections"
        >
          <a href="#genres">Genres</a>
          <a href="#chapters">Services</a>
          <a href="#how">Process</a>
          <a href="#editions">Editions</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-right">
          <a className="nav-cta magnetic" onClick={openContact()}>
            Contact
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
        <div className="nav-progress" aria-hidden="true"><span /></div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1 className="hero-heading">
              <span className="hero-l1">You wrote the book.</span>{" "}
              <span className="hero-l2">We build its audience.</span>
            </h1>
            <p className="hero-sub">
              A premium author website that sells the book on sight, lead
              generation and outreach that put you in front of agents, press
              and podcasts, and social media management that keeps readers
              coming back for the next one.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid magnetic" href="#editions">See the editions</a>
              <a className="btn btn-ghost" href="#chapters">How it works</a>
            </div>
          </div>

          <div className="hero-shelf" aria-hidden="true">
            <span className="spine" />
            <span className="spine" />
            <span className="spine" />
            <span className="spine" />
            <span className="spine" />
            <span className="spine" />
            <span className="spine" />
          </div>
        </section>

        {/* Factual "how we work" strip — replaces the old fake praise. */}
        <section className="praise" id="praise" aria-label="How we work">
          <ul className="praise-inner">
            {PROMISES.map((p) => (
              <li className="praise-quote" key={p.title}>
                <strong>{p.title}</strong>
                <span className="praise-source">{p.line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Renders only once you add real testimonials above. */}
        {TESTIMONIALS.length > 0 && (
          <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
            <div className="section-head">
              <h2 id="testimonials-title">What authors say</h2>
            </div>
            <div className="testimonials-list">
              {TESTIMONIALS.map((t) => (
                <figure className="testimonial" key={`${t.name}-${t.quote.slice(0, 24)}`}>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption>
                    {t.url ? (
                      <a href={t.url} rel="noopener noreferrer" target="_blank">{t.name}</a>
                    ) : (
                      t.name
                    )}
                    {t.role ? `, ${t.role}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="genres" id="genres" aria-labelledby="genres-title">
          <div className="section-head">
            <h2 id="genres-title">Built for every kind of author</h2>
            <p>Whatever you write, the site and outreach are built around it.</p>
          </div>

          <ul className="genres-grid">
            {GENRES.map((g) => (
              <li className="card" key={g.title}>
                <h3 className="card-title">{g.title}</h3>
                <p>{g.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="chapters" id="chapters" aria-labelledby="chapters-title">
          <div className="section-head">
            <h2 id="chapters-title">Three ways we get you read</h2>
            <p>Pick one chapter, or run the whole book.</p>
          </div>

          <div className="chapters-list">
            {CHAPTERS.map((c) => (
              <article className="chapter" key={c.title}>
                <span className="chapter-num" aria-hidden="true">{c.numeral}</span>
                <div className="chapter-head">
                  <span className="chapter-icon" aria-hidden="true">{c.icon}</span>
                  <h3 className="chapter-title">{c.title}</h3>
                </div>
                <p>{c.body}</p>
                <a className="btn btn-outline" onClick={openContact()}>
                  {c.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline" id="how" aria-labelledby="timeline-title">
          <div className="section-head">
            <h2 id="timeline-title">What the first 90 days look like</h2>
            <p>The rough order the pieces come online. Exact pace depends on your genre and release calendar.</p>
          </div>

          <ol className="timeline-list">
            {TIMELINE.map((s) => (
              <li className="timeline-step" key={s.title}>
                <span className="timeline-when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="editions" id="editions" aria-labelledby="editions-title">
          <div className="section-head">
            <h2 id="editions-title">Pick an edition</h2>
            <p>Each one builds on the last. Move up whenever you&apos;re ready.</p>
          </div>

          <div className="editions-grid">
            {EDITIONS.map((ed) => (
              <article className={`edition${ed.featured ? " is-featured" : ""}`} key={ed.id}>
                {ed.featured && <span className="edition-flag">Most complete</span>}
                <h3 className="edition-name">{ed.name}</h3>
                <p className="edition-line">{ed.line}</p>
                <p className="edition-body">{ed.body}</p>
                <ul className="edition-includes">
                  {ed.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {/* This is the actual "which plan did they pick" click —
                    ed.name ("Paperback" / "Hardcover" / "Reborn") is
                    passed straight into openContact so it rides along
                    with the ContactModal submission. */}
                <a
                  className={`btn ${ed.featured ? "btn-invert" : "btn-outline"}`}
                  onClick={openContact(ed.name)}
                >
                  Start with {ed.name}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="faq" id="faq" aria-labelledby="faq-title">
          <div className="section-head">
            <h2 id="faq-title">Questions authors ask us</h2>
            <p>If yours isn&apos;t here, ask us directly.</p>
          </div>

          <div className="faq-list">
            {FAQS.map((f, i) => {
              const isOpen = openFAQ === i;
              const qId = `faq-q-${i}`;
              const aId = `faq-a-${i}`;
              return (
                <div className={`faq-item${isOpen ? " is-open" : ""}`} key={f.q}>
                  <h3 className="faq-heading">
                    <button
                      type="button"
                      className="faq-q"
                      id={qId}
                      aria-expanded={isOpen}
                      aria-controls={aId}
                      onClick={() => setOpenFAQ(isOpen ? -1 : i)}
                    >
                      <span>{f.q}</span>
                      <span className="faq-mark" aria-hidden="true">+</span>
                    </button>
                  </h3>
                  <div
                    className="faq-a"
                    id={aId}
                    role="region"
                    aria-labelledby={qId}
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-a-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="closing" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Ready to sell more books?</h2>
          <a
            className="btn btn-solid btn-lg magnetic"
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={openContact()}
          >
            Say hello
          </a>
          <p className="closing-links">
            <span className="closing-alt">Not an author? <a href="/#who-we-are">See who else we work with</a></span>
            <span className="closing-alt"><a href={ROUTES.speakers}>See our page for speakers</a></span>
          </p>
        </section>
      </main>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}

export default Authors;