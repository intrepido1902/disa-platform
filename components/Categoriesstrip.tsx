"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "cortinas",
    title: "Cortinas",
    subtitle: "Sheer · Blackout · Lino Natural",
    image: "/imagenes/productos/cortina-blackout-pro.jpeg",
    href: "#catalogo",
  },
  {
    id: "persianas",
    title: "Persianas",
    subtitle: "Roller · Romanas · Verticales",
    image: "/imagenes/productos/roller-premium.jpeg",
    href: "#catalogo",
  },
  {
    id: "screen",
    title: "Screen Solar",
    subtitle: "Control térmico arquitectónico",
    image: "/imagenes/productos/screen-sun-control.jpeg",
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
                Líneas
              </p>
            </div>
            <h2 className="text-disa-blue text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9]">
              Tres líneas, <br className="hidden md:block" />
              infinitas atmósferas.
            </h2>
          </div>
          <p className="text-disa-blue/55 text-sm md:text-base font-light max-w-xs leading-relaxed">
            Cada colección resuelve una necesidad específica de luz y privacidad.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.07]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/90 via-disa-blue/25 to-transparent transition-all duration-700 group-hover:from-disa-blue/95" />

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8 text-white">
                <motion.div
                  className="flex items-center gap-3 mb-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <span className="h-px w-6 bg-disa-gold" />
                  <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                    {cat.subtitle}
                  </p>
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none transition-transform duration-500 group-hover:-translate-y-1">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-3 mt-5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Explorar</span>
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