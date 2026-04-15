import type { OneShotCampaign } from '../types';

export const thePerfectAlibi: OneShotCampaign = {
  id: 'oneshot-perfect-alibi',
  type: 'oneshot',
  title: 'The Perfect Alibi',
  tagline: 'Every suspect has a magically verified alibi. One of them still did it. How?',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A guildmaster is poisoned at a banquet attended by five rivals. Every rival has a magically verified alibi (Zone of Truth interrogation, divination confirmation). None of them could have done it. One of them did. The party must figure out how a guilty person passes every magical lie detection.',
  hook: 'The investigator throws his notes on the table: "Five suspects. Five alibis. All magically verified. The poison was administered at the banquet. One of them is guilty. And I cannot find a single crack in any story. This is beyond me."',
  twist:
    'The killer used a Simulacrum. The Simulacrum attended the banquet and poisoned the guildmaster while the real person was genuinely elsewhere. The Simulacrum has since been destroyed. Zone of Truth works on the real person, who was genuinely not at the scene.',
  climax:
    'The party finds residual Simulacrum dust (snow) in the suspect\'s home and traces of the spell components. The killer is a wizard among the suspects who has been hiding their magical ability. Confrontation leads to the wizard trying to create another Simulacrum to fight while they flee.',
  scenes: [
    {
      title: 'Scene 1: The Impossible Crime',
      summary: 'Review the alibis. Every one is perfect. The party must find the flaw in a flawless system.',
      challenge: 'puzzle',
      keyEvents: [
        'Five suspects, each with motive: the poisoned guildmaster cheated all of them.',
        'Zone of Truth transcripts: all five truthfully state they were not at the banquet.',
        'Divination confirms: all five were where they claimed to be.',
        'The poison was administered personally. Someone was at the banquet who should not exist.',
      ],
    },
    {
      title: 'Scene 2: The Crack',
      summary: 'Re-interviewing suspects with new questions. Looking not for lies, but for what is technically true.',
      challenge: 'social',
      keyEvents: [
        'Key question: "Were YOU at the banquet?" vs "Was your likeness at the banquet?"',
        'One suspect hesitates at the rephrased question. Barely. But the party catches it.',
        'Research: what magic could create a perfect duplicate? Simulacrum.',
        'The suspect\'s home: a hidden room with expensive spell components and melting snow.',
      ],
    },
    {
      title: 'Scene 3: The Confrontation',
      summary: 'The party confronts the wizard. Evidence presented. The wizard fights rather than face execution.',
      challenge: 'combat',
      keyEvents: [
        'Simulacrum residue: snow that should not exist in summer. Spell component receipts.',
        'The wizard drops the facade. They admit it. The guildmaster destroyed their family.',
        'A half-formed Simulacrum rises to fight while the wizard runs.',
        'Chase through the city. Capture the wizard. Justice or mercy.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Magistrate Velen',
      role: 'frustrated investigator',
      personality: 'Brilliant, proud, and deeply annoyed that magic is being used to beat magic. He has never failed to solve a case until now.',
    },
    {
      name: 'Elara Nightwend',
      role: 'wizard / killer',
      personality: 'A quiet merchant who has hidden her magical ability for decades. Calculated, patient, and driven by genuine grief. The guildmaster bankrupted her family and her mother died in poverty.',
      secret: 'She does not regret the killing. She regrets being caught.',
    },
  ],
  keyLocations: [
    {
      name: 'The Guild Hall',
      description: 'A grand banquet hall where the poisoning occurred. Wine glasses, table settings, and the residue of a crime.',
      significance: 'The crime scene, where the impossible happened.',
    },
    {
      name: 'Nightwend\'s Hidden Laboratory',
      description: 'A basement room with Simulacrum components, melting snow, and the evidence that breaks the case.',
      significance: 'Where the method is revealed.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
