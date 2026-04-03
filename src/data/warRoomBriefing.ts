// Random war room briefing — military intel, terrain maps, and battle strategy suggestions.

export type BattleObjective = 'defend' | 'assault' | 'siege' | 'ambush' | 'escort' | 'retreat';
export type IntelQuality = 'unreliable' | 'partial' | 'good' | 'excellent';

export interface BattleIntel {
  category: string;
  detail: string;
  reliability: IntelQuality;
}

export interface WarRoomBriefing {
  operationName: string;
  objective: BattleObjective;
  terrain: string;
  enemyForces: string;
  allyForces: string;
  intel: BattleIntel[];
  suggestedStrategy: string;
  riskAssessment: string;
  timeframe: string;
  complication: string;
}

const BRIEFINGS: WarRoomBriefing[] = [
  { operationName: 'Operation Iron Dawn', objective: 'assault', terrain: 'Fortified hilltop castle with 3 approach routes. Open ground for 500ft on all sides.', enemyForces: '200 soldiers, 4 war mages, 2 siege engines on the walls. Commander is a veteran tactician.', allyForces: '300 soldiers, 6 cavalry units, 2 battering rams, 1 wizard. The party leads the vanguard.', intel: [{ category: 'Weak point', detail: 'The east wall was damaged in a storm last month. Repairs are incomplete.', reliability: 'good' }, { category: 'Reinforcements', detail: 'Enemy expects reinforcements in 3 days. Attack before then.', reliability: 'partial' }, { category: 'Morale', detail: 'Enemy garrison is demoralized. They haven\'t been paid in 2 months.', reliability: 'unreliable' }], suggestedStrategy: 'Feint attack from the west to draw defenders. Main assault through the east wall breach. Cavalry flanks to cut off retreat.', riskAssessment: 'Moderate. If the east wall intel is wrong, casualties double.', timeframe: 'Must launch within 48 hours before reinforcements arrive.', complication: 'A civilian population of 500 is inside the castle. Collateral damage is a concern.' },
  { operationName: 'Operation Silent Tide', objective: 'ambush', terrain: 'River crossing with dense forest on the north bank. The ford is 50ft wide and 3ft deep.', enemyForces: '80 soldiers escorting a supply wagon train. Light guard. They don\'t expect trouble.', allyForces: '40 soldiers + the party. Archers in the trees. Sappers ready to collapse the ford.', intel: [{ category: 'Route', detail: 'The supply train always crosses at dawn. They\'ll be sleepy.', reliability: 'excellent' }, { category: 'Cargo', detail: 'Weapons and gold. Possibly a prisoner of value.', reliability: 'partial' }, { category: 'Escort quality', detail: 'Green recruits, not veterans. Should break quickly.', reliability: 'good' }], suggestedStrategy: 'Let the wagons enter the ford. Collapse the downstream bank to trap them. Archers open fire from cover. Demand surrender.', riskAssessment: 'Low if surprise is maintained. High if they have a scout we don\'t know about.', timeframe: 'Tomorrow at dawn. One chance.', complication: 'The prisoner in the wagon may be an ally. Crossfire could kill them.' },
  { operationName: 'Operation Last Wall', objective: 'defend', terrain: 'Mountain pass with a single fortified gate. 30ft walls, 2 towers. The only way through.', enemyForces: '500 soldiers + 3 siege engines + a war troll. Approaching from the south.', allyForces: '100 defenders + the party. Limited ammunition. No reinforcements for 5 days.', intel: [{ category: 'Timeline', detail: 'Enemy arrives in 2 days. We have time to prepare.', reliability: 'excellent' }, { category: 'Enemy plan', detail: 'They\'ll bombard the gate with catapults, then assault with infantry.', reliability: 'good' }, { category: 'War troll', detail: 'Vulnerable to fire. The troll is chained — its handlers control it. Kill them and it rampages randomly.', reliability: 'partial' }], suggestedStrategy: 'Reinforce the gate with rubble. Set oil traps on the approach. Target the troll\'s handlers first. Hold for 5 days.', riskAssessment: 'High. The numbers are against us. Creative defense is essential.', timeframe: 'Hold for 5 days until reinforcements arrive.', complication: 'One of the defenders is a spy. They\'ll open the gate on night 3 unless discovered.' },
];

export function getRandomBriefing(): WarRoomBriefing {
  return BRIEFINGS[Math.floor(Math.random() * BRIEFINGS.length)];
}

export function getBriefingsByObjective(objective: BattleObjective): WarRoomBriefing[] {
  return BRIEFINGS.filter((b) => b.objective === objective);
}

export function getReliableIntel(briefing: WarRoomBriefing): BattleIntel[] {
  return briefing.intel.filter((i) => i.reliability === 'good' || i.reliability === 'excellent');
}

export function getUnreliableIntel(briefing: WarRoomBriefing): BattleIntel[] {
  return briefing.intel.filter((i) => i.reliability === 'unreliable' || i.reliability === 'partial');
}

export function getAllObjectives(): BattleObjective[] {
  return ['defend', 'assault', 'siege', 'ambush', 'escort', 'retreat'];
}

export function formatBriefing(briefing: WarRoomBriefing): string {
  const icon = { defend: '🛡️', assault: '⚔️', siege: '🏰', ambush: '🌲', escort: '🚶', retreat: '🏃' }[briefing.objective];
  const lines = [`${icon} **${briefing.operationName}** *(${briefing.objective})*`];
  lines.push(`  **Terrain:** ${briefing.terrain}`);
  lines.push(`  **Enemy:** ${briefing.enemyForces}`);
  lines.push(`  **Allies:** ${briefing.allyForces}`);
  lines.push('  **Intel:**');
  briefing.intel.forEach((i) => { const rel = { unreliable: '❓', partial: '🟡', good: '🟢', excellent: '⭐' }[i.reliability]; lines.push(`    ${rel} ${i.category}: ${i.detail}`); });
  lines.push(`  **Strategy:** ${briefing.suggestedStrategy}`);
  lines.push(`  **Risk:** ${briefing.riskAssessment}`);
  lines.push(`  ⚠️ Complication: ${briefing.complication}`);
  return lines.join('\n');
}

export { BRIEFINGS as WAR_ROOM_BRIEFINGS };
