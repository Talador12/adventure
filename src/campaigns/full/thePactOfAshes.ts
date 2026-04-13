import type { FullCampaign } from '../types';

export const thePactOfAshes: FullCampaign = {
  id: 'full-pact-of-ashes',
  type: 'full',
  title: 'The Pact of Ashes',
  tagline: 'Every citizen signed a contract with the dead. No one read the fine print.',
  tone: 'horror',
  themes: ['dark_fantasy', 'mystery', 'political'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Ashenholm survived a plague by making a deal with the Lord of the Dead: every citizen lives, but upon death, their soul serves him for a hundred years. A century has passed. The dead are coming to collect, and the city\'s founders—who should be first in line—are mysteriously immune.',
  hook: 'The party arrives in Ashenholm for a routine job and finds the city in panic. The gates of the necropolis have opened, and the dead are walking out with ledgers, looking for specific people by name.',
  twist:
    'The original founders discovered a loophole: they transferred their debt to descendants through a blood ritual. Every person born in Ashenholm inherits their ancestor\'s contract. The founders have been extending their lives by sacrificing their own descendants.',
  climax:
    'The party must confront the Lord of the Dead, who is actually quite reasonable, and negotiate a new pact—either destroying the founders, voiding all contracts, or finding a third option that satisfies both the living and the dead.',
  acts: [
    {
      title: 'Act 1: The Debt Comes Due',
  "summary":
        'The party navigates a city where the dead are peacefully but inexorably collecting souls. They investigate why certain people are being taken while others—specifically the wealthy founders\' families—are ignored.',
      keyEvents: [
        'Arrival during the first day of collection—seeing the dead politely escort citizens to the necropolis',
        'Meeting the Mayor, who is clearly hiding something about his immunity',
        'Investigating the original contract in the city archives',
        'Discovery of the blood ritual used to transfer debts',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Founders\' Secret',
      summary:
        'The party uncovers the founders\' conspiracy: centuries of sacrificing descendants to extend their own lives. They must gather evidence while avoiding the founders\' agents and the increasingly impatient dead.',
      keyEvents: [
        'Infiltrating a Founder\'s estate and discovering their unnaturally long lives',
        'Meeting a ghost who remembers being sacrificed by their ancestor',
        'The Lord of the Dead sends an emissary—he is willing to renegotiate if the party can prove fraud',
        'The founders declare martial law to prevent exposure',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The New Pact',
      summary:
        'The party confronts the founders and the Lord of the Dead simultaneously. They must negotiate a solution that addresses the injustice without dooming the entire city.',
      keyEvents: [
        'Assault on the Founders\' Council chambers',
        'Summoning the Lord of the Dead for formal negotiations',
        'Presentation of evidence and the fraud accusation',
        'Final terms: void all contracts, punish founders, or find alternative payment',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Ashford',
      role: 'antagonist',
      personality:
        'A Founder who has lived 150 years through descendant sacrifice. Charming, sophisticated, genuinely believes the ends justify the means.',
      secret: 'He has sacrificed three of his own children to stay alive.',
    },
    {
      name: 'The Lord of the Dead',
      role: 'neutral power',
      personality:
        'Not evil—just a cosmic accountant. Honorable, keeps his word, frustrated by the founders\' fraud. Willing to make a fair deal.',
    },
    {
      name: 'Elena Vane',
      role: 'ally / victim',
      personality:
        'Commoner whose grandmother was taken by the dead. Angry, determined, has been investigating the founders for years.',
    },
    {
      name: 'The Adjudicator',
      role: 'undead lawyer',
      personality:
        'Sent by the Lord of the Dead to audit the contracts. Precise, literal-minded, surprisingly helpful to the party\'s investigation.',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenholm City',
      description:
        'A prosperous city with an undercurrent of fear. Beautiful architecture masking a population that knows they are living on borrowed time.',
      significance: 'Main setting and site of political intrigue.',
    },
    {
      name: 'The Necropolis',
      description:
        'The city of the dead, now open to the living. Elegant, orderly, filled with souls serving out their contracts in various capacities.',
      significance: 'Where the party meets the Lord of the Dead and learns about the afterlife economy.',
    },
    {
      name: 'The Founders\' Vault',
      description:
        'Secret chambers beneath the city council building where the blood rituals are performed.',
      significance: 'Site of the final confrontation with the founders.',
    },
  ],
  dataSystems: ['magicalContract', 'secretSociety', 'hauntedLocation', 'nobleScandalGen'],
};
