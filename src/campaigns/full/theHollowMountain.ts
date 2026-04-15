import type { FullCampaign } from '../types';

export const theHollowMountain: FullCampaign = {
  id: 'full-hollow-mountain',
  type: 'full',
  title: 'The Hollow Mountain',
  tagline: 'The walls are warm. The floor is soft. The tunnel just contracted.',
  tone: 'horror',
  themes: ['dark_fantasy', 'dungeon_crawl', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 14 },
  estimatedSessions: 18,
  settingSummary:
    'Mount Karath has been forbidden ground for 500 years. The dwarves who mined it vanished overnight. The surface entrance was sealed with wards. Now the wards are failing, and something inside is waking up. The mountain itself breathes - a slow, rhythmic vibration that the nearby village can feel in their bones.',
  hook: 'Earthquakes are destroying the village of Stonehollow at the mountain\'s base. The village elder hires the party to enter the mountain, find the source of the tremors, and stop them. The dwarven records say only: "Do not go below the Fifth Hall."',
  twist:
    'Mount Karath is not a mountain. It is the petrified body of a primordial titan, turned to stone in the Age of Gods. The dwarves did not mine it - they were harvesting its organs for magical power. The titan is waking up because they took too much.',
  climax:
    'The party reaches the Heart Chamber - the titan\'s literal still-beating heart, surrounded by dwarven extraction machinery. They must either destroy the heart (killing the titan and collapsing the mountain), repair the machinery to keep it sedated (dooming themselves to maintain it like the dwarves), or free the titan and face the consequences.',
  acts: [
    {
      title: 'Act 1: The Upper Halls',
      summary:
        'The party enters through the crumbling wards and explores the first three halls. Evidence of the dwarven civilization is everywhere: homes, forges, markets - all abandoned mid-action. Tools still on anvils. Meals still on tables. Dust over everything.',
      keyEvents: [
        'The ward seal cracks open - something exhales from inside. The air is warm and wet, like breath from a sleeping animal. It smells organic in a way stone should not.',
        'Exploring the First Hall: a dwarven marketplace frozen in time. A half-eaten meal on a tavern table. A child\'s toy on the floor. 500 years of dust, undisturbed, as if time stopped and forgot to restart.',
        'Finding the Chief Miner\'s journal: early entries are professional. Middle entries note "unusual warmth at depth." Final entries are written in handwriting that shakes: "It moved. The wall moved. We are inside something."',
        'The walls pulse. Not an earthquake. A heartbeat. Once per minute. The party feels it in their teeth before they hear it.',
        'Quiet dread: the party places a hand on the tunnel wall and feels warmth. The warmth pulses. When they pull their hand away, the wall is slightly damp, as if it sweated where they touched it.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Below the Fifth Hall',
      summary:
        'The party descends past the warning markers into organic tunnels where stone transitions to something that is not stone. The walls are warm. The floors are soft. The architecture becomes biological.',
      keyEvents: [
        'The Fifth Hall barrier: massive dwarven runes that say "SEALED BY ORDER. DO NOT DESCEND."',
        'Tunnels become veins - the rock gives way to petrified tissue',
        'Encounter with the Remnants: dwarves who were absorbed into the titan\'s body',
        'Finding the extraction machinery: pumps, tubes, collection vats. Still running on residual magic.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Heart Chamber',
      summary:
        'The party reaches the core: a cathedral-sized chamber containing the titan\'s heart. It beats once per minute. Each beat shakes the mountain. The dwarven machinery is failing. The titan is waking.',
      keyEvents: [
        'The Heart Chamber: a living organ the size of a house, wrapped in dwarven pipes',
        'The titan\'s immune system activates: antibody-golems attack intruders',
        'Meeting the Last Dwarf: a ghost who explains what they did and why',
        'The choice: kill, sedate, or free',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Brina Stonehollow',
      role: 'quest giver',
      personality:
        'The village elder who has felt the heartbeat her entire life and always known the mountain was alive. Nobody believed her until the earthquakes started.',
      secret: 'She is a descendant of the dwarves who fled. Her family has guarded the secret for 500 years and she was supposed to take it to her grave.',
    },
    {
      name: 'Foreman Durik',
      role: 'ghost guide',
      personality:
        'The last Chief Miner, now a ghost bound to the extraction machinery. He speaks in the clipped, efficient language of a foreman giving orders, but his voice cracks on words related to digging. He wrings transparent hands. He checks gauges that have not changed in centuries. Practical, guilt-ridden, and exhausted from 500 years of watching his mistake.',
      secret: 'He was the one who ordered the deep dig that pierced the heart. He has been maintaining the sedation machinery as a ghost ever since. He cannot leave until someone takes over or ends it.',
    },
    {
      name: 'The Remnants',
      role: 'tragic enemies',
      personality:
        'Former dwarves who were absorbed into the titan\'s body during the evacuation. They are conscious but no longer fully dwarven. They speak in chorus. They do not want to fight but the titan\'s immune system compels them.',
      secret: 'They can be freed by removing the extraction needles from the titan\'s body. They do not know this. Foreman Durik does.',
    },
    {
      name: 'Karath',
      role: 'the mountain',
      personality:
        'The primordial titan. Not evil. Dreaming of the age before gods. Its awakening is not malicious - it simply wants to stand up. The mountain standing up would destroy everything within 50 miles.',
    },
  ],
  keyLocations: [
    {
      name: 'The Frozen Market',
      description:
        'The First Hall dwarven marketplace, perfectly preserved by the mountain\'s internal atmosphere. Goods still on shelves. A half-eaten meal on a tavern table. 500 years of dust.',
      significance: 'Sets the tone and provides historical context through environmental storytelling.',
    },
    {
      name: 'The Vein Tunnels',
      description:
        'Below the Fifth Hall, the stone transitions to organic material. The tunnels are warm, slightly flexible, and pulse with a slow rhythm. Light comes from bioluminescent deposits.',
      significance: 'The visceral reveal that the mountain is alive.',
    },
    {
      name: 'The Heart Chamber',
      description:
        'A natural cathedral containing the titan\'s heart - a massive organ wrapped in crystallized blood vessels and dwarven extraction pipes. It beats once per minute. The sound is deafening.',
      significance: 'The final dungeon and moral choice.',
    },
  ],
  dataSystems: ['abandonedMine', 'undeadUprising', 'hauntedLocation', 'trapCorridor'],
};
