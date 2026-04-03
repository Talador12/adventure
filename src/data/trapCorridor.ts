// Trap corridor designer — sequential trap gauntlet with escalating difficulty.

export type TrapType = 'mechanical' | 'magical' | 'natural' | 'illusion' | 'hybrid';

export interface CorridorTrap {
  name: string;
  type: TrapType;
  triggerDC: number; // Perception to spot
  disarmDC: number; // to disarm
  effect: string;
  damage: string;
  saveDC: number;
  saveType: string;
}

export interface TrapCorridor {
  name: string;
  theme: string;
  length: string;
  traps: CorridorTrap[];
  finalReward: string;
  safeSpot: string; // a rest point mid-corridor
  shortcutDC: number | null; // Investigation DC to find a bypass
}

const CORRIDORS: TrapCorridor[] = [
  { name: 'The Gauntlet of Blades', theme: 'A dwarven test of martial worth. Spinning blades, pressure plates, and pride.', length: '100ft (5 trap sections)', traps: [
    { name: 'Pressure Plate Darts', type: 'mechanical', triggerDC: 12, disarmDC: 13, effect: 'Darts fire from wall slots in a line.', damage: '2d4 piercing + poison (1d6)', saveDC: 12, saveType: 'DEX' },
    { name: 'Spinning Blade Wall', type: 'mechanical', triggerDC: 14, disarmDC: 15, effect: 'A wall of rotating blades descends, blocking the path.', damage: '3d6 slashing', saveDC: 14, saveType: 'DEX' },
    { name: 'Collapsing Floor', type: 'mechanical', triggerDC: 13, disarmDC: 14, effect: 'Floor gives way to a 20ft pit with spikes.', damage: '2d6 falling + 2d6 piercing', saveDC: 13, saveType: 'DEX' },
    { name: 'Flame Jets', type: 'mechanical', triggerDC: 14, disarmDC: 16, effect: 'Jets of fire from the walls, sweeping back and forth.', damage: '4d6 fire', saveDC: 14, saveType: 'DEX' },
    { name: 'The Final Gate', type: 'hybrid', triggerDC: 16, disarmDC: 18, effect: 'A combination of all previous traps firing simultaneously.', damage: '6d6 mixed', saveDC: 15, saveType: 'DEX' },
  ], finalReward: 'A +2 weapon of the challenger\'s choice + the title "Blade Walker."', safeSpot: 'After trap 3: a small alcove with a healing font (2d8+4 HP, single use).', shortcutDC: 18 },
  { name: 'The Wizard\'s Folly', theme: 'A paranoid archmage\'s hallway of magical defenses. Every surface is enchanted.', length: '80ft (4 trap sections)', traps: [
    { name: 'Rune of Shocking', type: 'magical', triggerDC: 14, disarmDC: 15, effect: 'Stepping on the glyph triggers a lightning bolt down the corridor.', damage: '4d6 lightning', saveDC: 15, saveType: 'DEX' },
    { name: 'Mirror of Opposition', type: 'illusion', triggerDC: 15, disarmDC: 16, effect: 'A mirror creates a hostile duplicate of whoever looks into it.', damage: 'Duplicate has target\'s stats', saveDC: 14, saveType: 'CHA' },
    { name: 'Gravity Well', type: 'magical', triggerDC: 13, disarmDC: 17, effect: 'Gravity increases 10× in a 15ft zone. Everyone is crushed to the floor.', damage: '3d8 bludgeoning', saveDC: 15, saveType: 'STR' },
    { name: 'Antimagic Corridor + Mundane Trap', type: 'hybrid', triggerDC: 16, disarmDC: 14, effect: 'Antimagic field suppresses all magic while mundane crossbow turrets fire.', damage: '3d6 piercing (3 bolts)', saveDC: 14, saveType: 'DEX' },
  ], finalReward: 'Access to the archmage\'s study: 3 spell scrolls (4th-6th level) + a staff of defense.', safeSpot: 'After trap 2: the archmage\'s portrait talks and gives one hint (if asked politely).', shortcutDC: 20 },
  { name: 'The Temple of Trials', theme: 'A religious test for the faithful. Each trap tests a virtue.', length: '120ft (4 trap sections)', traps: [
    { name: 'Trial of Courage (Fire Walk)', type: 'natural', triggerDC: 10, disarmDC: 0, effect: 'A corridor of flames. Walking through requires willpower, not skill.', damage: '2d6 fire (halved if you walk without hesitation)', saveDC: 12, saveType: 'WIS' },
    { name: 'Trial of Wisdom (The Riddle Door)', type: 'illusion', triggerDC: 12, disarmDC: 0, effect: 'A door asks a riddle. Wrong answer triggers a psychic blast.', damage: '3d8 psychic', saveDC: 14, saveType: 'INT' },
    { name: 'Trial of Mercy (The Wounded Beast)', type: 'natural', triggerDC: 11, disarmDC: 0, effect: 'An injured creature blocks the path. Attacking it triggers divine wrath.', damage: '4d6 radiant (if you attack)', saveDC: 15, saveType: 'WIS' },
    { name: 'Trial of Sacrifice (The Final Step)', type: 'magical', triggerDC: 0, disarmDC: 0, effect: 'The path requires a voluntary sacrifice: HP, a memory, or a possession.', damage: 'Varies by sacrifice', saveDC: 0, saveType: 'None' },
  ], finalReward: 'The temple\'s blessing: permanent +1 to WIS saves + a holy relic.', safeSpot: 'After trial 2: a pool of holy water that removes conditions and restores 20 HP.', shortcutDC: null },
];

export function getRandomCorridor(): TrapCorridor {
  return CORRIDORS[Math.floor(Math.random() * CORRIDORS.length)];
}

export function getCorridorByName(name: string): TrapCorridor | undefined {
  return CORRIDORS.find((c) => c.name === name);
}

export function getTrapCount(corridor: TrapCorridor): number {
  return corridor.traps.length;
}

export function getAverageDisarmDC(corridor: TrapCorridor): number {
  const disarmable = corridor.traps.filter((t) => t.disarmDC > 0);
  if (disarmable.length === 0) return 0;
  return Math.round(disarmable.reduce((sum, t) => sum + t.disarmDC, 0) / disarmable.length);
}

export function hasShortcut(corridor: TrapCorridor): boolean {
  return corridor.shortcutDC !== null;
}

export function formatCorridor(corridor: TrapCorridor): string {
  const lines = [`🏚️ **${corridor.name}** (${corridor.length})`];
  lines.push(`  *${corridor.theme}*`);
  corridor.traps.forEach((t, i) => {
    const icon = { mechanical: '⚙️', magical: '✨', natural: '🌿', illusion: '🪞', hybrid: '🔀' }[t.type];
    lines.push(`  ${icon} ${i + 1}. ${t.name} — Spot DC ${t.triggerDC} | Disarm DC ${t.disarmDC} | ${t.damage} (${t.saveType} DC ${t.saveDC})`);
  });
  lines.push(`  🏆 Reward: ${corridor.finalReward}`);
  lines.push(`  🏥 Safe spot: ${corridor.safeSpot}`);
  return lines.join('\n');
}

export { CORRIDORS as TRAP_CORRIDORS };
