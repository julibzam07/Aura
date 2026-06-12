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
import modeloC from "../assets/images/regenerated_image_1781287870190.png";
import modeloD from "../assets/images/regenerated_image_1781288004332.png";

// Gallery images of home environments (already present)
import salaComedor1 from "../assets/images/modelos/01_SALA_COMEDOR.jpg";
import salaComedor2 from "../assets/images/modelos/03_SALA_COMEDOR.jpg";
import recamara3 from "../assets/images/modelos/08_RECAMARA_3.jpg";
import recamaraPrincipal from "../assets/images/modelos/09_PARADISE_POINT_RECAMARA_PRINCIPAL.jpg";
import fachadaC from "../assets/images/modelos/10_FACHADA_MODELO_C.jpg";
import fachadaD from "../assets/images/modelos/13_FACHADA_MODELO_D.jpg";
import fachadasHilera from "../assets/images/modelos/16_FACHADAS_HILERA.jpg";

// Nuevas imágenes del MODELO C enviadas por el cliente.
// Se listan con constantes semánticas y cargan directo de Drive en producción para máxima fidelidad visual.
const ambienteModeloC_01 = "https://docs.google.com/uc?export=view&id=12armJJ44z-PNB1CWhhqu7ELIOTlwST8J";
const ambienteModeloC_02 = "https://docs.google.com/uc?export=view&id=1Tzdcnq6bljupliJHBAKjpnDQzAJFOmh2";
const ambienteModeloC_03 = "https://docs.google.com/uc?export=view&id=1LqhKE_nNfHdnkgFjRTUZ3tZqppH98OFw";
const ambienteModeloC_04 = "https://docs.google.com/uc?export=view&id=19Icc-iHK6T0vmADmxJM68Axa1oHlovtS";

export const Modelos: React.FC = () => {
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
      img: fachadaC,
      label: "Fachada de Acceso - Modelo C",
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
      img: ambienteModeloC_01,
      label: "Cocina y Barra Desayunadora - Modelo C",
      desc: "Distribución optimizada de cocina moderna con encimeras de alta gama.",
      type: "Interior"
    },
    {
      img: recamara3,
      label: "Habitaciones Familiares Confortables",
      desc: "Habitaciones amplias diseñadas bajo un estándar de confort térmico y acústico absoluto.",
      type: "Interior"
    },
    {
      img: ambienteModeloC_02,
      label: "Baño Completo con Acabados Premium",
      desc: "Espacios de aseo que replican un boutique resort de playa.",
      type: "Interior"
    },
    {
      img: recamaraPrincipal,
      label: "Recámara Principal",
      desc: "Suites maestras que emanan bienestar, silencio, descanso supremo y exclusividad.",
      type: "Interior"
    },
    {
      img: ambienteModeloC_03,
      label: "Estancia Familiar de Segunda Planta",
      desc: "Áreas confortables ideales para reuniones y esparcimiento en total tranquilidad.",
      type: "Interior"
    },
    {
      img: salaComedor2,
      label: "Sala de Estar Familiar",
      desc: "Conexión fluida con ventanales altos que aportan frescura constante a todo el hogar.",
      type: "Interior"
    },
    {
      img: fachadaD,
      label: "Fachada Posterior - Modelo D",
      desc: "Arquitectura imponente desde cada ángulo con pre-instalaciones adaptadas a su estilo.",
      type: "Exterior"
    },
    {
      img: ambienteModeloC_04,
      label: "Área Exterior e Integración del Entorno",
      desc: "Vistas y disfrute máximo de una vida cerca del mar caribeño.",
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
            <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón">
              Convierta su vida
            </span>
            <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5">
              en una experiencia.
            </span>
          </h2>
          <p className="font-sans font-light text-base md:text-lg text-carbón-light/85 leading-relaxed">
            Aura ofrece unidades de dos plantas con terminaciones únicas y de alta calidad, disponibles desde preventa. Estamos construyendo las condiciones necesarias para crear ambientes tranquilos, familiares y, sobre todo, extraordinarios.
          </p>
        </div>
      </div>

      {/* 2. BLOQUE DE MODELOS (Elegantes paneles con layout de 2 columnas en desktop, 1 columna en mobile) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        
        {/* RECUADRO MODELO C */}
        <div className="flex flex-col w-full h-full">
          {/* Título superior, centrado, caps, amplio espaciado */}
          <h3 className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#73634c] uppercase font-semibold mb-6 text-center select-none">
            MODELO C
          </h3>
          
          {/* Contenedor vertical con fondo crema/marfil cálido */}
          <div className="w-full bg-[#FAF7F0] border border-arena-medium/35 p-6 sm:p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-stretch h-full flex-1">
            
            {/* Imagen del Plano */}
            <div className="flex flex-col items-center justify-center bg-white/75 border border-arena-medium/20 rounded-lg p-4 sm:p-6 shadow-2xs w-full mb-8">
              <div className="relative h-[220px] sm:h-[260px] md:h-[300px] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={modeloC}
                  alt="Plano Técnico del Modelo C"
                  className="max-h-full max-w-full object-contain select-none transition-transform duration-500 hover:scale-[1.01]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Botón Ver en Grande */}
              <button
                id="btn-ver-grande-c"
                onClick={() => { setLightboxImage(modeloC); setLightboxTitle("Modelo C - Distribución y Planos"); }}
                className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#73634c]/75 hover:text-carbón hover:underline bg-arena-medium/20 hover:bg-arena-medium/35 px-4 py-2.5 rounded transition-all cursor-pointer min-h-[44px]"
              >
                <ZoomIn className="w-4 h-4" />
                Ver en grande
              </button>
            </div>

            {/* Contenido textual HTML */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                {/* Lista de características */}
                <ul className="space-y-3.5 mb-8">
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
                        <td className="py-2.5 font-semibold text-right text-carbón">160,54 m²</td>
                      </tr>
                      <tr className="border-b border-[#73634c]/15">
                        <td className="py-2.5 font-light text-carbón-light">Área total</td>
                        <td className="py-2.5 font-semibold text-right text-carbón">154,10 m²</td>
                      </tr>
                      <tr className="border-b border-[#73634c]/15">
                        <td className="py-2.5 font-light text-carbón-light">Área cerrada</td>
                        <td className="py-2.5 font-semibold text-right text-carbón">107,37 m²</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Párrafo de cierre */}
              <div className="pt-6 border-t border-[#73634c]/10 mt-auto">
                <p className="font-sans font-light italic text-sm md:text-[15px] text-[#73634c] leading-relaxed">
                  "Modelo C · Una oportunidad de entrada para quienes buscan casa de playa, comodidad familiar y potencial de valorización en una comunidad cerrada."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RECUADRO MODELO D */}
        <div className="flex flex-col w-full h-full">
          {/* Título superior, centrado, caps, amplio espaciado */}
          <h3 className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#73634c] uppercase font-semibold mb-6 text-center select-none">
            MODELO D
          </h3>
          
          {/* Contenedor vertical con fondo crema/marfil cálido idéntico al Modelo C */}
          <div className="w-full bg-[#FAF7F0] border border-arena-medium/35 p-6 sm:p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between items-stretch h-full flex-1">
            
            {/* Imagen del Plano */}
            <div className="flex flex-col items-center justify-center bg-white/75 border border-arena-medium/20 rounded-lg p-4 sm:p-6 shadow-2xs w-full mb-8">
              <div className="relative h-[220px] sm:h-[260px] md:h-[300px] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={modeloD}
                  alt="Plano Técnico del Modelo D"
                  className="max-h-full max-w-full object-contain select-none transition-transform duration-500 hover:scale-[1.01]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Botón Ver en Grande */}
              <button
                id="btn-ver-grande-d"
                onClick={() => { setLightboxImage(modeloD); setLightboxTitle("Modelo D - Distribución y Planos"); }}
                className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#73634c]/75 hover:text-carbón hover:underline bg-arena-medium/20 hover:bg-arena-medium/35 px-4 py-2.5 rounded transition-all cursor-pointer min-h-[44px]"
              >
                <ZoomIn className="w-4 h-4" />
                Ver en grande
              </button>
            </div>

            {/* Contenido textual HTML */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                {/* Lista de características */}
                <ul className="space-y-3.5 mb-8">
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
                        <td className="py-2.5 font-semibold text-right text-carbón">191,61 m²</td>
                      </tr>
                      <tr className="border-b border-[#73634c]/15">
                        <td className="py-2.5 font-light text-carbón-light">Área total</td>
                        <td className="py-2.5 font-semibold text-right text-carbón">199,36 m²</td>
                      </tr>
                      <tr className="border-b border-[#73634c]/15">
                        <td className="py-2.5 font-light text-carbón-light">Área cerrada</td>
                        <td className="py-2.5 font-semibold text-right text-carbón">136,21 m²</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Párrafo de cierre */}
              <div className="pt-6 border-t border-[#73634c]/10 mt-auto">
                <p className="font-sans font-light italic text-sm md:text-[15px] text-[#73634c] leading-relaxed">
                  "Modelo D · Situada en esquina, posee más espacio interno y externo, luz y una vista preferencial al entorno. Está pensada para disfrutar de la vida cerca del mar y la naturaleza al máximo."
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3. SEGUNDO BLOQUE DE TEXTO CONSECUENTE */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="w-full bg-marfil/50 border-l-4 border-[#73634c]/60 p-6 md:p-8 rounded-r shadow-sm">
          <p className="font-sans font-light text-base md:text-lg text-carbón-light leading-relaxed mb-4">
            Diseñadas con amplios y luminosos espacios familiares. Cada unidad incluye 4 habitaciones, 3 baños, sala, comedor, cocina y lavandería.
          </p>
          <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed">
            Además, cada residencia tiene la previsión, con costo adicional, de ser personalizada con un bohío, cuarto extra, piscina privada, detalles en el exterior, línea blanca y/o amoblada.
          </p>
        </div>
      </div>

      {/* 4. GALERÍA DE AMBIENTES (La sección 'Galería de interiores y exteriores' removed su título, dejándola puramente visual y fluida) */}
      <div className="w-full flex flex-col gap-6 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-baseline justify-between">
          <div /> {/* Spacer ya que quitamos el título principal para que sea pasivo */}
          <span className="text-xs font-mono text-carbón/50 hidden sm:inline select-none">
            Explorando ambientes • {activeImageIndex + 1} / {galleryImages.length}
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
                
                {/* Micro-interaction Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#FAF7F0] uppercase mb-1.5 block">
                    {item.type}
                  </span>
                  <p className="text-white font-serif text-sm md:text-base mb-1 font-semibold">{item.label}</p>
                  <p className="text-white/85 text-xs font-light max-w-sm">{item.desc}</p>
                </div>

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

      {/* 5. QUOTE FINAL */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl border-t border-carbón/10 pt-6">
          <p id="modelos-quote" className="font-serif italic text-lg md:text-xl text-[#73634c] leading-relaxed relative pl-6 max-w-2xl border-l-2 border-[#73634c]/60 select-none">
            "Esta es una oportunidad única para cambiar su estilo de vida o adquirir una inversión segura y de alto rendimiento."
          </p>
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
