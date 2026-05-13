"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Producto, ViewMode } from "@/types";

interface DualProductCardProps {
  producto: Producto;
  viewMode: ViewMode;
  onExplorar?: (producto: Producto) => void;
  onMuestra?: (producto: Producto) => void;
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

export const DualProductCard = ({ producto, viewMode, onExplorar, onMuestra }: DualProductCardProps) => {
  const [showCloseup, setShowCloseup] = useState(false);
  const [metros, setMetros] = useState<string>("");

  const imgs = PRODUCT_IMAGES[producto.nombre];
  const mainImage = imgs?.main ?? producto.imagenUrl;
  const closeupImage = imgs?.closeup ?? producto.imagenUrl;

  // Cotizador por metros lineales (B2B)
  const metrosNum = parseFloat(metros) || 0;
  const precioB2B = producto.precioB2B;
  const precioB2C = producto.precioB2C;
  const totalEstimado = metrosNum > 0 ? metrosNum * precioB2B : precioB2B;

  // Descuento por volumen (ejemplo)
  const descuento = metrosNum >= 100 ? 15 : metrosNum >= 50 ? 10 : metrosNum >= 20 ? 5 : 0;
  const totalConDescuento = metrosNum > 0 ? totalEstimado * (1 - descuento / 100) : precioB2B;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white flex flex-col overflow-hidden"
      aria-label={`${producto.nombre} — ${producto.color}`}
    >
      {/* ─── IMAGEN ─────────────────────────── */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-disa-sand cursor-pointer"
        onClick={() => setShowCloseup(!showCloseup)}
      >
        <Image
          src={showCloseup ? closeupImage : mainImage}
          alt={`${producto.nombre} ${showCloseup ? "— detalle de textura" : ""}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-disa-blue/5 group-hover:opacity-0 transition-opacity duration-700" />

        {/* Badge categoría */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5">
          <span className="h-px w-3 bg-disa-gold" />
          <span className="text-disa-blue text-[8px] font-bold tracking-[0.3em] uppercase">
            {producto.categoria}
          </span>
        </div>

        {/* Toggle textura */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-disa-blue/75 backdrop-blur-sm px-3 py-1.5">
            <span className="text-white text-[8px] font-bold tracking-[0.2em] uppercase">
              {showCloseup ? "← Ambiente" : "Ver textura →"}
            </span>
          </div>
        </div>

        {/* Hint mobile */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <div className="bg-disa-blue/75 backdrop-blur-sm px-3 py-1.5">
            <span className="text-white text-[8px] font-bold tracking-[0.2em] uppercase">
              Toca para ver textura
            </span>
          </div>
        </div>
      </div>

      {/* ─── INFO ───────────────────────────── */}
      <div className="p-6 md:p-7 flex flex-col gap-4 bg-white flex-grow">

        {/* Nombre + color */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-disa-blue text-xl font-black uppercase tracking-tight leading-tight mb-1">
              {producto.nombre}
            </h3>
            <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
              {producto.color}
            </p>
          </div>
          {/* Botón solicitar info por WA */}
          <div className="relative group/wa flex-shrink-0">
            <button
              onClick={() => onExplorar?.(producto)}
              className="h-9 w-9 rounded-full border border-disa-blue/15 flex items-center justify-center text-disa-blue transition-all duration-500 hover:bg-disa-gold hover:text-white hover:border-disa-gold"
              aria-label={`Información de ${producto.nombre} por WhatsApp`}
            >
              <span className="text-sm leading-none">→</span>
            </button>
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-disa-blue text-white text-[8px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
              Info por WhatsApp
            </div>
          </div>
        </div>

        <div className="h-px bg-disa-blue/8" />

        {/* Ficha técnica compacta — siempre visible en modo Empresa */}
        {viewMode === "technical" && (
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {producto.fichaTecnica.espesor_mm && (
              <div className="bg-disa-sand px-3 py-2">
                <span className="text-disa-blue/40 font-bold tracking-widest uppercase block mb-0.5">Espesor</span>
                <span className="text-disa-blue font-bold">{producto.fichaTecnica.espesor_mm}mm</span>
              </div>
            )}
            {producto.fichaTecnica.peso_g_m2 && (
              <div className="bg-disa-sand px-3 py-2">
                <span className="text-disa-blue/40 font-bold tracking-widest uppercase block mb-0.5">Peso</span>
                <span className="text-disa-blue font-bold">{producto.fichaTecnica.peso_g_m2}g/m²</span>
              </div>
            )}
            {producto.fichaTecnica.proteccion_uv_pct && (
              <div className="bg-disa-sand px-3 py-2">
                <span className="text-disa-blue/40 font-bold tracking-widest uppercase block mb-0.5">UV</span>
                <span className="text-disa-blue font-bold">{producto.fichaTecnica.proteccion_uv_pct}%</span>
              </div>
            )}
            {producto.fichaTecnica.ignifugo && (
              <div className="bg-disa-sand px-3 py-2">
                <span className="text-disa-blue/40 font-bold tracking-widest uppercase block mb-0.5">Ignífugo</span>
                <span className="text-disa-gold font-bold text-[9px]">{producto.fichaTecnica.ignifugo}</span>
              </div>
            )}
          </div>
        )}

        {/* ─── MODO EMPRESA (B2B): cotizador por metros lineales ─── */}
        {viewMode === "technical" ? (
          <div className="space-y-3">
            <label className="flex flex-col">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/40 mb-1.5">
                Metros lineales a cotizar
              </span>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="Ej: 50"
                value={metros}
                onChange={(e) => setMetros(e.target.value)}
                className="bg-transparent border-b border-disa-blue/15 focus:border-disa-gold outline-none text-disa-blue text-lg font-bold pb-1 transition-colors"
              />
            </label>

            {/* Descuento por volumen */}
            {metrosNum >= 20 && (
              <div className="flex items-center gap-2 bg-disa-gold/10 px-3 py-2">
                <span className="h-px w-4 bg-disa-gold" />
                <span className="text-disa-gold text-[9px] font-bold tracking-[0.2em] uppercase">
                  Descuento por volumen: {descuento}%
                </span>
              </div>
            )}

            <div className="flex justify-between items-end pt-1">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/35">
                {metrosNum > 0 ? `${metrosNum}m × $${precioB2B.toLocaleString("es-CO")}` : "Precio B2B / m"}
              </span>
              <div className="text-right">
                {descuento > 0 && metrosNum > 0 && (
                  <span className="block text-[10px] line-through text-disa-blue/30">
                    ${totalEstimado.toLocaleString("es-CO")}
                  </span>
                )}
                <span className="text-2xl font-black tracking-tight text-disa-blue">
                  ${Math.round(metrosNum > 0 ? totalConDescuento : precioB2B).toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            {/* Botones de acción B2B */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onExplorar?.(producto)}
                className="flex-1 bg-disa-blue text-white py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-disa-blue-mid transition-all duration-300"
              >
                Cotizar por WA
              </button>
              <button
                onClick={() => onMuestra?.(producto)}
                className="flex-1 border border-disa-blue/20 text-disa-blue py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-disa-blue hover:text-white transition-all duration-300"
              >
                Pedir muestra
              </button>
            </div>
          </div>
        ) : (
          /* ─── MODO HOGAR (B2C): precio simple ─── */
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-disa-blue/35">Desde / m²</span>
              <span className="text-2xl font-black tracking-tight text-disa-blue">
                ${precioB2C.toLocaleString("es-CO")}
              </span>
            </div>
            <button
              onClick={() => onExplorar?.(producto)}
              className="w-full bg-disa-gold text-white py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-disa-gold-light transition-all duration-300"
            >
              Solicitar información →
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
};