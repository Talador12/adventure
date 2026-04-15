import type { FullCampaign } from '../types';

export const theIncredibleShrinkingParty: FullCampaign = {
  id: 'full-the-incredible-shrinking-party',
  type: 'full',
  title: 'The Incredible Shrinking Party',
  tagline: 'You lose one inch per day. The puddle is now an ocean. The cat is now a god.',
  tone: 'survival',
  themes: ['survival', 'exploration', 'comedy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 15 },
  estimatedSessions: 18,
  settingSummary:
    'The party is cursed to shrink one inch per day. The campaign begins at normal size and tracks their desperate race to find a cure as the world transforms around them. A rainstorm becomes a flash flood. A garden snail becomes a siege engine. A dust mote becomes a boulder. Each session, the DM recalibrates what "dangerous" means at their current scale. Weapons, armor, spells - all must be adapted or abandoned as physics changes beneath them.',
  hook:
    'The party accepts a routine contract to clear a wizard ruin. Inside, they trigger a trap: a glass orb shatters and coats them in shimmering dust. The next morning, their boots are loose. By noon, their armor does not fit. By evening, they are six inches shorter. A note in the ruin reads: "The Lens of Perspective. Shrinks the viewer until nothing remains. No known cure. I am so sorry. -Archmage Vael." The countdown begins.',
  twist:
    'There is no cure. The shrinking cannot be reversed. But at roughly one-sixteenth of an inch tall, the party discovers the Mote Civilization - a sentient microscopic society that exists on every surface, in every drop of water, on every grain of sand. They have been trying to contact the "giants" (normal-sized people) for millennia. The shrinking was never a curse. It was an invitation. Archmage Vael did not die - she accepted and became their emissary.',
  climax:
    'The party reaches Mote scale and meets Vael, now ancient and beloved. The Mote Civilization faces extinction - a mundane event at normal scale (someone plans to pave over their continent, which is a kitchen floor) will destroy them. The party must find a way to communicate UP to the giant world and stop the construction. The campaign ends with the party choosing: return to normal size (abandoning the Motes) or stay small (becoming their protectors forever).',
  acts: [
    {
      title: 'Act 1: The Incredible Shrinking (Feet to Inches)',
      summary:
        'The party shrinks from normal size to roughly 6 inches tall. The human world is still navigable but increasingly hostile. Chairs are cliffs. Tables are plateaus. A house cat is a dire predator. Combat shifts from swords to improvised weapons. The tone is dark comedy as everyday objects become survival challenges.',
      keyEvents: [
        'Day 1: boots do not fit. Day 3: cannot reach door handles. Day 7: a rat is a serious combat encounter.',
        'Consulting healers, wizards, clerics - nobody can identify the curse. Remove Curse fails. Greater Restoration fails.',
        'Discovering Archmage Vael research notes: she studied something called "scalar magic" and vanished 200 years ago',
        'The party builds a base camp inside a hollow book on a library shelf - their first "settlement" at small scale',
        'A house cat stalks the party through a kitchen. Four sessions ago this was a pet. Now it is a dragon.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Insect Kingdom (Inches to Fractions)',
      summary:
        'The party enters insect scale. A garden is a jungle. A spider web is a fortress. An ant colony is a hostile nation. Water surface tension becomes a barrier they can walk on. They find traces of Vael - tiny carved messages on grains of sand. Someone came this way before.',
      keyEvents: [
        'First contact with insects as intelligent-seeming entities at this scale - ants with organized military formations',
        'Crossing a puddle using surface tension - walking on water is just physics now',
        'A spider web fortress: silk strands thick as rope, the spider a patient, calculating predator the size of a house',
        'Finding Vael carved messages on sand grains: "Do not be afraid. Keep going smaller. They are waiting."',
        'A rainstorm: each drop is a wrecking ball. Shelter becomes the most critical resource in the campaign.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Mote World (Microscopic)',
      summary:
        'The party reaches the Mote Civilization - a thriving society on the surface of a kitchen tile. Cities of crystal. People made of light. And Archmage Vael, ancient and wise, who chose to stay. The Motes face annihilation from a mundane renovation. The party must bridge two scales of reality.',
      keyEvents: [
        'Arrival in the Mote capital: a city built from mineral crystal lattices, glowing with bioluminescence',
        'Meeting Vael, now 200 years old, preserved by Mote magic. She is their historian, translator, and protector.',
        'The threat: vibrations from above. Someone is going to tile over the kitchen. The Mote continent will be crushed.',
        'Devising a communication method: the party must send a message UP through scales of reality to stop the renovation',
        'Final choice: Vael offers a way to reverse the shrinking using Mote magic - but only for the party. The Motes cannot grow. If the party leaves, the Motes lose their only connection to the giant world.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Vael',
      role: 'guide / predecessor',
      personality:
        'A wizard who "disappeared" 200 years ago. She found the Mote Civilization and chose to stay. Now ancient, patient, and kind. She carved messages on grains of sand hoping someone else would follow. She has been waiting two centuries for company.',
      secret: 'She created the shrinking trap deliberately to recruit. She needs help. The Motes are dying and she cannot save them alone.',
    },
    {
      name: 'Duchess Crystalline',
      role: 'Mote leader / ally',
      personality:
        'Leader of the Mote capital. A being of organized light who communicates through color shifts and vibration patterns. Regal, desperate, and willing to trust the giants because Vael vouched for them. Her entire civilization fits on a postage stamp.',
    },
    {
      name: 'Skitter',
      role: 'insect-scale ally / mount',
      personality:
        'A carpenter ant the party befriends at insect scale. Loyal, hardworking, and surprisingly expressive for a creature that communicates via pheromones. Becomes the party mount in Act 2. Cannot follow them to Mote scale.',
    },
    {
      name: 'Landlord Gresh Hamby',
      role: 'unwitting antagonist',
      personality:
        'A perfectly ordinary human landlord renovating his kitchen. He has no idea that an entire civilization lives on his floor tile. He is not evil. He just wants nice countertops. He is the final boss and does not know it.',
    },
  ],
  keyLocations: [
    {
      name: 'The Hollow Book',
      description: 'A hollowed-out tome on a library shelf that serves as the party base camp at 6-inch scale. Furnished with matchstick furniture and lit by firefly lanterns.',
      significance: 'Act 1 home base. The first place the party builds at small scale.',
    },
    {
      name: 'The Garden Jungle',
      description: 'An ordinary herb garden that at insect scale is a dense tropical jungle. Basil stalks are redwoods. A watering can is a waterfall. Aphids are grazing herds.',
      significance: 'Act 2 wilderness. Where insect-scale survival and exploration happen.',
    },
    {
      name: 'Crystalline City',
      description: 'The Mote capital built from mineral lattices on a kitchen tile. Towers of salt crystal. Roads of copper oxide. A civilization of light-beings in a space smaller than a coin.',
      significance: 'Act 3 home. Where the final stakes become clear and the choice is made.',
    },
  ],
  dataSystems: ['environmentalHazard', 'wildernessExploration', 'survivalCondition', 'combatNarration', 'puzzleRoom'],
};
