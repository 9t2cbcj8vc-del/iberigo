#!/usr/bin/env node
/*
 * Adds a small "From experience: The Spain Files" callout near the top of the
 * generic topic guides that have a matching first-hand Spain Files article.
 *
 * - Guide System pages (/moving-to-spain/*, /living-in-spain/* and ES): the
 *   callout is a <p> at the end of the hero text block (committed HTML).
 * - Legacy /guides/* pages: the callout is a <p> inside the crawler intro,
 *   which only exists after scripts/bake-crawler-first-guides.js has run, so
 *   this script runs at the end of the Netlify build command.
 *
 * Idempotent: pages that already contain data-spain-files-callout are skipped.
 * Only <p>/<a> markup is used so regexes that match the crawler intro div
 * (…<div data-crawler-guide-intro>[\s\S]*?</div>) keep working.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const FILES = {
  nie: {
    en: ["/the-spain-files/nie-spain/", "How to get a NIE in Spain: complete guide"],
    es: ["/the-spain-files/como-obtener-nie-en-espana/", "Cómo conseguir un NIE en España: guía completa"],
  },
  padron: {
    en: ["/the-spain-files/padron-torrevieja/", "Padrón in Torrevieja: appointment, online route and real wait times"],
    es: ["/the-spain-files/es/padron-torrevieja/", "Empadronamiento en Torrevieja: cita previa, vía online y plazos reales"],
  },
  dnv: {
    en: ["/the-spain-files/digital-nomad-visa-spain/", "Digital Nomad Visa in Spain"],
    es: ["/es/the-spain-files/visado-nomada-digital/", "Visado de nómada digital en España"],
  },
  bank: {
    en: ["/the-spain-files/bank-account-spain/", "Opening a bank account in Spain: practical guide"],
    es: ["/the-spain-files/abrir-cuenta-bancaria-espana/", "Abrir una cuenta bancaria en España: guía práctica"],
  },
};

// page (dir relative to repo root) -> [file key, lang, kind]
const PAGES = [
  ["guides/nie", "nie", "en", "legacy"],
  ["guides/es/nie", "nie", "es", "legacy"],
  ["guides/padron", "padron", "en", "legacy"],
  ["guides/es/padron", "padron", "es", "legacy"],
  ["moving-to-spain/digital-nomad-spain", "dnv", "en", "system"],
  ["es/moving-to-spain/digital-nomad-spain", "dnv", "es", "system"],
  ["guides/banking", "bank", "en", "legacy"],
  ["guides/es/banking", "bank", "es", "legacy"],
  ["living-in-spain/opening-a-bank-account", "bank", "en", "system"],
  ["es/living-in-spain/opening-a-bank-account", "bank", "es", "system"],
];

const MARK = "data-spain-files-callout";
const STYLE_MARK = "data-spain-files-callout-style";
const STYLE = `\n    <style ${STYLE_MARK}>\n      .spain-files-callout { max-width: 68ch; margin: 1rem 0 0; padding: 0.75rem 0.95rem; border-left: 4px solid #f97316; border-radius: 10px; background: #fff4ea; color: #1b2030; font-size: 0.98rem; line-height: 1.55; }\n      .spain-files-callout a { color: #9a3412; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }\n    </style>`;

function callout(key, lang) {
  const [href, title] = FILES[key][lang];
  const lead = lang === "es" ? "Por experiencia (The Spain Files):" : "From experience (The Spain Files):";
  return `<p class="spain-files-callout" ${MARK}><strong>${lead}</strong> <a href="${href}">${title} →</a></p>`;
}

function inject(html, key, lang, kind) {
  if (html.includes(MARK)) return null;
  const p = callout(key, lang);
  let next = null;
  if (kind === "system") {
    const re = /(<section class="panel guide-card-panel guide-hero"[^>]*>\s*<div>[\s\S]*?)(\n\s*<\/div>\s*<aside class="guide-hero-card")/;
    if (!re.test(html)) return undefined;
    next = html.replace(re, (m, a, b) => `${a}\n            ${p}${b}`);
  } else {
    const re = /(<div[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?)(\n\s*<\/div>)/;
    if (!re.test(html)) return undefined;
    next = html.replace(re, (m, a, b) => `${a}\n            ${p}${b}`);
  }
  if (!next.includes(STYLE_MARK)) next = next.replace("</head>", `${STYLE}\n  </head>`);
  return next;
}

let changed = 0;
let skipped = 0;
for (const [dir, key, lang, kind] of PAGES) {
  const file = path.join(ROOT, dir, "index.html");
  if (!fs.existsSync(file)) { console.warn(`spain-files-callouts: missing ${dir}`); continue; }
  const html = fs.readFileSync(file, "utf8");
  const next = inject(html, key, lang, kind);
  if (next === null) { skipped += 1; continue; }
  if (next === undefined) {
    // Legacy pages only get their crawler intro during the build.
    if (kind === "system") console.warn(`spain-files-callouts: hero not found in ${dir}`);
    else skipped += 1;
    continue;
  }
  fs.writeFileSync(file, next);
  changed += 1;
}
console.log(`spain-files-callouts: updated ${changed}, unchanged ${skipped}.`);
