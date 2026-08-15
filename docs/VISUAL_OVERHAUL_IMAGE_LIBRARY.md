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
| `transport` | `transport-spain.webp` | Visit Spain public transport, ground transport and flights |
| `files` | `spain-files-editorial.webp` | Spain Files landing hero, editorial experience block and Support visual |

Driving-specific content intentionally uses the existing car/driving topic scenes rather than the public-transport image:

- `driving-spain-visitors-20260722.webp` for Living **Transport & driving**, visitor driving and resident-driving content.
- `driving-licence-exchange-20260719.webp` for driving-licence exchange guides.

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

Public-transport and driving imagery are deliberately separated:

- **Living / driving-specific content** uses car, road or driving-licence imagery.
- **Visit / getting-around content** uses `transport-spain.webp`, with the train/public-transport scene.

This avoids using a train image for a section whose primary action is exchanging or using a driving licence.

## Production notes

The visual library was created specifically for IberiGo with OpenAI image generation in new-image mode and converted to web-friendly assets. The core prompts share the same visual-direction paragraph and differ only in subject/category. The runtime category mapping lives in `scripts/visual-overhaul.js`, with the refined Living/transport pass in `scripts/final-visual-polish.js`.

The library is intentionally reused across English and Spanish pages. Language variants do not have separate artwork, which keeps subject, crop and visual hierarchy in sync.

## Final deployed-preview validation

A Selenium/Chrome smoke test now runs against the actual Netlify Deploy Preview. The final run passed homepage navigation and roadmap presence, search modal/autofocus, EN↔ES switching, Living/Visit visual mappings, representative driving/public-transport guides, Search, Support, Spain Files, desktop/mobile overflow checks, and browser-console checks.

The test first confirmed the built-bundle `linkLabels is not defined` error, then verified the fix successfully on the deployed preview.
