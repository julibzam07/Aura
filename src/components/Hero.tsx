import React from "react";
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
          className="w-full h-full object-cover select-none"
        >
          {/* Priority 1: User requested video drone4k.mp4 */}
          <source src="/drone4k.mp4" type="video/mp4" />
          {/* Priority 2: Alternate local fallbacks */}
          <source src="/video_hero.mp4" type="video/mp4" />
          <source src="/hero.mp4" type="video/mp4" />
          {/* Priority 3: Exquisite tropical ocean drone video external fallback */}
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0548a7d433230c24d50013028cf5603&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Dark elegant scrim overlays to ensure typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]" />
      </div>

      {/* Hero Contenidos */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Centered Luxury Logo Image */}
          <img
            src="/logo.png"
            alt="AURA Coronado"
            className="max-w-[240px] sm:max-w-[340px] md:max-w-[420px] h-auto object-contain select-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Animated scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
        onClick={onScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-1.5 select-none"
      >
        <ChevronDown className="w-6 h-6 text-arena-medium animate-bounce stroke-[1.2]" />
      </motion.div>
    </section>
  );
};
