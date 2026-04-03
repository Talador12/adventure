// Random rumor generator — tavern gossip with truth ratings.
export interface Rumor { text: string; truthful: boolean; category: 'quest' | 'lore' | 'warning' | 'gossip'; }
const RUMORS: Rumor[] = [
  { text: 'The old mine has been reopened. Strange lights at night.', truthful: true, category: 'quest' },
  { text: 'The mayor is secretly a vampire. I saw him avoid garlic once.', truthful: false, category: 'gossip' },
  { text: 'A dragon was spotted east of here, flying low.', truthful: true, category: 'warning' },
  { text: 'The blacksmith\'s daughter can speak with animals.', truthful: true, category: 'lore' },
  { text: 'Don\'t go into the forest at night. People don\'t come back.', truthful: true, category: 'warning' },
  { text: 'The king is dying. His heirs are already fighting over the throne.', truthful: false, category: 'gossip' },
  { text: 'There\'s treasure buried under the old oak tree by the river.', truthful: true, category: 'quest' },
  { text: 'The new priest at the temple isn\'t what he seems.', truthful: true, category: 'warning' },
  { text: 'A traveling wizard passed through selling potions. Half were fake.', truthful: true, category: 'gossip' },
  { text: 'The bridge south of town is haunted. Toll collectors were murdered there.', truthful: false, category: 'lore' },
  { text: 'Orcs have been gathering in the mountains. War is coming.', truthful: true, category: 'warning' },
  { text: 'The tavern\'s ale is brewed with water from a magical spring.', truthful: false, category: 'gossip' },
];
export function getRandomRumor(): Rumor { return RUMORS[Math.floor(Math.random() * RUMORS.length)]; }
export function getRumors(count: number = 3): Rumor[] { return [...RUMORS].sort(() => Math.random() - 0.5).slice(0, count); }
export function formatRumors(count: number = 3): string { const rumors = getRumors(count); return `🤫 **Tavern Rumors:**\n${rumors.map((r) => `• *"${r.text}"* ${r.truthful ? '(True)' : '(False)'}`).join('\n')}`; }
export function formatRumorsForPlayers(count: number = 3): string { return `🤫 **You overhear:**\n${getRumors(count).map((r) => `• *"${r.text}"*`).join('\n')}`; }
