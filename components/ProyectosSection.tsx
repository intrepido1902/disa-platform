"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PROYECTOS = [
  {
    id: 1,
    ciudad: "Bogotá",
    tipo: "Residencial",
    tela: "Sheer Elegance",
  antes: "/proyectos/proyecto1-antes.png",
despues: "/proyectos/proyecto1-despues.png",
    descripcion: "Transformación completa de sala-comedor con cortinas Sheer Elegance en tono marfil.",
  },
  {
    id: 2,
    ciudad: "Medellín",
    tipo: "Residencial",
    tela: "Cortina Blackout Pro",
    antes: "/proyectos/proyecto2-antes.png",
    despues: "/proyectos/proyecto2-despues.png",
    descripcion: "Dormitorio principal con blackout total para un descanso perfecto.",
  },
  {
    id: 3,
    ciudad: "Cali",
    tipo: "Corporativo",
    tela: "Screen Solar Plus",
    antes: "/proyectos/proyecto3-antes.png",
    despues: "/proyectos/proyecto3-despues.png",
    descripcion: "Oficinas corporativas con control solar premium para mayor productividad.",
  },
]

const ProjectCard = ({ proyecto, idx }: { proyecto: typeof PROYECTOS[0]; idx: number }) => {
  const [showDespues, setShowDespues] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.12 }}
      className="group"
    >
      {/* Imagen con toggle antes/después */}
      <div className="relative aspect-[4/3] overflow-hidden bg-disa-sand mb-5">
        {/* Usamos img nativo para evitar problemas con Next.js Image en archivos locales PNG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showDespues ? proyecto.despues : proyecto.antes}
          alt={`${showDespues ? "Después" : "Antes"} — ${proyecto.ciudad}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/75 via-disa-blue/10 to-transparent pointer-events-none" />

        {/* Toggle antes/después */}
        <div className="absolute top-4 left-4 flex bg-white/15 backdrop-blur-sm rounded-full p-1 gap-1 z-10">
          <button
            onClick={() => setShowDespues(false)}
            className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              !showDespues ? "bg-white text-disa-blue" : "text-white/70 hover:text-white"
            }`}
          >
            Antes
          </button>
          <button
            onClick={() => setShowDespues(true)}
            className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              showDespues ? "bg-disa-gold text-white" : "text-white/70 hover:text-white"
            }`}
          >
            Después
          </button>
        </div>

        {/* Info en bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-10">
          <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase mb-1">
            {proyecto.tipo} · {proyecto.tela}
          </p>
          <h3 className="text-white text-2xl font-black uppercase tracking-tight">
            {proyecto.ciudad}
          </h3>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-disa-blue/60 text-sm font-light leading-relaxed">
        {proyecto.descripcion}
      </p>
    </motion.div>
  );
};

export const ProyectosSection = () => {
  return (
    <section
      id="proyectos"
      className="bg-disa-sand py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20"
    >
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
                Proyectos Realizados
              </p>
            </div>
            <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              Espacios que <br />
              <span className="text-disa-gold">hablan por sí solos.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-disa-blue/55 text-base font-light leading-relaxed">
              Cada proyecto es una transformación real. Alterna entre antes y
              después para ver el impacto de nuestras soluciones textiles.
            </p>
          </div>
        </motion.div>

        {/* Grid proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PROYECTOS.map((proyecto, idx) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} idx={idx} />
          ))}
        </div>

        {/* CTA — sin el texto de 500 proyectos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="https://www.instagram.com/disa.textil?igsh=MW11aDFvOGNianY0Nw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-disa-blue/20 text-disa-blue px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-blue hover:text-white transition-all duration-500 group"
          >
            Ver más en Instagram
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};