import React from "react";
import { motion } from "motion/react";

export const ProyectoIntro: React.FC = () => {
  return (
    <section id="proyecto" className="bg-arena-light pt-24 pb-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-arena-medium/40">
      {/* Decorative vertical coordinates alignment */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-arena-medium/30 pointer-events-none hidden xl:block" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Big elegant display title */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-carbón leading-tight mb-8">
          Donde termina y empieza el mundo.
        </h2>

        {/* Decorative divider separator */}
        <div className="w-12 h-[2px] bg-carbón/30 mb-8" />

        {/* Elegant paragraph block */}
        <p className="font-sans font-light text-base sm:text-lg md:text-xl text-carbón-light/80 leading-relaxed max-w-2xl">
          <strong className="font-bold text-carbón">Aura</strong> es la segunda fase del exclusivo desarrollo residencial <strong className="font-semibold text-carbón">Paradise Point Coronado</strong>, nuevo proyecto ubicado a minutos del mar, en una de las playas más exclusivas de Nueva Gorgona. Aquí podrá hallar la tranquilidad de la naturaleza sin prescindir de las facilidades y comodidades de la ciudad.
        </p>


      </div>
    </section>
  );
};
