// Mobile UX layer, loaded last by scripts/site-search.js:
//  1. compact "Jump to" links near the top of long guides (skipped when the page
//     already has .guide-jump-links);
//  2. a subtle swipe hint above tables that are wider than the screen (mobile only).
// 44px tap targets are handled in styles-mobile-ux.css.
(function () {
  if (window.__iberigoMobileUx) return;
  window.__iberigoMobileUx = true;

  const lang = (document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  const copy = lang === 'es'
    ? { jump: 'Ir a', nav: 'Secciones de esta guía', swipe: 'Desliza para ver más →' }
    : { jump: 'Jump to', nav: 'Sections in this guide', swipe: 'Swipe to see more →' };

  const MIN_SECTIONS = 5;
  const MIN_SCREENS = 8;
  const MAX_LINKS = 8;
  const SKIP_TEXT = /^(sources?|official sources?|fuentes( oficiales)?|continue|sigue|related|relacionad|where should we begin|documents that often slow)/i;

  const visible = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  const slug = (text) => String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'section';

  function label(h) {
    const t = (h.textContent || '').replace(/\s+/g, ' ').trim();
    return t.length > 48 ? t.slice(0, 46).replace(/\s+\S*$/, '') + '…' : t;
  }

  function buildJumps() {
    if (document.querySelector('.guide-jump-links, .page-jumps')) return;
    const main = document.querySelector('main');
    if (!main) return;
    if (document.documentElement.scrollHeight < window.innerHeight * MIN_SCREENS) return;

    const heads = [...main.querySelectorAll('h2')].filter((h) => visible(h)
      && !h.closest('aside, nav, footer, header, details:not([open]), [data-home-card], .situation-card, dialog'));
    const targets = heads.filter((h) => !SKIP_TEXT.test((h.textContent || '').trim()));
    if (targets.length < MIN_SECTIONS) return;

    // Keep a "Short answer" block above the list; link the sections after it.
    let anchor = targets[0];
    let linkable = targets;
    if (/^(short answer|quick answer|respuesta (corta|rápida|breve))/i.test(anchor.textContent.trim())) {
      linkable = targets.filter((h) => !/^(short answer|quick answer|respuesta (corta|rápida|breve))/i.test(h.textContent.trim()));
      anchor = linkable[0];
    }
    if (linkable.length < MIN_SECTIONS - 1) return;

    const used = new Set();
    const items = linkable.slice(0, MAX_LINKS).map((h) => {
      if (!h.id) {
        let id = slug(h.textContent);
        while (document.getElementById(id) || used.has(id)) id += '-x';
        h.id = id;
      }
      used.add(h.id);
      h.setAttribute('data-page-jump-target', '');
      return `<li><a href="${location.pathname}${location.search}#${h.id}" data-jump="${h.id}">${label(h).replace(/</g, '&lt;')}</a></li>`;
    });

    const nav = document.createElement('nav');
    nav.className = 'page-jumps';
    nav.setAttribute('aria-label', copy.nav);
    nav.setAttribute('data-page-jumps', '');
    nav.innerHTML = `<p class="page-jumps__label">${copy.jump}</p><ul>${items.join('')}</ul>`;

    // Some pages set <base href="/">, so handle the jump in-page rather than
    // letting the browser resolve the hash against the site root.
    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-jump]');
      if (!link) return;
      const target = document.getElementById(link.dataset.jump);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(history.state, '', `#${target.id}`.replace(/^/, location.pathname + location.search)); } catch (e) { /* ignore */ }
    });

    // Insert before the section that holds the first linked heading.
    let host = anchor;
    const section = anchor.closest('section');
    if (section && main.contains(section) && section.querySelector('h2') === anchor) host = section;
    host.parentNode.insertBefore(nav, host);
  }

  function scrollerFor(table) {
    let el = table;
    while (el && el !== document.body) {
      const ox = getComputedStyle(el).overflowX;
      if (ox === 'auto' || ox === 'scroll') return el;
      el = el.parentElement;
    }
    return null;
  }

  const hints = [];
  function buildHints() {
    document.querySelectorAll('main table').forEach((table) => {
      if (table.dataset.swipeHint) return;
      let scroller = scrollerFor(table);
      if (!scroller) {
        scroller = document.createElement('div');
        scroller.className = 'table-swipe-wrap';
        scroller.style.overflowX = 'auto';
        scroller.style.maxWidth = '100%';
        table.parentNode.insertBefore(scroller, table);
        scroller.appendChild(table);
      }
      table.dataset.swipeHint = '1';
      const hint = document.createElement('p');
      hint.className = 'table-swipe-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.textContent = copy.swipe;
      hint.hidden = true;
      scroller.parentNode.insertBefore(hint, scroller);
      scroller.addEventListener('scroll', () => {
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4) hint.classList.add('is-done');
      }, { passive: true });
      hints.push({ scroller, hint });
    });
    updateHints();
  }

  function updateHints() {
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    hints.forEach(({ scroller, hint }) => {
      hint.hidden = !(mobile && visible(scroller) && scroller.scrollWidth > scroller.clientWidth + 4);
    });
  }

  function run() {
    try { buildJumps(); } catch (e) { /* never break the page */ }
    try { buildHints(); } catch (e) { /* never break the page */ }
  }

  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(updateHints, 150); });

  if (document.readyState === 'complete') setTimeout(run, 50);
  else window.addEventListener('load', () => setTimeout(run, 50));
})();
