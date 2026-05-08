"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DualProductCard } from '@/app/DualProductCard'; 
import { Logo } from './Logo'; 
import { Showroom } from './Showroom'; 
import { motion, useScroll, useTransform } from 'framer-motion';

// Configuración de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [telas, setTelas] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'technical' | 'inspirational'>('inspirational');
  const { scrollYProgress } = useScroll();
  
  // Efecto de escala cinematográfico para dar profundidad al hacer scroll
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Identificadores de imágenes de alta calidad (Unsplash) para el catálogo
  const imageCodes = [
    'photo-1506224477000-07aa8a76be0d',
    'photo-1528459801416-a9e53bbf4e17',
    'photo-1584622650111-993a426fbf0a',
    'photo-1615529328331-f8917597711f',
    'photo-1541701494587-cb58502866ab'
  ];

  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  return (
    <main className="min-h-screen selection:bg-[#C5A059] selection:text-white bg-[#F8F5F2]">
      {/* 1. NAVEGACIÓN TÁCTICA: mix-blend-difference para visibilidad dinámica */}
      <nav className="fixed top-0 w-full z-[100] px-12 py-10 flex justify-between items-center mix-blend-difference text-white">
        <div className="w-48">
          <Logo className="w-full h-auto text-white" />
        </div>
        
        <div className="hidden lg:flex gap-16 text-[9px] font-black uppercase tracking-[0.5em]">
          <a href="#catalogo" className="hover:text-[#C5A059] transition-colors">Curaduría</a>
          <a href="#showroom" className="hover:text-[#C5A059] transition-colors">Showroom</a>
          <a href="#contacto" className="bg-white text-[#0A1F44] px-8 py-2 rounded-full hover:bg-[#C5A059] transition-all">Contacto</a>
        </div>
      </nav>

      {/* 2. HERO SECTION: Impacto editorial con tipografía masiva (Visto en image_556cad) */}
      <motion.header 
        style={{ scale }} 
        className="h-screen bg-[#0A1F44] relative flex flex-col justify-center px-12 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#C5A059] text-[10px] font-black tracking-[1em] uppercase mb-8 italic"
          >
            Liderazgo Textil Latinoamericano
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-[12vw] font-black uppercase italic leading-[0.75] tracking-tighter mb-16"
          >
            Viste la <br/> arquitectura
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex bg-white/5 p-1 rounded-full backdrop-blur-3xl border border-white/10">
              <button 
                onClick={() => setViewMode('inspirational')}
                className={`px-12 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-700 ${viewMode === 'inspirational' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/40 hover:text-white'}`}
              >
                Hogar & Diseño
              </button>
              <button 
                onClick={() => setViewMode('technical')}
                className={`px-12 py-4 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-700 ${viewMode === 'technical' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/40 hover:text-white'}`}
              >
                Suministro B2B
              </button>
            </div>
          </div>
        </div>
        
        {/* Elemento Arquitectónico Flotante */}
        <div className="absolute right-0 top-0 h-full w-1/4 bg-white/5 -z-0 border-l border-white/5"></div>
      </motion.header>

      {/* 3. SHOWROOM SECTION: Factor Diferencial Arquitectónico */}
      <section id="showroom">
        <Showroom />
      </section>

      {/* 4. SECCIÓN DE AUTORIDAD COMERCIAL: Números que cierran negocios */}
      <section id="empresa" className="bg-white py-40 px-12 border-b border-[#0A1F44]/5 flex flex-col md:flex-row justify-between items-end gap-20">
        <div className="max-w-xl">
          <h4 className="text-[#C5A059] text-[10px] font-black tracking-[0.5em] uppercase mb-8 italic">Trayectoria & Ingeniería</h4>
          <h3 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] text-[#0A1F44]">
            Más de dos décadas <br/> tejiendo confianza.
          </h3>
        </div>
        <div className="flex gap-20">
          <div className="text-center">
            <p className="text-7xl font-black italic text-[#0A1F44]">25+</p>
            <p className="text-[9px] font-bold uppercase tracking-widest mt-2 opacity-30 italic">Años en el mercado</p>
          </div>
          <div className="text-center">
            <p className="text-7xl font-black italic text-[#0A1F44]">500+</p>
            <p className="text-[9px] font-bold uppercase tracking-widest mt-2 opacity-30 italic">Distribuidores</p>
          </div>
        </div>
      </section>

      {/* 5. CATÁLOGO PREMIUM: Rejilla de 1px arquitectónica */}
      <section id="catalogo" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-px border-t border-[#0A1F44]/5">
        {telas.map((tela, index) => (
          <DualProductCard 
            key={tela.id} 
            product={{
              ...tela,
              imageCode: imageCodes[index % imageCodes.length] 
            }}
            viewMode={viewMode}
          />
        ))}
      </section>

      <footer className="bg-white py-32 px-12 flex flex-col md:flex-row justify-between items-center border-t border-[#0A1F44]/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">DISA © 2026</p>
        <div className="h-px bg-[#0A1F44]/10 flex-grow mx-20 hidden md:block"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C5A059]">Líderes en Alta Decoración</p>
      </footer>
    </main>
  );
}