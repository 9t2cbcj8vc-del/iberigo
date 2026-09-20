const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXCLUDED_DIRS = new Set([".git", ".github", ".netlify", "node_modules", "outputs", "work"]);
const STYLE_MARKER = "data-iberigo-visual-ux-cleanup";

const STYLE = `<style ${STYLE_MARKER}>
      html, body {
        max-width: 100%;
        overflow-x: clip;
      }
      .app-shell {
        max-width: 100%;
        min-width: 0;
        overflow-x: clip;
      }
      @media (max-width: 760px) {
        .topbar {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          gap: 9px !important;
          padding: 10px 14px !important;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        .brand-lockup { flex: 0 1 auto; min-width: 0; }
        .brand-wordmark { font-size: 22px; }
        .topbar nav {
          display: flex !important;
          flex: 1 1 100% !important;
          width: 100% !important;
          min-width: 0 !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 6px !important;
        }
        .topbar nav a {
          flex: 0 1 auto !important;
          min-height: 38px;
          padding: 8px 11px !important;
        }
        .topbar .search-nav-link { order: -2; }
        .topbar .language-switcher {
          order: -1;
          flex: 0 0 auto !important;
          width: auto !important;
          min-height: 38px;
          justify-content: flex-start !important;
          padding: 3px !important;
        }
        .topbar .language-switcher button {
          min-width: 34px;
          min-height: 32px;
        }
        main > section { scroll-margin-top: 118px; }
      }
      @media (max-width: 420px) {
        .topbar { padding-inline: 12px !important; gap: 8px !important; }
        .topbar nav { gap: 5px !important; }
        .topbar nav a {
          flex-basis: auto !important;
          padding-inline: 10px !important;
          font-size: 0.82rem;
        }
        .topbar .language-switcher {
          width: auto !important;
          justify-content: flex-start !important;
        }
        main > section { scroll-margin-top: 112px; }
      }
    </style>`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(full);
  }
  return files;
}

function cleanupExisting(html) {
  return html.replace(
    new RegExp(`\\s*<style\\b[^>]*${STYLE_MARKER}[^>]*>[\\s\\S]*?<\\/style>`, "gi"),
    ""
  );
}

let changed = 0;
for (const file of walk(ROOT)) {
  let html = cleanupExisting(fs.readFileSync(file, "utf8"));
  if (!/<\/head>/i.test(html)) continue;
  html = html.replace(/\s*<\/head>/i, `\n    ${STYLE}\n  </head>`);
  fs.writeFileSync(file, html, "utf8");
  changed += 1;
}

if (!changed) throw new Error("No public HTML pages received the visual UX cleanup");
console.log(`Visual UX cleanup baked into ${changed} public HTML pages.`);
