// Random D&D joke generator — in-character humor for bards and tavern scenes.
export interface DndJoke { setup: string; punchline: string; type: 'pun' | 'one-liner' | 'situational'; }
const JOKES: DndJoke[] = [
  { setup: 'Why did the bard break up with the ranger?', punchline: 'Because they needed more space — about 120 feet of it.', type: 'pun' },
  { setup: 'What\'s a mimic\'s favorite meal?', punchline: 'Adventurers who don\'t check chests first.', type: 'one-liner' },
  { setup: 'How many rogues does it take to light a torch?', punchline: 'None. They prefer to work in the dark.', type: 'pun' },
  { setup: 'Why don\'t wizards ever win at poker?', punchline: 'They always show their hand — it\'s somatic components.', type: 'pun' },
  { setup: 'A barbarian, a wizard, and a cleric walk into a bar.', punchline: 'The rogue was already inside.', type: 'situational' },
  { setup: 'What do you call a paladin who breaks their oath?', punchline: 'An oathbreaker. That\'s literally what they\'re called. This isn\'t a joke, it\'s a subclass.', type: 'one-liner' },
  { setup: 'Why was the gelatinous cube a bad party member?', punchline: 'It kept dissolving the group dynamic.', type: 'pun' },
  { setup: 'What\'s a lich\'s least favorite day?', punchline: 'Phylactery cleaning day.', type: 'one-liner' },
  { setup: 'How does a druid answer the phone?', punchline: '"Wild shape speaking."', type: 'pun' },
  { setup: 'Why did the monk refuse healing potions?', punchline: 'They preferred to solve problems with their ki.', type: 'pun' },
  { setup: 'I used to be an adventurer like you...', punchline: 'But then I failed three death saves.', type: 'situational' },
  { setup: 'What\'s the difference between a fireball and a healing word?', punchline: 'Target selection.', type: 'one-liner' },
];
export function getRandomJoke(): DndJoke { return JOKES[Math.floor(Math.random() * JOKES.length)]; }
export function formatJoke(j: DndJoke): string { return `🎭 *${j.setup}*\n\n**${j.punchline}**`; }
