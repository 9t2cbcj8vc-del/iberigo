const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VERSION = '20260908-intent-1';
const MARKER = 'data-iberigo-intent-discovery';

const STYLE = `
<style data-iberigo-intent-discovery-style>
  .intent-discovery { width: min(1080px, calc(100% - 32px)); margin: 1.25rem auto; padding: clamp(1.2rem, 3vw, 1.7rem); border: 1px solid rgba(166,74,54,.14); border-radius: 20px; background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(253,240,220,.68)); box-shadow: 0 16px 42px rgba(42,32,25,.07); }
  .intent-discovery[data-intent-surface="home"] { margin-top: .2rem; margin-bottom: 1.4rem; }
  .intent-discovery-kicker { margin: 0 0 .42rem; color: #a64a36; font-size: .74rem; font-weight: 900; letter-spacing: .075em; text-transform: uppercase; }
  .intent-discovery h2 { margin: 0; color: #1b2030; font-size: clamp(1.45rem,3.6vw,2.05rem); line-height: 1.12; }
  .intent-discovery-intro { max-width: 70ch; margin: .55rem 0 1rem; color: rgba(27,32,48,.7); line-height: 1.62; }
  .intent-discovery-input-wrap { position: relative; }
  .intent-discovery-input-wrap svg { position: absolute; left: 1rem; top: 50%; width: 1.05rem; height: 1.05rem; transform: translateY(-50%); color: #a64a36; pointer-events: none; }
  .intent-discovery input { width: 100%; min-height: 3.35rem; box-sizing: border-box; padding: .78rem 1rem .78rem 2.75rem; border: 1px solid rgba(166,74,54,.22); border-radius: 999px; background: #fff; color: #1b2030; font: inherit; font-size: 1rem; }
  .intent-discovery input:focus { outline: 3px solid rgba(166,74,54,.22); outline-offset: 2px; }
  .intent-discovery-examples-label { margin: .78rem 0 .45rem; color: rgba(27,32,48,.58); font-size: .82rem; font-weight: 800; }
  .intent-discovery-examples { display: flex; flex-wrap: wrap; gap: .45rem; }
  .intent-discovery-examples button { min-height: 2.35rem; padding: .48rem .72rem; border: 1px solid rgba(166,74,54,.16); border-radius: 999px; background: rgba(255,255,255,.84); color: #7f3b2e; font: inherit; font-size: .82rem; font-weight: 800; cursor: pointer; }
  .intent-discovery-examples button:hover { border-color: rgba(166,74,54,.34); background: #fff; }
  .intent-discovery-examples button:focus-visible, .intent-discovery-result:focus-visible, .intent-discovery-fallback:focus-visible { outline: 3px solid rgba(166,74,54,.26); outline-offset: 3px; }
  .intent-discovery-status { margin: .9rem 0 .55rem; color: rgba(27,32,48,.6); font-size: .88rem; font-weight: 800; }
  .intent-discovery-results { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .65rem; }
  .intent-discovery-result { display: flex; min-width: 0; flex-direction: column; gap: .35rem; padding: .9rem; border: 1px solid rgba(166,74,54,.12); border-radius: 15px; background: rgba(255,255,255,.82); color: inherit; text-decoration: none; }
  .intent-discovery-result.is-primary { border-color: rgba(166,74,54,.3); background: #fff; box-shadow: 0 10px 26px rgba(42,32,25,.06); }
  .intent-discovery-result > span { color: #a64a36; font-size: .69rem; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; }
  .intent-discovery-result strong { color: #1b2030; font-size: .98rem; line-height: 1.3; }
  .intent-discovery-result small { flex: 1; color: rgba(27,32,48,.68); font-size: .84rem; line-height: 1.48; overflow-wrap: break-word; }
  .intent-discovery-result b { margin-top: .25rem; color: #a64a36; font-size: .82rem; }
  .intent-discovery-footer { margin: .8rem 0 0; }
  .intent-discovery-fallback { color: #a64a36; font-size: .88rem; font-weight: 900; text-underline-offset: 3px; }
  @media (max-width:760px) { .intent-discovery { width: min(100% - 20px,1080px); border-radius: 17px; } .intent-discovery-results { grid-template-columns: 1fr; } .intent-discovery-examples { flex-wrap: nowrap; overflow-x: auto; padding-bottom: .2rem; scrollbar-width: thin; } .intent-discovery-examples button { flex: 0 0 auto; } }
</style>`;

const PLACEMENT_SCRIPT = `<script data-iberigo-intent-discovery-script>
(function () {
  function isStartHere() {
    var path = window.location.pathname.replace(/\\/index\\.html$/, '/');
    return path === '/start-here/' || path === '/es/start-here/';
  }
  function placeStartHereIntent() {
    var intent = document.querySelector('[data-iberigo-intent-discovery][data-intent-surface="start-here"]');
    var groups = document.querySelector('.overhaul-directory-groups');
    if (!intent || !groups || intent.parentElement !== groups.parentElement) return false;
    if (groups.previousElementSibling !== intent) groups.parentElement.insertBefore(intent, groups);
    return groups.previousElementSibling === intent;
  }
  function boot() {
    if (!isStartHere()) return;
    if (placeStartHereIntent()) return;
    var root = document.querySelector('.guide-content') || document.body;
    if (!root || typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(function () {
      if (placeStartHereIntent()) observer.disconnect();
    });
    observer.observe(root, { childList: true });
    window.addEventListener('load', function () {
      if (placeStartHereIntent()) observer.disconnect();
    }, { once: true });
    window.setTimeout(function () {
      placeStartHereIntent();
      observer.disconnect();
    }, 3000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
</script>`;

function markup(surface, lang) {
  return `<section class="intent-discovery" ${MARKER} data-intent-surface="${surface}" data-intent-lang="${lang}" aria-labelledby="intentDiscoveryTitle-${surface}-${lang}">
    <p class="intent-discovery-kicker" data-intent-kicker>Find the right procedure</p>
    <h2 id="intentDiscoveryTitle-${surface}-${lang}" data-intent-title>What do you need to do?</h2>
    <p class="intent-discovery-intro" data-intent-intro>Describe your situation in your own words. IberiGo will point you to the most useful starting guide.</p>
    <div class="intent-discovery-input-wrap"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input type="search" autocomplete="off" data-intent-input aria-describedby="intentDiscoveryStatus-${surface}-${lang}" /></div>
    <p class="intent-discovery-examples-label" data-intent-examples-label>Try an example</p>
    <div class="intent-discovery-examples" data-intent-examples aria-label="Example searches"></div>
    <p class="intent-discovery-status" id="intentDiscoveryStatus-${surface}-${lang}" data-intent-status role="status" aria-live="polite">Start typing or choose an example.</p>
    <div class="intent-discovery-results" data-intent-results></div>
    <p class="intent-discovery-footer"><a class="intent-discovery-fallback" data-intent-fallback href="/search/">Search all IberiGo guides</a></p>
  </section>`;
}

function clean(html) {
  html = html.replace(/\s*<style\b[^>]*data-iberigo-intent-discovery-style[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/\s*<script\b[^>]*data-iberigo-intent-discovery-script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\s*<script\b[^>]*data-iberigo-intent-discovery-script[^>]*><\/script>/gi, '');
  html = html.replace(/\s*<section\b[^>]*data-iberigo-intent-discovery[^>]*>[\s\S]*?<\/section>/gi, '');
  return html;
}

function injectCommon(html) {
  if (!html.includes('</head>') || !html.includes('</body>')) throw new Error('Page shell missing head/body close tags');
  html = html.replace(/\s*<\/head>/i, `\n${STYLE}\n  </head>`);
  html = html.replace(/\s*<\/body>/i, `\n    <script src="/intent-discovery.js?v=${VERSION}" defer data-iberigo-intent-discovery-script></script>\n    <script src="/intent-discovery-rules.js?v=${VERSION}" defer data-iberigo-intent-discovery-script></script>\n    ${PLACEMENT_SCRIPT}\n  </body>`);
  return html;
}

function injectHome(html) {
  const headingStart = html.search(/<div\b[^>]*class="[^"]*section-heading[^"]*"[^>]*>/i);
  if (headingStart < 0) throw new Error('Homepage intro heading block not found');
  const headingEndStart = html.indexOf('</div>', headingStart);
  if (headingEndStart < 0) throw new Error('Homepage intro heading block does not close');
  const insertAt = headingEndStart + '</div>'.length;
  return `${html.slice(0, insertAt)}\n\n          ${markup('home','en')}\n${html.slice(insertAt)}`;
}

function injectStartHere(html, lang) {
  const heroStart = html.search(/<section\b[^>]*class="[^"]*guide-hero[^"]*"[^>]*>/i);
  if (heroStart < 0) throw new Error(`Start Here ${lang}: hero start not found`);
  const heroEndStart = html.indexOf('</section>', heroStart);
  if (heroEndStart < 0) throw new Error(`Start Here ${lang}: hero end not found`);
  const insertAt = heroEndStart + '</section>'.length;
  return `${html.slice(0, insertAt)}\n\n        ${markup('start-here',lang)}\n${html.slice(insertAt)}`;
}

const pages = [
  { file: 'index.html', kind: 'home', lang: 'en' },
  { file: 'start-here/index.html', kind: 'start', lang: 'en' },
  { file: 'es/start-here/index.html', kind: 'start', lang: 'es' }
];

for (const page of pages) {
  const full = path.join(ROOT,page.file);
  let html = clean(fs.readFileSync(full,'utf8'));
  html = page.kind === 'home' ? injectHome(html) : injectStartHere(html,page.lang);
  html = injectCommon(html);
  fs.writeFileSync(full,html);
  console.log(`[intent-discovery] baked ${page.file}`);
}
