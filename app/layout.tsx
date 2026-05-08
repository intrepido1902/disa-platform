import "./globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: '--font-montserrat',
  weight: ['300', '700', '900'] // Pesos para elegancia y fuerza
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  weight: ['300', '400', '600'] 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} font-sans bg-[#F8F5F2] text-[#0A1F44] antialiased`}>
        {children}
      </body>
    </html>
  );
}