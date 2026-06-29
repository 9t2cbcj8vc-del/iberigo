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
  continueJourney,
  relatedGuides,
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
    ].filter(Boolean),
    continueJourney,
    relatedGuides
  });
}

const commonRelated = [
  { label: "View the Documents Checklist", href: routes.checklist, description: "Prepare the paperwork folder before appointments." },
  { label: "View the Healthcare Guide", href: routes.healthcare, description: "Understand healthcare before registration or residence steps." },
  { label: "View the Banking Guide", href: routes.banking, description: "Set up everyday payments in Spain." }
];

const relatedByRoute = {
  [routes.padron]: [
    { label: "View the Accommodation Guide", href: routes.accommodation, description: "Understand how your address affects later steps." },
    { label: "View the Healthcare Guide", href: routes.healthcare, description: "Use your local setup to plan healthcare access." },
    { label: "View the EU Registration Guide", href: routes.euRegistration, description: "Prepare the residence registration step if it applies." }
  ],
  [routes.healthcare]: [
    { label: "View the Social Security Guide", href: routes.social, description: "Understand how work registration can connect to healthcare." },
    { label: "View the EU Citizen Roadmap", href: routes.euRoadmap, description: "See where healthcare sits in the wider moving order." },
    { label: "View the Documents Checklist", href: routes.checklist, description: "Keep healthcare proof with your core paperwork." }
  ],
  [routes.checklist]: [
    { label: "View the Padrón Guide", href: routes.padron, description: "Prepare address evidence for local registration." },
    { label: "View the Healthcare Guide", href: routes.healthcare, description: "Prepare healthcare proof where relevant." },
    { label: "View the EU Registration Guide", href: routes.euRegistration, description: "Use route-specific evidence for EU registration." }
  ],
  [routes.banking]: [
    { label: "View the Digital Certificate Guide", href: routes.digital, description: "Set up online access for later administration." },
    { label: "View the Taxes Guide", href: routes.taxes, description: "Understand tax basics before deadlines arrive." },
    { label: "View the Accommodation Guide", href: routes.accommodation, description: "Use address documents for banking preparation." },
    { label: "View the Padrón Guide", href: routes.padron, description: "Prepare address evidence that banks may ask for." }
  ],
  [routes.digital]: [
    { label: "View the Social Security Guide", href: routes.social, description: "Use digital access for some Social Security services." },
    { label: "View the Taxes Guide", href: routes.taxes, description: "Digital access can help with tax services." },
    { label: "View the Banking Guide", href: routes.banking, description: "Use banking and phone access alongside public-service logins." },
    { label: "View the Documents Checklist", href: routes.checklist, description: "Keep identity documents ready." }
  ],
  [routes.social]: [
    { label: "View the Healthcare Guide", href: routes.healthcare, description: "Social Security can connect to healthcare access." },
    { label: "View the Banking Guide", href: routes.banking, description: "Work and salary setup often needs banking." },
    { label: "View the Taxes Guide", href: routes.taxes, description: "Work can create tax questions." }
  ],
  [routes.taxes]: [
    { label: "View the Banking Guide", href: routes.banking, description: "Keep financial records organized." },
    { label: "View the Digital Certificate Guide", href: routes.digital, description: "Digital access can help with tax services." },
    { label: "View the Social Security Guide", href: routes.social, description: "Work registration and tax questions often connect." }
  ],
  [routes.driving]: [
    { label: "View the Accommodation Guide", href: routes.accommodation, description: "Location can affect whether you need a car." },
    { label: "View the Documents Checklist", href: routes.checklist, description: "Keep licence and identity documents together." },
    { label: "View the Taxes Guide", href: routes.taxes, description: "Review resident-life obligations after moving." }
  ],
  [routes.accommodation]: [
    { label: "View the Padrón Guide", href: routes.padron, description: "Your address may be needed for town hall registration." },
    { label: "View the Banking Guide", href: routes.banking, description: "Rent and utilities usually need payment setup." },
    { label: "View the Healthcare Guide", href: routes.healthcare, description: "Address and local setup can matter for healthcare." }
  ]
};

function guideMetadataFor(route) {
  const continueByRoute = {
    [routes.euRoadmap]: [
      { label: "View the Padrón Guide", href: routes.padron },
      { label: "View the Healthcare Guide", href: routes.healthcare },
      { label: "View the EU Registration Guide", href: routes.euRegistration }
    ],
    [routes.euRegistration]: [
      { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
      { label: "View the Healthcare Guide", href: routes.healthcare },
      { label: "View the Social Security Guide", href: routes.social }
    ],
    [routes.padron]: [
      { label: "View the EU Registration Guide", href: routes.euRegistration },
      { label: "View the Healthcare Guide", href: routes.healthcare },
      { label: "View the Bank Account Guide", href: routes.banking },
      { label: "View the Digital Certificate Guide", href: routes.digital }
    ],
    [routes.healthcare]: [
      { label: "View the EU Registration Guide", href: routes.euRegistration },
      { label: "View the Bank Account Guide", href: routes.banking },
      { label: "View the Digital Certificate Guide", href: routes.digital },
      { label: "View the Taxes Guide", href: routes.taxes }
    ],
    [routes.banking]: [
      { label: "View the Digital Certificate Guide", href: routes.digital },
      { label: "View the Taxes Guide", href: routes.taxes },
      { label: "View the Accommodation Guide", href: routes.accommodation }
    ],
    [routes.digital]: [
      { label: "View the Taxes Guide", href: routes.taxes },
      { label: "View the Social Security Guide", href: routes.social },
      { label: "View the Documents Checklist", href: routes.checklist }
    ],
    [routes.taxes]: [
      { label: "View the Digital Certificate Guide", href: routes.digital },
      { label: "View the Banking Guide", href: routes.banking },
      { label: "View the EU Citizen Roadmap", href: routes.euRoadmap }
    ]
  };
  const previousNextByRoute = {
    [routes.healthcare]: {
      previous: { label: "Padrón", href: routes.padron },
      next: { label: "Bank Account", href: routes.banking }
    },
    [routes.banking]: {
      previous: { label: "Healthcare", href: routes.healthcare },
      next: { label: "Digital Certificate", href: routes.digital }
    },
    [routes.digital]: {
      previous: { label: "Bank Account", href: routes.banking },
      next: { label: "Taxes", href: routes.taxes }
    },
    [routes.taxes]: {
      previous: { label: "Digital Certificate", href: routes.digital },
      next: { label: "Driving", href: routes.driving }
    }
  };

  return {
    status: "draft",
    lastReviewed: "June 2026",
    reviewedBy: "",
    previousNext: previousNextByRoute[route],
    continueJourney: continueByRoute[route] || [
      { label: "View the Documents Checklist", href: routes.checklist },
      { label: "View the Healthcare Guide", href: routes.healthcare },
      { label: "View the Banking Guide", href: routes.banking }
    ],
    relatedGuides: relatedByRoute[route] || commonRelated
  };
}

function validateInternalLinks(pages) {
  const generatedRoutes = new Set(pages.map((page) => page.route));
  const warnings = [];
  for (const page of pages) {
    const links = [...page.html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    for (const href of links) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const clean = href.split("#")[0].split("?")[0];
      if (!clean || clean === "/") continue;
      const existingFile = path.join(root, clean);
      const existingIndex = path.join(root, clean, "index.html");
      const exists = generatedRoutes.has(clean.endsWith("/") ? clean : `${clean}/`) || fs.existsSync(existingFile) || fs.existsSync(existingIndex);
      if (!exists) {
        warnings.push(`${page.route} links to missing internal path: ${href}`);
      }
    }
  }

  if (warnings.length) {
    console.warn("Broken internal guide link warnings:");
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
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
      description: "Draft IberiGo roadmap for EU citizens moving to Spain, from planning to arrival and everyday setup.",
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
        AtAGlance([
          ["Visa required?", "No."],
          ["Staying longer than 3 months?", "EU registration required."],
          ["Can you work?", "Yes."],
          ["TIE card?", "Normally no. EU citizens receive a Certificate of Registration."],
          ["Difficulty", "Moderate."],
          ["Typical timeline", "A few weeks after arrival, depending on appointments."]
        ]),
        GuideSection({ id: "howToUse", title: "How to use this guide", children: `<p>This guide gives you the big picture. Each step points to a more detailed IberiGo guide with documents, requirements, costs and practical advice.</p>` }),
        GuideSection({
          id: "phaseOne",
          title: "Phase 1 – Planning",
          children: StepTimeline([
            { title: "Confirm your route", text: "Your evidence depends on whether you are working, self-employed, studying, retired, or living from savings." },
            { title: "Prepare your documents", text: "Make a small folder for identity, work or funds, healthcare and address documents." },
            { title: "Plan your move", text: "Plan the first month around address proof and appointments, not only travel logistics." }
          ])
        }),
        GuideSection({
          id: "phaseTwo",
          title: "Phase 2 – Arrival",
          children: `${StepTimeline([
            { title: "Secure accommodation", text: "Your address affects padrón, banking, healthcare and many local admin steps." },
            { title: "Register on the padrón", text: "The padrón is town hall address registration and often acts as local address evidence." },
            { title: "Arrange your healthcare", text: "Healthcare comes before EU registration for many non-working or self-sufficient EU citizens because proof of cover may be needed." },
            { title: "Register as an EU citizen", text: "Prepare your EX-18 route evidence and book the correct EU registration appointment." }
          ])}${WarningBox("EU citizens normally apply for the EU Registration Certificate, not a TIE. TIE cards are generally for non-EU nationals.")}`
        }),
        GuideSection({
          id: "phaseThree",
          title: "Phase 3 – Settling In",
          children: StepTimeline([
            { title: "Register with Social Security, if applicable", text: "Separate getting a Social Security number from being registered as active for work." },
            { title: "Open a bank account", text: "Compare documents, fees and account options before choosing." },
            { title: "Get a Digital Certificate or Cl@ve", text: "Digital access helps with tax, Social Security and many public services." },
            { title: "Understand your tax obligations", text: "Review tax risk early, especially if you have income or assets outside Spain." },
            { title: "Check your driving licence", text: "Driving rules depend on where your licence was issued and whether you become resident." }
          ])
        }),
        GuideSection({ id: "youreReady", title: "You're Ready", children: `<p>You’ve completed the main steps most EU citizens follow when moving to Spain. From here, IberiGo’s detailed guides can help with everyday life, healthcare, banking, taxes and local administration.</p>` })
      ],
      continueJourney: [
        { label: "View the Padrón Guide", href: routes.padron },
        { label: "View the Healthcare Guide", href: routes.healthcare },
        { label: "View the EU Registration Guide", href: routes.euRegistration }
      ],
      relatedGuides: commonRelated
    })
  },
  {
    route: routes.euRegistration,
    html: GuideLayout({
      path: routes.euRegistration,
      canonical: `https://iberigo.eu${routes.euRegistration}`,
      title: "EU Registration Certificate in Spain — IberiGo",
      description: "Draft guide to the EU Registration Certificate in Spain for EU, EEA and Swiss citizens staying longer term.",
      metadata: guideMetadataFor(routes.euRegistration),
      breadcrumbs: [{ label: "Moving to Spain", href: routes.checklist }, { label: "EU Registration Certificate" }],
      hero: {
        kicker: "Core guide",
        title: "EU Registration Certificate in Spain",
        intro: "EU, EEA and Swiss citizens who live in Spain longer term usually need to register and receive a Certificate of Registration.",
        asideTitle: "Not a TIE",
        asideText: "EU citizens normally apply for the EU Registration Certificate. TIE cards are generally for non-EU nationals."
      },
      sections: [
        QuickAnswer("If you are an EU, EEA or Swiss citizen living in Spain longer term, the usual route is the Certificate of Registration. The evidence depends on whether you work, study, have funds or have another basis for residence."),
        AtAGlance([
          ["Common form", "EX-18"],
          ["Common fee generator", "Modelo 790-012"],
          ["Card type", "Certificate of Registration, not TIE"],
          ["Editorial status", "Framework migrated to reusable guide system"]
        ]),
        GuideSection({ id: "beforeStart", title: "Before You Start", children: `${Cards(["Confirm whether you are working, self-employed, studying, retired, or living from savings.", "Prepare identity, address, healthcare and route evidence.", "Check the official appointment wording before booking."])}${TipBox("If you are not working, arrange healthcare evidence before the registration appointment.")}` }),
        GuideSection({ id: "whoNeeds", title: "Who Needs This?", children: Cards(["EU, EEA or Swiss citizens living in Spain longer term.", "People preparing the green EU registration certificate step.", "People who need to understand why this is different from a TIE."]) }),
        GuideSection({ id: "officialRequirements", title: "Official Requirements", children: `${Cards(["The procedure is for EU, EEA and Swiss citizen registration.", "Evidence depends on your situation, such as work, study, funds or healthcare cover.", reviewPlaceholder])}${WarningBox("Use the EU registration route. Do not book a TIE card appointment unless a separate official process tells you to.")}` }),
        GuideSection({ id: "practicalAdvice", title: "Practical Advice", children: Cards(["Prepare your NIE details and padrón certificate if requested.", "Bring copies and originals where the appointment instructions ask for them.", "Generate the fee form close to the appointment and check the official amount."]) }),
        DocumentsChecklist(["Passport or EU national ID", "EX-18", "Padrón if requested", "Work, funds, study or healthcare evidence", "Modelo 790-012 payment proof"]),
        GuideSection({ id: "stepProcess", title: "Step-by-Step Process", children: StepTimeline([{ title: "Confirm your basis", text: "Work, self-employment, study, retirement or savings can lead to different evidence." }, { title: "Prepare documents", text: "Collect identity, address and route evidence." }, { title: "Pay the fee", text: "Use the official Modelo 790-012 generator." }, { title: "Attend the appointment", text: "Bring the documents requested for your appointment." }]) }),
        CommonMistakes(["Confusing EU registration with a TIE card.", "Preparing healthcare evidence too late.", "Booking the wrong appointment label.", "Assuming every province asks for documents in the same way."]),
        RealQuestions([{ question: "Do EU citizens need a visa?", answer: "No, but longer-term residence registration can still be required." }, { question: "Is this the same as NIE?", answer: "No. NIE is an identification number; EU registration is a residence registration certificate." }, { question: "What exact evidence applies to me?", answer: reviewPlaceholder }]),
        GuideSection({ id: "whatHappensNext", title: "What Happens Next?", children: `<p>After registration, continue with healthcare, Social Security if working, banking, digital access and tax review.</p>` })
      ],
      continueJourney: [
        { label: "View the EU Citizen Roadmap", href: routes.euRoadmap },
        { label: "View the Healthcare Guide", href: routes.healthcare },
        { label: "View the Social Security Guide", href: routes.social }
      ],
      relatedGuides: commonRelated
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
        title: "Who should register?",
        children: Cards([
          { title: "People living in Spain", text: "If you are living in a Spanish municipality, padrón registration is often one of the first local admin steps." },
          { title: "People preparing other processes", text: "You may need address evidence for healthcare, EU registration, school, social services or other administration." },
          { title: "People who move address", text: "If you move to a new municipality, you may need to register at the new address." }
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
        id: "whyImportant",
        title: "Why is the Padrón important?",
        children: Cards([
          { title: "It proves where you live locally", text: "Many offices use the padrón certificate or volante as address evidence." },
          { title: "It can unlock next steps", text: "Healthcare, EU registration, school registration and some local services may ask for it." },
          { title: "It keeps your local record current", text: "If you move, the new municipality may need your updated registration." }
        ])
      }),
      GuideSection({
        id: "documentsUsuallyNeed",
        title: "Documents you'll usually need",
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
    ],
    continueJourney: [
      { label: "View the EU Registration Guide", href: routes.euRegistration },
      { label: "View the Healthcare Guide", href: routes.healthcare },
      { label: "View the Bank Account Guide", href: routes.banking },
      { label: "View the Digital Certificate Guide", href: routes.digital }
    ],
    relatedGuides: [
      { label: "View the Accommodation Guide", href: routes.accommodation, description: "Understand how your address affects later paperwork." },
      { label: "View the Documents Checklist", href: routes.checklist, description: "Prepare your core moving documents." },
      { label: "View the EU Citizen Roadmap", href: routes.euRoadmap, description: "See where padrón fits in the wider move." }
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
          { title: "Regional card", text: "Once your right is recognized, the regional health service issues the local health card." }
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
    ],
    continueJourney: [
      { label: "View the EU Registration Guide", href: routes.euRegistration },
      { label: "View the Bank Account Guide", href: routes.banking },
      { label: "View the Digital Certificate Guide", href: routes.digital },
      { label: "View the Taxes Guide", href: routes.taxes }
    ],
    relatedGuides: [
      { label: "View the EU Citizen Roadmap", href: routes.euRoadmap, description: "See where healthcare sits in the full moving process." },
      { label: "View the Social Security Guide", href: routes.social, description: "Understand the work and Social Security connection." },
      { label: "View the Documents Checklist", href: routes.checklist, description: "Prepare your paperwork before appointments." }
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
      tip: "Use one folder for identity, address, healthcare, money and appointment documents.",
      continueJourney: [
        { label: "View the Documents Checklist", href: routes.checklist },
        { label: "View the Healthcare Guide", href: routes.healthcare },
        { label: "View the Banking Guide", href: routes.banking }
      ],
      relatedGuides: relatedByRoute[route] || commonRelated
    })
  });
}

for (const page of pages) {
  writePage(page.route, page.html);
}

validateInternalLinks(pages);

console.log(`Generated ${pages.length} guide pages with reusable components.`);
