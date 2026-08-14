(function () {
  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const path = window.location.pathname.replace(/\/index\.html$/, "/");

  const COPY = {
    en: {
      move: "Move to Spain",
      live: "Living in Spain",
      visit: "Visit Spain",
      files: "The Spain Files",
      heroTitle: "Move to Spain with confidence.",
      heroText: "Step-by-step roadmaps, official links and real experience to help you move, settle in and build your life in Spain.",
      heroPrimary: "Start your roadmap",
      heroSecondary: "Explore living in Spain",
      heroTrust: "Practical information · Official sources · Real experience",
      directoriesTitle: "What are you trying to do in Spain?",
      directoriesText: "Choose the part of your Spain journey that matches where you are now.",
      moveDesc: "Residency routes, NIE, TIE, EU registration, visas, family and your first arrival steps.",
      liveDesc: "Healthcare, banking, work, taxes, housing, digital services and everyday administration.",
      visitDesc: "Entry rules, short stays, transport, accommodation, insurance and practical trip planning.",
      explore: "Explore",
      routeTitle: "Find your legal route",
      routeText: "Moving permanently? Use the route finder to narrow down the residence or registration path that applies to you.",
      routeButton: "Find my route",
      experienceTitle: "Real Spain, not just the rulebook.",
      experienceText: "IberiGo combines official requirements with practical experience, so you can see both what the rules say and what the process can feel like in real life.",
      planTitle: "My Spain plan",
      planItems: ["Documents", "Residence route", "Padrón", "Bank & healthcare"],
      moveHubTitle: "Moving to Spain",
      moveHubText: "Choose your legal route first, then work through documents, appointments and the practical first weeks in Spain.",
      liveHubTitle: "Living in Spain",
      liveHubText: "A resident handbook for the practical systems you use after the move: home, money, work, healthcare, digital admin and transport.",
      visitHubTitle: "Visit Spain",
      visitHubText: "Short-stay rules and practical travel planning for visitors to Spain.",
      browseTitle: "Browse by topic"
    },
    es: {
      move: "Mudarse a España",
      live: "Vivir en España",
      visit: "Visitar España",
      files: "The Spain Files",
      heroTitle: "Múdate a España con confianza.",
      heroText: "Rutas paso a paso, enlaces oficiales y experiencia real para ayudarte a mudarte, instalarte y construir tu vida en España.",
      heroPrimary: "Empieza tu ruta",
      heroSecondary: "Explora vivir en España",
      heroTrust: "Información práctica · Fuentes oficiales · Experiencia real",
      directoriesTitle: "¿Qué quieres hacer en España?",
      directoriesText: "Elige la parte de tu viaje a España que corresponde a tu situación actual.",
      moveDesc: "Residencia, NIE, TIE, registro UE, visados, familia y primeros trámites al llegar.",
      liveDesc: "Sanidad, banca, trabajo, impuestos, vivienda, servicios digitales y administración diaria.",
      visitDesc: "Entrada, estancias cortas, transporte, alojamiento, seguro y planificación práctica del viaje.",
      explore: "Explorar",
      routeTitle: "Encuentra tu ruta legal",
      routeText: "¿Te mudas de forma permanente? Usa el buscador de rutas para acotar la residencia o registro que corresponde a tu situación.",
      routeButton: "Encontrar mi ruta",
      experienceTitle: "La España real, no solo la normativa.",
      experienceText: "IberiGo combina requisitos oficiales con experiencia práctica para mostrar tanto lo que dicen las normas como lo que puede ocurrir en la vida real.",
      planTitle: "Mi plan para España",
      planItems: ["Documentos", "Ruta de residencia", "Padrón", "Banco y sanidad"],
      moveHubTitle: "Mudarse a España",
      moveHubText: "Elige primero tu ruta legal y después organiza documentos, citas y las primeras semanas prácticas en España.",
      liveHubTitle: "Vivir en España",
      liveHubText: "Un manual para residentes sobre vivienda, dinero, trabajo, sanidad, administración digital y transporte.",
      visitHubTitle: "Visitar España",
      visitHubText: "Reglas de estancia corta y planificación práctica para visitantes a España.",
      browseTitle: "Explorar por tema"
    }
  }[lang];

  const nav = {
    en: [
      ["Move to Spain", "/start-here/", "move"],
      ["Living in Spain", "/guides/living-in-spain/", "live"],
      ["Visit Spain", "/guides/vacation-in-spain/", "visit"],
      ["The Spain Files", "/the-spain-files/", "files"]
    ],
    es: [
      ["Mudarse a España", "/es/start-here/", "move"],
      ["Vivir en España", "/guides/es/living-in-spain/", "live"],
      ["Visitar España", "/guides/es/vacation-in-spain/", "visit"],
      ["The Spain Files", "/the-spain-files/es/", "files"]
    ]
  }[lang];

  const sectionForPath = () => {
    if (path.includes("the-spain-files")) return "files";
    if (path.includes("vacation") || path.includes("travel-insurance") || path.includes("driving-spain-visitors")) return "visit";
    if (path.includes("living-in-spain") || /\/(banking|job-search|taxes|social-security|vida-laboral|private-health|sip-card|phone|sim-esim-vpn|renting-home|driving-licence-exchange)\//.test(path)) return "live";
    if (path === "/" || path === "/index.html") return "home";
    return "move";
  };

  function addBodyClasses() {
    document.body.classList.add("iberigo-overhaul", `iberigo-section-${sectionForPath()}`);
    if (path === "/" || path === "/index.html") document.body.classList.add("iberigo-home");
    if (["/start-here/", "/es/start-here/"].includes(path)) document.body.classList.add("iberigo-directory", "iberigo-directory-move");
    if (["/guides/living-in-spain/", "/guides/es/living-in-spain/"].includes(path)) document.body.classList.add("iberigo-directory", "iberigo-directory-live");
    if (["/guides/vacation-in-spain/", "/guides/es/vacation-in-spain/"].includes(path)) document.body.classList.add("iberigo-directory", "iberigo-directory-visit");
  }

  function upgradeNavigation() {
    const topbar = document.querySelector(".topbar");
    const menu = topbar?.querySelector("nav");
    if (!topbar || !menu) return;

    const search = menu.querySelector(".search-nav-link");
    const language = menu.querySelector(".language-switcher");
    Array.from(menu.children).forEach((node) => {
      if (node !== search && node !== language) node.remove();
    });

    nav.forEach(([label, href, section]) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      a.dataset.iberigoSection = section;
      if (section === sectionForPath()) a.setAttribute("aria-current", "page");
      menu.insertBefore(a, search || language || null);
    });

    const brand = topbar.querySelector(".brand-lockup");
    if (brand && !brand.querySelector("a")) {
      const home = document.createElement("a");
      home.href = "/";
      home.className = "brand-home-link";
      home.setAttribute("aria-label", "IberiGo home");
      while (brand.firstChild) home.appendChild(brand.firstChild);
      brand.appendChild(home);
    }
  }

  function homepage() {
    if (!document.body.classList.contains("iberigo-home")) return;
    const main = document.querySelector("main");
    const guide = document.querySelector("#guide-cards");
    const wizard = document.querySelector("#wizard");
    if (!main || !guide) return;

    if (!document.querySelector(".overhaul-hero")) {
      const hero = document.createElement("section");
      hero.className = "overhaul-hero";
      hero.innerHTML = `
        <div class="overhaul-hero-copy">
          <span class="overhaul-kicker">IberiGo · Spain made clearer</span>
          <h1>${COPY.heroTitle}</h1>
          <p>${COPY.heroText}</p>
          <div class="overhaul-actions">
            <a class="overhaul-button overhaul-button-primary" href="${lang === "es" ? "/es/start-here/" : "/start-here/"}">${COPY.heroPrimary} <span aria-hidden="true">→</span></a>
            <a class="overhaul-button overhaul-button-secondary" href="${lang === "es" ? "/guides/es/living-in-spain/" : "/guides/living-in-spain/"}">${COPY.heroSecondary}</a>
          </div>
          <small>${COPY.heroTrust}</small>
        </div>
        <div class="overhaul-hero-visual" aria-label="Spain planning illustration">
          <img src="/assets/home-cards/move-to-spain-matched-20260606.webp" alt="Spanish Mediterranean street and relocation planning" />
          <div class="overhaul-passport" aria-hidden="true"><span>UNIÓN EUROPEA</span><strong>ESPAÑA</strong><small>PASAPORTE</small></div>
          <div class="overhaul-plan-card"><strong>${COPY.planTitle}</strong>${COPY.planItems.map((item) => `<span>✓ ${item}</span>`).join("")}</div>
        </div>`;
      main.insertBefore(hero, guide);
    }

    const heading = guide.querySelector(".section-heading");
    if (heading) {
      const oldH1 = heading.querySelector("h1");
      if (oldH1) {
        const h2 = document.createElement("h2");
        h2.id = oldH1.id;
        h2.textContent = COPY.directoriesTitle;
        oldH1.replaceWith(h2);
      } else {
        const h2 = heading.querySelector("h2");
        if (h2) h2.textContent = COPY.directoriesTitle;
      }
      const sub = heading.querySelector(".hero-subheading, p");
      if (sub) sub.textContent = COPY.directoriesText;
      heading.querySelector(".hero-stats")?.remove();
    }

    const grid = guide.querySelector(".situation-grid");
    if (grid) {
      const move = grid.querySelector('[data-home-card="move"]');
      const live = grid.querySelector('[data-home-card="living"]');
      const visit = grid.querySelector('[data-home-card="vacation"]');
      if (move) setDirectoryCard(move, COPY.move, COPY.moveDesc, lang === "es" ? "/es/start-here/" : "/start-here/");
      if (live) setDirectoryCard(live, COPY.live, COPY.liveDesc, lang === "es" ? "/guides/es/living-in-spain/" : "/guides/living-in-spain/");
      if (visit) setDirectoryCard(visit, COPY.visit, COPY.visitDesc, lang === "es" ? "/guides/es/vacation-in-spain/" : "/guides/vacation-in-spain/");
      if (move) grid.appendChild(move);
      if (live) grid.appendChild(live);
      if (visit) grid.appendChild(visit);
    }

    const featured = guide.querySelector(".featured-guide");
    const callout = guide.querySelector(".homepage-callout");
    const disclaimer = guide.querySelector(".hero-disclaimer");
    if (grid && featured) grid.insertAdjacentElement("afterend", featured);
    if (featured && callout) featured.insertAdjacentElement("afterend", callout);
    if (callout && disclaimer) callout.insertAdjacentElement("afterend", disclaimer);
    guide.querySelector(".browse-label")?.remove();

    if (wizard && !document.querySelector(".overhaul-route-intro")) {
      const block = document.createElement("section");
      block.className = "overhaul-route-intro";
      block.innerHTML = `<div><span class="overhaul-kicker">Residence & registration</span><h2>${COPY.routeTitle}</h2><p>${COPY.routeText}</p></div><a class="overhaul-button overhaul-button-primary" href="#wizard">${COPY.routeButton} <span aria-hidden="true">↓</span></a>`;
      main.insertBefore(block, wizard);
    }

    const docs = document.querySelector("#documents");
    if (docs && !document.querySelector(".overhaul-experience")) {
      const block = document.createElement("section");
      block.className = "overhaul-experience";
      block.innerHTML = `<div><span class="overhaul-kicker">Why IberiGo</span><h2>${COPY.experienceTitle}</h2><p>${COPY.experienceText}</p></div><img src="/assets/topic-scenes/live-padron-20260606.webp" alt="Spanish local administration and everyday life" />`;
      docs.insertAdjacentElement("beforebegin", block);
    }
  }

  function setDirectoryCard(card, title, description, href) {
    card.classList.add("overhaul-directory-card");
    const video = card.querySelector("video");
    if (video) {
      video.pause?.();
      video.removeAttribute("autoplay");
      video.removeAttribute("loop");
    }
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");
    if (h3) h3.textContent = title;
    if (p) p.textContent = description;
    const action = card.querySelector("button, a.primary-action");
    if (action) {
      const link = document.createElement("a");
      link.className = "primary-action overhaul-card-action";
      link.href = href;
      link.innerHTML = `${COPY.explore} <span aria-hidden="true">→</span>`;
      action.replaceWith(link);
    }
  }

  const directories = {
    move: {
      title: COPY.moveHubTitle,
      text: COPY.moveHubText,
      image: "/assets/home-cards/move-to-spain-matched-20260606.webp",
      groups: lang === "es" ? [
        ["Encuentra tu ruta", [
          ["Ciudadanos UE/EEE/Suiza", "/es/moving-to-spain/eu-citizens/"], ["Ciudadanos no UE", "/es/moving-to-spain/non-eu-citizens/"], ["Trabajar en España", "/es/moving-to-spain/work-in-spain/"], ["Autónomo", "/es/moving-to-spain/self-employed-spain/"], ["Nómada digital", "/es/moving-to-spain/digital-nomad-spain/"], ["Estudiar", "/es/moving-to-spain/students/"], ["Jubilarse / vivir sin trabajar", "/es/moving-to-spain/retire-in-spain/"], ["Familia de ciudadano UE", "/es/moving-to-spain/family-member-eu-citizen/"], ["Reagrupación familiar", "/es/moving-to-spain/family-reunification/"]
        ]],
        ["Documentos y citas", [["NIE", "/guides/es/nie/"], ["TIE", "/guides/es/tie/"], ["Registro UE", "/es/moving-to-spain/eu-registration/"], ["Lista de documentos", "/es/moving-to-spain/documents-checklist/"]]],
        ["Primeras semanas", [["Padrón", "/es/moving-to-spain/registering-on-the-padron/"], ["Alojamiento", "/es/moving-to-spain/finding-accommodation/"], ["Cuenta bancaria", "/guides/es/banking/"], ["Seguridad Social", "/guides/es/social-security/"], ["Sanidad", "/es/moving-to-spain/healthcare/"], ["Acceso digital", "/guides/es/digital/"]]]
      ] : [
        ["Find your route", [["EU / EEA / Swiss citizens", "/moving-to-spain/eu-citizens/"], ["Non-EU citizens", "/moving-to-spain/non-eu-citizens/"], ["Work in Spain", "/moving-to-spain/work-in-spain/"], ["Self-employed", "/moving-to-spain/self-employed-spain/"], ["Digital nomad", "/moving-to-spain/digital-nomad-spain/"], ["Study", "/moving-to-spain/students/"], ["Retire / live without working", "/moving-to-spain/retire-in-spain/"], ["Family of an EU citizen", "/moving-to-spain/family-member-eu-citizen/"], ["Family reunification", "/moving-to-spain/family-reunification/"]]],
        ["Documents & appointments", [["NIE", "/guides/nie/"], ["TIE", "/guides/tie/"], ["EU Registration", "/moving-to-spain/eu-registration/"], ["Documents checklist", "/moving-to-spain/documents-checklist/"]]],
        ["Your first weeks", [["Padrón", "/moving-to-spain/registering-on-the-padron/"], ["Accommodation", "/moving-to-spain/finding-accommodation/"], ["Bank account", "/guides/banking/"], ["Social Security", "/guides/social-security/"], ["Healthcare", "/moving-to-spain/healthcare/"], ["Digital access", "/guides/digital/"]]]
      ]
    },
    live: {
      title: COPY.liveHubTitle,
      text: COPY.liveHubText,
      image: "/assets/home-cards/live-in-spain-matched-20260606.webp",
      groups: lang === "es" ? [
        ["Hogar", [["Alquilar vivienda", "/guides/es/renting-home/"], ["Padrón", "/guides/es/padron/"]]],
        ["Dinero y trabajo", [["Banca", "/guides/es/banking/"], ["Buscar trabajo", "/guides/es/job-search/"], ["Seguridad Social", "/guides/es/social-security/"], ["Vida laboral", "/guides/es/vida-laboral/"], ["Impuestos", "/guides/es/taxes/"]]],
        ["Sanidad", [["Sanidad pública", "/guides/es/sip-card/"], ["Seguro privado", "/guides/es/private-health/"], ["TSE / EHIC", "/guides/es/ehic-card/"]]],
        ["Digital y administración", [["Certificado digital / Cl@ve", "/guides/es/digital/"], ["NIE", "/guides/es/nie/"], ["TIE", "/guides/es/tie/"]]],
        ["Transporte y conexión", [["Canje de permiso", "/guides/es/driving-licence-exchange/"], ["Teléfono", "/guides/es/phone/"], ["SIM, eSIM y VPN", "/guides/es/sim-esim-vpn/"]]]
      ] : [
        ["Home", [["Renting a home", "/guides/renting-home/"], ["Padrón", "/guides/padron/"]]],
        ["Money & work", [["Banking", "/guides/banking/"], ["Job search", "/guides/job-search/"], ["Social Security", "/guides/social-security/"], ["Vida laboral", "/guides/vida-laboral/"], ["Taxes", "/guides/taxes/"]]],
        ["Healthcare", [["Public healthcare / health card", "/guides/sip-card/"], ["Private health insurance", "/guides/private-health/"], ["EHIC", "/guides/ehic-card/"]]],
        ["Digital & administration", [["Digital certificate / Cl@ve", "/guides/digital/"], ["NIE", "/guides/nie/"], ["TIE", "/guides/tie/"]]],
        ["Transport & connection", [["Driving licence exchange", "/guides/driving-licence-exchange/"], ["Phone", "/guides/phone/"], ["SIM, eSIM & VPN", "/guides/sim-esim-vpn/"]]]
      ]
    },
    visit: {
      title: COPY.visitHubTitle,
      text: COPY.visitHubText,
      image: "/assets/home-cards/vacation-in-spain-coast-20260606.webp",
      groups: lang === "es" ? [
        ["Antes de viajar", [["Entrada y estancias cortas", "/guides/es/vacation-entry/"], ["Ciudadanía y reglas de entrada", "/guides/es/vacation-citizenship/"], ["Seguro de viaje", "/guides/es/travel-insurance/"]]],
        ["Llegar y moverse", [["Vuelos y aeropuertos", "/guides/es/vacation-flights/"], ["Transporte terrestre", "/guides/es/vacation-ground/"], ["Conducir como visitante", "/guides/es/driving-spain-visitors/"]]],
        ["Dónde alojarse", [["Hoteles", "/guides/es/vacation-hotels/"], ["Plataformas de reserva", "/guides/es/vacation-booking/"]]],
        ["Planificar", [["Turismo e ideas", "/guides/es/vacation-tourism/"], ["Reseñas y comparaciones", "/guides/es/vacation-reviews/"], ["SIM, eSIM y VPN", "/guides/es/sim-esim-vpn/"]]]
      ] : [
        ["Before you travel", [["Entry rules & short stays", "/guides/vacation-entry/"], ["Citizenship & entry rules", "/guides/vacation-citizenship/"], ["Travel insurance", "/guides/travel-insurance/"]]],
        ["Getting there & around", [["Flights & airports", "/guides/vacation-flights/"], ["Ground transport", "/guides/vacation-ground/"], ["Driving as a visitor", "/guides/driving-spain-visitors/"]]],
        ["Where to stay", [["Hotels", "/guides/vacation-hotels/"], ["Booking platforms", "/guides/vacation-booking/"]]],
        ["Plan your trip", [["Tourism & ideas", "/guides/vacation-tourism/"], ["Reviews & comparisons", "/guides/vacation-reviews/"], ["SIM, eSIM & VPN", "/guides/sim-esim-vpn/"]]]
      ]
    }
  };

  function directoryPage() {
    if (!document.body.classList.contains("iberigo-directory")) return;
    const key = document.body.classList.contains("iberigo-directory-move") ? "move" : document.body.classList.contains("iberigo-directory-live") ? "live" : "visit";
    const data = directories[key];
    const content = document.querySelector(".guide-content") || document.querySelector("main");
    const hero = document.querySelector(".guide-hero");
    if (!content || !data) return;

    if (hero) {
      const kicker = hero.querySelector(".guide-kicker");
      const h1 = hero.querySelector("h1");
      const intro = hero.querySelector("p:not(.guide-reading-time)");
      if (kicker) kicker.textContent = lang === "es" ? "Directorio IberiGo" : "IberiGo directory";
      if (h1) h1.textContent = data.title;
      if (intro) intro.textContent = data.text;
      const aside = hero.querySelector(".guide-hero-card");
      if (aside) aside.innerHTML = `<img class="overhaul-hub-image" src="${data.image}" alt="${data.title}" />`;
    }

    if (!document.querySelector(".overhaul-directory-groups")) {
      const wrapper = document.createElement("section");
      wrapper.className = "overhaul-directory-groups";
      wrapper.innerHTML = `<div class="overhaul-directory-heading"><span class="overhaul-kicker">${COPY.browseTitle}</span><h2>${data.title}</h2></div>${data.groups.map(([title, links]) => `<section class="overhaul-directory-group"><h3>${title}</h3><div class="overhaul-link-grid">${links.map(([label, href]) => `<a class="overhaul-link-card" href="${href}"><strong>${label}</strong><span aria-hidden="true">→</span></a>`).join("")}</div></section>`).join("")}`;
      hero ? hero.insertAdjacentElement("afterend", wrapper) : content.prepend(wrapper);
    }
  }

  const guideImages = [
    [/bank/, "/assets/topic-scenes/live-banking-20260606.webp"],
    [/tax/, "/assets/topic-scenes/live-taxes-20260606.webp"],
    [/job-search|work-in-spain|vida-laboral/, "/assets/topic-scenes/live-job-search-20260606.webp"],
    [/driving-licence|\/driving\//, "/assets/topic-scenes/live-driving-licence-20260625.webp"],
    [/driving-spain-visitors/, "/assets/topic-scenes/driving-spain-visitors-20260722.webp"],
    [/private-health/, "/assets/topic-scenes/live-private-health-20260606.webp"],
    [/healthcare|sip-card/, "/assets/topic-scenes/live-public-health-20260606.webp"],
    [/ehic/, "/assets/topic-scenes/live-ehic-20260606.webp"],
    [/padron/, "/assets/topic-scenes/live-padron-20260606.webp"],
    [/nie/, "/assets/topic-scenes/live-nie-20260606.webp"],
    [/tie/, "/assets/topic-scenes/live-tie-20260606.webp"],
    [/digital/, "/assets/topic-scenes/live-digital-access-20260606.webp"],
    [/renting|accommodation/, "/assets/topic-scenes/live-renting-home-20260625.webp"],
    [/phone/, "/assets/topic-scenes/phone-direct-20260606.webp"],
    [/sim-esim/, "/assets/topic-scenes/sim-esim-vpn-20260722.webp"],
    [/travel-insurance/, "/assets/topic-scenes/travel-insurance-20260722.webp"],
    [/vacation-entry|eu-vacation|non-eu-vacation/, "/assets/topic-scenes/vacation-entry.webp"],
    [/vacation-flights/, "/assets/topic-scenes/vacation-flights-airports-20260606.webp"],
    [/vacation-ground/, "/assets/topic-scenes/vacation-ground-transport-20260606.webp"],
    [/vacation-hotels/, "/assets/topic-scenes/vacation-hotel-chains-20260606.webp"],
    [/vacation-booking/, "/assets/topic-scenes/vacation-booking-platforms-20260606.webp"],
    [/vacation-tourism/, "/assets/topic-scenes/vacation-planning.webp"],
    [/vacation-reviews/, "/assets/topic-scenes/vacation-reviews-comparison-20260606.webp"]
  ];

  function enrichGuideHero() {
    if (document.body.classList.contains("iberigo-directory")) return;
    const hero = document.querySelector(".guide-hero");
    const aside = hero?.querySelector(".guide-hero-card");
    if (!hero || !aside || aside.querySelector(".overhaul-guide-image")) return;
    const image = guideImages.find(([pattern]) => pattern.test(path))?.[1] || (sectionForPath() === "visit" ? "/assets/home-cards/vacation-in-spain-coast-20260606.webp" : sectionForPath() === "live" ? "/assets/home-cards/live-in-spain-matched-20260606.webp" : "/assets/home-cards/move-to-spain-matched-20260606.webp");
    const img = document.createElement("img");
    img.className = "overhaul-guide-image";
    img.src = image;
    img.alt = "";
    aside.prepend(img);
  }

  function enrichSpainFiles() {
    if (!path.includes("the-spain-files")) return;
    const mapping = [
      ["padron", "/assets/topic-scenes/live-padron-20260606.webp"],
      ["non-lucrative", "/assets/home-cards/move-to-spain-matched-20260606.webp"],
      ["nie", "/assets/topic-scenes/live-nie-20260606.webp"],
      ["bank", "/assets/topic-scenes/live-banking-20260606.webp"]
    ];
    document.querySelectorAll(".sf-featured").forEach((article) => {
      const href = article.querySelector("a[href]")?.getAttribute("href") || "";
      const image = mapping.find(([key]) => href.includes(key))?.[1];
      const visual = article.querySelector(".sf-featured-visual");
      if (image && visual) visual.innerHTML = `<img src="${image}" alt="" />`;
    });
  }

  function boot() {
    addBodyClasses();
    upgradeNavigation();
    homepage();
    directoryPage();
    enrichGuideHero();
    enrichSpainFiles();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
