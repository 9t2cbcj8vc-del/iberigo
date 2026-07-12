# Sitewide Visual Coherence Audit

**Date:** 2026-07-03
**Status:** Sitewide visual coherence audit completed — implementation pending
**Scope:** audit and planning only. No implementation, no `styles.css` edits, no publication changes, no merges were made while producing this document.

**Sprint 97A update (2026-07-03):** a focused bug fix was prepared (not yet merged) for uneven Guide System v1 card CTA alignment — buttons inside `.guide-info-card` now consistently sit at the bottom of the card with a uniform width, via a scoped flex-layout change in `scripts/guide-components.js`'s `guideCss()`. This is a small correctness fix within Guide System v1 itself; it does not implement any part of the sitewide unification plan below (radius alignment, legacy-page structural fix, Vacation/Live landing pages, homepage card redesign), which remains entirely unimplemented and pending future, separately-scoped decisions. See `docs/PUBLISH_READINESS_AUDIT.md` and `docs/BACKLOG.md` for details.

**Sprint 97B update (2026-07-03):** the CSS-only fix from Sprint 97A wasn't enough — cards still looked uneven because CTA labels varied too much in length, causing some buttons to wrap to a taller two-line shape next to single-line siblings. Normalized CTA labels to a small, consistent set ("View roadmap," "View guide," "Continue") across `/start-here/`, `/moving-to-spain/non-eu-citizens/`, and every page's shared "Related Guides"/journey-card labels (`scripts/generate-guide-system.js`'s `guideSummaries`). Still Guide-System-scoped only, no `styles.css` edit, no part of the sitewide unification plan implemented.

**Sprint 97C update (2026-07-03):** preview QA on PR #21's Netlify deploy preview passed with no issues — normalized CTA labels are visually uniform across `/start-here/` and every secondary page checked, at 1280px and 390px, with launch safety fully intact. PR #21 remains unmerged pending a merge decision.

**Sprint 97D update (2026-07-03):** a related but separate live homepage CTA inconsistency was found (the "Move to Spain" card's `<a>` CTA rendered larger than "Vacation"/"Live" cards' `<button>` CTAs, a side effect of PR #19) and fixed on the same PR #21 before merge, with a small scoped `styles.css` change limited to the `.situation-card--illustrated` selectors — not part of the broader unification plan below, just a same-system consistency fix. Production `/start-here/` still shows the old, un-normalized Guide System buttons because PR #21 remains unmerged; only once PR #21 merges will both the Guide System label fix and the homepage CTA-size fix go live together.

**Sprint 97E update (2026-07-03):** final preview QA on PR #21 passed with no issues — confirmed the `styles.css` diff is narrowly scoped to `.situation-card--illustrated` only, homepage and Guide System CTAs are both visually coherent on the preview, and a regression check on non-guide live pages (`/the-spain-files/`, `/support/`, `/guides/banking/`, `/guides/eu-registration/`) found no side effects. PR #21 remains unmerged pending a merge decision; production `/start-here/` and the homepage CTA fix both stay un-shipped until then.

**Sprint 97E update (continued) — user-facing Draft labels removed:** a visible "DRAFT — Not reviewed for publication" badge was found on every non-selected draft page (`StatusBadge()` in `scripts/guide-components.js`) — an internal-workflow-status leak unrelated to the coherence findings above, but relevant to this document's "calm, practical, government-adjacent" tone goal for the Guide System. Removed: the badge now always renders empty, and a dormant "Draft guide" default fallback in `GuideHero()` was replaced with neutral copy. `robots` metadata logic is untouched — indexing control remains entirely separate from the visible UI, exactly as this project's launch process has relied on throughout Sprints 87–97.

**Sprint 97F update (2026-07-03):** directly addresses this document's Step 2 finding that Guide System v1's official-source cards are visually generic compared to the legacy `app.js`/`styles.css` `.gov-link` source-category system (see Step 2's comparison table). Reused that system's safe design language — accent colors and small initials badges per source category, no logos, no literal flags — as a new, entirely scoped variant system in `scripts/guide-components.js` (`classifySource()`, `SOURCE_CATEGORY_META`, new CSS confined to `guideCss()`), covering 9 categories: government, police, eu, tax, social-security, traffic, healthcare, municipal, generic. This is additive, calm, and does not touch `styles.css` or any part of the broader sitewide unification plan below — it specifically closes the "trust/disclaimer and source-card presentation differs in prominence" gap noted in Step 3's inconsistency risks, for the Guide System side of that comparison only.

**Official source-link polish completed (follow-up, 2026-07-03):** a final confirmation pass found the Sprint 97F source-card work already coherent and calm — equal card heights within a row, no tag wrapping at mobile width, consistent spacing — so no further changes were needed. PR #21's scope remains deliberately narrow (CTA alignment, CTA labels, homepage CTA consistency, Draft-label removal, source-link polish); it still does not implement any part of the broader sitewide unification plan above.

**Sprint 98 update — PR #21 final preview QA passed (2026-07-03):** every fix bundled in PR #21 (Guide card CTA alignment, normalized CTA labels, homepage Move/Vacation/Live CTA consistency, Draft-label removal, official source-link polish) was re-checked together on the PR's Netlify deploy preview at 1280px/390px, with no issues found. Regression check on `/the-spain-files/`, `/support/`, and both sampled legacy `/guides/*` pages confirmed no side effects. Launch safety (5 launched pages, 16 drafts, sitemap, search-index, robots.txt) verified directly against the live preview, matching `main` exactly outside the five launched routes. PR #21 remains unmerged, pending a merge decision.

**Sprint 99 update — PR #21 visual fixes launched (2026-07-04):** PR #21 was squash-merged into `main` (commit `1c5b61c`) and verified live on production (`https://iberigo.eu`). All Guide System CTA/label/Draft-label/source-card fixes and the homepage Move/Vacation/Live CTA consistency fix are now live. This closes out the entire visual-fix arc opened by this sitewide coherence audit's PR #19 recommendation — the remaining unification-plan phases (radius alignment, legacy-page structural fix, Vacation/Live landing pages, homepage card redesign) remain unimplemented and pending separately-scoped future decisions.

**Sprint 101 update — Visual Coherence Phase 1 planned (2026-07-04):** created `docs/VISUAL_COHERENCE_PHASE1_PLAN.md`, turning this audit's Step 4 "Implementation phases" into a concrete, scoped plan for Phase 1: a small, additive homepage card coherence pass (radius/spacing/CTA-rhythm alignment on `index.html` only), with a file-risk map, a recommended first PR, a QA checklist, and a rollback plan. Phase 2 (legacy `/guides/*` structural fix), Phase 3 (Vacation/Live landing pages), and Phase 4 (homepage card redesign) remain unimplemented and unplanned in detail — Phase 1 planning does not commit to their scope or timing. This sprint is planning only: no implementation, no `styles.css` edits, no indexing changes, no redirects, no legacy migration. No PR was opened, no merge was performed.

**Sprint 103 update — Homepage card coherence pass prepared (2026-07-04):** implemented the Phase 1 plan's recommended first PR on `visual-coherence/homepage-card-pass` (not yet merged). Narrowly-scoped `styles.css` change to `.situation-card--illustrated` and its CTA rule only: border-radius bumped to 16px (matching Guide System v1 exactly), border/shadow tokens reused from Guide System v1's `.guide-info-card`, and CTA font-weight bumped for presence. No shared selector used elsewhere (`.situation-card`, `.popular-card`, `.panel`, `.topbar`, `.site-footer`, etc.) was touched. Verified the homepage now visually reads as the same card family as `/start-here/` (16px radius matches exactly) without becoming a literal clone, all three Explore buttons remain equal-sized, Move to Spain still links to `/start-here/`, and Vacation/Live behavior is unchanged. No indexing changes, no redirects, no legacy migration, no additional pages published.

**Sprint 104 update — Homepage card coherence preview QA passed (2026-07-04):** PR #24's Netlify deploy preview was checked at 1280px/390px with no issues found. Confirmed the homepage cards' 16px radius matches `/start-here/`'s Guide System cards exactly, CTAs remain equal-sized and not visually aggressive, and the homepage still reads as a homepage (video-backed cards + wizard) rather than a guide-page clone. Regression check on `/start-here/`, `/the-spain-files/`, `/support/`, and both sampled legacy `/guides/*` pages found no side effects. Launch safety verified directly against the live preview, matching `main` exactly outside the styling change. PR #24 remains unmerged, pending a merge decision.

**Sprint 105 update — Homepage card coherence pass launched (2026-07-04):** PR #24 was squash-merged into `main` (commit `4f1b088`) and verified live on production. Phase 1 of this audit's implementation-phase plan (Step 4) is now complete and shipped: the homepage's border-radius drift against Guide System v1 (previously 8px vs. 16px) is closed for the three situation cards. The remaining phases — Phase 2 (legacy `/guides/*` structural fix, the audit's highest-value remaining item), Phase 3 (Vacation/Live landing pages), and Phase 4 (further homepage card redesign) — remain unimplemented and require their own separate scoping and decisions.

**Sprint 107 update — Phase 2 legacy guide structure planned (2026-07-04):** created `docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md`, turning this audit's Phase 2 recommendation (Step 4/Step 6 above) into a concrete plan. Direct inspection corrected this audit's earlier "37 directories" estimate: there are **35 English legacy topics**, each mirrored under `/guides/es/`, for **70 live indexed URLs total** — all confirmed still returning `200` and still relying entirely on client-side `data-guide-id` rendering via `app.js` with no static or `<noscript>` fallback content. The plan recommends starting with a read-only validation/report script (no page changes) before any single-route static-rendering proof of concept. This sprint is planning only: no legacy guide changes, no redirects, no migration, no indexing changes, and no edits to `sitemap.xml`, `search-index.json`, `robots.txt`, `styles.css`, or `app.js`. No PR was opened, no merge was performed.

**Sprint 109 update — Legacy guide audit script prepared (2026-07-04):** built and ran `scripts/audit-legacy-guides.js`, the read-only validation/report script recommended above. Findings, recorded in `docs/LEGACY_GUIDE_AUDIT_REPORT.md` and `reports/legacy-guide-audit.json`, confirm the 70-URL inventory (35 English, 35 Spanish) with complete `<head>` metadata coverage (title, description, canonical, hreflang, `data-guide-id`) on every page, but zero pages with static guide content in `<body>` and zero pages with a `<noscript>` fallback — quantifying, rather than just describing, the structural gap. No legacy guide page, `app.js`, or `styles.css` was changed; no redirects, migration, or indexing changes were made. PR pending; not yet merged.

**Sprint 110 update — Legacy guide audit script launched (2026-07-04):** PR #27 was squash-merged into `main` (commit `c3b48b1`) and verified on production: homepage, both sampled legacy guide topics (`banking`, `eu-registration`) in English and Spanish, `/start-here/`, `/the-spain-files/`, and `/support/` all return `200`. All 5 launched pages remain `index, follow`; sampled drafts remain `noindex, nofollow`; `sitemap.xml`, `search-index.json`, `robots.txt`, `styles.css`, and `app.js` are unchanged. Rerunning `node scripts/audit-legacy-guides.js` on updated `main` exits `0` and reproduces identical findings. No legacy guide migration has happened.

**Sprint 112 update — legacy static rendering POC planned (2026-07-04):** created `docs/LEGACY_STATIC_RENDERING_POC_PLAN.md`, planning the single-route static-rendering proof of concept recommended by the audit script's findings. Recommended candidate: `/guides/job-search/` plus its Spanish mirror `/guides/es/job-search/` (no Guide System v1 overlap, rich existing bilingual content already in `app.js`'s `directRoadmapFor()`). Recommended implementation method: a hybrid approach (static body content plus the existing JS enhancement left in place, avoiding double-rendering) built via a small generator script, not hand-copied HTML. Planning only: no legacy guide page, `app.js`, or `styles.css` was changed; no redirects, migration, or indexing changes were made. No PR was opened, no merge was performed.

**Sprint 114 update — job-search static rendering POC implemented (2026-07-04):** the recommended candidate was built on branch `visual-coherence/job-search-static-poc` via `scripts/render-legacy-static-poc.js`, which rewrites only the `#wizardResult` placeholder in `guides/job-search/index.html` and `guides/es/job-search/index.html` with real static guide content (title, purpose, next steps, 8 official job-portal links, disclaimer), transcribed directly from `app.js`'s existing `directRoadmapFor()` data. `app.js` and `styles.css` were not touched — the static markup reuses classes already styled for this exact content. `scripts/audit-legacy-guides.js` was corrected to detect the `#wizardResult` placeholder directly (its previous meta-description-substring heuristic would have missed this change); it now reports 2/70 pages with static body content, 68/70 unchanged. No redirects, migration, or indexing changes were made; no other legacy page was touched. Preview QA is required before merge.

**Sprint 115 update — job-search static rendering POC preview QA passed (2026-07-04):** PR #30 (commit `970a330`) was checked on `https://deploy-preview-30--iberigo.netlify.app`. Static content confirmed present in raw HTML for both languages, JS-enabled rendering confirmed no duplication (exactly one title/list/disclaimer and all 8 job-portal links after `app.js` runs), all metadata/sitemap/search-index/robots.txt/app.js/styles.css confirmed byte-identical to `main`, and `node scripts/audit-legacy-guides.js` confirmed the expected 2/70 result with no findings weakened. No issues found, no fixes needed. PR remains unmerged.

**Sprint 116 update — job-search static rendering POC launched (2026-07-04):** PR #30 was squash-merged into `main` (merge commit `63afe68`) and verified on production. `/guides/job-search/` and `/guides/es/job-search/` now return `200` with meaningful static guide body content in raw HTML, unchanged canonical/hreflang metadata, and no duplicate guide content after JavaScript runs. Regression routes (`/`, `/start-here/`, `/the-spain-files/`, `/support/`, `/guides/banking/`, `/guides/es/banking/`, `/guides/eu-registration/`, `/guides/es/eu-registration/`) all returned `200`. The legacy audit remains exactly 2/70 static body content routes, job-search EN+ES only; no full legacy migration happened, no additional pages were published, no redirects were added, and `app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, and `robots.txt` were unchanged.

**Sprint 118 update — legacy static rollout planned (2026-07-04):** created `docs/LEGACY_STATIC_RENDERING_ROLLOUT_PLAN.md` to plan expansion beyond the job-search proof of concept. The plan recommends a staged path: one more low-risk EN+ES pair (`phone`) first, then small batches only after preview QA proves the renderer can generalize safely. It explicitly defers overlapping Guide System topics and legal/tax/immigration-sensitive routes until separate content and canonical decisions. Planning only: the live baseline remains 2/70 static-body-content routes, no additional static legacy pages were added, and no `app.js`, `styles.css`, redirect, sitemap, search-index, robots, publication, or full-migration changes were made.

**Sprint 120 update — phone static rendering POC prepared (2026-07-04):** the planned one-pair follow-up was implemented on `visual-coherence/phone-static-poc`. `/guides/phone/` and `/guides/es/phone/` now include static guide body content in raw HTML, generated from the existing legacy phone-route data and provider link metadata. The renderer is now selected-route/allowlist based, with `job-search` preserved as the launched POC and `phone` selected for this sprint only. `node scripts/audit-legacy-guides.js` now reports exactly 4/70 static-body-content routes (`job-search` EN+ES plus `phone` EN+ES), with 66/70 unchanged. No `app.js`, `styles.css`, sitemap, search-index, robots, redirects, full legacy migration, or additional publication changes were made. Preview QA is required before merge.

**Sprint 121 update — phone static rendering POC preview QA passed (2026-07-04):** PR #33 passed preview QA on `https://deploy-preview-33--iberigo.netlify.app`. Raw HTML, JS-enabled rendering, metadata preservation, audit output, renderer scope, and regression routes all checked cleanly. The Start Here CTA alignment remains stable, the homepage/The Spain Files/support render normally, job-search remains stable, banking routes were not accidentally static-rendered, and protected files (`app.js`, `styles.css`, `sitemap.xml`, `search-index.json`, `robots.txt`) remain unchanged. Status: **Phone static rendering POC preview QA passed — merge pending**.

**Sprint 122 update — phone static rendering POC launched (2026-07-04):** PR #33 was squash-merged into `main` (merge commit `fac61c9660dd908d41bf4ae68dfb8d83237ac1f7`) and verified on production. `/guides/phone/` and `/guides/es/phone/` now return `200` with meaningful static guide body content in raw HTML and no JS duplication. `/guides/job-search/` and `/guides/es/job-search/` remain stable. Regression routes returned `200`, and the audit remains exactly 4/70 static-body-content routes. No full legacy migration, no additional publication, no redirects, and no `app.js`, `styles.css`, sitemap, search-index, or robots changes happened.

## Why this exists

Group 1 (`/start-here/` and four guide pages) launched using a new visual language — the **IberiGo Guide System v1** (`docs/IBERIGO_GUIDE_SYSTEM_V1.md`) — while the rest of the public site (homepage, Vacation/Live sections, The Spain Files, Donate, and all legacy `/guides/*` pages) still uses the original, older design system. PR #19 proposes pointing the homepage's "Move to Spain" card at `/start-here/`, which raises a fair question before merging: does the site feel like one coherent brand once a visitor moves from the homepage into a Guide System v1 page? This audit answers that question and proposes a path forward. It does not implement anything.

---

## Step 1 — Public route inventory

| Section | Route(s) | Indexable? | Design system |
|---|---|---|---|
| Homepage | `/` | Yes (in sitemap) | Original (situation cards + wizard SPA) |
| Move to Spain (entry) | Homepage "Move to Spain" card → wizard preset `moving`, or (via PR #19) → `/start-here/` | N/A (in-page interaction / link) | Original wizard, or new Guide System if PR #19 merges |
| Vacation in Spain | Homepage "Vacation" card → wizard preset `vacation`; content surfaced via legacy `/guides/vacation-*` pages | Legacy pages: yes (in sitemap) | Original (wizard SPA shell) |
| Live in Spain | Homepage "Live" card → wizard preset `living`; content surfaced via legacy `/guides/{banking,taxes,social-security,...}` pages, **plus** the new `/living-in-spain/opening-a-bank-account/` | Legacy: yes; new page: yes (launched) | Legacy: original wizard SPA. New: Guide System v1 |
| The Spain Files | `/the-spain-files/`, `/the-spain-files/es/`, `/the-spain-files/nie-spain/`, `/the-spain-files/como-obtener-nie-en-espana/`, `/the-spain-files/padron-torrevieja/`, `/the-spain-files/es/padron-torrevieja/` | Yes (all in sitemap) | **Third, separate** magazine-style system (scoped inline `<style>` with `sf-*` classes: featured articles, 3-col grid, custom SVG icons) |
| Donate | `/support/index.html` | **No** — not present in `sitemap.xml` (only page in this inventory that's live but unlisted) | Original (`.panel` site-chrome, shares header/footer/typography with homepage; own content layout, no separate visual system) |
| Legacy `/guides/*` pages (37 directories: banking, eu-registration, padron, nie, tie, taxes, social-security, digital, vacation-*, driving-licence-exchange, vida-laboral, job-search, phone, renting-home, plus `/guides/es/*` Spanish mirrors) | `/guides/{name}/`, `/guides/es/{name}/` | Yes — all in sitemap, all live | Original. **Each page's static HTML is a byte-for-byte copy of the homepage shell** (situation cards, wizard, documents/sources sections) with only `data-guide-id="{name}"` differing; `app.js` reads that attribute client-side to auto-populate the wizard-result card for that specific guide. There is no guide-specific static layout at all in the legacy system. |
| New Guide System v1 pages (Group 1, launched) | `/start-here/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/settling-into-spain/`, `/living-in-spain/opening-a-bank-account/` | Yes (launched, `index, follow`, in sitemap) | **Guide System v1** — static generated HTML per page (`scripts/guide-components.js` + `scripts/generate-guide-system.js`), hero + TOC + card grid + trust/disclaimer block, scoped inline `guideCss()` |
| Draft Guide System v1 pages (not yet published) | 16 pages under `/moving-to-spain/*` and `/living-in-spain/*` (EU roadmap, healthcare, padrón, taxes, driving, Non-EU batch, etc.) | No — `noindex, nofollow`, not in sitemap | Guide System v1 (same as above, unpublished) |
| Search | `/search/` | No — `noindex, nofollow` (0 guides indexed while everything is draft, by design) | Guide System v1 shell (generated via `search-components.js`) |
| 404 | `/404.html` | N/A | Original |

**Summary of design systems currently live on the public site: three.**
1. **Original / homepage system** (`styles.css`, `.panel`/`.situation-card`/wizard) — homepage, all 37 legacy `/guides/*` pages, Donate.
2. **The Spain Files system** — its own scoped inline styles (`sf-*` classes), used only by the 5 Spain Files pages.
3. **Guide System v1** — the 5 launched pages (plus 16 unpublished drafts and `/search/`).

---

## Step 2 — Visual system comparison

Using the Guide System v1 pages as the reference point:

| Attribute | Original (homepage / legacy `/guides/*`) | The Spain Files | Guide System v1 |
|---|---|---|---|
| Hero layout | Video-backed 3-card grid ("situation cards") + interactive wizard below | Two-column "featured article" cards with custom line-art SVGs | Two-column hero: heading/intro + a calm summary aside card |
| Page width | `.panel` full-bleed within `.app-shell` container | Same `.app-shell`/`.panel` container | `.guide-main { width: min(1080px, calc(100% - 32px)) }` — narrower, article-like measure |
| Typography | Shared `--body-font`/`--display-font` from `styles.css` | Same shared fonts, smaller custom sizes in `sf-*` rules (13–15px cards) | Same shared fonts from `styles.css`; larger, calmer hero H1 (`clamp(2.1rem, 5vw, 3.4rem)`) |
| Card style | `.situation-card`/`.popular-card`: **`border-radius: 8px`**, video/photo-backed, semi-transparent white | `.sf-card`: **`border-radius: 14px`**, plain white, text-only | `.guide-card`/`.guide-hero-card`/`.guide-section`: **`border-radius: 16px`**, translucent white, soft shadow |
| Button style | Pill CTAs via `.primary-action`/`.secondary-action`/`.situation-card button` (shared, `--button-bg: #9a4632`) | Plain text arrow links ("Read the guide →"), no button chrome | `.guide-button`: pill, solid `#a64a36` fill, same visual weight as `.primary-action` |
| Spacing | `--space-phi-*` golden-ratio spacing scale | Fixed rem/px values, not tied to the phi scale | `clamp()`-based fluid spacing, not tied to the phi scale either |
| Border radius | **8px** (base `.panel`/card token) | **14px** | **16px** |
| Color use | `--red: #c43b2f`, `--button-bg: #9a4632` (terracotta/rust family) | `--red` reused for one icon color, `#C8783A` tag color, mostly black/grey text | `#a64a36` accent, `rgba(166,74,54,*)` borders/backgrounds — same rust family, slightly warmer |
| Navigation/header | Shared `.topbar` across all three systems — **this is already consistent** | Same | Same |
| Footer | Shared `.site-footer` across all three systems — **this is already consistent** | Same | Same |
| Mobile layout | Cards stack, wizard becomes single-column | 3-col grid → likely 1-col (no explicit breakpoint verified in this audit) | Explicit, tested breakpoints at 1040/900/640px (verified in Sprints 68–73 visual QA) |
| CTA tone | "Explore" (generic, action-oriented) | "Read the guide →" (editorial/blog tone) | Descriptive labels (e.g., "View the EU Citizen Roadmap") — Guide System v1 explicitly bans generic "Read more"-style CTAs |
| Trust/disclaimer blocks | One shared `.disclaimer` paragraph in the "Official sources" section; one `.hero-disclaimer` line under the homepage cards | No visible disclaimer block found on Spain Files pages in this audit | Dedicated, calm trust/disclaimer block per page (Sprint 80–82 work), official-source cards styled as "reference not certification" |
| Search placement | No dedicated search entry point in the original system's visible chrome (site-wide `/search/` page exists but isn't linked from the header nav) | Same | Same — `/search/` isn't linked from the shared `.topbar` in any system, so this is a sitewide gap, not a Guide-System-specific one |
| Same brand? | Yes, recognizably — same header/footer/wordmark/color family everywhere. The differences are in card geometry, spacing scale, and content pacing, not in colors, fonts, or chrome. |

**Conclusion:** the three systems are not wildly divergent — they share fonts, header, footer, and a similar accent color. The most concrete, measurable mismatch is **border-radius drift (8px → 14px → 16px across the three systems)**, plus the fact that the legacy `/guides/*` pages don't have their own static layout at all (they're homepage clones driven by client-side JS), which is a structural difference, not just a styling one.

---

## Step 3 — Inconsistency risks

Ranked by how likely a visitor is to notice, most to least:

1. **Legacy `/guides/*` pages have no static per-guide layout.** A visitor clicking through from Google to `/guides/banking/` sees the *homepage* (hero cards + wizard) with the actual banking content only appearing after client-side JS runs and auto-populates a wizard-result card. This is the single biggest structural gap between "legacy" and "new" — it's not a styling mismatch, it's an entirely different content-delivery mechanism. Any visitor who disables JS, or whose JS is slow to load, effectively never sees the banking guide at all on that route.
2. **Vacation in Spain and Live in Spain have no dedicated landing pages at all** — "Vacation" and "Live" are just wizard presets on the homepage that funnel into the same legacy `/guides/*` shell described above. They will feel like "a different site" primarily because they *are* a different, older mechanism, not because of a color or radius mismatch.
3. **The Spain Files is a genuinely separate visual sub-system** (its own inline `<style>` block, its own card/typography conventions, editorial/blog tone). This is arguably fine as an intentional "magazine" sub-brand, but it currently shares no visual vocabulary (card radius, CTA style) with either the homepage or Guide System v1.
4. **Border-radius drift (8px/14px/16px)** is real but minor — a careful eye would notice cards don't quite match, but it's not likely to break "same brand" perception on its own.
5. **CTA tone**: "Explore" (homepage) vs. "Read the guide →" (Spain Files) vs. descriptive Guide System v1 labels are three different conventions. Low risk, easy to leave as-is short-term since each fits its section's purpose reasonably well.
6. **Trust/disclaimer presentation** differs in prominence and wording between systems — moderate risk, since consistent trust signaling matters for an owner-reviewed practical-information site, but not urgent enough to block PR #19.
7. **Donate page** is visually fine — it already reuses the base `.panel` system faithfully. Low risk. (Separately noted: it's the one live page missing from `sitemap.xml`; that's an indexing question, not visual coherence, and out of scope here.)
8. **Is PR #19 "enough or too small"?** PR #19 (pointing the homepage "Move to Spain" card at `/start-here/`) is a *correct, low-risk, and orthogonal* change — it doesn't create a new inconsistency, it just changes where an existing homepage card's CTA points. All of the inconsistencies above (1–7) already exist today, independent of whether PR #19 merges. Blocking PR #19 on a full sitewide redesign would conflate a small navigation fix with a much larger, separate visual-unification project.

---

## Step 4 — Recommended visual unification strategy

**Principle: coherent, not cloned.** The Spain Files' magazine tone and the Guide System's calm/practical tone can both be "IberiGo" without being visually identical — the goal is shared vocabulary (radius, spacing scale, button conventions, trust-block presentation), not a single template everywhere.

### Pages to update first (highest visitor-facing impact, lowest technical risk)
- **Nothing needs to change to safely merge PR #19.** It's a same-system, same-radius, same-button-class change (`.primary-action` already exists and is shared).
- If/when a unification project starts, the **highest-leverage first step** is giving the legacy `/guides/*` pages a real static Guide-System-style layout for their content (or at minimum, server/build-time rendering of the guide content instead of relying on client-side `data-guide-id` population) — this fixes the structural/SEO gap (#1 above), which matters more than any color or radius tweak.

### Pages to leave alone for now
- **The Spain Files** — it's a deliberately distinct editorial sub-section; forcing it into Guide System v1 cards risks flattening its magazine identity for no clear benefit. Revisit only as part of a deliberate rebrand decision, not as a side effect of Group 1's rollout.
- **Donate** — already visually coherent with the base system; no action needed.
- **The 16 unpublished draft Guide System v1 pages** — already built to the target system; nothing to do until their own publication decisions are made.

### Open questions requiring a decision (not answered by this audit)
- Should the **homepage's three situation cards** eventually adopt Guide System v1's 16px radius / card conventions? This is a bigger, riskier change (touches `styles.css`, affects every page since the homepage cards use the shared `.situation-card` class) and should be its own staged decision, not bundled into Group 1 discovery work.
- Should **Vacation** and **Live in Spain** get dedicated Guide-System-style landing pages (mirroring `/start-here/`'s pattern) instead of routing straight into the legacy wizard? This would meaningfully improve #2 above but is a content-creation project, not a styling one — it needs its own scoping, not a quick CSS pass.
- Should legacy `/guides/*` pages be migrated to the new structure? This is already tracked as a separate, larger decision in `docs/MIGRATION_PLAN.md` and should stay there rather than being absorbed into this audit.

### PR #19 recommendation
**Merge PR #19 as-is**, once its own preview QA (Sprint 93 process) is complete. It is a small, correct, low-risk fix that does not create or worsen any inconsistency identified in this audit, and none of the inconsistencies found here are new information that should change the PR #19 decision. Treat sitewide visual unification as a separate, later, explicitly-scoped initiative.

### Implementation phases (future, not this sprint)
1. **Phase 0 (this audit):** document current state, no code changes.
2. **Phase 1 (small, safe):** align border-radius tokens where trivially possible using scoped classes (e.g., introduce a shared `--radius-card` custom property used by new components only, without changing existing `.situation-card`/`.sf-card` rules) — additive, not a global rewrite.
3. **Phase 2 (structural, higher risk):** give legacy `/guides/*` pages real static content instead of the client-side `data-guide-id` shell — the highest-value fix, but requires careful SEO/regression testing since it touches 37 live, indexed pages.
4. **Phase 3 (content, not styling):** decide on dedicated Vacation/Live landing pages using the Guide System pattern, if desired.
5. **Phase 4 (optional/deliberate):** decide whether homepage situation cards should adopt Guide System v1 card conventions — a branding decision, not a bug fix.

### Risks of touching `styles.css`
- `styles.css` is shared by **every** page on the site, including all 37 live legacy guides, the homepage, The Spain Files, Donate, and (via the base `.panel`/typography rules) the Guide System v1 pages too. Any change to shared selectors (`.panel`, `.situation-card`, `.primary-action`, `.topbar`, `.site-footer`) is a sitewide, high-blast-radius change and must be scoped, tested at 390px/1280px across a representative sample of *all three* systems, and reviewed with the same rigor as a launch PR — never as an incidental part of a discovery-link fix.
- The safest pattern already established in this project (Sprint 67's CSS scope audit) is: **new visual work goes in scoped, page-specific inline styles** (like Guide System v1's `guideCss()`), not into shared `styles.css` rules, unless a change is deliberately meant to be sitewide and has been explicitly scoped and approved as such.

### Safest implementation approach (summary)
- Small, staged PRs, one system/decision at a time.
- Never bundle a structural change (e.g., legacy page rendering) with a styling change.
- Prefer additive, scoped classes over edits to shared `styles.css` selectors.
- Keep SEO/indexing state (`status`, `robots`, `sitemap.xml`) completely unchanged during any visual-only work, unless a specific sprint explicitly decides to change it.
- Do not let visual unification block already-approved, narrowly-scoped fixes like PR #19.

---

## What must not change yet

- No additional draft pages are published.
- No `noindex, nofollow` is removed from any non-selected draft page.
- No redirects are added.
- No legacy guide is migrated.
- No global CSS (`styles.css`) changes are made.
- PR #19 is neither merged nor closed as a result of this audit.

---

## Confirmation

- This document is the only file created in this sprint (plus incidental updates to `docs/BACKLOG.md` and `docs/PUBLISH_READINESS_AUDIT.md` recording that this audit happened).
- No page's `status`, `robots` metadata, `sitemap.xml`, `search-index.json`, or `robots.txt` was touched.
- No redirects were added, no legacy guide was migrated.
- PR #19 remains open and unmerged.

---

## Official government link visual consistency prepared — preview QA pending (2026-07-12)

A separate, narrowly-scoped pass at official-source/government link visual consistency, done after the Guide System reached 24 live/indexable pages (12 EN/ES pairs, sitemap 101 URLs, search-index 24 entries) with the route roadmap family launched.

**Audit findings:** three distinct visual variants of official-source links existed sitewide:
1. **Guide System's `OfficialSources()` component** (`scripts/guide-components.js`) — already a single, well-designed, consistent pattern used across all 24 launched pages and the still-noindex Guide System drafts: accent-colored `guide-source-card` cards with a category badge (initials), category tag, and localized "Fuentes oficiales"/"Official Sources", "Estado de la fuente"/"Source status" labels. Confirmed via direct inspection that every official-source link inside `scripts/generate-guide-system.js` flows exclusively through this one component — zero hardcoded government URLs found rendered outside it.
2. **Legacy `/guides/*` wizard-result system** (`app.js` + `styles.css`'s `.gov-link*` classes) — a separate, mature, already-vetted government-link accent system (general/fee/social/health/eu variants with badges/bars/stars) used across the homepage routing wizard's results and legacy guide pages. Left untouched: touching it would mean editing `app.js` and risk the legacy guide rendering the project has repeatedly committed not to migrate or restructure.
3. **Homepage `#sources` panel** (`index.html`) — a hand-authored "Official sources" section (shown after the routing wizard completes) using plain pill-button links (`.source-list a`) styled identically to ordinary navigation links, with **no official-source visual signal at all** — no accent color, no category distinction. This was the one genuine inconsistency worth fixing.

**Canonical pattern applied:** rather than build a fourth system, the homepage panel now reuses the exact same accent-color language as the Guide System's `guide-source-card` categories (police `#1d3a5f`, tax `#a25b00`, social-security `#1d5fa4`, eu `#1954a6`, government/default `#aa151b`) via a small, scoped CSS addition (`.source-list a` + `.source--police`/`.source--tax`/`.source--social-security`/`.source--eu` modifier classes), applied as a colored left border on the existing pill shape — visually related to, though not identical to, the full Guide System cards (a compact homepage pill and a full guide-page card are different contexts and don't need byte-identical markup to read as "the same visual language"). Each of the 13 official links in the homepage panel was classified using the same domain logic as `classifySource()` in `scripts/guide-components.js` and given the matching class.

**Files changed:** `styles.css` (narrow, scoped addition — 4 new class-modifier rules plus one base-rule addition, nothing else touched) and `index.html` (added a `class="source--{category}"` attribute to 5 of the 13 official `<a>` tags; the other 8 already default to the government accent, so no class was needed).

**`app.js`:** unchanged. **Guide System components:** unchanged (`scripts/guide-components.js`, `scripts/generate-guide-system.js` untouched — the Guide System's official-source cards were already the consistent, canonical pattern).

**Confirmed no indexing/sitemap/search-index/hreflang changes:** `sitemap.xml` and `search-index.json` regenerate byte-identical to `main` (`git diff --stat` empty for both); `robots.txt` unchanged; all 24 launched pages remain `index, follow`; hreflang and language-switcher behavior untouched (neither `guide-components.js` nor `generate-guide-system.js` were edited).

**Confirmed no redirects or legacy migration:** `guides/` directory untouched; no URL changed except none were changed at all (no broken official URLs were found during the audit, so this task's "fix obvious broken URLs" allowance wasn't needed).

Status: **Official government link visual consistency prepared — preview QA pending**. Not yet merged.

---

## Live in Spain official-link styling aligned — preview QA pending (2026-07-12)

This targeted follow-up revisits the legacy/client-rendered `/guides/*` result system now that the Living in Spain topics have been fully structured in `app.js`.

**Reference style identified:** the canonical client-rendered Move to Spain official-link pattern is `app.js`'s `renderRouteLinks()` output using `.gov-link`, `.gov-link-badge`, `.gov-link-bars` / `.gov-link-stars`, `.gov-link-copy`, and variant classes such as `.gov-link--general`, `.gov-link--fee`, `.gov-link--social`, `.gov-link--health`, and `.gov-link--eu`, styled in `styles.css`. It uses a white card, colored left accent bar, small Spain/EU badge mark, localized label/subtitle text, and the existing `.route-links-note .province-links a:hover` / `:focus-visible` behavior.

**Gap found:** the style existed, but some Live in Spain official links did not reach it. The renderer checked branded branches such as `jobs-*` before official-link classification, so SEPE/Empléate/EURES could render as generic job-board cards. Regional health-card URLs were also missing from the official-domain list, so they could fall back to ordinary pill links rather than health-accented official cards.

**Fix applied:** `renderRouteLinks()` now computes official-link metadata before branded/private link branches. Added focused official metadata/domains for Live in Spain official sources: SEPE/Empléate/EURES, Agencia Tributaria tax links, and regional health-card pages for Valencia, Madrid, Andalusia, Catalonia, and Murcia. Non-official Live in Spain links (banks, telecom providers, rental portals, insurers, private job boards) keep their existing branded classes.

**Files changed:** `app.js` only. `styles.css` was not changed because the existing `.gov-link` CSS already provides the desired visual pattern, hover, focus-visible, and mobile behavior.

**Safety confirmations:** no link destination changed; no route, redirect, indexing, sitemap, search-index, robots, hreflang, language-switcher, Guide System launch-state, or legacy guide HTML change was made. `sitemap.xml` remains 101 `<loc>` entries, `search-index.json` remains 24 entries, all 24 launched Guide System pages remain `index, follow`, noindex surfaces remain `noindex, nofollow`, and the legacy audit remains exactly 4/70 static-body-content routes.

Status: **Live in Spain official-link styling aligned — preview QA pending**. Not yet merged.

---

## Sitewide link visual consistency prepared — preview QA pending (2026-07-12)

A broader pass covering **all** link roles sitewide, not just official/government links (see the previous section for that narrower pass).

### Link audit, grouped by role

| Role | Where | Current state |
|---|---|---|
| 1. Navigation links | `nav a` (site-wide header) | Already well-designed: pill shape, distinct hover/focus-visible state, `aria-current="page"` active state. No change needed. |
| 2. Inline content links | `<a>` inside `<p>`/list content in Guide System sections (`.guide-section p a`, `.guide-box p a`, etc.) | **Gap found.** The only global rule is `a { color: inherit; }` with no site-wide underline reset — meaning these links rendered in the *exact same muted ink color as surrounding paragraph text* (`rgba(27,32,48,0.72)`), with only the unstyled browser-default underline as a signal, no hover state, no focus-visible outline. This is the single biggest, most legitimate inconsistency found — every one of the 33+ generated Guide System pages has this pattern repeated throughout its prose. |
| 3. CTA/button links | `.guide-button` (Guide System), `.helper-actions a` (legacy wizard) | Already well-designed pill buttons with hover/focus/disabled states. Intentionally different from role 2 (that's correct — they should look like buttons, not text links). No change needed. |
| 4. Card links | `.guide-info-card h3 a`, `.guide-source-card h3 a` (card titles that are links) | Already correctly `color: inherit; text-decoration: none` — the card itself provides the visual frame, and the actual clickable CTA is the `.guide-button` inside. No change needed; explicitly reasserted (see below) so the new inline-link rule can't accidentally leak into card headings. |
| 5. Official/source links | `.guide-source-card` (Guide System), `.source-list a` (homepage), `.province-links a.gov-link*` (legacy) | Already unified across two prior sprints (see above). **Gap found:** the homepage's `.source-list a` and the legacy `.province-links` had inconsistent hover/focus-visible coverage — `.source-list a` had none at all. Interesting finding: the legacy `.gov-link` system independently arrived at the same "colored left accent bar" visual idea as the Guide System's `guide-source-card` and the homepage's `.source-list` — all three official-link systems already converge on the same underlying concept, just implemented three times. Left the legacy system's markup/structure untouched (per the established "don't restructure legacy" constraint) — it already has its own `:focus-visible` rule and didn't need one added. |
| 6. Language switcher | `.language-switcher button` | Functional, well laid out. **Gap found:** no `:focus-visible` state — relied on browser default only, inconsistent with every other interactive element's brand-colored focus ring. |
| 7. Legacy guide generated links | `.province-links a`, `.gov-link`, `.bank-link`, `.rent-link`, `.provider-link`, `.jobs-link`, `.insurance-link`, `.travel-link`, `.flight-link`, `.hotel-link`, `.car-link`, `.stay-link` (all in `app.js`-driven wizard results) | Already a mature, well-designed, previously-vetted system (button-shaped links with category-specific accent bars, already has hover/focus-visible). Left untouched — restructuring it would require `app.js` changes and touch legacy-guide-adjacent rendering, which the project has repeatedly committed not to do. |
| 8. Footer/support links | `.site-footer a` | **Gap found:** color was set (brand red `#8f2f28`) but no hover or focus-visible state — relied on browser default only. |

### Canonical system chosen

Rather than introduce new colors or a new visual language, every fix reuses colors and patterns **already established elsewhere on the site**:

- **Inline content links** (the main fix): brand accent `#a64a36` (the same color used by the Guide System's kicker text, breadcrumbs, buttons, and TOC active state) with underline, a slightly darker `#8f3e2c` hover (same as `.guide-button:hover`), and the same `outline: 3px solid rgba(166, 74, 54, 0.28)` focus-visible ring used by `.guide-button`, `.guide-toc a`, and `.guide-breadcrumbs a`. This makes inline links visually "the same family" as every other brand-colored interactive element on a Guide System page, instead of invisible.
- **Homepage source pills / footer / language switcher**: added the missing hover/focus-visible states using the same `rgba(166, 74, 54, 0.28)` focus-ring color already used throughout, so keyboard/focus behavior is consistent everywhere, not just on Guide System pages.

### Files changed

- `scripts/guide-components.js` (`guideCss()`) — 4 new lines: inline-link color/underline, hover, focus-visible, and an explicit re-assertion that card-title links stay `color: inherit`.
- `styles.css` — 3 small additions: `.source-list a` hover/focus-visible, `.site-footer a` hover/focus-visible, `.language-switcher button:focus-visible`. Nothing else touched.
- `scripts/generate-guide-system.js` — **not edited**; all 33 generated pages changed only because `guideCss()` is inlined per-page, so regenerating picked up the new CSS automatically. No manual HTML edits.

**`app.js`: unchanged.** Legacy `.province-links`/`.gov-link*` styling: **not touched** — already coherent and already had its own focus-visible state.

### Confirmation: no href/routing changes

Verified via diff that every changed generated page's diff is scoped entirely to the inserted `<style>` block — zero `href` attributes changed anywhere (`git diff -- <any changed page> | grep href` returns nothing). No broken links were found during the audit, so no URL was changed for any reason.

### Confirmation: no indexing/sitemap/search-index/hreflang changes

`sitemap.xml` and `search-index.json` regenerate byte-identical to `main`; `robots.txt` unchanged; all 24 launched pages remain `index, follow`; hreflang tag count unchanged (3 per launched page); language-switcher `data-lang-href` behavior untouched (its logic lives in `GuideLayout`'s inline script, which was not edited — only the surrounding CSS was).

Status: **Sitewide link visual consistency prepared — preview QA pending**. Not yet merged.
