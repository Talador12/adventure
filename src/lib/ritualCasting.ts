// Ritual casting tracker — spells castable as rituals (10 min, no slot).
// Only classes with Ritual Casting feature can use this.

export const RITUAL_CASTER_CLASSES = ['Wizard', 'Cleric', 'Druid', 'Bard', 'Artificer'];

export interface RitualSpell {
  name: string;
  level: number;
  castTime: string;
  description: string;
}

export const RITUAL_SPELLS: RitualSpell[] = [
  { name: 'Detect Magic', level: 1, castTime: '10 min', description: 'Sense magic within 30ft for 10 minutes.' },
  { name: 'Identify', level: 1, castTime: '10 min', description: 'Learn properties of a magic item or object.' },
  { name: 'Find Familiar', level: 1, castTime: '1 hour', description: 'Summon a familiar spirit.' },
  { name: 'Comprehend Languages', level: 1, castTime: '10 min', description: 'Understand any spoken/written language.' },
  { name: 'Speak with Animals', level: 1, castTime: '10 min', description: 'Communicate with beasts for 10 minutes.' },
  { name: 'Detect Poison and Disease', level: 1, castTime: '10 min', description: 'Sense poison/disease within 30ft.' },
  { name: 'Purify Food and Drink', level: 1, castTime: '10 min', description: 'Remove poison/disease from food/water.' },
  { name: 'Augury', level: 2, castTime: '10 min', description: 'Receive an omen about a planned action.' },
  { name: 'Gentle Repose', level: 2, castTime: '10 min', description: 'Preserve a corpse, extend resurrection time.' },
  { name: 'Silence', level: 2, castTime: '10 min', description: 'Create a 20ft sphere of silence.' },
  { name: 'Water Breathing', level: 3, castTime: '10 min', description: 'Up to 10 creatures breathe underwater for 24h.' },
  { name: 'Tiny Hut', level: 3, castTime: '10 min', description: 'Create an immovable dome shelter for 8 hours.' },
  { name: 'Phantom Steed', level: 3, castTime: '10 min', description: 'Summon a spectral horse (speed 100ft) for 1 hour.' },
  { name: 'Commune', level: 5, castTime: '10 min', description: 'Ask your deity 3 yes/no questions.' },
  { name: 'Contact Other Plane', level: 5, castTime: '10 min', description: 'Ask an entity 5 questions (INT DC 15 or take 6d6 psychic).' },
  { name: 'Rary\'s Telepathic Bond', level: 5, castTime: '10 min', description: 'Up to 8 creatures share telepathy for 1 hour.' },
  { name: 'Forbiddance', level: 6, castTime: '10 min', description: 'Ward an area vs planar travel + damage to specific types.' },
];

export function canRitualCast(charClass: string): boolean {
  return RITUAL_CASTER_CLASSES.includes(charClass);
}

export function getRitualSpellsByLevel(maxLevel: number): RitualSpell[] {
  return RITUAL_SPELLS.filter((s) => s.level <= maxLevel);
}

export function getSpellSlotLevel(charClass: string, charLevel: number): number {
  // Simplified: full casters get level/2 max spell level, half-casters get level/4
  const halfCasters = ['Paladin', 'Ranger', 'Artificer'];
  const divisor = halfCasters.includes(charClass) ? 4 : 2;
  return Math.min(9, Math.max(1, Math.ceil(charLevel / divisor)));
}

export function formatRitualSpells(charClass: string, charLevel: number): string {
  if (!canRitualCast(charClass)) return `📜 ${charClass} cannot cast rituals.`;
  const maxLevel = getSpellSlotLevel(charClass, charLevel);
  const available = getRitualSpellsByLevel(maxLevel);
  const lines = [`📜 **Ritual Spells** (${charClass} Lv ${charLevel}, up to ${maxLevel}th level):`];
  for (const s of available) lines.push(`  • **${s.name}** (Lv ${s.level}, ${s.castTime}): ${s.description}`);
  lines.push(`\n*Ritual casting adds 10 minutes to cast time but uses no spell slot.*`);
  return lines.join('\n');
}
