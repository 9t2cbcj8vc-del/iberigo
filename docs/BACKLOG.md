# IberiGo Backlog

This is the internal product backlog for IberiGo.

## In Progress

- Legal/tax/immigration professional review of the core guides — editorial pass completed on **all 14 pages** as of Sprint 39; official source coverage added for all 7 High-priority pages as of Sprint 43 (see `docs/SOURCE_VERIFICATION_MATRIX.md`); human/professional legal/tax verification is the only outstanding item on every page, and is the actual publish blocker (not a code or content-structure issue)
- Official source needed for Documents Checklist (names EX-18 and Modelo 790-012 with no linked source)
- Non-EU Citizen Roadmap drafted (Sprint 46, `/moving-to-spain/non-eu-citizens/`) — needs its own editorial + legal/immigration review pass before publication; 3 of its 7 route-specific sub-guides still don't exist (family reunification, digital nomad, self-employed) — family-member-of-an-EU-citizen (Sprint 49), student (Sprint 52), work (Sprint 53) and retirement (Sprint 54) are now drafted
- Family Member of an EU Citizen Roadmap drafted (Sprint 49, `/moving-to-spain/family-member-eu-citizen/`) — needs its own editorial + legal/immigration review pass before publication
- Student Roadmap drafted (Sprint 52, `/moving-to-spain/students/`) — needs its own editorial + legal/immigration review pass before publication
- Work in Spain Roadmap drafted (Sprint 53, `/moving-to-spain/work-in-spain/`) — needs its own editorial + legal/immigration review pass before publication
- Retiring in Spain Roadmap drafted (Sprint 54, `/moving-to-spain/retire-in-spain/`) — needs its own editorial + legal/tax/immigration review pass before publication
- **Workflow note (Sprint 51):** no longer opening/merging a preview PR after every single draft page — draft content is now batched on `content/non-eu-route-drafts` before a PR is opened

## Planned

- Legal/editorial review of the high-risk guides (EU Registration, Healthcare, Padrón, Taxes, Social Security, Driving Licence, Non-EU Citizen Roadmap, Family Member of an EU Citizen Roadmap, Student Roadmap, Work in Spain Roadmap, Retiring in Spain Roadmap) by a qualified professional
- Legacy guide migration — decide keep/migrate/redirect/rewrite for overlapping `/guides/` pages vs. the new core structure (see `docs/MIGRATION_PLAN.md`)
- Redirect strategy for overlapping legacy/new pages, including `/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/` — design only after migration decisions are made; do not execute until approved
- hreflang strategy for any redirect — preserve the existing en/es pairing on `/guides/eu-registration/` ↔ `/guides/es/eu-registration/`
- Decide whether `/moving-to-spain/eu-registration/` replaces `/guides/eu-registration/`, or whether both stay
- Publish/index pages only after explicit legal + editorial approval — never as a side effect of another change
- Spanish-language content for the new core guides (currently English-only; legacy `/guides/es/*` pages are unaffected)
- Dedicated sub-guides for the Non-EU roadmap's remaining route cards: family reunification, digital nomad, self-employed
- Dedicated TIE guide
- Autónomo / self-employed guide
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
