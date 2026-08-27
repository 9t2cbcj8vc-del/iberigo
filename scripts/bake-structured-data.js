const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://iberigo.eu";
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const MARKER = "data-iberigo-structured-data";

function decodeHtml(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function textContent(value = "") {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function routeFile(route) {
  if (route === "/") return path.join(ROOT, "index.html");
  if (route.endsWith(".html")) return path.join(ROOT, route.slice(1));
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

function attr(html, tagPattern, attrName) {
  const tag = html.match(tagPattern)?.[0];
  if (!tag) return "";
  const quoted = tag.match(new RegExp(`\\b${attrName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return quoted ? decodeHtml(quoted[2].trim()) : "";
}

function extractPage(html) {
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || "";
  const lang = attr(htmlTag, /<html\b[^>]*>/i, "lang") || "en";
  const canonicalTag = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0] || "";
  const canonical = attr(canonicalTag, /<link\b[^>]*>/i, "href");
  const title = textContent(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0] || "";
  const description = attr(descriptionTag, /<meta\b[^>]*>/i, "content");
  const robotsTag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] || "";
  const robots = attr(robotsTag, /<meta\b[^>]*>/i, "content").toLowerCase().replace(/\s+/g, "");
  const ogTypeTag = html.match(/<meta\b[^>]*property=["']og:type["'][^>]*>/i)?.[0] || "";
  const ogType = attr(ogTypeTag, /<meta\b[^>]*>/i, "content").toLowerCase();
  const h1 = textContent(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "") || title.replace(/\s+[—|-]\s+IberiGo\s*$/i, "");
  const publishedTag = html.match(/<meta\b[^>]*property=["']article:published_time["'][^>]*>/i)?.[0] || "";
  const modifiedTag = html.match(/<meta\b[^>]*property=["']article:modified_time["'][^>]*>/i)?.[0] || "";
  const datePublished = attr(publishedTag, /<meta\b[^>]*>/i, "content");
  const dateModified = attr(modifiedTag, /<meta\b[^>]*>/i, "content");
  return { lang, canonical, title, description, robots, ogType, h1, datePublished, dateModified };
}

function sitemapRoutes() {
  const sitemap = fs.readFileSync(path.join(ROOT, "sitemap-pages.xml"), "utf8");
  const routes = [];
  for (const match of sitemap.matchAll(/<loc>\s*(https:\/\/iberigo\.eu[^<]*)<\/loc>/gi)) {
    const url = new URL(decodeHtml(match[1].trim()));
    routes.push(url.pathname);
  }
  return [...new Set(routes)];
}

function listItem(position, name, item) {
  return { "@type": "ListItem", position, name, item };
}

function breadcrumbItems(route, page) {
  const es = page.lang.toLowerCase().startsWith("es");
  const items = [listItem(1, "IberiGo", `${SITE}/`)];
  let position = 2;

  if (page.ogType === "article" && route !== "/the-spain-files/" && route !== "/the-spain-files/es/") {
    items.push(listItem(position++, "The Spain Files", `${SITE}${es ? "/the-spain-files/es/" : "/the-spain-files/"}`));
  } else if (/^\/(?:es\/)?moving-to-spain\//.test(route)) {
    items.push(listItem(position++, es ? "Mudarse a España" : "Move to Spain", `${SITE}${es ? "/es/start-here/" : "/start-here/"}`));
  } else if (/^\/(?:es\/)?living-in-spain\//.test(route)) {
    items.push(listItem(position++, es ? "Vivir en España" : "Living in Spain", `${SITE}${es ? "/guides/es/living-in-spain/" : "/guides/living-in-spain/"}`));
  } else if (/^\/(?:es\/)?visit-spain\//.test(route)) {
    items.push(listItem(position++, es ? "Visitar España" : "Visit Spain", `${SITE}${es ? "/guides/es/visit-spain/" : "/guides/visit-spain/"}`));
  }

  const currentName = page.h1 || page.title.replace(/\s+[—|-]\s+IberiGo\s*$/i, "") || "IberiGo";
  const currentItem = page.canonical;
  if (!items.some((item) => item.item === currentItem)) {
    items.push(listItem(position, currentName, currentItem));
  }
  return items;
}

function baseWebPage(page, breadcrumbId = null) {
  const node = {
    "@type": "WebPage",
    "@id": `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    inLanguage: page.lang,
    isPartOf: { "@id": WEBSITE_ID },
  };
  if (breadcrumbId) node.breadcrumb = { "@id": breadcrumbId };
  return node;
}

function graphFor(route, page) {
  if (!page.canonical) throw new Error(`${route}: missing canonical`);
  if (!page.title) throw new Error(`${route}: missing title`);
  if (!page.description) throw new Error(`${route}: missing meta description`);
  if (page.robots.includes("noindex")) throw new Error(`${route}: sitemap page is noindex`);

  if (route === "/") {
    return [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "IberiGo",
        url: `${SITE}/`,
        description: page.description,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE}/`,
        name: "IberiGo",
        inLanguage: ["en", "es"],
        publisher: { "@id": ORG_ID },
      },
      baseWebPage(page),
    ];
  }

  const breadcrumbId = `${page.canonical}#breadcrumb`;
  const graph = [
    baseWebPage(page, breadcrumbId),
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbItems(route, page),
    },
  ];

  if (page.ogType === "article") {
    const article = {
      "@type": "Article",
      "@id": `${page.canonical}#article`,
      url: page.canonical,
      headline: page.h1,
      description: page.description,
      inLanguage: page.lang,
      mainEntityOfPage: { "@id": `${page.canonical}#webpage` },
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORG_ID },
    };
    if (page.datePublished) article.datePublished = page.datePublished;
    if (page.dateModified) article.dateModified = page.dateModified;
    graph.push(article);
    graph[0].mainEntity = { "@id": article["@id"] };
  } else if (/^\/the-spain-files\/(?:es\/)?$/.test(route)) {
    graph[0]["@type"] = "CollectionPage";
  }

  return graph;
}

function removeExisting(html) {
  const pattern = new RegExp(`\\s*<script\\b[^>]*${MARKER}[^>]*>[\\s\\S]*?<\\/script>`, "gi");
  return html.replace(pattern, "");
}

function bake(route) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) throw new Error(`${route}: sitemap target missing at ${path.relative(ROOT, file)}`);
  let html = fs.readFileSync(file, "utf8");
  html = removeExisting(html);
  const page = extractPage(html);
  const graph = graphFor(route, page);
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .replace(/</g, "\\u003c");
  const script = `\n    <script type="application/ld+json" ${MARKER}>\n${jsonLd.split("\n").map((line) => `    ${line}`).join("\n")}\n    </script>`;
  if (!/<\/head>/i.test(html)) throw new Error(`${route}: missing </head>`);
  html = html.replace(/\s*<\/head>/i, `${script}\n  </head>`);
  fs.writeFileSync(file, html, "utf8");
}

const routes = sitemapRoutes();
for (const route of routes) bake(route);
console.log(`Structured data baked into ${routes.length} indexable sitemap pages.`);
