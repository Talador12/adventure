// Magical tattoo system — inkwork that grants abilities with attunement and upgrade paths.

export type TattooRarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type TattooLocation = 'arm' | 'back' | 'chest' | 'face' | 'hand' | 'leg';

export interface TattooUpgrade {
  level: number;
  name: string;
  effect: string;
  inkCost: number;
  requirement: string;
}

export interface MagicalTattoo {
  name: string;
  rarity: TattooRarity;
  location: TattooLocation;
  description: string;
  baseEffect: string;
  attunement: boolean;
  inkCost: number;
  applicationTime: string;
  applicationDC: number;
  upgrades: TattooUpgrade[];
}

const TATTOOS: MagicalTattoo[] = [
  { name: 'Barrier Tattoo', rarity: 'uncommon', location: 'chest', description: 'Interlocking geometric patterns that shimmer when struck.', baseEffect: 'AC 12 + DEX modifier while unarmored. Stacks with shield.', attunement: true, inkCost: 200, applicationTime: '4 hours', applicationDC: 14, upgrades: [
    { level: 2, name: 'Reinforced', effect: 'AC 14 + DEX (max 2).', inkCost: 400, requirement: 'Survive 10 hits while tattoo is active.' },
    { level: 3, name: 'Aegis', effect: 'AC 16. Resistance to one damage type (chosen at upgrade).', inkCost: 1000, requirement: 'Take 100+ damage in a single combat and survive.' },
  ]},
  { name: 'Shadow Mark', rarity: 'rare', location: 'hand', description: 'Black ink that seems to move when not directly observed.', baseEffect: 'Advantage on Stealth in dim light or darkness.', attunement: true, inkCost: 500, applicationTime: '6 hours', applicationDC: 16, upgrades: [
    { level: 2, name: 'Umbral Step', effect: 'Misty Step (darkness only) 2/day.', inkCost: 800, requirement: 'Successfully hide from a creature with darkvision 5 times.' },
    { level: 3, name: 'One with Shadow', effect: 'Invisibility (darkness only) 1/day. Darkvision 120ft.', inkCost: 1500, requirement: 'Spend 24 cumulative hours in complete darkness.' },
  ]},
  { name: 'Flame Serpent', rarity: 'uncommon', location: 'arm', description: 'A coiling serpent of red and orange ink that radiates warmth.', baseEffect: 'Unarmed strikes deal +1d4 fire damage. Fire resistance.', attunement: true, inkCost: 300, applicationTime: '4 hours', applicationDC: 14, upgrades: [
    { level: 2, name: 'Inferno Coil', effect: 'Burning Hands (2nd level) 2/day. Fire immunity replaces resistance.', inkCost: 600, requirement: 'Deal 50+ fire damage total using the tattoo.' },
    { level: 3, name: 'Dragon\'s Breath', effect: 'Fireball (3rd level) 1/day. Unarmed fire damage becomes 2d4.', inkCost: 1200, requirement: 'Survive being submerged in lava or hit by a dragon\'s breath.' },
  ]},
  { name: 'Third Eye', rarity: 'rare', location: 'face', description: 'A stylized eye on the forehead, pupils shifting colors.', baseEffect: 'Detect Magic at will (no concentration required).', attunement: true, inkCost: 400, applicationTime: '8 hours', applicationDC: 16, upgrades: [
    { level: 2, name: 'Sight Beyond', effect: 'See Invisibility 1/day. +2 to Arcana checks.', inkCost: 700, requirement: 'Identify 20 different magical items or effects.' },
    { level: 3, name: 'Omniscient Gaze', effect: 'Truesight 30ft for 1 minute, 1/day.', inkCost: 1500, requirement: 'See through a major illusion that fooled everyone else.' },
  ]},
  { name: 'Iron Root', rarity: 'common', location: 'leg', description: 'Roots and vines winding down both legs in deep green ink.', baseEffect: 'Cannot be knocked prone against your will. +5 speed.', attunement: false, inkCost: 100, applicationTime: '2 hours', applicationDC: 12, upgrades: [
    { level: 2, name: 'Deep Roots', effect: 'Advantage on saves vs forced movement. +10 speed.', inkCost: 250, requirement: 'Walk 100 miles with the tattoo.' },
  ]},
  { name: 'Eldritch Script', rarity: 'legendary', location: 'back', description: 'Alien text in silver ink that no mortal language can read. The ink moves when you\'re not looking.', baseEffect: '+1 to spell save DC and spell attack rolls.', attunement: true, inkCost: 2000, applicationTime: '12 hours', applicationDC: 20, upgrades: [
    { level: 2, name: 'Living Grimoire', effect: '+2 to spell save DC/attack. Learn one extra spell from any class.', inkCost: 5000, requirement: 'Cast 100 spells while the tattoo is active.' },
    { level: 3, name: 'Arcane Apotheosis', effect: '+3 to spell save DC/attack. Once per day, cast a spell without expending a slot (up to 5th level).', inkCost: 10000, requirement: 'Successfully counterspell a 9th-level spell.' },
  ]},
];

export function getRandomTattoo(): MagicalTattoo {
  return TATTOOS[Math.floor(Math.random() * TATTOOS.length)];
}

export function getTattoosByRarity(rarity: TattooRarity): MagicalTattoo[] {
  return TATTOOS.filter((t) => t.rarity === rarity);
}

export function getTattoosByLocation(location: TattooLocation): MagicalTattoo[] {
  return TATTOOS.filter((t) => t.location === location);
}

export function getTotalUpgradeCost(tattoo: MagicalTattoo): number {
  return tattoo.inkCost + tattoo.upgrades.reduce((sum, u) => sum + u.inkCost, 0);
}

export function getMaxLevel(tattoo: MagicalTattoo): number {
  return tattoo.upgrades.length > 0 ? Math.max(...tattoo.upgrades.map((u) => u.level)) : 1;
}

export function getAllLocations(): TattooLocation[] {
  return ['arm', 'back', 'chest', 'face', 'hand', 'leg'];
}

export function formatTattoo(tattoo: MagicalTattoo, currentLevel: number = 1): string {
  const rarIcon = { common: '⚪', uncommon: '🟢', rare: '🔵', legendary: '🟣' }[tattoo.rarity];
  const lines = [`${rarIcon} **${tattoo.name}** *(${tattoo.rarity}, ${tattoo.location}${tattoo.attunement ? ', attunement' : ''})*`];
  lines.push(`  *${tattoo.description}*`);
  lines.push(`  Base: ${tattoo.baseEffect}`);
  lines.push(`  Ink: ${tattoo.inkCost}gp | Time: ${tattoo.applicationTime} | DC: ${tattoo.applicationDC}`);
  if (tattoo.upgrades.length > 0) {
    lines.push('  **Upgrades:**');
    tattoo.upgrades.forEach((u) => { const active = u.level <= currentLevel ? '✅' : '🔒'; lines.push(`    ${active} Lv${u.level} ${u.name}: ${u.effect} (${u.inkCost}gp)`); });
  }
  return lines.join('\n');
}

export { TATTOOS as MAGICAL_TATTOOS };
