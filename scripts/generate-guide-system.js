const fs = require("fs");
const path = require("path");
const {
  GuideLayout,
  QuickAnswer,
  AtAGlance,
  GuideSection,
  ChecklistBox,
  TipBox,
  WarningBox,
  InfoBox,
  DocumentsChecklist,
  StepTimeline,
  CommonMistakes,
  RealQuestions,
  Cards
} = require("./guide-components");
const { SearchPage } = require("./search-components");

const root = path.resolve(__dirname, "..");
const reviewPlaceholder = "Content under editorial review.";

const routes = {
  startHere: "/start-here/",
  euRoadmap: "/moving-to-spain/eu-citizens/",
  settling: "/moving-to-spain/settling-into-spain/",
  euRegistration: "/moving-to-spain/eu-registration/",
  padron: "/moving-to-spain/registering-on-the-padron/",
  healthcare: "/moving-to-spain/healthcare/",
  checklist: "/moving-to-spain/documents-checklist/",
  banking: "/living-in-spain/opening-a-bank-account/",
  digital: "/living-in-spain/digital-certificate/",
  social: "/living-in-spain/social-security/",
  taxes: "/living-in-spain/taxes/",
  driving: "/living-in-spain/driving/",
  accommodation: "/moving-to-spain/finding-accommodation/",
  nonEuRoadmap: "/moving-to-spain/non-eu-citizens/",
  euFamilyMemberRoadmap: "/moving-to-spain/family-member-eu-citizen/",
  students: "/moving-to-spain/students/"
};

function writePage(route, html) {
  const file = path.join(root, route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function basicSkeleton({
  route,
  title,
  description,
  h1,
  intro,
  quick,
  glance,
  before,
  who,
  official,
  advice,
  documents,
  steps,
  mistakes,
  questions,
  next,
  warning,
  tip,
  breadcrumbParent
}) {
  return GuideLayout({
    path: route,
    canonical: `https://iberigo.eu${route}`,
    title,
    description,
    metadata: guideMetadataFor(route),
    breadcrumbs: [
      { label: breadcrumbParent || (route.startsWith("/living") ? "Living in Spain" : "Moving to Spain"), href: route.startsWith("/living") ? "/living-in-spain/opening-a-bank-account/" : "/moving-to-spain/documents-checklist/" },
      { label: h1 }
    ],
    hero: {
      kicker: "Core guide",
      title: h1,
      intro,
      asideTitle: "Draft skeleton",
      asideText: "This page is part of the reusable IberiGo guide system. Detailed sections will be completed during editorial review."
    },
    sections: [
      QuickAnswer(quick),
      AtAGlance(glance),
      GuideSection({ id: "beforeStart", title: "Before You Start", children: `${Cards(before)}${TipBox(tip)}` }),
      GuideSection({ id: "whoNeeds", title: "Who Needs This?", children: Cards(who) }),
      GuideSection({ id: "officialRequirements", title: "Official Requirements", children: `${Cards(official)}${WarningBox(warning)}` }),
      GuideSection({ id: "practicalAdvice", title: "Practical Advice", children: Cards(advice) }),
      documents ? DocumentsChecklist(documents) : "",
      GuideSection({ id: "stepProcess", title: "Step-by-Step Process", children: StepTimeline(steps) }),
      CommonMistakes(mistakes),
      RealQuestions(questions),
      GuideSection({ id: "whatHappensNext", title: "What Happens Next?", children: `<p>${next}</p>` })
    ].filter(Boolean)
  });
}

const guideSummaries = {
  [routes.euRoadmap]: {
    title: "EU Citizen Roadmap",
    label: "View the EU Citizen Roadmap",
    description: "Follow the usual order of moving steps for EU, EEA and Swiss citizens."
  },
  [routes.settling]: {
    title: "Settling Into Spain",
    label: "View the Settling Into Spain Guide",
    description: "Follow the main arrival steps after reaching Spain without relying on fixed timelines."
  },
  [routes.euRegistration]: {
    title: "EU Registration Certificate",
    label: "View the EU Registration Guide",
    description: "Prepare the EU Registration Certificate step for longer-term stays in Spain."
  },
  [routes.padron]: {
    title: "Padrón Guide",
    description: "Understand town hall address registration and the documents commonly requested."
  },
  [routes.healthcare]: {
    title: "Healthcare Guide",
    description: "Compare public healthcare, S1, work-based entitlement and private-cover routes."
  },
  [routes.checklist]: {
    title: "Documents Checklist",
    label: "View the Documents Checklist",
    description: "Organize the core paperwork folder before appointments and everyday setup."
  },
  [routes.banking]: {
    title: "Bank Account Guide",
    description: "Set up everyday banking, payments and account documents in Spain."
  },
  [routes.digital]: {
    title: "Digital Certificate Guide",
    description: "Set up FNMT digital certificate or Cl@ve access for online public services."
  },
  [routes.social]: {
    title: "Social Security Guide",
    description: "Understand Social Security numbers, work registration and related healthcare links."
  },
  [routes.taxes]: {
    title: "Taxes Guide",
    description: "Review tax residence, tax address and first tax-administration questions."
  },
  [routes.driving]: {
    title: "Driving Guide",
    description: "Check driving licence and resident-driver rules after moving to Spain."
  },
  [routes.accommodation]: {
    title: "Accommodation Guide",
    description: "Plan housing evidence, rentals and the address documents that later steps may need."
  },
  [routes.nonEuRoadmap]: {
    title: "Non-EU Citizen Roadmap",
    label: "View the Non-EU Citizen Roadmap",
    description: "Understand the main non-EU residence routes and what to check before relying on any single process."
  },
  [routes.euFamilyMemberRoadmap]: {
    title: "Family Member of an EU Citizen Roadmap",
    label: "View the Family Member of an EU Citizen Roadmap",
    description: "Understand the broad journey for non-EU family members of EU citizens moving to or living in Spain."
  },
  [routes.students]: {
    title: "Student Roadmap",
    label: "View the Student Roadmap",
    description: "Understand the broad student route for studying in Spain, for EU and non-EU students alike."
  }
};

function guideLink(route) {
  const summary = guideSummaries[route] || {};
  const title = summary.title || "IberiGo Guide";
  return {
    title,
    description: summary.description || "",
    label: summary.label || `View the ${title}`,
    href: route
  };
}

const commonRelatedRoutes = [routes.checklist, routes.healthcare, routes.banking];

const searchMetadataByRoute = {
  [routes.startHere]: {
    category: "Moving to Spain",
    difficulty: "Easy",
    estimatedTime: "3 min",
    appliesTo: ["People planning a move to Spain", "People choosing the right IberiGo guide"],
    keywords: ["start here", "moving to Spain", "EU citizen", "non-EU citizen", "student", "worker", "retiree", "family"]
  },
  [routes.euRoadmap]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["EU citizens moving to Spain", "EEA citizens moving to Spain", "Swiss citizens moving to Spain"],
    keywords: ["EU citizen", "EU registration", "moving to Spain", "roadmap", "padrón", "healthcare", "banking", "taxes"]
  },
  [routes.settling]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["People who have arrived in Spain", "People planning the order of arrival admin", "EU citizens checking practical next steps"],
    keywords: ["settling into Spain", "arrival steps", "padrón", "healthcare", "EU registration", "bank account", "digital certificate", "Cl@ve"]
  },
  [routes.euRegistration]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "10 min",
    appliesTo: ["EU citizens staying longer than 3 months", "EEA citizens staying longer than 3 months", "Swiss citizens staying longer than 3 months"],
    keywords: ["EU registration", "EU Registration Certificate", "EX-18", "Modelo 790-012", "NIE", "padrón"]
  },
  [routes.padron]: {
    category: "Moving to Spain",
    difficulty: "Easy",
    estimatedTime: "9 min",
    appliesTo: ["People living at a Spanish address", "People preparing local address registration"],
    keywords: ["padrón", "empadronamiento", "town hall", "address registration", "municipal registration"]
  },
  [routes.healthcare]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "14 min",
    appliesTo: ["EU citizens working in Spain", "EU citizens studying in Spain", "EU retirees", "EU citizens living from savings"],
    keywords: ["healthcare", "public healthcare", "S1", "SIP card", "health card", "private insurance", "EU registration"]
  },
  [routes.checklist]: {
    category: "Moving to Spain",
    difficulty: "Easy",
    estimatedTime: "8 min",
    appliesTo: ["People preparing documents before moving to Spain", "People organizing route evidence"],
    keywords: ["documents", "checklist", "passport", "apostille", "translation", "moving documents"]
  },
  [routes.banking]: {
    category: "Living in Spain",
    difficulty: "Easy",
    estimatedTime: "9 min",
    appliesTo: ["People opening a Spanish bank account", "People setting up payments in Spain"],
    keywords: ["bank", "banking", "bank account", "IBAN", "fees", "payments", "Spanish bank"]
  },
  [routes.digital]: {
    category: "Living in Spain",
    difficulty: "Moderate",
    estimatedTime: "10 min",
    appliesTo: ["People who need online public-service access", "People applying for a digital certificate or Cl@ve"],
    keywords: ["digital certificate", "Cl@ve", "FNMT", "online services", "digital access"]
  },
  [routes.social]: {
    category: "Living in Spain",
    difficulty: "Moderate",
    estimatedTime: "9 min",
    appliesTo: ["People working in Spain", "People who need a Social Security number"],
    keywords: ["Social Security", "NUSS", "NAF", "work registration", "healthcare entitlement"]
  },
  [routes.taxes]: {
    category: "Living in Spain",
    difficulty: "Hard",
    estimatedTime: "11 min",
    appliesTo: ["People living in Spain", "People with income or assets to review before moving"],
    keywords: ["taxes", "tax residency", "domicilio fiscal", "Agencia Tributaria", "income tax"]
  },
  [routes.driving]: {
    category: "Living in Spain",
    difficulty: "Moderate",
    estimatedTime: "8 min",
    appliesTo: ["People driving in Spain", "People checking licence rules after moving"],
    keywords: ["driving", "driving licence", "licence exchange", "DGT", "resident driver"]
  },
  [routes.accommodation]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "10 min",
    appliesTo: ["People looking for accommodation in Spain", "People preparing address evidence"],
    keywords: ["accommodation", "renting", "rental", "housing", "address", "padrón"]
  },
  [routes.nonEuRoadmap]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["Non-EU citizens planning to move to Spain", "People moving for work, study, family or retirement", "Digital nomads and self-employed people considering Spain"],
    keywords: ["non-EU citizen", "visa", "residence authorisation", "TIE", "NIE", "moving to Spain", "family member of an EU citizen"]
  },
  [routes.euFamilyMemberRoadmap]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "11 min",
    appliesTo: ["Non-EU spouses of EU citizens", "Registered partners of EU citizens, where recognised", "Children and dependent relatives of EU citizens", "EU citizens bringing or joining family in Spain"],
    keywords: ["family member of an EU citizen", "residence card", "spouse visa", "TIE", "NIE", "EU Registration", "family reunification"]
  },
  [routes.students]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "11 min",
    appliesTo: ["Non-EU students planning to study in Spain", "EU students planning to study in Spain", "Exchange, university, language and vocational students"],
    keywords: ["student visa", "study in Spain", "TIE", "EU Registration", "student residence", "university", "language school"]
  }
};

const relatedRoutesByRoute = {
  [routes.startHere]: [routes.euRoadmap, routes.euRegistration, routes.padron, routes.healthcare],
  [routes.settling]: [routes.healthcare, routes.euRegistration, routes.banking, routes.digital],
  [routes.padron]: [routes.accommodation, routes.healthcare, routes.euRegistration],
  [routes.healthcare]: [routes.social, routes.euRoadmap, routes.checklist],
  [routes.checklist]: [routes.padron, routes.healthcare, routes.euRegistration],
  [routes.banking]: [routes.digital, routes.taxes, routes.accommodation, routes.padron],
  [routes.digital]: [routes.social, routes.taxes, routes.banking, routes.checklist],
  [routes.social]: [routes.healthcare, routes.banking, routes.taxes],
  [routes.taxes]: [routes.banking, routes.digital, routes.social],
  [routes.driving]: [routes.accommodation, routes.checklist, routes.taxes],
  [routes.accommodation]: [routes.padron, routes.banking, routes.healthcare],
  [routes.nonEuRoadmap]: [routes.checklist, routes.settling, routes.healthcare],
  [routes.euFamilyMemberRoadmap]: [routes.checklist, routes.padron, routes.healthcare],
  [routes.students]: [routes.checklist, routes.healthcare, routes.accommodation]
};

const officialSourcesByRoute = {
  [routes.euRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the citizen entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office. Appointment booking for foreigners' procedures is linked from here — confirm the specific EU-registration appointment path before publication." },
    { name: "Local Town Halls", varies: true, note: "No single official URL — padrón and local address requirements are set by each municipality. Link the reader's specific town hall page during editorial review." }
  ],
  [routes.euRegistration]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the citizen entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office. Appointment booking for EU registration certificate appointments is linked from here — confirm the specific appointment path before publication." }
  ],
  [routes.padron]: [
    { name: "Spanish Government", url: "https://www.ine.es", note: "Instituto Nacional de Estadística (INE) — national padrón municipal statistics and the Padrón Online portal." },
    { name: "Local Town Halls", varies: true, note: "No single official URL — padrón requirements and appointment systems are set by each municipality. Link the reader's specific town hall page during editorial review." }
  ],
  [routes.healthcare]: [
    { name: "Spanish Government", url: "https://www.sanidad.gob.es", note: "Ministerio de Sanidad — Spain's national health ministry." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Regional health services", varies: true, note: "No single official URL — health-card processes and names vary by autonomous community. Link the reader's specific regional health service during editorial review." },
    { name: "Social Security", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — official Social Security site. Note: could not be re-fetched for verification during this pass (site blocked automated requests), but this is the long-established canonical government domain." }
  ],
  [routes.taxes]: [
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration. Supports further checking of tax residency, filing and worldwide-income questions; it does not replace professional tax advice, and this guide is not tax advice." }
  ],
  [routes.social]: [
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — official Social Security site. Note: could not be re-fetched for verification during this pass (the site uses an automated bot-detection challenge), but this is the same long-established canonical government domain already used on the Healthcare guide." }
  ],
  [routes.driving]: [
    { name: "Dirección General de Tráfico (DGT)", url: "https://www.dgt.es", note: "DGT is Spain's traffic authority and the official place to check current driving-licence, exchange, renewal and medical-check rules referenced throughout this guide." }
  ],
  [routes.nonEuRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the citizen entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office. TIE-related appointment booking is linked from here — confirm the specific appointment path for your route before publication." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for visa applications handled through Spanish consulates abroad. Verified reachable this sprint (HTTP 200, page titled correctly)." }
  ],
  [routes.euFamilyMemberRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the citizen entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office. Family-member residence card appointment booking is linked from here — confirm the specific appointment path before publication." },
    { name: "EU official information for families", url: "https://europa.eu/youreurope/citizens/index_en.htm", note: "\"Your Europe\" — the EU's official citizen portal, titled \"Help and advice for EU nationals and their family.\" Verified reachable this sprint (HTTP 200, page titled correctly)." }
  ],
  [routes.students]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the citizen entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office. TIE-related appointment booking for students is linked from here — confirm the specific appointment path before publication." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for student visa applications handled through Spanish consulates abroad." },
    { name: "Ministry of Education", url: "https://www.educacionyfp.gob.es", note: "Ministerio de Educación, Formación Profesional y Deportes. Verified reachable this sprint (HTTP 200, redirects to educacionfpydeportes.gob.es, page titled correctly)." }
  ]
};

function guideMetadataFor(route) {
  const journeyRoutesByRoute = {
    [routes.startHere]: { next: routes.euRoadmap },
    [routes.euRoadmap]: { next: routes.checklist },
    [routes.settling]: { previous: routes.euRoadmap, next: routes.padron },
    [routes.checklist]: { previous: routes.euRoadmap, next: routes.accommodation },
    [routes.accommodation]: { previous: routes.checklist, next: routes.padron },
    [routes.padron]: { previous: routes.accommodation, next: routes.healthcare },
    [routes.healthcare]: { previous: routes.padron, next: routes.euRegistration },
    [routes.euRegistration]: { previous: routes.healthcare, next: routes.social },
    [routes.social]: { previous: routes.euRegistration, next: routes.banking },
    [routes.banking]: { previous: routes.social, next: routes.digital },
    [routes.digital]: { previous: routes.banking, next: routes.taxes },
    [routes.taxes]: { previous: routes.digital, next: routes.driving },
    [routes.driving]: { previous: routes.taxes }
  };
  const journeyRoutes = journeyRoutesByRoute[route] || {};

  return {
    ...(searchMetadataByRoute[route] || {}),
    status: "draft",
    lastReviewed: "June 2026",
    reviewedBy: "",
    officialSources: officialSourcesByRoute[route] || [],
    previousGuide: journeyRoutes.previous ? guideLink(journeyRoutes.previous) : null,
    nextGuide: journeyRoutes.next ? guideLink(journeyRoutes.next) : null,
    relatedGuides: (relatedRoutesByRoute[route] || commonRelatedRoutes).map(guideLink)
  };
}

function validateInternalLinks(pages) {
  const generatedRoutes = new Set(pages.map((page) => page.route));
  const knownInternalPaths = collectKnownInternalPaths(generatedRoutes);
  const warnings = [];
  const errors = [];
  for (const page of pages) {
    const metadata = frontmatterFromHtml(page.html);
    const status = metadata.status || "draft";
    const filePath = pageFilePath(page.route);
    const links = [...page.html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1]);
    for (const href of links) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = internalLinkTarget(href);
      if (!target.path || target.path === "/") continue;
      if (!internalPathExists(target.path, generatedRoutes)) {
        const item = {
          filePath,
          href,
          suggestion: suggestInternalLink(target.path, knownInternalPaths),
          status
        };
        if (status === "review" || status === "published") errors.push(item);
        else warnings.push(item);
      }
    }
  }

  if (warnings.length) {
    console.warn("Broken internal link warnings:");
    for (const warning of warnings) console.warn(formatBrokenLinkMessage(warning));
  }

  if (errors.length) {
    console.error("Broken internal links found on review/published pages:");
    for (const error of errors) console.error(formatBrokenLinkMessage(error));
    process.exitCode = 1;
    throw new Error("Broken internal link validation failed.");
  }
}

function internalLinkTarget(href) {
  const withoutHash = String(href).split("#")[0];
  const cleanPath = withoutHash.split("?")[0];
  return { path: cleanPath || "/" };
}

function internalPathExists(targetPath, generatedRoutes) {
  const routePath = targetPath.endsWith("/") ? targetPath : `${targetPath}/`;
  if (generatedRoutes.has(routePath)) return true;

  const existingFile = path.join(root, targetPath);
  const existingIndex = path.join(root, targetPath, "index.html");
  return fs.existsSync(existingFile) || fs.existsSync(existingIndex);
}

function collectKnownInternalPaths(generatedRoutes) {
  const paths = new Set(["/"]);
  for (const route of generatedRoutes) paths.add(route);

  const stack = [root];
  while (stack.length) {
    const directory = stack.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name === ".netlify" || entry.name === "node_modules") continue;
      const fullPath = path.join(directory, entry.name);
      const relativePath = path.relative(root, fullPath);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.name !== "index.html") continue;
      const route = `/${path.dirname(relativePath).replace(/\\/g, "/")}/`.replace("/./", "/");
      paths.add(route);
      paths.add(`/${relativePath.replace(/\\/g, "/")}`);
    }
  }

  return [...paths].sort();
}

function suggestInternalLink(targetPath, knownPaths) {
  let best = null;
  for (const candidate of knownPaths) {
    const distance = levenshteinDistance(targetPath, candidate);
    if (!best || distance < best.distance) best = { path: candidate, distance };
  }

  const threshold = Math.max(4, Math.ceil(targetPath.length * 0.35));
  return best && best.distance <= threshold ? best.path : "";
}

function levenshteinDistance(a = "", b = "") {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 0; i < a.length; i += 1) {
    const current = [i + 1];
    for (let j = 0; j < b.length; j += 1) {
      current[j + 1] = Math.min(
        current[j] + 1,
        previous[j + 1] + 1,
        previous[j] + (a[i] === b[j] ? 0 : 1)
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[b.length];
}

function formatBrokenLinkMessage({ filePath, href, suggestion, status }) {
  return `- ${filePath} [${status}]: ${href}${suggestion ? ` — suggested fix: ${suggestion}` : " — suggested fix: check the intended route"}`;
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function frontmatterFromHtml(html = "") {
  const match = String(html).match(/<script type="application\/json" class="guide-frontmatter">([\s\S]*?)<\/script>/);
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch {
    return {};
  }
}

function metaDescriptionFromHtml(html = "") {
  const match = String(html).match(/<meta name="description" content="([^"]*)"/);
  return match ? decodeEntities(match[1]) : "";
}

function titleFromHtml(html = "") {
  const match = String(html).match(/<title>([^<]*)<\/title>/);
  return match ? decodeEntities(match[1]).replace(/\s+—\s+IberiGo$/, "") : "";
}

function headingsFromHtml(html = "") {
  return [...String(html).matchAll(/<h2 id="[^"]+">([\s\S]*?)<\/h2>/g)]
    .map((match) => decodeEntities(stripHtml(match[1])))
    .filter(Boolean);
}

function buildSearchIndex(pages) {
  const index = pages
    .map((page) => {
      const metadata = frontmatterFromHtml(page.html);
      if (metadata.status !== "published") return null;

      return {
        title: metadata.title || titleFromHtml(page.html),
        description: metadata.description || metaDescriptionFromHtml(page.html),
        headings: headingsFromHtml(page.html),
        keywords: metadata.keywords || [],
        category: metadata.category || "",
        difficulty: metadata.difficulty || "",
        url: metadata.url || page.route
      };
    })
    .filter(Boolean);

  fs.writeFileSync(path.join(root, "search-index.json"), `${JSON.stringify(index, null, 2)}\n`);
  return index.length;
}

function pageFilePath(route) {
  return path.join(route, "index.html").replace(/^\//, "");
}

function isPresent(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return true;
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function isValidGuideLink(value) {
  return value === null || (value && typeof value === "object" && isPresent(value.label) && isPresent(value.title) && isPresent(value.description) && isPresent(value.href));
}

function validateGuideMetadata(pages) {
  const allowedStatuses = new Set(["draft", "review", "published"]);
  const requiredFields = [
    "title",
    "description",
    "status",
    "category",
    "lastReviewed",
    "difficulty",
    "estimatedTime",
    "appliesTo",
    "previousGuide",
    "nextGuide",
    "relatedGuides",
    "canonicalUrl"
  ];
  const messages = [];

  for (const page of pages) {
    const filePath = pageFilePath(page.route);
    const metadata = frontmatterFromHtml(page.html);

    for (const field of requiredFields) {
      const value = metadata[field];
      const allowsNull = field === "previousGuide" || field === "nextGuide";
      if (!isPresent(value) && !(allowsNull && value === null)) {
        messages.push({ type: "error", filePath, field, message: "missing field" });
      }
    }

    if (!allowedStatuses.has(metadata.status)) {
      messages.push({ type: "error", filePath, field: "status", message: `invalid value "${metadata.status || ""}"` });
    }

    if (metadata.canonicalUrl && !String(metadata.canonicalUrl).startsWith("https://iberigo.eu/")) {
      messages.push({ type: "error", filePath, field: "canonicalUrl", message: `invalid value "${metadata.canonicalUrl}"` });
    }

    if (!Array.isArray(metadata.appliesTo) || metadata.appliesTo.some((item) => !isPresent(item))) {
      messages.push({ type: "error", filePath, field: "appliesTo", message: "invalid value; expected a non-empty list" });
    }

    if (!Array.isArray(metadata.relatedGuides) || metadata.relatedGuides.length === 0) {
      messages.push({ type: "error", filePath, field: "relatedGuides", message: "invalid value; expected a non-empty list" });
    } else {
      metadata.relatedGuides.forEach((guide, index) => {
        if (!isValidGuideLink(guide)) {
          messages.push({ type: "error", filePath, field: `relatedGuides[${index}]`, message: "invalid value; expected title, description, label and href" });
        }
      });
    }

    if (!isValidGuideLink(metadata.previousGuide)) {
      messages.push({ type: "error", filePath, field: "previousGuide", message: "invalid value; expected null or { title, description, label, href }" });
    }

    if (!isValidGuideLink(metadata.nextGuide)) {
      messages.push({ type: "error", filePath, field: "nextGuide", message: "invalid value; expected null or { title, description, label, href }" });
    }

    if (metadata.status === "published" && page.html.includes(reviewPlaceholder)) {
      messages.push({ type: "error", filePath, field: "content", message: `published page contains "${reviewPlaceholder}"` });
    }
  }

  if (messages.length) {
    console.error("Guide metadata validation failed:");
    for (const item of messages) {
      console.error(`- ${item.filePath}: ${item.field} — ${item.message}`);
    }
    process.exitCode = 1;
    throw new Error("Guide metadata validation failed.");
  }

  console.log(`Validated metadata for ${pages.length} guide pages.`);
}

function SourceLinks(items = []) {
  return `<div class="guide-button-row">${items
    .map((item, index) => {
      const external = /^https?:\/\//.test(item.href);
      return `<a class="guide-button${index ? " guide-button--secondary" : ""}" href="${item.href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${item.label}</a>`;
    })
    .join("\n          ")}</div>`;
}

function StartHereCards(items = []) {
  return `<div class="guide-card-grid">${items
    .map((item) => `<article class="guide-info-card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
            <a class="guide-button${item.comingSoon ? " guide-button--secondary" : ""}" href="${item.href}"${item.comingSoon ? ' aria-disabled="true"' : ""}>${item.label}</a>
          </article>`)
    .join("\n          ")}</div>`;
}

function StartHereGuideCards(items = []) {
  return `<div class="guide-card-grid">${items
    .map((item) => `<article class="guide-info-card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
            <a class="guide-button guide-button--secondary" href="${item.href}">${item.label}</a>
          </article>`)
    .join("\n          ")}</div>`;
}

const pages = [
  {
    route: routes.startHere,
    html: GuideLayout({
      path: routes.startHere,
      canonical: `https://iberigo.eu${routes.startHere}`,
      title: "Start Here: Moving to Spain — IberiGo",
      description: "Find the right IberiGo guide for your move to Spain, whether you are an EU citizen, non-EU citizen, student, worker, retiree or joining family.",
      metadata: guideMetadataFor(routes.startHere),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Start Here" }],
      hero: {
        kicker: "Start here",
        title: "Moving to Spain starts here.",
        intro: "Choose the situation that sounds most like you, and we’ll point you to the guide that explains what to do next.",
        asideTitle: "Simple starting point",
        asideText: "You do not need to know the immigration terminology before choosing a path."
      },
      sections: [
        GuideSection({
          id: "chooseYourPath",
          title: "Choose your path",
          children: StartHereCards([
            { title: "I’m an EU citizen", text: "Start with the roadmap for EU, EEA and Swiss citizens moving to Spain.", href: routes.euRoadmap, label: "View the EU Citizen Roadmap" },
            { title: "I’m a non-EU citizen", text: "Start with the roadmap for non-EU citizens moving to Spain.", href: routes.nonEuRoadmap, label: "View the Non-EU Citizen Roadmap" },
            { title: "I’m joining family in Spain", text: "Start with the roadmap for family members of an EU citizen moving to Spain.", href: routes.euFamilyMemberRoadmap, label: "View the Family Member of an EU Citizen Roadmap" },
            { title: "I’m moving for work", text: "Work routes depend on employment, self-employment and authorization details.", href: "#", label: "Coming soon", comingSoon: true },
            { title: "I’m moving to study", text: "Start with the roadmap for students moving to Spain.", href: routes.students, label: "View the Student Roadmap" },
            { title: "I’m retiring in Spain", text: "Retirement planning can involve residence, healthcare and tax questions.", href: "#", label: "Coming soon", comingSoon: true },
            { title: "I’m self-employed", text: "Self-employment can affect residence, tax, Social Security and healthcare.", href: "#", label: "Coming soon", comingSoon: true }
          ])
        }),
        GuideSection({
          id: "mostPeopleStartHere",
          title: "Most people start here",
          children: StartHereGuideCards([
            { title: "Moving to Spain as an EU Citizen", text: "Follow the usual order of planning, arrival and settling-in steps.", href: routes.euRoadmap, label: "View the EU Citizen Roadmap" },
            { title: "EU Registration", text: "Understand the EU Registration Certificate route for longer-term stays.", href: routes.euRegistration, label: "View the EU Registration Guide" },
            { title: "Registering on the Padrón", text: "Learn how town hall address registration fits into the move.", href: routes.padron, label: "View the Padrón Guide" },
            { title: "Healthcare in Spain", text: "Compare the main healthcare routes before registration and daily-life setup.", href: routes.healthcare, label: "View the Healthcare Guide" }
          ])
        }),
        GuideSection({
          id: "howGuidesWork",
          title: "How IberiGo guides work",
          children: `${Cards([
            { title: "Planning", text: "Understand your route and the documents that may matter." },
            { title: "Arrival", text: "Handle address, healthcare and registration steps in a practical order." },
            { title: "Settling In", text: "Move into banking, digital access, taxes and everyday administration." }
          ])}${ChecklistBox({
            title: "Each guide explains",
            items: ["what the step is", "who needs it", "what to prepare", "what to do next"]
          })}`
        }),
        GuideSection({
          id: "notSure",
          title: "Not sure where to begin?",
          children: `<p>If you are unsure which route applies to you, start with the EU or non-EU path. Every guide explains who it applies to and points you to the next step.</p>`
        })
      ]
    })
  },
  {
    route: routes.euRoadmap,
    html: GuideLayout({
      path: routes.euRoadmap,
      canonical: `https://iberigo.eu${routes.euRoadmap}`,
      title: "Moving to Spain as an EU Citizen — IberiGo",
      description: "A practical roadmap for EU citizens moving to Spain, including planning, arrival, padrón, healthcare, EU registration, banking, taxes and everyday setup.",
      metadata: guideMetadataFor(routes.euRoadmap),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "EU Citizen Roadmap" }],
      hero: {
        kicker: "Start here",
        title: "Moving to Spain as an EU Citizen",
        intro: "A practical roadmap for EU, EEA and Swiss citizens moving to Spain. Follow the steps in this general order, then use the detailed guides when a step needs documents or local checks.",
        asideTitle: "Sequence, not deadlines",
        asideText: "Appointment availability can vary, and some steps may take longer in high-demand areas."
      },
      sections: [
        QuickAnswer("EU, EEA and Swiss citizens can move to Spain without a visa. If you are staying longer than three months, you normally need to register as an EU resident. The main journey usually includes accommodation, padrón, healthcare, EU registration and everyday setup. The exact order and requirements can vary depending on your situation and location."),
        AtAGlance([
          ["Visa required?", "No."],
          ["Staying longer than 3 months?", "EU registration is usually required."],
          ["Can you work?", "Yes."],
          ["TIE card?", "Normally no. EU citizens usually receive a Certificate of Registration."],
          ["Main dependency", "Your route: work, self-employment, study, retirement or sufficient resources."],
          ["Timing", "Appointment availability and requirements may vary by office and location."]
        ]),
        GuideSection({
          id: "openingNote",
          title: "Use this as a roadmap",
          children: `${InfoBox({ title: "The order matters more than the speed", text: "In some municipalities or provinces, appointments may be available quickly. In others, waiting times can be much longer. This roadmap helps you understand what to prepare and what usually comes next." })}`
        }),
        GuideSection({
          id: "whoNeeds",
          title: "Who this roadmap is for",
          children: `${Cards([
            { title: "EU citizens", text: "Use this if you are an EU citizen planning a longer stay in Spain." },
            { title: "EEA citizens", text: "EEA citizens usually follow the same broad route." },
            { title: "Swiss citizens", text: "Swiss citizens are commonly included in the EU citizen registration route." },
            { title: "Workers", text: "Employees should plan for work, Social Security, healthcare and residence registration steps." },
            { title: "Self-employed people", text: "Self-employed movers may need tax, activity and Social Security evidence." },
            { title: "Students", text: "Students may need study, healthcare and resources evidence." },
            { title: "Retirees", text: "Retirees may need pension, healthcare and resources evidence." },
            { title: "People living from savings or investments", text: "Self-sufficient movers may need resources and healthcare evidence." },
            { title: "People moving with family", text: "Family documents may matter, especially when civil status or dependants are relevant." }
          ])}${WarningBox("Non-EU family members follow a different process. This roadmap is for the EU, EEA or Swiss citizen journey.")}`
        }),
        GuideSection({
          id: "phaseOne",
          title: "Phase 1: Planning before you move",
          children: `${Cards([
            { title: "Confirm your route", text: "Working, self-employed, student, retired or self-sufficient routes can need different evidence." },
            { title: "Prepare your documents", text: "Start with identity, income, healthcare and civil status documents if relevant." },
            { title: "Research accommodation", text: "Check whether an address can support padrón registration before relying on it." },
            { title: "Understand healthcare needs", text: "Some routes may need healthcare proof before EU registration." }
          ])}${SourceLinks([
            { label: "View the EU Registration Guide", href: routes.euRegistration },
            { label: "View the Documents Checklist", href: routes.checklist },
            { label: "View the Finding Accommodation Guide", href: routes.accommodation },
            { label: "View the Healthcare Guide", href: routes.healthcare }
          ])}`
        }),
        GuideSection({
          id: "phaseTwo",
          title: "Phase 2: After arrival",
          children: `${Cards([
            { title: "Secure accommodation", text: "Your address can affect padrón, healthcare, banking and other local admin steps." },
            { title: "Register on the padrón", text: "The padrón is municipal address registration. Requirements may vary by town hall." },
            { title: "Arrange healthcare", text: "Healthcare may need to be arranged before EU registration for some routes." },
            { title: "Register as an EU resident", text: "If staying longer than three months, you normally need EU registration." }
          ])}${SourceLinks([
            { label: "View the Finding Accommodation Guide", href: routes.accommodation },
            { label: "View the Padrón Guide", href: routes.padron },
            { label: "View the Healthcare Guide", href: routes.healthcare },
            { label: "View the EU Registration Guide", href: routes.euRegistration }
          ])}${WarningBox("Do not treat these as fixed deadlines. Appointment availability can vary, and some steps may take longer in high-demand areas.")}`
        }),
        GuideSection({
          id: "phaseThree",
          title: "Phase 3: Everyday setup",
          children: `${Cards([
            { title: "Open a bank account", text: "A Spanish account can help with rent, utilities, salary and local payments." },
            { title: "Set up Digital Certificate or Cl@ve", text: "Digital access helps with tax, Social Security and many public services." },
            { title: "Check Social Security if working", text: "If you work in Spain, understand Social Security registration and active status." },
            { title: "Understand tax obligations", text: "Review tax residency and reporting questions early, especially if you have income or assets outside Spain." },
            { title: "Check driving licence rules", text: "Driving rules depend on where your licence was issued and whether you become resident." }
          ])}${SourceLinks([
            { label: "View the Bank Account Guide", href: routes.banking },
            { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
            { label: "View the Social Security Guide", href: routes.social },
            { label: "View the Taxes in Spain Guide", href: routes.taxes },
            { label: "View the Driving Licence Guide", href: routes.driving }
          ])}`
        }),
        CommonMistakes([
          "Assuming EU citizens need a TIE.",
          "Confusing NIE with EU registration.",
          "Leaving healthcare planning too late.",
          "Signing accommodation without checking whether it can support padrón registration.",
          "Assuming all provinces work the same way.",
          "Expecting all steps to finish quickly.",
          "Ignoring tax residency.",
          "Waiting until a deadline becomes urgent."
        ]),
        RealQuestions([
          { question: "Can EU citizens move to Spain without a visa?", answer: "Yes, EU, EEA and Swiss citizens can usually enter Spain without a visa. Longer stays still involve local administration and EU residence registration." },
          { question: "Do EU citizens need a TIE?", answer: "Normally no. EU citizens usually receive a green EU Registration Certificate. TIE cards are generally used by non-EU citizens." },
          { question: "Is NIE the same as EU registration?", answer: "No. NIE is an identification number. EU registration is the residence registration process for EU citizens staying longer than three months." },
          { question: "Do I need padrón before EU registration?", answer: "It may be requested locally and can be useful for other steps. Check the requirements for your appointment and municipality." },
          { question: "Do I need healthcare before registering?", answer: "It depends on your route. Students, retirees and self-sufficient applicants may need healthcare proof before EU registration." },
          { question: "Can I work before EU registration?", answer: "EU citizens can generally work in Spain, but employment, Social Security and residence registration steps still need to be handled correctly." },
          { question: "What if appointments are not available?", answer: "Appointment availability can vary by province. Keep preparing documents, check official channels and avoid booking the wrong process out of frustration." },
          { question: "What should I do first after arriving?", answer: "Secure accommodation and understand whether the address can support padrón registration. From there, arrange padrón, healthcare and EU registration according to your situation." }
        ]),
        GuideSection({
          id: "whatHappensNext",
          title: "Your Next Step",
          children: SourceLinks([
            { label: "View the Settling Into Spain Guide", href: routes.settling },
            { label: "View the Documents Checklist", href: routes.checklist },
            { label: "View the Finding Accommodation Guide", href: routes.accommodation },
            { label: "View the Padrón Guide", href: routes.padron },
            { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
            { label: "View the EU Registration Guide", href: routes.euRegistration }
          ])
        })
      ]
    })
  },
  {
    route: routes.settling,
    html: GuideLayout({
      path: routes.settling,
      canonical: `https://iberigo.eu${routes.settling}`,
      title: "Settling Into Spain: Your First Steps After Arrival — IberiGo",
      description: "A practical guide to the first steps after arriving in Spain, including accommodation, padrón, healthcare, registration, banking and digital access.",
      metadata: guideMetadataFor(routes.settling),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Settling Into Spain" }],
      hero: {
        kicker: "Arrival guide",
        title: "Settling Into Spain",
        intro: "A calm, practical guide to the first steps after you arrive in Spain. Follow the steps in order, but remember that appointment availability can vary by province and municipality.",
        asideTitle: "Sequence, not deadlines",
        asideText: "Use this guide to understand what usually comes before what, then check the detailed guide for each step."
      },
      sections: [
        QuickAnswer("After arriving in Spain, the practical sequence usually starts with accommodation and local address evidence, then padrón, healthcare, residence registration if applicable, banking, digital access, Social Security if working, tax review and driving checks. The exact order can shift depending on your situation and local appointment availability."),
        GuideSection({
          id: "timelinesVary",
          title: "Timelines vary",
          children: `<p>The order of these steps matters more than the speed. In some areas, appointments may be available quickly. In others, including high-demand municipalities, waiting times can be much longer. This guide explains what to do next without promising a fixed timeline.</p>`
        }),
        AtAGlance([
          ["Main purpose", "Understand the practical sequence after arrival."],
          ["Fixed timeline?", "No. Appointment availability can vary by province and municipality."],
          ["Core dependency", "Address evidence often affects padrón, healthcare, banking and other steps."],
          ["Who should use this?", "People who have arrived in Spain or are planning their arrival admin."]
        ]),
        GuideSection({
          id: "secureAccommodation",
          title: "Secure accommodation",
          children: `${Cards([
            { title: "Arrival", text: "Your address is often the foundation for later steps, even if your first accommodation is temporary." },
            { title: "Official requirements", text: "Requirements depend on the process using the address evidence. Town halls and other offices may ask for different proof." },
            { title: "Practical advice", text: "Before signing or paying, ask whether the address can support the paperwork you expect to need, especially padrón." }
          ])}${TipBox("Keep rental contracts, authorization letters, receipts and host details together so you can compare them with local instructions.")}`
        }),
        GuideSection({
          id: "registerPadron",
          title: "Register on the padrón",
          children: `${Cards([
            { title: "Registration", text: "The padrón is municipal address registration at the town hall for the place where you live." },
            { title: "Official requirements", text: "Documents vary by municipality and by housing situation. The town hall decides what evidence it accepts." },
            { title: "Practical advice", text: "Check your town hall process early because appointment availability and accepted documents can vary by municipality." }
          ])}<p>Use the <a href="${routes.padron}">Padrón Guide</a> when you are ready to prepare documents for this step.</p>`
        }),
        GuideSection({
          id: "arrangeHealthcare",
          title: "Arrange healthcare",
          children: `${Cards([
            { title: "Registration", text: "Healthcare should be understood before any process that asks you to prove cover or entitlement." },
            { title: "Official requirements", text: "Your route may depend on work, self-employment, an S1, student status, private insurance or another entitlement." },
            { title: "Practical advice", text: "Do not assume the same route applies to every newcomer. Healthcare evidence depends on your circumstances." }
          ])}<p>The <a href="${routes.healthcare}">Healthcare Guide</a> explains the main routes and common evidence questions.</p>`
        }),
        GuideSection({
          id: "registerEuResident",
          title: "Register as an EU resident, if applicable",
          children: `${Cards([
            { title: "Registration", text: "EU, EEA and Swiss citizens living in Spain longer term usually use the EU Registration Certificate route." },
            { title: "Official requirements", text: "Evidence depends on whether you work, are self-employed, study, retire or live from savings." },
            { title: "Practical advice", text: "Prepare healthcare, address and route evidence before the appointment, and check the exact appointment instructions for your province." }
          ])}<p>Use the <a href="${routes.euRegistration}">EU Registration Guide</a> if this route applies to you.</p>${WarningBox("EU citizens normally prepare for the EU Registration Certificate, not a TIE. Non-EU family members or other routes may follow different processes.")}`
        }),
        GuideSection({
          id: "openBankAccount",
          title: "Open a bank account",
          children: `${Cards([
            { title: "Everyday Setup", text: "A Spanish bank account can help with rent, utilities, salary, taxes and local payments." },
            { title: "Official requirements", text: "Banks generally need to identify customers, but accepted documents and account types can vary by bank and by your situation." },
            { title: "Practical advice", text: "Compare fees, document requests and whether the account fits a resident or non-resident situation." }
          ])}<p>The <a href="${routes.banking}">Bank Account Guide</a> explains what to compare before choosing an account.</p>`
        }),
        GuideSection({
          id: "digitalCertificateClave",
          title: "Set up Digital Certificate or Cl@ve",
          children: `${Cards([
            { title: "Everyday Setup", text: "Digital access helps you use tax, Social Security, municipal and other public-service portals online." },
            { title: "Official requirements", text: "The route you can use may depend on your identity documents, NIE and verification options." },
            { title: "Practical advice", text: "Set this up when your identity details are ready enough for the verification route you choose." }
          ])}<p>Use the <a href="${routes.digital}">Digital Certificate Guide</a> to compare FNMT digital certificate and Cl@ve options.</p>`
        }),
        GuideSection({
          id: "reviewSocialSecurity",
          title: "Review Social Security, if working",
          children: `${Cards([
            { title: "Everyday Setup", text: "If you work or become self-employed in Spain, Social Security registration may affect work, contributions and healthcare entitlement." },
            { title: "Official requirements", text: "Requirements depend on whether you are employed, self-employed or in another work-related situation." },
            { title: "Practical advice", text: "Separate getting a Social Security number from being correctly registered for work or contributions." }
          ])}<p>If work applies to you, review the <a href="${routes.social}">Social Security Guide</a> before assuming your employer, client or gestor has completed every step.</p>`
        }),
        GuideSection({
          id: "understandTax",
          title: "Understand tax obligations",
          children: `${Cards([
            { title: "Everyday Setup", text: "Tax questions can arise from residence, income, assets, work, self-employment or property." },
            { title: "Official requirements", text: "Tax obligations depend on your circumstances and can involve Spanish and non-Spanish income or assets." },
            { title: "Practical advice", text: "Review your tax position before deadlines or notices become urgent, especially if your situation crosses countries." }
          ])}<p>The <a href="${routes.taxes}">Taxes Guide</a> gives a plain-English starting point for tax residence, tax address and first checks.</p>`
        }),
        GuideSection({
          id: "checkDriving",
          title: "Check driving licence rules",
          children: `${Cards([
            { title: "Everyday Setup", text: "Driving rules depend on where your licence was issued and whether you are visiting or living in Spain." },
            { title: "Official requirements", text: "Licence validity, exchange or renewal questions can vary depending on your country of issue and residence position." },
            { title: "Practical advice", text: "Check the rules before relying on old assumptions from tourist visits or from another country." }
          ])}<p>Use the <a href="${routes.driving}">Driving Guide</a> to understand which licence questions to check next.</p>`
        }),
        CommonMistakes([
          "Treating the arrival steps as fixed deadlines instead of a sequence that depends on appointments and local rules.",
          "Signing accommodation without checking whether it can support padrón or later address evidence.",
          "Assuming healthcare evidence is the same for workers, retirees, students and self-funded residents.",
          "Booking the wrong residence appointment because the terminology is confusing.",
          "Leaving banking, digital access, tax and driving questions until another process is blocked."
        ]),
        RealQuestions([
          { question: "Should I do everything in this exact order?", answer: "Use this as a general sequence, but adapt it to your situation and local appointment availability. Some preparation can happen in parallel." },
          { question: "Can I register on the padrón with temporary accommodation?", answer: "It depends on the municipality and the evidence you have. Check the town hall instructions before assuming the address will be accepted." },
          { question: "Do I need healthcare before EU registration?", answer: "It depends on your EU registration route. If you are not working, healthcare evidence may be an important part of the registration file." },
          { question: "Is this only for EU citizens?", answer: "No. Many arrival steps apply broadly, but EU registration is only relevant if that route applies to you." }
        ])
      ]
    })
  },
  {
    route: routes.euRegistration,
    html: GuideLayout({
      path: routes.euRegistration,
      canonical: `https://iberigo.eu${routes.euRegistration}`,
      title: "EU Registration in Spain — IberiGo",
      description: "A practical guide to registering as an EU citizen in Spain, including who needs it, documents, healthcare proof, common mistakes and what happens after registration.",
      metadata: guideMetadataFor(routes.euRegistration),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "EU Registration Certificate" }],
      hero: {
        kicker: "EU citizen registration",
        title: "EU Registration in Spain",
        intro: "A practical guide to registering as an EU, EEA or Swiss citizen in Spain, preparing the right evidence, and avoiding confusion with NIE, TIE and padrón.",
        asideTitle: "Not a TIE",
        asideText: "EU citizens usually receive a green EU Registration Certificate. TIE cards are generally used by non-EU citizens."
      },
      sections: [
        QuickAnswer("EU, EEA and Swiss citizens can enter Spain without a visa. If you are staying longer than three months, you normally need to register as an EU resident. The result is usually the EU Registration Certificate, which includes a NIE. It is not the same as a TIE."),
        AtAGlance([
          ["Who it is for", "EU, EEA and Swiss citizens staying in Spain longer than three months."],
          ["Usual result", "A green EU Registration Certificate that includes a NIE."],
          ["Not a TIE", "TIE cards are generally used by non-EU citizens."],
          ["Common form", "EX-18."],
          ["Evidence", "Depends on whether you work, are self-employed, study, retire or live from sufficient resources."]
        ]),
        GuideSection({
          id: "whoNeedsEuRegistration",
          title: "Who needs EU registration?",
          children: `${Cards([
            { title: "EU citizens staying longer than three months", text: "If you live in Spain beyond a short stay, EU registration is normally the residence registration route to understand." },
            { title: "EEA citizens", text: "EEA citizens usually follow the same general registration route." },
            { title: "Swiss citizens", text: "Swiss citizens are commonly included in this registration framework." },
            { title: "Workers", text: "Employees may need work evidence and related registration documents." },
            { title: "Self-employed people", text: "Self-employed applicants may need evidence of activity, tax or Social Security setup." },
            { title: "Students", text: "Students may need study evidence, healthcare proof and resources evidence depending on the appointment." },
            { title: "Retirees", text: "Retirees may need pension or sufficient resources evidence and healthcare proof." },
            { title: "People living from savings or investments", text: "Self-sufficient applicants may need resources evidence and suitable healthcare cover." }
          ])}${InfoBox({ title: "Short stays", text: "Short stays under three months usually follow different rules. This guide focuses on residence registration for longer stays." })}`
        }),
        GuideSection({
          id: "nieEuRegistrationTie",
          title: "NIE vs EU Registration vs TIE",
          children: `<table class="guide-table"><tbody>
            <tr><th>NIE</th><td>Identification number used for tax and administrative purposes. It is not automatically proof of residence by itself.</td></tr>
            <tr><th>EU Registration Certificate</th><td>Residence registration for EU citizens. It is usually a green certificate and includes a NIE.</td></tr>
            <tr><th>TIE</th><td>Physical residence card generally used by non-EU citizens. It is not normally the document EU citizens apply for.</td></tr>
          </tbody></table>${WarningBox("Do not describe EU registration simply as getting a NIE. The NIE is an identification number; EU registration is the residence registration process for EU citizens staying longer than three months.")}`
        }),
        GuideSection({
          id: "mainRoutesToQualify",
          title: "Main routes to qualify",
          children: Cards([
            { title: "Working in Spain", text: "You may be asked for an employment contract, employer evidence, work registration or related documents." },
            { title: "Self-employed in Spain", text: "You may be asked for self-employment, tax, activity or Social Security evidence." },
            { title: "Studying", text: "You may be asked for enrolment evidence, healthcare proof and resources evidence." },
            { title: "Retired", text: "You may be asked for pension evidence, healthcare proof such as S1 or suitable insurance, and resources evidence." },
            { title: "Sufficient resources", text: "You may be asked for proof of funds or income and suitable healthcare cover." }
          ])
        }),
        GuideSection({
          id: "documentsChecklist",
          title: "Documents you may need",
          children: `${ChecklistBox({
            title: "Documents to prepare",
            items: [
              "Passport or national ID",
              "Completed EX-18 form",
              "Proof of appointment",
              "Paid Modelo 790-012 fee",
              "Proof of work, self-employment, studies, pension or sufficient resources",
              "Healthcare proof, if required for your route",
              "Padrón certificate, if requested locally",
              "Copies of documents"
            ]
          })}${InfoBox({ title: "Requirements vary", text: "Exact requirements can vary by office and personal situation. Check the requirements for your appointment before attending." })}`
        }),
        GuideSection({
          id: "healthcareBeforeRegistration",
          title: "Healthcare before EU registration",
          children: `${Cards([
            { title: "Why it matters", text: "Some EU citizens may need to show healthcare cover as part of the EU registration file." },
            { title: "Students", text: "Students may need healthcare proof depending on their route and appointment requirements." },
            { title: "Retirees", text: "Retirees may need S1 evidence, private insurance or another accepted healthcare route." },
            { title: "Sufficient resources", text: "People applying with sufficient resources may need suitable healthcare cover before the appointment." }
          ])}<p>Use the <a href="${routes.healthcare}">Healthcare in Spain Guide</a> to compare healthcare routes before attending the EU registration appointment.</p>${WarningBox("Healthcare planning may need to happen before your EU registration appointment if your route is not based on employment in Spain.")}`
        }),
        GuideSection({
          id: "appointmentAndFee",
          title: "Appointment and fee",
          children: `${Cards([
            { title: "Appointment availability", text: "Appointment availability varies by province and can change over time." },
            { title: "Correct appointment type", text: "Make sure you book the EU citizen registration appointment, not a non-EU TIE appointment." },
            { title: "Fee payment", text: "The official fee is usually paid before the appointment using the relevant fee form." },
            { title: "Fee amount", text: "The fee amount can change, so check the current form and instructions before paying." }
          ])}${WarningBox("Do not rely on an old screenshot or forum post for the fee or appointment label. Check the current official instructions before paying or booking.")}`
        }),
        GuideSection({
          id: "processOverview",
          title: "Process overview",
          children: StepTimeline([
            { title: "Confirm your route", text: "Work, self-employment, study, retirement or sufficient resources can lead to different evidence." },
            { title: "Check the appointment requirements", text: "Review the province or office instructions before collecting documents." },
            { title: "Prepare forms and evidence", text: "Prepare identity, EX-18, fee proof, route evidence, healthcare proof if needed and copies." },
            { title: "Attend the appointment", text: "Bring the documents requested for your appointment and answer based on your actual situation." },
            { title: "Keep the certificate safe", text: "The green EU Registration Certificate can be useful for banking, healthcare, work, tax and other administration." }
          ])
        }),
        CommonMistakes([
          "Booking the wrong appointment type.",
          "Confusing EU Registration with TIE.",
          "Thinking NIE alone always means residence registration is complete.",
          "Arriving without healthcare proof when required.",
          "Bringing incomplete documents.",
          "Assuming all provinces ask for exactly the same documents.",
          "Leaving the appointment too late.",
          "Not keeping copies."
        ]),
        RealQuestions([
          { question: "Is EU Registration the same as NIE?", answer: "No. NIE is an identification number. EU Registration is the residence registration process for EU citizens staying longer than three months, and the certificate usually includes a NIE." },
          { question: "Do EU citizens get a TIE?", answer: "Normally no. EU citizens usually receive a green EU Registration Certificate. TIE cards are generally used by non-EU citizens." },
          { question: "Do I need padrón first?", answer: "It may be requested locally, depending on the office and appointment requirements. Check before attending." },
          { question: "Do I need private health insurance?", answer: "It depends on your route. Workers may use work-related evidence, while students, retirees or self-sufficient applicants may need healthcare proof such as S1 or suitable insurance." },
          { question: "Can I work before registering?", answer: "EU citizens can generally enter Spain without a visa, but work, Social Security and registration steps should be handled correctly. Check your employment and registration obligations." },
          { question: "What if there are no appointments?", answer: "Appointment availability can vary by province. Keep checking official channels and avoid booking the wrong process out of frustration." },
          { question: "What happens after I receive the certificate?", answer: "Keep it safe. You may need it for banking, healthcare, employment, tax, digital access and other administration." },
          { question: "Is the green certificate a card?", answer: "It is commonly a green certificate rather than a photo ID card. It is not the same as a TIE." }
        ]),
        GuideSection({
          id: "whatHappensNext",
          title: "Your Next Step",
          children: `${SourceLinks([
            { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
            { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
            { label: "View the Padrón Guide", href: routes.padron },
            { label: "View the Opening a Bank Account Guide", href: routes.banking },
            { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
            { label: "View the Taxes in Spain Guide", href: routes.taxes },
            { label: "View the Settling Into Spain Guide", href: routes.settling }
          ])}${TipBox("Keep your EU Registration Certificate with your identity, padrón, healthcare, work, banking and tax documents.")}`
        })
      ]
    })
  }
];

pages.push({
  route: routes.padron,
  html: GuideLayout({
    path: routes.padron,
    canonical: `https://iberigo.eu${routes.padron}`,
    title: "Registering on the Padrón in Spain — IberiGo",
    description: "A practical guide to registering on the padrón in Spain, including what it is, why it matters, documents you may need, municipality differences and common mistakes.",
    metadata: guideMetadataFor(routes.padron),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Padrón" }],
    hero: {
      kicker: "Municipal registration",
      title: "Registering on the Padrón in Spain",
      intro: "A practical guide to registering your address with the local town hall, understanding why the padrón matters, and preparing for municipality-specific requirements.",
      asideTitle: "Local rules matter",
      asideText: "The padrón is managed by each municipality. Documents, appointments and accepted address evidence may vary by town hall."
    },
    sections: [
      QuickAnswer("The padrón is the municipal register showing where you live in Spain. It is handled by the local town hall, known as the ayuntamiento. It may be needed for healthcare, residency procedures, schools, local services and other administration. Requirements vary by municipality, so check your local town hall before relying on another person's document list."),
      AtAGlance([
        ["What it is", "Municipal address registration showing where you live."],
        ["Who handles it", "The local ayuntamiento for your municipality."],
        ["Why it matters", "It may support healthcare, residence procedures, schools, local services and address evidence."],
        ["Local variation", "Documents and appointment systems may vary by town hall."],
        ["Not residency", "It records your local address; it does not grant immigration status."]
      ]),
      GuideSection({
        id: "whoNeedsIt",
        title: "Who needs it?",
        children: `${Cards([
          { title: "EU citizens", text: "EU citizens often need padrón evidence for later local or residence-related steps, depending on the procedure." },
          { title: "Non-EU residents", text: "Non-EU residents may need it for TIE, residence or local administrative procedures, depending on the route." },
          { title: "Families", text: "Families may need address evidence for school, healthcare or local services." },
          { title: "Workers", text: "Workers may need local address evidence for healthcare, employer paperwork or other administration." },
          { title: "Retirees", text: "Retirees may need it for healthcare registration or local services." },
          { title: "Students", text: "Students may need it for local registration, residence-related steps or services." },
          { title: "Anyone living in Spain", text: "Anyone living in Spain and needing local administrative access may be asked for padrón evidence." }
        ])}${InfoBox({ title: "Not a permission to live in Spain", text: "The padrón records where you live locally. It is separate from immigration residence permission or EU residence registration." })}`
      }),
      GuideSection({
        id: "whyPadronMatters",
        title: "Why the padrón matters",
        children: Cards([
          { title: "Healthcare", text: "Regional health services may ask for padrón evidence when you register locally, depending on your healthcare route." },
          { title: "EU registration", text: "EU Registration Certificate appointments may ask for address evidence or a padrón certificate, depending on the office." },
          { title: "TIE and residence procedures", text: "Some TIE or residence-related procedures may ask for local address evidence." },
          { title: "Schools", text: "School registration or local education processes may depend on your registered address." },
          { title: "Local services", text: "Town halls and local services may use the padrón to confirm where you live." },
          { title: "Official address", text: "The padrón can help show your local address for administrative purposes." },
          { title: "Bank or admin processes", text: "Some banks or administrative processes may ask for address evidence, but padrón does not guarantee approval for every service." }
        ])
      }),
      GuideSection({
        id: "documentsTownHallsMayAskFor",
        title: "Documents town halls may ask for",
        children: `${ChecklistBox({
          title: "Common documents to prepare",
          items: [
            "Passport or national ID",
            "NIE, if available",
            "Rental contract",
            "Property deed, if owner",
            "Landlord authorisation, if applicable",
            "ID copy from the landlord or person authorising registration, if applicable",
            "Utility bill, if requested",
            "Appointment confirmation, if required"
          ]
        })}${WarningBox("Exact requirements vary by municipality. Check your local ayuntamiento before the appointment.")}`
      }),
      GuideSection({
        id: "beforeSigningRental",
        title: "Before signing a rental contract",
        children: `${WarningBox("Before signing or paying a deposit, ask whether the address can be used for padrón registration and whether the landlord will provide the documents your town hall may request.")}${Cards([
          { title: "Ask before paying", text: "Do this before you pay a deposit or commit to a long-term rental." },
          { title: "Get it in writing", text: "Ask the landlord or agency to confirm what they can provide for padrón registration." },
          { title: "Check the town hall", text: "If you are unsure, ask your local ayuntamiento what evidence they accept for that housing situation." }
        ])}`
      }),
      GuideSection({
        id: "appointmentAvailability",
        title: "Appointment availability",
        children: `${Cards([
          { title: "Some town halls are fast", text: "Some municipalities may offer quick appointments or straightforward local filing." },
          { title: "Some have long waits", text: "Other town halls may have long waiting times, especially in high-demand areas." },
          { title: "It is not your fault", text: "Long waits or limited appointment slots do not mean you are doing anything wrong." },
          { title: "Check local channels", text: "Use your town hall's current appointment system or contact channel, because availability can change." }
        ])}${InfoBox({ title: "No fixed timeline", text: "Appointment availability can vary by municipality. Do not rely on exact timelines unless they are locally verified." })}`
      }),
      GuideSection({
        id: "processOverview",
        title: "Process overview",
        children: StepTimeline([
          { title: "Find the correct ayuntamiento", text: "Use the municipality where you actually live." },
          { title: "Check local requirements", text: "Confirm appointment rules, forms and accepted address documents with the town hall." },
          { title: "Prepare identity and address evidence", text: "Bring originals, copies and authorisations if your town hall asks for them." },
          { title: "Attend or submit locally", text: "The town hall checks whether your documents support registration at that address." },
          { title: "Request proof", text: "Ask how to obtain a certificado de empadronamiento, volante or other confirmation." },
          { title: "Keep it safe", text: "Other offices may ask for a recent copy, so keep your records organised." }
        ])
      }),
      CommonMistakes([
        "Assuming every rental allows padrón.",
        "Signing before asking about padrón documents.",
        "Bringing incomplete documents.",
        "Assuming requirements are the same everywhere.",
        "Relying only on screenshots.",
        "Not keeping copies.",
        "Confusing padrón with residency.",
        "Waiting until another procedure is urgent."
      ]),
      RealQuestions([
        { question: "Is the padrón the same as residency?", answer: "No. The padrón records your local address. Residency or residence registration is a separate process." },
        { question: "Can I register with temporary accommodation?", answer: "It depends on your municipality, your actual housing situation and the documents the accommodation can provide. Ask the town hall before relying on it." },
        { question: "Can a landlord refuse to help with padrón?", answer: "The practical issue is whether the landlord will provide the documents your town hall may request. Ask before signing and keep written confirmation." },
        { question: "Do I need a NIE first?", answer: "Not always. Some town halls may accept a passport or national ID, while others may ask for a NIE if you have one. Check locally." },
        { question: "Can I use padrón for healthcare?", answer: "It may be part of local healthcare registration, but it does not by itself guarantee healthcare access. Your healthcare route still matters." },
        { question: "Why does my town hall ask for different documents?", answer: "Padrón is handled locally, so document requirements may vary by municipality and housing situation." },
        { question: "What if there are no appointments?", answer: "Keep checking your local ayuntamiento's appointment system or contact channel. Appointment availability can vary, especially in high-demand areas." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation }
        ])}${TipBox("Keep your padrón proof with your identity, housing, healthcare and residence documents. Some offices may ask for a recent copy.")}`
      })
    ]
  })
});

pages.push({
  route: routes.healthcare,
  html: GuideLayout({
    path: routes.healthcare,
    canonical: `https://iberigo.eu${routes.healthcare}`,
    title: "Healthcare in Spain for New Residents — IberiGo",
    description: "A practical guide to healthcare in Spain for new residents, including public healthcare, private insurance, S1 forms, regional health cards and common mistakes.",
    metadata: guideMetadataFor(routes.healthcare),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Healthcare" }],
    hero: {
      kicker: "Healthcare routes",
      title: "Healthcare in Spain for New Residents",
      intro: "A practical guide to understanding public healthcare, private insurance, S1 forms and regional health cards before and after moving to Spain.",
      asideTitle: "No single answer",
      asideText: "Healthcare access can depend on work status, Social Security, pension rights, S1 entitlement, private insurance, region, residence route and family status."
    },
    sections: [
      QuickAnswer("Spain has a public healthcare system and private healthcare options. Access to public healthcare depends on your situation. Workers are often connected through Social Security. Some pensioners may use an S1 form. Some residents need private health insurance, especially for certain immigration or self-sufficient routes. Healthcare rules and regional health card procedures can vary by autonomous community."),
      AtAGlance([
        ["Public healthcare", "May be available through work, Social Security, pension rights, family status or another recognised route."],
        ["Private insurance", "May be useful or required depending on your residence route."],
        ["S1 form", "May apply to some pensioners or people covered by another EU/EEA country."],
        ["Health card", "Usually issued by the regional health service, not by immigration offices."],
        ["Regional variation", "Documents and health-card procedures can vary by autonomous community."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens", text: "Use this if your healthcare evidence may affect EU registration or local setup." },
          { title: "Non-EU residents", text: "Use this if your residence route may require healthcare cover or proof." },
          { title: "Workers", text: "Use this if employment and Social Security may connect you to public healthcare." },
          { title: "Self-employed people", text: "Use this if Social Security contributions and tax setup may affect your healthcare route." },
          { title: "Retirees", text: "Use this if pension status, S1 entitlement or private cover may apply." },
          { title: "Students", text: "Use this if you need to compare student cover, public entitlement and private insurance." },
          { title: "Family members", text: "Use this if your route may depend on family status or another person's entitlement." },
          { title: "Residence applicants", text: "Use this if you need healthcare evidence for an immigration or registration procedure." },
          { title: "People comparing options", text: "Use this if you are deciding between public healthcare and private insurance." }
        ])
      }),
      GuideSection({
        id: "publicHealthcare",
        title: "Public healthcare in Spain",
        children: `${Cards([
          { title: "Regional management", text: "Public healthcare is managed through regional health services in each autonomous community." },
          { title: "Eligibility routes", text: "Eligibility may come through employment, Social Security, pension rights, family status or other recognised routes." },
          { title: "Separate documents", text: "The regional health card is not the same as the NIE, padrón or Social Security number." },
          { title: "Regional procedures", text: "Health-card procedures and document requests can vary by autonomous community." }
        ])}${WarningBox("Do not assume public healthcare is automatic just because you live in Spain or have a padrón. Your recognised healthcare route still matters.")}`
      }),
      GuideSection({
        id: "privateInsurance",
        title: "Private health insurance",
        children: `${Cards([
          { title: "May be useful or required", text: "Private insurance may be useful or required depending on your residency route and whether you have a recognised public healthcare route." },
          { title: "Comprehensive cover", text: "Some immigration or residence procedures may require comprehensive health cover." },
          { title: "Policy details", text: "Coverage, exclusions, waiting periods and copayments can vary by policy." },
          { title: "Check the exact requirement", text: "Before buying, check whether the policy meets the requirement for your specific procedure." }
        ])}${WarningBox("Do not choose an insurer based only on price. Check the coverage, exclusions and whether the policy is suitable for the procedure using it.")}`
      }),
      GuideSection({
        id: "s1Form",
        title: "S1 form",
        children: `${Cards([
          { title: "Who it may help", text: "Some pensioners or people covered by another EU/EEA country may be able to use an S1 form." },
          { title: "What it does", text: "It can help register healthcare entitlement in Spain." },
          { title: "Eligibility", text: "Eligibility depends on the issuing country and your personal situation." },
          { title: "Where to check", text: "Check with the authority responsible for healthcare cover in your home or competent country." }
        ])}${InfoBox({ title: "S1 is not the same as EHIC", text: "An S1 is used for certain residence-linked healthcare entitlement situations. EHIC is generally for temporary stays." })}`
      }),
      GuideSection({
        id: "regionalHealthCard",
        title: "Regional health card",
        children: `${Cards([
          { title: "Issued regionally", text: "The health card is usually issued by the regional health service in your autonomous community." },
          { title: "Requirements vary", text: "Documents and steps can vary by autonomous community." },
          { title: "Common documents", text: "You may need padrón, identity documents, Social Security recognition, S1 registration or other proof." },
          { title: "Separate from residency", text: "The health card is separate from immigration residency, NIE, padrón and Social Security number." }
        ])}${ChecklistBox({
          title: "Documents you may need",
          items: [
            "Passport, national ID or residence document",
            "NIE, if available",
            "Padrón certificate, where required",
            "Social Security recognition or registration, if applicable",
            "S1 registration, if applicable",
            "Regional health service form, if required"
          ]
        })}${TipBox("Check with your regional health service before the appointment so you know which documents they expect.")}`
      }),
      GuideSection({
        id: "healthcareBeforeEuRegistration",
        title: "Healthcare before EU registration",
        children: `${Cards([
          { title: "Why timing matters", text: "Some EU citizens may need to show healthcare cover before or during EU Registration Certificate steps." },
          { title: "Self-sufficient, retired or students", text: "People applying as self-sufficient, retired or students may need to prepare healthcare evidence before the appointment." },
          { title: "Workers", text: "Workers may use work-related Social Security evidence, depending on the appointment requirements." },
          { title: "Check before booking", text: "Review the exact appointment instructions before assuming which healthcare proof will be accepted." }
        ])}${WarningBox("Healthcare planning may need to happen before the EU registration appointment, especially if your route is not based on employment in Spain.")}`
      }),
      CommonMistakes([
        "Assuming padrón alone gives full healthcare access.",
        "Assuming NIE is the same as healthcare entitlement.",
        "Buying private insurance without checking residency requirements.",
        "Ignoring copayments or exclusions.",
        "Waiting until a medical issue is urgent.",
        "Not checking regional procedures.",
        "Confusing S1 with EHIC.",
        "Assuming tourist healthcare cover is enough for residence."
      ]),
      RealQuestions([
        { question: "Do I automatically get public healthcare if I move to Spain?", answer: "No. Public healthcare access depends on your recognised route, such as work, Social Security, pension rights, family status or another entitlement." },
        { question: "Is private health insurance required?", answer: "Sometimes. It depends on your residency route and whether you have another accepted healthcare route." },
        { question: "Is padrón enough to get healthcare?", answer: "Usually not by itself. Padrón may be part of local registration, but healthcare entitlement depends on your situation." },
        { question: "What is an S1 form?", answer: "An S1 is a form that may allow certain people, often pensioners or people covered by another EU/EEA country, to register healthcare entitlement in Spain." },
        { question: "Can I use my EHIC after moving?", answer: "EHIC is generally for temporary stays. If you move to Spain, you should plan resident healthcare access rather than relying only on tourist cover." },
        { question: "Do I need healthcare before EU registration?", answer: "You may, especially if you are applying as self-sufficient, retired or a student. Check your appointment instructions." },
        { question: "Is the health card the same as Social Security?", answer: "No. A regional health card, Social Security number, NIE and padrón are separate documents or records, even when they interact." },
        { question: "Does healthcare work the same in every region?", answer: "No. Public healthcare is managed through regional health services, so procedures and health-card requirements can vary." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Documents Checklist", href: routes.checklist }
        ])}${TipBox("Keep healthcare documents in the same folder as your identity, padrón, Social Security and residence paperwork.")}`
      })
    ]
  })
});

pages.push({
  route: routes.banking,
  html: GuideLayout({
    path: routes.banking,
    canonical: `https://iberigo.eu${routes.banking}`,
    title: "Opening a Bank Account in Spain — IberiGo",
    description: "A practical guide to opening a bank account in Spain, including resident and non-resident accounts, documents, fees, direct debits and common mistakes.",
    metadata: guideMetadataFor(routes.banking),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Bank Account" }],
    hero: {
      kicker: "Everyday setup",
      title: "Opening a Bank Account in Spain",
      intro: "A practical guide to choosing and opening a Spanish bank account, understanding common documents, avoiding unnecessary fees, and preparing for everyday payments in Spain.",
      asideTitle: "Compare before opening",
      asideText: "Do not choose a bank only from the account name or a promotion. Conditions, fees and document requests may vary by bank."
    },
    sections: [
      QuickAnswer("You can often open either a resident or non-resident account in Spain, depending on your residency status and documents. Requirements vary by bank. A Spanish IBAN can be useful for salary, rent, utilities and local payments. Some people use online banks, but certain Spanish services may still work more smoothly with a traditional Spanish bank."),
      AtAGlance([
        ["Account type", "Resident or non-resident account, depending on your status and documents."],
        ["Usually useful for", "Salary, rent, utilities, taxes, Social Security payments and direct debits."],
        ["Requirements vary?", "Yes. Exact requirements vary by bank."],
        ["Fees vary?", "Yes. Check the current conditions before opening an account."],
        ["Spanish IBAN", "Often useful for local payments and some Spanish providers."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens moving to Spain", text: "Use this if you are preparing everyday payments after arrival or during your registration steps." },
          { title: "Non-EU residents", text: "Use this if you have or are preparing residence documents and need a practical account for life in Spain." },
          { title: "Workers", text: "Use this if you need an account for salary, work expenses or Social Security-related payments." },
          { title: "Retirees", text: "Use this if you need an account for pension payments, rent, utilities or regular transfers." },
          { title: "Students", text: "Use this if you need an account for rent, fees, phone contracts or everyday spending." },
          { title: "People setting up payments", text: "Use this if you are arranging rent, utilities, mobile phone, internet or salary payments." }
        ])
      }),
      GuideSection({
        id: "residentVsNonResident",
        title: "Resident vs non-resident accounts",
        children: `${Cards([
          { title: "Resident account", text: "A resident account is normally for people who can show they live in Spain and provide the documents the bank requests for that status." },
          { title: "Non-resident account", text: "A non-resident account may be available before your local paperwork is complete, depending on the bank and your documents." },
          { title: "Updating status later", text: "After you receive residency documents or your tax-residence position changes, the bank may ask you to update your account details." }
        ])}${WarningBox("Avoid treating account labels as legal advice. Account options, document requests and status updates may vary by bank and depending on your residency status.")}`
      }),
      GuideSection({
        id: "commonDocuments",
        title: "Common documents banks may ask for",
        children: `${ChecklistBox({
          title: "Common bank onboarding documents",
          items: [
            "Passport or national ID.",
            "NIE, if available.",
            "Proof of address.",
            "Employment contract or proof of income, if applicable.",
            "Residency certificate or residence card, if available.",
            "Tax residency information."
          ]
        })}${InfoBox({ title: "Exact requirements vary by bank", text: "Banks can ask for different evidence depending on your nationality, residency status, income source, tax residency and account type." })}`
      }),
      GuideSection({
        id: "feesCommissions",
        title: "Fees and commissions",
        children: `${Cards([
          { title: "Maintenance fees", text: "Some accounts may charge monthly or quarterly maintenance fees. Check the current conditions before opening an account." },
          { title: "Card fees", text: "Debit or credit cards may have separate fees, renewal fees or conditions for avoiding charges." },
          { title: "Transfer fees", text: "Transfers may be free in some cases and charged in others, depending on the bank, destination and account conditions." },
          { title: "Fee conditions", text: "Some banks reduce or remove fees if you meet conditions such as salary, pension or recurring income deposits." },
          { title: "Direct deposit requirements", text: "Salary or pension direct deposit requirements may vary by bank and account type." },
          { title: "Product bundles", text: "Some offers may involve insurance, credit cards or other products. Understand whether they are optional before accepting them." }
        ])}${WarningBox("Do not rely on old fee tables, promotions or another customer’s conditions. Fees and account conditions may change, so check the current terms before opening an account.")}`
      }),
      GuideSection({
        id: "directDebitsEverydayUse",
        title: "Direct debits and everyday use",
        children: `${Cards([
          { title: "Utilities", text: "Electricity and water companies commonly use bank direct debits for regular bills." },
          { title: "Home services", text: "Internet and mobile phone providers may ask for bank details when setting up contracts." },
          { title: "Rent and salary", text: "A Spanish IBAN can make rent payments and salary deposits smoother, depending on the landlord or employer." },
          { title: "Taxes", text: "A bank account can be useful for tax payments or direct debit arrangements when they apply." },
          { title: "Social Security", text: "If you are self-employed or have other contribution obligations, bank payments may be part of the setup." },
          { title: "Proof of ownership", text: "Keep an IBAN certificate or account ownership document because landlords, employers or offices may ask for it." }
        ])}${TipBox("Ask how to download proof of account ownership from the app or branch before you need it urgently.")}`
      }),
      GuideSection({
        id: "onlineVsTraditional",
        title: "Online banks vs traditional banks",
        children: `<table class="guide-table"><tbody>
          <tr><th>Option</th><td><strong>What to consider</strong></td></tr>
          <tr><th>Online banks</th><td>Online banks may offer easier setup, lower fees and a strong app experience. They can be useful for spending, transfers and early setup, depending on your documents and needs.</td></tr>
          <tr><th>Traditional Spanish banks</th><td>Traditional Spanish banks offer branch access and may be easier for some local paperwork. They may also be more familiar to landlords, employers or utility companies.</td></tr>
          <tr><th>Neutral comparison</th><td>Neither option is automatically best. Compare documents, fees, Spanish IBAN availability, customer support, direct debits and your expected use.</td></tr>
        </tbody></table>${InfoBox({ title: "Practical reality", text: "Some Spanish services may work more smoothly with a traditional Spanish bank, while many everyday payments can work well with online banks. Check before relying on one account for everything." })}`
      }),
      CommonMistakes([
        "Opening the first account offered without checking fees.",
        "Accepting paid extras without understanding them.",
        "Not updating details after becoming resident.",
        "Assuming every provider accepts every IBAN smoothly.",
        "Not keeping proof of account ownership.",
        "Ignoring tax-residence questions during bank onboarding."
      ]),
      RealQuestions([
        { question: "Can I open a bank account before getting my NIE?", answer: "Some banks may offer non-resident or passport-based routes, but this varies by bank. Ask what documents they require before booking an appointment or starting an online application." },
        { question: "Do I need a Spanish bank account to live in Spain?", answer: "Not always legally, but it can make salary, rent, utilities, taxes and local direct debits easier. Some providers may work more smoothly with a Spanish IBAN." },
        { question: "Can I use an online bank?", answer: "Yes, many people use online banks for everyday payments. Check whether the account works for your rent, salary, direct debits and any Spanish paperwork you need." },
        { question: "Should I choose a resident or non-resident account?", answer: "It depends on your residency status and documents. If you open a non-resident account first, ask how to update it after you receive residency documents." },
        { question: "Can banks charge fees?", answer: "Yes. Fees, commissions and conditions may vary by bank and by account type. Check the current fee schedule before opening the account." },
        { question: "Do I need to change my account after getting residency?", answer: "You may need to update your details or account status after becoming resident. Ask the bank what it requires and keep proof of the update." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Digital Certificate Guide", href: routes.digital },
          { label: "View the Taxes Guide", href: routes.taxes },
          { label: "View the Social Security Guide", href: routes.social },
          { label: "View the Healthcare Guide", href: routes.healthcare }
        ])}${TipBox("Keep your bank contract, IBAN certificate and account-opening documents with your Spain paperwork folder.")}`
      })
    ]
  })
});

pages.push({
  route: routes.digital,
  html: GuideLayout({
    path: routes.digital,
    canonical: `https://iberigo.eu${routes.digital}`,
    title: "Digital Certificate and Cl@ve in Spain — IberiGo",
    description: "A practical guide to Spain’s Digital Certificate and Cl@ve, including what they are used for, who needs them, how they differ, and common mistakes.",
    metadata: guideMetadataFor(routes.digital),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Digital Certificate" }],
    hero: {
      kicker: "Online access",
      title: "Digital Certificate and Cl@ve in Spain",
      intro: "A practical guide to Spain’s main digital identity systems, why they matter, and how they help you complete official procedures online.",
      asideTitle: "Two different tools",
      asideText: "Digital Certificate and Cl@ve can both help with online public services, but they are not the same system."
    },
    sections: [
      QuickAnswer("Digital Certificate and Cl@ve are used to identify yourself online with Spanish public administrations. They may help with tax, Social Security, health, immigration, municipal and other official procedures, depending on the administration and the specific process. They are not the same system, and many residents eventually need at least one of them."),
      AtAGlance([
        ["Main purpose", "Identify yourself online with Spanish public administrations."],
        ["Digital Certificate", "A digital identity certificate installed or managed on a device or browser."],
        ["Cl@ve", "Spain’s electronic identification system for public-service access."],
        ["Same system?", "No. They work differently and are accepted differently depending on the procedure."],
        ["Useful for", "Tax, Social Security, notifications, certificates and some local or regional services."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens living in Spain", text: "Use this if you need online access for tax, Social Security, municipal certificates or residence-related admin." },
          { title: "Non-EU residents", text: "Use this if you manage residence, tax, notifications or other official services online." },
          { title: "Workers", text: "Use this if you need to check Social Security, tax or employment-related records." },
          { title: "Self-employed people", text: "Use this if you handle tax, Social Security, notifications or certificates for professional activity." },
          { title: "Retirees", text: "Use this if you need access to healthcare, certificates, tax or pension-related administration." },
          { title: "Students", text: "Use this if you deal with study, residence, health or municipal procedures online." },
          { title: "Anyone dealing with public administration", text: "Use this if Spanish public offices direct you to an online portal or notification system." }
        ])
      }),
      GuideSection({
        id: "whatIsDigitalCertificate",
        title: "What is a Digital Certificate?",
        children: `${Cards([
          { title: "Digital identity certificate", text: "A Digital Certificate is a digital identity certificate installed or managed on a device or browser." },
          { title: "Official portal access", text: "It can be used to sign in to official government portals where certificates are accepted." },
          { title: "Electronic signing", text: "It may also allow you to sign documents electronically, depending on the portal and procedure." },
          { title: "Common uses", text: "It is commonly used for tax, Social Security and administrative procedures." }
        ])}${InfoBox({ title: "Keep it general", text: "Technical setup and accepted browsers can change. Check the official site before applying or installing anything." })}`
      }),
      GuideSection({
        id: "whatIsClave",
        title: "What is Cl@ve?",
        children: `${Cards([
          { title: "Electronic identification system", text: "Cl@ve is Spain’s electronic identification system for accessing public services." },
          { title: "Access methods", text: "It may use app-based or code-based access depending on the setup and registration level." },
          { title: "Regular online access", text: "Cl@ve is often easier for regular sign-in access across public portals." },
          { title: "Different from a certificate", text: "Cl@ve is not exactly the same as a Digital Certificate and may not be accepted for every certificate-based action." }
        ])}${WarningBox("Do not assume Cl@ve and a Digital Certificate can be used interchangeably. Which one you need depends on the procedure.")}`
      }),
      GuideSection({
        id: "digitalCertificateVsClave",
        title: "Digital Certificate vs Cl@ve",
        children: `<table class="guide-table"><tbody>
          <tr><th>System</th><td><strong>What to know</strong></td></tr>
          <tr><th>Digital Certificate</th><td>Often stronger for electronic signing, installed or managed on a device, and useful for many official procedures.</td></tr>
          <tr><th>Cl@ve</th><td>Often easier for sign-in access, useful across many public portals, and may be simpler for day-to-day access.</td></tr>
          <tr><th>Which one?</th><td>Which one you need depends on the procedure, the administration and the verification level required.</td></tr>
        </tbody></table>`
      }),
      GuideSection({
        id: "whatCanUseFor",
        title: "What can you use them for?",
        children: `${Cards([
          { title: "Tax Agency procedures", text: "They may allow you to access tax data, file or review tax procedures, and manage some tax notifications." },
          { title: "Social Security procedures", text: "They may allow you to check Social Security records, certificates or contribution-related information." },
          { title: "Notifications", text: "Digital access can help you check official notifications where the relevant administration uses online notice systems." },
          { title: "Municipal procedures", text: "Some town halls may allow certificate requests, local tax tasks or other municipal procedures online." },
          { title: "Immigration-related procedures", text: "Some immigration or residence-related processes may be available online where the relevant portal supports them." },
          { title: "Health service access", text: "Regional health services may support online access depending on the autonomous community and procedure." },
          { title: "Certificates and official documents", text: "They may allow downloading certificates or official documents from public portals." }
        ])}${WarningBox("Availability depends on the public administration and the specific procedure. Do not assume every process can be completed online.")}`
      }),
      GuideSection({
        id: "beforeStart",
        title: "Before you start",
        children: `${ChecklistBox({
          title: "Details that may be needed",
          items: [
            "NIE.",
            "Passport or national ID.",
            "Spanish phone number, in some cases.",
            "Email address.",
            "Appointment or identity verification, depending on the route.",
            "Access to official government websites."
          ]
        })}${InfoBox({ title: "Requirements can vary", text: "These details are not always required in the same way. The process may vary by route, document type and public administration." })}`
      }),
      CommonMistakes([
        "Confusing Digital Certificate with Cl@ve.",
        "Losing access after changing device or browser.",
        "Not saving backup or export instructions where they apply.",
        "Using unofficial websites that ask for sensitive data or charge for basic instructions.",
        "Ignoring official notifications once online access is active.",
        "Assuming every process is available online.",
        "Waiting until an urgent deadline before setting up access."
      ]),
      RealQuestions([
        { question: "Do I need both Digital Certificate and Cl@ve?", answer: "Not always. Many residents eventually use at least one, and some find both useful. Which one you need depends on the procedure." },
        { question: "Can I use them without being Spanish?", answer: "Often yes, depending on your identity documents and the registration route. Check the official site for the exact requirements that apply to you." },
        { question: "Do I need a NIE?", answer: "A NIE is commonly relevant for foreign residents using Spanish public administration online, but exact requirements may vary by system and route." },
        { question: "Can I use them on my phone?", answer: "Cl@ve may support app-based access. Digital Certificate use on phones depends on the certificate, device and portal, so check official instructions before relying on it." },
        { question: "What happens if I change computer?", answer: "You may need backup, export or reinstallation steps for a Digital Certificate. Save official recovery or export guidance where applicable." },
        { question: "Are they useful for taxes?", answer: "Yes. They may allow you to access Tax Agency services, check data, manage notifications or complete tax procedures, depending on the process." },
        { question: "Are they useful for Social Security?", answer: "Yes. They may allow access to Social Security services, certificates and records, depending on the service and identification method accepted." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Before filing anything important, log in once to confirm your access works and your personal details look correct.")}`
      }),
    ]
  })
});

pages.push({
  route: routes.social,
  html: GuideLayout({
    path: routes.social,
    canonical: `https://iberigo.eu${routes.social}`,
    title: "Social Security in Spain — IberiGo",
    description: "A practical guide to Spain’s Social Security system for new residents, including who may need a Social Security number, when it matters, and how it connects to work, healthcare and administration.",
    metadata: guideMetadataFor(routes.social),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Social Security" }],
    hero: {
      kicker: "Work and administration",
      title: "Social Security in Spain",
      intro: "A practical guide to understanding Spain’s Social Security system, when you may need a Social Security number, and how it connects to work, healthcare and everyday administration.",
      asideTitle: "Not the same as NIE",
      asideText: "Social Security number, NIE, healthcare card, employment registration and tax identification are related admin concepts, but they are not the same thing."
    },
    sections: [
      QuickAnswer("Spain’s Social Security system is connected to work, contributions, public healthcare access and certain benefits. Many people receive or need a Social Security number when they start working or become self-employed. Employees are usually registered by their employer. Self-employed people usually need to deal with registration themselves or through a gestor. Not every newcomer needs to handle Social Security immediately."),
      AtAGlance([
        ["Main purpose", "Work records, contributions, public healthcare access routes and certain benefits."],
        ["Same as NIE?", "No. NIE is a foreigner identification number; Social Security uses its own number."],
        ["Employees", "Usually registered by the employer, but you should keep proof."],
        ["Self-employed", "Usually more complex and often handled with a gestor."],
        ["Healthcare", "Can be connected, but a Social Security number is not the same as a health card."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "Employees", text: "Use this if you will work for an employer in Spain or need to confirm employment registration." },
          { title: "Self-employed people", text: "Use this if you plan to register activity and may need Social Security and tax setup." },
          { title: "EU citizens moving to Spain", text: "Use this if work, healthcare or administration may involve Social Security." },
          { title: "Non-EU residents", text: "Use this if your residence, work or healthcare route connects to Spanish employment or contributions." },
          { title: "Students who may work", text: "Use this if you expect paid work or internships and need to understand the admin concepts." },
          { title: "Retirees checking healthcare access", text: "Use this if you need to understand whether healthcare access comes from pension status, S1 or another route." },
          { title: "People applying for public healthcare access", text: "Use this if Social Security recognition may be part of your healthcare route." },
          { title: "People trying to understand Spanish administration", text: "Use this if you are sorting out how Social Security differs from NIE, padrón, tax and healthcare documents." }
        ])
      }),
      GuideSection({
        id: "whatIsSocialSecurity",
        title: "What is Social Security in Spain?",
        children: `${Cards([
          { title: "Work and contributions", text: "Social Security is the system connected to contributions and employment registration." },
          { title: "Healthcare and benefits", text: "It can connect to public healthcare access and certain benefits, depending on your situation." },
          { title: "Separate from immigration", text: "It is separate from immigration residency and does not by itself prove your right to live in Spain." },
          { title: "Separate from padrón", text: "It is separate from the padrón, which is municipal address registration." },
          { title: "Separate from tax residency", text: "It is also separate from tax residency and tax identification questions." }
        ])}${InfoBox({ title: "Keep the concepts separate", text: "A Social Security number, healthcare card, public healthcare entitlement, employment registration and tax identification can interact, but they are different things." })}`
      }),
      GuideSection({
        id: "socialSecurityNumber",
        title: "What is a Social Security number?",
        children: Cards([
          { title: "System identification", text: "It is an identification number used within Spain’s Social Security system." },
          { title: "When it may be needed", text: "You may need it for employment, self-employment or certain public services." },
          { title: "Not your NIE", text: "It is not the same as your NIE, even though both are identification numbers used in administration." },
          { title: "Not residence proof", text: "It is not proof of immigration residency by itself." }
        ])
      }),
      GuideSection({
        id: "whenYouMayNeedIt",
        title: "When you may need it",
        children: Cards([
          { title: "Starting work as an employee", text: "You may need a Social Security number so your employer can register your employment correctly." },
          { title: "Registering as self-employed", text: "Self-employment usually involves Social Security and tax registration steps." },
          { title: "Public healthcare through work", text: "If your healthcare route comes through work or contributions, Social Security may be part of the process." },
          { title: "Official procedures", text: "Some procedures may ask for Social Security details depending on your situation." },
          { title: "Employment records", text: "You may use Social Security access to check employment records or contribution information." }
        ])
      }),
      GuideSection({
        id: "employees",
        title: "Employees",
        children: `${Cards([
          { title: "Employer registration", text: "Employers usually handle employment registration, but you should not assume it is complete without confirmation." },
          { title: "Documents", text: "You may need to provide identity documents and your NIE if available." },
          { title: "Keep proof", text: "Keep copies of contracts, registration confirmations, payslips and any Social Security documents you receive." },
          { title: "Ask if unsure", text: "If you are unsure, ask your employer or gestor to confirm that you are correctly registered." }
        ])}${TipBox("When starting a job, ask what documents the employer needs and when you will receive proof of registration or payslips.")}`
      }),
      GuideSection({
        id: "selfEmployed",
        title: "Self-employed people",
        children: `${Cards([
          { title: "More complex setup", text: "Self-employed registration is more complex than being registered by an employer." },
          { title: "Social Security and tax", text: "It may involve both Social Security and tax registration." },
          { title: "Gestor support", text: "Many people use a gestor because registrations, contributions and filing obligations can depend on the activity." },
          { title: "Future detailed guide", text: "A separate autónomo guide can cover this in detail later." }
        ])}${WarningBox("Do not start invoicing or self-employed activity based only on this overview. Get qualified advice if you are unsure.")}`
      }),
      GuideSection({
        id: "healthcareConnection",
        title: "Healthcare connection",
        children: `${Cards([
          { title: "One possible route", text: "Social Security can be one route into public healthcare, especially through work or contributions." },
          { title: "Different recognised routes", text: "Public healthcare access may depend on employment, contributions, pension status, family status or other recognised routes." },
          { title: "Regional health services", text: "Regional health services manage healthcare cards and local health-centre registration." },
          { title: "Not the same as a health card", text: "A Social Security number and health card are related in some cases, but they are not the same thing." }
        ])}<p>Use the <a href="${routes.healthcare}">Healthcare in Spain Guide</a> to compare healthcare routes before assuming Social Security is the only path.</p>`
      }),
      CommonMistakes([
        "Confusing Social Security number with NIE.",
        "Assuming padrón gives automatic Social Security registration.",
        "Assuming immigration residency and Social Security are the same.",
        "Not checking employer registration.",
        "Waiting until there is an urgent healthcare or work issue.",
        "Losing official registration documents.",
        "Assuming procedures are identical in every province."
      ]),
      RealQuestions([
        { question: "Is my Social Security number the same as my NIE?", answer: "No. Your NIE is a foreigner identification number. Your Social Security number identifies you within the Social Security system." },
        { question: "Do I need Social Security if I am not working?", answer: "Not always. It depends on your situation and whether a healthcare, benefits or administrative route requires it." },
        { question: "Does my employer register me?", answer: "Employers usually handle employment registration, but you should ask for confirmation and keep your contract, payslips and registration documents." },
        { question: "Do I need it for healthcare?", answer: "You may need it if your healthcare access comes through work, contributions or another recognised Social Security route. Other healthcare routes can also exist." },
        { question: "Do retirees need it?", answer: "Retirees may need to understand healthcare access, pension status or S1-type routes. The answer depends on their circumstances." },
        { question: "Can I get it before starting work?", answer: "It may be possible in some situations, but procedures and document requirements can vary. Check the official route or ask the employer or gestor handling the process." },
        { question: "Is it the same as tax registration?", answer: "No. Social Security registration and tax registration are separate, although self-employed activity may involve both." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap }
        ])}${TipBox("Keep Social Security documents with your identity, work, healthcare, banking and tax paperwork so you can find them when another procedure asks.")}`
      })
    ]
  })
});

pages.push({
  route: routes.taxes,
  html: GuideLayout({
    path: routes.taxes,
    canonical: `https://iberigo.eu${routes.taxes}`,
    title: "Taxes in Spain for New Residents — IberiGo",
    description: "A practical introduction to taxes in Spain for new residents, including tax residency, income tax, worldwide income, common obligations and mistakes to avoid.",
    metadata: guideMetadataFor(routes.taxes),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Taxes" }],
    hero: {
      kicker: "Money and residency",
      title: "Taxes in Spain for New Residents",
      intro: "A practical guide to understanding when Spain may consider you tax resident, what that can mean, and which tax topics new residents should review carefully.",
      asideTitle: "General information",
      asideText: "This guide helps you identify questions to review. It does not calculate your tax residence, filings or tax due."
    },
    sections: [
      QuickAnswer("Living in Spain can create Spanish tax obligations. Tax residency is not the same as immigration residency. Spain may tax residents on worldwide income, while non-residents may still have Spanish tax obligations if they have Spanish income or property. New residents should review their situation early."),
      GuideSection({
        id: "taxDisclaimer",
        title: "Important tax note",
        children: `<p>This guide is general information only and is not tax advice. Tax residency and tax obligations can depend on your personal circumstances, income sources, family situation and international tax treaties. If you are unsure, speak with a qualified tax adviser.</p>`
      }),
      AtAGlance([
        ["Main question", "Could Spain consider you tax resident?"],
        ["Immigration vs tax", "They are separate questions."],
        ["Calendar year", "Spanish tax residency is commonly assessed by calendar year."],
        ["Worldwide income", "Spanish tax residents may need to declare worldwide income."],
        ["Professional advice", "Seek professional advice if you are unsure."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens moving to Spain", text: "Use this if Spain may become your home or main base." },
          { title: "Non-EU residents", text: "Use this if you have or are preparing residence documents and need to understand tax questions separately." },
          { title: "Workers", text: "Use this if you earn salary or other work income while living in Spain." },
          { title: "Remote workers", text: "Use this if your work, employer or clients are connected to another country." },
          { title: "Retirees", text: "Use this if you receive pensions or investment income while living in Spain." },
          { title: "Self-employed people", text: "Use this if you invoice clients or run business activity from Spain." },
          { title: "Property owners", text: "Use this if you own property in Spain or receive rental income." },
          { title: "People with foreign income", text: "Use this if you receive income from another country." },
          { title: "People receiving pensions, dividends or rental income", text: "Use this if your income sources cross borders or involve investments." }
        ])
      }),
      GuideSection({
        id: "taxVsImmigration",
        title: "Tax residency vs immigration residency",
        children: `${Cards([
          { title: "Immigration residency", text: "Immigration residency is your legal right to live in Spain." },
          { title: "Tax residency", text: "Tax residency is whether Spain treats you as resident for tax purposes." },
          { title: "Documents are not the full answer", text: "Having EU registration, a TIE, NIE or padrón does not automatically answer every tax question by itself." }
        ])}${WarningBox("Do not assume that getting residence papers settles your tax position. Tax residency can depend on your circumstances and may require professional review.")}`
      }),
      GuideSection({
        id: "dayRule",
        title: "The 183-day rule",
        children: `${Cards([
          { title: "Calendar year", text: "Spain commonly considers time spent in Spain during a calendar year when assessing tax residency." },
          { title: "Days of presence", text: "Spending more than 183 days in Spain during a calendar year is one important factor." },
          { title: "Not the only factor", text: "Personal and economic interests may also matter, and family situation may matter in some cases." }
        ])}${InfoBox({ title: "Careful wording", text: "The 183-day rule is important, but it is not the only rule. Tax treaties may affect the outcome, and rules may change." })}`
      }),
      GuideSection({
        id: "worldwideIncome",
        title: "Worldwide income",
        children: `${Cards([
          { title: "Salary", text: "Salary from Spain or another country may need review if Spain treats you as tax resident." },
          { title: "Pension", text: "Pensions can be complex and may depend on the pension type and treaty rules." },
          { title: "Dividends", text: "Dividend income may need to be declared if worldwide income reporting applies." },
          { title: "Rental income", text: "Rental income from Spain or abroad may create tax questions." },
          { title: "Self-employment income", text: "Self-employment income can create filing, payment and Social Security questions." },
          { title: "Investment income", text: "Investment income and accounts may create reporting or tax questions." }
        ])}${WarningBox("If Spain treats you as tax resident, you may need to declare worldwide income. Foreign tax rules and double taxation treaties may affect how income is taxed.")}`
      }),
      GuideSection({
        id: "commonTaxTopics",
        title: "Common tax topics for new residents",
        children: `${Cards([
          { title: "Income tax", text: "Residents may need to review annual income tax obligations." },
          { title: "Savings income", text: "Interest, dividends and investment gains may need separate review." },
          { title: "Pensions", text: "Pension taxation can depend on the pension source and applicable treaty rules." },
          { title: "Rental income", text: "Rental income from Spanish or foreign property can create filing questions." },
          { title: "Self-employment tax obligations", text: "Self-employed people usually have additional filing and payment obligations." },
          { title: "Property taxes", text: "Owning property may create tax obligations even if you do not rent it out." },
          { title: "Local taxes", text: "Some taxes and charges are local and may depend on the municipality." },
          { title: "Wealth-related reporting", text: "Wealth-related reporting may apply in some circumstances." },
          { title: "Foreign assets reporting", text: "Foreign assets reporting may be relevant depending on your assets and thresholds." }
        ])}${InfoBox({ title: "Introductory only", text: "This section highlights topics to review. It does not explain full filing rules or calculate tax outcomes." })}`
      }),
      GuideSection({
        id: "ifYouWork",
        title: "If you work in Spain",
        children: `${Cards([
          { title: "Employees", text: "Employees may have tax withheld through payroll, but payroll withholding may not answer every tax question." },
          { title: "Self-employed people", text: "Self-employed people usually have additional filing and payment obligations." },
          { title: "Remote and cross-border work", text: "Remote work, foreign employers and cross-border clients can depend on your circumstances and may need professional review." }
        ])}${InfoBox({ title: "Self-employed detail", text: "Detailed autónomo tax instructions belong in a dedicated self-employed guide. For now, seek professional advice before invoicing or registering activity." })}`
      }),
      GuideSection({
        id: "foreignIncome",
        title: "If you receive income from another country",
        children: `${Cards([
          { title: "Pensions", text: "Foreign pensions are common for retirees and can be affected by treaty rules." },
          { title: "Foreign salary", text: "Foreign salary can be complex if you live or work from Spain." },
          { title: "Dividends", text: "Dividends from another country may need review if Spain treats you as tax resident." },
          { title: "Rental income", text: "Rental income from property outside Spain may still matter." },
          { title: "Investment accounts", text: "Investment accounts outside Spain may create income and reporting questions." }
        ])}${WarningBox("International income can be complex, and tax treaty rules may matter. Seek professional advice if you receive income from another country.")}`
      }),
      CommonMistakes([
        "Assuming immigration residency and tax residency are the same.",
        "Ignoring foreign income.",
        "Not checking pension taxation.",
        "Misunderstanding the 183-day rule.",
        "Forgetting local or property taxes.",
        "Waiting until the tax deadline.",
        "Relying only on informal advice.",
        "Not asking about foreign asset reporting when relevant."
      ]),
      RealQuestions([
        { question: "Am I tax resident if I live in Spain?", answer: "Possibly. Living in Spain can be relevant, but the answer can depend on days of presence, personal and economic interests, family situation and treaty rules." },
        { question: "Is tax residency the same as getting residency papers?", answer: "No. Immigration residency and tax residency are separate. Residence documents do not automatically answer every tax question." },
        { question: "Do I need to declare income from another country?", answer: "If Spain treats you as tax resident, worldwide income may need to be declared. Tax treaties may affect the outcome, so get advice if you have foreign income." },
        { question: "Are pensions taxed in Spain?", answer: "They may be, depending on the pension type, your tax residency and any applicable treaty rules." },
        { question: "What if I only live in Spain part of the year?", answer: "Part-year living can still create tax questions. Days in Spain, calendar-year presence and your personal and economic ties may matter." },
        { question: "Do I need a gestor?", answer: "Not everyone does, but a qualified tax adviser or gestor can be useful if you have foreign income, self-employment, property, pensions or uncertainty." },
        { question: "Can double taxation treaties help?", answer: "They may affect which country can tax certain income or how double taxation is relieved. Do not assume the outcome without advice." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap }
        ])}${TipBox("Before a deadline appears, collect your income records, travel records, address details and foreign tax documents so a tax adviser can review them properly.")}`
      })
    ]
  })
});

pages.push({
  route: routes.driving,
  html: GuideLayout({
    path: routes.driving,
    canonical: `https://iberigo.eu${routes.driving}`,
    title: "Driving Licence in Spain for New Residents — IberiGo",
    description: "A practical guide to driving in Spain as a new resident, including EU licences, non-EU licences, licence exchange, renewals, insurance and common mistakes.",
    metadata: guideMetadataFor(routes.driving),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Driving Licence" }],
    hero: {
      kicker: "Driving and transport",
      title: "Driving Licence in Spain for New Residents",
      intro: "A practical guide to understanding when you can use your existing licence in Spain, when you may need to exchange or renew it, and what new residents should check after moving.",
      asideTitle: "Check your licence type",
      asideText: "Driving rules can depend on your country of issue, residency status, licence category, expiry date, medical requirements and current DGT rules."
    },
    sections: [
      QuickAnswer("If you have an EU or EEA driving licence, you can usually drive in Spain with it while it is valid, but renewal rules may apply once you are resident. If you have a non-EU licence, the answer depends on the country of issue and whether Spain has an exchange agreement. Some residents may need to exchange, renew or register their licence. Always check the current DGT rules for your licence type."),
      AtAGlance([
        ["Main authority", "DGT is the authority to check for Spanish driving-licence rules."],
        ["EU/EEA licences", "Generally recognised in Spain while valid, with resident renewal rules to review."],
        ["Non-EU licences", "Rules may vary by country of issue and exchange agreement."],
        ["Medical checks", "Renewal or exchange may involve a Spanish medical check."],
        ["Car paperwork", "Vehicle registration and insurance are separate from licence exchange."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens moving to Spain", text: "Use this if you hold an EU or EEA licence and need to understand resident-driver rules." },
          { title: "Non-EU residents", text: "Use this if your licence was issued outside the EU or EEA and you need to check exchange or testing rules." },
          { title: "Retirees", text: "Use this if you drive regularly and need to check renewal, medical or age-related rules." },
          { title: "Workers", text: "Use this if commuting, business travel or professional activity depends on driving." },
          { title: "Students", text: "Use this if you plan to drive while studying or after becoming resident." },
          { title: "People bringing a car to Spain", text: "Use this to separate driving-licence questions from vehicle-registration questions." },
          { title: "Regular drivers", text: "Use this if you will drive often and need to avoid relying on tourist assumptions." },
          { title: "Expiring licences", text: "Use this if your licence is close to expiry and you need to know where renewal may happen." }
        ])
      }),
      GuideSection({
        id: "euLicences",
        title: "EU/EEA driving licences",
        children: `${Cards([
          { title: "Generally recognised", text: "EU and EEA driving licences are generally recognised in Spain while they are valid." },
          { title: "Renewal after residence", text: "If your licence expires while you are resident in Spain, you may need to renew it through Spain." },
          { title: "Spanish rules may apply", text: "Spanish medical and renewal rules may apply depending on your licence, category and circumstances." },
          { title: "Long-validity licences", text: "Long-validity or indefinite licences may have special requirements, so check current DGT guidance." }
        ])}${InfoBox({ title: "Avoid tourist assumptions", text: "A licence that is simple to use as a visitor may raise different questions once you become resident in Spain." })}`
      }),
      GuideSection({
        id: "nonEuLicences",
        title: "Non-EU driving licences",
        children: Cards([
          { title: "Temporary use may be limited", text: "Some non-EU licences may be valid only temporarily after becoming resident." },
          { title: "Exchange agreements", text: "Some countries have licence-exchange agreements with Spain, but the exact rules may vary by country of issue." },
          { title: "Testing may be required", text: "If no exchange agreement applies, a Spanish driving test may be required." },
          { title: "International Driving Permit", text: "An International Driving Permit may help temporarily, but it does not replace residency rules." }
        ])
      }),
      GuideSection({
        id: "licenceExchange",
        title: "Licence exchange",
        children: `${Cards([
          { title: "What exchange means", text: "Licence exchange means replacing your foreign licence with a Spanish driving licence." },
          { title: "Requirements vary", text: "Requirements may vary depending on the issuing country and the category of licence." },
          { title: "Common items", text: "You may need an appointment, identity documents, residence documents, photo, medical report and official fee." },
          { title: "Check with DGT", text: "DGT is the authority to check before you book, pay or submit documents." }
        ])}${WarningBox("Do not assume your country has an exchange agreement. Check the current DGT rules for your specific licence before making plans.")}`
      }),
      GuideSection({
        id: "renewalInSpain",
        title: "Renewal in Spain",
        children: Cards([
          { title: "Resident renewal", text: "If you are resident in Spain and your licence expires, you may need to renew through Spain." },
          { title: "Medical check", text: "Renewal usually involves a medical check at an authorised centre." },
          { title: "Licence category and age", text: "Rules may depend on licence category, age and other circumstances." },
          { title: "Expiry dates", text: "Keep track of your expiry date so you are not forced to resolve the issue urgently." }
        ])
      }),
      GuideSection({
        id: "foreignCar",
        title: "Driving with a foreign car",
        children: `${Cards([
          { title: "Separate from the licence", text: "Car registration rules are separate from driving-licence rules." },
          { title: "Insurance matters", text: "You should confirm that your insurance is valid for your situation and where the car is being used." },
          { title: "ITV may apply", text: "Spanish vehicle-inspection rules may apply depending on the vehicle and registration status." },
          { title: "Complex procedures", text: "Import and registration procedures can be complex, especially after becoming resident." }
        ])}${InfoBox({ title: "Keep the topics separate", text: "Licence exchange, vehicle registration, insurance and ITV are connected in everyday driving, but they are different administrative questions." })}`
      }),
      CommonMistakes([
        "Assuming NIE or residency automatically changes driving licence status.",
        "Ignoring the licence expiry date.",
        "Assuming an International Driving Permit is enough forever.",
        "Not checking DGT rules after becoming resident.",
        "Confusing licence exchange with car registration.",
        "Driving without valid insurance.",
        "Relying on outdated forum advice."
      ]),
      RealQuestions([
        { question: "Can I drive in Spain with an EU licence?", answer: "Usually yes while the licence is valid, but resident renewal and medical rules may apply. Check DGT guidance for your exact licence." },
        { question: "Do I need to exchange my licence from another EU country?", answer: "An EU licence is generally recognised while valid, regardless of which EU country issued it. If it expires while you are resident in Spain, renewal may need to happen in Spain." },
        { question: "Can I drive with a non-EU licence?", answer: "Possibly for a limited period, depending on the country of issue, your residency status and whether an exchange agreement applies." },
        { question: "What is the DGT?", answer: "DGT is Spain’s traffic authority and the official place to check driving-licence, exchange and renewal rules." },
        { question: "Do I need a medical check?", answer: "You may need one for renewal or exchange. Requirements can depend on your licence category, age and procedure." },
        { question: "Is car registration the same as licence exchange?", answer: "No. Licence exchange is about your right to drive. Car registration is about the vehicle." },
        { question: "What happens if my licence expires while I live in Spain?", answer: "You may need to renew it in Spain if you are resident. Check the current DGT process before it expires." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare }
        ])}${TipBox("Before you drive regularly as a resident, check your licence expiry date, insurance position and whether DGT requires any exchange or renewal step.")}`
      })
    ]
  })
});

pages.push({
  route: routes.accommodation,
  html: GuideLayout({
    path: routes.accommodation,
    canonical: `https://iberigo.eu${routes.accommodation}`,
    title: "Finding Accommodation in Spain — IberiGo",
    description: "A practical guide to finding accommodation in Spain, including short-term rentals, long-term rentals, documents, contracts, deposits, scams and common mistakes.",
    metadata: guideMetadataFor(routes.accommodation),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Moving to Spain", href: routes.euRoadmap }, { label: "Finding Accommodation" }],
    hero: {
      kicker: "Housing and address",
      title: "Finding Accommodation in Spain",
      intro: "A practical guide to finding a place to live in Spain, understanding rental basics, preparing documents, and avoiding common problems before you sign.",
      asideTitle: "Your address affects later steps",
      asideText: "A rental may affect padrón registration, healthcare, banking, official notifications and local services, so check address paperwork before you commit."
    },
    sections: [
      QuickAnswer("Many newcomers start with temporary accommodation before signing a long-term rental. Long-term rentals may require documents and proof of income. The padrón may depend on having an address where registration is possible. Rental contracts should be reviewed carefully before signing. Scams and misleading listings are possible, especially online."),
      AtAGlance([
        ["Common first step", "Temporary accommodation can give you time to visit areas and view properties in person."],
        ["Long-term rental", "Usually better for stability and may support later administration."],
        ["Documents", "Landlords and agencies may ask for identity, income and payment evidence."],
        ["Padrón", "Ask whether the landlord can provide the documents needed for padrón registration."],
        ["Before paying", "Verify the property, contract and payment recipient carefully."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens moving to Spain", text: "Use this if you need an address before padrón, healthcare, banking or EU registration steps." },
          { title: "Non-EU residents", text: "Use this if accommodation paperwork may connect to residency, notifications or local registration." },
          { title: "Workers", text: "Use this if you need housing near work, transport or required offices." },
          { title: "Retirees", text: "Use this if you are comparing stable housing, local services and healthcare access." },
          { title: "Students", text: "Use this if you are comparing student housing, shared rentals or short-term arrival options." },
          { title: "Families", text: "Use this if schools, healthcare, transport and local services affect where you live." },
          { title: "People without a permanent address yet", text: "Use this if you need a landing option while you search in person." },
          { title: "People preparing for padrón", text: "Use this if you need to check whether an address can support municipal registration." }
        ])
      }),
      GuideSection({
        id: "temporaryVsLongTerm",
        title: "Temporary vs long-term accommodation",
        children: `${Cards([
          { title: "Temporary: useful when arriving", text: "Temporary accommodation can help you arrive calmly while you learn the area and view homes in person." },
          { title: "Temporary: easier before documents", text: "It may be easier to book before you have Spanish documents or proof of local income." },
          { title: "Temporary: padrón may not be possible", text: "Short-term accommodation may not always provide the documents needed for padrón registration." },
          { title: "Long-term: more stability", text: "A long-term rental is usually better for stable living, local services and daily administration." },
          { title: "Long-term: more documents", text: "Long-term rentals may require more documents and stronger proof of income or guarantees." },
          { title: "Long-term: contract terms matter", text: "Contract duration, notice rules, deposits, utilities and address paperwork should be checked before signing." }
        ])}${InfoBox({ title: "Ask before you sign", text: "Do not assume every rental allows padrón. Ask in writing whether the landlord or agency can provide the documents needed for municipal registration." })}`
      }),
      GuideSection({
        id: "whyAddressMatters",
        title: "Why the address matters",
        children: `${Cards([
          { title: "Padrón registration", text: "Your address may affect whether and where you can register on the padrón." },
          { title: "Healthcare registration", text: "Local healthcare registration may depend on where you live and your regional health service." },
          { title: "School registration", text: "For families, school access or catchment questions may depend on address." },
          { title: "Bank paperwork", text: "Banks may ask for address information or proof depending on the account and your status." },
          { title: "Official notifications", text: "Your address may be used for official correspondence and administrative records." },
          { title: "Local services", text: "Transport, health centres, town hall offices and daily services vary by neighbourhood and municipality." }
        ])}${WarningBox("Before signing, ask whether the landlord will provide the documents needed for padrón registration. Get important confirmations in writing.")}`
      }),
      GuideSection({
        id: "documentsLandlordsMayAskFor",
        title: "Documents landlords may ask for",
        children: `${Cards([
          { title: "Identity document", text: "A passport or national ID is commonly requested." },
          { title: "NIE, if available", text: "Some landlords or agencies may ask for a NIE if you already have one." },
          { title: "Work and income", text: "An employment contract, payslips, proof of income or bank references may be requested." },
          { title: "Rental history", text: "Previous rental references may help, especially in competitive areas." },
          { title: "Deposit", text: "A deposit and upfront payment are commonly requested before move-in." },
          { title: "Guarantee", text: "A guarantor or additional guarantee may be requested in some cases." }
        ])}${TipBox("Exact requirements vary by landlord and agency. Ask for the required document list before arranging a viewing or sending sensitive information.")}`
      }),
      GuideSection({
        id: "rentalContracts",
        title: "Rental contracts",
        children: Cards([
          { title: "Read carefully", text: "Read the contract carefully and consider professional advice before signing if anything is unclear." },
          { title: "Core terms", text: "Check rent, deposit, duration, renewal, notice rules and move-in date." },
          { title: "Utilities", text: "Check which utilities are included and which must be contracted or paid separately." },
          { title: "Extra charges", text: "Ask who pays community fees, rubbish tax or other recurring charges where applicable." },
          { title: "Padrón documents", text: "Check whether the property can be used for padrón and what documents the landlord will provide." },
          { title: "Keep proof", text: "Keep signed copies, receipts, bank-transfer records and written confirmations." }
        ])
      }),
      GuideSection({
        id: "depositsAndPayments",
        title: "Deposits and upfront payments",
        children: `${Cards([
          { title: "Deposit and guarantees", text: "Landlords may ask for a deposit and additional guarantees, depending on the rental and your situation." },
          { title: "Agency fees", text: "Agency fees may apply in some situations, so ask what each payment is for before agreeing." },
          { title: "Verify before paying", text: "Avoid sending large payments without verifying the property, contract and recipient." },
          { title: "Traceable payments", text: "Use traceable payment methods and avoid unclear payment routes." },
          { title: "Receipts", text: "Keep receipts and written confirmation for every payment." }
        ])}${WarningBox("If you feel pressured to pay before you can verify the listing or contract, slow down and check the details carefully.")}`
      }),
      GuideSection({
        id: "avoidingScams",
        title: "Avoiding scams",
        children: Cards([
          { title: "Too good to be true", text: "A very low price in a high-demand area can be a warning sign." },
          { title: "No viewing or video call", text: "Be cautious if the landlord refuses a viewing, video call or reasonable verification." },
          { title: "Pressure to pay quickly", text: "Scammers often create urgency so you do not check the details." },
          { title: "Poor or stolen photos", text: "Photos that look inconsistent, generic or reused can be a warning sign." },
          { title: "No contract", text: "Avoid paying large sums without a clear contract or written terms." },
          { title: "Suspicious payment details", text: "Check whether the payment recipient and account details make sense for the property and agreement." },
          { title: "Sensitive documents too early", text: "Be cautious if identity documents are requested unusually early without context." },
          { title: "Details do not match", text: "Verify that address, photos, viewing details, landlord or agency information and contract details match." }
        ])
      }),
      CommonMistakes([
        "Signing before checking padrón possibility.",
        "Relying only on photos.",
        "Not checking extra costs.",
        "Not keeping payment records.",
        "Assuming short-term rentals work for residency steps.",
        "Ignoring the official notification address.",
        "Not checking transport and daily services.",
        "Moving too far from required offices or work."
      ]),
      RealQuestions([
        { question: "Can I use Airbnb or temporary accommodation for padrón?", answer: "Sometimes it may be possible, but do not assume it. Ask whether the accommodation can provide the documents your town hall requires." },
        { question: "Do I need a rental contract for padrón?", answer: "Town halls usually ask for some form of address evidence. The exact documents can vary by municipality and situation." },
        { question: "Can I rent before getting a NIE?", answer: "It may be possible, depending on the landlord or agency. Some may accept a passport or national ID, while others may ask for a NIE." },
        { question: "What documents do landlords ask for?", answer: "They may ask for identity documents, NIE if available, proof of income, work contract, payslips, references, deposit and sometimes extra guarantees." },
        { question: "Should I pay before viewing?", answer: "Be very cautious. If you cannot view in person, try to verify through a video call, agency checks, contract review and traceable payments before sending money." },
        { question: "Can a landlord refuse padrón registration?", answer: "The practical issue is often whether the landlord will provide the documents needed by the town hall. Ask before signing and keep written confirmation." },
        { question: "Is it better to rent short-term first?", answer: "Many newcomers do because it gives time to compare areas and avoid rushing. It may not solve padrón or long-term paperwork needs, so plan the next step early." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap }
        ])}${TipBox("Before committing to a rental, keep a written checklist for padrón documents, total move-in cost, contract terms, transport, healthcare access and work or school distance.")}`
      })
    ]
  })
});

pages.push({
  route: routes.checklist,
  html: GuideLayout({
    path: routes.checklist,
    canonical: `https://iberigo.eu${routes.checklist}`,
    title: "Documents Checklist for Moving to Spain — IberiGo",
    description: "A practical checklist of documents to prepare before moving to Spain, including identity documents, residency paperwork, healthcare, income proof, housing documents and official copies.",
    metadata: guideMetadataFor(routes.checklist),
    showContinueJourney: false,
    breadcrumbs: [{ label: "Moving to Spain", href: routes.euRoadmap }, { label: "Documents Checklist" }],
    hero: {
      kicker: "Documents and preparation",
      title: "Documents Checklist for Moving to Spain",
      intro: "A practical guide to the documents you may need before and after arriving in Spain, so you can prepare early and avoid unnecessary delays.",
      asideTitle: "Not every item applies",
      asideText: "Your documents depend on nationality, route, municipality and appointment type. Check the requirements for your own procedure before relying on any checklist."
    },
    sections: [
      QuickAnswer("The documents you need depend on your nationality, residency route and local procedure. Many newcomers should prepare identity documents, proof of income, healthcare documents, accommodation documents and copies. Some foreign documents may need translation or legalisation. It is usually better to prepare early than wait until the appointment."),
      AtAGlance([
        ["Core idea", "Prepare identity, income, healthcare, address and appointment documents early."],
        ["Not universal", "Not everyone needs every document on this checklist."],
        ["Local variation", "Requirements may vary by municipality, office and appointment type."],
        ["Foreign documents", "Some documents may need official translation, legalisation or apostille."],
        ["Copies", "Keep originals, paper copies and secure digital scans where possible."]
      ]),
      GuideSection({
        id: "whoThisGuideIsFor",
        title: "Who this guide is for",
        children: Cards([
          { title: "EU citizens moving to Spain", text: "Use this to prepare common documents before padrón, healthcare and EU registration steps." },
          { title: "Non-EU residents", text: "Use this as a general preparation list alongside the requirements for your specific residence route." },
          { title: "Family members", text: "Use this if family status, certificates or supporting documents may be part of your route." },
          { title: "Workers", text: "Use this if employment documents, income proof or Social Security steps may be relevant." },
          { title: "Retirees", text: "Use this if pension, healthcare or income evidence may support your move." },
          { title: "Students", text: "Use this if enrolment, healthcare and accommodation documents may be needed." },
          { title: "Self-employed people", text: "Use this if tax, Social Security, income or activity evidence may be part of your setup." },
          { title: "People preparing admin steps", text: "Use this if you are preparing for padrón, healthcare, banking or residency appointments." }
        ])
      }),
      GuideSection({
        id: "coreDocuments",
        title: "Core documents to prepare",
        children: `${ChecklistBox({
          title: "Document checklist",
          items: [
            "Passport or national ID",
            "Birth certificate, if relevant",
            "Marriage certificate, if relevant",
            "Proof of address",
            "Rental contract or accommodation document",
            "Employment contract, if applicable",
            "Proof of income or savings",
            "Healthcare insurance or entitlement documents",
            "School or university enrolment, if applicable",
            "Pension certificate, if applicable",
            "Criminal record certificate, if required for your route",
            "Passport photos, if required",
            "Appointment confirmations",
            "Paid fee forms",
            "Copies of all important documents"
          ]
        })}${InfoBox({ title: "Not everyone needs every item", text: "Use this as a preparation checklist, not a legal list. Your exact documents depend on your route, appointment and local office." })}`
      }),
      GuideSection({
        id: "euCitizenDocuments",
        title: "Documents for EU citizens",
        children: `${Cards([
          { title: "Identity", text: "Passport or national ID is usually the starting point." },
          { title: "EX-18, where applicable", text: "EU registration may involve the EX-18 form, depending on the procedure." },
          { title: "Route evidence", text: "You may need proof of work, self-employment, studies, retirement or sufficient resources." },
          { title: "Healthcare proof", text: "Healthcare proof can depend on whether you work, study, retire, use S1, have private insurance or use another recognised route." },
          { title: "Fee proof", text: "Modelo 790-012 fee proof may be needed for EU Registration Certificate appointments." },
          { title: "Padrón certificate", text: "A padrón certificate may be requested locally, depending on the office and situation." }
        ])}${WarningBox("Requirements can vary by office and situation. Check the current appointment requirements before attending.")}`
      }),
      GuideSection({
        id: "nonEuDocuments",
        title: "Documents for non-EU citizens",
        children: `${Cards([
          { title: "Visa or authorisation", text: "You may need visa or residence authorisation documents for your route." },
          { title: "Passport", text: "A valid passport is usually central to non-EU immigration and residence procedures." },
          { title: "TIE appointment", text: "A TIE appointment confirmation may be needed for card-related steps." },
          { title: "Relevant EX form", text: "The relevant EX form depends on the specific procedure." },
          { title: "Photos and fee payment", text: "Passport-style photos and official fee payment may be required." },
          { title: "Address and supporting documents", text: "Proof of address and route-specific supporting documents may be requested." }
        ])}${InfoBox({ title: "Introductory only", text: "Non-EU routes vary significantly. Use the official requirements for your specific visa or residence procedure." })}`
      }),
      GuideSection({
        id: "housingPadronDocuments",
        title: "Housing and padrón documents",
        children: `${ChecklistBox({
          title: "Address evidence you may need",
          items: [
            "Rental contract",
            "Property deed, if owner",
            "Landlord authorisation, if applicable",
            "ID copy of the person authorising registration, if applicable",
            "Utility bill, if requested locally"
          ]
        })}${WarningBox("Padrón document rules vary by municipality. Check your town hall requirements before the appointment.")}`
      }),
      GuideSection({
        id: "healthcareDocuments",
        title: "Healthcare documents",
        children: `${Cards([
          { title: "Private health insurance", text: "A private health insurance certificate may be needed for some routes." },
          { title: "S1 form", text: "An S1 form may be relevant for some pensioners or cross-border healthcare routes." },
          { title: "Work or Social Security", text: "Employment or Social Security registration may support some public healthcare routes." },
          { title: "Regional health service documents", text: "Regional health services may request their own forms or confirmations." },
          { title: "Identity and NIE", text: "Passport, national ID or NIE may be requested depending on the process." },
          { title: "Padrón certificate", text: "A padrón certificate may be required for local health-centre registration." }
        ])}<p>Use the <a href="${routes.healthcare}">Healthcare in Spain Guide</a> to compare healthcare routes before preparing documents.</p>`
      }),
      GuideSection({
        id: "bankFinancialDocuments",
        title: "Bank and financial documents",
        children: `${Cards([
          { title: "Identity", text: "Passport or national ID is commonly requested." },
          { title: "NIE, if available", text: "Some banks may ask for a NIE if you already have one." },
          { title: "Address", text: "Proof of address may be requested depending on the bank and account type." },
          { title: "Income", text: "Employment contract, payslips, proof of income or savings may be requested." },
          { title: "Tax information", text: "Banks may ask for tax residency information." },
          { title: "Residency documents", text: "A residency certificate or card may be requested if available." }
        ])}<p>Use the <a href="${routes.banking}">Opening a Bank Account Guide</a> to prepare bank-specific documents.</p>`
      }),
      GuideSection({
        id: "translationsApostillesCopies",
        title: "Translations, apostilles and copies",
        children: Cards([
          { title: "Official translation", text: "Some foreign documents may need an official translation." },
          { title: "Legalisation or apostille", text: "Some documents may need legalisation or apostille, depending on the procedure and country of issue." },
          { title: "Procedure-specific rules", text: "Do not assume the same translation or apostille rule applies to every appointment." },
          { title: "Originals and copies", text: "Bring originals and copies when possible, unless the appointment instructions say otherwise." },
          { title: "Secure scans", text: "Keep digital scans in a secure place so you can find them quickly." },
          { title: "Check expiry dates", text: "Some documents may need to be recent or valid on the appointment date." }
        ])
      }),
      CommonMistakes([
        "Assuming one checklist fits everyone.",
        "Forgetting copies.",
        "Relying only on phone screenshots.",
        "Not checking document expiry dates.",
        "Not preparing translations early.",
        "Bringing documents that are not accepted locally.",
        "Losing appointment confirmations.",
        "Not keeping proof of fee payment.",
        "Assuming padrón requirements are the same everywhere."
      ]),
      RealQuestions([
        { question: "Do I need originals or copies?", answer: "Often you should bring originals and copies where possible. Check the appointment instructions because some procedures may keep copies or ask to see originals." },
        { question: "Do foreign documents need translation?", answer: "Some may need official translation, depending on the document, procedure and country of issue. Check before the appointment." },
        { question: "Do I need an apostille?", answer: "Some foreign documents may need legalisation or apostille. The answer depends on the country of issue and the procedure." },
        { question: "Can I use digital copies?", answer: "Digital scans are useful for your records, but many appointments may still ask for originals or paper copies." },
        { question: "Which documents should I bring from my home country?", answer: "Identity documents, civil-status certificates, education or work documents, pension evidence, criminal-record certificates and healthcare documents may be harder to obtain after moving." },
        { question: "Do EU citizens need the same documents as non-EU citizens?", answer: "No. EU and non-EU routes are different, and requirements also vary by situation." },
        { question: "Should I prepare documents before arriving in Spain?", answer: "Usually yes. Some documents are easier to collect, translate or legalise before you move." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the EU Registration Guide", href: routes.euRegistration }
        ])}${TipBox("Make one folder for originals, one for copies and one secure digital folder. Name files clearly by document type and date.")}`
      })
    ]
  })
});

pages.push({
  route: routes.nonEuRoadmap,
  html: GuideLayout({
    path: routes.nonEuRoadmap,
    canonical: `https://iberigo.eu${routes.nonEuRoadmap}`,
    title: "Moving to Spain as a Non-EU Citizen — IberiGo",
    description: "A practical roadmap for non-EU citizens planning to move to Spain, including common residence routes, documents, healthcare, TIE, appointments and what to prepare.",
    metadata: guideMetadataFor(routes.nonEuRoadmap),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Non-EU Citizen Roadmap" }],
    hero: {
      kicker: "Residence routes",
      title: "Moving to Spain as a Non-EU Citizen",
      intro: "A practical starting point for understanding the main residence routes, what you may need to prepare, and which steps usually come before and after arrival.",
      asideTitle: "Not one process for everyone",
      asideText: "Non-EU immigration rules depend heavily on nationality, route, income, work status and where you apply. Check official requirements for your specific procedure."
    },
    sections: [
      QuickAnswer("Non-EU citizens usually need a visa, residence authorisation or another recognised legal route to live in Spain. The correct process depends on why you are moving. Common routes include work, study, family, retirement or sufficient resources, digital nomad status, self-employment, and joining an EU citizen family member. Many people eventually need a TIE after approval. This roadmap helps you identify the right next guide — it does not replace legal advice."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal advice. Non-EU immigration rules depend heavily on your nationality, residence route, family situation, income, work status and where you apply. Always check the official requirements for your specific procedure before making decisions.")}`
      }),
      AtAGlance([
        ["Visa or authorisation?", "Usually required, depending on your route and nationality."],
        ["Same for everyone?", "No. Requirements depend on your route, nationality and where you apply."],
        ["Common routes", "Work, study, family, retirement or sufficient resources, digital nomad, self-employment, family member of an EU citizen."],
        ["After approval", "Many non-EU residents need a TIE, not a NIE or EU Registration Certificate."],
        ["Professional advice", "May be useful, especially for complex or unusual situations."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Non-EU citizens planning to live in Spain", text: "Use this if you are exploring which route may apply to your situation." },
          { title: "People moving for work", text: "Use this if a job offer or transfer may support a work-based route." },
          { title: "Students", text: "Use this if you are considering study in Spain." },
          { title: "Retirees or people with sufficient resources", text: "Use this if you plan to live in Spain without local employment." },
          { title: "Family members", text: "Use this if you are joining family already living in Spain." },
          { title: "Digital nomads", text: "Use this if you work remotely for employers or clients outside Spain." },
          { title: "Self-employed people", text: "Use this if you plan business or self-employed activity in Spain." },
          { title: "People already in Spain", text: "Use this if you are trying to understand what may apply to your situation now." }
        ])}${InfoBox({ title: "EU, EEA and Swiss citizens", text: "If you are an EU, EEA or Swiss citizen, use the EU Citizen Roadmap instead — the process described there is different from this one." })}`
      }),
      GuideSection({
        id: "chooseYourRoute",
        title: "Choose your route",
        children: StartHereCards([
          { title: "Work in Spain", text: "Work-based routes usually depend on a job offer, employer sponsorship or recognised work authorisation.", href: "#", label: "Coming soon", comingSoon: true },
          { title: "Study in Spain", text: "Study routes usually depend on enrolment, programme length and financial means.", href: routes.students, label: "View the Student Roadmap" },
          { title: "Join family in Spain", text: "Family reunification routes usually depend on the relationship and the sponsoring family member's status.", href: "#", label: "Coming soon", comingSoon: true },
          { title: "Family member of an EU citizen", text: "This route can differ from standard non-EU family routes, depending on the relationship and situation.", href: routes.euFamilyMemberRoadmap, label: "View the Family Member of an EU Citizen Roadmap" },
          { title: "Retire or live from sufficient resources", text: "This route usually depends on proof of income, savings and healthcare cover rather than employment.", href: "#", label: "Coming soon", comingSoon: true },
          { title: "Digital nomad / remote work", text: "This route usually depends on remote employment or client relationships based outside Spain.", href: "#", label: "Coming soon", comingSoon: true },
          { title: "Self-employed / business activity", text: "This route usually depends on the business plan, activity and financial evidence.", href: "#", label: "Coming soon", comingSoon: true },
          { title: "Already in Spain and unsure what applies", text: "Use the Start Here page and this roadmap together to narrow down what may apply.", href: routes.startHere, label: "View Start Here" }
        ])
      }),
      GuideSection({
        id: "beforeYouMove",
        title: "Before you move",
        children: `${Cards([
          { title: "Identify the correct route", text: "The right process depends on why you are moving and your nationality." },
          { title: "Check official requirements", text: "Requirements and accepted evidence can vary by route and by where you apply." },
          { title: "Prepare identity documents", text: "A valid passport is usually central to non-EU procedures." },
          { title: "Prepare civil-status documents, if relevant", text: "Marriage, birth or family documents may matter for some routes." },
          { title: "Prepare income, work or study evidence", text: "Evidence depends on whether your route is based on work, study, resources or family." },
          { title: "Check healthcare requirements", text: "Some routes may require proof of healthcare cover before approval." },
          { title: "Check criminal-record or legalised-document requirements, where applicable", text: "Some routes may ask for a criminal record certificate or legalised civil documents." },
          { title: "Check translation and apostille needs", text: "Some foreign documents may need official translation, legalisation or apostille." }
        ])}<p>Use the <a href="${routes.checklist}">Documents Checklist</a> as a general starting point, then confirm the exact list for your specific procedure.</p>${WarningBox("Avoid relying only on informal advice, forums or social media for document requirements. Check official sources for your route.")}`
      }),
      GuideSection({
        id: "visaAuthorisationResidence",
        title: "Visa, authorisation and residence approval",
        children: `${Cards([
          { title: "Visa first, in some routes", text: "Some routes start with a visa application before travelling to Spain." },
          { title: "Residence authorisation", text: "Some routes may involve a separate residence authorisation process." },
          { title: "Different authorities depending on route", text: "Applications may be handled through consulates, immigration offices or online platforms, depending on the route." },
          { title: "Not covered here", text: "This roadmap does not give route-specific legal instructions. Check the official requirements for your exact procedure." }
        ])}`
      }),
      GuideSection({
        id: "afterApprovalArrival",
        title: "After approval or arrival",
        children: `${Cards([
          { title: "Travel to Spain, if applicable", text: "Some routes require approval before travel; others may not." },
          { title: "Secure accommodation", text: "Your address may affect padrón, healthcare and other later steps." },
          { title: "Register on the padrón, where possible", text: "Padrón requirements can vary by municipality." },
          { title: "Arrange healthcare", text: "Healthcare routes can depend on your residence route and personal situation." },
          { title: "Apply for or collect a TIE, where required", text: "Many non-EU residents need to complete a TIE process after approval." },
          { title: "Open a bank account", text: "A Spanish account can help with everyday payments." },
          { title: "Set up Digital Certificate or Cl@ve, if available", text: "Digital access may help with tax, Social Security and other online procedures." },
          { title: "Understand tax obligations", text: "Tax questions may arise depending on residence, income and assets." }
        ])}${InfoBox({ title: "Order can vary", text: "Not everyone follows the same order. Some steps may happen in parallel, and appointment availability can vary by province and situation." })}`
      }),
      GuideSection({
        id: "tieBasics",
        title: "TIE basics",
        children: `${Cards([
          { title: "What TIE is", text: "TIE (Tarjeta de Identidad de Extranjero) is the physical foreigner identity card used by many non-EU residents." },
          { title: "Not the same as NIE", text: "NIE is an identification number. TIE is a physical card. They are not the same thing." },
          { title: "Not the same as EU Registration", text: "EU Registration is the certificate route used by EU, EEA and Swiss citizens. Non-EU residents normally follow the TIE route instead." },
          { title: "Fingerprinting and collection", text: "Many non-EU residents go through a fingerprinting and card-collection process after approval." },
          { title: "Details depend on your route", text: "Exact steps, timing and required documents depend on your specific residence route." }
        ])}${WarningBox("Do not assume TIE, NIE and EU Registration are interchangeable terms. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Choosing the wrong route for your situation.",
        "Confusing NIE with TIE.",
        "Assuming tourist stay rules allow residence.",
        "Ignoring document legalisation or translation needs.",
        "Waiting too long to check appointment availability.",
        "Assuming rules are the same for every nationality.",
        "Relying only on social media or forums.",
        "Not checking healthcare requirements.",
        "Ignoring tax residency questions."
      ]),
      RealQuestions([
        { question: "Can I move to Spain without being an EU citizen?", answer: "Yes, but you usually need a visa, residence authorisation or another recognised legal route. The correct process depends on your situation and nationality." },
        { question: "Do non-EU citizens need a visa?", answer: "Often yes, depending on the route and the length and purpose of stay. Some routes may involve a visa before travel; others may differ. Check the official requirements for your case." },
        { question: "Is NIE the same as TIE?", answer: "No. NIE is an identification number. TIE is a physical foreigner identity card. Many non-EU residents end up with both, but they are not the same document." },
        { question: "Do I need padrón before TIE?", answer: "It depends on the office and route. Padrón may be requested as part of some procedures. Check the requirements for your specific appointment." },
        { question: "Can I work in Spain as a non-EU citizen?", answer: "It depends on your residence route and any work authorisation attached to it. Some routes allow work; others may restrict it or require a separate step." },
        { question: "Can I study in Spain?", answer: "Study routes exist for non-EU citizens, but requirements depend on the programme, duration and your nationality." },
        { question: "Can I join my EU spouse or partner in Spain?", answer: "Family member of an EU citizen is a distinct route that can differ from standard non-EU family routes. Check the specific requirements that apply to your relationship and situation." },
        { question: "What if I am already in Spain?", answer: "Use the Start Here page and this roadmap together to understand which route may apply, and check official requirements before assuming a specific process fits your situation." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Settling Into Spain Guide", href: routes.settling },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the Taxes in Spain Guide", href: routes.taxes }
        ])}${TipBox("Keep a folder for identity, civil-status, income and translated documents so you can respond quickly once you know your exact route.")}`
      })
    ]
  })
});

pages.push({
  route: routes.euFamilyMemberRoadmap,
  html: GuideLayout({
    path: routes.euFamilyMemberRoadmap,
    canonical: `https://iberigo.eu${routes.euFamilyMemberRoadmap}`,
    title: "Moving to Spain as a Family Member of an EU Citizen — IberiGo",
    description: "A practical roadmap for family members of EU citizens moving to Spain, including eligibility, documents, padrón, healthcare, residence card basics and common mistakes.",
    metadata: guideMetadataFor(routes.euFamilyMemberRoadmap),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Family Member of an EU Citizen" }],
    hero: {
      kicker: "Family residence route",
      title: "Moving to Spain as a Family Member of an EU Citizen",
      intro: "A practical starting point for understanding the family-member route, what you may need to prepare, and which steps usually come before and after applying in Spain.",
      asideTitle: "Not one process for every family",
      asideText: "Family-member residence rules can depend on nationality, relationship type, documents, dependency, the EU citizen's situation and where the application is made."
    },
    sections: [
      QuickAnswer("Some non-EU family members of EU citizens may have a specific residence route in Spain, different from ordinary non-EU visa routes. The relationship to the EU citizen and supporting documents are central to the process. Many successful applicants eventually receive a residence card as a family member of an EU citizen. This roadmap helps you understand the broad journey — it does not replace legal advice."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal advice. Family-member residence rules can depend on nationality, relationship type, documents, dependency, the EU citizen's situation and where the application is made. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Who this may apply to", "Non-EU spouses, recognised partners, children and dependent relatives of an EU citizen."],
        ["Same as ordinary routes?", "No. This is a distinct route from standard non-EU visas and from the EU citizen's own registration."],
        ["Central factor", "The relationship to the EU citizen and the evidence that supports it."],
        ["Usual result", "Many applicants eventually receive a residence card as a family member of an EU citizen."],
        ["Professional advice", "May be useful, especially for less common relationships or complex family situations."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Non-EU spouses of EU citizens", text: "Use this if you are married to an EU, EEA or Swiss citizen and considering Spain." },
          { title: "Registered partners, where recognised", text: "Use this if your partnership may be recognised under the family-member route." },
          { title: "Children, where applicable", text: "Use this if children may be included in a family application." },
          { title: "Dependent relatives, where applicable", text: "Use this if a dependent relative's situation may support a family-member case." },
          { title: "EU citizens bringing or joining family in Spain", text: "Use this if you are the EU citizen supporting a family member's move." },
          { title: "People already in Spain", text: "Use this if you are trying to understand whether the family-member route applies to your situation now." }
        ])}${InfoBox({ title: "If you are the EU citizen yourself", text: "EU citizens should use the EU Citizen Roadmap for their own registration. Non-EU citizens who are not applying through an EU family relationship should use the Non-EU Citizen Roadmap instead." })}`
      }),
      GuideSection({
        id: "relationshipEligibilityBasics",
        title: "Relationship and eligibility basics",
        children: `${Cards([
          { title: "Depends on the relationship", text: "Eligibility depends on the relationship to the EU citizen and the evidence available." },
          { title: "Spouses and partners", text: "Spouses and recognised partners may have different document requirements from each other." },
          { title: "Children and dependants", text: "Children and dependent relatives may need additional evidence of the relationship and dependency." },
          { title: "The EU citizen's situation matters", text: "The EU citizen's own residence or registration situation in Spain can matter to the case." },
          { title: "Varies by case and office", text: "Requirements can vary depending on the specific case and the office handling it." }
        ])}${WarningBox("This is not a definitive eligibility list. Check the official requirements for your specific relationship and situation before assuming you qualify.")}`
      }),
      GuideSection({
        id: "beforeYouStart",
        title: "Before you start",
        children: `${Cards([
          { title: "Identity", text: "A valid passport is usually central to the application." },
          { title: "Proof of relationship", text: "Marriage certificate, partnership certificate or birth certificate may be needed, depending on the relationship." },
          { title: "Legalisation or apostille, if required", text: "Some foreign civil-status documents may need legalisation or apostille." },
          { title: "Sworn translation, if required", text: "Some documents may need an official sworn translation." },
          { title: "The EU citizen's documents", text: "The EU citizen's identity document and evidence of their situation in Spain may be requested." },
          { title: "Address or padrón evidence, where requested", text: "Proof of address may be part of the file, depending on the office." },
          { title: "Healthcare or financial evidence, depending on situation", text: "Some cases may require healthcare cover or financial evidence." }
        ])}<p>Exact documents depend on the relationship, country of issue and procedure. Use the <a href="${routes.checklist}">Documents Checklist</a> as a general starting point, then confirm the exact list for your specific case.</p>`
      }),
      GuideSection({
        id: "movingTogetherVsJoiningLater",
        title: "Moving together vs joining later",
        children: `${Cards([
          { title: "Moving together", text: "Some families move to Spain together and prepare documents in parallel." },
          { title: "Joining later", text: "Others join an EU citizen who is already living in Spain, which can change the practical order of steps." },
          { title: "Order may differ", text: "The practical order of steps may differ depending on which situation applies to you." },
          { title: "Accommodation and padrón can affect timing", text: "Accommodation and padrón preparation can affect how the rest of the process unfolds." },
          { title: "Appointment availability varies", text: "Appointment availability varies by province and office, and can change over time." }
        ])}`
      }),
      GuideSection({
        id: "afterArrivalInSpain",
        title: "After arrival in Spain",
        children: `${Cards([
          { title: "Secure accommodation", text: "Your address may affect padrón, healthcare and later steps." },
          { title: "Register on the padrón, where possible", text: "Padrón requirements can vary by municipality." },
          { title: "Arrange healthcare if needed", text: "Healthcare routes can depend on the family member's and EU citizen's situation." },
          { title: "Prepare family relationship documents", text: "Have relationship evidence, translations and legalisations ready before applying." },
          { title: "Submit the relevant family-member residence application", text: "The application route depends on the case type and office." },
          { title: "Attend fingerprinting or card appointment where required", text: "Many cases involve a fingerprinting or card-collection appointment." },
          { title: "Collect the residence card if approved", text: "Collection procedures depend on the office and case." }
        ])}${InfoBox({ title: "Depends on case type", text: "This process depends heavily on the case type. Do not assume the same order or timing applies to every family." })}`
      }),
      GuideSection({
        id: "residenceCardBasics",
        title: "Residence card basics",
        children: `${Cards([
          { title: "Family-member residence card", text: "Many non-EU family members receive a residence card connected to their status as family member of an EU citizen." },
          { title: "Different from the EU citizen's certificate", text: "This is different from the EU citizen's own green EU Registration Certificate." },
          { title: "Different from a NIE", text: "It is also different from simply having a NIE, which is an identification number, not a residence card." },
          { title: "Appointments and fingerprints", text: "Card procedures may involve appointments, fingerprints and a separate collection step." },
          { title: "Depends on approval and procedure", text: "The exact process depends on approval and the local procedure used by the office." }
        ])}${WarningBox("Do not confuse the family-member residence card, the EU citizen's registration certificate, and a NIE. Confirm which document applies to your case before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming marriage alone automatically solves everything.",
        "Confusing EU Registration with the family-member residence card.",
        "Confusing NIE with residence rights.",
        "Not preparing legalised or translated documents early.",
        "Assuming every municipality or province works the same way.",
        "Signing accommodation without checking padrón possibility.",
        "Relying only on informal advice.",
        "Missing official notifications.",
        "Ignoring healthcare or financial-document requirements."
      ]),
      RealQuestions([
        { question: "Can my non-EU spouse live with me in Spain?", answer: "Often yes, through the family-member route, but it depends on your situation, documents and the relationship recognised by the office handling your case." },
        { question: "Is this the same as a normal non-EU visa?", answer: "No. The family-member route is generally distinct from ordinary non-EU visa routes, though details still depend on your case." },
        { question: "Does marriage automatically give residence?", answer: "No. Marriage may support eligibility, but residence still depends on the application, evidence and approval." },
        { question: "Is NIE the same as residence?", answer: "No. NIE is an identification number. Residence as a family member of an EU citizen is a separate status, usually evidenced by a residence card." },
        { question: "Does the EU citizen need to register first?", answer: "It can matter. The EU citizen's own situation in Spain may be part of the family member's case — check the requirements that apply to your situation." },
        { question: "Do we need padrón?", answer: "It may be requested as part of the process, depending on the office. Check the requirements for your specific application." },
        { question: "What documents prove the relationship?", answer: "Typically a marriage certificate, partnership certificate or birth certificate, depending on the relationship, sometimes with legalisation or translation. Exact needs vary by case." },
        { question: "What if we are already in Spain?", answer: "Use Start Here and this roadmap together to understand which route may apply, and check official requirements before assuming a specific process fits your situation." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, relationship, translated and legalised documents so you can respond quickly once you know your exact case requirements.")}`
      })
    ]
  })
});

pages.push({
  route: routes.students,
  html: GuideLayout({
    path: routes.students,
    canonical: `https://iberigo.eu${routes.students}`,
    title: "Moving to Spain as a Student — IberiGo",
    description: "A practical roadmap for students planning to study in Spain, including study routes, documents, healthcare, accommodation, TIE basics and common mistakes.",
    metadata: guideMetadataFor(routes.students),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Student Roadmap" }],
    hero: {
      kicker: "Study route",
      title: "Moving to Spain as a Student",
      intro: "A practical starting point for understanding student routes, what you may need to prepare, and which steps usually come before and after arriving in Spain.",
      asideTitle: "Not one process for every student",
      asideText: "Student residence rules can depend on your nationality, course type, study length, documents, financial situation, healthcare cover and where you apply."
    },
    sections: [
      QuickAnswer("Students from outside Spain may need a recognised study route, visa or authorisation depending on nationality and length of stay. Requirements can depend on course type, duration, nationality and where the application is made. Non-EU students may eventually need a TIE if staying longer. EU students follow a different process and may need EU Registration if staying longer than three months. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal advice. Student residence rules can depend on your nationality, course type, study length, documents, financial situation, healthcare cover and where you apply. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Visa or authorisation?", "May be required, depending on nationality, course type and study length."],
        ["Same for everyone?", "No. EU and non-EU students follow different processes, and requirements vary by case."],
        ["Non-EU students", "May eventually need a TIE if staying longer."],
        ["EU students", "May need EU Registration if staying longer than three months."],
        ["Professional advice", "May be useful, especially for unusual course types or nationalities."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Non-EU students", text: "Use this if you are planning to study in Spain from outside the EU." },
          { title: "EU students", text: "Use this if you are an EU, EEA or Swiss citizen planning to study in Spain." },
          { title: "Exchange students", text: "Use this if you are studying in Spain as part of an exchange programme." },
          { title: "University students", text: "Use this if you are enrolling in a Spanish university programme." },
          { title: "Language students", text: "Use this if you are attending a language course or school." },
          { title: "Vocational or recognised training students", text: "Use this if you are enrolling in vocational or other recognised training." },
          { title: "People already in Spain", text: "Use this if you are trying to understand whether the student route applies to your situation now." }
        ])}${InfoBox({ title: "Related roadmaps", text: "EU citizens should also check the EU Citizen Roadmap. Non-EU students should also check the Non-EU Citizen Roadmap for the broader non-EU journey." })}`
      }),
      GuideSection({
        id: "beforeYouApplyOrMove",
        title: "Before you apply or move",
        children: `${Cards([
          { title: "Identity", text: "A valid passport or national ID is usually central to the application." },
          { title: "Admission or enrolment proof", text: "Proof of admission or enrolment is usually needed before applying for a study route." },
          { title: "Healthcare cover", text: "Healthcare cover may be required, depending on your route and nationality." },
          { title: "Financial evidence, depending on route", text: "Some routes may require proof of sufficient funds or income." },
          { title: "Accommodation planning", text: "Where you will live can affect padrón and other later steps." },
          { title: "Criminal record certificate, where required", text: "Some routes may ask for a criminal record certificate." },
          { title: "Medical certificate, where required", text: "Some routes may ask for a medical certificate." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." }
        ])}<p>Exact requirements depend on nationality, course type, study length and application route. Use the <a href="${routes.checklist}">Documents Checklist</a> as a general starting point, then confirm the exact list for your specific case.</p>`
      }),
      GuideSection({
        id: "euStudents",
        title: "EU students",
        children: `${Cards([
          { title: "Usually no visa needed", text: "EU, EEA and Swiss students do not usually need a visa to study in Spain." },
          { title: "EU registration if staying longer", text: "If staying longer than three months, EU registration may apply." },
          { title: "Healthcare and resources may matter", text: "Healthcare cover and sufficient resources may matter for EU registration." },
          { title: "Check your exact situation", text: "EU students should check whether their situation falls under student, worker or another route." }
        ])}${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare }
        ])}`
      }),
      GuideSection({
        id: "nonEuStudents",
        title: "Non-EU students",
        children: `${Cards([
          { title: "Visa or study authorisation", text: "Non-EU students may need a student visa or study authorisation depending on their situation." },
          { title: "May start before travel", text: "Some processes may start before travel through a Spanish consulate." },
          { title: "May depend on current status", text: "Other procedures may depend on current legal status and route." },
          { title: "TIE may follow", text: "TIE may be required after approval or arrival." },
          { title: "Different from tourist stays", text: "Student procedures are different from ordinary tourist stays." }
        ])}${SourceLinks([
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist }
        ])}`
      }),
      GuideSection({
        id: "healthcareAndAccommodation",
        title: "Healthcare and accommodation",
        children: `${Cards([
          { title: "Healthcare varies by case", text: "Healthcare requirements can depend on nationality, route and study length." },
          { title: "Private insurance", text: "Some students may need private insurance." },
          { title: "Accommodation affects later steps", text: "Accommodation can affect padrón and later administrative steps." },
          { title: "Temporary accommodation has limits", text: "Temporary accommodation may not always work for every administrative need." },
          { title: "Requirements vary", text: "Requirements vary by case and location." }
        ])}${SourceLinks([
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron }
        ])}`
      }),
      GuideSection({
        id: "tieBasicsForStudents",
        title: "TIE basics for students",
        children: `${Cards([
          { title: "Many non-EU students need one", text: "Many non-EU students staying longer may need a TIE." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      GuideSection({
        id: "workWhileStudying",
        title: "Work while studying",
        children: `${Cards([
          { title: "Limited work may be allowed", text: "Some student routes may allow limited work or require specific conditions." },
          { title: "Depends on status and route", text: "Work rights depend on the student's status, route and current rules." },
          { title: "Verify before accepting work", text: "Students should verify work conditions before accepting work." }
        ])}${WarningBox("Do not assume student status automatically gives work rights. Check the conditions that apply to your specific route before working.")}`
      }),
      CommonMistakes([
        "Assuming every course qualifies for a study route.",
        "Assuming tourist stay is enough for long-term study.",
        "Confusing NIE and TIE.",
        "Ignoring healthcare requirements.",
        "Preparing documents too late.",
        "Ignoring translations, legalisation or apostille needs.",
        "Assuming student status automatically gives work rights.",
        "Waiting until appointments are urgent.",
        "Relying only on informal advice."
      ]),
      RealQuestions([
        { question: "Do I need a visa to study in Spain?", answer: "It depends on your nationality, course type and study length. Some students need a visa or study authorisation; others may not. Check the official requirements for your case." },
        { question: "Can EU citizens study in Spain without a visa?", answer: "Usually yes. EU, EEA and Swiss students do not usually need a visa, though EU registration may apply if staying longer than three months." },
        { question: "Do students need a TIE?", answer: "Many non-EU students staying longer may need a TIE. Requirements depend on your route and approval." },
        { question: "Can students work in Spain?", answer: "It depends on the student's status, route and current rules. Do not assume work rights are automatic — verify before accepting work." },
        { question: "Is NIE the same as TIE?", answer: "No. NIE is an identification number. TIE is a physical foreigner identity card. They are not the same document." },
        { question: "Do I need private health insurance?", answer: "It depends on your route and nationality. Some students may need private insurance; others may use another healthcare route." },
        { question: "Can I use temporary accommodation?", answer: "It may work for some initial needs, but temporary accommodation may not always support every administrative step, such as padrón. Check before relying on it." },
        { question: "What if I am already in Spain?", answer: "Use Start Here and this roadmap together to understand which route may apply, and check official requirements before assuming a specific process fits your situation." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, admission, financial and translated documents so you can respond quickly once you know your exact route requirements.")}`
      })
    ]
  })
});

const skeletons = [
];

for (const [, route, title, description, h1, intro, quick] of skeletons) {
  pages.push({
    route,
    html: basicSkeleton({
      route,
      title,
      description,
      h1,
      intro,
      quick,
      glance: [["Primary question", h1], ["Status", "Skeleton page"], ["Editorial note", reviewPlaceholder]],
      before: [{ title: "Confirm your situation", text: reviewPlaceholder }, { title: "Prepare basics", text: "Keep identity, address and route documents together." }, { title: "Check timing", text: reviewPlaceholder }],
      who: [{ title: "People moving to Spain", text: "Use this when this topic is part of your move." }, { title: "People already living in Spain", text: "Use this when you need to organize daily-life administration." }, { title: "Not sure yet", text: "Start here, then continue to the related guide that fits your situation." }],
      official: [{ title: "Official source check", text: reviewPlaceholder }, { title: "Local variation", text: "Some requirements can vary by situation or location." }, { title: "Do not guess", text: "Use official sources before filing or paying fees." }],
      advice: [{ title: "Keep it simple", text: "Understand the process before collecting every possible document." }, { title: "Save copies", text: "Keep scans and paper copies of important documents." }, { title: "Ask early", text: "Confirm requirements before an appointment or deadline." }],
      documents: ["Identity document", "Address evidence if relevant", "Route-specific documents under editorial review"],
      steps: [{ title: "Understand the purpose", text: "Know what this step is for before starting." }, { title: "Check official or local rules", text: reviewPlaceholder }, { title: "Prepare documents", text: "Use the checklist and keep copies." }, { title: "Complete the process", text: reviewPlaceholder }, { title: "Save proof", text: "Keep confirmations for later steps." }],
      mistakes: ["Treating a draft guide as a final legal checklist.", "Waiting until another process is blocked.", "Using unofficial information without checking official sources."],
      questions: [{ question: "Is this legal advice?", answer: "No. IberiGo gives general guidance only." }, { question: "Are requirements the same everywhere?", answer: "Not always. Some details vary by situation or location." }, { question: "Where is the detailed answer?", answer: reviewPlaceholder }],
      next: "After this step, continue with the related guide that matches your situation.",
      warning: "Do not file, pay or book based only on draft content. Confirm details during editorial review and with official sources.",
      tip: "Use one folder for identity, address, healthcare, money and appointment documents."
    })
  });
}

function run() {
  validateGuideMetadata(pages);

  for (const page of pages) {
    writePage(page.route, page.html);
  }

  writePage("/search/", SearchPage());
  const searchCount = buildSearchIndex(pages);

  validateInternalLinks(pages);

  console.log(`Generated ${pages.length} guide pages with reusable components.`);
  console.log(`Generated search index with ${searchCount} published guides.`);
}

if (require.main === module) {
  run();
}

module.exports = {
  validateInternalLinks,
  run
};
