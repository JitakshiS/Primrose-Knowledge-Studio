"use client";

/*
 * Global error boundary. Catches errors thrown in the root layout itself
 * (extremely rare — layout.tsx should be error-free). Because it replaces
 * the root layout, it must include its own <html> and <body> tags and
 * cannot rely on the global CSS from the app layout (which is why we
 * inline the barest styling).
 */

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#F8F6F1",
          color: "#0F0F0F",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ display: "inline-flex", gap: 3, marginBottom: 40 }}>
            <span style={{ display: "block", width: 10, height: 10, borderRadius: 2, background: "#2640D9" }} />
            <span style={{ display: "block", width: 10, height: 10, borderRadius: 2, background: "#1F5C45" }} />
            <span style={{ display: "block", width: 10, height: 10, borderRadius: 2, background: "#DC5B3F" }} />
            <span style={{ display: "block", width: 10, height: 10, borderRadius: 2, background: "#7A4B6E" }} />
            <span style={{ display: "block", width: 10, height: 10, borderRadius: 2, background: "#7C3036" }} />
          </div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7C3036",
              marginBottom: 16,
            }}
          >
            Something went wrong
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
              margin: "0 0 20px",
            }}
          >
            The studio is offline for a moment.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#5A5A55",
              marginBottom: 32,
            }}
          >
            Something failed at the platform level. Try again, or refresh in a
            few minutes.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#0F0F0F",
              color: "#F8F6F1",
              border: "none",
              padding: "16px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
