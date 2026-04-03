// Random consequence generator — delayed results of past player actions.
export interface Consequence { action: string; consequence: string; delay: string; severity: 'minor' | 'moderate' | 'major'; type: 'social' | 'combat' | 'economic' | 'narrative'; }
const CONSEQUENCES: Consequence[] = [
  { action: 'Spared the bandit leader', consequence: 'The bandits reorganize under new leadership — and remember who humiliated them.', delay: '1d4 sessions later', severity: 'moderate', type: 'combat' },
  { action: 'Stole from the merchant', consequence: 'Word spreads. Prices increase 20% in the region. Some shops refuse service.', delay: 'Next visit to town', severity: 'moderate', type: 'economic' },
  { action: 'Helped the orphanage', consequence: 'A former orphan, now grown, recognizes the party and offers critical aid.', delay: '2d4 sessions later', severity: 'minor', type: 'narrative' },
  { action: 'Killed the dragon', consequence: 'The dragon\'s mate is hunting for whoever did this.', delay: '1d6 sessions later', severity: 'major', type: 'combat' },
  { action: 'Made a deal with a devil', consequence: 'The devil calls in the favor at the worst possible moment.', delay: 'When it hurts the most', severity: 'major', type: 'narrative' },
  { action: 'Lied to the king', consequence: 'The truth comes out. The party is summoned to court.', delay: '2d4 sessions later', severity: 'major', type: 'social' },
  { action: 'Saved the village', consequence: 'The village erects a statue. The party has a safe haven forever.', delay: 'Immediate + ongoing', severity: 'minor', type: 'social' },
  { action: 'Ignored the warning', consequence: 'The thing they were warned about happens. Exactly as described.', delay: 'Next session', severity: 'moderate', type: 'narrative' },
];
export function getRandomConsequence(): Consequence { return CONSEQUENCES[Math.floor(Math.random() * CONSEQUENCES.length)]; }
export function formatConsequence(c: Consequence): string { return `⏳ **Delayed Consequence** (${c.severity}, ${c.type}):\n📌 Past action: *${c.action}*\n💥 Result: ${c.consequence}\n⏰ When: ${c.delay}`; }
