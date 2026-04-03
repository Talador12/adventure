// Random NPC fear — what is this person afraid of?
export interface NpcFear { fear: string; visible: boolean; howItManifests: string; canBeExploited: boolean; }
const FEARS: NpcFear[] = [
  { fear: 'Being forgotten after they die.', visible: false, howItManifests: 'They document everything obsessively. Journals, letters, portraits.', canBeExploited: true },
  { fear: 'The dark.', visible: true, howItManifests: 'Always carries a light source. Panics in Darkness spells.', canBeExploited: true },
  { fear: 'Being discovered as a fraud.', visible: false, howItManifests: 'Overcompensates with confidence. Deflects personal questions.', canBeExploited: true },
  { fear: 'Water. Specifically drowning.', visible: true, howItManifests: 'Refuses to cross bridges. Won\'t travel by boat.', canBeExploited: true },
  { fear: 'Their own rage.', visible: false, howItManifests: 'Speaks softly. Over-controls their emotions. Avoids conflict.', canBeExploited: false },
  { fear: 'Magic.', visible: true, howItManifests: 'Flinches when spells are cast nearby. Distrusts all casters.', canBeExploited: true },
  { fear: 'Nothing. Genuinely fearless.', visible: false, howItManifests: 'This is itself terrifying to others.', canBeExploited: false },
];
export function getRandomNpcFear(): NpcFear { return FEARS[Math.floor(Math.random() * FEARS.length)]; }
export function formatNpcFear(f: NpcFear): string { return `😨 **NPC Fear:** ${f.fear}${f.visible ? ' (visible)' : ' (hidden)'}\n🎭 Manifests as: *${f.howItManifests}*\n${f.canBeExploited ? '⚡ Can be exploited by a cunning party.' : '🚫 Not easily exploitable.'}`; }
