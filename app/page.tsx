"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DualProductCard } from '@/app/DualProductCard';

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
    <main className="min-h-screen bg-[#EBE0D5] pb-20">
      {/* Header con Switch de Perspectiva */}
      <header className="bg-[#0A1F44] text-white py-12 px-6 shadow-2xl border-b-4 border-[#C5A059] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">DISA</h1>
            <p className="text-[#C5A059] tracking-[0.3em] uppercase text-[10px] font-bold">Textiles & Ventanas</p>
          </div>

          {/* Selector de Perspectiva Premium */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setViewMode('inspirational')}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'inspirational' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/60 hover:text-white'}`}
            >
              Hogar
            </button>
            <button 
              onClick={() => setViewMode('technical')}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'technical' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/60 hover:text-white'}`}
            >
              Distribuidor
            </button>
          </div>
        </div>
      </header>

    {/* SECCIÓN DE PORTAFOLIO LIMPIA */}
<section className="max-w-6xl mx-auto py-20 px-6">
  <div className="flex items-center gap-4 mb-12">
    <h2 className="text-3xl font-bold text-[#0A1F44] italic uppercase tracking-tighter">
      {viewMode === 'technical' ? 'Suministro para Proyectos' : 'Inspiración para tu Espacio'}
    </h2>
    <div className="h-[2px] flex-grow bg-[#0A1F44]/10"></div>
  </div>

  {/* GRID ÚNICO */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-r border-b border-[#0A1F44]/10">
    {telas.map((tela) => (
      <DualProductCard 
        key={tela.id} 
        product={{
          name: tela.nombre,
          color: tela.color,
          priceB2B: tela.precio_m2_b2b,
          priceB2C: tela.precio_m2_b2c,
          imageUrl: "" 
        }}
        viewMode={viewMode}
      />
    ))}
  </div>
</section>

      <footer className="text-center py-20 border-t border-[#0A1F44]/5">
        <p className="text-[10px] font-bold text-[#0A1F44]/40 uppercase tracking-[0.4em]">
          DISA © 2026 • Liderazgo Textil en Latinoamérica
        </p>
      </footer>
    </main>
  );
}