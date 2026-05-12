"use client";
import { Logo } from "./Logo";

// ============================================================
// Footer — Institucional premium con info real de DISA
// ============================================================

const FOOTER_SECTIONS = [
  {
    title: "Colecciones",
    links: [
      { label: "Cortinas", href: "#cortinas" },
      { label: "Persianas", href: "#persianas" },
      { label: "Screen Solar", href: "#screen" },
      { label: "Blackout", href: "#blackout" },
      { label: "Outdoor", href: "#outdoor" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Distribuidores B2B", href: "#b2b" },
      { label: "Showroom Bogotá", href: "#showroom" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Servicio",
    links: [
      { label: "Cotización online", href: "#cotizar" },
      { label: "Asesoría", href: "#asesoria" },
      { label: "Instalación", href: "#instalacion" },
      { label: "Garantía", href: "#garantia" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-disa-blue text-white">
      {/* ── Bloque principal ─────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand block */}
          <div className="lg:col-span-4">
            <Logo className="h-14 w-auto text-white mb-8" />
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm mb-8">
              Empresa colombiana especializada en textiles premium para cortinas
              y persianas. Soluciones B2B y B2C con presencia nacional.
            </p>

            {/* Contacto rápido */}
            <div className="space-y-3">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-disa-gold transition-colors group"
              >
                <span className="h-px w-6 bg-disa-gold transition-all duration-500 group-hover:w-10" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
                  +57 300 123 4567
                </span>
              </a>
              <a
                href="mailto:contacto@disatextiles.com"
                className="flex items-center gap-3 text-white/70 hover:text-disa-gold transition-colors group"
              >
                <span className="h-px w-6 bg-disa-gold transition-all duration-500 group-hover:w-10" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
                  contacto@disa.co
                </span>
              </a>
            </div>
          </div>

          {/* Secciones */}
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4 className="text-disa-gold text-[9px] font-bold tracking-[0.4em] uppercase mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white text-sm font-light transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase">
            DISA © 2026 · Textiles y Persianas
          </p>
          <p className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase">
            Bogotá, Colombia
          </p>
          <div className="flex gap-6">
            <a
              href="#privacidad"
              className="text-white/40 hover:text-disa-gold text-[10px] font-medium tracking-[0.3em] uppercase transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#terminos"
              className="text-white/40 hover:text-disa-gold text-[10px] font-medium tracking-[0.3em] uppercase transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
