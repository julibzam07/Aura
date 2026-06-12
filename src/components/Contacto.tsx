import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, CheckCircle2, HelpCircle, X } from "lucide-react";

interface ContactoProps {
  isOpen: boolean;
  onClose: (fromPopstate?: boolean) => void;
}

export const Contacto: React.FC<ContactoProps> = ({ isOpen, onClose }) => {
  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
    honeypot: "", // Oculto para bots
    captchaAnswer: "", // Pregunta matemática
  });

  // Antispam metrics
  const [loadTime, setLoadTime] = useState<number>(0);
  const [mathChallenge, setMathChallenge] = useState({ num1: 0, num2: 0, sum: 0 });
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // References for accessibility and swipe gesture
  const panelContenedorRef = useRef<HTMLDivElement>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);

  // Swipe gesture variables
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [currentTranslateY, setCurrentTranslateY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Initialize math check and timestamp
  useEffect(() => {
    setLoadTime(Date.now());
    const n1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const n2 = Math.floor(Math.random() * 9) + 1;
    setMathChallenge({ num1: n1, num2: n2, sum: n1 + n2 });
  }, [isSuccess]);

  // iOS Safari compliant body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollPosY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosY}px`;
      document.body.style.width = "100%";
      document.body.setAttribute("data-scroll-offset", scrollPosY.toString());
    } else {
      const scrollPosStr = document.body.getAttribute("data-scroll-offset");
      if (scrollPosStr) {
        const scrollPos = parseInt(scrollPosStr, 10);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPos);
        document.body.removeAttribute("data-scroll-offset");
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Focus trap implementation
  useEffect(() => {
    if (isOpen) {
      prevActiveElement.current = document.activeElement as HTMLElement;
      // Focus first active input or close trigger safely
      setTimeout(() => {
        if (panelContenedorRef.current) {
          const inputs = panelContenedorRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (inputs.length > 0) {
            inputs[0].focus();
          }
        }
      }, 120);
    } else {
      if (prevActiveElement.current) {
        prevActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Popstate history listener for Android/Mobile physical back button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isOpen) {
        onClose(true); // Close consultation frame but prevent pushing popstate redundantly
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  // Escape key close listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Keyboard accessibility helper for trapping focus
  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab" && panelContenedorRef.current) {
      const tabbables = panelContenedorRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (tabbables.length === 0) return;

      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  // Swipe gesture touch handlers for mobile bottom sheet swipe-down gesture
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || touchStartY === null) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartY;
    if (deltaY > 0) {
      setCurrentTranslateY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentTranslateY > 100) {
      onClose();
    }
    setCurrentTranslateY(0);
    setTouchStartY(null);
  };

  // Input smooth visible focus view behavior triggered on mobile keyboard actions
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);
    setIsSending(true);

    // 1. Honeypot check
    if (formData.honeypot !== "") {
      console.warn("Spam detectado (honeypot ocupado).");
      setTimeout(() => {
        setIsSending(false);
        setIsSuccess(true);
      }, 1000);
      return;
    }

    // 2. Form completeness
    if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.email || !formData.mensaje) {
      setFormErrors("Por favor complete todos los campos obligatorios.");
      setIsSending(false);
      return;
    }

    // Email simple validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormErrors("Por favor ingrese un correo electrónico válido.");
      setIsSending(false);
      return;
    }

    // 3. Render fill time check (anti-spam)
    const timeTaken = (Date.now() - loadTime) / 1000;
    if (timeTaken < 3) {
      setFormErrors("Envío bloqueado por motivos de seguridad. Por favor intente nuevamente.");
      setIsSending(false);
      return;
    }

    // 4. Math Captcha verification
    if (parseInt(formData.captchaAnswer) !== mathChallenge.sum) {
      setFormErrors(`Respuesta de seguridad incorrecta. Calcule: ${mathChallenge.num1} + ${mathChallenge.num2}.`);
      setIsSending(false);
      return;
    }

    // Success Simulation
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        mensaje: "",
        honeypot: "",
        captchaAnswer: "",
      });
    }, 1500);
  };

  // Inline CSS transition controls and display logic
  return (
    <div
      id="consulta-marco-exterior"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consulta-titulo-id"
      aria-hidden={!isOpen}
      onKeyDown={handlePanelKeyDown}
      className={`fixed inset-0 bg-black/60 transition-opacity duration-250 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 select-none ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={(e) => {
        // Close if clicking outside internal dialog card box
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="consulta-cuerpo-principal"
        ref={panelContenedorRef}
        className={`w-full bg-marfil border-t md:border border-arena-medium/60 shadow-2xl relative flex flex-col transition-all duration-300 ease-out select-text
          /* Mobile takeover aspect ratio vs desktop box standard dimensions */
          h-[100dvh] md:h-auto max-h-[100dvh] md:max-h-[85vh]
          w-full md:max-w-[600px] md:rounded-sm
          ${isOpen ? "translate-y-0 opacity-100 md:scale-100" : "translate-y-full md:translate-y-4 opacity-0 md:scale-95"}
        `}
        style={{
          transform: currentTranslateY > 0 ? `translateY(${currentTranslateY}px)` : undefined,
        }}
      >
        {/* Swipe Handle Indicator for Mobile */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full py-4 flex md:hidden flex-col items-center justify-center cursor-clamp active:cursor-grabbing border-b border-arena-medium/40"
        >
          <div className="w-12 h-1.5 bg-arena-medium/70 rounded-full" />
          <span className="text-[8px] tracking-[0.2em] uppercase text-carbón-light/60 mt-2 font-mono">
            Deslizar para cerrar
          </span>
        </div>

        {/* X Close Trigger Button (48x48px target zone minimum) */}
        <button
          onClick={() => onClose()}
          id="boton-cerrar-consulta-panel"
          className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 flex items-center justify-center text-carbón/60 hover:text-carbón hover:bg-carbón/10 rounded-full transition-colors cursor-pointer z-50"
          aria-label="Cerrar panel de consulta"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container Panel Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-10 custom-scroll space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#73634c] font-bold mb-3 block">
              Consulte su futuro
            </span>
            <h2 id="consulta-titulo-id" className="flex flex-col leading-tight mb-8 select-none">
              <span className="font-normal text-3xl md:text-4xl tracking-wide text-carbón">
                Consulte
              </span>
              <span className="font-light italic text-2xl md:text-3xl tracking-wide text-carbón/60 mt-2">
                su futuro.
              </span>
            </h2>
          </div>

          <div className="h-px w-16 bg-carbón/20" />

          {/* New descriptive paragraph requested by customer */}
          <p className="font-sans font-light text-sm text-carbón-light/85 leading-relaxed text-left md:text-justify select-text">
            Nuestro equipo de ventas está a su disposición para coordinar visitas a la obra, ampliar información, consultar precios específicos de preventa y opciones de personalización de las residencias.
          </p>

          {/* Grid stack of contact fields conforming exactly to specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <a
              href="https://wa.me/50766237000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-xs font-medium tracking-wide text-carbón hover:text-carbón/80 transition-colors group p-3 bg-arena-light/50 border border-arena-medium/60 rounded-sm"
            >
              <div className="p-2.5 bg-arena-medium rounded-full border border-carbón/10 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 text-carbón animate-pulse" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-carbón-light/60 font-bold">Teléfono</p>
                <p className="text-xs font-bold font-mono tracking-wide">+507 6623-7000</p>
              </div>
            </a>

            <a
              href="mailto:ventas@itsaura.pa"
              className="flex items-center gap-4 text-xs font-medium tracking-wide text-carbón hover:text-carbón/80 transition-colors group p-3 bg-arena-light/50 border border-arena-medium/60 rounded-sm"
            >
              <div className="p-2.5 bg-arena-medium rounded-full border border-carbón/10 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4 text-carbón" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-carbón-light/60 font-bold">Correo Electrónico</p>
                <p className="text-xs font-bold font-mono">ventas@itsaura.pa</p>
              </div>
            </a>

            <div className="col-span-1 sm:col-span-2 flex items-center gap-4 text-xs text-carbón p-3 bg-arena-light/50 border border-arena-medium/60 rounded-sm">
              <div className="p-2.5 bg-arena-medium rounded-full border border-carbón/10">
                <MapPin className="w-4 h-4 text-carbón" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-carbón-light/60 font-bold">Obra</p>
                <p className="text-xs font-semibold font-serif leading-relaxed">
                  Ave Boulevard, PH Paradise Point Coronado, Nueva Gorgona, Panamá.
                </p>
              </div>
            </div>
          </div>

          {/* Form and Success flow */}
          <div className="border-t border-carbón/10 pt-6">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form-consulta-interior"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {formErrors && (
                    <div className="p-4 bg-red-950/40 border border-red-550/30 text-red-200 text-xs font-sans rounded">
                      {formErrors}
                    </div>
                  )}

                  {/* Honeypot helper */}
                  <div className="hidden">
                    <label htmlFor="consulta-bot-hp">Leave empty</label>
                    <input
                      id="consulta-bot-hp"
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      placeholder="Dejar vacío"
                      autoComplete="off"
                    />
                  </div>

                  {/* Name grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nombre" className="text-[10px] font-sans font-bold text-carbón-light/75 tracking-wider uppercase">
                        Nombre *
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        className="p-3 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-base text-carbón transition-colors rounded-sm"
                        placeholder="Ej. Román"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="apellido" className="text-[10px] font-sans font-bold text-carbón-light/75 tracking-wider uppercase">
                        Apellido *
                      </label>
                      <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        required
                        value={formData.apellido}
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        className="p-3 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-base text-carbón transition-colors rounded-sm"
                        placeholder="Ej. Torres"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  {/* Contact dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefono" className="text-[10px] font-sans font-bold text-carbón-light/75 tracking-wider uppercase">
                        Teléfono Móvil *
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        className="p-3 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-base text-carbón transition-colors rounded-sm"
                        placeholder="Ej. +507 6623-7000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-sans font-bold text-carbón-light/75 tracking-wider uppercase">
                        Correo Electrónico *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        className="p-3 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-base text-carbón transition-colors rounded-sm"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Detailed text area */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensaje" className="text-[10px] font-sans font-bold text-carbón-light/75 tracking-wider uppercase">
                      Mensaje / Su Consulta *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      value={formData.mensaje}
                      onFocus={handleInputFocus}
                      onChange={handleChange}
                      rows={4}
                      className="p-3 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-base text-carbón resize-none transition-colors rounded-sm"
                      placeholder="Escriba su consulta aquí..."
                    />
                  </div>

                  {/* Math safety mechanism */}
                  <div className="p-4 bg-arena-light border border-arena-medium/55 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-carbón" />
                      <span className="text-xs font-sans text-carbón-light/85 font-medium">
                        Control de Seguridad: ¿Cuánto es {mathChallenge.num1} + {mathChallenge.num2}?
                      </span>
                    </div>
                    <input
                      id="captchaAnswer"
                      type="number"
                      name="captchaAnswer"
                      required
                      value={formData.captchaAnswer}
                      onFocus={handleInputFocus}
                      onChange={handleChange}
                      placeholder="Resp."
                      className="w-20 p-2 bg-arena-light border border-arena-medium focus:outline-none focus:border-carbón text-center text-base text-carbón rounded"
                    />
                  </div>

                  {/* Submit frame */}
                  <div className="pt-2 flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                      id="form-envio-trigger"
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto px-10 py-4 bg-transparent text-carbón border border-carbón text-xs tracking-widest font-bold uppercase hover:bg-[#73634c] hover:text-marfil hover:border-[#73634c] disabled:border-carbón/30 disabled:text-carbón/40 transition-all duration-300 shadow cursor-pointer font-sans rounded-none"
                    >
                      {isSending ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="resultado-exito"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-8 px-4"
                >
                  <div className="p-4 bg-arena-medium text-carbón rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="font-serif text-2xl text-carbón mb-3 leading-tight font-medium">
                    Solicitud recibida correctamente
                  </h4>
                  <p className="font-sans font-light text-sm text-carbón-light/85 max-w-md leading-relaxed mb-6">
                    Agradecemos su interés en el proyecto AURA. Un representative se pondrá en contacto con Usted a la brevedad.
                  </p>
                  <div className="h-px bg-carbón/20 w-16 mb-6" />
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-transparent text-carbón border border-carbón uppercase text-xs tracking-widest font-bold hover:bg-[#73634c] hover:text-marfil hover:border-[#73634c] transition-all cursor-pointer shadow"
                  >
                    Hacer otra Consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Micro disclaimer footer block */}
          <div className="p-4 bg-arena-light/50 rounded border border-arena-medium/60">
            <p className="text-[9px] leading-relaxed text-carbón-light/70 font-sans font-medium">
              Al enviar esta solicitud usted autoriza de forma explícita a la promotora a ponerse en contacto para brindarle información sobre el proyecto residencial AURA bajo estricto tratamiento confidencial de privacidad de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
