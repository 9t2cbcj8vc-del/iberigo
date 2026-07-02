# Non-EU Route Batch — Consistency Audit (Sprint 58)

**Scope:** the 8-page Non-EU route draft batch built in Sprints 46–57, plus the two navigation pages that link into it (`/start-here/` and `/moving-to-spain/non-eu-citizens/`). Audit only — no new pages, no PR, no publishing, no merges.

## Executive summary

The batch is in good shape. Across all 6 audit dimensions (routes/navigation, terminology, risk language, duplication, source coverage, and the underlying `noindex` status), **no correctness problems were found and no content fixes were necessary.** The batch's repeated patterns — the "EU citizens and X" opening card and the "TIE is not the same as NIE / EU Registration" mini-explainer — are deliberate, beneficial repetition (each roadmap must stand alone for a reader who lands on it directly, and repeating a risk-sensitive factual distinction verbatim reduces the chance of drift between pages), not oversights. This is a clean audit, not a rewrite.

## Pages included

1. `/moving-to-spain/non-eu-citizens/`
2. `/moving-to-spain/family-member-eu-citizen/`
3. `/moving-to-spain/students/`
4. `/moving-to-spain/work-in-spain/`
5. `/moving-to-spain/retire-in-spain/`
6. `/moving-to-spain/family-reunification/`
7. `/moving-to-spain/digital-nomad-spain/`
8. `/moving-to-spain/self-employed-spain/`

Plus navigation: `/start-here/` and the Non-EU Roadmap's own route-card section.

## Step 1 — Route and navigation audit

- All 8 batch pages exist and build correctly.
- **Start Here now has zero "Coming soon" cards** — all 7 personas (EU citizen, non-EU citizen, joining family, moving for work, moving to study, retiring, self-employed) link to a real roadmap. This wasn't previously tracked as a milestone; it's a direct consequence of the batch being complete.
- **The Non-EU Roadmap's "Choose your route" section also has zero "Coming soon" cards** — all 7 route cards link to their sub-guide, plus the 8th card ("Already in Spain and unsure what applies") correctly links to Start Here.
- No broken internal links — confirmed via `node scripts/generate-guide-system.js`'s built-in link validator (0 warnings, 0 errors) and a manual existence check on all 10 target files.
- No CTA reads "Read more" anywhere in the 8-page batch — confirmed via full-text search.
- All CTA labels are descriptive (e.g., "View the Work in Spain Roadmap," "View the Self-Employed Roadmap").

**Finding:** no fixes needed.

## Step 2 — Terminology consistency audit

Checked usage of NIE, TIE, EU Registration / EU Registration Certificate, Family Member of an EU Citizen, Family Reunification, Digital Nomad, Self-employed / Autónomo, Social Security, Digital Certificate, Cl@ve, and padrón across all 8 pages.

- **NIE / TIE** — consistently all-caps, no stray "N.I.E." or "T.I.E." punctuation variants anywhere.
- **"EU Registration" vs. "EU registration"** — mixed capitalization exists, but it's a *consistent, deliberate pattern*: Title Case when naming the specific guide/link ("View the EU Registration Guide"), lowercase when used as a common description inside a sentence ("If staying longer than three months, EU registration may apply"). This matches standard English capitalization rules and is applied the same way on every page. Not an inconsistency.
- **"Self-employed" / "Self-Employed" / "self-employed"** and **"Autónomo" / "autónomo"** — same pattern: Title Case for headings/link labels, lowercase mid-sentence. Consistent across pages.
- **"Family Reunification" vs. "Family Member of an EU Citizen"** — correctly kept as two distinct, never-conflated terms; the Family Reunification page's dedicated comparison table is the main mechanism keeping them apart, and no page uses one term to mean the other.
- **padrón / Padrón** — same capitalization pattern (proper noun at sentence start or heading, lowercase mid-sentence), consistent everywhere it appears.

**Finding:** no fixes needed. The apparent case variation is intentional style, not drift.

## Step 3 — Risk-language audit

Searched all 8 pages for: `always`, `guaranteed`, `automatic`, `automatically`, `everyone`, `must`, `will`, `can work`, `gives residence`, `gives permission`, `within`, `first week`, `30 days`.

Results: `must`, `within`, `first week`, and `30 days` produced **zero matches** across all 8 pages. Every other hit (52 total across the batch) was individually reviewed and falls into one of three safe categories:

- **Negation** — e.g., "Not one process for everyone," "Same for everyone? No," "TIE is not the same as EU Registration," "Do not treat any tax benefit as guaranteed."
- **Describing a misconception to correct** — every "automatically" hit inside a Common Mistakes list or Real Questions answer follows the pattern "Assuming X automatically gives Y" (naming the mistake) or "Does X automatically give Y? No" (correcting it) — never asserting the claim as true.
- **Hedged question/answer phrasing** — "Will working in Spain affect my taxes? It can," "Will Spain tax my pension? It may" — FAQ headings phrased as natural questions, answered with "may"/"can," not certainty.

**Finding:** zero instances require softening. No edits made.

## Step 4 — Duplicate-content audit

Two repeated patterns were found and evaluated:

1. **The "EU citizens and [topic]" opening card**, appearing near-identically on the Student, Work in Spain, Retiring in Spain, and Self-Employed roadmaps (e.g., "EU, EEA and Swiss citizens do not usually need a visa to [study/work/move to] Spain"). This is the same underlying fact restated for each topic — necessary because each roadmap is designed to be read independently by someone who lands on it directly, not as part of a guided sequence.
2. **The "TIE basics" mini-explainer** ("TIE is not the same as NIE. TIE is not the same as EU Registration...") appears near-verbatim on 6 of the 8 pages (Students, Work in Spain, Retiring in Spain, Family Reunification, Digital Nomad, Self-Employed); the Non-EU Citizen Roadmap and Family Member of an EU Citizen roadmap have their own slightly fuller versions appropriate to their broader scope.

Both were judged **beneficial, not problematic**: this is a legally-sensitive, easy-to-get-wrong factual distinction, and stating it identically everywhere minimizes the risk of the wording drifting between pages over future edits. Per the task's instruction not to rewrite heavily and only trim duplication where it improves clarity, no changes were made — shortening or removing either pattern would reduce each page's self-containment without a clear clarity benefit.

The specifically-requested pairs were also checked directly:
- **Non-EU Roadmap vs. each sub-guide** — the Roadmap summarizes each route in ~1 sentence per card; sub-guides expand significantly. Not duplicative.
- **Work in Spain vs. Digital Nomad** — Digital Nomad explicitly cross-links to Work in Spain via its comparison table rather than repeating employment-route content.
- **Digital Nomad vs. Self-Employed** — same pattern; Digital Nomad's comparison table links to the Self-Employed roadmap instead of duplicating autónomo content.
- **Family Reunification vs. Family Member of an EU Citizen** — kept apart by Family Reunification's dedicated comparison table; the two pages don't repeat each other's route-specific content.
- **Retire in Spain vs. Taxes / Healthcare** — Retire in Spain summarizes and cross-links to both dedicated guides rather than duplicating their detail.
- **Student vs. Non-EU Roadmap** — Student roadmap's "Before you apply or move" section is its own, more specific list; it links to Documents Checklist rather than re-deriving the Non-EU Roadmap's general preparation guidance.

**Finding:** no fixes needed.

## Step 5 — Source coverage audit

| Page | Official sources linked | Status banner wording |
|---|---|---|
| Non-EU Citizen Roadmap | 4 | Correct — "confirm... before publication," no legal-verification claim |
| Family Member of an EU Citizen | 4 | Correct |
| Student | 5 | Correct |
| Work in Spain | 6 | Correct |
| Retiring in Spain | 7 | Correct |
| Family Reunification | 5 | Correct |
| Digital Nomad | 6 | Correct |
| Self-Employed | 6 | Correct |

All 8 pages have at least one linked official source (`.gob.es` or `europa.eu` domains only, each previously verified via `curl` in the sprint that added it — see `docs/SOURCE_VERIFICATION_MATRIX.md` for the per-page verification method). No blogs, gestor sites, or unofficial summaries anywhere in the batch. The Sprint 43 overclaim fix (the old "Reviewed against official guidance" wording) does not appear anywhere in the batch — confirmed via full-text search across all 8 pages — so no page implies its content has been legally verified against the linked sources.

**Finding:** no fixes needed. `docs/SOURCE_VERIFICATION_MATRIX.md` already accurately reflects each page's source status from the sprint that added it; no update required.

## Remaining review risks

Unchanged from what's already tracked per-page in `docs/SOURCE_VERIFICATION_MATRIX.md` and `docs/PR5_REVIEW_ROUTES.md` — this audit didn't surface anything new:

- All 8 pages still require human/professional legal, tax, and/or immigration sign-off before any page can move out of `draft`/`noindex`.
- The Family Reunification / Family Member of an EU Citizen distinction and the Digital Nomad / Work in Spain / Self-Employed three-way distinction remain the highest-value things for a reviewer to double-check, since they're the load-bearing claims the comparison tables depend on.
- Start Here's "joining family" card still defaults to the EU family member roadmap rather than offering a choice between the two family routes (open backlog item, unchanged by this audit).
- Start Here has no dedicated digital-nomad card (open backlog item, unchanged by this audit).

## Recommended next step

The batch is internally consistent and ready for its next stage: opening the PR for `content/non-eu-route-drafts` (not done in this sprint, per instructions) so the full 8-page batch can get a Netlify preview and move toward the legal/tax/immigration review sequence already queued in `docs/BACKLOG.md`.
