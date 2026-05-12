"use client";
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from './Logo'; 
import { Showroom } from './Showroom'; 
import { DualProductCard } from './DualProductCard';

interface HomePageClientProps {
  initialTelas: any[];
}

export default function HomePageClient({ initialTelas }: HomePageClientProps) {
  const [viewMode, setViewMode] = useState<'technical' | 'inspirational'>('inspirational');
  
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.96]);

  const imageCodes = [
    'photo-1506224477000-07aa8a76be0d', // Lino Blanco
    'photo-1528459801416-a9e53bbf4e17', // Trama Gris
    'photo-1584622650111-993a426fbf0a', // Textura Arena
    'photo-1615529328331-f8917597711f', // Screen
    'photo-1541701494587-cb58502866ab'  // Blackout
  ];

  return (
    <main className="relative min-h-screen bg-disa-sand font-sans">
      {/* NAV INVISIBLE */}
      <nav className="fixed top-0 w-full z-[100] px-8 md:px-16 py-12 flex justify-between items-center mix-blend-difference text-white">
        <div className="w-32 md:w-48">
          <Logo className="w-full h-auto text-white" />
        </div>
        
        <div className="hidden lg:flex gap-16 text-[9px] font-bold uppercase tracking-[0.4em]">
          <a href="#catalogo" className="hover:text-disa-gold transition-colors duration-500">Colecciones</a>
          <a href="#showroom" className="hover:text-disa-gold transition-colors duration-500">Proyectos</a>
          <button className="bg-white text-disa-blue px-8 py-3 rounded-full hover:bg-disa-gold transition-all duration-500 font-black tracking-widest">
            Cotizar
          </button>
        </div>
      </nav>

      {/* HERO EDGE-TO-EDGE */}
      <motion.header 
        style={{ scale }} 
        className="h-screen bg-disa-blue relative flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
            {/* Opcional: Imagen de fondo oscura aquí para más impacto */}
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-disa-gold text-[10px] font-black tracking-[1em] uppercase mb-8 italic"
            >
              Control Solar & Arquitectura
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-white text-[13vw] font-black uppercase italic leading-[0.75] tracking-tighter"
            >
              Viste el <br/> Espacio.
            </motion.h2>
          </div>
          
          {/* Toggles Minimalistas */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex bg-white/5 p-1 rounded-full backdrop-blur-3xl border border-white/10 mb-4"
          >
            <button 
              onClick={() => setViewMode('inspirational')}
              className={`px-10 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${viewMode === 'inspirational' ? 'bg-white text-disa-blue' : 'text-white/40 hover:text-white'}`}
            > Hogar </button>
            <button 
              onClick={() => setViewMode('technical')}
              className={`px-10 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${viewMode === 'technical' ? 'bg-white text-disa-blue' : 'text-white/40 hover:text-white'}`}
            > B2B </button>
          </motion.div>
        </div>
      </motion.header>

      <section id="showroom">
        <Showroom />
      </section>

      {/* SECCIÓN DE AUTORIDAD (ESPACIO NEGATIVO MASIVO) */}
      <section id="empresa" className="bg-disa-sand py-48 px-8 md:px-16 flex flex-col md:flex-row justify-between items-end gap-20">
        <div className="max-w-3xl">
          <h4 className="text-disa-gold text-[10px] font-black tracking-[0.5em] uppercase mb-12 italic">Especificación Técnica</h4>
          <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-disa-blue">
            Materiales <br/> que rinden.
          </h3>
        </div>
      </section>

      {/* CATÁLOGO PREMIUM (BORDES DE 1PX) */}
      <section id="catalogo" className="bg-disa-blue/10 p-px">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-disa-blue/10">
          {initialTelas.map((tela, index) => (
            <DualProductCard 
              key={tela.id} 
              product={{
                name: tela.nombre,
                color: tela.color,
                priceB2B: tela.precio_m2_b2b, 
                priceB2C: tela.precio_m2_b2c,
                imageCode: imageCodes[index % imageCodes.length] 
              }}
              viewMode={viewMode}
            />
          ))}
        </div>
      </section>

      {/* FOOTER ARQUITECTÓNICO */}
      <footer className="bg-disa-sand py-24 px-8 md:px-16 flex justify-between items-center border-t border-disa-blue/10">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-disa-blue/40">DISA © 2026</p>
        <Logo className="w-24 text-disa-blue opacity-20" />
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-disa-gold">Bogotá, Colombia</p>
      </footer>
    </main>
  );
}