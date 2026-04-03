// Status effect reference — quick-lookup for all 5e conditions with mechanical effects.

export interface StatusEffect {
  name: string;
  emoji: string;
  description: string;
  mechanicalEffects: string[];
  endCondition: string;
}

export const STATUS_EFFECTS: StatusEffect[] = [
  { name: 'Blinded', emoji: '🙈', description: 'Can\'t see.', mechanicalEffects: ['Auto-fail checks requiring sight', 'Attacks have disadvantage', 'Attacks against you have advantage'], endCondition: 'Varies by source' },
  { name: 'Charmed', emoji: '💘', description: 'Magically beguiled.', mechanicalEffects: ['Can\'t attack charmer', 'Charmer has advantage on social checks'], endCondition: 'Varies; often save at end of turn' },
  { name: 'Deafened', emoji: '🔇', description: 'Can\'t hear.', mechanicalEffects: ['Auto-fail checks requiring hearing'], endCondition: 'Varies by source' },
  { name: 'Frightened', emoji: '😨', description: 'Terrified of the source.', mechanicalEffects: ['Disadvantage on checks/attacks while source is in sight', 'Can\'t willingly move closer to source'], endCondition: 'Save at end of turn or source out of sight' },
  { name: 'Grappled', emoji: '🤼', description: 'Held in place.', mechanicalEffects: ['Speed becomes 0', 'Ends if grappler is incapacitated or forced apart'], endCondition: 'Escape action (Athletics/Acrobatics vs Athletics)' },
  { name: 'Incapacitated', emoji: '💫', description: 'Can\'t take actions or reactions.', mechanicalEffects: ['No actions', 'No reactions'], endCondition: 'Varies by source' },
  { name: 'Invisible', emoji: '👻', description: 'Can\'t be seen without special senses.', mechanicalEffects: ['Attacks against you have disadvantage', 'Your attacks have advantage', 'Still detected by noise/tracks'], endCondition: 'Attack or cast a spell (usually)' },
  { name: 'Paralyzed', emoji: '⚡', description: 'Frozen in place.', mechanicalEffects: ['Incapacitated + can\'t move or speak', 'Auto-fail STR/DEX saves', 'Attacks have advantage', 'Melee hits are auto-crits'], endCondition: 'Save at end of turn' },
  { name: 'Petrified', emoji: '🗿', description: 'Turned to stone.', mechanicalEffects: ['Weight ×10', 'Incapacitated, can\'t move/speak', 'Resistance to all damage', 'Immune to poison/disease', 'Aging suspended'], endCondition: 'Greater Restoration or specific cure' },
  { name: 'Poisoned', emoji: '☠️', description: 'Toxins impair function.', mechanicalEffects: ['Disadvantage on attacks and ability checks'], endCondition: 'Varies; often CON save or Lesser Restoration' },
  { name: 'Prone', emoji: '🔻', description: 'Lying on the ground.', mechanicalEffects: ['Disadvantage on attacks', 'Melee attacks against have advantage', 'Ranged attacks against have disadvantage', 'Must spend half movement to stand'], endCondition: 'Use half movement to stand' },
  { name: 'Restrained', emoji: '⛓️', description: 'Held in place by bonds/magic.', mechanicalEffects: ['Speed 0', 'Attacks have disadvantage', 'Attacks against have advantage', 'Disadvantage on DEX saves'], endCondition: 'Varies; often STR check to break free' },
  { name: 'Stunned', emoji: '⭐', description: 'Shocked into inaction.', mechanicalEffects: ['Incapacitated, can\'t move', 'Can only speak falteringly', 'Auto-fail STR/DEX saves', 'Attacks against have advantage'], endCondition: 'Save at end of turn' },
  { name: 'Unconscious', emoji: '💤', description: 'Completely unaware.', mechanicalEffects: ['Incapacitated, can\'t move/speak', 'Unaware of surroundings', 'Drop held items, fall prone', 'Auto-fail STR/DEX saves', 'Attacks have advantage', 'Melee hits are auto-crits'], endCondition: 'Healing, stabilization, or natural recovery' },
  { name: 'Exhaustion', emoji: '😵', description: 'Cumulative levels of fatigue.', mechanicalEffects: ['L1: Disadvantage on checks', 'L2: Speed halved', 'L3: Disadvantage on attacks/saves', 'L4: Max HP halved', 'L5: Speed 0', 'L6: Death'], endCondition: 'Long rest removes 1 level; Greater Restoration removes 1 level' },
];

export function getStatusEffect(name: string): StatusEffect | undefined {
  return STATUS_EFFECTS.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

export function searchStatusEffects(query: string): StatusEffect[] {
  const q = query.toLowerCase();
  return STATUS_EFFECTS.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
}

export function formatStatusEffect(effect: StatusEffect): string {
  const lines = [`${effect.emoji} **${effect.name}**: ${effect.description}`];
  for (const e of effect.mechanicalEffects) lines.push(`  • ${e}`);
  lines.push(`  *End: ${effect.endCondition}*`);
  return lines.join('\n');
}

export function formatAllStatusEffects(): string {
  return '📋 **Status Effects Reference:**\n\n' + STATUS_EFFECTS.map((s) => `${s.emoji} **${s.name}**: ${s.description}`).join('\n');
}
