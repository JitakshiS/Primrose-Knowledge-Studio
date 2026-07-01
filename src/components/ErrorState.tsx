import Link from "next/link";
import { LogoDots } from "./LogoDots";

/*
 * Shared error-state layout. Used by every error.tsx boundary so the
 * "something went wrong" moments look consistent across the platform.
 * Never surface the raw error message to the end user — the eyebrow /
 * headline / body copy is fixed per surface, and the digest is only
 * shown as a support-facing code.
 */

export interface ErrorStateProps {
  eyebrow?: string;
  headline: string;
  body: string;
  onRetry?: () => void;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  digest?: string;
}

export function ErrorState({
  eyebrow = "Something went wrong",
  headline,
  body,
  onRetry,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  digest,
}: ErrorStateProps) {
  return (
    <div className="flex-1 bg-paper text-ink flex flex-col">
      <header className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-display font-black text-base tracking-tight flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-safety mb-6">
            {eyebrow}
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl tracking-[-0.025em] leading-[0.9] mb-6">
            {headline}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-muted mb-10 max-w-[44ch] mx-auto">
            {body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="bg-ink text-paper font-display font-extrabold text-base px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all duration-150 min-w-[180px]"
              >
                Try again
              </button>
            )}
            {primaryHref && primaryLabel && (
              <Link
                href={primaryHref}
                className="bg-ink text-paper font-display font-extrabold text-base px-6 py-4 rounded-[10px] hover:opacity-90 active:scale-[0.98] transition-all duration-150 min-w-[180px] text-center"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="bg-card border border-ink/10 font-display font-bold text-base px-6 py-4 rounded-[10px] hover:border-ink/25 active:scale-[0.98] transition-all duration-150 min-w-[180px] text-center"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>

          {digest && (
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft mt-12">
              Reference · {digest}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
            Legal information, not legal advice
          </div>
          <div>© {new Date().getFullYear()} Primrose Watson</div>
        </div>
      </footer>
    </div>
  );
}
