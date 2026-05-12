import { createClient } from '@supabase/supabase-js';
import HomePageClient from '@/components/HomePageClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Esto permite que Vercel sirva una versión estática súper rápida y la actualice cada hora
export const revalidate = 3600; 

export default async function Page() {
  // Obtenemos los datos directamente en el servidor
  const { data: telas, error } = await supabase
    .from('telas')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <HomePageClient initialTelas={telas || []} />
  );
}