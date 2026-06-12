import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, Play, Pause, Volume2, VolumeX } from "lucide-react";
import videoPoster from "../assets/images/modelos/16_FACHADAS_HILERA.jpg";

export const Diseno: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="diseno" className="bg-arena-medium py-20 md:py-32 px-6 md:px-12 relative border-t border-arena-light/20 text-carbón">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Descriptive Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <h2 className="flex flex-col leading-tight mb-8 select-none">
              <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón">
                Todos los detalles.
              </span>
              <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5">
                El detalle.
              </span>
            </h2>

            <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed">
              El proyecto está conformado por <strong className="font-semibold text-carbón">43 residencias de dos niveles</strong>, diseñadas con amplios espacios familiares que incluyen <strong className="font-semibold text-carbón">4 habitaciones, 3 baños, sala, comedor, cocina y lavandería</strong>.
            </p>
          </div>

          {/* Right Column: Prominent Animated Render Video with custom interaction */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#73634c]/10 bg-[#121514] shadow-2xl group">
              <video
                ref={videoRef}
                src="/render_video.mp4"
                poster={videoPoster}
                preload="metadata"
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover select-none transition-transform duration-500"
                aria-label="Video rendering interactivo de Aura"
              />
              
              {/* Minimalist interactive control overlay on hover / touch */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                
                {/* Central Play/Pause Toggle Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <button 
                    onClick={togglePlay}
                    className="p-4 bg-[#73634c]/85 hover:bg-[#73634c] backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 stroke-[1.5] fill-white/10" />
                    ) : (
                      <Play className="w-6 h-6 stroke-[1.5] fill-white" />
                    )}
                  </button>
                </div>

                {/* Bottom Bar: Mute button */}
                <div className="flex justify-end items-center">
                  {/* Speaker Mute Control */}
                  <button
                    onClick={toggleMute}
                    className="p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-[#e8dfd3] border border-white/10 transition-colors shadow-md cursor-pointer"
                    aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Architectural Quote Box - Elegant, full width single column style */}
        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className="relative border-l-2 border-[#73634c]/60 bg-marfil p-8 md:p-12 rounded-r-lg shadow-sm overflow-hidden md:overflow-visible">
            {/* Opening quote accent mark */}
            <span className="absolute -left-3 md:-left-6 top-2 md:top-4 text-7xl md:text-8xl font-serif text-[#73634c]/25 select-none pointer-events-none">
              “
            </span>
            {/* Closing quote accent mark */}
            <span className="absolute right-4 bottom-14 md:bottom-12 text-7xl md:text-8xl font-serif text-[#73634c]/25 select-none pointer-events-none">
              ”
            </span>
            
            <div className="font-serif italic text-sm md:text-base text-carbón-light/80 leading-relaxed mb-6 space-y-4 relative z-10 pl-2">
              <p>
                El proyecto ha sido cuidadosamente diseñado para ofrecer una experiencia residencial relajada, elegante y funcional, enfocada en el bienestar y la conexión con lo natural, utilizando líneas limpias, proporciones modernas y una paleta de materiales cálidos y naturales que evocan la serenidad propia del entorno.
              </p>
              <p>
                Cada unidad ha sido diseñada para maximizar la iluminación natural, la ventilación cruzada y la integración visual con las áreas verdes y espacios exteriores.
              </p>
              <p>
                El masterplan prioriza la escala humana, la privacidad y el paisaje, generando calles internas arboladas, espacios abiertos y una atmósfera residencial sofisticada y, al mismo tiempo, acogedora. Cada elemento del proyecto ha sido pensado para crear un balance entre arquitectura, confort y naturaleza.
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10 pl-2">
              <div className="w-10 h-10 rounded-full bg-black text-marfil flex items-center justify-center font-serif text-xs border border-arena-medium/20">
                JGM
              </div>
              <div>
                <h5 className="font-sans font-semibold text-xs text-carbón leading-none tracking-wider">
                  Arq. Joseph Gazal Michaan
                </h5>
                <p className="text-[10px] font-sans tracking-wide text-carbón/60 uppercase mt-1">
                  Director Asociado, CGO
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
