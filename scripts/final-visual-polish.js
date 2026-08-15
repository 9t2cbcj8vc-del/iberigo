(function () {
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const visuals = window.IberiGoVisualLibrary || {
    housing: "/assets/visual-library/housing-home.webp",
    banking: "/assets/visual-library/banking-money.webp",
    work: "/assets/visual-library/work-employment.webp",
    healthcare: "/assets/visual-library/healthcare.webp",
    digital: "/assets/visual-library/digital-connectivity.webp",
    files: "/assets/visual-library/spain-files-editorial.webp"
  };
  const transport = "/assets/topic-scenes/vacation-ground-transport-20260606.webp";

  const livingGroups = lang === "es" ? [
    ["Hogar", visuals.housing, [["Alquilar vivienda", "/guides/es/renting-home/"], ["Padrón", "/guides/es/padron/"]]],
    ["Dinero y banca", visuals.banking, [["Banca", "/guides/es/banking/"], ["Impuestos", "/guides/es/taxes/"]]],
    ["Trabajo y carrera", visuals.work, [["Buscar trabajo", "/guides/es/job-search/"], ["Seguridad Social", "/guides/es/social-security/"], ["Vida laboral", "/guides/es/vida-laboral/"]]],
    ["Sanidad", visuals.healthcare, [["Sanidad pública", "/guides/es/sip-card/"], ["Seguro privado", "/guides/es/private-health/"], ["TSE / EHIC", "/guides/es/ehic-card/"]]],
    ["España digital", visuals.digital, [["Certificado digital / Cl@ve", "/guides/es/digital/"]]],
    ["Transporte y conducción", transport, [["Canje de permiso", "/guides/es/driving-licence-exchange/"]]],
    ["Teléfono e internet", visuals.digital, [["Teléfono", "/guides/es/phone/"], ["SIM, eSIM y VPN", "/guides/es/sim-esim-vpn/"]]]
  ] : [
    ["Home", visuals.housing, [["Renting a home", "/guides/renting-home/"], ["Padrón", "/guides/padron/"]]],
    ["Money & banking", visuals.banking, [["Banking", "/guides/banking/"], ["Taxes", "/guides/taxes/"]]],
    ["Work & career", visuals.work, [["Job search", "/guides/job-search/"], ["Social Security", "/guides/social-security/"], ["Vida laboral", "/guides/vida-laboral/"]]],
    ["Healthcare", visuals.healthcare, [["Public healthcare / health card", "/guides/sip-card/"], ["Private health insurance", "/guides/private-health/"], ["EHIC", "/guides/ehic-card/"]]],
    ["Digital Spain", visuals.digital, [["Digital certificate / Cl@ve", "/guides/digital/"]]],
    ["Transport & driving", transport, [["Driving licence exchange", "/guides/driving-licence-exchange/"]]],
    ["Phone & internet", visuals.digital, [["Phone", "/guides/phone/"], ["SIM, eSIM & VPN", "/guides/sim-esim-vpn/"]]]
  ];

  function renderLivingGroups() {
    if (!["/guides/living-in-spain/", "/guides/es/living-in-spain/"].includes(path)) return false;
    const wrapper = document.querySelector(".overhaul-directory-groups");
    if (!wrapper) return false;
    const heading = wrapper.querySelector(".overhaul-directory-heading")?.outerHTML || "";
    wrapper.classList.add("overhaul-directory-groups--living-refined");
    wrapper.innerHTML = heading + livingGroups.map(([title, image, links]) => `
      <section class="overhaul-directory-group overhaul-directory-group--refined">
        <div class="overhaul-directory-group-heading">
          <span class="overhaul-directory-group-visual"><img src="${image}" alt="" loading="lazy" decoding="async" /></span>
          <h3>${title}</h3>
        </div>
        <div class="overhaul-link-grid">${links.map(([label, href]) => `<a class="overhaul-link-card" href="${href}"><strong>${label}</strong><span aria-hidden="true">→</span></a>`).join("")}</div>
      </section>`).join("");
    return true;
  }

  function polishSupport() {
    if (path !== "/support/") return;
    document.body.classList.add("iberigo-support-polished");
    const hero = document.querySelector(".support-hero");
    if (!hero || hero.querySelector(".support-polish-visual")) return;
    const figure = document.createElement("figure");
    figure.className = "support-polish-visual";
    figure.innerHTML = `<img src="${visuals.files}" alt="" loading="eager" decoding="async" />`;
    const copy = hero.querySelector(".support-hero-copy");
    copy ? copy.insertAdjacentElement("afterend", figure) : hero.prepend(figure);
  }

  function polishSearch() {
    if (path !== "/search/") return;
    document.body.classList.add("iberigo-search-polished");
  }

  function apply() {
    renderLivingGroups();
    polishSupport();
    polishSearch();
  }

  apply();
  document.addEventListener("DOMContentLoaded", apply, { once: true });

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const done = renderLivingGroups();
    polishSupport();
    polishSearch();
    if (done || attempts > 20) window.clearInterval(timer);
  }, 100);
})();
