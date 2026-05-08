import "./globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: '--font-montserrat' 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});

export const metadata = {
  title: "DISA | Catálogo Premium",
  description: "Distribución de Textiles y Persianas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* Agregamos las variables de fuente aquí para que funcionen en el CSS */}
      <body className={`${montserrat.variable} ${inter.variable} font-sans bg-[#EBE0D5] antialiased`}>
        {children}
      </body>
    </html>
  );
}