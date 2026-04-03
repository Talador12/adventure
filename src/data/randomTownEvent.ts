// Random town event — things happening when the party arrives in town.
export interface TownEvent { event: string; type: 'celebration' | 'crisis' | 'mystery' | 'political' | 'mundane'; hook: string; }
const EVENTS: TownEvent[] = [
  { event: 'A building is on fire and the bucket brigade needs help.', type: 'crisis', hook: 'The building contains something valuable.' },
  { event: 'A traveling circus has arrived. The crowds are enormous.', type: 'celebration', hook: 'One of the performers is a disguised spy.' },
  { event: 'A child has gone missing. The parents are frantic.', type: 'mystery', hook: 'The child wasn\'t kidnapped — they ran away with a secret.' },
  { event: 'Two noble families are in a public shouting match in the square.', type: 'political', hook: 'Both sides try to recruit the party.' },
  { event: 'It\'s market day. The streets are packed with merchants.', type: 'mundane', hook: 'A rare item is available at a steep discount.' },
  { event: 'Wanted posters with the party\'s faces are on every wall.', type: 'crisis', hook: 'The charges are fabricated by an enemy.' },
  { event: 'A bard in the square is telling a story about the party\'s previous exploits — with major embellishments.', type: 'mundane', hook: 'The bard has information about an upcoming quest.' },
  { event: 'The well has gone dry. Tensions are rising.', type: 'crisis', hook: 'Something is living in the well and blocking the water.' },
  { event: 'A delegation from a foreign land has arrived. Everyone is on their best behavior.', type: 'political', hook: 'The delegation is secretly scouting for an invasion.' },
  { event: 'An eclipse begins as the party enters town. The locals are terrified.', type: 'mystery', hook: 'The eclipse triggers ancient magic in a nearby ruin.' },
];
export function getRandomTownEvent(): TownEvent { return EVENTS[Math.floor(Math.random() * EVENTS.length)]; }
export function formatTownEvent(e: TownEvent): string { const icon = e.type === 'crisis' ? '🚨' : e.type === 'celebration' ? '🎉' : e.type === 'mystery' ? '🔍' : e.type === 'political' ? '🏛️' : '📌'; return `${icon} **Town Event** (${e.type}):\n*${e.event}*\n🎣 Hook: ${e.hook}`; }
