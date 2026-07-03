# PR #5 Review — Risk Keyword Sweep

Searched all 14 rendered draft pages (the generator's output, which is what a reader/reviewer sees) for: `TODO`, `legal advice`, `tax advice`, `always`, `guaranteed`, `within 30 days`, `first week`, `must`, `Ministry responsible for immigration`, `Coming soon`. No automatic rewrites were made except where noted — this is a report for human review.

`guaranteed`, `within 30 days`, and `first week` produced **zero matches** across all 14 pages — no fixed-timeline or overclaiming language of that kind was found.

## Resolved in Sprint 36

| File | Route | Original finding | Resolution |
|---|---|---|---|
| `moving-to-spain/eu-citizens/index.html`, `moving-to-spain/healthcare/index.html`, `moving-to-spain/eu-registration/index.html` | `/moving-to-spain/eu-citizens/`, `/moving-to-spain/healthcare/`, `/moving-to-spain/eu-registration/` | Official-source card: `"Ministry responsible for immigration" — "TODO: verify and link..."` (Sprint 34 finding) | **Verified.** `extranjeros.inclusion.gob.es` redirects to `https://www.inclusion.gob.es/web/migraciones/home`, confirmed via `curl` (HTTP 200, page titled "Home - Migraciones - Ministerio de Inclusión, Seguridad Social y Migraciones"). The earlier connection failures were bot-blocking on a generic user-agent, not a dead or incorrect site — retrying with a standard browser user-agent resolved it. All 3 pages now link to this URL. |
| `moving-to-spain/eu-citizens/index.html`, `moving-to-spain/registering-on-the-padron/index.html`, `moving-to-spain/healthcare/index.html` | same 3 pages plus padrón | `stillPending` status banner logic didn't distinguish "genuinely no single URL" (Local Town Halls, Regional health services) from "unverified TODO," so it kept saying "pending verification (marked TODO)" even after the ministry link was fixed | Added a `varies: true` flag to those entries and updated the status-banner logic in `guide-components.js` so intentionally location-dependent sources read differently from open TODOs. |
| `living-in-spain/taxes/index.html` | `/living-in-spain/taxes/` | FAQ question named a specific country ("Do I need to declare income from Finland or another country?") — the only country-specific example in an otherwise neutral guide | Removed "Finland," now reads "Do I need to declare income from another country?" |

**No remaining open TODOs** in the official-source cards across the 14 draft pages as of Sprint 36.

## Reviewed and judged low-risk (no action needed, listed for transparency)

### "Coming soon" — `/start-here/` (6 occurrences)
All 6 are `aria-disabled="true"` buttons on not-yet-built persona cards (non-EU, family, work, study, retire, self-employed). This is the intended incomplete-roadmap pattern, not a placeholder oversight. **No action.**

### "legal advice" / "tax advice" — all 14 pages
Every occurrence is the standard footer line ("Free to use. Not legal advice."), the `Legal Disclaimer` section ("This guide is for informational purposes and is not legal advice."), the tax guide's explicit "this guide is general information only and is not tax advice" note, or (on the bank account guide) a line telling readers not to treat account labels as legal advice. All of these are the *correct*, intended disclaimer language — the sweep matching them is expected, not a finding. **No action.**

### "always" / "must" — all instances reviewed individually

| File | Snippet | Verdict |
|---|---|---|
| `moving-to-spain/finding-accommodation/index.html` | "Short-term accommodation may not **always** provide the documents needed for padrón registration." | Hedged negation — matches the "requirements may vary" house style. Safe. |
| `moving-to-spain/finding-accommodation/index.html` | "Check which utilities are included and which **must** be contracted or paid separately." | Descriptive, not a legal absolute about the reader's own procedure. Low risk, but a reviewer should confirm this is universally true across landlords/regions. |
| `moving-to-spain/registering-on-the-padron/index.html` | "Do I need a NIE first? Not **always**. Some town halls may accept a passport or national ID..." | Hedged negation. Safe. |
| `moving-to-spain/eu-registration/index.html` | "Thinking NIE alone **always** means residence registration is complete." | Appears inside "Common Mistakes" — describes a misconception to correct, not an assertion of fact. Safe. |
| `living-in-spain/opening-a-bank-account/index.html` | "Do I need a Spanish bank account to live in Spain? Not **always** legally, but it can make salary, rent, utilities, taxes... easier." | Hedged negation. Safe. |
| `living-in-spain/digital-certificate/index.html` | "These details are not **always** required in the same way." / "Do I need both Digital Certificate and Cl@ve? Not **always**." | Both hedged negations. Safe. |
| `living-in-spain/social-security/index.html` | "Do I need Social Security if I am not working? Not **always**. It depends on your situation..." | Hedged negation. Safe. |
| `living-in-spain/driving/index.html` | "**Always** check the current DGT rules for your licence type." | Advice to verify with the official source (DGT) — the encouraged pattern, not an overclaim about the procedure itself. Safe. |
| `moving-to-spain/settling-into-spain/index.html` | Originally: "Banks **must** identify customers, but accepted documents and account types can vary by bank and by your situation." | States a real regulatory fact (KYC/AML identification requirement) rather than a promise to the reader. **Resolved in Sprint 37:** softened to "Banks generally need to identify customers..." for consistency with the rest of the guide's hedged tone. |

No instance of "always" or "must" asserts a fixed timeline, a guaranteed outcome, or a nationwide-uniform procedure — all either hedge explicitly, describe a misconception, cite a real regulatory fact, or point the reader to check an official source.

## Resolved in Sprint 39

| File | Route | Original finding | Resolution |
|---|---|---|---|
| `living-in-spain/driving/index.html` | `/living-in-spain/driving/` | FAQ question named a specific country ("Do I need to exchange my Finnish licence?") — the only country-specific example in an otherwise neutral EU/non-EU guide | Removed "Finnish," now reads "Do I need to exchange my licence from another EU country?" — same class of fix as the taxes guide's "Finland" fix in Sprint 36. |

The final 2 pages without a prior editorial pass — `living-in-spain/digital-certificate/index.html` and `living-in-spain/social-security/index.html` — were reviewed against the special guidance in Sprint 39 (do not conflate Digital Certificate/Cl@ve, do not imply every procedure is online, do not conflate Social Security number/NIE/healthcare card/tax identity, do not imply immediate universal need). Both already read correctly hedged; **no edits were needed** on either page.

**All 14 draft pages now have a completed editorial pass as of Sprint 39.**

## Confirmed clean (zero matches)

- `guaranteed`
- `within 30 days`
- `first week`

## Source verification phase (Sprint 42)

Full detail lives in `docs/SOURCE_VERIFICATION_MATRIX.md` — this section summarizes the risk-relevant findings from building that matrix.

### Unresolved official source needs

- ~~Taxes, Social Security, and Driving Licence have zero official-source cards~~ — **resolved in Sprint 43.** Added Agencia Tributaria (`sede.agenciatributaria.gob.es`, verified via curl — HTTP 200, "Agencia Tributaria: Inicio"), Seguridad Social (`www.seg-social.es`, reachable but content-verification blocked by an Akamai bot-detection challenge — same caveat as its existing use on Healthcare), and DGT (`www.dgt.es`, verified via curl — HTTP 200, "DGT - Inicio"). All 7 High-priority pages now have at least one linked source. **This is source coverage, not legal sign-off** — see below.
- ~~Documents Checklist names specific form numbers (EX-18, Modelo 790-012) with no linked source.~~ **Source gap closed — human/professional review still required (Sprints 62–63).** Modelo 790-012 is directly verified and linked (sede.policia.gob.es/Tasa790_012/index.jsp). EX-18 links to the already-verified general Migraciones portal — the exact EX-18 form page could not be independently confirmed (guessed deep links 404'd), so that residual gap is documented rather than guessed at. The apostille/legalisation source is now also directly verified and linked (exteriores.gob.es "Legalización diplomática" page, Sprint 63). No source gaps remain open on this page.
- All 7 High-priority pages (the 4 from Sprint 36 plus the 3 added in Sprint 43) should have their sources re-confirmed during formal legal review rather than assumed still current, since government URLs can move.
- **Overclaim found and fixed while adding these sources (Sprint 43):** the shared `LastReviewed()` component displayed "Reviewed against official guidance" on any page with at least one official source linked, regardless of whether the content had actually been checked against that source. This affected all 7 pages with sources (not just the 3 added this sprint). Reworded to state sources are linked for further checking, not that verification occurred.

### Claims needing human/professional verification

All claims listed under "Step 4 — Extracted risky claims" in `docs/SOURCE_VERIFICATION_MATRIX.md` for the 7 High-priority pages, most importantly:
- The NIE / EU Registration Certificate / TIE distinction (EU Registration, EU Citizen Roadmap, Documents Checklist).
- Tax residency vs. immigration residency and the 183-day rule (Taxes).
- Social Security number vs. NIE vs. healthcare card vs. tax ID (Social Security).
- Public healthcare non-automaticity and S1/EHIC distinctions (Healthcare).
- Padrón's non-immigration-status nature and municipal variation (Padrón).
- EU/non-EU licence recognition and exchange-agreement dependency (Driving Licence).

None of these are currently marked as legally verified anywhere in the repo — the editorial passes (Sprints 36–39) checked tone, hedging, and terminology consistency, and Sprint 43 added source *links*, but none of this is legal/professional accuracy review.

### Pages that should not be published before review

**All 14.** No page should move out of `draft`/`noindex,nofollow` before this source-verification and legal-review phase completes. All 7 High-priority pages now have official-source coverage as of Sprint 43, but "official source coverage added" and "legally reviewed" remain two separate, both-still-open bars — see the per-page status in `docs/SOURCE_VERIFICATION_MATRIX.md`.

## Non-EU batch risk-language audit (Sprint 58)

The 8-page Non-EU route batch (`/moving-to-spain/non-eu-citizens/` and its 7 sub-guides — Family Member of an EU Citizen, Student, Work in Spain, Retiring in Spain, Family Reunification, Digital Nomad, Self-Employed) was swept for the same class of risky absolute language as the Sprint 39 checks (`always`, `guaranteed`, `automatic(ally)`, `everyone`, `must`, `will`, `within`, `first week`, `30 days`, plus batch-specific phrases like "gives residence" and "can work"). Full detail in `docs/NON_EU_BATCH_AUDIT.md`. Result: `must`, `within`, `first week`, and `30 days` had zero matches across all 8 pages; every other hit was a negation, a stated-and-corrected misconception, or hedged question/answer phrasing. **No edits were needed.** These 8 pages carry the same "not published before review" status as the rest of the batch.
