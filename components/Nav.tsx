"use client";
import { Logo } from "./Logo";

// Usamos "export function" para que coincida con el "import { Nav }"
export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-[100] px-8 md:px-16 py-12 flex justify-between items-center mix-blend-difference text-white">
      <div className="w-32 md:w-48">
        <Logo className="w-full h-auto text-white" />
      </div>
      
      <div className="hidden lg:flex gap-16 text-[9px] font-bold uppercase tracking-[0.4em]">
        <a href="#catalogo" className="hover:text-disa-gold transition-colors duration-500">
          Colecciones
        </a>
        <a href="#showroom" className="hover:text-disa-gold transition-colors duration-500">
          Proyectos
        </a>
        <button className="bg-white text-disa-blue px-8 py-3 rounded-full hover:bg-disa-gold transition-all duration-500 font-black tracking-widest">
          Cotizar
        </button>
      </div>
    </nav>
  );
}