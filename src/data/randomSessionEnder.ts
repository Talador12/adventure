// Random session ender — cliffhanger hooks to end on a dramatic note.
export interface SessionEnder { hook: string; type: 'cliffhanger' | 'revelation' | 'arrival' | 'threat' | 'mystery'; }
const ENDERS: SessionEnder[] = [
  { hook: 'As you settle in for the night, a scream pierces the darkness. It came from the direction you\'re heading.', type: 'threat' },
  { hook: 'You open the chest. Inside is... your own portrait. Painted recently. By someone who has been watching you.', type: 'mystery' },
  { hook: '"I wouldn\'t go that way if I were you," says a voice. You turn. No one is there.', type: 'mystery' },
  { hook: 'The road ahead opens up to reveal a city. A city that shouldn\'t exist. A city that burned to the ground a hundred years ago.', type: 'revelation' },
  { hook: 'A messenger arrives, breathless. "You need to come home. Now. They\'re coming."', type: 'cliffhanger' },
  { hook: 'The ground shakes. In the distance, something enormous rises from the earth.', type: 'threat' },
  { hook: 'The NPC you trusted most pulls you aside and whispers: "Everything I\'ve told you is a lie."', type: 'revelation' },
  { hook: 'You reach the top of the hill. Below, an army stretches to the horizon. They\'re marching toward home.', type: 'arrival' },
  { hook: 'The letter contains a single sentence: "They know what you did."', type: 'cliffhanger' },
  { hook: 'As you make camp, you realize someone has been following you. For days. And they want to be noticed.', type: 'mystery' },
];
export function getRandomEnder(): SessionEnder { return ENDERS[Math.floor(Math.random() * ENDERS.length)]; }
export function formatSessionEnder(e: SessionEnder): string { const icon = e.type === 'cliffhanger' ? '⏰' : e.type === 'revelation' ? '💡' : e.type === 'arrival' ? '🏰' : e.type === 'threat' ? '⚠️' : '❓'; return `${icon} **Session Ender** (${e.type}):\n\n*${e.hook}*\n\n🎬 *"And that's where we'll pick up next time."*`; }
