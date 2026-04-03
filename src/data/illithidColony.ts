// Illithid colony generator — mind flayer lairs with elder brain mechanics and thrall hierarchies.

export type ColonySize = 'outpost' | 'enclave' | 'city' | 'empire';
export type ThrallType = 'grunt' | 'specialist' | 'elite' | 'commander';

export interface Thrall { type: ThrallType; originalRace: string; role: string; cr: number; count: string; freeWillRemaining: number; }
export interface ColonyDefense { name: string; description: string; dc: number; }

export interface IllithidColony {
  name: string;
  size: ColonySize;
  elderBrainName: string;
  elderBrainPersonality: string;
  mindFlayerCount: number;
  thralls: Thrall[];
  defenses: ColonyDefense[];
  goal: string;
  weakness: string;
  loot: string;
}

const COLONIES: IllithidColony[] = [
  { name: 'The Whispering Depths', size: 'enclave', elderBrainName: 'Ilsenvaal', elderBrainPersonality: 'Patient, calculating. Plays a long game measured in centuries. Views mortals as livestock.', mindFlayerCount: 8, thralls: [
    { type: 'grunt', originalRace: 'Human', role: 'Tunnel diggers and labor', cr: 0.5, count: '3d10', freeWillRemaining: 0 },
    { type: 'specialist', originalRace: 'Dwarf', role: 'Stone shapers and trap builders', cr: 2, count: '2d4', freeWillRemaining: 1 },
    { type: 'elite', originalRace: 'Drow', role: 'Surface scouts and assassins', cr: 5, count: '1d4', freeWillRemaining: 2 },
    { type: 'commander', originalRace: 'Human wizard', role: 'Arcane battery — spells on demand for the elder brain', cr: 6, count: '1', freeWillRemaining: 3 },
  ], defenses: [
    { name: 'Psychic alarm network', description: 'Intruders detected telepathically within 500ft. No stealth possible.', dc: 18 },
    { name: 'Mind Blast corridors', description: 'Narrow passages where multiple flayers can overlap blast cones.', dc: 15 },
    { name: 'Thrall swarm rooms', description: 'Chambers packed with expendable thralls. Overwhelm by numbers.', dc: 0 },
  ], goal: 'Locate and activate an ancient Nautiloid ship hidden beneath the mountain. Escape to the Astral Sea.', weakness: 'The elder brain\'s pool is fed by an underground river. Poison the water source and the brain weakens (saves at disadvantage for 24 hours).', loot: '3,000gp in psionically-infused gems. A Mindblast Circlet (+1 INT, Detect Thoughts 1/day). Nautiloid navigation charts.' },
  { name: 'The Cerebral Spire', size: 'city', elderBrainName: 'Qualith-Ur', elderBrainPersonality: 'Paranoid, brilliant. Has predicted 12 assassination attempts. Trusts no one — not even its own flayers.', mindFlayerCount: 30, thralls: [
    { type: 'grunt', originalRace: 'Mixed', role: 'City maintenance and food processing', cr: 0.5, count: '10d10', freeWillRemaining: 0 },
    { type: 'specialist', originalRace: 'Gnome artificers', role: 'Technology and magical device creation', cr: 3, count: '3d6', freeWillRemaining: 1 },
    { type: 'elite', originalRace: 'Githyanki prisoners', role: 'Arena gladiators (forced combat for entertainment)', cr: 8, count: '2d4', freeWillRemaining: 4 },
    { type: 'commander', originalRace: 'Beholder (partially enthralled)', role: 'District overseer. Resentful.', cr: 13, count: '1', freeWillRemaining: 5 },
  ], defenses: [
    { name: 'The Thought Shield', description: 'City-wide antimagic dome against divination. Scrying fails automatically.', dc: 20 },
    { name: 'Intellect Devourer patrols', description: 'Brain-dogs that inhabit corpses and walk the streets. Detect non-thralls by taste.', dc: 14 },
    { name: 'The Arena', description: 'Captured adventurers are forced to fight for the colony\'s amusement before ceremorphosis.', dc: 0 },
  ], goal: 'Establish a surface beachhead. Begin mass ceremorphosis of a nearby city\'s population.', weakness: 'The enthralled beholder HATES the elder brain. Free it (or just break the charm) and it turns on the colony.', loot: '15,000gp equivalent. A Helm of Telepathy. Githyanki silver swords (2). Elder brain tissue (priceless to the right buyer).' },
];

export function getRandomColony(): IllithidColony {
  return COLONIES[Math.floor(Math.random() * COLONIES.length)];
}

export function getColonyBySize(size: ColonySize): IllithidColony[] {
  return COLONIES.filter((c) => c.size === size);
}

export function getTotalThralls(colony: IllithidColony): number {
  // Rough estimate using average of dice notation
  return colony.thralls.reduce((sum, t) => {
    const match = t.count.match(/(\d+)d(\d+)/);
    if (match) return sum + parseInt(match[1]) * (parseInt(match[2]) / 2 + 0.5);
    return sum + parseInt(t.count) || 0;
  }, 0);
}

export function getFreeThralls(colony: IllithidColony): Thrall[] {
  return colony.thralls.filter((t) => t.freeWillRemaining > 0);
}

export function getAllColonySizes(): ColonySize[] {
  return ['outpost', 'enclave', 'city', 'empire'];
}

export function formatColony(colony: IllithidColony): string {
  const icon = { outpost: '🔵', enclave: '🟡', city: '🟠', empire: '🔴' }[colony.size];
  const lines = [`${icon} **${colony.name}** *(${colony.size}, ${colony.mindFlayerCount} mind flayers)*`];
  lines.push(`  Elder Brain: **${colony.elderBrainName}** — ${colony.elderBrainPersonality}`);
  lines.push(`  Goal: ${colony.goal}`);
  lines.push('  **Thralls:**');
  colony.thralls.forEach((t) => lines.push(`    🧠 ${t.count} ${t.originalRace} ${t.type}s — ${t.role} (Free will: ${t.freeWillRemaining}/5)`));
  lines.push(`  ⚡ Weakness: ${colony.weakness}`);
  lines.push(`  💰 Loot: ${colony.loot}`);
  return lines.join('\n');
}

export { COLONIES as ILLITHID_COLONIES };
