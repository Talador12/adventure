import type { OneShotCampaign } from '../types';

export const theFamine: OneShotCampaign = {
  id: 'oneshot-famine',
  type: 'oneshot',
  title: 'The Famine',
  tagline: 'Three days of food. Five days to the nearest town. A village of sixty counting on you.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The harvest failed. The river dried up. The village of Thornfield has three days of food for sixty people. The nearest town with supplies is a five-day march. The party must find a way to feed the village or get help before people start dying.',
  hook: 'The village elder lays it out plainly: "We have three days. My people are already thinning the porridge. After day three, we eat seed grain. After that, nothing. Can you help us, or should I start picking who eats last?"',
  twist:
    'The river did not dry up naturally. A wealthy landowner upstream dammed it to irrigate his own fields. He knows the village is dying. He does not care. Breaking the dam would flood his crops but save the village.',
  climax:
    'The party discovers the dam. Confronting the landowner leads to a standoff: he has hired guards. Break the dam by force, negotiate, find legal recourse, or find another solution entirely. Meanwhile, Thornfield is on day three.',
  scenes: [
    {
      title: 'Scene 1: The Inventory',
      summary: 'Assessing the crisis. The party learns the scope of the problem and explores options: hunt, forage, send runners, or investigate the river.',
      challenge: 'exploration',
      keyEvents: [
        'The granary: the elder opens it. Half a barrel of grain, a wheel of hard cheese, dried fish. She counts heads without looking up. "Three days. Maybe four if we stop feeding the dogs."',
        'Options: the forest is picked clean - two rabbits and a handful of roots is a good hour. Sending a runner to the nearest town is five days there and five back. The only real question is the river.',
        'The riverbed: cracked mud where water should be. A child\'s footprints walk to the center and stop. She was looking for fish. There are no fish.',
        'Upstream: the riverbed is dry for half a mile, then... wet stones. The water stops at a line. Something is blocking it. Something new.',
      ],
    },
    {
      title: 'Scene 2: Upstream',
      summary: 'The party follows the dead river and discovers the dam. The landowner is wealthy, guarded, and indifferent.',
      challenge: 'social',
      keyEvents: [
        'Half a day upstream: a new earthen dam. Behind it, a full reservoir irrigating one man\'s fields.',
        'The landowner, Lord Harren, is home. He knows about Thornfield. He does not care.',
        'He has eight hired guards. He has legal rights to the water (technically).',
        'Negotiation, intimidation, legal arguments, or direct action. All have consequences.',
      ],
    },
    {
      title: 'Scene 3: The Decision',
      summary: 'Break the dam, deal with the landowner, or find another way. Every choice has a cost.',
      challenge: 'combat',
      keyEvents: [
        'Breaking the dam floods Harren\'s fields. His guards attack. The party fights.',
        'The dam breaks. Water rushes downstream. Thornfield will have a river again in hours.',
        'Harren swears vengeance. Legal trouble ahead. But the village lives.',
        'Alternative: a druid in the forest can call rain, but her price is steep.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Greta Thornfield',
      role: 'village leader',
      personality: 'Hands like oak roots, voice like gravel. She has already done the math and divided the village into who eats first and who eats last. She put herself on the last-to-eat list. "I am old. Children grow. That is the order."',
    },
    {
      name: 'Lord Edric Harren',
      role: 'landowner / antagonist',
      personality: 'Polite, well-dressed, utterly callous. Views the village as someone else\'s problem. "I have rights to this water. Take it up with the magistrate."',
      secret: 'He is deeply in debt. The irrigated crops are his last chance to pay off creditors. He is desperate too, just differently.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornfield Village',
      description: 'A farming village with empty fields, a dry well, and hungry people trying not to show it.',
      significance: 'Where the stakes are. Every hour the party is away, things get worse here.',
    },
    {
      name: 'Harren\'s Dam',
      description: 'A crude earthen dam blocking the river. Behind it, green irrigated fields contrast sharply with the dead land downstream.',
      significance: 'The cause of the crisis and the site of the climactic confrontation.',
    },
  ],
  dataSystems: ['survivalTracker', 'moraleTracker', 'npcGenerator', 'combatNarration'],
};
