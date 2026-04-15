import type { FullCampaign } from '../types';

export const theWarBeneath: FullCampaign = {
  id: 'full-war-beneath',
  type: 'full',
  title: 'The War Beneath',
  tagline: 'The surface world has no idea there\'s a continent-spanning war underground.',
  tone: 'serious',
  themes: ['underdark', 'war', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 18,
  settingSummary:
    'A total war is raging in the Underdark — drow vs. duergar vs. illithids — and the surface world doesn\'t know. The party is pulled underground when a sinkhole swallows their hometown, dropping them into the middle of a three-faction war. They must navigate alien cultures, survive constant warfare, and find a way home — or find a way to end the war before it breaks through to the surface.',
  hook: 'The party\'s hometown collapses into a sinkhole. They fall for what feels like minutes. When they land, they\'re in a duergar trench line, mid-battle. A sergeant shoves a crossbow into their hands and shouts: "You want to live? SHOOT THE DARK ONES."',
  twist:
    'The war isn\'t natural. An aboleth elder brain in the deepest caverns has been psychically manipulating all three factions for centuries, feeding on the emotional energy of conflict. The war has no real cause — every "reason" to fight was implanted. The drow, duergar, and illithids have been puppets, and the party\'s arrival (surface minds, immune to generations of conditioning) is the first variable the aboleth can\'t control.',
  climax:
    'The party must unite representatives from all three factions — beings who have been taught to hate each other for centuries — and lead them to confront the aboleth. The final battle is fought on two fronts: the physical fight against the aboleth, and the psychic fight to free three civilizations from generations of implanted hatred.',
  acts: [
    {
      title: 'Act 1: The Drop',
      summary:
        'The party falls into the Underdark, survives the duergar front lines, and begins to understand the scope of the war. They must choose a faction or stay neutral.',
      keyEvents: [
        'The sinkhole — fall into the middle of a battle',
        'Duergar trenches — conscripted, must fight or flee',
        'First drow encounter — they\'re not what the duergar described',
        'Choice: align with duergar, flee to neutral ground, or seek the drow',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Three Fronts',
      summary:
        'The party travels between all three factions, learning their perspectives. Each side has legitimate grievances but also inexplicable hatred. The pattern suggests external manipulation.',
      keyEvents: [
        'Duergar perspective: militaristic, defensive, "they started it" (nobody remembers how)',
        'Drow perspective: matriarchal, strategic, fighting for territory they cannot explain needing',
        'Quiet moment: Curator shares a meal with the party (it does not eat, but it sits). It asks: "Do you fight wars on the surface? Why? Is it also for reasons you cannot articulate?"',
        'Illithid perspective: alien, logical, waging war against their own pacifist instincts',
        'Discovery: historical records from all three factions show simultaneous "provocations" — too coordinated to be coincidence',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Deep',
      summary:
        'The party descends to the deepest caverns, confronts the aboleth, and attempts the impossible: a three-faction alliance against their puppeteer.',
      keyEvents: [
        'Recruiting faction representatives — each requires a different approach',
        'Descent into the Deep — environmental hazards, psychic interference',
        'The aboleth reveals itself — and tries to turn the alliance against each other',
        'Two-front battle: physical and psychic, requiring trust between ancestral enemies',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Sergeant Grimjaw',
      role: 'duergar ally',
      personality:
        'A grizzled duergar NCO who has been fighting for 30 years and is deeply, quietly tired. Chews on iron nails when nervous. Hates the drow reflexively but cannot explain why when pressed. Respects the party for surviving the Drop. "You surface folk do not know how to fight down here. But you do not know how to quit either. That counts." Arc: if the party brings him face-to-face with Priestess Ilvara, decades of hatred crack against the reality that she is just as tired as he is.',
      secret: 'He has dreams in a language he doesn\'t know. It\'s the aboleth\'s frequency, leaking through during sleep.',
    },
    {
      name: 'Priestess Ilvara',
      role: 'drow representative',
      personality:
        'A drow priestess who has started questioning Lolth\'s commands to wage war. Intelligent, cautious, and harboring dangerous doubts about everything she was taught.',
      secret: 'She\'s been receiving visions she thought were from Lolth — they\'re from the aboleth, and she\'s beginning to suspect.',
    },
    {
      name: 'Curator (illithid)',
      role: 'illithid ally',
      personality:
        'An illithid scholar who has been studying the war and cannot find a logical reason for it. Communicates through telepathy — polite, precise, deeply uncomfortable with violence.',
      secret: 'It has shielded its mind from the elder brain and is effectively an illithid exile — if discovered, it will be absorbed.',
    },
    {
      name: 'The Abyssal Chorus',
      role: 'true antagonist',
      personality:
        'An aboleth elder brain connected to a network of lesser aboleths. It doesn\'t speak — it harmonizes. Its thoughts sound like a choir singing in a language that makes you angry. It has been orchestrating this war for 800 years.',
    },
  ],
  keyLocations: [
    {
      name: 'The Duergar Trenches',
      description:
        'Miles of fortified underground trenches carved into the cavern walls. Functional, grim, and lit by bioluminescent fungus.',
      significance: 'Where the party arrives and first experiences the war.',
    },
    {
      name: 'Menzoberranzan (War Footing)',
      description:
        'The drow city transformed for total war. Beautiful architecture repurposed as fortifications. Spider silk barricades.',
      significance: 'Where the drow perspective is understood.',
    },
    {
      name: 'The Deep',
      description:
        'The lowest caverns, where water seeps from underground oceans and the aboleth network dwells in psychic darkness.',
      significance: 'The final confrontation location.',
    },
  ],
  dataSystems: [
    'massCombat',
    'factionWar',
    'illithidColony',
    'siegeWarfare',
    'mindControl',
    'diplomaticNegotiation',
    'warRoomBriefing',
    'partyMoraleTracker',
    'wildernessSurvival',
  ],
};
