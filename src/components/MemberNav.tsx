import Link from "next/link";
import { LogoDots } from "./LogoDots";
import { PILLAR_META, PILLAR_ORDER, PILLAR_BG_CLASS } from "@/data/placeholder";

/*
 * Top navigation for the member-side pages (Fortress, library, video viewer).
 * Calmer than the Porch nav, this is a product surface, not a sales page.
 * Hover state on each pillar reveals its colour.
 */
export function MemberNav() {
  return (
    <header className="border-b border-ink/8 bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="font-display font-black text-base tracking-tight flex items-center gap-3">
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>

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
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-ink text-paper font-display font-bold text-[13px] flex items-center justify-center"
            aria-label="Account"
          >
            J
          </button>
        </div>
      </div>
    </header>
  );
}
