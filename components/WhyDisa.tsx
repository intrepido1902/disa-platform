"use client";
import { motion } from "framer-motion";

const DIFERENCIADORES = [
  {
    numero: "01",
    titulo: "Stock permanente",
    descripcion: "Mantenemos inventario de las referencias más vendidas. Tu taller no para por desabastecimiento. Despachos desde Bogotá en 24-48 horas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Ficha técnica certificada",
    descripcion: "Cada tela tiene documentación completa: composición, peso, ancho, certificaciones ignífugas y UV. Respaldo técnico real para tus proyectos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Muestras sin costo",
    descripcion: "Antes de comprometerte con un pedido, te enviamos muestras físicas de las referencias que te interesan. Sin costo, sin trámites.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    numero: "04",
    titulo: "Precios por volumen",
    descripcion: "A mayor cantidad, mejor precio. Trabajamos con distribuidores y mayoristas con tarifas escalonadas por rollo y por mes de compra.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
  },
];

export const WhyDisa = () => {
  return (
    <section className="bg-disa-blue py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-7">
              <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Por qué trabajar con DISA
              </p>
            </div>
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              El proveedor que <br />
              <span className="text-disa-gold">tu negocio necesita.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-white/50 text-base font-light leading-relaxed">
              Llevamos más de 15 años siendo el aliado de fabricantes y
              distribuidores de cortinas en Colombia. Conocemos el negocio
              porque somos parte de él.
            </p>
          </div>
        </motion.div>

        {/* Grid diferenciadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {DIFERENCIADORES.map((item, idx) => (
            <motion.div
              key={item.numero}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: idx * 0.1 }}
              className="bg-disa-blue p-10 md:p-12 flex flex-col gap-6 group hover:bg-disa-blue-mid transition-colors duration-500"
            >
              <span className="text-disa-gold/25 text-5xl font-black tracking-tighter leading-none group-hover:text-disa-gold/50 transition-colors duration-500">
                {item.numero}
              </span>
              <div className="text-disa-gold">{item.icon}</div>
              <div>
                <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight mb-3">
                  {item.titulo}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
              <div className="h-px w-0 bg-disa-gold transition-all duration-700 group-hover:w-full mt-auto" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#catalogo"
            onClick={(e) => { e.preventDefault(); document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-3 bg-disa-gold text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
          >
            Ver catálogo completo
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={`https://wa.me/573007805902?text=${encodeURIComponent("Hola DISA 👋 Somos un taller/distribuidor interesados en trabajar con ustedes. ¿Pueden enviarnos información de precios mayoristas?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-500"
          >
            Hablar con un asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
};