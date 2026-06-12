import React from "react";
import { MapPin, Compass } from "lucide-react";

export const Ubicacion: React.FC = () => {
  return (
    <section id="ubicacion" className="bg-arena-light py-20 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-arena-medium/40 text-carbón">
      <div className="absolute right-0 bottom-0 opacity-[0.07] text-[#73634c] pointer-events-none -mr-16 -mb-16 select-none">
        <Compass className="w-[500px] h-[500px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Location Description */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">

            <h2 className="flex flex-col leading-tight mb-8 select-none">
              <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón">
                Ubicación: lejos y
              </span>
              <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5">
                cerca de todo.
              </span>
            </h2>

            <div className="h-px w-12 bg-carbón/30 mb-6" />

            <div className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed mb-8 space-y-4">
              <p>
                Coronado es la playa más desarrollada cerca de la ciudad de Panamá y, sin embargo, es un lugar retirado, ideal para encontrar paz, tranquilidad y desconectarse del mundo.
              </p>
              <p>
                Aquí el balance entre comodidad y naturaleza se proyecta en paisajes verdes, mar y facilidades que uno pensaría que sólo se encuentran en la ciudad: plazas comerciales, hospital, escuelas, centros comerciales y hasta una pista de aterrizaje.
              </p>
            </div>

            {/* Address Details with solid border box */}
            <div className="p-6 bg-marfil border border-arena-medium/60 rounded-sm mb-6 flex gap-4 items-start shadow-sm">
              <MapPin className="w-5 h-5 text-carbón flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-xs text-carbón tracking-wider uppercase">
                  DIRECCIÓN RESIDENCIAL
                </h4>
                <p className="font-serif text-base text-carbón-light/90 mt-1">
                  Ave Boulevard, PH Paradise Point Coronado, Nueva Gorgona, Panamá.
                </p>
                <p className="text-[10px] text-carbón/60 font-mono tracking-wide mt-1.5 uppercase font-bold">
                  A solo 1 hora y 15 minutos de la Ciudad de Panamá.
                </p>
              </div>
            </div>

            {/* Waze routing button replaced by official Waze logo */}
            <div className="mt-6 flex">
              <a
                href="https://waze.com/ul/hd1x0wk17g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3.5 bg-marfil border border-arena-medium/60 rounded hover:border-carbón/30 hover:bg-marfil/90 transition-all duration-300 shadow group"
                title="Abrir en Waze"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 fill-[#33CCFF] group-hover:scale-105 transition-transform duration-300"
                >
                  <title>Waze</title>
                  <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps iFrame */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full h-[450px] shadow-xl rounded overflow-hidden bg-marfil border border-arena-medium/60">
              
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
