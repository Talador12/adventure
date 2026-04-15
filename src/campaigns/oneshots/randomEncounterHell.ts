import type { OneShotCampaign } from '../types';

export const randomEncounterHell: OneShotCampaign = {
  id: 'oneshot-random-encounter-hell',
  type: 'oneshot',
  title: 'Random Encounter Hell',
  tagline: 'A random encounter every 30 seconds. Not dangerous. Just constant. You cannot take five steps without something happening.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Overstimulated Wilderness is a 2-mile stretch of forest where the encounter table has broken. A magical ley line intersection has overcharged the area\'s random encounter generation. Every 30 seconds of real time, something happens. Walk 10 feet, a squirrel challenges you to a duel. Walk 10 more, a merchant selling exclusively left shoes appears from behind a tree. Stop to think, a bard materializes and plays one note before vanishing. None of it is dangerous. All of it is relentless. The party must cross the forest to deliver a package. The package is also an encounter (it talks).',
  hook: 'The party accepts a simple delivery quest: carry a package across Brambleveil Forest. Two miles. Should take an hour. They enter the forest. A squirrel drops from a tree, draws a tiny sword, and challenges the fighter to single combat. Before the fighter can respond, a merchant appears from behind a bush selling left shoes. While the rogue inspects a shoe, a ghost materializes, says "boo," and leaves. A rain cloud forms over the wizard specifically. A singing mushroom offers directions. It has been 90 seconds.',
  twist:
    'The encounters are not random - they are a queue. Every encounter that was SUPPOSED to happen over the next century in this forest is firing all at once because the ley line is draining. When the queue empties, the forest will be encounter-free for 100 years. The final encounter in the queue is the big one: a tarrasque that was scheduled for the year 2126. If the party does not reach the ley line nexus and fix it before the queue empties, a tarrasque spawns in a forest 2 miles from the nearest village.',
  climax:
    'The encounters accelerate as the queue drains. Multiple encounters stack: a merchant tries to sell shoes to a ghost while a squirrel duels a mushroom while it rains on the wizard. The party reaches the ley line nexus and must repair it while encounters fire every 5 seconds. Fix the crystal, stop the queue, prevent the tarrasque. The final encounter before the fix: the tarrasque begins materializing. Its foot appears. Then its leg. The party has seconds. The crystal snaps into place. The tarrasque dematerializes. The forest goes quiet for the first time in hours. The silence is deafening.',
  scenes: [
    {
      title: 'Scene 1: The First Mile',
      summary:
        'The party enters the forest and the encounters begin. Every 30 seconds, something interrupts. None of it is threatening but none of it stops. The party must make progress while being constantly, relentlessly sidetracked.',
      challenge: 'exploration',
      keyEvents: [
        'Encounter 1: A squirrel with a tiny sword challenges the fighter to a duel. It is very serious about this.',
        'Encounter 4: A merchant selling exclusively left shoes. He has no right shoes. He does not know what right shoes are.',
        'Encounter 8: A bard materializes, plays one note on a lute, says "you are welcome," and vanishes.',
        'Encounter 12: The package the party is delivering clears its throat and says "Are we there yet?" It talks. It has opinions.',
      ],
    },
    {
      title: 'Scene 2: The Acceleration',
      summary:
        'Encounters speed up. Multiple fire simultaneously. The party must navigate overlapping encounters while making forward progress. A combat encounter happens during a social encounter during an exploration encounter.',
      challenge: 'combat',
      keyEvents: [
        'Encounters start overlapping: a merchant argues with a ghost about shoe prices while a swarm of butterflies carries away the wizard\'s hat.',
        'An actual combat encounter: 3 wolves. Mid-fight, a traveling salesman walks through offering life insurance. The wolves are distracted.',
        'The talking package reveals it knows about the ley line. "You need to go faster. The queue is almost empty. Trust me. You do NOT want to see what is at the bottom of the queue."',
        'Encounter rate doubles. The party is now wading through a constant stream of merchants, animals, weather events, and one very persistent bard.',
      ],
    },
    {
      title: 'Scene 3: The Queue',
      summary:
        'The party learns the truth about the encounter queue and the tarrasque at the bottom. They must reach the ley line nexus and repair it while encounters fire every few seconds around them.',
      challenge: 'puzzle',
      keyEvents: [
        'The talking package explains: "Every encounter for the next 100 years is happening NOW. The last one in the queue is big. Very big. Extinction-level big."',
        'The ley line nexus is visible: a cracked crystal at the center of a clearing. Encounters spiral around it like a tornado of random events.',
        'Repairing the crystal requires concentration while a squirrel army, three merchants, two ghosts, a singing mushroom, and a very confused owlbear all happen simultaneously.',
        'The tarrasque begins materializing. One foot. One leg. The crystal locks into place. The tarrasque dissolves. Silence. Complete, beautiful silence. Then the package says: "Good job. Now deliver me."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Talking Package',
      role: 'quest object / exposition / backseat driver',
      personality:
        'A small wrapped box that contains a gift for someone on the other side of the forest. It is sentient, impatient, and knows far more about the ley line situation than it initially lets on. "I was supposed to be delivered QUIETLY. This is not quiet. This is the opposite of quiet."',
      secret: 'The package contains a replacement crystal for the ley line nexus. The sender knew this would happen.',
    },
    {
      name: 'Sir Nutsworth',
      role: 'recurring encounter / squirrel duelist',
      personality:
        'A squirrel with a toothpick sword and an unshakeable code of honor. He challenges the strongest-looking party member to a duel every time he spawns. He has spawned 6 times. He does not remember the previous encounters. He is always surprised to see the party.',
    },
    {
      name: 'Leftfoot Larry',
      role: 'recurring encounter / shoe merchant',
      personality:
        'A merchant who only sells left shoes. He appears from behind trees, bushes, and once from inside a hollow log. He does not understand the concept of right shoes. "Why would you want a shoe for the wrong foot?"',
    },
  ],
  keyLocations: [
    {
      name: 'Brambleveil Forest (The Overstimulated Wilderness)',
      description:
        'A 2-mile stretch of forest where the random encounter table has broken. Something happens every 30 seconds. The trees are normal. The wildlife is normal. Everything else is chaos.',
      significance: 'The entire adventure is crossing this forest while surviving the encounter barrage.',
    },
    {
      name: 'The Ley Line Nexus',
      description:
        'A clearing at the forest center with a cracked crystal pillar. Encounters spiral around it like a whirlpool of random events. The air crackles with unspent encounter energy.',
      significance: 'The climax location where the encounter queue must be stopped before the tarrasque spawns.',
    },
  ],
  dataSystems: [
    'randomEncounter',
    'combatNarration',
    'socialEncounter',
    'environmentalHazard',
    'fantasyInsults',
    'plotTwistEngine',
  ],
};
