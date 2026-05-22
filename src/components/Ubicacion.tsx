import React from "react";
import { MapPin, Compass } from "lucide-react";

export const Ubicacion: React.FC = () => {
  return (
    <section id="ubicacion" className="bg-black py-20 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-arena-medium/10 text-white">
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none -mr-16 -mb-16 select-none">
        <Compass className="w-[500px] h-[500px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Location Description */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
              Ubicación: lejos y
              <br />
              <span className="italic font-normal text-arena-medium">cerca de todo.</span>
            </h2>

            <div className="h-px w-12 bg-arena-medium/50 mb-6" />

            <div className="font-sans font-light text-sm md:text-base text-marfil/80 leading-relaxed mb-8 space-y-4">
              <p>
                Coronado es la playa más desarrollada cerca de la ciudad de Panamá y, sin embargo, es un lugar retirado, ideal para encontrar paz, tranquilidad y desconectarse del mundo.
              </p>
              <p>
                Aquí el balance entre comodidad y naturaleza se proyecta en paisajes verdes, mar y facilidades que uno pensaría que sólo se encuentran en la ciudad: plazas comerciales, hospital, escuelas, centros comerciales y hasta una pista de aterrizaje.
              </p>
            </div>

            {/* Address Details with solid border box */}
            <div className="p-6 bg-[#0B0D0D] border border-arena-medium/15 rounded-sm mb-6 flex gap-4 items-start shadow-sm">
              <MapPin className="w-5 h-5 text-arena-medium flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-xs text-marfil tracking-wider uppercase">
                  DIRECCIÓN RESIDENCIAL
                </h4>
                <p className="font-serif text-base text-marfil/90 mt-1">
                  Ave Boulevard, PH Paradise Point Coronado, Nueva Gorgona, Panamá.
                </p>
                <p className="text-[10px] text-arena-medium font-sans tracking-wide mt-1.5 uppercase font-semibold">
                  A solo 1 hora y 15 minutos de la Ciudad de Panamá.
                </p>
              </div>
            </div>

            {/* Waze routing button */}
            <div className="mt-2">
              <a
                href="https://waze.com/ul/hd1x0wk17g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-arena-medium text-black text-xs font-semibold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded shadow"
              >
                <Compass className="w-4 h-4 text-black" />
                Conducir hacia allí
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps iFrame */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            <div className="relative w-full h-[450px] shadow-2xl rounded overflow-hidden bg-black border border-arena-medium/15">
              
              <iframe
                title="Aura Coronado - Google Maps Location Locator"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.729177265916!2d-79.85419!3d8.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjYnMjYuOCJOIDc5wrA1MScxNS4xIlc!5e0!3m2!1ses!2spa!4v1716382500000!5m2!1ses!2spa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
