import type { FullCampaign } from '../types';

export const theStrikeBeneath: FullCampaign = {
  id: 'full-strike-beneath',
  type: 'full',
  title: 'The Strike Beneath',
  tagline: 'You were hired to break a strike. Then you saw why they stopped working.',
  tone: 'political',
  themes: ['political', 'underdark', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 14,
  settingSummary:
    'The Ironvein Mine is the largest mithral deposit on the continent. Owned by Lord Garran Blackwell, operated by 800 dwarven miners, and responsible for 40% of the region\'s mithral supply. Three days ago, the miners walked out. Production has stopped. Blackwell is hemorrhaging gold and has hired the party to "resolve the labor dispute." He frames it as agitators, troublemakers, unreasonable demands. The reality underground is different: miners dying of stonedust lung at forty, children running ore carts in shafts too narrow for adults, safety equipment that exists on paper but not in practice, and a foreman who falsifies inspection reports while miners cough blood.',
  hook: 'Lord Blackwell meets the party in a manor built from mithral profits. "My miners have been misled by agitators. They want more money - they always want more money. I need the mine operational within the week or I default on contracts that will ruin this region\'s economy. Go down there, talk to them, offer reasonable terms, and get them back to work. If talking fails, I am authorized to offer you a substantial bonus for more direct methods."',
  twist:
    'Blackwell is not the top of the chain. He is in catastrophic debt to a dragon named Pyraxis who lives beneath the lowest mine shaft. Pyraxis does not care about labor, safety, or economics. Pyraxis cares about mithral delivered on schedule. Blackwell\'s cruelty toward the miners is not ideology - it is desperation. If he slows production for safety, the dragon kills him. If the miners strike, the dragon kills him. The real fight is not labor versus management. It is everyone - miners, Blackwell, the party - versus a creature that owns their labor and treats human lives as operating costs.',
  climax:
    'The party must unite miners and management against Pyraxis. This means Blackwell must admit what he has done and why. The miners must trust the man who has been killing them. And together they must confront a dragon in the deep shafts of the mine they all depend on. The final battle is fought in mithral tunnels where a single cave-in could bury everyone. After Pyraxis falls, the harder question: what does Ironvein look like now? The party brokers the new agreement - one where the miners have a seat at the table.',
  acts: [
    {
      title: 'Act 1: The Picket Line',
      summary:
        'The party arrives expecting simple labor unrest. They find dying miners, child workers, falsified safety records, and a community that has been ground down so far that striking feels like the only way to survive.',
      keyEvents: [
        'Blackwell\'s briefing: the strike framed as greed and agitation',
        'Entering the mining camp: tents, coughing, children with dust-grey skin',
        'Meeting the strike leaders: Forewoman Breta and her lieutenants, tough and tired',
        'Touring the mine: unsafe shafts, child-sized tunnels, the stonedust that kills',
        'The party\'s choice crystallizes: do the job or stand with the workers',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Debt',
      summary:
        'The party digs deeper. Blackwell is cracking under pressure. His desperation does not make sense until the party discovers what lives below the lowest shaft. The real owner of Ironvein is not a lord. It is a dragon.',
      keyEvents: [
        'Blackwell\'s ledgers: massive payments to an unnamed creditor, deeper than any banker',
        'A tremor from the deep shafts: something large moves below where miners are allowed',
        'Confronting Blackwell: he breaks. He is not the villain. He is the villain\'s employee.',
        'First contact with Pyraxis: a voice from the deep that treats human lives as a production metric',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Deep Shaft',
      summary:
        'Miners and management unite against the real enemy. The party leads a combined force into the deepest tunnels to confront a dragon in its own domain. Then the harder work: building something better from the wreckage.',
      keyEvents: [
        'The alliance: Blackwell confesses to the miners, Breta agrees to fight together',
        'Descending to Pyraxis\'s lair: mithral-veined caverns, heat, the dragon\'s domain',
        'The battle: fighting a dragon in mine tunnels is a nightmare of close quarters and collapse risk',
        'The reckoning: with Pyraxis gone, the party brokers new terms - worker safety, fair wages, shared governance',
        'Epilogue: the first joint council meeting of miners and management. Awkward. Necessary. Real.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Forewoman Breta Stonehammer',
      role: 'strike leader / ally',
      personality:
        'A dwarven miner who has worked Ironvein for twenty-five years and buried too many friends. Hard as the rock she cuts. Not interested in speeches or sympathy - interested in her people not dying. "You want to help? Breathe the dust for a year. Then tell me our demands are unreasonable."',
    },
    {
      name: 'Lord Garran Blackwell',
      role: 'conflicted antagonist',
      personality:
        'A man who started as a decent mine owner and was slowly consumed by a debt that cannot be paid. Every terrible decision traces back to Pyraxis. He is not a good person - he made his choices. But he is not the monster the miners think he is.',
      secret: 'He has tried to kill Pyraxis twice. Both times he lost good people. He stopped trying and started complying.',
    },
    {
      name: 'Pyraxis (dragon)',
      role: 'true antagonist',
      personality:
        'An ancient red dragon who discovered that owning the means of production is more efficient than raiding. Speaks in quarterly projections and delivery schedules. Does not hate the miners. Does not think about them at all. They are a line item.',
    },
    {
      name: 'Tam (child miner)',
      role: 'moral weight',
      personality:
        'A twelve-year-old dwarven boy who runs ore carts in the narrow shafts. Thinks it is normal. Coughs when he laughs. Wants to be a miner like his father, who died of stonedust lung at thirty-eight.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ironvein Mine',
      description: 'The largest mithral deposit on the continent. Above: a sprawling camp of worker housing, forges, and smelters. Below: miles of tunnels descending into darkness.',
      significance: 'The entire campaign happens in and around this mine.',
    },
    {
      name: 'The Picket Line',
      description: 'The mine entrance, blockaded with overturned ore carts and campfires. Eight hundred miners and their families, waiting.',
      significance: 'Where the party first sees the human cost.',
    },
    {
      name: 'Pyraxis\'s Lair',
      description: 'The deepest shaft, widened by claws into a cavern of mithral-veined rock. Uncomfortably warm. The walls glitter. A dragon sleeps on a hoard of raw mithral ore, not gold.',
      significance: 'The final confrontation.',
    },
  ],
  dataSystems: [
    'factionReputation',
    'npcRelationshipWeb',
    'socialEncounter',
    'moralDilemma',
    'encounterWaves',
    'massCombat',
    'diplomaticNegotiation',
    'partyMoraleTracker',
  ],
};
