const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "app.js");
const sourcePath = path.join(root, "scripts", "roadmap-next-actions.js");
const marker = "/* IberiGo roadmap full next-actions upgrade · August 2026 */";
const assetVersion = "20260816-roadmap-next-actions-1";
const ignoredDirs = new Set([".git", "node_modules"]);

let app = fs.readFileSync(appPath, "utf8");
if (!app.includes(marker)) {
  app += `\n\n${marker}\n${fs.readFileSync(sourcePath, "utf8")}\n`;
  fs.writeFileSync(appPath, app);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) updateHtml(path.join(dir, entry.name));
  }
}

function updateHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("app.js")) return;
  const updated = html.replace(/(src=["'](?:\/)?app\.js\?v=)[^"']+/g, `$1${assetVersion}`);
  if (updated !== html) fs.writeFileSync(file, updated);
}

walk(root);
console.log(`[roadmap-next-actions] bundled upgrade and set app.js cache key ${assetVersion}.`);
