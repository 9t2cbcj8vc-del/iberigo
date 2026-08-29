const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "action-first-health-social");
const PANEL_MARKER = "data-iberigo-action-first";
const PANEL_STYLE_MARKER = "data-iberigo-action-first-style";
const STATIC_STYLE_MARKER = "data-iberigo-static-action-guide-style";
const PAGE_MARKER = 'data-iberigo-static-action-guide="true"';
const REQUIRED_IDS = ["procedure", "where", "select", "forms", "bring", "after"];
const DUPLICATE_HEADINGS = new Set([
  "Next 3 steps", "Forms and documents", "Official source links", "Official links",
  "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales",
]);

const LANGUAGE_ROUTES = {
  "/guides/sip-card/": { en: "/guides/sip-card/", es: "/guides/es/sip-card/" },
  "/guides/es/sip-card/": { en: "/guides/sip-card/", es: "/guides/es/sip-card/" },
  "/guides/social-security/": { en: "/guides/social-security/", es: "/guides/es/social-security/" },
  "/guides/es/social-security/": { en: "/guides/social-security/", es: "/guides/es/social-security/" },
};

const DETAIL_COPY = {
  "/guides/sip-card/": `<p><strong>What it is:</strong> Spain-wide healthcare entitlement and your regional health card are related but separate. The national system determines or records your right to publicly funded healthcare; your autonomous community then uses its own health-card system to give you practical access to local services.</p><p><strong>Valencian Community:</strong> The regional system is called SIP (Sistema de Información Poblacional). The initial SIP procedure can check healthcare rights and padrón information electronically and records your identification, address, coverage status, assigned health centre and doctor where applicable.</p><p><strong>Practical sequence:</strong> Confirm your healthcare entitlement first when recognition is needed, then complete the regional card registration. In Valencia, GVA 21561 is the initial SIP registration/recovery procedure and the card or inclusion document is collected at the assigned health centre.</p>`,
  "/guides/es/sip-card/": `<p><strong>Qué es:</strong> El derecho a la asistencia sanitaria en España y la tarjeta sanitaria autonómica están relacionados, pero son pasos distintos. El sistema estatal determina o registra el derecho a la asistencia sanitaria con financiación pública; después cada comunidad autónoma utiliza su propio sistema de tarjeta para dar acceso práctico a los servicios sanitarios.</p><p><strong>Comunitat Valenciana:</strong> El sistema regional se denomina SIP (Sistema de Información Poblacional). El procedimiento inicial de alta SIP puede comprobar electrónicamente el derecho sanitario y el padrón, y registra identificación, domicilio, modalidad de cobertura, centro de salud y médico asignado cuando corresponda.</p><p><strong>Secuencia práctica:</strong> Confirma primero el derecho sanitario cuando sea necesario su reconocimiento y después completa el alta de la tarjeta autonómica. En Valencia, GVA 21561 es el procedimiento de alta o recuperación en SIP y la tarjeta o documento de inclusión se recoge en el centro de salud asignado.</p>`,
  "/guides/social-security/": `<p><strong>What it is:</strong> The NUSS is the number the Spanish Social Security system uses to identify you. It is also known as the Número de Afiliación (NAF). You may already have one from previous work or School Insurance, so check before requesting a new number.</p><p><strong>When you get it:</strong> You do not have to wait until after you start work. A citizen can request the NUSS through Importass, and an employer can also request it when hiring someone for the first time.</p><p><strong>What it is not:</strong> It is separate from your NIE and separate from the actual registration of an employment or self-employment activity. Having a NUSS does not by itself mean you are currently registered as working or that a particular benefit has been granted.</p>`,
  "/guides/es/social-security/": `<p><strong>Qué es:</strong> El NUSS es el número con el que el sistema español de Seguridad Social te identifica. También se conoce como Número de Afiliación (NAF). Es posible que ya tengas uno por un trabajo anterior o por el Seguro Escolar, por lo que conviene comprobarlo antes de solicitar uno nuevo.</p><p><strong>Cuándo se obtiene:</strong> No es necesario esperar a haber empezado a trabajar. La propia persona puede solicitar el NUSS mediante Importass y la empresa también puede pedirlo al contratar a alguien por primera vez.</p><p><strong>Qué no es:</strong> Es distinto del NIE y también del alta efectiva de una actividad laboral o autónoma. Tener NUSS no significa por sí solo estar actualmente de alta trabajando ni tener reconocida una prestación concreta.</p>`,
};

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function routeFile(route) {
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function loadConfigs() {
  const files = fs.readdirSync(DATA_DIR).filter((name) => name.endsWith(".json")).sort();
  if (files.length !== 4) throw new Error(`Expected 4 health/social action configs, found ${files.length}`);
  return files.map((name) => {
    const sourceFile = path.join(DATA_DIR, name);
    const config = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
    const ids = config.items?.map((item) => item.id) || [];
    if (JSON.stringify(ids) !== JSON.stringify(REQUIRED_IDS)) throw new Error(`${name}: invalid action item order`);
    if (!LANGUAGE_ROUTES[config.route]) throw new Error(`${name}: unsupported route ${config.route}`);
    if (!/^2026-08-29$/.test(config.sourceChecked || "")) throw new Error(`${name}: sourceChecked must be 2026-08-29 for this verified batch`);
    return { config, sourceFile };
  });
}

function renderItem(item) {
  const text = item.text ? `<p>${esc(item.text)}</p>` : "";
  const bullets = item.bullets?.length ? `<ul>${item.bullets.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  return `<div class="action-first-item" data-action-item="${esc(item.id)}"><strong>${esc(item.label)}</strong>${text}${bullets}</div>`;
}

function renderPanel(config, sourceFile) {
  const source = path.relative(ROOT, sourceFile).replace(/\\/g, "/");
  const locale = config.lang === "es" ? "es-ES" : "en-GB";
  const checked = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${config.sourceChecked}T00:00:00Z`));
  const links = (config.links || []).map((link, i) => `<a class="guide-button${i ? " guide-button--secondary" : ""}" href="${esc(link.url)}"${link.url.startsWith("https://") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(link.label)}</a>`).join("");
  return `<section class="action-first-card" ${PANEL_MARKER} data-procedure-key="${esc(config.procedureKey)}" data-action-source="${esc(source)}" aria-labelledby="healthSocialActionTitle"><div class="action-first-head"><div><span class="action-first-eyebrow">${esc(config.eyebrow)}</span><h2 id="healthSocialActionTitle">${esc(config.title)}</h2></div><span class="action-first-status">${esc(config.status)}</span></div><p class="action-first-intro">${esc(config.intro)}</p><div class="action-first-grid">${config.items.map(renderItem).join("")}</div><div class="action-first-links">${links}</div><p class="action-first-checked">${esc(config.sourceCheckedLabel)}: <time datetime="${esc(config.sourceChecked)}">${esc(checked)}</time></p></section>`;
}

const PANEL_STYLE = `<style ${PANEL_STYLE_MARKER}>
.action-first-card{margin:1.25rem 0 2rem;padding:clamp(1.2rem,3vw,1.8rem);border:1px solid rgba(166,74,54,.24);border-radius:18px;background:linear-gradient(145deg,rgba(253,240,220,.82),rgba(255,255,255,.95));box-shadow:0 18px 42px rgba(42,32,25,.08)}
.action-first-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.action-first-eyebrow{display:inline-flex;color:#a64a36;font-size:.74rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.action-first-card h2{margin:.4rem 0 0;color:#1b2030;font-size:clamp(1.45rem,3vw,2rem);line-height:1.18}.action-first-status{flex:0 1 320px;padding:.45rem .65rem;border-radius:999px;background:rgba(166,74,54,.09);color:#8f3e2c;font-size:.76rem;font-weight:850;line-height:1.35;text-align:center}.action-first-intro{max-width:78ch;margin:.9rem 0 0;color:rgba(27,32,48,.76);line-height:1.66}.action-first-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-top:1.15rem}.action-first-item{min-width:0;padding:1rem;border:1px solid rgba(166,74,54,.12);border-radius:14px;background:rgba(255,255,255,.82)}.action-first-item strong{display:block;margin-bottom:.38rem;color:#1b2030;font-size:.82rem;font-weight:900;letter-spacing:.025em;text-transform:uppercase}.action-first-item p,.action-first-item li{margin:0;color:rgba(27,32,48,.74);font-size:.94rem;line-height:1.58}.action-first-item ul{display:grid;gap:.32rem;margin:0;padding-left:1.15rem}.action-first-links{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.15rem}.action-first-links .guide-button{width:auto}.action-first-checked{margin:.85rem 0 0;color:rgba(27,32,48,.56);font-size:.8rem;font-weight:750}@media(max-width:720px){.action-first-head{display:grid}.action-first-status{justify-self:start;flex:none;text-align:left}.action-first-grid{grid-template-columns:minmax(0,1fr)}.action-first-links{display:grid}.action-first-links .guide-button{width:100%}}
</style>`;

const STATIC_STYLE = `<style ${STATIC_STYLE_MARKER}>
html[${PAGE_MARKER}] #wizard.panel.wizard-panel{display:block!important;grid-template-columns:minmax(0,1fr)!important;max-width:1120px}html[${PAGE_MARKER}] #routeWizard,html[${PAGE_MARKER}] #guide-cards,html[${PAGE_MARKER}] #documents,html[${PAGE_MARKER}] #sources{display:none!important}html[${PAGE_MARKER}] #wizardResult{display:block!important;width:100%;max-width:none!important;margin:0}html[${PAGE_MARKER}] .crawler-guide-intro{max-width:900px;padding:clamp(.5rem,1.2vw,.9rem) 0 clamp(.9rem,2vw,1.4rem)}html[${PAGE_MARKER}] .crawler-guide-intro h1{max-width:20ch;font-size:clamp(2.35rem,5vw,4.35rem);line-height:.98}html[${PAGE_MARKER}] .crawler-guide-intro p{max-width:62ch;font-size:clamp(1rem,1.6vw,1.13rem)}html[${PAGE_MARKER}] .language-switcher a{display:inline-flex;align-items:center;justify-content:center;min-width:34px;min-height:34px;border-radius:999px;color:inherit;font-size:.78rem;font-weight:800;text-decoration:none}html[${PAGE_MARKER}] .language-switcher a[aria-current="page"]{background:var(--button-bg,#a64a36);color:#fffdf9}@media(max-width:720px){html[${PAGE_MARKER}] #wizard.panel.wizard-panel{padding:clamp(1rem,4vw,1.35rem)!important}html[${PAGE_MARKER}] .crawler-guide-intro h1{max-width:15ch;font-size:clamp(2.15rem,12vw,3.2rem)}}
</style>`;

function stripGenerated(html) {
  for (const marker of [PANEL_STYLE_MARKER, STATIC_STYLE_MARKER]) {
    html = html.replace(new RegExp(`\\s*<style\\b[^>]*${marker}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  }
  html = html.replace(new RegExp(`\\s*<section\\b[^>]*${PANEL_MARKER}[^>]*>[\\s\\S]*?<\\/section>`, "gi"), "");
  html = html.replace(/\s+data-iberigo-static-action-guide=["']true["']/gi, "");
  return html;
}

function removeDuplicateSections(html) {
  const re = /<div\b[^>]*class=["'][^"']*\bresult-section\b[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi;
  return html.replace(re, (chunk) => {
    const heading = chunk.match(/<strong>([^<]+)<\/strong>/i)?.[1]?.trim();
    return heading && DUPLICATE_HEADINGS.has(heading) ? "" : chunk;
  });
}

function replaceDetailCopy(html, route) {
  const copy = DETAIL_COPY[route];
  if (!copy) throw new Error(`${route}: detail copy missing`);
  const re = /<div\b[^>]*class=["']result-purpose-body["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: result-purpose-body not found`);
  return html.replace(re, `<div class="result-purpose-body">${copy}</div>`);
}

function replaceLanguageSwitcher(html, route, lang) {
  const paths = LANGUAGE_ROUTES[route];
  const markup = `<div class="language-switcher" aria-label="Language"><a href="${paths.en}" data-lang="en"${lang === "en" ? ' aria-current="page"' : ""}>EN</a><a href="${paths.es}" data-lang="es"${lang === "es" ? ' aria-current="page"' : ""}>ES</a></div>`;
  const re = /<div\b[^>]*class=["'][^"']*\blanguage-switcher\b[^"']*["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: language switcher not found`);
  return html.replace(re, markup);
}

function bake(config, sourceFile) {
  const file = routeFile(config.route);
  let html = stripGenerated(fs.readFileSync(file, "utf8"));
  const lang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (lang !== config.lang) throw new Error(`${config.route}: language mismatch`);
  html = removeDuplicateSections(html);
  html = replaceDetailCopy(html, config.route);
  const intro = /(<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<\/div>)/i;
  if (!intro.test(html)) throw new Error(`${config.route}: crawler guide intro missing; run crawler-first bake first`);
  html = html.replace(intro, `$1\n${renderPanel(config, sourceFile)}`);
  html = html.replace(/\s*<script\b[^>]*\bsrc=["'](?:\.\/|\/)?app\.js(?:\?v=[^"']*)?["'][^>]*>\s*<\/script>/gi, "");
  if (/\bapp\.js\b/.test(html)) throw new Error(`${config.route}: legacy app.js still present`);
  html = replaceLanguageSwitcher(html, config.route, config.lang);
  html = html.replace(/<html\b([^>]*)>/i, `<html$1 ${PAGE_MARKER}>`);
  html = html.replace(/\s*<\/head>/i, `\n${PANEL_STYLE}\n${STATIC_STYLE}\n</head>`);
  fs.writeFileSync(file, html, "utf8");
}

for (const { config, sourceFile } of loadConfigs()) bake(config, sourceFile);
console.log("Health/Social action-first guides baked: public healthcare/SIP and Social Security, EN/ES, static-first.");
