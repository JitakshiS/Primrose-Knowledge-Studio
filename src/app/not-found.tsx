import Link from "next/link";
import { LogoDots } from "@/components/LogoDots";

export default function NotFound() {
  return (
    <div className="flex-1 bg-paper text-ink flex flex-col">
      <header className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-display font-black text-lg tracking-tight flex items-center gap-3"
        >
          <LogoDots />
          <span>Primrose Studio</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-career mb-6">
            404 · Page not found
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl tracking-[-0.025em] leading-[0.9] mb-6">
            Couldn&apos;t find that one.
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-muted mb-10 max-w-[44ch] mx-auto">
            The page you&apos;re looking for might have moved, or you may have an
            old link. Try one of these instead.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
            <Link
              href="/"
              className="bg-card border border-ink/6 rounded-[14px] p-5 hover:border-ink/15 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-career mb-2">
                Home
              </div>
              <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
                Back to the studio.
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="bg-card border border-ink/6 rounded-[14px] p-5 hover:border-ink/15 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-workplace mb-2">
                Members
              </div>
              <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
                Open the library.
              </div>
            </Link>
          </div>
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
