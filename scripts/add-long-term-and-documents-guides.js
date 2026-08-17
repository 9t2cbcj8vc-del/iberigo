const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const REVIEW_DATE = '2026-08-17';

const URLS = {
  policeEu: 'https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php',
  euPermanent: 'https://administracion.gob.es/pag_Home/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/obtencion-residencia/residencia-permanente',
  familyPermanent: 'https://inclusion.gob.es/web/migraciones/w/63.-tarjeta-de-residencia-permanente-de-familiar-de-ciudadano-de-la-union-europea',
  familyPermanentEn: 'https://www.inclusion.gob.es/en/web/migraciones/w/63.-tarjeta-de-residencia-permanente-de-familiar-de-ciudadano-de-la-union-europea',
  longNational: 'https://www.inclusion.gob.es/en/web/migraciones/w/49.-autorizacion-de-residencia-de-larga-duracion-nacional',
  longNationalEs: 'https://www.inclusion.gob.es/web/migraciones/w/49.-autorizacion-de-residencia-de-larga-duracion-nacional',
  longEu: 'https://www.inclusion.gob.es/en/web/migraciones/w/50.-autorizacion-de-residencia-de-larga-duracion-ue',
  longEuEs: 'https://www.inclusion.gob.es/web/migraciones/w/50.-autorizacion-de-residencia-de-larga-duracion-ue',
  nationality: 'https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola',
  civilCode: 'https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763',
  legalisation: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizacion-y-apostilla.aspx',
  legalisationService: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Legalizaciones/Servicio-de-legalizaciones.aspx',
  sworn: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-Interpretes-Jurados.aspx',
  swornSearch: 'https://exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Buscador-STIJ.aspx',
  euPublicDocs: 'https://online-forms.e-justice.europa.eu/public-documents_en'
};

const pages = [
  {
    key: 'long-en', lang: 'en',
    route: '/living-in-spain/staying-long-term/', peer: '/es/living-in-spain/staying-long-term/',
    template: 'moving-to-spain/eu-registration/index.html',
    title: 'Staying in Spain Long Term: Permanent Residence & Citizenship — IberiGo',
    description: 'A practical guide to permanent residence, long-term residence and Spanish nationality after living in Spain, with different routes for EU and non-EU residents.',
    h1: 'Staying in Spain long term',
    kicker: 'Living in Spain',
    intro: 'Permanent residence and Spanish nationality are different destinations. Start from the residence regime you hold now, then follow the route that matches it.',
    asideTitle: 'Different status, different route',
    asideText: 'Five years in Spain can be an important threshold, but the procedure is not the same for an EU citizen, an EU-family member and a non-EU resident. Nationality has its own statutory residence periods.',
    breadcrumbHome: 'Living in Spain',
    breadcrumbHref: '/guides/living-in-spain/',
    body: `
      <section class="guide-section" aria-labelledby="quickAnswer"><h2 id="quickAnswer">Quick answer</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>EU, EEA or Swiss citizen</h3><p>After five years of lawful continuous residence, you normally acquire a permanent right of residence. You can request a certificate recording that permanent right using the EU-registration procedure.</p></article>
          <article class="guide-info-card"><h3>Non-EU family member under EU rules</h3><p>The usual permanent-card route is the permanent residence card for a family member of an EU citizen. The official procedure uses EX-19 and also covers specific retained-right and earlier-permanent-residence situations.</p></article>
          <article class="guide-info-card"><h3>Other non-EU resident</h3><p>Compare national long-term residence with long-term-EU residence. Both can allow indefinite residence and work in Spain, but the eligibility conditions are not identical.</p></article>
        </div>
        <div class="guide-box guide-box--warning"><strong>Permanent residence is not Spanish citizenship.</strong><p>Nationality by residence is a separate Ministry of Justice procedure with its own legal residence periods, conduct/integration requirements and documentation.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="chooseRoute"><h2 id="chooseRoute">Which long-term route fits you?</h2>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>EU / EEA / Swiss citizen</th><td>Permanent right of residence after the applicable continuous lawful-residence period. Request the permanent certificate through the EU registration route. The Police page lists EX-18 and the current 790-012 fee procedure.</td></tr>
          <tr><th>Non-EU family member under EU free-movement rules</th><td>Permanent EU-family residence card. The general five-year route uses EX-19; the official sheet also lists special cases where permanent status can arise earlier or after retaining a personal right of residence.</td></tr>
          <tr><th>Non-EU resident — national long-term</th><td>Allows indefinite residence and work in Spain under the same conditions as Spaniards. A common route is five years of legal and continuous residence, subject to the official continuity rules and other eligibility cases.</td></tr>
          <tr><th>Non-EU resident — long-term-EU</th><td>Also allows indefinite residence and work in Spain and can support later residence in another EU Member State under that state's rules. It adds route-specific conditions including fixed and regular resources and health insurance.</td></tr>
          <tr><th>Spanish nationality by residence</th><td>A separate citizenship procedure. Do not treat a permanent residence card or certificate as an automatic nationality application.</td></tr>
        </tbody></table></div>
      </section>
      <section class="guide-section" aria-labelledby="euPermanent"><h2 id="euPermanent">EU citizens and EU-family permanent residence</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>EU / EEA / Swiss permanent residence</h3><p>The normal threshold is five years of lawful continuous residence. The Police procedure says the permanent certificate is issued on request and is handled in person through the competent Oficina de Extranjería or, where applicable, the corresponding Policía Nacional office.</p></article>
          <article class="guide-info-card"><h3>Continuity matters</h3><p>Do not assume every absence breaks continuity. EU free-movement rules contain specific permitted-absence rules. Keep evidence of residence and travel history if your five-year period includes significant time outside Spain.</p></article>
          <article class="guide-info-card"><h3>Non-EU EU-family member</h3><p>The permanent family-card procedure is different from the EU citizen's certificate. Check Hoja 63 for the exact qualifying case, documents and whether you file at Extranjería/Police or electronically through Mercurio.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="nonEuLongTerm"><h2 id="nonEuLongTerm">Non-EU long-term residence: national vs long-term-EU</h2>
        <p>Both statuses are long-term residence authorisations, but they should not be treated as interchangeable. Open the official sheet for the status you want before preparing forms or evidence.</p>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>National long-term residence</h3><p>The common five-year route requires legal and continuous residence in Spain. The current official sheet uses EX-11, allows filing at the competent Oficina de Extranjería or through Mercurio when you are in Spain, and lists the current 790-052 procedure.</p></article>
          <article class="guide-info-card"><h3>Long-term-EU residence</h3><p>This status adds the possibility of seeking residence or residence-and-work status in another EU Member State under that state's conditions. The current Spanish route also requires fixed and regular resources and public or private health insurance.</p></article>
          <article class="guide-info-card"><h3>Absences are route-specific</h3><p>For the ordinary five-year calculation in the current long-term-residence sheets, permitted absence limits are defined by the regulation. Do not apply EU-citizen absence rules to a non-EU long-term-residence application, or vice versa.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="nationality"><h2 id="nationality">Spanish nationality by residence</h2>
        <p>Article 22 of the Civil Code sets different residence periods depending on the applicant's circumstances. In every case, the residence relied on must be legal, continuous and immediately prior to the application, and the applicant must meet the conduct and integration requirements.</p>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>10 years</th><td>General residence period.</td></tr>
          <tr><th>5 years</th><td>People who have obtained refugee status.</td></tr>
          <tr><th>2 years</th><td>Nationals by origin of Ibero-American countries, Andorra, the Philippines, Equatorial Guinea or Portugal, and Sephardim, as set out in the Civil Code.</td></tr>
          <tr><th>1 year</th><td>Specific cases listed in Article 22, including certain people born in Spain, certain spouses/widows or widowers of Spanish citizens, and some descendants of originally Spanish parents or grandparents.</td></tr>
        </tbody></table></div>
        <div class="guide-box guide-box--tip"><strong>Do this before counting years.</strong><p>Identify the exact legal category that gives you the shorter period, then verify that the residence you plan to count is legally qualifying and continuous. The Ministry of Justice online procedure is the filing source of truth.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="actionPlan"><h2 id="actionPlan">Your practical next steps</h2>
        <ol class="guide-timeline">
          <li><h3>1. Identify your current status</h3><p>EU citizen, EU-family card holder, ordinary non-EU resident, long-term resident, or another status.</p></li>
          <li><h3>2. Check continuity before preparing forms</h3><p>Review absences and the official route's residence-calculation rules.</p></li>
          <li><h3>3. Open the official procedure</h3><p>Use the current Police, Migraciones or Ministry of Justice page for the form, filing channel, supporting documents and current fee.</p></li>
          <li><h3>4. Keep permanent residence and nationality separate</h3><p>You may qualify for one without yet qualifying for the other.</p></li>
        </ol>
      </section>
      <section class="guide-section" aria-labelledby="officialSources"><h2 id="officialSources">Official sources</h2>
        ${sourceCards([
          ['Police', 'EU Registration Certificate / permanent right', URLS.policeEu, 'Police confirms the permanent certificate after qualifying continuous lawful residence and lists the filing location, EX-18 and 790-012.'],
          ['Spain', 'Permanent residence overview', URLS.euPermanent, 'Spain’s public-administration portal explains permanent residence for EU citizens and EU-family members.'],
          ['Migraciones', 'Permanent EU-family residence card — Hoja 63', URLS.familyPermanentEn, 'Official permanent-card requirements, EX-19, filing channels and special retained-right cases.'],
          ['Migraciones', 'National long-term residence — Hoja 49', URLS.longNational, 'Official eligibility, EX-11, Extranjería/Mercurio filing and continuity rules.'],
          ['Migraciones', 'Long-term-EU residence — Hoja 50', URLS.longEu, 'Official long-term-EU eligibility, resources/insurance requirements and procedure.'],
          ['Justice', 'Spanish nationality by residence', URLS.nationality, 'Official online nationality application and 790-026 procedure.'],
          ['BOE', 'Civil Code — Article 22', URLS.civilCode, 'Statutory residence periods and the legal, continuous and immediately-prior residence requirement.']
        ])}
      </section>`
  },
  {
    key: 'long-es', lang: 'es',
    route: '/es/living-in-spain/staying-long-term/', peer: '/living-in-spain/staying-long-term/',
    template: 'es/moving-to-spain/eu-registration/index.html',
    title: 'Vivir en España a largo plazo: residencia permanente y nacionalidad — IberiGo',
    description: 'Guía práctica sobre residencia permanente, larga duración y nacionalidad española después de vivir en España, con vías distintas para ciudadanos UE y no UE.',
    h1: 'Vivir en España a largo plazo', kicker: 'Vivir en España',
    intro: 'La residencia permanente y la nacionalidad española son destinos distintos. Empieza por el régimen de residencia que tienes ahora y sigue la vía que le corresponde.',
    asideTitle: 'Cada estatus tiene su vía',
    asideText: 'Cinco años en España pueden ser un umbral importante, pero el trámite no es igual para un ciudadano de la UE, un familiar bajo régimen UE y un residente no UE. La nacionalidad tiene sus propios plazos legales.',
    breadcrumbHome: 'Vivir en España', breadcrumbHref: '/guides/es/living-in-spain/',
    body: `
      <section class="guide-section" aria-labelledby="respuestaRapida"><h2 id="respuestaRapida">Respuesta rápida</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Ciudadano UE, EEE o Suiza</h3><p>Tras cinco años de residencia legal y continuada normalmente se adquiere el derecho de residencia permanente. Puedes solicitar un certificado que acredite ese derecho mediante el procedimiento de registro UE.</p></article>
          <article class="guide-info-card"><h3>Familiar no UE bajo régimen comunitario</h3><p>La vía habitual es la tarjeta de residencia permanente de familiar de ciudadano de la Unión. El procedimiento oficial utiliza EX-19 y también contempla supuestos especiales de mantenimiento del derecho o adquisición anticipada.</p></article>
          <article class="guide-info-card"><h3>Otro residente no UE</h3><p>Compara la residencia de larga duración nacional con la larga duración-UE. Ambas pueden permitir residir y trabajar indefinidamente en España, pero sus requisitos no son idénticos.</p></article>
        </div>
        <div class="guide-box guide-box--warning"><strong>La residencia permanente no es la nacionalidad española.</strong><p>La nacionalidad por residencia es un procedimiento separado del Ministerio de Justicia, con plazos legales, requisitos de conducta e integración y documentación propios.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="eligeVia"><h2 id="eligeVia">¿Qué vía de larga duración te corresponde?</h2>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>Ciudadano UE / EEE / Suiza</th><td>Derecho de residencia permanente tras el periodo aplicable de residencia legal y continuada. El certificado permanente se solicita mediante la vía de registro UE. Policía indica EX-18 y la tasa 790-012 vigente.</td></tr>
          <tr><th>Familiar no UE bajo libre circulación</th><td>Tarjeta permanente de familiar UE. La vía general de cinco años usa EX-19; la hoja oficial también recoge supuestos especiales de residencia permanente anticipada o mantenimiento de un derecho propio.</td></tr>
          <tr><th>Residente no UE — larga duración nacional</th><td>Autoriza a residir y trabajar en España indefinidamente en las mismas condiciones que los españoles. Una vía común son cinco años de residencia legal y continuada, sujeta a las reglas oficiales de continuidad y a otros supuestos de acceso.</td></tr>
          <tr><th>Residente no UE — larga duración-UE</th><td>También permite residencia y trabajo indefinidos en España y puede facilitar una autorización posterior en otro Estado miembro según sus propias reglas. Añade requisitos específicos como recursos fijos y regulares y seguro de enfermedad.</td></tr>
          <tr><th>Nacionalidad española por residencia</th><td>Es un procedimiento de ciudadanía separado. No confundas una tarjeta o certificado permanente con una solicitud automática de nacionalidad.</td></tr>
        </tbody></table></div>
      </section>
      <section class="guide-section" aria-labelledby="permanenteUe"><h2 id="permanenteUe">Ciudadanos UE y familiares bajo régimen UE</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Residencia permanente UE / EEE / Suiza</h3><p>El umbral general son cinco años de residencia legal y continuada. La Policía indica que el certificado permanente se expide a petición del interesado y se tramita presencialmente ante la Oficina de Extranjería competente o, en su defecto, la comisaría correspondiente.</p></article>
          <article class="guide-info-card"><h3>La continuidad importa</h3><p>No toda ausencia interrumpe automáticamente el periodo. Las normas de libre circulación contienen reglas específicas sobre ausencias permitidas. Conserva pruebas de residencia y viajes si tu periodo incluye ausencias relevantes.</p></article>
          <article class="guide-info-card"><h3>Familiar no UE</h3><p>La tarjeta permanente de familiar UE no es el certificado del ciudadano UE. Revisa la Hoja 63 para identificar tu supuesto exacto, la documentación y si presentas en Extranjería/Policía o telemáticamente por Mercurio.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="largaDuracion"><h2 id="largaDuracion">No UE: larga duración nacional frente a larga duración-UE</h2>
        <p>Ambos son estatus de larga duración, pero no deben tratarse como equivalentes. Abre la hoja oficial de la autorización que quieres antes de preparar formularios o pruebas.</p>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Larga duración nacional</h3><p>La vía habitual de cinco años exige residencia legal y continuada en España. La hoja vigente utiliza EX-11, permite presentar en la Oficina de Extranjería competente o por Mercurio si estás en España e indica la tasa 790-052 vigente.</p></article>
          <article class="guide-info-card"><h3>Larga duración-UE</h3><p>Añade la posibilidad de obtener posteriormente residencia o residencia y trabajo en otro Estado miembro según las condiciones de ese país. La vía española vigente también exige recursos fijos y regulares y seguro de enfermedad público o privado.</p></article>
          <article class="guide-info-card"><h3>Ausencias según la vía</h3><p>Los límites de ausencia para calcular los cinco años están definidos por cada régimen. No apliques las reglas de ausencia de ciudadanos UE a una solicitud de larga duración no UE, ni al revés.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="nacionalidad"><h2 id="nacionalidad">Nacionalidad española por residencia</h2>
        <p>El artículo 22 del Código Civil establece distintos plazos según las circunstancias. En todos los casos, la residencia utilizada debe ser legal, continuada e inmediatamente anterior a la solicitud, y deben cumplirse los requisitos de buena conducta cívica e integración.</p>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>10 años</th><td>Plazo general.</td></tr>
          <tr><th>5 años</th><td>Personas que hayan obtenido la condición de refugiado.</td></tr>
          <tr><th>2 años</th><td>Nacionales de origen de países iberoamericanos, Andorra, Filipinas, Guinea Ecuatorial o Portugal, y sefardíes, conforme al Código Civil.</td></tr>
          <tr><th>1 año</th><td>Supuestos concretos del artículo 22, entre ellos determinadas personas nacidas en España, ciertos cónyuges o viudos de españoles y algunos descendientes de padre, madre, abuelo o abuela originariamente españoles.</td></tr>
        </tbody></table></div>
        <div class="guide-box guide-box--tip"><strong>Haz esto antes de contar años.</strong><p>Identifica la categoría jurídica exacta que te permite un plazo reducido y verifica que la residencia que quieres computar sea legal y continuada. La sede del Ministerio de Justicia es la referencia para la presentación.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="planAccion"><h2 id="planAccion">Tus próximos pasos</h2>
        <ol class="guide-timeline">
          <li><h3>1. Identifica tu estatus actual</h3><p>Ciudadano UE, titular de tarjeta de familiar UE, residente no UE ordinario, residente de larga duración u otro estatus.</p></li>
          <li><h3>2. Comprueba la continuidad</h3><p>Revisa ausencias y las reglas de cómputo de residencia de tu procedimiento concreto.</p></li>
          <li><h3>3. Abre el procedimiento oficial</h3><p>Usa la página vigente de Policía, Migraciones o Justicia para formulario, canal de presentación, documentos y tasa actual.</p></li>
          <li><h3>4. Separa residencia permanente y nacionalidad</h3><p>Puedes cumplir los requisitos de una sin cumplir todavía los de la otra.</p></li>
        </ol>
      </section>
      <section class="guide-section" aria-labelledby="fuentesOficiales"><h2 id="fuentesOficiales">Fuentes oficiales</h2>
        ${sourceCards([
          ['Policía', 'Certificado de registro UE / derecho permanente', URLS.policeEu, 'Policía confirma el certificado permanente tras la residencia legal continuada aplicable y publica lugar, EX-18 y 790-012.'],
          ['España', 'Resumen de residencia permanente', URLS.euPermanent, 'El Punto de Acceso General explica la residencia permanente de ciudadanos UE y familiares.'],
          ['Migraciones', 'Tarjeta permanente de familiar UE — Hoja 63', URLS.familyPermanent, 'Requisitos oficiales, EX-19, canales de presentación y supuestos especiales.'],
          ['Migraciones', 'Larga duración nacional — Hoja 49', URLS.longNationalEs, 'Requisitos, EX-11, presentación en Extranjería/Mercurio y reglas de continuidad.'],
          ['Migraciones', 'Larga duración-UE — Hoja 50', URLS.longEuEs, 'Requisitos de larga duración-UE, recursos/seguro y procedimiento.'],
          ['Justicia', 'Nacionalidad española por residencia', URLS.nationality, 'Solicitud oficial en línea y procedimiento 790-026.'],
          ['BOE', 'Código Civil — artículo 22', URLS.civilCode, 'Plazos legales y requisito de residencia legal, continuada e inmediatamente anterior.']
        ], 'es')}
      </section>`
  },
  {
    key: 'docs-en', lang: 'en',
    route: '/moving-to-spain/documents-apostilles-translations/', peer: '/es/moving-to-spain/documents-apostilles-translations/',
    template: 'moving-to-spain/eu-registration/index.html',
    title: 'Documents, Apostilles & Sworn Translations for Spain — IberiGo',
    description: 'Prepare foreign documents for Spanish procedures: when to check for an EU exemption, Hague apostille, diplomatic legalisation, sworn translation, originals and copies.',
    h1: 'Documents, apostilles & sworn translations', kicker: 'Moving to Spain',
    intro: 'Do not apostille every document by default. First identify the document, the country that issued it, the Spanish procedure receiving it and whether an exemption applies.',
    asideTitle: 'Prepare in the right order',
    asideText: 'Apostille, diplomatic legalisation and sworn translation solve different problems. The receiving authority’s current procedure decides what your document actually needs.',
    breadcrumbHome: 'Move to Spain', breadcrumbHref: '/moving-to-spain/documents-checklist/',
    body: `
      <section class="guide-section" aria-labelledby="quickAnswer"><h2 id="quickAnswer">Quick answer</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>1. Check for an exemption</h3><p>Certain public documents moving between EU Member States fall within Regulation (EU) 2016/1191, which removes the apostille requirement for documents within its scope and simplifies some translation formalities.</p></article>
          <article class="guide-info-card"><h3>2. If Hague applies, use an apostille</h3><p>For documents within the Hague Apostille Convention, the apostille replaces diplomatic legalisation. Check the issuing country, the document type and the receiving procedure.</p></article>
          <article class="guide-info-card"><h3>3. If no exemption or apostille route applies</h3><p>Diplomatic legalisation may be required. The exact chain depends on the document and issuing country, so use the Foreign Ministry procedure rather than a generic checklist.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="decisionFlow"><h2 id="decisionFlow">The five questions to ask for every foreign document</h2>
        <ol class="guide-timeline">
          <li><h3>1. Is this the exact document the Spanish procedure asks for?</h3><p>Start with the official immigration, civil-registry, nationality or other procedure. Do not order certificates simply because they are commonly requested elsewhere.</p></li>
          <li><h3>2. Is it a public document, and where was it issued?</h3><p>Apostille and diplomatic legalisation primarily concern public documents and authentic public copies. Private documents may need a different route.</p></li>
          <li><h3>3. Is there an EU or treaty exemption?</h3><p>If a relevant exemption applies, you may not need an apostille or diplomatic legalisation at all.</p></li>
          <li><h3>4. If not exempt, is the Hague Apostille Convention the correct route?</h3><p>If so, obtain the apostille from the competent authority connected with the issuing country/document.</p></li>
          <li><h3>5. Does the receiving authority require Spanish or an official translation?</h3><p>Legalisation and translation are separate questions. A correctly apostilled document can still need an official translation.</p></li>
        </ol>
      </section>
      <section class="guide-section" aria-labelledby="apostilleLegalisation"><h2 id="apostilleLegalisation">Apostille vs diplomatic legalisation</h2>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>Apostille</th><td>A simplified authentication used between states participating in the Hague Apostille Convention for documents within its scope. It replaces the diplomatic-legalisation chain; it does not certify the truth of the document's contents.</td></tr>
          <tr><th>Diplomatic legalisation</th><td>The alternative authentication chain used when the relevant document is not exempt and the Hague apostille route does not apply. Spain's Foreign Ministry publishes the current route by document and country.</td></tr>
          <tr><th>EU public-document exemption</th><td>Regulation (EU) 2016/1191 removes apostille/legalisation for specified public documents moving between EU Member States. It does not mean every document from every EU country is automatically exempt.</td></tr>
        </tbody></table></div>
        <div class="guide-box guide-box--warning"><strong>An apostille is not an expiry extension.</strong><p>The Foreign Ministry notes that legalisation itself does not extend a document's own validity period. If the Spanish procedure requires a recently issued certificate, follow that procedure's rule.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="translation"><h2 id="translation">Sworn translations for Spain</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Spanish sworn translators</h3><p>Translations made by sworn translators appointed by Spain's Ministry of Foreign Affairs have official character. The Ministry publishes a searchable list of appointed translators and interpreters.</p></article>
          <article class="guide-info-card"><h3>EU documents can be different</h3><p>Within Regulation (EU) 2016/1191, multilingual standard forms can assist translation and qualifying sworn translations from another Member State can have simplified treatment. Check whether your exact document is inside the Regulation's scope.</p></article>
          <article class="guide-info-card"><h3>Translate the final authenticated document</h3><p>Where both authentication and translation are required, make sure the translation covers the complete document as the receiving authority expects, including the apostille/legalisation material where relevant.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="commonDocs"><h2 id="commonDocs">Common documents that need route-specific checking</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Birth and marriage certificates</h3><p>Frequently used for family, civil-registry and nationality procedures. Check whether an EU public-document exemption or multilingual form applies before arranging an apostille.</p></article>
          <article class="guide-info-card"><h3>Criminal-record certificates</h3><p>Many non-EU residence and nationality procedures use criminal-record evidence, but the countries, look-back period and recency requirements vary by procedure. Follow the exact official sheet.</p></article>
          <article class="guide-info-card"><h3>Qualifications and professional documents</h3><p>Academic or professional recognition can use its own authentication and translation requirements. Do not assume immigration-document rules automatically cover recognition of qualifications.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="copiesValidity"><h2 id="copiesValidity">Originals, copies and document age</h2>
        <p>There is no useful single rule such as “all certificates must be less than three months old.” Recency is procedure-specific. Many current Migraciones sheets state that copies are generally submitted while originals are shown, but you must follow the instructions for the exact procedure and filing channel.</p>
        <div class="guide-box guide-box--tip"><strong>Safer document workflow</strong><p>Download the current official procedure → list only the certificates it asks for → obtain the correct version → authenticate only if required → translate if required → make filing copies → keep the originals ready for presentation.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="mistakes"><h2 id="mistakes">Common mistakes</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Apostilling everything</h3><p>This wastes time and money and can be unnecessary where an EU/treaty exemption applies.</p></article>
          <article class="guide-info-card"><h3>Translating too early</h3><p>If the final authenticated version changes or adds an apostille/legalisation page, an earlier translation may not match what the authority expects.</p></article>
          <article class="guide-info-card"><h3>Using a generic validity period</h3><p>A certificate can be valid as a document but still be too old for a specific Spanish procedure. Check the receiving authority's current instruction.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="officialSources"><h2 id="officialSources">Official sources</h2>
        ${sourceCards([
          ['Foreign Ministry', 'Legalisation and apostille', URLS.legalisation, 'Spain’s official explanation of diplomatic legalisation, Hague apostille, exemptions and official translations.'],
          ['Foreign Ministry', 'Legalisation service', URLS.legalisationService, 'Practical checks before requesting diplomatic legalisation and current service channels.'],
          ['Foreign Ministry', 'Sworn translators and interpreters', URLS.sworn, 'Official status of sworn translations in Spain.'],
          ['Foreign Ministry', 'Search appointed sworn translators', URLS.swornSearch, 'Official searchable register by language, country/province and appointment type.'],
          ['EU e-Justice', 'Public documents in the EU', URLS.euPublicDocs, 'Regulation (EU) 2016/1191: apostille exemption and multilingual forms for public documents within scope.']
        ])}
      </section>`
  },
  {
    key: 'docs-es', lang: 'es',
    route: '/es/moving-to-spain/documents-apostilles-translations/', peer: '/moving-to-spain/documents-apostilles-translations/',
    template: 'es/moving-to-spain/eu-registration/index.html',
    title: 'Documentos, apostillas y traducciones juradas para España — IberiGo',
    description: 'Prepara documentos extranjeros para trámites españoles: exenciones UE, Apostilla de La Haya, legalización diplomática, traducción jurada, originales y copias.',
    h1: 'Documentos, apostillas y traducciones juradas', kicker: 'Mudarse a España',
    intro: 'No apostilles todos los documentos por defecto. Primero identifica el documento, el país que lo expidió, el trámite español que lo recibe y si existe alguna exención.',
    asideTitle: 'Prepara en el orden correcto',
    asideText: 'La apostilla, la legalización diplomática y la traducción jurada resuelven problemas distintos. El procedimiento vigente de la administración receptora determina qué necesita tu documento.',
    breadcrumbHome: 'Mudarse a España', breadcrumbHref: '/es/moving-to-spain/documents-checklist/',
    body: `
      <section class="guide-section" aria-labelledby="respuestaRapida"><h2 id="respuestaRapida">Respuesta rápida</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>1. Comprueba si existe una exención</h3><p>Determinados documentos públicos que circulan entre Estados miembros están cubiertos por el Reglamento (UE) 2016/1191, que elimina la apostilla dentro de su ámbito y simplifica algunas formalidades de traducción.</p></article>
          <article class="guide-info-card"><h3>2. Si se aplica La Haya, usa apostilla</h3><p>Para documentos incluidos en el Convenio de la Apostilla de La Haya, la apostilla sustituye la legalización diplomática. Comprueba país emisor, tipo de documento y trámite receptor.</p></article>
          <article class="guide-info-card"><h3>3. Si no hay exención ni vía de apostilla</h3><p>Puede corresponder la legalización diplomática. La cadena concreta depende del documento y del país emisor, así que utiliza el procedimiento del Ministerio de Exteriores.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="flujoDecision"><h2 id="flujoDecision">Las cinco preguntas para cada documento extranjero</h2>
        <ol class="guide-timeline">
          <li><h3>1. ¿Es exactamente el documento que pide el trámite?</h3><p>Empieza por la hoja oficial de Extranjería, Registro Civil, nacionalidad u otro procedimiento. No solicites certificados solo porque sean habituales en otros trámites.</p></li>
          <li><h3>2. ¿Es un documento público y dónde se expidió?</h3><p>La apostilla y la legalización diplomática se refieren principalmente a documentos públicos y copias auténticas. Los documentos privados pueden seguir otra vía.</p></li>
          <li><h3>3. ¿Existe una exención de la UE o de un convenio?</h3><p>Si se aplica una exención, quizá no necesites ni apostilla ni legalización diplomática.</p></li>
          <li><h3>4. Si no está exento, ¿corresponde la Apostilla de La Haya?</h3><p>Si corresponde, obtén la apostilla de la autoridad competente vinculada al país/documento emisor.</p></li>
          <li><h3>5. ¿La administración receptora exige castellano o traducción oficial?</h3><p>Legalización y traducción son preguntas distintas. Un documento correctamente apostillado todavía puede necesitar traducción oficial.</p></li>
        </ol>
      </section>
      <section class="guide-section" aria-labelledby="apostillaLegalizacion"><h2 id="apostillaLegalizacion">Apostilla frente a legalización diplomática</h2>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>Apostilla</th><td>Autenticación simplificada entre Estados parte del Convenio de La Haya para documentos dentro de su ámbito. Sustituye la cadena de legalización diplomática; no certifica la veracidad del contenido del documento.</td></tr>
          <tr><th>Legalización diplomática</th><td>Cadena alternativa de autenticación cuando el documento no está exento y no se aplica la vía de apostilla. Exteriores publica el procedimiento vigente según documento y país.</td></tr>
          <tr><th>Exención de documentos públicos UE</th><td>El Reglamento (UE) 2016/1191 elimina apostilla/legalización para determinados documentos públicos que circulan entre Estados miembros. No significa que cualquier documento de cualquier país UE esté exento automáticamente.</td></tr>
        </tbody></table></div>
        <div class="guide-box guide-box--warning"><strong>La apostilla no alarga la vigencia del certificado.</strong><p>Exteriores recuerda que la legalización no amplía el plazo de validez propio del documento. Si el trámite español exige un certificado reciente, sigue la regla de ese trámite.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="traduccion"><h2 id="traduccion">Traducciones juradas para España</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Traductores jurados españoles</h3><p>Las traducciones realizadas por traductores jurados nombrados por el Ministerio de Asuntos Exteriores tienen carácter oficial. El Ministerio publica un buscador de traductores e intérpretes jurados habilitados.</p></article>
          <article class="guide-info-card"><h3>Los documentos UE pueden ser distintos</h3><p>Dentro del Reglamento (UE) 2016/1191, los impresos estándar multilingües pueden servir de ayuda a la traducción y ciertas traducciones juradas de otro Estado miembro tienen tratamiento simplificado. Comprueba si tu documento está dentro del ámbito del Reglamento.</p></article>
          <article class="guide-info-card"><h3>Traduce la versión final autenticada</h3><p>Cuando se exijan autenticación y traducción, asegúrate de que la traducción cubra el documento completo como lo espera la administración, incluida la apostilla o legalización cuando proceda.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="documentosComunes"><h2 id="documentosComunes">Documentos comunes que requieren comprobación específica</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Certificados de nacimiento y matrimonio</h3><p>Se utilizan con frecuencia en familia, Registro Civil y nacionalidad. Comprueba si existe exención UE o impreso multilingüe antes de tramitar una apostilla.</p></article>
          <article class="guide-info-card"><h3>Certificados de antecedentes penales</h3><p>Muchos procedimientos de residencia no UE y nacionalidad utilizan antecedentes, pero países, periodo de referencia y antigüedad admitida varían según el trámite. Sigue la hoja oficial exacta.</p></article>
          <article class="guide-info-card"><h3>Títulos y documentos profesionales</h3><p>El reconocimiento académico o profesional puede tener sus propias reglas de autenticación y traducción. No presupongas que las reglas de Extranjería sirven automáticamente para homologaciones.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="originalesCopias"><h2 id="originalesCopias">Originales, copias y antigüedad del documento</h2>
        <p>No existe una regla útil del tipo “todos los certificados deben tener menos de tres meses”. La antigüedad admisible depende del procedimiento. Muchas hojas vigentes de Migraciones indican con carácter general que se aportan copias y se exhiben originales, pero debes seguir las instrucciones de tu trámite y canal de presentación concretos.</p>
        <div class="guide-box guide-box--tip"><strong>Flujo de preparación más seguro</strong><p>Descarga el procedimiento oficial vigente → apunta solo los certificados que pide → consigue la versión correcta → autentica únicamente si corresponde → traduce si corresponde → prepara copias para presentar → conserva los originales disponibles.</p></div>
      </section>
      <section class="guide-section" aria-labelledby="errores"><h2 id="errores">Errores frecuentes</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Apostillarlo todo</h3><p>Puede hacerte perder tiempo y dinero y ser innecesario cuando existe una exención de la UE o de un convenio.</p></article>
          <article class="guide-info-card"><h3>Traducir demasiado pronto</h3><p>Si la versión final añade apostilla o legalización, una traducción anterior puede no corresponder al documento que la administración espera.</p></article>
          <article class="guide-info-card"><h3>Usar una caducidad genérica</h3><p>Un certificado puede seguir siendo válido como documento pero ser demasiado antiguo para un trámite español concreto. Comprueba la instrucción de la administración receptora.</p></article>
        </div>
      </section>
      <section class="guide-section" aria-labelledby="fuentesOficiales"><h2 id="fuentesOficiales">Fuentes oficiales</h2>
        ${sourceCards([
          ['Exteriores', 'Legalización y apostilla', URLS.legalisation, 'Explicación oficial de legalización diplomática, Apostilla de La Haya, exenciones y traducciones oficiales.'],
          ['Exteriores', 'Servicio de legalizaciones', URLS.legalisationService, 'Comprobaciones prácticas antes de legalizar y canales vigentes del servicio.'],
          ['Exteriores', 'Traductores e intérpretes jurados', URLS.sworn, 'Carácter oficial de las traducciones juradas en España.'],
          ['Exteriores', 'Buscador de traductores jurados', URLS.swornSearch, 'Registro oficial consultable por idioma, país/provincia y tipo de título.'],
          ['UE e-Justice', 'Documentos públicos en la UE', URLS.euPublicDocs, 'Reglamento (UE) 2016/1191: exención de apostilla y formularios multilingües para documentos dentro de su ámbito.']
        ], 'es')}
      </section>`
  }
];

function sourceCards(items, lang = 'en') {
  return `<div class="guide-card-grid">${items.map(([tag, title, href, description]) => `
    <article class="guide-info-card guide-source-card guide-source-card--government">
      <div class="guide-source-head"><span class="guide-source-badge">${escapeHtml(tag.slice(0, 2).toUpperCase())}</span><span class="guide-source-tag">${escapeHtml(tag)}</span></div>
      <h3><a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></h3>
      <p>${escapeHtml(description)}</p>
      <a class="guide-button guide-button--secondary" href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Abrir fuente oficial' : 'Open official source'}</a>
    </article>`).join('')}</div>`;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(value) { return escapeHtml(value); }

function mainHtml(page) {
  const homeLabel = page.lang === 'es' ? 'Inicio' : 'Home';
  const infoTitle = page.lang === 'es' ? 'Antes de presentar' : 'Before you file';
  const infoText = page.lang === 'es'
    ? 'IberiGo explica el proceso de forma práctica. Verifica siempre la hoja oficial vigente de tu procedimiento antes de presentar una solicitud.'
    : 'IberiGo explains the process in practical terms. Always verify the current official procedure sheet before filing an application.';
  return `<main class="guide-main">
    <nav class="guide-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">${homeLabel}</a></li><li><a href="${page.breadcrumbHref}">${page.breadcrumbHome}</a></li><li>${escapeHtml(page.h1)}</li></ol></nav>
    <div class="guide-layout guide-layout--single"><div class="guide-content">
      <section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle">
        <div><span class="guide-kicker">${escapeHtml(page.kicker)}</span><h1 id="pageTitle">${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p></div>
        <aside class="guide-hero-card" aria-label="${escapeAttr(infoTitle)}"><strong>${escapeHtml(page.asideTitle)}</strong><p>${escapeHtml(page.asideText)}</p></aside>
      </section>
      ${page.body}
      <section class="guide-section" aria-labelledby="verifyCurrent"><h2 id="verifyCurrent">${escapeHtml(infoTitle)}</h2><div class="guide-box guide-box--info"><p>${escapeHtml(infoText)}</p></div></section>
    </div></div>
  </main>`;
}

function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`Could not find ${label}`);
  return html.replace(regex, replacement);
}

function renderPage(page) {
  const templatePath = path.join(root, page.template);
  let html = fs.readFileSync(templatePath, 'utf8');
  const enRoute = page.lang === 'en' ? page.route : page.peer;
  const esRoute = page.lang === 'es' ? page.route : page.peer;
  const canonical = `https://iberigo.eu${page.route}`;
  html = replaceTag(html, /<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`, 'title');
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeAttr(page.description)}" />`, 'description');
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`, 'canonical');
  html = replaceTag(html, /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="en" href="https://iberigo.eu${enRoute}" />`, 'hreflang en');
  html = replaceTag(html, /<link rel="alternate" hreflang="es" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="es" href="https://iberigo.eu${esRoute}" />`, 'hreflang es');
  html = replaceTag(html, /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="x-default" href="https://iberigo.eu${enRoute}" />`, 'hreflang x-default');
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeAttr(page.title)}" />`, 'og title');
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeAttr(page.description)}" />`, 'og description');
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`, 'og url');
  html = replaceTag(html, /<main class="guide-main">[\s\S]*?<\/main>/i, mainHtml(page), 'main');
  const output = path.join(root, page.route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
  console.log(`[new-guides] wrote ${page.route}`);
}

function injectHubCards() {
  const configs = [
    {
      file: 'guides/living-in-spain/index.html',
      marker: '<section class="guide-section" aria-labelledby="documentsAndAdmin"><h2 id="documentsAndAdmin">Documents and admin</h2><div class="guide-card-grid">',
      sentinel: '/living-in-spain/staying-long-term/',
      cards: `<article class="guide-info-card"><h3>Staying in Spain long term</h3><p>Permanent residence, long-term residence and Spanish nationality — choose the route that matches your current status.</p><a class="guide-button guide-button--secondary" href="/living-in-spain/staying-long-term/">View guide</a></article><article class="guide-info-card"><h3>Documents, apostilles & sworn translations</h3><p>Check whether a foreign document needs an EU exemption, apostille, legalisation or sworn translation before filing.</p><a class="guide-button guide-button--secondary" href="/moving-to-spain/documents-apostilles-translations/">View guide</a></article>`
    },
    {
      file: 'guides/es/living-in-spain/index.html',
      marker: '<section class="guide-section" aria-labelledby="documentosYTramites"><h2 id="documentosYTramites">Documentos y trámites</h2><div class="guide-card-grid">',
      sentinel: '/es/living-in-spain/staying-long-term/',
      cards: `<article class="guide-info-card"><h3>Vivir en España a largo plazo</h3><p>Residencia permanente, larga duración y nacionalidad española: elige la vía según tu estatus actual.</p><a class="guide-button guide-button--secondary" href="/es/living-in-spain/staying-long-term/">Ver guía</a></article><article class="guide-info-card"><h3>Documentos, apostillas y traducciones juradas</h3><p>Comprueba si un documento extranjero necesita exención UE, apostilla, legalización o traducción jurada antes de presentar.</p><a class="guide-button guide-button--secondary" href="/es/moving-to-spain/documents-apostilles-translations/">Ver guía</a></article>`
    }
  ];
  for (const cfg of configs) {
    const file = path.join(root, cfg.file);
    let html = fs.readFileSync(file, 'utf8');
    if (html.includes(cfg.sentinel)) continue;
    if (!html.includes(cfg.marker)) throw new Error(`Hub marker missing in ${cfg.file}`);
    html = html.replace(cfg.marker, cfg.marker + cfg.cards);
    fs.writeFileSync(file, html);
    console.log(`[new-guides] linked guides from ${cfg.file}`);
  }
}

function updateSearchIndex() {
  const file = path.join(root, 'search-index.json');
  let entries = JSON.parse(fs.readFileSync(file, 'utf8'));
  const urls = new Set(pages.map((p) => p.route));
  entries = entries.filter((entry) => !urls.has(entry.url));
  for (const page of pages) {
    const isLong = page.key.startsWith('long');
    entries.push({
      title: page.title.replace(/ — IberiGo$/, ''),
      description: page.description,
      url: page.route,
      language: page.lang,
      type: 'guide',
      headings: isLong
        ? (page.lang === 'es' ? ['Vivir en España a largo plazo', '¿Qué vía de larga duración te corresponde?', 'Ciudadanos UE y familiares bajo régimen UE', 'No UE: larga duración nacional frente a larga duración-UE', 'Nacionalidad española por residencia', 'Tus próximos pasos'] : ['Staying in Spain long term', 'Which long-term route fits you?', 'EU citizens and EU-family permanent residence', 'Non-EU long-term residence: national vs long-term-EU', 'Spanish nationality by residence', 'Your practical next steps'])
        : (page.lang === 'es' ? ['Documentos, apostillas y traducciones juradas', 'Las cinco preguntas para cada documento extranjero', 'Apostilla frente a legalización diplomática', 'Traducciones juradas para España', 'Originales, copias y antigüedad del documento'] : ['Documents, apostilles & sworn translations', 'The five questions to ask for every foreign document', 'Apostille vs diplomatic legalisation', 'Sworn translations for Spain', 'Originals, copies and document age']),
      keywords: isLong
        ? (page.lang === 'es' ? ['residencia permanente', 'larga duración', 'larga duración UE', 'nacionalidad española', 'cinco años', 'EX-11', 'EX-19'] : ['permanent residence', 'long-term residence', 'long-term EU', 'Spanish citizenship', 'five years', 'EX-11', 'EX-19'])
        : (page.lang === 'es' ? ['apostilla', 'legalización', 'traducción jurada', 'documentos extranjeros', 'certificado nacimiento', 'antecedentes penales'] : ['apostille', 'legalisation', 'sworn translation', 'foreign documents', 'birth certificate', 'criminal record']),
      text: `${page.h1}. ${page.intro} ${page.description}`
    });
  }
  fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n');
  console.log('[new-guides] updated search-index.json');
}

function updateSitemap(filename) {
  const file = path.join(root, filename);
  let xml = fs.readFileSync(file, 'utf8');
  for (const page of pages) {
    const loc = `https://iberigo.eu${page.route}`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>${REVIEW_DATE}</lastmod>\n  </url>\n`;
    if (!xml.includes('</urlset>')) throw new Error(`${filename} is not a urlset`);
    xml = xml.replace('</urlset>', entry + '</urlset>');
  }
  fs.writeFileSync(file, xml);
  console.log(`[new-guides] updated ${filename}`);
}

for (const page of pages) renderPage(page);
injectHubCards();
updateSearchIndex();
updateSitemap('sitemap.xml');
updateSitemap('sitemap-pages.xml');
console.log('[new-guides] long-term and document-preparation clusters ready');
