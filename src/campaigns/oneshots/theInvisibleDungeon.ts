import type { OneShotCampaign } from '../types';

export const theInvisibleDungeon: OneShotCampaign = {
  id: 'oneshot-the-invisible-dungeon',
  type: 'oneshot',
  title: 'The Invisible Dungeon',
  tagline: 'Everything is invisible. Walls, floors, monsters, treasure. Navigate by echolocation, thrown objects, and prayer.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Vault of Unseen Riches was cursed by a bitter wizard who declared: "If you want my treasure so badly, FIND IT." Everything in the dungeon is invisible. The walls, the floor, the ceiling, the doors, the traps, the monsters, the treasure. Sound still works. Touch still works. Smell still works. But sight is useless. The party must navigate a fully furnished dungeon they cannot see by throwing chalk dust, listening to echoes, feeling walls, and trusting each other when someone says "there is a pit here" while everyone stares at empty air.',
  hook: 'The party enters what appears to be an empty room. Flat ground in every direction. Then the fighter walks into an invisible wall. Face first. "There is a wall here." The rogue throws a handful of flour. It lands on invisible surfaces, revealing a corridor, a door, and something large and invisible that is breathing.',
  twist: 'The monsters in the dungeon can SEE each other because they have lived in the invisibility field their whole lives. To them, the party is the anomaly - visible, loud, obvious, and stumbling into walls. The monsters have been watching the party since they entered. They are not attacking because they are entertained. They start helping, guiding the party with sounds, because they want to see what happens next.',
  climax: 'The treasure vault is the most densely trapped room in the dungeon. Every trap is invisible. The floor is a grid of pressure plates. The party must cross by listening, feeling, and trusting the monster guides who may or may not be leading them into traps for fun. The treasure itself is invisible. They cannot tell if they are holding gold or rocks until they leave the dungeon.',
  scenes: [
    {
      title: 'Blind Entry',
      summary: 'The party discovers the invisibility and develops methods to navigate: throwing objects, trailing rope, feeling walls, and a lot of face-first collisions.',
      challenge: 'exploration',
      keyEvents: [
        'The fighter walks into an invisible wall. Then an invisible door. Then an invisible chair.',
        'The wizard throws chalk dust. Invisible surfaces become visible outlines. Limited supply.',
        'The party discovers an invisible staircase by the rogue falling down it. It goes both up and down.',
        'Something invisible breathes on the cleric\'s neck. The cleric screams. The something laughs. It is not hostile. Yet.',
      ],
    },
    {
      title: 'The Watching Monsters',
      summary: 'The party realizes they are being observed by invisible creatures who find them hilarious. The monsters start communicating: tapping, humming, guiding. Mostly helpfully. Sometimes into walls.',
      challenge: 'social',
      keyEvents: [
        'A rhythmic tapping leads the party down a corridor. They follow. It leads to a room. The room has an invisible feast set out for them.',
        'An invisible monster picks up the halfling and moves him over an invisible pit. Helpful but terrifying.',
        'The party tries to communicate back. Charades with invisible creatures. The rogue mimes "where is the treasure?" The monsters mime something back. Nobody can see it.',
        'A wrong turn: a monster taps urgently. The party ignores it. The party falls into an invisible pool. The monster\'s tapping was "DO NOT GO THAT WAY."',
      ],
    },
    {
      title: 'The Vault',
      summary: 'The invisible treasure vault. Invisible traps. Invisible treasure. The party must trust sound, touch, and their invisible guides to reach the gold they cannot see.',
      challenge: 'puzzle',
      keyEvents: [
        'The vault floor: a grid of pressure plates. Some safe, some trapped. All invisible. A monster taps a rhythm to indicate the safe path.',
        'The party follows the taps. Mostly. The barbarian steps on a wrong plate. An invisible dart hits an invisible wall. Close.',
        'The treasure: they reach a pedestal. They feel gold coins, gems, and a crown. They cannot see any of it. Trust.',
        'Leaving the dungeon: the moment they cross the threshold, everything becomes visible. Their bags are full of gold. They are covered in chalk dust. The invisible monsters wave goodbye. Nobody can see them wave.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Invisible Caretaker (Null)', role: 'guide / trickster', personality: 'The eldest creature in the dungeon. Cannot be seen. Communicates through tapping, humming, and occasionally picking people up. Has a dry sense of humor expressed entirely through physical comedy that nobody can see.' },
    { name: 'Wizard Obryn\'s Echo', role: 'exposition / curse source', personality: 'A magical recording left by the wizard who cursed the dungeon. Plays when someone bumps into the front door. "Welcome to my vault. Can you find it? No you cannot. Because it is invisible. Good luck. I am dead and this is funny to me."' },
  ],
  keyLocations: [
    { name: 'The Vault of Unseen Riches', description: 'A fully furnished dungeon where every object is permanently invisible. Sound and touch work. Sight does not. Chalk dust is gold.', significance: 'The entire setting. Every room is a sensory puzzle.' },
    { name: 'The Invisible Feast Hall', description: 'A large room with an invisible banquet table set for guests. The food is real and edible. Finding your plate is the challenge.', significance: 'A social encounter with invisible hosts. Trust-building through shared invisible meals.' },
    { name: 'The Treasure Vault', description: 'The final room. Invisible pressure-plate floor, invisible treasure, invisible traps. Navigation by sound alone.', significance: 'The climax. Maximum invisibility, maximum trust required.' },
  ],
  dataSystems: ['trapGenerator', 'dungeonRoom', 'socialEncounter'],
};
