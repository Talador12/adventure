import type { OneShotCampaign } from '../types';

export const theForgiveness: OneShotCampaign = {
  id: 'oneshot-forgiveness',
  type: 'oneshot',
  title: 'The Forgiveness',
  tagline: 'A villain wants forgiveness. They have changed. The party must decide if redemption is possible.',
  tone: 'serious',
  themes: ['social', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A former villain, once responsible for great suffering, surrenders to the party and asks not for mercy from the law, but for forgiveness from those they wronged. They have spent years in hiding, doing good anonymously, and have genuinely changed. The party must investigate, judge, and decide: is this person redeemed, or is this the cleverest manipulation yet?',
  hook: 'A hooded figure kneels before the party in a public square. They remove their hood. The face is immediately recognizable: the warlord, the necromancer, the tyrant. Someone the party (or the world) has reason to hate. "I am not here to fight. I am here to answer for what I did. All I ask is that you listen before you judge."',
  twist: 'The villain\'s change is genuine, but forgiveness is not theirs to receive. The people they harmed are divided: some have healed and can forgive, others cannot and never will. The party must accept that redemption is not binary. The villain can be changed and still be unforgiven. Both things are true.',
  climax: 'The party brings the villain before those they wronged. Some offer forgiveness. Some offer only anger. The party must decide what justice looks like when the criminal has already become a better person than the one who committed the crime.',
  scenes: [
    {
      title: 'Scene 1: The Surrender',
      summary: 'The villain surrenders and tells their story. The party must decide whether to listen, detain, or act immediately.',
      challenge: 'social',
      keyEvents: [
        'The surrender: public, voluntary, with no weapons and no defenses',
        'The confession: a full accounting of crimes committed, without excuse or deflection',
        'The claim of change: years of anonymous good works, verified by communities that benefited',
        'The ask: not legal mercy, but the chance to apologize to those they harmed',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Verifying the villain\'s claims. Are the good works real? Is the change genuine? Or is this an elaborate deception?',
      challenge: 'exploration',
      keyEvents: [
        'Communities visited: the villain rebuilt bridges, funded orphanages, healed the sick anonymously',
        'The evidence is real: people who benefited had no idea who their benefactor was',
        'A detect thoughts or zone of truth confirms: the remorse and change are genuine',
        'But: the scars left by their crimes are also genuine. Families destroyed. Lives ended',
      ],
    },
    {
      title: 'Scene 3: The Reckoning',
      summary: 'Bringing the villain before their victims. Not everyone can forgive. The party decides what justice means.',
      challenge: 'social',
      keyEvents: [
        'A widow who lost her husband forgives: "Carrying this hate was killing me. I am done."',
        'A man who lost his village refuses: "You cannot undo what you did. Changed or not."',
        'The villain accepts both responses without argument. They expected this',
        'The party pronounces judgment: exile, service, imprisonment, freedom, or something new',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Penitent', role: 'the question', personality: 'A former villain who has genuinely changed but cannot change the past. They do not minimize their crimes. They do not beg. They simply present who they were and who they are and ask the party to reconcile the two.' },
    { name: 'Sera Oldfield', role: 'forgiver', personality: 'A widow whose husband was killed by the villain\'s forces. She has made peace with her grief and is ready to forgive, not for the villain\'s sake, but for her own.' },
    { name: 'Tam Greaves', role: 'refuser', personality: 'A man whose entire village was destroyed. He cannot forgive and will not pretend. "Change does not bring back the dead. Regret does not rebuild homes."' },
  ],
  keyLocations: [
    { name: 'The Public Square', description: 'Where the villain surrenders. Open, visible, with nowhere to hide.', significance: 'The surrender must be public because the crimes were public.' },
    { name: 'The Communities', description: 'Villages and towns quietly rebuilt by the villain over years of anonymous service.', significance: 'Evidence of genuine change, verified by people who had no idea who helped them.' },
    { name: 'The Hall of Judgment', description: 'A neutral space where the villain faces their victims and the party delivers their verdict.', significance: 'Where forgiveness and refusal coexist and the party defines justice.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'moralDilemma', 'npcRelationship', 'courtIntrigue'],
};
