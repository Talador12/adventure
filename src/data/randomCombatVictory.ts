// Random combat victory description — dramatic narration when combat ends.
export interface VictoryNarration { narration: string; type: 'decisive' | 'pyrrhic' | 'narrow' | 'merciful' | 'intimidating'; }
const NARRATIONS: VictoryNarration[] = [
  { narration: 'The last enemy falls. Silence descends on the battlefield. You are victorious — but at what cost?', type: 'pyrrhic' },
  { narration: 'With a final, decisive blow, combat ends as quickly as it began. The party barely broke a sweat.', type: 'decisive' },
  { narration: 'The remaining enemies throw down their weapons and flee. Your reputation precedes you.', type: 'intimidating' },
  { narration: 'Breathing heavily, covered in blood (not all of it theirs), the party surveys the carnage. That was close.', type: 'narrow' },
  { narration: 'The last enemy kneels. "Mercy," they whisper. The choice is yours.', type: 'merciful' },
  { narration: 'It\'s over. The echo of steel on steel fades. Someone should say something, but no one does.', type: 'narrow' },
  { narration: 'Victory! The crowd erupts in cheers — if there\'s a crowd. If not, only the wind witnesses your triumph.', type: 'decisive' },
  { narration: 'The enemy commander falls. Their forces scatter like leaves in a storm. The day is won.', type: 'intimidating' },
];
export function getVictoryNarration(type?: VictoryNarration['type']): VictoryNarration { const pool = type ? NARRATIONS.filter((n) => n.type === type) : NARRATIONS; return pool[Math.floor(Math.random() * pool.length)]; }
export function formatVictoryNarration(v: VictoryNarration): string { return `🏆 *${v.narration}*`; }
