// Arcane research breakthrough system — long-term magical research with eureka moments.

export type ResearchField = 'transmutation' | 'necromancy' | 'enchantment' | 'divination' | 'evocation' | 'conjuration' | 'abjuration' | 'illusion';
export type BreakthroughType = 'spell_discovery' | 'item_creation' | 'planar_knowledge' | 'creature_insight' | 'formula';

export interface ResearchProject {
  name: string;
  field: ResearchField;
  breakthroughType: BreakthroughType;
  description: string;
  weeksRequired: number;
  weeklyDC: number;
  materialCost: number;
  successesNeeded: number;
  breakthrough: string;
  partialResult: string;
  catastrophicFailure: string;
}

const PROJECTS: ResearchProject[] = [
  { name: 'Spell Compression Theory', field: 'transmutation', breakthroughType: 'spell_discovery', description: 'Can a spell be compressed into a smaller slot without losing potency?', weeksRequired: 8, weeklyDC: 15, materialCost: 500, successesNeeded: 5, breakthrough: 'Learn to cast one 3rd-level spell using a 2nd-level slot. Permanent ability.', partialResult: 'Can do it once per long rest. Inconsistent.', catastrophicFailure: 'The compressed spell explodes during testing. 4d6 force damage to researcher.' },
  { name: 'Death\'s Ledger', field: 'necromancy', breakthroughType: 'planar_knowledge', description: 'Where do souls go between death and resurrection? Can the path be mapped?', weeksRequired: 12, weeklyDC: 16, materialCost: 1000, successesNeeded: 7, breakthrough: 'Map of the soul\'s journey. Can cast Speak with Dead without material components. Know the exact location of any soul.', partialResult: 'Can sense if a specific soul is at rest or in torment.', catastrophicFailure: 'Attracted the attention of a psychopomp. It demands the research stop. Or else.' },
  { name: 'Living Enchantment', field: 'enchantment', breakthroughType: 'item_creation', description: 'Can an enchantment be made self-sustaining — an item that enchants itself?', weeksRequired: 10, weeklyDC: 17, materialCost: 2000, successesNeeded: 6, breakthrough: 'Create a Ring of Perpetual Charm: wearer is under a permanent Friends cantrip effect (+1 CHA checks).', partialResult: 'Ring works but drains 1 HP/day from the wearer.', catastrophicFailure: 'The ring becomes sentient and charming in its own right. It doesn\'t want to be worn. It wants to be in charge.' },
  { name: 'The Predictive Lens', field: 'divination', breakthroughType: 'formula', description: 'Can probability itself be calculated with enough magical input?', weeksRequired: 6, weeklyDC: 14, materialCost: 300, successesNeeded: 4, breakthrough: 'Once per day, know the exact outcome of one d20 roll before it\'s rolled.', partialResult: 'Know if the roll will be "high" or "low" (above or below 10).', catastrophicFailure: 'See TOO MUCH. Paralyzed by choice for 1d4 hours (see all possible futures simultaneously).' },
  { name: 'Elemental Fusion', field: 'evocation', breakthroughType: 'spell_discovery', description: 'What happens when you combine two elemental damage types in one spell?', weeksRequired: 8, weeklyDC: 15, materialCost: 750, successesNeeded: 5, breakthrough: 'Create a custom spell: Fusion Bolt (2nd level, 3d6 of two chosen elements, 120ft range).', partialResult: 'Can add 1d4 of a second element to any evocation spell, once per long rest.', catastrophicFailure: 'Elements react violently. 5d6 of random elemental damage to everything within 30ft.' },
];

export function getRandomProject(): ResearchProject {
  return PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
}

export function getProjectsByField(field: ResearchField): ResearchProject[] {
  return PROJECTS.filter((p) => p.field === field);
}

export function getProjectsByType(type: BreakthroughType): ResearchProject[] {
  return PROJECTS.filter((p) => p.breakthroughType === type);
}

export function getProjectsByMaxCost(maxCost: number): ResearchProject[] {
  return PROJECTS.filter((p) => p.materialCost <= maxCost);
}

export function calculateCompletionChance(weeklyDC: number, arcanaMod: number): number {
  const chance = Math.max(5, Math.min(95, (20 - weeklyDC + arcanaMod + 1) / 20 * 100));
  return Math.round(chance);
}

export function getAllResearchFields(): ResearchField[] {
  return [...new Set(PROJECTS.map((p) => p.field))];
}

export function formatProject(project: ResearchProject): string {
  const icon = { transmutation: '🔄', necromancy: '💀', enchantment: '✨', divination: '👁️', evocation: '⚡', conjuration: '🌀', abjuration: '🛡️', illusion: '🪞' }[project.field];
  const lines = [`${icon} **${project.name}** *(${project.field}, ${project.breakthroughType.replace(/_/g, ' ')})*`];
  lines.push(`  *${project.description}*`);
  lines.push(`  Duration: ${project.weeksRequired} weeks | DC ${project.weeklyDC}/week | Cost: ${project.materialCost}gp`);
  lines.push(`  Successes needed: ${project.successesNeeded}`);
  lines.push(`  ✅ Breakthrough: ${project.breakthrough}`);
  lines.push(`  🟡 Partial: ${project.partialResult}`);
  lines.push(`  ❌ Catastrophe: ${project.catastrophicFailure}`);
  return lines.join('\n');
}

export { PROJECTS as RESEARCH_PROJECTS };
