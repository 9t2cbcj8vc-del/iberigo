# IberiGo Backlog

This is the internal product backlog for IberiGo.

## In Progress

- **Group 1 visual QA before publication** (from Sprint 65 human review — content acceptable for now, visual/design work required before any Group 1 page publishes):
  - review page layout
  - check mobile layout
  - check desktop layout
  - check spacing and card design
  - check typography hierarchy
  - check CTA presentation
  - check consistency across Group 1
  - only after visual QA, reconsider publication readiness
  - ~~open question from the reviewer: which visual/design system should Group 1 use before publication?~~ **Answered (Sprint 66): IberiGo Guide System v1** — calm, practical, government-adjacent, card-based, mobile-first; see `docs/IBERIGO_GUIDE_SYSTEM_V1.md`
  - Guide System v1 CSS scope audit completed (Sprint 67) — recommended approach: scoped inline `guideCss()` styles (Option D), zero exposure to live indexed pages; unsafe selectors documented; see `docs/GUIDE_SYSTEM_V1_CSS_SCOPE_PLAN.md`
  - ~~Next step: apply scoped Guide System v1 styles to Group 1~~ **Applied (Sprint 68)** — scoped inline `guideCss()` pass, styles.css untouched, scope check passed; browser QA at 390px/1280px found no overflow, 44px tap targets, stacking tables, calm warning styling (details in `docs/GROUP1_REVIEW_PACKAGE.md`)
  - Local visual QA pack prepared (Sprint 69) — screenshots in `visual-qa/group1/` (untracked), report in `docs/GROUP1_VISUAL_QA_REPORT.md`; zero visual issues, one content finding
  - User-facing source-note cleanup completed (Sprint 70) — internal verification commentary removed from all official-source card notes and Source status banners across every generated page; verification history preserved in `docs/SOURCE_VERIFICATION_MATRIX.md`
  - Human visual review found TOC overlap/cramped sidebar and reading-time placement issues (Sprint 72); scoped fixes applied in generated guide components only, with `styles.css` untouched
  - Cross-page Guide System v1 consistency QA completed (Sprint 73) — all 22 draft/noindex surfaces checked at desktop/mobile widths; no new visual consistency issues found; details in `docs/GUIDE_SYSTEM_V1_CONSISTENCY_QA.md`
  - **Status: Visual review completed — still not published** — no page approved for publication, all pages remain noindex, nofollow; legal/tax/immigration and final editorial approval remain separate publish blockers
- Group 1 legal review brief created (Sprint 77) — reviewer questions, source summaries, source limitations, and allowed review outcome fields are in `docs/GROUP1_LEGAL_REVIEW_BRIEF.md`; Group 1 still not published, no page approved for indexing, all pages remain noindex, nofollow
- Group 1 owner-review conservative risk pass completed (Sprint 80) — no external legal/professional review is available yet; wording was checked and lightly softened for obvious risk, the shared disclaimer was broadened, and Group 1 remains not published with all pages still noindex, nofollow. Status: **Owner review risk pass completed — still not published**.
- Group 1 owner risk pass preview QA completed (Sprint 82) — PR #14 preview checked at desktop and mobile widths; the new trust/disclaimer blocks are calm, appear once per page, and do not create overflow, TOC, reading-time, card or CTA regressions. Status: **Owner risk pass preview QA completed — still not published**.
- Group 1 publication decision package created (Sprint 84) — decision record and future technical launch checklist are in `docs/GROUP1_PUBLICATION_DECISION.md` and `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`; owner publication decision is pending, Group 1 is still not published, no page is approved for indexing, and all pages remain noindex, nofollow. Status: **Eligible for owner publication decision — still not published**.
- Group 1 owner publication choice recorded (Sprint 87) — owner has chosen to proceed toward publishing all five Group 1 pages (`/start-here/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/settling-into-spain/`, `/living-in-spain/opening-a-bank-account/`) as owner-reviewed practical information, since no external legal/professional review is available; this is not legal, tax, immigration, financial or rental advice. Technical launch has not happened — all pages remain noindex, nofollow, sitemap/robots/redirects/homepage/navigation are unchanged, and no PR or merge has been done. Status: **Owner publication selected — technical launch pending**. See `docs/GROUP1_PUBLICATION_DECISION.md` and `docs/GROUP1_TECHNICAL_LAUNCH_CHECKLIST.md`.
- Group 1 technical launch PR prepared (Sprint 88) — `noindex, nofollow` removed only from the five selected pages, five pages added to `sitemap.xml`, `robots.txt` left unchanged (already permitted the routes), no redirects added, no legacy guide migrated; all 16 other draft pages verified still `noindex, nofollow`; `/guides/banking/` and `/guides/eu-registration/` confirmed still returning `200`. No external legal/professional review was available; launch remains owner-reviewed practical information. PR opened into `main`, not merged. Status: **Technical launch PR prepared — preview review pending**.
- Group 1 launch preview QA passed (Sprint 89) — PR #16 (commit `7ff11a4`) checked on its Netlify deploy preview: all five selected pages return `200` with no DRAFT badge, no `noindex`/`nofollow`, correct canonical/title/description/Open Graph, visible disclaimer, working CTAs, and no layout break at 1280px/390px; the preview's `sitemap.xml` and `search-index.json` each contain exactly the five selected pages; nine representative non-selected draft pages confirmed still `noindex, nofollow` and absent from the sitemap; `robots.txt` unchanged; `/guides/banking/` and `/guides/eu-registration/` still return `200`; no redirects or legacy migrations made. No issues found, no fixes needed. Future recommendation (not actioned): add a homepage/navigation link to `/start-here/`. Status: **Launch preview QA passed — merge pending**. PR #16 remains unmerged.
- **Group 1 launched (Sprint 90, 2026-07-03)** — PR #16 squash-merged into `main` (commit `1dc6b9b`); branch protection required approving reviews temporarily set 1 → 0 → 1 per the established repo procedure. Production verification on `https://iberigo.eu` confirmed the five selected pages (`/start-here/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/settling-into-spain/`, `/living-in-spain/opening-a-bank-account/`) return `200`, `index, follow`, no DRAFT badge, correct canonical/title/description, visible disclaimer; production `sitemap.xml` and `search-index.json` contain exactly these five pages; eight representative non-selected drafts remain `noindex, nofollow` and out of the sitemap; `robots.txt` unchanged; `/guides/banking/` and `/guides/eu-registration/` return `200`; no redirects, legacy migration, or homepage/navigation changes made. Status: **Group 1 launched as owner-reviewed practical information**. Not legal, tax, immigration, financial or rental advice; not professional approval. Future recommendation, not actioned: add a homepage or navigation link to `/start-here/`.
- **Homepage discovery link prepared (Sprint 92)** — a small link to `/start-here/` (with calm supporting copy, no legal/professional-advice framing) added to the homepage hero on `group1/post-launch-homepage-link`, using the existing `.secondary-action` style, no `styles.css` changes. No additional page published: the five launched pages remain `index, follow`, non-selected drafts remain `noindex, nofollow`, `sitemap.xml`/`search-index.json`/`robots.txt` unchanged, no redirects or legacy migration. Status: **Homepage discovery link prepared — preview review pending**. Not yet merged.
- **Homepage discovery link preview QA passed (Sprint 93)** — PR #18 (commit `7ed2612`) checked on its Netlify deploy preview at 1280px and 390px: homepage returns `200`, `/start-here/` link visible and naturally placed under the hero cards, calm copy, no crowding, no legal/professional-advice implication, no overflow or style regression; `/start-here/` returns `200` and remains `index, follow`; all five launched pages remain `index, follow`; eight representative non-selected drafts remain `noindex, nofollow`; preview's `sitemap.xml`/`search-index.json`/`robots.txt`/`styles.css` byte-identical to `main`; no redirects or legacy migration; `/guides/banking/` and `/guides/eu-registration/` return `200`. No issues found, no fixes needed. Status: **Homepage discovery link preview QA passed — merge pending**. PR #18 remains unmerged.
- **Sitewide visual coherence audit completed (Sprint 95A)** — paused the PR #19 merge decision (PR #19 revises the homepage "Move to Spain" card to link to `/start-here/`, replacing the standalone block from Sprint 92/93) to audit whether the whole public site (homepage, Vacation/Live sections, The Spain Files, Donate, legacy `/guides/*`, and the launched Guide System v1 pages) feels coherent. Findings: three distinct visual systems exist today (original/homepage, The Spain Files' own magazine style, Guide System v1); the most significant gap is structural, not stylistic — legacy `/guides/*` pages have no static per-guide layout at all (they're homepage clones populated client-side via `data-guide-id`), not a color/radius mismatch. Recommendation: **merge PR #19 as-is**; none of the findings should block it. Full inventory, comparison, risk ranking, and a staged (not global) unification plan are in `docs/SITEWIDE_VISUAL_COHERENCE_AUDIT.md`. Audit only — no implementation, no `styles.css` edits, no publication or indexing changes, no redirects, no legacy migration. Status: **Sitewide visual coherence audit completed — implementation pending**. PR #19 remains open, unmerged, and not closed.
- Legal/tax/immigration professional review of the core guides — editorial pass completed on **all 14 pages** as of Sprint 39; official source coverage added for all 7 High-priority pages as of Sprint 43 (see `docs/SOURCE_VERIFICATION_MATRIX.md`); human/professional legal/tax verification is the only outstanding item on every page, and is the actual publish blocker (not a code or content-structure issue)
- Documents Checklist source gaps fully closed (Sprints 62–63): Modelo 790-012 and apostille/legalisation both directly verified; EX-18 links to the general Migraciones portal (exact form page couldn't be independently confirmed, documented rather than guessed). No source gaps remain open on this page.
- **Non-EU Roadmap route-card batch complete in draft form (Sprint 57).** All 7 of the Non-EU Citizen Roadmap's route cards now have a drafted sub-guide: Family Member of an EU Citizen (Sprint 49), Student (Sprint 52), Work in Spain (Sprint 53), Retiring in Spain (Sprint 54), Family Reunification (Sprint 55), Digital Nomad (Sprint 56), and Self-Employed / Autónomo (Sprint 57). None are published — all remain `noindex,nofollow` pending legal/tax/immigration review.
- Non-EU Citizen Roadmap drafted (Sprint 46, `/moving-to-spain/non-eu-citizens/`) — needs its own editorial + legal/immigration review pass before publication
- Family Member of an EU Citizen Roadmap drafted (Sprint 49, `/moving-to-spain/family-member-eu-citizen/`) — needs its own editorial + legal/immigration review pass before publication
- Student Roadmap drafted (Sprint 52, `/moving-to-spain/students/`) — needs its own editorial + legal/immigration review pass before publication
- Work in Spain Roadmap drafted (Sprint 53, `/moving-to-spain/work-in-spain/`) — needs its own editorial + legal/immigration review pass before publication
- Retiring in Spain Roadmap drafted (Sprint 54, `/moving-to-spain/retire-in-spain/`) — needs its own editorial + legal/tax/immigration review pass before publication
- Family Reunification Roadmap drafted (Sprint 55, `/moving-to-spain/family-reunification/`) — needs its own editorial + legal/immigration review pass before publication
- Digital Nomad Roadmap drafted (Sprint 56, `/moving-to-spain/digital-nomad-spain/`) — needs its own editorial + legal/tax/immigration review pass before publication
- Self-Employed / Autónomo Roadmap drafted (Sprint 57, `/moving-to-spain/self-employed-spain/`) — needs its own editorial + legal/tax/immigration review pass before publication
- **Workflow note (Sprint 51):** no longer opening/merging a preview PR after every single draft page — draft content is now batched on `content/non-eu-route-drafts` before a PR is opened

## Planned

- Legal/editorial review of the high-risk guides (EU Registration, Healthcare, Padrón, Taxes, Social Security, Driving Licence, Non-EU Citizen Roadmap, Family Member of an EU Citizen Roadmap, Student Roadmap, Work in Spain Roadmap, Retiring in Spain Roadmap, Family Reunification Roadmap, Digital Nomad Roadmap, Self-Employed Roadmap) by a qualified professional
- Legacy guide migration — decide keep/migrate/redirect/rewrite for overlapping `/guides/` pages vs. the new core structure (see `docs/MIGRATION_PLAN.md`)
- Redirect strategy for overlapping legacy/new pages, including `/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/` — design only after migration decisions are made; do not execute until approved
- hreflang strategy for any redirect — preserve the existing en/es pairing on `/guides/eu-registration/` ↔ `/guides/es/eu-registration/`
- Decide whether `/moving-to-spain/eu-registration/` replaces `/guides/eu-registration/`, or whether both stay
- Publish/index pages only after explicit legal + editorial approval — never as a side effect of another change
- Spanish-language content for the new core guides (currently English-only; legacy `/guides/es/*` pages are unaffected)
- Decide whether Start Here's "joining family" card should eventually point to a persona-chooser between the EU family member and family reunification routes, instead of defaulting to the EU family member roadmap
- Decide whether Start Here needs a dedicated remote-work/digital-nomad card, since one doesn't exist yet and the Digital Nomad roadmap is currently only linked from the Non-EU Roadmap
- Batch consistency audit passed clean (Sprint 58, `docs/NON_EU_BATCH_AUDIT.md`) — next: open the PR for the full `content/non-eu-route-drafts` batch, and plan the legal/tax/immigration review sequence across all 7 new roadmaps
- Dedicated TIE guide
- Car import guide
- Renting Guide

## Icebox

- Planner
- AI assistant
- Mobile app
- Spanish Latin America expansion

## Done

- Official source verification — "Ministry responsible for immigration" link verified and linked on all 3 affected pages (Sprint 36)
- Start Here
- EU Citizen Roadmap
- Settling Into Spain
- Documents Checklist
- Finding Accommodation Guide
- Registering on the Padrón
- Healthcare Guide
- EU Registration Guide (draft, now at `/moving-to-spain/eu-registration/` — moved off the live `/guides/eu-registration/` URL in Sprint 34)
- Bank Account Guide
- Digital Certificate Guide
- Social Security Guide
- Taxes Guide
- Driving Licence Guide
- Editorial pass (content-level, non-legal) on all 14 draft guide pages — completed Sprint 39
- PR #5 merged into `main` as an internal draft foundation (all pages remain `noindex,nofollow`) — Sprint 38
- Official source coverage added — human/professional verification still required: Taxes (Agencia Tributaria), Social Security (Seguridad Social), Driving Licence (DGT) — Sprint 43
- Non-EU Citizen Roadmap draft created, `/moving-to-spain/non-eu-citizens/`, `noindex,nofollow`, Start Here's non-EU card now links to it — Sprint 46
- Family Member of an EU Citizen Roadmap draft created, `/moving-to-spain/family-member-eu-citizen/`, `noindex,nofollow` — Start Here's "joining family" card and the Non-EU Roadmap's "Family member of an EU citizen" card both now link to it — Sprint 49
- Student Roadmap draft created, `/moving-to-spain/students/`, `noindex,nofollow` — Start Here's "moving to study" card and the Non-EU Roadmap's "Study in Spain" card both now link to it — Sprint 52
- Work in Spain Roadmap draft created, `/moving-to-spain/work-in-spain/`, `noindex,nofollow` — Start Here's "moving for work" card and the Non-EU Roadmap's "Work in Spain" card both now link to it — Sprint 53
- Retiring in Spain Roadmap draft created, `/moving-to-spain/retire-in-spain/`, `noindex,nofollow` — Start Here's "retiring" card and the Non-EU Roadmap's "Retire or live from sufficient resources" card both now link to it — Sprint 54
- Family Reunification Roadmap draft created, `/moving-to-spain/family-reunification/`, `noindex,nofollow` — includes a comparison table distinguishing it from the Family Member of an EU Citizen route; the Non-EU Roadmap's "Join family in Spain" card now links to it (Start Here's "joining family" card intentionally left pointing to the EU family member roadmap) — Sprint 55
- Digital Nomad Roadmap draft created, `/moving-to-spain/digital-nomad-spain/`, `noindex,nofollow` — includes a comparison table distinguishing it from the Work in Spain and Self-Employed routes; the Non-EU Roadmap's "Digital nomad / remote work" card now links to it (Start Here has no dedicated remote-work card, so it was intentionally left unchanged) — Sprint 56
- Self-Employed / Autónomo Roadmap draft created, `/moving-to-spain/self-employed-spain/`, `noindex,nofollow` — Start Here's "self-employed" card, the Non-EU Roadmap's "Self-employed / business activity" card, and the Digital Nomad Roadmap's comparison-table reference all now link to it. This completes drafts for all 7 of the Non-EU Roadmap's route cards — Sprint 57
- Non-EU route batch consistency audit (routes/nav, terminology, risk language, duplication, source coverage) — clean, no content fixes needed; see `docs/NON_EU_BATCH_AUDIT.md` — Sprint 58
- Non-EU route batch merged into `main` via PR #11 (commit `f365a7e`) — all 8 pages live-deployed, still `noindex,nofollow` — Sprint 60
- Publish readiness audit across all 22 draft pages — no page cleared to publish; every page still needs human legal/tax/immigration sign-off; see `docs/PUBLISH_READINESS_AUDIT.md` for per-page status, launch grouping, and recommended review sequencing — Sprint 61
- IberiGo Guide System v1 defined (calm, practical, government-adjacent, card-based, mobile-first) — answers the Sprint 65 reviewer question; see `docs/IBERIGO_GUIDE_SYSTEM_V1.md` — Sprint 66
- Guide System v1 CSS scope audit completed — draft pages are styled by a per-page inline `guideCss()` block that live pages never load, so v1 styling is safe by construction; the only shared guide-prefixed class is `.guide-card-panel` (styles.css), which is on the do-not-touch list along with all site chrome; see `docs/GUIDE_SYSTEM_V1_CSS_SCOPE_PLAN.md` — Sprint 67
