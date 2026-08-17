const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  ['living-in-spain/staying-long-term/index.html', 'es', '/es/living-in-spain/staying-long-term/'],
  ['es/living-in-spain/staying-long-term/index.html', 'en', '/living-in-spain/staying-long-term/'],
  ['moving-to-spain/documents-apostilles-translations/index.html', 'es', '/es/moving-to-spain/documents-apostilles-translations/'],
  ['es/moving-to-spain/documents-apostilles-translations/index.html', 'en', '/moving-to-spain/documents-apostilles-translations/']
];

for (const [relative, lang, target] of pages) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) throw new Error(`Generated guide missing: ${relative}`);
  let html = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`(<button[^>]*data-lang="${lang}"[^>]*data-lang-href=")[^"]+("[^>]*>)`, 'i');
  if (!re.test(html)) throw new Error(`Language switch target missing in ${relative}`);
  html = html.replace(re, `$1${target}$2`);
  fs.writeFileSync(file, html);
}

console.log('[new-guides] language switch targets aligned with EN/ES peers');
