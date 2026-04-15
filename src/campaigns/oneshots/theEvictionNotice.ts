import type { OneShotCampaign } from '../types';

export const theEvictionNotice: OneShotCampaign = {
  id: 'oneshot-eviction-notice',
  type: 'oneshot',
  title: 'The Eviction Notice',
  tagline: 'A landlord wants the neighborhood gone. The residents are not leaving. Neither are you.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Bridgeward neighborhood has been home to working families for generations. Lord Vesper has bought every building and issued mass eviction notices to build luxury housing. The evictions are technically legal - the leases have a clause nobody read. The party helps residents fight back through the legal system, community organizing, and sheer stubbornness.',
  hook: 'Grandmother Asha waves an eviction notice: "Forty years I have lived in this house. My mother lived here. My grandchildren live here. This paper says I have thirty days to leave so a man who has never set foot on this street can build apartments for people who already have homes. Help us fight this."',
  twist: 'The luxury housing is a cover. Lord Vesper discovered a ley line nexus beneath Bridgeward - raw magical energy worth a fortune to the Mage\'s Guild. The residents are sitting on top of it. The "luxury housing" is actually a conduit facility. The legal fight is just the surface of a much larger magical real estate scheme.',
  climax: 'A public hearing at city hall. The party presents evidence of the ley line scheme, resident testimony, and the legal challenge. Lord Vesper\'s lawyers counter with ironclad contracts. The deciding magistrate must weigh law against justice - and the party\'s argument tips the scale.',
  scenes: [
    {
      title: 'Scene 1: The Neighborhood',
      summary: 'Meeting the residents, understanding the community, and finding the legal angle to fight the evictions.',
      challenge: 'social',
      keyEvents: [
        'The residents: families, elders, children - a real community, not just tenants',
        'The eviction clause: buried in fine print, technically valid, morally indefensible',
        'A sympathetic lawyer: she will take the case pro bono but needs evidence of bad faith',
        'Vesper\'s enforcers: hired thugs "inspecting" buildings and intimidating holdouts',
      ],
    },
    {
      title: 'Scene 2: The Real Plan',
      summary: 'Investigating Lord Vesper\'s true intentions. The luxury housing plans do not add up.',
      challenge: 'exploration',
      keyEvents: [
        'Vesper\'s office: blueprints that show a sub-basement structure no luxury apartment needs',
        'The Mage\'s Guild: a sealed contract for "arcane infrastructure rights" in Bridgeward',
        'The ley line: detectable by magic users, running directly under the neighborhood',
        'The evidence: connecting Vesper\'s purchase timeline to the Guild\'s ley line survey dates',
      ],
    },
    {
      title: 'Scene 3: The Hearing',
      summary: 'City hall. Residents vs. lawyers. Truth vs. contracts. The neighborhood\'s future decided in one session.',
      challenge: 'social',
      keyEvents: [
        'Resident testimony: stories of the neighborhood, what it means, what would be lost',
        'The legal argument: bad faith acquisition, concealed purpose, community impact',
        'Vesper\'s counter: "The contracts are valid. Sentiment is not law."',
        'The ley line reveal: the true purpose exposed - the magistrate\'s face changes',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grandmother Asha', role: 'community leader', personality: 'An 80-year-old human woman who has outlived two husbands and raised six children in Bridgeward. Gentle voice, iron spine. "I am not leaving my home because a rich man wants what is underneath it."' },
    { name: 'Lord Vesper', role: 'antagonist', personality: 'A real estate speculator who sees people as obstacles to profit. Polished, legally untouchable, and genuinely confused about why anyone would fight for a "rundown neighborhood."' },
    { name: 'Advocate Lira', role: 'ally lawyer', personality: 'A young tiefling lawyer who takes cases the legal establishment won\'t touch. Sharp, overworked, and fueled by righteous anger and bad coffee.' },
  ],
  keyLocations: [
    { name: 'Bridgeward', description: 'A working-class neighborhood with narrow streets, communal gardens, and doors that are never locked. Eviction notices on every door.', significance: 'The community at stake.' },
    { name: 'City Hall', description: 'A marble building where decisions about people\'s lives are made by people who have never met them.', significance: 'Where the hearing happens and the fight is decided.' },
    { name: 'Vesper\'s Office', description: 'A glass-and-steel tower office with blueprints, contracts, and a view of Bridgeward from above - like a map of territory to be conquered.', significance: 'Where the true plan is discovered.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
