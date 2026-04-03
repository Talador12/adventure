// Random party banter — suggested dialogue between party members during downtime.
export interface PartyBanter { setup: string; characterA: string; characterB: string; punchline: string; type: 'humor' | 'bonding' | 'tension' | 'philosophical'; }
const BANTERS: PartyBanter[] = [
  { setup: '"So... how exactly does your magic work?"', characterA: 'Martial', characterB: 'Caster', punchline: '"Imagine hitting someone, but from 120 feet away. With fire."', type: 'humor' },
  { setup: '"Do you ever think about what we\'re doing? Like, really think?"', characterA: 'Any', characterB: 'Any', punchline: '"Every night. That\'s why I drink."', type: 'philosophical' },
  { setup: '"I trust you with my life."', characterA: 'Any', characterB: 'Any', punchline: '"...That\'s a lot of pressure. Can you trust me with something smaller first?"', type: 'bonding' },
  { setup: '"You took the last ration."', characterA: 'Any', characterB: 'Any', punchline: '"I\'m a growing adventurer." "You\'re a 40-year-old dwarf."', type: 'tension' },
  { setup: '"What did you want to be before... all this?"', characterA: 'Any', characterB: 'Any', punchline: '"Alive, mostly. Still working on that."', type: 'bonding' },
  { setup: '"Why do we always split up? It never works."', characterA: 'Rogue', characterB: 'Any', punchline: '"Because no one trusts me alone with the treasure."', type: 'humor' },
];
export function getRandomBanter(): PartyBanter { return BANTERS[Math.floor(Math.random() * BANTERS.length)]; }
export function formatBanter(b: PartyBanter): string { return `💬 **Party Banter** (${b.type}):\n${b.characterA}: *${b.setup}*\n${b.characterB}: *${b.punchline}*`; }
