(function () {
  const PUBLIC_TRANSPORT = "/assets/topic-scenes/vacation-ground-transport-20260606.webp";
  const DRIVING = "/assets/topic-scenes/driving-spain-visitors-20260722.webp";
  const DRIVING_LICENCE = "/assets/topic-scenes/driving-licence-exchange-20260719.webp";
  const BANKING = "/assets/visual-library/banking-money.webp";
  const path = window.location.pathname.replace(/\/index\.html$/, "/");

  const groupImageMap = new Map([
    ["transport & driving", DRIVING],
    ["transporte y conducción", DRIVING],
    ["transport & connection", DRIVING],
    ["transporte y conexión", DRIVING],
    ["getting there & around", PUBLIC_TRANSPORT],
    ["llegar y moverse", PUBLIC_TRANSPORT],
    ["money & work", BANKING],
    ["dinero y trabajo", BANKING]
  ]);

  function guideImageForPath() {
    if (/\/driving-licence-exchange\//.test(path)) return DRIVING_LICENCE;
    if (/\/(driving-spain-visitors|living-in-spain\/driving)\//.test(path)) return DRIVING;
    if (/\/(vacation-ground|vacation-flights)\//.test(path)) return PUBLIC_TRANSPORT;
    return null;
  }

  function frameSemanticImage(img, image, isDirectoryGroup = false) {
    if (!img) return;
    img.classList.toggle("overhaul-transport-image", image === PUBLIC_TRANSPORT);
    img.classList.toggle("overhaul-driving-image", image === DRIVING || image === DRIVING_LICENCE);
    if (!isDirectoryGroup || img.parentElement?.classList.contains("overhaul-directory-group-visual")) return;
    const frame = document.createElement("span");
    frame.className = "overhaul-directory-group-visual";
    img.before(frame);
    frame.appendChild(img);
  }

  function applySemanticImages() {
    document.querySelectorAll(".overhaul-directory-group").forEach((group) => {
      const heading = group.querySelector("h3")?.textContent?.trim().toLowerCase();
      const image = groupImageMap.get(heading);
      const img = group.querySelector(".overhaul-directory-group-heading img");
      if (image && img && img.getAttribute("src") !== image) img.src = image;
      if (image) frameSemanticImage(img, image, true);
    });

    const guideImage = guideImageForPath();
    if (guideImage) {
      const img = document.querySelector(".overhaul-guide-image, .guide-hero-card img, .result-hero-media img");
      if (img && img.getAttribute("src") !== guideImage) img.src = guideImage;
      frameSemanticImage(img, guideImage);
    }
  }

  applySemanticImages();
  document.addEventListener("DOMContentLoaded", applySemanticImages, { once: true });

  const observer = new MutationObserver(() => applySemanticImages());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
