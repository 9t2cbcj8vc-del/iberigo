# Visual Coherence Phase 1 Plan

**Date:** 2026-07-04
**Status:** Homepage card coherence pass launched
**Scope:** planning only. No implementation, no `styles.css` edits, no publication or indexing changes, no redirects, no legacy migration were made while producing this document.

## Sprint 107 — Phase 2 Planned (2026-07-04)

Phase 1 (this document) is complete and live. Phase 2 — the legacy `/guides/*` structural fix identified as the highest-value remaining item in `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md` — is now planned in `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md` (status: "Visual Coherence Phase 2 planned — implementation pending"). This sprint was planning only: no legacy guide changes, no redirects, no migration, no indexing changes, and no edits to `sitemap.xml`, `search-index.json`, `robots.txt`, `styles.css`, or `app.js` were made.

## Sprint 105 — Homepage Card Coherence Pass Launched (2026-07-04)

PR #24 was squash-merged into `main` (commit `4f1b088`) and verified live on production (`https://iberigo.eu`). Production `styles.css` confirmed byte-identical to committed `main`, with the 16px radius and font-weight 800 changes both live. Homepage returns `200`, Move to Spain links to `/start-here/`, Vacation/Live behavior unchanged, no standalone Start Here block. Regression checks on `/start-here/` (no Draft badge, CTA alignment intact), `/the-spain-files/`, `/support/`, and both sampled legacy `/guides/*` pages all passed on production. Launch safety confirmed unchanged: 5 launched pages `index, follow`, 16 drafts `noindex, nofollow`, `sitemap.xml`/`search-index.json`/`robots.txt` byte-identical to `main`. Phase 1 is now complete and live; Phase 2 (legacy `/guides/*` structural fix), Phase 3 (Vacation/Live landing pages), and Phase 4 (further homepage redesign decisions) remain unimplemented and unplanned in detail, pending separate scoping.

## Sprint 104 — Homepage Card Coherence Preview QA Passed

PR #24 (commit `6a4b4ec`) was checked on its Netlify deploy preview (`https://deploy-preview-24--iberigo.netlify.app`, deploy ready) at 1280px and 390px.

- Homepage returns `200`; all three cards render at 16px radius, matching `/start-here/`'s Guide System cards exactly (confirmed on the preview: both compute `border-radius: 16px`); border/shadow read as calm, not heavy; CTA buttons remain equal-sized (136×44px desktop, full-width mobile) with a slightly bolder but not aggressive weight (800).
- Move to Spain still links to `/start-here/`; Vacation/Live `data-route-preset` behavior unchanged; no standalone Start Here block; no horizontal overflow or crowding at either breakpoint; header, search icon, language switcher, footer, and Donate link all render normally.
- Comparison with `/start-here/`: the homepage now visually reads as the same card family (identical 16px radius) while still feeling like a homepage (video-backed cards, wizard below) rather than a guide-page clone.
- Regression QA: `/start-here/`'s Guide System CTA alignment and Draft-badge removal both still hold; `/the-spain-files/` and `/support/` render normally; `/guides/banking/` and `/guides/eu-registration/` both return `200` on the preview.
- Launch safety verified directly against the live preview: all 5 launched pages `index, follow`; all 16 non-selected drafts `noindex, nofollow`; preview's `sitemap.xml` byte-identical to `main`; `search-index.json` exactly 5 entries; `robots.txt` byte-identical to `main`; no redirects; no legacy migration; no additional pages published.

No issues found; no fixes were needed. This is preview QA only — **PR #24 remains unmerged.**

## Sprint 103 — Homepage Card Coherence Pass Prepared

The recommended first implementation PR from this plan has been prepared on `visual-coherence/homepage-card-pass` (not yet merged): a small, narrowly-scoped `styles.css` change to the homepage's three `.situation-card--illustrated` cards (Move to Spain, Vacation in Spain, Live in Spain) only.

**Exact `styles.css` selectors touched:**
- `.situation-card--illustrated` — added `border-radius: 16px` (was inheriting 8px from the shared `.situation-card` rule), changed `border-color` and `box-shadow` to reuse Guide System v1's exact accent/shadow tokens (`rgba(166, 74, 54, 0.13)` border, `0 14px 36px rgba(42, 32, 25, 0.08)` shadow).
- `.situation-card--illustrated button, .situation-card--illustrated .primary-action` — `font-weight` bumped from `600` to `800` for CTA presence closer to Guide System v1's bolder buttons.

No other selector was touched — `.situation-card`, `.popular-card`, `.source-groups article`, `.trust-grid div` (which share the 8px radius rule) remain at 8px, since changing that shared selector would have affected every page using those components, not just the homepage. `.panel`, `.section-heading`, `.guide-card-panel`, `.site-footer`, `.topbar`, `.brand-*` were not touched.

Verified: homepage cards now render at 16px radius (confirmed matching `/start-here/`'s Guide System cards exactly), the three Explore buttons remain equal-sized (136×44px desktop, full-width mobile) and Move to Spain still links to `/start-here/`, Vacation/Live route-preset behavior unchanged, no standalone Start Here block, no overflow at 1280px/390px. Regression-checked `/start-here/` (CTA alignment and Draft-badge removal both still intact), `/the-spain-files/`, `/support/`, `/guides/banking/`, `/guides/eu-registration/` — all render normally. No additional pages published, no indexing changes, no redirects, no legacy migration. This is a homepage-only visual pass; it does not implement Phase 2 (legacy `/guides/*` structural fix), Phase 3 (Vacation/Live landing pages), or Phase 4 (further homepage redesign decisions).

## Goal

Take the highest-value, lowest-risk step toward a visually coherent IberiGo, following directly from `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md`'s recommended implementation phases. Phase 1 should be small enough to preview, review, and roll back in one sitting, and must not touch indexing, routes, or legacy content.

## Current state summary (from the merged audit + PR #21)

- **Three visual systems** are live: the original system (`styles.css`, homepage + all 37 legacy `/guides/*` pages + Donate), The Spain Files' own scoped magazine style, and Guide System v1 (the 5 launched Group 1 pages + 16 unpublished drafts + `/search/`).
- **Border-radius drift** across the three systems: 8px (original `.panel`/`.situation-card`) → 14px (The Spain Files `.sf-card`) → 16px (Guide System v1 `.guide-*` cards). This is real but minor — a cosmetic mismatch, not a brand-breaking one.
- **PR #21 (merged, Sprint 99)** already fixed Guide System card CTA alignment, normalized CTA labels, homepage Move/Vacation/Live CTA size consistency, removed the visible Draft badge, and added source-category card styling — all Guide-System- or homepage-CTA-scoped, no `styles.css` selectors shared with legacy pages were touched except the narrowly-scoped `.situation-card--illustrated` fix.
- **The single biggest remaining gap is structural, not stylistic**: all 37 legacy `/guides/*` pages are byte-for-byte homepage clones — `app.js` reads each page's `data-guide-id` attribute and populates the actual guide content client-side. There is no static per-guide layout at all. This is Phase 2/3 territory (see below), not Phase 1.
- **Vacation in Spain and Live in Spain have no dedicated landing pages** — they are homepage wizard presets that funnel into the same legacy shell. Also out of Phase 1 scope (it's a content project, not a styling one).

## Phase 1 scope

Phase 1 is deliberately narrow: **homepage visual coherence only**, using tokens/spacing/CTA rhythm that already exist and are already proven safe (the `.situation-card--illustrated` accent work from PR #21 is the precedent).

In scope:
1. **Homepage card radius / spacing alignment** — evaluate moving `.situation-card`/`.situation-card--illustrated` (currently 8px radius) closer to Guide System v1's 16px, via a new, additive CSS custom property (e.g. `--radius-card`) rather than rewriting the existing rule. This mirrors the audit's own Phase 1 recommendation (Step 4).
2. **Vacation/Live card CTA and spacing parity with Move to Spain** — PR #21 already made all three Explore buttons visually identical in size; Phase 1 can extend that same rigor to any remaining spacing/rhythm details between the three cards (e.g. description-text line-height, card-internal padding) so the row reads as one deliberate set, not just "same button size."
3. **Homepage-to-guide visual continuity** — small, additive touches only (e.g. confirming the homepage's accent color and the Guide System's accent color read as the same brand color at a glance — they already do per the audit's Step 2 table, so this may end up being a documentation/confirmation item rather than a code change).
4. **Document card-radius and source-card tokens** for future reuse, so Phase 2+ work has a named, agreed-upon token set to build on instead of re-deriving it each time.

## Out of scope for Phase 1

- Restructuring or migrating any of the 37 legacy `/guides/*` pages (Phase 2/3 — separate, much larger, touches live indexed pages).
- Changing any route, adding any redirect.
- Publishing any additional draft page, or changing `sitemap.xml` / `search-index.json` / `robots.txt`.
- A broad, global `styles.css` refactor (e.g. rewriting `.panel` or `.situation-card` wholesale).
- Redesigning The Spain Files (deliberately distinct magazine sub-brand, per the audit).
- Redesigning Donate/support (already coherent with the base system, per the audit).
- Building dedicated Vacation/Live landing pages (a content project, tracked as Phase 3).

## File-risk map

| File | Likely involved in | Risk | Why |
|---|---|---|---|
| `index.html` | All Phase 1 candidates (homepage cards live here) | **Low** | Single page, not shared with any other route; changes are visually verifiable in one preview pass; PR #21 already safely touched this file's card markup. |
| `styles.css` | Card radius token, `.situation-card`/`.situation-card--illustrated` spacing rules | **Medium–High** | Shared by every page on the site (homepage, all 37 legacy `/guides/*` pages, Donate, and — via base typography/`.panel` rules — Guide System v1 too). Any edit to a shared selector like `.situation-card` or `.panel` has sitewide blast radius. Mitigation: introduce a new, additive custom property/class scoped to homepage cards only, following the same pattern PR #21 used for `.situation-card--illustrated .primary-action` (add, don't rewrite). |
| `scripts/guide-components.js` | Documenting/reusing the `guideCss()` radius and source-card token values as a reference point | **Low** | Guide System v1's own scoped stylesheet; not touched by a homepage-only Phase 1, only *read* for token reference. |
| `scripts/generate-guide-system.js` | Not expected to change in Phase 1 | **Low** | No Phase 1 candidate touches generated guide pages. |
| `app.js` | Not touched in Phase 1 | **High if touched** | This is the file driving all 37 legacy `/guides/*` pages' client-side content population (`data-guide-id` → wizard-result rendering) and the homepage wizard. Any change here risks breaking every legacy guide page simultaneously. Explicitly out of scope for Phase 1; reserved for the much more carefully-staged Phase 2/3 structural work. |
| `the-spain-files/*.html`, its inline `<style>` block | Not touched in Phase 1 | **Low (because untouched)** | Explicitly out of scope — no Phase 1 candidate requires editing these files. |
| `support/index.html` | Not touched in Phase 1 | **Low (because untouched)** | Already coherent per the audit; no Phase 1 candidate requires editing this file. |
| `docs/*` | Planning + QA record docs | **Low** | Documentation only, no site behavior risk. |
| `sitemap.xml`, `search-index.json`, `robots.txt` | Not touched in Phase 1 | **N/A — do not touch** | Phase 1 is a homepage styling pass; it has no reason to touch indexing files, and any diff here would be an out-of-scope red flag during review. |

## Recommended first implementation PR

**Recommended Phase 1 PR: "Homepage card coherence pass"**

**Scope:**
- Adjust homepage `.situation-card`/`.situation-card--illustrated` spacing, radius, and CTA rhythm only, via new additive CSS (a new custom property and/or a homepage-scoped modifier class), following the same "add a targeted rule after the existing one" pattern PR #21 already used successfully for the CTA-size fix.
- Keep all existing copy, routes, `data-route-preset` behavior, and the Move to Spain → `/start-here/` link exactly as they are.
- No `sitemap.xml` / `search-index.json` / `robots.txt` change.
- No legacy `/guides/*` migration, no redirect, no route change.
- No edits to `app.js`, The Spain Files, or Donate/support files.

**Why this one first:** it is small (one file's worth of new, additive CSS plus possibly a couple of `index.html` class attributes), fully previewable on a Netlify deploy preview, trivially reversible (revert the CSS addition), does not touch any indexed content differently than it already is, and cannot break the legacy `/guides/*` pages structurally because it never touches `app.js` or the shared `.gov-link`/wizard rendering path.

## Implementation guardrails

- Prefer additive CSS (new custom properties / new classes) over editing existing shared selectors in place.
- If an existing shared selector genuinely must change, scope the change as narrowly as possible (class-level, not element-level) and diff-check against every page type that shares `styles.css` before considering it done.
- Never bundle this styling pass with any structural, indexing, redirect, or legacy-migration change.
- Keep the PR previewable as a single Netlify deploy preview; if the diff grows large enough that QA can't be done in one sitting, split it.
- Follow the same commit/PR discipline established across Sprints 90–100: docs updated in the same PR or a fast follow-up, checks run before every push, PR left unmerged until an explicit preview-QA pass confirms it.

## QA checklist (for the future implementation PR)

- [ ] Homepage desktop QA (~1280px): cards visually balanced, radius/spacing changes look intentional, no overflow.
- [ ] Homepage mobile QA (~390px): cards stack cleanly, no overflow, CTA buttons remain ≥44px tall and full-width as established in PR #21.
- [ ] `/start-here/` comparison QA: confirm the homepage now reads as visually related to Guide System v1 (radius/spacing family), without becoming a literal clone.
- [ ] Launched Group 1 pages indexing check: all 5 launched pages remain `index, follow`.
- [ ] Non-selected draft noindex check: all 16 non-selected draft pages remain `noindex, nofollow`.
- [ ] `sitemap.xml` unchanged (diff against `main`).
- [ ] `search-index.json` unchanged (diff against `main`, still exactly 5 entries).
- [ ] `robots.txt` unchanged (diff against `main`).
- [ ] Legacy guide route checks: `/guides/banking/` and `/guides/eu-registration/` (at minimum) still return `200` and render their client-side content correctly — confirms `app.js`/shared CSS changes didn't break the legacy wizard-result path.
- [ ] The Spain Files regression check: `/the-spain-files/` still renders normally, unaffected by any shared `styles.css` addition.
- [ ] Support/Donate regression check: `/support/` still renders normally.

## Rollback plan

- The Phase 1 change is additive CSS plus, at most, a few `index.html` class-attribute changes — rollback is a straightforward `git revert` of the single PR.
- No database, redirect, sitemap, or indexing state changes are made, so rollback has zero SEO/indexing side effects to unwind.
- If a partial rollback is ever needed, the new custom property/class can be reverted independently of any other homepage change, since it's additive rather than a rewrite.

## Future phases (unchanged from the audit, restated here for continuity)

1. **Phase 0 (done):** sitewide visual coherence audit — document current state, no code changes.
2. **Phase 1 (this plan):** homepage card coherence pass — small, additive, homepage-only.
3. **Phase 2 (structural, higher risk):** give legacy `/guides/*` pages real static content instead of the client-side `data-guide-id` shell — the highest-value fix identified by the audit, but requires careful SEO/regression testing since it touches 37 live, indexed pages.
4. **Phase 3 (content, not styling):** decide on dedicated Vacation/Live landing pages using the Guide System pattern, if desired.
5. **Phase 4 (optional/deliberate):** decide whether homepage situation cards should more fully adopt Guide System v1 card conventions — a branding decision, not a bug fix, separate from Phase 1's lighter-touch coherence pass.

## What must not change yet

- No additional draft pages are published.
- No `noindex, nofollow` is removed from any non-selected draft page.
- No redirects are added.
- No legacy guide is migrated.
- No `sitemap.xml`, `search-index.json`, or `robots.txt` change.
- No `styles.css` edit (this sprint is planning only).
- No PR is opened, no merge to `main` is performed.

## Confirmation

- This document, plus incidental updates to `docs/BACKLOG.md` and `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md` recording that this planning happened, are the only files created/changed in this sprint.
- No page's `status`, `robots` metadata, `sitemap.xml`, `search-index.json`, or `robots.txt` was touched.
- No redirects were added, no legacy guide was migrated, no `styles.css` edit was made.
- No PR was opened, no merge to `main` was performed.
