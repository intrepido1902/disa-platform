"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    image: "/imagenes/hero/hero-1.jpeg",
    ambient: "Sala Premium",
    textile: "Cortinas Sheer",
  },
  {
    id: 2,
    image: "/imagenes/hero/hero-2..jpeg",
    ambient: "Dormitorio",
    textile: "Blackout Premium",
  },
  {
    id: 3,
    image: "/imagenes/hero/hero-3..jpeg",
    ambient: "Oficina Corporativa",
    textile: "Screen Solar",
  },
  {
    id: 4,
    image: "/imagenes/hero/hero-4..jpeg",
    ambient: "Comedor",
    textile: "Lino Natural",
  },
];

const INTERVAL = 3000; // 3 segundos

export const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-disa-blue"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Ambientes destacados DISA"
    >
      {/* ─── SLIDES ─────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={SLIDES[active].id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[active].image}
            alt={`${SLIDES[active].ambient} con ${SLIDES[active].textile} DISA`}
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay gradiente editorial */}
          <div className="absolute inset-0 bg-gradient-to-r from-disa-blue/80 via-disa-blue/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ─── CONTENIDO ──────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-28 md:pb-36">
        <div className="max-w-7xl w-full">

          {/* Label del ambiente actual */}
          <motion.div
            key={`label-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
            <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
              {SLIDES[active].ambient} · {SLIDES[active].textile}
            </p>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black uppercase tracking-tight leading-[0.9] text-[13vw] md:text-[9vw] lg:text-[8vw] max-w-4xl"
          >
            Textiles que <br />
            <span className="text-disa-gold">definen</span> el espacio.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/75 text-sm md:text-base font-light mt-6 md:mt-8 max-w-lg leading-relaxed"
          >
            Soluciones premium en cortinas y persianas para arquitectura
            residencial y corporativa. Colombia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12"
          >
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-disa-gold text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
            >
              Explorar colecciones
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#cotizar"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-disa-blue transition-all duration-500"
            >
              Solicitar cotización
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── INDICADORES ────────────────────────────────── */}
      <div className="absolute bottom-10 right-6 md:right-16 lg:right-24 flex items-center gap-4 z-10">
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="relative h-px overflow-hidden transition-all duration-300"
              style={{ width: idx === active ? "3rem" : "1.5rem" }}
            >
              <span className="absolute inset-0 bg-white/25" />
              {idx === active && !paused && (
                <motion.span
                  key={`prog-${active}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                  className="absolute inset-0 bg-disa-gold origin-left"
                />
              )}
              {idx === active && paused && (
                <span className="absolute inset-0 bg-disa-gold" />
              )}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-[9px] font-bold tracking-[0.3em]">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
      </div>

      {/* ─── SCROLL HINT ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-white/40"
        />
        <p className="text-white/40 text-[8px] font-bold tracking-[0.4em] uppercase">
          Scroll
        </p>
      </motion.div>
    </section>
  );
};