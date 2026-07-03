# Group 1 Visual QA Report — Guide System v1

**Date:** 2026-07-02 (updated Sprint 73 on 2026-07-03)
**Overall visual status: Visual review completed — still not published.**

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

1. ~~(Content, not CSS) Internal verification commentary visible in official-source notes~~ — **Resolved in Sprint 70.** All 63 `note` fields in `officialSourcesByRoute` were rewritten to reader-facing wording, the "Source status" banner texts were similarly cleaned, and one positional error in the Last-reviewed transparency line ("linked below" → sources actually render above it) was corrected. A full-page sweep for internal wording (HTTP 200 / this sprint / guessed / 404 / bot-detection / editorial review / before publication / pending verification / marked TODO) now returns zero hits across all generated pages. Documents Checklist source cards were visually confirmed clean in a browser. Verification history remains preserved in `docs/SOURCE_VERIFICATION_MATRIX.md` and `docs/PR5_REVIEW_RISKS.md`.
2. ~~(Visual, TOC) Human visual review found the desktop "On this page" table of contents could overlap and feel cramped, especially on the Bank Account guide~~ — **Resolved in Sprint 72.** The generated guide TOC now renders as a clean vertical text list with comfortable line-height and subtle active-state emphasis instead of narrow pill links. The sticky desktop sidebar is hidden at medium widths where it becomes cramped, and the mobile collapsible TOC behavior remains intact.
3. ~~(Visual, reading time) Human visual review found the reading-time label appeared detached below the hero card~~ — **Resolved in Sprint 72.** Reading time now renders inside the generated hero/meta area so it reads as intentional page metadata rather than a misplaced caption.
4. **Cross-page visual consistency QA completed in Sprint 73.** All 22 draft/noindex surfaces were checked at desktop and mobile widths. No new consistency issues were found; the Sprint 72 TOC and reading-time fixes hold across the full generated guide set. Full notes are in `docs/GUIDE_SYSTEM_V1_CONSISTENCY_QA.md`.

**Sprint 72 verification:** Group 1 was rechecked in the browser at 1280px, 1000px, and 390px. Results: no horizontal overflow; no TOC text overlap; TOC pill styling removed on desktop; reading time appears inside the hero; CTAs remain at least 44px tall; the Bank Account tables still stack correctly on mobile.

**Sprint 73 verification:** all 22 draft/noindex surfaces were checked in the browser at 1280px and 390px. Results: no horizontal overflow; no TOC overlap; reading time placement consistent; no CTA below 44px; no CTA says "Read more"; no visible internal process wording detected; comparison-table pages stack correctly on mobile.

**Note on screenshots:** the original `visual-qa/group1/` screenshot pack predates the Sprint 70 note cleanup and Sprint 72 visual polish. Use it as historical QA context only; the current browser QA status is recorded in `docs/GUIDE_SYSTEM_V1_CONSISTENCY_QA.md`.

## Status and next step

- **Status: Visual review completed — still not published.**
- No page is published; all remain `noindex, nofollow`. Publish decision unchanged: do not publish yet.
