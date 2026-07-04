# Legacy Guide Audit Report

**Status: Job-search static rendering POC launched — production verified**

**Sprint 118 update (2026-07-04):** rollout planning was completed in `docs/LEGACY_STATIC_RENDERING_ROLLOUT_PLAN.md`. The audit baseline remains **2/70** static-body-content routes, with only the job-search EN+ES pair rendered statically and the remaining **68/70** legacy routes still client-side-only in the body. The plan inventories the remaining route pairs, classifies overlap/content risk, and recommends a one-pair `phone` follow-up before any small-batch rollout. Planning only: no additional static pages were added, no legacy guide HTML was changed, and there were no `app.js`, `styles.css`, redirect, sitemap, search-index, robots, publication, or full-migration changes.

**Sprint 116 update (2026-07-04):** PR #30 was squash-merged into `main` (merge commit `63afe68`) and verified on production. Rerunning `node scripts/audit-legacy-guides.js` on updated `main` exits `0` and confirms exactly **2/70** pages with static guide body content: `/guides/job-search/` and `/guides/es/job-search/`. The remaining **68/70** legacy routes retain the baseline `missing-static-guide-body-content, missing-noscript-fallback` state. Production route checks confirmed the selected EN+ES job-search pair returns `200`, ships static guide body content in raw HTML, preserves canonical and hreflang metadata, and renders with JavaScript enabled without duplicated guide content. Regression routes (`/`, `/start-here/`, `/the-spain-files/`, `/support/`, `/guides/banking/`, `/guides/es/banking/`, `/guides/eu-registration/`, `/guides/es/eu-registration/`) all returned `200`. No full legacy migration happened, no additional pages were published, no redirects were added, and `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, and `robots.txt` were unchanged.

**Sprint 110 update (2026-07-04):** PR #27 was squash-merged into `main` (commit `c3b48b1`) and verified on production. Rerunning `node scripts/audit-legacy-guides.js` on updated `main` exits `0` and reproduces identical findings (70 URLs, 35 English, 35 Spanish, full metadata coverage, 0/70 static body content, 0/70 noscript fallback) — only the report's `generatedAt` timestamp differs between runs, as expected. No legacy guide page, `app.js`, or `styles.css` was changed; no redirects, migration, or indexing changes were made.

**Sprint 112 update (2026-07-04):** the recommended next step from this report — a single-route static-rendering proof of concept — was planned in `docs/LEGACY_STATIC_RENDERING_POC_PLAN.md`. Recommended candidate: `/guides/job-search/` plus `/guides/es/job-search/`. This baseline report's findings (0/70 static body content, 0/70 noscript fallback) remain the "before" state that the future implementation PR will be measured against by rerunning this audit script. Planning only — no legacy guide page, `app.js`, or `styles.css` was changed.

**Sprint 114 update (2026-07-04):** implemented the job-search static-rendering POC on branch `visual-coherence/job-search-static-poc`. `scripts/audit-legacy-guides.js`'s `hasStaticGuideContent` check was corrected: it previously required the page's meta description text to appear verbatim in the body, which the new static content (written independently, not as a copy of the meta description) would have missed. The check now instead detects whether the `#wizardResult` placeholder (`class="result-card is-empty"` / "Your roadmap will appear here") has been replaced — a more accurate and more generally reusable signal for any future static-rendering route. Rerunning the audit script after implementation shows: **2/70** pages with static guide body content (`/guides/job-search/`, `/guides/es/job-search/`), **68/70** unchanged from the baseline above. The `isHomepageShellClone` metric is unchanged by design — job-search's situation cards and wizard form are still present in the body (only `#wizardResult` was replaced), so it still correctly reports the shared shell markup; the static-content improvement is captured by `hasStaticGuideContent`, not by that metric. No other legacy page, `app.js`, or `styles.css` was changed.

**Sprint 115 update (2026-07-04):** preview-QA'd PR #30 on `https://deploy-preview-30--iberigo.netlify.app`. Rerunning `node scripts/audit-legacy-guides.js` (locally, on the checkout confirmed to match the PR's exact commit SHA `970a330`) exits `0`, is deterministic apart from `generatedAt`, and confirms exactly 2/70 pages with static body content (only the job-search pair), 68/70 unchanged from baseline. No finding was weakened. No fixes were needed.

## Purpose

This report documents the first output of `scripts/audit-legacy-guides.js`,
the read-only validation/report script recommended as Phase 2's first
implementation step in `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md`.
The script inspects the legacy `/guides/*` pages on disk and produces a
machine-readable inventory (`reports/legacy-guide-audit.json`) plus a console
summary, so future migration decisions are based on measured data rather than
estimates. It does not modify any file.

## Script and command

- Script: `scripts/audit-legacy-guides.js`
- Command: `node scripts/audit-legacy-guides.js`
- Output: console report + `reports/legacy-guide-audit.json`
- Read-only: uses only local filesystem reads (`fs.readdirSync`,
  `fs.readFileSync`) and one write to its own report file under `reports/`.
  Makes no network requests, launches no browser, and does not modify any
  `guides/*`, `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, or
  `robots.txt` file.
- Exit behavior: exits `0` on successful completion, regardless of findings
  (missing static content, missing noscript, etc. are expected findings, not
  script failures); exits non-zero only if the `guides/` directory itself is
  missing (a genuine runtime failure).

## Summary of findings

| Metric | Count |
|---|---|
| Total legacy guide URLs | 70 |
| English legacy guide URLs | 35 |
| Spanish legacy guide URLs (`/guides/es/*`) | 35 |
| Pages with `index.html` | 70 / 70 |
| Pages present in `sitemap.xml` | 70 / 70 |
| Pages with a `<link rel="canonical">` | 70 / 70 |
| Pages with a meta description | 70 / 70 |
| Pages with complete hreflang (en / es / x-default) | 70 / 70 |
| Pages with `data-guide-id` on `<html>` | 70 / 70 |
| Pages with static guide content in `<body>` | **0 / 70** |
| Pages with a `<noscript>` fallback | **0 / 70** |
| Pages matching the homepage-shell-clone pattern | 70 / 70 |
| Pages with at least one risk flag | 70 / 70 |

This confirms, with measured data rather than estimate, the structural gap
identified in the sitewide visual coherence audit: **every** legacy guide
page has complete, unique, correct `<head>` metadata (title, description,
canonical, hreflang, `data-guide-id`), and **every** legacy guide page ships
zero static guide-specific content in its `<body>` and no `<noscript>`
fallback. The route count also confirms and finalizes the correction made in
Sprint 107: 35 English topics, mirrored under `/guides/es/`, for 70 total
live indexed URLs (not the earlier "37 directories" estimate).

## Key risks found

- **No content without JavaScript.** Every legacy guide page's actual guide
  text is injected entirely client-side by `app.js` reading `data-guide-id`.
  A crawler or user that doesn't execute JavaScript (or whose JS is slow/
  blocked) sees the homepage shell with no guide-specific text, on all 70
  URLs.
- **No `<noscript>` fallback anywhere**, so there is currently no safety net
  for the no-JS case on any of the 70 pages.
- **Metadata is not the risk.** Titles, descriptions, canonicals, hreflang,
  and `data-guide-id` are all present and correct on every page — this
  confirms the earlier audit's conclusion that the gap is purely structural
  (content-delivery mechanism), not a metadata/SEO-tagging problem.
- No unexpected `robots` meta tags were found on any legacy page (none of the
  70 pages carry a `robots` meta tag at all, which is expected and correct —
  legacy pages default to indexable, consistent with their presence in
  `sitemap.xml`).

## What this script does not change

- No `guides/*/index.html` or `guides/es/*/index.html` file was modified.
- `app.js` and `styles.css` were not touched.
- No redirects were added.
- No legacy guide was migrated.
- No additional pages were published.
- `sitemap.xml`, `search-index.json`, and `robots.txt` are all unchanged.
- No `noindex, nofollow` was removed from any non-selected draft.

**No legacy guide migration has happened as part of this sprint or this
script.** This is a read-only inventory only.

## Recommended next step

Per `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md`, since this audit's
findings are complete (no gaps in metadata coverage, no ambiguity in the
homepage-shell-clone detection — all 70 pages behave identically), the
recommended next step is the previously planned **single-route static
rendering proof-of-concept**: choose one low-risk legacy topic with no Guide
System v1 overlap (e.g. `job-search`, `phone`, or `renting-home`), preserve
its exact URL, and generate static `<body>` content for that one route while
leaving `app.js`'s client-side rendering in place as progressive enhancement.
That should remain its own separately-scoped sprint, not bundled with this
audit script.
