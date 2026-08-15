(function () {
  const TRANSPORT = "/assets/topic-scenes/vacation-ground-transport-20260606.webp";
  const BANKING = "/assets/visual-library/banking-money.webp";
  const path = window.location.pathname.replace(/\/index\.html$/, "/");

  const groupImageMap = new Map([
    ["transport & connection", TRANSPORT],
    ["transporte y conexión", TRANSPORT],
    ["getting there & around", TRANSPORT],
    ["llegar y moverse", TRANSPORT],
    ["money & work", BANKING],
    ["dinero y trabajo", BANKING]
  ]);

  const transportGuide = /\/(driving-licence-exchange|driving-spain-visitors|vacation-ground|vacation-flights)\//.test(path);

  function applySemanticImages() {
    document.querySelectorAll(".overhaul-directory-group").forEach((group) => {
      const heading = group.querySelector("h3")?.textContent?.trim().toLowerCase();
      const image = groupImageMap.get(heading);
      const img = group.querySelector(".overhaul-directory-group-heading img");
      if (image && img && img.getAttribute("src") !== image) img.src = image;
    });

    if (transportGuide) {
      const img = document.querySelector(".overhaul-guide-image, .guide-hero-card img, .result-hero-media img");
      if (img && img.getAttribute("src") !== TRANSPORT) img.src = TRANSPORT;
    }
  }

  applySemanticImages();
  document.addEventListener("DOMContentLoaded", applySemanticImages, { once: true });

  const observer = new MutationObserver(() => applySemanticImages());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
