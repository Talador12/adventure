import type { OneShotCampaign } from '../types';

export const thePromise: OneShotCampaign = {
  id: 'oneshot-promise',
  type: 'oneshot',
  title: 'The Promise',
  tagline: 'A dying man asks the party to fulfill a promise he made 40 years ago. It seems simple. It is not.',
  tone: 'serious',
  themes: ['classic_fantasy', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A dying old man in a hospice asks the party to deliver a carved wooden box to a woman in a distant town. He made a promise 40 years ago to return it to her. The box is light, simple, and locked. He does not have the key. She does.',
  hook: 'The old man\'s hands shake as he gives the party the box. "I should have done this decades ago. I was afraid. Tell her... tell her I kept my promise. Even if it took too long."',
  twist: 'The box contains a pair of wedding rings. The old man and the woman were engaged 40 years ago. He left to fight in a war and never came back, not because he could not, but because he lost his arm and was ashamed. She waited for 10 years, then stopped. The rings are from the engagement he broke by disappearing.',
  climax: 'The woman is elderly, sharp, and has lived a full life. She has the key. Opening the box forces both her and the party to reckon with 40 years of silence, shame, and the question of whether some promises can be kept too late.',
  scenes: [
    {
      title: 'Scene 1: The Dying Man',
      summary: 'Receiving the quest and traveling to the distant town. The journey provides context through people who knew the old man.',
      challenge: 'social',
      keyEvents: [
        'The hospice: the old man, one arm, dignified even in illness, the box clutched tight',
        'His instructions: the woman\'s name, the town, the apology he cannot say himself',
        'On the road: a veteran who served with him. "He was whole when he left. He was not when he came back."',
        'Arriving in a prosperous town where the woman\'s name is well known',
      ],
    },
    {
      title: 'Scene 2: The Woman',
      summary: 'Finding and speaking with the woman. She is not who the party expected. She is not fragile. She is not waiting.',
      challenge: 'social',
      keyEvents: [
        'The woman: elderly, independent, a retired magistrate with a full life behind her',
        'Her reaction to the name: a flash of something, quickly controlled. "I see. After all this time."',
        'She has the key on a chain she has worn for 40 years. She never took it off',
        'She is angry, sad, and relieved simultaneously. She asks the party about the old man',
      ],
    },
    {
      title: 'Scene 3: The Box',
      summary: 'Opening the box together. The rings, the letter inside, and the aftermath of a lifetime of silence.',
      challenge: 'social',
      keyEvents: [
        'The key turns. The box opens. Two simple rings and a letter, 40 years unread',
        'The letter: written the night before the battle, full of hope, plans, promises',
        'The woman reads it. The party witnesses the weight of decades hitting at once',
        'She asks one question: "Is he still alive?" The answer determines everything that follows',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Aldric Thorne', role: 'the dying man', personality: 'A one-armed veteran who spent 40 years carrying a box he was too ashamed to deliver. Gentle, regretful, and at the end of his time. "I was not brave enough to face her. I was brave enough to face an army. Strange, that."' },
    { name: 'Magistrate Elowynn Darr', role: 'the recipient', personality: 'A woman who waited, then stopped waiting, then built an extraordinary life. Not bitter but not soft about it either. "I did not put my life on hold. I wore the key because it fit the chain."' },
    { name: 'Father Simms', role: 'hospice keeper', personality: 'The priest tending the hospice who has heard Aldric talk about the box for years. He convinced Aldric to finally ask someone to deliver it.' },
  ],
  keyLocations: [
    { name: 'The Hospice', description: 'A quiet place where the old and the sick wait. Aldric\'s room has one personal item: the box.', significance: 'Where the quest begins and the emotional weight is established.' },
    { name: 'Darr Manor', description: 'A well-kept estate belonging to a retired magistrate who has lived a full life without the man who left.', significance: 'Where the promise is finally kept and the box is opened.' },
    { name: 'The Road Between', description: 'Three days of travel with time to learn about the man, the woman, and what happened 40 years ago.', significance: 'Where the party builds context and decides how to approach the delivery.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'travelEncounter', 'moralDilemma', 'npcRelationship'],
};
