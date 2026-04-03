// Random villain trait generator — personality quirks for antagonists.
export interface VillainTrait { trait: string; category: 'motivation' | 'method' | 'weakness' | 'quirk'; dmNote: string; }
const TRAITS: VillainTrait[] = [
  { trait: 'Genuinely believes they\'re the hero of the story.', category: 'motivation', dmNote: 'Play them sympathetically. Make the party question if they\'re wrong.' },
  { trait: 'Never gets their own hands dirty — always uses minions.', category: 'method', dmNote: 'The party never fights the villain directly until the finale.' },
  { trait: 'Has a code of honor they will never break.', category: 'weakness', dmNote: 'If the party discovers the code, they can exploit it.' },
  { trait: 'Keeps a journal detailing every crime. Can\'t help documenting.', category: 'quirk', dmNote: 'Finding the journal = evidence for conviction or blackmail.' },
  { trait: 'Was once a hero who fell from grace.', category: 'motivation', dmNote: 'Mirror of what the PCs could become. Use for dramatic irony.' },
  { trait: 'Is dying of a terminal illness. Racing against time.', category: 'weakness', dmNote: 'Creates urgency. The villain won\'t wait. Also potentially sympathetic.' },
  { trait: 'Collects trophies from defeated enemies. Displays them proudly.', category: 'quirk', dmNote: 'The trophy room is both terrifying and informative about their past victories.' },
  { trait: 'Has a loved one they\'re protecting through villainy.', category: 'motivation', dmNote: 'Threatening or saving that person is a lever the party can use.' },
  { trait: 'Refuses to kill children or the elderly. Everyone else is fair game.', category: 'weakness', dmNote: 'A surprising moral line that humanizes them.' },
  { trait: 'Monologues. Cannot resist explaining the plan.', category: 'quirk', dmNote: 'Classic for a reason. Use it to deliver exposition and give the party time to act.' },
];
export function getRandomVillainTrait(): VillainTrait { return TRAITS[Math.floor(Math.random() * TRAITS.length)]; }
export function formatVillainTrait(t: VillainTrait): string { return `😈 **Villain Trait** (${t.category}):\n*${t.trait}*\n📝 DM Note: ${t.dmNote}`; }
