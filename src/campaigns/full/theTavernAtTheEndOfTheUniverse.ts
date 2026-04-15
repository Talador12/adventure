import type { FullCampaign } from '../types';

export const theTavernAtTheEndOfTheUniverse: FullCampaign = {
  id: 'full-tavern-at-the-end-of-the-universe',
  type: 'full',
  title: 'The Tavern at the End of the Universe',
  tagline: 'Beyond it: nothing. The food is great. There is a two-drink minimum.',
  tone: 'comedic',
  themes: ['comedy', 'planar', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'At the very edge of the multiverse, where reality dissolves into the Void, there is a tavern. It has always been here. The food is excellent, the drinks are existentially questionable, and there is a strict two-drink minimum because sober people tend to look at the Void and have breakdowns. The staff is professional. Planar refugees from destroyed worlds show up nightly. The party works here — bouncer, bartender, server, entertainment. Every session, someone new walks through the door.',
  hook: 'The party arrives at the literal edge of reality — maybe they fell through a portal, maybe they were running from something, maybe they just followed a really good smell. They find the Tavern, and the owner hires them on the spot because the last staff looked into the Void during a smoke break and have not stopped screaming. The job pays well, the tips are interdimensional, and the employee discount is 10% off drinks that should not exist.',
  twist:
    'The Tavern is not just at the edge of the universe — it IS the edge. The building is the last structure holding reality together. If the Tavern closes, the Void advances. The owner knows this and has been keeping the lights on for millennia, not because she is a hero, but because she likes running a tavern and the end of all existence would be bad for business.',
  climax:
    'A patron from a particularly powerful destroyed world wants to tear down the Tavern to "mercy-kill" the multiverse — end all suffering by ending all existence. The Void begins leaking in. The party must keep the Tavern open through the worst shift of their lives: serving drinks while reality collapses, keeping patrons calm while the floor dissolves, and ultimately convincing a nihilistic demigod that existence is worth preserving — one drink at a time.',
  acts: [
    {
      title: 'Act 1: New Staff Orientation',
      summary:
        'The party learns the Tavern, meets the regulars, and handles increasingly bizarre patrons. A god who got fired. A tarrasque who is a vegetarian. A lich returning a library book. Sitcom structure with a heart: every patron has a story.',
      keyEvents: [
        'Orientation: the Tavern rules (no fighting inside, no summoning, no looking at the Void)',
        'First shift: a fired god of rain orders nothing but water and cries. Running gag begins: Drizzle orders water every session and tips in small, useless blessings. "May your socks always be dry." The blessings are oddly specific and always come true.',
        'A vegetarian tarrasque squeezes through the door and orders a salad. The kitchen panics',
        'A lich returns a 400-year overdue library book to a patron from the library\'s home world (which no longer exists)',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Regulars',
      summary:
        'The party gets to know the regulars and the Tavern\'s deeper nature. They learn it is the barrier between existence and the Void. The owner reveals she has been doing this for 3000 years. Strange things start happening — the Void is getting closer.',
      keyEvents: [
        'A table of refugees from a recently destroyed plane arrives. They have nothing. The party helps them',
        'The owner, Mama Vex, tells the truth: "This building is the last wall. I just serve drinks on it."',
        'A crack appears in the back wall. Through it: nothing. Not darkness. Nothing.',
        'A new patron arrives — Erasure, a demigod of entropy. He is polite, quiet, and terrifying.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Last Call',
      summary:
        'Erasure makes his move. The Void surges. The Tavern starts dissolving at the edges. The party must keep serving, keep the patrons safe, and stop the end of everything — not with weapons, but with hospitality, stubbornness, and the argument that a place where anyone can get a drink is worth preserving.',
      keyEvents: [
        'Erasure explains his position: "Everything ends. I am just speeding it up. It is a mercy."',
        'The Void eats the back room. The kitchen relocates to the bar. Service continues.',
        'Patrons rally: the fired god, the vegetarian tarrasque, the lich — all fight for the Tavern',
        'The party makes the case for existence: not a grand speech, but a shift well-worked and a drink well-poured. Callback: Drizzle blesses the Tavern one final time. "May this place never be dry." The Void recoils. Turns out a god of gentle rain, even a fired one, still has power when he means it.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mama Vex',
      role: 'tavern owner / anchor of reality',
      personality:
        'A 3000-year-old tiefling who has run the Tavern since before most civilizations existed. Warm, unflappable, and terrifyingly competent. She has served drinks to gods and demons and treated them all the same. "Sit down. What are you having. No, you cannot destroy the multiverse before happy hour."',
      secret: 'She is not immortal. She is dying. She needs someone to take over the Tavern or it closes when she goes.',
    },
    {
      name: 'Erasure',
      role: 'antagonist / philosophical threat',
      personality:
        'A demigod of entropy from a dead plane. Calm, articulate, and genuinely believes ending existence is compassionate. He does not hate life — he pities it. "Every world I have watched end was in pain. I am offering anesthesia."',
      secret: 'He is the last survivor of his world. He wants it to end because he cannot bear being the only one who remembers.',
    },
    {
      name: 'Drizzle (the fired god)',
      role: 'regular patron / ally',
      personality:
        'The former god of a gentle rain. Fired by his pantheon for "insufficient dramatic presence" (they wanted storms, he did drizzles). Orders water. Tips in small blessings. Deeply kind, deeply sad.',
    },
    {
      name: 'Chomps (the vegetarian tarrasque)',
      role: 'regular patron / comic relief',
      personality:
        'A tarrasque who had a spiritual awakening and became vegetarian. The size of a house. Extremely gentle. Destroys furniture constantly by accident. "I am so sorry about the chair. And the wall. And the other wall."',
    },
  ],
  keyLocations: [
    {
      name: 'The Tavern',
      description: 'A warm, well-lit establishment at the literal end of everything. Mismatched furniture from a hundred dead worlds. The bar is made from the hull of a crashed spelljammer. The jukebox plays songs from planes that no longer exist.',
      significance: 'The last structure in the multiverse and the barrier against the Void.',
    },
    {
      name: 'The Void (visible from the back patio)',
      description: 'Not darkness. Not space. Nothing. The absence of everything. Looking at it too long causes existential crises. There is a sign: "PLEASE DO NOT STARE INTO THE VOID. THE VOID DOES NOT STARE BACK. THERE IS NOTHING TO STARE."',
      significance: 'The threat. What happens if the Tavern closes.',
    },
    {
      name: 'The Lost and Found',
      description: 'A closet containing items left behind by patrons from destroyed worlds. Every object is the last of its kind. The closet is much bigger on the inside and smells like nostalgia.',
      significance: 'Contains artifacts, memories, and plot hooks from a hundred dead civilizations.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'tavernBrawl',
    'npcRelationshipWeb',
    'fantasyInsults',
    'merchantHaggling',
    'combatNarration',
    'plotTwistEngine',
    'moralDilemma',
    'encounterWaves',
  ],
};
