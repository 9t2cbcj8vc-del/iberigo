const STYLESHEET_VERSION = "20260712-search-icon";
const SITE_SEARCH_VERSION = "20260712-sitewide-4";

const stylesheetHref = `/styles.css?v=${STYLESHEET_VERSION}`;
const siteSearchScriptSrc = `/scripts/site-search.js?v=${SITE_SEARCH_VERSION}`;

function searchLabel(lang = "en") {
  return lang === "es" ? "Buscar en IberiGo" : "Search IberiGo";
}

function searchIconMarkup() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false"><circle cx="11" cy="11" r="7"></circle><line x1="16.65" y1="16.65" x2="21" y2="21"></line></svg>`;
}

function searchControlMarkup(lang = "en") {
  const label = searchLabel(lang);
  return `<a class="search-nav-link" href="/search/" aria-label="${label}" title="${label}" data-site-search-open>${searchIconMarkup()}</a>`;
}

function siteSearchScriptTag() {
  return `<script src="${siteSearchScriptSrc}" defer></script>`;
}

module.exports = {
  STYLESHEET_VERSION,
  SITE_SEARCH_VERSION,
  stylesheetHref,
  siteSearchScriptSrc,
  searchLabel,
  searchIconMarkup,
  searchControlMarkup,
  siteSearchScriptTag
};
