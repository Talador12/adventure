import type { FullCampaign } from '../types';

export const theShatteredCrown: FullCampaign = {
  id: 'full-shattered-crown',
  type: 'full',
  title: 'The Shattered Crown',
  tagline: 'A kingdom without a ruler is a kingdom up for grabs.',
  tone: 'political',
  themes: ['intrigue', 'classic_fantasy', 'war'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 12 },
  estimatedSessions: 20,
  settingSummary:
    'The kingdom of Valdris has lost its monarch to a suspicious hunting accident. Five noble houses vie for the empty throne, and civil war brews in every tavern. The players are caught between factions as they discover the king was murdered by an alliance that now threatens to tear the realm apart.',
  hook: 'The party is hired to escort a minor noble to the capital for the succession council. En route, they survive an assassination attempt clearly targeting their employer — and find a coded letter implicating one of the five great houses.',
  twist:
    'The king is not dead. He faked his death to expose a conspiracy within his own court, but lost control of the situation. He is now a prisoner in his own castle, held by the very advisor he trusted to manage the deception.',
  climax:
    'The party must infiltrate the royal palace during the coronation ceremony, expose the conspiracy before the false king is crowned, and decide who truly deserves to rule — or whether the monarchy should end entirely.',
  acts: [
    {
      title: 'Act 1: The Road to Valdris',
      summary:
        'The party escorts Lord Halen to the capital, survives two ambushes, and arrives to find a city on the edge of revolt. They must choose which house to ally with — or try to remain neutral.',
      keyEvents: [
        'Ambush on the King\'s Road — bandits with suspiciously good equipment',
        'Coded letter discovery — references "the Fifth Agreement"',
        'Arrival at the capital — each noble house sends invitations',
        'The succession council opens — 5 houses present their claims',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Court of Knives',
      summary:
        'Political intrigue escalates as the party investigates the king\'s death, navigates court politics, and uncovers that multiple houses have dirty secrets. An NPC ally is assassinated.',
      keyEvents: [
        'Court intrigue — each house has leverage over the others',
        'Discovery of the king\'s secret journal in the royal library',
        'Assassination of the party\'s primary contact',
        'A border skirmish erupts — two houses send armies',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Truth Below',
      summary:
        'The party discovers the king is alive and imprisoned beneath the palace. They must rally enough support to stage a rescue while managing a city descending into open warfare.',
      keyEvents: [
        'Secret passage into the dungeons beneath the throne room',
        'The king reveals the full conspiracy — and his own complicity',
        'Faction war erupts in the streets — the party must pick a side or unite them',
        'Coronation ceremony — the final confrontation',
      ],
      estimatedSessions: 8,
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Halen Ashford',
      role: 'quest giver / ally',
      personality:
        'Nervous, well-meaning minor noble who talks too much when anxious. Genuinely wants what\'s best for the realm.',
      secret: 'He is the king\'s illegitimate son — a claim that could change everything.',
    },
    {
      name: 'Duchess Verana Thornwall',
      role: 'power broker',
      personality:
        'Cold, calculating, always three steps ahead. Never raises her voice because she never needs to.',
      secret: 'She orchestrated the king\'s "death" at his own request, then seized the opportunity for herself.',
    },
    {
      name: 'Commander Gareth Ironhand',
      role: 'military rival',
      personality:
        'Blunt, honorable soldier who believes strength is the only legitimate claim to power. Respects the party if they fight well.',
    },
    {
      name: 'Sable',
      role: 'spy / information broker',
      personality:
        'Genderfluid changeling who sells secrets to all five houses simultaneously. Charming, amoral, but has a soft spot for underdogs.',
      secret: 'They were the king\'s personal spymaster and are the only one who knows he\'s alive.',
    },
  ],
  keyLocations: [
    {
      name: 'The Gilded Throne',
      description:
        'The royal palace at the heart of Valdris — a fortress disguised as a work of art, with secret passages in every wall.',
      significance: 'Where the coronation takes place and the king is imprisoned.',
    },
    {
      name: 'The Five Pillars',
      description:
        'A neutral meeting hall where the noble houses convene. Each house has a marble pillar inscribed with their lineage.',
      significance: 'Political negotiations and public declarations happen here.',
    },
    {
      name: 'The Warrens',
      description:
        'The sprawling underground market beneath the capital, run by Sable\'s network.',
      significance: 'Where information is traded and alliances are made away from noble eyes.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'politicalEvent',
    'factionWar',
    'npcRelationshipWeb',
    'diplomaticNegotiation',
    'nobleScandalGen',
    'factionReputation',
    'npcSchedule',
    'assassinationPlot',
  ],
};
