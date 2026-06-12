import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentView: "landing" | "contact";
  setView: (view: "landing" | "contact") => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, onNavigateToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "El Proyecto", id: "proyecto" },
    { label: "Diseño", id: "diseno" },
    { label: "Amenidades", id: "amenidades" },
    { label: "Modelos", id: "modelos" },
    { label: "Recorrido 360°", id: "recorrido" },
    { label: "Planes", id: "precios" },
    { label: "Ubicación", id: "ubicacion" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-arena-light border-b border-arena-medium/40 shadow-sm ${
        isScrolled ? "py-3.5" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LOGO AURA */}
        <div
          id="aura-brand-logo"
          onClick={() => setView("landing")}
          className="cursor-pointer flex items-center justify-center py-1 select-none hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="AURA Coronado"
            className="h-8 sm:h-7 w-auto object-contain brightness-0"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-xs tracking-[0.16em] uppercase">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-carbón font-semibold transition-all duration-300 relative py-1 cursor-pointer after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-carbón after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                currentView === "landing" ? "text-carbón-light/90" : "text-carbón-light/60"
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => setView(currentView === "contact" ? "landing" : "contact")}
            className="ml-4 px-6 py-3 bg-transparent text-[#73634c] border border-[#73634c]/40 text-[11px] font-light tracking-[0.2em] uppercase hover:bg-[#73634c]/5 hover:border-[#73634c] transition-all duration-300 flex items-center gap-2 cursor-pointer group rounded-none min-h-[44px]"
          >
            {currentView === "contact" ? "Volver" : "Consultar"}
            <ArrowRight className="w-3.5 h-3.5 text-[#73634c]/80 group-hover:text-[#73634c] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setView(currentView === "contact" ? "landing" : "contact")}
            className="px-5 py-3 bg-transparent text-[#73634c] text-[10px] tracking-wider uppercase font-light border border-[#73634c]/40 hover:bg-[#73634c]/5 hover:border-[#73634c] transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center min-h-[44px]"
          >
            {currentView === "contact" ? "Volver" : "Consultar"}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-carbón hover:opacity-75 transition-opacity cursor-pointer p-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-carbón" /> : <Menu className="w-6 h-6 text-carbón" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[77px] bg-arena-light border-b border-arena-medium/40 shadow-xl p-8 z-40 animate-fade-in-up">
          <div className="flex flex-col gap-6 font-sans text-sm tracking-[0.15em] uppercase text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="py-2 text-carbón/80 hover:text-carbón font-semibold transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setView("contact");
              }}
              className="mt-4 px-6 py-3.5 bg-transparent text-[#73634c] font-light text-xs tracking-[0.2em] uppercase border border-[#73634c]/40 hover:bg-[#73634c]/5 hover:border-[#73634c] transition-all duration-300 rounded-none min-h-[44px] flex items-center justify-center"
            >
              Iniciar Consulta
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
