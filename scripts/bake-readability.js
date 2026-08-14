const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const scriptTag = '<script src="/scripts/readability.js?v=20260814-readability-2" defer></script>';
const reportPath = path.join(root, "readability-audit.json");
const LONG_PARAGRAPH = 360;
const ignoredDirs = new Set([".git", "node_modules"]);

function walk(dir, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else if (entry.isFile() && entry.name.endsWith(".html")) output.push(full);
  }
  return output;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceCount(text) {
  const matches = text.match(/[.!?]+(?:\s|$)/g);
  return matches ? matches.length : 0;
}

function auditParagraphs(html) {
  const findings = [];
  const regex = /<p\b([^>]*)>([\s\S]*?)<\/p>/gi;
  let match;
  let paragraph = 0;
  while ((match = regex.exec(html))) {
    paragraph += 1;
    const attrs = match[1] || "";
    if (/\b(disclaimer|helper-note|last-reviewed|guide-reading-time)\b/i.test(attrs)) continue;
    const text = visibleText(match[2]);
    if (text.length >= LONG_PARAGRAPH && sentenceCount(text) >= 3) {
      findings.push({ paragraph, characters: text.length, sentences: sentenceCount(text), preview: text.slice(0, 150) });
    }
  }
  return findings;
}

const files = walk(root);
const pages = [];
let changed = 0;
let longParagraphs = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const findings = auditParagraphs(html);
  if (findings.length) {
    const rel = path.relative(root, file).replaceAll(path.sep, "/");
    pages.push({ path: rel, longParagraphs: findings.length, maxCharacters: Math.max(...findings.map((item) => item.characters)), findings });
    longParagraphs += findings.length;
  }

  if (!html.includes("/scripts/readability.js")) {
    if (html.includes("</body>")) html = html.replace("</body>", `  ${scriptTag}\n  </body>`);
    else html += `\n${scriptTag}\n`;
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  thresholdCharacters: LONG_PARAGRAPH,
  htmlPagesScanned: files.length,
  pagesWithLongParagraphs: pages.length,
  longParagraphsFound: longParagraphs,
  pages
};

if (process.env.READABILITY_REPORT === "1") {
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
}

console.log(`[readability] scanned ${files.length} HTML pages; found ${longParagraphs} long paragraphs on ${pages.length} pages; injected formatter into ${changed} pages.`);