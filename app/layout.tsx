import "./globals.css";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ['700'], variable: '--font-montserrat' });
const inter = Inter({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-inter' });

export const metadata = {
  title: "DISA | Catálogo Premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#EBE0D5] antialiased`}>
        {children}
      </body>
    </html>
  );
}