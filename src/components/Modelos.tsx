import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ==========================================
// DECISIONES CLAVE DE ESTE COMPONENTE:
// 1. ESTRUCTURA DE LA TABLA: Se diseñó una tabla HTML nativa, muy simple y limpia, con separadores 
//    sutiles (bordes de color de marca con 15% de opacidad) para que respire elegancia y ligereza visual.
// 2. LIGHTBOX ANTI-ADBLOCKER: El lightbox de ver en grande se implementa de manera inline en el DOM 
//    usando nombres de clase neutros como 'imagen-detalle-contenedor', 'imagen-detalle-vista', etc. 
//    Evita librerías famosas o clases como 'modal', 'ads', 'popup' que podrían bloquearse por adblockers.
// 3. ALTERNANCIA AUTOMÁTICA DEL SLIDESHOW: La galería de ambientes posee autoplay pasivo que rota 
//    cada 4.5 segundos de forma fluida. Se detiene interactivamente cuando el usuario usa los botones manuales o el scroll.
// ==========================================

// Plan images (technical layout static paths)
import modeloC from "../assets/images/plano-modeloc.png";
import modeloD from "../assets/images/plano-modelod.png";

// Gallery images of home environments (served directly from the public/ folder for rock-solid reliability and performance)
const img01 = "/galeria-convierta/01.jpg";
const img13 = "/galeria-convierta/13.jpg";
const img02 = "/galeria-convierta/02.jpg";
const img08 = "/galeria-convierta/08.jpg";
const img10 = "/galeria-convierta/10.jpg";
const img16 = "/galeria-convierta/16.jpg";
const img06 = "/galeria-convierta/06.jpg";
const img03 = "/galeria-convierta/03.jpg";
const img09 = "/galeria-convierta/09.jpg";
const img04 = "/galeria-convierta/04.jpg";
const img19 = "/galeria-convierta/19.jpg";
const img20 = "/galeria-convierta/20.jpg";
const img18 = "/galeria-convierta/18.jpg";

export const Modelos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'C' | 'D'>('C');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    // Check user motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Set up observer for section viewport presence
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      observer.unobserve(container);
    };
  }, []);

  // Autoplay loop timer (runs every 4.5 seconds if the section is in viewport and the user hasn't active manually scrolled/clicked)
  useEffect(() => {
    if (!isInViewport || isUserInteracted || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % galleryImages.length;
        scrollToImage(nextIndex, false);
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isInViewport, isUserInteracted, shouldReduceMotion]);

  const galleryImages = [
    {
      img: img01,
      label: "Espacio Integrado de Sala y Comedor",
      desc: "Amplitud y luminosidad excepcionales combinadas con acabados sofisticados.",
      type: "Interior"
    },
    {
      img: img13,
      label: "Vista de Fachada Posterior",
      desc: "Arquitectura imponente desde cada ángulo con pre-instalaciones adaptadas a su alzado contemporáneo.",
      type: "Exterior"
    },
    {
      img: img02,
      label: "Sala de Estar Familiar Primaria",
      desc: "Espacio íntimo diseñado con tonos cálidos y texturas orgánicas para favorecer la relajación.",
      type: "Interior"
    },
    {
      img: img08,
      label: "Habitaciones Familiares Confortables",
      desc: "Habitaciones amplias diseñadas bajo un estándar de confort térmico y acústico absoluto.",
      type: "Interior"
    },
    {
      img: img10,
      label: "Fachada de Acceso - Modelo A",
      desc: "Líneas elegantes y contemporáneas diseñadas para fundirse de forma armoniosa con la naturaleza.",
      type: "Exterior"
    },
    {
      img: img16,
      label: "Vista de Conjunto Residencial",
      desc: "Un vecindario de ensueño diseñado exclusivamente para elevar el bienestar diario de su familia.",
      type: "Exterior"
    },
    {
      img: img06,
      label: "Terraza Exterior con Jardín",
      desc: "Conexión fluida con el exterior para disfrutar de reuniones sociales al aire libre.",
      type: "Exterior"
    },
    {
      img: img03,
      label: "Sala de Estar de Doble Altura",
      desc: "Conexión fluida con ventanales altos que aportan frescura constante a todo el hogar.",
      type: "Interior"
    },
    {
      img: img09,
      label: "Recámara Principal",
      desc: "Suites maestras que emanan bienestar, silencio, descanso supremo y exclusividad.",
      type: "Interior"
    },
    {
      img: img04,
      label: "Cocina y Barra Desayunadora",
      desc: "Distribución optimizada de cocina moderna con encimeras de alta gama.",
      type: "Interior"
    },
    {
      img: img19,
      label: "Jardines y Senderos Verdes",
      desc: "Extensos espacios verdes exteriores que fortalecen la relajación y la conexión con la naturaleza.",
      type: "Exterior"
    },
    {
      img: img20,
      label: "Espacio de Piscina y Esparcimiento",
      desc: "Diseñado para brindar frescura, relajación y momentos inolvidables de recreación en familia.",
      type: "Exterior"
    },
    {
      img: img18,
      label: "Baño Principal de En-Suite",
      desc: "Terminaciones distinguidas con mármol y accesorios premium para una experiencia de confort absoluto.",
      type: "Interior"
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

  const scrollToImage = (index: number, stopAutoplay = true) => {
    if (stopAutoplay) {
      setIsUserInteracted(true);
    }
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
    setIsUserInteracted(true);
    const targetIndex = activeImageIndex > 0 ? activeImageIndex - 1 : galleryImages.length - 1;
    scrollToImage(targetIndex, true);
  };

  const scrollNext = () => {
    setIsUserInteracted(true);
    const targetIndex = activeImageIndex < galleryImages.length - 1 ? activeImageIndex + 1 : 0;
    scrollToImage(targetIndex, true);
  };

  // Close lightbox with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
        setLightboxTitle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="modelos" ref={containerRef} className="bg-arena-medium py-20 md:py-32 relative text-carbón border-t border-arena-light/20 flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* 1. TEXTO INTRODUCTORIO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">

          <h2 id="modelos-titulo" className="flex flex-col leading-tight mb-8 select-none">
            <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón" data-reveal="fade-up">
              Convierta su vida
            </span>
            <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5" data-reveal="fade-up" data-reveal-delay="150">
              en una experiencia.
            </span>
          </h2>
          <p className="font-sans font-light text-base md:text-lg text-carbón-light/85 leading-relaxed mb-4" data-reveal="fade-up" data-reveal-duration="600" data-reveal-delay="300">
            Aura ofrece unidades de dos plantas con terminaciones únicas y de alta calidad, disponibles desde preventa. Estamos construyendo las condiciones necesarias para crear ambientes tranquilos, familiares y, sobre todo, extraordinarios.
          </p>
          <p className="font-sans font-light text-base md:text-lg text-carbón-light/85 leading-relaxed" data-reveal="fade-up" data-reveal-duration="600" data-reveal-delay="400">
            Diseñadas con amplios y luminosos espacios familiares. Cada unidad incluye 4 habitaciones, 3 baños, sala, comedor, cocina y lavandería.
          </p>
        </div>
      </div>

      {/* 2. BLOQUE DE MODELOS CON PESTAÑAS (MODELO C y MODELO D) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center" data-reveal="fade-up">
        {/* Pestañas / Tabs Headers */}
        <div id="modelos-tabs-control" className="flex border-b border-[#73634c]/20 w-full max-w-md justify-center mb-12 gap-8">
          <button
            id="tab-modelo-c"
            onClick={() => setActiveTab('C')}
            className={`relative pb-3 text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] uppercase transition-colors cursor-pointer min-h-[44px] ${
              activeTab === 'C' ? "text-[#73634c]" : "text-carbón/40 hover:text-carbón/70"
            }`}
          >
            MODELO C
            {activeTab === 'C' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#73634c]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            id="tab-modelo-d"
            onClick={() => setActiveTab('D')}
            className={`relative pb-3 text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] uppercase transition-colors cursor-pointer min-h-[44px] ${
              activeTab === 'D' ? "text-[#73634c]" : "text-carbón/40 hover:text-carbón/70"
            }`}
          >
            MODELO D
            {activeTab === 'D' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#73634c]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Contenido de la pestaña activa con transición fade suave */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="w-full bg-[#FAF7F0] border border-arena-medium/35 p-6 sm:p-8 md:p-12 lg:p-14 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-start"
            >
              {/* Columna Izquierda: Imagen del Plano */}
              <div className="flex flex-col items-center justify-center bg-white/75 border border-arena-medium/20 rounded-lg p-6 sm:p-8 shadow-2xs w-full" data-reveal="slide-in-left" data-reveal-duration="1100">
                <div className="relative h-[250px] sm:h-[300px] md:h-[340px] lg:h-[380px] w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={activeTab === 'C' ? modeloC : modeloD}
                    alt={`Plano Técnico del Modelo ${activeTab}`}
                    className="max-h-full max-w-full object-contain select-none transition-transform duration-500 hover:scale-[1.01]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Botón Ver en Grande */}
                <button
                  id={`btn-ver-grande-${activeTab.toLowerCase()}`}
                  onClick={() => {
                    const img = activeTab === 'C' ? modeloC : modeloD;
                    setLightboxImage(img);
                    setLightboxTitle(`Modelo ${activeTab} - Distribución y Planos`);
                  }}
                  className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#73634c]/75 hover:text-carbón hover:underline bg-arena-medium/20 hover:bg-arena-medium/35 px-4 py-2.5 rounded transition-all cursor-pointer min-h-[44px]"
                >
                  <ZoomIn className="w-4 h-4" />
                  Ver en grande
                </button>
              </div>

              {/* Columna Derecha: Contenido Textual */}
              <div className="flex flex-col justify-between h-full min-h-[350px]">
                <div>
                  {/* Lista de características */}
                  <ul className="space-y-4 mb-8">
                    {activeTab === 'C' ? (
                      <>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Residencia de dos niveles</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>4 habitaciones, 3 baños, sala, comedor, cocina y lavandería</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Espacios familiares y exteriores integrados</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>1 Cochera semi-cubierta</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Diseño con iluminación natural y ventilación cruzada</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Residencia de dos niveles en esquina</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>4 habitaciones, 3 baños, sala, comedor, cocina y lavandería</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Amplios espacios familiares y exteriores integrados</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>2 Cocheras semi-cubiertas</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Diseño con iluminación natural y ventilación cruzada</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[15px] font-sans font-normal text-carbón">
                          <span className="text-[#73634c] select-none font-semibold">—</span>
                          <span>Vista diferencial al complejo</span>
                        </li>
                      </>
                    )}
                  </ul>

                  {/* Tabla de metraje */}
                  <div className="mb-6 md:mb-8">
                    <span className="text-[10px] font-sans font-semibold tracking-widest text-[#73634c]/85 uppercase block mb-3.5">
                      Metraje
                    </span>
                    <table className="w-full text-sm font-sans border-collapse">
                      <tbody>
                        <tr className="border-b border-[#73634c]/15">
                          <td className="py-2.5 font-light text-carbón-light">Lote</td>
                          <td className="py-2.5 font-semibold text-right text-carbón">
                            {activeTab === 'C' ? "160,54 m²" : "191,61 m²"}
                          </td>
                        </tr>
                        <tr className="border-b border-[#73634c]/15">
                          <td className="py-2.5 font-light text-carbón-light">Área total</td>
                          <td className="py-2.5 font-semibold text-right text-carbón">
                            {activeTab === 'C' ? "154,10 m²" : "199,36 m²"}
                          </td>
                        </tr>
                        <tr className="border-b border-[#73634c]/15">
                          <td className="py-2.5 font-light text-carbón-light">Área cerrada</td>
                          <td className="py-2.5 font-semibold text-right text-carbón">
                            {activeTab === 'C' ? "107,37 m²" : "136,21 m²"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Párrafo de cierre */}
                <div className="pt-6 border-t border-[#73634c]/10 mt-auto">
                  <p className="font-sans font-light italic text-sm md:text-[15px] text-[#73634c] leading-relaxed">
                    {activeTab === 'C'
                      ? 'Modelo C · Una oportunidad de entrada para quienes buscan casa de playa, comodidad familiar y potencial de valorización en una comunidad cerrada.'
                      : 'Modelo D · Situada en esquina, posee más espacio interno y externo, luz y una vista preferencial al entorno. Está pensada para disfrutar de la vida cerca del mar y la naturaleza al máximo.'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. GALERÍA DE AMBIENTES (La sección 'Galería de interiores y exteriores' removed su título, dejándola puramente visual y fluida) */}
      <div className="w-full flex flex-col gap-6 relative">
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

        {/* Scroll Container with horizontal snapping */}
        <div
          id="galeria-ambientes-wrapper"
          ref={galleryContainerRef}
          onScroll={handleGalleryScroll}
          onTouchStart={() => setIsUserInteracted(true)}
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
              data-reveal="slide-in-right"
              data-reveal-delay={idx * 100}
              data-reveal-duration="1000"
            >
              {/* Aspect-ratio image wrapper */}
              <div className="relative h-[300px] sm:h-[380px] md:h-[460px] lg:h-[530px] w-full overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.label}
                  initial={{ scale: 1, x: 0, y: 0 }}
                  animate={
                    activeImageIndex === idx && !shouldReduceMotion
                      ? { scale: 1.05 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 11, ease: "easeOut" }}
                  className={`w-full h-full object-cover select-none ${
                    isInViewport ? "will-change-transform" : ""
                  }`}
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
              onClick={() => scrollToImage(idx, true)}
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


      {/* LIGHTBOX MODAL DIALOG (Anti-Adblocker compliant: inline rendering, generic node selectors) */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            id="imagen-detalle-contenedor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => { setLightboxImage(null); setLightboxTitle(null); }}
          >
            {/* Close button with high-contrast targets */}
            <button
              id="imagen-detalle-close"
              onClick={() => { setLightboxImage(null); setLightboxTitle(null); }}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Cerrar vista ampliada"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              id="imagen-detalle-vista"
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
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10 select-none bg-arena-medium/5"
                referrerPolicy="no-referrer"
              />
              {lightboxTitle && (
                <h3 className="text-white/95 font-sans text-base sm:text-lg mt-4 tracking-wider font-light text-center">
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
