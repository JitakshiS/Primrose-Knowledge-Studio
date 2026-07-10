import Link from "next/link";
import { LogoDots } from "./LogoDots";

/*
 * Shared shell for the legal pages (/terms, /privacy, /disclaimer).
 * Structure and typography are production-ready; the body copy is
 * placeholder scaffolding that Primrose drafts and approves herself
 * (bar rules: she holds final say on all legal content). Placeholder
 * blocks are visually flagged so nothing ships looking finished when
 * it isn't.
 */

export interface LegalSection {
  heading: string;
  /** Real copy when present; omit to render the awaiting-copy placeholder. */
  body?: string;
  placeholderNote?: string;
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="flex-1 bg-paper text-ink flex flex-col">
      <header className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-display font-black text-base tracking-tight flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
        >
          Back to home
        </Link>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto w-full px-6 lg:px-10 py-12 lg:py-16 flex-1">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-career mb-5">
          {eyebrow}
        </div>
        <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95] mb-5">
          {title}
        </h1>
        <div className="font-mono text-[11px] text-muted mb-3">
          Effective date: to be set at launch
        </div>
        <p className="text-base leading-relaxed text-muted mb-12 max-w-[62ch]">
          {intro}
        </p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-display font-extrabold text-xl lg:text-2xl tracking-[-0.015em] mb-3 flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-medium text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              {s.body ? (
                <p className="text-[15px] leading-relaxed text-muted max-w-[64ch]">
                  {s.body}
                </p>
              ) : (
                <div className="border border-dashed border-ink/20 rounded-[12px] px-5 py-4 bg-card">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-safety mb-1.5">
                    Awaiting Primrose&apos;s text
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    {s.placeholderNote ??
                      "This section's wording comes from Primrose and gets her sign-off before launch."}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
            Legal information, not legal advice
          </div>
          <div>© {new Date().getFullYear()} Primrose Watson</div>
        </div>
      </footer>
    </div>
  );
}
