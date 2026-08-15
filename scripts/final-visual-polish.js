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
  const transport = "/assets/visual-library/transport-spain.webp";
  const livingHubPaths = new Set(["/guides/living-in-spain/", "/guides/es/living-in-spain/"]);
  const visitHubPaths = new Set(["/guides/vacation-in-spain/", "/guides/es/vacation-in-spain/"]);
  const transportGuide = /\/(driving-licence-exchange|driving-spain-visitors|vacation-ground|vacation-flights)\//.test(path);

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
    if (!livingHubPaths.has(path)) return false;
    const wrapper = document.querySelector(".overhaul-directory-groups");
    if (!wrapper) return false;
    if (wrapper.dataset.livingRefined === "true") return true;
    const heading = wrapper.querySelector(".overhaul-directory-heading")?.outerHTML || "";
    wrapper.classList.add("overhaul-directory-groups--living-refined");
    wrapper.dataset.livingRefined = "true";
    wrapper.innerHTML = heading + livingGroups.map(([title, image, links]) => `
      <section class="overhaul-directory-group overhaul-directory-group--refined${image === transport ? " overhaul-directory-group--transport" : ""}">
        <div class="overhaul-directory-group-heading">
          <span class="overhaul-directory-group-visual"><img src="${image}" alt="" loading="lazy" decoding="async" /></span>
          <h3>${title}</h3>
        </div>
        <div class="overhaul-link-grid">${links.map(([label, href]) => `<a class="overhaul-link-card" href="${href}"><strong>${label}</strong><span aria-hidden="true">→</span></a>`).join("")}</div>
      </section>`).join("");
    return true;
  }

  function polishVisitTransportGroup() {
    if (!visitHubPaths.has(path)) return false;
    const wanted = lang === "es" ? "llegar y moverse" : "getting there & around";
    const group = Array.from(document.querySelectorAll(".overhaul-directory-group")).find((item) => item.querySelector("h3")?.textContent?.trim().toLowerCase() === wanted);
    if (!group) return false;
    group.classList.add("overhaul-directory-group--transport");
    const heading = group.querySelector(".overhaul-directory-group-heading");
    const img = heading?.querySelector("img");
    if (!img) return false;
    if (img.getAttribute("src") !== transport) img.src = transport;
    img.alt = "";
    img.classList.add("overhaul-transport-image");
    if (!img.parentElement?.classList.contains("overhaul-directory-group-visual")) {
      const frame = document.createElement("span");
      frame.className = "overhaul-directory-group-visual";
      img.before(frame);
      frame.appendChild(img);
    }
    return true;
  }

  function polishTransportGuide() {
    if (!transportGuide) return false;
    const img = document.querySelector(".overhaul-guide-image, .guide-hero-card img, .result-hero-media img");
    if (!img) return false;
    if (img.getAttribute("src") !== transport) img.src = transport;
    img.alt = "";
    img.classList.add("overhaul-transport-image");
    return true;
  }

  function polishSupport() {
    if (path !== "/support/") return true;
    document.body.classList.add("iberigo-support-polished");
    const hero = document.querySelector(".support-hero");
    if (!hero) return false;
    if (hero.querySelector(".support-polish-visual")) return true;
    const figure = document.createElement("figure");
    figure.className = "support-polish-visual";
    figure.innerHTML = `<img src="${visuals.files}" alt="" loading="eager" decoding="async" />`;
    const copy = hero.querySelector(".support-hero-copy");
    copy ? copy.insertAdjacentElement("afterend", figure) : hero.prepend(figure);
    return true;
  }

  function polishSearch() {
    if (path !== "/search/") return true;
    document.body.classList.add("iberigo-search-polished");
    return true;
  }

  function apply() {
    return [
      renderLivingGroups(),
      polishVisitTransportGroup(),
      polishTransportGuide(),
      polishSupport(),
      polishSearch()
    ];
  }

  apply();
  document.addEventListener("DOMContentLoaded", apply, { once: true });

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const states = apply();
    if (states.every((state) => state !== false) || attempts > 30) window.clearInterval(timer);
  }, 100);
})();
