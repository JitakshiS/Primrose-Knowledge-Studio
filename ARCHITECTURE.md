# Technical Architecture — Primrose Knowledge Studio

The technical foundation we build against. This is the spec an external reviewer reads, and the reference we hold ourselves to. Intended design, to be validated against her current Stripe setup at kickoff.

Principle: **never trust the client.** Access decisions happen on the server. A browser we haven't verified never receives a video embed, a PDF link, or admin data.

> This is the post-2026-06-22 architecture: Firebase + unlisted YouTube + Stripe. Earlier drafts referenced Supabase + Vimeo Pro — see `DECISIONS.md` 2026-06-22 for why the stack changed.

---

## 1. Framework — Next.js (App Router), not a plain React SPA

Her sprint build is a Vite/React SPA. We move the rebuild to **Next.js** for one reason that matters: security needs server-side gating.

- A SPA ships all its code to the browser, then hides things with JavaScript. Anyone can read the bundle and find the video IDs.
- Next.js server components, route handlers, and middleware let us check "is this person a paying member?" on the server, **before** any video embed or PDF link is ever sent to their device.

This single decision is what makes the paywall real rather than cosmetic.

- Hosting: Vercel (first-class Next.js support)
- Rendering: server components for all protected pages; client components only for interactive bits (player controls, forms)
- Edge middleware enforces the auth + subscription check on `/dashboard`, `/library`, `/video/*`, and `/admin/*` before any RSC payload is rendered

---

## 2. Data layer — Firestore collections

Firestore replaces the earlier Supabase/Postgres plan. NoSQL document shapes below; access is enforced by Security Rules (Section 3) plus server-side checks in Next.js (Section 4). The schemas are denormalised where it helps read performance and kept relational where it helps integrity.

### `profiles/{userId}`
| field | type | notes |
|---|---|---|
| `uid` | string | matches Firebase Auth UID; `{userId}` in the doc path equals this |
| `email` | string | mirrored from Firebase Auth for query convenience |
| `displayName` | string | optional |
| `stripeCustomerId` | string | unique; the link to Stripe |
| `role` | string | `"member"` or `"admin"`, default `"member"` |
| `createdAt` | timestamp | server timestamp |

### `subscriptions/{userId}` — one doc per user, synced from Stripe by webhook
| field | type | notes |
|---|---|---|
| `userId` | string | redundant with doc ID; convenient for queries |
| `stripeSubscriptionId` | string | unique |
| `status` | string | `"active"`, `"past_due"`, `"canceled"`, `"trialing"`, `"incomplete"` |
| `currentPeriodEnd` | timestamp | when access expires if not renewed |
| `cancelAtPeriodEnd` | boolean | cancelled but still inside paid window |
| `priceId` | string | Stripe price reference (allows us to evolve pricing without losing history) |
| `updatedAt` | timestamp | last webhook sync |

Storing one subscription doc per user (keyed by `userId`) keeps lookups O(1) and avoids fanout. If she ever moves to multiple concurrent subscriptions per user (Phase 2), this becomes a subcollection.

### `videos/{videoId}`
| field | type | notes |
|---|---|---|
| `title` | string | |
| `slug` | string | unique; drives `/video/[slug]` route |
| `description` | string | |
| `pillar` | string | constrained to one of the five pillar slugs: `workplace`, `financial`, `career`, `emotional`, `safety` |
| `youtubeVideoId` | string | the 11-character YouTube video ID; the embed reference |
| `youtubeVisibility` | string | `"unlisted"` (paid library default) or `"public"` (Professor's Preview / marketing) |
| `thumbnailUrl` | string, nullable | custom thumbnail; falls back to YouTube's auto thumbnail |
| `toolkitPdfPath` | string, nullable | path in Firebase Storage private bucket |
| `status` | string | `"draft"` or `"published"` |
| `isFeatured` | boolean | the "Newest Addition" slot — only one doc at a time may hold this |
| `publishedAt` | timestamp | drives default ordering |
| `durationSeconds` | number | for the player + library card display |

The five pillars are enforced as a fixed enum in Security Rules (Section 3) — not a separate `pillars` collection, since the taxonomy is locked content (CLAUDE.md, Section 5 Pillars). One source of truth.

### `videoProgress/{userId}/items/{videoId}` — subcollection per user
| field | type | notes |
|---|---|---|
| `videoId` | string | redundant with doc ID |
| `positionSeconds` | number | last watched position for resume |
| `completed` | boolean | crossed 90% threshold |
| `updatedAt` | timestamp | |

Subcollection structure keeps a user's progress isolated under their own doc — natural fit for Firestore's Security Rules pattern.

### Indexes
Composite indexes the queries will need:
- `videos` on `(status, pillar, publishedAt desc)` — library by pillar
- `videos` on `(status, publishedAt desc)` — full library, newest first
- `videos` on `(isFeatured, publishedAt desc)` — Newest Addition card lookup

---

## 3. Security model — Firestore Security Rules + server-side checks (defense in depth)

Firestore's Security Rules are the equivalent of the Supabase RLS layer in the old design — they enforce access at the database, independent of the app layer. Server-side checks in Next.js are the second layer. A bug in either alone cannot leak data.

### Rule shape (all rules deny by default; reads/writes only granted where explicitly listed)

**`profiles/{userId}`**
- `read`: signed-in user where `request.auth.uid == userId`, OR signed-in user with `role == "admin"` (from their own profile doc, looked up via `get()`)
- `update`: own profile only, and only on `displayName`. Role and `stripeCustomerId` are written by server-side code using a service account.

**`subscriptions/{userId}`**
- `read`: signed-in user where `request.auth.uid == userId`. No admin override needed for member-facing flows; admin checks Stripe Dashboard directly.
- `write`: blocked entirely from the client. Only the webhook (via Firebase Admin SDK with a service account) ever writes here.

**`videos/{videoId}`**
- `read`:
  - if `status == "published"` AND requester has an active subscription (looked up via `get(/databases/$(db)/documents/subscriptions/$(request.auth.uid)).data.status in ["active", "past_due", "trialing"]`), allow
  - if `youtubeVisibility == "public"` AND `status == "published"`, allow public read (Professor's Preview content)
  - admin reads everything
- `write`: admin only

**`videoProgress/{userId}/items/{videoId}`**
- `read` + `write`: signed-in user where `request.auth.uid == userId`. Nobody else.

### Server-side double-check

Security Rules protect Firestore. They do not protect the YouTube embed code or the toolkit PDF signed URL, both of which are computed in Next.js. So:

- Every protected page is a Server Component or uses a Route Handler that first calls `verifyMemberAccess(uid)` — a server-only helper that:
  1. Verifies the Firebase Auth ID token (from the cookie)
  2. Reads the `subscriptions/{uid}` doc via the Firebase Admin SDK
  3. Returns `{ok, reason}` — gate everything that follows on `ok === true`
- The YouTube video ID is read server-side and rendered into the page only inside the gated path. The full YouTube watch URL is never embedded in a non-member's HTML.
- Toolkit PDF signed URLs are minted server-side per request (short TTL — 10 minutes — see Section 7).

The combination — Security Rules at the data layer plus server gating at the app layer — is the defense-in-depth equivalent of the Postgres RLS pattern from the original spec.

---

## 4. Access control — webhook-synced subscription state, not live-polled

The honest mechanism behind "cancelled members lose access":

1. Stripe webhooks (signature-verified, idempotent) keep the local `subscriptions/{userId}` doc in sync within seconds of any change.
2. App logic and Security Rules read the **local** Firestore doc — fast, no Stripe API call on every page.
3. A scheduled reconciliation job (daily Cloud Function, plus on-demand if something looks off) re-pulls from Stripe to catch any missed webhook.
4. Stripe remains the source of truth; the local Firestore doc is the synced fast-read copy.

Effect: cancel in Stripe → webhook fires → local status flips → next protected request is denied. Near-instant, and robust against webhook delivery hiccups.

> Note: the client-facing `how-it-works.html` simplifies this to "checks Stripe live on every page." The real design is webhook sync plus reconciliation — same outcome, more reliable than hammering Stripe's API on every load.

---

## 5. Stripe integration

- **Checkout:** Stripe-hosted Checkout Session (subscription mode). Card data never touches our servers.
- **Cancellation / payment update:** Stripe-hosted Customer Portal.
- **Webhook events handled:** `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.paid`, `invoice.payment_failed`.
- **Webhook hardening:**
  - Verify the `stripe-signature` header against the webhook secret on every call
  - Idempotency: record processed event IDs in a `processedWebhookEvents/{eventId}` collection; skip duplicates
  - Out-of-order safety: trust the event payload's `current_period_end` rather than assuming order
- **Product reuse:** reuse her existing $29 product/price so billing isn't duplicated or broken at cutover.
- **Webhook handler:** Next.js Route Handler at `/api/stripe/webhook`, using the Firebase Admin SDK with a service account — never the client SDK.

---

## 6. Video security — the honest YouTube model

Unlisted YouTube replaces the earlier Vimeo Pro plan. The trade-offs are different and have to be stated plainly:

**What Vimeo Pro would have given us (and we don't have):**
- Domain-locked embeds — embed code only plays on `primroseknowledgestudio.com`
- Embed-code-only access — no public watch URL exists

**What unlisted YouTube gives us:**
- The video is not searchable, not in YouTube's algorithm, and not visible on Primrose's channel page
- Anyone with the watch URL can view it (no domain restriction)
- Embed code is identical to public videos — the only thing protecting access is the URL itself

**How we protect what we can:**

1. **The video ID never appears in non-member HTML.** Server-side gate (Section 3) is the primary defence — if a non-member loads `/video/[slug]`, they get redirected before the embed is rendered. The browser never sees the YouTube video ID.
2. **Embed parameters minimise leakage off the player.** We embed with `rel=0` (no related videos from other channels), `modestbranding=1` (hide YouTube logo when paused), `playsinline=1`, and we host the iframe inside our own player chrome so the YouTube watch link doesn't appear next to the video.
3. **Sharing tolerance is documented.** Agreement Section A.8 records Primrose's acknowledgement: a member who copies the YouTube URL and shares it externally enables anyone with that URL to watch. This is the limit of unlisted YouTube; it cannot be engineered around without a paid embed-locked platform.
4. **Rotation path.** If a video leaks at scale, the path is: replace the YouTube ID on the unlisted video (re-upload), update `videos/{videoId}.youtubeVideoId` in Firestore, the old URL is dead.

**For Professor's Preview content (public YouTube channel):**
- These videos are intentionally public — they live on her main channel as marketing
- `youtubeVisibility: "public"` in the video doc lets the library show them outside the paywall
- Same iframe player template, no server gating required for these specific videos

---

## 7. File storage (toolkit PDFs)

- Firebase Storage, **private** bucket. No public read rule.
- Download URLs are short-lived signed URLs generated server-side via the Firebase Admin SDK, only for active subscribers.
- Default TTL: 10 minutes. Long enough to start a download, short enough that a shared link expires before it spreads.
- No public bucket, no permanent URLs.
- Upload flow: admin uploads through the admin form → server route writes the file to Storage under `toolkits/{videoId}/{filename}.pdf` and stores the path in `videos/{videoId}.toolkitPdfPath`.

---

## 8. Admin security

- `role = "admin"` set on Primrose's profile only. Set manually via Firebase Console at project setup; not user-mutable.
- Admin routes (`/admin/*`) protected by Next.js middleware checking the role server-side from the user's profile doc.
- Firestore Security Rules independently restrict all write operations on `videos` to admin role — a second lock behind the middleware.
- Admin form uses CSRF tokens; webhook routes use Stripe signature verification.

---

## 9. Secrets management

- All keys in Vercel environment variables, never in the client bundle.
- **Server-side only:** Stripe secret key, Stripe webhook secret, Firebase Admin SDK service account JSON, Resend API key.
- **Client-safe (per Firebase's documented model):** Firebase project config (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`). These are not secret — security comes from Security Rules and server-side checks, not from key obscurity.

---

## 10. Email — transactional welcome only

- Resend for transactional email.
- Triggered by the Stripe webhook on `checkout.session.completed`.
- Single template; not a nurture sequence (out of scope per CLAUDE.md).
- DNS records (SPF, DKIM) configured on her domain during launch to maintain deliverability.

---

## 11. Where an external health check adds the most value

Recommended: one focused security review near the **end of week 2 / start of week 3** — after the core is built, before we load real content and cut over DNS. Scope:

1. **Firestore Security Rules audit** — simulate the queries an attacker would attempt; verify no path returns data it shouldn't. The single highest-risk area.
2. **Stripe + access-control review** — can anyone reach a video without an active subscription? Webhook signature and idempotency check.
3. **Auth / session review** — can a session be hijacked? Can a member escalate to admin? Are ID tokens verified server-side on every protected request?
4. **YouTube exposure review** — is the video ID present in any non-member HTML or RSC payload? Are embed parameters applied consistently?

Roughly 3–5 hours of an experienced developer's time. This is the highest-leverage place to spend on outside eyes, because money, access, and member data all converge there.
