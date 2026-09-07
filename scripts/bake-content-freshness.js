const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://iberigo.eu";
const META_MARKER = "data-iberigo-freshness";
const VISIBLE_MARKER = "data-iberigo-freshness-visible";
const SITEMAPS = ["sitemap.xml", "sitemap-pages.xml"];
const ACTION_DATA_DIR = path.join(ROOT, "scripts", "action-first");
const GENERATED_ROUTE_DEPENDENCIES = new Map([
  ["/living-in-spain/driving/", ["scripts/bake-driving-resident-guide.js"]],
  ["/es/living-in-spain/driving/", ["scripts/bake-driving-resident-guide.js"]],
]);

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  }).trim();
}

function hasReliableHistory() {
  try {
    const shallow = git(["rev-parse", "--is-shallow-repository"]);
    if (shallow !== "true") return true;
    if (process.env.NETLIFY === "true") {
      try {
        execFileSync("git", ["fetch", "--unshallow", "--quiet", "origin"], {
          cwd: ROOT,
          stdio: "ignore",
          timeout: 120000,
        });
        return git(["rev-parse", "--is-shallow-repository"]) !== "true";
      } catch (error) {
        console.warn("Freshness: Netlify clone is shallow and could not be unshallowed; preserving existing sitemap dates.");
      }
    }
  } catch (error) {
    console.warn("Freshness: Git history is unavailable; preserving existing sitemap dates.");
  }
  return false;
}

function routeFile(route) {
  if (route === "/") return path.join(ROOT, "index.html");
  if (route.endsWith(".html")) return path.join(ROOT, route.slice(1));
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function relFile(route) {
  return path.relative(ROOT, routeFile(route)).replace(/\\/g, "/");
}

function actionDependencyMap() {
  const result = new Map();
  if (fs.existsSync(ACTION_DATA_DIR)) {
    for (const name of fs.readdirSync(ACTION_DATA_DIR).filter((entry) => entry.endsWith(".json")).sort()) {
      const full = path.join(ACTION_DATA_DIR, name);
      const data = JSON.parse(fs.readFileSync(full, "utf8"));
      if (!data.route) continue;
      const rel = path.relative(ROOT, full).replace(/\\/g, "/");
      const existing = result.get(data.route) || [];
      existing.push(rel);
      result.set(data.route, existing);
    }
  }
  for (const [route, dependencies] of GENERATED_ROUTE_DEPENDENCIES) {
    const existing = result.get(route) || [];
    result.set(route, [...new Set([...existing, ...dependencies])]);
  }
  return result;
}

const ACTION_DEPENDENCIES = actionDependencyMap();

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || "") && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function gitLastModified(route) {
  try {
    const dependencies = ACTION_DEPENDENCIES.get(route) || [];
    const value = git(["log", "-1", "--format=%cs", "--", relFile(route), ...dependencies]);
    return isIsoDate(value) ? value : "";
  } catch (error) {
    return "";
  }
}

function sitemapEntries(fileName) {
  const full = path.join(ROOT, fileName);
  const xml = fs.readFileSync(full, "utf8");
  const entries = new Map();
  for (const block of xml.matchAll(/<url>\s*([\s\S]*?)<\/url>/gi)) {
    const loc = block[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1]?.trim();
    if (!loc || !loc.startsWith(SITE)) continue;
    const route = new URL(loc).pathname;
    const lastmod = block[1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i)?.[1]?.trim() || "";
    entries.set(route, lastmod);
  }
  return entries;
}

function pageLanguage(html) {
  return html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "en";
}

function isArticle(html) {
  return /<meta\b[^>]*property=["']og:type["'][^>]*content=["']article["'][^>]*>/i.test(html) ||
    /<meta\b[^>]*content=["']article["'][^>]*property=["']og:type["'][^>]*>/i.test(html);
}

function removeGeneratedFreshness(html) {
  html = html.replace(new RegExp(`\\s*<meta\\b[^>]*${META_MARKER}[^>]*>`, "gi"), "");
  html = html.replace(new RegExp(`\\s*·?\\s*<span\\b[^>]*${VISIBLE_MARKER}[^>]*>[\\s\\S]*?<\\/span>`, "gi"), "");
  return html;
}

function replaceArticleModifiedMeta(html, date) {
  html = html.replace(/\s*<meta\b(?=[^>]*property=["']article:modified_time["'])[^>]*>/gi, "");
  const tag = `\n    <meta property="article:modified_time" content="${date}" ${META_MARKER} />`;
  return html.replace(/\s*<\/head>/i, `${tag}\n  </head>`);
}

function addLastModifiedMeta(html, date) {
  const tag = `\n    <meta name="last-modified" content="${date}" ${META_MARKER} />`;
  return html.replace(/\s*<\/head>/i, `${tag}\n  </head>`);
}

function formatVisibleDate(date, lang) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (lang.startsWith("es")) {
    return `Actualizado ${new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed)}`;
  }
  return `Updated ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed)}`;
}

function addVisibleFreshness(html, date) {
  if (!isArticle(html)) return html;
  const label = formatVisibleDate(date, pageLanguage(html));
  const marker = `<span ${VISIBLE_MARKER}>${label}</span>`;
  const patterns = [
    /(<span\b[^>]*class=["'][^"']*guide-reading-time[^"']*["'][^>]*>[\s\S]*?<\/span>)/i,
    /(<p\b[^>]*class=["'][^"']*article-meta[^"']*["'][^>]*>[\s\S]*?<\/p>)/i,
  ];
  for (const pattern of patterns) {
    if (pattern.test(html)) return html.replace(pattern, `$1 · ${marker}`);
  }
  return html;
}

function applyFreshness(route, date) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) throw new Error(`Freshness route missing: ${route}`);
  let html = fs.readFileSync(file, "utf8");
  html = removeGeneratedFreshness(html);
  html = addLastModifiedMeta(html, date);
  if (isArticle(html)) html = replaceArticleModifiedMeta(html, date);
  html = addVisibleFreshness(html, date);
  fs.writeFileSync(file, html, "utf8");
}

function rewriteSitemap(fileName, dates) {
  const file = path.join(ROOT, fileName);
  let xml = fs.readFileSync(file, "utf8");
  xml = xml.replace(/<url>\s*([\s\S]*?)<\/url>/gi, (block) => {
    const loc = block.match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1]?.trim();
    if (!loc || !loc.startsWith(SITE)) return block;
    const route = new URL(loc).pathname;
    const date = dates.get(route);
    if (!date) return block;
    if (/<lastmod>[^<]*<\/lastmod>/i.test(block)) return block.replace(/<lastmod>[^<]*<\/lastmod>/i, `<lastmod>${date}</lastmod>`);
    return block.replace(/\s*<\/url>/i, `\n    <lastmod>${date}</lastmod>\n  </url>`);
  });
  fs.writeFileSync(file, xml, "utf8");
}

const reliable = hasReliableHistory();
const existingSitemap = sitemapEntries("sitemap-pages.xml");
const routes = [...existingSitemap.keys()].sort();
const dates = new Map();
let preserved = 0;
for (const route of routes) {
  let date = reliable ? gitLastModified(route) : "";
  if (!date) {
    date = existingSitemap.get(route) || "";
    if (date) preserved += 1;
  }
  if (!isIsoDate(date)) throw new Error(`Freshness could not determine a trustworthy date for ${route}`);
  dates.set(route, date);
  applyFreshness(route, date);
}
for (const sitemap of SITEMAPS) rewriteSitemap(sitemap, dates);
console.log(`Content freshness baked for ${routes.length} indexable pages; ${preserved} dates preserved from existing sitemap fallback.`);
