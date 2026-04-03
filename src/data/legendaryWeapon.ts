// Legendary weapon awakening — dormant weapons that unlock powers through specific deeds.

export type WeaponCategory = 'sword' | 'axe' | 'hammer' | 'bow' | 'staff' | 'dagger';
export type AwakeningDeed = 'slay_a_dragon' | 'defend_the_innocent' | 'kill_in_moonlight' | 'bathe_in_holy_water' | 'break_a_curse' | 'defeat_its_previous_wielder' | 'speak_its_true_name' | 'sacrifice_blood';

export interface WeaponStage {
  stage: number;
  name: string;
  bonus: string;
  ability: string;
  requirement: AwakeningDeed;
  description: string;
}

export interface LegendaryWeapon {
  name: string;
  category: WeaponCategory;
  lore: string;
  dormantAbility: string;
  stages: WeaponStage[];
  fullyAwakenedBonus: string;
  personality: string;
  alignment: 'good' | 'neutral' | 'evil';
}

const WEAPONS: LegendaryWeapon[] = [
  {
    name: 'Dawnbreaker',
    category: 'sword',
    lore: 'Forged from a shard of the first sunrise. It hums faintly at dawn. Once wielded by a saint who died fighting darkness.',
    dormantAbility: '+1 longsword. Sheds dim light 10ft in darkness.',
    stages: [
      { stage: 1, name: 'First Light', bonus: '+1, 1d4 radiant on hit', ability: 'Sheds bright light 20ft on command.', requirement: 'defend_the_innocent', description: 'Defend an innocent life in mortal danger.' },
      { stage: 2, name: 'Blazing Dawn', bonus: '+2, 1d6 radiant on hit', ability: 'Once per day, Daylight spell centered on the blade.', requirement: 'break_a_curse', description: 'Use the weapon to end a curse afflicting another.' },
      { stage: 3, name: 'Fully Awakened', bonus: '+3, 2d6 radiant on hit vs undead/fiends', ability: 'Sunburst once per week (8th level). Wielder immune to fear.', requirement: 'slay_a_dragon', description: 'Slay a creature of CR 10+ that threatens the innocent.' },
    ],
    fullyAwakenedBonus: '+3 longsword. 2d6 radiant vs undead/fiends. Sunburst 1/week. Fear immunity.',
    personality: 'Noble and encouraging. Whispers words of courage before battle. Disapproves of cruelty.',
    alignment: 'good',
  },
  {
    name: 'Voidfang',
    category: 'dagger',
    lore: 'A blade that drinks light. Found in a dead god\'s pocket dimension. It wants to go back — and take you with it.',
    dormantAbility: '+1 dagger. Blade is invisible in darkness.',
    stages: [
      { stage: 1, name: 'Shadow Kiss', bonus: '+1, +1d4 necrotic in dim light or darkness', ability: 'Advantage on Stealth in darkness.', requirement: 'kill_in_moonlight', description: 'Kill a sentient creature under moonlight.' },
      { stage: 2, name: 'Void Embrace', bonus: '+2, +1d6 necrotic', ability: 'Misty Step (bonus action, darkness only) 3/day.', requirement: 'defeat_its_previous_wielder', description: 'Defeat the ghost of a previous wielder who comes to reclaim it.' },
      { stage: 3, name: 'Fully Awakened', bonus: '+3, +2d6 necrotic', ability: 'Plane Shift to Shadowfell 1/week. See in magical darkness.', requirement: 'sacrifice_blood', description: 'Sacrifice 20 HP willingly (no healing for 24 hours) during a new moon.' },
    ],
    fullyAwakenedBonus: '+3 dagger. 2d6 necrotic. Misty Step 3/day. Plane Shift 1/week. Sees through magical darkness.',
    personality: 'Whispers darkly. Sarcastic. Surprisingly loyal once bonded. Judges weakness harshly.',
    alignment: 'neutral',
  },
  {
    name: 'Stormcaller',
    category: 'hammer',
    lore: 'Carved from the heartwood of a tree struck by divine lightning. Thunder rolls in the distance when you grip the handle.',
    dormantAbility: '+1 warhammer. Thunder damage instead of bludgeoning.',
    stages: [
      { stage: 1, name: 'Rumbling', bonus: '+1, thunder damage', ability: 'Thunderwave (1st level) on crit, no spell slot.', requirement: 'defend_the_innocent', description: 'Protect someone weaker during a storm.' },
      { stage: 2, name: 'Thunderstrike', bonus: '+2, +1d6 thunder/lightning', ability: 'Call Lightning (3rd level) once per long rest.', requirement: 'speak_its_true_name', description: 'Learn the hammer\'s true name from a storm giant or ancient text.' },
      { stage: 3, name: 'Fully Awakened', bonus: '+3, +2d6 lightning', ability: 'Control Weather 1/week. Immune to lightning damage.', requirement: 'slay_a_dragon', description: 'Slay a dragon (any type) in single combat.' },
    ],
    fullyAwakenedBonus: '+3 warhammer. 2d6 lightning. Call Lightning 1/day. Control Weather 1/week. Lightning immunity.',
    personality: 'Boisterous and enthusiastic. Loves battle. Gets bored during social encounters.',
    alignment: 'good',
  },
  {
    name: 'Whisperwind',
    category: 'bow',
    lore: 'Strung with the hair of a goddess of the hunt. Arrows fired from it make no sound. Neither does the wielder.',
    dormantAbility: '+1 longbow. Arrows are silent (no sound on impact).',
    stages: [
      { stage: 1, name: 'Silent Hunter', bonus: '+1, silent arrows', ability: 'Advantage on Stealth while holding the bow.', requirement: 'kill_in_moonlight', description: 'Make a kill shot from 100+ feet under a full moon.' },
      { stage: 2, name: 'Ghost Arrow', bonus: '+2, arrows pass through non-magical cover', ability: 'Seeking Arrow 1/day (arrow curves around obstacles).', requirement: 'speak_its_true_name', description: 'Meditate in the sacred grove where the goddess once hunted.' },
      { stage: 3, name: 'Fully Awakened', bonus: '+3, arrows phase through walls (60ft max)', ability: 'Arrow of Slaying (one target type) crafted 1/month.', requirement: 'defeat_its_previous_wielder', description: 'Outshoot the ghostly champion who last wielded the bow.' },
    ],
    fullyAwakenedBonus: '+3 longbow. Phase arrows. Seeking Arrow 1/day. Arrow of Slaying 1/month. Perfect silence.',
    personality: 'Patient and serene. Speaks rarely but wisely. Despises wasted shots.',
    alignment: 'neutral',
  },
];

export function getRandomLegendaryWeapon(): LegendaryWeapon {
  return WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
}

export function getWeaponByCategory(category: WeaponCategory): LegendaryWeapon[] {
  return WEAPONS.filter((w) => w.category === category);
}

export function getWeaponStage(weapon: LegendaryWeapon, stage: number): WeaponStage | undefined {
  return weapon.stages.find((s) => s.stage === stage);
}

export function getNextDeed(weapon: LegendaryWeapon, currentStage: number): AwakeningDeed | null {
  const next = weapon.stages.find((s) => s.stage === currentStage + 1);
  return next?.requirement ?? null;
}

export function getAllCategories(): WeaponCategory[] {
  return [...new Set(WEAPONS.map((w) => w.category))];
}

export function formatLegendaryWeapon(weapon: LegendaryWeapon, currentStage: number = 0): string {
  const icon = { sword: '⚔️', axe: '🪓', hammer: '🔨', bow: '🏹', staff: '🪄', dagger: '🗡️' }[weapon.category];
  const lines = [`${icon} **${weapon.name}** *(${weapon.category}, ${weapon.alignment})*`];
  lines.push(`  *${weapon.lore}*`);
  if (currentStage === 0) { lines.push(`  Dormant: ${weapon.dormantAbility}`); }
  else { const stage = getWeaponStage(weapon, currentStage); if (stage) lines.push(`  **Stage ${stage.stage}: ${stage.name}** — ${stage.bonus} | ${stage.ability}`); }
  const nextDeed = getNextDeed(weapon, currentStage);
  if (nextDeed) lines.push(`  Next awakening: *${nextDeed.replace(/_/g, ' ')}*`);
  lines.push(`  💬 Personality: ${weapon.personality}`);
  return lines.join('\n');
}

export { WEAPONS as LEGENDARY_WEAPONS };
