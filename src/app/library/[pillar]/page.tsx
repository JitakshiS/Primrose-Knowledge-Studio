import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import { PILLARS, type Pillar } from "@/lib/firebase/types";
import {
  PILLAR_META,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  PILLAR_ORDER,
  videosByPillar,
  formatDuration,
  formatDate,
} from "@/data/placeholder";

type Params = Promise<{ pillar: string }>;

export default async function PillarPage({ params }: { params: Params }) {
  const { pillar: pillarParam } = await params;
  if (!PILLARS.includes(pillarParam as Pillar)) notFound();
  const pillar = pillarParam as Pillar;

  const videos = videosByPillar(pillar).sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  const meta = PILLAR_META[pillar];
  const pillarIndex = PILLAR_ORDER.indexOf(pillar) + 1;

  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />

      {/* Pillar hero header */}
      <section
        className={`${PILLAR_BG_CLASS[pillar]} text-paper`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[11px] tracking-[0.1em] uppercase opacity-75 mb-8 flex items-center flex-wrap gap-x-2"
          >
            <Link href="/dashboard" className="hover:opacity-100 transition-opacity">
              Library
            </Link>
            <span aria-hidden>/</span>
            <span>Pillar {String(pillarIndex).padStart(2, "0")}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <div className="font-mono text-[12px] tracking-[0.14em] uppercase opacity-80 mb-4">
                Pillar {String(pillarIndex).padStart(2, "0")} of 05
              </div>
              <h1 className="font-display font-black text-5xl lg:text-7xl tracking-[-0.025em] leading-[0.9] mb-6 max-w-[20ch]">
                {meta.name}.
              </h1>
              <p className="text-lg lg:text-xl leading-relaxed opacity-85 max-w-[52ch]">
                {meta.tagline}
              </p>
            </div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-80">
              <div className="text-3xl font-display font-black tracking-[-0.015em] mb-1 opacity-100">
                {videos.length}
              </div>
              Videos in this pillar
            </div>
          </div>
        </div>
      </section>

      {/* Videos list */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex justify-between items-end mb-7 pb-3 border-b border-ink/8">
          <h2 className="font-display font-extrabold text-2xl tracking-[-0.025em]">
            All videos.
          </h2>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Newest first
          </span>
        </div>

        {videos.length === 0 ? (
          <div className="bg-card border border-ink/6 rounded-[16px] p-12 text-center">
            <div
              className={`font-mono text-[11px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[pillar]} mb-3`}
            >
              No videos yet
            </div>
            <p className="text-muted">
              The first videos in this pillar are coming soon. New videos arrive every month.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v, i) => (
              <Link
                key={v.slug}
                href={`/video/${v.slug}`}
                className="bg-card border border-ink/6 rounded-[16px] p-6 hover:border-ink/15 transition-colors flex flex-col gap-4"
              >
                {/* Thumbnail panel */}
                <div className="aspect-[16/9] rounded-[12px] relative overflow-hidden">
                  <div
                    className={`absolute inset-0 ${PILLAR_BG_CLASS[pillar]}`}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `radial-gradient(ellipse at 25% 25%, var(--pillar-emotional) 0%, transparent 60%)`,
                    }}
                    aria-hidden
                  />
                  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.12em] uppercase text-paper bg-ink/30 px-2 py-1 rounded-[4px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[11px] text-paper bg-ink/40 px-2 py-1 rounded-[4px]">
                    {formatDuration(v.durationSeconds)}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="font-display font-bold text-lg leading-tight tracking-[-0.018em] mb-3">
                    {v.title}
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-muted line-clamp-3 mb-3">
                    {v.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-ink/6 font-mono text-[10px] text-muted">
                    <span>{formatDate(v.publishedAt)}</span>
                    <span>{v.toolkitName}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Other pillars */}
        <section className="mt-16 pt-12 border-t border-ink/8">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-5">
            Continue browsing
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PILLAR_ORDER.filter((p) => p !== pillar).map((p) => (
              <Link
                key={p}
                href={`/library/${p}`}
                className={`${PILLAR_BG_CLASS[p]} text-paper rounded-[16px] p-5 flex flex-col justify-between aspect-[1.1] hover:-translate-y-0.5 transition-transform`}
              >
                <div className="font-mono text-[10px] tracking-[0.14em] opacity-85">
                  {String(PILLAR_ORDER.indexOf(p) + 1).padStart(2, "0")}
                </div>
                <div className="font-display font-extrabold text-base leading-[1.05] tracking-tight">
                  {PILLAR_META[p].name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/8">
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
