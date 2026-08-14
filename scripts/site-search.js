(function () {
  if (typeof routes === "undefined") return;
  if (document.querySelector('script[data-roadmap-2026-corrections]')) return;

  // app.js keeps its link dictionaries inside renderRouteLinks(). The roadmap
  // correction layer needs its own small global dictionary for newly corrected
  // action links without changing the large generated app bundle.
  window.linkLabels = window.linkLabels || { en: {}, es: {} };
  window.urls = window.urls || {};
  window.govMeta = window.govMeta || {};

  const originalRenderRouteLinks = typeof renderRouteLinks === "function" ? renderRouteLinks : null;
  const script = document.createElement("script");
  script.src = "/scripts/roadmap-2026-corrections.js?v=20260814-roadmap-fixes";
  script.async = false;
  script.dataset.roadmap2026Corrections = "true";
  script.addEventListener("load", function () {
    if (!originalRenderRouteLinks || typeof renderRouteLinks !== "function") return;

    renderRouteLinks = function (linkTypes, excludedUrls) {
      const excluded = excludedUrls instanceof Set ? excludedUrls : new Set();
      const types = Array.isArray(linkTypes) ? linkTypes : [];
      const customTypes = types.filter(function (type) { return Boolean(window.urls[type]); });
      const originalTypes = types.filter(function (type) { return !window.urls[type]; });
      const originalHtml = originalRenderRouteLinks(originalTypes, excluded);
      const lang = typeof currentLang !== "undefined" && currentLang === "es" ? "es" : "en";
      const customHtml = customTypes.map(function (type) {
        const url = window.urls[type];
        if (!url || excluded.has(url)) return "";
        const label = (window.linkLabels[lang] && window.linkLabels[lang][type]) || (window.linkLabels.en && window.linkLabels.en[type]) || type;
        const meta = window.govMeta[type] || {};
        const subtitle = meta.subtitle || (lang === "es" ? "Fuente oficial" : "Official source");
        const isEu = /europa\.eu|ec\.europa\.eu/.test(url);
        const category = isEu ? "eu" : /policia\.gob\.es/.test(url) ? "police" : /tasasPDF|790-0/.test(url) ? "tax" : "government";
        const initials = isEu ? "EU" : category === "police" ? "PN" : category === "tax" ? "€" : "ES";
        const tag = isEu ? (lang === "es" ? "Unión Europea" : "European Union") : category === "police" ? "Policía Nacional" : category === "tax" ? (lang === "es" ? "Tasa oficial" : "Official fee") : (lang === "es" ? "Gobierno de España" : "Spanish Government");
        return '<a class="gov-link guide-source-card guide-source-card--' + category + '" href="' + url + '" target="_blank" rel="noreferrer">' +
          '<span class="guide-source-head"><span class="guide-source-badge" aria-hidden="true">' + initials + '</span><span class="guide-source-tag">' + tag + '</span></span>' +
          '<span class="guide-source-title">' + label + '</span>' +
          '<span class="guide-source-description">' + subtitle + '</span></a>';
      }).join("");
      return originalHtml + customHtml;
    };

    // The correction script may already have rendered a generated route page
    // before this wrapper was installed. Render once more so corrected action
    // links are visible immediately on static /guides/... URLs as well.
    const guideId = document.documentElement.dataset.guideId;
    if (guideId) {
      const route = routes.find(function (item) { return item.id === guideId; });
      if (route && typeof showDirectGuide === "function" && typeof renderRoadmapCard === "function" && typeof roadmapFor === "function") {
        showDirectGuide();
        renderRoadmapCard(roadmapFor(route), guideId);
      }
    } else if (typeof result !== "undefined" && !result.hidden && typeof wizard !== "undefined" && wizard.dataset.step === "result" && typeof renderRoadmap === "function") {
      renderRoadmap();
    }
  });
  document.head.appendChild(script);
})();

(function () {
  const opener = document.querySelector("[data-site-search-open], .search-nav-link");
  if (!opener) return;
  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const copy = lang === "es" ? { title:"Buscar en IberiGo", placeholder:"Buscar guías y artículos", close:"Cerrar búsqueda", empty:"Escribe al menos 2 caracteres.", none:"No se encontraron resultados", try:"Prueba con otra palabra o frase", more:"Mostrar más", en:"Inglés", es:"Español" } : { title:"Search IberiGo", placeholder:"Search guides and articles", close:"Close search", empty:"Type at least 2 characters.", none:"No results found", try:"Try a different word or phrase", more:"Show more", en:"English", es:"Spanish" };
  const normalise = (v) => String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const termForms = (term) => ({ permit:["permit","authorization"], permits:["permits","authorizations"], authorization:["authorization","permit"], authorizations:["authorizations","permits"], permiso:["permiso","autorizacion"], permisos:["permisos","autorizaciones"], autorizacion:["autorizacion","permiso"], autorizaciones:["autorizaciones","permisos"] }[term] || [term]);
  let index = [], lastFocus = null, shown = 10;
  document.body.insertAdjacentHTML("beforeend", `<dialog class="site-search-dialog" aria-labelledby="siteSearchTitle"><div class="site-search-panel"><button class="site-search-close" type="button" aria-label="${copy.close}">×</button><h2 id="siteSearchTitle">${copy.title}</h2><input class="site-search-input" type="search" autocomplete="off" placeholder="${copy.placeholder}" aria-label="${copy.placeholder}"/><p class="site-search-status" role="status" aria-live="polite">${copy.empty}</p><div class="site-search-results"></div></div></dialog>`);
  const dialog = document.querySelector(".site-search-dialog"), input = dialog.querySelector("input"), results = dialog.querySelector(".site-search-results"), status = dialog.querySelector(".site-search-status");
  const score = (item, q, terms) => {
    const title=normalise(item.title), headings=normalise((item.headings||[]).join(" ")), keys=normalise((item.keywords||[]).join(" ")), desc=normalise(item.description), all=normalise([title,headings,keys,desc,item.text].join(" "));
    if (!terms.every(t => termForms(t).some(form => all.includes(form)))) return 0;
    let s = title === q ? 1000 : title.startsWith(q) ? 700 : title.includes(q) ? 500 : 0;
    terms.forEach(t => { if (headings.includes(t)||keys.includes(t)) s+=120; if(desc.includes(t))s+=50; if(all.includes(t))s+=10; });
    if (item.language === lang) s += 25;
    return s;
  };
  function render() {
    const q=normalise(input.value.trim()), terms=q.split(/\s+/).filter(Boolean);
    if(q.length<2){ status.textContent=copy.empty; results.innerHTML=""; return; }
    const matches=index.map(item=>({item,s:score(item,q,terms)})).filter(x=>x.s).sort((a,b)=>b.s-a.s||a.item.title.localeCompare(b.item.title));
    if(!matches.length){status.textContent=`${copy.none}. ${copy.try}`;results.innerHTML="";return;}
    status.textContent=`${matches.length} ${lang === "es" ? "resultados" : matches.length===1?"result":"results"}`;
    results.innerHTML=matches.slice(0,shown).map(({item})=>`<a class="site-search-result" href="${item.url}"><span>${item.type} · ${item.language === "es" ? copy.es : copy.en}</span><strong>${item.title}</strong><small>${item.description}</small></a>`).join("")+(matches.length>shown?`<button class="site-search-more" type="button">${copy.more}</button>`:"");
    results.querySelector(".site-search-more")?.addEventListener("click",()=>{shown+=10;render();});
  }
  function open(event){event?.preventDefault();lastFocus=document.activeElement;shown=10;dialog.showModal();requestAnimationFrame(()=>input.focus());}
  function close(){dialog.close();lastFocus?.focus();}
  document.querySelectorAll("[data-site-search-open], .search-nav-link").forEach(el=>{el.addEventListener("click",open);el.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();open(e);}});});
  input.addEventListener("input",render); input.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();close();}}); dialog.querySelector(".site-search-close").addEventListener("click",close);
  dialog.addEventListener("click",e=>{if(e.target===dialog)close();}); dialog.addEventListener("cancel",e=>{e.preventDefault();close();});
  fetch("/search-index.json?v=20260712-sitewide-4",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).then(data=>{index=data;render();}).catch(()=>{status.textContent=copy.none;});
})();
