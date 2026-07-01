# PR #5 Pre-Merge Decision Package

**Date:** 2026-07-01
**Branch:** `feature/core-guides`
**PR:** [#5 — "Add core guide draft frameworks"](https://github.com/9t2cbcj8vc-del/iberigo/pull/5) (draft, open)
**Preview URL:** https://deploy-preview-5--iberigo.netlify.app

---

## 1. Executive summary

PR #5 is technically safe to merge — build, metadata validation, and the internal-link check all pass; there is no merge conflict with `main`; the production homepage and the live `/guides/eu-registration/` page are byte-identical to `main`; every draft page is `noindex,nofollow`; no legacy content has been touched, removed, or redirected. Ten of the 14 draft pages have had a content-level editorial pass (Sprints 36–37); three (`digital-certificate`, `social-security`, `driving`) have not yet been reviewed; `/search/` is functional-only. **No page has legal or tax-professional sign-off.** The remaining blockers are entirely editorial/legal/URL-strategy decisions, not code issues.

**Recommendation: Option A** — merge as an internal draft foundation. See Section 7.

---

## 2. What PR #5 adds

- 13 new content routes: `/start-here/`, `/moving-to-spain/eu-citizens/`, `/moving-to-spain/settling-into-spain/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/registering-on-the-padron/`, `/moving-to-spain/healthcare/`, `/moving-to-spain/eu-registration/`, `/living-in-spain/opening-a-bank-account/`, `/living-in-spain/digital-certificate/`, `/living-in-spain/social-security/`, `/living-in-spain/taxes/`, `/living-in-spain/driving/`, plus `/search/`.
- The reusable guide-generation system (`scripts/generate-guide-system.js`, `scripts/guide-components.js`, `scripts/search-components.js`) — metadata validation, internal-link validation, table-of-contents generation, "Continue Journey" navigation, search indexing.
- Project docs: `docs/PROJECT_PRINCIPLES.md`, `docs/CONTENT_TEMPLATE.md`, `docs/STYLE_GUIDE.md`, `docs/BACKLOG.md`, plus the Sprint 34–37 review package (`docs/PR5_AUDIT_REPORT.md`, `docs/MIGRATION_PLAN.md`, `docs/EDITORIAL_REVIEW_CHECKLIST.md`, `docs/PR5_REVIEW_ROUTES.md`, `docs/PR5_REVIEW_RISKS.md`, this document).
- All 14 new pages are `status: draft`, `noindex, nofollow`.

## 3. What PR #5 does not change

- The production homepage (`index.html`) — 0 diff vs. `main`.
- The live, indexed `/guides/eu-registration/` page — 0 diff vs. `main`; keeps its `hreflang` en/es pairing and indexable robots meta (this was the Sprint 34 fix — the draft EU Registration content now lives at `/moving-to-spain/eu-registration/` instead of overwriting the live page).
- Any of the 8 other legacy live guides identified as topically overlapping (`vida-laboral`, `driving-licence-exchange`, `padron-torrevieja`, and the live `social-security`, `padron`, `taxes`, `banking`, `digital` pages) — all present, untouched, still indexable.
- No redirects have been added anywhere (confirmed via `netlify.toml` diff).
- No legacy content has been removed or migrated.

## 4. Remaining blockers

See Section 5 for the full classification. In short: legal/tax/immigration sign-off (all 14 pages), 3 pages with no editorial pass yet, and the `/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/` routing decision.

## 5. Blocker classification

| # | Item | Type | Blocks merge? |
|---|---|---|---|
| 1 | Legal/tax/immigration verification still required on all 14 pages (including the 10 with an editorial pass) | **C. Legal/tax/immigration verification blocker** | No — blocks moving pages out of `draft`/`noindex`, not blocks merging draft code into `main` |
| 2 | `digital-certificate`, `social-security`, `driving` have not had an editorial pass yet | **B. Editorial blocker** | No — same reasoning; these stay `draft`/`noindex` regardless of merge |
| 3 | `/guides/eu-registration/` → `/moving-to-spain/eu-registration/` routing decision (redirect one way, keep both, or something else) | **D. SEO/migration blocker** | No, if Option A is chosen — the draft route doesn't affect the live route today |
| 4 | Legacy duplicate-topic guides (`padron`, `social-security`, `taxes`, `banking`, `digital`) need migration decisions | **D. SEO/migration blocker** | No — only matters once new pages become indexable |
| 5 | No redirects have been executed | **E. Post-merge backlog item** | No — explicitly out of scope until after content approval |
| 6 | Draft pages remain `noindex,nofollow` | Not a blocker — this is the current, correct, safe state | No |
| 7 | Spanish-language versions of the new core guides don't exist yet | **E. Post-merge backlog item** | No |
| 8 | Non-EU roadmap, autónomo guide, car-import guide (forward references removed from page source, tracked in backlog) | **E. Post-merge backlog item** | No |

**No technical (A) blockers remain.** Sprint 34 resolved the only one found (the live-page overwrite and its merge conflict).

## 6. Risk analysis

### Risks if merged now (as Option A — draft foundation, all `noindex`)
- Low. The pages are not indexable, not linked from any navigation a visitor would organically find, and don't touch any live content. The main residual risk is process risk: once in `main`, it's easier to forget these pages still need legal review before ever being made indexable — mitigate by keeping `docs/BACKLOG.md` and the review docs as the source of truth, and by not changing any page's `status` away from `draft` without an explicit approval step.
- The `/guides/eu-registration/` routing question stays open regardless of merge — merging doesn't force that decision, but also doesn't resolve it.

### Risks if delayed
- Continued branch divergence — every day `feature/core-guides` stays unmerged, `main` and the branch can drift further (this already caused one real merge conflict in Sprint 34), increasing the chance of a messier reconciliation later.
- No forcing function for finishing the remaining editorial passes (3 pages) or legal review — an unmerged branch is easy to deprioritize indefinitely.
- Duplicated review overhead — every sprint so far has had to re-verify "is main still unaffected," which is unnecessary busywork once the code is safely in `main` in its `noindex` state.

## 7. Recommended decision

### Option A — Merge PR #5 as internal draft foundation ✅ Recommended

All prerequisites for Option A are met today:
- All 14 pages remain `noindex,nofollow`.
- Production indexed pages are untouched (homepage, live `/guides/eu-registration/`, all other legacy guides).
- No old live content is removed.
- Purpose is exactly this: get the reviewed-so-far draft foundation into `main` safely, without publishing anything.

This unblocks continued editorial/legal work directly against `main` (shorter-lived branches, less drift risk) while keeping zero public-facing change. It does not require finishing the 3 remaining editorial passes or the legal review first — those continue as post-merge backlog items, exactly as they would on an unmerged branch, just with less branch-divergence risk.

**Why not Option B (hold):** there is no content risk from merging `noindex` pages — Option B's stated condition ("we do not want any draft content in main yet, even noindexed") isn't a technical or SEO argument, it's a preference call. Given the branch is already 96+ files and 40+ commits deep, holding indefinitely increases reconciliation risk for no safety benefit.

**Why not Option C (split):** the infrastructure (generator scripts) and the draft content are tightly coupled — the scripts only exist to produce these specific pages, and splitting them would mean either shipping infrastructure with no content (pointless) or re-deriving which commits are "infra-only" across 40+ commits (high effort, low payoff). Option A achieves the same safety guarantee (nothing indexable ships) more simply.

## 8. Post-merge tasks

Tracked in `docs/BACKLOG.md`:
- Finish editorial pass on `digital-certificate`, `social-security`, `driving`.
- Legal/tax/immigration professional review of all 14 pages (the actual publish blocker).
- Decide the `/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/` question.
- Execute the legacy-guide migration plan (`docs/MIGRATION_PLAN.md`) only after the routing decision above.
- Build a redirect strategy — only after migration decisions are made, and only execute once approved.
- Preserve `hreflang` in any redirect work.
- Publish/index pages only after explicit legal + editorial approval — never as a side effect of another change.
- Spanish-language content for the new core guides.
- Non-EU roadmap, autónomo guide, car-import guide (currently backlog-only, no page references them).

---

## Confirmation

- Build passes: `node scripts/generate-guide-system.js` — exit 0, "Validated metadata for 13 guide pages," no drift on re-run.
- Metadata validation passes (13/13).
- Broken internal link check passes (no warnings/errors).
- PR #5 is `MERGEABLE` per GitHub, with a successful Netlify deploy-preview check.
- Production homepage unchanged (0 diff vs. `main`).
- Live `/guides/eu-registration/` unchanged (0 diff vs. `main`).
- All 8 identified legacy live guide pages present and untouched.
- All 14 draft pages remain `noindex, nofollow`.
- No redirects added.
- No legacy content removed.
- **No merge to `main` was performed as part of preparing this package.**
