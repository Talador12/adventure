// Shapeshifter infiltration detector — methods and DCs for identifying disguised creatures.

export type ShapeshifterType = 'doppelganger' | 'changeling' | 'mimic' | 'vampire' | 'hag' | 'rakshasa' | 'polymorphed';
export type DetectionMethod = 'physical' | 'magical' | 'behavioral' | 'environmental' | 'social';

export interface DetectionTechnique {
  method: DetectionMethod;
  name: string;
  dc: number;
  skill: string;
  description: string;
  effectiveAgainst: ShapeshifterType[];
  falsePositiveChance: number; // 0-100%
}

const TECHNIQUES: DetectionTechnique[] = [
  { method: 'physical', name: 'Silver Mirror Test', dc: 0, skill: 'None (automatic)', description: 'Vampires have no reflection. Some shapeshifters show their true form.', effectiveAgainst: ['vampire', 'doppelganger'], falsePositiveChance: 0 },
  { method: 'physical', name: 'Salt Circle', dc: 10, skill: 'Nature', description: 'Some fey and fiend shapeshifters cannot cross a circle of pure salt.', effectiveAgainst: ['hag', 'rakshasa'], falsePositiveChance: 5 },
  { method: 'magical', name: 'Detect Magic (cantrip-level)', dc: 0, skill: 'Arcana', description: 'Polymorphed creatures radiate transmutation magic. Illusions radiate illusion.', effectiveAgainst: ['polymorphed'], falsePositiveChance: 15 },
  { method: 'magical', name: 'Truesight', dc: 0, skill: 'None (spell required)', description: 'Sees through all disguises, illusions, and shapeshifting. The nuclear option.', effectiveAgainst: ['doppelganger', 'changeling', 'mimic', 'vampire', 'hag', 'rakshasa', 'polymorphed'], falsePositiveChance: 0 },
  { method: 'behavioral', name: 'Specific Memory Test', dc: 14, skill: 'Insight', description: 'Ask about a shared memory only the real person would know. Details, not facts.', effectiveAgainst: ['doppelganger', 'changeling'], falsePositiveChance: 10 },
  { method: 'behavioral', name: 'Handedness Check', dc: 12, skill: 'Perception', description: 'Most shapeshifters copy appearance but not dominant hand. Watch which hand they use.', effectiveAgainst: ['doppelganger', 'changeling'], falsePositiveChance: 20 },
  { method: 'environmental', name: 'Animal Reaction', dc: 11, skill: 'Animal Handling', description: 'Dogs growl at doppelgangers. Cats hiss at hags. Animals know.', effectiveAgainst: ['doppelganger', 'hag', 'vampire'], falsePositiveChance: 15 },
  { method: 'environmental', name: 'Mimic Poke Test', dc: 10, skill: 'Investigation', description: 'Poke suspicious objects with a 10ft pole. If it\'s a mimic, it bites the pole.', effectiveAgainst: ['mimic'], falsePositiveChance: 0 },
  { method: 'social', name: 'Emotional Manipulation', dc: 15, skill: 'Persuasion', description: 'Bring up something deeply emotional. Shapeshifters struggle to fake genuine tears.', effectiveAgainst: ['doppelganger', 'changeling', 'rakshasa'], falsePositiveChance: 25 },
  { method: 'social', name: 'Inside Joke Test', dc: 13, skill: 'Deception', description: 'Reference an inside joke that doesn\'t exist. If they laugh along, they\'re faking.', effectiveAgainst: ['doppelganger', 'changeling'], falsePositiveChance: 10 },
];

export function getTechniquesForType(type: ShapeshifterType): DetectionTechnique[] {
  return TECHNIQUES.filter((t) => t.effectiveAgainst.includes(type));
}

export function getTechniquesByMethod(method: DetectionMethod): DetectionTechnique[] {
  return TECHNIQUES.filter((t) => t.method === method);
}

export function getMostReliableTechniques(): DetectionTechnique[] {
  return TECHNIQUES.filter((t) => t.falsePositiveChance <= 5);
}

export function getAllShapeshifterTypes(): ShapeshifterType[] {
  return ['doppelganger', 'changeling', 'mimic', 'vampire', 'hag', 'rakshasa', 'polymorphed'];
}

export function getAllDetectionMethods(): DetectionMethod[] {
  return [...new Set(TECHNIQUES.map((t) => t.method))];
}

export function formatTechnique(tech: DetectionTechnique): string {
  const icon = { physical: '🔍', magical: '✨', behavioral: '🧠', environmental: '🌿', social: '🗣️' }[tech.method];
  const lines = [`${icon} **${tech.name}** *(${tech.method}, ${tech.skill} DC ${tech.dc})*`];
  lines.push(`  *${tech.description}*`);
  lines.push(`  Effective vs: ${tech.effectiveAgainst.join(', ')}`);
  lines.push(`  False positive: ${tech.falsePositiveChance}%`);
  return lines.join('\n');
}

export { TECHNIQUES as DETECTION_TECHNIQUES };
