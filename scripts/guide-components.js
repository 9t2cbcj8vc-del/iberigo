const SITE_URL = "https://iberigo.eu";
const REVIEWED = "June 2026";
const DEFAULT_EDITORIAL_CHECKLIST = [
  "Grammar reviewed",
  "Internal links checked",
  "External links checked",
  "Mobile reviewed",
  "Desktop reviewed",
  "Accessibility reviewed",
  "SEO reviewed",
  "Facts verified"
];

// Source-category variants for official-source cards. Reuses the same
// category logic and accent-color language already used safely elsewhere
// in the project for government-style links (see app.js's govMeta/
// govDomains/euDomains) — accent colors and short initials only, no logos
// or flags, so cards feel recognizable without impersonating official sites.
const SOURCE_CATEGORY_META = {
  government: { tag: "Spanish Government", initials: "ES" },
  police: { tag: "Policía Nacional", initials: "PN" },
  eu: { tag: "European Union", initials: "EU" },
  tax: { tag: "Tax Agency", initials: "AT" },
  "social-security": { tag: "Social Security", initials: "SS" },
  traffic: { tag: "Traffic Authority", initials: "DGT" },
  healthcare: { tag: "Health Ministry", initials: "MS" },
  municipal: { tag: "Local / Regional", initials: "LOC" },
  generic: { tag: "Official Source", initials: "OS" }
};

function classifySource(item = {}) {
  if (!item.url) {
    const name = String(item.name || "").toLowerCase();
    if (/town hall|municipal|regional/.test(name)) return "municipal";
    return "generic";
  }
  let host = "";
  try {
    host = new URL(item.url).hostname;
  } catch {
    return "generic";
  }
  const endsWith = (domain) => host === domain || host.endsWith(`.${domain}`);
  if (endsWith("policia.gob.es")) return "police";
  if (endsWith("europa.eu")) return "eu";
  if (endsWith("agenciatributaria.gob.es")) return "tax";
  if (endsWith("seg-social.es") || endsWith("seg-social.gob.es")) return "social-security";
  if (endsWith("dgt.es") || endsWith("dgt.gob.es")) return "traffic";
  if (endsWith("sanidad.gob.es")) return "healthcare";
  if (host.endsWith(".gob.es") || endsWith("boe.es") || endsWith("administracion.gob.es")) return "government";
  return "generic";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attrs(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => ` ${key}="${escapeHtml(value)}"`)
    .join("");
}

function Header({ lang = "en", altHref = null } = {}) {
  const isSpanish = lang === "es";
  const labels = isSpanish
    ? {
        nav: "Secciones principales",
        start: "Empieza aquí",
        home: "Portada",
        spainFiles: "The Spain Files",
        donate: "Donar",
        search: "Buscar en IberiGo",
        language: "Idioma"
      }
    : {
        nav: "Main sections",
        start: "Start Here",
        home: "Home",
        spainFiles: "The Spain Files",
        donate: "Donate",
        search: "Search IberiGo",
        language: "Language"
      };
  const startHref = isSpanish ? "/es/start-here/" : "/start-here/";
  return `<header class="topbar">
        <div class="brand-lockup">
          <span class="brand-wordmark" aria-label="IberiGo">Iberi<span class="brand-wordmark-accent">Go</span></span>
        </div>
        <nav aria-label="${escapeHtml(labels.nav)}">
          <a href="${startHref}">${escapeHtml(labels.start)}</a>
          <a href="/index.html?nav=start#guide-cards">${escapeHtml(labels.home)}</a>
          <a href="/the-spain-files/">${escapeHtml(labels.spainFiles)}</a>
          <a href="/support/index.html">${escapeHtml(labels.donate)}</a>
          <a class="search-nav-link" href="/search/" aria-label="${escapeHtml(labels.search)}">
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </a>
          <div class="language-switcher" aria-label="${escapeHtml(labels.language)}">
            <button type="button" data-lang="en" aria-pressed="${lang === "en"}"${lang !== "en" && altHref ? ` data-lang-href="${escapeHtml(altHref)}"` : ""}>EN</button>
            <button type="button" data-lang="es" aria-pressed="${lang === "es"}"${lang !== "es" && altHref ? ` data-lang-href="${escapeHtml(altHref)}"` : ""}>ES</button>
          </div>
        </nav>
      </header>`;
}

function Footer({ lang = "en" } = {}) {
  const isSpanish = lang === "es";
  return `<footer class="site-footer">
        <p>${escapeHtml(isSpanish ? "IberiGo es gratis. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria." : "IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.")}</p>
        <a href="/support/index.html">${escapeHtml(isSpanish ? "Donar" : "Donate")}</a>
        <div class="site-footer-legal">
          <p>${escapeHtml(isSpanish ? "© 2026 IberiGo. Gratis. No es asesoramiento legal." : "© 2026 IberiGo. Free to use. Not legal advice.")}</p>
          <p>${escapeHtml(isSpanish ? "Última revisión" : "Last reviewed")}: ${REVIEWED}</p>
        </div>
      </footer>`;
}

function Breadcrumbs(items = [], { lang = "en" } = {}) {
  const crumbs = [{ label: lang === "es" ? "Portada" : "Home", href: "/index.html?nav=start#guide-cards" }, ...items];
  return `<nav class="guide-breadcrumbs" aria-label="${escapeHtml(lang === "es" ? "Miga de pan" : "Breadcrumb")}">
          <ol>
            ${crumbs
              .map((item, index) => {
                const current = index === crumbs.length - 1;
                return `<li>${current ? `<span aria-current="page">${escapeHtml(item.label)}</span>` : `<a href="${item.href}">${escapeHtml(item.label)}</a>`}</li>`;
              })
              .join("\n            ")}
          </ol>
        </nav>`;
}

function GuideHero({ kicker = "Guide", title, intro, asideTitle = "About this guide", asideText = "This page is part of the IberiGo guide system.", meta = "" }) {
  return `<section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle">
          <div>
            <span class="guide-kicker">${escapeHtml(kicker)}</span>
            <h1 id="pageTitle">${escapeHtml(title)}</h1>
            <p>${escapeHtml(intro)}</p>
            ${meta}
          </div>
          <aside class="guide-hero-card" aria-label="Guide summary">
            <strong>${escapeHtml(asideTitle)}</strong>
            <p>${escapeHtml(asideText)}</p>
          </aside>
        </section>`;
}

function ImagePlaceholder({ label = "Guide illustration placeholder" } = {}) {
  return `<div class="guide-image-placeholder" role="img" aria-label="${escapeHtml(label)}"></div>`;
}

function QuickAnswer(text) {
  return `<section class="guide-section" aria-labelledby="quickAnswer"><h2 id="quickAnswer">Quick Answer</h2><p>${escapeHtml(text)}</p></section>`;
}

function AtAGlance(rows = []) {
  return `<section class="guide-section" aria-labelledby="atGlance"><h2 id="atGlance">At a Glance</h2>
          <table class="guide-table"><tbody>${rows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</tbody></table>
        </section>`;
}

function GuideSection({ id, title, children }) {
  return `<section class="guide-section" aria-labelledby="${id}"><h2 id="${id}">${escapeHtml(title)}</h2>${children}</section>`;
}

function Cards(items = [], className = "") {
  return `<div class="guide-card-grid${className ? ` ${className}` : ""}">${items
    .map((item, index) => {
      if (typeof item === "string") {
        return `<article class="guide-info-card"><h3>${index + 1}</h3><p>${escapeHtml(item)}</p></article>`;
      }
      return `<article class="guide-info-card"><h3>${escapeHtml(item.title || String(index + 1))}</h3><p>${escapeHtml(item.text || "")}</p></article>`;
    })
    .join("\n          ")}</div>`;
}

function ChecklistBox({ title = "Checklist", items = [] }) {
  return `<div class="guide-box guide-box--checklist"><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
}

function TipBox(text) {
  return `<div class="guide-box guide-box--tip"><strong>Tip</strong><p>${escapeHtml(text)}</p></div>`;
}

function WarningBox(text) {
  return `<div class="guide-box guide-box--warning"><strong>Important</strong><p>${escapeHtml(text)}</p></div>`;
}

function InfoBox({ title = "Note", text }) {
  return `<div class="guide-box guide-box--info"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div>`;
}

function DocumentsChecklist(items = []) {
  return GuideSection({
    id: "documentsChecklist",
    title: "Documents Checklist",
    children: `${ChecklistBox({ title: "Documents to prepare", items })}${InfoBox({ title: "Editorial note", text: "Content under editorial review." })}`
  });
}

function StepTimeline(steps = []) {
  return `<ol class="guide-timeline">${steps
    .map((step, index) => `<li><span>${index + 1}</span><div><h3>${escapeHtml(step.title || `Step ${index + 1}`)}</h3><p>${escapeHtml(step.text || "Content under editorial review.")}</p></div></li>`)
    .join("\n          ")}</ol>`;
}

function CommonMistakes(items = []) {
  return GuideSection({ id: "commonMistakes", title: "Common Mistakes", children: Cards(items) });
}

function RealQuestions(items = []) {
  return GuideSection({
    id: "realQuestions",
    title: "Real Questions People Ask",
    children: Cards(items.map((item) => ({ title: item.question, text: item.answer })))
  });
}

function ButtonRow(items = []) {
  return `<div class="guide-button-row">${items
    .map((item, index) => `<a class="guide-button${index ? " guide-button--secondary" : ""}" href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("\n          ")}</div>`;
}

function GuideLinkCard(item, modifier = "") {
  if (!item || !item.href) return "";
  return `<article class="guide-info-card${modifier ? ` ${modifier}` : ""}">
            <h3>${escapeHtml(item.title || item.label || "Guide")}</h3>
            ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
            <a class="guide-button guide-button--secondary" href="${item.href}">${escapeHtml(item.label || "View guide")}</a>
          </article>`;
}

function ContinueJourney({ previousGuide = null, nextGuide = null, relatedGuides = [] } = {}) {
  const stepHrefs = new Set([previousGuide?.href, nextGuide?.href].filter(Boolean));
  const visibleRelatedGuides = relatedGuides.filter((guide) => guide?.href && !stepHrefs.has(guide.href));
  const groups = [
    previousGuide
      ? `<div class="guide-journey-group"><h3>Previous Step</h3><div class="guide-card-grid guide-card-grid--single">${GuideLinkCard(previousGuide)}</div></div>`
      : "",
    nextGuide
      ? `<div class="guide-journey-group"><h3>Next Step</h3><div class="guide-card-grid guide-card-grid--single">${GuideLinkCard(nextGuide)}</div></div>`
      : "",
    visibleRelatedGuides.length
      ? `<div class="guide-journey-group"><h3>Related Guides</h3><div class="guide-card-grid">${visibleRelatedGuides.map((guide) => GuideLinkCard(guide)).join("\n          ")}</div></div>`
      : ""
  ].filter(Boolean);

  if (!groups.length) return "";
  return `<section class="guide-section guide-continue-journey" aria-labelledby="continueJourney">
          <h2 id="continueJourney">Continue Your Journey</h2>
          ${groups.join("\n          ")}
        </section>`;
}

function ScopeNotice({ lang = "en" } = {}) {
  if (lang === "es") {
    return `<section class="guide-section guide-scope-notice" aria-labelledby="scopeNotice">
          <h2 id="scopeNotice">Aviso de alcance</h2>
          <p>Esta guía ofrece información general para España. Algunos trámites y documentos pueden variar según la provincia o el municipio.</p>
        </section>`;
  }
  return `<section class="guide-section guide-scope-notice" aria-labelledby="scopeNotice">
          <h2 id="scopeNotice">Scope Notice</h2>
          <p>This guide provides general information for Spain. Some procedures and supporting documents may vary by province or municipality.</p>
        </section>`;
}

function OfficialSources(items = [], { lang = "en" } = {}) {
  if (!items.length) return "";
  const stillPending = items.some((item) => !item.url && !item.varies);
  const hasVarying = items.some((item) => item.varies);
  const statusText = lang === "es"
    ? (stillPending
      ? "Algunas referencias oficiales de esta guía todavía se están confirmando. Comprueba siempre los requisitos actuales directamente con la administración oficial."
      : hasVarying
        ? "Estos enlaces llevan a sitios web oficiales cuando existe uno único. Algunas fuentes varían según el municipio o la región — consulta tu ayuntamiento o servicio regional para instrucciones locales. Los detalles oficiales pueden cambiar, así que confirma siempre con la fuente oficial."
        : "Estos enlaces llevan a sitios web oficiales. Los detalles oficiales pueden cambiar, así que confirma siempre los requisitos actuales directamente con la fuente oficial.")
    : (stillPending
      ? "Some official references for this guide are still being confirmed. Always check current requirements directly with the official administration."
      : hasVarying
        ? "These links go to official websites where a single one exists. Some sources vary by municipality or region — check your own town hall or regional service for local instructions. Official details can change, so always confirm with the official source."
        : "These links go to official websites. Official details can change, so always confirm current requirements directly with the official source.");
  const title = lang === "es" ? "Fuentes oficiales" : "Official Sources";
  const defaultSourceName = lang === "es" ? "Fuente oficial" : "Official source";
  const defaultNote = lang === "es"
    ? "Referencia oficial provisional. URL pendiente de verificar antes de publicar."
    : "Official reference placeholder. URL to be verified before publication.";
  const sourceStatusLabel = lang === "es" ? "Estado de la fuente" : "Source status";
  return GuideSection({
    id: "officialSources",
    title,
    children: `<div class="guide-card-grid">${items
      .map((item) => {
        const category = classifySource(item);
        const meta = SOURCE_CATEGORY_META[category];
        const heading = item.url
          ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name || defaultSourceName)}</a>`
          : escapeHtml(item.name || defaultSourceName);
        return `<article class="guide-info-card guide-source-card guide-source-card--${category}">
            <div class="guide-source-head">
              <span class="guide-source-badge" aria-hidden="true">${escapeHtml(meta.initials)}</span>
              <span class="guide-source-tag">${escapeHtml(meta.tag)}</span>
            </div>
            <h3>${heading}</h3>
            <p>${escapeHtml(item.note || defaultNote)}</p>
          </article>`;
      })
      .join("\n          ")}</div>${InfoBox({ title: sourceStatusLabel, text: statusText })}`
  });
}

function LegalDisclaimer({ lang = "en" } = {}) {
  if (lang === "es") {
    return `<section class="guide-section guide-legal-disclaimer" aria-labelledby="legalDisclaimer">
          <h2 id="legalDisclaimer">Aviso legal</h2>
          <p>Esta guía ofrece información práctica, no asesoramiento legal, fiscal, migratorio, financiero ni sobre alquileres. Los requisitos pueden variar según el municipio, la oficina, el banco y la situación personal. Comprueba siempre la fuente oficial actual o consulta con la oficina correspondiente antes de tomar decisiones.</p>
        </section>`;
  }
  return `<section class="guide-section guide-legal-disclaimer" aria-labelledby="legalDisclaimer">
          <h2 id="legalDisclaimer">Legal Disclaimer</h2>
          <p>This guide is practical information, not legal, tax, immigration, financial or rental advice. Requirements can vary by municipality, office, bank and personal situation. Always check the current official source or ask the relevant office before making decisions.</p>
        </section>`;
}

function LastReviewed(date = REVIEWED, reviewedAgainstOfficialGuidance = false, { lang = "en" } = {}) {
  if (!date) return "";
  if (lang === "es") {
    return reviewedAgainstOfficialGuidance
      ? `<div class="last-reviewed"><p><strong>Última revisión:</strong> ${escapeHtml(date)}</p><p>En esta página se enlazan fuentes oficiales para más comprobación; el contenido no ha sido verificado frente a ellas por un profesional cualificado.</p></div>`
      : `<p class="last-reviewed">Última revisión: ${escapeHtml(date)}</p>`;
  }
  return reviewedAgainstOfficialGuidance
    ? `<div class="last-reviewed"><p><strong>Last reviewed:</strong> ${escapeHtml(date)}</p><p>Official sources are linked on this page for further checking; content has not been verified against them by a qualified professional.</p></div>`
    : `<p class="last-reviewed">Last reviewed: ${escapeHtml(date)}</p>`;
}

function StatusBadge() {
  // Internal workflow status (draft/review/published) is not shown to visitors.
  // It still drives robots metadata and search-index inclusion elsewhere.
  return "";
}

function ReadingTime(html, { lang = "en" } = {}) {
  const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `<p class="guide-reading-time">${minutes} ${lang === "es" ? "min de lectura" : "min read"}</p>`;
}

function GuideTableOfContents(items = [], { variant = "desktop", lang = "en" } = {}) {
  if (items.length < 3) return "";
  const label = lang === "es" ? "En esta página" : "On this page";
  const ariaLabel = variant === "desktop" && lang !== "es" ? "Table of contents" : label;
  const links = items
    .map((item, index) => `<li><a href="#${escapeHtml(item.id)}" data-guide-toc-link${index === 0 ? ' aria-current="true"' : ""}>${escapeHtml(item.title)}</a></li>`)
    .join("");

  if (variant === "mobile") {
    return `<details class="guide-toc-mobile" data-guide-toc>
          <summary>${escapeHtml(label)}</summary>
          <nav aria-label="${escapeHtml(label)}"><ol>${links}</ol></nav>
        </details>`;
  }

  return `<aside class="guide-toc" data-guide-toc aria-label="${escapeHtml(ariaLabel)}">
          <strong>${escapeHtml(label)}</strong>
          <nav><ol>${links}</ol></nav>
        </aside>`;
}

function EditorialChecklist(items = DEFAULT_EDITORIAL_CHECKLIST) {
  return `<section hidden data-editorial-checklist aria-label="Editorial checklist">
          <h2>Editorial Checklist</h2>
          <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>`;
}

function Frontmatter(data = {}) {
  const json = JSON.stringify(data, null, 2).replace(/<\/script/gi, "<\\/script");
  return `<script type="application/json" class="guide-frontmatter">${json}</script>`;
}

function stripHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

function tocItemsFromSections(sections = []) {
  return sections
    .map((section) => {
      const match = String(section).match(/<h2 id="([^"]+)">([^<]+)<\/h2>/);
      return match ? { id: match[1], title: match[2] } : null;
    })
    .filter(Boolean);
}

function guideCss() {
  return `<style>
      html { scroll-behavior: smooth; }
      .guide-main { width: min(1080px, calc(100% - 32px)); margin: 0 auto; padding: 1.5rem 0 4.5rem; }
      .guide-main a { overflow-wrap: anywhere; }
      .guide-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(240px, 260px); gap: 1.75rem; align-items: start; }
      .guide-layout--single { grid-template-columns: minmax(0, 1fr); }
      .guide-content { min-width: 0; }
      .guide-breadcrumbs { margin: 0 0 1.1rem; color: rgba(27, 32, 48, 0.62); font-size: 0.86rem; }
      .guide-breadcrumbs ol { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 0; list-style: none; }
      .guide-breadcrumbs li:not(:last-child)::after { content: "/"; margin-left: 0.4rem; color: rgba(27, 32, 48, 0.36); }
      .guide-breadcrumbs a { color: #a64a36; text-decoration: none; font-weight: 800; }
      .guide-breadcrumbs a:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.28); outline-offset: 2px; border-radius: 6px; }
      .search-nav-link { display: inline-flex; align-items: center; justify-content: center; width: 2.55rem; height: 2.55rem; border: 1px solid rgba(166, 74, 54, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.72); color: #a64a36; text-decoration: none; box-shadow: 0 10px 28px rgba(42, 32, 25, 0.06); }
      .search-nav-link svg { width: 1.05rem; height: 1.05rem; }
      .search-nav-link:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.28); outline-offset: 3px; }
      .guide-reading-time { display: inline-flex; width: fit-content; margin: 0.2rem 0 0; color: rgba(27, 32, 48, 0.58); font-size: 0.88rem; font-weight: 800; }
      .guide-toc { position: sticky; top: 1rem; padding: 1rem; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 16px; background: rgba(255, 255, 255, 0.82); box-shadow: 0 14px 36px rgba(42, 32, 25, 0.06); }
      .guide-toc strong, .guide-toc-mobile summary { color: #1b2030; font-weight: 900; }
      .guide-toc ol, .guide-toc-mobile ol { display: grid; gap: 0.58rem; margin: 0.85rem 0 0; padding: 0; list-style: none; }
      .guide-toc li, .guide-toc-mobile li { min-width: 0; }
      .guide-toc a, .guide-toc-mobile a { display: block; min-height: 0; color: rgba(27, 32, 48, 0.68); text-decoration: none; font-size: 0.84rem; font-weight: 800; line-height: 1.42; text-align: left; background: transparent; border: 0; border-radius: 0; box-shadow: none; overflow-wrap: break-word; }
      .guide-toc a { padding: 0.12rem 0 0.12rem 0.7rem; border-left: 2px solid rgba(166, 74, 54, 0.12); }
      .guide-toc-mobile a { min-height: 2.75rem; padding: 0.2rem 0; }
      .guide-toc a[aria-current="true"] { border-left-color: #a64a36; color: #a64a36; }
      .guide-toc-mobile a[aria-current="true"] { color: #a64a36; }
      .guide-toc a:focus-visible, .guide-toc-mobile a:focus-visible, .guide-toc-mobile summary:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.28); outline-offset: 3px; border-radius: 8px; }
      .guide-toc-mobile { display: none; margin: 0 0 1.1rem; padding: 1.1rem; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 16px; background: rgba(255, 255, 255, 0.82); }
      .guide-hero { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(240px, 0.7fr); gap: clamp(1.2rem, 4vw, 2.2rem); align-items: center; padding: clamp(1.6rem, 4.5vw, 3.2rem); }
      .guide-kicker { display: inline-flex; width: fit-content; color: #a64a36; font-size: 0.74rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
      .guide-hero h1 { max-width: 720px; margin: 0.65rem 0 0.9rem; color: #1b2030; font-size: clamp(2.1rem, 5vw, 3.4rem); line-height: 1.06; letter-spacing: -0.01em; }
      .guide-hero p, .guide-section > p, .guide-hero-card p { max-width: 68ch; color: rgba(27, 32, 48, 0.72); font-size: 1rem; line-height: 1.7; }
      .guide-hero-card, .guide-section, .guide-info-card { border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 16px; background: rgba(255, 255, 255, 0.82); box-shadow: 0 14px 36px rgba(42, 32, 25, 0.06); }
      .guide-hero-card { padding: 1.35rem; }
      .guide-hero-card strong { display: block; margin-bottom: 0.55rem; color: #1b2030; font-size: 1.05rem; }
      .guide-section { padding: clamp(1.15rem, 3vw, 1.7rem); margin-top: 1.25rem; scroll-margin-top: 96px; }
      .guide-section h2 { margin: 0 0 0.9rem; color: #1b2030; font-size: clamp(1.35rem, 2.6vw, 1.8rem); line-height: 1.2; }
      .guide-card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
      .guide-card-grid--single { grid-template-columns: minmax(0, 1fr); }
      .guide-continue-journey { display: grid; gap: 1.1rem; }
      .guide-journey-group { display: grid; gap: 0.8rem; }
      .guide-journey-group > h3 { margin: 0; color: rgba(27, 32, 48, 0.58); font-size: 0.78rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; }
      .guide-info-card { display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; }
      .guide-info-card > .guide-button { margin-top: auto; width: 100%; white-space: normal; line-height: 1.3; }
      .guide-journey-group .guide-info-card { gap: 0.65rem; }
      .guide-info-card, .guide-box { padding: 1.1rem; }
      .guide-info-card h3, .guide-box h3, .guide-timeline h3 { margin: 0 0 0.5rem; color: #1b2030; font-size: 1rem; line-height: 1.35; }
      .guide-info-card h3 a { color: inherit; }
      .guide-info-card p, .guide-info-card li, .guide-box p, .guide-box li, .guide-timeline p { margin: 0; color: rgba(27, 32, 48, 0.7); font-size: 0.95rem; line-height: 1.62; overflow-wrap: break-word; }
      .guide-source-card { --source-accent: #a64a36; --source-accent-soft: rgba(166, 74, 54, 0.1); border-left: 4px solid var(--source-accent); }
      .guide-source-head { display: flex; align-items: center; gap: 0.55rem; }
      .guide-source-badge { flex: 0 0 auto; display: inline-grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 7px; background: var(--source-accent-soft); color: var(--source-accent); font-size: 0.66rem; font-weight: 900; letter-spacing: 0.02em; }
      .guide-source-tag { color: rgba(27, 32, 48, 0.55); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; }
      .guide-source-card--police { --source-accent: #1d3a5f; --source-accent-soft: rgba(29, 58, 95, 0.1); }
      .guide-source-card--eu { --source-accent: #1954a6; --source-accent-soft: rgba(25, 84, 166, 0.1); }
      .guide-source-card--tax { --source-accent: #a25b00; --source-accent-soft: rgba(162, 91, 0, 0.1); }
      .guide-source-card--social-security { --source-accent: #1d5fa4; --source-accent-soft: rgba(29, 95, 164, 0.1); }
      .guide-source-card--traffic { --source-accent: #b5651d; --source-accent-soft: rgba(181, 101, 29, 0.1); }
      .guide-source-card--healthcare { --source-accent: #2b8f6f; --source-accent-soft: rgba(43, 143, 111, 0.1); }
      .guide-source-card--municipal { --source-accent: #8a6d3b; --source-accent-soft: rgba(138, 109, 59, 0.1); }
      .guide-source-card--government { --source-accent: #aa151b; --source-accent-soft: rgba(170, 21, 27, 0.08); }
      .guide-box ul { margin: 0; padding-left: 1.05rem; display: grid; gap: 0.4rem; }
      .guide-section a[target="_blank"]::after { content: " ↗"; font-size: 0.85em; color: rgba(166, 74, 54, 0.75); }
      .guide-hero p a, .guide-section p a, .guide-box p a, .guide-info-card p a { color: #a64a36; text-decoration: underline; text-underline-offset: 2px; }
      .guide-hero p a:hover, .guide-section p a:hover, .guide-box p a:hover, .guide-info-card p a:hover { color: #8f3e2c; }
      .guide-hero p a:focus-visible, .guide-section p a:focus-visible, .guide-box p a:focus-visible, .guide-info-card p a:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.28); outline-offset: 2px; border-radius: 4px; }
      .guide-info-card h3 a, .guide-source-card h3 a { color: inherit; text-decoration: none; }
      .guide-table { width: 100%; border-collapse: separate; border-spacing: 0; overflow: hidden; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 16px; font-size: 0.95rem; }
      .guide-table th, .guide-table td { padding: 0.9rem; border-bottom: 1px solid rgba(166, 74, 54, 0.1); text-align: left; vertical-align: top; line-height: 1.55; }
      .guide-table th { width: 34%; background: rgba(253, 240, 220, 0.66); color: #1b2030; }
      .guide-table td { color: rgba(27, 32, 48, 0.72); }
      .guide-table tr:last-child th, .guide-table tr:last-child td { border-bottom: 0; }
      .guide-box { border-radius: 16px; margin-top: 1.1rem; }
      .guide-box strong { display: block; margin-bottom: 0.4rem; color: #1b2030; font-size: 0.98rem; }
      .guide-box--warning { border: 1px solid rgba(166, 74, 54, 0.18); background: rgba(253, 240, 220, 0.72); }
      .guide-box--tip { border: 1px solid rgba(38, 57, 94, 0.12); background: rgba(38, 57, 94, 0.06); }
      .guide-box--info, .guide-box--checklist { border: 1px solid rgba(166, 74, 54, 0.13); background: rgba(255, 255, 255, 0.82); }
      .guide-timeline { display: grid; gap: 0.8rem; margin: 0; padding: 0; list-style: none; }
      .guide-timeline li { display: grid; grid-template-columns: auto 1fr; gap: 0.8rem; align-items: start; padding: 0.9rem; border-radius: 16px; background: rgba(253, 240, 220, 0.46); }
      .guide-timeline span { display: inline-grid; width: 2rem; height: 2rem; place-items: center; border-radius: 10px; background: #a64a36; color: #fff; font-weight: 900; }
      .guide-button-row { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.1rem; }
      .guide-button { display: inline-flex; align-items: center; justify-content: center; min-height: 2.75rem; border-radius: 999px; background: #a64a36; color: #fff; font-weight: 900; font-size: 0.95rem; padding: 0.7rem 1.2rem; text-decoration: none; text-align: center; }
      .guide-button:hover { background: #8f3e2c; }
      .guide-button:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.32); outline-offset: 3px; }
      .guide-button--secondary { border: 1px solid rgba(166, 74, 54, 0.22); background: #fff; color: #a64a36; }
      .guide-button--secondary:hover { background: rgba(253, 240, 220, 0.55); }
      .guide-button[aria-disabled="true"] { background: rgba(27, 32, 48, 0.08); border-color: transparent; color: rgba(27, 32, 48, 0.45); cursor: default; }
      .last-reviewed { margin: 1.25rem 0 0; color: rgba(27, 32, 48, 0.58); font-size: 0.88rem; }
      .guide-image-placeholder { min-height: 180px; border: 1px dashed rgba(166, 74, 54, 0.22); border-radius: 16px; background: linear-gradient(135deg, rgba(253, 240, 220, 0.7), rgba(255, 255, 255, 0.72)); }
      @media (max-width: 1040px) { .guide-layout { grid-template-columns: minmax(0, 1fr); } .guide-toc { display: none; } .guide-toc-mobile { display: block; } }
      @media (max-width: 900px) { .guide-hero { grid-template-columns: 1fr; } .guide-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 640px) { .guide-main { width: min(100% - 24px, 1080px); padding-top: 1.1rem; } .guide-hero, .guide-section { padding: 1.15rem; } .guide-hero h1 { font-size: clamp(1.85rem, 8vw, 2.3rem); } .guide-card-grid { grid-template-columns: minmax(0, 1fr); } .guide-table, .guide-table tbody, .guide-table tr, .guide-table th, .guide-table td { display: block; width: 100%; } .guide-table th { border-bottom: 0; padding-bottom: 0.35rem; } .guide-table td { padding-top: 0.45rem; } .guide-button { width: 100%; } .guide-journey-group .guide-button { justify-self: stretch; } }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
    </style>`;
}

function GuideLayout(config) {
  const canonical = config.canonical || `${SITE_URL}${config.path}`;
  const metadata = config.metadata || {};
  const lang = config.lang || "en";
  const status = config.status || metadata.status || "draft";
  const lastReviewed = config.lastReviewed !== undefined ? config.lastReviewed : metadata.lastReviewed || REVIEWED;
  const robots = config.robots || (status === "published" ? "index, follow" : "noindex, nofollow");
  const sections = config.sections || [];
  const tocItems = tocItemsFromSections(sections);
  const showToc = tocItems.length >= 3;
  const officialSources = metadata.officialSources || config.officialSources || [];
  const showTrustBlocks = Boolean(metadata.showTrustBlocks || config.showTrustBlocks || officialSources.length);
  const hasOfficialSources = officialSources.length > 0;
  const showContinueJourney = config.showContinueJourney !== false;
  const mainContent = [
    Breadcrumbs(config.breadcrumbs || [], { lang }),
    StatusBadge(),
    GuideHero({ ...config.hero, meta: ReadingTime(sections.join("\n"), { lang }) }),
    GuideTableOfContents(tocItems, { variant: "mobile", lang }),
    ...sections,
    showTrustBlocks ? ScopeNotice({ lang }) : "",
    OfficialSources(officialSources, { lang }),
    showTrustBlocks ? LegalDisclaimer({ lang }) : "",
    LastReviewed(lastReviewed, hasOfficialSources, { lang }),
    showContinueJourney ? ContinueJourney({
      previousGuide: metadata.previousGuide || config.previousGuide || null,
      nextGuide: metadata.nextGuide || config.nextGuide || null,
      relatedGuides: metadata.relatedGuides || config.relatedGuides || []
    }) : ""
  ].filter(Boolean).join("\n        ");
  const hreflangLinksHtml = (config.hreflangAlternates || [])
    .map((alt) => `<link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`)
    .join("\n    ");
  const content = `<div class="guide-layout${showToc ? "" : " guide-layout--single"}">
          <div class="guide-content">
            ${mainContent}
          </div>
          ${showToc ? GuideTableOfContents(tocItems, { lang }) : ""}
        </div>
        ${EditorialChecklist(config.editorialChecklist)}
        ${Frontmatter({
          title: config.title,
          description: config.description,
          keywords: metadata.keywords || config.keywords || [],
          category: metadata.category || config.category || "",
          difficulty: metadata.difficulty || config.difficulty || "",
          estimatedTime: metadata.estimatedTime || config.estimatedTime || "",
          appliesTo: metadata.appliesTo || config.appliesTo || [],
          previousGuide: metadata.previousGuide || config.previousGuide || null,
          nextGuide: metadata.nextGuide || config.nextGuide || null,
          canonicalUrl: canonical,
          url: config.path || "",
          status,
          lastReviewed,
          reviewedBy: config.reviewedBy || metadata.reviewedBy || "",
          ...(officialSources.length ? { officialSources } : {}),
          relatedGuides: metadata.relatedGuides || config.relatedGuides || [],
          editorialChecklist: config.editorialChecklist || DEFAULT_EDITORIAL_CHECKLIST
        })}`;

  return `<!doctype html>
<html lang="${escapeHtml(lang)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="googlebot" content="${escapeHtml(robots)}" />
    <meta name="google-site-verification" content="CAcMVtOf-E7h3POi3JXHwBrGJjKFRzWga9rFYHbBUZM" />
    <title>${escapeHtml(config.title)}</title>
    <meta name="description" content="${escapeHtml(config.description)}" />
    <link rel="canonical" href="${canonical}" />${hreflangLinksHtml ? `\n    ${hreflangLinksHtml}` : ""}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="IberiGo" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="https://iberigo.eu/assets/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="/styles.css?v=20260625-wordmark" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
    <link rel="apple-touch-icon" href="/assets/favicon.svg" />
    ${guideCss()}
  </head>
  <body>
    <div class="app-shell">
      ${Header({ lang, altHref: config.altHref || null })}
      <main class="guide-main">
        ${content}
      </main>
      ${Footer({ lang })}
    </div>
    <script>
      (function () {
        var topbar = document.querySelector(".topbar");
        if (!topbar) return;
        var update = function () { topbar.classList.toggle("is-scrolled", window.scrollY > 24); };
        update();
        window.addEventListener("scroll", update, { passive: true });
      })();${config.altHref ? `
      (function () {
        var langButtons = Array.prototype.slice.call(document.querySelectorAll(".language-switcher [data-lang-href]"));
        langButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            window.location.href = button.getAttribute("data-lang-href");
          });
        });
      })();` : ""}
      (function () {
        var tocLinks = Array.prototype.slice.call(document.querySelectorAll("[data-guide-toc-link]"));
        if (!tocLinks.length) return;
        var headings = tocLinks
          .map(function (link) {
            var id = decodeURIComponent(link.getAttribute("href").slice(1));
            return document.getElementById(id);
          })
          .filter(Boolean);
        var setCurrent = function (id) {
          tocLinks.forEach(function (link) {
            var isCurrent = link.getAttribute("href") === "#" + id;
            if (isCurrent) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        };
        if ("IntersectionObserver" in window) {
          var visible = new Map();
          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
              else visible.delete(entry.target.id);
            });
            if (!visible.size) return;
            var current = Array.from(visible.entries()).sort(function (a, b) { return a[1] - b[1]; })[0][0];
            setCurrent(current);
          }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] });
          headings.forEach(function (heading) { observer.observe(heading); });
        }
        tocLinks.forEach(function (link) {
          link.addEventListener("click", function () {
            var id = decodeURIComponent(link.getAttribute("href").slice(1));
            setCurrent(id);
          });
        });
      })();
    </script>
  </body>
</html>
`;
}

module.exports = {
  Header,
  Footer,
  GuideLayout,
  GuideHero,
  Breadcrumbs,
  QuickAnswer,
  AtAGlance,
  GuideSection,
  ChecklistBox,
  TipBox,
  WarningBox,
  InfoBox,
  DocumentsChecklist,
  StepTimeline,
  CommonMistakes,
  RealQuestions,
  GuideTableOfContents,
  ContinueJourney,
  ScopeNotice,
  OfficialSources,
  LegalDisclaimer,
  LastReviewed,
  ImagePlaceholder,
  Cards,
  ButtonRow
};
