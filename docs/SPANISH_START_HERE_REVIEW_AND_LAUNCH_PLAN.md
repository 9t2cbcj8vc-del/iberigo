# Spanish Start Here Review and Launch Plan

**Status: Spanish documents checklist draft prepared — preview QA pending**

**Sprint 132 update (2026-07-05):** implemented this plan's recommended next step — `/es/moving-to-spain/documents-checklist/` was created as a Spanish draft, mirroring the English `/moving-to-spain/documents-checklist/` page's structure and content. It is `noindex, nofollow`, absent from `sitemap.xml`/`search-index.json`, has no hreflang, and is not exposed via any language-switcher launch behavior — all per this plan's recommendations. `showContinueJourney: false` was used (matching `/es/start-here/`'s established convention) to avoid the generator's hardcoded-English "Continue Your Journey"/"Related Guides"/"Previous Step"/"Next Step" headings, which have no Spanish variant in `scripts/guide-components.js`. Sections instead use directly-parameterized components (`GuideSection`, `ChecklistBox`, `InfoBox`, `Cards`) with Spanish titles/text, avoiding components with non-parameterized English chrome (`QuickAnswer`, `AtAGlance`, `TipBox`, `WarningBox`, `CommonMistakes`, `RealQuestions`, `DocumentsChecklist`). Confirmed pre-existing, sitewide (not introduced by this page) English chrome remains in the "Official Sources" heading, "Source status" note, and "Last reviewed" line — these components (`OfficialSources()`, `LastReviewed()`) are not language-aware anywhere in the codebase yet, matching the same limitation already present on `/es/start-here/`. No `app.js` or `styles.css` change was made. Preview QA is required before merge.

This document plans (does not implement) the review and launch decision for
`/es/start-here/`, the first Spanish Guide System draft page created in
Sprint 126/PR #36. This is planning only — no launch, no `sitemap.xml`/
`search-index.json` change, no hreflang, no language-switcher change, no
additional Spanish page, and no `app.js`/`styles.css` edit was made while
producing this document.

## Goal

Decide whether `/es/start-here/` should launch before its linked Spanish
Guide System pages exist, or wait until enough of the linked path is
translated to give Spanish-speaking visitors a coherent experience — and
define the concrete review checklist, hreflang strategy, and language-switcher
strategy needed before any Spanish launch decision is made.

## Current state

- `/es/start-here/` returns `200`, uses `<html lang="es">`, has Spanish
  title/meta description, canonical `https://iberigo.eu/es/start-here/`, and
  is `noindex, nofollow`.
- `/start-here/` (English) remains `index, follow`, unchanged.
- Neither page currently has any `<link rel="alternate" hreflang>` tags —
  hreflang is not part of the Guide System generator (`scripts/generate-guide-system.js`,
  `scripts/guide-components.js`) at all today; it only exists in the legacy
  `/guides/*` system.
- `/es/start-here/` is absent from `sitemap.xml` and `search-index.json`.
- The site-wide EN/ES language-switcher buttons (`data-lang` on `<button>`,
  wired in `app.js`'s `languageButtons`/`applyTranslations()`) only toggle
  `currentLang` and swap `data-i18n`/`data-language-url` text/hrefs
  client-side — they do **not** navigate between `/start-here/` and
  `/es/start-here/` as distinct URLs. Clicking "ES" on the English
  `/start-here/` page today does not send a visitor to the Spanish draft, and
  vice versa. No cross-linking currently exists between the two pages beyond
  each one's own static content.
- `/es/start-here/`'s body links point to the 5 launched **English** Group 1
  pages and several English draft pages (per `docs/SPANISH_START_HERE_LOCALIZATION_PLAN.md`),
  since no Spanish Guide System counterparts exist yet for any of them.
- No other Spanish Guide System pages exist. The two Spanish legacy static
  POC routes (`/guides/es/job-search/`, `/guides/es/phone/`) are unrelated —
  they belong to the older legacy `/guides/*` system, not the Guide System.

## Launch option comparison

### Option A — Keep `/es/start-here/` draft until the 5 linked Group 1 Spanish pages exist
- **Benefits:** better Spanish user experience (a Spanish visitor who reaches the linked pages finds them in Spanish, not English); avoids a Spanish entry page that mostly funnels into English content; safer for launch quality — nothing ships half-finished.
- **Risks:** slower launch; the Spanish entry point stays hidden (noindex) for longer, so no Spanish-speaking visitor benefits from it yet.

### Option B — Launch `/es/start-here/` before linked Spanish pages exist
- **Benefits:** the Spanish entry point becomes available sooner; could start building a Spanish audience gradually.
- **Risks:** Spanish-speaking visitors who click through hit English-only pages immediately after a Spanish landing page — a jarring, incomplete experience; hreflang and language-switcher decisions become awkward (what should `/start-here/` point to via hreflang if the linked pages aren't bilingual yet?); could read as unfinished or lower-quality to both users and search engines once indexed.

### Option C — Create Spanish drafts for the 5 Group 1 pages first, then launch them together later
- **Benefits:** most coherent launch — a Spanish visitor's entire Group 1 journey is in Spanish; clean hreflang strategy (every pair has a real counterpart); best bilingual experience; matches how the English Group 1 launch itself was sequenced (all 5 pages reviewed together before any indexing change).
- **Risks:** more translation/review work required before any Spanish launch; a larger implementation sequence (5 more pages) before the payoff.

### Option D — Add Spanish `/start-here/` to the visible language switcher but keep noindex
- **Benefits:** user-accessible (a curious visitor could find it) without being indexed by search engines.
- **Risks:** exposes an unfinished experience publicly even though it's not indexed — a visitor who does find it via the switcher still hits the same English-linked-pages problem as Option B; conflates "not indexed" with "not visible," which are different concerns; the switcher today has no mechanism to point only to launch-ready counterparts (it's a same-page text toggle, not a cross-URL router), so this would require new logic to implement safely.

**Recommendation: Option A now, transitioning to Option C as the actual path to launch.** Keep `/es/start-here/` `noindex, nofollow` for the time being — it is a reasonable draft to have in place, but should not be launched or exposed via the switcher yet. The next real step toward a Spanish launch is Option C: create Spanish drafts for the 5 Group 1 pages, review them with the same rigor as the original English Group 1 review, and only then launch the whole set (including `/es/start-here/`) together. Option B and Option D are both explicitly not recommended — both would surface an incomplete bilingual experience, which this plan is meant to avoid.

## Content review checklist (for `/es/start-here/` before any launch)

- [ ] Spanish reads fluently — not raw machine translation
- [ ] Terminology is consistent across the page and with any future Spanish Group 1 pages
- [ ] No legal certainty is overstated (matches the English page's cautious, non-legal-advice framing)
- [ ] No province-specific certainty is overstated (Spain's administrative processes vary by province/municipality — the Spanish copy should reflect that as clearly as the English original does)
- [ ] No exact timelines are stated where the real process varies (consistent with this project's no-fixed-timelines editorial rule)
- [ ] Source-link clarity: any linked official sources are clearly labeled and, if Spanish-language sources exist, preferred over English-only ones where practical
- [ ] Clear signal to the reader when a link leads to an English-only page — a Spanish-speaking visitor should not be surprised to land on English content without warning
- [ ] Tone matches IberiGo's established voice (calm, practical, government-adjacent — per `docs/IBERIGO_GUIDE_SYSTEM_V1.md`)
- [ ] Mobile readability — no overflow, comfortable line length, tap targets ≥44px (same bar as the English Guide System QA)
- [ ] CTA clarity — button/link labels are unambiguous in Spanish, following the same "View roadmap" / "Continue" normalization pattern used on the English side

### Terminology to check for consistency

`empadronamiento`, `padrón`, `NIE`, `TIE`, `certificado digital`, `Seguridad Social`, `tarjeta sanitaria`, `cuenta bancaria` — these terms recur across Group 1 topics and legacy guides; a future reviewer should confirm `/es/start-here/` uses them the same way the Spanish legacy guides (`/guides/es/*`) already do, so a bilingual reader doesn't see two different translations for the same concept across the site.

## Hreflang strategy

- **Do not add hreflang** from English `/start-here/` to `/es/start-here/` (or vice versa) until the Spanish page is launch-ready. Hreflang tells search engines "this is an equivalent page for this language" — pointing it at a `noindex` draft would be misleading and is explicitly out of scope for this sprint.
- **When `/es/start-here/` launches**, add reciprocal hreflang between `/start-here/` and `/es/start-here/` (`hreflang="en"` / `hreflang="es"` / `hreflang="x-default"` pointing at the English page, matching the pattern already used on legacy guide pairs like `/guides/job-search/` / `/guides/es/job-search/`).
- **If/when Spanish Group 1 pages are created** (per the Option C recommendation), add hreflang only for matching page pairs that both exist and are launch-ready — never hreflang to a page that doesn't exist yet or remains `noindex`.
- **General rule:** avoid hreflang to missing or `noindex` pages unless a future sprint explicitly documents and justifies an exception; this keeps the Guide System's hreflang behavior as clean and predictable as the legacy system's already is.

## Language-switcher strategy

### Option A — Hide the Spanish option until Spanish pages are launched
- Simplest and safest, but the switcher is currently a sitewide, same-page toggle (not per-page-aware) — hiding it selectively for Guide System pages would require new conditional logic.

### Option B — Show the Spanish option only where a Spanish counterpart exists and is launch-ready
- Requires teaching the switcher (or a wrapper around it) to check for a real Spanish counterpart per page before rendering/enabling the ES option, and to link to that counterpart's URL rather than just toggling text — a real feature, not a copy change.

### Option C — Show the Spanish option for draft/noindex pages too
- Not recommended — this is functionally Option D from the launch comparison above and has the same problem: it exposes an unfinished experience.

**Recommendation: Option B.** Show the Spanish option only for pages that have a reviewed, launch-ready Spanish counterpart. Until `/es/start-here/` (and, later, the Group 1 Spanish pages) are actually launched, the switcher should not offer or link to them from the English pages — and, symmetrically, `/es/start-here/` itself should not advertise Spanish counterparts for pages that don't have one yet. This is a language-switcher **feature**, not just a content change, and is explicitly not being implemented in this sprint — it's the reason a future PR (see below) needs its own scoping.

## Recommended next implementation PR

Evaluated options:
- **A. Polish `/es/start-here/` draft copy only** — useful, but doesn't move the site closer to an actual Spanish launch; the real blocker is the missing linked pages, not `/es/start-here/`'s own copy quality.
- **B. Create Spanish drafts for all 5 Group 1 pages** — the eventual goal (Option C's path), but too large for a single "next" PR; better done incrementally.
- **C. Create a Spanish draft for one linked Group 1 page first** — small, safe, and directly tests the translation/review process on a single page before committing to all 5.
- **D. Add hidden/internal review navigation for Spanish drafts** — useful tooling eventually, but not the highest-priority next step; the content gap (missing pages) matters more right now than a review-navigation convenience.

**Recommendation: Option C — create a Spanish draft for one linked Group 1 page first, likely `/es/moving-to-spain/documents-checklist/`.** This mirrors how this project has repeatedly proven out risky changes on one small unit before scaling (e.g. the job-search-then-phone legacy static POC sequence). The new page should be `noindex, nofollow`, absent from `sitemap.xml`/`search-index.json`, with no hreflang added yet (per the hreflang strategy above) and no language-switcher change. **This sprint does not implement it** — it is the recommended scope for a future, separately-scoped sprint.

## File-risk map (for the future implementation PR, not this sprint)

| File | Expected risk |
|---|---|
| New `es/moving-to-spain/documents-checklist/index.html` (generated) | Medium — new generated page, must get `noindex, nofollow` correctly |
| `scripts/generate-guide-system.js` | Medium — would need a new route entry and Spanish content/metadata, following the same pattern used for `esStartHere` |
| `scripts/guide-components.js` | Low — reused as-is unless Spanish-specific component changes are needed |
| `app.js`, `styles.css` | None expected — no changes anticipated |
| `sitemap.xml`, `search-index.json`, `robots.txt` | None — new page stays out of both until a future launch decision |

## QA checklist (for any future Spanish launch decision)

- [ ] `/es/start-here/` (and any future Spanish Group 1 pages) return `200`
- [ ] Canonical, title, meta description are correct and in Spanish
- [ ] `robots` meta is exactly `noindex, nofollow` until a launch decision is made; `index, follow` only after explicit approval
- [ ] Hreflang, if added, is reciprocal and only between pages that both exist and are launch-ready
- [ ] Language switcher does not link to unfinished Spanish pages
- [ ] `sitemap.xml`/`search-index.json` only include pages that have been explicitly approved for launch
- [ ] Content review checklist (above) completed for every Spanish page before launch
- [ ] English Group 1 pages and their `index, follow` status remain unaffected
- [ ] Legacy guide pages and the legacy audit baseline remain unaffected
- [ ] No redirects introduced

## Rollback plan

- `/es/start-here/` already exists as a draft; if this review concludes it should not proceed toward launch at all, it can simply remain `noindex, nofollow` indefinitely or be removed — no sitemap/search-index/hreflang/switcher change would need to be undone, since none has been made.
- Any future Spanish Group 1 page (Option C's recommended next PR) would be reverted the same way any other draft page is: delete the generated file(s) and the corresponding route entry in `scripts/generate-guide-system.js`.

## Future phases

1. **This sprint:** review and launch-decision planning only (this document).
2. **Next recommended PR:** Spanish draft for one linked Group 1 page (`/es/moving-to-spain/documents-checklist/`), `noindex, nofollow`, no hreflang, no switcher change.
3. **Following phase:** Spanish drafts for the remaining 4 Group 1 pages, using the same review checklist.
4. **Launch phase:** once all 5 Spanish Group 1 pages (plus `/es/start-here/`) pass content review, launch them together — add to `sitemap.xml`/`search-index.json`, flip to `index, follow`, add reciprocal hreflang, and update the language switcher to link between real counterparts (Option B above).
5. **Not in scope at any phase discussed here:** legacy guide migration, Vacation/Live Spanish pages, or any redirect strategy — all remain separate, unplanned decisions.
