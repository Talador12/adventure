// Random quest reward negotiation — NPCs who haggle over payment for completed quests.

export type NpcAttitude = 'grateful' | 'stingy' | 'fair' | 'generous_but_broke' | 'dishonest';

export interface RewardOffer { type: string; value: number; description: string; }
export interface NegotiationLever { lever: string; dc: number; skill: string; effect: string; }

export interface QuestRewardNegotiation {
  npcName: string;
  attitude: NpcAttitude;
  originalOffer: RewardOffer;
  bestPossibleDeal: RewardOffer;
  worstDeal: RewardOffer;
  levers: NegotiationLever[];
  walkAwayConsequence: string;
  hiddenReward: string | null;
}

const NEGOTIATIONS: QuestRewardNegotiation[] = [
  { npcName: 'Mayor Bramblewood', attitude: 'stingy', originalOffer: { type: 'Gold', value: 50, description: '"Fifty gold. That\'s generous for what you did."' }, bestPossibleDeal: { type: 'Gold + Land', value: 300, description: '"Fine! 200 gold AND the old watchtower. Happy now?"' }, worstDeal: { type: 'Handshake', value: 0, description: '"A firm handshake and the gratitude of this town."' }, levers: [
    { lever: 'Mention the danger was greater than advertised', dc: 12, skill: 'Persuasion', effect: '+50gp added to offer.' },
    { lever: 'Threaten to tell the town council he underpays heroes', dc: 14, skill: 'Intimidation', effect: '+100gp and the watchtower deed.' },
    { lever: 'Offer to do another quest at reduced rate (loyalty deal)', dc: 11, skill: 'Persuasion', effect: 'Original offer + promise of first pick on future quests.' },
  ], walkAwayConsequence: 'The mayor badmouths you to other quest-givers. -1 to Persuasion in this town for 1 month.', hiddenReward: 'The watchtower has a hidden cellar with 500gp in old coins. The mayor doesn\'t know.' },
  { npcName: 'Lady Ashwick', attitude: 'grateful', originalOffer: { type: 'Gold + Magic Item', value: 500, description: '"Please take this. It\'s the least I can do. You saved my son."' }, bestPossibleDeal: { type: 'Gold + Magic Item + Political Favor', value: 800, description: '"Name it. Anything in my power is yours."' }, worstDeal: { type: 'Gold', value: 300, description: '"I insist on at least this much."' }, levers: [
    { lever: 'Ask for a political introduction instead of extra gold', dc: 10, skill: 'Persuasion', effect: 'Introduction to the Duke. Opens noble quest lines.' },
    { lever: 'Request the family heirloom instead', dc: 13, skill: 'Persuasion', effect: '+1 weapon (family blade, also quest hook).' },
  ], walkAwayConsequence: 'Lady Ashwick is hurt but understanding. She leaves a package at your inn. It\'s better than what she originally offered.', hiddenReward: null },
  { npcName: 'Fingers McGee (fence)', attitude: 'dishonest', originalOffer: { type: 'Gold', value: 200, description: '"Two hundred. Fair and square. Don\'t look at me like that."' }, bestPossibleDeal: { type: 'Gold + Intel', value: 400, description: '"400 AND I tell you about the vault job next month. We good?"' }, worstDeal: { type: 'Threat', value: 0, description: '"Actually, I think you owe ME. Remember that thing I know about you?"' }, levers: [
    { lever: 'Prove you know his real name', dc: 15, skill: 'Intimidation', effect: 'Doubles the offer immediately. He sweats visibly.' },
    { lever: 'Offer to do one more job for him', dc: 11, skill: 'Persuasion', effect: '+100gp now plus payment for the next job.' },
    { lever: 'Catch him in a lie about the item\'s value', dc: 14, skill: 'Insight', effect: 'He admits it\'s worth triple. Pays 400gp out of embarrassment.' },
  ], walkAwayConsequence: 'Fingers sells the item to someone else and keeps your cut. Also steals something from your bag on the way out (Sleight of Hand +8 vs Perception).', hiddenReward: 'The "worthless trinket" he tried to palm off is actually a key to a much bigger score.' },
  { npcName: 'Old Farmer Giles', attitude: 'generous_but_broke', originalOffer: { type: 'Food + Lodging', value: 10, description: '"I ain\'t got much gold, but you\'re welcome to eat and sleep here as long as you need."' }, bestPossibleDeal: { type: 'Food + Lodging + Family Secret', value: 50, description: '"I can\'t pay gold... but I know where the old lord buried something. Been keepin\' it secret 40 years."' }, worstDeal: { type: 'A sincere thank you', value: 0, description: '"*tears up* Thank you. I\'ll remember this till I die."' }, levers: [
    { lever: 'Accept graciously and ask for nothing', dc: 0, skill: 'None', effect: 'He volunteers the buried treasure location unprompted. Generosity begets generosity.' },
    { lever: 'Ask about local legends (subtly fishing)', dc: 10, skill: 'Persuasion', effect: 'He shares the burial site story over dinner.' },
  ], walkAwayConsequence: 'No consequence. He waves you off with a packed lunch. The lunch contains a note: "The oak with three trunks. Dig south."', hiddenReward: 'The buried treasure is worth 1,000gp. Old Farmer Giles had the real treasure all along.' },
];

export function getRandomNegotiation(): QuestRewardNegotiation {
  return NEGOTIATIONS[Math.floor(Math.random() * NEGOTIATIONS.length)];
}

export function getNegotiationsByAttitude(attitude: NpcAttitude): QuestRewardNegotiation[] {
  return NEGOTIATIONS.filter((n) => n.attitude === attitude);
}

export function getMaxRewardValue(neg: QuestRewardNegotiation): number {
  return neg.bestPossibleDeal.value;
}

export function getNegotiationsWithHiddenRewards(): QuestRewardNegotiation[] {
  return NEGOTIATIONS.filter((n) => n.hiddenReward !== null);
}

export function getAllAttitudes(): NpcAttitude[] {
  return [...new Set(NEGOTIATIONS.map((n) => n.attitude))];
}

export function formatNegotiation(neg: QuestRewardNegotiation): string {
  const icon = { grateful: '😊', stingy: '😒', fair: '🤝', generous_but_broke: '😢', dishonest: '😏' }[neg.attitude];
  const lines = [`${icon} **${neg.npcName}** *(${neg.attitude.replace(/_/g, ' ')})*`];
  lines.push(`  Original: ${neg.originalOffer.description} (${neg.originalOffer.value}gp)`);
  lines.push(`  Best: ${neg.bestPossibleDeal.value}gp | Worst: ${neg.worstDeal.value}gp`);
  neg.levers.forEach((l) => lines.push(`  🎯 ${l.lever} (${l.skill} DC ${l.dc})`));
  return lines.join('\n');
}

export { NEGOTIATIONS as QUEST_REWARD_NEGOTIATIONS };
