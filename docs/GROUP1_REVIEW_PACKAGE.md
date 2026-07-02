# Group 1 Human Review Package — Low-Risk Orientation Pages

**Date:** 2026-07-02
**Purpose:** a focused package for whoever performs the first human legal/editorial review pass, covering the 5 pages judged safest to review first (per `docs/PUBLISH_READINESS_AUDIT.md`). This document does not grant publication approval — it prepares the ground for a human to do so.

## Group 1 final status

**Group 1 is the safest first-publish candidate group, but no page is approved for publication yet.** All 5 pages below still require human review before any `noindex, nofollow` removal. Nothing in this document should be read as a recommendation to publish immediately — it is a review aid, not a review outcome.

**Current review status (all 5 pages): Awaiting human review.**

Allowed status values as review progresses: *Awaiting human review* → *Human review in progress* → *Human review changes requested* or *Human review completed — still not published*. No other statuses (in particular: never "legally approved," "ready to publish," or "approved for indexing" — publication is a separate decision made outside this document).

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
- **Review status:** Awaiting human review

**Reviewer notes:**

**Required changes:**

**Publish decision:**

**Follow-up questions:**

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
- **Review status:** Awaiting human review

**Reviewer notes:**

**Required changes:**

**Publish decision:**

**Follow-up questions:**

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
- **Review status:** Awaiting human review

**Reviewer notes:**

**Required changes:**

**Publish decision:**

**Follow-up questions:**

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
- **Review status:** Awaiting human review

**Reviewer notes:**

**Required changes:**

**Publish decision:**

**Follow-up questions:**

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
- **Review status:** Awaiting human review

**Reviewer notes:**

**Required changes:**

**Publish decision:**

**Follow-up questions:**

---

## Cross-cutting notes for the reviewer

- All 5 pages share the same underlying disclaimer pattern ("general information only, not legal/tax/financial advice") — reviewing that this disclaimer is present and accurate is a single check that applies to the whole package, not 5 separate checks.
- None of these 5 pages have Spanish-language counterparts yet (tracked separately in `docs/BACKLOG.md`) — this package covers English-only review.
- If any of these 5 pages is cleared, the mechanical step to publish it is changing its `status` metadata away from `draft` in `scripts/generate-guide-system.js` (which flips `robots` from `noindex,nofollow` to `index,follow` via `scripts/guide-components.js`'s `GuideLayout`) — that is a separate, deliberate follow-up action, not something this document authorizes or performs.

## Final reminder

**Group 1 is the safest first-publish candidate group, but no page is approved for publication yet. All pages still require human review before any `noindex, nofollow` removal.**
