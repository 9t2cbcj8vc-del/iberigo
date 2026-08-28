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

const functionStart = source.indexOf(
  'function renderRoadmapCard(roadmap, guideId = roadmap?.route?.id || currentDirectRoute) {'
);
const functionEnd = source.indexOf("\nfunction renderVacationRoadmap", functionStart);
if (functionStart < 0 || functionEnd < 0) {
  throw new Error("Could not locate renderRoadmapCard in app.js");
}

let block = source.slice(functionStart, functionEnd);

const explanationLine = '  const explanation = roadmap.explanation || roadmap.timeline || "";\n';
if (!block.includes(explanationLine)) {
  throw new Error("renderRoadmapCard explanation anchor changed");
}
block = block.replace(
  explanationLine,
  explanationLine +
    `  // ${MARKER}: direct generated guides must retain their baked intro/action card after JS enhancement.\n` +
    '  const directGuideId = document.documentElement.dataset.guideId || "";\n' +
    '  const preserveDirectGuideShell = Boolean(directGuideId && guideId === directGuideId);\n' +
    '  const bakedGuideIntro = preserveDirectGuideShell\n' +
    '    ? result.querySelector("[data-crawler-guide-intro]")?.outerHTML || ""\n' +
    '    : "";\n' +
    '  const bakedActionFirst = preserveDirectGuideShell\n' +
    '    ? result.querySelector("[data-iberigo-action-first]")?.outerHTML || ""\n' +
    '    : "";\n' +
    '  const hasActionFirst = Boolean(bakedActionFirst);\n'
);

const renderAnchor =
  '    ${renderBackButton(roadmap.process)}\n' +
  '    ${renderResultIntro(roadmap, explanation, guideId)}';
if (!block.includes(renderAnchor)) {
  throw new Error("renderRoadmapCard template anchor changed");
}
block = block.replace(
  renderAnchor,
  '    ${renderBackButton(roadmap.process)}\n' +
    '    ${bakedGuideIntro}\n' +
    '    ${bakedActionFirst}\n' +
    '    ${renderResultIntro(roadmap, explanation, guideId)}'
);

const afterTemplate = '  `;\n  setCurrentScreenState(';
if (!block.includes(afterTemplate)) {
  throw new Error("renderRoadmapCard completion anchor changed");
}
block = block.replace(
  afterTemplate,
  '  `;\n' +
    '  if (hasActionFirst) {\n' +
    '    result.querySelectorAll(".result-section").forEach((section) => {\n' +
    '      if (\n' +
    '        section.querySelector(".roadmap-list") ||\n' +
    '        section.querySelector(".compact-fees") ||\n' +
    '        section.classList.contains("route-links-note")\n' +
    '      ) {\n' +
    '        section.remove();\n' +
    '      }\n' +
    '    });\n' +
    '  }\n' +
    '  setCurrentScreenState('
);

source = source.slice(0, functionStart) + block + source.slice(functionEnd);
fs.writeFileSync(APP, source, "utf8");
console.log("Action-first client runtime patched: direct guide intro/card preserved and duplicate filing blocks suppressed.");
