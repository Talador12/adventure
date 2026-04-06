import type { FullCampaign } from '../types';

export const theNameless: FullCampaign = {
  id: 'full-nameless',
  type: 'full',
  title: 'The Nameless',
  tagline: 'Names have power. Someone is stealing them. Yours is next.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'People are losing their names. Not forgetting them — the names are being erased from reality. Friends can\'t remember you. Documents go blank. Magic that targets "by name" fails. The nameless become invisible to society — unable to own property, make contracts, or even be healed by name-based spells. Something is collecting names, and the collection is growing.',
  hook: 'A woman sits in the town square, crying. She tells the party her name. The party immediately forgets it. She shows them her identification — it\'s blank. Her neighbors walk past without seeing her. "I had a name yesterday. Help me. Please. I\'m disappearing."',
  twist:
    'Names are being collected by a true name demon — a creature from the lower planes that grows in power for every true name it possesses. It\'s not just collecting mortal names — it\'s building toward the true name of a god. Mortal names are practice. Divine names are the prize. If it speaks a god\'s true name, it controls that god.',
  climax:
    'The demon has almost completed a divine true name. The party must enter its domain — a library of stolen names where every book is a person — find and reclaim the names, and confront a creature that knows their true names and can use them as weapons. Speaking your own true name is the only weapon that works, but speaking it aloud gives the demon power over you.',
  acts: [
    {
      title: 'Act 1: The Nameless',
      summary: 'People losing their names. Investigation. The party discovers the pattern and the first leads to something supernatural.',
      keyEvents: [
        'Three nameless people found: a soldier, a merchant, a child — all erased from records',
        'The pattern: all three visited the same traveling scholar who asked them to "sign their full name"',
        'Tracking the scholar: they\'ve moved on, leaving more nameless behind',
        'First encounter with name-magic: a spell targets a party member by name and misses — because the demon has started collecting theirs',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Collector',
      summary: 'The true nature of the threat. The demon\'s agents. The party\'s own names begin to fade — spells work less, NPCs remember them less.',
      keyEvents: [
        'The "scholar" revealed as an agent of the true name demon',
        'Party names begin fading: introduce yourself — the NPC forgets within seconds',
        'Research into true name magic: a wizard explains the existential danger',
        'The demon\'s domain located: a pocket dimension accessible through the name of a forgotten place',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Library of Names',
      summary: 'Inside the demon\'s domain: a vast library where every stolen name is a book. The party must find their own names and confront the demon.',
      keyEvents: [
        'The Library: infinite shelves, each book a person\'s entire name-history',
        'Finding their own names: the books are aware, they want to be reclaimed',
        'The demon confronts them: it knows their true names and uses them as weapons',
        'The final gambit: speaking your own true name reclaims it — but briefly gives the demon power',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The First Nameless',
      role: 'victim / guide',
      personality: 'The first person to lose their name. Has been nameless so long she\'s developed workarounds. Can\'t be targeted by name-magic — which makes her immune to the demon.',
      secret: 'She was the demon\'s first experiment. She has been working against it for years, invisible because nobody can remember her.',
    },
    {
      name: 'The True Name Demon (Unspoken)',
      role: 'antagonist',
      personality: 'A fiend that exists in the space between syllables. Speaking its name gives it power. Not speaking its name gives it anonymity. Every interaction is a trap.',
    },
    {
      name: 'Scholar Vex (agent)',
      role: 'collector / tragic pawn',
      personality: 'A mortal scholar who was tricked into collecting names for the demon, thinking it was academic research. Now the demon has HIS name and he can\'t stop.',
    },
  ],
  keyLocations: [
    { name: 'The Blank Towns', description: 'Towns where multiple residents have lost their names. Signs are illegible. Census records are blank. People exist but can\'t be acknowledged.', significance: 'The investigation environment.' },
    { name: 'The Library of Names', description: 'A pocket dimension where every stolen name is a book on a shelf. The demon sits at the center, reading.', significance: 'The final dungeon.' },
    { name: 'The Unnamed Place', description: 'A location whose name was the first the demon stole. It still exists — you just can\'t say where it is.', significance: 'The gateway to the demon\'s domain.' },
  ],
  dataSystems: ['magicalDisease', 'mindControl', 'darkBargain', 'detectiveCase', 'hauntedLocation', 'pocketDimension', 'magicalAnomaly', 'npcBackstoryGen', 'combatNarration'],
};
