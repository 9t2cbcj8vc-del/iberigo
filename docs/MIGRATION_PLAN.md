# IberiGo Migration Plan — Legacy Guides vs. New Core Structure

**Status:** planning only. No redirects, rewrites, or removals have been executed. This document records decisions to revisit once PR #5 is merged and approved.

The new core route structure under `/moving-to-spain/`, `/living-in-spain/` and `/start-here/` is general, Spain-wide guidance. Several existing live pages under `/guides/` and `/the-spain-files/` cover overlapping or related topics. Nothing here is executed yet — this is the decision record for a later migration sprint.

| Legacy page (live) | New core page (draft) | Overlap | Decision |
|---|---|---|---|
| `/the-spain-files/padron-torrevieja/` | `/moving-to-spain/registering-on-the-padron/` | Low — legacy page is Torrevieja-specific narrative content; new page is general Spain-wide padrón guidance | **Rewrite as local/specific guide later.** Keep Torrevieja as local, experience-based content under The Spain Files; cross-link from the general padrón guide once both are live. |
| `/guides/padron/` | `/moving-to-spain/registering-on-the-padron/` | High — both are general padrón guides at different URLs | **Needs review.** Two general padrón pages would compete for the same intent once both are indexable. Likely outcome is redirect or consolidation, but requires a content-quality comparison first. |
| `/guides/vida-laboral/` | `/living-in-spain/social-security/` | Low-medium — vida laboral covers one specific document; new page is a general Social Security overview | **Keep for now.** Likely becomes a linked child topic under the new Social Security guide rather than being merged directly into it. |
| `/guides/social-security/` | `/living-in-spain/social-security/` | High — both are general Social Security intros at different URLs | **Needs review.** Same competing-intent issue as padrón above. |
| `/guides/taxes/` | `/living-in-spain/taxes/` | High — both are general tax intros at different URLs | **Needs review.** |
| `/guides/banking/` | `/living-in-spain/opening-a-bank-account/` | High — both are general bank-account intros at different URLs | **Needs review.** |
| `/guides/digital/` | `/living-in-spain/digital-certificate/` | High — both cover Digital Certificate / Cl@ve at different URLs | **Needs review.** |
| `/guides/driving-licence-exchange/` | `/living-in-spain/driving/` | Medium-high — legacy page covers licence exchange only; new page covers exchange + renewal + insurance + common mistakes (a superset) | **Migrate later.** Once approved, the legacy page likely redirects to or is folded into the new one. |
| `/guides/eu-registration/` (live, indexed, hreflang en/es) | `/moving-to-spain/eu-registration/` (draft, noindex — moved off `/guides/eu-registration/` in Sprint 34 to stop the direct overwrite) | Direct topical duplicate, now at different URLs after the Sprint 34 fix | **Redirect later.** Once the draft is reviewed and approved, redirect `/guides/eu-registration/` → `/moving-to-spain/eu-registration/` (or vice versa) and restore a single hreflang-paired en/es page. Do not merge the draft back onto the live URL without this redirect plan in place. |

## Notes for the eventual migration sprint

- None of the "Needs review" rows are urgent merge blockers for PR #5 itself — they're duplicate-content questions that only matter once the new pages go live/indexable.
- Any redirect must preserve the existing `hreflang` en/es pairing where one exists (currently only `/guides/eu-registration/` ↔ `/guides/es/eu-registration/`).
- The Spanish-language versions of the new core guides don't exist yet (see `docs/BACKLOG.md`) — factor that into any redirect decision, since redirecting a legacy page that has an `es` variant to a new page that doesn't yet have one would be a regression.
- Recommend doing this as its own sprint, after editorial/legal review of the new content, not bundled into PR #5's merge.
