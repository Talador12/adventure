// Random exile/banishment scenario — why the party was thrown out and how to get back in.

export type ExileReason = 'crime' | 'political' | 'religious' | 'magical_accident' | 'framed' | 'cultural_offense';
export type ExileSeverity = 'temporary' | 'indefinite' | 'permanent' | 'death_on_return';

export interface ExileScenario {
  title: string;
  reason: ExileReason;
  severity: ExileSeverity;
  description: string;
  whoExiledYou: string;
  redemptionPaths: { method: string; difficulty: string; timeframe: string }[];
  consequencesOfReturn: string;
  allies: string;
  twist: string;
}

const SCENARIOS: ExileScenario[] = [
  { title: 'The Accidental Arson', reason: 'magical_accident', severity: 'temporary', description: 'A spell went wrong. The mayor\'s prized greenhouse is ash. You have 30 days to make it right.', whoExiledYou: 'The City Council (unanimous vote)', redemptionPaths: [{ method: 'Pay for repairs (500gp)', difficulty: 'Easy if wealthy', timeframe: 'Immediate' }, { method: 'Replant with rare magical seeds', difficulty: 'Moderate (quest required)', timeframe: '1 week' }, { method: 'Find a druid to regrow it overnight', difficulty: 'Hard (favor owed)', timeframe: '1 day' }], consequencesOfReturn: 'Fined 100gp and publicly scolded. Magic use restricted in city limits.', allies: 'The local herbalist secretly thinks it\'s hilarious and will help.', twist: 'The greenhouse contained an illegal plant. The mayor doesn\'t want an investigation.' },
  { title: 'The Coup That Wasn\'t', reason: 'political', severity: 'indefinite', description: 'You were falsely accused of plotting against the crown. The real plotter framed you perfectly.', whoExiledYou: 'The Royal Court', redemptionPaths: [{ method: 'Find evidence of the real plotter', difficulty: 'Hard (Investigation DC 16 chain)', timeframe: '1-4 weeks' }, { method: 'Complete a dangerous quest for the crown', difficulty: 'Hard (CR 10+ quest)', timeframe: '2 weeks' }, { method: 'Get a pardon from a higher authority', difficulty: 'Very Hard (audience with the king)', timeframe: 'Unknown' }], consequencesOfReturn: 'Arrest on sight. Trial by combat available.', allies: 'A sympathetic noble believes you\'re innocent. Communicates via dead drops.', twist: 'The real plotter is the person who hired you to come to this city in the first place.' },
  { title: 'The Forbidden Rite', reason: 'religious', severity: 'permanent', description: 'You witnessed — or participated in — a forbidden religious ceremony. The temple has declared you anathema.', whoExiledYou: 'The High Temple of Solara', redemptionPaths: [{ method: 'Complete a pilgrimage to 3 holy sites', difficulty: 'Moderate (3 separate quests)', timeframe: '1 month' }, { method: 'Destroy the heretical artifact used in the rite', difficulty: 'Hard (guarded by cultists)', timeframe: '2 weeks' }, { method: 'Convert 10 souls to the faith', difficulty: 'Moderate (roleplaying challenge)', timeframe: '1 month' }], consequencesOfReturn: 'No cleric of this faith will heal you. Temple doors are barred.', allies: 'A reformist acolyte thinks the ban is unjust. Will hide you.', twist: 'The forbidden rite actually worked. Something divine responded. The temple is afraid.' },
  { title: 'The Stolen Heirloom', reason: 'framed', severity: 'death_on_return', description: 'A priceless family heirloom vanished from the lord\'s vault. Evidence points to you. The real thief is laughing somewhere.', whoExiledYou: 'Lord Ashford and the City Guard', redemptionPaths: [{ method: 'Find the real thief and the heirloom', difficulty: 'Hard (detective quest chain)', timeframe: '2 weeks' }, { method: 'Replace the heirloom with a perfect copy', difficulty: 'Very Hard (forgery + illusion)', timeframe: '1 week' }, { method: 'Expose Lord Ashford\'s own crimes to leverage a pardon', difficulty: 'Extreme (dangerous blackmail)', timeframe: 'Varies' }], consequencesOfReturn: 'Execution. The lord has posted a bounty. Dead or alive (he prefers dead).', allies: 'The lord\'s servant knows the truth. Terrified to speak.', twist: 'The lord staged the theft himself for insurance money. You\'re the convenient scapegoat.' },
  { title: 'The Dance of Insult', reason: 'cultural_offense', severity: 'temporary', description: 'You accidentally performed a traditional dance... backward. In this culture, that\'s an unforgivable insult to the ancestors.', whoExiledYou: 'The Village Elders (and the ancestors, apparently)', redemptionPaths: [{ method: 'Learn and perform the dance correctly at the next festival', difficulty: 'Moderate (Performance DC 14)', timeframe: 'Next full moon' }, { method: 'Bring a gift of significant cultural value', difficulty: 'Easy-Moderate (100gp+ item of local significance)', timeframe: '1 week' }, { method: 'Commune with the ancestors and apologize directly', difficulty: 'Hard (requires a shaman\'s help)', timeframe: '3 days' }], consequencesOfReturn: 'Pelted with fruit. Publicly mocked. No violence, just humiliation.', allies: 'The village children thought your backward dance was the funniest thing they\'ve ever seen.', twist: 'The "backward dance" is actually an ancient summoning ritual. You may have awakened something.' },
];

export function getRandomExile(): ExileScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getExilesByReason(reason: ExileReason): ExileScenario[] {
  return SCENARIOS.filter((s) => s.reason === reason);
}

export function getExilesBySeverity(severity: ExileSeverity): ExileScenario[] {
  return SCENARIOS.filter((s) => s.severity === severity);
}

export function getRedemptionPathCount(scenario: ExileScenario): number {
  return scenario.redemptionPaths.length;
}

export function getAllExileReasons(): ExileReason[] {
  return [...new Set(SCENARIOS.map((s) => s.reason))];
}

export function formatExile(scenario: ExileScenario): string {
  const sev = { temporary: '🟢', indefinite: '🟡', permanent: '🟠', death_on_return: '🔴' }[scenario.severity];
  const lines = [`${sev} **${scenario.title}** *(${scenario.reason.replace(/_/g, ' ')}, ${scenario.severity.replace(/_/g, ' ')})*`];
  lines.push(`  *${scenario.description}*`);
  lines.push(`  Exiled by: ${scenario.whoExiledYou}`);
  lines.push('  **Redemption:**');
  scenario.redemptionPaths.forEach((p) => lines.push(`    🔓 ${p.method} (${p.difficulty}, ${p.timeframe})`));
  lines.push(`  🔄 Twist: ${scenario.twist}`);
  return lines.join('\n');
}

export { SCENARIOS as EXILE_SCENARIOS };
