(() => {
  if (window.__iberigoRoadmapStaticCompletenessLoaded) return;
  window.__iberigoRoadmapStaticCompletenessLoaded = true;

  const urls = {
    highlyQualified: "https://www.inclusion.gob.es/en/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados",
    ict: "https://prie.comercio.gob.es/es-es/Paginas/Traslado-EMpresarial.aspx",
    seasonal: "https://www.inclusion.gob.es/en/web/migraciones/w/23.-autorizacion-de-residencia-temporal-y-trabajo-para-actividades-de-temporada",
    entrepreneur: "https://prie.comercio.gob.es/es-es/Paginas/Emprendedores.aspx",
    research: "https://www.inclusion.gob.es/en/web/migraciones/w/68.-autorizacion-de-residencia-temporal-y-trabajo-para-investigacion",
    internship: "https://www.inclusion.gob.es/en/web/migraciones/w/21.-autorizacion-de-residencia-para-practicas",
    catalogue: "https://www.inclusion.gob.es/web/migraciones/listado-completo",
    studentWork: "https://ciudadaniaexterior.inclusion.gob.es/web/migraciones/w/hoja-4-bis-acceso-al-empleo-de-las-personas-titulares-de-una-autorizacion-de-estancia-de-larga-duracion-por-estudios-movilidad-de-alumnos-servicios-de-voluntariado-o-actividades-formativas"
  };

  const lang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const copy = lang === "es" ? {
    specialistTitle: "Vías de trabajo especializado que debes comparar",
    specialistIntro: "Si tu empleo encaja en alta cualificación, traslado de empresa, temporada, investigación, emprendimiento innovador o prácticas, no des por hecho que corresponde la vía ordinaria EX-03.",
    regular: "Empleo ordinario",
    regularText: "Empresa española → EX-03 / Mercurio cuando corresponda → tasas → visado → Seguridad Social → TIE.",
    self: "Autónomo ordinario",
    selfText: "EX-07 → consulado español competente → tasas → visado → Seguridad Social → TIE. Un proyecto innovador puede encajar mejor en la vía de emprendedores UGE.",
    digitalTitle: "Empleado remoto y profesional remoto no siguen exactamente la misma regla",
    digitalText: "Cuenta ajena: empresa fuera de España. Profesional/autónomo: puede existir actividad española dentro del límite oficial del 20 %. Desde fuera se usa el consulado; si estás legalmente en España, UGE-CE.",
    studentTitle: "Dos vías de solicitud para estudios de más de 90 días",
    studentText: "Desde fuera: consulado competente. Desde España: determinados adultos en situación regular y estudios superiores pueden presentar por Extranjería/Mercurio si cumplen los requisitos y plazos. Cuando se permite trabajar, la actividad debe ser compatible y normalmente no superar 30 horas semanales.",
    familyTitle: "Si el familiar que te reúne es español, no uses automáticamente EX-19",
    familyText: "La vía general actual es EX-24. EX-19 puede aplicar en un caso de retorno si la persona española ejerció realmente la libre circulación en otro país UE/EEE. Comprueba esa excepción antes de presentar.",
    specialTitle: "¿Ninguna de estas vías describe tu caso?",
    specialText: "No fuerces tu situación dentro de una ruta normal. Para residencia previa, larga duración-UE, arraigo, circunstancias excepcionales, protección u otras categorías, usa el catálogo oficial completo de Migraciones.",
    official: "Fuente oficial",
    highly: "Alta cualificación / Tarjeta Azul UE",
    highlyText: "Empresa o entidad legitimada → UGE-CE → 790-038 → visado si procede → TIE.",
    ict: "Traslado intraempresarial",
    ictText: "ICT-UE o vía nacional para traslados dentro de la misma empresa o grupo, por UGE-CE.",
    seasonal: "Trabajo de temporada",
    seasonalText: "Empleador → EX-06 / Mercurio → tasas → visado → alta SS → TIE.",
    entrepreneur: "Emprendimiento innovador",
    entrepreneurText: "Proyecto innovador de especial interés; vía UGE/PRIE, distinta del autónomo ordinario.",
    research: "Investigación / I+D+i",
    researchText: "Entidad de acogida → UGE-CE → 790-038 → visado si procede → TIE.",
    internship: "Prácticas",
    internshipText: "Entidad de acogida → Mercurio → 790-052 → visado si procede → TIE.",
    compareEntrepreneur: "Compara con la vía oficial de emprendedores →",
    studentLink: "Ver reglas oficiales de trabajo para estudiantes →",
    catalogueLink: "Abrir catálogo oficial completo →"
  } : {
    specialistTitle: "Specialist work routes you should compare",
    specialistIntro: "If your job fits highly qualified work, a company transfer, seasonal work, research, an innovative entrepreneur project or an internship, do not assume the ordinary EX-03 route is the right one.",
    regular: "Ordinary Spanish employment",
    regularText: "Spanish employer → EX-03 / Mercurio where applicable → fees → visa → Social Security → TIE.",
    self: "Ordinary self-employment",
    selfText: "EX-07 → competent Spanish consulate → fees → visa → Social Security → TIE. An innovative project may fit the separate UGE entrepreneur route instead.",
    digitalTitle: "Remote employees and remote professionals do not have exactly the same rule",
    digitalText: "Employee: employer outside Spain. Professional/self-employed: Spanish activity can be possible within the official 20% limit. Apply through the consulate from abroad or UGE-CE when legally in Spain.",
    studentTitle: "Two application paths for studies over 90 days",
    studentText: "From abroad: competent Spanish consulate. From Spain: qualifying adult higher-education applicants in regular status can apply through Extranjería/Mercurio if the conditions and deadlines are met. Where student work is allowed, it must remain compatible and generally stay within 30 hours per week.",
    familyTitle: "If the sponsor is Spanish, do not automatically use EX-19",
    familyText: "The current general route is EX-24. EX-19 may apply to a genuine EU free-movement return case where the Spanish citizen previously exercised free-movement rights in another EU/EEA country. Check that exception before filing.",
    specialTitle: "None of these routes describes your situation?",
    specialText: "Do not force a special case into a normal route. For previous residence, long-term EU status, arraigo, exceptional circumstances, protection or other categories, use the complete official Migraciones catalogue.",
    official: "Official source",
    highly: "Highly qualified / EU Blue Card",
    highlyText: "Employer/authorised entity → UGE-CE → 790-038 → visa if required → TIE.",
    ict: "Intra-company transfer",
    ictText: "EU-ICT or national route for transfers within the same company/group, through UGE-CE.",
    seasonal: "Seasonal work",
    seasonalText: "Employer → EX-06 / Mercurio → fees → visa → Social Security → TIE.",
    entrepreneur: "Innovative entrepreneur",
    entrepreneurText: "Innovative project of special economic interest; UGE/PRIE route, separate from ordinary self-employment.",
    research: "Research / R&D",
    researchText: "Host entity → UGE-CE → 790-038 → visa if required → TIE.",
    internship: "Internship residence",
    internshipText: "Host entity → Mercurio → 790-052 → visa if required → TIE.",
    compareEntrepreneur: "Compare the official entrepreneur route →",
    studentLink: "See official student-work rules →",
    catalogueLink: "Open the complete official catalogue →"
  };

  const externalCard = (href, title, text) => `<article class="guide-info-card guide-source-card guide-source-card--government"><div class="guide-source-head"><span class="guide-source-badge" aria-hidden="true">ES</span><span class="guide-source-tag">${copy.official}</span></div><h3><a href="${href}" target="_blank" rel="noopener noreferrer">${title}</a></h3><p>${text}</p></article>`;
  const injectAfter = (selector, html, key) => {
    if (document.querySelector(`[data-roadmap-completeness="${key}"]`)) return;
    const target = document.querySelector(selector);
    if (!target) return;
    target.insertAdjacentHTML("afterend", html.replace("<section ", `<section data-roadmap-completeness="${key}" `));
  };
  const appendBox = (selector, html, key) => {
    if (document.querySelector(`[data-roadmap-completeness="${key}"]`)) return;
    const target = document.querySelector(selector);
    if (!target) return;
    target.insertAdjacentHTML("beforeend", `<div data-roadmap-completeness="${key}" class="guide-box guide-box--info">${html}</div>`);
  };

  const path = location.pathname.replace(/\/$/, "");
  const prefix = path.startsWith("/es/") ? "/es" : "";
  const workPath = `${prefix}/moving-to-spain/work-in-spain`;
  const nonEuPath = `${prefix}/moving-to-spain/non-eu-citizens`;
  const selfPath = `${prefix}/moving-to-spain/self-employed-spain`;
  const digitalPath = `${prefix}/moving-to-spain/digital-nomad-spain`;
  const studentPath = `${prefix}/moving-to-spain/students`;
  const familyPath = `${prefix}/moving-to-spain/family-reunification`;
  const euFamilyPath = `${prefix}/moving-to-spain/family-member-eu-citizen`;

  if (path === workPath || path === nonEuPath) {
    const html = `<section class="guide-section" aria-labelledby="specialistWorkRoutes"><h2 id="specialistWorkRoutes">${copy.specialistTitle}</h2><p>${copy.specialistIntro}</p><div class="guide-card-grid">
      ${externalCard(urls.highlyQualified, copy.highly, copy.highlyText)}
      ${externalCard(urls.ict, copy.ict, copy.ictText)}
      ${externalCard(urls.seasonal, copy.seasonal, copy.seasonalText)}
      ${externalCard(urls.entrepreneur, copy.entrepreneur, copy.entrepreneurText)}
      ${externalCard(urls.research, copy.research, copy.researchText)}
      ${externalCard(urls.internship, copy.internship, copy.internshipText)}
    </div><div class="guide-box guide-box--info"><strong>${copy.regular}</strong><p>${copy.regularText}</p></div><div class="guide-box guide-box--info"><strong>${copy.self}</strong><p>${copy.selfText}</p></div></section>`;
    injectAfter(path === workPath ? '[aria-labelledby="nonEuCitizensWorking"]' : '[aria-labelledby="chooseYourRoute"]', html, "specialist-work-static");
  }

  if (path === selfPath) appendBox('[aria-labelledby="nonEuCitizensSelfEmployment"]', `<strong>${copy.self}</strong><p>${copy.selfText}</p><p><a href="${urls.entrepreneur}" target="_blank" rel="noopener noreferrer">${copy.compareEntrepreneur}</a></p>`, "self-route-static");
  if (path === digitalPath) appendBox('[aria-labelledby="digitalNomadVsEmployeeVsSelfEmployed"]', `<strong>${copy.digitalTitle}</strong><p>${copy.digitalText}</p>`, "digital-rule-static");
  if (path === studentPath) appendBox('[aria-labelledby="nonEuStudents"]', `<strong>${copy.studentTitle}</strong><p>${copy.studentText}</p><p><a href="${urls.studentWork}" target="_blank" rel="noopener noreferrer">${copy.studentLink}</a></p>`, "student-path-static");
  if (path === familyPath || path === euFamilyPath) appendBox('[aria-labelledby="quickAnswer"]', `<strong>${copy.familyTitle}</strong><p>${copy.familyText}</p>`, "family-spanish-static");
  if (path === nonEuPath) appendBox('[aria-labelledby="chooseYourRoute"]', `<strong>${copy.specialTitle}</strong><p>${copy.specialText}</p><p><a href="${urls.catalogue}" target="_blank" rel="noopener noreferrer">${copy.catalogueLink}</a></p>`, "special-cases-static");
})();
