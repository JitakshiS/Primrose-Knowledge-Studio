/*
 * verifyMemberAccess — the single canonical server-side gate. Every
 * protected page or route handler calls this before rendering a video
 * embed, a PDF signed URL, or any member-only data. See ARCHITECTURE.md
 * section 3.
 *
 * Returns a tagged union so callers can branch on the reason for denial
 * (no session → redirect to /login; no active subscription → /?join=1).
 */

import { adminDb } from "@/lib/firebase/admin";
import { readSession } from "@/lib/auth/session";
import {
  ACTIVE_SUB_STATUSES,
  type Role,
  type SubscriptionStatus,
} from "@/lib/firebase/types";

export type AccessResult =
  | { ok: true; uid: string; email: string | null; role: Role }
  | { ok: false; reason: "no-session" }
  | { ok: false; reason: "no-subscription"; uid: string; email: string | null }
  | { ok: false; reason: "expired-subscription"; uid: string };

export async function verifyMemberAccess(): Promise<AccessResult> {
  const session = await readSession();
  if (!session) return { ok: false, reason: "no-session" };

  const db = adminDb();
  const [profileSnap, subSnap] = await Promise.all([
    db.collection("profiles").doc(session.uid).get(),
    db.collection("subscriptions").doc(session.uid).get(),
  ]);

  const role = (profileSnap.data()?.role as Role) ?? "member";

  /* Admin bypasses subscription requirement — Primrose still has read access
   * to everything she's publishing, regardless of whether she also has a sub. */
  if (role === "admin") {
    return { ok: true, uid: session.uid, email: session.email, role };
  }

  const sub = subSnap.data();
  if (!sub) {
    return {
      ok: false,
      reason: "no-subscription",
      uid: session.uid,
      email: session.email,
    };
  }

  const status = sub.status as SubscriptionStatus;
  if (!ACTIVE_SUB_STATUSES.includes(status)) {
    return { ok: false, reason: "expired-subscription", uid: session.uid };
  }

  return { ok: true, uid: session.uid, email: session.email, role };
}

export async function verifyAdminAccess(): Promise<AccessResult> {
  const result = await verifyMemberAccess();
  if (!result.ok) return result;
  if (result.role !== "admin") {
    return { ok: false, reason: "no-subscription", uid: result.uid, email: result.email };
  }
  return result;
}
