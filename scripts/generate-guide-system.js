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
  euRegistration: "/guides/eu-registration/",
  padron: "/moving-to-spain/registering-on-the-padron/",
  healthcare: "/moving-to-spain/healthcare/",
  checklist: "/moving-to-spain/documents-checklist/",
  banking: "/living-in-spain/opening-a-bank-account/",
  digital: "/living-in-spain/digital-certificate/",
  social: "/living-in-spain/social-security/",
  taxes: "/living-in-spain/taxes/",
  driving: "/living-in-spain/driving/",
  accommodation: "/moving-to-spain/finding-accommodation/"
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
  [routes.accommodation]: [routes.padron, routes.banking, routes.healthcare]
};

const officialSourcesByRoute = {
  [routes.euRoadmap]: [
    { name: "Spanish Government", note: "General official guidance placeholder. URL to be verified before publication." },
    { name: "Ministry responsible for immigration", note: "EU citizen residence guidance placeholder. URL to be verified before publication." },
    { name: "Police appointment portal", note: "Appointment-system reference placeholder for EU registration steps. URL to be verified before publication." },
    { name: "Local Town Halls", note: "Municipal guidance placeholder for padrón and local address steps. URLs vary by municipality." }
  ],
  [routes.euRegistration]: [
    { name: "Spanish Government", note: "EU citizen registration guidance placeholder. URL to be verified before publication." },
    { name: "Ministry responsible for immigration", note: "Official procedure and document guidance placeholder. URL to be verified before publication." },
    { name: "Police appointment portal", note: "Appointment and form-routing placeholder. URL to be verified before publication." }
  ],
  [routes.padron]: [
    { name: "Spanish Government", note: "General municipal registration reference placeholder. URL to be verified before publication." },
    { name: "Local Town Halls", note: "Padrón requirements and appointment guidance vary by municipality. Local URLs to be verified before publication." }
  ],
  [routes.healthcare]: [
    { name: "Spanish Government", note: "Public healthcare entitlement guidance placeholder. URL to be verified before publication." },
    { name: "Ministry responsible for immigration", note: "Healthcare evidence for EU registration placeholder. URL to be verified before publication." },
    { name: "Regional health services", note: "Health-card process placeholders. URLs and names vary by autonomous community." },
    { name: "Social Security", note: "Work-linked healthcare entitlement placeholder. URL to be verified before publication." }
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
            { title: "I’m a non-EU citizen", text: "Visa and residence routes for non-EU citizens will be added after editorial review.", href: "#", label: "Coming soon", comingSoon: true },
            { title: "I’m joining family in Spain", text: "Family routes vary by relationship, nationality and residence status.", href: "#", label: "Coming soon", comingSoon: true },
            { title: "I’m moving for work", text: "Work routes depend on employment, self-employment and authorization details.", href: "#", label: "Coming soon", comingSoon: true },
            { title: "I’m moving to study", text: "Study routes depend on programme, duration and nationality.", href: "#", label: "Coming soon", comingSoon: true },
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
      title: "Moving to Spain as an EU Citizen: Step-by-Step Guide — IberiGo",
      description: "A practical roadmap for EU, EEA and Swiss citizens moving to Spain, from planning to arrival and everyday setup.",
      metadata: guideMetadataFor(routes.euRoadmap),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "EU Citizen Roadmap" }],
      hero: {
        kicker: "Start here",
        title: "Moving to Spain as an EU Citizen",
        intro: "Planning to move to Spain as an EU citizen? This roadmap shows the usual order of decisions and admin steps, from preparation to settling into daily life.",
        asideTitle: "Follow the journey",
        asideText: "Start with your situation, then move through address, healthcare, registration, banking, tax and driving checks."
      },
      sections: [
        QuickAnswer("EU citizens can move to Spain without a visa, but living in Spain longer term still involves practical admin: housing, padrón, healthcare, EU registration, banking, digital access, tax review and driving checks. The right order depends on your route and local appointment availability."),
        AtAGlance([
          ["Visa required?", "No."],
          ["Staying longer than 3 months?", "EU registration is usually required."],
          ["Can you work?", "Yes."],
          ["TIE card?", "Normally no. EU citizens usually receive a Certificate of Registration."],
          ["Difficulty", "Moderate."],
          ["Typical timeline", "A few weeks after arrival, depending on appointments."]
        ]),
        GuideSection({ id: "howToUse", title: "How to use this guide", children: `<p>Use this as the order-of-operations page. Start with your situation, then follow the links to the detailed guides when a step needs documents or local decisions.</p>` }),
        GuideSection({
          id: "whoNeeds",
          title: "Who this roadmap is for",
          children: Cards([
            { title: "EU, EEA and Swiss citizens", text: "Use this if you can enter Spain under EU free-movement rules and want the usual moving sequence." },
            { title: "People staying longer term", text: "Use this if Spain will become your home rather than a short visit." },
            { title: "People planning the first month", text: "Use this to see which steps often depend on address, healthcare or appointment availability." }
          ])
        }),
        GuideSection({
          id: "whatYouNeed",
          title: "What you need before you start",
          children: Cards([
            { title: "A clear reason for moving", text: "Work, self-employment, study, retirement or savings affects later evidence." },
            { title: "A realistic address plan", text: "Your first home can affect padrón, healthcare, banking and other admin steps." },
            { title: "A document folder", text: "Start with identity, address, healthcare, work or funds evidence, and appointment confirmations." }
          ])
        }),
        GuideSection({
          id: "officialRequirements",
          title: "Official Requirements",
          children: `${Cards([
            { title: "No visa for EU citizens", text: "EU, EEA and Swiss citizens normally do not need a visa to enter Spain for this route." },
            { title: "Longer-term stay", text: "If you live in Spain longer term, you usually need the EU Registration Certificate rather than a TIE card." },
            { title: "Your situation controls the proof", text: "The documents you prepare depend on whether you work, study, retire, run a business or live from savings." }
          ])}<!-- TODO: editorial verification required - confirm official wording and timing before moving this roadmap from draft to review. -->${WarningBox("This roadmap explains the usual sequence. Always check the official appointment instructions for the specific process you are about to complete.")}`
        }),
        GuideSection({
          id: "practicalAdvice",
          title: "Practical Advice",
          children: Cards([
            { title: "Do not wait for perfect order", text: "Appointments may not line up neatly. Prepare documents in parallel so one delay does not block every next step." },
            { title: "Treat address proof as a foundation", text: "Housing and padrón often affect healthcare, banking, school and registration steps." },
            { title: "Keep one Spain folder", text: "Save identity, address, healthcare, registration, banking and tax documents in one place from the first week." }
          ])
        }),
        GuideSection({
          id: "phaseOne",
          title: "Step 1: Plan your route",
          children: StepTimeline([
            { title: "Confirm your route", text: "Your evidence depends on whether you are working, self-employed, studying, retired, or living from savings." },
            { title: "Prepare your documents", text: "Make a small folder for identity, work or funds, healthcare and address documents." },
            { title: "Plan your move", text: "Plan the first month around address proof and appointments, not only travel logistics." }
          ])
        }),
        GuideSection({
          id: "phaseTwo",
          title: "Step 2: Handle arrival admin",
          children: `${StepTimeline([
            { title: "Secure accommodation", text: "Your address affects padrón, banking, healthcare and many local admin steps." },
            { title: "Register on the padrón", text: "The padrón is town hall address registration and often acts as local address evidence." },
            { title: "Arrange your healthcare", text: "Healthcare comes before EU registration for many non-working or self-sufficient EU citizens because proof of cover may be needed." },
            { title: "Register as an EU citizen", text: "Prepare your EX-18 route evidence and book the correct EU registration appointment." }
          ])}${WarningBox("EU citizens normally apply for the EU Registration Certificate, not a TIE. TIE cards are generally for non-EU nationals.")}`
        }),
        GuideSection({
          id: "phaseThree",
          title: "Step 3: Settle into daily life",
          children: StepTimeline([
            { title: "Register with Social Security, if applicable", text: "Separate getting a Social Security number from being registered as active for work." },
            { title: "Open a bank account", text: "Compare documents, fees and account options before choosing." },
            { title: "Get a Digital Certificate or Cl@ve", text: "Digital access helps with tax, Social Security and many public services." },
            { title: "Understand your tax obligations", text: "Review tax risk early, especially if you have income or assets outside Spain." },
            { title: "Check your driving licence", text: "Driving rules depend on where your licence was issued and whether you become resident." }
          ])
        }),
        CommonMistakes([
          "Assuming EU freedom of movement means there is no local administration.",
          "Booking a TIE appointment when the EU Registration Certificate is the relevant route.",
          "Leaving healthcare evidence until the EU registration appointment.",
          "Signing accommodation without checking whether it can support padrón registration.",
          "Ignoring tax and driving questions until they become urgent."
        ]),
        RealQuestions([
          { question: "Do EU citizens need a visa to move to Spain?", answer: "Normally no. EU citizens do not usually need a visa for this route, but longer-term residence registration and local admin can still apply." },
          { question: "Should I get the padrón before EU registration?", answer: "It is often useful and may be requested. Check your appointment instructions and prepare address evidence early." },
          { question: "Does every EU citizen need private health insurance?", answer: "No. Healthcare evidence depends on whether you work, are self-employed, retired, studying or living from savings." },
          { question: "Is the TIE for EU citizens?", answer: "Usually no. EU citizens normally use the Certificate of Registration route. TIE cards are generally for non-EU nationals." }
        ]),
        GuideSection({ id: "whatHappensNext", title: "What Happens Next?", children: `<p>Start with the <a href="${routes.checklist}">Documents Checklist</a>, then move through accommodation, padrón, healthcare and EU registration as your situation becomes clear.</p>` }),
        GuideSection({ id: "youreReady", title: "Ready for the next step", children: `<p>You have the main sequence most EU citizens follow when moving to Spain. From here, use the detailed IberiGo guides for each step instead of trying to solve everything on one page.</p>` })
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
            { title: "Official requirements", text: "Banks must identify customers, but accepted documents and account types can vary by bank and by your situation." },
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
          { question: "Should I do everything in this exact order?", answer: "Use this as the normal sequence, but adapt it to your situation and local appointment availability. Some preparation can happen in parallel." },
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
      title: "EU Registration Certificate in Spain — IberiGo",
      description: "A practical guide to the EU Registration Certificate in Spain for EU, EEA and Swiss citizens staying longer term.",
      metadata: guideMetadataFor(routes.euRegistration),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "EU Registration Certificate" }],
      hero: {
        kicker: "Core guide",
        title: "EU Registration Certificate in Spain",
        intro: "EU, EEA and Swiss citizens who live in Spain longer term usually need to register through the Certificate of Registration route.",
        asideTitle: "Not a TIE",
        asideText: "EU citizens normally apply for the EU Registration Certificate. TIE cards are generally for non-EU nationals."
      },
      sections: [
        QuickAnswer("If you are an EU, EEA or Swiss citizen living in Spain longer term, the usual route is the EU Registration Certificate. The evidence depends on whether you work, study, have funds or have another basis for residence."),
        AtAGlance([
          ["Common form", "EX-18"],
          ["Common fee generator", "Modelo 790-012"],
          ["Card type", "EU Registration Certificate, not TIE"],
          ["Main dependency", "Your evidence depends on why you live in Spain."]
        ]),
        GuideSection({ id: "beforeStart", title: "Before You Start", children: `${Cards(["Confirm whether you are working, self-employed, studying, retired, or living from savings.", "Prepare identity, address, healthcare and route evidence.", "Check the official appointment wording before booking."])}${TipBox("If you are not working, arrange healthcare evidence before the registration appointment.")}` }),
        GuideSection({ id: "whoNeeds", title: "Do I need this?", children: Cards([
          { title: "You probably need this", text: "If you are an EU, EEA or Swiss citizen living in Spain longer term, this is usually the registration route to understand." },
          { title: "This is not a visa", text: "You do not need this to enter Spain as an EU citizen, but you may need it once you live here." },
          { title: "This is not a TIE", text: "Use this guide if you are preparing the EU Registration Certificate rather than a non-EU residence card." }
        ]) }),
        GuideSection({ id: "officialRequirements", title: "Official Requirements", children: `${Cards([
          "The procedure is for EU, EEA and Swiss citizen registration.",
          "Evidence depends on your situation, such as work, self-employment, study, sufficient funds or healthcare cover.",
          "The common form is EX-18 and the common fee form is Modelo 790-012, but appointment instructions should be checked before attending."
        ])}<!-- TODO: editorial verification required - confirm province-specific evidence lists and fee wording before review status. -->${WarningBox("Use the EU registration route. Do not book a TIE card appointment unless a separate official process tells you to.")}` }),
        GuideSection({ id: "practicalAdvice", title: "Practical Advice", children: `${Cards([
          "Prepare your NIE details and padrón certificate if requested.",
          "Bring copies and originals where the appointment instructions ask for them.",
          "If you are not working, settle your healthcare evidence before the appointment.",
          "Keep the certificate safe after the appointment. You may need it for banking, healthcare, work and other administration."
        ])}${TipBox("Read the Healthcare Guide before your appointment if your route depends on private cover, S1 or another entitlement.")}` }),
        GuideSection({
          id: "documentsChecklist",
          title: "Documents Checklist",
          children: `${ChecklistBox({
            title: "Documents to prepare",
            items: ["Passport or EU national ID", "EX-18", "Padrón if requested", "Work, funds, study or healthcare evidence", "Modelo 790-012 payment proof"]
          })}<!-- TODO: editorial verification required - confirm province-specific document wording before review status. -->${InfoBox({ title: "Document check", text: "Use this as a preparation list, then compare it with the official appointment instructions for your route." })}`
        }),
        GuideSection({ id: "stepProcess", title: "Step-by-Step Process", children: StepTimeline([{ title: "Confirm your basis", text: "Work, self-employment, study, retirement or savings can lead to different evidence." }, { title: "Prepare documents", text: "Collect identity, address and route evidence." }, { title: "Pay the fee", text: "Use the official Modelo 790-012 generator." }, { title: "Attend the appointment", text: "Bring the documents requested for your appointment." }]) }),
        CommonMistakes(["Confusing EU registration with a TIE card.", "Preparing healthcare evidence too late.", "Booking the wrong appointment label.", "Assuming every province asks for documents in the same way."]),
        RealQuestions([{ question: "Do EU citizens need a visa?", answer: "No, but longer-term residence registration can still be required." }, { question: "Is this the same as NIE?", answer: "No. NIE is an identification number; EU registration is a residence registration certificate." }, { question: "What exact evidence applies to me?", answer: "It depends on your basis for living in Spain and the appointment instructions. Do not rely on another person’s document list without checking your route." }]),
        GuideSection({ id: "whatHappensNext", title: "What Happens Next?", children: `<p>After registration, continue with <a href="${routes.healthcare}">healthcare</a>, Social Security if working, <a href="${routes.banking}">banking</a>, digital access and tax review.</p>` })
      ]
    })
  }
];

pages.push({
  route: routes.padron,
  html: GuideLayout({
    path: routes.padron,
    canonical: `https://iberigo.eu${routes.padron}`,
    title: "How to Register on the Padrón in Spain — IberiGo",
    description: "Learn how to register on the padrón in Spain, what documents you'll usually need, how appointments work, and common mistakes to avoid.",
    metadata: guideMetadataFor(routes.padron),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Padrón" }],
    hero: {
      kicker: "Municipal registration",
      title: "How to Register on the Padrón in Spain",
      intro: "The padrón is Spain’s local town hall address register. This guide explains what it is, who usually registers, what documents are commonly requested, and how the process normally works.",
      asideTitle: "Local rules matter",
      asideText: "The padrón is managed by each municipality. Requirements and appointment systems can vary from one town hall to another."
    },
    sections: [
      QuickAnswer("The padrón is municipal registration with the town hall where you live. It records your address in that municipality. It is useful for many practical steps in Spain, but it is not the same as getting residence permission."),
      AtAGlance([
        ["What it is", "Town hall address registration."],
        ["Where you do it", "At the town hall for the municipality where you live."],
        ["Does it prove residency?", "No. It records your local address; it does not grant immigration status."],
        ["Do rules vary?", "Yes. Document lists and appointment systems can vary between municipalities."],
        ["Typical use", "Address evidence for local services, healthcare, schooling, some residence processes and everyday administration."]
      ]),
      GuideSection({
        id: "beforeStart",
        title: "Before You Start",
        children: `${Cards([
          { title: "Find your municipality", text: "Use the town hall that covers the address where you actually live." },
          { title: "Check local rules", text: "Do not assume another city’s document list applies to you." },
          { title: "Prepare address evidence", text: "Your town hall will normally want to see why you can register at that address." }
        ])}${TipBox("Before signing a rental contract, ask whether you can use the address for padrón registration if you need it.")}`
      }),
      GuideSection({
        id: "whatIsPadron",
        title: "What is the Padrón?",
        children: `${Cards([
          { title: "Municipal register", text: "The padrón, formally the padrón municipal, is the local register of people living in a municipality." },
          { title: "Address record", text: "It connects you to an address in a town or city. It is not an immigration permit." },
          { title: "Local administration", text: "Town halls use it for planning and local services. Other offices may ask for a certificate or volante as address evidence." }
        ])}${WarningBox("Registering on the padrón is different from obtaining residency. It does not give you the right to live or work in Spain by itself.")}`
      }),
      GuideSection({
        id: "whoShouldRegister",
        title: "Do I need this?",
        children: Cards([
          { title: "You live at a Spanish address", text: "If you are living in a Spanish municipality, padrón registration is often one of the first local admin steps." },
          { title: "Another process asks for address proof", text: "Healthcare, EU registration, school, social services or other administration may ask for padrón evidence." },
          { title: "You moved municipality", text: "If you move to a new municipality, you may need to register at the new address." }
        ])
      }),
      GuideSection({
        id: "whoCannotRegister",
        title: "Who usually cannot register?",
        children: `${Cards([
          { title: "People without a real local address", text: "You normally need to register where you actually live." },
          { title: "People without acceptable address evidence", text: "If you cannot show the town hall why you can use the address, the process may be blocked." },
          { title: "People using someone else’s address without permission", text: "Many town halls require the owner, tenant or host to authorize registration if the home is not in your name." }
        ])}${WarningBox("Local practices differ. If your housing situation is unusual, check directly with the town hall before assuming you can register.")}`
      }),
      GuideSection({
        id: "officialRequirements",
        title: "Official Requirements",
        children: `${Cards([
          { title: "Register where you live", text: "The padrón is handled by the municipality where you actually live." },
          { title: "Show identity", text: "Town halls normally ask for identity documents for the people being registered." },
          { title: "Show address evidence", text: "Town halls normally ask for proof that you can register at that address, such as a rental contract, property document or authorization." }
        ])}<!-- TODO: editorial verification required - confirm whether municipality-specific examples need official source links before review status. -->${WarningBox("The padrón is local. Use your town hall’s current requirements, not a document list copied from another municipality.")}`
      }),
      GuideSection({
        id: "whyImportant",
        title: "Why is the Padrón important?",
        children: Cards([
          { title: "It proves where you live locally", text: "Many offices use the padrón certificate or volante as address evidence." },
          { title: "It can unlock next steps", text: "Healthcare, EU registration, school registration and some local services may ask for it." },
          { title: "It keeps your local record current", text: "If you move, the new municipality may need your updated registration." }
        ])
      }),
      GuideSection({
        id: "practicalAdvice",
        title: "Practical Advice",
        children: `${Cards([
          { title: "Check before you sign", text: "If you need padrón registration, ask about it before committing to accommodation." },
          { title: "Bring address permission", text: "If the contract is not in your name, ask the owner, tenant or host what authorization the town hall accepts." },
          { title: "Keep a recent copy", text: "Other offices may ask for a recent certificate or volante, so know how to request a fresh version." }
        ])}${TipBox("If housing is still uncertain, read the Accommodation Guide before relying on an address for later admin.")}`
      }),
      GuideSection({
        id: "documentsUsuallyNeed",
        title: "What you need",
        children: `${ChecklistBox({
          title: "Common documents to prepare",
          items: [
            "Passport, EU national ID, NIE or TIE if you have one.",
            "Rental contract, property deed, authorization from the owner or tenant, or other accepted address evidence.",
            "Completed town hall form if your municipality provides one.",
            "Appointment confirmation if the town hall uses appointments.",
            "Copies of documents if the town hall requests them."
          ]
        })}${InfoBox({ title: "Local variation", text: "This is a general preparation list. Town halls can ask for different documents depending on the municipality and your housing situation." })}`
      }),
      GuideSection({
        id: "stepProcess",
        title: "Step-by-Step Process",
        children: StepTimeline([
          { title: "Identify the correct town hall", text: "Use the municipality where your home is located." },
          { title: "Check the local appointment system", text: "Some town halls use online appointments. Others allow in-person or local office filing." },
          { title: "Prepare identity and address evidence", text: "Bring the documents your municipality asks for, plus copies if requested." },
          { title: "Attend the appointment or submit locally", text: "The town hall checks your identity and whether the address evidence is acceptable." },
          { title: "Request proof of registration", text: "Ask whether you receive a certificado de empadronamiento, volante, or another confirmation." },
          { title: "Keep it for next steps", text: "Save the document with your Spain paperwork. Other processes may ask for a recent version." }
        ])
      }),
      CommonMistakes([
        "Assuming all town halls ask for identical documents.",
        "Signing housing without checking whether padrón registration is possible.",
        "Confusing padrón registration with immigration residence permission.",
        "Waiting until another appointment is blocked by missing address evidence.",
        "Bringing only digital copies when paper copies or originals are requested."
      ]),
      RealQuestions([
        { question: "Is the padrón the same as residency?", answer: "No. The padrón records your local address. Residency or residence registration is a separate process." },
        { question: "Do all town halls ask for the same documents?", answer: "No. Requirements can vary between municipalities and housing situations." },
        { question: "Can I register if I live with someone else?", answer: "Often you need permission or evidence from the owner, tenant or host. The exact document can vary locally." },
        { question: "What document do I get after registering?", answer: "Town halls may issue or allow you to request a certificate or volante showing your registration. Local wording can vary." },
        { question: "Do I need this before EU registration?", answer: "It is commonly useful and may be requested. Check the appointment instructions for your exact province and procedure." },
        { question: "Can I use a hotel or short stay address?", answer: "This depends on local rules and your actual housing situation. Ask the town hall before relying on it." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "What Happens Next?",
        children: `<p>After registering on the padrón, keep the proof safe. You may need it for EU registration, healthcare, banking, school registration, digital access or other local administration.</p>${TipBox("If another office asks for a recent padrón certificate, check whether your town hall lets you request an updated copy online or in person.")}`
      })
    ]
  })
});

pages.push({
  route: routes.healthcare,
  html: GuideLayout({
    path: routes.healthcare,
    canonical: `https://iberigo.eu${routes.healthcare}`,
    title: "Healthcare in Spain for EU Citizens — IberiGo",
    description: "Healthcare in Spain for EU citizens moving to Spain, including work, self-employment, retirement, study, savings, S1 certificates and health cards.",
    metadata: guideMetadataFor(routes.healthcare),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Healthcare" }],
    hero: {
      kicker: "EU citizen guide",
      title: "Healthcare in Spain for EU Citizens",
      intro: "Healthcare in Spain depends on why you are moving. This guide separates the main EU citizen situations so you can see which route may apply before EU registration or daily-life setup.",
      asideTitle: "No single answer",
      asideText: "A worker, retiree, student and self-sufficient person may need different healthcare evidence. Do not assume everyone needs private insurance."
    },
    sections: [
      QuickAnswer("Your healthcare route depends on why you are moving to Spain. If you work or are self-employed, public healthcare may connect to Social Security. If you are retired, an S1 certificate may apply. If you study or live from savings, you may need public entitlement or comprehensive private cover, especially when proving healthcare for EU registration."),
      AtAGlance([
        ["Main question", "Why are you moving to Spain?"],
        ["Everyone needs private insurance?", "No. It depends on your situation."],
        ["EU registration link", "Healthcare evidence may be required depending on the applicant’s circumstances."],
        ["Public healthcare route", "Usually linked to recognized entitlement, Social Security, or an S1-type route."],
        ["Health card", "Issued through the regional health service after your right to healthcare is recognized."],
        ["Local variation", "Health cards and registration steps can vary by autonomous community."]
      ]),
      GuideSection({
        id: "beforeStart",
        title: "Before You Start",
        children: `${Cards([
          { title: "Name your route", text: "Decide whether your likely route is work, self-employment, S1, student cover, private insurance or another public entitlement." },
          { title: "Check timing", text: "Healthcare proof may be needed before EU registration, especially if you are not working." },
          { title: "Separate temporary and resident cover", text: "EHIC and travel cover are not the same as planning healthcare as a resident." }
        ])}${TipBox("If you are preparing EU registration, read this page before booking or attending the EU Registration Certificate appointment.")}`
      }),
      GuideSection({
        id: "routeApplies",
        title: "Which healthcare route applies to me?",
        children: `<table class="guide-table"><tbody>
          <tr><th>Your situation</th><td><strong>Likely starting point</strong></td></tr>
          <tr><th>Working as an employee</th><td>Check Social Security registration and public healthcare entitlement through work.</td></tr>
          <tr><th>Self-employed</th><td>Check autónomo registration, Social Security contribution and healthcare entitlement.</td></tr>
          <tr><th>Retired</th><td>Check whether an S1 certificate from your competent country applies.</td></tr>
          <tr><th>Student</th><td>Check whether you have accepted public entitlement or need comprehensive health insurance.</td></tr>
          <tr><th>Living from savings</th><td>Check whether you need comprehensive private insurance or another accepted healthcare entitlement for EU registration.</td></tr>
        </tbody></table>${WarningBox("Healthcare requirements for EU registration depend on the applicant’s circumstances. Do not use one person’s route as proof that the same evidence applies to you.")}`
      }),
      GuideSection({
        id: "whoNeeds",
        title: "Do I need this?",
        children: Cards([
          { title: "You are moving to Spain", text: "Use this if you need to understand which healthcare route may apply before settling in." },
          { title: "You are not working in Spain", text: "Use this if your route may depend on private cover, S1 or another accepted entitlement." },
          { title: "You work or will be self-employed", text: "Use this to connect Social Security registration with public healthcare planning." }
        ])
      }),
      GuideSection({
        id: "officialRequirements",
        title: "Official Requirements",
        children: `${Cards([
          { title: "Evidence follows your situation", text: "EU registration and healthcare access can depend on whether you work, are self-employed, study, receive an S1 or live from savings." },
          { title: "Public entitlement must be recognized", text: "Public healthcare usually starts with a recognized entitlement before the regional health service issues a card." },
          { title: "Private cover may need to be comprehensive", text: "If private insurance is your evidence route, check that the policy is suitable for living in Spain and for the process using it." }
        ])}<!-- TODO: editorial verification required - confirm accepted insurance wording and regional card process details before review status. -->${WarningBox("Do not treat travel insurance or an EHIC as automatic proof for living in Spain. Check the evidence required for your route.")}`
      }),
      GuideSection({
        id: "practicalAdvice",
        title: "Practical Advice",
        children: Cards([
          { title: "Start with your reason for moving", text: "The right healthcare route is usually easier to identify once you know whether work, self-employment, retirement, study or savings applies." },
          { title: "Ask for written proof", text: "Keep certificates, policy summaries, Social Security evidence and regional health-service confirmations." },
          { title: "Plan for local variation", text: "The health card name, appointment process and documents can vary by autonomous community." }
        ])
      }),
      GuideSection({
        id: "workingSpain",
        title: "Working in Spain",
        children: `${Cards([
          { title: "Official requirement", text: "If you are working as an employee, your employer-related Social Security registration is usually the starting point for public healthcare entitlement." },
          { title: "Practical advice", text: "Confirm that your employer has handled the correct work registration before relying on healthcare access." },
          { title: "What to keep", text: "Save your Social Security number, work registration evidence and any healthcare entitlement confirmation." }
        ])}${TipBox("Ask your employer who handles Social Security registration and when you can request or activate your regional health card.")}`
      }),
      GuideSection({
        id: "selfEmployed",
        title: "Self-employed",
        children: `${Cards([
          { title: "Official requirement", text: "Self-employed EU citizens usually need to look at autónomo registration and Social Security contribution as the starting point." },
          { title: "Practical advice", text: "Do not separate healthcare planning from your tax and autónomo setup. They often move together." },
          { title: "What to keep", text: "Save autónomo registration, Social Security documents and payment confirmations." }
        ])}${WarningBox("Self-employment setup has tax and Social Security consequences. Get qualified help if you are unsure.")}`
      }),
      GuideSection({
        id: "retired",
        title: "Retired",
        children: `${Cards([
          { title: "Official requirement", text: "Many EU retirees start by checking whether their competent country can issue an S1 certificate for healthcare in Spain." },
          { title: "Practical advice", text: "Request the S1 early. It can take time, and you may need it before completing later steps in Spain." },
          { title: "What to keep", text: "Keep the S1 certificate, identity documents, address evidence and any Spanish health service registration proof." }
        ])}${TipBox("If the S1 route applies to you, keep copies of the certificate before handing documents to any office.")}`
      }),
      GuideSection({
        id: "student",
        title: "Student",
        children: `${Cards([
          { title: "Official requirement", text: "Students should check whether they have public healthcare entitlement, accepted EU coverage, or need comprehensive insurance." },
          { title: "Practical advice", text: "Ask your school or university what proof they expect, but verify official requirements separately." },
          { title: "What to keep", text: "Keep enrolment proof, insurance documents, public entitlement evidence and identity documents together." }
        ])}${InfoBox({ title: "Editorial note", text: "Student healthcare evidence can depend on the programme, length of stay and personal situation." })}`
      }),
      GuideSection({
        id: "livingFromSavings",
        title: "Living from savings",
        children: `${Cards([
          { title: "Official requirement", text: "EU citizens who are not working may need to show sufficient healthcare cover when registering as residents." },
          { title: "Practical advice", text: "Do not assume travel insurance is enough for living in Spain. Check whether the cover is comprehensive and accepted for your process." },
          { title: "What to keep", text: "Keep policy documents, coverage summaries, payment proof and any official entitlement evidence." }
        ])}${WarningBox("This is the situation where people often wrongly assume private insurance is optional or that travel insurance is enough. Verify before the EU registration appointment.")}`
      }),
      GuideSection({
        id: "privateInsurance",
        title: "Private health insurance",
        children: `${Cards([
          { title: "When it may be relevant", text: "Private insurance may be relevant if you are not covered through work, self-employment, an S1 or another public entitlement." },
          { title: "What to check", text: "Check whether the policy is comprehensive, valid in Spain, and suitable for the process you are using it for." },
          { title: "What not to assume", text: "Do not assume every policy, travel policy, excess or limited cover will be accepted." }
        ])}${TipBox("Ask the insurer for a clear certificate or policy summary in a format you can show during admin steps.")}`
      }),
      GuideSection({
        id: "publicHealthcare",
        title: "Public healthcare",
        children: `${Cards([
          { title: "What it means", text: "Public healthcare access generally starts with a recognized right to healthcare, then registration with the regional health service." },
          { title: "Common starting points", text: "Work registration, self-employment registration, recognized dependent status, or an S1-type route may be relevant depending on your situation." },
          { title: "Regional card", text: "Once your right is recognized, the regional health service can issue the local health card." }
        ])}${WarningBox("Spain’s public healthcare system is national in structure but administered through regional health services. The card name and steps can vary by autonomous community.")}`
      }),
      GuideSection({
        id: "s1Certificate",
        title: "S1 certificate",
        children: `${Cards([
          { title: "What it is for", text: "An S1 certificate can allow certain people, often pensioners or posted workers, to register healthcare cover in another EU country." },
          { title: "Who issues it", text: "The competent country normally issues the S1, not the Spanish health centre." },
          { title: "What to do next", text: "Once issued, it is normally used in Spain to register healthcare entitlement through the relevant process." }
        ])}${InfoBox({ title: "Check your country", text: "Whether you can get an S1 depends on your personal situation and competent country. Check with the institution responsible for your healthcare cover." })}`
      }),
      GuideSection({
        id: "sipCard",
        title: "How to get a SIP card",
        children: `${Cards([
          { title: "What SIP means", text: "SIP is the common name for the health card in the Valencian Community. Other regions use names such as tarjeta sanitaria individual or their own regional wording." },
          { title: "Step 1", text: "First, confirm your right to healthcare through work, self-employment, S1, public entitlement or accepted cover." },
          { title: "Step 2", text: "Then follow your regional health service process to register and request the health card." }
        ])}${ChecklistBox({
          title: "Documents often useful for a regional health card",
          items: [
            "Identity document.",
            "NIE or residence/registration details if you have them.",
            "Padrón or local address evidence if requested.",
            "Proof of healthcare entitlement, such as Social Security recognition or S1 registration.",
            "Contact details and regional application form if required."
          ]
        })}${WarningBox("SIP is region-specific wording. Do not assume the same card name or exact process applies outside the Valencian Community.")}`
      }),
      CommonMistakes([
        "Assuming every EU citizen needs private insurance.",
        "Assuming no EU citizen needs private insurance.",
        "Using travel insurance as if it were long-term resident healthcare cover.",
        "Leaving healthcare proof until the EU registration appointment.",
        "Confusing an EHIC for temporary stays with resident healthcare planning.",
        "Following a province-specific process without checking whether it applies to your region."
      ]),
      RealQuestions([
        { question: "Do all EU citizens moving to Spain need private health insurance?", answer: "No. It depends on why you are moving and whether you have public healthcare entitlement through work, self-employment, S1 or another accepted route." },
        { question: "Do I need healthcare proof for EU registration?", answer: "It depends on your circumstances. Non-working or self-sufficient applicants often need to show healthcare cover, while workers may use work-related evidence." },
        { question: "Is EHIC enough if I move to Spain?", answer: "EHIC is for temporary stays. Moving to Spain normally requires thinking about resident healthcare access, not only travel cover." },
        { question: "What is the difference between SIP and a health card?", answer: "SIP is the Valencian Community health card name. Other regions use different wording for their regional health card." },
        { question: "Can I get public healthcare if I work in Spain?", answer: "Work registration and Social Security are usually the starting point, but you should confirm your registration and health entitlement." },
        { question: "Should I arrange healthcare before EU registration?", answer: "Yes, if your EU registration route may require healthcare evidence. Do not wait until the appointment to discover what proof you need." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "What Happens Next?",
        children: `<p>Once you understand your healthcare route, prepare the proof that matches your situation. Then continue with EU registration, banking, digital access and tax planning.</p>${TipBox("Keep healthcare documents in the same folder as your identity, padrón and EU registration paperwork.")}`
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
        ])}<!-- TODO: editorial verification required - add a dedicated self-employed/autónomo guide route before linking this section. -->${WarningBox("Do not start invoicing or self-employed activity based only on this overview. Get qualified advice if you are unsure.")}`
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
        { question: "Do I need to declare income from Finland or another country?", answer: "If Spain treats you as tax resident, worldwide income may need to be declared. Tax treaties may affect the outcome, so get advice if you have foreign income." },
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
        ])}<!-- TODO: Create separate guide for bringing a car to Spain. -->${InfoBox({ title: "Keep the topics separate", text: "Licence exchange, vehicle registration, insurance and ITV are connected in everyday driving, but they are different administrative questions." })}`
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
        { question: "Do I need to exchange my Finnish licence?", answer: "A Finnish licence is an EU licence, so it is generally recognised while valid. If it expires while you are resident in Spain, renewal may need to happen in Spain." },
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
      QuickAnswer("Many newcomers start with temporary accommodation before signing a long-term rental. Long-term rentals often require documents and proof of income. The padrón may depend on having an address where registration is possible. Rental contracts should be reviewed carefully before signing. Scams and misleading listings are possible, especially online."),
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
          { title: "Long-term: more documents", text: "Long-term rentals usually require more documents and stronger proof of income or guarantees." },
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
          { title: "Verify before paying", text: "Never send large payments without verifying the property, contract and recipient." },
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

const skeletons = [
  ["documents-checklist", routes.checklist, "Moving to Spain documents checklist — IberiGo", "Draft checklist for documents people commonly prepare before moving to Spain.", "Documents Checklist for Moving to Spain", "A calm document checklist helps you prepare without pretending every route has the same requirements.", "Start with identity, address, healthcare, money and purpose evidence. Route-specific detail comes during editorial review."],
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
