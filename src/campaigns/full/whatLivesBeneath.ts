import type { FullCampaign } from '../types';

export const whatLivesBeneath: FullCampaign = {
  id: 'full-what-lives-beneath',
  type: 'full',
  title: 'What Lives Beneath',
  tagline: 'Something is digging up. Something worse is chasing it.',
  tone: 'horror',
  themes: ['horror', 'survival', 'underdark'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The coastal village of Dunmore sits on cliffs above the sea. For three weeks, residents have heard scratching beneath their floorboards at night. Rhythmic. Persistent. Getting louder. Cellars are deepening themselves — stone floors cracking to reveal cavities that were not there before. Something is hollowing out the earth beneath Dunmore, and it is heading up.',
  hook: 'The party is traveling through Dunmore when the ground beneath the inn shifts. A crack opens in the cellar floor, revealing a tunnel dug from below — smooth-walled, warm, and sloping downward into darkness. The innkeeper has been hearing scratching for weeks. Last night, something pushed a flagstone up from underneath. The village elder offers payment. "Something is under us. I need to know what."',
  twist:
    'The creature digging upward is not hostile. It is terrified. A massive, gentle, subterranean being — eyeless, bioluminescent, and ancient — has lived in the deep earth for millennia. Something has invaded its domain from even further below: a predator from the Underdark that feeds on geothermal magic. The creature is fleeing upward because it has nowhere else to go. It does not want to surface. It is being driven there. Stopping the scratching means helping a creature the size of a city block escape a predator the party has never seen.',
  climax:
    'The predator reaches Dunmore\'s foundations. The ground shakes. The gentle creature surfaces partially — vast, luminous, and wounded, filling the harbor with pale light. The predator follows: a chitinous, heat-eating horror from the deepest Underdark. The party must either help the gentle creature flee to the sea, kill the predator in the tunnels before it surfaces, or find a way to seal the deep tunnels permanently — trapping whatever is below.',
  acts: [
    {
      title: 'Act 1: The Scratching',
      summary:
        'Investigation of the tunnels beneath Dunmore. The party descends and discovers a network of smooth-bore tunnels dug from below. Something large made them. It is still making them.',
      keyEvents: [
        'The cellar crack: first descent into the tunnel network',
        'Tunnel exploration: smooth walls, warm air, bioluminescent residue',
        'Scale realization: the tunnels are enormous — whatever made them is not small',
        'First encounter: a shed claw the size of a person, still warm, bioluminescent',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Gentle Giant',
      summary:
        'The party encounters the creature digging upward. It is enormous, blind, and afraid. Communication is difficult but possible. It is not attacking — it is running from something.',
      keyEvents: [
        'Contact: the creature is discovered in a vast cavern, curled and trembling',
        'Communication: it responds to vibrations, recoiling from loud sounds, leaning toward gentle ones',
        'The wounds: deep, thermal burns along its flanks — something has been feeding on it',
        'Its plea: through crude vibration patterns, the creature conveys fear — not of the party, but of what follows it',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Predator',
      summary:
        'The Underdark predator arrives beneath Dunmore. The ground becomes unstable. The gentle creature pushes toward the surface in desperation. The party must resolve a confrontation between something they want to protect and something they cannot easily fight.',
      keyEvents: [
        'Tremors: the predator is close — heat drains from the tunnels, frost forms on warm stone',
        'The gentle creature panics and breaks through to the surface, filling the harbor with light',
        'The predator surfaces: a chitinous, heat-devouring horror that drains warmth from everything it touches',
        'The choice: guide the creature to sea, fight the predator in the tunnels, or collapse the passage',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Cora Wynn',
      role: 'quest giver',
      personality:
        'The village elder. Practical, stubborn, and deeply unsettled. She has lived in Dunmore for seventy years and the ground has never moved before. She wants answers, not mysteries.',
    },
    {
      name: 'Harrin the Miner',
      role: 'guide / ally',
      personality:
        'A retired miner who knows the local geology. He insists the tunnels are impossible — the rock type does not allow for natural caves. Whatever made these tunnels melted through solid basalt.',
    },
    {
      name: 'The Luminos',
      role: 'the gentle creature',
      personality:
        'A being the size of several houses, blind, bioluminescent, and ancient. It communicates through vibrations and light patterns. It is in pain, afraid, and trying very hard not to crush anything as it moves through spaces too small for it.',
    },
    {
      name: 'The Thermovore',
      role: 'the predator',
      personality:
        'A Underdark predator that feeds on geothermal and magical heat. It does not think — it hunts. Where it passes, stone freezes and cracks. It has chased the Luminos for months.',
    },
  ],
  keyLocations: [
    {
      name: 'Dunmore',
      description: 'A quiet coastal village on sea cliffs. Fishing boats, stone cottages, a harbor. The ground underneath is becoming Swiss cheese.',
      significance: 'Where the horror is felt and the surface confrontation occurs.',
    },
    {
      name: 'The Bore Tunnels',
      description: 'Smooth-walled tunnels beneath Dunmore, radiating heat and faint bioluminescence. They slope downward into the deep earth.',
      significance: 'The primary exploration and encounter environment.',
    },
    {
      name: 'The Deep Hollow',
      description: 'A vast cavern far below Dunmore where the Luminos has been sheltering. The walls glow. The air is warm. Everything is on a scale that dwarfs the party.',
      significance: 'Where the party meets the creature and understands the true situation.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'monsterEcology',
    'wildernessSurvival',
    'encounterWaves',
    'cataclysmCountdown',
    'trapDesign',
    'resourceScarcity',
    'magicalAnomaly',
  ],
};
