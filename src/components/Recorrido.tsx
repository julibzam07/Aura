import React, { useState } from "react";
import { Compass, Sparkles, Navigation, Globe, Eye } from "lucide-react";
import { MediaPlaceholder } from "./MediaPlaceholder";

export const Recorrido: React.FC = () => {
  return (
    <section id="recorrido" className="bg-black py-20 md:py-32 px-6 md:px-12 relative overflow-hidden text-white border-t border-arena-medium/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
            Recorra sus sueños.
          </h2>
          
          <div className="w-12 h-px bg-arena-medium/70 mx-auto mb-6" />
          
          <p className="font-sans font-light text-sm md:text-base text-marfil/75 leading-relaxed max-w-xl mx-auto">
            Lo invitamos a conocer nuestra propuesta para salir de la rutina y entrar en un ambiente de naturaleza y tranquilidad. Un entorno familiar y tranquilo, una experiencia lejos y cerca de la ciudad.
          </p>
        </div>

        {/* Big interactive virtual tour iframe container frame */}
        <div className="max-w-5xl mx-auto relative group shadow-2xl bg-[#0B0D0D] rounded overflow-hidden border border-arena-medium/15">
          <div className="relative h-[450px] sm:h-[600px] w-full">
            <iframe
              src="/tour/index.html"
              title="AURA Coronado - Recorrido Virtual 360"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
