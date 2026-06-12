import React, { useState } from "react";
import { Compass, Sparkles, Navigation, Globe, Eye, Play } from "lucide-react";
import { MediaPlaceholder } from "./MediaPlaceholder";

import portadaImg from "../assets/images/frame (3).png";

export const Recorrido: React.FC = () => {
  const [showPortada, setShowPortada] = useState(true);

  return (
    <section id="recorrido" className="bg-arena-light py-20 md:py-32 px-6 md:px-12 relative overflow-hidden text-carbón border-t border-arena-medium/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          
          <h2 className="flex flex-col items-center leading-tight mb-8 select-none">
            <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón">
              Recorra
            </span>
            <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5">
              sus sueños.
            </span>
          </h2>
          
          <div className="w-12 h-px bg-carbón/30 mx-auto mb-6" />
          
          <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed max-w-xl mx-auto">
            Lo invitamos a conocer nuestra propuesta para salir de la rutina y entrar en un ambiente de naturaleza y tranquilidad. Un entorno familiar y distendido, una experiencia lejos y cerca de la ciudad.
          </p>
        </div>

        {/* Big interactive virtual tour iframe container frame */}
        <div className="max-w-5xl mx-auto relative group bg-marfil rounded overflow-hidden border border-arena-medium/55">
          <div className="relative h-[450px] sm:h-[600px] w-full">
            <iframe
              src="/tour/index.html"
              title="AURA Coronado - Recorrido Virtual 360"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen
              loading="lazy"
            />

            {/* Portada Cover Image Layer overlay */}
            <div
              id="portada"
              onClick={() => setShowPortada(false)}
              className="absolute inset-0 z-30 cursor-pointer flex items-center justify-center transition-all duration-300 ease-out"
              style={{ display: showPortada ? "flex" : "none" }}
            >
              <img
                src={portadaImg}
                alt="Vista previa del recorrido virtual"
                className="absolute inset-0 w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Opacity overlay (25%) */}
              <div className="absolute inset-0 bg-black/25 hover:bg-black/20 transition-colors duration-300 z-10" />

              {/* Sutil play button */}
              <button
                id="btn-portada-play"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPortada(false);
                }}
                className="relative z-20 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 hover:bg-white text-[#73634c] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#73634c]/10 cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label="Reproducir video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#73634c] stroke-[#73634c] translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
