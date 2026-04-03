// Random political event — coups, elections, assassinations that change the campaign world.

export type EventCategory = 'succession' | 'conflict' | 'diplomacy' | 'corruption' | 'revolution' | 'disaster';
export type EventSeverity = 'minor' | 'moderate' | 'major' | 'world_changing';

export interface PoliticalEvent {
  title: string;
  description: string;
  category: EventCategory;
  severity: EventSeverity;
  consequences: string[];
  opportunities: string[]; // hooks for the party
  factionShifts: { faction: string; change: number }[];
}

const EVENTS: PoliticalEvent[] = [
  {
    title: 'Assassination of the Duke',
    description: 'The ruling duke is found dead in his chambers. Poison. Three noble houses immediately claim the right to succession.',
    category: 'succession',
    severity: 'major',
    consequences: ['Power vacuum in the region', 'Martial law declared by the city guard', 'Trade routes disrupted'],
    opportunities: ['Investigate the murder for any faction', 'Choose a side in the succession', 'Rob the treasury during the chaos'],
    factionShifts: [{ faction: 'Nobility', change: -2 }, { faction: 'City Guard', change: 1 }],
  },
  {
    title: 'Merchant Guild Election',
    description: 'The Merchant Guild holds its decennial election. Two candidates: a progressive reformer and a traditionalist. Both are courting adventurer endorsements.',
    category: 'diplomacy',
    severity: 'moderate',
    consequences: ['Trade prices may shift +/- 15%', 'Guild contracts up for renegotiation', 'Losing faction plots revenge'],
    opportunities: ['Endorse a candidate for future favors', 'Discover blackmail material on either', 'Run a third candidate (yourself)'],
    factionShifts: [{ faction: 'Merchants', change: 0 }],
  },
  {
    title: 'Peasant Uprising',
    description: 'Overtaxed peasants have seized a granary and barricaded the market district. The lord demands they be crushed. The church begs for mercy.',
    category: 'revolution',
    severity: 'moderate',
    consequences: ['Food prices triple', 'Military patrols doubled', 'Sympathizers harassed'],
    opportunities: ['Mediate between sides', 'Join the uprising', 'Crush the revolt for the lord\'s reward', 'Smuggle food to the starving'],
    factionShifts: [{ faction: 'Commoners', change: -1 }, { faction: 'Nobility', change: -1 }],
  },
  {
    title: 'Border Skirmish Escalation',
    description: 'A minor border incident between two kingdoms has escalated. Troops are massing. War is weeks away unless someone intervenes.',
    category: 'conflict',
    severity: 'major',
    consequences: ['Conscription notices posted', 'Refugees flood border towns', 'Weapons prices triple'],
    opportunities: ['Serve as diplomatic envoys', 'Spy for either side', 'War profiteering (arms dealing)', 'Protect a refugee caravan'],
    factionShifts: [{ faction: 'Military', change: 2 }, { faction: 'Commoners', change: -1 }],
  },
  {
    title: 'Tax Collector Corruption Exposed',
    description: 'Documents surface proving the regional tax collector has been embezzling for years. The crown demands answers. The collector has powerful friends.',
    category: 'corruption',
    severity: 'minor',
    consequences: ['Trust in government drops', 'Tax collector flees or fights', 'Audit disrupts local services'],
    opportunities: ['Capture the fugitive for a bounty', 'Retrieve the stolen gold', 'Blackmail the collector\'s allies', 'Replace the collector (political appointment)'],
    factionShifts: [{ faction: 'Government', change: -2 }],
  },
  {
    title: 'Religious Schism',
    description: 'The high priest declares a controversial new interpretation of scripture. Half the clergy rebels. Temples are divided.',
    category: 'revolution',
    severity: 'moderate',
    consequences: ['Healing services disrupted', 'Clerics refuse to cooperate across factions', 'Holy sites contested'],
    opportunities: ['Choose a side for clerical support', 'Discover the truth behind the schism', 'Steal relics during the confusion'],
    factionShifts: [{ faction: 'Temple', change: -2 }, { faction: 'Commoners', change: -1 }],
  },
  {
    title: 'Dragon Demands Tribute',
    description: 'An ancient dragon emerges from its lair and demands the kingdom pay tribute — 10,000 gold per month or face destruction.',
    category: 'conflict',
    severity: 'world_changing',
    consequences: ['Crippling taxation', 'Exodus of the wealthy', 'Military focuses entirely on dragon defense'],
    opportunities: ['Negotiate with the dragon', 'Slay the dragon (legendary quest)', 'Find what the dragon really wants', 'Become the dragon\'s agent'],
    factionShifts: [{ faction: 'Nobility', change: -3 }, { faction: 'Military', change: 1 }, { faction: 'Adventurers', change: 3 }],
  },
  {
    title: 'Plague Outbreak',
    description: 'A mysterious illness sweeps through the city. Quarantine is declared. Clerics are overwhelmed. Rumors blame outsiders, wizards, or divine punishment.',
    category: 'disaster',
    severity: 'major',
    consequences: ['City gates sealed', 'Commerce halted', 'Social unrest as scapegoats are targeted'],
    opportunities: ['Find the cure (alchemical or magical)', 'Discover if it\'s natural or created', 'Smuggle supplies in/out', 'Protect the wrongly accused'],
    factionShifts: [{ faction: 'Temple', change: 1 }, { faction: 'Commoners', change: -2 }],
  },
  {
    title: 'Royal Wedding Alliance',
    description: 'Two rival kingdoms announce a marriage alliance. A grand wedding is planned. Not everyone is happy — assassins, jilted lovers, and political dissidents are all circling.',
    category: 'diplomacy',
    severity: 'moderate',
    consequences: ['Peace between kingdoms (temporary)', 'Trade routes open', 'Dissenters plot disruption'],
    opportunities: ['Provide security at the wedding', 'Uncover the assassination plot', 'Attend as honored guests', 'Sabotage for a third party'],
    factionShifts: [{ faction: 'Nobility', change: 2 }, { faction: 'Military', change: -1 }],
  },
  {
    title: 'Thieves Guild Civil War',
    description: 'The thieves guild has split in two. Street crime doubles as both factions vie for territory. The city guard is overwhelmed.',
    category: 'corruption',
    severity: 'moderate',
    consequences: ['Increased crime rate', 'Black market prices spike', 'Informants go silent'],
    opportunities: ['Side with a faction for underworld connections', 'Destroy both factions for the law', 'Become the new guild leader', 'Exploit the chaos for heists'],
    factionShifts: [{ faction: 'Underworld', change: -1 }, { faction: 'City Guard', change: -1 }],
  },
];

export function getRandomPoliticalEvent(): PoliticalEvent {
  return EVENTS[Math.floor(Math.random() * EVENTS.length)];
}

export function getEventsByCategory(category: EventCategory): PoliticalEvent[] {
  return EVENTS.filter((e) => e.category === category);
}

export function getEventsBySeverity(severity: EventSeverity): PoliticalEvent[] {
  return EVENTS.filter((e) => e.severity === severity);
}

export function formatPoliticalEvent(event: PoliticalEvent): string {
  const icon = { succession: '👑', conflict: '⚔️', diplomacy: '🤝', corruption: '💰', revolution: '✊', disaster: '💀' }[event.category];
  const sev = { minor: '🟢', moderate: '🟡', major: '🔴', world_changing: '💥' }[event.severity];
  const lines = [`${icon} **${event.title}** ${sev} *(${event.severity})*`];
  lines.push(`  *${event.description}*`);
  lines.push('  **Consequences:**');
  event.consequences.forEach((c) => lines.push(`    ⚠️ ${c}`));
  lines.push('  **Opportunities:**');
  event.opportunities.forEach((o) => lines.push(`    🎯 ${o}`));
  return lines.join('\n');
}

export { EVENTS as POLITICAL_EVENTS };
