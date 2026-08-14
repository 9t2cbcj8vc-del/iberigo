const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const bundleMarker = "/* IberiGo roadmap source bundle · August 2026 */";

const official = {
  highlyQualified: "https://www.inclusion.gob.es/en/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados",
  ict: "https://prie.comercio.gob.es/es-es/Paginas/Traslado-EMpresarial.aspx",
  seasonal: "https://www.inclusion.gob.es/en/web/migraciones/w/23.-autorizacion-de-residencia-temporal-y-trabajo-para-actividades-de-temporada",
  entrepreneur: "https://prie.comercio.gob.es/es-es/Paginas/Emprendedores.aspx",
  research: "https://www.inclusion.gob.es/en/web/migraciones/w/68.-autorizacion-de-residencia-temporal-y-trabajo-para-investigacion",
  internship: "https://www.inclusion.gob.es/en/web/migraciones/w/21.-autorizacion-de-residencia-para-practicas",
  catalogue: "https://www.inclusion.gob.es/web/migraciones/listado-completo",
  studentWork: "https://ciudadaniaexterior.inclusion.gob.es/web/migraciones/w/hoja-4-bis-acceso-al-empleo-de-las-personas-titulares-de-una-autorizacion-de-estancia-de-larga-duracion-por-estudios-movilidad-de-alumnos-servicios-de-voluntariado-o-actividades-formativas"
};

function replaceReviewDate(html, es) {
  if (es) {
    return html
      .replaceAll("Última revisión: julio de 2026", "Última revisión: agosto de 2026")
      .replaceAll("Revisado por última vez: julio de 2026", "Revisado por última vez: agosto de 2026")
      .replaceAll("julio de 2026 ·", "agosto de 2026 ·");
  }
  return html
    .replaceAll("Last reviewed: July 2026", "Last reviewed: August 2026")
    .replaceAll("Reviewed: July 2026", "Reviewed: August 2026")
    .replaceAll("July 2026 ·", "August 2026 ·");
}

function bakeHomepageBundle() {
  const appPath = path.join(root, "app.js");
  const corePath = path.join(root, "scripts", "roadmap-core.js");
  const specialistPath = path.join(root, "scripts", "roadmap-specialist.js");
  const indexPath = path.join(root, "index.html");

  let app = fs.readFileSync(appPath, "utf8");
  app = replaceReviewDate(app, false)
    .replaceAll("Última revisión: julio de 2026", "Última revisión: agosto de 2026")
    .replaceAll("Revisado por última vez: julio de 2026", "Revisado por última vez: agosto de 2026");
  if (!app.includes(bundleMarker)) {
    app += `\n\n${bundleMarker}\n${fs.readFileSync(corePath, "utf8")}\n\n${fs.readFileSync(specialistPath, "utf8")}\n`;
  }
  fs.writeFileSync(appPath, app);

  let index = fs.readFileSync(indexPath, "utf8");
  index = replaceReviewDate(index, false)
    .replace(/\n\s*<script src="\/scripts\/roadmap-core\.js[^>]*><\/script>/, "")
    .replace(/\n\s*<script src="\/scripts\/roadmap-specialist\.js[^>]*><\/script>/, "")
    .replace(/app\.js\?v=[^"]+/, "app.js?v=20260814-roadmap-source");
  fs.writeFileSync(indexPath, index);
}

function read(rel) {
  const file = path.join(root, rel, "index.html");
  if (!fs.existsSync(file)) return null;
  return { file, html: fs.readFileSync(file, "utf8") };
}

function write(record) {
  fs.writeFileSync(record.file, record.html);
}

function insertAfterSection(html, ariaId, block, marker) {
  if (html.includes(`data-roadmap-static-baked="${marker}"`)) return html;
  const start = html.indexOf(`aria-labelledby="${ariaId}"`);
  if (start < 0) return html;
  const end = html.indexOf("</section>", start);
  if (end < 0) return html;
  const at = end + "</section>".length;
  return html.slice(0, at) + block.replace("<section ", `<section data-roadmap-static-baked="${marker}" `) + html.slice(at);
}

function appendToSection(html, ariaId, block, marker) {
  if (html.includes(`data-roadmap-static-baked="${marker}"`)) return html;
  const start = html.indexOf(`aria-labelledby="${ariaId}"`);
  if (start < 0) return html;
  const end = html.indexOf("</section>", start);
  if (end < 0) return html;
  return html.slice(0, end) + `<div data-roadmap-static-baked="${marker}" class="guide-box guide-box--info">${block}</div>` + html.slice(end);
}

function officialCard(href, title, text, es) {
  return `<article class="guide-info-card guide-source-card guide-source-card--government"><div class="guide-source-head"><span class="guide-source-badge" aria-hidden="true">ES</span><span class="guide-source-tag">${es ? "Fuente oficial" : "Official source"}</span></div><h3><a href="${href}" target="_blank" rel="noopener noreferrer">${title}</a></h3><p>${text}</p></article>`;
}

function specialistSection(es) {
  const title = es ? "Vías de trabajo especializado que debes comparar" : "Specialist work routes you should compare";
  const intro = es
    ? "Si tu empleo encaja en alta cualificación, traslado de empresa, temporada, investigación, emprendimiento innovador o prácticas, no des por hecho que corresponde la vía ordinaria EX-03."
    : "If your job fits highly qualified work, a company transfer, seasonal work, research, an innovative entrepreneur project or an internship, do not assume the ordinary EX-03 route is the right one.";
  const regular = es ? "Empleo ordinario" : "Ordinary Spanish employment";
  const regularText = es
    ? "Empresa española → EX-03 / Mercurio cuando corresponda → tasas → visado → Seguridad Social → TIE."
    : "Spanish employer → EX-03 / Mercurio where applicable → fees → visa → Social Security → TIE.";
  const self = es ? "Autónomo ordinario" : "Ordinary self-employment";
  const selfText = es
    ? "EX-07 → consulado español competente → tasas → visado → Seguridad Social → TIE. Un proyecto innovador puede encajar mejor en la vía de emprendedores UGE."
    : "EX-07 → competent Spanish consulate → fees → visa → Social Security → TIE. An innovative project may fit the separate UGE entrepreneur route instead.";
  return `<section class="guide-section" aria-labelledby="specialistWorkRoutes"><h2 id="specialistWorkRoutes">${title}</h2><p>${intro}</p><div class="guide-card-grid">
    ${officialCard(official.highlyQualified, es ? "Alta cualificación / Tarjeta Azul UE" : "Highly qualified / EU Blue Card", es ? "Empresa o entidad legitimada → UGE-CE → 790-038 → visado si procede → TIE." : "Employer/authorised entity → UGE-CE → 790-038 → visa if required → TIE.", es)}
    ${officialCard(official.ict, es ? "Traslado intraempresarial" : "Intra-company transfer", es ? "ICT-UE o vía nacional para traslados dentro de la misma empresa o grupo, por UGE-CE." : "EU-ICT or national route for transfers within the same company/group, through UGE-CE.", es)}
    ${officialCard(official.seasonal, es ? "Trabajo de temporada" : "Seasonal work", es ? "Empleador → EX-06 / Mercurio → tasas → visado → alta en Seguridad Social → TIE." : "Employer → EX-06 / Mercurio → fees → visa → Social Security → TIE.", es)}
    ${officialCard(official.entrepreneur, es ? "Emprendimiento innovador" : "Innovative entrepreneur", es ? "Proyecto innovador de especial interés; vía UGE/PRIE, distinta del autónomo ordinario." : "Innovative project of special economic interest; UGE/PRIE route, separate from ordinary self-employment.", es)}
    ${officialCard(official.research, es ? "Investigación / I+D+i" : "Research / R&D", es ? "Entidad de acogida → UGE-CE → 790-038 → visado si procede → TIE." : "Host entity → UGE-CE → 790-038 → visa if required → TIE.", es)}
    ${officialCard(official.internship, es ? "Prácticas" : "Internship residence", es ? "Entidad de acogida → Mercurio → 790-052 → visado si procede → TIE." : "Host entity → Mercurio → 790-052 → visa if required → TIE.", es)}
  </div><div class="guide-box guide-box--info"><strong>${regular}</strong><p>${regularText}</p></div><div class="guide-box guide-box--info"><strong>${self}</strong><p>${selfText}</p></div></section>`;
}

function bake(rel, mutator) {
  const record = read(rel);
  if (!record) return;
  const es = rel.startsWith("es/");
  record.html = replaceReviewDate(record.html, es);
  record.html = mutator ? mutator(record.html, es) : record.html;
  write(record);
}

bakeHomepageBundle();

for (const rel of ["start-here", "es/start-here"]) bake(rel);

for (const base of ["moving-to-spain", "es/moving-to-spain"]) {
  const dir = path.join(root, base);
  if (!fs.existsSync(dir)) continue;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) bake(`${base}/${entry.name}`);
  }
}

for (const rel of ["moving-to-spain/work-in-spain", "moving-to-spain/non-eu-citizens", "es/moving-to-spain/work-in-spain", "es/moving-to-spain/non-eu-citizens"]) {
  bake(rel, (html, es) => insertAfterSection(html, rel.includes("work-in-spain") ? "nonEuCitizensWorking" : "chooseYourRoute", specialistSection(es), "specialist-work"));
}

for (const rel of ["moving-to-spain/self-employed-spain", "es/moving-to-spain/self-employed-spain"]) {
  bake(rel, (html, es) => appendToSection(html, "nonEuCitizensSelfEmployment", `<strong>${es ? "Autónomo ordinario" : "Ordinary self-employment"}</strong><p>${es ? "EX-07 → consulado español competente → tasas → visado → Seguridad Social → TIE. Un proyecto innovador puede encajar mejor en la vía separada de emprendedores UGE." : "EX-07 → competent Spanish consulate → fees → visa → Social Security → TIE. An innovative project may fit the separate UGE entrepreneur route instead."}</p><p><a href="${official.entrepreneur}" target="_blank" rel="noopener noreferrer">${es ? "Compara con la vía oficial de emprendedores →" : "Compare the official entrepreneur route →"}</a></p>`, "self-route"));
}

for (const rel of ["moving-to-spain/digital-nomad-spain", "es/moving-to-spain/digital-nomad-spain"]) {
  bake(rel, (html, es) => appendToSection(html, "digitalNomadVsEmployeeVsSelfEmployed", `<strong>${es ? "Empleado remoto y profesional remoto no siguen exactamente la misma regla" : "Remote employees and remote professionals do not have exactly the same rule"}</strong><p>${es ? "Cuenta ajena: empresa fuera de España. Profesional/autónomo: puede existir actividad española dentro del límite oficial del 20 %. Desde fuera se usa el consulado; si estás legalmente en España, UGE-CE." : "Employee: employer outside Spain. Professional/self-employed: Spanish activity can be possible within the official 20% limit. Apply through the consulate from abroad or UGE-CE when legally in Spain."}</p>`, "digital-rule"));
}

for (const rel of ["moving-to-spain/students", "es/moving-to-spain/students"]) {
  bake(rel, (html, es) => appendToSection(html, "nonEuStudents", `<strong>${es ? "Dos vías de solicitud para estudios de más de 90 días" : "Two application paths for studies over 90 days"}</strong><p>${es ? "Desde fuera: consulado competente. Desde España: determinados adultos en situación regular y estudios superiores pueden presentar por Extranjería/Mercurio si cumplen los requisitos y plazos. Cuando se permite trabajar, la actividad debe ser compatible y normalmente no superar 30 horas semanales." : "From abroad: competent Spanish consulate. From Spain: qualifying adult higher-education applicants in regular status can apply through Extranjería/Mercurio if the conditions and deadlines are met. Where student work is allowed, it must remain compatible and generally stay within 30 hours per week."}</p><p><a href="${official.studentWork}" target="_blank" rel="noopener noreferrer">${es ? "Ver reglas oficiales de trabajo para estudiantes →" : "See official student-work rules →"}</a></p>`, "student-path"));
}

for (const rel of ["moving-to-spain/family-reunification", "moving-to-spain/family-member-eu-citizen", "es/moving-to-spain/family-reunification", "es/moving-to-spain/family-member-eu-citizen"]) {
  bake(rel, (html, es) => appendToSection(html, "quickAnswer", `<strong>${es ? "Si el familiar que te reúne es español, no uses automáticamente EX-19" : "If the sponsor is Spanish, do not automatically use EX-19"}</strong><p>${es ? "La vía general actual es EX-24. EX-19 puede aplicar en un caso de retorno si la persona española ejerció realmente la libre circulación en otro país UE/EEE. Comprueba esa excepción antes de presentar." : "The current general route is EX-24. EX-19 may apply to a genuine EU free-movement return case where the Spanish citizen previously exercised free-movement rights in another EU/EEA country. Check that exception before filing."}</p>`, "family-spanish"));
}

for (const rel of ["moving-to-spain/non-eu-citizens", "es/moving-to-spain/non-eu-citizens"]) {
  bake(rel, (html, es) => appendToSection(html, "chooseYourRoute", `<strong>${es ? "¿Ninguna de estas vías describe tu caso?" : "None of these routes describes your situation?"}</strong><p>${es ? "No fuerces tu situación dentro de una ruta normal. Para residencia previa, larga duración-UE, arraigo, circunstancias excepcionales, protección u otras categorías, usa el catálogo oficial completo de Migraciones." : "Do not force a special case into a normal route. For previous residence, long-term EU status, arraigo, exceptional circumstances, protection or other categories, use the complete official Migraciones catalogue."}</p><p><a href="${official.catalogue}" target="_blank" rel="noopener noreferrer">${es ? "Abrir catálogo oficial completo →" : "Open the complete official catalogue →"}</a></p>`, "special-cases"));
}

console.log("Baked August 2026 Move to Spain roadmap content into static HTML and app.js.");