/*
 * The Porch — sales / conversion page.
 *
 * Placeholder copy throughout; intended for Primrose's review pass. Visual
 * structure and rhythm are intentional and locked to the Pillar Stack design
 * system. Real headshot replaces the gradient panels when she sends it.
 */

const pillars = [
  {
    num: "01",
    name: "Workplace",
    twoLine: "Workplace\nWellness",
    colorClass: "bg-workplace",
    count: "12 videos",
    blurb: "Your rights at work — contracts, overtime, harassment, leaving well.",
  },
  {
    num: "02",
    name: "Financial",
    twoLine: "Financial\nWellness",
    colorClass: "bg-financial",
    count: "9 videos",
    blurb: "The money basics nobody taught you. Taxes, debt, building from zero.",
  },
  {
    num: "03",
    name: "Career",
    twoLine: "Career\nWellness",
    colorClass: "bg-career",
    count: "7 videos",
    blurb: "Negotiating offers, switching fields, the legal side of side hustles.",
  },
  {
    num: "04",
    name: "Emotional",
    twoLine: "Emotional\nWellness",
    colorClass: "bg-emotional",
    count: "5 videos",
    blurb: "Recognising harm, accessing support, knowing what's worth pursuing.",
  },
  {
    num: "05",
    name: "Personal Safety",
    twoLine: "Personal\nSafety",
    colorClass: "bg-safety",
    count: "8 videos",
    blurb: "Domestic situations, stalking, when to involve law enforcement.",
  },
];

const howSteps = [
  {
    num: "01",
    accent: "text-workplace",
    title: "Join in under a minute.",
    body: "$29/month, no contracts, cancel anytime. One magic-link login, no passwords to remember.",
  },
  {
    num: "02",
    accent: "text-career",
    title: "Watch what's on your mind tonight.",
    body: "Five categories, every video sits inside one. Browse by what you actually want to know right now.",
  },
  {
    num: "03",
    accent: "text-safety",
    title: "Use it the moment it matters.",
    body: "Every video comes with a downloadable toolkit — checklists, scripts, and the exact next step you can take.",
  },
];

const faqs = [
  {
    q: "Is this legal advice?",
    a: "No. Everything in the library is legal information, not legal advice. It is meant to help you understand your situation and know what questions to ask — not to replace a lawyer in a live matter. Disclaimers are on every video.",
  },
  {
    q: "Why $29 a month?",
    a: "It is enough for Primrose to keep making videos and not enough to gatekeep this from the people who most need it. The library compounds — every month she adds new material. If you only use one video the entire year, it will likely save you more than the membership cost combined.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, from your account page. You keep access through the end of the billing period you already paid for. No retention emails, no friction.",
  },
  {
    q: "Is this for Canadians only?",
    a: "The library is written from Canadian law. Most of the workplace and personal safety material applies broadly; the financial material is Canada-specific. If you are outside Canada, the principles still help, but the specifics may not match your jurisdiction.",
  },
  {
    q: "Who is Primrose?",
    a: "A working lawyer based in Ottawa who has spent her career translating Canadian law into things people can actually use. She built the Knowledge Studio for the version of herself in her twenties — the one who did not know what she did not know.",
  },
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
      {/* ============================================================
          NAV
          ============================================================ */}
      <header className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex justify-between items-center">
        <div className="font-display font-black text-lg tracking-tight flex items-center gap-3">
          <LogoDots />
          <span>Primrose Studio</span>
        </div>
        <nav className="hidden md:flex gap-7 font-display font-medium text-sm text-muted">
          <a href="#how" className="hover:text-ink transition-colors">How it works</a>
          <a href="#pillars" className="hover:text-ink transition-colors">Pillars</a>
          <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
        </nav>
        <a
          href="#pricing"
          className="font-display font-bold text-xs sm:text-sm px-4 py-2.5 rounded-[8px] bg-ink text-paper hover:opacity-90 transition-opacity"
        >
          Become a member
        </a>
      </header>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-stretch">
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
                href="#pricing"
                className="font-display font-extrabold text-base px-7 py-4 rounded-[10px] bg-ink text-paper inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Start watching <span aria-hidden>→</span>
              </a>
              <span className="font-mono text-xs text-muted">
                First video free · Cancel anytime
              </span>
            </div>
          </div>

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
                  Lawyer · Ottawa
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

      {/* ============================================================
          TRUST STRIP
          ============================================================ */}
      <section className="border-y border-ink/8 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-center sm:text-left">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            Canadian Bar · in good standing
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            New videos every month
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            Built quietly · Watched late
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section id="how" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4">
          How it works
        </div>
        <h2 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.035em] leading-[0.95] mb-12 max-w-[18ch]">
          Three steps. No legal jargon.
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {howSteps.map((s) => (
            <div
              key={s.num}
              className="bg-card border border-ink/6 rounded-[16px] p-8 flex flex-col"
            >
              <div className={`font-mono text-xs tracking-[0.14em] ${s.accent} mb-5`}>
                {s.num} · STEP
              </div>
              <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em] leading-[1.1] mb-3">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          THE FIVE PILLARS
          ============================================================ */}
      <section id="pillars" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="flex justify-between items-end mb-7 pb-4 border-b border-ink/8">
          <h2 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.03em]">
            The framework.
          </h2>
          <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted">
            5 categories · one library
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {pillars.map((p) => (
            <div
              key={p.num}
              className={`${p.colorClass} text-paper rounded-[16px] p-6 aspect-[0.78] flex flex-col justify-between`}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {pillars.map((p) => (
            <p
              key={`${p.num}-blurb`}
              className="text-[13.5px] leading-[1.5] text-muted px-1"
            >
              {p.blurb}
            </p>
          ))}
        </div>
      </section>

      {/* ============================================================
          SAMPLE VIDEO CARD — what's inside
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4">
          What you actually get
        </div>
        <h2 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.03em] leading-[1] mb-10 max-w-[22ch]">
          15-minute guides. Every one comes with a toolkit.
        </h2>
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
          {/* Sample video frame */}
          <div className="bg-ink rounded-[16px] p-8 lg:p-10 text-paper relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, var(--pillar-career) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, var(--pillar-emotional) 0%, transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="font-mono text-[11px] tracking-[0.14em] text-career mb-4 inline-flex items-center gap-2">
                <span className="block w-2 h-2 rounded-full bg-career" />
                03 · CAREER WELLNESS
              </div>
              <h3 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.035em] leading-[0.95] mb-3 max-w-[20ch]">
                Reading the fine print on your first job offer.
              </h3>
              <p className="text-[15px] leading-relaxed opacity-75 max-w-[42ch] mb-8">
                What &quot;at-will&quot; really means in Canadian context, the
                non-compete clauses worth pushing back on, and the three signals
                that an offer is about to get worse, not better.
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-paper text-ink font-display font-extrabold text-sm px-5 py-3 rounded-[8px] inline-flex items-center gap-2 hover:bg-stone transition-colors"
                >
                  <span className="block w-0 h-0 border-l-[8px] border-l-ink border-y-[5px] border-y-transparent ml-0.5" />
                  Watch (14:32)
                </button>
                <div className="font-mono text-[11px] text-paper/55">
                  Members only
                </div>
              </div>
            </div>
          </div>

          {/* Toolkit card */}
          <div className="bg-card border border-ink/6 rounded-[16px] p-8 lg:p-10 flex flex-col">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-4">
              Toolkit · attached
            </div>
            <h3 className="font-display font-extrabold text-2xl lg:text-3xl tracking-[-0.025em] leading-[1.05] mb-5">
              The fine-print<br />check checklist.
            </h3>
            <p className="text-[15px] leading-relaxed text-muted mb-8">
              A one-page PDF you can print and walk through before signing. The
              questions to ask. The clauses to flag. The exact words for the
              follow-up email if something feels off.
            </p>
            <div className="mt-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-[6px] bg-safety/10 border border-safety/20 flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold text-safety">
                    PDF
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-ink">
                    Fine-print-check.pdf
                  </div>
                  <div className="font-mono text-[10px] text-muted">
                    1 page · 84 KB
                  </div>
                </div>
              </div>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
                Download →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT PRIMROSE
          ============================================================ */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="bg-card border border-ink/6 rounded-[24px] p-10 lg:p-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-4">
              About · Primrose Watson
            </div>
            <h2 className="font-display font-black text-3xl lg:text-5xl tracking-[-0.035em] leading-[0.95] mb-6 max-w-[20ch]">
              A working lawyer who actually wants you to understand it.
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-muted mb-5 max-w-[58ch]">
              Primrose has spent her career translating Canadian law into things
              people can actually use. She built the Knowledge Studio for the
              version of herself in her twenties — the one who didn&apos;t know
              what she didn&apos;t know.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-muted max-w-[58ch]">
              Everything in the library is legal <em>information</em>, not legal
              advice. It is the foundation that helps you ask the right questions
              if you ever need to call a lawyer in earnest — and that catches the
              ninety percent of moments where you can handle it yourself.
            </p>
          </div>
          <div className="bg-gradient-to-br from-workplace via-emotional to-safety rounded-[16px] aspect-[4/5] flex items-end p-7 text-paper">
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] opacity-85 mb-3">
                PHOTO · TBD
              </div>
              <div className="font-display font-black text-3xl tracking-[-0.025em] leading-none">
                Primrose<br />Watson
              </div>
              <div className="text-[13px] opacity-85 mt-2">
                Canadian Bar · in good standing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING
          ============================================================ */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4 text-center">
          Membership
        </div>
        <h2 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.035em] leading-[0.95] mb-12 text-center max-w-[22ch] mx-auto">
          One plan. Five pillars. The whole library.
        </h2>
        <div className="max-w-2xl mx-auto bg-ink text-paper rounded-[24px] p-10 lg:p-12 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--pillar-career)" }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-3">
                  Knowledge Studio · monthly
                </div>
                <h3 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.03em] leading-none">
                  Full library access.
                </h3>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-5xl lg:text-6xl tracking-[-0.04em] leading-none">
                  $29
                </div>
                <div className="font-mono text-[11px] opacity-65 mt-1">
                  CAD / month
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-8 text-[15px]">
              {[
                "Every video in all five pillars",
                "New videos added monthly — no extra charge",
                "Downloadable toolkit PDF for each video",
                "Magic-link login — no passwords to manage",
                "Cancel anytime, no friction",
                "First video free before you commit",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="text-career text-lg leading-none mt-0.5" aria-hidden>
                    +
                  </span>
                  <span className="opacity-90">{line}</span>
                </li>
              ))}
            </ul>
            <a
              href="/api/stripe/checkout"
              className="block w-full bg-paper text-ink font-display font-extrabold text-base text-center px-7 py-4 rounded-[10px] hover:bg-stone transition-colors"
            >
              Become a member →
            </a>
            <div className="text-center font-mono text-[10px] tracking-[0.14em] uppercase opacity-55 mt-5">
              Secure checkout via Stripe
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-10 pb-24">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-4">
          FAQ
        </div>
        <h2 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.03em] leading-[1] mb-10">
          Questions, answered straight.
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="bg-card border border-ink/6 rounded-[16px] p-6 lg:p-7 group [&_summary::-webkit-details-marker]:hidden"
              open={i === 0}
            >
              <summary className="cursor-pointer flex justify-between items-start gap-4 list-none">
                <span className="font-display font-extrabold text-lg lg:text-xl tracking-[-0.015em] leading-[1.3]">
                  {f.q}
                </span>
                <span
                  className="font-display font-black text-2xl text-muted leading-none mt-0.5 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="text-[15px] leading-relaxed text-muted mt-4 max-w-[60ch]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <div className="bg-card border border-ink/6 rounded-[24px] p-10 lg:p-16 text-center">
          <h2 className="font-display font-black text-4xl lg:text-6xl tracking-[-0.045em] leading-[0.95] mb-6 max-w-[18ch] mx-auto">
            Stop Googling at 2am.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-muted mb-8 max-w-[48ch] mx-auto">
            One library. Five pillars. Taught by someone who knows what she&apos;s
            talking about. Membership is $29/month and you can cancel any time.
          </p>
          <a
            href="#pricing"
            className="inline-flex font-display font-extrabold text-base lg:text-lg px-8 py-4 rounded-[10px] bg-ink text-paper items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Become a member <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <div className="font-display font-black text-lg tracking-tight flex items-center gap-3 mb-3">
              <LogoDots />
              <span>Primrose Studio</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft">
              Built quietly · Watched late
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft mb-2">
                Platform
              </div>
              <div className="space-y-1.5">
                <a href="#how" className="block text-muted hover:text-ink transition-colors">How it works</a>
                <a href="#pillars" className="block text-muted hover:text-ink transition-colors">The pillars</a>
                <a href="#pricing" className="block text-muted hover:text-ink transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft mb-2">
                Account
              </div>
              <div className="space-y-1.5">
                <a href="/dashboard" className="block text-muted hover:text-ink transition-colors">Members</a>
                <a href="#" className="block text-muted hover:text-ink transition-colors">Sign in</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-ink/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
            <div>© {new Date().getFullYear()} Primrose Watson. All rights reserved.</div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
              Legal information — not legal advice
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
