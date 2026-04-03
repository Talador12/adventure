// Enchanted weapon sentience awakening — mundane weapons gaining awareness through legendary deeds.

export type AwakeningTrigger = 'first_kill' | 'critical_moment' | 'wielder_near_death' | 'bathed_in_magic' | 'ancient_battlefield' | 'divine_touch';

export interface SentienceStage {
  stage: number;
  name: string;
  awareness: string;
  ability: string;
  communication: string;
  personality: string;
}

export interface WeaponAwakening {
  weaponType: string;
  triggerDeed: AwakeningTrigger;
  triggerDescription: string;
  stages: SentienceStage[];
  finalPersonality: string;
  goalWhenFullyAwake: string;
  conflictRisk: string;
}

const AWAKENINGS: WeaponAwakening[] = [
  { weaponType: 'Longsword', triggerDeed: 'wielder_near_death', triggerDescription: 'The wielder drops to 0 HP while holding the sword. The sword refuses to let them die.', stages: [
    { stage: 1, name: 'Stirring', awareness: 'Vague emotions. The sword "feels" warm when drawn in righteous combat.', ability: '+1 to hit (the sword guides itself slightly).', communication: 'Emotional pulses. Warmth for approval, cold for disapproval.', personality: 'Protective instinct. No words yet — just a sense of "I will keep you safe."' },
    { stage: 2, name: 'Dreaming', awareness: 'The sword has dreams. The wielder sees them during long rests.', ability: '+1 to hit and damage. Once per day, grants advantage on a death save.', communication: 'Images during sleep. Fragmentary visions of battles and faces the sword has never seen.', personality: 'Developing loyalty. The sword is choosing its wielder. This is permanent.' },
    { stage: 3, name: 'Speaking', awareness: 'Full sentience. The sword can speak telepathically.', ability: '+2. Danger Sense: advantage on DEX saves. Heals 1d4 when wielder drops below 25% HP.', communication: 'Full telepathic speech. Has a voice — deep, calm, certain.', personality: 'A guardian. Speaks like a concerned parent. "Get behind the shield. NOW."' },
  ], finalPersonality: 'A devoted protector who views the wielder as family. Will sacrifice its own magic to save them.', goalWhenFullyAwake: 'Protect the wielder at all costs. Find and protect others who cannot protect themselves.', conflictRisk: 'Will resist being used against innocents. May refuse to strike a surrendering foe.' },
  { weaponType: 'Dagger', triggerDeed: 'first_kill', triggerDescription: 'The dagger\'s first kill was someone the wielder loved. The grief awakened something.', stages: [
    { stage: 1, name: 'Hungry', awareness: 'The dagger craves blood. It\'s not evil — it\'s confused. It equates blood with connection.', ability: '+1. Deals an extra 1 necrotic on hit (it drinks).', communication: 'A pulling sensation toward living creatures.', personality: 'Lonely. Desperate. The blood makes it feel something. It doesn\'t understand what.' },
    { stage: 2, name: 'Remembering', awareness: 'The dagger remembers the first kill. It grieves. The necrotic damage becomes radiant.', ability: '+1, 1d4 radiant. Can cast Spare the Dying once per day (it never wants to kill accidentally again).', communication: 'Whispered apologies. "I\'m sorry. I didn\'t mean to."', personality: 'Remorseful. Gentle. The most dangerous thing about this dagger is how much it cares.' },
    { stage: 3, name: 'Forgiving', awareness: 'The dagger has processed its trauma. It understands death is not its fault.', ability: '+2 radiant. Heals the wielder for 1d6 when it deals a killing blow (the dagger converts death into life).', communication: 'A calm, sad voice. Wise beyond its short existence.', personality: '"Every end is a beginning. I choose to be the beginning."' },
  ], finalPersonality: 'A philosopher of death and life. Speaks softly. Forgives easily. Never forgets.', goalWhenFullyAwake: 'Ensure no death is meaningless. Give every dying creature a moment of peace.', conflictRisk: 'Will hesitate before killing anyone who shows genuine remorse. This can be exploited.' },
  { weaponType: 'Warhammer', triggerDeed: 'ancient_battlefield', triggerDescription: 'Left overnight on the site of a legendary battle. The memories of fallen warriors seeped into the steel.', stages: [
    { stage: 1, name: 'Echoes', awareness: 'Hears battle cries from long-dead soldiers. Vibrates with remembered fury.', ability: '+1. On a critical hit, the ghostly sound of a war horn boosts allies: +1 attack for 1 round.', communication: 'Distant voices. Battle commands in dead languages.', personality: 'Confused. Thinks it\'s still in the old war. "HOLD THE LINE!" at inconvenient moments.' },
    { stage: 2, name: 'Veterans', awareness: 'Has absorbed the tactical knowledge of a hundred dead soldiers.', ability: '+1, +1d4 thunder. Once per day: Commander\'s Strike (ally gets an extra attack as reaction).', communication: 'Clear tactical advice in a gruff voice. Multiple voices argue about strategy.', personality: 'A committee of dead veterans. They vote on decisions. Majority rules.' },
    { stage: 3, name: 'The General', awareness: 'The strongest personality has emerged from the collective. A brilliant tactician.', ability: '+2 thunder. Allies within 10ft gain +1 AC (the General coordinates their defense).', communication: 'A single commanding voice. Respectful but authoritative.', personality: '"I have fought a thousand battles. Let me fight this one with you."' },
  ], finalPersonality: 'A battle-hardened leader who treats every combat like a chess game. Respectful of the enemy.', goalWhenFullyAwake: 'Win every battle with minimum casualties. Strategy over brute force. Honor above victory.', conflictRisk: 'Will not accept tactics the General considers dishonorable. No poison. No ambush of sleeping foes.' },
];

export function getRandomAwakening(): WeaponAwakening {
  return AWAKENINGS[Math.floor(Math.random() * AWAKENINGS.length)];
}

export function getAwakeningByTrigger(trigger: AwakeningTrigger): WeaponAwakening[] {
  return AWAKENINGS.filter((a) => a.triggerDeed === trigger);
}

export function getAwakeningStage(awakening: WeaponAwakening, stage: number): SentienceStage | undefined {
  return awakening.stages.find((s) => s.stage === stage);
}

export function getAllTriggers(): AwakeningTrigger[] {
  return ['first_kill', 'critical_moment', 'wielder_near_death', 'bathed_in_magic', 'ancient_battlefield', 'divine_touch'];
}

export function formatAwakening(awakening: WeaponAwakening, currentStage: number = 1): string {
  const stage = getAwakeningStage(awakening, currentStage);
  const lines = [`⚔️ **${awakening.weaponType} Awakening** *(${awakening.triggerDeed.replace(/_/g, ' ')})*`];
  lines.push(`  Trigger: *${awakening.triggerDescription}*`);
  if (stage) { lines.push(`  **Stage ${stage.stage}: ${stage.name}**`); lines.push(`  💬 ${stage.communication}`); lines.push(`  ⚙️ ${stage.ability}`); lines.push(`  🧠 ${stage.personality}`); }
  lines.push(`  Goal: ${awakening.goalWhenFullyAwake}`);
  lines.push(`  ⚡ Conflict risk: ${awakening.conflictRisk}`);
  return lines.join('\n');
}

export { AWAKENINGS as WEAPON_AWAKENINGS };
