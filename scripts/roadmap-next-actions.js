(() => {
  if (
    typeof routes === "undefined" ||
    typeof roadmapDetails === "undefined" ||
    typeof roadmapDetailsEs === "undefined" ||
    typeof wizard === "undefined" ||
    typeof result === "undefined"
  ) return;
  if (window.__iberigoRoadmapNextActionsLoaded) return;
  window.__iberigoRoadmapNextActionsLoaded = true;

  const addOrReplaceRoute = (route) => {
    const existing = routes.find((item) => item.id === route.id);
    if (existing) Object.assign(existing, route);
    else routes.push(route);
  };

  Object.assign(translations.en, {
    nextSteps: "Your roadmap"
  });
  Object.assign(translations.es, {
    nextSteps: "Tu hoja de ruta"
  });

  if (typeof urls !== "undefined") {
    Object.assign(urls, {
      "eu-worker-rights-en": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_en.htm",
      "eu-worker-rights-es": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_es.htm",
      "eu-student-rights-en": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_en.htm",
      "eu-student-rights-es": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_es.htm",
      "eu-family-registration-en": "https://europa.eu/youreurope/citizens/residence/documents-formalities/eu-family-members-registration/index_en.htm",
      "eu-family-registration-es": "https://europa.eu/youreurope/citizens/residence/documents-formalities/eu-family-members-registration/index_es.htm"
    });
  }

  if (typeof linkLabels !== "undefined") {
    linkLabels.en = linkLabels.en || {};
    linkLabels.es = linkLabels.es || {};
    Object.assign(linkLabels.en, {
      "eu-worker-rights-en": "EU worker and self-employed residence rights",
      "eu-student-rights-en": "EU student residence rights",
      "eu-family-registration-en": "Registering EU family members"
    });
    Object.assign(linkLabels.es, {
      "eu-worker-rights-es": "Derechos de residencia de trabajadores y autónomos UE",
      "eu-student-rights-es": "Derechos de residencia de estudiantes UE",
      "eu-family-registration-es": "Registro de familiares ciudadanos de la UE"
    });
  }

  if (typeof govMeta !== "undefined") {
    Object.assign(govMeta, {
      "eu-worker-rights-en": { subtitle: "Your Europe — official EU guidance", variant: "eu", system: "eu" },
      "eu-worker-rights-es": { subtitle: "Tu Europa — orientación oficial de la UE", variant: "eu", system: "eu" },
      "eu-student-rights-en": { subtitle: "Your Europe — official EU guidance", variant: "eu", system: "eu" },
      "eu-student-rights-es": { subtitle: "Tu Europa — orientación oficial de la UE", variant: "eu", system: "eu" },
      "eu-family-registration-en": { subtitle: "Your Europe — official EU guidance", variant: "eu", system: "eu" },
      "eu-family-registration-es": { subtitle: "Tu Europa — orientación oficial de la UE", variant: "eu", system: "eu" }
    });
  }

  addOrReplaceRoute({
    id: "eu-employed",
    title: "EU/EEA/Swiss employee registration",
    badge: "EU employee",
    summary: "For an EU, EEA or Swiss citizen moving to Spain to work for an employer. The immigration step is the EU Registration Certificate; employment evidence is the residence basis.",
    appointment: "Certificado de Registro de Ciudadano de la Unión Europea",
    documents: ["Passport or EU national ID", "EX-18", "Employment/recruitment evidence", "Address evidence requested by the office", "790-012 receipt"]
  });

  addOrReplaceRoute({
    id: "eu-self-employed",
    title: "EU/EEA/Swiss self-employed registration",
    badge: "EU self-employed",
    summary: "For an EU, EEA or Swiss citizen moving to Spain to work as self-employed. The residence document is still the EU Registration Certificate, but your self-employed status is the evidence supporting the worker basis.",
    appointment: "Certificado de Registro de Ciudadano de la Unión Europea",
    documents: ["Passport or EU national ID", "EX-18", "Evidence of self-employed status", "Address evidence requested by the office", "790-012 receipt"]
  });

  addOrReplaceRoute({
    id: "eu-study",
    title: "EU/EEA/Swiss student registration",
    badge: "EU student over 3 months",
    summary: "For an EU, EEA or Swiss student staying in Spain for more than three months. Student residence is based on enrolment, sufficient resources and comprehensive health coverage, followed by EU registration.",
    appointment: "Certificado de Registro de Ciudadano de la Unión Europea",
    documents: ["Passport or EU national ID", "EX-18", "Enrolment evidence", "Sufficient-resources evidence", "Comprehensive health coverage", "Address evidence requested by the office", "790-012 receipt"]
  });

  addOrReplaceRoute({
    id: "eu-study-short",
    title: "EU/EEA/Swiss short study stay",
    badge: "Study up to 90 days",
    summary: "For an EU, EEA or Swiss citizen studying in Spain for up to 90 days. A residence registration certificate is not required solely for the first three months of the stay.",
    appointment: "No EU residence-registration appointment solely for a stay of up to 90 days",
    documents: ["Passport or EU national ID", "Course/enrolment evidence", "Health coverage for the stay"]
  });

  addOrReplaceRoute({
    id: "eu-study-unsure",
    title: "EU/EEA/Swiss study — duration not decided",
    badge: "Decide duration first",
    summary: "The residence paperwork changes at the three-month point. Confirm the expected study duration before booking an immigration appointment.",
    appointment: "No appointment until you know whether the stay will exceed three months",
    documents: ["Passport or EU national ID", "Course/enrolment information", "Expected study dates"]
  });

  addOrReplaceRoute({
    id: "eu-remote",
    title: "EU/EEA/Swiss remote worker in Spain",
    badge: "EU remote work",
    summary: "EU, EEA and Swiss citizens do not use Spain's non-EU digital-nomad visa. For a long-term move, use the EU registration route and separately identify the employment, Social Security and tax setup that applies to your remote work.",
    appointment: "Certificado de Registro de Ciudadano de la Unión Europea",
    documents: ["Passport or EU national ID", "EX-18", "Evidence supporting your residence basis", "Remote employment or self-employment evidence", "Address evidence requested by the office", "790-012 receipt"]
  });

  addOrReplaceRoute({
    id: "eu-family-self",
    title: "EU/EEA/Swiss citizen joining family in Spain",
    badge: "EU family move",
    summary: "If you are yourself an EU, EEA or Swiss citizen, you normally register as an EU citizen rather than applying for the EX-19 card used by non-EU family members. Your family relationship can be relevant to the evidence supporting your residence right.",
    appointment: "Certificado de Registro de Ciudadano de la Unión Europea",
    documents: ["Passport or EU national ID", "EX-18", "Family relationship evidence where relevant", "Sponsor's residence evidence where relevant", "Address evidence requested by the office", "790-012 receipt"]
  });

  addOrReplaceRoute({
    id: "study-short-in-spain",
    title: "Short study while already legally in Spain",
    badge: "Study up to 90 days",
    summary: "For a non-EU person who is already legally in Spain and takes a short course of up to 90 days. A short course does not by itself extend your existing immigration permission.",
    appointment: "No separate long-stay study application solely because the course lasts up to 90 days",
    documents: ["Passport", "Proof of current legal status in Spain", "Course/enrolment evidence"]
  });

  addOrReplaceRoute({
    id: "study-unsure-abroad",
    title: "Study from abroad — duration not decided",
    badge: "Decide duration first",
    summary: "For a non-EU applicant outside Spain who has not yet decided whether the studies will last up to 90 days or more than 90 days. The short-stay and long-stay routes are different, so confirm the course dates before filing.",
    appointment: "Depends on the final study duration and your nationality",
    documents: ["Passport", "Course/admission information", "Expected start and end dates"]
  });

  addOrReplaceRoute({
    id: "study-unsure-in-spain",
    title: "Study in Spain — duration not decided",
    badge: "Check status and duration",
    summary: "For a non-EU person already legally in Spain who has not yet decided the study duration. Confirm how long the course will last and whether your current legal status remains valid before choosing a study-authorization route.",
    appointment: "Depends on your current legal status and the final study duration",
    documents: ["Passport", "Proof of current legal status in Spain", "Course/admission information", "Expected start and end dates"]
  });

  roadmapDetails["eu-employed"] = {
    process: "EU Registration Certificate as an employee",
    explanation: "<p><strong>Your route:</strong> as an EU, EEA or Swiss citizen employed in Spain, you use the EU Registration Certificate rather than a work visa or TIE.</p><p><strong>Your residence basis:</strong> employment or confirmation of recruitment is the key evidence supporting your worker status.</p>",
    difficulty: "Medium",
    timeline: "Mostly depends on local appointment availability",
    steps: [
      "Confirm the job and gather your employment contract or confirmation of recruitment.",
      "Prepare EX-18, your passport or EU national ID, and the address evidence requested by the office.",
      "Arrange your Spanish Social Security number / employment registration with the employer where required for your work setup.",
      "Pay Modelo 790-012 and book the EU Registration Certificate appointment.",
      "Attend the appointment with your worker evidence and keep the certificate for later healthcare, tax and digital-ID steps.",
      "After registration, set up the public-service and digital-access steps that apply to you."
    ],
    documents: ["Passport or EU national ID", "EX-18", "Employment/recruitment evidence", "Address evidence requested by the office", "790-012 receipt"],
    links: ["eu-certificate", "eu-worker-rights-en", "social-security-number", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Once your EU registration is in place, keep the certificate and NIE available for employment, healthcare, tax and digital-administration procedures."
  };

  roadmapDetailsEs["eu-employed"] = {
    process: "Certificado de Registro UE como trabajador por cuenta ajena",
    explanation: "<p><strong>Tu vía:</strong> como ciudadano UE/EEE/Suiza empleado en España, utilizas el Certificado de Registro UE, no un visado de trabajo ni una TIE.</p><p><strong>Base de residencia:</strong> el contrato o confirmación de contratación es la prueba principal de tu condición de trabajador.</p>",
    difficulty: "Media",
    timeline: "Depende sobre todo de la disponibilidad local de citas",
    steps: [
      "Confirma el empleo y reúne el contrato o confirmación de contratación.",
      "Prepara EX-18, pasaporte o documento nacional UE y la prueba de domicilio que pida la oficina.",
      "Tramita el número / alta en la Seguridad Social con el empleador cuando corresponda a tu situación laboral.",
      "Paga el Modelo 790-012 y reserva la cita del Certificado de Registro UE.",
      "Acude con la prueba laboral y conserva el certificado para sanidad, impuestos e identidad digital.",
      "Después del registro, completa los trámites de servicios públicos y acceso digital que te correspondan."
    ],
    documents: ["Pasaporte o documento UE", "EX-18", "Contrato o prueba de contratación", "Prueba de domicilio solicitada", "790-012"],
    links: ["eu-certificate", "eu-worker-rights-es", "social-security-number", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Con el registro UE completado, guarda el certificado y el NIE para empleo, sanidad, impuestos y administración digital."
  };

  roadmapDetails["eu-self-employed"] = {
    process: "EU Registration Certificate as self-employed",
    explanation: "<p><strong>Your route:</strong> EU, EEA and Swiss citizens do not need a self-employed immigration visa. For residence registration, evidence that you are genuinely self-employed supports the worker basis.</p><p><strong>Separate admin:</strong> tax and Social Security registration for the activity are separate from the immigration certificate, even though the evidence can overlap.</p>",
    difficulty: "Medium",
    timeline: "Mostly depends on business setup and local appointment availability",
    steps: [
      "Define the activity and complete the tax / Social Security setup required for your self-employed work.",
      "Gather evidence showing your self-employed status or activity in Spain.",
      "Prepare EX-18, identity and the address evidence requested by the office.",
      "Pay Modelo 790-012 and book the EU Registration Certificate appointment.",
      "Attend the appointment with your self-employed evidence.",
      "Keep the certificate and NIE for ongoing tax, Social Security, healthcare and digital-administration steps."
    ],
    documents: ["Passport or EU national ID", "EX-18", "Self-employed status/activity evidence", "Address evidence requested by the office", "790-012 receipt"],
    links: ["eu-certificate", "eu-worker-rights-en", "tax-agency", "social-security-number", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Continue the normal autónomo tax and Social Security obligations for your activity and use the EU certificate/NIE for later public administration."
  };

  roadmapDetailsEs["eu-self-employed"] = {
    process: "Certificado de Registro UE como autónomo",
    explanation: "<p><strong>Tu vía:</strong> los ciudadanos UE/EEE/Suiza no necesitan un visado de autónomo. Para el registro de residencia, la prueba de actividad por cuenta propia acredita la base como trabajador.</p><p><strong>Trámites separados:</strong> el alta fiscal y de Seguridad Social de la actividad son distintos del certificado de residencia, aunque la documentación puede solaparse.</p>",
    difficulty: "Media",
    timeline: "Depende de la puesta en marcha de la actividad y de las citas locales",
    steps: [
      "Define la actividad y completa el alta fiscal / de Seguridad Social que corresponda a tu trabajo por cuenta propia.",
      "Reúne pruebas de tu condición o actividad como autónomo en España.",
      "Prepara EX-18, identidad y la prueba de domicilio que solicite la oficina.",
      "Paga el Modelo 790-012 y reserva la cita del Certificado de Registro UE.",
      "Acude a la cita con la prueba de actividad por cuenta propia.",
      "Conserva certificado y NIE para impuestos, Seguridad Social, sanidad y administración digital."
    ],
    documents: ["Pasaporte o documento UE", "EX-18", "Prueba de actividad/autónomo", "Prueba de domicilio solicitada", "790-012"],
    links: ["eu-certificate", "eu-worker-rights-es", "tax-agency", "social-security-number", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Continúa con las obligaciones fiscales y de Seguridad Social de tu actividad y utiliza certificado/NIE para los trámites posteriores."
  };

  roadmapDetails["eu-study"] = {
    process: "EU student registration for a stay over three months",
    explanation: "<p><strong>Your route:</strong> for studies lasting more than three months, an EU, EEA or Swiss student can be required to register residence in Spain.</p><p><strong>Student basis:</strong> prepare enrolment, sufficient resources and comprehensive health coverage, then complete the EU Registration Certificate.</p>",
    difficulty: "Medium",
    timeline: "Mostly depends on local appointment availability",
    steps: [
      "Confirm the course will keep you in Spain for more than three months and secure enrolment at the educational establishment.",
      "Prepare sufficient-resources evidence and comprehensive health coverage for the study period.",
      "Prepare EX-18, identity and the address evidence requested by the office.",
      "Pay Modelo 790-012 and book the EU Registration Certificate appointment.",
      "Attend the appointment with your student-basis documents.",
      "After registration, set up the healthcare and digital-access arrangements that apply to your situation."
    ],
    documents: ["Passport or EU national ID", "EX-18", "Enrolment evidence", "Resources evidence", "Comprehensive health coverage", "Address evidence requested by the office", "790-012 receipt"],
    links: ["eu-student-rights-en", "eu-certificate", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Keep your registration certificate and study/health documents current while you remain in Spain."
  };

  roadmapDetailsEs["eu-study"] = {
    process: "Registro como estudiante UE para estancia superior a tres meses",
    explanation: "<p><strong>Tu vía:</strong> para estudios de más de tres meses, a un estudiante UE/EEE/Suiza se le puede exigir registrar su residencia en España.</p><p><strong>Base de estudiante:</strong> prepara matrícula, recursos suficientes y cobertura sanitaria completa y después tramita el Certificado de Registro UE.</p>",
    difficulty: "Media",
    timeline: "Depende sobre todo de la disponibilidad local de citas",
    steps: [
      "Confirma que el curso te mantendrá en España más de tres meses y formaliza la matrícula.",
      "Prepara prueba de recursos suficientes y cobertura sanitaria completa para el periodo de estudios.",
      "Prepara EX-18, identidad y la prueba de domicilio solicitada por la oficina.",
      "Paga el Modelo 790-012 y reserva la cita del Certificado de Registro UE.",
      "Acude con la documentación que acredita tu condición de estudiante.",
      "Después del registro, organiza la sanidad y el acceso digital que correspondan a tu situación."
    ],
    documents: ["Pasaporte o documento UE", "EX-18", "Matrícula", "Prueba de recursos", "Cobertura sanitaria completa", "Prueba de domicilio solicitada", "790-012"],
    links: ["eu-student-rights-es", "eu-certificate", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Conserva actualizado el certificado de registro y la documentación de estudios y cobertura sanitaria mientras permanezcas en España."
  };

  roadmapDetails["eu-study-short"] = {
    process: "EU short study stay up to 90 days",
    explanation: "<p><strong>For the first three months:</strong> an EU, EEA or Swiss citizen cannot be required to register residence solely because of the stay. Keep valid identity and course/health documentation available.</p>",
    difficulty: "Low",
    timeline: "No EU residence-registration filing solely for a stay up to 90 days",
    steps: [
      "Confirm the course and your expected departure date keep the stay within 90 days.",
      "Travel/stay with a valid passport or EU national ID and keep course/enrolment evidence.",
      "Keep appropriate health coverage available for the stay.",
      "If the stay will extend beyond three months, switch to the EU student-registration roadmap before the three-month point."
    ],
    documents: ["Passport or EU national ID", "Course/enrolment evidence", "Health coverage"],
    links: ["eu-student-rights-en", "eu-short-stay"]
  };

  roadmapDetailsEs["eu-study-short"] = {
    process: "Estudios UE de hasta 90 días",
    explanation: "<p><strong>Durante los primeros tres meses:</strong> a un ciudadano UE/EEE/Suiza no se le puede exigir registrar la residencia únicamente por esa estancia. Lleva identificación válida y documentación del curso/cobertura sanitaria.</p>",
    difficulty: "Baja",
    timeline: "Sin registro de residencia UE únicamente por una estancia de hasta 90 días",
    steps: [
      "Confirma que las fechas del curso y de salida mantienen la estancia dentro de 90 días.",
      "Permanece con pasaporte o documento UE válido y guarda la prueba del curso/matrícula.",
      "Mantén cobertura sanitaria adecuada durante la estancia.",
      "Si vas a superar tres meses, cambia a la hoja de ruta de registro como estudiante UE antes de ese punto."
    ],
    documents: ["Pasaporte o documento UE", "Prueba de curso/matrícula", "Cobertura sanitaria"],
    links: ["eu-student-rights-es", "eu-short-stay"]
  };

  roadmapDetails["eu-study-unsure"] = {
    process: "Decide the study duration before choosing the residence filing",
    explanation: "<p><strong>Why this matters:</strong> the EU residence-registration requirement changes after the first three months. Do not book the wrong immigration appointment while your study dates are still uncertain.</p>",
    difficulty: "Low",
    timeline: "Decide the expected study dates first",
    steps: [
      "Confirm the course start date and expected end date.",
      "If the total stay will be up to 90 days, use the EU short-study roadmap and do not book EU residence registration solely for that stay.",
      "If the stay will exceed three months, use the EU student-registration roadmap and prepare enrolment, resources and comprehensive health coverage."
    ],
    documents: ["Passport or EU national ID", "Course dates", "Enrolment information"],
    links: ["eu-student-rights-en", "eu-short-stay", "eu-certificate"]
  };

  roadmapDetailsEs["eu-study-unsure"] = {
    process: "Decide la duración de los estudios antes de elegir el trámite de residencia",
    explanation: "<p><strong>Por qué importa:</strong> la obligación de registro de residencia UE cambia después de los primeros tres meses. No reserves una cita de extranjería incorrecta mientras las fechas sigan sin definirse.</p>",
    difficulty: "Baja",
    timeline: "Primero confirma las fechas previstas",
    steps: [
      "Confirma la fecha de inicio y la fecha prevista de finalización del curso.",
      "Si la estancia total será de hasta 90 días, usa la ruta de estudios cortos UE y no reserves registro de residencia solo por esa estancia.",
      "Si superarás tres meses, usa la ruta de estudiante UE y prepara matrícula, recursos y cobertura sanitaria completa."
    ],
    documents: ["Pasaporte o documento UE", "Fechas del curso", "Información de matrícula"],
    links: ["eu-student-rights-es", "eu-short-stay", "eu-certificate"]
  };

  roadmapDetails["eu-remote"] = {
    process: "EU citizen working remotely from Spain",
    explanation: "<p><strong>Immigration:</strong> as an EU, EEA or Swiss citizen, you do not use the non-EU digital-nomad visa. For a long-term stay, the residence document is the EU Registration Certificate.</p><p><strong>Work setup:</strong> first identify whether you remain employed by a foreign employer, become self-employed, or work for a Spanish employer. Social Security and tax treatment can differ, so do not treat the immigration certificate as the whole remote-work setup.</p>",
    difficulty: "Medium",
    timeline: "Residence timing depends on local appointments; work/tax setup depends on your arrangement",
    steps: [
      "Identify your remote-work setup: foreign employer, Spanish employer, or self-employed/professional activity.",
      "Confirm which evidence supports your EU residence basis and gather the employment/self-employment documents for that setup.",
      "Check the Social Security and tax administration that applies before assuming the non-EU digital-nomad rules apply to you.",
      "Prepare EX-18, identity and the address evidence requested by the office.",
      "Pay Modelo 790-012 and complete the EU Registration Certificate appointment.",
      "After registration, set up healthcare and digital administration and keep your work/tax records current."
    ],
    documents: ["Passport or EU national ID", "EX-18", "Employment/self-employment evidence", "Address evidence requested by the office", "790-012 receipt"],
    links: ["eu-worker-rights-en", "eu-certificate", "social-security-number", "tax-agency", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Your immigration registration and your remote-work tax/Social Security setup are related but separate; keep both sides current."
  };

  roadmapDetailsEs["eu-remote"] = {
    process: "Ciudadano UE trabajando en remoto desde España",
    explanation: "<p><strong>Inmigración:</strong> como ciudadano UE/EEE/Suiza no utilizas el visado de nómada digital destinado a no comunitarios. Para una estancia larga, el documento de residencia es el Certificado de Registro UE.</p><p><strong>Situación laboral:</strong> identifica primero si sigues empleado por una empresa extranjera, trabajas para una empresa española o actúas como autónomo/profesional. Seguridad Social e impuestos pueden variar; el certificado de residencia no resuelve por sí solo toda la situación laboral.</p>",
    difficulty: "Media",
    timeline: "La residencia depende de citas locales; trabajo e impuestos dependen de tu estructura",
    steps: [
      "Identifica tu estructura de trabajo remoto: empleador extranjero, empleador español o actividad autónoma/profesional.",
      "Confirma qué prueba acredita tu base de residencia UE y reúne la documentación laboral correspondiente.",
      "Comprueba la administración de Seguridad Social e impuestos aplicable antes de asumir que te corresponden las reglas de nómada digital no comunitario.",
      "Prepara EX-18, identidad y la prueba de domicilio solicitada.",
      "Paga Modelo 790-012 y completa la cita del Certificado de Registro UE.",
      "Después, organiza sanidad y administración digital y mantén al día la documentación laboral/fiscal."
    ],
    documents: ["Pasaporte o documento UE", "EX-18", "Prueba laboral/autónomo", "Prueba de domicilio solicitada", "790-012"],
    links: ["eu-worker-rights-es", "eu-certificate", "social-security-number", "tax-agency", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "El registro de residencia y la configuración fiscal/Seguridad Social del trabajo remoto están relacionados, pero son trámites distintos."
  };

  roadmapDetails["eu-family-self"] = {
    process: "EU citizen joining family in Spain",
    explanation: "<p><strong>Your route:</strong> because you are yourself an EU, EEA or Swiss citizen, you normally obtain an EU Registration Certificate rather than the EX-19 residence card used by non-EU family members.</p><p><strong>Family basis:</strong> if your residence right depends on joining another EU citizen, the sponsor's residence evidence and proof of the family relationship can be relevant.</p>",
    difficulty: "Medium",
    timeline: "Mostly depends on local appointment availability",
    steps: [
      "Confirm who you are joining and whether you will register on your own worker/student/resources basis or as an EU family member/dependant.",
      "If relying on the family relationship, gather the sponsor's registration/residence evidence and proof of the relationship or dependency where relevant.",
      "Prepare EX-18, your passport or EU national ID, and the address evidence requested by the office.",
      "Pay Modelo 790-012 and book the EU Registration Certificate appointment.",
      "Attend the appointment with the evidence supporting your residence right.",
      "After registration, set up the healthcare and digital-administration steps that apply to you."
    ],
    documents: ["Passport or EU national ID", "EX-18", "Family relationship evidence where relevant", "Sponsor residence evidence where relevant", "Address evidence requested by the office", "790-012 receipt"],
    links: ["eu-family-registration-en", "eu-certificate", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "You receive the EU-citizen registration certificate; EX-19 remains the residence-card route for qualifying non-EU family members."
  };

  roadmapDetailsEs["eu-family-self"] = {
    process: "Ciudadano UE que se reúne con familiares en España",
    explanation: "<p><strong>Tu vía:</strong> al ser tú mismo ciudadano UE/EEE/Suiza, normalmente obtienes un Certificado de Registro UE en lugar de la tarjeta EX-19 destinada a familiares no comunitarios.</p><p><strong>Base familiar:</strong> si tu derecho de residencia depende de reunirte con otro ciudadano UE, pueden ser relevantes la prueba de residencia del familiar y el vínculo familiar.</p>",
    difficulty: "Media",
    timeline: "Depende sobre todo de la disponibilidad local de citas",
    steps: [
      "Confirma con quién te reúnes y si registrarás tu residencia por trabajo/estudios/recursos propios o como familiar/dependiente de otro ciudadano UE.",
      "Si dependes del vínculo familiar, reúne la prueba de registro/residencia del familiar y la prueba del vínculo o dependencia cuando proceda.",
      "Prepara EX-18, pasaporte o documento UE y la prueba de domicilio solicitada.",
      "Paga Modelo 790-012 y reserva la cita del Certificado de Registro UE.",
      "Acude con las pruebas que sustentan tu derecho de residencia.",
      "Después del registro, organiza sanidad y administración digital según tu situación."
    ],
    documents: ["Pasaporte o documento UE", "EX-18", "Prueba de vínculo cuando proceda", "Prueba de residencia del familiar cuando proceda", "Prueba de domicilio solicitada", "790-012"],
    links: ["eu-family-registration-es", "eu-certificate", "790-012", "cita", "fnmt", "clave"],
    whatHappensNext: "Recibes el certificado de registro como ciudadano UE; EX-19 sigue siendo la tarjeta para familiares no comunitarios que cumplan los requisitos."
  };

  roadmapDetails["study-short-in-spain"] = {
    process: "Short study while already legally in Spain",
    explanation: "<p><strong>Your situation:</strong> a course lasting up to 90 days does not by itself create or extend immigration permission. Your existing lawful status in Spain remains the key limit.</p>",
    difficulty: "Low to medium",
    timeline: "No separate long-stay study filing solely for the short course",
    steps: [
      "Check the expiry date and conditions of your current lawful status in Spain.",
      "Confirm the course lasts no more than 90 days and keep the admission/enrolment evidence.",
      "Do not assume the course extends your existing permission to stay.",
      "If the course or planned stay will exceed 90 days, switch to the in-Spain long-stay study route and confirm you meet its filing conditions."
    ],
    documents: ["Passport", "Current legal-status evidence", "Course/enrolment evidence"],
    links: ["study-official", "mercurio"]
  };

  roadmapDetailsEs["study-short-in-spain"] = {
    process: "Estudios cortos estando ya legalmente en España",
    explanation: "<p><strong>Tu situación:</strong> un curso de hasta 90 días no crea ni amplía por sí solo un permiso migratorio. El límite principal sigue siendo tu situación legal actual en España.</p>",
    difficulty: "Baja a media",
    timeline: "Sin solicitud separada de estudios de larga duración únicamente por el curso corto",
    steps: [
      "Comprueba la fecha de caducidad y las condiciones de tu situación legal actual en España.",
      "Confirma que el curso no supera 90 días y guarda la prueba de admisión/matrícula.",
      "No des por hecho que el curso amplía tu permiso actual de estancia.",
      "Si el curso o tu estancia prevista superarán 90 días, cambia a la vía de estudios de larga duración desde España y comprueba sus requisitos de presentación."
    ],
    documents: ["Pasaporte", "Prueba de situación legal actual", "Prueba de curso/matrícula"],
    links: ["study-official", "mercurio"]
  };

  roadmapDetails["study-unsure-abroad"] = {
    process: "Confirm the study duration before filing from abroad",
    explanation: "<p><strong>Do not file yet:</strong> studies up to 90 days and studies over 90 days use different immigration rules. Confirm the official course dates first.</p>",
    difficulty: "Low",
    timeline: "Depends on the final course duration",
    steps: [
      "Get the official course start and end dates from the school or institution.",
      "If the stay will be up to 90 days, check the Schengen short-stay rules for your nationality.",
      "If the stay will exceed 90 days, use the long-stay study application from abroad and follow your competent Spanish consulate's instructions."
    ],
    documents: ["Passport", "Course/admission information", "Official course dates"],
    links: ["study-official", "schengen", "consulates"]
  };

  roadmapDetailsEs["study-unsure-abroad"] = {
    process: "Confirma la duración de los estudios antes de presentar desde el extranjero",
    explanation: "<p><strong>No presentes todavía:</strong> los estudios de hasta 90 días y los de más de 90 días siguen reglas migratorias diferentes. Confirma primero las fechas oficiales del curso.</p>",
    difficulty: "Baja",
    timeline: "Depende de la duración final del curso",
    steps: [
      "Obtén del centro las fechas oficiales de inicio y finalización.",
      "Si la estancia será de hasta 90 días, comprueba las reglas Schengen de corta estancia para tu nacionalidad.",
      "Si superarás 90 días, usa la solicitud de estudios de larga duración desde el extranjero y sigue las instrucciones del consulado español competente."
    ],
    documents: ["Pasaporte", "Información de admisión/curso", "Fechas oficiales del curso"],
    links: ["study-official", "schengen", "consulates"]
  };

  roadmapDetails["study-unsure-in-spain"] = {
    process: "Confirm study duration and current status before filing in Spain",
    explanation: "<p><strong>Start with status and dates:</strong> if you are already legally in Spain, first confirm how long the course will last and how long your current permission remains valid.</p>",
    difficulty: "Low to medium",
    timeline: "Depends on the final study duration and your current legal status",
    steps: [
      "Check the expiry date and conditions of your current legal status in Spain.",
      "Get the official start/end dates for the course.",
      "If the course stays within 90 days and within your lawful stay, use the short-study guidance.",
      "If it will exceed 90 days, check whether your study type and current status allow an in-Spain long-stay study application before the filing deadline."
    ],
    documents: ["Passport", "Current legal-status evidence", "Course/admission information", "Official course dates"],
    links: ["study-official", "mercurio"]
  };

  roadmapDetailsEs["study-unsure-in-spain"] = {
    process: "Confirma duración y situación actual antes de presentar en España",
    explanation: "<p><strong>Empieza por situación y fechas:</strong> si ya estás legalmente en España, confirma primero cuánto durará el curso y hasta cuándo es válida tu situación actual.</p>",
    difficulty: "Baja a media",
    timeline: "Depende de la duración final y de tu situación legal actual",
    steps: [
      "Comprueba la caducidad y condiciones de tu situación legal actual en España.",
      "Obtén las fechas oficiales de inicio y finalización del curso.",
      "Si el curso queda dentro de 90 días y de tu estancia legal, utiliza la guía de estudios cortos.",
      "Si superará 90 días, comprueba si tu tipo de estudios y situación actual permiten una solicitud de larga duración desde España dentro del plazo."
    ],
    documents: ["Pasaporte", "Prueba de situación legal actual", "Información de admisión/curso", "Fechas oficiales del curso"],
    links: ["study-official", "mercurio"]
  };

  if (typeof routeFormsAndTaxes !== "undefined") {
    const registration = routeFormsAndTaxes["eu-registration"] || { forms: [], taxes: [], links: [] };
    const worker = routeFormsAndTaxes["eu-working"] || registration;
    routeFormsAndTaxes["eu-employed"] = worker;
    routeFormsAndTaxes["eu-self-employed"] = worker;
    routeFormsAndTaxes["eu-study"] = registration;
    routeFormsAndTaxes["eu-remote"] = registration;
    routeFormsAndTaxes["eu-family-self"] = registration;
    routeFormsAndTaxes["eu-study-short"] = { forms: [], taxes: [], links: roadmapDetails["eu-study-short"].links };
    routeFormsAndTaxes["eu-study-unsure"] = { forms: [], taxes: [], links: roadmapDetails["eu-study-unsure"].links };
    routeFormsAndTaxes["study-short-in-spain"] = { forms: [], taxes: [], links: roadmapDetails["study-short-in-spain"].links };
    routeFormsAndTaxes["study-unsure-abroad"] = { forms: [], taxes: [], links: roadmapDetails["study-unsure-abroad"].links };
    routeFormsAndTaxes["study-unsure-in-spain"] = { forms: [], taxes: [], links: roadmapDetails["study-unsure-in-spain"].links };
  }
  if (typeof routeFormsAndTaxesEs !== "undefined") {
    const registration = routeFormsAndTaxesEs["eu-registration"] || { forms: [], taxes: [], links: [] };
    const worker = routeFormsAndTaxesEs["eu-working"] || registration;
    routeFormsAndTaxesEs["eu-employed"] = worker;
    routeFormsAndTaxesEs["eu-self-employed"] = worker;
    routeFormsAndTaxesEs["eu-study"] = registration;
    routeFormsAndTaxesEs["eu-remote"] = registration;
    routeFormsAndTaxesEs["eu-family-self"] = registration;
    routeFormsAndTaxesEs["eu-study-short"] = { forms: [], taxes: [], links: roadmapDetailsEs["eu-study-short"].links };
    routeFormsAndTaxesEs["eu-study-unsure"] = { forms: [], taxes: [], links: roadmapDetailsEs["eu-study-unsure"].links };
    routeFormsAndTaxesEs["study-short-in-spain"] = { forms: [], taxes: [], links: roadmapDetailsEs["study-short-in-spain"].links };
    routeFormsAndTaxesEs["study-unsure-abroad"] = { forms: [], taxes: [], links: roadmapDetailsEs["study-unsure-abroad"].links };
    routeFormsAndTaxesEs["study-unsure-in-spain"] = { forms: [], taxes: [], links: roadmapDetailsEs["study-unsure-in-spain"].links };
  }

  if (typeof nonEuStartingPointRoutes !== "undefined") {
    ["study-short-in-spain", "study-unsure-abroad", "study-unsure-in-spain"].forEach((id) => nonEuStartingPointRoutes.add(id));
  }

  const priorPickRoute = pickRoute;
  pickRoute = function () {
    const personType = getValue("personType");
    const goal = getValue("goal");
    const duration = getValue("duration");

    if (personType === "eu") {
      if (goal === "workEmployee") return routes.find((route) => route.id === "eu-employed");
      if (goal === "workSelf") return routes.find((route) => route.id === "eu-self-employed");
      if (goal === "remote") return routes.find((route) => route.id === "eu-remote");
      if (goal === "family") return routes.find((route) => route.id === "eu-family-self");
      if (goal === "studyAbroad" || goal === "studySpain") {
        if (duration === "short") return routes.find((route) => route.id === "eu-study-short");
        if (duration === "notSure" || !duration) return routes.find((route) => route.id === "eu-study-unsure");
        return routes.find((route) => route.id === "eu-study");
      }
    }

    if (personType !== "eu" && goal === "studyAbroad" && duration === "notSure") {
      return routes.find((route) => route.id === "study-unsure-abroad");
    }
    if (personType !== "eu" && goal === "studySpain" && duration === "short") {
      return routes.find((route) => route.id === "study-short-in-spain");
    }
    if (personType !== "eu" && goal === "studySpain" && duration === "notSure") {
      return routes.find((route) => route.id === "study-unsure-in-spain");
    }

    return priorPickRoute();
  };

  const priorRouteVisualFor = typeof routeVisualFor === "function" ? routeVisualFor : null;
  if (priorRouteVisualFor) {
    routeVisualFor = function (routeId = "") {
      const contextual = {
        "eu-employed": "./assets/goal-cards/work.webp",
        "eu-self-employed": "./assets/goal-cards/work.webp",
        "eu-study": "./assets/goal-cards/study.webp",
        "eu-study-short": "./assets/goal-cards/study.webp",
        "eu-study-unsure": "./assets/goal-cards/study.webp",
        "eu-remote": "./assets/goal-cards/remote.webp",
        "eu-family-self": "./assets/goal-cards/family.webp",
        "study-short-in-spain": "./assets/goal-cards/study.webp",
        "study-unsure-abroad": "./assets/goal-cards/study.webp",
        "study-unsure-in-spain": "./assets/goal-cards/study.webp"
      };
      return contextual[routeId] || priorRouteVisualFor(routeId);
    };
  }

  const studyGoals = new Set(["studyAbroad", "studySpain"]);
  wizard.addEventListener("submit", (event) => {
    const step = wizard.dataset.step || "person";
    const goal = getValue("goal");

    if (step === "goal" && studyGoals.has(goal)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof pushCurrentScreenState === "function") pushCurrentScreenState();
      wizard.querySelectorAll('input[name="duration"]').forEach((input) => { input.checked = false; });
      wizard.dataset.step = "duration";
      updateQuestionVisibility();
      if (typeof setCurrentScreenState === "function") {
        setCurrentScreenState({
          type: "wizard",
          entryPreset: typeof currentEntryPreset !== "undefined" ? currentEntryPreset : null,
          step: "duration",
          selections: typeof wizardSelectionState === "function" ? wizardSelectionState() : {}
        });
      }
      showWizardPrompt(
        currentLang === "es" ? "¿Cuánto durarán tus estudios en España?" : "How long will you study in Spain?",
        currentLang === "es"
          ? "El límite de 90 días cambia la vía. Elige corta, larga o 'no lo sé' para recibir el siguiente paso correcto."
          : "The 90-day point changes the route. Choose short, long, or 'not sure' so IberiGo can give you the right next step."
      );
      wizard.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }

    if (step === "duration" && studyGoals.has(goal) && !getValue("duration")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showWizardPrompt(
        currentLang === "es" ? "Elige una duración" : "Choose a study duration",
        currentLang === "es"
          ? "Selecciona menos de 90 días, más de 90 días o 'no lo sé'."
          : "Select less than 90 days, more than 90 days, or 'not sure'."
      );
    }
  }, true);

  function actionLabels() {
    return currentLang === "es"
      ? { now: "Haz esto ahora", roadmap: "Tu hoja de ruta", start: "Empieza aquí" }
      : { now: "Do this now", roadmap: "Your roadmap", start: "Start here" };
  }

  function findRoadmapSection() {
    const list = result.querySelector(".roadmap-list");
    return list?.closest(".result-section") || null;
  }

  function enhanceRoadmapResult(roadmap) {
    if (!roadmap || !Array.isArray(roadmap.steps) || !roadmap.steps.length || !result || result.hidden) return;
    const section = findRoadmapSection();
    if (!section) return;
    const labels = actionLabels();
    const heading = section.querySelector(":scope > strong");
    if (heading) heading.textContent = labels.roadmap;

    const list = section.querySelector(".roadmap-list");
    if (list) {
      list.classList.add("roadmap-list--full");
      list.innerHTML = roadmap.steps
        .map((step, index) => `<li class="${index === 0 ? "roadmap-step--now" : ""}">${index === 0 ? `<span class="roadmap-step-badge">${labels.start}</span>` : ""}${step}</li>`)
        .join("");
    }

    result.querySelectorAll(".roadmap-now").forEach((node) => node.remove());
    const now = document.createElement("div");
    now.className = "result-section roadmap-now";
    now.innerHTML = `<strong>${labels.now}</strong><p>${roadmap.steps[0]}</p>`;
    section.before(now);
  }

  const priorRenderRoadmap = renderRoadmap;
  renderRoadmap = function () {
    priorRenderRoadmap();
    const directGoals = new Set(["padron", "digital", "nie"]);
    const goal = getValue("goal");
    const roadmap = directGoals.has(goal)
      ? generalRouteResult()
      : roadmapFor(pickRoute());
    enhanceRoadmapResult(roadmap);
  };

  const priorRenderRoadmapCard = renderRoadmapCard;
  renderRoadmapCard = function (roadmap, guideId = roadmap?.route?.id || currentDirectRoute) {
    priorRenderRoadmapCard(roadmap, guideId);
    enhanceRoadmapResult(roadmap);
  };

  const style = document.createElement("style");
  style.id = "iberigo-roadmap-next-actions-style";
  style.textContent = `
    .roadmap-now {
      background: #fff3e8;
      border: 1px solid #f3caa6;
      border-left: 4px solid #f97316;
      border-radius: 16px;
      padding: 18px 20px;
    }
    .roadmap-now > strong {
      display: block;
      color: #0f2a44;
      font-size: 0.86rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .roadmap-now p {
      margin: 0;
      color: #0f2a44;
      font-size: 1.03rem;
      font-weight: 650;
      line-height: 1.55;
    }
    .roadmap-list--full {
      display: grid;
      gap: 10px;
    }
    .roadmap-list--full li {
      padding: 4px 0 4px 4px;
    }
    .roadmap-list--full .roadmap-step--now {
      font-weight: 650;
      color: #0f2a44;
    }
    .roadmap-step-badge {
      display: inline-block;
      margin-right: 8px;
      padding: 2px 8px;
      border-radius: 999px;
      background: #f97316;
      color: white;
      font-size: 0.72rem;
      font-weight: 750;
      letter-spacing: 0.02em;
      vertical-align: 0.08em;
    }
    @media (max-width: 520px) {
      .roadmap-now { padding: 16px; }
      .roadmap-now p { font-size: 1rem; }
    }
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  function roadmapForCurrentScreen() {
    const guideId = document.documentElement.dataset.guideId;
    if (guideId) {
      const direct = typeof directRoadmapFor === "function" ? directRoadmapFor(guideId) : null;
      if (direct) return direct;
      const route = routes.find((item) => item.id === guideId);
      if (route) return roadmapFor(route);
    }
    if (typeof currentDirectRoute !== "undefined" && currentDirectRoute) {
      const direct = directRoadmapFor(currentDirectRoute);
      if (direct) return direct;
    }
    if (wizard.dataset.step === "result" && !result.hidden) {
      const route = pickRoute();
      if (route) return roadmapFor(route);
    }
    return null;
  }

  applyTranslations();
  enhanceRoadmapResult(roadmapForCurrentScreen());
})();
