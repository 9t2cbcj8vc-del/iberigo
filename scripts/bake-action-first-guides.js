const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "action-first");
const PANEL_MARKER = "data-iberigo-action-first";
const STYLE_MARKER = "data-iberigo-action-first-style";
const REQUIRED_ITEM_IDS = ["procedure", "where", "select", "forms", "bring", "after"];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function routeFile(route) {
  if (route === "/") return path.join(ROOT, "index.html");
  if (route.endsWith(".html")) return path.join(ROOT, route.replace(/^\//, ""));
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function isExternal(url) {
  return /^https:\/\//i.test(url);
}

function assertConfig(config, sourceFile) {
  const prefix = path.relative(ROOT, sourceFile).replace(/\\/g, "/");
  if (!config.procedureKey || !config.route || !config.lang || !config.title || !config.intro) {
    throw new Error(`${prefix}: missing required action-first identity fields`);
  }
  if (!/^\/(?:.*\/)?$/.test(config.route)) {
    throw new Error(`${prefix}: route must be a root-relative directory route`);
  }
  if (!Array.isArray(config.items)) throw new Error(`${prefix}: items must be an array`);
  const ids = config.items.map((item) => item.id);
  for (const id of REQUIRED_ITEM_IDS) {
    if (!ids.includes(id)) throw new Error(`${prefix}: missing required item ${id}`);
  }
  if (new Set(ids).size !== ids.length) throw new Error(`${prefix}: duplicate item ids`);
  for (const item of config.items) {
    if (!item.id || !item.label || (!item.text && !(Array.isArray(item.bullets) && item.bullets.length))) {
      throw new Error(`${prefix}: invalid action item ${item.id || "(missing id)"}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(config.sourceChecked || "")) {
    throw new Error(`${prefix}: sourceChecked must be YYYY-MM-DD`);
  }
  for (const link of config.links || []) {
    if (!link.label || !link.url) throw new Error(`${prefix}: invalid action link`);
    if (/^https?:/i.test(link.url) && !isExternal(link.url)) {
      throw new Error(`${prefix}: external action links must use HTTPS: ${link.url}`);
    }
    if (link.url.startsWith("/")) {
      const target = routeFile(new URL(link.url, "https://iberigo.eu").pathname);
      if (!fs.existsSync(target)) throw new Error(`${prefix}: local action link target missing: ${link.url}`);
    }
  }
}

function loadConfigs() {
  if (!fs.existsSync(DATA_DIR)) throw new Error("Action-first data directory is missing");
  const files = fs.readdirSync(DATA_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => path.join(DATA_DIR, name));
  if (!files.length) throw new Error("No action-first guide data found");

  const configs = [];
  const routes = new Set();
  for (const sourceFile of files) {
    const config = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
    assertConfig(config, sourceFile);
    if (routes.has(config.route)) throw new Error(`Duplicate action-first route: ${config.route}`);
    routes.add(config.route);
    configs.push({ config, sourceFile });
  }
  return configs;
}

function formatCheckedDate(value, lang) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function renderItem(item) {
  const bullets = Array.isArray(item.bullets) && item.bullets.length
    ? `<ul>${item.bullets.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul>`
    : "";
  const text = item.text ? `<p>${escapeHtml(item.text)}</p>` : "";
  return `<div class="action-first-item" data-action-item="${escapeHtml(item.id)}">
              <strong>${escapeHtml(item.label)}</strong>
              ${text}${bullets}
            </div>`;
}

function renderLinks(links) {
  if (!links?.length) return "";
  return `<div class="action-first-links">${links.map((link, index) => {
    const external = isExternal(link.url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a class="guide-button${index ? " guide-button--secondary" : ""}" href="${escapeHtml(link.url)}"${attrs}>${escapeHtml(link.label)}</a>`;
  }).join("")}</div>`;
}

function renderPanel(config, sourceFile) {
  const source = path.relative(ROOT, sourceFile).replace(/\\/g, "/");
  const checked = formatCheckedDate(config.sourceChecked, config.lang);
  return `<section class="action-first-card" ${PANEL_MARKER} data-procedure-key="${escapeHtml(config.procedureKey)}" data-action-source="${escapeHtml(source)}" aria-labelledby="actionFirstTitle">
          <div class="action-first-head">
            <div>
              <span class="action-first-eyebrow">${escapeHtml(config.eyebrow)}</span>
              <h2 id="actionFirstTitle">${escapeHtml(config.title)}</h2>
            </div>
            <span class="action-first-status">${escapeHtml(config.status || "")}</span>
          </div>
          <p class="action-first-intro">${escapeHtml(config.intro)}</p>
          <div class="action-first-grid">
            ${config.items.map(renderItem).join("\n            ")}
          </div>
          ${renderLinks(config.links || [])}
          <p class="action-first-checked">${escapeHtml(config.sourceCheckedLabel || "Official source checked")}: <time datetime="${escapeHtml(config.sourceChecked)}">${escapeHtml(checked)}</time></p>
        </section>`;
}

const STYLE = `<style ${STYLE_MARKER}>
      .action-first-card { margin-top: 1.25rem; padding: clamp(1.2rem, 3vw, 1.8rem); border: 1px solid rgba(166, 74, 54, 0.24); border-radius: 18px; background: linear-gradient(145deg, rgba(253, 240, 220, 0.82), rgba(255, 255, 255, 0.95)); box-shadow: 0 18px 42px rgba(42, 32, 25, 0.08); }
      .action-first-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
      .action-first-eyebrow { display: inline-flex; color: #a64a36; font-size: 0.74rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
      .action-first-card h2 { margin: 0.4rem 0 0; color: #1b2030; font-size: clamp(1.45rem, 3vw, 2rem); line-height: 1.18; }
      .action-first-status { flex: 0 1 280px; padding: 0.45rem 0.65rem; border-radius: 999px; background: rgba(166, 74, 54, 0.09); color: #8f3e2c; font-size: 0.76rem; font-weight: 850; line-height: 1.35; text-align: center; }
      .action-first-intro { max-width: 78ch; margin: 0.9rem 0 0; color: rgba(27, 32, 48, 0.76); line-height: 1.66; }
      .action-first-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.85rem; margin-top: 1.15rem; }
      .action-first-item { min-width: 0; padding: 1rem; border: 1px solid rgba(166, 74, 54, 0.12); border-radius: 14px; background: rgba(255, 255, 255, 0.82); }
      .action-first-item strong { display: block; margin-bottom: 0.38rem; color: #1b2030; font-size: 0.82rem; font-weight: 900; letter-spacing: 0.025em; text-transform: uppercase; }
      .action-first-item p, .action-first-item li { margin: 0; color: rgba(27, 32, 48, 0.74); font-size: 0.94rem; line-height: 1.58; }
      .action-first-item ul { display: grid; gap: 0.32rem; margin: 0; padding-left: 1.15rem; }
      .action-first-links { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.15rem; }
      .action-first-links .guide-button { width: auto; }
      .action-first-checked { margin: 0.85rem 0 0; color: rgba(27, 32, 48, 0.56); font-size: 0.8rem; font-weight: 750; }
      @media (max-width: 720px) { .action-first-head { display: grid; } .action-first-status { justify-self: start; flex: none; text-align: left; } .action-first-grid { grid-template-columns: minmax(0, 1fr); } .action-first-links { display: grid; } .action-first-links .guide-button { width: 100%; } }
    </style>`;

function stripGenerated(html) {
  html = html.replace(new RegExp(`\\s*<style\\b[^>]*${STYLE_MARKER}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  html = html.replace(new RegExp(`\\s*<section\\b[^>]*${PANEL_MARKER}[^>]*>[\\s\\S]*?<\\/section>`, "gi"), "");
  return html;
}

function bake(config, sourceFile) {
  const file = routeFile(config.route);
  if (!fs.existsSync(file)) throw new Error(`${config.route}: page file not found`);
  let html = stripGenerated(fs.readFileSync(file, "utf8"));

  const lang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (lang !== config.lang) throw new Error(`${config.route}: page language ${lang} does not match config ${config.lang}`);

  if (!/<\/head>/i.test(html)) throw new Error(`${config.route}: closing head not found`);
  html = html.replace(/\s*<\/head>/i, `\n    ${STYLE}\n  </head>`);

  const hero = /(<section\b[^>]*class=["'][^"']*\bguide-hero\b[^"']*["'][^>]*>[\s\S]*?<\/section>)/i;
  if (!hero.test(html)) throw new Error(`${config.route}: guide hero not found`);
  html = html.replace(hero, `$1\n        ${renderPanel(config, sourceFile)}`);

  fs.writeFileSync(file, html, "utf8");
}

const configs = loadConfigs();
for (const { config, sourceFile } of configs) bake(config, sourceFile);

console.log(`Action-first cards baked for ${configs.length} bilingual guide routes.`);
