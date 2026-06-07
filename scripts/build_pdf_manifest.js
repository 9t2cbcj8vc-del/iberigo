const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const cutoff = source.indexOf('wizard.addEventListener("change"');

if (cutoff === -1) {
  throw new Error("Could not find app bootstrap cutoff.");
}

function makeStubElement() {
  return {
    hidden: false,
    innerHTML: "",
    textContent: "",
    value: "",
    checked: false,
    dataset: {},
    style: {},
    classList: {
      add() {},
      remove() {}
    },
    querySelector() {
      return makeStubElement();
    },
    querySelectorAll() {
      return [];
    },
    closest() {
      return makeStubElement();
    },
    addEventListener() {},
    scrollIntoView() {},
    setAttribute() {},
    appendChild() {}
  };
}

const context = {
  console,
  URLSearchParams,
  Set,
  Map,
  Date,
  window: {
    goatcounter: null,
    history: { replaceState() {} },
    location: { pathname: "/", hash: "", search: "" }
  },
  navigator: { clipboard: { writeText: async () => {} } },
  localStorage: {
    getItem() {
      return "en";
    },
    setItem() {}
  },
  document: {
    head: { append() {}, appendChild() {} },
    body: makeStubElement(),
    documentElement: { lang: "en" },
    createElement() {
      return makeStubElement();
    },
    querySelector() {
      return makeStubElement();
    },
    querySelectorAll() {
      return [];
    }
  }
};

vm.createContext(context);
vm.runInContext(
  `${source.slice(0, cutoff)}
globalThis.__pdfExports = {
  routes,
  routeFormsAndTaxes,
  formHelpers,
  setLang(lang) { currentLang = lang; },
  getRouteGuide(id) {
    const route = routes.find((item) => item.id === id);
    if (!route) return null;
    const roadmap = roadmapFor(route);
    return {
      id,
      type: "route",
      route,
      roadmap,
      disclaimer: resultDisclaimerFor(roadmap)
    };
  },
  getDirectGuide(id) {
    const roadmap = directRoadmapFor(id);
    if (!roadmap) return null;
    return {
      id,
      type: "direct",
      roadmap,
      disclaimer: resultDisclaimerFor(roadmap)
    };
  },
  getLinkHtml(linkTypes, excludedUrls) {
    return renderRouteLinks(linkTypes, new Set(excludedUrls || []));
  }
};`,
  context
);

const {
  routes,
  routeFormsAndTaxes,
  formHelpers,
  setLang,
  getRouteGuide,
  getDirectGuide,
  getLinkHtml
} = context.__pdfExports;

const directGuideIds = [
  "padron",
  "digital",
  "nie",
  "tie",
  "social-security",
  "sip-card",
  "ehic-card"
];

function parseLinks(html) {
  const links = [];
  const pattern = /<a href="([^"]+)" target="_blank" rel="noreferrer">([^<]+)<\/a>/g;
  let match = pattern.exec(html);
  while (match) {
    links.push({ url: match[1], label: match[2] });
    match = pattern.exec(html);
  }
  return links;
}

function routeExcludedUrls(routeId) {
  const details = routeFormsAndTaxes[routeId];
  if (!details) return [];
  return [...(details.forms || []), ...(details.taxes || [])]
    .map((row) => formHelpers[row[3]]?.officialUrl)
    .filter(Boolean);
}

function formsAndFees(routeId) {
  const details = routeFormsAndTaxes[routeId];
  if (!details) return [];
  return [...(details.forms || []), ...(details.taxes || [])].map(([code, description, kind, helperKey]) => ({
    code,
    description,
    kind,
    officialUrl: formHelpers[helperKey]?.officialUrl || ""
  }));
}

function normalizeGuide(raw, lang) {
  if (!raw) return null;
  const routeId = raw.route?.id;
  const links = parseLinks(getLinkHtml(raw.roadmap.links || [], routeId ? routeExcludedUrls(routeId) : []));
  return {
    id: raw.id,
    lang,
    process: raw.roadmap.process,
    explanation: raw.roadmap.explanation || raw.roadmap.timeline || raw.route?.summary || "",
    steps: raw.roadmap.steps || [],
    documents: raw.roadmap.documents || raw.route?.documents || [],
    formsAndFees: routeId ? formsAndFees(routeId) : [],
    links,
    disclaimer: raw.disclaimer || ""
  };
}

const manifest = { en: [], es: [] };

for (const lang of ["en", "es"]) {
  setLang(lang);
  for (const route of routes) {
    manifest[lang].push(normalizeGuide(getRouteGuide(route.id), lang));
  }
  for (const id of directGuideIds) {
    manifest[lang].push(normalizeGuide(getDirectGuide(id), lang));
  }
}

fs.writeFileSync(
  path.join(projectRoot, "downloads", "guide-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
