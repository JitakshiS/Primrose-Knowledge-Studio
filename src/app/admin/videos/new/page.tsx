import type { Metadata } from "next";
import Link from "next/link";
import {
  PILLAR_META,
  PILLAR_ORDER,
  PILLAR_BG_CLASS,
} from "@/data/placeholder";

export const metadata: Metadata = {
  title: "Add a video",
};

export default function AdminNewVideoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-14 flex-1">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted mb-6 flex items-center gap-x-2"
      >
        <Link href="/admin" className="hover:text-ink transition-colors">
          Admin
        </Link>
        <span aria-hidden>/</span>
        <Link href="/admin/videos" className="hover:text-ink transition-colors">
          Videos
        </Link>
        <span aria-hidden>/</span>
        <span>New</span>
      </nav>

      <h1 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.02em] leading-[0.95] mb-3">
        Add a video.
      </h1>
      <p className="text-[15px] leading-relaxed text-muted mb-10 max-w-[60ch]">
        Fill in the details below. Videos can be saved as draft and published later.
        Members only see videos that are in published status.
      </p>

      {/* The form — placeholder, no submit handler until Firebase is wired */}
      <form className="space-y-7">
        <Field
          label="Title"
          name="title"
          placeholder="Reading the fine print on your first job offer"
          required
        />

        <Field
          label="Slug"
          name="slug"
          placeholder="reading-the-fine-print-job-offer"
          hint="Auto-generated from title. Used in the URL: /video/[slug]"
          required
        />

        <TextareaField
          label="Description"
          name="description"
          placeholder="What this video covers in 2-3 sentences. Members read this before they click play."
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
              <label
                key={p}
                className="cursor-pointer group"
              >
                <input
                  type="radio"
                  name="pillar"
                  value={p}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                />
                <div className={`${PILLAR_BG_CLASS[p]} text-paper rounded-[12px] p-4 aspect-square flex flex-col justify-between opacity-50 peer-checked:opacity-100 transition-opacity hover:opacity-90`}>
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
          placeholder="dQw4w9WgXcQ"
          hint="The 11-character ID from the YouTube URL. Make sure the video is set to Unlisted."
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
                  Members-only library. Cannot be discovered on YouTube.
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
                  Professor&apos;s Preview. Watchable without a membership.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Toolkit PDF upload */}
        <div>
          <label className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-3 block">
            Toolkit PDF
          </label>
          <div className="bg-card border border-dashed border-ink/15 rounded-[16px] p-8 text-center">
            <div className="w-12 h-14 rounded-[6px] bg-stone mx-auto flex items-center justify-center mb-4">
              <span className="font-mono text-[10px] font-bold text-muted">PDF</span>
            </div>
            <div className="font-display font-bold text-sm mb-1">
              Drop a PDF here, or click to choose
            </div>
            <div className="text-[12px] text-muted">
              Stored privately. Members get a short-lived signed download link.
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
                  defaultChecked
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
                <span className="w-5 h-5 rounded-full border-2 border-ink/20 peer-checked:bg-career peer-checked:border-career flex items-center justify-center">
                </span>
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

        {/* Submit */}
        <div className="pt-4 border-t border-ink/8 flex flex-wrap gap-3 items-center">
          <button
            type="button"
            className="bg-ink text-paper font-display font-extrabold text-sm px-6 py-3 rounded-[10px] inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Save video <span aria-hidden>→</span>
          </button>
          <Link
            href="/admin/videos"
            className="font-display font-medium text-sm text-muted hover:text-ink transition-colors px-4 py-3"
          >
            Cancel
          </Link>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-soft ml-auto">
            Form is wired once Firebase is connected
          </span>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  hint,
  required,
}: {
  label: string;
  name: string;
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
  placeholder,
  rows,
  required,
}: {
  label: string;
  name: string;
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
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-[10px] bg-card border border-ink/10 text-ink placeholder:text-soft focus:outline-none focus:border-career focus:ring-2 focus:ring-career/15 transition resize-y"
      />
    </div>
  );
}
