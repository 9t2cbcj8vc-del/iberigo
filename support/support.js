const supportTranslations = {
  en: {
    homeNav: "Home",
    spainFilesNav: "The Spain Files",
    supportNav: "Support IberiGo",
    supportTitle: "Support IberiGo",
    supportLead: "Help keep IberiGo free, simple and useful.",
    bodyOne: "IberiGo is a free independent guide created to help people understand moving, travelling and settling in Spain.",
    bodyTwo: "The website collects plain-language information, practical checklists and links to official Spanish sources, so visitors can find the right starting point without unnecessary confusion.",
    bodyThree: "If IberiGo has helped you, you can make a voluntary contribution to support the maintenance of the website.",
    supportButton: "Support IberiGo",
    helpsTitle: "Your support helps with",
    helpsHosting: "Website hosting and domain costs",
    helpsResearch: "Researching and checking official sources",
    helpsUpdates: "Updating guides when links, procedures or requirements change",
    helpsGuides: "Creating new Spain relocation and travel guides",
    helpsFree: "Keeping IberiGo free for everyone",
    disclaimerTitle: "Before you contribute",
    disclaimerOne: "Contributions are completely optional.",
    disclaimerTwo: "A contribution does not buy legal, immigration, tax, financial or professional advice.",
    disclaimerThree: "IberiGo is not a law firm, gestoría, tax adviser, immigration adviser or public authority.",
    disclaimerFour: "Information on this website is general guidance only. Always check official sources or speak with a qualified professional before making important decisions.",
    footerSupportText: "IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.",
    footerSupportLink: "Support IberiGo",
    footerLegal: "© 2026 IberiGo. Free to use. Not legal advice.",
    footerReviewed: "Last reviewed: June 2026"
  },
  es: {
    homeNav: "Inicio",
    spainFilesNav: "The Spain Files",
    supportNav: "Apoyar IberiGo",
    supportTitle: "Apoyar IberiGo",
    supportLead: "Ayuda a mantener IberiGo gratuito, sencillo y útil.",
    bodyOne: "IberiGo es una guía independiente y gratuita creada para ayudar a las personas a entender cómo mudarse, viajar y establecerse en España.",
    bodyTwo: "El sitio reúne información en lenguaje claro, listas prácticas y enlaces a fuentes oficiales españolas para que los visitantes puedan encontrar un buen punto de partida sin confusión innecesaria.",
    bodyThree: "Si IberiGo te ha ayudado, puedes hacer una contribución voluntaria para apoyar el mantenimiento del sitio.",
    supportButton: "Apoyar IberiGo",
    helpsTitle: "Tu apoyo ayuda con",
    helpsHosting: "Costes de alojamiento web y dominio",
    helpsResearch: "Investigar y revisar fuentes oficiales",
    helpsUpdates: "Actualizar guías cuando cambian enlaces, procedimientos o requisitos",
    helpsGuides: "Crear nuevas guías sobre mudanza, vida y viajes en España",
    helpsFree: "Mantener IberiGo gratuito para todos",
    disclaimerTitle: "Antes de contribuir",
    disclaimerOne: "Las contribuciones son completamente voluntarias.",
    disclaimerTwo: "Una contribución no compra asesoramiento legal, migratorio, fiscal, financiero ni profesional.",
    disclaimerThree: "IberiGo no es un despacho de abogados, gestoría, asesor fiscal, asesor migratorio ni autoridad pública.",
    disclaimerFour: "La información de este sitio es solo orientación general. Comprueba siempre las fuentes oficiales o habla con un profesional cualificado antes de tomar decisiones importantes.",
    footerSupportText: "IberiGo es gratuito. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.",
    footerSupportLink: "Apoyar IberiGo",
    footerLegal: "© 2026 IberiGo. Gratuito. No es asesoramiento legal.",
    footerReviewed: "Última revisión: junio de 2026"
  }
};

const supportLanguageButtons = document.querySelectorAll("[data-lang]");
const supportedSupportLanguages = new Set(["en", "es"]);
let supportLang = supportedSupportLanguages.has(localStorage.getItem("holaPapersLang")) ? localStorage.getItem("holaPapersLang") : "en";

function supportText(key) {
  return supportTranslations[supportLang]?.[key] || supportTranslations.en[key] || "";
}

function applySupportTranslations() {
  document.documentElement.lang = supportLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = supportText(element.dataset.i18n);
  });
  document.querySelectorAll("[data-language-url]").forEach((element) => {
    const urls = JSON.parse(element.dataset.languageUrl);
    if (urls[supportLang]) element.setAttribute("href", urls[supportLang]);
  });
  supportLanguageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === supportLang));
  });
}

supportLanguageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    supportLang = button.dataset.lang;
    localStorage.setItem("holaPapersLang", supportLang);
    applySupportTranslations();
  });
});

applySupportTranslations();

const supportTopbar = document.querySelector(".topbar");
if (supportTopbar) {
  const updateSupportTopbarScrollState = () => {
    supportTopbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateSupportTopbarScrollState();
  window.addEventListener("scroll", updateSupportTopbarScrollState, { passive: true });
}
