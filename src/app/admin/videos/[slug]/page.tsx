import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PILLAR_META,
  PILLAR_ORDER,
  PILLAR_BG_CLASS,
  PILLAR_TEXT_CLASS,
  videoBySlug,
  formatDate,
  formatDuration,
} from "@/data/placeholder";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = videoBySlug(slug);
  return {
    title: video ? `Edit: ${video.title}` : "Edit video",
  };
}

export default async function AdminEditVideoPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const video = videoBySlug(slug);
  if (!video) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-14 flex-1">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted mb-6 flex items-center flex-wrap gap-x-2"
      >
        <Link href="/admin" className="hover:text-ink transition-colors">
          Admin
        </Link>
        <span aria-hidden>/</span>
        <Link href="/admin/videos" className="hover:text-ink transition-colors">
          Videos
        </Link>
        <span aria-hidden>/</span>
        <span>Edit</span>
      </nav>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-3">
        <div className="min-w-0">
          <div
            className={`font-mono text-[11px] tracking-[0.14em] uppercase mb-2 ${PILLAR_TEXT_CLASS[video.pillar]} inline-flex items-center gap-2`}
          >
            <span
              className={`block w-2 h-2 rounded-full ${PILLAR_BG_CLASS[video.pillar]}`}
              aria-hidden
            />
            {PILLAR_META[video.pillar].name} · Published
          </div>
          <h1 className="font-display font-black text-3xl lg:text-4xl tracking-[-0.02em] leading-[0.95]">
            Edit video.
          </h1>
        </div>
        <div className="font-mono text-[11px] text-muted">
          Last updated {formatDate(video.publishedAt)} · {formatDuration(video.durationSeconds)}
        </div>
      </div>
      <p className="text-[14px] leading-relaxed text-muted mb-10 max-w-[60ch]">
        Changes save immediately to Firestore once Firebase is wired. The video&apos;s
        URL is fixed by its slug; changing the slug breaks any external links to
        this video.
      </p>

      <form className="space-y-7">
        <Field
          label="Title"
          name="title"
          defaultValue={video.title}
          required
        />

        <Field
          label="Slug"
          name="slug"
          defaultValue={video.slug}
          hint="Used in the URL: /video/[slug]. Be careful editing on a published video."
          required
        />

        <TextareaField
          label="Description"
          name="description"
          defaultValue={video.description}
          rows={4}
          required
        />

        {/* Pillar selector */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
            Pillar <span className="text-safety">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PILLAR_ORDER.map((p, i) => (
              <label key={p} className="cursor-pointer group">
                <input
                  type="radio"
                  name="pillar"
                  value={p}
                  defaultChecked={p === video.pillar}
                  className="peer sr-only"
                />
                <div
                  className={`${PILLAR_BG_CLASS[p]} text-paper rounded-[12px] p-4 aspect-square flex flex-col justify-between opacity-50 peer-checked:opacity-100 transition-opacity hover:opacity-90`}
                >
                  <div className="font-mono text-[10px] tracking-[0.14em] opacity-85">
                    0{i + 1}
                  </div>
                  <div className="font-display font-extrabold text-[13px] leading-tight tracking-[-0.015em]">
                    {PILLAR_META[p].name.split(" ")[0]}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Field
          label="YouTube video ID"
          name="youtubeVideoId"
          defaultValue="dQw4w9WgXcQ"
          hint="The 11-character ID from the YouTube URL."
          required
        />

        {/* Visibility */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
            YouTube visibility
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="unlisted"
                defaultChecked
                className="peer sr-only"
              />
              <div className="bg-card border border-ink/15 peer-checked:border-ink peer-checked:bg-stone/40 rounded-[12px] p-4 transition-colors">
                <div className="font-display font-bold text-sm mb-1">Unlisted</div>
                <div className="text-[12px] text-muted leading-snug">
                  Members-only library.
                </div>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                className="peer sr-only"
              />
              <div className="bg-card border border-ink/15 peer-checked:border-ink peer-checked:bg-stone/40 rounded-[12px] p-4 transition-colors">
                <div className="font-display font-bold text-sm mb-1">Public</div>
                <div className="text-[12px] text-muted leading-snug">
                  Professor&apos;s Preview channel.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Existing toolkit + replace */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
            Toolkit PDF
          </label>
          <div className="bg-card border border-ink/10 rounded-[16px] p-5 flex items-center gap-4 mb-3">
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
                1 page · {video.toolkitSizeKb} KB · Currently attached
              </div>
            </div>
            <button
              type="button"
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted hover:text-safety transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="bg-card border border-dashed border-ink/15 rounded-[12px] p-5 text-center">
            <div className="font-display font-bold text-sm">
              Replace with a new PDF
            </div>
            <div className="text-[12px] text-muted mt-0.5">
              The current toolkit stays until you save.
            </div>
          </div>
        </div>

        {/* Status + featured */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  className="peer sr-only"
                />
                <div className="bg-card border border-ink/15 peer-checked:border-ink peer-checked:bg-stone/40 rounded-[10px] py-3 text-center transition-colors">
                  <span className="font-display font-bold text-sm">Draft</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  defaultChecked
                  className="peer sr-only"
                />
                <div className="bg-card border border-ink/15 peer-checked:border-ink peer-checked:bg-stone/40 rounded-[10px] py-3 text-center transition-colors">
                  <span className="font-display font-bold text-sm">Published</span>
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
              Featured
            </label>
            <label className="cursor-pointer block">
              <input
                type="checkbox"
                name="featured"
                className="peer sr-only"
              />
              <div className="bg-card border border-ink/15 peer-checked:border-career peer-checked:bg-career/5 rounded-[10px] py-3 px-4 transition-colors flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border-2 border-ink/20 peer-checked:bg-career peer-checked:border-career flex items-center justify-center" />
                <div>
                  <span className="font-display font-bold text-sm block">
                    Set as Newest Addition
                  </span>
                  <span className="text-[11px] text-muted">
                    Replaces the current featured video on the dashboard
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Footer: save / cancel / delete */}
        <div className="pt-5 border-t border-ink/8 flex flex-wrap gap-3 items-center">
          <button
            type="button"
            className="bg-ink text-paper font-display font-extrabold text-sm px-6 py-3 rounded-[10px] inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Save changes <span aria-hidden>→</span>
          </button>
          <Link
            href="/admin/videos"
            className="font-display font-medium text-sm text-muted hover:text-ink transition-colors px-4 py-3"
          >
            Cancel
          </Link>
          <span className="ml-auto" />
          <button
            type="button"
            className="font-display font-medium text-sm text-safety hover:bg-safety/5 transition-colors px-4 py-3 rounded-[10px] inline-flex items-center gap-2"
          >
            <span aria-hidden>×</span> Delete video
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-2 block"
      >
        {label} {required && <span className="text-safety">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-[10px] bg-card border border-ink/10 text-ink placeholder:text-soft focus:outline-none focus:border-career focus:ring-2 focus:ring-career/15 transition"
      />
      {hint && (
        <div className="font-mono text-[10px] text-soft mt-1.5">{hint}</div>
      )}
    </div>
  );
}

function TextareaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-2 block"
      >
        {label} {required && <span className="text-safety">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-[10px] bg-card border border-ink/10 text-ink placeholder:text-soft focus:outline-none focus:border-career focus:ring-2 focus:ring-career/15 transition resize-y"
      />
    </div>
  );
}
