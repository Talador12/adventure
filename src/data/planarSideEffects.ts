// Random planar travel side effects — what happens to travelers between planes.

export type PlaneDestination = 'feywild' | 'shadowfell' | 'elemental' | 'abyss' | 'celestial' | 'astral' | 'ethereal' | 'mechanus';

export interface PlanarSideEffect {
  destination: PlaneDestination;
  name: string;
  description: string;
  mechanicalEffect: string;
  duration: string;
  saveDC: number | null;
  saveType: string | null;
}

const EFFECTS: PlanarSideEffect[] = [
  { destination: 'feywild', name: 'Time Slip', description: 'Time moves differently in the Feywild. You return to find more time has passed than expected.', mechanicalEffect: '1d10 days pass on the Material Plane for every day spent in the Feywild.', duration: 'Permanent (time lost)', saveDC: null, saveType: null },
  { destination: 'feywild', name: 'Fey Touched', description: 'The Feywild\'s magic clings to you. Your eyes gain a slight luminescence.', mechanicalEffect: 'Advantage on CHA saves vs fey. Disadvantage on saves vs charm from non-fey (easily enchanted).', duration: '1d4 weeks', saveDC: 14, saveType: 'CHA' },
  { destination: 'shadowfell', name: 'Lingering Despair', description: 'The Shadowfell\'s gloom follows you home. Colors seem muted. Joy feels distant.', mechanicalEffect: '-2 to CHA checks. Immune to being frightened (you\'ve seen worse).', duration: '1d4 weeks', saveDC: 13, saveType: 'WIS' },
  { destination: 'shadowfell', name: 'Shadow Taint', description: 'Your shadow is darker than it should be. It sometimes moves on its own.', mechanicalEffect: 'Advantage on Stealth in dim light. Radiant damage vulnerability.', duration: '1d4 weeks', saveDC: 14, saveType: 'CON' },
  { destination: 'elemental', name: 'Elemental Residue', description: 'The plane\'s element clings to your body. You radiate its energy.', mechanicalEffect: 'Resistance to the plane\'s element. Vulnerability to the opposing element.', duration: '1 week', saveDC: null, saveType: null },
  { destination: 'abyss', name: 'Abyssal Whispers', description: 'Demonic whispers linger in your mind. They suggest terrible things.', mechanicalEffect: 'WIS save DC 12 each dawn or act selfishly for 1 hour. +2 to Intimidation.', duration: '2d4 weeks', saveDC: 15, saveType: 'WIS' },
  { destination: 'celestial', name: 'Celestial Glow', description: 'A faint golden aura surrounds you. Undead are uncomfortable near you.', mechanicalEffect: 'Undead within 10ft have disadvantage on attacks against you. Fiends can sense you at 100ft.', duration: '1d4 days', saveDC: null, saveType: null },
  { destination: 'astral', name: 'Time Displacement', description: 'You didn\'t age while astral projecting, but your body remembers the missing time strangely.', mechanicalEffect: 'No need to eat/drink for 1d4 days (astral sustenance lingers). Dreams are vivid and prophetic.', duration: '1d4 days', saveDC: null, saveType: null },
  { destination: 'ethereal', name: 'Phase Flicker', description: 'You occasionally become partially transparent. Objects pass through your hand.', mechanicalEffect: '10% chance per hour of dropping held objects (phase flicker). Can see into the Ethereal Plane dimly.', duration: '1d4 days', saveDC: 12, saveType: 'CON' },
  { destination: 'mechanus', name: 'Clockwork Mind', description: 'Your thoughts become orderly. Disturbingly orderly. You organize your belongings by size.', mechanicalEffect: '+2 to INT checks. Cannot act chaotically (DM adjudicates). Compulsion to organize.', duration: '1d4 days', saveDC: 13, saveType: 'WIS' },
];

export function getRandomSideEffect(destination?: PlaneDestination): PlanarSideEffect {
  const pool = destination ? EFFECTS.filter((e) => e.destination === destination) : EFFECTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getEffectsByDestination(destination: PlaneDestination): PlanarSideEffect[] {
  return EFFECTS.filter((e) => e.destination === destination);
}

export function getEffectsRequiringSave(): PlanarSideEffect[] {
  return EFFECTS.filter((e) => e.saveDC !== null);
}

export function getAllDestinations(): PlaneDestination[] {
  return [...new Set(EFFECTS.map((e) => e.destination))];
}

export function formatSideEffect(effect: PlanarSideEffect): string {
  const icon = { feywild: '🌸', shadowfell: '🌑', elemental: '🔥', abyss: '👹', celestial: '✨', astral: '🌌', ethereal: '👻', mechanus: '⚙️' }[effect.destination];
  const lines = [`${icon} **${effect.name}** *(${effect.destination})*`];
  lines.push(`  *${effect.description}*`);
  lines.push(`  ⚙️ ${effect.mechanicalEffect}`);
  lines.push(`  ⏱️ Duration: ${effect.duration}`);
  if (effect.saveDC) lines.push(`  Save: ${effect.saveType} DC ${effect.saveDC}`);
  return lines.join('\n');
}

export { EFFECTS as PLANAR_SIDE_EFFECTS };
