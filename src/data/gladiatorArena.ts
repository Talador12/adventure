// Gladiator arena progression — ranked arena fights with crowd favor and sponsor mechanics.

export type ArenaRank = 'pit_fighter' | 'contender' | 'champion' | 'grand_champion' | 'legend';
export type CrowdMood = 'bored' | 'interested' | 'excited' | 'frenzied' | 'hostile';

export interface ArenaFighter {
  name: string;
  rank: ArenaRank;
  wins: number;
  losses: number;
  style: string;
  signature: string;
  cr: number;
}

export interface ArenaSponsor {
  name: string;
  wealth: number; // 1-10
  demands: string;
  perks: string;
  betrayalCondition: string;
}

export interface ArenaMatch {
  opponent: ArenaFighter;
  stakes: string;
  specialRule: string;
  crowdFavorBonus: string;
}

export interface ArenaState {
  rank: ArenaRank;
  wins: number;
  losses: number;
  crowdFavor: number; // 0-10
  gold: number;
  sponsor: ArenaSponsor | null;
}

const FIGHTERS: ArenaFighter[] = [
  { name: 'Grub the Expendable', rank: 'pit_fighter', wins: 2, losses: 8, style: 'Desperate flailing', signature: 'Plays dead, then bites', cr: 1 },
  { name: 'Iron Fist Kor', rank: 'pit_fighter', wins: 5, losses: 3, style: 'Unarmed brawler', signature: 'Headbutt (STR DC 12 or stunned 1 round)', cr: 2 },
  { name: 'The Crimson Twins', rank: 'contender', wins: 12, losses: 4, style: 'Tag team (counts as one fight)', signature: 'Coordinated attack (+2 to hit when both alive)', cr: 3 },
  { name: 'Steelheart', rank: 'contender', wins: 20, losses: 6, style: 'Full plate tank', signature: 'Shield Bash → Trip → Ground and Pound combo', cr: 4 },
  { name: 'Whisper', rank: 'champion', wins: 35, losses: 2, style: 'Dual rapiers, no armor', signature: 'Three-attack flurry (DEX-based, +7 to hit)', cr: 5 },
  { name: 'The Mountain', rank: 'champion', wins: 40, losses: 5, style: 'Greatsword, overwhelming force', signature: 'Cleaving Strike (hits all adjacent on crit)', cr: 6 },
  { name: 'Nightshade', rank: 'grand_champion', wins: 60, losses: 1, style: 'Poison and deception', signature: 'Poisoned blade (CON DC 15 or paralyzed 1 round) + smoke bomb escape', cr: 7 },
  { name: 'The Undying', rank: 'legend', wins: 100, losses: 0, style: 'Regenerates. Nobody knows why.', signature: 'Regeneration 10 HP/round. Only stops with fire or acid.', cr: 9 },
];

const SPONSORS: ArenaSponsor[] = [
  { name: 'Lord Ashford', wealth: 8, demands: 'Win your matches. Look good doing it. Wear his colors.', perks: '100gp per win. Masterwork weapon of choice. Healing potions before each fight.', betrayalCondition: 'Lose 2 fights in a row, or refuse to throw a match he wants you to lose.' },
  { name: 'The Velvet Hand (crime boss)', wealth: 6, demands: 'Throw specific matches. Intimidate specific fighters.', perks: '200gp per thrown match. Poison for your blade (no one checks). Information network.', betrayalCondition: 'Refuse to throw a match, or report them to the authorities.' },
  { name: 'The People\'s Champion Fund', wealth: 3, demands: 'Fight honorably. Donate 30% to the orphanage.', perks: 'Crowd favor starts at +3. Free lodging. Healing from the temple.', betrayalCondition: 'Fight dishonorably. Keep all the money. Lose crowd favor.' },
];

const SPECIAL_RULES: string[] = [
  'No weapons — unarmed only',
  'Blindfolded (both fighters)',
  'The arena floor is on fire (1d6/round, safe zones rotate)',
  'Tag team — each side has a partner, tag in/out',
  'Last one standing — 4 fighters in a free-for-all',
  'Beast fight — opponent brings a trained monster',
  'The crowd throws weapons into the arena (random each round)',
  'Submission only — no lethal damage allowed',
];

export function createArenaState(): ArenaState {
  return { rank: 'pit_fighter', wins: 0, losses: 0, crowdFavor: 0, gold: 0, sponsor: null };
}

export function generateMatch(state: ArenaState): ArenaMatch {
  const eligible = FIGHTERS.filter((f) => f.rank === state.rank || (state.wins > 5 && f.rank === getNextRank(state.rank)));
  const opponent = eligible[Math.floor(Math.random() * eligible.length)] || FIGHTERS[0];
  const specialRule = SPECIAL_RULES[Math.floor(Math.random() * SPECIAL_RULES.length)];
  const stakes = state.rank === 'pit_fighter' ? '25gp' : state.rank === 'contender' ? '100gp' : state.rank === 'champion' ? '500gp' : '2,000gp';
  const crowdBonus = state.crowdFavor >= 7 ? '+1 to all attack rolls (crowd energy)' : state.crowdFavor >= 4 ? 'Advantage on one save per fight' : 'No crowd bonus';
  return { opponent, stakes, specialRule, crowdFavorBonus: crowdBonus };
}

export function recordWin(state: ArenaState): ArenaState {
  const newWins = state.wins + 1;
  const newFavor = Math.min(10, state.crowdFavor + 1);
  let newRank = state.rank;
  if (newWins >= 5 && state.rank === 'pit_fighter') newRank = 'contender';
  if (newWins >= 15 && state.rank === 'contender') newRank = 'champion';
  if (newWins >= 30 && state.rank === 'champion') newRank = 'grand_champion';
  if (newWins >= 50 && state.rank === 'grand_champion') newRank = 'legend';
  return { ...state, wins: newWins, rank: newRank, crowdFavor: newFavor };
}

export function recordLoss(state: ArenaState): ArenaState {
  return { ...state, losses: state.losses + 1, crowdFavor: Math.max(0, state.crowdFavor - 2) };
}

function getNextRank(rank: ArenaRank): ArenaRank {
  const order: ArenaRank[] = ['pit_fighter', 'contender', 'champion', 'grand_champion', 'legend'];
  const idx = order.indexOf(rank);
  return order[Math.min(idx + 1, order.length - 1)];
}

export function getAllRanks(): ArenaRank[] {
  return ['pit_fighter', 'contender', 'champion', 'grand_champion', 'legend'];
}

export function formatArenaState(state: ArenaState): string {
  const icon = { pit_fighter: '🥊', contender: '⚔️', champion: '🏆', grand_champion: '👑', legend: '🌟' }[state.rank];
  const lines = [`${icon} **Arena Record: ${state.rank.replace(/_/g, ' ').toUpperCase()}**`];
  lines.push(`  Wins: ${state.wins} | Losses: ${state.losses} | Crowd Favor: ${'⭐'.repeat(Math.ceil(state.crowdFavor / 2))}${'☆'.repeat(5 - Math.ceil(state.crowdFavor / 2))}`);
  if (state.sponsor) lines.push(`  Sponsor: ${state.sponsor.name}`);
  return lines.join('\n');
}

export { FIGHTERS as ARENA_FIGHTERS, SPONSORS as ARENA_SPONSORS, SPECIAL_RULES as ARENA_RULES };
