const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPANISH_ROOTS = ['es', 'guides/es', 'the-spain-files/es'];
const CONTENT_FAMILIES = [
  '/moving-to-spain/',
  '/living-in-spain/',
  '/guides/',
  '/the-spain-files/',
  '/start-here/',
  '/help-feedback/'
];
const SPANISH_ALIASES = new Map([
  ['/living-in-spain/digital-certificate/', '/guides/es/digital/'],
  ['/living-in-spain/social-security/', '/guides/es/social-security/'],
  ['/living-in-spain/taxes/', '/guides/es/taxes/'],
  ['/the-spain-files/', '/the-spain-files/es/']
]);

function walkHtml(relativeRoot) {
  const root = path.join(ROOT, relativeRoot);
  if (!fs.existsSync(root)) return [];
  const files = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
    }
  }
  return files;
}

function splitHref(href) {
  const match = href.match(/^([^?#]*)([?#][\s\S]*)?$/);
  return { route: match ? match[1] : href, suffix: match && match[2] ? match[2] : '' };
}

function routeFile(route) {
  if (!route.startsWith('/') || route.startsWith('//')) return null;
  let rel = route.slice(1);
  if (!rel || rel.endsWith('/')) rel += 'index.html';
  return path.join(ROOT, rel);
}

function routeExists(route) {
  const file = routeFile(route);
  return Boolean(file && fs.existsSync(file));
}

function routeIsSpanish(route) {
  const file = routeFile(route);
  if (!file || !fs.existsSync(file)) return false;
  try {
    const head = fs.readFileSync(file, 'utf8').slice(0, 2400);
    return /<html\b[^>]*\blang=(['"])es(?:-[^'\"]+)?\1/i.test(head);
  } catch {
    return false;
  }
}

function spanishCounterpart(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  const { route, suffix } = splitHref(href);
  if (
    route.startsWith('/es/') ||
    route.startsWith('/guides/es/') ||
    route.startsWith('/the-spain-files/es/') ||
    routeIsSpanish(route)
  ) return null;

  const candidates = [];
  if (SPANISH_ALIASES.has(route)) candidates.push(SPANISH_ALIASES.get(route));
  if (route === '/start-here/' || route === '/start-here/index.html') candidates.push('/es/start-here/');
  if (route === '/help-feedback/' || route === '/help-feedback/index.html') candidates.push('/es/help-feedback/');
  if (route === '/the-spain-files/' || route === '/the-spain-files/index.html') candidates.push('/the-spain-files/es/');
  if (route.startsWith('/moving-to-spain/')) candidates.push(`/es${route}`);
  if (route.startsWith('/living-in-spain/')) candidates.push(`/es${route}`);
  if (route.startsWith('/guides/')) candidates.push(`/guides/es/${route.slice('/guides/'.length)}`);
  if (route.startsWith('/the-spain-files/') && route !== '/the-spain-files/') {
    candidates.push(`/the-spain-files/es/${route.slice('/the-spain-files/'.length)}`);
  }

  for (const candidate of candidates) {
    if (routeExists(candidate)) return candidate + suffix;
  }
  return null;
}

function isLanguageControl(tag, inner) {
  const visible = inner.replace(/<[^>]+>/g, '').trim();
  return /language-switch|lang-switch|\bdata-lang\s*=|\bhreflang\s*=/i.test(tag) || /^(?:EN|English)$/i.test(visible);
}

function cleanEnglishOnlyLabel(inner) {
  return inner
    .replace(/\s*\((?:solo\s+)?en\s+ingl[eé]s\)/gi, '')
    .replace(/\s*\(en\s+English\)/gi, '');
}

function internalEnglishContentLinks(html) {
  const links = [];
  const re = /<a\b([^>]*?)\bhref=(['"])(\/[^'"#][^'"]*)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[0];
    const href = match[3];
    const inner = match[5];
    if (isLanguageControl(tag, inner)) continue;
    const { route } = splitHref(href);
    if (
      route.startsWith('/es/') ||
      route.startsWith('/guides/es/') ||
      route.startsWith('/the-spain-files/es/') ||
      routeIsSpanish(route)
    ) continue;
    if (CONTENT_FAMILIES.some(prefix => route.startsWith(prefix))) links.push(href);
  }
  return links;
}

function removeStaleLanguageNote(html) {
  const unresolved = internalEnglishContentLinks(html).filter(href => !spanishCounterpart(href));
  if (unresolved.length) return { html, removed: false, unresolved };

  const sectionRe = /\s*<section\b[^>]*aria-labelledby=(['"])languageNote\1[^>]*>[\s\S]*?<\/section>/gi;
  if (!sectionRe.test(html)) return { html, removed: false, unresolved };
  html = html.replace(sectionRe, '');
  html = html.replace(/<li>\s*<a\b[^>]*href=(['"])#languageNote\1[^>]*>[\s\S]*?<\/a>\s*<\/li>/gi, '');

  if (!/data-guide-toc-link[^>]*aria-current=(['"])true\1/i.test(html)) {
    html = html.replace(/(<a\b[^>]*data-guide-toc-link)(?![^>]*aria-current=)([^>]*>)/i, '$1 aria-current="true"$2');
  }
  return { html, removed: true, unresolved };
}

const files = [...new Set(SPANISH_ROOTS.flatMap(walkHtml))];
let rewrittenLinks = 0;
let changedPages = 0;
let removedNotes = 0;
const rewrites = [];
const unresolved = [];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  const page = '/' + path.relative(ROOT, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const anchorRe = /<a\b([^>]*?)\bhref=(['"])(\/[^'"]*)\2([^>]*)>([\s\S]*?)<\/a>/gi;

  html = html.replace(anchorRe, (full, before, quote, href, after, inner) => {
    if (isLanguageControl(full, inner)) return full;
    const counterpart = spanishCounterpart(href);
    if (!counterpart) return full;
    rewrittenLinks += 1;
    rewrites.push(`${page}: ${href} -> ${counterpart}`);
    const cleanedInner = cleanEnglishOnlyLabel(inner);
    return `<a${before}href=${quote}${counterpart}${quote}${after}>${cleanedInner}</a>`;
  });

  const noteResult = removeStaleLanguageNote(html);
  html = noteResult.html;
  if (noteResult.removed) removedNotes += 1;
  for (const href of noteResult.unresolved) unresolved.push(`${page}: ${href}`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    changedPages += 1;
  }
}

console.log(`[spanish-parity] scanned ${files.length} Spanish HTML pages`);
console.log(`[spanish-parity] rewrote ${rewrittenLinks} avoidable English internal links across ${changedPages} pages`);
console.log(`[spanish-parity] removed ${removedNotes} stale English-only language notices`);
for (const line of rewrites) console.log(`[spanish-parity] rewrite ${line}`);
if (unresolved.length) {
  const unique = [...new Set(unresolved)].sort();
  console.log(`[spanish-parity] ${unique.length} genuinely English-only/internal fallbacks remain:`);
  for (const line of unique) console.log(`[spanish-parity] keep ${line}`);
}
