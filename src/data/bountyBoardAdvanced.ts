// Bounty board system (advanced) — detailed bounties with targets, rewards, deadlines, and rival hunters.

export type BountyType = 'kill' | 'capture' | 'retrieve' | 'investigate' | 'escort' | 'clear';
export type BountyDifficulty = 'copper' | 'silver' | 'gold' | 'platinum';

export interface BountyTarget {
  name: string;
  description: string;
  lastSeen: string;
  dangerLevel: string;
}

export interface RivalHunter {
  name: string;
  reputation: string;
  approach: string;
  willCooperate: boolean;
}

export interface AdvancedBounty {
  title: string;
  type: BountyType;
  difficulty: BountyDifficulty;
  poster: string;
  reward: number;
  bonusReward: string | null;
  deadline: string;
  target: BountyTarget;
  complications: string[];
  rivalHunter: RivalHunter | null;
}

const BOUNTIES: AdvancedBounty[] = [
  {
    title: 'The Butcher of Helm\'s Road',
    type: 'kill',
    difficulty: 'gold',
    poster: 'City Watch Commander',
    reward: 500,
    bonusReward: 'Alive: +200gp and a favor from the Watch',
    deadline: '2 weeks',
    target: { name: 'Krazik the Gnoll', description: 'A particularly cunning gnoll war chief. Intelligent, which makes him worse.', lastSeen: 'The Thornwood, 3 days ride north', dangerLevel: 'CR 5 with 2d6 gnoll minions' },
    complications: ['Krazik has hostages from a merchant caravan.', 'A druid protects the Thornwood and doesn\'t want violence there.'],
    rivalHunter: { name: 'Sable the Tracker', reputation: 'Never fails. Never shares.', approach: 'Sets traps, works alone, will sabotage competitors.', willCooperate: false },
  },
  {
    title: 'The Missing Heir',
    type: 'retrieve',
    difficulty: 'silver',
    poster: 'House Ashford Steward',
    reward: 200,
    bonusReward: 'Discreet return: +100gp and no questions asked',
    deadline: '1 week',
    target: { name: 'Percival Ashford IV', description: 'A young noble who vanished from the estate. Probably ran away voluntarily.', lastSeen: 'A tavern in the lower district, performing as a bard', dangerLevel: 'Harmless, but his bodyguard is CR 3' },
    complications: ['The heir doesn\'t want to be found.', 'The bodyguard is fiercely loyal to the heir, not the house.'],
    rivalHunter: null,
  },
  {
    title: 'The Cursed Statue',
    type: 'retrieve',
    difficulty: 'gold',
    poster: 'Anonymous (dead drop payment)',
    reward: 750,
    bonusReward: null,
    deadline: '10 days',
    target: { name: 'Statue of Malcanthet', description: 'A 2-foot obsidian figurine of a demon queen. Radiates evil. Currently in a museum.', lastSeen: 'The Royal Museum, heavily guarded', dangerLevel: 'The statue itself is cursed (WIS DC 14 or obsessed with it)' },
    complications: ['Stealing from the museum is a crime.', 'The anonymous poster is a cult leader.', 'The statue whispers to those nearby.'],
    rivalHunter: { name: 'The Collector', reputation: 'Acquires anything, for anyone, at any cost.', approach: 'Hires muscle. Never gets their hands dirty.', willCooperate: true },
  },
  {
    title: 'Clear the Old Mine',
    type: 'clear',
    difficulty: 'copper',
    poster: 'Village Elder Gretta',
    reward: 75,
    bonusReward: 'Free lodging in the village permanently',
    deadline: 'No deadline (standing bounty)',
    target: { name: 'Giant Spider Nest', description: 'Phase spiders have infested the old silver mine. Workers refuse to enter.', lastSeen: 'Greystone Mine, 1 hour walk from the village', dangerLevel: 'CR 3 (phase spider) + 2d4 giant spiders (CR 1 each)' },
    complications: ['The mine contains a vein of mithral the spiders are guarding.', 'Eggs are about to hatch — clock is ticking.'],
    rivalHunter: null,
  },
  {
    title: 'The Ghost Ship Investigation',
    type: 'investigate',
    difficulty: 'silver',
    poster: 'Harbor Master',
    reward: 300,
    bonusReward: 'Solve it: free docking rights for life',
    deadline: '5 days',
    target: { name: 'The Wandering Tide', description: 'A ship that sails into port every new moon with no crew. Full cargo. No explanation.', lastSeen: 'Harbor dock 7, appears in 3 days', dangerLevel: 'Unknown — no one who boarded at night has come back unchanged' },
    complications: ['The cargo is always exactly what the city needs most.', 'The previous investigator now speaks in an unknown language.'],
    rivalHunter: { name: 'Professor Alwick', reputation: 'Academic. Brilliant. Zero combat ability.', approach: 'Pure research, will hire the party as bodyguards.', willCooperate: true },
  },
  {
    title: 'Escort the Witness',
    type: 'escort',
    difficulty: 'silver',
    poster: 'Crown Prosecutor',
    reward: 250,
    bonusReward: 'Alive and unharmed: +150gp',
    deadline: '3 days',
    target: { name: 'Mira Halfpenny', description: 'A halfling accountant who witnessed a noble\'s crime. Must testify in the capital.', lastSeen: 'Safe house, location given on acceptance', dangerLevel: 'Target is harmless. Her enemies are CR 4 assassins.' },
    complications: ['3 assassin teams are hunting her.', 'She has a terrible sense of direction and wanders off.', 'The noble she\'s testifying against offers double to hand her over.'],
    rivalHunter: null,
  },
];

export function getRandomAdvancedBounty(): AdvancedBounty {
  return BOUNTIES[Math.floor(Math.random() * BOUNTIES.length)];
}

export function getAdvancedBountiesByType(type: BountyType): AdvancedBounty[] {
  return BOUNTIES.filter((b) => b.type === type);
}

export function getAdvancedBountiesByDifficulty(difficulty: BountyDifficulty): AdvancedBounty[] {
  return BOUNTIES.filter((b) => b.difficulty === difficulty);
}

export function getBountiesWithRivals(): AdvancedBounty[] {
  return BOUNTIES.filter((b) => b.rivalHunter !== null);
}

export function formatAdvancedBounty(bounty: AdvancedBounty): string {
  const icon = { kill: '💀', capture: '🔗', retrieve: '📦', investigate: '🔍', escort: '🛡️', clear: '🧹' }[bounty.type];
  const tier = { copper: '🟤', silver: '⚪', gold: '🟡', platinum: '⬜' }[bounty.difficulty];
  const lines = [`${icon} ${tier} **${bounty.title}** *(${bounty.type}, ${bounty.difficulty})*`];
  lines.push(`  Posted by: ${bounty.poster} | Reward: ${bounty.reward}gp | Deadline: ${bounty.deadline}`);
  if (bounty.bonusReward) lines.push(`  💎 Bonus: ${bounty.bonusReward}`);
  lines.push(`  **Target:** ${bounty.target.name} — ${bounty.target.description}`);
  if (bounty.rivalHunter) lines.push(`  🏹 Rival: ${bounty.rivalHunter.name} — ${bounty.rivalHunter.reputation}`);
  return lines.join('\n');
}

export { BOUNTIES as ADVANCED_BOUNTIES };
