import type { FullCampaign } from '../types';

export const theSkyAboveTheSky: FullCampaign = {
  id: 'full-sky-above-the-sky',
  type: 'full',
  title: 'The Sky Above the Sky',
  tagline: 'The floating islands are not floating. They are falling, very slowly.',
  tone: 'exploration',
  themes: ['exploration', 'planar', 'survival'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 13 },
  estimatedSessions: 18,
  settingSummary:
    'Above the cloud layer, unreachable by conventional flight, drifts an archipelago of floating islands that no one has charted. The Cartographers\' Guild has commissioned an airship expedition to map them. Each island has its own ecosystem — some tropical, some frozen, some made of crystal. The wind between them carries whispers. The party maps, explores, and slowly realizes these islands are not what they seem.',
  hook: 'The Guild unveils the Skyward Venture, their first high-altitude airship, and hires the party as the survey crew. "We know the islands exist — telescopes confirm them. We do not know what is on them, how many there are, or why they float. That is your job." The first ascent through the cloud layer is beautiful. The first island they find has footprints in the dust — but no people.',
  twist:
    'The islands are not floating. They are falling — extremely slowly. They are fragments of a shattered moon that broke apart centuries ago, descending through the atmosphere at a rate measured in inches per year. In another two centuries, they will reach the ground. The impact of even one island would devastate a region. The civilizations living on the islands know this and have been preparing — some for evacuation, some for war over the surface world\'s land.',
  climax:
    'The largest island fragment contains the remains of the moon\'s core — a gravitational anchor that could halt or accelerate the descent. The party must navigate a war between island factions (those who want to land peacefully and those who want to conquer) while deciding what to do with the anchor. Halt the fall and strand the island civilizations in the sky forever, let them land and reshape the surface world, or find a way to guide them down safely.',
  acts: [
    {
      title: 'Act 1: First Ascent',
      summary:
        'The party launches into the upper atmosphere and begins charting islands. Each one is a contained world — strange ecosystems, abandoned settlements, and hints of current habitation.',
      keyEvents: [
        'Launch of the Skyward Venture through the cloud barrier',
        'First island: a tropical jungle where all plants grow downward (roots in the air)',
        'Discovery of an abandoned observatory with star charts that do not match the current sky',
        'Evidence of people: a campfire still warm, but no one in sight',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Sky Peoples',
      summary:
        'Contact with the island civilizations. They are not hiding from the surface — they are hiding from each other. Faction politics, aerial skirmishes, and the slow reveal that the islands are descending.',
      keyEvents: [
        'First contact with the Drifters — nomads who sail between islands on wind-skiffs',
        'The Anchor Faction: islanders who want to stop the descent and stay in the sky',
        'The Landers: islanders preparing to claim surface territory by force',
        'A scientific station confirms the descent rate — impact in 200 years, accelerating',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Moon\'s Heart',
      summary:
        'The largest fragment holds the gravitational core. Both factions race to claim it. The party must reach it first and decide the fate of two worlds — the sky and the surface.',
      keyEvents: [
        'Aerial battle between the Anchor Faction and the Landers over the core island',
        'Infiltration of the Moon\'s Heart — a dungeon of shattered lunar architecture',
        'The gravitational anchor: a device that can halt, redirect, or accelerate the descent',
        'The choice: sky, surface, or a controlled landing that changes both worlds',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Guildmaster Elara Quill',
      role: 'patron / cartographer',
      personality:
        'Head of the Cartographers\' Guild. Brilliant, impatient, and obsessed with filling in the last blank space on her maps. Communicates via sending stones from the surface.',
    },
    {
      name: 'Captain Brask',
      role: 'airship pilot',
      personality:
        'Pilot of the Skyward Venture. Former military, steady hands, quiet humor. Treats the airship like a living thing. "She does not like turbulence. Neither do I."',
    },
    {
      name: 'Zephyr',
      role: 'Drifter contact',
      personality:
        'A young Drifter nomad who acts as the party\'s first guide among the sky peoples. Cheerful, reckless, and terrified of the ground. Has never been below the clouds.',
    },
    {
      name: 'Warden Korvath',
      role: 'Lander war-chief',
      personality:
        'Leader of the faction that wants to conquer surface land. Not evil — desperate. His island is the lowest and fastest-falling. His people will hit the ground first, in about fifty years.',
      secret: 'He has sent scouts below the clouds already. They came back with maps of the surface world\'s military positions.',
    },
  ],
  keyLocations: [
    {
      name: 'The Skyward Venture',
      description: 'A reinforced airship designed for high-altitude travel. The party\'s mobile base and lifeline.',
      significance: 'Primary transport and home base throughout the campaign.',
    },
    {
      name: 'The Inverted Jungle',
      description: 'An island where vegetation grows downward from the rock. Walking on the surface means walking on a canopy. The forest floor is above you.',
      significance: 'First island explored — establishes the strangeness of the sky world.',
    },
    {
      name: 'The Moon\'s Heart',
      description: 'The largest island fragment, containing the shattered core of the original moon. A dungeon of fractured stone and ancient gravitational machinery.',
      significance: 'Final location where the fate of the islands is decided.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'randomBiome',
    'weatherProgression',
    'navalCombat',
    'diplomaticNegotiation',
    'politicalEvent',
    'magicalAnomaly',
    'encounterWaves',
  ],
};
