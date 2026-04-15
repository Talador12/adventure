import type { OneShotCampaign } from '../types';

export const driftwood: OneShotCampaign = {
  id: 'oneshot-driftwood',
  type: 'oneshot',
  title: 'Driftwood',
  tagline: 'A raft. No land. Something circling below. The water is patient. You are not.',
  tone: 'survival',
  themes: ['survival', 'nautical'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Shipwreck survivors clinging to a raft of lashed-together debris. No land visible in any direction. The sun is brutal. Water supply is a single cask. And something large is circling beneath the raft, bumping it gently, testing it.',
  hook: 'The party wakes on wreckage. The ship is gone. The horizon is empty in every direction. The raft holds. For now. Then something nudges the wood from below, and the raft tilts.',
  twist:
    'The creature below is not hunting them. It is herding them. A sea hag lives on a submerged reef nearby and uses the creature to drive shipwreck survivors to her domain, where she trades rescue for years of servitude.',
  climax:
    'The hag surfaces and offers the deal: she will guide them to land if each party member gives her one year of their life. Refuse, and the creature smashes the raft. Accept, and she keeps her word but the year is literal. Clever parties can negotiate, trick her, or fight on the open water.',
  scenes: [
    {
      title: 'Scene 1: Adrift',
      summary: 'Survival on the raft. Sun exposure, dehydration, rationing, and the thing below.',
      challenge: 'exploration',
      keyEvents: [
        'Inventory: one water cask, rope, a fishing hook, driftwood, and the clothes on their backs.',
        'The sun is relentless. Dehydration begins. Constitution saves each hour.',
        'Something bumps the raft. Large. Deliberate. Then silence.',
        'A dead sailor surfaces nearby. His pockets hold a waterlogged map.',
      ],
    },
    {
      title: 'Scene 2: The Herding',
      summary: 'The creature gets aggressive, pushing the raft in a specific direction. The party realizes they are being steered.',
      challenge: 'combat',
      keyEvents: [
        'The creature rams the raft, cracking a beam. Repairs needed or they sink.',
        'It pushes them northeast. Always northeast. Not attacking, directing.',
        'A reef appears below. Structures visible underwater. Someone lives down there.',
        'The creature surfaces briefly: a massive eel, barnacle-crusted, one eye replaced with a glowing stone.',
      ],
    },
    {
      title: 'Scene 3: The Hag\'s Bargain',
      summary: 'The sea hag surfaces with an offer. Freedom for servitude. The party must negotiate, fight, or outwit a creature on her home turf.',
      challenge: 'social',
      keyEvents: [
        'The hag rises from the water. Pleasant. Smiling. Offering warm food and dry land.',
        'The price: one year of life per person. She drains it through a handshake.',
        'Negotiation is possible. She collects favors. Perhaps a specific task instead.',
        'If they fight, the eel attacks and the hag controls the current. Bad odds on open water.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Mara Reedfang',
      role: 'sea hag / antagonist',
      personality: 'Grandmotherly, patient, speaks slowly. She has been collecting castaways for decades. Genuinely enjoys conversation. Also genuinely drains life force.',
      secret: 'She is building something on the reef with the stolen years. A coral palace that lives.',
    },
    {
      name: 'The Leviathan Eel',
      role: 'creature / obstacle',
      personality: 'Not sentient. A trained beast. Responds to the hag\'s commands. Will not kill unless ordered but will absolutely destroy the raft.',
    },
  ],
  keyLocations: [
    {
      name: 'The Raft',
      description: 'Lashed driftwood and a broken mast. Barely holds together. Home for now.',
      significance: 'The entire first two acts. Lose the raft, lose everything.',
    },
    {
      name: 'The Sunken Reef',
      description: 'A coral reef just below the surface, with unnatural structures built from ship wreckage and living coral.',
      significance: 'The hag\'s domain. Where the bargain happens.',
    },
  ],
  dataSystems: ['survivalTracker', 'shipwreckSurvival', 'combatNarration', 'npcGenerator'],
};
