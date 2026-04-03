// Random NPC backstory generator — complete backstories with hooks for DMs.

export type BackstoryTheme = 'tragic' | 'heroic' | 'criminal' | 'scholarly' | 'spiritual' | 'mundane';

export interface NpcBackstory {
  theme: BackstoryTheme;
  origin: string;
  definingEvent: string;
  motivation: string;
  secret: string;
  connection: string; // how they connect to the party
  quirk: string;
  plotHook: string;
}

const BACKSTORIES: NpcBackstory[] = [
  { theme: 'tragic', origin: 'A former soldier who lost their entire unit to a betrayal from within.', definingEvent: 'Watched their best friend sell them out to the enemy for gold.', motivation: 'Find the traitor. Not for revenge — for answers. Why wasn\'t their friendship enough?', secret: 'They actually survived because they were late to the ambush. They\'d been drinking. The guilt is crushing.', connection: 'The traitor is connected to someone the party is investigating.', quirk: 'Flinches at the sound of coin purses.', plotHook: 'They recognize a symbol the party found — it\'s the same one the traitor wore.' },
  { theme: 'heroic', origin: 'A retired adventurer who saved a village and was given a title they don\'t deserve.', definingEvent: 'The "dragon" they slew was already dying. They just finished it off. The village thinks they\'re a legend.', motivation: 'Live up to the legend. Become the hero everyone already thinks they are.', secret: 'The dragon\'s mate is still alive. And knows what really happened.', connection: 'Asks the party to help with a quest that\'s actually too hard for them — they need real heroes.', quirk: 'Tells increasingly exaggerated versions of the dragon story.', plotHook: 'The dragon\'s mate arrives. Now they need ACTUAL heroes.' },
  { theme: 'criminal', origin: 'A con artist who genuinely fell in love with their latest mark.', definingEvent: 'Was about to rob them blind when they realized the mark was the kindest person they\'d ever met.', motivation: 'Go straight. Protect the person they love from their former partners, who want the job finished.', secret: 'Still owes the thieves guild 2,000gp from backing out. They\'re on borrowed time.', connection: 'Begs the party for protection. Offers to share intel on the guild in exchange.', quirk: 'Can\'t stop lying about small things. Habit. They\'re trying to stop.', plotHook: 'The guild sends collectors. The mark finds out about the original con.' },
  { theme: 'scholarly', origin: 'A wizard\'s apprentice who discovered their master was conducting forbidden experiments.', definingEvent: 'Found the hidden laboratory. Creatures in jars. Spells that shouldn\'t exist. Notes in a language that hurts to read.', motivation: 'Expose the master without becoming the next experiment. Needs proof.', secret: 'They accidentally read one of the forbidden spells. It\'s in their head now and it whispers.', connection: 'The master is a respected figure the party has dealt with before.', quirk: 'Covers their ears when it\'s quiet. That\'s when the whisper is loudest.', plotHook: 'The master knows the apprentice knows. The apprentice has 3 days before the master acts.' },
  { theme: 'spiritual', origin: 'A priest who lost their faith after praying for a miracle that never came.', definingEvent: 'Their child was dying. They prayed for 7 days. No answer. The child died.', motivation: 'Find out if the gods are real and, if they are, why they didn\'t answer.', secret: 'The miracle DID come — 2 hours too late. The child was briefly resurrected, screamed, and died again. The priest tells no one.', connection: 'The party\'s cleric reminds them of who they used to be. It\'s painful and hopeful.', quirk: 'Starts to pray out of habit, then catches themselves and stops.', plotHook: 'The deity that "failed" them has chosen the priest for a mission. The irony is excruciating.' },
  { theme: 'mundane', origin: 'A baker who accidentally made a cake that grants minor magical effects.', definingEvent: 'Used a flour sack that turned out to contain ground arcane components. The cake made people fly for 10 minutes.', motivation: 'Recreate the recipe. It could make them rich. Or powerful. Or both.', secret: 'The flour was stolen property from a wizard\'s tower. The wizard wants it back.', connection: 'Offers the party free pastries. One of the pastries has... unexpected effects.', quirk: 'Everything is a food metaphor. "That\'s the icing on the cake." "We need to let this rise." etc.', plotHook: 'The wizard sends agents. The baker needs protection and someone to fetch more "special flour."' },
];

export function getRandomBackstory(): NpcBackstory {
  return BACKSTORIES[Math.floor(Math.random() * BACKSTORIES.length)];
}

export function getBackstoriesByTheme(theme: BackstoryTheme): NpcBackstory[] {
  return BACKSTORIES.filter((b) => b.theme === theme);
}

export function getAllThemes(): BackstoryTheme[] {
  return [...new Set(BACKSTORIES.map((b) => b.theme))];
}

export function formatBackstory(backstory: NpcBackstory, showSecret: boolean = false): string {
  const icon = { tragic: '😢', heroic: '⚔️', criminal: '🗡️', scholarly: '📚', spiritual: '🙏', mundane: '🍞' }[backstory.theme];
  const lines = [`${icon} **NPC Backstory** *(${backstory.theme})*`];
  lines.push(`  *Origin:* ${backstory.origin}`);
  lines.push(`  *Defining event:* ${backstory.definingEvent}`);
  lines.push(`  *Motivation:* ${backstory.motivation}`);
  lines.push(`  *Quirk:* ${backstory.quirk}`);
  lines.push(`  *Party connection:* ${backstory.connection}`);
  if (showSecret) lines.push(`  🔒 *Secret:* ${backstory.secret}`);
  lines.push(`  📜 *Plot hook:* ${backstory.plotHook}`);
  return lines.join('\n');
}

export { BACKSTORIES as NPC_BACKSTORIES };
