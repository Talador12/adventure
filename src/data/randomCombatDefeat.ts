// Random combat defeat narration — when the party loses or retreats.
export interface DefeatNarration { narration: string; type: 'retreat' | 'capture' | 'tpk' | 'mercy'; aftermath: string; }
const NARRATIONS: DefeatNarration[] = [
  { narration: 'The retreat is desperate and uncoordinated. You run, leaving the battlefield behind.', type: 'retreat', aftermath: 'Regroup 1 mile away. Count your wounds. Plan your return.' },
  { narration: 'One by one, the party falls. Darkness closes in.', type: 'tpk', aftermath: 'Death save time. Or... wake up somewhere unexpected.' },
  { narration: '"Enough!" The enemy leader calls a halt. "Take them alive."', type: 'capture', aftermath: 'You awaken in chains. Your equipment is gone. A conversation is coming.' },
  { narration: 'The last standing member sees no path to victory. "We yield."', type: 'mercy', aftermath: 'Terms are dictated. The party is humbled but alive.' },
  { narration: 'Smoke fills your lungs. The building collapses around you. Everything goes dark.', type: 'tpk', aftermath: 'The rubble settles. Heroes or bodies — someone will come looking.' },
  { narration: '"Fall back! FALL BACK!" Someone screams it. Everyone obeys.', type: 'retreat', aftermath: 'You\'ve lost ground, supplies, and maybe pride. But you\'re breathing.' },
];
export function getDefeatNarration(type?: DefeatNarration['type']): DefeatNarration { const pool = type ? NARRATIONS.filter((n) => n.type === type) : NARRATIONS; return pool[Math.floor(Math.random() * pool.length)]; }
export function formatDefeatNarration(d: DefeatNarration): string { return `💀 *${d.narration}*\n\n📍 Aftermath: ${d.aftermath}`; }
