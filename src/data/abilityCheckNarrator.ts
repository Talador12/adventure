// Ability check narrator — dramatic descriptions for check results.
export type CheckOutcome = 'critical_success' | 'success' | 'failure' | 'critical_failure';
const NARRATIONS: Record<string, Record<CheckOutcome, string[]>> = {
  Athletics: { critical_success: ['With superhuman strength, you accomplish the impossible!', 'Muscles rippling, you make it look effortless.'], success: ['You strain but manage to succeed.', 'With effort, you pull through.'], failure: ['Your grip fails at the crucial moment.', 'Not quite strong enough.'], critical_failure: ['Something pops in your shoulder. -1 to STR checks for 1 hour.', 'You pull a muscle spectacularly.'] },
  Stealth: { critical_success: ['You become one with the shadows. Invisible even to darkvision.', 'Not a sound. Not a trace.'], success: ['You slip past unnoticed.', 'Quiet as a cat.'], failure: ['A floorboard creaks. Heads turn.', 'Your shadow gives you away.'], critical_failure: ['You knock over a stack of pots. Everyone heard that.', 'You trip and fall into plain view.'] },
  Persuasion: { critical_success: ['Your words are so compelling, they\'d convince a dragon to give up its hoard.'], success: ['Your argument wins them over.'], failure: ['They\'re not buying it.'], critical_failure: ['You\'ve deeply offended them. Disposition drops.'] },
  Perception: { critical_success: ['Your senses are razor-sharp. You notice everything.'], success: ['You spot it — barely, but you spot it.'], failure: ['Nothing catches your eye.'], critical_failure: ['You\'re so distracted you miss something obvious.'] },
};
export function narrateCheck(skill: string, outcome: CheckOutcome): string {
  const pool = NARRATIONS[skill]?.[outcome] || NARRATIONS['Athletics'][outcome];
  return pool[Math.floor(Math.random() * pool.length)];
}
export function getCheckOutcome(roll: number, dc: number): CheckOutcome {
  if (roll === 20) return 'critical_success'; if (roll === 1) return 'critical_failure';
  return roll >= dc ? 'success' : 'failure';
}
export function formatNarratedCheck(characterName: string, skill: string, roll: number, dc: number): string {
  const outcome = getCheckOutcome(roll, dc);
  const emoji = outcome === 'critical_success' ? '🌟' : outcome === 'success' ? '✅' : outcome === 'failure' ? '❌' : '💀';
  return `${emoji} **${characterName}** — ${skill} (${roll} vs DC ${dc}): *${narrateCheck(skill, outcome)}*`;
}
