import type { OneShotCampaign } from '../types';

export const theUnreadLetter: OneShotCampaign = {
  id: 'oneshot-unread-letter',
  type: 'oneshot',
  title: 'The Unread Letter',
  tagline: 'A dead woman\'s last letter was never delivered. Find the recipient using only the clues inside.',
  tone: 'mystery',
  themes: ['mystery', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A woman dies on the road clutching a sealed letter. No name on the envelope. No return address. The letter inside is written in metaphor and personal references only the intended recipient would understand. The party must decode the letter and deliver it before the information inside becomes worthless.',
  hook: 'A dying woman presses a letter into the party\'s hands: "Deliver this. Please. They need to know before the full moon." She dies. The letter has no name. No address. Just a wax seal shaped like a crescent.',
  twist:
    'The letter is a warning. The recipient is a werewolf who does not know they are a werewolf. The full moon is in two days. The dead woman was their mother, who had been secretly managing the curse with monthly potions. Without the letter, the recipient transforms with no preparation.',
  climax:
    'The party finds the recipient just as the full moon rises. The letter contains the potion recipe and the truth about their heritage. Deliver the letter in time to prepare, or face a newly transformed werewolf who has no idea what is happening.',
  scenes: [
    {
      title: 'Scene 1: The Letter',
      summary: 'Decoding the letter\'s clues. Personal references, childhood memories, and metaphors that point to a specific person in a specific town.',
      challenge: 'puzzle',
      keyEvents: [
        'The letter: "To the one who sang at the willow bridge." Personal, specific, unnamed.',
        'References: a blue door, a baker\'s apprenticeship, a scar from a dog bite at age seven.',
        'The crescent seal: not a noble house. An alchemist\'s mark.',
        'The town is identified: Bramblewood, half a day\'s ride.',
      ],
    },
    {
      title: 'Scene 2: The Search',
      summary: 'In Bramblewood, following the clues to narrow down the recipient. Multiple candidates, only one match.',
      challenge: 'exploration',
      keyEvents: [
        'A blue door: three houses have blue doors. Which one?',
        'The baker remembers an apprentice from years ago. Now a carpenter.',
        'The willow bridge: a childhood landmark. One person sang there every morning.',
        'The recipient found: a carpenter named Rowan. Kind. Unsuspecting. The moon rises tomorrow.',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary: 'Delivering the letter. The truth about the werewolf curse. The full moon rises.',
      challenge: 'social',
      keyEvents: [
        'Rowan reads the letter. Confusion. Denial. Fear.',
        'The potion recipe: ingredients available if the party acts fast.',
        'If the potion is brewed in time: Rowan takes it and the transformation is controlled.',
        'If the moon rises first: a confused, terrified werewolf. The party must subdue, not kill.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Rowan Ashdale',
      role: 'the recipient / hidden werewolf',
      personality: 'A gentle, well-liked carpenter who has always felt "different" during full moons but never knew why. Learning the truth about their mother\'s secret management of the curse is devastating.',
    },
    {
      name: 'Maren Ashdale',
      role: 'the dead woman / letter writer',
      personality: 'Only known through her letter. A mother who spent her life protecting her child from a curse, managing it in secret. Her letter is warm, apologetic, and desperately practical.',
    },
  ],
  keyLocations: [
    {
      name: 'Bramblewood',
      description: 'A small, friendly town where everyone knows everyone. Blue doors, a willow bridge, and a carpenter\'s shop.',
      significance: 'Where the clues lead and the recipient lives.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
