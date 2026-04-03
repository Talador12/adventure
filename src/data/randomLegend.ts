// Random legend generator — local myths that may or may not be true.
export interface Legend { title: string; story: string; truthLevel: 'completely true' | 'mostly true' | 'half-true' | 'embellished' | 'completely false'; relatedLocation: string; }
const LEGENDS: Legend[] = [
  { title: 'The Sleeping Dragon', story: 'They say a dragon sleeps beneath the mountain, and its dreams cause the earthquakes.', truthLevel: 'mostly true', relatedLocation: 'The mountain north of town.' },
  { title: 'The Ghost Ship', story: 'A phantom vessel appears on the lake during the harvest moon. Those who board it never return.', truthLevel: 'half-true', relatedLocation: 'The lake.' },
  { title: 'The Weeping Statue', story: 'The statue in the old temple cries real tears at midnight. Collecting them cures any disease.', truthLevel: 'embellished', relatedLocation: 'The abandoned temple.' },
  { title: 'The Last Stand of Captain Valor', story: 'Two hundred soldiers held the bridge against ten thousand. Not one survived, but the kingdom was saved.', truthLevel: 'mostly true', relatedLocation: 'The old bridge east of here.' },
  { title: 'The Witch\'s Bargain', story: 'A witch in the swamp grants wishes — but always with a cruel twist.', truthLevel: 'completely true', relatedLocation: 'The swamp.' },
  { title: 'The Golden Chicken', story: 'A farmer\'s chicken once laid a golden egg. The farmer was cursed with greed and turned to gold himself.', truthLevel: 'completely false', relatedLocation: 'Farmer\'s market (the locals just like the story).' },
];
export function getRandomLegend(): Legend { return LEGENDS[Math.floor(Math.random() * LEGENDS.length)]; }
export function formatLegend(l: Legend): string { return `📜 **Local Legend: "${l.title}"**\n*${l.story}*\n🤔 Truth: ${l.truthLevel}\n📍 Related to: ${l.relatedLocation}`; }
