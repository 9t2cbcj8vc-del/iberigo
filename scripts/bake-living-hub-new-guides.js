const fs = require("fs");

const targets = [
  "guides/living-in-spain/index.html",
  "guides/es/living-in-spain/index.html"
];

const tag = '<script src="/scripts/living-hub-new-guides.js?v=20260817-1" defer></script>';

let changed = 0;
for (const file of targets) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("/scripts/living-hub-new-guides.js")) {
    console.log(`Living hub runtime already present: ${file}`);
    continue;
  }
  if (!html.includes("</body>")) {
    throw new Error(`Missing </body> in ${file}`);
  }
  html = html.replace("</body>", `    ${tag}\n  </body>`);
  fs.writeFileSync(file, html);
  changed += 1;
  console.log(`Injected Living hub runtime: ${file}`);
}

console.log(`Living hub runtime injection complete: ${changed} file(s) changed.`);
