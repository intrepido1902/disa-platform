import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["300", "400", "700", "900"],
  display: "swap"
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ["300", "400", "600"],
  display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} font-sans bg-disa-sand selection:bg-disa-gold selection:text-disa-blue`}>
        {/* Aquí iría el Provider de Contexto para el Modo de Navegación */}
        {children}
      </body>
    </html>
  );
}