// Class feature cooldown manager — track uses of channel divinity, action surge, rage, etc.

export type RestoreOn = 'short_rest' | 'long_rest' | 'dawn' | 'manual';

export interface ClassFeature {
  id: string;
  name: string;
  charClass: string;
  maxUses: number;
  currentUses: number;
  restoreOn: RestoreOn;
  levelRequired: number;
  description: string;
}

export const CLASS_FEATURE_TEMPLATES: Omit<ClassFeature, 'id' | 'currentUses'>[] = [
  { name: 'Action Surge', charClass: 'Fighter', maxUses: 1, restoreOn: 'short_rest', levelRequired: 2, description: 'Take one additional action on your turn.' },
  { name: 'Second Wind', charClass: 'Fighter', maxUses: 1, restoreOn: 'short_rest', levelRequired: 1, description: 'Regain 1d10 + level HP as bonus action.' },
  { name: 'Indomitable', charClass: 'Fighter', maxUses: 1, restoreOn: 'long_rest', levelRequired: 9, description: 'Reroll a failed saving throw.' },
  { name: 'Rage', charClass: 'Barbarian', maxUses: 2, restoreOn: 'long_rest', levelRequired: 1, description: 'Advantage on STR checks/saves, +2 melee damage, resistance to physical.' },
  { name: 'Reckless Attack', charClass: 'Barbarian', maxUses: -1, restoreOn: 'manual', levelRequired: 2, description: 'Advantage on melee attacks, but attacks against you have advantage.' },
  { name: 'Channel Divinity', charClass: 'Cleric', maxUses: 1, restoreOn: 'short_rest', levelRequired: 2, description: 'Use a channel divinity option.' },
  { name: 'Turn Undead', charClass: 'Cleric', maxUses: -1, restoreOn: 'manual', levelRequired: 2, description: 'Channel Divinity: Turn or destroy undead within 30ft.' },
  { name: 'Wild Shape', charClass: 'Druid', maxUses: 2, restoreOn: 'short_rest', levelRequired: 2, description: 'Transform into a beast you\'ve seen.' },
  { name: 'Bardic Inspiration', charClass: 'Bard', maxUses: 3, restoreOn: 'long_rest', levelRequired: 1, description: 'Grant an ally a d6 bonus die (scales with level).' },
  { name: 'Ki Points', charClass: 'Monk', maxUses: 4, restoreOn: 'short_rest', levelRequired: 2, description: 'Fuel monk abilities (Flurry, Patient Defense, Step of Wind).' },
  { name: 'Sneak Attack', charClass: 'Rogue', maxUses: -1, restoreOn: 'manual', levelRequired: 1, description: 'Once per turn, extra damage when you have advantage or ally adjacent.' },
  { name: 'Cunning Action', charClass: 'Rogue', maxUses: -1, restoreOn: 'manual', levelRequired: 2, description: 'Dash, Disengage, or Hide as bonus action.' },
  { name: 'Lay on Hands', charClass: 'Paladin', maxUses: 25, restoreOn: 'long_rest', levelRequired: 1, description: 'Pool of healing equal to level × 5.' },
  { name: 'Divine Smite', charClass: 'Paladin', maxUses: -1, restoreOn: 'manual', levelRequired: 2, description: 'Expend spell slot for 2d8+ radiant damage on melee hit.' },
  { name: 'Arcane Recovery', charClass: 'Wizard', maxUses: 1, restoreOn: 'long_rest', levelRequired: 1, description: 'Recover spell slots on short rest (total ≤ half wizard level).' },
  { name: 'Sorcery Points', charClass: 'Sorcerer', maxUses: 4, restoreOn: 'long_rest', levelRequired: 2, description: 'Fuel metamagic and convert to/from spell slots.' },
];

export function getClassFeatures(charClass: string, level: number): ClassFeature[] {
  return CLASS_FEATURE_TEMPLATES
    .filter((f) => f.charClass === charClass && level >= f.levelRequired)
    .map((f) => ({ ...f, id: crypto.randomUUID(), currentUses: f.maxUses > 0 ? f.maxUses : -1 }));
}

export function useFeature(features: ClassFeature[], featureId: string): { features: ClassFeature[]; success: boolean; message: string } {
  const feature = features.find((f) => f.id === featureId);
  if (!feature) return { features, success: false, message: 'Feature not found.' };
  if (feature.maxUses < 0) return { features, success: true, message: `${feature.name} used (unlimited).` };
  if (feature.currentUses <= 0) return { features, success: false, message: `${feature.name} has no uses remaining!` };
  return {
    features: features.map((f) => f.id === featureId ? { ...f, currentUses: f.currentUses - 1 } : f),
    success: true,
    message: `${feature.name} used! (${feature.currentUses - 1}/${feature.maxUses} remaining)`,
  };
}

export function restoreFeatures(features: ClassFeature[], restType: 'short_rest' | 'long_rest'): ClassFeature[] {
  return features.map((f) => {
    if (f.maxUses < 0) return f;
    if (restType === 'long_rest' || f.restoreOn === 'short_rest') return { ...f, currentUses: f.maxUses };
    return f;
  });
}

export function formatFeatureCooldowns(features: ClassFeature[], characterName: string): string {
  const trackable = features.filter((f) => f.maxUses > 0);
  if (trackable.length === 0) return `⚡ **${characterName}**: No limited-use features.`;
  const lines = [`⚡ **${characterName}'s Features:**`];
  for (const f of trackable) {
    const bar = '●'.repeat(f.currentUses) + '○'.repeat(f.maxUses - f.currentUses);
    lines.push(`[${bar}] **${f.name}** ${f.currentUses}/${f.maxUses} (${f.restoreOn.replace('_', ' ')})`);
  }
  return lines.join('\n');
}
