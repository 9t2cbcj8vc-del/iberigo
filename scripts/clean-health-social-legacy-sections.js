const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ROUTES = [
  "/guides/sip-card/",
  "/guides/es/sip-card/",
  "/guides/social-security/",
  "/guides/es/social-security/",
];
const HEADINGS = new Set([
  "Next 3 steps", "Forms and documents", "Official source links", "Official links",
  "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales",
]);

function routeFile(route) {
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function sectionStarts(html) {
  const re = /<div\b[^>]*class=["'][^"']*\bresult-section\b[^"']*["'][^>]*>/gi;
  const starts = [];
  let match;
  while ((match = re.exec(html))) starts.push(match.index);
  return starts;
}

function clean(html, route) {
  const starts = sectionStarts(html);
  if (!starts.length) return html;
  const articleEnd = html.indexOf("</article>", starts[starts.length - 1]);
  if (articleEnd < 0) throw new Error(`${route}: result article closing tag not found`);
  const disclaimer = html.indexOf('<p class="disclaimer"', starts[starts.length - 1]);
  const lastBoundary = disclaimer !== -1 && disclaimer < articleEnd ? disclaimer : articleEnd;
  const removals = [];

  for (let i = 0; i < starts.length; i += 1) {
    const start = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1] : lastBoundary;
    if (end <= start) continue;
    const chunk = html.slice(start, end);
    const heading = chunk.match(/<strong>([^<]+)<\/strong>/i)?.[1]?.trim();
    if (heading && HEADINGS.has(heading)) removals.push([start, end, heading]);
  }

  for (const [start, end] of removals.reverse()) {
    html = html.slice(0, start) + html.slice(end);
  }
  if (!removals.length) throw new Error(`${route}: no legacy practical sections matched for cleanup`);
  return html;
}

for (const route of ROUTES) {
  const file = routeFile(route);
  const html = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, clean(html, route), "utf8");
}

console.log("Health/Social legacy practical sections removed safely from four EN/ES routes.");
