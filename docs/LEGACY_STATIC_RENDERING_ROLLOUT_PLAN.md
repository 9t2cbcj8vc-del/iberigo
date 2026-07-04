# Legacy Static Rendering Rollout Plan

**Status: Phone static rendering POC prepared - preview QA pending**

**Sprint 120 update (2026-07-04):** the recommended one-pair follow-up was prepared on `visual-coherence/phone-static-poc`. `/guides/phone/` and `/guides/es/phone/` now have static `#wizardResult` content generated from the existing `app.js` phone route data and provider link metadata. `scripts/render-legacy-static-poc.js` was evolved from a job-search-only script into a controlled selected-route renderer: `job-search` remains supported for the launched POC, while only `phone` is selected for this sprint. The audit moved from **2/70** to **4/70** static-body-content routes (`job-search` EN+ES and `phone` EN+ES); the remaining **66/70** legacy routes are unchanged. No `app.js`, `styles.css`, redirect, sitemap, search-index, robots, full migration, or additional publication change was made. Preview QA is still required before merge.

**Sprint 118 update (2026-07-04):** this document plans the rollout after the live job-search proof of concept. It does not implement additional static legacy pages. No legacy guide HTML, `app.js`, `styles.css`, redirects, sitemap, search index, robots, publication status, or draft `noindex, nofollow` settings were changed while producing this plan.

## Goal

Expand legacy `/guides/*` static rendering carefully, one small reviewed batch at a time, while preserving the existing indexed legacy URLs and the current JavaScript-enhanced experience.

The rollout should close the no-JavaScript/no-static-content gap measured by `scripts/audit-legacy-guides.js` without accidentally creating a broader migration, redirect strategy, styling change, or publication event.

## Current Baseline After POC

- 70 legacy guide URLs total.
- 35 English topics and 35 Spanish mirrors.
- 2/70 pages currently have static guide body content:
  - `/guides/job-search/`
  - `/guides/es/job-search/`
- 68/70 remain client-side-only in the body.
- 70/70 still have index files, sitemap entries, canonical URLs, meta descriptions, complete hreflang sets, and `data-guide-id` values.
- 0/70 have a `<noscript>` fallback.
- All 70 still match the homepage-shell-clone pattern because the surrounding homepage/wizard shell remains in place.
- No redirects, `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, or `robots.txt` changes were made by the POC.

## POC Result

The job-search POC proved that static guide content can be written into the existing `#wizardResult` placeholder while leaving the rest of the legacy page intact.

What worked:

- Metadata, canonical, hreflang, sitemap presence, and URLs were preserved.
- `app.js` continued to enhance the page and overwrite the same result area.
- JavaScript-enabled rendering did not duplicate the guide title, list, links, or disclaimer.
- The audit correctly moved from 0/70 to 2/70 static body content routes.
- The change stayed limited to one EN+ES route pair.

Known limitations:

- `scripts/render-legacy-static-poc.js` is hardcoded to job-search.
- The static content is a documented transcription from `app.js`, not a generic extraction from a shared data source.
- The script does not yet support selected route allowlists.
- The script does not yet compare expected metadata or verify that only `#wizardResult` changed.
- The audit detects static body content but does not classify content complexity or rollout readiness.

## Remaining Route Inventory

All rows represent an English route plus its Spanish mirror. Metadata and sitemap status are complete for every pair unless noted otherwise.

| Guide id | English route | Spanish route | Static body status | Guide System v1 overlap | Content complexity | Generated-static fit | Risk | Suggested batch |
|---|---|---|---|---|---|---|---|---|
| `job-search` | `/guides/job-search/` | `/guides/es/job-search/` | Complete | None | Simple direct roadmap, long link list | Proven | Low | Done |
| `phone` | `/guides/phone/` | `/guides/es/phone/` | Missing | None | Simple direct roadmap, provider links | Strong | Low | Batch 1 |
| `renting-home` | `/guides/renting-home/` | `/guides/es/renting-home/` | Missing | None | Direct roadmap with `whatHappensNext`; rental caution needed | Good after renderer supports extra section | Low-medium | Batch 2 |
| `ehic-card` | `/guides/ehic-card/` | `/guides/es/ehic-card/` | Missing | None | Simple direct roadmap, healthcare-adjacent | Good | Low-medium | Batch 3 |
| `private-health` | `/guides/private-health/` | `/guides/es/private-health/` | Missing | None | Simple direct roadmap, insurance and visa-sensitive wording | Good after wording review | Medium | Batch 3 or later |
| `sip-card` | `/guides/sip-card/` | `/guides/es/sip-card/` | Missing | Conceptual overlap with Healthcare draft | Province/autonomous-community-sensitive healthcare content | Possible but needs review | Medium | Defer |
| `vida-laboral` | `/guides/vida-laboral/` | `/guides/es/vida-laboral/` | Missing | None | Direct roadmap with longer admin explanation | Good after renderer handles longer text | Low-medium | Batch 3 |
| `nie` | `/guides/nie/` | `/guides/es/nie/` | Missing | No direct Guide System page, but immigration/admin-sensitive | Direct roadmap with province/timing claims | Possible after editorial review | Medium | Defer |
| `nie-only` | `/guides/nie-only/` | `/guides/es/nie-only/` | Missing | No direct Guide System page, but immigration/admin-sensitive | Route-array content, official-form links | Possible after extraction support | Medium | Defer |
| `tie` | `/guides/tie/` | `/guides/es/tie/` | Missing | No direct Guide System page yet | Immigration card content | Possible after legal wording review | Medium-high | Defer |
| `tie-after-approval` | `/guides/tie-after-approval/` | `/guides/es/tie-after-approval/` | Missing | No direct Guide System page yet | Immigration card content, post-approval flow | Possible after legal wording review | Medium-high | Defer |
| `family` | `/guides/family/` | `/guides/es/family/` | Missing | `/moving-to-spain/family-reunification/` draft | Immigration/family route overlap | Not before canonical/content decision | High | Defer |
| `eu-family` | `/guides/eu-family/` | `/guides/es/eu-family/` | Missing | `/moving-to-spain/family-member-eu-citizen/` draft | Immigration route overlap | Not before canonical/content decision | High | Defer |
| `eu-registration` | `/guides/eu-registration/` | `/guides/es/eu-registration/` | Missing | `/moving-to-spain/eu-registration/` draft | Direct Guide System overlap | Not before route/canonical decision | High | Defer |
| `padron` | `/guides/padron/` | `/guides/es/padron/` | Missing | `/moving-to-spain/registering-on-the-padron/` draft | Municipality-sensitive, Guide System overlap | Not before content/canonical decision | High | Defer |
| `digital` | `/guides/digital/` | `/guides/es/digital/` | Missing | `/living-in-spain/digital-certificate/` draft | Direct Guide System overlap | Not before content/canonical decision | High | Defer |
| `social-security` | `/guides/social-security/` | `/guides/es/social-security/` | Missing | `/living-in-spain/social-security/` draft | Direct Guide System overlap | Not before content/canonical decision | High | Defer |
| `taxes` | `/guides/taxes/` | `/guides/es/taxes/` | Missing | `/living-in-spain/taxes/` draft | Tax-sensitive, Guide System overlap | Not before tax/content review | High | Defer |
| `banking` | `/guides/banking/` | `/guides/es/banking/` | Missing | `/living-in-spain/opening-a-bank-account/` launched | Live duplicate-content risk | Not before canonical decision | High | Defer |
| `digital-nomad` | `/guides/digital-nomad/` | `/guides/es/digital-nomad/` | Missing | `/moving-to-spain/digital-nomad-spain/` draft | Immigration/tax-sensitive overlap | Not before legal/content review | High | Defer |
| `driving-licence-exchange` | `/guides/driving-licence-exchange/` | `/guides/es/driving-licence-exchange/` | Missing | `/living-in-spain/driving/` draft | Legal/admin-sensitive; includes fixed processing wording | Not before legal/timing review | High | Defer |
| `study` | `/guides/study/` | `/guides/es/study/` | Missing | `/moving-to-spain/students/` draft | Immigration route overlap | Not before content/canonical decision | High | Defer |
| `work-authorization` | `/guides/work-authorization/` | `/guides/es/work-authorization/` | Missing | `/moving-to-spain/work-in-spain/` draft | Immigration route overlap | Not before content/canonical decision | High | Defer |
| `non-lucrative` | `/guides/non-lucrative/` | `/guides/es/non-lucrative/` | Missing | No current direct Guide System page, but immigration-sensitive | Route-array content with insurance links | Possible only after legal wording review | Medium-high | Defer |
| `eu-working` | `/guides/eu-working/` | `/guides/es/eu-working/` | Missing | Conceptual overlap with EU Registration | EU registration as worker | Possible only after route/canonical review | Medium-high | Defer |
| `eu-vacation` | `/guides/eu-vacation/` | `/guides/es/eu-vacation/` | Missing | None | Route-array vacation content, large travel link set | Possible after vacation batch planning | Low-medium | Vacation batch |
| `non-eu-vacation` | `/guides/non-eu-vacation/` | `/guides/es/non-eu-vacation/` | Missing | None | Route-array Schengen content, entry rules | Possible after current EES/ETIAS review | Medium | Vacation batch |
| `vacation-entry` | `/guides/vacation-entry/` | `/guides/es/vacation-entry/` | Missing | None | Direct roadmap, entry-rule sensitive | Possible after current EES/ETIAS review | Medium | Vacation batch |
| `vacation-citizenship` | `/guides/vacation-citizenship/` | `/guides/es/vacation-citizenship/` | Missing | None | Direct roadmap, EU/non-EU entry rules | Possible after current EES/ETIAS review | Medium | Vacation batch |
| `vacation-flights` | `/guides/vacation-flights/` | `/guides/es/vacation-flights/` | Missing | None | Simple travel links | Strong | Low | Vacation batch |
| `vacation-ground` | `/guides/vacation-ground/` | `/guides/es/vacation-ground/` | Missing | None | Simple travel links | Strong | Low | Vacation batch |
| `vacation-booking` | `/guides/vacation-booking/` | `/guides/es/vacation-booking/` | Missing | None | Simple booking/review links | Strong | Low | Vacation batch |
| `vacation-hotels` | `/guides/vacation-hotels/` | `/guides/es/vacation-hotels/` | Missing | None | Simple hotel/travel links | Strong | Low | Vacation batch |
| `vacation-tourism` | `/guides/vacation-tourism/` | `/guides/es/vacation-tourism/` | Missing | None | Simple official tourism links | Strong | Low | Vacation batch |
| `vacation-reviews` | `/guides/vacation-reviews/` | `/guides/es/vacation-reviews/` | Missing | None | Simple review/comparison links | Strong | Low | Vacation batch |

## Inventory Summary

- Done: 1 pair / 2 routes (`job-search`).
- Best immediate candidate: 1 pair / 2 routes (`phone`).
- Good follow-up candidates after renderer generalization: `renting-home`, `ehic-card`, `vida-laboral`.
- Good vacation/travel candidates after a dedicated vacation-batch decision: `vacation-flights`, `vacation-ground`, `vacation-booking`, `vacation-hotels`, `vacation-tourism`, `vacation-reviews`.
- Review-first candidates: `private-health`, `sip-card`, `nie`, `nie-only`, `non-lucrative`, `eu-working`, `non-eu-vacation`, `vacation-entry`, `vacation-citizenship`.
- Defer until canonical/content decisions: `banking`, `eu-registration`, `padron`, `digital`, `social-security`, `taxes`, `digital-nomad`, `driving-licence-exchange`, `study`, `work-authorization`, `family`, `eu-family`.

## Rollout Strategy Options

### Option A - Convert all remaining 68 at once

- Benefits: fastest numerical progress; closes the measured static-body gap in one PR.
- Risks: very high blast radius; mixes simple travel pages with immigration, tax, healthcare, and duplicate-content topics; hard to review; rollback would be large and noisy.
- Files touched: up to 68 legacy HTML files plus renderer/report updates.
- QA cost: very high; every route needs raw HTML, JS-enabled, metadata, and regression checks.
- Rollback path: revert a large PR; difficult to isolate one problematic topic.
- SEO/indexing risk: high because overlapping Guide System topics and current indexed legacy topics would all change together.
- Recommendation: do not use.

### Option B - Small batches of 2-4 route pairs

- Benefits: practical balance of momentum and reviewability; each batch can group similar content shapes; rollback stays small.
- Risks: still possible to mix content types if batches are chosen too broadly.
- Files touched: 4-8 legacy HTML files per batch, plus controlled renderer updates.
- QA cost: moderate and predictable.
- Rollback path: revert the batch PR or selected route-pair files.
- SEO/indexing risk: low when batches avoid Guide System overlaps and legally sensitive topics.
- Recommendation: use after one more single-pair follow-up proves the renderer generalizes.

### Option C - One pair per PR

- Benefits: safest implementation path; easiest preview QA; clearest audit before/after delta.
- Risks: slower rollout; more PR overhead.
- Files touched: 2 legacy HTML files plus renderer/report updates.
- QA cost: low per PR.
- Rollback path: revert one route pair.
- SEO/indexing risk: lowest, especially for the first follow-up after job-search.
- Recommendation: use for the next implementation PR.

### Option D - Tooling-first

- Benefits: improves repeatability before touching more pages; reduces manual transcription drift; can add allowlists, metadata guards, and placeholder-only rewrites.
- Risks: does not increase static-route count by itself; may become too abstract if it tries to solve all 68 routes upfront.
- Files touched: renderer script and docs/tests only, if no new pages are converted.
- QA cost: low to moderate; focuses on idempotency and safety checks.
- Rollback path: revert script changes.
- SEO/indexing risk: none if no guide HTML is changed.
- Recommendation: combine with Option C by evolving the renderer just enough to support one selected new pair.

## Recommended Strategy

Use a staged Option C -> Option B approach:

1. Next PR: one additional EN+ES pair only, preferably `phone`, while evolving the renderer from a job-search-only POC into a controlled selected-route renderer.
2. Follow-up: one or two low-risk pairs, such as `renting-home` and possibly `ehic-card`, only after the `phone` PR passes preview QA.
3. Later: small batches of 2-4 route pairs, grouped by content type and risk.
4. Keep all overlap, legal, tax, immigration, healthcare, and route/canonical questions out of the early rollout.

Do not convert all remaining 68 routes in one PR.

## Recommended Next Implementation PR

Recommended next PR: convert one additional EN+ES pair:

- `/guides/phone/`
- `/guides/es/phone/`

Why `phone`:

- No direct Guide System v1 overlap.
- Simple direct roadmap content.
- No `whatHappensNext` field.
- Six provider links, similar to the already-proven job-search link-list shape.
- Lower legal/tax/immigration risk than residence, healthcare, driving, tax, or Schengen entry topics.
- Good test of whether the renderer can generalize beyond job-search without expanding the batch.

The next PR should also rename or supplement `scripts/render-legacy-static-poc.js` with a controlled selected-route renderer, but only to the minimum needed for `phone` plus the already-rendered `job-search` pair.

## Generator and Script Plan

`scripts/render-legacy-static-poc.js` should not become an automatic all-route renderer.

Safest future shape:

- Keep route selection allowlist-based.
- Require an explicit list of target guide IDs, such as `job-search`, `phone`, or `renting-home`.
- Preserve `<head>` exactly.
- Only rewrite the exact `#wizardResult` placeholder block.
- Fail loudly if:
  - a target file is missing,
  - the placeholder is missing,
  - the language pair is incomplete,
  - expected content is missing,
  - the rendered output would change anything outside the result block.
- Keep output deterministic.
- Include a dry-run or verification mode if practical.
- Keep generated static content consistent with `app.js` source data.
- Avoid running or requiring `app.js` directly unless it is refactored into a safe data module later.
- Avoid default all-route behavior.
- Update the audit after rendering and confirm only the intended route pairs changed.

Short-term implementation approach:

- Extract the shared rendering helpers from the POC script.
- Add an allowlisted content map for `phone`, with source comments pointing to the `directRoadmapFor()` branch and link maps in `app.js`.
- Keep `job-search` in the allowlist so the script remains reproducible for the existing POC pages.
- Add a target list that must be edited intentionally for each PR.

Longer-term approach:

- Move legacy roadmap content into a safe data module only after a separate refactor decision.
- Extend the audit report to include rollout classification fields only if useful.
- Keep migration into Guide System v1 separate from static rendering in place.

## QA Gates For Every Future Rollout PR

Required checks:

- Run `node scripts/generate-guide-system.js`.
- Run `node scripts/audit-legacy-guides.js`.
- Confirm the audit exits `0`.
- Confirm the audit before/after delta includes only intended route pairs.
- Confirm raw HTML/view-source includes route-specific static content.
- Confirm JavaScript-enabled rendering has no double-rendering.
- Confirm `#wizardResult`, result hero, roadmap list, links, and disclaimer appear once after JS runs.
- Confirm metadata, canonical, hreflang, title, and description are unchanged.
- Confirm `sitemap.xml`, `search-index.json`, and `robots.txt` are unchanged.
- Confirm `app.js` and `styles.css` are unchanged unless explicitly justified.
- Confirm unrelated legacy routes are byte-identical, excluding expected audit report timestamp changes.
- Confirm homepage returns `200` and renders normally.
- Confirm `/start-here/` returns `200` and remains `index, follow`.
- Confirm The Spain Files route returns `200`.
- Confirm `/support/` returns `200`.
- Confirm all five launched Group 1 pages remain `index, follow`.
- Confirm generated draft/noindex surfaces remain `noindex, nofollow`.
- Confirm no redirects were added.
- Confirm no additional pages were published.
- Confirm no full legacy migration happened.

Suggested visual/browser checks:

- Desktop around 1280px.
- Mobile around 390px.
- English and Spanish selected routes.
- One unrelated legacy route with no static content.
- One launched Guide System page.

## Rollback Plan

For a one-pair rollout:

1. Revert the two selected legacy HTML files to their previous homepage-shell placeholder state.
2. Revert any renderer changes that are specific to that pair if needed.
3. Rerun the generator and audit.
4. Confirm the audit static-body count returns to the prior expected number.
5. Confirm sitemap, search index, robots, `app.js`, and `styles.css` remain unchanged.

For a script-only or tooling-first change:

1. Revert the renderer script changes.
2. Confirm no legacy guide HTML changed.
3. Rerun checks.

## Out Of Scope

- Converting all remaining 68 routes in one PR.
- Changing `app.js`.
- Changing `styles.css`.
- Adding redirects.
- Migrating legacy guides into Guide System v1.
- Publishing additional generated guide pages.
- Removing `noindex, nofollow` from non-selected drafts.
- Changing `sitemap.xml`.
- Changing `search-index.json`.
- Changing `robots.txt`.
- Solving duplicate-content questions for overlapping legacy/new guide routes.
- Creating Spanish versions of Guide System v1 pages.

## Future Expansion Path

1. Convert `phone` as one EN+ES pair.
2. If clean, convert `renting-home` as one EN+ES pair after adding `whatHappensNext` support.
3. If clean, consider a small low-risk batch, such as `ehic-card` plus `vida-laboral`, after wording review.
4. Create a separate vacation/travel static-rendering plan for the 10 vacation route pairs, because those pages form a distinct content cluster.
5. Defer all overlapping Guide System topics until route/canonical decisions are approved.
6. Defer high-risk legal, tax, immigration, healthcare, and driving topics until content review confirms the legacy text is safe to expose statically.
