import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css"; // Ruta corregida para estar dentro de /app

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["900"],
  style: ["italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "DISA | Ingeniería Textil Arquitectónica",
  description: "Soluciones de control solar y textiles de alta gama.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}