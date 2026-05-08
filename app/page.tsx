"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [telas, setTelas] = useState<any[]>([]);
  const [selectedTela, setSelectedTela] = useState<any>(null);
  const [medidas, setMedidas] = useState({ ancho: 1, alto: 1 });

  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  const calcularPrecio = (precioM2: number) => {
    const area = medidas.ancho * medidas.alto;
    return Math.round((area < 1 ? 1 : area) * precioM2);
  };

  return (
    <main className="min-h-screen bg-[#EBE0D5] pb-20">
      <header className="bg-[#0A1F44] text-white py-12 px-6 shadow-2xl border-b-4 border-[#C5A059] text-center">
        <h1 className="text-6xl font-black tracking-tighter mb-2 uppercase">DISA</h1>
        <p className="text-[#C5A059] tracking-[0.4em] uppercase text-xs font-bold">Textiles y Persianas</p>
      </header>

      <section className="max-w-6xl mx-auto py-12 px-4"> 
  <div className="flex items-center gap-4 mb-10">
    <h2 className="text-3xl font-bold text-[#0A1F44] tracking-tight">Portafolio de Telas</h2>
    <div className="h-0.5 flex-grow bg-[#C5A059]/30"></div>
  </div>

  {/* Este grid es el que organiza las tarjetas */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {telas.map((tela) => (
      <div key={tela.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300">
        {/* ... resto del contenido de la tarjeta igual ... */}
      </div>
    ))}
  </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {telas.map((tela) => (
            <div key={tela.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:scale-[1.02] transition-transform duration-300">
              <div className="h-40 bg-gray-50 flex items-center justify-center border-b relative">
                <span className="text-gray-200 font-black text-3xl italic select-none">DISA PREMIUM</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-1">{tela.nombre}</h3>
                <p className="text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-4">{tela.color}</p>
                <div className="bg-[#0A1F44]/5 p-4 rounded-xl border border-[#0A1F44]/10 mb-6">
                  <span className="text-[10px] font-black text-[#0A1F44] uppercase tracking-widest block mb-1">Precio Distribuidor</span>
                  <span className="text-2xl font-black text-[#0A1F44]">${tela.precio_m2_b2b.toLocaleString('es-CO')}</span>
                </div>
                <button onClick={() => setSelectedTela(tela)} className="mt-auto w-full bg-[#C5A059] text-[#0A1F44] font-bold py-3 rounded-lg shadow-md hover:bg-[#0A1F44] hover:text-white transition-all uppercase tracking-widest text-[10px]">
                  Calcular Cotización
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Cotización */}
      {selectedTela && (
        <div className="fixed inset-0 bg-[#0A1F44]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-t-8 border-[#C5A059]">
            <h3 className="text-xl font-bold text-[#0A1F44] mb-6">Cotizador Rápido</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <input type="number" placeholder="Ancho" className="border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#C5A059]" onChange={(e) => setMedidas({...medidas, ancho: parseFloat(e.target.value)})} />
              <input type="number" placeholder="Alto" className="border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#C5A059]" onChange={(e) => setMedidas({...medidas, alto: parseFloat(e.target.value)})} />
            </div>
            <div className="bg-[#0A1F44] rounded-2xl p-5 text-white text-center mb-6">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase mb-1">Total</p>
              <p className="text-3xl font-black">${calcularPrecio(selectedTela.precio_m2_b2b).toLocaleString('es-CO')}</p>
            </div>
            <button onClick={() => setSelectedTela(null)} className="w-full text-gray-400 font-bold uppercase text-[10px]">Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}