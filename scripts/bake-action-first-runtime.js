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

const bootstrapAnchor = `clearWizardSelections();
wizard.dataset.step = "person";
applyTranslations();
renderEmptyResult();
showOnlyTopicCards();
if (!openNavSectionIfRequested()) showNormalApp();`;

if (!source.includes(bootstrapAnchor)) {
  throw new Error("Could not locate initial app bootstrap in app.js");
}

const bootstrapReplacement = `// ${MARKER}: generated action-first guides already contain their visible guide DOM.
// Do not wipe #wizardResult with the homepage empty state before the direct-guide initializer runs.
const initialBakedActionFirst = document.querySelector("[data-iberigo-action-first]");
clearWizardSelections();
wizard.dataset.step = "person";
applyTranslations();
if (!initialBakedActionFirst) {
  renderEmptyResult();
  showOnlyTopicCards();
  if (!openNavSectionIfRequested()) showNormalApp();
}`;

source = source.replace(bootstrapAnchor, bootstrapReplacement);

const autoOpenAnchor = `  if (guideLang && guideLang !== currentLang) {
    currentLang = guideLang;
    localStorage.setItem("holaPapersLang", currentLang);
    applyTranslations();
  }

  const directRoadmap = directRoadmapFor(guideId);`;

if (!source.includes(autoOpenAnchor)) {
  throw new Error("Could not locate generated-guide auto-open anchor in app.js");
}

const autoOpenReplacement = `  if (guideLang && guideLang !== currentLang) {
    currentLang = guideLang;
    localStorage.setItem("holaPapersLang", currentLang);
    applyTranslations();
  }

  // The build-baked action-first guide is already the intended browser view.
  // Keep it intact instead of replacing it with the legacy roadmap template.
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

source = source.replace(autoOpenAnchor, autoOpenReplacement);
fs.writeFileSync(APP, source, "utf8");
console.log("Action-first client runtime patched: bootstrap and direct-guide rendering preserve baked guide DOM.");
