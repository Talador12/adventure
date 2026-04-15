import type { FullCampaign } from '../types';

export const theStarwrightGuild: FullCampaign = {
  id: 'full-the-starwright-guild',
  type: 'full',
  title: 'The Starwright Guild',
  tagline: 'Chart the stars. Trade between crystal spheres. Do not look at what lives past the last one.',
  tone: 'exploration',
  themes: ['planar', 'exploration', 'epic'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 20,
  settingSummary:
    'The cosmos is an ocean of luminous aether, and the worlds float within crystal spheres like ships in bottles. Between the spheres, solar wind fills vast sails of woven starlight. Ships are powered by bound fire elementals and navigated by star-reading elves who have done this for millennia. The Starwright Guild charts new routes, maps unvisited spheres, and maintains the trade lanes that keep a hundred worlds connected. The party are new recruits - a crew of mapmakers, diplomats, and explorers setting sail aboard the Astrolabe, a survey vessel with orders to chart the Outer Reaches where the spheres grow thin and the stars grow strange.',
  hook: 'The Guildmaster pins a blank chart to the wall. "Everything past the Seventh Sphere is rumor. Traders say there are crystal spheres out there with no worlds inside - just light. Scholars say the stars end somewhere. Your job is to find out where and come back to tell us." She pauses. "The last three crews did not come back."',
  twist:
    'The cosmos is an egg. The crystal spheres are cells. The aether is fluid. At the edge where the stars end, the party finds a membrane - thin, translucent, warm to the touch. Something vast is growing on the other side. The cosmos is not a place. It is a vessel for something being born. The Starwright Guild has been mapping the inside of an egg that is about to hatch. The question is not what is coming - it is whether the hundred worlds inside survive the hatching.',
  climax:
    'The membrane cracks. Light from outside pours in - a light that is not starlight, that has color and warmth and intent. The party must race back to the inner spheres to warn the Guild, then lead a coalition of worlds in a desperate plan: reinforce the membrane to delay the hatching, or prepare to survive whatever emerges. The final session is the hatching itself - a new being of impossible scale, and the party\'s choice about whether to fight it, welcome it, or help it.',
  acts: [
    {
      title: 'Act 1: The Inner Spheres',
      summary: 'Training, first voyages, and establishing the crew. The party charts familiar spheres, trades with known civilizations, and learns the art of star-sailing.',
      keyEvents: [
        'First launch: the Astrolabe catches solar wind. The party learns sail-and-elemental navigation.',
        'The Beholder Librarians of Sphere Three: a vast orbital library. They trade knowledge for knowledge.',
        'A pirate ambush in the aether between spheres: raiders using enslaved elementals as weapons',
        'The mind flayer merchants of the Ink Sphere: deeply civilized, deeply unsettling trade partners',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Outer Reaches',
      summary: 'Beyond charted space. The spheres grow strange - some are empty, some contain impossible geometries, some are cracked and leaking. The party pushes further than anyone has gone.',
      keyEvents: [
        'An empty sphere: nothing inside. No world, no star, just a perfect hollow crystal shell. Why was it made?',
        'A cracked sphere leaking aether: the world inside is dying. The party can attempt repairs or evacuate survivors.',
        'Contact with a civilization that sails the outside of the spheres. They call the interior "the shell world."',
        'The stars begin to thin. The aether grows warm. The instruments behave strangely.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Membrane',
      summary: 'The edge of everything. The party reaches the wall where the cosmos ends, discovers what is on the other side, and must decide the fate of every world in every sphere.',
      keyEvents: [
        'The membrane: translucent, warm, and alive. Something moves on the other side.',
        'The race back: the membrane is cracking. The party must warn the Guild before the hatching.',
        'Coalition building: convincing a hundred worlds that the cosmos is an egg requires diplomacy and proof',
        'The hatching: the membrane splits. The party faces what emerges and makes the final choice.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Guildmaster Aelindra',
      role: 'mission authority / mentor',
      personality: 'A silver-haired elf who has charted more spheres than anyone alive. She sends crews into the unknown because she believes the unknown should not stay that way. Her calm is unshakeable until you mention the three lost crews.',
      secret: 'She found the membrane decades ago. She has been sending crews to confirm what she saw, hoping she was wrong.',
    },
    {
      name: 'Combustus',
      role: 'bound fire elemental / ship engine',
      personality: 'The Astrolabe\'s elemental drive. Speaks in pops and crackles. Has opinions about navigation. Technically a prisoner, but has served so long it considers the ship home. It is terrified of the outer reaches.',
    },
    {
      name: 'Ix the Beholder',
      role: 'librarian / information broker',
      personality: 'A beholder who chose knowledge over conquest. Runs the orbital library in Sphere Three. Eleven eyes, each reading a different book. Charges one secret per answer. Never lies, but never tells the whole truth.',
    },
    {
      name: 'Captain Voss',
      role: 'shell-sailor / outside perspective',
      personality: 'A human who sails the outside of the spheres in a vessel of hardened aether. She has seen the membrane from the outside. What she saw changed her. She does not talk about it, but she will help.',
    },
  ],
  keyLocations: [
    { name: 'The Astrolabe', description: 'A Starwright survey vessel. Elemental-powered, star-sailed, equipped with cartographic instruments and a hold full of blank charts. Home for twenty sessions.', significance: 'The party\'s ship and mobile base. Every journey starts and ends here.' },
    { name: 'The Orbital Library', description: 'A station in Sphere Three maintained by beholder scholars. Books from every world in every sphere. The catalog alone takes a year to read.', significance: 'The primary source of information about the outer reaches and the membrane.' },
    { name: 'The Membrane', description: 'The wall at the edge of the cosmos. Translucent, warm, gently pulsing. On the other side, something vast moves in light that has never been starlight.', significance: 'The campaign\'s ultimate destination and the site of the final choice.' },
  ],
  dataSystems: ['planarWeather', 'planarMarketplace', 'astralEncounter', 'astralWeatherHazard', 'crossPlaneMessenger', 'shipCargo', 'treasureMap', 'npcRelationshipWeb', 'magicalAnomaly'],
};
