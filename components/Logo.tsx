// ============================================================
// DISA Logo — Versión oficial basada en el logo de marca
// D estilizada con accent gold + wordmark
// Usa currentColor para adaptarse a fondos oscuros/claros
// ============================================================

interface LogoProps {
  className?: string;
  variant?: "full" | "isotype" | "wordmark";
  showTagline?: boolean;
}

export const Logo = ({
  className,
  variant = "full",
  showTagline = false,
}: LogoProps) => {
  // ── ISOTIPO SOLO (la D estilizada) ────────────────────────────────
  if (variant === "isotype") {
    return (
      <svg
        viewBox="0 0 80 80"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DISA"
      >
        <path
          d="M12 8 L12 72 L40 72 C58 72 70 58 70 40 C70 22 58 8 40 8 L12 8 Z M22 18 L40 18 C52 18 60 28 60 40 C60 52 52 62 40 62 L22 62 L22 18 Z"
          fill="currentColor"
        />
        <path
          d="M28 32 Q42 28 56 32 L56 38 Q42 34 28 38 Z"
          fill="#C5A059"
        />
        <path
          d="M30 42 Q44 40 54 42 L54 46 Q44 44 30 46 Z"
          fill="#C5A059"
          opacity="0.7"
        />
      </svg>
    );
  }

  // ── WORDMARK SOLO ─────────────────────────────────────────────────
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 200 50"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DISA"
      >
        <text
          x="0"
          y="40"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="900"
          fontSize="44"
          fill="currentColor"
          letterSpacing="-0.02em"
        >
          DISA
        </text>
      </svg>
    );
  }

  // ── LOGO COMPLETO (isotipo + wordmark) ────────────────────────────
  return (
    <svg
      viewBox="0 0 260 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DISA — Textiles y Persianas Colombia"
    >
      {/* ─── ISOTIPO: D estilizada ─── */}
      <g transform="translate(0, 5)">
        <path
          d="M4 4 L4 56 L26 56 C40 56 50 45 50 30 C50 15 40 4 26 4 L4 4 Z M12 12 L26 12 C35 12 42 20 42 30 C42 40 35 48 26 48 L12 48 L12 12 Z"
          fill="currentColor"
        />
        <path
          d="M16 22 Q28 19 40 22 L40 26 Q28 23 16 26 Z"
          fill="#C5A059"
        />
        <path
          d="M18 31 Q30 29 38 31 L38 34 Q30 32 18 34 Z"
          fill="#C5A059"
          opacity="0.65"
        />
      </g>

      {/* ─── WORDMARK: DISA ─── */}
      <text
        x="62"
        y="42"
        fontFamily="var(--font-inter), sans-serif"
        fontWeight="900"
        fontSize="38"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        DISA
      </text>

      {/* ─── TAGLINE OPCIONAL ─── */}
      {showTagline && (
        <text
          x="62"
          y="60"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="500"
          fontSize="7"
          fill="currentColor"
          letterSpacing="0.3em"
          opacity="0.7"
        >
          TEXTILES Y PERSIANAS · COLOMBIA
        </text>
      )}
    </svg>
  );
};