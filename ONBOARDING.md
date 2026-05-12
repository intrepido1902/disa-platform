# DISA Platform — Onboarding Guide

## What this is

DISA Platform is a premium textile e-commerce site for **DISA Textiles** (Colombia), serving both B2B (wholesale distributors) and B2C (end customers). Products are curtains (`cortinas`), blinds (`persianas`), and solar-control fabrics. The site includes a live catalogue pulled from Supabase and a quoting engine (`cotizador`).

**Deployed at:** https://disa-platform.vercel.app

---

## Stack

| Layer | Tech | Version |
|---|---|---|
| Framework | Next.js | **16.2.6** — has breaking changes vs older versions |
| UI | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 (also breaking vs v3) |
| Animations | Framer Motion | ^12 |
| Database | Supabase | @supabase/supabase-js ^2 |

> **CRITICAL:** Next.js 16 and Tailwind 4 both have breaking changes from training data. Before writing any framework code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

---

## Project structure

```
app/
  layout.tsx          # Root layout — fonts, metadata, Schema.org JSON-LD
  page.tsx            # Home page (Server Component, revalidate=3600)
  globals.css         # Global styles, Tailwind imports, CSS vars
  home-metadata.ts    # Extracted metadata for the homepage
components/
  HomePageClient.tsx  # Main client component (hero, nav, catalogue, cotizador)
  DualProductCard.tsx # Product card — shows B2B and B2C prices
  Showroom.tsx        # Project gallery / mood section
  Logo.tsx            # SVG logo component
lib/
  supabase.ts         # All Supabase access — helpers and typed clients
types/
  index.ts            # ALL domain types live here — never define types inline
```

---

## Domain model

### Data flow
`Supabase telas table` → `TelaRow` → `telaToProducto()` → `Producto` → UI components

- **`TelaRow`** — raw DB shape, never pass to components directly
- **`Producto`** — normalised UI shape with camelCase fields and resolved image URLs
- **`Cotizacion`** — a quote with line items, B2B or B2C pricing, stored in Supabase `cotizaciones`
- **`Lead`** — contact capture from any form, stored in `leads`

### Pricing
Every product has `precioB2B` and `precioB2C` (price per m²). The UI shows both; the `cotizador` calculates `ancho * alto * cantidad * precio`.

### Product categories
`cortina | persiana | screen | blackout | sheer | outdoor`

---

## Supabase access rules

```ts
// Server Components / Route Handlers
import { supabaseServer } from '@/lib/supabase';

// Client Components
import { supabaseClient } from '@/lib/supabase';
```

Never import `createClient` directly in components — always use the helpers in `lib/supabase.ts` to keep typing correct.

---

## Design tokens

The brand palette is defined as CSS custom properties and Tailwind utilities:

| Token | Value | Usage |
|---|---|---|
| `disa-blue` | `#0A1F44` | Hero background, primary CTA |
| `disa-sand` | (warm off-white) | Page background |
| `disa-gold` | (warm gold) | Hover accents, premium highlights |

Fonts: **Montserrat** (700, 900, italic — headings) and **Inter** (300–900 — body). Both loaded via `next/font/google` in `app/layout.tsx`.

---

## Environment variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The app throws at startup if either is missing.

---

## Dev workflow

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint (config: eslint-config-next 16)
```

ISR is configured at `revalidate = 3600` on the home page — product data refreshes every hour in production.

---

## Key rules to follow

1. **All types in `@/types`** — never define domain types inline in components.
2. **Never pass `TelaRow` to UI** — always convert via `telaToProducto()` first.
3. **Supabase via helpers only** — `supabaseServer()` for server, `supabaseClient` for client.
4. **Read Next.js 16 docs before any framework code** — `node_modules/next/dist/docs/`.
5. **Comments only when WHY is non-obvious** — no inline docstrings or task notes.
