"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "../TransitionLink";
import ContactModalLink from "../ContactModalLink";
import { lpFontVars } from "./landing-fonts";
import { MANIFESTO } from "./landing-data";
import RevealWords from "./RevealWords";
import styles from "./Landing.module.css";
import { ROUTES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/* "We don't build normal websites."
   This is the section that says what makes the studio different, in
   words a visitor AND a crawler can read (it is plain HTML text; the
   animation only decorates it).
   Motion (all skipped for reduced motion; the resting state is the
   finished state, so no-JS visitors see the struck-through comparison):
   - headline words slide up from behind their masks, then the word
     "normal" gets struck through;
   - every row compares a normal-website trait with the Zarrar way: on
     desktop the struck line is SCRUBBED by scroll (you literally cross
     it out as you read down), on touch it plays once;
   - a huge outlined word drifts behind the headline (desktop only). */
export default function Manifesto() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const q = gsap.utils.selector(root);

      /* headline */
      const words = q(`.${styles.manifestoTitle} .${styles.w}`);
      const stamp = q(`.${styles.manifestoTitle} .${styles.stamp}`)[0];
      if (stamp) gsap.set(stamp, { "--s": 0 });

      const head = gsap.timeline({
        scrollTrigger: { trigger: q(`.${styles.manifestoTitle}`)[0], start: "top 85%", once: true },
      });
      head.from(words, {
        yPercent: 115,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.07,
      });
      if (stamp) head.to(stamp, { "--s": 1, duration: 0.7, ease: "power3.inOut" }, "-=0.1");

      gsap.from(q(`.${styles.manifestoLede}, .${styles.manifestoActions}`), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: q(`.${styles.manifestoLede}`)[0], start: "top 88%", once: true },
      });

      /* comparison rows */
      q(`.${styles.cmpRow}`).forEach((row) => {
        const normal = row.querySelector(`.${styles.cmpNormalText}`);
        const zarrar = row.querySelector(`.${styles.cmpZarrarText}`);
        const mark = row.querySelector(`.${styles.cmpTick}`);

        /* before it is read, the "normal" trait is plain full-strength text;
           the strike and the dimming arrive together */
        gsap.set(normal, { "--strike": 0, opacity: 1 });

        if (fine) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 80%", end: "top 42%", scrub: 0.5 },
          });
          tl.to(normal, { "--strike": 1, opacity: 0.45, ease: "none", duration: 1 })
            .fromTo(
              zarrar,
              { opacity: 0.2, x: 36 },
              { opacity: 1, x: 0, ease: "none", duration: 1 },
              0.15
            )
            .fromTo(mark, { scale: 0 }, { scale: 1, ease: "back.out(2)", duration: 0.5 }, 0.7);
        } else {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
          tl.to(normal, { "--strike": 1, opacity: 0.55, duration: 0.6, ease: "power2.inOut" })
            .from(zarrar, { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" }, 0.15)
            .from(mark, { scale: 0, duration: 0.4, ease: "back.out(2)" }, 0.4);
        }
      });

      /* desktop: outlined ghost word drifts behind the headline */
      const ghost = q(`.${styles.ghostWord}`)[0];
      if (fine && ghost) {
        gsap.fromTo(
          ghost,
          { xPercent: 6 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }

      /* magnetic buttons: mouse only */
      const cleanups = [];
      if (fine) {
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
      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="not-normal"
      className={`${lpFontVars} ${styles.lp} ${styles.manifesto}`}
      aria-labelledby="manifesto-title"
    >
      <div className={styles.ghostWord} aria-hidden="true">
        custom
      </div>

      <div className={styles.manifestoInner}>
        <p className={styles.label}>The difference</p>

        <h2 id="manifesto-title" className={`${styles.manifestoTitle}`}>
          <RevealWords words={MANIFESTO.title} />
        </h2>

        <p className={styles.manifestoLede}>{MANIFESTO.lede}</p>

        <div className={styles.cmp}>
          <div className={styles.cmpHead} aria-hidden="true">
            <span>{MANIFESTO.normalLabel}</span>
            <span>{MANIFESTO.zarrarLabel}</span>
          </div>

          <ul className={styles.cmpList}>
            {MANIFESTO.rows.map(([normal, zarrar]) => (
              <li className={styles.cmpRow} key={normal}>
                <p className={styles.cmpNormal}>
                  <span className={styles.cmpTag}>{MANIFESTO.normalLabel}</span>
                  <span className={styles.cmpNormalText}>{normal}</span>
                </p>
                <p className={styles.cmpZarrar}>
                  <span className={styles.cmpTag}>{MANIFESTO.zarrarLabel}</span>
                  <span className={styles.cmpTick} aria-hidden="true" />
                  <span className={styles.cmpZarrarText}>{zarrar}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.manifestoActions}>
          <TransitionLink href={ROUTES.services} className={`${styles.btn} ${styles.btnSolid} ${styles.magnetic}`}>
            See how we build
          </TransitionLink>
          <ContactModalLink href={ROUTES.contact} className={`${styles.btn} ${styles.btnLine}`}>
            Discuss your project
          </ContactModalLink>
        </div>
      </div>
    </section>
  );
}
