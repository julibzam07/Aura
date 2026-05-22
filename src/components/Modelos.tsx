import React, { useState } from "react";
import { motion } from "motion/react";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { Shield, Sparkles, Sliders, CheckSquare, Layers } from "lucide-react";

export const Modelos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ext" | "int">("ext");
  const [activeExtIndex, setActiveExtIndex] = useState(0);
  const [activeIntIndex, setActiveIntIndex] = useState(0);

  const exteriorImages = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  const interiorImages = [
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  return (
    <section id="modelos" className="bg-black py-20 md:py-32 px-6 md:px-12 relative text-white border-t border-arena-medium/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Active Interactive visual show */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex gap-6 mb-6 z-10">
              <button
                onClick={() => setActiveTab("ext")}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === "ext" ? "text-arena-medium border-b-2 border-arena-medium" : "text-marfil/45 hover:text-marfil/75"
                }`}
              >
                Modelos Exterior
              </button>
              <button
                onClick={() => setActiveTab("int")}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === "int" ? "text-arena-medium border-b-2 border-arena-medium" : "text-marfil/45 hover:text-marfil/75"
                }`}
              >
                Modelos Interior
              </button>
            </div>

            <div className="relative flex-1">
              {activeTab === "ext" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div className="relative overflow-hidden bg-[#0B0D0D] rounded aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-xl group border border-arena-medium/15">
                    <img
                      src={exteriorImages[activeExtIndex].url}
                      alt="Exterior"
                      className="absolute inset-0 w-full h-full object-cover select-none animate-fade-in"
                      referrerPolicy="no-referrer"
                    />

                    {/* Navigation Buttons inside carousel */}
                    <button
                      onClick={() => setActiveExtIndex((prev) => (prev - 1 + exteriorImages.length) % exteriorImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/55 hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveExtIndex((prev) => (prev + 1) % exteriorImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/55 hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Thumbnail Row Below */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {exteriorImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveExtIndex(index)}
                        className={`relative aspect-[16/10] overflow-hidden rounded-sm transition-all border ${
                          activeExtIndex === index
                            ? "border-arena-medium ring-2 ring-arena-medium/20"
                            : "border-arena-medium/20 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt="Miniatura exterior" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-transparent hover:bg-black/20" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "int" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div className="relative overflow-hidden bg-[#0B0D0D] rounded aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] shadow-xl group border border-arena-medium/15">
                    <img
                      src={interiorImages[activeIntIndex].url}
                      alt="Interior"
                      className="absolute inset-0 w-full h-full object-cover select-none animate-fade-in"
                      referrerPolicy="no-referrer"
                    />

                    {/* Navigation Buttons inside carousel */}
                    <button
                      onClick={() => setActiveIntIndex((prev) => (prev - 1 + interiorImages.length) % interiorImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/55 hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveIntIndex((prev) => (prev + 1) % interiorImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/55 hover:bg-arena-medium hover:text-black transition-colors rounded-full z-20 text-marfil cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Thumbnail Row Below */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {interiorImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIntIndex(index)}
                        className={`relative aspect-[16/10] overflow-hidden rounded-sm transition-all border ${
                          activeIntIndex === index
                            ? "border-arena-medium ring-2 ring-arena-medium/20"
                            : "border-arena-medium/20 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt="Miniatura interior" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-transparent hover:bg-black/20" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Descriptive Information Context */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
              Convierta su vida en una experiencia.
            </h2>

            <div className="h-px w-16 bg-arena-medium/50 mb-6" />

            <div className="font-sans font-light text-sm text-marfil/80 leading-relaxed space-y-4">
              <p>
                Aura ofrece unidades de dos plantas con terminaciones únicas y de alta calidad, disponibles desde preventa. Estamos construyendo las condiciones necesarias para crear ambientes tranquilos, familiares y, sobre todo, extraordinarios. Esta es una oportunidad única para cambiar su estilo de vida o adquirir una inversión segura y de alto rendimiento.
              </p>
              <p>
                Diseñadas con amplios y luminosos espacios familiares. Cada unidad incluye 4 habitaciones, 3 baños, sala, comedor, cocina y lavandería. Además, cada residencia tiene la previsión, con costo adicional, de ser personalizada con un bohío, cuarto extra, piscina privada, detalles en el exterior, línea blanca y/o amoblada.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
