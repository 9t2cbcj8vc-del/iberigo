#!/usr/bin/env node
// Keeps the app.js cache-busting query string in sync with app.js's actual content.
//
// Why this exists
// ---------------
// /app.js is served with `Cache-Control: public, max-age=604800` (see _headers), with
// no revalidation. The only thing that forces browsers and the CDN to pick up a new
// build is the `?v=` query string on the <script> tag. That string lived as a
// hand-typed date slug duplicated across 77 HTML pages, so editing app.js without
// also bumping all 77 shipped a silent regression: returning visitors kept executing
// the previous app.js for up to a week.
//
// That is not hypothetical. It happened twice:
//   - PR #129/#130 — family/eu-family explanations did not reach cached visitors.
//   - PR #134/#135 — worse: the stale app.js re-rendered #wizardResult without the
//     new entry/visa block, actively deleting content that WAS present in the served
//     HTML. The section flashed, then vanished.
//
// The fix is to stop hand-typing the version. It is now derived from a SHA-256 hash
// of app.js, so it changes when and only when app.js changes. Forgetting is no longer
// possible: either you ran this script (correct version) or `--check` fails.
//
// Usage
// -----
//   node scripts/sync-app-version.js            # rewrite pages to the correct version
//   node scripts/sync-app-version.js --check    # verify only; exit 1 if out of sync
//
// Run the default mode after any app.js edit. Run --check in CI or a pre-commit hook.
// This is deliberately standalone, matching the repo's other scripts/*.js utilities;
// it does not depend on a package.json or build pipeline, neither of which exist here.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const APP_JS = path.join(ROOT, "app.js");

// Directories that never contain shipped pages.
const IGNORED = new Set([
  ".git", ".github", ".claude", ".netlify", "node_modules",
  "docs", "outputs", "reports", "visual-qa", "assets", "downloads", "scripts"
]);

// Matches the app.js script tag's src, with or without an existing ?v=.
// Captures: 1 = leading quote+path, 2 = existing version (may be undefined).
const APP_SRC_RE = /(["'])(\.?\/?app\.js)(?:\?v=([^"']*))?\1/g;

function shortHash(buf) {
  return "h" + crypto.createHash("sha256").update(buf).digest("hex").slice(0, 10);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function run() {
  const checkOnly = process.argv.includes("--check");

  if (!fs.existsSync(APP_JS)) {
    console.error("sync-app-version: app.js not found at", APP_JS);
    process.exit(1);
  }

  const expected = shortHash(fs.readFileSync(APP_JS));
  const pages = walk(ROOT);

  const stale = [];
  const updated = [];
  let referencing = 0;

  for (const file of pages) {
    const html = fs.readFileSync(file, "utf8");
    if (!/["']\.?\/?app\.js(\?|["'])/.test(html)) continue;
    referencing += 1;

    let fileHasStale = false;
    const next = html.replace(APP_SRC_RE, (match, quote, src, version) => {
      if (version === expected) return match;
      fileHasStale = true;
      return `${quote}${src}?v=${expected}${quote}`;
    });

    if (!fileHasStale) continue;
    const rel = path.relative(ROOT, file);
    if (checkOnly) {
      stale.push(rel);
    } else {
      fs.writeFileSync(file, next);
      updated.push(rel);
    }
  }

  if (referencing === 0) {
    console.error("sync-app-version: no HTML pages reference app.js — refusing to pass silently.");
    process.exit(1);
  }

  if (checkOnly) {
    if (stale.length) {
      console.error(`\nsync-app-version: FAILED — app.js cache-busting version is out of date.\n`);
      console.error(`  app.js content hash : ${expected}`);
      console.error(`  pages referencing   : ${referencing}`);
      console.error(`  pages out of sync   : ${stale.length}\n`);
      for (const f of stale.slice(0, 10)) console.error(`    ${f}`);
      if (stale.length > 10) console.error(`    ... and ${stale.length - 10} more`);
      console.error(`\n  app.js was edited without bumping ?v=. Returning visitors would keep`);
      console.error(`  executing the previous app.js for up to 7 days (see _headers).\n`);
      console.error(`  Fix: node scripts/sync-app-version.js\n`);
      process.exit(1);
    }
    console.log(`sync-app-version: OK — ${referencing} pages reference app.js at ${expected}.`);
    return;
  }

  if (updated.length) {
    console.log(`sync-app-version: updated ${updated.length}/${referencing} pages to ${expected}.`);
  } else {
    console.log(`sync-app-version: already in sync — ${referencing} pages at ${expected}.`);
  }
}

run();
