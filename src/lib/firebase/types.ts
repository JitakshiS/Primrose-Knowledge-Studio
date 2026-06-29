/*
 * Firestore document shapes. Authoritative source for the data model;
 * mirrors ARCHITECTURE.md section 2.
 */

export const PILLARS = [
  "workplace",
  "financial",
  "career",
  "emotional",
  "safety",
] as const;
export type Pillar = (typeof PILLARS)[number];

export type SubscriptionStatus =
  | "active"
  | "past_due"
  | "canceled"
  | "trialing"
  | "incomplete";

export type Role = "member" | "admin";

export type YoutubeVisibility = "unlisted" | "public";

export type VideoStatus = "draft" | "published";

export interface ProfileDoc {
  uid: string;
  email: string;
  displayName?: string;
  stripeCustomerId?: string;
  role: Role;
  createdAt: FirebaseTimestamp;
}

export interface SubscriptionDoc {
  userId: string;
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: FirebaseTimestamp;
  cancelAtPeriodEnd: boolean;
  priceId: string;
  updatedAt: FirebaseTimestamp;
}

export interface VideoDoc {
  title: string;
  slug: string;
  description: string;
  pillar: Pillar;
  youtubeVideoId: string;
  youtubeVisibility: YoutubeVisibility;
  thumbnailUrl: string | null;
  toolkitPdfPath: string | null;
  status: VideoStatus;
  isFeatured: boolean;
  publishedAt: FirebaseTimestamp;
  durationSeconds: number;
}

export interface VideoProgressDoc {
  videoId: string;
  positionSeconds: number;
  completed: boolean;
  updatedAt: FirebaseTimestamp;
}

/** Loose alias so files can pass through Firestore timestamps without coupling
 * to admin vs client SDK at the type level. */
export type FirebaseTimestamp = unknown;

export const ACTIVE_SUB_STATUSES: SubscriptionStatus[] = [
  "active",
  "past_due",
  "trialing",
];
