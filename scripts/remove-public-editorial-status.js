const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXCLUDED_DIRS = new Set([".git", ".github", ".netlify", "node_modules", "outputs", "work"]);

const BANNED_PUBLIC_MARKERS = [
  "data-editorial-checklist",
  '"editorialChecklist"',
  "Editorial Checklist",
  "Grammar reviewed",
  "Internal links checked",
  "External links checked",
  "Mobile reviewed",
  "Desktop reviewed",
  "Accessibility reviewed",
  "SEO reviewed",
  "Facts verified",
  "Lista de comprobación editorial",
  "Gramática revisada",
  "Enlaces internos revisados",
  "Enlaces externos revisados",
  "Móvil revisado",
  "Escritorio revisado",
  "Accesibilidad revisada",
  "SEO revisado",
  "Hechos verificados"
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function removeChecklistSections(html) {
  let removed = 0;
  const pattern = /\s*<(section|div)\b(?=[^>]*\bdata-editorial-checklist\b)[^>]*>[\s\S]*?<\/\1>/gi;
  const output = html.replace(pattern, () => {
    removed += 1;
    return "";
  });
  return { html: output, removed };
}

function removeChecklistFrontmatter(html) {
  let removed = 0;
  const pattern = /<script\b([^>]*\bclass=["'][^"']*\bguide-frontmatter\b[^"']*["'][^>]*)>([\s\S]*?)<\/script>/gi;
  const output = html.replace(pattern, (whole, attributes, rawJson) => {
    let data;
    try {
      data = JSON.parse(rawJson.trim());
    } catch (error) {
      if (/editorialChecklist/.test(rawJson)) {
        throw new Error(`Could not parse guide frontmatter containing editorialChecklist: ${error.message}`);
      }
      return whole;
    }
    if (!Object.prototype.hasOwnProperty.call(data, "editorialChecklist")) return whole;
    delete data.editorialChecklist;
    removed += 1;
    return `<script${attributes}>${JSON.stringify(data, null, 2)}\n        </script>`;
  });
  return { html: output, removed };
}

function assertClean(file, html) {
  const found = BANNED_PUBLIC_MARKERS.filter((marker) => html.includes(marker));
  if (found.length) {
    throw new Error(`${path.relative(ROOT, file)} still exposes internal editorial QA markers: ${found.join(", ")}`);
  }
}

let scanned = 0;
let changed = 0;
let sectionsRemoved = 0;
let metadataKeysRemoved = 0;

for (const file of walk(ROOT)) {
  scanned += 1;
  const original = fs.readFileSync(file, "utf8");
  const sectionResult = removeChecklistSections(original);
  const metadataResult = removeChecklistFrontmatter(sectionResult.html);
  const cleaned = metadataResult.html;

  assertClean(file, cleaned);
  sectionsRemoved += sectionResult.removed;
  metadataKeysRemoved += metadataResult.removed;

  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, "utf8");
    changed += 1;
  }
}

console.log(
  `Public editorial QA cleanup passed: ${scanned} HTML files scanned; ${changed} changed; ` +
    `${sectionsRemoved} checklist sections removed; ${metadataKeysRemoved} frontmatter keys removed.`
);
