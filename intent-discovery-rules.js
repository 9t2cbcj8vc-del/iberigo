(function (root, factory) {
  const rules = factory();
  if (typeof module === 'object' && module.exports) module.exports = rules;
  if (root && root.IberiGoIntentDiscovery) rules.apply(root.IberiGoIntentDiscovery);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const additions = {
    'tie-after-approval': {
      aliases: ['tie card after approval', 'collect my tie card after approval', 'where do i collect my tie card after approval', 'approved tie fingerprints'],
      keywords: ['after approval', 'after approved']
    },
    digital: {
      aliases: ['certifcado digital', 'certifcate digital', 'certificado digtal'],
      keywords: ['certifcado', 'certifcate', 'digtal']
    },
    'driving-exchange': {
      aliases: ['driving licence exchage', 'driving license exchage', 'licence exchage in spain', 'license exchage in spain'],
      keywords: ['exchage', 'exhange']
    },
    'work-authorization': {
      aliases: ['spanish work authorization for non eu worker', 'work authorization non eu', 'non eu work authorization', 'non eu work permit spain'],
      keywords: ['worker', 'non eu worker']
    },
    'non-eu-roadmap': {
      aliases: ['british citizen moving to spain', 'non eu citizen wants to move to spain', 'non eu citizen move to spain', 'ciudadano no ue mudarse a espana', 'ciudadano no ue quiere mudarse a espana'],
      keywords: ['british citizen', 'non eu citizen', 'ciudadano no ue']
    },
    'family-reunification': {
      aliases: ['non eu resident bring spouse', 'non eu resident want to bring spouse', 'non eu resident and want to bring my spouse', 'residente no ue traer conyuge'],
      keywords: ['resident spouse', 'residente conyuge']
    }
  };

  function apply(api) {
    if (!api || !Array.isArray(api.intents)) throw new Error('Intent discovery engine is required before routing rules');
    for (const intent of api.intents) {
      const extra = additions[intent.id];
      if (!extra) continue;
      intent.aliases = [...new Set([...(intent.aliases || []), ...(extra.aliases || [])])];
      intent.keywords = [...new Set([...(intent.keywords || []), ...(extra.keywords || [])])];
    }
    return api;
  }

  return { additions, apply };
});
