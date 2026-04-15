import type { FullCampaign } from '../types';

export const retirementHome: FullCampaign = {
  id: 'full-retirement-home',
  type: 'full',
  title: 'Retirement Home',
  tagline: 'You survived the Demon Wars. You toppled the Lich King. You are not prepared for bingo night.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'mystery'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 8, end: 12 },
  estimatedSessions: 10,
  settingSummary:
    'Sunset Blades is a gated retirement community for ex-adventurers. It has a pool (warded against scrying), a shuffleboard court (enchanted for slow-motion replays), and a dining hall that serves all food at healing-potion temperature. The residents are former heroes, now elderly, still armed, and absolutely insufferable. The party has just moved in. The median age of their neighbors is 137. Everyone has a legendary weapon. Nobody can find the remote.',
  hook: 'The party arrives at Sunset Blades as new residents. Move-in day is chaos: a retired fighter keeps challenging the movers to duels, a former wizard with dementia accidentally casts Fireball at the welcome banner, and a rogue resident has already stolen three sets of dentures from the front desk. The community manager, a young half-elf named Daisy, is in over her head. Then someone reports that gold has gone missing from the communal vault. Daisy begs the party to investigate quietly. "Quietly" is not in this community\'s vocabulary.',
  twist:
    'The thief is not stealing for greed. Rupert, a retired paladin with early-stage memory loss, has been sleepwalking and re-enacting his final quest - the one that made him a legend. In his confused state, he has been taking gold from the vault because he thinks it is the Dragon Emperor\'s treasure and he needs to return it to the rightful kingdom. He has been hiding it in increasingly absurd places around the community. Under his mattress. In the pool filter. Inside a hollowed-out shuffleboard puck. He does not remember any of it when awake.',
  climax:
    'Rupert\'s sleepwalking escalates to the point where he fully re-enacts his final battle, complete with summoning his celestial mount (a very confused elderly pegasus that also lives at Sunset Blades) and charging through the dining hall in full plate armor screaming about the Dragon Emperor. The party must talk him down without hurting him, recover the scattered gold, and help the community acknowledge that their greatest hero needs real help. It is funny and heartbreaking in equal measure.',
  acts: [
    {
      title: 'Act 1: Move-In Day',
      summary:
        'The party settles into Sunset Blades, meets the colorful residents, and discovers the gold theft. Initial investigation is hampered by residents who cannot stop telling war stories, giving unsolicited combat advice, and challenging each other to duels.',
      keyEvents: [
        'Move-in chaos: the wizard sets the welcome banner on fire, the rogue steals the party\'s room keys',
        'The communal vault is short 500 gold - Daisy asks the party to investigate',
        'Interrogation montage: every resident has a 45-minute alibi that is actually a war story. Running gag begins: Rupert tells the same three stories on repeat, but each retelling adds a detail that becomes a clue.',
        'Clue: gold dust found near the shuffleboard court, leading to the pool filter',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Sunset Blades After Dark',
      summary:
        'The party discovers the thefts happen at night and sets up a stakeout. They witness Rupert sleepwalking in full armor, re-enacting a battle nobody else remembers. The community splits: some think Rupert should be removed, others defend him fiercely.',
      keyEvents: [
        'Night stakeout: the party watches Rupert suit up in his sleep and march to the vault',
        'Rupert fights an imaginary Dragon Emperor in the garden, destroying the prize rose bushes',
        'The community meeting: a screaming match between residents who all think they know best',
        'Daisy reveals Rupert\'s diagnosis - his memory is failing and everyone has been ignoring it',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Last Charge',
      summary:
        'Rupert\'s sleepwalking escalates into a full-scale re-enactment of his legendary final battle. The party must protect him and the community while gently bringing him back to reality. The resolution requires compassion, not combat.',
      keyEvents: [
        'Rupert summons his pegasus (equally elderly, equally confused) and charges through the dining hall',
        'Other residents join in - muscle memory kicks in and suddenly everyone is fighting imaginary enemies',
        'The party must calm each resident down individually using knowledge of their personal histories (callback: the three stories Rupert kept repeating were his way of asking for help — the details he added were the truth leaking through)',
        'Rupert wakes up mid-charge, realizes what is happening, and the community rallies around him',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Rupert Ironshield',
      role: 'mystery subject / emotional center',
      personality:
        'A retired paladin, once the greatest hero of his age. During the day he is warm, forgetful, and tells the same three stories on repeat. At night he becomes the warrior he was, fighting battles that ended decades ago. He does not know he is the thief. "Did I ever tell you about the Dragon Emperor? No? Well, it was a Tuesday..."',
      secret: 'He is terrified that he is losing himself. He has been hiding his symptoms from everyone.',
    },
    {
      name: 'Daisy Thornberry',
      role: 'quest giver / ally',
      personality:
        'A 24-year-old half-elf community manager who took this job because it sounded peaceful. It is not peaceful. She loves the residents but they terrify her. "Mr. Bloodaxe, please stop sharpening your axe in the lobby. We talked about this."',
    },
    {
      name: 'Griselda the Undying',
      role: 'comic relief / ally',
      personality:
        'A 200-year-old wizard with selective dementia. She remembers every spell she has ever learned but cannot remember where her room is. Accidentally casts Fireball when startled, which is often. "Oh dear, was that your eyebrows? They will grow back."',
    },
    {
      name: 'Fingers McGee',
      role: 'comic relief',
      personality:
        'A retired rogue who steals compulsively but only takes dentures, reading glasses, and slippers. Claims he is "keeping his skills sharp." Returns everything if asked nicely. Sometimes.',
    },
  ],
  keyLocations: [
    {
      name: 'Sunset Blades Retirement Community',
      description: 'A gated community with cottages, a pool, a dining hall, and a shuffleboard court. Every surface has been dented, burned, or scarred by residents who forget they are retired.',
      significance: 'The entire campaign takes place here. Every location doubles as a comedy set piece.',
    },
    {
      name: 'The Communal Vault',
      description: 'A magically warded storage room where residents keep their retirement savings. The locks are legendary. The fact that someone got in anyway is deeply concerning.',
      significance: 'The scene of the crime and the campaign\'s central mystery.',
    },
    {
      name: 'The Memorial Garden',
      description: 'A garden with plaques honoring fallen adventuring companions. It is supposed to be peaceful. Rupert destroys the rose bushes during his nightly re-enactments.',
      significance: 'Where Rupert\'s sleepwalking re-enactments are most visible and most poignant.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationWeb',
    'npcSchedule',
    'randomNpcRelationship',
    'plotTwistEngine',
    'randomClue',
    'combatNarration',
    'partyDynamic',
  ],
};
