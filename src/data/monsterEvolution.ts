// Monster evolution tracker — creatures that grow stronger after surviving encounters with the party.

export type EvolutionTrigger = 'survived_combat' | 'consumed_magic' | 'prolonged_exposure' | 'near_death' | 'absorbed_ally';

export interface EvolutionStage { stage: number; name: string; crIncrease: number; newAbility: string; physicalChange: string; behaviorChange: string; }

export interface EvolvingMonster {
  baseName: string;
  baseCR: number;
  trigger: EvolutionTrigger;
  description: string;
  stages: EvolutionStage[];
  maxEvolutions: number;
  weaknessGained: string;
  partyRecognitionDC: number;
}

const MONSTERS: EvolvingMonster[] = [
  { baseName: 'The Recurring Goblin', baseCR: 0.25, trigger: 'survived_combat', description: 'This specific goblin keeps escaping the party. Each time, it comes back stronger, smarter, and angrier.', stages: [
    { stage: 1, name: 'Veteran', crIncrease: 1, newAbility: 'Multiattack (2 attacks). Wears trophies from previous encounters with the party.', physicalChange: 'Scar across the face. One ear missing. Walks with a limp that doesn\'t slow it.', behaviorChange: 'Studies the party. Knows their tactics. Prepares counters.' },
    { stage: 2, name: 'Warchief', crIncrease: 2, newAbility: 'Commands 2d6 goblins. Battle cry gives allies +1 to hit. Carries a stolen party weapon.', physicalChange: 'Bigger. Stronger. Wears armor looted from a knight they killed (not a party member... yet).', behaviorChange: 'Sets traps specifically designed to exploit party weaknesses.' },
    { stage: 3, name: 'Nemesis', crIncrease: 4, newAbility: 'Legendary actions (1). Can disengage as a bonus action. Has a lair (trapped, furnished with party trophies).', physicalChange: 'Unrecognizable as a goblin. A scarred, battle-hardened warrior. Eyes burn with purpose.', behaviorChange: 'This is personal. It doesn\'t want gold or territory. It wants to prove it\'s better than the party.' },
  ], maxEvolutions: 3, weaknessGained: 'Its obsession with the party is exploitable. Taunting it (Persuasion DC 13) causes it to attack recklessly (-2 AC, +2 damage).', partyRecognitionDC: 12 },
  { baseName: 'The Adaptive Ooze', baseCR: 2, trigger: 'consumed_magic', description: 'An ooze that absorbs the properties of spells cast at it. Each spell makes it more dangerous.', stages: [
    { stage: 1, name: 'Infused', crIncrease: 1, newAbility: 'Gains resistance to the last damage type used against it.', physicalChange: 'Color shifts to match the absorbed element. Glows faintly.', behaviorChange: 'Actively seeks out spellcasters. It\'s hungry for magic.' },
    { stage: 2, name: 'Saturated', crIncrease: 2, newAbility: 'Can cast one absorbed spell (1/day, at the level it was cast). Immune to cantrips.', physicalChange: 'Crystalline structures form inside it. It\'s beautiful and terrifying.', behaviorChange: 'Intelligent. Problem-solving. Uses terrain. This is no longer a mindless ooze.' },
    { stage: 3, name: 'Arcane Apex', crIncrease: 4, newAbility: 'Antimagic aura 10ft. Absorbs spell slots on touch (1d4 levels per hit).', physicalChange: 'A perfect sphere of pulsing magical energy. The ooze is now pure magic in a membrane.', behaviorChange: 'Seeks to absorb a spellcaster entirely. Not to kill — to BECOME them.' },
  ], maxEvolutions: 3, weaknessGained: 'Non-magical physical damage. The more magical it becomes, the more vulnerable to a plain steel sword.', partyRecognitionDC: 14 },
  { baseName: 'The Undying Wolf', baseCR: 0.25, trigger: 'near_death', description: 'A wolf that the party "killed" but didn\'t finish off. It crawled away. It healed. It evolved.', stages: [
    { stage: 1, name: 'Scarred Hunter', crIncrease: 1, newAbility: 'Regeneration 2 HP/round (stopped by fire). Tracks the party by scent across miles.', physicalChange: 'Covered in scars. One eye is milky white but sees in darkvision. Larger than before.', behaviorChange: 'Hunts the party silently. Picks off stragglers. Never attacks the strongest member.' },
    { stage: 2, name: 'Dread Wolf', crIncrease: 2, newAbility: 'Fear aura 15ft (WIS DC 13). Pack of 1d6 wolves follows it. Alpha of alphas.', physicalChange: 'Shadow clings to it. It moves like smoke. Paw prints freeze the ground.', behaviorChange: 'Strategic. Lures the party into ambush terrain. Uses its pack as scouts.' },
  ], maxEvolutions: 2, weaknessGained: 'Fire. The one thing that almost killed it. It fears fire (WIS DC 11 or frightened by open flame within 10ft).', partyRecognitionDC: 11 },
];

export function getRandomEvolvingMonster(): EvolvingMonster {
  return MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
}

export function getMonstersByTrigger(trigger: EvolutionTrigger): EvolvingMonster[] {
  return MONSTERS.filter((m) => m.trigger === trigger);
}

export function getEvolutionAtStage(monster: EvolvingMonster, stage: number): EvolutionStage | undefined {
  return monster.stages.find((s) => s.stage === stage);
}

export function getCRAtStage(monster: EvolvingMonster, stage: number): number {
  const evo = monster.stages.filter((s) => s.stage <= stage);
  return monster.baseCR + evo.reduce((sum, e) => sum + e.crIncrease, 0);
}

export function getAllEvolutionTriggers(): EvolutionTrigger[] {
  return [...new Set(MONSTERS.map((m) => m.trigger))];
}

export function formatEvolvingMonster(monster: EvolvingMonster, currentStage: number = 0): string {
  const lines = [`🐺 **${monster.baseName}** *(CR ${getCRAtStage(monster, currentStage)}, ${monster.trigger.replace(/_/g, ' ')})*`];
  lines.push(`  *${monster.description}*`);
  if (currentStage > 0) { const stage = getEvolutionAtStage(monster, currentStage); if (stage) lines.push(`  **Stage ${stage.stage}: ${stage.name}** — ${stage.newAbility}`); }
  lines.push(`  ⚡ Weakness: ${monster.weaknessGained}`);
  lines.push(`  Recognition DC: ${monster.partyRecognitionDC}`);
  return lines.join('\n');
}

export { MONSTERS as EVOLVING_MONSTERS };
