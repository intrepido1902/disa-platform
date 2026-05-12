"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Showroom = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="py-40 px-12 bg-white overflow-hidden relative border-y border-disa-blue/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

        {/* COPY + MÉTRICAS */}
        <motion.div style={{ y: y1 }} className="space-y-12">
          <h4 className="disa-label mb-6">Arquitectura & Control Solar</h4>
          <h3 className="text-7xl font-black italic tracking-tighter leading-none uppercase text-disa-blue">
            Sistemas <br /> que definen <br /> el espacio.
          </h3>
          <p className="text-disa-blue/60 text-lg font-light leading-relaxed max-w-sm">
            Nuestros textiles no solo cubren ventanas; filtran la luz para crear
            atmósferas de alto rendimiento en residencias y corporativos.
          </p>
          <div className="flex gap-12 pt-10 border-t border-disa-blue/5">
            <div>
              <p className="text-5xl font-black italic text-disa-blue">1M+</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-disa-blue/40">
                m² Suministrados
              </p>
            </div>
            <div>
              <p className="text-5xl font-black italic text-disa-blue">ISO</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-disa-blue/40">
                Calidad Certificada
              </p>
            </div>
          </div>
        </motion.div>

        {/* COMPOSICIÓN DE IMÁGENES PARALLAX */}
        <div className="relative h-[650px] flex items-center justify-center">
          {/* Bloque superior derecha — imagen de proyecto */}
          <motion.div
            style={{ y: y2 }}
            className="absolute top-0 right-0 w-2/3 h-4/5 bg-disa-blue shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-8xl italic select-none">
              DISA
            </div>
            {/* TODO: Reemplazar con next/image cuando tengamos fotos propias */}
          </motion.div>

          {/* Bloque inferior izquierda — detalle de tela */}
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-0 left-0 w-1/2 h-3/5 bg-disa-gold shadow-2xl z-10 border-[12px] border-white flex items-center justify-center"
          >
            <span className="text-white/20 font-black text-4xl italic select-none">
              TEXTURE
            </span>
            {/* TODO: Reemplazar con next/image cuando tengamos fotos propias */}
          </motion.div>
        </div>

      </div>
    </section>
  );
};