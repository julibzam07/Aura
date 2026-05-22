import React from "react";
import { motion } from "motion/react";

export const ProyectoIntro: React.FC = () => {
  return (
    <section id="proyecto" className="bg-black pt-24 pb-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-arena-medium/10">
      {/* Decorative vertical coordinates alignment */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-arena-medium/10 pointer-events-none hidden xl:block" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Big elegant display title */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-marfil leading-tight mb-8">
          Donde termina y empieza el mundo.
        </h2>

        {/* Decorative divider separator */}
        <div className="w-12 h-[2px] bg-arena-medium/60 mb-8" />

        {/* Elegant paragraph block */}
        <p className="font-sans font-light text-base sm:text-lg md:text-xl text-marfil/85 leading-relaxed max-w-2xl">
          <strong className="font-semibold text-arena-medium">Aura</strong> es la segunda fase del exclusivo desarrollo residencial <strong className="font-medium text-marfil">Paradise Point Coronado</strong>, nuevo proyecto ubicado a minutos del mar, en una de las playas más exclusivas de Nueva Gorgona. Aquí podrá hallar la tranquilidad de la naturaleza sin prescindir de las facilidades y comodidades de la ciudad.
        </p>

        {/* Secondary editorial detail block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-16 pt-12 border-t border-arena-medium/20 w-full max-w-3xl">
          <div>
            <p className="text-[10px] font-sans tracking-widest text-arena-medium uppercase font-semibold">UBICACIÓN</p>
            <p className="font-serif text-sm text-marfil/80 mt-1">Nueva Gorgona, Panamá</p>
          </div>
          <div>
            <p className="text-[10px] font-sans tracking-widest text-arena-medium uppercase font-semibold">DISTANCIA AL MAR</p>
            <p className="font-serif text-sm text-marfil/80 mt-1">A minutos caminando</p>
          </div>
          <div>
            <p className="text-[10px] font-sans tracking-widest text-arena-medium uppercase font-semibold">DENSIDAD</p>
            <p className="font-serif text-sm text-marfil/80 mt-1">Solo 44 residencias</p>
          </div>
        </div>
      </div>
    </section>
  );
};
