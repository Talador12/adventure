import type { OneShotCampaign } from '../types';

export const theApology: OneShotCampaign = {
  id: 'oneshot-apology',
  type: 'oneshot',
  title: 'The Apology',
  tagline: 'A warlord wants to apologize to the village he destroyed thirty years ago. He is sincere. They are not interested.',
  tone: 'social',
  themes: ['social', 'political', 'war'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Warlord Kael Ironhand, now old and dying, wants to apologize to Ashenmere, the village he burned thirty years ago. The village was rebuilt. The scars remain. He arrives with no army, no weapons, and genuine remorse. The village wants him dead. The party mediates.',
  hook: 'An old man in plain clothes walks into Ashenmere and kneels in the town square. "My name is Kael Ironhand. Thirty years ago, I burned this village. I killed your families. I have come to apologize. I will accept whatever judgment you give." The crowd reaches for stones.',
  twist:
    'Kael\'s second-in-command, who actually gave the order to burn the village (Kael ordered capture, not destruction), is now a wealthy merchant funding Ashenmere\'s reconstruction. He has been paying guilt money anonymously for decades. If Kael\'s apology is accepted, the truth about the second-in-command comes out, and the village loses its benefactor.',
  climax:
    'The village must choose: accept Kael\'s apology (and lose the merchant\'s secret funding), reject it (and Kael dies in the square), or the party finds a third path that gives the village truth and survival.',
  scenes: [
    {
      title: 'Scene 1: The Arrival',
      summary: 'Kael kneels. The village erupts. The party must prevent an immediate execution and create space for dialogue.',
      challenge: 'social',
      keyEvents: [
        'Kael kneels unarmed. The crowd is furious. Stones are thrown.',
        'The village elder demands order. She lost her husband in the burning.',
        'The party is asked to mediate. Guard Kael. Keep the peace.',
        'Kael speaks to anyone who will listen. His remorse is real.',
      ],
    },
    {
      title: 'Scene 2: The Hearing',
      summary: 'A village hearing. Survivors speak. Kael listens. The party manages the emotional temperature of a room full of trauma.',
      challenge: 'social',
      keyEvents: [
        'Survivors tell their stories. A woman whose children burned. A man who lost everything.',
        'Kael does not defend himself. He absorbs it all.',
        'The party discovers discrepancies: Kael ordered capture, not burning. Who gave the kill order?',
        'The wealthy merchant (Kael\'s former second) is in the crowd, sweating.',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary: 'The full truth surfaces. The village faces an impossible choice. The party helps them find a way forward.',
      challenge: 'social',
      keyEvents: [
        'The second-in-command is exposed. He has been funding the village from guilt.',
        'If the village accepts Kael, the merchant flees and the funding stops.',
        'If they reject Kael, the lie continues and the money keeps coming.',
        'The party must find a resolution that gives Ashenmere truth AND a future.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Kael Ironhand',
      role: 'penitent warlord',
      personality: 'Old, broken, sincere. Has spent thirty years carrying guilt. He does not ask for forgiveness, only the chance to apologize. He will accept death if that is the judgment.',
    },
    {
      name: 'Elder Vara',
      role: 'village leader',
      personality: 'Lost her husband in the burning. Rebuilt the village with her bare hands. Furious but fair. She will not let the mob kill Kael, but she will not forgive him either.',
    },
    {
      name: 'Merchant Davin Holt',
      role: 'former second-in-command / anonymous benefactor',
      personality: 'Wealthy, generous to Ashenmere, and terrified. He gave the burn order. He has been paying for it in gold. He does not want to pay in blood.',
      secret: 'He gave the order because he panicked when the villagers fought back. It was cowardice, not malice.',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenmere',
      description: 'A rebuilt village with scorch marks still visible on the oldest stones. Beautiful, thriving, and haunted.',
      significance: 'Every person here has a reason to hate Kael. The party must navigate all of them.',
    },
  ],
  dataSystems: ['moraleTracker', 'factionReputation', 'npcGenerator'],
};
