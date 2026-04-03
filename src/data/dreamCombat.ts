// Astral dream combat — psychic battles fought in the dream plane with different rules.

export type DreamTerrain = 'memory_palace' | 'nightmare_scape' | 'abstract_void' | 'symbolic_arena' | 'shared_dream';

export interface DreamRule { name: string; effect: string; }
export interface DreamAttack { name: string; stat: string; damage: string; effect: string; }

export interface DreamCombatRules {
  terrain: DreamTerrain;
  description: string;
  uniqueRules: DreamRule[];
  availableAttacks: DreamAttack[];
  victoryCondition: string;
  defeatConsequence: string;
  wakeCondition: string;
}

const COMBAT_RULES: DreamCombatRules[] = [
  { terrain: 'memory_palace', description: 'The battle takes place inside someone\'s memories. The environment shifts based on emotional state.', uniqueRules: [
    { name: 'Emotional Terrain', effect: 'Happy memories = healing zones (+1d4 HP/round). Sad memories = difficult terrain. Traumatic memories = 2d6 psychic damage zones.' },
    { name: 'Memory Weapons', effect: 'Weapons are made from memories. A sword of first love. A shield of childhood safety. STR/DEX replaced by CHA/WIS.' },
    { name: 'Belief is Power', effect: 'Convince yourself you can fly, and you can. Persuasion DC 14 = gain any movement type for 1 round.' },
  ], availableAttacks: [
    { name: 'Memory Lance', stat: 'CHA', damage: '2d8 psychic', effect: 'Force the target to relive a painful memory (stunned 1 round on failed WIS save).' },
    { name: 'Forgetting Wave', stat: 'INT', damage: '1d10 psychic', effect: 'Target forgets one ability/spell for the duration (random selection, WIS save negates).' },
    { name: 'Nostalgia Shield', stat: 'WIS', damage: '0', effect: 'Reaction: reduce incoming psychic damage by 1d10 + WIS modifier (drawing on happy memories).' },
  ], victoryCondition: 'Reduce the enemy\'s dream-HP to 0 (uses WIS modifier instead of CON for HP calculation).', defeatConsequence: 'Ejected from the dream. 1d4 levels of exhaustion. Cannot re-enter for 24 hours.', wakeCondition: 'Taking 20+ damage in a single hit. Or an ally casting Dispel Magic on your sleeping body.' },
  { terrain: 'nightmare_scape', description: 'A realm of fear. The environment actively tries to terrify you. Fear is a weapon here.', uniqueRules: [
    { name: 'Fear Fuels the Enemy', effect: 'Frightened creatures give the nightmare controller +1d4 to all attacks per frightened creature.' },
    { name: 'Courage is Armor', effect: 'Immune to frightened = +3 AC in the dreamscape. Bravery is literal protection.' },
    { name: 'Transform Your Fear', effect: 'WIS DC 15 to confront your worst fear directly. Success: gain a powerful dream weapon for 3 rounds.' },
  ], availableAttacks: [
    { name: 'Terror Bolt', stat: 'CHA', damage: '3d6 psychic', effect: 'Target makes WIS save or is frightened for 1 round.' },
    { name: 'Nightmare Manifestation', stat: 'WIS', damage: '2d10 psychic', effect: 'Summon the target\'s worst fear as a creature (CR = target\'s level/4). It attacks them for 1 round.' },
    { name: 'Courage Blade', stat: 'WIS', damage: '4d6 radiant', effect: 'Only usable if you are NOT frightened. Deals radiant damage that bypasses all dream resistances.' },
  ], victoryCondition: 'Destroy the nightmare\'s core — a physical representation of fear in the dream (usually obvious and well-guarded).', defeatConsequence: 'Trapped in the nightmare for 1d4 hours (real time). Long rest provides no benefits.', wakeCondition: 'Another dreamer entering the same dream and calling your name.' },
  { terrain: 'abstract_void', description: 'Pure thought-space. No physical rules. Geometry is a suggestion. Gravity is a myth.', uniqueRules: [
    { name: 'Thought-Speed', effect: 'Initiative = INT modifier (not DEX). The smartest act first.' },
    { name: 'Conceptual Weapons', effect: 'Any concept can be a weapon. "Justice" deals 2d8 radiant. "Entropy" deals 2d8 necrotic. Must articulate the concept.' },
    { name: 'Willpower HP', effect: 'HP = WIS score × 2 in the void. CON is irrelevant. STR is irrelevant. Only mind matters.' },
  ], availableAttacks: [
    { name: 'Concept Strike', stat: 'INT', damage: '2d8 (type varies by concept)', effect: 'Name a concept. It becomes a weapon. Creativity determines damage type.' },
    { name: 'Logic Cage', stat: 'INT', damage: '0', effect: 'Trap the target in an impossible logical paradox. INT DC 16 or incapacitated for 1 round (solving the paradox).' },
    { name: 'Imagination Burst', stat: 'CHA', damage: '3d6 force', effect: '15ft burst of pure creative energy. Reshapes the terrain within the area.' },
  ], victoryCondition: 'Out-think the opponent. Reduce their willpower HP to 0 through superior mental acuity.', defeatConsequence: 'Your sense of self fragments. 1d4 hours of confusion upon waking. WIS saves at disadvantage for 24 hours.', wakeCondition: 'Physical pain to the sleeping body. Or the dreamer simply choosing to wake (free action, but the enemy gets an opportunity attack).' },
];

export function getRandomDreamCombat(): DreamCombatRules {
  return COMBAT_RULES[Math.floor(Math.random() * COMBAT_RULES.length)];
}

export function getDreamCombatByTerrain(terrain: DreamTerrain): DreamCombatRules | undefined {
  return COMBAT_RULES.find((c) => c.terrain === terrain);
}

export function getAllDreamTerrains(): DreamTerrain[] {
  return COMBAT_RULES.map((c) => c.terrain);
}

export function getAttackCount(combat: DreamCombatRules): number {
  return combat.availableAttacks.length;
}

export function formatDreamCombat(combat: DreamCombatRules): string {
  const icon = { memory_palace: '🏛️', nightmare_scape: '😱', abstract_void: '🌌', symbolic_arena: '⚔️', shared_dream: '💭' }[combat.terrain];
  const lines = [`${icon} **Dream Combat: ${combat.terrain.replace(/_/g, ' ')}**`];
  lines.push(`  *${combat.description}*`);
  lines.push('  **Rules:**');
  combat.uniqueRules.forEach((r) => lines.push(`    🔄 ${r.name}: ${r.effect}`));
  lines.push('  **Attacks:**');
  combat.availableAttacks.forEach((a) => lines.push(`    ⚔️ ${a.name} (${a.stat}): ${a.damage} — ${a.effect}`));
  lines.push(`  🏆 Victory: ${combat.victoryCondition}`);
  lines.push(`  💀 Defeat: ${combat.defeatConsequence}`);
  return lines.join('\n');
}

export { COMBAT_RULES as DREAM_COMBAT_RULES };
