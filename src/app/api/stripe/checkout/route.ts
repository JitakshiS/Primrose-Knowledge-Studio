import { NextResponse, type NextRequest } from "next/server";
import { stripeServer } from "@/lib/stripe/server";
import { readSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";

/*
 * Create a Stripe Checkout Session for the $29/mo membership.
 *
 * The Porch CTA hits this as a GET, we redirect (303) to Stripe's hosted
 * checkout. Two paths:
 *   - Anonymous visitor: Stripe collects email at checkout. On
 *     checkout.session.completed the webhook will (a) create a Firebase Auth
 *     user with that email and (b) write the subscription doc. We then email
 *     them a magic-link to sign in.
 *   - Signed-in user without a sub: we pass their UID in client_reference_id
 *     so the webhook can attach the sub doc to the existing Firebase UID.
 *
 * On success Stripe sends them to /welcome?session_id=... where we trigger
 * the magic link. The /welcome page is built in the next commit.
 */

export async function GET(request: NextRequest) {
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "stripe-price-not-configured" },
      { status: 500 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  /* If already signed in, attach UID + reuse Stripe customer if we have one. */
  const session = await readSession();
  let customerId: string | undefined;
  let customerEmail: string | undefined;
  if (session) {
    const profileSnap = await adminDb()
      .collection("profiles")
      .doc(session.uid)
      .get();
    const profile = profileSnap.data();
    customerId = profile?.stripeCustomerId;
    customerEmail = session.email ?? profile?.email;
  }

  try {
    const checkout = await stripeServer().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=canceled`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      ...(customerId
        ? { customer: customerId }
        : customerEmail
          ? { customer_email: customerEmail }
          : {}),
      ...(session ? { client_reference_id: session.uid } : {}),
      metadata: session ? { firebaseUid: session.uid } : {},
      subscription_data: {
        metadata: session ? { firebaseUid: session.uid } : {},
      },
    });

    if (!checkout.url) {
      return NextResponse.json(
        { error: "checkout-url-missing" },
        { status: 500 },
      );
    }
    return NextResponse.redirect(checkout.url, { status: 303 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: "stripe-error", message }, { status: 500 });
  }
}
