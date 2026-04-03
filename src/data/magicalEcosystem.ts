// Magical ecosystem generator — interconnected magical flora/fauna that react to party actions.

export type EcosystemBiome = 'enchanted_forest' | 'crystal_caves' | 'living_desert' | 'sky_islands';

export interface MagicalOrganism { name: string; role: string; behavior: string; interaction: string; harvestable: string | null; }
export interface EcosystemReaction { trigger: string; reaction: string; mechanicalEffect: string; reversible: boolean; }

export interface MagicalEcosystem {
  biome: EcosystemBiome;
  name: string;
  description: string;
  organisms: MagicalOrganism[];
  reactions: EcosystemReaction[];
  balanceState: string;
  collapseWarning: string;
}

const ECOSYSTEMS: MagicalEcosystem[] = [
  { biome: 'enchanted_forest', name: 'The Singing Canopy', description: 'A forest where every tree produces a unique musical note. Together, they form a harmony that sustains the local magic.', organisms: [
    { name: 'Harmony Trees', role: 'Producer', behavior: 'Grow toward each other to improve acoustics. Roots share nutrients through song.', interaction: 'Cutting one disrupts the chord. Nearby trees go silent for 1d4 days.', harvestable: 'Resonance Wood (100gp, used in instrument crafting)' },
    { name: 'Note Moths', role: 'Pollinator', behavior: 'Carry pollen between trees, choosing partners whose notes harmonize.', interaction: 'Attracted to music. A bard can redirect them to heal dying trees.', harvestable: 'Wing Dust (25gp, spell component for Silence/Thunderwave)' },
    { name: 'Dissonance Fungus', role: 'Decomposer', behavior: 'Grows on dead trees. Produces jarring tones that drive away predators.', interaction: 'Harvesting too much removes the ecosystem\'s immune system.', harvestable: 'Dissonance Spores (50gp, creates a 15ft zone of disadvantage on Concentration)' },
  ], reactions: [
    { trigger: 'Casting thunder/sonic spells', reaction: 'The forest amplifies the spell. Effect radius doubles.', mechanicalEffect: 'Thunder/sonic spell AoE doubled. But also alerts everything within 1 mile.', reversible: true },
    { trigger: 'Cutting down a Harmony Tree', reaction: 'Adjacent trees go silent. Predators move into the quiet zone.', mechanicalEffect: 'Dangerous creatures appear in 1d4 hours. Ecosystem balance shifts negative.', reversible: true },
    { trigger: 'Playing beautiful music', reaction: 'The forest responds. Trees grow toward the musician. Healing fruit appears.', mechanicalEffect: 'Performance DC 13: 1d4 Goodberries grow on nearby branches.', reversible: true },
  ], balanceState: 'Healthy when all trees are singing. Fragile — losing 3+ trees in a month triggers cascade failure.', collapseWarning: 'If the forest goes silent, all magic within 1 mile fades for 1d4 weeks. Everything dependent on that magic dies.' },
  { biome: 'crystal_caves', name: 'The Resonance Network', description: 'A cave system where crystals grow like coral, powered by ambient magic. They pulse with light in response to nearby spellcasting.', organisms: [
    { name: 'Arcane Crystals', role: 'Energy storage', behavior: 'Absorb ambient magic and glow. Brightest near leylines.', interaction: 'Mining them releases stored energy — 1d6 force damage per crystal.', harvestable: 'Arcane Crystal (50-500gp depending on size, spell components)' },
    { name: 'Crystal Crabs', role: 'Gardener', behavior: 'Tend crystal growths. Remove impurities. Relocate broken pieces.', interaction: 'Friendly if not threatened. Will trade crystal fragments for shiny objects.', harvestable: null },
    { name: 'Mana Slime', role: 'Cleaner', behavior: 'Dissolves dead crystal and redistributes the magic.', interaction: 'Attracted to spent spell components. Will clean up after combat.', harvestable: 'Refined Mana (75gp, restores 1 cantrip slot equivalent)' },
  ], reactions: [
    { trigger: 'Casting a spell in the caves', reaction: 'Crystals absorb 10% of the spell energy. They glow brighter.', mechanicalEffect: 'Spell damage/healing reduced by 10%. Crystals store the energy for later harvest.', reversible: true },
    { trigger: 'Mining more than 5 crystals per day', reaction: 'The network destabilizes. Crystals dim. Slimes become aggressive.', mechanicalEffect: 'Mana Slimes (CR 2) attack. Cave becomes dark (no crystal light).', reversible: true },
    { trigger: 'Feeding magic to the crystals (casting a spell INTO them)', reaction: 'The network strengthens. New crystals grow. Light increases.', mechanicalEffect: 'For each spell slot sacrificed, 1d4 crystals grow over the next week.', reversible: false },
  ], balanceState: 'Self-sustaining if left alone. Over-harvesting creates dead zones.', collapseWarning: 'If more than half the crystals are removed, a magical void forms — antimagic zone spreads 100ft per day.' },
];

export function getRandomEcosystem(): MagicalEcosystem {
  return ECOSYSTEMS[Math.floor(Math.random() * ECOSYSTEMS.length)];
}

export function getEcosystemByBiome(biome: EcosystemBiome): MagicalEcosystem | undefined {
  return ECOSYSTEMS.find((e) => e.biome === biome);
}

export function getHarvestableOrganisms(eco: MagicalEcosystem): MagicalOrganism[] {
  return eco.organisms.filter((o) => o.harvestable !== null);
}

export function getReversibleReactions(eco: MagicalEcosystem): EcosystemReaction[] {
  return eco.reactions.filter((r) => r.reversible);
}

export function getAllEcosystemBiomes(): EcosystemBiome[] {
  return [...new Set(ECOSYSTEMS.map((e) => e.biome))];
}

export function formatEcosystem(eco: MagicalEcosystem): string {
  const lines = [`🌿 **${eco.name}** *(${eco.biome.replace(/_/g, ' ')})*`];
  lines.push(`  *${eco.description}*`);
  lines.push('  **Organisms:**');
  eco.organisms.forEach((o) => lines.push(`    🧬 ${o.name} (${o.role}): ${o.behavior}`));
  lines.push('  **Reactions:**');
  eco.reactions.forEach((r) => lines.push(`    ⚡ ${r.trigger} → ${r.reaction}`));
  lines.push(`  ⚠️ Collapse: ${eco.collapseWarning}`);
  return lines.join('\n');
}

export { ECOSYSTEMS as MAGICAL_ECOSYSTEMS };
