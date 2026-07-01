(function () {
  const input = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");
  const status = document.getElementById("searchStatus");
  const template = document.getElementById("searchResultCardTemplate");

  if (!input || !results || !status || !template) return;

  let index = [];
  let visibleResults = [];
  let activeIndex = -1;

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

  const scoreItem = (item, terms) => {
    const title = normalise(item.title);
    const description = normalise(item.description);
    const category = normalise(item.category);
    const difficulty = normalise(item.difficulty);
    const headings = normalise((item.headings || []).join(" "));
    const keywords = normalise((item.keywords || []).join(" "));
    const allText = normalise(searchableText(item));

    if (!terms.every((term) => allText.includes(term))) return 0;

    return terms.reduce((score, term) => {
      if (title.includes(term)) score += 9;
      if (keywords.includes(term)) score += 6;
      if (headings.includes(term)) score += 4;
      if (category.includes(term)) score += 3;
      if (difficulty.includes(term)) score += 2;
      if (description.includes(term)) score += 2;
      return score;
    }, 0);
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

    visibleResults = index
      .map((item) => ({ item, score: scoreItem(item, terms) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
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
