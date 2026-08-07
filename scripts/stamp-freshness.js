#!/usr/bin/env node
// Keeps the homepage freshness claim honest by deriving it from the repository
// instead of hard-coding it.
//
// The problem
// -----------
// The homepage hero said "Updated this week" / "Actualizado esta semana" as a
// hard-coded string in two places (index.html and app.js's i18n table). Nothing
// enforced it. The moment a week passed without a deploy the site was asserting
// something false to every visitor, and there was no signal that it had gone stale.
//
// A relative claim like "this week" cannot be made safe by reminding someone to
// update it — it decays on a timer. So it is replaced by an absolute month derived
// from the most recent commit date, which is true whenever it is rendered and simply
// becomes older rather than wrong.
//
// What this does NOT touch
// ------------------------
// "Last reviewed: July 2026" is deliberately left alone. That is a claim about
// *editorial review*, not about modification. Deriving it from git would make the
// site claim a content review happened every time anyone fixed a typo, which is a
// stronger and less truthful claim than the current stale one. It stays
// human-owned; see docs/FRESHNESS_CLAIMS.md.
//
// Usage
//   node scripts/stamp-freshness.js          # rewrite the claim from git
//   node scripts/stamp-freshness.js --check  # verify only; exit 1 if stale

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");
const APP = path.join(ROOT, "app.js");

const MONTHS_EN = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
const MONTHS_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function lastCommitDate() {
  const iso = execFileSync("git", ["log", "-1", "--format=%cs"], { cwd: ROOT })
    .toString().trim();
  const [y, m] = iso.split("-").map(Number);
  return { year: y, monthIndex: m - 1 };
}

function claims() {
  const { year, monthIndex } = lastCommitDate();
  return {
    en: `Updated ${MONTHS_EN[monthIndex]} ${year}`,
    es: `Actualizado en ${MONTHS_ES[monthIndex]} de ${year}`,
  };
}

// Matches the middle segment of the hero stats line, whatever it currently says.
const INDEX_RE = /(<p class="hero-stats" data-i18n="heroStats">[^<·]*·\s*)([^·<]*?)(\s*·)/;
const APP_EN_RE = /(heroStats: "[^"·]*·\s*)([^·"]*?)(\s*·[^"]*",)/;
const APP_ES_RE = /(heroStats: "[^"·]*·\s*)([^·"]*?)(\s*·[^"]*",)/g;

function run() {
  const checkOnly = process.argv.includes("--check");
  const want = claims();

  const index = fs.readFileSync(INDEX, "utf8");
  const app = fs.readFileSync(APP, "utf8");

  const stale = [];
  let nextIndex = index;
  let nextApp = app;

  const im = INDEX_RE.exec(index);
  if (!im) {
    console.error("stamp-freshness: hero-stats line not found in index.html");
    process.exit(1);
  }
  if (im[2].trim() !== want.en) {
    stale.push(`index.html: "${im[2].trim()}" -> "${want.en}"`);
    nextIndex = index.replace(INDEX_RE, `$1${want.en}$3`);
  }

  // app.js holds an EN and an ES heroStats; rewrite each with its own language string.
  const appMatches = [...app.matchAll(APP_ES_RE)];
  if (appMatches.length !== 2) {
    console.error(`stamp-freshness: expected 2 heroStats entries in app.js, found ${appMatches.length}`);
    process.exit(1);
  }
  const langs = ["en", "es"];
  let offset = 0;
  appMatches.forEach((m, i) => {
    const current = m[2].trim();
    const target = want[langs[i]];
    if (current !== target) {
      stale.push(`app.js (${langs[i]}): "${current}" -> "${target}"`);
      const start = m.index + offset;
      const rebuilt = `${m[1]}${target}${m[3]}`;
      nextApp = nextApp.slice(0, start) + rebuilt + nextApp.slice(start + m[0].length);
      offset += rebuilt.length - m[0].length;
    }
  });

  if (checkOnly) {
    if (stale.length) {
      console.error("\nstamp-freshness: FAILED — the homepage freshness claim is stale.\n");
      stale.forEach((s) => console.error("    " + s));
      console.error("\n  Fix: node scripts/stamp-freshness.js\n");
      process.exit(1);
    }
    console.log(`stamp-freshness: OK — homepage claims "${want.en}" / "${want.es}".`);
    return;
  }

  if (!stale.length) {
    console.log(`stamp-freshness: already current — "${want.en}".`);
    return;
  }
  fs.writeFileSync(INDEX, nextIndex);
  fs.writeFileSync(APP, nextApp);
  console.log(`stamp-freshness: updated ${stale.length} claim(s) to "${want.en}" / "${want.es}".`);
}

run();
