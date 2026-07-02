"use client";

import React from "react";

export const StoryBackground: React.FC = () => {
  return (
    <div 
      className="story-bg-layer absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 bg-[#FAF9F5]"
    >
      {/* 1) Subtle Grain/Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2) Ambient Light Glow Sweeps */}
      <div 
        className="story-bg-glow absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[120px] will-change-transform"
      />

      {/* 3) Floating SVG Line art */}
      <div className="story-bg-svg absolute right-[8%] bottom-[10%] w-[350px] h-[350px] text-forest/5 select-none will-change-transform">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7 9.5V22h6v-.5c4-1.5 7-5 7-9.5 0-5.5-4.5-10-10-10z M12 22V12c0-3 3-5 6-5 M12 16c0-3-3-5-6-5" />
        </svg>
      </div>
    </div>
  );
};
export default StoryBackground;
