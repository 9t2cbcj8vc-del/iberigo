# Group 1 Technical Launch Checklist

**Date:** 2026-07-03  
**Status:** Launch checklist only — no launch action performed  

This checklist is for a future launch sprint. Do not perform these actions in this documentation sprint.

## Future Launch Scope

- [ ] Record the exact Group 1 pages selected for publication.
- [ ] Confirm non-selected draft pages will remain `noindex, nofollow`.
- [ ] Confirm the decision is owner-reviewed practical information, not legal, tax, immigration, financial or rental advice.
- [ ] Confirm publication approval is explicit and separate from review preparation.

## Indexing Changes

- [ ] Remove `noindex, nofollow` only from selected pages.
- [ ] Confirm no accidental publication of non-selected draft pages.
- [ ] Confirm no selected page uses draft/review badge text after publication, unless deliberately retained for internal staging.
- [ ] Confirm no page is described as professionally certified or cleared for indexing in docs or page copy.

## Sitemap and Robots

- [ ] Add selected pages to `sitemap.xml` only when publishing.
- [ ] Do not add non-selected draft pages to `sitemap.xml`.
- [ ] Confirm `robots.txt` does not block selected pages.
- [ ] Confirm `/outputs/` and `/work/` remain blocked as intended.

## Metadata

- [ ] Confirm canonical URLs for selected pages.
- [ ] Confirm page titles and meta descriptions.
- [ ] Confirm Open Graph metadata.
- [ ] Confirm `lastReviewed` text remains accurate.
- [ ] Confirm scope notice and disclaimer remain present where appropriate.

## Links and Navigation

- [ ] Confirm selected pages return `200`.
- [ ] Confirm selected pages have working internal links.
- [ ] Confirm internal links from appropriate places.
- [ ] Confirm old live pages are not broken.
- [ ] Confirm homepage behavior is intentional.
- [ ] Confirm generated guide navigation remains intentional.
- [ ] Confirm Search behavior is intentional after any page becomes published.

## Redirects and Legacy Routes

- [ ] Confirm no redirects are added unless explicitly approved.
- [ ] Confirm no legacy guide migration is included unless explicitly approved.
- [ ] Confirm `/guides/banking/` remains handled intentionally if `/living-in-spain/opening-a-bank-account/` is selected.
- [ ] Confirm `/guides/eu-registration/` to `/moving-to-spain/eu-registration/` remains a separate routing decision and is not bundled into Group 1 publication.

## Validation

- [ ] Run guide build/generation.
- [ ] Run metadata validation.
- [ ] Run broken internal link check.
- [ ] Confirm all selected pages return `200`.
- [ ] Confirm all non-selected draft/noindex surfaces remain `noindex, nofollow`.
- [ ] Confirm no sitemap drift beyond selected pages.
- [ ] Confirm no robots changes unless explicitly approved.
- [ ] Confirm no redirect drift unless explicitly approved.
- [ ] Confirm no homepage/navigation drift unless explicitly approved.
- [ ] Confirm no live indexed pages changed unexpectedly.

## Rollback

- [ ] Identify the exact commit that published selected pages.
- [ ] Confirm rollback method: restore selected page metadata to draft/noindex and remove selected sitemap entries.
- [ ] Confirm rollback does not require route deletion.
- [ ] Confirm rollback does not require redirects unless separately approved.
- [ ] Re-run build, metadata validation and internal-link checks after rollback.
- [ ] Document rollback reason and date in the review package or backlog.
