#!/usr/bin/env node
// generate.js — run with: node generate.js
// Generates one static HTML file per guide per language and sitemap.xml.

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://iberigo.eu";
const ROOT = __dirname;
const GUIDES_DIR = path.join(ROOT, "guides");
const STATIC_URLS = [
  "/the-spain-files/",
  "/the-spain-files/es/",
  "/the-spain-files/nie-spain/",
  "/the-spain-files/como-obtener-nie-en-espana/"
];

// Language URL prefixes: en at root, others under /guides/{lang}/
const LANGS = { en: "", es: "es/" };

// Guide metadata: title comes from `process`, meta description from `explanation`.
// process is also used as the <h1> inside app.js; explanation becomes the 155-char meta description.
const GUIDES = {
  // ── Wizard routes ────────────────────────────────────────────────────────
  "eu-vacation": {
    en: {
      process: "EU/EEA/Swiss short visit to Spain",
      explanation: "EU, EEA, and Swiss citizens can visit Spain for up to 3 months with a valid passport or national ID. No residence filing needed for an ordinary short visit."
    },
    es: {
      process: "Estancia corta en España para ciudadanos de la UE",
      explanation: "Los ciudadanos de la UE, el EEE y Suiza pueden visitar España hasta 3 meses con pasaporte o DNI válido. No se necesita trámite de residencia para una visita corta ordinaria."
    }
  },
  "non-eu-vacation": {
    en: {
      process: "Schengen short stay in Spain",
      explanation: "For a vacation or short visit to Spain, check whether your passport needs a Schengen short-stay visa or can enter visa-free. The 90/180-day rule applies across the whole Schengen area."
    },
    es: {
      process: "Estancia corta Schengen en España",
      explanation: "Para vacaciones o visita corta en España, comprueba si tu pasaporte necesita visado Schengen de corta estancia o puede entrar sin visado. Se aplica la regla de 90/180 días en el espacio Schengen."
    }
  },
  "eu-registration": {
    en: {
      process: "EU/EEA/Swiss registration certificate in Spain",
      explanation: "EU, EEA, and Swiss citizens staying in Spain over 3 months usually need the Certificado de Registro de Ciudadano de la Unión. Prepare your NIE, padrón certificate, and EX-18 form before the appointment."
    },
    es: {
      process: "Certificado de registro de ciudadano de la UE en España",
      explanation: "Los ciudadanos de la UE, el EEE y Suiza que viven en España más de 3 meses necesitan el Certificado de Registro. Prepara NIE, certificado de padrón y formulario EX-18 antes de la cita."
    }
  },
  "eu-working": {
    en: {
      process: "EU/EEA/Swiss worker registration in Spain",
      explanation: "EU, EEA, and Swiss citizens working in Spain over 3 months register their residency through the EU Registration Certificate. Bring your employment contract, Social Security alta, NIE, and padrón."
    },
    es: {
      process: "Registro UE como trabajador en España",
      explanation: "Los ciudadanos de la UE, el EEE y Suiza que trabajan en España más de 3 meses registran su residencia con el Certificado UE. Lleva contrato, alta en Seguridad Social, NIE y padrón."
    }
  },
  "nie-only": {
    en: {
      process: "NIE only — Spanish foreigner ID number",
      explanation: "Get a NIE for an economic, professional, or social reason without registering as a resident. Police offices expect a specific, stated reason for the request rather than a just-in-case application."
    },
    es: {
      process: "Solo NIE — número de identidad de extranjero en España",
      explanation: "Obtén un NIE por razón económica, profesional o social sin registrarte como residente. La policía espera un motivo concreto y justificado, no solo querer tener el número por precaución."
    }
  },
  "tie-after-approval": {
    en: {
      process: "TIE card after residence approval in Spain",
      explanation: "The TIE (Tarjeta de Identidad de Extranjero) is the physical foreigner identity card issued after a residence authorization or visa is granted. Bring EX-17, passport, photo, and paid 790-012 to the appointment."
    },
    es: {
      process: "Tarjeta TIE tras la aprobación de residencia en España",
      explanation: "La TIE es la tarjeta física de identidad de extranjero que se expide tras la concesión de una autorización de residencia o visado. Lleva EX-17, pasaporte, foto y justificante 790-012 pagado a la cita."
    }
  },
  "work-authorization": {
    en: {
      process: "Work and residence authorization in Spain",
      explanation: "Non-EU citizens who want to work in Spain for a Spanish employer or as self-employed need a residence and work authorization before starting. The authorization process often takes several months."
    },
    es: {
      process: "Autorización de residencia y trabajo en España",
      explanation: "Los ciudadanos no comunitarios que quieren trabajar en España por cuenta ajena o propia necesitan una autorización de residencia y trabajo antes de empezar. El proceso suele tardar varios meses."
    }
  },
  "digital-nomad": {
    en: {
      process: "Digital nomad residence in Spain",
      explanation: "Non-EU remote workers and professionals working mainly for companies or clients outside Spain can apply for the international telework residence. After a complete filing, approval often takes one to three months."
    },
    es: {
      process: "Residencia de nómada digital en España",
      explanation: "Los trabajadores remotos no comunitarios con clientes o empresas fuera de España pueden solicitar la residencia de teletrabajo internacional. Tras solicitud completa, la aprobación suele tardar de uno a tres meses."
    }
  },
  "non-lucrative": {
    en: {
      process: "Non-lucrative residence in Spain",
      explanation: "For non-EU applicants who want to live in Spain without working. Requires proof of sufficient funds, private health insurance, and criminal record certificate. Often processed through a Spanish consulate."
    },
    es: {
      process: "Residencia no lucrativa en España",
      explanation: "Para ciudadanos no comunitarios que quieren vivir en España sin trabajar. Requiere prueba de fondos suficientes, seguro médico privado y antecedentes penales. Normalmente se tramita por el consulado español."
    }
  },
  study: {
    en: {
      process: "Study stay authorization in Spain",
      explanation: "For studies, training, student mobility, internships, or related activities lasting over 90 days in Spain. Requires admission proof, sufficient funds, health insurance, and the official study stay authorization."
    },
    es: {
      process: "Autorización de estancia por estudios en España",
      explanation: "Para estudios, formación, movilidad estudiantil o prácticas de más de 90 días en España. Se necesita prueba de admisión, fondos suficientes, seguro médico y la autorización oficial de estancia por estudios."
    }
  },
  family: {
    en: {
      process: "Family reunification in Spain",
      explanation: "For eligible relatives joining a non-EU legal resident in Spain. Requires family relationship evidence, sponsor residence documents, housing proof, and economic means. The process often takes several months."
    },
    es: {
      process: "Reagrupación familiar en España",
      explanation: "Para familiares que se reúnen con un residente legal no comunitario en España. Se necesita prueba del vínculo familiar, documentos de residencia del reagrupante, vivienda y medios económicos."
    }
  },
  "eu-family": {
    en: {
      process: "Residence card for family member of an EU citizen in Spain",
      explanation: "For non-EU family members joining an EU, EEA, Swiss, or qualifying Spanish citizen in Spain. The EX-19 EU-family residence card route is separate from ordinary family reunification."
    },
    es: {
      process: "Tarjeta de residencia de familiar de ciudadano de la UE en España",
      explanation: "Para familiares no comunitarios que se reúnen con un ciudadano de la UE, EEE, Suiza o español en España. La ruta de tarjeta de familiar (EX-19) es distinta de la reagrupación familiar ordinaria."
    }
  },

  // ── Living in Spain topics ────────────────────────────────────────────────
  padron: {
    en: {
      process: "Padrón — town hall registration in Spain",
      explanation: "Register your address with your local town hall (padrón). Requirements vary by municipality; you usually need an identity document and proof of address such as a rental contract or deed."
    },
    es: {
      process: "Padrón — registro en el ayuntamiento en España",
      explanation: "Registra tu domicilio en el ayuntamiento (padrón). Los requisitos varían por municipio; suele bastar documento de identidad y prueba de domicilio como el alquiler."
    }
  },
  digital: {
    en: {
      process: "Cl@ve or FNMT digital certificate in Spain",
      explanation: "Get electronic access to Spanish government portals. FNMT digital certificate is often the easier path if you have a NIE; Cl@ve usually needs a support number from a physical card like the TIE."
    },
    es: {
      process: "Cl@ve o certificado digital FNMT en España",
      explanation: "Accede electrónicamente a las sedes públicas españolas. El certificado digital FNMT suele ser más fácil si ya tienes NIE; Cl@ve normalmente necesita el número de soporte de una tarjeta física como la TIE."
    }
  },
  nie: {
    en: {
      process: "NIE number in Spain — what you need to know",
      explanation: "Your NIE is the foreigner identification number required for banking, property, tax, and many official procedures in Spain. Police offices expect a specific, stated reason when you apply."
    },
    es: {
      process: "Número NIE en España — lo que necesitas saber",
      explanation: "El NIE es el número de identificación de extranjeros necesario para banco, propiedad, impuestos y muchos trámites oficiales en España. La policía espera un motivo concreto al solicitar el NIE."
    }
  },
  tie: {
    en: {
      process: "TIE card in Spain — foreigner identity card guide",
      explanation: "The TIE (Tarjeta de Identidad de Extranjero) documents your approved residence or stay in Spain. Confirm you have a visa, authorization, or favorable resolution before booking the fingerprint appointment."
    },
    es: {
      process: "Tarjeta TIE en España — guía de la tarjeta de identidad de extranjero",
      explanation: "La TIE documenta tu residencia o estancia autorizada en España. Confirma que tienes visado, autorización o resolución favorable antes de reservar la cita de huellas."
    }
  },
  "social-security": {
    en: {
      process: "Social Security number in Spain",
      explanation: "A Spanish Social Security number (NUSS) is needed for employment, self-employment contributions, and some official procedures. Your employer may help with registration, or you can apply directly through the official Social Security portal if you can identify yourself online, including with a digital certificate."
    },
    es: {
      process: "Número de la Seguridad Social en España",
      explanation: "El número de la Seguridad Social (NUSS) es necesario para el empleo, las cotizaciones de autónomos y algunos trámites oficiales. Tu empleador puede ayudarte con el alta o puedes solicitarlo directamente en la sede de la Seguridad Social si puedes identificarte online, incluido con certificado digital."
    }
  },
  "sip-card": {
    en: {
      process: "Public health card in Spain — SIP, TSI, Tarjeta Sanitaria",
      explanation: "Every Spanish autonomous community has its own name for the public health card: SIP, TSI, or Tarjeta Sanitaria. First confirm your healthcare entitlement, then apply at the regional health service."
    },
    es: {
      process: "Tarjeta sanitaria pública en España — SIP, TSI, Tarjeta Sanitaria",
      explanation: "Cada comunidad autónoma tiene su propio nombre para la tarjeta sanitaria pública: SIP, TSI o Tarjeta Sanitaria. Confirma primero tu derecho a asistencia sanitaria y solicítala en el servicio de salud regional."
    }
  },
  "private-health": {
    en: {
      process: "Private health insurance in Spain",
      explanation: "Private health insurance is often required for Spanish residence permits and visas, and can also be useful as extra cover. Compare coverage, waiting periods, co-payments, and network size before buying."
    },
    es: {
      process: "Seguro médico privado en España",
      explanation: "El seguro médico privado suele ser necesario para permisos de residencia y visados en España, y también puede ser útil como cobertura adicional. Compara coberturas, carencias, copagos y red médica antes de contratar."
    }
  },
  "ehic-card": {
    en: {
      process: "European Health Insurance Card (EHIC) from Spain",
      explanation: "The EHIC covers medically necessary public healthcare during temporary stays in EU/EEA countries, Switzerland, and the UK. Confirm your Spanish healthcare entitlement is active before requesting the card."
    },
    es: {
      process: "Tarjeta Sanitaria Europea (TSE) desde España",
      explanation: "La TSE cubre asistencia sanitaria pública necesaria durante estancias temporales en países de la UE/EEE, Suiza y Reino Unido. Confirma que tu derecho a asistencia sanitaria en España está activo antes de solicitarla."
    }
  },
  banking: {
    en: {
      process: "Bank account and banking in Spain",
      explanation: "Opening a bank account in Spain usually requires identity documents, NIE or TIE if you have one, and proof of address. Compare resident, non-resident, and newcomer account options before committing."
    },
    es: {
      process: "Cuenta bancaria y banca en España",
      explanation: "Abrir una cuenta bancaria en España normalmente requiere documento de identidad, NIE o TIE si lo tienes y prueba de domicilio. Compara cuentas de residente, no residente y recién llegado antes de decidir."
    }
  },
  "job-search": {
    en: {
      process: "Job search in Spain — how to get started",
      explanation: "Start a job search in Spain by confirming your legal right to work, then explore public portals and major private platforms. Official portals like Empléate, SEPE, and EURES are a practical first step."
    },
    es: {
      process: "Buscar trabajo en España — cómo empezar",
      explanation: "Empieza la búsqueda de trabajo en España confirmando tu derecho legal a trabajar y luego explora portales públicos y grandes plataformas privadas. Empléate, SEPE y EURES son un primer paso práctico."
    }
  },
  taxes: {
    en: {
      process: "Taxes and tax address in Spain",
      explanation: "Your tax obligations in Spain depend on your residency status, income sources, and whether you are registered with the Tax Agency (Agencia Tributaria)."
    },
    es: {
      process: "Impuestos y domicilio fiscal en España",
      explanation: "Tus obligaciones fiscales en España dependen de tu residencia, tus fuentes de ingresos y de si estás registrado en la Agencia Tributaria."
    }
  },
  phone: {
    en: {
      process: "Phone and internet in Spain",
      explanation: "Getting a mobile number and home internet in Spain is straightforward once you have ID. Compare major operators and flexible options before signing. Some providers ask for NIE or passport for the contract."
    },
    es: {
      process: "Teléfono e internet en España",
      explanation: "Conseguir número de móvil e internet en casa en España es sencillo con documentación. Compara grandes operadores y opciones flexibles antes de contratar. Algunas operadoras piden NIE o pasaporte."
    }
  },
  "vida-laboral": {
    en: {
      process: "Vida laboral (Informe de Vida Laboral) in Spain",
      explanation: "The Informe de Vida Laboral is an official Social Security document showing your complete Spanish employment history — every job, self-employment period, or contribution gap. It is free and usually available instantly online with Cl@ve or a digital certificate."
    },
    es: {
      process: "Vida laboral (Informe de Vida Laboral) en España",
      explanation: "El Informe de Vida Laboral es un documento oficial de la Seguridad Social que muestra tu historial completo de empleo en España: cada trabajo, periodo de autónomo o laguna de cotización. Es gratuito y suele obtenerse al instante online con Cl@ve o certificado digital."
    }
  },

  // ── Vacation topics ───────────────────────────────────────────────────────
  "vacation-entry": {
    en: {
      process: "Entry rules and short stays in Spain",
      explanation: "Check whether your trip to Spain falls under EU free movement or Schengen short-stay rules. Confirm your entry documents, any visa requirement, and the 90/180-day rule if relevant."
    },
    es: {
      process: "Reglas de entrada y estancia corta en España",
      explanation: "Comprueba si tu viaje a España cae en la libre circulación de la UE o las reglas de estancia corta Schengen. Confirma documentos de entrada, visado y la regla de 90/180 días."
    }
  },
  "vacation-citizenship": {
    en: {
      process: "EU vs non-EU entry to Spain — vacation guide",
      explanation: "EU/EEA/Swiss citizens travel to Spain under free movement rules. Non-EU travellers follow Schengen short-stay rules including visa requirements and the 90-day limit in any 180-day period."
    },
    es: {
      process: "Entrada a España para ciudadanos UE y no UE — guía de vacaciones",
      explanation: "Los ciudadanos de la UE/EEE/Suiza viajan a España bajo libre circulación. Los viajeros no comunitarios siguen las normas de estancia corta Schengen, con visado si aplica y el límite de 90 días en 180."
    }
  },
  "vacation-flights": {
    en: {
      process: "Flights and airports in Spain",
      explanation: "Find the best flights to Spain by comparing airlines and search platforms. Spain's major airports include Madrid Barajas, Barcelona El Prat, Malaga, Valencia, Alicante, and the Canary and Balearic Islands."
    },
    es: {
      process: "Vuelos y aeropuertos en España",
      explanation: "Encuentra los mejores vuelos a España comparando aerolíneas y comparadores. Los principales aeropuertos de España incluyen Madrid Barajas, Barcelona El Prat, Málaga, Valencia, Alicante y las islas."
    }
  },
  "vacation-ground": {
    en: {
      process: "Trains, buses, and car hire in Spain",
      explanation: "Getting around Spain by train, bus, or rental car depends on your route. Renfe covers high-speed and regional rail; ALSA covers long-distance buses; rental car options are available at major airports and cities."
    },
    es: {
      process: "Trenes, autobuses y coche de alquiler en España",
      explanation: "Moverte por España en tren, autobús o coche de alquiler depende de tu ruta. Renfe cubre alta velocidad y regional; ALSA los autobuses de larga distancia; coches de alquiler en aeropuertos y ciudades."
    }
  },
  "vacation-booking": {
    en: {
      process: "Accommodation booking platforms for Spain",
      explanation: "Compare accommodation booking platforms before reserving in Spain. Check cancellation policies, neighbourhood location, and total price including fees before committing to any reservation."
    },
    es: {
      process: "Plataformas de reserva de alojamiento en España",
      explanation: "Compara plataformas de reserva antes de reservar alojamiento en España. Revisa política de cancelación, zona y precio total con tasas incluidas antes de confirmar cualquier reserva."
    }
  },
  "vacation-hotels": {
    en: {
      process: "Hotel chains in Spain — where to stay",
      explanation: "Spain has a wide range of hotel chains from budget to luxury. Major brands include Meliá, NH, Barceló, Riu, Iberostar, Marriott, and Hilton, with properties in cities, beaches, and resort destinations."
    },
    es: {
      process: "Cadenas hoteleras en España — dónde alojarse",
      explanation: "España cuenta con una amplia variedad de cadenas hoteleras de económico a lujo. Las principales marcas incluyen Meliá, NH, Barceló, Riu, Iberostar, Marriott y Hilton, con hoteles en ciudades, playas y resorts."
    }
  },
  "vacation-tourism": {
    en: {
      process: "Official tourism in Spain — destinations and planning",
      explanation: "Spain's official tourism portal covers destinations, regions, and trip ideas across the country. Paradores offer unique stays in historic buildings — castles, monasteries, and palaces — across Spain."
    },
    es: {
      process: "Turismo oficial en España — destinos y planificación",
      explanation: "El portal oficial de turismo de España cubre destinos, regiones e ideas de viaje por todo el país. Los Paradores ofrecen estancias únicas en edificios históricos — castillos, monasterios y palacios — por toda España."
    }
  },
  "vacation-reviews": {
    en: {
      process: "Travel reviews and comparison tools for Spain",
      explanation: "Use review platforms to compare hotels, neighborhoods, and experiences before booking a trip to Spain. Cross-reference more than one platform when a deal looks unusually good or reviews seem inconsistent."
    },
    es: {
      process: "Reseñas y comparadores para viajes a España",
      explanation: "Usa plataformas de reseñas para comparar hoteles, zonas y experiencias antes de reservar tu viaje a España. Contrasta más de una plataforma si una oferta parece inusualmente buena o las reseñas son inconsistentes."
    }
  }
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Trim to maxLen, preferring a sentence boundary so descriptions don't end mid-thought.
function trimAtWord(str, maxLen = 160) {
  if (str.length <= maxLen) return str;
  const cut = str.slice(0, maxLen);
  const sentenceEnds = [...cut.matchAll(/[.?!](?= )/g)];
  const lastEnd = sentenceEnds.length ? sentenceEnds[sentenceEnds.length - 1].index : -1;
  if (lastEnd > 80) return cut.slice(0, lastEnd + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}

function guideUrl(id, lang) {
  const prefix = LANGS[lang];
  return `${SITE_URL}/guides/${prefix}${id}/`;
}

function generatePage(id, lang, meta, template) {
  const url = guideUrl(id, lang);
  const title = escapeAttr(`${meta.process} — IberiGo`);
  const description = escapeAttr(trimAtWord(meta.explanation));

  const hreflangLinks = Object.keys(LANGS)
    .map((l) => `    <link rel="alternate" hreflang="${l}" href="${guideUrl(id, l)}" />`)
    .join("\n");
  const xDefault = `    <link rel="alternate" hreflang="x-default" href="${guideUrl(id, "en")}" />`;
  const base = `    <base href="/" />`;

  let html = template;

  // Add data-guide-id / data-guide-lang on the root <html> element, and set the page language
  html = html.replace(/<html([^>]*)>/, `<html$1 data-guide-id="${id}" data-guide-lang="${lang}">`);
  html = html.replace(/<html lang="en"/, `<html lang="${lang}"`);

  // Inject <base> + hreflang immediately after the opening <head> tag.
  // base must come before any URL-referencing elements; replace only the tag itself.
  html = html.replace("<head>", `<head>\n${base}\n${hreflangLinks}\n${xDefault}`);

  // Swap canonical (template carries the homepage canonical)
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`
  );

  // Swap og:locale per language
  html = html.replace(
    /<meta property="og:locale" content="[^"]*" \/>/,
    `<meta property="og:locale" content="${lang === "es" ? "es_ES" : "en_US"}" />`
  );

  // Swap title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Swap meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`
  );

  // Swap OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`
  );

  return html;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
fs.mkdirSync(GUIDES_DIR, { recursive: true });

const generatedUrls = [];

for (const [id, guide] of Object.entries(GUIDES)) {
  for (const [lang, prefix] of Object.entries(LANGS)) {
    const meta = guide[lang];
    if (!meta) continue;

    const dir = path.join(GUIDES_DIR, ...(prefix ? prefix.split("/").filter(Boolean) : []), id);
    fs.mkdirSync(dir, { recursive: true });

    const html = generatePage(id, lang, meta, template);
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");

    generatedUrls.push(guideUrl(id, lang));
    process.stdout.write(`  ✓ /guides/${prefix}${id}/\n`);
  }
}

// ── sitemap.xml ───────────────────────────────────────────────────────────────

const today = new Date().toISOString().split("T")[0];

const sitemapEntries = [
  `  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n    <lastmod>${today}</lastmod>\n  </url>`,
  ...STATIC_URLS.map(
    (path) =>
      `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n    <lastmod>${today}</lastmod>\n  </url>`
  ),
  ...generatedUrls.map(
    (url) =>
      `  <url>\n    <loc>${url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>${today}</lastmod>\n  </url>`
  )
].join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");

console.log(`\n✓ sitemap.xml — ${generatedUrls.length + STATIC_URLS.length + 1} URLs (homepage + ${STATIC_URLS.length} static pages + ${generatedUrls.length} guide pages)`);
console.log(`✓ ${generatedUrls.length} guide files written to /guides/`);
