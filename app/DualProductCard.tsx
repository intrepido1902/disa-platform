"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const DualProductCard = ({ product, viewMode }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generador de URL de Unsplash optimizada
  const imageUrl = `https://images.unsplash.com/${product.imageCode}?auto=format&fit=crop&q=80&w=800`;

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white border-r border-b border-disaBlue/5 flex flex-col group h-[700px] overflow-hidden"
    >
      <div className="relative h-2/3 w-full overflow-hidden bg-disaSand">
        <Image 
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-disaBlue/20 group-hover:bg-disaBlue/40 transition-colors duration-700" />

        <AnimatePresence>
          {isHovered && viewMode === 'technical' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-disaBlue/80 p-12 flex flex-col justify-end text-white z-20 backdrop-blur-sm"
            >
              <h4 className="text-disaGold font-black text-[10px] tracking-[0.5em] uppercase mb-4 italic">Ficha Técnica</h4>
              <div className="space-y-2 text-xs font-light tracking-widest opacity-80 border-l border-disaGold pl-4">
                 <p>Protección UV: 98%</p>
                 <p>Ancho: 3.00m</p>
                 <p>Certificación: FR (Fire Retardant)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-10 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">
            {product.name}
          </h3>
          <p className="text-[10px] font-bold text-disaGold tracking-[0.4em] uppercase">
            {product.color}
          </p>
        </div>

        <div className="flex justify-between items-end border-t border-disaBlue/5 pt-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em] mb-1">
              {viewMode === 'technical' ? 'Tarifa Mayorista' : 'Precio Sugerido'}
            </span>
            <span className="text-4xl font-black tracking-tighter italic">
              ${(viewMode === 'technical' ? product.priceB2B : product.priceB2C).toLocaleString('es-CO')}
            </span>
          </div>
          <button className="h-12 w-12 rounded-full border border-disaBlue/10 flex items-center justify-center group-hover:bg-disaBlue group-hover:text-white transition-all">
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};