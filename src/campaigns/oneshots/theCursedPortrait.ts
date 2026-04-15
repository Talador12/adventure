import type { OneShotCampaign } from '../types';

export const theCursedPortrait: OneShotCampaign = {
  id: 'oneshot-cursed-portrait',
  type: 'oneshot',
  title: 'The Cursed Portrait',
  tagline: 'A painting changes every night. Each morning it shows a different scene. The scenes are clues to a 100-year-old crime.',
  tone: 'mystery',
  themes: ['mystery', 'horror', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A portrait in the Aldervane Manor gallery changes every morning. Day one: a woman in a garden. Day two: the same woman arguing with a man. Day three: the woman at the edge of a cliff. The party must decode the portrait\'s story and solve a century-old murder before the painting reaches its final scene.',
  hook: 'The manor\'s new owner finds the party: "The painting in the east gallery changed again. Yesterday it was a woman by a lake. Today she is screaming. There are six frames left on the canvas before it runs out of space. I do not want to see what the last frame shows."',
  twist:
    'The woman in the portrait is the manor\'s original owner, murdered by her husband and sealed into the painting by a curse. She has been trying to tell her story for a century. If the party solves the murder, she is freed. If the painting reaches its final frame without resolution, the curse resets and she relives the murder forever.',
  climax:
    'The party pieces together the murder and performs a ritual at the location shown in the final frame (the manor\'s basement). The husband\'s ghost appears to stop them. Free the woman or let the curse repeat.',
  scenes: [
    {
      title: 'Scene 1: The Gallery',
      summary: 'Studying the portrait\'s progression. Each scene is a clue. The party must interpret them like a visual diary.',
      challenge: 'puzzle',
      keyEvents: [
        'Scene 1-3: a woman, happy then frightened. A man appears. His face is obscured.',
        'Scene 4 (today): the woman at a desk, writing. A letter? A confession?',
        'Research: Lady Isolde Aldervane, original owner. Died of "illness" a century ago.',
        'No grave. No death certificate. Her husband remarried within a month.',
      ],
    },
    {
      title: 'Scene 2: The History',
      summary: 'Investigating the century-old murder. Records, descendants, and the manor\'s hidden spaces.',
      challenge: 'exploration',
      keyEvents: [
        'The manor basement: sealed for decades. The party opens it.',
        'A hidden room with a desk. A letter, preserved by the curse. Isolde\'s final words.',
        'The letter names her husband as her killer. She knew. She was already trapped.',
        'The portrait shows a new scene: Isolde pointing at the basement. She knows they found it.',
      ],
    },
    {
      title: 'Scene 3: The Ritual',
      summary: 'Breaking the curse. The husband\'s ghost defends his secret. Free Isolde or the cycle repeats.',
      challenge: 'combat',
      keyEvents: [
        'The ritual requires reading Isolde\'s letter aloud in the basement.',
        'The husband\'s ghost manifests. He is furious. He will not let his crime be known.',
        'Combat with a powerful ghost in a cursed basement. The portrait pulses overhead.',
        'The letter is read. Isolde steps out of the portrait. The curse breaks. She is finally free.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lady Isolde Aldervane',
      role: 'the portrait / victim',
      personality: 'Can only communicate through the changing painting. Each scene is carefully chosen. She is patient, determined, and has been waiting a hundred years for someone to understand.',
    },
    {
      name: 'Lord Aldric Aldervane (Ghost)',
      role: 'murderer / antagonist',
      personality: 'Possessive, paranoid, and enraged that his crime is being uncovered. He killed Isolde for her inheritance and cursed her into the painting to silence her forever.',
    },
  ],
  keyLocations: [
    {
      name: 'The East Gallery',
      description: 'A long gallery of portraits. One of them changes daily. The frame around it is cold to the touch.',
      significance: 'Where the mystery plays out, one frame per day.',
    },
    {
      name: 'The Sealed Basement',
      description: 'A hidden room beneath the manor. Dust, darkness, and a desk with a letter that has waited a century to be read.',
      significance: 'Where the truth is buried and the ritual must be performed.',
    },
  ],
  dataSystems: ['puzzleLock', 'hauntedLocation', 'combatNarration'],
};
