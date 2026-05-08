"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DualProductCard } from './DualProductCard'; 
import { Logo } from './Logo'; 
import { Showroom } from './Showroom'; 
import { motion, useScroll, useTransform } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [telas, setTelas] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'technical' | 'inspirational'>('inspirational');
  
  // SOLUCIÓN AL WARNING DE SCROLL: El contenedor DEBE ser relativo
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  const imageCodes = [
    'photo-1506224477000-07aa8a76be0d',
    'photo-1528459801416-a9e53bbf4e17',
    'photo-1584622650111-993a426fbf0a'
  ];

  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  return (
    <main className="relative min-h-screen bg-disa-sand"> {/* 'relative' añadido aquí */}
      <nav className="fixed top-0 w-full z-[100] px-12 py-10 flex justify-between items-center mix-blend-difference text-white">
        <div className="w-48"><Logo className="w-full h-auto text-white" /></div>
        <div className="hidden lg:flex gap-16 text-[9px] font-black uppercase tracking-[0.5em]">
          <a href="#catalogo" className="hover:text-disa-gold transition-colors">Portafolio</a>
          <a href="#showroom" className="hover:text-disa-gold transition-colors">Showroom</a>
          <button className="bg-white text-disa-blue px-8 py-2 rounded-full hover:bg-disa-gold transition-all">Contacto</button>
        </div>
      </nav>

      <motion.header 
        style={{ scale }} 
        className="h-screen bg-disa-blue relative flex flex-col justify-center px-12 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl">
          <motion.p className="text-disa-gold text-[10px] font-black tracking-[1em] uppercase mb-8 italic">
            Liderazgo Textil Latinoamericano
          </motion.p>
          <motion.h2 className="text-white text-[12vw] font-black uppercase italic tracking-tighter mb-16">
            Viste la <br/> arquitectura
          </motion.h2>
          
          <div className="flex bg-white/5 p-1 w-fit rounded-full backdrop-blur-3xl border border-white/10">
            <button 
              onClick={() => setViewMode('inspirational')}
              className={`px-12 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-700 ${viewMode === 'inspirational' ? 'bg-disa-gold text-disa-blue' : 'text-white/40'}`}
            > Hogar </button>
            <button 
              onClick={() => setViewMode('technical')}
              className={`px-12 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-700 ${viewMode === 'technical' ? 'bg-disa-gold text-disa-blue' : 'text-white/40'}`}
            > B2B </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/4 bg-white/5 border-l border-white/5"></div>
      </motion.header>

      <section id="showroom"><Showroom /></section>

      <section id="catalogo" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-px border-t border-disa-blue/5">
        {telas.map((tela, index) => (
          <DualProductCard 
            key={tela.id} 
            product={{
              name: tela.nombre, // Mapeo manual para asegurar que los nombres coincidan
              color: tela.color,
              priceB2B: tela.precio_m2_b2b, 
              priceB2C: tela.precio_m2_b2c,
              imageCode: imageCodes[index % imageCodes.length] 
            }}
            viewMode={viewMode}
          />
        ))}
      </section>
    </main>
  );
}