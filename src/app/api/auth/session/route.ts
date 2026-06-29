import { NextResponse, type NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import {
  SESSION_COOKIE_MAX_AGE_SECONDS,
  sessionCookieOptions,
} from "@/lib/auth/session";

/*
 * Exchange a Firebase Auth ID token (from the client SDK after magic-link
 * sign-in) for a long-lived HTTP-only session cookie. This is the canonical
 * pattern from Firebase Auth's session-cookie docs.
 *
 * Body: { idToken: string }
 * Sets: pks_session cookie (httpOnly, secure in prod, sameSite=lax)
 */

export async function POST(request: NextRequest) {
  let body: { idToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }

  const { idToken } = body;
  if (!idToken) {
    return NextResponse.json({ error: "missing-id-token" }, { status: 400 });
  }

  try {
    const expiresInMs = SESSION_COOKIE_MAX_AGE_SECONDS * 1000;
    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn: expiresInMs,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      ...sessionCookieOptions(),
      value: sessionCookie,
    });
    return response;
  } catch {
    /* createSessionCookie throws when the ID token is invalid, expired, or
     * issued for a different project. Don't leak which one. */
    return NextResponse.json({ error: "invalid-id-token" }, { status: 401 });
  }
}
