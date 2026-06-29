# Kickoff Checklist — Primrose Knowledge Studio

**Status:** Client approved (2026-05-27). Build starts once SOW + contract are signed and the 50% deposit is received.

Approach: **rebuild from scratch** on a clean architecture, pulling content and the Stripe setup from the current site. See [DECISIONS.md](./DECISIONS.md).

---

## The sequence (build does not start until step 3)

1. [ ] Send SOW + contract + invoice (50% deposit = $4,250 CAD)
2. [ ] Contract signed by both parties
3. [ ] 50% deposit received → **build starts**
4. [ ] Design call booked (lock brand direction) — week 1
5. [ ] Access + content collected (see below)
6. [ ] Build through the 3-week plan
7. [ ] Preview review → DNS cutover → handover → 14-day support window

---

## What I send her

- [ ] **SOW** — scope, deliverables, timeline, out-of-scope, terms
- [ ] **Contract / agreement** — align with her template, or use ours
- [ ] **Invoice** — 50% of $8,500 = $4,250 CAD deposit

---

## What we need from her — ACCESS

Ownership model: every account stays under **her** name; we are added as collaborators. She owns her infrastructure, billing goes to her directly, nothing is held hostage.

- [x] **GoDaddy (domain)** — received. Needed at launch for DNS cutover.
- [ ] **Current website code** (her Claude Code build) — for content and structure reference, even though we rebuild fresh
- [ ] **Stripe** — collaborator access or restricted API keys. Reuse her existing $29 product so billing isn't duplicated.
- [ ] **Vimeo** — she creates / upgrades to the Advanced tier, then adds us as a team member
- [ ] **Supabase** — we create the project on her organisation for ownership
- [ ] **Vercel** — we create on her account (or ours, then transfer at handover)
- [ ] **Email service** (Resend or Loops) — we set up on her account

---

## What we need from her — CONTENT

- [ ] **Brand assets** from the tax-site project (logo, headshot, fonts, colours) for carry-over reference
- [ ] **3–5 founding videos** uploaded to Vimeo, or at minimum the topics + scripts
- [ ] **Toolkit PDFs** for each video (e.g. the F.A.C.T. cheatsheet)
- [ ] **Her bio + credentials** for the sales page
- [ ] **Sales page copy** — we draft, she approves (bar-association rules mean she holds final approval on all content)
- [ ] **Confirmation of the $29/mo price** and that the Stripe product is set up correctly

---

## Decisions to lock at the design call (week 1)

- [ ] Serif vs sans headlines (her brief says serif; default is Inter sans)
- [ ] Palette within "Dark Academia meets Modern Digital Wellness"
- [ ] Hero treatment: photography of her, typography-led, or hybrid
- [ ] Member-facing tone of voice
- [ ] Email service final pick (Resend vs Loops)

---

## The 3-week build plan

### Week 1 — Foundation + design
- Design call, lock the direction
- Set up repo, Supabase, Vercel, Stripe (test mode), email service
- Build the sales page (the Porch) with the new brand
- Magic-link login working

### Week 2 — The product core
- Member dashboard (the Fortress) with 5-Pillar navigation
- Video player template + Vimeo embed
- Admin panel (the upload form)
- Subscription gating + Stripe webhooks
- Checkout + login pages

### Week 3 — Polish + launch
- Welcome email
- Run the full [SMOKE-TESTS.md](./SMOKE-TESTS.md) checklist end to end
- Load her founding content
- Preview review with her
- Production cutover (point GoDaddy DNS to Vercel)
- Record the admin playbook (Loom)
- Open the 14-day support window

---

## Open risks to clear early

- **Live subscribers?** If she has any current paying members, their Stripe subscriptions must be preserved through the cutover. Confirm the count before build. If zero, the rebuild is clean and risk-free.
- **Stripe product reuse.** Reuse her existing $29 product / price so we don't create duplicates or break existing billing.
- **Zero downtime.** Build on a preview URL; flip DNS only after she signs off on the preview. The current site stays live until the moment we cut over.
