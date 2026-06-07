const supportTranslations = {
  en: {
    homeNav: "Home",
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
    footerSupportLink: "Support IberiGo"
  },
  es: {
    homeNav: "Inicio",
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
    footerSupportLink: "Apoyar IberiGo"
  },
  fi: {
    homeNav: "Etusivu",
    supportNav: "Tue IberiGoa",
    supportTitle: "Tue IberiGoa",
    supportLead: "Auta pitämään IberiGo ilmaisena, selkeänä ja hyödyllisenä.",
    bodyOne: "IberiGo on ilmainen ja riippumaton opas, joka auttaa ihmisiä ymmärtämään Espanjaan muuttamista, matkustamista ja asettumista.",
    bodyTwo: "Sivusto kokoaa selkokielistä tietoa, käytännön tarkistuslistoja ja linkkejä Espanjan virallisiin lähteisiin, jotta kävijät löytävät hyvän lähtökohdan ilman turhaa sekavuutta.",
    bodyThree: "Jos IberiGo on auttanut sinua, voit tukea sivuston ylläpitoa vapaaehtoisella maksulla.",
    supportButton: "Tue IberiGoa",
    helpsTitle: "Tukesi auttaa näissä",
    helpsHosting: "Verkkosivuston hosting- ja domain-kulut",
    helpsResearch: "Virallisten lähteiden tutkiminen ja tarkistaminen",
    helpsUpdates: "Oppaiden päivittäminen, kun linkit, menettelyt tai vaatimukset muuttuvat",
    helpsGuides: "Uusien Espanjaan muuttoa, asumista ja matkailua koskevien oppaiden luominen",
    helpsFree: "IberiGon pitäminen ilmaisena kaikille",
    disclaimerTitle: "Ennen kuin tuet",
    disclaimerOne: "Tuki on täysin vapaaehtoista.",
    disclaimerTwo: "Maksu ei osta oikeudellista, maahanmuuttoon liittyvää, vero-, talous- tai muuta ammatillista neuvontaa.",
    disclaimerThree: "IberiGo ei ole asianajotoimisto, gestoría, veroasiantuntija, maahanmuuttoneuvoja tai viranomainen.",
    disclaimerFour: "Tämän sivuston tiedot ovat vain yleistä ohjeistusta. Tarkista aina viralliset lähteet tai keskustele pätevän ammattilaisen kanssa ennen tärkeitä päätöksiä.",
    footerSupportText: "IberiGo on ilmainen käyttää. Jos sivusto auttaa sinua, voit tukea sen ylläpitoa vapaaehtoisella maksulla.",
    footerSupportLink: "Tue IberiGoa"
  }
};

const supportLanguageButtons = document.querySelectorAll("[data-lang]");
let supportLang = localStorage.getItem("holaPapersLang") || "en";

function supportText(key) {
  return supportTranslations[supportLang]?.[key] || supportTranslations.en[key] || "";
}

function applySupportTranslations() {
  document.documentElement.lang = supportLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = supportText(element.dataset.i18n);
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
