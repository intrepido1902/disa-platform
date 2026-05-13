"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseClient } from "@/lib/supabase";

const WHATSAPP_NUMBER = "573007805902";

const TIPOS_EMPRESA = [
  { value: "taller",        label: "Taller de cortinas" },
  { value: "fabricante",    label: "Fabricante" },
  { value: "distribuidor",  label: "Distribuidor" },
  { value: "mayorista",     label: "Mayorista" },
  { value: "decorador",     label: "Decorador / Interiorista" },
];

const REFERENCIAS = [
  "Screen Sun Control",
  "Screen Solar Plus",
  "Cortina Blackout Pro",
  "Sheer Elegance",
  "Lino Toscana",
  "Roller Premium",
  "Todas las líneas",
];

const VOLUMENES = [
  "Menos de 20m/mes",
  "20 – 50m/mes",
  "50 – 100m/mes",
  "100 – 300m/mes",
  "Más de 300m/mes",
];

const COMO_NOS_CONOCIO = [
  "WhatsApp / Referido",
  "Instagram",
  "Google",
  "Feria o evento",
  "Otro distribuidor",
];

interface RegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "success";

interface FormData {
  empresa: string;
  nit: string;
  tipo_empresa: string;
  ciudad: string;
  departamento: string;
  direccion: string;
  nombre_contacto: string;
  cargo: string;
  telefono: string;
  whatsapp: string;
  email: string;
  productos_interes: string[];
  volumen_mensual: string;
  como_nos_conocio: string;
}

const INITIAL: FormData = {
  empresa: "",
  nit: "",
  tipo_empresa: "",
  ciudad: "",
  departamento: "",
  direccion: "",
  nombre_contacto: "",
  cargo: "",
  telefono: "",
  whatsapp: "",
  email: "",
  productos_interes: [],
  volumen_mensual: "",
  como_nos_conocio: "",
};

export const RegistroModal = ({ isOpen, onClose }: RegistroModalProps) => {
  const [step, setStep] = useState<Step>("form");
  const [currentStep, setCurrentStep] = useState(1); // 3 pasos del formulario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>(INITIAL);

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const toggleProducto = (ref: string) => {
    setForm((f) => ({
      ...f,
      productos_interes: f.productos_interes.includes(ref)
        ? f.productos_interes.filter((r) => r !== ref)
        : [...f.productos_interes, ref],
    }));
  };

  // Validaciones por paso
  const step1Valid = form.empresa.trim().length > 1 && form.tipo_empresa !== "";
  const step2Valid = form.nombre_contacto.trim().length > 1 && form.whatsapp.replace(/\D/g, "").length >= 10;
  const step3Valid = form.productos_interes.length > 0 && form.volumen_mensual !== "";

  const handleNext = () => {
    if (currentStep === 1 && !step1Valid) { setError("Completa empresa y tipo."); return; }
    if (currentStep === 2 && !step2Valid) { setError("Completa nombre y WhatsApp."); return; }
    setError("");
    setCurrentStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!step3Valid) { setError("Selecciona al menos una referencia y el volumen."); return; }
    setLoading(true);
    setError("");

    try {
      const { error: dbError } = await (supabaseClient as any)
        .from("clientes")
        .insert({
          empresa:          form.empresa.trim(),
          nit:              form.nit.trim() || null,
          tipo_empresa:     form.tipo_empresa || null,
          ciudad:           form.ciudad.trim() || null,
          departamento:     form.departamento.trim() || null,
          direccion:        form.direccion.trim() || null,
          nombre_contacto:  form.nombre_contacto.trim(),
          cargo:            form.cargo.trim() || null,
          telefono:         form.telefono.replace(/\D/g, "") || null,
          whatsapp:         form.whatsapp.replace(/\D/g, ""),
          email:            form.email.trim() || null,
          productos_interes: form.productos_interes,
          volumen_mensual:  form.volumen_mensual,
          como_nos_conocio: form.como_nos_conocio || null,
          estado:           "nuevo",
        });

      if (dbError) throw dbError;
    } catch (err: any) {
      console.error("[DISA:clientes] Error guardando:", err?.message);
      // Continuamos igual — abrimos WhatsApp aunque falle DB
    }

    setLoading(false);

    // Mensaje WA con resumen del registro
    const refs = form.productos_interes.join(", ");
    const msg = encodeURIComponent(
      `Hola DISA 👋 Acabo de registrar mi empresa en su plataforma.\n\n` +
      `🏢 *${form.empresa.trim()}*${form.nit ? ` (NIT: ${form.nit})` : ""}\n` +
      `📋 Tipo: ${form.tipo_empresa}\n` +
      `👤 Contacto: ${form.nombre_contacto.trim()}${form.cargo ? ` — ${form.cargo}` : ""}\n` +
      `📍 ${form.ciudad ? `${form.ciudad}, ` : ""}Colombia\n` +
      `📦 Interés: ${refs}\n` +
      `📊 Volumen estimado: ${form.volumen_mensual}\n\n` +
      `Quedamos atentos a recibir más información sobre precios mayoristas.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setCurrentStep(1);
      setForm(INITIAL);
      setError("");
    }, 500);
  };

  if (!isOpen) return null;

  const STEPS = ["Empresa", "Contacto", "Intereses"];

  return (
    <div className="fixed inset-0 z-[999]" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-disa-blue/75 backdrop-blur-md"
        onClick={handleClose}
      />

      <div
        className="absolute inset-0 overflow-y-auto flex items-start justify-center px-4"
        style={{ paddingTop: "4vh", paddingBottom: "4vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── HEADER ─────────────────────────────────────── */}
          <div className="bg-disa-blue px-8 pt-8 pb-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl leading-none"
            >✕</button>

            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-disa-gold" />
              <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                Red de Distribuidores DISA
              </p>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-1">
              Registra tu <span className="text-disa-gold">empresa.</span>
            </h2>
            <p className="text-white/40 text-xs font-light">
              Accede a precios mayoristas, muestras sin costo y soporte dedicado.
            </p>

            {/* Stepper */}
            {step === "form" && (
              <div className="flex items-center gap-0 mt-6">
                {STEPS.map((label, idx) => {
                  const num = idx + 1;
                  const done = currentStep > num;
                  const active = currentStep === num;
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                          done ? "bg-disa-gold text-white" :
                          active ? "bg-white text-disa-blue" :
                          "bg-white/15 text-white/40"
                        }`}>
                          {done ? "✓" : num}
                        </div>
                        <span className={`text-[8px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                          active ? "text-white" : done ? "text-disa-gold" : "text-white/30"
                        }`}>
                          {label}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-3 transition-colors duration-300 ${
                          done ? "bg-disa-gold" : "bg-white/15"
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── BODY ───────────────────────────────────────── */}
          <div className="px-8 py-7">
            <AnimatePresence mode="wait">

              {/* ════ PASO 1: Datos de la empresa ════ */}
              {step === "form" && currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Tipo de empresa *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {TIPOS_EMPRESA.map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => update("tipo_empresa", value)}
                          className={`py-3 px-3 text-left text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                            form.tipo_empresa === value
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >{label}</button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                        Nombre de la empresa *
                      </label>
                      <input type="text" placeholder="Ej: Cortinas Modernas SAS"
                        value={form.empresa} onChange={(e) => update("empresa", e.target.value)}
                        autoFocus
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Ciudad</label>
                      <input type="text" placeholder="Bogotá, Medellín..."
                        value={form.ciudad} onChange={(e) => update("ciudad", e.target.value)}
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Departamento</label>
                      <input type="text" placeholder="Cundinamarca..."
                        value={form.departamento} onChange={(e) => update("departamento", e.target.value)}
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Dirección</label>
                    <input type="text" placeholder="Calle 123 # 45-67"
                      value={form.direccion} onChange={(e) => update("direccion", e.target.value)}
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <button
                    onClick={handleNext}
                    className="w-full bg-disa-blue text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue-mid transition-all duration-500 flex items-center justify-center gap-3 group"
                  >
                    Continuar
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </motion.div>
              )}

              {/* ════ PASO 2: Contacto ════ */}
              {step === "form" && currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                        Nombre del contacto *
                      </label>
                      <input type="text" placeholder="Tu nombre completo"
                        value={form.nombre_contacto} onChange={(e) => update("nombre_contacto", e.target.value)}
                        autoFocus
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Cargo</label>
                      <input type="text" placeholder="Gerente, Compras..."
                        value={form.cargo} onChange={(e) => update("cargo", e.target.value)}
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">
                        WhatsApp *
                      </label>
                      <div className="flex items-center border-b border-disa-blue/15 focus-within:border-disa-gold transition-colors pb-2">
                        <span className="text-disa-blue/40 text-sm font-medium mr-2">+57</span>
                        <input type="tel" placeholder="300 780 5902"
                          value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)}
                          className="flex-1 bg-transparent outline-none text-disa-blue text-base font-medium placeholder:text-disa-blue/25"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Teléfono fijo</label>
                      <input type="tel" placeholder="601 123 4567"
                        value={form.telefono} onChange={(e) => update("telefono", e.target.value)}
                        className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-2">Email empresarial</label>
                    <input type="email" placeholder="empresa@correo.com"
                      value={form.email} onChange={(e) => update("email", e.target.value)}
                      className="w-full bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-medium pb-2 transition-colors placeholder:text-disa-blue/25"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setCurrentStep(1); setError(""); }}
                      className="flex-1 border border-disa-blue/15 text-disa-blue py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-sand transition-all duration-300"
                    >
                      ← Atrás
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 bg-disa-blue text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue-mid transition-all duration-500 group flex items-center justify-center gap-2"
                    >
                      Continuar
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ════ PASO 3: Intereses comerciales ════ */}
              {step === "form" && currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Referencias de interés * (selecciona todas las que apliquen)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {REFERENCIAS.map((ref) => (
                        <button key={ref} onClick={() => toggleProducto(ref)}
                          className={`py-2.5 px-3 text-left text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 flex items-center gap-2 ${
                            form.productos_interes.includes(ref)
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >
                          <span className={`w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                            form.productos_interes.includes(ref)
                              ? "border-disa-gold bg-disa-gold"
                              : "border-disa-blue/20"
                          }`}>
                            {form.productos_interes.includes(ref) && (
                              <span className="text-white text-[7px]">✓</span>
                            )}
                          </span>
                          {ref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      Volumen estimado de compra mensual *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {VOLUMENES.map((v) => (
                        <button key={v} onClick={() => update("volumen_mensual", v)}
                          className={`py-2.5 px-3 text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                            form.volumen_mensual === v
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >{v}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.35em] uppercase text-disa-blue/50 mb-3">
                      ¿Cómo nos conociste?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {COMO_NOS_CONOCIO.map((c) => (
                        <button key={c} onClick={() => update("como_nos_conocio", c)}
                          className={`py-2.5 px-3 text-[9px] font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                            form.como_nos_conocio === c
                              ? "border-disa-gold bg-disa-gold/10 text-disa-gold"
                              : "border-disa-blue/10 text-disa-blue/50 hover:border-disa-blue/25"
                          }`}
                        >{c}</button>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setCurrentStep(2); setError(""); }}
                      className="flex-1 border border-disa-blue/15 text-disa-blue py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-sand transition-all duration-300"
                    >
                      ← Atrás
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-disa-gold text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3 group"
                    >
                      {loading ? "Registrando..." : (
                        <>Registrar empresa →</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ════ ÉXITO ════ */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-disa-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-disa-gold text-4xl">✓</span>
                  </div>
                  <h3 className="text-disa-blue text-2xl font-black uppercase tracking-tight mb-3">
                    ¡Registro exitoso!
                  </h3>
                  <p className="text-disa-blue/55 text-sm font-light leading-relaxed mb-2 max-w-sm mx-auto">
                    <strong className="font-medium text-disa-blue">{form.empresa}</strong> ya está en nuestra base de datos.
                  </p>
                  <p className="text-disa-blue/45 text-sm font-light leading-relaxed mb-8 max-w-sm mx-auto">
                    Abrimos WhatsApp con tu información. Un asesor te contactará en menos de 2 horas hábiles con los precios mayoristas para tu empresa.
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-3">
                      {["nuevo", form.tipo_empresa, form.volumen_mensual].filter(Boolean).map((tag) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.2em] text-disa-gold border border-disa-gold/30 px-3 py-1.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-disa-blue/35 hover:text-disa-blue transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};