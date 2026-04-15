import type { OneShotCampaign } from '../types';

export const theIdenticalTwins: OneShotCampaign = {
  id: 'oneshot-identical-twins',
  type: 'oneshot',
  title: 'The Identical Twins',
  tagline: 'One twin is a killer. One is innocent. They are identical. You have one hour.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A merchant is murdered. Twin brothers are found at the scene, covered in blood. One did it. One tried to stop it. They are magically identical - even Zone of Truth cannot distinguish them because both believe they are innocent. The party has one hour before the magistrate executes both.',
  hook: 'Two identical men in identical cells. Both say: "It was him. I tried to stop him. Please believe me." The magistrate shrugs: "One hour. Find the killer or I hang them both. I cannot risk freeing a murderer."',
  twist:
    'Neither twin committed the murder. A third party used Disguise Self to look like one of the twins. The real killer is the merchant\'s apprentice, who knew about the twins and used the confusion as cover. Both twins genuinely believe the other did it because they each saw "their brother" at the scene.',
  climax:
    'The party discovers the apprentice\'s disguise components. They must prove a third party was present, confront the apprentice before he flees, and free both twins before the execution.',
  scenes: [
    {
      title: 'Scene 1: The Twins',
      summary: 'Interrogation of both brothers. Their stories are nearly identical. Both are telling the truth as they know it.',
      challenge: 'social',
      keyEvents: [
        'Twin A: "I was visiting the merchant. I saw my brother kill him. I tried to intervene."',
        'Twin B: "I was visiting the merchant. I saw my brother kill him. I tried to intervene."',
        'Zone of Truth: both register as truthful. They believe what they are saying.',
        'Physical evidence: blood on both, no distinguishing marks. One hour starts now.',
      ],
    },
    {
      title: 'Scene 2: The Scene',
      summary: 'Investigating the murder scene for evidence the guards missed. Something does not add up.',
      challenge: 'exploration',
      keyEvents: [
        'The merchant\'s shop: blood, broken furniture, signs of struggle.',
        'A third set of footprints, partially hidden. Someone else was here.',
        'A discarded vial behind a shelf: residue of Disguise Self components.',
        'The apprentice\'s workstation: recently cleaned. Too recently.',
      ],
    },
    {
      title: 'Scene 3: The Apprentice',
      summary: 'The party confronts the real killer. Time is running out. The twins hang in thirty minutes.',
      challenge: 'combat',
      keyEvents: [
        'The apprentice is packing to flee town. Caught with disguise components.',
        'He fights or runs. The party must take him alive for testimony.',
        'Race to the magistrate with evidence and the real killer in hand.',
        'Both twins freed. They embrace. The hour was almost up.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Aldren & Eldren Marsh',
      role: 'identical twins / suspects',
      personality: 'Both kind, both terrified, both absolutely certain they saw their brother commit murder. Their bond is tested by a crime neither committed.',
    },
    {
      name: 'Piers Landon',
      role: 'apprentice / killer',
      personality: 'Quiet, overlooked, simmering with resentment. The merchant cheated him out of an inheritance. He planned the murder for months, using the twins as perfect cover.',
      secret: 'He is not evil, just desperate. The merchant stole his family\'s savings through a fraudulent contract.',
    },
  ],
  keyLocations: [
    {
      name: 'The Magistrate\'s Cells',
      description: 'Two identical cells holding two identical men. A clock on the wall. One hour.',
      significance: 'Where the investigation begins and the deadline is enforced.',
    },
    {
      name: 'Varrick\'s Goods',
      description: 'The murdered merchant\'s shop. Blood on the floor, three sets of footprints, and a clue behind the shelf.',
      significance: 'Where the truth hides in the details.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
