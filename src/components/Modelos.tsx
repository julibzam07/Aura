import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Plan images (technical layout static paths)
const modeloA = "/assets/modelo_A.jpeg";
const modeloB = "/assets/modelo_B.jpeg";

// Gallery images of home environments
import salaComedor1 from "../assets/images/modelos/01_SALA_COMEDOR.jpg";
import salaComedor2 from "../assets/images/modelos/03_SALA_COMEDOR.jpg";
import recamara3 from "../assets/images/modelos/08_RECAMARA_3.jpg";
import recamaraPrincipal from "../assets/images/modelos/09_PARADISE_POINT_RECAMARA_PRINCIPAL.jpg";
import fachadaA from "../assets/images/modelos/10_FACHADA_MODELO_A.jpg";
import fachadaB from "../assets/images/modelos/13_FACHADA_MODELO_B.jpg";
import fachadasHilera from "../assets/images/modelos/16_FACHADAS_HILERA.jpg";

export const Modelos: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    {
      img: fachadaA,
      label: "Fachada de Acceso - Modelo A",
      desc: "Líneas elegantes y contemporáneas diseñadas para fundirse de forma armoniosa con la naturaleza.",
      type: "Exterior"
    },
    {
      img: salaComedor1,
      label: "Espacio Integrado de Sala y Comedor",
      desc: "Amplitud y luminosidad excepcionales combinadas con acabados sofisticados.",
      type: "Interior"
    },
    {
      img: recamara3,
      label: "Habitaciones Familiares Confortables",
      desc: "Habitaciones amplias diseñadas bajo un estándar de confort térmico y acústico absoluto.",
      type: "Interior"
    },
    {
      img: recamaraPrincipal,
      label: "Recámara Principal",
      desc: "Suites maestras que emanan bienestar, silencio, descanso supremo y exclusividad.",
      type: "Interior"
    },
    {
      img: salaComedor2,
      label: "Sala de Estar Familiar",
      desc: "Conexión fluida con ventanales altos que aportan frescura constante a todo el hogar.",
      type: "Interior"
    },
    {
      img: fachadaB,
      label: "Fachada Posterior - Modelo B",
      desc: "Arquitectura imponente desde cada ángulo con pre-instalaciones adaptadas a su estilo.",
      type: "Exterior"
    },
    {
      img: fachadasHilera,
      label: "Vista de Conjunto Residencial",
      desc: "Un vecindario de ensueño diseñado exclusivamente para elevar el bienestar diario de su familia.",
      type: "Exterior"
    }
  ];

  const handleGalleryScroll = () => {
    const container = galleryContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const children = container.children;
    if (children.length === 0) return;

    // Find the item closest to the center of the viewport scrollbox list
    const centerOfContainer = scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const centerOfChild = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(centerOfChild - centerOfContainer);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    setActiveImageIndex(closestIndex);
  };

  const scrollToImage = (index: number) => {
    const container = galleryContainerRef.current;
    if (!container) return;
    const children = container.children;
    if (children && children[index]) {
      const child = children[index] as HTMLElement;
      container.scrollTo({
        left: child.offsetLeft - (container.clientWidth - child.clientWidth) / 2,
        behavior: "smooth"
      });
      setActiveImageIndex(index);
    }
  };

  const scrollPrev = () => {
    const targetIndex = activeImageIndex > 0 ? activeImageIndex - 1 : galleryImages.length - 1;
    scrollToImage(targetIndex);
  };

  const scrollNext = () => {
    const targetIndex = activeImageIndex < galleryImages.length - 1 ? activeImageIndex + 1 : 0;
    scrollToImage(targetIndex);
  };

  return (
    <section id="modelos" className="bg-arena-medium py-20 md:py-32 relative text-carbón border-t border-arena-light/20 flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* 1. TEXTO INTRODUCTORIO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest text-[#73634c] uppercase mb-3 block">
            Aura Premium Villas
          </span>
          <h2 id="modelos-titulo" className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-carbón leading-tight mb-6">
            Convierta su vida en una experiencia.
          </h2>
          <p className="font-sans font-light text-base md:text-lg text-carbón-light/85 leading-relaxed">
            Aura ofrece unidades de dos plantas con terminaciones únicas y de alta calidad, disponibles desde preventa. Estamos construyendo las condiciones necesarias para crear ambientes tranquilos, familiares y, sobre todo, extraordinarios.
          </p>
        </div>
      </div>

      {/* 2. BLOQUE DE MODELOS (lado a lado, SIN TABS) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* MODELO A */}
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#73634c] uppercase font-semibold mb-6 text-center">
              MODELO A
            </h3>
            {/* White container, generous padding, centered blueprint */}
            <div className="w-full bg-marfil border border-arena-medium/40 p-8 sm:p-12 rounded flex flex-col items-center justify-center shadow-sm relative group overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative max-h-[360px] md:max-h-[420px] aspect-[4/3] w-full flex items-center justify-center">
                <img
                  src={modeloA}
                  alt="Plano Técnico del Modelo A"
                  className="max-h-full max-w-full object-contain select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <button
                id="btn-ver-grande-a"
                onClick={() => { setLightboxImage(modeloA); setLightboxTitle("Modelo A - Distribución y Planos"); }}
                className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-carbón/70 hover:text-carbón hover:underline bg-arena-medium/20 hover:bg-arena-medium/35 px-4 py-2.5 rounded transition-all cursor-pointer min-h-[44px]"
              >
                <ZoomIn className="w-4 h-4" />
                Ver en grande
              </button>
            </div>
          </div>

          {/* MODELO B */}
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#73634c] uppercase font-semibold mb-6 text-center">
              MODELO B
            </h3>
            {/* White container, generous padding, centered blueprint */}
            <div className="w-full bg-marfil border border-arena-medium/40 p-8 sm:p-12 rounded flex flex-col items-center justify-center shadow-sm relative group overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative max-h-[360px] md:max-h-[420px] aspect-[4/3] w-full flex items-center justify-center">
                <img
                  src={modeloB}
                  alt="Plano Técnico del Modelo B"
                  className="max-h-full max-w-full object-contain select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button
                id="btn-ver-grande-b"
                onClick={() => { setLightboxImage(modeloB); setLightboxTitle("Modelo B - Distribución y Planos"); }}
                className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-carbón/70 hover:text-carbón hover:underline bg-arena-medium/20 hover:bg-arena-medium/35 px-4 py-2.5 rounded transition-all cursor-pointer min-h-[44px]"
              >
                <ZoomIn className="w-4 h-4" />
                Ver en grande
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. SEGUNDO BLOQUE DE TEXTO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl bg-marfil/50 border-l-4 border-[#73634c]/60 p-6 md:p-8 rounded-r shadow-sm">
          <p className="font-sans font-light text-base md:text-lg text-carbón-light leading-relaxed mb-4">
            Diseñadas con amplios y luminosos espacios familiares. Cada unidad incluye 4 habitaciones, 3 baños, sala, comedor, cocina y lavandería.
          </p>
          <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed">
            Además, cada residencia tiene la previsión, con costo adicional, de ser personalizada con un bohío, cuarto extra, piscina privada, detalles en el exterior, línea blanca y/o amoblada.
          </p>
        </div>
      </div>

      {/* 4. GALERÍA DE AMBIENTES (full-width, SIN TABS) */}
      <div className="w-full flex flex-col gap-6 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-baseline justify-between">
          <div>
            <h3 id="galeria-titulo" className="font-serif text-xl md:text-2xl font-light text-carbón">
              Galería de Interiores y Exteriores
            </h3>
          </div>
          <span className="text-xs font-mono text-carbón/50 hidden sm:inline">
            Desplazar para explorar • {activeImageIndex + 1} / {galleryImages.length}
          </span>
        </div>

        {/* Desktop Arrow Navigation Controls */}
        <div className="absolute top-1/2 left-8 right-8 z-10 -translate-y-1/2 hidden lg:flex justify-between pointer-events-none">
          <button
            id="galeria-prev"
            onClick={scrollPrev}
            className="p-3.5 rounded-full bg-marfil/95 hover:bg-marfil border border-arena-medium/60 text-carbón shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            aria-label="Imagen anterior de la galería"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="galeria-next"
            onClick={scrollNext}
            className="p-3.5 rounded-full bg-marfil/95 hover:bg-marfil border border-arena-medium/60 text-carbón shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
            aria-label="Siguiente imagen de la galería"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Container */}
        <div
          id="galeria-ambientes-wrapper"
          ref={galleryContainerRef}
          onScroll={handleGalleryScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-6 md:px-12 lg:px-24 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              id={`galeria-item-${idx}`}
              onClick={() => {
                setLightboxImage(item.img);
                setLightboxTitle(item.label);
              }}
              className="w-[88vw] sm:w-[480px] md:w-[600px] lg:w-[740px] flex-shrink-0 snap-center rounded-lg overflow-hidden shadow-lg border border-arena-medium/35 bg-black/5 group relative cursor-pointer"
            >
              {/* Aspect-ratio image wrapper with responsive viewport height guidance */}
              <div className="relative h-[300px] sm:h-[380px] md:h-[460px] lg:h-[530px] w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant overlay zoom icon indicator on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-sm border border-white/10 shadow-md">
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discrete Dot Indicator Row */}
        <div id="galeria-indicadores" className="flex justify-center items-center gap-2 mt-2">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                activeImageIndex === idx
                  ? "bg-[#73634c] w-6"
                  : "bg-carbón/20 hover:bg-carbón/40 w-1.5"
              }`}
              aria-label={`Ver diapositiva de ambiente ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 5. QUOTE FINAL */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl border-t border-carbón/10 pt-6">
          <p id="modelos-quote" className="font-serif italic text-lg md:text-xl text-[#73634c] leading-relaxed relative pl-6 max-w-2xl border-l-2 border-[#73634c]/60">
            "Esta es una oportunidad única para cambiar su estilo de vida o adquirir una inversión segura y de alto rendimiento."
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL DIALOG */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            id="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => { setLightboxImage(null); setLightboxTitle(null); }}
          >
            {/* Close button with high-contrast accessibility targets */}
            <button
              id="lightbox-close"
              onClick={() => { setLightboxImage(null); setLightboxTitle(null); }}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Cerrar vista ampliada"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              id="lightbox-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt={lightboxTitle || "Plano general Aura"}
                className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl border border-white/10 select-none bg-arena-medium/5"
              />
              {lightboxTitle && (
                <h3 className="text-white/95 font-serif text-base sm:text-lg mt-4 tracking-wider font-light text-center">
                  {lightboxTitle}
                </h3>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
