# Legacy Static Rendering POC Plan

**Status: Phone static rendering POC launched — production verified**

**Sprint 122 update (2026-07-04):** PR #33 was squash-merged into `main` (merge commit `fac61c9660dd908d41bf4ae68dfb8d83237ac1f7`) and verified in production. The selected EN+ES phone route pair (`/guides/phone/`, `/guides/es/phone/`) is now launched with static guide body content in raw HTML while preserving existing URLs, titles, descriptions, canonicals, hreflang, sitemap presence, robots state, `data-guide-id`, and JavaScript behavior. JS-enabled production checks confirmed no duplicated result card, title, list, provider links, or disclaimer; mobile checks found no horizontal overflow. The job-search EN+ES POC pair remains stable. `node scripts/audit-legacy-guides.js` exits `0` and reports exactly **4/70** static-body-content routes. No `app.js`, `styles.css`, redirects, sitemap, search-index, robots, full migration, or additional publication changes were made.

**Sprint 121 update (2026-07-04):** PR #33 preview QA passed on `https://deploy-preview-33--iberigo.netlify.app` at commit `65ac21ca9b831535cef6fa472ea18016ab0873a1`. Static HTML checks confirmed the phone EN+ES pair contains title/purpose, next-step guidance, provider links, and the legacy disclaimer directly in the body inside `#wizardResult`; the previous job-search POC pair remains static; unrelated banking EN+ES routes were not static-rendered. JS-enabled preview QA found one result card, one hero, one list, expected link counts, one disclaimer, no empty placeholder, no console errors, no horizontal overflow, and correct language-specific content at desktop and mobile widths. Audit output remains exactly **4/70** static-body-content routes. No protected files or publication surfaces changed, and PR #33 remains unmerged.

**Sprint 120 update (2026-07-04):** the second controlled static-rendering POC was prepared for `/guides/phone/` and `/guides/es/phone/`. The static content was transcribed from the existing `app.js` `goal === "phone"` branch and its provider metadata/link maps, and generated into the existing `#wizardResult` block only. The renderer now uses an explicit allowlist/selected-route structure: `job-search` remains the launched POC/regression route, and `phone` is the only selected target for this sprint. Audit output now reports exactly **4/70** static-body-content legacy routes: `/guides/job-search/`, `/guides/es/job-search/`, `/guides/phone/`, and `/guides/es/phone/`. The remaining **66/70** legacy routes are unchanged. No `app.js`, `styles.css`, redirects, sitemap, search-index, robots, full migration, or additional publication changes were made. Preview QA remains pending.

**Sprint 118 update (2026-07-04):** follow-up rollout planning was completed in `docs/LEGACY_STATIC_RENDERING_ROLLOUT_PLAN.md`. The plan keeps the live baseline at **2/70** static-body-content legacy routes (`/guides/job-search/` and `/guides/es/job-search/`) and recommends one additional low-risk EN+ES pair (`/guides/phone/` and `/guides/es/phone/`) as the next implementation PR, with a controlled allowlist-based renderer. Planning only: no additional static pages were added, no legacy guide HTML was changed, and there were no `app.js`, `styles.css`, redirect, sitemap, search-index, robots, publication, or full-migration changes.

**Sprint 116 update (2026-07-04):** PR #30 was squash-merged into `main` (merge commit `63afe68`) using the established branch-protection procedure: required approving reviews were temporarily set from 1 to 0, the PR was merged, then required approving reviews were immediately restored to 1 and confirmed. Production verification on `https://iberigo.eu` confirmed `/guides/job-search/` and `/guides/es/job-search/` return `200`, include meaningful static guide content in raw HTML, keep canonical and 3 hreflang links intact, and render with JavaScript enabled without duplicate `#wizardResult`, hero, or roadmap-list content. Regression routes (`/`, `/start-here/`, `/the-spain-files/`, `/support/`, `/guides/banking/`, `/guides/es/banking/`, `/guides/eu-registration/`, `/guides/es/eu-registration/`) all returned `200`. Rerunning `node scripts/generate-guide-system.js` and `node scripts/audit-legacy-guides.js` on updated `main` passed; the audit remains exactly **2/70** static body content routes (the job-search EN+ES pair only), with **68/70** unchanged. Five launched Group 1 pages remain `index, follow`; 17 generated draft/noindex surfaces remain `noindex, nofollow`. No full legacy migration happened, no additional pages were published, no redirects were added, and `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, and `robots.txt` were unchanged.

**Sprint 115 update (2026-07-04):** PR #30 (commit `970a330`) was preview-QA'd on `https://deploy-preview-30--iberigo.netlify.app`. View-source confirmed real static content (title, purpose, next-steps list, all 8 job-portal links, disclaimer) present in the raw HTML for both `/guides/job-search/` and `/guides/es/job-search/`, with `/guides/banking/` and `/guides/es/banking/` unaffected. JS-enabled QA (via the local checkout, confirmed to match the PR's exact commit SHA) showed no duplication — `renderRoadmapCard()` cleanly overwrites `#wizardResult` on load, exactly 1 title/1 disclaimer/1 list/8 job links after JS runs, console error-free, correct language rendering for both EN and ES. `<head>` metadata, canonical, hreflang, sitemap, search-index, and robots.txt all confirmed byte-identical to `main`. `node scripts/audit-legacy-guides.js` exits `0` with exactly 2/70 static body content (job-search pair only), 68/70 unchanged, report deterministic apart from `generatedAt`. Regression sample (homepage, `/start-here/`, `/the-spain-files/`, `/support/`) all `200` and visually unaffected, no Draft label leak. No issues found; no fixes were needed. PR #30 remains unmerged, pending a merge decision.

**Sprint 114 update (2026-07-04):** this plan's recommended candidate was implemented on branch `visual-coherence/job-search-static-poc`. `guides/job-search/index.html` and `guides/es/job-search/index.html` now ship real static guide content (title, purpose paragraph, next-steps list, 8 official job-portal links, disclaimer) inside the existing `#wizardResult` container, generated by the new `scripts/render-legacy-static-poc.js`. Content was transcribed directly from `app.js`'s `directRoadmapFor()` job-search branch and its `jobsMeta`/link-label/link-URL maps (documented with line references in the script), not hand-invented — a documented manual-transcription fallback, per the plan's Step 4 allowance, since `app.js` cannot be safely `require()`-d under plain Node (it executes top-level `document.querySelector` calls). `<head>` metadata (canonical, hreflang, title, description) is byte-identical to before on both files; only the `#wizardResult` block changed. `app.js` and `styles.css` were not touched — the static markup reuses existing classes (`result-hero`, `result-section`, `roadmap-list`, `route-links-note`, `province-links`, `jobs-link`) already styled in `styles.css` for this exact JS-rendered content, so no new CSS was needed. `scripts/audit-legacy-guides.js`'s `hasStaticGuideContent` check was corrected (see `docs/LEGACY_GUIDE_AUDIT_REPORT.md`) to detect the `#wizardResult` placeholder directly rather than relying on a meta-description substring match, which would have missed this change. Audit now reports 2/70 pages with static guide body content (both job-search pages), 68/70 unchanged. No other legacy page, `app.js`, or `styles.css` was touched; no redirects, migration, sitemap, search-index, or robots changes were made. Preview QA is required before merge.

This document plans (does not implement) a single-route static-rendering
proof of concept for the legacy `/guides/*` structural gap, per the
recommendation in `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md`. This
is planning only — no legacy guide page, `app.js`, or `styles.css` was
changed; no redirects, migration, or indexing changes were made while
producing this document.

## Goal

Prove, on exactly one low-risk legacy route (and decide whether to include
its Spanish mirror), that legacy `/guides/*` pages can ship real static
guide content in `<body>` — closing the no-JS/no-content gap the audit
quantified — without breaking the URL, metadata, indexing, or existing
client-side behavior of that route or any of the other 69 legacy pages.

## Current audit baseline

From `docs/LEGACY_GUIDE_AUDIT_REPORT.md` and `reports/legacy-guide-audit.json`
(`node scripts/audit-legacy-guides.js`):

- 70 legacy guide URLs total (35 English, 35 Spanish)
- 70/70 have `index.html`, sitemap presence, canonical, meta description,
  complete hreflang, and `data-guide-id`
- **0/70** have static guide content in `<body>`
- **0/70** have a `<noscript>` fallback
- 70/70 match the homepage-shell-clone pattern (identical body markup, only
  `<head>` differs)

This baseline is the "before" state the POC's acceptance criteria (Step 6)
will be measured against, using the same audit script.

## Candidate route comparison

Per `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md`'s risk table, the
lowest-risk candidates are legacy topics with **no Guide System v1
overlap**, since there is no duplicate-content or canonical question to
resolve. Three candidates were evaluated directly:

| | `/guides/job-search/` | `/guides/phone/` | `/guides/renting-home/` |
|---|---|---|---|
| Spanish mirror | `/guides/es/job-search/` | `/guides/es/phone/` | `/guides/es/renting-home/` |
| `data-guide-id` | `job-search` | `phone` | `renting-home` |
| In `sitemap.xml` (EN + ES) | Yes (1 + 1) | Yes (1 + 1) | Yes (1 + 1) |
| Guide System v1 overlap | None | None | None |
| Canonical | `https://iberigo.eu/guides/job-search/` | `https://iberigo.eu/guides/phone/` | `https://iberigo.eu/guides/renting-home/` |
| Title | "Job search in Spain — how to get started — IberiGo" | "Phone and internet in Spain — IberiGo" | "Renting a home in Spain — IberiGo" |
| Content source in `app.js` | `directRoadmapFor()`, `goal === "job-search"` branch (~line 1958) | `directRoadmapFor()`, `goal === "phone"` branch (~line 1984) | `directRoadmapFor()`, `goal === "renting-home"` branch (~line 1931) |
| Content shape | `process`, `explanation`, `steps[]` (4 items), `links[]` (8 items) — en/es | `process`, `explanation`, `steps[]` (4 items), `links[]` (6 items) — en/es | `process`, `explanation`, `steps[]` (4 items), `links[]` (4 items), `whatHappensNext` — en/es |
| Risk level | Low | Low | Low |
| Why suitable / not | Suitable — rich, complete bilingual content already exists; no overlap; simple content shape (no `whatHappensNext` field, slightly simpler than renting-home) | Suitable — rich, complete bilingual content; no overlap; simplest link list of the three | Suitable — rich, complete bilingual content; no overlap; has one extra field (`whatHappensNext`) that adds minor extraction complexity |

All three are equally low-risk and equally viable. **`renting-home` is not
recommended first** only because its extra `whatHappensNext` field makes the
extraction logic marginally more complex for a first attempt — better saved
for a second-route iteration once the POC's approach is validated.

**Recommended candidate: `/guides/job-search/`** (with its mirror
`/guides/es/job-search/` — see Step 3 below). It has the same content shape
as `phone` (no extra fields), sits in a subject area (employment) that's
self-contained and unlikely to change soon, and its `links[]` array (8 job
portal references) gives a good test of rendering a longer static list
without visual regression. `phone` remains an equally valid second-choice
candidate if `job-search`'s content turns out to need copy changes before
static rendering.

## EN-only vs EN+ES decision

**Recommended: Option B — one English route plus its Spanish mirror
(`/guides/job-search/` and `/guides/es/job-search/`).**

Reasoning:
- The two pages are otherwise perfectly symmetric (same `data-guide-id`,
  same content shape, same risk profile) — there is no safety reason to
  treat them differently.
- Testing only the English page would leave open the question of whether
  the static-rendering approach also works cleanly for the `es` locale
  branch of the same `directRoadmapFor()` content (different string source,
  same structure) — better to resolve that question in the POC itself than
  discover a locale-specific problem later during a wider rollout.
- The added risk of including the Spanish mirror is minimal: it is one more
  file of the same shape, not a new mechanism, and the rollback plan (Step
  "Rollback plan" below) covers both files identically.
- Scope stays small: 2 files touched total, not 70, and not even all of one
  topic's future rollout batch.

## Implementation method options

### Option 1 — Manual static HTML injection for one route
- **Benefits:** simplest possible change; fastest to review; fastest rollback (revert two files).
- **Risks:** content is hand-copied from `app.js` into HTML, so it can silently drift from the JS-rendered version if either is edited later without updating the other; no repeatability for the other 69 routes.
- **Files touched:** `guides/job-search/index.html`, `guides/es/job-search/index.html`.
- **Rollback plan:** `git checkout` those two files to their prior homepage-shell-clone content.
- **QA needs:** manual side-by-side comparison against the JS-rendered version to confirm no drift at the moment of writing.

### Option 2 — Small generator script that reads legacy data and writes one static route
- **Benefits:** the static content is generated from the same `app.js` source data (or a copy extracted from it) rather than hand-typed, reducing drift risk; establishes a repeatable pattern that could later generate all 70 routes from the same script, one topic at a time.
- **Risks:** higher upfront complexity (parsing or duplicating `app.js`'s `directRoadmapFor()` data structure into a script-readable form); a parsing bug could affect the one route it targets, though blast radius stays contained to that route only.
- **Files touched:** new script (e.g. `scripts/render-legacy-guide-static.js`), `guides/job-search/index.html`, `guides/es/job-search/index.html`.
- **Rollback plan:** revert the two generated HTML files; the script itself is inert until run again, so leaving it in place is harmless, but it can also be deleted.
- **QA needs:** confirm generated static content matches the current JS-rendered content exactly; confirm script is idempotent (running it twice produces the same output).

### Option 3 — Add noscript-only fallback first
- **Benefits:** lowest visual risk (a `<noscript>` block only shows when JS is disabled, so it cannot affect the normal browsing experience at all); very small, contained change.
- **Risks:** does not close the gap for search engines that don't execute JavaScript during crawling (most modern crawlers do execute JS, but not instantly, and not all — this option is a weaker fix for the SEO-facing part of the problem the audit flagged); still leaves 0 pages with real static body content by the audit's stricter definition.
- **Files touched:** `guides/job-search/index.html`, `guides/es/job-search/index.html` (add a `<noscript>` block only).
- **Rollback plan:** remove the `<noscript>` block.
- **QA needs:** confirm the block renders only with JS disabled and does not appear/duplicate with JS enabled.

### Option 4 — Hybrid: static content plus existing JS enhancement
- **Benefits:** likely the right long-term shape — static content is visible immediately and to non-JS clients/crawlers, while `app.js`'s existing client-side rendering continues to enhance the page for JS-enabled visitors (e.g. any interactive wizard behavior elsewhere on the page keeps working); closes the audit's gap fully, not partially.
- **Risks:** must explicitly avoid double-rendering — if `app.js`'s existing IIFE (`app.js:3765-3792`) still calls `renderRoadmapCard()` into the same DOM region that now already has static content, the static content and the JS-rendered content could appear stacked, or the JS injection could silently no-op/overwrite depending on how the wizard-result container is targeted. This must be checked carefully as part of the POC itself (see acceptance criteria).
- **Files touched:** `guides/job-search/index.html`, `guides/es/job-search/index.html`; possibly a small script per Option 2 to generate the static portion.
- **Rollback plan:** same as Option 1/2 — revert the two HTML files.
- **QA needs:** the most thorough of the four — must confirm both the no-JS view (static content visible, correct) and the JS-enabled view (no duplication, no visual break, existing interactive behavior intact).

**Recommended implementation method: Option 4 (hybrid), built using Option 2's approach (a small generator script), for the future implementation PR.**
Rationale: Option 3 alone doesn't satisfy the audit's actual finding (missing static body content, not just missing noscript). Option 1 risks silent content drift. Option 4 is the only option that actually closes the gap for both crawlers and no-JS users while keeping the existing JS-enhanced experience for everyone else — and building it via a small script (Option 2's method) keeps the content generation repeatable rather than hand-copied, which matters if this POC is later expanded to more routes. This sprint does not build this — it is the recommendation for the next, separately-scoped implementation sprint.

## File-risk map

| File | Risk level | Notes |
|---|---|---|
| `guides/job-search/index.html` | Medium | The one file whose `<body>` changes; must preserve `<head>` exactly |
| `guides/es/job-search/index.html` | Medium | Same, Spanish mirror |
| `scripts/render-legacy-guide-static.js` (new, future) | Low | New file, no existing behavior to break; read-only against `app.js` as a data source |
| `app.js` | **Avoid touching** | Not planned to be touched by the POC; only read as a data source. Any edit here would be sitewide-blast-radius and is explicitly out of scope unless a clear reason emerges during implementation |
| `styles.css` | **Avoid touching** | Not planned to be touched; static content should reuse existing classes already present in the homepage-shell body markup, not introduce new global styles |
| `scripts/audit-legacy-guides.js` | None (read-only) | Used to verify before/after, not modified |
| `reports/legacy-guide-audit.json` | Low | Will show updated counts (1/70 or 2/70 depending on metric) after a real implementation PR reruns the script; not touched by this planning sprint |
| `docs/*` | None (docs-only in this sprint) | This planning sprint's own scope |
| The other 68 legacy `/guides/*` pages | None | Explicitly not touched by the POC |
| `sitemap.xml`, `search-index.json`, `robots.txt` | None | Routes already exist and are already indexed; no change needed |

## Acceptance criteria (for the future implementation PR)

- `/guides/job-search/` (and `/guides/es/job-search/` if included) still returns `200`
- Canonical URL unchanged
- Hreflang links unchanged
- Title and meta description unchanged, unless a specific, justified reason is documented
- `sitemap.xml` unchanged
- `search-index.json` unchanged
- `robots.txt` unchanged
- The page now has meaningful static guide content in `<body>` (the audit script's `hasStaticGuideContent` check should pass for this route)
- No double-rendered content after `app.js` runs (the existing client-side `renderRoadmapCard()` injection must not duplicate or visually conflict with the new static content)
- Existing `app.js` client-side behavior for this route does not break (JS-enabled visitors see at least the same functionality as before)
- Spanish mirror behavior is either included (per this plan's recommendation) and verified, or explicitly and intentionally left unchanged with a documented reason
- All 68 unrelated legacy routes remain byte-identical (verified via diff, not just spot-check)
- Rerunning `scripts/audit-legacy-guides.js` shows improvement (static content present, and only) on the selected route/pair — no other route's audit result changes
- No additional pages are published
- No redirects are added

## QA checklist (for the future implementation PR)

- [ ] Local route check: `guides/job-search/index.html` (and ES mirror) exist and are well-formed
- [ ] Production/preview route check: both URLs return `200` on the Netlify deploy preview
- [ ] View-source/static HTML check: guide-specific text is present in the raw HTML response, not only after JS runs
- [ ] JS-enabled browser check: page renders normally, no visible duplication, existing interactive behavior (wizard, navigation) still works
- [ ] JS-disabled / no-JS fallback check: static content is visible and readable with JavaScript disabled
- [ ] Audit script before/after comparison: `node scripts/audit-legacy-guides.js` run before and after; diff the JSON report (excluding `generatedAt`) to confirm only the targeted route(s) changed
- [ ] `sitemap.xml` / `search-index.json` / `robots.txt` diffed against `main` — no changes
- [ ] Metadata/canonical/hreflang check: confirm unchanged via diff of the `<head>` section specifically
- [ ] Legacy route regression sampling: spot-check several of the other 69 legacy routes (both languages) for `200` and byte-identical HTML
- [ ] Guide System regression check: `/start-here/` and at least one other launched page unaffected
- [ ] Homepage regression check: homepage unaffected
- [ ] The Spain Files / Support regression check: both return `200` and render normally

## Rollback plan

- Revert `guides/job-search/index.html` and `guides/es/job-search/index.html` to their prior homepage-shell-clone content via `git checkout`.
- Delete or leave inert the generator script (Option 2) — it has no effect unless run, so leaving it is harmless, but removing it is also a valid part of a full rollback.
- No `sitemap.xml`, `search-index.json`, `robots.txt`, `app.js`, or `styles.css` changes to undo, since none are planned.

## Out of scope

- Migrating `job-search` (or any other topic) into Guide System v1 — a distinct, separate decision (Option C in the Phase 2 plan).
- Rendering static content for any of the other 69 legacy routes in the same PR.
- Any `app.js` or `styles.css` change, unless a clear, specific reason is found and separately justified during implementation.
- Redirects of any kind.
- Publishing additional pages or changing any page's `robots` status.
- Changing `sitemap.xml`, `search-index.json`, or `robots.txt`.

## Future expansion path

If the `job-search` POC succeeds against all acceptance criteria above:

1. Apply the same generator-script approach to `phone` and `renting-home` as a second small batch, to confirm the pattern generalizes across slightly different content shapes (e.g. `renting-home`'s extra `whatHappensNext` field).
2. Only after multiple low-risk topics are proven, consider a broader rollout schedule for the remaining no-overlap topics (Step 2's low-risk group in the Phase 2 plan).
3. Topics with Guide System v1 overlap (`banking`, `eu-registration`, `padron`, etc.) remain deferred until a separate canonical/duplicate-content decision is made — they are not part of this expansion path.
4. A decision on Option C (migrating some topics into Guide System v1 instead of static-rendering them in place) remains a distinct, future, separately-scoped choice.
