import type { FullCampaign } from '../types';

export const theSummerCourt: FullCampaign = {
  id: 'full-summer-court',
  type: 'full',
  title: 'The Summer Court',
  tagline: 'Summer never ends in the Feywild. That\'s the problem.',
  tone: 'social',
  themes: ['social', 'intrigue', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'The Summer Court of the Feywild has been in eternal summer for a hundred mortal years — the Autumn Court never arrived. Seasons in the Feywild are political: each season is ruled by a court, and power transfers ceremonially. Something is preventing the transition. Eternal summer sounds nice until the crops won\'t stop growing (choking everything), the fey can\'t sleep (too much light), and the Summer Queen is going mad from power she can\'t release.',
  hook: 'A fey lord stumbles through a portal into the mortal world, sunburned and exhausted: "The Summer Queen won\'t let go. She can\'t. Something has bound the seasons. We need mortal help — fey can\'t act against their own court. You must come to the Feywild and free autumn."',
  twist:
    'The Summer Queen isn\'t clinging to power — she\'s trapped in it. The Autumn Prince was assassinated before the handoff ceremony, and without a recipient, the Summer Queen can\'t release the season. The power is building in her like pressure in a sealed vessel. She\'s dying. The assassin is the Winter Queen, who wants to skip autumn entirely and plunge the Feywild into early winter — gaining two seasons\' worth of power.',
  climax:
    'The party must find a way to transfer summer: find a new Autumn ruler (from among the fey candidates, or create one), break the seasonal binding (allowing nature to handle it, but unpredictably), or challenge the Winter Queen directly. The Summer Queen is running out of time — if she can\'t release the season, she\'ll explode into a solar flare that burns the Feywild.',
  acts: [
    {
      title: 'Act 1: Eternal Summer',
      summary:
        'Arrival in the Feywild, experiencing eternal summer\'s consequences, and entering the Summer Court as mortal guests.',
      keyEvents: [
        'Entry to the Feywild: everything is overwhelmingly green, bright, and growing',
        'The consequences: overgrowth, sleepless fey, rivers drying up, animals confused',
        'The Summer Court: beautiful, ancient, and strained — the Queen barely holds it together',
        'The Queen\'s plea: "Find out why autumn won\'t come. Free me."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Missing Prince',
      summary:
        'Investigating the Autumn Prince\'s disappearance. Court politics, fey bargains, and the trail leading to the Winter Court.',
      keyEvents: [
        'The Autumn territories: abandoned, decaying, the Prince\'s court empty',
        'Evidence of assassination: fey don\'t die easily, but traces of winter magic remain',
        'Fey court politics: potential Autumn successors compete and scheme',
        'The Winter Queen\'s involvement discovered — but proving it in fey law requires evidence gathered by fey rules',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Changing of Seasons',
      summary:
        'Confronting the Winter Queen, installing a new Autumn ruler or breaking the binding, and saving the Summer Queen before she goes supernova.',
      keyEvents: [
        'The Winter Court: beautiful, hostile, and the Winter Queen is not subtle about her plans',
        'Finding a new Autumn ruler: the candidate must be willing, worthy, and able to survive the power transfer',
        'The handoff ceremony: ancient, dangerous, and the Winter Queen tries to disrupt it',
        'The Summer Queen releases the season — the relief is visible, physical, and emotional',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'The Summer Queen (Solara)',
      role: 'client / dying figure',
      personality:
        'An archfey who embodies summer — warm, generous, powerful, and currently being consumed by her own season. She radiates heat involuntarily. Her touch burns. She misses being able to hold flowers without igniting them.',
    },
    {
      name: 'The Winter Queen (Morwen)',
      role: 'antagonist',
      personality:
        'An archfey who embodies winter — cold, patient, strategic. Not evil in a mortal sense — just ruthlessly pragmatic about power. She sees an opportunity and she\'s taking it.',
      secret: 'She didn\'t kill the Autumn Prince herself — she hired a mortal assassin because fey can\'t act against another court. If the mortals find the assassin, the fey courts can act.',
    },
    {
      name: 'Bramble',
      role: 'Autumn candidate / ally',
      personality:
        'A fey nature spirit who loves autumn — the colors, the harvest, the melancholy beauty. Hesitant about becoming a ruler. "I love autumn. I\'m not sure I want to BE autumn."',
    },
    {
      name: 'Puck',
      role: 'trickster guide',
      personality:
        'A fey who has appeared in many stories. Helpful, mischievous, and completely unreliable. "I\'ll help you. I might also make it worse first. That\'s how I help."',
    },
  ],
  keyLocations: [
    {
      name: 'The Summer Court',
      description: 'A palace of living vines, endless sunlight, and flowers that won\'t stop blooming. Beautiful and suffocating.',
      significance: 'Where the party is briefed and the Summer Queen awaits rescue.',
    },
    {
      name: 'The Autumn Territories',
      description: 'A realm that should be full of falling leaves and harvest colors, now brown, still, and empty. Eerie in its absence.',
      significance: 'Where the investigation takes place.',
    },
    {
      name: 'The Winter Court',
      description: 'A palace of ice and silence. Every surface reflects. Every word echoes. The Winter Queen sits on a throne of frozen starlight.',
      significance: 'Where the antagonist is confronted.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'diplomaticNegotiation',
    'enchantedForest',
    'socialEncounter',
    'darkBargain',
    'factionReputation',
    'npcRelationshipWeb',
    'weatherProgression',
    'politicalEvent',
  ],
};
