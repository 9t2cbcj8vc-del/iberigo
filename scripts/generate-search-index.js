const fs = require("fs");
const path = require("path");

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

function typeFor(url) {
  if (url.startsWith("/guides/")) return "legacy guide";
  if (url === "/the-spain-files/" || url === "/the-spain-files/es/") return "landing page";
  if (url.startsWith("/the-spain-files/")) return "Spain Files article";
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

function addSearchControl(file, html, lang) {
  const label = lang === "es" ? "Buscar en IberiGo" : "Search IberiGo";
  const icon = `<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false"><circle cx="11" cy="11" r="7"></circle><line x1="16.65" y1="16.65" x2="21" y2="21"></line></svg>`;
  if (!html.includes('class="search-nav-link"')) {
    const control = `<a class="search-nav-link" href="/search/" aria-label="${label}" title="${label}" data-site-search-open>${icon}</a>`;
    html = html.replace(/(<div class="language-switcher")/, `${control}\n          $1`);
  } else {
    html = html.replace(/<a class="search-nav-link"([^>]*)>/, (match, attrs) => match.includes("data-site-search-open") ? match : `<a class="search-nav-link"${attrs} title="${label}" data-site-search-open>`);
    html = html.replace(/(<a class="search-nav-link"[^>]*>)[\s\S]*?(<\/a>)/, `$1${icon}$2`);
  }
  html = html.replace(/(styles\.css\?v=)[^"']+/g, "$120260712-search-icon");
  if (!html.includes('/scripts/site-search.js')) html = html.replace(/<\/body>/, '  <script src="/scripts/site-search.js?v=20260712-sitewide-4" defer></script>\n  </body>');
  else html = html.replace(/\/scripts\/site-search\.js\?v=[^"]+/, "/scripts/site-search.js?v=20260712-sitewide-4");
  fs.writeFileSync(file, html);
}

const entries = [];
const urls = new Set();
for (const file of walk(root).sort()) {
  let html = fs.readFileSync(file, "utf8");
  const robots = attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/i).toLowerCase();
  if (robots.includes("noindex")) continue;
  const lang = (attr(html, /<html[^>]*\slang="([^"]+)"/i) || "en").split("-")[0];
  const canonical = attr(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const url = routeFor(file, canonical);
  const physical = routeFor(file, "");
  const canonicalTarget = url === "/" ? path.join(root, "index.html") : path.join(root, url, "index.html");
  if (url !== physical && fs.existsSync(canonicalTarget)) continue; // obsolete duplicate shell
  if (!url.startsWith("/") || url.includes("index.html")) throw new Error(`Invalid public path: ${url}`);
  if (urls.has(url)) throw new Error(`Duplicate canonical URL: ${url}`);
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i).replace(/\s+—\s+IberiGo.*$/i, "");
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => text(m[1])).filter(Boolean);
  const guideId = attr(html, /data-guide-id="([^"]+)"/i).replace(/-/g, " ");
  const body = text((html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || "").slice(0, 1800);
  if (!title || !description || !(body || guideId)) throw new Error(`Incomplete searchable page: ${path.relative(root, file)}`);
  entries.push({ title, description, url, language: lang, type: typeFor(url), headings: headings.slice(0, 18), keywords: guideId ? [guideId] : [], text: body });
  urls.add(url);
  addSearchControl(file, html, lang);
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
