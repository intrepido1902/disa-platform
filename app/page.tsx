import { getTelas } from '@/lib/supabase';
import { telaToProducto } from '@/types';
import HomePageClient from '@/components/HomePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DISA | Elevate tus Espacios con Textiles Premium",
  description: "Cortinas, persianas y sistemas de control solar de alto diseño para residencias y proyectos corporativos en Colombia. Cotiza online — atención B2B y B2C.",
};

export const revalidate = 3600;

export default async function Page() {
  const telas = await getTelas();
  const productos = telas.map((t) => telaToProducto(t));

  return (
    <HomePageClient productos={productos} />
  );
}