"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeroProps } from "@/types";
import { Button } from "../ui/Button";
import { TextReveal, BackgroundPattern } from "../ui";
import Image from "next/image";
import { Container } from "../ui/Container";
import { cn } from "@/utils/cn";

export const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  primaryCtaText,
  primaryCtaLink,
}) => {
  const isAboutPage = !primaryCtaText;

  // ── Home slides — 5 images, slide transition (no zoom) ───────────
  const homeSlides = [
    {
      id: "slide1",
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400&auto=format&fit=crop",
      alt: "Educator teaching and helping primary students build electronics kits in a classroom environment",
    },
    {
      id: "slide2",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
      alt: "Coding mentor explaining programming concepts on screen, helping young developers write code",
    },
    {
      id: "slide3",
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1400&auto=format&fit=crop",
      alt: "Volunteers and children planting organic tree saplings in soil during an environmental reforestation campaign",
    },
    {
      id: "slide4",
      src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1400&auto=format&fit=crop",
      alt: "Art teacher assisting students with watercolor painting during a creative art workshop",
    },
    {
      id: "slide5",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
      alt: "Retired senior volunteer helping children with reading books in a community mentorship center",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5000;

  const goToSlide = useCallback((next: number) => {
    if (next === activeSlide || sliding) return;
    setPrevSlide(activeSlide);
    setSliding(true);
    setProgress(0);
    setTimeout(() => {
      setActiveSlide(next);
      setPrevSlide(null);
      setSliding(false);
    }, 600);
  }, [activeSlide, sliding]);

  useEffect(() => {
    if (isAboutPage) return;
    Promise.resolve().then(() => setProgress(0));
    const step = 100 / (INTERVAL / 50);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
    const slideTimer = setTimeout(() => {
      goToSlide((activeSlide + 1) % homeSlides.length);
    }, INTERVAL);
    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [activeSlide, isAboutPage, homeSlides.length, goToSlide]);

  // ── About page slides ────────────────────────────────────────────
  const aboutSlides = [
    {
      id: "about1",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
      alt: "Children reading books in a classroom",
    },
    {
      id: "about2",
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop",
      alt: "Students collaborating on robotics kits",
    },
    {
      id: "about3",
      src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1400&auto=format&fit=crop",
      alt: "Children learning in an outdoor garden",
    },
  ];

  const [aboutActiveSlide, setAboutActiveSlide] = useState(0);
  const [aboutProgress, setAboutProgress] = useState(0);
  const ABOUT_INTERVAL = 4500;

  useEffect(() => {
    if (!isAboutPage) return;
    Promise.resolve().then(() => setAboutProgress(0));
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
        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-charcoal font-heading leading-tight mb-6">
                <TextReveal mode="words">{heading}</TextReveal>
              </h1>
              <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
                {subheading}
              </p>
            </div>
            <div className="lg:col-span-6 w-full relative aspect-[1.4] rounded-lg overflow-hidden border border-forest/10 shadow-sm">
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
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              ))}
              {/* Progress dots */}
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

  // ── Home page hero ──────────────────────────────────────────────
  return (
    <>
      {/* Slide transition keyframes */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        .slide-in  { animation: slideInRight 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .slide-out { animation: slideOutLeft 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      `}</style>

      <section className="relative bg-cream" style={{ paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

          {/* Left Content Card — 50% */}
          <div
            className="relative bg-sage bg-cover bg-center border border-card-border rounded-lg overflow-hidden shadow-xs"
            style={{ 
              height: "calc(100vh - 120px)", 
              minHeight: "650px",
              backgroundImage: "url('/watercolor-bg.png')"
            }}
          >
            {/* Inner overlay card — 68% width × 80% height, perfectly centered. Static light background. */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[80%] bg-white border border-[#DDD5C8] rounded-lg z-10 flex flex-col justify-center items-center text-center p-8 lg:p-12 shadow-md overflow-hidden">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-[#0a142f]! font-heading leading-tight mb-4">
                {heading}
              </h1>
              <p className="text-sm sm:text-base text-[#0a142f]/70! leading-relaxed font-body mb-8 max-w-md mx-auto">
                {subheading}
              </p>
              <Button
                label={primaryCtaText}
                variant="primary"
                href={primaryCtaLink}
                className="bg-[#0a142f] text-white hover:bg-forest hover:text-white rounded-full px-6 py-3 font-bold transition-all duration-300 shadow-sm text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Right Carousel — 50%, same height, slide transitions */}
          <div
            className="relative w-full rounded-lg overflow-hidden border border-card-border shadow-sm"
            style={{ height: "calc(100vh - 120px)", minHeight: "650px" }}
          >
            {homeSlides.map((slide, idx) => {
              const isActive = activeSlide === idx;
              const isPrev = prevSlide === idx;
              return (
                <div
                  key={slide.id}
                  className={cn(
                    "absolute inset-0 overflow-hidden",
                    isActive && sliding ? "slide-in" : "",
                    isPrev && sliding ? "slide-out" : "",
                  )}
                  style={{
                    zIndex: isActive ? 10 : isPrev ? 9 : 0,
                    display: isActive || isPrev ? "block" : "none",
                  }}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              );
            })}

            {/* Progress-fill navigation dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
              {homeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
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
      </section>
    </>
  );
};
