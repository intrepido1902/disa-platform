"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const DualProductCard = ({ product, viewMode }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white border-r border-b border-disaBlue/5 flex flex-col group overflow-hidden"
    >
      {/* 1. IMAGEN DE ALTA CALIDAD (El corazón de la venta) */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Placeholder que simula carga de imagen real */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
           <span className="text-disaBlue/5 font-black text-6xl italic">DISA</span>
        </div>
        
        {/* Overlay de información técnica al hacer hover */}
        <div className="absolute inset-0 bg-disaBlue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-12 text-white">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-disaGold">Ficha Técnica</p>
          <div className="space-y-2 text-sm font-light">
             <p>Composición: 100% Poliéster</p>
             <p>Ancho: 2.50m / 3.00m</p>
             <p>Nivel de Protección: 95% UV</p>
          </div>
        </div>
      </div>

      {/* 2. CONTENIDO EDITORIAL */}
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase italic leading-none mb-2">
              {product.name}
            </h3>
            <p className="text-[10px] font-bold text-disaGold tracking-[0.4em] uppercase">
              {product.color}
            </p>
          </div>
          <span className="text-[9px] border border-disaBlue/20 px-2 py-1 rounded-full uppercase font-bold">
            {viewMode === 'technical' ? 'B2B' : 'B2C'}
          </span>
        </div>

        <div className="mt-auto flex justify-between items-end border-t border-disaBlue/5 pt-8">
          <div>
            <p className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-1">
              {viewMode === 'technical' ? 'Precio Distribuidor' : 'Inversión Hogar'}
            </p>
            <p className="text-4xl font-black tracking-tighter italic">
              ${(viewMode === 'technical' ? product.priceB2B : product.priceB2C).toLocaleString('es-CO')}
            </p>
          </div>
          
          <button className="h-12 w-12 rounded-full border border-disaBlue/10 flex items-center justify-center hover:bg-disaBlue hover:text-white transition-all duration-500">
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};