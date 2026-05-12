"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// ============================================================
// CategoriesStrip — Banda editorial 3 categorías premium
// Inspirado en Restoration Hardware / West Elm
// ============================================================

const CATEGORIES = [
  {
    id: "cortinas",
    title: "Cortinas",
    subtitle: "Sheer · Blackout · Lino",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=85&w=1200",
    href: "#cortinas",
  },
  {
    id: "persianas",
    title: "Persianas",
    subtitle: "Roller · Romanas · Verticales",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=85&w=1200",
    href: "#persianas",
  },
  {
    id: "screen",
    title: "Screen Solar",
    subtitle: "Control térmico arquitectónico",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=85&w=1200",
    href: "#screen",
  },
];

export const CategoriesStrip = () => {
  return (
    <section className="bg-disa-sand py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-disa-gold" />
              <p className="text-disa-gold text-[10px] font-bold tracking-[0.5em] uppercase">
                Catálogo
              </p>
            </div>
            <h2 className="text-disa-blue text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              Tres líneas, <br />
              infinitas atmósferas.
            </h2>
          </div>
          <p className="text-disa-blue/60 text-base font-light max-w-sm leading-relaxed">
            Cada colección está pensada para resolver una necesidad arquitectónica
            específica. Encuentra la tuya.
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              {/* Overlay base */}
              <div className="absolute inset-0 bg-gradient-to-t from-disa-blue/90 via-disa-blue/30 to-transparent transition-opacity duration-700 group-hover:from-disa-blue/95" />

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                <div className="flex items-center gap-3 mb-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="h-px w-8 bg-disa-gold" />
                  <p className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase">
                    {cat.subtitle}
                  </p>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none transition-transform duration-500 group-hover:-translate-y-1">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-3 mt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Explorar
                  </span>
                  <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
