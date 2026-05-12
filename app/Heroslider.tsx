"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// Hero Slider — Carrusel premium con ambientes interiores
// Autoplay con pausa al hover, indicadores minimalistas
// ============================================================

interface Slide {
  id: number;
  imageUrl: string;
  ambient: string;       // "Sala", "Oficina", "Comedor"
  textile: string;       // Tipo de textil destacado
}

const SLIDES: Slide[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=85&w=2000",
    ambient: "Sala Premium",
    textile: "Cortinas Sheer",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=85&w=2000",
    ambient: "Dormitorio",
    textile: "Blackout Premium",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=85&w=2000",
    ambient: "Oficina Corporativa",
    textile: "Screen Solar",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=85&w=2000",
    ambient: "Comedor",
    textile: "Lino Natural",
  },
];

const AUTOPLAY_INTERVAL = 6000;

export const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay con pausa al hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = SLIDES[activeIndex];

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-disa-blue"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Ambientes destacados DISA"
    >
      {/* ─── IMÁGENES DEL SLIDER ─────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.imageUrl}
            alt={`${current.ambient} con ${current.textile} — DISA`}
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay navy gradiente — desde la izquierda */}
          <div className="absolute inset-0 bg-gradient-to-r from-disa-blue/85 via-disa-blue/45 to-disa-blue/10" />
          {/* Overlay sutil inferior para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ─── CONTENIDO EDITORIAL ─────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-32 md:pb-40">
        <div className="max-w-7xl mx-auto w-full">
          {/* Label superior con info del ambiente actual */}
          <motion.div
            key={`label-${current.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="h-px w-12 bg-disa-gold" />
            <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
              {current.ambient} · {current.textile}
            </p>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black uppercase tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-8xl xl:text-9xl max-w-5xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Textiles que <br />
            <span className="text-disa-gold">definen</span> el espacio.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/80 text-base md:text-lg font-light mt-8 max-w-xl leading-relaxed"
          >
            Soluciones premium en cortinas y persianas para arquitectura
            residencial y corporativa. Colombia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-disa-gold text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
            >
              Explorar colecciones
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#cotizar"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-disa-blue transition-all duration-500"
            >
              Solicitar cotización
            </a>
          </motion.div>
        </div>

        {/* ─── INDICADORES DEL SLIDER ─────────────────────────────── */}
        <div className="absolute bottom-12 right-8 md:right-16 lg:right-24 flex flex-col gap-3 items-end">
          <div className="flex gap-2 mb-4">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                className="group flex flex-col items-end gap-2"
                aria-label={`Ver ${slide.ambient}`}
              >
                <div className="relative w-12 h-px bg-white/20 overflow-hidden">
                  {idx === activeIndex && !isPaused && (
                    <motion.div
                      key={`progress-${activeIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTOPLAY_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-disa-gold origin-left"
                    />
                  )}
                  {idx === activeIndex && isPaused && (
                    <div className="absolute inset-0 bg-disa-gold" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ─── SCROLL HINT ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex flex-col items-center gap-3"
      >
        <p className="text-white/40 text-[8px] font-bold tracking-[0.4em] uppercase rotate-90 origin-bottom-left translate-y-12">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-white/40 mt-8"
        />
      </motion.div>
    </section>
  );
};