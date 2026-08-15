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

  function bindLanguageButtons() {
    document.querySelectorAll(".language-switcher [data-lang]").forEach((button) => {
      if (button.dataset.iberigoLanguageSwitchBound === "1") return;
      button.dataset.iberigoLanguageSwitchBound = "1";

      button.addEventListener("click", () => {
        const nextLang = button.dataset.lang;
        if (!supported.has(nextLang)) return;

        persistLanguage(nextLang);

        // The homepage is translated in place by app.js, while the visual-overhaul
        // hero/navigation/cards are created once from the language present at boot.
        // A normal reload rebuilds both layers from the same stored language.
        if (isHomepage && !button.hasAttribute("data-lang-href") && nextLang !== bootLang) {
          window.setTimeout(() => window.location.reload(), 0);
        }
      });
    });
  }

  bindLanguageButtons();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLanguageButtons, { once: true });
  }
})();
