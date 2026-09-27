// Cookieless GoatCounter visitor counter (site code "iberigo"). This file is on
// every public page, so the counter loads here; app.js shares the same one-time
// guard so pages that load both scripts are only counted once. Production
// hostnames only: deploy previews and local builds are never counted.
(function () {
  var COUNTER_URL = "https://iberigo.goatcounter.com/count";
  var HOSTS = ["iberigo.eu", "www.iberigo.eu"];
  if (HOSTS.indexOf(window.location.hostname) === -1) return;
  if (window.__iberigoVisitorCounterLoaded || document.querySelector("script[data-goatcounter]")) return;
  window.__iberigoVisitorCounterLoaded = true;
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = COUNTER_URL;
  document.head.appendChild(script);
})();

(function () {
  function addStyle(selector, href, datasetKey) {
    if (document.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset[datasetKey] = 'true';
    document.head.appendChild(link);
  }

  function loadScript(selector, src, datasetKey) {
    const existing = document.querySelector(selector);
    if (existing) return Promise.resolve();
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.dataset[datasetKey] = 'true';
      script.onload = resolve;
      script.onerror = resolve;
      document.head.appendChild(script);
    });
  }

  addStyle('link[data-iberigo-overhaul]', '/styles-overhaul.css?v=20260927-ux-quick-fixes-1', 'iberigoOverhaul');
  addStyle('link[data-iberigo-gateway-cards]', '/styles-homepage-gateway-cards.css?v=20260927-ux-quick-fixes-1', 'iberigoGatewayCards');
  addStyle('link[data-iberigo-final-polish]', '/styles-final-visual-polish.css?v=20260927-ux-quick-fixes-1', 'iberigoFinalPolish');

  (async () => {
    await loadScript('script[data-iberigo-overhaul]', '/scripts/visual-overhaul.js?v=20260927-ux-quick-fixes-1', 'iberigoOverhaul');
    await loadScript('script[data-iberigo-gateway-cards]', '/scripts/homepage-gateway-cards.js?v=20260816-homepage-cta-runtime-1', 'iberigoGatewayCards');
    await loadScript('script[data-iberigo-final-polish]', '/scripts/final-visual-polish.js?v=20260927-ux-quick-fixes-1', 'iberigoFinalPolish');
  })();
})();

(function () {
  const opener = document.querySelector("[data-site-search-open], .search-nav-link");
  if (!opener) return;
  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const copy = lang === "es" ? { title:"Buscar en IberiGo", placeholder:"Buscar guías y artículos", close:"Cerrar búsqueda", empty:"Escribe al menos 2 caracteres.", none:"No se encontraron resultados", try:"Prueba con otra palabra o frase", more:"Mostrar más", en:"Inglés", es:"Español" } : { title:"Search IberiGo", placeholder:"Search guides and articles", close:"Close search", empty:"Type at least 2 characters.", none:"No results found", try:"Try a different word or phrase", more:"Show more", en:"English", es:"Spanish" };
  const normalise = (v) => String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Synonym groups (normalised, accent-free). A query term matches an entry if
  // any form in its group appears; exact-term hits still score higher.
  const SYNONYM_GROUPS = [
    ["permit","authorization","permits","authorizations"], ["permiso","autorizacion","permisos","autorizaciones"],
    ["license","licence","licencia","licenses","licences"], ["driving","driver","conducir","conduccion"],
    ["padron","empadronamiento","empadronarse","empadronar","census"],
    ["tie","huellas","fingerprint","fingerprints","residence card"],
    ["nie","foreigner identity number","numero de identidad"],
    ["torrevieja","alicante"], ["bank","banking","banco","bancaria","bancario"], ["account","cuenta"],
    ["autonomo","autonomos","self-employed","freelance","freelancer"],
    ["hotel","hotels","hoteles","hotel booking"], ["healthcare","health","sanidad","sanitaria"],
    ["tax","taxes","impuestos","hacienda"], ["nomad","nomada"], ["visa","visado"]
  ];
  const termForms = (term) => { const forms = new Set([term]); SYNONYM_GROUPS.forEach(g => { if (g.includes(term)) g.forEach(f => forms.add(f)); }); return [...forms]; };
  const hasWord = (hay, form) => new RegExp(`(^|[^a-z0-9])${form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(hay);
  let index = [], lastFocus = null, shown = 10;
  document.body.insertAdjacentHTML("beforeend", `<dialog class="site-search-dialog" aria-labelledby="siteSearchTitle"><div class="site-search-panel"><button class="site-search-close" type="button" aria-label="${copy.close}">×</button><h2 id="siteSearchTitle">${copy.title}</h2><input class="site-search-input" type="search" autocomplete="off" placeholder="${copy.placeholder}" aria-label="${copy.placeholder}"/><p class="site-search-status" role="status" aria-live="polite">${copy.empty}</p><div class="site-search-results"></div></div></dialog>`);
  const dialog = document.querySelector(".site-search-dialog"), input = dialog.querySelector("input"), results = dialog.querySelector(".site-search-results"), status = dialog.querySelector(".site-search-status");
  const score = (item, q, terms) => {
    const title=normalise(item.title), headings=normalise((item.headings||[]).join(" ")), keys=normalise((item.keywords||[]).join(" ")), desc=normalise(item.description), all=normalise([title,headings,keys,desc,item.text].join(" "));
    let matched = 0, s = title === q ? 1000 : title.startsWith(q) ? 700 : title.includes(q) ? 500 : 0;
    terms.forEach(t => {
      const forms = termForms(t);
      const inTitle = forms.some(f => hasWord(title, f)), inHead = forms.some(f => hasWord(headings, f) || hasWord(keys, f)), inDesc = forms.some(f => hasWord(desc, f)), inAll = forms.some(f => hasWord(all, f));
      if (!inAll) return;
      matched += 1;
      if (inTitle) s += hasWord(title, t) ? 260 : 200;
      if (inHead) s += 120;
      if (inDesc) s += 50;
      s += 10;
    });
    if (!matched) return { s: 0, matched };
    return { s, matched };
  };
  function render() {
    const q=normalise(input.value.trim()), terms=q.split(/\s+/).filter(Boolean);
    if(q.length<2){ status.textContent=copy.empty; results.innerHTML=""; return; }
    // Current page language first, then score. Entries must match every term
    // (with synonyms); if nothing does, fall back to the best partial matches.
    const scored=index.map(item=>({item,...score(item,q,terms),same:item.language===lang?1:0})).filter(x=>x.s);
    const full=scored.filter(x=>x.matched===terms.length);
    const matches=(full.length?full:scored).sort((a,b)=>b.same-a.same||b.matched-a.matched||b.s-a.s||a.item.title.localeCompare(b.item.title));
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
  fetch("/search-index.json?v=20260927-ux-quick-fixes-1",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).then(data=>{index=data;render();}).catch(()=>{status.textContent=copy.none;});
})();
