# Primrose Knowledge Studio

A subscription video library for Canadian Gen Z built on the Five Pillars of Wellness — taught by a working lawyer in plain English.

Repo for the Phase 1 platform refinement engagement ($8,500 CAD, 3-week build) between **Primrose Watson** (Halifax tax lawyer, client) and **Jitakshi** (contractor).

---

## Project context

Read these in order at the start of any session:

1. [`CLAUDE.md`](./CLAUDE.md) — build context, client constraints, scope, brand language
2. [`DECISIONS.md`](./DECISIONS.md) — running log of project decisions (most recent at top)
3. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Firebase + YouTube technical spec
4. [`SMOKE-TESTS.md`](./SMOKE-TESTS.md) — pre-production checklist (every key flow, every push)
5. [`design-system.html`](./design-system.html) — locked visual direction (Pillar Stack)
6. [`AGENTS.md`](./AGENTS.md) — Next.js 16 working notes

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind v4 (CSS-first config in `src/app/globals.css`)
- **Data + Auth + Storage:** Firebase (Firestore, Auth magic-link, Storage)
- **Payments:** Stripe (Checkout + Customer Portal + webhook sync)
- **Video:** Unlisted YouTube (paid library) + public YouTube (Professor's Preview)
- **Email:** Resend (transactional only)
- **Hosting:** Vercel

---

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The home page is the Porch (sales) skeleton in the locked Pillar Stack design.

### Environment variables needed

Not yet wired. See `ARCHITECTURE.md` for the Stripe + Firebase + Resend keys required before the first protected route can be tested. A `.env.example` will be added when Firebase initialises.

---

## Repo layout (post-scaffold)

```
.
├── src/app/              Next.js App Router pages
│   ├── layout.tsx        Root layout — fonts wired
│   ├── page.tsx          The Porch (sales home)
│   └── globals.css       Tailwind v4 + locked design tokens
├── public/               Static assets
├── CLAUDE.md             Build context (auto-loaded by Claude Code)
├── AGENTS.md             Next.js 16 working notes
├── ARCHITECTURE.md       Technical spec
├── DECISIONS.md          Decision log
├── SMOKE-TESTS.md        Pre-production checklist
├── KICKOFF.md            Kickoff checklist
├── design-system.html    Locked visual direction reference
└── visual-direction*.html  Historical design exploration (kept for trail)
```

Client materials (Agreement PDFs, Invoice, source docs from Primrose) sit at root locally but are gitignored — they never get committed.

---

## Build status

This is the post-scaffold baseline. Working on Phase 1 (see `CLAUDE.md` Scope section). Routes not yet implemented: `/dashboard`, `/library/[pillar]`, `/video/[slug]`, `/admin`, `/api/stripe/webhook`. Firebase project not yet initialised. Vercel project not yet connected.
