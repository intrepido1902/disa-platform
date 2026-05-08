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
    <main className="min-h-screen pb-20">
      {/* HEADER PREMIUM */}
      <header className="bg-[#0A1F44] text-white py-12 px-6 shadow-2xl border-b-4 border-[#C5A059] text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>DISA</h1>
        <p className="text-[#C5A059] tracking-[0.4em] uppercase text-xs font-bold">Textiles y Persianas - Colombia</p>
      </header>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-[#0A1F44] whitespace-nowrap">Portafolio de Telas</h2>
          <div className="h-[2px] w-full bg-[#C5A059]/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {telas.map((tela) => (
            <div key={tela.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col group">
              <div className="h-44 bg-gray-50 flex items-center justify-center border-b border-gray-50 relative group-hover:bg-[#0A1F44]/5 transition-colors">
                <span className="text-gray-200 font-black text-4xl italic select-none uppercase tracking-tighter">DISA PREMIUM</span>
                <div className="absolute top-4 right-4 bg-[#0A1F44] text-white text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">
                  {tela.nivel_opacidad}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-1">{tela.nombre}</h3>
                <p className="text-sm text-[#C5A059] font-bold uppercase tracking-widest mb-6">Color: {tela.color}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Precio Público Sugerido</span>
                    <span className="text-sm text-gray-400 line-through">${tela.precio_m2_b2c.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F44]/5 p-4 rounded-xl border border-[#0A1F44]/10">
                    <span className="text-[11px] font-black text-[#0A1F44] uppercase tracking-widest">Precio Distribuidor</span>
                    <span className="text-2xl font-black text-[#0A1F44]">${tela.precio_m2_b2b.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedTela(tela)}
                  className="mt-auto w-full bg-[#C5A059] text-[#0A1F44] font-bold py-4 rounded-lg shadow-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  Cotizar Medidas
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedTela && (
        <div className="fixed inset-0 bg-[#0A1F44]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border-t-[10px] border-[#C5A059]">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl font-bold text-[#0A1F44]">Cotizador Rápido</h3>
              <button onClick={() => setSelectedTela(null)} className="text-gray-300 hover:text-red-500 text-3xl font-light">&times;</button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ancho (m)</label>
                <input type="number" step="0.1" value={medidas.ancho} onChange={(e) => setMedidas({...medidas, ancho: parseFloat(e.target.value)})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 font-bold outline-none focus:border-[#C5A059]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alto (m)</label>
                <input type="number" step="0.1" value={medidas.alto} onChange={(e) => setMedidas({...medidas, alto: parseFloat(e.target.value)})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 font-bold outline-none focus:border-[#C5A059]" />
              </div>
            </div>

            <div className="bg-[#0A1F44] rounded-2xl p-6 text-white text-center shadow-inner">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-2">Total Distribuidor</p>
              <p className="text-4xl font-black">${calcularPrecio(selectedTela.precio_m2_b2b).toLocaleString('es-CO')}</p>
            </div>

            <button onClick={() => window.open(`https://wa.me/573000000000?text=${encodeURIComponent(`Hola DISA, cotización para ${selectedTela.nombre} (${selectedTela.color}): ${medidas.ancho}x${medidas.alto}m. Total: $${calcularPrecio(selectedTela.precio_m2_b2b).toLocaleString('es-CO')}`)}`)} className="w-full mt-8 bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
              Enviar a WhatsApp
            </button>
          </div>
        </div>
      )}
    </main>
  );
}