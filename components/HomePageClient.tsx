"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";
import { Showroom } from "./Showroom";
import { DualProductCard } from "./DualProductCard";
import type { Producto, ViewMode } from "@/types";

interface HomePageClientProps {
  productos: Producto[];
}

export default function HomePageClient({ productos }: HomePageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("inspirational");

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.96]);

  return (
    <main className="relative min-h-screen bg-disa-sand font-sans">

      {/* ── NAV ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-[100] px-8 md:px-16 py-12 flex justify-between items-center mix-blend-difference text-white">
        <div className="w-32 md:w-48">
          <Logo className="w-full h-auto text-white" />
        </div>

        <div className="hidden lg:flex gap-16 text-[9px] font-bold uppercase tracking-[0.4em]">
          <a
            href="#catalogo"
            className="hover:text-disa-gold transition-colors duration-500"
          >
            Colecciones
          </a>
          <a
            href="#showroom"
            className="hover:text-disa-gold transition-colors duration-500"
          >
            Proyectos
          </a>
          {/* TODO: Conectar al modal de cotización en Fase 2 */}
          <a
            href="#cotizar"
            className="bg-white text-disa-blue px-8 py-3 rounded-full hover:bg-disa-gold hover:text-white transition-all duration-500 font-black tracking-widest"
          >
            Cotizar
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <motion.header
        style={{ scale }}
        className="h-screen bg-disa-blue relative flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden"
      >
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="disa-label mb-8"
            >
              Control Solar & Arquitectura
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white text-[13vw] font-black uppercase italic leading-[0.75] tracking-tighter"
            >
              Viste el <br /> Espacio.
            </motion.h1>
          </div>

          {/* Toggle B2C / B2B */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex bg-white/5 p-1 rounded-full backdrop-blur-3xl border border-white/10 mb-4"
            role="group"
            aria-label="Modo de visualización"
          >
            <button
              onClick={() => setViewMode("inspirational")}
              className={`px-10 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${
                viewMode === "inspirational"
                  ? "bg-white text-disa-blue"
                  : "text-white/40 hover:text-white"
              }`}
              aria-pressed={viewMode === "inspirational"}
            >
              Hogar
            </button>
            <button
              onClick={() => setViewMode("technical")}
              className={`px-10 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${
                viewMode === "technical"
                  ? "bg-white text-disa-blue"
                  : "text-white/40 hover:text-white"
              }`}
              aria-pressed={viewMode === "technical"}
            >
              B2B
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── SHOWROOM ────────────────────────────────────────────────── */}
      <section id="showroom">
        <Showroom />
      </section>

      {/* ── SECCIÓN DE AUTORIDAD ────────────────────────────────────── */}
      <section
        id="empresa"
        className="bg-disa-sand py-48 px-8 md:px-16 flex flex-col md:flex-row justify-between items-end gap-20"
      >
        <div className="max-w-3xl">
          <h4 className="disa-label mb-12">Especificación Técnica</h4>
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-disa-blue">
            Materiales <br /> que rinden.
          </h2>
        </div>
      </section>

      {/* ── CATÁLOGO ────────────────────────────────────────────────── */}
      <section id="catalogo" className="bg-disa-blue/10 p-px">
        {productos.length === 0 ? (
          // Estado vacío — mientras no hay datos en Supabase
          <div className="bg-disa-sand py-32 flex flex-col items-center justify-center gap-6">
            <p className="disa-label">Catálogo</p>
            <p className="text-disa-blue/40 text-sm">
              Cargando colecciones...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-disa-blue/10">
            {productos.map((producto) => (
              <DualProductCard
                key={producto.id}
                producto={producto}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-disa-sand py-24 px-8 md:px-16 flex justify-between items-center border-t border-disa-blue/10">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-disa-blue/40">DISA © 2026</p>
        <Logo className="w-24 text-disa-blue opacity-20" />
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-disa-gold">Bogotá, Colombia</p>
      </footer>
    </main>
  );
}
// <-- AQUÍ DEBE TERMINAR EL ARCHIVO. Borra cualquier llave extra que esté por debajo.