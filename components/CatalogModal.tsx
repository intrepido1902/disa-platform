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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10;

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Por favor completa tu nombre y WhatsApp.");
      return;
    }
    setLoading(true);
    setError("");
    setStep("downloading");

    // Guardar lead en paralelo mientras descarga el PDF
    saveLead({
      nombre: name.trim(),
      email: "",
      telefono: phone.replace(/\D/g, ""),
      tipo: "b2c",
      origen: "catalogo",
      mensaje: "Solicitud de catálogo PDF",
    }).catch(console.error);

    try {
      // Descargar el PDF desde el API route
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

      // Abrir WhatsApp con mensaje post-descarga
      const msg = encodeURIComponent(
        `Hola DISA 👋 Soy ${name.trim()} y acabo de descargar su catálogo. Me gustaría recibir asesoría personalizada. Mi WhatsApp es ${phone}.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
      }, 1500);

      setStep("success");
    } catch {
      // Si falla la generación del PDF, igual abrimos WhatsApp
      const msg = encodeURIComponent(
        `Hola DISA 👋 Soy ${name.trim()} y solicito el catálogo completo. Mi WhatsApp es ${phone}.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
      setStep("success");
    }

    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setName("");
      setPhone("");
      setError("");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-disa-blue/70 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-[201] bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-disa-blue px-8 pt-8 pb-10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 text-xl"
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

            <div className="px-8 py-8">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
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
                      disabled={loading}
                      className="w-full bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3 group"
                    >
                      Descargar catálogo PDF →
                    </button>

                    <p className="text-disa-blue/25 text-[9px] text-center mt-4 tracking-wide">
                      Sin spam. Solo contenido de valor de DISA.
                    </p>
                  </motion.div>
                )}

                {step === "downloading" && (
                  <motion.div
                    key="downloading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 border-2 border-disa-gold/20 border-t-disa-gold rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-disa-blue text-sm font-medium">Generando tu catálogo...</p>
                    <p className="text-disa-blue/40 text-xs mt-2">Esto toma unos segundos</p>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
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