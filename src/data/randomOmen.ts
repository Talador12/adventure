// Random omen generator — signs and portents to set the mood.
export interface Omen { description: string; type: 'good' | 'bad' | 'neutral' | 'ambiguous'; significance: 'minor' | 'major'; }
const OMENS: Omen[] = [
  { description: 'A raven lands on the party\'s path and stares directly at one member.', type: 'bad', significance: 'minor' },
  { description: 'The sky turns an unusual shade of green for a few moments.', type: 'ambiguous', significance: 'major' },
  { description: 'A shooting star crosses the sky in the direction you\'re traveling.', type: 'good', significance: 'minor' },
  { description: 'All dogs in the area begin howling at once, then abruptly stop.', type: 'bad', significance: 'major' },
  { description: 'A four-leaf clover is found right where you were about to step.', type: 'good', significance: 'minor' },
  { description: 'Thunder sounds from a cloudless sky.', type: 'ambiguous', significance: 'major' },
  { description: 'A candle flame burns blue for no apparent reason.', type: 'bad', significance: 'minor' },
  { description: 'A double rainbow appears after a brief shower.', type: 'good', significance: 'minor' },
  { description: 'Blood drips from a statue\'s eyes in a nearby temple.', type: 'bad', significance: 'major' },
  { description: 'The wind carries a familiar scent — something from a party member\'s past.', type: 'ambiguous', significance: 'minor' },
  { description: 'A white stag crosses your path and pauses to look at you.', type: 'good', significance: 'major' },
  { description: 'Every clock in town stops at the same time.', type: 'ambiguous', significance: 'major' },
];
export function getRandomOmen(): Omen { return OMENS[Math.floor(Math.random() * OMENS.length)]; }
export function getOmensByType(type: Omen['type']): Omen[] { return OMENS.filter((o) => o.type === type); }
export function formatOmen(o: Omen): string { const icon = o.type === 'good' ? '🌟' : o.type === 'bad' ? '⚠️' : o.type === 'neutral' ? '🔵' : '❓'; return `${icon} **Omen** (${o.type}, ${o.significance}):\n*${o.description}*`; }
