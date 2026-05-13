"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Producto, ViewMode } from "@/types";

interface DualProductCardProps {
  producto: Producto;
  viewMode: ViewMode;
  onExplorar?: (producto: Producto) => void;
}

const PRODUCT_IMAGES: Record<string, { main: string; closeup: string }> = {
  "Lino Toscana": {
    main: "/imagenes/productos/lino-toscana.jpeg",
    closeup: "/imagenes/productos/lino-toscana-closeup.jpeg",
  },
  "Sheer Elegance": {
    main: "/imagenes/productos/sheer-elegance.jpeg",
    closeup: "/imagenes/productos/sheer-elegance-closeup.jpeg",
  },
  "Cortina Blackout Pro": {
    main: "/imagenes/productos/cortina-blackout-pro.jpeg",
    closeup: "/imagenes/productos/cortina-blackout-pro-closeup.jpeg",
  },
  "Screen Sun Control": {
    main: "/imagenes/productos/screen-sun-control.jpeg",
    closeup: "/imagenes/productos/screen-sun-control-closeup.jpeg",
  },
  "Screen Solar Plus": {
    main: "/imagenes/productos/screen-solar-plus.jpeg",
    closeup: "/imagenes/productos/screen-solar-plus-closeup.jpeg",
  },
  "Roller Premium": {
    main: "/imagenes/productos/roller-premium.jpeg",
    closeup: "/imagenes/productos/roller-premium-closeup.jpeg",
  },
};

export const DualProductCard = ({ producto, viewMode, onExplorar }: DualProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCloseup, setShowCloseup] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const imgs = PRODUCT_IMAGES[producto.nombre];
  const mainImage = imgs?.main ?? producto.imagenUrl;
  const closeupImage = imgs?.closeup ?? producto.imagenUrl;

  const area = (parseFloat(width) || 0) * (parseFloat(height) || 0);
  const precioDisplay = viewMode === "technical"
    ? (area > 0 ? area * producto.precioB2B : producto.precioB2B)
    : producto.precioB2C;

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white flex flex-col overflow-hidden"
      aria-label={`${producto.nombre} — ${producto.color}`}
    >
      {/* ─── IMAGEN ─────────────────────────────────────── */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-disa-sand cursor-pointer"
        onClick={() => setShowCloseup(!showCloseup)}
      >
        {/* Imagen principal o closeup */}
        <Image
          src={showCloseup ? closeupImage : mainImage}
          alt={`${producto.nombre} ${showCloseup ? "detalle de textura" : "ambiente"}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.04]"
        />

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-disa-blue/5 group-hover:opacity-0 transition-opacity duration-700" />

        {/* Badge categoría */}
        <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5">
          <span className="h-px w-3 bg-disa-gold" />
          <span className="text-disa-blue text-[8px] font-bold tracking-[0.3em] uppercase">
            {producto.categoria}
          </span>
        </div>

        {/* Hint MOBILE — toca para ver detalle */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
          <div className="bg-disa-blue/80 backdrop-blur-sm px-4 py-2 flex items-center gap-2">
            <span className="text-white text-[9px] font-bold tracking-[0.2em] uppercase">
              {showCloseup ? "← Ver ambiente" : "Toca para ver textura →"}
            </span>
          </div>
        </div>

        {/* Hint DESKTOP — aparece al hover */}
        <div className="absolute bottom-5 right-5 hidden md:block">
          <div className={`bg-disa-blue/80 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <span className="text-white text-[8px] font-bold tracking-[0.25em] uppercase">
              {showCloseup ? "← Ambiente" : "Textura →"}
            </span>
          </div>
        </div>

        {/* Overlay ficha técnica (modo Empresa en hover desktop) */}
        <AnimatePresence>
          {isHovered && viewMode === "technical" && !showCloseup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-disa-blue/95 backdrop-blur-sm p-8 flex flex-col justify-end text-white z-20 hidden md:flex"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-6 bg-disa-gold" />
                <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                  Ficha Técnica
                </p>
              </div>
              <dl className="space-y-2 text-[10px] font-medium tracking-wider uppercase">
                {producto.fichaTecnica.espesor_mm ? (
                  <>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-50">Espesor</dt>
                      <dd>{producto.fichaTecnica.espesor_mm}mm</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-50">Peso</dt>
                      <dd>{producto.fichaTecnica.peso_g_m2}g/m²</dd>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="opacity-50">UV</dt>
                      <dd>{producto.fichaTecnica.proteccion_uv_pct}%</dd>
                    </div>
                    {producto.fichaTecnica.ignifugo && (
                      <div className="flex justify-between">
                        <dt className="opacity-50">Ignífugo</dt>
                        <dd className="text-disa-gold">{producto.fichaTecnica.ignifugo}</dd>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between border-b border-white/10 pb-2"><dt className="opacity-50">Espesor</dt><dd>0.55mm</dd></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><dt className="opacity-50">Peso</dt><dd>420g/m²</dd></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><dt className="opacity-50">UV</dt><dd>99%</dd></div>
                    <div className="flex justify-between"><dt className="opacity-50">Ignífugo</dt><dd className="text-disa-gold">NFPA 701</dd></div>
                  </>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── INFO + PRECIO ──────────────────────────────── */}
      <div className="p-6 md:p-7 flex flex-col gap-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-disa-blue text-lg md:text-xl font-black uppercase tracking-tight leading-tight mb-1 truncate">
              {producto.nombre}
            </h3>
            <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
              {producto.color}
            </p>
          </div>

          {/* Botón WhatsApp con tooltip explicativo */}
          <div className="relative flex-shrink-0 group/wa">
            <button
              onClick={() => onExplorar?.(producto)}
              className="h-9 w-9 rounded-full border border-disa-blue/15 flex items-center justify-center text-disa-blue transition-all duration-500 hover:bg-disa-gold hover:text-white hover:border-disa-gold"
              aria-label={`Pedir información sobre ${producto.nombre} por WhatsApp`}
            >
              <span className="text-sm leading-none">→</span>
            </button>
            {/* Tooltip explicativo */}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-disa-blue text-white text-[8px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
              Info por WhatsApp
            </div>
            {/* Hint mobile debajo del botón */}
            <div className="absolute top-full right-0 mt-1 bg-disa-blue/80 text-white text-[7px] font-bold tracking-widest uppercase px-2 py-1 whitespace-nowrap md:hidden">
              WhatsApp
            </div>
          </div>
        </div>

        <div className="h-px bg-disa-blue/8" />

        {/* Precio o cotizador */}
        {viewMode === "technical" ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col">
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/40 mb-1.5">Ancho (m)</span>
                <input
                  type="number" step="0.01" min="0" placeholder="0.00"
                  value={width} onChange={(e) => setWidth(e.target.value)}
                  className="bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-bold pb-1 transition-colors"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/40 mb-1.5">Alto (m)</span>
                <input
                  type="number" step="0.01" min="0" placeholder="0.00"
                  value={height} onChange={(e) => setHeight(e.target.value)}
                  className="bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-base font-bold pb-1 transition-colors"
                />
              </label>
            </div>
            <div className="flex justify-between items-end pt-1">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/35">
                {area > 0 ? "Total estimado" : "Precio / m²"}
              </span>
              <span className="text-2xl font-black tracking-tight text-disa-blue">
                ${precioDisplay.toLocaleString("es-CO")}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-end">
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/35">Desde / m²</span>
            <span className="text-2xl font-black tracking-tight text-disa-blue">
              ${precioDisplay.toLocaleString("es-CO")}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};