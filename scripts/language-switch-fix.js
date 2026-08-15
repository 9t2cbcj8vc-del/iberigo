(function () {
  const STORAGE_KEY = "holaPapersLang";
  const supported = new Set(["en", "es"]);
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  const isHomepage = path === "/";
  const bootLang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";

  function persistLanguage(lang) {
    if (!supported.has(lang)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // Language switching should still work when storage is unavailable.
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest?.(".language-switcher [data-lang]");
      if (!button) return;

      const nextLang = button.dataset.lang;
      if (!supported.has(nextLang)) return;
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
