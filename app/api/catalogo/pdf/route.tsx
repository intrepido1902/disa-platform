import { NextResponse } from "next/server";
import { getTelas } from "@/lib/supabase";
import { telaToProducto } from "@/types";

// ============================================================
// GET /api/catalogo/pdf
// Genera el PDF del catálogo DISA dinámicamente desde Supabase
// Usa @react-pdf/renderer en el servidor (React Server Component safe)
// ============================================================

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // react-pdf requiere Node.js runtime

export async function GET() {
  try {
    // 1. Obtener productos de Supabase
    const telas = await getTelas();
    const productos = telas.map((t, i) =>
      telaToProducto(t, `photo-${i}`)
    );

    // 2. Importar dinámicamente para evitar problemas de bundling
    const {
      Document,
      Page,
      Text,
      View,
      StyleSheet,
      renderToBuffer,
      Font,
    } = await import("@react-pdf/renderer");

    // 3. Definir estilos del PDF
    const styles = StyleSheet.create({
      page: {
        backgroundColor: "#F8F5F2",
        padding: 0,
        fontFamily: "Helvetica",
      },
      // ── PORTADA ──
      cover: {
        backgroundColor: "#0A1F44",
        height: "100%",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      coverLabel: {
        fontSize: 8,
        color: "#C5A059",
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 8,
      },
      coverTitle: {
        fontSize: 48,
        color: "#FFFFFF",
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
        marginBottom: 4,
      },
      coverGold: {
        fontSize: 48,
        color: "#C5A059",
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
      },
      coverSub: {
        fontSize: 10,
        color: "#FFFFFF",
        opacity: 0.5,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginTop: 20,
      },
      coverFooter: {
        borderTopWidth: 1,
        borderTopColor: "#FFFFFF20",
        paddingTop: 20,
      },
      coverFooterText: {
        fontSize: 8,
        color: "#FFFFFF",
        opacity: 0.4,
        letterSpacing: 2,
        textTransform: "uppercase",
      },
      // ── PÁGINAS DE PRODUCTO ──
      productPage: {
        backgroundColor: "#F8F5F2",
        padding: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      },
      productHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "#0A1F4415",
        paddingBottom: 20,
        marginBottom: 30,
      },
      productLabel: {
        fontSize: 7,
        color: "#C5A059",
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 10,
      },
      productName: {
        fontSize: 32,
        color: "#0A1F44",
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
      },
      productColor: {
        fontSize: 9,
        color: "#C5A059",
        letterSpacing: 3,
        textTransform: "uppercase",
        marginTop: 6,
      },
      specsGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 20,
      },
      specCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        width: "47%",
        borderWidth: 1,
        borderColor: "#0A1F4410",
      },
      specLabel: {
        fontSize: 7,
        color: "#0A1F4440",
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 6,
      },
      specValue: {
        fontSize: 14,
        color: "#0A1F44",
        fontFamily: "Helvetica-Bold",
      },
      priceSection: {
        backgroundColor: "#0A1F44",
        padding: 24,
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      priceLabel: {
        fontSize: 7,
        color: "#FFFFFF",
        opacity: 0.4,
        letterSpacing: 2,
        textTransform: "uppercase",
      },
      priceValue: {
        fontSize: 22,
        color: "#C5A059",
        fontFamily: "Helvetica-Bold",
      },
      pageNumber: {
        fontSize: 7,
        color: "#0A1F4430",
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "right",
      },
      // ── CONTRAPORTADA ──
      backCover: {
        backgroundColor: "#0A1F44",
        height: "100%",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      backTitle: {
        fontSize: 20,
        color: "#FFFFFF",
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 3,
        textAlign: "center",
        marginBottom: 16,
      },
      backPhone: {
        fontSize: 14,
        color: "#C5A059",
        letterSpacing: 2,
        textAlign: "center",
        marginBottom: 8,
      },
      backSub: {
        fontSize: 8,
        color: "#FFFFFF",
        opacity: 0.4,
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
      },
    });

    // 4. Construir el documento
    const doc = (
      <Document
        title="Catálogo Premium DISA 2026"
        author="DISA Textiles y Persianas"
        subject="Catálogo de colecciones de cortinas y persianas"
        creator="DISA Platform"
      >
        {/* PORTADA */}
        <Page size="A4" style={styles.page}>
          <View style={styles.cover}>
            <View>
              <Text style={styles.coverLabel}>Catálogo Premium · 2026</Text>
              <Text style={styles.coverTitle}>Textiles que{"\n"}</Text>
              <Text style={styles.coverGold}>Definen el espacio.</Text>
              <Text style={styles.coverSub}>
                Cortinas · Persianas · Screen Solar · Colombia
              </Text>
            </View>
            <View style={styles.coverFooter}>
              <Text style={styles.coverFooterText}>
                DISA Textiles y Persianas · Bogotá, Colombia
              </Text>
              <Text style={[styles.coverFooterText, { marginTop: 4 }]}>
                +57 300 780 5902 · @disa.textil
              </Text>
            </View>
          </View>
        </Page>

        {/* PÁGINA POR PRODUCTO */}
        {productos.map((p, idx) => (
          <Page key={p.id} size="A4" style={styles.page}>
            <View style={styles.productPage}>
              <View>
                <View style={styles.productHeader}>
                  <Text style={styles.productLabel}>{p.categoria}</Text>
                  <Text style={styles.productName}>{p.nombre}</Text>
                  <Text style={styles.productColor}>{p.color}</Text>
                </View>

                {/* Specs */}
                <View style={styles.specsGrid}>
                  {p.fichaTecnica.espesor_mm && (
                    <View style={styles.specCard}>
                      <Text style={styles.specLabel}>Espesor</Text>
                      <Text style={styles.specValue}>{p.fichaTecnica.espesor_mm}mm</Text>
                    </View>
                  )}
                  {p.fichaTecnica.peso_g_m2 && (
                    <View style={styles.specCard}>
                      <Text style={styles.specLabel}>Peso</Text>
                      <Text style={styles.specValue}>{p.fichaTecnica.peso_g_m2}g/m²</Text>
                    </View>
                  )}
                  {p.fichaTecnica.proteccion_uv_pct && (
                    <View style={styles.specCard}>
                      <Text style={styles.specLabel}>Protección UV</Text>
                      <Text style={styles.specValue}>{p.fichaTecnica.proteccion_uv_pct}%</Text>
                    </View>
                  )}
                  {p.fichaTecnica.ignifugo && (
                    <View style={styles.specCard}>
                      <Text style={styles.specLabel}>Ignífugo</Text>
                      <Text style={styles.specValue}>{p.fichaTecnica.ignifugo}</Text>
                    </View>
                  )}
                </View>

                {/* Precios */}
                <View style={styles.priceSection}>
                  <View>
                    <Text style={styles.priceLabel}>Precio Hogar / m²</Text>
                    <Text style={styles.priceValue}>
                      ${p.precioB2C.toLocaleString("es-CO")}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.priceLabel, { textAlign: "right" }]}>
                      Precio Empresa / m²
                    </Text>
                    <Text style={[styles.priceValue, { textAlign: "right", color: "#FFFFFF" }]}>
                      ${p.precioB2B.toLocaleString("es-CO")}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.pageNumber}>
                {String(idx + 2).padStart(2, "0")} · DISA Catálogo 2026
              </Text>
            </View>
          </Page>
        ))}

        {/* CONTRAPORTADA */}
        <Page size="A4" style={styles.page}>
          <View style={styles.backCover}>
            <Text style={styles.backTitle}>
              ¿Lista para transformar tu espacio?
            </Text>
            <Text style={styles.backPhone}>+57 300 780 5902</Text>
            <Text style={styles.backSub}>@disa.textil · Bogotá, Colombia</Text>
          </View>
        </Page>
      </Document>
    );

    // 5. Renderizar a Buffer
    const buffer = await renderToBuffer(doc);

    // 6. Devolver como descarga
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="DISA-Catalogo-Premium-2026.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[DISA:pdf] Error generando catálogo:", err);
    return NextResponse.json(
      { error: "No se pudo generar el catálogo. Intenta de nuevo." },
      { status: 500 }
    );
  }
}