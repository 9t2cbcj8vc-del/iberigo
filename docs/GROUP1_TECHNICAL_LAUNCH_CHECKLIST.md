# Group 1 Technical Launch Checklist

**Date:** 2026-07-03  
**Status:** Technical launch PR prepared — preview review pending  
**Technical launch changes are prepared in an open PR and have not been merged. No page is live-published until the PR merges and a deploy completes.**

## Sprint 88 — Launch PR Prepared

The changes below have been made on `group1/owner-publication-choice` and opened as a PR into `main`. They are not live until the PR is reviewed via the Netlify deploy preview and merged.

## Sprint 87 — Selected Launch Set

The owner has selected the following pages for publication (recorded in `docs/GROUP1_PUBLICATION_DECISION.md`). This selection does not itself perform any launch action — every item below remains unchecked and `noindex, nofollow` remains in place on all five pages until a future launch sprint executes this checklist:

- `/start-here/`
- `/moving-to-spain/documents-checklist/`
- `/moving-to-spain/finding-accommodation/`
- `/moving-to-spain/settling-into-spain/`
- `/living-in-spain/opening-a-bank-account/`

## Future Launch Scope

- [x] Record the exact Group 1 pages selected for publication. *(Recorded Sprint 87 — see `docs/GROUP1_PUBLICATION_DECISION.md`.)*
- [x] Confirm non-selected draft pages will remain `noindex, nofollow`. *(Verified Sprint 88 — all 16 other draft pages checked, unchanged.)*
- [x] Confirm the decision is owner-reviewed practical information, not legal, tax, immigration, financial or rental advice. *(Stated in PR body and decision docs.)*
- [ ] Confirm publication approval is explicit and separate from review preparation. *(Owner decision recorded Sprint 87; final merge approval still pending preview review.)*

## Indexing Changes

- [x] Remove `noindex, nofollow` only from selected pages. *(Done Sprint 88 via `publishedRoutes` in `scripts/generate-guide-system.js`; not yet merged/deployed.)*
- [x] Confirm no accidental publication of non-selected draft pages. *(Verified — 16/16 other draft pages still `noindex, nofollow`.)*
- [x] Confirm no selected page uses draft/review badge text after publication. *(Verified — `StatusBadge` renders nothing for `status: "published"`.)*
- [ ] Confirm no page is described as professionally certified or cleared for indexing in docs or page copy. *(To confirm again at preview review; docs use only "owner-reviewed" language.)*

## Sitemap and Robots

- [x] Add selected pages to `sitemap.xml` only when publishing. *(Done Sprint 88 — 5 entries added.)*
- [x] Do not add non-selected draft pages to `sitemap.xml`. *(Verified — sitemap only gained the 5 selected URLs.)*
- [x] Confirm `robots.txt` does not block selected pages. *(Verified Sprint 88 — unchanged, only blocks `/outputs/` and `/work/`.)*
- [x] Confirm `/outputs/` and `/work/` remain blocked as intended. *(Verified — `robots.txt` untouched.)*

## Metadata

- [x] Confirm canonical URLs for selected pages. *(Verified — all 5 have `<link rel="canonical">` to their own URL.)*
- [ ] Confirm page titles and meta descriptions. *(Titles/descriptions unchanged by this PR; final copy check still pending at preview review.)*
- [ ] Confirm Open Graph metadata. *(Unchanged by this PR; pending preview review.)*
- [ ] Confirm `lastReviewed` text remains accurate. *(Unchanged by this PR; pending preview review.)*
- [ ] Confirm scope notice and disclaimer remain present where appropriate. *(Unchanged by this PR; pending preview review.)*

## Links and Navigation

- [x] Confirm selected pages return `200`. *(Verified locally Sprint 88 via local static server.)*
- [x] Confirm selected pages have working internal links. *(Verified — broken-link check passes; each page has 8–17 existing internal cross-links.)*
- [x] Confirm internal links from appropriate places. *(Verified — all 5 pages already reachable through existing guide cross-links; no nav change needed.)*
- [x] Confirm old live pages are not broken. *(`/guides/banking/` and `/guides/eu-registration/` both return `200` locally.)*
- [ ] Confirm homepage behavior is intentional. *(Homepage unchanged this sprint; a future homepage link to `/start-here/` is proposed, not added.)*
- [x] Confirm generated guide navigation remains intentional. *(No navigation code changed.)*
- [x] Confirm Search behavior is intentional after any page becomes published. *(Search index now includes the 5 published pages, 0 → 5, as designed by `buildSearchIndex`.)*

## Redirects and Legacy Routes

- [x] Confirm no redirects are added unless explicitly approved. *(None added.)*
- [x] Confirm no legacy guide migration is included unless explicitly approved. *(None done.)*
- [x] Confirm `/guides/banking/` remains handled intentionally if `/living-in-spain/opening-a-bank-account/` is selected. *(Left as-is and returns `200`; overlap accepted per `docs/GROUP1_PUBLICATION_DECISION.md`.)*
- [x] Confirm `/guides/eu-registration/` to `/moving-to-spain/eu-registration/` remains a separate routing decision and is not bundled into Group 1 publication. *(Untouched; not part of Group 1.)*

## Validation

- [x] Run guide build/generation. *(`node scripts/generate-guide-system.js` — passes, no drift beyond the 5 selected pages + search index.)*
- [x] Run metadata validation. *(Passes as part of the same generation run — 21/21 validated.)*
- [x] Run broken internal link check. *(Passes as part of the same generation run.)*
- [x] Confirm all selected pages return `200`. *(Verified locally.)*
- [x] Confirm all non-selected draft/noindex surfaces remain `noindex, nofollow`. *(Verified — 16/16.)*
- [x] Confirm no sitemap drift beyond selected pages. *(Verified — only the 5 selected URLs added.)*
- [x] Confirm no robots changes unless explicitly approved. *(`robots.txt` untouched.)*
- [x] Confirm no redirect drift unless explicitly approved. *(None added.)*
- [x] Confirm no homepage/navigation drift unless explicitly approved. *(Homepage/nav files untouched.)*
- [ ] Confirm no live indexed pages changed unexpectedly. *(To reconfirm at Netlify preview review before merge.)*

## Rollback

- [ ] Identify the exact commit that published selected pages.
- [ ] Confirm rollback method: restore selected page metadata to draft/noindex and remove selected sitemap entries.
- [ ] Confirm rollback does not require route deletion.
- [ ] Confirm rollback does not require redirects unless separately approved.
- [ ] Re-run build, metadata validation and internal-link checks after rollback.
- [ ] Document rollback reason and date in the review package or backlog.
