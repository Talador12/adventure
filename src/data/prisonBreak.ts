// Magical prison break scenario — escaping from an anti-magic dungeon with no gear.

export type PrisonType = 'mundane' | 'antimagic' | 'planar' | 'living' | 'psionic';

export interface PrisonChallenge { name: string; description: string; skill: string; dc: number; alternativeSkill: string; alternativeDC: number; failureEffect: string; }

export interface PrisonBreakScenario {
  prisonName: string;
  type: PrisonType;
  description: string;
  gearStatus: string;
  magicStatus: string;
  challenges: PrisonChallenge[];
  allyInside: string | null;
  guardSchedule: string;
  escapeRoutes: { route: string; difficulty: string; risk: string }[];
  twist: string;
}

const SCENARIOS: PrisonBreakScenario[] = [
  { prisonName: 'The Iron Silence', type: 'antimagic', description: 'A prison built inside a permanent antimagic field. No spells. No magic items. Just iron, stone, and despair.', gearStatus: 'All equipment confiscated. Wearing prison rags. No weapons.', magicStatus: 'Total suppression. No spells, no magical abilities, no attunement effects. You\'re mundane.', challenges: [
    { name: 'Pick the Cell Lock', description: 'A heavy iron lock. No thieves\' tools — improvise with a bone or bent nail.', skill: 'Sleight of Hand', dc: 16, alternativeSkill: 'Athletics (break the lock)', alternativeDC: 20, failureEffect: 'Noise alerts the guard. 2 minutes until they investigate.' },
    { name: 'Navigate the Corridors', description: 'The prison layout is intentionally confusing. All corridors look identical.', skill: 'Survival', dc: 14, alternativeSkill: 'Investigation (follow the air flow)', alternativeDC: 13, failureEffect: 'Walk into a dead end. Waste 10 minutes. Patrol approaches.' },
    { name: 'Pass the Guard Post', description: 'Two guards play cards at the checkpoint. They have your gear behind them.', skill: 'Stealth', dc: 15, alternativeSkill: 'Deception (fake a medical emergency)', alternativeDC: 14, failureEffect: 'Combat. No weapons. No magic. Just fists and furniture.' },
    { name: 'The Antimagic Boundary', description: 'The edge of the antimagic field. Cross it and your magic returns — but so does the alarm ward.', skill: 'Arcana', dc: 13, alternativeSkill: 'Athletics (sprint through before the alarm triggers)', alternativeDC: 15, failureEffect: 'Alarm sounds. Full lockdown. Every guard in the prison converges.' },
  ], allyInside: 'A former adventurer in the cell next door. They know the guard schedule but want something in return: clear their name.', guardSchedule: 'Patrol every 30 minutes. Shift change at midnight (5-minute window of reduced coverage).', escapeRoutes: [
    { route: 'Through the sewers', difficulty: 'Moderate', risk: 'Disgusting. CON DC 12 or vomiting. But no guards.' },
    { route: 'Over the wall', difficulty: 'Hard', risk: 'Exposed. Athletics DC 16 to climb. Archers on the towers.' },
    { route: 'Through the warden\'s office', difficulty: 'Very Hard', risk: 'The warden is there. But so is your GEAR and a convenient window.' },
  ], twist: 'The prison is on a floating island. There is no ground outside the walls. You need to find or build a way down.' },
  { prisonName: 'The Living Gaol', type: 'living', description: 'The prison IS a creature. The walls are muscle. The doors are sphincters. It digests anyone who stays too long.', gearStatus: 'Gear is partially dissolved. Weapons are intact but armor is damaged (-2 AC permanently).', magicStatus: 'Magic works, but the prison REACTS to spells. Casting triggers an immune response.', challenges: [
    { name: 'Avoid Digestion', description: 'The cell walls secrete acid. It starts slow. CON save each hour.', skill: 'Constitution', dc: 13, alternativeSkill: 'Nature (neutralize the acid with alkaline substances)', alternativeDC: 14, failureEffect: '1d6 acid damage per hour. Gear dissolves further.' },
    { name: 'Navigate the Intestines', description: 'The corridors are organic and peristaltic. They move you in the wrong direction.', skill: 'Athletics', dc: 14, alternativeSkill: 'Nature (understand the organism\'s anatomy)', alternativeDC: 15, failureEffect: 'Pushed deeper into the organism. Add 1 challenge to escape.' },
    { name: 'The Immune Response', description: 'White blood cell equivalents attack. Amorphous blobs that grapple and absorb.', skill: 'Combat', dc: 0, alternativeSkill: 'Medicine (calm the immune response)', alternativeDC: 16, failureEffect: 'Grappled. 2d6 acid per round. STR DC 14 to escape.' },
  ], allyInside: 'A druid who has partially bonded with the organism. They can communicate with it. It\'s not evil — it\'s just hungry.', guardSchedule: 'No guards. The prison IS the guard. It senses movement through vibration.', escapeRoutes: [
    { route: 'Through the mouth (entrance)', difficulty: 'Hard', risk: 'The mouth is tightly sealed. Athletics DC 18 to force open.' },
    { route: 'Through a wound', difficulty: 'Moderate', risk: 'Cut your way out. 50 HP of tissue. But it bleeds — a lot.' },
    { route: 'Convince it to vomit you out', difficulty: 'Creative', risk: 'Feed it something it finds disgusting (Medicine DC 14 to identify).' },
  ], twist: 'The organism isn\'t the prison. It\'s a prisoner too. Someone PUT it here and feeds it inmates. Free the organism and it becomes an ally.' },
];

export function getRandomPrisonBreak(): PrisonBreakScenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function getPrisonByType(type: PrisonType): PrisonBreakScenario[] {
  return SCENARIOS.filter((s) => s.type === type);
}

export function getChallengeCount(scenario: PrisonBreakScenario): number {
  return scenario.challenges.length;
}

export function getEscapeRouteCount(scenario: PrisonBreakScenario): number {
  return scenario.escapeRoutes.length;
}

export function getAllPrisonTypes(): PrisonType[] {
  return [...new Set(SCENARIOS.map((s) => s.type))];
}

export function formatPrisonBreak(scenario: PrisonBreakScenario): string {
  const icon = { mundane: '🏰', antimagic: '🚫', planar: '🌀', living: '🫀', psionic: '🧠' }[scenario.type];
  const lines = [`${icon} **${scenario.prisonName}** *(${scenario.type})*`];
  lines.push(`  *${scenario.description}*`);
  lines.push(`  Gear: ${scenario.gearStatus}`);
  lines.push(`  Magic: ${scenario.magicStatus}`);
  lines.push(`  Challenges: ${scenario.challenges.length} | Escape routes: ${scenario.escapeRoutes.length}`);
  lines.push(`  🔄 Twist: ${scenario.twist}`);
  return lines.join('\n');
}

export { SCENARIOS as PRISON_BREAK_SCENARIOS };
