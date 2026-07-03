# Guide System v1 Consistency QA

**Date:** 2026-07-03  
**Sprint:** 73  
**Status:** Visual review completed — still not published

This QA pass checked whether the Sprint 72 visual polish works consistently across the full draft guide set, not only the Bank Account page. No page is approved for publication by this document.

## Scope

Checked all 22 draft/noindex surfaces:

| Group | Routes checked |
|---|---|
| Group 1 | `/start-here/`, `/moving-to-spain/documents-checklist/`, `/moving-to-spain/finding-accommodation/`, `/moving-to-spain/settling-into-spain/`, `/living-in-spain/opening-a-bank-account/` |
| EU core | `/moving-to-spain/eu-citizens/`, `/moving-to-spain/eu-registration/`, `/moving-to-spain/registering-on-the-padron/`, `/moving-to-spain/healthcare/` |
| Living in Spain | `/living-in-spain/digital-certificate/`, `/living-in-spain/social-security/`, `/living-in-spain/taxes/`, `/living-in-spain/driving/` |
| Non-EU batch | `/moving-to-spain/non-eu-citizens/`, `/moving-to-spain/family-member-eu-citizen/`, `/moving-to-spain/students/`, `/moving-to-spain/work-in-spain/`, `/moving-to-spain/retire-in-spain/`, `/moving-to-spain/family-reunification/`, `/moving-to-spain/digital-nomad-spain/`, `/moving-to-spain/self-employed-spain/` |
| Search | `/search/` |

## Browser QA Results

Browser checks were run at desktop width around 1280px and mobile width around 390px.

| Check | Result |
|---|---|
| Hero consistency | Pass — reading time appears inside the guide hero/meta area, long titles wrap cleanly, and hero spacing remains consistent across representative guide types. |
| TOC consistency | Pass — desktop TOC links are readable, no text overlap was detected, long headings wrap acceptably, and the sidebar does not dominate the layout. |
| Card consistency | Pass — route cards, step cards, summary cards and question cards keep consistent spacing and do not overflow. |
| Warning/info/source blocks | Pass — warning blocks remain calm, official-source blocks read as references, and no internal process language was detected in visible page text. |
| CTA consistency | Pass — no CTA says "Read more"; CTA labels are descriptive; measured tap targets are at least 44px. |
| Tables | Pass — table pages stay readable; Bank Account and comparison-table pages stack table cells on mobile without page overflow. |
| Mobile layout | Pass — no horizontal overflow, cards stack cleanly, typography hierarchy remains readable, and sidebar TOC elements do not interfere. |
| Search page | Pass — `/search/` has no horizontal overflow and does not inherit guide-only TOC behavior. |

## Representative Spot Check

Representative pages were opened after the full metrics pass:

- `/start-here/` at 1280px
- `/moving-to-spain/eu-registration/` at 1280px
- `/living-in-spain/taxes/` at 1280px
- `/moving-to-spain/digital-nomad-spain/` at 390px
- `/search/` at 390px

The guide pages showed the expected hero, card and TOC behavior for their viewport. The search page stayed visually separate from the generated guide layout.

## Fixes Applied

No new visual fixes were needed in Sprint 73. The Sprint 72 scoped fixes held consistently across the checked draft pages.

## Safety

- `styles.css` was not modified.
- No live indexed pages were modified.
- No redirects were added or changed.
- No pages were published.
- No `noindex, nofollow` setting was removed.
- No PR was opened.
- No merge was performed.

## Publication Decision

No page is approved for publication. All 22 draft/noindex surfaces remain `noindex, nofollow`. Legal, tax, immigration and final editorial approval remain separate publish blockers.
