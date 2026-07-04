#!/usr/bin/env node
// Read-only inspection of the legacy /guides/* pages. Does not modify any
// file. Reports route inventory, metadata coverage, and structural risk
// flags to inform Visual Coherence Phase 2 planning (see
// docs/VISUAL_COHERENCE_PHASE2_LEGACY_GUIDE_PLAN.md).

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const GUIDES_DIR = path.join(REPO_ROOT, "guides");
const SITEMAP_PATH = path.join(REPO_ROOT, "sitemap.xml");
const REPORTS_DIR = path.join(REPO_ROOT, "reports");
const REPORT_PATH = path.join(REPORTS_DIR, "legacy-guide-audit.json");
const SITE_ORIGIN = "https://iberigo.eu";

function listTopicDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "es")
    .map((entry) => entry.name)
    .sort();
}

function readFileIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function extractAttr(html, tagRegex, attr) {
  const match = html.match(tagRegex);
  if (!match) return null;
  const attrMatch = match[0].match(new RegExp(`${attr}="([^"]*)"`));
  return attrMatch ? attrMatch[1] : null;
}

function extractDataGuideId(html) {
  return extractAttr(html, /<html\b[^>]*>/i, "data-guide-id");
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaContent(html, name) {
  const regex = new RegExp(`<meta\\s+name="${name}"[^>]*content="([^"]*)"`, "i");
  const match = html.match(regex);
  return match ? match[1] : null;
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  return match ? match[1] : null;
}

function extractHreflangLinks(html) {
  const regex = /<link\s+rel="alternate"\s+hreflang="([^"]*)"\s+href="([^"]*)"/gi;
  const links = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push({ hreflang: match[1], href: match[2] });
  }
  return links;
}

function hasNoscriptFallback(html) {
  return /<noscript[\s>]/i.test(html);
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : "";
}

// Legacy pages inject their real guide content client-side into the
// #wizardResult placeholder, which ships as an empty "Your roadmap will
// appear here" shell (class="result-card is-empty") until app.js runs. A
// page has real static guide content only if that placeholder has been
// replaced (see docs/LEGACY_STATIC_RENDERING_POC_PLAN.md /
// scripts/render-legacy-static-poc.js for the first route this applies to).
// Falls back to the meta-description heuristic for any page that doesn't
// use the #wizardResult placeholder pattern at all.
const WIZARD_RESULT_PLACEHOLDER_TEXT = "Your roadmap will appear here";

function hasStaticGuideContent(html, metaDescription) {
  const body = extractBody(html);
  if (/id="wizardResult"/.test(body)) {
    const isEmptyPlaceholder =
      /class="result-card is-empty"/.test(body) || body.includes(WIZARD_RESULT_PLACEHOLDER_TEXT);
    return !isEmptyPlaceholder;
  }
  if (!metaDescription) return false;
  return body.includes(metaDescription);
}

// Heuristic: legacy pages are known to be homepage-shell clones — the body
// carries the homepage's wizard/situation-card markup rather than a
// guide-specific static layout. Presence of these homepage-only structural
// markers, combined with the absence of static guide content, indicates the
// shell-clone pattern this audit exists to surface.
function isHomepageShellClone(html) {
  const body = extractBody(html);
  const shellMarkers = ["situation-card", "app-shell", "wizard"];
  return shellMarkers.every((marker) => body.includes(marker));
}

function loadSitemapLocs() {
  const xml = readFileIfExists(SITEMAP_PATH) || "";
  const regex = /<loc>([^<]*)<\/loc>/g;
  const locs = new Set();
  let match;
  while ((match = regex.exec(xml)) !== null) {
    locs.add(match[1]);
  }
  return locs;
}

function buildRouteRecord(topic, lang, sitemapLocs) {
  const relDir = lang === "en" ? `guides/${topic}` : `guides/es/${topic}`;
  const filePath = path.join(REPO_ROOT, relDir, "index.html");
  const routePath = lang === "en" ? `/guides/${topic}/` : `/guides/es/${topic}/`;
  const canonicalUrl = `${SITE_ORIGIN}${routePath}`;

  const existsIndexHtml = fs.existsSync(filePath);
  const html = existsIndexHtml ? fs.readFileSync(filePath, "utf8") : "";

  const dataGuideId = existsIndexHtml ? extractDataGuideId(html) : null;
  const title = existsIndexHtml ? extractTitle(html) : null;
  const metaDescription = existsIndexHtml ? extractMetaContent(html, "description") : null;
  const robotsMeta = existsIndexHtml ? extractMetaContent(html, "robots") : null;
  const canonical = existsIndexHtml ? extractCanonical(html) : null;
  const hreflang = existsIndexHtml ? extractHreflangLinks(html) : [];
  const noscriptFallback = existsIndexHtml ? hasNoscriptFallback(html) : false;
  const staticGuideContent = existsIndexHtml ? hasStaticGuideContent(html, metaDescription) : false;
  const shellClone = existsIndexHtml ? isHomepageShellClone(html) : false;
  const inSitemap = sitemapLocs.has(canonicalUrl);

  const riskFlags = [];
  if (!existsIndexHtml) riskFlags.push("missing-index-html");
  if (existsIndexHtml && !canonical) riskFlags.push("missing-canonical");
  if (existsIndexHtml && !metaDescription) riskFlags.push("missing-meta-description");
  if (existsIndexHtml && !inSitemap) riskFlags.push("missing-from-sitemap");
  if (existsIndexHtml && !dataGuideId) riskFlags.push("missing-data-guide-id");
  if (existsIndexHtml && robotsMeta) riskFlags.push("unexpected-robots-meta");
  if (existsIndexHtml && hreflang.length < 3) riskFlags.push("incomplete-hreflang");
  if (existsIndexHtml && !staticGuideContent) riskFlags.push("missing-static-guide-body-content");
  if (existsIndexHtml && !noscriptFallback) riskFlags.push("missing-noscript-fallback");

  return {
    route: routePath,
    lang,
    filePath: path.join(relDir, "index.html"),
    existsIndexHtml,
    dataGuideId,
    canonical,
    title,
    metaDescription,
    robotsMeta,
    hreflang,
    inSitemap,
    isHomepageShellClone: shellClone,
    hasStaticGuideContent: staticGuideContent,
    hasNoscriptFallback: noscriptFallback,
    riskFlags
  };
}

function buildSummary(routes) {
  const count = (predicate) => routes.filter(predicate).length;
  return {
    totalLegacyGuideUrls: routes.length,
    englishLegacyGuideUrls: count((r) => r.lang === "en"),
    spanishLegacyGuideUrls: count((r) => r.lang === "es"),
    pagesWithIndexHtml: count((r) => r.existsIndexHtml),
    pagesInSitemap: count((r) => r.inSitemap),
    pagesWithCanonical: count((r) => Boolean(r.canonical)),
    pagesWithMetaDescription: count((r) => Boolean(r.metaDescription)),
    pagesWithCompleteHreflang: count((r) => r.hreflang.length >= 3),
    pagesWithDataGuideId: count((r) => Boolean(r.dataGuideId)),
    pagesWithStaticGuideBodyContent: count((r) => r.hasStaticGuideContent),
    pagesWithNoscriptFallback: count((r) => r.hasNoscriptFallback),
    suspectedHomepageShellCloneCount: count((r) => r.isHomepageShellClone),
    pagesWithRiskFlags: count((r) => r.riskFlags.length > 0)
  };
}

function run() {
  if (!fs.existsSync(GUIDES_DIR)) {
    console.error(`Legacy guides directory not found: ${GUIDES_DIR}`);
    process.exitCode = 1;
    return;
  }

  const sitemapLocs = loadSitemapLocs();
  const englishTopics = listTopicDirs(GUIDES_DIR);
  const spanishDir = path.join(GUIDES_DIR, "es");
  const spanishTopics = fs.existsSync(spanishDir) ? listTopicDirs(spanishDir) : [];

  const routes = [
    ...englishTopics.map((topic) => buildRouteRecord(topic, "en", sitemapLocs)),
    ...spanishTopics.map((topic) => buildRouteRecord(topic, "es", sitemapLocs))
  ].sort((a, b) => a.route.localeCompare(b.route));

  const summary = buildSummary(routes);

  const report = {
    scriptVersion: 1,
    generatedAt: new Date().toISOString(),
    summary,
    routes
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");

  console.log("Legacy Guide Audit");
  console.log("===================");
  console.log(`Total legacy guide URLs: ${summary.totalLegacyGuideUrls}`);
  console.log(`  English: ${summary.englishLegacyGuideUrls}`);
  console.log(`  Spanish: ${summary.spanishLegacyGuideUrls}`);
  console.log(`Pages with index.html: ${summary.pagesWithIndexHtml}`);
  console.log(`Pages in sitemap.xml: ${summary.pagesInSitemap}`);
  console.log(`Pages with canonical: ${summary.pagesWithCanonical}`);
  console.log(`Pages with meta description: ${summary.pagesWithMetaDescription}`);
  console.log(`Pages with complete hreflang (>=3 links): ${summary.pagesWithCompleteHreflang}`);
  console.log(`Pages with data-guide-id: ${summary.pagesWithDataGuideId}`);
  console.log(`Pages with static guide body content: ${summary.pagesWithStaticGuideBodyContent}`);
  console.log(`Pages with noscript fallback: ${summary.pagesWithNoscriptFallback}`);
  console.log(`Suspected homepage-shell clones: ${summary.suspectedHomepageShellCloneCount}`);
  console.log(`Pages with at least one risk flag: ${summary.pagesWithRiskFlags}`);
  console.log("");
  console.log(`Full report written to: ${path.relative(REPO_ROOT, REPORT_PATH)}`);

  const flagged = routes.filter((r) => r.riskFlags.length > 0);
  if (flagged.length > 0) {
    console.log("");
    console.log(`Routes with risk flags (${flagged.length}):`);
    flagged.forEach((r) => {
      console.log(`  ${r.route} [${r.lang}] — ${r.riskFlags.join(", ")}`);
    });
  }
}

run();
