import type { OneShotCampaign } from '../types';

export const theFamiliarFace: OneShotCampaign = {
  id: 'oneshot-familiar-face',
  type: 'oneshot',
  title: 'The Familiar Face',
  tagline: 'An NPC looks exactly like a party member. Same face. Same voice. Same scar. They have existed here for 30 years.',
  tone: 'horror',
  themes: ['horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The party arrives in a town and a local approaches one party member with familiarity. "You look just like Aldren." They go to meet Aldren. He is identical. Same face, same voice, same scar the party member got at age 12. But Aldren has lived in this town for 30 years. He has a family, a job, a life. He is not a copy. The question is: who is the original?',
  hook: 'Aldren opens his door. The party member stares. It is a mirror. Same jawline, same eye color, same crooked tooth. Aldren stares back. "Well. That is unsettling." His wife looks between them. "Aldren, is this a relative?" Aldren: "I do not have relatives."',
  twist: 'Neither is the copy. Both are original. Thirty years ago, a rift between planes split a single soul into two bodies in two different locations. Both lived full lives from that point. Both have genuine memories, genuine experiences, and genuine identities. Neither is more real than the other. But a split soul is unstable. The two halves are being pulled back together. If they are in the same place too long, one will absorb the other.',
  climax: 'The merging begins: both start losing memories, skills, and personality traits that bleed into the other. The party must find the original rift and seal it to stabilize both halves, or accept that one will cease to exist, absorbed into the other.',
  scenes: [
    {
      title: 'Scene 1: The Meeting',
      summary: 'The party member meets their double. The resemblance is total. The horror is existential, not physical.',
      challenge: 'social',
      keyEvents: [
        'The double: identical appearance, voice, mannerisms, and the scar from age 12',
        'Aldren has a family, a business, and 30 years of memories in this town',
        'The party member has their own life, equally real, equally valid',
        'Neither remembers anything before approximately the same date 30 years ago',
      ],
    },
    {
      title: 'Scene 2: The Merging',
      summary: 'Proximity triggers the soul merging. Both start experiencing memory bleed. The party member remembers Aldren\'s wedding. Aldren remembers the party member\'s adventures.',
      challenge: 'puzzle',
      keyEvents: [
        'Memory bleed: the party member recalls Aldren\'s children\'s names. Aldren knows party details',
        'Skill transfer: Aldren suddenly knows how to swing a sword. The party member forgets a spell',
        'Physical effects: one starts fading, becoming translucent, as the other becomes more solid',
        'A sage identifies the phenomenon: soul bifurcation, caused by a planar rift 30 years ago',
      ],
    },
    {
      title: 'Scene 3: The Rift',
      summary: 'Finding and sealing the rift that split the soul. Both halves must survive or one will be absorbed.',
      challenge: 'combat',
      keyEvents: [
        'The rift: hidden in a cave outside town, still active, leaking planar energy',
        'Guardians: entities that emerged from the rift and have been dormant for decades',
        'Sealing the rift stabilizes both halves but they must remain separated afterward',
        'The farewell: Aldren and the party member, two halves of the same person, who can never meet again',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Aldren', role: 'the double', personality: 'Finishes the party member\'s sentences without meaning to. Reaches for his face to check it is still his. "I am not a copy. I have a wife. I have children. I built a house with these hands." He holds up his hands. They are identical to the party member\'s. Same calluses. Same crooked finger. He stares at them like they might not be his anymore.' },
    { name: 'Aldren\'s Wife (Senna)', role: 'the stakes', personality: 'Stands between Aldren and the party member like a wall. Arms crossed. "This morning he called me a name I have never heard. Then he forgot where our bedroom was. Then he was fine. Then he looked at me and said, \'Who are you?\' for one second before he remembered." Her voice cracks. "He is disappearing. Something is eating him from the inside and replacing him with your friend."' },
    { name: 'Sage Theren', role: 'information', personality: 'Drops the book she is holding when she sees them together. Backs up two steps. "Do not stand next to each other. Separate. Now." Pulls out a diagram. Hands shaking. "Soul bifurcation. One soul, two bodies, split by a planar rift. Both original. Neither a copy. But a soul is not meant to exist in two places. Proximity accelerates the merge. One of them will absorb the other. I cannot tell you which one."' },
  ],
  keyLocations: [
    { name: 'The Town', description: 'A normal town where Aldren has lived for 30 years, building a life that is as real as the party member\'s.', significance: 'Where the existential horror plays out in a domestic setting.' },
    { name: 'Aldren\'s Home', description: 'A family house belonging to the party member\'s double, full of 30 years of a life the party member never lived.', significance: 'Where the merging becomes personal and the stakes become clear.' },
    { name: 'The Planar Rift', description: 'A cave outside town where a rift between planes split a soul 30 years ago and still leaks energy.', significance: 'Where the party must go to save both halves of a divided person.' },
  ],
  dataSystems: ['planarTravel', 'combatNarration', 'puzzleLock', 'socialEncounter', 'monsterLore'],
};
