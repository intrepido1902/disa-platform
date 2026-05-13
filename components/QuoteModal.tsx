"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLead } from "@/lib/supabase";

const WHATSAPP_NUMBER = "573007805902";

const PRODUCTOS_LISTA = [
  "Screen Sun Control",
  "Screen Solar Plus",
  "Cortina Blackout Pro",
  "Sheer Elegance",
  "Lino Toscana",
  "Roller Premium",
  "Otro / No sé aún",
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "success";

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    tipo: "b2c" as "b2c" | "b2b",
    producto: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const isValid =
    form.nombre.trim().length > 1 &&
    form.email.includes("@") &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    form.producto !== "";

  const handleSubmit = async () => {
    if (!isValid) { setError("Por favor completa todos los campos."); return; }
    setLoading(true);
    try {
      await saveLead({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.whatsapp.replace(/\D/g, ""),
        tipo: form.tipo,
        origen: "cotizador",
        mensaje: `Producto de interés: ${form.producto}`,
      });
    } catch { /* continúa */ }
    setLoading(false);
    const msg = encodeURIComponent(
      `Hola DISA 👋 Soy ${form.nombre.trim()} y me gustaría cotizar *${form.producto}* para un proyecto ${
        form.tipo === "b2b" ? "corporativo" : "residencial"
      }. Email: ${form.email.trim()} · WhatsApp: ${form.whatsapp}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setForm({ nombre: "", email: "", whatsapp: "", tipo: "b2c", producto: "" });
      setError("");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-disa-blue/75 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Wrapper scrollable */}
      <div
        className="absolute inset-0 overflow-y-auto py-6 px-4 flex items-start justify-center"
        style={{ paddingTop: "5vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl bg-white overflow-hidden shadow-2xl mb-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header navy */}
          <div className="relative bg-disa-blue px-8 pt-8 pb-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl leading-none"
              aria-label="Cerrar"
            >✕</button>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-disa-gold" />
              <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">Cotización Premium</p>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Cuéntanos tu<br />
              <span className="text-disa-gold">proyecto.</span>
            </h2>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Nombre */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: María García"
                      value={form.nombre}
                      onChange={(e) => update("nombre", e.target.value)}
                      autoFocus
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                      WhatsApp *
                    </label>
                    <div className="flex items-center border-b border-disa-blue/15 focus-within:border-disa-gold transition-colors pb-2">
                      <span className="text-disa-blue/40 text-sm font-medium mr-2">+57</span>
                      <input
                        type="tel"
                        placeholder="300 780 5902"
                        value={form.whatsapp}
                        onChange={(e) => update("whatsapp", e.target.value)}
                        className="flex-1 bg-transparent outline-none text-disa-blue text-base font-medium placeholder:text-disa-blue/25"
                      />
                    </div>
                  </div>

                  {/* Tipo proyecto */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Tipo de proyecto *
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: "b2c", label: "Hogar / Residencial" },
                        { value: "b2b", label: "Empresa / Corporativo" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => update("tipo", value)}
                          className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                            form.tipo === value
                              ? "border-disa-gold bg-disa-gold text-white"
                              : "border-disa-blue/15 text-disa-blue/50 hover:border-disa-blue/30"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Producto */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Producto de interés *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTOS_LISTA.map((p) => (
                        <button
                          key={p}
                          onClick={() => update("producto", p)}
                          className={`py-2.5 px-3 text-left text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                            form.producto === p
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3 group"
                  >
                    {loading ? "Enviando..." : (
                      <>
                        Solicitar cotización por WhatsApp
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-disa-blue/25 text-[9px] text-center tracking-wide pb-2">
                    Respuesta garantizada en menos de 24 horas.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-disa-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-disa-gold text-3xl">✓</span>
                  </div>
                  <h3 className="text-disa-blue text-xl font-black uppercase tracking-tight mb-3">
                    ¡Solicitud enviada!
                  </h3>
                  <p className="text-disa-blue/55 text-sm font-light leading-relaxed mb-8 max-w-xs mx-auto">
                    Se abrió WhatsApp con tu información. Nuestro equipo te
                    contactará con la cotización personalizada.
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-disa-blue/35 hover:text-disa-blue transition-colors"
                  >
                    Cerrar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};