const pillars = [
  { num: "01", name: "Workplace", twoLine: "Workplace\nWellness", colorClass: "bg-workplace", count: "12 videos" },
  { num: "02", name: "Financial", twoLine: "Financial\nWellness", colorClass: "bg-financial", count: "9 videos" },
  { num: "03", name: "Career", twoLine: "Career\nWellness", colorClass: "bg-career", count: "7 videos" },
  { num: "04", name: "Emotional", twoLine: "Emotional\nWellness", colorClass: "bg-emotional", count: "5 videos" },
  { num: "05", name: "Personal Safety", twoLine: "Personal\nSafety", colorClass: "bg-safety", count: "8 videos" },
];

function LogoDots() {
  return (
    <span className="inline-flex gap-[3px]">
      <i className="block w-2 h-2 rounded-[2px] bg-workplace" />
      <i className="block w-2 h-2 rounded-[2px] bg-financial" />
      <i className="block w-2 h-2 rounded-[2px] bg-career" />
      <i className="block w-2 h-2 rounded-[2px] bg-emotional" />
      <i className="block w-2 h-2 rounded-[2px] bg-safety" />
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex-1 bg-paper text-ink">
      {/* Nav */}
      <header className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex justify-between items-center">
        <div className="font-display font-black text-lg tracking-tight flex items-center gap-3">
          <LogoDots />
          <span>Primrose Studio</span>
        </div>
        <nav className="hidden md:flex gap-7 font-display font-medium text-sm text-muted">
          <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
          <a href="#pillars" className="hover:text-ink transition-colors">Pillars</a>
          <a href="#about" className="hover:text-ink transition-colors">About</a>
        </nav>
        <a
          href="#join"
          className="font-display font-bold text-xs sm:text-sm px-4 py-2.5 rounded-[8px] bg-ink text-paper hover:opacity-90 transition-opacity"
        >
          Become a member
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-24">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-stretch">
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-5">
              $29 / month · five pillars · one library
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.045em] mb-7">
              Your rights,<br />
              your money,<br />
              <span className="bg-gradient-to-r from-career via-emotional to-workplace bg-clip-text text-transparent">
                your safety.
              </span>
            </h1>
            <p className="text-base lg:text-lg leading-relaxed text-muted max-w-[46ch] mb-8">
              A subscription library of in-depth videos organised into the five
              categories of wellness that actually map to your twenties. Taught by a
              working Canadian lawyer in plain English.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#join"
                className="font-display font-extrabold text-base px-7 py-4 rounded-[10px] bg-ink text-paper inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Start watching <span aria-hidden>→</span>
              </a>
              <span className="font-mono text-xs text-muted">
                First video free · Cancel anytime
              </span>
            </div>
          </div>

          {/* Right — photo placeholder split */}
          <div className="grid grid-rows-2 gap-2 min-h-[420px] lg:min-h-0">
            <div className="rounded-[12px] p-6 text-paper flex flex-col justify-between bg-gradient-to-br from-workplace to-emotional">
              <div className="font-mono text-[11px] tracking-[0.14em] opacity-85">
                01 · TAUGHT BY
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl leading-none tracking-tight">
                  Primrose Watson
                </div>
                <div className="text-[13px] opacity-85 mt-1">
                  Lawyer · Nova Scotia
                </div>
              </div>
            </div>
            <div className="rounded-[12px] p-6 text-paper flex flex-col justify-between bg-safety">
              <div className="font-mono text-[11px] tracking-[0.14em] opacity-85">
                05 · YOU&apos;RE PROTECTED
              </div>
              <div className="font-display font-extrabold text-2xl leading-none tracking-tight whitespace-pre-line">
                {"Personal\nSafety\nincluded."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="flex justify-between items-end mb-7 pb-4 border-b border-ink/8">
          <h2 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.03em]">
            The framework.
          </h2>
          <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted">
            5 categories · one library
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {pillars.map((p) => (
            <div
              key={p.num}
              className={`${p.colorClass} text-paper rounded-[16px] p-6 aspect-[0.78] flex flex-col justify-between ${p.num === "05" ? "" : ""}`}
            >
              <div className="font-mono text-[11px] tracking-[0.14em] opacity-85">
                {p.num}
              </div>
              <div>
                <div className="font-display font-extrabold text-xl leading-[1.05] tracking-tight whitespace-pre-line">
                  {p.twoLine}
                </div>
                <div className="font-mono text-[11px] opacity-75 mt-1.5">
                  {p.count} →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Trust — minimal placeholder */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <div className="bg-card border border-ink/6 rounded-[24px] p-10 lg:p-14">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-4">
            About · Primrose Watson
          </div>
          <h2 className="font-display font-black text-3xl lg:text-5xl tracking-[-0.035em] leading-[0.95] mb-6 max-w-[18ch]">
            A working lawyer who actually wants you to understand it.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-muted max-w-[60ch]">
            Primrose has spent her career translating Canadian law into things people
            can actually use. The Knowledge Studio is the library she wishes she could
            have handed her younger self — short videos, plain English, the rights
            you should already know.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display font-black text-sm tracking-tight flex items-center gap-3">
            <LogoDots />
            <span>Primrose Studio</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft">
            Built quietly · Watched late
          </div>
        </div>
      </footer>
    </div>
  );
}
