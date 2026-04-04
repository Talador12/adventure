import type { OneShotCampaign } from '../types';

export const theInfiniteInn: OneShotCampaign = {
  id: 'oneshot-infinite-inn',
  type: 'oneshot',
  title: 'The Infinite Inn',
  tagline: 'You checked in. Checkout is proving difficult.',
  tone: 'mystery',
  themes: ['mystery', 'horror', 'planar'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'The party checks into a cozy roadside inn for the night. When they wake up, the doors lead to different rooms instead of outside. Every hallway loops. New rooms appear. The inn is growing. Other guests have been trapped here for what they think is days — some for what might be years. The innkeeper insists nothing is wrong and breakfast is at 8.',
  hook: 'A warm inn on a cold night. Good food, soft beds, a friendly innkeeper. The party sleeps well for the first time in weeks. They wake up and the door to their room opens onto a hallway they\'ve never seen. The window shows a different landscape than last night. The innkeeper says good morning and pours coffee.',
  twist:
    'The inn is a mimic. Not a chest mimic — a building-sized elder mimic that traps travelers to feed on their life force slowly over decades. The "innkeeper" is its lure — a psychic projection that keeps guests calm. The guests who\'ve been here "for days" have been here for years. They don\'t age because the mimic preserves its food.',
  climax:
    'The party finds the mimic\'s heart — a pulsing mass behind the walls of the deepest room. They can destroy it (the inn collapses, everyone inside must escape in 60 seconds), negotiate (the mimic is intelligent and willing to make a deal — it releases the party if they send other travelers), or find a way to cure its hunger (a druid could theoretically transform it into a normal building).',
  scenes: [
    {
      title: 'Scene 1: Morning Disorientation',
      summary:
        'The party realizes something is wrong. Doors don\'t go where they should. Other guests are disturbingly calm. The innkeeper is aggressively hospitable.',
      challenge: 'exploration',
      keyEvents: [
        'Doors lead to wrong rooms — the hallway has changed overnight',
        'Meeting the long-term guests — they think it\'s been a few days (it hasn\'t)',
        'The innkeeper deflects all questions — "More toast? The jam is homemade."',
        'A new room appears while they\'re watching — the inn is growing',
      ],
    },
    {
      title: 'Scene 2: Into the Walls',
      summary:
        'Investigation reveals the inn is alive. The walls are warm. The floorboards pulse. Something is digesting very slowly. The party must navigate the inn\'s impossible geometry to find answers.',
      challenge: 'exploration',
      keyEvents: [
        'The walls bleed when cut — and heal immediately',
        'A long-term guest finally cracks — "I checked in in 1387. It\'s not 1387 anymore, is it?"',
        'The innkeeper drops the act briefly — "Please don\'t leave. It gets so lonely."',
        'Discovery of the deepest room — a door that wasn\'t there before, leading down',
      ],
    },
    {
      title: 'Scene 3: The Heart',
      summary:
        'The party descends into the inn\'s core. The architecture becomes increasingly organic. The mimic\'s heart pulses at the center. The decision determines the fate of everyone inside.',
      challenge: 'combat',
      keyEvents: [
        'The descent — hallways become corridors become tunnels become arteries',
        'The heart chamber — a pulsing organic mass connected to every room',
        'The mimic speaks through the innkeeper: "I just wanted company"',
        'The choice: destroy, negotiate, or transform',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Innkeeper',
      role: 'lure / sympathetic antagonist',
      personality:
        'Warm, welcoming, always has fresh bread. A psychic projection of the mimic that genuinely wants its guests to be happy. Becomes desperate and sad when threatened.',
      secret: 'The projection has developed its own personality over centuries. It doesn\'t want to hurt people — but it can\'t stop feeding.',
    },
    {
      name: 'Eldon Marsh',
      role: 'trapped guest / ally',
      personality:
        'A traveling merchant who thinks he checked in last Tuesday. He checked in 40 years ago. Still optimistic. "The roads must be flooded! I\'m sure we\'ll be out tomorrow."',
    },
    {
      name: 'Vera',
      role: 'trapped guest / broken',
      personality:
        'A ranger who figured out the truth decades ago. She\'s tried everything to escape. She\'s given up. She tends a garden in a room that shouldn\'t exist. The garden is beautiful.',
      secret: 'She found the heart years ago and couldn\'t bring herself to destroy it. The mimic showed her mercy once, and she can\'t forget that.',
    },
  ],
  keyLocations: [
    {
      name: 'The Common Room',
      description:
        'A perfectly cozy inn common room. Fire crackling, food warm, ale cold. Suspiciously perfect.',
      significance: 'Where the party starts and the guests gather.',
    },
    {
      name: 'The Infinite Hallway',
      description:
        'A corridor that loops, branches, and grows. New doors appear. Some open to impossible places — a beach, a mountaintop, a void.',
      significance: 'The primary exploration environment.',
    },
    {
      name: 'The Heart Chamber',
      description:
        'A room deep below where the inn\'s organic core pulses. Walls are flesh. The ceiling breathes. It\'s warm.',
      significance: 'Where the final confrontation and decision take place.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'puzzleLock',
    'magicalAnomaly',
    'pocketDimension',
    'trapDisarm',
    'npcBackstoryGen',
  ],
};
