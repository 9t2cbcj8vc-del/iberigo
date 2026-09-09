(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.IberiGoIntentDiscovery = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const copy = {
    en: {
      kicker: 'Find the right procedure',
      title: 'What do you need to do?',
      intro: 'Describe your situation in your own words. IberiGo will point you to the most useful starting guide.',
      placeholder: 'e.g. My visa was approved and I need fingerprints',
      label: 'Describe what you need help with',
      examples: 'Try an example',
      recommended: 'Best starting point',
      alternatives: 'Other useful routes',
      open: 'Open guide',
      all: 'Search all IberiGo guides',
      empty: 'Start typing or choose an example.',
      none: 'No confident procedure match yet. Try the full IberiGo search.',
      result: 'Suggested route',
      examplesList: [
        'My visa was approved',
        'I need a Social Security number',
        'I need to register my address',
        'I want to exchange my driving licence'
      ]
    },
    es: {
      kicker: 'Encuentra el trámite correcto',
      title: '¿Qué necesitas hacer?',
      intro: 'Describe tu situación con tus propias palabras. IberiGo te indicará la guía más útil para empezar.',
      placeholder: 'p. ej. Me aprobaron la residencia y necesito las huellas',
      label: 'Describe el trámite con el que necesitas ayuda',
      examples: 'Prueba un ejemplo',
      recommended: 'Mejor punto de partida',
      alternatives: 'Otras rutas útiles',
      open: 'Abrir guía',
      all: 'Buscar en todas las guías de IberiGo',
      empty: 'Empieza a escribir o elige un ejemplo.',
      none: 'Todavía no hay una coincidencia clara. Prueba la búsqueda completa de IberiGo.',
      result: 'Ruta sugerida',
      examplesList: [
        'Me aprobaron la residencia',
        'Necesito número de Seguridad Social',
        'Necesito empadronarme',
        'Quiero canjear mi carnet de conducir'
      ]
    }
  };

  const intents = [
    {
      id: 'tie-after-approval',
      urls: { en: '/guides/tie-after-approval/', es: '/guides/es/tie-after-approval/' },
      titles: { en: 'TIE after approval', es: 'TIE después de la aprobación' },
      summaries: {
        en: 'Your residence or stay has been approved and you now need the physical TIE card, fingerprints or collection steps.',
        es: 'Tu residencia o estancia ya está aprobada y ahora necesitas la tarjeta TIE, las huellas o la recogida.'
      },
      aliases: [
        'visa approved', 'residence approved', 'residency approved', 'authorization approved', 'approved residency', 'approved residence', 'favorable resolution',
        'fingerprint appointment', 'fingerprints tie', 'toma de huellas', 'huellas tie', 'collect tie card', 'pick up tie', 'my visa was approved',
        'residencia aprobada', 'me aprobaron la residencia', 'autorizacion aprobada', 'resolucion favorable', 'cita de huellas', 'poner huellas', 'recoger tie', 'tarjeta despues de aprobacion'
      ],
      keywords: ['approved', 'approval', 'favorable', 'fingerprint', 'fingerprints', 'huellas', 'toma', 'collect', 'recoger', 'aprobada', 'aprobado']
    },
    {
      id: 'nie',
      urls: { en: '/guides/nie/', es: '/guides/es/nie/' },
      titles: { en: 'Get an NIE', es: 'Obtener un NIE' },
      summaries: {
        en: 'You need the foreigner identification number for a transaction or administrative step; an NIE alone is not residence.',
        es: 'Necesitas el número de identidad de extranjero para una gestión; el NIE por sí solo no es residencia.'
      },
      aliases: ['need nie', 'get nie', 'nie number', 'nie only', 'ex15', 'ex 15', 'numero nie', 'necesito nie', 'sacar nie', 'obtener nie', 'asignacion nie'],
      keywords: ['nie', 'ex15', 'asignacion']
    },
    {
      id: 'eu-registration',
      urls: { en: '/guides/eu-registration/', es: '/guides/es/eu-registration/' },
      titles: { en: 'EU citizen registration', es: 'Registro de ciudadano de la UE' },
      summaries: {
        en: 'EU/EEA/Swiss citizen living in Spain longer term: the green EU registration certificate / EX-18 route.',
        es: 'Ciudadano UE/EEE/Suiza que vive en España a largo plazo: certificado verde de registro / EX-18.'
      },
      aliases: ['green nie', 'green certificate', 'eu registration', 'eu resident certificate', 'ex18', 'ex 18', 'certificado verde', 'nie verde', 'registro ciudadano ue', 'registro ue', 'certificado registro union'],
      keywords: ['green', 'verde', 'eu', 'ue', 'ex18', 'registration', 'registro', 'certificate', 'certificado']
    },
    {
      id: 'tie',
      urls: { en: '/guides/tie/', es: '/guides/es/tie/' },
      titles: { en: 'TIE basics', es: 'Conceptos básicos de la TIE' },
      summaries: {
        en: 'Understand what the non-EU foreigner identity card is, when it applies and how it differs from an NIE.',
        es: 'Entiende qué es la tarjeta de identidad de extranjero, cuándo corresponde y cómo se diferencia del NIE.'
      },
      aliases: ['need tie', 'what is tie', 'tie card', 'tarjeta tie', 'necesito tie', 'que es tie', 'tarjeta extranjero'],
      keywords: ['tie', 'tarjeta', 'foreigner']
    },
    {
      id: 'padron',
      urls: { en: '/guides/padron/', es: '/guides/es/padron/' },
      titles: { en: 'Register on the padrón', es: 'Empadronamiento / padrón' },
      summaries: {
        en: 'Register your address with your town hall and understand padrón certificates, appointments and documents.',
        es: 'Registra tu domicilio en el ayuntamiento y consulta certificados, citas y documentos del padrón.'
      },
      aliases: ['register my address', 'register address', 'town hall address', 'padron', 'empadronamiento', 'empadronarme', 'register at town hall', 'domicilio ayuntamiento', 'alta padron', 'certificado padron', 'volante padron'],
      keywords: ['padron', 'empadronamiento', 'empadronarme', 'address', 'domicilio', 'ayuntamiento', 'town', 'volante']
    },
    {
      id: 'social-security',
      urls: { en: '/guides/social-security/', es: '/guides/es/social-security/' },
      titles: { en: 'Social Security number (NUSS)', es: 'Número de Seguridad Social (NUSS)' },
      summaries: {
        en: 'Get or understand your Spanish Social Security number and the Importass route.',
        es: 'Obtén o consulta tu número de la Seguridad Social y la vía de Importass.'
      },
      aliases: ['social security number', 'need social security', 'nuss', 'numero seguridad social', 'número seguridad social', 'necesito seguridad social', 'numero ss', 'importass number'],
      keywords: ['social', 'security', 'seguridad', 'nuss', 'importass']
    },
    {
      id: 'sip-health-card',
      urls: { en: '/guides/sip-card/', es: '/guides/es/sip-card/' },
      titles: { en: 'Get a public health card', es: 'Obtener la tarjeta sanitaria' },
      summaries: {
        en: 'You have or expect public healthcare entitlement and need the regional health card / SIP registration step.',
        es: 'Tienes o esperas tener derecho a sanidad pública y necesitas la tarjeta sanitaria / registro SIP.'
      },
      aliases: ['health card', 'public health card', 'sip card', 'tarjeta sip', 'tarjeta sanitaria', 'healthcare card', 'centro de salud card', 'get sip', 'necesito tarjeta sanitaria'],
      keywords: ['sip', 'health', 'healthcare', 'sanitaria', 'tarjeta', 'salud']
    },
    {
      id: 'healthcare',
      urls: { en: '/moving-to-spain/healthcare/', es: '/es/moving-to-spain/healthcare/' },
      titles: { en: 'Healthcare in Spain', es: 'Sanidad en España' },
      summaries: {
        en: 'Work out whether your route is public healthcare, S1/EHIC, private insurance or another coverage basis.',
        es: 'Aclara si tu vía es sanidad pública, S1/TSE, seguro privado u otra cobertura.'
      },
      aliases: ['public healthcare', 'healthcare in spain', 'medical coverage spain', 'sanidad publica', 'sanidad en espana', 'cobertura sanitaria', 'como tener sanidad'],
      keywords: ['healthcare', 'sanidad', 'coverage', 'cobertura', 'medical', 'publica']
    },
    {
      id: 'digital',
      urls: { en: '/guides/digital/', es: '/guides/es/digital/' },
      titles: { en: 'Cl@ve and digital certificate', es: 'Cl@ve y certificado digital' },
      summaries: {
        en: 'Set up Cl@ve or an FNMT digital certificate for Spanish online administration.',
        es: 'Configura Cl@ve o un certificado digital FNMT para los trámites online.'
      },
      aliases: ['clave', 'cl@ve', 'digital certificate', 'fnmt', 'certificado digital', 'necesito clave', 'obtener clave', 'firma digital spain', 'online government login'],
      keywords: ['clave', 'digital', 'certificate', 'certificado', 'fnmt', 'firma']
    },
    {
      id: 'driving-exchange',
      urls: { en: '/guides/driving-licence-exchange/', es: '/guides/es/driving-licence-exchange/' },
      titles: { en: 'Exchange a driving licence', es: 'Canjear el permiso de conducir' },
      summaries: {
        en: 'Check whether your foreign licence can be exchanged in Spain and follow the correct DGT canje route.',
        es: 'Comprueba si puedes canjear tu permiso extranjero y sigue la vía correcta de la DGT.'
      },
      aliases: ['exchange driving licence', 'exchange drivers license', 'driving licence exchange', 'license exchange', 'canje driving licence', 'canjear carnet', 'canjear permiso', 'canje permiso conducir', 'cambiar carnet conducir', 'homologar carnet'],
      keywords: ['exchange', 'canje', 'canjear', 'licence', 'license', 'carnet', 'conducir', 'dgt']
    },
    {
      id: 'driving-resident',
      urls: { en: '/living-in-spain/driving/', es: '/es/living-in-spain/driving/' },
      titles: { en: 'Driving in Spain as a resident', es: 'Conducir en España como residente' },
      summaries: {
        en: 'Find out whether your current foreign licence remains valid after becoming resident and what DGT route applies.',
        es: 'Comprueba si tu permiso extranjero sigue siendo válido al hacerte residente y qué vía de la DGT corresponde.'
      },
      aliases: ['can i drive in spain', 'foreign licence valid spain', 'driving as resident', 'drive after residency', 'puedo conducir en espana', 'carnet extranjero valido', 'conducir como residente', 'permiso extranjero espana'],
      keywords: ['drive', 'driving', 'conducir', 'resident', 'residente', 'foreign', 'extranjero']
    },
    {
      id: 'banking',
      urls: { en: '/guides/banking/', es: '/guides/es/banking/' },
      titles: { en: 'Banking in Spain', es: 'Banca en España' },
      summaries: { en: 'Understand Spanish bank accounts, IBANs and common resident/non-resident documentation.', es: 'Entiende cuentas bancarias españolas, IBAN y documentación habitual.' },
      aliases: ['open bank account', 'spanish bank account', 'bank account spain', 'iban spain', 'abrir cuenta bancaria', 'cuenta bancaria espana', 'cuenta banco', 'iban espanol'],
      keywords: ['bank', 'banking', 'banco', 'bancaria', 'iban', 'account', 'cuenta']
    },
    {
      id: 'taxes',
      urls: { en: '/guides/taxes/', es: '/guides/es/taxes/' },
      titles: { en: 'Taxes and tax residence', es: 'Impuestos y residencia fiscal' },
      summaries: { en: 'Start with Spanish tax residence, IRPF/IRNR and common reporting questions.', es: 'Empieza por residencia fiscal, IRPF/IRNR y obligaciones informativas habituales.' },
      aliases: ['tax resident', 'taxes spain', 'spanish tax', 'irpf', 'irnr', 'modelo 720', 'residencia fiscal', 'impuestos espana', 'declaracion renta', 'hacienda tax'],
      keywords: ['tax', 'taxes', 'fiscal', 'impuestos', 'irpf', 'irnr', '720', 'hacienda']
    },
    {
      id: 'vida-laboral',
      urls: { en: '/guides/vida-laboral/', es: '/guides/es/vida-laboral/' },
      titles: { en: 'Get your vida laboral', es: 'Obtener la vida laboral' },
      summaries: { en: 'Download or request your Spanish employment-history report.', es: 'Descarga o solicita tu informe de vida laboral.' },
      aliases: ['vida laboral', 'work history report spain', 'employment history social security', 'informe vida laboral', 'historial laboral'],
      keywords: ['vida', 'laboral', 'employment', 'history', 'historial', 'informe']
    },
    {
      id: 'job-search',
      urls: { en: '/guides/job-search/', es: '/guides/es/job-search/' },
      titles: { en: 'Find a job in Spain', es: 'Buscar trabajo en España' },
      summaries: { en: 'Start a practical job search in Spain and understand common channels and preparation.', es: 'Empieza una búsqueda de empleo práctica en España y prepara los pasos básicos.' },
      aliases: ['find job spain', 'job search spain', 'looking for work', 'buscar trabajo espana', 'buscar empleo', 'encontrar trabajo', 'busco trabajo'],
      keywords: ['job', 'work', 'employment', 'trabajo', 'empleo', 'buscar']
    },
    {
      id: 'work-authorization',
      urls: { en: '/guides/work-authorization/', es: '/guides/es/work-authorization/' },
      titles: { en: 'Work authorization', es: 'Autorización de trabajo' },
      summaries: { en: 'Understand whether a non-EU worker needs Spanish residence/work authorization and which route applies.', es: 'Entiende si un trabajador no UE necesita autorización de residencia y trabajo y qué vía corresponde.' },
      aliases: ['work permit spain', 'work authorization spain', 'need permit to work', 'permiso de trabajo', 'autorizacion de trabajo', 'trabajar legalmente espana'],
      keywords: ['permit', 'authorization', 'work', 'permiso', 'autorizacion', 'trabajo']
    },
    {
      id: 'eu-family',
      urls: { en: '/moving-to-spain/family-member-eu-citizen/', es: '/es/moving-to-spain/family-member-eu-citizen/' },
      titles: { en: 'Non-EU family member of an EU citizen', es: 'Familiar no UE de ciudadano de la UE' },
      summaries: { en: 'Use the EU-family route when a non-EU spouse/partner or qualifying relative joins an EU/EEA/Swiss citizen in Spain.', es: 'Usa la vía de familiar de ciudadano UE cuando un familiar no UE acompaña o se reúne con un ciudadano UE/EEE/Suiza.' },
      aliases: ['my partner is non eu', 'non eu spouse eu citizen', 'eu citizen non eu spouse', 'wife non eu husband eu', 'husband non eu wife eu', 'pareja no ue ciudadano ue', 'conyuge no ue ciudadano ue', 'soy europeo pareja no europea', 'familiar ciudadano union'],
      keywords: ['partner', 'spouse', 'family', 'eu', 'non', 'pareja', 'conyuge', 'familiar', 'ue']
    },
    {
      id: 'family-reunification',
      urls: { en: '/moving-to-spain/family-reunification/', es: '/es/moving-to-spain/family-reunification/' },
      titles: { en: 'Family reunification', es: 'Reagrupación familiar' },
      summaries: { en: 'A non-EU resident in Spain wants to bring an eligible non-EU family member.', es: 'Un residente no UE en España quiere reagrupar a un familiar no UE que cumple los requisitos.' },
      aliases: ['bring family to spain', 'family reunification', 'reunite family non eu', 'bring spouse non eu resident', 'reagrupacion familiar', 'traer familia espana', 'reagrupar conyuge', 'residente no ue familiar'],
      keywords: ['family', 'reunification', 'bring', 'familia', 'reagrupacion', 'reagrupar']
    },
    {
      id: 'eu-roadmap',
      urls: { en: '/moving-to-spain/eu-citizens/', es: '/es/moving-to-spain/eu-citizens/' },
      titles: { en: 'Move to Spain as an EU citizen', es: 'Mudarse a España como ciudadano de la UE' },
      summaries: { en: 'The full route for EU/EEA/Swiss citizens moving to Spain.', es: 'La ruta completa para ciudadanos UE/EEE/Suiza que se mudan a España.' },
      aliases: ['eu citizen moving to spain', 'european moving to spain', 'finnish moving to spain', 'french moving to spain', 'german moving to spain', 'italian moving to spain', 'swedish moving to spain', 'dutch moving to spain', 'irish moving to spain', 'soy ciudadano ue mudarme espana', 'europeo mudarse espana', 'finlandes mudarse espana', 'frances mudarse espana', 'aleman mudarse espana', 'italiano mudarse espana'],
      keywords: ['eu', 'european', 'europeo', 'ue', 'moving', 'mudarse', 'finnish', 'finlandes']
    },
    {
      id: 'non-eu-roadmap',
      urls: { en: '/moving-to-spain/non-eu-citizens/', es: '/es/moving-to-spain/non-eu-citizens/' },
      titles: { en: 'Move to Spain as a non-EU citizen', es: 'Mudarse a España como ciudadano no UE' },
      summaries: { en: 'Start with the visa/residence route that matches a non-EU citizen’s reason for moving.', es: 'Empieza por la vía de visado/residencia que corresponda al motivo de mudanza de un ciudadano no UE.' },
      aliases: ['non eu moving to spain', 'american moving to spain', 'british moving to spain', 'colombian moving to spain', 'canadian moving to spain', 'no ue mudarme espana', 'colombiano mudarse espana', 'britanico mudarse espana', 'estadounidense mudarse espana'],
      keywords: ['non', 'moving', 'american', 'british', 'colombian', 'no', 'mudarse', 'colombiano']
    },
    {
      id: 'digital-nomad',
      urls: { en: '/moving-to-spain/digital-nomad-spain/', es: '/es/moving-to-spain/digital-nomad-spain/' },
      titles: { en: 'Digital nomad route', es: 'Ruta de nómada digital' },
      summaries: { en: 'Remote work mainly for employers or clients outside Spain: start with the international telework route.', es: 'Trabajo remoto principalmente para empresas o clientes fuera de España: empieza por la vía de teletrabajo internacional.' },
      aliases: ['digital nomad visa', 'remote work visa spain', 'work remotely from spain', 'nomada digital', 'visado teletrabajo', 'trabajar remoto desde espana', 'teletrabajo internacional'],
      keywords: ['digital', 'nomad', 'remote', 'nomada', 'teletrabajo', 'remoto']
    },
    {
      id: 'non-lucrative',
      urls: { en: '/moving-to-spain/retire-in-spain/', es: '/es/moving-to-spain/retire-in-spain/' },
      titles: { en: 'Retire / live without working', es: 'Jubilarse / vivir sin trabajar' },
      summaries: { en: 'For non-EU people planning to live in Spain without working, including many retirees with sufficient means.', es: 'Para personas no UE que quieren vivir en España sin trabajar, incluidos muchos jubilados con medios suficientes.' },
      aliases: ['retire in spain', 'live in spain without working', 'non lucrative visa', 'non-lucrative visa', 'retirement visa', 'jubilarme en espana', 'vivir sin trabajar', 'visado no lucrativo', 'residencia no lucrativa'],
      keywords: ['retire', 'retirement', 'lucrative', 'jubilar', 'jubilado', 'lucrativa']
    },
    {
      id: 'study',
      urls: { en: '/moving-to-spain/students/', es: '/es/moving-to-spain/students/' },
      titles: { en: 'Study in Spain', es: 'Estudiar en España' },
      summaries: { en: 'Start the student/study-stay route and distinguish applying from abroad from applying while legally in Spain.', es: 'Empieza la vía de estancia por estudios y distingue entre solicitar desde fuera o estando legalmente en España.' },
      aliases: ['student visa spain', 'study in spain', 'studying in spain', 'estudiar en espana', 'visado estudiante', 'estancia por estudios', 'soy estudiante'],
      keywords: ['student', 'study', 'estudiante', 'estudiar', 'estudios']
    },
    {
      id: 'self-employed',
      urls: { en: '/moving-to-spain/self-employed-spain/', es: '/es/moving-to-spain/self-employed-spain/' },
      titles: { en: 'Self-employed in Spain', es: 'Trabajar por cuenta propia en España' },
      summaries: { en: 'Start with the self-employed/autónomo immigration route when that is the basis for moving.', es: 'Empieza por la vía migratoria de trabajo por cuenta propia/autónomo cuando sea la base de tu mudanza.' },
      aliases: ['self employed spain', 'self-employed visa', 'autonomo visa', 'freelancer move spain', 'trabajar autonomo espana', 'cuenta propia espana', 'visado autonomo'],
      keywords: ['self', 'employed', 'autonomo', 'freelancer', 'cuenta', 'propia']
    }
  ];

  const stopWords = new Set(['i','me','my','a','an','the','to','in','for','of','and','or','do','get','want','need','is','was','as','with','how','can','que','quiero','necesito','mi','mis','un','una','el','la','los','las','de','del','en','para','por','y','o','como','hacer','tener','soy']);

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/cl@ve/g, 'clave')
      .replace(/[^a-z0-9@]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokens(value) {
    return normalize(value).split(' ').filter((token) => token.length > 1 && !stopWords.has(token));
  }

  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 2) return 3;
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        rowMin = Math.min(rowMin, cur[j]);
      }
      if (rowMin > 2) return 3;
      for (let j = 0; j < cur.length; j += 1) prev[j] = cur[j];
    }
    return prev[b.length];
  }

  function fuzzyTokenScore(queryToken, candidateToken) {
    if (queryToken === candidateToken) return 13;
    const shortest = Math.min(queryToken.length, candidateToken.length);
    if (shortest < 4) return 0;
    const distance = editDistance(queryToken, candidateToken);
    if (distance === 1) return 8;
    if (distance === 2 && shortest >= 7) return 4;
    return 0;
  }

  function scoreIntent(intent, query) {
    const q = normalize(query);
    if (!q) return 0;
    const qTokens = tokens(q);
    const aliasText = intent.aliases.map(normalize);
    const keywordTokens = [...new Set(intent.keywords.flatMap(tokens).concat(aliasText.flatMap(tokens)))];
    let score = 0;

    for (const alias of aliasText) {
      if (!alias) continue;
      if (q === alias) score = Math.max(score, 180 + Math.min(alias.length, 35));
      else if (q.includes(alias)) score = Math.max(score, 125 + Math.min(alias.length, 30));
      else if (alias.includes(q) && q.length >= 5) score = Math.max(score, 70 + Math.min(q.length, 25));
    }

    let matched = 0;
    qTokens.forEach((queryToken) => {
      let best = 0;
      keywordTokens.forEach((candidate) => { best = Math.max(best, fuzzyTokenScore(queryToken, candidate)); });
      if (best) matched += 1;
      score += best;
    });

    if (qTokens.length && matched === qTokens.length) score += 18;
    if (matched >= 2) score += 8;

    // Strong disambiguation signals.
    if (intent.id === 'tie-after-approval' && /(approv|aprob|favorable|finger|huella)/.test(q)) score += 45;
    if (intent.id === 'eu-registration' && /(green|verde|ex18)/.test(q)) score += 38;
    if (intent.id === 'nie' && /\bnie\b/.test(q) && !/(green|verde)/.test(q)) score += 45;
    if (intent.id === 'social-security' && /(nuss|social security|seguridad social)/.test(q)) score += 45;
    if (intent.id === 'driving-exchange' && /(exchange|canje|canjear|cambiar)/.test(q) && /(licen|carnet|permiso|conduc)/.test(q)) score += 42;
    if (intent.id === 'digital' && /(clave|fnmt|certificado digital|digital certificate)/.test(q)) score += 42;
    if (intent.id === 'padron' && /(padron|empadron|register.*address|ayuntamiento)/.test(q)) score += 42;
    if (intent.id === 'eu-family' && /(partner|spouse|pareja|conyuge|familiar)/.test(q) && /(non eu|no ue|eu citizen|ciudadano ue|europe)/.test(q)) score += 35;

    return score;
  }

  function match(query, lang) {
    const language = lang === 'es' ? 'es' : 'en';
    const ranked = intents
      .map((intent) => ({ intent, score: scoreIntent(intent, query) }))
      .filter((entry) => entry.score >= 18)
      .sort((a, b) => b.score - a.score || a.intent.id.localeCompare(b.intent.id));

    const top = ranked[0];
    const second = ranked[1];
    const confidence = !top ? 'none' : (top.score >= 100 || (top.score >= 45 && (!second || top.score - second.score >= 18))) ? 'high' : top.score >= 30 ? 'medium' : 'low';

    return {
      query: String(query || ''),
      lang: language,
      confidence,
      results: ranked.slice(0, 3).map(({ intent, score }) => ({
        id: intent.id,
        score,
        url: intent.urls[language],
        title: intent.titles[language],
        summary: intent.summaries[language]
      }))
    };
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function languageForElement(element) {
    if (element?.dataset?.intentLang === 'es') return 'es';
    if (element?.dataset?.intentLang === 'en') return 'en';
    if (location.pathname.startsWith('/es/')) return 'es';
    return document.documentElement.lang.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  function initElement(element) {
    const input = element.querySelector('[data-intent-input]');
    const status = element.querySelector('[data-intent-status]');
    const results = element.querySelector('[data-intent-results]');
    const examples = element.querySelector('[data-intent-examples]');
    const fallback = element.querySelector('[data-intent-fallback]');
    if (!input || !status || !results || !examples || !fallback) return;
    let lang = languageForElement(element);

    function localize(nextLang) {
      lang = nextLang === 'es' ? 'es' : 'en';
      element.dataset.intentLang = lang;
      const c = copy[lang];
      element.querySelector('[data-intent-kicker]').textContent = c.kicker;
      element.querySelector('[data-intent-title]').textContent = c.title;
      element.querySelector('[data-intent-intro]').textContent = c.intro;
      input.placeholder = c.placeholder;
      input.setAttribute('aria-label', c.label);
      element.querySelector('[data-intent-examples-label]').textContent = c.examples;
      fallback.textContent = c.all;
      examples.innerHTML = c.examplesList.map((example) => `<button type="button" data-intent-example="${escapeHtml(example)}">${escapeHtml(example)}</button>`).join('');
      render();
    }

    function render() {
      const raw = input.value.trim();
      const c = copy[lang];
      fallback.href = `/search/?q=${encodeURIComponent(raw)}`;
      if (!raw) {
        status.textContent = c.empty;
        results.innerHTML = '';
        return;
      }
      const matched = match(raw, lang);
      if (!matched.results.length || matched.confidence === 'low') {
        status.textContent = c.none;
        results.innerHTML = '';
        return;
      }
      status.textContent = c.result;
      results.innerHTML = matched.results.map((item, index) => `
        <a class="intent-discovery-result${index === 0 ? ' is-primary' : ''}" href="${item.url}" data-intent-result="${item.id}">
          <span>${index === 0 ? c.recommended : c.alternatives}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.summary)}</small>
          <b>${c.open} →</b>
        </a>`).join('');
    }

    input.addEventListener('input', render);
    examples.addEventListener('click', (event) => {
      const button = event.target.closest('[data-intent-example]');
      if (!button) return;
      input.value = button.dataset.intentExample || button.textContent || '';
      input.focus();
      render();
    });

    // The homepage has its own language switcher. Keep this component in sync without depending on app.js internals.
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => localize(button.dataset.lang === 'es' ? 'es' : 'en'));
    });

    localize(lang);
  }

  function init() {
    document.querySelectorAll('[data-iberigo-intent-discovery]').forEach(initElement);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }

  return { copy, intents, normalize, tokens, editDistance, scoreIntent, match };
});
