(function () {
  const input = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");
  const status = document.getElementById("searchStatus");
  const template = document.getElementById("searchResultCardTemplate");

  if (!input || !results || !status || !template) return;

  let index = [];
  let visibleResults = [];
  let activeIndex = -1;

  const initialQuery = new URLSearchParams(window.location.search).get("q");
  if (initialQuery) input.value = initialQuery;

  const normalise = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const termsFromQuery = (query) =>
    normalise(query)
      .split(/\s+/)
      .map((term) => term.trim())
      .filter((term) => term.length > 1);

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlight = (value, rawTerms) => {
    const text = escapeHtml(value);
    const terms = rawTerms.map(escapeRegExp).filter(Boolean);
    if (!terms.length) return text;
    return text.replace(new RegExp(`(${terms.join("|")})`, "gi"), "<mark>$1</mark>");
  };

  const searchableText = (item) =>
    [
      item.title,
      item.description,
      item.category,
      item.difficulty,
      ...(item.headings || []),
      ...(item.keywords || [])
    ].join(" ");

  // Results in the visitor's language come first. /search/?lang=es (or the
  // saved site language) selects Spanish; otherwise the page language is used.
  const pageLang = (() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    let saved = "";
    try { saved = localStorage.getItem("holaPapersLang") || ""; } catch (error) { saved = ""; }
    const value = (param || saved || document.documentElement.lang || "en").toLowerCase();
    return value.startsWith("es") ? "es" : "en";
  })();

  // Synonym groups (normalised, accent-free). A query term matches an entry if
  // any form in its group appears; exact-term hits still score higher.
  const SYNONYM_GROUPS = [
    ["permit", "authorization", "permits", "authorizations"],
    ["permiso", "autorizacion", "permisos", "autorizaciones"],
    ["license", "licence", "licencia", "licenses", "licences"],
    ["driving", "driver", "conducir", "conduccion"],
    ["padron", "empadronamiento", "empadronarse", "empadronar", "census"],
    ["tie", "huellas", "fingerprint", "fingerprints", "residence card"],
    ["nie", "foreigner identity number", "numero de identidad"],
    ["torrevieja", "alicante"],
    ["bank", "banking", "banco", "bancaria", "bancario"],
    ["account", "cuenta"],
    ["autonomo", "autonomos", "self-employed", "freelance", "freelancer"],
    ["hotel", "hotels", "hoteles", "hotel booking"],
    ["healthcare", "health", "sanidad", "sanitaria"],
    ["tax", "taxes", "impuestos", "hacienda"],
    ["nomad", "nomada"],
    ["visa", "visado"]
  ];

  const termForms = (term) => {
    const forms = new Set([term]);
    SYNONYM_GROUPS.forEach((group) => {
      if (group.includes(term)) group.forEach((form) => forms.add(form));
    });
    return [...forms];
  };

  const hasWord = (haystack, form) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(form)}`).test(haystack);

  const scoreItem = (item, terms, query) => {
    const title = normalise(item.title);
    const description = normalise(item.description);
    const category = normalise(item.category);
    const difficulty = normalise(item.difficulty);
    const headings = normalise((item.headings || []).join(" "));
    const keywords = normalise((item.keywords || []).join(" "));
    const allText = normalise(`${searchableText(item)} ${item.text || ""}`);
    const phrase = normalise(query).trim();

    let matched = 0;
    let score = phrase && title === phrase ? 60 : phrase && title.includes(phrase) ? 30 : 0;
    terms.forEach((term) => {
      const forms = termForms(term);
      const any = (field) => forms.some((form) => hasWord(field, form));
      if (!any(allText)) return;
      matched += 1;
      if (any(title)) score += hasWord(title, term) ? 24 : 18;
      if (any(keywords)) score += 6;
      if (any(headings)) score += 4;
      if (any(category)) score += 3;
      if (any(difficulty)) score += 2;
      if (any(description)) score += 2;
      score += 1;
    });
    return { score: matched ? score : 0, matched };
  };

  const setActiveResult = (nextIndex) => {
    const cards = [...results.querySelectorAll(".search-result-card")];
    activeIndex = cards.length ? Math.max(0, Math.min(nextIndex, cards.length - 1)) : -1;

    cards.forEach((card, index) => {
      const active = index === activeIndex;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-selected", active ? "true" : "false");
      if (active) {
        input.setAttribute("aria-activedescendant", card.id);
        card.scrollIntoView({ block: "nearest" });
      }
    });

    if (activeIndex === -1) input.removeAttribute("aria-activedescendant");
  };

  const emptyState = (message) => {
    results.innerHTML = `<div class="search-empty">${escapeHtml(message)}</div>`;
    input.setAttribute("aria-expanded", "false");
    activeIndex = -1;
    input.removeAttribute("aria-activedescendant");
  };

  const renderResults = () => {
    const query = input.value.trim();
    const terms = termsFromQuery(query);

    if (!query) {
      visibleResults = [];
      status.textContent = "Type to search guides.";
      results.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      activeIndex = -1;
      return;
    }

    if (!index.length) {
      visibleResults = [];
      status.textContent = "No published guides are searchable yet.";
      emptyState("No published guides are searchable yet. Draft pages stay out of search until they are reviewed and published.");
      return;
    }

    // Every term (or a synonym) must match; if nothing does, show the best
    // partial matches instead of an empty page. Current language first.
    const scored = index
      .map((item) => ({ item, ...scoreItem(item, terms, query), same: item.language === pageLang ? 1 : 0 }))
      .filter((entry) => entry.score > 0);
    const complete = scored.filter((entry) => entry.matched === terms.length);
    visibleResults = (complete.length ? complete : scored)
      .sort((a, b) => b.same - a.same || b.matched - a.matched || b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 12)
      .map((entry) => entry.item);

    if (!visibleResults.length) {
      status.textContent = `No results for "${query}".`;
      emptyState(`No results for "${query}". Try a broader topic, such as healthcare, bank, padrón or tax.`);
      return;
    }

    status.textContent = `${visibleResults.length} result${visibleResults.length === 1 ? "" : "s"} for "${query}".`;
    results.innerHTML = "";
    input.setAttribute("aria-expanded", "true");

    visibleResults.forEach((item, index) => {
      const card = template.content.firstElementChild.cloneNode(true);
      card.id = `search-result-${index}`;
      card.href = item.url;
      card.setAttribute("aria-selected", "false");
      card.querySelector(".search-result-meta").textContent = [item.category, item.difficulty].filter(Boolean).join(" · ");
      card.querySelector("h3").innerHTML = highlight(item.title, terms);
      card.querySelector("p").innerHTML = highlight(item.description, terms);
      results.appendChild(card);
    });

    setActiveResult(0);
  };

  input.addEventListener("input", renderResults);

  input.addEventListener("keydown", (event) => {
    if (!visibleResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResult(activeIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResult(activeIndex - 1);
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      const card = document.getElementById(`search-result-${activeIndex}`);
      if (card) {
        event.preventDefault();
        window.location.href = card.href;
      }
    }

    if (event.key === "Escape") {
      input.value = "";
      renderResults();
    }
  });

  fetch("/search-index.json", { headers: { Accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : []))
    .then((items) => {
      index = Array.isArray(items) ? items : [];
      renderResults();
    })
    .catch(() => {
      index = [];
      status.textContent = "Search is not available right now.";
      emptyState("Search is not available right now.");
    });
})();
