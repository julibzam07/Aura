import React from "react";
import { motion } from "motion/react";

export const ProyectoIntro: React.FC = () => {
  return (
    <section id="proyecto" className="bg-arena-light pt-24 pb-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-arena-medium/40">
      {/* Decorative vertical coordinates alignment */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-arena-medium/30 pointer-events-none hidden xl:block" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Big elegant display title following the brochure split-design pattern */}
        <h2 className="flex flex-col items-center leading-tight mb-10 select-none">
          <span className="font-normal text-3xl sm:text-5xl md:text-6xl tracking-wide text-carbón">
            Donde termina
          </span>
          <span className="font-light italic text-2xl sm:text-4xl md:text-5xl tracking-wide text-carbón/60 mt-3">
            y empieza el mundo.
          </span>
        </h2>

        {/* Decorative divider separator */}
        <div className="w-12 h-[2px] bg-carbón/30 mb-8" />

        {/* Elegant paragraph block */}
        <p className="font-sans font-light text-base sm:text-lg md:text-xl text-carbón-light/80 leading-relaxed max-w-2xl">
          <strong className="font-bold text-carbón">Aura</strong> es la segunda fase del exclusivo desarrollo residencial <strong className="font-semibold text-carbón">Paradise Point Coronado</strong>, nuevo proyecto ubicado a minutos del mar, en una de las playas más exclusivas de Nueva Gorgona. Aquí podrá hallar la tranquilidad de la naturaleza sin prescindir de las facilidades y comodidades de la ciudad.
        </p>

        {/* Phase I clarification note */}
        <p className="font-sans font-light italic text-xs sm:text-sm text-carbón-light/60 leading-relaxed max-w-xl mt-6 tracking-wide">
          Actualmente se está desarrollando y comercializando la Fase I de Aura.
        </p>


      </div>
    </section>
  );
};
