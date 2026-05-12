"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Producto, ViewMode } from "@/types";

// ============================================================
// DualProductCard — Card de producto premium estilo editorial
// Restoration Hardware / Etoffe / Alhambra inspirado
// ============================================================

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white flex flex-col overflow-hidden"
      aria-label={`${producto.nombre} — ${producto.color}`}
    >
      {/* ─── IMAGEN: 4:5 aspect ratio editorial ─────────────────────── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-disa-sand">
        <Image
          src={producto.imagenUrl}
          alt={`${producto.nombre} ${producto.color} — DISA Textiles`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />

        {/* Overlay sutil base */}
        <div className="absolute inset-0 bg-disa-blue/5 transition-opacity duration-700 group-hover:opacity-0" />

        {/* Badge categoría */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2">
          <span className="h-px w-4 bg-disa-gold" />
          <span className="text-disa-blue text-[8px] font-bold tracking-[0.3em] uppercase">
            {producto.categoria}
          </span>
        </div>

        {/* Overlay ficha técnica (solo B2B en hover) */}
        <AnimatePresence>
          {isHovered && viewMode === "technical" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-disa-blue/95 backdrop-blur-sm p-8 flex flex-col justify-end text-white z-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-disa-gold" />
                <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                  Ficha Técnica
                </p>
              </div>
              <dl className="space-y-2 text-[11px] font-medium tracking-wider opacity-90 uppercase">
                {producto.fichaTecnica.espesor_mm && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <dt className="opacity-60">Espesor</dt>
                    <dd>{producto.fichaTecnica.espesor_mm}mm</dd>
                  </div>
                )}
                {producto.fichaTecnica.peso_g_m2 && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <dt className="opacity-60">Peso</dt>
                    <dd>{producto.fichaTecnica.peso_g_m2}g/m²</dd>
                  </div>
                )}
                {producto.fichaTecnica.proteccion_uv_pct && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <dt className="opacity-60">Protección UV</dt>
                    <dd>{producto.fichaTecnica.proteccion_uv_pct}%</dd>
                  </div>
                )}
                {producto.fichaTecnica.ignifugo && (
                  <div className="flex justify-between">
                    <dt className="opacity-60">Ignífugo</dt>
                    <dd className="text-disa-gold">{producto.fichaTecnica.ignifugo}</dd>
                  </div>
                )}
                {!producto.fichaTecnica.espesor_mm && (
                  <>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-60">Espesor</dt>
                      <dd>0.55mm</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-60">Peso</dt>
                      <dd>420g/m²</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-60">Protección UV</dt>
                      <dd>99%</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="opacity-60">Ignífugo</dt>
                      <dd className="text-disa-gold">NFPA 701</dd>
                    </div>
                  </>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── INFO + COTIZADOR ──────────────────────────────────────── */}
      <div className="p-6 md:p-8 flex flex-col gap-5 bg-white">
        {/* Header: nombre + color */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3
              className="text-disa-blue text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {producto.nombre}
            </h3>
            <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
              {producto.color}
            </p>
          </div>
          <button
            className="h-9 w-9 rounded-full border border-disa-blue/15 flex items-center justify-center text-disa-blue transition-all duration-500 hover:bg-disa-blue hover:text-white hover:border-disa-blue"
            aria-label={`Ver detalles de ${producto.nombre}`}
          >
            <span className="text-sm leading-none">→</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="h-px bg-disa-blue/10" />

        {/* Cotizador B2B vs precio B2C */}
        {viewMode === "technical" ? (
          // ── B2B: cotizador medidas ──
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/50 mb-2">
                  Ancho (m)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-lg font-bold pb-1 transition-colors"
                  aria-label="Ancho en metros"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/50 mb-2">
                  Alto (m)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-lg font-bold pb-1 transition-colors"
                  aria-label="Alto en metros"
                />
              </label>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/40">
                {area > 0 ? "Total proyecto" : "Tarifa B2B / m²"}
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-disa-blue">
                ${displayPriceB2B.toLocaleString("es-CO")}
              </span>
            </div>
          </div>
        ) : (
          // ── B2C: precio simple ──
          <div className="flex justify-between items-end">
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/40">
              Desde / m²
            </span>
            <span
              className="text-2xl md:text-3xl font-black tracking-tight text-disa-blue"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ${producto.precioB2C.toLocaleString("es-CO")}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};