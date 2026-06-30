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
  euRoadmap: "/moving-to-spain/eu-citizens/",
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
  [routes.euRoadmap]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["EU citizens moving to Spain", "EEA citizens moving to Spain", "Swiss citizens moving to Spain"],
    keywords: ["EU citizen", "EU registration", "moving to Spain", "roadmap", "padrón", "healthcare", "banking", "taxes"]
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
    [routes.euRoadmap]: { next: routes.checklist },
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

const pages = [
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
    description: "Learn how bank accounts work when moving to Spain, what documents banks may ask for, and how to choose between Spanish banks and starter online options.",
    metadata: guideMetadataFor(routes.banking),
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Bank Account" }],
    hero: {
      kicker: "Everyday setup",
      title: "Opening a Bank Account in Spain",
      intro: "A bank account makes everyday life easier in Spain. It can help with rent, salary, utilities, local payments and tax admin, but the right account depends on whether you are already resident and what documents you have.",
      asideTitle: "Start practical",
      asideText: "You do not always need the perfect long-term bank on day one. Some people start with a flexible online option while preparing local documents."
    },
    sections: [
      QuickAnswer("Most people moving to Spain need a bank account for rent, salary, utilities and daily payments. Banks usually need to identify you and may ask for passport or ID, NIE or TIE if you have one, address evidence, income evidence and your tax-residence information. Exact requirements vary by bank and by account type."),
      AtAGlance([
        ["Main question", "Do you need a resident account, non-resident account, or temporary starter option?"],
        ["Usually useful for", "Rent, salary, utilities, card payments, tax and direct debits."],
        ["Documents vary?", "Yes. Each bank can apply its own onboarding checks."],
        ["NIE required?", "Often requested, but some banks offer non-resident or newcomer paths."],
        ["Spanish IBAN", "Useful for local direct debits and some landlords or employers."],
        ["Next step", "Prepare documents, compare account fees, then choose a bank that fits your situation."]
      ]),
      GuideSection({
        id: "beforeStart",
        title: "Before You Start",
        children: `${Cards([
          { title: "Know why you need it", text: "Salary, rent, utilities, savings, self-employment and daily spending can point to different account needs." },
          { title: "Check your document stage", text: "Your options may differ if you already have NIE, padrón, EU registration, TIE or proof of income." },
          { title: "Compare fees", text: "Look at monthly fees, card fees, transfer costs, ATM access and minimum conditions before opening." }
        ])}${TipBox("If you are still waiting for Spanish paperwork, ask the bank whether it has a non-resident, newcomer or passport-based opening route.")}`
      }),
      GuideSection({
        id: "whoNeeds",
        title: "Who Needs This?",
        children: Cards([
          { title: "People starting daily life", text: "Use this if you need to pay rent, utilities, mobile bills or recurring local expenses." },
          { title: "People starting work", text: "Employers commonly ask where to pay salary. A Spanish IBAN can make this smoother." },
          { title: "People still preparing documents", text: "Use this to decide whether to wait for local paperwork or use a temporary option first." }
        ])
      }),
      GuideSection({
        id: "officialRequirements",
        title: "Official Requirements",
        children: `${Cards([
          { title: "Identity checks", text: "Banks must identify customers before opening accounts. Expect passport, EU national ID, NIE, TIE or equivalent identity evidence depending on your situation." },
          { title: "Customer profile", text: "Banks may ask where you live, where your money comes from, whether you are tax resident, and how you plan to use the account." },
          { title: "Account type", text: "Resident, non-resident and online accounts can have different document requests and limits." }
        ])}${WarningBox("Do not assume one bank’s answer applies everywhere. If one bank cannot open the account yet, another may have a different onboarding route.")}`
      }),
      GuideSection({
        id: "documentsUsuallyNeed",
        title: "Documents you'll usually prepare",
        children: `${ChecklistBox({
          title: "Common bank onboarding documents",
          items: [
            "Passport or EU national identity card.",
            "NIE, TIE or EU registration certificate if you already have one.",
            "Address evidence such as padrón, rental contract, utility bill or foreign address proof.",
            "Income evidence such as work contract, payslip, pension statement, tax return or savings evidence.",
            "Tax-residence information and foreign tax number if the bank asks for it.",
            "Spanish phone number or email for app and security verification."
          ]
        })}${InfoBox({ title: "Document reality", text: "Banks can ask for different evidence depending on your nationality, residency status, income source and account type." })}`
      }),
      GuideSection({
        id: "choosingAccount",
        title: "Choosing the right account",
        children: `<table class="guide-table"><tbody>
          <tr><th>Option</th><td><strong>When it may fit</strong></td></tr>
          <tr><th>Spanish resident account</th><td>Usually best once you have Spanish documents and plan to live in Spain.</td></tr>
          <tr><th>Non-resident account</th><td>Can help before full local setup, but may have more limits or fees.</td></tr>
          <tr><th>Online starter account</th><td>Useful while waiting for local paperwork, especially for card spending and international transfers.</td></tr>
          <tr><th>Business or autónomo account</th><td>Consider this separately if you will invoice, trade or register self-employed activity.</td></tr>
        </tbody></table>`
      }),
      GuideSection({
        id: "practicalAdvice",
        title: "Practical Advice",
        children: `${Cards([
          { title: "Ask about Spanish IBAN", text: "A Spanish IBAN can make rent, utilities, local payroll and some direct debits easier." },
          { title: "Keep a backup", text: "Do not rely on one card during your first weeks. Keep a second card or account available." },
          { title: "Check language support", text: "If you are not comfortable in Spanish yet, ask about English support in branch, app and customer service." }
        ])}${TipBox("Before choosing, ask the bank to show the full fee schedule, not only the headline account name.")}`
      }),
      GuideSection({
        id: "stepProcess",
        title: "Step-by-Step Process",
        children: StepTimeline([
          { title: "Decide what the account is for", text: "Salary, rent, daily spending, self-employment or savings may point to different choices." },
          { title: "Prepare identity and address evidence", text: "Gather passport or ID, NIE/TIE if available, address evidence and income evidence." },
          { title: "Compare account types", text: "Look at resident, non-resident and online options. Compare fees and limits." },
          { title: "Open the account", text: "Complete the bank’s onboarding process and keep copies of documents you submit." },
          { title: "Test payments", text: "Check card activation, bank transfers, direct debits, app access and security codes before relying on it." }
        ])
      }),
      CommonMistakes([
        "Assuming every landlord or employer accepts any European IBAN without friction.",
        "Opening the first account offered without checking fees.",
        "Not keeping proof of income or funds ready.",
        "Relying on one card during the first weeks after arrival.",
        "Ignoring tax-residence questions during bank onboarding."
      ]),
      RealQuestions([
        { question: "Do I need a Spanish bank account immediately?", answer: "Not always, but it usually makes rent, utilities, payroll and local payments easier." },
        { question: "Can I open an account before I have a NIE?", answer: "Some banks may offer non-resident or newcomer options, but requirements vary. Ask the bank directly." },
        { question: "Are Revolut, bunq or Wise enough?", answer: "They can be useful starter options. For long-term life in Spain, you may still want a traditional Spanish bank account depending on rent, payroll and local direct debits." },
        { question: "Will the bank ask about taxes?", answer: "Often yes. Banks commonly ask about tax residence and customer profile during onboarding." }
      ]),
      GuideSection({
        id: "officialSources",
        title: "Official and useful sources",
        children: `${SourceLinks([
          { label: "Banco de España customer portal", href: "https://clientebancario.bde.es/pcb/en/" },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Taxes Guide", href: routes.taxes }
        ])}`
      }),
      GuideSection({
        id: "whatHappensNext",
        title: "What Happens Next?",
        children: `<p>Once your banking is stable, set up digital access so you can handle public services online, then review your tax address and tax-residence position.</p>${TipBox("Keep your bank contract, IBAN certificate and account-opening documents with your Spain paperwork folder.")}`
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
    description: "Understand Spain's main digital access options, when to use an FNMT digital certificate or Cl@ve, and what to prepare before registering.",
    metadata: guideMetadataFor(routes.digital),
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Digital Certificate" }],
    hero: {
      kicker: "Online access",
      title: "Digital Certificate and Cl@ve in Spain",
      intro: "Spain’s public administration is heavily online. A digital certificate or Cl@ve can save time with tax, Social Security, municipal certificates and many everyday procedures.",
      asideTitle: "Two different tools",
      asideText: "The FNMT digital certificate is a certificate used for identification and signing. Cl@ve is a public login system with different registration levels."
    },
    sections: [
      QuickAnswer("For many newcomers, the FNMT citizen digital certificate is the most useful first digital tool once you have a NIE or Spanish tax identity. Cl@ve is also useful, but the registration path can depend on your identity documents and verification method. You may eventually want both."),
      AtAGlance([
        ["Main question", "Do you need a certificate, Cl@ve, or both?"],
        ["Useful for", "Tax Agency, Social Security, certificates, notifications and public-service portals."],
        ["FNMT certificate", "Software certificate after online request and identity verification."],
        ["Cl@ve", "Government login system for public administration services."],
        ["NIE helpful?", "Yes. Many newcomers need a NIE before digital access becomes realistic."],
        ["Next step", "Choose the route you can actually verify with your current documents."]
      ]),
      GuideSection({
        id: "beforeStart",
        title: "Before You Start",
        children: `${Cards([
          { title: "Check your identity document", text: "Your route depends on whether you have DNI, NIE, TIE, EU ID, passport or another accepted document." },
          { title: "Use one browser and device", text: "For certificate requests, follow the official browser and device instructions carefully." },
          { title: "Plan identity verification", text: "Some routes require in-person or video identity accreditation before activation." }
        ])}${WarningBox("Do not start a certificate request casually and then switch devices or browsers. Certificate processes can be sensitive to where and how the request was started.")}`
      }),
      GuideSection({
        id: "whoNeeds",
        title: "Who Needs This?",
        children: Cards([
          { title: "EU citizens settling in Spain", text: "Digital access helps with tax, Social Security, certificates and some local services." },
          { title: "People working or self-employed", text: "Online access becomes especially useful for Social Security, tax and professional admin." },
          { title: "People managing paperwork remotely", text: "Digital access can reduce office visits once it is correctly set up." }
        ])
      }),
      GuideSection({
        id: "officialRequirements",
        title: "Official Requirements",
        children: `${Cards([
          { title: "FNMT certificate", text: "The citizen certificate process normally starts with an online application and continues with identity accreditation before download." },
          { title: "Cl@ve", text: "Cl@ve registration depends on the accepted identity method and the level of registration you complete." },
          { title: "Electronic ID", text: "Some EU citizens may also use an electronic national ID on certain portals if supported." }
        ])}${InfoBox({ title: "Plain-language meaning", text: "A digital certificate is closer to an electronic signature. Cl@ve is closer to a login system for public services." })}`
      }),
      GuideSection({
        id: "compareOptions",
        title: "Certificate or Cl@ve?",
        children: `<table class="guide-table"><tbody>
          <tr><th>Option</th><td><strong>Best use</strong></td></tr>
          <tr><th>FNMT digital certificate</th><td>Useful for signing, downloading certificates, Tax Agency services and many official procedures.</td></tr>
          <tr><th>Cl@ve PIN</th><td>Useful for frequent public-service login where PIN access is accepted.</td></tr>
          <tr><th>Cl@ve Permanente</th><td>Useful for more stable access where permanent credentials are accepted.</td></tr>
          <tr><th>Electronic DNI or EU eID</th><td>Useful only where the portal supports your document and technical setup.</td></tr>
        </tbody></table>`
      }),
      GuideSection({
        id: "practicalAdvice",
        title: "Practical Advice",
        children: `${Cards([
          { title: "Start with the route you can verify", text: "If you have a NIE but not a TIE, the FNMT certificate may be easier than some Cl@ve paths." },
          { title: "Keep access secure", text: "Store certificate backups and passwords carefully. Losing them can mean repeating the process." },
          { title: "Use official portals", text: "Avoid unofficial sites that charge for simple registration instructions or ask for sensitive data." }
        ])}${TipBox("After setup, test your access on the Tax Agency or Social Security site before you urgently need it.")}`
      }),
      GuideSection({
        id: "documentsUsuallyNeed",
        title: "Documents and details you'll usually prepare",
        children: ChecklistBox({
          title: "Digital access preparation",
          items: [
            "NIE, DNI, TIE or accepted identity document.",
            "Email address and mobile phone number you control.",
            "Computer or browser setup required by the official certificate process.",
            "Appointment or identity-verification confirmation if required.",
            "Safe place to store certificate passwords and backup files."
          ]
        })
      }),
      GuideSection({
        id: "stepProcess",
        title: "Step-by-Step Process",
        children: StepTimeline([
          { title: "Decide what you need access for", text: "Tax, Social Security, certificates, local admin and notifications can point to different access needs." },
          { title: "Check whether FNMT or Cl@ve fits your documents", text: "Use the official pages to confirm the route your current identity documents support." },
          { title: "Start the official registration", text: "Follow the official request steps carefully, especially device and browser instructions." },
          { title: "Complete identity verification", text: "Use the accepted in-person, video or online verification method if required." },
          { title: "Test and store access safely", text: "Confirm it works, then protect passwords, certificate files and recovery options." }
        ])
      }),
      CommonMistakes([
        "Confusing Cl@ve with an FNMT digital certificate.",
        "Starting a certificate request on one device and trying to finish on another.",
        "Using unofficial paid pages instead of official registration portals.",
        "Waiting until a tax or Social Security deadline before setting up access.",
        "Losing certificate passwords or backup files."
      ]),
      RealQuestions([
        { question: "Do I need both Cl@ve and a digital certificate?", answer: "Not always, but many residents eventually find both useful. Start with the route you can verify now." },
        { question: "Can I get an FNMT certificate with a NIE?", answer: "The FNMT citizen certificate route can be available with Spanish tax/identity details. Check the official FNMT instructions for your exact document." },
        { question: "Why is Cl@ve difficult for some newcomers?", answer: "Some registration methods depend on accepted identity details and address or document records that newcomers may not yet have." },
        { question: "Is this the same as my bank login?", answer: "No. Bank logins are private banking access. Cl@ve and digital certificates are for public administration services." }
      ]),
      GuideSection({
        id: "officialSources",
        title: "Official sources",
        children: SourceLinks([
          { label: "FNMT citizen certificate", href: "https://www.sede.fnmt.gob.es/certificados/persona-fisica" },
          { label: "Cl@ve registration", href: "https://clave.gob.es/clave_Home/registro/Como-puedo-registrarme.html" },
          { label: "FNMT appointment via Tax Agency", href: "https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion" }
        ])
      }),
      GuideSection({
        id: "whatHappensNext",
        title: "What Happens Next?",
        children: `<p>Once your digital access works, use it to review tax details, Social Security services and certificates you may need later.</p>${TipBox("Before filing anything important, log in once just to confirm your access works and your personal details look correct.")}`
      })
    ]
  })
});

pages.push({
  route: routes.taxes,
  html: GuideLayout({
    path: routes.taxes,
    canonical: `https://iberigo.eu${routes.taxes}`,
    title: "Taxes When Living in Spain — IberiGo",
    description: "A practical first guide to tax residence, tax address, IRPF, foreign income and when to get professional tax advice after moving to Spain.",
    metadata: guideMetadataFor(routes.taxes),
    breadcrumbs: [{ label: "Living in Spain", href: routes.banking }, { label: "Taxes" }],
    hero: {
      kicker: "Money and residency",
      title: "Taxes When Living in Spain",
      intro: "Tax is one of the areas where early planning matters. This guide explains the first concepts to understand before you rely on assumptions from your home country.",
      asideTitle: "Get advice early",
      asideText: "Small tax decisions can become expensive later. Use this page as orientation, not as personal tax advice."
    },
    sections: [
      QuickAnswer("If you live in Spain, you need to understand tax residence, tax address, annual income tax, foreign income and reporting obligations. Tax residence is not the same as immigration residence, and the answer can depend on days in Spain, where your main interests are, family ties and treaty rules."),
      AtAGlance([
        ["Main question", "Could Spain consider you tax resident?"],
        ["Common day test", "More than 183 days in Spain is a major tax-residence indicator."],
        ["Other indicators", "Economic interests, family and personal centre can also matter."],
        ["Tax address", "Your domicilio fiscal should reflect your real tax address."],
        ["Worldwide income", "Spanish tax residents may need to declare worldwide income."],
        ["Professional advice", "Strongly recommended if you have foreign income, assets, company work or self-employment."]
      ]),
      GuideSection({
        id: "beforeStart",
        title: "Before You Start",
        children: `${Cards([
          { title: "Separate immigration from tax", text: "Having EU registration or a visa does not automatically answer every tax-residence question." },
          { title: "Map your income", text: "List salary, pensions, dividends, rent, business income, capital gains and foreign accounts." },
          { title: "Track days", text: "Keep a simple record of time spent in Spain and other countries." }
        ])}${WarningBox("Do not wait until the filing season if you have income outside Spain, remote work, a company, property, investments or complex family ties.")}`
      }),
      GuideSection({
        id: "whoNeeds",
        title: "Who Needs This?",
        children: Cards([
          { title: "People moving long term", text: "Use this if Spain may become your normal home or main base." },
          { title: "Remote workers and self-employed people", text: "Tax and Social Security questions can be more complex when income crosses borders." },
          { title: "Retirees and people with assets", text: "Pensions, investments, property and foreign accounts can create reporting questions." }
        ])
      }),
      GuideSection({
        id: "officialRequirements",
        title: "Official Requirements",
        children: `${Cards([
          { title: "Tax residence", text: "Spain looks at factors such as days in Spain, economic interests and personal/family centre. Tax treaties can also matter." },
          { title: "IRPF", text: "Spanish resident income tax is commonly known as IRPF, or declaración de la renta when filing the annual return." },
          { title: "Tax address", text: "Your domicilio fiscal is the tax address recorded with the Tax Agency and should be kept current." }
        ])}${InfoBox({ title: "Important distinction", text: "This guide explains the starting concepts. It does not calculate your tax residence or tax due." })}`
      }),
      GuideSection({
        id: "firstQuestions",
        title: "The first questions to answer",
        children: `<table class="guide-table"><tbody>
          <tr><th>Question</th><td><strong>Why it matters</strong></td></tr>
          <tr><th>How many days will you spend in Spain?</th><td>The 183-day test is a major indicator for tax residence.</td></tr>
          <tr><th>Where is your main work or business?</th><td>Economic interests can affect tax-residence analysis.</td></tr>
          <tr><th>Where does your family live?</th><td>Personal and family centre can matter in some cases.</td></tr>
          <tr><th>Do you have foreign income or assets?</th><td>Spanish tax residents may have worldwide reporting obligations.</td></tr>
          <tr><th>Are you newly arrived for work?</th><td>Special regimes may exist, but they have conditions and deadlines.</td></tr>
        </tbody></table>`
      }),
      GuideSection({
        id: "practicalAdvice",
        title: "Practical Advice",
        children: `${Cards([
          { title: "Organize evidence", text: "Keep travel records, work contracts, payslips, pension statements, bank statements and rental contracts." },
          { title: "Check before invoicing", text: "If you plan to freelance or invoice clients, get advice before you start billing." },
          { title: "Review double-tax issues", text: "Foreign income can interact with tax treaties, home-country filing and Spanish filing." }
        ])}${TipBox("Create a simple tax folder before you need it: identity documents, NIE, address proof, bank details, income records and foreign tax documents.")}`
      }),
      GuideSection({
        id: "taxAddress",
        title: "Tax address and notifications",
        children: `${Cards([
          { title: "Domicilio fiscal", text: "This is the address the Tax Agency uses for tax purposes. It may need updating after you settle." },
          { title: "Digital access", text: "A digital certificate or Cl@ve can help you review data, certificates and some procedures online." },
          { title: "Notices", text: "Once you use online services, pay attention to electronic notices and official messages." }
        ])}${WarningBox("Ignoring tax notices can create problems even if you did not understand the online system. Set up access carefully and check it periodically.")}`
      }),
      GuideSection({
        id: "stepProcess",
        title: "Step-by-Step Process",
        children: StepTimeline([
          { title: "Map your situation", text: "List where you live, work, earn income, hold assets and spend time." },
          { title: "Check whether Spain may treat you as tax resident", text: "Look at days, economic interests, family centre and treaty questions." },
          { title: "Update or confirm your tax address", text: "Review what address the Tax Agency has recorded for you." },
          { title: "Set up digital access", text: "Use a digital certificate or Cl@ve so you can manage official services online." },
          { title: "Get professional help if needed", text: "Use a qualified tax adviser for foreign income, self-employment, companies, assets or special regimes." }
        ])
      }),
      CommonMistakes([
        "Assuming immigration residence and tax residence are the same thing.",
        "Counting only salary and forgetting pensions, rent, investments or foreign income.",
        "Waiting until tax season to ask for advice.",
        "Ignoring the tax address recorded with the Tax Agency.",
        "Assuming a home-country accountant understands Spanish residence rules."
      ]),
      RealQuestions([
        { question: "Does spending more than 183 days in Spain make me tax resident?", answer: "It is a major indicator, but not the only factor. Economic interests, family centre and treaty rules can also matter." },
        { question: "Do I pay tax only on Spanish income?", answer: "If you are Spanish tax resident, worldwide income can become relevant. Get advice if you have income or assets abroad." },
        { question: "What is domicilio fiscal?", answer: "It is your tax address recorded with the Tax Agency. It should match your real tax situation." },
        { question: "Should I use a gestor or tax adviser?", answer: "If you have foreign income, self-employment, a company, assets or uncertainty about residence, professional advice is sensible." }
      ]),
      GuideSection({
        id: "officialSources",
        title: "Official sources",
        children: SourceLinks([
          { label: "Tax Agency portal", href: "https://sede.agenciatributaria.gob.es/Sede/en_gb/inicio.html" },
          { label: "Tax census and fiscal address", href: "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal.html" },
          { label: "View the Digital Certificate Guide", href: routes.digital }
        ])
      }),
      GuideSection({
        id: "whatHappensNext",
        title: "What Happens Next?",
        children: `<p>After reviewing tax basics, check whether your work, income or assets create specific filing or registration steps. If the answer is not obvious, speak with a qualified tax adviser before deadlines arrive.</p>${TipBox("Your next practical step is to make sure your digital access works and your tax address is not outdated.")}`
      })
    ]
  })
});

const skeletons = [
  ["documents-checklist", routes.checklist, "Moving to Spain documents checklist — IberiGo", "Draft checklist for documents people commonly prepare before moving to Spain.", "Documents Checklist for Moving to Spain", "A calm document checklist helps you prepare without pretending every route has the same requirements.", "Start with identity, address, healthcare, money and purpose evidence. Route-specific detail comes during editorial review."],
  ["social-security", routes.social, "Social Security number in Spain — IberiGo", "Draft guide to Social Security number and work registration concepts in Spain.", "Social Security in Spain", "Social Security is important for work records and can connect to healthcare access.", "The Social Security number identifies your file. Being registered as active for employment or self-employment is a related but separate step."],
  ["driving", routes.driving, "Driving licence rules when living in Spain — IberiGo", "Draft guide to driving licence checks when living in Spain.", "Driving in Spain", "Driving rules depend on where your licence was issued and whether you are visiting or living in Spain.", "Do not assume tourist driving rules stay the same after moving."],
  ["finding-accommodation", routes.accommodation, "Finding accommodation in Spain — IberiGo", "Draft guide to finding accommodation when moving to Spain.", "Finding Accommodation in Spain", "Accommodation is also an admin step because your address can affect padrón, banking and healthcare.", "Ask early whether the address can support the paperwork you need."]
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
