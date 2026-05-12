"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// ============================================================
// Showroom — Sección de autoridad con métricas y parallax visual
// Estilo editorial inspirado en Restoration Hardware
// ============================================================

const METRICS = [
  { value: "1M+", label: "m² Suministrados" },
  { value: "500+", label: "Proyectos Realizados" },
  { value: "15+", label: "Años de Experiencia" },
  { value: "ISO", label: "Calidad Certificada" },
];

export const Showroom = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-8 md:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* ─── HEADER ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-32"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-disa-gold" />
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Arquitectura & Control Solar
              </p>
            </div>
            <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              Sistemas que <br />
              <span className="text-disa-gold">definen</span> el espacio.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-disa-blue/60 text-base md:text-lg font-light leading-relaxed">
              Nuestros textiles no solo cubren ventanas; filtran la luz para
              crear atmósferas de alto rendimiento en residencias y proyectos
              corporativos. Cada solución es una decisión arquitectónica.
            </p>
          </div>
        </motion.div>

        {/* ─── GRID PARALLAX DE IMÁGENES ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-20 md:mb-28">
          {/* Imagen grande izquierda */}
          <motion.div
            style={{ y: y1 }}
            className="md:col-span-7 relative aspect-[4/5] md:aspect-[4/3] overflow-hidden bg-disa-sand"
          >
            <Image
              src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=85&w=1600"
              alt="Sala con cortinas DISA"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3">
              <p className="text-disa-gold text-[8px] font-bold tracking-[0.4em] uppercase mb-1">
                Proyecto
              </p>
              <p className="text-disa-blue text-sm font-bold tracking-tight">
                Apartamento Chapinero
              </p>
            </div>
          </motion.div>

          {/* Stack derecha: 2 imágenes verticales */}
          <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-6">
            <motion.div
              style={{ y: y2 }}
              className="relative aspect-[4/3] overflow-hidden bg-disa-sand"
            >
              <Image
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=85&w=1200"
                alt="Comedor con cortinas DISA"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              className="relative aspect-[4/3] overflow-hidden bg-disa-blue"
            >
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=85&w=1200"
                alt="Oficina corporativa con persianas DISA"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </motion.div>
          </div>
        </div>

        {/* ─── MÉTRICAS ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-16 border-t border-disa-blue/10"
        >
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-2"
            >
              <p
                className="text-disa-blue text-5xl md:text-6xl font-black tracking-tight leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {metric.value}
              </p>
              <p className="text-disa-blue/50 text-[10px] font-bold tracking-[0.3em] uppercase">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};