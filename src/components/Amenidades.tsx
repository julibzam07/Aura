import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MediaPlaceholder } from "./MediaPlaceholder";
import {
  Waves,
  Sparkles,
  ShieldCheck,
  Dumbbell,
  Users,
  Wine,
  Flame,
  Award,
  Trees,
  CheckCircle2,
  Maximize2
} from "lucide-react";

import beachClubImg from "../assets/images/beach_club_1780069221234.jpg";
import poolsImg from "../assets/images/resort_pools_1780069241691.jpg";
import gymImg from "../assets/images/luxury_gym_1780069258603.jpg";
import gazeboImg from "../assets/images/gazebo_bar_1780069282323.jpg";

export const Amenidades: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Media query to check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // IntersectionObserver to set will-change dynamically
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      observer.unobserve(container);
    };
  }, []);

  const amenitiesList = [
    "Acceso al Beach Club",
    "Piscinas para adultos",
    "Piscina para niños",
    "Canchas multiusos",
    "Gazebo general con bar y área de BBQ",
    "Solarium",
    "Parque recreacional",
    "Dog-park",
    "Salón de eventos",
    "Salas de estar",
    "Gimnasio",
    "Seguridad 24hs"
  ];

  const galleryImages = [
    { 
      id: "beach-club", 
      url: beachClubImg,
    },
    { 
      id: "pools", 
      url: poolsImg,
    },
    { 
      id: "gym", 
      url: gymImg,
    },
    { 
      id: "gazebo", 
      url: gazeboImg,
    }
  ];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section 
      id="amenidades" 
      ref={containerRef} 
      className="bg-[#FAF7F0] py-20 md:py-32 px-6 md:px-12 relative text-carbón border-t border-arena-medium/40 overflow-hidden"
    >
      {/* 
        MAIN GRID CONTAINER:
        Using a custom 2-column layout on large screens (38% left column, 62% right column) 
        and items-stretch to align top and bottom matches. 
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3.8fr_6.2fr] gap-12 lg:gap-16 items-stretch relative">
        
        {/* LEFT COLUMN: Text content block with staggered animation entry */}
        <div className="flex flex-col justify-between py-2 z-20">
          {/* Main vertical content flow */}
          <div className="flex flex-col">
            {/* Title block adhering to Montserrat styling rules */}
            <h2 className="flex flex-col leading-tight select-none mb-6">
              <span className="font-sans font-normal text-3xl sm:text-4xl md:text-[42px] tracking-tight text-carbón" data-reveal="fade-up">
                El mar se encuentra con la arena.
              </span>
              <span className="font-sans font-light italic text-2xl sm:text-3xl md:text-[34px] tracking-normal text-carbón/60 mt-2" data-reveal="fade-up" data-reveal-delay="150">
                El lujo, con el confort.
              </span>
            </h2>

            {/* Narrow body paragraph with high-contrast text */}
            <p className="font-sans font-light text-sm md:text-[15px] text-carbón-light/80 leading-relaxed max-w-md" data-reveal="fade-up" data-reveal-duration="600" data-reveal-delay="300">
              Nuestras amenidades son de uso exclusivo para futuros residentes. Contamos con dos áreas destinadas a tal propósito: una enfocada en el bienestar y la recreación activa, que incorpora canchas deportivas, área de juegos para niños, jardines "y espacios para mascotas; y una segunda zona de descanso con piscina, solarium" y extensas áreas ajardinadas, que fortalecen la conexión con la naturaleza y la vida al aire libre, pensando siempre en el disfrute y la distensión en un entorno familiar. Queremos que su estancia se convierta en el paraíso y su vida en una experiencia.
            </p>

            {/* Separator Line (40px wide, color of mark Brand at 30% opac) */}
            <div 
              className="w-10 h-[2px] bg-[#73634c]/30 my-8 md:my-10"
              data-reveal="fade-up"
              data-reveal-delay="350"
            />

            {/* Capitalized Section Label */}
            <h3 className="font-sans font-semibold text-2xs md:text-xs tracking-widest text-[#73634c] uppercase mb-5 select-none" data-reveal="fade-up" data-reveal-delay="400">
              AMENIDADES EXCLUSIVAS COMO:
            </h3>

            {/* 
              INTERLOCKING BULLETS CONTAINER:
              Renders 12 items in 2 columns of 6. Overlaps the right video/image slider 
              by 64px on desktop with high-contrast background blur.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 lg:-mr-16 lg:pr-6 lg:pl-1 lg:py-5 lg:bg-[#FAF7F0]/90 lg:backdrop-blur-sm lg:rounded-r-xl relative z-30">
              {amenitiesList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 py-0.5 group transition-colors duration-200"
                  data-reveal="fade-up"
                  data-reveal-delay={450 + index * 60}
                  data-reveal-duration="500"
                >
                  <span className="text-[#73634c] text-xs select-none group-hover:text-carbón transition-colors font-semibold">
                    —
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-carbón-light/95 group-hover:text-carbón font-medium transition-colors tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 
          RIGHT COLUMN: Cinema-grade Interactive Full-Bleed Slider with automatic baseline match 
          Extends completely to the right edge of the viewport.
        */}
        <div 
          className="lg:col-span-1 relative h-[56vh] lg:h-auto min-h-[350px] lg:min-h-0 overflow-hidden lg:-mr-[calc((100vw-min(100vw,1280px))/2+48px)] lg:rounded-l-3xl shadow-2xl group bg-[#161817]"
          data-reveal="slide-in-right"
          data-reveal-duration="1200"
        >
          {/* Framer motion transition slide wrapper */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                src={galleryImages[activeImageIndex].url}
                alt="Amenidad Exclusiva de Aura"
                initial={{ scale: 1 }}
                animate={!shouldReduceMotion ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className={`w-full h-full object-cover select-none ${
                  isInViewport ? "will-change-transform" : ""
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Overlay Gradient built for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* SUTTLE ARROWS NAVEGATION: Minimal cost-effective overlay (appears on hover) */}
          <button
            onClick={handlePrevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/35 backdrop-blur-md hover:bg-[#73634c] text-white transition-all rounded-full flex items-center justify-center z-25 opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg border border-white/10"
            aria-label="Imagen anterior de amenidad"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/35 backdrop-blur-md hover:bg-[#73634c] text-white transition-all rounded-full flex items-center justify-center z-25 opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg border border-white/10"
            aria-label="Siguiente imagen de amenidad"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 
            DOTS INDICATORS: 
            Sleek minimalist circles placed elegantly at the bottom-left inside the image space.
          */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 z-25 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 shadow-lg">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-2.5 h-2.5 transition-all rounded-full ${
                  activeImageIndex === index
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
