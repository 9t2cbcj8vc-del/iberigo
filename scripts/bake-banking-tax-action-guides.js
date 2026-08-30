const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "action-first-banking-tax");
const PANEL = "data-iberigo-action-first";
const PANEL_STYLE = "data-iberigo-action-first-style";
const STATIC_STYLE = "data-iberigo-static-action-guide-style";
const STATIC_ATTR = 'data-iberigo-static-action-guide="true"';
const REQUIRED_IDS = ["procedure", "where", "select", "forms", "bring", "after"];

const ROUTES = {
  "/guides/banking/": { en: "/guides/banking/", es: "/guides/es/banking/" },
  "/guides/es/banking/": { en: "/guides/banking/", es: "/guides/es/banking/" },
  "/guides/taxes/": { en: "/guides/taxes/", es: "/guides/es/taxes/" },
  "/guides/es/taxes/": { en: "/guides/taxes/", es: "/guides/es/taxes/" },
};

const COPY = {
  "/guides/banking/": {
    title: "Bank account and banking in Spain — IberiGo",
    description: "Choose a bank account in Spain, prepare identity and source-of-funds checks, and understand resident, non-resident, basic-account and EU IBAN rules.",
    h1: "Bank account and banking in Spain",
    detail: `<p><strong>Do you need a Spanish account?</strong> A Spanish account can be convenient, but it is not automatically required for every salary payment, bill or direct debit. EU SEPA rules prohibit refusing a qualifying euro transfer or direct debit merely because the account is in another EU Member State.</p><p><strong>What a bank can ask for:</strong> Banco de España explains that EU citizens may be asked for a passport or national identity document together with an NIE; non-EU citizens commonly identify with a TIE; non-residents can be asked to prove non-resident status. Banks can also request address, income and source-of-funds evidence to meet anti-money-laundering obligations.</p><p><strong>Account choice:</strong> Standard account acceptance and product requirements vary by bank. If you have difficulty opening an ordinary account, eligible customers legally resident in the EU and certain other groups can request a basic payment account, subject to the statutory refusal grounds.</p><p><strong>Before signing:</strong> Compare fees, card conditions, transfers, cash access and the deposit-guarantee scheme. Keep your residence and tax-residence declarations accurate and update the bank if your status changes.</p>`,
  },
  "/guides/es/banking/": {
    title: "Cuenta bancaria y banca en España — IberiGo",
    description: "Elige una cuenta bancaria en España, prepara las comprobaciones de identidad y origen de fondos y entiende cuentas de residente, no residente, básicas y las reglas de IBAN de la UE.",
    h1: "Cuenta bancaria y banca en España",
    detail: `<p><strong>¿Necesitas una cuenta española?</strong> Una cuenta española puede ser cómoda, pero no es automáticamente obligatoria para todas las nóminas, facturas o domiciliaciones. Las reglas SEPA de la UE prohíben rechazar una transferencia o adeudo en euros que cumpla los requisitos solo porque la cuenta esté en otro Estado miembro.</p><p><strong>Qué puede pedir el banco:</strong> El Banco de España explica que a los ciudadanos de la UE pueden pedirles pasaporte o documento nacional de identidad junto con el NIE; los ciudadanos no UE suelen identificarse con la TIE; a los no residentes pueden pedirles que acrediten esa condición. La entidad también puede solicitar domicilio, ingresos y origen de fondos para cumplir la normativa de prevención de blanqueo.</p><p><strong>Tipo de cuenta:</strong> La aceptación de una cuenta ordinaria y sus requisitos varían según el banco. Si tienes dificultades para abrir una cuenta habitual, determinados residentes legales en la UE y otros grupos pueden solicitar una cuenta de pago básica, sujeta a los motivos legales de denegación.</p><p><strong>Antes de firmar:</strong> Compara comisiones, condiciones de tarjeta, transferencias, acceso a efectivo y el sistema de garantía de depósitos. Mantén correctas tus declaraciones de residencia y residencia fiscal y actualiza a la entidad si cambia tu situación.</p>`,
  },
  "/guides/taxes/": {
    title: "Taxes and tax residence in Spain — IberiGo",
    description: "Work out Spanish tax residence first, then choose the correct AEAT route for IRPF, IRNR, Modelo 030, foreign income or foreign-asset reporting.",
    h1: "Taxes and tax residence in Spain",
    detail: `<p><strong>Tax residence comes first:</strong> Spanish tax residence is determined for the calendar year and is not the same as immigration residence. The domestic tests include spending more than 183 days in Spain, having the main centre or base of economic interests in Spain, and a rebuttable family presumption. If another country also treats you as resident, the applicable double-tax treaty can change the result.</p><p><strong>If you are resident:</strong> Spanish tax residents are generally subject to IRPF on worldwide income, subject to treaty relief and any special regime that genuinely applies. Foreign salary, pensions, dividends and investment gains can therefore matter even when paid abroad.</p><p><strong>If you are not resident:</strong> Non-residents generally use IRNR for income considered obtained in Spain. The correct model depends on the income and circumstances, so do not file IRPF merely because you hold Spanish immigration residence.</p><p><strong>Census and foreign assets:</strong> Individuals outside the business/professional census use Modelo 030 for certain census changes such as tax address or residence status. Residents with foreign accounts, investments, insurance or property should separately check information-return duties such as Modelo 720; the €50,000 tests operate by statutory category and later filings have additional change rules.</p><p><strong>Investments:</strong> Dividends and gains from transfers commonly enter the IRPF savings base for residents. Rates and filing thresholds can change by tax year, so use the current AEAT manual rather than an old fixed-rate table.</p>`,
  },
  "/guides/es/taxes/": {
    title: "Impuestos y residencia fiscal en España — IberiGo",
    description: "Determina primero tu residencia fiscal en España y elige después el trámite correcto de la AEAT para IRPF, IRNR, Modelo 030, rentas extranjeras o bienes en el extranjero.",
    h1: "Impuestos y residencia fiscal en España",
    detail: `<p><strong>Primero, la residencia fiscal:</strong> La residencia fiscal española se determina para el año natural y no es lo mismo que la residencia de extranjería. Los criterios internos incluyen permanecer más de 183 días en España, tener aquí el núcleo principal o la base de los intereses económicos y una presunción familiar rebatible. Si otro país también te considera residente, el convenio para evitar la doble imposición aplicable puede modificar el resultado.</p><p><strong>Si eres residente:</strong> Los residentes fiscales en España tributan con carácter general por IRPF sobre su renta mundial, sin perjuicio del convenio y de cualquier régimen especial que realmente resulte aplicable. Por tanto, salarios, pensiones, dividendos y ganancias de inversión extranjeras pueden ser relevantes aunque se paguen fuera de España.</p><p><strong>Si no eres residente:</strong> Los no residentes tributan con carácter general por IRNR sobre las rentas que se consideren obtenidas en España. El modelo correcto depende de la renta y de las circunstancias; no presentes IRPF solo por tener residencia de extranjería en España.</p><p><strong>Censo y bienes en el extranjero:</strong> Las personas fuera del censo de empresarios/profesionales utilizan el Modelo 030 para determinados cambios censales como domicilio o condición de residente. Los residentes con cuentas, inversiones, seguros o inmuebles en el extranjero deben comprobar por separado obligaciones informativas como el Modelo 720; los límites de 50.000 € se aplican por categorías legales y las declaraciones posteriores tienen reglas adicionales de variación.</p><p><strong>Inversiones:</strong> Los dividendos y las ganancias derivadas de transmisiones suelen integrarse en la base del ahorro del IRPF para residentes. Los tipos y límites de declaración pueden cambiar por ejercicio, por lo que conviene utilizar el manual vigente de la AEAT y no una tabla antigua.</p>`,
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
  if (files.length !== 4) throw new Error(`Expected four banking/tax configs, found ${files.length}`);
  return files.map((name) => {
    const sourceFile = path.join(DATA_DIR, name);
    const config = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
    const ids = config.items?.map((item) => item.id) || [];
    if (JSON.stringify(ids) !== JSON.stringify(REQUIRED_IDS)) throw new Error(`${name}: invalid action item order`);
    if (!ROUTES[config.route]) throw new Error(`${name}: unsupported route ${config.route}`);
    if (config.sourceChecked !== "2026-08-30") throw new Error(`${name}: unexpected source date`);
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
  const links = config.links.map((link, i) => `<a class="guide-button${i ? " guide-button--secondary" : ""}" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join("");
  const id = config.procedureKey === "taxes-spain" ? "taxActionTitle" : "bankActionTitle";
  return `<section class="action-first-card" ${PANEL} data-procedure-key="${esc(config.procedureKey)}" data-action-source="${esc(source)}" aria-labelledby="${id}"><div class="action-first-head"><div><span class="action-first-eyebrow">${esc(config.eyebrow)}</span><h2 id="${id}">${esc(config.title)}</h2></div><span class="action-first-status">${esc(config.status)}</span></div><p class="action-first-intro">${esc(config.intro)}</p><div class="action-first-grid">${config.items.map(renderItem).join("")}</div><div class="action-first-links">${links}</div><p class="action-first-checked">${esc(config.sourceCheckedLabel)}: <time datetime="${esc(config.sourceChecked)}">${esc(checked)}</time></p></section>`;
}

const STYLES = `<style ${PANEL_STYLE}>
.action-first-card{margin:1.25rem 0 2rem;padding:clamp(1.2rem,3vw,1.8rem);border:1px solid rgba(166,74,54,.24);border-radius:18px;background:linear-gradient(145deg,rgba(253,240,220,.82),rgba(255,255,255,.95));box-shadow:0 18px 42px rgba(42,32,25,.08)}.action-first-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.action-first-eyebrow{display:inline-flex;color:#a64a36;font-size:.74rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.action-first-card h2{margin:.4rem 0 0;color:#1b2030;font-size:clamp(1.45rem,3vw,2rem);line-height:1.18}.action-first-status{flex:0 1 340px;padding:.45rem .65rem;border-radius:999px;background:rgba(166,74,54,.09);color:#8f3e2c;font-size:.76rem;font-weight:850;line-height:1.35;text-align:center}.action-first-intro{max-width:78ch;margin:.9rem 0 0;color:rgba(27,32,48,.76);line-height:1.66}.action-first-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-top:1.15rem}.action-first-item{min-width:0;padding:1rem;border:1px solid rgba(166,74,54,.12);border-radius:14px;background:rgba(255,255,255,.82)}.action-first-item strong{display:block;margin-bottom:.38rem;color:#1b2030;font-size:.82rem;font-weight:900;letter-spacing:.025em;text-transform:uppercase}.action-first-item p,.action-first-item li{margin:0;color:rgba(27,32,48,.74);font-size:.94rem;line-height:1.58}.action-first-item ul{display:grid;gap:.32rem;margin:0;padding-left:1.15rem}.action-first-links{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.15rem}.action-first-links .guide-button{width:auto}.action-first-checked{margin:.85rem 0 0;color:rgba(27,32,48,.56);font-size:.8rem;font-weight:750}@media(max-width:720px){.action-first-head{display:grid}.action-first-status{justify-self:start;flex:none;text-align:left}.action-first-grid{grid-template-columns:minmax(0,1fr)}.action-first-links{display:grid}.action-first-links .guide-button{width:100%}}
</style><style ${STATIC_STYLE}>
html[${STATIC_ATTR}] #wizard.panel.wizard-panel{display:block!important;grid-template-columns:minmax(0,1fr)!important;max-width:1120px}html[${STATIC_ATTR}] #routeWizard,html[${STATIC_ATTR}] #guide-cards,html[${STATIC_ATTR}] #documents,html[${STATIC_ATTR}] #sources{display:none!important}html[${STATIC_ATTR}] #wizardResult{display:block!important;width:100%;max-width:none!important;margin:0}html[${STATIC_ATTR}] .crawler-guide-intro{max-width:900px;padding:clamp(.5rem,1.2vw,.9rem) 0 clamp(.9rem,2vw,1.4rem)}html[${STATIC_ATTR}] .crawler-guide-intro h1{max-width:22ch;font-size:clamp(2.35rem,5vw,4.35rem);line-height:.98}html[${STATIC_ATTR}] .crawler-guide-intro p{max-width:66ch;font-size:clamp(1rem,1.6vw,1.13rem)}html[${STATIC_ATTR}] .language-switcher a{display:inline-flex;align-items:center;justify-content:center;min-width:34px;min-height:34px;border-radius:999px;color:inherit;font-size:.78rem;font-weight:800;text-decoration:none}html[${STATIC_ATTR}] .language-switcher a[aria-current="page"]{background:var(--button-bg,#a64a36);color:#fffdf9}@media(max-width:720px){html[${STATIC_ATTR}] #wizard.panel.wizard-panel{padding:clamp(1rem,4vw,1.35rem)!important}html[${STATIC_ATTR}] .crawler-guide-intro h1{max-width:16ch;font-size:clamp(2.15rem,12vw,3.2rem)}}
</style>`;

function removeGenerated(html) {
  html = html.replace(new RegExp(`\\s*<style\\b[^>]*${PANEL_STYLE}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  html = html.replace(new RegExp(`\\s*<style\\b[^>]*${STATIC_STYLE}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  html = html.replace(new RegExp(`\\s*<section\\b[^>]*${PANEL}[^>]*>[\\s\\S]*?<\\/section>`, "gi"), "");
  html = html.replace(/\s+data-iberigo-static-action-guide=["']true["']/gi, "");
  return html;
}

function removeLegacySections(html) {
  const starts = [...html.matchAll(/<div\b[^>]*class=["'][^"']*\bresult-section\b[^"']*["'][^>]*>/gi)].map((m) => m.index);
  if (!starts.length) return html;
  const removals = [];
  for (let i = 0; i < starts.length; i += 1) {
    const start = starts[i];
    const next = starts[i + 1] ?? html.indexOf('<p class="disclaimer"', start);
    const end = next > start ? next : html.indexOf("</article>", start);
    const chunk = html.slice(start, end);
    if (/Next 3 steps|Próximos 3 pasos|Official links|Enlaces oficiales|Official source links/i.test(chunk)) removals.push([start, end]);
  }
  for (const [start, end] of removals.reverse()) html = html.slice(0, start) + html.slice(end);
  return html;
}

function replaceMetaContent(html, selector, value) {
  const tagRe = new RegExp(`<meta\\b(?=[^>]*${selector})[^>]*>`, "i");
  const match = html.match(tagRe);
  if (!match) return html;
  const tag = match[0].replace(/(content=)(["'])([\s\S]*?)\2/i, (_, pre, quote) => `${pre}${quote}${esc(value)}${quote}`);
  return html.replace(match[0], tag);
}

function replaceHead(html, route) {
  const copy = COPY[route];
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${copy.title}</title>`);
  html = replaceMetaContent(html, `name=["']description["']`, copy.description);
  html = replaceMetaContent(html, `property=["']og:title["']`, copy.title.replace(/ — IberiGo$/, ""));
  html = replaceMetaContent(html, `property=["']og:description["']`, copy.description);
  return html;
}

function replaceIntro(html, route, lang) {
  const copy = COPY[route];
  const label = lang === "es" ? "Guía IberiGo" : "IberiGo guide";
  const guideId = route.includes("taxes") ? "taxes" : "banking";
  const markup = `<div class="crawler-guide-intro" data-crawler-guide-intro data-crawler-guide-id="${guideId}"><span class="tagline">${label}</span><h1>${copy.h1}</h1><p>${copy.description}</p></div>`;
  const re = /<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: crawler intro missing; crawler-first bake must run first`);
  return html.replace(re, markup);
}

function replaceDetail(html, route) {
  const re = /<div\b[^>]*class=["']result-purpose-body["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: detail body missing`);
  return html.replace(re, `<div class="result-purpose-body">${COPY[route].detail}</div>`);
}

function replaceLanguageSwitcher(html, route, lang) {
  const links = ROUTES[route];
  const markup = `<div class="language-switcher" aria-label="Language"><a href="${links.en}" data-lang="en"${lang === "en" ? ' aria-current="page"' : ""}>EN</a><a href="${links.es}" data-lang="es"${lang === "es" ? ' aria-current="page"' : ""}>ES</a></div>`;
  const re = /<div\b[^>]*class=["'][^"']*\blanguage-switcher\b[^"']*["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error(`${route}: language switcher missing`);
  return html.replace(re, markup);
}

function bake(config, sourceFile) {
  const file = routeFile(config.route);
  let html = removeGenerated(fs.readFileSync(file, "utf8"));
  html = removeLegacySections(html);
  html = replaceHead(html, config.route);
  html = replaceIntro(html, config.route, config.lang);
  html = replaceDetail(html, config.route);
  html = replaceLanguageSwitcher(html, config.route, config.lang);
  html = html.replace(/<script\b[^>]*src=["'][^"']*app\.js[^"']*["'][^>]*><\/script>\s*/gi, "");
  html = html.replace(/<html\b([^>]*)>/i, (whole, attrs) => `<html${attrs} ${STATIC_ATTR}>`);
  html = html.replace(/\s*<\/head>/i, `${STYLES}\n  </head>`);
  const introRe = /(<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<\/div>)/i;
  html = html.replace(introRe, `$1\n${renderPanel(config, sourceFile)}`);
  fs.writeFileSync(file, html, "utf8");
}

for (const { config, sourceFile } of loadConfigs()) bake(config, sourceFile);
console.log("Banking/tax action-first guides baked: EN/ES banking and taxes, static-first.");
