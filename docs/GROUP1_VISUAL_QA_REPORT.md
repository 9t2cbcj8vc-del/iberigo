# Group 1 Visual QA Report — Guide System v1

**Date:** 2026-07-02 (Sprint 69)
**Overall visual status: Visual QA prepared — awaiting human visual review.**

Local QA was run against the Guide System v1 scoped pass (Sprint 68) using a real Chromium instance at two viewports — mobile 390px and desktop 1280px — with full-page screenshots saved to `visual-qa/group1/` (untracked, not committed). Overflow and tap-target results below were measured programmatically in the browser, not eyeballed.

## How to review the screenshots

Files live in `visual-qa/group1/` (local only). Naming: `<page>-mobile-390.png` and `<page>-desktop-1280.png`. All are full-page captures at a faithful CSS viewport (note: plain `chrome --headless --screenshot` clamps window width to ~500px and silently clips — the pack was captured with puppeteer-core driving system Chrome with an explicit 390px viewport to avoid that).

## Per-page results

### 1. `/start-here/`
- **Screenshots:** `start-here-mobile-390.png`, `start-here-desktop-1280.png`
- **Mobile result:** Pass — no horizontal overflow (scrollWidth 390); 11 CTAs, all ≥44px tall and full-width; persona cards stack in a clean single column with generous spacing.
- **Desktop result:** Pass — no overflow; 3-column card grid; clear hierarchy (kicker → H1 → subtitle → cards).
- **Issues found:** None visual. Primary (filled) buttons for persona routes vs. secondary (outline) for "Most people start here" reads as intentional hierarchy.
- **Recommended fixes:** None.

### 2. `/moving-to-spain/documents-checklist/`
- **Screenshots:** `documents-checklist-mobile-390.png`, `documents-checklist-desktop-1280.png`
- **Mobile result:** Pass — no overflow; 6 CTAs all ≥44px; At-a-Glance table stacks to labeled blocks (cream header above white value) and reads well; long checklists have comfortable line-height.
- **Desktop result:** Pass — no overflow; 3-column grids; Official Sources render as calm reference cards with the quiet ↗ external-link affordance (reference feel, not certification — matches the Guide System).
- **Issues found:** **One content issue surfaced by visual review (not CSS):** the official-source card notes expose internal verification commentary to readers — e.g. "Verified reachable this sprint (HTTP 200, URL path itself confirms 'Tasa790_012')" and "guessed deep links returned 404… Confirm the exact EX-18 form page during editorial review." This is sprint-process language that belongs in `docs/SOURCE_VERIFICATION_MATRIX.md`, not on the page. The same pattern exists on other pages that reuse these source entries (it predates Group 1 — e.g. the seg-social.es note on Healthcare/Social Security/Work pages).
- **Recommended fixes:** Rewrite the user-facing `note` fields in `officialSourcesByRoute` to plain reader-appropriate descriptions ("Official fee-payment page for Tasa 790-012"), and keep the verification history in the source matrix doc only. Small, scoped content edit — flagged for a follow-up sprint rather than fixed inside this QA pass, since Group 1 content wording already went through the Sprint 65 human review.

### 3. `/moving-to-spain/finding-accommodation/`
- **Screenshots:** `finding-accommodation-mobile-390.png`, `finding-accommodation-desktop-1280.png`
- **Mobile result:** Pass — no overflow; 5 CTAs all ≥44px; the 8-card scam-avoidance grid stacks cleanly.
- **Desktop result:** Pass — no overflow; 3-column grid.
- **Issues found:** None visual. Warning boxes verified calm (cream `rgba(253,240,220,0.72)` background, muted terracotta border — no red/alarm styling).
- **Recommended fixes:** None.

### 4. `/moving-to-spain/settling-into-spain/`
- **Screenshots:** `settling-into-spain-mobile-390.png`, `settling-into-spain-desktop-1280.png`
- **Mobile result:** Pass — no overflow; 6 CTAs all ≥44px and full-width (this is the CTA-densest Group 1 page).
- **Desktop result:** Pass — no overflow; 3-column grid.
- **Issues found:** None visual.
- **Recommended fixes:** None.

### 5. `/living-in-spain/opening-a-bank-account/`
- **Screenshots:** `opening-a-bank-account-mobile-390.png`, `opening-a-bank-account-desktop-1280.png`
- **Mobile result:** Pass — no overflow; 5 CTAs all ≥44px; **both tables (At-a-Glance and the online-vs-traditional comparison) stack to block layout with no overflow** — this was flagged as the page's main 390px risk in the CSS scope plan and it holds.
- **Desktop result:** Pass — no overflow; 3-column grid; numbered Common Mistakes cards and Real Questions cards read cleanly.
- **Issues found:** None visual.
- **Recommended fixes:** None.

## Cross-page verdicts against the Guide System v1 checklist

| Check | Result |
|---|---|
| No horizontal overflow (390px) | Pass on all 5 (measured `scrollWidth == clientWidth`) |
| Readable hero | Pass — H1 ~54px max desktop / ~30–36px mobile, tight line-height, 68ch subtitle cap |
| Good spacing | Pass — consistent card gaps and section rhythm |
| Cards feel consistent | Pass — unified 16px radius, uniform padding |
| CTAs easy to tap | Pass — 0 buttons below 44px across all 5 pages; full-width on mobile |
| Tables usable | Pass — stacked block layout at ≤640px, verified on the bank page |
| Warning/info blocks calm | Pass — cream/muted palette, no alarm styling |
| Source blocks feel like references | Pass visually (quiet cards + ↗); **content note wording needs cleanup — see Documents Checklist issue** |
| Typography hierarchy clear | Pass — size/weight/spacing carry hierarchy, survives grayscale |
| Not flashy / sales-driven / travel-blog-like | Pass — no gradients, animations, imagery, urgency patterns |

## Issues summary

1. **(Content, not CSS) Internal verification commentary visible in official-source notes** — affects Documents Checklist directly and other draft pages that reuse the same source entries. Recommended fix: reader-appropriate note wording in `officialSourcesByRoute`; verification history stays in `docs/SOURCE_VERIFICATION_MATRIX.md`. Needs its own small sprint.
2. No visual/CSS issues found requiring changes.

## Status and next step

- **Status: Visual QA prepared — awaiting human visual review.** (Not "visual review completed" — that's the human's call, made by reviewing the pages and/or the screenshot pack against `docs/IBERIGO_GUIDE_SYSTEM_V1.md` §8.)
- No page is published; all remain `noindex, nofollow`. Publish decision unchanged: do not publish yet.
