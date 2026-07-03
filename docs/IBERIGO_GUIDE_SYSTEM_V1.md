# IberiGo Guide System v1

**Date:** 2026-07-02
**Status:** Defined — not yet applied. This document answers the open Group 1 design-system question from the Sprint 65 human review ("Which visual/design system should Group 1 use before publication?"). No CSS or page visuals were changed while producing it; applying the system to Group 1 is the next visual task, tracked in `docs/BACKLOG.md`.

**Visual direction in one line:** calm, practical, government-adjacent, card-based, mobile-first.

The pages should feel trustworthy and easy to follow — not flashy, sales-driven, or travel-blog-like.

---

## 1. Design goal

IberiGo Guide System v1 is the visual system for practical Spain bureaucracy guides. It should make complex steps feel calm, readable and trustworthy.

A reader arrives stressed, often mid-move, often on a phone, often after being confused by contradictory information elsewhere. The design's job is to lower that stress: show them where they are, what the next step is, and where the honest limits of the guidance lie — and get out of the way of the content.

## 2. Visual principles

- **Calm layout** — generous whitespace over density; the page should breathe.
- **Clear hierarchy** — one obvious H1, predictable H2 sections, no ambiguity about what's a heading and what's body text.
- **Strong spacing** — spacing does the work of separating content; borders and colour do less.
- **Mobile-first** — the ~390px view is the primary design target, not an afterthought.
- **Readable typography** — comfortable body size and line-height; no tiny text anywhere.
- **Practical cards** — cards carry choices, steps, and summaries, not decoration.
- **Low visual noise** — few colours, few borders, no competing accents.
- **Consistent CTAs** — one button style, descriptive labels, same behavior everywhere.
- **Clear warning/info/source blocks** — visually distinct from each other and from body text, but calm.
- **No decorative clutter** — nothing on the page that doesn't help the reader act.

## 3. Page structure

The standard visual order for a guide page, top to bottom:

1. Hero
2. Quick Answer
3. Important notice / disclaimer, where needed
4. At-a-glance or key points
5. Main content sections
6. Common Mistakes
7. Real Questions People Ask
8. Official Sources
9. Your Next Step
10. Related guides

This matches the existing generated-page structure (`scripts/generate-guide-system.js` / `scripts/guide-components.js`), so Guide System v1 is primarily a visual-polish pass over the existing skeleton, not a restructuring.

## 4. Component rules

### Hero
- Clear headline; short subtitle beneath it.
- No large decorative imagery required — the aside card (kicker/summary) is enough visual interest.
- Hero must not push the Quick Answer below the fold on mobile any further than necessary.

### Cards
- Use for route choices, steps and summaries.
- Consistent internal spacing across every card on every page.
- Easy tap targets on mobile — the whole card or a clearly-sized button, never a small text link inside a big card.
- Card grids collapse to a single column on mobile without awkward gaps.

### Warning boxes
- Use for legal/tax/immigration caution.
- Calm, not alarming: distinct background and label, no red-alert styling, no exclamation iconography that makes routine caveats feel like emergencies.
- A page with many warnings should still feel composed — if warnings visually shout, readers stop reading them.

### Official sources
- Show as further-checking resources.
- Never imply legal verification — the visual treatment (e.g., a quiet card with an external-link affordance) should read as "reference," not "certified."
- The existing "Source status" note stays visible and un-minimised.

### CTA buttons
- Descriptive labels; never "Read more."
- Visually consistent: one primary style, one secondary style, used the same way on every page.
- Disabled/coming-soon styling (if it ever returns) must be visibly non-interactive.

### Tables
- Simple: header column + one content column is the preferred pattern (as already used in the comparison tables).
- Mobile-readable — rows can wrap; text stays legible.
- Avoid dense multi-column comparison grids; if a comparison needs more than two columns, reconsider whether cards serve better.

## 5. Mobile rules

- Content must work well around **390px width**.
- Cards stack cleanly — single column, consistent vertical rhythm.
- CTAs remain easy to tap — full-width or near-full-width on mobile, adequate height.
- Tables should not break layout — wrap or scale, never force page-wide overflow.
- Spacing should remain generous — do not compress margins to "fit more" on small screens.
- No horizontal scrolling, unless unavoidable for tables (and then scoped to the table, not the page).

## 6. Tone and trust

Visual design should support the editorial tone already established in `docs/STYLE_GUIDE.md` and `docs/PROJECT_PRINCIPLES.md`:

- **Practical** — the design foregrounds steps, documents, and next actions.
- **Calm** — nothing blinks, slides, pops, or urges.
- **Honest about uncertainty** — hedged claims and "varies by municipality" caveats get normal, readable presentation, not fine-print styling that hides them.
- **No overpromising** — no visual treatments that make outcomes look guaranteed (checkmark-heavy "you're done!" patterns, progress bars implying a fixed process).
- **No fake authority** — no official-looking seals, crests, or government-mimicking headers; IberiGo is government-*adjacent* in calm and clarity, never in impersonation.
- **No sales pressure** — no urgency banners, popups, or conversion-optimised patterns.

## 7. What not to do

Avoid:

- Heavy gradients
- Flashy animations
- Travel-blog image-heavy design
- SaaS dashboard feel
- Government-document density (calm like a well-run agency's best page, not dense like a BOE PDF)
- Too many colours
- Tiny text
- Cramped cards
- Visual hierarchy based only on colour (hierarchy must survive grayscale/colour-blind viewing — use size, weight, and spacing first)

## 8. Group 1 visual QA checklist

Run this per page once Guide System v1 has been applied. Same checklist for each of the five pages.

### `/start-here/`
- [ ] Desktop layout
- [ ] Mobile layout (~390px)
- [ ] Spacing
- [ ] Cards
- [ ] Typography hierarchy
- [ ] CTAs
- [ ] Source blocks (n/a on this page — confirm none render unexpectedly)
- [ ] Warning/info blocks
- [ ] Consistency with Guide System v1

### `/moving-to-spain/documents-checklist/`
- [ ] Desktop layout
- [ ] Mobile layout (~390px)
- [ ] Spacing
- [ ] Cards
- [ ] Typography hierarchy
- [ ] CTAs
- [ ] Source blocks (4 sources — check external-link affordance and the Source status note)
- [ ] Warning/info blocks
- [ ] Consistency with Guide System v1

### `/moving-to-spain/finding-accommodation/`
- [ ] Desktop layout
- [ ] Mobile layout (~390px)
- [ ] Spacing
- [ ] Cards
- [ ] Typography hierarchy
- [ ] CTAs
- [ ] Source blocks (n/a on this page — confirm none render unexpectedly)
- [ ] Warning/info blocks (scam-avoidance warnings — confirm calm, not alarming)
- [ ] Consistency with Guide System v1

### `/moving-to-spain/settling-into-spain/`
- [ ] Desktop layout
- [ ] Mobile layout (~390px)
- [ ] Spacing
- [ ] Cards
- [ ] Typography hierarchy
- [ ] CTAs (many cross-links to sub-guides — check consistency and tap targets)
- [ ] Source blocks (n/a on this page — confirm none render unexpectedly)
- [ ] Warning/info blocks
- [ ] Consistency with Guide System v1

### `/living-in-spain/opening-a-bank-account/`
- [ ] Desktop layout
- [ ] Mobile layout (~390px)
- [ ] Spacing
- [ ] Cards
- [ ] Typography hierarchy
- [ ] CTAs
- [ ] Source blocks (n/a on this page — confirm none render unexpectedly)
- [ ] Warning/info blocks
- [ ] Tables (online vs. traditional banks comparison — check mobile readability)
- [ ] Consistency with Guide System v1

---

## Scope note

Guide System v1 is defined here for **Group 1 first**, because that's the group closest to publication. The same system should eventually apply to all 22 draft pages (they share the same generated components), but applying and QA-ing beyond Group 1 is future work, not part of the Group 1 visual task.
