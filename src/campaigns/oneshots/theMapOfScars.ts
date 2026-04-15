import type { OneShotCampaign } from '../types';

export const theMapOfScars: OneShotCampaign = {
  id: 'oneshot-map-of-scars',
  type: 'oneshot',
  title: 'The Map of Scars',
  tagline: 'A body with scars that form a map. The map leads somewhere. Who carved it, and why?',
  tone: 'mystery',
  themes: ['mystery', 'dark_fantasy', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A body washes ashore covered in ritual scarification. The scars form a precise topographic map of a nearby region, marking a specific location with an X. The party must identify the victim, follow the map, and discover why someone would carve a treasure map into human flesh.',
  hook: 'The harbormaster calls the party to the docks. A body, face down. When they turn it over, the torso is covered in raised scars. Deliberate. Precise. "That is a map," the harbormaster says. "Those ridgelines. That is the Ashwood Hills. And that mark... that is a destination."',
  twist:
    'The scars are self-inflicted. The victim was a cartographer who discovered the location of a lich\'s phylactery. She knew she would be hunted for the information, so she carved the map into her own skin and destroyed every other record. She was killed before she could reach the destination herself.',
  climax:
    'The party follows the map to the phylactery\'s hiding place. The lich\'s servants are already searching. The party must retrieve the phylactery before the servants find it. Destroying it ends the lich. Failing means the lich becomes unstoppable.',
  scenes: [
    {
      title: 'Scene 1: The Body',
      summary: 'Examining the corpse. Identifying the victim. Reading the map carved into skin.',
      challenge: 'exploration',
      keyEvents: [
        'The scars: precise, deliberate, topographic. Years old. This was planned.',
        'The victim: no identification. Young woman. Calloused hands. Ink-stained fingers.',
        'Cartographer\'s guild identifies her: Sera Inkwell, missing for three years.',
        'She was researching forbidden locations. Her notes were destroyed in a fire.',
      ],
    },
    {
      title: 'Scene 2: The Trail',
      summary: 'Following the scar-map into the wilderness. The destination is hidden, guarded, and significant.',
      challenge: 'exploration',
      keyEvents: [
        'The Ashwood Hills: dense, dangerous, and hard to navigate without the map.',
        'Other searchers in the woods. Dark-robed figures. The lich\'s servants, also looking.',
        'The X marks a cave behind a waterfall. Hidden unless you know exactly where to look.',
        'Signs of Sera\'s camp near the cave. She was close. She almost made it.',
      ],
    },
    {
      title: 'Scene 3: The Phylactery',
      summary: 'Inside the cave. The lich\'s phylactery. The servants arrive. Destroy it or lose everything.',
      challenge: 'combat',
      keyEvents: [
        'The cave: warded, trapped, and containing a small iron box on a pedestal.',
        'The phylactery: a gem pulsing with necrotic energy. Destroying it is the goal.',
        'The lich\'s servants arrive. They want the phylactery intact. Combat in a trapped cave.',
        'Destroy the gem. The lich, wherever it is, screams and unravels. Sera\'s sacrifice means something.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Sera Inkwell',
      role: 'the victim / cartographer',
      personality: 'Known only through her work and her sacrifice. A brilliant mapmaker who carved the most important map of her life into her own body to ensure it could not be taken from her.',
    },
    {
      name: 'Vex, Servant of the Lich',
      role: 'undead lieutenant / antagonist',
      personality: 'A wight commander of the lich\'s search party. Efficient, relentless, and utterly devoted to its master\'s survival.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ashwood Hills',
      description: 'Dense forested hills matching the topography carved into Sera\'s skin. The map come to life.',
      significance: 'The journey. Navigating the real terrain using a body as a map.',
    },
    {
      name: 'The Hidden Cave',
      description: 'A cave behind a waterfall, warded and trapped, containing the one thing a lich cannot afford to lose.',
      significance: 'The destination. Where the mystery ends and the stakes become clear.',
    },
  ],
  dataSystems: ['puzzleLock', 'trapCorridor', 'combatNarration', 'environmentalHazard'],
};
