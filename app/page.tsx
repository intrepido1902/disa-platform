"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [telas, setTelas] = useState<any[]>([]);
  const [selectedTela, setSelectedTela] = useState<any>(null);
  const [medidas, setMedidas] = useState({ ancho: 1, alto: 1 });

  // Cargar datos desde la base de datos
  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  // Lógica de cotización: mínimo de cobro 1m2
  const calcularPrecio = (precioM2: number) => {
    const area = medidas.ancho * medidas.alto;
    const areaFinal = area < 1 ? 1 : area;
    return Math.round(areaFinal * precioM2);
  };

  // Función para redirigir a WhatsApp con los datos
  const enviarWhatsApp = () => {
    const mensaje = `Hola DISA, solicito cotización para:
TELA: ${selectedTela.nombre}
COLOR: ${selectedTela.color}
MEDIDAS: ${medidas.ancho}m x ${medidas.alto}m
TOTAL DISTRIBUIDOR: $${calcularPrecio(selectedTela.precio_m2_b2b).toLocaleString('es-CO')}`;
    
    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <main className="min-h-screen pb-20">
      {/* CABECERA CORPORATIVA */}
      <header className="bg-[#0A1F44] text-white py-16 px-6 shadow-2xl border-b-4 border-[#C5A059] text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-2 uppercase" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          DISA
        </h1>
        <p className="text-[#C5A059] tracking-[0.4em] uppercase text-xs font-bold">
          Textiles y Persianas - Colombia
        </p>
      </header>

      {/* SECCIÓN DE CATÁLOGO */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-[#0A1F44]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Portafolio de Telas
          </h2>
          <div className="h-[2px] flex-grow bg-[#C5A059]/30"></div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {telas.map((tela) => (
            <div key={tela.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col group hover:scale-[1.02] transition-transform duration-300">
              {/* Visualización de Textura */}
              <div className="h-44 bg-gray-50 flex items-center justify-center border-b relative">
                <span className="text-gray-200 font-black text-4xl italic select-none">DISA PREMIUM</span>
                <div className="absolute top-4 right-4 bg-[#0A1F44] text-white text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  {tela.nivel_opacidad}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-1">{tela.nombre}</h3>
                <p className="text-sm text-[#C5A059] font-bold uppercase tracking-widest mb-6">Ref: {tela.color}</p>

                <div className="space-y-4 mb-8">
                  {/* Precio Público Sugerido */}
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PVP Sugerido</span>
                    <span className="text-sm text-gray-400 line-through">${tela.precio_m2_b2c.toLocaleString('es-CO')}</span>
                  </div>
                  {/* Precio Especial Distribuidor */}
                  <div className="flex justify-between items-center bg-[#0A1F44]/5 p-4 rounded-xl border border-[#0A1F44]/10">
                    <span className="text-[11px] font-black text-[#0A1F44] uppercase tracking-widest">Precio Distribuidor</span>
                    <span className="text-2xl font-black text-[#0A1F44]">${tela.precio_m2_b2b.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedTela(tela)}
                  className="mt-auto w-full bg-[#C5A059] text-[#0A1F44] font-bold py-4 rounded-lg shadow-md hover:bg-[#0A1F44] hover:text-white transition-all uppercase tracking-widest text-xs"
                >
                  Calcular Cotización
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL DEL COTIZADOR */}
      {selectedTela && (
        <div className="fixed inset-0 bg-[#0A1F44]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border-t-[10px] border-[#C5A059]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1F44]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Cotizador</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{selectedTela.nombre}</p>
              </div>
              <button onClick={() => setSelectedTela(null)} className="text-gray-300 hover:text-red-500 text-3xl font-light transition-colors">
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ancho (m)</label>
                <input 
                  type="number" step="0.1" value={medidas.ancho} 
                  onChange={(e) => setMedidas({...medidas, ancho: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 font-bold outline-none focus:border-[#C5A059]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alto (m)</label>
                <input 
                  type="number" step="0.1" value={medidas.alto} 
                  onChange={(e) => setMedidas({...medidas, alto: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 font-bold outline-none focus:border-[#C5A059]" 
                />
              </div>
            </div>

            <div className="bg-[#0A1F44] rounded-2xl p-6 text-white text-center shadow-inner mb-8">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-2">Inversión Distribuidor</p>
              <p className="text-4xl font-black">${calcularPrecio(selectedTela.precio_m2_b2b).toLocaleString('es-CO')}</p>
            </div>

            <button 
              onClick={enviarWhatsApp}
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Solicitar por WhatsApp
            </button>
          </div>
        </div>
      )}
    </main>
  );
}