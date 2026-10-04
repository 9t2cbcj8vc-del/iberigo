/* IberiGo roadmap bundle globals */
var linkLabels = window.linkLabels || (window.linkLabels = { en: {}, es: {} });
var urls = window.urls || (window.urls = {});
var govMeta = window.govMeta || (window.govMeta = {});

const routes = [
  {
    id: "eu-vacation",
    title: "EU/EEA/Swiss short visit",
    badge: "Visit",
    summary:
      "EU, EEA, and Swiss citizens can usually visit Spain for up to 3 months with a valid passport or national identity card.",
    appointment: "No immigration appointment for an ordinary short visit",
    documents: [
      "Valid passport or national identity card",
      "Travel health insurance or European Health Insurance Card if applicable",
      "Travel bookings and accommodation details for your own planning"
    ]
  },
  {
    id: "non-eu-vacation",
    title: "Schengen short stay",
    badge: "Visit",
    summary:
      "For a vacation or short visit, check whether your passport needs a Schengen short-stay visa or can enter visa-free. The 90 days are normally counted across the Schengen area in any 180-day period, not just Spain.",
    appointment: "No Spanish residence appointment for an ordinary short visit",
    documents: [
      "Valid passport",
      "Schengen visa if your nationality requires one",
      "Travel insurance if required for your entry route",
      "Accommodation, return/onward travel, and sufficient means if asked at the border"
    ]
  },
  {
    id: "eu-registration",
    title: "EU/EEA/Swiss registration",
    badge: "EU stay over 3 months",
    summary:
      "EU, EEA, and Swiss citizens who plan to live in Spain for more than three months must register and obtain the Certificado de Registro de Ciudadano de la Unión — commonly called the 'green NIE' because it shows your NIE number on a small green document. It is not a TIE card. You need to show you can support yourself: through work, sufficient funds, or study with health cover. Have your EX-18 form, NIE, padrón certificate, and proof of means ready before the appointment. The fee is 12.00 EUR via Modelo 790-012. If you do not yet have a NIE, confirm with your local office whether they assign it during this registration or require a separate step first — practice varies by province. If you are working, your contract, Social Security alta or autónomo registration is normally the proof of means, and you usually do not need separate funds or private health cover.",
    appointment: "Certificado de Registro de Ciudadano de la Union Europea",
    documents: [
      "EX-18 form",
      "Passport or national ID",
      "NIE details",
      "Padrón certificate or volante",
      "Proof of employment, self-employment, study, or sufficient resources",
      "Health coverage where required",
      "Paid tasa receipt"
    ]
  },
  {
    id: "eu-working",
    title: "EU/EEA/Swiss worker registration",
    badge: "EU worker in Spain",
    summary:
      "EU, EEA, and Swiss citizens living in Spain for more than three months and working there follow the same Certificado de Registro de Ciudadano de la Unión route — but working status is the simplest basis to register on. Your employment contract or Social Security alta (or autónomo registration if self-employed) is your proof of means, so you normally do not need to show separate funds or private health cover — working gives you access to the public health system. Bring your EX-18 form, NIE, padrón certificate, and work evidence to the appointment. The fee is 12.00 EUR via Modelo 790-012. Keep the certificate and your NIE: you will need both for employment, tax, healthcare, and digital ID steps.",
    appointment: "Certificado de Registro de Ciudadano de la Union Europea",
    documents: [
      "EX-18 form",
      "Passport or national ID",
      "NIE details",
      "Employment contract, alta in Social Security, or self-employment registration evidence",
      "Padrón certificate or volante",
      "Paid 790-012 tasa receipt"
    ]
  },
  {
    id: "nie-only",
    title: "NIE only",
    badge: "Number, not residence",
    summary:
      "The NIE (Número de Identificación de Extranjero) is a lifetime tax ID number Spain assigns to foreigners for any official or financial transaction — buying property, signing a notarial deed, opening some bank accounts. It is just a number, not a card and not a residence permit; having a NIE does not give you the right to live or work in Spain. You need a cita previa at a Policía Nacional foreigners office, or a Spanish consulate if outside Spain, and you must document a concrete reason for needing it such as a property purchase, contract, or specific administrative act. Appointment availability varies sharply by province — Madrid and Barcelona are often severely backlogged, smaller cities much easier. If you attend in person with everything in order, the number is typically assigned the same day.",
    appointment: "Asignacion de NIE",
    documents: [
      "EX-15 form",
      "Passport or identity document",
      "Written reason for the NIE request",
      "Representative authorization if someone files for you",
      "Paid tasa receipt"
    ]
  },
  {
    id: "tie-after-approval",
    title: "TIE after approval",
    badge: "Non-EU card step",
    summary:
      "The TIE is the physical identity card you receive after your Spanish residence or stay authorization has been approved — it proves who you are in Spain, but your legal right to be here comes from the approval resolution or entry visa, not the card itself. You book a fingerprint appointment (toma de huella) with Policía Nacional, bringing your EX-17 form, passport, approval resolution or entry visa, a recent passport-style photo, and a paid 790-012 receipt (first card is 16.08 EUR). The card takes a few weeks to be ready after the fingerprint appointment; in Madrid, Barcelona, and Valencia appointment slots can stretch weeks out. Apply as soon as your approval resolution arrives — missing the filing window is a real risk, and the exact deadline varies by authorization type.",
    appointment: "POLICIA - Toma de huella / expedicion de tarjeta",
    documents: [
      "EX-17 form",
      "Passport",
      "Favorable resolution or visa",
      "Recent Spanish-format photo",
      "Paid Modelo 790 Codigo 012 receipt"
    ]
  },
  {
    id: "work-authorization",
    title: "Work residence authorization",
    badge: "Spanish work",
    summary:
      "Non-EU citizens who want to live in Spain and work for a Spanish employer or run their own business typically need a residence and work authorization before starting work. Employed workers usually apply via the EX-03 form (initial authorization for employed work); the self-employed route uses EX-07. The authorization is employer-led in most cases — your Spanish employer initiates the application on your behalf. Processing can take several months, and approval is not guaranteed. Once approved, you apply for your entry visa at a Spanish consulate, enter Spain, and then do the TIE fingerprint appointment within the deadline on your resolution. The whole process from application to card in hand typically takes six months to over a year.",
    appointment: "Residence and work authorization, then visa/TIE steps if approved",
    documents: [
      "Employer contract or self-employment business plan",
      "Passport",
      "Qualifications or professional evidence where required",
      "Work authorization approval before visa/TIE steps",
      "Paid fee receipts requested by the official route"
    ]
  },
  {
    id: "digital-nomad",
    title: "Digital nomad residence",
    badge: "Remote work",
    summary:
      "Spain's digital nomad visa (officially the international telework authorization, introduced under the Ley de Startups) lets non-EU remote workers live legally in Spain while working mainly for employers or clients based outside the country — your Spanish-client work cannot exceed 20% of total professional activity. You will need a work contract or client evidence, private health insurance covering Spain, a criminal record certificate, and proof of your professional background. A minimum monthly income threshold applies (linked to the Spanish minimum wage — check the official page for the current figure as it can update). Two paths exist: apply from abroad at a Spanish consulate, or — if already legally in Spain — apply in-country through the UGE-CE online portal. Processing after a complete filing typically takes one to three months, though incomplete documents are a common reason for delays. If approved, you still need a separate TIE fingerprint appointment to get the physical card.",
    appointment: "UGE-CE online submission, then TIE if approved",
    documents: [
      "Remote work or professional activity evidence",
      "Company/client documents",
      "Qualifications or professional experience",
      "Health coverage and clean record documents where required",
      "Digital certificate or Clave for online filing when applying in Spain"
    ]
  },
  {
    id: "non-lucrative",
    title: "Non-lucrative residence",
    badge: "Live, do not work",
    summary:
      "The non-lucrative residence visa lets non-EU citizens live in Spain without working — it is popular with retirees, people with passive income, rental income, savings, or investments. You must prove you have sufficient funds to support yourself and any dependants without working in Spain (the threshold is linked to the IPREM indicator and updates annually — check the current figure at your consulate). You also need private health insurance covering Spain, a clean criminal record, and a medical certificate. The application is made at a Spanish consulate in your country of residence, not in Spain. Once approved, you enter on a visa, register on the padrón, and collect your TIE. The visa is initially for one year and can be renewed; after five years you can apply for long-term residence.",
    appointment: "Spanish consulate or foreigners office path shown by the official sheet",
    documents: [
      "EX-01 form",
      "Proof of sufficient financial means",
      "Private or public health insurance",
      "Criminal record certificate where required",
      "Medical certificate where required"
    ]
  },
  {
    id: "study",
    title: "Study stay",
    badge: "Studies over 90 days",
    summary:
      "Non-EU students planning to study, train, do an internship, or participate in a student mobility programme in Spain for more than 90 days need a study stay authorization. You apply through a Spanish consulate before arriving, with an acceptance letter from your institution, proof of funds, private health insurance, a clean criminal record, and a medical certificate. Once in Spain you collect a student TIE. Work rights are limited but some study authorizations allow part-time work — check the specific terms of your authorization. Family members may be able to join under linked authorization in some cases. Student status gives access to public healthcare in some regions through the health card, but check your autonomous community's rules.",
    appointment: "Study stay authorization route, then TIE if applicable",
    documents: [
      "Admission or enrollment proof",
      "Proof of funds",
      "Health insurance",
      "Passport",
      "Apostilled and translated public documents where required"
    ]
  },
  {
    id: "family",
    title: "Family reunification",
    badge: "Join family",
    summary:
      "Non-EU relatives of a legal resident in Spain may be able to join them through family reunification (reagrupación familiar). The Spanish resident must have held legal residence for at least one year and have at least one more year's validity remaining, and must show housing and income that meets the threshold for the family size. Eligible relatives typically include spouses or partners, minor children, and dependent parents in some cases. The application is made in Spain by the resident sponsor; once approved, the family member applies for their entry visa at a Spanish consulate. After arrival, they obtain a residence card. Processing typically takes several months and documents often need apostille and sworn Spanish translation.",
    appointment: "Autorizacion de residencia temporal por reagrupacion familiar",
    documents: [
      "Family relationship evidence",
      "Sponsor residence documents",
      "Housing and economic means evidence",
      "Passports",
      "Legalized/apostilled and translated civil records"
    ]
  },
  {
    id: "eu-family",
    title: "Family member of an EU citizen",
    badge: "EU family card",
    summary:
      "Non-EU family members joining or accompanying an EU, EEA, or Swiss citizen who is registered as a resident in Spain follow a separate and generally more favourable route than standard family reunification — the Tarjeta de Residencia de Familiar de Ciudadano de la Unión. Eligible relatives include spouses, registered partners, dependent children under 21, and dependent direct relatives in the ascending line. The EU citizen must already hold their EU registration certificate (the green NIE). The non-EU family member applies using the EX-19 form, and the fee is 12.00 EUR via Modelo 790-012 — lower than the standard TIE fee. The card is initially valid for five years. Getting a fingerprint appointment (toma de huellas) in high-demand provinces like Madrid, Barcelona, and Alicante can take time — book as soon as your authorization arrives and document any failed attempts if the 30-day window is at risk.",
    appointment: "Tarjeta de residencia de familiar de ciudadano de la Union",
    documents: [
      "EX-19 form",
      "Passport of the non-EU family member",
      "DNI or EU registration certificate of the EU/Spanish family member",
      "Marriage, partnership, birth, or dependency evidence as applicable",
      "Evidence that the EU/Spanish citizen meets the residence basis requested"
    ]
  }
];

const provinces = [
  ["15", "A Coruna"], ["02", "Albacete"], ["03", "Alicante"], ["04", "Almeria"],
  ["01", "Araba/Alava"], ["33", "Asturias"], ["05", "Avila"], ["06", "Badajoz"],
  ["08", "Barcelona"], ["09", "Burgos"], ["10", "Caceres"], ["11", "Cadiz"],
  ["39", "Cantabria"], ["12", "Castellon"], ["51", "Ceuta"], ["13", "Ciudad Real"],
  ["14", "Cordoba"], ["16", "Cuenca"], ["17", "Girona"], ["18", "Granada"],
  ["19", "Guadalajara"], ["20", "Gipuzkoa"], ["21", "Huelva"], ["22", "Huesca"],
  ["07", "Illes Balears"], ["23", "Jaen"], ["26", "La Rioja"], ["35", "Las Palmas"],
  ["24", "Leon"], ["25", "Lleida"], ["27", "Lugo"], ["28", "Madrid"],
  ["29", "Malaga"], ["52", "Melilla"], ["30", "Murcia"], ["31", "Navarra"],
  ["32", "Ourense"], ["34", "Palencia"], ["36", "Pontevedra"], ["37", "Salamanca"],
  ["38", "Santa Cruz de Tenerife"], ["40", "Segovia"], ["41", "Sevilla"],
  ["42", "Soria"], ["43", "Tarragona"], ["44", "Teruel"], ["45", "Toledo"],
  ["46", "Valencia"], ["47", "Valladolid"], ["48", "Bizkaia"], ["49", "Zamora"],
  ["50", "Zaragoza"]
];

const provinceNotes = {
  "08": {
    title: "Barcelona",
    note:
      "Expect appointment scarcity for police card and EU certificate procedures. Check whether the appointment is with Policia Nacional or the Oficina de Extranjeria before preparing copies."
  },
  "28": {
    title: "Madrid",
    note:
      "Large-volume province. For TIE appointments, bring printed approval, EX-17, paid 790-012, passport, photo, and recent padron if your address changed."
  },
  "46": {
    title: "Valencia",
    note:
      "Local offices can be strict about recent padron evidence for TIE if your address changed. Re-check the appointment label and office address the week of the cita."
  },
  "03": {
    title: "Alicante",
    note:
      "High expat demand means appointment type matters. Do not book an NIE-only cita when you need EU registration or fingerprints for a TIE."
  },
  "29": {
    title: "Malaga",
    note:
      "Tourist and residence demand can make citas uneven. Generate the tasa after choosing the exact procedure, then bring the bank-stamped or official payment proof."
  },
  "07": {
    title: "Illes Balears",
    note:
      "Island offices may differ by location. Confirm the exact island office, appointment label, and whether local instructions ask for extra copies."
  }
};

const feeRows = [
  ["Certificate of EU resident registration or EU-family card", "790-012", "12.00 EUR"],
  ["NIE assignment at the request of the applicant", "790-012", "See official generator"],
  ["TIE first temporary residence, stay, or cross-border worker card", "790-012", "16.08 EUR"],
  ["TIE renewal or stay extension card", "790-012", "19.30 EUR"],
  ["TIE long-term or long-term EU residence card", "790-012", "21.87 EUR"]
];

const routeFormsAndTaxes = {
  "eu-registration": {
    forms: [
      ["EX-18", "EU/EEA/Swiss citizen registration certificate", "Form", "EX-18"],
      ["NIE", "Foreigner identity number used for Spanish administration", "Required detail", ""],
      ["Padrón", "Town hall registration certificate or volante", "Address evidence", ""],
      ["Passport or EU national ID", "Identity document used at the appointment", "Document", ""]
    ],
    taxes: [["790-012", "Certificate of EU resident registration", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "eu-vacation": {
    forms: [],
    taxes: [],
    links: ["eu-short-stay"]
  },
  "non-eu-vacation": {
    forms: [],
    taxes: [],
    links: ["schengen", "calculator"]
  },
  "eu-working": {
    forms: [
      ["EX-18", "EU/EEA/Swiss citizen registration certificate", "Form", "EX-18"],
      ["NIE", "Foreigner identity number used for Spanish administration", "Required detail", ""],
      ["Padrón", "Town hall registration certificate or volante", "Address evidence", ""]
    ],
    taxes: [["790-012", "Certificate of EU resident registration", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "nie-only": {
    forms: [
      ["EX-15", "NIE assignment request", "Form", "EX-15"]
    ],
    taxes: [["790-012", "NIE assignment line in the Police fee form", "See official generator", "790-012"]],
    links: ["cita", "790-012"]
  },
  nie: {
    forms: [
      ["EX-15", "NIE assignment request", "Form", "EX-15"]
    ],
    taxes: [["790-012", "NIE assignment line in the Police fee form", "See official generator", "790-012"]],
    links: ["cita", "790-012"]
  },
  "tie-after-approval": {
    forms: [
      ["EX-17", "TIE card application", "Form", "EX-17"],
      ["Favorable resolution or visa", "Proof that the residence or stay authorization was granted", "Evidence", ""]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "work-authorization": {
    forms: [
      ["EX-03", "Authorization application if you will work for a Spanish employer", "Authorization form", "EX-03"],
      ["EX-07", "Authorization application if you will be self-employed in Spain", "Authorization form", "EX-07"],
      ["EX-17", "TIE card application after approval", "Form", "EX-17"]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    forms: [
      ["UGE online application", "Authorization application for international telework / digital nomad residence", "Official application portal", "digital-nomad-official"],
      ["EX-17", "TIE card application after approval", "Form", "EX-17"]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    forms: [
      ["EX-01", "Authorization application for initial temporary non-lucrative residence", "Authorization form", "EX-01"],
      ["EX-17", "TIE card application after visa/approval", "Form", "EX-17"]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    forms: [
      ["EX-00", "Authorization application for study stay", "Authorization form", "EX-00"],
      ["EX-17", "TIE card application if a card is required after approval", "Form", "EX-17"]
    ],
    taxes: [["790-012", "TIE card if applicable", "16.08 EUR", "790-012"]],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    forms: [
      ["EX-02", "Authorization application for temporary residence by family reunification", "Authorization form", "EX-02"],
      ["EX-17", "TIE card application after approval", "Form", "EX-17"]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    forms: [
      ["EX-19", "Residence card application for a non-EU family member of an EU citizen", "Authorization form", "EX-19"],
      ["EX-17", "TIE card after your application has been approved", "Form", "EX-17"]
    ],
    taxes: [["790-012", "EU-family residence card fee", "12.00 EUR", "790-012"]],
    links: ["eu-family-official", "eu-family-spain", "eu-family-entry", "cita", "790-012"]
  },
  "driving-licence-exchange": {
    forms: [
      ["Valid passport", "Plus NIE/TIE or EU Registration Certificate", "Document", ""],
      ["Original driving licence", "Will be retained by the DGT", "Document", ""],
      ["<a href=\"/the-spain-files/padron-torrevieja/\">Padrón certificate</a>", "Certificado de empadronamiento", "Document", ""],
      ["Medical aptitude report", "From authorised CRC, valid 90 days, approx. €30-€50", "Document", ""],
      ["Passport photo", "32x26mm, plain background, face uncovered", "Document", ""],
      ["Sworn translation", "Required for non-Latin script licences or if DGT requests", "Document", ""]
    ],
    taxes: [["Fee 2.3 payment", "Card or miDGT app only, no cash", "28.87 EUR", ""]],
    links: ["dgt-licence-exchange", "dgt-bilateral-agreements"]
  }
};

const routeFormsAndTaxesEs = {
  "eu-registration": {
    forms: [
      ["EX-18", "Certificado de registro de ciudadano UE/EEE/Suiza", "Formulario", "EX-18"],
      ["NIE", "Número de identidad de extranjero usado por la administración española", "Dato requerido", ""],
      ["Padrón", "Certificado o volante de empadronamiento del ayuntamiento", "Prueba de domicilio", ""],
      ["Pasaporte o documento nacional de identidad UE", "Documento de identidad usado en la cita", "Documento", ""]
    ],
    taxes: [["790-012", "Certificado de registro de ciudadano de la UE", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "eu-vacation": {
    forms: [],
    taxes: [],
    links: ["eu-short-stay"]
  },
  "non-eu-vacation": {
    forms: [],
    taxes: [],
    links: ["schengen", "calculator"]
  },
  "eu-working": {
    forms: [
      ["EX-18", "Certificado de registro de ciudadano UE/EEE/Suiza", "Formulario", "EX-18"],
      ["NIE", "Número de identidad de extranjero usado por la administración española", "Dato requerido", ""],
      ["Padrón", "Certificado o volante de empadronamiento del ayuntamiento", "Prueba de domicilio", ""]
    ],
    taxes: [["790-012", "Certificado de registro de ciudadano de la UE", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "nie-only": {
    forms: [
      ["EX-15", "Solicitud de asignación de NIE", "Formulario", "EX-15"]
    ],
    taxes: [["790-012", "Línea de asignación de NIE en el formulario de tasa de Policía", "Ver generador oficial", "790-012"]],
    links: ["cita", "790-012"]
  },
  nie: {
    forms: [
      ["EX-15", "Solicitud de asignación de NIE", "Formulario", "EX-15"]
    ],
    taxes: [["790-012", "Línea de asignación de NIE en el formulario de tasa de Policía", "Ver generador oficial", "790-012"]],
    links: ["cita", "790-012"]
  },
  "tie-after-approval": {
    forms: [
      ["EX-17", "Solicitud de tarjeta TIE", "Formulario", "EX-17"],
      ["Resolución favorable o visado", "Prueba de que la autorización de residencia o estancia fue concedida", "Prueba", ""]
    ],
    taxes: [["790-012", "Primera tarjeta TIE tras la aprobación", "16.08 EUR", "790-012"]],
    links: ["cita", "790-012"]
  },
  "work-authorization": {
    forms: [
      ["EX-03", "Solicitud de autorización si vas a trabajar por cuenta ajena para una empresa española", "Formulario de autorización", "EX-03"],
      ["EX-07", "Solicitud de autorización si vas a trabajar por cuenta propia en España", "Formulario de autorización", "EX-07"],
      ["EX-17", "Solicitud de tarjeta TIE tras la aprobación", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Primera tarjeta TIE tras la aprobación", "16.08 EUR", "790-012"]],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    forms: [
      ["Solicitud online UGE", "Solicitud de autorización para teletrabajo internacional / nómada digital", "Portal oficial de solicitud", "digital-nomad-official"],
      ["EX-17", "Solicitud de tarjeta TIE tras la aprobación", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Primera tarjeta TIE tras la aprobación", "16.08 EUR", "790-012"]],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    forms: [
      ["EX-01", "Solicitud de autorización inicial de residencia temporal no lucrativa", "Formulario de autorización", "EX-01"],
      ["EX-17", "Solicitud de tarjeta TIE tras visado o aprobación", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Primera tarjeta TIE tras la aprobación", "16.08 EUR", "790-012"]],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    forms: [
      ["EX-00", "Solicitud de autorización de estancia por estudios", "Formulario de autorización", "EX-00"],
      ["EX-17", "Solicitud de tarjeta TIE si la tarjeta es necesaria tras la aprobación", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Tarjeta TIE si corresponde", "16.08 EUR", "790-012"]],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    forms: [
      ["EX-02", "Solicitud de autorización de residencia temporal por reagrupación familiar", "Formulario de autorización", "EX-02"],
      ["EX-17", "Solicitud de tarjeta TIE tras la aprobación", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Primera tarjeta TIE tras la aprobación", "16.08 EUR", "790-012"]],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    forms: [
      ["EX-19", "Solicitud de tarjeta de residencia para familiar no comunitario de ciudadano de la UE", "Formulario de autorización", "EX-19"],
      ["EX-17", "TIE después de que la solicitud haya sido aprobada", "Formulario", "EX-17"]
    ],
    taxes: [["790-012", "Tasa de tarjeta de residencia de familiar de ciudadano de la UE", "12.00 EUR", "790-012"]],
    links: ["eu-family-official", "eu-family-spain", "eu-family-entry", "cita", "790-012"]
  },
  "driving-licence-exchange": {
    forms: [
      ["Pasaporte válido", "Más NIE/TIE o Certificado de Registro de la UE", "Documento", ""],
      ["Permiso de conducir original", "Lo retendrá la DGT", "Documento", ""],
      ["<a href=\"/the-spain-files/es/padron-torrevieja/\">Certificado de empadronamiento</a>", "Padrón", "Documento", ""],
      ["Informe de aptitud psicofísica", "De un CRC autorizado, válido 90 días, aprox. 30-50 €", "Documento", ""],
      ["Foto de carné", "32x26mm, fondo liso, rostro descubierto", "Documento", ""],
      ["Traducción jurada", "Necesaria para permisos en alfabeto no latino o si la DGT lo solicita", "Documento", ""]
    ],
    taxes: [["Tasa 2.3", "Solo tarjeta o app miDGT, sin efectivo", "28.87 EUR", ""]],
    links: ["dgt-licence-exchange", "dgt-bilateral-agreements"]
  }
};

function routeFormsAndTaxesFor(routeId) {
  if (currentLang === "es" && routeFormsAndTaxesEs[routeId]) return routeFormsAndTaxesEs[routeId];
  return routeFormsAndTaxes[routeId];
}

const visaRecommendations = {
  "work-authorization": {
    title: "Likely visa path: residence and work authorization",
    text:
      "If you will work in Spain for a Spanish employer or as self-employed, a non-EU citizen generally needs a residence and work authorization before starting work. The exact route depends on employee vs self-employed work."
  },
  "digital-nomad": {
    title: "Likely visa path: international telework / digital nomad",
    text:
      "For remote work mainly for companies or clients outside Spain, check the international telework route. If you are legally in Spain, you may be able to apply in Spain; otherwise the visa path is normally through a Spanish consulate."
  },
  "non-lucrative": {
    title: "Likely visa path: non-lucrative residence",
    text:
      "For living in Spain without working, the likely category is non-lucrative residence. It is for people with sufficient resources who will not carry out work or professional activity in Spain."
  },
  study: {
    title: "Likely visa path: study stay authorization",
    text:
      "For studies, training, mobility, internships, or similar activity, check the study stay authorization or student visa route."
  },
  family: {
    title: "Likely visa path: family reunification",
    text:
      "For joining an eligible family member who is legally resident in Spain, check the family reunification route. If the family member is an EU citizen, the EU-family route can be different."
  },
  "eu-family": {
    title: "Likely route: residence card for family member of an EU citizen",
    text:
      "If the person you are joining is an EU, EEA, Swiss, or qualifying Spanish citizen, this is usually not ordinary family reunification. Check the EX-19 EU-family residence card route."
  },
  "non-eu-vacation": {
    title: "Likely visa path: Schengen short stay, if a visa is required",
    text:
      "For a vacation or short visit, check whether your passport needs a Schengen short-stay visa or can enter visa-free. This is not a residence or work route."
  }
};

const lifeAdminGuides = {
  padron: {
    title: "Padrón documents to prepare",
    summary:
      "The padrón is your municipal address registration with the town hall where you live. Requirements vary by municipality, but these are the documents people are commonly asked to prepare.",
    steps: [
      "Passport, EU national ID, NIE/TIE, or another accepted identity document.",
      "Rental contract, property deed, or another document proving you live at the address.",
      "Recent utility bill or proof of occupation if your town hall asks for it.",
      "Written authorization from the tenant/owner plus their ID copy if your name is not on the rental contract or deed.",
      "Family book, birth certificate, or custody/authorization documents when registering children.",
      "If you need proof for another procedure, ask for a certificado or volante de empadronamiento and check how recent it must be."
    ],
    links: []
  },
  digitalId: {
    title: "Digital ID reality check",
    summary:
      "Cl@ve and the FNMT digital certificate are different paths. FNMT's citizen certificate can be requested with a NIE, after online application and identity accreditation. Cl@ve is often harder for newcomers because NIE-based registration asks for the support number shown on an accepted identity document, commonly a TIE/residence card.",
    steps: [
      "If you already have a NIE, the FNMT citizen certificate may be the more realistic digital-signature route before Cl@ve.",
      "For FNMT, request the certificate online, get the request code, then prove your identity at an authorized office. Bring the NIE concession/identity documentation requested by FNMT plus passport or origin-country ID as applicable.",
      "For the FNMT identity-accreditation appointment, Agencia Tributaria and Seguridad Social are two official places that can offer appointments depending on the office and service availability.",
      "For Cl@ve with NIE, expect to need the support number from your physical foreigner identity document, commonly the TIE/residence card.",
      "Invitation-letter registration also depends on the tax address recorded for you, so it may not work for someone newly arrived.",
      "Once you have the right ID/card, Cl@ve can be useful for many public services, but basic registration is not valid for every procedure."
    ],
    links: [
      ["FNMT citizen certificate", "https://www.sede.fnmt.gob.es/certificados/persona-fisica"],
      ["FNMT appointment via Tax Agency", "https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion"],
      ["FNMT appointment via Social Security", "https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=CPMSWACS&ORGANISMO=I"],
      ["Cl@ve registration", "https://clave.gob.es/clave_Home/registro/Como-puedo-registrarme.html"],
      ["Cl@ve office finder", "https://administracion.gob.es/pag_Home/atencionCiudadana/encuentraTuOficina/OficinasRegistro_CLAVE.html"]
    ]
  }
};

const formHelpers = {
  "790-012": {
    title: "Modelo 790 Codigo 012",
    purpose: "Police fee form for many document steps: NIE assignment, EU certificate, TIE card issue, duplicate cards, and similar Police procedures.",
    officialUrl: "https://sede.policia.gob.es/Tasa790_012/",
    fields: [
      ["NIF/NIE", "Your Spanish tax/foreigner number if you already have one. If the form allows passport for your case, use the passport exactly as shown."],
      ["Apellidos y nombre / Razon social", "Surname(s) and given name, or company name. Match your passport or ID."],
      ["Tipo de via", "Street type, such as Calle, Avenida, Plaza, Camino."],
      ["Nombre de la via publica", "Street name only, without the street type if it is already selected separately."],
      ["Numero, escalera, piso, puerta", "Building number, staircase, floor, and door. Leave parts blank if they do not exist."],
      ["Municipio / Provincia / Codigo postal", "Town/city, province, and postcode for your address in Spain."],
      ["Tarifa", "The procedure you are paying for. Choose the line that matches your appointment or card/certificate step."],
      ["Forma de pago", "Choose cash/bank payment or electronic payment if the site offers it and you have the required access."]
    ],
    checks: [
      "For TIE fingerprints, the common appointment wording is toma de huella or expedicion de tarjeta.",
      "For EU registration, pick the EU certificate/registration fee, not a TIE card fee.",
      "Generate a fresh PDF close to the appointment date so the barcode and amount are current.",
      "Bring the Administration copy plus payment proof."
    ]
  },
  "EX-00": {
    title: "EX-00 study stay authorization",
    purpose: "Official application form for study stay authorizations and extensions.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156469/00-Formulario_estancia.pdf",
    fields: [],
    checks: []
  },
  "EX-02": {
    title: "EX-02 family reunification residence authorization",
    purpose: "Official application form for temporary residence authorization by family reunification.",
    officialUrl: "https://www.inclusion.gob.es/documents/d/migraciones/ex02-formulario-autorizacion-de-residencia-temporal-por-reagrupacion-familiar.pdf",
    fields: [],
    checks: []
  },
  "EX-03": {
    title: "EX-03 employee residence and work authorization",
    purpose: "Official application form for temporary residence and work authorization as an employee.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156472/03-Formulario_cta_ajena_Imprimible.pdf",
    fields: [],
    checks: []
  },
  "EX-07": {
    title: "EX-07 self-employed residence and work authorization",
    purpose: "Official application form for temporary residence and work authorization as self-employed.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156472/07-Formulario_cta_propia_Imprimible.pdf",
    fields: [],
    checks: []
  },
  "EX-19": {
    title: "EX-19 EU-family residence card",
    purpose: "Official application form for the residence card of a family member of an EU citizen.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156472/19-Tarjeta_familiar_comunitario_Imprimible.pdf",
    fields: [],
    checks: []
  },
  "EX-15": {
    title: "EX-15 NIE assignment",
    purpose: "Application form used when requesting a NIE for an economic, professional, or social reason without registering as resident.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156469/15-Formulario_NIE_y_certificados.pdf",
    fields: [
      ["Datos del extranjero", "Your personal details as shown on passport or identity document."],
      ["Domicilio", "Your address. Use the address accepted for your filing situation."],
      ["Datos del representante", "Only complete this if someone is officially representing you."],
      ["Domicilio a efectos de notificaciones", "Where official notices should be sent."],
      ["Motivos", "Explain the economic, professional, or social reason for requesting a NIE."],
      ["Firma", "Sign and date before filing."]
    ],
    checks: [
      "NIE assignment gives you a number; it does not grant residence.",
      "Bring proof of why you need the NIE, such as property, tax, notary, business, or administrative documents.",
      "Pay the matching 790-012 fee line from the official Police fee form."
    ]
  },
  "EX-01": {
    title: "EX-01 temporary residence",
    purpose: "Application form used for several initial temporary residence routes, including non-lucrative residence.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156472/01-Formulario_residencia_no_lucrativa_Imprimible.pdf",
    fields: [
      ["Datos del extranjero", "Your personal details exactly as shown on passport."],
      ["Datos del representante", "Only if a representative is filing for you."],
      ["Domicilio a efectos de notificaciones", "Address or electronic notification details for official communications."],
      ["Tipo de autorizacion solicitada", "Select the exact residence authorization route."],
      ["Firma", "Sign and date before filing."]
    ],
    checks: [
      "For non-lucrative residence, confirm whether your consulate or office uses a specific consular form path.",
      "Check financial means, health insurance, criminal record, and medical certificate requirements."
    ]
  },
  "digital-nomad-official": {
    title: "International telework / digital nomad route",
    purpose: "Official route information for international telework residence applications.",
    officialUrl: "https://prie.comercio.gob.es/es-es/Paginas/Teletrabajadores-caracter-internacional.aspx",
    fields: [],
    checks: []
  },
  "EX-18": {
    title: "EX-18 EU citizen registration",
    purpose: "Application form for EU/EEA/Swiss citizens registering residence in Spain for stays over 3 months.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156469/18-Certificado_residencia_comunitaria.pdf",
    fields: [
      ["Datos del solicitante", "Your personal details exactly as shown on passport or national ID."],
      ["Domicilio en Espana", "Your address in Spain. Prepare your padrón certificate or volante as address evidence."],
      ["Situacion en Espana", "Select the basis: employed, self-employed, student, sufficient resources, or family member."],
      ["Representante", "Only complete this if someone is officially representing you."],
      ["Domicilio a efectos de notificaciones", "Notification address. Often your Spanish address unless using a representative."],
      ["Firma", "Sign and date the form before the appointment."]
    ],
    checks: [
      "Workers should bring employment contract, Social Security registration, or equivalent work evidence.",
      "Self-employed applicants should bring autonomo/business registration evidence.",
      "Bring your NIE if already assigned; if not, confirm whether the office assigns it through EX-18 or asks for a separate NIE step first."
    ]
  },
  "EX-17": {
    title: "EX-17 TIE card application",
    purpose: "Application form for issuing the physical foreigner identity card after a non-EU residence/stay authorization or visa.",
    officialUrl: "https://www.inclusion.gob.es/documents/410169/2156469/17-Formulario_TIE.pdf",
    fields: [
      ["Datos del extranjero", "Your personal details as shown in passport and approval/visa documents."],
      ["Domicilio en Espana", "Your Spanish address. Update this if your card should show a new address."],
      ["Datos del representante", "Only if a representative is allowed and used."],
      ["Tipo de tarjeta", "Initial card, renewal, duplicate, or other card reason depending on your approval."],
      ["Situacion en Espana", "Your authorized stay/residence type."],
      ["Firma", "Sign before the fingerprint appointment."]
    ],
    checks: [
      "Bring passport, approval or visa, EX-17, photo, and paid 790-012.",
      "For fingerprints, the appointment is usually with Policia Nacional.",
      "If your address changed, bring recent padron if your province asks for it."
    ]
  }
};

const tarifaAdvice = {
  "790-012": {
    "eu-registration": {
      label: "Certificate of EU resident registration",
      mirrorProcedure: "eu-certificate",
      note: "For EU/EEA/Swiss registration, choose the tarifa for certificado de registro de residente comunitario."
    },
    "eu-working": {
      label: "Certificate of EU resident registration",
      mirrorProcedure: "eu-certificate",
      note: "For EU/EEA/Swiss worker registration, choose the tarifa for certificado de registro de residente comunitario."
    },
    "nie-only": {
      label: "NIE assignment",
      mirrorProcedure: "nie",
      note: "For a standalone NIE request, choose the tarifa for asignacion de Numero de Identidad de Extranjero a instancia del interesado."
    },
    "tie-after-approval": {
      label: "First TIE card after approval",
      mirrorProcedure: "tie-initial",
      note: "For first fingerprints/card issue after approval, choose the first TIE card tarifa."
    },
    "digital-nomad": {
      label: "First TIE card after approval",
      mirrorProcedure: "tie-initial",
      note: "After digital nomad approval, the Police card step normally uses the first TIE card tarifa."
    },
    "non-lucrative": {
      label: "First TIE card after visa/approval",
      mirrorProcedure: "tie-initial",
      note: "For the TIE after a non-lucrative visa or approval, choose the first TIE card tarifa."
    },
    study: {
      label: "TIE card if your study stay requires a card",
      mirrorProcedure: "tie-initial",
      note: "If you need a TIE for the study stay, choose the TIE card tarifa that matches first card or renewal."
    },
    family: {
      label: "First TIE card after family residence approval",
      mirrorProcedure: "tie-initial",
      note: "After family reunification approval, the Police card step normally uses the first TIE card tarifa."
    }
  }
};

const mirrorFields = {
  "790-012": [
    { name: "identifier", label: "NIE, NIF, or passport number", spanish: "NIF/NIE/Pasaporte", type: "text" },
    { name: "fullName", label: "Full legal name", spanish: "Apellidos y nombre / Razon social", type: "text" },
    {
      name: "procedure",
      label: "What are you paying for?",
      spanish: "Tarifa",
      type: "select",
      options: [
        ["tie-initial", "TIE first card after approval", "TIE que documenta la primera concesion de la autorizacion de residencia temporal, de estancia o para trabajadores transfronterizos"],
        ["tie-renewal", "TIE renewal or stay extension card", "TIE que documenta la renovacion de la autorizacion de residencia temporal o la prorroga de la estancia"],
        ["eu-certificate", "EU citizen registration certificate", "Certificado de registro de residente comunitario"],
        ["nie", "NIE assignment", "Asignacion de Numero de Identidad de Extranjero a instancia del interesado"]
      ]
    },
    { name: "streetType", label: "Street type", spanish: "Tipo de via", type: "text", placeholder: "Calle, Avenida, Plaza..." },
    { name: "streetName", label: "Street name", spanish: "Nombre de la via publica", type: "text" },
    { name: "streetNumber", label: "Building number", spanish: "Numero", type: "text" },
    { name: "floorDoor", label: "Floor and door", spanish: "Piso / Puerta", type: "text" },
    { name: "city", label: "Town or city", spanish: "Municipio", type: "text" },
    { name: "province", label: "Province", spanish: "Provincia", type: "province" },
    { name: "postcode", label: "Postcode", spanish: "Codigo postal", type: "text" },
    {
      name: "payment",
      label: "Payment method",
      spanish: "Forma de pago",
      type: "select",
      options: [
        ["cash-bank", "Pay at bank or ATM with printed PDF", "En efectivo / adeudo en cuenta a traves de entidad colaboradora"],
        ["online", "Online payment if available", "Pago telematico, si esta disponible"]
      ]
    }
  ],
  "EX-18": [
    { name: "fullName", label: "Full legal name", spanish: "Apellidos y nombre", type: "text" },
    { name: "nationality", label: "Nationality", spanish: "Nacionalidad", type: "text" },
    { name: "passport", label: "Passport or national ID number", spanish: "Pasaporte / Documento de identidad", type: "text" },
    { name: "birthDate", label: "Date of birth", spanish: "Fecha de nacimiento", type: "date" },
    { name: "spanishAddress", label: "Address in Spain", spanish: "Domicilio en Espana", type: "text" },
    {
      name: "basis",
      label: "Basis for registering",
      spanish: "Situacion en Espana",
      type: "select",
      options: [
        ["employed", "Working for an employer in Spain", "Trabajador por cuenta ajena"],
        ["self-employed", "Self-employed in Spain", "Trabajador por cuenta propia"],
        ["student", "Student", "Estudiante"],
        ["resources", "Sufficient resources", "Dispone de recursos suficientes"],
        ["family", "Family member", "Familiar de ciudadano de la Union"]
      ]
    }
  ],
  "EX-17": [
    { name: "fullName", label: "Full legal name", spanish: "Apellidos y nombre", type: "text" },
    { name: "nie", label: "NIE", spanish: "NIE", type: "text" },
    { name: "passport", label: "Passport number", spanish: "Pasaporte", type: "text" },
    { name: "birthDate", label: "Date of birth", spanish: "Fecha de nacimiento", type: "date" },
    { name: "spanishAddress", label: "Address in Spain", spanish: "Domicilio en Espana", type: "text" },
    {
      name: "cardReason",
      label: "Card reason",
      spanish: "Tipo de tarjeta",
      type: "select",
      options: [
        ["initial", "First TIE card", "Tarjeta inicial"],
        ["renewal", "Renewal card", "Renovacion de tarjeta"],
        ["duplicate", "Duplicate for loss, theft, or damage", "Duplicado por robo, extravio, destruccion o inutilizacion"],
        ["change", "Card update because details changed", "Modificacion de datos de la tarjeta"]
      ]
    }
  ]
};

const wizard = document.querySelector("#routeWizard");
const result = document.querySelector("#wizardResult");
// Statically generated guide pages ship a crawler-first intro (the page's only
// visible H1 + description + "Updated" date) and optional extra blocks such as
// a short FAQ inside #wizardResult. Capture them before the runtime re-renders
// the result panel so the rendered guide keeps them.
const bakedGuideBlocks = (() => {
  const intro = result?.querySelector("[data-crawler-guide-intro]");
  const extras = result ? [...result.querySelectorAll("[data-guide-extra]")] : [];
  return {
    guideId: document.documentElement.dataset.guideId || "",
    lang: document.documentElement.dataset.guideLang || document.documentElement.lang || "",
    intro: intro ? intro.outerHTML : "",
    extra: extras.map((node) => node.outerHTML).join("\n")
  };
})();
const wizardSubmit = document.querySelector("#wizardSubmit");
const guideCardsPanel = document.querySelector("#guide-cards");
const wizardPanel = document.querySelector("#wizard");
const documentsPanel = document.querySelector("#documents");
const sourcesPanel = document.querySelector("#sources");
const startLink = document.querySelector('header nav a[href*="#guide-cards"]');
const topbar = document.querySelector(".topbar");
// Cookieless GoatCounter endpoint (site code "iberigo"). Counting only runs on
// the production hostname so deploy previews and local builds are not counted.
// Keep in sync with the loader at the top of scripts/site-search.js.
const VISITOR_COUNTER_URL = "https://iberigo.goatcounter.com/count";
const VISITOR_COUNTER_HOSTS = new Set(["iberigo.eu", "www.iberigo.eu"]);
const languageButtons = document.querySelectorAll("[data-lang]");
const supportedLanguages = new Set(["en", "es"]);
let currentLang = supportedLanguages.has(localStorage.getItem("holaPapersLang")) ? localStorage.getItem("holaPapersLang") : "en";
let currentDirectRoute = null;
let currentEntryPreset = null;
let currentScreenState = { type: "start" };
const navigationStack = [];

const translations = {
  en: {
    headerTitle: "Move, travel and settle in Spain.",
    startNav: "Home",
    spainFilesNav: "The Spain Files",
    supportNav: "Donate",
    startHeading: "Spanish bureaucracy, explained by people who've actually done it.",
    heroSubheading: "Real timelines, real documents, no legal jargon — start with what's actually next for you.",
    heroStats: "70+ guides · Updated October 2026 · Written from Alicante",
    mostReadEyebrow: "Most read",
    featuredNieTitle: "How to get a NIE in Spain",
    featuredNieNote: "Based on real experience in Alicante province.",
    readGuideButton: "Read guide",
    calloutEyebrow: "📍 Torrevieja firsthand experience",
    calloutQuote: "Most guides say padrón takes a few days. In Torrevieja the certificate itself took about 2–3 months after we submitted papers; the whole path to residency took about 3.5 months.",
    browseBySituation: "Or browse by situation",
    startDisclaimer: "Not legal advice. Always verify with official sources before filing.",
    movingTitle: "Move to Spain",
    movingDesc: "NIE, TIE, padrón, EU registration, visas, and residency.",
    movingChipVisa: "Visas",
    movingChipEu: "EU register",
    movingChipStudy: "Study",
    movingChipFamily: "Family",
    movingButton: "Plan your move",
    vacationTitle: "Visit Spain",
    vacationDesc: "Short visits, entry rules, transport, places to stay, and practical trip planning in Spain.",
    vacationChipEntry: "Entry rules",
    vacationChipTransport: "Transport",
    vacationChipStays: "Places to stay",
    vacationChipTrips: "Trip ideas",
    vacationButton: "Plan your visit",
    livingTitle: "Living in Spain",
    livingDesc: "Healthcare, banking, taxes, digital access, and the key admin steps for everyday life in Spain.",
    livingChipHealth: "Healthcare",
    livingChipBanking: "Banking",
    livingChipJobs: "Job search",
    livingChipTaxes: "Taxes",
    livingChipSocial: "Social Security",
    livingChipDigital: "Digital access",
    livingButton: "Browse living guides",
    hintPlain: "Plain-language next steps",
    hintSources: "Spanish government links",
    hintScope: "Spain-wide guidance",
    progressPerson: "1. Status",
    progressGoal: "2. Goal",
    progressResult: "3. Result",
    personLegend: "Are you?",
    personEu: "EU, EEA, or Swiss citizen",
    personEuDesc: "You may need EU registration if you live in Spain longer term.",
    personNonEu: "Non-EU citizen",
    personNonEuDesc: "You may need a visa, authorization, TIE, or short-stay entry route.",
    goalLegend: "What are you trying to do?",
    goalWork: "Live and work in Spain",
    goalWorkDesc: "Employment, self-employment, or work authorization paths.",
    goalNoWork: "Live in Spain without working",
    goalNoWorkDesc: "For funds, retirement income, or no Spanish work activity.",
    goalStudy: "Study in Spain",
    goalStudyDesc: "Courses, university, training, internships, or student stay paperwork.",
    goalRemote: "Work remotely from Spain",
    goalRemoteDesc: "Remote work mainly for clients or companies outside Spain.",
    goalFamily: "Join family in Spain",
    goalFamilyDesc: "Family reunification or EU-family residence card routes.",
    familyLegend: "Who are you joining in Spain?",
    familyEu: "EU/EEA/Swiss or qualifying Spanish citizen",
    familyEuDesc: "Usually points to the EU-family residence card route, but some Spanish-citizen family cases can differ.",
    familyNonEu: "Non-EU citizen resident in Spain",
    familyNonEuDesc: "Usually points to family reunification.",
    durationLegend: "How long do you plan to stay?",
    durationShort: "Less than 90 days",
    durationShortDesc: "Usually a short-stay or entry-rules question.",
    durationLong: "More than 90 days / long term",
    durationLongDesc: "Usually requires registration, visa, authorization, or card steps.",
    durationNotSure: "Not sure",
    durationNotSureDesc: "Use this if you are still planning and want a cautious starting point.",
    continueButton: "Continue",
    showRouteButton: "Show likely route",
    emptyTitle: "Your roadmap will appear here",
    emptyText: "Choose a situation card or answer the questions above to see a Spain-wide route.",
    nextSteps: "Next 3 steps",
    officialLinks: "Official source links",
    resultDisclaimer: "Requirements can vary by personal situation and may change. Always verify with official sources.",
    livingNext: "What do you need next?",
    directPadron: "Padrón / town hall registration",
    directNie: "NIE number",
    directTie: "TIE card after VISA approval",
    directSocial: "Social Security number",
    directDigital: "Digital access: Cl@ve or digital certificate",
    directVidaLaboral: "Vida laboral (employment history report)",
    directDrivingLicence: "Exchange your driving licence",
    directSip: "Public health card",
    directPrivateHealth: "Private health insurance",
    directEhic: "EHIC / European Health Insurance Card",
    directBanking: "Bank account and banking basics",
    directRentingHome: "Renting a home",
    directJobs: "Job search in Spain",
    directTaxes: "Taxes and tax address",
    directPhone: "Phone number and internet",
    openGuideButton: "Open guide",
    footerSupportText: "If IberiGo helps you, you can support its maintenance with a voluntary contribution.",
    footerSupportLink: "Donate",
    footerLegal: "© 2026 IberiGo. Not legal advice.",
    footerReviewed: "Last reviewed: August 2026"
  },
  es: {
    headerTitle: "Mudarte, viajar y establecerte en España.",
    startNav: "Inicio",
    spainFilesNav: "The Spain Files",
    supportNav: "Donar",
    startHeading: "La burocracia española, explicada por quienes ya la han vivido.",
    heroSubheading: "Plazos reales, documentos reales, sin jerga legal — empieza por lo que realmente toca ahora.",
    heroStats: "70+ guías · Actualizado en octubre de 2026 · Escrito desde Alicante",
    mostReadEyebrow: "Más leído",
    featuredNieTitle: "Cómo conseguir un NIE en España",
    featuredNieNote: "Basado en experiencia real en la provincia de Alicante.",
    readGuideButton: "Leer guía",
    calloutEyebrow: "📍 Experiencia real en Torrevieja",
    calloutQuote: "Muchas guías dicen que el padrón tarda unos días. En Torrevieja el certificado en sí tardó unos 2–3 meses tras entregar papeles; el camino completo hasta la residencia, unos 3,5 meses.",
    browseBySituation: "O explora por situación",
    startDisclaimer: "No es asesoramiento legal. Verifique siempre con fuentes oficiales antes de tramitar.",
    movingTitle: "Mudarte a España",
    movingDesc: "NIE, TIE, padrón, registro de la UE, visados y residencia.",
    movingChipVisa: "Visados",
    movingChipEu: "Registro UE",
    movingChipStudy: "Estudios",
    movingChipFamily: "Familia",
    movingButton: "Planifica tu mudanza",
    vacationTitle: "Visitar España",
    vacationDesc: "Visitas cortas, reglas de entrada, transporte, alojamiento y planificación práctica del viaje en España.",
    vacationChipEntry: "Entrada",
    vacationChipTransport: "Transporte",
    vacationChipStays: "Alojamiento",
    vacationChipTrips: "Ideas",
    vacationButton: "Planifica tu visita",
    livingTitle: "Vivir en España",
    livingDesc: "Sanidad, banca, impuestos, acceso digital y los trámites clave para la vida diaria en España.",
    livingChipHealth: "Sanidad",
    livingChipBanking: "Banca",
    livingChipJobs: "Buscar trabajo",
    livingChipTaxes: "Impuestos",
    livingChipSocial: "Seguridad Social",
    livingChipDigital: "Acceso digital",
    livingButton: "Guías para vivir",
    hintPlain: "Pasos claros y sencillos",
    hintSources: "Enlaces del Gobierno de España",
    hintScope: "Guía general para España",
    progressPerson: "1. Situación",
    progressGoal: "2. Objetivo",
    progressResult: "3. Resultado",
    personLegend: "¿Eres?",
    personEu: "Ciudadano de la UE, EEE o Suiza",
    personEuDesc: "Puedes necesitar registro de ciudadano de la UE si vives en España a largo plazo.",
    personNonEu: "Ciudadano no comunitario",
    personNonEuDesc: "Puedes necesitar visado, autorización, TIE o una ruta de estancia corta.",
    goalLegend: "¿Qué quieres hacer?",
    goalWork: "Vivir y trabajar en España",
    goalWorkDesc: "Empleo, autónomo o autorización de trabajo.",
    goalNoWork: "Vivir en España sin trabajar",
    goalNoWorkDesc: "Para fondos propios, jubilación o sin actividad laboral en España.",
    goalStudy: "Estudiar en España",
    goalStudyDesc: "Cursos, universidad, formación, prácticas o estancia por estudios.",
    goalRemote: "Trabajar en remoto desde España",
    goalRemoteDesc: "Trabajo remoto principalmente para clientes o empresas fuera de España.",
    goalFamily: "Reunirte con familia en España",
    goalFamilyDesc: "Reagrupación familiar o tarjeta de familiar de ciudadano de la UE.",
    familyLegend: "¿Con quién te reúnes en España?",
    familyEu: "Ciudadano de la UE, EEE, Suiza o español cualificado",
    familyEuDesc: "Normalmente apunta a la tarjeta de familiar de ciudadano de la UE, pero algunos casos con ciudadano español pueden variar.",
    familyNonEu: "Ciudadano no comunitario residente en España",
    familyNonEuDesc: "Normalmente apunta a reagrupación familiar.",
    durationLegend: "¿Cuánto tiempo piensas quedarte?",
    durationShort: "Menos de 90 días",
    durationShortDesc: "Normalmente es una cuestión de estancia corta o entrada.",
    durationLong: "Más de 90 días / largo plazo",
    durationLongDesc: "Normalmente requiere registro, visado, autorización o tarjeta.",
    durationNotSure: "No lo sé",
    durationNotSureDesc: "Úsalo si todavía estás planificando y quieres un punto de partida prudente.",
    continueButton: "Continuar",
    showRouteButton: "Ver ruta probable",
    emptyTitle: "Tu ruta aparecerá aquí",
    emptyText: "Elige una tarjeta o responde las preguntas para ver una ruta general para España.",
    nextSteps: "Próximos 3 pasos",
    officialLinks: "Enlaces oficiales",
    resultDisclaimer: "Los requisitos pueden variar según tu situación personal y pueden cambiar. Comprueba siempre las fuentes oficiales.",
    livingNext: "¿Qué necesitas ahora?",
    directPadron: "Padrón / registro en el ayuntamiento",
    directNie: "Número NIE",
    directTie: "Tarjeta TIE después de aprobar el visado",
    directSocial: "Número de la Seguridad Social",
    directDigital: "Acceso digital: Cl@ve o certificado digital",
    directVidaLaboral: "Vida laboral (informe de vida laboral)",
    directDrivingLicence: "Canjear el permiso de conducir",
    directSip: "Tarjeta sanitaria pública",
    directPrivateHealth: "Seguro médico privado",
    directEhic: "Tarjeta Sanitaria Europea",
    directBanking: "Cuenta bancaria y banca básica",
    directRentingHome: "Alquilar vivienda",
    directJobs: "Buscar trabajo en España",
    directTaxes: "Impuestos y domicilio fiscal",
    directPhone: "Número de teléfono e internet",
    openGuideButton: "Abrir guía",
    footerSupportText: "Si IberiGo te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.",
    footerSupportLink: "Donar",
    footerLegal: "© 2026 IberiGo. No es asesoramiento legal.",
    footerReviewed: "Última revisión: agosto de 2026"
  },
};

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

const roadmapDetails = {
  "eu-registration": {
    process: "EU Registration Certificate",
    explanation: "<p><strong>What it is:</strong> EU, EEA, and Swiss citizens who plan to live in Spain for more than three months must register and obtain the Certificado de Registro de Ciudadano de la Unión — commonly called the \"green NIE\" because it shows your NIE number on a small green document. It is not a TIE card.</p><p><strong>What you need to show:</strong> You need to show you can support yourself: through work, sufficient funds, or study with health cover.</p><p><strong>How the process runs:</strong> Have your EX-18 form, NIE, padrón certificate, and proof of means ready before the appointment. The fee is 12.00 EUR via Modelo 790-012.</p><p><strong>Practical note:</strong> If you do not yet have a NIE, confirm with your local office whether they assign it during this registration or require a separate step first — practice varies by province. If you are working, an employment contract, Social Security alta, or autónomo registration is normally your proof of means, so you usually do not also need separate savings or private health cover — work is what gives access to public healthcare. Where the Policía cita previa menu is used, choose “POLICIA - CERTIFICADO DE REGISTRO DE CIUDADANO DE LA U.E.”, not NIE assignment or a TIE appointment. Confirm the current 790-012 fee before paying (it has been 12.00 EUR). If the requirements are met, the certificate is issued at the filing. Keep it with your NIE for work, tax, healthcare and digital ID.</p>",
    difficulty: "Medium",
    timeline: "Often a few weeks, depending on appointment availability",
    steps: [
      "Prepare your NIE and padrón certificate before the EU registration appointment.",
      "Prepare proof of funds, work contract, self-employment proof, or study documents.",
      "If you want to live in Spain without working, arrange valid health cover as part of the basis for registration.",
      "Pay Modelo 790-012 for the EU registration certificate.",
      "Complete EX-18.",
      "Attend the EU Registration Certificate appointment."
    ],
    documents: ["Passport or EU national ID", "NIE", "Padrón certificate or volante", "EX-18", "Work/funds/study proof", "Health cover if your basis is living in Spain without working", "790-012 receipt"],
    links: ["eu-certificate", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "790-012", "cita"]
  },
  "eu-working": {
    process: "EU Registration Certificate as a worker",
    explanation: "<p><strong>What it is:</strong> EU, EEA, and Swiss citizens living in Spain for more than three months and working there follow the same Certificado de Registro de Ciudadano de la Unión route — but working status is the simplest basis to register on.</p><p><strong>What counts as proof:</strong> Your employment contract or Social Security alta (or autónomo registration if self-employed) is your proof of means, so you normally do not need to show separate funds or private health cover — working gives you access to the public health system.</p><p><strong>How the process runs:</strong> Bring your EX-18 form, NIE, padrón certificate, and work evidence to the appointment. The fee is 12.00 EUR via Modelo 790-012.</p><p><strong>Practical note:</strong> Keep the certificate and your NIE — you will need both for employment, tax, healthcare, and digital ID steps.</p>",
    difficulty: "Medium",
    timeline: "Often a few weeks, depending on appointment availability",
    steps: [
      "Prepare your NIE and padrón certificate before the EU registration appointment.",
      "Prepare your employment contract, Social Security alta, or self-employment registration.",
      "Pay Modelo 790-012.",
      "Complete EX-18.",
      "Attend the EU Registration Certificate appointment.",
      "Keep the certificate and NIE for employment, tax, and digital ID steps."
    ],
    documents: ["Passport or EU national ID", "NIE", "Padrón certificate or volante", "EX-18", "Work evidence", "790-012 receipt"],
    links: ["eu-certificate", "790-012", "cita"]
  },
  "eu-vacation": {
    process: "EU short stay",
    explanation: "EU, EEA, and Swiss citizens can normally visit Spain for up to 3 months with a valid passport or national identity card. For an ordinary short visit you do not need a NIE, TIE, visa, or EU registration certificate. If you later decide to live in Spain for more than three months, residence registration rules come into play.",
    difficulty: "Low",
    timeline: "No residence filing for an ordinary short visit",
    steps: ["Travel with a valid passport or national ID.", "Keep health cover or EHIC available.", "Use the official tourism and transport links to plan trains, airports, buses, and where to stay.", "If you later decide to live in Spain, use the EU registration route."],
    documents: ["Passport or national ID", "Health cover for travel", "Travel and accommodation details"],
    links: ["eu-short-stay", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "non-eu-vacation": {
    process: "Schengen short stay",
    explanation: "For a vacation or short visit, check whether your passport needs a Schengen short-stay visa or can enter visa-free. The 90 days are normally counted across the whole Schengen area in any 180-day period, not just in Spain. This route is for ordinary visits — it is not a route to live or work in Spain.",
    difficulty: "Low to medium",
    timeline: "Depends on whether your passport requires a Schengen visa",
    steps: ["Check whether your passport needs a Schengen short-stay visa.", "Check the 90 days in any 180-day rule.", "Prepare travel insurance, accommodation, return/onward travel, and funds if asked.", "Use the tourism and transport links to plan trains, airports, buses, and places to stay.", "Do not treat a short stay as permission to live or work in Spain."],
    documents: ["Passport", "Schengen visa if required", "Travel insurance if required", "Accommodation and return/onward travel proof"],
    links: ["schengen", "calculator", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "work-authorization": {
    process: "Work authorization for non-EU citizens",
    explanation: "<p><strong>What it is:</strong> Non-EU citizens who want to live in Spain and work for a Spanish employer or run their own business typically need a residence and work authorization before starting work.</p><p><strong>How you apply:</strong> Employed workers usually apply via the EX-03 form; the self-employed route uses EX-07. The authorization is employer-led in most cases — your Spanish employer initiates the application on your behalf.</p><p><strong>After approval:</strong> You apply for your entry visa at a Spanish consulate, enter Spain, and then do the TIE fingerprint appointment within the deadline on your resolution.</p><p><strong>Practical note:</strong> Processing can take several months and approval is not guaranteed — the whole process from application to card in hand typically takes six months to over a year.</p>",
    difficulty: "High",
    timeline: "Often several months",
    steps: ["Confirm whether the route is employee work or self-employed work.", "Prepare employer contract or business plan and professional evidence.", "Apply for the residence and work authorization before starting work.", "After approval, complete visa and TIE card steps if required.", "Pay Modelo 790-012 for the card step when applicable."],
    documents: ["Passport", "EX-03 for employee work or EX-07 for self-employed work", "Contract or business plan", "Qualifications where required", "EX-17 after approval", "790-012 receipt for card step"],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    process: "International telework / digital nomad",
    explanation: "<p><strong>What it is:</strong> Spain's digital nomad visa (officially the international telework authorization, introduced under the Ley de Startups) lets non-EU remote workers live legally in Spain while working mainly for employers or clients based outside the country — your Spanish-client work cannot exceed 20% of total professional activity.</p><p><strong>What you need:</strong> A work contract or client evidence, private health insurance covering Spain, a criminal record certificate, and proof of your professional background. A minimum monthly income threshold applies (linked to the Spanish minimum wage — check the official page for the current figure, as it can update).</p><p><strong>How you apply:</strong> Two paths exist: apply from abroad at a Spanish consulate, or — if already legally in Spain — apply in-country through the UGE-CE online portal.</p><p><strong>Practical note:</strong> Processing after a complete filing typically takes one to three months, though incomplete documents are a common reason for delays. If approved, you still need a separate TIE fingerprint appointment to get the physical card.</p>",
    difficulty: "High",
    timeline: "Often one to three months after a complete filing",
    steps: ["Confirm your work is mainly for companies or clients outside Spain.", "Prepare contracts, company evidence, qualifications or experience, health cover, and clean record documents.", "Apply through the official telework route or consulate path.", "After approval, complete TIE card steps if required.", "Set up digital ID once eligible."],
    documents: ["Passport", "Remote work evidence", "Company/client documents", "Qualifications or experience", "Health cover", "Criminal record certificate where required"],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    process: "Non-lucrative residence",
    explanation: "<p><strong>What it is:</strong> The non-lucrative residence visa lets non-EU citizens live in Spain without working — it is popular with retirees, people with passive income, rental income, savings, or investments.</p><p><strong>What you need to show:</strong> Sufficient funds to support yourself and any dependants without working in Spain (the threshold is linked to the IPREM indicator and updates annually — check the current figure at your consulate), plus private health insurance covering Spain, a clean criminal record, and a medical certificate.</p><p><strong>How you apply:</strong> The application is made at a Spanish consulate in your country of residence, not in Spain. Once approved, you enter on a visa, register on the padrón, and collect your TIE.</p><p><strong>Practical note:</strong> The visa is initially valid for one year and can be renewed; after five years you can apply for long-term residence.</p>",
    difficulty: "High",
    timeline: "Often several months, commonly through a consulate",
    steps: ["Confirm you will not work or carry out professional activity in Spain.", "Prepare proof of funds, health insurance, criminal record, and medical certificate where required.", "Apply through the official non-lucrative route.", "After approval or visa issue, complete TIE card steps if required.", "Use padrón and digital ID steps after arrival."],
    documents: ["Passport", "EX-01 or consular application path", "Proof of funds", "Health insurance", "Criminal record certificate", "Medical certificate", "EX-17 after approval"],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    process: "Study stay authorization application",
    explanation: "<p><strong>What it is:</strong> Non-EU students planning to study, train, do an internship, or participate in a student mobility programme in Spain for more than 90 days need a study stay authorization.</p><p><strong>How you apply:</strong> You apply through a Spanish consulate before arriving, with an acceptance letter from your institution, proof of funds, private health insurance, a clean criminal record, and a medical certificate. Once in Spain you collect a student TIE.</p><p><strong>What it allows:</strong> Work rights are limited but some study authorizations allow part-time work — check the specific terms of your authorization. Family members may be able to join under linked authorization in some cases.</p><p><strong>Practical note:</strong> Student status gives access to public healthcare in some regions through the health card, but check your autonomous community's rules.</p>",
    difficulty: "Medium to high",
    timeline: "Often one to three months after a complete filing",
    steps: ["Prepare admission or enrollment proof.", "Prepare funds, health insurance, passport, and legalized/trans­lated public documents where required.", "Apply through the official study stay route.", "If your stay requires a card, complete the TIE step after approval.", "Keep renewal dates visible if the course continues."],
    documents: ["Passport", "EX-00", "Admission or enrollment proof", "Proof of funds", "Health insurance", "EX-17 if TIE is required"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Family reunification",
    explanation: "<p><strong>What it is:</strong> Family reunification (reagrupación familiar) lets a non-EU citizen who already holds legal residence in Spain sponsor certain close relatives so they can join them on a dependent temporary residence authorization. It is a separate route from being sponsored by an EU, EEA, or Swiss citizen, which instead follows the EU-family residence card process.</p><p><strong>Who can sponsor:</strong> The Spain-based sponsor normally needs to have held legal residence for at least one year and have at least one more year of validity remaining on their own authorization, and must show housing and income that meet the threshold for the family size being reunited.</p><p><strong>Eligible relatives:</strong> Typically the sponsor's spouse or registered partner, minor children, and in some cases dependent parents can be included; each relationship has to be documented.</p><p><strong>How the process runs:</strong> The sponsor files the reunification application in Spain. Once it is approved, the family member applies for their entry visa at a Spanish consulate abroad, travels to Spain, and then completes the TIE card step to receive their residence card.</p><p><strong>Practical note:</strong> Processing commonly takes several months, and supporting documents such as birth or marriage certificates usually need an apostille and a sworn Spanish translation before they are accepted.</p>",
    difficulty: "High",
    timeline: "Often several months",
    steps: ["Confirm the family member in Spain is a non-EU legal resident and eligible to sponsor you.", "Prepare family relationship evidence, sponsor residence documents, housing proof, and economic means evidence.", "Apply through the family reunification route.", "After approval and visa steps, complete the TIE card step.", "Keep renewal dates visible."],
    documents: ["Passport", "EX-02", "Family relationship evidence", "Sponsor residence documents", "Housing and economic means proof", "EX-17 after approval"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "Residence card application for family member of an EU citizen",
    explanation: "<p><strong>What it is:</strong> The residence card for a family member of an EU citizen (Tarjeta de Residencia de Familiar de Ciudadano de la Unión) is the route used when a non-EU family member joins or accompanies an EU, EEA, or Swiss citizen who is already registered as a resident in Spain. It follows separate, generally more favourable rules than ordinary family reunification, since it derives from EU free-movement rights rather than the standard non-EU sponsorship route.</p><p><strong>Who the sponsor must be:</strong> The EU, EEA, or Swiss citizen being joined must already hold their own EU registration certificate (the green NIE) before the non-EU family member applies for the card.</p><p><strong>Eligible family members:</strong> Typically the EU citizen's spouse or registered partner, dependent children under 21, and dependent direct relatives in the ascending line (such as parents) can apply; each relationship has to be documented.</p><p><strong>How the process runs:</strong> The non-EU family member applies using the EX-19 form, pays the reduced fee via Modelo 790-012, and attends a fingerprint appointment (toma de huellas) with Policía Nacional. Once approved, the card is issued and is normally valid for five years initially.</p><p><strong>Practical note:</strong> Fingerprint appointment slots in high-demand provinces such as Madrid, Barcelona, and Alicante can be scarce — book as soon as the authorization arrives, and keep evidence of any failed booking attempts if a filing deadline is at risk.</p>",
    difficulty: "Medium to high",
    timeline: "Often a few weeks to a few months",
    steps: ["Confirm the family member is an EU, EEA, Swiss, or qualifying Spanish citizen.", "Prepare relationship evidence and the EU/Spanish citizen's residence basis.", "Complete EX-19.", "Book the relevant EU-family residence card appointment.", "Pay Modelo 790-012 if required by the card process."],
    documents: ["Passport", "EX-19", "DNI or EU registration certificate of the EU/Spanish citizen", "Marriage, partnership, birth, or dependency evidence", "790-012 receipt if required"],
    links: ["eu-family-official", "eu-family-spain", "eu-family-entry", "cita", "790-012"]
  },
  "nie-only": {
    process: "NIE only",
    explanation: "<p><strong>What it is:</strong> The NIE (Número de Identificación de Extranjero) is a lifetime identification number Spain assigns to foreigners for official and financial transactions — buying property, signing before a notary, opening some bank accounts, or other administrative acts.</p><p><strong>What it is not:</strong> A NIE is just a number, not a card and not a residence permit. Having a NIE does not give you the right to live or work in Spain.</p><p><strong>What the office may expect:</strong> Police offices usually expect a concrete, documented reason to assign one — a property purchase, contract, notarial act, or specific administrative act — not simply wanting it in case it is useful later.</p><p><strong>Practical note:</strong> Appointment availability varies sharply by province — Madrid and Barcelona are often severely backlogged, smaller cities much easier. If you attend with everything in order, the number is typically assigned the same day.</p>",
    difficulty: "Low to medium",
    timeline: "Often same day once your documents are in order",
    steps: ["Gather proof of your reason for needing a NIE, such as a property purchase, contract, notarial act, or other concrete procedure.", "Prepare passport or identity document, the EX-15 form, and a representative authorization if someone is filing on your behalf.", "Book a cita previa at a Policía Nacional foreigners office, or a Spanish consulate if outside Spain, and pay the matching 790-012 fee."],
    documents: ["EX-15 form", "Passport or identity document", "Written reason for the NIE request", "Representative authorization if someone files for you", "Paid tasa receipt"],
    links: ["cita", "790-012"]
  },
  "tie-after-approval": {
    process: "TIE after approval",
    explanation: "<p><strong>What it is:</strong> The TIE is the physical identity card you receive after your Spanish residence or stay authorization has already been approved. You book a fingerprint appointment (toma de huella) with Policía Nacional to have it issued.</p><p><strong>What it is not:</strong> Your legal right to be in Spain comes from the approval resolution or entry visa, not from the card itself — the TIE documents an authorization that was already granted.</p><p><strong>Timing:</strong> The card takes a few weeks to be ready after your fingerprint appointment; in Madrid, Barcelona, and Valencia, appointment slots can stretch out for weeks. Apply as soon as your approval resolution arrives, since missing the filing window is a real risk and the exact deadline varies by authorization type.</p>",
    difficulty: "Medium",
    timeline: "A few weeks after your fingerprint appointment",
    steps: ["Confirm that your approval resolution or entry visa has already been granted before booking the fingerprint appointment.", "Complete EX-17 and prepare your passport, approval resolution or visa, and a recent passport-style photo.", "Book the fingerprint appointment with Policía Nacional and bring a paid 790-012 receipt for the card fee."],
    documents: ["EX-17 form", "Passport", "Favorable resolution or visa", "Recent Spanish-format photo", "Paid Modelo 790 Codigo 012 receipt"],
    links: ["cita", "790-012"]
  },
  "already-spain": {
    process: "Spain admin basics",
    difficulty: "Low to medium",
    timeline: "Usually step-by-step over a few weeks",
    steps: ["Get padrón if you have an address in Spain.", "Check whether you need NIE, EU registration, TIE, or a renewal step.", "Prepare digital ID through FNMT if you have NIE, or Cl@ve if eligible.", "Keep copies of appointments, receipts, and certificates."],
    documents: ["Passport or ID", "Rental/ownership or address evidence", "Existing NIE/TIE if any", "Appointment confirmations"],
    links: ["nie", "fnmt", "clave", "cita"]
  }
};

const roadmapDetailsEs = {
  "eu-registration": {
    process: "Certificado de registro de ciudadano de la UE",
    explanation: "Los ciudadanos de la UE, EEE y Suiza que planean vivir en España más de tres meses deben registrarse y obtener el Certificado de Registro de Ciudadano de la Unión, a menudo llamado NIE verde porque muestra tu número NIE en un documento verde pequeño. No es una tarjeta TIE. Debes demostrar que puedes mantenerte: por trabajo, fondos suficientes o estudios con cobertura sanitaria. Ten preparados el formulario EX-18, NIE, certificado de padrón y prueba de medios antes de la cita. La tasa es de 12.00 EUR mediante el Modelo 790-012. Si todavía no tienes NIE, confirma con la oficina local si lo asignan durante este registro o si exigen un paso separado primero, porque la práctica puede variar por provincia. Si trabajas, el contrato, el alta en la Seguridad Social o el alta de autónomo suele ser la prueba de medios, así que normalmente no hace falta mostrar ahorros aparte ni seguro privado: trabajar da acceso a la sanidad pública. En el menú de cita previa de Policía, elige “POLICIA - CERTIFICADO DE REGISTRO DE CIUDADANO DE LA U.E.”, no asignación de NIE ni cita de TIE. Confirma la tasa vigente del 790-012 antes de pagar (ha sido 12,00 EUR). Si cumples los requisitos, el certificado se expide en el momento de la presentación. Guárdalo junto con el NIE para trabajo, impuestos, sanidad e identificación digital.",
    difficulty: "Media",
    timeline: "Normalmente unas semanas, según la disponibilidad de citas",
    steps: [
      "Prepara tu NIE y certificado o volante de padrón antes de la cita de registro de ciudadano de la UE.",
      "Prepara prueba de fondos, contrato de trabajo, prueba de autónomo o documentos de estudios.",
      "Si quieres vivir en España sin trabajar, prepara cobertura sanitaria válida como parte de la base del registro.",
      "Paga el Modelo 790-012 para el certificado de registro de la UE.",
      "Completa el formulario EX-18.",
      "Acude a la cita del certificado de registro de ciudadano de la UE."
    ],
    documents: ["Pasaporte o documento nacional de identidad de la UE", "NIE", "Certificado o volante de padrón", "EX-18", "Prueba de trabajo, fondos o estudios", "Cobertura sanitaria si tu base es vivir en España sin trabajar", "Justificante 790-012"],
    links: ["eu-certificate", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "790-012", "cita"]
  },
  "eu-working": {
    process: "Certificado de registro de la UE como trabajador",
    explanation: "Los ciudadanos de la UE, EEE y Suiza que viven en España más de tres meses y trabajan aquí siguen la misma ruta del Certificado de Registro de Ciudadano de la Unión, pero la situación laboral suele ser la base más sencilla para registrarse. Tu contrato de trabajo, alta en la Seguridad Social o registro de autónomo sirve como prueba de medios, por lo que normalmente no necesitas demostrar fondos separados ni seguro médico privado: trabajar te da acceso al sistema sanitario público. Lleva EX-18, NIE, certificado de padrón y prueba laboral a la cita. La tasa es de 12.00 EUR mediante el Modelo 790-012. Guarda el certificado y el NIE porque los necesitarás para empleo, impuestos, sanidad e identificación digital.",
    difficulty: "Media",
    timeline: "Normalmente unas semanas, según la disponibilidad de citas",
    steps: [
      "Prepara tu NIE y certificado o volante de padrón antes de la cita de registro de ciudadano de la UE.",
      "Prepara tu contrato de trabajo, alta en la Seguridad Social o registro como autónomo.",
      "Paga el Modelo 790-012.",
      "Completa el formulario EX-18.",
      "Acude a la cita del certificado de registro de ciudadano de la UE.",
      "Conserva el certificado y el NIE para empleo, impuestos y trámites digitales."
    ],
    documents: ["Pasaporte o documento nacional de identidad de la UE", "NIE", "Certificado o volante de padrón", "EX-18", "Prueba de trabajo", "Justificante 790-012"],
    links: ["eu-certificate", "790-012", "cita"]
  },
  "eu-vacation": {
    process: "Estancia corta para ciudadanos de la UE",
    explanation: "Los ciudadanos de la UE, EEE y Suiza normalmente pueden visitar España hasta 3 meses con pasaporte o documento nacional de identidad válido. Para una visita corta ordinaria no necesitas NIE, TIE, visado ni certificado de registro UE. Si después decides vivir en España más de tres meses, entonces ya entran en juego las normas de registro de residencia.",
    difficulty: "Baja",
    timeline: "No hay trámite de residencia para una visita corta ordinaria",
    steps: ["Viaja con pasaporte o documento nacional de identidad válido.", "Ten disponible cobertura sanitaria o Tarjeta Sanitaria Europea.", "Usa los enlaces oficiales de turismo y transporte para planificar trenes, aeropuertos, autobuses y alojamiento.", "Si después decides vivir en España, usa la ruta de registro de ciudadano de la UE."],
    documents: ["Pasaporte o documento nacional de identidad", "Cobertura sanitaria para el viaje", "Datos de viaje y alojamiento"],
    links: ["eu-short-stay", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "non-eu-vacation": {
    process: "Estancia corta Schengen",
    explanation: "Para vacaciones o una visita corta, comprueba si tu pasaporte necesita visado Schengen de corta estancia o si puede entrar sin visado. Los 90 días se cuentan normalmente dentro de todo el espacio Schengen en cualquier periodo de 180 días, no solo en España. Esta ruta sirve para visitas ordinarias, no para vivir o trabajar en España.",
    difficulty: "Baja a media",
    timeline: "Depende de si tu pasaporte necesita visado Schengen",
    steps: ["Comprueba si tu pasaporte necesita visado Schengen de corta estancia.", "Comprueba la regla de 90 días en cualquier periodo de 180 días.", "Prepara seguro de viaje, alojamiento, viaje de regreso o continuación y fondos si te los piden.", "Usa los enlaces de turismo y transporte para planificar trenes, aeropuertos, autobuses y dónde alojarte.", "No trates una estancia corta como permiso para vivir o trabajar en España."],
    documents: ["Pasaporte", "Visado Schengen si es necesario", "Seguro de viaje si es necesario", "Prueba de alojamiento y viaje de regreso o continuación"],
    links: ["schengen", "calculator", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "work-authorization": {
    process: "Autorización de trabajo para ciudadanos no comunitarios",
    explanation: "Los ciudadanos no comunitarios que quieren vivir en España y trabajar para una empresa española o montar su propio negocio suelen necesitar una autorización de residencia y trabajo antes de empezar. El trabajo por cuenta ajena normalmente usa el formulario EX-03 y el trabajo por cuenta propia usa EX-07. En muchos casos la solicitud la inicia el empleador español. La tramitación puede tardar varios meses y la aprobación no está garantizada. Tras la aprobación, normalmente se solicita el visado de entrada en el consulado español, se entra en España y después se hace la cita de huellas para la TIE dentro del plazo indicado en la resolución.",
    difficulty: "Alta",
    timeline: "A menudo varios meses",
    steps: ["Confirma si la ruta es trabajo por cuenta ajena o por cuenta propia.", "Prepara contrato, plan de negocio y pruebas profesionales según corresponda.", "Solicita la autorización de residencia y trabajo antes de empezar a trabajar.", "Tras la aprobación, completa el visado y la TIE si corresponde.", "Paga el Modelo 790-012 para el paso de la tarjeta cuando sea aplicable."],
    documents: ["Pasaporte", "EX-03 para cuenta ajena o EX-07 para cuenta propia", "Contrato o plan de negocio", "Titulación cuando sea necesaria", "EX-17 tras la aprobación", "Justificante 790-012 para la tarjeta"],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    process: "Teletrabajo internacional / nómada digital",
    explanation: "La residencia de teletrabajo internacional, conocida como nómada digital, permite a trabajadores remotos no comunitarios vivir legalmente en España mientras trabajan principalmente para empresas o clientes fuera de España. El trabajo para clientes españoles no puede superar el 20% de la actividad profesional total. Suele requerir contrato o pruebas de clientes, documentos de empresa, seguro médico, certificado de antecedentes y prueba de cualificación o experiencia. También existe un umbral mínimo de ingresos que puede cambiar, por lo que conviene revisar la página oficial. Puede tramitarse desde un consulado o, si ya estás legalmente en España, mediante la UGE-CE. Tras la aprobación, normalmente queda el paso de TIE.",
    difficulty: "Alta",
    timeline: "A menudo de uno a tres meses tras presentar un expediente completo",
    steps: ["Confirma que trabajas principalmente para empresas o clientes fuera de España.", "Prepara contratos, pruebas de empresa, cualificación o experiencia, cobertura sanitaria y documentos de antecedentes si los piden.", "Solicita por la ruta oficial de teletrabajo o por vía consular.", "Tras la aprobación, completa la TIE si corresponde.", "Configura identificación digital cuando seas elegible."],
    documents: ["Pasaporte", "Pruebas de trabajo remoto", "Documentos de empresa o clientes", "Cualificación o experiencia", "Cobertura sanitaria", "Certificado de antecedentes penales cuando sea necesario"],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    process: "Residencia no lucrativa",
    explanation: "La residencia no lucrativa permite a ciudadanos no comunitarios vivir en España sin trabajar. Es habitual entre jubilados, personas con ingresos pasivos, alquileres, ahorros o inversiones. Debes demostrar fondos suficientes para mantenerte a ti y a tus familiares sin actividad laboral en España; el umbral se vincula al IPREM y puede actualizarse. También se suele exigir seguro médico privado que cubra España, certificado de antecedentes y certificado médico. La solicitud normalmente se presenta en el consulado español del país de residencia. Tras la aprobación, entras con visado, haces padrón y completas la TIE.",
    difficulty: "Alta",
    timeline: "A menudo varios meses, normalmente mediante consulado",
    steps: ["Confirma que no vas a trabajar ni realizar actividad profesional en España.", "Prepara fondos, seguro médico, antecedentes penales y certificado médico cuando los pidan.", "Solicita por la ruta oficial de residencia no lucrativa.", "Tras la aprobación o el visado, completa la TIE si corresponde.", "Usa padrón e identificación digital después de llegar."],
    documents: ["Pasaporte", "EX-01 o vía consular", "Prueba de fondos", "Seguro médico", "Certificado de antecedentes penales", "Certificado médico", "EX-17 tras la aprobación"],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    process: "Solicitud de autorización de estancia por estudios",
    explanation: "Los estudiantes no comunitarios que van a estudiar, formarse, hacer prácticas o participar en movilidad estudiantil en España durante más de 90 días necesitan una autorización de estancia por estudios. Normalmente se prepara una carta de admisión, prueba de fondos, seguro médico, antecedentes penales y certificado médico cuando corresponda. Tras llegar a España, puede ser necesario obtener una TIE de estudiante. Algunos permisos de estudios permiten trabajar a tiempo parcial, pero siempre hay que revisar las condiciones concretas de la autorización.",
    difficulty: "Media a alta",
    timeline: "A menudo de uno a tres meses tras presentar un expediente completo",
    steps: ["Prepara prueba de admisión o matrícula.", "Prepara fondos, seguro médico, pasaporte y documentos públicos legalizados o traducidos cuando sea necesario.", "Solicita por la ruta oficial de estancia por estudios.", "Si tu estancia requiere tarjeta, completa el paso de la TIE tras la aprobación.", "Controla las fechas de renovación si el curso continúa."],
    documents: ["Pasaporte", "EX-00", "Prueba de admisión o matrícula", "Prueba de fondos", "Seguro médico", "EX-17 si se requiere TIE"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Reagrupación familiar",
    explanation: "<p><strong>Qué es:</strong> La reagrupación familiar permite que un ciudadano no comunitario que ya es residente legal en España reagrupe a determinados familiares para que se reúnan con él mediante una autorización de residencia temporal dependiente. Es una ruta distinta de la reagrupación con un ciudadano de la UE, EEE o Suiza, que sigue el proceso separado de la tarjeta de familiar de la UE.</p><p><strong>Quién puede ser reagrupante:</strong> El residente en España normalmente debe haber tenido residencia legal durante al menos un año y contar con al menos otro año de validez en su propia autorización, además de demostrar vivienda y medios económicos suficientes para el tamaño de la familia que va a reagrupar.</p><p><strong>Familiares que pueden optar:</strong> Suelen poder incluirse el cónyuge o pareja registrada, los hijos menores y, en algunos casos, los ascendientes dependientes; cada vínculo debe quedar documentado.</p><p><strong>Cómo funciona el proceso:</strong> El reagrupante presenta la solicitud en España. Una vez aprobada, el familiar solicita el visado de entrada en un consulado español en el extranjero, viaja a España y después completa el paso de la TIE para obtener su tarjeta de residencia.</p><p><strong>Nota práctica:</strong> El proceso suele tardar varios meses, y los documentos de apoyo como certificados de nacimiento o matrimonio normalmente necesitan apostilla y traducción jurada al español antes de ser aceptados.</p>",
    difficulty: "Alta",
    timeline: "A menudo varios meses",
    steps: ["Confirma que el familiar en España es residente legal no comunitario y puede reagruparte.", "Prepara prueba del vínculo familiar, documentos de residencia del reagrupante, vivienda y medios económicos.", "Solicita por la ruta de reagrupación familiar.", "Tras la aprobación y el visado, completa el paso de la TIE.", "Controla las fechas de renovación."],
    documents: ["Pasaporte", "EX-02", "Prueba del vínculo familiar", "Documentos de residencia del reagrupante", "Prueba de vivienda y medios económicos", "EX-17 tras la aprobación"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "Solicitud de tarjeta de residencia de familiar de ciudadano de la UE",
    explanation: "<p><strong>Qué es:</strong> La tarjeta de residencia de familiar de ciudadano de la Unión es la ruta que se usa cuando un familiar no comunitario se reúne o acompaña a un ciudadano de la UE, EEE o Suiza que ya está registrado como residente en España. Sigue normas separadas y generalmente más favorables que la reagrupación familiar ordinaria, porque deriva de los derechos de libre circulación de la UE y no de la ruta estándar de reagrupación para no comunitarios.</p><p><strong>Quién debe ser el reagrupante:</strong> El ciudadano de la UE, EEE o Suiza al que se reúne el familiar debe tener ya su propio certificado de registro de la UE (el NIE verde) antes de que el familiar no comunitario solicite la tarjeta.</p><p><strong>Familiares que pueden optar:</strong> Suelen poder solicitarla el cónyuge o pareja registrada del ciudadano de la UE, los hijos dependientes menores de 21 años y los familiares directos ascendientes dependientes (como los padres); cada vínculo debe quedar documentado.</p><p><strong>Cómo funciona el proceso:</strong> El familiar no comunitario solicita con el formulario EX-19, paga la tasa reducida mediante el Modelo 790-012 y acude a una cita de toma de huellas con la Policía Nacional. Tras la aprobación, se emite la tarjeta, que normalmente tiene una validez inicial de cinco años.</p><p><strong>Nota práctica:</strong> Las citas de huellas en provincias con mucha demanda como Madrid, Barcelona o Alicante pueden escasear — reserva en cuanto llegue la autorización y guarda prueba de cualquier intento fallido de reserva si hay un plazo de presentación en riesgo.</p>",
    difficulty: "Media a alta",
    timeline: "A menudo de unas semanas a unos meses",
    steps: ["Confirma que el familiar es ciudadano de la UE, EEE, Suiza o ciudadano español cualificado.", "Prepara prueba del vínculo y la base de residencia del ciudadano UE/español.", "Completa el formulario EX-19.", "Reserva la cita correspondiente para tarjeta de familiar de ciudadano de la UE.", "Después de la aprobación, revisa el paso de TIE con EX-17 si te lo piden.", "Paga el Modelo 790-012 si lo exige el proceso de tarjeta."],
    documents: ["Pasaporte", "EX-19", "DNI o certificado de registro UE del ciudadano UE/español", "Matrimonio, pareja, nacimiento o prueba de dependencia", "EX-17 tras la aprobación si corresponde", "Justificante 790-012 si lo piden"],
    links: ["eu-family-official", "eu-family-spain", "eu-family-entry", "cita", "790-012"]
  },
  "nie-only": {
    process: "Número NIE",
    explanation: "<p><strong>Qué es:</strong> El NIE (Número de Identificación de Extranjero) es un número de identificación vitalicio que España asigna a los extranjeros para trámites oficiales y financieros — comprar una vivienda, firmar ante notario, abrir algunas cuentas bancarias u otros actos administrativos.</p><p><strong>Qué no es:</strong> El NIE es solo un número, no es una tarjeta ni un permiso de residencia. Tener un NIE no te da derecho a vivir ni a trabajar en España.</p><p><strong>Qué puede pedir la oficina:</strong> La policía suele exigir un motivo concreto y documentado para asignarlo — una compra inmobiliaria, un contrato, un acto notarial u otro trámite administrativo específico — no simplemente quererlo por si acaso.</p><p><strong>Nota práctica:</strong> La disponibilidad de citas varía mucho según la provincia — Madrid y Barcelona suelen tener mucha saturación, en ciudades pequeñas es más fácil. Si acudes con todo en regla, el número suele asignarse el mismo día.</p>",
    difficulty: "Baja a media",
    timeline: "A menudo el mismo día una vez que tu documentación está en regla",
    steps: ["Reúne la prueba de tu motivo para necesitar el NIE, como una compra inmobiliaria, un contrato, un acto notarial u otro trámite concreto.", "Prepara pasaporte o documento de identidad, formulario EX-15 y autorización de representante si alguien presenta la solicitud en tu nombre.", "Pide cita previa en una oficina de extranjería de la Policía Nacional, o en un consulado español si estás fuera de España, y paga la tasa 790-012 correspondiente."],
    documents: ["Formulario EX-15", "Pasaporte o documento de identidad", "Motivo por escrito de la solicitud de NIE", "Autorización de representante si alguien presenta la solicitud por ti", "Justificante de tasa pagada"],
    links: ["cita", "790-012"]
  },
  "tie-after-approval": {
    process: "Tarjeta TIE tras la aprobación",
    explanation: "<p><strong>Qué es:</strong> La TIE es la tarjeta física de identidad que recibes después de que tu autorización de residencia o estancia en España ya ha sido aprobada. Reservas una cita de huellas (toma de huella) con la Policía Nacional para que se expida.</p><p><strong>Qué no es:</strong> Tu derecho legal a estar en España viene de la resolución de aprobación o del visado de entrada, no de la tarjeta en sí — la TIE documenta una autorización que ya fue concedida.</p><p><strong>Plazos:</strong> La tarjeta tarda unas semanas en estar lista tras la cita de huellas; en Madrid, Barcelona y Valencia las citas pueden tardar semanas en aparecer. Solicítala en cuanto llegue tu resolución favorable, porque no cumplir el plazo es un riesgo real y el plazo exacto varía según el tipo de autorización.</p>",
    difficulty: "Media",
    timeline: "Unas semanas después de tu cita de huellas",
    steps: ["Confirma que tu resolución de aprobación o visado de entrada ya ha sido concedido antes de reservar la cita de huellas.", "Completa el EX-17 y prepara tu pasaporte, la resolución de aprobación o visado, y una foto reciente tipo carné.", "Reserva la cita de huellas con la Policía Nacional y lleva un justificante de pago de la tasa 790-012."],
    documents: ["Formulario EX-17", "Pasaporte", "Resolución favorable o visado", "Foto reciente en formato español", "Justificante de pago del Modelo 790 Código 012"],
    links: ["cita", "790-012"]
  },
  "already-spain": {
    process: "Trámites básicos si ya vives en España",
    difficulty: "Baja a media",
    timeline: "Normalmente paso a paso durante unas semanas",
    steps: ["Consigue el padrón si tienes una dirección en España.", "Comprueba si necesitas NIE, registro UE, TIE o algún paso de renovación.", "Prepara identificación digital con FNMT si tienes NIE, o Cl@ve si cumples los requisitos.", "Guarda copias de citas, justificantes y certificados."],
    documents: ["Pasaporte o documento de identidad", "Contrato, escritura o prueba de domicilio", "NIE/TIE existente si lo tienes", "Confirmaciones de cita"],
    links: ["nie", "fnmt", "clave", "cita"]
  }
};

function getValue(name) {
  return new FormData(wizard).get(name);
}

function initializeVisitorCounter() {
  if (!VISITOR_COUNTER_URL || !VISITOR_COUNTER_HOSTS.has(window.location.hostname)) return;
  // scripts/site-search.js (on every page) loads the same counter; this shared
  // one-time guard makes sure count.js is only added once per page.
  if (window.__iberigoVisitorCounterLoaded || document.querySelector("script[data-goatcounter]")) return;
  window.__iberigoVisitorCounterLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = VISITOR_COUNTER_URL;
  document.head.append(script);
}

function initializeHomeVideos() {
  document.querySelectorAll(".situation-card--illustrated").forEach((card) => {
    const video = card.querySelector("video.situation-media");
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const playVideo = () => {
      video.play().catch(() => {});
    };
    const stopVideo = () => {
      video.pause();
      video.currentTime = 0;
    };

    card.addEventListener("mouseenter", playVideo);
    card.addEventListener("mouseleave", stopVideo);
    card.addEventListener("focusin", playVideo);
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) stopVideo();
    });
  });
}

function trackUsageEvent(path, title) {
  if (!window.goatcounter?.count) return;

  window.goatcounter.count({
    event: true,
    path,
    title
  });
}

function checked(name, value) {
  const input = wizard.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

function clearWizardSelections() {
  wizard.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
}

function wizardSelectionState() {
  return {
    personType: getValue("personType"),
    goal: getValue("goal"),
    familySponsor: getValue("familySponsor"),
    duration: getValue("duration")
  };
}

function restoreWizardSelections(selections = {}) {
  clearWizardSelections();
  Object.entries(selections).forEach(([name, value]) => {
    if (value) checked(name, value);
  });
}

function cloneScreenState(state) {
  return JSON.parse(JSON.stringify(state || { type: "start" }));
}

function setCurrentScreenState(state) {
  currentScreenState = cloneScreenState(state);
}

function pushCurrentScreenState() {
  if (currentScreenState.type === "wizard") {
    setCurrentScreenState({
      type: "wizard",
      entryPreset: currentEntryPreset,
      step: wizard.dataset.step || "person",
      selections: wizardSelectionState()
    });
  }
  navigationStack.push(cloneScreenState(currentScreenState));
}

function restoreScreenState(state) {
  if (!state || state.type === "start") {
    resetToStart(false);
    return;
  }

  currentEntryPreset = state.entryPreset || null;
  currentDirectRoute = state.directRoute || null;

  if (state.type === "wizard") {
    showRouteFinder();
    restoreWizardSelections(state.selections);
    wizard.dataset.step = state.step || "person";
    updateQuestionVisibility();
    result.hidden = true;
    setCurrentScreenState({
      type: "wizard",
      entryPreset: currentEntryPreset,
      step: wizard.dataset.step,
      selections: wizardSelectionState()
    });
    wizard.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (state.type === "living-menu") {
    showDirectGuide();
    renderLivingSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (state.type === "vacation-menu") {
    showDirectGuide();
    renderVacationSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (state.type === "direct-guide") {
    const roadmap = directRoadmapFor(state.directRoute);
    if (!roadmap) {
      resetToStart(false);
      return;
    }
    currentDirectRoute = state.directRoute;
    showDirectGuide();
    renderRoadmapCard(roadmap, state.directRoute);
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (state.type === "route-result") {
    restoreWizardSelections(state.selections);
    wizard.dataset.step = "result";
    showDirectGuide();
    updateQuestionVisibility();
    if (state.entryPreset === "vacation") {
      renderVacationRoadmap();
    } else {
      renderRoadmap();
    }
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  resetToStart(false);
}

function pickRoute() {
  const personType = getValue("personType");
  const goal = getValue("goal");
  const duration = getValue("duration");
  const familySponsor = getValue("familySponsor");

  if (goal === "vacation" && personType === "eu") return routes.find((route) => route.id === "eu-vacation");
  if (goal === "vacation") return routes.find((route) => route.id === "non-eu-vacation");
  if (duration === "short" && personType === "eu") return routes.find((route) => route.id === "eu-vacation");
  if (duration === "short") return routes.find((route) => route.id === "non-eu-vacation");
  if (goal === "padron" || goal === "digital" || goal === "nie" || goal === "notSure")
    return null;
  if (personType === "eu" && goal === "work") return routes.find((route) => route.id === "eu-working");
  if (personType === "eu") return routes.find((route) => route.id === "eu-registration");
  if (goal === "work") return routes.find((route) => route.id === "work-authorization");
  if (goal === "remote") return routes.find((route) => route.id === "digital-nomad");
  if (goal === "noWork") return routes.find((route) => route.id === "non-lucrative");
  if (goal === "study") return routes.find((route) => route.id === "study");
  if (goal === "family" && familySponsor === "euSpanish") return routes.find((route) => route.id === "eu-family");
  if (goal === "family") return routes.find((route) => route.id === "family");

  return null;
}

function roadmapFor(route) {
  if (!route) return generalRouteResult();
  const localizedRoadmap =
    currentLang === "es"
      ? roadmapDetailsEs[route.id]
      : null;
  const roadmap = localizedRoadmap || roadmapDetails[route.id] || {
    process: route.title,
    difficulty: "Varies",
    timeline: "Depends on your situation",
    steps: route.documents,
    documents: route.documents,
    links: routeFormsAndTaxes[route.id]?.links || []
  };
  return { ...roadmap, route };
}

const nonEuStartingPointRoutes = new Set([
  "non-eu-vacation",
  "work-authorization",
  "digital-nomad",
  "non-lucrative",
  "study",
  "family",
  "eu-family"
]);

function resultDisclaimerFor(roadmap) {
  const routeId = roadmap?.route?.id;
  const nonEuNote = currentLang === "es"
    ? "Esto es solo un punto de partida; tu nacionalidad, consulado, situación familiar y documentos pueden cambiar el proceso exacto."
    : "This is only a starting point; your nationality, consulate, family situation, and documents can change the exact process.";
  return `${t("resultDisclaimer")}${nonEuStartingPointRoutes.has(routeId) ? ` ${nonEuNote}` : ""}`;
}

function resultSectionLabel(key) {
  const labels = {
    purpose: {
      en: "What this is for",
      es: "Para qué sirve"
    },
    forms: {
      en: "Forms and documents",
      es: "Formularios y documentos"
    },
    whenNeeded: {
      en: "When you'll need it",
      es: "Cuándo lo necesitarás"
    },
    whatHappensNext: {
      en: "What happens next",
      es: "Qué pasa después"
    }
  };
  return labels[key]?.[currentLang] || labels[key]?.en || "";
}

function routeVisualFor(routeId = "") {
  const visuals = {
    "eu-vacation": "./assets/topic-scenes/vacation-entry.webp",
    "non-eu-vacation": "./assets/topic-scenes/vacation-entry.webp",
    "eu-registration": "./assets/topic-scenes/live-nie-20260606.webp",
    "eu-working": "./assets/goal-cards/work.webp",
    "nie-only": "./assets/topic-scenes/live-nie-20260606.webp",
    "tie-after-approval": "./assets/topic-scenes/live-tie-20260606.webp",
    "work-authorization": "./assets/goal-cards/work.webp",
    "digital-nomad": "./assets/goal-cards/remote.webp",
    "non-lucrative": "./assets/goal-cards/no-work.webp",
    study: "./assets/goal-cards/study.webp",
    family: "./assets/goal-cards/family.webp",
    "eu-family": "./assets/goal-cards/family.webp",
    padron: "./assets/topic-scenes/live-padron-20260606.webp",
    digital: "./assets/topic-scenes/live-digital-access-20260606.webp",
    nie: "./assets/topic-scenes/live-nie-20260606.webp",
    tie: "./assets/topic-scenes/live-tie-20260606.webp",
    "social-security": "./assets/topic-scenes/live-social-security-20260606.webp",
    "sip-card": "./assets/topic-scenes/live-public-health-20260606.webp",
    "public-health": "./assets/topic-scenes/live-public-health-20260606.webp",
    "private-health": "./assets/topic-scenes/live-private-health-20260606.webp",
    "ehic-card": "./assets/topic-scenes/live-ehic-20260606.webp",
    banking: "./assets/topic-scenes/live-banking-20260606.webp",
    "renting-home": "./assets/topic-scenes/live-renting-home-20260625.webp",
    phone: "./assets/topic-scenes/phone-direct-20260606.webp",
    "job-search": "./assets/topic-scenes/live-job-search-20260606.webp",
    taxes: "./assets/topic-scenes/live-taxes-20260606.webp",
    "driving-licence-exchange": "./assets/topic-scenes/driving-licence-exchange-20260719.webp",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-citizenship": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.webp",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.webp",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.webp",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.webp",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.webp",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.webp",
    "travel-insurance": "./assets/topic-scenes/travel-insurance-20260722.webp",
    "driving-spain-visitors": "./assets/topic-scenes/driving-spain-visitors-20260722.webp",
    "sim-esim-vpn": "./assets/topic-scenes/sim-esim-vpn-20260722.webp"
  };
  return visuals[routeId] || "./assets/home-cards/move-to-spain-matched-20260606.webp";
}

function renderResultIntro(roadmap, explanation, guideId = roadmap?.route?.id || "") {
  const visual = routeVisualFor(roadmap?.route?.id || guideId);
  return `
    <div class="result-hero">
      <div class="result-hero-copy">
        <h3>${roadmap.process}</h3>
        ${explanation ? `
          <section class="result-purpose" aria-label="${resultSectionLabel("purpose")}">
            <strong>${resultSectionLabel("purpose")}</strong>
            <div class="result-purpose-body">${explanation}</div>
          </section>
        ` : ""}
      </div>
      <div class="result-hero-media" aria-hidden="true">
        <img src="${visual}" alt="" />
      </div>
    </div>
  `;
}

function generalRouteResult() {
  const goal = getValue("goal");
  if (goal === "padron") {
    return currentLang === "es" ? {
      process: "Padrón / registro en el ayuntamiento",
      explanation: "Empieza aquí si necesitas registrar tu domicilio en el ayuntamiento.",
      steps: ["Confirma la documentación de tu domicilio.", "Consulta el trámite de tu ayuntamiento.", "Pide el certificado o volante de padrón correcto para trámites posteriores."],
      links: ["padron-info"]
    } : {
      process: "Padrón / town hall registration",
      explanation: "Start here if you need to register your address with your town hall.",
      steps: ["Confirm your address documentation.", "Book or check your town hall process.", "Request the correct padrón certificate for later procedures."],
      links: ["padron-info"]
    };
  }
  if (goal === "digital") {
    return currentLang === "es" ? {
      process: "Cl@ve o certificado digital FNMT",
      explanation: "Empieza aquí si necesitas acceso online a servicios públicos o firma electrónica.",
      steps: ["Decide si necesitas Cl@ve, un certificado digital o ambos.", "Prepara la verificación de identidad.", "Regístrate por el proceso oficial de Cl@ve o FNMT."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    } : {
      process: "Cl@ve or FNMT digital certificate",
      explanation: "Start here if you need online government access or electronic signatures.",
      steps: ["Decide whether you need Cl@ve, a digital certificate, or both.", "Prepare identity verification.", "Register through the official Cl@ve or FNMT process."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    };
  }
  if (goal === "nie") {
    return currentLang === "es" ? {
      process: "Número NIE",
      explanation: "Empieza aquí si necesitas un número de identificación de extranjero para un trámite administrativo, financiero o legal.",
      steps: ["Confirma por qué necesitas el NIE.", "Prepara pasaporte o documento de identidad y la justificación del motivo.", "Revisa el procedimiento oficial de asignación de NIE."],
      links: ["nie", "cita", "790-012"]
    } : {
      process: "NIE number",
      explanation: "Start here if you need a Spanish foreigner identification number for an administrative, financial, or legal transaction.",
      steps: ["Confirm why you need the NIE.", "Prepare passport or identity document and supporting reason.", "Review the official NIE assignment procedure."],
      links: ["nie", "cita", "790-012"]
    };
  }
  return currentLang === "es" ? {
    process: "Resumen general de trámites",
    explanation: "Empieza aquí si todavía no sabes qué ruta se aplica.",
    steps: ["Identifica tu grupo de nacionalidad.", "Confirma si tu estancia supera los 90 días.", "Elige la guía que coincida con el motivo de tu estancia."],
    links: []
  } : {
    process: "General paperwork overview",
    explanation: "Start here if you are not sure which route applies yet.",
    steps: ["Identify your nationality group.", "Confirm whether your stay is over 90 days.", "Choose the guide that matches your purpose of stay."],
    links: []
  };
}

function backButtonLabel() {
  return currentLang === "es"
    ? "Volver"
    : "Back";
}

function currentSectionLabel() {
  if (currentDirectRoute === "living-menu" || currentEntryPreset === "living") return t("livingTitle");
  if (currentDirectRoute === "vacation-menu" || currentEntryPreset === "vacation") return t("vacationTitle");
  return t("movingTitle");
}

// Maps a standalone guide page's id to the breadcrumb section it belongs to.
// Needed because static guide pages (loaded directly via their own URL, not
// through in-app navigation) never go through the menu flow that normally
// sets currentEntryPreset — without this, every guide falls through to the
// "Move to Spain" default in currentSectionLabel(), even ones that only ever
// appear under the Living or Vacation menus.
const guideSectionOverrides = {
  living: [
    "padron", "digital", "nie", "tie", "social-security",
    "sip-card", "private-health", "ehic-card",
    "banking", "renting-home", "job-search", "taxes", "phone", "vida-laboral", "driving-licence-exchange"
  ],
  vacation: [
    "eu-vacation", "non-eu-vacation",
    "vacation-entry", "vacation-citizenship", "vacation-flights", "vacation-ground",
    "vacation-booking", "vacation-hotels", "vacation-tourism", "vacation-reviews",
    "travel-insurance", "driving-spain-visitors", "sim-esim-vpn"
  ]
};

function sectionPresetForGuide(guideId) {
  if (guideSectionOverrides.living.includes(guideId)) return "living";
  if (guideSectionOverrides.vacation.includes(guideId)) return "vacation";
  return null;
}

function renderBackButton(currentLabel = "") {
  const crumbs = [t("startNav"), currentSectionLabel(), currentLabel].filter(Boolean);
  return `
    <div class="result-header-tools">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        ${crumbs.map((crumb) => `<span>${crumb}</span>`).join("<span class=\"breadcrumb-sep\" aria-hidden=\"true\">/</span>")}
      </nav>
      <div class="result-actions">
      <button type="button" class="secondary-action" data-nav-back="true">${backButtonLabel()}</button>
      </div>
    </div>
  `;
}

function previousWizardStep() {
  if (getValue("goal") === "family" && getValue("personType") === "nonEu" && getValue("familySponsor")) {
    return "family";
  }
  if (getValue("goal")) return "goal";
  return "person";
}

function handleBackNavigation() {
  if (navigationStack.length) {
    restoreScreenState(navigationStack.pop());
    return;
  }

  if (currentDirectRoute === "living-menu" || currentDirectRoute === "vacation-menu") {
    resetToStart();
    return;
  }

  if (currentEntryPreset === "living") {
    showDirectGuide();
    renderLivingSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (currentEntryPreset === "vacation") {
    showDirectGuide();
    renderVacationSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (currentEntryPreset === "moving" || (!wizard.hidden && wizard.dataset.step === "result")) {
    showRouteFinder();
    wizard.dataset.step = previousWizardStep();
    updateQuestionVisibility();
    result.hidden = true;
    wizard.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  resetToStart();
}

function renderRoadmap() {
  currentDirectRoute = null;
  const directGoals = ["padron", "digital", "nie"];
  const goal = getValue("goal");
  if (directGoals.includes(goal)) {
    const roadmap = generalRouteResult();
    const explanation = roadmap.explanation || roadmap.timeline || "";
    result.hidden = false;
    result.classList.remove("is-empty");
    result.innerHTML = `
      ${renderBackButton(roadmap.process)}
      ${renderResultIntro(roadmap, explanation, goal)}
      <div class="result-section">
        <strong>${t("nextSteps")}</strong>
        <ol class="roadmap-list">${roadmap.steps.slice(0, 3).map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>
      ${renderRoadmapLinks(roadmap.links)}
      ${renderSafetyWingBlock(goal)}
      <p class="disclaimer">${t("resultDisclaimer")}</p>
    `;
    setCurrentScreenState({
      type: "route-result",
      entryPreset: currentEntryPreset,
      selections: wizardSelectionState(),
      routeId: null
    });
    return;
  }

  const missing = ["personType", "goal"].filter((name) => !getValue(name));
  if (missing.length) {
    result.hidden = false;
    result.classList.add("is-empty");
    result.innerHTML = `
      <h3>${currentLang === "es" ? "Responde primero a las preguntas básicas" : "Answer the basic questions first"}</h3>
      <p>${currentLang === "es" ? "Cuando completes esas elecciones, IberiGo podrá sugerir la ruta general más probable para España." : "Once those choices are selected, IberiGo can suggest the most likely Spain-wide route."}</p>
    `;
    return;
  }

  const route = pickRoute();
  const roadmap = roadmapFor(route);
  const explanation =
    roadmap.explanation ||
    (currentLang === "es"
      ? "Usa esta ruta como punto de partida práctico antes de comprobar las fuentes oficiales."
      : route?.summary || "Use this as a practical starting point before checking official sources.");

  result.hidden = false;
  result.classList.remove("is-empty");
  result.innerHTML = `
    ${renderBackButton(roadmap.process)}
    ${renderResultIntro(roadmap, explanation)}
    <div class="result-section">
      <strong>${t("nextSteps")}</strong>
      <ol class="roadmap-list">${roadmap.steps.slice(0, 3).map((step) => `<li>${step}</li>`).join("")}</ol>
    </div>
    ${renderFormsAndTaxesBlock(route)}
    ${renderRoadmapLinks(roadmap.links, formAndTaxUrls(roadmap.route))}
    ${renderSafetyWingBlock(route?.id)}
    <p class="disclaimer">${resultDisclaimerFor(roadmap)}</p>
  `;
  setCurrentScreenState({
    type: "route-result",
    entryPreset: currentEntryPreset,
    selections: wizardSelectionState(),
    routeId: route?.id || null
  });
}

function renderRoadmapCard(roadmap, guideId = roadmap?.route?.id || currentDirectRoute) {
  const explanation = roadmap.explanation || roadmap.timeline || "";
  result.hidden = false;
  result.classList.remove("is-empty");
  const baked = bakedGuideBlocks.guideId && bakedGuideBlocks.guideId === guideId && bakedGuideBlocks.lang === currentLang
    ? bakedGuideBlocks
    : { intro: "", extra: "" };
  result.innerHTML = `
    ${renderBackButton(roadmap.process)}
    ${baked.intro}
    ${renderResultIntro(roadmap, explanation, guideId)}
    ${renderWorkAuthorizationScopeNotice(roadmap.route?.id || guideId)}
    ${renderDeadlineWarningBlock(roadmap.route?.id || guideId)}
    ${renderNationalityPathBlock(roadmap.route?.id || guideId)}
    <div class="result-section">
      <strong>${t("nextSteps")}</strong>
      <ol class="roadmap-list">${roadmap.steps.slice(0, 3).map((step) => `<li>${step}</li>`).join("")}</ol>
    </div>
    ${renderWhenNeededBlock(roadmap)}
    ${renderFormsAndTaxesBlock(roadmap.route)}
    ${renderWhatHappensNextBlock(roadmap)}
    ${renderRoadmapLinks(roadmap.links, formAndTaxUrls(roadmap.route))}
    ${renderSafetyWingBlock(roadmap.route?.id || guideId)}
    <p class="disclaimer">${resultDisclaimerFor(roadmap)}</p>
    ${baked.extra}
  `;
  setCurrentScreenState(
    roadmap.route
      ? {
          type: "route-result",
          entryPreset: currentEntryPreset,
          selections: wizardSelectionState(),
          routeId: roadmap.route.id
        }
      : {
          type: "direct-guide",
          entryPreset: currentEntryPreset,
          directRoute: guideId
        }
  );
}

function renderVacationRoadmap() {
  const route = getValue("personType") === "eu"
    ? routes.find((item) => item.id === "eu-vacation")
    : routes.find((item) => item.id === "non-eu-vacation");
  const roadmap = roadmapFor(route);
  renderRoadmapCard(roadmap);
  trackUsageEvent(`/guide/${route?.id || "vacation"}`, `Submitted ${route?.id || "vacation"}`);
}

function directRoadmapFor(goal) {
  if (goal === "padron") {
    return currentLang === "es" ? {
      process: "Padrón / registro en el ayuntamiento",
      explanation: "<p><strong>Qué es:</strong> El padrón es el registro de tu domicilio en el ayuntamiento.</p><p><strong>Cuándo puedes necesitarlo:</strong> El certificado o volante de padrón suele pedirse para:</p><ul><li>El <a href=\"/guides/es/tie/\">TIE</a></li><li>Renovaciones de residencia</li><li><a href=\"/moving-to-spain/healthcare/\">Sanidad</a> (en inglés)</li><li>Colegio</li><li>A veces, para <a href=\"/the-spain-files/abrir-cuenta-bancaria-espana/\">abrir una cuenta bancaria</a></li></ul><p><strong>Qué puede pedir la oficina:</strong> Cada municipio decide qué acepta como prueba de domicilio, como contrato de alquiler, escritura, autorización del titular o recibos.</p><p><strong>Nota práctica:</strong> Conviene empadronarte en cuanto tengas una dirección estable, porque te lo pedirán en muchos pasos posteriores.</p><p><strong>Qué no es:</strong> El padrón acredita tu domicilio en el ayuntamiento. No es residencia de extranjería, ni el NIE, ni la TIE.</p><p><strong>Dónde se presenta:</strong> No hay una oficina nacional única. Te empadronas en el ayuntamiento del municipio donde vives de verdad. Ese ayuntamiento decide el formulario, si hace falta cita y qué prueba de domicilio acepta. Pide volante o certificado de empadronamiento si otro trámite lo exige.</p><p><strong>Antes de firmar un alquiler:</strong> Pregunta si el arrendador facilita el empadronamiento y déjalo por escrito. No copies la lista de documentos de otro municipio.</p><p><strong>Ejemplo real:</strong> <a href="/the-spain-files/es/padron-torrevieja/">Empadronamiento en Torrevieja</a> — cita, documentos y plazos reales.</p>",
      steps: ["Reúne pasaporte o documento de identidad y prueba de domicilio.", "Comprueba el proceso de tu ayuntamiento, porque cada municipio organiza el padrón a su manera.", "Pide certificado o volante de padrón si lo necesitas para TIE, residencia, sanidad u otro trámite."],
      links: ["padron-info"]
    } : {
      process: "Padrón / town hall registration",
      explanation: "<p><strong>What it is:</strong> The padrón is your registration with the local town hall (ayuntamiento) confirming your address in Spain.</p><p><strong>When you may need it:</strong> A padrón certificate or volante is commonly requested for:</p><ul><li>Your <a href=\"/guides/tie/\">TIE</a></li><li>Residence renewals</li><li><a href=\"/moving-to-spain/healthcare/\">Healthcare registration</a></li><li>School enrolment</li><li>Often for <a href=\"/the-spain-files/bank-account-spain/\">opening a bank account</a></li></ul><p><strong>What the office may expect:</strong> Each municipality sets its own rules for what counts as proof of address. A rental contract, property deed, owner's authorisation letter, or utility bill are common, but accepted documents vary.</p><p><strong>Practical note:</strong> It's worth registering as soon as you have a settled address — the padrón certificate is requested constantly, and having it ready can save time at later steps.</p><p><strong>What it is not:</strong> Padrón proves your address with the town hall. It is not immigration residence, a NIE, or a TIE.</p><p><strong>Where you file:</strong> There is no single national padrón office. You register at the ayuntamiento of the municipality where you actually live. That town hall decides the form, whether you need an appointment, and which proof of address it accepts. Ask for a volante or certificado de empadronamiento if another procedure needs proof.</p><p><strong>Before you sign a rental contract:</strong> Ask whether the landlord will support empadronamiento and get that in writing. Do not copy another town's document list.</p><p><strong>Worked example:</strong> <a href="/the-spain-files/padron-torrevieja/">Padrón in Torrevieja</a> — appointment channel, documents and real wait times.</p>",
      steps: ["Gather passport or ID and proof of address.", "Check your town hall process, because each municipality handles padrón differently.", "Request a padrón certificate or volante if you need it for TIE, residence, healthcare, or another procedure."],
      links: ["padron-info"]
    };
  }
  if (goal === "digital") {
    return currentLang === "es" ? {
      process: "Cl@ve o certificado digital FNMT",
      explanation: "<p><strong>Qué es:</strong> Gran parte de la administración española funciona online, y para usarla necesitas una identidad digital. Las dos vías principales son el certificado ciudadano FNMT, que se solicita online y se activa tras acreditar tu identidad, y Cl@ve, el sistema público de identificación con PIN o modalidad permanente.</p><p><strong>Para qué sirve:</strong></p><ul><li>Presentar impuestos</li><li>Consultar la Seguridad Social</li><li>Firmar documentos</li><li>Revisar expedientes de residencia</li><li>Acceder a servicios sanitarios o prestaciones</li></ul><p><strong>Nota práctica:</strong> Obtener una de estas opciones pronto puede ahorrar muchas citas presenciales.</p>",
      steps: ["Comprueba si ya tienes NIE y documentación aceptada para acreditar identidad.", "Elige FNMT si necesitas firmar documentos o presentar solicitudes electrónicas.", "Usa Cl@ve si cumples los requisitos de registro y quieres acceso frecuente a sedes públicas."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    } : {
      process: "Cl@ve or FNMT digital certificate",
      explanation: "<p><strong>What it is:</strong> Spain's public administration runs largely online, and you need a digital identity to access it. The two main options are the FNMT citizen certificate (a software certificate issued after an in-person identity check) and Cl@ve (a government identity system with PIN and permanent modes).</p><p><strong>What you can use it for:</strong></p><ul><li>Filing tax returns</li><li>Checking Social Security records</li><li>Signing official documents</li><li>Tracking residence applications</li><li>Accessing health and benefits portals</li></ul><p><strong>Practical note:</strong> Getting one early can save a lot of time — many procedures that seem to need an office visit can often be done digitally once you have it. EU citizens with an electronic national ID card may also be able to use it directly on some portals.</p>",
      steps: ["Check whether you already have a NIE and accepted identity documents.", "Choose FNMT if you need to sign documents or submit official applications online.", "Use Cl@ve if you meet the registration requirements and want regular access to public-service portals."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    };
  }
  if (goal === "nie") {
    return currentLang === "es" ? {
      process: "Número NIE",
      explanation: "<p><strong>Qué es:</strong> El NIE (Número de Identidad de Extranjero) es el número de identificación vitalicio que España asigna a los extranjeros. Se usa para trámites oficiales y financieros como comprar una vivienda, firmar ante notario, abrir una cuenta bancaria, empezar a trabajar o pagar impuestos.</p><p><strong>Qué no es:</strong> El NIE es solo un número — no es una tarjeta ni un permiso de residencia. Tener un NIE no da derecho a vivir ni a trabajar en España.</p><p><strong>Cuándo puedes necesitarlo:</strong></p><ul><li>Comprar una vivienda</li><li>Firmar un acto notarial</li><li>Abrir una cuenta bancaria</li><li>Empezar a trabajar</li><li>Pagar impuestos</li></ul><p><strong>Qué puede pedir la oficina:</strong> La policía suele exigir un motivo concreto y documentado para asignarlo — una compra inmobiliaria, un contrato de trabajo, un acto notarial, un requisito bancario o una obligación fiscal — no simplemente quererlo por si acaso.</p><p><strong>Nota práctica:</strong> La disponibilidad de citas varía mucho según la provincia. En zonas costeras concurridas como la Costa Blanca pueden aparecer huecos de forma imprevisible, así que puede ayudar comprobar a primera hora de la mañana y los fines de semana. Muchas personas también se empadronan (<a href=\"/guides/es/padron/\">padrón</a>) por las mismas fechas, porque el certificado de empadronamiento suele pedirse para trámites bancarios, sanitarios y de residencia posteriores al NIE.</p><p><strong>Plazos orientativos:</strong> Si acudes con la documentación en regla, el número suele asignarse el mismo día, pero esto puede variar según la oficina.</p><p><strong>Desde fuera o con representante:</strong> Fuera de España, un consulado español puede tramitar el EX-15. Si presenta otra persona, lleva una autorización de representación. La guía más larga, con experiencia de primera mano, está en <a href="/the-spain-files/como-obtener-nie-en-espana/">Cómo conseguir un NIE en España</a>.</p>",
      steps: ["Escribe o reúne la prueba del motivo: banco, compra, notaría, trabajo, impuestos u otro trámite concreto.", "Prepara pasaporte o documento de identidad y copias si las piden.", "Pide la cita o revisa el trámite oficial de asignación de NIE y la tasa 790-012."],
      links: ["nie", "cita", "790-012"],
      route: { id: "nie" }
    } : {
      process: "NIE number",
      explanation: "<p><strong>What it is:</strong> The NIE (Número de Identidad de Extranjero) is Spain's lifetime identification number for foreigners. It is used for official and financial transactions such as buying property, signing before a notary, opening a bank account, starting work, or paying tax.</p><p><strong>What it is not:</strong> A NIE is just a number — not a card and not a residence permit. Having a NIE does not give you the right to live or work in Spain.</p><p><strong>When you may need it:</strong></p><ul><li>Buying property</li><li>Signing a notarial deed</li><li>Opening a bank account</li><li>Starting work</li><li>Paying tax</li></ul><p><strong>What the office may expect:</strong> Police offices usually expect a concrete, documented reason to assign one — a property purchase, employment contract, notarial act, bank requirement, or tax obligation — not just wanting it in case it is useful later.</p><p><strong>Practical note:</strong> Appointment availability varies sharply by province. In busy coastal areas like the Costa Blanca, slots can appear unpredictably, so it can help to check early in the morning and at weekends. Many people also register on the <a href=\"/guides/padron/\">padrón</a> around the same time, since a padrón certificate is commonly requested for banking, healthcare, and residence procedures that follow the NIE.</p><p><strong>Timing:</strong> If your paperwork is accepted, the number is often assigned the same day, but this can vary by office.</p><p><strong>Filing from abroad or through someone else:</strong> Outside Spain, a Spanish consulate can take the EX-15 request. If someone files for you, bring a representative authorisation. For the longer first-hand walkthrough, see <a href="/the-spain-files/nie-spain/">How to get a NIE in Spain</a>.</p>",
      steps: ["Write or gather proof of the reason: bank, purchase, notary, work, tax, or another concrete procedure.", "Prepare passport or identity document and copies if requested.", "Book the appointment or review the official NIE assignment procedure and 790-012 fee."],
      links: ["nie", "cita", "790-012"],
      route: { id: "nie" }
    };
  }
  if (goal === "tie") {
    return currentLang === "es" ? {
      process: "Tarjeta TIE después de aprobar el visado",
      explanation: "Después de elegir TIE, confirma primero que ya existe una concesión, visado o resolución favorable. La TIE no concede la residencia por sí sola; documenta una autorización ya aprobada. Reserva “POLICÍA - TOMA DE HUELLAS” (huellas / expedición de tarjeta), no una cita de NIE. La línea de primera tarjeta en el Modelo 790-012 es 16,08 EUR; confirma el importe vigente antes de pagar. La tarjeta suele estar lista unas semanas después de las huellas. Presenta dentro del plazo de tu resolución: perder ese plazo es un riesgo real y el plazo exacto depende del tipo de autorización.",
      steps: ["Comprueba que tienes visado, resolución favorable o autorización que permite pedir la tarjeta.", "Completa EX-17 y paga la tasa 790-012 de expedición de tarjeta.", "Reserva cita de huellas o expedición de tarjeta y lleva pasaporte, foto, aprobación, tasa pagada y padrón si tu domicilio debe constar."],
      links: ["tie-form", "cita", "790-012"]
    } : {
      process: "TIE card after VISA approval",
      explanation: "After choosing TIE, first confirm that a visa, authorization, or favorable decision already exists. The TIE does not grant residence by itself; it documents permission that was already approved. Book “POLICÍA - TOMA DE HUELLAS” (fingerprint / card issue), not an NIE appointment. The first-card line on Modelo 790-012 is 16.08 EUR — confirm the current amount before you pay. The card is often ready a few weeks after fingerprints. File inside the deadline on your resolution; missing that window is a real risk and the exact deadline depends on the authorization type.",
      steps: ["Check that you have the visa, favorable resolution, or authorization that lets you request the card.", "Complete EX-17 and pay the matching 790-012 card fee.", "Book the fingerprint/card appointment and bring passport, photo, approval, paid fee, and padrón if your address must be shown."],
      links: ["tie-form", "cita", "790-012"]
    };
  }
  if (goal === "social-security") {
    return currentLang === "es" ? {
      process: "Número de la Seguridad Social",
      explanation: "<p><strong>Qué es:</strong> El número de la Seguridad Social, también llamado NUSS o número de afiliación, se asigna cuando empiezas a trabajar por cuenta ajena o por cuenta propia en España, o cuando te das de alta como autónomo.</p><p><strong>Qué no es:</strong> Es distinto del NIE, aunque para trabajar normalmente necesitarás ambos.</p><p><strong>Con qué se relaciona:</strong> El número te acompaña de por vida y vincula tus cotizaciones con pensión, desempleo, baja laboral y derecho a asistencia sanitaria.</p><p><strong>Nota práctica:</strong> Si trabajas por cuenta ajena, el empleador suele gestionarlo. Si lo necesitas antes o por otro trámite, puedes solicitarlo directamente online en la Seguridad Social si puedes identificarte, por ejemplo con certificado digital.</p>",
      steps: ["Confirma si lo necesitas por empleo, autónomo u otro trámite oficial.", "Prepara documentos de identidad y NIE/TIE o datos del pasaporte si los piden.", "Si tienes certificado digital, úsalo para identificarte y solicitar el NUSS online en la Seguridad Social.", "Si no puedes identificarte online, pregunta a tu empleador si se encarga del alta o revisa las alternativas oficiales."],
      links: ["social-security-number"]
    } : {
      process: "Social Security number",
      explanation: "<p><strong>What it is:</strong> Your Social Security number, often shown as NUSS or número de afiliación a la Seguridad Social, is assigned when you start employed or self-employed work in Spain, or when you register as an autónomo.</p><p><strong>What it is not:</strong> It is separate from your NIE, though both are usually needed for employment.</p><p><strong>What it connects to:</strong> The number stays with you for life and links your contributions to your future pension, unemployment benefits, sick pay, and healthcare entitlement.</p><p><strong>Practical note:</strong> If you are employed, your employer typically requests it. If you need it earlier or for another procedure, you can request it directly online through Social Security if you can identify yourself, including with a digital certificate.</p>",
      steps: ["Confirm whether you need it for employment, self-employment, or another official procedure.", "Prepare identity documents and NIE/TIE or passport details if requested.", "If you have a digital certificate, use it to identify yourself and request the NUSS online through Social Security.", "If you cannot identify yourself online, ask your employer whether they are handling registration or check the official alternatives."],
      links: ["social-security-number"]
    };
  }
  if (goal === "sip-card") {
    return currentLang === "es" ? {
      process: "Tarjeta sanitaria pública",
      explanation: "<p><strong>Qué es:</strong> La tarjeta sanitaria pública te da acceso al sistema sanitario público español. Se llama SIP en la Comunidad Valenciana, TSI en Cataluña y tiene otros nombres según la comunidad autónoma, pero su función es la misma.</p><p><strong>Cuándo puedes necesitarla:</strong> Normalmente necesitas padrón y derecho reconocido a asistencia sanitaria, ya sea por Seguridad Social, residencia o situación que te dé cobertura.</p><p><strong>Para qué se usa:</strong> Se usa en tu centro de salud para médico de cabecera, derivaciones, recetas y atención dentro del sistema público.</p>",
      steps: ["Comprueba si tu derecho a asistencia sanitaria ya está reconocido automáticamente o si debes solicitar el alta en asistencia sanitaria en España.", "Nombres que puedes ver según la región: Comunitat Valenciana (SIP), Madrid (Tarjeta Sanitaria Individual), Andalucía (Tarjeta sanitaria), Cataluña (TSI) y Murcia (Tarjeta Sanitaria Individual).", "Lleva identidad, NIE/TIE si ya lo tienes, padrón o prueba de domicilio y cualquier documento de aseguramiento o Seguridad Social que te pidan.", "Si además necesitas cobertura privada para un permiso o por elección propia, usa la guía separada de seguro médico privado."],
      links: ["healthcare-right-spain", "valencia-health-card", "madrid-health-card", "andalucia-health-card", "cataluna-health-card", "murcia-health-card"]
    } : {
      process: "Public health card",
      explanation: "<p><strong>What it is:</strong> The public health card gives you access to Spain's public healthcare system. It is called SIP in Valencia, TSI in Catalonia, and has different names in each autonomous community, but the function is the same.</p><p><strong>When you may need it:</strong> You typically need to be registered on the padrón and have a Social Security affiliation or qualifying residence status. EU citizens registered as residents and their family members are generally entitled to it; non-EU residents with a work or residence authorization usually qualify once they have padrón and Social Security registration.</p><p><strong>What you use it for:</strong> Present it at your assigned health centre (centro de salud) for GP appointments, referrals, prescriptions, and emergency care.</p>",
      steps: ["Check whether your right to public healthcare is already recognized automatically or whether you need to request healthcare registration in Spain.", "Card names you may see by region: Valencian Community (SIP card), Madrid (Tarjeta Sanitaria Individual), Andalusia (Tarjeta sanitaria), Catalonia (TSI), and Murcia (Tarjeta Sanitaria Individual).", "Bring identity documents, NIE/TIE if you have it, padrón or address proof, and any Social Security or healthcare-entitlement documents requested.", "If you also need private cover for a permit or by personal choice, use the separate private health insurance guide."],
      links: ["healthcare-right-spain", "valencia-health-card", "madrid-health-card", "andalucia-health-card", "cataluna-health-card", "murcia-health-card"]
    };
  }
  if (goal === "private-health") {
    return currentLang === "es" ? {
      process: "Seguro médico privado",
      explanation: "<p><strong>Qué es:</strong> Un seguro médico privado que te cubre en España, con aseguradoras como Sanitas, Adeslas, Asisa o DKV.</p><p><strong>Cuándo puedes necesitarlo:</strong> Suele ser necesario en ciertas solicitudes de visado o residencia, como residencia no lucrativa, estancia por estudios o nómada digital, normalmente con una póliza sin copagos y con cobertura amplia.</p><p><strong>Otros motivos habituales:</strong> Acceso más rápido a especialistas, médicos que atienden en otros idiomas o centros privados.</p><p><strong>Nota práctica:</strong> Compara carencias, exclusiones, copagos, red médica y cobertura territorial antes de contratar.</p>",
      steps: ["Confirma primero si lo necesitas para un permiso concreto, para tiempos de espera más cortos o simplemente como cobertura adicional.", "Revisa si el trámite que te interesa pide una póliza sin copagos, con cobertura completa o con requisitos concretos.", "Compara varias aseguradoras grandes antes de contratar y revisa bien red médica, carencias, copagos y cobertura territorial."],
      links: ["insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre"]
    } : {
      process: "Private health insurance",
      explanation: "<p><strong>What it is:</strong> Private health insurance that covers you in Spain, offered by providers such as Sanitas, Adeslas, Asisa, and DKV.</p><p><strong>When you may need it:</strong> It is required for certain visa and residence applications — the non-lucrative visa, study authorization, and digital nomad visa all typically require it, usually with no copayments and no exclusions for pre-existing conditions.</p><p><strong>Other reasons people choose it:</strong> Faster specialist access, English-speaking doctors, and coverage in private hospitals.</p><p><strong>Practical note:</strong> Costs vary significantly by age, coverage level, and provider. Compare carefully and read the exclusions before signing, especially if the policy is for a visa application where the consulate checks the terms.</p>",
      steps: ["First confirm whether you need it for a specific permit, for shorter waiting times, or simply as extra cover by choice.", "Check whether the route you care about asks for no co-payments, full coverage, or other specific policy conditions.", "Compare several major insurers before buying and review network size, waiting periods, co-payments, and territorial coverage carefully."],
      links: ["insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre"]
    };
  }
  if (goal === "ehic-card") {
    return currentLang === "es" ? {
      process: "Tarjeta Sanitaria Europea",
      explanation: "<p><strong>Qué es:</strong> La Tarjeta Sanitaria Europea sirve para recibir asistencia sanitaria pública necesaria durante estancias temporales en otros países de la UE/EEE, Suiza y Reino Unido, en las condiciones del país donde estés.</p><p><strong>Qué no es:</strong> No sustituye un seguro de viaje y no cubre tratamiento privado, repatriación ni una mudanza a otro país.</p><p><strong>Nota práctica:</strong> Si resides en España y tienes derecho activo a la sanidad pública española, puedes solicitarla por la Seguridad Social española.</p><p><strong>Plazos orientativos:</strong> Revisa siempre la fecha de validez porque caduca.</p>",
      steps: ["Confirma que tienes derecho a asistencia sanitaria en España antes de solicitarla.", "Pide o renueva la TSE por el canal oficial de la Seguridad Social y revisa si la necesitas para ti o también para tus beneficiarios.", "Si viajas pronto y la tarjeta no llega a tiempo, comprueba si necesitas el Certificado Provisional Sustitutorio."],
      links: ["ehic-card", "healthcare-right-spain"]
    } : {
      process: "European Health Insurance Card",
      explanation: "<p><strong>What it is:</strong> The European Health Insurance Card (EHIC) — or its successor the GHIC for UK citizens — gives you access to medically necessary public healthcare during temporary stays in other European countries, at the same cost as local residents.</p><p><strong>What it is not:</strong> It is not a substitute for travel insurance and does not cover private treatment, repatriation, or non-emergency care.</p><p><strong>Practical note:</strong> It is issued by your home country's health authority, not Spain. If you already live in Spain and are registered for Spanish public healthcare, your Spanish SIP/TSI card covers you here; your home-country EHIC covers temporary visits elsewhere in Europe.</p><p><strong>Timing:</strong> Check the validity date — cards expire and need to be renewed.</p>",
      steps: ["Confirm that your right to healthcare in Spain is active before requesting it.", "Request or renew the EHIC through the official Social Security route and check whether you need it only for yourself or also for your dependants.", "If you are travelling very soon and the card may not arrive in time, check whether you need a Provisional Replacement Certificate instead."],
      links: ["ehic-card", "healthcare-right-spain"]
    };
  }
  if (goal === "banking") {
    return currentLang === "es" ? {
      process: "Cuenta bancaria y banca básica",
      explanation: "<p><strong>Empieza aquí:</strong> La guía práctica, con un ejemplo real de sucursal, es <a href=\"/the-spain-files/abrir-cuenta-bancaria-espana/\">Abrir una cuenta bancaria en España</a>.</p><p><strong>Qué suelen pedir:</strong> pasaporte o documento, NIE o TIE si ya lo tienes, padrón u otra prueba de domicilio, y justificante de ingresos o empleo. A veces se puede abrir una cuenta de no residente, con más límites.</p><p><strong>Apps del día a día:</strong> Revolut y Wise sirven para pagos cotidianos, pero puede que no valgan si el casero o la empresa exigen un IBAN español. Pregunta antes de comprometerte.</p>",
      steps: ["Lee la guía de The Spain Files para la documentación, las comisiones y qué revisar antes de firmar.", "Decide si necesitas cuenta de residente, de no residente o solo un IBAN europeo para el día a día.", "Lleva pasaporte, NIE/TIE si lo tienes y prueba de domicilio al banco que elijas."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq", "bank-wise"]
    } : {
      process: "Bank account and banking basics",
      explanation: "<p><strong>Start here:</strong> The practical guide, including a real branch example, is <a href=\"/the-spain-files/bank-account-spain/\">Opening a bank account in Spain</a>.</p><p><strong>What banks often ask for:</strong> passport or ID, NIE or TIE if you already have one, padrón or another address proof, and income or employment evidence. Non-residents can sometimes open a more limited non-resident account.</p><p><strong>Everyday apps:</strong> Revolut and Wise are useful for day-to-day payments, but they may not satisfy a landlord or employer who wants a Spanish IBAN. Ask before you commit, especially in expat-heavy towns where some branches work in English.</p>",
      steps: ["Read the Spain File for the document pack, fees and what to check before you sign.", "Decide whether you need a resident account, a non-resident account, or only an everyday EU IBAN for now.", "Take passport, NIE/TIE if you have it, and address proof to the bank you choose."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq", "bank-wise"]
    };
  }
  if (goal === "renting-home") {
    return currentLang === "es" ? {
      process: "Alquilar una vivienda en España",
      explanation: "<p><strong>Para qué sirve:</strong> Alquilar en España suele empezar por entender qué tipo de contrato necesitas, preparar documentos que demuestren quién eres y que puedes pagar, y revisar bien las condiciones antes de enviar dinero.</p><p><strong>Qué no es:</strong> No es lo mismo una vivienda habitual de larga duración que un alquiler temporal o turístico.</p><p><strong>Nota práctica:</strong> Un contrato de alquiler también puede ayudarte después con el padrón, si el ayuntamiento lo acepta como prueba de domicilio.</p>",
      steps: [
        "Decide si necesitas vivienda habitual de larga duración, alquiler temporal o alojamiento turístico.",
        "Prepara pasaporte o documento de identidad, NIE/TIE si ya lo tienes, justificantes de ingresos o fondos, contrato laboral o nóminas, y cuenta bancaria si la tienes.",
        "Compara zonas, portales y agencias, visita la vivienda cuando sea posible y confirma siempre a quién pagas.",
        "Antes de firmar, revisa tipo de contrato, fianza, garantías adicionales, suministros, inventario, fotos y si la dirección sirve para padrón."
      ],
      links: ["rent-law-boe", "rent-idealista", "rent-fotocasa", "rent-habitaclia"],
      route: { id: "renting-home" },
      whatHappensNext: "Después de firmar, guarda el contrato, recibos de pago, inventario o fotos, y datos del propietario o agencia. Luego puedes organizar padrón, suministros, internet y domiciliaciones bancarias."
    } : {
      process: "Renting a home in Spain",
      explanation: "<p><strong>What it is for:</strong> Renting in Spain usually starts with understanding what type of contract you need, preparing documents that prove who you are and that you can pay, and checking the terms before sending money.</p><p><strong>What it is not:</strong> A long-term main-home rental, a seasonal or temporary rental, and tourist accommodation are different things — check which one you actually need.</p><p><strong>Practical note:</strong> A rental contract can also help later with padrón, if the town hall accepts it as proof of address.</p>",
      steps: [
        "Decide whether you need a long-term main home, a seasonal or temporary rental, or short tourist accommodation.",
        "Prepare passport or ID, NIE/TIE if you have it, proof of income or funds, work contract or payslips, and a bank account if available.",
        "Compare areas, portals, and agencies, visit the property where possible, and always confirm who you are paying.",
        "Before signing, review the contract type, deposit, extra guarantees, utilities, inventory, photos, and whether the address can be used for padrón."
      ],
      links: ["rent-law-boe", "rent-idealista", "rent-fotocasa", "rent-habitaclia"],
      route: { id: "renting-home" },
      whatHappensNext: "After signing, keep the contract, payment receipts, inventory or photos, and landlord or agency details. Then you can organize padrón, utilities, internet, and bank direct debits."
    };
  }
  if (goal === "job-search") {
    return currentLang === "es" ? {
      process: "Buscar trabajo en España",
      explanation: "<p><strong>Para qué sirve:</strong> Buscar trabajo en España suele combinar servicios públicos, portales generalistas, plataformas especializadas y contactos profesionales.</p><p><strong>Derecho a trabajar:</strong> Comprueba primero qué reglas se aplican a tu situación. Si eres ciudadano de la UE, el EEE o Suiza, consulta la <a href=\"/guides/es/eu-registration/\">guía para trabajar como ciudadano de la UE</a>. Si no lo eres, empieza por la <a href=\"/guides/es/work-authorization/\">guía de autorización de trabajo para ciudadanos no comunitarios</a>. Encontrar una oferta no concede por sí solo permiso para trabajar.</p><p><strong>Cómo buscar:</strong> Usa Empléate, los servicios públicos autonómicos y EURES junto con portales privados. Las ofertas pueden repetirse, pero cada plataforma tiene filtros, sectores y formas de candidatura distintos.</p><p><strong>Nota práctica:</strong> El español amplía las opciones fuera de empresas internacionales y puestos que buscan expresamente otros idiomas.</p>",
      steps: ["Define si buscas empleo local, trabajo estacional, un puesto remoto que puedas desempeñar legalmente desde España o un sector concreto.", "Prepara un CV adaptado al puesto, datos de contacto actualizados y la documentación básica que pueda pedir el empleador.", "Empieza por Empléate, los servicios públicos de empleo y EURES; después amplía con portales generalistas y especializados, crea alertas útiles y usa el canal de candidatura que indique cada oferta."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo", "jobs-englishjobs", "jobs-language-assistants"]
    } : {
      process: "Job search in Spain",
      explanation: "<p><strong>What it is for:</strong> Finding work in Spain usually means combining public employment services, general job boards, specialist platforms, and professional contacts.</p><p><strong>Right to work:</strong> First check which rules apply to you. EU, EEA, and Swiss citizens can use the <a href=\"/guides/eu-registration/\">EU working guide</a>; non-EU citizens should start with the <a href=\"/guides/work-authorization/\">non-EU work authorization guide</a>. Finding a vacancy does not itself grant permission to work.</p><p><strong>How to search:</strong> Use Empléate, regional public employment services, and EURES alongside private platforms. Listings may overlap, but each service has different filters, sectors, and application routes.</p><p><strong>Practical note:</strong> Spanish expands your options outside international employers and roles that specifically need another language.</p>",
      steps: ["Decide whether you want local work, seasonal work, a remote role you can legally perform from Spain, or a specific sector.", "Prepare a role-focused CV, current contact details, and the basic documents an employer may request.", "Start with Empléate, public employment services, and EURES; then widen the search through general and specialist platforms, set useful alerts, and use the application channel named in each listing."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo", "jobs-englishjobs", "jobs-language-assistants"]
    };
  }
  if (goal === "taxes") {
    return currentLang === "es" ? {
      process: "Impuestos y domicilio fiscal",
      explanation: "<p><strong>Qué es:</strong> Si eres residente fiscal en España, normalmente por pasar más de 183 días al año en el país u otros criterios de residencia, puedes tener que declarar tu renta ante la Agencia Tributaria.</p><p><strong>Qué no es:</strong> La residencia fiscal puede implicar declarar ingresos mundiales, no solo ingresos españoles, y es una cuestión distinta de la residencia de inmigración.</p><p><strong>Nota práctica:</strong> Tu domicilio fiscal debe reflejar dónde vives realmente y se puede revisar o actualizar en la sede de la Agencia Tributaria.</p><p><strong>Vale la pena revisar:</strong> También hay regímenes especiales para algunos nuevos residentes, como la llamada Ley Beckham, que conviene revisar si acabas de mudarte.</p>",
      steps: ["Aclara si tu necesidad es solo identificación fiscal, cambio de domicilio fiscal, alta de autónomo o gestión de declaraciones.", "Comprueba qué dirección y datos personales figuran para ti en los servicios oficiales antes de usar notificaciones o trámites online.", "Usa la sede oficial de la Agencia Tributaria para revisar tus datos, certificados y procedimientos relacionados con impuestos."],
      links: ["tax-agency", "tax-census"]
    } : {
      process: "Taxes and tax address",
      explanation: "<p><strong>What it is:</strong> Once you are a tax resident in Spain — which generally means spending more than 183 days per year in the country — you must file an annual income tax return (declaración de la renta, IRPF) with the Agencia Tributaria.</p><p><strong>What it is not:</strong> Tax residency is a separate question from immigration residency, and tax residents are generally taxed on worldwide income, not just Spanish income.</p><p><strong>Practical note:</strong> Your tax address (domicilio fiscal) should reflect where you actually live, and you can update it through the Tax Agency's online portal or in person. The annual filing window is typically April to June for the previous year.</p><p><strong>Worth checking:</strong> Spain also has specific rules for some new residents under the Beckham Law (ley Impatriados), which can allow taxation only on Spanish-source income for up to six years — worth checking if you recently moved to Spain.</p>",
      steps: ["Clarify whether you only need tax identification, a tax-address update, self-employment registration, or help with declarations.", "Check what address and personal details are recorded for you in official services before using online notices or procedures.", "Use the official Tax Agency portal to review your data, certificates, and tax-related procedures."],
      links: ["tax-agency", "tax-census"]
    };
  }
  if (goal === "phone") {
    return currentLang === "es" ? {
      process: "Número de teléfono e internet",
      explanation: "<p><strong>Para qué sirve:</strong> Tener un número español suele ser de lo primero que conviene organizar al llegar. Lo necesitarás para banca, códigos SMS, citas, verificaciones y algunos servicios públicos.</p><p><strong>Dónde conseguirlo:</strong> Las operadoras grandes incluyen Movistar, Vodafone y Orange, y también hay opciones más flexibles o de menor coste como DIGI, O2 o Yoigo.</p><p><strong>Qué puede pedir la operadora:</strong> Para contratar una línea pueden pedir pasaporte, NIE o TIE, porque las líneas anónimas no son la norma legal.</p><p><strong>Nota práctica:</strong> Para internet en casa, la fibra está muy extendida, pero conviene revisar cobertura, permanencia y condiciones antes de firmar.</p>",
      steps: ["Define si buscas una solución temporal de llegada o una línea estable para vivir en España.", "Prepara pasaporte o NIE/TIE, porque algunas operadoras pueden pedir identificación al contratar o portar un número.", "Antes de elegir tarifa, revisa cobertura en tu zona, permanencia, internet en casa y si necesitas recibir códigos para banca y sedes online.", "Compara primero grandes operadores y opciones más flexibles antes de contratar móvil, fibra o un paquete conjunto."],
      links: ["provider-movistar", "provider-vodafone", "provider-orange", "provider-digi", "provider-o2", "provider-yoigo"]
    } : {
      process: "Phone number and internet",
      explanation: "<p><strong>What it is for:</strong> Getting a Spanish SIM is often one of the first things to sort on arrival — a working Spanish number is commonly needed for bank verification, government SMS codes, appointment confirmations, and Cl@ve PIN registration.</p><p><strong>Where to get one:</strong> Major operators are Movistar, Vodafone, Orange, and MásMóvil; low-cost MVNOs like Simyo, Digi, and Lebara offer good value on the same networks. Prepay SIMs are available in supermarkets, phone shops, and operator stores.</p><p><strong>What the office may expect:</strong> You need your passport or NIE to register a SIM — anonymous SIMs are not legal in Spain.</p><p><strong>Practical note:</strong> For home broadband, fibre coverage in Spain is extensive, and contracts are typically around 12 months — check coverage and terms before signing.</p>",
      steps: ["Decide whether you need a temporary arrival solution or a stable line for living in Spain.", "Prepare passport or NIE/TIE, because some providers may ask for identification when opening a contract or porting a number.", "Before choosing a plan, check coverage in your area, contract length, home internet options, and whether you need reliable SMS codes for banking or public portals.", "Compare the larger operators and the more flexible options before choosing mobile, fibre, or a bundled package."],
      links: ["provider-movistar", "provider-vodafone", "provider-orange", "provider-digi", "provider-o2", "provider-yoigo"]
    };
  }
  if (goal === "vida-laboral") {
    return currentLang === "es" ? {
      process: "Vida laboral (Informe de Vida Laboral)",
      explanation: "<p><strong>Qué es:</strong> El Informe de Vida Laboral es un documento oficial emitido por la Seguridad Social que muestra tu historial completo de empleo registrado en el sistema español: cada trabajo, periodo de autónomo, desempleo o laguna de cotización desde tu primera alta hasta hoy.</p><p><strong>Qué no es:</strong> No es algo que se solicita una vez y se conserva; lo pides de nuevo cada vez que lo necesitas, y refleja tu situación solo hasta esa fecha exacta.</p><p><strong>Nota práctica:</strong> Es gratuito y normalmente se obtiene al instante online.</p>",
      steps: [
        "Configura tu PIN Cl@ve o consigue tu <a href=\"/guides/es/digital/\">certificado digital</a> si todavía no lo tienes — lo necesitarás para pedirlo online.",
        "Entra en sede.seg-social.gob.es y descarga tu informe al instante.",
        "Si no puedes acceder online, llama al 901 50 20 50 o acude a tu oficina del INSS más cercana con tu NIE y documento de identidad."
      ],
      whenNeeded: [
        "Solicitud de nacionalidad española",
        "Renovación de visado de residencia no lucrativa o de trabajo",
        "Apertura de cuenta bancaria o solicitud de hipoteca",
        "Solicitud de prestación por desempleo (paro)",
        "Renovación de permiso de trabajo",
        "Gestoría o abogado que tramite tu expediente de residencia"
      ],
      links: ["vida-laboral-official", "clave-setup"]
    } : {
      process: "Vida laboral (Informe de Vida Laboral)",
      explanation: "<p><strong>What it is:</strong> The Informe de Vida Laboral is an official document issued by Spain's Social Security (Seguridad Social) showing your complete employment history registered in the Spanish system — every job, period of self-employment, unemployment, or contribution gap from your first registration to today.</p><p><strong>What it is not:</strong> It is not something you apply for once and keep — you request it fresh each time it's needed, and it reflects your situation only up to that exact date.</p><p><strong>Practical note:</strong> It is free to obtain and usually available instantly online.</p>",
      steps: [
        "Set up your Cl@ve PIN or get your <a href=\"/guides/digital/\">digital certificate</a> if you haven't already — you'll need one to get it online.",
        "Log in to sede.seg-social.gob.es and download your informe instantly.",
        "If you can't access it online, call 901 50 20 50 or visit your nearest INSS office with your NIE and ID."
      ],
      whenNeeded: [
        "Spanish nationality application",
        "Non-lucrative or work visa renewal",
        "Bank account or mortgage application",
        "Unemployment benefit (paro) claim",
        "Work permit renewal",
        "Any gestoria or lawyer handling residency paperwork"
      ],
      links: ["vida-laboral-official", "clave-setup"]
    };
  }
  if (goal === "driving-licence-exchange") {
    return currentLang === "es" ? {
      process: "Canjear tu permiso de conducir en España",
      explanation: "<p><strong>Qué es:</strong> Si vives en España, en algún momento tendrás que canjear tu permiso de conducir extranjero por uno español.</p><p><strong>De qué depende:</strong> Cuándo y cómo depende de dónde se expidió tu permiso.</p><ul><li>Los ciudadanos de la UE pueden seguir conduciendo con su permiso de origen casi indefinidamente, pero deben canjearlo si caduca o tiene una validez muy larga.</li><li>La mayoría de las personas no comunitarias tienen un plazo estricto de 6 meses desde que son residentes legales antes de que su permiso extranjero deje de ser válido.</li></ul>",
      steps: [
        "Comprueba si tu país tiene un acuerdo bilateral con España en sede.dgt.gob.es — esto determina qué vía te corresponde.",
        "Reserva tu cita previa en sede.dgt.gob.es → Trámites → Canje de permisos, eligiendo tu Jefatura Provincial de Tráfico más cercana. Reserva cuanto antes — las citas se agotan rápido. Muchos trámites también se pueden gestionar online con <a href=\"/guides/es/digital/\">certificado digital o Cl@ve</a>.",
        "Consigue tu informe de aptitud psicofísica en un Centro de Reconocimiento de Conductores autorizado — válido 90 días, cuesta aproximadamente 30-50 €."
      ],
      links: ["dgt-licence-exchange", "dgt-bilateral-agreements"],
      route: { id: "driving-licence-exchange" },
      whatHappensNext: "En tu cita, la DGT se queda con tu permiso original y te entrega un permiso provisional de papel para conducir hasta que llegue tu permiso español. La tramitación suele tardar entre 1 y 3 meses. Tu permiso original se devuelve a la autoridad que lo expidió en tu país de origen — no lo recuperarás."
    } : {
      process: "Exchange your driving licence in Spain",
      explanation: "<p><strong>What it is:</strong> If you live in Spain, at some point you'll usually need to exchange your foreign driving licence for a Spanish one.</p><p><strong>What it depends on:</strong> When that is — and how — depends on where your licence was issued.</p><ul><li>EU citizens can generally keep driving on their home licence for a long time, but must exchange it if it expires or has a very long validity.</li><li>Most non-EU citizens have a strict window — often around 6 months — from the date they become legally resident before their foreign licence stops being valid.</li></ul>",
      steps: [
        "Check whether your country has a bilateral agreement with Spain at sede.dgt.gob.es — this determines which path applies to you.",
        "Book your cita previa at sede.dgt.gob.es → Trámites → Canje de permisos, selecting your nearest Jefatura Provincial de Tráfico. Book as early as possible — slots fill quickly. Many procedures can also be managed online with a <a href=\"/guides/digital/\">digital certificate or Cl@ve</a>.",
        "Get your medical aptitude report (informe de aptitud psicofísica) from an authorised Centro de Reconocimiento de Conductores — valid for 90 days, costs approximately €30-€50."
      ],
      links: ["dgt-licence-exchange", "dgt-bilateral-agreements"],
      route: { id: "driving-licence-exchange" },
      whatHappensNext: "At your appointment the DGT takes your original licence and issues a provisional paper permit to drive on until your Spanish licence arrives. Processing typically takes 1-3 months. Your original licence is sent back to the issuing authority in your home country — you won't get it back."
    };
  }
  if (goal === "vacation-entry") {
    return currentLang === "es" ? {
      process: "Reglas de entrada y estancia corta",
      explanation: "La entrada a España depende de tu pasaporte. Los ciudadanos de la UE, EEE y Suiza pueden entrar con pasaporte o documento nacional de identidad válido. Muchas nacionalidades no comunitarias —incluidos pasaportes exentos de visado como Estados Unidos, Reino Unido, Canadá y Australia— pueden entrar sin visado hasta 90 días en cualquier periodo de 180 días dentro de todo el espacio Schengen, no solo España. Otras nacionalidades necesitan un visado Schengen en un consulado español antes de viajar. En la frontera pueden pedirte alojamiento, viaje de vuelta o continuación, y medios suficientes. Desde abril de 2026 está en vigor el Sistema de Entradas y Salidas (EES): a los viajeros no comunitarios se les registran las huellas y una foto en la frontera en la primera entrada en lugar de sellar el pasaporte, y el sistema controla automáticamente la regla de 90/180 — los ciudadanos de la UE/EEE/Suiza y los no comunitarios con permiso de residencia o visado de larga duración están exentos. ETIAS, una autorización previa al viaje aparte para viajeros no comunitarios exentos de visado, se espera más adelante y todavía no es obligatoria; conviene revisar el estado actual antes del viaje. El seguro de viaje no suele ser obligatorio para ciudadanos UE, pero es recomendable y puede ser obligatorio para solicitantes de visado Schengen.",
      steps: ["Confirma si tu estancia es una visita corta ordinaria y no una mudanza o residencia.", "Revisa si eres ciudadano de la UE/EEE/Suiza o si tu pasaporte entra por reglas Schengen para no comunitarios.", "Si eres viajero no comunitario, cuenta con el registro biométrico (huellas y foto) en la frontera por el EES a la entrada.", "Comprueba antes de viajar los documentos de entrada, seguro si aplica y la regla de 90/180 cuando corresponda."],
      links: ["eu-short-stay", "schengen", "ees", "calculator"]
    } : {
      process: "Entry rules and short stays",
      explanation: "Entry to Spain depends on your passport. EU, EEA, and Swiss citizens can enter freely with a valid passport or national ID for any length of stay. Most other nationalities — including many visa-free passports such as the US, UK, Canada and Australia — can enter Spain visa-free for up to 90 days in any 180-day period across the whole Schengen area, not just Spain. Some nationalities need a Schengen short-stay visa from a Spanish consulate before travelling. At the border you may be asked for accommodation, return or onward travel, and enough money for the stay. Since April 2026 the EU's Entry/Exit System (EES) is in force: non-EU visitors have their fingerprints and photo registered at the border on first entry instead of a passport stamp, and the system tracks the 90/180 allowance automatically — EU/EEA/Swiss citizens and non-EU holders of a Spanish residence permit or long-stay visa are exempt. ETIAS, a separate pre-travel authorisation for currently visa-free non-EU visitors, is expected later and not yet required — check the current status before you travel. Travel insurance is not legally required for EU citizens but is strongly recommended; it may be required for Schengen visa applicants.",
      steps: ["Confirm that your stay is an ordinary short visit rather than a move or residence plan.", "Check whether you are travelling as an EU/EEA/Swiss citizen or under Schengen short-stay rules for non-EU passports.", "If you are a non-EU visitor, expect biometric registration (fingerprints and photo) at the border under the EES on entry.", "Before travelling, review entry documents, any insurance requirement, and the 90/180 rule where relevant."],
      links: ["eu-short-stay", "schengen", "ees", "calculator"]
    };
  }
  if (goal === "vacation-citizenship") {
    return currentLang === "es" ? {
      process: "Visita UE frente a no UE",
      explanation: "La separación principal para entrar en España es UE/EEE/Suiza frente al resto de viajeros. Los ciudadanos de la UE, EEE y Suiza se mueven libremente y pueden entrar sin visado ni límite de 90 días, aunque vivir más de tres meses activa normas de registro de residencia. Los visitantes no comunitarios de países exentos de visado pueden entrar sin visado, pero están sujetos al límite Schengen de 90 días en cualquier periodo de 180 días en todos los países Schengen juntos. Los viajeros de países que sí requieren visado deben solicitar un visado Schengen en el consulado español antes de viajar. Desde abril de 2026, los no comunitarios pasan además por el Sistema de Entradas y Salidas (EES), que registra huellas y foto en la frontera; los ciudadanos UE/EEE/Suiza y quienes tienen permiso de residencia o visado de larga duración están exentos. ETIAS funcionará como autorización previa para muchos viajeros no comunitarios exentos de visado cuando entre en vigor.",
      steps: ["Si eres ciudadano UE/EEE/Suiza, revisa la guía de estancia corta y viaja con documento válido.", "Si eres no comunitario, comprueba si tu nacionalidad necesita visado Schengen o entra por exención.", "Usa la calculadora oficial si necesitas confirmar el límite de 90 días en 180 días."],
      links: ["eu-short-stay", "schengen", "ees", "calculator"]
    } : {
      process: "EU vs non-EU visits",
      explanation: "The key split for Spain entry is EU/EEA/Swiss versus everyone else. EU, EEA, and Swiss citizens move freely within the EU and can stay in Spain as long as they like without any visa or time limit — though stays over three months trigger residence registration rules. Non-EU visitors from visa-free countries (such as the US, UK, Canada, and Australia) can enter without a visa but are subject to the 90-day Schengen limit across all Schengen countries combined. Visitors from countries that require a Schengen visa must apply at a Spanish consulate before travelling. Since April 2026, non-EU visitors also pass through the Entry/Exit System (EES), which registers fingerprints and a photo at the border; EU/EEA/Swiss citizens and holders of a residence permit or long-stay visa are exempt. ETIAS — a pre-travel authorisation similar to the US ESTA — is expected to apply to currently visa-free non-EU visitors later; check whether it is in force before your trip.",
      steps: ["If you are an EU/EEA/Swiss citizen, review the short-stay guidance and travel with a valid document.", "If you are non-EU, check whether your nationality needs a Schengen visa or enters visa-free.", "Use the official calculator if you need to confirm the 90 days in any 180-day limit."],
      links: ["eu-short-stay", "schengen", "ees", "calculator"]
    };
  }
  if (goal === "vacation-flights") {
    return currentLang === "es" ? {
      process: "Vuelos y aeropuertos",
      explanation: "Para organizar cómo llegar a España, conviene empezar por la ciudad o región real a la que quieres ir. Madrid y Barcelona concentran muchas conexiones internacionales, pero Málaga, Alicante, Valencia, Palma, Sevilla, Bilbao y los aeropuertos canarios pueden ser mejores según el destino. Aena es la fuente oficial para aeropuertos, terminales y servicios. Iberia permite reservar directamente con una aerolínea española, mientras que Google Flights, Skyscanner, KAYAK o eDreams ayudan a comparar fechas, escalas y precios. Antes de pagar, revisa equipaje, aeropuerto exacto, cambios y si la reserva es directa o mediante intermediario.",
      steps: ["Consulta primero aeropuertos y rutas posibles según la ciudad o región a la que quieres llegar.", "Compara fechas y precios antes de decidir si reservas con una aerolínea directa o mediante un comparador.", "Revisa siempre condiciones de equipaje, cambios y aeropuerto exacto antes de pagar."],
      links: ["travel-aena", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams"]
    } : {
      process: "Flights and airports",
      explanation: "If you want to sort out how to arrive or compare routes first, start with airlines, search tools, and the official airport network.",
      steps: ["Check airports and possible routes first based on the city or region you want to reach.", "Compare dates and prices before deciding whether to book directly with an airline or through a search platform.", "Always check baggage rules, change conditions, and the exact airport before you pay."],
      links: ["travel-aena", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams"]
    };
  }
  if (goal === "vacation-ground") {
    return currentLang === "es" ? {
      process: "Trenes, autobuses y coche",
      explanation: "Dentro de España, el mejor transporte depende mucho del trayecto. Para rutas entre grandes ciudades, el tren puede ser la opción más cómoda y rápida; Renfe y otros operadores cubren muchas líneas de alta velocidad. Para pueblos, costa o rutas menos conectadas, el autobús puede funcionar mejor. Un coche de alquiler da libertad para zonas rurales, playas pequeñas o varios destinos en pocos días, pero conviene revisar aparcamiento, peajes, cobertura, combustible y condiciones de recogida. En ciudades grandes, a menudo es más fácil moverse en metro, tren local, autobús o taxi que alquilar coche.",
      steps: ["Mira si tu ruta encaja mejor con tren de larga distancia, autobús o coche de alquiler.", "Comprueba horarios, estaciones o aeropuertos de recogida antes de cerrar el plan.", "Si alquilas coche, revisa bien cobertura, combustible, conductor adicional y condiciones de recogida."],
      links: ["travel-renfe", "travel-alsa", "car-europcar", "car-sixt", "car-avis", "car-hertz"]
    } : {
      process: "Trains, buses, and car hire",
      explanation: "Inside Spain, the best option depends heavily on the route. Some trips are strongest by train; others are easier by bus or by rental car if you want more freedom.",
      steps: ["Check whether your route fits best by long-distance train, bus, or rental car.", "Confirm schedules, stations, or pickup points before locking the plan in.", "If you rent a car, review coverage, fuel policy, additional-driver rules, and pickup conditions carefully."],
      links: ["travel-renfe", "travel-alsa", "car-europcar", "car-sixt", "car-avis", "car-hertz"]
    };
  }
  if (goal === "vacation-booking") {
    return currentLang === "es" ? {
      process: "Buscadores y reservas",
      explanation: "Para alojamiento, lo más práctico suele ser comparar primero plataformas grandes y reservar solo cuando tengas clara la zona, el tipo de estancia y las condiciones. Booking.com y Expedia ayudan a comparar hoteles y apartamentos; Airbnb puede ser útil para apartamentos o estancias más largas, pero revisa bien normas, limpieza y cancelación. Tripadvisor sirve para contrastar opiniones y ubicación. Mira siempre si el precio final incluye tasas, limpieza, depósito, desayuno, parking o cancelación. Para viajes con niños, trabajo remoto o llegada tarde, comprueba también horarios de entrada, ascensor, ruido, aire acondicionado y transporte cercano.",
      steps: ["Compara barrio, política de cancelación, horarios de llegada y tipo de alojamiento antes de reservar.", "Mira si te conviene hotel, apartamento o estancia más flexible según la duración del viaje.", "Antes de pagar, revisa bien tasas, condiciones y opiniones recientes."],
      links: ["stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor"]
    } : {
      process: "Booking platforms",
      explanation: "For places to stay, the practical move is usually to compare large platforms first and only book once you are clearer on area, stay type, and conditions.",
      steps: ["Compare neighborhood, cancellation policy, arrival times, and accommodation type before booking.", "Check whether a hotel, apartment, or more flexible stay fits your trip length better.", "Before paying, review fees, conditions, and recent reviews carefully."],
      links: ["stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor"]
    };
  }
  if (goal === "vacation-hotels") {
    return currentLang === "es" ? {
      process: "Cadenas hoteleras",
      explanation: "Si prefieres reservar directamente, las cadenas hoteleras pueden ayudarte a comparar estilos de viaje con menos ruido: hoteles urbanos, playa, resort, negocios o escapadas cortas. Meliá, Barceló, RIU e Iberostar tienen fuerte presencia española, especialmente en destinos de vacaciones; NH suele funcionar bien para ciudades; Marriott y Hilton ofrecen opciones internacionales; Paradores es una red pública española con hoteles en edificios históricos o lugares singulares. Reservar directo a veces mejora condiciones, fidelización o comunicación, pero compara siempre ubicación, cancelación y precio final.",
      steps: ["Decide si buscas hotel urbano, resort, playa, viaje de trabajo o una estancia más clásica.", "Compara ubicación, categoría, condiciones y si te conviene reservar directo con la cadena.", "Usa varias cadenas grandes para ver rápidamente qué estilo encaja mejor con tu viaje."],
      links: ["travel-paradores", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
    } : {
      process: "Hotel chains",
      explanation: "If you prefer to book direct, major chains can help you compare different stay styles: city, beach, business, resort, or shorter getaway.",
      steps: ["Decide whether you want a city hotel, resort, beach stay, business trip option, or something more classic.", "Compare location, category, conditions, and whether booking direct with the chain makes sense.", "Use several major chains to get a quick feel for which style fits your trip best."],
      links: ["travel-paradores", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
    };
  }
  if (goal === "vacation-tourism") {
    return currentLang === "es" ? {
      process: "Turismo oficial e ideas",
      explanation: "España ofrece viajes muy distintos según la región. La costa mediterránea, como Costa Brava, Costa Blanca o Costa del Sol, funciona para playa y buen clima; Madrid, Barcelona, Sevilla y Valencia mezclan cultura, comida y arquitectura; Canarias y Baleares son destinos insulares muy populares; y zonas interiores de Andalucía, Castilla, Galicia, Asturias o País Vasco pueden dar una experiencia más local y tranquila. La temporada media, especialmente abril-mayo y septiembre-octubre, suele tener mejor equilibrio entre clima, precios y menos gente. El portal oficial Spain.info es buen punto de partida para ideas sin tanta presión comercial.",
      steps: ["Empieza por el portal oficial de turismo para ver regiones, ciudades y estilos de viaje.", "Usa la información oficial para hacer una primera selección antes de comparar precios.", "Cuando ya tengas la idea clara, pasa a transporte y alojamiento con menos ruido."],
      links: ["travel-spaininfo", "travel-paradores"]
    } : {
      process: "Official tourism and ideas",
      explanation: "Spain is one of the most visited countries in the world, with sharply different experiences by region. The Mediterranean coast (Costa Brava, Costa Blanca, Costa del Sol) offers beach holidays and warm winters; cities like Barcelona, Madrid, Seville, and Valencia offer culture, food, and architecture; the Canary Islands and Balearics are popular year-round island destinations; and inland regions like Andalusia, Castilla, and the Basque Country offer a slower, more local experience. Shoulder season (April–May and September–October) gives you better prices, fewer crowds, and good weather in most regions. The official Spain tourism portal (spain.info) is the clearest starting point for regional ideas without commercial noise.",
      steps: ["Start with the official tourism portal to browse regions, cities, and trip styles.", "Use the official information to narrow choices before you compare prices.", "Once you have a clearer direction, move to transport and accommodation with less noise."],
      links: ["travel-spaininfo", "travel-paradores"]
    };
  }
  if (goal === "vacation-reviews") {
    return currentLang === "es" ? {
      process: "Reseñas y comparación",
      explanation: "Las reseñas son más útiles cuando ya tienes destino y fechas aproximadas. Para hoteles, Tripadvisor y Google Maps dan una visión amplia, mientras que Booking.com y Expedia suelen mostrar opiniones ligadas a estancias verificadas. Para apartamentos, revisa con cuidado la política de cancelación, normas de la casa y reseñas recientes, porque en zonas turísticas las condiciones pueden ser estrictas. Las opiniones de los últimos 3 a 6 meses importan más que la nota histórica, sobre todo en alojamientos pequeños. Si algo parece demasiado perfecto o demasiado raro, contrasta en otra plataforma antes de reservar.",
      steps: ["Compara zonas, hoteles o experiencias concretas con reseñas recientes y fotos reales.", "No uses solo una plataforma: contrasta la información si algo parece demasiado bueno o demasiado raro.", "Después de comparar, vuelve a la reserva o al transporte con una decisión más clara."],
      links: ["stay-tripadvisor", "stay-booking", "stay-expedia"]
    } : {
      process: "Reviews and comparison",
      explanation: "Reviews are most useful for narrowing down a neighbourhood or specific property once you have already chosen a destination and rough dates. For hotels, TripAdvisor and Google Maps reviews give a broad picture; Booking.com and Expedia reviews are tied to verified stays and tend to be more reliable. For apartments and short-term rentals, Airbnb and Vrbo both show guest reviews, but check the cancellation policy carefully — Spanish rentals in tourist areas often have strict no-refund terms. Recent reviews (last 3–6 months) matter more than the overall score, especially for smaller properties where management can change. If something looks unusually perfect or unusually bad, cross-check on a second platform before booking.",
      steps: ["Compare neighborhoods, hotels, or specific experiences using recent reviews and real photos.", "Do not rely on only one platform if something looks unusually good or unusually odd.", "After comparing, go back to booking or transport with a clearer choice."],
      links: ["stay-tripadvisor", "stay-booking", "stay-expedia"]
    };
  }
  if (goal === "travel-insurance") {
    return currentLang === "es" ? {
      process: "Seguro de viaje para España",
      explanation: "El seguro de viaje cubre emergencias médicas, cancelación de viaje, pérdida de equipaje y repatriación para visitantes de España — independiente de cualquier cobertura sanitaria de la UE. Los visitantes no comunitarios lo necesitan especialmente, ya que no tienen acceso automático a la sanidad pública española.",
      steps: ["Comprueba si tu país tiene un acuerdo sanitario recíproco con España (ciudadanos de la UE/EEE: lleva tu Tarjeta Sanitaria Europea).", "Compara aseguradoras de viaje por los límites de cobertura médica, las cláusulas de evacuación de emergencia y la cobertura de enfermedades preexistentes.", "Contrátalo antes de salir de tu país — la mayoría de las pólizas no cubren de forma retroactiva una vez que ya estás en España."],
      links: ["ehic-eu-info"]
    } : {
      process: "Travel insurance for Spain",
      explanation: "Travel insurance covers medical emergencies, trip cancellation, lost luggage, and repatriation for visitors to Spain — separate from any EU health coverage. Non-EU visitors especially need this, since they have no automatic access to Spanish public healthcare.",
      steps: ["Check if your home country has a reciprocal healthcare agreement with Spain (EU/EEA citizens: bring your EHIC card).", "Compare travel insurance providers for medical coverage limits, emergency evacuation clauses, and pre-existing condition coverage.", "Buy before departure — most policies won’t cover you retroactively once you’re already in Spain."],
      links: ["ehic-eu-info"]
    };
  }
  if (goal === "driving-spain-visitors") {
    return currentLang === "es" ? {
      process: "Conducir en España: carné, peajes y límites de velocidad",
      explanation: "Los conductores visitantes pueden usar un carné de conducir válido de su país de origen durante estancias cortas (hasta 6 meses) — los carnés de la UE no necesitan nada más; los visitantes no comunitarios pueden necesitar un Permiso de Conducir Internacional (IDP) junto con su carné nacional. España tiene autopistas de peaje (marcadas AP) y autovías gratuitas (marcadas A), y los límites de velocidad varían según el tipo de vía.",
      steps: ["Comprueba si tu carné necesita un IDP — la mayoría de países no comunitarios sí (consíguelo antes de llegar, no se expide en España).", "Conoce los límites de velocidad: 120 km/h en autopistas y autovías, 90-100 km/h en carreteras convencionales, 50 km/h en zona urbana (más bajo en algunas calles — revisa la señalización).", "Presupuesta los peajes si usas autopistas AP — paga en efectivo o tarjeta en los peajes, o con teletag Via-T si alquilas a largo plazo."],
      links: ["dgt-general", "dgt-online-procedures"]
    } : {
      process: "Driving in Spain: licenses, tolls, and speed limits",
      explanation: "Visiting drivers can use a valid driving license from their home country for short stays (up to 6 months) — EU licenses need nothing extra; non-EU visitors may need an International Driving Permit (IDP) alongside their national license. Spain has both toll (autopista, marked AP) and free (autovía, marked A) motorways, and speed limits vary by road type.",
      steps: ["Check whether your license needs an IDP — most non-EU countries do (get one before arriving, they’re not issued in Spain).", "Know the speed limits: 120 km/h motorways, 90-100 km/h conventional roads, 50 km/h urban (lower on some city roads — check signage).", "Budget for tolls if using AP-marked motorways — pay by cash or card at toll booths, or via Via-T electronic tag if renting long-term."],
      links: ["dgt-general", "dgt-online-procedures"]
    };
  }
  if (goal === "sim-esim-vpn") {
    return currentLang === "es" ? {
      process: "Tarjetas SIM, eSIM y VPN para España",
      explanation: "Estar conectado en España suele significar elegir entre una SIM prepago física de un operador español o una eSIM pensada para viajeros, además, opcionalmente, de una VPN para navegar de forma segura o acceder a contenido de tu país de origen. Las SIM físicas de Movistar, Orange, Vodafone o Digi suelen ofrecer las mejores tarifas locales para estancias largas; las eSIM pensadas para viajeros como Holafly o Airalo se configuran más rápido pero pueden costar más por gigabyte.",
      steps: ["Decide entre una SIM física (mejor relación calidad-precio para estancias largas, requiere un teléfono liberado) o una eSIM (configuración instantánea, sin cambio físico, ideal para viajes cortos).", "Compara cantidades de datos y precios entre varios proveedores antes de comprar — las necesidades varían mucho entre navegación ligera y streaming o trabajo intensivo.", "Si necesitas acceso seguro a apps bancarias o streaming de tu país de origen, configura una VPN antes de llegar para que esté lista al instante."],
      links: ["provider-movistar", "provider-orange", "provider-vodafone", "provider-digi", "provider-holafly", "provider-airalo", "provider-nordvpn", "provider-expressvpn", "provider-protonvpn"]
    } : {
      process: "SIM cards, eSIM, and VPN for Spain",
      explanation: "Staying connected in Spain usually means choosing between a physical prepaid SIM from a Spanish carrier or an eSIM designed for travelers, plus optionally a VPN for secure browsing or accessing home-country content. Physical SIMs from Movistar, Orange, Vodafone, or Digi typically offer the best local rates for longer stays; traveler-focused eSIMs like Holafly or Airalo are faster to set up but can cost more per gigabyte.",
      steps: ["Decide between a physical SIM (better value for longer stays, requires an unlocked phone) or an eSIM (instant setup, no physical swap, ideal for short trips).", "Compare data allowances and prices across a couple of providers before buying — needs vary a lot between light browsing and heavy streaming or work use.", "If you need secure access to banking apps or home-country streaming, set up a VPN before you arrive so it is ready to use immediately."],
      links: ["provider-movistar", "provider-orange", "provider-vodafone", "provider-digi", "provider-holafly", "provider-airalo", "provider-nordvpn", "provider-expressvpn", "provider-protonvpn"]
    };
  }
  return null;
}

function livingTopicSummary(goal) {
  const summaries = currentLang === "es" ? {
    padron: "Registro municipal de tu domicilio en España.",
    nie: "Tu número de identificación de extranjero para inmuebles, banca, impuestos, trabajo y la mayoría de trámites oficiales en España.",
    tie: "Tarjeta física para ciudadanos no comunitarios con permiso aprobado.",
    "social-security": "Número usado para empleo, autónomos y relación con la Seguridad Social.",
    digital: "Acceso online para sedes públicas, notificaciones y firma electrónica.",
    "sip-card": "Tarjeta sanitaria pública regional, como SIP en Valencia o TSI en Cataluña.",
    "private-health": "Seguro privado útil para ciertos permisos o como cobertura adicional.",
    "ehic-card": "Tarjeta para asistencia sanitaria necesaria durante estancias temporales en Europa.",
    banking: "Cuenta para nómina, alquiler, recibos y operaciones bancarias diarias.",
    "renting-home": "Cómo buscar vivienda, preparar documentos, revisar contratos y evitar pagos dudosos.",
    "job-search": "Portales públicos y pasos básicos para empezar a buscar trabajo.",
    taxes: "Domicilio fiscal y trámites básicos con Hacienda.",
    phone: "Línea móvil e internet para instalarte y verificar servicios.",
    "vida-laboral": "Informe oficial con tu historial completo de cotizaciones y empleo en España.",
    "driving-licence-exchange": "Canjea tu permiso de conducir extranjero por uno español antes de que caduque el plazo."
  } : {
    padron: "Town hall address registration — the foundation for TIE, healthcare, and most admin steps.",
    nie: "Your foreigner ID number for property, banking, tax, work, and most official procedures in Spain.",
    tie: "Physical card for non-EU citizens after permission is approved.",
    "social-security": "Número de afiliación — needed for employment, self-employment, and healthcare access.",
    digital: "FNMT certificate or Cl@ve digital identity for online government portals and e-signatures.",
    "sip-card": "Regional public health card (SIP, TSI, or equivalent) for GP, referrals, and prescriptions.",
    "private-health": "Private insurance required for some visas and popular for faster specialist access.",
    "ehic-card": "EU health card for medically necessary care during temporary stays in other European countries.",
    banking: "Spanish bank account for salary, rent, utilities, and tax — needed within weeks of arriving.",
    "renting-home": "How to search, prepare documents, check contracts, and avoid risky payments.",
    "job-search": "SEPE, InfoJobs, and LinkedIn are the main channels; EU citizens work freely, non-EU need authorization.",
    taxes: "Tax residency, annual IRPF return, and the Beckham Law option for recent arrivals.",
    phone: "Spanish SIM needed for bank verification, Cl@ve PIN, and government SMS codes.",
    "vida-laboral": "Official report covering your complete Spanish employment and contribution history.",
    "driving-licence-exchange": "Exchange your foreign driving licence for a Spanish one before your deadline runs out."
  };
  return summaries[goal] || "";
}

function vacationTopicSummary(goal) {
  const summaries = currentLang === "es" ? {
    "vacation-entry": "Reglas básicas para visitas cortas, Schengen y estancias de hasta 90 días.",
    "vacation-citizenship": "Orientación rápida para visitantes de la UE frente a viajeros no comunitarios.",
    "vacation-flights": "Vuelos, aeropuertos y comparadores para llegar y moverte mejor.",
    "vacation-ground": "Trenes, autobuses y alquiler de coche para desplazarte dentro de España.",
    "vacation-booking": "Plataformas grandes para comparar alojamiento antes de reservar.",
    "vacation-hotels": "Cadenas hoteleras importantes presentes en España.",
    "vacation-tourism": "Portales oficiales e ideas para elegir destinos y planificar mejor el viaje.",
    "vacation-reviews": "Reseñas y comparación de zonas, alojamientos y experiencias.",
    "travel-insurance": "Cobertura de emergencias médicas, cancelación y equipaje, aparte de la sanidad de la UE.",
    "driving-spain-visitors": "Carné, peajes y límites de velocidad para conducir en España de visita.",
    "sim-esim-vpn": "SIM física, eSIM y VPN para estar conectado durante tu estancia."
  } : {
    "vacation-entry": "Basic rules for short visits, Schengen stays, and trips up to 90 days.",
    "vacation-citizenship": "Quick orientation for EU visitors versus non-EU travellers.",
    "vacation-flights": "Flights, airports, and search tools for arriving and moving around smoothly.",
    "vacation-ground": "Trains, buses, and car rental for getting around inside Spain.",
    "vacation-booking": "Large booking platforms for comparing places to stay before you reserve.",
    "vacation-hotels": "Major hotel chains with a strong presence in Spain.",
    "vacation-tourism": "Official tourism portals and ideas for choosing destinations and planning better.",
    "vacation-reviews": "Reviews and comparison tools for neighborhoods, stays, and experiences.",
    "travel-insurance": "Medical emergency, cancellation, and luggage cover, separate from EU health coverage.",
    "driving-spain-visitors": "Licenses, tolls, and speed limits for driving in Spain as a visitor.",
    "sim-esim-vpn": "Physical SIM, eSIM, and VPN options for staying connected during your trip."
  };
  return summaries[goal] || "";
}

function topicScene(goal) {
  const photos = {
    padron: "./assets/topic-scenes/live-padron-20260606.webp",
    nie: "./assets/topic-scenes/live-nie-20260606.webp",
    tie: "./assets/topic-scenes/live-tie-20260606.webp",
    "social-security": "./assets/topic-scenes/live-social-security-20260606.webp",
    digital: "./assets/topic-scenes/live-digital-access-20260606.webp",
    "sip-card": "./assets/topic-scenes/live-public-health-20260606.webp",
    "private-health": "./assets/topic-scenes/live-private-health-20260606.webp",
    "ehic-card": "./assets/topic-scenes/live-ehic-20260606.webp",
    banking: "./assets/topic-scenes/live-banking-20260606.webp",
    "renting-home": "./assets/topic-scenes/live-renting-home-20260625.webp",
    "job-search": "./assets/topic-scenes/live-job-search-20260606.webp",
    taxes: "./assets/topic-scenes/live-taxes-20260606.webp",
    phone: "./assets/topic-scenes/phone-direct-20260606.webp",
    "driving-licence-exchange": "./assets/topic-scenes/driving-licence-exchange-20260719.webp",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.webp",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.webp",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.webp",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.webp",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.webp",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.webp",
    "travel-insurance": "./assets/topic-scenes/travel-insurance-20260722.webp",
    "driving-spain-visitors": "./assets/topic-scenes/driving-spain-visitors-20260722.webp",
    "sim-esim-vpn": "./assets/topic-scenes/sim-esim-vpn-20260722.webp"
  };
  if (photos[goal]) {
    return `<img src="${photos[goal]}" alt="" />`;
  }
  return "";
}

function topicBackdrop(goal) {
  const icons = {
    padron: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 54 60 26l36 28v38H24V54Z"/><path d="M48 92V62h24v30"/><path d="M39 51h42"/></svg>`,
    nie: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="28" width="76" height="56" rx="10"/><path d="M36 46h24"/><path d="M36 60h48"/><path d="M36 74h34"/><circle cx="82" cy="46" r="8"/></svg>`,
    tie: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="26" width="80" height="60" rx="10"/><path d="M34 46h24"/><path d="M34 60h48"/><circle cx="82" cy="48" r="10"/><path d="M74 76c4-8 12-12 22-12"/></svg>`,
    "social-security": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M60 26v68"/><path d="M36 40h30a12 12 0 0 1 0 24H48a12 12 0 0 0 0 24h36"/><path d="M74 32h-8"/><path d="M58 88h-8"/></svg>`,
    digital: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="24" width="68" height="72" rx="12"/><path d="M44 40h32"/><path d="M44 56h32"/><path d="M60 70v12"/><circle cx="60" cy="88" r="4"/></svg>`,
    "sip-card": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M60 92s-26-14-26-38a14 14 0 0 1 26-8 14 14 0 0 1 26 8c0 24-26 38-26 38Z"/><path d="M52 60h16"/><path d="M60 52v16"/></svg>`,
    "private-health": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M60 92s-24-13-24-35a13 13 0 0 1 24-7 13 13 0 0 1 24 7c0 22-24 35-24 35Z"/><path d="M78 34 90 22"/><path d="M86 34h10"/><path d="M86 18v10"/></svg>`,
    "ehic-card": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="30" width="80" height="52" rx="10"/><path d="M38 48h18"/><path d="M47 39v18"/><path d="M68 46h16"/><path d="M68 58h20"/></svg>`,
    banking: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 44 60 24l42 20"/><path d="M24 48h72"/><path d="M30 48v34"/><path d="M48 48v34"/><path d="M72 48v34"/><path d="M90 48v34"/><path d="M20 82h80"/></svg>`,
    "job-search": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="50" r="20"/><path d="m64 64 20 20"/><path d="M42 46h16"/><path d="M42 54h12"/></svg>`,
    taxes: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M34 28h40l12 12v52H34V28Z"/><path d="M74 28v16h16"/><path d="M46 54h28"/><path d="M46 68h20"/></svg>`,
    phone: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="22" width="40" height="76" rx="10"/><path d="M52 36h16"/><circle cx="60" cy="84" r="4"/><path d="M22 50c8-10 16-14 26-16"/><path d="M22 70c8 10 16 14 26 16"/></svg>`,
    "vacation-entry": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M26 86h68"/><path d="M36 86V34l24-10 24 10v52"/><path d="M48 48h24"/><path d="M60 40v16"/></svg>`,
    "vacation-flights": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 68 84-18"/><path d="m52 60 10-24"/><path d="m62 58 20 14"/><path d="m34 64 12 10"/><path d="m86 54 12 8"/></svg>`,
    "vacation-ground": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="32" width="68" height="38" rx="8"/><path d="M38 70v10"/><path d="M82 70v10"/><path d="M40 48h40"/><circle cx="42" cy="84" r="6"/><circle cx="78" cy="84" r="6"/></svg>`,
    "vacation-booking": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M28 88V42h64v46"/><path d="M20 88h80"/><path d="M44 42V30h32v12"/><path d="M40 58h16"/><path d="M64 58h16"/></svg>`,
    "vacation-hotels": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="24" width="68" height="68" rx="8"/><path d="M44 24v68"/><path d="M62 40v12"/><path d="M62 64v12"/><path d="M74 40v12"/><path d="M74 64v12"/></svg>`,
    "vacation-tourism": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="60" cy="60" r="26"/><path d="M60 34c8 8 12 16 12 26s-4 18-12 26c-8-8-12-16-12-26s4-18 12-26Z"/><path d="M34 60h52"/></svg>`,
    "vacation-reviews": `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m60 28 9 18 20 3-14 14 3 20-18-9-18 9 3-20-14-14 20-3 9-18Z"/></svg>`
  };
  return icons[goal] || `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="60" cy="60" r="28"/><path d="M46 60h28"/></svg>`;
}

function guidePublicPath(id) {
  const es = currentLang === "es";
  const map = {
    "nie-only": es ? "/guides/es/nie/" : "/guides/nie/",
    "tie-after-approval": es ? "/guides/es/tie/" : "/guides/tie/",
    "eu-working": es ? "/guides/es/eu-registration/" : "/guides/eu-registration/",
    "eu-vacation": es ? "/guides/es/vacation-entry/" : "/guides/vacation-entry/",
    "non-eu-vacation": es ? "/guides/es/vacation-entry/" : "/guides/vacation-entry/",
    "vacation-citizenship": es ? "/guides/es/vacation-entry/" : "/guides/vacation-entry/",
    "digital-nomad": es ? "/es/the-spain-files/visado-nomada-digital/" : "/the-spain-files/digital-nomad-visa-spain/",
    "non-lucrative": es ? "/es/the-spain-files/visado-no-lucrativo/" : "/the-spain-files/non-lucrative-visa-spain/",
    banking: es ? "/the-spain-files/abrir-cuenta-bancaria-espana/" : "/the-spain-files/bank-account-spain/"
  };
  return map[id] || (es ? `/guides/es/${id}/` : `/guides/${id}/`);
}

function renderTopicLibrary(title, intro, groups, ariaLabel) {
  const renderTopicCards = (topics, summaryFn) => topics
    .map(([id, label]) => {
      const roadmap = directRoadmapFor(id);
      const firstStep = roadmap?.steps?.[0] || "";
      return `
        <article class="living-topic-card" data-topic="${id}">
          <span class="topic-scene" aria-hidden="true">${topicScene(id)}</span>
          <h4>${label}</h4>
          <p>${summaryFn(id)}</p>
          <small>${firstStep}</small>
          <a href="${guidePublicPath(id)}">${t("openGuideButton")}</a>
        </article>
      `;
    })
    .join("");

  return `
    <div class="topic-library">
      ${renderBackButton(title)}
      <h3>${title}</h3>
      <p class="library-intro">${intro}</p>
      ${groups
        .map(
          (group) => `
            <section class="topic-shelf">
              <div class="topic-shelf-heading">
                <h4>${group.title}</h4>
                <p>${group.description}</p>
              </div>
              <div class="living-topic-grid" aria-label="${ariaLabel}">${renderTopicCards(group.topics, group.summaryFn)}</div>
            </section>
          `
        )
        .join("")}
    </div>
  `;
}

function renderLivingSubtopics() {
  currentDirectRoute = "living-menu";
  wizardPanel?.classList.add("is-direct-guide", "is-living-topics");
  result.hidden = false;
  result.classList.remove("is-empty");
  const groups = currentLang === "es"
    ? [
        {
          title: "Documentos y administración",
          description: "Pasos básicos para identificarte, registrar tu dirección y dejar tu expediente en orden.",
          topics: [["padron", t("directPadron")], ["nie", t("directNie")], ["tie", t("directTie")], ["social-security", t("directSocial")], ["digital", t("directDigital")], ["driving-licence-exchange", t("directDrivingLicence")]],
          summaryFn: livingTopicSummary
        },
        {
          title: "Salud",
          description: "Tarjeta sanitaria pública, cobertura temporal y qué documentos suelen pedirte.",
          topics: [["sip-card", t("directSip")], ["private-health", t("directPrivateHealth")], ["ehic-card", t("directEhic")]],
          summaryFn: livingTopicSummary
        },
        {
          title: "Dinero y trabajo",
          description: "Cuenta bancaria, empleo e impuestos para empezar a funcionar con más normalidad.",
          topics: [["banking", t("directBanking")], ["renting-home", t("directRentingHome")], ["job-search", t("directJobs")], ["taxes", t("directTaxes")], ["vida-laboral", t("directVidaLaboral")]],
          summaryFn: livingTopicSummary
        },
        {
          title: "Instalación diaria",
          description: "Lo práctico del día a día para que todo lo demás funcione mejor.",
          topics: [["phone", t("directPhone")]],
          summaryFn: livingTopicSummary
        }
      ]
    : [
          {
            title: "Documents and admin",
            description: "Core steps for your identity, address registration, and basic paperwork footing.",
            topics: [["padron", t("directPadron")], ["nie", t("directNie")], ["tie", t("directTie")], ["social-security", t("directSocial")], ["digital", t("directDigital")], ["driving-licence-exchange", t("directDrivingLicence")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Health",
            description: "Public health card, temporary coverage, and the paperwork people commonly need.",
            topics: [["sip-card", t("directSip")], ["private-health", t("directPrivateHealth")], ["ehic-card", t("directEhic")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Money and work",
            description: "Banking, job search, and taxes for getting daily life up and running.",
            topics: [["banking", t("directBanking")], ["renting-home", t("directRentingHome")], ["job-search", t("directJobs")], ["taxes", t("directTaxes")], ["vida-laboral", t("directVidaLaboral")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Everyday setup",
            description: "The practical daily pieces that make everything else easier.",
            topics: [["phone", t("directPhone")]],
            summaryFn: livingTopicSummary
          }
        ];
  result.innerHTML = renderTopicLibrary(
    t("livingNext"),
    currentLang === "es"
      ? "Elige el área que más se parece a lo que te falta resolver ahora."
      : "Choose the area that most closely matches what you need to sort out next.",
    groups,
    currentLang === "es" ? "Temas para vivir en España" : "Living in Spain topics"
  );
  setCurrentScreenState({ type: "living-menu", entryPreset: currentEntryPreset });
}

function renderVacationSubtopics() {
  currentDirectRoute = "vacation-menu";
  wizardPanel?.classList.add("is-direct-guide");
  result.hidden = false;
  result.classList.remove("is-empty");
  const groups = currentLang === "es"
    ? [
        {
          title: "Entrada",
          description: "Lo básico para visitas cortas, reglas Schengen y diferencias entre ciudadanos UE y no UE.",
          topics: [["vacation-entry", "Reglas de entrada y estancia corta"]],
          summaryFn: vacationTopicSummary
        },
        {
          title: "Moverte por España",
          description: "Vuelos, aeropuertos, trenes, autobuses y coche de alquiler según cómo viajes.",
          topics: [["vacation-flights", "Vuelos y aeropuertos"], ["vacation-ground", "Trenes, autobuses y coche"], ["driving-spain-visitors", "Conducir en España: carné, peajes y límites de velocidad"]],
          summaryFn: vacationTopicSummary
        },
        {
          title: "Dónde alojarte",
          description: "Comparadores grandes y cadenas hoteleras que aparecen mucho en España.",
          topics: [["vacation-booking", "Buscadores y reservas"], ["vacation-hotels", "Cadenas hoteleras"]],
          summaryFn: vacationTopicSummary
        },
        {
          title: "Ideas y planificación",
          description: "Inspiración oficial, reseñas y herramientas para decidir mejor.",
          topics: [["vacation-tourism", "Turismo oficial e ideas"], ["vacation-reviews", "Reseñas y comparación"]],
          summaryFn: vacationTopicSummary
        },
        {
          title: "Preparación práctica",
          description: "Seguro de viaje y cómo estar conectado durante tu estancia.",
          topics: [["travel-insurance", "Seguro de viaje para España"], ["sim-esim-vpn", "Tarjetas SIM, eSIM y VPN"]],
          summaryFn: vacationTopicSummary
        }
      ]
    : [
        {
          title: "Entry",
          description: "Short-stay basics, Schengen rules, and the key difference between EU and non-EU visitors.",
          topics: [["vacation-entry", "Entry rules and short stays"]],
          summaryFn: vacationTopicSummary
        },
          {
            title: "Getting around Spain",
            description: "Flights, airports, trains, buses, and car hire depending on how you want to travel.",
            topics: [["vacation-flights", "Flights and airports"], ["vacation-ground", "Trains, buses, and car hire"], ["driving-spain-visitors", "Driving in Spain: licenses, tolls, and speed limits"]],
            summaryFn: vacationTopicSummary
          },
          {
            title: "Where to stay",
            description: "Large booking platforms and hotel brands that show up often in Spain.",
            topics: [["vacation-booking", "Booking platforms"], ["vacation-hotels", "Hotel chains"]],
            summaryFn: vacationTopicSummary
          },
          {
            title: "Ideas and planning",
            description: "Official inspiration, reviews, and tools for choosing places more confidently.",
            topics: [["vacation-tourism", "Official tourism and ideas"], ["vacation-reviews", "Reviews and comparison"]],
            summaryFn: vacationTopicSummary
          },
          {
            title: "Practical prep",
            description: "Travel insurance and staying connected during your trip.",
            topics: [["travel-insurance", "Travel insurance for Spain"], ["sim-esim-vpn", "SIM cards, eSIM, and VPN"]],
            summaryFn: vacationTopicSummary
          }
        ];
  result.innerHTML = renderTopicLibrary(
    currentLang === "es" ? "Visitar España" : "Visit Spain",
    currentLang === "es"
      ? "Empieza por la parte del viaje que quieras aclarar y luego abre la guía concreta."
      : "Start with the part of the trip you want to sort out, then open the guide that fits.",
    groups,
    currentLang === "es" ? "Guías para visitar España" : "Visit Spain guides"
  );
  setCurrentScreenState({ type: "vacation-menu", entryPreset: currentEntryPreset });
}

function renderEmptyResult() {
  result.hidden = false;
  result.classList.add("is-empty");
  result.innerHTML = `
    <h3>${t("emptyTitle")}</h3>
    <p>${t("emptyText")}</p>
  `;
}

function renderWhenNeededBlock(roadmap) {
  if (!roadmap?.whenNeeded?.length) return "";
  return `
    <div class="result-section">
      <strong>${resultSectionLabel("whenNeeded")}</strong>
      <ul class="roadmap-list">${roadmap.whenNeeded.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderWhatHappensNextBlock(roadmap) {
  if (!roadmap?.whatHappensNext) return "";
  return `
    <div class="result-section">
      <strong>${resultSectionLabel("whatHappensNext")}</strong>
      <p>${roadmap.whatHappensNext}</p>
    </div>
  `;
}

function renderDeadlineWarningBlock(routeId) {
  if (routeId !== "driving-licence-exchange") return "";
  return currentLang === "es"
    ? `
      <div class="result-section warning-note">
        <strong>⚠️ Plazo de 6 meses</strong>
        <p>La mayoría de las personas no comunitarias tienen un plazo estricto de 6 meses desde que son residentes legales antes de que su permiso extranjero deje de ser válido para conducir. No cumplir el plazo implica multas que empiezan en 200 €.</p>
      </div>
    `
    : `
      <div class="result-section warning-note">
        <strong>⚠️ The 6-month deadline</strong>
        <p>Most non-EU citizens have a strict 6-month window from the date they become legally resident before their foreign licence stops being valid to drive on. Missing the deadline means fines starting at €200.</p>
      </div>
    `;
}

const routeScopeNotices = {
  "work-authorization": {
    en: {
      heading: "EU citizen?",
      body: 'This guide covers work authorization for non-EU citizens. If you are an EU, EEA or Swiss citizen, use the <a href="/moving-to-spain/work-in-spain/">broader Work in Spain roadmap</a>.'
    },
    es: {
      heading: "¿Ciudadano de la UE?",
      body: 'Esta guía trata de la autorización de trabajo para ciudadanos no comunitarios. Si eres ciudadano de la UE, del EEE o de Suiza, consulta la <a href="/es/moving-to-spain/work-in-spain/">hoja de ruta general para trabajar en España</a>.'
    }
  },
  "eu-family": {
    en: {
      heading: "Planning your move, not just the application?",
      body: 'This guide covers the residence card application (EX-19) once you already know you qualify. It applies when the person you are joining is an <strong>EU, EEA or Swiss citizen</strong>. If your sponsor is a <strong>non-EU legal resident</strong> in Spain, that is ordinary family reunification instead — see the <a href="/guides/family/">Family reunification guide</a>, which has a different form, fee and entry sequence. For relationship categories, eligibility, moving together vs. joining later, and common mistakes, see the broader <a href="/moving-to-spain/family-member-eu-citizen/">Family Member of an EU Citizen roadmap</a>.'
    },
    es: {
      heading: "¿Planeas tu mudanza, no solo el trámite?",
      body: 'Esta guía trata sobre la solicitud de la tarjeta de residencia (EX-19) una vez que ya sabes que cumples los requisitos. Se aplica cuando la persona con la que te reúnes es <strong>ciudadana de la UE, del EEE o de Suiza</strong>. Si quien te reagrupa es un <strong>residente legal no comunitario</strong> en España, se trata de reagrupación familiar ordinaria — consulta la <a href="/guides/es/family/">guía de reagrupación familiar</a>, que tiene formulario, tasa y secuencia de entrada distintos. Para categorías de parentesco, requisitos de elegibilidad, mudarse juntos o por separado, y errores comunes, consulta la <a href="/es/moving-to-spain/family-member-eu-citizen/">hoja de ruta de Familiar de un Ciudadano de la UE</a>.'
    }
  },
  family: {
    en: {
      heading: "Is your sponsor an EU citizen?",
      body: 'This guide covers ordinary family reunification (EX-02), where the person you are joining is a <strong>non-EU legal resident</strong> in Spain. If they are an <strong>EU, EEA or Swiss citizen</strong>, you follow the separate and generally more favourable EU-family route instead — see the <a href="/guides/eu-family/">EU-family residence card guide</a>. The two routes differ in form, fee and whether you need a visa before travelling.'
    },
    es: {
      heading: "¿Quien te reagrupa es ciudadano de la UE?",
      body: 'Esta guía trata la reagrupación familiar ordinaria (EX-02), cuando la persona con la que te reúnes es <strong>residente legal no comunitario</strong> en España. Si es <strong>ciudadana de la UE, del EEE o de Suiza</strong>, te corresponde la ruta separada y generalmente más favorable de familiar de ciudadano de la UE — consulta la <a href="/guides/es/eu-family/">guía de la tarjeta de familiar de ciudadano de la UE</a>. Las dos rutas difieren en formulario, tasa y en si necesitas visado antes de viajar.'
    }
  },
  study: {
    en: {
      heading: "Planning your studies, not just the paperwork?",
      body: 'This guide covers the study stay application (EX-00) once you are ready to file. For admission, financial means, healthcare, and accommodation planning for both EU and non-EU students, see the broader <a href="/moving-to-spain/students/">Moving to Spain as a Student roadmap</a>.'
    },
    es: {
      heading: "¿Planeas tus estudios, no solo el trámite?",
      body: 'Esta guía trata sobre la solicitud de la autorización de estancia por estudios (EX-00) una vez que estás listo para presentarla. Para admisión, medios económicos, sanidad y alojamiento, tanto para estudiantes de la UE como de fuera de la UE, consulta la <a href="/es/moving-to-spain/students/">hoja de ruta de Mudarse a España como Estudiante</a>.'
    }
  }
};

function renderWorkAuthorizationScopeNotice(routeId) {
  const notice = routeScopeNotices[routeId];
  if (!notice) return "";

  const { heading, body } = currentLang === "es" ? notice.es : notice.en;
  return `
    <div class="result-section route-scope-note">
      <strong>${heading}</strong>
      <p>${body}</p>
    </div>
  `;
}

// Entry-visa guidance for the EU-family route. Sources: EU "travel documents for
// non-EU family members" (europa.eu/youreurope), administracion.gob.es "Registering
// non-EU family members", and Regulation (EU) 2018/1806 Annex II for the visa-exempt
// list. Deliberately nationality-agnostic: the exempt list is set by EU regulation and
// changes over time, so the page points at the official list rather than embedding one.
function renderEuFamilyEntryBlock() {
  if (currentLang === "es") {
    return `
      <div class="result-section">
        <strong>Entrada: ¿necesitas visado antes de viajar?</strong>
        <p>Depende de tu nacionalidad. Como familiar de un ciudadano de la UE, tu situación de entrada es más favorable que la de una solicitud ordinaria.</p>
        <div class="nationality-path-grid">
          <article class="nationality-path-card nationality-path-card--agreement">
            <h4>Si tu nacionalidad está exenta de visado Schengen</h4>
            <p>Puedes viajar a España sin visado previo para estancias de hasta 90 días en cualquier periodo de 180 días. Una vez en España, presentas la solicitud de tarjeta de residencia (EX-19) <strong>en persona</strong> en la Oficina de Extranjería de tu provincia o, en su defecto, en la comisaría de policía correspondiente, <strong>dentro de los tres meses siguientes a tu fecha de entrada</strong>. Te entregan un resguardo de solicitud que acredita la legalidad de tu estancia hasta que se emita la tarjeta.</p>
          </article>
          <article class="nationality-path-card nationality-path-card--no-agreement">
            <h4>Si tu nacionalidad sí requiere visado</h4>
            <p>Solicitas el visado de entrada en el consulado español antes de viajar. Según el portal oficial de la UE, cuando se exige visado a un familiar directo de un ciudadano de la UE, este <strong>debe ser gratuito y tramitarse mediante un procedimiento acelerado</strong>. No es el mismo trámite que un visado Schengen ordinario.</p>
          </article>
          <article class="nationality-path-card">
            <h4>Si ya tienes una tarjeta de familiar de ciudadano de la UE</h4>
            <p>Si ya posees una tarjeta de residencia de familiar de ciudadano de la Unión expedida por cualquier país de la UE, no necesitas visado para entrar.</p>
          </article>
        </div>
        <div class="guide-box guide-box--warning"><strong>Importante</strong><p>Esta ruta <strong>no</strong> exige el visado previo de reagrupación familiar que sí requiere la reagrupación familiar ordinaria (cuando quien reagrupa es un residente no comunitario). Es una confusión frecuente: por la vía de familiar de ciudadano de la UE puedes, según tu nacionalidad, entrar primero y solicitar la tarjeta en España.</p></div>
        <p class="helper-note">La lista de nacionalidades exentas de visado la fija el Anexo II del Reglamento (UE) 2018/1806 y puede cambiar. Comprueba tu caso concreto con el consulado español antes de viajar.</p>
      </div>
    `;
  }
  return `
    <div class="result-section">
      <strong>Entry: do you need a visa first?</strong>
      <p>It depends on your nationality. As the family member of an EU citizen, your entry situation is more favourable than an ordinary application.</p>
      <div class="nationality-path-grid">
        <article class="nationality-path-card nationality-path-card--agreement">
          <h4>If your nationality is Schengen visa-exempt</h4>
          <p>You can travel to Spain without a prior entry visa for stays of up to 90 days in any 180-day period. Once in Spain, you apply for the residence card (EX-19) <strong>in person</strong> at the Oficina de Extranjería in your province or, failing that, the relevant local police station, <strong>within three months of your date of entry</strong>. You are given a certificate of application, which proves the legality of your stay until the card is issued.</p>
        </article>
        <article class="nationality-path-card nationality-path-card--no-agreement">
          <h4>If your nationality does require a visa</h4>
          <p>You apply for the entry visa at the Spanish consulate before travelling. Per the EU's official portal, where a visa is required for a core family member of an EU citizen it <strong>should be free of charge and issued under an accelerated application procedure</strong>. This is not the same process as an ordinary Schengen visa.</p>
        </article>
        <article class="nationality-path-card">
          <h4>If you already hold an EU-family residence card</h4>
          <p>If you already hold a residence card as a family member of a Union citizen issued by any EU country, you do not need a visa to enter.</p>
        </article>
      </div>
      <div class="guide-box guide-box--warning"><strong>Important</strong><p>This route does <strong>not</strong> require the pre-arrival family reunification visa that ordinary family reunification does (where the sponsor is a non-EU resident). This is a common point of confusion: on the EU-family route you may, depending on your nationality, enter first and apply for the card from within Spain.</p></div>
      <p class="helper-note">The visa-exempt nationality list is set by Annex II of Regulation (EU) 2018/1806 and can change. Confirm your own case with the Spanish consulate before travelling.</p>
    </div>
  `;
}

function renderNationalityPathBlock(routeId) {
  if (routeId === "eu-family") return renderEuFamilyEntryBlock();
  if (routeId !== "driving-licence-exchange") return "";
  if (currentLang === "es") {
    return `
      <div class="result-section">
        <strong>Tu vía depende de tu nacionalidad</strong>
        <div class="nationality-path-grid">
          <article class="nationality-path-card">
            <h4>UE/EEE</h4>
            <p>Sin examen. El canje es voluntario salvo que tu permiso caduque en España o tenga una validez indefinida o muy larga (15+ años para coche/moto, 5+ años para camión/autobús). En ese caso, debes canjearlo dentro de los 2 años desde que estableces residencia. Tasa: 28,87 €.</p>
          </article>
          <article class="nationality-path-card nationality-path-card--agreement">
            <h4>No UE con acuerdo bilateral</h4>
            <p>Reino Unido, Suiza, Japón y la mayoría de Latinoamérica. Canje sin examen teórico ni práctico. Reconocimiento médico, documentación y cita en la DGT. Tasa: 28,87 €.</p>
          </article>
          <article class="nationality-path-card nationality-path-card--no-agreement">
            <h4>No UE sin acuerdo bilateral</h4>
            <p>EE. UU., Canadá, Australia, Nueva Zelanda. No existe vía de canje. Debes aprobar el examen teórico y práctico español completo dentro de los 6 meses de residencia. El examen teórico está disponible en inglés.</p>
          </article>
        </div>
      </div>
    `;
  }
  return `
    <div class="result-section">
      <strong>Your path depends on your nationality</strong>
      <div class="nationality-path-grid">
        <article class="nationality-path-card">
          <h4>EU/EEA</h4>
          <p>No test required. Exchange is voluntary unless your licence expires in Spain or has an indefinite or very long validity (15+ years for cars/motorcycles, 5+ years for trucks/buses). If so, you must exchange within 2 years of establishing residency. Fee: €28.87.</p>
        </article>
        <article class="nationality-path-card nationality-path-card--agreement">
          <h4>Non-EU with a bilateral agreement</h4>
          <p>UK, Switzerland, Japan, most of Latin America. Exchange without a theory or practical test. Medical check, documents, DGT appointment. Fee: €28.87.</p>
        </article>
        <article class="nationality-path-card nationality-path-card--no-agreement">
          <h4>Non-EU without a bilateral agreement</h4>
          <p>US, Canada, Australia, New Zealand. No exchange route exists. You must pass the full Spanish theory and practical driving tests within 6 months of residency. The theory exam is available in English.</p>
        </article>
      </div>
    </div>
  `;
}

function renderFormsAndTaxesBlock(route) {
  if (!route) return "";
  const details = routeFormsAndTaxesFor(route.id);
  if (!details || (!details.forms.length && !details.taxes.length)) return "";
  const rows = [...details.forms, ...details.taxes]
    .map(([name, description, kind, helperKey]) => {
      const officialUrl = formHelpers[helperKey]?.officialUrl || "";
      const directRoute = name === "NIE" ? "nie" : name === "Padrón" ? "padron" : name === "EX-17" ? "tie" : "";
      const normalizedKind = kind || "";
      const isFeeRow = name === "790-012" || /\bEUR\b/.test(normalizedKind);
      const isFormRow = !isFeeRow;
      const isFormLink = Boolean(officialUrl) && !isFeeRow && !directRoute;
      const isFeeLink = Boolean(officialUrl) && isFeeRow;
      const isGuideLink = Boolean(directRoute);
      const plainKindBadge = {
        Document: "Document",
        Documento: "Documento",
        Asiakirja: "Asiakirja",
        Evidence: "Evidence",
        Prueba: "Prueba",
        Todiste: "Todiste",
        "Official application portal": "Portal",
        "Portal oficial de solicitud": "Portal",
        "Virallinen hakukanava": "Hakukanava"
      }[normalizedKind];
      const isPlainKindRow = !officialUrl && !isGuideLink && !isFeeRow && Boolean(plainKindBadge);
      const rowClass = isFeeRow
        ? `doc-row doc-row--fee${isFeeLink ? " doc-row--official" : ""}`
        : isFormLink
          ? "doc-row doc-row--official"
          : isGuideLink
            ? "doc-row doc-row--guide"
            : "doc-row";
      const badgeLabel = isFeeRow
        ? currentLang === "es"
          ? "Tasa"
          : "Fee"
        : isGuideLink
          ? currentLang === "es"
            ? "Guía"
            : "Guide"
        : isPlainKindRow
          ? plainKindBadge
        : currentLang === "es"
          ? "Modelo"
          : "Form";
      const kindLabel = isPlainKindRow || /^(Form|Formulario|Lomake|Modelo)$/i.test(normalizedKind) ? "" : normalizedKind;
      const rowTag = isGuideLink
          ? `a class="${rowClass}" href="${guidePublicPath(directRoute)}"`
          : officialUrl
            ? `a class="${rowClass}" href="${officialUrl}" target="_blank" rel="noreferrer"`
          : `div class="${rowClass}"`;
      const closingTag = isGuideLink ? "a" : officialUrl ? "a" : "div";
      return `
        <${rowTag}>
          <span class="doc-row-badge" aria-hidden="true">${isFormRow || isFeeRow ? badgeLabel : ""}</span>
          <span>${description}</span>
          <b>${name}</b>
          <em>${kindLabel}</em>
        </${closingTag}>
      `;
    })
    .join("");

  return `
    <div class="result-section">
      <strong>${resultSectionLabel("forms")}</strong>
      <div class="compact-fees">${rows}</div>
    </div>
  `;
}

function formAndTaxUrls(route) {
  const details = routeFormsAndTaxesFor(route?.id);
  if (!details) return new Set();
  return new Set(
    [...(details.forms || []), ...(details.taxes || [])]
      .map((row) => formHelpers[row[3]]?.officialUrl)
      .filter(Boolean)
  );
}

function renderRoadmapLinks(linkTypes, excludedUrls = new Set()) {
  const links = renderRouteLinks(linkTypes || "", excludedUrls);
  if (!links) return "";

  return `
    <div class="result-section route-links-note">
      <strong>${t("officialLinks")}</strong>
      <div class="province-links">${links}</div>
    </div>
  `;
}

function renderSafetyWingBlock(routeId) {
  if (routeId !== "digital-nomad") return "";
  const swUrl = "https://safetywing.com/?referenceID=26543349&utm_source=26543349&utm_medium=Ambassador";
  if (currentLang === "es") {
    return `
      <div class="result-section safetywing-block">
        <div class="safetywing-header">
          <a href="${swUrl}" target="_blank" rel="noreferrer sponsored" class="insurance-logo" style="background:linear-gradient(135deg,#FF6B35,#E54A1A);border-radius:12px;color:#fff;text-decoration:none;">SafetyWing</a>
          <strong>Seguro de salud para tu estancia</strong>
        </div>
        <p>La mayoría de las vías de residencia — incluida la de nómada digital — exigen prueba de cobertura sanitaria en España. Para las solicitudes de visado, los consulados suelen exigir un seguro médico privado sin copagos y con una cobertura equivalente al sistema público español, así que consulta los requisitos concretos de tu consulado antes de contratar nada.</p>
        <p>Si aún estás en fase de planificación, o necesitas cobertura para viajes y el período previo a regularizar tu residencia, una opción que muchos trabajadores remotos usan es <a href="${swUrl}" target="_blank" rel="noreferrer sponsored">SafetyWing</a>, que ofrece seguros por suscripción diseñados para nómadas, además de planes de salud más completos. Compara lo que cubre cada plan con lo que exige tu vía.</p>
        <p class="safetywing-disclosure">Aviso: este es un enlace de afiliado. Si te registras a través de él, IberiGo recibe una pequeña comisión sin coste adicional para ti. Ayuda a mantener el sitio gratuito.</p>
      </div>
    `;
  }
  return `
    <div class="result-section safetywing-block">
      <div class="safetywing-header">
        <a href="${swUrl}" target="_blank" rel="noreferrer sponsored" class="insurance-logo" style="background:linear-gradient(135deg,#FF6B35,#E54A1A);border-radius:12px;color:#fff;text-decoration:none;">SafetyWing</a>
        <strong>Health insurance for your stay</strong>
      </div>
      <p>Most residence routes — including the digital nomad path — ask for proof of health coverage in Spain. For visa applications, consulates generally expect full private health insurance with no copayments and coverage equivalent to the Spanish public system, so check the specific requirements for your consulate before buying anything.</p>
      <p>If you're still in the planning phase, or you need coverage for travel and the gap before your residency is sorted, one option many remote workers use is <a href="${swUrl}" target="_blank" rel="noreferrer sponsored">SafetyWing</a>, which offers subscription-style insurance designed for nomads, plus more complete health plans. Compare what each plan covers against what your route requires.</p>
      <p class="safetywing-disclosure">Disclosure: this is an affiliate link. If you sign up through it, IberiGo earns a small commission at no extra cost to you. It helps keep the site free.</p>
    </div>
  `;
}

function renderRouteLinks(linkTypes, excludedUrls = new Set()) {
  const bankMeta = {
    en: {
      "bank-santander": { intro: "Large branch network and common for payroll, rent, and everyday local banking.", logo: "Santander" },
      "bank-bbva": { intro: "Strong digital setup with a mainstream Spanish current-account path.", logo: "BBVA" },
      "bank-caixabank": { intro: "Very visible across Spain with broad branch and ATM coverage.", logo: "CaixaBank" },
      "bank-sabadell": { intro: "Common expat-facing option in many parts of Spain, especially coastal areas.", logo: "Sabadell" },
      "bank-bankinter": { intro: "Digital-forward Spanish bank with standard resident-account options.", logo: "Bankinter" },
      "bank-revolut": { intro: "Useful starter option while you are still getting local paperwork in order.", logo: "Revolut" },
      "bank-bunq": { intro: "Flexible mobile-first starter option before moving to a traditional bank if needed.", logo: "bunq" },
      "bank-wise": { intro: "Multi-currency account with a Spanish IBAN. Good for sending money internationally at mid-market rates.", logo: "Wise", affiliate: true, disclosure: "Affiliate link — IberiGo earns a small commission if you sign up. No extra cost to you." }
    },
    es: {
      "bank-santander": { intro: "Gran red de oficinas y una opción muy común para nómina, alquiler y banca local diaria.", logo: "Santander" },
      "bank-bbva": { intro: "Ruta digital fuerte con una opción bancaria española muy habitual.", logo: "BBVA" },
      "bank-caixabank": { intro: "Muy presente en toda España con amplia cobertura de oficinas y cajeros.", logo: "CaixaBank" },
      "bank-sabadell": { intro: "Opción frecuente para expatriados en muchas zonas de España, sobre todo en la costa.", logo: "Sabadell" },
      "bank-bankinter": { intro: "Banco español con enfoque digital y opciones estándar para residentes.", logo: "Bankinter" },
      "bank-revolut": { intro: "Opción útil para empezar mientras todavía organizas la documentación local.", logo: "Revolut" },
      "bank-bunq": { intro: "Opción móvil flexible para empezar antes de pasar a un banco tradicional si lo necesitas.", logo: "bunq" },
      "bank-wise": { intro: "Cuenta multidivisa con IBAN español. Buena opción para transferencias internacionales al tipo de cambio real.", logo: "Wise", affiliate: true, disclosure: "Enlace de afiliado — IberiGo recibe una pequeña comisión si te registras. Sin coste adicional para ti." }
    },
  };
  const providerMeta = {
    en: {
      "provider-movistar": { intro: "Best overall coverage, especially in rural areas — but usually the priciest of the big carriers.", logo: "M" },
      "provider-vodafone": { intro: "Strong urban coverage and often English-speaking staff; pricier if you only need a short stay.", logo: "V" },
      "provider-orange": { intro: "Good coverage and competitive prepaid deals; activation usually needs a visit to a store.", logo: "Orange" },
      "provider-digi": { intro: "Cheapest of the main options, running on Orange's network at secondary priority; fewer stores.", logo: "DIGI" },
      "provider-o2": { intro: "Movistar's online-only budget brand on the same network: cheaper and simpler, but no stores or in-person help.", logo: "O2" },
      "provider-yoigo": { intro: "Part of the MasOrange group and now carried on Orange's network; cheaper than Orange, with fewer extras.", logo: "yoigo" },
      "provider-holafly": { intro: "Unlimited-data eSIM with instant setup and no Spanish ID needed; works out pricier for long stays.", logo: "H" },
      "provider-airalo": { intro: "Cheaper pay-as-you-go data and easier across several countries; setup is fiddlier than Holafly.", logo: "A" },
      "provider-nordvpn": { intro: "Fast, with a large server network; costs more per month than most alternatives.", logo: "N" },
      "provider-expressvpn": { intro: "Easiest to use and the most reliable for streaming; also the most expensive of the three.", logo: "E" },
      "provider-protonvpn": { intro: "The only one with a genuine free tier, though the free plan is slower with fewer locations.", logo: "P" }
    },
    es: {
      "provider-movistar": { intro: "La mejor cobertura general, sobre todo en zonas rurales, pero suele ser la más cara de las grandes.", logo: "M" },
      "provider-vodafone": { intro: "Cobertura urbana fuerte y personal que a menudo habla inglés; más cara si tu estancia es corta.", logo: "V" },
      "provider-orange": { intro: "Buena cobertura y tarifas prepago competitivas; la activación suele requerir ir a una tienda.", logo: "Orange" },
      "provider-digi": { intro: "La más barata de las principales, sobre la red de Orange con prioridad secundaria; menos tiendas.", logo: "DIGI" },
      "provider-o2": { intro: "La marca económica solo online de Movistar, sobre su misma red: más barata y simple, pero sin tiendas ni atención presencial.", logo: "O2" },
      "provider-yoigo": { intro: "Del grupo MasOrange y ya sobre la red de Orange; más barata que Orange, con menos extras.", logo: "yoigo" },
      "provider-holafly": { intro: "eSIM de datos ilimitados, configuración instantánea y sin DNI español; sale más cara en estancias largas.", logo: "H" },
      "provider-airalo": { intro: "Datos de pago por uso más baratos y más cómoda para varios países; la configuración es más engorrosa.", logo: "A" },
      "provider-nordvpn": { intro: "Rápida y con una red de servidores amplia; cuesta más al mes que la mayoría de alternativas.", logo: "N" },
      "provider-expressvpn": { intro: "La más fácil de usar y la más fiable para streaming; también la más cara de las tres.", logo: "E" },
      "provider-protonvpn": { intro: "La única con un nivel gratuito real, aunque el plan gratis es más lento y con menos ubicaciones.", logo: "P" }
    },
  };
  const jobsMeta = {
    en: {
      "jobs-empleate": { intro: "Free public portal combining vacancies from Spain's public employment system and collaborating job sites.", logo: "Empléate" },
      "jobs-sepe": { intro: "Official starting point for job-search guidance and links to the employment service in each autonomous community.", logo: "SEPE" },
      "jobs-eures": { intro: "EU mobility network with vacancies, EURES advisers, country guidance, and European Job Days.", logo: "EURES" },
      "jobs-infojobs": { intro: "Spain-focused general job board with a reusable candidate profile, detailed filters, and vacancy alerts.", logo: "InfoJobs" },
      "jobs-linkedin": { intro: "Combines job listings with recruiter and company networks; applications may use Easy Apply or the employer's site.", logo: "in" },
      "jobs-indeed": { intro: "Broad search across employers and job sites, with keyword, location, and remote-work filters.", logo: "Indeed" },
      "jobs-jobtoday": { intro: "Mobile-first option especially visible in hospitality, retail, and local services, with direct chat on many listings.", logo: "JOB TODAY" },
      "jobs-tecnoempleo": { intro: "Spain specialist for IT and telecom roles, with searches by technology, role, and location.", logo: "Tecno" },
      "jobs-englishjobs": { intro: "Narrower specialist board for roles in Spain advertised for English speakers, including jobs marked as not requiring Spanish.", logo: "English Jobs" },
      "jobs-language-assistants": { intro: "Official annual language-assistant programme for eligible university students and graduates from participating countries; rules vary by intake and country.", logo: "Education" }
    },
    es: {
      "jobs-empleate": { intro: "Portal público gratuito que reúne ofertas del Sistema Nacional de Empleo y de portales colaboradores.", logo: "Empléate" },
      "jobs-sepe": { intro: "Punto de partida oficial para orientación laboral y acceso al servicio de empleo de cada comunidad autónoma.", logo: "SEPE" },
      "jobs-eures": { intro: "Red europea de movilidad con ofertas, consejeros EURES, información por país y European Job Days.", logo: "EURES" },
      "jobs-infojobs": { intro: "Portal generalista centrado en España con perfil reutilizable, filtros detallados y alertas de ofertas.", logo: "InfoJobs" },
      "jobs-linkedin": { intro: "Combina ofertas con redes de empresas y selección; la candidatura puede hacerse con Easy Apply o en la web del empleador.", logo: "in" },
      "jobs-indeed": { intro: "Buscador amplio entre empresas y portales, con filtros por palabra clave, ubicación y trabajo remoto.", logo: "Indeed" },
      "jobs-jobtoday": { intro: "Opción móvil especialmente visible en hostelería, comercio y servicios locales, con chat directo en muchas ofertas.", logo: "JOB TODAY" },
      "jobs-tecnoempleo": { intro: "Portal español especializado en informática y telecomunicaciones, con búsqueda por tecnología, puesto y ubicación.", logo: "Tecno" },
      "jobs-englishjobs": { intro: "Portal especializado y más reducido para puestos en España dirigidos a angloparlantes, incluidos empleos que indican que no exigen español.", logo: "English Jobs" },
      "jobs-language-assistants": { intro: "Programa oficial anual para estudiantes universitarios y titulados de países participantes; las condiciones cambian según convocatoria y país.", logo: "Educación" }
    },
  };
  const insuranceMeta = {
    en: {
      "insurance-sanitas": { intro: "Major private health insurer in Spain with broad medical-network visibility.", logo: "Sanitas" },
      "insurance-adeslas": { intro: "Large health-insurance provider often considered by applicants comparing permit-friendly cover.", logo: "Adeslas" },
      "insurance-asisa": { intro: "Long-established Spanish health insurer with strong national reach.", logo: "ASISA" },
      "insurance-dkv": { intro: "Well-known health insurer with a strong private-health focus and digital services.", logo: "DKV" },
      "insurance-mapfre": { intro: "Large Spanish insurer with health policies alongside broader insurance products.", logo: "MAPFRE" }
    },
    es: {
      "insurance-sanitas": { intro: "Aseguradora sanitaria privada muy grande en España con amplia visibilidad de cuadro médico.", logo: "Sanitas" },
      "insurance-adeslas": { intro: "Gran aseguradora de salud que muchas personas comparan para coberturas útiles en trámites de residencia.", logo: "Adeslas" },
      "insurance-asisa": { intro: "Aseguradora sanitaria española consolidada con fuerte presencia nacional.", logo: "ASISA" },
      "insurance-dkv": { intro: "Aseguradora de salud conocida con foco fuerte en sanidad privada y servicios digitales.", logo: "DKV" },
      "insurance-mapfre": { intro: "Gran aseguradora española con pólizas de salud dentro de una oferta más amplia.", logo: "MAPFRE" }
    },
  };
  const travelMeta = {
    en: {
      "travel-spaininfo": { intro: "Spain's official tourism portal for destinations, ideas, and practical trip planning.", logo: "Spain" },
      "travel-renfe": { intro: "Main official rail option for long-distance and many domestic train journeys across Spain.", logo: "Renfe" },
      "travel-aena": { intro: "Official airport network portal for Spanish airports, terminals, and passenger information.", logo: "Aena" },
      "travel-alsa": { intro: "Major long-distance bus operator useful for routes not covered well by rail.", logo: "ALSA" },
      "travel-paradores": { intro: "Spain's iconic state-owned hotel network for distinctive stays across the country.", logo: "Paradores" }
    },
    es: {
      "travel-spaininfo": { intro: "Portal oficial de turismo de España para destinos, ideas y planificación práctica del viaje.", logo: "Spain" },
      "travel-renfe": { intro: "Principal opción oficial ferroviaria para larga distancia y muchos trayectos nacionales en España.", logo: "Renfe" },
      "travel-aena": { intro: "Portal oficial de la red aeroportuaria para aeropuertos españoles, terminales e información al pasajero.", logo: "Aena" },
      "travel-alsa": { intro: "Gran operador de autobús de larga distancia útil para rutas menos cubiertas por el tren.", logo: "ALSA" },
      "travel-paradores": { intro: "Red emblemática de hoteles públicos de España para alojamientos con carácter por todo el país.", logo: "Paradores" }
    },
  };
  const flightMeta = {
    en: {
      "flight-iberia": { intro: "Spain's flag carrier and a good direct-airline option when you want to book flights without a third-party layer.", logo: "Iberia" },
      "flight-google": { intro: "Very useful for comparing dates, routes, and price patterns before you choose where to book.", logo: "Google" },
      "flight-skyscanner": { intro: "Popular flight search tool for comparing many airlines and online travel agencies at once.", logo: "Sky" },
      "flight-kayak": { intro: "Well-known metasearch option for scanning routes, price ranges, and alternative airports.", logo: "KAYAK" },
      "flight-edreams": { intro: "Large Spain-based online travel agency often used for comparing and booking flights.", logo: "eDreams" }
    },
    es: {
      "flight-iberia": { intro: "La aerolínea de bandera de España y una buena opción directa si quieres reservar sin intermediarios.", logo: "Iberia" },
      "flight-google": { intro: "Muy útil para comparar fechas, rutas y patrones de precio antes de decidir dónde reservar.", logo: "Google" },
      "flight-skyscanner": { intro: "Buscador popular para comparar muchas aerolíneas y agencias online a la vez.", logo: "Sky" },
      "flight-kayak": { intro: "Opción conocida de metabuscador para revisar rutas, rangos de precio y aeropuertos alternativos.", logo: "KAYAK" },
      "flight-edreams": { intro: "Gran agencia de viajes online con base en España, muy usada para comparar y reservar vuelos.", logo: "eDreams" }
    },
  };
  const carMeta = {
    en: {
      "car-europcar": { intro: "Large European rental brand with strong airport and city coverage across Spain.", logo: "Europcar" },
      "car-sixt": { intro: "Well-known premium-leaning car hire option with many major Spanish pickup points.", logo: "SIXT" },
      "car-avis": { intro: "Long-established global rental brand with airport and city presence in Spain.", logo: "Avis" },
      "car-hertz": { intro: "Major international car-rental company with broad availability across Spain.", logo: "Hertz" }
    },
    es: {
      "car-europcar": { intro: "Gran marca europea de alquiler con buena cobertura en aeropuertos y ciudades de España.", logo: "Europcar" },
      "car-sixt": { intro: "Opción conocida de alquiler con perfil más prémium y muchos puntos de recogida en España.", logo: "SIXT" },
      "car-avis": { intro: "Marca internacional histórica de alquiler con presencia en aeropuertos y ciudades españolas.", logo: "Avis" },
      "car-hertz": { intro: "Gran compañía internacional de alquiler de coches con amplia disponibilidad en España.", logo: "Hertz" }
    },
  };
  const stayMeta = {
    en: {
      "stay-booking": { intro: "One of the biggest hotel-booking platforms for comparing stays across Spain.", logo: "Booking" },
      "stay-airbnb": { intro: "Popular for apartments, rooms, and longer or more home-style stays.", logo: "airbnb" },
      "stay-expedia": { intro: "Large online travel platform useful for hotels and broader trip bundling.", logo: "Expedia" },
      "stay-tripadvisor": { intro: "Useful for comparing reviews, neighborhoods, attractions, and stay ideas before booking.", logo: "Tripadvisor" }
    },
    es: {
      "stay-booking": { intro: "Una de las mayores plataformas de reserva hotelera para comparar estancias en España.", logo: "Booking" },
      "stay-airbnb": { intro: "Muy usada para apartamentos, habitaciones y estancias más tipo hogar.", logo: "airbnb" },
      "stay-expedia": { intro: "Gran plataforma de viajes online útil para hoteles y planificación más amplia.", logo: "Expedia" },
      "stay-tripadvisor": { intro: "Muy útil para comparar reseñas, zonas, atracciones e ideas de alojamiento antes de reservar.", logo: "Tripadvisor" }
    },
  };
  const hotelMeta = {
    en: {
      "hotel-melia": { intro: "One of Spain's most prominent hotel groups, with city, beach, and resort properties.", logo: "Meliá" },
      "hotel-nh": { intro: "Strong Spanish and European city-hotel chain often useful for practical urban stays.", logo: "NH" },
      "hotel-barcelo": { intro: "Large Spanish hotel group with a broad mix of city, island, and holiday properties.", logo: "Barceló" },
      "hotel-riu": { intro: "Spanish chain especially known for resort-style stays in beach destinations.", logo: "RIU" },
      "hotel-iberostar": { intro: "Major Spanish resort and beach-hotel brand with a wide national footprint.", logo: "Iberostar" },
      "hotel-marriott": { intro: "Global hotel group with many brands and a broad presence in Spain.", logo: "Marriott" },
      "hotel-hilton": { intro: "International hotel chain with upscale and business-oriented options in Spain.", logo: "Hilton" }
    },
    es: {
      "hotel-melia": { intro: "Uno de los grupos hoteleros más importantes de España, con hoteles urbanos, vacacionales y resorts.", logo: "Meliá" },
      "hotel-nh": { intro: "Cadena fuerte en hoteles urbanos de España y Europa, útil para estancias prácticas en ciudad.", logo: "NH" },
      "hotel-barcelo": { intro: "Gran grupo hotelero español con mezcla amplia de hoteles urbanos, insulares y vacacionales.", logo: "Barceló" },
      "hotel-riu": { intro: "Cadena española especialmente conocida por estancias de resort en destinos de playa.", logo: "RIU" },
      "hotel-iberostar": { intro: "Gran marca española de resorts y playa con fuerte presencia en el país.", logo: "Iberostar" },
      "hotel-marriott": { intro: "Grupo hotelero internacional con muchas marcas y amplia presencia en España.", logo: "Marriott" },
      "hotel-hilton": { intro: "Cadena hotelera internacional con opciones de categoría alta y de negocio en España.", logo: "Hilton" }
    },
  };
  const rentMeta = {
    en: {
      "rent-idealista": { intro: "Large property portal for comparing long-term rentals, areas, prices, and listings.", logo: "Idealista" },
      "rent-fotocasa": { intro: "Popular Spanish property portal for rental listings and neighborhood comparisons.", logo: "Fotocasa" },
      "rent-habitaclia": { intro: "Useful rental-search portal, especially visible in many coastal and Catalan-market searches.", logo: "Habitaclia" }
    },
    es: {
      "rent-idealista": { intro: "Gran portal inmobiliario para comparar alquileres, zonas, precios y anuncios.", logo: "Idealista" },
      "rent-fotocasa": { intro: "Portal inmobiliario español muy usado para anuncios de alquiler y comparación de zonas.", logo: "Fotocasa" },
      "rent-habitaclia": { intro: "Portal de búsqueda de alquiler útil, con bastante presencia en zonas costeras y Cataluña.", logo: "Habitaclia" }
    },
  };
  const linkLabels = {
    en: {
      cita: "Book an appointment",
      "eu-certificate": "EU registration certificate",
      nie: "NIE assignment",
      fnmt: "FNMT digital certificate",
      clave: "Cl@ve registration",
      schengen: "Check visa or ETIAS requirement",
      ees: "Entry/Exit System (EES)",
      calculator: "Official EU 90/180 calculator",
      "eu-short-stay": "Spain: stays up to 3 months",
      "work-employed": "Employee work in Spain",
      "work-self-employed": "Self-employed work in Spain",
      "digital-nomad-official": "International telework route",
      "non-lucrative-official": "Non-lucrative residence",
      "study-official": "Study stay authorization",
      "family-official": "Family reunification",
      "eu-family-official": "EU-family residence card",
      "eu-family-spain": "Registering non-EU family members",
      "eu-family-entry": "Travel documents for non-EU family members",
      "tie-form": "EX-17 TIE card form",
      "790-012": "Generate 790-012",
      "padron-info": "Find your town hall",
      "social-security-number": "Request Social Security number",
      "bank-santander": "Banco Santander",
      "bank-bbva": "BBVA",
      "bank-caixabank": "CaixaBank",
      "bank-sabadell": "Banco Sabadell",
      "bank-bankinter": "Bankinter",
      "bank-revolut": "Revolut",
      "bank-bunq": "bunq",
      "bank-wise": "Wise",
      "rent-law-boe": "Urban Leases Act (BOE)",
      "rent-idealista": "Idealista rentals",
      "rent-fotocasa": "Fotocasa rentals",
      "rent-habitaclia": "Habitaclia rentals",
      "provider-movistar": "Movistar",
      "provider-vodafone": "Vodafone",
      "provider-orange": "Orange",
      "provider-digi": "DIGI",
      "provider-o2": "O2",
      "provider-yoigo": "Yoigo",
      "jobs-empleate": "Empléate job portal",
      "jobs-sepe": "SEPE job search",
      "jobs-eures": "EURES Spain",
      "jobs-infojobs": "InfoJobs",
      "jobs-linkedin": "LinkedIn Jobs",
      "jobs-indeed": "Indeed",
      "jobs-jobtoday": "JOB TODAY",
      "jobs-tecnoempleo": "Tecnoempleo",
      "jobs-englishjobs": "EnglishJobs.es",
      "jobs-language-assistants": "Language assistants in Spain",
      "insurance-sanitas": "Sanitas",
      "insurance-adeslas": "Adeslas",
      "insurance-asisa": "ASISA",
      "insurance-dkv": "DKV",
      "insurance-mapfre": "MAPFRE Salud",
      "travel-spaininfo": "Spain tourism",
      "travel-renfe": "Renfe trains",
      "travel-aena": "Aena airports",
      "travel-alsa": "ALSA buses",
      "travel-paradores": "Paradores",
      "flight-iberia": "Iberia flights",
      "flight-google": "Google Flights",
      "flight-skyscanner": "Skyscanner",
      "flight-kayak": "KAYAK flights",
      "flight-edreams": "eDreams flights",
      "car-europcar": "Europcar",
      "car-sixt": "SIXT",
      "car-avis": "Avis",
      "car-hertz": "Hertz",
      "stay-booking": "Booking.com",
      "stay-airbnb": "Airbnb",
      "stay-expedia": "Expedia Hotels",
      "stay-tripadvisor": "Tripadvisor",
      "hotel-melia": "Meliá Hotels",
      "hotel-nh": "NH Hotels",
      "hotel-barcelo": "Barceló Hotels",
      "hotel-riu": "RIU Hotels",
      "hotel-iberostar": "Iberostar Hotels",
      "hotel-marriott": "Marriott Hotels",
      "hotel-hilton": "Hilton Hotels",
      "tax-agency": "Tax Agency portal",
      "tax-census": "Tax census and address details",
      "healthcare-right-spain": "Request healthcare entitlement in Spain",
      "valencia-health-card": "Valencian Community: SIP card",
      "madrid-health-card": "Madrid: Tarjeta Sanitaria Individual",
      "andalucia-health-card": "Andalusia: Tarjeta sanitaria",
      "cataluna-health-card": "Catalonia: TSI",
      "murcia-health-card": "Murcia: Tarjeta Sanitaria Individual",
      "ehic-card": "Request or renew EHIC",
      "citizenship-residence": "Spanish citizenship by residence",
      "citizenship-application": "Citizenship application portal",
      "fnmt-aeat-cita": "FNMT appointment via Tax Agency",
      "fnmt-ss-cita": "FNMT appointment via Social Security",
      "vida-laboral-official": "Informe de Vida Laboral",
      "clave-setup": "Cl@ve setup",
      "dgt-licence-exchange": "DGT licence exchange portal",
      "dgt-bilateral-agreements": "DGT bilateral agreements list",
      "ehic-eu-info": "European Health Insurance Card information",
      "dgt-general": "DGT — Dirección General de Tráfico",
      "dgt-online-procedures": "DGT online procedures",
      "provider-holafly": "Holafly",
      "provider-airalo": "Airalo",
      "provider-nordvpn": "NordVPN",
      "provider-expressvpn": "ExpressVPN",
      "provider-protonvpn": "ProtonVPN"
    },
    es: {
      cita: "Reservar cita previa",
      "eu-certificate": "Certificado de registro de ciudadano de la UE",
      nie: "Asignación de NIE",
      fnmt: "Certificado digital FNMT",
      clave: "Registro en Cl@ve",
      schengen: "Comprobar visado o ETIAS",
      ees: "Sistema de Entradas y Salidas (EES)",
      calculator: "Calculadora oficial UE 90/180",
      "eu-short-stay": "España: estancias de hasta 3 meses",
      "work-employed": "Trabajo por cuenta ajena en España",
      "work-self-employed": "Trabajo por cuenta propia en España",
      "digital-nomad-official": "Ruta de teletrabajo internacional",
      "non-lucrative-official": "Residencia no lucrativa",
      "study-official": "Autorización de estancia por estudios",
      "family-official": "Reagrupación familiar",
      "eu-family-official": "Tarjeta de familiar de ciudadano de la UE",
      "eu-family-spain": "Inscripción de familiares no comunitarios",
      "eu-family-entry": "Documentos de viaje para familiares no comunitarios",
      "tie-form": "Formulario EX-17 para TIE",
      "790-012": "Generar 790-012",
      "padron-info": "Encontrar tu ayuntamiento",
      "social-security-number": "Solicitar número de la Seguridad Social",
      "bank-santander": "Banco Santander",
      "bank-bbva": "BBVA",
      "bank-caixabank": "CaixaBank",
      "bank-sabadell": "Banco Sabadell",
      "bank-bankinter": "Bankinter",
      "bank-revolut": "Revolut",
      "bank-bunq": "bunq",
      "bank-wise": "Wise",
      "rent-law-boe": "Ley de Arrendamientos Urbanos (BOE)",
      "rent-idealista": "Alquileres en Idealista",
      "rent-fotocasa": "Alquileres en Fotocasa",
      "rent-habitaclia": "Alquileres en Habitaclia",
      "provider-movistar": "Movistar",
      "provider-vodafone": "Vodafone",
      "provider-orange": "Orange",
      "provider-digi": "DIGI",
      "provider-o2": "O2",
      "provider-yoigo": "Yoigo",
      "jobs-empleate": "Portal de empleo Empléate",
      "jobs-sepe": "Buscador de empleo SEPE",
      "jobs-eures": "EURES España",
      "jobs-infojobs": "InfoJobs",
      "jobs-linkedin": "LinkedIn Jobs",
      "jobs-indeed": "Indeed",
      "jobs-jobtoday": "JOB TODAY",
      "jobs-tecnoempleo": "Tecnoempleo",
      "jobs-englishjobs": "EnglishJobs.es",
      "jobs-language-assistants": "Auxiliares de conversación en España",
      "insurance-sanitas": "Sanitas",
      "insurance-adeslas": "Adeslas",
      "insurance-asisa": "ASISA",
      "insurance-dkv": "DKV",
      "insurance-mapfre": "MAPFRE Salud",
      "travel-spaininfo": "Turismo de España",
      "travel-renfe": "Trenes Renfe",
      "travel-aena": "Aeropuertos Aena",
      "travel-alsa": "Autobuses ALSA",
      "travel-paradores": "Paradores",
      "flight-iberia": "Vuelos Iberia",
      "flight-google": "Google Flights",
      "flight-skyscanner": "Skyscanner",
      "flight-kayak": "Vuelos KAYAK",
      "flight-edreams": "Vuelos eDreams",
      "car-europcar": "Europcar",
      "car-sixt": "SIXT",
      "car-avis": "Avis",
      "car-hertz": "Hertz",
      "stay-booking": "Booking.com",
      "stay-airbnb": "Airbnb",
      "stay-expedia": "Hoteles Expedia",
      "stay-tripadvisor": "Tripadvisor",
      "hotel-melia": "Hoteles Meliá",
      "hotel-nh": "NH Hotels",
      "hotel-barcelo": "Hoteles Barceló",
      "hotel-riu": "Hoteles RIU",
      "hotel-iberostar": "Hoteles Iberostar",
      "hotel-marriott": "Hoteles Marriott",
      "hotel-hilton": "Hoteles Hilton",
      "tax-agency": "Portal de la Agencia Tributaria",
      "tax-census": "Censo y domicilio fiscal",
      "healthcare-right-spain": "Solicitar asistencia sanitaria en España",
      "valencia-health-card": "Comunitat Valenciana: tarjeta SIP",
      "madrid-health-card": "Madrid: Tarjeta Sanitaria Individual",
      "andalucia-health-card": "Andalucía: Tarjeta sanitaria",
      "cataluna-health-card": "Cataluña: TSI",
      "murcia-health-card": "Murcia: Tarjeta Sanitaria Individual",
      "ehic-card": "Solicitar o renovar la Tarjeta Sanitaria Europea",
      "citizenship-residence": "Nacionalidad española por residencia",
      "citizenship-application": "Portal de solicitud de nacionalidad",
      "fnmt-aeat-cita": "Cita FNMT por Agencia Tributaria",
      "fnmt-ss-cita": "Cita FNMT por Seguridad Social",
      "vida-laboral-official": "Informe de Vida Laboral",
      "clave-setup": "Configurar Cl@ve",
      "dgt-licence-exchange": "Portal de canje de permisos de la DGT",
      "dgt-bilateral-agreements": "Lista de acuerdos bilaterales de la DGT",
      "ehic-eu-info": "Información sobre la Tarjeta Sanitaria Europea",
      "dgt-general": "DGT — Dirección General de Tráfico",
      "dgt-online-procedures": "Sede electrónica de la DGT",
      "provider-holafly": "Holafly",
      "provider-airalo": "Airalo",
      "provider-nordvpn": "NordVPN",
      "provider-expressvpn": "ExpressVPN",
      "provider-protonvpn": "ProtonVPN"
    },
  };
  const urls = {
    cita: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus/language/es_ES",
    "eu-certificate": "https://sede.policia.gob.es/portalCiudadano/_en/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php",
    nie: "https://sede.policia.gob.es/portalCiudadano/_en/tramites_extranjeria_tramite_asignacion_nie.php",
    fnmt: "https://www.sede.fnmt.gob.es/certificados/persona-fisica",
    "fnmt-aeat-cita": "https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion",
    "fnmt-ss-cita": "https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=CPMSWACS&ORGANISMO=I",
    clave: "https://clave.gob.es/clave_Home/registro/Como-puedo-registrarme.html",
    schengen: "https://travel-europe.europa.eu/en/etias/about-etias/who-should-apply",
    ees: "https://travel-europe.europa.eu/ees_en",
    calculator: "https://ec.europa.eu/assets/home/visa-calculator-2/calculator.htm?lang=en",
    "eu-short-stay": "https://administracion.gob.es/pag_Home/es/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/estancia.html",
    "work-employed": "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-inicial-de-residencia-temporal-y-trabajo-por-cuenta-ajena-hi-16-",
    "work-self-employed": "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-inicial-de-residencia-temporal-y-trabajo-por-cuenta-propia",
    "digital-nomad-official": "https://prie.comercio.gob.es/es-es/Paginas/Teletrabajadores-caracter-internacional.aspx",
    "non-lucrative-official": "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-inicial-de-residencia-temporal-no-lucrativa",
    "study-official": "https://www.inclusion.gob.es/web/migraciones/w/estancia-por-estudios",
    "family-official": "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-de-residencia-temporal-por-reagrupacion-familiar",
    "eu-family-official": "https://www.inclusion.gob.es/web/migraciones/w/62.-tarjeta-de-residencia-de-familiar-de-ciudadano-de-la-union-europea",
    "eu-family-spain": "https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/obtencion-residencia/inscribir-familiares-no-ue.html",
    "eu-family-entry": "https://europa.eu/youreurope/citizens/travel/entry-exit/non-eu-family/index_en.htm",
    "tie-form": "https://www.inclusion.gob.es/documents/410169/2156469/17-Formulario_TIE.pdf",
    "790-012": "https://sede.policia.gob.es/Tasa790_012/",
    "padron-info": "https://administracion.gob.es/pagFront/espanaAdmon/directorioOrganigrama/entidadesLocales/entidadesLocales.htm",
    "social-security-number": "https://sede.seg-social.gob.es/wps/portal/sede/sede/Ciudadanos/afiliacion%20e%20inscripcion/202088/",
    "bank-santander": "https://www.bancosantander.es/particulares",
    "bank-bbva": "https://www.bbva.es/personas.html",
    "bank-caixabank": "https://www.caixabank.es/particular/home/particulares_es.html",
    "bank-sabadell": "https://www.bancsabadell.com/bsnacional/es/",
    "bank-bankinter": "https://www.bankinter.com/",
    "bank-revolut": "https://www.revolut.com/es-ES/",
    "bank-bunq": "https://www.bunq.com/es-es/about/bunq-in-spain",
    "bank-wise": "https://wise.prf.hn/click/camref:1011l5KaZk",
    "rent-law-boe": "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003",
    "rent-idealista": "https://www.idealista.com/",
    "rent-fotocasa": "https://www.fotocasa.es/",
    "rent-habitaclia": "https://www.habitaclia.com/",
    "provider-movistar": "https://www.movistar.es/",
    "provider-vodafone": "https://www.vodafone.es/c/particulares/es/",
    "provider-orange": "https://www.orange.es/",
    "provider-digi": "https://www.digimobil.es/",
    "provider-o2": "https://o2online.es/",
    "provider-yoigo": "https://www.yoigo.com/",
    "jobs-empleate": "https://coeestatal.sepe.es/coe-estatal/servicios/servicio-red/empleate.html",
    "jobs-sepe": "https://sepe.es/HomeSepe/encontrar-trabajo/ofertas-empleo.html",
    "jobs-eures": "https://eures.europa.eu/index_es",
    "jobs-infojobs": "https://candidatos.infojobs.net/",
    "jobs-linkedin": "https://es.linkedin.com/jobs",
    "jobs-indeed": "https://es.indeed.com/",
    "jobs-jobtoday": "https://jobtoday.com/es",
    "jobs-tecnoempleo": "https://www.tecnoempleo.com/",
    "jobs-englishjobs": "https://englishjobs.es/",
    "jobs-language-assistants": "https://aee.educacionfpydeportes.gob.es/oportunidades/todas/auxiliares-conversacion/extranjeros.html",
    "insurance-sanitas": "https://www.sanitas.es/seguros/seguros-medicos-privados",
    "insurance-adeslas": "https://www.seguros.adeslas.es/salud/",
    "insurance-asisa": "https://www.asisa.es/seguros-medicos",
    "insurance-dkv": "https://dkv.es/particulares/seguros-de-salud",
    "insurance-mapfre": "https://www.mapfre.es/particulares/seguros-de-salud/",
    "insurance-safetywing": "https://safetywing.com/?referenceID=26543349&utm_source=26543349&utm_medium=Ambassador",
    "vida-laboral-official": "https://sede.seg-social.gob.es",
    "clave-setup": "https://clave.gob.es",
    "dgt-licence-exchange": "https://sede.dgt.gob.es",
    "dgt-bilateral-agreements": "https://sede.dgt.gob.es",
    "travel-spaininfo": "https://www.spain.info/es/",
    "travel-renfe": "https://www.renfe.com/es/en",
    "travel-aena": "https://www.aena.es/en/passengers/passengers.html",
    "travel-alsa": "https://www.alsa.es/en/web/bus/home",
    "travel-paradores": "https://paradores.es/es/paradores",
    "flight-iberia": "https://www.iberia.com/es/flight-search-engine/",
    "flight-google": "https://www.google.com/travel/flights?hl=en",
    "flight-skyscanner": "https://www.skyscanner.com/flights",
    "flight-kayak": "https://www.kayak.es/flights",
    "flight-edreams": "https://www.edreams.es/",
    "car-europcar": "https://www.europcar.com/en-us/places/car-rental-spain",
    "car-sixt": "https://www.sixt.com/car-rental/spain/",
    "car-avis": "https://www.avis.com/en/locations/es",
    "car-hertz": "https://www.hertz.com/us/en/location/spain",
    "stay-booking": "https://www.booking.com/",
    "stay-airbnb": "https://www.airbnb.com/s/Spain/homes",
    "stay-expedia": "https://www.expedia.es/Hoteles",
    "stay-tripadvisor": "https://www.tripadvisor.com/Tourism-g187427-Spain-Vacations.html",
    "hotel-melia": "https://www.melia.com/",
    "hotel-nh": "https://www.nh-hotels.com/en/hotels/spain",
    "hotel-barcelo": "https://www.barcelo.com/en-gb/hotels/spain/",
    "hotel-riu": "https://www.riu.com/en/hotels/europe/spain",
    "hotel-iberostar": "https://www.iberostar.com/en/hotels/spain/",
    "hotel-marriott": "https://www.marriott.com/en-us/destinations/spain.mi",
    "hotel-hilton": "https://www.hilton.com/en/locations/spain/",
    "tax-agency": "https://sede.agenciatributaria.gob.es/Sede/en_gb/inicio.html",
    "tax-census": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal.html",
    "healthcare-right-spain": "https://prestaciones.seg-social.es/servicio/asistencia-sanitaria-gestion-beneficiarios.html",
    "valencia-health-card": "https://www.san.gva.es/es/web/tarjeta-sanitaria/tarjeta-sanitaria-individual",
    "madrid-health-card": "https://www.comunidad.madrid/servicios/salud/tarjeta-sanitaria",
    "andalucia-health-card": "https://www.juntadeandalucia.es/organismos/sanidadpresidenciayemergencias/areas/sanidad/sistema-sanitario/derechos-garantias/paginas/tarjeta-sanitaria-sspa.html",
    "cataluna-health-card": "https://catsalut.gencat.cat/ca/coneix-catsalut/acces-sistema-salut/la-tsi/",
    "murcia-health-card": "https://www.carm.es/web/servlet/pagina?IDCONTENIDO=67&IDESTRUCTURAJERARQUICA=4762&IDTIPO=200&RASTRO=c%24m120%2C121&__PLANT_PERSONALIZADA=%2FJSP%2FCARM%2Fcarm2018%2Forganigramas%2FplantillaDetalleOrganigrama.jsp",
    "ehic-card": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10938/11566/1761?changeLanguage=es",
    "citizenship-residence": "https://www.mjusticia.gob.es/es/ciudadania/tramites/nacionalidad-residencia",
    "citizenship-application": "https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola/",
    "ehic-eu-info": "https://ec.europa.eu/social/main.jsp?catId=559",
    "dgt-general": "https://www.dgt.es",
    "dgt-online-procedures": "https://sede.dgt.gob.es",
    "provider-holafly": "https://esim.holafly.com/",
    "provider-airalo": "https://www.airalo.com/spain-esim",
    "provider-nordvpn": "https://nordvpn.com/",
    "provider-expressvpn": "https://www.expressvpn.com/",
    "provider-protonvpn": "https://protonvpn.com/"
  };
  const govMeta = {
    cita: {
      subtitle: currentLang === "es" ? "Sede oficial de la Administración" : "Official government appointment portal",
      variant: "general",
      system: "spain"
    },
    "790-012": {
      subtitle: currentLang === "es" ? "Generador oficial de tasas de la Policía" : "Official Police fee generator",
      variant: "fee",
      system: "spain"
    },
    "social-security-number": {
      subtitle: currentLang === "es" ? "Trámite oficial de la Seguridad Social" : "Official Social Security procedure",
      variant: "social",
      system: "spain"
    },
    "healthcare-right-spain": {
      subtitle: currentLang === "es" ? "Acceso oficial a asistencia sanitaria" : "Official healthcare entitlement route",
      variant: "health",
      system: "spain"
    },
    "valencia-health-card": {
      subtitle: currentLang === "es" ? "Información oficial sanitaria autonómica" : "Official regional health-card information",
      variant: "health",
      system: "spain"
    },
    "madrid-health-card": {
      subtitle: currentLang === "es" ? "Información oficial sanitaria autonómica" : "Official regional health-card information",
      variant: "health",
      system: "spain"
    },
    "andalucia-health-card": {
      subtitle: currentLang === "es" ? "Información oficial sanitaria autonómica" : "Official regional health-card information",
      variant: "health",
      system: "spain"
    },
    "cataluna-health-card": {
      subtitle: currentLang === "es" ? "Información oficial sanitaria autonómica" : "Official regional health-card information",
      variant: "health",
      system: "spain"
    },
    "murcia-health-card": {
      subtitle: currentLang === "es" ? "Información oficial sanitaria autonómica" : "Official regional health-card information",
      variant: "health",
      system: "spain"
    },
    "ehic-card": {
      subtitle: currentLang === "es" ? "Solicitud oficial de Tarjeta Sanitaria Europea" : "Official EHIC request",
      variant: "health",
      system: "spain"
    },
    "tax-agency": {
      subtitle: currentLang === "es" ? "Sede oficial de la Agencia Tributaria" : "Official Tax Agency portal",
      variant: "fee",
      system: "spain"
    },
    "tax-census": {
      subtitle: currentLang === "es" ? "Trámite oficial de censo y domicilio fiscal" : "Official tax census and address procedure",
      variant: "fee",
      system: "spain"
    },
    "jobs-empleate": {
      subtitle: currentLang === "es" ? "Portal público gratuito con ofertas del Sistema Nacional de Empleo y portales colaboradores" : "Free public portal with vacancies from Spain's public employment system and collaborating job sites",
      variant: "social",
      system: "spain"
    },
    "jobs-sepe": {
      subtitle: currentLang === "es" ? "Orientación laboral oficial y acceso al servicio de empleo de cada comunidad autónoma" : "Official job-search guidance and access to each autonomous community's employment service",
      variant: "social",
      system: "spain"
    },
    "jobs-eures": {
      subtitle: currentLang === "es" ? "Ofertas, consejeros EURES, información por país y European Job Days" : "Vacancies, EURES advisers, country guidance, and European Job Days",
      variant: "eu",
      system: "eu"
    },
    "jobs-language-assistants": {
      subtitle: currentLang === "es" ? "Programa anual para estudiantes universitarios y titulados de países participantes; consulta cada convocatoria" : "Annual programme for eligible university students and graduates from participating countries; check each intake",
      variant: "social",
      system: "spain"
    }
  };
  const govDomains = [
    "inclusion.gob.es",
    "administracion.gob.es",
    "sede.administracionespublicas.gob.es",
    "seg-social.es",
    "prestaciones.seg-social.es",
    "seg-social.gob.es",
    "sede.seg-social.gob.es",
    "sede.policia.gob.es",
    "mjusticia.gob.es",
    "sede.mjusticia.gob.es",
    "clave.gob.es",
    "fnmt.gob.es",
    "sede.fnmt.gob.es",
    "educacionfpydeportes.gob.es",
    "dgt.gob.es",
    "sede.dgt.gob.es",
    "dgt.es",
    "boe.es",
    "sepe.es",
    "agenciatributaria.gob.es",
    "sede.agenciatributaria.gob.es",
    "san.gva.es",
    "comunidad.madrid",
    "juntadeandalucia.es",
    "catsalut.gencat.cat",
    "carm.es"
  ];
  const genericGovMeta = {
    subtitle:
      currentLang === "es"
        ? "Web oficial del Gobierno de España"
        : "Official Spain government website",
    variant: "general",
    system: "spain"
  };
  const euDomains = [
    "europa.eu",
    "ec.europa.eu",
    "travel-europe.europa.eu",
    "home-affairs.ec.europa.eu"
  ];
  const genericEuMeta = {
    subtitle:
      currentLang === "es"
        ? "Sitio oficial de la Unión Europea"
        : "Official European Union website",
    variant: "eu",
    system: "eu"
  };
  const sourceCategoryMeta = {
    government: {
      tag: currentLang === "es" ? "Gobierno de España" : "Spanish Government",
      initials: "ES"
    },
    police: {
      tag: currentLang === "es" ? "Policía Nacional" : "Policía Nacional",
      initials: "PN"
    },
    eu: {
      tag: currentLang === "es" ? "Unión Europea" : "European Union",
      initials: "EU"
    },
    tax: {
      tag: currentLang === "es" ? "Agencia Tributaria" : "Tax Agency",
      initials: "AT"
    },
    "social-security": {
      tag: currentLang === "es" ? "Seguridad Social" : "Social Security",
      initials: "SS"
    },
    traffic: {
      tag: currentLang === "es" ? "Dirección General de Tráfico" : "Traffic Authority",
      initials: "DGT"
    },
    healthcare: {
      tag: currentLang === "es" ? "Servicio autonómico de salud" : "Regional health authority",
      initials: "SAL"
    },
    municipal: {
      tag: currentLang === "es" ? "Ayuntamiento / Gobierno local" : "Town Hall / Local Government",
      initials: "LOC"
    },
    generic: {
      tag: currentLang === "es" ? "Fuente oficial" : "Official Source",
      initials: "OS"
    }
  };
  const categoryForOfficialLink = (type, url) => {
    const host = (() => {
      try {
        return new URL(url).hostname;
      } catch {
        return "";
      }
    })();
    const endsWith = (domain) => host === domain || host.endsWith(`.${domain}`);
    if (type === "cita" || type === "790-012" || endsWith("policia.gob.es")) return "police";
    if (type === "tax-agency" || type === "tax-census" || endsWith("agenciatributaria.gob.es")) return "tax";
    if (type === "social-security-number" || type === "vida-laboral-official" || type === "clave-setup" || endsWith("seg-social.es") || endsWith("seg-social.gob.es")) return "social-security";
    if (type === "dgt-licence-exchange" || type === "dgt-bilateral-agreements" || type === "dgt-general" || type === "dgt-online-procedures" || endsWith("dgt.gob.es") || endsWith("dgt.es")) return "traffic";
    if (type === "healthcare-right-spain" || type === "ehic-card" || /health-card$/.test(type) || endsWith("san.gva.es") || endsWith("comunidad.madrid") || endsWith("juntadeandalucia.es") || endsWith("catsalut.gencat.cat") || endsWith("carm.es")) return "healthcare";
    if (type === "jobs-eures" || isOfficialEuUrl(url)) return "eu";
    if (type === "padron-info") return "municipal";
    if (isOfficialSpanishGovUrl(url)) return "government";
    return "generic";
  };
  const isOfficialSpanishGovUrl = (url) => {
    try {
      const host = new URL(url).hostname;
      return govDomains.some((domain) => host === domain || host.endsWith(`.${domain}`));
    } catch {
      return false;
    }
  };
  const isOfficialEuUrl = (url) => {
    try {
      const host = new URL(url).hostname;
      return euDomains.some((domain) => host === domain || host.endsWith(`.${domain}`));
    } catch {
      return false;
    }
  };
  const isOfficialLinkType = (type) => {
    const url = urls[type];
    return Boolean(govMeta[type]) || isOfficialSpanishGovUrl(url) || isOfficialEuUrl(url);
  };
  const sortedLinkTypes = [...linkTypes].sort((first, second) => {
    const firstIsOfficial = isOfficialLinkType(first);
    const secondIsOfficial = isOfficialLinkType(second);
    if (firstIsOfficial === secondIsOfficial) return 0;
    return firstIsOfficial ? -1 : 1;
  });

  return sortedLinkTypes
    .map((type) => {
      if (!urls[type]) return "";
      if (excludedUrls.has(urls[type])) return "";
      const label = linkLabels[currentLang]?.[type] || linkLabels.en[type] || type;
      const govStyleMeta =
        govMeta[type] ||
        (isOfficialSpanishGovUrl(urls[type]) ? genericGovMeta : null) ||
        (isOfficialEuUrl(urls[type]) ? genericEuMeta : null);
      if (govStyleMeta) {
        const meta = govStyleMeta;
        const category = categoryForOfficialLink(type, urls[type]);
        const sourceMeta = sourceCategoryMeta[category] || sourceCategoryMeta.generic;
        return `
          <a class="gov-link guide-source-card guide-source-card--${category}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="guide-source-head">
              <span class="guide-source-badge" aria-hidden="true">${sourceMeta.initials}</span>
              <span class="guide-source-tag">${sourceMeta.tag}</span>
            </span>
            <span class="guide-source-title">${label}</span>
            <span class="guide-source-description">${meta.subtitle}</span>
          </a>
        `;
      }
      if (type.startsWith("bank-")) {
        const meta = bankMeta[currentLang]?.[type] || bankMeta.en[type];
        const brandClass = `bank-link bank-link--${type.replace("bank-", "")}`;
        const rel = meta?.affiliate ? "noreferrer sponsored" : "noreferrer";
        const disclosure = meta?.affiliate
          ? `<span class="affiliate-disclosure">${meta.disclosure}</span>`
          : "";
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="${rel}">
            <span class="bank-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
            ${disclosure}
          </a>
        `;
      }
      if (type.startsWith("rent-") && type !== "rent-law-boe") {
        const meta = rentMeta[currentLang]?.[type] || rentMeta.en[type];
        const brandClass = `rent-link rent-link--${type.replace("rent-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="rent-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("provider-")) {
        const meta = providerMeta[currentLang]?.[type] || providerMeta.en[type];
        const brandClass = `provider-link provider-link--${type.replace("provider-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="provider-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("jobs-")) {
        const meta = jobsMeta[currentLang]?.[type] || jobsMeta.en[type];
        const jobsStyle = type === "jobs-englishjobs" ? "linkedin" : type.replace("jobs-", "");
        const brandClass = `jobs-link jobs-link--${jobsStyle}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="jobs-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("insurance-")) {
        const meta = insuranceMeta[currentLang]?.[type] || insuranceMeta.en[type];
        const brandClass = `insurance-link insurance-link--${type.replace("insurance-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="insurance-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("travel-")) {
        const meta = travelMeta[currentLang]?.[type] || travelMeta.en[type];
        const brandClass = `travel-link travel-link--${type.replace("travel-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="travel-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("flight-")) {
        const meta = flightMeta[currentLang]?.[type] || flightMeta.en[type];
        const brandClass = `flight-link flight-link--${type.replace("flight-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="flight-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("car-")) {
        const meta = carMeta[currentLang]?.[type] || carMeta.en[type];
        const brandClass = `car-link car-link--${type.replace("car-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="car-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("stay-")) {
        const meta = stayMeta[currentLang]?.[type] || stayMeta.en[type];
        const brandClass = `stay-link stay-link--${type.replace("stay-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="stay-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      if (type.startsWith("hotel-")) {
        const meta = hotelMeta[currentLang]?.[type] || hotelMeta.en[type];
        const brandClass = `hotel-link hotel-link--${type.replace("hotel-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="hotel-logo" aria-hidden="true">${meta?.logo || label}</span>
            <strong>${label}</strong>
            <span>${meta?.intro || ""}</span>
          </a>
        `;
      }
      return `<a href="${urls[type]}" target="_blank" rel="noreferrer">${label}</a>`;
    })
    .filter(Boolean)
    .join("");
}

function setWizardFromPreset(preset) {
  if (preset === "moving") {
    currentDirectRoute = null;
    currentEntryPreset = "moving";
    showRouteFinder();
    wizardPanel?.classList.remove("is-vacation-flow");
    clearWizardSelections();
    wizard.dataset.step = "person";
    checked("duration", "long");
    result.hidden = true;
    updateQuestionVisibility();
    setCurrentScreenState({
      type: "wizard",
      entryPreset: currentEntryPreset,
      step: wizard.dataset.step,
      selections: wizardSelectionState()
    });
    wizard.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (preset === "living") {
    currentEntryPreset = "living";
    wizardPanel?.classList.remove("is-vacation-flow");
    showDirectGuide();
    clearWizardSelections();
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderLivingSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (preset === "vacation") {
    currentEntryPreset = "vacation";
    wizardPanel?.classList.remove("is-vacation-flow");
    showDirectGuide();
    clearWizardSelections();
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderVacationSubtopics();
    result.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  const directRoutes = {
    "digital-access": "digital"
  };
  const directRoadmap = directRoadmapFor(directRoutes[preset]);
  if (directRoadmap) {
    showDirectGuide();
    clearWizardSelections();
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderRoadmapCard(directRoadmap);
    result.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function showRouteFinder() {
  if (guideCardsPanel) guideCardsPanel.hidden = true;
  if (wizardPanel) {
    wizardPanel.hidden = false;
    wizardPanel.classList.add("is-question-flow");
    wizardPanel.classList.remove("is-direct-guide", "is-living-topics");
  }
  if (wizard) wizard.hidden = false;
  if (result) result.hidden = true;
  if (documentsPanel) documentsPanel.hidden = true;
  if (sourcesPanel) sourcesPanel.hidden = true;
}

function showDirectGuide() {
  if (guideCardsPanel) guideCardsPanel.hidden = true;
  if (wizardPanel) {
    wizardPanel.hidden = false;
    wizardPanel.classList.add("is-direct-guide");
    wizardPanel.classList.remove("is-living-topics", "is-question-flow", "is-vacation-flow");
  }
  if (wizard) wizard.hidden = true;
  if (result) result.hidden = false;
  if (documentsPanel) documentsPanel.hidden = true;
  if (sourcesPanel) sourcesPanel.hidden = true;
}

function showOnlyTopicCards() {
  currentDirectRoute = null;
  currentEntryPreset = null;
  if (guideCardsPanel) guideCardsPanel.hidden = false;
  if (wizardPanel) {
    wizardPanel.hidden = true;
    wizardPanel.classList.remove("is-direct-guide", "is-living-topics", "is-question-flow", "is-vacation-flow");
  }
  if (wizard) wizard.hidden = false;
  if (documentsPanel) documentsPanel.hidden = true;
  if (sourcesPanel) sourcesPanel.hidden = true;
  setCurrentScreenState({ type: "start" });
}

function updateQuestionVisibility() {
  const step = wizard.dataset.step || "person";
  const fields = {
    person: wizard.querySelector('input[name="personType"]')?.closest("fieldset"),
    goal: wizard.querySelector('input[name="goal"]')?.closest("fieldset"),
    family: wizard.querySelector('input[name="familySponsor"]')?.closest("fieldset"),
    duration: wizard.querySelector('input[name="duration"]')?.closest("fieldset")
  };

  if (fields.person) fields.person.hidden = step !== "person";
  if (fields.goal) fields.goal.hidden = step !== "goal";
  if (fields.family) fields.family.hidden = step !== "family";
  if (fields.duration) fields.duration.hidden = step !== "duration";

  if (wizardSubmit) {
    wizardSubmit.hidden = step === "result";
    wizardSubmit.textContent = step === "duration" || step === "result" || step === "family" ? t("showRouteButton") : t("continueButton");
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-language-url]").forEach((element) => {
    const urls = JSON.parse(element.dataset.languageUrl);
    if (urls[currentLang]) element.setAttribute("href", urls[currentLang]);
  });
  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLang));
  });
  updateQuestionVisibility();
}

function refreshDynamicContentForLanguage() {
  applyTranslations();
  if (wizardPanel.hidden) return;
  if (wizard.hidden && currentDirectRoute === "living-menu") {
    renderLivingSubtopics();
    return;
  }
  if (wizard.hidden && currentDirectRoute === "vacation-menu") {
    renderVacationSubtopics();
    return;
  }
  if (wizard.hidden && currentDirectRoute) {
    const roadmap = directRoadmapFor(currentDirectRoute);
    if (roadmap) renderRoadmapCard(roadmap);
    return;
  }
  if (!result.hidden && wizard.dataset.step === "result") {
    renderRoadmap();
  }
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("holaPapersLang", lang);
  refreshDynamicContentForLanguage();
}

function showWizardPrompt(title, message) {
  result.hidden = true;
  result.classList.add("is-empty");
  result.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
  `;
}

function showNormalApp(targetId = "guide-cards") {
  const target = document.querySelector(`#${targetId}`) || document.querySelector("#guide-cards");
  window.history.replaceState(null, "", `${window.location.pathname}?nav=start#${target.id}`);
  target.scrollIntoView({ block: "start" });
}

function resetToStart(clearBackStack = true) {
  if (clearBackStack) navigationStack.length = 0;
  currentEntryPreset = null;
  clearWizardSelections();
  wizard.dataset.step = "person";
  updateQuestionVisibility();
  renderEmptyResult();
  showOnlyTopicCards();
  showNormalApp("guide-cards");
}

function openNavSectionIfRequested() {
  const targetId = window.location.hash.replace("#", "");
  if (!targetId) return false;
  // Legacy links (breadcrumbs, old shares) point at "?nav=start#guide-cards".
  // That is just "the homepage / this page from the top": strip the marker from
  // the URL and stay at the top instead of jumping past the hero.
  if (targetId === "guide-cards") {
    const params = new URLSearchParams(window.location.search);
    params.delete("nav");
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname.replace(/\/index\.html$/, "/")}${query ? `?${query}` : ""}`);
    return true;
  }
  const target = document.querySelector(`#${targetId}`);
  if (!target || target.closest("[hidden]")) return false;
  target.scrollIntoView({ block: "start" });
  return true;
}

wizard.addEventListener("change", () => {
  updateQuestionVisibility();
});

wizard.addEventListener("submit", (event) => {
  event.preventDefault();
  showRouteFinder();
  const step = wizard.dataset.step || "person";

  if (step === "person") {
    if (!getValue("personType")) {
      if (currentEntryPreset === "vacation") {
        showWizardPrompt(
          currentLang === "es" ? "¿Eres?" : "Are you?",
          currentLang === "es"
            ? "Elige ciudadano UE/EEE/Suiza o no comunitario para que IberiGo muestre las reglas correctas de estancia corta."
            : "Choose EU/EEA/Swiss or non-EU so IberiGo can show the right short-stay rules."
        );
      } else {
        showWizardPrompt(
          currentLang === "es" ? "Elige qué te describe mejor" : "Choose what best describes you",
          currentLang === "es"
            ? "Selecciona primero una opción y continúa a la siguiente pregunta."
            : "Select one option first, then continue to the next question."
        );
      }
      return;
    }
    if (currentEntryPreset === "vacation") {
      pushCurrentScreenState();
      wizard.style.opacity = "0";
      wizard.dataset.step = "result";
      showDirectGuide();
      updateQuestionVisibility();
      renderVacationRoadmap();
      requestAnimationFrame(() => { wizard.style.opacity = "1"; });
      return;
    }
    pushCurrentScreenState();
    wizard.style.opacity = "0";
    wizard.dataset.step = "goal";
    updateQuestionVisibility();
    requestAnimationFrame(() => { wizard.style.opacity = "1"; });
    setCurrentScreenState({
      type: "wizard",
      entryPreset: currentEntryPreset,
      step: wizard.dataset.step,
      selections: wizardSelectionState()
    });
    showWizardPrompt(
      currentLang === "es" ? "Siguiente: ¿qué quieres hacer?" : "Next: what are you trying to do?",
      currentLang === "es"
        ? "Elige el motivo principal por el que necesitas trámites en España."
        : "Choose the main reason you need Spanish paperwork."
    );
    wizard.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (step === "goal") {
    if (!getValue("goal")) {
      showWizardPrompt(
        currentLang === "es" ? "Elige qué quieres hacer" : "Choose what you are trying to do",
        currentLang === "es"
          ? "Selecciona primero una opción y después IberiGo podrá acotar la ruta."
          : "Select one option first, then IberiGo can narrow the route."
      );
      return;
    }
    if (getValue("goal") === "vacation") {
      pushCurrentScreenState();
      wizard.style.opacity = "0";
      wizard.dataset.step = "result";
      updateQuestionVisibility();
      renderRoadmap();
      requestAnimationFrame(() => { wizard.style.opacity = "1"; });
      const route = pickRoute()?.id || "unknown-route";
      trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
      return;
    }
    if (getValue("personType") === "nonEu" && getValue("goal") === "family") {
      pushCurrentScreenState();
      wizard.dataset.step = "family";
      updateQuestionVisibility();
      setCurrentScreenState({
        type: "wizard",
        entryPreset: currentEntryPreset,
        step: wizard.dataset.step,
        selections: wizardSelectionState()
      });
      showWizardPrompt(
        currentLang === "es" ? "¿Con quién te reúnes?" : "Who are you joining?",
        currentLang === "es"
          ? "Elige si tu familiar es ciudadano de la UE/EEE/Suiza o español, o un residente no comunitario en España."
          : "Choose whether your family member is an EU/EEA/Swiss or Spanish citizen, or a non-EU resident in Spain."
      );
      wizard.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    pushCurrentScreenState();
    wizard.style.opacity = "0";
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderRoadmap();
    requestAnimationFrame(() => { wizard.style.opacity = "1"; });
    const route = pickRoute()?.id || "unknown-route";
    trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
    return;
  }

  if (step === "family") {
    if (!getValue("familySponsor")) {
      showWizardPrompt(
        currentLang === "es" ? "Elige la situación del familiar" : "Choose the family member's status",
        currentLang === "es"
          ? "Esto decide si la ruta es tarjeta de familiar de ciudadano de la UE o reagrupación familiar."
          : "This decides whether the route is an EU-family residence card or family reunification."
      );
      return;
    }
    pushCurrentScreenState();
    wizard.style.opacity = "0";
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderRoadmap();
    requestAnimationFrame(() => { wizard.style.opacity = "1"; });
    const route = pickRoute()?.id || "unknown-route";
    trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
    return;
  }

  pushCurrentScreenState();
  wizard.style.opacity = "0";
  wizard.dataset.step = "result";
  updateQuestionVisibility();
  renderRoadmap();
  requestAnimationFrame(() => { wizard.style.opacity = "1"; });
  const route = pickRoute()?.id || "unknown-route";
  trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
});

document.querySelectorAll("[data-route-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    pushCurrentScreenState();
    setWizardFromPreset(button.dataset.routePreset);
  });
});

result.addEventListener("click", (event) => {
  const backButton = event.target.closest("[data-nav-back]");
  if (backButton) {
    handleBackNavigation();
    return;
  }
  const button = event.target.closest("[data-direct-route]");
  if (!button) return;
  pushCurrentScreenState();
  currentDirectRoute = button.dataset.directRoute;
  const roadmap = directRoadmapFor(button.dataset.directRoute);
  if (!roadmap) return;
  showDirectGuide();
  renderRoadmapCard(roadmap);
  result.scrollIntoView({ block: "start", behavior: "smooth" });
});

startLink?.addEventListener("click", (event) => {
  event.preventDefault();
  resetToStart();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

if (topbar) {
  const updateTopbarScrollState = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateTopbarScrollState();
  window.addEventListener("scroll", updateTopbarScrollState, { passive: true });
}

initializeVisitorCounter();
initializeHomeVideos();
clearWizardSelections();
wizard.dataset.step = "person";
applyTranslations();
renderEmptyResult();
showOnlyTopicCards();
// Do not rewrite the URL or auto-scroll on first load: the page (and the
// homepage hero) should open at the top. showNormalApp() is only used for the
// explicit "back to start" action (resetToStart).
openNavSectionIfRequested();

// Auto-open a specific guide when the page was statically generated for it.
// Generated pages carry data-guide-id and data-guide-lang on the <html> element.
(function () {
  const guideId = document.documentElement.dataset.guideId;
  const guideLang = document.documentElement.dataset.guideLang;
  if (!guideId) return;

  if (guideLang && guideLang !== currentLang) {
    currentLang = guideLang;
    localStorage.setItem("holaPapersLang", currentLang);
    applyTranslations();
  }

  const directRoadmap = directRoadmapFor(guideId);
  if (directRoadmap) {
    currentDirectRoute = guideId;
    currentEntryPreset = sectionPresetForGuide(guideId) || currentEntryPreset;
    showDirectGuide();
    renderRoadmapCard(directRoadmap, guideId);
    return;
  }

  const route = routes.find((r) => r.id === guideId);
  if (route) {
    const roadmap = roadmapFor(route);
    currentEntryPreset = sectionPresetForGuide(guideId) || currentEntryPreset;
    showDirectGuide();
    renderRoadmapCard(roadmap);
  }
}());


/* IberiGo roadmap source bundle · August 2026 */
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



/* IberiGo roadmap full next-actions upgrade · August 2026 */
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

    // Do not inject a separate "Do this now" box: it duplicated roadmap step 1
    // verbatim on every legacy guide. Step 1 already gets the "Start here" badge.
    result.querySelectorAll(".roadmap-now").forEach((node) => node.remove());
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
      background: #c2410c;
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


(() => {
  if (
    typeof routes === "undefined" ||
    typeof roadmapDetails === "undefined" ||
    typeof roadmapDetailsEs === "undefined" ||
    typeof result === "undefined"
  ) return;
  if (window.__iberigoRoadmapWhereToApplyLoaded) return;
  window.__iberigoRoadmapWhereToApplyLoaded = true;

  const whereEn = {
    "eu-employed": "<strong>In person:</strong> use the competent Oficina de Extranjería in your province of residence or, where the procedure is handled there, the corresponding Policía Nacional office. Use the official Cita Previa system and select the EU Registration Certificate procedure.",
    "eu-self-employed": "<strong>In person:</strong> use the competent Oficina de Extranjería in your province of residence or, where the procedure is handled there, the corresponding Policía Nacional office. Use the official Cita Previa system and select the EU Registration Certificate procedure.",
    "eu-registration": "<strong>In person:</strong> use the competent Oficina de Extranjería in your province of residence or, where the procedure is handled there, the corresponding Policía Nacional office. Use the official Cita Previa system and select the EU Registration Certificate procedure.",
    "eu-remote": "<strong>Residence filing:</strong> complete EU registration in person at the competent Oficina de Extranjería in your province of residence or, where applicable, the corresponding Policía Nacional office. Your tax and Social Security setup is separate and depends on your remote-work arrangement.",
    "eu-family-self": "<strong>In person:</strong> if you are registering as an EU citizen, use the competent Oficina de Extranjería in your province of residence or, where applicable, the corresponding Policía Nacional office. Do not use the non-EU EX-19 card simply because you are joining family.",
    "eu-study-short": "<strong>No residence filing solely for this short stay:</strong> for study lasting up to 90 days, you do not need an EU residence-registration appointment only because of the study stay. If the stay will exceed three months, switch to the EU student-registration route.",
    "eu-study": "<strong>In person:</strong> use the competent Oficina de Extranjería in your province of residence or, where the procedure is handled there, the corresponding Policía Nacional office. Use Cita Previa for the EU Registration Certificate procedure.",
    "eu-study-unsure": "<strong>Do not file yet:</strong> first confirm the official course dates. If the stay will exceed three months, use the competent Oficina de Extranjería / corresponding Policía Nacional EU-registration procedure; if it stays within 90 days, no EU residence filing is required solely for the study stay.",
    "work-employed": "<strong>Initial authorization:</strong> the Spanish employer files with the competent Oficina de Extranjería, including through Mercurio when using the electronic route. <strong>After approval:</strong> you complete the visa step at the Spanish consulate responsible for your legal residence, then the TIE fingerprint/card step with Policía Nacional after entry.",
    "work-self-employed": "<strong>Initial application:</strong> present EX-07 personally at the Spanish consulate responsible for your place of legal residence. <strong>After approval and entry:</strong> complete Social Security registration and the TIE fingerprint/card step with Policía Nacional.",
    "work-specialist": "<strong>Depends on the specialist route:</strong> UGE-CE handles highly qualified / EU Blue Card, intra-company, entrepreneur and qualifying research routes; Mercurio is used where the official seasonal or internship procedure requires it. If you are abroad, complete the Spanish consular visa step after authorization where required, followed by the TIE with Policía Nacional.",
    "non-lucrative": "<strong>Initial application:</strong> apply at the Spanish consulate responsible for your place of legal residence outside Spain. <strong>After the visa and arrival:</strong> complete the TIE fingerprint/card step with Policía Nacional within the deadline that applies to your authorization.",
    "digital-nomad": "<strong>If you are outside Spain:</strong> use the Spanish consulate responsible for your legal residence. <strong>If you are already legally in Spain:</strong> use the UGE-CE electronic filing route. After approval, complete the TIE with Policía Nacional where a card is required.",
    "special-cases": "<strong>Where you file depends on the exact procedure.</strong> Open the official Migraciones catalogue, choose the sheet matching your current status and purpose, and use only the filing body or electronic channel stated there. Do not force an exceptional-status case into a normal work, study or family route.",
    "study-short": "<strong>If your nationality requires a Schengen visa:</strong> apply at the competent Spanish consulate. <strong>If you are visa-exempt:</strong> there is no Spanish long-stay study filing solely for a course of up to 90 days; follow the applicable Schengen entry conditions.",
    "study-abroad": "<strong>Initial application:</strong> use the Spanish diplomatic mission or consular office responsible for where you legally reside. <strong>After arrival:</strong> if the authorized stay exceeds six months, complete the TIE fingerprint/card step with Policía Nacional.",
    "study-unsure-abroad": "<strong>Do not file until the course dates are confirmed.</strong> If the stay will exceed 90 days, apply through the Spanish consulate responsible for your legal residence. If it stays within 90 days, use the Schengen short-stay rules for your nationality.",
    "study-short-in-spain": "<strong>No separate long-stay filing solely for the short course:</strong> your current lawful status in Spain controls how long you can remain. If the course or planned stay will exceed 90 days, check whether you qualify to file a long-stay study application from Spain.",
    "study-in-spain": "<strong>In Spain:</strong> submit at the competent Oficina de Extranjería or electronically through Mercurio when that channel applies. <strong>After approval:</strong> if the authorized stay exceeds six months, complete the TIE fingerprint/card step with Policía Nacional.",
    "study-unsure-in-spain": "<strong>Do not file until you confirm both status and dates.</strong> If the course will exceed 90 days and your current status allows an in-Spain application, use the competent Oficina de Extranjería or Mercurio within the applicable deadline.",
    "eu-family": "<strong>Residence-card application in Spain:</strong> apply in person at the Oficina de Extranjería in your province or, failing that, the corresponding Policía Nacional office. If your nationality requires an entry visa, obtain it first from the competent Spanish consulate. Complete the card/fingerprint step with Policía Nacional as required.",
    "spanish-family": "<strong>The filing channel depends on where the Spanish citizen and foreign family member live:</strong> use the competent Oficina de Extranjería, Mercurio when electronic filing applies, or the competent Spanish consulate in the cases specified by the official procedure. After approval or entry, complete the TIE with Policía Nacional.",
    "spanish-eu-return-family": "<strong>If EU free-movement law applies:</strong> follow the EX-19 EU-family filing route through the competent Extranjería / corresponding Police procedure. <strong>If it does not:</strong> use the standard EX-24 Spanish-family route through Extranjería, Mercurio or the competent consulate as the official procedure directs.",
    "family": "<strong>Initial authorization:</strong> the non-EU sponsor files in Spain with the competent Oficina de Extranjería, including through Mercurio when using the electronic route. <strong>After approval:</strong> the joining family member completes the visa step at the competent Spanish consulate where required, then the TIE with Policía Nacional after entry."
  };

  const whereEs = {
    "eu-employed": "<strong>Presencial:</strong> utiliza la Oficina de Extranjería competente de tu provincia de residencia o, cuando el trámite se gestione allí, la comisaría correspondiente de la Policía Nacional. Usa Cita Previa y selecciona el trámite del Certificado de Registro de Ciudadano de la UE.",
    "eu-self-employed": "<strong>Presencial:</strong> utiliza la Oficina de Extranjería competente de tu provincia de residencia o, cuando el trámite se gestione allí, la comisaría correspondiente de la Policía Nacional. Usa Cita Previa y selecciona el trámite del Certificado de Registro de Ciudadano de la UE.",
    "eu-registration": "<strong>Presencial:</strong> utiliza la Oficina de Extranjería competente de tu provincia de residencia o, cuando el trámite se gestione allí, la comisaría correspondiente de la Policía Nacional. Usa Cita Previa y selecciona el trámite del Certificado de Registro de Ciudadano de la UE.",
    "eu-remote": "<strong>Trámite de residencia:</strong> completa el registro UE de forma presencial en la Oficina de Extranjería competente de tu provincia o, cuando corresponda, en la comisaría de Policía Nacional. La configuración fiscal y de Seguridad Social es un trámite separado y depende de tu estructura de trabajo remoto.",
    "eu-family-self": "<strong>Presencial:</strong> si te registras como ciudadano de la UE, utiliza la Oficina de Extranjería competente de tu provincia o, cuando corresponda, la comisaría de Policía Nacional. No uses la tarjeta EX-19 para no comunitarios solo por reunirte con familiares.",
    "eu-study-short": "<strong>Sin trámite de residencia únicamente por esta estancia corta:</strong> si los estudios duran hasta 90 días, no necesitas una cita de registro UE solo por los estudios. Si vas a superar tres meses, cambia a la vía de registro como estudiante UE.",
    "eu-study": "<strong>Presencial:</strong> utiliza la Oficina de Extranjería competente de tu provincia de residencia o, cuando el trámite se gestione allí, la comisaría correspondiente de la Policía Nacional. Usa Cita Previa para el Certificado de Registro de Ciudadano de la UE.",
    "eu-study-unsure": "<strong>No presentes todavía:</strong> confirma primero las fechas oficiales del curso. Si superarás tres meses, usa el trámite de registro UE de la Oficina de Extranjería / Policía Nacional competente; si la estancia queda dentro de 90 días, no necesitas registro UE únicamente por los estudios.",
    "work-employed": "<strong>Autorización inicial:</strong> la empresa española presenta ante la Oficina de Extranjería competente, también por Mercurio cuando utilice la vía electrónica. <strong>Tras la aprobación:</strong> completas el visado en el consulado español competente para tu residencia legal y, después de entrar, la TIE con la Policía Nacional.",
    "work-self-employed": "<strong>Solicitud inicial:</strong> presenta EX-07 personalmente en el consulado español competente para tu lugar de residencia legal. <strong>Tras la aprobación y entrada:</strong> completa el alta en Seguridad Social y la TIE con la Policía Nacional.",
    "work-specialist": "<strong>Depende de la vía especializada:</strong> UGE-CE gestiona alta cualificación / Tarjeta Azul UE, traslado intraempresarial, emprendedores y determinados supuestos de investigación; Mercurio se utiliza cuando la vía oficial de temporada o prácticas lo exige. Si estás fuera de España, completa el visado consular tras la autorización cuando proceda y después la TIE con Policía Nacional.",
    "non-lucrative": "<strong>Solicitud inicial:</strong> presenta en el consulado español competente para tu lugar de residencia legal fuera de España. <strong>Tras el visado y la llegada:</strong> completa la TIE con la Policía Nacional dentro del plazo aplicable a tu autorización.",
    "digital-nomad": "<strong>Si estás fuera de España:</strong> utiliza el consulado español competente para tu residencia legal. <strong>Si ya estás legalmente en España:</strong> utiliza la vía electrónica de UGE-CE. Tras la aprobación, completa la TIE con Policía Nacional cuando se requiera tarjeta.",
    "special-cases": "<strong>El lugar de presentación depende del procedimiento exacto.</strong> Abre el catálogo oficial de Migraciones, elige la hoja que corresponda a tu situación actual y finalidad, y utiliza únicamente el órgano o canal electrónico indicado allí. No fuerces un caso excepcional dentro de una vía normal de trabajo, estudios o familia.",
    "study-short": "<strong>Si tu nacionalidad exige visado Schengen:</strong> solicita en el consulado español competente. <strong>Si estás exento de visado:</strong> no hay una solicitud española de estudios de larga duración únicamente por un curso de hasta 90 días; cumple las condiciones Schengen de entrada aplicables.",
    "study-abroad": "<strong>Solicitud inicial:</strong> utiliza la misión diplomática u oficina consular española competente para el lugar donde resides legalmente. <strong>Tras la llegada:</strong> si la estancia autorizada supera seis meses, completa la TIE con la Policía Nacional.",
    "study-unsure-abroad": "<strong>No presentes hasta confirmar las fechas del curso.</strong> Si la estancia superará 90 días, solicita en el consulado español competente para tu residencia legal. Si queda dentro de 90 días, utiliza las reglas Schengen de corta estancia de tu nacionalidad.",
    "study-short-in-spain": "<strong>Sin solicitud separada de larga duración únicamente por el curso corto:</strong> tu situación legal actual en España determina cuánto puedes permanecer. Si el curso o la estancia prevista superarán 90 días, comprueba si puedes presentar una solicitud de estudios de larga duración desde España.",
    "study-in-spain": "<strong>En España:</strong> presenta en la Oficina de Extranjería competente o electrónicamente por Mercurio cuando ese canal corresponda. <strong>Tras la aprobación:</strong> si la estancia autorizada supera seis meses, completa la TIE con la Policía Nacional.",
    "study-unsure-in-spain": "<strong>No presentes hasta confirmar situación y fechas.</strong> Si el curso superará 90 días y tu situación actual permite solicitar desde España, utiliza la Oficina de Extranjería competente o Mercurio dentro del plazo aplicable.",
    "eu-family": "<strong>Solicitud de tarjeta en España:</strong> presenta personalmente en la Oficina de Extranjería de tu provincia o, en su defecto, en la comisaría correspondiente de Policía Nacional. Si tu nacionalidad exige visado de entrada, solicítalo antes en el consulado español competente. Completa la tarjeta/huellas con Policía Nacional cuando proceda.",
    "spanish-family": "<strong>El canal depende de dónde residan la persona española y el familiar extranjero:</strong> utiliza la Oficina de Extranjería competente, Mercurio cuando corresponda la vía electrónica o el consulado español competente en los supuestos previstos por el procedimiento oficial. Tras la aprobación o entrada, completa la TIE con Policía Nacional.",
    "spanish-eu-return-family": "<strong>Si se aplica el Derecho de libre circulación UE:</strong> sigue la vía EX-19 de familiar UE mediante Extranjería / Policía competente. <strong>Si no se aplica:</strong> utiliza la vía estándar EX-24 de familiar de persona española mediante Extranjería, Mercurio o el consulado competente según indique el procedimiento oficial.",
    "family": "<strong>Autorización inicial:</strong> la persona reagrupante no comunitaria presenta en España ante la Oficina de Extranjería competente, también por Mercurio cuando use la vía electrónica. <strong>Tras la aprobación:</strong> el familiar completa el visado en el consulado español competente cuando sea necesario y, después de entrar, la TIE con Policía Nacional."
  };

  const linkAdds = {
    "eu-employed": ["eu-certificate", "cita"],
    "eu-self-employed": ["eu-certificate", "cita"],
    "eu-registration": ["eu-certificate", "cita"],
    "eu-remote": ["eu-certificate", "cita"],
    "eu-family-self": ["eu-certificate", "cita"],
    "eu-study": ["eu-certificate", "cita"],
    "work-employed": ["mercurio", "consulates", "cita"],
    "work-self-employed": ["consulates", "cita"],
    "non-lucrative": ["non-lucrative-official", "consulates", "cita", "790-012"],
    "digital-nomad": ["digital-nomad-official", "uge-apply", "consulates", "cita", "790-012"],
    "study-short": ["schengen", "consulates"],
    "study-abroad": ["study-official", "consulates", "cita"],
    "study-unsure-abroad": ["study-official", "schengen", "consulates"],
    "study-in-spain": ["study-official", "mercurio", "cita"],
    "study-unsure-in-spain": ["study-official", "mercurio"],
    "eu-family": ["eu-family-official", "consulates", "cita", "790-012"],
    "spanish-family": ["spanish-family-official", "mercurio", "consulates", "cita", "790-012"],
    "spanish-eu-return-family": ["eu-family-official", "spanish-family-official", "cita", "790-012"],
    "family": ["family-official", "mercurio", "consulates", "cita", "790-052", "790-012"]
  };

  const unique = (items) => [...new Set((items || []).filter(Boolean))];
  Object.keys(whereEn).forEach((id) => {
    if (roadmapDetails[id]) {
      roadmapDetails[id].whereToApply = whereEn[id];
      roadmapDetails[id].links = unique([...(roadmapDetails[id].links || []), ...(linkAdds[id] || [])]);
    }
    if (roadmapDetailsEs[id]) {
      roadmapDetailsEs[id].whereToApply = whereEs[id];
      roadmapDetailsEs[id].links = unique([...(roadmapDetailsEs[id].links || []), ...(linkAdds[id] || [])]);
    }
  });

  const replacePoliceFees = (value, lang) => {
    if (typeof value === "string") {
      let text = value;
      if (lang === "es") {
        text = text
          .replace(/La tasa es de 12\.00 EUR mediante el Modelo 790-012\.?/g, "Usa el Modelo 790-012 y comprueba el importe vigente en el generador oficial de tasas de la Policía.")
          .replace(/\(primera tarjeta[^)]*16\.08 EUR[^)]*\)/gi, "(comprueba el importe vigente en el generador oficial 790-012 de la Policía)")
          .replace(/12\.00 EUR|16\.08 EUR|€\s*12(?:\.00)?|€\s*16\.08|12,00\s*€|16,08\s*€/gi, "importe vigente del 790-012");
      } else {
        text = text
          .replace(/The fee is 12\.00 EUR via Modelo 790-012\.?/g, "Use Modelo 790-012 and check the current amount in the official Police fee generator.")
          .replace(/\(first card[^)]*16\.08 EUR[^)]*\)/gi, "(check the current amount in the official 790-012 Police fee generator)")
          .replace(/12\.00 EUR|16\.08 EUR|€\s*12(?:\.00)?|€\s*16\.08|12,00\s*€|16,08\s*€/gi, "current 790-012 amount");
      }
      return text;
    }
    if (Array.isArray(value)) return value.map((item) => replacePoliceFees(item, lang));
    if (value && typeof value === "object") {
      Object.keys(value).forEach((key) => {
        value[key] = replacePoliceFees(value[key], lang);
      });
    }
    return value;
  };

  routes.forEach((route) => replacePoliceFees(route, "en"));
  replacePoliceFees(roadmapDetails, "en");
  replacePoliceFees(roadmapDetailsEs, "es");
  if (typeof routeFormsAndTaxes !== "undefined") replacePoliceFees(routeFormsAndTaxes, "en");
  if (typeof routeFormsAndTaxesEs !== "undefined") replacePoliceFees(routeFormsAndTaxesEs, "es");

  const heading = () => currentLang === "es" ? "Dónde hacer este trámite" : "Where to do this";

  function enhanceWhereToApply(roadmap) {
    result.querySelectorAll(".roadmap-where").forEach((node) => node.remove());
    if (!roadmap?.whereToApply || !result || result.hidden) return;
    const block = document.createElement("div");
    block.className = "result-section roadmap-where";
    block.dataset.routeWhere = roadmap.route?.id || "";
    block.innerHTML = `<strong>${heading()}</strong><p>${roadmap.whereToApply}</p>`;
    const now = result.querySelector(".roadmap-now");
    if (now) now.after(block);
    else {
      const firstSection = result.querySelector(".result-section");
      if (firstSection) firstSection.before(block);
      else result.append(block);
    }
  }

  const priorRenderRoadmap = renderRoadmap;
  renderRoadmap = function () {
    priorRenderRoadmap();
    enhanceWhereToApply(roadmapFor(pickRoute()));
  };

  const priorRenderRoadmapCard = renderRoadmapCard;
  renderRoadmapCard = function (roadmap, guideId = roadmap?.route?.id || currentDirectRoute) {
    priorRenderRoadmapCard(roadmap, guideId);
    enhanceWhereToApply(roadmap);
  };

  const style = document.createElement("style");
  style.id = "iberigo-roadmap-where-style";
  style.textContent = `
    .roadmap-where {
      border: 1px solid #d8e3ea;
      border-left: 4px solid #0f5c6e;
      border-radius: 16px;
      padding: 18px 20px;
      background: #f7fbfc;
    }
    .roadmap-where > strong {
      display: block;
      margin-bottom: 8px;
      color: #0f2a44;
      font-size: 0.86rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .roadmap-where p {
      margin: 0;
      line-height: 1.6;
    }
    @media (max-width: 520px) {
      .roadmap-where { padding: 16px; }
    }
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  if (typeof roadmapForCurrentScreen === "function") enhanceWhereToApply(roadmapForCurrentScreen());
})();

