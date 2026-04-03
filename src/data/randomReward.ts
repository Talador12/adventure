// Random non-gold reward — things NPCs can offer besides money.
export interface NonGoldReward { reward: string; category: 'favor' | 'item' | 'information' | 'service' | 'title' | 'property'; value: string; }
const REWARDS: NonGoldReward[] = [
  { reward: 'A favor owed — the NPC will help the party once, no questions asked.', category: 'favor', value: 'Priceless' },
  { reward: 'A map to a hidden dungeon they\'ve never explored.', category: 'information', value: '~500gp in potential treasure' },
  { reward: 'Free room and board at their inn for a year.', category: 'service', value: '~365gp' },
  { reward: 'A letter of introduction to a powerful noble.', category: 'favor', value: 'Access + reputation' },
  { reward: 'A trained war dog that obeys simple commands.', category: 'item', value: '~50gp' },
  { reward: 'The deed to a small abandoned cottage outside town.', category: 'property', value: '~200gp + a home base' },
  { reward: 'Title of "Friend of the Town" — free goods at local shops (10% discount).', category: 'title', value: 'Ongoing savings' },
  { reward: 'Information about a party member\'s backstory or missing person.', category: 'information', value: 'Plot advancement' },
  { reward: 'A recipe for a rare potion that can\'t be bought.', category: 'information', value: '~300gp per batch' },
  { reward: 'Safe passage through dangerous territory (guild escort).', category: 'service', value: 'Survival' },
  { reward: 'A magic item from the NPC\'s personal collection.', category: 'item', value: '~500-2000gp' },
  { reward: 'An apprenticeship — the NPC will train one party member in a tool/language.', category: 'service', value: 'New proficiency' },
];
export function getRandomReward(): NonGoldReward { return REWARDS[Math.floor(Math.random() * REWARDS.length)]; }
export function getRewardsByCategory(cat: NonGoldReward['category']): NonGoldReward[] { return REWARDS.filter((r) => r.category === cat); }
export function formatReward(r: NonGoldReward): string { return `🎁 **Reward** (${r.category}): ${r.reward}\n💰 Value: ${r.value}`; }
