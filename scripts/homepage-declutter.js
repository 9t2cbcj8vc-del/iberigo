const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const indexPath = path.join(ROOT, 'index.html');
const appPath = path.join(ROOT, 'app.js');

function replaceActionLabel(html, key, label) {
  const pattern = new RegExp(`(<(?:a|button)\\b[^>]*data-i18n="${key}"[^>]*>)[\\s\\S]*?(<\\/(?:a|button)>)`, 'g');
  return html.replace(pattern, `$1${label}$2`);
}

let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(
  /\s*<div class="hero-disclaimer">\s*<p[^>]*data-i18n="startDisclaimer"[^>]*>[\s\S]*?<\/p>\s*<\/div>/g,
  ''
);
html = replaceActionLabel(html, 'movingButton', 'Plan your move');
html = replaceActionLabel(html, 'vacationButton', 'Plan your visit');
html = replaceActionLabel(html, 'livingButton', 'Browse living guides');
fs.writeFileSync(indexPath, html, 'utf8');

let app = fs.readFileSync(appPath, 'utf8');
const actionLabels = {
  movingButton: { Explore: 'Plan your move', Explorar: 'Planifica tu mudanza' },
  vacationButton: { Explore: 'Plan your visit', Explorar: 'Planifica tu visita' },
  livingButton: { Explore: 'Browse living guides', Explorar: 'Guías para vivir' }
};

for (const [key, labels] of Object.entries(actionLabels)) {
  const pattern = new RegExp(`(["']?${key}["']?\\s*:\\s*)["']([^"']+)["']`, 'g');
  app = app.replace(pattern, (match, prefix, value) => {
    const replacement = labels[value];
    return replacement ? `${prefix}"${replacement}"` : match;
  });
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('homepage-declutter: removed duplicate legal note and clarified gateway actions');
