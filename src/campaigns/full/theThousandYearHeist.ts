import type { FullCampaign } from '../types';

export const theThousandYearHeist: FullCampaign = {
  id: 'full-thousand-year-heist',
  type: 'full',
  title: 'The Thousand-Year Heist',
  tagline: 'The vault has never been breached. The plan spans a millennium. You\'re the last crew.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 16,
  settingSummary:
    'The Iron Vault of the Merchant Princes has never been robbed in its 1,000-year history. Every century, someone tries. Every century, they fail. But each crew leaves behind a piece of the puzzle — a mapped corridor, a disabled trap, a bribed guard — accumulating over 10 generations of thieves. The party is the 10th crew. Nine previous crews have done 90% of the work. The party just needs to finish the job.',
  hook: 'A dying old woman gives the party a lockbox containing ten leather journals — one from each century of heist attempts. Each journal maps a piece of the vault, lists what went wrong, and passes the torch. "I was the 9th crew. We got closer than anyone. I\'m too old to finish it. But I mapped the last corridor. You just need to walk it."',
  twist:
    'The vault\'s guardian — a bound djinn — has been rooting for the thieves all along. It was imprisoned by the Merchant Princes a thousand years ago and bound to protect their wealth. It can\'t let anyone in. But it CAN leave subtle clues for those clever enough to read them. Every "lucky break" in the previous journals was the djinn helping. It wants to be freed, and the party is its last chance.',
  climax:
    'The heist itself — a multi-layered infiltration using all ten centuries of accumulated knowledge. The final room contains the djinn\'s binding circle. The "treasure" everyone has been chasing is the djinn itself. Free the djinn and the vault\'s wealth scatters. Take the gold and the djinn stays imprisoned forever. Or find a way to do both.',
  acts: [
    {
      title: 'Act 1: The Journals',
      summary:
        'Studying the previous nine crews\' work, recruiting specialists, and casing the vault. Each journal reveals a piece of the puzzle and a tragic story of failure.',
      keyEvents: [
        'The ten journals — 1,000 years of heist history, each crew building on the last',
        'Recruiting: a lockpick, a distraction, a muscle, a magic expert',
        'Casing the vault: the Merchant Princes\' security has evolved each century too',
        'Journal 7 mentions "the voice in the walls that helped us" — the djinn',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Setup',
      summary:
        'Executing the nine previous crews\' preparations: activating dormant assets, bribing legacy contacts, and infiltrating the Merchant Princes\' inner circle.',
      keyEvents: [
        'Activating a tunnel dug 300 years ago — still intact, barely',
        'Contact with a guard family that\'s been passing down the bribe for 5 generations',
        'Infiltrating the Princes\' gala to acquire the vault rotation schedule',
        'The djinn makes direct contact: "I\'ve been waiting for someone who could actually finish this"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Job',
      summary:
        'Heist night. Everything the ten crews built over a millennium is used in one night. And of course, everything goes wrong in entertaining ways.',
      keyEvents: [
        'Entry through the 300-year-old tunnel — it collapses behind them',
        'The trap gauntlet: disabled by Crew 4 but re-armed by the Princes',
        'The inner vault: the djinn\'s binding circle, the treasure, and the choice',
        'Escape: the Merchant Princes know — chase through the city',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Old Mariel (9th Crew)',
      role: 'dying mentor',
      personality:
        'A 90-year-old former thief who spent her life on this heist. Sharp mind, failing body. "I mapped every inch. I just ran out of years."',
    },
    {
      name: 'The Djinn (Zephyros)',
      role: 'imprisoned ally',
      personality:
        'A djinn bound for a millennium. Communicates through vault mechanisms — doors opening at convenient times, traps misfiring. When it finally speaks: "Do you know what a thousand years of boredom does? You start rooting for the thieves."',
      secret: 'It can\'t directly help — the binding prevents it. But it can "fail" at its job in subtle ways.',
    },
    {
      name: 'Prince Aldric Goleli',
      role: 'primary antagonist',
      personality:
        'Current head of the Merchant Princes. Knows about the multi-generational heist attempts. Has been studying the journals the thieves left behind. He\'s prepared.',
    },
    {
      name: 'Pip (legacy contact)',
      role: 'ally / comic relief',
      personality:
        'A guard whose great-great-great-grandfather took a bribe in Century 5. The family has passed down the obligation. Pip has no idea why he\'s supposed to help thieves. "Grandad said to open the side door on the third Tuesday. I don\'t question family tradition."',
    },
  ],
  keyLocations: [
    {
      name: 'The Iron Vault',
      description: 'A legendary bank built into a mountain, layered with 1,000 years of evolving security.',
      significance: 'The heist target.',
    },
    {
      name: 'The Tunnel (Crew 3)',
      description: 'A 300-year-old tunnel dug by the 3rd crew. Partially collapsed but still navigable.',
      significance: 'The entry point for the heist.',
    },
    {
      name: 'The Inner Sanctum',
      description: 'The deepest vault room — gold piled to the ceiling surrounding a binding circle. A djinn paces inside.',
      significance: 'Where the final choice is made.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapDisarm',
    'clockworkDungeon',
    'puzzleLock',
    'socialEncounter',
    'merchantHaggling',
    'secretSociety',
    'encounterWaves',
    'npcRelationshipWeb',
  ],
};
