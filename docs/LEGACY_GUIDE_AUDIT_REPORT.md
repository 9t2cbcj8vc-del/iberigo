# Legacy Guide Audit Report

**Status: Legacy guide audit script launched**

**Sprint 110 update (2026-07-04):** PR #27 was squash-merged into `main` (commit `c3b48b1`) and verified on production. Rerunning `node scripts/audit-legacy-guides.js` on updated `main` exits `0` and reproduces identical findings (70 URLs, 35 English, 35 Spanish, full metadata coverage, 0/70 static body content, 0/70 noscript fallback) — only the report's `generatedAt` timestamp differs between runs, as expected. No legacy guide page, `app.js`, or `styles.css` was changed; no redirects, migration, or indexing changes were made.

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
