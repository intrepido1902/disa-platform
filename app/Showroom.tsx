"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Showroom = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="py-40 px-12 bg-white overflow-hidden relative border-y border-disaBlue/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        
        <motion.div style={{ y: y1 }} className="space-y-12">
          <h4 className="text-disaGold text-[10px] font-black tracking-[0.6em] uppercase mb-6 italic">Arquitectura & Control Solar</h4>
          <h3 className="text-7xl font-black italic tracking-tighter leading-none uppercase">
            Sistemas <br/> que definen <br/> el espacio.
          </h3>
          <p className="text-disaBlue/60 text-lg font-light leading-relaxed max-w-sm">
            Nuestros textiles no solo cubren ventanas; filtran la luz para crear atmósferas de alto rendimiento en residencias y corporativos.
          </p>
          <div className="flex gap-12 pt-10 border-t border-disaBlue/5">
            <div>
              <p className="text-5xl font-black italic">1M+</p>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">m² Suministrados</p>
            </div>
            <div>
              <p className="text-5xl font-black italic">ISO</p>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Calidad Certificada</p>
            </div>
          </div>
        </motion.div>

        {/* Composición de Imágenes Parallax */}
        <div className="relative h-[650px] flex items-center justify-center">
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-0 right-0 w-2/3 h-4/5 bg-disaBlue shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
          >
            {/* Aquí va una foto de edificio moderno */}
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-8xl italic">DISA</div>
          </motion.div>
          
          <motion.div 
            style={{ y: y1 }}
            className="absolute bottom-0 left-0 w-1/2 h-3/5 bg-disaGold shadow-2xl z-10 border-[12px] border-white flex items-center justify-center"
          >
            {/* Aquí va una foto detalle de tela */}
            <span className="text-white/20 font-black text-4xl italic">TEXTURE</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};