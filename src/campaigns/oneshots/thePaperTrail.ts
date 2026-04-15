import type { OneShotCampaign } from '../types';

export const thePaperTrail: OneShotCampaign = {
  id: 'oneshot-paper-trail',
  type: 'oneshot',
  title: 'The Paper Trail',
  tagline: 'Seven floors of filing cabinets. Millions of documents. A sentient filing system that hides embarrassing paperwork. Finding the file IS the heist.',
  tone: 'heist',
  themes: ['heist', 'comedy', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The Hall of Records contains every document the government has ever produced. Millions of files in a system so complex that even the clerks cannot find things. The party needs a specific set of land deeds that prove a noble family\'s fraudulent claim. The deeds are somewhere in the building. Nobody knows exactly where. The filing system is the real security.',
  hook: 'The lawyer stares at a wall of filing cabinets: "The deeds exist. They are in this building. Somewhere. The filing system uses a proprietary arcane index that takes three years to learn. We do not have three years. We have one night. Break in, find the documents, and bring them to court by morning."',
  twist: 'The filing system is not just complex - it is sentient. The arcane index is a low-level intelligence that organizes documents according to its own logic. It hides embarrassing documents deeper. It protects certain files. And it can be negotiated with. The filing system is the dungeon AND the NPC.',
  climax: 'Deep in the archives, the party has found the sentient index\'s core - a crystal embedded in the central filing column. The index knows where the deeds are but considers them "protected" at the request of the noble family. The party must convince a semi-sentient filing system to betray its filing instructions. Meanwhile, the night guard is making rounds.',
  scenes: [
    {
      title: 'Scene 1: The Hall',
      summary: 'Breaking into the Hall of Records and confronting the sheer scale of the filing system.',
      challenge: 'exploration',
      keyEvents: [
        'The building: seven floors of floor-to-ceiling filing cabinets, each drawer labeled in arcane shorthand',
        'The system: no alphabetical order, no numerical sequence - the arcane index follows its own logic',
        'Initial search: randomly opening drawers yields birth certificates from 300 years ago next to last week\'s tax receipts',
        'The realization: this is not a filing system - it is a maze, and it was designed to be unsolvable',
      ],
    },
    {
      title: 'Scene 2: The Pattern',
      summary: 'Understanding the filing system\'s logic. It is not random - it is alien but consistent.',
      challenge: 'puzzle',
      keyEvents: [
        'Pattern recognition: files are organized by emotional resonance, not content',
        'Happy documents near windows, shameful documents in dark corners, dangerous ones in locked drawers',
        'The central column: a crystal pulses with each drawer opened - it is aware of the party',
        'Communication: the index can communicate through file labels - rearranging letters to form words',
      ],
    },
    {
      title: 'Scene 3: The Negotiation',
      summary: 'Talking to a filing system. Convincing it to reveal protected documents. The guard is coming.',
      challenge: 'social',
      keyEvents: [
        'The index speaks: "THESE FILES ARE PROTECTED. STATE YOUR AUTHORIZATION."',
        'The argument: the deeds are evidence of fraud - the index was told they were "sensitive, not criminal"',
        'The index\'s dilemma: it was created to organize truth, not hide lies - the fraud contradicts its purpose',
        'The reveal: the index opens a hidden drawer and the deeds are inside - but the guard is at the door',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Advocate Lira', role: 'quest giver', personality: 'Stacks paper compulsively while she talks. Has the court date memorized to the minute. Speaks in legal citations when stressed, which is always. "Section 9, subsection B, precedent of Hale v. Crown - never mind. Just find the documents. I will handle the law part."' },
    { name: 'The Arcane Index', role: 'obstacle / NPC', personality: 'Communicates by rearranging file labels to spell words. Hums when content. Slams drawers when annoyed. Files organized by emotion, not alphabet - joyful documents near windows, shameful ones in dark corners. Takes immense pride in its system. Being told its system "does not make sense" is a personal insult.' },
    { name: 'Night Guard Henrick', role: 'obstacle', personality: 'Whistles the same tune every round. His lantern light precedes him by ten seconds. Moves slowly, checks doors methodically, and has been doing this route for twenty years. Not dangerous. Very predictable. Knows every creak in the building, which means he notices new ones.' },
  ],
  keyLocations: [
    { name: 'The Hall of Records', description: 'Seven floors of filing cabinets stretching from floor to ceiling. Millions of documents in an arcane filing system that defies mortal logic.', significance: 'The entire heist takes place here.' },
    { name: 'The Central Column', description: 'A crystal column running through the center of the building. The heart of the arcane index. Pulses with faint light when documents are accessed.', significance: 'Where the sentient filing system can be communicated with.' },
    { name: 'The Protected Drawer', description: 'A hidden drawer that does not appear on any index. Contains the land deeds and other documents the index was told to hide.', significance: 'The target.' },
  ],
  dataSystems: ['heistPlanner', 'socialEncounter', 'trapDisarm'],
};
