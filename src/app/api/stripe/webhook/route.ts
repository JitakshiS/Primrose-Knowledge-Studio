import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripeServer } from "@/lib/stripe/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import type { SubscriptionStatus } from "@/lib/firebase/types";

/*
 * Stripe webhook handler. Signature-verified, idempotent. The single source
 * of truth for writing subscription state into Firestore.
 *
 * Configured events (see ARCHITECTURE.md section 5):
 *   - checkout.session.completed
 *   - customer.subscription.created / updated / deleted
 *   - invoice.paid
 *   - invoice.payment_failed
 *
 * Important: this route handler MUST NOT be Edge — firebase-admin is Node-only.
 * The default runtime is Node, but we lock it explicitly below.
 *
 * NOTE: This is the scaffolded handler. Production wiring of new-member
 * Firebase Auth user creation + magic-link email happens once the Firebase
 * project exists and we can test end-to-end.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACTIVE_STATUSES: SubscriptionStatus[] = ["active", "past_due", "trialing"];

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing-signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "webhook-secret-not-configured" },
      { status: 500 },
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripeServer().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "invalid-signature" }, { status: 400 });
  }

  /* Idempotency ledger — if we've already processed this event, ack and skip. */
  const db = adminDb();
  const processedRef = db.collection("processedWebhookEvents").doc(event.id);
  const processedDoc = await processedRef.get();
  if (processedDoc.exists) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscriptionToFirestore(subscription);
        break;
      }
      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionField = (invoice as { subscription?: string | Stripe.Subscription }).subscription;
        if (typeof subscriptionField === "string") {
          const subscription = await stripeServer().subscriptions.retrieve(subscriptionField);
          await syncSubscriptionToFirestore(subscription);
        }
        break;
      }
      default:
        /* unhandled event types are still recorded so we don't reprocess them */
        break;
    }
  } catch (err) {
    /* Don't mark as processed on failure — Stripe will retry. */
    const message = err instanceof Error ? err.message : "handler-error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  await processedRef.set({
    type: event.type,
    processedAt: FieldValue.serverTimestamp(),
  });
  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  /* If a Firebase UID was passed through, link the Stripe customer to the
   * existing profile. If not — anonymous checkout flow — we'll create the
   * Firebase Auth user lazily on first magic-link sign-in (the /welcome page
   * triggers the magic link using the email Stripe collected). */
  const firebaseUid =
    (session.metadata?.firebaseUid as string | undefined) ??
    (session.client_reference_id as string | undefined);
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : undefined;

  if (firebaseUid && stripeCustomerId) {
    await adminDb().collection("profiles").doc(firebaseUid).set(
      { stripeCustomerId },
      { merge: true },
    );
  }
}

async function syncSubscriptionToFirestore(subscription: Stripe.Subscription) {
  const stripeCustomerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  /* Resolve Stripe customer → Firebase UID. Two ways: (a) metadata.firebaseUid
   * on the subscription, set during checkout; (b) lookup by stripeCustomerId
   * in the profiles collection. */
  let firebaseUid =
    (subscription.metadata?.firebaseUid as string | undefined) ?? null;

  if (!firebaseUid) {
    const profilesSnap = await adminDb()
      .collection("profiles")
      .where("stripeCustomerId", "==", stripeCustomerId)
      .limit(1)
      .get();
    firebaseUid = profilesSnap.empty ? null : profilesSnap.docs[0]?.id ?? null;
  }

  if (!firebaseUid) {
    /* We don't have a Firebase user yet — the /welcome page will create the
     * link on first sign-in. Skip writing the sub doc for now. */
    return;
  }

  const priceId = subscription.items.data[0]?.price?.id ?? "unknown";
  const periodEndUnix =
    (subscription as unknown as { current_period_end?: number })
      .current_period_end ?? Math.floor(Date.now() / 1000);

  const status = subscription.status as SubscriptionStatus;
  const validatedStatus: SubscriptionStatus = ACTIVE_STATUSES.includes(status)
    ? status
    : status;

  await adminDb()
    .collection("subscriptions")
    .doc(firebaseUid)
    .set(
      {
        userId: firebaseUid,
        stripeSubscriptionId: subscription.id,
        status: validatedStatus,
        currentPeriodEnd: Timestamp.fromMillis(periodEndUnix * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
        priceId,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
}
