"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveLead } from "@/lib/supabase";

const WHATSAPP_NUMBER = "573007805902";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "downloading" | "success";

export const CatalogModal = ({ isOpen, onClose }: CatalogModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const isValid = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10;

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Por favor completa tu nombre y WhatsApp.");
      return;
    }
    setError("");
    setStep("downloading");

    // Guardar lead en Supabase (sin bloquear el flujo)
    saveLead({
      nombre: name.trim(),
      email: "",
      telefono: phone.replace(/\D/g, ""),
      tipo: "b2c",
      origen: "catalogo",
      mensaje: "Solicitud de catálogo PDF",
    }).catch(console.error);

    try {
      const response = await fetch("/api/catalogo/pdf");
      if (!response.ok) throw new Error("Error generando PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "DISA-Catalogo-Premium-2026.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF error:", err);
    }

    // Abrir WhatsApp con mensaje
    const msg = encodeURIComponent(
      `Hola DISA 👋 Soy ${name.trim()} y acabo de descargar su catálogo. Me gustaría recibir asesoría personalizada. Mi WhatsApp es ${phone}.`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 800);

    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setName("");
      setPhone("");
      setError("");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    // Portal directo — sin AnimatePresence para evitar problemas de z-index
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-disa-blue/75 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal centrado */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header navy */}
          <div className="relative bg-disa-blue px-8 pt-8 pb-10">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 text-xl leading-none"
              aria-label="Cerrar"
            >✕</button>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-disa-gold" />
              <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">Colección 2026</p>
            </div>
            <h2 className="text-white text-2xl font-black uppercase tracking-tight leading-tight">
              Catálogo Premium<br />
              <span className="text-disa-gold">DISA Textiles</span>
            </h2>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {step === "form" && (
              <div>
                <p className="text-disa-blue/55 text-sm font-light leading-relaxed mb-7">
                  Déjanos tu nombre y WhatsApp. Descargamos el catálogo completo
                  con fichas técnicas y precios, y te contactamos para asesorarte.
                </p>

                <div className="mb-5">
                  <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: María García"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    autoFocus
                    className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                  />
                </div>

                <div className="mb-7">
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
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="flex-1 bg-transparent outline-none text-disa-blue text-base font-medium placeholder:text-disa-blue/25"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Descargar catálogo PDF
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>

                <p className="text-disa-blue/25 text-[9px] text-center mt-4 tracking-wide">
                  Sin spam. Solo contenido de valor de DISA.
                </p>
              </div>
            )}

            {step === "downloading" && (
              <div className="text-center py-10">
                <div className="w-14 h-14 border-2 border-disa-gold/20 border-t-disa-gold rounded-full animate-spin mx-auto mb-6" />
                <p className="text-disa-blue text-sm font-medium">Generando tu catálogo...</p>
                <p className="text-disa-blue/40 text-xs mt-2">Esto toma unos segundos</p>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-disa-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-disa-gold text-3xl">✓</span>
                </div>
                <h3 className="text-disa-blue text-xl font-black uppercase tracking-tight mb-3">
                  ¡Catálogo descargado!
                </h3>
                <p className="text-disa-blue/55 text-sm font-light leading-relaxed mb-8 max-w-xs mx-auto">
                  El PDF se descargó en tu dispositivo. También abrimos
                  WhatsApp para conectarte con nuestro equipo.
                </p>
                <button
                  onClick={handleClose}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-disa-blue/35 hover:text-disa-blue transition-colors"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};