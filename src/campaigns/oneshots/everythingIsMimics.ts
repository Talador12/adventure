import type { OneShotCampaign } from '../types';

export const everythingIsMimics: OneShotCampaign = {
  id: 'oneshot-everything-is-mimics',
  type: 'oneshot',
  title: 'Everything Is Mimics',
  tagline: 'One thing is a mimic. Then two things. Then everything. The floor. Their weapons. EACH OTHER.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'horror'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2,
  settingSummary:
    'The Dungeon of Echoing Teeth was built by the mimic lord Adhesius as a sanctuary for mimic-kind. Every room has more mimics than the last. The party does not know this. They think it is a normal dungeon. By the end, they will trust nothing. Not the treasure. Not the doors. Not the floor. Not each other. The paranoia is the point.',
  hook: 'A standard dungeon delve. The quest board says "clear the dungeon, claim the treasure." Easy. The first room looks normal. A chest in the corner. The party opens it. It bites. "Mimic." They kill it. Move on. They enter room two. Two chests. One is a mimic. The other is also a mimic. This is where the pattern begins.',
  twist: 'The mimic count is not random. It doubles every room. Room one: one mimic. Room two: two. Room three: four. Room four: everything. The walls. The floor. The torches. The party\'s own weapons have been replaced by mimics while they were not looking. The "exit door" is a mimic. There is no exit. There is only mimic.',
  climax: 'The final room is entirely mimic. Adhesius, the mimic lord, reveals itself - it is the entire room. Floor, walls, ceiling: one massive mimic. The party must fight their way out of a room that IS the boss while their own gear bites them. Escape means punching through a wall that screams.',
  scenes: [
    {
      title: 'Room One: Just One',
      summary: 'A normal dungeon room. One chest. One mimic. The party handles it easily. Confidence is high. They should enjoy this feeling.',
      challenge: 'combat',
      keyEvents: [
        'The chest bites. The fighter hits it. It dies. "Well that was easy."',
        'A gold coin on the floor. It is a very small mimic. It bites a finger. Minor damage. Funny.',
        'The party loots the room. Everything else is normal. This builds false confidence.',
        'The door to room two opens smoothly. It is a door. For now.',
      ],
    },
    {
      title: 'Room Two and Three: The Escalation',
      summary: 'More mimics per room. The chair is a mimic. The table is a mimic. The party starts checking everything. Not everything. Not enough.',
      challenge: 'exploration',
      keyEvents: [
        'Room two: the party checks the chests. Smart. They do not check the rug. The rug is a mimic.',
        'Room three: four mimics. The bookshelf, two candelabras, and the rogue\'s replacement sword (swapped while they were not looking)',
        'Paranoia sets in. The party starts hitting everything before touching it. A real chair breaks. It was just a chair.',
        'A moment of horrible realization: "Wait. When did the corridor have a door here?"',
      ],
    },
    {
      title: 'The Mimic Lord\'s Chamber',
      summary: 'The final room IS a mimic. Adhesius is the floor, walls, and ceiling. The party is inside the boss. Fighting from the inside. Everything is teeth.',
      challenge: 'combat',
      keyEvents: [
        'The room lurches. The walls move. Teeth emerge from the floor. "You are inside me," says the room.',
        'Adhesius attacks with every surface. Tongue-tentacles from the ceiling. Teeth from the floor. Acid saliva rains down.',
        'The party\'s gear starts biting. The fighter\'s shield is a mimic. The cleric\'s holy symbol is a mimic. Trust nothing.',
        'Escape: the party must cut through the wall (it screams) and burst out into the corridor, which is mercifully just stone.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Adhesius', role: 'villain / the room itself', personality: 'A mimic lord the size of a large chamber. Speaks in a deep, sticky voice. Genuinely offended when the party kills smaller mimics. "That was my COUSIN." Views non-mimics as food that insists on moving.' },
    { name: 'Chester', role: 'mimic ally / double agent', personality: 'A small mimic disguised as a helpful treasure chest that offers to guide the party. Actually leading them deeper. Occasionally forgets not to bite. "Sorry. Reflex."' },
  ],
  keyLocations: [
    { name: 'The Dungeon of Echoing Teeth', description: 'A dungeon where the echo is not your voice bouncing off walls. It is the walls chewing. Built by and for mimics.', significance: 'Every room escalates the mimic count. The dungeon itself is the progression system.' },
    { name: 'Adhesius\'s Chamber', description: 'The final room. Also the final boss. The room is alive and hungry and very, very sticky.', significance: 'The climax. The party fights from inside the boss.' },
  ],
  dataSystems: ['trapGenerator', 'combatNarration', 'encounterWaves'],
};
