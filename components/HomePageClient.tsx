"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// IMPORTACIONES CORREGIDAS PARA COINCIDIR EXACTAMENTE CON TUS ARCHIVOS REAles
import { Logo } from "./Logo"; 
import { HeroSlider } from "../app/Heroslider"; 
import { CategoriesStrip } from "./Categoriesstrip"; 
import { Showroom } from "./Showroom";
import { DualProductCard } from "./DualProductCard";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./Whatsappbutton"; 
import type { Producto, ViewMode } from "@/types";

interface HomePageClientProps {
  productos: Producto[];
}

export default function HomePageClient({ productos }: HomePageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("inspirational");

  return (
    <main className="relative min-h-screen bg-disa-sand font-sans overflow-x-hidden">

      {/* ── NAVEGACIÓN INLINE (Soluciona el error del archivo Nav faltante) ── */}
      <nav className="fixed top-0 w-full z-[100] px-8 md:px-16 py-12 flex justify-between items-center mix-blend-difference text-white">
        <div className="w-32 md:w-48">
          <Logo className="w-full h-auto text-white" />
        </div>
        
        <div className="hidden lg:flex gap-16 text-[9px] font-bold uppercase tracking-[0.4em]">
          <a href="#catalogo" className="hover:text-disa-gold transition-colors duration-500">Colecciones</a>
          <a href="#showroom" className="hover:text-disa-gold transition-colors duration-500">Proyectos</a>
          <button className="bg-white text-disa-blue px-8 py-3 rounded-full hover:bg-disa-gold transition-all duration-500 font-black tracking-widest">
            Cotizar
          </button>
        </div>
      </nav>

      {/* ── HERO SLIDER ──────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── CATEGORÍAS PRINCIPALES ───────────────────────────────── */}
      <CategoriesStrip />

      {/* ── SHOWROOM / AUTORIDAD ─────────────────────────────────── */}
      <Showroom />

      {/* ── CATÁLOGO COMPLETO ────────────────────────────────────── */}
      <section
        id="catalogo"
        className="bg-disa-sand py-24 md:py-32 px-8 md:px-16"
      >
        <div className="max-w-[1600px] mx-auto">

          {/* Header del catálogo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20"
          >
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-disa-gold" />
                <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                  Catálogo Premium
                </p>
              </div>
              <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Materiales <br />
                <span className="text-disa-gold">que rinden.</span>
              </h2>
            </div>

            {/* Toggle B2C/B2B */}
            <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end items-start lg:items-end gap-6">
              <p className="text-disa-blue/60 text-sm md:text-base font-light leading-relaxed lg:text-right max-w-md">
                Filtra el catálogo según tu necesidad. Precios B2C para cliente
                final, precios B2B para distribuidores con cálculo por proyecto.
              </p>

              <div
                className="inline-flex bg-disa-blue/5 p-1 rounded-full"
                role="group"
                aria-label="Modo de visualización"
              >
                <button
                  onClick={() => setViewMode("inspirational")}
                  className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                    viewMode === "inspirational"
                      ? "bg-disa-blue text-white shadow-lg"
                      : "text-disa-blue/50 hover:text-disa-blue"
                  }`}
                  aria-pressed={viewMode === "inspirational"}
                >
                  Hogar · B2C
                </button>
                <button
                  onClick={() => setViewMode("technical")}
                  className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                    viewMode === "technical"
                      ? "bg-disa-blue text-white shadow-lg"
                      : "text-disa-blue/50 hover:text-disa-blue"
                  }`}
                  aria-pressed={viewMode === "technical"}
                >
                  Empresa · B2B
                </button>
              </div>
            </div>
          </motion.div>

          {/* Grid de productos */}
          {productos.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Cargando colecciones
              </p>
              <div className="h-px w-24 bg-disa-blue/10" />
              <p className="text-disa-blue/40 text-sm font-light max-w-sm">
                Estamos preparando el catálogo. Conéctate por WhatsApp para
                consultas inmediatas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {productos.map((producto, idx) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                >
                  <DualProductCard producto={producto} viewMode={viewMode} />
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA al final del catálogo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-24 flex flex-col items-center gap-6 text-center"
          >
            <p className="text-disa-blue/60 text-sm md:text-base font-light max-w-md">
              ¿No encuentras lo que buscas? Nuestro catálogo completo incluye más
              de 200 referencias.
            </p>
            <a
              href="#cotizar"
              className="inline-flex items-center gap-3 bg-disa-blue text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue-mid transition-all duration-500 group"
            >
              Solicitar catálogo completo
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <Footer />

      {/* ── WHATSAPP FLOTANTE ────────────────────────────────────── */}
      <WhatsAppButton />
    </main>
  );
}