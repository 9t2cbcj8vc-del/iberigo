# Visual overhaul image library

PR #162 uses one small, reusable photography system rather than a different visual style for every page.

## Direction

**Real Spain, stylized consistently:** warm natural Mediterranean light, cream/ochre/terracotta/sage/deep-navy tones, soft contrast, subtle grain, practical everyday objects and authentic Spanish settings. Images contain no readable text, logos, brands, flags or identity-document imitation. Every core source is composed to survive both wide hero and 4:3 card crops.

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

Each group now uses the visual that communicates that subject directly. Phone & internet intentionally reuses the digital/connectivity scene.

## Transport treatment

`transport-spain.webp` is the dedicated transport visual for the new system. The focal treatment keeps the train/station dominant in both section thumbnails and guide heroes. It replaces the earlier fallback to the legacy `vacation-ground-transport-20260606.webp` scene.

## Production notes

The visual library was created specifically for IberiGo with OpenAI image generation in new-image mode and converted to web-friendly assets. The core prompts share the same visual-direction paragraph and differ only in subject/category. The runtime category mapping lives in `scripts/visual-overhaul.js`, with the refined Living/transport/search/support pass in `scripts/final-visual-polish.js` while the redesign remains in Draft review.

The library is intentionally reused across English and Spanish pages. Language variants do not have separate artwork, which keeps subject, crop and visual hierarchy in sync.

Before production merge, the remaining review-layer transformations should be folded into the stable site/generator sources where practical, then the final EN/ES desktop/mobile/function regression pass should be repeated.
