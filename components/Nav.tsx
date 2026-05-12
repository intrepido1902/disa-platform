"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#catalogo", label: "Colecciones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
];

const INSTAGRAM_URL = "https://www.instagram.com/disa.textil?igsh=MW11aDFvOGNianY0Nw==";

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled
            ? "bg-white/96 backdrop-blur-xl border-b border-disa-blue/8 py-3 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">

          {/* Logo — imagen real */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <div className={`relative transition-all duration-500 ${isScrolled ? "h-10 w-32" : "h-12 w-36"}`}>
              <Image
                src="/imagenes/logo/logo.png"
                alt="DISA — Textiles y Persianas Colombia"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-[10px] font-bold uppercase tracking-[0.35em] transition-colors duration-300 group ${
                      isScrolled ? "text-disa-blue hover:text-disa-gold" : "text-white hover:text-disa-gold"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-disa-gold transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Instagram icon */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de DISA"
              className={`transition-colors duration-300 ${isScrolled ? "text-disa-blue hover:text-disa-gold" : "text-white hover:text-disa-gold"}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* CTA Cotizar */}
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 bg-disa-gold text-white px-7 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-disa-gold-light transition-all duration-500 group"
            >
              Cotizar
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden flex flex-col gap-[5px] p-2 transition-colors ${isScrolled ? "text-disa-blue" : "text-white"}`}
            aria-label="Menú"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-px bg-current transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`w-6 h-px bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-6 h-px bg-current transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] bg-disa-blue flex flex-col items-center justify-center lg:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl p-2"
              aria-label="Cerrar menú"
            >
              ✕
            </button>

            {/* Logo en mobile menu */}
            <div className="relative h-14 w-44 mb-16">
              <Image src="/imagenes/logo/logo.png" alt="DISA" fill className="object-contain" />
            </div>

            <ul className="flex flex-col gap-10 items-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-2xl font-black uppercase tracking-[0.2em] hover:text-disa-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <a
                href="#cotizar"
                onClick={() => setIsMenuOpen(false)}
                className="bg-disa-gold text-white px-12 py-4 text-[11px] font-black uppercase tracking-[0.3em]"
              >
                Cotizar →
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-disa-gold transition-colors text-[10px] tracking-[0.3em] uppercase font-bold"
              >
                @disa.textil
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};