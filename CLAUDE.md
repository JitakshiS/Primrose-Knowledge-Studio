# Primrose Knowledge Studio — Build Context

@AGENTS.md

**At the start of every session, also read:**
- `/Users/jitakshi/Jitsy Files/00-Playbook/PLAYBOOK.md` (global standards for all client work)
- `./DECISIONS.md` (running log of project choices)
- `./design-system.html` (locked visual direction — Pillar Stack)
- `./ARCHITECTURE.md` (Firebase + YouTube spec)

## Stack note (post-scaffold)

Next.js **16.2.9** + React **19** + Tailwind **v4** (CSS-first config, no JS config file — design tokens live in `src/app/globals.css` under the `@theme inline` block). Firebase, Stripe, and Resend SDKs are in `package.json` but not yet wired. Fonts via `next/font/google`: Outfit (display), Inter (body), JetBrains Mono (metadata). See `AGENTS.md` — Next.js 16 differs from prior versions; check `node_modules/next/dist/docs/` before writing route handlers, server components, or middleware patterns.

---

## Client

Primrose Watson, tax lawyer based in Halifax, Nova Scotia. Repeat client — recently completed `primrosetax.ca` revamp for $5,500 CAD. Non-technical. Currently in Arlan Hamilton's "Authority X Pro" coaching program.

Operating constraints:
- Bar association code of conduct applies; content must be framed as legal information, not legal advice
- Avoid the words "expert," "specialist," "expertise" in deliverables (carryover rule from the tax site)
- All disclaimers about "information not advice" are non-negotiable

---

## What we are building

Refinement of the existing Primrose Knowledge Studio at `primroseknowledgestudio.com` — a subscription video learning platform for Canadian Gen Z built on the "Five Pillars of Wellness."

Current build was done by Primrose herself using Claude Code during a Volta sprint. Stripe is connected and working at $29/month subscription. This is enhancement and product-grade refinement, not a from-scratch rebuild.

---

## Scope (Phase 1)

1. Refined sales / home page (the "Porch") — converts cold TikTok and warm YouTube traffic
2. Member dashboard (the "Fortress") with 5-Pillar navigation and "Newest Addition" feature slot
3. Video viewing template — unlisted YouTube embed, downloadable toolkit PDF section, prev/next within a pillar
4. Checkout and login pages
5. Admin panel for adding videos and toolkit PDFs (Primrose-only access)
6. Subscription gating tied to Stripe — only paying members see the Fortress
7. Full brand system applied across the site
8. Transactional welcome email triggered on subscription

## Out of scope (Phase 2 conversations)

- Email welcome *sequence* beyond one transactional welcome email
- Analytics dashboards
- Community features
- Referral / affiliate system
- Multi-tier pricing
- À-la-carte video purchases (model is subscription-only — confirmed against all three source documents)

---

## Tech stack

- **Frontend / framework:** Next.js (App Router), TypeScript, Tailwind. Built fresh — we do not carry over her Vite/React sprint build.
- **Hosting:** Vercel
- **Database + Auth + File storage:** Firebase (Firestore + Firebase Auth magic-link + Firebase Storage). Access enforced via Security Rules + server-side checks. (Note: earlier docs mentioned Supabase; that decision was reversed in conversation, see DECISIONS.md 2026-06-22.)
- **Payments:** Stripe (her existing $29 product reused) + webhook into Firestore for subscription status sync
- **Video hosting:** Unlisted YouTube for the paid library; public YouTube channel for the 5-minute "Professor's Preview" content per Arlan's playbook. (Note: earlier docs mentioned Vimeo Pro; Primrose chose not to pay for it, see DECISIONS.md 2026-06-22.)
- **Transactional email:** Resend
- **Repo:** https://github.com/JitakshiS/Primrose-Knowledge-Studio.git

---

## The 5 Pillars of Wellness (content taxonomy)

1. Workplace Wellness
2. Financial Wellness
3. Career Wellness
4. Emotional Wellness (recognizing trauma and accessing support)
5. Personal Safety

All video content is organised under these five. The dashboard, library, and curriculum navigation are built around this taxonomy.

---

## Brand language

**Design direction (LOCKED 2026-06-29): Pillar Stack.** A colour-led identity system where the five pillars of wellness *are* the brand. Off-white paper, near-black ink, and five carefully curated pillar colours that double as the navigation and the visual identity. Designed for TikTok-first cold traffic — the five-colour stack travels across social channels as a recognisable mark. See `./design-system.html` for the full spec; it gets baked directly into Tailwind config.

- **Palette (locked):** Paper #F8F6F1, Card #FFFEFA, Ink #0F0F0F, Stone #E7E3D8, Muted #5A5A55
- **Pillar colours (locked):** Workplace = Cobalt #2640D9, Financial = Forest #1F5C45, Career = Clay #DC5B3F, Emotional = Plum #7A4B6E, Personal Safety = Garnet #7C3036
- **Type (locked):** Outfit (900 default) for display, Inter (400 + 600) for body, JetBrains Mono for metadata and labels
- **Radii:** 8 / 12 / 16 / 24px. 16px is the default for cards, images, video frames (the "Jitakshi 16px rule")
- **Audience:** Canadian Gen Z and millennials paying $29/mo for legal and financial knowledge that affects their lives. Cold traffic from TikTok and Instagram — the brand has to punch in a 0.4-second scroll
- **Voice:** plain language, confident, slight wit, no legalese, no influencer-babe energy. Substack-meets-Maven-meets-something-warmer
- **Visuals:** product-led not magazine-led — feels like an app you'd subscribe to. The 5-dot colour stack is the brand mark. Real photography of Primrose anchors trust. Asymmetric layouts OK, monospace details where they add flavour
- **What it explicitly is not:** editorial / Substack visual style (the tax site already occupies that territory). Generic SaaS template look. Stock AI gradient palettes. Centred "trust badges" strips. Bootstrap-default spacing.
- **Strategic concept retained:** "The Fortress & The Porch" (private member area vs. public sales page) and "Professor for the People" (brand positioning)

The "Dark Academia meets Modern Digital Wellness" framing from Primrose's original handoff is set aside. She granted design latitude in writing ("I leave the design elements to your expertise, we don't have to stick to what Arlan says for design").

---

## Audience

- Canadian Gen Z and younger millennials
- "TikTok / Reel visitor" (cold traffic) — 5 seconds to hook
- "YouTube visitor" (warm traffic) — looking for validation of the decision to subscribe

---

## Pricing and timeline

- **Fee:** $8,500 CAD
- **Split (revised 2026-06-14):** $2,250 kickoff + $2,250 at delivery to staging/live + four monthly installments of $1,000 (days 30, 60, 90, 120 post-delivery)
- **Timeline:** 3 weeks of build, plus 14-day post-launch bug fix window beginning at delivery to staging or live (whichever is earlier)
- **Inclusion:** All eight scope items, brand system, and a single transactional welcome email
- **Handover gate:** Full source code transfer and account-ownership handover (per Section 7.5 of the Agreement) holds until all six payments are received

---

## Source documents (in this folder)

- `Primroses_Playbook_by_Arlan - Final.pdf` — 90-day commercial playbook from Arlan
- `The Busines Plan and Operating System - Primrose Knowledge Studio.pdf` — business plan, Knowledge Studio OS™, sample 5-min and 15-min video scripts
- `Primrose Knowledge Studio Web Design Handoff.docx` — the actual design brief from Primrose; this is the closest thing to an SOW from her side

---

## Communication norms with Primrose

- Plain language always; no developer jargon
- "Members," not "users" or "customers"
- "Paywall" or "members-only access," not "subscription gating"
- The 5 Pillars are referred to by name; she uses her own framing
- Avoid the words "expert," "specialist," "expertise"
- Keep tone warm but business-grade; she is a senior professional, not a peer-in-training

---

## Quality bar

This is a paid platform build, not a prototype. See `/Users/jitakshi/Jitsy Files/00-Playbook/PLAYBOOK.md` for the full Definition of Done, smoke test discipline, and handoff requirements. Every change runs through the project's `SMOKE-TESTS.md` before shipping.
