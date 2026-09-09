const fs = require('fs');
const path = require('path');
const assert = require('assert');
const engine = require('../intent-discovery.js');
require('../intent-discovery-rules.js').apply(engine);
const corpus = require('./intent-discovery-corpus.json');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  { route: '/', file: 'index.html', lang: 'en', surface: 'home' },
  { route: '/start-here/', file: 'start-here/index.html', lang: 'en', surface: 'start-here' },
  { route: '/es/start-here/', file: 'es/start-here/index.html', lang: 'es', surface: 'start-here' }
];

function componentCount(html) {
  return (html.match(/<section\b[^>]*\bdata-iberigo-intent-discovery(?:\s|>)[^>]*>/gi) || []).length;
}

function auditCorpus() {
  const failures = [];
  const counts = { en: 0, es: 0 };
  corpus.forEach((item, index) => {
    counts[item.lang] = (counts[item.lang] || 0) + 1;
    const result = engine.match(item.query, item.lang);
    const actual = result.results[0]?.id || null;
    if (actual !== item.expected || result.confidence === 'none' || result.confidence === 'low') {
      failures.push(`#${index + 1} [${item.lang}] ${JSON.stringify(item.query)} expected=${item.expected} actual=${actual} confidence=${result.confidence} scores=${result.results.map((r) => `${r.id}:${r.score}`).join(',')}`);
    }
  });
  if (failures.length) throw new Error(`Intent corpus failures (${failures.length}/${corpus.length}):\n${failures.join('\n')}`);
  assert(corpus.length >= 100, `Expected at least 100 regression queries, found ${corpus.length}`);
  assert(counts.en >= 45 && counts.es >= 45, `Corpus must cover both languages well: ${JSON.stringify(counts)}`);
  assert.strictEqual(engine.normalize('Número de Seguridad Social'), 'numero de seguridad social');
  assert(engine.editDistance('socail', 'social') <= 2, 'Transposition typo tolerance regressed');
  const nonsense = engine.match('purple umbrella moon paperwork', 'en');
  assert.notStrictEqual(nonsense.confidence, 'high', 'Unrelated query should not get a high-confidence procedure');
  console.log(`INTENT CORPUS PASSED: ${corpus.length} queries (${counts.en} EN, ${counts.es} ES)`);
}

function routeFile(route) { return route === '/' ? path.join(ROOT, 'index.html') : path.join(ROOT, route.slice(1), 'index.html'); }

function auditPlacement(route, html, surface) {
  const component = html.search(/<section\b[^>]*\bdata-iberigo-intent-discovery(?:\s|>)/i);
  assert(component >= 0, `${route}: intent component placement marker missing`);

  if (surface === 'home') {
    const headingStart = html.search(/<div\b[^>]*class="[^"]*section-heading[^"]*"[^>]*>/i);
    const headingEndStart = headingStart >= 0 ? html.indexOf('</div>', headingStart) : -1;
    const headingEnd = headingEndStart >= 0 ? headingEndStart + '</div>'.length : -1;
    const featured = html.search(/<article\b[^>]*class="[^"]*featured-guide[^"]*"[^>]*>/i);
    assert(headingStart >= 0 && headingEnd > headingStart, `${route}: homepage intro block missing`);
    assert(featured >= 0, `${route}: featured guide marker missing`);
    assert(component > headingEnd && component < featured, `${route}: intent discovery must sit after the intro and before the featured guide`);
    return;
  }

  const heroStart = html.search(/<section\b[^>]*class="[^"]*guide-hero[^"]*"[^>]*>/i);
  const heroEndStart = heroStart >= 0 ? html.indexOf('</section>', heroStart) : -1;
  const heroEnd = heroEndStart >= 0 ? heroEndStart + '</section>'.length : -1;
  const mobileToc = html.search(/<details\b[^>]*class="[^"]*guide-toc-mobile[^"]*"[^>]*>/i);
  assert(heroStart >= 0 && heroEnd > heroStart, `${route}: hero block missing`);
  assert(mobileToc >= 0, `${route}: mobile TOC marker missing`);
  assert(component > heroEnd && component < mobileToc, `${route}: intent discovery must sit directly after the hero and before the mobile TOC`);
}

function auditHtml(route, html, lang, surface) {
  assert.strictEqual(componentCount(html), 1, `${route}: expected exactly one intent-discovery component`);
  assert(html.includes(`data-intent-surface="${surface}"`), `${route}: wrong/missing surface marker`);
  assert(html.includes(`data-intent-lang="${lang}"`), `${route}: wrong/missing language marker`);
  assert(html.includes('data-intent-input'), `${route}: input missing`);
  assert(html.includes('data-intent-results'), `${route}: results container missing`);
  assert(html.includes('data-intent-fallback'), `${route}: full-search fallback missing`);
  assert(html.includes('/intent-discovery.js?v=20260908-intent-1'), `${route}: intent asset missing/stale`);
  assert(html.includes('/intent-discovery-rules.js?v=20260908-intent-1'), `${route}: intent rules asset missing/stale`);
  auditPlacement(route, html, surface);
}

function auditLocal() {
  auditCorpus();
  for (const page of PAGES) auditHtml(page.route, fs.readFileSync(routeFile(page.route), 'utf8'), page.lang, page.surface);
  const engineSource = fs.readFileSync(path.join(ROOT, 'intent-discovery.js'), 'utf8');
  const rulesSource = fs.readFileSync(path.join(ROOT, 'intent-discovery-rules.js'), 'utf8');
  assert(engineSource.includes('IberiGoIntentDiscovery'), 'Browser API export missing');
  assert(rulesSource.includes('additions'), 'Intent ambiguity rules missing');
  for (const intent of engine.intents) {
    for (const lang of ['en', 'es']) {
      const target = routeFile(intent.urls[lang]);
      assert(fs.existsSync(target), `${intent.id}/${lang}: target route missing: ${intent.urls[lang]}`);
    }
  }
  console.log(`INTENT DISCOVERY LOCAL PASSED: ${PAGES.length} surfaces, ${engine.intents.length} intents`);
}

async function fetchText(base, route, attempts = 10) {
  let last = '';
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(base.replace(/\/$/, '') + route, { headers: { 'user-agent': 'IberiGo-intent-discovery-audit/1.0' } });
      if (response.ok) return await response.text();
      last = `HTTP ${response.status}`;
    } catch (error) { last = String(error); }
    await new Promise((resolve) => setTimeout(resolve, Math.min(2000 + i * 500, 6000)));
  }
  throw new Error(`Could not fetch ${route}: ${last}`);
}

async function auditPreview(base) {
  auditCorpus();
  for (const page of PAGES) auditHtml(page.route, await fetchText(base, page.route), page.lang, page.surface);
  const asset = await fetchText(base, '/intent-discovery.js?v=20260908-intent-1');
  const rules = await fetchText(base, '/intent-discovery-rules.js?v=20260908-intent-1');
  assert(asset.includes('IberiGoIntentDiscovery'), 'Deployed intent-discovery asset is missing or stale');
  assert(rules.includes('additions'), 'Deployed intent rules asset is missing or stale');
  console.log(`INTENT DISCOVERY PREVIEW PASSED: ${PAGES.length} surfaces`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--local')) return auditLocal();
  if (args.includes('--preview')) {
    const base = process.env.PREVIEW_BASE;
    if (!base) throw new Error('PREVIEW_BASE is required with --preview');
    return auditPreview(base);
  }
  if (args.includes('--corpus')) return auditCorpus();
  throw new Error('Choose --local, --preview or --corpus');
}

main().catch((error) => { console.error(error.stack || error); process.exit(1); });
