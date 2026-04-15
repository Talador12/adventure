import type { FullCampaign } from '../types';

export const theAshlands: FullCampaign = {
  id: 'full-the-ashlands',
  type: 'full',
  title: 'The Ashlands',
  tagline: 'A supervolcano buried everything in ash. You are in the kill zone. Get out.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'Mount Caldera erupted with the force of a dying god. Everything within 200 miles is buried under feet of volcanic ash. The sky is black. Breathing without a mask is dangerous. Visibility is measured in arms-lengths when the ash storms hit. The landscape reshapes daily as ash drifts and settles. The party is trapped in the kill zone with dwindling supplies, failing equipment, and a ticking clock: reach the edge before the ash buries them forever. And something in the ashlands is alive.',
  hook: 'The eruption caught the party mid-journey. They survived in a cave. When they emerge, the world is gray. Their map is useless - landmarks are buried, roads are gone, rivers are choked with pumice. They have seven days of food, cloth to wrap over their mouths, and a general sense that "east" is where the ashfall ends. 200 miles of dead landscape stand between them and breathable air.',
  twist:
    'There are people living in the ashlands. A community of survivors adapted to the conditions within weeks: ash-filter masks, insulated shelters, underground water sources. They call themselves the Cinders. They are not hostile, just wary of outsiders. They know the way out. They will not leave because the ash is the only thing keeping a planar rift sealed. Before the eruption, a rift to the Elemental Plane of Fire was widening. The volcanic eruption was not natural - it was triggered to bury the rift. The ash is a bandage. Remove it and the world burns.',
  climax:
    'The party must choose: escape the ashlands and leave the Cinders to guard the rift alone, or stay and help seal it permanently. Sealing the rift means venturing into the deepest part of the ashlands, where the air is poison and the ground is still molten, to reach the rift and close it. If they seal it, the Cinders can finally leave and the ashlands will heal. If they flee, the rift will eventually break through the ash and make the eruption look like a campfire.',
  acts: [
    {
      title: 'Act 1: Buried',
      summary: 'Emergence, orientation, and the brutal first days of travel through an ash-choked wasteland.',
      keyEvents: [
        'Emergence from the cave: a world of gray. No sky, no horizon, no sound except settling ash.',
        'The first ash storm: zero visibility, choking air, navigation impossible for hours',
        'A collapsed town found: buried to the rooftops. Supplies scavenged. Bodies not examined too closely.',
        'Signs of life: footprints in the ash. Someone else survived. They are heading the wrong direction.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Cinders',
      summary: 'Contact with the ashlands community. Their adaptation, their secret, and the truth about the eruption.',
      keyEvents: [
        'First contact: masked figures emerge from the ash. They communicate with hand signals. They offer water.',
        'The Cinder settlement: an underground community with filtered air, mushroom gardens, and a purpose',
        'The truth: the eruption was deliberate. A circle of druids triggered it to bury the rift.',
        'The rift glows beneath the deepest ash. The ground hums with elemental fire trying to break through.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Rift',
      summary: 'The choice: leave or seal. If the party stays, the journey to the rift is the most dangerous trek yet.',
      keyEvents: [
        'The Cinders show the party the way out. It is a clear path. They can leave.',
        'The rift is destabilizing. Ash melts from below. Fire elementals probe the weakening seal.',
        'The descent: volcanic tunnels, toxic air, molten ground. The party must reach the rift before it breaches.',
        'Sealing the rift: a ritual using the volcanic energy itself. Close the wound and let the ashlands heal.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Ashwalker Dren',
      role: 'Cinder leader / guide',
      personality: 'A former ranger who adapted to the ashlands faster than anyone. She moves through ash storms like weather. Laconic, competent, and uninterested in explaining herself twice. "Breathe through the filter. Walk where I walk. Do not touch anything orange."',
    },
    {
      name: 'Keeper Ulva',
      role: 'Cinder elder / druid legacy',
      personality: 'The last surviving member of the druid circle that triggered the eruption. She carries the guilt and the knowledge. "We killed a mountain to save a world. I would do it again. I wish I did not have to."',
      secret: 'The ritual that triggered the eruption required a sacrifice: her entire circle. She alone survived because someone had to maintain the watch.',
    },
    {
      name: 'Spark',
      role: 'fire elemental scout / reluctant informant',
      personality: 'A minor fire elemental that slipped through the rift before it was sealed. It does not want the rift open either - the Plane of Fire is in civil war and this rift leads to the losing side. "Close it. Please. I do not want to go back."',
    },
  ],
  keyLocations: [
    { name: 'The Ashlands', description: 'Two hundred miles of volcanic desolation. Ash drifts like snow. The air tastes of sulfur. The landscape changes daily.', significance: 'The entire hostile environment the party must traverse.' },
    { name: 'Cinder Hold', description: 'An underground community in a lava tube, sealed with clever engineering and druidic wards. The only breathable space for a hundred miles.', significance: 'Where the truth is learned and the choice is made.' },
    { name: 'The Rift', description: 'A wound in reality at the bottom of the deepest volcanic tunnel. The ground is glass. The air is fire. The rift glows orange and whispers in Ignan.', significance: 'The final destination. Close it or the world burns.' },
  ],
  dataSystems: ['wildernessSurvival', 'cataclysmCountdown', 'encounterWaves', 'magicalAnomaly', 'monsterEcology', 'settlementEvent', 'npcRelationshipWeb', 'socialEncounter'],
};
