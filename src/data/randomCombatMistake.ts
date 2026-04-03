// Random combat mistake — errors enemies make that create openings.
export interface CombatMistake { mistake: string; opening: string; duration: string; }
const MISTAKES: CombatMistake[] = [
  { mistake: 'An enemy trips over a fallen ally.', opening: 'They\'re prone. Melee attacks against them have advantage until they stand.', duration: 'Until start of their next turn.' },
  { mistake: 'Two enemies collide trying to attack the same PC.', opening: 'Both are stunned until end of their next turn.', duration: '1 round.' },
  { mistake: 'An enemy\'s weapon gets stuck in a wooden beam.', opening: 'They\'re unarmed for 1 round. STR DC 12 to free it as an action.', duration: '1 round or until freed.' },
  { mistake: 'The enemy spellcaster miscasts — the spell fizzles.', opening: 'The slot is wasted. The caster is visibly shaken. -2 to next spell attack.', duration: '1 round.' },
  { mistake: 'An archer fires and the bowstring snaps.', opening: 'Must switch to melee or spend an action restringing.', duration: 'Until repaired.' },
  { mistake: 'An enemy steps into their own trap.', opening: 'They take the trap\'s damage/effect. Poetic justice.', duration: 'Per the trap.' },
  { mistake: 'The enemy leader gives a contradictory order. Enemies hesitate.', opening: 'All enemies lose their reaction until start of next round.', duration: '1 round.' },
];
export function getRandomMistake(): CombatMistake { return MISTAKES[Math.floor(Math.random() * MISTAKES.length)]; }
export function formatCombatMistake(m: CombatMistake): string { return `😅 **Enemy Mistake:**\n*${m.mistake}*\n⚡ Opening: ${m.opening}\n⏰ ${m.duration}`; }
