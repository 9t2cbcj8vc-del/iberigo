const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = 'data-iberigo-appointment-action';

const URLS = {
  immigration: 'https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus/language/es_ES',
  aeat: 'https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion',
  inss: 'https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=CPMSWACS&ORGANISMO=I',
  torrevieja: 'https://torrevieja.sedelectronica.es/citaprevia.0',
  torreviejaInfo: 'https://torrevieja.es/es/residentes-internacionales',
};

function fileFor(route) {
  return path.join(ROOT, route.replace(/^\//, ''), 'index.html');
}

function read(route) {
  const file = fileFor(route);
  if (!fs.existsSync(file)) throw new Error(`${route}: file missing`);
  return { file, html: fs.readFileSync(file, 'utf8') };
}

function write(record) {
  fs.writeFileSync(record.file, record.html);
}

function appendActionLink(route, procedureKey, label, url) {
  const record = read(route);
  if (record.html.includes(`${MARKER}="${procedureKey}"`)) return;
  const cardStart = record.html.indexOf(`data-procedure-key="${procedureKey}"`);
  if (cardStart < 0) throw new Error(`${route}: procedure card ${procedureKey} not found`);
  const linksStart = record.html.indexOf('<div class="action-first-links">', cardStart);
  if (linksStart < 0) throw new Error(`${route}: action-first links not found`);
  const linksEnd = record.html.indexOf('</div>', linksStart);
  if (linksEnd < 0) throw new Error(`${route}: action-first links end not found`);
  const anchor = `<a class="guide-button guide-button--secondary" ${MARKER}="${procedureKey}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  record.html = record.html.slice(0, linksEnd) + anchor + record.html.slice(linksEnd);
  write(record);
}

function appendSectionAction(route, ariaId, markerValue, title, text, label, url) {
  const record = read(route);
  if (record.html.includes(`${MARKER}="${markerValue}"`)) return;
  const sectionStart = record.html.indexOf(`aria-labelledby="${ariaId}"`);
  if (sectionStart < 0) throw new Error(`${route}: section ${ariaId} not found`);
  const sectionEnd = record.html.indexOf('</section>', sectionStart);
  if (sectionEnd < 0) throw new Error(`${route}: section ${ariaId} end not found`);
  const block = `<div class="guide-box guide-box--info" ${MARKER}="${markerValue}"><strong>${title}</strong><p>${text}</p><div class="guide-button-row"><a class="guide-button" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></div></div>`;
  record.html = record.html.slice(0, sectionEnd) + block + record.html.slice(sectionEnd);
  write(record);
}

function injectTorrevieja(route, lang) {
  const record = read(route);
  const markerValue = `torrevieja-padron-${lang}`;
  if (record.html.includes(`${MARKER}="${markerValue}"`)) return;
  const needle = lang === 'es'
    ? '<p>Las citas previas se agotan rápido. La disponibilidad puede ser muy limitada durante semanas. Revisa el sistema de reservas online con frecuencia y a distintas horas del día — a veces aparecen nuevas citas sin previo aviso, y hay que estar listo para reservarla en cuanto aparece.</p>'
    : '<p>Cita previa slots fill quickly. Availability can be limited for weeks at a time. Check the online booking system regularly and at different times of day — new slots are sometimes released without notice, and you need to be ready to grab one when it appears.</p>';
  if (!record.html.includes(needle)) throw new Error(`${route}: in-person appointment paragraph not found`);
  const title = lang === 'es' ? 'Reserva directamente tu cita en Torrevieja' : 'Book your Torrevieja appointment directly';
  const text = lang === 'es'
    ? 'El Ayuntamiento indica que Residentes Internacionales atiende con cita previa. En el sistema municipal selecciona Residentes Internacionales y después la oficina o ubicación que corresponda.'
    : 'Torrevieja Town Hall says International Residents is appointment-only. In the municipal booking system, select Residentes Internacionales and then the office/location that fits your case.';
  const primary = lang === 'es' ? 'Reservar cita previa' : 'Book cita previa';
  const info = lang === 'es' ? 'Ver instrucciones oficiales de Residentes Internacionales' : 'View official International Residents instructions';
  const block = `<div class="article-links" ${MARKER}="${markerValue}"><h3>${title}</h3><p>${text}</p><a href="${URLS.torrevieja}" target="_blank" rel="noopener noreferrer"><strong>${primary} →</strong></a><a href="${URLS.torreviejaInfo}" target="_blank" rel="noopener noreferrer">${info} →</a></div>`;
  record.html = record.html.replace(needle, `${needle}\n${block}`);
  write(record);
}

appendActionLink('/guides/taxes/', 'taxes-spain', 'Book an AEAT appointment', URLS.aeat);
appendActionLink('/guides/es/taxes/', 'taxes-spain', 'Reservar cita con la AEAT', URLS.aeat);
appendActionLink('/guides/social-security/', 'social-security-number', 'INSS appointment (benefits / other INSS matters)', URLS.inss);
appendActionLink('/guides/es/social-security/', 'social-security-number', 'Cita INSS (prestaciones / otras gestiones INSS)', URLS.inss);

appendSectionAction(
  '/moving-to-spain/eu-citizens/',
  'phaseTwo',
  'eu-roadmap-cita',
  'Ready to register as an EU resident?',
  'Use the official Cita Previa portal and choose the EU citizen registration procedure offered for your province. Appointment labels and availability can vary by office.',
  'Book EU registration appointment',
  URLS.immigration,
);
appendSectionAction(
  '/es/moving-to-spain/eu-citizens/',
  'phaseTwo',
  'eu-roadmap-cita-es',
  '¿Ya estás listo para registrarte como ciudadano de la UE?',
  'Usa el portal oficial de Cita Previa y selecciona el trámite de registro de ciudadano de la UE disponible en tu provincia. El nombre y la disponibilidad pueden variar por oficina.',
  'Reservar cita de registro UE',
  URLS.immigration,
);
appendSectionAction(
  '/moving-to-spain/non-eu-citizens/',
  'tieBasics',
  'non-eu-roadmap-tie-cita',
  'Already approved and ready for the TIE?',
  'Only book this after your visa, authorisation or favourable decision gives you the basis to request the card. Use the official Cita Previa portal for the fingerprint/card appointment.',
  'Book TIE / fingerprint appointment',
  URLS.immigration,
);
appendSectionAction(
  '/es/moving-to-spain/non-eu-citizens/',
  'tieBasics',
  'non-eu-roadmap-tie-cita-es',
  '¿Ya tienes la aprobación y necesitas la TIE?',
  'Reserva esta cita solo cuando tu visado, autorización o resolución favorable te permita solicitar la tarjeta. Usa el portal oficial de Cita Previa para huellas/tarjeta.',
  'Reservar cita TIE / huellas',
  URLS.immigration,
);

injectTorrevieja('/the-spain-files/padron-torrevieja/', 'en');
injectTorrevieja('/the-spain-files/es/padron-torrevieja/', 'es');

console.log('Appointment actions baked into tax, Social Security, EU/non-EU roadmaps, and Torrevieja padrón.');
