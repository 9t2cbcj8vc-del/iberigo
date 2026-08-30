const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ROUTES = ["/guides/digital/", "/guides/es/digital/"];

function routeFile(route) {
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

for (const route of ROUTES) {
  const file = routeFile(route);
  let html = fs.readFileSync(file, "utf8");
  const intro = html.match(/<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/div>/i);
  if (!intro) throw new Error(`${route}: crawler intro paragraph not found`);
  const description = intro[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const escaped = escapeAttribute(description);

  const meta = /(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'][^>]*>)/i;
  const og = /(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'][^>]*>)/i;
  if (!meta.test(html)) throw new Error(`${route}: meta description not found`);
  html = html.replace(meta, `$1${escaped}$2`);
  if (og.test(html)) html = html.replace(og, `$1${escaped}$2`);

  fs.writeFileSync(file, html, "utf8");
}

console.log("Digital crawler intro and meta descriptions aligned for EN/ES routes.");
