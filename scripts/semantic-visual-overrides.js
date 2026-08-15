(function () {
  const publicTransportVisual = "/assets/topic-scenes/vacation-ground-transport-20260606.webp";
  const drivingVisual = "/assets/topic-scenes/driving-spain-visitors-20260722.webp";
  const drivingLicenceVisual = "/assets/topic-scenes/driving-licence-exchange-20260719.webp";
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
      if (/transport & driving|transporte y conduccion|transport & connection|transporte y conexion/.test(title)) setImage(img, drivingVisual, "driving");
      if (/getting there & around|llegar y moverse/.test(title)) setImage(img, publicTransportVisual, "public-transport");
    });
  }

  function applyGuideImages() {
    const path = window.location.pathname.toLowerCase();
    const img = document.querySelector(".overhaul-guide-image, .guide-hero-card img, .result-hero-media img");
    if (/driving-licence-exchange/.test(path)) setImage(img, drivingLicenceVisual, "driving-licence-guide");
    else if (/driving-spain-visitors|living-in-spain\/driving/.test(path)) setImage(img, drivingVisual, "driving-guide");
    else if (/vacation-ground|vacation-flights/.test(path)) setImage(img, publicTransportVisual, "public-transport-guide");
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
