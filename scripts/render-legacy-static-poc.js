#!/usr/bin/env node
// Controlled proof-of-concept static-rendering generator for selected legacy
// guide route pairs. See docs/LEGACY_STATIC_RENDERING_POC_PLAN.md for the
// approach and rationale.
//
// This script only rewrites the existing #wizardResult placeholder inside
// explicitly selected files with real, static guide content. It does not touch
// head metadata, any other section of those pages, or any other legacy guide
// page. app.js is not required/executed here (it runs top-level
// document.querySelector calls and cannot run under plain Node) — instead, the
// content below is a direct, documented transcription of app.js's own data for
// each selected route, so the static content matches what app.js already
// renders client-side.
//
// Content sources (do not diverge without updating both places):
//   - job-search process/explanation/steps: app.js, directRoadmapFor(), the
//     `goal === "job-search"` branch (~app.js:1958-1970)
//   - phone process/explanation/steps: app.js, directRoadmapFor(), the
//     `goal === "phone"` branch (~app.js:1984-1995)
//   - link labels: app.js, the en/es provider/jobs entries in the
//     officialLinkLabels maps (~app.js:2877-2890 and ~app.js:2973-2986)
//   - link logos/intros: app.js, providerMeta/jobsMeta en/es maps
//     (~app.js:2694-2731)
//   - link URLs: app.js, the shared link-URL map's provider/jobs entries
//     (~app.js:3072-3085)

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");

const DISCLAIMER = {
  en:
    "This app is a planning guide, not legal advice. Spanish immigration and administration rules, document lists, fees, and appointment labels can change. Always verify your procedure with official sources before filing.",
  es:
    "Esta aplicación es una guía de planificación, no asesoría legal. Las normas de extranjería y administración españolas, listas de documentos, tasas y nombres de citas pueden cambiar. Verifica siempre tu trámite con fuentes oficiales antes de presentarlo."
};

const LINKS = {
  "provider-movistar": {
    url: "https://www.movistar.es/",
    logo: "M",
    label: { en: "Movistar", es: "Movistar" },
    intro: {
      en: "Major traditional operator for mobile, fibre, and full home-service bundles.",
      es: "Gran operador tradicional para móvil, fibra y paquetes completos para casa."
    }
  },
  "provider-vodafone": {
    url: "https://www.vodafone.es/c/particulares/es/",
    logo: "V",
    label: { en: "Vodafone", es: "Vodafone" },
    intro: {
      en: "Well-known mobile and broadband operator with mainstream bundled options.",
      es: "Operador conocido de móvil y banda ancha con opciones combinadas bastante comunes."
    }
  },
  "provider-orange": {
    url: "https://www.orange.es/",
    logo: "Orange",
    label: { en: "Orange", es: "Orange" },
    intro: {
      en: "Large national provider for mobile, fibre, and combined home packages.",
      es: "Proveedor nacional grande para móvil, fibra y paquetes de hogar combinados."
    }
  },
  "provider-digi": {
    url: "https://www.digimobil.es/",
    logo: "DIGI",
    label: { en: "DIGI", es: "DIGI" },
    intro: {
      en: "Popular lower-cost option for mobile and fibre, often attractive for newcomers.",
      es: "Opción popular de menor coste para móvil y fibra, muchas veces atractiva para recién llegados."
    }
  },
  "provider-o2": {
    url: "https://o2online.es/",
    logo: "O2",
    label: { en: "O2", es: "O2" },
    intro: {
      en: "Cleaner no-frills option under Movistar's network, often with simpler plans.",
      es: "Opción más sencilla y sin extras bajo la red de Movistar, a menudo con tarifas más limpias."
    }
  },
  "provider-yoigo": {
    url: "https://www.yoigo.com/",
    logo: "yoigo",
    label: { en: "Yoigo", es: "Yoigo" },
    intro: {
      en: "Common alternative for mobile and fibre bundles with a more flexible feel.",
      es: "Alternativa común para móvil y fibra con una sensación algo más flexible."
    }
  },
  "jobs-empleate": {
    url: "https://coeestatal.sepe.es/coe-estatal/servicios/servicio-red/empleate.html",
    logo: "Empléate",
    label: { en: "Empléate job portal", es: "Portal de empleo Empléate" },
    intro: {
      en: "Public employment portal that brings together vacancies and labour-market information.",
      es: "Portal público de empleo que reúne ofertas e información del mercado laboral."
    }
  },
  "jobs-sepe": {
    url: "https://www.sepe.es/HomeSepe/es/encontrar-trabajo.html",
    logo: "SEPE",
    label: { en: "SEPE job search", es: "Buscador de empleo SEPE" },
    intro: {
      en: "Official SEPE area for finding work, guidance, and employment resources in Spain.",
      es: "Área oficial del SEPE para encontrar trabajo, orientación y recursos de empleo en España."
    }
  },
  "jobs-eures": {
    url: "https://www.sepe.es/HomeSepe/es/encontrar-trabajo/empleo-europa.html",
    logo: "EURES",
    label: { en: "EURES Spain", es: "EURES España" },
    intro: {
      en: "Useful if you want cross-border or Europe-linked job opportunities involving Spain.",
      es: "Útil si buscas oportunidades laborales vinculadas a España y a la movilidad europea."
    }
  },
  "jobs-infojobs": {
    url: "https://candidatos.infojobs.net/",
    logo: "InfoJobs",
    label: { en: "InfoJobs", es: "InfoJobs" },
    intro: {
      en: "One of the biggest mainstream job portals in Spain across many sectors.",
      es: "Uno de los portales generalistas de empleo más grandes de España en muchos sectores."
    }
  },
  "jobs-linkedin": {
    url: "https://es.linkedin.com/jobs",
    logo: "in",
    label: { en: "LinkedIn Jobs", es: "LinkedIn Jobs" },
    intro: {
      en: "Strong for professional roles, networking, and company-driven hiring.",
      es: "Muy útil para perfiles profesionales, networking y procesos impulsados por empresas."
    }
  },
  "jobs-indeed": {
    url: "https://es.indeed.com/",
    logo: "Indeed",
    label: { en: "Indeed", es: "Indeed" },
    intro: {
      en: "Large aggregator-style portal useful for broad searches across many job types.",
      es: "Gran portal tipo agregador útil para búsquedas amplias de muchos tipos de empleo."
    }
  },
  "jobs-jobtoday": {
    url: "https://jobtoday.com/es",
    logo: "JOB TODAY",
    label: { en: "JOB TODAY", es: "JOB TODAY" },
    intro: {
      en: "Popular for fast-moving retail, hospitality, and service-sector roles.",
      es: "Popular para hostelería, comercio y trabajos de servicios con movimiento rápido."
    }
  },
  "jobs-tecnoempleo": {
    url: "https://www.tecnoempleo.com/",
    logo: "Tecno",
    label: { en: "Tecnoempleo", es: "Tecnoempleo" },
    intro: {
      en: "Specialist portal for tech, IT, and telecom roles in Spain.",
      es: "Portal especializado en tecnología, informática y telecomunicaciones en España."
    }
  }
};

const SUPPORTED_GUIDES = {
  "job-search": {
    routes: {
      en: "guides/job-search/index.html",
      es: "guides/es/job-search/index.html"
    },
    linkClassPrefix: "jobs",
    logoClass: "jobs-logo",
    linkIds: [
      "jobs-empleate",
      "jobs-sepe",
      "jobs-eures",
      "jobs-infojobs",
      "jobs-linkedin",
      "jobs-indeed",
      "jobs-jobtoday",
      "jobs-tecnoempleo"
    ],
    content: {
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
        linksLabel: "Official links"
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
        linksLabel: "Enlaces oficiales"
      }
    }
  },
  phone: {
    routes: {
      en: "guides/phone/index.html",
      es: "guides/es/phone/index.html"
    },
    linkClassPrefix: "provider",
    logoClass: "provider-logo",
    linkIds: [
      "provider-movistar",
      "provider-vodafone",
      "provider-orange",
      "provider-digi",
      "provider-o2",
      "provider-yoigo"
    ],
    content: {
      en: {
        process: "Phone number and internet",
        purposeLabel: "What this is for",
        explanation:
          "Getting a Spanish SIM is straightforward and often one of the first things to sort on arrival — you need a working Spanish number for bank verification, government SMS codes, appointment confirmations, and Cl@ve PIN registration. Major operators are Movistar, Vodafone, Orange, and MásMóvil; low-cost MVNOs like Simyo, Digi, and Lebara offer good value on the same networks. You need your passport or NIE to register a SIM (anonymous SIMs are not legal in Spain). Prepay SIMs are available in supermarkets, phone shops, and operator stores. For home broadband, fibre coverage in Spain is extensive — Spain has one of the highest fibre penetration rates in Europe — and contracts are typically 12 months with competitive pricing.",
        nextStepsLabel: "Next steps",
        steps: [
          "Decide whether you need a temporary arrival solution or a stable line for living in Spain.",
          "Prepare passport or NIE/TIE, because some providers may ask for identification when opening a contract or porting a number.",
          "Before choosing a plan, check coverage in your area, contract length, home internet options, and whether you need reliable SMS codes for banking or public portals.",
          "Compare the larger operators and the more flexible options before choosing mobile, fibre, or a bundled package."
        ],
        linksLabel: "Official links"
      },
      es: {
        process: "Número de teléfono e internet",
        purposeLabel: "Para qué sirve",
        explanation:
          "Tener un número español suele ser de lo primero que conviene organizar al llegar. Lo necesitarás para banca, códigos SMS, citas, verificaciones y algunos servicios públicos. Las operadoras grandes incluyen Movistar, Vodafone y Orange, y también hay opciones más flexibles o de menor coste como DIGI, O2 o Yoigo. Para contratar una línea pueden pedir pasaporte, NIE o TIE, porque las líneas anónimas no son la norma legal. Para internet en casa, la fibra está muy extendida, pero conviene revisar cobertura, permanencia y condiciones antes de firmar.",
        nextStepsLabel: "Próximos pasos",
        steps: [
          "Define si buscas una solución temporal de llegada o una línea estable para vivir en España.",
          "Prepara pasaporte o NIE/TIE, porque algunas operadoras pueden pedir identificación al contratar o portar un número.",
          "Antes de elegir tarifa, revisa cobertura en tu zona, permanencia, internet en casa y si necesitas recibir códigos para banca y sedes online.",
          "Compara primero grandes operadores y opciones más flexibles antes de contratar móvil, fibra o un paquete conjunto."
        ],
        linksLabel: "Enlaces oficiales"
      }
    }
  }
};

// Only the phone route pair is rendered in Sprint 120. job-search remains in
// SUPPORTED_GUIDES as the prior POC and regression target.
const SELECTED_GUIDE_IDS = ["phone"];

const PLACEHOLDER_BLOCK = `<article class="result-card is-empty" id="wizardResult" aria-live="polite">
            <h3 data-i18n="emptyTitle">Your roadmap will appear here</h3>
            <p data-i18n="emptyText">Choose a situation card or answer the questions above to see a Spain-wide route.</p>
          </article>`;

const RENDERED_RESULT_START = `<article class="result-card" id="wizardResult" aria-live="polite">`;
const RENDERED_RESULT_END = "\n          </article>";

function renderLinksHtml(guide, lang) {
  const anchors = guide.linkIds.map((id) => {
    const link = LINKS[id];
    const suffix = id.replace(`${guide.linkClassPrefix}-`, "");
    const brandClass = `${guide.linkClassPrefix}-link ${guide.linkClassPrefix}-link--${suffix}`;

    return `              <a class="${brandClass}" href="${link.url}" target="_blank" rel="noreferrer">
                <span class="${guide.logoClass}" aria-hidden="true">${link.logo}</span>
                <strong>${link.label[lang]}</strong>
                <span>${link.intro[lang]}</span>
              </a>`;
  }).join("\n");

  return `            <div class="result-section route-links-note">
              <strong>${guide.content[lang].linksLabel}</strong>
              <div class="province-links">
${anchors}
              </div>
            </div>`;
}

function renderResultHtml(guide, lang) {
  const content = guide.content[lang];
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
${renderLinksHtml(guide, lang)}
            <p class="disclaimer">${DISCLAIMER[lang]}</p>
          </article>`;
}

function replaceWizardResult(html, relPath, renderedHtml) {
  if (html.includes(PLACEHOLDER_BLOCK)) {
    return html.replace(PLACEHOLDER_BLOCK, renderedHtml);
  }

  const start = html.indexOf(RENDERED_RESULT_START);
  if (start === -1) {
    throw new Error(`Expected #wizardResult placeholder not found in ${relPath}`);
  }

  const end = html.indexOf(RENDERED_RESULT_END, start);
  if (end === -1) {
    throw new Error(`Expected #wizardResult closing block not found in ${relPath}`);
  }

  return `${html.slice(0, start)}${renderedHtml}${html.slice(end + RENDERED_RESULT_END.length)}`;
}

function run() {
  const targets = SELECTED_GUIDE_IDS.flatMap((guideId) => {
    const guide = SUPPORTED_GUIDES[guideId];
    if (!guide) {
      throw new Error(`Unsupported selected guide id: ${guideId}`);
    }

    return Object.entries(guide.routes).map(([lang, relPath]) => ({ guide, lang, relPath }));
  });

  let changedCount = 0;

  targets.forEach(({ guide, lang, relPath }) => {
    const filePath = path.join(REPO_ROOT, relPath);
    const html = fs.readFileSync(filePath, "utf8");
    const updated = replaceWizardResult(html, relPath, renderResultHtml(guide, lang));

    if (updated !== html) {
      fs.writeFileSync(filePath, updated);
      changedCount += 1;
      console.log(`Static content written: ${relPath}`);
    } else {
      console.log(`Static content already current: ${relPath}`);
    }
  });

  console.log(`Done. ${changedCount}/${targets.length} target files changed.`);
}

run();
