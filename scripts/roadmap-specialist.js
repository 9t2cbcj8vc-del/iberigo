(() => {
  if (typeof routes === "undefined" || typeof roadmapDetails === "undefined" || typeof wizard === "undefined") return;
  if (window.__iberigoRoadmapCompletenessLoaded) return;
  window.__iberigoRoadmapCompletenessLoaded = true;

  const addOrReplaceRoute = (route) => {
    const existing = routes.find((item) => item.id === route.id);
    if (existing) Object.assign(existing, route);
    else routes.push(route);
  };

  const en = {
    goalWorkSpecialist: "Specialist work / mobility route",
    goalWorkSpecialistDesc: "Highly qualified, EU Blue Card, company transfer, seasonal, research, entrepreneur or internship routes.",
    goalSpecialCase: "Other or special situation",
    goalSpecialCaseDesc: "For cases such as previous residence, long-term EU status, exceptional circumstances or another uncommon route.",
    familySpanishStandard: "Spanish citizen — standard Spanish-family route",
    familySpanishStandardDesc: "Normally the EX-24 family member of a Spanish national route.",
    familySpanishEuReturn: "Spanish citizen — EU free-movement return case",
    familySpanishEuReturnDesc: "Only if the Spanish citizen genuinely exercised EU free-movement rights in another EU/EEA country before returning to Spain."
  };
  const es = {
    goalWorkSpecialist: "Trabajo especializado / movilidad",
    goalWorkSpecialistDesc: "Alta cualificación, Tarjeta Azul UE, traslado empresarial, temporada, investigación, emprendimiento o prácticas.",
    goalSpecialCase: "Otro caso o situación especial",
    goalSpecialCaseDesc: "Para residencia previa, estatuto de residente de larga duración-UE, circunstancias excepcionales u otra vía menos común.",
    familySpanishStandard: "Ciudadano español — vía familiar española estándar",
    familySpanishStandardDesc: "Normalmente la autorización EX-24 de familiar de persona española.",
    familySpanishEuReturn: "Ciudadano español — retorno bajo libre circulación UE",
    familySpanishEuReturnDesc: "Solo si la persona española ejerció realmente la libre circulación en otro país UE/EEE antes de volver a España."
  };
  Object.assign(translations.en, en);
  Object.assign(translations.es, es);

  window.urls = window.urls || {};
  Object.assign(window.urls, {
    "specialist-highly-qualified": "https://www.inclusion.gob.es/en/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados",
    "specialist-ict": "https://prie.comercio.gob.es/es-es/Paginas/Traslado-EMpresarial.aspx",
    "specialist-seasonal": "https://www.inclusion.gob.es/en/web/migraciones/w/23.-autorizacion-de-residencia-temporal-y-trabajo-para-actividades-de-temporada",
    "specialist-entrepreneur": "https://prie.comercio.gob.es/es-es/Paginas/Emprendedores.aspx",
    "specialist-research": "https://www.inclusion.gob.es/en/web/migraciones/w/68.-autorizacion-de-residencia-temporal-y-trabajo-para-investigacion",
    "specialist-internship": "https://www.inclusion.gob.es/en/web/migraciones/w/21.-autorizacion-de-residencia-para-practicas",
    "special-catalogue": "https://www.inclusion.gob.es/web/migraciones/listado-completo",
    "study-employment": "https://ciudadaniaexterior.inclusion.gob.es/web/migraciones/w/hoja-4-bis-acceso-al-empleo-de-las-personas-titulares-de-una-autorizacion-de-estancia-de-larga-duracion-por-estudios-movilidad-de-alumnos-servicios-de-voluntariado-o-actividades-formativas"
  });

  window.linkLabels = window.linkLabels || { en: {}, es: {} };
  window.linkLabels.en = window.linkLabels.en || {};
  window.linkLabels.es = window.linkLabels.es || {};
  Object.assign(window.linkLabels.en, {
    "specialist-highly-qualified": "Highly qualified professional / EU Blue Card",
    "specialist-ict": "Intra-company transfer (ICT)",
    "specialist-seasonal": "Seasonal work authorization",
    "specialist-entrepreneur": "Entrepreneur residence route",
    "specialist-research": "Research / R&D residence route",
    "specialist-internship": "Residence authorization for internships",
    "special-catalogue": "Complete official Migraciones catalogue",
    "study-employment": "Official student-work rules",
    consulates: "Find your consulate & application instructions"
  });
  Object.assign(window.linkLabels.es, {
    "specialist-highly-qualified": "Profesional altamente cualificado / Tarjeta Azul UE",
    "specialist-ict": "Traslado intraempresarial (ICT)",
    "specialist-seasonal": "Autorización de trabajo de temporada",
    "specialist-entrepreneur": "Residencia para emprendedores",
    "specialist-research": "Residencia para investigación / I+D+i",
    "specialist-internship": "Autorización de residencia para prácticas",
    "special-catalogue": "Catálogo oficial completo de Migraciones",
    "study-employment": "Reglas oficiales de trabajo para estudiantes",
    consulates: "Busca tu consulado e instrucciones de solicitud"
  });

  window.govMeta = window.govMeta || {};
  Object.assign(window.govMeta, {
    "specialist-highly-qualified": { subtitle: "Ministry of Inclusion — UGE/Blue Card route", variant: "general", system: "spain" },
    "specialist-ict": { subtitle: "Official PRIE intra-company transfer route", variant: "general", system: "spain" },
    "specialist-seasonal": { subtitle: "Ministry of Inclusion — EX-06 / Mercurio route", variant: "general", system: "spain" },
    "specialist-entrepreneur": { subtitle: "Official PRIE entrepreneur route", variant: "general", system: "spain" },
    "specialist-research": { subtitle: "Ministry of Inclusion — research / UGE route", variant: "general", system: "spain" },
    "specialist-internship": { subtitle: "Ministry of Inclusion — internship residence route", variant: "general", system: "spain" },
    "special-catalogue": { subtitle: "Ministry of Inclusion — all immigration procedures", variant: "general", system: "spain" },
    "study-employment": { subtitle: "Ministry of Inclusion — work access during long-stay study", variant: "general", system: "spain" }
  });

  const ensureGoalChoice = (value, afterValue, titleKey, descKey, cardName) => {
    if (wizard.querySelector(`input[name="goal"][value="${value}"]`)) return;
    const source = wizard.querySelector(`input[name="goal"][value="${afterValue}"]`)?.closest("label");
    if (!source) return;
    const label = source.cloneNode(true);
    const input = label.querySelector("input");
    const span = label.querySelector("span");
    const small = label.querySelector("small");
    input.value = value;
    input.checked = false;
    label.dataset.goalCard = cardName;
    if (span) span.dataset.i18n = titleKey;
    if (small) small.dataset.i18n = descKey;
    source.after(label);
  };

  ensureGoalChoice("workSpecialist", "workSelf", "goalWorkSpecialist", "goalWorkSpecialistDesc", "work-specialist");
  ensureGoalChoice("specialCase", "family", "goalSpecialCase", "goalSpecialCaseDesc", "special-case");

  const spanishStandard = wizard.querySelector('input[name="familySponsor"][value="spanishCitizen"]')?.closest("label");
  if (spanishStandard) {
    const span = spanishStandard.querySelector("span");
    const small = spanishStandard.querySelector("small");
    if (span) span.dataset.i18n = "familySpanishStandard";
    if (small) small.dataset.i18n = "familySpanishStandardDesc";
    if (!wizard.querySelector('input[name="familySponsor"][value="spanishCitizenEuReturn"]')) {
      const label = spanishStandard.cloneNode(true);
      const input = label.querySelector("input");
      const newSpan = label.querySelector("span");
      const newSmall = label.querySelector("small");
      input.value = "spanishCitizenEuReturn";
      input.checked = false;
      if (newSpan) newSpan.dataset.i18n = "familySpanishEuReturn";
      if (newSmall) newSmall.dataset.i18n = "familySpanishEuReturnDesc";
      spanishStandard.after(label);
    }
  }

  const syncCompletenessChoices = () => {
    const isEu = typeof getValue === "function" && getValue("personType") === "eu";
    ["workSpecialist", "specialCase"].forEach((value) => {
      const label = wizard.querySelector(`input[name="goal"][value="${value}"]`)?.closest("label");
      if (!label) return;
      label.hidden = isEu;
      const input = label.querySelector("input");
      if (isEu && input?.checked) input.checked = false;
    });
  };
  syncCompletenessChoices();
  wizard.addEventListener("change", (event) => {
    if (event.target?.name === "personType") {
      syncCompletenessChoices();
      if (typeof applyTranslations === "function") applyTranslations();
    }
  });

  addOrReplaceRoute({
    id: "work-specialist",
    title: "Specialist work and mobility routes",
    badge: "Non-EU specialist routes",
    summary: "Use this comparison when a normal EX-03 job or EX-07 self-employed route may not fit. Spain has separate routes for highly qualified professionals / EU Blue Card, intra-company transfers, seasonal work, innovative entrepreneurs, research and internships.",
    appointment: "UGE-CE, Mercurio or the competent Spanish consulate depending on the specialist route",
    documents: ["Passport", "Employer / host / project evidence", "Qualifications or experience where required", "Route-specific application form", "Applicable authorization fee", "Visa and TIE documents where required"]
  });
  addOrReplaceRoute({
    id: "spanish-eu-return-family",
    title: "Spanish citizen returning under EU free-movement rules",
    badge: "Check EX-19 applicability",
    summary: "A non-EU family member of a Spanish citizen normally uses EX-24. A Spanish citizen who genuinely exercised EU free-movement rights in another EU/EEA country before returning to Spain may instead fall under the EU-family EX-19 route. Confirm that EU law applies before filing.",
    appointment: "EU-family residence-card route if the free-movement conditions are met",
    documents: ["EX-19 if EU free-movement rules apply", "Passports / Spanish ID", "Evidence of the family relationship", "Evidence of the Spanish citizen's genuine residence / free movement in another EU/EEA state", "790-012 where applicable"]
  });
  addOrReplaceRoute({
    id: "special-cases",
    title: "Other or special immigration situation",
    badge: "Official catalogue",
    summary: "IberiGo covers the main planned-move routes. Use the complete official Migraciones catalogue if your case involves previous Spanish residence, long-term EU residence from another Member State, exceptional circumstances, arraigo, humanitarian/protection status, or another specialist procedure.",
    appointment: "Depends on the specific official procedure",
    documents: ["Identify your current legal status", "Open the official procedure matching that status", "Follow only the form, fee and filing channel listed for that procedure"]
  });

  roadmapDetails["work-specialist"] = {
    process: "Choose the correct specialist work or mobility route",
    explanation: `<p><strong>Do not default to EX-03 if one of these descriptions fits better.</strong> Spain has separate procedures with different filing bodies, forms, fees and timelines.</p>
      <div class="guide-card-grid">
        <article class="guide-info-card"><h3>Highly qualified / EU Blue Card</h3><p>For qualifying high-skilled employment. The company or authorised entity files electronically through UGE-CE using the international-mobility process. Modelo 790-038 applies. Check the current qualification, contract and salary rules before choosing the national highly-qualified or EU Blue Card modality.</p></article>
        <article class="guide-info-card"><h3>Intra-company transfer</h3><p>For managers, specialists or trainees transferred within the same company or corporate group. The EU-ICT or national ICT route is handled through UGE-CE rather than the ordinary EX-03 path.</p></article>
        <article class="guide-info-card"><h3>Seasonal work</h3><p>For qualifying seasonal employment. The employer files EX-06 through Mercurio, with 790-052 and applicable 790-062. The authorization is designed around recurring seasonal activity and return obligations.</p></article>
        <article class="guide-info-card"><h3>Innovative entrepreneur</h3><p>For an innovative entrepreneurial project of special economic interest. This is not the same as an ordinary autónomo / EX-07 application. The entrepreneur route is handled through the UGE-CE / PRIE framework.</p></article>
        <article class="guide-info-card"><h3>Research / R&amp;D / university</h3><p>For qualifying researchers, R&amp;D personnel and certain university or higher-education staff. The host entity files through UGE-CE and Modelo 790-038 applies.</p></article>
        <article class="guide-info-card"><h3>Internship / trainee residence</h3><p>For qualifying graduate internships based on an internship agreement or training contract. The host entity files electronically through Mercurio; 790-052 applies, followed by a visa if the applicant is abroad and a TIE when required.</p></article>
      </div>`,
    difficulty: "Varies by route",
    timeline: "Varies: specialist procedures range from fast UGE decisions to route-specific Extranjería processing",
    steps: [
      "Match the job, transfer, host entity or project to the specialist category above before filing anything.",
      "Open the official route and confirm the exact eligibility, applicant/filing party, form and supporting documents.",
      "Use UGE-CE for highly qualified, intra-company, entrepreneur and qualifying research routes; use Mercurio where the official seasonal or internship route requires it.",
      "Pay the authorization-stage fee shown by the official route (commonly 790-038 for UGE mobility or 790-052/062 for relevant Extranjería work routes).",
      "If applying from abroad, complete the Spanish consular visa step after authorization where required.",
      "After entry or approval, complete Social Security registration where relevant and the TIE step within the applicable deadline."
    ],
    documents: ["Passport", "Employer / host / project evidence", "Qualifications / professional experience", "Route-specific application", "Authorization fee evidence", "Visa / EX-17 / TIE evidence where applicable"],
    links: ["specialist-highly-qualified", "specialist-ict", "specialist-seasonal", "specialist-entrepreneur", "specialist-research", "specialist-internship", "uge-apply", "mercurio", "790-038", "790-052", "790-062", "consulates", "cita", "790-012"]
  };

  roadmapDetailsEs["work-specialist"] = {
    process: "Elige la vía correcta de trabajo especializado o movilidad",
    explanation: `<p><strong>No uses EX-03 por defecto si encajas mejor en una de estas vías.</strong> España tiene procedimientos separados con distintos órganos, formularios, tasas y plazos.</p>
      <div class="guide-card-grid">
        <article class="guide-info-card"><h3>Alta cualificación / Tarjeta Azul UE</h3><p>Para empleo cualificado que cumpla los requisitos. La empresa o entidad legitimada presenta por UGE-CE mediante movilidad internacional. Se utiliza la tasa 790-038. Comprueba la titulación, contrato y umbral salarial vigentes.</p></article>
        <article class="guide-info-card"><h3>Traslado intraempresarial</h3><p>Para directivos, especialistas o trabajadores en formación trasladados dentro de la misma empresa o grupo. La vía ICT-UE o nacional se tramita por UGE-CE.</p></article>
        <article class="guide-info-card"><h3>Trabajo de temporada</h3><p>Para empleo estacional. El empleador presenta EX-06 por Mercurio, con 790-052 y 790-062 cuando corresponda.</p></article>
        <article class="guide-info-card"><h3>Emprendimiento innovador</h3><p>Para un proyecto innovador de especial interés económico. No es lo mismo que la vía ordinaria de autónomo EX-07; se encuadra en UGE-CE / PRIE.</p></article>
        <article class="guide-info-card"><h3>Investigación / I+D+i / universidad</h3><p>Para investigadores, personal I+D+i y determinados puestos universitarios. La entidad de acogida presenta por UGE-CE y se aplica 790-038.</p></article>
        <article class="guide-info-card"><h3>Prácticas</h3><p>Para determinadas prácticas de titulados con convenio o contrato de formación. La entidad de acogida presenta por Mercurio; se aplica 790-052, visado si se está fuera y TIE cuando corresponda.</p></article>
      </div>`,
    difficulty: "Variable según la vía",
    timeline: "Variable según el procedimiento",
    steps: [
      "Identifica primero qué categoría especializada corresponde a tu empleo, traslado, entidad de acogida o proyecto.",
      "Abre la hoja oficial y confirma requisitos, sujeto que presenta, formulario y documentos.",
      "Usa UGE-CE para alta cualificación, traslado intraempresarial, emprendimiento y determinadas vías de investigación; usa Mercurio para temporada o prácticas cuando lo indique la hoja oficial.",
      "Paga la tasa de autorización correspondiente (habitualmente 790-038 en movilidad UGE o 790-052/062 en las vías de Extranjería aplicables).",
      "Si estás fuera de España, completa el visado consular tras la autorización cuando sea necesario.",
      "Tras la entrada o aprobación, completa Seguridad Social cuando corresponda y la TIE dentro del plazo aplicable."
    ],
    documents: ["Pasaporte", "Pruebas del empleador/entidad/proyecto", "Titulación o experiencia", "Solicitud de la vía concreta", "Justificante de tasas", "Visado / EX-17 / TIE cuando proceda"],
    links: ["specialist-highly-qualified", "specialist-ict", "specialist-seasonal", "specialist-entrepreneur", "specialist-research", "specialist-internship", "uge-apply", "mercurio", "790-038", "790-052", "790-062", "consulates", "cita", "790-012"]
  };

  roadmapDetails["spanish-eu-return-family"] = {
    process: "Check whether the EX-19 EU-family route applies to a returning Spanish citizen",
    explanation: "<p><strong>Normal rule:</strong> a non-EU family member joining a Spanish citizen normally uses the dedicated EX-24 Spanish-family authorization.</p><p><strong>Possible EU-law exception:</strong> if the Spanish citizen genuinely exercised EU free-movement rights by residing in another EU/EEA country and is returning to Spain, EU free-movement rules may apply and EX-19 can be the relevant family-card route. Do not select EX-19 only because the sponsor is Spanish; verify the free-movement history first.</p>",
    difficulty: "Medium — route selection matters",
    timeline: "Depends on whether EU free-movement rules apply",
    steps: ["Document the Spanish citizen's genuine residence / free-movement history in another EU/EEA state.", "Confirm from the official EU-family guidance that the return case falls under EU free-movement law.", "If it does, prepare EX-19 and the family/residence evidence; if it does not, use the standard EX-24 Spanish-family route.", "Follow the competent filing / appointment instructions and pay the applicable 790-012 card fee where required."],
    documents: ["EX-19 if EU law applies", "Passport of the non-EU family member", "Spanish DNI/passport", "Family relationship evidence", "Proof of genuine prior EU/EEA residence / free movement", "790-012 where applicable"],
    links: ["eu-family-official", "cita", "790-012", "spanish-family-official", "ex24"]
  };

  roadmapDetailsEs["spanish-eu-return-family"] = {
    process: "Comprueba si se aplica EX-19 al retorno de un ciudadano español",
    explanation: "<p><strong>Regla general:</strong> el familiar no comunitario de una persona española utiliza normalmente la autorización específica EX-24.</p><p><strong>Posible excepción de Derecho UE:</strong> si la persona española ejerció realmente la libre circulación residiendo en otro país UE/EEE y vuelve a España, pueden resultar aplicables las normas de libre circulación y la vía EX-19. No elijas EX-19 solo porque el familiar sea español: confirma primero el historial de libre circulación.</p>",
    difficulty: "Media — es importante elegir bien la vía",
    timeline: "Depende de que se aplique o no libre circulación UE",
    steps: ["Reúne prueba de la residencia real / libre circulación de la persona española en otro Estado UE/EEE.", "Confirma en la información oficial que el caso de retorno está cubierto por Derecho UE.", "Si se aplica, prepara EX-19 y pruebas familiares/residencia; si no, utiliza la vía estándar EX-24.", "Sigue las instrucciones de presentación/cita y paga 790-012 cuando corresponda."],
    documents: ["EX-19 si se aplica Derecho UE", "Pasaporte del familiar", "DNI/pasaporte español", "Prueba del vínculo", "Prueba de residencia previa real en UE/EEE", "790-012 cuando proceda"],
    links: ["eu-family-official", "cita", "790-012", "spanish-family-official", "ex24"]
  };

  roadmapDetails["special-cases"] = {
    process: "Find the official procedure for a special or previous-status case",
    explanation: "<p><strong>This is an escape route, not a generic visa.</strong> IberiGo's main wizard focuses on ordinary planned moves. If your case involves a previous Spanish authorization, long-term EU status issued by another Member State, exceptional circumstances, arraigo, humanitarian/protection status, a minor-specific procedure or another unusual category, use the official Migraciones catalogue rather than forcing your case into a normal work/study/family route.</p>",
    difficulty: "Depends on the procedure",
    timeline: "Depends on the procedure",
    steps: ["Identify your current legal status and the reason you need a new or modified authorization.", "Open the complete official Migraciones catalogue and choose the sheet matching that status and purpose.", "Use only the form, fee, filing channel and deadline stated on that official sheet; seek professional immigration advice if the classification remains unclear."],
    documents: ["Current passport", "Current/previous Spanish authorization or EU long-term card if any", "Evidence relevant to the specific official procedure"],
    links: ["special-catalogue"]
  };
  roadmapDetailsEs["special-cases"] = {
    process: "Localiza el procedimiento oficial para un caso especial o de estatus previo",
    explanation: "<p><strong>Esta es una vía de salida, no un visado genérico.</strong> El asistente principal de IberiGo se centra en mudanzas planificadas habituales. Si tu caso implica una autorización española anterior, residencia de larga duración-UE expedida por otro Estado miembro, circunstancias excepcionales, arraigo, protección/humanitario, procedimientos de menores u otra categoría poco habitual, utiliza el catálogo oficial de Migraciones.</p>",
    difficulty: "Depende del procedimiento",
    timeline: "Depende del procedimiento",
    steps: ["Identifica tu situación legal actual y el motivo del nuevo trámite o modificación.", "Abre el catálogo oficial completo y elige la hoja que corresponda a tu situación y objetivo.", "Utiliza únicamente el formulario, tasa, canal y plazo que indique esa hoja; busca asesoramiento profesional si sigue sin estar clara la clasificación."],
    documents: ["Pasaporte vigente", "Autorización española anterior/actual o tarjeta de larga duración-UE si existe", "Pruebas específicas del procedimiento"],
    links: ["special-catalogue"]
  };

  if (roadmapDetails["study-abroad"]) {
    roadmapDetails["study-abroad"].explanation = "<p><strong>Apply from abroad:</strong> for qualifying studies over 90 days, start through the Spanish consulate responsible for your legal residence. Use that consulate's own filing/appointment instructions because local booking systems and visa-fee collection differ.</p><p><strong>Fees:</strong> the long-stay study authorization has an applicable 790-052 fee under the central procedure, while the consular visa process can also have its own visa fee. Follow the competent consulate's instructions for how and when each payment is made.</p><p><strong>Work while studying:</strong> where the student-work rules apply, work must remain compatible with the studies and generally cannot exceed 30 hours per week.</p>";
    roadmapDetails["study-abroad"].steps = ["Secure admission and complete any required enrolment/payment.", "Prepare passport, funds, health insurance and criminal-record / medical evidence when required.", "Find the competent Spanish consulate and follow its study-visa filing instructions, normally sufficiently before the studies begin.", "Pay the applicable authorization and consular visa fees using the method instructed for your case.", "Collect the visa if approved and enter Spain within its validity.", "If the authorized stay exceeds six months, request the TIE within the applicable post-entry deadline."];
    roadmapDetails["study-abroad"].links = ["study-official", "study-employment", "consulates", "790-052", "cita", "790-012"];
  }
  if (roadmapDetailsEs["study-abroad"]) {
    roadmapDetailsEs["study-abroad"].explanation = "<p><strong>Solicitud desde fuera:</strong> para estudios de más de 90 días, inicia el proceso en el consulado español competente por tu residencia legal. Sigue sus instrucciones propias de presentación y cita.</p><p><strong>Tasas:</strong> la autorización de estudios de larga duración tiene la tasa 790-052 que corresponda y el trámite consular puede incluir además la tasa de visado. Sigue las instrucciones del consulado sobre cuándo y cómo pagar.</p><p><strong>Trabajo durante los estudios:</strong> cuando se permita, debe ser compatible con los estudios y, con carácter general, no superar 30 horas semanales.</p>";
    roadmapDetailsEs["study-abroad"].steps = ["Obtén admisión y completa la matrícula/pago exigido.", "Prepara pasaporte, medios, seguro y antecedentes/certificado médico cuando proceda.", "Localiza el consulado competente y sigue sus instrucciones de visado de estudios con la antelación exigida.", "Abona las tasas de autorización y visado aplicables por el método indicado para tu caso.", "Recoge el visado si se aprueba y entra dentro de su vigencia.", "Si la estancia supera seis meses, solicita la TIE dentro del plazo aplicable."];
    roadmapDetailsEs["study-abroad"].links = ["study-official", "study-employment", "consulates", "790-052", "cita", "790-012"];
  }
  if (roadmapDetails["study-in-spain"]) {
    roadmapDetails["study-in-spain"].explanation += "<p><strong>Higher-education in-country applications:</strong> current rules allow qualifying adult higher-education applicants in regular status to apply from Spain, subject to the official timing and study-category conditions.</p><p><strong>Student work:</strong> where work access applies, the activity must be compatible with the studies and generally cannot exceed 30 hours per week.</p>";
    roadmapDetails["study-in-spain"].links = ["study-official", "study-employment", "mercurio", "790-052", "cita", "790-012"];
  }
  if (roadmapDetailsEs["study-in-spain"]) {
    roadmapDetailsEs["study-in-spain"].explanation += "<p><strong>Solicitud desde España para estudios superiores:</strong> las reglas actuales permiten que determinados solicitantes adultos, en situación regular y que cursen estudios superiores, presenten desde España si cumplen los requisitos y plazos oficiales.</p><p><strong>Trabajo:</strong> cuando proceda, la actividad debe ser compatible con los estudios y, con carácter general, no superar 30 horas semanales.</p>";
    roadmapDetailsEs["study-in-spain"].links = ["study-official", "study-employment", "mercurio", "790-052", "cita", "790-012"];
  }

  if (roadmapDetails["digital-nomad"]) {
    roadmapDetails["digital-nomad"].explanation = "<p><strong>Employee:</strong> the international telework route is for remote employment for companies outside Spain.</p><p><strong>Professional / self-employed applicant:</strong> professional activity for Spanish companies/clients may be possible, but it must stay within the official 20% limit of total professional activity.</p><p><strong>Where to apply:</strong> from abroad, use the competent Spanish consulate for the telework visa; if legally in Spain, use the UGE-CE residence-authorization route. A consular telework visa can be issued for up to one year or for the shorter work period where applicable.</p>";
  }
  if (roadmapDetailsEs["digital-nomad"]) {
    roadmapDetailsEs["digital-nomad"].explanation = "<p><strong>Cuenta ajena:</strong> la vía de teletrabajo internacional está pensada para empleo remoto de empresas situadas fuera de España.</p><p><strong>Profesional/autónomo:</strong> puede existir actividad para empresas o clientes españoles, pero debe mantenerse dentro del límite oficial del 20 % de la actividad profesional total.</p><p><strong>Dónde presentar:</strong> desde fuera, consulado español competente para el visado; si estás legalmente en España, autorización de residencia por UGE-CE. El visado consular puede tener hasta un año de vigencia o la duración inferior del trabajo cuando corresponda.</p>";
  }

  const priorPickRoute = pickRoute;
  pickRoute = function () {
    const personType = getValue("personType");
    const goal = getValue("goal");
    const familySponsor = getValue("familySponsor");
    if (personType !== "eu" && goal === "workSpecialist") return routes.find((route) => route.id === "work-specialist");
    if (personType !== "eu" && goal === "specialCase") return routes.find((route) => route.id === "special-cases");
    if (personType !== "eu" && goal === "family" && familySponsor === "spanishCitizenEuReturn") return routes.find((route) => route.id === "spanish-eu-return-family");
    return priorPickRoute();
  };

  if (typeof routeFormsAndTaxes !== "undefined") {
    routeFormsAndTaxes["work-specialist"] = { forms: [], taxes: [], links: roadmapDetails["work-specialist"].links };
    routeFormsAndTaxes["spanish-eu-return-family"] = { forms: [["EX-19", "EU-family residence card if EU free-movement law applies", "Form", "EX-19"]], taxes: [["790-012", "Card fee where applicable", "See Police generator", "790-012"]], links: roadmapDetails["spanish-eu-return-family"].links };
    routeFormsAndTaxes["special-cases"] = { forms: [], taxes: [], links: ["special-catalogue"] };
  }
  if (typeof routeFormsAndTaxesEs !== "undefined") {
    routeFormsAndTaxesEs["work-specialist"] = { forms: [], taxes: [], links: roadmapDetailsEs["work-specialist"].links };
    routeFormsAndTaxesEs["spanish-eu-return-family"] = { forms: [["EX-19", "Tarjeta de familiar UE si se aplica libre circulación", "Formulario", "EX-19"]], taxes: [["790-012", "Tasa de tarjeta cuando proceda", "Ver generador Policía", "790-012"]], links: roadmapDetailsEs["spanish-eu-return-family"].links };
    routeFormsAndTaxesEs["special-cases"] = { forms: [], taxes: [], links: ["special-catalogue"] };
  }

  const pageLang = document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en";
  const pageCopy = pageLang === "es" ? {
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
    specialText: "No fuerces tu situación dentro de una ruta normal. Para residencia previa, larga duración-UE, arraigo, circunstancias excepcionales, protección u otras categorías, usa el catálogo oficial completo de Migraciones."
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
    specialText: "Do not force a special case into a normal route. For previous residence, long-term EU status, arraigo, exceptional circumstances, protection or other categories, use the complete official Migraciones catalogue."
  };

  const externalCard = (href, title, text) => `<article class="guide-info-card guide-source-card guide-source-card--government"><div class="guide-source-head"><span class="guide-source-badge" aria-hidden="true">ES</span><span class="guide-source-tag">${pageLang === "es" ? "Fuente oficial" : "Official source"}</span></div><h3><a href="${href}" target="_blank" rel="noopener noreferrer">${title}</a></h3><p>${text}</p></article>`;
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
  const isEsPath = path.startsWith("/es/");
  const workPath = isEsPath ? "/es/moving-to-spain/work-in-spain" : "/moving-to-spain/work-in-spain";
  const nonEuPath = isEsPath ? "/es/moving-to-spain/non-eu-citizens" : "/moving-to-spain/non-eu-citizens";
  const selfPath = isEsPath ? "/es/moving-to-spain/self-employed-spain" : "/moving-to-spain/self-employed-spain";
  const digitalPath = isEsPath ? "/es/moving-to-spain/digital-nomad-spain" : "/moving-to-spain/digital-nomad-spain";
  const studentPath = isEsPath ? "/es/moving-to-spain/students" : "/moving-to-spain/students";
  const familyPath = isEsPath ? "/es/moving-to-spain/family-reunification" : "/moving-to-spain/family-reunification";
  const euFamilyPath = isEsPath ? "/es/moving-to-spain/family-member-eu-citizen" : "/moving-to-spain/family-member-eu-citizen";

  if (path === workPath || path === nonEuPath) {
    const specialistSection = `<section class="guide-section" aria-labelledby="specialistWorkRoutes"><h2 id="specialistWorkRoutes">${pageCopy.specialistTitle}</h2><p>${pageCopy.specialistIntro}</p><div class="guide-card-grid">
      ${externalCard(window.urls["specialist-highly-qualified"], pageLang === "es" ? "Alta cualificación / Tarjeta Azul UE" : "Highly qualified / EU Blue Card", pageLang === "es" ? "Empresa o entidad legitimada → UGE-CE → 790-038 → visado si procede → TIE." : "Employer/authorised entity → UGE-CE → 790-038 → visa if required → TIE.")}
      ${externalCard(window.urls["specialist-ict"], pageLang === "es" ? "Traslado intraempresarial" : "Intra-company transfer", pageLang === "es" ? "ICT-UE o vía nacional para traslados dentro de la misma empresa o grupo, por UGE-CE." : "EU-ICT or national route for transfers within the same company/group, through UGE-CE.")}
      ${externalCard(window.urls["specialist-seasonal"], pageLang === "es" ? "Trabajo de temporada" : "Seasonal work", pageLang === "es" ? "Empleador → EX-06 / Mercurio → tasas → visado → alta SS → TIE." : "Employer → EX-06 / Mercurio → fees → visa → Social Security → TIE.")}
      ${externalCard(window.urls["specialist-entrepreneur"], pageLang === "es" ? "Emprendimiento innovador" : "Innovative entrepreneur", pageLang === "es" ? "Proyecto innovador de especial interés; vía UGE/PRIE, distinta del autónomo ordinario." : "Innovative project of special economic interest; UGE/PRIE route, separate from ordinary self-employment.")}
      ${externalCard(window.urls["specialist-research"], pageLang === "es" ? "Investigación / I+D+i" : "Research / R&D", pageLang === "es" ? "Entidad de acogida → UGE-CE → 790-038 → visado si procede → TIE." : "Host entity → UGE-CE → 790-038 → visa if required → TIE.")}
      ${externalCard(window.urls["specialist-internship"], pageLang === "es" ? "Prácticas" : "Internship residence", pageLang === "es" ? "Entidad de acogida → Mercurio → 790-052 → visado si procede → TIE." : "Host entity → Mercurio → 790-052 → visa if required → TIE.")}
    </div><div class="guide-box guide-box--info"><strong>${pageCopy.regular}</strong><p>${pageCopy.regularText}</p></div><div class="guide-box guide-box--info"><strong>${pageCopy.self}</strong><p>${pageCopy.selfText}</p></div></section>`;
    injectAfter(path === workPath ? '[aria-labelledby="nonEuCitizensWorking"]' : '[aria-labelledby="chooseYourRoute"]', specialistSection, "specialist-work-static");
  }

  if (path === selfPath) appendBox('[aria-labelledby="nonEuCitizensSelfEmployment"]', `<strong>${pageCopy.self}</strong><p>${pageCopy.selfText}</p><p><a href="${window.urls["specialist-entrepreneur"]}" target="_blank" rel="noopener noreferrer">${pageLang === "es" ? "Compara con la vía oficial de emprendedores →" : "Compare the official entrepreneur route →"}</a></p>`, "self-route-static");
  if (path === digitalPath) appendBox('[aria-labelledby="digitalNomadVsEmployeeVsSelfEmployed"]', `<strong>${pageCopy.digitalTitle}</strong><p>${pageCopy.digitalText}</p>`, "digital-rule-static");
  if (path === studentPath) appendBox('[aria-labelledby="nonEuStudents"]', `<strong>${pageCopy.studentTitle}</strong><p>${pageCopy.studentText}</p><p><a href="${window.urls["study-employment"]}" target="_blank" rel="noopener noreferrer">${pageLang === "es" ? "Ver reglas oficiales de trabajo para estudiantes →" : "See official student-work rules →"}</a></p>`, "student-path-static");
  if (path === familyPath || path === euFamilyPath) appendBox('[aria-labelledby="quickAnswer"]', `<strong>${pageCopy.familyTitle}</strong><p>${pageCopy.familyText}</p>`, "family-spanish-static");
  if (path === nonEuPath) appendBox('[aria-labelledby="chooseYourRoute"]', `<strong>${pageCopy.specialTitle}</strong><p>${pageCopy.specialText}</p><p><a href="${window.urls["special-catalogue"]}" target="_blank" rel="noopener noreferrer">${pageLang === "es" ? "Abrir catálogo oficial completo →" : "Open the complete official catalogue →"}</a></p>`, "special-cases-static");

  if (typeof setLanguage === "function" && typeof currentLang !== "undefined") setLanguage(currentLang);
})();
