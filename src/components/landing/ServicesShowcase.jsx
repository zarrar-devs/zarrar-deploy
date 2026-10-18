"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "../TransitionLink";
import ContactModalLink from "../ContactModalLink";
import { lpFontVars } from "./landing-fonts";
import { SHOWCASE, PANELS } from "./landing-data";
import RevealWords from "./RevealWords";
import styles from "./Landing.module.css";
import { ROUTES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/* ---------- decorative illustrations (pure CSS, hidden from AT) ----------
   Each one is the service drawn as a tiny product UI, and each one
   "plays" when its panel becomes active (the .isActive class). */

function VisualWeb() {
  return (
    <div className={styles.visWeb}>
      <div className={styles.wfBar}>
        <i /><i /><i />
        <span />
      </div>
      <div className={styles.wfBody}>
        <div className={styles.wfHero}>
          <b style={{ "--w": "78%" }} />
          <b style={{ "--w": "54%" }} />
          <em />
        </div>
        <div className={styles.wfCards}>
          <i /><i /><i />
        </div>
      </div>
      <span className={styles.wfCursor} />
    </div>
  );
}

function VisualLeads() {
  const rows = [
    ["Head of Events", true],
    ["Founder", true],
    ["Intern", false],
    ["Director", true],
  ];
  return (
    <div className={styles.visLeads}>
      {rows.map(([label, fit], i) => (
        <div className={`${styles.lgRow}${fit ? "" : ` ${styles.lgOut}`}`} style={{ "--i": i }} key={label}>
          <span className={styles.lgAvatar} />
          <span className={styles.lgText}>{label}</span>
          <span className={styles.lgBadge}>{fit ? "Fits" : "Excluded"}</span>
        </div>
      ))}
    </div>
  );
}

function VisualEmail() {
  return (
    <div className={styles.visEmail}>
      <div className={styles.emSubject}>
        <span /> Idea for your 2027 leadership track
      </div>
      <p className={styles.emLine} style={{ "--i": 0 }}>
        Hi <mark>Maya</mark>,
      </p>
      <p className={styles.emLine} style={{ "--i": 1 }}>
        I saw <mark>Northwind Summit</mark> is adding a <mark>leadership track</mark>&hellip;
      </p>
      <p className={styles.emBars} style={{ "--i": 2 }}>
        <b /><b />
      </p>
      <span className={styles.emSent}>Sent</span>
    </div>
  );
}

function VisualSocial() {
  return (
    <div className={styles.visSocial}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div className={styles.soTile} style={{ "--i": i }} key={i}>
          <span className={styles.soShape} />
          <span className={styles.soHeart}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7-4.4-9.3-8.6C1 9 2.6 5.5 6 5.5c2 0 3.4 1.2 4 2.3.6-1.1 2-2.3 4-2.3 3.4 0 5 3.5 3.3 6.9C19 16.6 12 21 12 21z" fill="currentColor" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = { web: VisualWeb, leads: VisualLeads, email: VisualEmail, social: VisualSocial };

/* ---------- the section ---------- */

/* Four services, one per panel.
   - Desktop (>= 1024px, mouse): the section PINS and the four panels
     travel sideways as you scroll; each name and illustration drifts at
     its own speed, panels "wake up" as they arrive, and a HUD counts
     01 / 04.
   - Phones, tablets, touch, reduced motion: a plain vertical stack of
     cards with the same copy. Illustrations play once as each card
     scrolls into view (or are simply shown finished for reduced motion).
   The copy is ordinary HTML in both modes, so search engines read every
   service whichever layout a visitor gets. Keyboard focus into an
   off-screen panel scrolls the page to that panel, because the track is
   moved with a transform and the browser can't do that itself. */
export default function ServicesShowcase() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const headRef = useRef(null);

  /* Passive useEffect on purpose (NOT useLayoutEffect): GSAP only adds a
     pin's distance to the triggers created AFTER it, so triggers must be
     created top-to-bottom. Layout effects run before every passive effect,
     which would create this pin before WhoAreWe's (earlier on the page)
     and put its start/end in the wrong place. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(root.querySelectorAll(`.${styles.panel}`));
    const activate = (p) => p.classList.add(styles.isActive);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panels.forEach(activate);
      return;
    }

    /* tells the CSS that JS is driving, so the "before" states of the
       illustrations may apply (without this flag everything is shown
       finished) */
    root.dataset.anim = "on";

    const mm = gsap.matchMedia(root);

    /* heading words slide up from their masks (both layouts) */
    const revealHeading = (start, duration) => {
      const head = headRef.current;
      const words = head ? head.querySelectorAll(`.${styles.w}`) : [];
      const t = gsap.from(words, {
        yPercent: 115,
        duration,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: { trigger: head, start, once: true },
      });
      return () => {
        t.kill();
        gsap.set(words, { clearProps: "transform" });
      };
    };

    /* ---------- DESKTOP: pinned horizontal story ---------- */
    mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
      const stage = stageRef.current;
      const track = trackRef.current;
      root.dataset.mode = "pinned";

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      let shown = -1;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          id: "services-showcase",
          trigger: stage,
          pin: true,
          scrub: 0.7,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            const idx = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
            if (idx !== shown && countRef.current) {
              shown = idx;
              countRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
            }
          },
        },
      });

      panels.forEach((panel, i) => {
        const visual = panel.querySelector(`.${styles.panelVisual}`);
        const big = panel.querySelector(`.${styles.panelName}`);
        const range = { trigger: panel, containerAnimation: tween, scrub: true };

        // illustration and name drift against the scroll
        gsap.fromTo(
          visual,
          { xPercent: 16, rotate: 3 },
          { xPercent: -12, rotate: -2.5, ease: "none", scrollTrigger: { ...range, start: "left right", end: "right left" } }
        );
        gsap.fromTo(
          big,
          { xPercent: 9 },
          { xPercent: -9, ease: "none", scrollTrigger: { ...range, start: "left right", end: "right left" } }
        );

        // wake the panel up as it arrives
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: tween,
          start: "left 68%",
          end: "right 32%",
          onToggle: (self) => self.isActive && activate(panel),
        });

        // keyboard: focusing a link in an off-screen panel scrolls to it
        const onFocusIn = () => {
          const st = tween.scrollTrigger;
          if (!st) return;
          const target = st.start + (i / (panels.length - 1)) * (st.end - st.start);
          window.scrollTo({ top: target, behavior: "auto" });
        };
        panel.addEventListener("focusin", onFocusIn);
        panel.__lpFocusCleanup = () => panel.removeEventListener("focusin", onFocusIn);
      });

      activate(panels[0]);
      const stopHeading = revealHeading("top 85%", 0.95);

      /* belt and braces for ordering: sort every trigger by page
         position, then re-measure once the frame (and web fonts) settle */
      const raf = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(raf);
        stopHeading();
        delete root.dataset.mode;
        panels.forEach((p) => p.__lpFocusCleanup?.());
        if (barRef.current) barRef.current.style.transform = "";
      };
    });

    /* ---------- EVERYTHING ELSE: vertical stack ---------- */
    mm.add("(max-width: 1023.98px), (hover: none), (pointer: coarse)", () => {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              activate(e.target);
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      panels.forEach((p) => io.observe(p));

      const stopHeading = revealHeading("top 88%", 0.85);

      return () => {
        io.disconnect();
        stopHeading();
      };
    });

    return () => {
      mm.revert();
      delete root.dataset.anim;
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="services-overview"
      className={`${lpFontVars} ${styles.lp} ${styles.showcase}`}
      aria-labelledby="showcase-title"
    >
      <div className={styles.showcaseIntro}>
        <p className={styles.label}>What we do</p>
        <h2 id="showcase-title" ref={headRef} className={styles.showcaseTitle}>
          <RevealWords words={SHOWCASE.title} />
        </h2>
        <p className={styles.showcaseLede}>{SHOWCASE.lede}</p>
      </div>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.hud} aria-hidden="true">
          <span ref={countRef} className={styles.hudCount}>01 / 04</span>
          <span className={styles.hudRail}>
            <span ref={barRef} className={styles.hudBar} />
          </span>
          <span className={styles.hudHint}>Keep scrolling</span>
        </div>

        <div ref={trackRef} className={styles.track}>
          {PANELS.map((panel) => {
            const Visual = VISUALS[panel.visual];
            return (
              <article
                className={`${styles.panel} ${styles[`tone_${panel.tone}`]}`}
                id={panel.id}
                key={panel.id}
                aria-labelledby={`${panel.id}-title`}
              >
                <div className={styles.panelText}>
                  <p className={styles.panelIndex}>{panel.index}</p>
                  <h3 id={`${panel.id}-title`} className={styles.panelName}>
                    {panel.name}
                  </h3>
                  <p className={styles.panelKicker}>{panel.kicker}</p>
                  <p className={styles.panelBody}>{panel.body}</p>

                  <ul className={styles.panelPoints}>
                    {panel.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>

                  <div className={styles.panelActions}>
                    <TransitionLink href={panel.href} className={`${styles.btn} ${styles.btnSolid}`}>
                      {panel.cta}
                    </TransitionLink>
                    <ContactModalLink href={ROUTES.contact} className={styles.textLink}>
                      Talk to us
                    </ContactModalLink>
                  </div>
                </div>

                <div className={styles.panelVisual} aria-hidden="true">
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
