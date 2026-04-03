// Random insult generator — fantasy insults for NPC banter and tavern scenes.

export interface FantasyInsult { insult: string; tone: 'playful' | 'aggressive' | 'sophisticated' | 'crude'; }

const INSULTS: FantasyInsult[] = [
  { insult: 'You fight like a dairy farmer!', tone: 'playful' },
  { insult: 'I\'ve seen gelatinous cubes with more backbone than you.', tone: 'aggressive' },
  { insult: 'Your mother was a hobgoblin and your father smelled of owlbear dung.', tone: 'crude' },
  { insult: 'I\'d challenge you to a battle of wits, but I see you came unarmed.', tone: 'sophisticated' },
  { insult: 'You\'re about as useful as a sunrod in the Astral Plane.', tone: 'playful' },
  { insult: 'Even a goblin wouldn\'t hire you as a minion.', tone: 'aggressive' },
  { insult: 'Your swordplay is an insult to the concept of sharp objects.', tone: 'sophisticated' },
  { insult: 'I\'ve met mimics with more personality than you.', tone: 'playful' },
  { insult: 'You have the tactical mind of a lemming.', tone: 'sophisticated' },
  { insult: 'Were you cursed at birth, or is this your natural state?', tone: 'aggressive' },
  { insult: 'The bard wrote a song about you. It was a dirge.', tone: 'playful' },
  { insult: 'You couldn\'t hit the broad side of a tarrasque.', tone: 'crude' },
  { insult: 'I\'ve seen better adventurers fall out of a bag of holding.', tone: 'playful' },
  { insult: 'Your armor has more dents than a blacksmith\'s anvil — and half the charm.', tone: 'sophisticated' },
  { insult: 'If brains were dynamite, you wouldn\'t have enough to blow your nose.', tone: 'crude' },
  { insult: 'The only reason you\'re still alive is the monsters are embarrassed for you.', tone: 'aggressive' },
];

export function getRandomInsult(tone?: FantasyInsult['tone']): FantasyInsult {
  const pool = tone ? INSULTS.filter((i) => i.tone === tone) : INSULTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function formatInsult(insult: FantasyInsult): string { return `🗣️ *"${insult.insult}"* (${insult.tone})`; }

export function generateInsultBattle(count: number = 3): string {
  const lines = ['🗣️ **Insult Battle!**'];
  for (let i = 0; i < count; i++) lines.push(`${i + 1}. *"${getRandomInsult().insult}"*`);
  return lines.join('\n');
}
