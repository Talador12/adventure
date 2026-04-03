// Tournament bracket system — organized combat with brackets, betting odds, and crowd reactions.

export type TournamentType = 'melee' | 'archery' | 'jousting' | 'magic_duel' | 'grand_melee';

export interface TournamentFighter {
  name: string;
  description: string;
  cr: number;
  style: string;
  odds: number; // betting odds multiplier (2.0 = 2:1, double your money)
  specialMove: string;
}

export interface TournamentMatch {
  round: number;
  fighter1: string;
  fighter2: string;
  winner: string | null;
  description: string | null;
}

export interface Tournament {
  name: string;
  type: TournamentType;
  entryFee: number;
  prize: string;
  fighters: TournamentFighter[];
  matches: TournamentMatch[];
  crowdMood: string;
  rules: string[];
}

const FIGHTERS: TournamentFighter[] = [
  { name: 'Iron Marcus', description: 'A retired city guard with nothing to lose.', cr: 2, style: 'Defensive — shield wall, waits for openings.', odds: 3.0, specialMove: 'Shield Bash (STR DC 14 or prone)' },
  { name: 'The Crimson Blade', description: 'A mysterious duelist in a red mask.', cr: 4, style: 'Aggressive — dual-wielding rapiers, relentless pressure.', odds: 2.0, specialMove: 'Double Strike (two attacks in one action)' },
  { name: 'Sister Mercy', description: 'A war priestess who fights "for charity."', cr: 3, style: 'Balanced — mace and shield with healing words between rounds.', odds: 2.5, specialMove: 'Healing Word (bonus action, 1d4+3 HP)' },
  { name: 'Grokk the Unbroken', description: 'A half-orc who has never lost a match.', cr: 5, style: 'Brutal — greathammer, pure offense, crowd favorite.', odds: 1.5, specialMove: 'Relentless Endurance (drops to 1 HP once instead of 0)' },
  { name: 'Whisper', description: 'A halfling who shouldn\'t be in this tournament.', cr: 1, style: 'Evasive — dodge and counter, annoys opponents into mistakes.', odds: 8.0, specialMove: 'Lucky (reroll one attack per match)' },
  { name: 'Sir Gallan the Golden', description: 'A noble knight seeking glory.', cr: 3, style: 'Honorable — longsword and shield, follows rules strictly.', odds: 3.0, specialMove: 'Inspired Strike (+1d6 damage, once per match)' },
  { name: 'Magda Blackiron', description: 'A dwarven smith who tests her own weapons.', cr: 3, style: 'Methodical — warhammer strikes to weak points.', odds: 3.5, specialMove: 'Sunder Armor (reduces target AC by 1 on hit)' },
  { name: 'The Phantom', description: 'No one knows their face. Bets are wild.', cr: 4, style: 'Unpredictable — different weapon each round.', odds: 4.0, specialMove: 'Weapon Switch (gains advantage on first attack each round)' },
];

const CROWD_REACTIONS: string[] = [
  'The crowd roars! Ale mugs fly. Someone is standing on a table.',
  'A hush falls. That last hit looked... real. The healers stand ready.',
  'Boos erupt! The crowd thinks the fight was rigged.',
  'Chanting starts! The underdog has the crowd behind them.',
  'Someone in the VIP box throws gold coins into the arena.',
  'A brawl breaks out in the stands. The guards are outnumbered.',
  'The bard in the corner starts composing a ballad in real-time.',
  'Children are mimicking the fighters with sticks in the side yard.',
];

const TOURNAMENT_RULES: Record<TournamentType, string[]> = {
  melee: ['No lethal force (unconscious = loss)', 'No magic (potions allowed)', 'Start at 30 feet apart', 'Win by knockout or submission'],
  archery: ['3 rounds of 3 arrows each', 'Highest total score wins', 'Magical bows allowed, magical arrows prohibited', 'Ties broken by moving target round'],
  jousting: ['Mounted combat, lances only', '3 passes per round', 'Unhorsing = instant win', 'Broken lance = point to the striker'],
  magic_duel: ['Spells up to 3rd level only', 'No summoned creatures', 'No instant-death effects', 'Counterspelling is encouraged'],
  grand_melee: ['Last one standing wins', 'All entrants fight simultaneously', 'Alliances allowed but only one winner', 'Ring-out counts as elimination'],
};

export function createTournament(name: string, type: TournamentType, fighterCount: number = 8): Tournament {
  const selected = [...FIGHTERS].sort(() => Math.random() - 0.5).slice(0, Math.min(fighterCount, FIGHTERS.length));
  return {
    name, type, entryFee: type === 'grand_melee' ? 100 : 50,
    prize: type === 'grand_melee' ? '1,000gp + Champion\'s Belt' : '500gp + Winner\'s Trophy',
    fighters: selected, matches: [], crowdMood: CROWD_REACTIONS[0],
    rules: TOURNAMENT_RULES[type],
  };
}

export function resolveMatch(fighter1: TournamentFighter, fighter2: TournamentFighter): { winner: TournamentFighter; description: string } {
  const r1 = Math.floor(Math.random() * 20) + 1 + fighter1.cr;
  const r2 = Math.floor(Math.random() * 20) + 1 + fighter2.cr;
  const winner = r1 >= r2 ? fighter1 : fighter2;
  const loser = winner === fighter1 ? fighter2 : fighter1;
  const descs = [
    `${winner.name} lands a devastating ${winner.specialMove}! ${loser.name} hits the ground.`,
    `After a grueling exchange, ${winner.name} outmaneuvers ${loser.name} with superior technique.`,
    `${loser.name} almost had it, but ${winner.name} rallies with a final burst of strength!`,
    `A close match decided by ${winner.name}'s relentless ${winner.style.split(' — ')[0].toLowerCase()} approach.`,
  ];
  return { winner, description: descs[Math.floor(Math.random() * descs.length)] };
}

export function calculatePayout(betAmount: number, odds: number): number {
  return Math.floor(betAmount * odds);
}

export function getRandomCrowdReaction(): string {
  return CROWD_REACTIONS[Math.floor(Math.random() * CROWD_REACTIONS.length)];
}

export function getAllTournamentTypes(): TournamentType[] {
  return Object.keys(TOURNAMENT_RULES) as TournamentType[];
}

export function formatTournament(t: Tournament): string {
  const icon = { melee: '⚔️', archery: '🏹', jousting: '🐴', magic_duel: '✨', grand_melee: '🏟️' }[t.type];
  const lines = [`${icon} **${t.name}** *(${t.type.replace(/_/g, ' ')})*`];
  lines.push(`  Entry: ${t.entryFee}gp | Prize: ${t.prize}`);
  lines.push(`  Fighters: ${t.fighters.map((f) => `${f.name} (${f.odds}:1)`).join(', ')}`);
  lines.push(`  Rules: ${t.rules.join('. ')}`);
  return lines.join('\n');
}

export { FIGHTERS, CROWD_REACTIONS };
