import React from "react";
import heroPoster from "../assets/images/drone-frame.jpg";
import { motion } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onScrollDown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  return (
    <section id="hero-sec" className="relative h-screen w-full flex items-center justify-center bg-carbón text-marfil overflow-hidden animate-fade-in">
      
      {/* Absolute Full-bleed Media Video Placement */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          className="w-full h-full object-cover select-none"
          data-parallax
          data-parallax-scale="true"
        >
          {/* Priority 1: User requested video drone4k.mp4 */}
          <source src="/drone4k.mp4" type="video/mp4" />
          {/* Priority 2: Alternate local fallbacks */}
          {/* Priority 3: Exquisite tropical ocean drone video external fallback */}
        </video>
        
        {/* Dark elegant scrim overlays to ensure typographic contrast */}
       <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      </div>

      {/* Hero Contenidos */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center justify-center h-full" data-reveal="fade-up" data-reveal-duration="1500" data-reveal-delay="200">
        <div className="flex flex-col items-center justify-center">
          {/* Centered Luxury Logo Image */}
          <img
            src="/logo.png"
            alt="AURA Coronado"
            className="max-w-[240px] sm:max-w-[340px] md:max-w-[420px] h-auto object-contain select-none animate-fade-in"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Animated scroll down indicator */}
      <div
        onClick={onScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-1.5 select-none"
        data-reveal="fade-up"
        data-reveal-delay="800"
        data-reveal-duration="1000"
      >
        <ChevronDown className="w-6 h-6 text-arena-medium animate-bounce stroke-[1.2]" />
      </div>
    </section>
  );
};
