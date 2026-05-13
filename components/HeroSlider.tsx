"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    image: "/imagenes/hero/hero-1.jpeg",
    tag: "Screen Solar · Referencia técnica",
    claim: "Fabricantes",
  },
  {
    id: 2,
    image: "/imagenes/hero/hero-2..jpeg",
    tag: "Blackout · Alto rendimiento",
    claim: "Distribuidores",
  },
  {
    id: 3,
    image: "/imagenes/hero/hero-3..jpeg",
    tag: "Sheer · Colección premium",
    claim: "Talleres",
  },
  {
    id: 4,
    image: "/imagenes/hero/hero-4..jpeg",
    tag: "Lino · Fibras naturales",
    claim: "Mayoristas",
  },
];

const INTERVAL = 3000;

interface HeroSliderProps {
  onCotizarClick?: () => void;
}

export const HeroSlider = ({ onCotizarClick }: HeroSliderProps) => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => { setPrev(p); return (p + 1) % SLIDES.length; });
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-disa-blue"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="DISA — Proveedor de textiles para la industria"
    >
      {/* Slides con crossfade CSS puro */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{
            opacity: idx === active ? 1 : 0,
            zIndex: idx === active ? 2 : idx === prev ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.tag}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-disa-blue/85 via-disa-blue/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 lg:px-24 pb-24 md:pb-36">
        <div className="max-w-5xl w-full">

          {/* Tag de referencia */}
          <motion.div
            key={`tag-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
            <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
              {SLIDES[active].tag}
            </p>
          </motion.div>

          {/* Headline B2B */}
          <h1 className="text-white font-black uppercase tracking-tight leading-[0.88] text-[13vw] md:text-[8.5vw] lg:text-[7.5vw] xl:text-[6.5vw]">
            La tela detrás <br />
            de los mejores <br />
            <span className="text-disa-gold">proyectos.</span>
          </h1>

          {/* Subheadline orientado a la industria */}
          <p className="text-white/70 text-sm md:text-base font-light mt-6 md:mt-8 max-w-xl leading-relaxed">
            Proveemos textiles de alta gama a fabricantes, distribuidores y
            talleres en Colombia. Más de 200 referencias en screen solar,
            blackout, sheer y lino.
          </p>

          {/* Clientes tipo — social proof visual */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {["Talleres", "Fabricantes", "Distribuidores", "Mayoristas"].map((tipo) => (
              <span
                key={tipo}
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 border border-white/15 px-4 py-1.5"
              >
                {tipo}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-10">
            <a
              href="#catalogo"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-disa-gold text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
            >
              Ver catálogo de telas
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={onCotizarClick}
              className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-disa-blue transition-all duration-500"
            >
              Solicitar cotización
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 right-5 md:right-12 lg:right-24 flex items-center gap-4 z-10">
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setPrev(active); setActive(idx); }}
              className="relative h-px overflow-hidden transition-all duration-500"
              style={{ width: idx === active ? "3rem" : "1.5rem" }}
            >
              <span className="absolute inset-0 bg-white/25" />
              {idx === active && (
                <motion.span
                  key={`p-${active}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                  className="absolute inset-0 bg-disa-gold origin-left"
                />
              )}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-[9px] font-bold tracking-[0.3em]">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-5 md:left-12 lg:left-24 flex items-center gap-3 z-10">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-white/40"
        />
        <p className="text-white/35 text-[8px] font-bold tracking-[0.4em] uppercase">Scroll</p>
      </div>
    </section>
  );
};