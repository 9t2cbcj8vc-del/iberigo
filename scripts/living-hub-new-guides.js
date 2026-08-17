(function () {
  const normalizedPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const isSpanish = normalizedPath === "/guides/es/living-in-spain/";
  const isEnglish = normalizedPath === "/guides/living-in-spain/";
  if (!isEnglish && !isSpanish) return;

  const copy = isSpanish
    ? {
        title: "Residencia y documentos",
        links: [
          ["Vivir en España a largo plazo", "/es/living-in-spain/staying-long-term/"],
          ["Documentos, apostillas y traducciones juradas", "/es/moving-to-spain/documents-apostilles-translations/"]
        ]
      }
    : {
        title: "Residence & documents",
        links: [
          ["Staying in Spain long term", "/living-in-spain/staying-long-term/"],
          ["Documents, apostilles & sworn translations", "/moving-to-spain/documents-apostilles-translations/"]
        ]
      };

  function buildGroup() {
    const group = document.createElement("section");
    group.className = "overhaul-directory-group";
    group.dataset.newGuideCluster = "long-term-documents";

    const visual = window.IberiGoVisualLibrary?.documents || "/assets/visual-library/documents-admin.webp";
    group.innerHTML = `
      <div class="overhaul-directory-group-heading">
        <img src="${visual}" alt="" loading="lazy" decoding="async" />
        <h3>${copy.title}</h3>
      </div>
      <div class="overhaul-link-grid">
        ${copy.links
          .map(
            ([label, href]) =>
              `<a class="overhaul-link-card" href="${href}"><strong>${label}</strong><span aria-hidden="true">→</span></a>`
          )
          .join("")}
      </div>`;
    return group;
  }

  function ensureVisibleCluster() {
    const wrapper = document.querySelector(".overhaul-directory-groups");
    if (!wrapper) return false;

    if (wrapper.querySelector('[data-new-guide-cluster="long-term-documents"]')) return true;

    const expectedHref = copy.links[0][1];
    if (wrapper.querySelector(`a[href="${expectedHref}"]`)) return true;

    const group = buildGroup();
    const heading = wrapper.querySelector(".overhaul-directory-heading");
    if (heading) heading.insertAdjacentElement("afterend", group);
    else wrapper.prepend(group);
    return true;
  }

  if (ensureVisibleCluster()) return;

  const observer = new MutationObserver(function () {
    if (ensureVisibleCluster()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener(
    "load",
    function () {
      ensureVisibleCluster();
      window.setTimeout(function () {
        ensureVisibleCluster();
        observer.disconnect();
      }, 1500);
    },
    { once: true }
  );
})();
