"use client";

import React from "react";

interface ParallaxBannerProps {
  imageSrc: string;
  label?: string;
  height?: string;
}

export const ParallaxBanner: React.FC<ParallaxBannerProps> = ({
  imageSrc,
  label = "Parallax section",
  height = "45vh",
}) => (
  <div
    role="img"
    aria-label={label}
    className="relative w-full overflow-hidden"
    style={{ height }}
  >
    {/* ── Fixed background image ── */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("${imageSrc}")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    />

    {/* ── Vignette: dark edges, bright centre ── */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
      }}
    />

    {/* ── Top fade — blends into the section above ── */}
    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

    {/* ── Bottom fade — blends into the section below ── */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

    {/* ── Subtle film grain ── */}
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  </div>
);

// Convenience export for the first banner (after Our Focus)
export const ImageExpansionStory: React.FC = () => (
  <ParallaxBanner
    imageSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop"
    label="Children collaborating in a classroom"
  />
);

export default ImageExpansionStory;
