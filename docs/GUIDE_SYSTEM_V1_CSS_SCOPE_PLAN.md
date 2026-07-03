# Guide System v1 — CSS Scope Plan (Sprint 67)

**Date:** 2026-07-02
**Status:** Audit and plan only. No CSS or visual changes were made while producing this document.

## Executive summary

The styling situation is safer than feared. The generated draft pages already have a **built-in scoping mechanism**: every generated page embeds its own inline `<style>` block produced by `guideCss()` in `scripts/guide-components.js`, and **all `.guide-*` component classes (hero, sections, cards, boxes, tables, buttons, TOC, timeline) are styled exclusively by that inline block** — `styles.css` contains zero rules for them, with one exception (`.guide-card-panel`, see below). Live indexed pages never receive the inline block, so changing `guideCss()` cannot affect them by construction.

**Recommended approach: Option D — generated-page scoped styles via `guideCss()`, which is already supported and proven.** All Guide System v1 visual rules go into `guideCss()`; regenerating updates only draft pages.

The audit found exactly **one shared guide-prefixed class** (`.guide-card-panel`, styled in `styles.css`, used by the homepage, The Spain Files, and legacy `/guides/*` pages as well as the draft heroes) and a set of **global chrome classes** (`.panel`, `.topbar`, `.site-footer`, etc.) that draft pages inherit from `styles.css`. These are the unsafe selectors — they must not be modified as part of Guide System v1.

---

## Step 1 findings — current CSS structure

### How draft pages are styled (two layers)

1. **`/styles.css`** (4,136 lines, shared site-wide, loaded by every page including live indexed ones) — provides the global chrome: `.app-shell`, `.topbar` (10 rule occurrences), `.site-footer` (3), `.brand-wordmark` (3), `.language-switcher` (6), `.panel` (1), `.guide-card-panel` (5), `.primary-action` (3), `.section-heading` (7).
2. **Inline `guideCss()` block** (~60 rules, embedded per-page by the generator) — provides every guide component: `.guide-main`, `.guide-layout`, `.guide-hero`, `.guide-section`, `.guide-info-card`, `.guide-box` (+ `--warning`/`--tip`/`--info`/`--checklist` variants), `.guide-table`, `.guide-button` (+ `--secondary`), `.guide-card-grid`, `.guide-toc`, `.guide-timeline`, `.guide-breadcrumbs`, `.guide-status-badge`, `.guide-kicker`, `.last-reviewed`, `.search-nav-link`, plus the 900px/640px responsive breakpoints.

The `/search/` page uses the same mechanism with its own `searchCss()` block in `scripts/search-components.js`.

### Selector classification

| Category | Selectors | Where styled | Safe to change for v1? |
|---|---|---|---|
| **Draft-only components** | Every `.guide-*` class except `.guide-card-panel`; also `.last-reviewed`, `.search-nav-link` (verified: 0 rules in `styles.css`, 0 uses in live HTML) | Inline `guideCss()` only | **Yes** — this is where all v1 work happens |
| **Shared hero shell** | `.guide-card-panel` (73 uses across live homepage, Spain Files, legacy guides + draft heroes), `.panel` | `styles.css` | **No** — restyle the hero via `.guide-hero` (inline) instead; it sits on the same element (`class="panel guide-card-panel guide-hero"`), so inline rules can override without touching the shared classes |
| **Global chrome** | `.app-shell`, `.topbar`, `.brand-lockup`, `.brand-wordmark(-accent)`, `.language-switcher`, `.site-footer(-legal)`, `.primary-action`, `.section-heading` | `styles.css` | **No** — shared with every live page. Guide System v1 does not change site chrome; if chrome changes are ever wanted, that's a separate, live-site-affecting decision |

## Step 2 — Recommended styling strategy

**Option D: generated-page scoped styles (already supported).**

Why D over the alternatives:
- **vs. A (existing classes only):** D *is* A plus the right delivery mechanism — the existing `.guide-*` classes are exactly what v1 restyles, and `guideCss()` is where their rules already live. No new classes needed.
- **vs. B (`.iberigo-guide-v1` wrapper):** a wrapper adds insurance only if v1 rules were going into the shared `styles.css`. They aren't. Adding a wrapper on top of an already page-scoped inline block is redundant complexity.
- **vs. C (separate stylesheet file):** a new `guide-v1.css` file would work but adds a second HTTP request, a cache-busting concern, and a new asset to deploy — for no isolation benefit over the inline block the pages already carry.

One consequence to accept, documented deliberately: **`guideCss()` is shared by all 21 generated pages, not just Group 1.** Applying v1 will visually change every draft page at once. This is acceptable because all 21 are `noindex,nofollow` drafts (no public exposure), and it's actually desirable for consistency — but the *visual QA commitment* remains scoped to Group 1's five pages; the other 16 get QA'd when their groups approach publication.

## Step 3 — Group 1 page structure check

All five pages are generator-built and share identical component classes, so one `guideCss()` change covers all of them uniformly.

| Page | Wrapper/container | Cards | CTAs | Warning/info/source blocks | Tables | Mobile risks | Can safely receive v1? |
|---|---|---|---|---|---|---|---|
| `/start-here/` | `.app-shell` > `.guide-main` > `.guide-layout` | `.guide-info-card` in `.guide-card-grid` (persona cards) | `.guide-button`, `.guide-button--secondary` | info box only; no source blocks | None | Persona card grid must stack cleanly; 7 cards is the longest grid in Group 1 | **Yes** |
| `/moving-to-spain/documents-checklist/` | same | `.guide-info-card`, `.guide-box--checklist` (two long checklists) | same | warning + info boxes; **4 official-source cards** + Source status note | None | Long checklists need comfortable line-height at 390px | **Yes** |
| `/moving-to-spain/finding-accommodation/` | same | `.guide-info-card` (8-card scam section is the longest) | same | multiple warning boxes (scam/deposit cautions — check "calm, not alarming") | None | 8-card grid stacking | **Yes** |
| `/moving-to-spain/settling-into-spain/` | same | `.guide-info-card` (3-per-section pattern) | many cross-link CTAs — tap-target consistency matters most here | warning + info boxes | None | Densest CTA count in Group 1 | **Yes** |
| `/living-in-spain/opening-a-bank-account/` | same | `.guide-info-card`, `.guide-box--checklist` | same | warning + info boxes | **`.guide-table`** (online vs. traditional banks) — the existing 640px rule converts table cells to stacked blocks; verify that still reads well under v1 | Table is the main 390px risk | **Yes** |

## Step 4 — Live indexed page exposure

Checked whether v1 selectors could affect: the homepage, live `/guides/*` pages, The Spain Files (including its ES version and Torrevieja article), and legacy indexed pages.

- **Inline `guideCss()` changes: zero exposure.** Live pages don't include the block. Verified by class census: across all live HTML (homepage, `guides/`, `the-spain-files/`, `support/`, `404.html`), the only guide-prefixed class present is `guide-card-panel` — nothing else from the v1 rule set appears in live markup.
- **Residual risks, all avoidable by policy:**
  1. Touching `.guide-card-panel` or `.panel` in `styles.css` → would restyle the homepage's guide cards and every legacy panel. **Forbidden**; override the draft hero via `.guide-hero` inline instead.
  2. Touching chrome classes (`.topbar`, `.site-footer`, etc.) in `styles.css` → site-wide effect. **Forbidden** in v1 scope.
  3. `the-spain-files/index.html` has its own inline style block — unrelated, and untouched as long as we never edit live HTML files.

## Step 5 — Implementation plan (for the future CSS sprint — not executed now)

1. Edit only `guideCss()` in `scripts/guide-components.js` (and, if the search page needs matching polish, `searchCss()` in `scripts/search-components.js`).
2. Run `node scripts/generate-guide-system.js` — regenerates the 21 draft pages with the new inline styles.
3. Verify via `git status` that **only generated draft pages + the two script files changed** — if `styles.css` or any live HTML file shows as modified, stop: something is out of scope.
4. Run the Group 1 visual QA checklist from `docs/IBERIGO_GUIDE_SYSTEM_V1.md` (§8) at desktop and ~390px widths.
5. Confirm all draft pages still carry `noindex, nofollow` (styling must not touch head metadata).

### Unsafe selectors to avoid (never modify in `styles.css` for this work)
`.panel`, `.guide-card-panel`, `.app-shell`, `.topbar`, `.brand-lockup`, `.brand-wordmark`, `.brand-wordmark-accent`, `.language-switcher`, `.site-footer`, `.site-footer-legal`, `.primary-action`, `.section-heading` — plus, categorically, **any rule in `styles.css` at all**: the v1 sprint should not open that file.

### Safe selectors/wrappers to use (all inside `guideCss()`)
All existing `.guide-*` component classes (except relying on `.guide-card-panel` — override via `.guide-hero`), `.last-reviewed`, `.search-nav-link`, and any *new* classes introduced via the generator (new classes are safe by definition, since only generated pages can emit them).

### Pages affected
All 21 generated draft pages (uniformly), including the 5 Group 1 pages that get formal visual QA.

### Pages explicitly NOT affected
Homepage (`index.html`), all live `/guides/*` pages (EN + ES), The Spain Files (EN + ES + Torrevieja), `support/`, `404.html` — none of them load `guideCss()`, and `styles.css` is not being edited.

### Rollback plan
`git revert` the generator commit(s), re-run `node scripts/generate-guide-system.js`, commit the regenerated pages. Because styles are inline in the HTML, rollback is atomic with the HTML itself — no separate CSS cache-busting or version-bump needed, and no possibility of a stale-stylesheet mismatch.

### Post-implementation visual QA checklist
Use `docs/IBERIGO_GUIDE_SYSTEM_V1.md` §8 (per-page: desktop, mobile ~390px, spacing, cards, typography hierarchy, CTAs, source blocks, warning/info blocks, v1 consistency), plus the scope-safety checks from step 3 of the implementation plan above (git-status scope check, `styles.css` untouched, `noindex` intact).

---

## Confirmation

- No CSS or visual changes were made in this sprint — audit and documentation only.
- All 22 draft pages remain `noindex, nofollow`.
- No PR was opened. No merge was performed.
