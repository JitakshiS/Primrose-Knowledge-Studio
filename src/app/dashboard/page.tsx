import Link from "next/link";
import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import {
  PILLAR_META,
  PILLAR_ORDER,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  PLACEHOLDER_VIDEOS,
  newestVideo,
  videosByPillar,
  formatDuration,
  formatDate,
} from "@/data/placeholder";

const RESUME_PROGRESS = [
  { slug: "rrsps-explained", percent: 67 },
  { slug: "first-raise-negotiation", percent: 35 },
  { slug: "harm-vs-stress", percent: 12 },
];

export default function DashboardPage() {
  const newest = newestVideo();
  const recentlyAdded = [...PLACEHOLDER_VIDEOS]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 6);

  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">
              Members · Library
            </div>
            <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95]">
              Welcome back.
            </h1>
          </div>
          <div className="font-mono text-xs text-muted">
            {PLACEHOLDER_VIDEOS.length} videos · 5 pillars · added monthly
          </div>
        </div>

        {/* Newest Addition feature card */}
        <Link
          href={`/video/${newest.slug}`}
          className="block mb-12 group"
          aria-label={`Watch ${newest.title}`}
        >
          <div className="bg-ink text-paper rounded-[24px] p-8 lg:p-12 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-40"
              style={{
                background: `radial-gradient(ellipse at 25% 25%, ${PILLAR_META[newest.pillar].colorVar} 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, var(--pillar-emotional) 0%, transparent 55%)`,
              }}
              aria-hidden
            />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase mb-4 inline-flex items-center gap-2">
                  <span
                    className={`block w-2 h-2 rounded-full ${PILLAR_BG_CLASS[newest.pillar]}`}
                  />
                  Newest addition · {PILLAR_META[newest.pillar].name}
                </div>
                <h2 className="font-display font-black text-3xl lg:text-5xl tracking-[-0.02em] leading-[0.95] mb-5 max-w-[22ch]">
                  {newest.title}
                </h2>
                <p className="text-[15px] lg:text-base leading-relaxed opacity-75 max-w-[58ch]">
                  {newest.description}
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-4">
                <div className="font-mono text-xs opacity-65">
                  Added {formatDate(newest.publishedAt)}
                </div>
                <div className="bg-paper text-ink font-display font-extrabold text-sm px-5 py-3 rounded-[10px] inline-flex items-center gap-2">
                  <span
                    className="block w-0 h-0 border-l-[8px] border-l-ink border-y-[5px] border-y-transparent ml-0.5"
                    aria-hidden
                  />
                  Watch · {formatDuration(newest.durationSeconds)}
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Browse by Pillar */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
            <h2 className="font-display font-extrabold text-2xl tracking-[-0.025em]">
              Browse by pillar.
            </h2>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
              5 categories
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {PILLAR_ORDER.map((p) => {
              const count = videosByPillar(p).length;
              return (
                <Link
                  key={p}
                  href={`/library/${p}`}
                  className={`${PILLAR_BG_CLASS[p]} text-paper rounded-[16px] p-6 aspect-[0.78] flex flex-col justify-between transition-transform hover:-translate-y-0.5`}
                >
                  <div className="font-mono text-[11px] tracking-[0.14em] opacity-85">
                    {String(PILLAR_ORDER.indexOf(p) + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-lg leading-[1.05] tracking-tight">
                      {PILLAR_META[p].name}
                    </div>
                    <div className="font-mono text-[11px] opacity-75 mt-1.5">
                      {count} videos →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Resume watching */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
            <h2 className="font-display font-extrabold text-2xl tracking-[-0.025em]">
              Pick up where you left off.
            </h2>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
              Resume watching
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESUME_PROGRESS.map((r) => {
              const v = PLACEHOLDER_VIDEOS.find((x) => x.slug === r.slug);
              if (!v) return null;
              return (
                <Link
                  key={v.slug}
                  href={`/video/${v.slug}`}
                  className="bg-card border border-ink/6 rounded-[16px] p-5 flex flex-col gap-4 hover:border-ink/15 transition-colors"
                >
                  <div className="aspect-[16/9] bg-ink rounded-[12px] relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%, ${PILLAR_META[v.pillar].colorVar} 0%, transparent 65%)`,
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/15">
                      <div
                        className={`h-full ${PILLAR_BG_CLASS[v.pillar]}`}
                        style={{ width: `${r.percent}%` }}
                      />
                    </div>
                    <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.12em] uppercase text-paper bg-ink/40 px-2 py-1 rounded-[4px]">
                      {r.percent}% watched
                    </div>
                  </div>
                  <div>
                    <div
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[v.pillar]} mb-2`}
                    >
                      {PILLAR_META[v.pillar].name}
                    </div>
                    <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
                      {v.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recently added grid */}
        <section>
          <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
            <h2 className="font-display font-extrabold text-2xl tracking-[-0.025em]">
              Recently added.
            </h2>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
              All pillars
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyAdded.map((v) => (
              <Link
                key={v.slug}
                href={`/video/${v.slug}`}
                className="bg-card border border-ink/6 rounded-[16px] p-5 hover:border-ink/15 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`font-mono text-[10px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[v.pillar]} inline-flex items-center gap-2`}
                  >
                    <span
                      className={`block w-1.5 h-1.5 rounded-full ${PILLAR_BG_CLASS[v.pillar]}`}
                      aria-hidden
                    />
                    {PILLAR_META[v.pillar].name.split(" ")[0]}
                  </div>
                  <div className="font-mono text-[10px] text-muted">
                    {formatDuration(v.durationSeconds)}
                  </div>
                </div>
                <div className="font-display font-bold text-lg leading-tight tracking-[-0.018em]">
                  {v.title}
                </div>
                <div className="font-mono text-[10px] text-muted mt-auto">
                  {formatDate(v.publishedAt)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/8 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase">
            Legal information — not legal advice
          </div>
          <div>© {new Date().getFullYear()} Primrose Watson</div>
        </div>
      </footer>
    </div>
  );
}
