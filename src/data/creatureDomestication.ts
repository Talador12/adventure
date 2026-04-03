// Magical creature domestication — taming wild magical beasts with patience and skill checks.

export type DomesticationDifficulty = 'easy' | 'moderate' | 'hard' | 'legendary';
export type CreatureTemperament = 'docile' | 'skittish' | 'aggressive' | 'proud' | 'curious';

export interface DomesticationStage { stage: number; name: string; dc: number; skill: string; timeRequired: string; description: string; }

export interface DomesticableCreature {
  name: string;
  cr: number;
  temperament: CreatureTemperament;
  difficulty: DomesticationDifficulty;
  stages: DomesticationStage[];
  domesticatedBenefit: string;
  failureConsequence: string;
  favoriteFood: string;
  dealBreaker: string;
}

const CREATURES: DomesticableCreature[] = [
  { name: 'Blink Dog', cr: 0.25, temperament: 'curious', difficulty: 'easy', stages: [
    { stage: 1, name: 'Approach', dc: 10, skill: 'Animal Handling', timeRequired: '1 hour', description: 'Let it come to you. Don\'t make sudden movements. It blinks in and out, testing you.' },
    { stage: 2, name: 'Trust', dc: 12, skill: 'Animal Handling', timeRequired: '3 days', description: 'Feed it daily at the same spot. It begins waiting for you.' },
    { stage: 3, name: 'Bond', dc: 13, skill: 'Animal Handling', timeRequired: '1 week', description: 'It blinks TO you when startled. You\'re its safe place now.' },
  ], domesticatedBenefit: 'Loyal companion. Can blink 15ft as reaction (carrying rider). Advantage on Perception for the pair.', failureConsequence: 'Blinks away permanently. May return in 1d4 months if conditions change.', favoriteFood: 'Phase spiders. Yes, really. It\'s a predator-prey thing.', dealBreaker: 'Cages. Blink Dogs teleport out of cages and never forgive the attempt.' },
  { name: 'Owlbear Cub', cr: 1, temperament: 'aggressive', difficulty: 'moderate', stages: [
    { stage: 1, name: 'Survive the Meeting', dc: 14, skill: 'Animal Handling', timeRequired: '1 day', description: 'The cub attacks on sight. You must subdue without harming it (non-lethal only).' },
    { stage: 2, name: 'Establish Dominance', dc: 15, skill: 'Athletics or Intimidation', timeRequired: '1 week', description: 'It needs to see you as the alpha. Feed it. Protect it. Be larger (or act larger).' },
    { stage: 3, name: 'Loyalty', dc: 14, skill: 'Animal Handling', timeRequired: '1 month', description: 'It follows you. It growls at strangers. It sleeps at your feet. You\'re family.' },
  ], domesticatedBenefit: 'Combat mount (Medium+). Multiattack (bite + claws). Terrifying to enemies. Children love it.', failureConsequence: 'Rampages. 2d6+3 damage to the nearest creature. Flees into the wild.', favoriteFood: 'Honey. Enormous quantities of honey. Your supply budget just tripled.', dealBreaker: 'Separating it from a sibling. Owlbears bond in pairs. Take one, the other hunts you.' },
  { name: 'Pseudodragon', cr: 0.25, temperament: 'proud', difficulty: 'moderate', stages: [
    { stage: 1, name: 'Offering', dc: 13, skill: 'Persuasion', timeRequired: '1 day', description: 'Present a gift. Not food — something shiny or interesting. It judges your taste.' },
    { stage: 2, name: 'Conversation', dc: 14, skill: 'Insight', timeRequired: '3 days', description: 'It communicates through feelings and images. Learn its language. Show you care about its opinion.' },
    { stage: 3, name: 'Partnership', dc: 15, skill: 'Persuasion', timeRequired: '2 weeks', description: 'It doesn\'t serve you. It partners with you. Equal terms. This is non-negotiable.' },
  ], domesticatedBenefit: 'Telepathy 100ft. Sting (poison, sleep). Advantage on saves vs. magic (Magic Resistance shares within 10ft).', failureConsequence: 'It leaves with a telepathic image of disappointment. You feel ashamed for 1d4 hours.', favoriteFood: 'Butterfly wings dipped in honey. It has refined taste.', dealBreaker: 'Treating it as a pet instead of a partner. It\'s a person. With opinions. Respect them.' },
  { name: 'Displacer Beast Kitten', cr: 3, temperament: 'skittish', difficulty: 'hard', stages: [
    { stage: 1, name: 'Find the Real One', dc: 16, skill: 'Perception', timeRequired: '1 day', description: 'It creates displacement images constantly. You can\'t tame what you can\'t find.' },
    { stage: 2, name: 'Prove You\'re Safe', dc: 15, skill: 'Animal Handling', timeRequired: '2 weeks', description: 'Sit near it without reaching for it. Every day. For hours. It watches you watching it.' },
    { stage: 3, name: 'First Touch', dc: 16, skill: 'Animal Handling', timeRequired: '1 month', description: 'It initiates contact. A single tentacle on your hand. Don\'t flinch. Don\'t flinch.' },
    { stage: 4, name: 'Trust Complete', dc: 14, skill: 'Animal Handling', timeRequired: '2 months', description: 'It drops its displacement around you. You see its true form. No one else does.' },
  ], domesticatedBenefit: 'Displacement effect extends to rider. Two tentacle attacks. Unshakeable loyalty once earned.', failureConsequence: 'Flees. Never seen again. Holds grudges for decades.', favoriteFood: 'Fresh venison, served raw, arranged artistically. It appreciates presentation.', dealBreaker: 'Bright light. Flash a torch in its face and the relationship is over permanently.' },
];

export function getRandomCreature(): DomesticableCreature {
  return CREATURES[Math.floor(Math.random() * CREATURES.length)];
}

export function getCreaturesByDifficulty(difficulty: DomesticationDifficulty): DomesticableCreature[] {
  return CREATURES.filter((c) => c.difficulty === difficulty);
}

export function getCreaturesByTemperament(temperament: CreatureTemperament): DomesticableCreature[] {
  return CREATURES.filter((c) => c.temperament === temperament);
}

export function getTamingStageCount(creature: DomesticableCreature): number {
  return creature.stages.length;
}

export function getAllTemperaments(): CreatureTemperament[] {
  return [...new Set(CREATURES.map((c) => c.temperament))];
}

export function formatCreature(creature: DomesticableCreature): string {
  const icon = { docile: '🐑', skittish: '🐈', aggressive: '🐻', proud: '🐉', curious: '🐕' }[creature.temperament];
  const diff = { easy: '🟢', moderate: '🟡', hard: '🟠', legendary: '🔴' }[creature.difficulty];
  const lines = [`${icon} ${diff} **${creature.name}** *(CR ${creature.cr}, ${creature.temperament}, ${creature.difficulty})*`];
  creature.stages.forEach((s) => lines.push(`  Stage ${s.stage}: ${s.name} (${s.skill} DC ${s.dc}, ${s.timeRequired})`));
  lines.push(`  ✅ Tamed: ${creature.domesticatedBenefit}`);
  lines.push(`  🍖 Favorite food: ${creature.favoriteFood}`);
  lines.push(`  ❌ Deal breaker: ${creature.dealBreaker}`);
  return lines.join('\n');
}

export { CREATURES as DOMESTICABLE_CREATURES };
