import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";

export const Precios: React.FC = () => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const galleryImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
  ];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="precios" className="bg-black py-20 md:py-32 px-6 md:px-12 relative text-white border-t border-arena-medium/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Investment Plans */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
              Invierta en su bienestar.
            </h2>

            <p className="font-sans font-light text-base text-marfil/85 leading-relaxed mb-8">
              Contamos con diversos planes de inversión:
            </p>

            {/* Direct Options Render */}
            <div className="space-y-4 mb-8">
              {/* Option A */}
              <div className="p-5 bg-[#0B0D0D] border border-arena-medium/15 rounded-sm flex items-center gap-4">
                <div className="p-3 bg-black rounded-full text-arena-medium border border-arena-medium/20">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-marfil font-semibold">
                    Financiamientos especiales
                  </h4>
                </div>
              </div>

              {/* Option B */}
              <div className="p-5 bg-[#0B0D0D] border border-arena-medium/15 rounded-sm flex items-center gap-4">
                <div className="p-3 bg-black rounded-full text-arena-medium border border-arena-medium/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-marfil font-semibold">
                    Venta con carta promesa / al contado
                  </h4>
                </div>
              </div>
            </div>

            {/* Terms and conditions formal block */}
            <div className="border-t border-arena-medium/20 pt-5 flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-arena-medium flex-shrink-0" />
              <p className="font-sans text-xs text-marfil/70 tracking-wide">
                <strong className="font-semibold text-arena-medium">Formas de pago aceptadas:</strong> Cheque bancario certificado o transferencia ACH, estructurado bajo un contrato notarial formal.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Lifestyle Photo Gallery */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative overflow-hidden rounded bg-[#0B0D0D] aspect-[4/3] sm:aspect-[16/10] shadow-2xl group border border-arena-medium/15">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImgIndex}
                  src={galleryImages[activeImgIndex]}
                  alt="Ubicación Coronado"
                  initial={{ opacity: 0.2, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 0.99 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slider Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/55 backdrop-blur-sm text-marfil hover:bg-arena-medium hover:text-black rounded-full z-10 transition-colors"
                aria-label="Anterior"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/55 backdrop-blur-sm text-marfil hover:bg-arena-medium hover:text-black rounded-full z-10 transition-colors"
                aria-label="Siguiente"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Position dots */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-10">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-5 h-1 transition-all rounded ${
                      activeImgIndex === idx ? "bg-arena-medium w-7" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
