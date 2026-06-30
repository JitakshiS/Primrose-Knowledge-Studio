/*
 * Stripe SDK, server-only. Used by /api/stripe/checkout, /api/stripe/portal,
 * and /api/stripe/webhook. Never import from a client component.
 */

import Stripe from "stripe";

let cached: Stripe | undefined;

export function stripeServer(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY missing, populate it in .env.local before exercising any Stripe route.",
    );
  }
  cached = new Stripe(key, {
    typescript: true,
  });
  return cached;
}

export const STRIPE_WEBHOOK_TOLERANCE_SECONDS = 300;
