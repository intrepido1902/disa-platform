"use client";
import { motion } from "framer-motion";

const DIFERENCIADORES = [
  {
    numero: "01",
    titulo: "Asesoría Personalizada",
    descripcion: "Un experto de DISA visita tu espacio, entiende tu estilo y recomienda la solución perfecta. Sin costo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Instalación Profesional",
    descripcion: "Nuestro equipo instala con precisión milimétrica. Garantizamos un acabado perfecto desde el primer día.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Calidad Certificada ISO",
    descripcion: "Todos nuestros textiles cumplen estándares internacionales de calidad, ignifugación y protección UV.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    numero: "04",
    titulo: "Garantía Real",
    descripcion: "Respaldamos cada instalación con garantía de 2 años en materiales y mano de obra. Tu inversión, protegida.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
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
                La diferencia DISA
              </p>
            </div>
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              ¿Por qué <br />
              <span className="text-disa-gold">elegirnos?</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-white/50 text-base font-light leading-relaxed">
              No vendemos cortinas. Creamos experiencias espaciales que transforman
              cómo vives y trabajas. Esto es lo que nos hace diferentes.
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
              {/* Número */}
              <span className="text-disa-gold/30 text-5xl font-black tracking-tighter leading-none group-hover:text-disa-gold/50 transition-colors duration-500">
                {item.numero}
              </span>

              {/* Ícono */}
              <div className="text-disa-gold">
                {item.icon}
              </div>

              {/* Texto */}
              <div>
                <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight mb-3">
                  {item.titulo}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {item.descripcion}
                </p>
              </div>

              {/* Línea bottom decorativa */}
              <div className="h-px w-0 bg-disa-gold transition-all duration-700 group-hover:w-full mt-auto" />
            </motion.div>
          ))}
        </div>

        {/* CTA central */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-white/40 text-sm font-light max-w-sm">
            Más de 500 proyectos realizados en Colombia. Únete a los que ya viven diferente.
          </p>
          <a
            href="#cotizar"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#cotizar")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 bg-disa-gold text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
          >
            Agenda tu asesoría gratis
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};