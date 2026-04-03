// Downtime activity tracker — crafting, training, carousing, and research between adventures.

export type ActivityType = 'crafting' | 'training' | 'carousing' | 'research' | 'working' | 'recuperating' | 'crime' | 'religious_service';

export interface DowntimeActivity {
  type: ActivityType;
  name: string;
  duration: string;
  cost: number;
  skill: string;
  dc: number;
  successResult: string;
  failureResult: string;
  complication: string;
}

const ACTIVITIES: DowntimeActivity[] = [
  { type: 'crafting', name: 'Craft a Potion', duration: '1 week', cost: 25, skill: 'Arcana or Herbalism Kit', dc: 13, successResult: 'Create one Potion of Healing (2d4+2).', failureResult: 'Wasted materials. Lose 25gp.', complication: 'Your supplier raises prices — next crafting costs double.' },
  { type: 'crafting', name: 'Forge a Weapon', duration: '2 weeks', cost: 50, skill: 'Smith\'s Tools', dc: 14, successResult: 'Create a masterwork weapon (+1 to damage, non-magical).', failureResult: 'Weapon is flawed — breaks on a natural 1.', complication: 'The forge attracts attention from the smithing guild. They want dues.' },
  { type: 'training', name: 'Learn a Language', duration: '10 weeks', cost: 100, skill: 'Intelligence', dc: 12, successResult: 'Gain proficiency in one language.', failureResult: 'Partial understanding — can read but not speak fluently for 5 more weeks.', complication: 'Your teacher is a spy who reports your activities.' },
  { type: 'training', name: 'Weapon Proficiency', duration: '8 weeks', cost: 200, skill: 'Athletics or Acrobatics', dc: 14, successResult: 'Gain proficiency with one weapon type.', failureResult: 'Half-learned — can use the weapon but not add proficiency bonus for 4 more weeks.', complication: 'Your trainer challenges you to a public duel to prove your skill.' },
  { type: 'carousing', name: 'High Society Gala', duration: '1 week', cost: 100, skill: 'Persuasion', dc: 15, successResult: 'Make 1d4 noble contacts. One owes you a favor.', failureResult: 'Social faux pas. -2 to CHA checks with nobility for 1 month.', complication: 'You accidentally insult a powerful noble. They remember.' },
  { type: 'carousing', name: 'Tavern Crawl', duration: '3 days', cost: 20, skill: 'Constitution', dc: 12, successResult: 'Make 1d4 common contacts. Learn 1 rumor (DM provides).', failureResult: 'Massive hangover. 1 level of exhaustion. Lost 1d6 × 10 extra gp.', complication: 'You wake up married. To someone. They seem nice.' },
  { type: 'research', name: 'Library Research', duration: '1 week', cost: 50, skill: 'Investigation or History', dc: 14, successResult: 'Learn one lore secret about a topic of your choice.', failureResult: 'Dead end. The information doesn\'t exist here.', complication: 'Someone notices your research topic and now watches you.' },
  { type: 'working', name: 'Honest Labor', duration: '1 week', cost: 0, skill: 'None', dc: 0, successResult: 'Earn 2d4 × 5 gp. Maintain a modest lifestyle.', failureResult: 'N/A (always succeeds).', complication: 'Your employer asks you to do something morally questionable for a bonus.' },
  { type: 'recuperating', name: 'Rest and Recovery', duration: '1 week', cost: 10, skill: 'None', dc: 0, successResult: 'Remove one lingering injury, disease, or level of exhaustion.', failureResult: 'N/A (always succeeds).', complication: 'The healer notices something unusual about your body. Questions follow.' },
  { type: 'crime', name: 'Pick Pockets', duration: '1 week', cost: 0, skill: 'Sleight of Hand', dc: 14, successResult: 'Earn 3d6 × 5 gp from marks.', failureResult: 'Caught! 50gp fine or 1d4 days in jail.', complication: 'You accidentally rob a thieves guild member. They want a word.' },
  { type: 'religious_service', name: 'Temple Service', duration: '1 week', cost: 0, skill: 'Religion', dc: 11, successResult: 'Gain a favor from the temple. One free casting of a 1st-3rd level cleric spell.', failureResult: 'Mediocre service. No reward, but no penalty.', complication: 'The temple asks you to investigate a disturbance. For free.' },
];

export function getRandomActivity(): DowntimeActivity {
  return ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
}

export function getActivitiesByType(type: ActivityType): DowntimeActivity[] {
  return ACTIVITIES.filter((a) => a.type === type);
}

export function getFreeActivities(): DowntimeActivity[] {
  return ACTIVITIES.filter((a) => a.cost === 0);
}

export function getActivitiesByMaxDuration(weeks: number): DowntimeActivity[] {
  return ACTIVITIES.filter((a) => { const match = a.duration.match(/(\d+)\s*week/); return match ? parseInt(match[1]) <= weeks : true; });
}

export function getAllActivityTypes(): ActivityType[] {
  return [...new Set(ACTIVITIES.map((a) => a.type))];
}

export function formatActivity(activity: DowntimeActivity): string {
  const icon = { crafting: '🔨', training: '📚', carousing: '🍺', research: '🔍', working: '💼', recuperating: '🏥', crime: '🗡️', religious_service: '⛪' }[activity.type];
  const lines = [`${icon} **${activity.name}** *(${activity.type})*`];
  lines.push(`  Duration: ${activity.duration} | Cost: ${activity.cost > 0 ? activity.cost + 'gp' : 'Free'}`);
  if (activity.dc > 0) lines.push(`  Check: ${activity.skill} DC ${activity.dc}`);
  lines.push(`  ✅ Success: ${activity.successResult}`);
  if (activity.dc > 0) lines.push(`  ❌ Failure: ${activity.failureResult}`);
  lines.push(`  ⚠️ Complication: ${activity.complication}`);
  return lines.join('\n');
}

export { ACTIVITIES as DOWNTIME_ACTIVITIES };
