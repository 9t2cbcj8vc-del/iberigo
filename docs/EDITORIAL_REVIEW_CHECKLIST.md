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
