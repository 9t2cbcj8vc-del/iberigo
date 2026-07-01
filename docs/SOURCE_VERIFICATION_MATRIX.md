# Source Verification Matrix — PR #5 Draft Guides

**Purpose:** structure the upcoming legal/tax/immigration source-verification phase. This document does not verify or add any new sources itself — it maps what exists today, what's missing, and what kind of official source each gap needs, so a human reviewer (or a future sprint with explicit verification authority) can work through it systematically.

**Rule followed while building this:** no URLs were invented and no unofficial links were added. "Suggested official source type" names an institution/category only, not a link, unless that link was already verified and added in an earlier sprint (Sprint 36).

All 15 pages (the original 14 plus the Non-EU Citizen Roadmap added in Sprint 46) remain `status: draft`, `noindex, nofollow`.

---

## Matrix

| Route | Page title | Topic category | Sensitivity | Key claims requiring verification | Current official sources linked | Missing official sources | Suggested official source type | Reviewer notes | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/start-here/` | Start Here: Moving to Spain — IberiGo | Navigation / index | Low | None — persona-selector cards, no procedural claims | None | None needed | N/A | Purely a router to other guides; no independent factual claims to source | Not applicable |
| `/moving-to-spain/eu-citizens/` | Moving to Spain as an EU Citizen — IberiGo | Immigration / roadmap | **High** | Visa-free entry for EU/EEA/Swiss citizens; 3-month threshold for registration; TIE vs. Certificate of Registration; work rights before registration | Spanish Government (administracion.gob.es), Ministry responsible for immigration (inclusion.gob.es/web/migraciones/home), Police appointment portal (sede.policia.gob.es); "Local Town Halls" intentionally has no single URL | None of the 3 linked sources are missing; roadmap-level claims about tax/driving/Social Security are covered by their own guides, not duplicated here | Immigration / extranjería (covered); no additional type needed | Sources already verified in Sprint 36 | Editorial pass complete; sources verified; legal review pending |
| `/moving-to-spain/settling-into-spain/` | Settling Into Spain — IberiGo | Arrival sequence / hub | Medium | Sequencing claims across padrón, healthcare, EU registration, banking, digital access, Social Security, tax, driving — each one summarized, not sourced independently | None (this page is a summary/hub; it links to the specific guides that carry their own sources) | No direct source cards on this page | General Spanish administration (if a source section is ever added, it should point to the same ministry/DGT/AEAT sources used on the specific guides, not duplicate new ones) | Low incremental risk since every specific claim is repeated (and sourced or flagged) on its own dedicated guide | Editorial pass complete; legal review pending |
| `/moving-to-spain/documents-checklist/` | Documents Checklist for Moving to Spain — IberiGo | Immigration / administrative preparation | Medium-High | EX-18 form reference; Modelo 790-012 fee reference; TIE appointment and "relevant EX form" for non-EU routes; apostille/legalisation requirements | None | Extranjería/immigration source for EX-18 and EX forms generally; Agencia Tributaria or the fee-form issuer for Modelo 790-012; Ministerio de Asuntos Exteriores (apostille/legalisation is a consular/foreign-affairs function) | Immigration / extranjería; Agencia Tributaria; Ministerio de Asuntos Exteriores (apostille) | This page names specific form numbers (EX-18, Modelo 790-012) without a linked source — highest documentation-accuracy risk among the "Medium" tier pages | Editorial pass complete; legal review pending; no official sources linked yet |
| `/moving-to-spain/finding-accommodation/` | Finding Accommodation in Spain — IberiGo | Housing / consumer practice | Medium | Rental contract terms, deposits, notice rules, scam patterns — practical guidance framed as general, not legal, advice | None | Official housing/tenancy authority reference (if any is added) | Ministerio de Vivienda y Agenda Urbana, or regional housing authority, for rental-law-adjacent claims (deposits, notice periods); no official body needed for the scam-avoidance advice, which is general practical guidance | Content is careful to frame this as practical advice rather than legal advice already; lower risk than the immigration/tax pages | Editorial pass complete; legal review pending |
| `/moving-to-spain/registering-on-the-padron/` | Registering on the Padrón in Spain — IberiGo | Municipal administration | **High** | Padrón as address registration (not immigration status); municipal variation in documents/appointments; padrón's role in healthcare/EU-registration/TIE processes | Spanish Government (www.ine.es — INE padrón municipal statistics/Padrón Online), "Local Town Halls" intentionally has no single URL | None beyond the inherent municipal variation (by design, no single town-hall URL exists) | Town hall / municipal padrón (inherently variable, no single source); INE (covered) | Highest sensitivity to overclaiming in the whole set (see the Torrevieja precedent) — content is consistently hedged | Editorial pass complete; sources verified in Sprint 36; legal review pending |
| `/moving-to-spain/healthcare/` | Healthcare in Spain for New Residents — IberiGo | Healthcare / immigration | **High** | Public healthcare access routes; S1 form eligibility; EHIC vs. resident healthcare; regional health-card variation; healthcare evidence before EU registration | Spanish Government (www.sanidad.gob.es), Ministry responsible for immigration (inclusion.gob.es/web/migraciones/home), Social Security (www.seg-social.es); "Regional health services" intentionally has no single URL | None of the 3 linked sources are missing; regional health service links intentionally vary | Ministry of Health (covered); Social Security (covered); regional health services (inherently variable) | Sources already verified in Sprint 36 | Editorial pass complete; sources verified; legal review pending |
| `/moving-to-spain/eu-registration/` | EU Registration in Spain — IberiGo | Immigration | **High** | NIE vs. EU Registration Certificate vs. TIE distinction; EX-18 form; Modelo 790-012 fee; healthcare evidence requirement by route; appointment-type mistakes | Spanish Government (administracion.gob.es), Ministry responsible for immigration (inclusion.gob.es/web/migraciones/home), Police appointment portal (sede.policia.gob.es) | Modelo 790-012 fee-form issuer is named but not separately sourced (may be covered by the Police/Ministry links, but the specific fee-payment portal is not confirmed) | Immigration / extranjería (covered); Policía Nacional (covered); Agencia Tributaria, if the 790-012 fee portal turns out to be AEAT-hosted rather than Interior/Migraciones-hosted | Highest-profile immigration page in the set; terminology (NIE/EU Registration/TIE) was specifically reviewed and found precise | Editorial pass complete; sources verified in Sprint 36; legal review pending |
| `/living-in-spain/opening-a-bank-account/` | Opening a Bank Account in Spain — IberiGo | Financial / consumer practice | Medium | Resident vs. non-resident account distinctions; KYC identification requirement; fee variability; no bank is endorsed | None | Financial regulator reference, if one is ever added | Banco de España, for the general KYC/account-type regulatory framing (the guide currently sources this to "banks generally," not to a regulator) | Content is deliberately bank-neutral and hedged; lower legal risk than immigration/tax pages, but the KYC claim ("banks generally need to identify customers") is a real regulatory fact worth a source | Editorial pass complete; legal review pending |
| `/living-in-spain/digital-certificate/` | Digital Certificate and Cl@ve in Spain — IberiGo | Digital identity / administrative | Medium | Digital Certificate vs. Cl@ve distinction; both used to access tax/Social Security/health/municipal portals; not every procedure is online | None | Digital-identity issuer reference (Digital Certificate is issued via FNMT; Cl@ve is a separate government identity system) | FNMT (issuer of the most common Digital Certificate) and the Cl@ve system's own official page | Content is careful never to claim the two systems are interchangeable; risk is mostly about staying current as these systems change, not legal exposure | Editorial pass complete; legal review pending |
| `/living-in-spain/social-security/` | Social Security in Spain — IberiGo | Employment / administration | **High** | Social Security number vs. NIE vs. healthcare card vs. tax ID; employer vs. self-employed registration responsibility; Social Security's link (or non-link) to healthcare entitlement | Seguridad Social (www.seg-social.es) — added Sprint 43 | None remaining | Seguridad Social (covered) | Same domain already used on Healthcare; automated content verification is blocked by an Akamai bot-detection challenge on this site, so reachability was confirmed via HTTP status/redirect behavior rather than page content | **Official source coverage added — human/professional verification still required** |
| `/living-in-spain/taxes/` | Taxes in Spain for New Residents — IberiGo | Tax | **High** | Tax residency vs. immigration residency; 183-day rule; worldwide income for tax residents; double-taxation treaties; explicit "not tax advice" disclaimer | Agencia Tributaria (sede.agenciatributaria.gob.es) — added Sprint 43, verified via curl (HTTP 200, page titled "Agencia Tributaria: Inicio") | None remaining | Agencia Tributaria (covered) | Was the only High-priority page with no source at all; now resolved | **Official source coverage added — human/professional verification still required** |
| `/living-in-spain/driving/` | Driving Licence in Spain for New Residents — IberiGo | Transport / administrative | **High** | EU vs. non-EU licence recognition; exchange agreements by country; renewal-after-residence rules; medical-check requirement; consistently defers to "current DGT rules" | DGT / Dirección General de Tráfico (www.dgt.es) — added Sprint 43, verified via curl (HTTP 200, page titled "DGT - Inicio") | None remaining | DGT (covered) | The guide's own text already told readers to check DGT; now it links there too | **Official source coverage added — human/professional verification still required** |
| `/search/` | Search IberiGo Guides — IberiGo | Functional | Low | None — search UI only | N/A | N/A | N/A | Not editorial content | Not applicable |
| `/moving-to-spain/non-eu-citizens/` | Moving to Spain as a Non-EU Citizen — IberiGo | Immigration / roadmap (added Sprint 46) | **High** | Visa/authorisation requirement varies by nationality and route; TIE vs. NIE vs. EU Registration distinction; 8 route categories (work, study, family, EU-family-member, retirement, digital nomad, self-employed) each need their own eventual verification; explicit "not legal advice" disclaimer | Spanish Government (administracion.gob.es), Ministry responsible for immigration (inclusion.gob.es/web/migraciones/home), Police appointment portal (sede.policia.gob.es) — all reused/already verified in Sprint 36; Ministry of Foreign Affairs (exteriores.gob.es) — newly verified in Sprint 46, HTTP 200, page titled "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación" | None of the 4 linked sources are missing; the 7 route-specific sub-guides this page points to (all "Coming soon") will need their own sources once built | Immigration / extranjería (covered); Policía Nacional / TIE (covered); Spanish consular information (covered) | Broadest-scope, most nationality-dependent page in the set — deliberately avoids route-specific instructions and income/fee/deadline specifics per its editorial brief | Editorial pass complete (content, Sprint 46); sources verified; legal/immigration review pending |

---

## Structural finding: 3 of the 7 High-priority pages had zero official sources — resolved in Sprint 43

Taxes, Social Security, and Driving Licence were all marked High sensitivity, and all three previously had **no official-source cards at all** — not even a TODO placeholder, because `officialSourcesByRoute` in `scripts/generate-guide-system.js` had no entry for `routes.taxes`, `routes.social`, or `routes.driving`. This was a different, more basic gap than the "unverified TODO" issue resolved in Sprint 36 (that was about existing-but-unverified entries; this was about entries that didn't exist yet).

**Sprint 43 resolution:** all 3 pages now link to a verified official source (Agencia Tributaria, Seguridad Social, DGT respectively — see the matrix rows above for verification method per page). This closes the structural gap, but is not the same as legal/professional sign-off — see `docs/PR5_REVIEW_RISKS.md` for why "source linked" and "legally reviewed" remain two separate, both-still-open bars.

A related issue surfaced while adding these: the shared `LastReviewed()` component previously displayed "Reviewed against official guidance" on any page with at least one official source linked — an overclaim, since linking a source is not the same as verifying content against it. This affected all 4 pages that already had sources (EU Citizen Roadmap, EU Registration, Padrón, Healthcare) as well as the 3 fixed in this sprint. The wording was corrected across all 7 pages to state that sources are linked for further checking, not that verification has occurred.

## Step 4 — Extracted risky claims for the 7 High-priority pages

### `/moving-to-spain/eu-citizens/`
- EU/EEA/Swiss citizens can enter Spain without a visa.
- Registration is "usually required" past 3 months.
- EU citizens "usually" receive a Certificate of Registration, not a TIE.
- Appointment availability "can vary" by province/office (hedged, but still a claim about the system's real-world behavior).

### `/moving-to-spain/eu-registration/`
- NIE ≠ EU Registration Certificate ≠ TIE (terminology claim, load-bearing for the whole guide).
- EX-18 is "the common form."
- Modelo 790-012 is "usually paid before the appointment."
- Healthcare evidence requirement varies by applicant route (work/self-employed/student/retired/sufficient resources).
- The certificate is "commonly a green certificate rather than a photo ID card."

### `/moving-to-spain/registering-on-the-padron/`
- Padrón is separate from immigration residency ("it does not grant immigration status").
- Documents/appointments vary by municipality (province-specific variation claim, core to the whole page).
- Padrón may be requested for EU registration, TIE, healthcare, and school procedures.

### `/moving-to-spain/healthcare/`
- Public healthcare access depends on work/Social Security/pension/family status/other recognised routes — not automatic.
- S1 form relevance for pensioners/cross-border-covered people.
- EHIC is "generally for temporary stays," distinct from resident healthcare access.
- Regional health card procedures vary by autonomous community.
- Healthcare evidence "may need to happen before" EU registration for non-employment routes.

### `/living-in-spain/taxes/`
- Tax residency ≠ immigration residency (foundational distinction for the whole guide).
- 183-day rule is "important, but not the only factor" — personal/economic interests and treaties also matter.
- Spanish tax residents "may need to declare worldwide income."
- Double-taxation treaties "may affect how income is taxed."
- Explicit disclaimer: general information only, not tax advice.

### `/living-in-spain/social-security/`
- Social Security number ≠ NIE ≠ healthcare card ≠ tax ID (foundational distinction for the whole guide).
- Employees are "usually registered by their employer"; self-employed people "usually" handle registration themselves or via a gestor.
- Social Security is "one possible route" into public healthcare, not the only one.
- Not every newcomer needs Social Security immediately.

### `/living-in-spain/driving/`
- EU/EEA licences are "generally recognised" while valid; renewal rules may apply once resident.
- Non-EU licence recognition "depends on the country of issue and whether Spain has an exchange agreement."
- An International Driving Permit "may help temporarily" but "does not replace residency rules."
- Medical check requirement for renewal/exchange, dependent on licence category/age.
- Vehicle registration, insurance, and ITV are "different administrative questions" from licence exchange.

---

## Pages that should not be published before source/legal review

All 15 draft pages remain unpublished (`noindex,nofollow`) and none should move to `review`/`published` status before this phase completes. Within that, the priority order for the remaining source-verification work:

1. ~~Taxes, Social Security, Driving Licence — no official sources linked at all~~ — **resolved in Sprint 43.**
2. **EU Citizen Roadmap, EU Registration, Padrón, Healthcare, Taxes, Social Security, Driving Licence** (all 7 High-priority pages) — all now have at least one linked source, but every one still needs human/professional legal-review sign-off; linking a source is not the same as verifying content against it.
3. **Documents Checklist** — names specific form numbers (EX-18, Modelo 790-012) without a source; should be sourced alongside the immigration pages above, given the overlap.
4. **Settling Into Spain, Finding Accommodation, Opening a Bank Account, Digital Certificate** — Medium sensitivity; source once the Documents Checklist gap above is addressed.
5. **Start Here, Search** — no action needed; not applicable.
6. **Non-EU Citizen Roadmap** (added Sprint 46) — High sensitivity, sources already added; needs its own legal/immigration review pass given its broader, more nationality-dependent scope. Its 7 route-specific sub-guides don't exist yet and aren't part of this matrix until they're drafted.
