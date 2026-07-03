# Design Prompt — Primrose Knowledge Studio (immersive Porch)

Copy-paste everything below this line into your design tool or hand it to a designer.

---

You are designing the public sales page (and design language) for **Primrose Knowledge Studio**, a $29 CAD/month subscription video library that teaches Canadian Gen Z and young millennials the legal, financial, and safety knowledge nobody taught them. Think of it as "the answer library for 2am questions."

## The product

- 15-minute plain-English videos taught by **Primrose Watson**, a working Canadian lawyer (Ottawa, Canadian Bar, good standing).
- Every video includes a downloadable one-page **toolkit PDF** (checklists, scripts, exact wording for hard conversations).
- Content is organized into **five pillars**: Workplace, Financial, Career, Emotional, Personal Safety. This taxonomy is fixed.
- Every video carries a **last-reviewed date** and gets re-recorded when the law changes.
- Membership is flat: $29/month, everything included, cancel in two clicks through Stripe's portal, first video free without a card.
- Legal *information*, never legal advice. This disclaimer is regulatory, it must appear and never be undermined.

## The audience

- Canadian, 22 to 32, arriving mostly as **cold traffic from TikTok and Instagram** on their phones.
- Their real moment of need: it's late, something just happened (a landlord kept a deposit, a boss texted at 10pm, a CRA letter arrived, a non-compete appeared in an offer, someone won't stop contacting them) and they are anxiously Googling.
- They are fluent in premium consumer design and allergic to anything that looks like a template, a course-seller funnel, or influencer hype.
- Trust is the entire conversion problem: they must believe a real, accountable lawyer is behind this before paying.

## What I want from you

An **immersive, memorable web experience**, the kind that comes out of the best SF product studios (Linear, Arc, Vercel, Family, Mercury caliber). Requirements:

1. **One unforgettable core device, not decoration.** Every interaction must express the product's meaning: darkness into light, fear into knowing, question into answer. No random animation. If a motion doesn't carry meaning, cut it.
2. **Participatory, not just watchable.** The visitor should DO something within the first ten seconds that makes the product's value physically felt (for example: ask a question and watch the site answer it). The demo IS the pitch.
3. **A narrative arc across the scroll.** The page should read like a story with scenes, with a beginning (their 2am moment), a middle (the library answering), and an end (them, prepared). Bonus if an ambient element quietly evolves across the whole scroll to reward attention.
4. **Premium restraint.** Grain, glass, glow, and generous space over gradients-everywhere. Huge type used sparingly. Motion smooth and physical (proper easing, 60fps), never bouncy or cute.
5. **Trust devices designed as beautifully as the hero**: the lawyer's credentials presented as verifiable facts, last-reviewed dates on content, the full catalogue browsable before paying, and the cancellation steps printed next to the price. These are conversion features, not fine print.

## Hard constraints

- Sans-serif only, no serif typefaces anywhere. Distinctive display sans + system-adjacent body is the expected pairing.
- Rounded corners on all cards, images, and containers (16px standard radius). Nothing sharp.
- On heavy display weights (700+), letter-spacing never tighter than -0.025em. Readability beats style.
- No em dashes in copy. No orphan words on any headline (balance your line breaks).
- Voice: plain language, confident, slight wit. No legalese, no influencer energy, no empowerment cliches, no fake testimonials, no invented statistics or member counts.
- Never use the words "expert," "specialist," or "expertise."
- Mobile-first: most visitors arrive on a phone from a social app's in-app browser. Every immersive device needs a touch equivalent and the page must feel complete without hover.
- Accessibility: full experience must respect prefers-reduced-motion with a dignified static fallback, keyboard navigable, WCAG AA contrast.
- Performance: initial load must feel instant on a mid-range phone. No heavy animation libraries if CSS + small JS can do it.

## Technical target

The build ships on Next.js 16 (App Router) + Tailwind v4 with design tokens in CSS. Deliver the design so tokens (colors, type scale, radii, spacing) are extractable, and specify motion in implementable terms (trigger, property, duration, easing).

## Scope of the design language

The Porch (sales page) is the showcase, but the identity must extend to: member dashboard with five-pillar navigation, video viewing page (YouTube embed + toolkit download), account page, sign-in (passwordless magic link), and a simple admin. Show at least the dashboard and video page in the new language so we know the system holds beyond the landing page.

## What exists today (context, not constraint)

The current live design is a light, five-colour "Pillar Stack" system (each pillar owns a colour). You may keep, evolve, or replace it, but if you replace it, propose the new wayfinding logic for the member area, since colour currently does that job.

## Deliverables

1. The Porch as a high-fidelity interactive prototype (or a coded page), desktop + mobile.
2. The design system one-pager: palette, type scale, radii, motion principles.
3. Dashboard + video page in the same language.
4. A short rationale: what the core device is, why it will be remembered, and what it says about the product.

Judge your own work by one question: will a 26-year-old who landed here from TikTok at 1am remember this site tomorrow, and did it make them trust a lawyer they've never met?
