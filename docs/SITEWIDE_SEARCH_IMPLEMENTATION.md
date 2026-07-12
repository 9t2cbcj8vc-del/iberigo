# Sitewide search implementation

Status: **Sitewide search prepared — preview QA pending**

## Audit and root cause

The old `search-index.json` was written by `scripts/generate-guide-system.js` and contained only the 24 published Guide System routes. Its `/search/` page was English-only and separate from most public headers. Generated Guide System headers had an SVG search link, while the homepage, all 70 client-rendered legacy guide shells, The Spain Files, and support used independent hand-written headers without it. That split caused the apparently blank/inconsistent control and incomplete coverage. `app.js` renders legacy guide content through `directRoadmapFor()` but contains no site-search implementation.

Public surface inventory: homepage; 24 published Guide System pages (EN/ES Start Here, route roadmaps, Moving to Spain and Living in Spain); 70 `/guides/*` client-rendered legacy routes (35 EN/35 ES); The Spain Files landing and public articles; and support. Draft Guide System pages retain `noindex, nofollow` and are excluded. The noindex `/search/` utility page, preview/output files, docs, 404/system pages, and a duplicate Spain Files shell whose canonical points to the public article are excluded.

## Implementation

`scripts/generate-search-index.js` crawls local public HTML deterministically, follows canonical paths, rejects duplicates, invalid paths, missing metadata, empty searchable content, and broken local targets, and injects the shared icon launcher/script into every eligible public header. It emits compact normalized metadata plus bounded body text. Run it after the Guide System generator.

The index contains **102 entries**:

- 70 legacy guides
- 14 roadmaps
- 10 Guide System guides
- 4 Spain Files articles
- 3 landing pages
- 1 support page
- Languages: 52 English, 50 Spanish

The modal uses a visible inline SVG launcher, 44px target, localized accessible labels, autofocus, native dialog focus containment, Escape/close/backdrop dismissal, focus return, localized empty/no-result states, and responsive sizing. Matching is case- and accent-insensitive, requires all query terms, ranks exact/start/contains title matches before headings/keywords and description/body matches, and gives current-language results a modest boost without hiding the other language. Ten results show initially with “Show more.”

## Cache and safety

The shared script and index use matching `20260712-sitewide` request versions. `_headers` gives the script a one-day revalidating cache and the index a five-minute revalidating cache, limiting mismatched deployments without disabling asset caching broadly.

No URLs, redirects, canonical links, hreflang, robots metadata, sitemap entries, draft states, or page content were changed. `sitemap.xml` remains at 101 URLs; search has 102 entries because the useful homepage is searchable while the sitemap/search utility and duplicate shell policies differ.

## Verification

Syntax, Guide System generation/metadata/link checks, dedicated index validation, legacy audit (4/70 static bodies unchanged), deterministic regeneration, and browser checks at 1280px and 375px cover launcher visibility, localized UI, autofocus, ranking, no-result behavior, focus/keyboard close, overflow, and console errors. Final Netlify deploy-preview QA remains required before merge.
