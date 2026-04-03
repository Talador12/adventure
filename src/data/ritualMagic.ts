// Ritual magic circles — collaborative casting with multiple spellcasters for powerful effects.

export type RitualSchool = 'abjuration' | 'conjuration' | 'divination' | 'evocation' | 'necromancy' | 'transmutation';

export interface RitualCircle {
  name: string;
  school: RitualSchool;
  minCasters: number;
  maxCasters: number;
  castingTime: string;
  materialCost: number; // gold
  dc: number; // Arcana/Religion check DC per caster
  effect: string;
  failureConsequence: string;
  boostPerExtraCaster: string; // bonus for each caster beyond minimum
}

const RITUALS: RitualCircle[] = [
  {
    name: 'Circle of Warding',
    school: 'abjuration',
    minCasters: 2,
    maxCasters: 5,
    castingTime: '1 hour',
    materialCost: 100,
    dc: 14,
    effect: 'Creates a permanent protective ward over a 100ft radius. Fiends, undead, and fey cannot enter without WIS DC 18 save.',
    failureConsequence: 'The ward inverts — creatures it should repel are drawn to the area for 24 hours.',
    boostPerExtraCaster: '+20ft radius and +1 to the ward DC per extra caster.',
  },
  {
    name: 'Planar Beacon',
    school: 'conjuration',
    minCasters: 3,
    maxCasters: 7,
    castingTime: '4 hours',
    materialCost: 500,
    dc: 16,
    effect: 'Opens a stable portal to a plane of the casters\' choice for 1 hour. Two-way travel.',
    failureConsequence: 'Portal opens to a random plane instead. Something comes through before it collapses.',
    boostPerExtraCaster: '+30 minutes duration and +1 to DC for controlling destination.',
  },
  {
    name: 'Eyes of the Oracle',
    school: 'divination',
    minCasters: 2,
    maxCasters: 4,
    castingTime: '30 minutes',
    materialCost: 50,
    dc: 13,
    effect: 'All participants receive a true vision of one event in the past, present, or future (DM chooses specificity).',
    failureConsequence: 'The vision is a lie — a deliberate deception planted by an opposing force.',
    boostPerExtraCaster: 'Additional question/vision per extra caster.',
  },
  {
    name: 'Storm of Judgement',
    school: 'evocation',
    minCasters: 3,
    maxCasters: 6,
    castingTime: '10 minutes',
    materialCost: 200,
    dc: 15,
    effect: 'A 300ft radius storm of lightning and fire. All hostile creatures take 8d6 lightning + 8d6 fire damage (DEX DC 17 half).',
    failureConsequence: 'The storm centers on the casters instead. Full damage to the ritual circle.',
    boostPerExtraCaster: '+2d6 damage per extra caster and +1 to the save DC.',
  },
  {
    name: 'Resurrection Circle',
    school: 'necromancy',
    minCasters: 3,
    maxCasters: 5,
    castingTime: '8 hours',
    materialCost: 1000,
    dc: 17,
    effect: 'Resurrects a creature dead up to 1 year. No material body needed — the soul is recalled from the afterlife.',
    failureConsequence: 'Something else comes back in the body instead. Looks and sounds right... for a while.',
    boostPerExtraCaster: 'Extends time limit by +1 year and reduces exhaustion levels on revival by 1.',
  },
  {
    name: 'Chrysalis of Becoming',
    school: 'transmutation',
    minCasters: 2,
    maxCasters: 4,
    castingTime: '2 hours',
    materialCost: 300,
    dc: 15,
    effect: 'Permanently transforms a willing creature into another form of equal or lesser CR. Retains mind and memories.',
    failureConsequence: 'Partial transformation — chimeric features, random ability score changes, CON save DC 15 or 2d6 levels of exhaustion.',
    boostPerExtraCaster: 'Can increase CR limit by +1 per extra caster.',
  },
  {
    name: 'Leyline Tap',
    school: 'evocation',
    minCasters: 2,
    maxCasters: 8,
    castingTime: '1 hour',
    materialCost: 150,
    dc: 14,
    effect: 'All participating casters recover all spell slots up to 5th level. Once per week per location.',
    failureConsequence: 'The leyline surges — wild magic surge for every caster simultaneously.',
    boostPerExtraCaster: '+1 maximum spell slot level recovered per extra caster (up to 9th).',
  },
  {
    name: 'Memory Vault',
    school: 'divination',
    minCasters: 2,
    maxCasters: 3,
    castingTime: '1 hour',
    materialCost: 75,
    dc: 12,
    effect: 'Stores a memory, secret, or piece of knowledge in a physical object. Anyone touching the object can experience the memory.',
    failureConsequence: 'The memory is erased from the casters\' minds entirely. Only the (failed) object retains fragments.',
    boostPerExtraCaster: 'Can store additional memories (1 per caster).',
  },
];

export function getRandomRitual(): RitualCircle {
  return RITUALS[Math.floor(Math.random() * RITUALS.length)];
}

export function getRitualsBySchool(school: RitualSchool): RitualCircle[] {
  return RITUALS.filter((r) => r.school === school);
}

export function getRitualsByMinCasters(maxAvailable: number): RitualCircle[] {
  return RITUALS.filter((r) => r.minCasters <= maxAvailable);
}

export function calculateRitualDC(ritual: RitualCircle, casterCount: number): number {
  // More casters slightly lower the individual DC (shared burden)
  const extraCasters = Math.max(0, casterCount - ritual.minCasters);
  return Math.max(5, ritual.dc - Math.floor(extraCasters / 2));
}

export function getAllRitualSchools(): RitualSchool[] {
  return [...new Set(RITUALS.map((r) => r.school))];
}

export function formatRitual(ritual: RitualCircle): string {
  const icon = { abjuration: '🛡️', conjuration: '🌀', divination: '👁️', evocation: '⚡', necromancy: '💀', transmutation: '🔄' }[ritual.school];
  const lines = [`${icon} **${ritual.name}** *(${ritual.school})*`];
  lines.push(`  Casters: ${ritual.minCasters}-${ritual.maxCasters} | Time: ${ritual.castingTime} | Cost: ${ritual.materialCost}gp | DC: ${ritual.dc}`);
  lines.push(`  *Effect:* ${ritual.effect}`);
  lines.push(`  *Failure:* ⚠️ ${ritual.failureConsequence}`);
  lines.push(`  *Per extra caster:* ${ritual.boostPerExtraCaster}`);
  return lines.join('\n');
}

export { RITUALS };
