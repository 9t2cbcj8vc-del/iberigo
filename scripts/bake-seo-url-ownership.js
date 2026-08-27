const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://iberigo.eu";
const rules = JSON.parse(fs.readFileSync(path.join(__dirname, "seo-url-ownership.json"), "utf8"));

function routeFile(route) {
  if (route === "/") return path.join(ROOT, "index.html");
  if (route.endsWith(".html")) return path.join(ROOT, route.slice(1));
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function requirePage(route) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) throw new Error(`SEO ownership route is missing: ${route} (${file})`);
  return file;
}

function upsertRobots(html, value) {
  const tag = `<meta name="robots" content="${value}" />`;
  if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, tag);
  } else {
    html = html.replace(/<meta\s+name=["']viewport["'][^>]*>/i, (match) => `${match}\n    ${tag}`);
  }

  const google = `<meta name="googlebot" content="${value}" />`;
  if (/<meta\s+name=["']googlebot["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']googlebot["'][^>]*>/i, google);
  } else {
    html = html.replace(tag, `${tag}\n    ${google}`);
  }
  return html;
}

function markOwner(html, owner) {
  const marker = `data-seo-primary="${owner}"`;
  if (/data-seo-primary=/i.test(html)) {
    return html.replace(/data-seo-primary=["'][^"']*["']/i, marker);
  }
  return html.replace(/<html\b([^>]*)>/i, `<html$1 ${marker}>`);
}

function setIndexability(route, indexable, owner = route) {
  const file = requirePage(route);
  let html = fs.readFileSync(file, "utf8");
  html = upsertRobots(html, indexable ? "index, follow" : "noindex, follow");
  html = markOwner(html, owner);
  fs.writeFileSync(file, html, "utf8");
}

function replaceHreflangSet(route, enRoute, esRoute) {
  const file = requirePage(route);
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/\s*<link\s+rel=["']alternate["']\s+hreflang=["'](?:en|es|x-default)["'][^>]*\/?>/gi, "");
  const canonical = html.match(/<link\s+rel=["']canonical["'][^>]*>/i)?.[0];
  if (!canonical) throw new Error(`Missing canonical while fixing hreflang: ${route}`);
  const links = `\n    <link rel="alternate" hreflang="en" href="${SITE}${enRoute}" />\n    <link rel="alternate" hreflang="es" href="${SITE}${esRoute}" />\n    <link rel="alternate" hreflang="x-default" href="${SITE}${enRoute}" />`;
  html = html.replace(canonical, `${canonical}${links}`);
  fs.writeFileSync(file, html, "utf8");
}

function sitemapBlocks(xml) {
  return [...xml.matchAll(/\s*<url>\s*[\s\S]*?<\/url>/gi)].map((match) => match[0]);
}

function locFromBlock(block) {
  return block.match(/<loc>\s*([^<]+)\s*<\/loc>/i)?.[1]?.trim() || "";
}

function normaliseRouteFromLoc(loc) {
  try {
    const url = new URL(loc);
    if (url.origin !== SITE) return null;
    return url.pathname;
  } catch {
    return null;
  }
}

function rewriteSitemap(fileName) {
  const file = path.join(ROOT, fileName);
  if (!fs.existsSync(file)) return;
  let xml = fs.readFileSync(file, "utf8");
  const excluded = new Set([
    ...Object.keys(rules.duplicate_aliases),
    ...rules.utility_noindex,
    ...Object.keys(rules.redirect_aliases),
  ]);

  for (const block of sitemapBlocks(xml)) {
    const route = normaliseRouteFromLoc(locFromBlock(block));
    if (route && excluded.has(route)) xml = xml.replace(block, "");
  }

  for (const route of rules.primary_indexable) {
    const loc = `${SITE}${route}`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    const block = `\n  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>2026-08-27</lastmod>\n  </url>`;
    xml = xml.replace(/\s*<\/urlset>\s*$/i, `${block}\n</urlset>\n`);
  }

  fs.writeFileSync(file, xml.replace(/\n{3,}/g, "\n\n"), "utf8");
}

for (const route of rules.primary_indexable) setIndexability(route, true, route);
for (const [alias, primary] of Object.entries(rules.duplicate_aliases)) setIndexability(alias, false, primary);
for (const route of rules.utility_noindex) setIndexability(route, false, route);

for (const [enRoute, esRoute] of rules.hreflang_pairs) {
  replaceHreflangSet(enRoute, enRoute, esRoute);
  replaceHreflangSet(esRoute, enRoute, esRoute);
}

for (const [alias, primary] of Object.entries(rules.redirect_aliases)) {
  requirePage(alias);
  requirePage(primary);
}

rewriteSitemap("sitemap-pages.xml");
rewriteSitemap("sitemap.xml");

console.log(`SEO ownership baked: ${rules.primary_indexable.length} primaries, ${Object.keys(rules.duplicate_aliases).length} duplicate aliases, ${rules.utility_noindex.length} utilities.`);
