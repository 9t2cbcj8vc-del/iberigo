# Healthcare + Padrón — Sign-off Readiness Assessment

**Status:** Assessment only. **No page content was changed.** Both pages remain `noindex, nofollow` / `status: draft`. No CTA links were touched.
**Date prepared:** 2026-07-25
**Pages assessed:** `/moving-to-spain/healthcare/`, `/moving-to-spain/registering-on-the-padron/`
**Related:** `docs/ROUTE_ROADMAP_LEGAL_REVIEW_BRIEF.md`, `docs/GROUP1_LEGAL_REVIEW_BRIEF.md`, `docs/IBERIGO_GUIDE_SYSTEM_V1.md`

## 1. Purpose and outcome

This assessment was requested as preparation for sign-off, with four workstreams: fact-check concrete claims, apply the legacy "house pattern", confirm EN/ES parity, and check for duplication against legacy guides.

**Outcome: no content or structural change was warranted.** Three of the four workstreams rested on premises that do not hold for these two pages, and the fourth was explicitly scoped as flag-only. Details below. The pages are in better shape than the request assumed; the remaining blocker to publication is human/professional sign-off, not content work.

## 2. EN/ES parity — cannot be assessed: Spanish versions do not exist

There is no Spanish counterpart for either page.

- `scripts/generate-guide-system.js` defines no `esHealthcare` or `esPadron` route. The `routes` object contains 13 `es*` routes; neither of these is among them.
- Neither draft emits any `hreflang` tag (published Guide System pages emit three: `en`, `es`, `x-default`).
- No `es/moving-to-spain/healthcare/` or `es/moving-to-spain/registering-on-the-padron/` directory exists.

This matches the known state of the EN-only draft set (`healthcare`, `registering-on-the-padron`, `family-reunification`, `digital-nomad-spain`).

**Implication:** producing Spanish versions is not a parity fix — it is authoring two new ~40 KB pages of Spanish content from scratch. That is new content creation and would itself require sign-off. It was not attempted here. If Spanish versions are wanted, they should be scoped as their own piece of work, following the precedent in `docs/SPANISH_START_HERE_LOCALIZATION_PLAN.md`.

## 3. Structure — already conformant; the requested change would have broken it

The requested "house pattern" (*What it is / What it is not / When you may need it / Practical note*) belongs to the **legacy guide** template, where it renders inside the `result-purpose-body` block. These two pages are **Guide System v1** pages, a different template with no equivalent slot.

Two findings:

**a) The legacy pattern is not a fixed four-heading template.** Across the 22 legacy EN guides that use `<strong>` sub-headings, the exact requested sequence appears **zero** times. The actual convention is: open with "What it is" (22/22), close with "Practical note" (17/22), and choose one to three topic-appropriate middle headings. Examples:

| Guide | Headings used |
|---|---|
| `nie` | What it is / What it is not / When you may need it / What the office may expect / Practical note / Timing |
| `nie-only` | What it is / What it is not / What the office may expect / Practical note |
| `padron` (legacy) | What it is / When you may need it / What the office may expect / Practical note |
| `family` | What it is / Who can sponsor / Eligible relatives / How the process runs / Practical note |

**b) Both draft pages already match the Guide System v1 skeleton exactly.** Both carry all ten framework sections, identical to the published `eu-citizens` and `students` pages:

> Quick Answer · At a Glance · Common Mistakes · Real Questions People Ask · Your Next Step · Scope Notice · Official Sources · Legal Disclaimer · Continue Your Journey · Editorial Checklist

(For reference, the published `documents-checklist` page carries nine and is the outlier — not these two.)

Imposing the legacy pattern would have moved these pages *away* from the template every other Guide System page follows, and away from `docs/IBERIGO_GUIDE_SYSTEM_V1.md`. It was therefore not applied.

## 4. Fact-check — near-zero targets, by design

Neither page contains a fee, a form code, a processing time, or any other hard number:

| | Healthcare | Padrón |
|---|---|---|
| `€` / `EUR` amounts | 0 | 0 |
| `Modelo` / `EX-nn` / `790` references | 0 | 0 |
| Sentences containing a number, fee, or form code | 0 of 96 | 0 of 91 |
| Hedged sentences ("may", "can vary", "depending on") | 43 (44%) | 36 (39%) |

This is **deliberate compliance with the project's editorial policy**, not missing content. The documented rules require "no fixed timelines unless legally defined", "no invented official requirements", and prefer exactly the hedged constructions used here. The padrón page states the policy on its own face: *"No fixed timeline — Appointment availability can vary by municipality. Do not rely on exact timelines unless they are locally verified."*

Consequently there was almost nothing to verify against Seguridad Social / Sanidad / Policía Nacional / ayuntamiento sources, because the pages deliberately decline to make those commitments. **Adding concrete fees or timelines to make the pages "checkable" would violate the editorial policy** and was not done.

**What was verified:** all four cited official source URLs resolve (HTTP 200) —

- `https://www.sanidad.gob.es` — healthcare
- `https://www.inclusion.gob.es/web/migraciones/home` — healthcare
- `https://www.seg-social.es` — healthcare
- `https://www.ine.es` — padrón

**Editorial policy compliance scan:** zero genuine violations on either page. A pattern scan returned six matches for absolute language; on inspection all six are correct usage — four are disclaimer phrasing ("always confirm with the official source") and two explicitly *deny* nationwide uniformity ("Does healthcare work the same in every region? No.", "Do I need a NIE first? Not always.").

## 5. Items a human reviewer should confirm

Because the pages avoid hard specifics, the reviewable surface is conceptual rather than numeric. These are the claims a qualified reviewer should confirm — none could be settled from the codebase, and none were altered:

**Healthcare**
1. That public healthcare eligibility is fairly characterised as arising through "employment, Social Security, pension rights, family status or other recognised routes" — i.e. that no materially common route is omitted.
2. That the S1 characterisation is correct: applies to "some pensioners or people covered by another EU/EEA country", and is distinct from EHIC ("EHIC is generally for temporary stays").
3. That the regional health card is correctly described as issued by the regional health service and separate from NIE, padrón and Social Security number.
4. That the claim some EU citizens may need healthcare evidence *before or during* EU Registration Certificate steps is accurate for the self-sufficient / retired / student bases.

**Padrón**
5. That the padrón is correctly framed as *not* conferring immigration status ("Not residency", "Not a permission to live in Spain").
6. That the listed document set town halls may request (passport/ID, NIE if available, rental contract, property deed, landlord authorisation + landlord ID copy, utility bill) is representative and contains nothing that is never requested.
7. That "Not always" is the correct answer to "Do I need a NIE first?" — i.e. that some municipalities do accept passport/national ID alone.
8. That advising renters to confirm padrón usability of an address *before paying a deposit* is sound and carries no rental-law implication the site should avoid.

## 6. Duplication findings — flagged, not fixed

Per the request, these are reported without any retitle or cross-link change. Both are the same class of overlap as the `eu-family` ↔ `family-member-eu-citizen` pair addressed previously.

**a) Padrón draft ↔ `/guides/padron/` (legacy).** Substantial conceptual overlap: both define the padrón as town-hall address registration, both list the same downstream uses (TIE/residence, healthcare, schools, banking), both note municipality-level variation. 72% of the legacy page's distinct vocabulary also appears on the draft. The draft additionally covers rental-contract timing, appointment availability, and a five-step process overview — so it is a superset, not a copy. There is also third-party overlap with `/the-spain-files/padron-torrevieja/`.

**b) Healthcare draft ↔ legacy health guides.** Overlap with `/guides/sip-card/` (58% of its vocabulary), `/guides/ehic-card/` (52%), and `/guides/private-health/` (42%). The draft covers regional health card, EHIC-vs-S1 distinction, and private cover — each of which is the whole subject of one of those legacy guides.

**Neither draft links to any of these legacy counterparts.** Each draft's Scope Notice is generic boilerplate ("Some procedures and supporting documents may vary by province or municipality") and does not perform scope disambiguation. If these pages are published without a scope-clarity treatment, they will compete with the legacy guides for the same queries.

## 7. What would actually unblock publication

Not content work. In order:

1. Human/professional confirmation of the eight items in §5.
2. A decision on the §6 duplication: scope-clarity cross-links (the `eu-family` treatment), consolidation, or accepting the overlap.
3. A decision on whether Spanish versions are required before launch (§2) — the other published Guide System pages all ship as EN/ES pairs.
4. The existing technical launch steps (`noindex` removal, sitemap, search index, hreflang), which are out of scope here and were not touched.

**This document does not grant publication approval and does not constitute legal, tax, immigration, or medical advice.** Both pages remain `noindex, nofollow`.
