import React, { useState, useEffect, useRef } from "react";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";

import tm4191Video from "../assets/images/TM4191_web.mp4";
import tm4259Video from "../assets/images/TM4259_web.mp4";
import tm4165Video from "../assets/images/TM4165_web.mp4";
import tm4182Video from "../assets/images/TM4182_web.mp4";

import beachClubImg from "../assets/images/beach_club_1780069221234.jpg";
import poolsImg from "../assets/images/resort_pools_1780069241691.jpg";
import gymImg from "../assets/images/luxury_gym_1780069258603.jpg";
import gazeboImg from "../assets/images/gazebo_bar_1780069282323.jpg";

interface VideoPlayerProps {
  url: string;
  poster: string;
  ariaLabel: string;
  className?: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  poster,
  ariaLabel,
  className = "",
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Autoplay blocked or prevented:", err);
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        preload={isActive ? "auto" : "none"}
        muted
        loop
        playsInline
        className={`${className} w-full h-full object-cover transition-transform duration-700 ease-out`}
        aria-label={ariaLabel}
        onError={() => setHasError(true)}
      />
      {/* Fallback frame handler */}
      {hasError && (
        <img
          src={poster}
          alt={ariaLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export const Precios: React.FC = () => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const galleryVideos = [
    {
      id: "video-1",
      url: tm4191Video,
      poster: gymImg, 
      label: "Vida Activa y Salud",
      desc: "Espacios verdes y diversión familiar al aire libre.",
      ariaLabel: "Video en formato vertical que muestra actividades y juego en pasto verde en el resort Aura",
    },
    {
      id: "video-2",
      url: tm4259Video,
      poster: poolsImg,
      label: "Momentos de Serenidad",
      desc: "Relajación total y disfrute junto a las albercas.",
      ariaLabel: "Video vertical que muestra una caminata hacia la piscina lujosa de Aura",
    },
    {
      id: "video-3",
      url: tm4165Video,
      poster: beachClubImg,
      label: "Descanso Premium",
      desc: "Disfrute del sol en cómodos solárium privados.",
      ariaLabel: "Video vertical que muestra otro aspecto de relajación y bienestar en Aura",
    },
    {
      id: "video-4",
      url: tm4182Video,
      poster: gazeboImg,
      label: "Brindis bajo las Palmeras",
      desc: "Conexiones únicas en el club de playa exclusivo.",
      ariaLabel: "Video vertical de momentos mágicos y de ocio bajo las palmeras",
    }
  ];

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    // Calculate scroll progress index accurately
    const index = Math.round(scrollLeft / itemWidth);
    if (index >= 0 && index < galleryVideos.length) {
      setActiveImgIndex(index);
    }
  };

  const scrollToVideo = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const children = container.children;
    if (children && children[index]) {
      const child = children[index] as HTMLElement;
      // scroll to the selected video card
      container.scrollTo({
        left: child.offsetLeft - (container.clientWidth - child.clientWidth) / 2,
        behavior: "smooth",
      });
      setActiveImgIndex(index);
    }
  };

  return (
    <section id="precios" className="bg-arena-medium py-20 md:py-32 px-6 md:px-12 relative text-carbón border-t border-arena-light/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Investment Plans */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="flex flex-col leading-tight mb-8 select-none">
              <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón" data-reveal="fade-up" data-reveal-delay="100">
                Invierta en
              </span>
              <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5" data-reveal="fade-up" data-reveal-delay="200">
                su bienestar.
              </span>
            </h2>

            <p className="font-sans font-light text-base text-carbón-light/85 leading-relaxed mb-8" data-reveal="fade-up" data-reveal-delay="280">
              Contamos con esquemas de financiamiento versátiles y opciones estructuradas para brindarle una adquisición segura en Coronado.
            </p>

            {/* Direct Options Render */}
            <div className="space-y-4 mb-8">
              {/* Option A */}
              <div className="p-5 bg-marfil border border-arena-medium/60 rounded-sm flex items-center gap-4 shadow-sm hover:shadow transition-shadow" data-reveal="fade-up" data-reveal-delay="340">
                <div className="p-3 bg-arena-medium/20 rounded-full text-carbón border border-arena-medium/50 flex-shrink-0">
                  <Landmark className="w-5 h-5 text-océano" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-carbón font-semibold">
                    Financiamientos especiales
                  </h4>
                  <p className="text-xs text-carbón-light/70 mt-0.5">Adaptados a sus necesidades de capital.</p>
                </div>
              </div>

              {/* Option B */}
              <div className="p-5 bg-marfil border border-arena-medium/60 rounded-sm flex items-center gap-4 shadow-sm hover:shadow transition-shadow" data-reveal="fade-up" data-reveal-delay="420">
                <div className="p-3 bg-arena-medium/20 rounded-full text-carbón border border-arena-medium/50 flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-océano" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-carbón font-semibold">
                    Carta promesa y pago de contado
                  </h4>
                  <p className="text-xs text-carbón-light/70 mt-0.5">Formalización vía trámites bancarios inmediatos.</p>
                </div>
              </div>
            </div>

            {/* Terms and conditions formal block */}
            <div className="border-t border-carbón/20 pt-5 flex items-start gap-3" data-reveal="fade-up" data-reveal-delay="500">
              <ShieldCheck className="w-4 h-4 text-[#4E5340] flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-carbón-light/85 tracking-wide leading-relaxed">
                <strong className="font-semibold text-carbón">Formas de pago aceptadas:</strong> Cheque bancario certificado o transferencia ACH, estructurado bajo un contrato notarial formal de compraventa.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Vertical 9:16 Video Gallery */}
          <div className="lg:col-span-8 flex flex-col justify-center w-full overflow-hidden">
            <div className="relative -mx-6 px-6 lg:mx-0 lg:px-0">
              
              {/* Scroll Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {galleryVideos.map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-[280px] xs:w-[310px] sm:w-[330px] md:w-[270px] lg:w-[245px] xl:w-[280px] flex-shrink-0 snap-center transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 block relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-arena-light bg-black"
                    data-reveal="slide-in-right"
                    data-reveal-delay={idx * 120 + 350}
                    data-reveal-duration="1100"
                  >
                    {/* Aspect control - purely 9:16 vertical ratio */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      <VideoPlayer
                        url={item.url}
                        poster={item.poster}
                        ariaLabel={item.ariaLabel}
                        className="group-hover:scale-105"
                        isActive={activeImgIndex === idx}
                      />

                      {/* Pure video loops with no overlay clutter */}
                    </div>
                  </div>
                ))}
              </div>

              {/* Position Dots Indicators */}
              <div className="flex justify-center items-center gap-2.5 mt-4">
                {galleryVideos.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToVideo(idx)}
                    title={item.label}
                    className={`h-2.5 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                      activeImgIndex === idx 
                        ? "bg-carbón w-6" 
                        : "bg-carbón/20 hover:bg-carbón/50 w-2.5"
                    }`}
                    aria-label={`Ver video ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Desktop Scroll Cue Hint */}
              <div className="hidden lg:flex justify-end pr-2 mt-2 opacity-50 hover:opacity-80 transition-opacity duration-300">
                <span className="text-[10px] font-mono uppercase tracking-widest text-carbón-light">
                  ← Deslice para explorar más →
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
