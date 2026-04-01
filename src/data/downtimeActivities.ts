// Downtime activities — between-adventure activities per D&D 5e rules.
// Each activity takes days and has outcomes.

export interface DowntimeActivity {
  id: string;
  name: string;
  description: string;
  daysRequired: number;
  goldCost: number;
  skillCheck?: string;    // e.g. "Arcana", "Athletics"
  dc?: number;
  successOutcome: string;
  failureOutcome: string;
}

export const DOWNTIME_ACTIVITIES: DowntimeActivity[] = [
  {
    id: 'crafting',
    name: 'Crafting',
    description: 'Craft a nonmagical item (tools proficiency required). Progress: 5gp/day.',
    daysRequired: 1,
    goldCost: 5,
    successOutcome: 'You make 5gp of progress toward crafting your item.',
    failureOutcome: 'Materials wasted — no progress.',
  },
  {
    id: 'research',
    name: 'Research',
    description: 'Spend time in a library or archive researching a topic.',
    daysRequired: 1,
    goldCost: 1,
    skillCheck: 'Investigation',
    dc: 15,
    successOutcome: 'You uncover a useful piece of lore or a clue to your quest.',
    failureOutcome: 'The archives yield nothing of value today.',
  },
  {
    id: 'training',
    name: 'Training (New Proficiency)',
    description: 'Train with an instructor to learn a new tool or language. Takes 250 days total.',
    daysRequired: 10,
    goldCost: 10,
    successOutcome: 'You make progress toward a new proficiency (10/250 days).',
    failureOutcome: 'Training progresses slowly.',
  },
  {
    id: 'carousing',
    name: 'Carousing',
    description: 'Spend a night drinking, gambling, and socializing. Might make friends or enemies.',
    daysRequired: 1,
    goldCost: 10,
    skillCheck: 'Persuasion',
    dc: 12,
    successOutcome: 'You make a useful contact! A friendly NPC owes you a favor.',
    failureOutcome: 'You wake up with a headache, lighter pockets, and a vague memory of insulting someone important.',
  },
  {
    id: 'pit-fighting',
    name: 'Pit Fighting',
    description: 'Compete in underground fighting rings for gold and glory.',
    daysRequired: 1,
    goldCost: 0,
    skillCheck: 'Athletics',
    dc: 14,
    successOutcome: 'Victory! You earn 50gp in prize money and gain a reputation.',
    failureOutcome: 'Defeat. You take a beating and lose your entry stake.',
  },
  {
    id: 'recuperating',
    name: 'Recuperating',
    description: 'Spend time resting to recover from lingering injuries or disease.',
    daysRequired: 3,
    goldCost: 0,
    successOutcome: 'You end one effect preventing HP recovery, or remove one exhaustion level.',
    failureOutcome: 'Rest helps, but full recovery eludes you.',
  },
  {
    id: 'gambling',
    name: 'Gambling',
    description: 'Test your luck at cards, dice, or other games of chance.',
    daysRequired: 1,
    goldCost: 25,
    skillCheck: 'Insight',
    dc: 13,
    successOutcome: 'You win! Earn 2x your stake (50gp profit).',
    failureOutcome: 'The house wins. You lose your 25gp stake.',
  },
];

export function performDowntimeActivity(activityId: string, skillMod: number): { success: boolean; outcome: string; goldChange: number } {
  const activity = DOWNTIME_ACTIVITIES.find((a) => a.id === activityId);
  if (!activity) return { success: false, outcome: 'Unknown activity.', goldChange: 0 };

  let success = true;
  if (activity.skillCheck && activity.dc) {
    const roll = Math.floor(Math.random() * 20) + 1 + skillMod;
    success = roll >= activity.dc;
  }

  let goldChange = -activity.goldCost;
  if (success) {
    if (activityId === 'pit-fighting') goldChange += 50;
    if (activityId === 'gambling') goldChange += 75; // 25 cost + 50 profit
  }

  return {
    success,
    outcome: success ? activity.successOutcome : activity.failureOutcome,
    goldChange,
  };
}
