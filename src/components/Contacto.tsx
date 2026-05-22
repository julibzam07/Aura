import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck, HelpCircle } from "lucide-react";

interface ContactoProps {
  onBackToHome?: () => void;
}

export const Contacto: React.FC<ContactoProps> = ({ onBackToHome }) => {
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

  // Initialize math check and timestamp
  useEffect(() => {
    setLoadTime(Date.now());
    const n1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const n2 = Math.floor(Math.random() * 9) + 1;
    setMathChallenge({ num1: n1, num2: n2, sum: n1 + n2 });
  }, [isSuccess]);

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
      // Simulate normal wait but reject silently to frustrate bots
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
      // Too fast - human wouldn't submit in less than 3 seconds
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
      // Reset details
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

  return (
    <section id="contacto" className="bg-black min-h-screen py-24 md:py-32 px-6 md:px-12 relative flex items-center text-white border-t border-arena-medium/10">
      {/* Background decoration lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute left-[30%] top-0 bottom-0 w-px bg-arena-medium" />
        <div className="absolute right-[30%] top-0 bottom-0 w-px bg-arena-medium" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Design Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Premium Concierge Welcome */}
          <div className="lg:col-span-5 space-y-8 lg:pr-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-arena-medium font-semibold mb-4 block">
                CONSIDERACIONES ADICIONALES
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-marfil leading-tight mb-6">
                Consideraciones adicionales.
              </h2>
            </div>

            <div className="h-px w-20 bg-arena-medium" />

            <p className="font-sans font-light text-sm text-marfil/80 leading-relaxed">
              Nuestro equipo de conserjería residencial y ventas premium está a su entera disposición para coordinar visitas privadas de obra, detallar precios específicos de preventa de Paradise Point Fase II y atender dudas de diseño opcional.
            </p>

            {/* Direct contact channels */}
            <div className="space-y-4 pt-4">
              <a href="tel:+50766237000" className="flex items-center gap-4 text-xs font-medium tracking-wide text-marfil hover:text-arena-medium transition-colors group">
                <div className="p-3 bg-black rounded-full border border-arena-medium/25 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 text-arena-medium" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-marfil/50">Teléfono Directo</p>
                  <p className="text-sm font-semibold">+507 6623-7000</p>
                </div>
              </a>

              <a href="mailto:ventas@itsaura.pa" className="flex items-center gap-4 text-xs font-medium tracking-wide text-marfil hover:text-arena-medium transition-colors group">
                <div className="p-3 bg-black rounded-full border border-arena-medium/25 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 text-arena-medium" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-marfil/50">Correo Electrónico</p>
                  <p className="text-sm font-semibold">ventas@itsaura.pa</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-xs text-marfil group">
                <div className="p-3 bg-black rounded-full border border-arena-medium/25">
                  <MapPin className="w-4 h-4 text-arena-medium" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-marfil/50">Oficinas / Obra</p>
                  <p className="text-sm font-serif">PH Paradise Point, Nueva Gorgona, Panamá</p>
                </div>
              </div>
            </div>

            {/* Micro-legal disclaimer */}
            <div className="p-4 bg-[#0B0D0D] rounded border border-arena-medium/15">
              <p className="text-[10px] leading-relaxed text-marfil/60">
                Al enviar esta solicitud usted autoriza de forma explícita a la promotora a ponerse en contacto para brindarle información sobre el proyecto residencial AURA bajo estricto tratamiento confidencial de privacidad de datos.
              </p>
            </div>
          </div>

          {/* Right: Premium Form Sheet */}
          <div className="lg:col-span-7 bg-[#0B0D0D] p-6 sm:p-10 border border-arena-medium/15 shadow-xl rounded-sm">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {formErrors && (
                    <div className="p-4 bg-red-950/40 border border-red-550/30 text-red-200 text-xs font-sans rounded">
                      {formErrors}
                    </div>
                  )}

                  {/* Honeypot field (hidden for users, only visible to auto-filling spam bots) */}
                  <div className="hidden">
                    <label htmlFor="honeypot">No complete este campo si es un ser humano</label>
                    <input
                      id="honeypot"
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      placeholder="Dejar vacío"
                      autoComplete="off"
                    />
                  </div>

                  {/* Name group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nombre" className="text-[10px] font-sans font-semibold text-marfil/60 tracking-wider uppercase">
                        Nombre *
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="p-3 bg-black border border-arena-medium/20 focus:outline-none focus:border-arena-medium text-sm text-marfil transition-colors rounded-sm"
                        placeholder="Ej. Juan"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="apellido" className="text-[10px] font-sans font-semibold text-marfil/60 tracking-wider uppercase">
                        Apellido *
                      </label>
                      <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        required
                        value={formData.apellido}
                        onChange={handleChange}
                        className="p-3 bg-black border border-arena-medium/20 focus:outline-none focus:border-arena-medium text-sm text-marfil transition-colors rounded-sm"
                        placeholder="Ej. Pérez"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  {/* Contact channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefono" className="text-[10px] font-sans font-semibold text-marfil/60 tracking-wider uppercase">
                        Teléfono Móvil *
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="p-3 bg-black border border-arena-medium/20 focus:outline-none focus:border-arena-medium text-sm text-marfil transition-colors rounded-sm"
                        placeholder="Ej. +507 6623-7000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-sans font-semibold text-marfil/60 tracking-wider uppercase">
                        Correo Electrónico *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 bg-black border border-arena-medium/20 focus:outline-none focus:border-arena-medium text-sm text-marfil transition-colors rounded-sm"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensaje" className="text-[10px] font-sans font-semibold text-marfil/60 tracking-wider uppercase">
                      Mensaje / Su Consulta *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={4}
                      className="p-3 bg-black border border-arena-medium/20 focus:outline-none focus:border-arena-medium text-sm text-marfil resize-none transition-colors rounded-sm"
                      placeholder="Escriba su consulta... Me interesa el modelo de casa AURA con piscina privada y bohío."
                    />
                  </div>

                  {/* Security Math Questions Check (Anti-Spam validation) */}
                  <div className="p-4 bg-black border border-arena-medium/15 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-arena-medium" />
                      <span className="text-xs font-sans text-marfil/75 font-medium">
                        Control de Seguridad: ¿Cuánto es {mathChallenge.num1} + {mathChallenge.num2}?
                      </span>
                    </div>
                    <input
                      id="captchaAnswer"
                      type="number"
                      name="captchaAnswer"
                      required
                      value={formData.captchaAnswer}
                      onChange={handleChange}
                      placeholder="Resp."
                      className="w-20 p-1.5 bg-black border border-arena-medium/30 focus:outline-none focus:border-arena-medium text-center text-xs text-marfil rounded"
                    />
                  </div>

                  {/* Submit buttons block */}
                  <div className="pt-4 flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                      id="submit-form-btn"
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto px-8 py-3.5 bg-arena-medium text-black text-xs tracking-widest font-semibold uppercase hover:bg-white disabled:bg-arena-medium/55 transition-all duration-300 shadow cursor-pointer font-sans"
                    >
                      {isSending ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="p-4 bg-arena-medium text-black rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl text-marfil mb-3">
                    Solicitud Recibida Correctamente
                  </h4>
                  <p className="font-sans font-light text-sm text-marfil/75 max-w-md leading-relaxed mb-6">
                    Estimado/a, agradecemos su interés en el residencial de playa <strong className="font-medium text-marfil">AURA</strong>. Un experto se pondrá en contacto al teléfono brindado en las próximas horas para enviarle el Dossier técnico de preventa.
                  </p>
                  <div className="h-px bg-arena-medium/40 w-16 mb-6" />
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-arena-medium text-black uppercase text-xs tracking-widest font-semibold hover:bg-white transition-transform cursor-pointer"
                  >
                    Hacer otra Consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
