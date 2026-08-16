const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules']);
let changedFiles = 0;
let totalEdits = 0;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function normalizeHeading(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('es');
}

function countReplace(input, regex, replacement) {
  let count = 0;
  const output = input.replace(regex, (...args) => {
    count += 1;
    return typeof replacement === 'function' ? replacement(...args) : replacement;
  });
  return { output, count };
}

function removeDuplicateGuideKickers(html) {
  let edits = 0;
  const output = html.replace(
    /<span class="guide-kicker">([^<]+)<\/span>\s*(<h1\b[^>]*>([^<]+)<\/h1>)/g,
    (match, kicker, h1Markup, heading) => {
      if (normalizeHeading(kicker) !== normalizeHeading(heading)) return match;
      edits += 1;
      return h1Markup;
    }
  );
  return { output, count: edits };
}

function removeGenericGuideSummary(html) {
  const genericSummary = /\s*<aside class="guide-hero-card" aria-label="Guide summary">\s*<strong>About this guide<\/strong>\s*<p>This page is part of the IberiGo guide system\.<\/p>\s*<\/aside>/g;
  const removed = countReplace(html, genericSummary, '');
  if (!removed.count) return removed;

  const widened = countReplace(
    removed.output,
    /<section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle">/,
    '<section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle" style="grid-template-columns: minmax(0, 1fr);">'
  );
  return { output: widened.output, count: removed.count + widened.count };
}

function removeDuplicateFooterReview(html) {
  const footerStart = html.indexOf('<footer class="site-footer">');
  if (footerStart < 0) return { output: html, count: 0 };

  const beforeFooter = html.slice(0, footerStart);
  const hasPageReview =
    /class="last-reviewed"/.test(beforeFooter) ||
    /class="helper-note"[^>]*>\s*(?:Last reviewed|Última revisión)/i.test(beforeFooter);
  if (!hasPageReview) return { output: html, count: 0 };

  let edits = 0;
  const output = html.replace(
    /<div class="site-footer-legal">([\s\S]*?)<\/div>/g,
    (block) => {
      let next = block;
      const byKey = countReplace(
        next,
        /\s*<p[^>]*data-i18n="footerReviewed"[^>]*>[\s\S]*?<\/p>/g,
        ''
      );
      next = byKey.output;
      edits += byKey.count;
      if (byKey.count) return next;

      const byText = countReplace(
        next,
        /\s*<p[^>]*>\s*(?:Last reviewed|Última revisión)\s*:[\s\S]*?<\/p>/gi,
        ''
      );
      edits += byText.count;
      return byText.output;
    }
  );
  return { output, count: edits };
}

function cleanStartHere(html, relativePath) {
  if (!/(^|\/)(?:es\/)?start-here\/index\.html$/.test(relativePath)) {
    return { output: html, count: 0 };
  }

  let edits = 0;
  let next = html;
  const section = countReplace(
    next,
    /\s*<section class="guide-section" aria-labelledby="howGuidesWork">[\s\S]*?<\/section>/g,
    ''
  );
  next = section.output;
  edits += section.count;

  const tocLinks = countReplace(
    next,
    /<li><a href="#howGuidesWork"[^>]*>[\s\S]*?<\/a><\/li>/g,
    ''
  );
  next = tocLinks.output;
  edits += tocLinks.count;

  return { output: next, count: edits };
}

function cleanSpainFiles(html, relativePath) {
  if (!/(^|\/)the-spain-files\/(?:es\/)?index\.html$/.test(relativePath)) {
    return { output: html, count: 0 };
  }

  let edits = 0;
  let next = html;
  const comingSoon = countReplace(
    next,
    /\s*<div class="sf-grid">\s*<article class="sf-card">[\s\S]*?<span class="sf-coming">[\s\S]*?<\/article>\s*<\/div>/g,
    ''
  );
  next = comingSoon.output;
  edits += comingSoon.count;

  const replacements = [
    [
      'A calm overview of the no-work residence route.',
      'Who the non-lucrative visa is for, the main requirements, and what to prepare before applying.'
    ],
    [
      'Una explicación clara de la residencia sin actividad laboral.',
      'Para quién es el visado no lucrativo, sus requisitos principales y qué preparar antes de solicitarlo.'
    ]
  ];

  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.replace(from, to);
      edits += 1;
    }
  }

  return { output: next, count: edits };
}

function cleanSupportHtml(html, relativePath) {
  if (relativePath !== 'support/index.html') return { output: html, count: 0 };

  let edits = 0;
  let next = html;

  const bodyTwo = countReplace(next, /\s*<p data-i18n="bodyTwo">[\s\S]*?<\/p>/g, '');
  next = bodyTwo.output;
  edits += bodyTwo.count;

  const helpsFree = countReplace(next, /\s*<li data-i18n="helpsFree">[\s\S]*?<\/li>/g, '');
  next = helpsFree.output;
  edits += helpsFree.count;

  const replacements = [
    [
      'IberiGo is a free independent guide created to help people understand moving, travelling and settling in Spain.',
      'IberiGo turns official Spanish information into plain-language guides, practical checklists and clear starting points.'
    ],
    [
      'If IberiGo has helped you, you can make a voluntary contribution to support the maintenance of the website.',
      'If IberiGo has helped you, you can make an optional contribution toward keeping the site maintained and free.'
    ],
    [
      'IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.',
      'If IberiGo helps you, you can support its maintenance with a voluntary contribution.'
    ],
    ['© 2026 IberiGo. Free to use. Not legal advice.', '© 2026 IberiGo. Not legal advice.']
  ];

  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.replaceAll(from, to);
      edits += 1;
    }
  }

  return { output: next, count: edits };
}

function cleanSupportJs(js, relativePath) {
  if (relativePath !== 'support/support.js') return { output: js, count: 0 };

  const replacements = [
    [
      'bodyOne: "IberiGo is a free independent guide created to help people understand moving, travelling and settling in Spain."',
      'bodyOne: "IberiGo turns official Spanish information into plain-language guides, practical checklists and clear starting points."'
    ],
    [
      'bodyThree: "If IberiGo has helped you, you can make a voluntary contribution to support the maintenance of the website."',
      'bodyThree: "If IberiGo has helped you, you can make an optional contribution toward keeping the site maintained and free."'
    ],
    [
      'footerSupportText: "IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution."',
      'footerSupportText: "If IberiGo helps you, you can support its maintenance with a voluntary contribution."'
    ],
    [
      'footerLegal: "© 2026 IberiGo. Free to use. Not legal advice."',
      'footerLegal: "© 2026 IberiGo. Not legal advice."'
    ],
    [
      'bodyOne: "IberiGo es una guía independiente y gratuita creada para ayudar a las personas a entender cómo mudarse, viajar y establecerse en España."',
      'bodyOne: "IberiGo convierte la información oficial española en guías claras, listas prácticas y puntos de partida útiles."'
    ],
    [
      'bodyThree: "Si IberiGo te ha ayudado, puedes hacer una contribución voluntaria para apoyar el mantenimiento del sitio."',
      'bodyThree: "Si IberiGo te ha ayudado, puedes hacer una contribución opcional para ayudar a mantener el sitio actualizado y gratuito."'
    ],
    [
      'footerSupportText: "IberiGo es gratuito. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria."',
      'footerSupportText: "Si IberiGo te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria."'
    ],
    [
      'footerLegal: "© 2026 IberiGo. Gratuito. No es asesoramiento legal."',
      'footerLegal: "© 2026 IberiGo. No es asesoramiento legal."'
    ]
  ];

  let edits = 0;
  let next = js;
  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.replace(from, to);
      edits += 1;
    }
  }
  return { output: next, count: edits };
}

function cleanAppJs(js, relativePath) {
  if (relativePath !== 'app.js') return { output: js, count: 0 };

  const replacements = [
    [
      'IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.',
      'If IberiGo helps you, you can support its maintenance with a voluntary contribution.'
    ],
    ['© 2026 IberiGo. Free to use. Not legal advice.', '© 2026 IberiGo. Not legal advice.'],
    [
      'IberiGo es gratuito. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.',
      'Si IberiGo te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.'
    ],
    ['© 2026 IberiGo. Gratuito. No es asesoramiento legal.', '© 2026 IberiGo. No es asesoramiento legal.']
  ];

  let edits = 0;
  let next = js;
  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.replaceAll(from, to);
      edits += 1;
    }
  }
  return { output: next, count: edits };
}

function cleanHtml(html, relativePath) {
  let next = html;
  let edits = 0;

  const passes = [
    removeDuplicateGuideKickers,
    removeGenericGuideSummary,
    (value) => removeDuplicateFooterReview(value),
    (value) => cleanStartHere(value, relativePath),
    (value) => cleanSpainFiles(value, relativePath),
    (value) => cleanSupportHtml(value, relativePath)
  ];

  for (const pass of passes) {
    const result = pass(next);
    next = result.output;
    edits += result.count;
  }

  if (next.includes('Última revisión: July 2026')) {
    next = next.replaceAll('Última revisión: July 2026', 'Última revisión: julio de 2026');
    edits += 1;
  }

  return { output: next, count: edits };
}

for (const file of walk(ROOT)) {
  const relativePath = path.relative(ROOT, file).split(path.sep).join('/');
  if (!relativePath.endsWith('.html') && relativePath !== 'app.js' && relativePath !== 'support/support.js') continue;

  const original = fs.readFileSync(file, 'utf8');
  let result;
  if (relativePath.endsWith('.html')) result = cleanHtml(original, relativePath);
  else if (relativePath === 'app.js') result = cleanAppJs(original, relativePath);
  else result = cleanSupportJs(original, relativePath);

  if (result.output !== original) {
    fs.writeFileSync(file, result.output, 'utf8');
    changedFiles += 1;
    totalEdits += result.count;
    console.log(`content-declutter: ${relativePath} (${result.count} edits)`);
  }
}

console.log(`content-declutter: ${changedFiles} files changed, ${totalEdits} edits applied`);
