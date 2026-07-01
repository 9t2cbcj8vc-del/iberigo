# PR #5 Editorial Review Checklist

Use one copy of this checklist per draft guide. Check off each item during human editorial/legal review before a page can move from `draft` to `review`/`published` status. This does not replace the automated checks (`node scripts/generate-guide-system.js`) — it covers what a human needs to judge.

Preview base: https://deploy-preview-5--iberigo.netlify.app

---

## Checklist template (copy per guide)

**Guide:** ______________________
**Route:** ______________________
**Reviewer:** ______________________
**Date:** ______________________

- [ ] **Factual accuracy** — every claim about a procedure, document, or requirement is correct as of today.
- [ ] **Legal/tax/immigration risk** — no wording could be read as legal, tax, or immigration advice rather than general information; disclaimer is present and accurate.
- [ ] **No fixed timelines** — no "first week," "within 30 days," "usually takes X days," or similar promises not legally defined.
- [ ] **No province-specific overclaiming** — nothing implies a procedure works the same everywhere in Spain; municipal/regional variation is called out where relevant.
- [ ] **Official-source links checked** — every linked official source resolves to the correct, current page; every un-linked source has a clear TODO, not a guess.
- [ ] **TODOs reviewed** — all outstanding TODOs for this page are either resolved or explicitly accepted as known gaps before publication.
- [ ] **Internal links correct** — every internal link points to the intended route and the target page exists and says what the link text implies.
- [ ] **CTA labels descriptive** — no "Read more" or generic labels; every call-to-action says what happens next.
- [ ] **noindex,nofollow intentional** — confirm the page should stay `noindex,nofollow` (still draft) or is deliberately being moved to `review`/`published`.
- [ ] **Tone matches IberiGo style** — calm, practical, "we" not "I," plain English, jargon explained, short paragraphs.
- [ ] **Next-step section useful** — the reader leaves knowing what to do next; previous/next/related guide links make sense in sequence.

**Reviewer notes:**




---

## Routes to review

1. `/start-here/`
2. `/moving-to-spain/eu-citizens/`
3. `/moving-to-spain/settling-into-spain/`
4. `/moving-to-spain/documents-checklist/`
5. `/moving-to-spain/finding-accommodation/`
6. `/moving-to-spain/registering-on-the-padron/`
7. `/moving-to-spain/healthcare/`
8. `/moving-to-spain/eu-registration/`
9. `/living-in-spain/opening-a-bank-account/`
10. `/living-in-spain/digital-certificate/`
11. `/living-in-spain/social-security/`
12. `/living-in-spain/taxes/`
13. `/living-in-spain/driving/`
14. `/search/` (functional/UX review only — not applicable for factual-accuracy/legal-risk/timeline items)

See `docs/PR5_REVIEW_ROUTES.md` for a per-route priority/risk summary, and `docs/PR5_REVIEW_RISKS.md` for a pre-scanned list of specific risk-keyword hits to check first.

---

## Sprint 36 — completed editorial passes

Five pages received a content-level editorial read-through against the checklist above. **None of this is legal or tax-professional sign-off** — the "Legal/tax/immigration risk" item is intentionally left unchecked on every page below; that box can only be checked by a qualified human reviewer.

### `/moving-to-spain/eu-citizens/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — reviewed, no incorrect claims found
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — consistently hedged ("appointment availability can vary")
- [x] Official-source links checked — ministry link verified and added this sprint
- [x] TODOs reviewed — the only TODO (ministry link) was resolved
- [x] Internal links correct — validated by `generate-guide-system.js`
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required.

### `/moving-to-spain/eu-registration/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — NIE/EU-Registration/TIE distinction, EX-18 form, and Modelo 790-012 fee reference all read correctly
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming
- [x] Official-source links checked — ministry link verified and added this sprint
- [x] TODOs reviewed — the only TODO (ministry link) was resolved
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required. Also flagging: this page was moved off the live `/guides/eu-registration/` URL in Sprint 34 — the move itself may warrant separate sign-off alongside content review.

### `/moving-to-spain/registering-on-the-padron/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — this page has the highest sensitivity to this issue (see the Torrevieja precedent) and is consistently hedged throughout
- [x] Official-source links checked — "Local Town Halls" intentionally has no single URL (varies by municipality); no TODO was ever open here
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required.

### `/moving-to-spain/healthcare/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — public healthcare, S1, EHIC, and regional health card distinctions all read correctly
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — correctly attributes variation to autonomous community, not implying automatic entitlement
- [x] Official-source links checked — ministry link verified and added this sprint; "Regional health services" intentionally has no single URL
- [x] TODOs reviewed — the only TODO (ministry link) was resolved
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required.

### `/living-in-spain/taxes/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — tax-residency-vs-immigration-residency distinction, 183-day-rule caveat, and treaty caveat all read correctly
- [ ] Legal/tax/immigration risk — **needs human/legal review** (highest-risk page in the set)
- [x] No fixed timelines
- [x] No province-specific overclaiming (not applicable — tax rules are national, not municipal)
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Small fix made:** removed a stray country-specific example ("Finland") from one FAQ question for consistency with the rest of the guide's neutral phrasing. No other edits.

**Status:** Editorial pass completed — legal verification still required.

---

## Sprint 37 — completed editorial passes

Five additional draft pages received a content-level editorial read-through against the checklist above. **None of this is legal, tax or immigration-professional sign-off** — the "Legal/tax/immigration risk" item is intentionally left unchecked on every page below.

### `/start-here/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — low factual surface area; path cards and guide links reviewed
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive — "Coming soon" cards are clearly labelled
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required.

### `/moving-to-spain/settling-into-spain/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — sequence framing reviewed; one banking/KYC statement softened
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — appointment and municipality variation remain explicit
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Small fixes made:** softened "Banks must identify customers" to "Banks generally need to identify customers" and changed "normal sequence" to "general sequence."

**Status:** Editorial pass completed — legal verification still required.

### `/moving-to-spain/documents-checklist/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — document lists reviewed as conditional preparation, not universal requirements
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — local office and appointment variation remain explicit
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Small fixes made:** softened "Most newcomers should prepare" to "Many newcomers should prepare" and changed one bank-document phrase from "usually required" to "commonly requested."

**Status:** Editorial pass completed — legal verification still required.

### `/moving-to-spain/finding-accommodation/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — rental, padrón and scam guidance reviewed as practical guidance
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — municipality and landlord variation remain explicit
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Small fixes made:** softened long-term-rental document wording and changed "Never send large payments" to "Avoid sending large payments."

**Status:** Editorial pass completed — legal verification still required.

### `/living-in-spain/opening-a-bank-account/`
**Reviewer:** Claude (editorial pass) · **Date:** 2026-07-01
- [x] Factual accuracy — resident/non-resident account, fee, direct-debit and bank-document wording reviewed
- [ ] Legal/tax/immigration risk — **needs human/legal review**
- [x] No fixed timelines
- [x] No province-specific overclaiming — bank-by-bank variation is explicit throughout
- [x] Official-source links checked — no official-source cards on this page currently
- [x] TODOs reviewed
- [x] Internal links correct
- [x] CTA labels descriptive
- [x] noindex,nofollow intentional
- [x] Tone matches IberiGo style
- [x] Next-step section useful

**Status:** Editorial pass completed — legal verification still required.

**Sprint 37 routing note:** the `/guides/eu-registration/` → `/moving-to-spain/eu-registration/` route move remains a separate pending routing decision and is not approved by editorial review.
