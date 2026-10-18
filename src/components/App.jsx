"use client";

import { useRef } from "react";
import SmoothScrollProvider from "./WhoAreWe/SmoothScrollProvider";
import Preloader from "./Preloader/Preloader";
import Hero from "./Hero/Hero";
import MarqueeBand from "./landing/MarqueeBand";
import WhoAreWe from "./WhoAreWe/WhoAreWe";
import Manifesto from "./landing/Manifesto";
import ServicesShowcase from "./landing/ServicesShowcase";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import LandingFinale from "./landing/LandingFinale";

/* Landing page order (each block has ONE job):
   Hero             - what we are, and the first action
   MarqueeBand      - the four services at a glance (also real links)
   WhoAreWe         - the story + the three capabilities
   Manifesto        - why we are not a "normal website" agency
   ServicesShowcase - the four services explained, one panel each
   WhyChooseUs      - how we work + philosophy + closing CTA
   LandingFinale    - who we work with, founder (-> /about), FAQ
   Colours: white until WhyChooseUs' own dark stage, then it ends
   white on desktop / dark on phones; the near-black Finale picks up
   from there and flows straight into the footer. */
export default function App() {
  const heroRef = useRef(null);

  return (
    <SmoothScrollProvider>
      <main id="page-main">
        <Preloader heroRef={heroRef}>
          <Hero ref={heroRef} />
        </Preloader>
        <MarqueeBand />
        <WhoAreWe />
        <Manifesto />
        <ServicesShowcase />
        <WhyChooseUs />
        <LandingFinale />
      </main>
    </SmoothScrollProvider>
  );
}
