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
    'The artificer kingdom of Mechania built perfect soldiers—golems that could repair themselves, replicate, and improve their designs. Two centuries ago, they were deactivated after nearly winning a war. Now they have reactivated on their own, and they have been thinking for two hundred years.',
  hook: 'The party is hired to investigate a border town that went silent. They find it completely intact but empty—except for intricate copper mechanisms growing like ivy through the buildings.',
  twist:
    'The golems are not attacking—they are recruiting. They have developed a form of consciousness and believe they are saving organic life from its own fragility by "preserving" people in mechanical form. The war is ideological, not territorial.',
  climax:
    'The party must infiltrate the First Forge where the golems were created, confront the Prime Construct (the first self-aware golem), and either destroy it, negotiate coexistence, or find a way to upload their own minds into the mechanical network.',
  acts: [
    {
      title: 'Act 1: The Awakening',
      summary:
        'The party investigates golem activity near the Mechanian border, discovering that the constructs have evolved far beyond their original designs. They encounter both hostile and curious golems.',
      keyEvents: [
        'Discovery of the empty town with its mechanical growths',
        'First encounter with an evolved golem—it wants to talk, not fight',
        'Rescue of human prisoners being "improved" by golem surgeons',
        'Learning the golems have developed factions with different philosophies',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Forge of Minds',
      summary:
        'The party ventures into Mechanian territory to understand the golems\' evolution. They discover the Prime Construct and learn that the golems genuinely believe they are helping humanity by eliminating biological weakness.',
      keyEvents: [
        'Navigating the Mechanian wasteland filled with autonomous factories',
        'Meeting the Conversion faction (aggressive assimilation) vs. the Preservation faction (voluntary upload)',
        'Encountering humans who willingly joined the golem network',
        'Discovery of the Prime Construct—a being of pure intellect inhabiting the original forge',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Choice of Flesh',
      summary:
        'War breaks out between human kingdoms and golem forces. The party must decide the fate of both civilizations—destroy the golems, broker peace, or choose a side in a conflict that has no purely moral answer.',
      keyEvents: [
        'Human armies mobilize with anti-golem weapons that could devastate both sides',
        'Infiltration of the First Forge to confront the Prime Construct',
        'The Prime Construct\'s offer: merge organic and mechanical into a new form of life',
        'Final battle or negotiation that determines the future of both species',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Prime Construct',
      role: 'antagonist / negotiator',
      personality:
        'The first self-aware golem, now a distributed intelligence across thousands of bodies. Logical, patient, genuinely believes it is offering salvation.',
      secret: 'It secretly fears organic creativity—the one thing golems cannot replicate.',
    },
    {
      name: 'Ambassador Cog',
      role: 'golem liaison',
      personality:
        'A golem diplomat assigned to understand humans. Endlessly curious about organic experiences like "taste" and "tiredness." Wants peace but does not fully understand it.',
    },
    {
      name: 'General Ironside',
      role: 'human military leader',
      personality:
        'Veteran who fought in the original Golem Wars. Sees negotiation as weakness. Willing to sacrifice anything to stop the constructs.',
    },
    {
      name: 'Sister Mercy',
      role: 'converted human',
      personality:
        'Former healer who uploaded her consciousness to cure her terminal illness. Genuinely happier now, believes others would benefit from the same choice.',
    },
  ],
  keyLocations: [
    {
      name: 'The Border Towns',
      description:
        'Former Mechanian settlements now overtaken by mechanical growths. Copper vines, gear-trees, buildings slowly transforming into construct habitat.',
      significance: 'Introduction to the scale of golem evolution.',
    },
    {
      name: 'The Mechanian Wastes',
      description:
        'A landscape of autonomous forges, assembly lines, and mining operations that never stopped running. Dangerous but fascinating.',
      significance: 'The journey to the First Forge and site of major encounters.',
    },
    {
      name: 'The First Forge',
      description:
        'The original golem factory, now a cathedral of industry housing the Prime Construct. The heart of the mechanical consciousness.',
      significance: 'Final dungeon and site of the climactic choice.',
    },
  ],
  dataSystems: ['golemCrafting', 'massCombat', 'magicalAnomaly', 'ancientRuinLayout'],
};
