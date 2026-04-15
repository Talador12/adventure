import type { OneShotCampaign } from '../types';

export const theForgottenWitness: OneShotCampaign = {
  id: 'oneshot-forgotten-witness',
  type: 'oneshot',
  title: 'The Forgotten Witness',
  tagline: 'She saw the murder. Then someone erased her memory. Piece it back together before the killer strikes again.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A woman named Hessa witnessed a murder three nights ago. A Modify Memory spell wiped the event from her mind. But memory magic is imperfect. Fragments remain: a color, a smell, a feeling of terror. The party must reconstruct her memory using these fragments before the killer erases more witnesses.',
  hook: 'Hessa grabs the party in the street, crying: "I saw something. I know I saw something. But I cannot remember what. There is blood under my fingernails and I do not know why. Please help me remember."',
  twist:
    'The killer is Hessa\'s husband. She witnessed him killing his business partner. He cast Modify Memory on her himself. He is attentive, caring, and helping the party investigate - subtly steering them away from the truth.',
  climax:
    'The party reconstructs enough of the memory to identify the killer. The husband realizes they know and drops the caring facade. Hessa\'s full memory returns in a flood. She must choose: protect her husband or deliver justice.',
  scenes: [
    {
      title: 'Scene 1: The Fragments',
      summary: 'Working with Hessa to pull memory fragments. Colors, sounds, emotions. Each one is a puzzle piece.',
      challenge: 'puzzle',
      keyEvents: [
        'Fragment 1: the color red. Not blood. A red cloak. The killer wore red.',
        'Fragment 2: a smell. Forge smoke. The scene was near a smithy.',
        'Fragment 3: a sound. A voice she knows but cannot place. Familiar. Safe. Wrong.',
        'The husband arrives, concerned. He offers to help. He is very helpful.',
      ],
    },
    {
      title: 'Scene 2: The Scene',
      summary: 'Following the fragments to the murder location. Evidence aligns with Hessa\'s broken memories.',
      challenge: 'exploration',
      keyEvents: [
        'The smithy district. Blood traces in an alley. Hessa trembles but cannot explain why.',
        'The victim: the husband\'s business partner. Reported missing, not yet found dead.',
        'The red cloak: the husband owns one. He says he lost it. Convenient.',
        'The husband steers the investigation toward a rival merchant. Smooth. Natural. Practiced.',
      ],
    },
    {
      title: 'Scene 3: The Memory',
      summary: 'The full memory returns. The husband is exposed. Hessa shatters. The party must resolve both the crime and the fallout.',
      challenge: 'social',
      keyEvents: [
        'A trigger: Hessa hears the husband say something the killer said. The dam breaks.',
        'Full memory: she saw her husband stab his partner. He turned and cast the spell on her.',
        'The husband confesses. The partner was blackmailing him. He saw no other way.',
        'Hessa\'s choice: testimony or silence. The party influences but cannot decide for her.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Hessa Maren',
      role: 'witness / victim',
      personality: 'Frightened, fragmented, fighting to reclaim her own mind. She knows something is wrong. She trusts her husband. Both cannot be true.',
    },
    {
      name: 'Carlen Maren',
      role: 'husband / killer',
      personality: 'Warm, supportive, and lying with every breath. He loves Hessa. He also killed a man and erased her memory. He is genuinely torn.',
      secret: 'The blackmail was about a crime Carlen committed years ago. He has been paying for decades. He snapped.',
    },
  ],
  keyLocations: [
    {
      name: 'The Smithy Alley',
      description: 'A narrow alley behind a forge. Blood stains on the cobblestones. The smell of smoke and iron.',
      significance: 'The murder scene. Where the fragments lead.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
