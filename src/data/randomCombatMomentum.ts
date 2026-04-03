// Random combat momentum shift — the tide of battle turns.
export interface MomentumShift { trigger: string; effect: string; benefits: string; duration: string; }
const SHIFTS: MomentumShift[] = [
  { trigger: 'A PC scores a critical hit on the enemy leader.', effect: 'Enemy morale breaks. Party gains confidence.', benefits: 'Party: +1 to attacks for 2 rounds. Enemies: WIS DC 10 or frightened.', duration: '2 rounds.' },
  { trigger: 'An ally falls unconscious.', effect: 'Desperation fuels the remaining party members.', benefits: 'All conscious allies: +2 to damage for 1 round.', duration: '1 round.' },
  { trigger: 'The environment changes dramatically (collapse, flood, fire).', effect: 'Everyone scrambles. Formation breaks.', benefits: 'Initiative re-rolled. Terrain advantage shifts.', duration: 'Rest of combat.' },
  { trigger: 'A previously hidden enemy reveals themselves.', effect: 'Surprise and confusion.', benefits: 'Hidden enemy gets a free action. Party: disadvantage on first reaction.', duration: '1 round.' },
  { trigger: 'The party uses a devastating combo (2+ abilities in sequence).', effect: 'Enemies are demoralized by the display.', benefits: 'Party: advantage on Intimidation. Enemies may surrender.', duration: 'Until enemies rally (2-3 rounds).' },
  { trigger: 'Both sides have taken heavy casualties.', effect: 'The fight becomes personal. Last stand energy.', benefits: 'Everyone: +1 to attack and damage. No retreating.', duration: 'Rest of combat.' },
];
export function getRandomShift(): MomentumShift { return SHIFTS[Math.floor(Math.random() * SHIFTS.length)]; }
export function formatMomentumShift(s: MomentumShift): string { return `🔄 **Momentum Shift!**\n⚡ Trigger: ${s.trigger}\n🎭 ${s.effect}\n💪 ${s.benefits}\n⏰ ${s.duration}`; }
