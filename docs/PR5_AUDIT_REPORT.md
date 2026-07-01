# PR #5 Audit Report

**Date:** 2026-07-01
**Branch:** `feature/core-guides`
**PR:** [#5 — "Add core guide draft frameworks"](https://github.com/9t2cbcj8vc-del/iberigo/pull/5) (draft, open)
**Preview URL:** https://deploy-preview-5--iberigo.netlify.app
**Merge status:** No merge performed. Main and production homepage untouched. Nothing published.

---

## Executive summary

PR #5's 13 net-new draft pages (Start Here, EU Citizen Roadmap, Settling In, Documents Checklist, Finding Accommodation, Padrón, Healthcare, Bank Account, Digital Certificate, Social Security, Taxes, Driving Licence, Search) are content-complete, correctly `noindex,nofollow`, pass build/metadata/link validation, and follow the editorial rules (no fixed timelines, disclaimers present, EU-registration vs NIE vs TIE table present, etc.).

**One finding changes the risk profile of this PR:** it does not only *add* new routes — it also **completely overwrites `/guides/eu-registration/`, a currently live, indexed production page**, replacing it with new draft content and adding `noindex,nofollow`. This is the only existing live file among the 13 routes that was rewritten in place (confirmed via diff — all other pre-existing `guides/*` files are byte-identical to `main` apart from the earlier Donate-label commit). If PR #5 is merged as-is, this page would silently drop out of search indexing and lose its current content and hreflang pairing with the Spanish version, which is unchanged.

The PR currently also has a **real merge conflict with `main`** on that same file (GitHub reports `mergeable: CONFLICTING`), caused by both branches independently editing it after they diverged.

No code is broken. The blockers are content/URL-strategy decisions, not bugs.

---

## Technical status

- **Branch:** `feature/core-guides`
- **Latest commit:** `3a56684` — "Rename Support IberiGo nav/footer links to Donate" (2026-07-01)
- **Files changed vs. `main`:** 96 total — 21 added (13 new guide routes + `search/search.js` + `search-index.json` + 3 generator scripts + 4 `docs/*` files), 75 modified (1 real content rewrite — `guides/eu-registration/index.html` — the other 74 are the earlier Donate nav/footer label change, already superseded on `main` by a separate merged PR)
- **PR mergeability:** `CONFLICTING` — one file (`guides/eu-registration/index.html`) has diverged on both branches since fork point.

### Commands run and results

```
node scripts/generate-guide-system.js
```
```
Validated metadata for 13 guide pages.
Generated 13 guide pages with reusable components.
Generated search index with 0 published guides.
```
Exit code: `0` (pass). Re-running the generator produced a byte-identical working tree (no drift between the generator source and the committed HTML — `git status` showed no changes after running it).

- **Build:** ✅ pass
- **Metadata validation:** ✅ pass (13/13 pages)
- **Broken internal link check:** ✅ pass — no warnings or errors emitted. Note: the check only hard-fails (`process.exitCode = 1`) for pages with `status: "review"` or `"published"`; all 13 pages are `status: "draft"`, so today this check is informational only, not a hard gate. Worth tightening before an eventual merge, but not a current blocker since no pages are marked ready.

---

## Route-by-route audit

| Route | Exists | Content status | Metadata | noindex/nofollow | Internal links | Obvious TODOs | Factual-risk areas | Recommended next action |
|---|---|---|---|---|---|---|---|---|
| `/start-here/` | Yes | Complete | Valid, `status: draft` | ✅ | OK | None (6 "Coming soon" persona cards are intentional, not placeholders) | Low | Ready for editorial sign-off |
| `/moving-to-spain/eu-citizens/` | Yes | Complete, editorially polished (sprint 33) | Valid | ✅ | OK | 4 placeholder official-source URLs | Medium (unverified official links) | Verify/replace source URLs before merge |
| `/moving-to-spain/settling-into-spain/` | Yes | Complete | Valid | ✅ | OK | None | Low | Ready for editorial sign-off |
| `/moving-to-spain/documents-checklist/` | Yes | Complete | Valid | ✅ | OK | 1 dev comment: link to future Non-EU Roadmap | Low | Decide: build the link or drop the comment |
| `/moving-to-spain/finding-accommodation/` | Yes | Complete | Valid | ✅ | OK | None | Low | Ready for editorial sign-off |
| `/moving-to-spain/registering-on-the-padron/` | Yes | Complete, editorially polished | Valid | ✅ | OK | 2 placeholder official-source URLs | Medium | Verify/replace source URLs before merge |
| `/moving-to-spain/healthcare/` | Yes | Complete, editorially polished | Valid | ✅ | OK | 4 placeholder official-source URLs | Medium | Verify/replace source URLs before merge |
| `/guides/eu-registration/` | Yes — **overwrites an existing live page** | Complete, editorially polished (sprint 32). Correct NIE/EU-Registration/TIE comparison table. | Valid | ✅ (new) — **but live version currently has no noindex at all** | OK internally, but strips the `hreflang` alternate tags the live version has | 3 placeholder official-source URLs | **High** — this is a live URL swap, not a new page; see Merge Blockers | **Do not merge until a URL-strategy decision is made** (see below) |
| `/living-in-spain/opening-a-bank-account/` | Yes | Complete | Valid | ✅ | OK | None | Low | Ready for editorial sign-off |
| `/living-in-spain/digital-certificate/` | Yes | Complete, has Digital Certificate vs Cl@ve table | Valid | ✅ | OK | None | Low | Ready for editorial sign-off |
| `/living-in-spain/social-security/` | Yes | Complete | Valid | ✅ | OK | 1 dev comment: future autónomo guide | Low | Decide: build the link or drop the comment |
| `/living-in-spain/taxes/` | Yes | Complete, explicit "not tax advice" disclaimer | Valid | ✅ | OK | None | Low (well-caveated) | Ready for editorial sign-off |
| `/living-in-spain/driving/` | Yes | Complete | Valid | ✅ | OK | 1 dev comment: future car-import guide | Low | Decide: build the link or drop the comment |
| `/search/` | Yes | Functional, but indexes 0 guides (see below) | Valid | ✅ | OK | None | Low | Decide whether draft pages should be searchable in preview |

No page contains lorem ipsum, unfinished sections, or leftover build-system placeholder text (`"Content under editorial review."` only exists in an unused skeleton generator, not in any live page).

---

## Remaining TODOs

1. **7 placeholder official-source URLs** across EU Citizen Roadmap (4), Padrón (2), Healthcare (4 — note some overlap in count above), and EU Registration (3). Each is explicitly labeled in-page ("URL to be verified before publication") — not silently wrong, just unfinished.
2. **3 scoping dev comments** (HTML comments, not visible to readers) flagging future guides not yet built: Non-EU Roadmap link, autónomo/self-employed guide, car-import guide. Need a decision to build them or remove the forward references.
3. **Search index is empty** — `buildSearchIndex()` only indexes `status: "published"` pages; since all 13 are `draft`, `/search/` returns nothing today. Intentional given draft status, but confirm this is the desired preview behavior.
4. **`docs/BACKLOG.md` is stale** — still lists Healthcare as "In Progress" and Social Security/Driving/Accommodation as "Planned" even though all are complete per the sprint log.
5. **Broken-link check is currently non-blocking** for draft-status pages (see Technical status above) — fine today, but should be revisited once any page moves to `review`/`published` status.

No typos, missing metadata fields, or incorrect `noindex` settings were found on any of the 14 audited routes — nothing qualified as a "small, obvious, low-risk fix" under the task's rules, so no changes were made to any file.

---

## Migration notes for existing live guides

Per your instruction, none of the following were touched — this is a report only.

| Live guide (URL) | New PR #5 counterpart | Overlap | Recommendation |
|---|---|---|---|
| `/the-spain-files/padron-torrevieja/` | `/moving-to-spain/registering-on-the-padron/` | Low — old page is Torrevieja-specific narrative content, new page is general Spain-wide guidance | **Rewrite as local/specific guide later.** Matches your stated plan: keep Torrevieja as local content, cross-link from the general padrón guide once merged. |
| `/guides/vida-laboral/` | `/living-in-spain/social-security/` | Low-medium — vida laboral is one specific document; the new page is a general Social Security overview | **Keep as-is for now / migrate later.** Likely becomes a linked child topic under the new Social Security guide rather than being merged into it directly. |
| `/guides/driving-licence-exchange/` | `/living-in-spain/driving/` | **Medium-high** — old page covers licence exchange only; new page covers exchange + renewal + insurance + common mistakes, a superset | **Migrate later.** Once approved, the old page likely redirects to or is folded into the new one — genuine content consolidation decision, not just a URL swap. |
| `/guides/eu-registration/` | `/guides/eu-registration/` (same URL) | **Direct overwrite — same route, same file** | **Unclear — requires an explicit decision, not implicit merge.** This is not "migrate later," it's already positioned to replace the live page the moment PR #5 merges. Needs your explicit call: (a) keep the new draft on a different URL until reviewed, (b) restore the live version's `hreflang`/canonical setup in the new draft before it ever goes live, or (c) something else. Flagging as the top blocker. |
| `/guides/social-security/`, `/guides/padron/`, `/guides/taxes/`, `/guides/banking/`, `/guides/digital/` | `/living-in-spain/social-security/`, `/moving-to-spain/registering-on-the-padron/`, `/living-in-spain/taxes/`, `/living-in-spain/opening-a-bank-account/`, `/living-in-spain/digital-certificate/` | Topical overlap at **different URLs** (not overwritten, confirmed via diff — all 0 lines changed) | **Unclear — needs a decision post-merge.** These are five topics that will exist at two different live URLs simultaneously once PR #5 is live-indexed. Not a merge blocker for PR #5 itself, but a real duplicate-content/cannibalization question for whoever plans the eventual redirect strategy. |

---

## Merge blockers

1. **`/guides/eu-registration/` URL/content decision (highest priority).** PR #5 silently replaces a live, indexed, cross-linked (hreflang en/es) production page with draft `noindex` content and no hreflang tags. This must be resolved deliberately, not merged as a side effect of the rest of the PR.
2. **Merge conflict with `main`** on that same file — needs a rebase/resolution pass regardless of the decision above.
3. **7 placeholder official-source URLs** need real, verified links before any page is considered publication-ready.
4. **3 forward-reference dev comments** need a build-or-drop decision.
5. **Editorial/legal review** of all drafted copy — no code blocker, purely content sign-off.
6. **Five topic-overlap pages** (`padron`, `social-security`, `taxes`, `banking`, `digital`) need a redirect/consolidation plan before (or shortly after) merge, to avoid two live pages competing for the same topic.

---

## Recommended Sprint 34

1. Decide the `/guides/eu-registration/` question explicitly (own line item, not folded into general editorial review).
2. Resolve the PR #5 ↔ `main` merge conflict on that file once the above is decided.
3. Verify and fill in the 7 placeholder official-source URLs.
4. Decide on the 3 flagged future-guide comments (build stub routes or remove the comments).
5. Draft the migration/redirect plan for the five topic-overlap pages and the three explicitly-named legacy guides (Torrevieja padrón, vida laboral, driving licence exchange) — decisions only, no execution yet.
6. Update `docs/BACKLOG.md` to reflect actual completion state.
7. Only after 1–6: begin formal editorial/legal review pass toward an eventual controlled merge.

---

## Confirmation

- No merge to `main` was performed.
- No production homepage changes were made.
- No old live content was removed, redirected, or migrated.
- No `noindex` pages were converted to indexable.
- No large editorial rewrites were made.
- The only actions taken were read-only inspection, running the existing build/validation script, and writing this report.
