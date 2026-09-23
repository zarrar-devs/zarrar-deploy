"use client";

/**
 * Requires: npm install gsap@latest lenis   (v3.13+ — SplitText is bundled & free)
 *
 * next.config.js — only needed if any capability media points at a remote host:
 *   images: { remotePatterns: [{ protocol: "https", hostname: "..." }] }
 *   (self-host these before shipping — a third-party image host on the
 *    critical path hurts LCP, which hurts SEO.)
 *
 * ── What changed vs round 11 ────────────────────────────────────────────────
 * 1) FIXED THE LEDE REVEAL (visible in the screen recording — "people
 *    actually trust," rendered sliced in half horizontally for the whole
 *    length of the animation). Each lede sentence sat inside ONE
 *    overflow:hidden mask, which is only correct if the sentence renders
 *    as a single visual line. In the desktop column each one wraps onto
 *    three lines, so the mask was sized to the full three-line block
 *    while the text slid up through it from yPercent:130 — every line
 *    below the first was chopped by the mask's bottom edge. Masking is
 *    now per WORD (the same construction the hero's sub-copy uses): a
 *    word can't wrap inside itself, so each mask is always exactly one
 *    line tall and this can't recur at any viewport width. The reveal
 *    also reads better for it — words cascade in with a blur shed
 *    instead of three lines rising as one slab.
 * 2) PHOTOGRAPHY IS BACK IN FULL COLOUR. The grayscale pass is gone, and
 *    with it the reason every JS-written filter value had to carry
 *    `grayscale(1)` — those are plain `blur()` again.
 *
 * ── What changed in round 11 ────────────────────────────────────────────────
 * 1) VISUAL SYSTEM MATCHES Hero v9. The blue accent is gone; emphasis
 *    is carried by inversion (solid black block <-> outlined block),
 *    which is the same device the hero uses. Type matches the hero's
 *    three roles exactly: Fraunces italic for display, Space Mono for
 *    stamped/labelled bits, Space Grotesk for body. See WhoAreWe.css for
 *    the full rationale.
 * 2) REAL BUG FIX — `showScrollHint` was referenced inside the
 *    ScrollTrigger config object (`onEnter`/`onEnterBack`) but declared
 *    with `const` *below* the `gsap.timeline()` call that creates that
 *    trigger. ScrollTrigger fires `onEnter` synchronously during creation
 *    when the trigger element is already in view at that moment — e.g. a
 *    reload with the page already scrolled to this section, or a
 *    deep-link to #who-we-are. In exactly that case the callback hit the
 *    temporal dead zone and threw a ReferenceError, taking the rest of
 *    the timeline setup down with it (no pin, no reveals). The function
 *    is now declared before the timeline that references it.
 * 3) 01 / 02 / 03 MARKERS REMOVED. The three capabilities are parallel
 *    offerings, not steps in a process, so numbering them encoded
 *    something untrue. Each row now carries a small state dot instead —
 *    outlined at rest, filled while that row owns the photo frame. The
 *    spotlight handoff animates it exactly where it used to animate the
 *    index's colour, so the timing is unchanged.
 * 4) `mark` is gone from the CAPABILITIES data, and the JSON-LD no longer
 *    carries a position-based ordering hint for what is an unordered set.
 *
 * ── Round 10 recap (still current) ─────────────────────────────────────────
 * The intro heading's exit distance is measured from the viewport's own
 * half-width plus half the heading's width — moving left by only "its own
 * width" doesn't clear the screen unless the heading happens to be wider
 * than ~1.5x the viewport, which is what used to leave "we?" stranded on
 * screen overlapping the capability list. The scroll hint is driven by
 * real elapsed time (not scrub progress) so it gets a readable couple of
 * seconds regardless of scroll speed. TOTAL_VH is 5.5 so the whole pinned
 * story doesn't feel rushed. The progress dot glides via quickTo and its
 * travel distance is measured from the rendered track at runtime.
 *
 * ── Round 8 recap (still current) ──────────────────────────────────────────
 * fastScrollEnd + scrub 0.35 (was 1) so a fast fling can't blow through the
 * pin before the scrub tween catches up — pair with SmoothScrollProvider
 * (Lenis) at the app root for the input side of the same fix.
 *
 * ── Round 6/7 recap (still current) ────────────────────────────────────────
 * No black-flash-on-load, no portrait crop of landscape photos, a
 * directional clip-path wipe + Ken-Burns pop instead of a plain
 * crossfade, centered row alignment, real alt text, and JSON-LD for the
 * three services.
 *
 * Everything else (SplitText intro structure, the lede reveal, the closing
 * line, the background rings + cursor parallax, and the
 * prefers-reduced-motion / no-JS handling via matchMedia) is untouched.
 */

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Fraunces, Space_Mono, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./WhoAreWe.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // ignoreMobileResize: don't refresh ScrollTrigger on the address-bar-hide
  // resize that mobile browsers fire on scroll.
  // fastScrollEnd: on a fast fling, snap a scrub tween straight to its
  // target progress instead of continuing to smooth-lag toward it — this
  // is what stops the intro/lede/capability reveals from being skipped or
  // left mid-animation when someone scrolls quickly.
  ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true });
}

// Self-hosted via next/font — no external request, no layout shift. The
// three roles deliberately mirror the hero's, so the two sections read as
// one site: serif carries the display sentence, mono carries anything
// "stamped" (the Who block, the capability labels), sans carries body.
const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--waw-font-display",
  display: "swap",
});

const stampFont = Space_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--waw-font-stamp",
  display: "swap",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--waw-font-body",
  display: "swap",
});

// Timeline is 0..1 across the whole pinned scroll. Acts overlap slightly at
// their edges so there's no point where you scroll and nothing happens.
// This is the LAST act of the story — the section settles and stays put;
// there's no exit-left. Once progress hits 1, ScrollTrigger just unpins and
// normal page scroll carries on underneath it, like any other section.
const PHASE = {
  introSlide: [0, 0.2],
  introReveal: [0.02, 0.12],
  storySlide: [0.17, 0.36],
  ledeReveal: [0.24, 0.34],
  capabilitiesReveal: [0.3, 0.42],
  cap1: [0.5, 0.62],
  cap2: [0.64, 0.76],
  cap3: [0.78, 0.9],
  closingReveal: [0.88, 0.98],
};
const span = (k) => PHASE[k][1] - PHASE[k][0];
// Same phase proportions as earlier rounds, spread over more physical
// scrolling, so every reveal (including the scroll hint's window) has room
// to register instead of flashing by.
const TOTAL_VH = 5.5; // viewport-heights of scroll the whole story consumes
const BUFFER = 80;
// Sane fallbacks only — the progress dot's real travel distance is measured
// from the rendered track/dot at runtime (see measureProgressTrack below),
// so these don't need to be hand-kept in sync with the CSS.
const PROGRESS_TRACK_PX = 120;
const PROGRESS_DOT_PX = 8;

// Ink values kept in one place so the JS-driven colour tweens and the
// stylesheet can't drift apart. These are the hero's exact values.
const INK = "#0b0b0c";
const PAPER = "#ffffff";
const INK_MUTED = "rgba(11, 11, 12, 0.46)";
const PAPER_MUTED = "rgba(255, 255, 255, 0.78)";

// The lede is the one idea worth saying big. Kept to two short lines on
// purpose — everything else lives in the capability list below it. The
// second line is the emphasised one (full black against the first line's
// muted ink — see .waw-lede-accent).
const LEDE_LINES = [
  { text: "From qualified leads to a digital presence people actually trust,", accent: false },
  { text: "we're the team that runs the whole engine.", accent: true },
];

// Shown briefly right as the pinned scroll begins, before "Who are we?"
// reveals — purely a UX nudge for the scroll-jacked desktop experience.
const SCROLL_HINT_TEXT = "Scroll slowly for the best experience";

const CAPABILITIES = [
  {
    label: "Email marketing",
    description: "Campaigns people actually open, click, and remember.",
    media: {
      type: "image",
      src: "/email-marketing.png",
      alt: "Email marketing campaign preview",
    },
  },
  {
    label: "Lead generation",
    description: "Funnels engineered to turn visits into qualified leads.",
    media: {
      type: "image",
      src: "/graphic-design.png",
      alt: "Lead generation funnel dashboard",
    },
  },
  {
    label: "Web development",
    description: "Fast, conversion-ready sites built to hold up at scale.",
    media: {
      // Switch `type` to "video" and point `src` at a self-hosted,
      // compressed clip (ideally <1MB, no audio track) to use footage
      // here instead — the <video> branch below is already wired up,
      // including a poster and play-on-reveal.
      type: "image",
      src: "/web-development.png",
      alt: "Responsive web development project preview",
    },
  },
];

const CLOSING_TEXT =
  "We pair data-driven strategy with conversion-focused design, so every " +
  "campaign, funnel and website we ship actually moves the needle for " +
  "your business.";

// Reveal direction for the stage photo wipe — mirrors the row fill's
// left-anchored scaleX, so the two "spotlight" motions read as one idea.
const HIDDEN_CLIP = "inset(0% 0% 0% 100%)";
const VISIBLE_CLIP = "inset(0% 0% 0% 0%)";

// Structured data so search engines can read the three services directly,
// independent of the scroll-linked reveal animation. These are parallel
// offerings rather than a ranked or sequenced list, so this is a plain
// ItemList of Services with `itemListOrder` marked unordered — matching
// the UI, which no longer numbers them either.
const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services",
  itemListOrder: "https://schema.org/ItemListUnordered",
  itemListElement: CAPABILITIES.map((cap) => ({
    "@type": "Service",
    name: cap.label,
    description: cap.description,
  })),
};

export default function WhoAreWe() {
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const introRestRef = useRef(null);
  const highlightRef = useRef(null);
  const storyRef = useRef(null);
  const ledeRef = useRef(null);
  const scrollHintRef = useRef(null);
  const capabilityBlockRef = useRef(null);
  const capabilitiesListRef = useRef(null);
  const mediaStageRef = useRef(null);
  const closingRef = useRef(null);
  const webVideoRef = useRef(null);
  const ringsLayerRef = useRef(null);
  const progressDotRef = useRef(null);
  const progressTrackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        const pin = pinRef.current;
        const stage = stageRef.current;
        const introRest = introRestRef.current;
        const highlight = highlightRef.current;
        const story = storyRef.current;
        // Per-word, not per-line — see the round 12 note in the header and
        // the lede block in WhoAreWe.css for why the old per-sentence mask
        // sliced wrapped lines in half.
        const ledeWords = ledeRef.current.querySelectorAll(".waw-lede-word-inner");
        const scrollHint = scrollHintRef.current;
        const closing = closingRef.current;
        const ringsLayer = ringsLayerRef.current;
        const progressDot = progressDotRef.current;
        const introEl = introRest.closest(".waw-intro");

        // Row-level pieces (queried from the <ul> only).
        const capabilityItems = capabilitiesListRef.current.querySelectorAll(".waw-capability");
        const fills = capabilitiesListRef.current.querySelectorAll(".waw-capability-fill");
        const capLabels = capabilitiesListRef.current.querySelectorAll(".waw-capability-label");
        const capDescs = capabilitiesListRef.current.querySelectorAll(".waw-capability-desc");
        // Replaces the old numeric indices — outlined at rest, filled while
        // its row owns the photo frame.
        const capMarks = capabilitiesListRef.current.querySelectorAll(".waw-capability-mark");
        // The shared photo/video stack (queried from the stage only) — the
        // wrapper divs (clip-path drives their reveal) and, separately, the
        // <img>/<video> inside each one (scale drives the Ken-Burns pop).
        const stageMedia = mediaStageRef.current.querySelectorAll(".waw-capability-media");
        const stageMediaInner = mediaStageRef.current.querySelectorAll(
          ".waw-capability-media img, .waw-capability-media video"
        );
        // Stage + rows fade in together as one group at capabilitiesReveal.
        const revealTargets = [mediaStageRef.current, ...capabilityItems];

        const rings = ringsLayer.querySelectorAll(".waw-ring");
        const startVideo = () => webVideoRef.current?.play?.().catch(() => {});
        // Slightly lighter blur on mobile — cheaper to composite on weaker GPUs.
        const blurPx = isDesktop ? 16 : 10;
        const blurHidden = `blur(${blurPx}px)`;
        const blurVisible = "blur(0px)";
        const blurOut = `blur(${Math.round(blurPx * 0.4)}px)`;
        let parallaxCleanup = () => {};
        let driftTween = null; // mobile's continuous Ken-Burns drift on the active photo
        let tl; // assigned in the desktop branch; activateCapability() only runs there

        const splitRest = new SplitText(introRest, { type: "chars", charsClass: "waw-char" });
        const chars = splitRest.chars;

        gsap.set(chars, {
          y: (i) => (i % 2 === 0 ? "0.5em" : "-0.5em"),
          rotateZ: () => gsap.utils.random(-6, 6),
          opacity: 0,
          filter: "blur(10px)",
        });
        gsap.set(highlight, { autoAlpha: 0, x: -40 });
        gsap.set(ledeWords, { yPercent: 130, opacity: 0, filter: "blur(6px)" });
        gsap.set(scrollHint, { autoAlpha: 0, y: 8 });
        gsap.set(revealTargets, { opacity: 0, y: "1.4rem", scale: 0.97, filter: "blur(10px)" });
        gsap.set(fills, { scaleX: 0 });
        gsap.set(closing, { opacity: 0, y: "1rem", filter: "blur(6px)" });

        // Stage photos: hidden by default, EXCEPT the first — it stays
        // visible (and at rest, no zoom) from mount straight through the
        // capabilitiesReveal fade-in, so there is never a moment where the
        // (black) stage background is showing with nothing on top of it.
        // Every photo — including the first — starts softly blurred; it
        // only sharpens once its own row lights up, so unblurring reads as
        // "this one's active now" rather than the photo just sitting there
        // finished before the section has introduced it.
        gsap.set(stageMedia, { clipPath: HIDDEN_CLIP, opacity: 1 });
        gsap.set(stageMedia[0], { clipPath: VISIBLE_CLIP });
        gsap.set(stageMediaInner, { scale: 1.18, filter: blurHidden });
        gsap.set(stageMediaInner[0], { scale: 1, filter: blurHidden });

        // Light up row i: black fill wipes in, its text flips white, its
        // state dot fills, and its photo takes over the stage. Whenever
        // i > 0, the SAME beat sends row i-1 back to its resting look — so
        // the highlight always reads as one spotlight handing off down the
        // list, never as two rows lit (or none) at once. Row 0 is the
        // exception: its photo is already resting in the stage from mount
        // (see above), so lighting it up only needs the row styling plus a
        // small confirm pop on the photo — not a full wipe-in. Whichever
        // photo ends up active keeps a slow, continuous Ken-Burns drift for
        // the rest of its hold, so it never goes fully static the instant
        // its own reveal finishes.
        const activateCapability = (i, phaseKey) => {
          const [start] = PHASE[phaseKey];
          const dur = span(phaseKey);
          const snap = dur * 0.4;
          // The photo wipe is deliberately a touch slower than the row's
          // fill-snap so the handoff reads as a considered sweep rather
          // than a blink — the row still "arrives" quickly, the photo
          // follows through.
          const wipe = dur * 0.65;
          const driftStart = start + wipe;
          const driftDur = Math.max(dur - wipe, 0);

          tl.to(fills[i], { scaleX: 1, ease: "power4.out", duration: snap }, start)
            .to(capLabels[i], { color: PAPER, ease: "power2.out", duration: snap }, start)
            .to(capDescs[i], { color: PAPER_MUTED, ease: "power2.out", duration: snap }, start)
            .to(
              capMarks[i],
              { backgroundColor: PAPER, borderColor: PAPER, ease: "power2.out", duration: snap },
              start
            );

          if (i === 0) {
            // Row 0's photo is already resting in the stage — this is a
            // blur→sharp reveal plus a small confirm pop, not a wipe (there's
            // nothing to wipe over yet).
            tl.fromTo(
              stageMediaInner[0],
              { scale: 1.04, filter: blurHidden },
              { scale: 1, filter: blurVisible, ease: "expo.out", duration: wipe },
              start
            );
          } else {
            // Incoming photo sweeps in left-to-right, covering the previous
            // one as it goes, sharpening out of a soft blur with a slight
            // zoom-out pop on the image itself.
            tl.fromTo(
              stageMedia[i],
              { clipPath: HIDDEN_CLIP },
              { clipPath: VISIBLE_CLIP, ease: "expo.inOut", duration: wipe },
              start
            ).fromTo(
              stageMediaInner[i],
              { scale: 1.18, filter: blurHidden },
              { scale: 1, filter: blurVisible, ease: "expo.out", duration: wipe },
              start
            );

            // Outgoing photo: a small push-back scale + soft blur starts
            // immediately (visible briefly through the not-yet-wiped
            // portion), and it fades the rest of the way out timed to
            // finish exactly as the wipe finishes covering it — never
            // leaving a gap where the (black) stage background could show
            // through.
            tl.to(
              stageMediaInner[i - 1],
              { scale: 1.08, filter: blurOut, ease: "power2.in", duration: wipe },
              start
            ).to(
              stageMedia[i - 1],
              { opacity: 0, ease: "power2.in", duration: wipe * 0.45 },
              start + wipe * 0.55
            );
          }

          // Continuous drift for the remainder of this row's hold. Skipped
          // when a phase is too tight to give it any real room.
          if (driftDur > 0.01) {
            tl.to(stageMediaInner[i], { scale: 1.05, ease: "none", duration: driftDur }, driftStart);
          }

          if (i > 0) {
            tl.to(fills[i - 1], { scaleX: 0, ease: "power3.inOut", duration: snap }, start)
              .to(capLabels[i - 1], { color: INK, ease: "power2.inOut", duration: snap }, start)
              .to(capDescs[i - 1], { color: INK_MUTED, ease: "power2.inOut", duration: snap }, start)
              .to(
                capMarks[i - 1],
                {
                  backgroundColor: "rgba(11, 11, 12, 0)",
                  borderColor: INK_MUTED,
                  ease: "power2.inOut",
                  duration: snap,
                },
                start
              );
          }
        };

        if (isDesktop) {
          pin.classList.add("is-marquee");
          stage.classList.add("is-marquee");
          progressTrackRef.current?.classList.add("is-visible");

          // The progress dot's travel distance is measured from the actual
          // rendered track/dot rather than a hardcoded pixel pair, so it
          // can't drift out of sync with the CSS. Re-measured on every
          // ScrollTrigger refresh (resize, font load, breakpoint change).
          let trackMetrics = { height: PROGRESS_TRACK_PX, dot: PROGRESS_DOT_PX };
          const measureProgressTrack = () => {
            if (!progressTrackRef.current || !progressDotRef.current) return;
            trackMetrics = {
              height: progressTrackRef.current.clientHeight || PROGRESS_TRACK_PX,
              dot: progressDotRef.current.clientHeight || PROGRESS_DOT_PX,
            };
          };
          measureProgressTrack();
          // quickTo glides the dot toward each new position instead of
          // snapping it every scroll tick, which is what made it feel like
          // it was ticking rather than tracking.
          const setDotY = gsap.quickTo(progressDot, "y", { duration: 0.18, ease: "power2.out" });

          // MUST be declared before the timeline below, not after it.
          // ScrollTrigger fires onEnter synchronously while creating the
          // trigger if the element is already in view at that moment (a
          // reload mid-page, a #who-we-are deep link). Declaring this
          // afterwards put it in the temporal dead zone for exactly that
          // case, and the ReferenceError took the whole timeline setup
          // down with it.
          //
          // Fades the hint in, holds it for a fixed real-world duration,
          // then fades it out — completely independent of the scrubbed
          // timeline, so scroll speed can't cut it short.
          const showScrollHint = () => {
            if (!scrollHint) return;
            gsap.killTweensOf(scrollHint);
            gsap
              .timeline()
              .to(scrollHint, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" })
              .to(scrollHint, { autoAlpha: 0, y: -8, duration: 0.5, ease: "power2.in" }, "+=1.8");
          };

          tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * TOTAL_VH)}`,
              // A full second of smoothing on this timeline let fast
              // scrolls blow past the pin before the tween caught up,
              // which is what made the reveals look like they "didn't
              // play". 0.35 keeps the scrub feel but tracks the scrollbar
              // far more tightly.
              scrub: 0.35,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: measureProgressTrack,
              onUpdate: (self) => {
                setDotY(self.progress * (trackMetrics.height - trackMetrics.dot));
              },
              // The hint is driven by real elapsed time (see above), not
              // scroll progress, so it reliably gets a couple of readable
              // seconds on screen no matter how fast someone scrolls into
              // the section. onEnter/onEnterBack cover both directions.
              onEnter: () => showScrollHint(),
              onEnterBack: () => showScrollHint(),
            },
          });

          // Act 1 — "Who are we?"
          // Exit distance is measured from the viewport's own half-width
          // plus half the heading's width, not just the heading's own
          // width — moving left by only "its own width" only clears the
          // screen when the heading happens to be wider than roughly 1.5x
          // the viewport, which isn't reliably true at every font size /
          // screen width. This guarantees the heading is fully off-screen
          // (past the left edge, with BUFFER to spare) no matter how wide
          // it renders.
          tl.fromTo(
            introEl,
            { x: () => window.innerWidth + BUFFER },
            {
              x: () => -(window.innerWidth / 2 + introEl.offsetWidth / 2 + BUFFER),
              ease: "none",
              duration: span("introSlide"),
            },
            PHASE.introSlide[0]
          );
          tl.to(
            chars,
            {
              y: 0,
              opacity: 1,
              rotateZ: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: span("introReveal"),
              stagger: span("introReveal") / (chars.length * 1.4),
            },
            PHASE.introReveal[0]
          ).to(
            highlight,
            { autoAlpha: 1, x: 0, ease: "back.out(1.7)", duration: span("introReveal") * 0.9 },
            PHASE.introReveal[0]
          );

          // Act 2 — the story panel slides in and settles centred (pin/hold spot)
          tl.fromTo(
            story,
            { x: () => window.innerWidth + BUFFER },
            { x: 0, ease: "power2.out", duration: span("storySlide") },
            PHASE.storySlide[0]
          );
          tl.to(
            ledeWords,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "expo.out",
              duration: span("ledeReveal"),
              // Spread across roughly the first two-thirds of the phase so
              // the last word still has room to finish inside it.
              stagger: span("ledeReveal") / (ledeWords.length * 1.5),
            },
            PHASE.ledeReveal[0]
          );
          tl.to(
            revealTargets,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: span("capabilitiesReveal"),
              stagger: 0.08,
              onStart: startVideo, // only fetch/play the clip once it's actually revealed
            },
            PHASE.capabilitiesReveal[0]
          );

          // Act 3 — HOLD (no x movement, and nothing exits after this — this
          // is the last act). Keep scrolling to hand the spotlight down the
          // list, then once progress reaches 1 the pin simply releases and
          // normal page scroll continues with the section resting exactly
          // where it is (last row + its photo stay lit).
          activateCapability(0, "cap1");
          activateCapability(1, "cap2");
          activateCapability(2, "cap3");

          tl.to(
            closing,
            { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: span("closingReveal") },
            PHASE.closingReveal[0]
          );

          // Quiet background depth — three faint rings drifting the whole way through
          if (rings[0]) tl.fromTo(rings[0], { x: -60, y: -30, scale: 0.9 }, { x: 70, y: 40, scale: 1.15, ease: "none", duration: 1 }, 0);
          if (rings[1]) tl.fromTo(rings[1], { x: 90, y: 40, scale: 1.1 }, { x: -100, y: -20, scale: 0.85, ease: "none", duration: 1 }, 0);
          if (rings[2]) tl.fromTo(rings[2], { x: 0, y: 70, scale: 1 }, { x: -50, y: -80, scale: 1.2, ease: "none", duration: 1 }, 0);

          // Fade the progress rail in/out at the very edges of the pin
          tl.fromTo(progressTrackRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0);
          tl.to(progressTrackRef.current, { autoAlpha: 0, duration: 0.06 }, 0.95);

          // Subtle cursor parallax on the ring layer — only for real mice,
          // so touch-capable laptops at desktop widths don't get a stuck offset.
          if (window.matchMedia("(pointer: fine)").matches) {
            const px = gsap.quickTo(ringsLayer, "x", { duration: 1.1, ease: "power2.out" });
            const py = gsap.quickTo(ringsLayer, "y", { duration: 1.1, ease: "power2.out" });
            const onMove = (e) => {
              const relX = e.clientX / window.innerWidth - 0.5;
              const relY = e.clientY / window.innerHeight - 0.5;
              px(relX * 26);
              py(relY * 26);
            };
            window.addEventListener("pointermove", onMove);
            parallaxCleanup = () => window.removeEventListener("pointermove", onMove);
          }

          // Custom fonts can shift metrics after first paint — cheap safety net.
          document.fonts?.ready?.then(() => ScrollTrigger.refresh());
        } else {
          const reveal = (targets, trigger, extra = {}) =>
            gsap.to(targets, {
              y: 0,
              yPercent: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "expo.out",
              duration: 0.7,
              ...extra,
              scrollTrigger: { trigger, start: "top 85%", toggleActions: "play none none reverse" },
            });

          reveal(chars, introEl, { stagger: 0.02, duration: 0.5, rotateZ: 0 });
          reveal(highlight, introEl, { x: 0, autoAlpha: 1, ease: "back.out(1.7)", duration: 0.6 });
          reveal(ledeWords, story, { stagger: 0.025, duration: 0.8 });
          reveal(revealTargets, capabilityBlockRef.current, { stagger: 0.12, onStart: startVideo });
          reveal(closing, closing, { duration: 0.6 });

          // No pin on mobile, so the spotlight is driven by each row's own
          // trigger instead of one scrubbed timeline — but it's the exact
          // same "light row i, revert row i-1" logic as desktop, just fired
          // discretely as each row crosses ~60% up the viewport (either
          // scroll direction), so it still only ever lights one row. The
          // active row's photo keeps the same slow Ken-Burns drift desktop
          // uses, started once its own reveal finishes and killed the
          // moment another row takes over.
          let activeIndex = -1;
          const setActive = (i) => {
            if (activeIndex === i) return;

            if (activeIndex > -1) {
              driftTween?.kill();
              driftTween = null;
              gsap.to(fills[activeIndex], { scaleX: 0, duration: 0.45, ease: "power3.inOut" });
              gsap.to(capLabels[activeIndex], { color: INK, duration: 0.45 });
              gsap.to(capDescs[activeIndex], { color: INK_MUTED, duration: 0.45 });
              gsap.to(capMarks[activeIndex], {
                backgroundColor: "rgba(11, 11, 12, 0)",
                borderColor: INK_MUTED,
                duration: 0.45,
              });
              gsap.to(stageMediaInner[activeIndex], {
                scale: 1.08,
                filter: blurOut,
                duration: 0.6,
                ease: "power2.in",
              });
              gsap.to(stageMedia[activeIndex], {
                opacity: 0,
                duration: 0.35,
                delay: 0.25,
                ease: "power2.in",
              });
            }

            gsap.to(fills[i], { scaleX: 1, duration: 0.45, ease: "power4.out" });
            gsap.to(capLabels[i], { color: PAPER, duration: 0.45 });
            gsap.to(capDescs[i], { color: PAPER_MUTED, duration: 0.45 });
            gsap.to(capMarks[i], { backgroundColor: PAPER, borderColor: PAPER, duration: 0.45 });

            const startDrift = () => {
              driftTween = gsap.to(stageMediaInner[i], {
                scale: 1.06,
                duration: 5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            };

            if (i === 0 && activeIndex === -1) {
              // First activation, first row — the photo is already resting
              // in the stage (see mount-time gsap.set above); unblur + pop it.
              gsap.fromTo(
                stageMediaInner[0],
                { scale: 1.04, filter: blurHidden },
                { scale: 1, filter: blurVisible, duration: 0.6, ease: "expo.out", onComplete: startDrift }
              );
            } else {
              // Guard against a mid-fade-out opacity from a previous visit
              // to this row before the wipe reveals it again.
              gsap.set(stageMedia[i], { opacity: 1 });
              gsap.fromTo(
                stageMedia[i],
                { clipPath: HIDDEN_CLIP },
                { clipPath: VISIBLE_CLIP, duration: 0.6, ease: "expo.inOut" }
              );
              gsap.fromTo(
                stageMediaInner[i],
                { scale: 1.18, filter: blurHidden },
                { scale: 1, filter: blurVisible, duration: 0.6, ease: "expo.out", onComplete: startDrift }
              );
            }

            activeIndex = i;
          };

          capabilityItems.forEach((row, i) => {
            ScrollTrigger.create({
              trigger: row,
              start: "top 62%",
              end: "bottom 38%",
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
            });
          });

          gsap.to(rings, {
            y: -30,
            duration: 6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.6,
          });
        }

        return () => {
          parallaxCleanup();
          driftTween?.kill();
          splitRest.revert();
          pin.classList.remove("is-marquee");
          stage.classList.remove("is-marquee");
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className={`waw-section ${displayFont.variable} ${stampFont.variable} ${bodyFont.variable}`}
    >
      {/* Structured data for the three services — read by crawlers straight
          from markup, independent of the scroll-linked reveal animation. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />

      <div className="waw-pin" ref={pinRef}>
        <p className="waw-scroll-hint" ref={scrollHintRef} aria-hidden="true">
          {SCROLL_HINT_TEXT}
        </p>

        <div className="waw-progress" ref={progressTrackRef} aria-hidden="true">
          <span className="waw-progress-dot" ref={progressDotRef} />
        </div>

        <div className="waw-rings-layer" ref={ringsLayerRef} aria-hidden="true">
          <span className="waw-ring waw-ring-a" />
          <span className="waw-ring waw-ring-b" />
          <span className="waw-ring waw-ring-c" />
        </div>

        <div className="waw-stage" ref={stageRef}>
          {/* ---------- "Who are we?" — italic serif sentence with "Who"
               stamped in a solid mono block, mirroring the hero's headline
               construction. ---------- */}
          <h2 id="who-we-are-heading" className="waw-heading waw-intro">
            <span className="waw-sr-only">Who are we?</span>
            <span aria-hidden="true">
              <span className="waw-highlight" ref={highlightRef}>
                <span className="waw-highlight-text">Who</span>
              </span>{" "}
              <span className="waw-intro-rest" ref={introRestRef}>
                are we?
              </span>
            </span>
          </h2>

          {/* ---------- the statement section ---------- */}
          <div className="waw-statement-wrap">
            <div className="waw-story" ref={storyRef}>
              {/* Per-word masks. A word can never wrap inside itself, so
                  each mask is always exactly one visual line tall — which
                  is what stops the wrapped lines being sliced in half
                  mid-reveal. The visible copy is shredded into spans, so
                  AT and crawlers get one clean sentence pair above it. */}
              <p className="waw-lede" ref={ledeRef}>
                <span className="waw-sr-only">
                  {LEDE_LINES.map((line) => line.text).join(" ")}
                </span>
                <span aria-hidden="true" className="waw-lede-lines">
                  {LEDE_LINES.map((line) => (
                    <span
                      className={`waw-heading waw-lede-line${
                        line.accent ? " waw-lede-accent" : ""
                      }`}
                      key={line.text}
                    >
                      {line.text.split(" ").map((word, wi, arr) => (
                        <span className="waw-lede-word-mask" key={wi}>
                          <span className="waw-lede-word-inner">
                            {word}
                            {wi < arr.length - 1 ? "\u00A0" : ""}
                          </span>
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </p>

              {/* Shared "stage" + list: only one row is ever highlighted, and
                  the stage always shows that same row's photo/video — the
                  two are always in sync because one activateCapability()
                  call (or setActive() on mobile) drives both at once. */}
              <div className="waw-capability-block" ref={capabilityBlockRef}>
                <div className="waw-capability-stage" ref={mediaStageRef} aria-hidden="true">
                  {CAPABILITIES.map((cap) => (
                    <div className="waw-capability-media" key={cap.label}>
                      {cap.media.type === "video" ? (
                        <video
                          ref={webVideoRef}
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={cap.media.poster}
                        >
                          <source src={cap.media.src} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={cap.media.src}
                          alt={cap.media.alt || cap.label}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1024px) 420px, 90vw"
                          style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <ul className="waw-capabilities" ref={capabilitiesListRef}>
                  {CAPABILITIES.map((cap) => (
                    <li className="waw-capability" key={cap.label}>
                      <span className="waw-capability-fill" aria-hidden="true" />
                      <div className="waw-capability-row">
                        <div className="waw-capability-copy">
                          <h3 className="waw-capability-label">{cap.label}</h3>
                          <p className="waw-capability-desc">{cap.description}</p>
                        </div>
                        <span className="waw-capability-mark" aria-hidden="true" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="waw-closing" ref={closingRef}>
                {CLOSING_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
