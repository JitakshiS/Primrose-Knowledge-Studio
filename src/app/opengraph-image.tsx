import { ImageResponse } from "next/og";

/*
 * Dynamic OG image for the homepage / Porch. Rendered at request time via
 * next/og (Satori). Inline styles only, no Tailwind, no font imports for
 * the first pass. The five-color stack carries the brand recognition;
 * Outfit can be loaded in a future iteration if we want the wordmark to
 * match the site exactly.
 */

export const alt =
  "Primrose Studio: a subscription library of in-depth videos on your rights, your money, and your safety.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  paper: "#F8F6F1",
  ink: "#0F0F0F",
  muted: "#5A5A55",
  workplace: "#2640D9",
  financial: "#1F5C45",
  career: "#DC5B3F",
  emotional: "#7A4B6E",
  safety: "#7C3036",
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.paper,
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header: 5-dot mark + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginBottom: 64,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {[
              COLORS.workplace,
              COLORS.financial,
              COLORS.career,
              COLORS.emotional,
              COLORS.safety,
            ].map((c) => (
              <div
                key={c}
                style={{
                  width: 22,
                  height: 44,
                  backgroundColor: c,
                  borderRadius: 4,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
            }}
          >
            Primrose Studio
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: COLORS.ink,
              maxWidth: 1000,
            }}
          >
            Your rights, your money, your safety.
          </div>
          <div
            style={{
              fontSize: 30,
              color: COLORS.muted,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            A subscription library of in-depth videos taught by a working Canadian
            lawyer in plain English.
          </div>
        </div>

        {/* Footer: $29 / FIVE PILLARS / ONE LIBRARY */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 18,
            color: COLORS.muted,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            paddingTop: 32,
            borderTop: `1px solid ${COLORS.ink}1A`,
          }}
        >
          <span>$29 / month</span>
          <span style={{ color: COLORS.career }}>·</span>
          <span>Five pillars</span>
          <span style={{ color: COLORS.emotional }}>·</span>
          <span>One library</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
