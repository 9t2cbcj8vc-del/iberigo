#!/usr/bin/env node
// Proof-of-concept static-rendering generator for exactly one legacy guide
// route pair: /guides/job-search/ and /guides/es/job-search/. See
// docs/LEGACY_STATIC_RENDERING_POC_PLAN.md for the approach and rationale.
//
// This script only rewrites the existing #wizardResult placeholder inside
// those two files with real, static guide content. It does not touch head
// metadata, any other section of those pages, or any other legacy guide
// page. app.js is not required/executed here (it runs top-level
// document.querySelector calls and cannot run under plain Node) — instead,
// the job-search content below is a direct, documented transcription of
// app.js's own data for this route (see the source-line comments), so the
// static content matches exactly what app.js already renders client-side.
//
// Content source (do not diverge without updating both places):
//   - process/explanation/steps: app.js, directRoadmapFor(), the
//     `goal === "job-search"` branch (~app.js:1958-1970)
//   - link labels: app.js, the en/es "jobs-*" entries in the officialLinkLabels
//     maps (~app.js:2883-2890 and ~app.js:2979-2986)
//   - link logos/intros: app.js, jobsMeta en/es maps (~app.js:2714-2731)
//   - link URLs: app.js, the shared link-URL map's "jobs-*" entries
//     (~app.js:3078-3085)

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");

const JOB_LINKS = [
  {
    id: "jobs-empleate",
    url: "https://coeestatal.sepe.es/coe-estatal/servicios/servicio-red/empleate.html",
    logo: "Empléate",
    label: { en: "Empléate job portal", es: "Portal de empleo Empléate" },
    intro: {
      en: "Public employment portal that brings together vacancies and labour-market information.",
      es: "Portal público de empleo que reúne ofertas e información del mercado laboral."
    }
  },
  {
    id: "jobs-sepe",
    url: "https://www.sepe.es/HomeSepe/es/encontrar-trabajo.html",
    logo: "SEPE",
    label: { en: "SEPE job search", es: "Buscador de empleo SEPE" },
    intro: {
      en: "Official SEPE area for finding work, guidance, and employment resources in Spain.",
      es: "Área oficial del SEPE para encontrar trabajo, orientación y recursos de empleo en España."
    }
  },
  {
    id: "jobs-eures",
    url: "https://www.sepe.es/HomeSepe/es/encontrar-trabajo/empleo-europa.html",
    logo: "EURES",
    label: { en: "EURES Spain", es: "EURES España" },
    intro: {
      en: "Useful if you want cross-border or Europe-linked job opportunities involving Spain.",
      es: "Útil si buscas oportunidades laborales vinculadas a España y a la movilidad europea."
    }
  },
  {
    id: "jobs-infojobs",
    url: "https://candidatos.infojobs.net/",
    logo: "InfoJobs",
    label: { en: "InfoJobs", es: "InfoJobs" },
    intro: {
      en: "One of the biggest mainstream job portals in Spain across many sectors.",
      es: "Uno de los portales generalistas de empleo más grandes de España en muchos sectores."
    }
  },
  {
    id: "jobs-linkedin",
    url: "https://es.linkedin.com/jobs",
    logo: "in",
    label: { en: "LinkedIn Jobs", es: "LinkedIn Jobs" },
    intro: {
      en: "Strong for professional roles, networking, and company-driven hiring.",
      es: "Muy útil para perfiles profesionales, networking y procesos impulsados por empresas."
    }
  },
  {
    id: "jobs-indeed",
    url: "https://es.indeed.com/",
    logo: "Indeed",
    label: { en: "Indeed", es: "Indeed" },
    intro: {
      en: "Large aggregator-style portal useful for broad searches across many job types.",
      es: "Gran portal tipo agregador útil para búsquedas amplias de muchos tipos de empleo."
    }
  },
  {
    id: "jobs-jobtoday",
    url: "https://jobtoday.com/es",
    logo: "JOB TODAY",
    label: { en: "JOB TODAY", es: "JOB TODAY" },
    intro: {
      en: "Popular for fast-moving retail, hospitality, and service-sector roles.",
      es: "Popular para hostelería, comercio y trabajos de servicios con movimiento rápido."
    }
  },
  {
    id: "jobs-tecnoempleo",
    url: "https://www.tecnoempleo.com/",
    logo: "Tecno",
    label: { en: "Tecnoempleo", es: "Tecnoempleo" },
    intro: {
      en: "Specialist portal for tech, IT, and telecom roles in Spain.",
      es: "Portal especializado en tecnología, informática y telecomunicaciones en España."
    }
  }
];

const JOB_SEARCH_CONTENT = {
  en: {
    process: "Job search in Spain",
    purposeLabel: "What this is for",
    explanation:
      "Finding work in Spain as a foreigner involves a mix of official portals and local networks. The main public job portal is the SEPE (Servicio Público de Empleo Estatal) at sepe.es, which lists registered vacancies and manages unemployment benefits. InfoJobs, LinkedIn, and Tecnoempleo are the most-used private job boards. EU citizens can work without restriction; non-EU citizens generally need a work authorization tied to a specific employer before starting. Registering with SEPE is also required to access unemployment benefits (prestación por desempleo) if you lose a job — you must register within 15 working days of becoming unemployed. Learning Spanish significantly expands options outside major cities and international companies.",
    nextStepsLabel: "Next steps",
    steps: [
      "Decide whether you are looking for local work, remote work from Spain, seasonal work, or a specific sector.",
      "Prepare a CV, contact details, and basic application documents, and check whether your current status lets you work legally in Spain.",
      "Start with public and official portals so you can see vacancies, guidance, and labour-market resources."
    ],
    linksLabel: "Official links",
    disclaimer:
      "This app is a planning guide, not legal advice. Spanish immigration and administration rules, document lists, fees, and appointment labels can change. Always verify your procedure with official sources before filing."
  },
  es: {
    process: "Buscar trabajo en España",
    purposeLabel: "Para qué sirve",
    explanation:
      "Buscar trabajo en España combina portales oficiales, plataformas privadas y redes locales. SEPE y Empléate ayudan a ver recursos públicos, orientación y ofertas registradas; InfoJobs, LinkedIn, Indeed, Job Today y portales especializados amplían mucho la búsqueda. Los ciudadanos de la UE pueden trabajar sin autorización adicional, pero los no comunitarios normalmente necesitan una autorización de trabajo antes de empezar. El español abre muchas más opciones fuera de empresas internacionales o zonas muy turísticas.",
    nextStepsLabel: "Próximos pasos",
    steps: [
      "Define si buscas empleo local, remoto desde España, trabajo estacional o un sector concreto.",
      "Prepara CV, datos de contacto y documentación básica para candidaturas, y revisa si tu situación te permite trabajar legalmente en España.",
      "Empieza por portales públicos y oficiales para ver vacantes, orientación y recursos del mercado laboral."
    ],
    linksLabel: "Enlaces oficiales",
    disclaimer:
      "Esta aplicación es una guía de planificación, no asesoría legal. Las normas de extranjería y administración españolas, listas de documentos, tasas y nombres de citas pueden cambiar. Verifica siempre tu trámite con fuentes oficiales antes de presentarlo."
  }
};

function renderLinksHtml(lang) {
  const anchors = JOB_LINKS.map((link) => {
    const brandClass = `jobs-link jobs-link--${link.id.replace("jobs-", "")}`;
    return `              <a class="${brandClass}" href="${link.url}" target="_blank" rel="noreferrer">
                <span class="jobs-logo" aria-hidden="true">${link.logo}</span>
                <strong>${link.label[lang]}</strong>
                <span>${link.intro[lang]}</span>
              </a>`;
  }).join("\n");

  return `            <div class="result-section route-links-note">
              <strong>${JOB_SEARCH_CONTENT[lang].linksLabel}</strong>
              <div class="province-links">
${anchors}
              </div>
            </div>`;
}

function renderResultHtml(lang) {
  const content = JOB_SEARCH_CONTENT[lang];
  const stepsHtml = content.steps.map((step) => `<li>${step}</li>`).join("");

  return `<article class="result-card" id="wizardResult" aria-live="polite">
            <div class="result-hero">
              <div class="result-hero-copy">
                <h3>${content.process}</h3>
                <section class="result-purpose" aria-label="${content.purposeLabel}">
                  <strong>${content.purposeLabel}</strong>
                  <p>${content.explanation}</p>
                </section>
              </div>
            </div>
            <div class="result-section">
              <strong>${content.nextStepsLabel}</strong>
              <ol class="roadmap-list">${stepsHtml}</ol>
            </div>
${renderLinksHtml(lang)}
            <p class="disclaimer">${content.disclaimer}</p>
          </article>`;
}

const PLACEHOLDER_BLOCK = `<article class="result-card is-empty" id="wizardResult" aria-live="polite">
            <h3 data-i18n="emptyTitle">Your roadmap will appear here</h3>
            <p data-i18n="emptyText">Choose a situation card or answer the questions above to see a Spain-wide route.</p>
          </article>`;

const TARGETS = [
  { relPath: "guides/job-search/index.html", lang: "en" },
  { relPath: "guides/es/job-search/index.html", lang: "es" }
];

function run() {
  let changedCount = 0;

  TARGETS.forEach(({ relPath, lang }) => {
    const filePath = path.join(REPO_ROOT, relPath);
    const html = fs.readFileSync(filePath, "utf8");

    if (!html.includes(PLACEHOLDER_BLOCK)) {
      console.error(`Expected placeholder block not found in ${relPath} — skipping to avoid an unsafe change.`);
      process.exitCode = 1;
      return;
    }

    const updated = html.replace(PLACEHOLDER_BLOCK, renderResultHtml(lang));
    fs.writeFileSync(filePath, updated);
    changedCount += 1;
    console.log(`Static content written: ${relPath}`);
  });

  if (changedCount === TARGETS.length) {
    console.log(`Done. ${changedCount}/${TARGETS.length} target files updated.`);
  } else {
    console.error(`Only ${changedCount}/${TARGETS.length} target files were updated. Review output above.`);
  }
}

run();
