const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "action-first-digital");
const PANEL_MARKER = "data-iberigo-action-first";
const PANEL_STYLE_MARKER = "data-iberigo-action-first-style";
const STATIC_STYLE_MARKER = "data-iberigo-static-action-guide-style";
const PAGE_MARKER = 'data-iberigo-static-action-guide="true"';
const REQUIRED_IDS = ["procedure", "where", "select", "forms", "bring", "after"];

const LANGUAGE_ROUTES = {
  "/guides/digital/": { en: "/guides/digital/", es: "/guides/es/digital/" },
  "/guides/es/digital/": { en: "/guides/digital/", es: "/guides/es/digital/" },
};

const PAGE_COPY = {
  "/guides/digital/": {
    title: "FNMT digital certificate or Cl@ve in Spain — IberiGo",
    description: "Choose and set up Spain's main electronic identification options: the FNMT citizen certificate, Cl@ve Móvil and Cl@ve Permanente, with current official registration routes.",
    introTitle: "FNMT digital certificate or Cl@ve in Spain",
    introDescription: "Choose the right electronic identity for Spanish government portals, understand when FNMT and Cl@ve differ, and set up a reliable fallback for online administration.",
    detail: `<p><strong>What they are:</strong> The FNMT citizen certificate and Cl@ve are separate electronic-identification systems. The FNMT software certificate is installed on a device and can be used where a public service accepts certificate-based identification or signing. Cl@ve is the shared government identification platform used by participating public services.</p><p><strong>FNMT route:</strong> For the standard software certificate, configure the device, submit the online request, keep the request code, prove your identity and then download the certificate using the same computer and user account used for the request. FNMT accepts specific NIE evidence together with a passport or national identity document for EU citizens. After download, make a protected backup; some signing procedures also use AutoFirma.</p><p><strong>Cl@ve route:</strong> Current Cl@ve registration has basic and advanced levels. Cl@ve Móvil lets registered users identify through the app/QR confirmation flow. Cl@ve Permanente is intended for frequent access with a lasting password and can add a one-time SMS code for higher-security services. Basic registration does not work for every service and does not enable Cl@ve Firma.</p><p><strong>Which should you use?</strong> Use the method the specific public portal accepts. If you handle Spanish administration regularly, having both FNMT and Cl@ve gives you a useful fallback when one method is unavailable for a particular service.</p>`,
  },
  "/guides/es/digital/": {
    title: "Certificado digital FNMT o Cl@ve en España — IberiGo",
    description: "Elige y configura las principales opciones de identificación electrónica en España: certificado ciudadano FNMT, Cl@ve Móvil y Cl@ve Permanente, con vías oficiales actuales.",
    introTitle: "Certificado digital FNMT o Cl@ve en España",
    introDescription: "Elige la identidad electrónica adecuada para las sedes públicas españolas, entiende cuándo difieren FNMT y Cl@ve y configura una alternativa fiable para tus trámites online.",
    detail: `<p><strong>Qué son:</strong> El certificado ciudadano de la FNMT y Cl@ve son sistemas distintos de identificación electrónica. El certificado software FNMT se instala en un dispositivo y puede utilizarse cuando una sede admite identificación o firma con certificado. Cl@ve es la plataforma común de identificación utilizada por los servicios públicos integrados en el sistema.</p><p><strong>Vía FNMT:</strong> Para el certificado software estándar, configura el equipo, presenta la solicitud online, conserva el código de solicitud, acredita tu identidad y después descarga el certificado utilizando el mismo ordenador y usuario empleados en la solicitud. Para ciudadanos de la UE, FNMT admite determinados documentos que acreditan el NIE junto con pasaporte o documento nacional de identidad. Después de descargarlo, guarda una copia de seguridad protegida; algunos trámites de firma también utilizan AutoFirma.</p><p><strong>Vía Cl@ve:</strong> El registro actual en Cl@ve distingue niveles básico y avanzado. Cl@ve Móvil permite identificarse mediante la app o confirmación con QR. Cl@ve Permanente está pensada para accesos frecuentes con una contraseña duradera y puede añadir un código de un solo uso por SMS en servicios de mayor seguridad. El registro básico no sirve para todos los servicios ni permite Cl@ve Firma.</p><p><strong>¿Cuál conviene?</strong> Utiliza el método que admita la sede pública concreta. Si haces trámites administrativos en España con frecuencia, disponer tanto de FNMT como de Cl@ve ofrece una alternativa útil cuando un servicio no admite uno de ellos.</p>`,
  },
};

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function routeFile(route) {
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function loadConfigs() {
  const files = fs.readdirSync(DATA_DIR).filter((name) => name.endsWith(".json")).sort();
  if (files.length !== 2) throw new Error(`Expected 2 digital-access configs, found ${files.length}`);
  return files.map((name) => {
    const sourceFile = path.join(DATA_DIR, name);
    const config = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
    const ids = config.items?.map((item) => item.id) || [];
    if (JSON.stringify(ids) !== JSON.stringify(REQUIRED_IDS)) throw new Error(`${name}: invalid action item order`);
    if (!LANGUAGE_ROUTES[config.route]) throw new Error(`${name}: unsupported route ${config.route}`);
    if (config.sourceChecked !== "2026-08-30") throw new Error(`${name}: sourceChecked must be 2026-08-30 for this verified batch`);
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
  const links = (config.links || []).map((link, i) => `<a class="guide-button${i ? " guide-button--secondary" : ""}" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join("");
  return `<section class="action-first-card" ${PANEL_MARKER} data-procedure-key="${esc(config.procedureKey)}" data-action-source="${esc(source)}" aria-labelledby="digitalActionTitle"><div class="action-first-head"><div><span class="action-first-eyebrow">${esc(config.eyebrow)}</span><h2 id="digitalActionTitle">${esc(config.title)}</h2></div><span class="action-first-status">${esc(config.status)}</span></div><p class="action-first-intro">${esc(config.intro)}</p><div class="action-first-grid">${config.items.map(renderItem).join("")}</div><div class="action-first-links">${links}</div><p class="action-first-checked">${esc(config.sourceCheckedLabel)}: <time datetime="${esc(config.sourceChecked)}">${esc(checked)}</time></p></section>`;
}

const PANEL_STYLE = `<style ${PANEL_STYLE_MARKER}>
.action-first-card{margin:1.25rem 0 2rem;padding:clamp(1.2rem,3vw,1.8rem);border:1px solid rgba(166,74,54,.24);border-radius:18px;background:linear-gradient(145deg,rgba(253,240,220,.82),rgba(255,255,255,.95));box-shadow:0 18px 42px rgba(42,32,25,.08)}
.action-first-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.action-first-eyebrow{display:inline-flex;color:#a64a36;font-size:.74rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.action-first-card h2{margin:.4rem 0 0;color:#1b2030;font-size:clamp(1.45rem,3vw,2rem);line-height:1.18}.action-first-status{flex:0 1 340px;padding:.45rem .65rem;border-radius:999px;background:rgba(166,74,54,.09);color:#8f3e2c;font-size:.76rem;font-weight:850;line-height:1.35;text-align:center}.action-first-intro{max-width:78ch;margin:.9rem 0 0;color:rgba(27,32,48,.76);line-height:1.66}.action-first-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-top:1.15rem}.action-first-item{min-width:0;padding:1rem;border:1px solid rgba(166,74,54,.12);border-radius:14px;background:rgba(255,255,255,.82)}.action-first-item strong{display:block;margin-bottom:.38rem;color:#1b2030;font-size:.82rem;font-weight:900;letter-spacing:.025em;text-transform:uppercase}.action-first-item p,.action-first-item li{margin:0;color:rgba(27,32,48,.74);font-size:.94rem;line-height:1.58}.action-first-item ul{display:grid;gap:.32rem;margin:0;padding-left:1.15rem}.action-first-links{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.15rem}.action-first-links .guide-button{width:auto}.action-first-checked{margin:.85rem 0 0;color:rgba(27,32,48,.56);font-size:.8rem;font-weight:750}@media(max-width:720px){.action-first-head{display:grid}.action-first-status{justify-self:start;flex:none;text-align:left}.action-first-grid{grid-template-columns:minmax(0,1fr)}.action-first-links{display:grid}.action-first-links .guide-button{width:100%}}
</style>`;

const STATIC_STYLE = `<style ${STATIC_STYLE_MARKER}>
html[${PAGE_MARKER}] #wizard.panel.wizard-panel{display:block!important;grid-template-columns:minmax(0,1fr)!important;max-width:1120px}html[${PAGE_MARKER}] #routeWizard,html[${PAGE_MARKER}] #guide-cards,html[${PAGE_MARKER}] #documents,html[${PAGE_MARKER}] #sources{display:none!important}html[${PAGE_MARKER}] #wizardResult{display:block!important;width:100%;max-width:none!important;margin:0}html[${PAGE_MARKER}] .crawler-guide-intro{max-width:900px;padding:clamp(.5rem,1.2vw,.9rem) 0 clamp(.9rem,2vw,1.4rem)}html[${PAGE_MARKER}] .crawler-guide-intro h1{max-width:22ch;font-size:clamp(2.35rem,5vw,4.35rem);line-height:.98}html[${PAGE_MARKER}] .crawler-guide-intro p{max-width:66ch;font-size:clamp(1rem,1.6vw,1.13rem)}html[${PAGE_MARKER}] .language-switcher a{display:inline-flex;align-items:center;justify-content:center;min-width:34px;min-height:34px;border-radius:999px;color:inherit;font-size:.78rem;font-weight:800;text-decoration:none}html[${PAGE_MARKER}] .language-switcher a[aria-current="page"]{background:var(--button-bg,#a64a36);color:#fffdf9}@media(max-width:720px){html[${PAGE_MARKER}] #wizard.panel.wizard-panel{padding:clamp(1rem,4vw,1.35rem)!important}html[${PAGE_MARKER}] .crawler-guide-intro h1{max-width:16ch;font-size:clamp(2.15rem,12vw,3.2rem)}}
</style>`;

function stripGenerated(html) {
  for (const marker of [PANEL_STYLE_MARKER, STATIC_STYLE_MARKER]) {
    html = html.replace(new RegExp(`\\s*<style\\b[^>]*${marker}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  }
  html = html.replace(new RegExp(`\\s*<section\\b[^>]*${PANEL_MARKER}[^>]*>[\\s\\S]*?<\\/section>`, "gi"), "");
  html = html.replace(/\s+data-iberigo-static-action-guide=["']true["']/gi, "");
  return html;
}

function replaceLanguageSwitcher(html, route, lang) {
  const paths = LANGUAGE_ROUTES[route];
  const markup = `<div class="language-switcher" aria-label="Language"><a href="${paths.en}" data-lang="en"${lang === "en" ? ' aria-current="page"' : ""}>EN</a><a href="${paths.es}" data-lang="es"${lang === "es" ? ' aria-current="page"' : ""}>ES</a></div>`;
  const re = /<div\b[^>]*class=["'][^"']*\blanguage-switcher\b[^"']*["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: language switcher not found`);
  return html.replace(re, markup);
}

function replaceHeadCopy(html, route) {
  const copy = PAGE_COPY[route];
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${copy.title}</title>`);
  html = html.replace(/(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${copy.description}$2`);
  html = html.replace(/(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${copy.title.replace(/ — IberiGo$/, "")}$2`);
  html = html.replace(/(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${copy.description}$2`);
  return html;
}

function replaceCrawlerIntro(html, route, lang) {
  const copy = PAGE_COPY[route];
  const label = lang === "es" ? "Guía IberiGo" : "IberiGo guide";
  const markup = `<div class="crawler-guide-intro" data-crawler-guide-intro data-crawler-guide-id="digital"><span class="tagline">${label}</span><h1>${copy.introTitle}</h1><p>${copy.introDescription}</p></div>`;
  const re = /<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: crawler guide intro missing; run crawler-first bake first`);
  return html.replace(re, markup);
}

function replaceDetailCopy(html, route) {
  const re = /<div\b[^>]*class=["']result-purpose-body["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: result-purpose-body not found`);
  return html.replace(re, `<div class="result-purpose-body">${PAGE_COPY[route].detail}</div>`);
}

function bake(config, sourceFile) {
  const file = routeFile(config.route);
  let html = stripGenerated(fs.readFileSync(file, "utf8"));
  const lang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (lang !== config.lang) throw new Error(`${config.route}: language mismatch`);
  html = replaceHeadCopy(html, config.route);
  html = replaceCrawlerIntro(html, config.route, config.lang);
  html = replaceDetailCopy(html, config.route);
  const intro = /(<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<\/div>)/i;
  html = html.replace(intro, `$1\n${renderPanel(config, sourceFile)}`);
  html = html.replace(/\s*<script\b[^>]*\bsrc=["'](?:\.\/|\/)?app\.js(?:\?v=[^"']*)?["'][^>]*>\s*<\/script>/gi, "");
  if (/\bapp\.js\b/.test(html)) throw new Error(`${config.route}: legacy app.js still present`);
  html = replaceLanguageSwitcher(html, config.route, config.lang);
  html = html.replace(/<html\b([^>]*)>/i, (full, attrs) => `<html${attrs} ${PAGE_MARKER}>`);
  html = html.replace("</head>", `${PANEL_STYLE}\n${STATIC_STYLE}\n</head>`);
  const exactPanel = '<section class="action-first-card" data-iberigo-action-first';
  if (html.split(exactPanel).length - 1 !== 1) throw new Error(`${config.route}: expected exactly one action card`);
  fs.writeFileSync(file, html, "utf8");
}

for (const { config, sourceFile } of loadConfigs()) bake(config, sourceFile);
console.log("Digital-access action-first guide baked: FNMT + Cl@ve, EN/ES, static-first.");
