"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

// ============================================================
// AnimatedStats — Contadores que animan al entrar en pantalla
// ============================================================

interface Stat {
  value: number;
  suffix: string;
  label: string;
  isText?: boolean;   // Para "ISO" que no es un número
  textValue?: string;
}

const STATS: Stat[] = [
  { value: 1, suffix: "M+", label: "m² Suministrados" },
  { value: 500, suffix: "+", label: "Proyectos Realizados" },
  { value: 15, suffix: "+", label: "Años de Experiencia" },
  { value: 0, suffix: "", label: "Calidad Certificada", isText: true, textValue: "ISO" },
];

const AnimatedNumber = ({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(Math.floor(v));
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
};

export const AnimatedStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-14 md:pt-16 border-t border-disa-blue/10"
    >
      {STATS.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <p className="text-disa-blue text-5xl md:text-6xl font-black tracking-tight leading-none">
            {stat.isText ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.12 + 0.3 }}
              >
                {stat.textValue}
              </motion.span>
            ) : (
              <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2.2} />
            )}
          </p>
          <p className="text-disa-blue/45 text-[10px] font-bold tracking-[0.3em] uppercase">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};