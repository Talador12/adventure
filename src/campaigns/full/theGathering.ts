import type { FullCampaign } from '../types';

export const theGathering: FullCampaign = {
  id: 'full-the-gathering',
  type: 'full',
  title: 'The Gathering',
  tagline: 'Every hundred years, every species renegotiates the treaty that prevents total war. It is time.',
  tone: 'social',
  themes: ['social', 'political', 'intrigue'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The Great Compact is a century-old treaty between every sentient species on the continent: humans, elves, dwarves, orcs, gnomes, halflings, dragonborn, and tieflings. Every hundred years, representatives meet at the Neutral Grounds to renegotiate terms. The party are diplomats, advisors, or delegates. Elves want expanded forest protections. Dwarves want mining rights under elven forests. Humans want expansion into contested territory. Orcs want formal recognition as a sovereign nation. Everyone has legitimate grievances. Nobody is wrong. Everyone is angry.',
  hook: 'The party arrives at the Neutral Grounds - a sprawling diplomatic complex on an island claimed by no nation. Tensions are already high: the dwarven delegation set up their forge too close to the elven garden, the orc delegation was seated at a children\'s table (a "clerical error"), and the human delegation brought twice as many guards as allowed. Negotiations begin tomorrow. Tonight, someone must prevent the pre-conference dinner from becoming a brawl.',
  twist:
    'Two hundred years ago, a previous Gathering was rigged. An entire species - the Verdani, forest-dwelling shapeshifters - was written out of the Compact through forged votes and erased records. Their lands were divided among the other nations. The Verdani have survived in hiding for two centuries. They are here now, and they want their seat back. Every current border dispute traces back to the theft of Verdani territory.',
  climax:
    'The final vote. The Verdani have presented their case. Every delegation must decide: honor the old Compact and deny the Verdani, or rewrite the treaty to include them - which means every nation gives up land they have held for two centuries. The party has spent weeks building relationships, trading favors, and uncovering the truth. Their alliances determine whether the Gathering ends in justice, compromise, or war.',
  acts: [
    {
      title: 'Act 1: The Delegations',
      summary: 'Arrival, introductions, and the first round of negotiations. Every delegation has demands, secrets, and red lines.',
      keyEvents: [
        'The pre-conference dinner: eight species, eight grudges, one dining hall',
        'Opening statements: each delegation presents demands. The math does not add up - everyone wants more than exists.',
        'Backroom deals begin: the dwarves offer the orcs military support in exchange for mineral rights',
        'Strange signs: someone is watching the proceedings from outside the diplomatic complex',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Negotiations',
      summary: 'Deep diplomacy. Alliances form and break. Old treaties are examined and old crimes are discovered.',
      keyEvents: [
        'The archive discovery: records of the 200-year-old Gathering show irregularities - votes that do not add up',
        'The Verdani reveal themselves: a delegation of shapeshifters who have been hiding among the other groups',
        'Every delegation reacts differently: guilt, denial, anger, opportunism',
        'A coalition must be built: the party needs at least five of eight delegations to vote for Verdani inclusion',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Vote',
      summary: 'The final days. Last-minute deals, betrayals, and the vote that reshapes the continent.',
      keyEvents: [
        'Holdout delegations demand concessions: each "yes" vote comes with a price',
        'A sabotage attempt: someone would rather have war than share power with the Verdani',
        'The final speeches: the party can address the full Gathering and make their case',
        'The vote: eight delegations, one question, and the future of every nation on the continent',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Speaker Thal',
      role: 'Gathering moderator / neutral arbiter',
      personality: 'An ancient firbolg who has moderated the last three Gatherings. Unflappable, fair, and deeply tired. "I have seen seven wars begin at this table. I would prefer not to see an eighth."',
      secret: 'He knew about the Verdani erasure. He was too young and too afraid to stop it. He has carried the guilt for two centuries.',
    },
    {
      name: 'Warchief Durga',
      role: 'orc delegation leader',
      personality: 'A brilliant strategist who fights with words at the Gathering and swords everywhere else. The orcs have been denied recognition for centuries. She will not leave without it. "We have bled for this continent. We have earned our name on the Compact."',
    },
    {
      name: 'Sylvaine of the Verdani',
      role: 'Verdani delegation leader / the forgotten people',
      personality: 'A shapeshifter who has spent her life pretending to be other species. Calm, precise, and carrying two centuries of grief. "We are not ghosts. We are not myths. We are the people you erased."',
    },
    {
      name: 'Ambassador Aldric',
      role: 'human delegation leader',
      personality: 'A skilled politician who wants human expansion but is not unreasonable. He can be convinced if the cost is right. "Humans are practical. Show me how Verdani inclusion benefits my people and you have my vote."',
    },
  ],
  keyLocations: [
    { name: 'The Neutral Grounds', description: 'An island diplomatic complex where no nation holds sovereignty. Grand halls, private meeting rooms, and gardens designed for whispered conversations.', significance: 'Where the entire campaign takes place.' },
    { name: 'The Archive of Compacts', description: 'A sealed vault containing every treaty signed at every Gathering. Two centuries of diplomatic history - and two centuries of buried crimes.', significance: 'Where the evidence of the Verdani erasure is found.' },
    { name: 'The Grand Chamber', description: 'A circular hall with eight delegation seats arranged as equals. A ninth seat sits empty, covered in dust. Nobody remembers who it was for.', significance: 'Where the final vote takes place.' },
  ],
  dataSystems: ['socialEncounter', 'npcRelationshipWeb', 'diplomaticNegotiation', 'courtIntrigue', 'factionWar', 'rumorMill', 'backstoryComplication', 'warRoomBriefing'],
};
