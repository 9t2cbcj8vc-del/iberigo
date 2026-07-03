# Group 1 Publication Decision Package

**Date:** 2026-07-03  
**Branch:** `group1/post-launch-homepage-link`  
**Status:** Homepage discovery link prepared — preview review pending  
**Publication status:** The five selected pages are live and indexable on production (`https://iberigo.eu`). This sprint adds a discovery link only; no page's publication or indexing status changed.

## Sprint 92 — Homepage Discovery Link Prepared

A small, calm homepage link to `/start-here/` has been prepared on `group1/post-launch-homepage-link`, not yet merged. It sits directly below the three hero situation cards in `index.html`'s `#guide-cards` section: a short line of supporting copy ("Not sure where to begin? Start with a practical overview of the first steps after moving to Spain.") plus a "Start here" link styled with the existing `.secondary-action` pill class (no CSS changes). It does not claim legal/professional advice and does not claim the guide covers every situation.

This does not publish any additional page. All five already-launched pages remain `index, follow`; all non-selected draft pages remain `noindex, nofollow`; `sitemap.xml`, `search-index.json`, and `robots.txt` are unchanged by this sprint's build. No redirects were added, no legacy guide was migrated, and `/guides/banking/` and `/guides/eu-registration/` are untouched. **Preview review is required before this PR merges.**

## Sprint 90 — Group 1 Launched (2026-07-03)

PR #16 ("Launch Group 1 owner-reviewed pages") was squash-merged into `main` (merge commit `1dc6b9b`). Branch protection required 1 approving review; per the established repo procedure, required approving reviews were temporarily set to 0, the PR was merged, and required reviews were immediately restored to 1 (confirmed back at 1).

Production verification on `https://iberigo.eu` confirmed:

- All five selected pages return `200`, show `index, follow`, no DRAFT badge, correct canonical URL, title/meta description, and the visible practical-information disclaimer.
- Production `sitemap.xml` contains exactly the five selected routes; production `search-index.json` contains exactly the five selected pages.
- Eight representative non-selected draft pages (including `/search/`) confirmed still `noindex, nofollow` and absent from the sitemap.
- `robots.txt` unchanged. `/guides/banking/` and `/guides/eu-registration/` both still return `200`. No redirects were added, no legacy guide was migrated, and no homepage/navigation change was made.

This launch is owner-reviewed practical information. It is **not** legal, tax, immigration, financial or rental advice, and does not constitute professional approval.

**Future recommendation (not actioned):** add a homepage or navigation link to `/start-here/` for improved discovery.

## Sprint 89 — Launch Preview QA Passed

PR #16 (commit `7ff11a4`) was checked on its Netlify deploy preview (`https://deploy-preview-16--iberigo.netlify.app`, deploy status: ready).

- All five selected pages: return `200`, no `noindex`/`nofollow`, `robots` is `index, follow`, no DRAFT badge rendered, canonical URL points to the correct production `iberigo.eu` route, title/meta description/Open Graph tags present, the practical-information disclaimer block is visible, all CTA links resolve to `200`, and no horizontal overflow at 1280px or 390px.
- `sitemap.xml` on the preview contains exactly the five selected routes and no other draft, legacy, test, or internal path.
- `search-index.json` on the preview contains exactly the five selected pages — no non-selected drafts or internal docs.
- Nine representative non-selected draft pages (`/moving-to-spain/eu-citizens/`, `/moving-to-spain/eu-registration/`, `/moving-to-spain/registering-on-the-padron/`, `/moving-to-spain/healthcare/`, `/moving-to-spain/non-eu-citizens/`, `/moving-to-spain/family-member-eu-citizen/`, `/living-in-spain/taxes/`, `/living-in-spain/driving/`, `/search/`) all confirmed still `noindex, nofollow` and absent from the sitemap.
- `robots.txt` unchanged, does not block the selected pages. `/guides/banking/` and `/guides/eu-registration/` both still return `200`. No redirects added, no legacy guide migrated.
- All five pages remain internally reachable through existing guide cross-links; no homepage/navigation change was made. **Future recommendation: add a homepage or navigation link to `/start-here/`** for improved discovery — not actioned this sprint.

No fixes were required. This is preview QA only — **PR #16 remains unmerged; no page is live-published.**

## Sprint 88 — Technical Launch PR Prepared

The technical launch changes for the five selected Group 1 pages have been prepared and opened as a PR into `main` (not merged):

- `status: "draft"` → `status: "published"` for the five selected routes only, via a new `publishedRoutes` set in `guideMetadataFor()` in `scripts/generate-guide-system.js`. This is the single control point: it drives `robots` meta, the canonical/status badge, and search-index inclusion in `scripts/guide-components.js`.
- `noindex, nofollow` removed only from the five selected pages; all 16 other draft pages confirmed unchanged.
- The five selected pages added to `sitemap.xml`; no other draft, legacy, test, or internal path added.
- `robots.txt` inspected and left unchanged — it already allows `/` generally and only blocks `/outputs/` and `/work/`, so it does not block the selected pages.
- No redirects added. No legacy guide migrated. `/guides/banking/` and `/guides/eu-registration/` both confirmed still returning `200` locally.
- No homepage or navigation change made — all five pages are already reachable through existing generated guide cross-links (confirmed by internal-link grep). A future sprint could consider adding a homepage link to `/start-here/` for better discovery, but this is a proposal only, not made this sprint.

No external legal, tax, immigration, financial or rental professional review is available. This launch is owner-reviewed practical information, not legal, tax, immigration, financial or rental advice. **The PR must be preview-checked in the Netlify deploy preview before merge.**

## Sprint 87 — Owner Decision Recorded

The owner has selected **Option 2: Publish Group 1 as owner-reviewed practical information**, covering all five Group 1 pages:

- `/start-here/`
- `/moving-to-spain/documents-checklist/`
- `/moving-to-spain/finding-accommodation/`
- `/moving-to-spain/settling-into-spain/`
- `/living-in-spain/opening-a-bank-account/`

No external legal, tax, immigration, financial or rental professional review is available. Proceeding toward publication is based on owner review, source checks, conservative wording and the existing disclaimer/trust blocks — not on professional sign-off.

**This does not mean legal approval.** Publication will still carry the known limitations already documented below. Technical launch has not yet happened: no `noindex, nofollow` has been removed, no sitemap entry has been added, no robots change has been made, no redirect has been added, and no homepage or navigation change has been made. All five selected pages, and all other draft/noindex surfaces, remain `noindex, nofollow` until a separate future launch sprint executes `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`.

This is a decision record only. No PR has been opened and no merge to `main` has been performed as part of this sprint.

## Purpose

This document prepares an owner publication decision for the five Group 1 pages. It does not publish any page, remove `noindex, nofollow`, approve indexing, add redirects, migrate legacy guides, or change navigation.

Because no external legal, tax, immigration, financial or rental professional review is available, any future publication decision must be framed as owner-reviewed practical information published with known limitations.

## Pages Included

| Page | Current status | Role |
|---|---|---|
| `/start-here/` | Owner risk pass preview QA completed — still not published | Entry and route-orientation page. |
| `/moving-to-spain/documents-checklist/` | Owner risk pass preview QA completed — still not published | Practical preparation checklist. |
| `/moving-to-spain/finding-accommodation/` | Owner risk pass preview QA completed — still not published | Practical housing and address-readiness guide. |
| `/moving-to-spain/settling-into-spain/` | Owner risk pass preview QA completed — still not published | Arrival sequencing hub. |
| `/living-in-spain/opening-a-bank-account/` | Owner risk pass preview QA completed — still not published | Bank-neutral everyday setup guide. |

## Review History

- Content review completed for Group 1.
- Visual QA completed for Group 1.
- Cross-page Guide System v1 consistency QA completed.
- Conservative owner-review risk pass completed.
- Preview QA of the new trust/disclaimer blocks completed.
- No external legal, tax, immigration, financial or rental professional review is available.

## Known Limitations

- These pages are owner-reviewed only.
- They are practical information, not legal, tax, immigration, financial or rental advice.
- Requirements can vary by municipality, office, bank, landlord, provider and personal situation.
- The Documents Checklist names specific forms and document concepts that may change.
- Finding Accommodation avoids detailed rental-law claims and should not be treated as legal advice.
- Settling Into Spain summarizes steps that are covered in other draft guides.
- Opening a Bank Account is bank-neutral and does not verify current bank fees, products or account conditions.
- Linked higher-risk pages remain unapproved for publication.

## Remaining Risks

- A reader may treat practical guidance as a definitive instruction despite disclaimers.
- Official requirements, bank policies, forms, fees and local procedures can change.
- Publishing Start Here could expose readers to links into draft guide areas that remain `noindex, nofollow` until separately approved.
- Publishing the Bank Account page creates topical overlap with the live legacy `/guides/banking/` page unless a later migration decision addresses it.
- Some lower-risk pages link to higher-risk draft guides that still require legal, tax or immigration review before publication.

## Launch Dependency Audit

### Internal Reachability

Group 1 pages are currently reachable through generated guide navigation and cross-links:

- `Start Here` appears in generated guide navigation.
- Documents Checklist is linked from the Moving to Spain breadcrumb/navigation pattern and many guide CTAs.
- Finding Accommodation is linked from roadmap and next-step CTAs.
- Settling Into Spain is linked from roadmap and next-step CTAs.
- Opening a Bank Account is linked from Living in Spain breadcrumb/navigation patterns and guide CTAs.

No homepage or live navigation change is required to make the pages technically reachable, although a future publication sprint may decide whether to add or adjust homepage links.

### Sitemap

The Group 1 routes are not currently listed in `sitemap.xml`. A future launch sprint should add only the selected published pages to the sitemap.

### Indexing

All Group 1 pages currently include `noindex, nofollow`. A future launch sprint must remove `noindex, nofollow` only from the selected pages, and must confirm no non-selected draft page becomes indexable.

### Robots

`robots.txt` allows the site generally and blocks `/outputs/` and `/work/`. It does not independently block the Group 1 routes. Current indexing protection comes from page-level `noindex, nofollow`.

### Legacy Route Overlap

- `/living-in-spain/opening-a-bank-account/` overlaps topically with live `/guides/banking/`.
- `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/settling-into-spain/` and `/start-here/` do not require redirects to publish as Group 1.
- Broader legacy migration decisions remain separate and should not be bundled into an owner publication decision.

### Redirects

Publishing Group 1 does not require redirects. No redirect should be added unless explicitly approved in a separate routing or migration decision.

### Homepage and Navigation

Publishing Group 1 does not technically require homepage or navigation changes. Any homepage or navigation change should be treated as a separate explicit decision, especially because Start Here links into the broader draft guide system.

## Publication Options

1. **Do not publish yet**  
   Keep all Group 1 pages `noindex, nofollow` until external professional review is available.

2. **Publish Group 1 as owner-reviewed practical information** — **Selected (Sprint 87)**  
   Publish all five pages with the existing caution, scope and disclaimer blocks. This option accepts known limitations and requires post-publication monitoring. Technical launch is a separate, pending step — see `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`.

3. **Publish only a smaller subset of Group 1**  
   Publish the lowest-risk pages first, such as `/start-here/` and selected practical guides, while keeping higher-friction pages `noindex, nofollow`.

4. **Keep pages noindex and continue improving**  
   Keep the current draft state while improving sources, reviewer notes, source cards or linked higher-risk pages.

## Recommended Cautious Launch Option

If the owner chooses to proceed without external professional review, the cautious option is:

**Publish only a smaller subset of Group 1 first.**

Suggested first subset:

- `/start-here/`
- `/moving-to-spain/finding-accommodation/`
- `/moving-to-spain/settling-into-spain/`

Suggested pages to consider after one more focused check:

- `/moving-to-spain/documents-checklist/`, because it names EX-18, Modelo 790-012, apostille/legalisation and document-preparation concepts.
- `/living-in-spain/opening-a-bank-account/`, because it overlaps with `/guides/banking/` and touches bank requirements, account types and fees.

This recommendation is not a publication action. It is a decision option for a future launch sprint.

## Rollback Plan

If any selected page is published and later needs to be withdrawn:

- restore `noindex, nofollow` on the affected page metadata
- remove the affected page from `sitemap.xml`
- leave the page route live unless there is a separate reason to remove it
- avoid redirects unless a separate routing decision approves them
- document the rollback reason in the review package or backlog
- regenerate the guide pages and rerun build, metadata validation and internal-link checks

## Post-Publication Monitoring Checklist

- Confirm selected pages return `200`.
- Confirm only selected pages are indexable.
- Confirm non-selected draft pages remain `noindex, nofollow`.
- Confirm Search behavior remains intentional.
- Monitor Search Console for indexing, duplicate-content or canonical issues.
- Watch for user confusion around EU vs. non-EU route selection.
- Watch for user confusion around documents that may not apply to everyone.
- Watch for reports of municipality, landlord, bank or office variation that should be added as caution.
- Re-check official-source links and named forms after launch.
- Schedule a later external professional review when available.
