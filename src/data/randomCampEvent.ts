// Random camp event — things that happen during a long rest in the wilderness.
export interface CampEvent { event: string; type: 'peaceful' | 'interruption' | 'discovery' | 'roleplay'; mechanicalEffect: string | null; }
const EVENTS: CampEvent[] = [
  { event: 'A shooting star streaks across the sky. Someone makes a wish.', type: 'peaceful', mechanicalEffect: null },
  { event: 'A fox wanders into camp, stares at the fire, then leaves.', type: 'peaceful', mechanicalEffect: null },
  { event: 'Strange lights in the distance. Dancing, floating, beckoning.', type: 'discovery', mechanicalEffect: 'Investigation DC 14 reveals they\'re will-o\'-wisps. Don\'t follow.' },
  { event: 'The watch hears footsteps circling the camp. They stop when you look.', type: 'interruption', mechanicalEffect: 'Perception DC 15 to identify the source. It\'s watching.' },
  { event: 'Someone talks in their sleep. They say something revealing.', type: 'roleplay', mechanicalEffect: null },
  { event: 'A thunderstorm rolls in. Lightning strikes a tree 100ft away.', type: 'interruption', mechanicalEffect: 'CON DC 10 or gain no benefit from rest (noise). The tree has a hollow with 50gp inside.' },
  { event: 'An owl lands near the fire and watches the party all night. Wisdom in its eyes.', type: 'peaceful', mechanicalEffect: 'Anyone who prays/meditates: +1 to WIS checks tomorrow.' },
  { event: 'You find old campfire remains from other travelers. A message carved in a log: "Turn back."', type: 'discovery', mechanicalEffect: null },
];
export function getRandomCampEvent(): CampEvent { return EVENTS[Math.floor(Math.random() * EVENTS.length)]; }
export function formatCampEvent(e: CampEvent): string { return `🏕️ **Camp Event** (${e.type}):\n*${e.event}*${e.mechanicalEffect ? `\n⚙️ ${e.mechanicalEffect}` : ''}`; }
