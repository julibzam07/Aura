import React, { useState } from "react";
import { motion } from "motion/react";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { Quote, Sparkles, Building } from "lucide-react";

export const Diseno: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"video" | "plano">("plano");

  return (
    <section id="diseno" className="bg-[#0B0D0D] py-20 md:py-32 px-6 md:px-12 relative border-t border-arena-medium/10 text-white">
      {/* Decorative side badge */}
      <div className="absolute right-6 top-10 transform rotate-90 origin-right text-[10px] tracking-[0.4em] text-arena-medium/30 uppercase hidden xl:block">
        ARCHITECTURAL METRICS
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
        
        {/* Left Column: Descriptive Text & Architect Quote */}
        <div className="lg:col-span-5 flex flex-col justify-center">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
            Todos los detalles.
            <br />
            <span className="italic font-normal text-arena-medium">El detalle.</span>
          </h2>

          <p className="font-sans font-light text-sm md:text-base text-marfil/80 leading-relaxed mb-10">
            El proyecto está conformado por <strong className="font-medium text-marfil">44 residencias de dos niveles</strong>, diseñadas con amplios espacios familiares que integran con armonía y fluidez cada metro cuadrado. Su diseño contempla <strong className="font-medium text-marfil">4 habitaciones, 3 baños, amplia sala, comedor, cocina vanguardista y lavandería equipada</strong>. Un espacio concebido para coexistir con el entorno marino.
          </p>

          {/* Architectural Quote Box */}
          <div className="relative border-l-2 border-arena-medium bg-[#141616] p-6 md:p-8 rounded-r-lg shadow-sm">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-arena-medium/20 pointer-events-none" />
            <p className="font-serif italic text-sm md:text-base text-marfil/70 leading-relaxed mb-6">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-marfil flex items-center justify-center font-serif text-xs border border-arena-medium/20">
                JGM
              </div>
              <div>
                <h5 className="font-sans font-semibold text-xs text-marfil leading-none tracking-wider">
                  Arq. Joseph Gazal Michaan
                </h5>
                <p className="text-[10px] font-sans tracking-wide text-arena-medium uppercase mt-1">
                  Director Asociado, CGO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Plano & Video Tabbed Interactive Frame */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          
          {/* Section Mode Toggle Tabs */}
          <div className="flex gap-4 mb-6 z-10">
            <button
              onClick={() => setActiveTab("plano")}
              className={`pb-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer relative ${
                activeTab === "plano"
                  ? "text-arena-medium border-b-2 border-arena-medium"
                  : "text-marfil/45 hover:text-marfil/75"
              }`}
            >
              Planos Técnicos
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`pb-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer relative ${
                activeTab === "video"
                  ? "text-arena-medium border-b-2 border-arena-medium"
                  : "text-marfil/45 hover:text-marfil/75"
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
                className="h-full min-h-[450px] flex flex-col justify-between"
              >
                {/* Horizontal Scrolling Blueprint Carousel */}
                <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-track-carbón scrollbar-thumb-arena-medium">
                  
                  {/* Blueprint Card 1: Planta Baja */}
                  <div className="min-w-[280px] sm:min-w-[420px] bg-[#141616] border border-arena-medium/20 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[400px]">
                    <div className="flex items-center justify-between border-b border-arena-medium/10 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-arena-medium/60 uppercase">PLANO 01 // ESQUEMA DE DISTRIBUCIÓN</span>
                        <h4 className="font-serif text-base text-marfil font-medium mt-0.5">Planta Baja</h4>
                      </div>
                      <span className="text-[10px] font-mono text-arena-medium font-semibold">160 m² Cubiertos</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-[#1D1F20] border border-dashed border-arena-medium/10 rounded p-4 relative mb-4 overflow-hidden">
                      {/* Blueprint Grid Vector Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE6DD_1px,transparent_1px),linear-gradient(to_bottom,#EAE6DD_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                      
                      {/* Minimalist SVG Architect outline representation */}
                      <svg className="w-full h-full max-h-[180px] text-arena-medium/60 relative z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="15" width="170" height="90" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="85" y1="15" x2="85" y2="105" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="135" y1="15" x2="135" y2="105" stroke="currentColor" strokeWidth="1" />
                        {/* Living area wall */}
                        <rect x="25" y="25" width="50" height="70" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <text x="50" y="60" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle" className="font-semibold">SALA / ACCESO</text>
                        {/* Kitchen details */}
                        <circle cx="107" cy="40" r="10" stroke="currentColor" strokeWidth="1" />
                        <text x="110" y="65" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle">COCINA</text>
                        {/* Bath details */}
                        <rect x="145" y="25" width="30" height="30" stroke="currentColor" strokeWidth="1" />
                        <text x="160" y="42" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="middle">BAÑO</text>
                        {/* Terrace */}
                        <line x1="145" y1="75" x2="185" y2="75" stroke="currentColor" strokeWidth="1.2" />
                        <text x="162" y="88" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle">TERRAZA</text>
                        {/* Compass North needle */}
                        <path d="M190 20 L195 35 L190 30 L185 35 Z" fill="currentColor" />
                        <text x="190" y="15" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="middle">N</text>
                      </svg>
                    </div>

                    <div className="border-t border-arena-medium/10 pt-3 flex justify-between text-[10px] font-mono text-marfil/50">
                      <span>ESCALA: 1:100</span>
                      <span>INCLUYE: COCINA GOURMET, LAVANDERÍA</span>
                    </div>
                  </div>

                  {/* Blueprint Card 2: Planta Alta */}
                  <div className="min-w-[280px] sm:min-w-[420px] bg-[#141616] border border-arena-medium/20 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[400px]">
                    <div className="flex items-center justify-between border-b border-arena-medium/10 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-arena-medium/60 uppercase">PLANO 02 // ZONA PRIVADA</span>
                        <h4 className="font-serif text-base text-marfil font-medium mt-0.5">Planta Alta</h4>
                      </div>
                      <span className="text-[10px] font-mono text-arena-medium font-semibold">140 m² Cubiertos</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-[#1D1F20] border border-dashed border-arena-medium/10 rounded p-4 relative mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE6DD_1px,transparent_1px),linear-gradient(to_bottom,#EAE6DD_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                      
                      <svg className="w-full h-full max-h-[180px] text-arena-medium/60 relative z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="15" y="15" width="170" height="90" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        {/* Walls separating bedrooms */}
                        <line x1="100" y1="15" x2="100" y2="105" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="15" y1="60" x2="185" y2="60" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Master Suite */}
                        <rect x="25" y="25" width="65" height="25" stroke="currentColor" strokeWidth="1" />
                        <text x="57" y="40" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle" className="font-semibold">SUITE PRINCIPAL</text>
                        
                        {/* Dorm 2 */}
                        <text x="57" y="85" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle">HABITACIÓN 2</text>
                        {/* Dorm 3 */}
                        <text x="142" y="40" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle">HABITACIÓN 3</text>
                        {/* Dorm 4 */}
                        <text x="142" y="85" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle">HABITACIÓN 4</text>
                        
                        {/* Double sink bath icon detail */}
                        <circle cx="115" cy="25" r="3" stroke="currentColor" strokeWidth="0.8" />
                        <circle cx="125" cy="25" r="3" stroke="currentColor" strokeWidth="0.8" />
                      </svg>
                    </div>

                    <div className="border-t border-arena-medium/10 pt-3 flex justify-between text-[10px] font-mono text-marfil/50">
                      <span>ESCALA: 1:100</span>
                      <span>INCLUYE: SUITE CON VESTIDOR & TERRAZA</span>
                    </div>
                  </div>

                  {/* Blueprint Card 3: Elevación Lateral / Sección */}
                  <div className="min-w-[280px] sm:min-w-[420px] bg-[#141616] border border-arena-medium/20 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[400px]">
                    <div className="flex items-center justify-between border-b border-arena-medium/10 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-arena-medium/60 uppercase">PLANO 03 // VOLUMETRÍA</span>
                        <h4 className="font-serif text-base text-marfil font-medium mt-0.5">Sección & Elevación</h4>
                      </div>
                      <span className="text-[10px] font-mono text-arena-medium font-semibold">Doble Altura</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-[#1D1F20] border border-dashed border-arena-medium/10 rounded p-4 relative mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE6DD_1px,transparent_1px),linear-gradient(to_bottom,#EAE6DD_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                      
                      <svg className="w-full h-full max-h-[180px] text-arena-medium/60 relative z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Ground Line */}
                        <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="2" />
                        {/* House block exterior shape */}
                        <polygon points="30,100 30,50 110,35 170,35 170,100" stroke="currentColor" strokeWidth="1.5" />
                        {/* Large Glass wall window frames */}
                        <rect x="40" y="55" width="60" height="45" stroke="currentColor" strokeWidth="1" />
                        <line x1="70" y1="55" x2="70" y2="100" stroke="currentColor" strokeWidth="0.8" />
                        {/* Upper window */}
                        <rect x="120" y="45" width="40" height="25" stroke="currentColor" strokeWidth="1" />
                        
                        {/* Internal stair arrow representation */}
                        <line x1="120" y1="95" x2="155" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="138" y="90" fontSize="6" fill="currentColor" fontFamily="monospace" transform="rotate(-30 138 90)">ESCALERAS</text>

                        {/* Top height indicators */}
                        <line x1="180" y1="35" x2="190" y2="35" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="180" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="185" y1="35" x2="185" y2="100" stroke="currentColor" strokeWidth="0.8" />
                        <text x="189" y="70" fontSize="6" fill="currentColor" fontFamily="monospace" transform="rotate(90 189 70)">H: 6.80m</text>
                      </svg>
                    </div>

                    <div className="border-t border-arena-medium/10 pt-3 flex justify-between text-[10px] font-mono text-marfil/50">
                      <span>ESCALA: 1:125</span>
                      <span>INCLUYE: FACHADA INTEGRAL VIDRIADA</span>
                    </div>
                  </div>

                  {/* Blueprint Card 4: Detalle Personalizado */}
                  <div className="min-w-[280px] sm:min-w-[420px] bg-[#141616] border border-arena-medium/20 p-6 rounded-sm snap-start shadow-sm flex-shrink-0 flex flex-col justify-between h-[400px]">
                    <div className="flex items-center justify-between border-b border-arena-medium/10 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-arena-medium/60 uppercase">PLANO 04 // ADICIONALES OPCIONALES</span>
                        <h4 className="font-serif text-base text-marfil font-medium mt-0.5">Módulo Piscina & Deck</h4>
                      </div>
                      <span className="text-[10px] font-mono text-arena-medium font-semibold">Opciones de Lujo</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-[#1D1F20] border border-dashed border-arena-medium/10 rounded p-4 relative mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE6DD_1px,transparent_1px),linear-gradient(to_bottom,#EAE6DD_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
                      
                      <svg className="w-full h-full max-h-[180px] text-arena-medium/60 relative z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Outside garden area */}
                        <rect x="20" y="20" width="160" height="80" rx="1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        {/* Custom Pool layout */}
                        <rect x="35" y="30" width="80" height="45" rx="3" fill="#2B424D/5" stroke="currentColor" strokeWidth="1.5" />
                        <text x="75" y="55" fontSize="7" fill="currentColor" fontFamily="monospace" textAnchor="middle" className="font-semibold">ESPEJO DE AGUA</text>
                        {/* Pool stairs */}
                        <line x1="39" y1="35" x2="49" y2="35" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="39" y1="39" x2="49" y2="39" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="39" y1="43" x2="49" y2="43" stroke="currentColor" strokeWidth="0.8" />
                        
                        {/* Bohio (resting area) layout */}
                        <polygon points="135,30 165,30 165,65 135,65" stroke="currentColor" strokeWidth="1.2" />
                        {/* Cross structure inside Bohio */}
                        <line x1="135" y1="30" x2="165" y2="65" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="165" y1="30" x2="135" y2="65" stroke="currentColor" strokeWidth="0.8" />
                        <text x="150" y="75" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="middle">BOHÍO DE PLAYA</text>
                      </svg>
                    </div>

                    <div className="border-t border-arena-medium/10 pt-3 flex justify-between text-[10px] font-mono text-marfil/50">
                      <span>ESCALA: 1:100</span>
                      <span>INCLUYE: DECK MADERA TRATADA & DEPURACIÓN</span>
                    </div>
                  </div>

                </div>
                
                {/* Visual horizontal scroll indicator guide */}
                <div className="text-center sm:text-left text-[10px] font-mono text-arena-medium/80 flex items-center justify-start gap-2 mt-2">
                  <span className="inline-block w-4 h-0.5 bg-arena-medium/40 animate-pulse" />
                  <span>DESPLAZAR LATERALMENTE PARA VER TODOS LOS PLANOS DE DISEÑO</span>
                  <span className="inline-block w-4 h-0.5 bg-arena-medium/40 animate-pulse" />
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
