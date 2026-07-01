# IberiGo Backlog

This is the internal product backlog for IberiGo.

## In Progress

- Editorial/legal review of the core guides (PR #5) — editorial pass completed on 10 of 14 pages as of Sprint 37 (Start Here, EU Citizen Roadmap, Settling Into Spain, Documents Checklist, Finding Accommodation, Padrón, Healthcare, EU Registration, Bank Account, Taxes); legal/tax verification still outstanding on all pages; 3 pages not yet reviewed (Digital Certificate, Social Security, Driving Licence); `/search/` is functional-only, not applicable

## Planned

- Finish editorial pass on Digital Certificate, Social Security, and Driving Licence guides
- Legacy guide migration — decide keep/migrate/redirect/rewrite for overlapping `/guides/` pages vs. the new core structure (see `docs/MIGRATION_PLAN.md`)
- Redirect strategy for overlapping legacy/new pages, including `/guides/eu-registration/` vs. `/moving-to-spain/eu-registration/`
- hreflang preservation — any future redirect must keep the existing en/es pairing intact
- Spanish-language content for the new core guides (currently English-only; legacy `/guides/es/*` pages are unaffected)
- Non-EU roadmap
- Autónomo / self-employed guide
- Car import guide
- Renting Guide

## Post-merge (once PR #5 is merged to main as a draft foundation — see `docs/PR5_PRE_MERGE_DECISION.md`)

- Legal/editorial review of the high-risk guides (EU Registration, Healthcare, Padrón, Taxes) by a qualified professional — the actual publish blocker, not a code or content-structure issue
- Official source verification — done for the ministry link (Sprint 36); re-check periodically since government URLs can move
- Legacy guide migration plan — execute only after the routing decision below and after content approval
- Redirect strategy — design only after migration decisions are made; do not execute until approved
- hreflang strategy for any redirect — preserve the existing en/es pairing on `/guides/eu-registration/` ↔ `/guides/es/eu-registration/`
- Decide whether `/moving-to-spain/eu-registration/` replaces `/guides/eu-registration/`, or whether both stay
- Publish/index pages only after explicit legal + editorial approval — never as a side effect of another change
- Future Spanish-language content for the new core guides
- Future Non-EU roadmap

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
