"use client";

import React, { useState, useEffect } from "react";
import { HeroProps } from "@/types";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { BackgroundPattern } from "../ui/BackgroundPattern";
import { cn } from "@/utils/cn";
import { TextReveal, ImageReveal, Magnetic } from "../ui";
import Image from "next/image";

export const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  primaryCtaText,
  primaryCtaLink,
}) => {
  const isAboutPage = !primaryCtaText;

  const homeSlides = [
    {
      id: "slide1",
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1400&auto=format&fit=crop",
      alt: "Children and educator learning outdoors with tablet",
      driftClass: "ken-burns-right",
    },
    {
      id: "slide2",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
      alt: "Children reading books in a group",
      driftClass: "ken-burns-left",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5000;

  useEffect(() => {
    if (isAboutPage) return;

    setProgress(0);
    const step = 100 / (INTERVAL / 50);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);

    const slideTimer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % homeSlides.length);
    }, INTERVAL);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [activeSlide, isAboutPage, homeSlides.length]);

  const aboutSlides = [
    {
      id: "about1",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
      alt: "Children reading books in a classroom",
      driftClass: "ken-burns-right",
    },
    {
      id: "about2",
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop",
      alt: "Students collaborating on robotics kits",
      driftClass: "ken-burns-left",
    },
    {
      id: "about3",
      src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1400&auto=format&fit=crop",
      alt: "Children learning in an outdoor garden",
      driftClass: "ken-burns-right",
    },
  ];

  const [aboutActiveSlide, setAboutActiveSlide] = useState(0);
  const [aboutProgress, setAboutProgress] = useState(0);
  const ABOUT_INTERVAL = 4500;

  useEffect(() => {
    if (!isAboutPage) return;
    setAboutProgress(0);
    const step = 100 / (ABOUT_INTERVAL / 50);
    const progressTimer = setInterval(() => {
      setAboutProgress((p) => Math.min(p + step, 100));
    }, 50);
    const slideTimer = setTimeout(() => {
      setAboutActiveSlide((prev) => (prev + 1) % aboutSlides.length);
    }, ABOUT_INTERVAL);
    return () => { clearInterval(progressTimer); clearTimeout(slideTimer); };
  }, [aboutActiveSlide, isAboutPage, aboutSlides.length]);

  // ── About page layout ───────────────────────────────────────────
  if (isAboutPage) {
    return (
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-cream border-b border-forest/5">
        <BackgroundPattern variant="leaf" opacity={0.6} className="text-forest/10" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-charcoal font-heading leading-tight mb-6">
                <TextReveal mode="words">{heading}</TextReveal>
              </h1>
              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
                {subheading}
              </p>
            </div>
            <div className="lg:col-span-6 w-full relative aspect-[1.4] rounded-[32px] overflow-hidden border border-forest/10 shadow-sm">
              {aboutSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    opacity: aboutActiveSlide === idx ? 1 : 0,
                    transition: "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: aboutActiveSlide === idx ? 10 : 0,
                  }}
                  aria-hidden={aboutActiveSlide !== idx}
                >
                  <div
                    key={`${slide.id}-${aboutActiveSlide}`}
                    className={cn(
                      "absolute inset-0 will-change-transform",
                      aboutActiveSlide === idx ? slide.driftClass : ""
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              ))}

              {/* Progress-fill navigation dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {aboutSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setAboutActiveSlide(idx); setAboutProgress(0); }}
                    className="relative flex items-center justify-center focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {aboutActiveSlide === idx ? (
                      <span className="relative block w-8 h-[3px] rounded-full bg-white/30 overflow-hidden">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-white"
                          style={{ width: `${aboutProgress}%`, transition: "width 50ms linear" }}
                        />
                      </span>
                    ) : (
                      <span className="block w-2 h-[3px] rounded-full bg-white/50 hover:bg-white/80 transition-colors duration-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // ── Home page hero ───────────────────────────────────────────────
  return (
    <>
      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kenBurnsRight {
          0%   { transform: scale(1)    translateX(0)     translateY(0); }
          100% { transform: scale(1.09) translateX(1.5%)  translateY(-1%); }
        }
        @keyframes kenBurnsLeft {
          0%   { transform: scale(1)    translateX(0)      translateY(0); }
          100% { transform: scale(1.09) translateX(-1.5%)  translateY(1%); }
        }
        .ken-burns-right { animation: kenBurnsRight 6s ease-in-out forwards; }
        .ken-burns-left  { animation: kenBurnsLeft  6s ease-in-out forwards; }
      `}</style>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Content Card */}
            <div className="lg:col-span-5 relative bg-sage border border-forest/10 rounded-[32px] p-6 flex flex-col justify-center overflow-hidden shadow-xs">
              <BackgroundPattern variant="leaf" opacity={0.5} className="text-forest/15 animate-pulse" />
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 z-10 flex flex-col items-center text-center shadow-xs h-full justify-between">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-charcoal font-heading leading-tight mb-6">
                    <TextReveal mode="words">{heading}</TextReveal>
                  </h1>
                  <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-body mb-8">
                    {subheading}
                  </p>
                </div>
                <Magnetic strength={0.15}>
                  <Button
                    label={primaryCtaText}
                    variant="primary"
                    href={primaryCtaLink}
                    className="bg-navy text-white hover:bg-forest hover:text-white rounded-full px-8 py-3 font-bold transition-all duration-300 shadow-sm"
                  />
                </Magnetic>
              </div>
            </div>

            {/* Right Cinematic Carousel */}
            <div className="lg:col-span-7 relative w-full aspect-[4/3] lg:aspect-auto rounded-[32px] overflow-hidden border border-forest/10 shadow-sm">

              {/* All slides always in DOM — crossfade via opacity */}
              {homeSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    opacity: activeSlide === idx ? 1 : 0,
                    transition: "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: activeSlide === idx ? 10 : 0,
                  }}
                  aria-hidden={activeSlide !== idx}
                >
                  {/* Inner wrapper — unique key restarts Ken Burns on activation */}
                  <div
                    key={`${slide.id}-${activeSlide}`}
                    className={cn(
                      "absolute inset-0 will-change-transform",
                      activeSlide === idx ? slide.driftClass : ""
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={idx === 0}
                    />
                  </div>

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              ))}

              {/* Progress-fill navigation dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {homeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveSlide(idx); setProgress(0); }}
                    className="relative flex items-center justify-center focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {activeSlide === idx ? (
                      <span className="relative block w-8 h-[3px] rounded-full bg-white/30 overflow-hidden">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-white"
                          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                        />
                      </span>
                    ) : (
                      <span className="block w-2 h-[3px] rounded-full bg-white/50 hover:bg-white/80 transition-colors duration-200" />
                    )}
                  </button>
                ))}
              </div>


            </div>

          </div>
        </Container>
      </section>
    </>
  );
};
