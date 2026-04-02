// Downtime activity system — activities between adventures.
// Each activity takes days, may cost gold, and produces a result.

export type ActivityType = 'training' | 'research' | 'crafting' | 'working' | 'carousing' | 'recuperating' | 'crime' | 'religious';

export interface DowntimeActivity {
  id: string;
  type: ActivityType;
  name: string;
  emoji: string;
  description: string;
  daysRequired: number;
  goldCost: number;
  checkAbility: string;
  checkDC: number;
  successResult: string;
  failResult: string;
  complications: string[];
}

export const DOWNTIME_ACTIVITIES: DowntimeActivity[] = [
  {
    id: 'train-weapon', type: 'training', name: 'Weapon Training', emoji: '⚔️',
    description: 'Train with a weapon to gain proficiency.',
    daysRequired: 250, goldCost: 250, checkAbility: 'STR', checkDC: 0,
    successResult: 'Gain proficiency with one weapon type.',
    failResult: 'N/A (training always succeeds given time).',
    complications: ['Trainer is arrested for a crime', 'Training injury — 1d4 days lost'],
  },
  {
    id: 'train-tool', type: 'training', name: 'Tool Training', emoji: '🔧',
    description: 'Learn to use a new tool set.',
    daysRequired: 250, goldCost: 250, checkAbility: 'INT', checkDC: 0,
    successResult: 'Gain proficiency with one tool set.',
    failResult: 'N/A (training always succeeds given time).',
    complications: ['Materials are stolen', 'Trainer demands more payment'],
  },
  {
    id: 'train-language', type: 'training', name: 'Language Study', emoji: '📖',
    description: 'Learn a new language from a tutor.',
    daysRequired: 250, goldCost: 250, checkAbility: 'INT', checkDC: 0,
    successResult: 'Learn one new language.',
    failResult: 'N/A.',
    complications: ['Tutor is a spy using the opportunity to gather intel'],
  },
  {
    id: 'research', type: 'research', name: 'Library Research', emoji: '📚',
    description: 'Research a topic in a library or archive.',
    daysRequired: 7, goldCost: 50, checkAbility: 'INT', checkDC: 12,
    successResult: 'Learn one piece of lore about the researched topic.',
    failResult: 'Research is inconclusive. May try again.',
    complications: ['Restricted section requires special access', 'A rival researcher steals your notes'],
  },
  {
    id: 'work', type: 'working', name: 'Work a Job', emoji: '💼',
    description: 'Earn a modest income between adventures.',
    daysRequired: 7, goldCost: 0, checkAbility: 'CHA', checkDC: 10,
    successResult: 'Earn 2gp/day (14gp/week).',
    failResult: 'Earn 1gp/day (7gp/week).',
    complications: ['Boss is a cultist', 'Coworker picks a fight'],
  },
  {
    id: 'carouse', type: 'carousing', name: 'Carousing', emoji: '🍻',
    description: 'Spend time drinking, gambling, and socializing.',
    daysRequired: 7, goldCost: 100, checkAbility: 'CHA', checkDC: 0,
    successResult: 'Make 1d4 contacts. Roll on the carousing table.',
    failResult: 'N/A.',
    complications: [
      'Woke up married to a stranger',
      'Gambling debt of 3d6 × 10gp',
      'Made an enemy of a local noble',
      'Joined a cult (accidentally)',
      'Picked a fight with a guard — fined 2d6 × 5gp',
      'Won a small fortune: gain 2d6 × 10gp',
    ],
  },
  {
    id: 'recuperate', type: 'recuperating', name: 'Recuperation', emoji: '🩹',
    description: 'Rest and recover from long-term conditions.',
    daysRequired: 7, goldCost: 0, checkAbility: 'CON', checkDC: 15,
    successResult: 'End one effect preventing HP recovery, or recover from disease/poison.',
    failResult: 'No recovery yet. Try again next week.',
    complications: [],
  },
  {
    id: 'crime', type: 'crime', name: 'Petty Crime', emoji: '🦹',
    description: 'Pick pockets, burgle, or run a con.',
    daysRequired: 7, goldCost: 25, checkAbility: 'DEX', checkDC: 14,
    successResult: 'Earn 3d6 × 5gp from ill-gotten gains.',
    failResult: 'Caught! Pay a fine of 2d6 × 5gp or spend 1d4 days in jail.',
    complications: ['A crime boss wants a cut', 'Victim hires a bounty hunter', 'Guard recognizes you later'],
  },
  {
    id: 'pray', type: 'religious', name: 'Religious Service', emoji: '⛪',
    description: 'Serve at a temple, gaining favor with the faithful.',
    daysRequired: 7, goldCost: 0, checkAbility: 'WIS', checkDC: 10,
    successResult: 'Gain a favor from the temple (free healing, lodging, or information).',
    failResult: 'Service noted but no special favor granted.',
    complications: ['Temple requests a dangerous quest in return', 'Rival faith takes offense'],
  },
];

export function rollComplication(activity: DowntimeActivity): string | null {
  if (activity.complications.length === 0) return null;
  // 20% chance of complication
  if (Math.random() > 0.2) return null;
  return activity.complications[Math.floor(Math.random() * activity.complications.length)];
}

export function resolveDowntime(activity: DowntimeActivity, abilityMod: number, profBonus: number): {
  success: boolean; roll: number; result: string; complication: string | null; goldEarned: number;
} {
  const roll = activity.checkDC > 0 ? Math.floor(Math.random() * 20) + 1 + abilityMod + profBonus : 0;
  const success = activity.checkDC === 0 || roll >= activity.checkDC;
  const complication = rollComplication(activity);

  let goldEarned = 0;
  if (activity.id === 'work') goldEarned = success ? 14 : 7;
  if (activity.id === 'crime' && success) goldEarned = (Math.floor(Math.random() * 16) + 3) * 5;

  return {
    success,
    roll,
    result: success ? activity.successResult : activity.failResult,
    complication,
    goldEarned,
  };
}

export function formatDowntimeResult(activity: DowntimeActivity, result: ReturnType<typeof resolveDowntime>): string {
  const lines = [`${activity.emoji} **${activity.name}** (${activity.daysRequired} days, ${activity.goldCost}gp)`];
  if (activity.checkDC > 0) lines.push(`Roll: ${result.roll} vs DC ${activity.checkDC} — ${result.success ? '✅ Success' : '❌ Failed'}`);
  lines.push(result.result);
  if (result.goldEarned > 0) lines.push(`💰 Earned ${result.goldEarned}gp`);
  if (result.complication) lines.push(`⚠️ **Complication:** ${result.complication}`);
  return lines.join('\n');
}
