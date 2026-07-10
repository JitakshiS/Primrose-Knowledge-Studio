# Decisions Log, Primrose Knowledge Studio

Running record of project decisions. Most recent at the top. Format: date, decision, reason.

Claude updates this file whenever a meaningful choice is made or revised. Read at the start of every session.

---

## 2026-07-10, Client CONFIRMED Direction A: Pillar Stack

Primrose reviewed both directions on a video call (moodboard deck: A = Pillar Stack, the built platform; B = Searchlight, the immersive exploration) and chose **Pillar Stack**. The locked 2026-06-29 design direction stands, now with explicit client sign-off. No rework required; the existing build on `main` is the confirmed product.

**What this settles:**
- The live Pillar Stack build (Porch, Fortress, video viewer, pillar library, admin, account, error/loading states) continues as-is.
- Instrument Sans stays exploration-only. Production type remains Outfit + Inter + Geist/JetBrains Mono per the locked system.
- The Searchlight exploration files (`design-exploration-*.html`, `Primrose-Studio-Preview/`) are archived design-trail. Do not port their styling.

**Optional enhancements surfaced during exploration, direction-agnostic, to offer separately (not styling, all UX/trust devices):**
- "Last reviewed" dates on videos (strong trust device for legal content; creates a maintenance obligation Primrose must agree to)
- Cancellation steps printed beside pricing ("the exit on the label")
- Full catalogue visible before paying
- The interactive "ask a question, get answered" hero search

**Still pending to unblock the build finish:** kickoff payment, Firebase project creation (KICKOFF.md checklist), Primrose's headshot, and her copy-approval pass.

---

## 2026-06-29 (later), Next.js scaffold complete; design system baked into Tailwind

Scaffolded Next.js 16 + React 19 + Tailwind v4 (CSS-first) + TypeScript at the project root via `create-next-app`. Notes worth remembering:

- **npm naming restriction** blocked scaffolding into a folder named `Primrose-Knowledge-Studio` (capital letters disallowed in npm package names). Worked around it by scaffolding into a temporary `scaffold/` subfolder, moving the files up, and explicitly setting `package.json:name = "primrose-knowledge-studio"`.
- **Folder renamed (by Jitakshi)** from `Primrose Knowledge Studio` to `Primrose-Knowledge-Studio`, kebab-case, no spaces. Cleans up dev tool friction at the path level.
- **Tailwind v4 is CSS-first**, no `tailwind.config.js` exists. Design tokens live in `src/app/globals.css` under the `@theme inline` block. The Pillar Stack palette is now baked in: `bg-workplace`, `bg-financial`, `bg-career`, `bg-emotional`, `bg-safety`, plus `bg-paper`, `bg-card`, `bg-stone`, `text-ink`, `text-muted`. `font-display`, `font-sans`, `font-mono` are mapped to Outfit / Inter / JetBrains Mono via `next/font/google`.
- **Next.js 16 caveat captured.** `AGENTS.md` (auto-added by create-next-app, kept) warns that v16 has breaking changes, consult `node_modules/next/dist/docs/` before writing route handlers / middleware / server components. `CLAUDE.md` now imports `@AGENTS.md` so this is loaded at session start.
- **Demo SVGs removed** from `public/` (Next.js / Vercel logo). Public folder is empty until real brand assets land.
- **Demo content replaced.** `src/app/page.tsx` is now the Porch sales-page skeleton in the locked Pillar Stack design, five-pillar grid, gradient headline, photo-placeholder split panel for Primrose, footer with the 5-dot wordmark. Stubs created for `/dashboard`, `/library/[pillar]`, `/video/[slug]`, `/admin` so the route structure is intentional from commit 1.
- **`.env.example` added** documenting the Firebase, Stripe, and Resend env vars needed before Firebase wiring.
- **Dependencies added (not yet exercised):** `firebase`, `firebase-admin`, `stripe`, `@stripe/stripe-js`, `resend`. `npm install` clean; 10 moderate transitive vulnerabilities flagged for later audit.

Outstanding before the first deploy: Firebase project init, env vars populated locally, Vercel + GitHub connection, Stripe webhook URL configured.

---

## 2026-06-29, Visual direction LOCKED: Pillar Stack with Garnet for Personal Safety

**Direction locked: Pillar Stack.** Confirmed by Jitakshi after a two-round visual exploration (v1: Studio + Channel; v2: Late Night + Pillar Stack against Channel). The strategic lever that decided it: TikTok-first cold traffic. The five-colour stack is the most recognisable identity move across social channels, a brand mark that survives a 0.4-second scroll and compounds across IG, TikTok, YouTube thumbnails, and the platform itself. Reasoning recorded in `visual-direction-v2.html`.

**Pillar colours locked:**
- 01 Workplace → Cobalt #2640D9 (structural, professional, cool)
- 02 Financial → Forest #1F5C45 (grounded, growth, considered)
- 03 Career → Clay #DC5B3F (warm, alive, decisive)
- 04 Emotional → Plum #7A4B6E (dusty, inward, soft)
- 05 Personal Safety → **Garnet #7C3036** (resolved from honey/yellow, honey read sunny, wrong register for safety material; Garnet is a jewel-tone deep red that reads protective and serious without alarming)

**Type locked:** Outfit (display, 900 default) + Inter (body, 400 + 600) + JetBrains Mono (metadata, labels, timestamps). All available on Google Fonts.

**Neutrals locked:** Paper #F8F6F1, Card #FFFEFA, Stone #E7E3D8, Ink #0F0F0F, Muted #5A5A55.

**Radii locked:** 8 / 12 / 16 / 24px scale; 16px the default for cards, images, and video frames.

**Reference doc:** `design-system.html` is the locked spec. Tailwind config gets these tokens baked in at scaffolding time. CLAUDE.md updated to reference it at session start.

**Historical artifacts:** `visual-direction.html` (v1: Studio + Channel) and `visual-direction-v2.html` (v2: Late Night + Pillar Stack) remain for reference, they document the design-decision trail.

---

## 2026-06-22, Build phase begins; stack and direction changes since last spec write

Several meaningful choices made in conversation since the last spec update, formalising them here so future sessions don't drift back to the older direction.

**Stack: Firebase, not Supabase.** Confirmed by Jitakshi. We use Firebase Auth (magic-link) + Firestore (subscriptions, videos, profiles) + Firebase Storage (toolkit PDFs). The reason for the switch from our earlier Supabase choice is preference and prior experience, not a re-litigation of the technical fit. The original Supabase reasoning (relational data + RLS) was sound; Firebase requires us to encode access rules in Security Rules + server-side checks instead of Postgres RLS, which is achievable but a different shape. `ARCHITECTURE.md` will be rewritten in the Firebase shape before any code is committed.

**Video hosting: Unlisted YouTube, not Vimeo Pro.** Primrose chose not to pay for Vimeo Advanced. YouTube unlisted is the practical alternative, free, embeddable, and consistent with the public 5-min "Professor's Preview" channel from Arlan's playbook. The Section A.8 acknowledgment she added to the contract ("unlisted video URLs are accessible to anyone holding the link...") covers the protection. The video player template embeds the YouTube iframe instead of Vimeo.

**Payment structure: $2,250 kickoff + $2,250 delivery + 4× $1,000 monthly = $8,500.** Changed from the original 50/25/25 split at her request for cash-flow reasons. Full handover (source code transfer, account ownership per Section 7.5 of the Agreement) holds until all six payments are received.

**Design direction: NOT editorial, NOT carry-over from the tax site, audience-first for Gen Z and millennials.** Jitakshi's explicit call. The "Dark Academia meets Modern Digital Wellness" framing from Primrose's original handoff is set aside, she granted design latitude and the tax site already occupies the editorial-warm territory. Knowledge Studio needs its own visual identity that reads modern, product-led, confident, and clearly not made by an AI template. Voice as much as visuals: plain language, slight wit, no legalese, no influencer-babe energy. Substack-meets-Maven-meets-something-warmer, but distinctly its own thing. Visual direction proposal comes after Jitakshi shares design references.

**GitHub repo set up by Jitakshi:** `https://github.com/JitakshiS/Primrose-Knowledge-Studio.git`. We'll clone and scaffold the Next.js app into the existing repo.

**Contract signed and kickoff payment status:** Contract is signed by both parties. Build starts when the $2,250 kickoff deposit lands. As of this entry, the deposit has been requested and Jitakshi is waiting for it.

---

## 2026-05-27, Project approved, kickoff decisions

**Client said yes.** Build begins once SOW + contract are signed and the 50% deposit ($4,250 CAD) is received.

**Rebuild from scratch, not refactor.** Her Volta-sprint Claude Code build was a learning MVP. We build the platform fresh on a clean architecture, pulling content, copy, structure, and the existing Stripe product setup from the current site. Faster and cleaner than untangling the first build.

**Ownership model: infrastructure under her accounts, we collaborate.** Vercel, Supabase, Stripe, Vimeo, and the domain all stay in her name with us added as collaborators or team members. She owns her business infrastructure, billing goes to her directly, and nothing is held hostage if the engagement ever ends.

**GoDaddy access shared.** Needed at launch for the DNS cutover from the current site to the new Vercel deployment. Build happens on a preview URL first; DNS flips only after she signs off, so zero downtime.

**Open risk to clear before build: live subscribers.** Confirm whether she has any current paying members. If yes, their Stripe subscriptions must be preserved through the cutover. If zero, the rebuild is clean.

**Paperwork: Jitakshi handles the SOW himself (has a draft); invoice already sent.** Claude's job is the technical foundation.

---

## 2026-06-06 (afternoon), Definitions removed; page numbers verified

- **Definitions section removed entirely** per Jitakshi. Capitalized terms in the body (Confidential Information, Personal Information, Intellectual Property Rights, Client Materials, Contractor Materials, Site, Services, Business Day) take their meaning from context. Reasonable for a small-business contract.
- **TOC updated**, Definitions entry removed, all page numbers shifted down by 1.
- **Page numbers verified** at bottom-right of every page via screenshot. Format "1 / 22", monospace, color tightened to `--muted` for visibility.
- **Total: 22 pages** (Cover, TOC, then 12 Part A pages, Part B Divider, 7 Schedule A pages, Signature).

---

## 2026-06-06, Agreement polish: TOC, page numbers, combined pages, trimmed definitions

- **Table of Contents** added as sheet 2 (between cover and Section 01). Lists Part A sections, Part B sections, and Signatures with page numbers. Combined sections shown as paired entries (e.g., "02–03").
- **Page numbers** added to every sheet via CSS counter, "Page X of 23" in mono font, bottom-right corner.
- **Combined sections** with subtle horizontal rule + 28px padding between them, 02+03, 04+05, 08+09, 12+13. Second section's title in each pair drops to 22px for visual hierarchy.
- **Definitions trimmed** from 15 to 8 essential terms (Business Day, Confidential Information, Personal Information, Intellectual Property Rights, Client Materials, Contractor Materials, Services, Site). The self-evident terms (Agreement, Client, Contractor, Effective Date, Fees, Schedule A, Deliverables) take their meaning from context per a note in the section intro.
- **Date prepared** updated to June 6, 2026.
- **Total: 23 pages** (was 22).

---

## 2026-06-05, Agreement restructured to MSA + Schedule pattern

Contract rewritten as a proper Master Services Agreement (Part A) plus Statement of Work as Schedule A (Part B), drawn from the Practical Law Canada "Website Design and Development Agreement (Pro-Developer)" template language and its accompanying Practice Note on contractual issues.

**Structure: 26 pages, one section per page.**
- Cover + Recitals (1)
- Part A, General Agreement: 16 sections (sheets 2-17). Definitions, Engagement, Project Management, Client Responsibilities, Acceptance, Fees, IP and Ownership, Confidentiality, Data Protection, Reps and Warranties, Indemnification, Limitation of Liability, Security, Term and Termination, Force Majeure, General Provisions and Governing Law.
- Part B Divider (sheet 18)
- Schedule A, Statement of Work: sections A.1 through A.8 (sheets 19-25). Project Overview, Scope, Timeline, Fees, Third-Party Tools, Access and Ownership, Project Boundaries, Operational Specifics.
- Signature page (sheet 26).

**One signature block** at the end covering both Parts.

**Reusability:** The General Agreement (Part A) is project-agnostic. For future website or platform engagements, only Schedule A needs to be redrafted; Part A copy-pastes intact.

**Payment milestone labels** updated to "Deposit / Mid-Project / Final" per Jitakshi's preference (away from "First/Second/Third installment").

**Design preserved:** Inter + JetBrains Mono, monospace section numbers and labels, blue scope cards, cream boundary cards, payment table, signature block, all consistent across both Parts.

Backup of prior v2 (11-page version) remains: `Agreement - Primrose Knowledge Studio original.pdf`.

---

## 2026-05-30, Contract v2 applied (per `files (1)/contract-changes.md`)

Agreement revised to 11 pages (one section per page). Changes applied: Ownership and Handover rewritten and promoted to its own Section 03; Section 07 (Liability) gets the AI-paragraph clarification; new Section 08 "Additional Terms" holds Confidentiality, Contractor Indemnity, Security Incidents, and Portfolio; Section 09 Final Payment gets the support-window non-waiver sentence; Section 04 post-launch support clock starts at delivery to staging-or-live (whichever is earlier); Section 10 adds milestone-value definition and replaces Refund Calculation with for-convenience language; Section 11 adds the General/Boilerplate clause. Cross-references throughout updated for the new numbering.

**Not applied (flagged for decision):** the optional "widen feedback window from 48h to 3 business days" change. Awaiting Jitakshi's call.

Backup: `Agreement - Primrose Knowledge Studio original.pdf` kept in folder.

---

## 2026-05-27, Technical foundation (full spec in ARCHITECTURE.md)

**Framework: Next.js (App Router), not a plain React SPA.** Security needs server-side gating, we never send a video embed to a browser we haven't verified. Her current build is a Vite SPA; the rebuild moves to Next.js for server components, middleware, and API routes.

**Access control: webhook-synced subscription state.** Signature-verified, idempotent Stripe webhooks keep a local `subscriptions` table synced. App logic and RLS read the local state for speed; a periodic reconciliation catches missed webhooks. Stripe stays the source of truth. (Client-facing doc simplifies this to "checks Stripe live"; real mechanism is webhook sync + reconciliation, same effect.)

**Database: Supabase with Row-Level Security on every table.** Access enforced at the database layer, not just the app.

**Supabase Pro from launch, resolves the free-tier pausing issue.** Free Supabase projects pause after 7 days of inactivity (this bit us on a prior project, where we switched to Firebase). Fine during active development, unacceptable for a live paid product. We develop on free, then upgrade to Pro (~CAD 35/mo) before launch so the database never pauses. Chose Supabase over Firebase here because the relational schema, RLS, and SQL fit this product far better than Firestore's NoSQL, and a paid product justifies the Pro tier, which was the only reason Firebase won last time.

**External health check planned** for end of week 2 / start of week 3: scoped security review (RLS audit, Stripe/access-control review, auth/session review) by an experienced dev before content load and cutover.

---

## 2026-05-24, Initial scoping decisions

**Pricing: $8,500 CAD, 50/25/25 split, 3-week delivery.**
Reason: stepped up from $5,500 of the tax site because the product layer (auth, admin, gated library, video template) is real new work. Held below $10K because we reuse her existing Claude Code foundation, Stripe is already wired, and this is a repeat-client engagement where relationship value is real.

**Video hosting: Vimeo Pro for the paid library, YouTube public for the 5-minute preview channel.**
Reason: domain-locked embeds on Vimeo are meaningfully more secure than YouTube unlisted (which is "obscurity via URL"). Vimeo's clean player fits a lawyer-led paid product better than YouTube's branded player. The dual-platform story matches Arlan's playbook (public previews on YouTube, paid library private).
Cost to Primrose: ~CAD 70/month Vimeo Pro, on top of project fee.

**Subscription model: monthly recurring $29 with full library access.**
Confirmed against all three source documents. No à-la-carte video purchases. The model is "subscribe once, watch everything as long as you're a member." If Primrose ever wants pay-per-video on top, that's a Phase 2 conversation.

**Admin scope: single form, no separate member management.**
Reason: Stripe Dashboard already provides the best member list, MRR, churn, and customer view. Building our own copy is wasted work. The admin will link out to Stripe Dashboard from a sidebar. Phase 1 admin = upload form (title, pillar, description, Vimeo ID, optional toolkit PDF, draft/publish toggle) + ability to edit, delete, and feature as "Newest Addition."

**Auth: Supabase Auth with magic link (passwordless).**
Reason: lowest friction for Gen Z mobile traffic; one fewer thing for Primrose to support; standard pattern that Supabase handles natively.

**Welcome email: single transactional, included in Phase 1.**
Reason: half a day of work, meaningful experience win. Multi-step nurture sequences and weekly digests are Phase 2.

**Quality protocol: full playbook applies.**
14-day post-launch bug fix window included in fee. Smoke test checklist mandatory before any production push. Decision log maintained throughout. Preview deployments shared with Primrose before cutover.

---

## Open questions for the design call

- Serif vs sans headlines (handoff specifies serif; Jitakshi's default is Inter sans only; worth interrogating against the Gen Z audience)
- Specific palette within "Dark Academia meets Modern Digital Wellness", burgundy-led, forest-led, or navy-led
- Hero treatment: photography of Primrose, typography-led, or hybrid
- Tone of voice for member-facing copy, formal authority versus warm professor

## Open questions for the repo review

- What does her current Claude Code build actually look like, Next.js, Vite + React Router, or something else?
- Data layer, is Supabase already in use, or is it a different store?
- How is the Stripe webhook currently wired, if at all?
- What does her current video gallery component look like, if any?
- Is there any current admin panel or upload UI?

## Open questions for Primrose

- Sounds-good-on-the-agreement: send our SOW draft alongside, or work off her template?
- Timing of design call, week of May 26 ideal
- Brand assets she has from the tax project that should carry over (headshots, logo treatments)
