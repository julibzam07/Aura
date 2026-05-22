import React, { useState } from "react";
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

export const Amenidades: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const amenitiesList = [
    "Acceso al Beach Club",
    "Piscinas para adultos",
    "Piscina para niños",
    "Canchas multiusos",
    "Gazebo general con bar",
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
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    },
    { 
      id: "pools", 
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    },
    { 
      id: "gym", 
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    },
    { 
      id: "gazebo", 
      url: "https://images.unsplash.com/photo-1563189914-ee364338f74e?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="amenidades" className="bg-black py-20 md:py-32 px-6 md:px-12 relative text-white border-t border-arena-medium/10">
      <div className="max-w-7xl mx-auto">
        
         {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 md:mb-24">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-5xl font-light tracking-tight text-marfil leading-tight">
              El mar se encuentra con la arena.
              <br />
              <span className="italic font-normal text-arena-medium">El lujo, con el confort.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-6 lg:pt-8 bg-transparent">
            <p className="font-sans font-light text-sm md:text-base text-marfil/75 leading-relaxed">
              Nuestras amenidades son de uso exclusivo para futuros residentes. Contamos con dos áreas destinadas a tal propósito: una enfocada en el bienestar y la recreación activa, que incorpora canchas deportivas, área de juegos para niños, jardines y espacios para mascotas; y una segunda zona de descanso con piscina, concebida para el disfrute y distensión en un entorno familiar. Queremos que su estancia se convierta en el paraíso y su vida en una experiencia.
            </p>
          </div>
        </div>

        {/* List & Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Checklists */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans font-medium text-xs tracking-widest text-[#7C8578] uppercase mb-6">
              Amenidades exclusivas como:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {amenitiesList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-arena-medium/15 bg-[#0B0D0D] transition-all duration-300 flex items-center gap-3.5 rounded-sm hover:border-arena-medium/30"
                >
                  <div className="p-1.5 bg-black rounded-full border border-arena-medium/20 text-arena-medium flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-sans text-xs md:text-sm text-marfil/90 tracking-wide">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Interactive Showcase Gallery (Navigation Carousel & Grid switcher) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div />
              
              {/* Image Indicators */}
              <div className="flex items-center gap-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-8 h-1.5 transition-all rounded-full ${
                      activeImageIndex === index
                        ? "bg-arena-medium w-10"
                        : "bg-carbón hover:bg-arena-medium/50"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* main slider frame */}
            <div className="relative overflow-hidden rounded bg-black aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-2xl group border border-arena-medium/15">
              
              {/* Slide image with Framer Motion transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0.15, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.15, scale: 0.99 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={galleryImages[activeImageIndex].url}
                    alt="Amenidad"
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slider Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil opacity-0 group-hover:opacity-100 cursor-pointer shadow border border-marfil/5"
                aria-label="Imagen anterior"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil opacity-0 group-hover:opacity-100 cursor-pointer shadow border border-marfil/5"
                aria-label="Siguiente imagen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>

            {/* Thumbnail Selection List */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {galleryImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-[16/10] overflow-hidden rounded-sm transition-all border duration-300 ${
                    activeImageIndex === index
                      ? "border-arena-medium ring-2 ring-arena-medium/20 scale-[0.98]"
                      : "border-arena-medium/25 hover:border-arena-medium opacity-65 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt="Miniatura de amenidad"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-transparent hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
