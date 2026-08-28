const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP = path.join(ROOT, "app.js");
const MARKER = "data-iberigo-action-first-runtime";

let source = fs.readFileSync(APP, "utf8");
if (source.includes(MARKER)) {
  console.log("Action-first client runtime already patched.");
  process.exit(0);
}

const anchor = `  if (guideLang && guideLang !== currentLang) {
    currentLang = guideLang;
    localStorage.setItem("holaPapersLang", currentLang);
    applyTranslations();
  }

  const directRoadmap = directRoadmapFor(guideId);`;

if (!source.includes(anchor)) {
  throw new Error("Could not locate generated-guide auto-open anchor in app.js");
}

const replacement = `  if (guideLang && guideLang !== currentLang) {
    currentLang = guideLang;
    localStorage.setItem("holaPapersLang", currentLang);
    applyTranslations();
  }

  // ${MARKER}: action-first direct guides are already fully rendered by the build.
  // Keep that DOM intact instead of replacing it with the legacy roadmap template.
  const bakedActionFirstPage = document.querySelector("[data-iberigo-action-first]");
  if (bakedActionFirstPage) {
    currentDirectRoute = guideId;
    currentEntryPreset = sectionPresetForGuide(guideId) || currentEntryPreset;
    showDirectGuide();
    result.hidden = false;
    result.classList.remove("is-empty");
    setCurrentScreenState({
      type: "direct-guide",
      entryPreset: currentEntryPreset,
      directRoute: guideId
    });
    return;
  }

  const directRoadmap = directRoadmapFor(guideId);`;

source = source.replace(anchor, replacement);
fs.writeFileSync(APP, source, "utf8");
console.log("Action-first client runtime patched: baked direct-guide DOM is preserved after JavaScript initializes.");
