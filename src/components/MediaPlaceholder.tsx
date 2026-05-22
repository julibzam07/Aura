import React from "react";
import { Maximize2, Play, Compass, FileText, MapPin, Eye } from "lucide-react";

interface MediaPlaceholderProps {
  type: "video-hero" | "video-architect" | "plan" | "interior" | "exterior" | "360" | "lifestyle" | "map";
  label: string;
  sublabel?: string;
  height?: string;
  className?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type,
  label,
  sublabel = "",
  height = "h-[450px]",
  className = "",
}) => {
  // Config visually based on type
  const getTheme = () => {
    switch (type) {
      case "video-hero":
        return {
          bg: "bg-gradient-to-tr from-carbón via-carbón-light to-[#1F2729]",
          icon: <Play className="w-12 h-12 text-arena-medium/80 stroke-[1]" />,
          badge: "VIDEO CABECERA 4K",
          desc: "Hacer click para simular reproducción. Insertar video_hero.mp4 (16:9, sin audio, loop).",
        };
      case "video-architect":
        return {
          bg: "bg-[#1E2221]",
          icon: <Play className="w-10 h-10 text-[#7C8578] stroke-[1.2]" />,
          badge: "VIDEO ARQUITECTO",
          desc: "Presentación del arquitecto / Renders de diseño. Insertar video_entrevista.mp4.",
        };
      case "plan":
        return {
          bg: "bg-[#F3EFE7]",
          icon: <FileText className="w-8 h-8 text-océano/55 stroke-[1.2]" />,
          badge: "PLANO ARQUITECTÓNICO",
          desc: "Planos de planta escala 1:100. Insertar plano_vivienda.png o SVG interactivo.",
        };
      case "360":
        return {
          bg: "bg-gradient-to-b from-[#1C1F20] to-carbón",
          icon: <Compass className="w-10 h-10 text-arena-medium/70 uppercase stroke-[1] animate-pulse" />,
          badge: "RECORRIDO VIRTUAL 360°",
          desc: "Iframe interactivo Matterport / Kuula. Insertar código iframe proporcionado por el proveedor.",
        };
      case "map":
        return {
          bg: "bg-arena-light",
          icon: <MapPin className="w-8 h-8 text-océano/70 stroke-[1.2]" />,
          badge: "UBICACIÓN AURA",
          desc: "IFrame interactivo de Google Maps. Coronado / Nueva Gorgona, Panamá.",
        };
      case "interior":
      case "exterior":
        return {
          bg: "bg-[#EDEDEC] border border-[#E9E9E7]",
          icon: <Eye className="w-8 h-8 text-océano/40 stroke-[1.2]" />,
          badge: type === "interior" ? "RENDER INTERIOR" : "RENDER EXTERIOR",
          desc: "Reemplazar con render JPG full-res. Sugerencia: 2400x1600px optimizado para web.",
        };
      case "lifestyle":
      default:
        return {
          bg: "bg-[#EAE6DD]",
          icon: <Maximize2 className="w-8 h-8 text-océano/40 stroke-[1.2]" />,
          badge: "FOTO ESTILO DE VIDA",
          desc: "Reemplazar con fotografía de la zona, playa Coronado o Beach Club.",
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`relative w-full ${height} overflow-hidden group flex flex-col justify-between p-6 md:p-8 font-sans ${theme.bg} transition-all duration-700 ease-out ${className}`}
    >
      {/* Abstract architectural grid lines overlaid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-current" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-current" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-current" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-current" />
        {/* Circle representing sun or camera focal center */}
        <div className="absolute w-44 h-44 rounded-full border border-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>

      {/* Decorative compass lines in corners */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-current opacity-20 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-current opacity-20 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-current opacity-20 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-current opacity-20 pointer-events-none" />

      {/* Top section: badge & technical notes */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] tracking-[0.25em] font-medium uppercase px-3 py-1 bg-marfil/80 backdrop-blur-sm text-carbón border border-arena-medium/20">
          {theme.badge}
        </span>
        <span className="text-[9px] font-mono opacity-40 text-current hidden sm:inline-block">
          REV // 2026_01A
        </span>
      </div>

      {/* Middle section: central interactive prompt */}
      <div className="flex flex-col items-center justify-center text-center my-auto py-4 z-10">
        <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110">
          {theme.icon}
        </div>
        <h4 className="font-serif text-lg md:text-xl tracking-wide text-current px-4">
          {label}
        </h4>
        {sublabel && (
          <p className="text-xs tracking-[0.1em] opacity-60 mt-1 uppercase">
            {sublabel}
          </p>
        )}
      </div>

      {/* Bottom section: details & placement instruction */}
      <div className="border-t border-current/10 pt-4 z-10 flex flex-col md:flex-row md:items-end justify-between gap-2 mt-auto">
        <div className="max-w-md">
          <p className="text-[10px] uppercase tracking-[0.15em] opacity-40 leading-relaxed font-semibold">
            Especificación de archivo:
          </p>
          <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed italic">
            {theme.desc}
          </p>
        </div>
        <div className="text-right text-[10px] font-mono opacity-50">
          COORDINATES: 8.4419° N, 79.8519° W
        </div>
      </div>

      {/* Elegant dark overlay on hover to make it feel premium */}
      <div className="absolute inset-0 bg-current/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
