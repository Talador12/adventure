// Lair effect generator — dynamic environmental hazards on initiative 20.
// DM picks a lair theme; effects trigger each round on init 20.

export type LairTheme = 'dragon' | 'undead' | 'elemental' | 'fey' | 'aberrant' | 'demonic' | 'natural';

export interface LairEffect {
  name: string;
  description: string;
  saveDC: number;
  saveAbility: string;
  damage?: string;
  condition?: string;
  area: string;
}

export interface LairThemeConfig {
  theme: LairTheme;
  name: string;
  emoji: string;
  description: string;
  effects: LairEffect[];
}

export const LAIR_THEMES: LairThemeConfig[] = [
  {
    theme: 'dragon', name: 'Dragon Lair', emoji: '🐉',
    description: 'Volcanic cavern with magma pools and unstable ceiling.',
    effects: [
      { name: 'Magma Eruption', description: 'A 10ft geyser of lava erupts from a crack in the floor.', saveDC: 15, saveAbility: 'DEX', damage: '3d6 fire', area: '10ft radius' },
      { name: 'Ceiling Collapse', description: 'Stalactites rain down in a 15ft area.', saveDC: 13, saveAbility: 'DEX', damage: '2d10 bludgeoning', area: '15ft square' },
      { name: 'Toxic Fumes', description: 'Sulfurous gas fills a 20ft area.', saveDC: 14, saveAbility: 'CON', condition: 'Poisoned for 1 round', area: '20ft sphere' },
    ],
  },
  {
    theme: 'undead', name: 'Undead Crypt', emoji: '💀',
    description: 'A desecrated crypt pulsing with necrotic energy.',
    effects: [
      { name: 'Necrotic Pulse', description: 'Dark energy ripples outward from the sarcophagus.', saveDC: 14, saveAbility: 'CON', damage: '2d6 necrotic', area: '30ft radius from center' },
      { name: 'Grasping Dead', description: 'Skeletal hands erupt from the ground.', saveDC: 13, saveAbility: 'STR', condition: 'Restrained until end of next turn', area: '10ft square' },
      { name: 'Whispers of Doom', description: 'Maddening whispers fill the crypt.', saveDC: 15, saveAbility: 'WIS', condition: 'Frightened for 1 round', area: 'Entire lair' },
    ],
  },
  {
    theme: 'elemental', name: 'Elemental Nexus', emoji: '🌊',
    description: 'A convergence point where elemental planes bleed into reality.',
    effects: [
      { name: 'Elemental Surge', description: 'A random elemental blast erupts (fire/cold/lightning/thunder).', saveDC: 14, saveAbility: 'DEX', damage: '3d8 (random element)', area: '15ft line' },
      { name: 'Gravity Shift', description: 'Gravity briefly reverses in an area.', saveDC: 12, saveAbility: 'DEX', damage: '2d6 bludgeoning (fall)', area: '20ft square' },
      { name: 'Stone Spikes', description: 'Earth spikes thrust up from the ground.', saveDC: 14, saveAbility: 'DEX', damage: '2d8 piercing', area: '10ft radius' },
    ],
  },
  {
    theme: 'fey', name: 'Fey Court', emoji: '🧚',
    description: 'A shimmering glade where reality is thin and whimsical.',
    effects: [
      { name: 'Enchanting Melody', description: 'Haunting music compels movement.', saveDC: 14, saveAbility: 'WIS', condition: 'Charmed — must use movement to dance (no other actions) for 1 round', area: 'Entire lair' },
      { name: 'Illusory Terrain', description: 'The ground shifts appearance — pits appear as solid ground.', saveDC: 13, saveAbility: 'INT', damage: '1d6 psychic (disorientation)', area: '30ft area' },
      { name: 'Thorn Eruption', description: 'Thorny vines burst from the earth.', saveDC: 12, saveAbility: 'DEX', damage: '2d6 piercing', condition: 'Difficult terrain', area: '15ft radius' },
    ],
  },
  {
    theme: 'aberrant', name: 'Aberrant Sanctum', emoji: '🐙',
    description: 'A warped space where geometry breaks and minds fray.',
    effects: [
      { name: 'Psychic Scream', description: 'A wave of alien thought assaults all minds.', saveDC: 15, saveAbility: 'INT', damage: '3d6 psychic', area: '30ft radius' },
      { name: 'Reality Warp', description: 'Space folds — two random creatures swap positions.', saveDC: 13, saveAbility: 'CHA', area: 'Two random creatures' },
      { name: 'Maddening Visions', description: 'Horrific visions paralyze the weak-willed.', saveDC: 14, saveAbility: 'WIS', condition: 'Stunned until end of next turn', area: 'One random creature' },
    ],
  },
  {
    theme: 'demonic', name: 'Abyssal Rift', emoji: '😈',
    description: 'A tear in reality leaking demonic corruption.',
    effects: [
      { name: 'Hellfire Jet', description: 'A gout of infernal fire erupts from a crack.', saveDC: 15, saveAbility: 'DEX', damage: '4d6 fire', area: '30ft line' },
      { name: 'Blood Boil', description: 'Demonic magic causes searing pain.', saveDC: 14, saveAbility: 'CON', damage: '2d8 necrotic', area: 'One random creature' },
      { name: 'Summon Dretch', description: 'A dretch claws its way out of the rift.', saveDC: 0, saveAbility: '-', area: 'Near the rift' },
    ],
  },
];

export function getLairTheme(theme: LairTheme): LairThemeConfig {
  return LAIR_THEMES.find((l) => l.theme === theme) || LAIR_THEMES[0];
}

export function rollLairEffect(theme: LairTheme): LairEffect {
  const config = getLairTheme(theme);
  return config.effects[Math.floor(Math.random() * config.effects.length)];
}

export function formatLairEffect(theme: LairTheme, effect: LairEffect): string {
  const config = getLairTheme(theme);
  const lines = [`🏰 **Lair Action (Init 20)** — ${config.emoji} ${config.name}`];
  lines.push(`**${effect.name}:** ${effect.description}`);
  if (effect.saveDC > 0) lines.push(`Save: ${effect.saveAbility} DC ${effect.saveDC}`);
  if (effect.damage) lines.push(`Damage: ${effect.damage}`);
  if (effect.condition) lines.push(`Effect: ${effect.condition}`);
  lines.push(`Area: ${effect.area}`);
  return lines.join('\n');
}
