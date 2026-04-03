// Random tavern entertainment — live acts, gambling games, and underground fight clubs.

export type EntertainmentType = 'performance' | 'gambling' | 'contest' | 'fight_club' | 'storytelling';

export interface TavernEntertainmentEvent {
  type: EntertainmentType;
  name: string;
  description: string;
  participationDC: number;
  participationSkill: string;
  winReward: string;
  loseConsequence: string;
  audienceReaction: string;
  secretOpportunity: string | null;
}

const EVENTS: TavernEntertainmentEvent[] = [
  { type: 'performance', name: 'Open Mic Night', description: 'Anyone can perform. The crowd votes with coins (more coins = better).', participationDC: 12, participationSkill: 'Performance', winReward: '2d6 × 5 gp in thrown coins + local fame. The bard circuit hears about you.', loseConsequence: 'Booed off stage. Thrown tomatoes. Disadvantage on CHA checks in this tavern for 1 week.', audienceReaction: 'Rowdy. They cheer the good and mercilessly heckle the bad.', secretOpportunity: 'A talent scout is in the audience. Impress them for a paid gig (50gp) at a noble\'s party.' },
  { type: 'gambling', name: 'Liar\'s Dice', description: 'Everyone rolls dice under cups. Bid on how many of a number are showing across ALL cups. Bluff or call.', participationDC: 13, participationSkill: 'Deception or Insight', winReward: 'The pot: 50gp + the loser\'s watch (sentimental, they\'ll want it back — quest hook).', loseConsequence: 'Lose your buy-in (20gp). The winner smirks. The table remembers.', audienceReaction: 'Tense silence during bids. Eruptions when someone is caught lying.', secretOpportunity: 'The house dealer is cheating (Perception DC 15 to notice). Call them out for +100gp and the dealer\'s gratitude — or blackmail.' },
  { type: 'contest', name: 'The Iron Stomach Challenge', description: 'Eat increasingly spicy food. Last one eating wins. The sauce gets worse each round.', participationDC: 14, participationSkill: 'Constitution', winReward: 'Free meals for life at this establishment + a bottle of the sauce (2d4 fire damage if thrown).', loseConsequence: '1 level of exhaustion. Bathroom emergencies for 1d4 hours. Dignity: gone.', audienceReaction: 'Cheering turns to wincing. Someone always gags in sympathy.', secretOpportunity: null },
  { type: 'fight_club', name: 'The Rat Pit', description: 'Underground boxing ring in the basement. No weapons. No magic. Just fists.', participationDC: 14, participationSkill: 'Athletics', winReward: '100gp + "The Belt" (a leather belt that grants +1 to unarmed strikes for 24 hours after a win).', loseConsequence: '2d6 bludgeoning damage (real). 20gp lost. A new nickname you didn\'t ask for.', audienceReaction: 'LOUD. Betting is aggressive. Someone throws a chair eventually.', secretOpportunity: 'The fight organizer is laundering money for the thieves guild. Noticing the financial irregularities (Investigation DC 16) is very valuable intel.' },
  { type: 'storytelling', name: 'The Tallest Tale', description: 'Tell the most outrageous story. The audience votes. Truth is optional. Entertainment is mandatory.', participationDC: 12, participationSkill: 'Performance or Deception', winReward: 'Free drinks for the night + a reputation as the best liar in town (useful or dangerous).', loseConsequence: 'Nothing lost except pride. The winner tells a better story and you have to buy them a drink.', audienceReaction: 'Leaning in. Gasping at the right moments. Suspicious narrowing of eyes at unlikely claims.', secretOpportunity: 'The previous winner\'s "tall tale" was actually true. They killed a dragon last month. Nobody believes them.' },
];

export function getRandomEntertainment(): TavernEntertainmentEvent {
  return EVENTS[Math.floor(Math.random() * EVENTS.length)];
}

export function getEntertainmentByType(type: EntertainmentType): TavernEntertainmentEvent[] {
  return EVENTS.filter((e) => e.type === type);
}

export function getEventsWithSecrets(): TavernEntertainmentEvent[] {
  return EVENTS.filter((e) => e.secretOpportunity !== null);
}

export function getAllEntertainmentTypes(): EntertainmentType[] {
  return [...new Set(EVENTS.map((e) => e.type))];
}

export function formatEntertainment(event: TavernEntertainmentEvent): string {
  const icon = { performance: '🎵', gambling: '🎲', contest: '🏆', fight_club: '🥊', storytelling: '📖' }[event.type];
  const lines = [`${icon} **${event.name}** *(${event.type.replace(/_/g, ' ')}, ${event.participationSkill} DC ${event.participationDC})*`];
  lines.push(`  *${event.description}*`);
  lines.push(`  🏆 Win: ${event.winReward}`);
  lines.push(`  💀 Lose: ${event.loseConsequence}`);
  lines.push(`  👥 Crowd: ${event.audienceReaction}`);
  if (event.secretOpportunity) lines.push(`  🤫 Secret: ${event.secretOpportunity}`);
  return lines.join('\n');
}

export { EVENTS as TAVERN_ENTERTAINMENT };
