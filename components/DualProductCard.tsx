"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const DualProductCard = ({ product, viewMode }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Estados para el cotizador B2B
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');

  const basePriceB2B = Number(product.priceB2B) || 0;
  const basePriceB2C = Number(product.priceB2C) || 0;
  
  // Lógica del cotizador: Si hay medidas, calcula área * precio. Si no, muestra precio base.
  const area = (Number(width) || 0) * (Number(height) || 0);
  const displayPriceB2B = area > 0 ? area * basePriceB2B : basePriceB2B;

  const imageUrl = `https://images.unsplash.com/${product.imageCode || 'photo-1506224477000-07aa8a76be0d'}?auto=format&fit=crop&q=80&w=800`;

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white flex flex-col group h-[750px] overflow-hidden"
    >
      {/* IMAGEN DE ALTO IMPACTO (80% del espacio) */}
      <div className="relative h-3/4 w-full overflow-hidden bg-disa-sand">
        <Image 
          src={imageUrl}
          alt={product.name || "Colección DISA"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-disa-blue/10 group-hover:bg-transparent transition-colors duration-700" />

        {/* Overlay de Ficha Técnica (Solo B2B) */}
        <AnimatePresence>
          {isHovered && viewMode === 'technical' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-disa-blue/90 p-12 flex flex-col justify-end text-white z-20 backdrop-blur-md"
            >
              <h4 className="text-disa-gold font-black text-[9px] tracking-[0.5em] uppercase mb-6 italic">Ficha Técnica</h4>
              <div className="space-y-3 text-[10px] font-bold tracking-widest opacity-80 border-l border-disa-gold pl-6 uppercase">
                 <p>Espesor: 0.55mm ± 5%</p>
                 <p>Peso: 420g/m²</p>
                 <p>Protección UV: Bloqueo 99%</p>
                 <p>Ignífugo: Clase 1 (NFPA 701)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INFORMACIÓN Y COTIZADOR (Espacio Negativo Limpio) */}
      <div className="p-10 flex flex-col justify-between flex-grow bg-white z-30">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2 text-disa-blue">
              {product.name || "Premium"}
            </h3>
            <p className="text-[9px] font-bold text-disa-gold tracking-[0.4em] uppercase">
              {product.color || "Standard"}
            </p>
          </div>
          <button className="h-10 w-10 rounded-full border border-disa-blue/10 flex items-center justify-center group-hover:bg-disa-blue group-hover:text-white transition-all">
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Lógica Condicional: Cotizador vs Precio Standard */}
        <div className="mt-6 border-t border-disa-blue/10 pt-6">
          {viewMode === 'technical' ? (
            <div className="flex justify-between items-end">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="text-[7px] font-bold tracking-widest uppercase text-disa-blue/40 mb-1">Ancho (m)</label>
                  <input 
                    type="number" step="0.1" placeholder="0.00"
                    value={width} onChange={(e) => setWidth(e.target.value)}
                    className="w-16 bg-transparent border-b border-disa-gold/50 focus:border-disa-gold outline-none text-disa-blue text-sm font-bold italic"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[7px] font-bold tracking-widest uppercase text-disa-blue/40 mb-1">Alto (m)</label>
                  <input 
                    type="number" step="0.1" placeholder="0.00"
                    value={height} onChange={(e) => setHeight(e.target.value)}
                    className="w-16 bg-transparent border-b border-disa-gold/50 focus:border-disa-gold outline-none text-disa-blue text-sm font-bold italic"
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[8px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">
                  {area > 0 ? 'Total Proyecto' : 'Tarifa Base m²'}
                </span>
                <span className="text-3xl font-black tracking-tighter italic text-disa-blue">
                  ${displayPriceB2B.toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">
                Desde
              </span>
              <span className="text-4xl font-black tracking-tighter italic text-disa-blue">
                ${basePriceB2C.toLocaleString('es-CO')}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};