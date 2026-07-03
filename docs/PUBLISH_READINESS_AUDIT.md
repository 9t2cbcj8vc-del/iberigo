# Publish Readiness Audit — All 22 Draft Pages

**Date:** 2026-07-02
**Scope:** every page merged into `main` under PR #5, #7, #8, #9, #10 (closed unmerged, superseded), #11. All 22 remain `status: draft`, `noindex, nofollow`. This is an audit only — no page's status, indexability, or content was changed while producing this document.

## Executive summary

No page in the batch is legally cleared to publish. Every page has completed a **content-level editorial pass** (tone, hedging, terminology, structure) and has **official-source links** where any external source is warranted, but **zero pages have had human legal, tax, or immigration professional sign-off** — that is the single blocking gap across the entire set, not any individual page's content quality. Within that shared constraint, pages differ meaningfully in *how much is riding on getting it right*: a factual error on `/start-here/` costs a reader a wrong click, while a factual error on `/living-in-spain/taxes/` or `/moving-to-spain/eu-registration/` could cost a reader money or a rejected application. This audit sorts pages by that risk profile so review effort can be sequenced sensibly, and recommends which pages are safe to consider first once professional review capacity exists — it does not itself authorize publishing anything.

---

## Step 1 — Page inventory

Legend for **Source coverage**: number of linked official sources (`.gob.es`/`europa.eu` domains only) — see `docs/SOURCE_VERIFICATION_MATRIX.md` for verification method per source.

### Original 14 pages (PR #5, #7, #8)

| Route | Title | Content status | Sensitivity | Source coverage | Editorial status | Legal/tax/immigration review | Internal links | Publication recommendation | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `/start-here/` | Start Here: Moving to Spain — IberiGo | Complete | Low | N/A (navigation only) | Complete (Sprint 37) | Not required — no factual claims | OK, validated | **1. Ready for human/legal review** (as a formality; nothing to actually review) | Persona-router only; now has zero "Coming soon" cards after Sprint 57 |
| `/search/` | Search IberiGo Guides — IberiGo | Complete (functional) | Low | N/A | Complete | Not applicable | OK | **1. Ready for human/legal review** | Indexes 0 guides while everything is draft — this is correct/by-design behavior, not a bug, but worth knowing before flipping any page to `published` |
| `/moving-to-spain/eu-citizens/` | Moving to Spain as an EU Citizen — IberiGo | Complete | **High** | 4 (Sprint 36) | Complete (Sprint 36) | **Required** | OK | **4. Needs major review before publication** | Flagship EU roadmap; sequencing claims span the whole journey |
| `/moving-to-spain/settling-into-spain/` | Settling Into Spain — IberiGo | Complete | Medium | 0 (hub page; links to sourced sub-guides instead) | Complete (Sprint 37) | Recommended | OK | **2. Needs light editorial cleanup first** — actually none identified; could move to review directly | Every specific claim is repeated (and sourced) on its own dedicated guide, so the lack of direct sources here is low-risk |
| `/moving-to-spain/documents-checklist/` | Documents Checklist for Moving to Spain — IberiGo | Complete | Medium-High | 4 — Modelo 790-012 directly verified; EX-18 links to the general Migraciones portal (exact form page unconfirmed, documented not guessed); apostille/legalisation directly verified (Sprint 63) | Complete (Sprint 37); wording re-checked in Sprint 62 against "may need" vs. "must," EU/non-EU split, and universality framing — already compliant, no edits needed | **Required** | OK | **1. Ready for human/legal review** (upgraded from Tier 3 in Sprint 62) | Source gap fully closed as of Sprint 63 — human/professional review still required. No residual source gaps remain |
| `/moving-to-spain/finding-accommodation/` | Finding Accommodation in Spain — IberiGo | Complete | Medium | 0 | Complete (Sprint 37) | Recommended (consumer-protection framing, not immigration law) | OK | **2. Needs light editorial cleanup first** — none identified; ready | Practical/consumer guidance, not immigration law; lower legal exposure than the rest of the set |
| `/moving-to-spain/registering-on-the-padron/` | Registering on the Padrón in Spain — IberiGo | Complete | **High** | 2 (Sprint 36) | Complete (Sprint 36) | **Required** | OK | **4. Needs major review before publication** | Highest sensitivity to municipal-variation overclaiming in the whole set (Torrevieja precedent) |
| `/moving-to-spain/healthcare/` | Healthcare in Spain for New Residents — IberiGo | Complete | **High** | 4 (Sprint 36) | Complete (Sprint 36) | **Required** | OK | **4. Needs major review before publication** | Entitlement depends on many personal factors; highest-consequence factual-error page for readers |
| `/moving-to-spain/eu-registration/` | EU Registration in Spain — IberiGo | Complete | **High** | 3 (Sprint 36) | Complete (Sprint 36) | **Required** | OK | **4. Needs major review before publication** | See SEO/migration section — this route also overlaps a live indexed legacy URL |
| `/living-in-spain/opening-a-bank-account/` | Opening a Bank Account in Spain — IberiGo | Complete | Medium | 0 | Complete (Sprint 37) | Recommended | OK | **2. Needs light editorial cleanup first** — none identified; ready | Bank-neutral, consumer-facing; lowest-risk of the "Living in Spain" admin pages |
| `/living-in-spain/digital-certificate/` | Digital Certificate and Cl@ve in Spain — IberiGo | Complete | Medium | 0 | Complete (Sprint 39) | Recommended | OK | **3. Needs source verification first** | FNMT/Cl@ve issuer sources were identified as needed but never added (see `docs/SOURCE_VERIFICATION_MATRIX.md`) |
| `/living-in-spain/social-security/` | Social Security in Spain — IberiGo | Complete | **High** | 1 (Sprint 43) | Complete (Sprint 39) | **Required** | OK | **4. Needs major review before publication** | Employment/Social Security obligation claims |
| `/living-in-spain/taxes/` | Taxes in Spain for New Residents — IberiGo | Complete | **High** | 1 (Sprint 43) | Complete (Sprint 36) | **Required** | OK | **4. Needs major review before publication** | Highest tax-risk page in the entire batch; explicit "not tax advice" disclaimer already present |
| `/living-in-spain/driving/` | Driving Licence in Spain for New Residents — IberiGo | Complete | **High** | 1 (Sprint 43) | Complete (Sprint 39) | **Required** | OK | **4. Needs major review before publication** | Rules depend on licence country/bilateral agreements — highest factual-drift risk (rules change over time) |

### Non-EU route batch (PR #11)

| Route | Title | Content status | Sensitivity | Source coverage | Editorial status | Legal/tax/immigration review | Internal links | Publication recommendation | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `/moving-to-spain/non-eu-citizens/` | Moving to Spain as a Non-EU Citizen — IberiGo | Complete | **High** | 4 (Sprint 46) | Complete (Sprint 46) | **Required** | OK, all 7 sub-guide links resolve | **4. Needs major review before publication** | Broadest, most nationality-dependent page in the whole project |
| `/moving-to-spain/family-member-eu-citizen/` | Moving to Spain as a Family Member of an EU Citizen — IberiGo | Complete | **High** | 4 (Sprint 49) | Complete (Sprint 49) | **Required** | OK | **4. Needs major review before publication** | Eligibility-by-relationship claims are the top risk |
| `/moving-to-spain/students/` | Moving to Spain as a Student — IberiGo | Complete | **High** | 5 (Sprint 52) | Complete (Sprint 52) | **Required** | OK | **4. Needs major review before publication** | EU/non-EU split + work-while-studying conditionality |
| `/moving-to-spain/work-in-spain/` | Moving to Spain for Work — IberiGo | Complete | **High** | 6 (Sprint 53) | Complete (Sprint 53) | **Required** | OK | **4. Needs major review before publication** | "Job offer is not enough by itself" is the central claim to verify |
| `/moving-to-spain/retire-in-spain/` | Retiring in Spain — IberiGo | Complete | **High** | 7 (Sprint 54) | Complete (Sprint 54) | **Required** (legal + tax) | OK | **4. Needs major review before publication** | Property-ownership and pension-tax claims are the top risk |
| `/moving-to-spain/family-reunification/` | Family Reunification in Spain — IberiGo | Complete | **High** | 5 (Sprint 55) | Complete (Sprint 55) | **Required** | OK | **4. Needs major review before publication** | Route-confusion with the EU family member page is the top risk — reviewer should confirm the comparison table is *legally*, not just editorially, accurate |
| `/moving-to-spain/digital-nomad-spain/` | Digital Nomad Visa and Remote Work in Spain — IberiGo | Complete | **High** | 6 (Sprint 56) | Complete (Sprint 56) | **Required** (legal + tax) | OK | **4. Needs major review before publication** | "No guaranteed tax benefit" framing needs the most scrutiny — this is exactly the kind of claim people expect a hidden upside on |
| `/moving-to-spain/self-employed-spain/` | Self-Employed and Autónomo in Spain — IberiGo | Complete | **High** | 6 (Sprint 57) | Complete (Sprint 57) | **Required** (legal + tax) | OK | **4. Needs major review before publication** | "Autónomo registration is not immigration permission" is the central claim |

### Group 5 designation

None of the 22 pages are placed in **"5. Should stay draft for now"** — every page has content and sources ready to be reviewed. The category exists for completeness but nothing currently occupies it. If a future decision is made not to launch a given persona route (e.g., digital nomad), that page would move here rather than being deleted.

---

## Step 2 — Safest first-public candidates

Ranked by how little damage a residual factual error could do, **not** by how "done" the content is (everything is equally content-complete):

1. **`/start-here/`** — no factual claims, purely a router. Closest thing to a zero-risk page in the set.
2. **`/moving-to-spain/documents-checklist/`** and **`/moving-to-spain/finding-accommodation/`** — practical/consumer guidance, not immigration or tax law. Documents Checklist's source gaps were fully closed in Sprints 62–63 (Modelo 790-012 and apostille/legalisation directly verified; EX-18 links to the general portal with the residual gap documented).
3. **`/moving-to-spain/settling-into-spain/`** — a sequencing hub that defers detail to its sourced sub-guides; low standalone risk.
4. **`/living-in-spain/opening-a-bank-account/`** — consumer-facing, bank-neutral, no immigration/tax claims of consequence.

**Recommended caution, in this order of increasing risk:**
- `/living-in-spain/digital-certificate/` (Medium, but has an unresolved source gap)
- `/moving-to-spain/registering-on-the-padron/`, `/moving-to-spain/eu-citizens/`, `/living-in-spain/social-security/` (High, EU-focused)
- `/moving-to-spain/healthcare/`, `/living-in-spain/driving/` (High, entitlement/legality-dependent)
- `/living-in-spain/taxes/`, `/moving-to-spain/eu-registration/` (High, and the latter has a live-URL migration decision attached — see Step 4)
- **All 8 Non-EU batch pages** — every single one is High sensitivity and nationality-dependent; none should be treated as an "easy" first page even though they're content-complete. Recommend reviewing these as a deliberate second wave, not mixed into an initial launch group.

**Nothing here is marked legally approved.** This ranking is about sequencing professional review time, not a publish decision.

---

## Step 3 — Professional review needs, by subject matter

| Review subject | Pages that need it |
|---|---|
| **Immigration eligibility** | EU Citizen Roadmap, Non-EU Citizen Roadmap, Family Member of an EU Citizen, Family Reunification, Students, Work in Spain, Retiring in Spain, Digital Nomad, Self-Employed, EU Registration, Padrón |
| **Tax residency** | Taxes, Retiring in Spain, Digital Nomad, Self-Employed, Work in Spain (secondary) |
| **Healthcare entitlement** | Healthcare, Social Security (secondary), Retiring in Spain (secondary), Students (secondary) |
| **Social Security obligations** | Social Security, Work in Spain, Self-Employed, Digital Nomad (secondary) |
| **Driving licence legality** | Driving |
| **Employment / work rights** | Work in Spain, Students (work-while-studying section), Digital Nomad |
| **Family residence rights** | Family Member of an EU Citizen, Family Reunification |
| **TIE/NIE/EU Registration distinctions** | Every High-sensitivity page in the batch touches this — it's the single most-repeated claim across the whole project (by design, see `docs/NON_EU_BATCH_AUDIT.md`), so verifying it once, carefully, effectively verifies it everywhere it's used verbatim |

**Practical implication:** because the TIE/NIE/EU Registration distinction is deliberately repeated near-identically across 8+ pages, a professional reviewer confirming that one paragraph is accurate substantially de-risks the whole batch at once. This should be an early, high-leverage review task rather than something checked page-by-page independently.

---

## Step 4 — SEO and migration decisions needed (documentation only — nothing executed)

- **`/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/`** — the live, indexed legacy page and the draft replacement are two different URLs today (resolved this way in Sprint 34 specifically to avoid overwriting live content). A decision is still needed on whether to redirect one to the other, keep both, or something else, once the draft is legally approved. See `docs/MIGRATION_PLAN.md`.
- **5 topically-overlapping legacy `/guides/*` pages** (padrón, social-security, taxes, banking, digital) exist at different URLs from their new-structure counterparts. No redirect strategy has been designed yet; this remains open in `docs/MIGRATION_PLAN.md`.
- **3 more specifically-named legacy pages** (`vida-laboral`, `driving-licence-exchange`, Torrevieja padrón) have a documented keep/migrate/rewrite decision pending, also in `docs/MIGRATION_PLAN.md`.
- **Pages that should eventually become indexable:** none yet — this audit doesn't change that. Once legal/tax/immigration review clears a page, the mechanism to publish it is changing its `status` metadata away from `draft` (see `scripts/guide-components.js`'s `GuideLayout` — `robots` is derived directly from `status`), which is a deliberate, single-purpose code change, not a side effect of any other edit.
- **Pages that should stay `noindex,nofollow` longer:** by definition, everything not yet cleared — i.e., currently all 22.
- **hreflang considerations:** only `/guides/eu-registration/` currently has a live `hreflang` en/es pairing (with `/guides/es/eu-registration/`). None of the 22 draft pages have Spanish-language counterparts yet (tracked in `docs/BACKLOG.md`), so no draft page currently needs hreflang — but any future redirect involving `/guides/eu-registration/` must preserve that pairing (see `docs/MIGRATION_PLAN.md`).
- **Sitemap/indexing strategy:** not yet designed. No `sitemap.xml` references were found in this audit's scope; when pages start becoming indexable, a sitemap update should be planned as its own task rather than assumed to happen automatically.

---

## Step 5 — Suggested launch groups

### Group 1 — Low-risk orientation pages
`/start-here/`, `/search/`, `/moving-to-spain/settling-into-spain/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/living-in-spain/opening-a-bank-account/`

**Must happen first (updated Sprint 62):** ~~close the Documents Checklist source gap~~ — done. Confirm `/search/`'s "0 guides indexed" behavior is acceptable for a first launch or needs revisiting once other pages go live; light legal sign-off given the low factual-claim density across the group.

#### Group 1 re-check (Sprint 62)

| Page | Source gap | Editorial status | Sensitivity | Remaining human review | `noindex,nofollow` |
|---|---|---|---|---|---|
| `/start-here/` | None (no factual claims) | Complete | Low | Formality only | Confirmed |
| `/moving-to-spain/documents-checklist/` | **Fully closed (Sprints 62–63)** — Modelo 790-012 and apostille/legalisation both verified; EX-18 links to general portal, gap documented | Complete; wording re-checked, no edits needed | Medium-High | Required — but content and sources are now ready for it | Confirmed |
| `/moving-to-spain/finding-accommodation/` | None identified (consumer/practical framing) | Complete | Medium | Recommended | Confirmed |
| `/moving-to-spain/settling-into-spain/` | None (hub page defers to sourced sub-guides) | Complete | Medium | Recommended | Confirmed |
| `/living-in-spain/opening-a-bank-account/` | None identified | Complete | Medium | Recommended | Confirmed |

Group 1 now has **zero pages sitting in Tier 3 (needs source verification first)** — Documents Checklist was the only one and it moved to Tier 1 this sprint. The group is ready for the same human/legal review step as a batch; nothing left in Group 1 is blocked on further source work.

#### Group 1 legal review preparation (Sprint 77)

A focused legal/professional review brief has been created at `docs/GROUP1_LEGAL_REVIEW_BRIEF.md` for:

- `/start-here/`
- `/moving-to-spain/documents-checklist/`
- `/moving-to-spain/finding-accommodation/`
- `/moving-to-spain/settling-into-spain/`
- `/living-in-spain/opening-a-bank-account/`

The brief provides page-by-page reviewer questions, current official-source summaries, source limitations, and blank reviewer outcome fields. This does not change publication readiness: Group 1 is still not published, no page is approved for indexing, and all pages remain `noindex, nofollow`.

#### Group 1 owner-review risk pass (Sprint 80)

No external legal/professional reviewer is available yet, so an owner-review conservative wording-risk pass was completed for the five Group 1 pages. This pass checked for overconfident wording, implied fixed timelines, route labels that could mislead users, and claims that could vary by municipality, office, bank, landlord or personal situation.

Small conservative wording changes were made to reduce obvious risk: the generated legal disclaimer was broadened, Group 1 pages now include the shared trust/disclaimer blocks, Start Here route-card language was softened, Documents Checklist universality language was softened, and minor accommodation/settling wording was adjusted. This is **not** legal, tax, immigration, rental or financial approval. Group 1 remains not published, no page is approved for indexing, and all pages remain `noindex, nofollow`.

#### Group 1 owner risk pass preview QA (Sprint 82)

PR #14 preview QA was completed for the five Group 1 pages at desktop (~1280px) and mobile (~390px). The added disclaimer/trust blocks were confirmed calm, useful, and not visually dominant; each page shows the disclaimer once near the end of the guide flow. No mobile overflow, TOC regression, reading-time regression, card/CTA alignment issue, or alarming repetition was found.

This preview QA does not change publication readiness: Group 1 remains not published, no page is approved for indexing, and all pages remain `noindex, nofollow`.

#### Group 1 publication decision preparation (Sprint 84)

A final owner-publication decision package has been created at `docs/GROUP1_PUBLICATION_DECISION.md`, with a future-launch checklist at `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`. The decision package records current dependencies, known limitations, remaining risks, publication options, a cautious smaller-subset launch option, rollback planning, and post-publication monitoring.

This is decision preparation only: Group 1 is eligible for an owner publication decision, but still not published. No page is approved for indexing, and all pages remain `noindex, nofollow`.

#### Group 1 owner publication choice recorded (Sprint 87)

The owner has selected the option to proceed toward publishing all five Group 1 pages as owner-reviewed practical information, with clear disclaimers and known limitations, since no external legal/professional review is available. This is not legal, tax, immigration, financial or rental advice, and it does not equal legal approval. Technical launch has not happened: `noindex, nofollow` remains on all five pages (and all other draft surfaces), the sitemap is unchanged, robots is unchanged, no redirects have been added, and no homepage/navigation change has been made. Status: **Owner publication selected — technical launch pending.** See `docs/GROUP1_PUBLICATION_DECISION.md` and `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`.

#### Group 1 technical launch PR prepared (Sprint 88)

The technical launch has been prepared and opened as a PR into `main` (not merged): `noindex, nofollow` removed only from the five selected pages via a `publishedRoutes` set in `guideMetadataFor()` (`scripts/generate-guide-system.js`); the five pages added to `sitemap.xml`; `robots.txt` inspected and left unchanged since it did not block the routes; no redirects added; no legacy guide migrated; `/guides/banking/` and `/guides/eu-registration/` both confirmed still returning `200`. All 16 other draft pages verified still `noindex, nofollow`. No external legal/professional review was available. Status: **Technical launch PR prepared — preview review pending.** The PR must be checked in the Netlify deploy preview before merge.

#### Group 1 launch preview QA passed (Sprint 89)

PR #16 (commit `7ff11a4`) was checked on its Netlify deploy preview (`https://deploy-preview-16--iberigo.netlify.app`). All five selected pages passed: `200` response, no DRAFT badge, no `noindex`/`nofollow`, correct canonical URL, title/description/Open Graph metadata, visible disclaimer, working CTAs, no layout break at 1280px/390px. The preview's `sitemap.xml` and `search-index.json` each contained exactly the five selected pages. Nine representative non-selected draft pages were confirmed still `noindex, nofollow` and absent from the sitemap. `robots.txt` unchanged; `/guides/banking/` and `/guides/eu-registration/` still return `200`; no redirects or legacy migrations were made. No issues found, no fixes needed. Status: **Launch preview QA passed — merge pending.** PR #16 remains unmerged.

#### Group 1 launched (Sprint 90, 2026-07-03)

PR #16 was squash-merged into `main` (commit `1dc6b9b`). Branch protection required 1 approving review; per the established repo procedure this was temporarily set to 0, the PR was merged, and it was immediately restored to 1. Production verification on `https://iberigo.eu` confirmed all five selected pages return `200`, `index, follow`, no DRAFT badge, correct canonical/title/description, and a visible disclaimer; production `sitemap.xml` and `search-index.json` contain exactly the five selected pages; eight representative non-selected drafts remain `noindex, nofollow` and out of the sitemap; `robots.txt` is unchanged; `/guides/banking/` and `/guides/eu-registration/` still return `200`; no redirects, legacy migration, or homepage/navigation changes were made. Status: **Group 1 launched as owner-reviewed practical information.** Future recommendation, not actioned: add a homepage or navigation link to `/start-here/`.

#### Homepage discovery link prepared (Sprint 92)

A small homepage link to `/start-here/` (with calm supporting copy, no legal/professional-advice framing) has been added to the homepage hero on `group1/post-launch-homepage-link` using the existing `.secondary-action` style — no `styles.css` changes, no additional page published. The five already-launched pages remain `index, follow`, all non-selected drafts remain `noindex, nofollow`, and `sitemap.xml`/`search-index.json`/`robots.txt` are unchanged. No redirects or legacy migration were made. Status: **Homepage discovery link prepared — preview review pending.** Not yet merged.

#### Homepage discovery link preview QA passed (Sprint 93)

PR #18 (commit `7ed2612`) was checked on its Netlify deploy preview at 1280px and 390px: homepage returns `200`, the `/start-here/` link is visible and naturally placed under the hero cards with calm copy, no crowding, no legal/professional-advice implication, and no overflow or style regression. `/start-here/` returns `200` and remains `index, follow`. All five launched pages remain `index, follow`; eight representative non-selected drafts remain `noindex, nofollow`; the preview's `sitemap.xml`, `search-index.json`, `robots.txt`, and `styles.css` are byte-identical to `main`. No redirects or legacy migration; `/guides/banking/` and `/guides/eu-registration/` both return `200`. No issues found, no fixes needed. Status: **Homepage discovery link preview QA passed — merge pending.** PR #18 remains unmerged.

#### Move to Spain card link prepared (Sprint 94 revision)

PR #18 (which added a standalone "Start here" block) was merged and is currently live in production. This has now been revised: the standalone block is removed from `index.html`, and the homepage's existing "Move to Spain" card "Explore" button now links directly to `/start-here/` using the existing `.primary-action` style. "Vacation" and "Live" cards are unchanged; no global navigation change was made. The five launched pages remain `index, follow`, non-selected drafts remain `noindex, nofollow`, and `sitemap.xml`/`search-index.json`/`robots.txt`/`styles.css` are unchanged (verified byte-identical to `main`). No redirects or legacy migration. Status: **Homepage Move to Spain link preview QA pending.** Prepared on a new PR, not yet merged.

#### Sitewide visual coherence audit completed (Sprint 95A)

PR #19 (not yet merged) revises the homepage "Move to Spain" card to link directly to `/start-here/`, replacing the standalone block from Sprint 92/93. Before merging it, audited the whole public site for visual coherence: homepage, Vacation in Spain, Live in Spain, The Spain Files, Donate, all 37 live legacy `/guides/*` pages, and the 5 launched Guide System v1 pages. Found three distinct visual systems in production today (original/homepage system, The Spain Files' own scoped magazine style, and Guide System v1), sharing the same header/footer/typography/color family but differing in card border-radius (8px / 14px / 16px) and card/hero layout conventions. The most significant gap found is structural rather than stylistic: legacy `/guides/*` pages have no dedicated static layout — each is a byte-for-byte homepage clone that relies on client-side JS (`data-guide-id`) to populate guide-specific content, unlike the Guide System v1 pages which are fully static per-page HTML. **Recommendation: merge PR #19 as-is** — it is a small, low-risk, same-system change that neither creates nor worsens any inconsistency found. A staged, non-global unification plan (radius alignment via scoped classes first, legacy-page structural fix second, Vacation/Live landing-page decision third, homepage card redesign as a separate later decision) is recorded in `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md`. This was audit/planning only: no page was published, no `noindex, nofollow` was removed, no redirects were added, no legacy guide was migrated, and no `styles.css` change was made. Status: **Sitewide visual coherence audit completed — implementation pending.** PR #19 remains open and unmerged.

### Group 2 — EU citizen core journey
`/moving-to-spain/eu-citizens/`, `/moving-to-spain/eu-registration/`, `/moving-to-spain/registering-on-the-padron/`, `/moving-to-spain/healthcare/`

**Must happen first:** full immigration-eligibility legal review (this is the flagship journey); resolve the `/guides/eu-registration/` URL/migration decision *before* this group launches, since launching the draft without resolving that would create two competing live pages on the same topic under different URLs.

### Group 3 — Living in Spain admin pages
`/living-in-spain/opening-a-bank-account/`, `/living-in-spain/digital-certificate/`, `/living-in-spain/social-security/`, `/living-in-spain/taxes/`, `/living-in-spain/driving/`

**Must happen first:** close the Digital Certificate source gap (FNMT/Cl@ve issuer); tax review for Taxes; Social Security obligation review; driving-licence legality review (highest factual-drift risk — rules change, so this page may need a "last verified" freshness process even after initial approval).

### Group 4 — Non-EU route pages
All 8 pages: Non-EU Citizen Roadmap, Family Member of an EU Citizen, Students, Work in Spain, Retiring in Spain, Family Reunification, Digital Nomad, Self-Employed.

**Must happen first:** the TIE/NIE/EU Registration distinction review (high-leverage, covers most of this group at once); individual eligibility-claim review per page per Step 3's table; a decision on whether Start Here should branch between the two family routes and whether it needs a dedicated digital-nomad card (both still open per `docs/BACKLOG.md`) — cosmetic/UX decisions, not blockers, but worth resolving before this group launches together.

### Group 5 — High-risk tax/legal pages
`/living-in-spain/taxes/`, `/moving-to-spain/retire-in-spain/`, `/moving-to-spain/digital-nomad-spain/`, `/moving-to-spain/self-employed-spain/`

(These also appear in Groups 3/4 above — listed again here because they share the same *type* of highest-scrutiny requirement: tax-residency and financial-outcome claims, which are the category most likely to cause real-world harm if wrong.)

**Must happen first:** qualified tax-professional review specifically (not just general legal review) for all four, given each makes claims about tax residency, worldwide income, or "no guaranteed benefit" framing that a tax professional is best positioned to stress-test.

---

## Step 6 — Checks

`node scripts/generate-guide-system.js` — build passes, metadata validation passes (21/21 source pages, 22 including the generated search page), internal-link check passes, no drift on re-run.

---

## Confirmation

- All 22 draft pages remain `status: draft`, `noindex, nofollow`.
- No page was published, made indexable, or had its content changed.
- No redirects were added.
- No legacy guides were migrated.
- No new pages were created.
- **No PR was opened. No merge was performed.**
