# IberiGo Backlog

This is the internal product backlog for IberiGo.

## In Progress

- Legal/tax/immigration professional review of the core guides — editorial pass completed on **all 14 pages** as of Sprint 39; official source coverage added for all 7 High-priority pages as of Sprint 43 (see `docs/SOURCE_VERIFICATION_MATRIX.md`); human/professional legal/tax verification is the only outstanding item on every page, and is the actual publish blocker (not a code or content-structure issue)
- Official source needed for Documents Checklist (names EX-18 and Modelo 790-012 with no linked source)
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
