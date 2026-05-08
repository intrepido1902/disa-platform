export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-[#0A1F44] p-12 rounded-2xl shadow-2xl text-center max-w-2xl border border-[#C5A059]/30">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          DISA
        </h1>
        <p className="text-[#E8E0D5] text-lg md:text-xl mb-8">
          Distribución de Textiles y Persianas Premium en Colombia.
        </p>
        <button className="bg-[#C5A059] text-[#0A1F44] px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-lg">
          Ver Catálogo B2B
        </button>
      </div>
    </main>
  );
}