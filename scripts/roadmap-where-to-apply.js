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
