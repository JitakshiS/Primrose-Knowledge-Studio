import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

/*
 * Edge-runtime proxy (Next.js 16, renamed from middleware). CANNOT use
 * firebase-admin here (Node-only). So we only check for the *presence* of a
 * session cookie at the edge, the actual verification happens in each
 * protected page's server component (or route handler) via verifyMemberAccess.
 * This is the standard Firebase + Next.js pattern; the second lock is the
 * page itself, not the proxy.
 */

/*
 * NOTE, design-preview mode. Until Firebase auth is wired and we can test
 * end-to-end, only /admin is gated so Jitakshi can review the Fortress,
 * library, and video templates on the Vercel preview URL. When real data
 * lands, restore the full list: ["/dashboard", "/library", "/video", "/admin"].
 */
const PROTECTED_PATHS = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE_NAME);
  if (session) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
