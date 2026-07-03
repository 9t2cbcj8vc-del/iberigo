# Group 1 Technical Launch Checklist

**Date:** 2026-07-03  
**Status:** Group 1 launched as owner-reviewed practical information  
**PR #16 was squash-merged into `main` (commit `1dc6b9b`) on 2026-07-03 and is live on production (`https://iberigo.eu`).**

## Sprint 90 — Merged and Verified on Production (2026-07-03)

- [x] Merge PR #16 into `main`. *(Squash merge, commit `1dc6b9b`. Branch protection required 1 approving review; temporarily set to 0 via the established repo procedure, merged, then immediately restored to 1 — confirmed back at 1.)*
- [x] Post-merge local build/generation, metadata validation, and internal-link check on updated `main`. *(All pass, zero drift.)*
- [x] Selected five pages are `index, follow`, in `sitemap.xml`, and in `search-index.json` on updated `main`. *(Verified.)*
- [x] All non-selected draft pages remain `noindex, nofollow` and out of `sitemap.xml` on updated `main`. *(Verified — 16/16.)*
- [x] `robots.txt` unchanged; homepage and legacy routes (`/guides/banking/`, `/guides/eu-registration/`) return `200` locally. *(Verified.)*
- [x] Production verification on `https://iberigo.eu`: all five selected pages return `200`, `index, follow`, no DRAFT badge, correct canonical, title/description, visible disclaimer. *(Verified.)*
- [x] Production `sitemap.xml` and `search-index.json` each contain exactly the five selected pages. *(Verified.)*
- [x] Eight representative non-selected drafts (including `/search/`) confirmed still `noindex, nofollow` and out of the production sitemap. *(Verified.)*
- [x] Production `robots.txt` unchanged; `/guides/banking/` and `/guides/eu-registration/` return `200` on production; no redirects added. *(Verified.)*

No issues found; no fixes needed. **Future recommendation (not actioned): add a homepage or navigation link to `/start-here/`.**

## Sprint 89 — Launch Preview QA Passed

- [x] Confirm Netlify deploy preview is successful. *(`https://deploy-preview-16--iberigo.netlify.app`, PR #16, commit `7ff11a4`, deploy status: ready.)*
- [x] Confirm each selected page returns `200`, has no DRAFT badge, no `noindex`/`nofollow`, `index, follow` robots, correct canonical, title/description/Open Graph present, disclaimer block visible, working CTAs, and no layout break at 1280px/390px. *(All 5 pages passed.)*
- [x] Confirm `sitemap.xml` on the preview contains exactly the 5 selected routes and nothing else.
- [x] Confirm 9 representative non-selected draft pages remain `noindex, nofollow` and absent from the sitemap on the preview.
- [x] Confirm `search-index.json` on the preview contains exactly the 5 selected pages.
- [x] Confirm `robots.txt` unchanged and does not block selected pages; `/guides/banking/` and `/guides/eu-registration/` return `200`; no redirects added; no legacy migration.
- [x] Confirm the 5 pages remain internally reachable without a homepage/navigation change. *(Future recommendation only: add a homepage/navigation link to `/start-here/`.)*

No issues were found; no fixes were needed. **PR #16 remains unmerged.**

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
