"use client";

import React, { useRef, useState, useEffect } from "react";
import { useMotionValue } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { STORY_STEPS } from "@/constants/storyData";
import { Container } from "@/components/ui/Container";

import { StoryBackground } from "./StoryBackground";
import { StoryImage } from "./StoryImage";
import { StoryContent } from "./StoryContent";
import { StoryNavigation } from "./StoryNavigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const StoryScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // States
  const [activeStory, setActiveStory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Track progress as a MotionValue for React integrations
  const progressVal = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const frameId = requestAnimationFrame(() => {
      setPrefersReducedMotion(motionQuery.matches);
      checkMobile();
    });

    window.addEventListener("resize", checkMobile);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // GSAP Master ScrollTrigger Timeline
  useGSAP(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state setup for heading words of step 0
    gsap.set(".story-heading-container-0 .story-heading-word", {
      y: "0%",
      opacity: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 500vh scroll height total
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressVal.set(self.progress);
          const calculatedIndex = Math.min(
            STORY_STEPS.length - 1,
            Math.floor(self.progress * STORY_STEPS.length)
          );
          const clampedIndex = Math.max(0, calculatedIndex);
          if (clampedIndex !== activeStory) {
            setActiveStory(clampedIndex);
          }
        },
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

    // Timeline duration base: 1 unit per story phase
    const stepDuration = 1;
    const transitionDuration = 0.3; // crossfade speed ratio

    // 2) Program transition sequences for each slide step
    for (let i = 0; i < STORY_STEPS.length - 1; i++) {
      const startTransitionTime = (i + 1) * stepDuration - transitionDuration;

      // ── EXIT CURRENT SLIDE (i) ──
      // Fade out image
      tl.to(`.story-image-frame-${i}`, {
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
        duration: transitionDuration,
        ease: "power2.inOut",
      }, startTransitionTime);

      // Fade out text content elements
      tl.to(`.story-content-block-${i}`, {
        opacity: 0,
        y: -20,
        duration: transitionDuration,
        ease: "power2.inOut",
      }, startTransitionTime);

      // ── ENTER NEXT SLIDE (i+1) ──
      // Transition background color tint
      tl.to(".story-bg-layer", {
        backgroundColor: STORY_STEPS[i + 1].bgColor,
        duration: transitionDuration,
        ease: "power1.inOut",
      }, startTransitionTime);

      // Animate background glow movement
      tl.to(".story-bg-glow", {
        x: (i + 1) * 60,
        y: (i + 1) * 20,
        duration: transitionDuration,
        ease: "power1.inOut",
      }, startTransitionTime);

      // Fade in next image
      tl.to(`.story-image-frame-${i + 1}`, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: transitionDuration,
        ease: "power2.out",
      }, startTransitionTime);

      // Fade in next content wrapper
      tl.to(`.story-content-block-${i + 1}`, {
        opacity: 1,
        y: 0,
        duration: transitionDuration,
        ease: "power2.out",
      }, startTransitionTime);

      // Stagger next heading words reveal (line-by-line mask)
      tl.fromTo(`.story-heading-container-${i + 1} .story-heading-word`, {
        y: "100%",
        opacity: 0,
      }, {
        y: "0%",
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
      }, startTransitionTime + 0.1);

      // Fade up next description
      tl.fromTo(`.story-description-${i + 1}`, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, startTransitionTime + 0.2);

      // Scale up next action button
      tl.fromTo(`.story-button-${i + 1}`, {
        scale: 0.95,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      }, startTransitionTime + 0.3);
    }

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isMobile, prefersReducedMotion]);

  // Handle sidebar navigation clicks
  const scrollToStep = (index: number) => {
    if (isMobile) {
      const targetCard = document.getElementById(`mobile-story-card-${index}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const trigger = scrollTriggerRef.current;
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      const distance = end - start;
      // Map index ratio to absolute window scroll coordinates
      const targetPosition = start + (index / (STORY_STEPS.length - 1)) * distance;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      {/* ─── DESKTOP VIEW: GSAP SCROLL STORYTELLING ────────────────────── */}
      <section
        ref={containerRef}
        className="hidden lg:block relative w-full h-screen overflow-hidden bg-[#FAF9F5]"
      >
        <StoryBackground />

        <Container className="relative z-10 h-full flex items-center justify-between py-16">
          <div className="grid grid-cols-12 gap-16 items-center w-full">
            {/* Left Content column (40% space) */}
            <div className="col-span-5 flex flex-col gap-10">
              <StoryContent />

            </div>

            {/* Middle Spacer for Sidebar Rail */}
            <div className="col-span-2 flex justify-center">
              <StoryNavigation activeStory={activeStory} scrollToStep={scrollToStep} />
            </div>

            {/* Right Media column (60% space) */}
            <div className="col-span-5 aspect-[4/5] max-h-[70vh]">
              <StoryImage />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── MOBILE VIEW: STACKED CARD SEQUENCE ───────────────────────── */}
      <section className="lg:hidden w-full py-16 bg-[#FAF9F5] flex flex-col gap-10 px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="badge-gold mb-3">Our Work</span>
          <h2 className="text-3xl font-extrabold text-charcoal font-heading leading-tight">
            How We Support Communities
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {STORY_STEPS.map((step, idx) => (
            <div
              key={step.id}
              id={`mobile-story-card-${idx}`}
              className="card-base p-5 border border-charcoal/5 flex flex-col gap-6"
            >
              {/* Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-3">
                <span className="badge-gold w-fit">{step.badge}</span>
                <h3 className="text-xl font-bold text-charcoal font-heading">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                  {step.description}
                </p>
                <div className="pt-2">
                  <Button
                    label={step.buttonText}
                    variant="text"
                    href={step.buttonLink}
                    icon={<ArrowRight size={14} />}
                    iconPosition="right"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default StoryScroller;
