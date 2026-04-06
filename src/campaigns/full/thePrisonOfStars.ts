import type { FullCampaign } from '../types';

export const thePrisonOfStars: FullCampaign = {
  id: 'full-prison-of-stars',
  type: 'full',
  title: 'The Prison of Stars',
  tagline: 'The most secure prison in existence holds one inmate. She says she\'s innocent. The prison agrees.',
  tone: 'mystery',
  themes: ['planar', 'mystery', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'Celestia — the prison dimension built by the gods to hold the most dangerous being in existence. One inmate. A thousand guardians. The party is hired as independent investigators because the inmate has filed an appeal, and divine law requires mortal review. The catch: the inmate might actually be innocent, the prison itself is showing signs of sentience, and someone on the outside is trying to make sure the review fails.',
  hook: 'A celestial courier delivers a subpoena: "By order of the Divine Court of Appeals, you are appointed as Mortal Reviewers for Case #1: The Imprisonment of Aethon. Report to the Prison of Stars within 48 hours. Bring comfortable shoes. The corridors are infinite."',
  twist:
    'Aethon — the inmate — was framed by one of the gods who built the prison. She was a mortal hero who discovered that this god had committed a divine crime (killing another deity and absorbing their power). The god imprisoned her in Celestia and erased the evidence. The prison knows — it has been keeping the evidence safe for ten thousand years, waiting for mortal reviewers who could see it.',
  climax:
    'The party presents evidence of the divine frame-up. The guilty god sends agents to destroy the prison rather than be exposed. The party must defend the Prison of Stars, protect Aethon, and ensure the evidence reaches the Divine Court — while fighting inside a sentient prison that is helping them by rearranging its own corridors.',
  acts: [
    {
      title: 'Act 1: The Review',
      summary: 'Arriving at the Prison of Stars, meeting the guardians, and beginning the investigation. The prison is vast, bizarre, and built by gods who value security over comfort.',
      keyEvents: [
        'Arrival via celestial gate — the prison exists between stars',
        'Meeting Aethon: calm, articulate, and has been waiting ten thousand years for this moment',
        'The guardians: celestial constructs that follow protocol rigidly',
        'First evidence review: the original charges are suspiciously vague',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Evidence',
      summary: 'Deep investigation. The prison itself begins to help — corridors lead to hidden evidence rooms, walls display ancient records, and a guardian breaks protocol to speak privately.',
      keyEvents: [
        'The prison shifts: a new corridor appears overnight, leading to a sealed archive',
        'The archive: records that contradict the official story',
        'A guardian breaks protocol: "I have waited ten thousand years for someone to ask the right question"',
        'External interference: someone is trying to shut down the review from outside',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Defense',
      summary: 'The guilty god acts. Agents assault the prison. The party must defend it, protect Aethon, and transmit the evidence.',
      keyEvents: [
        'Divine agents breach the outer walls — angels twisted by a god\'s corruption',
        'The prison fights back: rearranging to protect the party and Aethon',
        'The evidence must reach the Divine Court: the party must transport it through a celestial battlefield',
        'Aethon is freed — ten thousand years, and she steps into starlight for the first time',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Aethon',
      role: 'inmate / wrongly imprisoned hero',
      personality: 'A mortal hero imprisoned for ten thousand years. Has had time to think about everything. Calm, wise, and deeply angry in a controlled way. "I forgave them after the first thousand years. Then I got angry again for the next nine thousand."',
      secret: 'She has been slowly communicating with the prison itself. They are allies.',
    },
    {
      name: 'Warden-Construct Alpha',
      role: 'prison guardian / rule-bound ally',
      personality: 'The head guardian. Follows divine protocol absolutely — until it discovers the protocol was written by a criminal. Then it follows the INTENT of the law, not the letter. "Protocol is the voice of justice. If justice is corrupted, protocol must be... reinterpreted."',
    },
    {
      name: 'The Guilty God (Nexar)',
      role: 'true antagonist / absent',
      personality: 'A god of justice who committed the ultimate injustice. Never appears directly — acts through corrupted agents and bureaucratic interference.',
    },
  ],
  keyLocations: [
    { name: 'The Prison of Stars', description: 'A dimension-sized prison floating between stars. Infinite corridors, celestial architecture, and exactly one cell.', significance: 'The primary setting.' },
    { name: 'The Sealed Archive', description: 'A room the prison built itself to hide the real evidence. Only appears when mortal reviewers are present.', significance: 'Where the truth is found.' },
    { name: 'The Cell', description: 'A comfortable room (the gods aren\'t cruel about incarceration) where Aethon has spent ten millennia. Covered in philosophical writings.', significance: 'Where the party meets the inmate and learns her story.' },
  ],
  dataSystems: ['detectiveCase', 'pocketDimension', 'magicalCourtroom', 'puzzleLock', 'encounterWaves', 'deityPantheon', 'darkBargain', 'ancientProphecy', 'clockworkDungeon'],
};
