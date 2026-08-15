# Visual overhaul image library

PR #162 uses one small, reusable photography system rather than a different visual style for every page.

## Direction

**Real Spain, stylized consistently:** warm natural Mediterranean light, cream/ochre/terracotta/sage/deep-navy tones, soft contrast, subtle grain, practical everyday objects and authentic Spanish settings. Images avoid identity-document imitation and are composed to survive both wide hero and 4:3 card crops.

## Categories and files

| Key | File | Primary use |
| --- | --- | --- |
| `arrival` | `arrival-relocation.webp` | Homepage hero, Move gateway and Move hub |
| `everyday` | `everyday-life.webp` | Living gateway, Living hub and everyday-life fallbacks |
| `visit` | `visit-travel.webp` | Visit gateway and Visit hub |
| `documents` | `documents-admin.webp` | NIE, TIE, registration, visa and authorization guides |
| `banking` | `banking-money.webp` | Banking, money and tax guides; banking Spain File |
| `healthcare` | `healthcare.webp` | Public/private healthcare, SIP and EHIC guides |
| `housing` | `housing-home.webp` | Renting, accommodation and padrón guides; padrón Spain File |
| `work` | `work-employment.webp` | Work, job search, Social Security and vida laboral guides |
| `digital` | `digital-connectivity.webp` | Digital administration, phone, SIM/eSIM and connectivity guides |
| `family` | `family-settling.webp` | Family routes and reunification guides |
| `study` | `study-spain.webp` | Student and study routes |
| `transport` | `transport-spain.webp` | Transport & driving, Getting there & around, driving/ground-transport guide heroes |
| `files` | `spain-files-editorial.webp` | Spain Files landing hero, editorial experience block and Support visual |

## Living hub refinement

The Living in Spain hub is refined into single-purpose visual groups so the image meaning and information architecture match:

- Home
- Money & banking
- Work & career
- Healthcare
- Digital Spain
- Transport & driving
- Phone & internet

Each group uses the visual that communicates that subject directly. Phone & internet intentionally reuses the digital/connectivity scene.

## Transport treatment

`transport-spain.webp` is the dedicated transport visual for the new system. It replaces the earlier fallback to the legacy `vacation-ground-transport-20260606.webp` scene. The final crop uses the source composition directly rather than the earlier extreme focal zoom.

## Search and Support

Search and Support now load the final visual-polish stylesheet directly from their HTML. Support includes its editorial image directly in the page markup. Neither page needs a post-load visual mutation.

## Runtime consolidation

The two earlier semantic override scripts and their MutationObservers have been removed. The remaining `final-visual-polish.js` is limited to the Living hub category refinement and transport mapping, runs once after the main visual-overhaul script, and contains no polling loop or MutationObserver. `site-search.js` now loads the visual scripts sequentially so this order is deterministic.

The library is intentionally reused across English and Spanish pages. Language variants do not have separate artwork, which keeps subject, crop and visual hierarchy in sync.

Before merge, repeat the final EN/ES desktop/mobile/function regression pass on the latest Netlify preview.
