# Visual overhaul image library

PR #162 uses one small, reusable photography system rather than a different visual style for every page.

## Direction

**Real Spain, stylized consistently:** warm natural Mediterranean light, cream/ochre/terracotta/sage/deep-navy tones, soft contrast, subtle grain, practical everyday objects and authentic Spanish settings. Images contain no readable text, logos, brands, flags or identity-document imitation. Every core source is 3:2 and composed to survive both wide hero and 4:3 card crops.

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
| `files` | `spain-files-editorial.webp` | Spain Files landing hero, editorial experience block and Support visual |

## Living hub refinement

The Living in Spain hub is being refined into single-purpose visual groups so the image meaning and information architecture match:

- Home
- Money & banking
- Work & career
- Healthcare
- Digital Spain
- Transport & driving
- Phone & internet

The first six categories use their corresponding visual-library scenes. Phone & internet intentionally reuses the digital/connectivity scene.

### Transport interim

Transport is currently mapped to the dedicated ground-transport scene at `assets/topic-scenes/vacation-ground-transport-20260606.webp`, with transport-specific focal cropping. Before production merge, this should be replaced by a final 13th visual-library transport asset in the same photographic treatment as the twelve core scenes.

## Production notes

The twelve core source images were generated specifically for IberiGo with OpenAI image generation in new-image mode, then converted locally to WebP at quality 84. Prompts shared the same visual-direction paragraph and differed only in subject/category. The runtime mapping lives in `scripts/visual-overhaul.js`; the homepage card script consumes that shared mapping when available and has matching paths as a defensive fallback.

The library is intentionally reused across English and Spanish pages. Language variants do not have separate artwork, which keeps subject, crop and visual hierarchy in sync.

Before production merge, the review-layer overrides should be consolidated into the site/generator sources so final images and categories render directly without post-load DOM replacement.
