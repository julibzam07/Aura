import React, { useState } from "react";
import { motion } from "motion/react";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { Quote, Sparkles, Building } from "lucide-react";

import planoBaja from "../assets/images/regenerated_image_1780067019915.jpg";
import planoAlta from "../assets/images/regenerated_image_1780067025086.jpg";
import elevation from "../assets/images/regenerated_image_1780067266361.jpg";
import poolDeck from "../assets/images/regenerated_image_1780067269535.jpg";

export const Diseno: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"video" | "plano">("plano");

  return (
    <section id="diseno" className="bg-arena-medium py-20 md:py-32 px-6 md:px-12 relative border-t border-arena-light/20 text-carbón">
      {/* Decorative side badge */}
      <div className="absolute right-6 top-10 transform rotate-90 origin-right text-[10px] tracking-[0.4em] text-carbón/20 uppercase hidden xl:block">
        ARCHITECTURAL METRICS
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Descriptive Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-carbón leading-tight mb-6">
              Todos los detalles.
              <br />
              <span className="italic font-normal text-carbón/80">El detalle.</span>
            </h2>

            <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed">
              El proyecto está conformado por <strong className="font-semibold text-carbón">44 residencias de dos niveles</strong>, diseñadas con amplios espacios familiares que integran con armonía y fluidez cada metro cuadrado. Su diseño contempla <strong className="font-semibold text-carbón">4 habitaciones, 3 baños, amplia sala, comedor, cocina y lavandería</strong>.
            </p>
          </div>

          {/* Right Column: Architectural Plano & Video Tabbed Interactive Frame */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Section Mode Toggle Tabs */}
            <div className="flex gap-4 mb-6 z-10">
              <button
                onClick={() => setActiveTab("plano")}
                className={`pb-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer relative ${
                  activeTab === "plano"
                    ? "text-carbón border-b-2 border-carbón font-bold"
                    : "text-carbón/60 hover:text-carbón/90"
                }`}
              >
                Planos Técnicos
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`pb-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer relative ${
                  activeTab === "video"
                    ? "text-carbón border-b-2 border-carbón font-bold"
                    : "text-carbón/60 hover:text-carbón/90"
                }`}
              >
                Renders y Video
              </button>
            </div>

            {/* Asymmetric Interactive Frames */}
            <div className="relative flex-1">
              {activeTab === "video" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="shadow-xl rounded overflow-hidden h-full min-h-[420px]"
                >
                  <MediaPlaceholder
                    type="video-architect"
                    label="VISTA ARQUITECTO INTERVIEW & ANIMATED RENDER"
                    sublabel="Comentarios del Director de Diseño sobre Paradise Point Coronado II"
                    height="h-full min-h-[420px]"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-3"
                >
                  {/* Horizontal Scrolling Blueprint Carousel */}
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-track-arena-light scrollbar-thumb-carbón/30">
                    
                    {/* Blueprint Card 1: Planta Baja */}
                    <div className="min-w-[280px] sm:min-w-[420px] bg-marfil border border-arena-medium/60 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[340px]">
                      <div className="flex items-center justify-between border-b border-arena-medium/20 pb-3 mb-4">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#73634c] font-bold uppercase">Plano 01</span>
                          <h4 className="font-serif text-base text-carbón font-semibold mt-0.5">Planta Baja</h4>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center bg-arena-light border border-dashed border-arena-medium/60 rounded p-1 relative overflow-hidden">
                        <img
                          src={planoBaja}
                          alt="Planta Baja"
                          className="w-full h-full max-h-[220px] object-contain relative z-10 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Blueprint Card 2: Planta Alta */}
                    <div className="min-w-[280px] sm:min-w-[420px] bg-marfil border border-arena-medium/60 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[340px]">
                      <div className="flex items-center justify-between border-b border-arena-medium/20 pb-3 mb-4">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#73634c] font-bold uppercase">Plano 02</span>
                          <h4 className="font-serif text-base text-carbón font-semibold mt-0.5">Planta Alta</h4>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center bg-arena-light border border-dashed border-arena-medium/60 rounded p-1 relative overflow-hidden">
                        <img
                          src={planoAlta}
                          alt="Planta Alta"
                          className="w-full h-full max-h-[220px] object-contain relative z-10 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Blueprint Card 3: Elevación Lateral / Sección */}
                    <div className="min-w-[280px] sm:min-w-[420px] bg-marfil border border-arena-medium/60 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[340px]">
                      <div className="flex items-center justify-between border-b border-arena-medium/20 pb-3 mb-4">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#73634c] font-bold uppercase">Plano 03</span>
                          <h4 className="font-serif text-base text-carbón font-semibold mt-0.5">Planta Baja</h4>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center bg-arena-light border border-dashed border-arena-medium/60 rounded p-1 relative overflow-hidden">
                        <img
                          src={elevation}
                          alt="Planta Baja"
                          className="w-full h-full max-h-[220px] object-contain relative z-10 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Blueprint Card 4: Detalle Personalizado */}
                    <div className="min-w-[280px] sm:min-w-[420px] bg-marfil border border-arena-medium/60 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[340px]">
                      <div className="flex items-center justify-between border-b border-arena-medium/20 pb-3 mb-4">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#73634c] font-bold uppercase">Plano 04</span>
                          <h4 className="font-serif text-base text-carbón font-semibold mt-0.5">Planta Alta</h4>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center bg-arena-light border border-dashed border-arena-medium/60 rounded p-1 relative overflow-hidden">
                        <img
                          src={poolDeck}
                          alt="Planta Alta"
                          className="w-full h-full max-h-[220px] object-contain relative z-10 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                  </div>
                  
                  {/* Visual horizontal scroll indicator guide */}
                  <div className="text-center sm:text-left text-[10px] font-mono text-carbón flex items-center justify-start gap-2 mt-1">
                    <span className="inline-block w-4 h-0.5 bg-carbón/40 animate-pulse" />
                    <span className="font-semibold uppercase tracking-wider">DESPLAZAR LATERALMENTE PARA VER TODOS LOS PLANOS DEL DISEÑO</span>
                    <span className="inline-block w-4 h-0.5 bg-carbón/40 animate-pulse" />
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </div>

        {/* Architectural Quote Box - Elegant, full width single column style */}
        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className="relative border-l-2 border-carbón bg-marfil p-6 md:p-8 rounded-r-lg shadow-sm">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-carbón/10 pointer-events-none" />
            <div className="font-serif italic text-sm md:text-base text-carbón-light/80 leading-relaxed mb-6 space-y-4">
              <p>
                "El proyecto ha sido cuidadosamente diseñado para ofrecer una experiencia residencial relajada, elegante y funcional, enfocada en el bienestar y la conexión con lo natural, utilizando líneas limpias, proporciones modernas y una paleta de materiales cálidos y naturales que evocan la serenidad propia del entorno.
              </p>
              <p>
                Cada unidad ha sido diseñada para maximizar la iluminación natural, la ventilación cruzada y la integración visual con las áreas verdes y espacios exteriores.
              </p>
              <p>
                El masterplan prioriza la escala humana, la privacidad y el paisaje, generando calles internas arboladas, espacios abiertos y una atmósfera residencial sofisticada y, al mismo tiempo, acogedora. Cada elemento del proyecto ha sido pensado para crear un balance entre arquitectura, confort y naturaleza."
              </p>
            </div>
            <div className="flex items-center gap-3">
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
