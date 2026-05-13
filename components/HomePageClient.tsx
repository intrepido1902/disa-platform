"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { HeroSlider } from "./HeroSlider";
import { CategoriesStrip } from "./CategoriesStrip";
import { ProyectosSection } from "./ProyectosSection";
import { WhyDisa } from "./WhyDisa";
import { DualProductCard } from "./DualProductCard";
import { AnimatedStats } from "./AnimatedStats";
import { CatalogModal } from "./CatalogModal";
import { QuoteModal } from "./QuoteModal";
import { Footer } from "./Footer";
import { WhatsAppProactive } from "./WhatsAppProactive";
import type { Producto, ViewMode } from "@/types";

interface HomePageClientProps {
  productos: Producto[];
}

export default function HomePageClient({ productos }: HomePageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("inspirational");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-disa-sand font-sans overflow-x-hidden">

      {/* NAV */}
      <Nav onCotizarClick={() => setQuoteOpen(true)} />

      {/* HERO */}
      <HeroSlider onCotizarClick={() => setQuoteOpen(true)} />

      {/* CATEGORÍAS */}
      <CategoriesStrip />

      {/* TRAYECTORIA */}
      <section
        id="nosotros"
        className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20"
      >
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20"
          >
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-7">
                <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
                <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                  Nuestra Trayectoria
                </p>
              </div>
              <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Materiales <br />
                <span className="text-disa-gold">que rinden.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-disa-blue/55 text-base font-light leading-relaxed">
                Más de una década suministrando textiles arquitectónicos de alta
                gama para residencias y proyectos corporativos en Colombia.
              </p>
            </div>
          </motion.div>
          <AnimatedStats />
        </div>
      </section>

      {/* POR QUÉ DISA */}
      <WhyDisa />

      {/* PROYECTOS ANTES/DESPUÉS */}
      <ProyectosSection />

      {/* CATÁLOGO */}
      <section
        id="catalogo"
        className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20"
      >
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 md:mb-20"
          >
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-7">
                <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
                <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                  Catálogo Premium
                </p>
              </div>
              <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Colecciones <br />
                <span className="text-disa-gold">2026.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end gap-6">
              <p className="text-disa-blue/55 text-sm md:text-base font-light leading-relaxed">
                Cada colección resuelve una necesidad específica. Elige tu vista:
              </p>
              <div
                className="inline-flex self-start bg-disa-blue/6 p-1 rounded-full"
                role="group"
                aria-label="Tipo de visualización"
              >
                {[
                  { mode: "inspirational" as ViewMode, label: "Hogar" },
                  { mode: "technical" as ViewMode, label: "Empresa" },
                ].map(({ mode, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                      viewMode === mode
                        ? "bg-disa-blue text-white shadow-md"
                        : "text-disa-blue/45 hover:text-disa-blue"
                    }`}
                    aria-pressed={viewMode === mode}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {productos.length === 0 ? (
            <div className="py-28 flex flex-col items-center gap-5 text-center">
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Cargando colecciones
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {productos.map((producto, idx) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: (idx % 3) * 0.1 }}
                >
                  <DualProductCard
                    producto={producto}
                    viewMode={viewMode}
                    onExplorar={(p) => {
                      const wa = `https://wa.me/573007805902?text=${encodeURIComponent(
                        `Hola DISA 👋 Me interesa la tela *${p.nombre}* (${p.color}). ¿Pueden darme más información y precio?`
                      )}`;
                      window.open(wa, "_blank", "noopener,noreferrer");
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-24 flex flex-col items-center gap-5 text-center"
          >
            <p className="text-disa-blue/50 text-sm font-light max-w-sm leading-relaxed">
              Nuestro catálogo completo incluye más de 200 referencias con
              fichas técnicas, muestras y precios actualizados.
            </p>
            <button
              onClick={() => setCatalogOpen(true)}
              className="inline-flex items-center gap-3 bg-disa-blue text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue-mid transition-all duration-500 group"
            >
              Solicitar catálogo completo
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* WHATSAPP PROACTIVO (reemplaza el botón simple) */}
      <WhatsAppProactive />

      {/* MODALES */}
      <CatalogModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}