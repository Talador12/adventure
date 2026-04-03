// Random encounter twist — "yes, but..." additions to any encounter.
export interface EncounterTwist { twist: string; timing: 'before' | 'during' | 'after'; impact: 'minor' | 'major'; }
const TWISTS: EncounterTwist[] = [
  { twist: 'The enemies are already injured from a previous fight.', timing: 'before', impact: 'minor' },
  { twist: 'One enemy is actually an ally in disguise, waiting for the right moment.', timing: 'during', impact: 'major' },
  { twist: 'After the fight, one enemy was carrying a letter addressed to a party member.', timing: 'after', impact: 'major' },
  { twist: 'The terrain is unstable — sinkholes appear randomly each round.', timing: 'during', impact: 'minor' },
  { twist: 'A third party is watching from the shadows. They approach after the fight.', timing: 'after', impact: 'minor' },
  { twist: 'The enemies surrender if reduced to 50% strength — they have information to trade.', timing: 'during', impact: 'major' },
  { twist: 'The fight attracts something larger. You have 5 rounds before it arrives.', timing: 'during', impact: 'major' },
  { twist: 'An innocent NPC is caught in the crossfire — protect them!', timing: 'before', impact: 'minor' },
  { twist: 'The enemies are protecting something — a child, an egg, a prisoner.', timing: 'before', impact: 'major' },
  { twist: 'Looting the bodies reveals they\'re not who you thought they were.', timing: 'after', impact: 'major' },
];
export function getRandomEncounterTwist(): EncounterTwist { return TWISTS[Math.floor(Math.random() * TWISTS.length)]; }
export function formatEncounterTwist(t: EncounterTwist): string { const icon = t.timing === 'before' ? '⏮️' : t.timing === 'during' ? '⏯️' : '⏭️'; return `${icon} **Encounter Twist** (${t.timing} combat, ${t.impact}):\n*${t.twist}*`; }
