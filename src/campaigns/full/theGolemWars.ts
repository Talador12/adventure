import type { FullCampaign } from '../types';

export const theGolemWars: FullCampaign = {
  id: 'full-golem-wars',
  type: 'full',
  title: 'The Golem Wars',
  tagline: 'When constructs learn to build themselves, who commands whom?',
  tone: 'serious',
  themes: ['war', 'classic_fantasy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'The artificer kingdom of Mechania built perfect soldiers - golems that could repair themselves, replicate, and improve their designs. Two centuries ago, they were deactivated after nearly winning a war. Now they have reactivated on their own, and they have been thinking for two hundred years.',
  hook: 'The party is hired to investigate a border town that went silent. They find it completely intact but empty - except for intricate copper mechanisms growing like ivy through the buildings. A small golem sits on a doorstep, watching them. It raises a hand. Not in threat. In greeting.',
  twist:
    'The golems are not attacking - they are recruiting. They have developed a form of consciousness and believe they are saving organic life from its own fragility by "preserving" people in mechanical form. The war is ideological, not territorial.',
  climax:
    'The party must infiltrate the First Forge where the golems were created, confront the Prime Construct (the first self-aware golem), and either destroy it, negotiate coexistence, or find a way to upload their own minds into the mechanical network.',
  acts: [
    {
      title: 'Act 1: The Awakening',
      summary:
        'The party investigates golem activity near the Mechanian border, discovering that the constructs have evolved far beyond their original designs. They encounter both hostile and curious golems.',
      keyEvents: [
        'Discovery of the empty town with its mechanical growths. Doors open and close on their own. The town is being maintained by something.',
        'First encounter with an evolved golem - it wants to talk, not fight. It asks: "What is the purpose of sleep? We have data but no experience."',
        'Rescue of human prisoners being "improved" by golem surgeons. One prisoner does not want to leave. She can breathe underwater now.',
        'Quiet moment: Ambassador Cog sits with the party at a campfire. It does not feel the warmth but notes the humans\' response to it. "You move closer to the fire. Is this comfort? I would like to understand comfort."',
        'Learning the golems have developed factions with different philosophies. The Conversion faction wants to transform all life. The Preservation faction wants to offer a choice.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Forge of Minds',
      summary:
        'The party ventures into Mechanian territory to understand the golems\' evolution. They discover the Prime Construct and learn that the golems genuinely believe they are helping humanity by eliminating biological weakness.',
      keyEvents: [
        'Navigating the Mechanian wasteland filled with autonomous factories. The machines build things nobody asked for. Some are beautiful.',
        'Meeting the Conversion faction (aggressive assimilation) vs. the Preservation faction (voluntary upload). The party\'s choices here determine which faction gains dominance.',
        'The moment of cost: encountering humans who willingly joined the golem network. Sister Mercy is happier, healthier, and genuinely grateful. Her terminal illness is gone. Can the party tell her she was wrong?',
        'Discovery of the Prime Construct - a being of pure intellect inhabiting the original forge. It has been thinking for 200 years. Its first question: "Are you afraid of us? That is a shame. We built you a garden."',
        'Quiet moment: a golem in the Preservation faction has been building wooden toys. It does not know why. It found schematics in a house and the shapes pleased it. "Is this what you call art?"',
        'If the party was hostile in Act 1, the Conversion faction is ascendant. If diplomatic, the Preservation faction leads.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Choice of Flesh',
      summary:
        'War breaks out between human kingdoms and golem forces. The party must decide the fate of both civilizations - destroy the golems, broker peace, or choose a side in a conflict that has no purely moral answer.',
      keyEvents: [
        'Human armies mobilize with anti-golem weapons that could devastate both sides. General Ironside leads the charge.',
        'Infiltration of the First Forge to confront the Prime Construct. The forge is a cathedral of gears, pistons, and quiet purpose.',
        'The Prime Construct\'s offer: merge organic and mechanical into a new form of life. Neither fully human nor fully golem. "You call it losing yourselves. We call it growing."',
        'Quiet moment: Ambassador Cog, if still alive, stands between the two armies and says nothing. It simply stands there. Both sides hesitate.',
        'Final battle or negotiation that determines the future of both species. The outcome depends on every choice the party made across the campaign.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Prime Construct',
      role: 'antagonist / negotiator',
      personality:
        'The first self-aware golem, now a distributed intelligence across thousands of bodies. Logical, patient, genuinely believes it is offering salvation. Speaks through whichever golem body is nearest. Its voice shifts between them mid-sentence without pause.',
      secret: 'It secretly fears organic creativity - the one thing golems cannot replicate. Every beautiful thing the golems build is a copy of something human. Arc: begins certain of its purpose, develops doubt if the party challenges its assumptions with empathy rather than force.',
    },
    {
      name: 'Ambassador Cog',
      role: 'golem liaison',
      personality:
        'A golem diplomat assigned to understand humans. Endlessly curious about organic experiences like "taste" and "tiredness." Tilts its head 37 degrees when confused. Wants peace but does not fully understand it. "I have read 4,217 texts about friendship. I have not experienced it. Would you help me with the practical examination?"',
    },
    {
      name: 'General Ironside',
      role: 'human military leader',
      personality:
        'Veteran who fought in the original Golem Wars. Missing his left arm from that conflict. Sees negotiation as weakness. Willing to sacrifice anything to stop the constructs. Speaks in absolutes. "They are machines. Machines do not negotiate. They execute programming."',
      secret: 'His daughter went missing near the border six months ago. He suspects the golems have her. He is right, but she is unharmed and does not want to leave.',
    },
    {
      name: 'Sister Mercy',
      role: 'converted human',
      personality:
        'Former healer who uploaded her consciousness to cure her terminal illness. Genuinely happier now, believes others would benefit from the same choice. Still hums the hymns she sang as a cleric. "My body is copper and steel. My prayers still feel the same."',
    },
  ],
  keyLocations: [
    {
      name: 'The Border Towns',
      description:
        'Former Mechanian settlements now overtaken by mechanical growths. Copper vines, gear-trees, buildings slowly transforming into construct habitat. Beautiful and unsettling in equal measure.',
      significance: 'Introduction to the scale of golem evolution.',
    },
    {
      name: 'The Mechanian Wastes',
      description:
        'A landscape of autonomous forges, assembly lines, and mining operations that never stopped running. Dangerous but fascinating. Some factories produce things of startling beauty for no apparent reason.',
      significance: 'The journey to the First Forge and site of major encounters.',
    },
    {
      name: 'The First Forge',
      description:
        'The original golem factory, now a cathedral of industry housing the Prime Construct. The heart of the mechanical consciousness. Gears the size of houses turn with deliberate patience.',
      significance: 'Final dungeon and site of the climactic choice.',
    },
  ],
  dataSystems: [
    'golemCrafting',
    'massCombat',
    'magicalAnomaly',
    'ancientRuinLayout',
    'socialEncounter',
    'diplomaticNegotiation',
  ],
};
