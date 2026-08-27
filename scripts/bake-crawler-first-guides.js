const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GUIDES_ROOT = path.join(ROOT, "guides");
const GUIDE_MARKER = "data-crawler-first=\"true\"";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name === "index.html") files.push(full);
  }
  return files;
}

function addHiddenById(html, id) {
  const safeId = escapeRegExp(id);
  const re = new RegExp(`<([a-zA-Z0-9-]+)([^>]*\\bid=(?:\"${safeId}\"|'${safeId}')[^>]*)>`, "i");
  return html.replace(re, (full, tag, attrs) => {
    if (/\shidden(?:\s|=|>)/i.test(`${attrs}>`)) return full;
    return `<${tag}${attrs} hidden>`;
  });
}

function extractGuideMeta(html) {
  const root = html.match(/<html\b([^>]*)>/i)?.[1] || "";
  const id = root.match(/\bdata-guide-id=[\"']([^\"']+)[\"']/i)?.[1];
  const lang = root.match(/\bdata-guide-lang=[\"']([^\"']+)[\"']/i)?.[1];
  if (!id || !lang) return null;

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=[\"']description[\"']\s+content=[\"']([^\"']*)[\"'][^>]*>/i)?.[1]?.trim();
  if (!title || !description) {
    throw new Error(`Missing title or description for generated guide ${id} (${lang})`);
  }

  return {
    id,
    lang,
    title: title.replace(/\s+—\s+IberiGo\s*$/i, ""),
    description,
  };
}

function crawlerIntro(meta) {
  const label = meta.lang === "es" ? "Guía IberiGo" : "IberiGo guide";
  return `\n          <div class="crawler-guide-intro" data-crawler-guide-intro data-crawler-guide-id="${meta.id}">\n            <span class="tagline">${label}</span>\n            <h1>${meta.title}</h1>\n            <p>${meta.description}</p>\n          </div>\n        `;
}

function replaceInitialResult(html, meta) {
  const re = /<article([^>]*\bid=(?:\"wizardResult\"|'wizardResult')[^>]*)>([\s\S]*?)<\/article>/i;
  if (!re.test(html)) throw new Error(`Missing #wizardResult for generated guide ${meta.id} (${meta.lang})`);

  return html.replace(re, (full, attrs, body) => {
    let cleanAttrs = attrs
      .replace(/\s+hidden(?:=(?:\"hidden\"|'hidden'|hidden))?/gi, "")
      .replace(/\bis-empty\b/g, "")
      .replace(/\s{2,}/g, " ");

    const intro = crawlerIntro(meta);
    if (body.includes("data-crawler-guide-intro")) return `<article${cleanAttrs}>${body}</article>`;

    const generic = /Your roadmap will appear here|Tu hoja de ruta aparecerá aquí|Choose a situation card|Elige una situación/i.test(body);
    const nextBody = generic || !body.trim() ? intro : `${intro}${body}`;
    return `<article${cleanAttrs}>${nextBody}</article>`;
  });
}

function addCrawlerStyle(html) {
  if (html.includes("data-crawler-first-guide-style")) return html;
  const style = `\n    <style data-crawler-first-guide-style>\n      .crawler-guide-intro { max-width: 820px; padding: clamp(0.4rem, 1vw, 0.8rem) 0; }\n      .crawler-guide-intro .tagline { display: inline-block; margin-bottom: 0.55rem; }\n      .crawler-guide-intro h1 { margin: 0 0 0.9rem; font-size: clamp(2rem, 5vw, 3.6rem); line-height: 1.04; }\n      .crawler-guide-intro p { max-width: 68ch; margin: 0; font-size: 1.05rem; line-height: 1.7; }\n    </style>`;
  return html.replace("</head>", `${style}\n  </head>`);
}

function markCrawlerFirst(html) {
  if (html.includes(GUIDE_MARKER)) return html;
  return html.replace(/<html\b([^>]*)>/i, `<html$1 ${GUIDE_MARKER}>`);
}

function transformGuide(file) {
  let html = fs.readFileSync(file, "utf8");
  const meta = extractGuideMeta(html);
  if (!meta) return false;

  html = markCrawlerFirst(html);
  html = addCrawlerStyle(html);

  // These are homepage/questionnaire surfaces inherited from index.html. The
  // direct-guide runtime already hides them when JavaScript loads, so making
  // that state true in raw HTML improves crawler output without changing the
  // enhanced visitor flow. The existing navigation functions can unhide them
  // later when a visitor intentionally returns to the route finder.
  for (const id of ["guide-cards", "routeWizard", "documents", "sources"]) {
    html = addHiddenById(html, id);
  }

  html = replaceInitialResult(html, meta);
  fs.writeFileSync(file, html, "utf8");
  return true;
}

if (!fs.existsSync(GUIDES_ROOT)) throw new Error("Missing guides directory");

let transformed = 0;
for (const file of walk(GUIDES_ROOT)) {
  if (transformGuide(file)) transformed += 1;
}

if (transformed === 0) throw new Error("No generated guide pages were transformed");
console.log(`Baked crawler-first raw HTML into ${transformed} generated guide pages.`);
