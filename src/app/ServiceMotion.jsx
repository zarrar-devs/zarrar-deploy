"use client";

/* =============================================================
   Zarrar — motion layer for the service pages.
   -------------------------------------------------------------
   The page is fully server-rendered; this component only adds
   animation on top and never owns any content.

   - Hero: masked word-by-word headline reveal + staggered fade-up
   - Scroll: sections / cards / lists reveal as they enter
   - Process: a progress line fills as you scroll, steps light up
   - Desktop pointer only: glow follows the cursor, buttons are
     slightly magnetic, cards get a cursor spotlight
   - Phones & tablets: same reveals, none of the pointer effects,
     and Lenis smooth-scroll stays off (see SmoothScrollProvider)
   - prefers-reduced-motion: nothing animates; the CSS un-hides
     everything on its own (see service-landing.css)

   Needs: gsap (+ ScrollTrigger) and lenis, both already used by
   the rest of the site.
   ============================================================= */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScrollProvider from "@/components/WhoAreWe/SmoothScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceMotion({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine) and (min-width: 900px)",
      },
      (ctx) => {
        const { motion, fine } = ctx.conditions;
        if (!motion) return undefined;

        const q = (sel) => Array.from(root.querySelectorAll(sel));
        const cleanups = [];

        /* ---------- Hero intro ---------- */
        const words = q(".svc-h1 .svc-wi");
        const heroBits = q(".svc-hero .rv-hero");
        const intro = gsap.timeline({ delay: 0.25, defaults: { ease: "power4.out" } });
        intro
          .fromTo(words, { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: 0.05 }, 0)
          .fromTo(
            heroBits,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
            0.1,
          );

        /* ---------- Scroll reveals ---------- */
        q(".rv").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 38,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-reveal-group]").forEach((group) => {
          const items = Array.from(group.querySelectorAll(".rv-item"));
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            y: 44,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        /* ---------- Closing CTA headline ---------- */
        const ctaTitle = root.querySelector(".svc-cta-title");
        if (ctaTitle) {
          gsap.fromTo(
            ctaTitle,
            { letterSpacing: "0.02em" },
            {
              letterSpacing: "-0.045em",
              ease: "none",
              scrollTrigger: { trigger: ctaTitle, start: "top 95%", end: "top 40%", scrub: 0.6 },
            },
          );
        }

        /* ---------- Process line + active steps ---------- */
        const fill = root.querySelector(".svc-steps-fill");
        const steps = q(".svc-step");
        if (fill && steps.length) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".svc-steps",
                start: "top 65%",
                end: "bottom 65%",
                scrub: 0.5,
              },
            },
          );
          steps.forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 68%",
              onEnter: () => step.classList.add("is-active"),
              onLeaveBack: () => step.classList.remove("is-active"),
            });
          });
        }

        /* ---------- Hero rail: cycles through the steps ---------- */
        const railItems = q(".svc-rail li");
        if (railItems.length > 1) {
          let current = 0;
          const timer = window.setInterval(() => {
            railItems[current].classList.remove("is-on");
            current = (current + 1) % railItems.length;
            railItems[current].classList.add("is-on");
          }, 1700);
          cleanups.push(() => window.clearInterval(timer));
        }

        /* ---------- Hero glow drifts as you scroll away ---------- */
        const glow = root.querySelector(".svc-hero .svc-glow");
        if (glow) {
          gsap.to(glow, {
            yPercent: 28,
            ease: "none",
            scrollTrigger: { trigger: ".svc-hero", start: "top top", end: "bottom top", scrub: true },
          });
        }

        /* ---------- Desktop pointer effects ---------- */
        if (fine) {
          const hero = root.querySelector(".svc-hero");
          if (hero && glow) {
            const gx = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
            const onMove = (e) => {
              const r = hero.getBoundingClientRect();
              gx((e.clientX - r.left - r.width / 2) * 0.06);
            };
            hero.addEventListener("pointermove", onMove);
            cleanups.push(() => hero.removeEventListener("pointermove", onMove));
          }

          q(".svc-btn").forEach((btn) => {
            const bx = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
            const by = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
            const move = (e) => {
              const r = btn.getBoundingClientRect();
              bx((e.clientX - (r.left + r.width / 2)) * 0.22);
              by((e.clientY - (r.top + r.height / 2)) * 0.28);
            };
            const leave = () => {
              bx(0);
              by(0);
            };
            btn.addEventListener("pointermove", move);
            btn.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              btn.removeEventListener("pointermove", move);
              btn.removeEventListener("pointerleave", leave);
            });
          });

          q(".svc-card, .svc-niche, .svc-rel").forEach((card) => {
            const move = (e) => {
              const r = card.getBoundingClientRect();
              card.style.setProperty("--mx", `${e.clientX - r.left}px`);
              card.style.setProperty("--my", `${e.clientY - r.top}px`);
            };
            card.addEventListener("pointermove", move);
            cleanups.push(() => card.removeEventListener("pointermove", move));
          });
        }

        /* Web fonts change text height — recalc trigger positions once they land */
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }

        return () => cleanups.forEach((fn) => fn());
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <div ref={rootRef}>{children}</div>
    </SmoothScrollProvider>
  );
}
