import Link from "next/link";
import { LogoDots } from "./LogoDots";

/*
 * Admin top nav. Distinct from MemberNav: shows the ADMIN badge so it's
 * obvious which surface Primrose is on, and includes admin-scoped quick
 * links. Sticky, calm, product-feel.
 */
export function AdminNav() {
  return (
    <header className="border-b border-ink/8 bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href="/admin"
            className="font-display font-black text-base tracking-tight flex items-center gap-3"
          >
            <LogoDots />
            <span>Primrose Studio</span>
          </Link>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase bg-ink text-paper px-2.5 py-1 rounded-[4px]">
            Admin
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-1 font-display font-medium text-[13px]">
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-[8px] hover:bg-stone/60 transition-colors text-muted hover:text-ink"
          >
            Overview
          </Link>
          <Link
            href="/admin/videos"
            className="px-3 py-1.5 rounded-[8px] hover:bg-stone/60 transition-colors text-muted hover:text-ink"
          >
            Videos
          </Link>
          <Link
            href="/admin/videos/new"
            className="px-3 py-1.5 rounded-[8px] hover:bg-stone/60 transition-colors text-muted hover:text-ink"
          >
            Add video
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:inline-block font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
          >
            View as member
          </Link>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-ink text-paper font-display font-bold text-[13px] flex items-center justify-center"
            aria-label="Account"
          >
            P
          </button>
        </div>
      </div>
    </header>
  );
}
