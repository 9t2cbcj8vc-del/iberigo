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
    { label: "View the Accommodation Guide", href: routes.accommodation, description: "Use address documents for banking preparation." }
  ],
  [routes.digital]: [
    { label: "View the Social Security Guide", href: routes.social, description: "Use digital access for some Social Security services." },
    { label: "View the Taxes Guide", href: routes.taxes, description: "Digital access can help with tax services." },
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

const pages = [
  {
    route: routes.euRoadmap,
    html: GuideLayout({
      path: routes.euRoadmap,
      canonical: `https://iberigo.eu${routes.euRoadmap}`,
      title: "Moving to Spain as an EU Citizen: Step-by-Step Guide — IberiGo",
      description: "Draft IberiGo roadmap for EU citizens moving to Spain, from planning to arrival and everyday setup.",
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

const skeletons = [
  ["registering-on-the-padron", routes.padron, "Registering on the padrón in Spain — IberiGo", "Draft guide to registering your address on the padrón in Spain.", "Registering on the Padrón", "The padrón is town hall address registration. This guide explains the practical order of what to check before using it for other Spain admin steps.", "Padrón registration is handled locally by your town hall. Requirements vary, so this page gives the structure first and leaves local detail for editorial review."],
  ["healthcare", routes.healthcare, "Healthcare in Spain when moving — IberiGo", "Draft guide to understanding healthcare when moving to Spain.", "Healthcare in Spain", "Healthcare should be understood early because it can affect residence, work and daily life setup.", "Your healthcare route depends on your status and situation. Do not rely on travel insurance as a long-term moving plan."],
  ["documents-checklist", routes.checklist, "Moving to Spain documents checklist — IberiGo", "Draft checklist for documents people commonly prepare before moving to Spain.", "Documents Checklist for Moving to Spain", "A calm document checklist helps you prepare without pretending every route has the same requirements.", "Start with identity, address, healthcare, money and purpose evidence. Route-specific detail comes during editorial review."],
  ["opening-a-bank-account", routes.banking, "Opening a bank account in Spain — IberiGo", "Draft guide to opening a bank account in Spain.", "Opening a Bank Account in Spain", "A bank account helps with rent, utilities, salary and everyday payments.", "Banks usually need to identify you and understand your address and customer profile. Exact requirements vary by bank."],
  ["digital-certificate", routes.digital, "Digital certificate and Cl@ve in Spain — IberiGo", "Draft guide to digital certificate and Cl@ve access in Spain.", "Digital Certificate and Cl@ve", "Digital access helps you use Spanish public services online.", "A digital certificate or Cl@ve can help with tax, Social Security, certificates and public-service access."],
  ["social-security", routes.social, "Social Security number in Spain — IberiGo", "Draft guide to Social Security number and work registration concepts in Spain.", "Social Security in Spain", "Social Security is important for work records and can connect to healthcare access.", "The Social Security number identifies your file. Being registered as active for employment or self-employment is a related but separate step."],
  ["taxes", routes.taxes, "Taxes when living in Spain — IberiGo", "Draft guide to tax basics when living in Spain.", "Taxes When Living in Spain", "Tax should be reviewed early, especially if you work, own assets, run a business or keep income abroad.", "If you may live in Spain, check your tax position before deadlines arrive."],
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

console.log(`Generated ${pages.length} guide pages with reusable components.`);
