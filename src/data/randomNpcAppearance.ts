// Random NPC appearance detail — one distinguishing physical feature.
export const NPC_APPEARANCES: string[] = [
  'A prominent scar running from ear to chin.', 'Heterochromia — one blue eye, one brown.',
  'Missing the tip of their left index finger.', 'A shock of prematurely white hair.',
  'A tattoo of a serpent coiling up their neck.', 'Unusually tall — towers over everyone.',
  'Walks with a pronounced limp (right leg).', 'Always squinting, as if the light hurts.',
  'Calloused hands — years of hard labor.', 'A gold tooth that catches the light when they smile.',
  'A burn scar covering most of one hand.', 'Freckles so dense they look like a tan.',
  'A broken nose, healed crooked.', 'Wears an eyepatch (the eye underneath is fine).',
  'Fingers stained with ink or dye.', 'An elaborate braid that reaches their waist.',
];
export function getRandomAppearance(): string { return NPC_APPEARANCES[Math.floor(Math.random() * NPC_APPEARANCES.length)]; }
export function formatNpcAppearance(): string { return `👤 **Distinguishing Feature:** *${getRandomAppearance()}*`; }
