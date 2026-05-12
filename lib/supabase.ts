// ============================================================
// DISA — Supabase Client (tipado con Database types)
//
// USO:
//   Server Components / Route Handlers → supabaseServer()
//   Client Components                  → supabaseClient (singleton)
//
// NUNCA importar createClient directamente en componentes.
// Siempre usar estos helpers para garantizar tipado correcto.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import type { Database, Lead, Cotizacion } from "@/types";

// ─── VALIDACIÓN DE ENV VARS ───────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "[DISA] NEXT_PUBLIC_SUPABASE_URL no está definida en las variables de entorno."
  );
}
if (!supabaseAnonKey) {
  throw new Error(
    "[DISA] NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida en las variables de entorno."
  );
}

// ─── CLIENTE PARA CLIENT COMPONENTS (singleton) ───────────────────────────────

export const supabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// ─── CLIENTE PARA SERVER COMPONENTS / ROUTE HANDLERS ─────────────────────────

export function supabaseServer() {
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
    },
  });
}

// ─── HELPERS DE QUERY ────────────────────────────────────────────────────────

/** Obtiene todas las telas activas para el catálogo */
export async function getTelas() {
  const { data, error } = await supabaseServer()
    .from("telas")
    .select("*")
    .eq("activo", true)
    .order("nombre", { ascending: true });

  if (error) {
    console.error("[DISA:supabase] Error fetching telas:", error.message);
    return [];
  }

  return data ?? [];
}

/** Obtiene una tela por ID */
export async function getTelaById(id: string) {
  const { data, error } = await supabaseServer()
    .from("telas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[DISA:supabase] Error fetching tela:", error.message);
    return null;
  }

  return data;
}

/** Guarda un lead en la DB */
export async function saveLead(lead: Lead) {
  const { id: _id, created_at: _ca, ...insertData } = lead;
  const { error } = await supabaseClient
    .from("leads")
    .insert(insertData);

  if (error) {
    console.error("[DISA:supabase] Error saving lead:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/** Guarda una cotización en la DB */
export async function saveCotizacion(cotizacion: Cotizacion) {
  const { id: _id, created_at: _ca, ...insertData } = cotizacion;
  const { data, error } = await supabaseClient
    .from("cotizaciones")
    .insert([insertData])
    .select("id")
    .single();

  if (error) {
    console.error("[DISA:supabase] Error saving cotizacion:", error.message);
    return { success: false, error: error.message, id: null };
  }

  return { success: true, error: null, id: data?.id ?? null };
}
