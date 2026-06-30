/*
 * Placeholder video data for design previews of the Fortress, library, and
 * video viewer. Replaced by Firestore reads once Firebase is wired.
 *
 * Pillar slugs match the design system tokens (workplace, financial, career,
 * emotional, safety) and the Pillar type in lib/firebase/types.ts.
 */

import type { Pillar } from "@/lib/firebase/types";

export interface PlaceholderVideo {
  slug: string;
  title: string;
  pillar: Pillar;
  description: string;
  durationSeconds: number;
  publishedAt: string; // ISO date
  toolkitName: string;
  toolkitSizeKb: number;
}

export const PILLAR_META: Record<
  Pillar,
  { name: string; colorVar: string; tagline: string }
> = {
  workplace: {
    name: "Workplace Wellness",
    colorVar: "var(--pillar-workplace)",
    tagline: "Your rights at work. Contracts, overtime, harassment, leaving well.",
  },
  financial: {
    name: "Financial Wellness",
    colorVar: "var(--pillar-financial)",
    tagline: "The money basics nobody taught you. Taxes, debt, building from zero.",
  },
  career: {
    name: "Career Wellness",
    colorVar: "var(--pillar-career)",
    tagline: "Negotiating offers, switching fields, the legal side of side hustles.",
  },
  emotional: {
    name: "Emotional Wellness",
    colorVar: "var(--pillar-emotional)",
    tagline: "Recognising harm, accessing support, knowing what's worth pursuing.",
  },
  safety: {
    name: "Personal Safety",
    colorVar: "var(--pillar-safety)",
    tagline: "Domestic situations, stalking, when to involve law enforcement.",
  },
};

export const PILLAR_BG_CLASS: Record<Pillar, string> = {
  workplace: "bg-workplace",
  financial: "bg-financial",
  career: "bg-career",
  emotional: "bg-emotional",
  safety: "bg-safety",
};

export const PILLAR_TEXT_CLASS: Record<Pillar, string> = {
  workplace: "text-workplace",
  financial: "text-financial",
  career: "text-career",
  emotional: "text-emotional",
  safety: "text-safety",
};

export const PILLAR_ORDER: Pillar[] = [
  "workplace",
  "financial",
  "career",
  "emotional",
  "safety",
];

export const PLACEHOLDER_VIDEOS: PlaceholderVideo[] = [
  {
    slug: "reading-the-fine-print-job-offer",
    title: "Reading the fine print on your first job offer",
    pillar: "workplace",
    description:
      "What 'at-will' actually means in Canadian context, the non-compete clauses worth pushing back on, and the three signals that an offer is about to get worse, not better.",
    durationSeconds: 14 * 60 + 32,
    publishedAt: "2026-06-26",
    toolkitName: "Fine-print-check.pdf",
    toolkitSizeKb: 84,
  },
  {
    slug: "overtime-laws-canada",
    title: "Overtime laws: when you're owed and when you're not",
    pillar: "workplace",
    description:
      "The federal and provincial rules that decide when overtime kicks in, how the math actually works, and what to do if it's not showing up on your pay stub.",
    durationSeconds: 13 * 60 + 14,
    publishedAt: "2026-06-19",
    toolkitName: "Overtime-math-sheet.pdf",
    toolkitSizeKb: 72,
  },
  {
    slug: "off-the-clock-messaging",
    title: "Off-the-clock messaging: what the law actually says",
    pillar: "workplace",
    description:
      "When your boss texts at 10pm, what your obligations actually are, and the language to use when you need to set a boundary without burning the relationship.",
    durationSeconds: 12 * 60 + 47,
    publishedAt: "2026-06-12",
    toolkitName: "After-hours-scripts.pdf",
    toolkitSizeKb: 91,
  },
  {
    slug: "rrsps-explained",
    title: "How RRSPs actually work: the version nobody explained",
    pillar: "financial",
    description:
      "What an RRSP is, what the contribution limit means, when to contribute versus when to wait, and the one mistake that costs people thousands by the time they file.",
    durationSeconds: 15 * 60 + 8,
    publishedAt: "2026-06-22",
    toolkitName: "RRSP-decision-tree.pdf",
    toolkitSizeKb: 102,
  },
  {
    slug: "first-tax-return",
    title: "Filing your first tax return without panic",
    pillar: "financial",
    description:
      "The five forms you actually need, what the boxes mean in plain English, and the credits people in their twenties leave on the table every single year.",
    durationSeconds: 17 * 60 + 22,
    publishedAt: "2026-06-15",
    toolkitName: "Tax-return-checklist.pdf",
    toolkitSizeKb: 118,
  },
  {
    slug: "debt-vs-investing",
    title: "Debt vs investing: the math, not the vibes",
    pillar: "financial",
    description:
      "When paying down a credit card beats every investment in the market, when it doesn't, and the simple rule for deciding when both options are competing for your next dollar.",
    durationSeconds: 11 * 60 + 39,
    publishedAt: "2026-06-08",
    toolkitName: "Debt-vs-invest-worksheet.pdf",
    toolkitSizeKb: 88,
  },
  {
    slug: "first-raise-negotiation",
    title: "Negotiating a first raise: language that lands",
    pillar: "career",
    description:
      "The exact opening line, the silence after, and the three responses to 'we don't have the budget.' Plus what to do if they ghost the conversation for two weeks.",
    durationSeconds: 13 * 60 + 51,
    publishedAt: "2026-06-23",
    toolkitName: "Raise-conversation-script.pdf",
    toolkitSizeKb: 64,
  },
  {
    slug: "side-hustle-legal",
    title: "The legal side of side hustles",
    pillar: "career",
    description:
      "What your employment contract actually says about side work, when an LLC matters and when it doesn't, and the tax thresholds that change once you cross them.",
    durationSeconds: 16 * 60 + 4,
    publishedAt: "2026-06-10",
    toolkitName: "Side-hustle-decision-guide.pdf",
    toolkitSizeKb: 105,
  },
  {
    slug: "harm-vs-stress",
    title: "Recognising harm versus ordinary stress",
    pillar: "emotional",
    description:
      "The line between a hard day and something that's actually doing damage, and the kinds of situations where putting a name to what's happening is the first protective move.",
    durationSeconds: 12 * 60 + 18,
    publishedAt: "2026-06-21",
    toolkitName: "Naming-it-worksheet.pdf",
    toolkitSizeKb: 76,
  },
  {
    slug: "accessing-support",
    title: "Accessing support: provincial mental health programs",
    pillar: "emotional",
    description:
      "Free and low-cost programs by province, what they actually cover, and the wait-time realities. Includes the three questions to ask any first appointment.",
    durationSeconds: 14 * 60 + 55,
    publishedAt: "2026-06-05",
    toolkitName: "Support-resources-by-province.pdf",
    toolkitSizeKb: 132,
  },
  {
    slug: "domestic-situations-first-48",
    title: "Domestic situations: the first 48 hours",
    pillar: "safety",
    description:
      "The protective steps that buy you time and options, the documentation that matters later, and the three numbers worth knowing before you need them.",
    durationSeconds: 18 * 60 + 9,
    publishedAt: "2026-06-25",
    toolkitName: "Safe-exit-checklist.pdf",
    toolkitSizeKb: 144,
  },
  {
    slug: "stalking-when-to-involve-police",
    title: "Stalking and harassment: when to involve police",
    pillar: "safety",
    description:
      "What counts as criminal harassment in Canada, the threshold for a protection order, and what to bring with you when you go to the station.",
    durationSeconds: 15 * 60 + 33,
    publishedAt: "2026-06-17",
    toolkitName: "Police-station-prep.pdf",
    toolkitSizeKb: 96,
  },
];

export function videosByPillar(pillar: Pillar): PlaceholderVideo[] {
  return PLACEHOLDER_VIDEOS.filter((v) => v.pillar === pillar);
}

export function videoBySlug(slug: string): PlaceholderVideo | undefined {
  return PLACEHOLDER_VIDEOS.find((v) => v.slug === slug);
}

export function newestVideo(): PlaceholderVideo {
  const sorted = [...PLACEHOLDER_VIDEOS].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  return sorted[0]!;
}

export function adjacentVideosInPillar(video: PlaceholderVideo): {
  previous: PlaceholderVideo | null;
  next: PlaceholderVideo | null;
} {
  const list = videosByPillar(video.pillar).sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  const i = list.findIndex((v) => v.slug === video.slug);
  return {
    previous: i > 0 ? list[i - 1] ?? null : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] ?? null : null,
  };
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
