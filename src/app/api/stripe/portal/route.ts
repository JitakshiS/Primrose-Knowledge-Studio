import { NextResponse, type NextRequest } from "next/server";
import { stripeServer } from "@/lib/stripe/server";
import { readSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";

/*
 * Stripe Customer Portal. The Account page's "Manage billing" button hits
 * this as a GET; we create a portal session for the member's Stripe
 * customer and 303 to Stripe's hosted UI (update card, cancel, invoices).
 * Nothing billing-related is custom-built — Stripe owns that surface.
 */

export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  const session = await readSession();
  if (!session) {
    return NextResponse.redirect(
      new URL("/login?next=/account", siteUrl),
      { status: 303 },
    );
  }

  const profileSnap = await adminDb()
    .collection("profiles")
    .doc(session.uid)
    .get();
  const customerId = profileSnap.data()?.stripeCustomerId as string | undefined;

  if (!customerId) {
    /* Signed in but no Stripe customer on file — they've never subscribed.
     * Send them to the pricing section instead of a dead end. */
    return NextResponse.redirect(new URL("/#pricing", siteUrl), {
      status: 303,
    });
  }

  try {
    const portal = await stripeServer().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl}/account`,
    });
    return NextResponse.redirect(portal.url, { status: 303 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json(
      { error: "portal-error", message },
      { status: 500 },
    );
  }
}
