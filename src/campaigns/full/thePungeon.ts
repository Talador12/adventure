import type { FullCampaign } from '../types';

export const thePungeon: FullCampaign = {
  id: 'full-the-pungeon',
  type: 'full',
  title: 'The Pungeon',
  tagline: 'Every room is a pun. Every NPC is a pun. The final boss is the Pun-isher. You have been warned.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'In the kingdom of Linguistica, language is literal power. Puns warp reality, idioms manifest physically, and the Pun-isher — a fallen bard who weaponized wordplay — has constructed a dungeon where every room, trap, item, and creature is a pun made flesh. The world treats this with absolute seriousness. Nobody laughs. That is what makes it devastating.',
  hook: 'The party is hired to retrieve the Sword of Damocleese — a legendary cheese sword suspended by a single thread over the throne of the last king. The sword is inside the Pungeon, a dungeon so dense with wordplay that previous adventurers came out speaking only in rhyming couplets. The Bureau of Linguistics wants the sword recovered before the thread snaps.',
  twist:
    'The Pun-isher is not a villain. She is a containment specialist. The Pungeon exists to trap a rogue entity called the Literalist — a being that makes ALL language literal. Metaphors become real. "Break a leg" causes compound fractures. "It is raining cats and dogs" is an extinction event. The puns are a ward. If the party destroys the Pungeon, the Literalist escapes.',
  climax:
    'The Literalist begins breaking free. Language collapses into chaos — every word spoken becomes reality. The party must either help the Pun-isher reseal the dungeon with the greatest pun ever told (a collaborative effort), destroy the Literalist using its own power against it (turning its literalism into a trap), or convince the Literalist that figurative language has value (the hardest, funniest option).',
  acts: [
    {
      title: 'Act 1: Welcome to the Pungeon',
      summary:
        'The party enters the Pungeon and navigates rooms where every element is a pun. The Mace of Spades digs holes. The Hall of Mirrors is staffed by people named Mirror. The Knight Shift only appears after dark. The dungeon is played completely straight.',
      keyEvents: [
        'The entrance: a door that only opens when you knock-knock joke it',
        'The Hall of Mirrors — a reception area staffed by identical clerks all named Mirror',
        'The Mace of Spades room — a weapon puzzle where digging is the solution',
        'First encounter with a Pungeon Guardian: Sir Render, a knight in "shining" armor (it glows). Running gag begins: Sir Render surrenders in every room and then narrates the pun explanation for the party. He cannot help himself.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Deeper Wordplay',
      summary:
        'The dungeon gets more complex. Puns layer on puns. The party meets the Pun-isher and learns the truth — she is not the villain, she is the warden. The Literalist stirs beneath the lowest level.',
      keyEvents: [
        'The party finds the Thesaurus — a dinosaur that speaks only in synonyms',
        'Meeting the Pun-isher: she begs them to stop destroying rooms',
        'The Literalist manifests briefly: someone says "break a leg" and a femur snaps',
        'Revelation: the puns are wards and every room destroyed weakens the seal',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Last Word',
      summary:
        'The Literalist breaks partially free. Language becomes dangerous. The party must navigate a world where every word is literal while crafting the ultimate pun to reseal the prison — or find another way to stop a being that weaponizes meaning itself.',
      keyEvents: [
        'Language collapse: "I am starving" causes actual starvation, "this is killing me" is lethal',
        'The Sword of Damocleese — it IS the key, because the thread is a pun on "hanging by a thread"',
        'Alliance with the Pun-isher to craft the sealing pun',
        'Final confrontation: wordplay versus literalism in a battle of meaning. Callback: Sir Render does NOT surrender. For the first time in the campaign, he stands and fights. The pun: he finally did not "Sir Render." The seal accepts it. Reality holds.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Pun-isher (Lyrica Verbatim)',
      role: 'warden / misunderstood antagonist',
      personality:
        'A former bard of extraordinary talent who sacrificed her reputation to build a prison out of wordplay. Deadpan. Never laughs at her own puns. Treats the work with the gravity of a surgeon. "Every pun holds a syllable of the seal. Laugh if you must. I have a world to protect."',
      secret: 'She cannot stop punning. The seal requires constant maintenance, and she has been alone in this dungeon for 40 years. She is exhausted.',
    },
    {
      name: 'The Literalist',
      role: 'true antagonist',
      personality:
        'An entity from the Plane of Absolute Truth where nothing is figurative. It does not understand humor, metaphor, or nuance. It is not evil — it simply cannot tolerate imprecision. "You said the sunset was dying. Sunsets do not die. You are incorrect. I will correct you."',
    },
    {
      name: 'Sir Render',
      role: 'Pungeon Guardian / reluctant ally',
      personality:
        'A paladin who was cursed to guard the Pungeon. His name is his fate — he surrenders immediately in every fight. Deeply embarrassed about it. Surprisingly useful as a guide because he has surrendered to every room.',
    },
    {
      name: 'The Thesaurus',
      role: 'information source / obstacle',
      personality:
        'A literal dinosaur that speaks exclusively in synonyms. Helpful but maddening. Ask it for directions and you get "proceed northward, upward, ceilingward, skybound, heavenwise." It means well.',
    },
  ],
  keyLocations: [
    {
      name: 'The Pungeon',
      description: 'A sprawling underground complex where every architectural element is a pun. The walls are made of sentences. The floor is lava (Floor is the janitor, Lava is his dog).',
      significance: 'The entire dungeon is a ward against the Literalist. Every room is a syllable in the seal.',
    },
    {
      name: 'The Hall of Mirrors',
      description: 'A long hallway staffed by seven identical receptionists, all named Mirror. They reflect your questions back at you unless you ask properly.',
      significance: 'Contains the registry of all rooms and their pun-functions.',
    },
    {
      name: 'The Literal Depths',
      description: 'The lowest level of the Pungeon where metaphor breaks down entirely. Water is always described as H2O. Colors are wavelengths. Nothing has a name, only a description.',
      significance: 'Where the Literalist is imprisoned and where the final seal must hold.',
    },
  ],
  dataSystems: [
    'riddleGenerator',
    'combatNarration',
    'trapGenerator',
    'fantasyInsults',
    'villainMonologue',
    'plotTwistEngine',
    'environmentalHazard',
    'dungeonDressing',
  ],
};
