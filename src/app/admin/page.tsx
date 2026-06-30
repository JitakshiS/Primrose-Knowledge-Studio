import Link from "next/link";
import {
  PILLAR_META,
  PILLAR_ORDER,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  PLACEHOLDER_VIDEOS,
  videosByPillar,
  formatDate,
  formatDuration,
} from "@/data/placeholder";

export default function AdminOverviewPage() {
  const sorted = [...PLACEHOLDER_VIDEOS].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  const recent = sorted.slice(0, 5);
  const thisMonth = sorted.filter(
    (v) => new Date(v.publishedAt).getMonth() === new Date().getMonth(),
  );

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14 flex-1">
      {/* Welcome row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">
            Welcome back
          </div>
          <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95]">
            Studio overview.
          </h1>
        </div>
        <Link
          href="/admin/videos/new"
          className="bg-ink text-paper font-display font-extrabold text-sm px-5 py-3 rounded-[10px] inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span aria-hidden>+</span> Add a video
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
        <StatCard label="Total videos" value={PLACEHOLDER_VIDEOS.length} accent="career" />
        <StatCard label="This month" value={thisMonth.length} accent="workplace" />
        <StatCard label="Drafts" value={0} accent="emotional" />
        <StatCard label="Members" value="—" accent="financial" sub="once Firebase wires" />
      </div>

      {/* By pillar breakdown */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
          <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em]">
            By pillar.
          </h2>
          <Link
            href="/admin/videos"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
          >
            Manage all →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {PILLAR_ORDER.map((p) => {
            const count = videosByPillar(p).length;
            const meta = PILLAR_META[p];
            return (
              <Link
                key={p}
                href={`/admin/videos?pillar=${p}`}
                className="bg-card border border-ink/6 rounded-[16px] p-5 hover:border-ink/15 transition-colors flex flex-col gap-3"
              >
                <div className={`w-8 h-1.5 rounded-full ${PILLAR_BG_CLASS[p]}`} />
                <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
                  {meta.name}
                </div>
                <div className="flex items-baseline justify-between mt-auto">
                  <span className="font-display font-black text-3xl tracking-[-0.015em]">
                    {count}
                  </span>
                  <span className="font-mono text-[10px] text-muted">videos</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recently published */}
      <section>
        <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
          <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em]">
            Recently published.
          </h2>
          <Link
            href="/admin/videos"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
          >
            See all →
          </Link>
        </div>
        <div className="bg-card border border-ink/6 rounded-[16px] overflow-hidden">
          {recent.map((v, i) => (
            <div
              key={v.slug}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-4 ${i < recent.length - 1 ? "border-b border-ink/6" : ""}`}
            >
              <span
                className={`block w-2 h-2 rounded-full ${PILLAR_BG_CLASS[v.pillar]}`}
                aria-hidden
              />
              <div className="min-w-0">
                <Link
                  href={`/admin/videos/${v.slug}`}
                  className="font-display font-bold text-[15px] leading-tight tracking-[-0.01em] hover:text-career transition-colors truncate block"
                >
                  {v.title}
                </Link>
                <div className={`font-mono text-[10px] tracking-[0.12em] uppercase mt-0.5 ${PILLAR_TEXT_CLASS[v.pillar]}`}>
                  {PILLAR_META[v.pillar].name}
                </div>
              </div>
              <div className="font-mono text-[11px] text-muted hidden sm:block">
                {formatDuration(v.durationSeconds)}
              </div>
              <div className="font-mono text-[11px] text-muted hidden md:block">
                {formatDate(v.publishedAt)}
              </div>
              <Link
                href={`/admin/videos/${v.slug}`}
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
              >
                Edit →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding note */}
      <section className="mt-12 bg-card border border-ink/6 rounded-[16px] p-6 lg:p-8">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-career mb-3">
          Heads up
        </div>
        <h3 className="font-display font-extrabold text-xl tracking-[-0.015em] mb-3">
          Once Firebase is connected, this page reads from Firestore.
        </h3>
        <p className="text-[14px] leading-relaxed text-muted max-w-[60ch]">
          You&apos;re seeing the design preview with sample data. Adding a video, editing,
          and uploading toolkit PDFs all become live the moment the Firebase project is
          set up and the env vars land in Vercel. Until then, every form here renders
          but won&apos;t submit.
        </p>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
  sub,
}: {
  label: string;
  value: number | string;
  accent: "workplace" | "financial" | "career" | "emotional" | "safety";
  sub?: string;
}) {
  const accentClass = {
    workplace: "text-workplace",
    financial: "text-financial",
    career: "text-career",
    emotional: "text-emotional",
    safety: "text-safety",
  }[accent];
  return (
    <div className="bg-card border border-ink/6 rounded-[16px] p-5 shadow-[0_4px_20px_-6px_rgba(15,15,15,0.06)]">
      <div className={`font-mono text-[10px] tracking-[0.14em] uppercase ${accentClass} mb-3`}>
        {label}
      </div>
      <div className="font-display font-black text-4xl tracking-[-0.02em] leading-none">
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[10px] text-soft mt-2">{sub}</div>
      )}
    </div>
  );
}
