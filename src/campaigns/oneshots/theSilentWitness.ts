import type { OneShotCampaign } from '../types';

export const theSilentWitness: OneShotCampaign = {
  id: 'oneshot-silent-witness',
  type: 'oneshot',
  title: 'The Silent Witness',
  tagline: '"Did you see the murder?" The sword pulses. Yes. "Can you tell us who?" A different pulse. No. Twenty questions to solve a murder.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A merchant is found dead, run through with a sentient longsword. The sword, named Veritas, witnessed the murder. But its enchantment restricts it to yes-or-no answers only. The party must solve the crime by asking the right questions to a witness that cannot elaborate.',
  hook: 'The guard captain unsheathes the bloody sword. It hums. "Did you see the murder?" A faint pulse of light. Yes. "Can you tell us who did it?" Nothing. Then a different pulse. No. "Why not?" Nothing. The captain turns to the party: "It can only say yes or no. Make your questions count."',
  twist:
    'The sword saw two people at the scene. The killer and someone who arrived after, found the body, panicked, and pulled the sword out - contaminating the scene. The second person is the one who reported the murder and is considered the primary witness. They are innocent but have been lying about when they arrived.',
  climax:
    'Through careful questioning, the party identifies both the killer and the contaminating witness. The witness confesses to tampering with the scene out of fear. The real killer is the victim\'s apprentice, who thought the sentient sword would not be able to testify.',
  scenes: [
    {
      title: 'Scene 1: Twenty Questions',
      summary: 'The party interrogates a sword that can only say yes or no. Every question must be precise.',
      challenge: 'puzzle',
      keyEvents: [
        '"Was the killer male?" Yes. "Was the killer known to the victim?" Yes.',
        '"Was the killer a family member?" No. "A business associate?" Yes.',
        '"Were there other people present?" Yes. This surprises everyone.',
        '"Did the second person kill the victim?" No. "Did they touch you?" Yes.',
      ],
    },
    {
      title: 'Scene 2: The Suspects',
      summary: 'Armed with the sword\'s answers, the party investigates the victim\'s business associates and the scene witness.',
      challenge: 'exploration',
      keyEvents: [
        'Three business associates: the apprentice, a supplier, and a debtor.',
        'The witness (the one who reported it) is nervous. Story has inconsistencies.',
        '"Did the witness arrive before or after the murder?" After. But their story says during.',
        'The apprentice has an alibi. It does not hold up under scrutiny.',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary: 'Confronting both the witness and the killer. The sword confirms the final deduction.',
      challenge: 'social',
      keyEvents: [
        'The witness breaks: "I found him dead. I pulled the sword out. I panicked."',
        'The apprentice is cornered. His alibi crumbles.',
        'Final confirmation: "Was the apprentice the one who killed your wielder?" Yes.',
        'The sword pulses one final time. Satisfied. Justice done.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Veritas',
      role: 'sentient sword / witness',
      personality: 'A longsword enchanted with truth magic. It wants justice but can only express itself in yes-or-no pulses of light. Frustrated by its limitation. Relieved when asked the right question.',
    },
    {
      name: 'Daven Holt',
      role: 'apprentice / killer',
      personality: 'Young, nervous, and convinced he covered his tracks. He thought killing his master with Veritas was poetic justice. He did not know the sword was a witness.',
      secret: 'The master was stealing Daven\'s inventions and selling them under his own name. Motive: justice, executed unjustly.',
    },
  ],
  keyLocations: [
    {
      name: 'The Victim\'s Workshop',
      description: 'A craftsman\'s workshop with blood on the floor, a sentient sword on the evidence table, and too many suspects.',
      significance: 'The crime scene and interrogation room.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator'],
};
