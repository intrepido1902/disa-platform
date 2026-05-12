import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// ─── FUENTES ──────────────────────────────────────────────────────────────────

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Cormorant Garamond — serif elegante estilo magazine premium
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "DISA | Textiles y Persianas — Colombia",
    template: "%s | DISA Textiles",
  },
  description:
    "DISA es la casa de textiles arquitectónicos en Colombia. Cortinas, persianas y soluciones de control solar de alto diseño. B2B y B2C en Bogotá.",
  keywords: [
    "cortinas premium Colombia",
    "persianas Bogotá",
    "textiles arquitectónicos",
    "control solar",
    "DISA",
  ],
  authors: [{ name: "DISA Textiles" }],
  creator: "DISA Textiles Colombia",
  publisher: "DISA Textiles Colombia",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://disa-platform.vercel.app",
    siteName: "DISA Textiles",
    title: "DISA | Textiles y Persianas Premium — Colombia",
    description:
      "La casa colombiana de textiles arquitectónicos. Cortinas, persianas y soluciones de control solar de alto diseño.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DISA — Textiles y Persianas Premium Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DISA | Textiles Premium Colombia",
    description: "Cortinas, persianas y control solar de alto diseño.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  metadataBase: new URL("https://disa-platform.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
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
      className={`${montserrat.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DISA Textiles",
              alternateName: "DISA Textiles y Persianas Colombia",
              url: "https://disa-platform.vercel.app",
              logo: "https://disa-platform.vercel.app/logo.png",
              description:
                "Empresa colombiana especializada en textiles arquitectónicos, cortinas, persianas y soluciones decorativas. B2B y B2C.",
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
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}