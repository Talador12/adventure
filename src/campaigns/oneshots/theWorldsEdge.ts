import type { OneShotCampaign } from '../types';

export const theWorldsEdge: OneShotCampaign = {
  id: 'oneshot-worlds-edge',
  type: 'oneshot',
  title: 'The World\'s Edge',
  tagline: 'A message in a bottle washed UP from below the edge of the world: "We are beneath you. We have been trying to reach you for a thousand years. Please come down."',
  tone: 'epic',
  themes: ['epic', 'exploration', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 8,
  estimatedHours: 3,
  settingSummary:
    'The world ends at the Precipice - a cliff face where reality simply stops. Beyond it: void. Or so everyone believes. The party has traveled to the edge after receiving a message in a bottle that washed UP from below the Precipice. Someone is out there. The party steps off the edge and discovers what lies beyond the world.',
  hook: 'The message in the bottle reads: "We are beneath the edge. The world continues. It is inverted. Everything you know is the ceiling of our sky. We have been trying to reach you for a thousand years. Please come down. We need help."',
  twist: 'The world is not flat with an edge. It is a sphere, and the "Precipice" is an artificial barrier erected by ancient mages to prevent the two halves from knowing about each other. The "underworld" is another civilization on the opposite hemisphere. The barrier is failing, and when it collapses, both civilizations will see each other for the first time - with no preparation.',
  climax: 'The party stands at the mechanism that maintains the barrier. The underworld civilization begs them to drop it. Their world is dying without sunlight and the barrier blocks it. But dropping the barrier means two civilizations - one that thinks it is alone in the world - suddenly discovering the other exists. The party decides: maintain the lie that keeps one world alive, or reveal the truth that might cause war.',
  scenes: [
    {
      title: 'Scene 1: The Edge',
      summary: 'Reaching the Precipice and making the decision to step off into the unknown.',
      challenge: 'exploration',
      keyEvents: [
        'The Precipice: the ground stops. Mid-sentence, mid-stone, as if cut with a knife. Beyond it, nothing. Wind screams upward from below.',
        'The message: a glass bottle sealed with wax so old it has turned black. The handwriting inside is shaky but legible. The paper smells of salt.',
        'The step: the party jumps. For three heartbeats, there is nothing. Then gravity grabs them sideways, then upward, and they land on solid ground facing the wrong way.',
        'The inversion: they are standing on the underside of the world. Their sky is above them. This sky is below. A pale woman stares at them with tears running down her face. "You came."',
      ],
    },
    {
      title: 'Scene 2: The Underworld',
      summary: 'Meeting the civilization beneath the world. Understanding their plight. Discovering the barrier.',
      challenge: 'social',
      keyEvents: [
        'The people: pale, adapted to dim light, living in a civilization that mirrors the surface',
        'Their history: they know the surface exists but have never reached it - the barrier stops them',
        'The dying: without direct sunlight, their crops fail and their magic weakens every generation',
        'The barrier mechanism: ancient, failing, located in the space between the two worlds',
      ],
    },
    {
      title: 'Scene 3: The Mechanism',
      summary: 'The barrier. The choice. Two worlds hanging in the balance.',
      challenge: 'social',
      keyEvents: [
        'The mechanism: a vast magical construct in the void between worlds, crumbling after millennia',
        'The argument for dropping it: the underworld dies without sunlight, the barrier is failing anyway',
        'The argument for maintaining it: two civilizations meeting without preparation could mean war',
        'The decision: drop the barrier (save the underworld, risk war), maintain it (condemn them, preserve peace), or find a third option',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Keeper Asha', role: 'underworld leader', personality: 'Leader of the underworld civilization. Has spent her life trying to reach the surface. Desperate, diplomatic, and aware that her request might cause a catastrophe.' },
    { name: 'The Bottlemaker', role: 'first contact', personality: 'The underworld scholar who sent the message in a bottle. Elderly, patient, and has been throwing bottles into the void for thirty years. "I never stopped believing someone would answer."' },
    { name: 'Guardian Mael', role: 'barrier keeper', personality: 'A magical construct left to maintain the barrier. Running low on power. It does not want the barrier to fail but cannot prevent it much longer.' },
  ],
  keyLocations: [
    { name: 'The Precipice', description: 'The edge of the known world. A cliff where ground becomes void. Wind howls upward from below.', significance: 'Where the party steps off into the unknown.' },
    { name: 'The Inverted Land', description: 'A civilization living on the underside of the world. Dim light, pale crops, and a people who look up at the same sky from the other side.', significance: 'The civilization that needs saving.' },
    { name: 'The Barrier Mechanism', description: 'A vast magical construct floating in the void between the two halves of the world. Ancient, failing, and holding two civilizations apart.', significance: 'Where the final choice is made.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
