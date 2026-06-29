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

function Header() {
  return `<header class="topbar">
        <div class="brand-lockup">
          <span class="brand-wordmark" aria-label="IberiGo">Iberi<span class="brand-wordmark-accent">Go</span></span>
        </div>
        <nav aria-label="Main sections">
          <a href="/index.html?nav=start#guide-cards">Home</a>
          <a href="/the-spain-files/">The Spain Files</a>
          <a href="/support/index.html">Support IberiGo</a>
          <a class="search-nav-link" href="/search/" aria-label="Search IberiGo">
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </a>
          <div class="language-switcher" aria-label="Language">
            <button type="button" data-lang="en" aria-pressed="true">EN</button>
            <button type="button" data-lang="es" aria-pressed="false">ES</button>
          </div>
        </nav>
      </header>`;
}

function Footer() {
  return `<footer class="site-footer">
        <p>IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.</p>
        <a href="/support/index.html">Support IberiGo</a>
        <div class="site-footer-legal">
          <p>© 2026 IberiGo. Free to use. Not legal advice.</p>
          <p>Last reviewed: ${REVIEWED}</p>
        </div>
      </footer>`;
}

function Breadcrumbs(items = []) {
  const crumbs = [{ label: "Home", href: "/index.html?nav=start#guide-cards" }, ...items];
  return `<nav class="guide-breadcrumbs" aria-label="Breadcrumb">
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

function GuideHero({ kicker = "Guide", title, intro, asideTitle = "Draft guide", asideText = "This page uses the IberiGo guide system and will be reviewed before publication." }) {
  return `<section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle">
          <div>
            <span class="guide-kicker">${escapeHtml(kicker)}</span>
            <h1 id="pageTitle">${escapeHtml(title)}</h1>
            <p>${escapeHtml(intro)}</p>
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

function ContinueJourney(items = []) {
  return `<section class="guide-section" aria-labelledby="continueJourney"><h2 id="continueJourney">Continue Your Journey</h2><p>Choose the next guide that matches your situation.</p>${ButtonRow(items)}</section>`;
}

function PreviousNext({ previous, next } = {}) {
  if (!previous && !next) return "";
  return `<nav class="guide-prev-next" aria-label="Guide previous and next">
          ${previous ? `<a href="${previous.href}"><span>Previous</span><strong>${escapeHtml(previous.label)}</strong></a>` : "<span></span>"}
          ${next ? `<a href="${next.href}"><span>Next</span><strong>${escapeHtml(next.label)}</strong></a>` : "<span></span>"}
        </nav>`;
}

function RelatedGuides(items = []) {
  return `<section class="guide-section" aria-labelledby="relatedGuides"><h2 id="relatedGuides">Related Guides</h2>${Cards(items.map((item) => ({ title: item.label, text: item.description || "Open the related IberiGo guide." })))}${ButtonRow(items)}</section>`;
}

function LastReviewed(date = REVIEWED) {
  return date ? `<p class="last-reviewed">Last reviewed: ${escapeHtml(date)}</p>` : "";
}

function StatusBadge(status) {
  const labels = {
    draft: "DRAFT — Not reviewed for publication",
    review: "IN REVIEW — Needs final approval"
  };
  const label = labels[status];
  return label ? `<div class="guide-status-badge guide-status-badge--${escapeHtml(status)}" role="note">${escapeHtml(label)}</div>` : "";
}

function ReadingTime(html) {
  const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `<p class="guide-reading-time">${minutes} min read</p>`;
}

function TableOfContents(items = []) {
  if (!items.length) return "";
  const links = items.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.title)}</a></li>`).join("");
  return `<aside class="guide-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <nav><ol>${links}</ol></nav>
        </aside>`;
}

function MobileTableOfContents(items = []) {
  if (!items.length) return "";
  const links = items.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.title)}</a></li>`).join("");
  return `<details class="guide-toc-mobile">
          <summary>On this page</summary>
          <nav><ol>${links}</ol></nav>
        </details>`;
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
      .guide-main { width: min(1080px, calc(100% - 32px)); margin: 0 auto; padding: 1.4rem 0 4rem; }
      .guide-layout { display: grid; grid-template-columns: minmax(0, 1fr) 230px; gap: 1.2rem; align-items: start; }
      .guide-content { min-width: 0; }
      .guide-breadcrumbs { margin: 0 0 1rem; color: rgba(27, 32, 48, 0.62); font-size: 0.86rem; }
      .guide-breadcrumbs ol { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 0; list-style: none; }
      .guide-breadcrumbs li:not(:last-child)::after { content: "/"; margin-left: 0.4rem; color: rgba(27, 32, 48, 0.36); }
      .guide-breadcrumbs a { color: #a64a36; text-decoration: none; font-weight: 800; }
      .search-nav-link { display: inline-flex; align-items: center; justify-content: center; width: 2.55rem; height: 2.55rem; border: 1px solid rgba(166, 74, 54, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.72); color: #a64a36; text-decoration: none; box-shadow: 0 10px 28px rgba(42, 32, 25, 0.06); }
      .search-nav-link svg { width: 1.05rem; height: 1.05rem; }
      .search-nav-link:focus-visible { outline: 3px solid rgba(166, 74, 54, 0.28); outline-offset: 3px; }
      .guide-status-badge { margin: 0 0 1rem; padding: 0.65rem 0.85rem; border: 1px solid rgba(166, 74, 54, 0.18); border-radius: 999px; background: rgba(253, 240, 220, 0.72); color: #a64a36; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; width: fit-content; }
      .guide-status-badge--review { border-color: rgba(38, 57, 94, 0.18); background: rgba(38, 57, 94, 0.08); color: #26395e; }
      .guide-reading-time { margin: -0.35rem 0 1rem; color: rgba(27, 32, 48, 0.58); font-size: 0.88rem; }
      .guide-toc { position: sticky; top: 1rem; padding: 1rem; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 18px; background: rgba(255, 255, 255, 0.78); box-shadow: 0 18px 48px rgba(42, 32, 25, 0.08); }
      .guide-toc strong, .guide-toc-mobile summary { color: #1b2030; font-weight: 900; }
      .guide-toc ol, .guide-toc-mobile ol { display: grid; gap: 0.45rem; margin: 0.75rem 0 0; padding-left: 1rem; }
      .guide-toc a, .guide-toc-mobile a { color: rgba(27, 32, 48, 0.68); text-decoration: none; font-size: 0.86rem; font-weight: 800; }
      .guide-toc-mobile { display: none; margin: 0 0 1rem; padding: 1rem; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 18px; background: rgba(255, 255, 255, 0.78); }
      .guide-hero { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(240px, 0.7fr); gap: clamp(1.2rem, 4vw, 2.4rem); align-items: center; padding: clamp(2rem, 5vw, 4rem); }
      .guide-kicker { display: inline-flex; width: fit-content; color: #a64a36; font-size: 0.74rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
      .guide-hero h1 { max-width: 760px; margin: 0.7rem 0 1rem; color: #1b2030; font-size: clamp(2.35rem, 5.8vw, 4.4rem); line-height: 0.98; }
      .guide-hero p, .guide-section > p, .guide-hero-card p { color: rgba(27, 32, 48, 0.7); font-size: 1rem; line-height: 1.7; }
      .guide-hero-card, .guide-section, .guide-info-card { border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 18px; background: rgba(255, 255, 255, 0.78); box-shadow: 0 18px 48px rgba(42, 32, 25, 0.08); }
      .guide-hero-card { padding: 1.35rem; }
      .guide-hero-card strong { display: block; margin-bottom: 0.55rem; color: #1b2030; font-size: 1.05rem; }
      .guide-section { padding: clamp(1.1rem, 3vw, 1.6rem); margin-top: 1.15rem; }
      .guide-section h2 { margin: 0 0 0.85rem; color: #1b2030; font-size: clamp(1.45rem, 3vw, 2rem); }
      .guide-card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem; }
      .guide-info-card, .guide-box { padding: 1rem; }
      .guide-info-card h3, .guide-box h3, .guide-timeline h3 { margin: 0 0 0.45rem; color: #1b2030; font-size: 1rem; }
      .guide-info-card p, .guide-info-card li, .guide-box p, .guide-box li, .guide-timeline p { margin: 0; color: rgba(27, 32, 48, 0.68); font-size: 0.93rem; line-height: 1.58; }
      .guide-box ul { margin: 0; padding-left: 1rem; }
      .guide-table { width: 100%; border-collapse: separate; border-spacing: 0; overflow: hidden; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 16px; }
      .guide-table th, .guide-table td { padding: 0.85rem; border-bottom: 1px solid rgba(166, 74, 54, 0.1); text-align: left; vertical-align: top; }
      .guide-table th { width: 34%; background: rgba(253, 240, 220, 0.66); color: #1b2030; }
      .guide-table td { color: rgba(27, 32, 48, 0.72); }
      .guide-table tr:last-child th, .guide-table tr:last-child td { border-bottom: 0; }
      .guide-box { border-radius: 16px; margin-top: 1rem; }
      .guide-box strong { display: block; margin-bottom: 0.35rem; color: #1b2030; }
      .guide-box--warning { border: 1px solid rgba(166, 74, 54, 0.18); background: rgba(253, 240, 220, 0.72); }
      .guide-box--tip { border: 1px solid rgba(38, 57, 94, 0.12); background: rgba(38, 57, 94, 0.06); }
      .guide-box--info, .guide-box--checklist { border: 1px solid rgba(166, 74, 54, 0.13); background: rgba(255, 255, 255, 0.78); }
      .guide-timeline { display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none; }
      .guide-timeline li { display: grid; grid-template-columns: auto 1fr; gap: 0.75rem; align-items: start; padding: 0.85rem; border-radius: 16px; background: rgba(253, 240, 220, 0.46); }
      .guide-timeline span { display: inline-grid; width: 2rem; height: 2rem; place-items: center; border-radius: 10px; background: #a64a36; color: #fff; font-weight: 900; }
      .guide-button-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; }
      .guide-button { display: inline-flex; align-items: center; justify-content: center; min-height: 2.6rem; border-radius: 999px; background: #a64a36; color: #fff; font-weight: 900; padding: 0.65rem 1rem; text-decoration: none; }
      .guide-button--secondary { border: 1px solid rgba(166, 74, 54, 0.18); background: #fff; color: #a64a36; }
      .guide-prev-next { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; margin-top: 1.15rem; }
      .guide-prev-next a { display: grid; gap: 0.25rem; min-height: 4rem; padding: 0.9rem 1rem; border: 1px solid rgba(166, 74, 54, 0.13); border-radius: 18px; background: rgba(255, 255, 255, 0.78); color: #1b2030; text-decoration: none; box-shadow: 0 18px 48px rgba(42, 32, 25, 0.08); }
      .guide-prev-next span { color: rgba(27, 32, 48, 0.58); font-size: 0.78rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
      .guide-prev-next strong { color: #a64a36; font-size: 1rem; }
      .last-reviewed { margin: 1.2rem 0 0; color: rgba(27, 32, 48, 0.58); font-size: 0.88rem; }
      .guide-image-placeholder { min-height: 180px; border: 1px dashed rgba(166, 74, 54, 0.22); border-radius: 18px; background: linear-gradient(135deg, rgba(253, 240, 220, 0.7), rgba(255, 255, 255, 0.72)); }
      @media (max-width: 900px) { .guide-layout, .guide-hero, .guide-card-grid { grid-template-columns: 1fr; } .guide-toc { display: none; } .guide-toc-mobile { display: block; } }
      @media (max-width: 640px) { .guide-main { width: min(100% - 20px, 1080px); padding-top: 1rem; } .guide-hero, .guide-section { padding: 1.1rem; } .guide-table, .guide-table tbody, .guide-table tr, .guide-table th, .guide-table td { display: block; width: 100%; } .guide-table th { border-bottom: 0; } .guide-button { width: 100%; } .guide-prev-next { grid-template-columns: 1fr; } }
    </style>`;
}

function GuideLayout(config) {
  const canonical = config.canonical || `${SITE_URL}${config.path}`;
  const metadata = config.metadata || {};
  const status = config.status || metadata.status || "draft";
  const lastReviewed = config.lastReviewed !== undefined ? config.lastReviewed : metadata.lastReviewed || REVIEWED;
  const robots = config.robots || (status === "published" ? "index, follow" : "noindex, nofollow");
  const sections = config.sections || [];
  const tocItems = tocItemsFromSections(sections);
  const mainContent = [
    Breadcrumbs(config.breadcrumbs || []),
    StatusBadge(status),
    GuideHero(config.hero),
    ReadingTime(sections.join("\n")),
    MobileTableOfContents(tocItems),
    ...sections,
    LastReviewed(lastReviewed),
    PreviousNext(metadata.previousNext || config.previousNext),
    ContinueJourney(metadata.continueJourney || config.continueJourney || []),
    RelatedGuides(metadata.relatedGuides || config.relatedGuides || [])
  ].filter(Boolean).join("\n        ");
  const content = `<div class="guide-layout">
          <div class="guide-content">
            ${mainContent}
          </div>
          ${TableOfContents(tocItems)}
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
          relatedGuides: metadata.relatedGuides || config.relatedGuides || [],
          continueJourney: metadata.continueJourney || config.continueJourney || [],
          previousNext: metadata.previousNext || config.previousNext || {},
          editorialChecklist: config.editorialChecklist || DEFAULT_EDITORIAL_CHECKLIST
        })}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="googlebot" content="${escapeHtml(robots)}" />
    <meta name="google-site-verification" content="CAcMVtOf-E7h3POi3JXHwBrGJjKFRzWga9rFYHbBUZM" />
    <title>${escapeHtml(config.title)}</title>
    <meta name="description" content="${escapeHtml(config.description)}" />
    <link rel="canonical" href="${canonical}" />
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
      ${Header()}
      <main class="guide-main">
        ${content}
      </main>
      ${Footer()}
    </div>
    <script>
      (function () {
        var topbar = document.querySelector(".topbar");
        if (!topbar) return;
        var update = function () { topbar.classList.toggle("is-scrolled", window.scrollY > 24); };
        update();
        window.addEventListener("scroll", update, { passive: true });
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
  ContinueJourney,
  RelatedGuides,
  LastReviewed,
  ImagePlaceholder,
  Cards,
  ButtonRow
};
