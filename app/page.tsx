import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: telas } = await supabase.from('telas').select('*');

  return (
    <main className="min-h-screen bg-[#EBE0D5] font-sans text-[#333333]">
      {/* HEADER DINÁMICO */}
      <header className="bg-[#0A1F44] text-white py-12 px-6 shadow-xl border-b-4 border-[#C5A059]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold tracking-tighter mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              DISA
            </h1>
            <p className="text-[#C5A059] font-medium tracking-widest uppercase text-sm">
              Textiles y Persianas - Colombia
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-center">
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Estatus de Plataforma</p>
            <p className="font-bold text-[#C5A059]">CATÁLOGO ABIERTO B2B / B2C</p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold text-[#0A1F44]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Portafolio de Telas
          </h2>
          <div className="h-1 flex-grow bg-[#C5A059]/30 rounded-full"></div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {telas?.map((tela) => (
            <div 
              key={tela.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-[#0A1F44]/5"
            >
              {/* Espacio para Imagen (Textura) */}
              <div className="h-48 bg-[#333333]/5 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                <span className="text-gray-300 font-bold text-4xl italic opacity-20">DISA PREMIUM</span>
                <div className="absolute top-4 right-4 bg-[#0A1F44] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest">
                  {tela.nivel_opacidad}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-1 leading-tight">{tela.nombre}</h3>
                  <p className="text-[#C5A059] font-medium italic text-sm">Referencia: {tela.color}</p>
                </div>

                <div className="space-y-4">
                  {/* Bloque B2C */}
                  <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Precio Sugerido Público</p>
                      <p className="text-xl font-medium text-gray-500 line-through decoration-[#333333]/20">
                        ${tela.precio_m2_b2c.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">PVP</span>
                  </div>

                  {/* Bloque B2B */}
                  <div className="flex justify-between items-end bg-[#0A1F44]/5 p-4 rounded-xl border border-[#0A1F44]/10">
                    <div>
                      <p className="text-[10px] font-bold text-[#0A1F44] uppercase tracking-tighter">Precio Distribuidor / B2B</p>
                      <p className="text-3xl font-black text-[#0A1F44]">
                        ${tela.precio_m2_b2b.toLocaleString('es-CO')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#C5A059] uppercase italic">Ahorro {(100 - (tela.precio_m2_b2b * 100 / tela.precio_m2_b2c)).toFixed(0)}%</p>
                      <span className="text-[10px] text-[#0A1F44]/60 font-bold">MÍN. 1m²</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-[#C5A059] text-[#0A1F44] font-bold py-3 rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors duration-300 tracking-widest text-xs uppercase">
                  Cotizar Medidas
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-12 text-gray-500 text-xs tracking-widest uppercase">
        © 2026 DISA - Tecnología para el Sector Textil
      </footer>
    </main>
  );
}
