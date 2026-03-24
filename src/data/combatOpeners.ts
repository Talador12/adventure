// Combat openers — dramatic first lines when initiative is rolled.
// Rotated randomly. Sets the tone for the encounter.
// "Roll for initiative." But with feeling.

const OPENERS = [
  'Steel clashes. The fight is on.',
  'The air changes. Weapons are drawn.',
  'A moment of silence before the storm breaks.',
  'Eyes meet across the battlefield. No more words.',
  'The ground trembles with the weight of what comes next.',
  'Time slows. Every heartbeat counts from here.',
  'This is the part where things get interesting.',
  'The conversation is over. Roll for initiative.',
  'Somewhere, a bard just reached for their instrument.',
  'The dice hit the table. Here we go.',
];

export function combatOpener(): string {
  return OPENERS[Math.floor(Math.random() * OPENERS.length)];
}
