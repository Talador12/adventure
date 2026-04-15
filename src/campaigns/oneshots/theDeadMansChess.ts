import type { OneShotCampaign } from '../types';

export const theDeadMansChess: OneShotCampaign = {
  id: 'oneshot-dead-mans-chess',
  type: 'oneshot',
  title: 'The Dead Man\'s Chess',
  tagline: 'A murdered grandmaster left his final game unfinished. The remaining moves spell the killer\'s name.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Chess grandmaster Aldric Vane was found dead at his board, mid-game. The position is unusual, non-standard. His last student realizes the remaining moves, when played to completion, use algebraic notation that spells a name. The killer\'s name, written in the language of chess.',
  hook: 'The student stares at the board with tears in her eyes. "He knew. He knew someone was going to kill him. Look at the position. It is not a real game. The next moves... Qe4, Nh5, Rg3... They spell something. He encoded the killer\'s name in his final game."',
  twist:
    'The name spelled is not the killer but an anagram for the location where the evidence is hidden. Vane knew simply naming his killer would not be enough (the killer is powerful and could suppress a mere accusation). So he encoded the location of a cache of evidence: letters, financial records, and a confession he tricked the killer into signing.',
  climax:
    'The party decodes the chess position, finds the evidence cache, and must get it to the authorities before the killer (a city magistrate) realizes what Vane left behind and destroys it.',
  scenes: [
    {
      title: 'Scene 1: The Board',
      summary: 'Examining the crime scene and the chess position. The party must understand the encoded message.',
      challenge: 'puzzle',
      keyEvents: [
        'The body: Vane at his desk, poisoned, hand on a piece. The board is mid-game.',
        'The student explains: this is not a real game. The position is a message.',
        'The remaining moves: Qe4, Nh5, Rg3, Bb2, Kc1. In algebraic shorthand, the pieces spell Q-N-R-B-K. The student writes the full notation. "These letters do not spell a name. They spell... something else."',
        'Rearranged: the letters form a location. Vane was too smart to just point a finger. He built a treasure map.',
      ],
    },
    {
      title: 'Scene 2: The Decode',
      summary: 'Cracking the anagram and following it to a physical location. Vane planned everything.',
      challenge: 'exploration',
      keyEvents: [
        'The anagram resolves to a location: "UNDER THE STONE QUEEN" - a chess statue in the park.',
        'The statue: a hidden compartment in the base. A leather satchel, sealed.',
        'Inside: letters between Vane and the magistrate. Financial fraud. Threats. A forced signature.',
        'The magistrate is named. He killed Vane to suppress this evidence.',
      ],
    },
    {
      title: 'Scene 3: The Race',
      summary: 'Getting the evidence to the authorities before the magistrate destroys it. He has guards and influence.',
      challenge: 'combat',
      keyEvents: [
        'The magistrate has spies watching the party. He knows they found something.',
        'His guards intercept. The party must protect the satchel.',
        'A chase through the city. The magistrate tries to buy, threaten, and finally seize.',
        'The evidence reaches the lord marshal. The magistrate is arrested. Vane\'s final game wins.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mira Ashvane',
      role: 'student / key to the code',
      personality: 'Eyes red from crying. Fingers trace the board without moving pieces. "He taught me everything. Including this." Can read chess notation the way most people read sentences. Her grief is quiet and precise, like her play.',
    },
    {
      name: 'Magistrate Reeves',
      role: 'killer / corrupt official',
      personality: 'Polished, powerful, and panicking beneath the surface. He killed Vane thinking the evidence died with him. The chess board changes everything.',
      secret: 'He has been embezzling from the city for a decade. Vane found out. The evidence proves it all.',
    },
  ],
  keyLocations: [
    {
      name: 'Vane\'s Study',
      description: 'A cluttered room full of chess boards, books, and one final game frozen in time.',
      significance: 'The crime scene and the first puzzle.',
    },
    {
      name: 'The Stone Queen Statue',
      description: 'A chess piece monument in the city park. A marble queen with a hidden compartment in her base.',
      significance: 'Where the evidence is cached. Vane\'s dead drop.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
