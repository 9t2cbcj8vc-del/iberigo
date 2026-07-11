# Route Roadmap Publication Decision

**Date:** 2026-07-11
**Status:** Owner publication decision recorded and acted on. The technical launch conditions in Section 6 have been prepared on branch/PR `guide-system/route-roadmap-launch` (2026-07-11) — **not yet merged**; preview QA is pending before merge.
**Related:** `docs/ROUTE_ROADMAP_LEGAL_REVIEW_BRIEF.md`, `docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md`, `docs/GROUP1_PUBLICATION_DECISION.md` (precedent)

## Purpose

This document records an explicit owner decision about the 14 route roadmap pages (7 English + 7 Spanish), following the same pattern already established for the original Group 1 launch in `docs/GROUP1_PUBLICATION_DECISION.md`. It does not publish any page, remove `noindex, nofollow`, add anything to `sitemap.xml` or `search-index.json`, add hreflang or language-switcher behavior, change `/es/start-here/`, or perform any other technical launch step. Those steps are described in Section 6 as conditions a future, separate launch PR must satisfy.

## 1. Decision

**The owner approves preparing the route roadmap family for publication, despite no professional legal/immigration review being available.**

This decision covers all 14 pages:

| Topic | English | Spanish |
|---|---|---|
| EU citizens | `/moving-to-spain/eu-citizens/` | `/es/moving-to-spain/eu-citizens/` |
| Non-EU citizens | `/moving-to-spain/non-eu-citizens/` | `/es/moving-to-spain/non-eu-citizens/` |
| Family member of an EU citizen | `/moving-to-spain/family-member-eu-citizen/` | `/es/moving-to-spain/family-member-eu-citizen/` |
| Work in Spain | `/moving-to-spain/work-in-spain/` | `/es/moving-to-spain/work-in-spain/` |
| Students | `/moving-to-spain/students/` | `/es/moving-to-spain/students/` |
| Retire in Spain | `/moving-to-spain/retire-in-spain/` | `/es/moving-to-spain/retire-in-spain/` |
| Self-employed / autónomo | `/moving-to-spain/self-employed-spain/` | `/es/moving-to-spain/self-employed-spain/` |

This decision does **not** by itself launch these pages. It clears the publication-authorization gate described in `docs/ROUTE_ROADMAP_LEGAL_REVIEW_BRIEF.md` (Section 7): "launch requires either a qualified professional legal/immigration review, or an explicit owner decision to proceed without it." This document is that explicit owner decision. A separate future launch PR must still execute the technical steps in Section 6 before any page's status actually changes.

## 2. Basis for decision

This decision is based on:

- **The official-source verification matrix** (`docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md`, completed and merged in PR #53, commit `c73b76b`), which checked every major claim on all 14 pages against official sources rather than relying on general knowledge or secondary sources.
- **The specific official sources used**: BOE (Ley Orgánica 4/2000, Real Decreto 1155/2024), the Ministerio de Inclusión, Seguridad Social y Migraciones procedure sheets (`inclusion.gob.es`), Ministerio de Asuntos Exteriores consular pages (`exteriores.gob.es`), Seguridad Social (`seg-social.es`), and the national police's EU-registration procedure (`sede.policia.gob.es`) — never blogs, law-firm marketing content, or AI-generated summaries as authority.
- **Cautious wording throughout**: every page uses hedged language ("may," "usually," "often," "can depend on your situation," "check the current official requirements") rather than absolute claims, and an automated scan for overstated-certainty patterns ("guaranteed," "always," "you will get," exact universal timelines) found zero matches across all 14 pages.
- **No unsupported claims found after verification**: of the 7 topics checked, all 7 were marked "Verified" in the matrix, with zero marked "unsupported / remove" and zero marked "unclear / keep cautious."
- **One student-route wording issue identified and corrected**: the "work while studying" section understated non-EU higher-education students' work rights relative to the current regulation (RD 1155/2024, in force since 2026-05-20); this was corrected in both languages as part of the verification pass, kept hedged, with no exact hour figure committed to the page itself.
- **Disclaimers and caveats already present on every page**: each of the 14 pages carries its own "Important note" / "Nota importante" box stating the content is general information, not legal, tax, immigration, or financial advice, and directing readers to check official requirements for their specific case.

## 3. Limits of this decision

This decision does not claim more than it can support. Specifically:

- **This is not legal advice** — neither to IberiGo's readers, nor to IberiGo itself.
- **This is not a professional legal review.** No qualified immigration lawyer, gestor, or other licensed professional has reviewed this content. The verification performed (`docs/ROUTE_ROADMAP_SOURCE_VERIFICATION_MATRIX.md`) was an owner-controlled process against official primary sources, not a substitute for professional judgment.
- **Requirements can change.** Spanish immigration and residence law has changed materially in the recent past (RD 1155/2024 replacing RD 557/2011, in force since 2026-05-20) and can change again. Content that is accurate today may become outdated without an active edit to this repository.
- **Users must check official sources for their own case.** Every page already tells readers this; this decision does not weaken that instruction — the pages remain general orientation, not a substitute for confirming requirements directly with the relevant office or consulate.
- **Province, oficina, and consulate practice may vary**, and the pages are written to avoid stating a single universal procedure where official sources indicate local variation exists.
- **Individual situations may require professional advice**, particularly for anyone with an unusual nationality combination, complex family situation, prior immigration history, or cross-border tax exposure. The pages do not attempt to cover edge cases and are not written to replace a consultation.

## 4. Residual risk accepted

Having reviewed the basis for this decision (Section 2) and its limits (Section 3), **the owner accepts the residual publication risk** of making these 14 pages publicly indexable as owner-reviewed, source-verified practical information — in the same spirit as the Group 1 decision (`docs/GROUP1_PUBLICATION_DECISION.md`), which was made under the same constraint (no professional review available) and has been live in production since Sprint 90 without a reported issue traced back to that decision.

This acceptance is specific to the 14 pages listed in Section 1, verified as of the source-verification matrix dated 2026-07-11. It is not a standing authorization to publish future content without equivalent verification.

## 5. Publication scope

This decision applies **only** to the 14 pages listed in Section 1. It explicitly does **not** apply to:

- **Deeper linked guides** referenced from these 14 pages (e.g. healthcare, taxes, Social Security, digital certificate, driving, padrón, EU registration, family reunification, digital nomad) — those remain under their own existing publication status, unaffected by this decision.
- **Legacy `/guides/*` pages** — entirely out of scope; this decision does not authorize any legacy guide migration, redirect, or content change.
- **Future Spanish pages** not yet created — any new Spanish content requires its own review and, where applicable, its own publication decision.
- **Unrelated immigration, tax, or legal content** anywhere else on the site — this decision's reasoning (official-source verification substituting for unavailable professional review) is not a blanket policy for all future content; each future case should be assessed on its own basis.

## 6. Launch conditions

This decision authorizes a **future, separate launch PR** to proceed, provided that PR:

- Launches all 7 English roadmap pages.
- Launches all 7 Spanish roadmap pages.
- Keeps the existing cautious wording and disclaimers intact — this decision does not authorize removing or weakening them to make the pages read more authoritative.
- Changes all 14 pages from `noindex, nofollow` to `index, follow`.
- Adds all 14 pages to `sitemap.xml`.
- Adds all 14 pages to `search-index.json`, if the Guide System's existing rules call for it (published pages are included automatically by the generator).
- Adds reciprocal hreflang (`en`/`es`/`x-default`) for all 7 English/Spanish pairs, following the existing `launchedPair()` pattern.
- Adds language-switcher behavior for all 7 pairs, following the existing `altHref`/`data-lang-href` mechanism.
- Updates `/es/start-here/`'s route cards to link to the Spanish versions of these pages instead of the English ones.
- Removes the "(en inglés)" label only from the cards whose Spanish counterpart is being launched in that same PR — any deeper link that still has no Spanish page must keep its "(en inglés)" label.
- Does **not** add redirects.
- Does **not** migrate legacy guides.

No launch PR has been opened as part of this decision. This document only clears the authorization gate; a future PR still has to do the technical work and its own preview QA before merge.

## 7. Future maintenance

These 14 pages should be reviewed again — regardless of whether they have launched by that point — when any of the following happens:

- **Spanish immigration/residence rules change** in a way that affects any of the 7 topics (a new reglamento, a modification to Ley Orgánica 4/2000 or Real Decreto 1155/2024, or a significant instruction/circular from Migraciones).
- **BOE or regulation pages change materially** — i.e., not just formatting or a ministry website redesign, but a substantive change to the legal text underlying any claim on these pages.
- **Official ministry procedure pages change** — e.g. a "Hoja" procedure sheet on `inclusion.gob.es` is updated with different requirements, documents, or timelines than what's currently reflected.
- **User feedback identifies an issue** — any report from a reader that a page's guidance did not match their real experience with an office, consulate, or online procedure.
- **A professional reviewer becomes available** — at that point, the pages should go through the review process originally requested in `docs/ROUTE_ROADMAP_LEGAL_REVIEW_BRIEF.md`, even if already launched under this owner decision. A later professional review does not need to block continued publication, but its findings should be applied when available.
