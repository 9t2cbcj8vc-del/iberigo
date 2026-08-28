const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const STYLE_MARKER = "data-iberigo-static-action-guide-style";
const RUNTIME_MARKER = "data-iberigo-static-action-guide-runtime";
const PAGE_MARKER = 'data-iberigo-static-action-guide="true"';

const GUIDES = [
  {
    file: "guides/nie/index.html",
    en: "/guides/nie/",
    es: "/guides/es/nie/",
  },
  {
    file: "guides/es/nie/index.html",
    en: "/guides/nie/",
    es: "/guides/es/nie/",
  },
  {
    file: "guides/tie/index.html",
    en: "/guides/tie/",
    es: "/guides/es/tie/",
  },
  {
    file: "guides/es/tie/index.html",
    en: "/guides/tie/",
    es: "/guides/es/tie/",
  },
];

const STYLE = `<style ${STYLE_MARKER}>
      html[${PAGE_MARKER}] #wizard.panel.wizard-panel {
        display: block !important;
        grid-template-columns: minmax(0, 1fr) !important;
        max-width: 1120px;
      }
      html[${PAGE_MARKER}] #routeWizard,
      html[${PAGE_MARKER}] #guide-cards,
      html[${PAGE_MARKER}] #documents,
      html[${PAGE_MARKER}] #sources {
        display: none !important;
      }
      html[${PAGE_MARKER}] #wizardResult {
        display: block !important;
        width: 100%;
        max-width: none !important;
        margin: 0;
      }
      html[${PAGE_MARKER}] .crawler-guide-intro {
        max-width: 900px;
        padding: clamp(0.5rem, 1.2vw, 0.9rem) 0 clamp(0.9rem, 2vw, 1.4rem);
      }
      html[${PAGE_MARKER}] .crawler-guide-intro h1 {
        max-width: 18ch;
        font-size: clamp(2.35rem, 5vw, 4.35rem);
        line-height: 0.98;
      }
      html[${PAGE_MARKER}] .crawler-guide-intro p {
        max-width: 62ch;
        font-size: clamp(1rem, 1.6vw, 1.13rem);
      }
      html[${PAGE_MARKER}] .action-first-card {
        margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
      }
      html[${PAGE_MARKER}] .result-hero {
        margin-top: clamp(1.4rem, 3vw, 2.25rem);
      }
      html[${PAGE_MARKER}] .language-switcher a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 34px;
        min-height: 34px;
        border-radius: 999px;
        color: inherit;
        font-size: 0.78rem;
        font-weight: 800;
        text-decoration: none;
      }
      html[${PAGE_MARKER}] .language-switcher a[aria-current="page"] {
        background: var(--button-bg, #a64a36);
        color: #fffdf9;
      }
      @media (max-width: 720px) {
        html[${PAGE_MARKER}] #wizard.panel.wizard-panel {
          padding: clamp(1rem, 4vw, 1.35rem) !important;
        }
        html[${PAGE_MARKER}] .crawler-guide-intro h1 {
          max-width: 13ch;
          font-size: clamp(2.15rem, 12vw, 3.2rem);
        }
      }
    </style>`;

function stripGenerated(html) {
  html = html.replace(new RegExp(`\\s*<style\\b[^>]*${STYLE_MARKER}[^>]*>[\\s\\S]*?<\\/style>`, "gi"), "");
  html = html.replace(new RegExp(`\\s*<script\\b[^>]*${RUNTIME_MARKER}[^>]*>[\\s\\S]*?<\\/script>`, "gi"), "");
  html = html.replace(/\s+data-iberigo-static-action-guide=["']true["']/gi, "");
  return html;
}

function removeLegacyApp(html) {
  const re = /\s*<script\b[^>]*\bsrc=["'](?:\.\/|\/)?app\.js(?:\?v=[^"']*)?["'][^>]*>\s*<\/script>/gi;
  const next = html.replace(re, "");
  if (next === html) throw new Error("Direct action guide did not contain an app.js script tag to remove");
  return next;
}

function replaceLanguageSwitcher(html, guide) {
  const currentLang = /<html\b[^>]*\blang=["']es["']/i.test(html) ? "es" : "en";
  const markup = `<div class="language-switcher" aria-label="Language">
            <a href="${guide.en}" data-lang="en"${currentLang === "en" ? ' aria-current="page"' : ""}>EN</a>
            <a href="${guide.es}" data-lang="es"${currentLang === "es" ? ' aria-current="page"' : ""}>ES</a>
          </div>`;
  const re = /<div\b[^>]*class=["'][^"']*\blanguage-switcher\b[^"']*["'][^>]*>[\s\S]*?<\/div>/i;
  if (!re.test(html)) throw new Error("Direct action guide language switcher not found");
  return html.replace(re, markup);
}

function transform(guide) {
  const file = path.join(ROOT, guide.file);
  let html = stripGenerated(fs.readFileSync(file, "utf8"));
  if (!html.includes("data-iberigo-action-first")) {
    throw new Error(`${guide.file}: action-first card must be baked before static conversion`);
  }
  html = removeLegacyApp(html);
  html = replaceLanguageSwitcher(html, guide);
  html = html.replace(/<html\b([^>]*)>/i, `<html$1 ${PAGE_MARKER}>`);
  html = html.replace(/\s*<\/head>/i, `\n    ${STYLE}\n  </head>`);
  fs.writeFileSync(file, html, "utf8");
}

for (const guide of GUIDES) transform(guide);
console.log(`Static-first direct guide layout baked for ${GUIDES.length} NIE/TIE routes; legacy app.js removed from those pages.`);
