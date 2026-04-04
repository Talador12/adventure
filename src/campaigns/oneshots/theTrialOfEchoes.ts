import type { OneShotCampaign } from '../types';

export const theTrialOfEchoes: OneShotCampaign = {
  id: 'oneshot-trial-of-echoes',
  type: 'oneshot',
  title: 'The Trial of Echoes',
  tagline: 'You died. This is the appeal process.',
  tone: 'serious',
  themes: ['planar', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 8,
  estimatedHours: 4,
  settingSummary:
    'The party is dead. They don\'t remember dying, but they\'re standing in a vast courthouse on the border between life and death. A celestial judge informs them they have one chance to appeal their deaths by proving their lives mattered. Each character must present evidence from their own backstory, and the court will judge them.',
  hook: 'The party wakes in a marble courtroom. They\'re translucent. A gavel strikes. "Case number seven billion, four hundred million, twenty-three. The mortals wish to live. The court will hear their arguments."',
  twist:
    'The trial is rigged. The celestial judge has already decided to let them live — she just needs them to say the right things to satisfy the cosmic bureaucracy. She\'s been subtly guiding their testimony. The real danger is that one party member\'s backstory contains a genuine cosmic crime that, once spoken aloud in the court, triggers an immediate celestial warrant.',
  climax:
    'The cosmic warrant activates. Celestial enforcers descend. The judge reveals she\'s been helping them and must now choose: uphold the law (condemn one party member), defy the court (sacrifice her position to save everyone), or let the party fight their way out of the afterlife (which has never been done).',
  scenes: [
    {
      title: 'Scene 1: The Court Convenes',
      summary:
        'The party realizes they\'re dead, meets the judge, and the rules of the trial are explained. Each character will be called to testify about why their life should continue.',
      challenge: 'social',
      keyEvents: [
        'Wake up dead — translucent, in a courthouse, very confused',
        'Judge Seraphina explains the rules: argue your case, present evidence, convince the court',
        'The prosecution: a devil advocate who argues everyone\'s life was net-negative',
        'Each player gets a preview of their "evidence docket" — scenes from their backstory',
      ],
    },
    {
      title: 'Scene 2: The Testimonies',
      summary:
        'Each character takes the stand. Their backstory moments are replayed as magical holograms. The devil advocate cross-examines. The judge subtly helps.',
      challenge: 'social',
      keyEvents: [
        'Each player roleplays their character\'s defense — "why my life mattered"',
        'Backstory moments replayed — the DM narrates key scenes from each character\'s history',
        'The devil advocate finds flaws: the lie you told, the person you didn\'t save, the promise you broke',
        'The judge nudges: "Perhaps the witness would like to elaborate on that act of kindness?"',
      ],
    },
    {
      title: 'Scene 3: The Verdict',
      summary:
        'The testimonies trigger the cosmic warrant. The courtroom shifts. The judge must act, and the party must decide how to escape death — legally or otherwise.',
      challenge: 'combat',
      keyEvents: [
        'The cosmic warrant activates — one party member\'s past triggers celestial law',
        'Celestial enforcers arrive — combat in a courthouse in the afterlife',
        'Judge Seraphina breaks character — "I\'ve been trying to save you, now RUN"',
        'Escape the afterlife: fight through the Court of Final Appeals to the Gate of Rebirth',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Judge Seraphina',
      role: 'ally / secret helper',
      personality:
        'A solar angel in judicial robes who speaks in formal legalese but occasionally slips into genuine warmth. She\'s seen millions of cases and these mortals remind her why she took the job.',
      secret: 'She requested this case specifically because she believes in second chances. If caught helping, she loses her wings.',
    },
    {
      name: 'Advocate Malphas',
      role: 'prosecution / devil advocate',
      personality:
        'A pit fiend in a three-piece suit who argues every case with gleeful precision. Not evil per se — he genuinely believes the system works. "The law is the law."',
    },
    {
      name: 'The Clerk',
      role: 'neutral / comic relief',
      personality:
        'A modron clerk who processes the paperwork of death. Completely literal. "Your file indicates you died of \'heroic stupidity.\' Is this accurate?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Court of Final Appeals',
      description:
        'A vast marble courthouse floating in a silver void. Rows of empty seats stretch into infinity. Every surface echoes.',
      significance: 'Where the trial takes place.',
    },
    {
      name: 'The Evidence Gallery',
      description:
        'A wing of the courthouse where backstory moments are stored as crystallized memories. Touch one and you\'re inside the scene.',
      significance: 'Where testimony evidence is sourced.',
    },
    {
      name: 'The Gate of Rebirth',
      description:
        'A massive golden archway at the courthouse\'s edge. Step through and you live again. Getting there is the problem.',
      significance: 'The escape route during the climax.',
    },
  ],
  dataSystems: [
    'magicalCourtroom',
    'backstoryComplication',
    'npcBackstoryGen',
    'socialEncounter',
    'deathSaveDrama',
    'dreamSequence',
  ],
};
