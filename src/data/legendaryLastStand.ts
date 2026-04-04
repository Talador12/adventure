// Legendary last stand scenarios — epic final battles with environmental drama.

export interface LastStandScenario {
  name: string; setting: string; stakes: string; environmentalEffects: string[];
  allyReinforcements: string | null; enemyEscalation: string; victoryCondition: string;
  narrativeBeat: string; ifTheyFall: string;
}

const SCENARIOS: LastStandScenario[] = [
  { name: 'The Bridge of Bones', setting: 'A narrow stone bridge over a chasm. The only crossing for 100 miles. An army approaches from the other side.', stakes: 'Hold the bridge for 10 rounds. Every civilian behind you is counting on it.', environmentalEffects: ['Bridge crumbles: 1 tile disappears per round from the far end.', 'Wind gusts: DEX DC 12 or pushed 5ft toward the edge.', 'Ally archers fire support from behind: 2d6 piercing to one enemy per round.'], allyReinforcements: 'A single knight arrives at round 7. They\'re injured but they have a +2 sword and a speech.', enemyEscalation: 'Round 5: a troll. Round 8: a war mage. Round 10: they send everything.', victoryCondition: 'Survive 10 rounds. The civilians escape. The bridge collapses behind them.', narrativeBeat: 'At round 5, a child on the other side throws you an apple. "For later!" There might not be a later.', ifTheyFall: 'A bard across the chasm begins writing a song. Your names will be remembered. That has to be enough.' },
  { name: 'The Dying Light', setting: 'A sacred flame that keeps undead at bay is sputtering. The temple is surrounded. Dawn is 1 hour away.', stakes: 'Protect the flame until sunrise. If it goes out, the city is overrun by the undead horde outside.', environmentalEffects: ['The flame flickers: each round, 10% chance it dims (undead gain +1 to attacks).', 'Undead climb the walls: 1d4 skeletons breach per round through windows.', 'Prayer strengthens the flame: one character can spend their action to pray (Religion DC 12, flame brightens, undead -1 to attacks).'], allyReinforcements: 'The townsfolk form a militia at round 15. They\'re terrible fighters but they fill gaps in the line.', enemyEscalation: 'Waves grow: round 1-5 (skeletons), 6-10 (zombies + ghouls), 11-15 (wraiths), 16-20 (the necromancer herself).', victoryCondition: 'Dawn. 20 rounds. The sunlight destroys the undead army. The flame reignites permanently.', narrativeBeat: 'At round 10, the priest who tends the flame collapses from exhaustion. They whisper: "The light... don\'t let it..."', ifTheyFall: 'The flame goes out. But it reignites — from the priest\'s dying breath. One final miracle. Enough to hold until dawn.' },
  { name: 'The Vault Door', setting: 'A vault containing a world-ending artifact. The villain needs 5 rounds to break the seal. You need to stop them.', stakes: 'The villain reaches the artifact = apocalypse. Stop them. Whatever it costs.', environmentalEffects: ['The seal cracks: each round, reality warps more (random effects: gravity shifts, time stutters, colors invert).', 'The villain\'s guards respawn: killed minions return in 1d4 rounds (the artifact\'s power leaks).', 'Power surges: 3d6 force damage to a random creature each round.'], allyReinforcements: null, enemyEscalation: 'The villain gets stronger each round as the seal weakens: +1 to all stats per round.', victoryCondition: 'Reduce the villain to 0 HP or push them away from the seal for 3 consecutive rounds.', narrativeBeat: 'At round 3, the villain offers to share the artifact\'s power. "We could be gods. Together." The offer is genuine.', ifTheyFall: 'The artifact activates. But the party\'s sacrifice destabilizes it. The apocalypse is delayed — not prevented. A sequel hook.' },
];

export function getRandomLastStand(): LastStandScenario { return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]; }
export function getScenarioCount(): number { return SCENARIOS.length; }
export function formatLastStand(s: LastStandScenario): string {
  const lines = [`🏰 **${s.name}**`]; lines.push(`  *${s.setting}*`); lines.push(`  ⚔️ Stakes: ${s.stakes}`);
  lines.push(`  🏆 Victory: ${s.victoryCondition}`); lines.push(`  💔 If they fall: ${s.ifTheyFall}`);
  lines.push(`  🎭 Beat: ${s.narrativeBeat}`); return lines.join('\n');
}
export { SCENARIOS as LAST_STAND_SCENARIOS };
