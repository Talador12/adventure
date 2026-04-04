// Random campfire story — tales NPCs or PCs tell during long rests.

export type StoryMood = 'scary' | 'funny' | 'inspiring' | 'mysterious' | 'sad' | 'cautionary';

export interface CampfireStory {
  title: string; mood: StoryMood; teller: string; openingLine: string; story: string;
  audience: string; mechanicalEffect: string | null; truthBehindIt: string | null;
}

const STORIES: CampfireStory[] = [
  { title: 'The Thing in the Well', mood: 'scary', teller: 'An old farmer met on the road', openingLine: '"Don\'t drink from wells you don\'t know. Let me tell you why."', story: 'A village had a well that never ran dry. Perfect water. Until people started forgetting things. Small things first — names, dates. Then big things. Their children\'s faces. Their own names. The well remembered everything they forgot. And it was getting smarter.', audience: 'Eyes wide. The fire crackles. Someone moves their waterskin away from the campfire circle.', mechanicalEffect: 'WIS DC 10 or disadvantage on the next Perception check (spooked). Success: +1 Insight for 24 hours (heightened awareness).', truthBehindIt: 'The story is real. The well is an aboleth\'s lair. The village is 3 days north.' },
  { title: 'The Luckiest Halfling', mood: 'funny', teller: 'A halfling merchant, gesturing wildly', openingLine: '"So my cousin Pipwick — and I swear this happened — fell INTO a dragon\'s mouth."', story: 'Pipwick tripped into a dragon\'s open jaws during a negotiation. The dragon was so surprised it sneezed — launching Pipwick 200 feet into a hay cart. He landed on a ring. The Ring of Invisibility. The dragon spent 3 hours looking for him. Pipwick ate lunch inside the dragon\'s hoard and left with full pockets.', audience: 'Laughter. Disbelief. "That did NOT happen." "It absolutely did. Pipwick still has the ring. And the indigestion."', mechanicalEffect: 'All party members gain Inspiration. Laughter heals.', truthBehindIt: null },
  { title: 'The Last Soldier', mood: 'inspiring', teller: 'A retired veteran, voice quiet', openingLine: '"I was the last one standing. Let me tell you what that feels like."', story: 'Everyone was down. The line had broken. One soldier, alone, facing the charge. They didn\'t run. They planted their feet, raised their shield, and said one word: "No." The enemy hesitated. One heartbeat. That was enough. The reinforcements arrived. One word. One heartbeat. That\'s all it takes.', audience: 'Silence. The fighter grips their weapon a little tighter. The cleric\'s hand rests on their holy symbol.', mechanicalEffect: 'Next time a party member drops to 0 HP, they can choose to drop to 1 HP instead (once). The story stays with them.', truthBehindIt: 'The veteran WAS the last soldier. The scar on their cheek is from that day. They don\'t mention it.' },
  { title: 'The Door That Shouldn\'t Be There', mood: 'mysterious', teller: 'A traveling bard, speaking barely above a whisper', openingLine: '"Every city has a door that wasn\'t there yesterday. And won\'t be there tomorrow."', story: 'A red door appears in an alley. No building behind it. Open it and you find a room. A single chair. A table. A cup of tea, still warm. A note: "Sit. Rest. No one will find you here." The door vanishes after you leave. It appears to different people in different cities. Always when they need it most. Nobody built it. Nobody maintains it. It just... is.', audience: 'Everyone looks at each other. Has anyone seen a red door? Nobody admits it. Someone definitely has.', mechanicalEffect: null, truthBehindIt: 'The door is real. It\'s a benevolent demiplane created by a forgotten god of rest. It appears to the exhausted, the hunted, and the hopeless.' },
  { title: 'Why You Don\'t Pet the Mimic', mood: 'cautionary', teller: 'A one-armed adventurer, grinning', openingLine: '"See this? *gestures at missing arm* I\'ll tell you EXACTLY what happened."', story: '"Cute chest," I said. "It looks friendly," I said. "I\'m gonna PET it," I said. My party TOLD me. They WARNED me. I pet it anyway. It purred. Then it bit. Everything above the elbow. Gone in two seconds. The worst part? It really DID purr. I regret nothing. I regret everything. ALWAYS poke suspicious objects with a stick first."', audience: 'Horror. Laughter. Someone immediately pokes their own backpack with a stick. Just in case.', mechanicalEffect: 'Advantage on Investigation checks to detect mimics for 24 hours. The story is effective prevention.', truthBehindIt: null },
];

export function getRandomStory(): CampfireStory { return STORIES[Math.floor(Math.random() * STORIES.length)]; }
export function getStoriesByMood(mood: StoryMood): CampfireStory[] { return STORIES.filter((s) => s.mood === mood); }
export function getStoriesWithTruth(): CampfireStory[] { return STORIES.filter((s) => s.truthBehindIt !== null); }
export function getAllStoryMoods(): StoryMood[] { return [...new Set(STORIES.map((s) => s.mood))]; }
export function formatStory(s: CampfireStory): string {
  const icon = { scary: '👻', funny: '😂', inspiring: '⚔️', mysterious: '❔', sad: '😢', cautionary: '⚠️' }[s.mood];
  const lines = [`${icon} **${s.title}** *(${s.mood})*`]; lines.push(`  Told by: ${s.teller}`);
  lines.push(`  💬 *${s.openingLine}*`); lines.push(`  📖 ${s.story.substring(0, 150)}...`);
  lines.push(`  👥 Audience: ${s.audience}`);
  if (s.mechanicalEffect) lines.push(`  ⚙️ ${s.mechanicalEffect}`); return lines.join('\n');
}
export { STORIES as CAMPFIRE_STORIES };
