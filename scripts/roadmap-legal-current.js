(() => {
  if (
    typeof routes === "undefined" ||
    typeof roadmapDetails === "undefined" ||
    typeof roadmapDetailsEs === "undefined"
  ) return;

  const familyRoute = routes.find((route) => route.id === "family");
  if (familyRoute) {
    familyRoute.summary = "Ordinary family reunification for relatives of a non-EU legal resident in Spain. The sponsor normally files after at least one year of residence and after requesting authorization to reside for at least another year, subject to the official exceptions. Housing, sufficient means and health insurance are core requirements.";
    familyRoute.documents = [
      "Family relationship evidence",
      "Sponsor residence / renewal evidence",
      "Housing and economic means evidence",
      "Health insurance for the sponsor and family members being reunited",
      "Passports",
      "Legalized/apostilled and translated civil records where required"
    ];
  }

  roadmapDetails.family = {
    ...roadmapDetails.family,
    process: "Family reunification",
    explanation: '<p><strong>What it is:</strong> Ordinary family reunification (reagrupación familiar) lets a non-EU legal resident in Spain sponsor qualifying close relatives. It is separate from the EU-family route and from the dedicated route for family members of Spanish nationals.</p><p><strong>When the sponsor can normally file:</strong> after residing legally in Spain for at least one year and after requesting authorization to reside for at least another year. The current rules contain exceptions for specified long-term / long-term-EU situations, so check the official sheet for the sponsor\'s exact status. Where renewal or long-term status is required, the reunification authorization cannot be granted until that status is effectively renewed or granted.</p><p><strong>Core requirements:</strong> the sponsor must show sufficient regular means, adequate housing and health insurance for the sponsor and the family members being reunited.</p><p><strong>Eligible family:</strong> this can include a spouse or qualifying partner, including a properly proven stable unregistered partner where the official conditions are met, children and represented persons in the stated categories, and certain dependent ascendants or other specifically listed relatives.</p><p><strong>How it runs:</strong> the sponsor files in Spain. After approval, the family member completes the visa step where required, enters Spain and then requests the TIE.</p>',
    steps: [
      "Confirm that the sponsor is a non-EU legal resident and that ordinary family reunification is the correct route.",
      "Confirm the sponsor meets the one-year residence / requested-another-year rule or one of the official exceptions.",
      "Prepare EX-02, family relationship evidence, sponsor residence or renewal evidence, adequate-housing evidence, sufficient economic means and health insurance for the sponsor and family members being reunited.",
      "The sponsor files in Spain, including through Mercurio when using the electronic route.",
      "Pay Modelo 790-052, section 2.1.2.",
      "After approval, the family member completes the visa step at the competent Spanish consulate where required.",
      "After entry, complete the TIE step with EX-17 and 790-012."
    ],
    documents: [
      "EX-02",
      "Family relationship evidence",
      "Sponsor residence / renewal evidence",
      "Adequate-housing evidence",
      "Sufficient regular economic means",
      "Health insurance for the sponsor and family members being reunited",
      "Passports",
      "Legalized/apostilled and translated civil records where required",
      "EX-17 and 790-012 after entry"
    ]
  };

  roadmapDetailsEs.family = {
    ...roadmapDetailsEs.family,
    process: "Reagrupación familiar",
    explanation: '<p><strong>Qué es:</strong> La reagrupación familiar ordinaria permite que una persona no comunitaria residente legal en España reagrupe a determinados familiares. Es una vía distinta del régimen de familiar de ciudadano de la UE y de la autorización específica para familiares de personas españolas.</p><p><strong>Cuándo puede presentar normalmente la persona reagrupante:</strong> después de haber residido legalmente en España al menos un año y de haber solicitado autorización para residir durante al menos otro año. La normativa vigente contempla excepciones concretas para determinados supuestos de larga duración / larga duración-UE, por lo que conviene comprobar la hoja oficial según la situación del reagrupante. Cuando sea necesaria una renovación o concesión de larga duración, la autorización de reagrupación no puede concederse hasta que esa situación se haya renovado o concedido efectivamente.</p><p><strong>Requisitos básicos:</strong> deben acreditarse medios económicos fijos y regulares suficientes, vivienda adecuada y seguro de enfermedad para la persona reagrupante y los familiares reagrupados.</p><p><strong>Familiares:</strong> puede incluir cónyuge o pareja que cumpla los requisitos — incluida una pareja estable no registrada debidamente acreditada cuando proceda —, hijos y personas representadas en los supuestos previstos, y determinados ascendientes dependientes u otros familiares expresamente contemplados.</p><p><strong>Cómo funciona:</strong> la persona reagrupante presenta en España. Tras la aprobación, el familiar completa el visado cuando sea necesario, entra en España y solicita la TIE.</p>',
    steps: [
      "Confirma que quien reagrupa es residente legal no comunitario y que corresponde la reagrupación familiar ordinaria.",
      "Comprueba que cumple la regla de un año de residencia y solicitud para residir al menos otro año, o una de las excepciones oficiales.",
      "Prepara EX-02, vínculo familiar, residencia o renovación del reagrupante, vivienda adecuada, medios económicos suficientes y seguro de enfermedad para el reagrupante y los familiares reagrupados.",
      "La persona reagrupante presenta en España, también por Mercurio cuando use la vía telemática.",
      "Paga Modelo 790-052, epígrafe 2.1.2.",
      "Tras la aprobación, el familiar completa el visado en el consulado español competente cuando sea necesario.",
      "Después de la entrada, completa la TIE con EX-17 y 790-012."
    ],
    documents: [
      "EX-02",
      "Prueba del vínculo familiar",
      "Residencia / renovación de la persona reagrupante",
      "Prueba de vivienda adecuada",
      "Medios económicos fijos y regulares suficientes",
      "Seguro de enfermedad para la persona reagrupante y los familiares reagrupados",
      "Pasaportes",
      "Documentos civiles legalizados/apostillados y traducidos cuando proceda",
      "EX-17 y 790-012 después de la entrada"
    ]
  };

  const studyInSpainRoute = routes.find((route) => route.id === "study-in-spain");
  if (studyInSpainRoute) {
    studyInSpainRoute.summary = "For eligible non-EU applicants already lawfully in Spain. In-country eligibility depends on the study category and current status; higher-education applications have specific regular-status and filing-timing rules.";
  }

  roadmapDetails["study-in-spain"] = {
    ...roadmapDetails["study-in-spain"],
    explanation: '<p><strong>Who this is for:</strong> an eligible non-EU applicant already lawfully in Spain. In-country eligibility depends on the study category and current immigration status.</p><p><strong>Higher education:</strong> current rules allow an adult in regular status to apply from Spain. As a general rule, the application must be filed at least two months before the current legal status expires and at least two months before the studies begin, unless an official exception applies.</p><p><strong>Post-compulsory secondary education:</strong> the in-Spain route has narrower status conditions; check the official study sheet rather than assuming that every lawful short stay qualifies.</p><p><strong>Where to apply:</strong> at the competent Oficina de Extranjería or electronically through Mercurio when that filing channel applies.</p>',
    steps: [
      "Identify the exact study category and confirm that your current status allows an in-Spain application.",
      "For higher education, check the general two-month timing rules against both the expiry of your current legal status and the study start date; check the official exceptions if a deadline cannot be met.",
      "Prepare EX-00, admission/enrolment, funds, health insurance and proof of your current legal status.",
      "Pay the 790-052 study authorization fee.",
      "Submit at the competent Extranjería office or electronically through Mercurio within the applicable deadline.",
      "If the authorized stay exceeds six months, complete the TIE step after approval."
    ]
  };

  roadmapDetailsEs["study-in-spain"] = {
    ...roadmapDetailsEs["study-in-spain"],
    explanation: '<p><strong>Para quién:</strong> solicitante no comunitario que ya se encuentra legalmente en España y cumple las condiciones de presentación desde España. La elegibilidad depende del tipo de estudios y de la situación migratoria actual.</p><p><strong>Estudios superiores:</strong> las reglas actuales permiten que una persona adulta en situación regular solicite desde España. Como regla general, debe presentar al menos dos meses antes de que expire su situación legal actual y al menos dos meses antes del inicio de los estudios, salvo que resulte aplicable una excepción oficial.</p><p><strong>Educación secundaria postobligatoria:</strong> la presentación desde España tiene condiciones de situación más restrictivas; consulta la hoja oficial y no des por hecho que cualquier estancia legal permite solicitar.</p><p><strong>Dónde presentar:</strong> en la Oficina de Extranjería competente o telemáticamente por Mercurio cuando corresponda ese canal.</p>',
    steps: [
      "Identifica la categoría exacta de estudios y confirma que tu situación actual permite presentar desde España.",
      "Para estudios superiores, comprueba la regla general de dos meses tanto respecto a la caducidad de tu situación legal actual como al inicio de los estudios; revisa las excepciones oficiales si no puedes cumplir un plazo.",
      "Prepara EX-00, admisión/matrícula, medios, seguro de enfermedad y prueba de tu situación legal actual.",
      "Abona la tasa 790-052 de estudios.",
      "Presenta en la Oficina de Extranjería competente o por Mercurio dentro del plazo aplicable.",
      "Si la estancia autorizada supera seis meses, completa la TIE tras la aprobación."
    ]
  };
})();
