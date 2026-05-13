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
  // Por defecto: modo Empresa (B2B) — foco principal del negocio
  const [viewMode, setViewMode] = useState<ViewMode>("technical");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [muestraProducto, setMuestraProducto] = useState<string | undefined>();

  const handleMuestra = (producto: { nombre: string }) => {
    const msg = encodeURIComponent(
      `Hola DISA 👋 Me gustaría recibir una muestra física de la tela *${producto.nombre}*. ¿Pueden enviarme información?`
    );
    window.open(`https://wa.me/573007805902?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const handleExplorar = (producto: { nombre: string; color: string }) => {
    const msg = encodeURIComponent(
      `Hola DISA 👋 Me interesa la referencia *${producto.nombre}* (${producto.color}). ¿Pueden darme información técnica y precio mayorista?`
    );
    window.open(`https://wa.me/573007805902?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen bg-disa-sand font-sans overflow-x-hidden">

      {/* NAV */}
      <Nav onCotizarClick={() => setQuoteOpen(true)} />

      {/* HERO B2B */}
      <HeroSlider onCotizarClick={() => setQuoteOpen(true)} />

      {/* CATEGORÍAS DE TELAS */}
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
                  15 años en la industria
                </p>
              </div>
              <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Números que <br />
                <span className="text-disa-gold">respaldan.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-disa-blue/55 text-base font-light leading-relaxed">
                Proveedores de textiles técnicos para la industria colombiana
                de cortinas y persianas. Distribución a nivel nacional desde Bogotá.
              </p>
            </div>
          </motion.div>
          <AnimatedStats />
        </div>
      </section>

      {/* POR QUÉ DISA (B2B) */}
      <WhyDisa />

      {/* CATÁLOGO DE TELAS */}
      <section
        id="catalogo"
        className="bg-disa-sand py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20"
      >
        <div className="max-w-[1600px] mx-auto">

          {/* Header catálogo */}
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
                  Catálogo de referencias
                </p>
              </div>
              <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Nuestras <br />
                <span className="text-disa-gold">telas.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end gap-6">
              <p className="text-disa-blue/55 text-sm md:text-base font-light leading-relaxed">
                Cada referencia incluye ficha técnica completa. Alterna entre
                la vista de <strong className="font-medium text-disa-blue">distribuidores</strong> (con
                cotizador y specs) o <strong className="font-medium text-disa-blue">cliente final</strong>.
              </p>

              {/* Toggle — Empresa primero (foco B2B) */}
              <div
                className="inline-flex self-start bg-disa-blue/6 p-1 rounded-full"
                role="group"
                aria-label="Tipo de visualización"
              >
                <button
                  onClick={() => setViewMode("technical")}
                  className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                    viewMode === "technical"
                      ? "bg-disa-blue text-white shadow-md"
                      : "text-disa-blue/45 hover:text-disa-blue"
                  }`}
                  aria-pressed={viewMode === "technical"}
                >
                  Distribuidor
                </button>
                <button
                  onClick={() => setViewMode("inspirational")}
                  className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                    viewMode === "inspirational"
                      ? "bg-disa-blue text-white shadow-md"
                      : "text-disa-blue/45 hover:text-disa-blue"
                  }`}
                  aria-pressed={viewMode === "inspirational"}
                >
                  Cliente final
                </button>
              </div>
            </div>
          </motion.div>

          {/* Grid de productos */}
          {productos.length === 0 ? (
            <div className="py-28 flex flex-col items-center gap-5 text-center">
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">Cargando referencias</p>
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
                    onExplorar={handleExplorar}
                    onMuestra={handleMuestra}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA catálogo completo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-24 flex flex-col items-center gap-5 text-center"
          >
            <p className="text-disa-blue/50 text-sm font-light max-w-sm leading-relaxed">
              ¿Necesitas referencias que no ves aquí? Tenemos más de 200 telas
              disponibles. Solicita el catálogo completo con fichas técnicas.
            </p>
            <button
              onClick={() => setCatalogOpen(true)}
              className="inline-flex items-center gap-3 bg-disa-blue text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue-mid transition-all duration-500 group"
            >
              Descargar catálogo completo
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* PROYECTOS */}
      <ProyectosSection />

      {/* REGISTRO DISTRIBUIDORES */}
      <section className="bg-disa-blue py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-4 mb-7">
                <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
                <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                  Red de distribuidores
                </p>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] mb-6">
                ¿Tu taller quiere <br />
                <span className="text-disa-gold">precios mayoristas?</span>
              </h2>
              <p className="text-white/55 text-base font-light leading-relaxed mb-8">
                Regístrate como distribuidor autorizado de DISA y accede a precios
                escalonados, acceso prioritario a nuevas referencias y soporte
                técnico dedicado para tus proyectos.
              </p>
              <a
                href={`https://wa.me/573007805902?text=${encodeURIComponent("Hola DISA 👋 Somos un taller/distribuidor y queremos registrarnos para acceder a precios mayoristas. ¿Cómo es el proceso?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-disa-gold text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
              >
                Registrar mi empresa
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { numero: "15%", label: "Descuento máximo por volumen" },
                { numero: "24h", label: "Despacho desde Bogotá" },
                { numero: "200+", label: "Referencias disponibles" },
                { numero: "0", label: "Pedido mínimo requerido" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 p-6">
                  <p className="text-disa-gold text-3xl md:text-4xl font-black tracking-tight mb-2">{stat.numero}</p>
                  <p className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* WHATSAPP PROACTIVO */}
      <WhatsAppProactive />

      {/* MODALES */}
      <CatalogModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => { setQuoteOpen(false); setMuestraProducto(undefined); }}
        productoPreseleccionado={muestraProducto}
      />
    </main>
  );
}