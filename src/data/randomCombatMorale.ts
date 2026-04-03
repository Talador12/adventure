// Random combat morale event — what enemies do when things go badly.
export interface MoraleEvent { trigger: string; reaction: string; mechanicalEffect: string; }
const EVENTS: MoraleEvent[] = [
  { trigger: 'Leader falls.', reaction: 'The remaining enemies panic and scatter.', mechanicalEffect: 'All enemies must make WIS DC 10 save or use their turn to Dash away.' },
  { trigger: '50% casualties.', reaction: 'The survivors fight more desperately.', mechanicalEffect: '+2 to attack rolls (reckless fury) but -2 AC.' },
  { trigger: 'A crit kills their strongest ally.', reaction: 'One enemy drops their weapon and surrenders.', mechanicalEffect: 'That enemy becomes a non-combatant. Others fight on.' },
  { trigger: 'The party uses a flashy spell.', reaction: 'Low-CR enemies are terrified.', mechanicalEffect: 'CR 1/2 and below: Frightened for 1 round (no save).' },
  { trigger: 'The environment becomes dangerous (fire, collapse).', reaction: 'Both sides reconsider.', mechanicalEffect: 'Enemies attempt to retreat to safety. May offer truce.' },
  { trigger: 'A PC goes down.', reaction: 'Enemies become overconfident.', mechanicalEffect: 'Enemies taunt and showboat. -1 to their next attack (distracted).' },
  { trigger: 'Reinforcements arrive (for either side).', reaction: 'Outnumbered side becomes desperate or retreats.', mechanicalEffect: 'Outnumbered 2:1 = WIS DC 12 save or attempt to flee.' },
];
export function getRandomMoraleEvent(): MoraleEvent { return EVENTS[Math.floor(Math.random() * EVENTS.length)]; }
export function formatMoraleEvent(e: MoraleEvent): string { return `💨 **Morale Event:**\n⚡ Trigger: ${e.trigger}\n🎭 Reaction: ${e.reaction}\n⚙️ ${e.mechanicalEffect}`; }
