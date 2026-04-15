import type { OneShotCampaign } from '../types';

export const theFloorIsLava: OneShotCampaign = {
  id: 'oneshot-the-floor-is-lava',
  type: 'oneshot',
  title: 'The Floor Is Lava',
  tagline: 'A wizard sneezed. Every floor in the dungeon is now lava. The mimic is a stepping stone. The gelatinous cube is floating. This is fine.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'The Dungeon of Archmagus Snivel was a perfectly normal dungeon this morning: traps, treasure, monsters, the usual. Then Snivel sneezed during his morning Contingency spell and accidentally cast a 9th-level Floor-to-Lava transmutation on the entire complex. Every horizontal surface below knee height is now molten rock. The monsters are confused. The traps are irrelevant (the floor IS the trap now). The treasure chests are slowly sinking. Snivel is standing on his desk screaming for someone to fix this.',
  hook: 'The party enters the dungeon for a routine delve and immediately discovers that the floor is lava. Actual lava. Not metaphorical. Not a spell effect that looks like lava. Real, honest-to-gods, 2d10-fire-damage-per-round molten rock where the flagstones used to be. A sign on the wall (singed) reads: "ADVENTURERS WANTED — WILL PAY DOUBLE — PLEASE HELP — STANDING ON DESK — FLOOR IS LAVA — THIS IS NOT A DRILL."',
  twist:
    'Snivel cannot reverse the spell because he does not know what he cast. He sneezed. It was involuntary. His spellbook is on a shelf six feet above the lava and he cannot reach it because he is a four-foot-tall gnome standing on a desk. The spellbook is also on fire. The entire solution requires the party to bring the spellbook to Snivel while it is actively burning, while the floor is actively lava, while the dungeon monsters are actively panicking.',
  climax:
    'The party reaches Snivel\'s study, retrieves the burning spellbook using creative non-floor-touching methods, and delivers it to a hyperventilating gnome who has to find the right page while the book is on fire, read the counterspell while standing on a desk, and cast it while sneezing again (because the smoke is making his allergies worse). He sneezes mid-cast. The floor becomes jello. It is technically an improvement.',
  scenes: [
    {
      title: 'Scene 1: The Entrance',
      summary: 'The party enters the dungeon and discovers the lava situation. Every room is a platforming puzzle. The furniture is the only safe ground.',
      challenge: 'puzzle',
      keyEvents: [
        'First step into the dungeon: the barbarian\'s boot starts smoking. "Ow. OW. THE FLOOR IS—" "LAVA, YES, WE KNOW."',
        'Furniture parkour: tables, chairs, bookshelves, and a chandelier that is load-bearing (barely)',
        'A goblin is sitting on a wardrobe crying. He does not want to fight. He wants to not be on fire.',
        'The treasure chest: visible in the middle of a lava room. Slowly sinking. The party has about three minutes.',
      ],
    },
    {
      title: 'Scene 2: The Monsters',
      summary: 'The dungeon\'s inhabitants are dealing with the same problem and are just as confused. A mimic disguised as a safe stepping stone. A gelatinous cube floating on lava (somehow). An ogre balancing on two shields.',
      challenge: 'combat',
      keyEvents: [
        'The mimic: disguised as a perfectly placed stepping stone in the middle of a lava river. It is the obvious path. It bites.',
        'The gelatinous cube: floating on the lava like a horrible transparent boat. It is not hostile. It is SCARED.',
        'An ogre is balanced on two tower shields like skis, slowly sliding across the lava, screaming',
        'A group of kobolds has built a functioning raft out of a door and is paddling with halberds. They offer the party a ride. For a price.',
      ],
    },
    {
      title: 'Scene 3: The Study',
      summary: 'The party reaches Snivel\'s study, retrieves the burning spellbook, and survives the most chaotic counterspell casting in arcane history.',
      challenge: 'puzzle',
      keyEvents: [
        'Snivel\'s study: a gnome on a desk, a burning spellbook on a high shelf, and lava everywhere',
        '"PLEASE GET MY BOOK. IT IS ON FIRE. I AM AWARE IT IS ON FIRE. PLEASE GET IT ANYWAY."',
        'The spellbook retrieval: requires climbing, jumping, and catching a burning book without dropping it into lava',
        'Snivel reads the counterspell while sneezing. The sneeze adds a modifier. The floor becomes jello. Close enough.',
        'Epilogue: Snivel pays double. The party leaves. The gelatinous cube is still floating in the jello, somehow happier.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Archmagus Snivel', role: 'quest giver / disaster', personality: 'A gnome wizard with chronic allergies and 9th-level spell slots. A combination that should be illegal. He is standing on his desk in a full panic. His robes are singed. His hat is on fire. He does not notice his hat is on fire.' },
    { name: 'The Goblin (Nix)', role: 'accidental ally / comedic relief', personality: 'A dungeon goblin who was having a perfectly fine Tuesday until the floor became lava. Sitting on a wardrobe, knees to his chest, rocking gently. Will join the party for the low price of being carried to safety.' },
    { name: 'The Kobold Captain', role: 'entrepreneur / raft operator', personality: 'A kobold who saw a crisis and immediately started a ferry service. Charges five gold per passenger per room. Does not accept IOUs. Has already made more money today than in the previous decade.' },
  ],
  keyLocations: [
    { name: 'The Dungeon of Archmagus Snivel', description: 'A wizard\'s dungeon where every floor is now lava. Tables are islands. Chandeliers are ziplines. The structural integrity of everything is being tested.', significance: 'The entire one-shot. Every room is a new "the floor is lava" challenge.' },
    { name: 'Snivel\'s Study', description: 'The innermost chamber. A desk (safe), a shelf (burning), a gnome (panicking), and the answers (on fire).', significance: 'The final destination and the location of the solution.' },
    { name: 'The Great Hall', description: 'The largest room in the dungeon. A vast expanse of lava with scattered furniture islands. The chandelier in the center is the only way across.', significance: 'The biggest platforming challenge. Success or lava bath.' },
  ],
  dataSystems: ['trapCorridor', 'encounterWaves', 'chaseSequence'],
};
