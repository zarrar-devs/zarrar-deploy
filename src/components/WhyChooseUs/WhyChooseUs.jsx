"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhyChooseUs.module.css";
import ContactModal from "../ContactModal/ContactModal";
import { CONTACT_EMAIL as SITE_CONTACT_EMAIL, ROUTES } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const KICKER_TEXT =
  "Every project starts with one question — what needs to happen for the right person to become a customer?";

const QUOTE_TEXT =
  "A good website makes the offer clear, earns trust and makes the next step obvious — enquire, book, call or buy.";

const STATEMENT_TOKENS = [
  { text: "We" },
  { text: "make" },
  { text: "your" },
  { text: "web development", chip: "web" },
  { text: "clear," },
  { text: "use" },
  { text: "lead generation", chip: "leads" },
  { text: "to" },
  { text: "find" },
  { text: "the" },
  { text: "right" },
  { text: "prospects," },
  { text: "use" },
  { text: "cold email outreach", chip: "outreach" },
  { text: "to" },
  { text: "start" },
  { text: "conversations," },
  { text: "and" },
  { text: "use" },
  { text: "social media management", chip: "social" },
  { text: "to" },
  { text: "keep" },
  { text: "your" },
  { text: "expertise" },
  { text: "visible." },
];

// Splits a chip's label into a breakable lead ("social media ") and the
// trailing word ("management") that must stay permanently glued to its
// icon — see .chipGroup / .chipGroupTail in the CSS module. Single-word
// labels (none currently, but just in case) come back with an empty lead.
function splitTrailingWord(text) {
  const idx = text.lastIndexOf(" ");
  if (idx === -1) return { lead: "", tail: text };
  return { lead: text.slice(0, idx + 1), tail: text.slice(idx + 1) };
}

const CHIP_DEFS = {
  web: {
    bg: "#CFE3FF",
    label: "Web development",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  leads: {
    bg: "#FFDCA8",
    label: "Lead generation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16l-6 8v6l-4 2v-8z" />
      </svg>
    ),
  },
  outreach: {
    bg: "#D6F3D0",
    label: "Cold email outreach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </svg>
    ),
  },
  social: {
    bg: "#F5D3E6",
    label: "Social media management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
      </svg>
    ),
  },
};

const CTA_SERVICES = [
  { id: "web", label: "Web development" },
  { id: "leads", label: "Lead generation" },
  { id: "outreach", label: "Cold email outreach" },
  { id: "social", label: "Social media management" },
];

function Chip({ id }) {
  const def = CHIP_DEFS[id];
  if (!def) return null;
  return (
    <span className={styles.chip} style={{ backgroundColor: def.bg }} aria-hidden="true">
      {def.icon}
    </span>
  );
}

/* Structured data note: this component no longer ships its own JSON-LD.
   The four services are described ONCE, in the Organization node of the
   page-level @graph (src/app/page.jsx <- SERVICES in src/lib/site.js).
   The old local Service block named the provider "ZARRAR" (all caps)
   while the rest of the site says "Zarrar" — Google saw two slightly
   different entities. If you edit a service, edit it in site.js. */

// Replaces the old STORIES (testimonial) data. Nothing here is a claim
// about a third party — it's how the studio itself works — so there is
// nothing to fake and nothing that needs a review/rating schema.
//
// IMPORTANT: edit this copy so it matches how you REALLY run projects.
// This is the one place to keep it honest and specific (add timelines,
// deliverables, tools, etc. only if they're true).
const PROCESS_STEPS = [
  {
    title: "Discover",
    desc:
      "We start with your offer, your audience, your current pipeline and the action you want a new visitor or prospect to take.",
    outcome: "A clear goal",
    tint: "#CFE3FF",
  },
  {
    title: "Plan",
    desc:
      "We map the website, prospecting, outreach and social content together so every channel points to the same offer.",
    outcome: "One shared roadmap",
    tint: "#FFDCA8",
  },
  {
    title: "Design",
    desc:
      "We shape the message, layout and calls to action around what a real prospect needs to understand before they say yes.",
    outcome: "A consistent brand",
    tint: "#D6F3D0",
  },
  {
    title: "Build",
    desc:
      "A custom website built for mobile, search and conversion, with forms and enquiry paths connected from the start.",
    outcome: "A fast, working site",
    tint: "#F5D3E6",
  },
  {
    title: "Improve",
    desc:
      "Cold outreach and social content keep the business visible, while replies and engagement tell us what to improve next.",
    outcome: "Steady improvement",
    tint: "#E1D9FF",
  },
];

function ChevronIcon({ direction }) {
  const d = direction === "left" ? "M12.5 5l-6 6 6 6" : "M7.5 5l6 6-6 6";
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.5 4.5v11l9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <rect x="5.5" y="4.5" width="3" height="11" rx="0.8" />
      <rect x="11.5" y="4.5" width="3" height="11" rx="0.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

const MARQUEE_PHRASE = "Let's build a website that supports your sales pipeline";
const MARQUEE_REPEAT = 6;

// Single source of truth for the secondary contact path.
// Comes from src/lib/site.js so the homepage shows the same address
// as every other page.
const CONTACT_EMAIL = SITE_CONTACT_EMAIL;

const SNAP_DURATION = 0.5;
const SNAP_EASE = "power2.out";

// Slightly slower than the old testimonial loop — these cards carry a
// bit more to read (title + sentence + outcome).
const STEPS_LOOP_DURATION = 20;

const CARD_STEP_DURATION = STEPS_LOOP_DURATION / PROCESS_STEPS.length;

const STEPS_HOVER_TIMESCALE = 0;

const STAGE1_LIGHT_VARS = {
  "--stage1-bg": "#ffffff",
  "--stage1-fg": "#0a0a0a",
  "--stage1-fg-muted": "rgba(10, 10, 10, 0.65)",
  "--stage1-fg-soft": "rgba(10, 10, 10, 0.55)",
  "--stage1-border": "rgba(10, 10, 10, 0.14)",
  "--stage1-border-soft": "rgba(10, 10, 10, 0.1)",
};

// Stage 3 (marquee + closing CTA) flips in sync with the philosophy panel.
// Same --stage3-* variables the CSS module declares (light is its default).
const STAGE3_LIGHT_VARS = {
  "--stage3-bg": "#ffffff",
  "--stage3-fg": "#0a0a0a",
  "--stage3-border": "rgba(10, 10, 10, 0.14)",
  "--stage3-dot": "#0a0a0a",
  "--stage3-glow": "rgba(10, 10, 10, 0.05)",
  "--stage3-btn-bg": "#0a0a0a",
  "--stage3-btn-fg": "#ffffff",
  "--stage3-btn-glow": "rgba(10, 10, 10, 0.32)",
};

const STAGE3_DARK_VARS = {
  "--stage3-bg": "#0a0a0a",
  "--stage3-fg": "#ffffff",
  "--stage3-border": "rgba(255, 255, 255, 0.14)",
  "--stage3-dot": "#ffffff",
  "--stage3-glow": "rgba(255, 255, 255, 0.18)",
  "--stage3-btn-bg": "#ffffff",
  "--stage3-btn-fg": "#0a0a0a",
  "--stage3-btn-glow": "rgba(255, 255, 255, 0.4)",
};

const STAGE1_DARK_VARS = {
  "--stage1-bg": "#0a0a0a",
  "--stage1-fg": "#ffffff",
  "--stage1-fg-muted": "rgba(255, 255, 255, 0.78)",
  "--stage1-fg-soft": "rgba(255, 255, 255, 0.68)",
  "--stage1-border": "rgba(255, 255, 255, 0.14)",
  "--stage1-border-soft": "rgba(255, 255, 255, 0.1)",
};

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const stage1Ref = useRef(null);
  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const statementRef = useRef(null);
  const stepsLabelRef = useRef(null);
  const stepsViewportRef = useRef(null);
  const stepsTrackRef = useRef(null);
  const stepsCursorRef = useRef(null);
  const stepItemRefs = useRef([]);
  const carouselTweenRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const quoteRef = useRef(null);
  const quoteTextRef = useRef(null);
  const ctaRef = useRef(null);

  const marqueeSectionRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let marqueeIdleTimeout = null;

    const ctx = gsap.context(() => {
      gsap.set(stage1Ref.current, STAGE1_LIGHT_VARS);

      const snapStage1 = (toDark) => {
        gsap.to(stage1Ref.current, {
          ...(toDark ? STAGE1_DARK_VARS : STAGE1_LIGHT_VARS),
          duration: SNAP_DURATION,
          ease: SNAP_EASE,
        });
      };

      // A function (not a one-time boolean) so ScrollTrigger re-evaluates
      // it on every refresh — including the debounced resize/orientation
      // handler below. A boolean captured once at mount used to leave the
      // trigger point stuck on whatever breakpoint the page happened to
      // load at (e.g. rotating a phone, or resizing a desktop window).
      const getIsMobile = () => window.matchMedia("(max-width: 640px)").matches;

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: () => (getIsMobile() ? "center 38%" : "center center"),
        onEnter: () => snapStage1(true),
        onEnterBack: () => snapStage1(true),
        onLeaveBack: () => snapStage1(false),
      });

      gsap.from(kickerRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: kickerRef.current, start: "top 88%" },
      });

      const statementWords = statementRef.current.querySelectorAll(
        `.${styles.word}`
      );
      gsap.from(statementWords, {
        yPercent: 115,
        rotateZ: 2,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.028,
        scrollTrigger: { trigger: statementRef.current, start: "top 85%" },
      });

      const statementChips = statementRef.current.querySelectorAll(
        `.${styles.chip}`
      );
      gsap.from(statementChips, {
        scale: 0,
        rotate: -18,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2.4)",
        stagger: 0.05,
        delay: 0.15,
        scrollTrigger: { trigger: statementRef.current, start: "top 85%" },
      });

      gsap.from(stepsLabelRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: stepsLabelRef.current, start: "top 92%" },
      });

      gsap.fromTo(
        stepItemRefs.current,
        { opacity: 0, y: 36, scale: 0.97, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: stepsTrackRef.current, start: "top 92%" },
        }
      );

      // The philosophy panel (quoteStage) starts black, then snaps to the
      // light --color-accent once it's in view. The closing stage below it
      // (marqueeSection: marquee banner + CTA) now snaps in the SAME
      // callback with the same duration and ease, so the two flip together
      // and read as one light block. The footer is a separate component
      // and is deliberately left alone.
      //
      // History: this used to tween marqueeSectionRef to the accent with a
      // raw backgroundColor and never reverted it, which is what produced
      // the old "green then black" flash. That is fixed here by driving
      // Stage 3 through its own --stage3-* variables and reverting them in
      // onLeaveBack, exactly like the philosophy panel.
      //
      // MOBILE: on phones the browser's address bar hides/shows while
      // scrolling, which resizes the viewport and re-fires this trigger
      // mid-scroll (black/white flash). So phones skip the whole animation
      // and both panels stay on their static dark CSS look (.quoteStage and
      // .marqueeSection in the max-width: 767.98px block); desktop keeps the
      // snap.
      if (!getIsMobile()) {
        gsap.set(quoteRef.current, {
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
        });
        gsap.set(marqueeSectionRef.current, STAGE3_DARK_VARS);

        const snapPanels = (toLight) => {
          gsap.to(quoteRef.current, {
            backgroundColor: toLight ? "var(--color-accent)" : "#0a0a0a",
            color: toLight ? "var(--color-ink)" : "#ffffff",
            duration: SNAP_DURATION,
            ease: SNAP_EASE,
          });
          gsap.to(marqueeSectionRef.current, {
            ...(toLight ? STAGE3_LIGHT_VARS : STAGE3_DARK_VARS),
            duration: SNAP_DURATION,
            ease: SNAP_EASE,
          });
        };

        ScrollTrigger.create({
          trigger: quoteRef.current,
          start: "top 10%",
          onEnter: () => snapPanels(true),
          onLeaveBack: () => snapPanels(false),
        });
      }

      const quoteWords = quoteTextRef.current.querySelectorAll(
        `.${styles.word}`
      );
      gsap.from(quoteWords, {
        yPercent: 110,
        rotateZ: 1.5,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.025,
        scrollTrigger: {
          trigger: quoteTextRef.current,
          start: "top 80%",
        },
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      });

      gsap.from(
        [
          `.${styles.marqueeHeading}`,
          `.${styles.marqueeSub}`,
          `.${styles.marqueeServices}`,
          `.${styles.marqueeCtaActions}`,
        ],
        {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: marqueeSectionRef.current,
            start: "top 65%",
          },
        }
      );

      const useAnimatedMarquee = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    ).matches;

    let marqueeTween = null;
    let lastBoost = 1;

    if (useAnimatedMarquee) {
      marqueeTween = gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: marqueeSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(
            0.4,
            3.2,
            1 + Math.abs(velocity) / 2000
          );
          if (Math.abs(boost - lastBoost) > 0.03 && marqueeTween) {
            lastBoost = boost;
            gsap.to(marqueeTween, {
              timeScale: boost,
              duration: 0.3,
              overwrite: true,
            });
          }
          clearTimeout(marqueeIdleTimeout);
          marqueeIdleTimeout = setTimeout(() => {
            lastBoost = 1;
            if (marqueeTween) {
              gsap.to(marqueeTween, {
                timeScale: 1,
                duration: 0.6,
                overwrite: true,
              });
            }
          }, 120);
        },
      });
    }

    // Mobile/touch: no continuous horizontal motion. The banner becomes a
    // static, readable service section and the CTA below remains the focus.
    if (!useAnimatedMarquee) {
      gsap.set(marqueeTrackRef.current, { xPercent: 0 });
    }
    }, sectionRef);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    // Resize/orientation-change safety net, debounced so a drag-resize
    // doesn't fire dozens of refreshes in a row. This only re-measures
    // where each existing trigger's start/end points now fall — it does
    // not change what triggers them or what they animate, so the
    // color-snap behavior itself is untouched.
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (marqueeIdleTimeout) clearTimeout(marqueeIdleTimeout);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const track = stepsTrackRef.current;
    const viewport = stepsViewportRef.current;
    if (!track || !viewport) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const useTouchLayout = !window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    ).matches;
    if (prefersReducedMotion || useTouchLayout) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: STEPS_LOOP_DURATION,
      repeat: -1,
    });
    carouselTweenRef.current = tween;

    const stop = () => {
      if (tween.paused()) return;
      gsap.to(tween, { timeScale: STEPS_HOVER_TIMESCALE, duration: 0.25, overwrite: true });
    };
    const resume = () => {
      if (tween.paused()) return;
      gsap.to(tween, { timeScale: 1, duration: 0.4, overwrite: true });
    };

    const EXIT_ZONE_RATIO = 0.16;
    const isExiting = (card) => {
      const viewportBounds = viewport.getBoundingClientRect();
      const cardBounds = card.getBoundingClientRect();
      const cardCenter = cardBounds.left + cardBounds.width / 2 - viewportBounds.left;
      return cardCenter < viewportBounds.width * EXIT_ZONE_RATIO;
    };

    const handleEnter = (event) => {
      if (isExiting(event.currentTarget)) {
        resume();
      } else {
        stop();
      }
    };
    const handleLeave = () => resume();

    const stepCarousel = (direction) => {
      gsap.to(tween, {
        totalTime: tween.totalTime() + direction * CARD_STEP_DURATION,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    // Click the left/right half of the carousel to step back/forward.
    // (The old "View photo" button guard is gone — cards no longer
    // contain any interactive elements.)
    const handleClick = (event) => {
      const bounds = viewport.getBoundingClientRect();
      const clickedLeftHalf = event.clientX - bounds.left < bounds.width / 2;
      stepCarousel(clickedLeftHalf ? -1 : 1);
    };
    viewport.addEventListener("click", handleClick);

    const cards = Array.from(track.querySelectorAll(`.${styles.stepCard}`));
    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
    });

    tween.stepCarousel = stepCarousel;

    return () => {
      viewport.removeEventListener("click", handleClick);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
      tween.kill();
      carouselTweenRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewport = stepsViewportRef.current;
    const cursor = stepsCursorRef.current;
    if (!viewport || !cursor) return;

    let rafId = null;
    let lastEvent = null;

    const setCursorPosition = (event) => {
      const bounds = viewport.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursor.textContent = x < bounds.width / 2 ? "Back" : "Next";
    };

    const handlePointerEnter = (event) => {
      if (event.pointerType !== "mouse") return;
      cursor.style.opacity = "1";
      setCursorPosition(event);
    };

    const handlePointerLeave = (event) => {
      if (event.pointerType !== "mouse") return;
      cursor.style.opacity = "0";
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      lastEvent = event;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (lastEvent) setCursorPosition(lastEvent);
      });
    };

    viewport.addEventListener("pointerenter", handlePointerEnter);
    viewport.addEventListener("pointerleave", handlePointerLeave);
    viewport.addEventListener("pointermove", handlePointerMove);

    return () => {
      viewport.removeEventListener("pointerenter", handlePointerEnter);
      viewport.removeEventListener("pointerleave", handlePointerLeave);
      viewport.removeEventListener("pointermove", handlePointerMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStep = (direction) => {
    const tween = carouselTweenRef.current;
    if (!tween || tween.paused()) return;
    tween.stepCarousel?.(direction);
  };

  const handleTogglePause = () => {
    const tween = carouselTweenRef.current;
    if (!tween) return;
    const nextPaused = !tween.paused();
    tween.paused(nextPaused);
    setIsPaused(nextPaused);
  };

  /* Never add Review / AggregateRating markup here until it is built
     from REAL, verifiable reviews — the old version generated it from
     placeholder testimonials, which is against Google's review-snippet
     guidelines and can trigger a manual action. */

  const renderStepGroup = (duplicate) => {
    // Real group renders as an ordered list (these five steps genuinely
    // are a sequence) so assistive tech announces "item 1 of 5" etc.
    // The duplicate exists only to make the marquee loop seamless, so it
    // stays a plain aria-hidden div — it must not add a second list (or
    // a second set of headings) to the page outline.
    const GroupTag = duplicate ? "div" : "ol";
    const ItemTag = duplicate ? "div" : "li";
    // Nested one level under the "How we work" h3 above, not a sibling
    // h3 — each step is a subsection of that heading, not of the page.
    const Title = duplicate ? "p" : "h4";

    return (
      <GroupTag
        className={styles.stepsTrackGroup}
        aria-hidden={duplicate ? "true" : undefined}
        data-nosnippet={duplicate ? "" : undefined}
      >
        {PROCESS_STEPS.map((step, i) => (
          <ItemTag
            key={step.title}
            ref={duplicate ? undefined : (el) => (stepItemRefs.current[i] = el)}
            className={styles.stepCard}
          >
            <span
              className={styles.stepNumber}
              style={{ backgroundColor: step.tint }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <Title className={styles.stepTitle}>{step.title}</Title>

            <p className={styles.stepDesc}>{step.desc}</p>

            <div className={styles.stepOutcome}>
              <span className={styles.stepOutcomeLabel}>You get</span>
              <span className={styles.stepOutcomeValue}>{step.outcome}</span>
            </div>
          </ItemTag>
        ))}
      </GroupTag>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className={`${styles.section} ${bricolageGrotesque.variable} ${plusJakartaSans.variable}`}
      aria-labelledby="why-choose-us-heading"
    >
      <div ref={stage1Ref} className={styles.stage1}>
        <div className={styles.stage1Content}>
          <div ref={heroRef} className={styles.hero}>
            <p ref={kickerRef} className={styles.kicker}>
              {KICKER_TEXT}
            </p>

            <h2
              id="why-choose-us-heading"
              ref={statementRef}
              className={styles.statement}
            >
              {STATEMENT_TOKENS.map((tok, i) => {
                let chipContent = tok.text;

                if (tok.chip) {
                  // Only the trailing word stays permanently glued to the
                  // icon (via .chipGroupTail, always nowrap) — the rest of
                  // a multi-word label (e.g. "social media ") is free to
                  // wrap normally on narrow screens. See the CSS module
                  // for why the icon can otherwise end up orphaned alone
                  // on its own line.
                  const { lead, tail } = splitTrailingWord(tok.text);
                  chipContent = (
                    <span className={styles.chipGroup}>
                      {lead}
                      <span className={styles.chipGroupTail}>
                        {tail}
                        <Chip id={tok.chip} />
                      </span>
                    </span>
                  );
                }

                return (
                  <span key={i}>
                    <span className={styles.wordMask}>
                      <span className={styles.word}>{chipContent}</span>
                    </span>{" "}
                  </span>
                );
              })}
            </h2>
          </div>

          <div className={styles.stepsSection}>
            <div className={styles.stepsHeader}>
              <h3 ref={stepsLabelRef} className={styles.stepsLabel}>
                How we work
              </h3>

              <div className={styles.stepsControls}>
                <button
                  type="button"
                  className={styles.stepsControlButton}
                  onClick={() => handleStep(-1)}
                  aria-label="Show previous step"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  className={styles.stepsControlButton}
                  onClick={handleTogglePause}
                  aria-pressed={isPaused}
                  aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
                >
                  {isPaused ? <PlayIcon /> : <PauseIcon />}
                </button>
                <button
                  type="button"
                  className={styles.stepsControlButton}
                  onClick={() => handleStep(1)}
                  aria-label="Show next step"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>

            <div
              className={styles.stepsCarousel}
              role="region"
              aria-label="How we work"
            >
              <div className={styles.stepsViewport} ref={stepsViewportRef}>
                <div className={styles.stepsTrack} ref={stepsTrackRef}>
                  {renderStepGroup(false)}
                  {renderStepGroup(true)}
                </div>
              </div>

              <div
                ref={stepsCursorRef}
                className={styles.stepsCursor}
                aria-hidden="true"
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={quoteRef} className={styles.quoteStage}>
        <div className={styles.quoteInner}>
          <h3 className={styles.quoteLabel}>Our philosophy</h3>

          <p ref={quoteTextRef} className={styles.quoteText}>
            {/* The {" "} matters: without a real space between the
                word spans, the text reads as one glued string
                ("Abeautifulwebsite…") to Google and screen readers. */}
            {QUOTE_TEXT.split(" ").map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className={styles.wordMask}>
                  <span className={styles.word}>{word}</span>
                </span>{" "}
              </Fragment>
            ))}
          </p>

          <div ref={ctaRef} className={styles.quoteCtaRow}>
            <button
              type="button"
              className={styles.processButton}
              onClick={() =>
                marqueeSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <span className={styles.processButtonIcon} aria-hidden="true">
                <ArrowIcon />
              </span>
              Let&rsquo;s Talk
            </button>
            <Link href={ROUTES.services} className={styles.quoteServiceLink}>
              Explore services
            </Link>
          </div>
        </div>
      </div>

      <div ref={marqueeSectionRef} className={styles.marqueeSection}>
        <div className={styles.marqueeViewport}>
          <div
            ref={marqueeTrackRef}
            className={styles.marqueeTrack}
            aria-hidden="true"
            data-nosnippet=""
          >
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div className={styles.marqueeGroup} key={groupIndex}>
                {Array.from({ length: MARQUEE_REPEAT }).map((_, i) => (
                  <span className={styles.marqueeItem} key={i}>
                    {MARQUEE_PHRASE}
                    <span className={styles.marqueeDot}>●</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.marqueeCtaContent}>
          <div className={styles.marqueeCtaGlow} aria-hidden="true" />

          <h3 className={styles.marqueeHeading}>
            Need a clearer online presence and a better way to reach prospects?
          </h3>
          <p className={styles.marqueeSub}>
            We connect web development, lead generation, cold email outreach and social media management so the channels support each other.
          </p>

          <ul className={styles.marqueeServices}>
            {CTA_SERVICES.map((service) => (
              <li key={service.id} className={styles.marqueeServiceItem}>
                <span
                  className={styles.marqueeServiceIcon}
                  style={{ backgroundColor: CHIP_DEFS[service.id].bg }}
                  aria-hidden="true"
                >
                  {CHIP_DEFS[service.id].icon}
                </span>
                {service.label}
              </li>
            ))}
          </ul>

          <nav className={styles.marqueeCtaLinks} aria-label="Explore Zarrar services">
            <Link href={ROUTES.webDevelopment}>Web development</Link>
            <Link href={ROUTES.leadGeneration}>Lead generation</Link>
            <Link href={ROUTES.coldEmail}>Cold email outreach</Link>
            <Link href={ROUTES.socialMedia}>Social media management</Link>
          </nav>

          <div style={{marginTop: '20px'}} className={styles.marqueeCtaActions}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => setIsContactOpen(true)}
            >
              <span className={styles.ctaButtonFill} aria-hidden="true" />
              <span className={styles.ctaButtonLabel}>Start a Project</span>
              <span className={styles.ctaButtonIcon} aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.marqueeContactLink}>
             {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}