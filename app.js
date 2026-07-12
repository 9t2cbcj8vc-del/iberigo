const routes = [
  {
    id: "eu-vacation",
    title: "EU/EEA/Swiss short visit",
    badge: "Vacation",
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
    badge: "Vacation",
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
      "EU, EEA, and Swiss citizens who plan to live in Spain for more than three months must register and obtain the Certificado de Registro de Ciudadano de la Unión — commonly called the 'green NIE' because it shows your NIE number on a small green document. It is not a TIE card. You need to show you can support yourself: through work, sufficient funds, or study with health cover. Have your EX-18 form, NIE, padrón certificate, and proof of means ready before the appointment. The fee is 12.00 EUR via Modelo 790-012. If you do not yet have a NIE, confirm with your local office whether they assign it during this registration or require a separate step first — practice varies by province.",
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
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
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
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
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
const wizardSubmit = document.querySelector("#wizardSubmit");
const guideCardsPanel = document.querySelector("#guide-cards");
const wizardPanel = document.querySelector("#wizard");
const documentsPanel = document.querySelector("#documents");
const sourcesPanel = document.querySelector("#sources");
const startLink = document.querySelector('header nav a[href*="#guide-cards"]');
const topbar = document.querySelector(".topbar");
const VISITOR_COUNTER_URL = "";
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
    startHeading: "Where should we begin?",
    startDisclaimer: "Not legal advice. Always verify with official sources before filing.",
    movingTitle: "Move to Spain",
    movingDesc: "NIE, TIE, padrón, EU registration, visas, and residency.",
    movingChipVisa: "Visas",
    movingChipEu: "EU register",
    movingChipStudy: "Study",
    movingChipFamily: "Family",
    movingButton: "Explore",
    vacationTitle: "Vacation in Spain",
    vacationDesc: "Short visits, entry rules, transport, places to stay, and practical trip planning in Spain.",
    vacationChipEntry: "Entry rules",
    vacationChipTransport: "Transport",
    vacationChipStays: "Places to stay",
    vacationChipTrips: "Trip ideas",
    vacationButton: "Explore",
    livingTitle: "Live in Spain",
    livingDesc: "Healthcare, banking, taxes, digital access, and the key admin steps for everyday life in Spain.",
    livingChipHealth: "Healthcare",
    livingChipBanking: "Banking",
    livingChipJobs: "Job search",
    livingChipTaxes: "Taxes",
    livingChipSocial: "Social Security",
    livingChipDigital: "Digital access",
    livingButton: "Explore",
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
    footerSupportText: "IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.",
    footerSupportLink: "Donate",
    footerLegal: "© 2026 IberiGo. Free to use. Not legal advice.",
    footerReviewed: "Last reviewed: June 2026"
  },
  es: {
    headerTitle: "Mudarte, viajar y establecerte en España.",
    startNav: "Inicio",
    spainFilesNav: "The Spain Files",
    supportNav: "Donar",
    startHeading: "¿Por dónde empezamos?",
    startDisclaimer: "No es asesoramiento legal. Verifique siempre con fuentes oficiales antes de tramitar.",
    movingTitle: "Mudarte a España",
    movingDesc: "NIE, TIE, padrón, registro de la UE, visados y residencia.",
    movingChipVisa: "Visados",
    movingChipEu: "Registro UE",
    movingChipStudy: "Estudios",
    movingChipFamily: "Familia",
    movingButton: "Explorar",
    vacationTitle: "Vacaciones en España",
    vacationDesc: "Visitas cortas, reglas de entrada, transporte, alojamiento y planificación práctica del viaje en España.",
    vacationChipEntry: "Entrada",
    vacationChipTransport: "Transporte",
    vacationChipStays: "Alojamiento",
    vacationChipTrips: "Ideas",
    vacationButton: "Explorar",
    livingTitle: "Vivir en España",
    livingDesc: "Sanidad, banca, impuestos, acceso digital y los trámites clave para la vida diaria en España.",
    livingChipHealth: "Sanidad",
    livingChipBanking: "Banca",
    livingChipJobs: "Buscar trabajo",
    livingChipTaxes: "Impuestos",
    livingChipSocial: "Seguridad Social",
    livingChipDigital: "Acceso digital",
    livingButton: "Explorar",
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
    footerSupportText: "IberiGo es gratuito. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.",
    footerSupportLink: "Donar",
    footerLegal: "© 2026 IberiGo. Gratuito. No es asesoramiento legal.",
    footerReviewed: "Última revisión: junio de 2026"
  },
};

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

const roadmapDetails = {
  "eu-registration": {
    process: "EU Registration Certificate",
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
    difficulty: "Low",
    timeline: "No residence filing for an ordinary short visit",
    steps: ["Travel with a valid passport or national ID.", "Keep health cover or EHIC available.", "Use the official tourism and transport links to plan trains, airports, buses, and where to stay.", "If you later decide to live in Spain, use the EU registration route."],
    documents: ["Passport or national ID", "Health cover for travel", "Travel and accommodation details"],
    links: ["eu-short-stay", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "non-eu-vacation": {
    process: "Schengen short stay",
    difficulty: "Low to medium",
    timeline: "Depends on whether your passport requires a Schengen visa",
    steps: ["Check whether your passport needs a Schengen short-stay visa.", "Check the 90 days in any 180-day rule.", "Prepare travel insurance, accommodation, return/onward travel, and funds if asked.", "Use the tourism and transport links to plan trains, airports, buses, and places to stay.", "Do not treat a short stay as permission to live or work in Spain."],
    documents: ["Passport", "Schengen visa if required", "Travel insurance if required", "Accommodation and return/onward travel proof"],
    links: ["schengen", "calculator", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "work-authorization": {
    process: "Residence and work authorization",
    difficulty: "High",
    timeline: "Often several months",
    steps: ["Confirm whether the route is employee work or self-employed work.", "Prepare employer contract or business plan and professional evidence.", "Apply for the residence and work authorization before starting work.", "After approval, complete visa and TIE card steps if required.", "Pay Modelo 790-012 for the card step when applicable."],
    documents: ["Passport", "EX-03 for employee work or EX-07 for self-employed work", "Contract or business plan", "Qualifications where required", "EX-17 after approval", "790-012 receipt for card step"],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    process: "International telework / digital nomad",
    difficulty: "High",
    timeline: "Often one to three months after a complete filing",
    steps: ["Confirm your work is mainly for companies or clients outside Spain.", "Prepare contracts, company evidence, qualifications or experience, health cover, and clean record documents.", "Apply through the official telework route or consulate path.", "After approval, complete TIE card steps if required.", "Set up digital ID once eligible."],
    documents: ["Passport", "Remote work evidence", "Company/client documents", "Qualifications or experience", "Health cover", "Criminal record certificate where required"],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    process: "Non-lucrative residence",
    difficulty: "High",
    timeline: "Often several months, commonly through a consulate",
    steps: ["Confirm you will not work or carry out professional activity in Spain.", "Prepare proof of funds, health insurance, criminal record, and medical certificate where required.", "Apply through the official non-lucrative route.", "After approval or visa issue, complete TIE card steps if required.", "Use padrón and digital ID steps after arrival."],
    documents: ["Passport", "EX-01 or consular application path", "Proof of funds", "Health insurance", "Criminal record certificate", "Medical certificate", "EX-17 after approval"],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    process: "Study stay authorization",
    difficulty: "Medium to high",
    timeline: "Often one to three months after a complete filing",
    steps: ["Prepare admission or enrollment proof.", "Prepare funds, health insurance, passport, and legalized/trans­lated public documents where required.", "Apply through the official study stay route.", "If your stay requires a card, complete the TIE step after approval.", "Keep renewal dates visible if the course continues."],
    documents: ["Passport", "EX-00", "Admission or enrollment proof", "Proof of funds", "Health insurance", "EX-17 if TIE is required"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Family reunification",
    difficulty: "High",
    timeline: "Often several months",
    steps: ["Confirm the family member in Spain is a non-EU legal resident and eligible to sponsor you.", "Prepare family relationship evidence, sponsor residence documents, housing proof, and economic means evidence.", "Apply through the family reunification route.", "After approval and visa steps, complete the TIE card step.", "Keep renewal dates visible."],
    documents: ["Passport", "EX-02", "Family relationship evidence", "Sponsor residence documents", "Housing and economic means proof", "EX-17 after approval"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "Residence card for family member of an EU citizen",
    difficulty: "Medium to high",
    timeline: "Often a few weeks to a few months",
    steps: ["Confirm the family member is an EU, EEA, Swiss, or qualifying Spanish citizen.", "Prepare relationship evidence and the EU/Spanish citizen's residence basis.", "Complete EX-19.", "Book the relevant EU-family residence card appointment.", "Pay Modelo 790-012 if required by the card process."],
    documents: ["Passport", "EX-19", "DNI or EU registration certificate of the EU/Spanish citizen", "Marriage, partnership, birth, or dependency evidence", "790-012 receipt if required"],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
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
    explanation: "Los ciudadanos de la UE, EEE y Suiza que planean vivir en España más de tres meses deben registrarse y obtener el Certificado de Registro de Ciudadano de la Unión, a menudo llamado NIE verde porque muestra tu número NIE en un documento verde pequeño. No es una tarjeta TIE. Debes demostrar que puedes mantenerte: por trabajo, fondos suficientes o estudios con cobertura sanitaria. Ten preparados el formulario EX-18, NIE, certificado de padrón y prueba de medios antes de la cita. La tasa es de 12.00 EUR mediante el Modelo 790-012. Si todavía no tienes NIE, confirma con la oficina local si lo asignan durante este registro o si exigen un paso separado primero, porque la práctica puede variar por provincia.",
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
    process: "Autorización de residencia y trabajo",
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
    process: "Autorización de estancia por estudios",
    explanation: "Los estudiantes no comunitarios que van a estudiar, formarse, hacer prácticas o participar en movilidad estudiantil en España durante más de 90 días necesitan una autorización de estancia por estudios. Normalmente se prepara una carta de admisión, prueba de fondos, seguro médico, antecedentes penales y certificado médico cuando corresponda. Tras llegar a España, puede ser necesario obtener una TIE de estudiante. Algunos permisos de estudios permiten trabajar a tiempo parcial, pero siempre hay que revisar las condiciones concretas de la autorización.",
    difficulty: "Media a alta",
    timeline: "A menudo de uno a tres meses tras presentar un expediente completo",
    steps: ["Prepara prueba de admisión o matrícula.", "Prepara fondos, seguro médico, pasaporte y documentos públicos legalizados o traducidos cuando sea necesario.", "Solicita por la ruta oficial de estancia por estudios.", "Si tu estancia requiere tarjeta, completa el paso de la TIE tras la aprobación.", "Controla las fechas de renovación si el curso continúa."],
    documents: ["Pasaporte", "EX-00", "Prueba de admisión o matrícula", "Prueba de fondos", "Seguro médico", "EX-17 si se requiere TIE"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Reagrupación familiar",
    explanation: "Los familiares no comunitarios de un residente legal en España pueden reunirse con él mediante la reagrupación familiar. El residente en España normalmente debe haber tenido residencia legal durante al menos un año y contar con al menos otro año de validez, además de demostrar vivienda y medios económicos suficientes para el tamaño de la familia. Los familiares elegibles suelen incluir cónyuge o pareja, hijos menores y, en algunos casos, ascendientes dependientes. La solicitud la presenta en España el residente reagrupante; tras la aprobación, el familiar solicita visado en el consulado español y después obtiene tarjeta de residencia.",
    difficulty: "Alta",
    timeline: "A menudo varios meses",
    steps: ["Confirma que el familiar en España es residente legal no comunitario y puede reagruparte.", "Prepara prueba del vínculo familiar, documentos de residencia del reagrupante, vivienda y medios económicos.", "Solicita por la ruta de reagrupación familiar.", "Tras la aprobación y el visado, completa el paso de la TIE.", "Controla las fechas de renovación."],
    documents: ["Pasaporte", "EX-02", "Prueba del vínculo familiar", "Documentos de residencia del reagrupante", "Prueba de vivienda y medios económicos", "EX-17 tras la aprobación"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "Tarjeta de residencia de familiar de ciudadano de la UE",
    explanation: "Los familiares no comunitarios que se reúnen o acompañan a un ciudadano de la UE, EEE o Suiza registrado como residente en España siguen una ruta separada y generalmente más favorable que la reagrupación familiar ordinaria: la Tarjeta de Residencia de Familiar de Ciudadano de la Unión. Entre los familiares elegibles suelen estar cónyuges, parejas registradas, hijos dependientes menores de 21 años y familiares directos ascendientes dependientes. El ciudadano de la UE debe tener ya su certificado de registro de la UE, conocido a veces como el NIE verde. El familiar no comunitario presenta la solicitud con el formulario EX-19, y la tasa es de 12.00 EUR mediante el Modelo 790-012, más baja que la tasa estándar de TIE. La tarjeta inicial suele tener una validez de cinco años. Conseguir cita de huellas en provincias con mucha demanda como Madrid, Barcelona o Alicante puede tardar; reserva en cuanto llegue la autorización y guarda prueba de intentos fallidos si el plazo de 30 días está en riesgo.",
    difficulty: "Media a alta",
    timeline: "A menudo de unas semanas a unos meses",
    steps: ["Confirma que el familiar es ciudadano de la UE, EEE, Suiza o ciudadano español cualificado.", "Prepara prueba del vínculo y la base de residencia del ciudadano UE/español.", "Completa el formulario EX-19.", "Reserva la cita correspondiente para tarjeta de familiar de ciudadano de la UE.", "Después de la aprobación, revisa el paso de TIE con EX-17 si te lo piden.", "Paga el Modelo 790-012 si lo exige el proceso de tarjeta."],
    documents: ["Pasaporte", "EX-19", "DNI o certificado de registro UE del ciudadano UE/español", "Matrimonio, pareja, nacimiento o prueba de dependencia", "EX-17 tras la aprobación si corresponde", "Justificante 790-012 si lo piden"],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
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
  if (!VISITOR_COUNTER_URL) return;

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
    "driving-licence-exchange": "./assets/topic-scenes/live-driving-licence-20260625.webp",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-citizenship": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.webp",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.webp",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.webp",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.webp",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.webp",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.webp"
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
    "vacation-booking", "vacation-hotels", "vacation-tourism", "vacation-reviews"
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
  result.innerHTML = `
    ${renderBackButton(roadmap.process)}
    ${renderResultIntro(roadmap, explanation, guideId)}
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
      explanation: "<p><strong>Qué es:</strong> El padrón es el registro de tu domicilio en el ayuntamiento.</p><p><strong>Cuándo puedes necesitarlo:</strong> El certificado o volante de padrón suele pedirse para:</p><ul><li>El TIE</li><li>Renovaciones de residencia</li><li>Sanidad</li><li>Colegio</li><li>A veces, para abrir una cuenta bancaria</li></ul><p><strong>Qué puede pedir la oficina:</strong> Cada municipio decide qué acepta como prueba de domicilio, como contrato de alquiler, escritura, autorización del titular o recibos.</p><p><strong>Nota práctica:</strong> Conviene empadronarte en cuanto tengas una dirección estable, porque te lo pedirán en muchos pasos posteriores.</p>",
      steps: ["Reúne pasaporte o documento de identidad y prueba de domicilio.", "Comprueba el proceso de tu ayuntamiento, porque cada municipio organiza el padrón a su manera.", "Pide certificado o volante de padrón si lo necesitas para TIE, residencia, sanidad u otro trámite."],
      links: ["padron-info"]
    } : {
      process: "Padrón / town hall registration",
      explanation: "<p><strong>What it is:</strong> The padrón is your registration with the local town hall (ayuntamiento) confirming your address in Spain.</p><p><strong>When you may need it:</strong> A padrón certificate or volante is commonly requested for:</p><ul><li>Your TIE</li><li>Residence renewals</li><li>Healthcare registration</li><li>School enrolment</li><li>Often for opening a bank account</li></ul><p><strong>What the office may expect:</strong> Each municipality sets its own rules for what counts as proof of address. A rental contract, property deed, owner's authorisation letter, or utility bill are common, but accepted documents vary.</p><p><strong>Practical note:</strong> It's worth registering as soon as you have a settled address — the padrón certificate is requested constantly, and having it ready can save time at later steps.</p>",
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
      explanation: "<p><strong>Qué es:</strong> El NIE (Número de Identidad de Extranjero) es el número de identificación vitalicio que España asigna a los extranjeros. Se usa para trámites oficiales y financieros como comprar una vivienda, firmar ante notario, abrir una cuenta bancaria, empezar a trabajar o pagar impuestos.</p><p><strong>Qué no es:</strong> El NIE es solo un número — no es una tarjeta ni un permiso de residencia. Tener un NIE no da derecho a vivir ni a trabajar en España.</p><p><strong>Cuándo puedes necesitarlo:</strong></p><ul><li>Comprar una vivienda</li><li>Firmar un acto notarial</li><li>Abrir una cuenta bancaria</li><li>Empezar a trabajar</li><li>Pagar impuestos</li></ul><p><strong>Qué puede pedir la oficina:</strong> La policía suele exigir un motivo concreto y documentado para asignarlo — una compra inmobiliaria, un contrato de trabajo, un acto notarial, un requisito bancario o una obligación fiscal — no simplemente quererlo por si acaso.</p><p><strong>Nota práctica:</strong> La disponibilidad de citas varía mucho según la provincia. En zonas costeras concurridas como la Costa Blanca pueden aparecer huecos de forma imprevisible, así que puede ayudar comprobar a primera hora de la mañana y los fines de semana.</p><p><strong>Plazos orientativos:</strong> Si acudes con la documentación en regla, el número suele asignarse el mismo día, pero esto puede variar según la oficina.</p>",
      steps: ["Escribe o reúne la prueba del motivo: banco, compra, notaría, trabajo, impuestos u otro trámite concreto.", "Prepara pasaporte o documento de identidad y copias si las piden.", "Pide la cita o revisa el trámite oficial de asignación de NIE y la tasa 790-012."],
      links: ["nie", "cita", "790-012"],
      route: { id: "nie" }
    } : {
      process: "NIE number",
      explanation: "<p><strong>What it is:</strong> The NIE (Número de Identidad de Extranjero) is Spain's lifetime identification number for foreigners. It is used for official and financial transactions such as buying property, signing before a notary, opening a bank account, starting work, or paying tax.</p><p><strong>What it is not:</strong> A NIE is just a number — not a card and not a residence permit. Having a NIE does not give you the right to live or work in Spain.</p><p><strong>When you may need it:</strong></p><ul><li>Buying property</li><li>Signing a notarial deed</li><li>Opening a bank account</li><li>Starting work</li><li>Paying tax</li></ul><p><strong>What the office may expect:</strong> Police offices usually expect a concrete, documented reason to assign one — a property purchase, employment contract, notarial act, bank requirement, or tax obligation — not just wanting it in case it is useful later.</p><p><strong>Practical note:</strong> Appointment availability varies sharply by province. In busy coastal areas like the Costa Blanca, slots can appear unpredictably, so it can help to check early in the morning and at weekends.</p><p><strong>Timing:</strong> If your paperwork is accepted, the number is often assigned the same day, but this can vary by office.</p>",
      steps: ["Write or gather proof of the reason: bank, purchase, notary, work, tax, or another concrete procedure.", "Prepare passport or identity document and copies if requested.", "Book the appointment or review the official NIE assignment procedure and 790-012 fee."],
      links: ["nie", "cita", "790-012"],
      route: { id: "nie" }
    };
  }
  if (goal === "tie") {
    return currentLang === "es" ? {
      process: "Tarjeta TIE después de aprobar el visado",
      explanation: "Después de elegir TIE, confirma primero que ya existe una concesión, visado o resolución favorable. La TIE no concede la residencia por sí sola; documenta una autorización ya aprobada.",
      steps: ["Comprueba que tienes visado, resolución favorable o autorización que permite pedir la tarjeta.", "Completa EX-17 y paga la tasa 790-012 de expedición de tarjeta.", "Reserva cita de huellas o expedición de tarjeta y lleva pasaporte, foto, aprobación, tasa pagada y padrón si tu domicilio debe constar."],
      links: ["tie-form", "cita", "790-012"]
    } : {
      process: "TIE card after VISA approval",
      explanation: "After choosing TIE, first confirm that a visa, authorization, or favorable decision already exists. The TIE does not grant residence by itself; it documents permission that was already approved.",
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
      explanation: "<p><strong>Para qué sirve:</strong> Abrir una cuenta bancaria en España suele ser uno de los primeros pasos prácticos al instalarte. Puede hacer falta para nómina, alquiler, recibos, suministros y trámites fiscales.</p><p><strong>Qué puede pedir el banco:</strong></p><ul><li>Pasaporte o documento de identidad</li><li>NIE o TIE, si ya lo tienes</li><li>Padrón o prueba de domicilio</li><li>Justificante de ingresos o empleo</li></ul><p><strong>Nota práctica:</strong> Algunas entidades ofrecen cuentas de no residente o para recién llegados, pero pueden tener límites. Bancos grandes como CaixaBank, Santander, BBVA, Sabadell y Bankinter son habituales; Revolut y bunq pueden servir como opción temporal mientras organizas la documentación local.</p>",
      steps: ["Comprueba primero para qué necesitas la cuenta: nómina, alquiler, autónomo, ahorros o trámites diarios.", "Prepara identificación, NIE/TIE si ya lo tienes, prueba de domicilio y cualquier justificante de ingresos o residencia que el banco pueda pedir.", "Compara si te conviene una cuenta para recién llegado, una cuenta de no residente o una cuenta ordinaria de residente según tu situación real.", "Si todavía no puedes abrir una cuenta bancaria española tradicional, una opción temporal puede ser empezar con Revolut o bunq mientras organizas tu documentación local."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq", "bank-wise"]
    } : {
      process: "Bank account and banking basics",
      explanation: "<p><strong>What it is for:</strong> Opening a Spanish bank account is one of the first practical steps after arriving. You typically need it for salary payments, rent direct debits, utility contracts, and tax filings.</p><p><strong>What the bank may expect:</strong></p><ul><li>NIE</li><li>Passport</li><li>Padrón certificate</li><li>Proof of income or employment</li></ul><p><strong>Practical note:</strong> Non-residents can often open a non-resident account with fewer documents, but these have limitations. Major retail banks include CaixaBank, Santander, BBVA, Sabadell, and Bankinter; online options like Revolut and Wise are popular for everyday use, but may not satisfy landlords or employers who require a Spanish IBAN. Some banks have English-speaking branches or services in expat-heavy areas — worth asking before you commit.</p>",
      steps: ["First confirm what you need the account for: salary, rent, self-employment, savings, or everyday payments.", "Prepare identity documents, NIE/TIE if you already have one, proof of address, and any income or residence evidence the bank may request.", "Compare whether a newcomer account, non-resident account, or ordinary resident account fits your real situation best.", "If you cannot open a traditional Spanish bank account yet, a temporary starting option can be Revolut or bunq while you sort out your local paperwork."],
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
      explanation: "<p><strong>Para qué sirve:</strong> Buscar trabajo en España combina portales oficiales, plataformas privadas y redes locales.</p><p><strong>Dónde buscar:</strong> SEPE y Empléate ayudan a ver recursos públicos, orientación y ofertas registradas; InfoJobs, LinkedIn, Indeed, Job Today y portales especializados amplían mucho la búsqueda.</p><p><strong>Qué puede pedir la oficina:</strong> Los ciudadanos de la UE pueden trabajar sin autorización adicional, pero los no comunitarios normalmente necesitan una autorización de trabajo antes de empezar.</p><p><strong>Nota práctica:</strong> El español abre muchas más opciones fuera de empresas internacionales o zonas muy turísticas.</p>",
      steps: ["Define si buscas empleo local, remoto desde España, trabajo estacional o un sector concreto.", "Prepara CV, datos de contacto y documentación básica para candidaturas, y revisa si tu situación te permite trabajar legalmente en España.", "Empieza por portales públicos y oficiales para ver vacantes, orientación y recursos del mercado laboral.", "Después amplía la búsqueda con portales privados grandes y especializados para comparar volumen, sectores y forma de aplicar."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo"]
    } : {
      process: "Job search in Spain",
      explanation: "<p><strong>What it is for:</strong> Finding work in Spain as a foreigner usually involves a mix of official portals and local networks.</p><p><strong>Where to look:</strong> The main public job portal is SEPE (Servicio Público de Empleo Estatal) at sepe.es, which lists registered vacancies and manages unemployment benefits. InfoJobs, LinkedIn, and Tecnoempleo are among the most-used private job boards.</p><p><strong>What the office may expect:</strong> EU citizens can generally work without restriction; non-EU citizens usually need a work authorization tied to a specific employer before starting.</p><p><strong>Timing:</strong> Registering with SEPE is also required to access unemployment benefits (prestación por desempleo) if you lose a job — you generally need to register within 15 working days of becoming unemployed.</p><p><strong>Practical note:</strong> Learning Spanish significantly expands options outside major cities and international companies.</p>",
      steps: ["Decide whether you are looking for local work, remote work from Spain, seasonal work, or a specific sector.", "Prepare a CV, contact details, and basic application documents, and check whether your current status lets you work legally in Spain.", "Start with public and official portals so you can see vacancies, guidance, and labour-market resources.", "Then widen the search through large private and specialist portals so you can compare volume, sectors, and application style."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo"]
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
      explanation: "La entrada a España depende de tu pasaporte. Los ciudadanos de la UE, EEE y Suiza pueden entrar con pasaporte o documento nacional de identidad válido. Muchas nacionalidades no comunitarias pueden entrar sin visado hasta 90 días en cualquier periodo de 180 días dentro de todo el espacio Schengen, no solo España. Otras nacionalidades necesitan visado Schengen antes de viajar. Desde abril de 2026 está en vigor el Sistema de Entradas y Salidas (EES): a los viajeros no comunitarios se les registran las huellas y una foto en la frontera en la primera entrada en lugar de sellar el pasaporte, y el sistema controla automáticamente la regla de 90/180 — los ciudadanos de la UE/EEE/Suiza y los no comunitarios con permiso de residencia o visado de larga duración están exentos. ETIAS, una autorización previa al viaje aparte para viajeros no comunitarios exentos de visado, se espera más adelante y todavía no es obligatoria; conviene revisar el estado actual antes del viaje. El seguro de viaje no suele ser obligatorio para ciudadanos UE, pero es recomendable y puede ser obligatorio para solicitantes de visado Schengen.",
      steps: ["Confirma si tu estancia es una visita corta ordinaria y no una mudanza o residencia.", "Revisa si eres ciudadano de la UE/EEE/Suiza o si tu pasaporte entra por reglas Schengen para no comunitarios.", "Si eres viajero no comunitario, cuenta con el registro biométrico (huellas y foto) en la frontera por el EES a la entrada.", "Comprueba antes de viajar los documentos de entrada, seguro si aplica y la regla de 90/180 cuando corresponda."],
      links: ["eu-short-stay", "schengen", "ees", "calculator"]
    } : {
      process: "Entry rules and short stays",
      explanation: "Entry to Spain depends on your passport. EU, EEA, and Swiss citizens can enter freely with a valid passport or national ID for any length of stay. Most other nationalities can enter Spain visa-free for up to 90 days in any 180-day period across the whole Schengen area — not just Spain. Some nationalities need a Schengen short-stay visa before travelling. Since April 2026 the EU's Entry/Exit System (EES) is in force: non-EU visitors have their fingerprints and photo registered at the border on first entry instead of a passport stamp, and the system tracks the 90/180 allowance automatically — EU/EEA/Swiss citizens and non-EU holders of a Spanish residence permit or long-stay visa are exempt. ETIAS, a separate pre-travel authorisation for currently visa-free non-EU visitors, is expected later and not yet required — check the current status before you travel. Travel insurance is not legally required for EU citizens but is strongly recommended; it may be required for Schengen visa applicants.",
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
    "vacation-reviews": "Reseñas y comparación de zonas, alojamientos y experiencias."
  } : {
    "vacation-entry": "Basic rules for short visits, Schengen stays, and trips up to 90 days.",
    "vacation-citizenship": "Quick orientation for EU visitors versus non-EU travellers.",
    "vacation-flights": "Flights, airports, and search tools for arriving and moving around smoothly.",
    "vacation-ground": "Trains, buses, and car rental for getting around inside Spain.",
    "vacation-booking": "Large booking platforms for comparing places to stay before you reserve.",
    "vacation-hotels": "Major hotel chains with a strong presence in Spain.",
    "vacation-tourism": "Official tourism portals and ideas for choosing destinations and planning better.",
    "vacation-reviews": "Reviews and comparison tools for neighborhoods, stays, and experiences."
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
    "driving-licence-exchange": "./assets/topic-scenes/live-driving-licence-20260625.webp",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.webp",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.webp",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.webp",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.webp",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.webp",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.webp",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.webp"
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
          <button type="button" data-direct-route="${id}">${t("openGuideButton")}</button>
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
          topics: [["vacation-flights", "Vuelos y aeropuertos"], ["vacation-ground", "Trenes, autobuses y coche"]],
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
            topics: [["vacation-flights", "Flights and airports"], ["vacation-ground", "Trains, buses, and car hire"]],
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
          }
        ];
  result.innerHTML = renderTopicLibrary(
    currentLang === "es" ? "Vacaciones en España" : "Vacation in Spain",
    currentLang === "es"
      ? "Empieza por la parte del viaje que quieras aclarar y luego abre la guía concreta."
      : "Start with the part of the trip you want to sort out, then open the guide that fits.",
    groups,
    currentLang === "es" ? "Guías de vacaciones en España" : "Vacation in Spain guides"
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

function renderNationalityPathBlock(routeId) {
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
          ? `button type="button" class="${rowClass}" data-direct-route="${directRoute}"`
          : officialUrl
            ? `a class="${rowClass}" href="${officialUrl}" target="_blank" rel="noreferrer"`
          : `div class="${rowClass}"`;
      const closingTag = isGuideLink ? "button" : officialUrl ? "a" : "div";
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
      "provider-movistar": { intro: "Major traditional operator for mobile, fibre, and full home-service bundles.", logo: "M" },
      "provider-vodafone": { intro: "Well-known mobile and broadband operator with mainstream bundled options.", logo: "V" },
      "provider-orange": { intro: "Large national provider for mobile, fibre, and combined home packages.", logo: "Orange" },
      "provider-digi": { intro: "Popular lower-cost option for mobile and fibre, often attractive for newcomers.", logo: "DIGI" },
      "provider-o2": { intro: "Cleaner no-frills option under Movistar's network, often with simpler plans.", logo: "O2" },
      "provider-yoigo": { intro: "Common alternative for mobile and fibre bundles with a more flexible feel.", logo: "yoigo" }
    },
    es: {
      "provider-movistar": { intro: "Gran operador tradicional para móvil, fibra y paquetes completos para casa.", logo: "M" },
      "provider-vodafone": { intro: "Operador conocido de móvil y banda ancha con opciones combinadas bastante comunes.", logo: "V" },
      "provider-orange": { intro: "Proveedor nacional grande para móvil, fibra y paquetes de hogar combinados.", logo: "Orange" },
      "provider-digi": { intro: "Opción popular de menor coste para móvil y fibra, muchas veces atractiva para recién llegados.", logo: "DIGI" },
      "provider-o2": { intro: "Opción más sencilla y sin extras bajo la red de Movistar, a menudo con tarifas más limpias.", logo: "O2" },
      "provider-yoigo": { intro: "Alternativa común para móvil y fibra con una sensación algo más flexible.", logo: "yoigo" }
    },
  };
  const jobsMeta = {
    en: {
      "jobs-empleate": { intro: "Public employment portal that brings together vacancies and labour-market information.", logo: "Empléate" },
      "jobs-sepe": { intro: "Official SEPE area for finding work, guidance, and employment resources in Spain.", logo: "SEPE" },
      "jobs-eures": { intro: "Useful if you want cross-border or Europe-linked job opportunities involving Spain.", logo: "EURES" },
      "jobs-infojobs": { intro: "One of the biggest mainstream job portals in Spain across many sectors.", logo: "InfoJobs" },
      "jobs-linkedin": { intro: "Strong for professional roles, networking, and company-driven hiring.", logo: "in" },
      "jobs-indeed": { intro: "Large aggregator-style portal useful for broad searches across many job types.", logo: "Indeed" },
      "jobs-jobtoday": { intro: "Popular for fast-moving retail, hospitality, and service-sector roles.", logo: "JOB TODAY" },
      "jobs-tecnoempleo": { intro: "Specialist portal for tech, IT, and telecom roles in Spain.", logo: "Tecno" }
    },
    es: {
      "jobs-empleate": { intro: "Portal público de empleo que reúne ofertas e información del mercado laboral.", logo: "Empléate" },
      "jobs-sepe": { intro: "Área oficial del SEPE para encontrar trabajo, orientación y recursos de empleo en España.", logo: "SEPE" },
      "jobs-eures": { intro: "Útil si buscas oportunidades laborales vinculadas a España y a la movilidad europea.", logo: "EURES" },
      "jobs-infojobs": { intro: "Uno de los portales generalistas de empleo más grandes de España en muchos sectores.", logo: "InfoJobs" },
      "jobs-linkedin": { intro: "Muy útil para perfiles profesionales, networking y procesos impulsados por empresas.", logo: "in" },
      "jobs-indeed": { intro: "Gran portal tipo agregador útil para búsquedas amplias de muchos tipos de empleo.", logo: "Indeed" },
      "jobs-jobtoday": { intro: "Popular para hostelería, comercio y trabajos de servicios con movimiento rápido.", logo: "JOB TODAY" },
      "jobs-tecnoempleo": { intro: "Portal especializado en tecnología, informática y telecomunicaciones en España.", logo: "Tecno" }
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
      "dgt-bilateral-agreements": "DGT bilateral agreements list"
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
      "dgt-bilateral-agreements": "Lista de acuerdos bilaterales de la DGT"
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
    "jobs-sepe": "https://www.sepe.es/HomeSepe/es/encontrar-trabajo.html",
    "jobs-eures": "https://www.sepe.es/HomeSepe/es/encontrar-trabajo/empleo-europa.html",
    "jobs-infojobs": "https://candidatos.infojobs.net/",
    "jobs-linkedin": "https://es.linkedin.com/jobs",
    "jobs-indeed": "https://es.indeed.com/",
    "jobs-jobtoday": "https://jobtoday.com/es",
    "jobs-tecnoempleo": "https://www.tecnoempleo.com/",
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
    "citizenship-application": "https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola/"
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
      subtitle: currentLang === "es" ? "Portal público oficial de empleo" : "Official public employment portal",
      variant: "social",
      system: "spain"
    },
    "jobs-sepe": {
      subtitle: currentLang === "es" ? "Servicio Público de Empleo Estatal" : "Official State Employment Service",
      variant: "social",
      system: "spain"
    },
    "jobs-eures": {
      subtitle: currentLang === "es" ? "Red oficial europea de empleo" : "Official European employment network",
      variant: "eu",
      system: "eu"
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
    "dgt.gob.es",
    "sede.dgt.gob.es",
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
        const system = meta.system || "spain";
        const emblemClass = system === "eu" ? "gov-link-stars" : "gov-link-bars";
        return `
          <a class="gov-link gov-link--${meta.variant} gov-link--${system}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="gov-link-badge gov-link-badge--${system}" aria-hidden="true">
              <span class="${emblemClass}"></span>
            </span>
            <span class="gov-link-copy">
              <strong>${label}</strong>
              <span>${meta.subtitle}</span>
            </span>
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
        const brandClass = `jobs-link jobs-link--${type.replace("jobs-", "")}`;
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
  const target = document.querySelector(`#${targetId}`);
  if (!target) return false;
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
if (!openNavSectionIfRequested()) showNormalApp();

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
