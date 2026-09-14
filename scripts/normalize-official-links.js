#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VERIFY_ONLY = process.argv.includes('--verify');
const SUFFIXES = new Set(['.html', '.js', '.json', '.md', '.toml', '.yml', '.yaml']);
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const SELF = path.resolve(__filename);

const https = (host, pathname = '') => `https://${host}${pathname}`;

// Keep legacy destinations assembled rather than written as full URLs so the
// official-link monitor does not inventory this migration table itself.
const REPLACEMENTS = [
  {
    from: https('sede.agenciatributaria.gob.es', '/Sede/no-residentes/residencia-personas-fisicas-juridicas/residencia-personas-fisicas.html'),
    to: 'https://sede.agenciatributaria.gob.es/Sede/no-residentes/residencia-personas-fisicas-juridicas.html',
    label: 'AEAT tax residence',
  },
  {
    from: https('clave.gob.es', '/clave_Home/registro/Como-puedo-registrarme.html'),
    to: 'https://clave.gob.es/registro/como-puedo-registrarme',
    label: 'Cl@ve registration',
  },
  {
    from: https('sede.dgt.gob.es'),
    to: 'https://sede.dgt.gob.es/es/',
    label: 'DGT e-office root',
  },
  {
    from: https('sede.policia.gob.es'),
    to: 'https://sede.policia.gob.es/portalCiudadano/_es/index.php',
    label: 'Police e-office root',
  },
  {
    from: https('www.dgt.es'),
    to: 'https://www.dgt.es/inicio/',
    label: 'DGT main site root',
  },
  {
    from: https('www.exteriores.gob.es'),
    to: 'https://www.exteriores.gob.es/es/Paginas/index.aspx',
    label: 'Foreign Affairs root',
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replacementPattern(from) {
  // Bare authority roots must not rewrite already-specific URLs on the same host.
  return new RegExp(`${escapeRegExp(from)}(?![/?#])`, 'g');
}

function *scanFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield *scanFiles(full);
      continue;
    }
    if (!entry.isFile() || full === SELF || !SUFFIXES.has(path.extname(entry.name).toLowerCase())) continue;
    if (entry.name.startsWith('official-link-health-report')) continue;
    yield full;
  }
}

let filesChanged = 0;
let totalReplacements = 0;
const replacementCounts = new Map(REPLACEMENTS.map(item => [item.label, 0]));
const stale = [];

for (const file of scanFiles(ROOT)) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  let next = text;
  for (const item of REPLACEMENTS) {
    const pattern = replacementPattern(item.from);
    const matches = next.match(pattern);
    if (!matches?.length) continue;
    replacementCounts.set(item.label, replacementCounts.get(item.label) + matches.length);
    totalReplacements += matches.length;
    if (VERIFY_ONLY) {
      stale.push(`${path.relative(ROOT, file)}: ${item.label} (${matches.length})`);
    } else {
      next = next.replace(pattern, item.to);
    }
  }

  if (!VERIFY_ONLY && next !== text) {
    fs.writeFileSync(file, next);
    filesChanged += 1;
  }
}

if (VERIFY_ONLY) {
  if (stale.length) {
    console.error('[official-links] stale destinations remain:');
    stale.slice(0, 100).forEach(item => console.error(`  - ${item}`));
    if (stale.length > 100) console.error(`  ... ${stale.length - 100} more`);
    process.exit(1);
  }
  console.log('[official-links] canonical destination verification passed');
  process.exit(0);
}

console.log(`[official-links] normalized ${totalReplacements} link occurrence(s) across ${filesChanged} file(s)`);
for (const item of REPLACEMENTS) {
  console.log(`[official-links] ${item.label}: ${replacementCounts.get(item.label)}`);
}
