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
  esStartHere: "/es/start-here/",
  esChecklist: "/es/moving-to-spain/documents-checklist/",
  esAccommodation: "/es/moving-to-spain/finding-accommodation/",
  esSettling: "/es/moving-to-spain/settling-into-spain/",
  esBanking: "/es/living-in-spain/opening-a-bank-account/",
  esEuRoadmap: "/es/moving-to-spain/eu-citizens/",
  esNonEuRoadmap: "/es/moving-to-spain/non-eu-citizens/",
  esEuFamilyMemberRoadmap: "/es/moving-to-spain/family-member-eu-citizen/",
  esWorkInSpain: "/es/moving-to-spain/work-in-spain/",
  esStudents: "/es/moving-to-spain/students/",
  esRetireInSpain: "/es/moving-to-spain/retire-in-spain/",
  esSelfEmployed: "/es/moving-to-spain/self-employed-spain/",
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
  students: "/moving-to-spain/students/",
  workInSpain: "/moving-to-spain/work-in-spain/",
  retireInSpain: "/moving-to-spain/retire-in-spain/",
  familyReunification: "/moving-to-spain/family-reunification/",
  digitalNomad: "/moving-to-spain/digital-nomad-spain/",
  selfEmployed: "/moving-to-spain/self-employed-spain/"
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
    label: "View roadmap",
    description: "Follow the usual order of moving steps for EU, EEA and Swiss citizens."
  },
  [routes.settling]: {
    title: "Settling Into Spain",
    label: "View guide",
    description: "Follow the main arrival steps after reaching Spain without relying on fixed timelines."
  },
  [routes.euRegistration]: {
    title: "EU Registration Certificate",
    label: "View guide",
    description: "Prepare the EU Registration Certificate step for longer-term stays in Spain."
  },
  [routes.padron]: {
    title: "Padrón Guide",
    label: "View guide",
    description: "Understand town hall address registration and the documents commonly requested."
  },
  [routes.healthcare]: {
    title: "Healthcare Guide",
    label: "View guide",
    description: "Compare public healthcare, S1, work-based entitlement and private-cover routes."
  },
  [routes.checklist]: {
    title: "Documents Checklist",
    label: "View guide",
    description: "Organize the core paperwork folder before appointments and everyday setup."
  },
  [routes.banking]: {
    title: "Bank Account Guide",
    label: "View guide",
    description: "Set up everyday banking, payments and account documents in Spain."
  },
  [routes.digital]: {
    title: "Digital Certificate Guide",
    label: "View guide",
    description: "Set up FNMT digital certificate or Cl@ve access for online public services."
  },
  [routes.social]: {
    title: "Social Security Guide",
    label: "View guide",
    description: "Understand Social Security numbers, work registration and related healthcare links."
  },
  [routes.taxes]: {
    title: "Taxes Guide",
    label: "View guide",
    description: "Review tax residence, tax address and first tax-administration questions."
  },
  [routes.driving]: {
    title: "Driving Guide",
    label: "View guide",
    description: "Check driving licence and resident-driver rules after moving to Spain."
  },
  [routes.accommodation]: {
    title: "Accommodation Guide",
    label: "View guide",
    description: "Plan housing evidence, rentals and the address documents that later steps may need."
  },
  [routes.nonEuRoadmap]: {
    title: "Non-EU Citizen Roadmap",
    label: "View roadmap",
    description: "Understand the main non-EU residence routes and what to check before relying on any single process."
  },
  [routes.euFamilyMemberRoadmap]: {
    title: "Family Member of an EU Citizen Roadmap",
    label: "View roadmap",
    description: "Understand the broad journey for non-EU family members of EU citizens moving to or living in Spain."
  },
  [routes.students]: {
    title: "Student Roadmap",
    label: "View roadmap",
    description: "Understand the broad student route for studying in Spain, for EU and non-EU students alike."
  },
  [routes.workInSpain]: {
    title: "Work in Spain Roadmap",
    label: "View roadmap",
    description: "Understand the broad work-related routes for moving to Spain, for EU and non-EU citizens alike."
  },
  [routes.retireInSpain]: {
    title: "Retiring in Spain Roadmap",
    label: "View roadmap",
    description: "Understand the broad retirement and sufficient-resources route for moving to Spain, for EU and non-EU citizens alike."
  },
  [routes.familyReunification]: {
    title: "Family Reunification Roadmap",
    label: "View roadmap",
    description: "Understand the broad family reunification route for joining a non-EU resident sponsor in Spain."
  },
  [routes.digitalNomad]: {
    title: "Digital Nomad Roadmap",
    label: "View roadmap",
    description: "Understand the broad remote-work and digital nomad route for moving to Spain."
  },
  [routes.selfEmployed]: {
    title: "Self-Employed / Autónomo Roadmap",
    label: "View roadmap",
    description: "Understand the broad self-employment and autónomo route for moving to or living in Spain."
  }
};

function guideLink(route) {
  const summary = guideSummaries[route] || {};
  const title = summary.title || "IberiGo Guide";
  return {
    title,
    description: summary.description || "",
    label: summary.label || "View guide",
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
  [routes.esStartHere]: {
    category: "Mudarse a España",
    difficulty: "Fácil",
    estimatedTime: "3 min",
    appliesTo: ["Personas que preparan una mudanza a España", "Personas que quieren elegir la guía adecuada de IberiGo"],
    keywords: ["empieza aquí", "mudarse a España", "ciudadano de la UE", "ciudadano no UE", "estudiante", "trabajador", "jubilado", "familia"]
  },
  [routes.esChecklist]: {
    category: "Mudarse a España",
    difficulty: "Fácil",
    estimatedTime: "8 min",
    appliesTo: ["Personas que preparan documentos antes de mudarse a España", "Personas que organizan las pruebas de su ruta"],
    keywords: ["documentos", "lista de documentos", "pasaporte", "apostilla", "traducción", "documentos para mudanza"]
  },
  [routes.esAccommodation]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "10 min",
    appliesTo: ["Personas que buscan alojamiento en España", "Personas que preparan pruebas de domicilio"],
    keywords: ["alojamiento", "alquiler", "contrato de alquiler", "fianza", "padrón", "arrendador", "agencia inmobiliaria"]
  },
  [routes.esSettling]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "12 min",
    appliesTo: ["Personas que han llegado a España", "Personas que planifican el orden de los trámites de llegada", "Ciudadanos de la UE que revisan los próximos pasos prácticos"],
    keywords: ["instalarse en España", "primeros pasos", "padrón", "sanidad", "registro de la UE", "cuenta bancaria", "certificado digital", "Cl@ve"]
  },
  [routes.esBanking]: {
    category: "Vivir en España",
    difficulty: "Fácil",
    estimatedTime: "9 min",
    appliesTo: ["Personas que abren una cuenta bancaria en España", "Personas que organizan sus pagos en España"],
    keywords: ["banco", "cuenta bancaria", "IBAN", "comisiones", "pagos", "banco español"]
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
  },
  [routes.workInSpain]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "11 min",
    appliesTo: ["EU citizens moving to Spain for work", "Non-EU citizens with a job offer in Spain", "People comparing employee, remote-work or self-employed routes"],
    keywords: ["work in Spain", "work visa", "work permit", "TIE", "EU Registration", "Social Security", "employer registration"]
  },
  [routes.retireInSpain]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["EU citizens retiring in Spain", "Non-EU citizens retiring in Spain", "People living from pensions, savings or investments"],
    keywords: ["retire in Spain", "sufficient resources", "non-lucrative", "pension", "S1", "TIE", "EU Registration", "tax residency"]
  },
  [routes.familyReunification]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "11 min",
    appliesTo: ["Non-EU family members joining a non-EU resident sponsor in Spain", "Sponsors in Spain trying to understand what may be involved"],
    keywords: ["family reunification", "reagrupación familiar", "sponsor", "TIE", "NIE", "family-based residence"]
  },
  [routes.digitalNomad]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "11 min",
    appliesTo: ["Non-EU remote workers considering Spain", "Digital nomads", "Freelancers with foreign clients", "Employees working remotely for a foreign employer"],
    keywords: ["digital nomad visa", "remote work Spain", "TIE", "tax residency", "Social Security", "freelancer"]
  },
  [routes.selfEmployed]: {
    category: "Moving to Spain",
    difficulty: "Moderate",
    estimatedTime: "12 min",
    appliesTo: ["Freelancers, contractors and sole traders in Spain", "Small business owners", "EU and non-EU citizens planning self-employment"],
    keywords: ["autónomo", "self-employed Spain", "freelancer", "IAE", "Social Security", "TIE", "gestor"]
  },
  [routes.esEuRoadmap]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "12 min",
    appliesTo: ["Ciudadanos de la UE que se mudan a España", "Ciudadanos del EEE que se mudan a España", "Ciudadanos suizos que se mudan a España"],
    keywords: ["ciudadano de la UE", "registro de la UE", "mudarse a España", "hoja de ruta", "padrón", "sanidad", "banco", "impuestos"]
  },
  [routes.esNonEuRoadmap]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "12 min",
    appliesTo: ["Ciudadanos no UE que planean mudarse a España", "Personas que se mudan por trabajo, estudios, familia o jubilación", "Nómadas digitales y autónomos que consideran España"],
    keywords: ["ciudadano no UE", "visado", "autorización de residencia", "TIE", "NIE", "mudarse a España", "familiar de un ciudadano de la UE"]
  },
  [routes.esEuFamilyMemberRoadmap]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "11 min",
    appliesTo: ["Cónyuges no comunitarios de ciudadanos de la UE", "Parejas registradas de ciudadanos de la UE, cuando se reconozcan", "Hijos y familiares dependientes de ciudadanos de la UE", "Ciudadanos de la UE que traen o reagrupan familia en España"],
    keywords: ["familiar de un ciudadano de la UE", "tarjeta de residencia", "visado de cónyuge", "TIE", "NIE", "registro de la UE", "reagrupación familiar"]
  },
  [routes.esStudents]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "11 min",
    appliesTo: ["Estudiantes no UE que planean estudiar en España", "Estudiantes de la UE que planean estudiar en España", "Estudiantes de intercambio, universidad, idiomas y formación"],
    keywords: ["visado de estudiante", "estudiar en España", "TIE", "registro de la UE", "residencia de estudiante", "universidad", "escuela de idiomas"]
  },
  [routes.esWorkInSpain]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "11 min",
    appliesTo: ["Ciudadanos de la UE que se mudan a España para trabajar", "Ciudadanos no UE con oferta de empleo en España", "Personas que comparan las vías de empleado, trabajo remoto o autónomo"],
    keywords: ["trabajar en España", "visado de trabajo", "autorización de trabajo", "TIE", "registro de la UE", "Seguridad Social", "alta de empresa"]
  },
  [routes.esRetireInSpain]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "12 min",
    appliesTo: ["Ciudadanos de la UE que se jubilan en España", "Ciudadanos no UE que se jubilan en España", "Personas que viven de pensiones, ahorros o inversiones"],
    keywords: ["jubilarse en España", "recursos suficientes", "no lucrativo", "pensión", "S1", "TIE", "registro de la UE", "residencia fiscal"]
  },
  [routes.esSelfEmployed]: {
    category: "Mudarse a España",
    difficulty: "Moderado",
    estimatedTime: "12 min",
    appliesTo: ["Freelancers, contratistas y autónomos en España", "Pequeños empresarios", "Ciudadanos de la UE y no UE que planean el autoempleo"],
    keywords: ["autónomo", "trabajo por cuenta propia España", "freelancer", "IAE", "Seguridad Social", "TIE", "gestor"]
  }
};

const relatedRoutesByRoute = {
  [routes.startHere]: [routes.euRoadmap, routes.euRegistration, routes.padron, routes.healthcare],
  [routes.esStartHere]: [routes.euRoadmap, routes.checklist, routes.accommodation, routes.settling, routes.banking],
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
  [routes.students]: [routes.checklist, routes.healthcare, routes.accommodation],
  [routes.workInSpain]: [routes.social, routes.taxes, routes.checklist],
  [routes.retireInSpain]: [routes.healthcare, routes.taxes, routes.accommodation],
  [routes.familyReunification]: [routes.checklist, routes.padron, routes.healthcare],
  [routes.digitalNomad]: [routes.taxes, routes.social, routes.healthcare],
  [routes.selfEmployed]: [routes.taxes, routes.social, routes.digital]
};

const officialSourcesByRoute = {
  [routes.euRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where appointment booking for foreigners' procedures is available. Check the current appointment options for your specific procedure." },
    { name: "Local Town Halls", varies: true, note: "There is no single official website — padrón and local address requirements are set by each municipality. Check your own town hall's website for local instructions." }
  ],
  [routes.euRegistration]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where appointment booking for EU Registration Certificate appointments is available. Check the current appointment options for your specific procedure." }
  ],
  [routes.padron]: [
    { name: "Spanish Government", url: "https://www.ine.es", note: "Instituto Nacional de Estadística (INE) — national padrón municipal statistics and the Padrón Online portal." },
    { name: "Local Town Halls", varies: true, note: "There is no single official website — padrón requirements and appointment systems are set by each municipality. Check your own town hall's website for local instructions." }
  ],
  [routes.healthcare]: [
    { name: "Spanish Government", url: "https://www.sanidad.gob.es", note: "Ministerio de Sanidad — Spain's national health ministry." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for EU registration and residence procedures." },
    { name: "Regional health services", varies: true, note: "There is no single official website — health-card processes and names vary by autonomous community. Check your own regional health service for local instructions." },
    { name: "Social Security", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal for checking current entitlement and contribution information." }
  ],
  [routes.taxes]: [
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration. Useful for checking tax residency, filing and worldwide-income questions; it does not replace professional tax advice, and this guide is not tax advice." }
  ],
  [routes.social]: [
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal for checking current registration, contribution and entitlement information." }
  ],
  [routes.driving]: [
    { name: "Dirección General de Tráfico (DGT)", url: "https://www.dgt.es", note: "DGT is Spain's traffic authority and the official place to check current driving-licence, exchange, renewal and medical-check rules referenced throughout this guide." }
  ],
  [routes.nonEuRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking is available. Check the current appointment options for your specific route." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for visa applications handled through Spanish consulates abroad." }
  ],
  [routes.euFamilyMemberRoadmap]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where family-member residence card appointment booking is available. Check the current appointment options for your specific case." },
    { name: "EU official information for families", url: "https://europa.eu/youreurope/citizens/index_en.htm", note: "\"Your Europe\" — the EU's official citizen portal, with help and advice for EU nationals and their family." }
  ],
  [routes.students]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for students is available. Check the current appointment options for your specific route." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for student visa applications handled through Spanish consulates abroad." },
    { name: "Ministry of Education", url: "https://www.educacionyfp.gob.es", note: "Ministerio de Educación, Formación Profesional y Deportes — Spain's national education ministry." }
  ],
  [routes.workInSpain]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for work-related residence procedures." },
    { name: "Ministry of Labour", url: "https://www.mites.gob.es", note: "Ministerio de Trabajo y Economía Social — Spain's ministry for labour and employment matters." },
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal for checking current registration and contribution information." },
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration, relevant for tax obligations arising from work in Spain." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for workers is available. Check the current appointment options for your specific route." }
  ],
  [routes.retireInSpain]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures, including sufficient-resources and non-lucrative-type routes." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for non-EU applications handled through Spanish consulates abroad." },
    { name: "Ministry of Health", url: "https://www.sanidad.gob.es", note: "Ministerio de Sanidad — Spain's national health ministry, relevant for retiree healthcare routes." },
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal, relevant for pension-linked healthcare entitlement and S1-type routes." },
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration, relevant for tax-residency and pension/investment income questions." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for non-EU retirees is available. Check the current appointment options for your specific route." }
  ],
  [routes.familyReunification]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence and family-based procedures." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for applications handled through Spanish consulates abroad." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for family members is available. Check the current appointment options for your specific case." },
    { name: "EU official information for families (comparison only)", url: "https://europa.eu/youreurope/citizens/index_en.htm", note: "\"Your Europe\" — the EU's official citizen portal, relevant only for comparing this route with the separate Family Member of an EU Citizen route." }
  ],
  [routes.digitalNomad]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures, including remote-work-related routes." },
    { name: "Ministry of Foreign Affairs (consular information)", url: "https://www.exteriores.gob.es", note: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación — relevant for applications handled through Spanish consulates abroad." },
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration, relevant for tax-residency and foreign-income questions for remote workers." },
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal, relevant for how employees, freelancers and business owners are treated." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for digital nomads is available. Check the current appointment options for your specific route." }
  ],
  [routes.selfEmployed]: [
    { name: "Spanish Government", url: "https://administracion.gob.es", note: "Punto de Acceso General — the central official entry point for Spanish public administration procedures." },
    { name: "Ministry responsible for immigration", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — Migraciones section, responsible for residence procedures, including self-employment-related routes." },
    { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es", note: "Agencia Tributaria (AEAT) — Spain's tax administration, relevant for autónomo tax registration and obligations." },
    { name: "Seguridad Social", url: "https://www.seg-social.es", note: "Instituto Nacional de la Seguridad Social — the official Social Security portal, relevant for autónomo registration and contributions." },
    { name: "Ministry of Labour", url: "https://www.mites.gob.es", note: "Ministerio de Trabajo y Economía Social — Spain's ministry for labour and employment matters." },
    { name: "Police appointment portal", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office, where TIE-related appointment booking for self-employed non-EU residents is available. Check the current appointment options for your specific route." }
  ],
  [routes.checklist]: [
    { name: "Modelo 790-012 official fee form", url: "https://sede.policia.gob.es/Tasa790_012/index.jsp", note: "Policía Nacional e-office — the official fee-payment page for Tasa 790-012." },
    { name: "EX-18 official form (Ministry responsible for immigration)", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — the official immigration portal for checking current EX-18 form and procedure information." },
    { name: "Policía Nacional", url: "https://sede.policia.gob.es", note: "Policía Nacional e-office — general appointment and registration portal referenced throughout this checklist." },
    { name: "Apostille and legalisation", url: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx", note: "Ministerio de Asuntos Exteriores — official information on legalisation and apostille of foreign documents." }
  ],
  [routes.esChecklist]: [
    { name: "Formulario oficial de tasa Modelo 790-012", url: "https://sede.policia.gob.es/Tasa790_012/index.jsp", note: "Sede electrónica de la Policía Nacional — página oficial de pago de la tasa 790-012." },
    { name: "Formulario EX-18 (Ministerio responsable de inmigración)", url: "https://www.inclusion.gob.es/web/migraciones/home", note: "Ministerio de Inclusión, Seguridad Social y Migraciones — el portal oficial de inmigración para consultar el formulario EX-18 y la información del trámite." },
    { name: "Policía Nacional", url: "https://sede.policia.gob.es", note: "Sede electrónica de la Policía Nacional — portal general de citas y registro mencionado en esta lista." },
    { name: "Apostilla y legalización", url: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx", note: "Ministerio de Asuntos Exteriores — información oficial sobre legalización y apostilla de documentos extranjeros." }
  ]
};

// Sprint 88 owner-approved technical launch set. Only these five routes get
// status: "published" (see docs/GROUP1_PUBLICATION_DECISION.md). Every other
// route stays "draft" and therefore noindex, nofollow.
const publishedRoutes = new Set([
  routes.startHere,
  routes.checklist,
  routes.accommodation,
  routes.settling,
  routes.banking,
  // Sprint 146: the Spanish counterparts of the 5 launched Group 1 pages,
  // launched together as the complete Spanish Guide System set (see
  // docs/SPANISH_START_HERE_REVIEW_AND_LAUNCH_PLAN.md).
  routes.esStartHere,
  routes.esChecklist,
  routes.esAccommodation,
  routes.esSettling,
  routes.esBanking,
  // Route roadmap family: launched together per docs/ROUTE_ROADMAP_PUBLICATION_DECISION.md.
  routes.euRoadmap,
  routes.nonEuRoadmap,
  routes.euFamilyMemberRoadmap,
  routes.workInSpain,
  routes.students,
  routes.retireInSpain,
  routes.selfEmployed,
  routes.esEuRoadmap,
  routes.esNonEuRoadmap,
  routes.esEuFamilyMemberRoadmap,
  routes.esWorkInSpain,
  routes.esStudents,
  routes.esRetireInSpain,
  routes.esSelfEmployed
]);

function guideMetadataFor(route) {
  const journeyRoutesByRoute = {
    [routes.startHere]: { next: routes.euRoadmap },
    [routes.esStartHere]: { next: routes.euRoadmap },
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
    status: publishedRoutes.has(route) ? "published" : "draft",
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

// Launched English/Spanish Guide System pairs: reciprocal hreflang and a
// functional language switcher are added only for these 5 complete pairs.
function launchedPair(enRoute, esRoute) {
  const enUrl = `https://iberigo.eu${enRoute}`;
  const esUrl = `https://iberigo.eu${esRoute}`;
  const hreflangAlternates = [
    { hreflang: "en", href: enUrl },
    { hreflang: "es", href: esUrl },
    { hreflang: "x-default", href: enUrl }
  ];
  return {
    en: { altHref: esRoute, hreflangAlternates },
    es: { altHref: enRoute, hreflangAlternates }
  };
}

const startHerePair = launchedPair(routes.startHere, routes.esStartHere);
const checklistPair = launchedPair(routes.checklist, routes.esChecklist);
const accommodationPair = launchedPair(routes.accommodation, routes.esAccommodation);
const settlingPair = launchedPair(routes.settling, routes.esSettling);
const bankingPair = launchedPair(routes.banking, routes.esBanking);
// Route roadmap family: launched together per docs/ROUTE_ROADMAP_PUBLICATION_DECISION.md.
const euRoadmapPair = launchedPair(routes.euRoadmap, routes.esEuRoadmap);
const nonEuRoadmapPair = launchedPair(routes.nonEuRoadmap, routes.esNonEuRoadmap);
const euFamilyMemberRoadmapPair = launchedPair(routes.euFamilyMemberRoadmap, routes.esEuFamilyMemberRoadmap);
const workInSpainPair = launchedPair(routes.workInSpain, routes.esWorkInSpain);
const studentsPair = launchedPair(routes.students, routes.esStudents);
const retireInSpainPair = launchedPair(routes.retireInSpain, routes.esRetireInSpain);
const selfEmployedPair = launchedPair(routes.selfEmployed, routes.esSelfEmployed);

const pages = [
  {
    route: routes.startHere,
    html: GuideLayout({
      path: routes.startHere,
      canonical: `https://iberigo.eu${routes.startHere}`,
      altHref: startHerePair.en.altHref,
      hreflangAlternates: startHerePair.en.hreflangAlternates,
      title: "Start Here: Moving to Spain — IberiGo",
      description: "Find the right IberiGo guide for your move to Spain, whether you are an EU citizen, non-EU citizen, student, worker, retiree or joining family.",
      metadata: guideMetadataFor(routes.startHere),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Start Here" }],
      hero: {
        kicker: "Start here",
        title: "Moving to Spain starts here.",
        intro: "Choose the situation that sounds most like you, and we’ll point you to the guide that explains what to do next.",
        asideTitle: "Simple starting point",
        asideText: "You do not need to know the immigration terminology before starting, but you should verify which route fits your situation."
      },
      sections: [
        GuideSection({
          id: "chooseYourPath",
          title: "Choose your path",
          children: StartHereCards([
            { title: "I’m an EU citizen", text: "Start with the roadmap for EU, EEA and Swiss citizens moving to Spain.", href: routes.euRoadmap, label: "View roadmap" },
            { title: "I’m a non-EU citizen", text: "Start with the roadmap for non-EU citizens moving to Spain.", href: routes.nonEuRoadmap, label: "View roadmap" },
            { title: "I’m joining family in Spain", text: "Start with the family route that appears closest to your situation, then confirm the exact rules that apply to you.", href: routes.euFamilyMemberRoadmap, label: "View roadmap" },
            { title: "I’m moving for work", text: "Start with the roadmap for work-related routes, then check the specific route for your nationality and job situation.", href: routes.workInSpain, label: "View roadmap" },
            { title: "I’m moving to study", text: "Start with the roadmap for study routes, then confirm the rules for your nationality, course and study length.", href: routes.students, label: "View roadmap" },
            { title: "I’m retiring in Spain", text: "Start with the roadmap for retirement planning, then check the route that matches your nationality, income and healthcare position.", href: routes.retireInSpain, label: "View roadmap" },
            { title: "I’m self-employed", text: "Start with the roadmap for self-employment and autónomo planning, then confirm whether it fits your residence route.", href: routes.selfEmployed, label: "View roadmap" }
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
          children: `<p>If you are unsure which route applies to you, use the EU or non-EU path as an orientation step, then confirm the route that matches your nationality, purpose and personal situation. Every guide explains who it applies to and points you to the next step.</p>`
        })
      ]
    })
  },
  {
    route: routes.esStartHere,
    html: GuideLayout({
      lang: "es",
      path: routes.esStartHere,
      canonical: `https://iberigo.eu${routes.esStartHere}`,
      altHref: startHerePair.es.altHref,
      hreflangAlternates: startHerePair.es.hreflangAlternates,
      title: "Empieza aquí: mudarse a España — IberiGo",
      description: "Encuentra la guía de IberiGo adecuada para tu mudanza a España, tanto si eres ciudadano de la UE, ciudadano no UE, estudiante, trabajador, jubilado o vienes con familia.",
      metadata: guideMetadataFor(routes.esStartHere),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí" }],
      hero: {
        kicker: "Empieza aquí",
        title: "Mudarse a España empieza aquí.",
        intro: "Elige la situación que más se parece a la tuya y te indicaremos la guía que explica qué revisar después.",
        asideTitle: "Punto de partida sencillo",
        asideText: "No necesitas conocer todos los términos administrativos antes de empezar, pero sí conviene confirmar qué ruta encaja con tu nacionalidad, tu motivo de mudanza y tu situación personal."
      },
      sections: [
        GuideSection({
          id: "chooseYourPath",
          title: "Elige tu ruta",
          children: `${InfoBox({
            title: "Sobre esta página",
            text: "Esta página forma parte del sistema de guías de IberiGo en español. Algunas guías enlazadas todavía están disponibles solo en inglés; las versiones en español se prepararán en pasos separados."
          })}${StartHereCards([
            { title: "Soy ciudadano de la UE", text: "Empieza con la hoja de ruta para ciudadanos de la UE, del EEE y de Suiza que se mudan a España.", href: routes.esEuRoadmap, label: "Ver hoja de ruta" },
            { title: "Soy ciudadano no UE", text: "Empieza con la hoja de ruta para ciudadanos no UE y confirma después la vía concreta que encaja con tu caso.", href: routes.esNonEuRoadmap, label: "Ver hoja de ruta" },
            { title: "Voy a reunirme con familia en España", text: "Empieza con la ruta familiar que parezca más cercana a tu situación y confirma los requisitos aplicables antes de preparar documentos.", href: routes.esEuFamilyMemberRoadmap, label: "Ver hoja de ruta" },
            { title: "Me mudo por trabajo", text: "Empieza con la hoja de ruta sobre trabajo y revisa después la vía que corresponde a tu nacionalidad y situación laboral.", href: routes.esWorkInSpain, label: "Ver hoja de ruta" },
            { title: "Me mudo para estudiar", text: "Empieza con la hoja de ruta para estudiantes y confirma las normas según tu nacionalidad, el curso y la duración de los estudios.", href: routes.esStudents, label: "Ver hoja de ruta" },
            { title: "Me jubilo en España", text: "Empieza con la hoja de ruta para jubilación y recursos suficientes, y revisa ingresos, asistencia sanitaria y residencia con cautela.", href: routes.esRetireInSpain, label: "Ver hoja de ruta" },
            { title: "Trabajo por cuenta propia", text: "Empieza con la hoja de ruta para autónomos y confirma si esa vía encaja con tu permiso o residencia antes de actuar.", href: routes.esSelfEmployed, label: "Ver hoja de ruta" }
          ])}`
        }),
        GuideSection({
          id: "mostPeopleStartHere",
          title: "La mayoría de las personas empieza aquí",
          children: StartHereGuideCards([
            { title: "Mudarse a España como ciudadano de la UE", text: "Entiende el orden general de planificación, llegada y primeros trámites.", href: routes.esEuRoadmap, label: "Ver la hoja de ruta UE" },
            { title: "Lista de documentos", text: "Prepara un expediente básico antes de citas, alquileres o trámites administrativos.", href: routes.esChecklist, label: "Ver la lista" },
            { title: "Encontrar alojamiento", text: "Revisa cómo el alojamiento puede afectar al empadronamiento, contratos y pruebas de dirección.", href: routes.esAccommodation, label: "Ver la guía" },
            { title: "Primeros pasos al llegar", text: "Ordena los pasos principales después de llegar, sin asumir plazos fijos.", href: routes.esSettling, label: "Ver la guía" },
            { title: "Abrir una cuenta bancaria", text: "Compara documentos, comisiones y uso diario de una cuenta bancaria en España.", href: routes.esBanking, label: "Ver la guía" }
          ])
        }),
        GuideSection({
          id: "howGuidesWork",
          title: "Cómo funcionan las guías de IberiGo",
          children: `${Cards([
            { title: "Planificación", text: "Entender tu ruta y los documentos que pueden ser importantes." },
            { title: "Llegada", text: "Organizar alojamiento, padrón, tarjeta sanitaria y otros pasos en un orden práctico." },
            { title: "Instalación", text: "Pasar a cuenta bancaria, certificado digital, Seguridad Social, impuestos y administración diaria." }
          ])}${ChecklistBox({
            title: "Cada guía explica",
            items: ["qué es el paso", "a quién puede afectar", "qué conviene preparar", "qué revisar después"]
          })}`
        }),
        GuideSection({
          id: "languageNote",
          title: "Sobre los enlaces en inglés",
          children: `<p>Algunas rutas enlazan a guías actuales en inglés porque las versiones españolas todavía no existen. No asumas que una guía enlazada cubre todas las situaciones: usa cada página como orientación práctica y confirma siempre los requisitos oficiales que correspondan a tu caso.</p>`
        }),
        GuideSection({
          id: "notSure",
          title: "¿No sabes por dónde empezar?",
          children: `<p>Si no tienes claro qué ruta se aplica a ti, empieza por la vía UE o no UE como orientación. Después confirma la ruta que encaja con tu nacionalidad, tu motivo de mudanza y tus circunstancias personales. En España, algunos detalles pueden variar según la provincia, el municipio, la oficina o el momento de la cita.</p>`
        })
      ]
    })
  },
  {
    route: routes.esChecklist,
    html: GuideLayout({
      lang: "es",
      path: routes.esChecklist,
      canonical: `https://iberigo.eu${routes.esChecklist}`,
      altHref: checklistPair.es.altHref,
      hreflangAlternates: checklistPair.es.hreflangAlternates,
      title: "Lista de documentos para mudarte a España — IberiGo",
      description: "Una lista práctica de documentos que puedes necesitar antes de mudarte a España: identidad, residencia, sanidad, ingresos, vivienda y copias oficiales.",
      metadata: guideMetadataFor(routes.esChecklist),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Lista de documentos" }],
      hero: {
        kicker: "Documentos y preparación",
        title: "Lista de documentos para mudarte a España",
        intro: "Una guía práctica sobre los documentos que puedes necesitar antes y después de llegar a España, para prepararte con tiempo y evitar retrasos innecesarios.",
        asideTitle: "No todo aplica a tu caso",
        asideText: "Tus documentos dependen de tu nacionalidad, tu ruta, el municipio y el tipo de cita. Comprueba siempre los requisitos de tu propio trámite antes de confiar en cualquier lista general."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta lista como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Los documentos que puedes necesitar dependen de tu nacionalidad, tu vía de residencia y el procedimiento local. Muchas personas recién llegadas preparan documentos de identidad, prueba de ingresos, documentos sanitarios, documentos de vivienda y copias. Algunos documentos extranjeros pueden necesitar traducción o legalización. Normalmente conviene prepararlos con antelación en lugar de esperar hasta la cita.</p>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>Idea principal</th><td>Prepara con tiempo los documentos de identidad, ingresos, sanidad, domicilio y cita cuando apliquen a tu ruta.</td></tr>
            <tr><th>No es universal</th><td>No todas las personas necesitan todos los documentos de esta lista.</td></tr>
            <tr><th>Variación local</th><td>Los requisitos pueden variar según el municipio, la oficina y el tipo de cita.</td></tr>
            <tr><th>Documentos extranjeros</th><td>Algunos documentos pueden necesitar traducción oficial, legalización o apostilla.</td></tr>
            <tr><th>Copias</th><td>Guarda originales, copias en papel y escaneos digitales seguros cuando sea posible.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: Cards([
            { title: "Ciudadanos de la UE que se mudan a España", text: "Útil para preparar documentos comunes antes del padrón, la sanidad y el registro de la UE." },
            { title: "Residentes no UE", text: "Úsala como lista general de preparación junto con los requisitos de tu vía de residencia concreta." },
            { title: "Familiares", text: "Útil si tu situación familiar, certificados o documentos de apoyo pueden formar parte de tu ruta." },
            { title: "Trabajadores", text: "Útil si los documentos de empleo, la prueba de ingresos o los trámites de Seguridad Social pueden ser relevantes." },
            { title: "Jubilados", text: "Útil si la pensión, la sanidad o la prueba de ingresos pueden apoyar tu mudanza." },
            { title: "Estudiantes", text: "Útil si necesitas documentos de matrícula, sanidad y alojamiento." },
            { title: "Autónomos", text: "Útil si los documentos fiscales, de Seguridad Social, ingresos o actividad pueden formar parte de tu situación." },
            { title: "Personas preparando trámites", text: "Útil si te preparas para citas de padrón, sanidad, cuenta bancaria o residencia." }
          ])
        }),
        GuideSection({
          id: "documentosComunes",
          title: "Documentos comunes que preparar",
          children: `${ChecklistBox({
            title: "Lista de documentos",
            items: [
              "Pasaporte o documento de identidad nacional",
              "Certificado de nacimiento, si corresponde",
              "Certificado de matrimonio, si corresponde",
              "Prueba de domicilio",
              "Contrato de alquiler o documento de alojamiento",
              "Contrato de trabajo, si aplica",
              "Prueba de ingresos o ahorros",
              "Seguro médico o documentos de derecho a sanidad",
              "Matrícula escolar o universitaria, si aplica",
              "Certificado de pensión, si aplica",
              "Certificado de antecedentes penales, si tu ruta lo requiere",
              "Fotos tipo carnet, si se requieren",
              "Confirmaciones de cita",
              "Justificantes de tasas pagadas",
              "Copias de todos los documentos importantes"
            ]
          })}${InfoBox({ title: "No todo el mundo necesita cada elemento", text: "Usa esto como lista de preparación práctica, no como lista legal. Tus documentos exactos dependen de tu ruta, tu cita y tu oficina local." })}`
        }),
        GuideSection({
          id: "documentosCiudadanosUe",
          title: "Documentos para ciudadanos de la UE",
          children: `${Cards([
            { title: "Identidad", text: "El pasaporte o documento de identidad nacional suele ser el punto de partida." },
            { title: "EX-18, si corresponde", text: "El registro de la UE puede implicar el formulario EX-18, según el procedimiento." },
            { title: "Prueba de tu vía", text: "Puedes necesitar prueba de trabajo, actividad por cuenta propia, estudios, jubilación o medios económicos suficientes." },
            { title: "Prueba sanitaria", text: "La prueba sanitaria puede depender de si trabajas, estudias, te jubilas, usas el formulario S1, tienes seguro médico privado o utilizas otra vía reconocida." },
            { title: "Justificante de tasa", text: "El justificante del Modelo 790-012 puede ser necesario para citas del certificado de registro de ciudadano de la UE." },
            { title: "Certificado de empadronamiento", text: "Puede pedirse localmente un certificado de empadronamiento, según la oficina y la situación." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Los requisitos pueden variar según la oficina y la situación. Comprueba los requisitos actuales de la cita antes de acudir.</p></div>`
        }),
        GuideSection({
          id: "documentosNoUe",
          title: "Documentos para ciudadanos no UE",
          children: `${Cards([
            { title: "Visado o autorización", text: "Puedes necesitar documentos de visado o autorización de residencia según tu vía." },
            { title: "Pasaporte", text: "Un pasaporte válido suele ser central en los trámites de inmigración y residencia no UE." },
            { title: "Cita para la TIE", text: "Puede necesitarse confirmación de cita para la TIE en los pasos relacionados con la tarjeta." },
            { title: "Formulario EX correspondiente", text: "El formulario EX aplicable depende del procedimiento concreto." },
            { title: "Fotos y pago de tasa", text: "Pueden requerirse fotos tipo carnet y el pago de la tasa oficial." },
            { title: "Domicilio y documentos de apoyo", text: "Se puede solicitar prueba de domicilio y documentos de apoyo específicos de tu ruta." }
          ])}${InfoBox({ title: "Solo introductorio", text: "Las vías no UE varían de forma significativa. Usa siempre los requisitos oficiales de tu visado o procedimiento de residencia concreto." })}`
        }),
        GuideSection({
          id: "documentosViviendaPadron",
          title: "Documentos de vivienda y padrón",
          children: `${ChecklistBox({
            title: "Prueba de domicilio que puedes necesitar",
            items: [
              "Contrato de alquiler",
              "Escritura de propiedad, si eres propietario",
              "Autorización del propietario, si aplica",
              "Copia del documento de identidad de quien autoriza el empadronamiento, si aplica",
              "Factura de suministro, si se solicita localmente"
            ]
          })}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Las normas sobre documentos del padrón varían según el municipio. Comprueba los requisitos de tu ayuntamiento antes de la cita.</p></div>`
        }),
        GuideSection({
          id: "documentosSanitarios",
          title: "Documentos sanitarios",
          children: `${Cards([
            { title: "Seguro médico privado", text: "Un certificado de seguro médico privado puede ser necesario para algunas vías." },
            { title: "Formulario S1", text: "El formulario S1 puede ser relevante para algunos pensionistas o vías de sanidad transfronteriza." },
            { title: "Trabajo o Seguridad Social", text: "El empleo o el alta en la Seguridad Social puede apoyar algunas vías de sanidad pública." },
            { title: "Documentos del servicio de salud regional", text: "Los servicios de salud regionales pueden pedir sus propios formularios o confirmaciones." },
            { title: "Identidad y NIE", text: "Puede pedirse pasaporte, documento de identidad nacional o NIE según el trámite." },
            { title: "Certificado de empadronamiento", text: "Puede requerirse un certificado de empadronamiento para el registro en el centro de salud local." }
          ])}<p>Consulta la guía en inglés <a href="${routes.healthcare}">Healthcare in Spain</a> para comparar las vías sanitarias antes de preparar los documentos.</p>`
        }),
        GuideSection({
          id: "documentosBancoFinanzas",
          title: "Documentos de banco y finanzas",
          children: `${Cards([
            { title: "Identidad", text: "Se suele solicitar pasaporte o documento de identidad nacional." },
            { title: "NIE, si lo tienes", text: "Algunos bancos pueden pedir el NIE si ya lo tienes." },
            { title: "Domicilio", text: "Puede solicitarse prueba de domicilio según el banco y el tipo de cuenta." },
            { title: "Ingresos", text: "Puede pedirse contrato de trabajo, nóminas, prueba de ingresos o ahorros." },
            { title: "Información fiscal", text: "Los bancos pueden solicitar información sobre residencia fiscal." },
            { title: "Documentos de residencia", text: "Puede pedirse un certificado o tarjeta de residencia si ya lo tienes." }
          ])}<p>Consulta la <a href="${routes.esBanking}">guía de cuenta bancaria</a> para preparar los documentos específicos de la cuenta.</p>`
        }),
        GuideSection({
          id: "traduccionesApostillasCopias",
          title: "Traducciones, apostillas y copias",
          children: Cards([
            { title: "Traducción oficial", text: "Algunos documentos extranjeros pueden necesitar traducción oficial." },
            { title: "Legalización o apostilla", text: "Algunos documentos pueden necesitar legalización o apostilla, según el trámite y el país de origen." },
            { title: "Reglas según el trámite", text: "No des por hecho que la misma regla de traducción o apostilla se aplica a todas las citas." },
            { title: "Originales y copias", text: "Lleva originales y copias cuando sea posible, salvo que las instrucciones de la cita indiquen otra cosa." },
            { title: "Escaneos seguros", text: "Guarda escaneos digitales en un lugar seguro para encontrarlos rápidamente." },
            { title: "Revisa fechas de caducidad", text: "Algunos documentos pueden necesitar ser recientes o estar en vigor en la fecha de la cita." }
          ])
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que una sola lista sirve para todo el mundo.",
            "Olvidar las copias.",
            "Confiar solo en capturas de pantalla del móvil.",
            "No comprobar las fechas de caducidad de los documentos.",
            "No preparar las traducciones con tiempo.",
            "Llevar documentos que no se aceptan localmente.",
            "Perder las confirmaciones de cita.",
            "No guardar el justificante de pago de la tasa.",
            "Suponer que los requisitos del padrón son iguales en todas partes."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Necesito originales o copias?", text: "A menudo conviene llevar originales y copias cuando sea posible. Comprueba las instrucciones de la cita, porque algunos trámites pueden quedarse con las copias o pedir ver los originales." },
            { title: "¿Los documentos extranjeros necesitan traducción?", text: "Algunos pueden necesitarla, según el documento, el trámite y el país de origen. Compruébalo antes de la cita." },
            { title: "¿Necesito una apostilla?", text: "Algunos documentos extranjeros pueden necesitar legalización o apostilla. La respuesta depende del país de origen y del trámite." },
            { title: "¿Puedo usar copias digitales?", text: "Los escaneos digitales son útiles para tus propios archivos, pero muchas citas pueden seguir pidiendo originales o copias en papel." },
            { title: "¿Qué documentos debería traer de mi país de origen?", text: "Documentos de identidad, certificados de estado civil, documentos educativos o laborales, prueba de pensión, certificado de antecedentes penales y documentos sanitarios pueden ser más difíciles de obtener después de mudarte." },
            { title: "¿Los ciudadanos de la UE necesitan los mismos documentos que los no UE?", text: "No. Las vías UE y no UE son distintas, y los requisitos también varían según la situación." },
            { title: "¿Debería preparar los documentos antes de llegar a España?", text: "Normalmente sí, si es probable que apliquen a tu ruta. Algunos documentos son más fáciles de obtener, traducir o legalizar antes de mudarte." }
          ].map((item) => ({ title: item.title, text: item.text })))
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver la hoja de ruta UE (en inglés)", href: routes.euRoadmap },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de registro de la UE (en inglés)", href: routes.euRegistration }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Crea una carpeta para originales, otra para copias y una carpeta digital segura. Nombra los archivos con claridad por tipo de documento y fecha.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esAccommodation,
    html: GuideLayout({
      lang: "es",
      path: routes.esAccommodation,
      canonical: `https://iberigo.eu${routes.esAccommodation}`,
      altHref: accommodationPair.es.altHref,
      hreflangAlternates: accommodationPair.es.hreflangAlternates,
      title: "Encontrar alojamiento en España — IberiGo",
      description: "Una guía práctica para encontrar alojamiento en España: alquiler temporal, alquiler de larga duración, documentos, contratos, fianzas, estafas y errores comunes.",
      metadata: guideMetadataFor(routes.esAccommodation),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Encontrar alojamiento" }],
      hero: {
        kicker: "Vivienda y domicilio",
        title: "Encontrar alojamiento en España",
        intro: "Una guía práctica para encontrar dónde vivir en España, entender lo básico del alquiler, preparar documentos y evitar problemas comunes antes de firmar.",
        asideTitle: "Tu domicilio afecta a pasos posteriores",
        asideText: "Un alquiler puede afectar al empadronamiento, la sanidad, la cuenta bancaria, las notificaciones oficiales y los servicios locales, así que revisa la documentación del domicilio antes de comprometerte."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Muchas personas recién llegadas empiezan con alojamiento temporal antes de firmar un contrato de alquiler de larga duración. Los alquileres de larga duración pueden requerir documentos y justificante de ingresos. El empadronamiento puede depender de tener un domicilio donde el registro sea posible. Revisa los contratos de alquiler con cuidado antes de firmar y valora el asesoramiento profesional si algo no queda claro. Existen estafas y anuncios engañosos, sobre todo en internet.</p>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>Primer paso habitual</th><td>El alojamiento temporal puede darte tiempo para visitar zonas y ver propiedades en persona.</td></tr>
            <tr><th>Alquiler de larga duración</th><td>Suele ser mejor para la estabilidad y puede apoyar trámites posteriores.</td></tr>
            <tr><th>Documentos</th><td>El arrendador o la agencia inmobiliaria pueden pedir identidad, ingresos y justificantes de pago.</td></tr>
            <tr><th>Padrón</th><td>Pregunta si el arrendador puede aportar los documentos necesarios para el empadronamiento.</td></tr>
            <tr><th>Antes de pagar</th><td>Verifica con cuidado la propiedad, el contrato y quién recibe el pago.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: Cards([
            { title: "Ciudadanos de la UE que se mudan a España", text: "Útil si necesitas un domicilio antes del padrón, la sanidad, la cuenta bancaria o el registro de la UE." },
            { title: "Residentes no UE", text: "Útil si los trámites de alojamiento pueden estar relacionados con la residencia, notificaciones o el registro local." },
            { title: "Trabajadores", text: "Útil si necesitas vivienda cerca del trabajo, el transporte o las oficinas que debes visitar." },
            { title: "Jubilados", text: "Útil si estás comparando vivienda estable, servicios locales y acceso a la sanidad." },
            { title: "Estudiantes", text: "Útil si comparas alojamiento para estudiantes, pisos compartidos u opciones de llegada a corto plazo." },
            { title: "Familias", text: "Útil si los colegios, la sanidad, el transporte y los servicios locales influyen en dónde vivir." },
            { title: "Personas sin domicilio permanente todavía", text: "Útil si necesitas una opción provisional mientras buscas en persona." },
            { title: "Personas que se preparan para el padrón", text: "Útil si necesitas comprobar si un domicilio puede servir para el registro municipal." }
          ])
        }),
        GuideSection({
          id: "temporalVsLargaDuracion",
          title: "Alojamiento temporal frente a alquiler de larga duración",
          children: `${Cards([
            { title: "Temporal: útil al llegar", text: "El alojamiento temporal puede ayudarte a llegar con calma mientras conoces la zona y ves viviendas en persona." },
            { title: "Temporal: más fácil antes de tener documentos", text: "Puede ser más fácil reservarlo antes de tener documentos españoles o justificante de ingresos local." },
            { title: "Temporal: el padrón puede no ser posible", text: "El alojamiento de corta duración puede no siempre ofrecer los documentos necesarios para el empadronamiento." },
            { title: "Larga duración: más estabilidad", text: "Un alquiler de larga duración suele ser mejor para una vida estable, los servicios locales y los trámites diarios." },
            { title: "Larga duración: más documentos", text: "Los alquileres de larga duración pueden requerir más documentos y un justificante de ingresos o garantías más sólidas." },
            { title: "Larga duración: importan las condiciones del contrato", text: "Conviene revisar la duración, las normas de preaviso, la fianza, los suministros y la documentación del domicilio antes de firmar." }
          ])}${InfoBox({ title: "Pregunta antes de firmar", text: "No des por hecho que todos los alquileres permiten el empadronamiento. Pregunta por escrito si el arrendador o la agencia inmobiliaria pueden aportar los documentos necesarios para el registro municipal." })}`
        }),
        GuideSection({
          id: "porQueImportaElDomicilio",
          title: "Por qué importa el domicilio",
          children: `${Cards([
            { title: "Empadronamiento", text: "Tu domicilio puede afectar a si puedes empadronarte y dónde." },
            { title: "Registro sanitario", text: "El registro sanitario local puede depender de dónde vives y de tu servicio de salud regional." },
            { title: "Matrícula escolar", text: "Para familias, el acceso al colegio o las zonas de escolarización pueden depender del domicilio." },
            { title: "Trámites bancarios", text: "Los bancos pueden pedir información o justificante de domicilio según la cuenta y tu situación." },
            { title: "Notificaciones oficiales", text: "Tu domicilio puede usarse para correspondencia oficial y registros administrativos." },
            { title: "Servicios locales", text: "El transporte, los centros de salud, las oficinas del ayuntamiento y los servicios diarios varían según el barrio y el municipio." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Antes de firmar, pregunta si el arrendador aportará los documentos necesarios para el empadronamiento. Consigue las confirmaciones importantes por escrito.</p></div>`
        }),
        GuideSection({
          id: "documentosQuePuedePedirElArrendador",
          title: "Documentos que puede pedir el arrendador",
          children: `${Cards([
            { title: "Documento de identidad", text: "Se suele pedir pasaporte o documento de identidad nacional." },
            { title: "NIE, si lo tienes", text: "Algunos arrendadores o agencias inmobiliarias pueden pedir el NIE si ya lo tienes." },
            { title: "Trabajo e ingresos", text: "Puede pedirse contrato de trabajo, nóminas, justificante de ingresos o referencias bancarias." },
            { title: "Historial de alquiler", text: "Referencias de alquileres anteriores pueden ayudar, sobre todo en zonas muy demandadas." },
            { title: "Fianza", text: "Se suele pedir una fianza y un pago inicial antes de la entrada." },
            { title: "Garantía", text: "En algunos casos puede pedirse un avalista o una garantía adicional." }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Los requisitos exactos varían según el arrendador y la agencia inmobiliaria. Pregunta por la lista de documentos necesarios antes de concertar una visita o enviar información sensible.</p></div>`
        }),
        GuideSection({
          id: "contratosDeAlquiler",
          title: "Contratos de alquiler",
          children: Cards([
            { title: "Léelo con atención", text: "Lee el contrato de alquiler con atención y valora el asesoramiento profesional antes de firmar si algo no queda claro." },
            { title: "Condiciones principales", text: "Comprueba la renta, la fianza, la duración, la renovación, el preaviso y la fecha de entrada." },
            { title: "Suministros", text: "Comprueba qué suministros están incluidos y cuáles puede que tengas que contratar o pagar aparte." },
            { title: "Gastos adicionales", text: "Pregunta quién paga la comunidad, la tasa de basuras u otros gastos recurrentes cuando corresponda." },
            { title: "Documentos para el padrón", text: "Comprueba si la vivienda puede usarse para el padrón y qué documentos aportará el arrendador." },
            { title: "Guarda los justificantes", text: "Guarda copias firmadas, recibos, justificantes de transferencia bancaria y confirmaciones por escrito." }
          ])
        }),
        GuideSection({
          id: "fianzaYPagosIniciales",
          title: "Fianza y pagos iniciales",
          children: `${Cards([
            { title: "Fianza y garantías", text: "El arrendador puede pedir una fianza y garantías adicionales, según el alquiler y tu situación." },
            { title: "Comisión de agencia", text: "Puede haber comisión de la agencia inmobiliaria en algunos casos, así que pregunta para qué es cada pago antes de aceptar." },
            { title: "Verifica antes de pagar", text: "Evita enviar pagos importantes sin verificar la propiedad, el contrato y quién recibe el dinero." },
            { title: "Pagos rastreables", text: "Usa métodos de pago rastreables y evita vías de pago poco claras." },
            { title: "Justificantes", text: "Guarda justificantes y confirmación por escrito de cada pago." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Si sientes presión para pagar antes de poder verificar el anuncio o el contrato, tómate tu tiempo y revisa los detalles con cuidado.</p></div>`
        }),
        GuideSection({
          id: "evitarEstafas",
          title: "Evitar estafas",
          children: Cards([
            { title: "Demasiado bueno para ser verdad", text: "Un precio muy bajo en una zona muy demandada puede ser una señal de alerta." },
            { title: "Sin visita ni videollamada", text: "Ten cuidado si el arrendador se niega a una visita, una videollamada o una verificación razonable." },
            { title: "Presión para pagar rápido", text: "Quienes estafan suelen crear urgencia para que no revises los detalles." },
            { title: "Fotos de mala calidad o robadas", text: "Fotos que parecen inconsistentes, genéricas o reutilizadas pueden ser una señal de alerta." },
            { title: "Sin contrato", text: "Evita pagar cantidades importantes sin un contrato claro o condiciones por escrito." },
            { title: "Datos de pago sospechosos", text: "Comprueba si el destinatario del pago y los datos de la cuenta tienen sentido para la propiedad y el acuerdo." },
            { title: "Documentos sensibles demasiado pronto", text: "Ten cuidado si se piden documentos de identidad de forma inusualmente temprana y sin contexto." },
            { title: "Los datos no coinciden", text: "Verifica que la dirección, las fotos, los detalles de la visita, la información del arrendador o la agencia y los datos del contrato coincidan." }
          ])
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Firmar antes de comprobar si es posible el empadronamiento.",
            "Confiar solo en las fotos.",
            "No comprobar los gastos adicionales.",
            "No guardar justificantes de pago.",
            "Suponer que los alquileres de corta duración sirven para trámites de residencia.",
            "Ignorar el domicilio para notificaciones oficiales.",
            "No comprobar el transporte y los servicios diarios.",
            "Mudarte demasiado lejos de las oficinas necesarias o del trabajo."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puedo usar Airbnb o alojamiento temporal para el padrón?", text: "A veces puede ser posible, pero no lo des por hecho. Pregunta si el alojamiento puede aportar los documentos que exige tu ayuntamiento." },
            { title: "¿Necesito un contrato de alquiler para el padrón?", text: "Los ayuntamientos suelen pedir alguna prueba de domicilio. Los documentos exactos pueden variar según el municipio y la situación." },
            { title: "¿Puedo alquilar antes de conseguir el NIE?", text: "Puede ser posible, según el arrendador o la agencia. Algunos pueden aceptar pasaporte o documento de identidad nacional, mientras que otros pueden pedir el NIE." },
            { title: "¿Qué documentos piden los arrendadores?", text: "Pueden pedir documentos de identidad, NIE si lo tienes, justificante de ingresos, contrato de trabajo, nóminas, referencias, fianza y a veces garantías adicionales." },
            { title: "¿Debería pagar antes de ver la vivienda?", text: "Sé muy prudente. Si no puedes verla en persona, intenta verificarla mediante videollamada, comprobaciones de la agencia, revisión del contrato y pagos rastreables antes de enviar dinero." },
            { title: "¿Puede un arrendador negarse al empadronamiento?", text: "La cuestión práctica suele ser si el arrendador aportará los documentos que pide el ayuntamiento. Pregunta antes de firmar y guarda la confirmación por escrito." },
            { title: "¿Es mejor alquilar primero a corto plazo?", text: "Muchas personas recién llegadas lo hacen porque les da tiempo para comparar zonas y no precipitarse. Puede que no resuelva las necesidades del padrón o del papeleo de larga duración, así que planifica el siguiente paso con antelación." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver la guía de primeros pasos", href: routes.esSettling },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de cuenta bancaria", href: routes.esBanking }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Antes de comprometerte con un alquiler, mantén una lista escrita con los documentos para el padrón, el coste total de entrada, las condiciones del contrato, el transporte, el acceso a la sanidad y la distancia al trabajo o al colegio.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esSettling,
    html: GuideLayout({
      lang: "es",
      path: routes.esSettling,
      canonical: `https://iberigo.eu${routes.esSettling}`,
      altHref: settlingPair.es.altHref,
      hreflangAlternates: settlingPair.es.hreflangAlternates,
      title: "Instalarte en España: tus primeros pasos al llegar — IberiGo",
      description: "Una guía práctica sobre los primeros pasos al llegar a España: alojamiento, padrón, sanidad, registro, cuenta bancaria y acceso digital.",
      metadata: guideMetadataFor(routes.esSettling),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Instalarte en España" }],
      hero: {
        kicker: "Guía de llegada",
        title: "Instalarte en España",
        intro: "Una guía tranquila y práctica sobre los primeros pasos al llegar a España. Sigue los pasos en orden, pero ten en cuenta que la disponibilidad de citas puede variar según la provincia y el municipio.",
        asideTitle: "Secuencia, no plazos",
        asideText: "Usa esta guía para entender qué suele venir antes de qué, y después consulta la guía detallada de cada paso."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Después de llegar a España, la secuencia práctica suele empezar por el alojamiento y la prueba de domicilio local, seguida del padrón, la sanidad, el registro de residencia si corresponde, la cuenta bancaria, el acceso digital, la Seguridad Social si trabajas, la revisión de impuestos y la comprobación del carné de conducir. El orden exacto puede cambiar según tu situación y la disponibilidad de citas en tu zona.</p>`
        }),
        GuideSection({
          id: "losPlazosVarian",
          title: "Los plazos varían",
          children: `<p>El orden de estos pasos importa más que la rapidez. En algunas zonas, las citas pueden estar disponibles con rapidez. En otras, incluidas zonas muy demandadas, la espera puede ser mucho más larga. Esta guía explica qué hacer a continuación sin prometer un plazo fijo.</p>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>Objetivo principal</th><td>Entender la secuencia práctica después de llegar.</td></tr>
            <tr><th>¿Plazo fijo?</th><td>No. La disponibilidad de citas puede variar según la provincia y el municipio.</td></tr>
            <tr><th>Prueba de domicilio</th><td>La prueba de domicilio puede afectar al padrón, la sanidad, la cuenta bancaria y otros pasos.</td></tr>
            <tr><th>¿Para quién es esto?</th><td>Para personas que ya han llegado a España o que planifican los trámites de su llegada.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "asegurarAlojamiento",
          title: "Asegura tu alojamiento",
          children: `${Cards([
            { title: "Llegada", text: "Tu domicilio suele ser la base de los pasos posteriores, incluso si tu primer alojamiento es temporal." },
            { title: "Requisitos oficiales", text: "Los requisitos dependen del trámite que use la prueba de domicilio. Los ayuntamientos y otras oficinas pueden pedir pruebas distintas." },
            { title: "Consejo práctico", text: "Antes de firmar o pagar, pregunta si el domicilio puede servir para el papeleo que esperas necesitar, especialmente el padrón." }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda juntos el contrato de alquiler, las autorizaciones, los recibos y los datos de contacto para poder compararlos con las instrucciones locales.</p></div>`
        }),
        GuideSection({
          id: "empadronarte",
          title: "Empadrónate",
          children: `${Cards([
            { title: "Registro", text: "El padrón es el registro municipal de domicilio en el ayuntamiento del lugar donde vives." },
            { title: "Requisitos oficiales", text: "Los documentos varían según el municipio y la situación de la vivienda. El ayuntamiento decide qué pruebas acepta." },
            { title: "Consejo práctico", text: "Consulta el trámite de tu ayuntamiento con tiempo, porque la disponibilidad de citas y los documentos aceptados pueden variar según el municipio." }
          ])}<p>Consulta la <a href="${routes.padron}">guía del padrón (en inglés)</a> cuando estés listo para preparar los documentos de este paso.</p>`
        }),
        GuideSection({
          id: "organizarSanidad",
          title: "Organiza tu sanidad",
          children: `${Cards([
            { title: "Registro", text: "Conviene entender la sanidad antes de cualquier trámite que te pida demostrar cobertura o derecho a asistencia." },
            { title: "Requisitos oficiales", text: "Tu vía puede depender del trabajo, la actividad por cuenta propia, un formulario S1, la condición de estudiante, el seguro privado u otro derecho." },
            { title: "Consejo práctico", text: "No des por hecho que la misma vía se aplica a todas las personas recién llegadas. La prueba sanitaria depende de tu situación." }
          ])}<p>La <a href="${routes.healthcare}">guía de sanidad (en inglés)</a> explica las principales vías y las dudas habituales sobre las pruebas necesarias.</p>`
        }),
        GuideSection({
          id: "registrarseComoResidenteUe",
          title: "Regístrate como residente de la UE, si corresponde",
          children: `${Cards([
            { title: "Registro", text: "Los ciudadanos de la UE, del EEE y de Suiza que viven en España a largo plazo suelen usar la vía del certificado de registro de ciudadano de la UE." },
            { title: "Requisitos oficiales", text: "Las pruebas dependen de si trabajas, eres autónomo, estudias, te jubilas o vives de tus ahorros." },
            { title: "Consejo práctico", text: "Prepara la sanidad, el domicilio y las pruebas de tu vía antes de la cita, y comprueba las instrucciones exactas de tu provincia." }
          ])}<p>Consulta la <a href="${routes.euRegistration}">guía de registro de la UE (en inglés)</a> si esta vía se aplica a tu caso.</p><div class="guide-box guide-box--warning"><strong>Importante</strong><p>Los ciudadanos de la UE normalmente se preparan para el certificado de registro de ciudadano de la UE, no para una TIE. Los familiares no comunitarios u otras vías pueden seguir trámites distintos.</p></div>`
        }),
        GuideSection({
          id: "abrirCuentaBancaria",
          title: "Abre una cuenta bancaria",
          children: `${Cards([
            { title: "Instalación diaria", text: "Una cuenta bancaria española puede ayudarte con el alquiler, los suministros, la nómina, los impuestos y los pagos locales." },
            { title: "Requisitos oficiales", text: "Los bancos suelen necesitar identificar a sus clientes, pero los documentos aceptados y los tipos de cuenta pueden variar según el banco y tu situación." },
            { title: "Consejo práctico", text: "Compara comisiones, documentos solicitados y si la cuenta encaja con una situación de residente o no residente." }
          ])}<p>Consulta la <a href="${routes.esBanking}">guía de cuenta bancaria</a> para saber qué comparar antes de elegir una cuenta.</p>`
        }),
        GuideSection({
          id: "certificadoDigitalOClave",
          title: "Configura el certificado digital o Cl@ve",
          children: `${Cards([
            { title: "Instalación diaria", text: "El acceso digital te ayuda a usar en línea los portales de impuestos, Seguridad Social, ayuntamiento y otros servicios públicos." },
            { title: "Requisitos oficiales", text: "La vía que puedas usar puede depender de tus documentos de identidad, tu NIE y las opciones de verificación disponibles." },
            { title: "Consejo práctico", text: "Configura esto cuando tus datos de identidad estén suficientemente listos para la vía de verificación que elijas." }
          ])}<p>Consulta la <a href="${routes.digital}">guía del certificado digital (en inglés)</a> para comparar el certificado digital de la FNMT y las opciones de Cl@ve.</p>`
        }),
        GuideSection({
          id: "revisarSeguridadSocial",
          title: "Revisa la Seguridad Social, si trabajas",
          children: `${Cards([
            { title: "Instalación diaria", text: "Si trabajas o te haces autónomo en España, el alta en la Seguridad Social puede afectar al trabajo, las cotizaciones y el derecho a sanidad." },
            { title: "Requisitos oficiales", text: "Los requisitos dependen de si eres trabajador por cuenta ajena, autónomo o estás en otra situación laboral." },
            { title: "Consejo práctico", text: "Diferencia entre conseguir un número de la Seguridad Social y estar correctamente dado de alta para trabajar o cotizar." }
          ])}<p>Si el trabajo se aplica a tu caso, consulta la <a href="${routes.social}">guía de Seguridad Social (en inglés)</a> antes de asumir que tu empresa, cliente o gestor ha completado todos los pasos.</p>`
        }),
        GuideSection({
          id: "entenderImpuestos",
          title: "Entiende tus obligaciones fiscales",
          children: `${Cards([
            { title: "Instalación diaria", text: "Las cuestiones fiscales pueden surgir por la residencia, los ingresos, los bienes, el trabajo, la actividad por cuenta propia o la propiedad." },
            { title: "Requisitos oficiales", text: "Las obligaciones fiscales dependen de tu situación y pueden implicar ingresos o bienes españoles y no españoles." },
            { title: "Consejo práctico", text: "Revisa tu situación fiscal antes de que los plazos o avisos se vuelvan urgentes, sobre todo si tu situación cruza países." }
          ])}<p>La <a href="${routes.taxes}">guía de impuestos (en inglés)</a> ofrece un punto de partida claro sobre residencia fiscal, domicilio fiscal y primeras comprobaciones.</p>`
        }),
        GuideSection({
          id: "comprobarCarnetDeConducir",
          title: "Comprueba las normas del carné de conducir",
          children: `${Cards([
            { title: "Instalación diaria", text: "Las normas de conducción dependen de dónde se emitió tu carné y de si estás de visita o vives en España." },
            { title: "Requisitos oficiales", text: "La validez, el canje o la renovación del carné pueden variar según el país de emisión y tu situación de residencia." },
            { title: "Consejo práctico", text: "Comprueba las normas antes de confiar en suposiciones antiguas de visitas turísticas o de otro país." }
          ])}<p>Consulta la <a href="${routes.driving}">guía de conducción (en inglés)</a> para saber qué dudas sobre el carné conviene revisar a continuación.</p>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Tratar los pasos de llegada como plazos fijos en lugar de una secuencia que depende de las citas y las normas locales.",
            "Firmar un alojamiento sin comprobar si puede servir para el padrón o para pruebas de domicilio posteriores.",
            "Suponer que la prueba sanitaria es igual para trabajadores, jubilados, estudiantes y residentes que viven de sus propios recursos.",
            "Reservar la cita de residencia equivocada porque la terminología resulta confusa.",
            "Dejar para más tarde las preguntas de cuenta bancaria, acceso digital, impuestos y carné de conducir hasta que otro trámite se bloquea."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Debo hacerlo todo exactamente en este orden?", text: "Usa esto como una secuencia general, pero adáptala a tu situación y a la disponibilidad de citas en tu zona. Parte de la preparación puede hacerse en paralelo." },
            { title: "¿Puedo empadronarme con alojamiento temporal?", text: "Depende del municipio y de las pruebas que tengas. Comprueba las instrucciones del ayuntamiento antes de asumir que el domicilio será aceptado." },
            { title: "¿Necesito la sanidad antes del registro de la UE?", text: "Depende de tu vía de registro de la UE. Si no trabajas, la prueba sanitaria puede ser una parte importante del expediente de registro." },
            { title: "¿Esto es solo para ciudadanos de la UE?", text: "No. Muchos pasos de llegada se aplican de forma general, pero el registro de la UE solo es relevante si esa vía se aplica a tu caso." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la guía de cuenta bancaria", href: routes.esBanking }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Antes de empezar, apunta en un solo lugar tu situación (trabajo, estudios, jubilación u otra), tu provincia y municipio, y los documentos que ya tienes, para poder comparar cada paso con tu caso real.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esBanking,
    html: GuideLayout({
      lang: "es",
      path: routes.esBanking,
      canonical: `https://iberigo.eu${routes.esBanking}`,
      altHref: bankingPair.es.altHref,
      hreflangAlternates: bankingPair.es.hreflangAlternates,
      title: "Abrir una cuenta bancaria en España — IberiGo",
      description: "Una guía práctica para abrir una cuenta bancaria en España: cuentas de residente y no residente, documentos, comisiones, domiciliaciones y errores comunes.",
      metadata: guideMetadataFor(routes.esBanking),
      showTrustBlocks: true,
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Cuenta bancaria" }],
      hero: {
        kicker: "Instalación diaria",
        title: "Abrir una cuenta bancaria en España",
        intro: "Una guía práctica para elegir y abrir una cuenta bancaria española, entender los documentos habituales, evitar comisiones innecesarias y prepararte para los pagos diarios en España.",
        asideTitle: "Compara antes de abrir una cuenta",
        asideText: "No elijas un banco solo por el nombre de la cuenta o una promoción. Las condiciones, comisiones y documentos solicitados pueden variar según el banco."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>A menudo puedes abrir una cuenta de residente o de no residente en España, según tu situación de residencia y tus documentos. Los requisitos varían según el banco. Un IBAN español puede ser útil para la nómina, el alquiler, los suministros y los pagos locales. Algunas personas usan bancos online, pero ciertos servicios españoles pueden funcionar mejor con un banco tradicional español.</p>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>Tipo de cuenta</th><td>Cuenta de residente o de no residente, según tu situación y tus documentos.</td></tr>
            <tr><th>Suele ser útil para</th><td>Nómina, alquiler, suministros, impuestos, pagos a la Seguridad Social y domiciliaciones.</td></tr>
            <tr><th>¿Varían los requisitos?</th><td>Sí. Los requisitos exactos varían según el banco.</td></tr>
            <tr><th>¿Varían las comisiones?</th><td>Sí. Comprueba las condiciones actuales antes de abrir una cuenta.</td></tr>
            <tr><th>IBAN español</th><td>A menudo útil para pagos locales y para algunos proveedores españoles.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: Cards([
            { title: "Ciudadanos de la UE que se mudan a España", text: "Útil si estás preparando los pagos diarios tras la llegada o durante tus trámites de registro." },
            { title: "Residentes no UE", text: "Útil si tienes o estás preparando documentos de residencia y necesitas una cuenta práctica para vivir en España." },
            { title: "Trabajadores", text: "Útil si necesitas una cuenta para la nómina, gastos de trabajo o pagos relacionados con la Seguridad Social." },
            { title: "Jubilados", text: "Útil si necesitas una cuenta para la pensión, el alquiler, los suministros o transferencias periódicas." },
            { title: "Estudiantes", text: "Útil si necesitas una cuenta para el alquiler, las tasas, contratos de teléfono o gastos diarios." },
            { title: "Personas que organizan sus pagos", text: "Útil si estás organizando el alquiler, los suministros, el teléfono móvil, internet o la nómina." }
          ])
        }),
        GuideSection({
          id: "residenteVsNoResidente",
          title: "Cuenta de residente frente a cuenta de no residente",
          children: `${Cards([
            { title: "Cuenta de residente", text: "Una cuenta de residente suele ser para personas que pueden demostrar que viven en España y aportar los documentos que pide el banco para ese estatus." },
            { title: "Cuenta de no residente", text: "Una cuenta de no residente puede estar disponible antes de que termines tu papeleo local, según el banco y tus documentos." },
            { title: "Actualizar el estatus más adelante", text: "Después de recibir los documentos de residencia o si cambia tu situación fiscal, el banco puede pedirte que actualices los datos de tu cuenta." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No trates las etiquetas de las cuentas como asesoramiento legal. Las opciones de cuenta, los documentos solicitados y las actualizaciones de estatus pueden variar según el banco y tu situación de residencia.</p></div>`
        }),
        GuideSection({
          id: "documentosComunes",
          title: "Documentos comunes que puede pedir el banco",
          children: `${ChecklistBox({
            title: "Documentos habituales para abrir una cuenta",
            items: [
              "Pasaporte o documento de identidad nacional.",
              "NIE, si lo tienes.",
              "Justificante de domicilio.",
              "Contrato de trabajo o justificante de ingresos, si aplica.",
              "Certificado de registro de ciudadano de la UE o tarjeta de residencia, si lo tienes.",
              "Información sobre tu residencia fiscal."
            ]
          })}${InfoBox({ title: "Los requisitos exactos varían según el banco", text: "Los bancos pueden pedir pruebas distintas según tu nacionalidad, tu situación de residencia, el origen de tus ingresos, tu residencia fiscal y el tipo de cuenta." })}`
        }),
        GuideSection({
          id: "comisiones",
          title: "Comisiones",
          children: `${Cards([
            { title: "Comisiones de mantenimiento", text: "Algunas cuentas pueden cobrar comisiones mensuales o trimestrales de mantenimiento. Comprueba las condiciones actuales antes de abrir una cuenta." },
            { title: "Comisiones de tarjeta", text: "La tarjeta bancaria de débito o crédito puede tener comisiones aparte, comisiones de renovación o condiciones para evitar cargos." },
            { title: "Comisiones de transferencia", text: "Las transferencias pueden ser gratuitas en algunos casos y tener coste en otros, según el banco, el destino y las condiciones de la cuenta." },
            { title: "Condiciones para reducir comisiones", text: "Algunos bancos reducen o eliminan comisiones si cumples condiciones como domiciliar la nómina, la pensión u otros ingresos recurrentes." },
            { title: "Requisitos de domiciliación", text: "Los requisitos de domiciliación de nómina o pensión pueden variar según el banco y el tipo de cuenta." },
            { title: "Paquetes de productos", text: "Algunas ofertas pueden incluir seguros, tarjetas de crédito u otros productos. Entiende si son opcionales antes de aceptarlos." }
          ])}${WarningBox("No te fíes de tablas de comisiones antiguas, promociones o las condiciones de otra persona. Las comisiones y condiciones de la cuenta pueden cambiar, así que comprueba las condiciones actuales antes de abrir una cuenta.")}`
        }),
        GuideSection({
          id: "domiciliacionesUsoDiario",
          title: "Domiciliaciones y uso diario",
          children: `${Cards([
            { title: "Suministros", text: "Las compañías de electricidad y de agua suelen usar domiciliaciones bancarias para las facturas periódicas." },
            { title: "Servicios del hogar", text: "Las compañías de internet y de teléfono móvil pueden pedir los datos bancarios al contratar el servicio." },
            { title: "Alquiler y nómina", text: "Un IBAN español puede facilitar el pago del alquiler y el ingreso de la nómina, según el arrendador o el empleador." },
            { title: "Impuestos", text: "Una cuenta bancaria puede ser útil para pagos de impuestos o domiciliaciones cuando corresponda." },
            { title: "Seguridad Social", text: "Si eres autónomo o tienes otras obligaciones de cotización, los pagos bancarios pueden formar parte de la gestión." },
            { title: "Justificante de titularidad", text: "Guarda un certificado de IBAN o un justificante de titularidad de la cuenta, porque el arrendador, el empleador o alguna oficina pueden pedirlo." }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Pregunta cómo descargar el justificante de titularidad de la cuenta desde la app o la oficina antes de necesitarlo con urgencia.</p></div>`
        }),
        GuideSection({
          id: "bancosOnlineFrenteATradicionales",
          title: "Bancos online frente a bancos tradicionales",
          children: `<table class="guide-table"><tbody>
            <tr><th>Opción</th><td><strong>Qué tener en cuenta</strong></td></tr>
            <tr><th>Bancos online</th><td>Los bancos online pueden ofrecer una apertura más sencilla, comisiones más bajas y una buena experiencia de app. Pueden ser útiles para gastar, hacer transferencias y organizarte al principio, según tus documentos y necesidades.</td></tr>
            <tr><th>Bancos tradicionales españoles</th><td>Los bancos tradicionales españoles ofrecen acceso a oficinas y pueden facilitar algunos trámites locales. También pueden resultar más familiares para arrendadores, empleadores o compañías de suministros.</td></tr>
            <tr><th>Comparación neutral</th><td>Ninguna opción es automáticamente la mejor. Compara documentos, comisiones, disponibilidad de IBAN español, atención al cliente, domiciliaciones y el uso que le vas a dar.</td></tr>
          </tbody></table>${InfoBox({ title: "Realidad práctica", text: "Algunos servicios españoles pueden funcionar mejor con un banco tradicional español, mientras que muchos pagos diarios pueden funcionar bien con bancos online. Compruébalo antes de depender de una sola cuenta para todo." })}`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Abrir la primera cuenta que te ofrecen sin comprobar las comisiones.",
            "Aceptar extras de pago sin entenderlos.",
            "No actualizar los datos después de convertirte en residente.",
            "Suponer que todos los proveedores aceptan cualquier IBAN sin problemas.",
            "No guardar el justificante de titularidad de la cuenta.",
            "Ignorar las preguntas sobre residencia fiscal al abrir la cuenta."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puedo abrir una cuenta bancaria antes de conseguir el NIE?", text: "Algunos bancos pueden ofrecer vías para no residentes o basadas en el pasaporte, pero esto varía según el banco. Pregunta qué documentos exigen antes de pedir cita o empezar una solicitud online." },
            { title: "¿Necesito una cuenta bancaria española para vivir en España?", text: "No siempre es obligatorio legalmente, pero puede facilitar la nómina, el alquiler, los suministros, los impuestos y las domiciliaciones locales. Algunos proveedores pueden funcionar mejor con un IBAN español." },
            { title: "¿Puedo usar un banco online?", text: "Sí, muchas personas usan bancos online para los pagos diarios. Comprueba si la cuenta funciona para tu alquiler, tu nómina, tus domiciliaciones y cualquier trámite español que necesites." },
            { title: "¿Debería elegir una cuenta de residente o de no residente?", text: "Depende de tu situación de residencia y tus documentos. Si abres primero una cuenta de no residente, pregunta cómo actualizarla después de recibir los documentos de residencia." },
            { title: "¿Pueden los bancos cobrar comisiones?", text: "Sí. Las comisiones y condiciones pueden variar según el banco y el tipo de cuenta. Comprueba el cuadro de comisiones actual antes de abrir la cuenta." },
            { title: "¿Tengo que cambiar mi cuenta después de conseguir la residencia?", text: "Puede que tengas que actualizar tus datos o el estatus de la cuenta después de convertirte en residente. Pregunta al banco qué necesita y guarda el justificante de la actualización." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver la guía de primeros pasos", href: routes.esSettling },
            { label: "Ver la guía del certificado digital (en inglés)", href: routes.digital },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda el contrato del banco, el certificado de IBAN y los documentos de apertura de la cuenta junto con el resto de tu papeleo de España.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esEuRoadmap,
    html: GuideLayout({
      lang: "es",
      path: routes.esEuRoadmap,
      canonical: `https://iberigo.eu${routes.esEuRoadmap}`,
      altHref: euRoadmapPair.es.altHref,
      hreflangAlternates: euRoadmapPair.es.hreflangAlternates,
      title: "Mudarse a España como ciudadano de la UE — IberiGo",
      description: "Una hoja de ruta práctica para ciudadanos de la UE, del EEE y de Suiza que se mudan a España: planificación, llegada, padrón, sanidad, registro de la UE, banco e impuestos.",
      metadata: guideMetadataFor(routes.esEuRoadmap),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Ciudadanos de la UE" }],
      hero: {
        kicker: "Empieza aquí",
        title: "Mudarse a España como ciudadano de la UE",
        intro: "Una hoja de ruta práctica para ciudadanos de la UE, del EEE y de Suiza que se mudan a España. Sigue este orden general y usa las guías detalladas cuando un paso necesite documentos o comprobaciones locales.",
        asideTitle: "Orden, no plazos fijos",
        asideText: "La disponibilidad de citas puede variar, y algunos pasos pueden tardar más en zonas con mucha demanda."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Los ciudadanos de la UE, del EEE y de Suiza pueden mudarse a España sin visado. Si te quedas más de tres meses, normalmente necesitas registrarte como residente de la UE. El recorrido habitual suele incluir alojamiento, padrón, sanidad, registro de la UE y la instalación diaria. El orden y los requisitos exactos pueden variar según tu situación y tu localidad.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía es información práctica, no asesoramiento legal, fiscal, de inmigración, financiero ni inmobiliario. Los requisitos pueden variar según el municipio, la oficina y tu situación personal. Comprueba siempre la fuente oficial vigente o pregunta en la oficina correspondiente antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿Necesitas visado?</th><td>No.</td></tr>
            <tr><th>¿Te quedas más de 3 meses?</th><td>Normalmente hace falta el registro de la UE.</td></tr>
            <tr><th>¿Puedes trabajar?</th><td>Sí.</td></tr>
            <tr><th>¿Tarjeta TIE?</th><td>Normalmente no. Los ciudadanos de la UE suelen recibir un certificado de registro.</td></tr>
            <tr><th>Depende sobre todo de</th><td>Tu situación: trabajo, autoempleo, estudios, jubilación o recursos suficientes.</td></tr>
            <tr><th>Plazos</th><td>La disponibilidad de citas y los requisitos pueden variar según la oficina y la localidad.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Ciudadanos de la UE", text: "Útil si eres ciudadano de la UE y planeas una estancia larga en España." },
            { title: "Ciudadanos del EEE", text: "Los ciudadanos del EEE suelen seguir el mismo recorrido general." },
            { title: "Ciudadanos suizos", text: "Los ciudadanos suizos normalmente se incluyen en la vía de registro de ciudadanos de la UE." },
            { title: "Trabajadores por cuenta ajena", text: "Si vas a trabajar, ten en cuenta el empleo, la Seguridad Social, la sanidad y el registro de residencia." },
            { title: "Trabajadores por cuenta propia", text: "Quienes se mudan como autónomos pueden necesitar justificantes fiscales, de actividad y de Seguridad Social." },
            { title: "Estudiantes", text: "Los estudiantes pueden necesitar justificantes de estudios, sanidad y recursos." },
            { title: "Jubilados", text: "Los jubilados pueden necesitar justificantes de pensión, sanidad y recursos." },
            { title: "Personas que viven de ahorros o inversiones", text: "Quienes se mantienen con recursos propios pueden necesitar justificantes de recursos y sanidad." },
            { title: "Personas que se mudan con familia", text: "Los documentos de familia pueden importar, sobre todo si el estado civil o los dependientes son relevantes." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Los familiares no comunitarios siguen un proceso distinto. Esta hoja de ruta es para el recorrido de ciudadanos de la UE, del EEE o de Suiza.</p></div>`
        }),
        GuideSection({
          id: "faseUnoPlanificacion",
          title: "Fase 1: planificación antes de mudarte",
          children: `${Cards([
            { title: "Confirma tu situación", text: "Trabajo, autoempleo, estudios, jubilación o recursos propios pueden pedir justificantes distintos." },
            { title: "Prepara tus documentos", text: "Empieza por identidad, ingresos, sanidad y estado civil, si procede." },
            { title: "Investiga el alojamiento", text: "Comprueba si una dirección puede sustentar el empadronamiento antes de confiar en ella." },
            { title: "Entiende tus necesidades de sanidad", text: "Algunas vías pueden pedir justificante de sanidad antes del registro de la UE." }
          ])}${SourceLinks([
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare }
          ])}`
        }),
        GuideSection({
          id: "faseDosLlegada",
          title: "Fase 2: después de llegar",
          children: `${Cards([
            { title: "Consigue alojamiento", text: "Tu dirección puede afectar al padrón, la sanidad, el banco y otros trámites locales." },
            { title: "Empadrónate", text: "El padrón es el registro municipal de dirección. Los requisitos pueden variar según el ayuntamiento." },
            { title: "Organiza la sanidad", text: "Puede que necesites organizar la sanidad antes del registro de la UE en algunas vías." },
            { title: "Regístrate como residente de la UE", text: "Si te quedas más de tres meses, normalmente necesitas el registro de la UE." }
          ])}${SourceLinks([
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No trates esto como plazos fijos. La disponibilidad de citas puede variar, y algunos pasos pueden tardar más en zonas con mucha demanda.</p></div>`
        }),
        GuideSection({
          id: "faseTresInstalacion",
          title: "Fase 3: instalación diaria",
          children: `${Cards([
            { title: "Abre una cuenta bancaria", text: "Una cuenta española puede ayudarte con el alquiler, los suministros, la nómina y los pagos locales." },
            { title: "Configura el certificado digital o Cl@ve", text: "El acceso digital ayuda con Hacienda, la Seguridad Social y muchos servicios públicos." },
            { title: "Revisa la Seguridad Social si trabajas", text: "Si trabajas en España, entiende el alta en la Seguridad Social y tu situación activa." },
            { title: "Entiende tus obligaciones fiscales", text: "Revisa pronto la residencia fiscal y tus obligaciones, sobre todo si tienes ingresos o bienes fuera de España." },
            { title: "Comprueba las normas del carné de conducir", text: "Las normas dependen de dónde se expidió tu carné y de si te haces residente." }
          ])}${SourceLinks([
            { label: "Ver la guía de cuenta bancaria", href: routes.esBanking },
            { label: "Ver la guía del certificado digital y Cl@ve (en inglés)", href: routes.digital },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía de conducción (en inglés)", href: routes.driving }
          ])}`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Pensar que los ciudadanos de la UE necesitan una TIE.",
            "Confundir el NIE con el registro de la UE.",
            "Dejar la sanidad para el final.",
            "Firmar un alquiler sin comprobar si permite el empadronamiento.",
            "Suponer que todas las provincias funcionan igual.",
            "Esperar que todos los pasos se resuelvan rápido.",
            "Ignorar la residencia fiscal.",
            "Esperar a que un plazo se vuelva urgente."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Pueden los ciudadanos de la UE mudarse a España sin visado?", text: "Sí, los ciudadanos de la UE, del EEE y de Suiza normalmente pueden entrar en España sin visado. Las estancias más largas siguen implicando trámites locales y el registro de residencia de la UE." },
            { title: "¿Necesitan los ciudadanos de la UE una TIE?", text: "Normalmente no. Los ciudadanos de la UE suelen recibir un certificado de registro verde. Las tarjetas TIE se usan generalmente para ciudadanos no comunitarios." },
            { title: "¿Es el NIE lo mismo que el registro de la UE?", text: "No. El NIE es un número de identificación. El registro de la UE es el trámite de residencia para ciudadanos de la UE que se quedan más de tres meses." },
            { title: "¿Necesito el padrón antes del registro de la UE?", text: "Puede pedirse localmente y puede ser útil para otros trámites. Comprueba los requisitos de tu cita y tu municipio." },
            { title: "¿Necesito sanidad antes de registrarme?", text: "Depende de tu situación. Estudiantes, jubilados y personas con recursos propios pueden necesitar justificante de sanidad antes del registro de la UE." },
            { title: "¿Puedo trabajar antes del registro de la UE?", text: "Los ciudadanos de la UE generalmente pueden trabajar en España, pero el empleo, la Seguridad Social y el registro de residencia siguen teniendo que gestionarse correctamente." },
            { title: "¿Y si no hay citas disponibles?", text: "La disponibilidad de citas puede variar según la provincia. Sigue preparando documentos, revisa los canales oficiales y evita reservar el trámite equivocado por frustración." },
            { title: "¿Qué debo hacer primero al llegar?", text: "Consigue alojamiento y comprueba si la dirección permite el empadronamiento. A partir de ahí, organiza el padrón, la sanidad y el registro de la UE según tu situación." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: SourceLinks([
            { label: "Ver la guía de primeros pasos", href: routes.esSettling },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration }
          ])
        })
      ]
    })
  },
  {
    route: routes.esNonEuRoadmap,
    html: GuideLayout({
      lang: "es",
      path: routes.esNonEuRoadmap,
      canonical: `https://iberigo.eu${routes.esNonEuRoadmap}`,
      altHref: nonEuRoadmapPair.es.altHref,
      hreflangAlternates: nonEuRoadmapPair.es.hreflangAlternates,
      title: "Mudarse a España como ciudadano no UE — IberiGo",
      description: "Una hoja de ruta práctica para ciudadanos no comunitarios que planean mudarse a España: vías de residencia habituales, documentos, sanidad, TIE, citas y qué preparar.",
      metadata: guideMetadataFor(routes.esNonEuRoadmap),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Ciudadanos no UE" }],
      hero: {
        kicker: "Vías de residencia",
        title: "Mudarse a España como ciudadano no UE",
        intro: "Un punto de partida práctico para entender las principales vías de residencia, qué puedes necesitar preparar y qué pasos suelen ir antes y después de llegar.",
        asideTitle: "No hay un único trámite para todos",
        asideText: "Las normas de inmigración no comunitaria dependen mucho de la nacionalidad, la vía, los ingresos, la situación laboral y dónde se solicita. Comprueba los requisitos oficiales de tu trámite concreto."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Los ciudadanos no comunitarios normalmente necesitan un visado, una autorización de residencia u otra vía legal reconocida para vivir en España. El trámite correcto depende del motivo de tu mudanza. Las vías habituales incluyen trabajo, estudios, familia, jubilación o recursos suficientes, nómada digital, autoempleo, y la reagrupación con un familiar ciudadano de la UE. Muchas personas acaban necesitando una TIE tras la aprobación. Esta hoja de ruta te ayuda a identificar la siguiente guía adecuada; no sustituye el asesoramiento legal.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal. Las normas de inmigración no comunitaria dependen mucho de tu nacionalidad, tu vía de residencia, tu situación familiar, tus ingresos, tu situación laboral y dónde solicitas el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿Visado o autorización?</th><td>Normalmente hace falta, según tu vía y tu nacionalidad.</td></tr>
            <tr><th>¿Igual para todos?</th><td>No. Depende de tu vía, tu nacionalidad y dónde solicitas el trámite.</td></tr>
            <tr><th>Vías habituales</th><td>Trabajo, estudios, familia, jubilación o recursos suficientes, nómada digital, autoempleo, familiar de ciudadano de la UE.</td></tr>
            <tr><th>Tras la aprobación</th><td>Muchos residentes no comunitarios necesitan una TIE, no un NIE ni un certificado de registro de la UE.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil, sobre todo en situaciones complejas o poco habituales.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Ciudadanos no UE que planean vivir en España", text: "Útil si estás explorando qué vía puede encajar con tu situación." },
            { title: "Personas que se mudan por trabajo", text: "Útil si una oferta de empleo o un traslado puede sustentar una vía laboral." },
            { title: "Estudiantes", text: "Útil si estás considerando estudiar en España." },
            { title: "Jubilados o personas con recursos suficientes", text: "Útil si planeas vivir en España sin trabajar localmente." },
            { title: "Familiares", text: "Útil si te reúnes con familia que ya vive en España." },
            { title: "Nómadas digitales", text: "Útil si trabajas en remoto para empresas o clientes fuera de España." },
            { title: "Autónomos", text: "Útil si planeas actividad empresarial o por cuenta propia en España." },
            { title: "Personas que ya están en España", text: "Útil si intentas entender qué puede aplicarse a tu situación ahora mismo." }
          ])}<div class="guide-box guide-box--info"><strong>Ciudadanos de la UE, del EEE y de Suiza</strong><p>Si eres ciudadano de la UE, del EEE o de Suiza, usa en su lugar la hoja de ruta para ciudadanos de la UE: el proceso descrito allí es distinto de este.</p></div>`
        }),
        GuideSection({
          id: "elegirTuVia",
          title: "Elige tu vía",
          children: StartHereCards([
            { title: "Trabajar en España", text: "Las vías laborales suelen depender de una oferta de empleo, el patrocinio de la empresa o una autorización de trabajo reconocida.", href: routes.esWorkInSpain, label: "Ver hoja de ruta" },
            { title: "Estudiar en España", text: "Las vías de estudios suelen depender de la matrícula, la duración del programa y los medios económicos.", href: routes.esStudents, label: "Ver hoja de ruta" },
            { title: "Reunirte con familia en España", text: "La reagrupación familiar suele depender del parentesco y de la situación del familiar que te reagrupa.", href: routes.familyReunification, label: "Ver hoja de ruta (en inglés)" },
            { title: "Familiar de un ciudadano de la UE", text: "Esta vía puede diferir de las vías familiares no comunitarias habituales, según el parentesco y la situación.", href: routes.esEuFamilyMemberRoadmap, label: "Ver hoja de ruta" },
            { title: "Jubilarte o vivir de recursos suficientes", text: "Esta vía suele depender de justificar ingresos, ahorros y cobertura sanitaria en vez de un empleo.", href: routes.esRetireInSpain, label: "Ver hoja de ruta" },
            { title: "Nómada digital / trabajo remoto", text: "Esta vía suele depender del empleo remoto o de clientes con sede fuera de España.", href: routes.digitalNomad, label: "Ver hoja de ruta (en inglés)" },
            { title: "Autónomo / actividad empresarial", text: "Esta vía suele depender del plan de negocio, la actividad y los justificantes económicos.", href: routes.esSelfEmployed, label: "Ver hoja de ruta" },
            { title: "Ya estoy en España y no sé qué aplica", text: "Usa Empieza aquí y esta hoja de ruta juntas para acotar qué puede aplicarse.", href: routes.esStartHere, label: "Continuar" }
          ])
        }),
        GuideSection({
          id: "antesDeMudarte",
          title: "Antes de mudarte",
          children: `${Cards([
            { title: "Identifica la vía correcta", text: "El trámite adecuado depende del motivo de tu mudanza y de tu nacionalidad." },
            { title: "Comprueba los requisitos oficiales", text: "Los requisitos y los documentos aceptados pueden variar según la vía y dónde solicites el trámite." },
            { title: "Prepara tus documentos de identidad", text: "Un pasaporte en vigor suele ser central en los trámites no comunitarios." },
            { title: "Prepara documentos de estado civil, si procede", text: "Los documentos de matrimonio, nacimiento o familia pueden importar en algunas vías." },
            { title: "Prepara justificantes de ingresos, trabajo o estudios", text: "Los justificantes dependen de si tu vía se basa en trabajo, estudios, recursos o familia." },
            { title: "Comprueba los requisitos de sanidad", text: "Algunas vías pueden pedir justificante de cobertura sanitaria antes de la aprobación." },
            { title: "Comprueba los requisitos de antecedentes penales o legalización, si aplica", text: "Algunas vías pueden pedir certificado de antecedentes penales o documentos civiles legalizados." },
            { title: "Comprueba las necesidades de traducción y apostilla", text: "Algunos documentos extranjeros pueden necesitar traducción oficial, legalización o apostilla." }
          ])}<p>Usa la <a href="${routes.esChecklist}">lista de documentos</a> como punto de partida general y confirma después la lista exacta para tu trámite concreto.</p><div class="guide-box guide-box--warning"><strong>Importante</strong><p>Evita basarte solo en consejos informales, foros o redes sociales para los requisitos de documentos. Comprueba las fuentes oficiales de tu vía.</p></div>`
        }),
        GuideSection({
          id: "visadoAutorizacionResidencia",
          title: "Visado, autorización y residencia",
          children: Cards([
            { title: "Visado primero, en algunas vías", text: "Algunas vías empiezan con una solicitud de visado antes de viajar a España." },
            { title: "Autorización de residencia", text: "Algunas vías pueden implicar un trámite de autorización de residencia aparte." },
            { title: "Distintas autoridades según la vía", text: "Las solicitudes pueden tramitarse en consulados, oficinas de extranjería o plataformas online, según la vía." },
            { title: "No se cubre aquí", text: "Esta hoja de ruta no da instrucciones legales específicas por vía. Comprueba los requisitos oficiales de tu trámite exacto." }
          ])
        }),
        GuideSection({
          id: "despuesDeLaAprobacionLlegada",
          title: "Después de la aprobación o la llegada",
          children: `${Cards([
            { title: "Viaja a España, si procede", text: "Algunas vías requieren aprobación antes de viajar; otras no." },
            { title: "Consigue alojamiento", text: "Tu dirección puede afectar al padrón, la sanidad y otros trámites posteriores." },
            { title: "Empadrónate, si es posible", text: "Los requisitos del padrón pueden variar según el municipio." },
            { title: "Organiza la sanidad", text: "Las vías de sanidad pueden depender de tu vía de residencia y tu situación personal." },
            { title: "Solicita o recoge la TIE, si corresponde", text: "Muchos residentes no comunitarios necesitan completar un trámite de TIE tras la aprobación." },
            { title: "Abre una cuenta bancaria", text: "Una cuenta española puede ayudarte con los pagos diarios." },
            { title: "Configura el certificado digital o Cl@ve, si está disponible", text: "El acceso digital puede ayudar con Hacienda, la Seguridad Social y otros trámites online." },
            { title: "Entiende tus obligaciones fiscales", text: "Pueden surgir dudas fiscales según tu residencia, ingresos y bienes." }
          ])}<div class="guide-box guide-box--info"><strong>El orden puede variar</strong><p>No todo el mundo sigue el mismo orden. Algunos pasos pueden ir en paralelo, y la disponibilidad de citas puede variar según la provincia y la situación.</p></div>`
        }),
        GuideSection({
          id: "conceptosBasicosTie",
          title: "Conceptos básicos de la TIE",
          children: `${Cards([
            { title: "Qué es la TIE", text: "La TIE (Tarjeta de Identidad de Extranjero) es la tarjeta física de identidad que usan muchos residentes no comunitarios." },
            { title: "No es lo mismo que el NIE", text: "El NIE es un número de identificación. La TIE es una tarjeta física. No son lo mismo." },
            { title: "No es lo mismo que el registro de la UE", text: "El registro de la UE es la vía del certificado para ciudadanos de la UE, del EEE y de Suiza. Los residentes no comunitarios siguen normalmente la vía de la TIE." },
            { title: "Huellas y recogida", text: "Muchos residentes no comunitarios pasan por una toma de huellas y una recogida de tarjeta tras la aprobación." },
            { title: "Los detalles dependen de tu vía", text: "Los pasos, plazos y documentos exactos dependen de tu vía de residencia concreta." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No des por hecho que TIE, NIE y registro de la UE son términos intercambiables. Confirma qué documento aplica a tu situación antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Elegir la vía equivocada para tu situación.",
            "Confundir el NIE con la TIE.",
            "Suponer que las normas de estancia turística permiten la residencia.",
            "Ignorar la legalización o traducción de documentos.",
            "Tardar demasiado en comprobar la disponibilidad de citas.",
            "Suponer que las normas son iguales para toda nacionalidad.",
            "Confiar solo en redes sociales o foros.",
            "No comprobar los requisitos de sanidad.",
            "Ignorar la residencia fiscal."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puedo mudarme a España sin ser ciudadano de la UE?", text: "Sí, pero normalmente necesitas un visado, una autorización de residencia u otra vía legal reconocida. El trámite correcto depende de tu situación y tu nacionalidad." },
            { title: "¿Necesitan visado los ciudadanos no comunitarios?", text: "A menudo sí, según la vía y la duración y el propósito de la estancia. Algunas vías pueden implicar un visado antes de viajar; otras pueden diferir. Comprueba los requisitos oficiales de tu caso." },
            { title: "¿Es el NIE lo mismo que la TIE?", text: "No. El NIE es un número de identificación. La TIE es una tarjeta física de identidad de extranjero. Muchos residentes no comunitarios acaban teniendo ambos, pero no son el mismo documento." },
            { title: "¿Necesito el padrón antes de la TIE?", text: "Depende de la oficina y de la vía. El padrón puede pedirse como parte de algunos trámites. Comprueba los requisitos de tu cita concreta." },
            { title: "¿Puedo trabajar en España como ciudadano no UE?", text: "Depende de tu vía de residencia y de cualquier autorización de trabajo asociada. Algunas vías permiten trabajar; otras lo restringen o requieren un trámite aparte." },
            { title: "¿Puedo estudiar en España?", text: "Existen vías de estudios para ciudadanos no comunitarios, pero los requisitos dependen del programa, la duración y tu nacionalidad." },
            { title: "¿Puedo reunirme con mi cónyuge o pareja de la UE?", text: "Familiar de un ciudadano de la UE es una vía distinta que puede diferir de las vías familiares no comunitarias habituales. Comprueba los requisitos concretos de tu parentesco y situación." },
            { title: "¿Y si ya estoy en España?", text: "Usa Empieza aquí y esta hoja de ruta juntas para entender qué vía puede aplicarse, y comprueba los requisitos oficiales antes de suponer que un trámite concreto encaja con tu situación." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de cuenta bancaria", href: routes.esBanking },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, estado civil, ingresos y traducciones para poder responder rápido en cuanto conozcas tu vía exacta.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esEuFamilyMemberRoadmap,
    html: GuideLayout({
      lang: "es",
      path: routes.esEuFamilyMemberRoadmap,
      canonical: `https://iberigo.eu${routes.esEuFamilyMemberRoadmap}`,
      altHref: euFamilyMemberRoadmapPair.es.altHref,
      hreflangAlternates: euFamilyMemberRoadmapPair.es.hreflangAlternates,
      title: "Mudarse a España como familiar de un ciudadano de la UE — IberiGo",
      description: "Una hoja de ruta práctica para familiares de ciudadanos de la UE que se mudan a España: requisitos, documentos, padrón, sanidad, la tarjeta de residencia y errores comunes.",
      metadata: guideMetadataFor(routes.esEuFamilyMemberRoadmap),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Familiar de un ciudadano de la UE" }],
      hero: {
        kicker: "Vía de residencia familiar",
        title: "Mudarse a España como familiar de un ciudadano de la UE",
        intro: "Un punto de partida práctico para entender la vía familiar, qué puedes necesitar preparar y qué pasos suelen ir antes y después de solicitar el trámite en España.",
        asideTitle: "No hay un único trámite para cada familia",
        asideText: "Las normas de residencia como familiar dependen de la nacionalidad, el tipo de parentesco, los documentos, la dependencia económica, la situación del ciudadano de la UE y dónde se solicita el trámite."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Algunos familiares no comunitarios de ciudadanos de la UE pueden tener una vía de residencia específica en España, distinta de las vías de visado no comunitario habituales. El parentesco con el ciudadano de la UE y los documentos que lo respaldan son centrales en el trámite. Muchas personas acaban recibiendo una tarjeta de residencia como familiar de ciudadano de la UE. Esta hoja de ruta te ayuda a entender el recorrido general; no sustituye el asesoramiento legal.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal. Las normas de residencia como familiar dependen de la nacionalidad, el tipo de parentesco, los documentos, la dependencia económica, la situación del ciudadano de la UE y dónde se solicita el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿A quién puede aplicar?</th><td>Cónyuges no comunitarios, parejas reconocidas, hijos y familiares dependientes de un ciudadano de la UE.</td></tr>
            <tr><th>¿Es igual que las vías habituales?</th><td>No. Es una vía distinta de los visados no comunitarios estándar y del registro propio del ciudadano de la UE.</td></tr>
            <tr><th>Factor central</th><td>El parentesco con el ciudadano de la UE y los justificantes que lo respaldan.</td></tr>
            <tr><th>Resultado habitual</th><td>Muchas personas acaban recibiendo una tarjeta de residencia como familiar de ciudadano de la UE.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil, sobre todo en parentescos poco habituales o situaciones familiares complejas.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Cónyuges no comunitarios de ciudadanos de la UE", text: "Útil si estás casado o casada con un ciudadano de la UE, del EEE o de Suiza y consideras España." },
            { title: "Parejas registradas, cuando se reconozcan", text: "Útil si tu pareja de hecho puede reconocerse dentro de la vía familiar." },
            { title: "Hijos, cuando proceda", text: "Útil si los hijos pueden incluirse en una solicitud familiar." },
            { title: "Familiares dependientes, cuando proceda", text: "Útil si la situación de un familiar dependiente puede sustentar un caso familiar." },
            { title: "Ciudadanos de la UE que traen o reagrupan familia en España", text: "Útil si eres el ciudadano de la UE que respalda la mudanza de un familiar." },
            { title: "Personas que ya están en España", text: "Útil si intentas entender si la vía familiar aplica a tu situación ahora mismo." }
          ])}<div class="guide-box guide-box--info"><strong>Si tú eres el ciudadano de la UE</strong><p>Los ciudadanos de la UE deben usar la hoja de ruta de ciudadanos de la UE para su propio registro. Los ciudadanos no comunitarios que no solicitan por una relación familiar con un ciudadano de la UE deben usar en su lugar la hoja de ruta de ciudadanos no UE.</p></div>`
        }),
        GuideSection({
          id: "parentescoYRequisitos",
          title: "Parentesco y requisitos básicos",
          children: `${Cards([
            { title: "Depende del parentesco", text: "La elegibilidad depende del parentesco con el ciudadano de la UE y de los justificantes disponibles." },
            { title: "Cónyuges y parejas", text: "Cónyuges y parejas reconocidas pueden tener requisitos de documentos distintos entre sí." },
            { title: "Hijos y dependientes", text: "Hijos y familiares dependientes pueden necesitar justificantes adicionales del parentesco y la dependencia." },
            { title: "La situación del ciudadano de la UE importa", text: "La propia situación de residencia o registro del ciudadano de la UE en España puede afectar al caso." },
            { title: "Varía según el caso y la oficina", text: "Los requisitos pueden variar según el caso concreto y la oficina que lo tramite." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esto no es una lista definitiva de elegibilidad. Comprueba los requisitos oficiales de tu parentesco y situación antes de dar por hecho que cumples los requisitos.</p></div>`
        }),
        GuideSection({
          id: "antesDeEmpezar",
          title: "Antes de empezar",
          children: `${Cards([
            { title: "Identidad", text: "Un pasaporte en vigor suele ser central en la solicitud." },
            { title: "Justificante del parentesco", text: "Puede pedirse certificado de matrimonio, de pareja de hecho o de nacimiento, según el parentesco." },
            { title: "Legalización o apostilla, si procede", text: "Algunos documentos civiles extranjeros pueden necesitar legalización o apostilla." },
            { title: "Traducción jurada, si procede", text: "Algunos documentos pueden necesitar traducción jurada oficial." },
            { title: "Los documentos del ciudadano de la UE", text: "Puede pedirse el documento de identidad del ciudadano de la UE y justificante de su situación en España." },
            { title: "Justificante de dirección o padrón, si se pide", text: "El justificante de dirección puede formar parte del expediente, según la oficina." },
            { title: "Justificante de sanidad o económico, según el caso", text: "Algunos casos pueden requerir cobertura sanitaria o justificante económico." }
          ])}<p>Los documentos exactos dependen del parentesco, el país de expedición y el trámite. Usa la <a href="${routes.esChecklist}">lista de documentos</a> como punto de partida general y confirma después la lista exacta para tu caso concreto.</p>`
        }),
        GuideSection({
          id: "mudarseJuntosOReunirseDespues",
          title: "Mudarse juntos o reuniros más tarde",
          children: Cards([
            { title: "Mudarse juntos", text: "Algunas familias se mudan a España juntas y preparan los documentos en paralelo." },
            { title: "Reuniros más tarde", text: "Otras se reúnen con un ciudadano de la UE que ya vive en España, lo que puede cambiar el orden práctico de los pasos." },
            { title: "El orden puede diferir", text: "El orden práctico de los pasos puede diferir según cuál sea tu situación." },
            { title: "El alojamiento y el padrón pueden afectar al calendario", text: "La preparación del alojamiento y el padrón puede afectar a cómo se desarrolla el resto del trámite." },
            { title: "La disponibilidad de citas varía", text: "La disponibilidad de citas varía según la provincia y la oficina, y puede cambiar con el tiempo." }
          ])
        }),
        GuideSection({
          id: "despuesDeLaLlegada",
          title: "Después de la llegada a España",
          children: `${Cards([
            { title: "Consigue alojamiento", text: "Tu dirección puede afectar al padrón, la sanidad y los pasos posteriores." },
            { title: "Empadrónate, si es posible", text: "Los requisitos del padrón pueden variar según el municipio." },
            { title: "Organiza la sanidad si hace falta", text: "Las vías de sanidad pueden depender de la situación del familiar y del ciudadano de la UE." },
            { title: "Prepara los documentos de parentesco", text: "Ten listos los justificantes de parentesco, traducciones y legalizaciones antes de solicitar." },
            { title: "Presenta la solicitud de residencia familiar correspondiente", text: "La vía de solicitud depende del tipo de caso y la oficina." },
            { title: "Acude a la cita de huellas o de tarjeta cuando se requiera", text: "Muchos casos implican una cita de huellas o de recogida de tarjeta." },
            { title: "Recoge la tarjeta de residencia si se aprueba", text: "Los trámites de recogida dependen de la oficina y el caso." }
          ])}<div class="guide-box guide-box--info"><strong>Depende del tipo de caso</strong><p>Este trámite depende mucho del tipo de caso. No supongas que el mismo orden o los mismos plazos se aplican a todas las familias.</p></div>`
        }),
        GuideSection({
          id: "conceptosBasicosTarjeta",
          title: "Conceptos básicos de la tarjeta de residencia",
          children: `${Cards([
            { title: "Tarjeta de residencia como familiar", text: "Muchos familiares no comunitarios reciben una tarjeta de residencia vinculada a su condición de familiar de ciudadano de la UE." },
            { title: "Distinta del certificado del ciudadano de la UE", text: "Esto es distinto del certificado de registro de la UE, verde, del propio ciudadano." },
            { title: "Distinta de un NIE", text: "También es distinta de tener simplemente un NIE, que es un número de identificación, no una tarjeta de residencia." },
            { title: "Citas y huellas", text: "Los trámites de tarjeta pueden implicar citas, huellas y un paso de recogida aparte." },
            { title: "Depende de la aprobación y el trámite", text: "El proceso exacto depende de la aprobación y del procedimiento local de la oficina." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No confundas la tarjeta de residencia como familiar, el certificado de registro del ciudadano de la UE y un NIE. Confirma qué documento aplica a tu caso antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que el matrimonio por sí solo lo resuelve todo.",
            "Confundir el registro de la UE con la tarjeta de residencia como familiar.",
            "Confundir el NIE con el derecho de residencia.",
            "No preparar los documentos legalizados o traducidos con tiempo.",
            "Suponer que todos los municipios o provincias funcionan igual.",
            "Firmar un alquiler sin comprobar si permite el empadronamiento.",
            "Confiar solo en consejos informales.",
            "Perder notificaciones oficiales.",
            "Ignorar los requisitos de sanidad o de documentos económicos."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puede mi cónyuge no comunitario vivir conmigo en España?", text: "A menudo sí, a través de la vía familiar, pero depende de tu situación, tus documentos y el parentesco que reconozca la oficina que tramite tu caso." },
            { title: "¿Es lo mismo que un visado no comunitario normal?", text: "No. La vía familiar suele ser distinta de las vías de visado no comunitario habituales, aunque los detalles siguen dependiendo de tu caso." },
            { title: "¿El matrimonio da la residencia automáticamente?", text: "No. El matrimonio puede respaldar la elegibilidad, pero la residencia sigue dependiendo de la solicitud, los justificantes y la aprobación." },
            { title: "¿Es el NIE lo mismo que la residencia?", text: "No. El NIE es un número de identificación. La residencia como familiar de un ciudadano de la UE es un estatus aparte, que suele acreditarse con una tarjeta de residencia." },
            { title: "¿Tiene que registrarse antes el ciudadano de la UE?", text: "Puede importar. La propia situación del ciudadano de la UE en España puede formar parte del caso del familiar; comprueba los requisitos que aplican a tu situación." },
            { title: "¿Necesitamos el padrón?", text: "Puede pedirse como parte del trámite, según la oficina. Comprueba los requisitos de tu solicitud concreta." },
            { title: "¿Qué documentos justifican el parentesco?", text: "Normalmente un certificado de matrimonio, de pareja de hecho o de nacimiento, según el parentesco, a veces con legalización o traducción. Las necesidades exactas varían según el caso." },
            { title: "¿Y si ya estamos en España?", text: "Usa Empieza aquí y esta hoja de ruta juntas para entender qué vía puede aplicarse, y comprueba los requisitos oficiales antes de suponer que un trámite concreto encaja con tu situación." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, parentesco, traducciones y legalizaciones para poder responder rápido en cuanto conozcas los requisitos exactos de tu caso.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esWorkInSpain,
    html: GuideLayout({
      lang: "es",
      path: routes.esWorkInSpain,
      canonical: `https://iberigo.eu${routes.esWorkInSpain}`,
      altHref: workInSpainPair.es.altHref,
      hreflangAlternates: workInSpainPair.es.hreflangAlternates,
      title: "Mudarse a España para trabajar — IberiGo",
      description: "Una hoja de ruta práctica para quienes planean trabajar en España: vías por cuenta ajena, documentos, Seguridad Social, sanidad, impuestos, la TIE y errores comunes.",
      metadata: guideMetadataFor(routes.esWorkInSpain),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Trabajar en España" }],
      hero: {
        kicker: "Vía laboral",
        title: "Mudarse a España para trabajar",
        intro: "Un punto de partida práctico para entender las vías relacionadas con el trabajo, qué puedes necesitar preparar y qué pasos suelen ir antes y después de empezar a trabajar en España.",
        asideTitle: "No hay un único trámite para cada trabajador",
        asideText: "Las normas de trabajo y residencia dependen de tu nacionalidad, la oferta de empleo, la empresa, el tipo de contrato, tu cualificación, tu vía de residencia y dónde se solicita el trámite."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Las personas que se mudan a España para trabajar pueden seguir vías distintas según su nacionalidad y su situación laboral. Ciudadanos de la UE y no comunitarios siguen procesos distintos. Los ciudadanos no comunitarios normalmente necesitan la autorización de trabajo y residencia correcta antes de trabajar. Empleados, trabajadores altamente cualificados, temporeros y trabajadores remotos pueden seguir vías distintas. Esta hoja de ruta te ayuda a entender el recorrido general; no sustituye los requisitos oficiales.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal. Las normas de trabajo y residencia dependen de tu nacionalidad, la oferta de empleo, la empresa, el tipo de contrato, tu cualificación, tu vía de residencia y dónde se solicita el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿Visado o autorización?</th><td>Puede hacer falta, según la nacionalidad, el tipo de empleo y la vía.</td></tr>
            <tr><th>¿Igual para todos?</th><td>No. Ciudadanos de la UE y no comunitarios siguen procesos distintos, y los requisitos varían según el caso.</td></tr>
            <tr><th>¿Basta con la oferta de empleo?</th><td>Normalmente no por sí sola: la autorización correcta tiene que estar en regla antes de trabajar.</td></tr>
            <tr><th>Trabajadores no comunitarios</th><td>Pueden acabar necesitando una TIE tras la aprobación o la llegada.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil, sobre todo en contratos o cualificaciones poco habituales.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Ciudadanos de la UE que se mudan a España para trabajar", text: "Útil si eres ciudadano de la UE, del EEE o de Suiza y planeas trabajar en España." },
            { title: "Ciudadanos no UE con oferta de empleo", text: "Útil si tienes una oferta de empleo y consideras la vía laboral no comunitaria." },
            { title: "Personas que consideran trabajar en España", text: "Útil si estás comparando opciones antes de decidir mudarte." },
            { title: "Personas que ya están en España", text: "Útil si intentas entender si una vía laboral aplica a tu situación ahora mismo." },
            { title: "Trabajadores cuya empresa ayuda con el papeleo", text: "Útil si tu empresa apoya parte del trámite." },
            { title: "Personas que comparan las vías de empleado, trabajo remoto o autónomo", text: "Útil si no estás seguro de qué vía encaja con tu situación." }
          ])}<div class="guide-box guide-box--info"><strong>Hojas de ruta relacionadas</strong><p>Quienes trabajen por cuenta propia deben usar la hoja de ruta de autónomos. Los nómadas digitales deben usar la futura hoja de ruta de nómada digital cuando esté disponible.</p></div>`
        }),
        GuideSection({
          id: "ciudadanosUeTrabajando",
          title: "Ciudadanos de la UE trabajando en España",
          children: `${Cards([
            { title: "Normalmente no hace falta visado", text: "Los ciudadanos de la UE, del EEE y de Suiza normalmente no necesitan visado para trabajar en España." },
            { title: "Registro de la UE si te quedas más tiempo", text: "Si te quedas más de tres meses, puede aplicar el registro de la UE." },
            { title: "Conectado con la Seguridad Social, la sanidad y Hacienda", text: "El empleo puede afectar a la Seguridad Social, la sanidad y las obligaciones fiscales." },
            { title: "Guarda tus documentos", text: "Los trabajadores deben guardar contratos, nóminas y justificantes de la Seguridad Social." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes }
          ])}`
        }),
        GuideSection({
          id: "ciudadanosNoUeTrabajando",
          title: "Ciudadanos no UE trabajando en España",
          children: `${Cards([
            { title: "Hace falta la vía correcta primero", text: "Los ciudadanos no comunitarios normalmente necesitan la autorización de trabajo y residencia correcta antes de trabajar." },
            { title: "Distintos canales según la vía", text: "El trámite puede implicar a la empresa, un consulado, una oficina de extranjería u otro canal oficial, según la vía." },
            { title: "Una oferta de empleo no basta por sí sola", text: "Tener una oferta de empleo no significa automáticamente que la persona pueda trabajar legalmente." },
            { title: "Puede seguir la TIE", text: "Puede requerirse la TIE tras la aprobación o la llegada." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist }
          ])}`
        }),
        GuideSection({
          id: "antesDeAceptarOEmpezar",
          title: "Antes de aceptar o empezar a trabajar",
          children: `${Cards([
            { title: "Identidad", text: "Un pasaporte o documento nacional en vigor suele ser central en el trámite." },
            { title: "Oferta o contrato de trabajo", text: "Normalmente hace falta una oferta o contrato de trabajo para sustentar la vía." },
            { title: "Documentos de cualificación, si procede", text: "Algunos puestos pueden requerir documentos de cualificación reconocidos." },
            { title: "Documentos de homologación profesional, si procede", text: "Algunas profesiones pueden requerir el reconocimiento de títulos extranjeros." },
            { title: "Certificado de antecedentes penales, si se requiere", text: "Algunas vías pueden pedir certificado de antecedentes penales." },
            { title: "Documentos de sanidad, si se requieren", text: "Algunas vías pueden pedir justificante de cobertura sanitaria." },
            { title: "Traducciones, legalización o apostilla, si se requieren", text: "Algunos documentos extranjeros pueden necesitar traducción oficial, legalización o apostilla." },
            { title: "Documentos de NIE/TIE/residencia, según la vía", text: "Los documentos de identificación y residencia dependen de tu vía y la fase del trámite." },
            { title: "Alta en la Seguridad Social, si procede", text: "El alta en la Seguridad Social puede formar parte de empezar a trabajar." }
          ])}<p>Los requisitos exactos dependen de la nacionalidad, el tipo de empleo, la empresa y la vía de residencia.</p>`
        }),
        GuideSection({
          id: "elPapelDeLaEmpresa",
          title: "El papel de la empresa",
          children: Cards([
            { title: "La empresa puede tener que iniciar o apoyar el trámite", text: "En algunas vías laborales, la empresa puede tener que iniciar o apoyar el trámite." },
            { title: "Alta en la Seguridad Social", text: "Los empleados suelen darse de alta en la Seguridad Social a través de la empresa una vez que la relación laboral es válida." },
            { title: "Pide confirmación", text: "Los trabajadores deben pedir confirmación del alta y guardar copias." },
            { title: "Comprueba igualmente los requisitos oficiales", text: "Que la empresa participe no elimina la necesidad de comprobar tú mismo los requisitos oficiales." }
          ])
        }),
        GuideSection({
          id: "seguridadSocialSanidadImpuestos",
          title: "Seguridad Social, sanidad e impuestos",
          children: `${Cards([
            { title: "A menudo conectado con la Seguridad Social", text: "Trabajar en España suele estar conectado con el alta en la Seguridad Social." },
            { title: "Puede afectar al acceso a la sanidad", text: "La Seguridad Social puede conectar con el acceso a la sanidad pública, según tu situación." },
            { title: "Pueden surgir obligaciones fiscales", text: "Trabajar en España puede generar obligaciones fiscales españolas." },
            { title: "La residencia fiscal es aparte", text: "La residencia fiscal es distinta de la residencia de inmigración." },
            { title: "Revisa los impuestos pronto", text: "Revisa tu situación fiscal pronto en vez de esperar a un plazo urgente." }
          ])}${SourceLinks([
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes }
          ])}`
        }),
        GuideSection({
          id: "conceptosBasicosTieTrabajadores",
          title: "Conceptos básicos de la TIE para trabajadores",
          children: `${Cards([
            { title: "Muchos trabajadores no comunitarios la necesitan", text: "Muchos trabajadores no comunitarios pueden necesitar una TIE tras la aprobación o la llegada." },
            { title: "No es lo mismo que el NIE", text: "La TIE no es lo mismo que el NIE." },
            { title: "No es lo mismo que el registro de la UE", text: "La TIE no es lo mismo que el registro de la UE." },
            { title: "Citas y recogida", text: "Los trámites de TIE pueden implicar citas, huellas y recogida." },
            { title: "Depende de tu caso", text: "Los detalles dependen de la aprobación, la vía y el procedimiento local." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No confundas TIE, NIE y registro de la UE. Confirma qué documento aplica a tu situación antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que una oferta de empleo da automáticamente derecho de residencia.",
            "Empezar a trabajar antes de que el permiso esté claro.",
            "Confundir el NIE con la TIE.",
            "Confundir el registro de la UE con las tarjetas de residencia no comunitarias.",
            "No comprobar las responsabilidades de la empresa.",
            "No guardar el contrato y los justificantes de la Seguridad Social.",
            "Ignorar la residencia fiscal.",
            "Suponer que las vías de autónomo y de empleado son iguales.",
            "Confiar solo en consejos informales."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puedo mudarme a España para trabajar?", text: "A menudo sí, pero la vía correcta depende de tu nacionalidad, tu oferta de empleo y tu situación. Comprueba los requisitos oficiales que aplican a tu caso." },
            { title: "¿Pueden los ciudadanos de la UE trabajar en España sin visado?", text: "Normalmente sí. Los ciudadanos de la UE, del EEE y de Suiza normalmente no necesitan visado para trabajar, aunque puede aplicar el registro de la UE si te quedas más de tres meses." },
            { title: "¿Pueden trabajar los ciudadanos no UE solo con una oferta de empleo?", text: "No por sí sola. Una oferta de empleo normalmente tiene que estar respaldada por la autorización de trabajo y residencia correcta antes de trabajar legalmente." },
            { title: "¿Es el NIE lo mismo que el permiso para trabajar?", text: "No. El NIE es un número de identificación. El permiso para trabajar depende de tu autorización de residencia y trabajo, que es algo aparte." },
            { title: "¿Necesitan los trabajadores una TIE?", text: "Muchos trabajadores no comunitarios pueden necesitar una TIE tras la aprobación o la llegada. Los requisitos dependen de tu vía." },
            { title: "¿Me da de alta mi empresa en la Seguridad Social?", text: "Las empresas suelen encargarse de esto una vez que la relación laboral es válida, pero debes pedir confirmación y guardar tus propios justificantes." },
            { title: "¿Necesito sanidad antes de trabajar?", text: "Depende de tu vía y tu situación. Algunos justificantes de sanidad pueden pedirse como parte de ciertos trámites." },
            { title: "¿Afectará trabajar en España a mis impuestos?", text: "Puede afectar. Trabajar en España puede generar obligaciones fiscales españolas, y la residencia fiscal es una cuestión aparte de la residencia de inmigración. Revisa tu situación fiscal pronto." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía de cuenta bancaria", href: routes.esBanking },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, contrato, Seguridad Social e impuestos para poder responder rápido en cuanto conozcas los requisitos exactos de tu vía.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esStudents,
    html: GuideLayout({
      lang: "es",
      path: routes.esStudents,
      canonical: `https://iberigo.eu${routes.esStudents}`,
      altHref: studentsPair.es.altHref,
      hreflangAlternates: studentsPair.es.hreflangAlternates,
      title: "Mudarse a España como estudiante — IberiGo",
      description: "Una hoja de ruta práctica para estudiantes que planean estudiar en España: vías de estudios, documentos, sanidad, alojamiento, la TIE y errores comunes.",
      metadata: guideMetadataFor(routes.esStudents),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Estudiantes" }],
      hero: {
        kicker: "Vía de estudios",
        title: "Mudarse a España como estudiante",
        intro: "Un punto de partida práctico para entender las vías de estudios, qué puedes necesitar preparar y qué pasos suelen ir antes y después de llegar a España.",
        asideTitle: "No hay un único trámite para cada estudiante",
        asideText: "Las normas de residencia como estudiante dependen de tu nacionalidad, el tipo de curso, la duración de los estudios, los documentos, tu situación económica, la cobertura sanitaria y dónde se solicita el trámite."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Los estudiantes que llegan de fuera de España pueden necesitar una vía de estudios, visado o autorización reconocida según su nacionalidad y la duración de la estancia. Los requisitos pueden depender del tipo de curso, la duración, la nacionalidad y dónde se presenta la solicitud. Los estudiantes no comunitarios pueden acabar necesitando una TIE si se quedan más tiempo. Los estudiantes de la UE siguen un proceso distinto y pueden necesitar el registro de la UE si se quedan más de tres meses. Esta hoja de ruta te ayuda a entender el recorrido general; no sustituye los requisitos oficiales.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal. Las normas de residencia como estudiante dependen de tu nacionalidad, el tipo de curso, la duración de los estudios, los documentos, tu situación económica, la cobertura sanitaria y dónde se solicita el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿Visado o autorización?</th><td>Puede hacer falta, según la nacionalidad, el tipo de curso y la duración de los estudios.</td></tr>
            <tr><th>¿Igual para todos?</th><td>No. Estudiantes de la UE y no comunitarios siguen procesos distintos, y los requisitos varían según el caso.</td></tr>
            <tr><th>Estudiantes no comunitarios</th><td>Pueden acabar necesitando una TIE si se quedan más tiempo.</td></tr>
            <tr><th>Estudiantes de la UE</th><td>Pueden necesitar el registro de la UE si se quedan más de tres meses.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil, sobre todo en tipos de curso o nacionalidades poco habituales.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Estudiantes no UE", text: "Útil si planeas estudiar en España viniendo de fuera de la UE." },
            { title: "Estudiantes de la UE", text: "Útil si eres ciudadano de la UE, del EEE o de Suiza y planeas estudiar en España." },
            { title: "Estudiantes de intercambio", text: "Útil si estudias en España dentro de un programa de intercambio." },
            { title: "Estudiantes universitarios", text: "Útil si te matriculas en un programa universitario español." },
            { title: "Estudiantes de idiomas", text: "Útil si asistes a un curso o escuela de idiomas." },
            { title: "Estudiantes de formación profesional o reconocida", text: "Útil si te matriculas en formación profesional u otra formación reconocida." },
            { title: "Personas que ya están en España", text: "Útil si intentas entender si la vía de estudiante aplica a tu situación ahora mismo." }
          ])}<div class="guide-box guide-box--info"><strong>Hojas de ruta relacionadas</strong><p>Los ciudadanos de la UE deben consultar también la hoja de ruta de ciudadanos de la UE. Los estudiantes no comunitarios deben consultar también la hoja de ruta de ciudadanos no UE para el recorrido no comunitario más amplio.</p></div>`
        }),
        GuideSection({
          id: "antesDeSolicitarOMudarte",
          title: "Antes de solicitar o mudarte",
          children: `${Cards([
            { title: "Identidad", text: "Un pasaporte o documento nacional en vigor suele ser central en la solicitud." },
            { title: "Justificante de admisión o matrícula", text: "Normalmente hace falta justificante de admisión o matrícula antes de solicitar una vía de estudios." },
            { title: "Cobertura sanitaria", text: "Puede requerirse cobertura sanitaria, según tu vía y nacionalidad." },
            { title: "Justificante económico, según la vía", text: "Algunas vías pueden requerir justificante de fondos o ingresos suficientes." },
            { title: "Planificación del alojamiento", text: "Dónde vayas a vivir puede afectar al padrón y a otros trámites posteriores." },
            { title: "Certificado de antecedentes penales, si se requiere", text: "Algunas vías pueden pedir certificado de antecedentes penales." },
            { title: "Certificado médico, si se requiere", text: "Algunas vías pueden pedir certificado médico." },
            { title: "Traducciones, legalización o apostilla, si se requieren", text: "Algunos documentos extranjeros pueden necesitar traducción oficial, legalización o apostilla." }
          ])}<p>Los requisitos exactos dependen de la nacionalidad, el tipo de curso, la duración de los estudios y la vía de solicitud. Usa la <a href="${routes.esChecklist}">lista de documentos</a> como punto de partida general y confirma después la lista exacta para tu caso concreto.</p>`
        }),
        GuideSection({
          id: "estudiantesUe",
          title: "Estudiantes de la UE",
          children: `${Cards([
            { title: "Normalmente no hace falta visado", text: "Los estudiantes de la UE, del EEE y de Suiza normalmente no necesitan visado para estudiar en España." },
            { title: "Registro de la UE si te quedas más tiempo", text: "Si te quedas más de tres meses, puede aplicar el registro de la UE." },
            { title: "La sanidad y los recursos pueden importar", text: "La cobertura sanitaria y los recursos suficientes pueden importar para el registro de la UE." },
            { title: "Comprueba tu situación exacta", text: "Los estudiantes de la UE deben comprobar si su situación entra dentro de estudiante, trabajador u otra vía." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare }
          ])}`
        }),
        GuideSection({
          id: "estudiantesNoUe",
          title: "Estudiantes no UE",
          children: `${Cards([
            { title: "Visado o autorización de estudios", text: "Los estudiantes no comunitarios pueden necesitar un visado de estudios o autorización según su situación." },
            { title: "Puede empezar antes de viajar", text: "Algunos trámites pueden empezar antes de viajar, a través de un consulado español." },
            { title: "Puede depender de tu situación actual", text: "Otros trámites pueden depender de tu situación legal actual y tu vía." },
            { title: "Puede seguir la TIE", text: "Puede requerirse la TIE tras la aprobación o la llegada." },
            { title: "Distinto de las estancias turísticas", text: "Los trámites de estudiante son distintos de las estancias turísticas normales." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist }
          ])}`
        }),
        GuideSection({
          id: "sanidadYAlojamiento",
          title: "Sanidad y alojamiento",
          children: `${Cards([
            { title: "La sanidad varía según el caso", text: "Los requisitos de sanidad pueden depender de la nacionalidad, la vía y la duración de los estudios." },
            { title: "Seguro privado", text: "Algunos estudiantes pueden necesitar un seguro privado." },
            { title: "El alojamiento afecta a los pasos posteriores", text: "El alojamiento puede afectar al padrón y a otros trámites administrativos posteriores." },
            { title: "El alojamiento temporal tiene límites", text: "El alojamiento temporal puede no servir siempre para todas las necesidades administrativas." },
            { title: "Los requisitos varían", text: "Los requisitos varían según el caso y la localidad." }
          ])}${SourceLinks([
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron }
          ])}`
        }),
        GuideSection({
          id: "conceptosBasicosTieEstudiantes",
          title: "Conceptos básicos de la TIE para estudiantes",
          children: `${Cards([
            { title: "Muchos estudiantes no comunitarios la necesitan", text: "Muchos estudiantes no comunitarios que se quedan más tiempo pueden necesitar una TIE." },
            { title: "No es lo mismo que el NIE", text: "La TIE no es lo mismo que el NIE." },
            { title: "No es lo mismo que el registro de la UE", text: "La TIE no es lo mismo que el registro de la UE." },
            { title: "Citas y recogida", text: "Los trámites de TIE pueden implicar citas, huellas y recogida." },
            { title: "Depende de tu caso", text: "Los detalles dependen de la aprobación, la vía y el procedimiento local." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No confundas TIE, NIE y registro de la UE. Confirma qué documento aplica a tu situación antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "trabajarMientrasEstudias",
          title: "Trabajar mientras estudias",
          children: `${Cards([
            { title: "Puede permitirse trabajo limitado", text: "Los estudiantes no comunitarios de estudios superiores suelen tener algún derecho a trabajar, normalmente limitado a un número reducido de horas semanales y siempre que sea compatible con el curso. Otras vías de estudiante (secundaria, algunos cursos de idiomas o formación) pueden tener un derecho distinto o inexistente." },
            { title: "Depende del estatus y la vía", text: "El derecho a trabajar depende del estatus del estudiante, la vía y las normas vigentes, que pueden cambiar." },
            { title: "Verifica antes de aceptar trabajo", text: "Los estudiantes deben verificar las condiciones exactas de su situación antes de aceptar un empleo, en vez de suponer que una regla general se aplica a su vía concreta." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No supongas que el estatus de estudiante da automáticamente derecho a trabajar a jornada completa. Comprueba las condiciones que aplican a tu vía concreta antes de trabajar.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que cualquier curso da derecho a una vía de estudiante.",
            "Suponer que la estancia turística basta para estudios de larga duración.",
            "Confundir el NIE y la TIE.",
            "Ignorar los requisitos de sanidad.",
            "Preparar los documentos demasiado tarde.",
            "Ignorar las necesidades de traducción, legalización o apostilla.",
            "Suponer que el estatus de estudiante da automáticamente derecho a trabajar.",
            "Esperar a que las citas se vuelvan urgentes.",
            "Confiar solo en consejos informales."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Necesito visado para estudiar en España?", text: "Depende de tu nacionalidad, el tipo de curso y la duración de los estudios. Algunos estudiantes necesitan visado o autorización de estudios; otros no. Comprueba los requisitos oficiales de tu caso." },
            { title: "¿Pueden los ciudadanos de la UE estudiar en España sin visado?", text: "Normalmente sí. Los estudiantes de la UE, del EEE y de Suiza normalmente no necesitan visado, aunque puede aplicar el registro de la UE si te quedas más de tres meses." },
            { title: "¿Necesitan los estudiantes una TIE?", text: "Muchos estudiantes no comunitarios que se quedan más tiempo pueden necesitar una TIE. Los requisitos dependen de tu vía y de la aprobación." },
            { title: "¿Pueden trabajar los estudiantes en España?", text: "Depende del estatus del estudiante, la vía y las normas vigentes. No supongas que el derecho a trabajar es automático: verifícalo antes de aceptar un empleo." },
            { title: "¿Es el NIE lo mismo que la TIE?", text: "No. El NIE es un número de identificación. La TIE es una tarjeta física de identidad de extranjero. No son el mismo documento." },
            { title: "¿Necesito seguro médico privado?", text: "Depende de tu vía y tu nacionalidad. Algunos estudiantes pueden necesitar seguro privado; otros pueden usar otra vía de sanidad." },
            { title: "¿Puedo usar alojamiento temporal?", text: "Puede servir para algunas necesidades iniciales, pero el alojamiento temporal puede no sustentar siempre todos los trámites administrativos, como el padrón. Compruébalo antes de confiar en él." },
            { title: "¿Y si ya estoy en España?", text: "Usa Empieza aquí y esta hoja de ruta juntas para entender qué vía puede aplicarse, y comprueba los requisitos oficiales antes de suponer que un trámite concreto encaja con tu situación." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, admisión, economía y traducciones para poder responder rápido en cuanto conozcas los requisitos exactos de tu vía.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esRetireInSpain,
    html: GuideLayout({
      lang: "es",
      path: routes.esRetireInSpain,
      canonical: `https://iberigo.eu${routes.esRetireInSpain}`,
      altHref: retireInSpainPair.es.altHref,
      hreflangAlternates: retireInSpainPair.es.hreflangAlternates,
      title: "Jubilarte en España — IberiGo",
      description: "Una hoja de ruta práctica para quienes planean jubilarse en España o vivir de recursos suficientes: documentos, sanidad, impuestos, registro de la UE, vías no comunitarias y errores comunes.",
      metadata: guideMetadataFor(routes.esRetireInSpain),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Jubilarte en España" }],
      hero: {
        kicker: "Jubilación y recursos",
        title: "Jubilarte en España",
        intro: "Un punto de partida práctico para entender cómo pueden encajar la jubilación, las pensiones, la sanidad, los recursos suficientes y las vías de residencia al mudarte a España.",
        asideTitle: "No hay un único trámite para cada jubilado",
        asideText: "Las vías de jubilación y de recursos suficientes dependen de tu nacionalidad, tus ingresos, tu situación de pensión, tu cobertura sanitaria, tu situación familiar, tus bienes, tu residencia fiscal y dónde solicitas el trámite."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>Las personas que se jubilan en España pueden seguir vías distintas según su nacionalidad y su situación económica. Ciudadanos de la UE y no comunitarios siguen procesos distintos. La cobertura sanitaria y el justificante de recursos suelen ser importantes. Conviene revisar pronto los ingresos por pensión, los ahorros, las inversiones y la residencia fiscal. Esta hoja de ruta te ayuda a entender el recorrido general; no sustituye los requisitos oficiales.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal, fiscal ni financiero. Las vías de jubilación y de recursos suficientes dependen de tu nacionalidad, tus ingresos, tu situación de pensión, tu cobertura sanitaria, tu situación familiar, tus bienes, tu residencia fiscal y dónde solicitas el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>¿Visado o autorización?</th><td>Puede hacer falta para ciudadanos no comunitarios, según la nacionalidad y la vía.</td></tr>
            <tr><th>¿Igual para todos?</th><td>No. Ciudadanos de la UE y no comunitarios siguen procesos distintos, y los requisitos varían según el caso.</td></tr>
            <tr><th>Factores centrales</th><td>La cobertura sanitaria y el justificante de recursos suficientes suelen ser centrales en el trámite.</td></tr>
            <tr><th>Jubilados no comunitarios</th><td>Pueden acabar necesitando una TIE tras la aprobación o la llegada.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil, sobre todo para cuestiones de pensión, impuestos o finanzas transfronterizas.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Ciudadanos de la UE que se jubilan en España", text: "Útil si eres ciudadano de la UE, del EEE o de Suiza y planeas jubilarte en España." },
            { title: "Ciudadanos no UE que se jubilan en España", text: "Útil si eres ciudadano no comunitario y consideras jubilarte en España." },
            { title: "Personas que viven de pensiones", text: "Útil si los ingresos por pensión sustentan tu mudanza." },
            { title: "Personas que viven de ahorros o inversiones", text: "Útil si los ingresos por ahorros o inversiones sustentan tu mudanza." },
            { title: "Personas que no planean trabajar en España", text: "Útil si no planeas incorporarte a un empleo en España." },
            { title: "Parejas o familias que se mudan juntas", text: "Útil si te mudas con cónyuge, pareja o familia." },
            { title: "Personas que comparan vías", text: "Útil si estás comparando jubilación, recursos suficientes u otras vías similares." }
          ])}<div class="guide-box guide-box--info"><strong>Hojas de ruta relacionadas</strong><p>Quienes planeen trabajar deben usar la hoja de ruta de trabajo en España. Quienes trabajen por cuenta propia deben usar la hoja de ruta de autónomos.</p></div>`
        }),
        GuideSection({
          id: "ciudadanosUeJubilandose",
          title: "Ciudadanos de la UE que se jubilan o viven de recursos propios",
          children: `${Cards([
            { title: "Normalmente no hace falta visado", text: "Los ciudadanos de la UE, del EEE y de Suiza normalmente no necesitan visado para mudarse a España." },
            { title: "Registro de la UE si te quedas más tiempo", text: "Si te quedas más de tres meses, puede aplicar el registro de la UE." },
            { title: "Recursos y cobertura sanitaria", text: "Los jubilados o personas autosuficientes de la UE pueden necesitar justificar recursos suficientes y cobertura sanitaria." },
            { title: "Depende de la oficina y la situación", text: "Los justificantes exactos pueden depender de la oficina y la situación personal." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes }
          ])}`
        }),
        GuideSection({
          id: "ciudadanosNoUeJubilandose",
          title: "Ciudadanos no UE que se jubilan en España",
          children: `${Cards([
            { title: "Hace falta la vía correcta primero", text: "Los ciudadanos no comunitarios normalmente necesitan el visado o la vía de residencia correcta antes de vivir en España a largo plazo." },
            { title: "Vías para solicitantes autosuficientes", text: "Algunas vías pueden estar pensadas para personas que pueden mantenerse sin trabajar en España." },
            { title: "Distintos canales según la vía", text: "El trámite puede implicar a un consulado español, autoridades de extranjería u otros canales oficiales, según la vía." },
            { title: "Puede seguir la TIE", text: "Puede requerirse una TIE tras la aprobación o la llegada." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist }
          ])}`
        }),
        GuideSection({
          id: "antesDeSolicitarOMudarte",
          title: "Antes de solicitar o mudarte",
          children: `${Cards([
            { title: "Identidad", text: "Un pasaporte o documento nacional en vigor suele ser central en la solicitud." },
            { title: "Documentos de pensión", text: "Puede necesitarse justificante de pensión según tu vía." },
            { title: "Justificante de ahorros o ingresos regulares", text: "Algunas vías pueden requerir justificante de ahorros o ingresos regulares." },
            { title: "Cobertura sanitaria o formulario S1, si procede", text: "La cobertura sanitaria o un formulario S1 pueden ser relevantes según tu situación." },
            { title: "Documentos de estado civil, si te mudas con cónyuge o familia", text: "Los documentos de matrimonio o familia pueden importar si te mudas junto a otras personas." },
            { title: "Planificación del alojamiento", text: "Dónde vayas a vivir puede afectar al padrón y a otros trámites posteriores." },
            { title: "Certificado de antecedentes penales, si se requiere", text: "Algunas vías pueden pedir certificado de antecedentes penales." },
            { title: "Certificado médico, si se requiere", text: "Algunas vías pueden pedir certificado médico." },
            { title: "Traducciones, legalización o apostilla, si se requieren", text: "Algunos documentos extranjeros pueden necesitar traducción oficial, legalización o apostilla." },
            { title: "Revisión de la residencia fiscal", text: "Revisar pronto tu situación de residencia fiscal puede ayudarte a planificar." }
          ])}<p>Los requisitos exactos dependen de la nacionalidad, la vía de residencia, el origen de los ingresos y dónde se presenta la solicitud.</p>`
        }),
        GuideSection({
          id: "sanidadParaJubilados",
          title: "Sanidad para jubilados",
          children: `${Cards([
            { title: "A menudo un punto clave de planificación", text: "La sanidad suele ser uno de los puntos de planificación más importantes para los jubilados." },
            { title: "Vías basadas en pensión o formulario S1", text: "Algunos jubilados pueden usar vías de sanidad pública, como el derecho basado en la pensión o el S1, cuando proceda." },
            { title: "Puede hacer falta seguro privado", text: "Otros pueden necesitar seguro médico privado según la vía y la situación." },
            { title: "Depende del trámite", text: "Los requisitos de seguro privado pueden depender del trámite concreto." },
            { title: "Variación regional", text: "Los trámites de tarjeta sanitaria regional pueden variar." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No supongas que el seguro médico privado siempre satisface cualquier vía. Comprueba el requisito de tu trámite concreto.</p></div>${SourceLinks([
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social }
          ])}`
        }),
        GuideSection({
          id: "impuestosYPensiones",
          title: "Impuestos y pensiones",
          children: `${Cards([
            { title: "Puede afectar a la residencia fiscal", text: "Mudarte a España puede afectar a tu residencia fiscal." },
            { title: "Distinta de la residencia de inmigración", text: "La residencia fiscal es distinta de la residencia de inmigración." },
            { title: "Puede aplicarse a los ingresos mundiales", text: "España puede gravar a los residentes por sus ingresos mundiales según las circunstancias." },
            { title: "Varios tipos de ingresos a revisar", text: "Conviene revisar pensiones, ingresos de inversión, ingresos de alquiler y de ahorros." },
            { title: "Los convenios pueden importar", text: "Los convenios de doble imposición pueden afectar al resultado." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esto no es asesoramiento fiscal sobre pensiones específico de ningún país. Busca asesoramiento profesional para tu situación de pensión e impuestos concreta.</p></div>${SourceLinks([
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía del certificado digital y Cl@ve (en inglés)", href: routes.digital }
          ])}`
        }),
        GuideSection({
          id: "alojamientoYPadron",
          title: "Alojamiento y padrón",
          children: `${Cards([
            { title: "A menudo hace falta una dirección estable", text: "Los jubilados suelen necesitar una dirección estable para los trámites administrativos." },
            { title: "El padrón sirve para varios trámites", text: "El padrón puede necesitarse para la sanidad, los trámites de residencia y los servicios locales." },
            { title: "Varía según el municipio", text: "Los requisitos varían según el municipio." },
            { title: "Comprueba antes de firmar", text: "Antes de firmar un contrato de alquiler, comprueba si la dirección permite el empadronamiento." }
          ])}${SourceLinks([
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron }
          ])}`
        }),
        GuideSection({
          id: "conceptosBasicosTieJubilados",
          title: "Conceptos básicos de la TIE para jubilados no UE",
          children: `${Cards([
            { title: "Muchos residentes no comunitarios la necesitan", text: "Muchos residentes no comunitarios pueden necesitar una TIE tras la aprobación o la llegada." },
            { title: "No es lo mismo que el NIE", text: "La TIE no es lo mismo que el NIE." },
            { title: "No es lo mismo que el registro de la UE", text: "La TIE no es lo mismo que el registro de la UE." },
            { title: "Citas y recogida", text: "Los trámites de TIE pueden implicar citas, huellas y recogida." },
            { title: "Depende de tu caso", text: "Los detalles dependen de la aprobación, la vía y el procedimiento local." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No confundas TIE, NIE y registro de la UE. Confirma qué documento aplica a tu situación antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que tener una propiedad da derecho de residencia.",
            "Suponer que los ingresos por pensión bastan automáticamente.",
            "Confundir la residencia de inmigración con la residencia fiscal.",
            "Ignorar los requisitos de sanidad.",
            "Comprar seguro privado sin comprobar los requisitos de la vía.",
            "Suponer que jubilados de la UE y no comunitarios siguen el mismo trámite.",
            "Preparar los documentos económicos demasiado tarde.",
            "Ignorar traducciones, legalización o apostilla.",
            "Confiar solo en consejos informales."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Puedo jubilarme en España?", text: "A menudo sí, pero la vía correcta depende de tu nacionalidad, tus ingresos y tu situación. Comprueba los requisitos oficiales que aplican a tu caso." },
            { title: "¿Pueden los ciudadanos de la UE jubilarse en España sin visado?", text: "Normalmente sí. Los ciudadanos de la UE, del EEE y de Suiza normalmente no necesitan visado, aunque puede aplicar el registro de la UE si te quedas más de tres meses, junto con justificante de recursos y cobertura sanitaria." },
            { title: "¿Pueden los ciudadanos no UE jubilarse en España?", text: "A menudo sí, a través de una vía pensada para personas que pueden mantenerse a sí mismas, pero los requisitos exactos dependen de la nacionalidad y la situación. Comprueba los requisitos oficiales antes de suponer que una vía concreta aplica." },
            { title: "¿Comprar una propiedad me da derecho de residencia?", text: "No. Ser propietario de una vivienda en España no da por sí solo derecho de residencia. La residencia sigue dependiendo de la vía correcta y de la solicitud." },
            { title: "¿Necesitan los jubilados seguro médico privado?", text: "Depende de la vía y la situación. Algunos jubilados pueden usar vías de sanidad basadas en pensión o el S1; otros pueden necesitar seguro privado. Comprueba el requisito de tu trámite concreto." },
            { title: "¿Qué es un formulario S1?", text: "El S1 es un formulario que puede permitir a ciertas personas, a menudo pensionistas cubiertos por otro país de la UE o del EEE, registrar el derecho a sanidad en España. La elegibilidad depende de tu situación." },
            { title: "¿Me gravará España la pensión?", text: "Puede que sí, según tu residencia fiscal, el tipo de pensión y cualquier convenio fiscal aplicable. Esto no es asesoramiento fiscal: busca asesoramiento profesional para tu situación concreta." },
            { title: "¿Necesitan los jubilados no comunitarios una TIE?", text: "Muchos residentes no comunitarios pueden necesitar una TIE tras la aprobación o la llegada. Los requisitos dependen de tu vía." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía de alojamiento", href: routes.esAccommodation },
            { label: "Ver la guía del padrón (en inglés)", href: routes.padron },
            { label: "Ver la guía de primeros pasos", href: routes.esSettling }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, pensión, economía y traducciones para poder responder rápido en cuanto conozcas los requisitos exactos de tu vía.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.esSelfEmployed,
    html: GuideLayout({
      lang: "es",
      path: routes.esSelfEmployed,
      canonical: `https://iberigo.eu${routes.esSelfEmployed}`,
      altHref: selfEmployedPair.es.altHref,
      hreflangAlternates: selfEmployedPair.es.hreflangAlternates,
      title: "Autónomo y trabajo por cuenta propia en España — IberiGo",
      description: "Una hoja de ruta práctica para quienes consideran el trabajo por cuenta propia en España: conceptos básicos de autónomo, documentos, impuestos, Seguridad Social, sanidad, vías no comunitarias y errores comunes.",
      metadata: guideMetadataFor(routes.esSelfEmployed),
      showContinueJourney: false,
      breadcrumbs: [{ label: "Empieza aquí", href: routes.esStartHere }, { label: "Trabajo por cuenta propia" }],
      hero: {
        kicker: "Vía de autoempleo",
        title: "Autónomo y trabajo por cuenta propia en España",
        intro: "Un punto de partida práctico para entender el trabajo por cuenta propia en España, qué puedes necesitar preparar y qué cuestiones de impuestos, Seguridad Social y residencia conviene revisar pronto.",
        asideTitle: "No es automático para todo el mundo",
        asideText: "Las normas de autoempleo dependen de tu nacionalidad, tu situación de residencia, tu actividad empresarial, tus ingresos, tus clientes, tu situación fiscal, tu alta en la Seguridad Social y dónde solicitas el trámite."
      },
      sections: [
        GuideSection({
          id: "languageNote",
          title: "Sobre esta página en español",
          children: `<p>Algunos enlaces llevan a guías actuales en inglés porque las versiones en español de esas páginas todavía no existen. Usa esta guía como orientación práctica y confirma siempre los requisitos oficiales de tu propio trámite.</p>`
        }),
        GuideSection({
          id: "respuestaRapida",
          title: "Respuesta rápida",
          children: `<p>El trabajo por cuenta propia en España suele estar conectado con el alta como autónomo, las obligaciones fiscales y la Seguridad Social. Ciudadanos de la UE y no comunitarios pueden enfrentarse a cuestiones de residencia distintas. Los ciudadanos no comunitarios normalmente necesitan la vía de residencia o trabajo correcta antes de realizar actividad por cuenta propia. El alta como autónomo no es lo mismo que el permiso de inmigración. Esta hoja de ruta te ayuda a entender el recorrido general; no sustituye los requisitos oficiales.</p>`
        }),
        GuideSection({
          id: "notaImportante",
          title: "Nota importante",
          children: `<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta guía ofrece solo información general y no es asesoramiento legal, fiscal, de inmigración ni financiero. Las normas de autoempleo dependen de tu nacionalidad, tu situación de residencia, tu actividad empresarial, tus ingresos, tus clientes, tu situación fiscal, tu alta en la Seguridad Social y dónde solicitas el trámite. Comprueba siempre los requisitos oficiales de tu caso concreto antes de tomar decisiones.</p></div>`
        }),
        GuideSection({
          id: "enResumen",
          title: "En resumen",
          children: `<table class="guide-table"><tbody>
            <tr><th>Qué suele significar autónomo</th><td>Estatus de trabajo por cuenta propia en España, conectado con el alta fiscal y de Seguridad Social.</td></tr>
            <tr><th>¿Igual para todos?</th><td>No. Ciudadanos de la UE y no comunitarios se enfrentan a cuestiones de residencia distintas, y los requisitos varían según el caso.</td></tr>
            <tr><th>¿Residencia automática?</th><td>No. El alta como autónomo no es lo mismo que el permiso de inmigración.</td></tr>
            <tr><th>Autónomos no comunitarios</th><td>Pueden acabar necesitando una TIE tras la aprobación o la llegada.</td></tr>
            <tr><th>Asesoramiento profesional</th><td>Puede ser útil: muchas personas usan un gestor o asesor profesional.</td></tr>
          </tbody></table>`
        }),
        GuideSection({
          id: "paraQuienEsEstaGuia",
          title: "Para quién es esta guía",
          children: `${Cards([
            { title: "Freelancers", text: "Útil si facturas a clientes como profesional independiente." },
            { title: "Contratistas", text: "Útil si trabajas por contrato en vez de como empleado." },
            { title: "Trabajadores individuales", text: "Útil si llevas una actividad empresarial individual." },
            { title: "Pequeños empresarios", text: "Útil si estás montando o llevando un pequeño negocio en España." },
            { title: "Ciudadanos de la UE que planean el autoempleo", text: "Útil si eres ciudadano de la UE, del EEE o de Suiza y consideras el autoempleo en España." },
            { title: "Ciudadanos no UE que consideran el autoempleo", text: "Útil si eres ciudadano no comunitario y exploras la vía de autónomo." },
            { title: "Trabajadores remotos que comparan vías", text: "Útil si comparas las vías de autónomo y nómada digital." },
            { title: "Personas que ya están en España", text: "Útil si intentas entender los conceptos básicos de autónomo para tu situación actual." }
          ])}<div class="guide-box guide-box--info"><strong>Hojas de ruta relacionadas</strong><p>Quienes trabajen para una empresa española deben usar la hoja de ruta de trabajo en España. Los trabajadores remotos con empresas o clientes extranjeros deben comparar también la hoja de ruta de nómada digital.</p></div>`
        }),
        GuideSection({
          id: "conceptosBasicosAutonomo",
          title: "Conceptos básicos de autónomo",
          children: Cards([
            { title: "Qué suele significar autónomo", text: "Autónomo suele referirse al estatus de trabajo por cuenta propia en España." },
            { title: "Alta fiscal y de Seguridad Social", text: "Puede implicar el alta fiscal y el alta en la Seguridad Social." },
            { title: "Obligaciones continuas", text: "Puede implicar facturas, declaraciones trimestrales, cuotas y llevanza de registros." },
            { title: "Depende de la actividad y las circunstancias", text: "Las obligaciones exactas dependen de la actividad y las circunstancias." },
            { title: "Muchas personas usan un gestor", text: "Muchas personas usan un gestor o asesor profesional para gestionar esto." }
          ])
        }),
        GuideSection({
          id: "ciudadanosUeAutoempleo",
          title: "Ciudadanos de la UE y el autoempleo",
          children: `${Cards([
            { title: "Normalmente no hace falta visado", text: "Los ciudadanos de la UE, del EEE y de Suiza normalmente no necesitan visado para mudarse a España." },
            { title: "Registro de la UE si te quedas más tiempo", text: "Si te quedas más de tres meses, puede aplicar el registro de la UE." },
            { title: "El autoempleo como una vía", text: "El autoempleo puede ser una vía para el registro de la UE, pero pueden requerirse justificantes." },
            { title: "Revisa pronto impuestos y Seguridad Social", text: "Conviene revisar pronto las obligaciones fiscales y de Seguridad Social." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la guía del registro de la UE (en inglés)", href: routes.euRegistration },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes }
          ])}`
        }),
        GuideSection({
          id: "ciudadanosNoUeAutoempleo",
          title: "Ciudadanos no UE y el autoempleo",
          children: `${Cards([
            { title: "Hace falta la vía correcta primero", text: "Los ciudadanos no comunitarios normalmente necesitan la vía de residencia o trabajo correcta antes de realizar actividad por cuenta propia en España." },
            { title: "Puede implicar un plan de negocio", text: "El trámite puede implicar un plan de negocio, documentos profesionales, autorización o pasos consulares según la vía." },
            { title: "No es un permiso por sí solo", text: "El alta como autónomo por sí sola no debe tratarse como permiso para vivir o trabajar." },
            { title: "Puede seguir la TIE", text: "Puede requerirse una TIE tras la aprobación o la llegada." }
          ])}${SourceLinks([
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la guía de nómada digital (en inglés)", href: routes.digitalNomad },
            { label: "Ver la lista de documentos", href: routes.esChecklist }
          ])}`
        }),
        GuideSection({
          id: "antesDeEmpezar",
          title: "Antes de empezar",
          children: `${Cards([
            { title: "Identidad", text: "Un pasaporte o documento nacional en vigor suele ser central en el trámite." },
            { title: "Autorización de residencia o trabajo, según la vía", text: "Puede necesitarse documentación de residencia o trabajo, según tu vía." },
            { title: "NIE o TIE, según la situación", text: "Los requisitos de NIE o TIE dependen de tu situación." },
            { title: "Plan de negocio, si se requiere", text: "Puede requerirse un plan de negocio en algunas vías." },
            { title: "Cualificaciones profesionales, si procede", text: "Algunas actividades pueden requerir documentos de cualificación reconocidos." },
            { title: "Contratos de clientes o justificante de ingresos previstos, si procede", text: "Algunas vías pueden pedir contratos de clientes o justificante de ingresos previstos." },
            { title: "Información de alta fiscal", text: "La información de alta fiscal suele formar parte de empezar la actividad." },
            { title: "Alta en la Seguridad Social", text: "El alta en la Seguridad Social suele formar parte de empezar la actividad." },
            { title: "Planificación de la sanidad", text: "La planificación de la sanidad debe revisarse junto con tu vía." },
            { title: "Traducciones, legalización o apostilla, si se requieren", text: "Algunos documentos extranjeros pueden necesitar traducción oficial, legalización o apostilla." }
          ])}<p>Los requisitos exactos dependen de la nacionalidad, la situación de residencia, la actividad empresarial y la vía.</p>`
        }),
        GuideSection({
          id: "impuestosFacturasRegistros",
          title: "Impuestos, facturas y registros",
          children: `${Cards([
            { title: "Pueden aplicar obligaciones fiscales españolas", text: "Los trabajadores por cuenta propia pueden tener obligaciones fiscales españolas." },
            { title: "Alta, facturación, declaraciones, registros", text: "Esto puede incluir alta, facturación, declaraciones y llevanza de registros." },
            { title: "Depende de la actividad", text: "El IVA, el IRPF y otras obligaciones pueden depender de la actividad." },
            { title: "La residencia fiscal es aparte", text: "La residencia fiscal es distinta de la residencia de inmigración." },
            { title: "Un asesor fiscal puede ser útil", text: "Un asesor fiscal o gestor puede ser útil para tu situación concreta." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esto no es una guía exacta de declaraciones. Busca asesoramiento profesional para tus obligaciones fiscales y de facturación concretas.</p></div>${SourceLinks([
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía del certificado digital y Cl@ve (en inglés)", href: routes.digital }
          ])}`
        }),
        GuideSection({
          id: "seguridadSocialYSanidad",
          title: "Seguridad Social y sanidad",
          children: `${Cards([
            { title: "A menudo conectado con la Seguridad Social", text: "El autoempleo suele estar conectado con el alta en la Seguridad Social." },
            { title: "Puede afectar a la sanidad y las prestaciones", text: "Las cuotas de la Seguridad Social pueden afectar al acceso a la sanidad y a las prestaciones." },
            { title: "Depende de la situación y la vía", text: "El acceso a la sanidad depende de la situación y la vía." },
            { title: "Mantén los conceptos separados", text: "No confundas el número de la Seguridad Social con el NIE, la TIE o la tarjeta sanitaria." }
          ])}${SourceLinks([
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare }
          ])}`
        }),
        GuideSection({
          id: "certificadoDigitalYAdministracion",
          title: "Certificado digital y administración",
          children: `${Cards([
            { title: "La administración online es habitual", text: "Muchos autónomos necesitan gestionar trámites administrativos online." },
            { title: "El certificado digital o Cl@ve puede ayudar", text: "El certificado digital o Cl@ve puede ayudar con los trámites fiscales y de Seguridad Social." },
            { title: "No todo está online", text: "No todos los trámites son idénticos ni están completamente disponibles online." },
            { title: "Guarda tus registros", text: "Guarda las notificaciones oficiales y tus registros." }
          ])}<p>Usa la <a href="${routes.digital}">guía del certificado digital y Cl@ve (en inglés)</a> para comparar los dos sistemas.</p>`
        }),
        GuideSection({
          id: "conceptosBasicosTieAutonomos",
          title: "Conceptos básicos de la TIE para autónomos no UE",
          children: `${Cards([
            { title: "Muchos residentes no comunitarios la necesitan", text: "Muchos residentes no comunitarios pueden necesitar una TIE tras la aprobación o la llegada." },
            { title: "No es lo mismo que el NIE", text: "La TIE no es lo mismo que el NIE." },
            { title: "No es lo mismo que el registro de la UE", text: "La TIE no es lo mismo que el registro de la UE." },
            { title: "Citas y recogida", text: "Los trámites de TIE pueden implicar citas, huellas y recogida." },
            { title: "Depende de tu caso", text: "Los detalles dependen de la aprobación, la vía y el procedimiento local." }
          ])}<div class="guide-box guide-box--warning"><strong>Importante</strong><p>No confundas TIE, NIE y registro de la UE. Confirma qué documento aplica a tu situación antes de una cita.</p></div>`
        }),
        GuideSection({
          id: "erroresComunes",
          title: "Errores comunes",
          children: Cards([
            "Suponer que el alta como autónomo da automáticamente derecho de residencia.",
            "Confundir las vías de autónomo, empleado y nómada digital.",
            "Empezar la actividad antes de que el permiso esté claro.",
            "Ignorar el alta fiscal.",
            "Ignorar las obligaciones de Seguridad Social.",
            "Confundir el NIE con la TIE.",
            "Subestimar la llevanza de registros.",
            "Confiar solo en consejos informales.",
            "Esperar a que los plazos fiscales o de Seguridad Social sean urgentes."
          ])
        }),
        GuideSection({
          id: "preguntasFrecuentes",
          title: "Preguntas frecuentes",
          children: Cards([
            { title: "¿Qué significa autónomo?", text: "Autónomo suele referirse al estatus de trabajo por cuenta propia en España, generalmente conectado con el alta fiscal y de Seguridad Social. Las obligaciones exactas dependen de tu actividad." },
            { title: "¿Pueden los extranjeros darse de alta como autónomos en España?", text: "A menudo sí, pero la vía correcta depende de tu nacionalidad y tu situación de residencia. Comprueba los requisitos oficiales de tu caso." },
            { title: "¿Pueden los ciudadanos no UE darse de alta como autónomos?", text: "Depende de tener primero la vía de residencia o trabajo correcta. El alta como autónomo por sí sola no debe tratarse como permiso para vivir o trabajar." },
            { title: "¿Es autónomo lo mismo que el permiso para vivir en España?", text: "No. Autónomo es un estatus de alta fiscal y de Seguridad Social. No es lo mismo que el permiso de inmigración." },
            { title: "¿Pagan Seguridad Social los autónomos?", text: "El autoempleo suele estar conectado con el alta y las cuotas de la Seguridad Social, pero las obligaciones exactas dependen de tu situación." },
            { title: "¿Necesito un gestor?", text: "No todo el mundo lo necesita, pero muchos autónomos usan un gestor o asesor fiscal para gestionar el alta, las declaraciones y las cuotas." },
            { title: "¿Es el NIE lo mismo que la TIE?", text: "No. El NIE es un número de identificación. La TIE es una tarjeta física de identidad de extranjero. No son el mismo documento." },
            { title: "¿Debería elegir la vía de nómada digital o de autónomo?", text: "Depende de tu estructura de trabajo, tus clientes y tu situación. Compara la hoja de ruta de nómada digital y esta hoja de ruta, y comprueba los requisitos oficiales antes de decidir." }
          ])
        }),
        GuideSection({
          id: "tuProximoPaso",
          title: "Tu próximo paso",
          children: `${SourceLinks([
            { label: "Ver Empieza aquí", href: routes.esStartHere },
            { label: "Ver la hoja de ruta de ciudadanos de la UE", href: routes.esEuRoadmap },
            { label: "Ver la hoja de ruta de ciudadanos no UE", href: routes.esNonEuRoadmap },
            { label: "Ver la guía de nómada digital (en inglés)", href: routes.digitalNomad },
            { label: "Ver la hoja de ruta de trabajo en España", href: routes.esWorkInSpain },
            { label: "Ver la lista de documentos", href: routes.esChecklist },
            { label: "Ver la guía de Seguridad Social (en inglés)", href: routes.social },
            { label: "Ver la guía de impuestos (en inglés)", href: routes.taxes },
            { label: "Ver la guía del certificado digital y Cl@ve (en inglés)", href: routes.digital },
            { label: "Ver la guía de sanidad (en inglés)", href: routes.healthcare }
          ])}<div class="guide-box guide-box--tip"><strong>Consejo</strong><p>Guarda una carpeta con documentos de identidad, negocio, impuestos y Seguridad Social para poder responder rápido en cuanto conozcas los requisitos exactos de tu vía.</p></div>`
        })
      ]
    })
  },
  {
    route: routes.euRoadmap,
    html: GuideLayout({
      path: routes.euRoadmap,
      canonical: `https://iberigo.eu${routes.euRoadmap}`,
      altHref: euRoadmapPair.en.altHref,
      hreflangAlternates: euRoadmapPair.en.hreflangAlternates,
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
      altHref: settlingPair.en.altHref,
      hreflangAlternates: settlingPair.en.hreflangAlternates,
      title: "Settling Into Spain: Your First Steps After Arrival — IberiGo",
      description: "A practical guide to the first steps after arriving in Spain, including accommodation, padrón, healthcare, registration, banking and digital access.",
      metadata: guideMetadataFor(routes.settling),
      showTrustBlocks: true,
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
        ["Address evidence", "Address evidence can affect padrón, healthcare, banking and other steps."],
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
            { title: "Fee amount", text: "The current fee is 12.00 EUR, paid via Modelo 790-012. The fee amount can change, so check the current form and instructions before paying." }
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
    altHref: bankingPair.en.altHref,
    hreflangAlternates: bankingPair.en.hreflangAlternates,
    title: "Opening a Bank Account in Spain — IberiGo",
    description: "A practical guide to opening a bank account in Spain, including resident and non-resident accounts, documents, fees, direct debits and common mistakes.",
    metadata: guideMetadataFor(routes.banking),
    showTrustBlocks: true,
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
    altHref: accommodationPair.en.altHref,
    hreflangAlternates: accommodationPair.en.hreflangAlternates,
    title: "Finding Accommodation in Spain — IberiGo",
    description: "A practical guide to finding accommodation in Spain, including short-term rentals, long-term rentals, documents, contracts, deposits, scams and common mistakes.",
    metadata: guideMetadataFor(routes.accommodation),
    showTrustBlocks: true,
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
      QuickAnswer("Many newcomers start with temporary accommodation before signing a long-term rental. Long-term rentals may require documents and proof of income. The padrón may depend on having an address where registration is possible. Review rental contracts carefully before signing and consider professional advice if anything is unclear. Scams and misleading listings are possible, especially online."),
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
          { title: "Utilities", text: "Check which utilities are included and which may need to be contracted or paid separately." },
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
    altHref: checklistPair.en.altHref,
    hreflangAlternates: checklistPair.en.hreflangAlternates,
    title: "Documents Checklist for Moving to Spain — IberiGo",
    description: "A practical checklist of documents you may need to prepare before moving to Spain, including identity documents, residency paperwork, healthcare, income proof, housing documents and official copies.",
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
      QuickAnswer("The documents you may need depend on your nationality, residency route and local procedure. Many newcomers prepare identity documents, proof of income, healthcare documents, accommodation documents and copies. Some foreign documents may need translation or legalisation. It is usually better to prepare early than wait until the appointment."),
      AtAGlance([
        ["Main idea", "Prepare identity, income, healthcare, address and appointment documents early when they apply to your route."],
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
        title: "Common documents to prepare",
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
        { question: "Should I prepare documents before arriving in Spain?", answer: "Usually yes, if they are likely to apply to your route. Some documents are easier to collect, translate or legalise before you move." }
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
    altHref: nonEuRoadmapPair.en.altHref,
    hreflangAlternates: nonEuRoadmapPair.en.hreflangAlternates,
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
          { title: "Work in Spain", text: "Work-based routes usually depend on a job offer, employer sponsorship or recognised work authorisation.", href: routes.workInSpain, label: "View roadmap" },
          { title: "Study in Spain", text: "Study routes usually depend on enrolment, programme length and financial means.", href: routes.students, label: "View roadmap" },
          { title: "Join family in Spain", text: "Family reunification routes usually depend on the relationship and the sponsoring family member's status.", href: routes.familyReunification, label: "View roadmap" },
          { title: "Family member of an EU citizen", text: "This route can differ from standard non-EU family routes, depending on the relationship and situation.", href: routes.euFamilyMemberRoadmap, label: "View roadmap" },
          { title: "Retire or live from sufficient resources", text: "This route usually depends on proof of income, savings and healthcare cover rather than employment.", href: routes.retireInSpain, label: "View roadmap" },
          { title: "Digital nomad / remote work", text: "This route usually depends on remote employment or client relationships based outside Spain.", href: routes.digitalNomad, label: "View roadmap" },
          { title: "Self-employed / business activity", text: "This route usually depends on the business plan, activity and financial evidence.", href: routes.selfEmployed, label: "View roadmap" },
          { title: "Already in Spain and unsure what applies", text: "Use the Start Here page and this roadmap together to narrow down what may apply.", href: routes.startHere, label: "Continue" }
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
    altHref: euFamilyMemberRoadmapPair.en.altHref,
    hreflangAlternates: euFamilyMemberRoadmapPair.en.hreflangAlternates,
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
    altHref: studentsPair.en.altHref,
    hreflangAlternates: studentsPair.en.hreflangAlternates,
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
          { title: "Limited work may be allowed", text: "Non-EU students on a higher-education stay often have some work rights included, usually capped at a limited number of hours per week and conditional on being compatible with the course. Other student routes (secondary education, some language or training programmes) may have different or no work rights." },
          { title: "Depends on status and route", text: "Work rights depend on the student's status, route and current rules, which can change." },
          { title: "Verify before accepting work", text: "Students should verify the exact conditions that apply to their situation before accepting work, rather than assuming a general rule applies to their specific route." }
        ])}${WarningBox("Do not assume student status automatically gives full-time work rights. Check the conditions that apply to your specific route before working.")}`
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

pages.push({
  route: routes.workInSpain,
  html: GuideLayout({
    path: routes.workInSpain,
    canonical: `https://iberigo.eu${routes.workInSpain}`,
    altHref: workInSpainPair.en.altHref,
    hreflangAlternates: workInSpainPair.en.hreflangAlternates,
    title: "Moving to Spain for Work — IberiGo",
    description: "A practical roadmap for people planning to work in Spain, including employee routes, documents, Social Security, healthcare, taxes, TIE basics and common mistakes.",
    metadata: guideMetadataFor(routes.workInSpain),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Work in Spain Roadmap" }],
    hero: {
      kicker: "Work route",
      title: "Moving to Spain for Work",
      intro: "A practical starting point for understanding work-related routes, what you may need to prepare, and which steps usually come before and after starting work in Spain.",
      asideTitle: "Not one process for every worker",
      asideText: "Work and residence rules can depend on your nationality, job offer, employer, contract type, qualifications, residence route and where the application is made."
    },
    sections: [
      QuickAnswer("People moving to Spain for work may follow different routes depending on nationality and job situation. EU citizens and non-EU citizens follow different processes. Non-EU citizens usually need the correct work and residence authorisation before working. Employees, highly qualified workers, seasonal workers and remote workers may follow different routes. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal advice. Work and residence rules can depend on your nationality, job offer, employer, contract type, qualifications, residence route and where the application is made. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Visa or authorisation?", "May be required, depending on nationality, job type and route."],
        ["Same for everyone?", "No. EU and non-EU citizens follow different processes, and requirements vary by case."],
        ["Job offer alone?", "Usually not enough by itself — the correct authorisation still needs to be in place before working."],
        ["Non-EU workers", "May eventually need a TIE after approval or arrival."],
        ["Professional advice", "May be useful, especially for less common contract types or qualifications."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "EU citizens moving to Spain for work", text: "Use this if you are an EU, EEA or Swiss citizen planning to work in Spain." },
          { title: "Non-EU citizens with a job offer", text: "Use this if you have a job offer and are considering the non-EU work route." },
          { title: "People considering employment in Spain", text: "Use this if you are comparing options before committing to a move." },
          { title: "People already in Spain", text: "Use this if you are trying to understand whether a work-based route applies to your situation now." },
          { title: "Workers whose employer is helping with paperwork", text: "Use this if your employer is supporting part of the process." },
          { title: "People comparing employee, remote-work or self-employed routes", text: "Use this if you are unsure which route fits your situation." }
        ])}${InfoBox({ title: "Related roadmaps", text: "Self-employed people should use the future self-employed/autónomo roadmap. Digital nomads should use the future digital nomad roadmap once available." })}`
      }),
      GuideSection({
        id: "euCitizensWorking",
        title: "EU citizens working in Spain",
        children: `${Cards([
          { title: "Usually no visa needed", text: "EU, EEA and Swiss citizens do not usually need a visa to work in Spain." },
          { title: "EU registration if staying longer", text: "If staying longer than three months, EU Registration may apply." },
          { title: "Connected to Social Security, healthcare and tax", text: "Employment can affect Social Security, healthcare and tax obligations." },
          { title: "Keep your records", text: "Workers should keep contracts, payslips and Social Security records." }
        ])}${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Taxes in Spain Guide", href: routes.taxes }
        ])}`
      }),
      GuideSection({
        id: "nonEuCitizensWorking",
        title: "Non-EU citizens working in Spain",
        children: `${Cards([
          { title: "Correct route needed first", text: "Non-EU citizens usually need the correct work and residence route before working." },
          { title: "Different channels depending on route", text: "The process may involve an employer, consulate, immigration office or other official channel, depending on the route." },
          { title: "A job offer is not enough by itself", text: "A job offer alone does not automatically mean the person can work legally." },
          { title: "TIE may follow", text: "TIE may be required after approval or arrival." }
        ])}${SourceLinks([
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist }
        ])}`
      }),
      GuideSection({
        id: "beforeAcceptingOrStartingWork",
        title: "Before accepting or starting work",
        children: `${Cards([
          { title: "Identity", text: "A valid passport or national ID is usually central to the process." },
          { title: "Job offer or employment contract", text: "A job offer or employment contract is usually needed to support the route." },
          { title: "Qualification documents, if relevant", text: "Some roles may require recognised qualification documents." },
          { title: "Professional recognition documents, if relevant", text: "Some professions may require recognition of foreign qualifications." },
          { title: "Criminal record certificate, where required", text: "Some routes may ask for a criminal record certificate." },
          { title: "Healthcare documents, where required", text: "Some routes may ask for healthcare evidence." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." },
          { title: "NIE/TIE/residence documents, depending on route", text: "Identification and residence documents depend on your route and stage of the process." },
          { title: "Social Security registration, where applicable", text: "Social Security registration may be part of starting work." }
        ])}<p>Exact requirements depend on nationality, job type, employer and residence route.</p>`
      }),
      GuideSection({
        id: "employerRole",
        title: "Employer role",
        children: `${Cards([
          { title: "Employer may need to start or support the process", text: "In some work routes, the employer may need to start or support the process." },
          { title: "Social Security registration", text: "Employees are usually registered with Social Security by the employer once the employment relationship is valid." },
          { title: "Ask for confirmation", text: "Workers should ask for confirmation of registration and keep copies." },
          { title: "Still check official requirements", text: "Employer involvement does not remove the need to check official requirements yourself." }
        ])}`
      }),
      GuideSection({
        id: "socialSecurityHealthcareTaxes",
        title: "Social Security, healthcare and taxes",
        children: `${Cards([
          { title: "Often connected to Social Security", text: "Work in Spain is often connected to Social Security registration." },
          { title: "May connect to healthcare access", text: "Social Security can connect to public healthcare access, depending on your situation." },
          { title: "Tax obligations can arise", text: "Working in Spain can create Spanish tax obligations." },
          { title: "Tax residency is separate", text: "Tax residency is separate from immigration residency." },
          { title: "Review taxes early", text: "Review your tax position early rather than waiting until a deadline." }
        ])}${SourceLinks([
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Taxes in Spain Guide", href: routes.taxes }
        ])}`
      }),
      GuideSection({
        id: "tieBasicsForWorkers",
        title: "TIE basics for workers",
        children: `${Cards([
          { title: "Many non-EU workers need one", text: "Many non-EU workers may need a TIE after approval or arrival." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming a job offer automatically gives residence rights.",
        "Starting work before permission is clear.",
        "Confusing NIE and TIE.",
        "Confusing EU Registration with non-EU residence cards.",
        "Not checking employer responsibilities.",
        "Not keeping contract and Social Security proof.",
        "Ignoring tax residency.",
        "Assuming self-employed and employee routes are the same.",
        "Relying only on informal advice."
      ]),
      RealQuestions([
        { question: "Can I move to Spain for work?", answer: "Often yes, but the correct route depends on your nationality, job offer and situation. Check the official requirements that apply to your case." },
        { question: "Can EU citizens work in Spain without a visa?", answer: "Usually yes. EU, EEA and Swiss citizens do not usually need a visa to work, though EU Registration may apply if staying longer than three months." },
        { question: "Can non-EU citizens work in Spain with only a job offer?", answer: "Not by itself. A job offer usually needs to be supported by the correct work and residence authorisation before working legally." },
        { question: "Is NIE the same as permission to work?", answer: "No. NIE is an identification number. Permission to work depends on your residence and work authorisation, which is separate." },
        { question: "Do workers need a TIE?", answer: "Many non-EU workers may need a TIE after approval or arrival. Requirements depend on your route." },
        { question: "Does my employer register me with Social Security?", answer: "Employers usually handle this once the employment relationship is valid, but you should ask for confirmation and keep your own records." },
        { question: "Do I need healthcare before working?", answer: "It depends on your route and situation. Some healthcare evidence may be requested as part of certain procedures." },
        { question: "Will working in Spain affect my taxes?", answer: "It can. Working in Spain may create Spanish tax obligations, and tax residency is a separate question from immigration residency. Review your tax position early." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, contract, Social Security and tax documents so you can respond quickly once you know your exact route requirements.")}`
      })
    ]
  })
});

pages.push({
  route: routes.retireInSpain,
  html: GuideLayout({
    path: routes.retireInSpain,
    canonical: `https://iberigo.eu${routes.retireInSpain}`,
    altHref: retireInSpainPair.en.altHref,
    hreflangAlternates: retireInSpainPair.en.hreflangAlternates,
    title: "Retiring in Spain — IberiGo",
    description: "A practical roadmap for people planning to retire in Spain or live from sufficient resources, including documents, healthcare, tax considerations, EU registration, non-EU routes and common mistakes.",
    metadata: guideMetadataFor(routes.retireInSpain),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Retiring in Spain Roadmap" }],
    hero: {
      kicker: "Retirement and resources",
      title: "Retiring in Spain",
      intro: "A practical starting point for understanding how retirement, pensions, healthcare, sufficient resources and residence routes can fit together when moving to Spain.",
      asideTitle: "Not one process for every retiree",
      asideText: "Retirement and sufficient-resources routes can depend on your nationality, income, pension status, healthcare cover, family situation, assets, tax residence and where you apply."
    },
    sections: [
      QuickAnswer("People retiring in Spain may follow different routes depending on nationality and financial situation. EU citizens and non-EU citizens follow different processes. Healthcare cover and proof of resources are often important. Pension income, savings, investments and tax residency should be reviewed early. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal, tax or financial advice. Retirement and sufficient-resources routes can depend on your nationality, income, pension status, healthcare cover, family situation, assets, tax residence and where you apply. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Visa or authorisation?", "May be required for non-EU citizens, depending on nationality and route."],
        ["Same for everyone?", "No. EU and non-EU citizens follow different processes, and requirements vary by case."],
        ["Central factors", "Healthcare cover and proof of sufficient resources are often central to the process."],
        ["Non-EU retirees", "May eventually need a TIE after approval or arrival."],
        ["Professional advice", "May be useful, especially for pension, tax or cross-border financial questions."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "EU citizens retiring in Spain", text: "Use this if you are an EU, EEA or Swiss citizen planning to retire in Spain." },
          { title: "Non-EU citizens retiring in Spain", text: "Use this if you are a non-EU citizen considering retirement in Spain." },
          { title: "People living from pensions", text: "Use this if pension income supports your move." },
          { title: "People living from savings or investments", text: "Use this if savings or investment income supports your move." },
          { title: "People not planning to work in Spain", text: "Use this if you are not planning to take up employment in Spain." },
          { title: "Couples or families moving together", text: "Use this if you are moving with a spouse, partner or family." },
          { title: "People comparing routes", text: "Use this if you are comparing retirement, sufficient-resources or non-lucrative-type routes." }
        ])}${InfoBox({ title: "Related roadmaps", text: "People planning to work should use the Work in Spain Roadmap. Self-employed people should use the future self-employed/autónomo roadmap." })}`
      }),
      GuideSection({
        id: "euCitizensRetiring",
        title: "EU citizens retiring or living from resources",
        children: `${Cards([
          { title: "Usually no visa needed", text: "EU, EEA and Swiss citizens do not usually need a visa to move to Spain." },
          { title: "EU registration if staying longer", text: "If staying longer than three months, EU Registration may apply." },
          { title: "Resources and healthcare cover", text: "Retired or self-sufficient EU citizens may need to show sufficient resources and healthcare cover." },
          { title: "Depends on office and situation", text: "The exact evidence can depend on the office and personal situation." }
        ])}${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Taxes in Spain Guide", href: routes.taxes }
        ])}`
      }),
      GuideSection({
        id: "nonEuCitizensRetiring",
        title: "Non-EU citizens retiring in Spain",
        children: `${Cards([
          { title: "Correct route needed first", text: "Non-EU citizens usually need the correct visa or residence route before living in Spain long term." },
          { title: "Routes for self-sufficient applicants", text: "Some routes may be designed for people who can support themselves without working in Spain." },
          { title: "Different channels depending on route", text: "The process may involve a Spanish consulate, immigration authorities or other official channels, depending on the route." },
          { title: "TIE may follow", text: "A TIE may be required after approval or arrival." }
        ])}${SourceLinks([
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist }
        ])}`
      }),
      GuideSection({
        id: "beforeYouApplyOrMove",
        title: "Before you apply or move",
        children: `${Cards([
          { title: "Identity", text: "A valid passport or national ID is usually central to the application." },
          { title: "Pension documents", text: "Pension evidence may be needed depending on your route." },
          { title: "Proof of savings or regular income", text: "Some routes may require proof of savings or regular income." },
          { title: "Healthcare cover or S1, if applicable", text: "Healthcare cover or an S1 form may be relevant depending on your situation." },
          { title: "Civil-status documents, if moving with spouse or family", text: "Marriage or family documents may matter if moving together." },
          { title: "Accommodation planning", text: "Where you will live can affect padrón and other later steps." },
          { title: "Criminal record certificate, where required", text: "Some routes may ask for a criminal record certificate." },
          { title: "Medical certificate, where required", text: "Some routes may ask for a medical certificate." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." },
          { title: "Tax-residency review", text: "Reviewing your tax-residency position early can help you plan." }
        ])}<p>Exact requirements depend on nationality, residence route, income source and where the application is made.</p>`
      }),
      GuideSection({
        id: "healthcareForRetirees",
        title: "Healthcare for retirees",
        children: `${Cards([
          { title: "Often a key planning point", text: "Healthcare is often one of the most important planning points for retirees." },
          { title: "Pension-based or S1 routes", text: "Some retirees may use public healthcare routes, such as pension-based entitlement or S1 where applicable." },
          { title: "Private insurance may be needed", text: "Others may need private health insurance depending on route and situation." },
          { title: "Depends on the procedure", text: "Private insurance requirements can depend on the specific procedure." },
          { title: "Regional variation", text: "Regional health card procedures can vary." }
        ])}${WarningBox("Do not assume private health insurance always satisfies every route. Check the requirement for your specific procedure.")}${SourceLinks([
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Social Security in Spain Guide", href: routes.social }
        ])}`
      }),
      GuideSection({
        id: "taxesAndPensions",
        title: "Taxes and pensions",
        children: `${Cards([
          { title: "Can affect tax residency", text: "Moving to Spain can affect tax residency." },
          { title: "Different from immigration residency", text: "Tax residency is different from immigration residency." },
          { title: "Worldwide income may apply", text: "Spain may tax residents on worldwide income depending on circumstances." },
          { title: "Multiple income types to review", text: "Pensions, investment income, rental income and savings income should be reviewed." },
          { title: "Treaties may matter", text: "Double-taxation treaties may affect outcomes." }
        ])}${WarningBox("This is not country-specific pension tax advice. Get professional advice for your specific pension and tax situation.")}${SourceLinks([
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital }
        ])}`
      }),
      GuideSection({
        id: "accommodationAndPadron",
        title: "Accommodation and padrón",
        children: `${Cards([
          { title: "Stable address often needed", text: "Retirees often need a stable address for administrative steps." },
          { title: "Padrón for several purposes", text: "Padrón may be needed for healthcare, residence procedures and local services." },
          { title: "Varies by municipality", text: "Requirements vary by municipality." },
          { title: "Check before signing", text: "Before signing a rental contract, check whether the address can support padrón registration." }
        ])}${SourceLinks([
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron }
        ])}`
      }),
      GuideSection({
        id: "tieBasicsForRetirees",
        title: "TIE basics for non-EU retirees",
        children: `${Cards([
          { title: "Many non-EU residents need one", text: "Many non-EU residents may need a TIE after approval or arrival." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming owning property gives residence rights.",
        "Assuming pension income is automatically enough.",
        "Confusing immigration residency with tax residency.",
        "Ignoring healthcare requirements.",
        "Buying private insurance without checking route requirements.",
        "Assuming EU and non-EU retirees follow the same process.",
        "Preparing financial documents too late.",
        "Ignoring translations, legalisation or apostille.",
        "Relying only on informal advice."
      ]),
      RealQuestions([
        { question: "Can I retire in Spain?", answer: "Often yes, but the correct route depends on your nationality, income and situation. Check the official requirements that apply to your case." },
        { question: "Can EU citizens retire in Spain without a visa?", answer: "Usually yes. EU, EEA and Swiss citizens do not usually need a visa, though EU Registration may apply if staying longer than three months, along with evidence of resources and healthcare cover." },
        { question: "Can non-EU citizens retire in Spain?", answer: "Often yes, through a route designed for people who can support themselves, but exact requirements depend on nationality and situation. Check official requirements before assuming a specific route applies." },
        { question: "Does buying property give me residence rights?", answer: "No. Owning property in Spain does not by itself give residence rights. Residence still depends on the correct route and application." },
        { question: "Do retirees need private health insurance?", answer: "It depends on the route and situation. Some retirees may use pension-based or S1 healthcare routes; others may need private insurance. Check the requirement for your specific procedure." },
        { question: "What is an S1 form?", answer: "An S1 is a form that may allow certain people, often pensioners covered by another EU/EEA country, to register healthcare entitlement in Spain. Eligibility depends on your situation." },
        { question: "Will Spain tax my pension?", answer: "It may, depending on your tax residency, the pension type and any applicable tax treaty. This is not tax advice — get professional advice for your specific situation." },
        { question: "Do non-EU retirees need a TIE?", answer: "Many non-EU residents may need a TIE after approval or arrival. Requirements depend on your route." }
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
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, pension, financial and translated documents so you can respond quickly once you know your exact route requirements.")}`
      })
    ]
  })
});

pages.push({
  route: routes.familyReunification,
  html: GuideLayout({
    path: routes.familyReunification,
    canonical: `https://iberigo.eu${routes.familyReunification}`,
    title: "Family Reunification in Spain — IberiGo",
    description: "A practical roadmap for people joining family in Spain, including relationship documents, eligibility basics, residence routes, TIE basics and common mistakes.",
    metadata: guideMetadataFor(routes.familyReunification),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Family Reunification Roadmap" }],
    hero: {
      kicker: "Family-based residence route",
      title: "Family Reunification in Spain",
      intro: "A practical starting point for understanding family-based residence routes, what you may need to prepare, and how this differs from the EU family member route.",
      asideTitle: "Not the EU family member route",
      asideText: "Family reunification and family-based residence rules can depend on nationality, relationship type, residence status of the sponsor, income, housing, documents, dependency and where the application is made."
    },
    sections: [
      QuickAnswer("Some people may be able to join family in Spain through a family reunification or family-based residence route. The correct route depends on the family relationship and the residence status of the person already in Spain. This is not the same as the Family Member of an EU Citizen route. Relationship documents, legalisation, translation and proof of circumstances can be central. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal advice. Family reunification and family-based residence rules can depend on nationality, relationship type, residence status of the sponsor, income, housing, documents, dependency and where the application is made. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Who this may apply to", "Non-EU family members joining a non-EU resident sponsor in Spain."],
        ["Same as EU family route?", "No. This is a separate route from Family Member of an EU Citizen."],
        ["Central factors", "The relationship to the sponsor and the sponsor's residence status in Spain."],
        ["Usual result", "Many applicants eventually receive a residence document or card, depending on the route."],
        ["Professional advice", "May be useful, especially for less common relationships or complex situations."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Non-EU family members joining a non-EU resident in Spain", text: "Use this if you are joining a family member who is already a non-EU resident in Spain." },
          { title: "Spouses or partners, where recognised", text: "Use this if your relationship may be recognised under a family-based route." },
          { title: "Children, where applicable", text: "Use this if children may be included in a family application." },
          { title: "Dependent relatives, where applicable", text: "Use this if a dependent relative's situation may support a family-based case." },
          { title: "People already in Spain", text: "Use this if you are trying to understand whether a family-based option applies to your situation now." },
          { title: "Sponsors in Spain", text: "Use this if you are the resident sponsor trying to understand what may be involved." }
        ])}${InfoBox({ title: "Family members of EU citizens", text: "Family members of EU citizens should use the Family Member of an EU Citizen Roadmap instead — that is a separate, different route." })}`
      }),
      GuideSection({
        id: "familyReunificationVsEuFamilyMember",
        title: "Family reunification vs EU family member route",
        children: `<table class="guide-table"><tbody>
          <tr><th>Route</th><td><strong>What to know</strong></td></tr>
          <tr><th>Family reunification</th><td>Usually connected to joining a resident sponsor in Spain. May involve sponsor requirements, and income, housing or residence-status checks. The procedure depends on the family relationship and the sponsor's status.</td></tr>
          <tr><th>Family Member of an EU Citizen</th><td>Connected to an EU citizen's free-movement/family-member route. Different rules and documents may apply. Use the separate <a href="${routes.euFamilyMemberRoadmap}">Family Member of an EU Citizen Roadmap</a> for this route.</td></tr>
        </tbody></table>${WarningBox("Do not assume these two routes are interchangeable. Confirm which one applies to your situation before preparing documents.")}`
      }),
      GuideSection({
        id: "relationshipAndSponsorBasics",
        title: "Relationship and sponsor basics",
        children: `${Cards([
          { title: "Relationship to the sponsor matters", text: "The relationship to the sponsor matters for which route may apply." },
          { title: "Sponsor's residence status matters", text: "The sponsor's residence status in Spain can matter to the case." },
          { title: "Different evidence by relationship", text: "Spouses, partners, children and dependent relatives may have different evidence requirements." },
          { title: "Housing, income or dependency evidence", text: "Housing, income or dependency evidence may be relevant depending on the route." }
        ])}${WarningBox("This page does not provide a definitive eligibility list. Check the official requirements for your specific relationship and situation before assuming you qualify.")}`
      }),
      GuideSection({
        id: "beforeYouApplyOrMove",
        title: "Before you apply or move",
        children: `${Cards([
          { title: "Identity", text: "A valid passport is usually central to the application." },
          { title: "Proof of relationship", text: "Marriage certificate, partnership certificate or birth certificate may be needed, depending on the relationship." },
          { title: "Sponsor's residence documents", text: "The sponsor's residence documents may be requested." },
          { title: "Sponsor's identity documents", text: "The sponsor's identity documents may be requested." },
          { title: "Proof of address or housing, where required", text: "Housing evidence may be part of the file, depending on the office." },
          { title: "Income or employment evidence, where required", text: "Some cases may require income or employment evidence." },
          { title: "Healthcare documents, where required", text: "Some cases may require healthcare evidence." },
          { title: "Criminal record certificate, where required", text: "Some routes may ask for a criminal record certificate." },
          { title: "Medical certificate, where required", text: "Some routes may ask for a medical certificate." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." }
        ])}<p>Exact requirements depend on the relationship, sponsor status, nationality, document country of issue and procedure. Use the <a href="${routes.checklist}">Documents Checklist</a> as a general starting point, then confirm the exact list for your specific case.</p>`
      }),
      GuideSection({
        id: "whereTheProcessMayStart",
        title: "Where the process may start",
        children: `${Cards([
          { title: "Some steps may happen in Spain first", text: "Some family-based routes may involve steps in Spain before the family member travels." },
          { title: "Some steps may involve a consulate", text: "Some steps may involve a Spanish consulate." },
          { title: "Depends on current situation", text: "Some situations may depend on whether the family member is already in Spain." },
          { title: "Not covered here", text: "This roadmap does not give route-specific instructions. The correct path depends on the residence route and legal situation — check the official requirements that apply to your case." }
        ])}`
      }),
      GuideSection({
        id: "afterApprovalOrArrival",
        title: "After approval or arrival",
        children: `${Cards([
          { title: "Travel to Spain, if applicable", text: "Some routes require approval before travel; others may not." },
          { title: "Secure accommodation", text: "Your address may affect padrón, healthcare and other later steps." },
          { title: "Register on the padrón, where possible", text: "Padrón requirements can vary by municipality." },
          { title: "Arrange healthcare if needed", text: "Healthcare routes can depend on the family member's and sponsor's situation." },
          { title: "Apply for or collect TIE where required", text: "Many cases involve a fingerprinting or card-collection appointment." },
          { title: "Keep copies of approvals and notifications", text: "Keep copies of all approvals and official notifications." },
          { title: "Review tax, school or local registration needs if relevant", text: "Other administrative needs may follow, depending on your situation." }
        ])}${InfoBox({ title: "Order can vary", text: "Not everyone follows the same order. Do not assume the same sequence or timing applies to every family." })}`
      }),
      GuideSection({
        id: "tieBasics",
        title: "TIE basics",
        children: `${Cards([
          { title: "Many non-EU family members need one", text: "Many non-EU family members may need a TIE after approval or arrival." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming marriage automatically gives residence rights.",
        "Confusing family reunification with the EU family member route.",
        "Confusing NIE and TIE.",
        "Not preparing legalised or translated documents early.",
        "Ignoring sponsor requirements.",
        "Assuming every family relationship qualifies.",
        "Relying only on informal advice.",
        "Missing official notifications.",
        "Assuming rules are the same in every case."
      ]),
      RealQuestions([
        { question: "Can I bring my spouse to Spain?", answer: "Often yes, through a family-based route, but it depends on your relationship, the sponsor's residence status, and the documents available. Check the official requirements for your case." },
        { question: "Is family reunification the same as the EU family member route?", answer: "No. Family reunification is generally connected to joining a non-EU resident sponsor. The Family Member of an EU Citizen route is a separate, different process — check which one applies to your situation." },
        { question: "Does marriage automatically give residence?", answer: "No. Marriage may support eligibility, but residence still depends on the application, evidence and approval." },
        { question: "Can children join family in Spain?", answer: "Often yes, depending on the relationship and route, but requirements vary by case. Check the official requirements that apply." },
        { question: "Do family members need a TIE?", answer: "Many non-EU family members may need a TIE after approval or arrival. Requirements depend on your route." },
        { question: "Is NIE the same as residence?", answer: "No. NIE is an identification number. Residence is a separate status, usually evidenced by a residence card or document." },
        { question: "Do documents need translation or apostille?", answer: "Some foreign documents may need official translation, legalisation or apostille, depending on the document and country of issue. Check before applying." },
        { question: "What if the family member is already in Spain?", answer: "Use Start Here and this roadmap together to understand which route may apply, and check official requirements before assuming a specific process fits your situation." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Family Member of an EU Citizen Roadmap", href: routes.euFamilyMemberRoadmap },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Finding Accommodation Guide", href: routes.accommodation },
          { label: "View the Padrón Guide", href: routes.padron },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, relationship, sponsor and translated documents so you can respond quickly once you know your exact case requirements.")}`
      })
    ]
  })
});

pages.push({
  route: routes.digitalNomad,
  html: GuideLayout({
    path: routes.digitalNomad,
    canonical: `https://iberigo.eu${routes.digitalNomad}`,
    title: "Digital Nomad Visa and Remote Work in Spain — IberiGo",
    description: "A practical roadmap for remote workers and digital nomads considering Spain, including eligibility basics, documents, taxes, healthcare, TIE basics and common mistakes.",
    metadata: guideMetadataFor(routes.digitalNomad),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Digital Nomad Roadmap" }],
    hero: {
      kicker: "Remote work route",
      title: "Digital Nomad Visa and Remote Work in Spain",
      intro: "A practical starting point for understanding remote-work routes, what you may need to prepare, and which issues to check before moving to Spain.",
      asideTitle: "Not automatic for every remote worker",
      asideText: "Digital nomad and remote-work rules can depend on your nationality, employer or client structure, income, tax residence, documents, healthcare cover, family situation and where you apply."
    },
    sections: [
      QuickAnswer("Spain has routes that may apply to some remote workers or digital nomads. The correct path depends on nationality, work structure, employer/client location, income and documents. Remote work is not the same as ordinary employment in Spain. Tax residency and Spanish tax obligations should be reviewed early. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal, tax or financial advice. Digital nomad and remote-work rules can depend on your nationality, employer or client structure, income, tax residence, documents, healthcare cover, family situation and where you apply. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["Who this may apply to", "Some non-EU remote workers, digital nomads, freelancers and employees working for a foreign employer or clients."],
        ["Automatic?", "No. Remote work does not by itself allow residence in Spain."],
        ["Central factors", "Work structure, income source, nationality and tax situation."],
        ["Non-EU digital nomads", "May eventually need a TIE after approval or arrival."],
        ["Professional advice", "May be useful, especially for tax and Social Security questions."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Non-EU remote workers", text: "Use this if you work remotely and are considering Spain as a non-EU citizen." },
          { title: "Digital nomads", text: "Use this if you work location-independently for foreign employers or clients." },
          { title: "Freelancers with foreign clients", text: "Use this if you invoice clients outside Spain." },
          { title: "Employees working remotely for a foreign employer", text: "Use this if your employer is based outside Spain." },
          { title: "People comparing routes", text: "Use this if you are comparing digital nomad, work and self-employed routes." },
          { title: "People already in Spain", text: "Use this if you are trying to understand whether a remote-work route applies to your situation now." }
        ])}${InfoBox({ title: "Related roadmaps", text: "People employed by a Spanish company should use the Work in Spain Roadmap. People planning to run a Spanish self-employed activity should use the future Self-employed / Autónomo roadmap." })}`
      }),
      GuideSection({
        id: "digitalNomadVsEmployeeVsSelfEmployed",
        title: "Digital nomad vs employee vs self-employed route",
        children: `<table class="guide-table"><tbody>
          <tr><th>Route</th><td><strong>What to know</strong></td></tr>
          <tr><th>Digital nomad / remote-work route</th><td>May apply to some people working remotely for foreign employers or clients. Requirements depend on work structure and official rules. Tax and immigration review is important.</td></tr>
          <tr><th>Employee route</th><td>Usually connected to employment in Spain. May involve employer-side processes. Use the <a href="${routes.workInSpain}">Work in Spain Roadmap</a>.</td></tr>
          <tr><th>Self-employed / autónomo route</th><td>Usually connected to independent economic activity in Spain. Tax and Social Security setup can be complex. Use the <a href="${routes.selfEmployed}">Self-Employed Roadmap</a>.</td></tr>
        </tbody></table>${WarningBox("Do not assume these routes are interchangeable. Confirm which one matches your actual work structure before applying.")}`
      }),
      GuideSection({
        id: "beforeYouApplyOrMove",
        title: "Before you apply or move",
        children: `${Cards([
          { title: "Identity", text: "A valid passport is usually central to the application." },
          { title: "Employment or client contracts, where relevant", text: "Employment contracts or client contracts may support the application." },
          { title: "Proof of remote work", text: "Evidence that your work is genuinely remote may be requested." },
          { title: "Proof of income, where required", text: "Some routes may require proof of income." },
          { title: "Company or business documents, where relevant", text: "Business documents may be requested for freelancers or business owners." },
          { title: "Professional qualifications, where relevant", text: "Some roles may require recognised qualification documents." },
          { title: "Healthcare cover", text: "Healthcare cover may be required depending on your route." },
          { title: "Criminal record certificate, where required", text: "Some routes may ask for a criminal record certificate." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." },
          { title: "Tax review before moving", text: "Reviewing your tax situation before moving can help you plan." }
        ])}<p>Exact requirements depend on nationality, work structure, income source and where the application is made. Use the <a href="${routes.checklist}">Documents Checklist</a> as a general starting point, then confirm the exact list for your specific case.</p>`
      }),
      GuideSection({
        id: "employerClientsWorkStructure",
        title: "Employer, clients and work structure",
        children: `${Cards([
          { title: "Different possible situations", text: "Remote workers may have different situations: employee, contractor, freelancer or business owner." },
          { title: "Affects immigration, tax and Social Security", text: "The work structure can affect immigration, tax and Social Security questions." },
          { title: "Not automatically eligible", text: "A foreign employer or foreign clients do not automatically guarantee eligibility." },
          { title: "Verify your structure matches the route", text: "Users should verify whether their work structure matches the official route before applying." }
        ])}`
      }),
      GuideSection({
        id: "taxesAndRemoteWork",
        title: "Taxes and remote work",
        children: `${Cards([
          { title: "Can affect tax residency", text: "Moving to Spain can affect tax residency." },
          { title: "Different from immigration residency", text: "Tax residency is different from immigration residency." },
          { title: "Worldwide income may apply", text: "Spain may tax residents on worldwide income depending on circumstances." },
          { title: "Several issues to review", text: "Remote workers should review income tax, social contributions, invoicing and foreign income issues." },
          { title: "Check special tax treatment with a professional", text: "Any special tax treatment should be checked with a qualified adviser." }
        ])}${WarningBox("Do not treat any tax benefit as guaranteed. Tax outcomes depend on your specific circumstances and should be checked with a qualified adviser.")}<p>Use the <a href="${routes.taxes}">Taxes in Spain Guide</a> for a plain-English starting point.</p>`
      }),
      GuideSection({
        id: "healthcareAndSocialSecurity",
        title: "Healthcare and Social Security",
        children: `${Cards([
          { title: "Depends on route and structure", text: "Healthcare requirements can depend on route, work structure and nationality." },
          { title: "Private insurance may be needed", text: "Some remote workers may need private insurance." },
          { title: "Social Security varies", text: "Social Security treatment may depend on work structure and applicable rules." },
          { title: "Not treated the same", text: "Employees, freelancers and business owners may not be treated the same." }
        ])}${SourceLinks([
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Social Security in Spain Guide", href: routes.social }
        ])}`
      }),
      GuideSection({
        id: "tieBasicsForDigitalNomads",
        title: "TIE basics for digital nomads",
        children: `${Cards([
          { title: "Many non-EU residents need one", text: "Many non-EU residents may need a TIE after approval or arrival." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming remote work automatically gives residence rights.",
        "Assuming tourist status is enough for long-term remote work.",
        "Confusing digital nomad, employee and self-employed routes.",
        "Ignoring tax residency.",
        "Assuming tax benefits are automatic.",
        "Not checking Social Security implications.",
        "Confusing NIE and TIE.",
        "Preparing contracts or income documents too late.",
        "Relying only on informal advice."
      ]),
      RealQuestions([
        { question: "Can I move to Spain as a digital nomad?", answer: "It may be possible, depending on your nationality, work structure and income. Check the official requirements before assuming a specific route applies." },
        { question: "Is remote work the same as working for a Spanish employer?", answer: "No. Remote work for a foreign employer or foreign clients is treated differently from ordinary employment with a Spanish company. Use the Work in Spain Roadmap if you have a Spanish employer." },
        { question: "Can I work remotely from Spain as a tourist?", answer: "Tourist status is generally not enough for long-term remote work residence. Check the official requirements for the route that matches your situation." },
        { question: "Do digital nomads need a TIE?", answer: "Many non-EU residents may need a TIE after approval or arrival. Requirements depend on your route." },
        { question: "Is NIE the same as permission to live or work?", answer: "No. NIE is an identification number. Permission to live or work depends on your residence and work authorisation, which is separate." },
        { question: "Will Spain tax my foreign income?", answer: "It may, depending on your tax residency and circumstances. This is not tax advice — get professional advice for your specific situation." },
        { question: "Do I need private health insurance?", answer: "It depends on your route and work structure. Some remote workers may need private insurance; others may use another healthcare route." },
        { question: "Should I speak with a tax adviser?", answer: "Often yes, especially if you have foreign income, multiple clients, or an unclear work structure. Professional advice may be useful before you commit to a route." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Work in Spain Roadmap", href: routes.workInSpain },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Opening a Bank Account Guide", href: routes.banking },
          { label: "View the Settling Into Spain Guide", href: routes.settling }
        ])}${TipBox("Keep a folder for identity, contracts, income and tax documents so you can respond quickly once you know your exact route requirements.")}`
      })
    ]
  })
});

pages.push({
  route: routes.selfEmployed,
  html: GuideLayout({
    path: routes.selfEmployed,
    canonical: `https://iberigo.eu${routes.selfEmployed}`,
    altHref: selfEmployedPair.en.altHref,
    hreflangAlternates: selfEmployedPair.en.hreflangAlternates,
    title: "Self-Employed and Autónomo in Spain — IberiGo",
    description: "A practical roadmap for people considering self-employment in Spain, including autónomo basics, documents, tax, Social Security, healthcare, non-EU routes and common mistakes.",
    metadata: guideMetadataFor(routes.selfEmployed),
    breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "Self-Employed Roadmap" }],
    hero: {
      kicker: "Self-employment route",
      title: "Self-Employed and Autónomo in Spain",
      intro: "A practical starting point for understanding self-employment in Spain, what you may need to prepare, and which tax, Social Security and residence questions to check early.",
      asideTitle: "Not automatic for everyone",
      asideText: "Self-employment rules can depend on your nationality, residence status, business activity, income, clients, tax situation, Social Security registration and where you apply."
    },
    sections: [
      QuickAnswer("Self-employment in Spain is often connected to autónomo registration, tax obligations and Social Security. EU citizens and non-EU citizens may face different residence questions. Non-EU citizens usually need the correct residence/work route before carrying out self-employed activity. Autónomo registration is not the same as immigration permission. This roadmap helps you understand the general journey — it does not replace official requirements."),
      GuideSection({
        id: "importantNote",
        title: "Important note",
        children: `${WarningBox("This guide provides general information only and is not legal, tax, immigration or financial advice. Self-employment rules can depend on your nationality, residence status, business activity, income, clients, tax situation, Social Security registration and where you apply. Always check the official requirements for your specific case before making decisions.")}`
      }),
      AtAGlance([
        ["What autónomo usually means", "Self-employed status in Spain, connected to tax and Social Security registration."],
        ["Same for everyone?", "No. EU and non-EU citizens face different residence questions, and requirements vary by case."],
        ["Automatic residence?", "No. Autónomo registration is not the same as immigration permission."],
        ["Non-EU self-employed", "May eventually need a TIE after approval or arrival."],
        ["Professional advice", "May be useful — many people use a gestor or professional adviser."]
      ]),
      GuideSection({
        id: "whoThisRoadmapIsFor",
        title: "Who this roadmap is for",
        children: `${Cards([
          { title: "Freelancers", text: "Use this if you invoice clients as an independent professional." },
          { title: "Contractors", text: "Use this if you work on a contract basis rather than as an employee." },
          { title: "Sole traders", text: "Use this if you run an individual business activity." },
          { title: "Small business owners", text: "Use this if you are setting up or running a small business in Spain." },
          { title: "EU citizens planning self-employment", text: "Use this if you are an EU, EEA or Swiss citizen considering self-employment in Spain." },
          { title: "Non-EU citizens considering self-employment", text: "Use this if you are a non-EU citizen exploring the self-employed route." },
          { title: "Remote workers comparing routes", text: "Use this if you are comparing self-employed and digital nomad routes." },
          { title: "People already in Spain", text: "Use this if you are trying to understand autónomo basics for your current situation." }
        ])}${InfoBox({ title: "Related roadmaps", text: "People employed by a Spanish company should use the Work in Spain Roadmap. Remote workers with foreign employers or clients should also compare the Digital Nomad Roadmap." })}`
      }),
      GuideSection({
        id: "autonomoBasics",
        title: "Autónomo basics",
        children: `${Cards([
          { title: "What autónomo usually means", text: "Autónomo usually refers to self-employed status in Spain." },
          { title: "Tax and Social Security registration", text: "It can involve tax registration and Social Security registration." },
          { title: "Ongoing obligations", text: "It may involve invoices, quarterly filings, contributions and record-keeping." },
          { title: "Depends on activity and circumstances", text: "The exact obligations depend on activity and circumstances." },
          { title: "Many people use a gestor", text: "Many people use a gestor or professional adviser to help manage this." }
        ])}`
      }),
      GuideSection({
        id: "euCitizensSelfEmployment",
        title: "EU citizens and self-employment",
        children: `${Cards([
          { title: "Usually no visa needed", text: "EU, EEA and Swiss citizens do not usually need a visa to move to Spain." },
          { title: "EU registration if staying longer", text: "If staying longer than three months, EU Registration may apply." },
          { title: "Self-employment as one route", text: "Self-employment can be one route for EU registration, but supporting evidence may be required." },
          { title: "Review tax and Social Security early", text: "Tax and Social Security obligations should be reviewed early." }
        ])}${SourceLinks([
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the EU Registration Guide", href: routes.euRegistration },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Taxes in Spain Guide", href: routes.taxes }
        ])}`
      }),
      GuideSection({
        id: "nonEuCitizensSelfEmployment",
        title: "Non-EU citizens and self-employment",
        children: `${Cards([
          { title: "Correct route needed first", text: "Non-EU citizens usually need the correct residence/work route before carrying out self-employed activity in Spain." },
          { title: "May involve a business plan", text: "The process may involve a business plan, professional documents, authorisation or consular steps depending on route." },
          { title: "Not permission by itself", text: "Autónomo registration alone should not be treated as permission to live or work." },
          { title: "TIE may follow", text: "A TIE may be required after approval or arrival." }
        ])}${SourceLinks([
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Digital Nomad Roadmap", href: routes.digitalNomad },
          { label: "View the Documents Checklist", href: routes.checklist }
        ])}`
      }),
      GuideSection({
        id: "beforeYouStart",
        title: "Before you start",
        children: `${Cards([
          { title: "Identity", text: "A valid passport or national ID is usually central to the process." },
          { title: "Residence or work authorisation, depending on route", text: "Residence or work authorisation documents may be needed, depending on your route." },
          { title: "NIE or TIE, depending on situation", text: "NIE or TIE requirements depend on your situation." },
          { title: "Business plan, where required", text: "A business plan may be required for some routes." },
          { title: "Professional qualifications, where relevant", text: "Some activities may require recognised qualification documents." },
          { title: "Client contracts or expected-income evidence, where relevant", text: "Some routes may ask for client contracts or expected-income evidence." },
          { title: "Tax-registration information", text: "Tax-registration information is usually part of starting activity." },
          { title: "Social Security registration", text: "Social Security registration is usually part of starting activity." },
          { title: "Healthcare planning", text: "Healthcare planning should be reviewed alongside your route." },
          { title: "Translations, legalisation or apostille, where required", text: "Some foreign documents may need official translation, legalisation or apostille." }
        ])}<p>Exact requirements depend on nationality, residence status, business activity and route.</p>`
      }),
      GuideSection({
        id: "taxesInvoicesRecords",
        title: "Taxes, invoices and records",
        children: `${Cards([
          { title: "Spanish tax obligations may apply", text: "Self-employed people may have Spanish tax obligations." },
          { title: "Registration, invoicing, declarations, records", text: "These may include registration, invoicing, declarations and record-keeping." },
          { title: "Depends on activity", text: "VAT/IVA, income tax and other obligations can depend on activity." },
          { title: "Tax residency is separate", text: "Tax residency is different from immigration residency." },
          { title: "A tax adviser may be useful", text: "A tax adviser or gestor may be useful for your specific situation." }
        ])}${WarningBox("This is not exact filing guidance. Get professional advice for your specific tax and invoicing obligations.")}${SourceLinks([
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital }
        ])}`
      }),
      GuideSection({
        id: "socialSecurityAndHealthcare",
        title: "Social Security and healthcare",
        children: `${Cards([
          { title: "Often connected to Social Security", text: "Self-employment is often connected to Social Security registration." },
          { title: "May affect healthcare and benefits", text: "Social Security contributions may affect healthcare access and benefits." },
          { title: "Depends on situation and route", text: "Healthcare access depends on situation and route." },
          { title: "Keep the concepts separate", text: "Do not confuse Social Security number with NIE, TIE or healthcare card." }
        ])}${SourceLinks([
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare }
        ])}`
      }),
      GuideSection({
        id: "digitalCertificateAndAdministration",
        title: "Digital Certificate and administration",
        children: `${Cards([
          { title: "Online administration is common", text: "Many self-employed people need to deal with online administration." },
          { title: "Digital Certificate or Cl@ve can help", text: "Digital Certificate or Cl@ve can help with tax and Social Security procedures." },
          { title: "Not everything is online", text: "Not every process is identical or fully online." },
          { title: "Keep records", text: "Keep official notifications and records." }
        ])}<p>Use the <a href="${routes.digital}">Digital Certificate and Cl@ve Guide</a> to compare the two systems.</p>`
      }),
      GuideSection({
        id: "tieBasicsForSelfEmployed",
        title: "TIE basics for non-EU self-employed people",
        children: `${Cards([
          { title: "Many non-EU residents need one", text: "Many non-EU residents may need a TIE after approval or arrival." },
          { title: "Not the same as NIE", text: "TIE is not the same as NIE." },
          { title: "Not the same as EU Registration", text: "TIE is not the same as EU Registration." },
          { title: "Appointments and collection", text: "TIE procedures can involve appointments, fingerprints and collection." },
          { title: "Depends on your case", text: "Details depend on approval, route and local procedure." }
        ])}${WarningBox("Do not confuse TIE, NIE and EU Registration. Confirm which document applies to your situation before an appointment.")}`
      }),
      CommonMistakes([
        "Assuming autónomo registration automatically gives residence rights.",
        "Confusing self-employed, employee and digital nomad routes.",
        "Starting activity before permission is clear.",
        "Ignoring tax registration.",
        "Ignoring Social Security obligations.",
        "Confusing NIE and TIE.",
        "Underestimating record-keeping.",
        "Relying only on informal advice.",
        "Waiting until tax or Social Security deadlines are urgent."
      ]),
      RealQuestions([
        { question: "What does autónomo mean?", answer: "Autónomo usually refers to self-employed status in Spain, generally connected to tax and Social Security registration. Exact obligations depend on your activity." },
        { question: "Can foreigners become self-employed in Spain?", answer: "Often yes, but the correct route depends on your nationality and residence status. Check the official requirements for your case." },
        { question: "Can non-EU citizens register as autónomo?", answer: "It depends on having the correct residence/work route first. Autónomo registration alone should not be treated as permission to live or work." },
        { question: "Is autónomo the same as permission to live in Spain?", answer: "No. Autónomo is a tax and Social Security registration status. It is not the same as immigration permission." },
        { question: "Do self-employed people pay Social Security?", answer: "Self-employment is often connected to Social Security registration and contributions, but exact obligations depend on your situation." },
        { question: "Do I need a gestor?", answer: "Not everyone does, but many self-employed people use a gestor or tax adviser to manage registration, filings and contributions." },
        { question: "Is NIE the same as TIE?", answer: "No. NIE is an identification number. TIE is a physical foreigner identity card. They are not the same document." },
        { question: "Should I choose digital nomad or self-employed route?", answer: "It depends on your work structure, clients and situation. Compare the Digital Nomad Roadmap and this roadmap, and check official requirements before deciding." }
      ]),
      GuideSection({
        id: "whatHappensNext",
        title: "Your Next Step",
        children: `${SourceLinks([
          { label: "View Start Here", href: routes.startHere },
          { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
          { label: "View the Non-EU Citizen Roadmap", href: routes.nonEuRoadmap },
          { label: "View the Digital Nomad Roadmap", href: routes.digitalNomad },
          { label: "View the Work in Spain Roadmap", href: routes.workInSpain },
          { label: "View the Documents Checklist", href: routes.checklist },
          { label: "View the Social Security in Spain Guide", href: routes.social },
          { label: "View the Taxes in Spain Guide", href: routes.taxes },
          { label: "View the Digital Certificate and Cl@ve Guide", href: routes.digital },
          { label: "View the Healthcare in Spain Guide", href: routes.healthcare }
        ])}${TipBox("Keep a folder for identity, business, tax and Social Security documents so you can respond quickly once you know your exact route requirements.")}`
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
