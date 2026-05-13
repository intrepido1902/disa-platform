"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "screen",
    title: "Screen Solar",
    subtitle: "Apertura 3% · 5% · 10%",
    detail: "Control térmico y visual. La referencia más pedida por instaladores y fabricantes de sistemas roller.",
    image: "/imagenes/productos/screen-sun-control.jpeg",
    href: "#catalogo",
  },
  {
    id: "blackout",
    title: "Blackout",
    subtitle: "Bloqueo total de luz · Clase 1",
    detail: "Certificación ignífuga NFPA 701. Material preferido por fabricantes de cortinas para hoteles y oficinas.",
    image: "/imagenes/productos/cortina-blackout-pro.jpeg",
    href: "#catalogo",
  },
  {
    id: "sheer",
    title: "Sheer & Lino",
    subtitle: "Transparencias · Fibras naturales",
    detail: "Colecciones premium para talleres y decoradores que trabajan proyectos residenciales de alto nivel.",
    image: "/imagenes/productos/sheer-elegance.jpeg",
    href: "#catalogo",
  },
];

export const CategoriesStrip = () => {
  return (
    <section className="bg-disa-sand py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-disa-gold flex-shrink-0" />
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Líneas de producto
              </p>
            </div>
            <h2 className="text-disa-blue text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9]">
              Tres líneas. <br />
              Todo lo que tu taller necesita.
            </h2>
          </div>
          <p className="text-disa-blue/55 text-sm md:text-base font-light max-w-xs leading-relaxed">
            Cada línea resuelve un segmento diferente del mercado. Disponibles
            para distribuidores en todo Colombia.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(cat.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: idx * 0.12 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/95 via-disa-blue/30 to-transparent transition-all duration-700" />

              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8 text-white">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mb-3">
                  <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                    {cat.subtitle}
                  </p>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-3 transition-transform duration-500 group-hover:-translate-y-1">
                  {cat.title}
                </h3>
                <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  {cat.detail}
                </p>
                <div className="flex items-center gap-3 mt-5 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Ver referencias</span>
                  <span className="text-sm transition-transform duration-500 group-hover:translate-x-2">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};