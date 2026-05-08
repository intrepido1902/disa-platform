import "./globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: '--font-montserrat',
  weight: ['700', '900'] 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  weight: ['400', '700'] 
});

export const metadata = {
  title: "DISA | Catálogo Premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}