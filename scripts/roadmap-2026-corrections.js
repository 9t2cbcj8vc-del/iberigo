(() => {
if (typeof routes === "undefined" || typeof roadmapDetails === "undefined" || typeof wizard === "undefined") return;
const addOrReplaceRoute = (route) => {
const existing = routes.find((item) => item.id === route.id);
if (existing) Object.assign(existing, route);
else routes.push(route);
};
const extendTranslations = () => {
Object.assign(translations.en, {
goalWorkEmployee: "Work for a Spanish employer",
goalWorkEmployeeDesc: "Employee residence and work authorization, normally started by the employer.",
goalWorkSelf: "Work as self-employed in Spain",
goalWorkSelfDesc: "Self-employed residence and work authorization using the consular route.",
goalStudyAbroad: "Study in Spain — applying from abroad",
goalStudyAbroadDesc: "Student visa / long-stay study route through the Spanish consulate.",
goalStudySpain: "Study in Spain — already legally in Spain",
goalStudySpainDesc: "Check whether you can apply in Spain through Extranjería or Mercurio.",
familyEu: "EU/EEA/Swiss citizen",
familyEuDesc: "Points to the EU-family residence-card route (EX-19).",
familySpanish: "Spanish citizen",
familySpanishDesc: "Normally points to the family member of a Spanish national route (EX-24).",
familyNonEu: "Non-EU citizen resident in Spain",
familyNonEuDesc: "Points to ordinary family reunification (EX-02)."
});
Object.assign(translations.es, {
goalWorkEmployee: "Trabajar para una empresa española",
goalWorkEmployeeDesc: "Autorización de residencia y trabajo por cuenta ajena, normalmente iniciada por el empleador.",
goalWorkSelf: "Trabajar por cuenta propia en España",
goalWorkSelfDesc: "Autorización inicial por cuenta propia mediante la vía consular.",
goalStudyAbroad: "Estudiar en España — solicitud desde el extranjero",
goalStudyAbroadDesc: "Visado / estancia de larga duración por estudios a través del consulado español.",
goalStudySpain: "Estudiar en España — ya estás legalmente en España",
goalStudySpainDesc: "Comprueba si puedes solicitar en España por Extranjería o Mercurio.",
familyEu: "Ciudadano de la UE/EEE/Suiza",
familyEuDesc: "Conduce a la tarjeta de familiar de ciudadano de la UE (EX-19).",
familySpanish: "Ciudadano español",
familySpanishDesc: "Normalmente conduce a la autorización de familiar de español (EX-24).",
familyNonEu: "Residente no comunitario en España",
familyNonEuDesc: "Conduce a la reagrupación familiar ordinaria (EX-02)."
});
};
const splitWizardChoices = () => {
const workInput = wizard.querySelector('input[name="goal"][value="work"]');
const workLabel = workInput?.closest("label");
if (workInput && workLabel && !wizard.querySelector('input[name="goal"][value="workEmployee"]')) {
workInput.value = "workEmployee";
workLabel.dataset.goalCard = "work-employee";
const workSpan = workLabel.querySelector("span");
const workSmall = workLabel.querySelector("small");
if (workSpan) workSpan.dataset.i18n = "goalWorkEmployee";
if (workSmall) workSmall.dataset.i18n = "goalWorkEmployeeDesc";
const selfLabel = workLabel.cloneNode(true);
const selfInput = selfLabel.querySelector("input");
const selfSpan = selfLabel.querySelector("span");
const selfSmall = selfLabel.querySelector("small");
selfInput.value = "workSelf";
selfInput.checked = false;
selfLabel.dataset.goalCard = "work-self";
if (selfSpan) selfSpan.dataset.i18n = "goalWorkSelf";
if (selfSmall) selfSmall.dataset.i18n = "goalWorkSelfDesc";
workLabel.after(selfLabel);
}
const studyInput = wizard.querySelector('input[name="goal"][value="study"]');
const studyLabel = studyInput?.closest("label");
if (studyInput && studyLabel && !wizard.querySelector('input[name="goal"][value="studyAbroad"]')) {
studyInput.value = "studyAbroad";
studyLabel.dataset.goalCard = "study-abroad";
const studySpan = studyLabel.querySelector("span");
const studySmall = studyLabel.querySelector("small");
if (studySpan) studySpan.dataset.i18n = "goalStudyAbroad";
if (studySmall) studySmall.dataset.i18n = "goalStudyAbroadDesc";
const inSpainLabel = studyLabel.cloneNode(true);
const inSpainInput = inSpainLabel.querySelector("input");
const inSpainSpan = inSpainLabel.querySelector("span");
const inSpainSmall = inSpainLabel.querySelector("small");
inSpainInput.value = "studySpain";
inSpainInput.checked = false;
inSpainLabel.dataset.goalCard = "study-spain";
if (inSpainSpan) inSpainSpan.dataset.i18n = "goalStudySpain";
if (inSpainSmall) inSpainSmall.dataset.i18n = "goalStudySpainDesc";
studyLabel.after(inSpainLabel);
}
const euFamilyInput = wizard.querySelector('input[name="familySponsor"][value="euSpanish"]');
const euFamilyLabel = euFamilyInput?.closest("label");
if (euFamilyInput && euFamilyLabel) {
euFamilyInput.value = "euCitizen";
const span = euFamilyLabel.querySelector("span");
const small = euFamilyLabel.querySelector("small");
if (span) span.dataset.i18n = "familyEu";
if (small) small.dataset.i18n = "familyEuDesc";
}
if (!wizard.querySelector('input[name="familySponsor"][value="spanishCitizen"]')) {
const nonEuFamilyInput = wizard.querySelector('input[name="familySponsor"][value="nonEuResident"]');
const nonEuLabel = nonEuFamilyInput?.closest("label");
if (nonEuLabel) {
const spanishLabel = document.createElement("label");
spanishLabel.innerHTML = '<input type="radio" name="familySponsor" value="spanishCitizen" /> <span data-i18n="familySpanish">Spanish citizen</span><small data-i18n="familySpanishDesc">Normally points to the family member of a Spanish national route (EX-24).</small>';
nonEuLabel.before(spanishLabel);
}
}
};
addOrReplaceRoute({
id: "work-employed",
title: "Employee residence and work authorization",
badge: "Spanish employer",
summary: "For a non-EU worker hired by a Spanish employer for more than 90 days. The employer normally files the initial authorization; after approval the worker completes the visa, entry, Social Security and TIE steps.",
appointment: "Employer files the authorization; TIE appointment after approval and entry",
documents: ["EX-03", "Passport", "Signed employment contract", "Employer and qualification evidence where required", "790-052 / 790-062 fee evidence", "EX-17 and 790-012 after approval"]
});
addOrReplaceRoute({
id: "work-self-employed",
title: "Self-employed residence and work authorization",
badge: "Self-employed",
summary: "For a non-EU person who is not resident in Spain and plans to carry out a self-employed activity. The initial EX-07 application is presented through the competent Spanish consulate, followed by visa, Social Security and TIE steps if approved.",
appointment: "Initial application through the competent Spanish consulate; TIE after approval and entry",
documents: ["EX-07", "Passport", "Business plan / investment evidence", "Licences and professional qualifications where required", "790-052 / 790-062 fee evidence", "EX-17 and 790-012 after approval"]
});
addOrReplaceRoute({
id: "study-abroad",
title: "Long-stay study application from abroad",
badge: "Study from abroad",
summary: "For a non-EU student applying from outside Spain for studies lasting more than 90 days. The application starts at the Spanish consulate responsible for the place of legal residence.",
appointment: "Spanish consulate / visa application, then TIE if the stay exceeds six months",
documents: ["EX-00 / consular study application documents", "Passport", "Admission and paid enrolment evidence", "Funds", "Health insurance", "Criminal record / medical evidence when required", "EX-17 after arrival if a TIE is required"]
});
addOrReplaceRoute({
id: "study-in-spain",
title: "Long-stay study application from Spain",
badge: "Apply in Spain",
summary: "For eligible non-EU students already legally in Spain. Current rules allow qualifying applications from Spain, including electronically through Mercurio, subject to the study type, legal status and filing deadlines.",
appointment: "Extranjería or Mercurio; TIE if the stay exceeds six months",
documents: ["EX-00", "Passport", "Proof of legal status in Spain", "Admission and paid enrolment evidence", "Funds", "Health insurance", "790-052", "EX-17 if a TIE is required"]
});
addOrReplaceRoute({
id: "study-short",
title: "Short study stay up to 90 days",
badge: "Study up to 90 days",
summary: "A course or study stay of up to 90 days does not use the long-stay study authorization. Check the Schengen short-stay visa rules for your nationality and the conditions of the specific course or activity.",
appointment: "Schengen visa appointment only if your nationality requires a visa",
documents: ["Passport", "Course / admission evidence", "Schengen visa documents if required", "Travel insurance and means where required"]
});
addOrReplaceRoute({
id: "spanish-family",
title: "Family member of a Spanish national",
badge: "Spanish-family residence",
summary: "The current general route for a non-EU family member joining a Spanish national is the temporary residence authorization for family members of Spanish nationals, using EX-24. It is separate from the EX-19 EU-family card route unless EU free-movement rules specifically apply.",
appointment: "EX-24 through the competent Extranjería / consular route; TIE after approval or entry",
documents: ["EX-24", "Passport of the foreign family member", "DNI or passport of the Spanish family member", "Family relationship evidence", "Criminal record / dependency evidence where required", "EX-17 and 790-012 for the TIE after approval"]
});
Object.assign(roadmapDetails, {
"work-employed": {
process: "Employee residence and work authorization",
explanation: "<p><strong>Who this is for:</strong> a non-EU worker who will be employed by a Spanish employer for more than 90 days.</p><p><strong>Who applies:</strong> the Spanish employer normally files the initial authorization. This is not a tourist-visa or short-stay workaround.</p><p><strong>How the process runs:</strong> employer files the authorization → authorization fees are paid → if approved, the worker applies for the corresponding visa at the competent Spanish consulate → enters Spain → Social Security registration → TIE fingerprints/card.</p>",
difficulty: "High",
timeline: "Official authorization stage can take up to three months, plus visa and card steps",
steps: ["Employer confirms the position and prepares EX-03 and supporting company/contract documents.", "Employer submits the initial authorization, including through Mercurio when using the electronic route.", "Pay the 790-052 residence fee and, where applicable, the 790-062 work fee.", "After approval, apply for the entry visa at the Spanish consulate responsible for your legal residence.", "Enter Spain and complete Social Security registration within the authorization/visa deadlines.", "Book TIE fingerprints and complete EX-17 + 790-012."],
documents: ["Passport", "EX-03", "Signed employment contract", "Employer solvency / compliance evidence", "Professional qualification evidence where required", "790-052 and applicable 790-062", "EX-17 and 790-012 for TIE"],
links: ["work-employed", "mercurio", "790-052", "790-062", "consulates", "cita", "790-012"]
},
"work-self-employed": {
process: "Self-employed residence and work authorization",
explanation: "<p><strong>Who this is for:</strong> a non-EU person who is not resident in Spain and wants to establish a self-employed activity.</p><p><strong>How you apply:</strong> the applicant files EX-07 personally through the competent Spanish consulate. The project must meet the professional, licensing and investment requirements for the planned activity.</p><p><strong>After approval:</strong> request the visa, enter Spain, register with Social Security and then obtain the TIE.</p>",
difficulty: "High",
timeline: "Official authorization stage can take up to three months, plus visa and card steps",
steps: ["Prepare EX-07, business plan, investment evidence, licences and professional qualifications where required.", "Present the initial application at the Spanish consulate responsible for your legal residence.", "Pay 790-052 and, for authorizations of six months or more, the applicable 790-062 work fee.", "After approval, request and collect the visa within the official deadlines.", "Enter Spain and complete Social Security registration.", "Book TIE fingerprints and complete EX-17 + 790-012."],
documents: ["Passport", "EX-07", "Business/project evidence", "Licences / qualifications", "Criminal record evidence", "790-052 and applicable 790-062", "EX-17 and 790-012 for TIE"],
links: ["work-self-employed", "consulates", "790-052", "790-062", "cita", "790-012"]
},
"study-abroad": {
process: "Long-stay study application from abroad",
explanation: "<p><strong>Who this is for:</strong> a non-EU student outside Spain planning qualifying studies lasting more than 90 days.</p><p><strong>Where to apply:</strong> at the Spanish diplomatic mission or consular office responsible for where you legally reside. Consular booking systems differ by country, so use the official consulate directory and then the visa instructions for your own consulate.</p><p><strong>After arrival:</strong> if the authorized stay exceeds six months, request the TIE within the official one-month window.</p>",
difficulty: "Medium to high",
timeline: "Consular study-visa decision is normally up to one month after a complete filing",
steps: ["Secure admission and pay the enrolment/registration amount required by the official route.", "Prepare passport, funds, health insurance and any criminal-record / medical documents required for your case.", "File through the competent Spanish consulate at least two months before studies begin unless an official exception applies.", "Pay Modelo 790-052, section 1.1.1, when the authorization fee is due.", "Collect the visa within the stated deadline if approved.", "If the stay exceeds six months, book the TIE after arrival."],
documents: ["Passport", "Admission and enrolment evidence", "Funds", "Health insurance", "Criminal record / medical certificate when required", "EX-17 and 790-012 if TIE required"],
links: ["study-official", "consulates", "790-052", "cita", "790-012"]
},
"study-in-spain": {
process: "Long-stay study application from Spain",
explanation: "<p><strong>Who this is for:</strong> an eligible non-EU student already legally in Spain. The exact eligibility depends on the study category and your current legal status.</p><p><strong>Where to apply:</strong> at the competent Oficina de Extranjería or electronically through Mercurio. For higher education, current rules allow an adult in regular status to apply from Spain subject to the filing deadlines.</p>",
difficulty: "Medium to high",
timeline: "Official decision period is normally up to two months",
steps: ["Check the official study sheet to confirm that your study type and current status allow an in-Spain application.", "Prepare EX-00, admission/enrolment, funds, health insurance and proof of legal status.", "Pay the 790-052 study authorization fee.", "Submit at Extranjería or electronically through Mercurio within the official deadlines.", "If the stay exceeds six months, complete the TIE step after approval."],
documents: ["Passport", "EX-00", "Proof of regular/legal status in Spain", "Admission and enrolment evidence", "Funds", "Health insurance", "790-052", "EX-17 and 790-012 if TIE required"],
links: ["study-official", "mercurio", "790-052", "cita", "790-012"]
},
"study-short": {
process: "Short study stay up to 90 days",
explanation: "<p><strong>For stays up to 90 days:</strong> the long-stay study authorization is not the normal route. Check whether your nationality requires a Schengen visa and follow the course/provider requirements.</p><p><strong>Border systems:</strong> EES is operational for applicable non-EU short-stay travellers. ETIAS is not yet operational and no ETIAS application is currently required.</p>",
difficulty: "Low to medium",
timeline: "Depends on whether a Schengen visa is required",
steps: ["Confirm the course/activity duration is 90 days or less.", "Check whether your nationality requires a Schengen visa.", "If required, apply at the competent Spanish consulate; otherwise prepare normal visa-free entry documents.", "Do not use the long-stay EX-00 route for a simple stay of 90 days or less."],
documents: ["Passport", "Course/admission evidence", "Schengen visa documents if required", "Insurance / accommodation / means as applicable"],
links: ["schengen", "consulates", "ees", "etias-status", "calculator"]
},
"spanish-family": {
process: "Residence for a family member of a Spanish national (EX-24)",
explanation: "<p><strong>Important:</strong> joining a Spanish citizen is now normally a separate route from the EU-family EX-19 card. The current general procedure uses EX-24.</p><p><strong>Where to apply:</strong> the correct filing location depends on where the Spanish citizen and foreign family member are living. The official procedure allows filing through the competent Extranjería office, the competent Spanish consulate in defined cases, and Mercurio for electronic filing where applicable.</p><p><strong>Fee:</strong> the residence-authorization procedure itself is free. After approval/entry, the TIE card step has its own Police fee.</p>",
difficulty: "Medium to high",
timeline: "Official authorization decision period is normally up to two months",
steps: ["Confirm that the Spanish-family route applies rather than EU free-movement rules.", "Prepare EX-24, identity documents and evidence of the qualifying family relationship/dependency.", "Use the official procedure to identify whether the application is filed by the Spanish sponsor in Spain, by the foreign family member through the consulate, or in Spain where permitted.", "Use Mercurio when the electronic filing option applies.", "If approval requires a visa before entry, complete the visa step within the stated deadline.", "After approval or entry, request the TIE within the official one-month window."],
documents: ["EX-24", "Passport of foreign family member", "DNI/passport of Spanish family member", "Family relationship evidence", "Criminal record / dependency evidence where required", "EX-17 and 790-012 for TIE"],
links: ["spanish-family-official", "ex24", "mercurio", "consulates", "cita", "790-012"]
}
});
Object.assign(roadmapDetailsEs, {
"work-employed": {
process: "Autorización de residencia y trabajo por cuenta ajena",
explanation: "<p><strong>Para quién:</strong> persona no comunitaria contratada por una empresa española para trabajar más de 90 días.</p><p><strong>Quién presenta:</strong> normalmente el empleador español inicia la autorización. No es una vía que se pueda sustituir por una estancia turística.</p>",
difficulty: "Alta",
timeline: "La fase de autorización puede tardar hasta tres meses, más visado y TIE",
steps: ["El empleador prepara EX-03, contrato y documentación empresarial.", "Presenta la autorización inicial, también por Mercurio cuando usa la vía electrónica.", "Abona la tasa 790-052 y, cuando corresponda, la 790-062.", "Tras la aprobación, solicita el visado en el consulado español competente.", "Entra en España y completa el alta en Seguridad Social.", "Reserva huellas/TIE y completa EX-17 + 790-012."],
documents: ["Pasaporte", "EX-03", "Contrato firmado", "Pruebas del empleador", "Titulación cuando corresponda", "790-052 y 790-062 si procede", "EX-17 y 790-012 para TIE"],
links: ["work-employed", "mercurio", "790-052", "790-062", "consulates", "cita", "790-012"]
},
"work-self-employed": {
process: "Autorización de residencia y trabajo por cuenta propia",
explanation: "<p><strong>Para quién:</strong> persona no comunitaria no residente en España que quiere desarrollar una actividad lucrativa por cuenta propia.</p><p><strong>Presentación:</strong> la solicitud EX-07 se presenta personalmente en el consulado español competente por lugar de residencia.</p>",
difficulty: "Alta",
timeline: "La fase de autorización puede tardar hasta tres meses, más visado y TIE",
steps: ["Prepara EX-07, plan de negocio, inversión, licencias y titulaciones cuando proceda.", "Presenta la solicitud inicial en el consulado español competente.", "Abona 790-052 y, para autorizaciones de seis meses o más, la 790-062 correspondiente.", "Tras la aprobación, solicita y recoge el visado dentro del plazo oficial.", "Entra en España y completa el alta en Seguridad Social.", "Reserva huellas/TIE y completa EX-17 + 790-012."],
documents: ["Pasaporte", "EX-07", "Proyecto empresarial", "Licencias/titulaciones", "Antecedentes", "790-052 y 790-062 si procede", "EX-17 y 790-012"],
links: ["work-self-employed", "consulates", "790-052", "790-062", "cita", "790-012"]
},
"study-abroad": {
process: "Estancia de larga duración por estudios desde el extranjero",
explanation: "<p><strong>Para quién:</strong> estudiante no comunitario fuera de España con estudios de más de 90 días.</p><p><strong>Presentación:</strong> en la misión diplomática u oficina consular española competente por tu residencia legal.</p>",
difficulty: "Media a alta",
timeline: "El plazo consular máximo suele ser un mes tras una solicitud completa",
steps: ["Obtén admisión y paga la matrícula exigida.", "Prepara pasaporte, medios, seguro y antecedentes/certificado médico cuando proceda.", "Presenta en el consulado competente con al menos dos meses de antelación salvo excepción oficial.", "Abona Modelo 790-052, epígrafe 1.1.1, cuando se devengue la tasa de autorización.", "Recoge el visado dentro del plazo si se aprueba.", "Si la estancia supera seis meses, solicita la TIE tras entrar."],
documents: ["Pasaporte", "Admisión y matrícula", "Medios económicos", "Seguro", "Antecedentes/certificado médico cuando proceda", "EX-17 y 790-012 si TIE"],
links: ["study-official", "consulates", "790-052", "cita", "790-012"]
},
"study-in-spain": {
process: "Estancia por estudios solicitada desde España",
explanation: "<p><strong>Para quién:</strong> estudiante no comunitario que ya se encuentra legalmente en España y cumple las condiciones para presentar desde España.</p><p><strong>Dónde:</strong> Oficina de Extranjería competente o Mercurio por vía telemática.</p>",
difficulty: "Media a alta",
timeline: "El plazo oficial de resolución suele ser de hasta dos meses",
steps: ["Comprueba en la hoja oficial que tu tipo de estudios y situación permiten presentar desde España.", "Prepara EX-00, admisión/matrícula, medios, seguro y prueba de situación legal.", "Abona la tasa 790-052 de estudios.", "Presenta en Extranjería o por Mercurio dentro de los plazos.", "Si la estancia supera seis meses, completa la TIE tras la aprobación."],
documents: ["Pasaporte", "EX-00", "Prueba de situación legal", "Admisión/matrícula", "Medios", "Seguro", "790-052", "EX-17 y 790-012 si TIE"],
links: ["study-official", "mercurio", "790-052", "cita", "790-012"]
},
"study-short": {
process: "Estudios de hasta 90 días",
explanation: "<p>Para un curso o estudios de hasta 90 días no se utiliza normalmente la autorización de estancia de larga duración. Comprueba si tu nacionalidad necesita visado Schengen.</p><p>EES está operativo para los viajeros no comunitarios a los que se aplica. ETIAS todavía no está operativo y actualmente no se solicita.</p>",
difficulty: "Baja a media",
timeline: "Depende de si necesitas visado Schengen",
steps: ["Confirma que el curso dura 90 días o menos.", "Comprueba si tu nacionalidad exige visado Schengen.", "Si lo exige, solicita en el consulado competente; si estás exento, prepara la documentación normal de entrada.", "No uses EX-00 de larga duración para una estancia simple de 90 días o menos."],
documents: ["Pasaporte", "Prueba del curso", "Documentación Schengen si se exige", "Seguro/alojamiento/medios cuando proceda"],
links: ["schengen", "consulates", "ees", "etias-status", "calculator"]
},
"spanish-family": {
process: "Residencia de familiar de persona con nacionalidad española (EX-24)",
explanation: "<p><strong>Importante:</strong> reunirse con un ciudadano español utiliza normalmente una vía propia distinta de la tarjeta EX-19 de familiar de ciudadano de la UE. El procedimiento general actual usa EX-24.</p><p><strong>Presentación:</strong> según dónde residan el ciudadano español y el familiar extranjero, puede corresponder Extranjería, consulado o Mercurio.</p><p><strong>Tasa:</strong> el procedimiento de autorización de residencia es gratuito; la TIE posterior tiene su propia tasa policial.</p>",
difficulty: "Media a alta",
timeline: "El plazo oficial de resolución suele ser de hasta dos meses",
steps: ["Confirma que corresponde la vía de familiar de español y no el régimen de libre circulación UE.", "Prepara EX-24, identidades y prueba del vínculo/dependencia.", "Usa la hoja oficial para determinar quién presenta y dónde.", "Utiliza Mercurio cuando corresponda la vía telemática.", "Si tras la aprobación hace falta visado de entrada, complétalo dentro del plazo.", "Después de la aprobación o entrada, solicita la TIE dentro del plazo de un mes."],
documents: ["EX-24", "Pasaporte del familiar extranjero", "DNI/pasaporte del familiar español", "Prueba del vínculo", "Antecedentes/dependencia cuando proceda", "EX-17 y 790-012 para TIE"],
links: ["spanish-family-official", "ex24", "mercurio", "consulates", "cita", "790-012"]
}
});
const euRegistration = routes.find((item) => item.id === "eu-registration");
if (euRegistration) {
euRegistration.summary = "EU, EEA, and Swiss citizens staying in Spain for more than three months register for the Certificado de Registro de Ciudadano de la Unión. Bring EX-18, identity, the evidence for your residence basis and local address evidence requested by the office. If you already have a NIE, bring it; a previously issued standalone NIE should not be presented as universally mandatory before EU registration.";
euRegistration.documents = ["EX-18 form", "Passport or national ID", "Existing NIE if already assigned", "Padrón / address evidence requested by the office", "Employment, self-employment, study, or sufficient-resource evidence", "Health coverage where required", "Paid tasa receipt"];
}
if (roadmapDetails["eu-registration"]) {
roadmapDetails["eu-registration"].steps = ["Prepare EX-18 and your passport or EU national ID.", "If you already have a NIE, bring it; otherwise follow the instructions of the office handling your EU registration.", "Prepare padrón/address evidence requested by the office and proof of your residence basis (work, self-employment, study, or sufficient resources).", "Arrange health cover if your residence basis requires it.", "Pay Modelo 790-012 for the EU registration certificate.", "Book and attend the EU Registration Certificate appointment."];
roadmapDetails["eu-registration"].documents = ["Passport or EU national ID", "EX-18", "Existing NIE if already assigned", "Padrón/address evidence requested by the office", "Work/funds/study proof", "Health cover if required", "790-012 receipt"];
}
if (roadmapDetailsEs["eu-registration"]) {
roadmapDetailsEs["eu-registration"].steps = ["Prepara EX-18 y pasaporte o documento nacional UE.", "Si ya tienes NIE, llévalo; si no, sigue las instrucciones de la oficina que tramite tu registro UE.", "Prepara padrón/prueba de domicilio que pida la oficina y la prueba de tu base de residencia.", "Contrata cobertura sanitaria si tu situación la exige.", "Paga el Modelo 790-012 del certificado UE.", "Reserva y acude a la cita del Certificado de Registro UE."];
roadmapDetailsEs["eu-registration"].documents = ["Pasaporte o documento UE", "EX-18", "NIE existente si ya está asignado", "Padrón/prueba de domicilio solicitada", "Prueba de trabajo/fondos/estudios", "Cobertura sanitaria cuando proceda", "790-012"];
}
const nonEuVacation = routes.find((item) => item.id === "non-eu-vacation");
if (nonEuVacation) nonEuVacation.summary = "For a short visit, first check whether your nationality requires a Schengen visa. EES is operational for applicable non-EU short-stay travellers. ETIAS is not yet operational and no ETIAS application is currently required.";
if (roadmapDetails["non-eu-vacation"]) {
roadmapDetails["non-eu-vacation"].steps = ["Check whether your nationality requires a Schengen short-stay visa.", "If a visa is required, apply through the Spanish consulate responsible for your legal residence.", "If visa-exempt, prepare the normal entry documents and respect the 90/180 limit.", "Expect EES registration at the external border where it applies.", "Do not apply for ETIAS yet: it is not currently operational."];
roadmapDetails["non-eu-vacation"].links = ["schengen", "consulates", "ees", "etias-status", "calculator"];
}
if (roadmapDetailsEs["non-eu-vacation"]) {
roadmapDetailsEs["non-eu-vacation"].steps = ["Comprueba si tu nacionalidad necesita visado Schengen de corta duración.", "Si necesitas visado, solicítalo en el consulado español competente por tu residencia legal.", "Si estás exento, prepara los documentos normales de entrada y respeta el límite 90/180.", "EES ya está operativo y se aplica a los viajeros no comunitarios correspondientes.", "No solicites ETIAS todavía: actualmente no está operativo."];
roadmapDetailsEs["non-eu-vacation"].links = ["schengen", "consulates", "ees", "etias-status", "calculator"];
}
const digitalNomad = routes.find((item) => item.id === "digital-nomad");
if (digitalNomad) digitalNomad.summary = "Spain's international telework route is for non-EU remote workers. Employees may work only for companies outside Spain; self-employed/professional applicants may perform Spanish-client work up to 20% of their total professional activity. From abroad, use the consular visa route; if legally in Spain, the residence authorization is filed with UGE-CE.";
if (roadmapDetails["digital-nomad"]) {
roadmapDetails["digital-nomad"].steps = ["Confirm whether you are an employee or a self-employed/professional remote worker and apply the correct Spanish-client rule.", "Prepare the employment/professional relationship evidence, company documents, qualifications/experience and other required evidence.", "If outside Spain, use the competent Spanish consulate for the telework visa; if legally in Spain, file the residence authorization through UGE-CE.", "For the UGE residence authorization, pay Modelo 790-038 and keep the NRC/payment evidence required by the filing system.", "After approval, complete the TIE step where applicable."];
roadmapDetails["digital-nomad"].links = ["digital-nomad-official", "uge-apply", "790-038", "consulates", "cita", "790-012"];
}
if (roadmapDetailsEs["digital-nomad"]) {
roadmapDetailsEs["digital-nomad"].steps = ["Confirma si eres trabajador por cuenta ajena o profesional/autónomo remoto y aplica la regla correcta sobre actividad para clientes españoles.", "Prepara relación laboral/profesional, documentos de empresa, titulación/experiencia y demás pruebas exigidas.", "Si estás fuera de España, usa el consulado competente para el visado; si estás legalmente en España, presenta la autorización en UGE-CE.", "Para la autorización UGE, paga el Modelo 790-038 y conserva el NRC/justificante requerido.", "Tras la aprobación, completa la TIE cuando corresponda."];
roadmapDetailsEs["digital-nomad"].links = ["digital-nomad-official", "uge-apply", "790-038", "consulates", "cita", "790-012"];
}
if (roadmapDetails["non-lucrative"]) {
roadmapDetails["non-lucrative"].steps = ["Confirm that you will reside without carrying out work or professional activity in Spain.", "Prepare funds, health insurance, criminal record and medical certificate as required.", "Find the Spanish consulate responsible for your legal residence and follow that consulate's non-lucrative visa filing/appointment instructions.", "Pay Modelo 790-052, section 2.1.1, for the residence authorization.", "After approval, collect the visa, enter Spain within its validity and request the TIE within one month of entry."];
roadmapDetails["non-lucrative"].links = ["non-lucrative-official", "consulates", "790-052", "cita", "790-012"];
}
if (roadmapDetailsEs["non-lucrative"]) {
roadmapDetailsEs["non-lucrative"].steps = ["Confirma que vas a residir sin realizar actividad laboral o profesional en España.", "Prepara fondos, seguro médico, antecedentes y certificado médico cuando corresponda.", "Localiza el consulado español competente por tu residencia legal y sigue sus instrucciones de cita/presentación.", "Paga Modelo 790-052, epígrafe 2.1.1.", "Tras la aprobación, recoge el visado, entra dentro de su vigencia y solicita la TIE dentro del mes siguiente a la entrada."];
roadmapDetailsEs["non-lucrative"].links = ["non-lucrative-official", "consulates", "790-052", "cita", "790-012"];
}
if (roadmapDetails.family) {
roadmapDetails.family.steps = ["Confirm that the sponsor in Spain is a non-EU legal resident and that ordinary family reunification is the correct route.", "Prepare EX-02, family relationship evidence, sponsor residence documents, housing evidence and economic means.", "The sponsor files in Spain, including electronically through Mercurio where using the online route.", "Pay Modelo 790-052, section 2.1.2.", "After approval, the family member completes the visa step at the competent Spanish consulate.", "After arrival, complete the TIE step with EX-17 and 790-012."];
roadmapDetails.family.links = ["family-official", "mercurio", "790-052", "consulates", "cita", "790-012"];
}
if (roadmapDetailsEs.family) {
roadmapDetailsEs.family.steps = ["Confirma que quien reagrupa es residente legal no comunitario y que corresponde reagrupación familiar ordinaria.", "Prepara EX-02, vínculo familiar, residencia del reagrupante, vivienda y medios económicos.", "El reagrupante presenta en España, también por Mercurio cuando use la vía telemática.", "Paga Modelo 790-052, epígrafe 2.1.2.", "Tras la aprobación, el familiar completa el visado en el consulado español competente.", "Después de la entrada, completa la TIE con EX-17 y 790-012."];
roadmapDetailsEs.family.links = ["family-official", "mercurio", "790-052", "consulates", "cita", "790-012"];
}
const euFamily = routes.find((item) => item.id === "eu-family");
if (euFamily) {
euFamily.title = "Family member of an EU/EEA/Swiss citizen";
euFamily.summary = "For a non-EU family member joining or accompanying an EU, EEA or Swiss citizen under EU free-movement rules. This route normally uses EX-19. A family member joining a Spanish citizen should use the separate Spanish-family route unless EU free-movement rules specifically apply.";
}
const legacyWork = routes.find((item) => item.id === "work-authorization");
if (legacyWork) {
legacyWork.summary = "Non-EU work routes split into two different procedures: employment by a Spanish employer (EX-03, normally employer-led and eligible for Mercurio) and initial self-employment (EX-07, filed through the competent Spanish consulate). Choose the matching route in the roadmap before filing.";
}
if (roadmapDetails["work-authorization"]) {
roadmapDetails["work-authorization"].explanation = "<p><strong>Choose the correct branch first:</strong> employee work and self-employed work are separate initial procedures.</p><p><strong>Employee:</strong> EX-03, normally filed by the Spanish employer, with Mercurio available for electronic filing.</p><p><strong>Self-employed:</strong> EX-07, filed personally through the competent Spanish consulate for an applicant who is not resident in Spain.</p>";
roadmapDetails["work-authorization"].steps = ["If a Spanish company is hiring you, use the employee route (EX-03).", "If you will establish your own activity, use the self-employed route (EX-07).", "Do not rely on a Schengen short stay to replace the required work authorization.", "Use the official route-specific page before paying fees or booking the visa/TIE steps."];
roadmapDetails["work-authorization"].links = ["work-employed", "work-self-employed", "mercurio", "790-052", "790-062", "consulates"];
}
if (roadmapDetailsEs["work-authorization"]) {
roadmapDetailsEs["work-authorization"].explanation = "<p><strong>Elige la rama correcta:</strong> trabajo por cuenta ajena y por cuenta propia son procedimientos iniciales distintos.</p><p><strong>Cuenta ajena:</strong> EX-03, normalmente presentado por el empleador, con Mercurio para vía telemática.</p><p><strong>Cuenta propia:</strong> EX-07, presentado personalmente por el solicitante no residente en el consulado español competente.</p>";
roadmapDetailsEs["work-authorization"].steps = ["Si te contrata una empresa española, usa la vía por cuenta ajena EX-03.", "Si montarás tu propia actividad, usa la vía por cuenta propia EX-07.", "No uses una estancia Schengen como sustituto de la autorización de trabajo.", "Abre la hoja oficial de la vía concreta antes de pagar tasas o tramitar visado/TIE."];
roadmapDetailsEs["work-authorization"].links = ["work-employed", "work-self-employed", "mercurio", "790-052", "790-062", "consulates"];
}
const legacyStudy = routes.find((item) => item.id === "study");
if (legacyStudy) legacyStudy.summary = "Non-EU study stays over 90 days now need the correct application path based on where you apply: Spanish consulate from abroad, or an eligible in-Spain application through Extranjería/Mercurio where the current rules allow it.";
if (roadmapDetails.study) {
roadmapDetails.study.explanation = "<p><strong>First choose where you are applying from:</strong> from abroad, use the competent Spanish consulate; if already legally in Spain, check whether your study category and legal status allow an in-Spain application through Extranjería or Mercurio.</p>";
roadmapDetails.study.steps = ["Confirm the study lasts more than 90 days; shorter studies use short-stay rules.", "If outside Spain, follow the competent Spanish consulate's study-visa process.", "If legally in Spain, check the official sheet to see whether you can file from Spain and use Mercurio where available.", "Pay the applicable study authorization fee and complete TIE if the stay exceeds six months."];
roadmapDetails.study.links = ["study-official", "consulates", "mercurio", "790-052", "cita", "790-012"];
}
if (roadmapDetailsEs.study) {
roadmapDetailsEs.study.explanation = "<p><strong>Primero elige desde dónde presentas:</strong> desde el extranjero, usa el consulado español competente; si ya estás legalmente en España, comprueba si tu categoría de estudios y situación permiten presentar desde España por Extranjería o Mercurio.</p>";
roadmapDetailsEs.study.steps = ["Confirma que los estudios duran más de 90 días; los estudios más cortos siguen reglas de estancia corta.", "Si estás fuera, sigue el proceso de estudios del consulado competente.", "Si estás legalmente en España, revisa la hoja oficial y usa Mercurio cuando esté disponible.", "Paga la tasa de autorización que corresponda y completa la TIE si la estancia supera seis meses."];
roadmapDetailsEs.study.links = ["study-official", "consulates", "mercurio", "790-052", "cita", "790-012"];
}
if (roadmapDetails["eu-family"]) {
roadmapDetails["eu-family"].explanation = "<p><strong>Who this route is for:</strong> a non-EU family member joining or accompanying an EU, EEA or Swiss citizen under EU free-movement rules.</p><p><strong>Form:</strong> EX-19. A family member joining a Spanish citizen normally uses the separate EX-24 Spanish-family route unless EU free-movement rules specifically apply.</p>";
roadmapDetails["eu-family"].steps = ["Confirm the sponsor is an EU/EEA/Swiss citizen and that EU free-movement rules apply.", "Prepare family relationship evidence and the EU citizen's residence-basis documents.", "Complete EX-19.", "File through the competent office and follow the official appointment instructions.", "Pay the applicable 790-012 card fee and complete the card/fingerprint step where required."];
roadmapDetails["eu-family"].documents = ["Passport", "EX-19", "EU/EEA/Swiss sponsor identity and residence evidence", "Marriage/partnership/birth/dependency evidence", "790-012 receipt where required"];
}
if (roadmapDetailsEs["eu-family"]) {
roadmapDetailsEs["eu-family"].explanation = "<p><strong>Para quién:</strong> familiar no comunitario que acompaña o se reúne con un ciudadano de la UE, EEE o Suiza bajo las normas de libre circulación.</p><p><strong>Formulario:</strong> EX-19. El familiar de un ciudadano español usa normalmente la vía separada EX-24, salvo que sean aplicables específicamente las normas de libre circulación UE.</p>";
roadmapDetailsEs["eu-family"].steps = ["Confirma que quien te reúne es ciudadano UE/EEE/Suiza y que se aplica libre circulación.", "Prepara vínculo familiar y documentos de residencia del ciudadano UE.", "Completa EX-19.", "Presenta por la oficina competente y sigue las instrucciones oficiales de cita.", "Paga la tasa 790-012 aplicable y completa tarjeta/huellas cuando corresponda."];
roadmapDetailsEs["eu-family"].documents = ["Pasaporte", "EX-19", "Identidad y residencia del ciudadano UE/EEE/Suiza", "Prueba de matrimonio/pareja/nacimiento/dependencia", "790-012 cuando proceda"];
}
const feeHelper = (title, purpose, officialUrl) => ({ title, purpose, officialUrl, fields: [], checks: [] });
Object.assign(formHelpers, {
"790-052": feeHelper("Modelo 790 Código 052", "Residence-authorization fee for many Extranjería procedures handled by provincial immigration offices.", "https://sede.administracionespublicas.gob.es/tasasPDF/prepareProvincia?idModelo=790&idTasa=052"),
"790-062": feeHelper("Modelo 790 Código 062", "Work-authorization fee used for applicable initial work authorizations.", "https://sede.administracionespublicas.gob.es/tasasPDF/prepareProvincia?idModelo=790&idTasa=062"),
"790-038": feeHelper("Modelo 790 Código 038", "Fee used for international-mobility residence authorizations handled by UGE, including the international telework residence authorization.", "https://sede.inclusion.gob.es/w/autorizaciones-de-trabajo-y-residencia-tasa-038?redirect=%2Fextranjeria"),
"EX-24": feeHelper("EX-24 Spanish-family residence", "Official form for temporary residence authorization for family members of Spanish nationals.", "https://www.inclusion.gob.es/documents/d/migraciones/ex24-formulario-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola-1")
});
const employeeForms = {
forms: [["EX-03", "Initial employee residence and work authorization", "Authorization form", "EX-03"], ["EX-17", "TIE after approval", "Form", "EX-17"]],
taxes: [["790-052", "Residence authorization fee — section 2.1.3", "Official amount (EUR)", "790-052"], ["790-062", "Work authorization fee where applicable", "Official amount (EUR)", "790-062"], ["790-012", "TIE card after approval", "See Police generator", "790-012"]],
links: ["work-employed", "mercurio", "790-052", "790-062", "consulates", "cita", "790-012"]
};
const selfForms = {
forms: [["EX-07", "Initial self-employed residence and work authorization", "Authorization form", "EX-07"], ["EX-17", "TIE after approval", "Form", "EX-17"]],
taxes: [["790-052", "Residence authorization fee — section 2.1.3", "Official amount (EUR)", "790-052"], ["790-062", "Self-employed work authorization fee if authorization is six months or more", "Official amount (EUR)", "790-062"], ["790-012", "TIE card after approval", "See Police generator", "790-012"]],
links: ["work-self-employed", "consulates", "790-052", "790-062", "cita", "790-012"]
};
routeFormsAndTaxes["work-employed"] = employeeForms;
routeFormsAndTaxes["work-self-employed"] = selfForms;
routeFormsAndTaxesEs["work-employed"] = {
forms: [["EX-03", "Autorización inicial de residencia y trabajo por cuenta ajena", "Formulario de autorización", "EX-03"], ["EX-17", "TIE tras la aprobación", "Formulario", "EX-17"]],
taxes: [["790-052", "Tasa de residencia — epígrafe 2.1.3", "Importe oficial (EUR)", "790-052"], ["790-062", "Tasa de autorización de trabajo cuando corresponda", "Importe oficial (EUR)", "790-062"], ["790-012", "TIE tras la aprobación", "Ver generador Policía", "790-012"]],
links: ["work-employed", "mercurio", "790-052", "790-062", "consulates", "cita", "790-012"]
};
routeFormsAndTaxesEs["work-self-employed"] = {
forms: [["EX-07", "Autorización inicial de residencia y trabajo por cuenta propia", "Formulario de autorización", "EX-07"], ["EX-17", "TIE tras la aprobación", "Formulario", "EX-17"]],
taxes: [["790-052", "Tasa de residencia — epígrafe 2.1.3", "Importe oficial (EUR)", "790-052"], ["790-062", "Tasa de trabajo por cuenta propia si la autorización es de seis meses o más", "Importe oficial (EUR)", "790-062"], ["790-012", "TIE tras la aprobación", "Ver generador Policía", "790-012"]],
links: ["work-self-employed", "consulates", "790-052", "790-062", "cita", "790-012"]
};
routeFormsAndTaxes["study-abroad"] = { forms: [["EX-00", "Long-stay study authorization form", "Authorization form", "EX-00"], ["EX-17", "TIE if stay exceeds six months", "Form", "EX-17"]], taxes: [["790-052", "Initial long-stay study authorization — section 1.1.1", "Official amount (EUR)", "790-052"], ["790-012", "TIE if required after arrival", "See Police generator", "790-012"]], links: ["study-official", "consulates", "790-052", "cita", "790-012"] };
routeFormsAndTaxes["study-in-spain"] = { forms: [["EX-00", "Long-stay study authorization form", "Authorization form", "EX-00"], ["EX-17", "TIE if stay exceeds six months", "Form", "EX-17"]], taxes: [["790-052", "Initial long-stay study authorization — section 1.1.1", "Official amount (EUR)", "790-052"], ["790-012", "TIE if required", "See Police generator", "790-012"]], links: ["study-official", "mercurio", "790-052", "cita", "790-012"] };
routeFormsAndTaxes["study-short"] = { forms: [], taxes: [], links: ["schengen", "consulates", "ees", "etias-status", "calculator"] };
routeFormsAndTaxes["spanish-family"] = { forms: [["EX-24", "Residence authorization for family member of a Spanish national", "Authorization form", "EX-24"], ["EX-17", "TIE after approval / entry", "Form", "EX-17"]], taxes: [["790-012", "TIE card fee after approval / entry", "See Police generator", "790-012"]], links: ["spanish-family-official", "ex24", "mercurio", "consulates", "cita", "790-012"] };
routeFormsAndTaxesEs["study-abroad"] = { forms: [["EX-00", "Formulario de estancia de larga duración por estudios", "Formulario de autorización", "EX-00"], ["EX-17", "TIE si la estancia supera seis meses", "Formulario", "EX-17"]], taxes: [["790-052", "Autorización inicial de estudios — epígrafe 1.1.1", "Importe oficial (EUR)", "790-052"], ["790-012", "TIE si corresponde tras la entrada", "Ver generador Policía", "790-012"]], links: ["study-official", "consulates", "790-052", "cita", "790-012"] };
routeFormsAndTaxesEs["study-in-spain"] = { forms: [["EX-00", "Formulario de estancia de larga duración por estudios", "Formulario de autorización", "EX-00"], ["EX-17", "TIE si la estancia supera seis meses", "Formulario", "EX-17"]], taxes: [["790-052", "Autorización inicial de estudios — epígrafe 1.1.1", "Importe oficial (EUR)", "790-052"], ["790-012", "TIE si corresponde", "Ver generador Policía", "790-012"]], links: ["study-official", "mercurio", "790-052", "cita", "790-012"] };
routeFormsAndTaxesEs["study-short"] = { forms: [], taxes: [], links: ["schengen", "consulates", "ees", "etias-status", "calculator"] };
routeFormsAndTaxesEs["spanish-family"] = { forms: [["EX-24", "Autorización de residencia para familiar de persona española", "Formulario de autorización", "EX-24"], ["EX-17", "TIE tras aprobación / entrada", "Formulario", "EX-17"]], taxes: [["790-012", "Tasa de TIE tras aprobación / entrada", "Ver generador Policía", "790-012"]], links: ["spanish-family-official", "ex24", "mercurio", "consulates", "cita", "790-012"] };
if (routeFormsAndTaxes["eu-registration"]?.forms) {
routeFormsAndTaxes["eu-registration"].forms = routeFormsAndTaxes["eu-registration"].forms.map((row) => row[0] === "NIE" ? ["NIE (if already assigned)", "Bring an existing NIE if you already have one; do not treat a standalone prior NIE as universally mandatory.", "Existing detail", ""] : row);
}
if (routeFormsAndTaxesEs["eu-registration"]?.forms) {
routeFormsAndTaxesEs["eu-registration"].forms = routeFormsAndTaxesEs["eu-registration"].forms.map((row) => row[0] === "NIE" ? ["NIE (si ya está asignado)", "Lleva tu NIE si ya lo tienes; no se presenta como requisito universal obtenerlo por separado antes del registro UE.", "Dato existente", ""] : row);
}
routeFormsAndTaxes["digital-nomad"] = { forms: [["UGE online application", "International telework residence authorization", "Official application portal", "digital-nomad-official"], ["EX-17", "TIE after approval", "Form", "EX-17"]], taxes: [["790-038", "International mobility authorization fee — point 7", "Official amount (EUR)", "790-038"], ["790-012", "TIE after approval", "See Police generator", "790-012"]], links: ["digital-nomad-official", "uge-apply", "790-038", "consulates", "cita", "790-012"] };
routeFormsAndTaxesEs["digital-nomad"] = { forms: [["Solicitud online UGE", "Autorización de residencia para teletrabajo internacional", "Portal oficial de solicitud", "digital-nomad-official"], ["EX-17", "TIE tras aprobación", "Formulario", "EX-17"]], taxes: [["790-038", "Tasa de movilidad internacional — punto 7", "Importe oficial (EUR)", "790-038"], ["790-012", "TIE tras aprobación", "Ver generador Policía", "790-012"]], links: ["digital-nomad-official", "uge-apply", "790-038", "consulates", "cita", "790-012"] };
routeFormsAndTaxes["non-lucrative"] = { forms: [["EX-01", "Initial non-lucrative residence authorization", "Authorization form", "EX-01"], ["EX-17", "TIE after visa / entry", "Form", "EX-17"]], taxes: [["790-052", "Non-lucrative residence authorization — section 2.1.1", "Official amount (EUR)", "790-052"], ["790-012", "TIE after entry", "See Police generator", "790-012"]], links: ["non-lucrative-official", "consulates", "790-052", "cita", "790-012"] };
routeFormsAndTaxesEs["non-lucrative"] = { forms: [["EX-01", "Autorización inicial de residencia no lucrativa", "Formulario de autorización", "EX-01"], ["EX-17", "TIE tras visado / entrada", "Formulario", "EX-17"]], taxes: [["790-052", "Residencia no lucrativa — epígrafe 2.1.1", "Importe oficial (EUR)", "790-052"], ["790-012", "TIE tras entrada", "Ver generador Policía", "790-012"]], links: ["non-lucrative-official", "consulates", "790-052", "cita", "790-012"] };
routeFormsAndTaxes.family = { forms: [["EX-02", "Family reunification residence authorization", "Authorization form", "EX-02"], ["EX-17", "TIE after approval / visa / entry", "Form", "EX-17"]], taxes: [["790-052", "Family reunification authorization — section 2.1.2", "Official amount (EUR)", "790-052"], ["790-012", "TIE after entry", "See Police generator", "790-012"]], links: ["family-official", "mercurio", "790-052", "consulates", "cita", "790-012"] };
routeFormsAndTaxesEs.family = { forms: [["EX-02", "Autorización de residencia por reagrupación familiar", "Formulario de autorización", "EX-02"], ["EX-17", "TIE tras aprobación / visado / entrada", "Formulario", "EX-17"]], taxes: [["790-052", "Reagrupación familiar — epígrafe 2.1.2", "Importe oficial (EUR)", "790-052"], ["790-012", "TIE tras entrada", "Ver generador Policía", "790-012"]], links: ["family-official", "mercurio", "790-052", "consulates", "cita", "790-012"] };
if (routeFormsAndTaxes["work-authorization"]) {
routeFormsAndTaxes["work-authorization"].taxes = [["790-052", "Residence authorization fee for the selected employee/self-employed route", "Official amount (EUR)", "790-052"], ["790-062", "Work authorization fee where applicable", "Official amount (EUR)", "790-062"], ["790-012", "TIE after approval", "See Police generator", "790-012"]];
routeFormsAndTaxes["work-authorization"].links = ["work-employed", "work-self-employed", "mercurio", "790-052", "790-062", "consulates"];
}
if (routeFormsAndTaxesEs["work-authorization"]) {
routeFormsAndTaxesEs["work-authorization"].taxes = [["790-052", "Tasa de residencia de la vía seleccionada", "Importe oficial (EUR)", "790-052"], ["790-062", "Tasa de trabajo cuando proceda", "Importe oficial (EUR)", "790-062"], ["790-012", "TIE tras aprobación", "Ver generador Policía", "790-012"]];
routeFormsAndTaxesEs["work-authorization"].links = ["work-employed", "work-self-employed", "mercurio", "790-052", "790-062", "consulates"];
}
if (routeFormsAndTaxes.study) {
routeFormsAndTaxes.study.taxes = [["790-052", "In-Spain long-stay study authorization where applicable", "Official amount (EUR)", "790-052"], ["790-012", "TIE if required", "See Police generator", "790-012"]];
routeFormsAndTaxes.study.links = ["study-official", "consulates", "mercurio", "790-052", "cita", "790-012"];
}
if (routeFormsAndTaxesEs.study) {
routeFormsAndTaxesEs.study.taxes = [["790-052", "Autorización de estudios desde España cuando proceda", "Importe oficial (EUR)", "790-052"], ["790-012", "TIE si corresponde", "Ver generador Policía", "790-012"]];
routeFormsAndTaxesEs.study.links = ["study-official", "consulates", "mercurio", "790-052", "cita", "790-012"];
}
if (routeFormsAndTaxes["non-eu-vacation"]) routeFormsAndTaxes["non-eu-vacation"].links = ["schengen", "consulates", "ees", "etias-status", "calculator"];
if (routeFormsAndTaxesEs["non-eu-vacation"]) routeFormsAndTaxesEs["non-eu-vacation"].links = ["schengen", "consulates", "ees", "etias-status", "calculator"];
Object.assign(linkLabels.en, {
schengen: "Check if you need a Schengen visa",
ees: "Entry/Exit System (EES) — operational",
"etias-status": "ETIAS status — not active yet",
mercurio: "Apply online in Mercurio",
"790-052": "Generate / pay 790-052",
"790-062": "Generate / pay 790-062",
"790-038": "Pay 790-038 (UGE)",
"uge-apply": "Apply online through UGE-CE",
consulates: "Find your Spanish consulate",
"spanish-family-official": "Family member of a Spanish national — official route",
ex24: "EX-24 official form"
});
Object.assign(linkLabels.es, {
schengen: "Comprobar si necesitas visado Schengen",
ees: "Sistema de Entradas y Salidas (EES) — operativo",
"etias-status": "Estado de ETIAS — todavía no operativo",
mercurio: "Presentar online en Mercurio",
"790-052": "Generar / pagar 790-052",
"790-062": "Generar / pagar 790-062",
"790-038": "Pagar 790-038 (UGE)",
"uge-apply": "Presentar online por UGE-CE",
consulates: "Buscar tu consulado español",
"spanish-family-official": "Familiar de persona española — vía oficial",
ex24: "Formulario oficial EX-24"
});
Object.assign(urls, {
schengen: "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en",
ees: "https://home-affairs.ec.europa.eu/news/entry-exit-system-fully-operational-10-april-2026-who-exempt-2026-07-27_en",
"etias-status": "https://www.travel-europe.europa.eu/etias/about-etias",
mercurio: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2/language/es_ES",
"790-052": "https://sede.administracionespublicas.gob.es/tasasPDF/prepareProvincia?idModelo=790&idTasa=052",
"790-062": "https://sede.administracionespublicas.gob.es/tasasPDF/prepareProvincia?idModelo=790&idTasa=062",
"790-038": "https://sede.inclusion.gob.es/w/autorizaciones-de-trabajo-y-residencia-tasa-038?redirect=%2Fextranjeria",
"uge-apply": "https://sede.inclusion.gob.es/w/presentacion-solicitudes-autorizacion-residencia?redirect=%2Fextranjeria",
consulates: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Servicios-consulares.aspx",
"spanish-family-official": "https://www.inclusion.gob.es/web/migraciones/w/18.-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola",
ex24: "https://www.inclusion.gob.es/documents/d/migraciones/ex24-formulario-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola-1"
});
Object.assign(govMeta, {
mercurio: { subtitle: currentLang === "es" ? "Sede oficial de Extranjería" : "Official Extranjería filing portal", variant: "general", system: "spain" },
"790-052": { subtitle: currentLang === "es" ? "Tasa oficial de Extranjería" : "Official Extranjería fee", variant: "tax", system: "spain" },
"790-062": { subtitle: currentLang === "es" ? "Tasa oficial de trabajo" : "Official work authorization fee", variant: "tax", system: "spain" },
"790-038": { subtitle: currentLang === "es" ? "Tasa oficial UGE" : "Official UGE fee", variant: "tax", system: "spain" },
"uge-apply": { subtitle: currentLang === "es" ? "Sede electrónica UGE-CE" : "UGE-CE electronic office", variant: "general", system: "spain" },
consulates: { subtitle: currentLang === "es" ? "Directorio oficial de servicios consulares" : "Official consular-services directory", variant: "general", system: "spain" },
"spanish-family-official": { subtitle: currentLang === "es" ? "Ministerio de Inclusión" : "Ministry of Inclusion", variant: "general", system: "spain" },
ex24: { subtitle: currentLang === "es" ? "Modelos oficiales de Extranjería" : "Official Extranjería forms", variant: "general", system: "spain" },
"etias-status": { subtitle: currentLang === "es" ? "Portal oficial de la UE" : "Official EU travel portal", variant: "eu", system: "eu" },
ees: { subtitle: currentLang === "es" ? "Comisión Europea" : "European Commission", variant: "eu", system: "eu" }
});
pickRoute = function () {
const personType = getValue("personType");
const goal = getValue("goal");
const duration = getValue("duration");
const familySponsor = getValue("familySponsor");
if (goal === "vacation" && personType === "eu") return routes.find((route) => route.id === "eu-vacation");
if (goal === "vacation") return routes.find((route) => route.id === "non-eu-vacation");
if (personType === "eu") {
if (duration === "short") return routes.find((route) => route.id === "eu-vacation");
if (goal === "workEmployee" || goal === "workSelf") return routes.find((route) => route.id === "eu-working");
return routes.find((route) => route.id === "eu-registration");
}
if (goal === "workEmployee") return routes.find((route) => route.id === "work-employed");
if (goal === "workSelf") return routes.find((route) => route.id === "work-self-employed");
if (goal === "remote") return routes.find((route) => route.id === "digital-nomad");
if (goal === "family" && familySponsor === "euCitizen") return routes.find((route) => route.id === "eu-family");
if (goal === "family" && familySponsor === "spanishCitizen") return routes.find((route) => route.id === "spanish-family");
if (goal === "family") return routes.find((route) => route.id === "family");
if ((goal === "studyAbroad" || goal === "studySpain") && duration === "short") return routes.find((route) => route.id === "study-short");
if (goal === "studyAbroad") return routes.find((route) => route.id === "study-abroad");
if (goal === "studySpain") return routes.find((route) => route.id === "study-in-spain");
if (goal === "work") return routes.find((route) => route.id === "work-authorization");
if (goal === "study") return routes.find((route) => route.id === "study");
if (goal === "family" && familySponsor === "euSpanish") return routes.find((route) => route.id === "eu-family");
if (duration === "short") return routes.find((route) => route.id === "non-eu-vacation");
if (goal === "noWork") return routes.find((route) => route.id === "non-lucrative");
return null;
};
const syncChoiceVisibility = () => {
const isEu = getValue("personType") === "eu";
const studyAbroad = wizard.querySelector('input[name="goal"][value="studyAbroad"]')?.closest("label");
const studySpain = wizard.querySelector('input[name="goal"][value="studySpain"]')?.closest("label");
if (studyAbroad) {
const span = studyAbroad.querySelector("span");
const small = studyAbroad.querySelector("small");
if (isEu) {
if (span) span.dataset.i18n = "goalStudy";
if (small) small.dataset.i18n = "goalStudyDesc";
} else {
if (span) span.dataset.i18n = "goalStudyAbroad";
if (small) small.dataset.i18n = "goalStudyAbroadDesc";
}
}
if (studySpain) {
studySpain.hidden = isEu;
const input = studySpain.querySelector("input");
if (isEu && input?.checked) {
input.checked = false;
const first = studyAbroad?.querySelector("input");
if (first) first.checked = true;
}
}
};
extendTranslations();
splitWizardChoices();
syncChoiceVisibility();
wizard.addEventListener("change", (event) => {
if (event.target?.name === "personType") {
syncChoiceVisibility();
applyTranslations();
}
});
setLanguage(currentLang);
const staticGuideId = document.documentElement.dataset.guideId;
if (staticGuideId) {
const staticRoute = routes.find((route) => route.id === staticGuideId);
if (staticRoute) {
showDirectGuide();
renderRoadmapCard(roadmapFor(staticRoute), staticGuideId);
}
}
})();
