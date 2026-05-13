import { NextResponse } from "next/server";
import { getTelas } from "@/lib/supabase";
import { telaToProducto } from "@/types";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ── Paleta DISA ──────────────────────────────────────────────
const NAVY  = "#0A1F44";
const GOLD  = "#C5A059";
const SAND  = "#F8F5F2";
const WHITE = "#FFFFFF";
const GRAY  = "#6b7280";

// ── Mapa de imágenes locales por nombre de producto ──────────
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "Lino Toscana":       "lino-toscana.jpeg",
  "Sheer Elegance":     "sheer-elegance.jpeg",
  "Cortina Blackout Pro": "cortina-blackout-pro.jpeg",
  "Screen Sun Control": "screen-sun-control.jpeg",
  "Screen Solar Plus":  "screen-solar-plus.jpeg",
  "Roller Premium":     "roller-premium.jpeg",
};

// ── Helper: convierte imagen local a base64 data URI ─────────
function localImageToDataURI(relativePath: string): string | null {
  try {
    const abs = path.join(process.cwd(), "public", relativePath);
    if (!fs.existsSync(abs)) return null;
    const buffer = fs.readFileSync(abs);
    const ext = path.extname(abs).replace(".", "").replace("jpg", "jpeg");
    return `data:image/${ext};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const telas = await getTelas();
    const productos = telas.map((t, i) => telaToProducto(t, `photo-${i}`));

    // Pre-cargar logo y imágenes de producto
    const logoDataURI = localImageToDataURI("imagenes/logo/logo.png");
    const productImages: Record<string, string | null> = {};
    for (const p of productos) {
      const file = PRODUCT_IMAGE_MAP[p.nombre];
      productImages[p.id] = file
        ? localImageToDataURI(`imagenes/productos/${file}`)
        : null;
    }

    const {
      Document,
      Page,
      Text,
      View,
      Image: PDFImage,
      Link,
      StyleSheet,
      renderToBuffer,
    } = await import("@react-pdf/renderer");

    const homeUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://disa.com.co";

    const styles = StyleSheet.create({
      page:     { fontFamily: "Helvetica", backgroundColor: WHITE, padding: 0 },
      pageSand: { fontFamily: "Helvetica", backgroundColor: SAND,  padding: 0 },

      // ── LOGO HEADER (aparece en todas las páginas excepto portada) ──
      pageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 48,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(10,31,68,0.08)",
      },
      logoImg: { width: 90, height: 36, objectFit: "contain" },
      logoFallback: {
        fontSize: 16,
        color: NAVY,
        fontFamily: "Helvetica-Bold",
        letterSpacing: -0.5,
        textTransform: "uppercase",
      },
      headerRight: { alignItems: "flex-end" },
      headerLabel: {
        fontSize: 6.5,
        color: GOLD,
        letterSpacing: 3,
        textTransform: "uppercase",
      },
      headerSub: {
        fontSize: 6,
        color: GRAY,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginTop: 2,
      },

      // ── PORTADA ──────────────────────────────────────────────
      coverPage: {
        backgroundColor: NAVY,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      coverTop: { padding: 56, flex: 1, justifyContent: "flex-end" },
      coverBottom: {
        padding: 56,
        paddingTop: 28,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.12)",
      },
      coverLogoImg: { width: 140, height: 56, objectFit: "contain", marginBottom: 40 },
      coverLogoFallback: {
        fontSize: 36,
        color: WHITE,
        fontFamily: "Helvetica-Bold",
        letterSpacing: -1,
        textTransform: "uppercase",
        marginBottom: 6,
      },
      coverLogoSub: {
        fontSize: 7,
        color: GOLD,
        letterSpacing: 5,
        textTransform: "uppercase",
        marginBottom: 40,
      },
      coverLabel: {
        fontSize: 8,
        color: GOLD,
        letterSpacing: 5,
        textTransform: "uppercase",
        marginBottom: 20,
      },
      coverTitle: {
        fontSize: 48,
        color: WHITE,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.05,
        letterSpacing: -1,
        marginBottom: 4,
      },
      coverGold: {
        fontSize: 48,
        color: GOLD,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.05,
        letterSpacing: -1,
      },
      coverSub: {
        fontSize: 9,
        color: "rgba(255,255,255,0.45)",
        letterSpacing: 2,
        marginTop: 18,
        textTransform: "uppercase",
      },
      coverFooterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      coverFooterText: {
        fontSize: 7.5,
        color: "rgba(255,255,255,0.3)",
        letterSpacing: 1.5,
        textTransform: "uppercase",
      },

      // ── INTRO ────────────────────────────────────────────────
      introBody: { paddingHorizontal: 48, paddingBottom: 40, flex: 1 },
      sectionLabel: {
        fontSize: 7,
        color: GOLD,
        letterSpacing: 5,
        textTransform: "uppercase",
        marginBottom: 12,
      },
      introTitle: {
        fontSize: 30,
        color: NAVY,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
        letterSpacing: -0.5,
        marginBottom: 16,
      },
      introText: {
        fontSize: 9.5,
        color: GRAY,
        lineHeight: 1.7,
        maxWidth: 380,
        marginBottom: 24,
      },
      statRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 28,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(10,31,68,0.1)",
      },
      statCard: {
        flex: 1,
        backgroundColor: NAVY,
        padding: 14,
        alignItems: "center",
      },
      statValue: {
        fontSize: 20,
        color: GOLD,
        fontFamily: "Helvetica-Bold",
        letterSpacing: -0.5,
      },
      statLabel: {
        fontSize: 6.5,
        color: "rgba(255,255,255,0.4)",
        letterSpacing: 2,
        textTransform: "uppercase",
        marginTop: 3,
      },
      tocItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(10,31,68,0.07)",
      },
      tocName: {
        fontSize: 9,
        color: NAVY,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 0.3,
      },
      tocCat: {
        fontSize: 7.5,
        color: GOLD,
        letterSpacing: 2,
        textTransform: "uppercase",
      },

      // ── PRODUCTO ─────────────────────────────────────────────
      productSidebar: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 8,
        backgroundColor: NAVY,
      },
      productGoldAccent: {
        position: "absolute",
        left: 8,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: GOLD,
      },
      productBody: {
        paddingLeft: 44,
        paddingRight: 44,
        paddingBottom: 56,
        flex: 1,
        flexDirection: "column",
      },

      // Layout: izquierda info | derecha imagen
      productLayout: { flexDirection: "row", flex: 1, gap: 24 },
      productLeft:  { flex: 1, flexDirection: "column" },
      productRight: { width: 180, flexDirection: "column" },

      // Header
      productHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 16,
        marginBottom: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(10,31,68,0.1)",
      },
      productCatLabel: {
        fontSize: 7,
        color: GOLD,
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 6,
      },
      productName: {
        fontSize: 22,
        color: NAVY,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
        letterSpacing: -0.3,
        marginBottom: 4,
      },
      productColor: {
        fontSize: 7.5,
        color: GOLD,
        letterSpacing: 3,
        textTransform: "uppercase",
      },
      productPageNum: {
        fontSize: 8,
        color: "rgba(10,31,68,0.25)",
        letterSpacing: 1.5,
      },

      // Imagen del producto
      productImage: {
        width: "100%",
        height: 200,
        objectFit: "cover",
        marginBottom: 8,
        backgroundColor: SAND,
      },
      productImageLabel: {
        fontSize: 6.5,
        color: GRAY,
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 12,
      },

      // Descripción
      productDesc: {
        fontSize: 9,
        color: GRAY,
        lineHeight: 1.6,
        marginBottom: 14,
      },

      // Specs
      specsSectionTitle: {
        fontSize: 6.5,
        color: GOLD,
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 8,
      },
      specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 12 },
      specCard: {
        width: "31%",
        backgroundColor: SAND,
        padding: 8,
        borderLeftWidth: 2,
        borderLeftColor: GOLD,
      },
      specLabel: { fontSize: 6, color: GRAY, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 },
      specValue: { fontSize: 11, color: NAVY, fontFamily: "Helvetica-Bold" },
      specGold:  { fontSize: 9, color: GOLD, fontFamily: "Helvetica-Bold" },
      specWide: {
        width: "65%",
        backgroundColor: SAND,
        padding: 8,
        borderLeftWidth: 2,
        borderLeftColor: GOLD,
      },

      // Colores y aplicaciones
      coloresRow:  { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 10 },
      colorTag:    { backgroundColor: "rgba(10,31,68,0.05)", paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(10,31,68,0.12)" },
      colorText:   { fontSize: 7, color: NAVY, letterSpacing: 1, textTransform: "uppercase" },
      appTag:      { backgroundColor: NAVY, paddingHorizontal: 8, paddingVertical: 4 },
      appText:     { fontSize: 6.5, color: WHITE, letterSpacing: 1.5, textTransform: "uppercase" },

      // Precios
      priceRow: {
        flexDirection: "row",
        gap: 6,
        marginTop: "auto",
      },
      priceB2B: { flex: 1, backgroundColor: NAVY, padding: 12 },
      priceB2C: { flex: 1, backgroundColor: SAND,  padding: 12 },
      priceLabelB2B: { fontSize: 6, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 },
      priceLabelB2C: { fontSize: 6, color: GRAY, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 },
      priceValB2B: { fontSize: 17, color: GOLD, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
      priceValB2C: { fontSize: 17, color: NAVY, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
      priceSub: { fontSize: 6.5, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginTop: 2 },
      priceSub2: { fontSize: 6.5, color: GRAY, letterSpacing: 1, marginTop: 2 },

      // Descuentos calculados
      discountRow: { flexDirection: "row", gap: 3, marginTop: 5 },
      discBadge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: "rgba(197,160,89,0.1)",
        borderWidth: 1,
        borderColor: "rgba(197,160,89,0.3)",
      },
      discText: { fontSize: 6, color: GOLD, fontFamily: "Helvetica-Bold" },

      // Footer
      pageFooter: {
        position: "absolute",
        bottom: 16,
        left: 48,
        right: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(10,31,68,0.07)",
      },
      footerText:    { fontSize: 6.5, color: "rgba(10,31,68,0.3)", letterSpacing: 1.5, textTransform: "uppercase" },
      footerContact: { fontSize: 6.5, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase" },

      // ── CONTRAPORTADA ─────────────────────────────────────────
      backPage: {
        backgroundColor: NAVY,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 56,
      },
      backAccent: { width: 48, height: 3, backgroundColor: GOLD, marginBottom: 28 },
      backTitle: {
        fontSize: 28,
        color: WHITE,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.15,
        letterSpacing: -0.5,
        marginBottom: 4,
      },
      backGold: {
        fontSize: 28,
        color: GOLD,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.15,
        letterSpacing: -0.5,
      },
      backSub: {
        fontSize: 9.5,
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.65,
        marginTop: 16,
        maxWidth: 300,
      },
      backContactGrid: { flexDirection: "row", gap: 20, marginTop: 36 },
      backContactItem: { flex: 1, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.15)", paddingTop: 10 },
      backContactLabel: { fontSize: 6.5, color: GOLD, letterSpacing: 3, textTransform: "uppercase", marginBottom: 5 },
      backContactValue: { fontSize: 9.5, color: WHITE, letterSpacing: 0.3 },
      backFooter: {
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.1)",
        paddingTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      backFooterText: { fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase" },
    });

    const year = new Date().getFullYear();
    const fmt = (n: number) =>
      new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

    // ── Componente reutilizable: logo en header ───────────────
    const PageHeader = ({ label, pageNum }: { label: string; pageNum: string }) => (
      <View style={styles.pageHeader}>
        {/* Logo */}
        <Link src={homeUrl}>
          {logoDataURI ? (
            <PDFImage src={logoDataURI} style={styles.logoImg} />
          ) : (
            <Text style={styles.logoFallback}>DISA</Text>
          )}
        </Link>
        {/* Info derecha */}
        <View style={styles.headerRight}>
          <Text style={styles.headerLabel}>{label}</Text>
          <Text style={styles.headerSub}>Catálogo B2B {year} · Pág. {pageNum}</Text>
        </View>
      </View>
    );

    const doc = (
      <Document
        title={`DISA — Catálogo Premium B2B ${year}`}
        author="DISA Textiles y Persianas"
        subject="Catálogo de telas para fabricantes y distribuidores"
        creator="DISA Platform"
      >
        {/* ════════════════ PORTADA ════════════════ */}
        <Page size="A4" style={styles.page}>
          <View style={styles.coverPage}>
            <View style={{ height: 5, backgroundColor: GOLD }} />
            <View style={styles.coverTop}>
              {/* Logo en portada */}
              {logoDataURI ? (
                <PDFImage src={logoDataURI} style={styles.coverLogoImg} />
              ) : (
                <>
                  <Text style={styles.coverLogoFallback}>DISA</Text>
                  <Text style={styles.coverLogoSub}>Textiles y Persianas · Colombia</Text>
                </>
              )}
              {/* En portada el logo es blanco — si no hay dataURI usamos texto */}
              {!logoDataURI && null}

              <View style={{ width: 48, height: 2, backgroundColor: GOLD, marginBottom: 24 }} />
              <Text style={styles.coverLabel}>Catálogo de Materias Primas · {year}</Text>
              <Text style={styles.coverTitle}>La tela detrás{"\n"}de los mejores</Text>
              <Text style={styles.coverGold}>proyectos.</Text>
              <Text style={styles.coverSub}>Screen Solar · Blackout · Sheer · Lino · Persiana</Text>
            </View>
            <View style={styles.coverBottom}>
              <View style={styles.coverFooterRow}>
                <View>
                  <Text style={styles.coverFooterText}>Documento exclusivo para distribuidores y fabricantes</Text>
                  <Text style={[styles.coverFooterText, { marginTop: 2, color: "rgba(255,255,255,0.18)" }]}>
                    Precios en COP · IVA no incluido · Vigencia {year}
                  </Text>
                </View>
                <Text style={[styles.coverFooterText, { color: GOLD }]}>© {year}</Text>
              </View>
            </View>
          </View>
        </Page>

        {/* ════════════════ INTRODUCCIÓN ════════════════ */}
        <Page size="A4" style={styles.pageSand}>
          <PageHeader label="Quiénes somos" pageNum="02" />
          <View style={styles.introBody}>
            <View style={{ width: 40, height: 2, backgroundColor: GOLD, marginBottom: 16, marginTop: 8 }} />
            <Text style={styles.sectionLabel}>El proveedor que tu negocio necesita</Text>
            <Text style={styles.introTitle}>15 años siendo{"\n"}el aliado de la{"\n"}industria.</Text>
            <Text style={styles.introText}>
              DISA suministra textiles técnicos de alta gama a fabricantes, talleres y distribuidores de cortinas y persianas en Colombia. Stock permanente, fichas técnicas certificadas, muestras sin costo y precios por volumen desde el primer pedido.
            </Text>

            {/* Stats */}
            <View style={styles.statRow}>
              {[
                { v: "200+", l: "Referencias" },
                { v: "15+",  l: "Años" },
                { v: "24h",  l: "Despacho" },
                { v: "15%",  l: "Dto. máximo" },
                { v: "0",    l: "Pedido mínimo" },
              ].map((s) => (
                <View key={s.l} style={styles.statCard}>
                  <Text style={styles.statValue}>{s.v}</Text>
                  <Text style={styles.statLabel}>{s.l}</Text>
                </View>
              ))}
            </View>

            {/* Índice */}
            <Text style={styles.sectionLabel}>Contenido del catálogo</Text>
            {productos.map((p) => (
              <View key={p.id} style={styles.tocItem}>
                <Text style={styles.tocName}>{p.nombre}</Text>
                <Text style={styles.tocCat}>{p.categoria}</Text>
              </View>
            ))}

            {/* Escala descuentos */}
            <View style={{ marginTop: 20, backgroundColor: NAVY, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 7, color: WHITE, letterSpacing: 2, textTransform: "uppercase" }}>Escala de descuentos</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                {[{ d: "20m", p: "5%" }, { d: "50m", p: "10%" }, { d: "100m", p: "15%" }].map((x) => (
                  <View key={x.d} style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 14, color: GOLD, fontFamily: "Helvetica-Bold" }}>{x.p}</Text>
                    <Text style={{ fontSize: 6.5, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase" }}>Desde {x.d}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.pageFooter}>
            <Text style={styles.footerText}>DISA Textiles · Bogotá, Colombia</Text>
            <Text style={styles.footerContact}>+57 300 780 5902 · @disa.textil</Text>
          </View>
        </Page>

        {/* ════════════════ PÁGINAS DE PRODUCTO ════════════════ */}
        {productos.map((p, idx) => {
          const ft = p.fichaTecnica as any;
          const imgSrc = productImages[p.id];
          const pageNum = String(idx + 3).padStart(2, "0");
          const totalPages = String(productos.length + 3).padStart(2, "0");

          return (
            <Page key={p.id} size="A4" style={styles.page}>
              {/* Banda lateral */}
              <View style={styles.productSidebar} />
              <View style={styles.productGoldAccent} />

              {/* Header con logo */}
              <View style={[styles.pageHeader, { paddingLeft: 44 }]}>
                <Link src={homeUrl}>
                  {logoDataURI ? (
                    <PDFImage src={logoDataURI} style={styles.logoImg} />
                  ) : (
                    <Text style={styles.logoFallback}>DISA</Text>
                  )}
                </Link>
                <View style={styles.headerRight}>
                  <Text style={styles.headerLabel}>{p.categoria} · Referencia técnica</Text>
                  <Text style={styles.headerSub}>Catálogo B2B {year} · {pageNum} / {totalPages}</Text>
                </View>
              </View>

              <View style={styles.productBody}>
                {/* Header producto */}
                <View style={styles.productHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productCatLabel}>{p.categoria}</Text>
                    <Text style={styles.productName}>{p.nombre}</Text>
                    <Text style={styles.productColor}>{p.color}</Text>
                  </View>
                </View>

                {/* Layout: info izquierda | imagen derecha */}
                <View style={styles.productLayout}>

                  {/* ── COLUMNA IZQUIERDA ── */}
                  <View style={styles.productLeft}>
                    {/* Descripción */}
                    {p.descripcion && (
                      <Text style={styles.productDesc}>{p.descripcion}</Text>
                    )}

                    {/* Ficha técnica */}
                    <Text style={styles.specsSectionTitle}>Especificaciones técnicas</Text>
                    <View style={styles.specsGrid}>
                      {ft?.espesor_mm && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>Espesor</Text>
                          <Text style={styles.specValue}>{ft.espesor_mm}mm</Text>
                        </View>
                      )}
                      {ft?.peso_g_m2 && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>Peso</Text>
                          <Text style={styles.specValue}>{ft.peso_g_m2}g/m²</Text>
                        </View>
                      )}
                      {ft?.proteccion_uv_pct && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>UV</Text>
                          <Text style={styles.specValue}>{ft.proteccion_uv_pct}%</Text>
                        </View>
                      )}
                      {ft?.ancho_rollo_m && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>Ancho rollo</Text>
                          <Text style={styles.specValue}>{ft.ancho_rollo_m}m</Text>
                        </View>
                      )}
                      {ft?.transmision_luz_pct !== undefined && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>Trans. luz</Text>
                          <Text style={styles.specValue}>{ft.transmision_luz_pct}%</Text>
                        </View>
                      )}
                      {ft?.apertura_pct && (
                        <View style={styles.specCard}>
                          <Text style={styles.specLabel}>Apertura</Text>
                          <Text style={styles.specValue}>{ft.apertura_pct}%</Text>
                        </View>
                      )}
                      {ft?.composicion && (
                        <View style={styles.specWide}>
                          <Text style={styles.specLabel}>Composición</Text>
                          <Text style={[styles.specValue, { fontSize: 9 }]}>{ft.composicion}</Text>
                        </View>
                      )}
                      {ft?.ignifugo && (
                        <View style={[styles.specCard, { borderLeftColor: GOLD }]}>
                          <Text style={styles.specLabel}>Ignífugo</Text>
                          <Text style={styles.specGold}>{ft.ignifugo}</Text>
                        </View>
                      )}
                    </View>

                    {/* Colores */}
                    {ft?.colores_disponibles?.length > 0 && (
                      <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.specsSectionTitle, { marginBottom: 6 }]}>Colores disponibles</Text>
                        <View style={styles.coloresRow}>
                          {ft.colores_disponibles.map((c: string) => (
                            <View key={c} style={styles.colorTag}>
                              <Text style={styles.colorText}>{c}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Aplicaciones */}
                    {ft?.aplicaciones?.length > 0 && (
                      <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.specsSectionTitle, { marginBottom: 6 }]}>Aplicaciones</Text>
                        <View style={styles.coloresRow}>
                          {ft.aplicaciones.map((a: string) => (
                            <View key={a} style={styles.appTag}>
                              <Text style={styles.appText}>{a}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Precios */}
                    <View style={styles.priceRow}>
                      <View style={styles.priceB2B}>
                        <Text style={styles.priceLabelB2B}>Precio distribuidor / m</Text>
                        <Text style={styles.priceValB2B}>{fmt(p.precioB2B)}</Text>
                        <Text style={styles.priceSub}>Tarifa base · IVA no incluido</Text>
                      </View>
                      <View style={styles.priceB2C}>
                        <Text style={styles.priceLabelB2C}>Precio cliente final / m²</Text>
                        <Text style={styles.priceValB2C}>{fmt(p.precioB2C)}</Text>
                        <Text style={styles.priceSub2}>Referencia de mercado</Text>
                      </View>
                    </View>

                    {/* Descuentos por volumen */}
                    <View style={styles.discountRow}>
                      {[
                        { m: 20, dto: 0.05 },
                        { m: 50, dto: 0.10 },
                        { m: 100, dto: 0.15 },
                      ].map((d) => (
                        <View key={d.m} style={styles.discBadge}>
                          <Text style={styles.discText}>
                            {d.m}m → {Math.round(d.dto * 100)}% = {fmt(p.precioB2B * d.m * (1 - d.dto))}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* ── COLUMNA DERECHA: imagen del producto ── */}
                  <View style={styles.productRight}>
                    {imgSrc ? (
                      <>
                        <PDFImage src={imgSrc} style={styles.productImage} />
                        <Text style={styles.productImageLabel}>Imagen de referencia</Text>
                      </>
                    ) : (
                      <View style={[styles.productImage, { justifyContent: "center", alignItems: "center" }]}>
                        <Text style={{ fontSize: 8, color: GRAY, letterSpacing: 1.5, textTransform: "uppercase" }}>
                          Sin imagen
                        </Text>
                      </View>
                    )}

                    {/* Nota técnica lateral */}
                    <View style={{ backgroundColor: NAVY, padding: 12, marginTop: 8 }}>
                      <Text style={{ fontSize: 6.5, color: GOLD, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>
                        Nota
                      </Text>
                      <Text style={{ fontSize: 7.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                        Solicita muestras físicas sin costo antes de confirmar tu pedido.{"\n\n"}
                        Sin pedido mínimo requerido.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Footer */}
              <View style={[styles.pageFooter, { left: 44, right: 44 }]}>
                <Text style={styles.footerText}>DISA Textiles · Bogotá, Colombia</Text>
                <Text style={styles.footerContact}>+57 300 780 5902</Text>
              </View>
            </Page>
          );
        })}

        {/* ════════════════ CONTRAPORTADA ════════════════ */}
        <Page size="A4" style={styles.page}>
          <View style={styles.backPage}>
            <View>
              {logoDataURI && (
                <PDFImage src={logoDataURI} style={{ width: 120, height: 48, objectFit: "contain", marginBottom: 32 }} />
              )}
              <View style={styles.backAccent} />
              <Text style={styles.backTitle}>¿Listo para{"\n"}hacer tu</Text>
              <Text style={styles.backGold}>primer pedido?</Text>
              <Text style={styles.backSub}>
                Nuestro equipo comercial responde en menos de 2 horas hábiles. Solicita muestras físicas sin costo. Sin pedido mínimo requerido.
              </Text>
              <View style={styles.backContactGrid}>
                {[
                  { l: "WhatsApp", v: "+57 300 780 5902" },
                  { l: "Instagram", v: "@disa.textil" },
                  { l: "Ciudad", v: "Bogotá, Colombia" },
                ].map((c) => (
                  <View key={c.l} style={styles.backContactItem}>
                    <Text style={styles.backContactLabel}>{c.l}</Text>
                    <Text style={styles.backContactValue}>{c.v}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.backFooter}>
              <Text style={styles.backFooterText}>DISA Textiles y Persianas</Text>
              <Text style={styles.backFooterText}>Catálogo {year} · Uso exclusivo distribuidores</Text>
              <Text style={[styles.backFooterText, { color: GOLD }]}>© {year}</Text>
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: GOLD }} />
        </Page>
      </Document>
    );

    const buffer = await renderToBuffer(doc);
    const body = new Uint8Array(buffer);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="DISA-Catalogo-B2B-${year}.pdf"`,
        "Cache-Control": "no-store",
      },
    });

  } catch (err) {
    console.error("[DISA:pdf] Error:", err);
    return NextResponse.json({ error: "Error generando el catálogo." }, { status: 500 });
  }
}