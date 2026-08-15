(function () {
  const transportVisual = "/assets/topic-scenes/vacation-ground-transport-20260606.webp";
  const bankVisual = "/assets/visual-library/banking-money.webp";
  const normalise = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function setImage(img, src, label) {
    if (!img) return;
    if (img.getAttribute("src") !== src) img.src = src;
    img.alt = "";
    img.dataset.semanticVisual = label;
  }

  function applyDirectoryImages() {
    document.querySelectorAll(".overhaul-directory-group").forEach((group) => {
      const heading = group.querySelector("h3");
      const img = group.querySelector(".overhaul-directory-group-heading img");
      const title = normalise(heading?.textContent);
      if (/money & work|dinero y trabajo/.test(title)) setImage(img, bankVisual, "money-work");
      if (/transport & connection|transporte y conexion|getting there & around|llegar y moverse/.test(title)) setImage(img, transportVisual, "transport");
    });
  }

  function applyGuideImages() {
    const path = window.location.pathname.toLowerCase();
    if (!/(driving-licence-exchange|driving-spain-visitors|vacation-ground|vacation-flights)/.test(path)) return;
    const img = document.querySelector(".overhaul-guide-image, .guide-hero-card img, .result-hero-media img");
    setImage(img, transportVisual, "transport-guide");
  }

  function apply() {
    applyDirectoryImages();
    applyGuideImages();
  }

  apply();
  document.addEventListener("DOMContentLoaded", apply, { once: true });
  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
