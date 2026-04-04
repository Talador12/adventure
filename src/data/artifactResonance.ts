// Magical artifact resonance system — items that power up when near compatible artifacts.

export type ResonanceType = 'amplifying' | 'harmonizing' | 'conflicting' | 'catalytic';

export interface ResonancePair {
  item1: string;
  item2: string;
  resonanceType: ResonanceType;
  distance: string;
  effect: string;
  lore: string;
}

const PAIRS: ResonancePair[] = [
  { item1: 'Dawnbreaker (radiant sword)', item2: 'Shield of the Faithful', resonanceType: 'harmonizing', distance: 'Within 30ft', effect: 'Both items gain +1 to their existing bonuses. The sword sheds bright light 60ft. The shield reflects radiant damage back at attackers.', lore: 'Forged by the same celestial smith as a matched set. They sing when together — a low hum that comforts allies.' },
  { item1: 'Voidfang (necrotic dagger)', item2: 'Dawnbreaker (radiant sword)', resonanceType: 'conflicting', distance: 'Within 10ft', effect: 'Both items lose their +1 bonus. Wielders take 1d4 force damage per round. The items HATE each other.', lore: 'Light and shadow cannot coexist at this intensity. The items argue telepathically. It\'s distracting.' },
  { item1: 'Staff of the Archmage', item2: 'Spellbook of Infinite Pages', resonanceType: 'amplifying', distance: 'Same creature', effect: 'Spell slots restored by the staff are doubled. The spellbook can record spells it observes automatically.', lore: 'Both were owned by Archmage Quel\'tharis. They remember each other. The staff hums the archmage\'s favorite tune.' },
  { item1: 'Ring of Elemental Command (Fire)', item2: 'Ring of Elemental Command (Water)', resonanceType: 'catalytic', distance: 'Worn by the same creature', effect: 'The wearer can cast Steam Blast (3d8 fire + 3d8 cold, 30ft cone) once per day. Also: constant fog 5ft around wearer.', lore: 'Fire and water together create something new. The rings were never meant to be worn together. The result is... interesting.' },
  { item1: 'Any +3 weapon', item2: 'Any other +3 weapon', resonanceType: 'conflicting', distance: 'Within 5ft', effect: 'Both weapons vibrate violently. -1 to attack with either (the vibration throws off aim). If BOTH hit the same target in one round: +3d6 force damage.', lore: 'Legendary weapons are prima donnas. They don\'t share the spotlight. But they respect a coordinated strike.' },
  { item1: 'Bag of Holding', item2: 'Portable Hole', resonanceType: 'catalytic', distance: 'One inside the other', effect: 'Planar rift. Everything within 10ft is pulled into the Astral Plane. Both items are destroyed. This is NOT a resonance. This is a catastrophe.', lore: 'Every adventurer learns this the hard way. Exactly once.' },
];

export function getRandomResonance(): ResonancePair {
  return PAIRS[Math.floor(Math.random() * PAIRS.length)];
}

export function getResonancesByType(type: ResonanceType): ResonancePair[] {
  return PAIRS.filter((p) => p.resonanceType === type);
}

export function getResonancesForItem(itemName: string): ResonancePair[] {
  return PAIRS.filter((p) => p.item1.toLowerCase().includes(itemName.toLowerCase()) || p.item2.toLowerCase().includes(itemName.toLowerCase()));
}

export function getAllResonanceTypes(): ResonanceType[] {
  return ['amplifying', 'harmonizing', 'conflicting', 'catalytic'];
}

export function formatResonance(pair: ResonancePair): string {
  const icon = { amplifying: '⬆️', harmonizing: '🎵', conflicting: '⚡', catalytic: '💥' }[pair.resonanceType];
  const lines = [`${icon} **${pair.item1} ↔ ${pair.item2}** *(${pair.resonanceType}, ${pair.distance})*`];
  lines.push(`  ⚙️ ${pair.effect}`);
  lines.push(`  📜 ${pair.lore}`);
  return lines.join('\n');
}

export { PAIRS as RESONANCE_PAIRS };
