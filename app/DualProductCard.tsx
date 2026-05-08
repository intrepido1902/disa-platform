"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ProductProps {
  name: string;
  color: string;
  priceB2B: number;
  priceB2C: number;
  imageUrl: string;
}

export const DualProductCard = ({ 
  product, 
  viewMode 
}: { 
  product: ProductProps, 
  viewMode: 'technical' | 'inspirational' 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="group relative bg-white border-l border-b border-disaBlue/10 p-8 hover:bg-disaBlue transition-colors duration-700 cursor-pointer flex flex-col h-full"
    >
      {/* 1. CONTENEDOR DE IMAGEN / TEXTURA */}
      <div className="aspect-[3/4] mb-10 bg-gray-50 overflow-hidden relative border border-gray-100 group-hover:border-white/10 transition-colors duration-700">
        <div className="absolute inset-0 flex items-center justify-center text-disaBlue/5 font-black text-4xl italic uppercase tracking-tighter group-hover:text-white/5 transition-colors">
          DISA PREMIUM
        </div>
        {/* Aquí irá el <Image /> de Next.js cuando integres Cloudinary */}
      </div>

      {/* 2. IDENTIFICACIÓN DEL PRODUCTO */}
      <div className="space-y-3 mb-12">
        <h3 className="text-disaBlue group-hover:text-white font-display text-3xl font-black tracking-tighter uppercase italic leading-none transition-colors duration-500">
          {product.name}
        </h3>
        <p className="text-disaGold font-bold text-[10px] tracking-[0.4em] uppercase transition-colors">
          Referencia: {product.color}
        </p>
      </div>

      {/* 3. BLOQUE DE PRECIO DINÁMICO */}
      <div className="mt-auto pt-8 border-t border-disaBlue/5 group-hover:border-white/10 transition-colors">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[9px] text-disaBlue/40 group-hover:text-white/40 uppercase font-black tracking-[0.2em] mb-3 transition-colors">
              {viewMode === 'technical' ? 'Cotización Distribuidor' : 'Inversión Sugerida'}
            </p>
            
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-disaBlue group-hover:text-white transition-colors duration-500 tracking-tighter">
                  ${(viewMode === 'technical' ? product.priceB2B : product.priceB2C).toLocaleString('es-CO')}
                </span>
                <span className="text-[10px] font-medium text-disaGold uppercase tracking-widest mt-1">
                  {viewMode === 'technical' ? 'Valor por metro cuadrado' : 'Unidad terminada'}
                </span>
              </div>
              
              {/* Indicador de acción decorativo */}
              <div className="h-10 w-10 flex items-center justify-center border border-disaGold/30 group-hover:border-disaGold rounded-full transition-colors">
                <span className="text-disaGold group-hover:text-white text-xl">→</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};