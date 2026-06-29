/*
 * Session cookie helpers. Firebase Auth ID tokens are short-lived (1 hour);
 * we exchange them for longer-lived session cookies (Admin SDK creates these
 * server-side) and read them via next/headers cookies().
 */

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_MAX_AGE_SECONDS,
} from "@/lib/auth/constants";

export { SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE_SECONDS };

export interface VerifiedSession {
  uid: string;
  email: string | null;
}

export async function readSession(): Promise<VerifiedSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(cookie, true);
    return { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}
