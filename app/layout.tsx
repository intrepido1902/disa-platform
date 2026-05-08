import "./globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: '--font-montserrat',
  weight: ['400', '700', '900'] 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  weight: ['300', '400', '600'] 
});

export const metadata = {
  title: "DISA | Textiles y Sistemas de Ventanas Premium",
  description: "Líder en distribución de telas y soluciones integrales de cortinería para hogares y empresas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-[#EBE0D5] text-[#333333] antialiased">
        {children}
      </body>
    </html>
  );
}