import React from "react";
const renderFachadas = "/assets/modelos/16-2.jpg";

export const Diseno: React.FC = () => {
  return (
    <section id="diseno" className="bg-arena-medium py-20 md:py-32 px-6 md:px-12 relative border-t border-arena-light/20 text-carbón">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Descriptive Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <h2 className="flex flex-col leading-tight mb-8 select-none">
              <span className="font-normal text-3xl sm:text-4xl md:text-5xl tracking-wide text-carbón" data-reveal="fade-up">
                Todos los detalles.
              </span>
              <span className="font-light italic text-2xl sm:text-3xl md:text-4xl tracking-wide text-carbón/60 mt-2.5" data-reveal="fade-up" data-reveal-delay="150">
                El detalle.
               </span>
            </h2>

            <p className="font-sans font-light text-sm md:text-base text-carbón-light/80 leading-relaxed" data-reveal="fade-up" data-reveal-duration="700" data-reveal-delay="250">
              El proyecto está conformado por <strong className="font-semibold text-carbón">43 residencias de dos niveles</strong>, diseñadas con amplios espacios familiares que incluyen <strong className="font-semibold text-carbón">4 habitaciones, 3 baños, sala, comedor, cocina y lavandería</strong>.
            </p>
          </div>

          {/* Right Column: Prominent Architectural Render Image */}
          <div className="lg:col-span-7 flex flex-col justify-center" data-reveal="slide-in-right" data-reveal-duration="1200">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#73634c]/10 bg-[#121514] shadow-2xl group">
             <img
                src={renderFachadas}
                alt="Diseño arquitectónico de las fachadas de Aura"
                className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>

        {/* Architectural Quote Box - Elegant, full width single column style */}
        <div className="w-full max-w-4xl mx-auto mt-6" data-reveal="fade-up">
          <div className="relative border-l-2 border-[#73634c]/60 bg-marfil p-8 md:p-12 rounded-r-lg shadow-sm overflow-hidden md:overflow-visible">
            
            <div className="font-sans italic text-sm md:text-base text-carbón-light/80 leading-relaxed mb-6 space-y-4 relative z-10 pl-2">
              <p>
                <span className="relative inline-block font-sans text-7xl md:text-8xl text-[#73634c]/35 select-none pointer-events-none leading-none h-0 -top-5 md:-top-7 mr-2 md:mr-3 align-top">
                  “
                </span>
                El proyecto ha sido cuidadosamente diseñado para ofrecer una experiencia residencial relajada, elegante y funcional, enfocada en el bienestar y la conexión con lo natural, utilizando líneas limpias, proporciones modernas y una paleta de materiales cálidos y naturales que evocan la serenidad propia del entorno.
              </p>
              <p>
                Cada unidad ha sido diseñada para maximizar la iluminación natural, la ventilación cruzada y la integración visual con las áreas verdes y espacios exteriores.
              </p>
              <p className="leading-relaxed">
                El masterplan prioriza la escala humana, la privacidad y el paisaje, generando calles internas arboladas, espacios abiertos y una atmósfera residencial sofisticada y, al mismo tiempo, acogedora. Cada elemento del proyecto ha sido pensado para crear un balance entre arquitectura, confort y naturaleza.”
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10 pl-2">
              <div className="w-10 h-10 rounded-full bg-black text-marfil flex items-center justify-center font-sans text-xs font-semibold border border-arena-medium/20">
                JGM
              </div>
              <div>
                <h5 className="font-sans font-semibold text-xs text-carbón leading-none tracking-wider">
                  Arq. Joseph Gazal Michaan
                </h5>
                <p className="text-[10px] font-sans tracking-wide text-carbón/60 uppercase mt-1">
                  Director Asociado, CGO
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
