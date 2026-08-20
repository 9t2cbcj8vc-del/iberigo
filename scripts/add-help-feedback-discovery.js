const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HELP_URLS = new Set(['/help-feedback/', '/es/help-feedback/']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function addFooterLink(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="site-footer"') || html.includes('data-help-feedback-footer')) return false;

  const isSpanish = /<html\s+lang=["']es/i.test(html);
  const href = isSpanish ? '/es/help-feedback/' : '/help-feedback/';
  const label = isSpanish ? 'Ayuda y comentarios' : 'Help & Feedback';
  const link = `<a class="footer-help-feedback-link" href="${href}" data-help-feedback-footer>${label}</a>`;

  if (html.includes(`href="${href}"`)) return false;

  const legalMarker = '<div class="site-footer-legal">';
  if (html.includes(legalMarker)) {
    html = html.replace(legalMarker, `${link}\n        ${legalMarker}`);
  } else {
    html = html.replace('</footer>', `${link}\n      </footer>`);
  }
  fs.writeFileSync(file, html);
  return true;
}

function fixFeedbackSuccessActions() {
  const replacements = [
    {
      file: path.join(ROOT, 'help-feedback', 'index.html'),
      from: ['action="/help-feedback/thanks/"', 'action="/help-feedback/thanks/index.html"'],
      to: 'action="/feedback-thanks.html"'
    },
    {
      file: path.join(ROOT, 'es', 'help-feedback', 'index.html'),
      from: ['action="/es/help-feedback/thanks/"', 'action="/es/help-feedback/thanks/index.html"'],
      to: 'action="/es-feedback-thanks.html"'
    }
  ];

  let changed = 0;
  for (const replacement of replacements) {
    if (!fs.existsSync(replacement.file)) continue;
    let html = fs.readFileSync(replacement.file, 'utf8');
    if (html.includes(replacement.to)) continue;

    const current = replacement.from.find((candidate) => html.includes(candidate));
    if (!current) {
      throw new Error(`Expected feedback form action not found in ${path.relative(ROOT, replacement.file)}`);
    }

    html = html.replace(current, replacement.to);
    fs.writeFileSync(replacement.file, html);
    changed += 1;
  }
  return changed;
}

function updateSearchIndex() {
  const file = path.join(ROOT, 'search-index.json');
  if (!fs.existsSync(file)) return;
  const entries = JSON.parse(fs.readFileSync(file, 'utf8')).filter((entry) => !HELP_URLS.has(entry.url));
  entries.push(
    {
      title: 'Help & Feedback — IberiGo',
      description: 'Ask a question, report outdated information or a technical problem, suggest a guide, or send feedback to IberiGo.',
      url: '/help-feedback/',
      language: 'en',
      type: 'support page',
      headings: ['Help & Feedback', 'Ask a question', 'Report outdated information', 'Report a technical problem', 'Suggest a guide', 'Send us a message'],
      keywords: ['help', 'feedback', 'question', 'correction', 'report', 'suggestion'],
      text: 'Questions, corrections, feedback and suggestions for IberiGo. Report outdated information, technical problems or suggest a new guide. Email is optional.'
    },
    {
      title: 'Ayuda y comentarios — IberiGo',
      description: 'Haz una pregunta, avisa de información desactualizada o de un problema técnico, sugiere una guía o envía comentarios a IberiGo.',
      url: '/es/help-feedback/',
      language: 'es',
      type: 'support page',
      headings: ['Ayuda y comentarios', 'Haz una pregunta', 'Avisa de información desactualizada', 'Informa de un problema técnico', 'Sugiere una guía', 'Envíanos un mensaje'],
      keywords: ['ayuda', 'comentarios', 'pregunta', 'corrección', 'problema', 'sugerencia'],
      text: 'Preguntas, correcciones, comentarios y sugerencias para IberiGo. Avisa de información desactualizada, problemas técnicos o sugiere una nueva guía. El correo electrónico es opcional.'
    }
  );
  fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n');
}

function updateSitemap(fileName) {
  const file = path.join(ROOT, fileName);
  if (!fs.existsSync(file)) return;
  let xml = fs.readFileSync(file, 'utf8');
  const blocks = [
    '  <url>\n    <loc>https://iberigo.eu/help-feedback/</loc>\n    <lastmod>2026-08-20</lastmod>\n  </url>',
    '  <url>\n    <loc>https://iberigo.eu/es/help-feedback/</loc>\n    <lastmod>2026-08-20</lastmod>\n  </url>'
  ];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)/)[1];
    if (!xml.includes(`<loc>${loc}</loc>`)) xml = xml.replace('</urlset>', `${block}\n</urlset>`);
  }
  fs.writeFileSync(file, xml);
}

let touched = 0;
for (const file of walk(ROOT)) if (addFooterLink(file)) touched += 1;
const fixedActions = fixFeedbackSuccessActions();
updateSearchIndex();
updateSitemap('sitemap.xml');
updateSitemap('sitemap-pages.xml');
console.log(`Help & Feedback discovery applied to ${touched} footer(s); fixed ${fixedActions} success action(s).`);
