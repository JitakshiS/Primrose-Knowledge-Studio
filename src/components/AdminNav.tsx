import Link from "next/link";
import { LogoDots } from "./LogoDots";

/*
 * Admin top nav. Distinct from MemberNav: shows the ADMIN badge so it's
 * obvious which surface Primrose is on, and includes admin-scoped quick
 * links. Sticky, calm, product-feel. Mobile (< lg): <details>-based menu
 * with Overview, Videos, Add video and the View-as-member shortcut.
 */
export function AdminNav() {
  return (
    <header className="border-b border-ink/8 bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-14 lg:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-5 min-w-0">
          <Link
            href="/admin"
            className="font-display font-black text-[15px] lg:text-base tracking-tight flex items-center gap-2.5 lg:gap-3 min-w-0"
          >
            <LogoDots />
            <span className="hidden xs:inline truncate">Primrose Studio</span>
            <span className="xs:hidden">Studio</span>
          </Link>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase bg-ink text-paper px-2 lg:px-2.5 py-1 rounded-[4px] flex-shrink-0">
            Admin
          </span>
        </div>

        {/* Desktop inline nav (lg+) */}
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

        <div className="flex items-center gap-3 flex-shrink-0">
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

      {/* Mobile menu (below lg). */}
      <details className="lg:hidden group border-t border-ink/8 [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer flex items-center justify-between px-5 py-2.5 list-none">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Admin menu
          </span>
          <span
            className="font-display font-bold text-xl text-muted leading-none transition-transform group-open:rotate-45"
            aria-hidden
          >
            +
          </span>
        </summary>
        <div className="px-5 pb-4 pt-1 space-y-2">
          <Link
            href="/admin"
            className="block bg-stone/60 hover:bg-stone rounded-[10px] px-4 py-3 font-display font-bold text-sm transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/admin/videos"
            className="block bg-stone/60 hover:bg-stone rounded-[10px] px-4 py-3 font-display font-bold text-sm transition-colors"
          >
            Videos
          </Link>
          <Link
            href="/admin/videos/new"
            className="block bg-ink text-paper rounded-[10px] px-4 py-3 font-display font-extrabold text-sm flex items-center justify-between"
          >
            <span>Add video</span>
            <span aria-hidden>+</span>
          </Link>
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-ink/8">
            <Link
              href="/dashboard"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted"
            >
              View as member
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
