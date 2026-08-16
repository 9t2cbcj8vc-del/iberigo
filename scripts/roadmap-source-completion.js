(() => {
  if (
    typeof result === "undefined" ||
    typeof urls === "undefined" ||
    typeof linkLabels === "undefined" ||
    typeof govMeta === "undefined"
  ) return;
  if (window.__iberigoRoadmapSourceCompletionLoaded) return;
  window.__iberigoRoadmapSourceCompletionLoaded = true;

  const sourceHeading = () => currentLang === "es" ? "Enlaces a fuentes oficiales" : "Official source links";
  const genericSubtitle = () => currentLang === "es" ? "Fuente oficial" : "Official guidance";

  function sourceCard(id, href) {
    const meta = govMeta[id] || {};
    const isEu = meta.system === "eu" || /(^|\.)europa\.eu$/i.test(new URL(href).hostname);
    const label = linkLabels[currentLang]?.[id] || linkLabels.en?.[id] || id;
    const tag = isEu
      ? (currentLang === "es" ? "Unión Europea" : "European Union")
      : (currentLang === "es" ? "Fuente oficial" : "Official Source");
    const initials = isEu ? "EU" : "OS";
    const subtitle = meta.subtitle || genericSubtitle();

    const card = document.createElement("a");
    card.className = `gov-link guide-source-card guide-source-card--${isEu ? "eu" : "generic"}`;
    card.href = href;
    card.target = "_blank";
    card.rel = "noreferrer";
    card.dataset.roadmapSupplementalSource = id;
    card.innerHTML = `
      <span class="guide-source-head">
        <span class="guide-source-badge" aria-hidden="true">${initials}</span>
        <span class="guide-source-tag">${tag}</span>
      </span>
      <span class="guide-source-title">${label}</span>
      <span class="guide-source-description">${subtitle}</span>
    `;
    return card;
  }

  function ensureSourceContainer() {
    let section = result.querySelector(".route-links-note");
    if (!section) {
      section = document.createElement("div");
      section.className = "result-section route-links-note";
      section.innerHTML = `<strong>${sourceHeading()}</strong><div class="province-links"></div>`;
      const disclaimer = result.querySelector(".disclaimer");
      if (disclaimer) disclaimer.before(section);
      else result.appendChild(section);
    }

    let container = section.querySelector(".province-links");
    if (!container) {
      container = document.createElement("div");
      container.className = "province-links";
      section.appendChild(container);
    }
    return container;
  }

  function completeSources(roadmap) {
    if (!roadmap || !Array.isArray(roadmap.links) || !roadmap.links.length || !result || result.hidden) return;

    const existing = new Set(
      [...result.querySelectorAll(".route-links-note a[href]")]
        .map((anchor) => {
          try { return new URL(anchor.href, window.location.href).href; }
          catch { return anchor.href; }
        })
    );

    const missing = roadmap.links
      .map((id) => [id, urls[id]])
      .filter(([, href]) => Boolean(href))
      .filter(([, href]) => {
        try { return !existing.has(new URL(href, window.location.href).href); }
        catch { return !existing.has(href); }
      });

    if (!missing.length) return;
    const container = ensureSourceContainer();
    missing.forEach(([id, href]) => {
      container.appendChild(sourceCard(id, href));
      try { existing.add(new URL(href, window.location.href).href); }
      catch { existing.add(href); }
    });
  }

  function currentRoadmap() {
    const guideId = document.documentElement.dataset.guideId;
    if (guideId) {
      const direct = typeof directRoadmapFor === "function" ? directRoadmapFor(guideId) : null;
      if (direct) return direct;
      const route = typeof routes !== "undefined" ? routes.find((item) => item.id === guideId) : null;
      if (route && typeof roadmapFor === "function") return roadmapFor(route);
    }

    if (typeof currentDirectRoute !== "undefined" && currentDirectRoute && typeof directRoadmapFor === "function") {
      const direct = directRoadmapFor(currentDirectRoute);
      if (direct) return direct;
    }

    if (typeof wizard !== "undefined" && wizard.dataset.step === "result" && !result.hidden && typeof pickRoute === "function") {
      const route = pickRoute();
      if (route && typeof roadmapFor === "function") return roadmapFor(route);
    }
    return null;
  }

  if (typeof renderRoadmap === "function") {
    const previousRenderRoadmap = renderRoadmap;
    renderRoadmap = function () {
      previousRenderRoadmap();
      completeSources(currentRoadmap());
    };
  }

  if (typeof renderRoadmapCard === "function") {
    const previousRenderRoadmapCard = renderRoadmapCard;
    renderRoadmapCard = function (roadmap, guideId = roadmap?.route?.id || currentDirectRoute) {
      previousRenderRoadmapCard(roadmap, guideId);
      completeSources(roadmap);
    };
  }

  completeSources(currentRoadmap());
})();
