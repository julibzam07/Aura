import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProyectoIntro } from "./components/ProyectoIntro";
import { Diseno } from "./components/Diseno";
import { Amenidades } from "./components/Amenidades";
import { Modelos } from "./components/Modelos";
import { Recorrido } from "./components/Recorrido";
import { Precios } from "./components/Precios";
import { Ubicacion } from "./components/Ubicacion";
import { Contacto } from "./components/Contacto";
import { FloatingWidgets } from "./components/FloatingWidgets";
import { Sparkles, ArrowRight, ShieldCheck, Moon, Facebook, Instagram, Info } from "lucide-react";

export default function App() {
  const [view, setView] = useState<"landing" | "contact">("landing");
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);

  const openConsulta = () => {
    setIsConsultaOpen(true);
  };

  const closeConsulta = (fromPopstate = false) => {
    setIsConsultaOpen(false);
    if (!fromPopstate) {
      if (window.history.state && window.history.state.panel === "consulta") {
        window.history.back();
      }
    }
  };

  const handleSetView = (newView: "landing" | "contact") => {
    if (newView === "contact") {
      openConsulta();
    } else {
      setView("landing");
    }
  };

  const handleNavigateToSection = (sectionId: string) => {
    const item = document.getElementById(sectionId);
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollDownFromHero = () => {
    const item = document.getElementById("proyecto");
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-marfil min-h-screen text-carbón relative selection:bg-océano selection:text-marfil">
      
      {/* 
        ========================================================================
        PLACEHOLDER DE PIXELS DE MÉTRICAS (Meta Pixel / Google Tag Manager / GA4)
        ========================================================================
        Para añadir scripts de seguimiento reales en producción, colóquelos dentro de
        /index.html dentro de la etiqueta <head> o use la siguiente estructura:
        
        <!-- Google Tag Manager / GA4 -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        </script>
        
        <!-- Meta Pixel Code -->
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          t.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '123456789012345');
          fbq('track', 'PageView');
        </script>
      */}

      {/* Top Navbar */}
      <Header
        currentView={view}
        setView={handleSetView}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Container */}
      <main className="pt-[77px]">
        {/* 1) Intro / Hero Header */}
        <Hero onScrollDown={handleScrollDownFromHero} />

        {/* 2) Concept Block text info */}
        <ProyectoIntro />

        {/* 3) Design Specifications and Video/Plan */}
        <Diseno />

        {/* 4) Amenities detailed representations & masonry */}
        <Amenidades />

        {/* 5) House Model variations and detail options */}
        <Modelos />

        {/* 6) Interactive 360 Virtual Tour Frame */}
        <Recorrido />

        {/* 7) Pricing, Payment methods, Lifestyle image */}
        <Precios />

        {/* 8) GPS Location coordinates and maps directions */}
        <Ubicacion />

        {/* Elegant Editorial Footer */}
        <footer className="bg-[#ede9e1] text-carbón/70 py-16 px-6 md:px-12 border-t border-arena-medium/60 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left branding footer block */}
            <div className="md:col-span-4 space-y-6">
              <div>
                <h5 className="font-serif text-2xl font-light tracking-[0.25em] text-carbón leading-none">AURA</h5>
                <p className="text-[10px] font-sans tracking-[0.2em] text-[#73634c] font-bold mt-1">
                  Aura, Paradise Point Coronado
                </p>
              </div>

              {/* Social and Contact Info Widgets */}
              <div className="space-y-3 font-sans text-xs">
                {/* Facebook and Instagram */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-2 text-carbón/70">
                    <a href="https://www.instagram.com/itsauraparadise" target="_blank" rel="noopener noreferrer" className="hover:text-[#73634c] transition-colors" aria-label="Instagram">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://www.facebook.com/itsauraparadise" target="_blank" rel="noopener noreferrer" className="hover:text-[#73634c] transition-colors" aria-label="Facebook">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                  <a
                    href="https://www.instagram.com/itsauraparadise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#73634c] transition-colors font-medium text-carbón/80"
                  >
                    @itsauraparadise
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/50766237000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#73634c] hover:scale-105 transition-transform flex items-center justify-center"
                    aria-label="WhatsApp"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/50766237000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#73634c] transition-colors leading-none font-bold text-carbón/90 flex items-center gap-1"
                  >
                    ✆ +507 6623 7000
                  </a>
                </div>

                {/* Email with "i" of information icon */}
                <div className="flex items-center gap-2">
                  <a 
                    href="mailto:info@itsaura.pa"
                    className="text-[#73634c] hover:text-[#73634c]/80 transition-colors inline-flex items-center text-base"
                    title="Información"
                  >
                    ⓘ
                  </a>
                  <a
                    href="mailto:info@itsaura.pa"
                    className="hover:text-[#73634c] transition-colors leading-none font-medium text-carbón/80"
                  >
                    info@itsaura.pa
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Navigation columns with "Soporte técnico" renamed as "Secciones" */}
            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              <div>
                <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#73634c] mb-4">Secciones</h6>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><button onClick={() => handleNavigateToSection("proyecto")} className="hover:text-carbón transition-colors cursor-pointer">El Proyecto</button></li>
                  <li><button onClick={() => handleNavigateToSection("diseno")} className="hover:text-carbón transition-colors cursor-pointer">Diseño</button></li>
                  <li><button onClick={() => handleNavigateToSection("amenidades")} className="hover:text-carbón transition-colors cursor-pointer">Amenidades</button></li>
                  <li><button onClick={() => handleNavigateToSection("modelos")} className="hover:text-carbón transition-colors cursor-pointer">Modelos</button></li>
                </ul>
              </div>
              <div>
                <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#73634c] mb-4">Secciones</h6>
                <ul className="space-y-2 text-xs font-semibold">
                  <li><button onClick={() => handleNavigateToSection("recorrido")} className="hover:text-carbón transition-colors cursor-pointer">Recorrido 360°</button></li>
                  <li><button onClick={() => handleNavigateToSection("precios")} className="hover:text-carbón transition-colors cursor-pointer">Planes</button></li>
                  <li><button onClick={() => handleNavigateToSection("ubicacion")} className="hover:text-carbón transition-colors cursor-pointer">Ubicación</button></li>
                  <li><button onClick={() => handleSetView("contact")} className="hover:text-carbón font-bold text-[#73634c] transition-colors cursor-pointer">Consultar</button></li>
                </ul>
              </div>
            </div>

            {/* Right contact details - Direction & Phone */}
            <div className="md:col-span-3 space-y-4 text-xs font-medium">
              <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#73634c]">Contacto y Obra</h6>
              <p className="text-carbón-light/80 leading-relaxed font-sans">
                Ave Boulevard, PH Paradise Point Coronado, Nueva Gorgona, Panamá.
              </p>
              <p className="font-sans text-carbón-light/80 space-y-1">
                <span className="block text-carbón/55 text-[10px] uppercase font-bold">Teléfono</span>
                <a href="https://wa.me/50766237000" target="_blank" rel="noopener noreferrer" className="hover:text-[#73634c] transition-colors font-bold text-sm text-carbón leading-none font-sans">+507 6623-7000</a>
              </p>
              <p className="font-sans text-carbón-light/80 space-y-1">
                <span className="block text-carbón/55 text-[10px] uppercase font-bold">Correo Electrónico</span>
                <a href="mailto:ventas@itsaura.pa" className="hover:text-[#73634c] transition-colors font-bold font-sans text-carbón">ventas@itsaura.pa</a>
              </p>
            </div>
          </div>

          {/* Subfooter licensing details */}
          <div className="max-w-7xl mx-auto border-t border-arena-medium/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-carbón/50">
            <p>© 2026 AURA CORONADO — Paradise Point Residencia S.A. Todos los derechos reservados.</p>
            <div className="flex gap-4 font-bold">
              <span className="hover:text-carbón transition-colors cursor-pointer">Términos Legales</span>
              <span>•</span>
              <span className="hover:text-carbón transition-colors cursor-pointer">Políticas de Obra</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Persistence float interaction frames */}
      <FloatingWidgets />

      {/* Panel de consultas (Inline in the DOM, always loaded, hidden when closed) */}
      <Contacto isOpen={isConsultaOpen} onClose={closeConsulta} />

    </div>
  );
}
