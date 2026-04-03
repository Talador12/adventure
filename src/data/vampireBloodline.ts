// Vampire bloodline system — vampiric powers that scale with age and feeding.

export type BloodlineAge = 'fledgling' | 'neonate' | 'ancilla' | 'elder' | 'ancient';
export type BloodlinePower = 'charm' | 'shapeshifting' | 'shadow' | 'blood_magic' | 'regeneration' | 'domination';

export interface VampirePower {
  name: string;
  type: BloodlinePower;
  ageRequired: BloodlineAge;
  description: string;
  mechanicalEffect: string;
  bloodCost: number; // blood points to activate (0 = passive)
}

export interface BloodlineProfile {
  name: string;
  origin: string;
  weakness: string;
  feedingPreference: string;
  powers: VampirePower[];
  maxBloodPool: Record<BloodlineAge, number>;
}

export interface VampireState {
  bloodline: string;
  age: BloodlineAge;
  bloodPool: number;
  maxBlood: number;
  humanityScore: number; // 0-10, 0 = feral beast
  feedsThisWeek: number;
}

const BLOODLINES: BloodlineProfile[] = [
  { name: 'House Sanguine', origin: 'Descended from the first vampire, a fallen angel who drank divine blood.', weakness: 'Sunlight deals 4d6 radiant per round. Running water deals 2d6 acid.', feedingPreference: 'Willing or noble blood. Forced feeding reduces humanity.', powers: [
    { name: 'Mesmerizing Gaze', type: 'charm', ageRequired: 'fledgling', description: 'Lock eyes to charm a humanoid.', mechanicalEffect: 'Charm Person (WIS DC 13 + age bonus). Lasts 1 hour.', bloodCost: 1 },
    { name: 'Mist Form', type: 'shapeshifting', ageRequired: 'neonate', description: 'Dissolve into a cloud of crimson mist.', mechanicalEffect: 'Gaseous Form at will. Can seep through cracks. 1 minute duration.', bloodCost: 2 },
    { name: 'Blood Shield', type: 'blood_magic', ageRequired: 'ancilla', description: 'Harden your blood into an invisible barrier.', mechanicalEffect: 'Shield spell (reaction, +5 AC). Usable CHA mod times per night.', bloodCost: 1 },
    { name: 'Dominate Mind', type: 'domination', ageRequired: 'elder', description: 'Overwhelm a creature\'s will completely.', mechanicalEffect: 'Dominate Person (WIS DC 17). Concentration, up to 1 hour.', bloodCost: 4 },
    { name: 'Sanguine Storm', type: 'blood_magic', ageRequired: 'ancient', description: 'Weaponize your blood into a storm of razor-sharp droplets.', mechanicalEffect: '60ft cone, 8d6 necrotic damage (CON DC 18 half). Heals you for half damage dealt.', bloodCost: 6 },
  ], maxBloodPool: { fledgling: 5, neonate: 10, ancilla: 15, elder: 20, ancient: 30 } },
  { name: 'The Hollow', origin: 'Created by a necromancer\'s experiment gone right — or terribly wrong.', weakness: 'Holy symbols cause 2d6 radiant on touch. Cannot enter homes uninvited.', feedingPreference: 'Any living blood. Prefers fear — frightened blood tastes better.', powers: [
    { name: 'Shadow Step', type: 'shadow', ageRequired: 'fledgling', description: 'Teleport between shadows within 60ft.', mechanicalEffect: 'Bonus action teleport between dim light/darkness. 60ft range.', bloodCost: 1 },
    { name: 'Unnatural Regeneration', type: 'regeneration', ageRequired: 'neonate', description: 'Wounds close in seconds.', mechanicalEffect: 'Regenerate 5 HP at start of each turn. Stopped by radiant or silver damage.', bloodCost: 0 },
    { name: 'Nightmare Visage', type: 'charm', ageRequired: 'ancilla', description: 'Your face becomes a mask of terror.', mechanicalEffect: 'Fear (30ft, WIS DC 15). Concentration, 1 minute.', bloodCost: 2 },
    { name: 'Blood Puppet', type: 'domination', ageRequired: 'elder', description: 'Control a creature\'s body through their blood.', mechanicalEffect: 'Target within 30ft must have been bitten. STR DC 16 or controlled for 1 round.', bloodCost: 3 },
    { name: 'Deathless Form', type: 'regeneration', ageRequired: 'ancient', description: 'Even destruction cannot end you.', mechanicalEffect: 'When reduced to 0 HP, reform at your coffin in 1d4 hours (unless staked and exposed to sunlight).', bloodCost: 0 },
  ], maxBloodPool: { fledgling: 4, neonate: 8, ancilla: 14, elder: 20, ancient: 28 } },
];

const AGE_ORDER: BloodlineAge[] = ['fledgling', 'neonate', 'ancilla', 'elder', 'ancient'];

export function createVampireState(bloodlineName: string): VampireState {
  const bl = getBloodline(bloodlineName);
  return { bloodline: bloodlineName, age: 'fledgling', bloodPool: bl?.maxBloodPool.fledgling ?? 5, maxBlood: bl?.maxBloodPool.fledgling ?? 5, humanityScore: 7, feedsThisWeek: 0 };
}

export function feed(state: VampireState, willing: boolean): VampireState {
  const gain = willing ? 2 : 3;
  const humanityCost = willing ? 0 : 1;
  return { ...state, bloodPool: Math.min(state.maxBlood, state.bloodPool + gain), humanityScore: Math.max(0, state.humanityScore - humanityCost), feedsThisWeek: state.feedsThisWeek + 1 };
}

export function spendBlood(state: VampireState, cost: number): VampireState | null {
  if (state.bloodPool < cost) return null;
  return { ...state, bloodPool: state.bloodPool - cost };
}

export function ageUp(state: VampireState): VampireState {
  const idx = AGE_ORDER.indexOf(state.age);
  if (idx >= AGE_ORDER.length - 1) return state;
  const newAge = AGE_ORDER[idx + 1];
  const bl = getBloodline(state.bloodline);
  const newMax = bl?.maxBloodPool[newAge] ?? state.maxBlood;
  return { ...state, age: newAge, maxBlood: newMax };
}

export function getAvailablePowers(state: VampireState): VampirePower[] {
  const bl = getBloodline(state.bloodline);
  if (!bl) return [];
  const ageIdx = AGE_ORDER.indexOf(state.age);
  return bl.powers.filter((p) => AGE_ORDER.indexOf(p.ageRequired) <= ageIdx);
}

export function getBloodline(name: string): BloodlineProfile | undefined {
  return BLOODLINES.find((b) => b.name === name);
}

export function getAllBloodlines(): string[] {
  return BLOODLINES.map((b) => b.name);
}

export function formatVampireState(state: VampireState): string {
  const lines = [`🧛 **${state.bloodline}** — ${state.age.toUpperCase()}`];
  lines.push(`  🩸 Blood: ${state.bloodPool}/${state.maxBlood} | Humanity: ${'❤️'.repeat(Math.ceil(state.humanityScore / 2))}${'🖤'.repeat(5 - Math.ceil(state.humanityScore / 2))}`);
  const powers = getAvailablePowers(state);
  if (powers.length > 0) { lines.push('  Powers:'); powers.forEach((p) => lines.push(`    ${p.bloodCost > 0 ? `🩸${p.bloodCost}` : '⚙️'} ${p.name}: ${p.mechanicalEffect}`)); }
  return lines.join('\n');
}

export { BLOODLINES, AGE_ORDER };
