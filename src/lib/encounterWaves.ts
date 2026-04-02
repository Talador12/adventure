// Encounter wave system — multi-wave combat with reinforcements on schedule.
// DM defines waves; the system auto-triggers them based on round count.

export interface EnemyWaveUnit {
  name: string;
  count: number;
  hp: number;
  ac: number;
  attackBonus: number;
  damageDie: string;
  cr: number;
}

export interface EncounterWave {
  id: string;
  roundTrigger: number; // spawn on this round
  units: EnemyWaveUnit[];
  narration: string;
  triggered: boolean;
}

export interface WaveEncounter {
  id: string;
  name: string;
  waves: EncounterWave[];
  currentRound: number;
}

export const WAVE_TEMPLATES: Omit<WaveEncounter, 'id' | 'currentRound'>[] = [
  {
    name: 'Goblin Ambush',
    waves: [
      { id: 'w1', roundTrigger: 1, units: [{ name: 'Goblin', count: 3, hp: 7, ac: 15, attackBonus: 4, damageDie: '1d6+2', cr: 0.25 }], narration: 'Goblins spring from the bushes!', triggered: false },
      { id: 'w2', roundTrigger: 3, units: [{ name: 'Goblin Boss', count: 1, hp: 21, ac: 17, attackBonus: 4, damageDie: '2d6+2', cr: 1 }], narration: 'A goblin boss charges in, rallying the troops!', triggered: false },
      { id: 'w3', roundTrigger: 5, units: [{ name: 'Worg', count: 2, hp: 26, ac: 13, attackBonus: 5, damageDie: '2d6+3', cr: 0.5 }], narration: 'Worgs burst from the treeline!', triggered: false },
    ],
  },
  {
    name: 'Undead Rising',
    waves: [
      { id: 'w1', roundTrigger: 1, units: [{ name: 'Skeleton', count: 4, hp: 13, ac: 13, attackBonus: 4, damageDie: '1d6+2', cr: 0.25 }], narration: 'Skeletons claw their way out of the earth!', triggered: false },
      { id: 'w2', roundTrigger: 3, units: [{ name: 'Zombie', count: 3, hp: 22, ac: 8, attackBonus: 3, damageDie: '1d6+1', cr: 0.25 }], narration: 'More undead emerge — shambling zombies!', triggered: false },
      { id: 'w3', roundTrigger: 6, units: [{ name: 'Wight', count: 1, hp: 45, ac: 14, attackBonus: 4, damageDie: '1d8+2', cr: 3 }], narration: 'A wight rises from the largest tomb, eyes burning with malice.', triggered: false },
    ],
  },
  {
    name: 'Bandit Raid',
    waves: [
      { id: 'w1', roundTrigger: 1, units: [{ name: 'Bandit', count: 4, hp: 11, ac: 12, attackBonus: 3, damageDie: '1d6+1', cr: 0.125 }], narration: 'Bandits rush in from all sides!', triggered: false },
      { id: 'w2', roundTrigger: 4, units: [{ name: 'Bandit Captain', count: 1, hp: 65, ac: 15, attackBonus: 5, damageDie: '2d6+3', cr: 2 }, { name: 'Bandit', count: 2, hp: 11, ac: 12, attackBonus: 3, damageDie: '1d6+1', cr: 0.125 }], narration: 'The bandit captain arrives with reinforcements!', triggered: false },
    ],
  },
];

export function createWaveEncounter(template: typeof WAVE_TEMPLATES[0]): WaveEncounter {
  return {
    id: crypto.randomUUID(),
    name: template.name,
    waves: template.waves.map((w) => ({ ...w, triggered: false })),
    currentRound: 0,
  };
}

export function checkWaveTriggers(encounter: WaveEncounter, round: number): { encounter: WaveEncounter; triggeredWaves: EncounterWave[] } {
  const triggered: EncounterWave[] = [];
  const updatedWaves = encounter.waves.map((w) => {
    if (!w.triggered && round >= w.roundTrigger) {
      triggered.push(w);
      return { ...w, triggered: true };
    }
    return w;
  });
  return { encounter: { ...encounter, waves: updatedWaves, currentRound: round }, triggeredWaves: triggered };
}

export function getUpcomingWaves(encounter: WaveEncounter): EncounterWave[] {
  return encounter.waves.filter((w) => !w.triggered).sort((a, b) => a.roundTrigger - b.roundTrigger);
}

export function getTotalEnemyCount(encounter: WaveEncounter): number {
  return encounter.waves.reduce((sum, w) => sum + w.units.reduce((s, u) => s + u.count, 0), 0);
}

export function formatWaveStatus(encounter: WaveEncounter): string {
  const lines = [`⚔️ **${encounter.name}** (Round ${encounter.currentRound})`];
  for (const w of encounter.waves) {
    const status = w.triggered ? '✅' : `⏳ R${w.roundTrigger}`;
    const enemies = w.units.map((u) => `${u.name} ×${u.count}`).join(', ');
    lines.push(`${status} ${enemies}`);
  }
  const upcoming = getUpcomingWaves(encounter);
  if (upcoming.length > 0) lines.push(`Next wave: Round ${upcoming[0].roundTrigger}`);
  else lines.push('All waves deployed.');
  return lines.join('\n');
}
