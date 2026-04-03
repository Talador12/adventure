// Heist planner — multi-phase robbery scenarios with guard patrols, vault locks, and escape routes.

export type HeistDifficulty = 'petty_theft' | 'burglary' | 'grand_heist' | 'impossible';

export interface HeistPhase {
  name: string;
  description: string;
  primarySkill: string;
  dc: number;
  alternativeApproach: string;
  failureConsequence: string;
}

export interface GuardPatrol {
  type: string;
  count: number;
  perceptionDC: number;
  weakness: string;
}

export interface EscapeRoute {
  name: string;
  requirement: string;
  riskLevel: 'safe' | 'risky' | 'desperate';
}

export interface HeistPlan {
  name: string;
  target: string;
  difficulty: HeistDifficulty;
  reward: string;
  phases: HeistPhase[];
  guards: GuardPatrol[];
  escapeRoutes: EscapeRoute[];
  complication: string;
  timeLimit: string;
}

const HEISTS: HeistPlan[] = [
  {
    name: 'The Merchant\'s Ledger',
    target: 'A crooked merchant\'s office above the market',
    difficulty: 'petty_theft',
    reward: 'Incriminating ledger + 50gp hidden in a false drawer',
    phases: [
      { name: 'Case the Joint', description: 'Observe the merchant\'s schedule and find the window.', primarySkill: 'Perception', dc: 12, alternativeApproach: 'Bribe a servant (25gp) for the schedule.', failureConsequence: 'Guards notice you watching. They\'ll be on alert.' },
      { name: 'Entry', description: 'Pick the second-floor window lock.', primarySkill: 'Thieves\' Tools', dc: 13, alternativeApproach: 'Climb the drainpipe (Athletics DC 12).', failureConsequence: 'Lock jams. Must force it (noise alert).' },
      { name: 'The Score', description: 'Find and take the ledger from the hidden compartment.', primarySkill: 'Investigation', dc: 12, alternativeApproach: 'Ransack the office (fast but leaves evidence).', failureConsequence: 'You grab the wrong book. Must return tomorrow.' },
    ],
    guards: [{ type: 'Night Watchman', count: 1, perceptionDC: 10, weakness: 'Falls asleep after midnight.' }],
    escapeRoutes: [
      { name: 'Same way in', requirement: 'Window still open', riskLevel: 'safe' },
      { name: 'Through the shop', requirement: 'Pick the interior lock (DC 11)', riskLevel: 'risky' },
    ],
    complication: 'The merchant returns early with guests.',
    timeLimit: '2 hours (midnight to 2am)',
  },
  {
    name: 'The Noble\'s Jewels',
    target: 'Lord Ashford\'s manor vault',
    difficulty: 'burglary',
    reward: 'The Ashford Ruby (500gp) + assorted jewelry (200gp)',
    phases: [
      { name: 'Infiltration', description: 'Get past the manor walls during the garden party.', primarySkill: 'Deception', dc: 14, alternativeApproach: 'Scale the wall on the dark side (Athletics DC 15).', failureConsequence: 'A guard escorts you to the gate.' },
      { name: 'Distraction', description: 'Create a diversion to clear the east wing.', primarySkill: 'Performance', dc: 13, alternativeApproach: 'Start a small fire in the kitchen (dangerous).', failureConsequence: 'Diversion too small. Guards remain.' },
      { name: 'The Vault', description: 'Crack the combination lock on the vault.', primarySkill: 'Thieves\' Tools', dc: 16, alternativeApproach: 'Mage Hand through the ventilation shaft (Arcana DC 15).', failureConsequence: 'Alarm bell triggers. 2 rounds to grab and run.' },
      { name: 'Extraction', description: 'Escape the grounds with the jewels.', primarySkill: 'Stealth', dc: 14, alternativeApproach: 'Bluff as a departing guest (Deception DC 15).', failureConsequence: 'Chase sequence begins.' },
    ],
    guards: [
      { type: 'Manor Guards', count: 6, perceptionDC: 14, weakness: 'Two are bribable (50gp each).' },
      { type: 'Guard Dog', count: 1, perceptionDC: 16, weakness: 'Distracted by meat (Animal Handling DC 10).' },
    ],
    escapeRoutes: [
      { name: 'Garden gate', requirement: 'Key from guard post', riskLevel: 'safe' },
      { name: 'Over the wall', requirement: 'Athletics DC 13', riskLevel: 'risky' },
      { name: 'Through the sewers', requirement: 'Know the entrance exists (Investigation DC 14)', riskLevel: 'desperate' },
    ],
    complication: 'Another thief is already inside, working for a rival.',
    timeLimit: '3 hours (party runs 8pm-11pm)',
  },
  {
    name: 'The Dragon\'s Hoard',
    target: 'First National Bank of Waterdeep\'s deep vault',
    difficulty: 'grand_heist',
    reward: '5,000gp in mixed currency + one magic item (DM\'s choice)',
    phases: [
      { name: 'Intelligence', description: 'Get the vault layout from a disgruntled former employee.', primarySkill: 'Persuasion', dc: 15, alternativeApproach: 'Break into the records office (full separate heist).', failureConsequence: 'The employee tips off the bank. Security doubled.' },
      { name: 'Tunnel', description: 'Dig or find an underground approach to bypass the front.', primarySkill: 'Athletics', dc: 14, alternativeApproach: 'Teleportation circle (Arcana DC 18, requires caster).', failureConsequence: 'Tunnel collapses. DEX DC 13 or 3d6 bludgeoning.' },
      { name: 'The Wards', description: 'Dispel or bypass the arcane alarm glyphs.', primarySkill: 'Arcana', dc: 17, alternativeApproach: 'Lead-lined bag blocks magical detection.', failureConsequence: 'Alarm notifies the city watch. 10 rounds until they arrive.' },
      { name: 'The Lock', description: 'A triple-tumbler lock with magical reinforcement.', primarySkill: 'Thieves\' Tools', dc: 19, alternativeApproach: 'The bank manager has a key (kidnapping or seduction).', failureConsequence: 'Vault seals permanently. Mission failed.' },
      { name: 'Clean Getaway', description: 'Escape with the goods before the alarm expires.', primarySkill: 'Stealth', dc: 15, alternativeApproach: 'Brazen exit in disguise (Deception DC 17).', failureConsequence: 'City-wide manhunt begins within the hour.' },
    ],
    guards: [
      { type: 'Bank Guards', count: 8, perceptionDC: 15, weakness: 'Shift change at 3am creates a 5-minute gap.' },
      { type: 'Arcane Sentinel (construct)', count: 1, perceptionDC: 18, weakness: 'Dispel Magic (DC 15) shuts it down for 1 minute.' },
    ],
    escapeRoutes: [
      { name: 'The tunnel', requirement: 'Tunnel intact', riskLevel: 'safe' },
      { name: 'Rooftop route', requirement: 'Athletics DC 14, 3 buildings', riskLevel: 'risky' },
      { name: 'Blending into the crowd', requirement: 'Disguise kit + Deception DC 16', riskLevel: 'risky' },
      { name: 'Dimension Door', requirement: '4th level spell slot', riskLevel: 'safe' },
    ],
    complication: 'A dragon (the bank\'s silent investor) is visiting the vault tonight.',
    timeLimit: '4 hours (2am-6am)',
  },
  {
    name: 'The Impossible Job',
    target: 'The Archmage\'s phylactery vault in a demiplane',
    difficulty: 'impossible',
    reward: 'An Archmage\'s phylactery (priceless) + 10,000gp in diamonds',
    phases: [
      { name: 'Locate the Demiplane', description: 'Research the archmage\'s work to find the planar anchor.', primarySkill: 'Arcana', dc: 18, alternativeApproach: 'Capture and interrogate a servant (Intimidation DC 17).', failureConsequence: 'You find a decoy demiplane. Waste 1d4 days.' },
      { name: 'Breach the Barrier', description: 'Open a portal to the demiplane.', primarySkill: 'Arcana', dc: 20, alternativeApproach: 'Find the archmage\'s own portal key (separate quest).', failureConsequence: 'Breach attracts planar entities. Combat encounter.' },
      { name: 'Navigate the Maze', description: 'The demiplane is a shifting labyrinth of illusions.', primarySkill: 'Investigation', dc: 17, alternativeApproach: 'True Seeing spell bypasses all illusions.', failureConsequence: 'Lost for 1d6 hours. Resources drain.' },
      { name: 'Bypass the Guardian', description: 'A bound elemental guards the vault door.', primarySkill: 'Persuasion', dc: 18, alternativeApproach: 'Fight it (CR 11 elemental).', failureConsequence: 'The guardian alerts the archmage. Clock starts ticking.' },
      { name: 'The Final Lock', description: 'A lock that requires blood, a true name, and a lie.', primarySkill: 'Arcana + Deception', dc: 19, alternativeApproach: 'There is no alternative. You must satisfy all three conditions.', failureConsequence: 'The vault incinerates its contents. Everything lost.' },
    ],
    guards: [
      { type: 'Bound Fire Elemental', count: 1, perceptionDC: 20, weakness: 'Its binding contract has a loophole (Arcana DC 18 to exploit).' },
      { type: 'Illusory Duplicates', count: 99, perceptionDC: 10, weakness: 'True Seeing or touching them (they vanish).' },
    ],
    escapeRoutes: [
      { name: 'Reverse the portal', requirement: 'Portal key or Arcana DC 18', riskLevel: 'risky' },
      { name: 'Plane Shift', requirement: '7th level spell', riskLevel: 'safe' },
      { name: 'Wait for the demiplane to cycle', requirement: '1d4 hours hiding', riskLevel: 'desperate' },
    ],
    complication: 'The archmage isn\'t actually away. They\'re watching. This is a test.',
    timeLimit: '8 hours before the demiplane collapses',
  },
];

export function getRandomHeist(): HeistPlan {
  return HEISTS[Math.floor(Math.random() * HEISTS.length)];
}

export function getHeistByDifficulty(difficulty: HeistDifficulty): HeistPlan[] {
  return HEISTS.filter((h) => h.difficulty === difficulty);
}

export function getPhaseCount(heist: HeistPlan): number {
  return heist.phases.length;
}

export function getTotalGuards(heist: HeistPlan): number {
  return heist.guards.reduce((sum, g) => sum + g.count, 0);
}

export function formatHeist(heist: HeistPlan): string {
  const icon = { petty_theft: '🟢', burglary: '🟡', grand_heist: '🟠', impossible: '🔴' }[heist.difficulty];
  const lines = [`${icon} **${heist.name}** *(${heist.difficulty.replace(/_/g, ' ')})*`];
  lines.push(`  **Target:** ${heist.target}`);
  lines.push(`  **Reward:** ${heist.reward}`);
  lines.push(`  **Time Limit:** ${heist.timeLimit}`);
  lines.push(`  **Phases:** ${heist.phases.length} | **Guards:** ${getTotalGuards(heist)}`);
  lines.push(`  ⚠️ **Complication:** ${heist.complication}`);
  return lines.join('\n');
}

export { HEISTS };
