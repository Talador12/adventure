import type { OneShotCampaign } from '../types';

export const theForgiveness: OneShotCampaign = {
  id: 'oneshot-forgiveness',
  type: 'oneshot',
  title: 'The Forgiveness',
  tagline: 'The most wanted war criminal in the kingdom is kneeling in the town square. They are unarmed. They are weeping.',
  tone: 'serious',
  themes: ['social', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A former villain, once responsible for great suffering, surrenders to the party and asks not for mercy from the law, but for forgiveness from those they wronged. They have spent years in hiding, doing good anonymously, and have genuinely changed. The party must investigate, judge, and decide: is this person redeemed, or is this the cleverest manipulation yet?',
  hook: 'A hooded figure kneels in the square. Hands open, palms up, no weapons. The hood comes down. The party recognizes the face. Every wanted poster in every tavern for ten years. The Butcher of Calden Fields. Right here. Trembling. "I know what I am. I know what I did. I am not here to fight. I am here to answer."',
  twist: 'The villain\'s change is genuine, but forgiveness is not theirs to receive. The people they harmed are divided: some have healed and can forgive, others cannot and never will. The party must accept that redemption is not binary. The villain can be changed and still be unforgiven. Both things are true.',
  climax: 'The party brings the villain before those they wronged. Some offer forgiveness. Some offer only anger. The party must decide what justice looks like when the criminal has already become a better person than the one who committed the crime.',
  scenes: [
    {
      title: 'Scene 1: The Surrender',
      summary: 'The villain surrenders and tells their story. The party must decide whether to listen, detain, or act immediately.',
      challenge: 'social',
      keyEvents: [
        'The surrender: they kneel on the cobblestones and a crowd gathers. A woman spits. A guard draws a sword. The villain does not flinch',
        'The confession: "I burned Calden Fields. I gave the order at Thornwall. I did not stop what happened to the prisoners." No excuses. Names and dates',
        'A village elder pushes through the crowd. "This person rebuilt our bridge. Fed our children for three winters. I did not know who they were until today."',
        'The ask: not mercy from the law. They want to look the people they destroyed in the eye and say they are sorry',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Verifying the villain\'s claims. Are the good works real? Is the change genuine? Or is this an elaborate deception?',
      challenge: 'exploration',
      keyEvents: [
        'A village where the villain dug graves after a plague. The mayor says: "A stranger in a hood worked for three weeks and never asked for payment."',
        'An orphanage funded anonymously for seven years. The children draw pictures of "the quiet helper." The drawings match the villain',
        'Zone of truth: the remorse is real. Detect thoughts: they dream about the screaming every night. They have not slept well in a decade',
        'But also real: a widow who lost three sons at Calden Fields. She still cannot eat bread because the bakery reminds her of the morning they left',
      ],
    },
    {
      title: 'Scene 3: The Reckoning',
      summary: 'Bringing the villain before their victims. Not everyone can forgive. The party decides what justice means.',
      challenge: 'social',
      keyEvents: [
        'The widow stands. Silence. Then: "I forgive you. Not for your sake. For mine. Carrying this was killing me slower than you killed him."',
        'The man who lost his village: "You want forgiveness? My daughter was seven. Say her name. You do not even know it, do you?" The villain whispers a name. The right one. The man sits down and does not speak again',
        'The villain accepts both. No argument. They expected this. They stand there and take every word like blows they deserve',
        'The party pronounces judgment. Whatever they choose, the villain nods. The crowd watches. History is being made in a town square',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Penitent', role: 'the question', personality: 'Speaks slowly, deliberately, like someone who has rehearsed every sentence for years. Never raises their voice. Holds eye contact too long. Hands always visible, always open. "I have said this to myself every morning for nine years. I am saying it to you now. It does not feel different. I thought it would feel different."' },
    { name: 'Sera Oldfield', role: 'forgiver', personality: 'Grips a pendant when she speaks. Voice steady until it is not. Clears her throat twice before every sentence. "I have carried this for ten years and I am tired. I forgive you. Now get out of my sight before I change my mind."' },
    { name: 'Tam Greaves', role: 'refuser', personality: 'Does not shout. That is what makes it worse. Speaks quietly, almost gently. "My daughter liked to sing. She sang while she set the table. You do not get to feel better about that. Not ever."' },
  ],
  keyLocations: [
    { name: 'The Public Square', description: 'Where the villain surrenders. Open, visible, with nowhere to hide.', significance: 'The surrender must be public because the crimes were public.' },
    { name: 'The Communities', description: 'Villages and towns quietly rebuilt by the villain over years of anonymous service.', significance: 'Evidence of genuine change, verified by people who had no idea who helped them.' },
    { name: 'The Hall of Judgment', description: 'A neutral space where the villain faces their victims and the party delivers their verdict.', significance: 'Where forgiveness and refusal coexist and the party defines justice.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'moralDilemma', 'npcRelationship', 'courtIntrigue'],
};
