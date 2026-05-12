import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// ─── FUENTES ──────────────────────────────────────────────────────────────────

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "900"],
  style: ["normal", "italic"],
  display: "swap",  // Evita FOIT — texto visible mientras carga
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

// ─── SEO BASE — se puede sobreescribir por página con generateMetadata() ──────

export const metadata: Metadata = {
  // Básico
  title: {
    default: "DISA | Textiles Premium para Cortinas y Persianas — Bogotá",
    template: "%s | DISA Textiles",
  },
  description:
    "DISA es la empresa líder en textiles para cortinas, persianas y soluciones decorativas en Colombia. Distribución B2B y venta B2C. Control solar de alta gama. Bogotá.",

  // Palabras clave (ayuda secundaria para SEO)
  keywords: [
    "cortinas Bogotá",
    "persianas colombia",
    "textiles decorativos",
    "control solar arquitectónico",
    "telas para cortinas",
    "persianas B2B Colombia",
    "DISA textiles",
    "screen sun control",
    "blackout premium",
  ],

  // Autor y marca
  authors: [{ name: "DISA Textiles", url: "https://disa-platform.vercel.app" }],
  creator: "DISA Textiles Colombia",
  publisher: "DISA Textiles Colombia",

  // Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://disa-platform.vercel.app",
    siteName: "DISA Textiles",
    title: "DISA | Textiles Premium para Cortinas y Persianas",
    description:
      "Descubre colecciones premium de textiles para cortinas y persianas. Soluciones B2B y B2C en Colombia.",
    images: [
      {
        url: "https://disa-platform.vercel.app/og-image.jpg", // Crear esta imagen: 1200x630px
        width: 1200,
        height: 630,
        alt: "DISA Textiles — Elevate tus espacios con textiles premium",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DISA | Textiles Premium Colombia",
    description: "Cortinas y persianas de alto diseño. B2B y B2C.",
    images: ["https://disa-platform.vercel.app/og-image.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verificación de Search Console (agregar cuando se tenga acceso)
  // verification: {
  //   google: "TU_CODIGO_AQUI",
  // },

  // Canonical base URL
  metadataBase: new URL("https://disa-platform.vercel.app"),

  // Favicons (agregar archivos en /public)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

// ─── VIEWPORT ────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── LAYOUT ──────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="antialiased font-sans">
        {/* Schema.org Organization — ayuda a Google a entender DISA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DISA Textiles",
              url: "https://disa-platform.vercel.app",
              logo: "https://disa-platform.vercel.app/logo.png",
              description:
                "Empresa colombiana especializada en textiles para cortinas, persianas y soluciones decorativas. Distribución B2B y venta B2C.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bogotá",
                addressRegion: "Cundinamarca",
                addressCountry: "CO",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: "Spanish",
              },
              sameAs: [
                // Agregar URLs reales cuando existan:
                // "https://www.instagram.com/disatextiles",
                // "https://www.linkedin.com/company/disa-textiles",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}