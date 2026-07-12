# Living in Spain Section — Readability Pass

**Date:** 2026-07-12
**Status:** Audit complete. **No structural changes were needed** — see findings below.
**Scope:** every Guide System page under the `/living-in-spain/` and `/es/living-in-spain/` URL path, live/indexable and draft/noindex.

## Purpose

This document records a full readability/structure audit of every "Living in Spain" guide in the Guide System, per the request to eliminate dense, wall-of-text sections sitewide in this section. It proves every guide was inspected — not sampled — and states plainly what was found.

## How "Living in Spain" was scoped

The site's own information architecture defines "Living in Spain" as the URL section `/living-in-spain/*` (this is the literal breadcrumb label used across the Guide System for any route starting with `/living`, see `scripts/generate-guide-system.js`). Some topics that are *thematically* about living in Spain — healthcare (`/moving-to-spain/healthcare/`), the padrón (`/moving-to-spain/registering-on-the-padron/`), EU registration (`/moving-to-spain/eu-registration/`) — sit under the `/moving-to-spain/` URL section instead, per the site's existing IA. Those are **out of scope** for this pass, which targets the `/living-in-spain/` section specifically, as instructed. This is flagged explicitly rather than silently expanding or narrowing scope.

## Coverage checklist

Every route defined in `routes` (`scripts/generate-guide-system.js`) under `/living-in-spain/` or `/es/living-in-spain/` was located and read in full — 6 pages total (5 English, 1 Spanish). Confirmed via direct inspection of the `routes` object and the generated `pages` array that no other Living in Spain page exists (draft or launched) — the `skeletons` array that could theoretically add more pages is empty (`const skeletons = [];`), so no page was missed.

| Page | Language | Status | Changed | What was improved | Notes |
|---|---|---|---|---|---|
| `/living-in-spain/opening-a-bank-account/` | English | Live (`index, follow`) | No | — | Already uses short subheadings (Who this guide is for, Resident vs non-resident accounts, Common documents, Fees and commissions, Direct debits and everyday use, Online vs traditional banks), `Cards()` grids, a `ChecklistBox`, `WarningBox`/`InfoBox`/`TipBox`, a comparison table, `CommonMistakes`, and `RealQuestions`. No dense paragraph found (longest single `<p>` block: well under 450 characters, and that's the sitewide `QuickAnswer` intro, not a wall-of-text section). |
| `/es/living-in-spain/opening-a-bank-account/` | Spanish | Live (`index, follow`) | No | — | Mirrors the English page's structure exactly, same component pattern, same section count, natural (non-literal) Spanish. No dense blocks found. |
| `/living-in-spain/digital-certificate/` | English | Draft (`noindex, nofollow`) | No | — | Same structural pattern: Who this guide is for, What is a Digital Certificate?, What is Cl@ve?, a comparison table, What can you use them for?, Before you start (checklist), Common Mistakes, Real Questions. No dense blocks found. |
| `/living-in-spain/social-security/` | English | Draft (`noindex, nofollow`) | No | — | Same pattern: Who this guide is for, What is Social Security?, What is a Social Security number?, When you may need it, Employees, Self-employed people, Healthcare connection, Common Mistakes, Real Questions. No dense blocks found. |
| `/living-in-spain/taxes/` | English | Draft (`noindex, nofollow`) | No | — | Same pattern, plus an explicit "Important tax note" disclaimer section ahead of the At a Glance table: Tax residency vs immigration residency, The 183-day rule, Worldwide income, Common tax topics, If you work in Spain, If you receive income from another country, Common Mistakes, Real Questions. No dense blocks found. |
| `/living-in-spain/driving/` | English | Draft (`noindex, nofollow`) | No | — | Same pattern: EU/EEA licences, Non-EU licences, Licence exchange, Renewal in Spain, Driving with a foreign car, Common Mistakes, Real Questions. No dense blocks found. |

**6 of 6 guides audited. 0 of 6 changed.**

## Why no changes were made

The task's own instructions anticipated this outcome explicitly: *"Every item in that checklist must be either changed because dense structure was improved, or explicitly marked as already structured with no change needed."* That is what happened here, for every page, after a full read-through of every section — not a skim.

Concretely, every one of the 6 pages already follows a consistent structure that matches (and in most cases predates and matches almost exactly) the structure standard requested in this task:

- Short, role-specific subheadings ("Who this guide is for," "What is X?," "Common documents," "Fees and commissions," etc.) rather than long unbroken sections.
- `Cards()` grids for anything that's a list of related but distinct points (uses, document types, mistakes, comparisons) — never a single paragraph combining several ideas.
- `ChecklistBox` for document/detail lists.
- `WarningBox` / `InfoBox` / `TipBox` for cautions, caveats, and practical notes — exactly the "Important" / "Practical note" / "Check before relying on this" roles this task's structure standard calls for.
- Comparison tables (`<table class="guide-table">`) for side-by-side options (online vs traditional banks, Digital Certificate vs Cl@ve, EU vs non-EU licences).
- `CommonMistakes` and `RealQuestions` (FAQ) sections at the end of every page.
- A single `QuickAnswer` paragraph per page (318–441 characters — three to four short sentences) as the only "paragraph" content on any page; this is a sitewide pattern used identically on all ~33 Guide System pages, not something specific to Living in Spain, so it was left alone to avoid creating an inconsistency between this section and the rest of the site.

An automated scan for any `<p>` block over 450 characters (a generous wall-of-text threshold) across all 6 pages' generator source returned **zero matches**.

## The NIE example: does not apply

Step 4 of this task described a "mandatory NIE restructuring" of an "NIE guide/block," conditioned on that guide/block existing (*"If the NIE guide/block exists, restructure it fully"*). It was searched for thoroughly and **does not exist** in this repository:

- No route named or containing "NIE" exists in `routes` (`scripts/generate-guide-system.js`).
- No page titled or centered on "NIE" exists anywhere in the Guide System, live or draft, English or Spanish.
- Every mention of NIE across the site (dozens of them, in FAQ answers and short comparison cards like "Not the same as NIE") is a brief, already-cautious one- or two-sentence clarification distinguishing NIE from TIE, Social Security numbers, EU registration, or residence cards — never a dense paragraph combining definition, uses, exceptions, office expectations, and timing into one block.

Because the described block does not exist, it was not fabricated. Inventing a new standalone NIE page or a new dense-then-restructured paragraph would have meant adding new content not currently on the site, which conflicts directly with this task's own constraints ("Do not add new legal facts," and this being described as "a readability and content-structure pass," not a new-content pass). If a dedicated NIE guide is wanted, that would be a separate, deliberate content-creation task with its own scope and review — not something to fold into a structure-only pass.

## Spanish parity

Only one Living in Spain page has a Spanish counterpart: `/living-in-spain/opening-a-bank-account/` ↔ `/es/living-in-spain/opening-a-bank-account/`, both live and already structurally aligned (confirmed identical section-by-section pattern, natural non-literal Spanish, correctly localized "Fuentes oficiales"/"Estado de la fuente" labels where applicable). Since no structural change was made to the English page, no corresponding Spanish update was needed.

The other 4 Living in Spain pages (`digital-certificate`, `social-security`, `taxes`, `driving`) are English-only drafts with no Spanish counterpart yet — this is a pre-existing gap (unrelated to structure/readability) and out of scope for this pass, which is about structure, not translation coverage.

## Confirmation

- No new legal facts were added (no content was added at all — this was audit-only).
- No `href` destinations changed.
- No indexing/sitemap/search-index/hreflang changes — none were touched.
- All 24 launched Guide System pages remain `index, follow`; the 4 draft Living in Spain pages remain `noindex, nofollow`.
- `sitemap.xml`: 101 total `<loc>` entries (unchanged). `search-index.json`: 24 entries (unchanged).
- `app.js`, `styles.css`: unchanged.
- Legacy audit: stable at exactly 4/70.
