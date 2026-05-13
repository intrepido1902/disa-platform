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
  "Varias referencias",
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productoPreseleccionado?: string;
}

type Step = "form" | "success";
type TipoCliente = "distribuidor" | "taller" | "mayorista" | "consumidor";

export const QuoteModal = ({ isOpen, onClose, productoPreseleccionado }: QuoteModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    nit: "",
    whatsapp: "",
    email: "",
    tipo: "" as TipoCliente | "",
    producto: productoPreseleccionado ?? "",
    metros: "",
    ciudad: "",
  });

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const isValid =
    form.nombre.trim().length > 1 &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    form.tipo !== "" &&
    form.producto !== "";

  const handleSubmit = async () => {
    if (!isValid) { setError("Por favor completa los campos obligatorios."); return; }
    setLoading(true);

    const esB2B = form.tipo !== "consumidor";
    const metrosInfo = form.metros ? ` · ${form.metros} metros aprox.` : "";
    const empresaInfo = form.empresa ? ` · Empresa: ${form.empresa}` : "";
    const nitInfo = form.nit ? ` · NIT: ${form.nit}` : "";
    const ciudadInfo = form.ciudad ? ` · Ciudad: ${form.ciudad}` : "";

    try {
      await saveLead({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.whatsapp.replace(/\D/g, ""),
        empresa: form.empresa || undefined,
        tipo: esB2B ? "b2b" : "b2c",
        origen: "cotizador",
        mensaje: `Tipo: ${form.tipo} · Producto: ${form.producto}${metrosInfo}${empresaInfo}${nitInfo}${ciudadInfo}`,
      });
    } catch { /* continúa */ }

    setLoading(false);

    const msg = encodeURIComponent(
      `Hola DISA 👋 Soy ${form.nombre.trim()}${form.empresa ? ` de ${form.empresa}` : ""}${form.nit ? ` (NIT: ${form.nit})` : ""}.\n\n` +
      `Somos ${form.tipo} y nos interesa cotizar *${form.producto}*${form.metros ? ` — aprox. ${form.metros} metros` : ""}.\n\n` +
      `${form.ciudad ? `Ciudad: ${form.ciudad}\n` : ""}` +
      `WhatsApp: ${form.whatsapp}${form.email ? `\nEmail: ${form.email}` : ""}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setForm({ nombre: "", empresa: "", nit: "", whatsapp: "", email: "", tipo: "", producto: productoPreseleccionado ?? "", metros: "", ciudad: "" });
      setError("");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-disa-blue/75 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center px-4" style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl bg-white overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-disa-blue px-8 pt-8 pb-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl leading-none"
            >✕</button>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-disa-gold" />
              <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">Cotización B2B</p>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Cuéntanos tu <br />
              <span className="text-disa-gold">requerimiento.</span>
            </h2>
            <p className="text-white/40 text-xs font-light mt-2">
              Respuesta garantizada en menos de 2 horas hábiles.
            </p>
          </div>

          <div className="px-8 py-7">
            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">

                  {/* Tipo de cliente */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Soy... *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "distribuidor", label: "Distribuidor" },
                        { value: "taller", label: "Taller / Fabricante" },
                        { value: "mayorista", label: "Mayorista" },
                        { value: "consumidor", label: "Cliente final" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => update("tipo", value)}
                          className={`py-2.5 px-3 text-left text-[9px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 ${
                            form.tipo === value
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >{label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Nombre */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Nombre *</label>
                    <input type="text" placeholder="Tu nombre"
                      value={form.nombre} onChange={(e) => update("nombre", e.target.value)} autoFocus
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {/* Empresa + NIT (solo si no es consumidor) */}
                  {form.tipo && form.tipo !== "consumidor" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Empresa</label>
                        <input type="text" placeholder="Nombre empresa"
                          value={form.empresa} onChange={(e) => update("empresa", e.target.value)}
                          className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">NIT</label>
                        <input type="text" placeholder="900.000.000-0"
                          value={form.nit} onChange={(e) => update("nit", e.target.value)}
                          className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                        />
                      </div>
                    </div>
                  )}

                  {/* Ciudad */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Ciudad</label>
                    <input type="text" placeholder="Bogotá, Medellín..."
                      value={form.ciudad} onChange={(e) => update("ciudad", e.target.value)}
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">WhatsApp *</label>
                    <div className="flex items-center border-b border-disa-blue/15 focus-within:border-disa-gold transition-colors pb-2">
                      <span className="text-disa-blue/40 text-sm font-medium mr-2">+57</span>
                      <input type="tel" placeholder="300 780 5902"
                        value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)}
                        className="flex-1 bg-transparent outline-none text-disa-blue text-base font-medium placeholder:text-disa-blue/25"
                      />
                    </div>
                  </div>

                  {/* Producto de interés */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">Referencia de interés *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTOS_LISTA.map((p) => (
                        <button key={p} onClick={() => update("producto", p)}
                          className={`py-2.5 px-3 text-left text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                            form.producto === p
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >{p}</button>
                      ))}
                    </div>
                  </div>

                  {/* Metros estimados */}
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                      Metros lineales estimados
                    </label>
                    <input type="number" placeholder="Ej: 50"
                      value={form.metros} onChange={(e) => update("metros", e.target.value)}
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                    <p className="text-disa-blue/30 text-[9px] mt-1">
                      +20m: 5% dto · +50m: 10% dto · +100m: 15% dto
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3 group"
                  >
                    {loading ? "Enviando..." : (
                      <>Solicitar cotización por WhatsApp
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                  <div className="w-16 h-16 bg-disa-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-disa-gold text-3xl">✓</span>
                  </div>
                  <h3 className="text-disa-blue text-xl font-black uppercase tracking-tight mb-3">¡Solicitud enviada!</h3>
                  <p className="text-disa-blue/55 text-sm font-light leading-relaxed mb-8 max-w-xs mx-auto">
                    Abrimos WhatsApp con tu información. Un asesor te contactará con la cotización en menos de 2 horas hábiles.
                  </p>
                  <button onClick={handleClose} className="text-[10px] font-bold uppercase tracking-[0.3em] text-disa-blue/35 hover:text-disa-blue transition-colors">
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