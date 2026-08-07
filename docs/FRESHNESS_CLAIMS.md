# Freshness claims

The site makes two claims about its own currency. They look similar and are handled
very differently, because they mean different things.

## 1. Homepage hero — automated

> `70+ guides · Updated August 2026 · Written from Alicante`

This is a **modification** claim, so it can be derived. `scripts/stamp-freshness.js`
reads the most recent commit date and writes the month into `index.html` and both
`heroStats` entries in `app.js`.

```bash
node scripts/stamp-freshness.js          # rewrite from git
node scripts/stamp-freshness.js --check  # verify; exits 1 if stale
```

`--check` runs in CI on every pull request and push to `main`.

**Why an absolute month, not "this week".** The previous copy said *"Updated this
week"*, hard-coded in two places. A relative claim decays on a timer: the first week
without a deploy, the site was asserting something false to every visitor, with
nothing to signal it. A month is true whenever it renders and simply becomes older,
never wrong. That property is the point — it degrades gracefully instead of lying.

## 2. "Last reviewed" — deliberately manual

> `Last reviewed: July 2026` / `Última revisión: julio de 2026`

Defined in `scripts/guide-components.js` (`REVIEWED`), mirrored in
`scripts/generate-guide-system.js` (`lastReviewed`) and `app.js` (`footerReviewed`).

**This is deliberately not automated, and should not be.** It is a claim about
*editorial review*, not about modification. Wiring it to git would make every page
claim it had been reviewed whenever anyone fixed a typo, corrected a link, or bumped
a cache-busting string — a stronger and less truthful claim than a stale date. The
honest options are a human doing the review, or the date staying where it is.

Two things make the current state safer than it looks:

- Guide System pages pair the date with an explicit caveat — *"Official sources are
  linked on this page for further checking; content has not been verified against
  them by a qualified professional."*
- The date is a single shared constant, so a real review pass updates every page at
  once.

**Known gap:** the 38 EN legacy guides show `Last reviewed: July 2026` **without**
that caveat. They assert currency more strongly than the roadmaps while carrying a
weaker disclaimer. Worth closing when the legacy guides next get attention.

### Suggested cadence

Revisit **quarterly**, and always after any content pass that touches fees, forms,
thresholds or procedures. Update `REVIEWED` in `scripts/guide-components.js` and the
matching strings in `generate-guide-system.js` and `app.js`, then regenerate.

Do not bump the date to make it look recent. A stale-but-true date is worth more than
a fresh-but-false one — the whole point of the claim is that a reader can rely on it.
