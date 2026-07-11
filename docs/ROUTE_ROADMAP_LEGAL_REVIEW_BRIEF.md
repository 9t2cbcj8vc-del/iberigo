# Route Roadmap Legal/Immigration Review Brief

**Status:** Professional review still requested but not yet obtained. As a substitute, an owner-controlled official-source verification pass has been completed — see `docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md`. That verification is not a replacement for the professional review requested in this brief, and it is not legal advice. All 14 pages remain unpublished drafts.
**Date prepared:** 2026-07-11 (review brief); source verification matrix added 2026-07-11.
**Related:** `docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md`, `docs/SPANISH_START_HERE_REVIEW_AND_LAUNCH_PLAN.md`, `docs/SPANISH_START_HERE_LOCALIZATION_PLAN.md`, `docs/GROUP1_PUBLICATION_DECISION.md`

## 1. Purpose

IberiGo has drafted seven "route roadmap" guides covering the main immigration/residence paths for moving to Spain, each now available in both English and Spanish. Before any of these 14 pages can be published (made indexable and linked publicly), IberiGo wants a qualified editorial and legal/immigration review of the content.

This brief exists to give a reviewer (or the site owner, if a professional reviewer isn't obtained — see Section 6) everything needed to assess the pages without having to reconstruct context from the codebase: what to look at, what to check for, and how to report findings back in a format the team can act on directly.

This is the review request itself — it does not contain the review. No review has happened yet.

## 2. Publication status

Current state of all 14 pages, as of this brief:

- All 14 pages exist and are reachable directly, but are not linked from public navigation except via `/es/start-here/`'s labeled cards (see below).
- All 14 pages are `noindex, nofollow` (not indexed by search engines).
- None of the 14 pages are listed in `sitemap.xml`.
- None of the 14 pages are listed in `search-index.json` (the site's on-page search).
- None of the 7 English/Spanish pairs have reciprocal `hreflang` tags yet.
- None of the 7 pairs have the site's language-switcher behavior enabled yet (the EN/ES toggle in the header does not link between these pairs).
- `/es/start-here/`'s route cards (including "Me jubilo en España") still link to the **English** versions of these pages, each labeled "(en inglés)" to make clear the destination is English-only. This labeling will only be removed once a given page's Spanish counterpart is actually launched.

None of this will change as a result of this brief. This document only requests a review; it does not authorize or perform a launch.

## 3. Pages to review

14 pages total, grouped by topic with English and Spanish paired:

| Topic | English | Spanish |
|---|---|---|
| EU citizens | `/moving-to-spain/eu-citizens/` | `/es/moving-to-spain/eu-citizens/` |
| Non-EU citizens | `/moving-to-spain/non-eu-citizens/` | `/es/moving-to-spain/non-eu-citizens/` |
| Family member of an EU citizen | `/moving-to-spain/family-member-eu-citizen/` | `/es/moving-to-spain/family-member-eu-citizen/` |
| Work in Spain | `/moving-to-spain/work-in-spain/` | `/es/moving-to-spain/work-in-spain/` |
| Students | `/moving-to-spain/students/` | `/es/moving-to-spain/students/` |
| Retire in Spain | `/moving-to-spain/retire-in-spain/` | `/es/moving-to-spain/retire-in-spain/` |
| Self-employed / autónomo | `/moving-to-spain/self-employed-spain/` | `/es/moving-to-spain/self-employed-spain/` |

All URLs are relative to `https://iberigo.eu`. On production, all 14 currently return `200` with `noindex, nofollow` — they are directly viewable for review purposes, just not discoverable via search or site navigation.

## 4. What the reviewer should check

For each page, please review for:

- **Overstated legal certainty** — language that states an outcome as guaranteed or automatic when in practice it depends on individual circumstances.
- **Outdated immigration/residence terminology** — terms, form names, or procedure names that no longer match current usage.
- **Incorrect route descriptions** — any route, requirement, or sequence of steps that is factually wrong or misleading as described.
- **Missing caveats** — places where a caveat or exception is needed but absent (e.g., a rule that has known exceptions not mentioned).
- **Claims that vary by province or oficina** — statements presented as universal when in practice they vary by region, province, or the specific office handling a case.
- **Exact timing claims that should be softened** — any specific timeframe (e.g., "within X days," "takes X weeks") that isn't reliably true everywhere in Spain and should be generalized or removed.
- **Wording that could be interpreted as legal advice** — phrasing that crosses from general practical information into what reads like individualized legal counsel.
- **Spanish translation mismatches** — places where the Spanish page's meaning diverges from its English counterpart in a way that matters (not stylistic differences, but substantive ones).
- **Spanish legal/admin terminology issues** — incorrect or non-standard use of Spanish immigration/administrative terms (e.g., NIE, TIE, empadronamiento, Seguridad Social, certificado digital, autónomo).
- **Whether disclaimers are sufficient** — each page has an "Important note" / "Nota importante" box stating the content is general information, not legal/tax/immigration/financial advice. Please confirm whether this framing is adequate given the page's actual content, or whether it needs to be stronger, more specific, or repeated elsewhere on the page.

## 5. Reviewer response format

Please provide a page-level verdict for each of the 14 pages, using one of:

- **Approve as-is** — no changes needed.
- **Approve with minor wording changes** — safe to publish once the listed minor issues are fixed.
- **Do not publish until corrected** — one or more blocker-level issues must be resolved first.

For each specific issue found, please report:

| Field | Description |
|---|---|
| Page URL | The exact page the issue is on |
| Section/heading | The `<h2>` heading or section name where the issue occurs |
| Problematic wording | The exact phrase or sentence in question |
| Recommended wording | Your suggested replacement, if you have one |
| Severity | `blocker`, `important`, or `minor` |
| Reason | Why this needs to change |

`blocker` issues must be resolved before that page can launch. `important` issues should be resolved before launch but don't necessarily block other pages. `minor` issues can be fixed opportunistically.

## 6. Owner decision alternative

If a qualified professional legal/immigration review is not obtained, publication may still proceed via an **explicit owner decision**, following the precedent already established for the original Group 1 launch (see `docs/GROUP1_PUBLICATION_DECISION.md`). That decision explicitly chose to publish the five original Guide System pages as "owner-reviewed practical information" — clearly framed as not legal, tax, immigration, financial, or rental advice — without an external professional review, because no professional review was available at the time.

If the same path is chosen for the route roadmap family, it should be documented the same way: a dated, explicit decision record stating that the owner has reviewed the content, accepts the risk framing, and chooses to publish as owner-reviewed practical information rather than professionally-reviewed advice. That decision does not currently exist for these 14 pages and would need to be created deliberately — it is not something this brief or any prior sprint has already provided.

**Update (2026-07-11):** `docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md` has since been completed — an official-source verification pass (BOE, `inclusion.gob.es`, consular pages, `seg-social.es`) checking every major claim on all 14 pages against primary government sources, performed because professional review remained unavailable. This strengthens the factual basis for an eventual owner decision, but it is explicitly **not** the professional review this brief requests, and it does not by itself authorize publication. An owner decision record, as described above, would still need to be created separately.

## 7. Current launch criteria

Per the repo's standing policy (`docs/BACKLOG.md`, "Planned" section: *"Publish/index pages only after explicit legal + editorial approval — never as a side effect of another change"*), these 14 pages should only be launched after **one** of the following has happened:

1. A qualified professional legal/immigration review is completed, using this brief, and any `blocker`/`important` issues it raises have been fixed; **or**
2. An explicit owner publication decision is made and documented (per Section 6), consciously choosing to launch without professional review.

Neither has happened as of this brief. No launch should proceed until one of these two conditions is met.

## 8. Technical notes (for a future launch PR, not performed now)

Once either condition in Section 7 is satisfied, the launch implementation would need to:

- Change all 14 pages from `noindex, nofollow` to `index, follow`.
- Add all 14 pages to `sitemap.xml`.
- Add the pages to `search-index.json`, if the Guide System's existing rules call for it (published Guide System pages are included automatically by the generator).
- Add reciprocal `hreflang` (`en`/`es`/`x-default`) for each of the 7 English/Spanish pairs, following the existing `launchedPair()` pattern already used for the 5 originally launched pages.
- Add language-switcher behavior for each of the 7 pairs, following the existing `altHref`/`data-lang-href` mechanism.
- Update `/es/start-here/`'s route cards to link to the Spanish versions of these pages instead of the English ones.
- Remove the "(en inglés)" label only from the cards whose Spanish counterpart is actually launched — any deeper link that still has no Spanish page must keep its "(en inglés)" label.

None of this technical work is being done as part of this brief.
