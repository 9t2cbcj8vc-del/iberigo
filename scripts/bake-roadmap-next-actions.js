const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "app.js");
const sourcePath = path.join(root, "scripts", "roadmap-next-actions.js");
const legalCurrentPath = path.join(root, "scripts", "roadmap-legal-current.js");
const marker = "/* IberiGo roadmap full next-actions upgrade · August 2026 */";
const assetVersion = "20260816-roadmap-next-actions-3";
const ignoredDirs = new Set([".git", "node_modules"]);

let app = fs.readFileSync(appPath, "utf8");
if (!app.includes(marker)) {
  app += `\n\n${marker}\n${fs.readFileSync(sourcePath, "utf8")}\n\n${fs.readFileSync(legalCurrentPath, "utf8")}\n`;
  fs.writeFileSync(appPath, app);
}

function applyLegalStaticCorrections(file, html) {
  const normalized = file.split(path.sep).join("/");
  if (normalized.endsWith("/guides/family/index.html")) {
    html = html
      .replace(
        "The Spain-based sponsor normally needs to have held legal residence for at least one year and have at least one more year of validity remaining on their own authorization, and must show housing and income that meet the threshold for the family size being reunited.",
        "The Spain-based sponsor normally needs to have lived legally in Spain for at least one year and have requested authorization to reside for at least another year, subject to the official exceptions. The sponsor must also show adequate housing, sufficient regular means and health insurance for the sponsor and the family members being reunited."
      )
      .replace(
        "Typically the sponsor's spouse or registered partner, minor children, and in some cases dependent parents can be included; each relationship has to be documented.",
        "Qualifying relatives can include a spouse or partner — including a properly proven stable unregistered partner where the official conditions are met — children and represented persons in the stated categories, and certain dependent ascendants or other specifically listed relatives."
      )
      .replace(
        "Prepare family relationship evidence, sponsor residence documents, housing and economic means.",
        "Prepare family relationship evidence, sponsor residence or renewal documents, adequate-housing evidence, sufficient economic means and health insurance for the sponsor and family members being reunited."
      );
  }
  if (normalized.endsWith("/guides/es/family/index.html")) {
    html = html
      .replace(
        "El residente en España normalmente debe haber tenido residencia legal durante al menos un año y contar con al menos otro año de validez en su propia autorización, además de demostrar vivienda y medios económicos suficientes para el tamaño de la familia que va a reagrupar.",
        "La persona reagrupante normalmente debe haber residido legalmente en España al menos un año y haber solicitado autorización para residir durante al menos otro año, con las excepciones previstas oficialmente. También debe acreditar vivienda adecuada, medios económicos fijos y regulares suficientes y seguro de enfermedad para sí misma y los familiares reagrupados."
      )
      .replace(
        "Suelen poder incluirse el cónyuge o pareja registrada, los hijos menores y, en algunos casos, los ascendientes dependientes; cada vínculo debe quedar documentado.",
        "Pueden incluirse, según el supuesto, el cónyuge o pareja — incluida una pareja estable no registrada debidamente acreditada cuando se cumplan las condiciones oficiales —, hijos y personas representadas en las categorías previstas, y determinados ascendientes dependientes u otros familiares expresamente contemplados."
      )
      .replace(
        "Prepara prueba del vínculo familiar, documentos de residencia del reagrupante, vivienda y medios económicos.",
        "Prepara prueba del vínculo familiar, residencia o renovación del reagrupante, vivienda adecuada, medios económicos suficientes y seguro de enfermedad para el reagrupante y los familiares reagrupados."
      );
  }
  return html;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) updateHtml(path.join(dir, entry.name));
  }
}

function updateHtml(file) {
  let html = fs.readFileSync(file, "utf8");
  html = applyLegalStaticCorrections(file, html);
  if (html.includes("app.js")) {
    html = html.replace(/(src=["'](?:\/)?app\.js\?v=)[^"']+/g, `$1${assetVersion}`);
  }
  fs.writeFileSync(file, html);
}

walk(root);
console.log(`[roadmap-next-actions] bundled upgrade + current legal route corrections and set app.js cache key ${assetVersion}.`);
