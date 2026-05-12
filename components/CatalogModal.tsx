"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLead } from "@/lib/supabase";

const WHATSAPP_BUSINESS = "573007805902";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "success";

export const CatalogModal = ({ isOpen, onClose }: CatalogModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidPhone = phone.replace(/\D/g, "").length >= 10;

  const handleSubmit = async () => {
    if (!isValidPhone || !name.trim()) {
      setError("Por favor completa tu nombre y número de WhatsApp.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Guarda el lead en Supabase
      await saveLead({
        nombre: name.trim(),
        email: "",
        telefono: phone.replace(/\D/g, ""),
        tipo: "b2c",
        origen: "catalogo",
        mensaje: "Solicitud de catálogo PDF",
      });
    } catch {
      // Continúa aunque falle Supabase — el flujo de WA es lo crítico
    }

    setLoading(false);

    // Mensaje pre-cargado para WhatsApp
    const waMessage = encodeURIComponent(
      `Hola DISA 👋 Soy ${name.trim()} y me gustaría recibir el catálogo completo de sus colecciones de cortinas y persianas. Mi número es ${phone}. ¡Gracias!`
    );
    const waUrl = `https://wa.me/${WHATSAPP_BUSINESS}?text=${waMessage}`;

    // Abre WhatsApp en nueva pestaña
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setPhone("");
      setName("");
      setError("");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-disa-blue/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[201] w-auto md:w-full md:max-w-lg bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen de fondo */}
            <div className="relative h-40 bg-disa-blue overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-disa-blue to-disa-blue-mid" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-px w-8 bg-disa-gold" />
                  <span className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                    Colección 2026
                  </span>
                </div>
                <h2 className="text-white text-2xl font-black uppercase tracking-tight leading-tight">
                  Catálogo Premium <br />
                  <span className="text-disa-gold">DISA Textiles</span>
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-xl leading-none p-1"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-disa-blue/60 text-sm font-light leading-relaxed mb-8">
                      Déjanos tu nombre y WhatsApp. Te enviamos el catálogo
                      completo con todas nuestras colecciones, fichas técnicas
                      y precios.
                    </p>

                    {/* Campo nombre */}
                    <div className="mb-5">
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: María García"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(""); }}
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                        autoFocus
                      />
                    </div>

                    {/* Campo WhatsApp */}
                    <div className="mb-6">
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                        Tu WhatsApp
                      </label>
                      <div className="flex items-center border-b border-disa-blue/15 focus-within:border-disa-gold transition-colors pb-2">
                        <span className="text-disa-blue/40 text-sm font-medium mr-2">+57</span>
                        <input
                          type="tel"
                          placeholder="300 780 5902"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setError(""); }}
                          className="flex-1 bg-transparent outline-none text-disa-blue text-base font-medium placeholder:text-disa-blue/25"
                          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs mb-4">{error}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    >
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          Recibir catálogo por WhatsApp
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </button>

                    <p className="text-disa-blue/30 text-[9px] text-center mt-4 tracking-wide">
                      Sin spam. Solo contenido de valor de DISA.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-disa-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-disa-gold text-3xl">✓</span>
                    </div>
                    <h3 className="text-disa-blue text-xl font-black uppercase tracking-tight mb-3">
                      ¡Listo!
                    </h3>
                    <p className="text-disa-blue/60 text-sm font-light leading-relaxed mb-8">
                      Se abrió WhatsApp con un mensaje pre-cargado. Envíalo
                      y te hacemos llegar el catálogo completo en minutos.
                    </p>
                    <button
                      onClick={handleClose}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-disa-blue/40 hover:text-disa-blue transition-colors"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};