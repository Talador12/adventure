import type { OneShotCampaign } from '../types';

export const naturalOnesOnly: OneShotCampaign = {
  id: 'oneshot-natural-ones-only',
  type: 'oneshot',
  title: 'Natural Ones Only',
  tagline: 'A cursed dungeon where every roll below 10 is a nat 1. Everything goes wrong. Always. Immediately.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'The Dungeon of Murphy\'s Law is cursed: every d20 roll of 9 or below counts as a natural 1. Statistically, 45% of all rolls are now critical failures. The party must navigate a simple three-room dungeon where nearly half of everything they attempt goes catastrophically wrong. Doors open on faces. Swords fly out of hands. Healing spells give the wrong person the heals. The dungeon is easy. The curse makes it impossible.',
  hook: 'A warning at the entrance: "This dungeon is cursed. Competence is not guaranteed." The fighter draws his sword confidently. He rolls to open the door. A 7. Nat 1. The door opens inward and hits him in the face. The rogue laughs. The rogue tries to pick the lock on the next door. A 4. Nat 1. The lockpick breaks and the rogue picks his own pocket somehow. Nobody is laughing anymore.',
  twist: 'The curse affects monsters too. By scene two, the goblins are just as incompetent as the party. Swords fly, spells backfire, arrows go backwards. Combat becomes two groups of people who cannot do anything correctly trying to hurt each other and failing. The real fight is between the party and the dungeon itself.',
  climax: 'The final room has a simple lever to open the exit. Pull the lever. That is it. But pulling a lever is a Strength check. In this dungeon, that means a 45% chance of critical failure. The lever breaks. The backup lever breaks. The wall lever breaks. The party must find a way to pull a lever when pulling levers is statistically cursed.',
  scenes: [
    {
      title: 'Room One: The Learning Curve',
      summary: 'The party discovers the curse through painful experience. Simple actions become slapstick disasters. The dungeon is easy. The dice are not.',
      challenge: 'exploration',
      keyEvents: [
        'The fighter opens a door (nat 1): it hits him. He swings his sword (nat 1): it flies out of his hand into a wall.',
        'The wizard casts Light (nat 1): it illuminates the wrong room. The wrong room contains a sleeping ogre. Not anymore.',
        'The cleric heals the fighter (nat 1): heals the ogre instead. The ogre is confused but grateful.',
        'The rogue attempts stealth (nat 1): steps on every creaky board in sequence like a xylophone.',
      ],
    },
    {
      title: 'Room Two: Mutual Incompetence',
      summary: 'Combat with goblins who are equally cursed. Nobody can hit anything. Swords clatter to the floor. Arrows reverse. It is the worst fight in history.',
      challenge: 'combat',
      keyEvents: [
        'The fighter swings at a goblin (nat 1): misses and hits the wall. The goblin swings back (nat 1): hits a different goblin.',
        'The wizard casts Burning Hands (success! a 14!): the first successful roll is celebrated like a touchdown.',
        'A goblin archer fires (nat 1): the arrow goes backwards into another goblin. Friendly fire is the only fire.',
        'Both sides eventually give up on combat and agree to just walk around each other. Mutual incompetence breeds peace.',
      ],
    },
    {
      title: 'Room Three: The Lever',
      summary: 'A simple lever. One pull. In this dungeon, it is the hardest challenge imaginable. The party must outsmart a 45% critical failure rate.',
      challenge: 'puzzle',
      keyEvents: [
        'The lever: a simple iron lever on the wall. Pull it. Door opens. Leave. Should take 6 seconds.',
        'First attempt (nat 1): the lever breaks off in the fighter\'s hand. There is a backup lever. Second attempt (nat 1): the backup lever breaks.',
        'Creative solutions: tie a rope to the lever and pull from a distance (nat 1: the rope knots itself). Use Mage Hand (nat 1: the hand pulls the wrong lever).',
        'Final solution: everyone pulls simultaneously. Enough successes in the group to overcome the curse. The door opens. The party walks out. They will never speak of this dungeon again.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Murphy', role: 'dungeon creator / spirit of failure', personality: 'The ghost of the wizard who cursed this dungeon. Appears in mirrors to offer "encouragement." "If something CAN go wrong, it WILL. I designed it that way. You are welcome."' },
    { name: 'The Goblin Chief (Fumble)', role: 'enemy / equally cursed', personality: 'A goblin chief who has been trying to conquer this dungeon for months. Cannot succeed because of the curse. Has been in room two for three weeks. "We try to leave every day. The door hits us."' },
  ],
  keyLocations: [
    { name: 'The Dungeon of Murphy\'s Law', description: 'A three-room dungeon that should take 15 minutes. Under the curse, it takes hours. Every surface is dented from dropped weapons.', significance: 'The setting. The curse makes simple things impossible.' },
    { name: 'The Lever Room', description: 'A room with one lever. One. It should be the easiest room in any dungeon. It is the hardest room in this one.', significance: 'The climax. The simplest challenge becomes the ultimate test.' },
  ],
  dataSystems: ['trapGenerator', 'combatNarration', 'dungeonRoom'],
};
