// Random dream generator — prophetic/flavor dreams for long rests.
export interface Dream { description: string; type: 'prophetic' | 'nightmare' | 'peaceful' | 'surreal' | 'memory'; mechanicalEffect?: string; }
const DREAMS: Dream[] = [
  { description: 'You dream of a door that won\'t open, no matter how hard you push.', type: 'surreal' },
  { description: 'You see a great battle from a bird\'s-eye view. You can\'t tell who wins.', type: 'prophetic', mechanicalEffect: 'Advantage on next Initiative roll.' },
  { description: 'You\'re falling through endless clouds. You feel at peace.', type: 'peaceful' },
  { description: 'A voice in the dark whispers a name you don\'t recognize.', type: 'prophetic', mechanicalEffect: 'DM may reveal a clue.' },
  { description: 'You relive your worst memory, but this time the outcome is different.', type: 'memory' },
  { description: 'You\'re being chased by something you can\'t see. You wake in a cold sweat.', type: 'nightmare', mechanicalEffect: 'WIS DC 10 or gain no benefit from long rest (hit dice only).' },
  { description: 'A field of flowers stretches to the horizon. Nothing happens. It\'s perfect.', type: 'peaceful' },
  { description: 'You see the face of someone you haven\'t met yet. You\'ll recognize them when you do.', type: 'prophetic' },
  { description: 'Everything is underwater. You can breathe, but the world is silent.', type: 'surreal' },
  { description: 'You dream of your deity/patron. They seem pleased. Or is that disappointment?', type: 'prophetic', mechanicalEffect: 'Guidance from deity. Ask DM one yes/no question.' },
  { description: 'You\'re eating the best meal of your life but can\'t taste anything.', type: 'surreal' },
  { description: 'You dream of absolute darkness. When you wake, you remember the color of a hidden door.', type: 'prophetic', mechanicalEffect: 'Advantage on next Investigation check.' },
];
export function getRandomDream(): Dream { return DREAMS[Math.floor(Math.random() * DREAMS.length)]; }
export function getDreamsByType(type: Dream['type']): Dream[] { return DREAMS.filter((d) => d.type === type); }
export function formatDream(d: Dream, characterName: string): string { const icon = d.type === 'prophetic' ? '🔮' : d.type === 'nightmare' ? '😱' : d.type === 'peaceful' ? '😴' : d.type === 'memory' ? '💭' : '🌀'; return `${icon} **${characterName}'s Dream** (${d.type}):\n*${d.description}*${d.mechanicalEffect ? `\n⚡ Effect: ${d.mechanicalEffect}` : ''}`; }
