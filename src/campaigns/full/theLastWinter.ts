import type { FullCampaign } from '../types';

export const theLastWinter: FullCampaign = {
  id: 'full-the-last-winter',
  type: 'full',
  title: 'The Last Winter',
  tagline: 'The sun has not risen in 40 days. Lead the village south or everyone dies.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'dark_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 7 },
  estimatedSessions: 15,
  settingSummary:
    'The sun vanished forty days ago over the village of Thornwall. No dawn, no dusk, just endless dark and dropping temperatures. Crops are dead. Livestock is dying. Firewood runs out in a week. The village of 200 souls must march south through a frozen wilderness to reach warmth - an Oregon Trail through a fantasy ice age. Resources dwindle daily. People get sick. Wolves grow bold. And every mile south, the party must make impossible choices about who eats, who walks, and who gets left behind.',
  hook: 'Day 41 without sunrise. The village elder collapses from hypothermia. With her last coherent words, she names the party as trail leaders: "Get them south. Whatever it costs." The village has three days of food, one cart, twelve healthy adults, and eighty people who cannot walk far. The nearest known settlement is 200 miles south. In this cold, that is a month of travel.',
  twist:
    'The sun did not disappear. The village was moved. A well-meaning druid named Ysolde believed a catastrophic war was coming and transported Thornwall into a demiplane to protect it - a pocket dimension of eternal winter she created as a shelter. She died of the effort before she could bring them back. The exit is not south. It is in the center of the demiplane, at the place where Ysolde died, marked by a tree that grows despite the cold.',
  climax:
    'The party discovers the truth: there is no south. The world ends at the edges of the demiplane. They must turn the entire caravan around and head back north, to the center, to Ysolde\'s tree. The village has been walking in the wrong direction for weeks. Supplies are critical. Morale is shattered. The party must hold the group together for one final push, perform a ritual at the tree, and shatter the demiplane to return everyone to the real world - where the war Ysolde feared has already ended.',
  acts: [
    {
      title: 'Act 1: The March Begins',
      summary: 'Departure, rationing, and the first week on the road. The cold is the enemy. Every decision about resources costs something.',
      keyEvents: [
        'Packing day: the village can carry only a fraction of what they own. What stays and what goes?',
        'Quiet moment: Pip gives Elder Torva her only toy - a wooden horse - before the march. Torva carries it until she cannot carry anything.',
        'Day 3: the first blizzard. Two elderly villagers cannot continue. The party decides what happens.',
        'Day 5: a wolf pack shadows the caravan. They are starving too.',
        'Day 7: the food calculation is grim. At current rations, they run out on day 20. The destination is day 30.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Long Dark',
      summary: 'Deeper into the frozen wilderness. Illness, rationing, moral collapse, and the discovery that something is wrong with the world itself.',
      keyEvents: [
        'A hunting party finds an impossible thing: the forest repeats. The same landmarks appear twice.',
        'Disease outbreak: three villagers fall ill. Medicine is nearly gone.',
        'The moment of cost: Brennan demands the sick be left behind. If the party saved the elderly in Act 1, Brennan uses that decision against them - "We cannot afford mercy twice."',
        'Quiet moment: Pip tells a story by the fire about a girl who walked so far she found the sun. The villagers listen. Some cry. Nobody leaves.',
        'The edge of the world: the party reaches a point where the land simply ends - a wall of white nothing. There is no south.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Return',
      summary: 'The truth, the reversal, and the desperate final push to Ysolde\'s tree.',
      keyEvents: [
        'Discovering Ysolde\'s journal in a frozen cave: the truth about the demiplane',
        'Convincing the village to turn around. Trust is nearly gone. If the party held the group together in Act 2, Brennan stands with them. If not, he leads a splinter group south into nothing.',
        'Quiet moment: the night before the final push, Pip returns Elder Torva\'s wooden horse to the party. "She said to give it to whoever leads us home."',
        'The final march north: less food, weaker people, but now with purpose',
        'Ysolde\'s tree: a living oak in an endless winter. The ritual, the shattering, and the return to a world that moved on without them.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Torva',
      role: 'village elder / early casualty',
      personality:
        'A tough, practical woman who held the village together for forty sunless days before her body gave out. Her authority passes to the party. "I kept them alive. Now you keep them moving." Arc: present only in Act 1 as the leader who falls. Her legacy is the standard the party is measured against for the rest of the campaign.',
    },
    {
      name: 'Brennan the Smith',
      role: 'pragmatist / potential antagonist',
      personality:
        'A strong man who believes survival requires hard choices. He wants to leave the sick behind, reduce the group to those who can walk, and move fast. He is not wrong about the math. He is wrong about what it costs. Arc: Act 1 pragmatist, Act 2 antagonist who forces the hardest decisions, Act 3 either the party\'s strongest ally or the leader of a doomed splinter group - depending on whether they earned his trust.',
      secret: 'His wife is among the sick. His ruthlessness is a mask over terror.',
    },
    {
      name: 'Ysolde (deceased)',
      role: 'the druid who caused this / posthumous presence',
      personality:
        'Known through her journal: a compassionate, powerful druid who saw the war coming and panicked. She did not mean for this to happen. "If I am dead and you are reading this, I am sorry. The exit is at my tree. I hope someone finds this in time." Her journal entries grow more desperate across the acts, forming a parallel narrative to the party\'s march.',
    },
    {
      name: 'Pip',
      role: 'orphan child / morale anchor',
      personality:
        'A ten-year-old who lost both parents in the first week of darkness. She refuses to cry. She carries firewood. She tells stories at night. She is the reason people keep walking. Arc: Act 1 she is silent and watchful. Act 2 she becomes the storyteller who keeps morale alive. Act 3 she carries Torva\'s wooden horse and places it at Ysolde\'s tree - the first offering at a shrine that never existed.',
    },
  ],
  keyLocations: [
    {
      name: 'Thornwall',
      description:
        'A farming village now buried in frost. The starting point and, unknowingly, near the destination. When the party returns in Act 3, the buildings they left behind are barely visible under the snow.',
      significance: 'Where the journey begins and nearly ends.',
    },
    {
      name: 'The Edge',
      description:
        'The boundary of the demiplane. A wall of featureless white where reality ends. No sound, no echo. Throw a stone and it vanishes. Terrifying to behold.',
      significance: 'The proof that the world is wrong and the party must change course.',
    },
    {
      name: 'Ysolde\'s Tree',
      description:
        'A living oak in the center of the demiplane, green and warm in a world of ice. Ysolde\'s body rests at its roots, frozen mid-reach toward the trunk. Birds nest in the branches. It should not exist.',
      significance: 'The exit. The ritual site. The key to going home.',
    },
  ],
  dataSystems: [
    'wildernessSurvival',
    'cataclysmCountdown',
    'settlementEvent',
    'socialEncounter',
    'encounterWaves',
    'magicalAnomaly',
    'npcRelationshipWeb',
    'backstoryComplication',
  ],
};
