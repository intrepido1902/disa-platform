// ============================================================
// DISA PLATFORM — Global Types
// Todos los tipos del dominio de negocio viven aquí.
// Importar siempre desde '@/types', nunca definir tipos inline.
// ============================================================

// ─── PRODUCTOS / TELAS ────────────────────────────────────────────────────────

/** Fila tal como llega de Supabase — tabla 'telas' */
export interface TelaRow {
  id: string;
  nombre: string;
  color: string;
  precio_m2_b2b: number;
  precio_m2_b2c: number;
  descripcion: string | null;
  categoria: TelaCategoria | null;
  imagen_url: string | null;
  imagen_code: string | null;
  ficha_tecnica: FichaTecnica | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export type TelaCategoria =
  | "cortina"
  | "persiana"
  | "screen"
  | "blackout"
  | "sheer"
  | "outdoor";

export interface FichaTecnica {
  espesor_mm?: number;
  peso_g_m2?: number;
  proteccion_uv_pct?: number;
  ignifugo?: string;       // Ej: "Clase 1 (NFPA 701)"
  composicion?: string;    // Ej: "75% Poliéster, 25% PVC"
  ancho_maximo_m?: number;
  certificaciones?: string[];
}

// ─── PRODUCTO — Vista normalizada para la UI ──────────────────────────────────
// Se construye a partir de TelaRow. Nunca usar TelaRow directamente en componentes.

export interface Producto {
  id: string;
  nombre: string;
  color: string;
  categoria: TelaCategoria;
  precioB2B: number;
  precioB2C: number;
  imagenUrl: string;
  descripcion: string;
  fichaTecnica: FichaTecnica;
  activo: boolean;
}

/** Convierte una TelaRow de Supabase en un Producto para la UI */
export function telaToProducto(tela: TelaRow, imagenFallback?: string): Producto {
  return {
    id: tela.id,
    nombre: tela.nombre,
    color: tela.color,
    categoria: tela.categoria ?? "cortina",
    precioB2B: tela.precio_m2_b2b,
    precioB2C: tela.precio_m2_b2c,
    imagenUrl:
      tela.imagen_url ??
      `https://images.unsplash.com/${tela.imagen_code ?? imagenFallback ?? "photo-1506224477000-07aa8a76be0d"}?auto=format&fit=crop&q=80&w=800`,
    descripcion: tela.descripcion ?? "",
    fichaTecnica: tela.ficha_tecnica ?? {},
    activo: tela.activo,
  };
}

// ─── COTIZACIÓN ───────────────────────────────────────────────────────────────

export type TipoCliente = "b2c" | "b2b";
export type EstadoCotizacion =
  | "borrador"
  | "enviada"
  | "vista"
  | "aprobada"
  | "rechazada";

export interface LineaCotizacion {
  productoId: string;
  nombreProducto: string;
  ancho_m: number;
  alto_m: number;
  cantidad: number;
  precioUnitario: number;   // precio/m²
  subtotal: number;         // ancho * alto * cantidad * precioUnitario
}

export interface Cotizacion {
  id?: string;
  tipoCliente: TipoCliente;
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;         // Solo B2B
  nit?: string;             // Solo B2B
  ciudad: string;
  lineas: LineaCotizacion[];
  totalEstimado: number;
  notas?: string;
  estado: EstadoCotizacion;
  created_at?: string;
}

// ─── LEAD / CONTACTO ──────────────────────────────────────────────────────────

export type OrigenLead =
  | "hero_form"
  | "cotizador"
  | "whatsapp"
  | "catalogo"
  | "contacto";

export interface Lead {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  tipo: TipoCliente;
  origen: OrigenLead;
  mensaje?: string;
  created_at?: string;
}

// ─── UI STATE ─────────────────────────────────────────────────────────────────

/** Modo de visualización del catálogo */
export type ViewMode = "inspirational" | "technical";

/** Estado de una operación async */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

// ─── SUPABASE DB TYPES ────────────────────────────────────────────────────────
// Los tipos Row/Insert/Update DEBEN ser object literals (no referencias a
// interfaces) para satisfacer el constraint Record<string, unknown> que
// Supabase JS usa internamente al resolver los tipos genéricos de schema.

export type Database = {
  public: {
    Tables: {
      telas: {
        Row: {
          id: string;
          nombre: string;
          color: string;
          precio_m2_b2b: number;
          precio_m2_b2c: number;
          descripcion: string | null;
          categoria: TelaCategoria | null;
          imagen_url: string | null;
          imagen_code: string | null;
          ficha_tecnica: FichaTecnica | null;
          activo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          nombre: string;
          color: string;
          precio_m2_b2b: number;
          precio_m2_b2c: number;
          descripcion?: string | null;
          categoria?: TelaCategoria | null;
          imagen_url?: string | null;
          imagen_code?: string | null;
          ficha_tecnica?: FichaTecnica | null;
          activo?: boolean;
        };
        Update: {
          nombre?: string;
          color?: string;
          precio_m2_b2b?: number;
          precio_m2_b2c?: number;
          descripcion?: string | null;
          categoria?: TelaCategoria | null;
          imagen_url?: string | null;
          imagen_code?: string | null;
          ficha_tecnica?: FichaTecnica | null;
          activo?: boolean;
        };
        Relationships: [];
      };
      cotizaciones: {
        Row: {
          id: string;
          tipoCliente: TipoCliente;
          nombre: string;
          email: string;
          telefono: string;
          empresa: string | null;
          nit: string | null;
          ciudad: string;
          lineas: LineaCotizacion[];
          totalEstimado: number;
          notas: string | null;
          estado: EstadoCotizacion;
          created_at: string;
        };
        Insert: {
          tipoCliente: TipoCliente;
          nombre: string;
          email: string;
          telefono: string;
          empresa?: string | null;
          nit?: string | null;
          ciudad: string;
          lineas: LineaCotizacion[];
          totalEstimado: number;
          notas?: string | null;
          estado: EstadoCotizacion;
        };
        Update: {
          tipoCliente?: TipoCliente;
          nombre?: string;
          email?: string;
          telefono?: string;
          empresa?: string | null;
          nit?: string | null;
          ciudad?: string;
          lineas?: LineaCotizacion[];
          totalEstimado?: number;
          notas?: string | null;
          estado?: EstadoCotizacion;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          nombre: string;
          email: string;
          telefono: string | null;
          empresa: string | null;
          tipo: TipoCliente;
          origen: OrigenLead;
          mensaje: string | null;
          created_at: string;
        };
        Insert: {
          nombre: string;
          email: string;
          telefono?: string | null;
          empresa?: string | null;
          tipo: TipoCliente;
          origen: OrigenLead;
          mensaje?: string | null;
        };
        Update: {
          nombre?: string;
          email?: string;
          telefono?: string | null;
          empresa?: string | null;
          tipo?: TipoCliente;
          origen?: OrigenLead;
          mensaje?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
  };
};