# Kickoff Checklist, Primrose Knowledge Studio

**Status:** Build in progress. Contract signed. Awaiting $2,250 kickoff deposit before final stages. Visual direction LOCKED. Scaffold + design system + Porch + Firebase/Stripe wiring pushed to repo. See [DECISIONS.md](./DECISIONS.md) for the full timeline.

---

## Where we are right now

| Step | Status |
|---|---|
| Contract signed by both parties | Done |
| Visual direction locked (Pillar Stack) | Done |
| Scaffold pushed to repo (Next.js 16, Tailwind v4, design tokens baked) | Done |
| The Porch (sales page) skeleton with full sections | Done |
| Firebase + Stripe + Auth wiring (compiled, awaiting env vars) | Done |
| Firestore Security Rules drafted (`firestore.rules`) | Done |
| Vercel connected to GitHub repo | Done |
| Kickoff deposit ($2,250) received | Pending |
| Firebase project created under Primrose's Google account | **Blocker** |
| `.env.local` populated with real Firebase + Stripe + Resend keys | Blocked on Firebase project |
| Real Primrose headshot received | Pending |
| Brand assets folder path received | Pending |

---

## What we need from Primrose to unblock the next step

The single biggest blocker right now is **Firebase project creation under her Google account**. Everything else (auth, dashboard, video gating, admin panel) is wired and waiting for keys.

### Firebase setup (her side, ~10 minutes, no code)

1. [ ] Sign in to [console.firebase.google.com](https://console.firebase.google.com) with her Google account
2. [ ] Create a new project called `primrose-knowledge-studio` (or similar)
3. [ ] **Authentication** → enable the "Email link (passwordless sign-in)" provider
4. [ ] **Firestore** → create database in *production mode*, region: `nam5` (US multi-region) or `northamerica-northeast1` (Montreal) for Canadian latency
5. [ ] **Storage** → create the default bucket
6. [ ] **Project Settings → General** → register a new Web App; copy the Firebase config object, these go into the `NEXT_PUBLIC_FIREBASE_*` env vars
7. [ ] **Project Settings → Service Accounts** → generate a new private key (JSON download), these credentials populate `FIREBASE_ADMIN_*` env vars
8. [ ] Add Jitakshi as an Owner-role collaborator on the Firebase project so we can administer it during the build

### Stripe (her side)

9. [ ] Confirm the existing $29/month product + price are still live in her Stripe account, and share the price ID (starts with `price_...`)
10. [ ] Add Jitakshi as a Developer or Read-only collaborator in Stripe → Team
11. [ ] In Stripe → Webhooks, add an endpoint pointing to the eventual production URL `https://<domain>/api/stripe/webhook`, sharing the webhook signing secret with Jitakshi

### Content + brand (her side, any time before launch)

12. [ ] High-resolution headshot for the Porch hero panel and member dashboard
13. [ ] Bio + Bar credentials text for the About section
14. [ ] First 3–5 unlisted YouTube videos uploaded to her channel (video IDs we plug into Firestore)
15. [ ] Toolkit PDFs (one per video)
16. [ ] Approval pass on the Porch copy I drafted (currently placeholder in the spirit of plain-English-Canadian-Gen-Z, she gets final say on every word)

---

## What we need from Jitakshi (Primrose-account access)

- [x] GoDaddy (domain), received
- [ ] **Resend**, set up a Resend account under her email (or his) and verify the `primroseknowledgestudio.com` sending domain (SPF + DKIM DNS records)
- [ ] **Vercel**, confirm the GitHub repo is connected (per his confirmation this is done)
- [ ] Optionally: a `.env.local` template with the env vars he can drop into the repo once Firebase/Stripe/Resend keys are available

---

## How the env vars flow into the build

The repo has a `.env.example` documenting every key needed. Once the values are in `.env.local` (gitignored), the following routes start working end-to-end:

- `/login` → magic-link sign-in
- `/api/auth/session` → ID token exchange for HTTP-only session cookie
- `/api/stripe/checkout` → Stripe-hosted Checkout Session
- `/api/stripe/webhook` → Stripe → Firestore subscription sync (idempotent, signature-verified)
- `/dashboard`, `/library/[pillar]`, `/video/[slug]`, `/admin` → become gated by the proxy + `verifyMemberAccess` helper

Until then, the routes still build cleanly, they just throw at runtime when called because the env vars aren't there yet. This is intentional: the architecture is committed and ready, so the moment Firebase exists we plug in keys and the platform comes alive.

---

## The remaining 3-week build plan (post-deposit, post-Firebase)

### Week 1, Foundation (mostly done; finishing the auth flow)
- [x] Scaffold + design system + Porch
- [x] Firebase + Stripe wiring committed
- [ ] Firebase project exists; env vars populated
- [ ] `/login/callback` page completes the magic-link sign-in flow end-to-end
- [ ] `/welcome` page handles post-Stripe-checkout magic-link trigger

### Week 2, The product core
- [ ] Member dashboard (the Fortress), five-pillar nav, Newest Addition feature card, resume-where-you-left-off
- [ ] Video viewing template, unlisted YouTube embed, toolkit PDF download via signed URL, prev/next within a pillar
- [ ] Admin panel, add/edit/delete videos, set Featured, upload toolkit PDFs
- [ ] Welcome email via Resend

### Week 3, Polish + launch
- [ ] Run [SMOKE-TESTS.md](./SMOKE-TESTS.md) end-to-end
- [ ] Load Primrose's founding content
- [ ] Preview review with Primrose
- [ ] DNS cutover (GoDaddy → Vercel)
- [ ] Record the admin playbook (Loom)
- [ ] Open the 14-day support window

---

## Open risks to clear early

- **Live subscribers on the existing site?** If she has any current paying members, their Stripe subscriptions must be preserved through cutover. Confirm the count before launch. If zero, the rebuild is clean.
- **Stripe product reuse.** Reuse her existing $29 product/price so billing isn't duplicated or broken at cutover.
- **Zero downtime.** Build on the Vercel preview URL; flip DNS only after she signs off. Current site stays live until the cutover.
- **YouTube unlisted leakage tolerance.** Acknowledged in Agreement Section A.8, a member sharing a video URL externally makes it viewable to anyone with the link. Documented limitation, not a bug.
