"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Producto, ViewMode } from "@/types";

interface DualProductCardProps {
  producto: Producto;
  viewMode: ViewMode;
}

export const DualProductCard = ({ producto, viewMode }: DualProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const area = (parseFloat(width) || 0) * (parseFloat(height) || 0);
  const displayPriceB2B =
    area > 0 ? area * producto.precioB2B : producto.precioB2B;

  return (
    <motion.article
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white flex flex-col group h-[750px] overflow-hidden"
      aria-label={`${producto.nombre} — ${producto.color}`}
    >
      {/* ── IMAGEN (75% del card) ─────────────────────────────────── */}
      <div className="relative h-3/4 w-full overflow-hidden bg-disa-sand">
        <Image
          src={producto.imagenUrl}
          alt={`${producto.nombre} ${producto.color} — DISA Textiles`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-disa-blue/10 group-hover:bg-transparent transition-colors duration-700" />

        {/* Overlay ficha técnica (solo modo B2B al hacer hover) */}
        <AnimatePresence>
          {isHovered && viewMode === "technical" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-disa-blue/90 p-12 flex flex-col justify-end text-white z-20 backdrop-blur-md"
            >
              <h4 className="text-disa-gold font-black text-[9px] tracking-[0.5em] uppercase mb-6 italic">
                Ficha Técnica
              </h4>
              <dl className="space-y-3 text-[10px] font-bold tracking-widest opacity-80 border-l border-disa-gold pl-6 uppercase">
                {producto.fichaTecnica.espesor_mm && (
                  <div>
                    <dt className="sr-only">Espesor</dt>
                    <dd>Espesor: {producto.fichaTecnica.espesor_mm}mm ± 5%</dd>
                  </div>
                )}
                {producto.fichaTecnica.peso_g_m2 && (
                  <div>
                    <dt className="sr-only">Peso</dt>
                    <dd>Peso: {producto.fichaTecnica.peso_g_m2}g/m²</dd>
                  </div>
                )}
                {producto.fichaTecnica.proteccion_uv_pct && (
                  <div>
                    <dt className="sr-only">Protección UV</dt>
                    <dd>Protección UV: Bloqueo {producto.fichaTecnica.proteccion_uv_pct}%</dd>
                  </div>
                )}
                {producto.fichaTecnica.ignifugo && (
                  <div>
                    <dt className="sr-only">Ignífugo</dt>
                    <dd>Ignífugo: {producto.fichaTecnica.ignifugo}</dd>
                  </div>
                )}
                {/* Fallback si no hay ficha técnica en Supabase aún */}
                {!producto.fichaTecnica.espesor_mm && (
                  <>
                    <dd>Espesor: 0.55mm ± 5%</dd>
                    <dd>Peso: 420g/m²</dd>
                    <dd>Protección UV: Bloqueo 99%</dd>
                    <dd>Ignífugo: Clase 1 (NFPA 701)</dd>
                  </>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── INFO + COTIZADOR ──────────────────────────────────────── */}
      <div className="p-10 flex flex-col justify-between flex-grow bg-white z-30">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2 text-disa-blue">
              {producto.nombre}
            </h3>
            <p className="text-[9px] font-bold text-disa-gold tracking-[0.4em] uppercase">
              {producto.color}
            </p>
          </div>
          {/* TODO: Link a página de producto individual */}
          <button
            className="h-10 w-10 rounded-full border border-disa-blue/10 flex items-center justify-center group-hover:bg-disa-blue group-hover:text-white transition-all duration-500"
            aria-label={`Ver detalles de ${producto.nombre}`}
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>

        {/* Cotizador B2B vs precio B2C */}
        <div className="mt-6 border-t border-disa-blue/10 pt-6">
          {viewMode === "technical" ? (
            // ── MODO B2B: cotizador con medidas ──
            <div className="flex justify-between items-end">
              <div className="flex gap-4">
                <label className="flex flex-col">
                  <span className="text-[7px] font-bold tracking-widest uppercase text-disa-blue/40 mb-1">
                    Ancho (m)
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="disa-input w-16"
                    aria-label="Ancho en metros"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-[7px] font-bold tracking-widest uppercase text-disa-blue/40 mb-1">
                    Alto (m)
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="disa-input w-16"
                    aria-label="Alto en metros"
                  />
                </label>
              </div>
              <div className="text-right">
                <span className="block text-[8px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">
                  {area > 0 ? "Total proyecto" : "Tarifa base m²"}
                </span>
                <span className="text-3xl font-black tracking-tighter italic text-disa-blue">
                  ${displayPriceB2B.toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          ) : (
            // ── MODO B2C: precio desde ──
            <div className="flex flex-col">
              <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">
                Desde
              </span>
              <span className="text-4xl font-black tracking-tighter italic text-disa-blue">
                ${producto.precioB2C.toLocaleString("es-CO")}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};