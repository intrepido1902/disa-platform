"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  // Estados de la plataforma
  const [mode, setMode] = useState<'distribuidor' | 'hogar'>('hogar');
  const [telas, setTelas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [medidas, setMedidas] = useState({ ancho: 1, alto: 1 });

  useEffect(() => {
    const fetchTelas = async () => {
      const { data } = await supabase.from('telas').select('*');
      if (data) setTelas(data);
    };
    fetchTelas();
  }, []);

  const filtered = telas.filter(t => 
    t.nombre.toLowerCase().includes(search.toLowerCase()) || 
    t.color.toLowerCase().includes(search.toLowerCase())
  );

  const calcularCotizacion = (precioM2: number) => {
    const area = Math.max(medidas.ancho * medidas.alto, 1);
    // En modo Hogar (B2C), se podría sumar un valor base por mecanismo/instalación
    const baseCostoMecanismo = mode === 'hogar' ? 85000 : 0;
    return Math.round((area * precioM2) + baseCostoMecanismo);
  };

  const contactarWA = () => {
    const tipo = mode === 'distribuidor' ? 'Distribuidor/B2B' : 'Cliente Final/Hogar';
    const msg = `Hola DISA, me interesa una cotización como ${tipo}:
Producto: ${selectedProduct.nombre} (${selectedProduct.color})
Medidas: ${medidas.ancho}m x ${medidas.alto}m
Total Estimado: $${calcularCotizacion(mode === 'distribuidor' ? selectedProduct.precio_m2_b2b : selectedProduct.precio_m2_b2c).toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen mode-transition">
      {/* NAVBAR UNIFICADA */}
      <nav className="bg-[#0A1F44] text-white py-6 px-8 sticky top-0 z-50 shadow-2xl border-b-2 border-[#C5A059]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-black tracking-tighter">DISA</h1>
            <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.4em] font-bold">Textiles & Ventanas</p>
          </div>

          {/* EL SMART SWITCH: LA PIEZA CLAVE */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setMode('hogar')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'hogar' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/60 hover:text-white'}`}
            >
              Para mi Hogar
            </button>
            <button 
              onClick={() => setMode('distribuidor')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'distribuidor' ? 'bg-[#C5A059] text-[#0A1F44]' : 'text-white/60 hover:text-white'}`}
            >
              Para mi Negocio
            </button>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="¿Qué material buscas?" 
              className="bg-white/10 border border-white/20 rounded-full px-6 py-2 text-sm outline-none focus:bg-white focus:text-[#0A1F44] transition-all w-64"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* HERO DINÁMICO */}
      <header className="bg-white py-20 px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-[#0A1F44] leading-none mb-6">
            {mode === 'hogar' ? 'CONVIERTE TU CASA EN UN SANTUARIO' : 'SUMINISTRO TEXTIL DE ALTO RENDIMIENTO'}
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            {mode === 'hogar' 
              ? 'Cortinas y persianas personalizadas con instalación profesional y asesoría experta.' 
              : 'Precios de fábrica, stock garantizado y fichas técnicas para fabricantes y distribuidores.'}
          </p>
        </div>
      </header>

      {/* CATÁLOGO INTELIGENTE */}
      <section className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((tela) => (
            <div key={tela.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0A1F44]/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-[#0A1F44] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    {mode === 'hogar' ? 'Solución Terminada' : 'Venta por Metro'}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold text-[#0A1F44] mb-2 leading-tight">{tela.nombre}</h3>
                <p className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-8">{tela.color} • {tela.nivel_opacidad}</p>

                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-end pb-4 border-b border-gray-50">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Referencia de mercado</span>
                    <span className="text-sm text-gray-300 line-through">${tela.precio_m2_b2c.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#0A1F44] uppercase tracking-tighter">
                      {mode === 'hogar' ? 'Inversión Sugerida' : 'Precio Distribuidor'}
                    </span>
                    <span className="text-4xl font-black text-[#0A1F44]">
                      ${(mode === 'hogar' ? tela.precio_m2_b2c : tela.precio_m2_b2b).toLocaleString('es-CO')}
                      <small className="text-xs font-normal opacity-40 ml-1">/m²</small>
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProduct(tela)}
                  className="w-full bg-[#0A1F44] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#C5A059] transition-all shadow-xl"
                >
                  {mode === 'hogar' ? 'Personalizar mi cortina' : 'Cotizar para proyecto'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-[#0A1F44] text-white py-20 px-8 text-center border-t-8 border-[#C5A059]">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold mb-4 italic">"Calidad que se siente, tecnología que se nota."</h4>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-10">Bogotá • Medellín • Barranquilla • Cartagena</p>
          <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-[#C5A059]">Instagram</a>
            <a href="#" className="hover:text-[#C5A059]">Showroom</a>
            <a href="#" className="hover:text-[#C5A059]">Políticas</a>
          </div>
        </div>
      </footer>

      {/* MODAL DE COTIZACIÓN DINÁMICO */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#0A1F44]/95 backdrop-blur-xl flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[2rem] p-12 max-w-lg w-full shadow-2xl relative overflow-hidden border-b-[12px] border-[#C5A059]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-3xl font-light">&times;</button>
            
            <h3 className="text-3xl font-black text-[#0A1F44] mb-2 leading-none uppercase tracking-tighter">Tu Cotización</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">
              {mode === 'hogar' ? 'Detalle de Solución Final' : 'Pedido Técnico Mayorista'}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ancho Estimado (m)</label>
                <input 
                  type="number" step="0.1" value={medidas.ancho} 
                  onChange={(e) => setMedidas({...medidas, ancho: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 text-xl font-bold outline-none focus:border-[#C5A059]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alto Estimado (m)</label>
                <input 
                  type="number" step="0.1" value={medidas.alto} 
                  onChange={(e) => setMedidas({...medidas, alto: parseFloat(e.target.value) || 0})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 text-xl font-bold outline-none focus:border-[#C5A059]" 
                />
              </div>
            </div>

            <div className="bg-[#0A1F44] rounded-[1.5rem] p-8 text-white mb-10 text-center shadow-2xl">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em] mb-3">Total Inversión</p>
              <p className="text-5xl font-black">${calcularCotizacion(mode === 'hogar' ? selectedProduct.precio_m2_b2c : selectedProduct.precio_m2_b2b).toLocaleString('es-CO')}</p>
              {mode === 'hogar' && <p className="text-[9px] text-white/50 mt-4 italic font-medium uppercase tracking-widest">Incluye mecanismo y asesoría base</p>}
            </div>

            <button 
              onClick={contactarWA}
              className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3"
            >
              Contactar Asesor DISA
            </button>
          </div>
        </div>
      )}
    </main>
  );
}