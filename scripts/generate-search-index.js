const fs = require("fs");
const path = require("path");
const { STYLESHEET_VERSION, siteSearchScriptSrc, searchControlMarkup } = require("./site-assets");

const root = path.resolve(__dirname, "..");
const ignored = new Set([".git", ".netlify", "node_modules", "visual-qa", "docs", "outputs"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name === "index.html" ? [full] : [];
  });
}

const decode = (s = "") => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (s = "") => decode(s.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const attr = (html, re) => decode((html.match(re) || [])[1] || "").trim();

function typeFor(url, guideId) {
  if (url.startsWith("/guides/")) return guideId ? "legacy guide" : "guide";
  if (url === "/the-spain-files/" || url === "/the-spain-files/es/") return "landing page";
  if (url.startsWith("/the-spain-files/") || url.startsWith("/es/the-spain-files/")) return "Spain Files article";
  if (url === "/support/") return "support page";
  if (url === "/") return "landing page";
  if (/citizens|students|work-in-spain|retire|self-employed|family-member/.test(url)) return "roadmap";
  return "guide";
}

function routeFor(file, canonical) {
  if (canonical) {
    const parsed = new URL(canonical);
    if (parsed.hostname !== "iberigo.eu" && parsed.hostname !== "www.iberigo.eu") throw new Error(`External canonical in ${file}`);
    return parsed.pathname;
  }
  const rel = path.relative(root, file).replace(/\\/g, "/");
  return rel === "index.html" ? "/" : `/${rel.replace(/index\.html$/, "")}`;
}

function validatePageShell(file, html, lang) {
  const rel = path.relative(root, file);
  if (!new RegExp(`href="[^"]*styles\\.css\\?v=${STYLESHEET_VERSION}"`).test(html)) throw new Error(`Stale stylesheet reference: ${rel}`);
  if (!html.includes(searchControlMarkup(lang))) throw new Error(`Stale search control markup: ${rel}`);
  if (!html.includes(`src="${siteSearchScriptSrc}"`)) throw new Error(`Missing or stale site-search script: ${rel}`);
}

const entries = [];
const urls = new Set();
for (const file of walk(root).sort()) {
  let html = fs.readFileSync(file, "utf8");
  const lang = (attr(html, /<html[^>]*\slang="([^"]+)"/i) || "en").split("-")[0];
  const robots = attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/i).toLowerCase();
  const canonical = attr(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const url = routeFor(file, canonical);
  const physical = routeFor(file, "");
  const canonicalTarget = url === "/" ? path.join(root, "index.html") : path.join(root, url, "index.html");
  if (url !== physical && fs.existsSync(canonicalTarget)) continue; // obsolete duplicate shell
  validatePageShell(file, html, lang);
  if (robots.includes("noindex")) continue;
  if (!url.startsWith("/") || url.includes("index.html")) throw new Error(`Invalid public path: ${url}`);
  if (urls.has(url)) throw new Error(`Duplicate canonical URL: ${url}`);
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i).replace(/\s+—\s+IberiGo.*$/i, "");
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => text(m[1])).filter(Boolean);
  const guideId = attr(html, /data-guide-id="([^"]+)"/i).replace(/-/g, " ");
  const body = text((html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || "").slice(0, 1800);
  if (!title || !description || !(body || guideId)) throw new Error(`Incomplete searchable page: ${path.relative(root, file)}`);
  entries.push({ title, description, url, language: lang, type: typeFor(url, guideId), headings: headings.slice(0, 18), keywords: guideId ? [guideId] : [], text: body });
  urls.add(url);
}

entries.sort((a, b) => a.url.localeCompare(b.url));
for (const item of entries) {
  const target = item.url === "/" ? path.join(root, "index.html") : path.join(root, item.url, "index.html");
  if (!fs.existsSync(target)) throw new Error(`Broken local search target: ${item.url}`);
}
fs.writeFileSync(path.join(root, "search-index.json"), `${JSON.stringify(entries, null, 2)}\n`);
const breakdown = entries.reduce((out, item) => { out[item.type] = (out[item.type] || 0) + 1; return out; }, {});
const languages = entries.reduce((out, item) => { out[item.language] = (out[item.language] || 0) + 1; return out; }, {});
console.log(`Generated ${entries.length} sitewide search entries.`);
console.log(JSON.stringify({ breakdown, languages }, null, 2));
