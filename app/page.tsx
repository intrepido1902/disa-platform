"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DualProductCard } from '@/app/DualProductCard';
import { motion } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [telas, setTelas] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'technical' | 'inspirational'>('inspirational');

  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  return (
    <main className="min-h-screen">
      {/* HEADER CINEMATOGRÁFICO */}
      <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex justify-between items-center mix-blend-difference text-white">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">DISA</h1>
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          <a href="#catalogo" className="hover:text-disaGold transition-colors">Portafolio</a>
          <a href="#proyectos" className="hover:text-disaGold transition-colors">Proyectos</a>
          <a href="#empresa" className="hover:text-disaGold transition-colors">Nuestra Trayectoria</a>
        </div>
      </nav>

      <header className="h-[90vh] bg-disaBlue flex flex-col justify-center px-12 relative overflow-hidden">
        {/* Aquí iría un video 4K de texturas textiles moviéndose con el viento */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 max-w-5xl">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-7xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-12"
          >
            Viste la <br/> arquitectura
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex bg-white/10 backdrop-blur-xl p-1 rounded-full border border-white/20">
              <button 
                onClick={() => setViewMode('inspirational')}
                className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'inspirational' ? 'bg-disaGold text-disaBlue' : 'text-white'}`}
              >
                Hogar & Diseño
              </button>
              <button 
                onClick={() => setViewMode('technical')}
                className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'technical' ? 'bg-disaGold text-disaBlue' : 'text-white'}`}
              >
                Suministro Industrial
              </button>
            </div>
            <p className="text-white/60 text-sm max-w-xs font-light">
              Soluciones integrales en textiles y persianas para los proyectos más ambiciosos de la región.
            </p>
          </div>
        </div>
      </header>

      {/* SECCIÓN DE PRUEBA SOCIAL / MÁQUINAS (Como Abaser) */}
      <section className="bg-white py-32 px-12 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div>
          <h4 className="text-5xl font-black italic mb-4">25+</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-disaGold">Años de experiencia técnica</p>
        </div>
        <div>
          <h4 className="text-5xl font-black italic mb-4">500+</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-disaGold">Distribuidores en el país</p>
        </div>
        <div>
          <h4 className="text-5xl font-black italic mb-4">Cert.</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-disaGold">Calidad internacional ISO</p>
        </div>
      </section>

      {/* CATÁLOGO PREMIUM */}
      <section id="catalogo" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-px">
        {telas.map((tela) => (
          <DualProductCard 
            key={tela.id} 
            product={{
              name: tela.nombre,
              color: tela.color,
              priceB2B: tela.precio_m2_b2b,
              priceB2C: tela.precio_m2_b2c,
            }}
            viewMode={viewMode}
          />
        ))}
      </section>
    </main>
  );
}