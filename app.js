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
      "If you are an EU, EEA, or Swiss citizen living in Spain for more than 3 months, the usual route is the Certificado de Registro de Ciudadano de la Union. Have your NIE details and padrón certificate ready; if you do not already have a NIE, confirm whether the office assigns it through this registration or asks for a separate NIE step first.",
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
      "If you are an EU, EEA, or Swiss citizen living in Spain for more than 3 months and working there, the usual route is the Certificado de Registro de Ciudadano de la Union. Your employment or self-employment evidence supports the registration, and you should have your NIE details and padrón certificate ready.",
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
      "Use this when you need a Spanish foreigner identity number for an economic, professional, or social reason, but you are not yet registering as resident. A NIE is only an identification number; it does not give a non-EU citizen permission to live in Spain long term or work in Spain.",
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
      "Many non-EU residents need the Tarjeta de Identidad de Extranjero after a visa or residence authorization is granted. The TIE is the card; the authorization is the legal status.",
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
      "For non-EU citizens who want to live in Spain and work for a Spanish employer or as self-employed. The likely path is a residence and work authorization before starting work.",
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
      "For non-EU workers or professionals who carry out remote work for companies or clients outside Spain. People legally in Spain may be able to apply directly through UGE-CE.",
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
      "For non-EU applicants who want to reside in Spain without carrying out work or professional activity. This is commonly started from the country of origin.",
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
      "For studies, training, student mobility, internships, or related activities lasting more than 90 days. Family members may have linked options in some cases.",
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
      "For eligible relatives of a legal resident in Spain. Requirements depend on the family relationship and the resident sponsor's situation.",
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
      "For non-EU family members joining or accompanying an EU, EEA, Swiss, or qualifying Spanish citizen in Spain. The usual route is the residence card for a family member of a Union citizen.",
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
  ["NIE assignment at the request of the applicant", "790-012", "9.84 EUR"],
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
    links: ["cita", "790-012", "helper"]
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
    links: ["cita", "790-012", "helper"]
  },
  "nie-only": {
    forms: [
      ["EX-15", "NIE assignment request", "Form", "EX-15"],
      ["Reason document", "Written economic, professional, or social reason for needing the NIE", "Evidence", ""]
    ],
    taxes: [["790-012", "NIE assignment line in the Police fee form", "9.84 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
  },
  "tie-after-approval": {
    forms: [
      ["EX-17", "TIE card application", "Form", "EX-17"],
      ["Favorable resolution or visa", "Proof that the residence or stay authorization was granted", "Evidence", ""]
    ],
    taxes: [["790-012", "First TIE card after approval", "16.08 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
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
      ["UGE online application", "Authorization application for international telework / digital nomad residence", "Official application portal", ""],
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
      ["EX-19", "Residence card application for a non-EU family member of an EU citizen", "Authorization/card form", "EX-19"]
    ],
    taxes: [["790-012", "EU-family residence card fee", "12.00 EUR", "790-012"]],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
  }
};

const routeFormsAndTaxesFi = {
  "eu-registration": {
    forms: [
      ["EX-18", "EU-/ETA-/Sveitsin kansalaisen rekisteröintitodistus", "Lomake", "EX-18"],
      ["NIE", "Ulkomaalaisen tunnistenumero Espanjan hallintoa varten", "Pakollinen tieto", ""],
      ["Padrón", "Kunnallinen padrón-todistus tai volante", "Osoitetodiste", ""],
      ["Passi tai EU-henkilökortti", "Ajanvarauksessa käytettävä henkilöllisyysasiakirja", "Asiakirja", ""]
    ],
    taxes: [["790-012", "EU-rekisteröintitodistus", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
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
      ["EX-18", "EU-/ETA-/Sveitsin kansalaisen rekisteröintitodistus", "Lomake", "EX-18"],
      ["NIE", "Ulkomaalaisen tunnistenumero Espanjan hallintoa varten", "Pakollinen tieto", ""],
      ["Padrón", "Kunnallinen padrón-todistus tai volante", "Osoitetodiste", ""]
    ],
    taxes: [["790-012", "EU-rekisteröintitodistus", "12.00 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
  },
  "nie-only": {
    forms: [
      ["EX-15", "NIE-numeron hakemus", "Lomake", "EX-15"],
      ["Perusteluasiakirja", "Kirjallinen taloudellinen, ammatillinen tai sosiaalinen syy NIE:n tarpeelle", "Todiste", ""]
    ],
    taxes: [["790-012", "NIE-linja poliisin maksulomakkeessa", "9.84 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
  },
  "tie-after-approval": {
    forms: [
      ["EX-17", "TIE-korttihakemus", "Lomake", "EX-17"],
      ["Myönteinen päätös tai viisumi", "Todiste siitä, että oleskelu tai lupa on hyväksytty", "Todiste", ""]
    ],
    taxes: [["790-012", "Ensimmäinen TIE-kortti hyväksynnän jälkeen", "16.08 EUR", "790-012"]],
    links: ["cita", "790-012", "helper"]
  },
  "work-authorization": {
    forms: [
      ["EX-03", "Lupahakemus, jos työskentelet espanjalaiselle työnantajalle", "Lupalomake", "EX-03"],
      ["EX-07", "Lupahakemus, jos toimit itsenäisenä ammatinharjoittajana Espanjassa", "Lupalomake", "EX-07"],
      ["EX-17", "TIE-korttihakemus hyväksynnän jälkeen", "Lomake", "EX-17"]
    ],
    taxes: [["790-012", "Ensimmäinen TIE-kortti hyväksynnän jälkeen", "16.08 EUR", "790-012"]],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    forms: [
      ["UGE-verkkohakemus", "Lupahakemus kansainväliseen etätyöhön / diginomadioleskeluun", "Virallinen hakukanava", ""],
      ["EX-17", "TIE-korttihakemus hyväksynnän jälkeen", "Lomake", "EX-17"]
    ],
    taxes: [["790-012", "Ensimmäinen TIE-kortti hyväksynnän jälkeen", "16.08 EUR", "790-012"]],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    forms: [
      ["EX-01", "Hakemus alkuperäiseen työskentelemättömään oleskelulupaan", "Lupalomake", "EX-01"],
      ["EX-17", "TIE-korttihakemus viisumin/hyväksynnän jälkeen", "Lomake", "EX-17"]
    ],
    taxes: [["790-012", "Ensimmäinen TIE-kortti hyväksynnän jälkeen", "16.08 EUR", "790-012"]],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    forms: [
      ["EX-00", "Hakemus opiskeluun perustuvaan oleskeluun", "Lupalomake", "EX-00"],
      ["EX-17", "TIE-korttihakemus, jos kortti vaaditaan hyväksynnän jälkeen", "Lomake", "EX-17"]
    ],
    taxes: [["790-012", "TIE-kortti tarvittaessa", "16.08 EUR", "790-012"]],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    forms: [
      ["EX-02", "Hakemus tilapäiseen oleskeluun perheenyhdistämisen perusteella", "Lupalomake", "EX-02"],
      ["EX-17", "TIE-korttihakemus hyväksynnän jälkeen", "Lomake", "EX-17"]
    ],
    taxes: [["790-012", "Ensimmäinen TIE-kortti hyväksynnän jälkeen", "16.08 EUR", "790-012"]],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    forms: [
      ["EX-19", "EU-kansalaisen EU:n ulkopuolisen perheenjäsenen oleskelukorttihakemus", "Lupa-/korttilomake", "EX-19"]
    ],
    taxes: [["790-012", "EU-perheenjäsenen oleskelukortin maksu", "12.00 EUR", "790-012"]],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
  }
};

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
  "work-evidence": {
    title: "EU worker evidence checklist",
    purpose: "Supporting evidence for EU/EEA/Swiss citizens registering residence in Spain as workers or self-employed people.",
    officialUrl: "",
    fields: [
      ["Trabajador por cuenta ajena", "Employee working for an employer in Spain."],
      ["Contrato de trabajo", "Employment contract. Bring the signed contract if requested."],
      ["Alta en Seguridad Social", "Social Security registration or equivalent proof that your employment is active."],
      ["Trabajador por cuenta propia", "Self-employed/autonomo activity in Spain."],
      ["Alta censal / RETA", "Tax and self-employment registration evidence where applicable."],
      ["Domicilio en Espana", "Spanish address evidence, and padrón if your province asks for it."]
    ],
    checks: [
      "Bring originals and copies if the province requests copies.",
      "If you are newly hired, bring the strongest available proof that the job has started or is registered.",
      "If self-employed, bring tax registration and Social Security/autonomo evidence."
    ]
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
const VISITOR_COUNTER_URL = "";
const languageButtons = document.querySelectorAll("[data-lang]");
let currentLang = localStorage.getItem("holaPapersLang") || "en";
let currentDirectRoute = null;
let currentEntryPreset = null;
let currentScreenState = { type: "start" };
const navigationStack = [];

const translations = {
  en: {
    headerTitle: "Move, travel and settle in Spain.",
    startNav: "Home",
    supportNav: "Support IberiGo",
    startHeading: "Where should we begin?",
    startDisclaimer: "This is not legal advice. It is only here to help you understand what you might need before checking official sources.",
    movingTitle: "Move to Spain",
    movingDesc: "NIE, TIE, padron, EU registration, visas, and residency.",
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
    directSip: "Public health card",
    directPrivateHealth: "Private health insurance",
    directEhic: "EHIC / European Health Insurance Card",
    directBanking: "Bank account and banking basics",
    directJobs: "Job search in Spain",
    directTaxes: "Taxes and tax address",
    directPhone: "Phone number and internet",
    openGuideButton: "Open guide",
    footerSupportText: "IberiGo is free to use. If the site helps you, you can support its maintenance with a voluntary contribution.",
    footerSupportLink: "Support IberiGo"
  },
  es: {
    headerTitle: "Mudarte, viajar y establecerte en España.",
    startNav: "Inicio",
    supportNav: "Apoyar IberiGo",
    startHeading: "¿Por dónde empezamos?",
    startDisclaimer: "Esto no es asesoramiento legal. Solo sirve para ayudarte a entender qué podrías necesitar antes de consultar las fuentes oficiales.",
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
    directSip: "Tarjeta sanitaria pública",
    directPrivateHealth: "Seguro médico privado",
    directEhic: "Tarjeta Sanitaria Europea",
    directBanking: "Cuenta bancaria y banca básica",
    directJobs: "Buscar trabajo en España",
    directTaxes: "Impuestos y domicilio fiscal",
    directPhone: "Número de teléfono e internet",
    openGuideButton: "Abrir guía",
    footerSupportText: "IberiGo es gratuito. Si el sitio te ayuda, puedes apoyar su mantenimiento con una contribución voluntaria.",
    footerSupportLink: "Apoyar IberiGo"
  },
  fi: {
    headerTitle: "Muuta, matkusta ja asetu Espanjaan.",
    startNav: "Etusivu",
    supportNav: "Tue IberiGoa",
    startHeading: "Mistä aloitetaan?",
    startDisclaimer: "Tämä ei ole oikeudellista neuvontaa. Sen tarkoitus on vain auttaa sinua ymmärtämään, mitä saatat tarvita ennen virallisten lähteiden tarkistamista.",
    movingTitle: "Muutto Espanjaan",
    movingDesc: "NIE, TIE, padrón, EU-rekisteröinti, viisumit ja oleskelu.",
    movingChipVisa: "Viisumit",
    movingChipEu: "EU-rekisteri",
    movingChipStudy: "Opiskelu",
    movingChipFamily: "Perhe",
    movingButton: "Tutustu",
    vacationTitle: "Loma Espanjassa",
    vacationDesc: "Lyhyet vierailut, maahantulosäännöt, liikkuminen, majoitus ja käytännöllinen matkan suunnittelu Espanjassa.",
    vacationChipEntry: "Maahantulo",
    vacationChipTransport: "Liikkuminen",
    vacationChipStays: "Majoitus",
    vacationChipTrips: "Ideat",
    vacationButton: "Tutustu",
    livingTitle: "Asuminen Espanjassa",
    livingDesc: "Terveydenhuolto, pankit, verot, digiasiointi ja tärkeimmät arjen hallinnon vaiheet Espanjassa.",
    livingChipHealth: "Terveydenhuolto",
    livingChipBanking: "Pankki",
    livingChipJobs: "Työnhaku",
    livingChipTaxes: "Verot",
    livingChipSocial: "Sosiaaliturva",
    livingChipDigital: "Digiasiointi",
    livingButton: "Tutustu",
    hintPlain: "Selkeät seuraavat askeleet",
    hintSources: "Espanjan viralliset linkit",
    hintScope: "Koko Espanjan laajuinen opas",
    progressPerson: "1. Tilanne",
    progressGoal: "2. Tavoite",
    progressResult: "3. Tulos",
    personLegend: "Oletko?",
    personEu: "EU-, ETA- tai Sveitsin kansalainen",
    personEuDesc: "Saatat tarvita EU-rekisteröinnin, jos asut Espanjassa pidempään.",
    personNonEu: "EU:n ulkopuolinen kansalainen",
    personNonEuDesc: "Saatat tarvita viisumin, luvan, TIE-kortin tai lyhytaikaisen maahantuloreitin.",
    goalLegend: "Mitä yrität tehdä?",
    goalWork: "Asua ja työskennellä Espanjassa",
    goalWorkDesc: "Palkkatyö, yrittäjyys tai työlupareitti.",
    goalNoWork: "Asua Espanjassa ilman työntekoa",
    goalNoWorkDesc: "Omat varat, eläketulot tai ei työtoimintaa Espanjassa.",
    goalStudy: "Opiskella Espanjassa",
    goalStudyDesc: "Kurssit, yliopisto, koulutus, harjoittelut tai opiskelijaoikeuden paperit.",
    goalRemote: "Tehdä etätyötä Espanjasta",
    goalRemoteDesc: "Etätyö pääasiassa Espanjan ulkopuolisille yrityksille tai asiakkaille.",
    goalFamily: "Liittyä perheen luo Espanjaan",
    goalFamilyDesc: "Perheenyhdistäminen tai EU-kansalaisen perheenjäsenen oleskelukortti.",
    familyLegend: "Kenen luo liityt Espanjassa?",
    familyEu: "EU-/ETA-/Sveitsin tai kelpoisen Espanjan kansalaisen luo",
    familyEuDesc: "Yleensä tämä tarkoittaa EU-perheenjäsenen oleskelukorttia, mutta osa Espanjan kansalaisen perhetapauksista voi poiketa tästä.",
    familyNonEu: "Espanjassa asuvan EU:n ulkopuolisen kansalaisen luo",
    familyNonEuDesc: "Yleensä tämä tarkoittaa perheenyhdistämistä.",
    durationLegend: "Kuinka kauan aiot oleskella?",
    durationShort: "Alle 90 päivää",
    durationShortDesc: "Yleensä kyse on lyhyestä oleskelusta tai maahantulosäännöistä.",
    durationLong: "Yli 90 päivää / pitkäaikaisesti",
    durationLongDesc: "Yleensä vaatii rekisteröinnin, viisumin, luvan tai kortin.",
    durationNotSure: "En ole varma",
    durationNotSureDesc: "Valitse tämä, jos suunnittelet vielä ja haluat varovaisen aloituspisteen.",
    continueButton: "Jatka",
    showRouteButton: "Näytä todennäköinen reitti",
    emptyTitle: "Oma reittisi näkyy täällä",
    emptyText: "Valitse tilannekortti tai vastaa yllä oleviin kysymyksiin nähdäksesi koko Espanjan laajuisen reitin.",
    nextSteps: "Seuraavat 3 vaihetta",
    officialLinks: "Viralliset linkit",
    resultDisclaimer: "Vaatimukset voivat vaihdella henkilökohtaisen tilanteen mukaan ja muuttua ajan myötä. Tarkista tiedot aina virallisista lähteistä.",
    livingNext: "Mitä tarvitset seuraavaksi?",
    directPadron: "Padrón / kunnallinen osoiterekisteröinti",
    directNie: "NIE-numero",
    directTie: "TIE-kortti viisumin hyväksynnän jälkeen",
    directSocial: "Sosiaaliturvatunnus",
    directDigital: "Digiasiointi: Cl@ve tai digitaalinen varmenne",
    directSip: "Julkinen terveydenhuoltokortti",
    directPrivateHealth: "Yksityinen sairausvakuutus",
    directEhic: "Eurooppalainen sairaanhoitokortti",
    directBanking: "Pankkitili ja pankkiasioinnin perusteet",
    directJobs: "Työnhaku Espanjassa",
    directTaxes: "Verot ja verosoite",
    directPhone: "Puhelinnumero ja internet",
    openGuideButton: "Avaa opas",
    footerSupportText: "IberiGo on ilmainen käyttää. Jos sivusto auttaa sinua, voit tukea sen ylläpitoa vapaaehtoisella maksulla.",
    footerSupportLink: "Tue IberiGoa"
  }
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
    difficulty: "Baja",
    timeline: "No hay trámite de residencia para una visita corta ordinaria",
    steps: ["Viaja con pasaporte o documento nacional de identidad válido.", "Ten disponible cobertura sanitaria o Tarjeta Sanitaria Europea.", "Usa los enlaces oficiales de turismo y transporte para planificar trenes, aeropuertos, autobuses y alojamiento.", "Si después decides vivir en España, usa la ruta de registro de ciudadano de la UE."],
    documents: ["Pasaporte o documento nacional de identidad", "Cobertura sanitaria para el viaje", "Datos de viaje y alojamiento"],
    links: ["eu-short-stay", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "non-eu-vacation": {
    process: "Estancia corta Schengen",
    difficulty: "Baja a media",
    timeline: "Depende de si tu pasaporte necesita visado Schengen",
    steps: ["Comprueba si tu pasaporte necesita visado Schengen de corta estancia.", "Comprueba la regla de 90 días en cualquier periodo de 180 días.", "Prepara seguro de viaje, alojamiento, viaje de regreso o continuación y fondos si te los piden.", "Usa los enlaces de turismo y transporte para planificar trenes, aeropuertos, autobuses y dónde alojarte.", "No trates una estancia corta como permiso para vivir o trabajar en España."],
    documents: ["Pasaporte", "Visado Schengen si es necesario", "Seguro de viaje si es necesario", "Prueba de alojamiento y viaje de regreso o continuación"],
    links: ["schengen", "calculator", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "work-authorization": {
    process: "Autorización de residencia y trabajo",
    difficulty: "Alta",
    timeline: "A menudo varios meses",
    steps: ["Confirma si la ruta es trabajo por cuenta ajena o por cuenta propia.", "Prepara contrato, plan de negocio y pruebas profesionales según corresponda.", "Solicita la autorización de residencia y trabajo antes de empezar a trabajar.", "Tras la aprobación, completa el visado y la TIE si corresponde.", "Paga el Modelo 790-012 para el paso de la tarjeta cuando sea aplicable."],
    documents: ["Pasaporte", "EX-03 para cuenta ajena o EX-07 para cuenta propia", "Contrato o plan de negocio", "Titulación cuando sea necesaria", "EX-17 tras la aprobación", "Justificante 790-012 para la tarjeta"],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    process: "Teletrabajo internacional / nómada digital",
    difficulty: "Alta",
    timeline: "A menudo de uno a tres meses tras presentar un expediente completo",
    steps: ["Confirma que trabajas principalmente para empresas o clientes fuera de España.", "Prepara contratos, pruebas de empresa, cualificación o experiencia, cobertura sanitaria y documentos de antecedentes si los piden.", "Solicita por la ruta oficial de teletrabajo o por vía consular.", "Tras la aprobación, completa la TIE si corresponde.", "Configura identificación digital cuando seas elegible."],
    documents: ["Pasaporte", "Pruebas de trabajo remoto", "Documentos de empresa o clientes", "Cualificación o experiencia", "Cobertura sanitaria", "Certificado de antecedentes penales cuando sea necesario"],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    process: "Residencia no lucrativa",
    difficulty: "Alta",
    timeline: "A menudo varios meses, normalmente mediante consulado",
    steps: ["Confirma que no vas a trabajar ni realizar actividad profesional en España.", "Prepara fondos, seguro médico, antecedentes penales y certificado médico cuando los pidan.", "Solicita por la ruta oficial de residencia no lucrativa.", "Tras la aprobación o el visado, completa la TIE si corresponde.", "Usa padrón e identificación digital después de llegar."],
    documents: ["Pasaporte", "EX-01 o vía consular", "Prueba de fondos", "Seguro médico", "Certificado de antecedentes penales", "Certificado médico", "EX-17 tras la aprobación"],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    process: "Autorización de estancia por estudios",
    difficulty: "Media a alta",
    timeline: "A menudo de uno a tres meses tras presentar un expediente completo",
    steps: ["Prepara prueba de admisión o matrícula.", "Prepara fondos, seguro médico, pasaporte y documentos públicos legalizados o traducidos cuando sea necesario.", "Solicita por la ruta oficial de estancia por estudios.", "Si tu estancia requiere tarjeta, completa el paso de la TIE tras la aprobación.", "Controla las fechas de renovación si el curso continúa."],
    documents: ["Pasaporte", "EX-00", "Prueba de admisión o matrícula", "Prueba de fondos", "Seguro médico", "EX-17 si se requiere TIE"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Reagrupación familiar",
    difficulty: "Alta",
    timeline: "A menudo varios meses",
    steps: ["Confirma que el familiar en España es residente legal no comunitario y puede reagruparte.", "Prepara prueba del vínculo familiar, documentos de residencia del reagrupante, vivienda y medios económicos.", "Solicita por la ruta de reagrupación familiar.", "Tras la aprobación y el visado, completa el paso de la TIE.", "Controla las fechas de renovación."],
    documents: ["Pasaporte", "EX-02", "Prueba del vínculo familiar", "Documentos de residencia del reagrupante", "Prueba de vivienda y medios económicos", "EX-17 tras la aprobación"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "Tarjeta de residencia de familiar de ciudadano de la UE",
    difficulty: "Media a alta",
    timeline: "A menudo de unas semanas a unos meses",
    steps: ["Confirma que el familiar es ciudadano de la UE, EEE, Suiza o ciudadano español cualificado.", "Prepara prueba del vínculo y la base de residencia del ciudadano UE/español.", "Completa el formulario EX-19.", "Reserva la cita correspondiente para tarjeta de familiar de ciudadano de la UE.", "Paga el Modelo 790-012 si lo exige el proceso de tarjeta."],
    documents: ["Pasaporte", "EX-19", "DNI o certificado de registro UE del ciudadano UE/español", "Matrimonio, pareja, nacimiento o prueba de dependencia", "Justificante 790-012 si lo piden"],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
  }
};

const roadmapDetailsFi = {
  "eu-registration": {
    process: "EU-rekisteröintitodistus",
    difficulty: "Keskitaso",
    timeline: "Usein muutama viikko ajanvarauksen saatavuudesta riippuen",
    steps: [
      "Valmistele NIE-numero ja padrón-todistus ennen EU-rekisteröintiaikaa.",
      "Valmistele todiste varoista, työsopimus, yrittäjyystodiste tai opiskeludokumentit.",
      "Jos haluat asua Espanjassa ilman työntekoa, järjestä voimassa oleva sairausvakuutus osaksi rekisteröinnin perustetta.",
      "Maksa Modelo 790-012 EU-rekisteröintitodistusta varten.",
      "Täytä EX-18-lomake.",
      "Mene EU-rekisteröintitodistuksen ajanvaraukseen."
    ],
    documents: ["Passi tai EU-henkilökortti", "NIE", "Padrón-todistus tai volante", "EX-18", "Todiste työstä, varoista tai opinnoista", "Sairausvakuutus, jos perusteena on asuminen Espanjassa ilman työntekoa", "790-012-maksukuitti"],
    links: ["eu-certificate", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "790-012", "cita"]
  },
  "eu-working": {
    process: "EU-rekisteröintitodistus työntekijälle",
    difficulty: "Keskitaso",
    timeline: "Usein muutama viikko ajanvarauksen saatavuudesta riippuen",
    steps: [
      "Valmistele NIE-numero ja padrón-todistus ennen EU-rekisteröintiaikaa.",
      "Valmistele työsopimus, alta Seguridad Socialiin tai yrittäjyystodistus.",
      "Maksa Modelo 790-012.",
      "Täytä EX-18-lomake.",
      "Mene EU-rekisteröintitodistuksen ajanvaraukseen.",
      "Säilytä todistus ja NIE työ-, vero- ja digiasiointia varten."
    ],
    documents: ["Passi tai EU-henkilökortti", "NIE", "Padrón-todistus tai volante", "EX-18", "Todiste työstä", "790-012-maksukuitti"],
    links: ["eu-certificate", "790-012", "cita"]
  },
  "eu-vacation": {
    process: "EU-kansalaisen lyhyt oleskelu",
    difficulty: "Helppo",
    timeline: "Tavalliseen lyhyeen vierailuun ei tarvita oleskelumenettelyä",
    steps: ["Matkusta voimassa olevalla passilla tai henkilökortilla.", "Pidä sairausvakuutus tai eurooppalainen sairaanhoitokortti saatavilla.", "Käytä virallisia matkailu- ja liikkumislinkkejä junien, lentokenttien, bussien ja majoituksen suunnitteluun.", "Jos päätät myöhemmin asua Espanjassa, käytä EU-rekisteröintireittiä."],
    documents: ["Passi tai henkilökortti", "Sairausvakuutus matkalle", "Matka- ja majoitustiedot"],
    links: ["eu-short-stay", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "non-eu-vacation": {
    process: "Schengen-alueen lyhyt oleskelu",
    difficulty: "Helppo tai keskitaso",
    timeline: "Riippuu siitä, tarvitseeko passisi Schengen-viisumin",
    steps: ["Tarkista tarvitseeko passisi Schengen-lyhytaikaviisumin.", "Tarkista 90 päivää 180 päivän aikana -sääntö.", "Valmistele matkavakuutus, majoitus, paluu- tai jatkomatkatiedot ja varat, jos niitä pyydetään.", "Käytä matkailu- ja liikkumislinkkejä junien, lentokenttien, bussien ja majoituksen suunnitteluun.", "Älä pidä lyhyttä oleskelua lupana asua tai työskennellä Espanjassa."],
    documents: ["Passi", "Schengen-viisumi tarvittaessa", "Matkavakuutus tarvittaessa", "Todiste majoituksesta ja paluu- tai jatkomatkasta"],
    links: ["schengen", "calculator", "travel-spaininfo", "travel-renfe", "travel-aena", "travel-alsa", "travel-paradores", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams", "car-europcar", "car-sixt", "car-avis", "car-hertz", "stay-booking", "stay-airbnb", "stay-expedia", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
  },
  "work-authorization": {
    process: "Oleskelu- ja työlupa",
    difficulty: "Vaikea",
    timeline: "Usein useita kuukausia",
    steps: ["Varmista onko kyse palkkatyöstä vai yrittäjyydestä.", "Valmistele työnantajan sopimus tai liiketoimintasuunnitelma sekä ammatilliset todisteet.", "Hae oleskelu- ja työlupaa ennen työn aloittamista.", "Hyväksynnän jälkeen hoida viisumi- ja TIE-korttivaiheet tarvittaessa.", "Maksa Modelo 790-012 korttivaihetta varten tarvittaessa."],
    documents: ["Passi", "EX-03 palkkatyöhön tai EX-07 yrittäjyyteen", "Sopimus tai liiketoimintasuunnitelma", "Pätevyydet tarvittaessa", "EX-17 hyväksynnän jälkeen", "790-012-korttivaiheen kuitti"],
    links: ["work-employed", "work-self-employed", "cita", "790-012"]
  },
  "digital-nomad": {
    process: "Kansainvälinen etätyö / digitaalinen nomadi",
    difficulty: "Vaikea",
    timeline: "Usein yhdestä kolmeen kuukautta täydellisen hakemuksen jälkeen",
    steps: ["Varmista, että työsi on pääasiassa Espanjan ulkopuolisille yrityksille tai asiakkaille.", "Valmistele sopimukset, yritystodisteet, pätevyys tai kokemus, sairausvakuutus ja rikosrekisteriote tarvittaessa.", "Hae virallisen etätyöreitin tai konsulaattimenettelyn kautta.", "Hyväksynnän jälkeen hoida TIE-korttivaihe tarvittaessa.", "Ota digitaalinen tunnistautuminen käyttöön, kun se on mahdollista."],
    documents: ["Passi", "Todiste etätyöstä", "Yritys- tai asiakasasiakirjat", "Pätevyys tai kokemus", "Sairausvakuutus", "Rikosrekisteriote tarvittaessa"],
    links: ["digital-nomad-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  "non-lucrative": {
    process: "Työskentelemätön oleskelulupa",
    difficulty: "Vaikea",
    timeline: "Usein useita kuukausia, tavallisesti konsulaatin kautta",
    steps: ["Varmista, ettet työskentele tai harjoita ammattitoimintaa Espanjassa.", "Valmistele todiste varoista, sairausvakuutus, rikosrekisteriote ja lääkärintodistus tarvittaessa.", "Hae virallisen työskentelemättömän oleskelureitin kautta.", "Hyväksynnän tai viisumin jälkeen hoida TIE-korttivaihe tarvittaessa.", "Hoida padrón ja digiasiointi maahan saapumisen jälkeen."],
    documents: ["Passi", "EX-01 tai konsulaatin hakureitti", "Todiste varoista", "Sairausvakuutus", "Rikosrekisteriote", "Lääkärintodistus", "EX-17 hyväksynnän jälkeen"],
    links: ["non-lucrative-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  study: {
    process: "Opiskeluun perustuva oleskelu",
    difficulty: "Keskitaso tai vaikea",
    timeline: "Usein yhdestä kolmeen kuukautta täydellisen hakemuksen jälkeen",
    steps: ["Valmistele hyväksymis- tai ilmoittautumistodistus.", "Valmistele varat, sairausvakuutus, passi ja tarvittaessa laillistetut/käännetyt julkiset asiakirjat.", "Hae virallisen opiskelureitin kautta.", "Jos oleskelu vaatii kortin, hoida TIE-vaihe hyväksynnän jälkeen.", "Pidä uusimispäivät näkyvillä, jos opiskelu jatkuu."],
    documents: ["Passi", "EX-00", "Hyväksymis- tai ilmoittautumistodistus", "Todiste varoista", "Sairausvakuutus", "EX-17 jos TIE vaaditaan"],
    links: ["study-official", "insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre", "cita", "790-012"]
  },
  family: {
    process: "Perheenyhdistäminen",
    difficulty: "Vaikea",
    timeline: "Usein useita kuukausia",
    steps: ["Varmista, että Espanjassa oleva perheenjäsen on EU:n ulkopuolinen laillinen asukas ja voi toimia sponsorina.", "Valmistele todiste perhesuhteesta, sponsorin oleskeluasiakirjat, asumistodiste ja taloudelliset todisteet.", "Hae perheenyhdistämisreitin kautta.", "Hyväksynnän ja viisumivaiheiden jälkeen hoida TIE-korttivaihe.", "Pidä uusimispäivät näkyvillä."],
    documents: ["Passi", "EX-02", "Todiste perhesuhteesta", "Sponsorin oleskeluasiakirjat", "Asumis- ja taloudelliset todisteet", "EX-17 hyväksynnän jälkeen"],
    links: ["family-official", "cita", "790-012"]
  },
  "eu-family": {
    process: "EU-kansalaisen perheenjäsenen oleskelukortti",
    difficulty: "Keskitaso tai vaikea",
    timeline: "Usein muutamasta viikosta muutamaan kuukauteen",
    steps: ["Varmista, että perheenjäsen on EU-, ETA-, Sveitsin tai kelpoinen Espanjan kansalainen.", "Valmistele todiste suhteesta ja EU-/Espanjan kansalaisen oleskeluperusteesta.", "Täytä EX-19.", "Varaa asianmukainen EU-perheenjäsenen oleskelukortin aika.", "Maksa Modelo 790-012, jos korttiprosessi sitä vaatii."],
    documents: ["Passi", "EX-19", "EU-/Espanjan kansalaisen DNI tai EU-rekisteröintitodistus", "Todiste avioliitosta, parisuhteesta, syntymästä tai riippuvuudesta", "790-012-kuitti tarvittaessa"],
    links: ["eu-family-official", "eu-family-spain", "cita", "790-012"]
  },
  "already-spain": {
    process: "Espanjan perushallintoasiat",
    difficulty: "Helppo tai keskitaso",
    timeline: "Yleensä vaiheittain muutaman viikon aikana",
    steps: ["Hanki padrón, jos sinulla on osoite Espanjassa.", "Tarkista tarvitsetko NIE:n, EU-rekisteröinnin, TIE:n vai uusinnan.", "Valmistele digitaalinen tunnistautuminen FNMT:n kautta, jos sinulla on NIE, tai Cl@ve jos olet oikeutettu.", "Säilytä kopiot ajanvarauksista, kuiteista ja todistuksista."],
    documents: ["Passi tai henkilökortti", "Vuokra-, omistus- tai osoitetodiste", "Nykyinen NIE/TIE jos on", "Ajanvarausvahvistukset"],
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
      : currentLang === "fi"
        ? roadmapDetailsFi[route.id]
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
    : currentLang === "fi"
      ? "Tämä on vain lähtökohta; kansalaisuutesi, konsulaatti, perhetilanne ja asiakirjat voivat muuttaa tarkkaa prosessia."
      : "This is only a starting point; your nationality, consulate, family situation, and documents can change the exact process.";
  return `${t("resultDisclaimer")}${nonEuStartingPointRoutes.has(routeId) ? ` ${nonEuNote}` : ""}`;
}

function resultSectionLabel(key) {
  const labels = {
    purpose: {
      en: "What this is for",
      es: "Para qué sirve",
      fi: "Mihin tämä on tarkoitettu"
    },
    forms: {
      en: "Forms and documents",
      es: "Formularios y documentos",
      fi: "Lomakkeet ja asiakirjat"
    }
  };
  return labels[key]?.[currentLang] || labels[key]?.en || "";
}

function routeVisualFor(routeId = "") {
  const visuals = {
    "eu-vacation": "./assets/topic-scenes/vacation-entry.png",
    "non-eu-vacation": "./assets/topic-scenes/vacation-entry.png",
    "eu-registration": "./assets/topic-scenes/live-nie-20260606.png",
    "eu-working": "./assets/goal-cards/work.png",
    "nie-only": "./assets/topic-scenes/live-nie-20260606.png",
    "tie-after-approval": "./assets/topic-scenes/live-tie-20260606.png",
    "work-authorization": "./assets/goal-cards/work.png",
    "digital-nomad": "./assets/goal-cards/remote.png",
    "non-lucrative": "./assets/goal-cards/no-work.png",
    study: "./assets/goal-cards/study.png",
    family: "./assets/goal-cards/family.png",
    "eu-family": "./assets/goal-cards/family.png",
    padron: "./assets/topic-scenes/live-padron-20260606.png",
    digital: "./assets/topic-scenes/live-digital-access-20260606.png",
    nie: "./assets/topic-scenes/live-nie-20260606.png",
    "social-security": "./assets/topic-scenes/live-social-security-20260606.png",
    "sip-card": "./assets/topic-scenes/live-public-health-20260606.png",
    "public-health": "./assets/topic-scenes/live-public-health-20260606.png",
    "private-health": "./assets/topic-scenes/live-private-health-20260606.png",
    "ehic-card": "./assets/topic-scenes/live-ehic-20260606.png",
    banking: "./assets/topic-scenes/live-banking-20260606.png",
    phone: "./assets/topic-scenes/phone-direct-20260606.png",
    "job-search": "./assets/topic-scenes/live-job-search-20260606.png",
    taxes: "./assets/topic-scenes/live-taxes-20260606.png",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.png",
    "vacation-citizenship": "./assets/topic-scenes/vacation-entry.png",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.png",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.png",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.png",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.png",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.png",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.png"
  };
  return visuals[routeId] || "./assets/home-cards/move-to-spain-matched-20260606.png";
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
            <p>${explanation}</p>
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
  } : currentLang === "fi" ? {
    process: "Yleinen asiakirjayhteenveto",
    explanation: "Aloita tästä, jos et vielä tiedä mikä reitti sopii tilanteeseesi.",
    steps: ["Tunnista kansalaisuusryhmäsi.", "Varmista ylittääkö oleskelusi 90 päivää.", "Valitse opas, joka vastaa oleskelusi tarkoitusta."],
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
    : currentLang === "fi"
      ? "Takaisin"
      : "Back";
}

function currentSectionLabel() {
  if (currentDirectRoute === "living-menu" || currentEntryPreset === "living") return t("livingTitle");
  if (currentDirectRoute === "vacation-menu" || currentEntryPreset === "vacation") return t("vacationTitle");
  return t("movingTitle");
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
      <h3>${currentLang === "es" ? "Responde primero a las preguntas básicas" : currentLang === "fi" ? "Vastaa ensin peruskysymyksiin" : "Answer the basic questions first"}</h3>
      <p>${currentLang === "es" ? "Cuando completes esas elecciones, IberiGo podrá sugerir la ruta general más probable para España." : currentLang === "fi" ? "Kun olet tehnyt nämä valinnat, IberiGo voi ehdottaa todennäköisintä koko Espanjaa koskevaa reittiä." : "Once those choices are selected, IberiGo can suggest the most likely Spain-wide route."}</p>
    `;
    return;
  }

  const route = pickRoute();
  const roadmap = roadmapFor(route);
  const explanation =
    roadmap.explanation ||
    (currentLang === "es"
      ? "Usa esta ruta como punto de partida práctico antes de comprobar las fuentes oficiales."
      : currentLang === "fi"
        ? roadmap.timeline || "Käytä tätä käytännöllisenä lähtökohtana ennen virallisten lähteiden tarkistamista."
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
    <div class="result-section">
      <strong>${t("nextSteps")}</strong>
      <ol class="roadmap-list">${roadmap.steps.slice(0, 3).map((step) => `<li>${step}</li>`).join("")}</ol>
    </div>
    ${renderFormsAndTaxesBlock(roadmap.route)}
    ${renderRoadmapLinks(roadmap.links, formAndTaxUrls(roadmap.route))}
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
      explanation: "Después de elegir padrón, lo importante es comprobar qué acepta tu ayuntamiento como prueba de domicilio. El contrato de alquiler, autorización del titular, escritura, recibos o cita previa pueden variar según municipio.",
      steps: ["Reúne pasaporte o documento de identidad y prueba de domicilio.", "Comprueba el proceso de tu ayuntamiento, porque cada municipio organiza el padrón a su manera.", "Pide certificado o volante de padrón si lo necesitas para TIE, residencia, sanidad u otro trámite."],
      links: ["padron-info"]
    } : currentLang === "fi" ? {
      process: "Padrón / kunnallinen osoiterekisteröinti",
      explanation: "Kun valitset padrónin, tärkeintä on tarkistaa mitä oma kunnantalo hyväksyy osoitetodisteeksi. Vuokrasopimus, omistajan valtuutus, omistuskirja, laskut tai ajanvaraussäännöt voivat vaihdella kunnittain.",
      steps: ["Kerää passi tai henkilökortti sekä osoitetodiste.", "Tarkista oman kunnantalosi menettely, koska jokainen kunta hoitaa padrónin hieman eri tavalla.", "Pyydä padrón-todistus tai volante, jos tarvitset sitä TIE:tä, oleskelua, terveydenhuoltoa tai muuta menettelyä varten."],
      links: ["padron-info"]
    } : {
      process: "Padrón / town hall registration",
      explanation: "After choosing padrón, the key question is what your town hall accepts as address evidence. Rental contract, owner authorization, deed, utility bills, or appointment rules can vary by municipality.",
      steps: ["Gather passport or ID and proof of address.", "Check your town hall process, because each municipality handles padrón differently.", "Request a padrón certificate or volante if you need it for TIE, residence, healthcare, or another procedure."],
      links: ["padron-info"]
    };
  }
  if (goal === "digital") {
    return currentLang === "es" ? {
      process: "Cl@ve o certificado digital FNMT",
      explanation: "Después de elegir acceso digital, decide cuál es realista para tu situación. FNMT suele ser más directo si ya tienes NIE; Cl@ve puede pedir datos del soporte de una tarjeta física como la TIE.",
      steps: ["Comprueba si ya tienes NIE y documentación aceptada para acreditar identidad.", "Elige FNMT si necesitas firmar documentos o presentar solicitudes electrónicas.", "Usa Cl@ve si cumples los requisitos de registro y quieres acceso frecuente a sedes públicas."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    } : currentLang === "fi" ? {
      process: "Cl@ve tai FNMT-digivarmenne",
      explanation: "Kun valitset digiasioinnin, päätä mikä reitti sopii asiakirjoillesi. FNMT on usein suoraviivaisempi, jos sinulla on jo NIE; Cl@ve voi pyytää fyysisen kortin, kuten TIE:n, tukinumeroa.",
      steps: ["Tarkista onko sinulla jo NIE ja hyväksytyt henkilöllisyysasiakirjat.", "Valitse FNMT, jos sinun täytyy allekirjoittaa asiakirjoja tai lähettää virallisia hakemuksia verkossa.", "Käytä Cl@vea, jos täytät rekisteröintivaatimukset ja haluat säännöllisen pääsyn julkisiin palveluportaaleihin."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    } : {
      process: "Cl@ve or FNMT digital certificate",
      explanation: "After choosing digital access, decide which route is realistic for your documents. FNMT is often more direct if you already have a NIE; Cl@ve may ask for support-number details from a physical card such as a TIE.",
      steps: ["Check whether you already have a NIE and accepted identity documents.", "Choose FNMT if you need to sign documents or submit official applications online.", "Use Cl@ve if you meet the registration requirements and want regular access to public-service portals."],
      links: ["fnmt", "fnmt-aeat-cita", "fnmt-ss-cita", "clave"]
    };
  }
  if (goal === "nie") {
    return currentLang === "es" ? {
      process: "Número NIE",
      explanation: "Después de elegir NIE, céntrate en justificar el motivo. La policía normalmente quiere ver una razón económica, profesional, social o administrativa, no solo que quieres tener el número por si acaso.",
      steps: ["Escribe o reúne la prueba del motivo: banco, compra, notaría, trabajo, impuestos u otro trámite concreto.", "Prepara pasaporte o documento de identidad y copias si las piden.", "Pide la cita o revisa el trámite oficial de asignación de NIE y la tasa 790-012."],
      links: ["nie", "cita", "790-012"]
    } : currentLang === "fi" ? {
      process: "NIE-numero",
      explanation: "Kun valitset NIE:n, keskity perustelemaan miksi tarvitset sitä. Poliisi odottaa yleensä tiettyä taloudellista, ammatillista, sosiaalista tai hallinnollista syytä, ei vain varmuuden vuoksi haettua numeroa.",
      steps: ["Kirjoita tai kokoa todiste syystä: pankki, kauppa, notaari, työ, verotus tai jokin muu konkreettinen menettely.", "Valmistele passi tai henkilökortti ja kopiot, jos niitä pyydetään.", "Varaa aika tai tarkista virallinen NIE-hakumenettely sekä 790-012-maksu."],
      links: ["nie", "cita", "790-012"]
    } : {
      process: "NIE number",
      explanation: "After choosing NIE, focus on proving why you need it. Police offices usually expect a specific economic, professional, social, or administrative reason, not just wanting the number in case it is useful later.",
      steps: ["Write or gather proof of the reason: bank, purchase, notary, work, tax, or another concrete procedure.", "Prepare passport or identity document and copies if requested.", "Book the appointment or review the official NIE assignment procedure and 790-012 fee."],
      links: ["nie", "cita", "790-012"]
    };
  }
  if (goal === "tie") {
    return currentLang === "es" ? {
      process: "Tarjeta TIE después de aprobar el visado",
      explanation: "Después de elegir TIE, confirma primero que ya existe una concesión, visado o resolución favorable. La TIE no concede la residencia por sí sola; documenta una autorización ya aprobada.",
      steps: ["Comprueba que tienes visado, resolución favorable o autorización que permite pedir la tarjeta.", "Completa EX-17 y paga la tasa 790-012 de expedición de tarjeta.", "Reserva cita de huellas o expedición de tarjeta y lleva pasaporte, foto, aprobación, tasa pagada y padrón si tu domicilio debe constar."],
      links: ["tie-form", "cita", "790-012"]
    } : currentLang === "fi" ? {
      process: "TIE-kortti viisumin hyväksynnän jälkeen",
      explanation: "Kun valitset TIE:n, varmista ensin että viisumi, lupa tai myönteinen päätös on jo olemassa. TIE ei itsessään myönnä oleskeluoikeutta, vaan dokumentoi jo hyväksytyn luvan.",
      steps: ["Tarkista, että sinulla on viisumi, myönteinen päätös tai lupa, jonka perusteella voit hakea korttia.", "Täytä EX-17 ja maksa vastaava 790-012-korttimaksu.", "Varaa sormenjälki-/korttiaika ja ota mukaan passi, valokuva, hyväksyntä, maksettu maksu ja padrón, jos osoitteen täytyy näkyä kortissa."],
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
      explanation: "El número de la Seguridad Social se usa para trabajar, cotizar y acceder a ciertos trámites. Si empiezas un empleo, tu empleador puede ayudarte con el alta; si trabajas por cuenta propia, normalmente tendrás que revisar también el alta de autónomo.",
      steps: ["Confirma si lo necesitas por empleo, autónomo u otro trámite oficial.", "Prepara documentos de identidad y NIE/TIE o datos del pasaporte si los piden.", "Usa el trámite oficial de la Seguridad Social o pregunta a tu empleador si se encarga del alta."],
      links: ["social-security-number"]
    } : currentLang === "fi" ? {
      process: "Sosiaaliturvatunnus",
      explanation: "Sosiaaliturvatunnusta käytetään työntekoon, maksuihin ja joihinkin virallisiin menettelyihin. Jos aloitat palkkatyön, työnantaja voi auttaa rekisteröinnissä; jos toimit yrittäjänä, sinun täytyy yleensä tarkistaa myös autónomo-rekisteröinti.",
      steps: ["Varmista tarvitsetko tunnuksen työtä, yrittäjyyttä vai muuta virallista menettelyä varten.", "Valmistele henkilöllisyysasiakirjat sekä NIE/TIE tai passitiedot, jos niitä pyydetään.", "Käytä virallista sosiaaliturvamenettelyä tai kysy työnantajaltasi hoitaako hän rekisteröinnin."],
      links: ["social-security-number"]
    } : {
      process: "Social Security number",
      explanation: "A Social Security number is used for work, contributions, and some official procedures. If you start a job, your employer may help with the registration; if you are self-employed, you usually need to check the autónomo registration path too.",
      steps: ["Confirm whether you need it for employment, self-employment, or another official procedure.", "Prepare identity documents and NIE/TIE or passport details if requested.", "Use the official Social Security process or ask your employer if they are handling registration."],
      links: ["social-security-number"]
    };
  }
  if (goal === "sip-card") {
    return currentLang === "es" ? {
      process: "Tarjeta sanitaria pública",
      explanation: "Cada comunidad autónoma usa su propio nombre para la tarjeta sanitaria pública. La idea general es la misma: primero confirmar tu derecho a asistencia sanitaria y después obtener la tarjeta regional correspondiente.",
      steps: ["Comprueba si tu derecho a asistencia sanitaria ya está reconocido automáticamente o si debes solicitar el alta en asistencia sanitaria en España.", "Nombres que puedes ver según la región: Comunitat Valenciana (SIP), Madrid (Tarjeta Sanitaria Individual), Andalucía (Tarjeta sanitaria), Cataluña (TSI) y Murcia (Tarjeta Sanitaria Individual).", "Lleva identidad, NIE/TIE si ya lo tienes, padrón o prueba de domicilio y cualquier documento de aseguramiento o Seguridad Social que te pidan.", "Si además necesitas cobertura privada para un permiso o por elección propia, usa la guía separada de seguro médico privado."],
      links: ["healthcare-right-spain", "valencia-health-card", "madrid-health-card", "andalucia-health-card", "cataluna-health-card", "murcia-health-card"]
    } : currentLang === "fi" ? {
      process: "Julkinen terveydenhuoltokortti",
      explanation: "Jokaisella itsehallintoalueella on oma nimensä julkiselle terveydenhuoltokortille. Yleinen ajatus on sama kaikkialla: varmista ensin oikeutesi julkiseen terveydenhuoltoon ja hanki sitten alueellinen kortti.",
      steps: ["Tarkista, onko oikeutesi julkiseen terveydenhuoltoon jo tunnustettu automaattisesti vai täytyykö sinun hakea rekisteröintiä Espanjassa.", "Alueellisia nimiä voivat olla esimerkiksi Valencian SIP-kortti, Madridin Tarjeta Sanitaria Individual, Andalusian Tarjeta sanitaria, Katalonian TSI ja Murcian Tarjeta Sanitaria Individual.", "Ota mukaan henkilöllisyysasiakirjat, NIE/TIE jos sinulla on se, padrón tai osoitetodiste sekä mahdolliset sosiaaliturva- tai terveydenhuolto-oikeusasiakirjat.", "Jos tarvitset lisäksi yksityisen vakuutuksen lupaa varten tai omasta valinnasta, käytä erillistä yksityisen sairausvakuutuksen opasta."],
      links: ["healthcare-right-spain", "valencia-health-card", "madrid-health-card", "andalucia-health-card", "cataluna-health-card", "murcia-health-card"]
    } : {
      process: "Public health card",
      explanation: "Each autonomous community uses its own name for the public health card. The general idea is the same everywhere: first confirm your healthcare entitlement, then obtain the regional card.",
      steps: ["Check whether your right to public healthcare is already recognized automatically or whether you need to request healthcare registration in Spain.", "Card names you may see by region: Valencian Community (SIP card), Madrid (Tarjeta Sanitaria Individual), Andalusia (Tarjeta sanitaria), Catalonia (TSI), and Murcia (Tarjeta Sanitaria Individual).", "Bring identity documents, NIE/TIE if you have it, padrón or address proof, and any Social Security or healthcare-entitlement documents requested.", "If you also need private cover for a permit or by personal choice, use the separate private health insurance guide."],
      links: ["healthcare-right-spain", "valencia-health-card", "madrid-health-card", "andalucia-health-card", "cataluna-health-card", "murcia-health-card"]
    };
  }
  if (goal === "private-health") {
    return currentLang === "es" ? {
      process: "Seguro médico privado",
      explanation: "El seguro médico privado aparece a menudo en rutas de residencia o estancia, y también puede ser una elección personal aunque tengas o busques acceso a la sanidad pública.",
      steps: ["Confirma primero si lo necesitas para un permiso concreto, para tiempos de espera más cortos o simplemente como cobertura adicional.", "Revisa si el trámite que te interesa pide una póliza sin copagos, con cobertura completa o con requisitos concretos.", "Compara varias aseguradoras grandes antes de contratar y revisa bien red médica, carencias, copagos y cobertura territorial."],
      links: ["insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre"]
    } : currentLang === "fi" ? {
      process: "Yksityinen sairausvakuutus",
      explanation: "Yksityinen sairausvakuutus tulee usein vastaan oleskelu- tai lupareiteillä, mutta se voi olla myös oma valinta vaikka sinulla olisi tai hakisit julkista terveydenhuoltoa.",
      steps: ["Varmista ensin tarvitsetko sitä tiettyä lupaa varten, lyhyempiä odotusaikoja varten vai lisäturvaksi oman valintasi mukaan.", "Tarkista vaatiiko kiinnostava menettely vakuutuksen ilman omavastuuta, kattavan turvan tai muita tarkkoja ehtoja.", "Vertaile useita suuria vakuuttajia ennen sopimusta ja käy läpi hoitoverkosto, odotusajat, omavastuut ja alueellinen kattavuus."],
      links: ["insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre"]
    } : {
      process: "Private health insurance",
      explanation: "Private health insurance often comes up in residence or stay routes, and it can also be a personal choice even if you already have or are applying for access to public healthcare.",
      steps: ["First confirm whether you need it for a specific permit, for shorter waiting times, or simply as extra cover by choice.", "Check whether the route you care about asks for no co-payments, full coverage, or other specific policy conditions.", "Compare several major insurers before buying and review network size, waiting periods, co-payments, and territorial coverage carefully."],
      links: ["insurance-sanitas", "insurance-adeslas", "insurance-asisa", "insurance-dkv", "insurance-mapfre"]
    };
  }
  if (goal === "ehic-card") {
    return currentLang === "es" ? {
      process: "Tarjeta Sanitaria Europea",
      explanation: "La Tarjeta Sanitaria Europea sirve para estancias temporales en otro país de la UE/EEE, Suiza o Reino Unido en las condiciones del sistema público del país de estancia. No sustituye un seguro de viaje ni sirve para mudarte a otro país.",
      steps: ["Confirma que tienes derecho a asistencia sanitaria en España antes de solicitarla.", "Pide o renueva la TSE por el canal oficial de la Seguridad Social y revisa si la necesitas para ti o también para tus beneficiarios.", "Si viajas pronto y la tarjeta no llega a tiempo, comprueba si necesitas el Certificado Provisional Sustitutorio."],
      links: ["ehic-card", "healthcare-right-spain"]
    } : currentLang === "fi" ? {
      process: "Eurooppalainen sairaanhoitokortti",
      explanation: "EHIC on tarkoitettu tilapäisiin oleskeluihin toisessa EU-/ETA-maassa, Sveitsissä tai Yhdistyneessä kuningaskunnassa kyseisen maan julkisen järjestelmän ehtojen mukaisesti. Se ei korvaa matkavakuutusta eikä ole asiakirja ulkomaille muuttamista varten.",
      steps: ["Varmista, että oikeutesi terveydenhuoltoon Espanjassa on voimassa ennen hakemista.", "Hae tai uusi EHIC virallisen sosiaaliturvareitin kautta ja tarkista tarvitsetko sen vain itsellesi vai myös huollettaville.", "Jos matkustat pian eikä kortti ehdi ajoissa, tarkista tarvitsetko väliaikaisen korvaavan todistuksen."],
      links: ["ehic-card", "healthcare-right-spain"]
    } : {
      process: "European Health Insurance Card",
      explanation: "The EHIC is for temporary stays in another EU/EEA country, Switzerland, or the UK under that country's public-system rules. It does not replace travel insurance and it is not the document for moving your residence abroad.",
      steps: ["Confirm that your right to healthcare in Spain is active before requesting it.", "Request or renew the EHIC through the official Social Security route and check whether you need it only for yourself or also for your dependants.", "If you are travelling very soon and the card may not arrive in time, check whether you need a Provisional Replacement Certificate instead."],
      links: ["ehic-card", "healthcare-right-spain"]
    };
  }
  if (goal === "banking") {
    return currentLang === "es" ? {
      process: "Cuenta bancaria y banca básica",
      explanation: "Para vivir en España, normalmente ayuda separar lo esencial de lo opcional. A veces necesitas una cuenta para nómina, alquiler, recibos o identificación financiera, pero los documentos aceptados cambian según el banco y tu situación de residencia.",
      steps: ["Comprueba primero para qué necesitas la cuenta: nómina, alquiler, autónomo, ahorros o trámites diarios.", "Prepara identificación, NIE/TIE si ya lo tienes, prueba de domicilio y cualquier justificante de ingresos o residencia que el banco pueda pedir.", "Compara si te conviene una cuenta para recién llegado, una cuenta de no residente o una cuenta ordinaria de residente según tu situación real.", "Si todavía no puedes abrir una cuenta bancaria española tradicional, una opción temporal puede ser empezar con Revolut o bunq mientras organizas tu documentación local."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq"]
    } : currentLang === "fi" ? {
      process: "Pankkitili ja pankkiasioinnin perusteet",
      explanation: "Espanjassa asumista varten kannattaa yleensä erottaa pakollinen hyödyllisestä. Tiliä voidaan tarvita palkkaa, vuokraa, suoraveloituksia tai taloudellista tunnistautumista varten, mutta hyväksytyt asiakirjat vaihtelevat pankin ja oleskelutilanteen mukaan.",
      steps: ["Tarkista ensin mihin tarvitset tiliä: palkkaan, vuokraan, yrittäjyyteen, säästöihin vai arjen maksuihin.", "Valmistele henkilöllisyysasiakirjat, NIE/TIE jos sinulla on se, osoitetodiste ja mahdolliset tulo- tai oleskelutodisteet, joita pankki voi pyytää.", "Vertaa sopiiko sinulle paremmin uuden tulijan tili, ei-residentin tili vai tavallinen residenttitili todellisen tilanteesi mukaan.", "Jos et vielä voi avata perinteistä espanjalaista pankkitiliä, väliaikainen aloitusvaihtoehto voi olla Revolut tai bunq samalla kun järjestät paikalliset asiakirjat."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq"]
    } : {
      process: "Bank account and banking basics",
      explanation: "For life in Spain, it helps to separate what is essential from what is optional. You may need a bank account for salary, rent, direct debits, or financial identification, but accepted documents vary by bank and by your residence situation.",
      steps: ["First confirm what you need the account for: salary, rent, self-employment, savings, or everyday payments.", "Prepare identity documents, NIE/TIE if you already have one, proof of address, and any income or residence evidence the bank may request.", "Compare whether a newcomer account, non-resident account, or ordinary resident account fits your real situation best.", "If you cannot open a traditional Spanish bank account yet, a temporary starting option can be Revolut or bunq while you sort out your local paperwork."],
      links: ["bank-santander", "bank-bbva", "bank-caixabank", "bank-sabadell", "bank-bankinter", "bank-revolut", "bank-bunq"]
    };
  }
  if (goal === "job-search") {
    return currentLang === "es" ? {
      process: "Buscar trabajo en España",
      explanation: "Para empezar a buscar trabajo en España, conviene separar la búsqueda de ofertas de la parte administrativa. Primero mira dónde están las vacantes y qué perfiles piden; luego confirma qué documentación laboral y de residencia necesitas para aceptar un puesto.",
      steps: ["Define si buscas empleo local, remoto desde España, trabajo estacional o un sector concreto.", "Prepara CV, datos de contacto y documentación básica para candidaturas, y revisa si tu situación te permite trabajar legalmente en España.", "Empieza por portales públicos y oficiales para ver vacantes, orientación y recursos del mercado laboral.", "Después amplía la búsqueda con portales privados grandes y especializados para comparar volumen, sectores y forma de aplicar."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo"]
    } : currentLang === "fi" ? {
      process: "Työnhaku Espanjassa",
      explanation: "Työnhaun alussa Espanjassa kannattaa erottaa itse työpaikkojen etsiminen hallinnollisesta puolesta. Katso ensin missä avoimet paikat ovat ja mitä profiileja haetaan, ja varmista vasta sitten mitä työ- ja oleskeluasiakirjoja tarvitset työn vastaanottamiseen.",
      steps: ["Määritä etsitkö paikallista työtä, etätyötä Espanjasta, kausityötä vai tietyn alan tehtäviä.", "Valmistele CV, yhteystiedot ja perusasiakirjat hakemuksia varten, ja tarkista salliiko tilanteesi työnteon laillisesti Espanjassa.", "Aloita julkisista ja virallisista portaaleista nähdäksesi työpaikat, ohjauksen ja työmarkkinatiedot.", "Laajenna sen jälkeen hakua suuriin yksityisiin ja erikoistuneisiin portaaleihin vertaillaksesi määrää, aloja ja hakutapoja."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo"]
    } : {
      process: "Job search in Spain",
      explanation: "To begin a job search in Spain, it helps to separate finding openings from the admin side. First look at where the vacancies are and what profiles are being asked for; then confirm what work and residence paperwork you need in order to accept a role.",
      steps: ["Decide whether you are looking for local work, remote work from Spain, seasonal work, or a specific sector.", "Prepare a CV, contact details, and basic application documents, and check whether your current status lets you work legally in Spain.", "Start with public and official portals so you can see vacancies, guidance, and labour-market resources.", "Then widen the search through large private and specialist portals so you can compare volume, sectors, and application style."],
      links: ["jobs-empleate", "jobs-sepe", "jobs-eures", "jobs-infojobs", "jobs-linkedin", "jobs-indeed", "jobs-jobtoday", "jobs-tecnoempleo"]
    };
  }
  if (goal === "taxes") {
    return currentLang === "es" ? {
      process: "Impuestos y domicilio fiscal",
      explanation: "En la vida diaria en España, lo importante es tener claro qué trámite fiscal te toca y qué datos tiene Hacienda sobre ti. Tu domicilio fiscal y tus obligaciones dependen de tu situación real, no solo de vivir aquí.",
      steps: ["Aclara si tu necesidad es solo identificación fiscal, cambio de domicilio fiscal, alta de autónomo o gestión de declaraciones.", "Comprueba qué dirección y datos personales figuran para ti en los servicios oficiales antes de usar notificaciones o trámites online.", "Usa la sede oficial de la Agencia Tributaria para revisar tus datos, certificados y procedimientos relacionados con impuestos."],
      links: ["tax-agency", "tax-census"]
    } : currentLang === "fi" ? {
      process: "Verot ja verosoite",
      explanation: "Arjessa Espanjassa tärkeää on ymmärtää mikä veromenettely koskee sinua ja mitä tietoja verohallinnolla on sinusta. Verosoite ja velvollisuudet riippuvat todellisesta tilanteestasi, eivät vain siitä että asut täällä.",
      steps: ["Selvitä, tarvitsetko vain verotunnistetta, verosoitteen muutosta, yrittäjärekisteröintiä vai veroilmoituksiin liittyvää asiointia.", "Tarkista mitä osoite- ja henkilötietoja sinusta näkyy virallisissa palveluissa ennen ilmoitusten tai verkkomenettelyjen käyttöä.", "Käytä verohallinnon virallista portaalia omien tietojen, todistusten ja veromenettelyjen tarkistamiseen."],
      links: ["tax-agency", "tax-census"]
    } : {
      process: "Taxes and tax address",
      explanation: "For daily life in Spain, it helps to be clear about which tax procedure applies to you and what details the Tax Agency has on file for you. Your tax address and obligations depend on your real situation, not only on the fact that you live here.",
      steps: ["Clarify whether you only need tax identification, a tax-address update, self-employment registration, or help with declarations.", "Check what address and personal details are recorded for you in official services before using online notices or procedures.", "Use the official Tax Agency portal to review your data, certificates, and tax-related procedures."],
      links: ["tax-agency", "tax-census"]
    };
  }
  if (goal === "phone") {
    return currentLang === "es" ? {
      process: "Número de teléfono e internet",
      explanation: "Para instalarte mejor en España, conviene decidir si solo necesitas una línea rápida al llegar o una opción más estable para banca, verificación por SMS, internet en casa y servicios diarios.",
      steps: ["Define si buscas una solución temporal de llegada o una línea estable para vivir en España.", "Prepara pasaporte o NIE/TIE, porque algunas operadoras pueden pedir identificación al contratar o portar un número.", "Antes de elegir tarifa, revisa cobertura en tu zona, permanencia, internet en casa y si necesitas recibir códigos para banca y sedes online.", "Compara primero grandes operadores y opciones más flexibles antes de contratar móvil, fibra o un paquete conjunto."],
      links: ["provider-movistar", "provider-vodafone", "provider-orange", "provider-digi", "provider-o2", "provider-yoigo"]
    } : currentLang === "fi" ? {
      process: "Puhelinnumero ja internet",
      explanation: "Espanjaan asettuessa kannattaa päättää tarvitsetko vain nopean liittymän saapuessa vai pysyvämmän vaihtoehdon pankkia, tekstiviestivarmennusta, kodin internetiä ja arjen palveluita varten.",
      steps: ["Määritä tarvitsetko vain väliaikaisen saapumisratkaisun vai vakaan liittymän Espanjassa asumiseen.", "Valmistele passi tai NIE/TIE, koska jotkin operaattorit voivat pyytää henkilöllisyystodistetta sopimusta tai numeronsiirtoa varten.", "Tarkista ennen liittymän valintaa alueesi kuuluvuus, mahdollinen määräaika, kodin internet ja tarvitsetko tekstiviestikoodeja pankkia tai julkisia portaaleja varten.", "Vertaa ensin suuret operaattorit ja joustavammat vaihtoehdot ennen mobiilin, kuidun tai yhdistelmäpaketin valintaa."],
      links: ["provider-movistar", "provider-vodafone", "provider-orange", "provider-digi", "provider-o2", "provider-yoigo"]
    } : {
      process: "Phone number and internet",
      explanation: "To settle in Spain more smoothly, it helps to decide whether you only need a quick arrival line or a more stable option for banking, SMS verification, home internet, and everyday services.",
      steps: ["Decide whether you need a temporary arrival solution or a stable line for living in Spain.", "Prepare passport or NIE/TIE, because some providers may ask for identification when opening a contract or porting a number.", "Before choosing a plan, check coverage in your area, contract length, home internet options, and whether you need reliable SMS codes for banking or public portals.", "Compare the larger operators and the more flexible options before choosing mobile, fibre, or a bundled package."],
      links: ["provider-movistar", "provider-vodafone", "provider-orange", "provider-digi", "provider-o2", "provider-yoigo"]
    };
  }
  if (goal === "vacation-entry") {
    return currentLang === "es" ? {
      process: "Reglas de entrada y estancia corta",
      explanation: "Esta guía resume el punto de partida para visitas de vacaciones a España. Lo primero es saber si tu viaje cae dentro de una visita corta normal y si debes mirar reglas de la UE o reglas Schengen.",
      steps: ["Confirma si tu estancia es una visita corta ordinaria y no una mudanza o residencia.", "Revisa si eres ciudadano de la UE/EEE/Suiza o si tu pasaporte entra por reglas Schengen para no comunitarios.", "Comprueba antes de viajar los documentos de entrada, seguro si aplica y la regla de 90/180 cuando corresponda."],
      links: ["eu-short-stay", "schengen", "calculator"]
    } : currentLang === "fi" ? {
      process: "Maahantulosäännöt ja lyhyt oleskelu",
      explanation: "Tämä opas kokoaa lähtöpisteen Espanjan lomavierailulle. Ensin kannattaa varmistaa, onko kyse tavallisesta lyhyestä vierailusta ja katsotko EU- vai Schengen-sääntöjä.",
      steps: ["Varmista, että kyse on tavallisesta lyhyestä vierailusta eikä muutosta tai oleskelusta.", "Tarkista oletko EU-/ETA-/Sveitsin kansalainen vai tuleeko passisi Schengen-sääntöjen kautta.", "Tarkista ennen matkaa maahantuloasiakirjat, mahdollinen vakuutus ja 90/180-sääntö tarvittaessa."],
      links: ["eu-short-stay", "schengen", "calculator"]
    } : {
      process: "Entry rules and short stays",
      explanation: "This guide gives the starting point for a vacation trip to Spain. The first question is whether your trip is an ordinary short visit and whether you should be looking at EU rules or Schengen rules.",
      steps: ["Confirm that your stay is an ordinary short visit rather than a move or residence plan.", "Check whether you are travelling as an EU/EEA/Swiss citizen or under Schengen short-stay rules for non-EU passports.", "Before travelling, review entry documents, any insurance requirement, and the 90/180 rule where relevant."],
      links: ["eu-short-stay", "schengen", "calculator"]
    };
  }
  if (goal === "vacation-citizenship") {
    return currentLang === "es" ? {
      process: "Visita UE frente a no UE",
      explanation: "Para vacaciones, la diferencia principal es sencilla: los ciudadanos UE suelen mirar reglas de estancia corta dentro del espacio europeo, mientras que muchos viajeros no comunitarios deben confirmar visado, exención o ETIAS cuando corresponda.",
      steps: ["Si eres ciudadano UE/EEE/Suiza, revisa la guía de estancia corta y viaja con documento válido.", "Si eres no comunitario, comprueba si tu nacionalidad necesita visado Schengen o entra por exención.", "Usa la calculadora oficial si necesitas confirmar el límite de 90 días en 180 días."],
      links: ["eu-short-stay", "schengen", "calculator"]
    } : currentLang === "fi" ? {
      process: "EU- ja non-EU-vierailu",
      explanation: "Lomamatkalla tärkein ero on yksinkertainen: EU-kansalaiset katsovat yleensä lyhyen oleskelun sääntöjä, kun taas monet EU:n ulkopuoliset matkailijat joutuvat tarkistamaan viisumin, viisumivapauden tai ETIAS-vaatimuksen.",
      steps: ["Jos olet EU-/ETA-/Sveitsin kansalainen, tarkista lyhyen oleskelun ohje ja matkusta voimassa olevalla asiakirjalla.", "Jos olet EU:n ulkopuolelta, tarkista tarvitseeko kansalaisuutesi Schengen-viisumin tai viisumivapauden.", "Käytä virallista laskuria, jos sinun täytyy varmistaa 90 päivää 180 päivän aikana -raja."],
      links: ["eu-short-stay", "schengen", "calculator"]
    } : {
      process: "EU vs non-EU visits",
      explanation: "For vacations, the main split is simple: EU citizens usually look at short-stay rules inside the European space, while many non-EU travellers need to confirm visa, visa-free, or ETIAS-related requirements.",
      steps: ["If you are an EU/EEA/Swiss citizen, review the short-stay guidance and travel with a valid document.", "If you are non-EU, check whether your nationality needs a Schengen visa or enters visa-free.", "Use the official calculator if you need to confirm the 90 days in any 180-day limit."],
      links: ["eu-short-stay", "schengen", "calculator"]
    };
  }
  if (goal === "vacation-flights") {
    return currentLang === "es" ? {
      process: "Vuelos y aeropuertos",
      explanation: "Si primero quieres aclarar cómo llegar o comparar rutas, empieza por aerolíneas, comparadores y la red oficial de aeropuertos.",
      steps: ["Consulta primero aeropuertos y rutas posibles según la ciudad o región a la que quieres llegar.", "Compara fechas y precios antes de decidir si reservas con una aerolínea directa o mediante un comparador.", "Revisa siempre condiciones de equipaje, cambios y aeropuerto exacto antes de pagar."],
      links: ["travel-aena", "flight-iberia", "flight-google", "flight-skyscanner", "flight-kayak", "flight-edreams"]
    } : currentLang === "fi" ? {
      process: "Lennot ja lentoasemat",
      explanation: "Jos haluat ensin selvittää saapumisen tai vertailla reittejä, aloita lentoyhtiöistä, hakutyökaluista ja virallisesta lentoasemaverkostosta.",
      steps: ["Katso ensin kentät ja mahdolliset reitit sen kaupungin tai alueen mukaan, jonne olet menossa.", "Vertaa päiviä ja hintoja ennen kuin päätät varata suoraan lentoyhtiöltä tai hakupalvelun kautta.", "Tarkista aina matkatavaraehdot, muutokset ja tarkka lentokenttä ennen maksua."],
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
      explanation: "Dentro de España, la mejor opción depende mucho del trayecto. En algunos viajes gana el tren; en otros, el autobús o el coche de alquiler te da más libertad.",
      steps: ["Mira si tu ruta encaja mejor con tren de larga distancia, autobús o coche de alquiler.", "Comprueba horarios, estaciones o aeropuertos de recogida antes de cerrar el plan.", "Si alquilas coche, revisa bien cobertura, combustible, conductor adicional y condiciones de recogida."],
      links: ["travel-renfe", "travel-alsa", "car-europcar", "car-sixt", "car-avis", "car-hertz"]
    } : currentLang === "fi" ? {
      process: "Junat, bussit ja auto",
      explanation: "Espanjan sisällä paras vaihtoehto riippuu paljon reitistä. Joillakin matkoilla juna on selkein, toisilla bussi tai vuokra-auto antaa enemmän vapautta.",
      steps: ["Tarkista sopiiko reittisi paremmin pitkän matkan junaan, bussiin vai vuokra-autoon.", "Varmista aikataulut, asemat tai noutopisteet ennen lopullista suunnitelmaa.", "Jos vuokraat auton, tarkista huolellisesti vakuutus, polttoainekäytäntö, lisäkuljettaja ja noutoehdot."],
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
      explanation: "Para alojamiento, lo práctico suele ser comparar primero plataformas grandes y luego reservar cuando ya tengas clara la zona, el tipo de estancia y las condiciones.",
      steps: ["Compara barrio, política de cancelación, horarios de llegada y tipo de alojamiento antes de reservar.", "Mira si te conviene hotel, apartamento o estancia más flexible según la duración del viaje.", "Antes de pagar, revisa bien tasas, condiciones y opiniones recientes."],
      links: ["stay-booking", "stay-airbnb", "stay-expedia", "stay-tripadvisor"]
    } : currentLang === "fi" ? {
      process: "Varaussivustot",
      explanation: "Majoituksen kohdalla käytännöllistä on yleensä vertailla ensin suuria alustoja ja varata vasta kun alue, majoitustyyppi ja ehdot ovat selvillä.",
      steps: ["Vertaa aluetta, peruutusehtoja, saapumisaikoja ja majoitustyyppiä ennen varausta.", "Katso sopiiko sinulle paremmin hotelli, asunto vai joustavampi majoitusmatkan pituuden mukaan.", "Tarkista ennen maksua maksut, ehdot ja tuoreet arviot huolellisesti."],
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
      explanation: "Si prefieres reservar directamente, las grandes cadenas pueden ayudarte a comparar estilos de estancia: ciudad, playa, negocio, resort o escapada corta.",
      steps: ["Decide si buscas hotel urbano, resort, playa, viaje de trabajo o una estancia más clásica.", "Compara ubicación, categoría, condiciones y si te conviene reservar directo con la cadena.", "Usa varias cadenas grandes para ver rápidamente qué estilo encaja mejor con tu viaje."],
      links: ["travel-paradores", "hotel-melia", "hotel-nh", "hotel-barcelo", "hotel-riu", "hotel-iberostar", "hotel-marriott", "hotel-hilton"]
    } : currentLang === "fi" ? {
      process: "Hotelliketjut",
      explanation: "Jos haluat varata suoraan, suuret ketjut auttavat vertailemaan eri tyyppisiä majoituksia: kaupunki, ranta, työmatka, resort tai lyhyt irtiotto.",
      steps: ["Päätä etsitkö kaupunkihotellia, resortia, rantaa, työmatkavaihtoehtoa vai klassisempaa majoitusta.", "Vertaa sijaintia, tasoa, ehtoja ja kannattaako varata suoraan ketjun kautta.", "Käytä useita suuria ketjuja nähdäksesi nopeasti mikä tyyli sopii matkallesi parhaiten."],
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
      explanation: "A veces lo más útil no es reservar primero, sino entender mejor destinos, regiones y tipos de viaje. Ahí las fuentes oficiales pueden darte una visión más limpia.",
      steps: ["Empieza por el portal oficial de turismo para ver regiones, ciudades y estilos de viaje.", "Usa la información oficial para hacer una primera selección antes de comparar precios.", "Cuando ya tengas la idea clara, pasa a transporte y alojamiento con menos ruido."],
      links: ["travel-spaininfo", "travel-paradores"]
    } : currentLang === "fi" ? {
      process: "Virallinen matkailu ja ideat",
      explanation: "Joskus hyödyllisintä ei ole varata heti, vaan ymmärtää paremmin kohteita, alueita ja erilaisia matkatyylejä. Siinä viralliset lähteet antavat siistimmän kokonaiskuvan.",
      steps: ["Aloita virallisesta matkailuportaalista nähdäksesi alueet, kaupungit ja eri matkustustyylit.", "Käytä virallista tietoa ensimmäiseen rajaukseen ennen hintojen vertailua.", "Kun suunta on selvä, siirry kuljetuksiin ja majoitukseen vähemmällä hälyllä."],
      links: ["travel-spaininfo", "travel-paradores"]
    } : {
      process: "Official tourism and ideas",
      explanation: "Sometimes the most useful move is not to book first, but to understand destinations, regions, and trip styles a little better. Official sources can give you a cleaner overview.",
      steps: ["Start with the official tourism portal to browse regions, cities, and trip styles.", "Use the official information to narrow choices before you compare prices.", "Once you have a clearer direction, move to transport and accommodation with less noise."],
      links: ["travel-spaininfo", "travel-paradores"]
    };
  }
  if (goal === "vacation-reviews") {
    return currentLang === "es" ? {
      process: "Reseñas y comparación",
      explanation: "Después de tener una idea general del viaje, las reseñas ayudan a aterrizar mejor una zona, un hotel o una experiencia concreta.",
      steps: ["Compara zonas, hoteles o experiencias concretas con reseñas recientes y fotos reales.", "No uses solo una plataforma: contrasta la información si algo parece demasiado bueno o demasiado raro.", "Después de comparar, vuelve a la reserva o al transporte con una decisión más clara."],
      links: ["stay-tripadvisor", "stay-booking", "stay-expedia"]
    } : currentLang === "fi" ? {
      process: "Arvostelut ja vertailu",
      explanation: "Kun matkan yleisidea on jo olemassa, arvostelut auttavat valitsemaan paremmin alueen, hotellin tai tietyn kokemuksen.",
      steps: ["Vertaa alueita, hotelleja tai kokemuksia tuoreiden arvostelujen ja oikeiden kuvien avulla.", "Älä nojaa vain yhteen alustaan: vertaa tietoa, jos jokin näyttää liian hyvältä tai oudolta.", "Vertailun jälkeen palaa varaukseen tai liikkumiseen selkeämmän päätöksen kanssa."],
      links: ["stay-tripadvisor", "stay-booking", "stay-expedia"]
    } : {
      process: "Reviews and comparison",
      explanation: "Once you have the broad shape of the trip, reviews help you land more confidently on a neighborhood, hotel, or specific experience.",
      steps: ["Compare neighborhoods, hotels, or specific experiences using recent reviews and real photos.", "Do not rely on only one platform if something looks unusually good or unusually odd.", "After comparing, go back to booking or transport with a clearer choice."],
      links: ["stay-tripadvisor", "stay-booking", "stay-expedia"]
    };
  }
  return null;
}

function livingTopicSummary(goal) {
  const summaries = currentLang === "es" ? {
    padron: "Registro municipal de tu domicilio en España.",
    nie: "Número de identificación de extranjero para trámites oficiales.",
    tie: "Tarjeta física para ciudadanos no comunitarios con permiso aprobado.",
    "social-security": "Número usado para empleo, autónomos y relación con la Seguridad Social.",
    digital: "Acceso online para sedes públicas, notificaciones y firma electrónica.",
    "sip-card": "Tarjeta sanitaria pública regional, como SIP en Valencia o TSI en Cataluña.",
    "private-health": "Seguro privado útil para ciertos permisos o como cobertura adicional.",
    "ehic-card": "Tarjeta para asistencia sanitaria necesaria durante estancias temporales en Europa.",
    banking: "Cuenta para nómina, alquiler, recibos y operaciones bancarias diarias.",
    "job-search": "Portales públicos y pasos básicos para empezar a buscar trabajo.",
    taxes: "Domicilio fiscal y trámites básicos con Hacienda.",
    phone: "Línea móvil e internet para instalarte y verificar servicios."
  } : currentLang === "fi" ? {
    padron: "Kunnallinen osoiterekisteröinti Espanjassa.",
    nie: "Ulkomaalaisen tunnistenumero virallisia menettelyjä varten.",
    tie: "Fyysinen kortti EU:n ulkopuolisille hyväksytyn luvan jälkeen.",
    "social-security": "Numero työhön, yrittäjyyteen ja sosiaaliturvatietoihin.",
    digital: "Verkkoasiointi julkisissa portaaleissa, ilmoituksissa ja sähköisissä allekirjoituksissa.",
    "sip-card": "Alueellinen julkinen terveydenhuoltokortti, kuten SIP Valenciassa tai TSI Kataloniassa.",
    "private-health": "Yksityinen vakuutus joitakin lupia varten tai lisäturvaksi.",
    "ehic-card": "Kortti lääketieteellisesti tarpeelliseen julkiseen hoitoon tilapäisen Euroopan-matkan aikana.",
    banking: "Tili palkkaa, vuokraa, suoraveloituksia ja päivittäisiä pankkiasioita varten.",
    "job-search": "Julkiset portaalit ja perusaskeleet työnhaun aloittamiseen.",
    taxes: "Verosoite ja perusasiointi verohallinnon kanssa.",
    phone: "Mobiililinja ja internet arkea ja tunnistautumista varten."
  } : {
    padron: "Town hall registration for your address in Spain.",
    nie: "Foreigner ID number for official Spanish procedures.",
    tie: "Physical card for non-EU citizens after permission is approved.",
    "social-security": "Number used for employment, self-employment, and Social Security records.",
    digital: "Online access for public portals, notices, and electronic signatures.",
    "sip-card": "Regional public health card, such as SIP in Valencia or TSI in Catalonia.",
    "private-health": "Private cover often used for certain permits or as extra health coverage.",
    "ehic-card": "Card for medically necessary public healthcare during temporary stays in Europe.",
    banking: "Account for salary, rent, direct debits, and everyday banking.",
    "job-search": "Public portals and basic first steps for finding work.",
    taxes: "Tax address and basic tax-agency admin.",
    phone: "Mobile line and internet for daily life and verification."
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
  } : currentLang === "fi" ? {
    "vacation-entry": "Perussäännöt lyhyille vierailuille, Schengen-alueelle ja enintään 90 päivän oleskeluihin.",
    "vacation-citizenship": "Nopea ohjaus EU-vieraille verrattuna EU:n ulkopuolisiin matkailijoihin.",
    "vacation-flights": "Lennot, lentoasemat ja hakutyökalut Espanjaan saapumiseen ja liikkumiseen.",
    "vacation-ground": "Junat, bussit ja autonvuokraus Espanjan sisäisiin matkoihin.",
    "vacation-booking": "Suuret alustat majoituksen vertailuun ennen varausta.",
    "vacation-hotels": "Suuret hotellibrändit, joilla on vahva läsnäolo Espanjassa.",
    "vacation-tourism": "Viralliset matkailuportaalit ja ideat kohteiden valintaan ja matkan suunnitteluun.",
    "vacation-reviews": "Arvostelut ja alueiden, majoitusten sekä kokemusten vertailu."
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
    padron: "./assets/topic-scenes/live-padron-20260606.png",
    nie: "./assets/topic-scenes/live-nie-20260606.png",
    tie: "./assets/topic-scenes/live-tie-20260606.png",
    "social-security": "./assets/topic-scenes/live-social-security-20260606.png",
    digital: "./assets/topic-scenes/live-digital-access-20260606.png",
    "sip-card": "./assets/topic-scenes/live-public-health-20260606.png",
    "private-health": "./assets/topic-scenes/live-private-health-20260606.png",
    "ehic-card": "./assets/topic-scenes/live-ehic-20260606.png",
    banking: "./assets/topic-scenes/live-banking-20260606.png",
    "job-search": "./assets/topic-scenes/live-job-search-20260606.png",
    taxes: "./assets/topic-scenes/live-taxes-20260606.png",
    phone: "./assets/topic-scenes/phone-direct-20260606.png",
    "vacation-entry": "./assets/topic-scenes/vacation-entry.png",
    "vacation-flights": "./assets/topic-scenes/vacation-flights-airports-20260606.png",
    "vacation-ground": "./assets/topic-scenes/vacation-ground-transport-20260606.png",
    "vacation-booking": "./assets/topic-scenes/vacation-booking-platforms-20260606.png",
    "vacation-hotels": "./assets/topic-scenes/vacation-hotel-chains-20260606.png",
    "vacation-tourism": "./assets/topic-scenes/vacation-planning.png",
    "vacation-reviews": "./assets/topic-scenes/vacation-reviews-comparison-20260606.png"
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
          topics: [["padron", t("directPadron")], ["nie", t("directNie")], ["tie", t("directTie")], ["social-security", t("directSocial")], ["digital", t("directDigital")]],
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
          topics: [["banking", t("directBanking")], ["job-search", t("directJobs")], ["taxes", t("directTaxes")]],
          summaryFn: livingTopicSummary
        },
        {
          title: "Instalación diaria",
          description: "Lo práctico del día a día para que todo lo demás funcione mejor.",
          topics: [["phone", t("directPhone")]],
          summaryFn: livingTopicSummary
        }
      ]
    : currentLang === "fi"
      ? [
          {
            title: "Asiakirjat ja hallinto",
            description: "Perusvaiheet henkilöllisyyteen, osoitteen rekisteröintiin ja asiakirjojen järjestämiseen.",
            topics: [["padron", t("directPadron")], ["nie", t("directNie")], ["tie", t("directTie")], ["social-security", t("directSocial")], ["digital", t("directDigital")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Terveys",
            description: "Julkinen terveydenhuoltokortti, tilapäinen kattavuus ja tavallisimmin pyydetyt asiakirjat.",
            topics: [["sip-card", t("directSip")], ["private-health", t("directPrivateHealth")], ["ehic-card", t("directEhic")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Raha ja työ",
            description: "Pankki, työnhaku ja verot, jotta arki alkaa toimia sujuvammin.",
            topics: [["banking", t("directBanking")], ["job-search", t("directJobs")], ["taxes", t("directTaxes")]],
            summaryFn: livingTopicSummary
          },
          {
            title: "Arjen käyttöönotto",
            description: "Päivittäiset käytännön asiat, jotka helpottavat muuta asettumista.",
            topics: [["phone", t("directPhone")]],
            summaryFn: livingTopicSummary
          }
        ]
      : [
          {
            title: "Documents and admin",
            description: "Core steps for your identity, address registration, and basic paperwork footing.",
            topics: [["padron", t("directPadron")], ["nie", t("directNie")], ["tie", t("directTie")], ["social-security", t("directSocial")], ["digital", t("directDigital")]],
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
            topics: [["banking", t("directBanking")], ["job-search", t("directJobs")], ["taxes", t("directTaxes")]],
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
      : currentLang === "fi"
        ? "Valitse se alue, joka vastaa parhaiten sitä mitä sinun täytyy hoitaa seuraavaksi."
        : "Choose the area that most closely matches what you need to sort out next.",
    groups,
    currentLang === "es" ? "Temas para vivir en España" : currentLang === "fi" ? "Espanjassa asumisen aiheet" : "Living in Spain topics"
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
    : currentLang === "fi"
      ? [
        {
          title: "Maahantulo",
          description: "Perusasiat lyhyistä vierailuista, Schengen-säännöistä ja EU- vs. non-EU-erosta.",
          topics: [["vacation-entry", "Maahantulo ja lyhyt oleskelu"]],
          summaryFn: vacationTopicSummary
        },
          {
            title: "Liikkuminen Espanjassa",
            description: "Lennot, lentoasemat, junat, bussit ja autonvuokraus eri matkustustapoihin.",
            topics: [["vacation-flights", "Lennot ja lentoasemat"], ["vacation-ground", "Junat, bussit ja auto"]],
            summaryFn: vacationTopicSummary
          },
          {
            title: "Missä majoittua",
            description: "Suuret varaussivustot ja hotellibrändit, joita näkee paljon Espanjassa.",
            topics: [["vacation-booking", "Varaussivustot"], ["vacation-hotels", "Hotelliketjut"]],
            summaryFn: vacationTopicSummary
          },
          {
            title: "Ideat ja suunnittelu",
            description: "Virallista inspiraatiota, arvosteluja ja työkaluja parempiin valintoihin.",
            topics: [["vacation-tourism", "Virallinen matkailu ja ideat"], ["vacation-reviews", "Arvostelut ja vertailu"]],
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
    currentLang === "es" ? "Vacaciones en España" : currentLang === "fi" ? "Loma Espanjassa" : "Vacation in Spain",
    currentLang === "es"
      ? "Empieza por la parte del viaje que quieras aclarar y luego abre la guía concreta."
      : currentLang === "fi"
        ? "Aloita siitä matkan osasta, jonka haluat selvittää, ja avaa sitten tarkempi opas."
        : "Start with the part of the trip you want to sort out, then open the guide that fits.",
    groups,
    currentLang === "es" ? "Guías de vacaciones en España" : currentLang === "fi" ? "Espanjan lomaoppaat" : "Vacation in Spain guides"
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

function renderFormsAndTaxesBlock(route) {
  if (!route) return "";
  const details = currentLang === "fi"
    ? routeFormsAndTaxesFi[route.id] || routeFormsAndTaxes[route.id]
    : routeFormsAndTaxes[route.id];
  if (!details || (!details.forms.length && !details.taxes.length)) return "";
  const rows = [...details.forms, ...details.taxes]
    .map(([name, description, kind, helperKey]) => {
      const officialUrl = formHelpers[helperKey]?.officialUrl || "";
      const directRoute = name === "NIE" ? "nie" : name === "Padrón" ? "padron" : "";
      const normalizedKind = kind || "";
      const isFeeRow = name === "790-012" || /\bEUR\b/.test(normalizedKind);
      const isFormRow = !isFeeRow;
      const isFormLink = Boolean(officialUrl) && !isFeeRow;
      const isGuideLink = Boolean(directRoute) && !officialUrl;
      const plainKindBadge = {
        Document: "Document",
        Documento: "Documento",
        Asiakirja: "Asiakirja",
        Evidence: "Evidence",
        Todiste: "Todiste",
        "Official application portal": "Portal",
        "Virallinen hakukanava": "Hakukanava"
      }[normalizedKind];
      const isPlainKindRow = !officialUrl && !isGuideLink && !isFeeRow && Boolean(plainKindBadge);
      const rowClass = isFeeRow
        ? "doc-row doc-row--fee"
        : isFormLink
          ? "doc-row doc-row--official"
          : isGuideLink
            ? "doc-row doc-row--guide"
            : "doc-row";
      const badgeLabel = isFeeRow
        ? currentLang === "es"
          ? "Tasa"
          : currentLang === "fi"
            ? "Maksu"
            : "Fee"
        : isGuideLink
          ? currentLang === "es"
            ? "Guía"
            : currentLang === "fi"
              ? "Opas"
              : "Guide"
        : isPlainKindRow
          ? plainKindBadge
        : currentLang === "es"
          ? "Modelo"
          : currentLang === "fi"
            ? "Lomake"
            : "Form";
      const kindLabel = isPlainKindRow || /^(Form|Lomake|Modelo)$/i.test(normalizedKind) ? "" : normalizedKind;
      const rowTag = officialUrl
        ? `a class="${rowClass}" href="${officialUrl}" target="_blank" rel="noreferrer"`
        : isGuideLink
          ? `button type="button" class="${rowClass}" data-direct-route="${directRoute}"`
          : `div class="${rowClass}"`;
      const closingTag = officialUrl ? "a" : isGuideLink ? "button" : "div";
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
  const details = routeFormsAndTaxes[route?.id];
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

function renderRouteLinks(linkTypes, excludedUrls = new Set()) {
  const bankMeta = {
    en: {
      "bank-santander": { intro: "Large branch network and common for payroll, rent, and everyday local banking.", logo: "Santander" },
      "bank-bbva": { intro: "Strong digital setup with a mainstream Spanish current-account path.", logo: "BBVA" },
      "bank-caixabank": { intro: "Very visible across Spain with broad branch and ATM coverage.", logo: "CaixaBank" },
      "bank-sabadell": { intro: "Common expat-facing option in many parts of Spain, especially coastal areas.", logo: "Sabadell" },
      "bank-bankinter": { intro: "Digital-forward Spanish bank with standard resident-account options.", logo: "Bankinter" },
      "bank-revolut": { intro: "Useful starter option while you are still getting local paperwork in order.", logo: "Revolut" },
      "bank-bunq": { intro: "Flexible mobile-first starter option before moving to a traditional bank if needed.", logo: "bunq" }
    },
    es: {
      "bank-santander": { intro: "Gran red de oficinas y una opción muy común para nómina, alquiler y banca local diaria.", logo: "Santander" },
      "bank-bbva": { intro: "Ruta digital fuerte con una opción bancaria española muy habitual.", logo: "BBVA" },
      "bank-caixabank": { intro: "Muy presente en toda España con amplia cobertura de oficinas y cajeros.", logo: "CaixaBank" },
      "bank-sabadell": { intro: "Opción frecuente para expatriados en muchas zonas de España, sobre todo en la costa.", logo: "Sabadell" },
      "bank-bankinter": { intro: "Banco español con enfoque digital y opciones estándar para residentes.", logo: "Bankinter" },
      "bank-revolut": { intro: "Opción útil para empezar mientras todavía organizas la documentación local.", logo: "Revolut" },
      "bank-bunq": { intro: "Opción móvil flexible para empezar antes de pasar a un banco tradicional si lo necesitas.", logo: "bunq" }
    },
    fi: {
      "bank-santander": { intro: "Laaja konttoriverkko ja yleinen valinta palkkaa, vuokraa ja arjen pankkiasioita varten.", logo: "Santander" },
      "bank-bbva": { intro: "Vahva digitaalinen aloitus ja tavallinen espanjalainen käyttötilireitti.", logo: "BBVA" },
      "bank-caixabank": { intro: "Näkyy laajasti Espanjassa ja tarjoaa paljon konttoreita ja automaatteja.", logo: "CaixaBank" },
      "bank-sabadell": { intro: "Monilla alueilla tuttu expat-vaihtoehto, erityisesti rannikkoalueilla.", logo: "Sabadell" },
      "bank-bankinter": { intro: "Digitaalispainotteinen espanjalainen pankki, jossa on tavalliset residenttitilivaihtoehdot.", logo: "Bankinter" },
      "bank-revolut": { intro: "Hyvä aloitusvaihtoehto samalla kun paikalliset asiakirjat ovat vielä kesken.", logo: "Revolut" },
      "bank-bunq": { intro: "Joustava mobiilipainotteinen aloitusvaihtoehto ennen perinteiseen pankkiin siirtymistä tarvittaessa.", logo: "bunq" }
    }
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
    fi: {
      "provider-movistar": { intro: "Suuri perinteinen operaattori mobiiliin, kuituun ja täysiin kotipaketteihin.", logo: "M" },
      "provider-vodafone": { intro: "Tunnettu mobiili- ja laajakaistaoperaattori, jolla on tavallisia yhdistelmäpaketteja.", logo: "V" },
      "provider-orange": { intro: "Suuri valtakunnallinen tarjoaja mobiiliin, kuituun ja kodin yhdistelmäpaketteihin.", logo: "Orange" },
      "provider-digi": { intro: "Suosittu edullisempi vaihtoehto mobiiliin ja kuituun, usein hyvä tulijoille.", logo: "DIGI" },
      "provider-o2": { intro: "Selkeämpi vaihtoehto Movistarin verkossa, usein yksinkertaisemmilla sopimuksilla.", logo: "O2" },
      "provider-yoigo": { intro: "Yleinen vaihtoehto mobiili- ja kuitupaketteihin hieman joustavammalla tuntumalla.", logo: "yoigo" }
    }
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
    fi: {
      "jobs-empleate": { intro: "Julkinen työportaali, joka kokoaa yhteen avoimet paikat ja työmarkkinatiedot.", logo: "Empléate" },
      "jobs-sepe": { intro: "SEPE:n virallinen alue työnhakuun, ohjaukseen ja työresursseihin Espanjassa.", logo: "SEPE" },
      "jobs-eures": { intro: "Hyödyllinen, jos etsit Espanjaan liittyviä rajat ylittäviä tai eurooppalaisia työmahdollisuuksia.", logo: "EURES" },
      "jobs-infojobs": { intro: "Yksi Espanjan suurimmista yleisistä työportaaleista monille aloille.", logo: "InfoJobs" },
      "jobs-linkedin": { intro: "Vahva ammatillisiin rooleihin, verkostoitumiseen ja yritysvetoiseen rekrytointiin.", logo: "in" },
      "jobs-indeed": { intro: "Laaja kokoajamainen portaali hyödyllinen monentyyppisiin hakuihin.", logo: "Indeed" },
      "jobs-jobtoday": { intro: "Suosittu nopealiikkeisiin palvelu-, myynti- ja ravintola-alan töihin.", logo: "JOB TODAY" },
      "jobs-tecnoempleo": { intro: "Erikoistunut portaali teknologia-, IT- ja tietoliikennetehtäviin Espanjassa.", logo: "Tecno" }
    }
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
    fi: {
      "insurance-sanitas": { intro: "Suuri yksityinen sairausvakuuttaja Espanjassa, jolla on laaja näkyvyys hoitoverkostossa.", logo: "Sanitas" },
      "insurance-adeslas": { intro: "Suuri sairausvakuuttaja, jota vertaillaan usein lupiin sopivaa vakuutusta etsiessä.", logo: "Adeslas" },
      "insurance-asisa": { intro: "Vakiintunut espanjalainen sairausvakuuttaja, jolla on vahva valtakunnallinen kattavuus.", logo: "ASISA" },
      "insurance-dkv": { intro: "Tunnettu sairausvakuuttaja, jolla on vahva painotus yksityisterveyteen ja digitaalisiin palveluihin.", logo: "DKV" },
      "insurance-mapfre": { intro: "Suuri espanjalainen vakuuttaja, jolla on sairausvakuutuksia muun tarjonnan rinnalla.", logo: "MAPFRE" }
    }
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
    fi: {
      "travel-spaininfo": { intro: "Espanjan virallinen matkailuportaali kohteisiin, ideoihin ja käytännölliseen suunnitteluun.", logo: "Spain" },
      "travel-renfe": { intro: "Tärkein virallinen junavaihtoehto pitkiin ja moniin kotimaan matkoihin Espanjassa.", logo: "Renfe" },
      "travel-aena": { intro: "Virallinen lentoasemaverkoston portaali Espanjan kentille, terminaaleille ja matkustajatiedoille.", logo: "Aena" },
      "travel-alsa": { intro: "Suuri kaukoliikenteen bussiyhtiö, hyödyllinen reiteillä joita junat eivät kata hyvin.", logo: "ALSA" },
      "travel-paradores": { intro: "Espanjan valtion omistama ikoninen hotelliverkosto erottuviin majoituksiin ympäri maan.", logo: "Paradores" }
    }
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
    fi: {
      "flight-iberia": { intro: "Espanjan kansallinen lentoyhtiö ja hyvä suora vaihtoehto, jos haluat varata ilman välikättä.", logo: "Iberia" },
      "flight-google": { intro: "Erittäin hyödyllinen päivien, reittien ja hintakäyrien vertailuun ennen varausta.", logo: "Google" },
      "flight-skyscanner": { intro: "Suosittu lentohaku monien lentoyhtiöiden ja matkatoimistojen vertailuun kerralla.", logo: "Sky" },
      "flight-kayak": { intro: "Tunnettu metahakuvaihtoehto reittien, hintatasojen ja vaihtoehtoisten kenttien tarkistamiseen.", logo: "KAYAK" },
      "flight-edreams": { intro: "Suuri espanjalaislähtöinen verkkotoimisto, jota käytetään paljon lentojen vertailuun ja varaukseen.", logo: "eDreams" }
    }
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
    fi: {
      "car-europcar": { intro: "Suuri eurooppalainen autovuokraamo, jolla on hyvä kattavuus Espanjan kentillä ja kaupungeissa.", logo: "Europcar" },
      "car-sixt": { intro: "Tunnettu hieman premium-henkinen vuokrausvaihtoehto, jolla on paljon noutopisteitä Espanjassa.", logo: "SIXT" },
      "car-avis": { intro: "Pitkään toiminut kansainvälinen vuokrausbrändi, jolla on läsnäoloa Espanjan kentillä ja kaupungeissa.", logo: "Avis" },
      "car-hertz": { intro: "Suuri kansainvälinen autovuokraamo, jolla on laaja saatavuus eri puolilla Espanjaa.", logo: "Hertz" }
    }
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
    fi: {
      "stay-booking": { intro: "Yksi suurimmista hotellivaraussivustoista majoituksen vertailuun eri puolilla Espanjaa.", logo: "Booking" },
      "stay-airbnb": { intro: "Suosittu asuntoihin, huoneisiin ja kodinomaisempiin majoituksiin.", logo: "airbnb" },
      "stay-expedia": { intro: "Suuri matkailualusta, joka on hyödyllinen hotelleihin ja laajempaan matkan kokoamiseen.", logo: "Expedia" },
      "stay-tripadvisor": { intro: "Hyödyllinen arvostelujen, alueiden, nähtävyyksien ja majoitusideoiden vertailuun ennen varausta.", logo: "Tripadvisor" }
    }
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
    fi: {
      "hotel-melia": { intro: "Yksi Espanjan tunnetuimmista hotelliryhmistä, jolla on kaupunki-, ranta- ja resort-hotelleja.", logo: "Meliá" },
      "hotel-nh": { intro: "Vahva espanjalainen ja eurooppalainen kaupunkihotelliketju, hyödyllinen käytännöllisiin kaupunkimajoituksiin.", logo: "NH" },
      "hotel-barcelo": { intro: "Suuri espanjalainen hotelliryhmä, jolla on laaja valikoima kaupunki-, saari- ja lomakohteita.", logo: "Barceló" },
      "hotel-riu": { intro: "Espanjalainen ketju, joka tunnetaan erityisesti resort-tyylisistä rantamajoituksista.", logo: "RIU" },
      "hotel-iberostar": { intro: "Suuri espanjalainen resort- ja rantahotellibrändi, jolla on vahva läsnäolo maassa.", logo: "Iberostar" },
      "hotel-marriott": { intro: "Kansainvälinen hotelliryhmä, jolla on paljon eri brändejä ja laaja läsnäolo Espanjassa.", logo: "Marriott" },
      "hotel-hilton": { intro: "Kansainvälinen hotelliketju, jolla on laadukkaita ja liikematkailuun sopivia vaihtoehtoja Espanjassa.", logo: "Hilton" }
    }
  };
  const linkLabels = {
    en: {
      cita: "Book an appointment",
      "eu-certificate": "EU registration certificate",
      nie: "NIE assignment",
      fnmt: "FNMT digital certificate",
      clave: "Cl@ve registration",
      schengen: "Check visa or ETIAS requirement",
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
      "fnmt-ss-cita": "FNMT appointment via Social Security"
    },
    es: {
      cita: "Reservar cita previa",
      "eu-certificate": "Certificado de registro de ciudadano de la UE",
      nie: "Asignación de NIE",
      fnmt: "Certificado digital FNMT",
      clave: "Registro en Cl@ve",
      schengen: "Comprobar visado o ETIAS",
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
      "fnmt-ss-cita": "Cita FNMT por Seguridad Social"
    },
    fi: {
      cita: "Varaa aika",
      "eu-certificate": "EU-rekisteröintitodistus",
      nie: "NIE-numeron hakeminen",
      fnmt: "FNMT-digivarmenne",
      clave: "Cl@ve-rekisteröinti",
      schengen: "Tarkista viisumi tai ETIAS",
      calculator: "Virallinen EU 90/180 -laskuri",
      "eu-short-stay": "Espanja: enintään 3 kuukauden oleskelu",
      "work-employed": "Palkkatyö Espanjassa",
      "work-self-employed": "Yrittäjänä Espanjassa",
      "digital-nomad-official": "Kansainvälisen etätyön reitti",
      "non-lucrative-official": "Työskentelemätön oleskelulupa",
      "study-official": "Opiskeluun perustuva oleskelu",
      "family-official": "Perheenyhdistäminen",
      "eu-family-official": "EU-kansalaisen perheenjäsenen oleskelukortti",
      "eu-family-spain": "EU:n ulkopuolisten perheenjäsenten rekisteröinti",
      "tie-form": "EX-17 TIE-korttilomake",
      "790-012": "Luo 790-012",
      "padron-info": "Etsi oma kunnantalo",
      "social-security-number": "Hae sosiaaliturvatunnusta",
      "bank-santander": "Banco Santander",
      "bank-bbva": "BBVA",
      "bank-caixabank": "CaixaBank",
      "bank-sabadell": "Banco Sabadell",
      "bank-bankinter": "Bankinter",
      "bank-revolut": "Revolut",
      "bank-bunq": "bunq",
      "provider-movistar": "Movistar",
      "provider-vodafone": "Vodafone",
      "provider-orange": "Orange",
      "provider-digi": "DIGI",
      "provider-o2": "O2",
      "provider-yoigo": "Yoigo",
      "jobs-empleate": "Empléate-työportaali",
      "jobs-sepe": "SEPE-työnhaku",
      "jobs-eures": "EURES Espanja",
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
      "travel-spaininfo": "Espanjan matkailu",
      "travel-renfe": "Renfe-junat",
      "travel-aena": "Aenan lentoasemat",
      "travel-alsa": "ALSA-bussit",
      "travel-paradores": "Paradores",
      "flight-iberia": "Iberia-lennot",
      "flight-google": "Google Flights",
      "flight-skyscanner": "Skyscanner",
      "flight-kayak": "KAYAK-lennot",
      "flight-edreams": "eDreams-lennot",
      "car-europcar": "Europcar",
      "car-sixt": "SIXT",
      "car-avis": "Avis",
      "car-hertz": "Hertz",
      "stay-booking": "Booking.com",
      "stay-airbnb": "Airbnb",
      "stay-expedia": "Expedia-hotellit",
      "stay-tripadvisor": "Tripadvisor",
      "hotel-melia": "Meliá-hotellit",
      "hotel-nh": "NH Hotels",
      "hotel-barcelo": "Barceló-hotellit",
      "hotel-riu": "RIU-hotellit",
      "hotel-iberostar": "Iberostar-hotellit",
      "hotel-marriott": "Marriott-hotellit",
      "hotel-hilton": "Hilton-hotellit",
      "tax-agency": "Verohallinnon portaali",
      "tax-census": "Verorekisteri ja verosoite",
      "healthcare-right-spain": "Hae terveydenhuolto-oikeutta Espanjassa",
      "valencia-health-card": "Valencian alue: SIP-kortti",
      "madrid-health-card": "Madrid: Tarjeta Sanitaria Individual",
      "andalucia-health-card": "Andalusia: Tarjeta sanitaria",
      "cataluna-health-card": "Katalonia: TSI",
      "murcia-health-card": "Murcia: Tarjeta Sanitaria Individual",
      "ehic-card": "Hae tai uusi EHIC",
      "citizenship-residence": "Espanjan kansalaisuus asumisen perusteella",
      "citizenship-application": "Kansalaisuushakemuksen portaali",
      "fnmt-aeat-cita": "FNMT-aika veroviraston kautta",
      "fnmt-ss-cita": "FNMT-aika sosiaaliturvan kautta"
    }
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
    "provider-movistar": "https://www.movistar.es/",
    "provider-vodafone": "https://www.vodafone.es/c/particulares/es/",
    "provider-orange": "https://www.orange.es/",
    "provider-digi": "https://www.digimobil.es/",
    "provider-o2": "https://o2online.es/",
    "provider-yoigo": "https://www.yoigo.com/",
    "jobs-empleate": "https://coeestatal.sepe.es/coe-estatal/servicios/servicio-red/empleate.html",
    "jobs-sepe": "https://www.sepe.es/HomeSepe/es/encontrar-trabajo.html",
    "jobs-eures": "https://www.sepe.es/HomeSepe/es/encontrar-trabajo/eures.html",
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
    "hotel-riu": "https://www.riu.com/en/hotels/spain/",
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
      subtitle: currentLang === "es" ? "Sede oficial de la Administración" : currentLang === "fi" ? "Virallinen hallinnon ajanvaraus" : "Official government appointment portal",
      variant: "general",
      system: "spain"
    },
    "790-012": {
      subtitle: currentLang === "es" ? "Generador oficial de tasas de la Policía" : currentLang === "fi" ? "Poliisin virallinen maksugeneraattori" : "Official Police fee generator",
      variant: "fee",
      system: "spain"
    },
    "social-security-number": {
      subtitle: currentLang === "es" ? "Trámite oficial de la Seguridad Social" : currentLang === "fi" ? "Sosiaaliturvan virallinen menettely" : "Official Social Security procedure",
      variant: "social",
      system: "spain"
    },
    "healthcare-right-spain": {
      subtitle: currentLang === "es" ? "Acceso oficial a asistencia sanitaria" : currentLang === "fi" ? "Virallinen terveydenhuollon oikeus" : "Official healthcare entitlement route",
      variant: "health",
      system: "spain"
    },
    "ehic-card": {
      subtitle: currentLang === "es" ? "Solicitud oficial de Tarjeta Sanitaria Europea" : currentLang === "fi" ? "Virallinen EHIC-hakemus" : "Official EHIC request",
      variant: "health",
      system: "spain"
    }
  };
  const govDomains = [
    "inclusion.gob.es",
    "administracion.gob.es",
    "sede.administracionespublicas.gob.es",
    "seg-social.es",
    "prestaciones.seg-social.es",
    "sede.policia.gob.es",
    "mjusticia.gob.es",
    "sede.mjusticia.gob.es",
    "clave.gob.es",
    "fnmt.gob.es",
    "sede.fnmt.gob.es",
    "agenciatributaria.gob.es",
    "sede.agenciatributaria.gob.es"
  ];
  const genericGovMeta = {
    subtitle:
      currentLang === "es"
        ? "Web oficial del Gobierno de España"
        : currentLang === "fi"
          ? "Espanjan virallinen viranomaissivu"
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
        : currentLang === "fi"
          ? "Euroopan unionin virallinen sivusto"
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
      if (type.startsWith("bank-")) {
        const meta = bankMeta[currentLang]?.[type] || bankMeta.en[type];
        const brandClass = `bank-link bank-link--${type.replace("bank-", "")}`;
        return `
          <a class="${brandClass}" href="${urls[type]}" target="_blank" rel="noreferrer">
            <span class="bank-logo" aria-hidden="true">${meta?.logo || label}</span>
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
          currentLang === "es" ? "¿Eres?" : currentLang === "fi" ? "Oletko?" : "Are you?",
          currentLang === "es"
            ? "Elige ciudadano UE/EEE/Suiza o no comunitario para que IberiGo muestre las reglas correctas de estancia corta."
            : currentLang === "fi"
              ? "Valitse EU-/ETA-/Sveitsin kansalainen tai EU:n ulkopuolinen, jotta IberiGo voi näyttää oikeat lyhyen oleskelun säännöt."
              : "Choose EU/EEA/Swiss or non-EU so IberiGo can show the right short-stay rules."
        );
      } else {
        showWizardPrompt(
          currentLang === "es" ? "Elige qué te describe mejor" : currentLang === "fi" ? "Valitse sinua parhaiten kuvaava vaihtoehto" : "Choose what best describes you",
          currentLang === "es"
            ? "Selecciona primero una opción y continúa a la siguiente pregunta."
            : currentLang === "fi"
              ? "Valitse ensin yksi vaihtoehto ja jatka seuraavaan kysymykseen."
              : "Select one option first, then continue to the next question."
        );
      }
      return;
    }
    if (currentEntryPreset === "vacation") {
      pushCurrentScreenState();
      wizard.dataset.step = "result";
      showDirectGuide();
      updateQuestionVisibility();
      renderVacationRoadmap();
      return;
    }
    pushCurrentScreenState();
    wizard.dataset.step = "goal";
    updateQuestionVisibility();
    setCurrentScreenState({
      type: "wizard",
      entryPreset: currentEntryPreset,
      step: wizard.dataset.step,
      selections: wizardSelectionState()
    });
    showWizardPrompt(
      currentLang === "es" ? "Siguiente: ¿qué quieres hacer?" : currentLang === "fi" ? "Seuraavaksi: mitä yrität tehdä?" : "Next: what are you trying to do?",
      currentLang === "es"
        ? "Elige el motivo principal por el que necesitas trámites en España."
        : currentLang === "fi"
          ? "Valitse tärkein syy, miksi tarvitset Espanjan asiakirjoja."
          : "Choose the main reason you need Spanish paperwork."
    );
    wizard.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }

  if (step === "goal") {
    if (!getValue("goal")) {
      showWizardPrompt(
        currentLang === "es" ? "Elige qué quieres hacer" : currentLang === "fi" ? "Valitse mitä yrität tehdä" : "Choose what you are trying to do",
        currentLang === "es"
          ? "Selecciona primero una opción y después IberiGo podrá acotar la ruta."
          : currentLang === "fi"
            ? "Valitse ensin yksi vaihtoehto, niin IberiGo voi rajata reittiä tarkemmin."
            : "Select one option first, then IberiGo can narrow the route."
      );
      return;
    }
    if (getValue("goal") === "vacation") {
      pushCurrentScreenState();
      wizard.dataset.step = "result";
      updateQuestionVisibility();
      renderRoadmap();
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
        currentLang === "es" ? "¿Con quién te reúnes?" : currentLang === "fi" ? "Kenen luo liityt?" : "Who are you joining?",
        currentLang === "es"
          ? "Elige si tu familiar es ciudadano de la UE/EEE/Suiza o español, o un residente no comunitario en España."
          : currentLang === "fi"
            ? "Valitse, onko perheenjäsenesi EU-/ETA-/Sveitsin tai Espanjan kansalainen vai Espanjassa asuva EU:n ulkopuolinen."
            : "Choose whether your family member is an EU/EEA/Swiss or Spanish citizen, or a non-EU resident in Spain."
      );
      wizard.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    pushCurrentScreenState();
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderRoadmap();
    const route = pickRoute()?.id || "unknown-route";
    trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
    return;
  }

  if (step === "family") {
    if (!getValue("familySponsor")) {
      showWizardPrompt(
        currentLang === "es" ? "Elige la situación del familiar" : currentLang === "fi" ? "Valitse perheenjäsenen asema" : "Choose the family member's status",
        currentLang === "es"
          ? "Esto decide si la ruta es tarjeta de familiar de ciudadano de la UE o reagrupación familiar."
          : currentLang === "fi"
            ? "Tämä ratkaisee, onko reitti EU-kansalaisen perheenjäsenen oleskelukortti vai perheenyhdistäminen."
            : "This decides whether the route is an EU-family residence card or family reunification."
      );
      return;
    }
    pushCurrentScreenState();
    wizard.dataset.step = "result";
    updateQuestionVisibility();
    renderRoadmap();
    const route = pickRoute()?.id || "unknown-route";
    trackUsageEvent(`/guide/${route}`, `Submitted ${route}`);
    return;
  }

  pushCurrentScreenState();
  wizard.dataset.step = "result";
  updateQuestionVisibility();
  renderRoadmap();
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

initializeVisitorCounter();
clearWizardSelections();
wizard.dataset.step = "person";
applyTranslations();
renderEmptyResult();
showOnlyTopicCards();
if (!openNavSectionIfRequested()) showNormalApp();
