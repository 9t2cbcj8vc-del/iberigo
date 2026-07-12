# Living in Spain Section — Readability Pass

**Date:** 2026-07-12
**Status:** Correction applied. The first version of this document was incomplete — it only
audited the Guide System `/living-in-spain/` routes and concluded no dense content existed
anywhere. That conclusion was wrong for the site's actual public-facing surface. This revision
documents the real source of the dense content, what was changed, and the full coverage.

**Follow-up (2026-07-12):** the client-rendered Living in Spain official/source links were aligned with the existing Move to Spain `.gov-link` card style. The fix is in `app.js` only: official links are now classified before branded/private link branches, with focused official metadata/domains added for SEPE/Empléate/EURES, Agencia Tributaria, and regional health-card pages. This changes presentation only; it does not change any link destination, route, indexing state, sitemap, search-index, hreflang, redirect, Guide System launch state, or legacy guide HTML. Preview visual QA remains pending.

## What was missed the first time, and why

The first pass scoped "Living in Spain" narrowly to the URL section `/living-in-spain/*` in
`scripts/generate-guide-system.js`. That is one real content source, but it is not the only
place the site presents "Living in Spain" content to users. The homepage has its own,
completely separate "Living in Spain" flow, driven by `app.js`, that was not inspected in the
first pass. That is where the dense NIE paragraph (and 13 similar paragraphs) actually lives.

## Exact source of the NIE block

- **File:** [app.js](../app.js) — `directRoadmapFor()`, `goal === "nie"` branch.
- **Trigger:** homepage → "Vivir en España" / "Living in Spain" card → "Explorar" →
  `renderLivingSubtopics()` topics menu → "NIE number" / "Número NIE" topic → "Abrir guía".
- **Public URL:** `/` (homepage interactive wizard) and `/guides/nie/` (a dedicated SPA-shell
  entry point that loads the same `app.js` and the same `directRoadmapFor()` data — see below).
- **Render path:** `renderRoadmapCard()` → `renderResultIntro()`, which prints
  `resultSectionLabel("purpose")` as a heading — exactly `"What this is for"` (EN) /
  `"Para qué sirve"` (ES) — followed by the `explanation` string, confirming this is the exact
  block the user quoted ("NIE number / What this is for / The NIE (Número de Identidad de
  Extranjero) is a lifetime identification number...").

This is a completely different code path from the Guide System pages audited in the first
version of this document.

## Broadened coverage: every public "Living in Spain" surface

| Source | Type | In scope? | Notes |
|---|---|---|---|
| `app.js` `directRoadmapFor()`, 15 topic goals reachable from `renderLivingSubtopics()` | Client-rendered, homepage-driven | **Yes — audited, restructured** | padron, digital, nie, tie, social-security, sip-card, private-health, ehic-card, banking, renting-home, job-search, taxes, phone, vida-laboral, driving-licence-exchange |
| `scripts/generate-guide-system.js` routes under `/living-in-spain/` and `/es/living-in-spain/` | Generated static Guide System pages | Yes — re-audited, unchanged | 6 pages (5 English, 1 Spanish). Already well-structured (subheadings, `Cards()`, tables, checklists); no dense `<p>` blocks found. See "Guide System pages" below. |
| `guides/nie/index.html` | SPA shell (client-rendered) | Yes — audited | Same wizard shell as the homepage (`<h1>Where should we begin?</h1>`, same wizard/topics markup), served at a dedicated URL for SEO/routing purposes. It loads `app.js` and renders the same `directRoadmapFor()` data, so the NIE fix applies here automatically. No separate edit was needed in this file. |
| `the-spain-files/nie-spain/index.html`, `the-spain-files/como-obtener-nie-en-espana/index.html` | Standalone static article pages | **Out of scope** | These are "The Spain Files" articles — a separate content vertical with its own titles ("How to get a NIE in Spain: complete guide (2026)"), not grouped under the homepage's "Living in Spain" menu or the `/living-in-spain/` Guide System section. Flagged explicitly rather than silently expanded into scope; not touched. |

## What changed: app.js `directRoadmapFor()` (14 of 15 topics)

Each dense single-paragraph `explanation` string (EN + ES) was split into short labeled
sections using the pattern: **What it is / What it is not / When you may need it / What the
office may expect / Practical note / Timing** (English) and **Qué es / Qué no es / Cuándo
puedes necesitarlo / Qué puede pedir la oficina / Nota práctica / Plazos orientativos**
(Spanish), using only the sections that applied to each topic. Lists (e.g. "when you may need
it") were converted to `<ul><li>` bullets.

Topics changed (EN + ES both edited): `padron`, `digital`, `nie`, `social-security`,
`sip-card`, `private-health`, `ehic-card`, `banking`, `renting-home`, `job-search`, `taxes`,
`phone`, `vida-laboral`, `driving-licence-exchange`.

**Not changed:** `tie` — its explanation was already two short sentences (184/194 characters),
not a dense block, so it was left as-is.

No new legal facts were added to any topic. The NIE "same-day assignment" line was softened
from "the number is typically assigned the same day" to "the number suele asignarse el mismo
día, pero esto puede variar según la oficina" / "the number is often assigned the same day, but
this can vary by office" — preserving the fact while not making it sound guaranteed, per the
task's explicit instruction.

### Before/after example — NIE (English)

**Before:**
> The NIE (Número de Identidad de Extranjero) is a lifetime identification number Spain assigns
> to foreigners for any official or financial transaction — buying property, signing a notarial
> deed, opening a bank account, starting work, or paying tax. It is just a number, not a card
> and not a residence permit; having a NIE does not give you the right to live or work in Spain.
> Police offices expect a concrete, documented reason to assign one: a property purchase,
> employment contract, notarial act, bank requirement, or tax obligation — not just wanting it
> in case it is useful later. Appointment availability varies sharply by province; in coastal
> areas like the Costa Blanca, slots can appear unpredictably, so check early in the morning and
> at weekends. If you attend with everything in order, the number is typically assigned the same
> day.

**After:**
> **What it is:** The NIE (Número de Identidad de Extranjero) is Spain's lifetime identification
> number for foreigners. It is used for official and financial transactions such as buying
> property, signing before a notary, opening a bank account, starting work, or paying tax.
>
> **What it is not:** A NIE is just a number — not a card and not a residence permit. Having a
> NIE does not give you the right to live or work in Spain.
>
> **When you may need it:**
> - Buying property
> - Signing a notarial deed
> - Opening a bank account
> - Starting work
> - Paying tax
>
> **What the office may expect:** Police offices usually expect a concrete, documented reason to
> assign one — a property purchase, employment contract, notarial act, bank requirement, or tax
> obligation — not just wanting it in case it is useful later.
>
> **Practical note:** Appointment availability varies sharply by province. In busy coastal areas
> like the Costa Blanca, slots can appear unpredictably, so it can help to check early in the
> morning and at weekends.
>
> **Timing:** If your paperwork is accepted, the number is often assigned the same day, but this
> can vary by office.

Spanish parity: the Spanish `explanation` was restructured in the same pattern and preserves the
same facts (verified in `app.js`, `goal === "nie"`, `currentLang === "es"` branch).

## Rendering/component change (required to support structure)

The original `explanation` field was rendered as a single forced `<p>` in
`renderResultIntro()` (`app.js`), which meant it could not display headings or bulleted lists.
To support the restructured content without changing meaning or adding new content types
elsewhere on the site:

- `renderResultIntro()`: `<p>${explanation}</p>` → `<div class="result-purpose-body">${explanation}</div>`,
  allowing `explanation` strings to contain multiple `<p>`/`<ul><li>` blocks. This only affects
  the "Living in Spain" / "Moving to Spain" wizard result panel — no other component was
  touched.
- [styles.css](../styles.css): added `.result-purpose-body` (grid layout, spacing between blocks)
  and child rules for `p`/`ul` so the new structured content reads cleanly rather than butting
  together. No global list-style reset exists on the site, so bullets render with their default
  markers.

## Guide System pages (`/living-in-spain/`) — re-confirmed unchanged

Re-inspected all 6 pages after broadening scope; conclusion from the first pass still holds —
these pages are unrelated to the app.js content and were already well-structured:

| Page | Language | Status | Changed |
|---|---|---|---|
| `/living-in-spain/opening-a-bank-account/` | English | Live (`index, follow`) | No |
| `/es/living-in-spain/opening-a-bank-account/` | Spanish | Live (`index, follow`) | No |
| `/living-in-spain/digital-certificate/` | English | Draft (`noindex, nofollow`) | No |
| `/living-in-spain/social-security/` | English | Draft (`noindex, nofollow`) | No |
| `/living-in-spain/taxes/` | English | Draft (`noindex, nofollow`) | No |
| `/living-in-spain/driving/` | English | Draft (`noindex, nofollow`) | No |

Reasoning is unchanged from the first pass: consistent subheadings, `Cards()` grids,
`ChecklistBox`/`WarningBox`/`InfoBox`/`TipBox`, comparison tables, `CommonMistakes`, and
`RealQuestions` on every page; no `<p>` block over 450 characters found in generator source.

## Visual QA

Verified in the browser preview (`static-site` server, `http://localhost:8899`):
- Homepage → "Vivir en España" (`data-route-preset="living"`) → topics menu → NIE topic →
  structured content renders with clear `<strong>` labels, short paragraphs, and a real bulleted
  list — confirmed at desktop width and at 375px mobile width. No overflow, no broken spacing,
  no wall-of-text.
- Spot-checked a second topic (`renting-home`, English) to confirm the fix generalizes and that
  the separate `whatHappensNext` block (unrelated to `explanation`) still renders correctly.
- `/guides/nie/` loads the same shell and app.js; not separately re-tested beyond confirming it
  is the same code path.

## Confirmation

- No new legal facts were added to any restructured topic; all facts, figures, and cautious
  wording (e.g. non-guaranteed same-day NIE assignment) were preserved.
- No `href` destinations changed.
- No routing, indexing, sitemap, search-index, or hreflang changes were made.
- `sitemap.xml`: 101 total `<loc>` entries (unchanged, re-verified after
  `node scripts/generate-guide-system.js`).
- `search-index.json`: 24 entries (unchanged, re-verified).
- Legacy audit (`node scripts/audit-legacy-guides.js`): `pagesWithStaticGuideBodyContent` stable
  at 4 of 70 (unchanged).
- All 24 launched Guide System pages remain `index, follow`; draft pages remain
  `noindex, nofollow`.
- Files changed: `app.js`, `styles.css`, this document, `docs/BACKLOG.md`.
