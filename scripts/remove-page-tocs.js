const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function removePageTocs(html) {
  let removed = 0;
  let widened = 0;
  let next = html;

  const patterns = [
    /\s*<(aside|details)\b[^>]*\bdata-guide-toc(?:\s|=|>)[^>]*>[\s\S]*?<\/\1>/gi,
    /\s*<details\b[^>]*class=(['"])[^'"]*\bguide-toc-mobile\b[^'"]*\1[^>]*>[\s\S]*?<\/details>/gi,
    /\s*<aside\b[^>]*class=(['"])[^'"]*\bguide-toc\b[^'"]*\1[^>]*>[\s\S]*?<\/aside>/gi,
  ];

  for (const pattern of patterns) {
    next = next.replace(pattern, () => {
      removed += 1;
      return '';
    });
  }

  if (removed) {
    next = next.replace(/class=(['"])guide-layout\1/g, (match, quote) => {
      widened += 1;
      return `class=${quote}guide-layout guide-layout--single${quote}`;
    });
  }

  return { html: next, removed, widened };
}

let changedFiles = 0;
let totalRemoved = 0;
let totalWidened = 0;

for (const file of walk(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  const result = removePageTocs(original);
  if (result.html === original) continue;

  fs.writeFileSync(file, result.html, 'utf8');
  changedFiles += 1;
  totalRemoved += result.removed;
  totalWidened += result.widened;
  const relative = path.relative(ROOT, file).split(path.sep).join('/');
  console.log(`remove-page-tocs: ${relative} (${result.removed} TOC block(s) removed, ${result.widened} layout(s) widened)`);
}

console.log(`remove-page-tocs: ${changedFiles} files changed, ${totalRemoved} TOC blocks removed, ${totalWidened} layouts widened`);
