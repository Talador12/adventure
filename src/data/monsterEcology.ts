// Monster ecology system — predator/prey chains that affect encounter probability by region.

export type EcologyBiome = 'forest' | 'mountain' | 'swamp' | 'desert' | 'underdark' | 'plains' | 'coast' | 'arctic';
export type EcologyRole = 'apex_predator' | 'predator' | 'scavenger' | 'herbivore' | 'parasite' | 'ambusher';

export interface EcologyEntry {
  creature: string;
  biome: EcologyBiome;
  role: EcologyRole;
  cr: number;
  preyOn: string[]; // creatures this one hunts
  preyed: string[]; // creatures that hunt this one
  population: 'rare' | 'uncommon' | 'common' | 'abundant';
  behavior: string; // how they interact with adventurers
}

const ECOLOGY: EcologyEntry[] = [
  // Forest
  { creature: 'Owlbear', biome: 'forest', role: 'apex_predator', cr: 3, preyOn: ['Deer', 'Giant Boar', 'Goblin'], preyed: [], population: 'uncommon', behavior: 'Territorial. Attacks anything entering its nesting ground.' },
  { creature: 'Giant Spider', biome: 'forest', role: 'ambusher', cr: 1, preyOn: ['Giant Rat', 'Pixie', 'Sprite'], preyed: ['Owlbear'], population: 'common', behavior: 'Webs across paths. Waits. Patient.' },
  { creature: 'Goblin', biome: 'forest', role: 'scavenger', cr: 0.25, preyOn: ['Giant Rat'], preyed: ['Owlbear', 'Wolf'], population: 'abundant', behavior: 'Raids camps at night. Avoids direct fights.' },
  { creature: 'Wolf', biome: 'forest', role: 'predator', cr: 0.25, preyOn: ['Deer', 'Goblin', 'Giant Rat'], preyed: ['Owlbear'], population: 'common', behavior: 'Pack hunters. Will stalk weak-looking parties.' },
  // Mountain
  { creature: 'Wyvern', biome: 'mountain', role: 'apex_predator', cr: 6, preyOn: ['Giant Goat', 'Griffon', 'Orc'], preyed: [], population: 'rare', behavior: 'Swoops from above. Carries prey to nest.' },
  { creature: 'Griffon', biome: 'mountain', role: 'predator', cr: 2, preyOn: ['Giant Goat', 'Horse'], preyed: ['Wyvern'], population: 'uncommon', behavior: 'Curious about horses. Will investigate mounted parties.' },
  { creature: 'Orc', biome: 'mountain', role: 'predator', cr: 0.5, preyOn: ['Giant Goat', 'Kobold'], preyed: ['Wyvern'], population: 'common', behavior: 'War bands. Aggressive. Respects strength.' },
  // Swamp
  { creature: 'Black Dragon (Young)', biome: 'swamp', role: 'apex_predator', cr: 7, preyOn: ['Troll', 'Lizardfolk', 'Giant Crocodile'], preyed: [], population: 'rare', behavior: 'Rules the swamp. Demands tribute or picks off loners.' },
  { creature: 'Troll', biome: 'swamp', role: 'predator', cr: 5, preyOn: ['Lizardfolk', 'Giant Frog'], preyed: ['Black Dragon (Young)'], population: 'uncommon', behavior: 'Always hungry. Regeneration makes them fearless.' },
  { creature: 'Lizardfolk', biome: 'swamp', role: 'predator', cr: 0.5, preyOn: ['Giant Frog', 'Fish'], preyed: ['Troll', 'Black Dragon (Young)'], population: 'common', behavior: 'Pragmatic. May trade or fight depending on hunger.' },
  // Desert
  { creature: 'Purple Worm', biome: 'desert', role: 'apex_predator', cr: 15, preyOn: ['Giant Scorpion', 'Bulette', 'Everything'], preyed: [], population: 'rare', behavior: 'Attracted by vibration. Swallows whole.' },
  { creature: 'Giant Scorpion', biome: 'desert', role: 'ambusher', cr: 3, preyOn: ['Giant Lizard', 'Gnoll'], preyed: ['Purple Worm'], population: 'common', behavior: 'Burrows just beneath sand. Strikes from below.' },
  // Underdark
  { creature: 'Mind Flayer', biome: 'underdark', role: 'apex_predator', cr: 7, preyOn: ['Drow', 'Duergar', 'Hook Horror'], preyed: [], population: 'rare', behavior: 'Enslaves rather than kills. Intelligence is food.' },
  { creature: 'Hook Horror', biome: 'underdark', role: 'predator', cr: 3, preyOn: ['Giant Bat', 'Troglodyte'], preyed: ['Mind Flayer'], population: 'uncommon', behavior: 'Echolocation clicks warn of approach. Pack ambush.' },
  // Plains
  { creature: 'Bulette', biome: 'plains', role: 'apex_predator', cr: 5, preyOn: ['Ankheg', 'Horse', 'Gnoll'], preyed: [], population: 'rare', behavior: 'Bursts from ground. Prefers halfling-sized prey.' },
  { creature: 'Ankheg', biome: 'plains', role: 'ambusher', cr: 2, preyOn: ['Cattle', 'Giant Rat'], preyed: ['Bulette'], population: 'uncommon', behavior: 'Acid spit from burrow. Farmers\' bane.' },
  // Coast
  { creature: 'Dragon Turtle', biome: 'coast', role: 'apex_predator', cr: 17, preyOn: ['Giant Shark', 'Merfolk', 'Ships'], preyed: [], population: 'rare', behavior: 'Demands tribute from passing ships or capsizes them.' },
  { creature: 'Sahuagin', biome: 'coast', role: 'predator', cr: 0.5, preyOn: ['Fish', 'Merfolk'], preyed: ['Dragon Turtle'], population: 'common', behavior: 'Raids coastal villages at night during blood frenzy.' },
  // Arctic
  { creature: 'Remorhaz', biome: 'arctic', role: 'apex_predator', cr: 11, preyOn: ['Winter Wolf', 'Frost Giant', 'Everything warm'], preyed: [], population: 'rare', behavior: 'Senses heat. Burrows through ice toward warm-blooded creatures.' },
  { creature: 'Winter Wolf', biome: 'arctic', role: 'predator', cr: 3, preyOn: ['Elk', 'Humanoid'], preyed: ['Remorhaz'], population: 'uncommon', behavior: 'Intelligent. Can speak. May negotiate or lie.' },
];

export function getEcologyByBiome(biome: EcologyBiome): EcologyEntry[] {
  return ECOLOGY.filter((e) => e.biome === biome);
}

export function getApexPredator(biome: EcologyBiome): EcologyEntry | undefined {
  return ECOLOGY.find((e) => e.biome === biome && e.role === 'apex_predator');
}

export function getFoodChain(biome: EcologyBiome): { predator: string; prey: string[] }[] {
  return getEcologyByBiome(biome).map((e) => ({ predator: e.creature, prey: e.preyOn }));
}

export function getEncounterProbability(entry: EcologyEntry): number {
  const base = { rare: 5, uncommon: 15, common: 30, abundant: 50 }[entry.population];
  return base;
}

export function getAllBiomes(): EcologyBiome[] {
  return [...new Set(ECOLOGY.map((e) => e.biome))];
}

export function formatEcologyEntry(entry: EcologyEntry): string {
  const icon = { apex_predator: '🦁', predator: '🐺', scavenger: '🦅', herbivore: '🦌', parasite: '🪱', ambusher: '🕷️' }[entry.role];
  const pop = { rare: '🔴', uncommon: '🟡', common: '🟢', abundant: '🟢🟢' }[entry.population];
  const lines = [`${icon} **${entry.creature}** (CR ${entry.cr}) — ${entry.role.replace(/_/g, ' ')} ${pop}`];
  if (entry.preyOn.length > 0) lines.push(`  Hunts: ${entry.preyOn.join(', ')}`);
  if (entry.preyed.length > 0) lines.push(`  Hunted by: ${entry.preyed.join(', ')}`);
  lines.push(`  *${entry.behavior}*`);
  return lines.join('\n');
}

export function formatBiomeEcology(biome: EcologyBiome): string {
  const entries = getEcologyByBiome(biome);
  if (entries.length === 0) return `🌍 **${biome} ecology:** No data.`;
  return `🌍 **${biome.charAt(0).toUpperCase() + biome.slice(1)} Ecology:**\n` + entries.map(formatEcologyEntry).join('\n');
}

export { ECOLOGY };
