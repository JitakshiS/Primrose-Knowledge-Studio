import Link from "next/link";
import { LogoDots } from "./LogoDots";
import { PILLAR_META, PILLAR_ORDER, PILLAR_BG_CLASS } from "@/data/placeholder";

/*
 * Top navigation for the member-side pages (Fortress, library, video viewer).
 * Calmer than the Porch nav, this is a product surface, not a sales page.
 * Desktop: inline pillar quick-jumps. Mobile (< lg): a <details>-based menu
 * (server-rendered, no client JS) that opens to reveal the pillar grid plus
 * Dashboard and Sign-out links.
 */
export function MemberNav() {
  return (
    <header className="border-b border-ink/8 bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-14 lg:h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="font-display font-black text-[15px] lg:text-base tracking-tight flex items-center gap-2.5 lg:gap-3"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>

        {/* Desktop inline nav (lg+) */}
        <nav className="hidden lg:flex items-center gap-1 font-display font-medium text-[13px]">
          {PILLAR_ORDER.map((p) => (
            <Link
              key={p}
              href={`/library/${p}`}
              className="group px-3 py-1.5 rounded-[8px] hover:bg-stone/60 transition-colors inline-flex items-center gap-2 text-muted hover:text-ink"
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full ${PILLAR_BG_CLASS[p]}`}
                aria-hidden
              />
              {PILLAR_META[p].name.split(" ")[0]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:inline-block font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/account"
            className="w-9 h-9 rounded-full bg-ink text-paper font-display font-bold text-[13px] flex items-center justify-center hover:opacity-85 transition-opacity"
            aria-label="Account"
          >
            J
          </Link>
        </div>
      </div>

      {/* Mobile menu (below lg). Uses <details> for SSR-friendly toggling. */}
      <details className="lg:hidden group border-t border-ink/8 [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer flex items-center justify-between px-5 py-2.5 list-none">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Pillars
          </span>
          <span
            className="font-display font-bold text-xl text-muted leading-none transition-transform group-open:rotate-45"
            aria-hidden
          >
            +
          </span>
        </summary>
        <div className="px-5 pb-4 pt-1">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {PILLAR_ORDER.map((p) => (
              <Link
                key={p}
                href={`/library/${p}`}
                className={`${PILLAR_BG_CLASS[p]} text-paper rounded-[10px] px-3 py-3 flex items-center justify-between text-[13px] font-display font-bold tracking-tight`}
              >
                <span>{PILLAR_META[p].name.split(" ")[0]}</span>
                <span className="font-mono text-[10px] opacity-75" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-ink/8">
            <Link
              href="/dashboard"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted"
            >
              Dashboard
            </Link>
            <Link
              href="/account"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted"
            >
              Account
            </Link>
            <Link
              href="/login"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted"
            >
              Sign out
            </Link>
          </div>
        </div>
      </details>
    </header>
  );
}
