# Group 1 Publication Decision Package

**Date:** 2026-07-03  
**Branch:** `group1/publication-decision`  
**Status:** Eligible for owner publication decision — still not published  
**Publication status:** No page is published. All draft pages remain `noindex, nofollow`.

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

2. **Publish Group 1 as owner-reviewed practical information**  
   Publish all five pages with the existing caution, scope and disclaimer blocks. This option accepts known limitations and requires post-publication monitoring.

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
