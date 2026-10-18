"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lpFontVars } from "./landing-fonts";
import { TICKER } from "./landing-data";
import styles from "./Landing.module.css";

gsap.registerPlugin(ScrollTrigger);

function Star() {
  return (
    <svg className={styles.tickerStar} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="currentColor" />
    </svg>
  );
}

/* A full-bleed black ticker between the hero and "Who are we?".
   - It lists the four services as real links, so it doubles as
     crawlable internal navigation and tells a visitor what we sell
     before they scroll.
   - Desktop: the loop reacts to scroll VELOCITY: it speeds up and
     leans (skew) the faster you scroll, and reverses when you scroll
     back up, then eases back to its idle drift.
   - Touch / reduced motion: constant gentle drift, or fully static
     (wrapped, first copy only) for reduced motion.
   Hover or keyboard focus pauses it so links are easy to hit. */
export default function MarqueeBand() {
  const bandRef = useRef(null);
  const trackRef = useRef(null);
  const loopRef = useRef(null);
  const pausedRef = useRef(false);
  const [animated, setAnimated] = useState(false);
  const [paused, setPaused] = useState(false);

  /* WCAG 2.2.2: moving content that lasts more than 5 seconds needs a
     way to pause it. Hover/focus already pause it, but touch and
     keyboard visitors get this explicit button. */
  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    loopRef.current?.paused(next);
  };

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;

    const mm = gsap.matchMedia(band);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      // two identical groups side by side: sliding by -50% loops seamlessly
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: fine ? 34 : 46,
        repeat: -1,
      });

      loopRef.current = loop;
      setAnimated(true);

      const visible = ScrollTrigger.create({
        trigger: band,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          self.isActive && !pausedRef.current ? loop.play() : loop.pause(),
      });

      const onEnter = () => gsap.to(loop, { timeScale: 0, duration: 0.5, overwrite: true });
      const onLeave = () => gsap.to(loop, { timeScale: 1, duration: 0.7, overwrite: true });
      band.addEventListener("pointerenter", onEnter);
      band.addEventListener("pointerleave", onLeave);
      band.addEventListener("focusin", onEnter);
      band.addEventListener("focusout", onLeave);

      let velocityTrigger;
      let idle;
      if (fine) {
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.45, ease: "power3" });
        velocityTrigger = ScrollTrigger.create({
          trigger: band,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            skewTo(gsap.utils.clamp(-9, 9, v / -260));
            gsap.to(loop, {
              timeScale: self.direction * (1 + Math.min(Math.abs(v) / 280, 6)),
              duration: 0.3,
              overwrite: true,
            });
            clearTimeout(idle);
            idle = setTimeout(() => {
              skewTo(0);
              gsap.to(loop, { timeScale: 1, duration: 1.1, overwrite: true });
            }, 140);
          },
        });
      }

      return () => {
        clearTimeout(idle);
        band.removeEventListener("pointerenter", onEnter);
        band.removeEventListener("pointerleave", onLeave);
        band.removeEventListener("focusin", onEnter);
        band.removeEventListener("focusout", onLeave);
        velocityTrigger?.kill();
        visible.kill();
        loop.kill();
        loopRef.current = null;
        setAnimated(false);
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  const group = (hidden) => (
    <ul className={styles.tickerGroup} aria-hidden={hidden || undefined}>
      {TICKER.map((item, i) => (
        <li className={styles.tickerItem} key={item.text}>
          {item.href ? (
            <Link href={item.href} tabIndex={hidden ? -1 : undefined}>
              {item.text}
            </Link>
          ) : (
            <span>{item.text}</span>
          )}
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={bandRef}
      className={`${lpFontVars} ${styles.lp} ${styles.ticker}`}
      aria-label="What Zarrar offers"
    >
      <div ref={trackRef} className={styles.tickerTrack}>
        {group(false)}
        {group(true)}
      </div>

      {animated && (
        <button
          type="button"
          className={styles.tickerPause}
          onClick={togglePause}
          aria-pressed={paused}
          aria-label={paused ? "Resume scrolling text" : "Pause scrolling text"}
        >
          <span className={paused ? styles.iconPlay : styles.iconPause} aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
