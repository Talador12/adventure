// Random quest generator — procedural quest with objective, reward, complication.

export interface GeneratedQuest {
  name: string;
  objective: string;
  questGiver: string;
  location: string;
  reward: string;
  complication: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  type: 'fetch' | 'kill' | 'escort' | 'rescue' | 'explore' | 'negotiate' | 'defend';
}

const OBJECTIVES = {
  fetch: ['Retrieve a stolen artifact from', 'Find the lost shipment somewhere in', 'Recover the ancient tome hidden in', 'Bring back a rare ingredient found in'],
  kill: ['Eliminate the threat lurking in', 'Hunt down the creature terrorizing', 'Clear the monsters infesting', 'Slay the beast that dwells in'],
  escort: ['Escort a merchant safely through', 'Guide a pilgrim to the shrine in', 'Protect a noble traveling through', 'Safely deliver a prisoner through'],
  rescue: ['Rescue the kidnapped villager from', 'Free the prisoners held in', 'Save the missing scouts lost in', 'Recover the children taken to'],
  explore: ['Map the uncharted passages of', 'Investigate the strange occurrences in', 'Scout ahead and report what lies in', 'Discover what happened to the expedition in'],
  negotiate: ['Broker a peace deal between factions at', 'Convince the hermit in', 'Settle the trade dispute at', 'Win the alliance of the clan living in'],
  defend: ['Defend the village from the attack on', 'Hold the bridge against forces from', 'Protect the caravan passing through', 'Guard the ritual site at'],
};
const LOCATIONS = ['the Darkwood Forest', 'the Abandoned Mine', 'the Sunken Temple', 'the Frozen Peak', 'the Goblin Warrens', 'the Haunted Ruins', 'the Merchant Quarter', 'the Underdark Passage', 'the Dragon\'s Lair', 'the Bandit Stronghold', 'the Elven Sanctuary', 'the Cursed Swamp'];
const QUEST_GIVERS = ['The village elder', 'A desperate merchant', 'A wounded knight', 'The local innkeeper', 'A mysterious stranger', 'The captain of the guard', 'A panicked farmer', 'A wealthy noble', 'A temple priest', 'A guild representative'];
const REWARDS = ['200gp', '500gp', '100gp + a magic item', '300gp + faction favor', 'A rare potion', 'Land deed + 150gp', '400gp + information about your backstory', 'Free lodging for life + 100gp', 'A favor from a powerful NPC'];
const COMPLICATIONS = ['The quest giver is lying about their motives.', 'A rival adventuring party is after the same objective.', 'The target is actually innocent / the monster is misunderstood.', 'There\'s a time limit — it must be done by dawn.', 'A traitor in the quest giver\'s organization is sabotaging efforts.', 'The reward was already promised to someone dangerous.', 'The location is cursed — magic works unreliably there.', 'Completing the quest will anger a powerful faction.', 'The real threat is much worse than described.', 'Someone the party cares about is involved on the opposing side.'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateQuest(): GeneratedQuest {
  const types = Object.keys(OBJECTIVES) as GeneratedQuest['type'][];
  const type = pick(types);
  const objectiveTemplate = pick(OBJECTIVES[type]);
  const location = pick(LOCATIONS);
  return {
    name: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${location.replace('the ', '')}`,
    objective: `${objectiveTemplate} ${location}.`,
    questGiver: pick(QUEST_GIVERS),
    location, reward: pick(REWARDS), complication: pick(COMPLICATIONS),
    urgency: pick(['low', 'medium', 'high', 'critical']),
    type,
  };
}

export function formatQuest(quest: GeneratedQuest): string {
  const urgencyEmoji = quest.urgency === 'critical' ? '🔴' : quest.urgency === 'high' ? '🟠' : quest.urgency === 'medium' ? '🟡' : '🟢';
  const typeEmoji = quest.type === 'kill' ? '⚔️' : quest.type === 'fetch' ? '📦' : quest.type === 'escort' ? '🛡️' : quest.type === 'rescue' ? '🆘' : quest.type === 'explore' ? '🔍' : quest.type === 'negotiate' ? '🤝' : '🏰';
  const lines = [`${typeEmoji} **${quest.name}** ${urgencyEmoji} (${quest.urgency})`];
  lines.push(`**Quest Giver:** ${quest.questGiver}`);
  lines.push(`**Objective:** ${quest.objective}`);
  lines.push(`**Reward:** ${quest.reward}`);
  lines.push(`🤫 **Complication:** ${quest.complication}`);
  return lines.join('\n');
}
