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
    { label: "Inspiración / Modelos", id: "modelos" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-black border-b border-arena-medium/15 shadow-md ${
        isScrolled ? "py-3.5" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LOGO AURA */}
        <div
          id="aura-brand-logo"
          onClick={() => setView("landing")}
          className="cursor-pointer flex items-center justify-center py-1 select-none"
        >
          <img
            src="/logo.png"
            alt="AURA Coronado"
            className="h-9 sm:h-11 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-xs tracking-[0.16em] uppercase">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-arena-medium transition-all duration-300 relative py-1 cursor-pointer after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-arena-medium after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                currentView === "landing" ? "text-marfil/95" : "text-marfil/60"
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => setView(currentView === "contact" ? "landing" : "contact")}
            className="ml-4 px-5 py-2.5 bg-arena-medium text-black text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-305 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
          >
            {currentView === "contact" ? "Volver" : "Consultar"}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setView(currentView === "contact" ? "landing" : "contact")}
            className="px-3.5 py-2 bg-arena-medium text-black text-[10px] tracking-wider uppercase font-bold"
          >
            {currentView === "contact" ? "Volver" : "Consultar"}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-marfil hover:text-arena-medium transition-colors cursor-pointer p-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[77px] bg-[#0B0D0D] border-b border-arena-medium/15 shadow-xl p-8 z-40 animate-fade-in-up">
          <div className="flex flex-col gap-6 font-sans text-sm tracking-[0.15em] uppercase text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="py-2 text-marfil/80 hover:text-arena-medium hover:tracking-[0.2em] transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setView("contact");
              }}
              className="mt-4 px-6 py-3 bg-arena-medium text-black font-bold text-xs tracking-widest uppercase hover:bg-white"
            >
              Iniciar Consulta
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
