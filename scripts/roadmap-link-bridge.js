var linkLabels = window.linkLabels || (window.linkLabels = { en: {}, es: {} });
var urls = window.urls || (window.urls = {});
var govMeta = window.govMeta || (window.govMeta = {});

(() => {
  if (typeof renderRouteLinks !== "function" || renderRouteLinks.__iberigoRoadmapBridge) return;

  const baseRenderRouteLinks = renderRouteLinks;
  const sourceMeta = {
    government: {
      tag: { en: "Spanish Government", es: "Gobierno de España" },
      initials: "ES"
    },
    eu: {
      tag: { en: "European Union", es: "Unión Europea" },
      initials: "EU"
    },
    tax: {
      tag: { en: "Official fee", es: "Tasa oficial" },
      initials: "€"
    }
  };

  const categoryFor = (type, meta) => {
    if (meta?.variant === "eu" || type === "ees" || type === "etias-status") return "eu";
    if (meta?.variant === "tax" || /^790-/.test(type)) return "tax";
    return "government";
  };

  const renderExtensionLink = (type, excludedUrls) => {
    const url = urls[type];
    if (!url || excludedUrls.has(url)) return "";

    const lang = typeof currentLang === "string" && currentLang === "es" ? "es" : "en";
    const label = linkLabels[lang]?.[type] || linkLabels.en?.[type] || type;
    const meta = govMeta[type] || {};
    const category = categoryFor(type, meta);
    const source = sourceMeta[category];
    const subtitle = meta.subtitle || (lang === "es" ? "Fuente oficial" : "Official source");

    return `
      <a class="gov-link guide-source-card guide-source-card--${category}" href="${url}" target="_blank" rel="noreferrer">
        <span class="guide-source-head">
          <span class="guide-source-badge" aria-hidden="true">${source.initials}</span>
          <span class="guide-source-tag">${source.tag[lang]}</span>
        </span>
        <span class="guide-source-title">${label}</span>
        <span class="guide-source-description">${subtitle}</span>
      </a>
    `;
  };

  renderRouteLinks = function bridgedRenderRouteLinks(linkTypes, excludedUrls = new Set()) {
    const types = Array.from(linkTypes || []);
    const extensionTypes = types.filter((type) => Boolean(urls[type]));
    const baseTypes = types.filter((type) => !urls[type]);
    const baseMarkup = baseRenderRouteLinks(baseTypes, excludedUrls) || "";
    const extensionMarkup = extensionTypes
      .map((type) => renderExtensionLink(type, excludedUrls))
      .join("");
    return `${baseMarkup}${extensionMarkup}`;
  };

  renderRouteLinks.__iberigoRoadmapBridge = true;
})();
