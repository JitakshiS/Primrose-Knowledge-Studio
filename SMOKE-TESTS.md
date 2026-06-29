# Smoke Tests — Primrose Knowledge Studio

Every key user flow listed below. Both desktop and mobile. Run the entire list before any change ships to production. Failures get logged in `DECISIONS.md` with the fix.

This list grows as the project develops. Anything new in production has to be added here.

---

## Customer flows (the public side)

### Signup and first session

- [ ] Land on the home page from a cold link (TikTok bio URL pattern)
- [ ] Click "Become a Member" — Stripe Checkout opens with the correct price ($29/month)
- [ ] Complete payment with a Stripe test card
- [ ] Redirected back to the member dashboard, already logged in
- [ ] Dashboard shows the correct welcome message and the "Newest Addition" feature slot
- [ ] Click into a video — player loads and plays cleanly
- [ ] Toolkit PDF downloads successfully
- [ ] Next/Previous navigation moves within the same pillar
- [ ] Welcome email arrives in the inbox within two minutes

### Returning member

- [ ] Visit the home page when already a member but logged out
- [ ] Click "Login" — magic link is sent
- [ ] Click the link in the email — logged in, lands on the dashboard
- [ ] All five pillars are accessible from the dashboard
- [ ] Session persists across a page refresh
- [ ] Session persists across closing and reopening the browser

### Cancellation

- [ ] Click "Manage Subscription" in the account area — Stripe Customer Portal opens
- [ ] Cancel the subscription — Stripe confirms cancellation
- [ ] Access is retained until the end of the current billing period
- [ ] After the period ends, the dashboard shows a resubscribe prompt
- [ ] Resubscribing restores access cleanly without re-creating the account

### Edge cases

- [ ] Failed payment / card declined at checkout — clear error UI, no half-created account
- [ ] Card expires mid-subscription — `past_due` state handled, UI prompts to update payment
- [ ] Webhook delay between payment and access grant — temporary "setting up your account" state shows, then resolves
- [ ] Direct URL to a video page without a subscription — redirected to the sales page
- [ ] Direct URL to a video page with an expired subscription — redirected to the resubscribe prompt
- [ ] Same email subscribing twice — handled gracefully, not a duplicate account

---

## Admin flows (Primrose's side)

### Adding a video

- [ ] Log in to the admin at `/admin`
- [ ] Open the "new video" form
- [ ] Fill title, pillar (dropdown of 5), description, YouTube video ID (unlisted)
- [ ] Upload a toolkit PDF
- [ ] Save as draft — video appears in the admin drafts list, NOT in the member library
- [ ] Publish — video appears in the member library, in the correct pillar
- [ ] Featured / "Newest Addition" toggle works as expected

### Editing a video

- [ ] Open an existing published video in the admin
- [ ] Edit title, description, or pillar
- [ ] Save — changes reflect immediately in the member library
- [ ] Replace the toolkit PDF — the new file downloads correctly, old file is no longer accessible

### Deleting a video

- [ ] Confirmation prompt appears before delete
- [ ] After deletion, the video no longer appears in the member library
- [ ] Members who had been watching it do not see broken links or 500 errors

### Admin edge cases

- [ ] Non-admin user attempts to access `/admin` — denied, redirected to the sales page or login
- [ ] Form submitted with a missing required field — clear inline error, no silent failure
- [ ] Form submitted with an invalid YouTube video ID — clear error, video not created
- [ ] Form submitted with a video ID for a *public* YouTube video (not unlisted) — admin gets a warning prompting confirmation that this video is meant to be visible to non-members
- [ ] Two videos pinned as "Newest Addition" — only the most recently pinned one displays
- [ ] Admin panel works on mobile (does not need to be optimised for it, but must not break)

---

## Cross-cutting checks

### Visual consistency

- [ ] All video cards in the library grid use the same template
- [ ] All video player pages use the same layout
- [ ] Thumbnails normalise to consistent dimensions regardless of what was uploaded
- [ ] Long titles wrap cleanly without breaking the layout
- [ ] An empty pillar shows a graceful empty state, not a broken or blank-looking page
- [ ] Rounded corners 16px applied consistently on cards, images, video frames, and containers
- [ ] No serif font appears anywhere in the UI unless the design call confirms that direction

### Mobile

- [ ] Sales page renders correctly on iPhone Safari and Android Chrome
- [ ] Dashboard mobile layout works at the smallest reasonable viewport (375px wide)
- [ ] Video player is responsive and plays in landscape on mobile
- [ ] Stripe Checkout works on iOS Safari and Chrome
- [ ] Toolkit PDF downloads work on mobile

### Performance and integrity

- [ ] Sales page loads in under 2 seconds on simulated mobile 4G
- [ ] Video player loads within 3 seconds of clicking into a video
- [ ] No broken images anywhere on the site
- [ ] No console errors in the browser developer tools on any page
- [ ] No 404s when navigating between pillars or videos

### Accessibility (baseline)

- [ ] All images have alt text
- [ ] Keyboard navigation works for the sales page CTA and the login flow
- [ ] Color contrast meets WCAG AA on body text and CTAs
- [ ] Video player has keyboard controls (YouTube IFrame Player provides this by default)
- [ ] YouTube embed parameters applied: `rel=0` (no unrelated suggestions), `modestbranding=1`, `playsinline=1`
- [ ] Member sharing a video URL outside the platform results in the YouTube watch page being viewable to anyone with the link — this is acknowledged in Agreement Section A.8 and is the documented limitation of unlisted YouTube

---

## How to use this file

Before any production push:

1. Open this file
2. Walk through every checkbox manually — both Jitakshi clicks through, and ideally Primrose does a separate pass on the customer flows
3. Anything that fails gets fixed before cutover
4. New flows added to the project get new checkboxes added here
5. Anything that breaks after launch and is caught in the 14-day window adds a new checkbox so the same break cannot happen twice
