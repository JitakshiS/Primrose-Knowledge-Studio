import type { Metadata } from "next";
import Link from "next/link";
import {
  PILLAR_META,
  PILLAR_ORDER,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  PLACEHOLDER_VIDEOS,
  formatDate,
  formatDuration,
} from "@/data/placeholder";

export const metadata: Metadata = {
  title: "Videos",
};

type SearchParams = Promise<{ pillar?: string; status?: string }>;

export default async function AdminVideosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { pillar: pillarFilter, status: statusFilter } = await searchParams;

  const videos = [...PLACEHOLDER_VIDEOS]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .filter((v) => !pillarFilter || v.pillar === pillarFilter);

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14 flex-1">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">
            Library management
          </div>
          <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95]">
            All videos.
          </h1>
        </div>
        <Link
          href="/admin/videos/new"
          className="bg-ink text-paper font-display font-extrabold text-sm px-5 py-3 rounded-[10px] inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span aria-hidden>+</span> Add a video
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card border border-ink/6 rounded-[16px] p-4 mb-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mr-1">
          Filter
        </span>
        <Link
          href="/admin/videos"
          className={`font-display font-medium text-[13px] px-3 py-1.5 rounded-[8px] transition-colors ${!pillarFilter ? "bg-ink text-paper" : "text-muted hover:bg-stone/60 hover:text-ink"}`}
        >
          All pillars
        </Link>
        {PILLAR_ORDER.map((p) => (
          <Link
            key={p}
            href={`/admin/videos?pillar=${p}`}
            className={`font-display font-medium text-[13px] px-3 py-1.5 rounded-[8px] transition-colors inline-flex items-center gap-2 ${pillarFilter === p ? "bg-ink text-paper" : "text-muted hover:bg-stone/60 hover:text-ink"}`}
          >
            <span
              className={`block w-1.5 h-1.5 rounded-full ${PILLAR_BG_CLASS[p]}`}
              aria-hidden
            />
            {PILLAR_META[p].name.split(" ")[0]}
          </Link>
        ))}
        <div className="ml-auto font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
          {videos.length} {videos.length === 1 ? "video" : "videos"}
        </div>
      </div>

      {/* Videos table */}
      <div className="bg-card border border-ink/6 rounded-[16px] overflow-hidden">
        {/* Header row */}
        <div className="hidden md:grid md:grid-cols-[1fr_140px_120px_100px_80px] gap-4 items-center px-5 py-3 bg-stone/40 border-b border-ink/6">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Title
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Pillar
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Published
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Duration
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted text-right">
            Actions
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-3">
              No videos match this filter
            </div>
            <Link
              href="/admin/videos"
              className="font-display font-bold text-[13px] text-career"
            >
              Reset filter →
            </Link>
          </div>
        ) : (
          videos.map((v, i) => (
            <div
              key={v.slug}
              className={`md:grid md:grid-cols-[1fr_140px_120px_100px_80px] md:gap-4 md:items-center flex items-start gap-3 px-4 sm:px-5 py-4 ${i < videos.length - 1 ? "border-b border-ink/6" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/videos/${v.slug}`}
                  className="font-display font-bold text-[14px] sm:text-[15px] leading-tight tracking-[-0.01em] hover:text-career transition-colors block"
                >
                  {v.title}
                </Link>
                {/* Mobile-only inline meta strip */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 md:hidden">
                  <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${PILLAR_TEXT_CLASS[v.pillar]} inline-flex items-center gap-1.5`}>
                    <span
                      className={`block w-1 h-1 rounded-full ${PILLAR_BG_CLASS[v.pillar]}`}
                      aria-hidden
                    />
                    {PILLAR_META[v.pillar].name.split(" ")[0]}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {formatDate(v.publishedAt)}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {formatDuration(v.durationSeconds)}
                  </span>
                </div>
                {/* Toolkit name (both mobile + desktop) */}
                <div className="font-mono text-[10px] text-muted mt-1 truncate">
                  {v.toolkitName}
                </div>
              </div>
              {/* Desktop-only meta columns */}
              <div className={`hidden md:inline-flex font-mono text-[11px] tracking-[0.12em] uppercase ${PILLAR_TEXT_CLASS[v.pillar]} items-center gap-2`}>
                <span
                  className={`block w-1.5 h-1.5 rounded-full ${PILLAR_BG_CLASS[v.pillar]}`}
                  aria-hidden
                />
                {PILLAR_META[v.pillar].name.split(" ")[0]}
              </div>
              <div className="hidden md:block font-mono text-[11px] text-muted">
                {formatDate(v.publishedAt)}
              </div>
              <div className="hidden md:block font-mono text-[11px] text-muted">
                {formatDuration(v.durationSeconds)}
              </div>
              <div className="md:text-right flex-shrink-0 mt-1 md:mt-0">
                <Link
                  href={`/admin/videos/${v.slug}`}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
                >
                  Edit →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
