const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ROUTES = ["/guides/digital/", "/guides/es/digital/"];

function routeFile(route) {
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function escapeAttribute(value, quote) {
  let escaped = value.replaceAll("&", "&amp;");
  if (quote === '"') escaped = escaped.replaceAll('"', "&quot;");
  if (quote === "'") escaped = escaped.replaceAll("'", "&#39;");
  return escaped;
}

function replaceMetaContent(html, selectorPattern, description, label, required = true) {
  const tagPattern = new RegExp(`<meta\\b(?=[^>]*${selectorPattern})[^>]*>`, "i");
  const match = html.match(tagPattern);
  if (!match) {
    if (required) throw new Error(`${label}: meta tag not found`);
    return html;
  }
  const tag = match[0];
  const contentMatch = tag.match(/\bcontent=(['"])([\s\S]*?)\1/i);
  if (!contentMatch) throw new Error(`${label}: content attribute not found`);
  const quote = contentMatch[1];
  const replacement = `content=${quote}${escapeAttribute(description, quote)}${quote}`;
  return html.replace(tag, tag.replace(contentMatch[0], replacement));
}

for (const route of ROUTES) {
  const file = routeFile(route);
  let html = fs.readFileSync(file, "utf8");
  const intro = html.match(/<div\b[^>]*\bdata-crawler-guide-intro\b[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/div>/i);
  if (!intro) throw new Error(`${route}: crawler intro paragraph not found`);
  const description = intro[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  html = replaceMetaContent(html, `name=["']description["']`, description, `${route} description`);
  html = replaceMetaContent(html, `property=["']og:description["']`, description, `${route} og:description`, false);

  fs.writeFileSync(file, html, "utf8");
}

console.log("Digital crawler intro and meta descriptions aligned for EN/ES routes.");
