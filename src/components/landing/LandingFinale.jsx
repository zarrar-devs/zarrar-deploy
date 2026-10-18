"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "../TransitionLink";
import ContactModalLink from "../ContactModalLink";
import { lpFontVars } from "./landing-fonts";
import { AUDIENCE, FOUNDER_BAND, FAQ_TITLE, FAQS } from "./landing-data";
import RevealWords from "./RevealWords";
import styles from "./Landing.module.css";
import { BRAND, CONTACT_EMAIL, PERSONAS, ROUTES } from "@/lib/site";
import { FOUNDER } from "@/app/about/about-data";

gsap.registerPlugin(ScrollTrigger);

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The dark final act, three parts, all plain crawlable HTML:
   1. WHO WE WORK WITH: the five audience pages as a big list (internal
      links with descriptive anchor text, the same wording as the footer).
   2. FOUNDER-LED: connects the landing page to /about. Name and title
      come from the same record the About page and its Person schema use.
   3. FAQ: the same array that page.jsx turns into FAQPage JSON-LD.
   It sits on the near-black the footer uses, so on desktop it reads as
   the start of the footer rather than another white panel. */
export default function LandingFinale() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const q = gsap.utils.selector(root);
      const tweens = [];

      /* every heading: words slide up from their masks */
      q(`.${styles.finaleTitle}`).forEach((h) => {
        const words = h.querySelectorAll(`.${styles.w}`);
        tweens.push(
          gsap.from(words, {
            yPercent: 115,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: { trigger: h, start: "top 88%", once: true },
          })
        );
      });

      /* fade-up groups (lede copy, founder text, FAQ intro) */
      q(`.${styles.fadeUp}`).forEach((el) => {
        tweens.push(
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          })
        );
      });

      /* audience rows and FAQ rows: batched stagger. Set the initial state
         before they enter the viewport so they reveal smoothly without flashing. */
      const rows = q(`.${styles.audItem}, .${styles.faqItem}`);
      gsap.set(rows, { opacity: 0, y: 30 });
      const batch = ScrollTrigger.batch(rows, {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "opacity,transform",
          }),
      });

      /* desktop: audience names slide as the pointer moves along the list */
      const cleanups = [];
      if (fine) {
        q(`.${styles.audLink}`).forEach((link) => {
          const name = link.querySelector(`.${styles.audName}`);
          const xTo = gsap.quickTo(name, "x", { duration: 0.6, ease: "power3" });
          const move = (e) => {
            const r = link.getBoundingClientRect();
            xTo(((e.clientX - r.left) / r.width - 0.5) * 36);
          };
          const leave = () => xTo(0);
          link.addEventListener("pointermove", move);
          link.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            link.removeEventListener("pointermove", move);
            link.removeEventListener("pointerleave", leave);
          });
        });

        q(`.${styles.magnetic}`).forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          const move = (e) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
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
      }

      return () => {
        cleanups.forEach((fn) => fn());
        tweens.forEach((t) => t.kill());
        batch.forEach((st) => st.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className={`${lpFontVars} ${styles.lp} ${styles.finale}`}>
      {/* ---------- 1. who we work with ---------- */}
      <section className={styles.finaleSection} id="who-we-work-with" aria-labelledby="audience-title">
        <p className={styles.labelLight}>Who we work with</p>
        <h2 id="audience-title" className={styles.finaleTitle}>
          <RevealWords words={AUDIENCE.title} />
        </h2>
        <p className={`${styles.finaleLede} ${styles.fadeUp}`}>{AUDIENCE.lede}</p>

        <ul className={styles.aud}>
          {PERSONAS.map((p) => (
            <li className={styles.audItem} key={p.href}>
              <TransitionLink href={p.href} className={styles.audLink}>
                <span className={styles.audName}>{p.label}</span>
                <span className={styles.audAnchor}>{p.anchor}</span>
                <Arrow />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 2. founder-led (connects to /about) ---------- */}
      <section className={`${styles.finaleSection} ${styles.founder}`} id="founder" aria-labelledby="founder-title">
        <h2 id="founder-title" className={styles.finaleTitle}>
          <RevealWords words={FOUNDER_BAND.title} />
        </h2>
        <div className={`${styles.founderCopy} ${styles.fadeUp}`}>
          <p>
            {BRAND} is led by {FOUNDER.name}, {FOUNDER.title}. {FOUNDER.name} started the agency and is
            responsible for every website, prospect list and campaign it delivers, so you always know who is
            accountable for the work.
          </p>
          <TransitionLink href={ROUTES.about} className={`${styles.btn} ${styles.btnLight} ${styles.magnetic}`}>
            Meet {FOUNDER.name}
            <Arrow />
          </TransitionLink>
        </div>
      </section>

      {/* ---------- 3. FAQ ---------- */}
      <section className={`${styles.finaleSection} ${styles.faq}`} id="faq" aria-labelledby="faq-title">
        <div className={styles.faqHead}>
          <h2 id="faq-title" className={styles.finaleTitle}>
            <RevealWords words={FAQ_TITLE.split(" ")} />
          </h2>
          <p className={`${styles.finaleLede} ${styles.fadeUp}`}>
            Straight answers about how we work. Something not covered? Tell us what you are trying to achieve and we
            will point you to the simplest place to start.
          </p>
          <div className={`${styles.faqActions} ${styles.fadeUp}`}>
            <ContactModalLink href={ROUTES.contact} className={`${styles.btn} ${styles.btnWhite} ${styles.magnetic}`}>
              Start a project
            </ContactModalLink>
            <a className={styles.textLinkLight} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((f) => (
            <details className={styles.faqItem} key={f.q}>
              <summary className={styles.faqQ}>
                <h3>{f.q}</h3>
                <span className={styles.faqMark} aria-hidden="true" />
              </summary>
              <div className={styles.faqA}>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
