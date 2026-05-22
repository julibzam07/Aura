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
import { Sparkles, ArrowRight, ShieldCheck, Moon } from "lucide-react";

export default function App() {
  const [view, setView] = useState<"landing" | "contact">("landing");

  const handleNavigateToSection = (sectionId: string) => {
    // If we are currently inside the contact view, switch back to landing first, then scroll
    if (view !== "landing") {
      setView("landing");
      setTimeout(() => {
        const item = document.getElementById(sectionId);
        if (item) {
          item.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const item = document.getElementById(sectionId);
      if (item) {
        item.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '123456789012345');
          fbq('track', 'PageView');
        </script>
      */}

      {/* Top Navbar */}
      <Header
        currentView={view}
        setView={setView}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Container Switching with Framer Motion Layout animations */}
      <main className="pt-[77px]">
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            <motion.div
              key="landing-page-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
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
              <footer className="bg-[#111313] text-marfil/60 py-16 px-6 md:px-12 border-t border-arena-medium/5 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  
                  {/* Left branding footer block */}
                  <div className="md:col-span-4 space-y-4">
                    <h5 className="font-serif text-2xl font-light tracking-[0.25em] text-marfil leading-none">AURA</h5>
                    <p className="text-[10px] uppercase font-sans tracking-[0.4em] text-arena-medium">
                      PARADISE POINT • CORONADO II
                    </p>
                    <p className="text-xs font-light leading-relaxed text-arena-light/60 max-w-sm">
                      Un residencial concebido por CGO Panamá, asegurando los más altos estándares de diseño moderno, confort de playa y plusvalía garantizada.
                    </p>
                  </div>

                  {/* Middle Navigation columns with "Soporte técnico" renamed as "Secciones" */}
                  <div className="md:col-span-5 grid grid-cols-2 gap-8">
                    <div>
                      <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-arena-medium mb-4">Secciones</h6>
                      <ul className="space-y-2 text-xs font-light">
                        <li><button onClick={() => handleNavigateToSection("proyecto")} className="hover:text-marfil transition-colors cursor-pointer">El Proyecto</button></li>
                        <li><button onClick={() => handleNavigateToSection("diseno")} className="hover:text-marfil transition-colors cursor-pointer">Detalles de Diseño</button></li>
                        <li><button onClick={() => handleNavigateToSection("amenidades")} className="hover:text-marfil transition-colors cursor-pointer">Amenidades Elite</button></li>
                        <li><button onClick={() => handleNavigateToSection("modelos")} className="hover:text-marfil transition-colors cursor-pointer">Modelos de Casas</button></li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-arena-medium mb-4">Secciones</h6>
                      <ul className="space-y-2 text-xs font-light">
                        <li><button onClick={() => handleNavigateToSection("recorrido")} className="hover:text-marfil transition-colors cursor-pointer">Tour Interactivo 3D</button></li>
                        <li><button onClick={() => handleNavigateToSection("precios")} className="hover:text-marfil transition-colors cursor-pointer">Planes e Inversión</button></li>
                        <li><button onClick={() => handleNavigateToSection("ubicacion")} className="hover:text-marfil transition-colors cursor-pointer">Ubicación y Playas</button></li>
                        <li><button onClick={() => setView("contact")} className="hover:text-white font-medium text-arena-medium transition-colors cursor-pointer">Dossier de Ventas</button></li>
                      </ul>
                    </div>
                  </div>

                  {/* Right contact details - Direction & Phone */}
                  <div className="md:col-span-3 space-y-4 text-xs font-light">
                    <h6 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-arena-medium">Contacto y Obra</h6>
                    <p className="text-marfil/80 leading-relaxed font-sans">
                      PH Paradise Point, Nueva Gorgona, Panamá
                    </p>
                    <p className="font-sans text-marfil/80 space-y-1">
                      <span className="block text-marfil/50 text-[10px] uppercase">Teléfono Directo</span>
                      <a href="tel:+50766237000" className="hover:text-arena-medium transition-colors font-medium text-sm text-marfil leading-none font-sans">+507 6623-7000</a>
                    </p>
                    <p className="font-sans text-marfil/80 space-y-1">
                      <span className="block text-marfil/50 text-[10px] uppercase">Correo Electrónico</span>
                      <a href="mailto:ventas@itsaura.pa" className="hover:text-arena-medium transition-colors font-semibold font-sans text-marfil">ventas@itsaura.pa</a>
                    </p>
                  </div>
                </div>

                {/* Subfooter licensing details */}
                <div className="max-w-7xl mx-auto border-t border-arena-medium/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-marfil/45">
                  <p>© 2026 AURA CORONADO — Paradise Point Residencia S.A. Todos los derechos reservados.</p>
                  <div className="flex gap-4">
                    <span className="hover:text-marfil transition-colors">Términos Legales</span>
                    <span>•</span>
                    <span className="hover:text-marfil transition-colors">Políticas de Obra</span>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="contact-page-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Separate Boutique Contact View */}
              <Contacto onBackToHome={() => setView("landing")} />
              
              {/* Standard Simple Page Footer */}
              <footer className="bg-arena-light border-t border-arena-medium/20 py-8 px-6 text-center text-[10px] opacity-60">
                <p>© 2026 AURA CORONADO — Paradise Point Residencia. Coronado • Panamá.</p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistence float interaction frames */}
      <FloatingWidgets />

    </div>
  );
}
