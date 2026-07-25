# app.js cache-busting

**Rule: after editing `app.js`, run `node scripts/sync-app-version.js` and commit the result.**

That is the whole workflow. The rest of this document is why it matters.

## The problem this prevents

`_headers` serves `/app.js` with `Cache-Control: public, max-age=604800` — seven days, no
revalidation. Browsers and the CDN will not re-fetch it during that window. The **only**
thing that forces a refresh is the `?v=` query string on the `<script>` tag:

```html
<script src="app.js?v=h0cf806ab2f"></script>
```

That tag appears on **77 pages** (38 English legacy guides, 38 Spanish, plus `index.html`).
Those pages are hand-maintained static HTML — no generator writes them — so the version
string used to be typed by hand and duplicated 77 times. Editing `app.js` without updating
all 77 shipped a change that returning visitors would not receive for up to a week.

## Why it is worse than a stale-content bug

On legacy guide pages `app.js` re-renders `#wizardResult` on load, replacing whatever the
served HTML contained. So a stale `app.js` does not merely fail to add new content — it can
**delete** content that is present in the HTML.

This has happened twice in production:

| | What shipped | What visitors saw |
|---|---|---|
| PR #129 → fixed by #130 | family / eu-family explanations | Cached visitors kept the old thin content |
| PR #134 → fixed by #135 | EU-family entry/visa section | Section was in the served HTML, rendered, then **vanished** on hydration — the stale `app.js` re-rendered without it |

The second case is the dangerous shape: the content is genuinely deployed and verifiable in
`curl` output, so it looks correct in a static check, while real returning visitors lose it.

## How the safeguard works

`scripts/sync-app-version.js` derives the version from a SHA-256 hash of `app.js`:

```
node scripts/sync-app-version.js          # rewrite all 77 pages to the correct version
node scripts/sync-app-version.js --check  # verify only; exits 1 if out of sync
```

Because the version is content-addressed:

- It changes when, and only when, `app.js` changes.
- It is deterministic — reverting an `app.js` change restores the previous version string,
  so there is no spurious churn across branches.
- Forgetting is no longer possible: either the script was run, or `--check` fails.

`.github/workflows/asset-version-check.yml` runs `--check` on every pull request and on
pushes to `main`.

## Scope

The script only rewrites the `app.js` script tag. Other versioned assets — `styles.css`
(`STYLESHEET_VERSION`) and `scripts/site-search.js` (`SITE_SEARCH_VERSION`), both defined in
`scripts/site-assets.js` — are untouched and remain manually versioned. Those are consumed
by the Guide System generators, which do not emit `app.js` at all.
