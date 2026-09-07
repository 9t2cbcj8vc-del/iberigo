const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REVIEW_DATE = '2026-09-07';

const URLS = {
  validForeign: 'https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/permisos-validos-para-conducir-en-espana/',
  agreements: 'https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/canjes-de-permisos/paises-con-convenio-de-canjes/',
  exchange: 'https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/',
  euRenewal: 'https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/canjes-inscripcion-renovacion-y-sustitucion-de-permisos-de-la-ue-y-eee/renovacion-de-permisos-de-la-ue-y-eee/',
  euExchange: 'https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/canjes-inscripcion-renovacion-y-sustitucion-de-permisos-de-la-ue-y-eee/canje-de-permisos-de-la-ue-y-eee/',
  appointment: 'https://sede.dgt.gob.es/es/otros-tramites/cita-previa',
  exam: 'https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/solicitud-de-prueba-de-aptitud-de-examen/',
  crc: 'https://sede.dgt.gob.es/export/sites/dgt/.galleries/enlaces/dgt/centros-reconocimiento-conductores.html'
};

const pages = [
  {
    lang: 'en',
    route: '/living-in-spain/driving/',
    peer: '/es/living-in-spain/driving/',
    template: 'moving-to-spain/eu-registration/index.html',
    title: 'Driving in Spain as a New Resident — IberiGo',
    description: 'A current DGT-based guide to using, renewing or exchanging a foreign driving licence after becoming resident in Spain, for EU/EEA and non-EU licence holders.',
    h1: 'Driving in Spain as a new resident',
    kicker: 'Living in Spain',
    intro: 'Your next step depends on where your licence was issued. EU/EEA licences normally remain valid while in force; non-EU licences normally have a limited validity period after normal residence begins.',
    asideTitle: 'Start with the issuing country',
    asideText: 'DGT rules depend on the country that issued the licence, its validity, your normal residence in Spain and—outside the EU/EEA—whether Spain has an exchange agreement.',
    breadcrumbHome: 'Living in Spain',
    breadcrumbHref: '/guides/living-in-spain/',
    headings: ['Driving in Spain as a new resident', 'Choose your licence route', 'EU and EEA licences', 'Non-EU licences', 'Exchange and DGT appointments', 'If your licence cannot be exchanged', 'Resident-driver checklist'],
    keywords: ['driving licence Spain resident', 'EU driving licence Spain', 'non-EU licence Spain', 'DGT canje', 'licence exchange Spain', 'DGT appointment'],
    body: `
      <section class="guide-section" aria-labelledby="quickAnswer"><h2 id="quickAnswer">Quick answer</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>EU / EEA licence</h3><p>If it is in force and has not been restricted, suspended or withdrawn, it remains valid in Spain. Exchange is voluntary in the ordinary case; becoming resident does not by itself make exchange compulsory.</p></article>
          <article class="guide-info-card"><h3>Non-EU licence</h3><p>A qualifying third-country licence is generally valid for at most six months after you acquire normal residence in Spain. After that, exchange it if a DGT agreement allows it or obtain a new Spanish licence if it does not.</p></article>
          <article class="guide-info-card"><h3>Before booking anything</h3><p>Use DGT's country selector. The exact route, documents, possible tests and filing channel depend on the country that issued the licence and the categories you hold.</p></article>
        </div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.exchange}" target="_blank" rel="noopener noreferrer">Check your country on DGT</a><a class="guide-button guide-button--secondary" href="${URLS.appointment}" target="_blank" rel="noopener noreferrer">DGT appointment service</a></div>
      </section>

      <section class="guide-section" aria-labelledby="chooseRoute"><h2 id="chooseRoute">Choose your licence route</h2>
        <div style="overflow-x:auto"><table class="guide-table"><tbody>
          <tr><th>EU / EEA licence</th><td>Normally valid while in force. Exchange is voluntary. If it expires while Spain is your normal residence, renewal is handled in Spain. Indefinite or unusually long-validity licences have a special resident renewal rule.</td></tr>
          <tr><th>Non-EU licence from a country with an agreement</th><td>Check the DGT country selector and follow the route shown for your country. Many bilateral-agreement exchanges can now be initiated online with Cl@ve or an electronic certificate.</td></tr>
          <tr><th>Non-EU licence from a country without an agreement</th><td>An ordinary private licence cannot normally be exchanged. Once it is no longer valid for driving in Spain, you need to obtain a Spanish licence. DGT has a separate exceptional route for some professional drivers.</td></tr>
        </tbody></table></div>
        <div class="guide-box guide-box--warning"><strong>Do not treat six months as a target date.</strong><p>If you rely on a non-EU licence, identify your route early. Verification, medical reports or tests can take time, and an application does not automatically extend the foreign licence's validity in Spain.</p></div>
      </section>

      <section class="guide-section" aria-labelledby="euLicences"><h2 id="euLicences">EU and EEA licences</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Valid while in force</h3><p>DGT states that licences issued by EU Member States and the EEA countries Iceland, Liechtenstein and Norway are valid in Spain while they remain in force and have not been withdrawn.</p></article>
          <article class="guide-info-card"><h3>Exchange is voluntary</h3><p>You may exchange an in-force EU/EEA licence for an equivalent Spanish licence, but normal residence in Spain alone does not normally make this compulsory.</p></article>
          <article class="guide-info-card"><h3>Renew in the country of normal residence</h3><p>If Spain is your normal residence, an EU/EEA licence that reaches expiry must be renewed in Spain. The replacement issued through that renewal is a Spanish licence.</p></article>
          <article class="guide-info-card"><h3>Long or indefinite validity</h3><p>If the licence has no expiry, exceeds 15 years for group 1 categories, or exceeds 5 years for group 2 categories, DGT requires renewal in Spain once two years have passed since normal residence was established.</p></article>
        </div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.euRenewal}" target="_blank" rel="noopener noreferrer">EU/EEA renewal rules</a><a class="guide-button guide-button--secondary" href="${URLS.euExchange}" target="_blank" rel="noopener noreferrer">Voluntary EU/EEA exchange</a></div>
      </section>

      <section class="guide-section" aria-labelledby="nonEu"><h2 id="nonEu">Non-EU licences</h2>
        <p>DGT's general resident rule gives qualifying third-country licences a maximum validity of six months from the start of normal residence in Spain, provided the licence remains in force, the driver meets the Spanish minimum age and the licence satisfies the applicable recognition conditions.</p>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Country with an agreement</h3><p>You may be able to exchange the licence. The current DGT agreement list is the source of truth for the country, licence categories and whether additional tests apply.</p></article>
          <article class="guide-info-card"><h3>Country without an agreement</h3><p>For an ordinary private licence, DGT says there is no exchange route. You will normally need to obtain a new Spanish licence after the foreign licence ceases to be valid in Spain.</p></article>
          <article class="guide-info-card"><h3>Licence obtained after becoming resident</h3><p>Do not assume it can be exchanged. DGT restricts exchange when a foreign licence was obtained while the holder was already legally resident in Spain; check the country-specific procedure.</p></article>
          <article class="guide-info-card"><h3>Professional-driver exception</h3><p>DGT has a separate route for some professional drivers from countries without an agreement. That exception has its own employment, Social Security and testing requirements.</p></article>
        </div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.agreements}" target="_blank" rel="noopener noreferrer">Countries with DGT exchange agreements</a><a class="guide-button guide-button--secondary" href="${URLS.validForeign}" target="_blank" rel="noopener noreferrer">Foreign licences valid in Spain</a></div>
      </section>

      <section class="guide-section" aria-labelledby="exchangeAppointments"><h2 id="exchangeAppointments">Exchange and DGT appointments</h2>
        <div class="guide-card-grid">
          <article class="guide-info-card"><h3>Start with the DGT online route</h3><p>For many non-EU countries with a bilateral agreement, DGT now lets you start the exchange online using Cl@ve or an electronic certificate. Select the issuing country and follow that route.</p></article>
          <article class="guide-info-card"><h3>Online exchange may not need a separate cita</h3><p>When you start through DGT's digital exchange service, DGT can tell you when to attend the selected traffic office to hand over the original licence and receive the provisional authorisation. Follow that instruction instead of booking an unrelated appointment.</p></article>
          <article class="guide-info-card"><h3>When you do need an appointment</h3><p>For a procedure DGT requires you to handle in person, use the official cita previa service. Select the traffic office and then the procedure area offered by that office.</p></article>
          <article class="guide-info-card"><h3>Medical report</h3><p>Some exchange, renewal and new-licence routes require a psychophysical fitness report from an authorised Driver Recognition Centre. Check the exact DGT route before arranging one.</p></article>
        </div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.exchange}" target="_blank" rel="noopener noreferrer">Start/check a DGT exchange</a><a class="guide-button guide-button--secondary" href="${URLS.appointment}" target="_blank" rel="noopener noreferrer">Book a DGT appointment</a><a class="guide-button guide-button--secondary" href="/guides/digital/">Cl@ve &amp; digital certificate</a></div>
        <div class="guide-box guide-box--tip"><strong>Need the detailed exchange checklist?</strong><p>Use our <a href="/guides/driving-licence-exchange/">Driving Licence Exchange guide</a> after DGT confirms that your licence is exchangeable.</p></div>
      </section>

      <section class="guide-section" aria-labelledby="newLicence"><h2 id="newLicence">If your licence cannot be exchanged</h2>
        <p>If DGT's country selector says your ordinary licence is not exchangeable, the normal route is to obtain a Spanish licence. This means completing the Spanish aptitude-test process rather than converting the foreign document.</p>
        <div class="guide-card-grid"><article class="guide-info-card"><h3>Driving school or direct application</h3><p>Most people prepare through an autoescuela, which handles the exam application. DGT also allows an individual to request the aptitude tests directly.</p></article><article class="guide-info-card"><h3>Fitness report</h3><p>A current psychophysical fitness report from an authorised centre is part of the new-licence application.</p></article><article class="guide-info-card"><h3>Application does not extend validity</h3><p>Starting a Spanish-licence application does not extend a time-limited foreign licence's validity in Spain.</p></article></div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.exam}" target="_blank" rel="noopener noreferrer">DGT: obtain a new Spanish licence</a></div>
      </section>

      <section class="guide-section" aria-labelledby="checklist"><h2 id="checklist">Resident-driver checklist</h2>
        <ol class="guide-timeline"><li><h3>1. Check issuing country and expiry</h3><p>Use the country that issued the licence—not simply your nationality—to identify the DGT route.</p></li><li><h3>2. Record when normal residence began</h3><p>This matters especially for non-EU licences because the general validity window is tied to normal residence.</p></li><li><h3>3. Check DGT before paying or booking</h3><p>Confirm whether you can keep using the licence, need renewal, can exchange it, or must obtain a new Spanish licence.</p></li><li><h3>4. Use the correct filing channel</h3><p>If the exchange is available online, start there. Use cita previa only when the selected DGT procedure requires an office appointment.</p></li><li><h3>5. Keep vehicle paperwork separate</h3><p>Driving licence, vehicle registration, ITV and insurance are separate questions.</p></li></ol>
      </section>

      <section class="guide-section" aria-labelledby="questions"><h2 id="questions">Common questions</h2>
        <div class="guide-card-grid"><article class="guide-info-card"><h3>Do I have to exchange my Finnish, German or other EU licence?</h3><p>Not merely because you became resident. An in-force EU/EEA licence is normally valid in Spain. Renewal rules apply at expiry, and special long-validity rules can require renewal in Spain.</p></article><article class="guide-info-card"><h3>Can an International Driving Permit extend the six months?</h3><p>No. It is a complementary document and does not override the residence-based validity limit of the underlying foreign licence.</p></article><article class="guide-info-card"><h3>Do I always need a DGT appointment to exchange?</h3><p>No. DGT now offers digital exchange for many agreement-country routes. If you start online, follow DGT's final handover instructions; for a genuinely in-person route, use cita previa.</p></article></div>
      </section>

      <section class="guide-section" aria-labelledby="officialSources"><h2 id="officialSources">Official sources</h2>${sourceCards([
        ['DGT', 'Foreign licences valid for driving in Spain', URLS.validForeign, 'Official validity conditions for EU/EEA and third-country licences in Spain.'],
        ['DGT', 'Countries with an exchange agreement', URLS.agreements, 'Current country list and information on exchange and possible additional tests.'],
        ['DGT', 'Foreign driving-licence exchange service', URLS.exchange, 'Country selector and current filing channels, including online routes where available.'],
        ['DGT', 'EU/EEA licence renewal in Spain', URLS.euRenewal, 'Resident renewal rules, including indefinite and long-validity EU/EEA licences.'],
        ['DGT', 'Cita previa at traffic offices', URLS.appointment, 'Official appointment service for DGT procedures that require in-person attendance.'],
        ['DGT', 'Obtaining a new Spanish licence', URLS.exam, 'Official aptitude-test route when a new Spanish licence is required.'],
        ['DGT', 'Authorised Driver Recognition Centres', URLS.crc, 'Official directory for centres issuing required psychophysical fitness reports.']
      ])}<div class="guide-box guide-box--info"><strong>Sources checked ${REVIEW_DATE}.</strong><p>DGT updates agreements and filing channels. Recheck the country-specific DGT procedure before acting.</p></div></section>

      <section class="guide-section" aria-labelledby="next"><h2 id="next">Continue your journey</h2><div class="guide-button-row"><a class="guide-button" href="/guides/driving-licence-exchange/">Driving Licence Exchange</a><a class="guide-button guide-button--secondary" href="/moving-to-spain/settling-into-spain/">Settling into Spain</a><a class="guide-button guide-button--secondary" href="/guides/digital/">Cl@ve &amp; digital certificate</a></div></section>`
  },
  {
    lang: 'es',
    route: '/es/living-in-spain/driving/',
    peer: '/living-in-spain/driving/',
    template: 'es/moving-to-spain/eu-registration/index.html',
    title: 'Conducir en España como nuevo residente — IberiGo',
    description: 'Guía actualizada basada en la DGT para usar, renovar o canjear un permiso extranjero al hacerse residente en España, tanto para permisos UE/EEE como no UE.',
    h1: 'Conducir en España como nuevo residente',
    kicker: 'Vivir en España',
    intro: 'El siguiente paso depende del país que expidió tu permiso. Los permisos UE/EEE normalmente siguen siendo válidos mientras estén en vigor; los permisos no UE suelen tener una validez limitada después de adquirir la residencia normal en España.',
    asideTitle: 'Empieza por el país de expedición',
    asideText: 'La DGT distingue por país de expedición, vigencia del permiso, residencia normal en España y, fuera de la UE/EEE, por la existencia de un convenio de canje.',
    breadcrumbHome: 'Vivir en España',
    breadcrumbHref: '/guides/es/living-in-spain/',
    headings: ['Conducir en España como nuevo residente', 'Elige la vía de tu permiso', 'Permisos UE y EEE', 'Permisos no UE', 'Canje y citas de la DGT', 'Si tu permiso no se puede canjear', 'Lista de control del conductor residente'],
    keywords: ['permiso conducir España residente', 'carnet UE España', 'carnet no UE España', 'canje DGT', 'canje permiso conducir', 'cita DGT'],
    body: `
      <section class="guide-section" aria-labelledby="respuestaRapida"><h2 id="respuestaRapida">Respuesta rápida</h2>
        <div class="guide-card-grid"><article class="guide-info-card"><h3>Permiso UE / EEE</h3><p>Si está vigente y no ha sido restringido, suspendido o retirado, sigue siendo válido en España. El canje es voluntario en el caso ordinario; hacerse residente no obliga por sí solo a canjearlo.</p></article><article class="guide-info-card"><h3>Permiso no UE</h3><p>Un permiso de un tercer país que cumpla las condiciones suele ser válido durante un máximo de seis meses desde que adquieres la residencia normal en España. Después, canjéalo si existe convenio u obtén un permiso español nuevo si no existe.</p></article><article class="guide-info-card"><h3>Antes de pedir cita</h3><p>Usa el selector de país de la DGT. La vía exacta, los documentos, las posibles pruebas y el canal de presentación dependen del país que expidió el permiso y de sus categorías.</p></article></div>
        <div class="guide-button-row"><a class="guide-button" href="${URLS.exchange}" target="_blank" rel="noopener noreferrer">Comprobar tu país en la DGT</a><a class="guide-button guide-button--secondary" href="${URLS.appointment}" target="_blank" rel="noopener noreferrer">Cita previa DGT</a></div>
      </section>

      <section class="guide-section" aria-labelledby="eligeVia"><h2 id="eligeVia">Elige la vía de tu permiso</h2><div style="overflow-x:auto"><table class="guide-table"><tbody><tr><th>Permiso UE / EEE</th><td>Normalmente es válido mientras esté vigente. El canje es voluntario. Si caduca cuando España es tu residencia normal, la renovación se tramita en España. Los permisos indefinidos o de vigencia especialmente larga tienen una regla especial.</td></tr><tr><th>Permiso no UE de un país con convenio</th><td>Consulta el selector de la DGT y sigue la vía indicada para tu país. Muchos canjes de países con convenio bilateral ya pueden iniciarse online con Cl@ve o certificado electrónico.</td></tr><tr><th>Permiso no UE de un país sin convenio</th><td>Un permiso particular ordinario normalmente no se puede canjear. Cuando deje de ser válido para conducir en España, tendrás que obtener un permiso español. Existe una vía excepcional separada para algunos conductores profesionales.</td></tr></tbody></table></div><div class="guide-box guide-box--warning"><strong>No trates los seis meses como una fecha objetivo.</strong><p>Si conduces con un permiso no UE, identifica tu vía pronto. La verificación, el reconocimiento médico o las pruebas pueden requerir tiempo, y presentar una solicitud no amplía automáticamente la validez del permiso extranjero en España.</p></div></section>

      <section class="guide-section" aria-labelledby="permisosUe"><h2 id="permisosUe">Permisos UE y EEE</h2><div class="guide-card-grid"><article class="guide-info-card"><h3>Válidos mientras estén en vigor</h3><p>La DGT indica que los permisos expedidos por Estados de la UE y por Islandia, Liechtenstein y Noruega son válidos en España mientras estén vigentes y no hayan sido retirados.</p></article><article class="guide-info-card"><h3>El canje es voluntario</h3><p>Puedes canjear un permiso UE/EEE vigente por uno español equivalente, pero la residencia normal en España por sí sola normalmente no obliga a hacerlo.</p></article><article class="guide-info-card"><h3>Renueva donde tienes tu residencia normal</h3><p>Si España es tu residencia normal, un permiso UE/EEE que llegue a su caducidad debe renovarse en España. El documento expedido tras esa renovación será español.</p></article><article class="guide-info-card"><h3>Vigencia larga o indefinida</h3><p>Si el permiso no tiene caducidad, supera 15 años para categorías del grupo 1 o supera 5 años para categorías del grupo 2, la DGT exige renovarlo en España una vez transcurridos dos años desde que estableciste tu residencia normal.</p></article></div><div class="guide-button-row"><a class="guide-button" href="${URLS.euRenewal}" target="_blank" rel="noopener noreferrer">Reglas DGT de renovación UE/EEE</a><a class="guide-button guide-button--secondary" href="${URLS.euExchange}" target="_blank" rel="noopener noreferrer">Canje voluntario UE/EEE</a></div></section>

      <section class="guide-section" aria-labelledby="permisosNoUe"><h2 id="permisosNoUe">Permisos no UE</h2><p>La regla general de la DGT da a los permisos de terceros países que cumplan las condiciones una validez máxima de seis meses desde el inicio de la residencia normal en España, siempre que el permiso siga vigente, el conductor tenga la edad mínima exigida y el permiso cumpla las condiciones de reconocimiento aplicables.</p><div class="guide-card-grid"><article class="guide-info-card"><h3>País con convenio</h3><p>Puede existir una vía de canje. La lista vigente de la DGT es la fuente para comprobar países, categorías y posibles pruebas adicionales.</p></article><article class="guide-info-card"><h3>País sin convenio</h3><p>Para un permiso particular ordinario la DGT indica que no hay vía de canje. Normalmente tendrás que obtener un permiso español nuevo cuando el permiso extranjero deje de ser válido en España.</p></article><article class="guide-info-card"><h3>Permiso obtenido después de ser residente</h3><p>No des por hecho que se puede canjear. La DGT limita el canje cuando el permiso se obtuvo siendo ya residente legal en España; comprueba la ficha específica del país.</p></article><article class="guide-info-card"><h3>Excepción profesional</h3><p>La DGT tiene una vía separada para determinados conductores profesionales de países sin convenio, con requisitos propios de empleo, Seguridad Social y pruebas.</p></article></div><div class="guide-button-row"><a class="guide-button" href="${URLS.agreements}" target="_blank" rel="noopener noreferrer">Países con convenio de canje</a><a class="guide-button guide-button--secondary" href="${URLS.validForeign}" target="_blank" rel="noopener noreferrer">Permisos extranjeros válidos en España</a></div></section>

      <section class="guide-section" aria-labelledby="canjeCitas"><h2 id="canjeCitas">Canje y citas de la DGT</h2><div class="guide-card-grid"><article class="guide-info-card"><h3>Empieza por la vía online de la DGT</h3><p>Para muchos países no UE con convenio bilateral, la DGT permite iniciar el canje online con Cl@ve o certificado electrónico. Selecciona el país de expedición y sigue esa vía.</p></article><article class="guide-info-card"><h3>Un canje online puede no necesitar una cita separada</h3><p>Cuando empiezas mediante el servicio digital, la DGT puede indicarte cuándo acudir a la Jefatura elegida para entregar el permiso original y recoger la autorización provisional. Sigue esa indicación en lugar de pedir una cita distinta.</p></article><article class="guide-info-card"><h3>Cuándo sí necesitas cita</h3><p>Si el procedimiento exige tramitación presencial, utiliza el servicio oficial de cita previa. Elige la oficina y después el área de tramitación disponible.</p></article><article class="guide-info-card"><h3>Informe médico</h3><p>Algunos canjes, renovaciones y procedimientos de obtención requieren un informe de aptitud psicofísica de un centro autorizado. Comprueba la ficha DGT exacta antes de solicitarlo.</p></article></div><div class="guide-button-row"><a class="guide-button" href="${URLS.exchange}" target="_blank" rel="noopener noreferrer">Iniciar/comprobar un canje</a><a class="guide-button guide-button--secondary" href="${URLS.appointment}" target="_blank" rel="noopener noreferrer">Pedir cita en la DGT</a><a class="guide-button guide-button--secondary" href="/guides/es/digital/">Cl@ve y certificado digital</a></div><div class="guide-box guide-box--tip"><strong>¿Necesitas la lista detallada del canje?</strong><p>Usa nuestra <a href="/guides/es/driving-licence-exchange/">guía de canje del permiso de conducir</a> después de confirmar en la DGT que tu permiso es canjeable.</p></div></section>

      <section class="guide-section" aria-labelledby="permisoNuevo"><h2 id="permisoNuevo">Si tu permiso no se puede canjear</h2><p>Si el selector de la DGT indica que tu permiso ordinario no es canjeable, la vía normal es obtener un permiso español, superando las pruebas españolas en lugar de convertir el documento extranjero.</p><div class="guide-card-grid"><article class="guide-info-card"><h3>Autoescuela o solicitud directa</h3><p>Lo habitual es prepararse mediante una autoescuela, que tramita la presentación a examen. La DGT también permite solicitar directamente las pruebas.</p></article><article class="guide-info-card"><h3>Informe de aptitud</h3><p>La solicitud de un permiso nuevo incluye un informe psicofísico vigente de un centro autorizado.</p></article><article class="guide-info-card"><h3>La solicitud no amplía la validez</h3><p>Empezar a obtener el permiso español no amplía la validez en España de un permiso extranjero sujeto a un plazo.</p></article></div><div class="guide-button-row"><a class="guide-button" href="${URLS.exam}" target="_blank" rel="noopener noreferrer">DGT: obtener un permiso español nuevo</a></div></section>

      <section class="guide-section" aria-labelledby="listaControl"><h2 id="listaControl">Lista de control del conductor residente</h2><ol class="guide-timeline"><li><h3>1. Comprueba país de expedición y caducidad</h3><p>Usa el país que expidió el permiso—no solo tu nacionalidad—para identificar la vía DGT.</p></li><li><h3>2. Anota cuándo empezó tu residencia normal</h3><p>Es especialmente importante para permisos no UE porque la validez general está vinculada a la residencia normal.</p></li><li><h3>3. Consulta la DGT antes de pagar o pedir cita</h3><p>Confirma si puedes seguir usando el permiso, debes renovarlo, puedes canjearlo o necesitas obtener uno nuevo.</p></li><li><h3>4. Usa el canal correcto</h3><p>Si el canje está disponible online, empieza ahí. Utiliza cita previa solo cuando el procedimiento requiera acudir con cita.</p></li><li><h3>5. Separa la documentación del vehículo</h3><p>Permiso de conducir, matriculación, ITV y seguro son cuestiones distintas.</p></li></ol></section>

      <section class="guide-section" aria-labelledby="preguntas"><h2 id="preguntas">Preguntas frecuentes</h2><div class="guide-card-grid"><article class="guide-info-card"><h3>¿Tengo que canjear mi permiso finlandés, alemán u otro permiso UE?</h3><p>No solo por hacerte residente. Un permiso UE/EEE vigente normalmente es válido en España. Se aplican las reglas de renovación al caducar y las reglas especiales de vigencia larga pueden exigir renovación en España.</p></article><article class="guide-info-card"><h3>¿Un permiso internacional amplía los seis meses?</h3><p>No. Es un documento complementario y no elimina el límite de validez ligado a la residencia del permiso extranjero de base.</p></article><article class="guide-info-card"><h3>¿Siempre necesito cita DGT para el canje?</h3><p>No. La DGT ofrece canje digital para muchas vías de países con convenio. Si empiezas online, sigue las instrucciones de entrega final; si la vía es realmente presencial, usa cita previa.</p></article></div></section>

      <section class="guide-section" aria-labelledby="fuentes"><h2 id="fuentes">Fuentes oficiales</h2>${sourceCards([
        ['DGT', 'Permisos extranjeros válidos para conducir en España', URLS.validForeign, 'Condiciones oficiales de validez de permisos UE/EEE y de terceros países en España.'],
        ['DGT', 'Países con convenio de canje', URLS.agreements, 'Lista vigente de países y datos sobre canje y posibles pruebas adicionales.'],
        ['DGT', 'Servicio de canje de permisos extranjeros', URLS.exchange, 'Selector de país y canales actuales, incluida la vía online cuando está disponible.'],
        ['DGT', 'Renovación de permisos UE/EEE en España', URLS.euRenewal, 'Reglas para residentes, incluidos permisos indefinidos o con vigencia larga.'],
        ['DGT', 'Cita previa en Jefaturas', URLS.appointment, 'Servicio oficial de cita para procedimientos que requieren atención presencial.'],
        ['DGT', 'Obtener un permiso español nuevo', URLS.exam, 'Vía oficial de pruebas cuando es necesario obtener un permiso español.'],
        ['DGT', 'Centros de Reconocimiento de Conductores', URLS.crc, 'Directorio oficial de centros para informes de aptitud psicofísica.']
      ])}<div class="guide-box guide-box--info"><strong>Fuentes comprobadas el ${REVIEW_DATE}.</strong><p>La DGT puede actualizar convenios y canales de tramitación. Revisa la ficha específica de tu país antes de actuar.</p></div></section>

      <section class="guide-section" aria-labelledby="siguiente"><h2 id="siguiente">Continúa tu recorrido</h2><div class="guide-button-row"><a class="guide-button" href="/guides/es/driving-licence-exchange/">Canje del permiso de conducir</a><a class="guide-button guide-button--secondary" href="/es/moving-to-spain/settling-into-spain/">Instalarte en España</a><a class="guide-button guide-button--secondary" href="/guides/es/digital/">Cl@ve y certificado digital</a></div></section>`
  }
];

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(value) { return escapeHtml(value); }

function sourceCards(items) {
  return `<div class="guide-card-grid">${items.map(([tag, title, href, description]) => `
    <article class="guide-info-card guide-source-card guide-source-card--traffic">
      <div class="guide-source-head"><span class="guide-source-badge">${escapeHtml(tag)}</span><span class="guide-source-tag">Traffic Authority</span></div>
      <h3><a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></h3><p>${escapeHtml(description)}</p>
    </article>`).join('')}</div>`;
}

function mainHtml(page) {
  const home = page.lang === 'es' ? 'Inicio' : 'Home';
  return `<main class="guide-main" data-driving-resident-guide="true"><nav class="guide-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">${home}</a></li><li><a href="${page.breadcrumbHref}">${page.breadcrumbHome}</a></li><li>${escapeHtml(page.h1)}</li></ol></nav><div class="guide-layout guide-layout--single"><div class="guide-content"><section class="panel guide-card-panel guide-hero" aria-labelledby="pageTitle"><div><span class="guide-kicker">${escapeHtml(page.kicker)}</span><h1 id="pageTitle">${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p></div><aside class="guide-hero-card" aria-label="${escapeAttr(page.asideTitle)}"><strong>${escapeHtml(page.asideTitle)}</strong><p>${escapeHtml(page.asideText)}</p></aside></section>${page.body}</div></div></main>`;
}

function replaceRequired(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`Could not find ${label}`);
  return html.replace(regex, replacement);
}

function setRobots(html) {
  const robots = '<meta name="robots" content="index, follow" />';
  const googlebot = '<meta name="googlebot" content="index, follow" />';
  if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, robots);
  else html = html.replace(/<meta\s+name=["']viewport["'][^>]*>/i, (m) => `${m}\n    ${robots}`);
  if (/<meta\s+name=["']googlebot["'][^>]*>/i.test(html)) html = html.replace(/<meta\s+name=["']googlebot["'][^>]*>/i, googlebot);
  else html = html.replace(robots, `${robots}\n    ${googlebot}`);
  return html;
}

function renderPage(page) {
  let html = fs.readFileSync(path.join(ROOT, page.template), 'utf8');
  const enRoute = page.lang === 'en' ? page.route : page.peer;
  const esRoute = page.lang === 'es' ? page.route : page.peer;
  const canonical = `https://iberigo.eu${page.route}`;
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${page.lang}" data-guide-id="driving-resident" data-guide-lang="${page.lang}">`);
  html = setRobots(html);
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`, 'title');
  html = replaceRequired(html, /<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeAttr(page.description)}" />`, 'description');
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`, 'canonical');
  html = replaceRequired(html, /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="en" href="https://iberigo.eu${enRoute}" />`, 'hreflang en');
  html = replaceRequired(html, /<link rel="alternate" hreflang="es" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="es" href="https://iberigo.eu${esRoute}" />`, 'hreflang es');
  html = replaceRequired(html, /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="x-default" href="https://iberigo.eu${enRoute}" />`, 'hreflang x-default');
  html = replaceRequired(html, /<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeAttr(page.title)}" />`, 'og title');
  html = replaceRequired(html, /<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeAttr(page.description)}" />`, 'og description');
  html = replaceRequired(html, /<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`, 'og url');
  html = replaceRequired(html, /<main class="guide-main">[\s\S]*?<\/main>/i, mainHtml(page), 'main');
  const output = path.join(ROOT, page.route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
  console.log(`[driving-resident] wrote ${page.route}`);
}

function updateSearchIndex() {
  const file = path.join(ROOT, 'search-index.json');
  let entries = JSON.parse(fs.readFileSync(file, 'utf8'));
  const urls = new Set(pages.map((p) => p.route));
  entries = entries.filter((entry) => !urls.has(entry.url));
  for (const page of pages) entries.push({ title: page.title.replace(/ — IberiGo$/, ''), description: page.description, url: page.route, language: page.lang, type: 'guide', headings: page.headings, keywords: page.keywords, text: `${page.h1}. ${page.intro} ${page.description}` });
  fs.writeFileSync(file, JSON.stringify(entries, null, 2) + '\n');
}

function updateSitemap(filename) {
  const file = path.join(ROOT, filename);
  if (!fs.existsSync(file)) return;
  let xml = fs.readFileSync(file, 'utf8');
  for (const page of pages) {
    const loc = `https://iberigo.eu${page.route}`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    const block = `\n  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>${REVIEW_DATE}</lastmod>\n  </url>`;
    xml = xml.replace(/\s*<\/urlset>\s*$/i, `${block}\n</urlset>\n`);
  }
  fs.writeFileSync(file, xml);
}

for (const page of pages) renderPage(page);
updateSearchIndex();
updateSitemap('sitemap.xml');
updateSitemap('sitemap-pages.xml');
console.log('[driving-resident] bilingual resident-driving guide ready');
