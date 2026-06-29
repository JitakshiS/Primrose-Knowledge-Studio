import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberNav } from "@/components/MemberNav";
import { DesignPreviewBanner } from "@/components/DesignPreviewBanner";
import {
  PILLAR_META,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  videoBySlug,
  videosByPillar,
  adjacentVideosInPillar,
  formatDuration,
  formatDate,
} from "@/data/placeholder";

type Params = Promise<{ slug: string }>;

export default async function VideoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const video = videoBySlug(slug);
  if (!video) notFound();

  const { previous, next } = adjacentVideosInPillar(video);
  const moreFromPillar = videosByPillar(video.pillar)
    .filter((v) => v.slug !== video.slug)
    .slice(0, 3);

  return (
    <div className="flex-1 bg-paper text-ink">
      <DesignPreviewBanner />
      <MemberNav />

      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted mb-6 flex items-center flex-wrap gap-x-2"
        >
          <Link href="/dashboard" className="hover:text-ink transition-colors">
            Library
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/library/${video.pillar}`}
            className={`hover:text-ink transition-colors ${PILLAR_TEXT_CLASS[video.pillar]}`}
          >
            {PILLAR_META[video.pillar].name}
          </Link>
        </nav>

        {/* Title row */}
        <div className="mb-8">
          <div
            className={`font-mono text-[11px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[video.pillar]} mb-3 inline-flex items-center gap-2`}
          >
            <span
              className={`block w-2 h-2 rounded-full ${PILLAR_BG_CLASS[video.pillar]}`}
              aria-hidden
            />
            {PILLAR_META[video.pillar].name}
          </div>
          <h1 className="font-display font-black text-3xl lg:text-5xl tracking-[-0.035em] leading-[0.95] max-w-[24ch] mb-4">
            {video.title}
          </h1>
          <div className="font-mono text-xs text-muted flex flex-wrap gap-x-5 gap-y-1">
            <span>{formatDuration(video.durationSeconds)}</span>
            <span>Added {formatDate(video.publishedAt)}</span>
          </div>
        </div>

        {/* Player placeholder */}
        <div className="rounded-[16px] overflow-hidden bg-ink relative aspect-video mb-8">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${PILLAR_META[video.pillar].colorVar} 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, var(--pillar-emotional) 0%, transparent 60%)`,
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="bg-paper/95 text-ink font-display font-extrabold text-base px-7 py-4 rounded-[12px] inline-flex items-center gap-3 hover:bg-paper transition-colors"
            >
              <span
                className="block w-0 h-0 border-l-[12px] border-l-ink border-y-[8px] border-y-transparent ml-1"
                aria-hidden
              />
              Play · {formatDuration(video.durationSeconds)}
            </button>
          </div>
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.14em] uppercase text-paper/85 bg-ink/40 px-2.5 py-1.5 rounded-[6px]">
            Unlisted YouTube embed · placeholder
          </div>
        </div>

        {/* Description + Toolkit */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-12">
          <div className="bg-card border border-ink/6 rounded-[16px] p-8">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-3">
              What this video covers
            </div>
            <p className="text-base lg:text-lg leading-relaxed text-ink">
              {video.description}
            </p>
            <div className="mt-6 pt-6 border-t border-ink/6 font-mono text-[11px] tracking-[0.12em] uppercase text-soft">
              Legal information — not legal advice
            </div>
          </div>

          {/* Toolkit PDF card */}
          <div className="bg-card border border-ink/6 rounded-[16px] p-8 flex flex-col">
            <div
              className={`font-mono text-[11px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[video.pillar]} mb-3`}
            >
              Toolkit · attached
            </div>
            <h2 className="font-display font-extrabold text-xl tracking-[-0.02em] leading-tight mb-5">
              Download what you need.
            </h2>
            <div className="flex items-start gap-4 mt-auto">
              <div
                className={`w-12 h-14 rounded-[6px] flex items-center justify-center flex-shrink-0 ${PILLAR_BG_CLASS[video.pillar]} text-paper`}
              >
                <span className="font-mono text-[10px] font-bold">PDF</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm text-ink truncate">
                  {video.toolkitName}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  1 page · {video.toolkitSizeKb} KB
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 w-full bg-ink text-paper font-display font-bold text-sm px-5 py-3 rounded-[10px] hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Download <span aria-hidden>↓</span>
            </button>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          <PrevNextCard direction="previous" video={previous} pillarLabel={PILLAR_META[video.pillar].name} />
          <PrevNextCard direction="next" video={next} pillarLabel={PILLAR_META[video.pillar].name} />
        </div>

        {/* More from this pillar */}
        {moreFromPillar.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-5 pb-3 border-b border-ink/8">
              <h2 className="font-display font-extrabold text-2xl tracking-[-0.025em]">
                More from {PILLAR_META[video.pillar].name}.
              </h2>
              <Link
                href={`/library/${video.pillar}`}
                className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
              >
                See all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moreFromPillar.map((v) => (
                <Link
                  key={v.slug}
                  href={`/video/${v.slug}`}
                  className="bg-card border border-ink/6 rounded-[16px] p-5 hover:border-ink/15 transition-colors flex flex-col gap-3"
                >
                  <div
                    className={`font-mono text-[10px] tracking-[0.14em] uppercase ${PILLAR_TEXT_CLASS[v.pillar]}`}
                  >
                    {formatDuration(v.durationSeconds)}
                  </div>
                  <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
                    {v.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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

function PrevNextCard({
  direction,
  video,
  pillarLabel,
}: {
  direction: "previous" | "next";
  video: { slug: string; title: string } | null;
  pillarLabel: string;
}) {
  const arrow = direction === "previous" ? "←" : "→";
  const label = direction === "previous" ? "Previous" : "Next";
  if (!video) {
    return (
      <div
        className={`bg-card border border-ink/6 rounded-[16px] p-5 opacity-40 ${direction === "next" ? "sm:text-right" : ""}`}
      >
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-2">
          {label} · {pillarLabel}
        </div>
        <div className="font-display font-bold text-base text-muted">
          {direction === "previous" ? "First in pillar" : "Latest in pillar"}
        </div>
      </div>
    );
  }
  return (
    <Link
      href={`/video/${video.slug}`}
      className={`bg-card border border-ink/6 rounded-[16px] p-5 hover:border-ink/15 transition-colors flex flex-col gap-2 ${direction === "next" ? "sm:items-end sm:text-right" : ""}`}
    >
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted inline-flex items-center gap-2">
        {direction === "previous" && <span aria-hidden>{arrow}</span>}
        {label} · {pillarLabel}
        {direction === "next" && <span aria-hidden>{arrow}</span>}
      </div>
      <div className="font-display font-bold text-base leading-tight tracking-[-0.015em]">
        {video.title}
      </div>
    </Link>
  );
}
