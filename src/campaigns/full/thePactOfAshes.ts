import type { FullCampaign } from '../types';

export const thePactOfAshes: FullCampaign = {
  id: 'full-pact-of-ashes',
  type: 'full',
  title: 'The Pact of Ashes',
  tagline: 'The dead came with ledgers. They were polite. They knew your grandmother\'s name.',
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
   summary:
        'The party navigates a city where the dead are peacefully but inexorably collecting souls. They investigate why certain people are being taken while others—specifically the wealthy founders\' families—are ignored.',
      keyEvents: [
        'Arrival during the first day of collection - the dead walk calmly through the streets with leather-bound ledgers. They knock on doors. They wait. They are polite. That is what makes it unbearable.',
        'Meeting the Mayor, who shakes hands with dry, papery skin and smiles too wide. He is clearly hiding something about his immunity. He steers conversation away from his family tree with practiced ease.',
        'Investigating the original contract in the city archives. The contract is warm to the touch. The ink is red. It smells faintly of copper. The signatures at the bottom are in a handwriting the party recognizes from the Mayor\'s office.',
        'Discovery of the blood ritual used to transfer debts. The diagram is carved into a floor beneath the council building. The grooves in the stone are stained dark. They are not old stains.',
        'Quiet dread: a dead collector pauses outside a child\'s window. Checks the ledger. Moves on. The child was not on the list. This time.',
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
        'A Founder who has lived 150 years through descendant sacrifice. Charming, sophisticated, with hands that look too young for his face. He touches his family ring when he lies, which is often. He pours wine for guests before they ask and steers conversation like a man who has had 150 years to practice the art of not being questioned.',
      secret: 'He has sacrificed three of his own children to stay alive. He keeps portraits of them in a locked room. He visits the room on their birthdays.',
    },
    {
      name: 'The Lord of the Dead',
      role: 'neutral power',
      personality:
        'Not evil - a cosmic accountant with the patience of entropy. He speaks in measured, contractual language. He does not raise his voice. He does not need to. When he is displeased, the temperature drops and the candles burn blue. He is frustrated by the founders\' fraud the way an auditor is frustrated by embezzlement.',
    },
    {
      name: 'Elena Vane',
      role: 'ally / victim',
      personality:
        'Commoner whose grandmother was taken by the dead. She speaks fast and carries a ledger of her own - names, dates, connections, proof. Her hands are ink-stained. She has not slept properly in years. She flinches when the dead walk past but does not look away. Looking away is how the Founders got away with it.',
    },
    {
      name: 'The Adjudicator',
      role: 'undead lawyer',
      personality:
        'Sent by the Lord of the Dead to audit the contracts. A skeleton in formal robes who adjusts spectacles he does not need on a nose he does not have. Precise, literal-minded, and surprisingly helpful. He takes notes with a quill that writes in cold blue fire. He finds the Founders\' fraud personally offensive.',
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
