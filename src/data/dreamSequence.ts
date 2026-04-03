// Dream sequence generator — narrative dream encounters with symbolic choices.

export type DreamType = 'prophetic' | 'nightmare' | 'memory' | 'symbolic' | 'divine_message' | 'astral_wandering';

export interface DreamChoice {
  option: string;
  consequence: string;
  mechanicalEffect: string | null;
}

export interface DreamSequence {
  title: string;
  type: DreamType;
  narration: string;
  imagery: string[];
  choices: DreamChoice[];
  wakeEffect: string; // what happens when the dreamer wakes
}

const DREAMS: DreamSequence[] = [
  {
    title: 'The Endless Staircase',
    type: 'prophetic',
    narration: 'You climb a spiral staircase that stretches beyond the clouds. Each step echoes with a voice you recognize. At the top, a door stands open. Light — or darkness — waits beyond.',
    imagery: ['Steps made of old promises', 'Voices of the dead murmuring names', 'A door that breathes'],
    choices: [
      { option: 'Step through the door', consequence: 'You see a flash of the next major plot point — a face, a place, a danger.', mechanicalEffect: 'Advantage on next Insight check.' },
      { option: 'Turn around and descend', consequence: 'The stairs collapse behind you. You wake falling.', mechanicalEffect: null },
      { option: 'Shout into the light', consequence: 'A voice answers. It gives you a single word. It will mean something soon.', mechanicalEffect: 'DM gives a cryptic one-word clue.' },
    ],
    wakeEffect: 'You remember the dream vividly. It fades by noon.',
  },
  {
    title: 'The Drowned City',
    type: 'nightmare',
    narration: 'A city you once knew lies beneath black water. You walk its streets, breathing water as if it were air. The buildings lean toward you. Faces press against the windows.',
    imagery: ['Streets paved with bones', 'Windows that watch you', 'Your own reflection drowning while you stand dry'],
    choices: [
      { option: 'Open a door', consequence: 'Inside is a room from your childhood. Something is wrong with the furniture.', mechanicalEffect: null },
      { option: 'Follow the current deeper', consequence: 'You find something you lost. It shouldn\'t be here.', mechanicalEffect: 'Recover a personal item or memory.' },
      { option: 'Refuse to move', consequence: 'The city rises around you. You wake gasping.', mechanicalEffect: 'Frightened condition for 10 minutes on waking.' },
    ],
    wakeEffect: 'Cold sweat. WIS DC 10 or short rest doesn\'t benefit you this time.',
  },
  {
    title: 'The Feast of Forgotten Gods',
    type: 'divine_message',
    narration: 'A table stretches across a field of stars. Figures in ancient garb eat in silence. An empty chair bears your name. They look up when you arrive.',
    imagery: ['Food that tastes like music', 'A goblet filled with liquid starlight', 'Eyes older than the world'],
    choices: [
      { option: 'Sit and eat', consequence: 'You taste something transcendent. A god speaks one sentence to you.', mechanicalEffect: 'Gain Inspiration.' },
      { option: 'Ask who they are', consequence: 'They laugh. One of them was you, once. Or will be.', mechanicalEffect: null },
      { option: 'Flip the table', consequence: 'The stars scatter. Respect earned. A god offers a pact.', mechanicalEffect: 'DM may offer a minor boon or quest.' },
    ],
    wakeEffect: 'You wake with the taste of starlight on your tongue. Odd but pleasant.',
  },
  {
    title: 'The Mirror Maze',
    type: 'symbolic',
    narration: 'Infinite mirrors, but none show your face. Each reflects a different version of you — older, younger, darker, brighter. One mirror shows you as you truly are.',
    imagery: ['A version of you wearing a crown', 'A version of you covered in blood', 'A version of you who is happy'],
    choices: [
      { option: 'Shatter the true mirror', consequence: 'The maze dissolves. You wake knowing something about yourself you didn\'t before.', mechanicalEffect: 'Advantage on WIS saves for 24 hours.' },
      { option: 'Step into the crowned reflection', consequence: 'Power floods through you. But power always has a price.', mechanicalEffect: '+1 CHA for 24 hours, -1 WIS for 24 hours.' },
      { option: 'Walk past all mirrors without looking', consequence: 'The mirrors crack one by one. Freedom through detachment.', mechanicalEffect: 'Immune to Frightened for 24 hours.' },
    ],
    wakeEffect: 'You wake slowly, like surfacing from deep water.',
  },
  {
    title: 'The Battlefield You Never Fought',
    type: 'memory',
    narration: 'A battle rages around you — but it\'s not yours. Soldiers in unfamiliar armor fight and die. One of them has your eyes. An ancestor, perhaps. Or a past life.',
    imagery: ['A banner you almost recognize', 'A weapon that feels like home in your hand', 'Someone calls your name — but it\'s not your name'],
    choices: [
      { option: 'Fight alongside the soldier', consequence: 'Together you turn the tide. You learn a technique from another age.', mechanicalEffect: '+1 to next attack roll.' },
      { option: 'Watch from above', consequence: 'You see the whole battle. Strategy becomes clear.', mechanicalEffect: 'Advantage on next tactical decision (Investigation or History).' },
      { option: 'Pull the soldier from the battle', consequence: 'They resist. "This is my purpose." They die. You wake crying.', mechanicalEffect: null },
    ],
    wakeEffect: 'Muscle memory from another life. Your sword arm feels different.',
  },
  {
    title: 'The Whispering Garden',
    type: 'astral_wandering',
    narration: 'A garden that shouldn\'t exist — flowers made of sound, trees growing upward into an ocean. A figure tends the garden. They\'ve been expecting you.',
    imagery: ['Roses that sing when touched', 'A tree whose fruit is memories', 'A gardener with no face'],
    choices: [
      { option: 'Pick a fruit', consequence: 'You taste someone else\'s happiest memory. It makes you ache.', mechanicalEffect: 'Recover 1 spell slot (up to 3rd level).' },
      { option: 'Speak to the gardener', consequence: 'They answer in riddles. One of them will save your life.', mechanicalEffect: 'DM gives a cryptic survival hint.' },
      { option: 'Plant something of your own', consequence: 'You leave a piece of yourself here. It will grow.', mechanicalEffect: 'Bond increases with one NPC or companion.' },
    ],
    wakeEffect: 'You wake smelling flowers that don\'t exist in this world.',
  },
  {
    title: 'The Clockwork Heart',
    type: 'symbolic',
    narration: 'Inside your chest, a clockwork mechanism ticks. You stand in a vast machine — gears the size of buildings, springs coiled like sleeping serpents. Something is jammed.',
    imagery: ['A gear etched with your failures', 'A spring wound too tight (your anger)', 'A tiny key that fits your ribcage'],
    choices: [
      { option: 'Unjam the mechanism', consequence: 'The gears turn. You feel clarity. Something you\'ve been avoiding becomes clear.', mechanicalEffect: 'Remove 1 level of exhaustion.' },
      { option: 'Wind the spring tighter', consequence: 'Power builds. Dangerous power. But useful.', mechanicalEffect: '+2 to next damage roll, -2 to next saving throw.' },
      { option: 'Remove the gear of failures', consequence: 'You forget a lesson. But the weight lifts.', mechanicalEffect: 'Remove Frightened or one emotional condition.' },
    ],
    wakeEffect: 'You hear ticking for an hour after waking. No one else can.',
  },
];

export function getRandomDream(): DreamSequence {
  return DREAMS[Math.floor(Math.random() * DREAMS.length)];
}

export function getDreamsByType(type: DreamType): DreamSequence[] {
  return DREAMS.filter((d) => d.type === type);
}

export function getDreamChoiceCount(dream: DreamSequence): number {
  return dream.choices.length;
}

export function getChoicesWithEffects(dream: DreamSequence): DreamChoice[] {
  return dream.choices.filter((c) => c.mechanicalEffect !== null);
}

export function getAllDreamTypes(): DreamType[] {
  return [...new Set(DREAMS.map((d) => d.type))];
}

export function formatDream(dream: DreamSequence): string {
  const icon = { prophetic: '🔮', nightmare: '😱', memory: '📜', symbolic: '🪞', divine_message: '✨', astral_wandering: '🌌' }[dream.type];
  const lines = [`${icon} **${dream.title}** *(${dream.type.replace(/_/g, ' ')})*`];
  lines.push(`  *${dream.narration}*`);
  lines.push('  **Imagery:**');
  dream.imagery.forEach((i) => lines.push(`    🎭 ${i}`));
  lines.push('  **Choices:**');
  dream.choices.forEach((c, idx) => {
    lines.push(`    ${idx + 1}. ${c.option}`);
    if (c.mechanicalEffect) lines.push(`       → ${c.mechanicalEffect}`);
  });
  lines.push(`  *On waking:* ${dream.wakeEffect}`);
  return lines.join('\n');
}

export { DREAMS };
