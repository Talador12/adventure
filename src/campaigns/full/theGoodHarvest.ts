import type { FullCampaign } from '../types';

export const theGoodHarvest: FullCampaign = {
  id: 'full-good-harvest',
  type: 'full',
  title: 'The Good Harvest',
  tagline: 'You inherited a farm. The carrots have feelings about that.',
  tone: 'social',
  themes: ['social', 'wilderness', 'comedy'],
  playerCount: { min: 2, max: 5 },
  levelRange: { start: 1, end: 5 },
  estimatedSessions: 12,
  settingSummary:
    'The village of Roothollow sits at the edge of nowhere, a half-day ride from the nearest town. It is the kind of place where the biggest drama is whose pie won the fair. The party has inherited a ruined farm from a great-uncle none of them remember. The land is overgrown, the cottage leans, the well is dry. But the soil is dark and rich and strangely warm to the touch. No world-ending threats. No dragons. Just dirt under your fingernails and neighbors who bring you casseroles.',
  hook:
    'A solicitor\'s letter arrives: "You have inherited Thistledown Farm, property of the late Aldric Greenmantle. The land requires new stewards. The village requires new blood. Please arrive before the frost." The party finds a ruin, a village that is cautiously welcoming, and soil that hums.',
  twist:
    'The farm was not abandoned. Great-uncle Aldric left because the soil makes crops sentient. The carrots have feelings. The wheat has opinions. The pumpkins hold grudges. Aldric could not bear harvesting things that talked to him. The party must figure out how to farm when the farm talks back - and what it means to tend living things that trust you.',
  climax:
    'The sentient crops are discovered by an agricultural consortium that wants to study (and exploit) them. The village rallies behind the party. The crops themselves have a vote. The final session is a town hall meeting where turnips testify, the party argues for the farm\'s autonomy, and the village chooses community over profit.',
  acts: [
    {
      title: 'Act 1: Spring and Summer',
      summary:
        'The party arrives, clears the land, repairs the cottage, plants their first crops, and meets the village. Sessions are seasonal slices of life: fixing a fence, helping a neighbor, attending the seed swap, discovering the well is not dry but sealed.',
      keyEvents: [
        'Clearing Thistledown Farm - overgrown fields, a cottage that needs love, a sealed well',
        'Meeting the neighbors: the chatty halfling baker, the gruff dwarf blacksmith, the reclusive elf herbalist',
        'Planting the first crops with seeds from the village seed swap',
        'The first sprouts come up fast. Too fast. And one of them says "hello"',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Summer and Autumn',
      summary:
        'The crops are sentient and the party must decide what to do about it. Meanwhile, the village fair approaches, a romance subplot develops, and the party must bring their harvest to the big market. The crops have opinions about being sold.',
      keyEvents: [
        'Discovering the full extent: every crop grown in this soil becomes sentient after a week',
        'The village fair - the party enters their produce and it will not stop talking to the judges',
        'A romance subplot between a party member and a village local (DM picks the most inconvenient pairing)',
        'The big autumn market: selling sentient produce raises ethical questions the party did not expect',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Winter',
      summary:
        'Winter closes in. The village huddles together. The agricultural consortium arrives, having heard rumors of "miracle crops." They want to buy the farm or take samples by force. The party must protect their land, their crops, and their community.',
      keyEvents: [
        'Winter storms isolate the village - the community shares food, stories, and warmth',
        'The consortium arrives with contracts, lawyers, and eventually hired muscle',
        'The crops organize. The pumpkins are militant. The wheat is philosophical. The carrots just want to be left alone.',
        'The town hall: turnips testify, the village votes, and the party decides what kind of farmers they want to be',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Poppy Bramblecrust',
      role: 'neighbor / baker',
      personality:
        'A halfling baker who brings the party scones on day one and never stops. Knows every piece of gossip in Roothollow. Heart of gold, zero filter.',
      secret: 'She knew Aldric. She knows about the sentient crops. She was waiting to see if the new farmers would be kind.',
    },
    {
      name: 'Grond Ironhoe',
      role: 'neighbor / blacksmith',
      personality:
        'A dwarf blacksmith who makes farming tools and judges people by the calluses on their hands. Gruff. Honest. Will die for this village.',
    },
    {
      name: 'Consul Merrick Thane',
      role: 'antagonist / agricultural consortium',
      personality:
        'A smooth-talking human who represents the Greenfield Consortium. Polite, persistent, and willing to escalate when charm fails. Sees the sentient crops as a product, not a community.',
    },
    {
      name: 'The Carrots',
      role: 'sentient produce / residents',
      personality:
        'A collective of sentient root vegetables. Polite, anxious, and deeply concerned about being eaten. Their spokesperson is a carrot named Reginald who speaks with unexpected dignity.',
    },
  ],
  keyLocations: [
    {
      name: 'Thistledown Farm',
      description:
        'A small farm with rich dark soil, a leaning cottage, a sealed well, and fields that hum faintly at dawn. Home.',
      significance: 'The party\'s home base and the heart of the campaign.',
    },
    {
      name: 'Roothollow Village',
      description:
        'A sleepy village with a bakery, a smithy, a tavern called The Muddy Boot, and a population of 200 people who mind their business until they do not.',
      significance: 'The community the party becomes part of.',
    },
    {
      name: 'The Autumn Market',
      description:
        'A seasonal market in the nearest town where farmers sell their harvest. Crowded, colorful, and the place where the sentient crops are first publicly discovered.',
      significance: 'Where the secret gets out and the consortium takes notice.',
    },
  ],
  dataSystems: ['socialEncounter', 'npcPersonality', 'villageEvent', 'enchantedFoodDrink', 'weatherEvent'],
};
