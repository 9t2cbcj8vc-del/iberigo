(function () {
  const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
  if (!isHome) return;

  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const responsiveAttrs = (url, sizes) => {
    const m = /^(\/assets\/visual-library\/(?!transport-spain)[a-z0-9-]+)\.webp$/.exec(url || "");
    return m ? ` srcset="${m[1]}-400.webp 400w, ${m[1]}-800.webp 800w, ${m[1]}-1200.webp 1200w, ${url} 1536w" sizes="${sizes}"` : "";
  };
  const visuals = window.IberiGoVisualLibrary || {
    arrival: "/assets/visual-library/arrival-relocation.webp",
    visit: "/assets/visual-library/visit-travel.webp",
    everyday: "/assets/visual-library/everyday-life.webp"
  };
  const cards = lang === "es" ? {
    move: {
      eyebrow: "Mudanza",
      title: "Mudarse a España",
      description: "Residencia, NIE, TIE, padrón, registro UE y los pasos clave para empezar tu nueva vida en España.",
      cta: "Planifica tu mudanza",
      href: "/es/start-here/",
      image: visuals.arrival,
      alt: "Llegada y mudanza a una calle mediterránea española"
    },
    vacation: {
      eyebrow: "Viajes",
      title: "Visitar España",
      description: "Entrada, estancias cortas, transporte, alojamiento y ayuda práctica para planificar tu viaje.",
      cta: "Planifica tu visita",
      href: "/guides/es/vacation-in-spain/",
      linksLabel: "Guías prácticas para visitar España",
      links: [
        ["Cadenas hoteleras", "/guides/es/vacation-hotels/"],
        ["Trenes", "/guides/es/vacation-trains/"],
        ["Autopistas de peaje", "/guides/es/vacation-toll-roads/"],
        ["Supermercados", "/guides/es/vacation-supermarkets/"],
        ["Móvil y SIM", "/guides/es/sim-esim-vpn/"]
      ],
      image: visuals.visit,
      alt: "Costa española y ambiente de viaje mediterráneo"
    },
    living: {
      eyebrow: "Vida cotidiana",
      title: "Vivir en España",
      description: "Sanidad, banca, impuestos, acceso digital y los trámites que forman parte de la vida diaria en España.",
      cta: "Guías para vivir",
      href: "/guides/es/living-in-spain/",
      linksLabel: "Guías prácticas para vivir en España",
      links: [
        ["Sanidad", "/guides/es/sip-card/"],
        ["Cuenta bancaria", "/the-spain-files/abrir-cuenta-bancaria-espana/"],
        ["Supermercados", "/guides/es/vacation-supermarkets/"]
      ],
      image: visuals.everyday,
      alt: "Vida cotidiana en un barrio residencial español"
    }
  } : {
    move: {
      eyebrow: "Relocation",
      title: "Move to Spain",
      description: "Residency, NIE, TIE, padrón, EU registration and the key steps to start your new life in Spain.",
      cta: "Plan your move",
      href: "/start-here/",
      image: visuals.arrival,
      alt: "Arrival and relocation in a Spanish Mediterranean street"
    },
    vacation: {
      eyebrow: "Travel",
      title: "Visit Spain",
      description: "Entry rules, short stays, transport, places to stay and practical travel help for your trip.",
      cta: "Plan your visit",
      href: "/guides/vacation-in-spain/",
      linksLabel: "Practical guides for visiting Spain",
      links: [
        ["Hotel chains", "/guides/vacation-hotels/"],
        ["Trains", "/guides/vacation-trains/"],
        ["Toll roads", "/guides/vacation-toll-roads/"],
        ["Supermarkets", "/guides/vacation-supermarkets/"],
        ["Mobile & SIM", "/guides/sim-esim-vpn/"]
      ],
      image: visuals.visit,
      alt: "Spanish coast and Mediterranean travel scene"
    },
    living: {
      eyebrow: "Everyday life",
      title: "Living in Spain",
      description: "Healthcare, banking, taxes, digital access and the admin steps that shape daily life in Spain.",
      cta: "Browse living guides",
      href: "/guides/living-in-spain/",
      linksLabel: "Practical guides for living in Spain",
      links: [
        ["Healthcare", "/guides/sip-card/"],
        ["Bank account", "/the-spain-files/bank-account-spain/"],
        ["Supermarkets", "/guides/vacation-supermarkets/"]
      ],
      image: visuals.everyday,
      alt: "Everyday life in a Spanish residential neighbourhood"
    }
  };

  function renderCard(card, key) {
    // Pre-rendered cards carry their language; re-render only for the other language.
    if (!card || card.dataset.gatewayCardReady === lang || (card.dataset.gatewayCardReady === "true" && lang === "en")) return;
    const data = cards[key];
    if (!data) return;

    card.dataset.gatewayCardReady = lang;
    card.classList.add("iberigo-gateway-card", `iberigo-gateway-card--${key}`);
    if (key === "move") card.classList.add("iberigo-gateway-card--primary");

    card.innerHTML = `
      <a class="gateway-card-media" href="${data.href}" tabindex="-1" aria-hidden="true">
        <img src="${data.image}"${responsiveAttrs(data.image, "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw")} alt="${data.alt}" loading="lazy" decoding="async" />
      </a>
      <div class="gateway-card-body">
        <span class="gateway-card-eyebrow">${data.eyebrow}</span>
        <h3>${data.title}</h3>
        <p>${data.description}</p>${data.links ? `
        <ul class="gateway-card-links" aria-label="${data.linksLabel}">${data.links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>` : ""}
        <a class="gateway-card-action" href="${data.href}">${data.cta}<span aria-hidden="true">→</span></a>
      </div>`;
  }

  function apply() {
    const grid = document.querySelector("#guide-cards .situation-grid");
    if (!grid) return false;

    const move = grid.querySelector('[data-home-card="move"]');
    const vacation = grid.querySelector('[data-home-card="vacation"]');
    const living = grid.querySelector('[data-home-card="living"]');
    if (!move || !vacation || !living) return false;

    renderCard(move, "move");
    renderCard(vacation, "vacation");
    renderCard(living, "living");

    // Keep the gateway order aligned with the navigation: Move, Visit, Living.
    grid.append(move, vacation, living);
    grid.classList.add("iberigo-gateway-grid");
    return true;
  }

  function boot() {
    if (apply()) return;
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
