const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SCRIPT_TAG = '<script src="/scripts/language-switch-fix.js?v=20260815-language-switch-1" defer></script>';
const SCRIPT_RE = /\s*<script\s+src=["']\/scripts\/language-switch-fix\.js(?:\?[^"']*)?["']\s+defer><\/script>/gi;
const SKIP_DIRS = new Set([".git", "node_modules"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) updateHtml(path.join(dir, entry.name));
  }
}

function updateHtml(file) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("</body>")) return;

  const withoutOldTag = html.replace(SCRIPT_RE, "");
  const updated = withoutOldTag.replace("</body>", `    ${SCRIPT_TAG}\n  </body>`);
  if (updated !== html) fs.writeFileSync(file, updated);
}

walk(ROOT);
console.log("Baked persistent EN/ES language switching into HTML pages.");
