import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── IMÁGENES ──────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Para cuando migremos a Supabase Storage
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Formatos modernos — mejora performance significativamente
    formats: ["image/avif", "image/webp"],
    // Tamaños para el srcset responsive del catálogo
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 512, 800],
  },

  // ─── DEVELOPMENT ───────────────────────────────────────────────────────────
  allowedDevOrigins: [
    "192.168.56.1",
    "localhost",
    "localhost:3000",
  ],

  // ─── HEADERS DE SEGURIDAD ──────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Previene clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Evita sniffing de MIME types
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer mínimo para analytics sin exponer rutas
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permisos de browser APIs — DISA no necesita cámara/micrófono
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache agresivo para assets estáticos (fuentes, íconos, imágenes)
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ─── REDIRECTS ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Cuando tengamos las páginas de categoría listas
      // {
      //   source: "/persianas",
      //   destination: "/productos/persianas",
      //   permanent: true,
      // },
    ];
  },

  // ─── COMPILER ──────────────────────────────────────────────────────────────
  // Elimina console.log en producción (no los console.error/warn)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ─── EXPERIMENTAL ──────────────────────────────────────────────────────────
  experimental: {
    // Optimiza el bundle eliminando imports no usados de paquetes grandes
    optimizePackageImports: ["framer-motion", "@supabase/supabase-js"],
  },
};

export default nextConfig;