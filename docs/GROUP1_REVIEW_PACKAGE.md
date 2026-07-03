# Group 1 Human Review Package — Low-Risk Orientation Pages

**Date:** 2026-07-02
**Purpose:** a focused package for whoever performs the first human legal/editorial review pass, covering the 5 pages judged safest to review first (per `docs/PUBLISH_READINESS_AUDIT.md`). This document does not grant publication approval — it prepares the ground for a human to do so.

## Group 1 final status

**Group 1 is the safest first-publish candidate group, but no page is approved for publication yet.** All 5 pages below still require human review before any `noindex, nofollow` removal. Nothing in this document should be read as a recommendation to publish immediately — it is a review aid, not a review outcome.

**Current visual status (all 5 pages): Visual review completed — still not published.** Content was judged acceptable for now in Sprint 65, the Guide System v1 visual pass was applied in Sprint 68, the Sprint 72 TOC/reading-time polish was rechecked across the full draft set in Sprint 73, and no visual blocker remains for Group 1. No page is published — all remain `noindex, nofollow`.

**Sprint 68 update — Guide System v1 scoped visual pass applied.** All visual changes were made inside the generated-page inline `guideCss()` block per the Sprint 67 scope plan; `styles.css` and live indexed pages were verified untouched (git-status scope check passed: only `scripts/guide-components.js` + the 21 generated draft pages changed). A first visual QA pass was run on all 5 Group 1 pages in a real browser at ~390px and 1280px:

- No horizontal overflow on any Group 1 page at 390px (verified programmatically, `scrollWidth == clientWidth`).
- CTAs measure 44px tall and full-width on mobile; 0 buttons below the 44px tap-target bar (checked on the CTA-densest page, Settling Into Spain).
- The Bank Account comparison/at-a-glance tables stack to block layout at 390px with no overflow.
- Card radius unified at 16px; body text 15.2px with 24.6px line-height; card padding 17.6px.
- Warning boxes render with the calm cream background (no alarming styling).
- Official-source external links show a quiet ↗ affordance (reference, not certification, per the Guide System).
- Desktop (1280px): 3-column card grid, hero H1 reduced to ~54px max (calmer than the previous ~70px), generous hero padding; a new 2-column intermediate breakpoint (641–900px) verified working.

**This was an implementation-side QA pass, not the human visual QA approval.** Group 1 still requires human visual QA sign-off against `docs/IBERIGO_GUIDE_SYSTEM_V1.md` §8 before the "changes requested" status can move forward. No page is approved for publication; all pages remain `noindex, nofollow`.

**Sprint 69 update — local visual QA pack prepared. Visual QA status for all 5 Group 1 pages: Visual QA prepared — awaiting human visual review.** Full-page screenshots (mobile 390px + desktop 1280px, faithful viewports via puppeteer-core) are saved locally in `visual-qa/group1/` (untracked, not committed). Per-page results, cross-page checklist verdicts, and issues are in `docs/GROUP1_VISUAL_QA_REPORT.md`. Summary: zero visual/CSS issues found; one **content** finding — internal verification commentary (e.g. "Verified reachable this sprint (HTTP 200…)") is visible to readers inside official-source card notes, flagged for a small follow-up cleanup. Publish decision unchanged for every page: **do not publish yet, keep `noindex, nofollow`.**

**Sprint 70 update — source-note cleanup completed.** The Sprint 69 content finding is resolved: all user-facing official-source card notes and the "Source status" banner now use calm, reader-facing wording; technical verification history lives only in `docs/SOURCE_VERIFICATION_MATRIX.md` / `docs/PR5_REVIEW_RISKS.md`. Documents Checklist source cards were confirmed clean in a browser, and a full-page sweep for internal process language returns zero hits across all generated pages. The visual QA package remains prepared; **Group 1 still awaits human visual review; no page is approved for publication; all pages remain `noindex, nofollow`.**

**Sprint 72 update — human visual review fixes applied. Visual status for all 5 Group 1 pages: Visual changes applied — awaiting human visual re-check.** Human visual review found two layout polish issues: the generated "On this page" TOC could overlap and feel cramped on desktop, especially on Bank Account, and the reading-time label felt detached below the hero. Both fixes were applied only in the generated guide component layer (`scripts/guide-components.js`) and regenerated draft guide pages: TOC links now render as a clean vertical text list, the sticky sidebar is hidden at cramped medium widths, and reading time appears inside the hero/meta area. Browser checks at 1280px, 1000px, and 390px found no horizontal overflow, no TOC overlap, clean reading-time placement, valid mobile tap targets, and correct Bank Account mobile table stacking. **Group 1 still requires human visual re-check; no page is approved for publication; all pages remain `noindex, nofollow`.**

**Sprint 73 update — cross-page visual consistency QA completed. Visual status for Group 1: Visual review completed — still not published.** All 22 draft/noindex surfaces were checked at desktop and mobile widths, including every Group 1 page, EU core page, Living in Spain page, Non-EU batch page, and `/search/`. No new visual consistency issues were found: TOCs do not overlap, reading time remains consistently placed, cards and warning/source blocks stay aligned with Guide System v1, CTAs remain descriptive and at least 44px on mobile, comparison tables stack correctly, and no internal process wording appears in visible page text. Details are in `docs/GUIDE_SYSTEM_V1_CONSISTENCY_QA.md`. **No page is approved for publication; all pages remain `noindex, nofollow`.**

**Sprint 77 update — Group 1 legal review brief created.** A focused reviewer brief now exists at `docs/GROUP1_LEGAL_REVIEW_BRIEF.md`, covering the five Group 1 pages, page-by-page reviewer questions, current source limitations, allowed review outcomes, and blank reviewer outcome fields. This is review preparation only: **Group 1 is still not published; no page is approved for indexing; all pages remain `noindex, nofollow`.**

**Sprint 80 update — owner-review conservative risk pass completed. Status: Owner review risk pass completed — still not published.** No external legal/professional reviewer is available at this stage, so the owner completed a conservative wording-risk pass on the five Group 1 pages. The pass checked overconfident wording, fixed timelines, route labels, municipality/office/bank/landlord variation, and advice-like phrasing. Small wording changes were made only to reduce risk: broader generated disclaimer wording, shared trust/disclaimer blocks on Group 1, softer Start Here route-card framing, softer Documents Checklist universality language, and minor accommodation/settling wording changes. This does **not** equal legal, tax, immigration, rental or financial approval. **Group 1 is still not published; no page is approved for indexing; all pages remain `noindex, nofollow`.**

Allowed editorial/legal review status values as review progresses: *Awaiting human review* → *Human review in progress* → *Human review changes requested* or *Human review completed — still not published*. Visual QA may separately use *Visual review completed — still not published*. No other statuses (in particular: never "legally approved," "ready to publish," or "approved for indexing" — publication is a separate decision made outside this document).

---

## 1. `/start-here/`

- **Title:** Start Here: Moving to Spain — IberiGo
- **Sensitivity:** Low
- **Why it's in Group 1:** Purely a persona router — 7 cards, each linking to a roadmap, with no factual or procedural claims of its own. The lowest-risk page in the entire 22-page set.
- **Current source coverage:** N/A — no external claims to source.
- **Remaining review concerns:** None substantive. Confirm the 7 persona descriptions still accurately summarize their target roadmaps (a drift risk only if a linked roadmap's scope changes later, not a current issue).
- **Human review checklist:**
  - [ ] Confirm all 7 card links resolve to the intended roadmap
  - [ ] Confirm no card overstates what its target roadmap covers
  - [ ] Confirm tone matches site style (calm, practical, no "Read more")
- **Publication recommendation:** Lowest-risk candidate for the first page to clear review, given it makes no claims that could be wrong.
- **Exact reason it must remain `noindex, nofollow` for now:** It is the entry point to the entire unreviewed guide set — publishing it would functionally advertise the existence of 21 other unreviewed pages, even though the page itself is low-risk.
- **Review status:** Human review changes requested

**Reviewer notes:** Content looks acceptable for now. Visual/design changes and visual QA are required before publication.

**Required changes:** Visual/design review required later. Check layout, spacing, mobile presentation, cards, typography, and overall page polish before any page is published.

**Publish decision:** Do not publish yet. Keep noindex, nofollow.

**Follow-up questions:** Which visual/design system should Group 1 use before publication?

---

## 2. `/moving-to-spain/documents-checklist/`

- **Title:** Documents Checklist for Moving to Spain — IberiGo
- **Sensitivity:** Medium-High
- **Why it's in Group 1:** Practical/consumer preparation guidance rather than immigration or tax law — but named specific official forms (EX-18, Modelo 790-012), which is why it started at a lower readiness tier than the rest of the group.
- **Current source coverage:** 4 sources, all closed as of Sprint 63 — Modelo 790-012 (directly verified, `sede.policia.gob.es/Tasa790_012/index.jsp`), Policía Nacional (general portal), apostille/legalisation (directly verified, `exteriores.gob.es` "Legalización diplomática" page), and EX-18 (links to the general, verified Migraciones portal — the exact EX-18 form page could not be independently confirmed; this is documented on the page's source card itself, not hidden).
- **Remaining review concerns:** A reviewer should independently confirm the EX-18 form is still current/correctly named (forms occasionally get renumbered), and spot-check that Modelo 790-012 is still the correct fee code for EU Registration Certificate appointments specifically, since fee-model numbers can be reassigned by the administration over time.
- **Human review checklist:**
  - [ ] Confirm EX-18 is still the correct current form name/number for EU citizen registration
  - [ ] Confirm Modelo 790-012 is still the correct fee code
  - [ ] Confirm the EU vs. non-EU document split is accurate and complete
  - [ ] Confirm no wording implies every reader needs every listed document
  - [ ] Confirm apostille/legalisation guidance doesn't overstate which documents need it
- **Publication recommendation:** Ready to enter the review queue; not blocked on further source work.
- **Exact reason it must remain `noindex, nofollow` for now:** Names specific government form numbers and fee codes — an error here could send a reader to the wrong appointment or payment, which is a real-world consequence even though the page's tone is appropriately cautious.
- **Review status:** Human review changes requested

**Reviewer notes:** Content looks acceptable for now. Visual/design changes and visual QA are required before publication.

**Required changes:** Visual/design review required later. Check layout, spacing, mobile presentation, cards, typography, and overall page polish before any page is published.

**Publish decision:** Do not publish yet. Keep noindex, nofollow.

**Follow-up questions:** Which visual/design system should Group 1 use before publication?

---

## 3. `/moving-to-spain/finding-accommodation/`

- **Title:** Finding Accommodation in Spain — IberiGo
- **Sensitivity:** Medium
- **Why it's in Group 1:** Consumer/practical guidance (rentals, contracts, deposits, scam avoidance) rather than immigration or tax law — the site's own editorial rules already frame this as practical advice, not legal advice.
- **Current source coverage:** None — no official-source cards. This is judged acceptable because the page's claims are about rental-market practice and scam-avoidance, not something with an authoritative single government source (unlike, say, a specific form number).
- **Remaining review concerns:** A reviewer should confirm the padrón-eligibility warnings ("ask before signing or paying a deposit") remain accurate general advice and don't imply a landlord's refusal is itself illegal (it isn't necessarily).
- **Human review checklist:**
  - [ ] Confirm rental/deposit guidance doesn't cross into legal advice
  - [ ] Confirm padrón-before-signing advice is still accurate and appropriately hedged
  - [ ] Confirm scam-avoidance section doesn't name or imply specific bad actors
- **Publication recommendation:** Ready to enter the review queue.
- **Exact reason it must remain `noindex, nofollow` for now:** No source gap, but still unreviewed by a human — the blanket rule applies equally here.
- **Review status:** Human review changes requested

**Reviewer notes:** Content looks acceptable for now. Visual/design changes and visual QA are required before publication.

**Required changes:** Visual/design review required later. Check layout, spacing, mobile presentation, cards, typography, and overall page polish before any page is published.

**Publish decision:** Do not publish yet. Keep noindex, nofollow.

**Follow-up questions:** Which visual/design system should Group 1 use before publication?

---

## 4. `/moving-to-spain/settling-into-spain/`

- **Title:** Settling Into Spain: Your First Steps After Arrival — IberiGo
- **Sensitivity:** Medium
- **Why it's in Group 1:** A sequencing hub that summarizes and cross-links to the more detailed, individually-sourced sub-guides (padrón, healthcare, EU registration, banking, etc.) rather than making standalone claims.
- **Current source coverage:** None directly — by design, since every specific claim it makes is repeated (and sourced) on its own dedicated guide. This is documented as low-risk in `docs/NON_EU_BATCH_AUDIT.md`'s duplication analysis, which applies the same logic here even though that audit was scoped to the Non-EU batch.
- **Remaining review concerns:** A reviewer should confirm the suggested sequence doesn't read as a fixed timeline (it currently explicitly says "the order matters more than the speed") and that every cross-link target still says what this page implies it says.
- **Human review checklist:**
  - [ ] Confirm no fixed-timeline language ("First 30 Days" was explicitly rejected earlier in the project — verify it hasn't crept back in)
  - [ ] Confirm every cross-linked guide (padrón, healthcare, EU registration, banking, digital certificate, Social Security, taxes, driving) is accurately summarized
  - [ ] Confirm this page doesn't duplicate detail that belongs on its sub-guides
- **Publication recommendation:** Ready to enter the review queue, but logically should be reviewed *after* the pages it links to, since its accuracy depends on theirs.
- **Exact reason it must remain `noindex, nofollow` for now:** Its accuracy is derivative of several other still-unreviewed pages; publishing it before those would create a page that correctly summarizes content nobody has yet confirmed is correct.
- **Review status:** Human review changes requested

**Reviewer notes:** Content looks acceptable for now. Visual/design changes and visual QA are required before publication.

**Required changes:** Visual/design review required later. Check layout, spacing, mobile presentation, cards, typography, and overall page polish before any page is published.

**Publish decision:** Do not publish yet. Keep noindex, nofollow.

**Follow-up questions:** Which visual/design system should Group 1 use before publication?

---

## 5. `/living-in-spain/opening-a-bank-account/`

- **Title:** Opening a Bank Account in Spain — IberiGo
- **Sensitivity:** Medium
- **Why it's in Group 1:** Bank-neutral, consumer-facing guidance; no specific bank is endorsed, no immigration-eligibility claims.
- **Current source coverage:** None. No single regulator source was ever identified as strictly necessary (the guide deliberately avoids naming a specific bank or claiming a specific regulatory rule), though a reviewer may want a Banco de España reference added for the general KYC/identification framing if this page moves toward publication (documented in `docs/SOURCE_VERIFICATION_MATRIX.md`, not treated as a blocker).
- **Remaining review concerns:** Confirm the "banks generally need to identify customers" framing (softened from "must" in Sprint 37) still reads as a factual, non-promotional statement, and that no fee/product claim is stale.
- **Human review checklist:**
  - [ ] Confirm no specific bank is named or implied as preferred
  - [ ] Confirm KYC/identification framing is accurate and appropriately hedged
  - [ ] Confirm resident vs. non-resident account guidance doesn't overstate certainty
- **Publication recommendation:** Ready to enter the review queue.
- **Exact reason it must remain `noindex, nofollow` for now:** No source gap, but still unreviewed by a human.
- **Review status:** Human review changes requested

**Reviewer notes:** Content looks acceptable for now. Visual/design changes and visual QA are required before publication.

**Required changes:** Visual/design review required later. Check layout, spacing, mobile presentation, cards, typography, and overall page polish before any page is published.

**Publish decision:** Do not publish yet. Keep noindex, nofollow.

**Follow-up questions:** Which visual/design system should Group 1 use before publication?

---

## Cross-cutting notes for the reviewer

- All 5 pages share the same underlying disclaimer pattern ("general information only, not legal/tax/financial advice") — reviewing that this disclaimer is present and accurate is a single check that applies to the whole package, not 5 separate checks.
- None of these 5 pages have Spanish-language counterparts yet (tracked separately in `docs/BACKLOG.md`) — this package covers English-only review.
- If any of these 5 pages is cleared, the mechanical step to publish it is changing its `status` metadata away from `draft` in `scripts/generate-guide-system.js` (which flips `robots` from `noindex,nofollow` to `index,follow` via `scripts/guide-components.js`'s `GuideLayout`) — that is a separate, deliberate follow-up action, not something this document authorizes or performs.

## Final reminder

**Group 1 is the safest first-publish candidate group, but no page is approved for publication yet. All pages still require human review before any `noindex, nofollow` removal.**
