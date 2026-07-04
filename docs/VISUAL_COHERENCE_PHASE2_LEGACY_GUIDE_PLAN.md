# Visual Coherence Phase 2 — Legacy Guide Structure Plan

**Status: Job-search static rendering POC launched — production verified**

This document plans (does not implement) a fix for the structural gap identified
in `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md`: the legacy `/guides/*` pages are
homepage clones with no static per-guide content, relying entirely on
client-side JavaScript to render their actual text. This is planning only —
no legacy guide changes, no redirects, no migration, no indexing changes, and
no edits to `sitemap.xml`, `search-index.json`, `robots.txt`, `styles.css`, or
`app.js` were made while producing this document.

**Sprint 116 update (2026-07-04):** PR #30 was squash-merged into `main` (merge commit `63afe68`) and verified on production. The selected legacy route pair (`/guides/job-search/`, `/guides/es/job-search/`) now serves real static guide body content while preserving the existing URL, metadata, canonical, hreflang, sitemap presence, and client-side enhancement behavior. The audit remains scoped at exactly **2/70** static body content routes, with **68/70** legacy routes unchanged. Production checks confirmed the selected routes and regression routes return `200`; JS-enabled rendering has no duplicate title/list/disclaimer/links; five launched Group 1 pages remain `index, follow`; generated draft/noindex surfaces remain `noindex, nofollow`. No full legacy migration happened, no additional pages were published, no redirects were added, and `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, and `robots.txt` were unchanged.

**Sprint 109 update (2026-07-04):** this plan's recommended first PR — a
read-only validation/report script — was built and run. See
`scripts/audit-legacy-guides.js` and `docs/LEGACY_GUIDE_AUDIT_REPORT.md` for
the script and its findings (70 live legacy URLs: 35 English, 35 Spanish;
full metadata coverage; zero static body content; zero noscript fallback on
any page). No legacy guide page, `app.js`, or `styles.css` was changed; no
redirects, migration, or indexing changes were made. The recommended next
step remains the single-route static-rendering proof-of-concept described
below, as its own separately-scoped sprint.

**Sprint 110 update (2026-07-04):** PR #27 was squash-merged into `main` (commit `c3b48b1`) and verified live: production homepage, `/guides/banking/`, `/guides/es/banking/`, `/guides/eu-registration/`, `/guides/es/eu-registration/`, `/start-here/`, `/the-spain-files/`, and `/support/` all return `200`; all 5 launched pages remain `index, follow`; sampled drafts remain `noindex, nofollow`; `sitemap.xml`, `search-index.json`, `robots.txt`, `styles.css`, and `app.js` are all byte-identical to `main` in production. Rerunning the audit script on updated `main` reproduces identical findings. No legacy guide migration has happened.

**Sprint 112 update (2026-07-04):** the audit script's recommended next step — a single-route static-rendering proof of concept — was planned in `docs/LEGACY_STATIC_RENDERING_POC_PLAN.md`. Recommended candidate: `/guides/job-search/` plus its Spanish mirror `/guides/es/job-search/`; recommended implementation method: a hybrid (static content + existing JS enhancement kept in place) built via a small generator script. This sprint is planning only: no legacy guide page, `app.js`, or `styles.css` was changed; no redirects, migration, or indexing changes were made. No PR opened, no merge performed.

## Goal

Define a safe, incremental path to give legacy `/guides/*` pages real static
content (or build-time-rendered content) instead of depending on client-side
`data-guide-id` population — without breaking any of the 70 live, indexed
legacy URLs, without redirects, and without bundling a styling change into a
structural one (per the audit's explicit guardrail).

## Current legacy guide structure — summary

- Every legacy guide page (`/guides/{name}/` and `/guides/es/{name}/`) ships
  **byte-identical `<body>` HTML** — a full clone of the homepage shell
  (hero situation cards, wizard UI, documents/sources sections).
- The only per-page difference in the static HTML is in the `<head>`:
  `data-guide-id`/`data-guide-lang` attributes on `<html>`, and unique
  `<title>`, `<meta name="description">`, `<link rel="canonical">`,
  `<link rel="alternate" hreflang>`, and Open Graph tags.
- At runtime, `app.js` (lines 3765–3792) reads `data-guide-id` off
  `document.documentElement`, looks the id up in the in-file `routes` array
  (`app.js:1`–`1428`, a ~1400-line inline JS data structure) or in
  `directRoadmapFor()`, and calls `renderRoadmapCard()` to inject the actual
  guide content into the wizard-result card client-side.
- **There is no static or `<noscript>` fallback content anywhere in the body.**
  A crawler or user that does not execute JavaScript sees the homepage shell
  with no guide-specific text at all.
- Metadata (title, description, canonical, hreflang, Open Graph) is already
  unique and correct per page in the static HTML — this is not part of the gap.
  Search snippets and social-preview cards (which typically read `<head>`
  without executing JS) already work correctly today.

## Full route inventory

**Correction to a prior estimate:** earlier docs (this audit, `BACKLOG.md`)
referred to "37 legacy directories." Direct inspection during this sprint
found **35 English topic directories**, each mirrored under `/guides/es/`,
for **70 live legacy URLs total** (35 × 2 languages). All 70 appear in
`sitemap.xml`. The "37" figure appears to have been an approximation and is
superseded by this inventory.

All 35 topics return `200` locally (verified via file presence — every
directory has an `index.html`) and were spot-checked live in production
(`banking`, `es/banking`, `eu-registration`, `vacation-booking` all `200`).
All pages depend on `data-guide-id` (see mechanism above). All are indexable
(no `noindex` found in any legacy page's static HTML — legacy pages were
never part of the Group 1 draft/published `robots` system, which only governs
Guide System v1 pages).

| Topic (`/guides/{topic}/`) | Guide System v1 overlap | Risk if changed |
|---|---|---|
| `banking` | `/living-in-spain/opening-a-bank-account/` (**launched**) | High — has a live published counterpart; canonical/duplicate-content decision needed |
| `eu-registration` | `/moving-to-spain/eu-registration/` (draft) | Medium — counterpart exists but unpublished |
| `padron` | `/moving-to-spain/registering-on-the-padron/` (draft) | Medium |
| `digital` | `/living-in-spain/digital-certificate/` (draft) | Medium |
| `social-security` | `/living-in-spain/social-security/` (draft) | Medium |
| `taxes` | `/living-in-spain/taxes/` (draft) | Medium |
| `eu-family` | `/moving-to-spain/family-member-eu-citizen/` (draft) | Medium |
| `digital-nomad` | `/moving-to-spain/digital-nomad-spain/` (draft) | Medium |
| `driving-licence-exchange` | `/living-in-spain/driving/` (draft, conceptual overlap) | Medium |
| `study` | `/moving-to-spain/students/` (draft, conceptual overlap) | Low-medium |
| `work-authorization` | `/moving-to-spain/work-in-spain/` (draft, conceptual overlap) | Low-medium |
| `nie`, `nie-only`, `tie`, `tie-after-approval`, `non-lucrative`, `vida-laboral`, `job-search`, `phone`, `renting-home`, `family`, `ehic-card`, `private-health`, `sip-card`, `eu-working` | No direct Guide System v1 route currently defined | Low — no duplicate-content question, but still a live indexed page |
| `eu-vacation`, `non-eu-vacation`, `vacation-booking`, `vacation-citizenship`, `vacation-entry`, `vacation-flights`, `vacation-ground`, `vacation-hotels`, `vacation-reviews`, `vacation-tourism` | None (Vacation in Spain has no Guide System v1 presence at all — tracked separately as Phase 3) | Low, but highest page count (10 of 35 topics) |

Each topic also has a Spanish mirror at `/guides/es/{topic}/` with identical
structure and risk profile.

**Risk-ranking logic:** a topic is higher risk if a newer, differently-worded
Guide System v1 page already exists for the same subject, since any future
static rendering of the legacy page risks either (a) diverging content between
two indexed pages about the same topic, or (b) an implicit canonical/duplicate
decision that hasn't been made yet. Topics with no overlap are lower risk to
touch first because there is no duplicate-content question.

## Rendering mechanism — findings

- **Files containing legacy guide HTML:** `guides/{topic}/index.html` and
  `guides/es/{topic}/index.html`, 70 files total, all homepage-shell clones.
- **`data-guide-id` usage:** set once per page on `<html>` at generation time
  (no generator script currently found for these — they appear to be
  hand-cloned or produced by a since-removed/undocumented tool); read once at
  runtime by the IIFE at `app.js:3765-3792`.
- **Content source:** the `routes` array literal at the top of `app.js`
  (lines 1–1428) plus helper functions `roadmapFor()` (1428), `directRoadmapFor()`
  (1811), `renderRoadmapCard()` (1766), `showDirectGuide()` (3447). Content is
  therefore embedded in application JavaScript, not in a separate data file.
- **Titles/meta/canonicals:** handled correctly today, per-page, in static
  HTML — no gap here.
- **Works without JavaScript:** no. No `<noscript>` block exists; the guide
  content section is empty until `app.js` runs.
- **Search engines:** get the shell + correct `<head>` metadata, but not the
  actual guide text unless the crawler executes JavaScript and waits for the
  wizard-result render to complete.
- **Social previews:** work correctly today (Open Graph tags are static and
  already unique per page).
- **Unique vs. cloned HTML:** `<head>` is unique per page; `<body>` is fully
  cloned across all 70 pages (confirmed via diff — zero body differences
  between sampled pages).

No part of this mechanism was changed while producing this document.

## Migration options

### Option A — Leave legacy guides as-is for now
- **Benefits:** zero risk, zero engineering cost, preserves current stable behavior.
- **Risks:** structural/SEO gap persists indefinitely; crawlers that don't render JS continue to see empty guide pages.
- **Files touched:** none.
- **SEO/indexing implications:** no change (neutral, not a fix).
- **Rollback plan:** not applicable.
- **Recommended QA scope:** none required.

### Option B — Add static wrappers gradually
- **Benefits:** preserves every existing route and URL exactly; each page gets real static content without a wholesale rewrite; can be rolled out one topic at a time and independently verified; lowest-risk path to closing the SEO gap.
- **Risks:** requires a content source of truth per topic (likely extracted from the existing `app.js` `routes`/roadmap data) and a build step to inject it; risk of content drift between the static wrapper and the JS-rendered version if not kept in sync; medium engineering effort.
- **Files touched:** new build script (e.g. `scripts/generate-legacy-guide-static.js`), the specific `guides/{topic}/index.html` and `guides/es/{topic}/index.html` files touched per rollout batch. `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, `robots.txt` untouched.
- **SEO/indexing implications:** positive — crawlers now see real content without executing JS; no redirect or canonical change needed since the URL doesn't move.
- **Rollback plan:** revert the specific topic's `index.html` file(s) to the prior homepage-shell clone; no route or index change to undo.
- **Recommended QA scope:** per-topic diff of rendered vs. static content, visual QA at 1280px/390px, curl-based `200`/robots check, confirm `app.js`'s client-side auto-population still works identically on top of the new static content (progressive enhancement, not replacement).

### Option C — Migrate selected legacy guides into Guide System v1
- **Benefits:** highest structural and visual coherence; content becomes maintained in one system going forward.
- **Risks:** highest — requires a route/canonical decision for every topic that already has a Guide System v1 counterpart (7–9 topics per the overlap table above), content review/rewrite for tone and accuracy, and a publication decision (draft vs. published) per migrated page; touches `scripts/generate-guide-system.js` and potentially `sitemap.xml`/`search-index.json` if new routes are published.
- **Files touched:** `scripts/generate-guide-system.js`, `scripts/guide-components.js`, generated Guide System pages, potentially the legacy `guides/{topic}/index.html` (if redirected or retired), `sitemap.xml`, `search-index.json`.
- **SEO/indexing implications:** significant — requires explicit canonical/redirect decisions to avoid duplicate content or losing existing indexed URLs' authority; out of scope for a first PR under this sprint's constraints (no redirects, no migration).
- **Rollback plan:** complex — would need to restore original legacy pages and reverse any sitemap/publication changes.
- **Recommended QA scope:** full launch-safety checklist (as used for Group 1), plus duplicate-content review, plus redirect verification if redirects are ever introduced (not in this phase).

### Option D — Hybrid (keep routes stable, generate static output from existing legacy content, migrate later after review)
- **Benefits:** combines Option B's low risk with a clear path toward Option C later; keeps legacy routes and URLs completely stable now while building the tooling and content review needed for an eventual migration decision.
- **Risks:** two-step effort (build static rendering now, decide on migration later) means work could stall between steps; requires the same content-source extraction as Option B.
- **Files touched:** same as Option B initially; `scripts/generate-guide-system.js` only touched later, if and when a migration decision is made.
- **SEO/indexing implications:** same positive effect as Option B in the near term; defers the harder duplicate-content/canonical questions from Option C without blocking them.
- **Rollback plan:** same as Option B for the initial step.
- **Recommended QA scope:** same as Option B for the initial step; Option C's full checklist only if/when migration is later decided.

**Comparison:** Option A fixes nothing. Option C is the highest-value long-term outcome but carries redirect/canonical/publication risk this phase's constraints explicitly forbid touching yet. Option B and Option D are functionally the same first step — Option D just makes explicit that migration (Option C) may follow later after separate review. **Option B/D is the right direction for Phase 2's first implementation; Option C should remain a distinct, future, separately-scoped decision.**

## Recommended Phase 2 first implementation

Given the size of the gap (70 live pages, all with the same defect) and the
explicit instruction to avoid a large first PR, the safest possible starting
point is not a content change at all, but a **validation/report script**,
followed — only after that's reviewed — by a single-route static-rendering
proof of concept.

**Recommended Phase 2 first PR: "Legacy guide metadata & JS-dependency validation report"**

Scope:
- A new read-only Node script (e.g. `scripts/audit-legacy-guides.js`) that,
  for every `guides/{topic}/` and `guides/es/{topic}/` directory:
  - confirms `index.html` exists and is well-formed
  - extracts and reports `data-guide-id`, `title`, `meta description`,
    canonical, and hreflang values
  - confirms the `data-guide-id` has a matching entry in `app.js`'s `routes`
    array (catching any silently-broken id before it becomes a 404-of-content)
  - flags topics that already have a Guide System v1 overlap (duplicate-content
    candidates, per the table above)
  - outputs a report (e.g. `docs/LEGACY_GUIDE_AUDIT_REPORT.md` or console output)
- No `index.html` files are modified. No `app.js`, `styles.css`, `sitemap.xml`,
  `search-index.json`, or `robots.txt` changes.
- Fully previewable and reversible (it's a new script plus a generated report;
  deleting the script/report is a full rollback).

**Only after that report is reviewed**, the next candidate PR would be:

**Follow-up candidate: "Legacy guide static-rendering proof-of-concept for one route"**

Scope:
- Choose **one low-risk topic with no Guide System v1 overlap** — e.g.
  `job-search`, `phone`, or `renting-home` (no duplicate-content question,
  low page count doesn't matter since we're testing mechanism, not scale).
- Preserve the exact URL (`/guides/{topic}/` and `/guides/es/{topic}/`).
- Generate static content for that route's `<body>` from the existing
  `app.js` `routes` data (read-only extraction, not a rewrite), while leaving
  `app.js`'s client-side rendering in place as progressive enhancement.
- No redirects. No sitemap/search-index change (the route already exists and
  is already indexed). No change to any other of the 69 remaining legacy pages.
- Compare production vs. preview carefully: static HTML must render
  equivalent content to what `app.js` currently produces client-side, at
  1280px and 390px, with and without JavaScript.
- No migration of any other legacy guide in the same PR.

This two-step sequence (report, then single-route proof of concept) keeps
every individual PR small, reversible, and independently reviewable, matching
this sprint's "do not implement yet" constraint while giving Phase 2 a
concrete, low-risk on-ramp.

## File-risk map

| File | Touched by recommended first PR? | Touched by follow-up PoC? | Notes |
|---|---|---|---|
| `scripts/audit-legacy-guides.js` (new) | Yes (created) | No | Read-only, no side effects |
| `docs/LEGACY_GUIDE_AUDIT_REPORT.md` (new, optional) | Yes (created) | No | Generated report only |
| `guides/{topic}/index.html`, `guides/es/{topic}/index.html` | No | Yes — exactly one topic's 2 files | Highest-blast-radius file set (70 total); touch one topic at a time |
| `app.js` | No | No (read-only source for extraction) | Never edited in Phase 2's first steps |
| `styles.css` | No | No | Out of scope — this is a structural fix, not a styling one |
| `sitemap.xml`, `search-index.json`, `robots.txt` | No | No | Routes already exist and are already indexed; no change needed |
| `scripts/generate-guide-system.js` | No | No | Only relevant if/when Option C migration is later decided |

## SEO/indexing safety notes

- No legacy URL changes, so no redirect or canonical decisions are forced by
  the recommended first PR or its proof-of-concept follow-up.
- Adding static content to a page that a crawler could already index (via
  head metadata) is a net-positive, low-risk SEO change — it does not create
  new indexable surface area, it improves what's already indexed.
- Duplicate-content risk only arises for topics with a Guide System v1
  overlap (see table) — the recommended proof-of-concept route is deliberately
  chosen to have no overlap, avoiding this question entirely for the first PoC.
- `robots` meta on legacy pages is untouched by this plan; legacy pages are
  not part of the Group 1 `publishedRoutes` system and were never `noindex`.

## QA checklist (for the recommended first PR and its follow-up)

- [ ] `node scripts/generate-guide-system.js` still passes with zero drift
- [ ] New audit script runs without errors and produces a report
- [ ] All 35 topics (70 URLs) still return `200` after the audit script is added (no side effects expected, but verify)
- [ ] `sitemap.xml`, `search-index.json`, `robots.txt` unchanged
- [ ] `app.js`, `styles.css` unchanged
- [ ] For the follow-up PoC: static content visually matches the current JS-rendered content at 1280px and 390px
- [ ] For the follow-up PoC: page still works identically with JavaScript enabled (progressive enhancement, not a replacement)
- [ ] For the follow-up PoC: the other 69 legacy URLs are unaffected
- [ ] No redirects introduced anywhere
- [ ] No `noindex`/`nofollow` changes anywhere

## Rollback plan

- First PR (audit script): delete `scripts/audit-legacy-guides.js` and any
  generated report file. No other state to restore.
- Follow-up PoC: revert the one topic's two `index.html` files
  (`guides/{topic}/index.html`, `guides/es/{topic}/index.html`) to their
  prior homepage-shell-clone content. No sitemap/search-index/robots change
  to undo since none was made.

## Out of scope (this document and its recommended first PR)

- Migrating any legacy guide into Guide System v1 (Option C) — a distinct future decision.
- Adding redirects of any kind.
- Publishing additional pages or changing any page's `robots` status.
- Changing `sitemap.xml`, `search-index.json`, or `robots.txt`.
- Editing `styles.css` or `app.js`.
- Vacation/Live dedicated landing pages (tracked separately as Phase 3).
- Further homepage card redesign (tracked separately as Phase 4).

## Future phases

- **Phase 2 (this document):** legacy `/guides/*` structural fix — planned, implementation pending, to proceed via the small validation-script-then-single-route-PoC sequence above.
- **Phase 3:** Vacation in Spain / Live in Spain dedicated Guide-System-style landing pages (currently these are wizard presets only, per the sitewide audit).
- **Phase 4:** further homepage card redesign beyond the Phase 1 coherence pass already shipped.

**Sprint 114 update (2026-07-04):** the recommended candidate (`/guides/job-search/` + `/guides/es/job-search/`) was implemented via `scripts/render-legacy-static-poc.js` on branch `visual-coherence/job-search-static-poc`. Only those two files changed; `<head>` metadata, canonical, hreflang, sitemap presence, `app.js`, and `styles.css` are all unchanged. `scripts/audit-legacy-guides.js` was corrected to detect this kind of static-content change and now reports 2/70 pages with static body content, 68/70 unchanged. Preview QA is required before merge; this remains a one-route-pair proof of concept, not a migration.

**Sprint 115 update (2026-07-04):** PR #30 (commit `970a330`) passed preview QA with no issues found — static content, no double-rendering, unchanged metadata/sitemap/search-index/robots.txt/app.js/styles.css, and a clean audit script result (2/70 static body content, 68/70 unchanged) all confirmed on the Netlify deploy preview. PR remains unmerged, pending a merge decision.
