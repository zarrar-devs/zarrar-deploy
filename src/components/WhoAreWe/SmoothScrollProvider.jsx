"use client";

/**
 * Requires: npm install lenis
 *
 * WHY THIS EXISTS
 * The fixes inside WhoAreWe.jsx (fastScrollEnd + a tighter scrub value)
 * stop the pinned timeline from getting stuck mid-animation on a fast
 * scroll. This provider fixes the *input* side of the problem: it
 * normalizes raw scroll input so a fast trackpad fling, mouse-wheel
 * flick, OR a held-down arrow/Space/Page key never produces one huge,
 * discontinuous scroll jump in the first place.
 *
 * IMPORTANT — keyboard scrolling:
 * Lenis only smooths wheel and touch input out of the box. Arrow keys,
 * Space, Page Up/Down, and Home/End are native browser scrolling — they
 * jump the real scrollTop instantly, completely bypassing Lenis. Holding
 * one of those keys down fires many of these instant jumps per second
 * (OS key-repeat), which is exactly what made the whole pinned timeline
 * race through in under a second instead of playing out over the
 * intended scroll distance. This provider intercepts those keys and
 * re-routes them through Lenis's own smoothed `scrollTo`, so keyboard
 * scrolling follows the same easing as wheel input instead of jumping.
 *
 * ROUND 13 — reacts to the environment changing, not just its state at
 * mount. Previously `reduceMotion` and `useSmoothScroll` were each read
 * once via `matchMedia(...).matches` when the provider mounted, so:
 *   - resizing a window across the 900px threshold,
 *   - docking/undocking a laptop from a mouse (changes `hover`/`pointer`),
 *   - or the OS reduced-motion setting changing mid-session,
 * all left Lenis stuck in whichever mode it happened to start in until a
 * full page reload. Both queries now have a `change` listener that tears
 * Lenis down and re-initializes it (or leaves it off) to match the
 * current environment, so a resize takes effect immediately.
 *
 * USAGE — wrap your ROOT layout/App ONCE (not per-section, not inside
 * WhoAreWe.jsx itself):
 *
 *   // app/layout.jsx (or your top-level App.jsx)
 *   import SmoothScrollProvider from "@/components/SmoothScrollProvider";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <SmoothScrollProvider>{children}</SmoothScrollProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * That's it — every ScrollTrigger instance on the page (including the
 * one inside WhoAreWe.jsx) keeps working exactly as written; this just
 * feeds them smoother scroll input to react to.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Keys that natively trigger page scrolling in the browser. Anything not
// in this set is left completely alone (typing, form controls, etc.).
const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  "Space",
]);

// GSAP's own defaults (per its docs) — restored on teardown so turning
// Lenis off doesn't silently leave GSAP's lag-smoothing disabled forever.
const GSAP_DEFAULT_LAG_THRESHOLD = 500;
const GSAP_DEFAULT_LAG_ADJUSTED = 33;

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const capabilityQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 900px)"
    );

    let cleanup = () => {};

    const setup = () => {
      // Tear down whatever the previous environment set up before
      // evaluating the new one — setup() doubles as the re-evaluation
      // that runs on every relevant media-query change.
      cleanup();
      cleanup = () => {};

      if (motionQuery.matches || !capabilityQuery.matches) return;

      const lenis = new Lenis({
        duration: 1.1, // how "heavy"/smoothed the scroll feels — raise for slower/silkier, lower for snappier
        smoothWheel: true,
        // Caps how much scroll distance one wheel/trackpad tick can produce —
        // this is the guard against the huge, discontinuous jumps a fast
        // fling causes, which is what was blowing past the pin before
        // ScrollTrigger could keep up.
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      // Feed Lenis's smoothed scroll position into ScrollTrigger every frame.
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis off GSAP's own ticker instead of requestAnimationFrame
      // directly, so both stay perfectly in sync on the same clock.
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);

      // GSAP's own lag-smoothing fights with Lenis's (they both try to
      // compensate for dropped frames) — turn GSAP's off since Lenis now
      // owns that job.
      gsap.ticker.lagSmoothing(0);

      // ---- Keyboard scrolling, routed through Lenis ----
      // Without this, holding ArrowDown/Space/PageDown fires a burst of
      // native, instant scrollTop jumps that never pass through Lenis's
      // smoothing — which is what caused the whole pinned WhoAreWe timeline
      // to blow through in under a second. Each keydown here nudges Lenis's
      // own target scroll instead of letting the browser jump the real
      // scrollTop, so it eases the same way wheel input does.
      const handleKeydown = (e) => {
        if (!SCROLL_KEYS.has(e.code)) return;

        const target = e.target;
        const isEditable =
          target instanceof HTMLElement &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable);
        if (isEditable) return; // never hijack typing or native form controls

        const viewport = window.innerHeight;
        const current = lenis.targetScroll ?? lenis.scroll ?? window.scrollY;
        let nextScroll = current;

        switch (e.code) {
          case "ArrowDown":
            nextScroll = current + 120;
            break;
          case "ArrowUp":
            nextScroll = current - 120;
            break;
          case "PageDown":
            nextScroll = current + viewport * 0.9;
            break;
          case "PageUp":
            nextScroll = current - viewport * 0.9;
            break;
          case "Space":
            nextScroll = current + (e.shiftKey ? -viewport * 0.9 : viewport * 0.9);
            break;
          case "Home":
            nextScroll = 0;
            break;
          case "End":
            nextScroll = document.documentElement.scrollHeight;
            break;
          default:
            return;
        }

        e.preventDefault(); // stop the browser's own instant jump
        lenis.scrollTo(nextScroll, { immediate: false });
      };

      window.addEventListener("keydown", handleKeydown, { passive: false });

      cleanup = () => {
        window.removeEventListener("keydown", handleKeydown);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(GSAP_DEFAULT_LAG_THRESHOLD, GSAP_DEFAULT_LAG_ADJUSTED);
        lenis.destroy();
      };
    };

    setup();
    motionQuery.addEventListener("change", setup);
    capabilityQuery.addEventListener("change", setup);

    return () => {
      motionQuery.removeEventListener("change", setup);
      capabilityQuery.removeEventListener("change", setup);
      cleanup();
    };
  }, []);

  return children;
}