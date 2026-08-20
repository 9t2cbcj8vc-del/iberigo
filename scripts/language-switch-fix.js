(function () {
  const STORAGE_KEY = "holaPapersLang";
  const supported = new Set(["en", "es"]);
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  const isHomepage = path === "/";
  const bootLang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";

  function currentLanguage() {
    return document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  }

  function inferButtonLanguage(button) {
    const explicit = (button.dataset.lang || "").toLowerCase();
    if (supported.has(explicit)) return explicit;

    const label = (button.textContent || "").trim().toLowerCase();
    if (supported.has(label)) return label;

    const href = button.getAttribute("data-lang-href") || "";
    if (/^\/es(?:\/|$)/.test(href) || /\/guides\/es\//.test(href) || /\/the-spain-files\/es\//.test(href)) return "es";
    if (href && !/\/es(?:\/|$)/.test(href) && !/\/guides\/es\//.test(href) && !/\/the-spain-files\/es\//.test(href)) return "en";

    return null;
  }

  function syncLanguageSwitchers(root) {
    const lang = currentLanguage();
    const scope = root && root.querySelectorAll ? root : document;

    scope.querySelectorAll(".language-switcher").forEach((switcher) => {
      switcher.dataset.activeLanguage = lang;

      switcher.querySelectorAll("button").forEach((button) => {
        const buttonLang = inferButtonLanguage(button);
        if (!buttonLang) return;

        if (!button.dataset.lang) button.dataset.lang = buttonLang;
        const active = buttonLang === lang;
        button.setAttribute("aria-pressed", active ? "true" : "false");
        button.classList.toggle("is-active-language", active);
      });
    });
  }

  function persistLanguage(lang) {
    if (!supported.has(lang)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // Language switching should still work when storage is unavailable.
    }
  }

  function syncSoon() {
    window.requestAnimationFrame(() => syncLanguageSwitchers(document));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncSoon, { once: true });
  } else {
    syncSoon();
  }

  const languageObserver = new MutationObserver(syncSoon);
  languageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  const bodyObserver = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) syncSoon();
  });
  if (document.body) bodyObserver.observe(document.body, { childList: true, subtree: true });

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest?.(".language-switcher button");
      if (!button) return;

      const nextLang = inferButtonLanguage(button);
      if (!supported.has(nextLang)) return;
      if (!button.dataset.lang) button.dataset.lang = nextLang;
      persistLanguage(nextLang);

      // app.js translates the legacy homepage in place, but the visual-overhaul
      // hero/navigation/cards are created once from the language present at boot.
      // A normal automatic reload rebuilds both layers from the same stored language.
      if (isHomepage && !button.hasAttribute("data-lang-href") && nextLang !== bootLang) {
        window.setTimeout(() => window.location.reload(), 0);
      }
    },
    true
  );
})();
